var express = require('express'); 
var app = express(); 
var bodyParser = require('body-parser'); 
var path = require('path'); 
var cookieParser = require('cookie-parser'); 
var fs = require('fs'); 


app.use(express.static(path.join(__dirname, './'))); 


//Use bodyParser so player can enter puzzle ID as URL to retreive specific puzzle 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(cookieParser()); 



app.get('/', function(req, res){
    res.redirect('./views/index.html'); 
}); 

app.get('/sudoku', function(req, res){
    res.redirect('./views/index.html'); 
}); 

app.get('/style.css', function(req, res){
    res.set('Content-Type', 'text/css; charset=UTF-8');
    res.status(200);
    res.sendFile(path.join(__dirname, './style.css'));
}); 

app.get('/puzzle', function(req, res){
    fs.readFile('./puzzles/sudokuEasy.txt', "utf-8", function(err, data){ 
        if (err) throw err;
        var puzzles = data.split('\n'); 
        var thisPuzzleNum = Math.floor(Math.random() * 10000); 
        var thisPuzzle = puzzles[thisPuzzleNum]; 
        //res.redirect as opposed to res.sendFile(which returns a 'no such file type error')
        res.redirect('/?board=' + thisPuzzle); 
    });  
}); 


//AJAX CALLS SO PUZZLES CAN REFRESH WITHOUT RE-LOADING BACKGROUND VIDEO
//Data retreived as large text file, split on each line (each line in 10K line file is different puzzle)

app.get('/easyData', function(req, res){
    var puzzNum = Math.floor(Math.random() * 10000);  
    fs.readFile('./puzzles/sudokuEasy.txt', "utf-8", function(err, data){ 
        if (err) throw err;
        var puzzles = data.split('\n'); 
        var thisPuzzle = puzzles[puzzNum]; 
        res.send(thisPuzzle); 
    });  
}); 

app.get('/mediumData', function(req, res){
    var puzzNum = Math.floor(Math.random() * 10000);  
    fs.readFile('./puzzles/sudokuMedium.txt', "utf-8", function(err, data){ 
        if (err) throw err;
        var puzzles = data.split('\n'); 
        var thisPuzzle = puzzles[puzzNum]; 
        res.send(thisPuzzle); 
    });  
}); 

app.get('/hardData', function(req, res){
    var puzzNum = Math.floor(Math.random() * 10000);  
    fs.readFile('./puzzles/sudokuHard.txt', "utf-8", function(err, data){ 
        if (err) throw err;
        var puzzles = data.split('\n'); 
        var thisPuzzle = puzzles[puzzNum]; 
        res.send(thisPuzzle); 
    });  
}); 



//User can code puzzle # into URL to bring up a specific puzzle
app.get('/puzzle/easy/:id', function(req, res){
    var key = req.params.id; 
    fs.readFile('./puzzles/sudokuEasy.txt', "utf-8", function(err, data){ 
        if (err) throw err;
        var puzzles = data.split('\n'); 
        var thisPuzzle = puzzles[key]; 
        res.redirect('/?board=' + thisPuzzle); 
    });  
});  
app.get('/puzzle/medium/:id', function(req, res){
    var key = req.params.id; 
    fs.readFile('./puzzles/sudokuMedium.txt', "utf-8", function(err, data){ 
        if (err) throw err;
        var puzzles = data.split('\n'); 
        var thisPuzzle = puzzles[key]; 
        res.redirect('/?board=' + thisPuzzle); 
    });  
}); 
app.get('/puzzle/hard/:id', function(req, res){
    var key = req.params.id; 
    fs.readFile('./puzzles/sudokuHard.txt', "utf-8", function(err, data){ 
        if (err) throw err;
        var puzzles = data.split('\n'); 
        var thisPuzzle = puzzles[key]; 
        res.redirect('/?board=' + thisPuzzle); 
    });  
}); 


app.listen(3090, function(){
    console.log('listening on 3090');
}); 