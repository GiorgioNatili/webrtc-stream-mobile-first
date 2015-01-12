'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('webrtcStreamMobileFirstApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
	
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('contain a default value for the detected gesture', function () {
    expect(scope.type.length).toBeGreaterThan(1);
  });

  it('should define a value for the ip address of the target camers', function(){
  
    expect(scope.ipAddress.length).toBeGreaterThan(10);

  });

});
