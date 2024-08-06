const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 4200;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a MySQL connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '@233Saalimaar',
  database: 'watchhub',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
const initializeServer = async () => {
    try {
      await db.getConnection(() => {
        console.log('Connected to the MySQL database.');

      });
     // Start the server only after the database connection is successful
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
  
   // Make the database connection available throughout your application
      app.locals.db = db;
  
    } catch (err) {
      console.error('Error connecting to the database:', err);
      process.exit(1); // Exit the process with an error code
    }
  };
  
  initializeServer();  

//  crud endpoints
// get all watch
app.get("/api/v1/", function(req, res) {
  getSql = "SELECT * FROM watch";
  db.query(getSql, function(err,result) {
    if (err) {console.log(err);}
    res.send(result);
  });
})
//get by Id
app.get("/api/v1/:id", function(req, res) {
  const {id} = req.params;
  getSqlById = "SELECT * FROM watch where ID = ?";
  db.query(getSqlById,[id], function(err,result) {
    if (err) {console.log(err);}
    res.send(result);
  });
})

app.post("/api/v1/createWatch", function(req, res) {
  const {images, prices, brands, description} = req.body;
  postSql = "INSERT INTO watch (images, prices, brands, description) VALUES(?, ?, ?, ?)" ;
  db.query(postSql,[images, prices, brands, description], function(err,result) {
    if (err) {console.log(err);}
    res.send(result);
  });
})

app.put("/api/v1/updateWatch/:id", function(req, res) {
  const { id } = req.params;
  const { images, prices, brands, description } = req.body;
  // Check if required fields are present
  if (!images || !prices || !brands || !description) {
      res.status(400).send('All fields are required');
      return;
  }
 const putSql = "UPDATE watch SET images = ?, prices = ?, brands = ?, description = ? WHERE ID = ?";
  
  // Debug: Print the query and parameters
  console.log('SQL Query:', putSql);
  console.log('Parameters:', [images, prices, brands, description, id]);

  db.query(putSql, [images, prices, brands, description, id], function(err, result) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});



app.delete("/api/v1/deleteWatch/:id", function(req, res) {
  const {id} = req.params;
  deleteSql = "DELETE FROM watch where ID = ?";
  db.query(deleteSql,[id], function(err,result) {
    if (err) {console.log(err);}
    res.send(result);
  });
})




