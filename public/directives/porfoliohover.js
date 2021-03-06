app.directive('portfolioView', function($state) {
  return {
    restrict: 'E',
    scope: {
      student: "="
    },
    templateUrl: '/html-templates/hoverPortfolio.html',
    controller: function($scope) {
      $scope.hidden = false;
      $scope.showHidden = function(e) {
        $scope.hidden = true;
      }
      $scope.hide = function(e) {
        $scope.hidden = false;
      }
      $scope.goStudent = function(id) {
        $state.go('student', {
          id: id
        })
      };
    }
  }
});
