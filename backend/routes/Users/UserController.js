const pool = require('../../config/dbConfig');

class UserController {
    constructor() { }

    async getUserList(req, res, next) {
        pool.getConnection((err, conn) => {
            if (err) {
                throw err;
            }
            const sql = 'SELECt * FROM user';
            conn.query(sql, async (err, row) => {
                conn.release()
                if (err) {
                    throw err;
                }
                await res.send(row);
            })
        })
    }

}

module.exports = UserController;
