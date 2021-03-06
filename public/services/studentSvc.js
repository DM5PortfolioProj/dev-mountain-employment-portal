app.service('studentSvc', function($http, $q) {

  this.getStudent = function(id) {
    console.log('this is service id', id);
    var deferred = $q.defer();
    $http({
      url: 'http://localhost:3000/api/student/' + id,
      method: 'GET',
    }).then(function(response) {

      deferred.resolve(response.data);
    })
    return deferred.promise;
  }

})
