const { Pool } = require('pg');
// Only use in Developend mode
require('custom-env').env('dev');

const {
    PGHOST,
    PGUSER,
    PGPASSWORD,
    PGDATABASE,
    PGPORT
} = process.env;

const getConection = () => {
    return new Pool({
        host: PGHOST,
        user: PGUSER,
        password: PGPASSWORD,
        database: PGDATABASE,
        port: PGPORT
    });
}

module.exports = {
    getConection
}