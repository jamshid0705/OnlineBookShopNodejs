const fs=require("fs");
const express=require("express");
let cors = require("cors");
let url =require('url')
let http=require("http")
const funcRender=require("./func.js");
const { add } = require("nodemon/lib/rules");
const app=express();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Acces-Control-Allow-Origin", "*");
  res.setHeader("Acces-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Acces-Contorl-Allow-Methods", "Content-Type", "Authorization");
  next();
});

const book=JSON.parse(fs.readFileSync(`${__dirname}/json/book.json`,"utf-8"));
const user=JSON.parse(fs.readFileSync("./json/user.json","utf-8"))

//////////////////////// get ///////////////////////////

const getBook=((req,res)=>{
  res.status(200).json({
    status:"succes",
    data:{
      book,
    }
  })
})

const getUser=((req,res)=>{
  res.status(200).json({
    status:"succes",
    data:{
      user,
    }
  })
})

///////////// get id ///////

const getBookId=((req,res)=>{
  let id=+req.params.id;
  let newobj=book.find(val=>val.id===id);

  res.status(200).json({
    status:"succes",
    data:{
      name:newobj
    }
  })
})

const getUserId=((req,res)=>{
  let id=+req.params.id;
  let newobj=user.find(val=>val.id===id);

  res.status(200).json({
    status:"succes",
    data:{
      name:newobj
    }
  })
})

/////////// post///////////
app.use(express.json());

const postBook=((req,res)=>{
  let body=req.body;
  let newid=book[book.length-1].id+1;
  let arr=Object.assign({id:newid},body);
  console.log(arr)

  book.push(arr);

  fs.writeFile("./json/book.json",JSON.stringify(book),"utf-8",err=>{
    res.status(201).json({
      status:"succes",
      data:{
        name:arr
      }
    })
  })
})



const postUser=((req,res)=>{
  let body=req.body;
  let newid=user[user.length-1].id+1;
  let arr=Object.assign({id:newid},body);
  console.log(arr)

  user.push(arr);

  fs.writeFile("./json/user.json",JSON.stringify(user),"utf-8",err=>{
    res.status(201).json({
      status:"succes",
      data:{
        name:arr
      }
    })
  })
})

/////////////////////////////// post id ////////////////////
const postIdBook=((req,res)=>{
  const id1=+req.params.id; // : dan keyingi o'zgaruvchini olamiz
  const body=req.body;
  
  const data=book.find(val=>val.id===id1);
  if(body.name){
    data.name=body.name
  }
  if(body.auther){
    data.auther=body.auther
  }
  if(body.image){
    data.image=body.image
  }

  const data1=book.findIndex(val=>val.id===id1);
  book[data1]=data;
  fs.writeFile("./json/book.json",JSON.stringify(book),"utf-8",err=>{
   
  res.status(200).json({
    status:"succes",
    data:{
      data,
    }
  })
  })

})


const getIdUser=((req,res)=>{
  const id1=+req.params.id; // : dan keyingi o'zgaruvchini olamiz
  const body=req.body;
  
  const data=user.find(val=>val.id===id1);
  if(body.name){
    data.name=body.name
  }
  if(body.surname){
    data.surname=body.surname
  }
  if(body.login){
    data.login=body.login
  }
  if(body.parol){
    data.parol=body.parol
  }

  const data1=user.findIndex(val=>val.id===id1);
  user[data1]=data;
  fs.writeFile("./json/user.json",JSON.stringify(user),"utf-8",err=>{
   
  res.status(200).json({
    status:"succes",
    data:{
      data,
    }
  })
  })

})
//////////////////////////////// delete /////////////////////////

const deleteBook=((req,res)=>{
  const id=req.params.id;
  const data=book.filter(val=>val.id!=id);

  fs.writeFile("./json/book.json",JSON.stringify(data),"utf-8",err=>{
    res.status(200).json({
      status:"succes",
      data:{
        data,
      }
    })
  })
})


const deleteUser=((req,res)=>{
  const id=req.params.id;
  const data=user.filter(val=>val.id!=id);

  fs.writeFile("./json/user.json",JSON.stringify(data),"utf-8",err=>{
    res.status(200).json({
      status:"succes",
      data:{
        data,
      }
    })
  })
})

//////////////////////////// app  ///////////

app.get("/get/v1/book",getBook)
app.get("/get/v1/user",getUser)

app.get("/get/v1/book/:id",getBookId)
app.get("/get/v1/user/:id",getUserId)

app.post("/post/v1/book",postBook)
app.post("/post/v1/user",postUser)

app.delete("/delete/v1/book/:id",deleteBook)
app.delete("/delete/v1/user/:id",deleteUser)

app.post("/post/v1/book/:id",postIdBook)
app.post("/post/v1/user/:id",getIdUser)

app.listen("7000","127.0.0.2")

////////////////////// main html ///////////////
// const mainHtml=fs.readFileSync(`${__dirname}/html/main.html`,"utf-8");
// const bookView=fs.readFileSync("./html/bookView.html","utf-8")
// const login=fs.readFileSync("./html/login.html","utf-8")
// const addbook=fs.readFileSync("./html/addbook.html","utf-8")
// const error=fs.readFileSync("./html/error.html","utf-8")

// const card=fs.readFileSync("./html/card.html","utf-8")
// const obj=JSON.parse(fs.readFileSync("./json/book.json","utf-8"));

// const server=http.createServer((req,res)=>{
//   let mainObj=obj.map(val=>{
//     return funcRender(card,val);
//   }).join('');
//   let b=mainHtml.replace("{change}",mainObj);

//   let urlcha=req.url;

//   let bookId=+url.parse(urlcha,true).query.id;

  
//   if(urlcha==="/home"){
//     res.writeHead(200,{
//       "content-type":"text/html"
//     })
//     res.end(b)
//   }

//   else if(urlcha===`/book?id=${bookId}`){
//     let c=obj.find(val=>val.id==bookId)

//     let bookV=funcRender(bookView,c);
//     res.writeHead(200,{
//       "content-type":"text/html"
//     })
//     res.end(bookV)
//   }

//   else  if(urlcha==="/login"){
//     res.writeHead(200,{
//       "content-type":"text/html"
//     })
//     res.end(login)
//   }

//   else  if(urlcha==="/addbook"){
//     res.writeHead(200,{
//       "content-type":"text/html"
//     })
//     res.end(addbook)
//   }

//   else  if(urlcha==="/error"){
//     res.writeHead(200,{
//       "content-type":"text/html"
//     })
//     res.end(error)
//   }
// })






// server.listen("8000","127.0.0.2")


