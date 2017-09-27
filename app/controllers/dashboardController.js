angular.module('app')

/**
* index.html 中引用的控制器，用于控制 Dashboard 页
*
* @method DashboardCtrl
* @param {Object} $scope        HTML与控制器之间绑定数据
* @param {Object} graphService  自定义服务，获取组件类型
* @param {Object} userService   自定义服务，获取面板数据
* @return undefined
*/
.controller('DashboardCtrl', ['$scope', "graphService", "userService",
	function($scope, graphService, userService) {

		// Gridster 配置参数
		$scope.gridsterOptions = {
			margins: [0, 0],
			columns: 5,
			outerMargin: false,
			draggable: {
				handle: 'h3'
			}
		};

		// 根据组件类型判断是否显示组件参数
		$scope.dispTypelist = false;
		// 组件类型列表
		$scope.ContentList = graphService.RecoverData();
		// 组件参数列表
		$scope.graphContentList = graphService.RecoverDetailGraph();
		// 一个组件的参数
		$scope.typeList = [""];

		// leaflet 定位到重庆解放碑
		// TODO: 地图不能最大化，除非切换版面以后再切换回来. 感觉是leaflet的BUG，因为地图区域是最大化的，但是地图块没有加载完全
		angular.extend($scope, {center: {lat:29.570, lng:106.572, zoom:13}});

	 	// 饼图数据
	 	$scope.examplePieData = [{key: "One",y: 5},{key: "Two",y: 2},{key: "Three",y: 9},{key: "Four",y: 7},{key: "Five",y: 4},{key: "Six",y: 3},{key: "Seven",y: 9}];
	 	$scope.xFunction = function() {return function(d) {return d.key;};};
	 	$scope.yFunction = function() {return function(d) {return d.y;};};

	 	// 折线图数据
 	 	$scope.exampleLineData = [{"key": "Series 1",
 			"values": [ [ 1 , 0] , [ 2 , -6.33] , [ 3 , -5.95] , [ 4 , -11.56] , [ 5 , -5.47] , [ 6 , 0.50] , [ 7 , -5.53] , [ 8 , -5.78] , [ 9 , -7.32] , [ 10 , -6.70] , [ 11 , 0.44] , [ 12 , 7.24] , [ 13 , 9.25] , [ 14 , 11.34] , [ 15 , 14.73] , [ 16 , 12.38] , [ 17 , 18.43] , [ 18 , 19.83] , [ 19 , 22.64]]
 		}];

		// 全部版面的数据
		$scope.dashboards = userService.RecoverDashboard();

		// 清除当前版面的所有组件
		$scope.clear = function() {
			$scope.dashboard.widgets = [];
		};

		// 添加一个新的空白组件
		$scope.addWidget = function() {
			$scope.dashboard.widgets.push({
				name: "New Widget",
				sizeX: 1,
				sizeY: 1
			});
		};

		// 保存"开发版面"的数据到"运行版面"
		$scope.save = function(){
			var widgets = JSON.parse(JSON.stringify($scope.dashboard.widgets));
			var length = Object.keys($scope.dashboards).length;
			if($scope.dashboards[1].name == "运行版面")
				$scope.dashboards[1] = { id:1, name:"运行版面", widgets:widgets};
			else{
				length++;
				$scope.dashboards[length] = { id:length, name:"运行版面", widgets:widgets};
			}
			userService.saveDashboard(widgets);
		};

		// 监控 selectedDashboardId 变量，完成版面切换
		// 由于数据是双向绑定的，因此数据改变后页面也改变
		$scope.$watch('selectedDashboardId', function(newVal, oldVal) {
			if (newVal !== oldVal) {
				$scope.dashboard = $scope.dashboards[newVal];
			} else {//Should never happend ? 
				$scope.dashboard = $scope.dashboards[1];

			}
		});

		// 默认值
		$scope.selectedDashboardId = '1';
	}])

/**
* view.html 中引用的控制器，用于控制每个组件标题栏的行为
*
* @method CustomWidgetCtrl
* @param {Object} $scope  HTML与控制器之间绑定数据
* @param {Object} $modal  模式窗口
* @return undefined
*/
.controller('CustomWidgetCtrl', ['$scope', '$modal',
	function($scope, $modal) {

		// 默认显示组件的标题栏
		$scope.showt = true;

		// 删除该组件. 实际上只需要从数组中删除栅格数据即可，双向绑定实在方便
		$scope.remove = function(widget) {
			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
		};

		// 弹出模式窗口，进行组件配置
		// 参数 widget 由 HTML 传入
		// resolve() 中返回 widget，保证了数据获取后再跳转路由，
		// 这样操作避免了跳转路由后数据还没有获取完成而可能带来的页面闪烁问题。体验也更好
		$scope.openSettings = function(widget) {
			$modal.open({
				scope: $scope,
				templateUrl: 'app/template/widget_settings.html',
				controller: 'WidgetSettingsCtrl',
				resolve: {
					widget: function() {
						return widget;
					}
				}
			});
		};

	}
])

/**
* widget_settings.html 中引用的控制器，用于改变组件配置
*
* @method WidgetSettingsCtrl
* @param {Object} $scope         HTML与控制器之间绑定数据
* @param {Object} $modalInstance 模式窗口
* @param {Object} widget         当前组件对象
* @return undefined
*/
.controller('WidgetSettingsCtrl', ['$scope', '$modalInstance', 'widget',
	function($scope, $modalInstance, widget ) {
		$scope.widget = widget;

		// 组件属性初始值显示在配置窗口中，若手动修改了属性值，则会改变form对象
		$scope.form = {
			name: widget.name,
			col: widget.col,
			row: widget.row,
			sizeX: widget.sizeX,
			sizeY: widget.sizeY,
			content: widget.content,
			type: widget.type
		};

		// 监控组件类型的改变，如果发生改变，列出对应的参数
		$scope.$watch('form.content', function(newValue, oldValue) {
			if(typeof(newValue) !== 'undefined'){
				$scope.typeList = $scope.graphContentList[newValue];	
				$scope.dispTypelist = true;
			}
			else
				$scope.dispTypelist  = false;
		});

		// 关闭配置窗口
		$scope.dismiss = function() {
			$modalInstance.dismiss();
		};

		// 删除组件并关闭窗口
		$scope.remove = function() {
			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
			$modalInstance.close();
		};

		// 修改组件属性，并且关闭配置窗口
		// angular.extend(dst, src)
		// form 对象在 HTML 中被改变，将改变应用到原栅格上即可
		$scope.submit = function() {
			angular.extend(widget, $scope.form);
			$modalInstance.close(widget);
		};
	}
])

// 版面下拉列表需要这个过滤器
.filter('object2Array', function() {
	return function(input) {
		var out = [];
		for (i in input) {
			out.push(input[i]);
		}
		return out;
	}
});