const con = require("../database/connection")
const crypto = require("crypto")

module.exports = {
    async create(request, response){
        const {nome, email, numero, cidade, uf} = request.body
        const id = crypto.randomBytes(4).toString("HEX")
        await con("ongs").insert({
            id,
            nome,
            email,
            numero,
            cidade,
            uf,
        })

        return response.json({ id })
        },

        async list(request, response) {
            const ongs = await con("ongs").select("*")
            return response.json(ongs)
        }
}