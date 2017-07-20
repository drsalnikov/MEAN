'use strict';

pokemonApp.controller('PokemonListCtrl', function($scope, PokemonsService, BerriesService, $q) {

    $scope.pokemonLoaded = false;

    $q.all({
            pokemonResp: PokemonsService.getPokemons(),
            berriesResp: BerriesService.getBerries()
        }).then(function(values){
            $scope.pokemons = values.pokemonResp.data.results;
            $scope.berries = values.berriesResp.data.results;
            $scope.pokemonLoaded = true;
        });

});
