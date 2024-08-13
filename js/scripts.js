let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=25';
    let modalContainer = document.querySelector("#modal-container");

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
        let pokemonList = document.querySelector('.list-group');
        let listpokemon = document.createElement('li');
        listpokemon.classList.add('list-group-item');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn-primary');
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);

        button.addEventListener('click', function() {
            showDetails(pokemon)
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

    $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        modal.find('.modal-title').text('New message to ' + recipient)
        modal.find('.modal-body input').val(recipient)
      })

    // function showModal(title, text, img) {
        
        

    //     let modal = document.createElement("div");
    //     modal.classList.add("modal fade");

    //     let closeButtonElement = document.createElement("button");
    //     closeButtonElement.classList.add("btn btn-secondary");
    //     closeButtonElement.setAttribute()
    //     closeButtonElement.innerText = "Close";
    //     closeButtonElement.addEventListener("click", hideModal);

    //     let titleElement = document.createElement("modal-content");
    //     titleElement.classList.add("h5");
    //     h5.innerText = title;

    //     let contentElement = document.createElement("modal-body");
    //     contentElement.classList.add("p");
    //     pokemonImage.innerText = text;

    //     let pokemonImage = document.createElement("img")
    //     pokemonImage.classList.add()
    //     pokemonImage.setAttribute("src", img);
    //     pokemonImage.setAttribute("width", "100%");
    //     pokemonImage.setAttribute("height", "100%");
    //     pokemonImage.setAttribute("alt", "Pokemon picture");
          
    //     modal.appendChild(closeButtonElement);
    //     modal.appendChild(titleElement);
    //     modal.appendChild(contentElement);
    //     modal.appendChild(pokemonImage);
    //     modalContainer.appendChild(modal);

    //     modalContainer.classList.add("is-visible");

    //     // document.querySelector("#show-modal").addEventListener("click", () => {
    //     //     showModal("Modal tittle", "This is the modal content!"); 
    //     //      });
    // }
    
    // function hideModal() {
    //     modalContainer.classList.remove("is-visible");

    //     window.addEventListener("keydown", (e) => {
    //         if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
    //             hideModal();
    //         }
    //     });

    //     modalContainer.addEventListener("click", (e) => {
    //         let target = e.target;
    //         if (target === modalContainer) {
    //             hideModal();
    //         }
    //     });
    // }
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



