let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // let img = document.createElement("img");
    // img.src = "https://images.app.goo.gl/w4ntWaknWRrtMYmU6";
    // let src = ducument.getElementById("img");
    // src.appendChild(img); - Adding img but document is not difined ?

    function add(pokemon) {
        if (
            typeof pokemon === "object" && 
            "name" in pokemon && 
            "detailsUrl" in pokemon
        ){
            pokemonList.push(pokemon);
        }else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listpokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);

        button.addEventListener('click', function () {
            showDetails(pokemon)
        });
    }

    function showDetails(item){
        pokemonRepository.loadDetails(item).then(function () {
        console.log(item);
        });
    }

    function loadList() { // load list function with promise
        return fetch(apiUrl).then(function (responce) {
            return responce.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    function loadDetails(item) {     // load details function with promise
        let url = item.detailsUrl;
        return fetch(url).then(function (responce) {
            return responce.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});





// const result = pokemonRepository.getAll().filter((word) => word.check === "grass");

// document.write(result);


   
    

// for (let i = 0; i < pokemonList.length; i++) {
//     let pokemon = pokemonList[i];
//         document.write ('<p>' + pokemon.name + ' (height: '+ pokemon.height +')');
//     if (pokemon.height > 1.7) {
//         document.write ('<strong> - Wow, that is huge! </strong>');
//     }
// }

// pokemonList.forEach(function(pokemon) {
//     document.write ('<p>' + pokemon.name + " " + "is" + " " + pokemon.height + "m" );

// })

// function PokemonLoop(pokemon) {
//     document.write ('<p>' + pokemon.name + " " + "is" + " " + pokemon.height + "m" );

// }

 


// function divide (dividend, divisor){
//     if (divisor === 0){
//         return "You're trying to divide by zero."
//     }else{
//         let result = dividend / divisor;
//         return result;   
//     }
//     document.write(divide(4,2));
// }


