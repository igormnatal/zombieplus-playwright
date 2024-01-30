const { Pool } = require('pg')

const DbConfig = {
    user: 'gibxgkix',
    host: 'kesavan.db.elephantsql.com',
    database: 'gibxgkix',
    password: '1mEA4hXnARr_gY2ZLjwQSN8ypte-BFzP',
    port: 5432
}

export async function executeSQl(sqlScript) {
    try {
        const pool = new Pool(DbConfig)
        const client = await pool.connect()

        const result = await client.query(sqlScript)
        console.log(result.rows)
    } catch (error) {
        console.log('Erro ao executar SQL '+ error)
    }
}