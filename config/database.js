import mysql from 'mysql'

let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",
    user: "micheledore",
    password: "a46ab1857dab77efa5438c79652e287c",
    database: "micheledore_cvb",
});

export default pool