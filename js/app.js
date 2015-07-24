angular.module('app', [])
  .controller('HBCtrl', function SimpleCtrl($scope){

    var values = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8 , 9, 10];

    $scope.params = {
      sci: 30, mi: 10, gsi:50, d:0, s3max: 7.5
    };

    $scope.$watchCollection('params', function(params){
      var sci = params.sci;
      var mi = params.mi;
      var gsi = params.gsi;
      var d = params.d;
      var s3max = params.s3max;
      params.s = Math.round(param_s(gsi, d) * 1000) / 1000;
      params.a = Math.round(param_a(gsi) * 1000) / 1000;
      params.mb = Math.round(param_mb(mi, gsi, d) * 1000) / 1000;
      $scope.hoekBrown = HBarray(values, sci, mi, gsi, d);
      $scope.mohrCoulomb = MCArray(values, sci, mi, gsi, d, s3max);
    });

  })
  .directive('simpleLine', function(){
    return {
      restrict: 'C',
      replace: true,
      scope: {
        items: '=',
        items2: '='
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
          tooltip: {
            pointFormat: '{point.y:.2f}'
          },
          series: [{
            name: 'Hoek Brown failure criterion',
            type: 'line',
            data: scope.items
          }, {
            name: 'Morh Coulomb failure criterion',
            type: 'line',
            data: scope.items2
          }],
          credits: {
            enabled: false
          }
        });

        scope.$watch('items', function(newValue){
          chart.series[0].setData(newValue, true);
        }, true);
        scope.$watch('items2', function(newValue){
          chart.series[1].setData(newValue, true);
        }, true);

      }
    };
  });
