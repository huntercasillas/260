angular.module('News', ['ui.router'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl'
                })
                .state('posts', {
                    url: '/posts/{id}',
                    templateUrl: '/posts.html',
                    controller: 'PostsCtrl'
                });

            $urlRouterProvider.otherwise('home');
        }
    ])
    .factory('postFactory', [function() {
        var o = {
            posts: []
        };
        return o;
    }])
    .controller('MainCtrl',
        function($scope, $http, postFactory) {
            $scope.test = 'Hello world!';

             $scope.posts= postFactory.posts;
            
            $scope.addPost = function() {
             $http.get("https://dog.ceo/api/breeds/image/random")
            .then(function(response)  {
                console.log(response.data.message);
                $scope.posts.push({
                    image: response.data.message,
                    title: $scope.formContent,
                    upvotes: 0,
                    comments: []
                });
                $scope.formContent = '';
            })
            };
            
            $scope.incrementUpvotes = function(post) {
                post.upvotes += 1;
            };

        })
        
         .controller('PostsCtrl', [
        '$scope',
        '$stateParams',
        'postFactory',
        function($scope, $stateParams, postFactory) {
            $scope.post = postFactory.posts[$stateParams.id];

            $scope.addComment = function() {
                if ($scope.body === '') { return; }
                $scope.post.comments.push({
                    body: $scope.body,
                    upvotes: 0
                });
                $scope.body = '';
            };

            $scope.incrementUpvotes = function(comment) {
                comment.upvotes += 1;
            };
        }
    ]);

