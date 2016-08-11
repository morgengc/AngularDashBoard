/**
 * dynCustom 指令，对应 HTML 中的 dyn-custom 标签
 * 该指令作为
 * HTML时用属性(A)和元素(E)声明格式来匹配指令定义
 *
 * @method dynCustom
 * @param 无
 * @return 指令
 */
app.directive("dynCustom", function($compile, $rootScope, widgetService){
	return({
		transclude: true,
		priority: 1000,
		restrict: "AE",
		compile: function(element, attributes) {

			var update = function(scope, element, attributes, v) {
				var content = attributes.content;	// HTML 中传入的 content 属性
				var type = attributes.type;			// HTML 中传入的 type 属性
				var sth = widgetService.getDirective(content,type);
				element.empty();
				element.append($compile(sth)(scope));
			};

			// linkFunction 的作用是将 HTML 的数据(element, attributes) 送给 $scope
			var linkFunction = function(scope, element, attributes) {
				update(scope,element,attributes);
				scope.$watch(function () { return attributes.content }, function (v) {
					update(scope,element,attributes,v);
				});
				scope.$watch(function () { return attributes.type }, function (v) {
					update(scope,element,attributes,v);
				});
			};

			return linkFunction;
		}
	});
});
