/**
 * myArrayDisplay 指令，对应 HTML 中的 my-array-display 标签
 * 这个标签定义一个 array 组件
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
            search:'@search'
            // Can additionally pass something in here
        },
        controller: function ($scope, arrayService) {
            $scope.sortType     = ''; // set the default sort type
            $scope.sortReverse  = true;  // set the default sort order
            $scope.searchFish   = '';     // set the default search/filter term
            $scope.dataTab = arrayService.getDataTab();
            $scope.dataTabTitle = arrayService.getDataTitle();
            $scope.searchtab = $scope.search;
        }
    }
});