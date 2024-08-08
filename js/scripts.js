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
        let pokemonList = document.querySelector('.pokemon-list');
        let listpokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
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



    function showModal(title, text, img) {
        
        modalContainer.innerHTML = "";

        let modal = document.createElement("div");
        modal.classList.add("modal");

        let closeButtonElement = document.createElement("button");
        closeButtonElement.classList.add("modal-close");
        closeButtonElement.innerText = "Close";
        closeButtonElement.addEventListener("click", hideModal);

        let titleElement = document.createElement("h1");
        titleElement.innerText = title;

        let contentElement = document.createElement("p");
        contentElement.innerText = text;

        let pokemonImage = document.createElement("img")
        pokemonImage.setAttribute("src", img);
        pokemonImage.setAttribute("width", "100%");
        pokemonImage.setAttribute("height", "100%");
        // pokemonImage.src = pokemonImage.imageUrl;
        
        
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);

        modalContainer.classList.add("is-visible");

        // document.querySelector("#show-modal").addEventListener("click", () => {
        //     showModal("Modal tittle", "This is the modal content!"); 
        //      });
    }
    
    function hideModal() {
        modalContainer.classList.remove("is-visible");

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
                hideModal();
            }
        });

        modalContainer.addEventListener("click", (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    // function formValidate() {
    //     let form = document.querySelector("#register-form");
    //     let emailInput = document.querySelector("#email");
    //     let passwordInput = document.querySelector("#password");

    // function validateEmail() {
    //         if (!value) { // if value is NOT true 
    //             showErrorMessage(emailInput, "Email is a required field.");
    //             return false;
    //         }

    //         if (value.indexOf("@") === -1) {
    //             showErrorMessage(emailInput, "You must enter a valid email address.");
    //             return false;
    //         }

    //         if (value.indexOf(".") === -1) {
    //             showErrorMessage(emailInput, "You must enter a valid email address.");
    //             return false;
    //         }

    //         showErrorMessage(emailInput, null);
    //         return true;
    //     }
    //     emailInput.addEventListener("input", validateEmail);

    // function validatePassword() {
    //         // let value = passwordInput.value;
    //         // return value && value.length >= 8;

    //         if (!value) {
    //             showErrorMessage(passwordInput, "Password is a required field.");
    //             return false;
    //         }

    //         if (value.length < 8) {
    //             showErrorMessage(passwordInput, "The password needs to be at least 8 characters.");
    //             return false;
    //         }

    //         showErrorMessage(passwordInput, null);
    //         return true;
    //     }
    //     passwordInput.addEventListener("input", validatePassword);

    // function showErrorMessage(input, message) {
    //         let container = input.parentElement; // .input-wrapper

    //         let error = container.querySelector(".error-message");
    //         if (error) {
    //             container.removeChild(error);
    //         } // check and remove any existing errors 

    //         if (message) {
    //             let error = document.createElement("div");
    //             error.classList.add("error-message");
    //             error.innerText = message;
    //             container.appendChild(error);
    //         }
    //     } // now add the error if the message isn't empty

    // function validateForm() {
    //         let isValidEmail = validateEmail();
    //         let isValidPassword = validatePassword();
    //         return isValidEmail && isValidPassword;
    //     }

    //     form.addEventListener("submit", (e) => {
    //         e.preventDefault(); // Do not submit to the server
    //         if (validateForm()) {
    //             alert("Success!");
    //         }
    //     });
    // }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,

    }
})();
      
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});












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


