const getPokemonUrl = id => ` https://pokeapi.co/api/v2/pokemon/${id}`

const fetchPokemon = () => {
    const pokemonPromises = []

    for (let i = 1; i <= 890; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {
            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                accumulator += `
                <li class = "card  ${types[0]}">
                    <img class = "card-image" alt= "${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
                    <h2 class = "card-tittle">${pokemon.id}.${pokemon.name.toUpperCase()}</h2>
                    <p class = "card-subtittle">${types.join(' | ')}</p>
                </li>`
                return accumulator
            }, '')

            const ul = document.querySelector('#pokedex')

            ul.innerHTML = lisPokemons
        })
}

fetchPokemon()