const express = require("express");
const ejs=require('ejs');
const bodyParser = require('body-parser')
const nodemailer=require('nodemailer');
var pdf = require("pdf-creator-node");
var fs = require('fs');
const { getMaxListeners } = require("process");

// Read HTML Template
var html = fs.readFileSync('kkj.html', 'utf8');

var options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm",

          // Rendering options
            "base": "file:///F:/AtomWebFolder/SIHmedPres" ,
          // Zooming option, can be used to scale images if `options.type` is not pdf
          "zoomFactor": "1", // default is 1

          // File options
          "type": "pdf", // allowed file types: png, jpeg, pdf
          "quality": "75",

        };


const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.get('/',function(req,res){
    res.render('prescription');
});
app.post('/',(req,response)=>{
console.log(req.body);
var pdfName=Date.now()+".pdf";
var document = {
    html: html,
    data: req.body
    ,
    path:"./public/pdfs/"+ pdfName,
    type: "",
  };
  pdf
  .create(document, options)
  .then((res) => {
    console.log(res);
    response.render('pdfPreview', { pdfsrc: "pdfs/"+pdfName });
  })
  .catch((error) => {
    console.error(error);
  });
//res.sendStatus(200);
//response.redirect("/");
})
app.post('/send',(req,res)=>{
    var personEmail=req.body.email;
    console.log(req.body.pdf)
    let transporter=nodemailer.createTransport(
        {
            service:'gmail',
            auth:{
                user: "imkrsh007@gmail.com",
                pass: "ourpassword"
            }
        }
    );
    
    //Step 2
    let mailOptions={
        from:'bytpphyte@gmail.com',
        to:personEmail,
        cc:'imkrsh007@gmail.com',
        subject:'Regarding Registration as assured doctor in PRANKS',
        text:'This is your Prescription for the appointment',
        attachments: [
            {
                filename:'output.pdf',
                path:'./public/'+req.body.pdf
            }
        ]
    }
    
    //Step 3
    transporter.sendMail(mailOptions,function(err,data){
        if(err){
            console.log("Error Occurs"+err);
        }
        else{
            console.log("Email Sent!!!");
        }
    });
        
        console.log(personEmail);
    res.render('pdfPreview', { pdfsrc: req.body.pdf });
        
})
app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000.");
});
