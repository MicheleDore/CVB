import mysql from 'mysql'
import util from 'util'

export let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",
    user: "micheledore",
    password: "a46ab1857dab77efa5438c79652e287c",
    database: "micheledore_cvb",
});

// pour creer des requet sql async
export const query = util.promisify(pool.query).bind(pool)

// permet d'obtenir le resultat des requete sql async
export const asyncQuery = async (sql, params) => {
    try {
        const rows = await query(sql, params)
        return rows
    } catch(err) {
        console.log(err)
    }
}

