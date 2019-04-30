const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

//mlab cluster address ti@gok3...
const uri ='mongodb+srv://tiago:123@cluster0-mddsu.mongodb.net/test?retryWrites=true';
var jsonParser = bodyParser.json()

//Used for body
app.use(bodyParser.urlencoded({ extended: false }))

MongoClient.connect(uri, (err, client) => {
  // ... start the server
  if (err) return console.log(err)
  	db = client.db('Cluster0')

	app.listen(3000, function(){
		console.log('server running on port 3000')
	})
})

//Fix Cors Policy error
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.post('/customers/', jsonParser, (req, res) => {
	db.collection('customers').save(req.body, (err, result) => {
		if (err) return console.log(err)

		console.log('Salvo no banco de dados')
	})
})

app.get('/customers', (req, res) => {
	db.collection('customers').find().toArray((err, results) => {
		res.send(results)
	})
})