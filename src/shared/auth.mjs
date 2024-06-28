export default async function authenticate(req) {
    const { session } = req
    const { error, user } = session

    console.log('shared auth', error, user)
    const authorized = !!(user?.username === 'macdonst')
    console.log('authorized', authorized)
    if (!authorized) return { location: '/register' }
}
