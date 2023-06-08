const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors(
));
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v3avrd5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const totalMonyCollection = client.db('dUKMadrasha').collection('totalMoney');
    const studentMonyCollection = client.db('dUKMadrasha').collection('studentMoney');
    const studentMonyCollection2 = client.db('dUKMadrasha').collection('studentMoney2');

    // Total Mony
    app.get("/totalMoney", async (req, res) => {
      const query = {};
      const result = await totalMonyCollection.find(query).toArray();
      res.send(result);
    });


    // Student Mony
    app.post('/studentMoney2', async (req, res) => {
      const monyInfo = req.body
      const result = await studentMonyCollection2.insertOne(monyInfo)
      res.send(result)
    })

    app.get('/studentMoney2/:classRoll', async (req, res) => {
      const classRoll = req.params.classRoll;
      const query = { classRoll };
      const service = await studentMonyCollection2.findOne(query);
      res.send(service);
    });

    app.delete("/studentMoney2/:classRoll", async (req, res) => {
      try {
        const classRoll = req.params.classRoll;
        const result = await studentMonyCollection2.deleteOne({ classRoll });
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }


    });

    // app.delete("/studentMoney2", async (req, res) => {
    //   const query = {};
    //   const result = await studentMonyCollection2.deleteMany(query);
    //   res.send(result);
    // });

    app.get("/studentMoney2", async (req, res) => {
      const query = {};
      const result = await studentMonyCollection2.find(query).toArray();
      res.send(result);
    });


  }
  finally {

  }
}
run().catch(console.log)

app.get("/", async (req, res) => {
  res.send("DUK Madrasa Portal Server is running");
});

app.listen(port, () => {
  console.log(`DUK Madrasa Portal Running On ${port}`);
});
