let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=50";
    let isLoading = false;

    function sortPokemonList(sortType) {
        let sortedList = [...getAll()];

        switch (sortType) {
            case "aToZ":
                sortedList.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "zToA":
                sortedList.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                // Return original order from API
                sortedList = [...pokemonList];
        }

        // Clear and rebuild list
        const listContainer = document.querySelector("#pokemon-list");
        listContainer.innerHTML = "";
        sortedList.forEach((pokemon) => addListItem(pokemon));
    }

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
        pokemonButton.classList.add("btn", "btn-primary", "w-100", "pokemon-button");
        pokemonButton.setAttribute("data-toggle", "modal");
        pokemonButton.setAttribute("data-target", "#pokemonModal");
        pokemonButton.innerText = pokemon.name;

        let thumbnailContainer = document.createElement("div");
        thumbnailContainer.className = "pokemon-thumbnail";

        let thumbnail = document.createElement("img");
        thumbnail.className = "pokemon-preview";
        thumbnail.alt = pokemon.name;

        thumbnailContainer.appendChild(thumbnail);

        pokemonButton.appendChild(thumbnailContainer);
        col.appendChild(pokemonButton);
        pokemonList.appendChild(col);

        loadDetails(pokemon).then(() => {
            thumbnail.src = pokemon.imageUrl;
        });

        pokemonButton.addEventListener("click", function () {
            showDetails(pokemon);
        });
    }

    function loadList() {
        // load list function with promise
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
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
        if (isLoading) {
            console.log("Loading in progress...");
            return new Promise((resolve) => {
                // Wait and retry
                setTimeout(() => {
                    resolve(loadDetails(item));
                }, 100);
            });
        }

        // Set loading state
        isLoading = true;
        console.log("Starting load for:", item.name);

        // load details function with promise
        let url = item.detailsUrl;
        return fetch(url)
            .then((response) => response.json())
            .then((details) => {
                console.log("Details loaded:", details);
                item.imageUrl = details.sprites.other["official-artwork"].front_default;
                item.height = details.height;
                item.types = details.types;
                return item;
            })
            .catch((error) => {
                console.error("Error loading details:", error);
                throw error;
            })
            .finally(function () {
                isLoading = false;
            });
    }

    function showDetails(pokemon) {
        // Fetch Pokemon details
        loadDetails(pokemon)
            .then(() => {
                // Get modal elements
                const modalTitle = document.querySelector("#pokemonModalTitle");
                const modalBody = document.querySelector(".modal-body");
                const modalImage = document.querySelector(".modal-img");
                const pokemonDetails = document.querySelector(".pokemon-details");

                // Verify modal elements exist
                if (!modalTitle || !modalBody || !modalImage || !pokemonDetails) {
                    console.error("Modal elements not found. Check HTML for:", {
                        title: !!modalTitle,
                        body: !!modalBody,
                        image: !!modalImage,
                        details: !!pokemonDetails
                    });
                    return;
                }

                // Update modal content
                modalTitle.innerText = pokemon.name;
                modalImage.src = pokemon.imageUrl;
                pokemonDetails.innerHTML = `
                <p>Height: ${pokemon.height}</p>
                <p>Types: ${pokemon.types.map((type) => type.type.name).join(", ")}</p>
            `;
            })
            .catch((error) => {
                console.error("Error loading details:", error);
            });
    }

    function searchPokemon(searchText) {
        const searchResults = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchText.toLowerCase())
        );

        // Clear and rebuild list with filtered results
        const listContainer = document.querySelector("#pokemon-list");
        listContainer.innerHTML = "";
        searchResults.forEach((pokemon) => addListItem(pokemon));
    }

    function initializeApp() {
        return loadList().then(function () {
            getAll().forEach(function (pokemon) {
                addListItem(pokemon);
            });

            // Sort listener
            const sortSelect = document.querySelector("#sortSelect");
            if (sortSelect) {
                sortSelect.addEventListener("change", (e) => {
                    sortPokemonList(e.target.value);
                });
            }

            // Search listener
            const searchInput = document.querySelector("#searchInput");
            if (searchInput) {
                searchInput.addEventListener("input", (e) => {
                    searchPokemon(e.target.value);
                });
            }
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        sortPokemonList: sortPokemonList,
        searchPokemon: searchPokemon,
        initializeApp: initializeApp
    };
})();

document.addEventListener("DOMContentLoaded", () => {
    pokemonRepository.initializeApp();
});
