(function () {
    'use strict';
    agGrid.initialiseAgGridWithAngular1(angular);
    angular
        .module('app', ["agGrid"])
        .controller('controllerTest', function ($scope, $http, $location) {
            var columnDefs = [
         {
             headerName: "Currency", field: "currency", width: 90,
             cellStyle: { "text-align": "center", "font-weight": "bold" }
         },
         {
             headerName: "Sell", field: "sell",
             cellStyle: changeRowColor,
             cellRenderer: sellCellRendererFunc
         },
         {
             headerName: "Buy", field: "buy",
             cellStyle: changeRowColor,
             cellRenderer: buyCellRendererFunc

         },
         {
             headerName: "", field: "icon", width: 60,
             cellStyle: { "text-align": "center", "font-weight": "bold" },
             cellRenderer: iconCellRendererFunc
         },
         {
             headerName: "Change (%)", field: "change",
             cellStyle: changeRowColor
         },
         {
             headerName: "High", field: "high",
             cellStyle: { "text-align": "center", "font-weight": "bold" }
         },
         {
             headerName: "Low", field: "low",
             cellStyle: { "text-align": "center", "font-weight": "bold" }
         }
            ];

            $scope.gridOptions = {
                columnDefs: columnDefs,
                rowData: null,
                getRowHeight: function (params) {
                    return 40;
                }

            };
            function sellCellRendererFunc(params) {
                if (params.data.change < 0)
                {
                    return '<button class="btn btn-default" style="color: red; font-weight: bold"  ng-bind="data.sell">' + params.data.sell + '</button>';
                }
                else if (params.data.change > 0)
                {
                    return '<button class="btn btn-default" style="color: blue; font-weight: bold"  ng-bind="data.sell">' + params.data.sell + '</button>';

                }
                else {
                    return '<button class="btn btn-default" style="color: black; font-weight: bold"  ng-bind="data.sell">' + params.data.sell + '</button>';

                }
                
            }

            function iconCellRendererFunc(params) {
                if (params.data.change < 0) {
                    return '<span style="color: red; font-weight: bold" class="glyphicon glyphicon-triangle-bottom"></span>';
                }
                else if (params.data.change > 0) {
                    return '<span style="color: blue; font-weight: bold" class="glyphicon glyphicon-triangle-top"></span>';

                }
                else {
                    return '<span></span>';

                }

            }
            function buyCellRendererFunc(params) {
                if (params.data.change < 0) {
                    return '<button class="btn btn-default" style="color: red; font-weight: bold"  ng-bind="data.buy">' + params.data.buy + '</button>';
                }
                else if (params.data.change > 0) {
                    return '<button class="btn btn-default" style="color: blue; font-weight: bold"  ng-bind="data.buy">' + params.data.buy + '</button>';

                }
                else {
                    return '<button class="btn btn-default" style="color: black; font-weight: bold"  ng-bind="data.buy">' + params.data.buy + '</button>';

                }

            }
            function changeRowColor(params) {

                if (params.data.change < 0) {
                    return { 'color': 'red', 'text-align': 'center' };
                }
                else if (params.data.change > 0)
                {
                    return { 'color': 'blue', 'text-align': 'center' };
                }
                else
                {
                    return { 'color': 'black', 'text-align': 'center' };
                }

            }
            

        $http.get("../data/currency.json")
        .then(function (res) {
            setInterval(random, 1000);
            function random() {
                res.data.forEach(function (dt) {
                    var rateSell = Math.floor(Math.random() * (30 - (-30) + 1) + (-30)) / 1000;
                    var rateBuy = Math.floor(Math.random() * (30 - (-30) + 1) + (-30)) / 1000;
                    var valueChangeSell = (parseFloat(dt.sell) * rateSell) + parseFloat(dt.sell);
                    var valueChangeBuy = (parseFloat(dt.buy) * rateBuy) + parseFloat(dt.buy);
                    if (valueChangeSell > valueChangeBuy)
                    {
                        dt.change = rateSell;
                        dt.sell = valueChangeSell.toFixed(4);
                        dt.buy = valueChangeBuy.toFixed(4);
                        if (dt.sell > dt.high)
                        {
                            dt.high = dt.sell;
                        }
                        if (dt.buy < dt.low || dt.low == 0) {
                            dt.low = dt.buy;
                        }
                    }
                    

                    $scope.gridOptions.api.refreshView();
                })
            }
                
            $scope.gridOptions.api.setRowData(res.data);

            
        });


        });

})();


