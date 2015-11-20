angular
  .module('Whatsapp')
  .controller('ChatsCtrl', ChatsCtrl);
 
function ChatsCtrl ($scope, $ionicModal, $meteor) {
  $scope.chats = $scope.$meteorCollection(Chats, false);
  
  $ionicModal.fromTemplateUrl('client/templates/new-chat.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });
 
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });
 
  $scope.openNewChatModal = openNewChatModal;
  
  $scope.remove = function(chat){
   $meteor.call('removeChat', chat._id);
  }
  
  function openNewChatModal () {
    $scope.modal.show();
  }
}