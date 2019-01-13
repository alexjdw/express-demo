const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')
const mongoose = require('mongoose');
const handlers = require('./handlers.js');
const schema_templates = require('./schemas.js');

mongoose.connect('mongodb://localhost/animal_db');

var models = {};
for (schema in schema_templates) {
    models[schema] = mongoose.model(schema, new mongoose.Schema(schema_templates[schema]));
    console.log("Registered: ", schema);
}

var upload = multer({dest: 'tmp/'}) ;

app = express();
app.use(bodyParser.urlencoded({extended: true,}));
app.use(express.static(__dirname + '/static'));

app.set('views', './views');
app.set('view engine', 'ejs');

function render_animals() {
    if (err) {
        response.redirect('/');
    } else {
        response.render('species', { animals: animals });
    }
}

app.get('/', function(request, response) {
    models.species.find({}, function(err, species) {
        if (err) {
            response.redirect('/');
        } else {
            response.render('index', { species: species });
        }
    });
});

app.get('/newspecies', function(request, response) {
    response.render('create_species');
});

app.post('/create-animal', upload.single('image'), function(request, response) {
    var ani_obj = {
        species: request.body.species,
        name: request.body.name,
        height: request.body.height,
        weight: request.body.weight,
        fur_color: request.body.furcolor
    }

    if (request.file) {
        console.log("Files: ", request.file)
        if (request.file.mimetype.startsWith('image')) {
            let ext = request.file.originalname.split('.');
            ext = ext[ext.length - 1];
            fs.rename(request.file.path, path.join('./static/img/animals', request.file.filename + '.' + ext))
            ani_obj.image_url = request.file.filename + '.' + ext
        } else {
            fs.unlink(request.file.path)
        }
    }
    let animal = models.animal.create(ani_obj);
    response.redirect('/' + request.body.species);
});

app.post('/create-species', function(request, response) {
    if (parseInt(request.body.maxheight) > 0 &&
        parseInt(request.body.minheight) > 0 &&
        parseInt(request.body.maxweight) > 0 &&
        parseInt(request.body.minweight) > 0 &&
        request.body.name.length > 3 &&
        request.body.furcolors.length > 3) {

        var furcolors = request.body.furcolors.split(',');
        for (var f = 0; f < furcolors.length; f++) {
            furcolors[f].trim();
        }

        models.species.create({
            maxheight: request.body.maxheight,
            minheight: request.body.minheight,
            maxweight: request.body.maxweight,
            minweight: request.body.minweight,
            name: request.body.name,
            fur_color_enum: furcolors
        }, handlers.mongo_error);
        response.redirect('/');
    }
});

app.get('/:species', function(request, response) {
    try {
        query = models.animal.find({ species: request.params.species });
        query.exec(function(error, animals) {
            if (error) {
                response.redirect('/');
            }
            else {
                console.log(animals);
                response.render('view_animals', {animals: animals})
            }
        })
    } catch (err) {
        console.log(err);
        response.redirect('/');
    }
});

app.get('/:species/:id(\d+)', function(request, response) {
    response.render('view_animals')
});

app.listen(5000);