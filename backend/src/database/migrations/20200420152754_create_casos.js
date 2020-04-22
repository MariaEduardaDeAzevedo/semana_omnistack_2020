
exports.up = function(knex) {
    return knex.schema.createTable("casos", function(table) {
      table.increments()
      table.string("titulo").notNullable();
      table.string("descricao").notNullable();
      table.decimal("valor").notNullable();
      table.string("ong_id").notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('casos')
  };
  