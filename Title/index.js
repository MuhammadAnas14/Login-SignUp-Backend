var express = require('express');
var path  = require('path');
var mongoose = require('mongoose');
var bodyParser= require('body-parser');
var engine = require('consolidate');
const data = require('./model/idea.js')

var app= express();

mongoose.connect('mongodb://localhost/dataa',{useNewUrlParser:true});
const db = mongoose.connection;
db.then(console.log('mongoose is working' ))
db.catch(err => {console.log('err')});



app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname + '/views/index.html'));
});


app.post('/goto',(req,res)=>{
  var First_Name = req.body.firstName;
  var Last_Name= req.body.lastName;
  var Email_Address = req.body.emailAddress;
  var Passwordd = req.body.password;

  var details = new data({
    FirstName: First_Name,
    LastName: Last_Name,
    EmailAddress: Email_Address,
    Password: Passwordd
  });

  details.save((err)=>{
    console.log("data is saved");
    if (err){
      console.log(err);
    }
  });

  res.redirect("/")


});

app.post('/check',(req,res)=>{
  var email = req.body.email
  var password = req.body.password

  data.findOne({EmailAddress:email, Password:password},function(err,data){
    if (err){
      console.log(err);
      
    }
    if(!data){
      console.log("enter correct user")
    }
    else{
      console.log('ALL correct')
    }
    res.redirect('/')
  })


});

app.get('/chng',(req,res)=>{
  res.sendFile(path.join(__dirname + '/views/index3.html'));
})

app.get('/sign_up',(req,res)=>{
  res.sendFile(path.join(__dirname + '/views/index2.html'));

})

app.put('/pass',(req,res)=>{
  currentpassword=req.body.currentpassword
  newpassword = req.body.newpassword


  data.findOne({Password:currentpassword},function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Password")
    }
    if(true){
      data.updateOne({Password:newpassword},function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log('ok')
        }
    res.redirect('/')
      })

    }
  })

});

app.get("/fetchData",(req,res) => {
  res.json({
    todo : "working todo"
  })
})

app.post('/fetch',(req,res)=>{

  
  email=req.body.enteremail
  console.log(email)
  data.find({EmailAddress:email},function(err,data){
    var a = data[0];
    console.log(a)
    var x = a["FirstName"]
    var y = a["LastName"]
    res.render(__dirname + "/views/index.html", {x:x,y:y});

  })

  // fetching();
  // res.redirect("/")
})

app.listen(8080,()=>{
  console.log('server is running  on 8000')
});
