var express = require('express');
var router = express.Router();

var Author = require('../models/author');

// index authors
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

// create author
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

// new author
router.get('/new', function(req, res) {
    res.render('authors/new');
});

// show author
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

// edit author
router.get('/:id/edit', function(req,res) {
    Author.findById(req.params.id)
    .exec(function(err, author) {
        if (err) { console.log(err); }

        res.render('authors/edit', {
            author: author
        });
    });
});

// update author
router.patch('/:id', function(req, res) {
    Author.findByIdAndUpdate(req.params.id, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        country: req.body.country
    })
        .exec(function(err, author) {
            if (err) { console.log(err); }

            console.log(author);
            res.send(author);
        });
});

// delete author
router.delete('/:id', function(req, res) {
    Author.findByIdAndRemove(req.params.id)
        .exec(function(err, author) {
            if (err) { console.log(err); }

            console.log('Author deleted.');
            res.redirect('/authors/');  // redirect back to the index route
        });
});

module.exports = router;
