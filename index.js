const express = require('express');
const cors = require('cors');
require('dotenv').config()

const { MongoClient, ServerApiVersion } = require('mongodb');

// Config
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d3h8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //  await client.connect();

    const usersCollection = client.db("usersDB").collection("users");

    // Create
    app.post("/addUser", async(req, res)=>{
      console.log(req.body);
      const result = await usersCollection.insertOne(req.body);
      res.send(result);
    })

    // Read
    app.get("/user", async(req, res)=>{
      const result = await usersCollection.find().toArray();
      res.send(result);
    })
    








    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req, res) => {
  res.send("Server is Running");
})

app.listen(port, () => {
  console.log(`Server is running on post: ${port}`);
})

