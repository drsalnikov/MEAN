'use strict';

angular
    .module('myApp')
    .controller('MyAccountCtrl', function(MyAccountSaver) {

    let vm = this;
    vm.account = MyAccountSaver.getData();
  
    vm.addData = function(data) {
        console.log(data);
        vm.account = MyAccountSaver.addData(data);
        vm.myAccountForm.$setPristine();
    };

});
