angular.module('app', [])
  .controller('mainCtrl', mainCtrl)
  .directive('avatar', avatarDirective);

function mainCtrl ($scope) {

  $scope.users = [];

  $scope.addNew = function (user) {
    $scope.users.push({ 
      email: user.email,
      name: user.name,
      avatarUrl: user.url
    });
    
    user.name = '';
    user.url = '';
    user.email = '';
  };
}

function avatarDirective () {
  return {
    scope: {
      user: '='
    },
    restrict: 'E',
    replace: 'true',
    template: (
      '<div class="Avatar">' +
        '<img ng-src="{{user.avatarUrl}}" />' +
        '<h4>{{user.name}}</h4>' +
        '<h5>{{user.email}}</h5>' +
      '</div>'
    ), 
    link: link
  };
  
  function link (scope) {
    if (!scope.user.avatarUrl) {
      scope.user.avatarUrl = 'user.png';
    }
  }
}