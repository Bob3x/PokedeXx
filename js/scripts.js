let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=50";

    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon && "detailsUrl" in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        // changing with the new elements and styles
        let pokemonList = document.querySelector("#pokemon-list");
        let col = document.createElement("div");
        col.className = "col-sm-3 mb-4";

        let pokemonButton = document.createElement("button");
        pokemonButton.classList.add("btn", "btn-primary", "w-100");
        pokemonButton.setAttribute("data-toggle", "modal");
        pokemonButton.setAttribute("data-target", "#pokemonModal");
        pokemonButton.innerText = pokemon.name;

        col.appendChild(pokemonButton);
        pokemonList.appendChild(col);

        pokemonButton.addEventListener("click", function () {
            showDetails(pokemon);
        });
    }

    function loadList() {
        // load list function with promise
        return fetch(apiUrl)
            .then(function (responce) {
                return responce.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };

                    add(pokemon);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    function loadDetails(item) {
        // load details function with promise
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (responce) {
                return responce.json();
            })
            .then(function (details) {
                const pokemonId = details.id;
                item.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

                if (!item.imageUrl) {
                    item.imageUrl = details.sprites.other["official-artwork"].front_default;
                }

                item.height = details.height;
                item.types = details.types;
                return item;
            })
            .catch(function (error) {
                console.error("Error loading pokemon details:", error);
            });
    }
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            let modalTitle = document.querySelector("#pokemonModalTitle");
            let modalBody = document.querySelector(".modal-body");
            let modalImage = document.querySelector(".modal-img");

            modalTitle.innerText = pokemon.name;
            modalImage.src = pokemon.imageUrl;
            modalBody.innerHTML += `
                <div class="pokemon-details">
                    <p>Height: ${pokemon.height}</p>
                    <p>Types: ${pokemon.types.map((type) => type.type.name).join(", ")}</p>
                </div>
            `;
        });
    }
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
