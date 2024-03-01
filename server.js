const express = require('express')
const app = express()
const port = 3000
require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.API_KEY
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('Kunst');
    const kunst = database.collection('Kunstwerk');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Nachtwacht' };
    const kunstwerk = await kunst.findOne(query);
    console.log(kunstwerk);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



async function fetchDataFromMongoDB() {
  try {
    await client.connect();
    const database = client.db('Kunst');
    const kunst = database.collection('Kunstwerk');
    const query = {};
    // Fetch data from MongoDB
    const data = await kunst.find(query).toArray();
    return data;
  } finally {
    await client.close();
  }
}
 
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// API endpoint to fetch data from MongoDB
app.get('/api/data', async (req, res) => {
  try {
    // Fetch data from MongoDB
    const data = await fetchDataFromMongoDB();
    // Send the data as a JSON response
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


 
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
 
// heeft contextmenu
 
const data = [
  {
    title: "hello"
  }
]
 
// this is my middleware to write html....
 
app.use(express.static('static'))
// this is my middleware to write html....
 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
 
app.set('view engine', 'ejs')
 
app.get('/', (req, res) => {
 
  res.render('index', {data: data})
})
 
// app.get('/register', (req, res) => {
//   res.send('Registreer acount!')
// })
 
app.post("/", (req, res) =>{
  console.log(req.body);
 
  data.push({
    title:req.body.title,
  });
 
 res.redirect('/');
 
})