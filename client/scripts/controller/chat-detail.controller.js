angular
	.module('Whatsapp')
	.controller('ChatDetailCtrl', function ($scope, $stateParams, $ionicScrollDelegate, $timeout, $meteor) {
		var chatId = $stateParams.chatId;
		var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

		$scope.chat = $scope.$meteorObject(Chats, chatId, false);

		$scope.messages = $scope.$meteorCollection(function () {
			return Messages.find({ chatId: chatId });
		}, false);

		$scope.$watchCollection('messages', function (oldVal, newVal) {
			var animate = oldVal.length !== newVal.length;
			$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
		});
  
		$scope.data = {};
		$scope.sendMessage = function () {
			
			if (_.isEmpty($scope.data.message)) {
				return;
			}
			
			$meteor.call('newMessage', {
				text: $scope.data.message,
				chatId: chatId
			});

			delete $scope.data.message;
		};

		$scope.inputUp = inputUp;
		$scope.inputDown = inputDown;
		$scope.closeKeyboard = closeKeyboard;

		function inputUp() {
			if (isIOS) {
				$scope.data.keyboardHeight = 216;
			}

			$timeout(function () {
				$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
			}, 300);
		}

		function inputDown() {
			if (isIOS) {
				$scope.data.keyboardHeight = 0;
			}

			$ionicScrollDelegate.$getByHandle('chatScroll').resize();
		}

		function closeKeyboard() {
			// cordova.plugins.Keyboard.close();
		}
	});