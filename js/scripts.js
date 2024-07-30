let pokemonList = [
    { name: "Balbasure", height: 0.7, type: "grass" },
    { name: "Charizard", height: 1.7, type: ['fire', 'flying'] },
    { name: "Ivysour", height: 1, type: ['grass', 'poison'] },
    { name: "Venusour", height: 2, type: ['grass', 'poison'] },
    { name: "Charmander", height: 0.6, type: "fire" }
];

for (let i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i];
        document.write ('<p>' + pokemon.name + ' (height: '+ pokemon.height +')');
    if (pokemon.height > 1.7) {
        document.write ('<strong> - Wow, that is huge!');
    }
}

