
app.service('userService',['$http','$q', function ($http,$q) {

    /* Same as graphService. This shoud be part of a 'UserService' -> Allow to get Custom Widget depending on user */

    function getBaseDashboard(){
        return {
            1: {
                id: '1',
                name: '开发版面',
                widgets: [
                    {id:0,name: "Widget 1",row: 0,col: 0,sizeX: 1,sizeY: 1,content:"array"},
                    {id:1,name: "Widget 2",row: 0,col: 2,sizeX: 1,sizeY: 1,content:'map'}
                ]
            }/*,
            2: {
                id: '2',
                name: '开发版面2',
                widgets: [
                    {col: 1,row: 1,sizeY: 1,sizeX: 2,name: "Other Widget 1",id:0},
                    {col: 1,row: 3,sizeY: 1, sizeX: 1,name: "Other Widget 2",id:1}
                ]
            }*/
        };
    }

    //To Save the User configuration of Dashboard
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

    //To get the User Dashboard Configuration
    function RecoverDashboard(){

        var base = getBaseDashboard();

        //I define static widget, here you shoud have a 
        /*
        $http.get(serverURL+'/user/dashboard').
            success(function(data) {
                //STh to do
            }).error(function(data) {
                alert('Impossible de récupéré les données du dashboard');
            });
        */
        var widgets = [
            {id:0, name:"表格", row:0, col:0, sizeX:2, sizeY:1, content:"array", type:"tyre"},
            {id:1, name:"图片", row:0, col:2, sizeX:1, sizeY:1, content:"image", type:"whatever"},
            {id:2, name:"地图", row:0, col:3, sizeX:2, sizeY:2, content:"map"},
            {id:3, name:"文字", row:1, col:0, sizeX:1, sizeY:1, content:""},
            {id:4, name:"趋势图", row:1, col:1, sizeX:2, sizeY:1, content:"graph"},
            {id:5, name:"饼图", row:2, col:0, sizeX:2, sizeY:1, content:"chart", type:"tyre"},
            {id:6, name:"可搜索表格", row:2, col:2, sizeX:3, sizeY:1, content:"array", type:"tyre with searchTab"}
        ];


        var length = Object.keys(base).length;
        length++;
        base[length] = { id:length, name:"运行版面", widgets:widgets}; //WOW SAD ! Fix THIS

        return base;
    }

    return({
        saveDashboard: saveDashboard,
        RecoverDashboard: RecoverDashboard
    });

}]);