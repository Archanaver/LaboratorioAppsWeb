exports.up = function(knex) {
    return knex.schema
      .createTable('bicicletas', (table) => {
        table.increment('id');
        table.string('color', 255);
        table.string('modelo', 255);
        table.float('lat',14, 10);
        table.float('lon',14, 10);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('bicicletas');
  };
