angular.module('voting',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
    $scope.candidates = [];
    $scope.ballot = [];
    $scope.getAll = function() {
			return $http.get('/voting').success(function(data){
				angular.copy(data, $scope.candidates);
			});
    };
    $scope.getAll();
    $scope.create = function(candidate) {
			return $http.post('/voting', candidate).success(function(data){
				$scope.candidates.push(data);
			});
    };
    $scope.dovote = function() {
      console.log("In Dovote");
      angular.forEach($scope.candidates, function(value,key) {
        if(value.selected) {
          $scope.upvote(value);
          $scope.ballot.push(value);
        }
      });
    }

    $scope.upvote = function(candidate) {
      return $http.put('/voting/' + candidate._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          candidate.upvotes += 1;
        });
    };

    $scope.addCandidate = function() {
      var newObj = {Name:$scope.formContent,votes:0, image:$scope.image,price:$scope.price};
      $scope.create(newObj);
      $scope.formContent = '';
      $scope.image = '';
      $scope.price = '';
    }

    $scope.incrementUpvotes = function(candidate) {
      $scope.upvote(candidate);
    };
 
    $scope.delete = function(candidate) {
      console.log("Deleting Name "+candidate.Name+" ID "+candidate._id);
      $http.delete('/voting/'+candidate._id)
        .success(function(data){
          console.log("delete worked");
      });
      $scope.getAll();
    };
  }
]);