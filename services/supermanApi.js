const supermanSeed = [
    {
        heroId: 644,
        name: "Superman",
        fullName: "Clark Kent",
        publisher: "DC Comics",
        alignment: "good",
        gender: "Male",
        race: "Kryptonian",
        height: ["6'3", "191 cm"],
        weight: ["225 lb", "101 kg"],
        occupation: "Reporter for the Daily Planet and novelist",
        base: "Metropolis",
        groupAffiliation:
            "Justice League of America, The Legion of Super-Heroes (pre-Crisis as Superboy); Justice Society of America (pre-Crisis Earth-2 version); All-Star Squadron (pre-Crisis Earth-2 version)",
        relatives:
            "Lois Lane (wife), Jor-El (father, deceased), Lara (mother, deceased), Jonathan Kent (adoptive father), Martha Kent (adoptive mother), Seyg-El (paternal grandfather, deceased), Zor-El (uncle, deceased), Alura (aunt, deceased), Supergirl (Kara Zor-El, cousin), Superboy (Kon-El/Conner Kent, partial clone)",
        powerstats: {
            intelligence: "94",
            strength: "100",
            speed: "100",
            durability: "100",
            power: "100",
            combat: "85",
        },
        image: "",
    },
    {
        heroId: 70,
        name: "Batman",
        fullName: "Bruce Wayne",
        publisher: "DC Comics",
        alignment: "good",
        gender: "Male",
        race: "Human",
        height: ["6'2", "188 cm"],
        weight: ["210 lb", "95 kg"],
        occupation: "Businessman",
        base: "Batcave, Stately Wayne Manor, Gotham City; Hall of Justice, Justice League Watchtower",
        groupAffiliation:
            "Batman Family, Batman Incorporated, Justice League, Outsiders, Wayne Enterprises, Club of Heroes, formerly White Lantern Corps, Sinestro Corps",
        relatives:
            "Damian Wayne (son), Dick Grayson (adopted son), Tim Drake (adopted son), Jason Todd (adopted son), Cassandra Cain (adopted ward)\nMartha Wayne (mother, deceased), Thomas Wayne (father, deceased), Alfred Pennyworth (former guardian), Roderick Kane (grandfather, deceased), Elizabeth Kane (grandmother, deceased), Nathan Kane (uncle, deceased), Simon Hurt (ancestor), Wayne Family",
        powerstats: {
            intelligence: "100",
            strength: "26",
            speed: "27",
            durability: "50",
            power: "47",
            combat: "100",
        },
        image: "",
    },
]

const clone = (value) => JSON.parse(JSON.stringify(value))

const normalize = (value) => String(value || "").trim().toLowerCase()

const getSupermanByNameOrId = async (value) => {
    const normalizedValue = normalize(value)
    const byId = supermanSeed.find((item) => String(item.heroId) === normalizedValue)
    if (byId) {
        return clone(byId)
    }

    const byName = supermanSeed.find((item) => normalize(item.name) === normalizedValue)
    if (byName) {
        return clone(byName)
    }

    throw new Error("hero not found")
}

const getSupermanList = async (name) => {
    const normalizedValue = normalize(name)

    if (!normalizedValue) {
        return clone(supermanSeed)
    }

    return clone(
        supermanSeed.filter(
            (item) =>
                normalize(item.name).includes(normalizedValue) ||
                normalize(item.fullName).includes(normalizedValue) ||
                normalize(item.publisher).includes(normalizedValue)
        )
    )
}

const getSeedSupermans = () => clone(supermanSeed)

module.exports = {
    getSeedSupermans,
    getSupermanByNameOrId,
    getSupermanList,
}
