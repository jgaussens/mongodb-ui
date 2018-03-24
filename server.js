const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const storage = require('localStorage')

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')


const MongoClient = require('mongodb').MongoClient


var db	
//var url = "mongodb://localhost:27017/"
var url = "mongodb://jgaussens:tekilahum5@ds115729.mlab.com:15729/restaurant_inspections" 

//connection to the database
MongoClient.connect(url, (err, client) => {
  if (err) return console.log(err)
  db = client.db('restaurant_inspections') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})



//à l'ouverture de la page, quelle requête est executée ? 
app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html')
  //we send none for cuisine to print nothing in the front page in the "/restaurant"
  db.collection('restaurants').find({"cuisine": "None", "borough": "Manhattan"},{"grades":1, "borough":1}).toArray(function(err, results) {
  //console.log(results)
  res.render('index.ejs', {restaurants: results})
  })
  
})




//Different cases of user usages of the form
app.post('/restaurants', (req, res) => {


console.log(req.body.restaurantName.value);
console.log(req.body.cuisine.value);
console.log(req.body.borough.value);


	//full form query case

	if (typeof req.body.restaurantName.value != 'undefined' && typeof req.body.cuisine.value != 'undefined' && req.body.borough != 'Any'){
	
		if (req.body.Sort == "Worst to best"){
	
					  db.collection('restaurants').aggregate([ { "$unwind": "$grades"},{ $match: {name:{$regex:req.body.restaurantName}, "cuisine": req.body.cuisine, "borough": req.body.borough}},{ "$group": { "_id": { "_id": "$_id", "name": "$name", "building": "$address.building", "street": "$address.street", "zip": "$address.zipcode", "borough": "$borough"}, "avg": {$avg: "$grades.score"} } }, { "$project":{ "_id.name": 1, "_id.building": 1, "_id.street": 1, "_id.zip": 1, "_id.borough": 1, avg: 1 } }, {$sort: {avg: 1}} ]).toArray(function(err, results) {
		
				 res.render('index.ejs', {restaurants: results})
			
			  })
				
			}
			else{
	
					  db.collection('restaurants').aggregate([ { "$unwind": "$grades"},{ $match: {name:{$regex:req.body.restaurantName}, "cuisine": req.body.cuisine, "borough": req.body.borough}},{ "$group": { "_id": { "_id": "$_id", "name": "$name", "building": "$address.building", "street": "$address.street", "zip": "$address.zipcode", "borough": "$borough"}, "avg": {$avg: "$grades.score"} } }, { "$project":{ "_id.name": 1, "_id.building": 1, "_id.street": 1, "_id.zip": 1, "_id.borough": 1, avg: 1 } }, {$sort: {avg:-1}} ]).toArray(function(err, results) {
		
				 res.render('index.ejs', {restaurants: results})
			
			  })
				
			}
	
	
	}	
	
		//no name defined
		if (typeof req.body.restaurantName.value == 'undefined' && typeof req.body.cuisine.value != 'undefined' && req.body.borough != 'Any'){
		
			if (req.body.Sort == "Worst to best"){
	
					  db.collection('restaurants').aggregate([ { "$unwind": "$grades"},{ $match: {"cuisine": req.body.cuisine, "borough": req.body.borough}},{ "$group": { "_id": { "_id": "$_id", "name": "$name", "building": "$address.building", "street": "$address.street", "zip": "$address.zipcode", "borough": "$borough"}, "avg": {$avg: "$grades.score"} } }, { "$project":{ "_id.name": 1, "_id.building": 1, "_id.street": 1, "_id.zip": 1, "_id.borough": 1, avg: 1 } }, {$sort: {avg: 1}} ]).toArray(function(err, results) {
		
				 res.render('index.ejs', {restaurants: results})
			
			  })
				
			}
			else{
	
					  db.collection('restaurants').aggregate([ { "$unwind": "$grades"},{ $match: {"cuisine": req.body.cuisine, "borough": req.body.borough}},{ "$group": { "_id": { "_id": "$_id", "name": "$name", "building": "$address.building", "street": "$address.street", "zip": "$address.zipcode", "borough": "$borough"}, "avg": {$avg: "$grades.score"} } }, { "$project":{ "_id.name": 1, "_id.building": 1, "_id.street": 1, "_id.zip": 1, "_id.borough": 1, avg: 1 } }, {$sort: {avg:-1}} ]).toArray(function(err, results) {
		
				 res.render('index.ejs', {restaurants: results})
			
			  })
				
			}



		}


		
		
		//no name and no cuisine defined
		if (typeof req.body.restaurantName.value == 'undefined' && typeof req.body.cuisine.value == 'undefined' && req.body.borough != 'Any'){
		
			if (req.body.Sort == "Worst to best"){
	
					  db.collection('restaurants').aggregate([ { "$unwind": "$grades"},{ $match: {"borough": req.body.borough}},{ "$group": { "_id": { "_id": "$_id", "name": "$name", "building": "$address.building", "street": "$address.street", "zip": "$address.zipcode", "borough": "$borough"}, "avg": {$avg: "$grades.score"} } }, { "$project":{ "_id.name": 1, "_id.building": 1, "_id.street": 1, "_id.zip": 1, "_id.borough": 1, avg: 1 } }, {$sort: {avg: 1}} ]).toArray(function(err, results) {
		
				 res.render('index.ejs', {restaurants: results})
			
			  })
				
			}
			else{
	
					  db.collection('restaurants').aggregate([ { "$unwind": "$grades"},{ $match: {"borough": req.body.borough}},{ "$group": { "_id": { "_id": "$_id", "name": "$name", "building": "$address.building", "street": "$address.street", "zip": "$address.zipcode", "borough": "$borough"}, "avg": {$avg: "$grades.score"} } }, { "$project":{ "_id.name": 1, "_id.building": 1, "_id.street": 1, "_id.zip": 1, "_id.borough": 1, avg: 1 } }, {$sort: {avg:-1}} ]).toArray(function(err, results) {
		
				 res.render('index.ejs', {restaurants: results})
			
			  })
				
			}



		}
		
		//nothing defined
		if (typeof req.body.restaurantName.value == 'undefined' && typeof req.body.cuisine.value == 'undefined' && req.body.borough == 'Any'){
		
			if (req.body.Sort == "Worst to best"){
	
					  db.collection('restaurants').aggregate([ { "$unwind": "$grades"},{ "$group": { "_id": { "_id": "$_id", "name": "$name", "building": "$address.building", "street": "$address.street", "zip": "$address.zipcode", "borough": "$borough"}, "avg": {$avg: "$grades.score"} } }, { "$project":{ "_id.name": 1, "_id.building": 1, "_id.street": 1, "_id.zip": 1, "_id.borough": 1, avg: 1 } }, {$sort: {avg: 1}} ]).toArray(function(err, results) {
		
				 res.render('index.ejs', {restaurants: results})
			
			  })
				
			}
			else{
	
					  db.collection('restaurants').aggregate([ { "$unwind": "$grades"},{ "$group": { "_id": { "_id": "$_id", "name": "$name", "building": "$address.building", "street": "$address.street", "zip": "$address.zipcode", "borough": "$borough"}, "avg": {$avg: "$grades.score"} } }, { "$project":{ "_id.name": 1, "_id.building": 1, "_id.street": 1, "_id.zip": 1, "_id.borough": 1, avg: 1 } }, {$sort: {avg:-1}} ]).toArray(function(err, results) {
		
				 res.render('index.ejs', {restaurants: results})
			
			  })
				
			}



		}
		
	
})


app.post('/restaurants', (req, res) => {
  console.log(req.body)
})

console.log('May Node be with you')

/* Once we’re done saving, we have to redirect the user somewhere (here we are in the current tutorial*/