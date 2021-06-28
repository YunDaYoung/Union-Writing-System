const pool = require('../../config/dbConfig');

class TopicController {
    constructor() { }

    async getTopicList(req, res) {
        pool.getConnection((err, conn) => {
            if (err) {
                throw err;
            }
            const sql = "SELECT * FROM topic";
            conn.query(sql, (err, row) => {
                conn.release()
                if (err) throw err;
                res.send(200, {
                    result: 1,
                    check: 0,
                    data: row
                })
            })
        })
    }
}

module.exports = TopicController;
