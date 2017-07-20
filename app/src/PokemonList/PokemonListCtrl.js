'use strict';

pokemonApp.controller('PokemonListCtrl', function($scope, $q, PokemonsService, BerriesService) {

    $scope.pokemonLoaded = false;

    $q.all({
            pokemonResp: PokemonsService.query(),
            berriesResp: BerriesService.query()
        }).then(function(values){

            $scope.pokemons = values.pokemonResp;
            $scope.berries = values.berriesResp;
            $scope.pokemonLoaded = true;
        });    

});
