let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=25';

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

    function addListItem(pokemon) { // changing with the new elements and styles
        let pokemonList = document.querySelector('.list-group');
        let pokemonListItem = document.createElement('li');

        let pokemonButton = document.createElement('button');
        pokemonButton.classList.add('btn', 'btn-primary');
        pokemonButton.setAttribute('data-toggle', 'modal');
        pokemonButton.setAttribute('data-target','#pokemonModal');

        pokemonButton.innerText = pokemon.name;
        pokemonList.appendChild(pokemonListItem);
        pokemonListItem.appendChild(pokemonButton);

        pokemonButton.addEventListener('click', function(){
            showDetails(pokemon);
        });
        
        
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function() {
            showModal(
                pokemon.name, "height: " + pokemon.height, pokemon.imageUrl 
            );
        console.log(pokemon);
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
        return fetch(url).then(function(responce) {
            return responce.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showModal(title, text, imageUrl) {     // modal function using bootstrap elements
        let modalBody = document.querySelector('.modal-body');
        let imageElement = document.querySelector('.modal-img');
        let modalTitle = document.querySelector('.modal-title');
        let modalDetails = document.querySelector('.pokemon-details');

        modalTitle.innerText = title;
        imageElement.src = imageUrl; 
        modalDetails.innerText = text;
        
        modalBody.appendChild(modalDetails);
        modalBody.appendChild(modalTitle);
        modalBody.appendChild(imageElement);
        modalTitle.appendChild(modalDetails);

    }
     return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    }
})();
      
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});



