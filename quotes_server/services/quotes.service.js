const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'leaquotesapp',
  password: 'Jmilli0n!',
  port: 5432,
});

const getQuotes = (request, response) => {
  pool.query('SELECT * FROM quotes ORDER BY quoteid ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  });
}

const getPhrases = (request, response) => {
  pool.query('SELECT * FROM phrases ORDER BY phraseid ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  });
}

const createQuote = (request, response) => {
  let quote = request.body[0];

  pool.query(`INSERT INTO quotes (title, context, speakers) 
    VALUES ('${quote.title}', '${quote.context}', '${quote.speakers}') RETURNING quoteid`, (error, results) => {
    if(error) {
      throw error;
    }

    //Insert phrases...
    let quoteid = results.rows[0].quoteid;

    for(let i = 1; i < request.body.length; i++) {
      request.body[i].quoteid = quoteid;
      createPhrase(request.body[i]);
    }

    response.status(201).send();
  });
}

function createPhrase(phrase) {
  pool.query(`INSERT INTO phrases (sequence, speaker, text, quoteid) 
  VALUES (${phrase.sequence}, '${phrase.speaker}', '${phrase.text}', ${phrase.quoteid})`, (error, results) => {
    if(error) {
      throw error;
    }
  });
}

const deleteQuote = (request, response) => {
  let quoteid = request.params.quoteid;

  pool.query(`DELETE FROM quotes WHERE quoteid = ${quoteid}`, (error, results) => {
    if(error) {
      throw error;
    }
  });

  pool.query(`DELETE FROM phrases WHERE quoteid = ${quoteid}`, (error, results) => {
    if(error) {
      throw error;
    }
  });

  response.status(200).json({'Delete': 'Success'});
}

const updateQuote = (request, response) => {
  let quoteid = request.params.quoteid;
  let column = Object.keys(request.body)[0]; 
  let value = request.body[column]; 

  pool.query(`UPDATE quotes SET ${column} = '${value}' WHERE quoteid = ${quoteid}`, (error, results) => {
    if(error) {
      throw error;
    }
  });

  response.send({'Update': 'Success'});
}

const updatePhrase = (request, response) => {
  let phraseid = request.params.phraseid;
  let column = Object.keys(request.body)[0]; 
  let value = request.body[column];

  pool.query(`UPDATE phrases SET ${column} = '${value}' WHERE phraseid = ${phraseid}`, (error, results) => {
    if(error) {
      throw error;
    }
  });

  response.status(200).json({'Update': 'Success'}); 
}

module.exports = {
  getQuotes,
  getPhrases,
  createQuote,
  deleteQuote,
  updateQuote,
  updatePhrase
}