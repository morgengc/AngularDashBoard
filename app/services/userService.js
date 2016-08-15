/**
 * userService 服务，加载/保存版面数据
 *
 * @method userService
 * @param {Object} $http Angular $http 服务，与远程服务器进行 HTTP 交互
 * @param {Object} $q    Angular $q 服务，提供一种承诺/延后(promise/deferred)，保证调用的代码一定获得数据
 * @return 服务接口函数
 */
app.service('userService', ['$http', '$q', function($http, $q) {

    // 保存数据. 简单起见没有往服务端发送任何数据
    function saveDashboard(dashboard){
        console.log(dashboard.toSource());
        /*
         $http.get(serverURL+'/user/dashboard').
         success(function(data) {
         //sth
         }).error(function(data) {
         alert('Impossible de sauvegarder le Dashboard');
         });
         */
    }

    // 加载版面数据. 简单起见没有从服务端获取数据，直接返回静态的
    function RecoverDashboard(){

        var widgets = [
            {id:0, name:"表格", row:0, col:0, sizeX:2, sizeY:1, content:"array", type:"table"},
            {id:1, name:"图片", row:0, col:2, sizeX:1, sizeY:1, content:"image", type:"image"},
            {id:2, name:"地图", row:0, col:3, sizeX:2, sizeY:2, content:"map", type:"leaflet"},
            {id:3, name:"文字", row:1, col:0, sizeX:1, sizeY:1, content:"text", type:"text"},
            {id:4, name:"趋势图", row:1, col:1, sizeX:2, sizeY:1, content:"graph", type:"graph"},
            {id:5, name:"饼图", row:2, col:0, sizeX:2, sizeY:1, content:"chart", type:"chart"},
            {id:6, name:"可搜索表格", row:2, col:2, sizeX:3, sizeY:1, content:"array", type:"table with searchTab"}
        ];

        var base = {
            1: {
                id: '1',
                name: '开发版面',
                widgets: [
                    {id:0, name: "Widget 1", row: 0, col: 0, sizeX: 1, sizeY: 1, content:"array", type:"table"}, 
                    {id:1, name: "Widget 2", row: 0, col: 2, sizeX: 1, sizeY: 1, content:'image', type:"image"}
                ]
            },
            2: {
                id: '2',
                name: '运行版面',
                widgets: widgets
            }
        };

        return base;
    }

    return({
        saveDashboard: saveDashboard,
        RecoverDashboard: RecoverDashboard
    });

}]);