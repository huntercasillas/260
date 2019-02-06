angular.module('comment', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.comments = [];
            $scope.addComment = function() {
                var newcomment = { title: $scope.formContent, url: $scope.formURL, owner: $scope.formOwner, upvotes: 0, compliments: [] };
                $scope.formContent = '';
                $scope.formURL = '';
                $http.post('/comments', newcomment).success(function(data) {
                    $scope.comments.push(data);
                });
            };
            $scope.incrementUpvotes = function(comment) {
                $http.put('/comments/' + comment._id + '/upvote')
                    .success(function(data) {
                        console.log("upvote worked");
                        comment.upvotes += 1;
                        console.log(comment.url);
                    });
            };
            
            $scope.addCompliment = function(comment) {
              comment.compliments.push($scope.formCompliment)  
          //didn't finish
            };
            //also didn't finish
          //   <input placeholder="Say something nice!" type="text" ng-model="formCompliment"></input>
        //        <button type="submit" ng-click="addCompliment(comment); getCompliments(comment)">Give compliment!</button> <button type="submit" ng-click="getCompliments(comment)">See comments</button>
          //      <div ng-bind-html="complimentText">
            //    </div>
            $scope.getCompliments = function(comment) {
              comps = "<ul>"
              for (compliment in comment.compliments)
              {
                  comps += "<li>" + compliment + "</li>";
              }
              comps += "</ul>"
              $scope.complimentText = comps;
            };
            $scope.delete = function(comment) {
                $http.delete('/comments/' + comment._id)
                    .success(function(data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
            $scope.getAll = function() {
                return $http.get('/comments').success(function(data) {
                    angular.copy(data, $scope.comments);
                });
            };
            $scope.getAll();
        }
    ]);
