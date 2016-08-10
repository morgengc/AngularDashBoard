/**
 * index.html 中引用的控制器，监控页面跳转，从URL中解析page变量
 * 这个控制器没什么作用
 *
 * @method RootCtrl
 * @param {Object} $scope HTML与控制器之间绑定数据
 * @return undefined
 */
app.controller('RootCtrl', function($scope) {
	$scope.$on('$locationChangeStart', function(e, next, current) {
		$scope.page = next.split('/').splice(-1);
	});
});