'use strict';

pokemonApp.component('pokemonList', {

    controller: function PokemonListCtrl(PokemonsService, Restangular, $log) {
        var self = this;

        Restangular.one('pokemon').get().then(function(response) {
            console.log('trulala!');
            console.log(response.data);
            autocomplete(response.data);
            self.pokemons = response.data;
        });

        function autocomplete (data) {

          self.states        = loadAll(data);
          self.simulateQuery = false;
          self.isDisabled    = false;
          self.querySearch   = querySearch;
          self.selectedItemChange = selectedItemChange;
          self.searchTextChange   = searchTextChange;

          // ******************************
          function loadAll(pokemons) {
            return pokemons.map( function (pokemon) {
              return {
                value: pokemon.name.toLowerCase(),
                display: pokemon.name
              };
            });
          }

          function searchTextChange(text) {
            $log.info('Text changed to ' + text);
          }

          function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
          }

          function querySearch (query) {
            var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
                deferred;

              return results;
          }

          function createFilterFor(query) {
            var caseQuery = angular.lowercase(query);
            return function filterFn(state) {
              return (state.value.indexOf(caseQuery) === 0);
            };
          }
        }

    },

    templateUrl: './src/PokemonList/PokemonList.html'

});
