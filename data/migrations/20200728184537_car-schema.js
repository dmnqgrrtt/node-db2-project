
exports.up = function(knex, Promise) {
    return knex.schema.createTable("cars", (tbl) => {
        tbl.increments();
        tbl.text("vin").unique().notNullable();
        tbl.text("make").notNullable();
        tbl.text("model").notNullable();
        tbl.integer("mileage").notNullable();
        tbl.text("trans_type");
        tbl.text("title_status");
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("cars");
};
