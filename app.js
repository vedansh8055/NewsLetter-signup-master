const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
app.use(express.static("./Static"));
app.use(bodyParser.urlencoded({unexcluded:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
})
app.post("/",function(req,res){
const Fname=req.body.first;
const Lname=req.body.last;
const Email=req.body.mail;
console.log(Fname,Lname,Email);
var data={
  members:[
    {
  email_address:Email,
  status:"subscribed",
  merge_fields:{
    FNAME:Fname,
    LNAME:Lname,
  }
}
]
}
const Jsondata=JSON.stringify(data);
const url="https://us4.api.mailchimp.com/3.0/lists/9fc066f1db";
const options={
  method:"POST",
  auth:"vedansh:036a1c38c3a182481e4d409965e12e76-us4",
}
const reques=  https.request(url,options,function(response){
  if(response.statusCode===200)
    {
      res.sendFile(__dirname+ "/sucess.html");
  }
  else{


    res.sendFile(__dirname+"/failure.html");
  }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
reques.write(Jsondata);
reques.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT||3000,function(){
  console.log("server is running on port 3000");

})
