angular.module('app', [])
  .controller('HBCtrl', function SimpleCtrl($scope){

    var values = [-2, -1, 0, 1, 2, 3];

    $scope.params = {
      sci: 120, mi: 25, gsi:100, d:0.9
    };

    $scope.$watchCollection('params', function(params){
      var sci = params.sci;
      var mi = params.mi;
      var gsi = params.gsi;
      var d = params.d;
      $scope.values = HBarray(values, sci, mi, gsi, d);
    });

  })
  .directive('simpleLine', function(){
    return {
      restrict: 'C',
      replace: true,
      scope: {
        items: '='
      },
      template: '<div id="container"></div>',
      link: function (scope, element, attrs){
        var chart = new Highcharts.Chart({
          chart: {
            renderTo: 'container',
          },
          title: {
            text: 'Hoek-Brown failure criterion'
          },
          series: [{
            name: 'HB failure criterion',
            type: 'line',
            data: scope.items
          }],
          credits: {
            enabled: false
          }
        });

        scope.$watch('items', function(newValue){
          chart.series[0].setData(newValue, true);
        }, true);

      }
    };
  });
