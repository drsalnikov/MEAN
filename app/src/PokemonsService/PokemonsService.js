angular
    .module('PokemonApp')
    .factory('PokemonsService', function($http) {

      // Мой
      $http.defaults.headers.post['application-id'] =  "9736714B-86ED-EBFE-FF63-D1106BB6E000";
      $http.defaults.headers.post['secret-key'] =  "A32A42C4-C045-8D4E-FF02-EA912286AC00";

      //Максим
      //$http.defaults.headers.post['application-id'] =  "4B730C92-F81E-236B-FFF0-6651FE882800";
      //$http.defaults.headers.post['secret-key'] =  "CB6DE86C-6069-86C4-FF1C-9049D5AC9400";

      $http.defaults.headers.put['application-id'] =  "4B730C92-F81E-236B-FFF0-6651FE882800";
      $http.defaults.headers.put['secret-key'] =  "CB6DE86C-6069-86C4-FF1C-9049D5AC9400";


            return {

                getPokemons: function() {
                    return $http.get('http://pokeapi.co/api/v2/pokemon/?limit=10');
                    //return $http.get('https://api.backendless.com/v1/data/pokemon');
                },

                getPokemon: function(pokemonId) {
                    return $http.get('http://pokeapi.co/api/v2/pokemon/' + pokemonId);
                    //return $http.get('https://api.backendless.com/v1/data/pokemon' + pokemonId);
                },

                createPokemon: function(pokemonData) {
                    return $http({
                        method: 'POST',
                        url: 'https://api.backendless.com/v1/data/pokemon',
                        data: pokemonData
                    });
                },

                deletePokemon: function(pokemonId) {
                    return $http({
                        method: 'DELETE',
                        url: 'https://api.backendless.com/v1/data/pokemon/' + pokemonId,
                        headers: {
                            "application-id": "4B730C92-F81E-236B-FFF0-6651FE882800",
                            "secret-key": "CB6DE86C-6069-86C4-FF1C-9049D5AC9400"

                        }
                    });
                },

                updatePokemon: function(pokemonID, pokemon) {
                    return $http({
                        method: 'PUT',
                        url: 'https://api.backendless.com/v1/data/pokemon/' + pokemonID,
                        data: pokemon
                    });
                }

            }

        }

    );
