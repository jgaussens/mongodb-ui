const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const storage = require('localStorage')

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')


const MongoClient = require('mongodb').MongoClient


var db	
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




//Full form interpretation to print what the user wants
app.post('/restaurants', (req, res) => {

console.log(req.body.restaurantName);

console.log(req.body.restaurantName);
console.log(req.body.cuisine);
console.log(req.body.borough);


	//full form query case

	if ( req.body.restaurantName != '' &&  req.body.cuisine != '' && req.body.borough != 'Any'){
	
		console.log("VVV")

	
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
		if ( req.body.restaurantName == '' &&  req.body.cuisine != '' && req.body.borough != 'Any'){
		
				console.log("FVV")

		
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


		
		
		//only borough defined
		if ( req.body.restaurantName == '' &&  req.body.cuisine == '' && req.body.borough != 'Any'){
		
				console.log("FFV")

		
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
		
		
		//only cuisine defined
		if ( req.body.restaurantName == '' &&  req.body.cuisine != '' && req.body.borough == 'Any'){
		
					console.log("FVF")


		
			if (req.body.Sort == "Worst to best"){
	
					  db.collection('restaurants').aggregate([ { "$unwind": "$grades"},{ $match: {"cuisine": req.body.cuisine}},{ "$group": { "_id": { "_id": "$_id", "name": "$name", "building": "$address.building", "street": "$address.street", "zip": "$address.zipcode", "borough": "$borough"}, "avg": {$avg: "$grades.score"} } }, { "$project":{ "_id.name": 1, "_id.building": 1, "_id.street": 1, "_id.zip": 1, "_id.borough": 1, avg: 1 } }, {$sort: {avg: 1}} ]).toArray(function(err, results) {
		
				 res.render('index.ejs', {restaurants: results})
			
			  })
				
			}
			else{
	
					  db.collection('restaurants').aggregate([ { "$unwind": "$grades"},{ $match: {"cuisine": req.body.cuisine}},{ "$group": { "_id": { "_id": "$_id", "name": "$name", "building": "$address.building", "street": "$address.street", "zip": "$address.zipcode", "borough": "$borough"}, "avg": {$avg: "$grades.score"} } }, { "$project":{ "_id.name": 1, "_id.building": 1, "_id.street": 1, "_id.zip": 1, "_id.borough": 1, avg: 1 } }, {$sort: {avg:-1}} ]).toArray(function(err, results) {
		
				 res.render('index.ejs', {restaurants: results})
			
			  })
				
			}



		}
		
		
		//nothing defined
		if ( req.body.restaurantName == '' &&  req.body.cuisine == '' && req.body.borough == 'Any'){
		
		
		console.log("FFF");
		
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
		
		
		//name and borough defined
		if ( req.body.restaurantName != '' &&  req.body.cuisine == '' && req.body.borough != 'Any'){
		
				console.log("VFV")

			
			if (req.body.Sort == "Worst to best"){
	
					  db.collection('restaurants').aggregate([ { "$unwind": "$grades"},{ $match: {name:{$regex:req.body.restaurantName}, "borough": req.body.borough}},{ "$group": { "_id": { "_id": "$_id", "name": "$name", "building": "$address.building", "street": "$address.street", "zip": "$address.zipcode", "borough": "$borough"}, "avg": {$avg: "$grades.score"} } }, { "$project":{ "_id.name": 1, "_id.building": 1, "_id.street": 1, "_id.zip": 1, "_id.borough": 1, avg: 1 } }, {$sort: {avg: 1}} ]).toArray(function(err, results) {
		
				 res.render('index.ejs', {restaurants: results})
			
			  })
				
			}
			else{
	
					  db.collection('restaurants').aggregate([ { "$unwind": "$grades"},{ $match: {name:{$regex:req.body.restaurantName}, "borough": req.body.borough}},{ "$group": { "_id": { "_id": "$_id", "name": "$name", "building": "$address.building", "street": "$address.street", "zip": "$address.zipcode", "borough": "$borough"}, "avg": {$avg: "$grades.score"} } }, { "$project":{ "_id.name": 1, "_id.building": 1, "_id.street": 1, "_id.zip": 1, "_id.borough": 1, avg: 1 } }, {$sort: {avg:-1}} ]).toArray(function(err, results) {
		
				 res.render('index.ejs', {restaurants: results})
			
			  })
				
			}
			
			
			
		}
		

		//name and cuisine defined
		if ( req.body.restaurantName != '' &&  req.body.cuisine != '' && req.body.borough == 'Any'){
		
			console.log("VVF")

			
			if (req.body.Sort == "Worst to best"){
	
					  db.collection('restaurants').aggregate([ { "$unwind": "$grades"},{ $match: {name:{$regex:req.body.restaurantName}, "cuisine": req.body.cuisine}},{ "$group": { "_id": { "_id": "$_id", "name": "$name", "building": "$address.building", "street": "$address.street", "zip": "$address.zipcode", "borough": "$borough"}, "avg": {$avg: "$grades.score"} } }, { "$project":{ "_id.name": 1, "_id.building": 1, "_id.street": 1, "_id.zip": 1, "_id.borough": 1, avg: 1 } }, {$sort: {avg: 1}} ]).toArray(function(err, results) {
		
				 res.render('index.ejs', {restaurants: results})
			
			  })
				
			}
			else{
	
					  db.collection('restaurants').aggregate([ { "$unwind": "$grades"},{ $match: {name:{$regex:req.body.restaurantName}, "cuisine": req.body.cuisine}},{ "$group": { "_id": { "_id": "$_id", "name": "$name", "building": "$address.building", "street": "$address.street", "zip": "$address.zipcode", "borough": "$borough"}, "avg": {$avg: "$grades.score"} } }, { "$project":{ "_id.name": 1, "_id.building": 1, "_id.street": 1, "_id.zip": 1, "_id.borough": 1, avg: 1 } }, {$sort: {avg:-1}} ]).toArray(function(err, results) {
		
				 res.render('index.ejs', {restaurants: results})
			
			  })
				
			}
			
			
			
		}
		
		
		//Only name defined
		if ( req.body.restaurantName != '' &&  req.body.cuisine == '' && req.body.borough == 'Any'){
			
			console.log("VFF")

			
			if (req.body.Sort == "Worst to best"){
	
					  db.collection('restaurants').aggregate([ { "$unwind": "$grades"},{ $match: {name:{$regex:req.body.restaurantName}}},{ "$group": { "_id": { "_id": "$_id", "name": "$name", "building": "$address.building", "street": "$address.street", "zip": "$address.zipcode", "borough": "$borough"}, "avg": {$avg: "$grades.score"} } }, { "$project":{ "_id.name": 1, "_id.building": 1, "_id.street": 1, "_id.zip": 1, "_id.borough": 1, avg: 1 } }, {$sort: {avg: 1}} ]).toArray(function(err, results) {
		
				 res.render('index.ejs', {restaurants: results})
			
			  })
				
			}
			else{
	
					  db.collection('restaurants').aggregate([ { "$unwind": "$grades"},{ $match: {name:{$regex:req.body.restaurantName}}},{ "$group": { "_id": { "_id": "$_id", "name": "$name", "building": "$address.building", "street": "$address.street", "zip": "$address.zipcode", "borough": "$borough"}, "avg": {$avg: "$grades.score"} } }, { "$project":{ "_id.name": 1, "_id.building": 1, "_id.street": 1, "_id.zip": 1, "_id.borough": 1, avg: 1 } }, {$sort: {avg:-1}} ]).toArray(function(err, results) {
		
				 res.render('index.ejs', {restaurants: results})
			
			  })
				
			}
			
			
			
		}		
	
})


app.post('/restaurants', (req, res) => {
  console.log(req.body)
})

