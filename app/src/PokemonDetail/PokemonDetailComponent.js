'use strict';

pokemonApp.component('pokemonDetail',  {

    controller: function PokemonDetailCtrl($routeParams, PokemonsService) {
      var self = this;
      this.pokemonLoaded = false;

      this.pokemon = PokemonsService.get({
          pokemonId: $routeParams['pokemonId']
      }, function(successResult) {
          // Окей!
          self.notfoundError = false;
          self.activeTab = 0;
          self.disableControlTab = false;
      }, function(errorResult) {
          // Не окей...
          self.notfoundError = true;
      });

      this.pokemon.$promise.then(function(result) {
          self.pokemonLoaded = true;
      });

      this.deletePokemon = function(pokemonId) {
          self.pokemon.$delete({
              pokemonId: pokemonId
          }, function(successResult) {
              // Окей!
              self.deletionSuccess = true;
          }, function(errorResult) {
              // Не окей..
              self.deletionError = true;
          });
      }

    },

    templateUrl: './src/PokemonDetail/PokemonDetail.html'

});
