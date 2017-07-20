angular
    .module('PokemonApp')
    .factory('BerriesService', function($http) {

            return {

                getBerries: function() {
                    return $http.get('http://pokeapi.co/api/v2/berry/?limit=5');
                    //return $http.get('https://api.backendless.com/v1/data/berry');
                }

            }

        }

    );
