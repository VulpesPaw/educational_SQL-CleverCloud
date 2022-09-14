/* ---------------------------- Inports & Exports --------------------------- */

const { con, mysql } = require('./sql');

module.exports = { index, store, update, destroy, search };

/* ---------------------------------- Model --------------------------------- */

const model = {
    title: true,
    description: true,
    img: true,
    quote: true,
    auhtor: true,
};
/* -------------------------------- Functions ------------------------------- */

// Saves data to database
function store(req, res) {
    let { title, quote, author, description, img } = req.body;

    let query = `
        INSERT INTO quotes
        (title, quote, author, description, img)
        VALUES (?,?,?,?,?);
    `;

    con.query(query, [title, quote, author, description, img], (err) => {
        if (err) {
            console.log(err);
            return res.send(err.message);
        }

        res.statusCode = 200;
        res.send({ quote });
    });
}

// Get all quotes
async function index(req, res) {
    // just a trail, restor to og branch
    try {
        res.send(await get_all_quotes());
    } catch (error) {
        res.send(error);
    }
}

function get_all_quotes() {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM quotes ORDER BY id DESC LIMIT 10`;

        con.query(query, (err, result) => {
            if (err) return reject({ error: 'Selecr Error' });

            resolve(result);
        });
    });
}

// Update quotes
function update(req, res) {
    let query = { ...req.body };

    let arr = [];
    if (mysql.escape(i) === `'${i}'`) {
        for (let i in query) {
            // arr.push(`${mysql.escape(i)} = ${mysql.escape([i])}`);

            arr.push(`${i} = ${mysql.escape([i])}`);
        }
    }

    let queryStr = `UPDATE quotes SET ${arr.join(', ')} WHERE id = ?;`;

    con.query(queryStr, [req.params.id], () => {
        if (err) return res.send(err.message);

        res.send('Updated');
    });
    res.sendStatus(202);
}

function show(req, res) {
    let id = parseInt(req.params.id);

    let query = `SELECT * FROM quotes WHERE id = ?`;

    con.query(query, [id], (err, result) => {
        if (err) return res.status(400).end('Invalid ID');
        res.send(result);
    });
}

function destroy(req, res) {
    let id = parseInt(req.params.id);

    let query = `DELETE FROM quotes WHERE id = ?;`;

    con.query(query, [id], (err, result) => {
        if (err) return res.send(err.message);

        res.status(204).send('Quote Deleted');
    });
}

function search(req, res) {
    // search-word
    let s = `%${req.params.s}%`;

    let query = `SELECT * FROM quotes WHERE title LIKE ? OR quote LIKE ? OR author LIKE ? OR description LIKE ? `;

    con.query(query, [s, s, s, s], (err, result) => {
        if (err) return res.status(400).end('Invalid ID');

        if (result.length === 0) return res.status(400).end();
        res.send(result);
    });
}
