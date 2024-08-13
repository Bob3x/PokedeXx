let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=25';
    // let modalContainer = document.querySelector("#modal-container");

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
        let pokemonListItem = document.createElement('li');
        // pokemonListItem.classList.add('list-group-item-active');

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
        
        

        // $('[data-toggle="modal"]').on('click', function() {
        //     showDetails(pokemon)
        //     let targetSelector = $(this).attr('data-target');
        //     $(targetSelector).modal('show');
        // });
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function() {
            showModal(
                pokemon.name, "height: " + pokemon.height + " types: " + pokemon.types, pokemon.imageUrl 
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

    function showModal(title, text, imageUrl) {
        let modalBody = document.querySelector('.modal-body');
        let imageElement = document.querySelector('.modal-img');
        let modalTitle = document.querySelector('.modal-title');
        let modalDetails = document.querySelector('.pokemon-details');

        // modalTitle.empty();
        // modalHeader.empty();

        
        modalTitle.innerText = title;
        
        
        // let imageElement = $('<img class="modal-img" style="width:50%">');
        imageElement.src = imageUrl; 
        modalDetails.innerText = text;
        // let imageElementBack = $('<img class="modal-img" style="width:50%">');
        // imageElementBack.attr('src', item.imageUrlBack);

        // let heightElement = $('<p>' + 'height : ' + pokemon.height + '</p>');
        // let typesElement = $('<p>' + 'types : ' + pokemon.types + '</p>');
        modalBody.appendChild(modalDetails);
        modalBody.appendChild(modalTitle);
        modalBody.appendChild(imageElement);
        modalTitle.appendChild(modalDetails);

    

    }

    // $('[data-toggle="modal"]').on('click', function(){
    //     let targetSelector = $(this).attr('data-target');
    //     $(targetSelector).modal('show'); // Bootstrap’s own function to make the modal appear
    //   });

    //   $('[data-dismiss="modal"]').on('click', function(){
    //     let targetSelector = $(this).attr('data-target');
    //     $(targetSelector).modal('hide'); // Bootstrap’s own function to make the modal appear
    //   });



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



