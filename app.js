const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const nodemailer=require("nodemailer");
const app=express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/userDB", {useUnifiedTopology: true , useNewUrlParser: true });
let mailTransporter=nodemailer.createTransport({
  service:'gmail',
});
const contactSchema=new mongoose.Schema({
  name:String,
  email:String,
  message:String
});
const Contact=mongoose.model("Contact",contactSchema);

app.get("/",function(req,res){
    res.sendFile(__dirname+"/public/index.html");
});
app.post("/contactus.html",function(req,res){
    const cntct=new Contact({
      name:req.body.myname,
      email:req.body.mailid,
      message:req.body.msg
    });
    cntct.save();
res.redirect("/");
});
app.get("/admin",function(req,res){
  Contact.find({},function(err,contacts){
    if(!err){
    res.render("admin",{contacts:contacts});
    }
  });
});
app.listen(4000,function(){
  console.log("Server running at 3000");
});
