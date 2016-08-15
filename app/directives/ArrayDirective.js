/**
 * myArrayDisplay 指令，对应 HTML 中的 my-array-display 标签
 * 这个标签定义一个 array 组件，支持搜索、排序等功能
 * HTML时用属性(A)、元素(E)和类(C)声明格式来匹配指令定义
 *
 * @method myArrayDisplay
 * @param 无
 * @return 指令
 */
app.directive("myArrayDisplay", function () {
    return {
        restrict: 'AEC',
        templateUrl: 'app/template/MyArray.html',
        scope: {
            search:'@search'   // search:'@' 也可以
            // Can additionally pass something in here
        },
        controller: function ($scope, arrayService) {
            $scope.sortColumn = '';           // 对哪一列排序
            $scope.sortReverse  = true;       // 升序还是降序
            $scope.searchKey   = '';          // 搜索关键字
            $scope.searchtab = $scope.search; // 搜索栏是否可见

            $scope.dataTabTitle = arrayService.getDataTitle();  // 表格标题
            $scope.dataTab = arrayService.getDataTab();         // 表格数据
        }
    }
});