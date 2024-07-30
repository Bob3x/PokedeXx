let pokemonList = [
    { name: "Balbasure", height: 0.7, type: "grass" },
    { name: "Charizard", heigt: 1.7, type: ['fire', 'flying'] },
    { name: "Ivysour", height: 1, type: ['grass', 'poison'] },
    { name: "Venusour", height: 2, type: ['grass', 'poison'] },
    { name: "Charmander", height: 0.6, type: fire }
];

for (let i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i];
        document.write (pokemon.name + pokemon.height);
    if (pokemon.height > 1) {
        document.write (' - Wow, that is huge! ');
    }
}

