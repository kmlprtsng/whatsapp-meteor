angular
  .module('Whatsapp')
  .controller('SettingsCtrl', SettingsCtrl);
 
function SettingsCtrl($scope, $meteor, $state) {
  var user = Meteor.user();
  
  $scope.data = {
    name : user.profile.name
  };
  
  $scope.logout = logout;
 
  ////////////
 
  function logout() {
    $meteor.logout().then(function () {
      $state.go('login');
    });
  }
}