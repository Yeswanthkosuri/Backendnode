const POKE_API_BASE_URL = "https://pokeapi.co/api/v2"

const fetchFromPokeApi = async (path) => {
    const response = await fetch(`${POKE_API_BASE_URL}${path}`)

    if (!response.ok) {
        const error = new Error(`PokeAPI request failed with status ${response.status}`)
        error.statusCode = response.status
        throw error
    }

    return response.json()
}

const mapPokemon = (pokemon) => ({
    pokemonId: pokemon.id,
    name: pokemon.name,
    baseExperience: pokemon.base_experience,
    height: pokemon.height,
    weight: pokemon.weight,
    types: pokemon.types.map((item) => item.type.name),
    abilities: pokemon.abilities.map((item) => item.ability.name),
    image: pokemon.sprites.other?.["official-artwork"]?.front_default || pokemon.sprites.front_default,
})

const getPokemonList = async (limit = 20, offset = 0) => {
    const data = await fetchFromPokeApi(`/pokemon?limit=${limit}&offset=${offset}`)
    const pokemonList = await Promise.all(
        data.results.map((item) => fetchFromPokeApi(`/pokemon/${item.name}`))
    )

    return pokemonList.map(mapPokemon)
}

const getPokemonByNameOrId = async (value) => {
    const pokemon = await fetchFromPokeApi(`/pokemon/${String(value).toLowerCase()}`)
    return mapPokemon(pokemon)
}

module.exports = {
    getPokemonByNameOrId,
    getPokemonList,
}
