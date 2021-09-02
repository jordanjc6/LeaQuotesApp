var express = require('express');
var router = express.Router();
const db = require('../services/quotes.service')

router.get('/', db.getQuotes);
router.get('/phrases', db.getPhrases);
router.post('/', db.createQuote);
router.delete('/delete/:quoteid', db.deleteQuote);
router.patch('/update/:quoteid', db.updateQuote);
router.patch('/phrases/update/:phraseid', db.updatePhrase);

module.exports = router;