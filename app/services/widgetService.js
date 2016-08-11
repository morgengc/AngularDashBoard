/**
 * widgetService 服务，创建各种组件
 *
 * @method widgetService
 * @param {Object} $http Angular $http 服务，与远程服务器进行 HTTP 交互
 * @param {Object} $q    Angular $q 服务，提供一种承诺/延后(promise/deferred)，保证调用的代码一定获得数据
 * @return 服务接口函数
 */
app.service('widgetService',['$http','$q', function ($http, $q) {

    function getDirective(content, type) {
        switch(content){
            case 'graph'    :   return '<nvd3-line-chart data="exampleLineData" margin="{left:40,top:10,bottom:30,right:10}" showXAxis="true" showYAxis="true" interactive="true"></nvd3-line-chart>';

            case 'array'    :   if(typeof(type) !== 'undefined'){
                                    if(type.indexOf('search') != -1)
                                        return '<my-array-display search="true"></my-array-display>';
                                    return '<my-array-display search="false"></my-array-display>';
                                }
            case 'image'    :   if(typeof(type) !== 'undefined')
                                    return '<img class="ImgBoxes" ng-src="images/whatever.jpg" alt="'+type+'"></img>';

            case 'map'      :   return '<leaflet center="center"></leaflet>';

            case 'chart'    :   return '<nvd3-pie-chart data="examplePieData" showLegend="true" margin="{left:0,top:0,bottom:0,right:0}" x="xFunction()" y="yFunction()" showLabels="true" pieLabelsOutside="true" showValues="true" labelType="percent"></nvd3-pie-chart>';

            case 'text'     :
            default         :   return '<marquee class="scroll-text">精心设计 科学管理 诚信服务 顾客满意</marqueel>';
        }
    }

    return({
        getDirective: getDirective
    });

}]);