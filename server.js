const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

const MongoClient = require('mongodb').MongoClient


/*
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("restaurant_Inspections");
  dbo.collection('restaurants').find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

*/

var db
var url = "mongodb://localhost:27017/"

MongoClient.connect(url, (err, client) => {
  if (err) return console.log(err)
  db = client.db('restaurant_Inspections') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


/*
app.listen(3000, function() {
  console.log('listening on 3000')
})

app.get('/', (req, res) => {
  var cursor = db.collection('restaurants').find({})
})
*/




app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html')
  db.collection('restaurants').find({"cuisine": "Japanese", "borough": "Manhattan"},{"grades":1, "borough":1}).toArray(function(err, results) {
  //console.log(results)
  res.render('index.ejs', {restaurants: results})
  })
  
  // send HTML file populated with quotes here
})





app.post('/restaurants', (req, res) => {
  console.log(req.body)
})

console.log('May Node be with you')

/* Once we’re done saving, we have to redirect the user somewhere (here we are in the current tutorial*/