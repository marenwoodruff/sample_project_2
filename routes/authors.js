var express = require('express');
var router = express.Router();

var Author = require('../models/author');

router.get('/', function(req, res) {
    // res.send('authors will be here');
    Author.find({})
        .exec(function(err, authors) {
            if(err) console.log(err);

            console.log(authors);
            // res.send(authors);
            res.render('authors/index', {
                authors: authors
            });
        });
});

router.get('/:id', function(req, res) {
    Author.findById(req.params.id)
        .exec(function(err, author) {
            if(err) console.log(err);

            console.log(author);
            // res.send(author);
            res.render('authors/show', {
                author: author
            });
        });
});

router.post('/', function(req, res) {
    var author = new Author({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        country: req.body.country,
        books: req.body.books
    });
    author.save(function(err, author){
        if (err) { console.log(err); }

        console.log(author);
        res.send(author);
    });
});

module.exports = router;
