var pokemonApp = angular.module('PokemonApp', ['ngRoute', 'ngResource', 'restangular', 'ui.bootstrap', 'ngMaterial']);

angular.
module('PokemonApp')

.config(['$routeProvider', 'RestangularProvider',
    function config($routeProvider, RestangularProvider) {

        $routeProvider.
        when('/pokemons', {
            template: '<pokemon-list></pokemon-list>'
        }).
        when('/pokemons/:pokemonId', {
            template: '<pokemon-detail></pokemon-detail>'
        }).
        when('/edit/:pokemonId', {
            templateUrl: 'src/EditPokemon/EditPokemon.html',
            controller: 'EditPokemonCtrl'
        }).
        when('/create', {
            templateUrl: 'src/CreatePokemon/CreatePokemon.html',
            controller: 'CreatePokemonCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });

        RestangularProvider.setBaseUrl('https://api.backendless.com/v1/data/');

    }
])

.config(['$httpProvider', function($httpProvider) {

    $httpProvider.defaults.headers.common = {
        "application-id": "9736714B-86ED-EBFE-FF63-D1106BB6E000",
        "secret-key": "A32A42C4-C045-8D4E-FF02-EA912286AC00"
    };

}]);
