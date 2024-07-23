import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import env from "dotenv";
import session from "express-session";
import cors from 'cors';    


const app = express();
const port = 3000;
env.config();
const saltRounds = 10;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

//Connecting to database
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD,
    port: 5432,
});
db.connect();

//gettin products,cust and locn

//Get Routes

app.get('/get/products', async (req,res)=> {
    const result = await db.query("SELECT * FROM product");
    res.json(result.rows);
});

app.get('/get/locations', async (req,res)=> {
    const result = await db.query("SELECT * FROM locations");
    res.json(result.rows);
});

app.get('/get/cust', async (req,res)=> {
    const result = await db.query("SELECT * FROM customer");
    res.json(result.rows);
});

//POST Routes

app.post('/post/location', (req,res)=>{
    db.query('INSERT INTO locations(name) VALUES ($1)',[req.body.locn]);
});

app.post('/post/cust', (req,res)=>{
    db.query('INSERT INTO customer(name) VALUES ($1)',[req.body.locn]);
});

app.post('/post/itemEntry',async (req,res)=>{
    console.log(req.body);
    const prod_id = (await db.query('SELECT * FROM product WHERE name = $1',[req.body.products])).rows[0].id;
    const cust_id = (await db.query('SELECT * FROM customer WHERE name = $1',[req.body.cust])).rows[0].cust_id;
    const locn_id = (await db.query('SELECT * FROM locations WHERE name = $1',[req.body.location])).rows[0].id;
    db.query('INSERT INTO entry(customer,remarks,prod_id,cust_id,locn_id) VALUES ($1,$2,$3,$4,$5)',[req.body.customer_name,req.body.remarks,prod_id,cust_id,locn_id]);
});


//login route

app.post("/login",
    passport.authenticate("local", {
        successRedirect: "/itemEntry",
        failureRedirect: "/",
        failureMessage: "WRONG PASSWORD",
    })
);

//register route

app.post("/register", async (req,res)=> {
    const username = req.body.username;
    const password = req.body.password;
    const token = req.body.token;
    try{
        if(token != process.env.ADMIN_TOKEN){
            res.send("WRONG TOKEN");
        } else{
            const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
            if( result.rows.length > 0){
                res.send("USERNAME EXISTS");
            } else{
                bcrypt.hash(password, saltRounds, async (err,hash) => {
                    if(err) console.log("ERROR hashing",err);
                    const result = await db.query(
                        "INSERT INTO users (username, password, adminstrator) VALUES ($1, $2, $3) RETURNING *",
                        [username, hash, false]
                      );
                })
                const user = result.rows[0];
                req.login(user, (err) => {
                    console.log("success");
                    res.redirect("/itemEntry");
                });
            }
        }
    } catch(err){
        console.log("ERRor registering");
    }
});

//rendering login page

app.get("/", (err,res) => {
    res.render("login.ejs");
});

//rendering item entry page

//getting entry-data

app.post("/submitEntry", async (req,res)=>{
    console.log(req.body);
    await db.query("INSERT INTO entry(customer,prod_id,locn_id,remarks,cust_id) VALUES($1,$2,$3,$4,$5)",
        [
            req.body.custs,
            prod.find( (item) => item.name == req.body.product ).id,
            locn.find( (item) => item.loc_name == req.body.locn ).id,
            req.body.remark,
            cust.find( (item) => item.cust_name == req.body.custs ).cust_id
        ]
    );
    res.redirect("/");
});

//rendering location entry page

app.get("/locnEntry", (req,res) => {
    res.render("locnEntry.ejs");
});

// Adding location entry into locations table in DB

app.post("/getLocn" ,async (req,res) => {
    await db.query("INSERT INTO locations (loc_name) VALUES ($1)" , [req.body.locn]);
    res.redirect("/locnEntry");
});

//rendering customer entry page

app.get("/custEntry", (req,res) => {
    res.render("custEntry.ejs");
});

//getting cust entry

app.post("/getCust" , async (req,res) => {
    console.log(req.body.cust);
    await db.query("INSERT INTO customer (cust_name) VALUES ($1)" , [req.body.cust]);
    res.redirect("/custEntry");
});

//setting up local strategy

passport.use(
    new Strategy(async function verify(username, password, cb){
        console.log("VERIFYING...");
        try {
            const result = await db.query("SELECT * FROM users WHERE username = $1 ", [
              username,
            ]);
            if (result.rows.length > 0) {
              const user = result.rows[0];
              const storedHashedPassword = user.password;
              bcrypt.compare(password, storedHashedPassword, (err, valid) => {
                if (err) {
                  //Error with password check
                  console.error("Error comparing passwords:", err);
                  return cb(err);
                } else {
                  if (valid) {
                    //Passed password check
                    return cb(null, user);
                  } else {
                    //Did not pass password check
                    return cb(null, false);
                  }
                }
              });
            } else {
              return cb("User not found");
            }
          } catch (err) {
            console.log(err);
          }
}));


//serializing and deserializing
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});
  

//Listening on port 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});