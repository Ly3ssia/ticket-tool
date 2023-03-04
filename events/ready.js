module.exports = {
    name: 'ready',
    execute(client) {
        console.log(`${client.user.tag} Hazırlandı BOT SAHIBI rush#5124`)

            client.user.setActivity(`rush#5124`)
    }
}