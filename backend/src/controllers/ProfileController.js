const con = require("../database/connection")

module.exports = {
    async list(request, response) {
        const ong_id = request.headers.auth
        const casos = await con("casos").where("ong_id", ong_id).select("*")

        return response.json(casos)
    }
}