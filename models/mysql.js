// database config
const mysql = require('mysql')
const pool = mysql.createPool({
    'user': 'root',
    'password': 'xingu1004',
    'database': 'ecommerce',
    'host': 'localhost',
    'port': 3380
});

exports.execute = (query, params = []) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, conn) => {
            if (error) {
                reject(error);
            } else {
                conn.query(query, params, (error, result, fields) => {
                    conn.release();
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
};
exports.pool = pool;