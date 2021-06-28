const pool = require('../../config/dbConfig');

class WritingController {
    constructor() { }

    async getWritingList(req, res) {
        pool.getConnection((err, conn) => {
            if (err) throw err;
            const sql = 'SELECT * FROM writing';
            conn.query(sql, (err, row) => {
                conn.release()
                if (err) throw err;
                res.send(row);
            })
        })
    }

}

module.exports = WritingController;
