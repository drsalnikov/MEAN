'use strict';

angular
    .module('myApp')
    .factory('MyAccountSaver', function() {

        const state = {
            account: {}
        };

        return {
            getData()  {
                return state.account;
            },
            addData(data) {
                state.account = data;
                return state.account;
            },
            removeItem(itemId) {
                delete state.account;
            }
        };

    })
