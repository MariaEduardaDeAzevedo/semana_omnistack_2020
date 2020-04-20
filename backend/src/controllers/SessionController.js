const con = require("../database/connection")

module.exports = {
    async create(request, response) {
        const { id } = request.body
        const ong = await con("ongs").where("id", id).select("nome").first()

        if (!ong) {
            return response.status(400).json({ error: 'No ONG found whit this ID' })
        }

        return response.json(ong)

    }
}
