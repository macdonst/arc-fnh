import arc from '@architect/functions'

export const handler = arc.http.async(http)

async function http(req) {
    const authorized = req.body.password === process.env.SECRET_PASSWORD
    console.log(req.body.password, process.env.SECRET_PASSWORD, req.body.password === process.env.SECRET_PASSWORD)

    const { session } = req
    session.authorized = authorized

    console.log(session)

    return {
        session,
        location: '/'
    }
}
