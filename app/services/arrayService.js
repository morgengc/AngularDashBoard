/**
 * arrayService 服务，提供表格数据
 *
 * @method arrayService
 * @param {Object} 无
 * @return 服务接口函数
 */
app.factory('arrayService', [function() {

    // 表数据
    var dataTab = [
        { name: 'Fish', fish: 'Crab', tastiness: 2 },
        { name: 'Fisher', fish: 'Tuna', tastiness: 4 },
        { name: 'Fishing', fish: 'Eel', tastiness: 7 },
        { name: 'FinishHim', fish: 'Variety', tastiness: 6 }
    ];

    // 表头
    var dataTabTitle = [{title:'Fishing fish',column:'name'},{title:'Fish Type',column:'fish'},{title:'Taste Level',column:'tastiness'}]

    var getDataTab = function () {
        return dataTab
    };

    var getDataTitle = function(){
        return dataTabTitle
    };

    return { 
        getDataTab: getDataTab,
        getDataTitle: getDataTitle
    };

}]);