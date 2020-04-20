const con = require("../database/connection")

module.exports = {
    async create(request, response) {
        const {titulo, descricao, valor} = request.body;
        const ong_id = request.headers.auth
        const [id] = await con("casos").insert({
            titulo,
            descricao, 
            valor,
            ong_id,
        })
        return response.json({ id })
    },

    async list(request, response) {
        const { page = 1 } = request.query

        const [count] = await con("casos").count()

        const casos = await con("casos")
        .join('ongs', 'ongs.id', "=", "casos.ong_id")
        .limit(5).offset((page-1) * 5)
        .select(['casos.*', 
        'ongs.nome', 
        'ongs.email', 
        'ongs.numero', 
        'ongs.cidade', 
        'ongs.uf'
    ])
        
        response.header("X-Total-Count", count['count(*)'])

        return response.json(casos)
    },

    async delete(request, response) {
        const { id } = request.params
        const ong_id = request.headers.auth
        const caso = await con("casos").where("id", id).select("ong_id").first()
        if (caso.ong_id != ong_id) {
            return response.status(401).json({ error: "Operation not permitted" })
        }

        await con("casos").where("id", id).delete()

        return response.status(204).send()
    }
}