/**
 * graphService 服务，用于返回组件类型. 实际环境中可能需要从服务端异步获取
 *
 * @method graphService
 * @param {Object} $http Angular $http 服务，与远程服务器进行 HTTP 交互
 * @param {Object} $q    Angular $q 服务，提供一种承诺/延后(promise/deferred)，保证调用的代码一定获得数据
 * @return 服务接口函数
 */
app.service('graphService',['$http','$q', function ($http, $q) {

    // 返回组件类型列表. 这里简单起见直接返回了，可以从服务端获取数据后返回
    function RecoverData(){

        return ['text', 'array', 'graph', 'map', 'image', 'chart'];
        /*
         $http.get(serverURL).
         success(function(data) {
         return data
         }).error(function(data) {
         alert('cant get fish data');
         });
         */
    }

    // 返回组件参数. 同上，简便起见直接返回了数组
    function RecoverDetailGraph(){

        return {
            'text': ['text'],
            'array': ['table with searchTab','table'],
            'graph': ['graph'],
            'map':   ['map'],
            'image': ['image'],
            'chart': ['chart']
        }
    }

    return({
        RecoverData: RecoverData,
        RecoverDetailGraph: RecoverDetailGraph
    });

}]);