'use strict';

/**
 * @ngdoc function
 * @name webrtcStreamMobileFirstApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webrtcStreamMobileFirstApp
 */
angular.module('webrtcStreamMobileFirstApp')
.controller('MainCtrl', function ($scope, $document, $sce) {

  // Init CameraRemoteAPI
  var camera;
  var actions = [
    {method:'startLiveview', params: '[]'},
    {method:'stopLiveview', params: '[]'},
    {method:'getSupportedShootMode', params: '[]'}
  ], currentAction;

  var onSuccessStream = function (id, response){

    if(actions[currentAction].method == "startLiveview") {
      camera.getLiveviewData(response, function(base64Data) {
        document.getElementById('shoot-image').src = "data:image/jpeg;base64," + base64Data;
      });
    }

    if(actions[currentAction].method == "stopLiveview") {

      camera.stopLiveview();
      document.getElementByID('shoot-image').src = 'images/ar-dronebw.png';

    }

  };

  var onFailStream = function(id, error){

    console.log("--- error response ---")
    console.log("id: " + id);
    console.log(error);

  };

  $document[0].body.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, false); 

  $scope.$watch('switchStatus', function(newValue){

    if(newValue === undefined)return;

    if(newValue === true){

      currentAction = 0;

      if(!camera){

        camera = new CameraRemoteAPI($scope.ipAddress);

      }else{

        camera.setActionListUrl($scope.ipAddress);

      }

    }else{

      currentAction = 1;

    }

    $scope.actionID  = camera[actions[currentAction].method](actions[currentAction].params, onSuccessStream, onFailStream);

  });

  $scope.ipAddress = 'http://192.168.122.1:10000/';

  $scope.type = '--';
  $scope.handleGesture = function(event) {
    console.log(event);
    $scope.type = event.type;
  };

});
