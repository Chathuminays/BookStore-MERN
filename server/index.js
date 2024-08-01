require("dotenv").config();
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello Chathumina")
})

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.DB;

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
      await client.connect();
  
      // create a collection of documents
      const bookCollections = client.db("BookInventory").collection("books");
  
      app.post("/upload-book", async(req, res) => {
          const data = req.body;
          const result = await bookCollections.insertOne(data);
          res.send(result);
      })
  
      // // get all books from db
      //     app.get("/all-books", async (req, res) => {
      //         const books = bookCollections.find();
      //         const result = await books.toArray();
      //         res.send(result)
      //     })
  
          // get all books & find by a category from db
        app.get("/all-books", async (req, res) => {
            let query = {};
            if (req.query?.category) {
                query = { category: req.query.category }
            }
            const result = await bookCollections.find(query).toArray();
            res.send(result)
        })
  
        // update a books method
        app.patch("/book/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const updateBookData = req.body;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    ...updateBookData
                }
            }
            const options = { upsert: true };
  
            // update now
            const result = await bookCollections.updateOne(filter, updatedDoc, options);
            res.send(result);
        })
  
  
        // delete a item from db
        app.delete("/book/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await bookCollections.deleteOne(filter);
            res.send(result);
        })
  
  
        // get a single book data
        app.get("/book/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await bookCollections.findOne(filter);
            res.send(result)
        })
  
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("connected to database");
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
    }
  }
  run().catch(console.dir);
  
  
  app.listen(port, () => {
    console.log(`server is running on port ${port}`)
  })