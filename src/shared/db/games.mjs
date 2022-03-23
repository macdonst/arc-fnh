import arc from "@architect/functions"

const getGames = async function() {
    const db = await arc.tables()

    let games = await db.games.scan()

    return games.Items
}

export { getGames }
