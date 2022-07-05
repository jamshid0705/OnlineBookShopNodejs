const main=document.querySelector(".main")

let obj;
fetch(`http://127.0.0.2:7000/get/v1/book`).then((res)=>{
      return res.json()
    })
    .then(function(response){
    
     obj= response.data.book
      console.log(obj)
      render(obj)
    })

console.log(obj)

const render=function(obj){
  obj.forEach((val,key)=>{
    const html=`
    <div class="main1">
      <h2 class="buy"   id="${val.id}">Buy</h2>
      <a href="bookView.html"  class="abc b">Buy</a>
      
       <img  src="${val.image}" alt="">
       
     </div>
`
    main.insertAdjacentHTML("afterbegin",html)
    const q=document.querySelector(".buy")
    const g=document.querySelector(".abc")
    func(document.querySelector(".buy"),document.querySelector(".abc"))
  })
}
 
const func=function(b,a){
    b.addEventListener("click",function(e){
    e.preventDefault()
    const data=e.target.closest(".buy");
    console.log(data)
    const data1=data.getAttribute("id")
    console.log( data1)
  
    if(Number(data1)>=0){
      a.classList.toggle("b")
      
      a.addEventListener("click",function(e){
              e.preventDefault()
              fetch(`http://127.0.0.2:7000/get/v1/book`).then((res)=>{
                return res.json()
              })
              .then(function(response){
              
              obj= response.data.book
                console.log(obj)
                renderBook(obj,data1)
              })
      })

  
   
  
    }
      
  })
}



const renderBook=function(obj,id){
  let out=obj.find(val=>val.id==id)
  console.log(out)
  const mainVI=document.querySelector(".mainVI")

  let html=` <button class="btn1"><a href="login.html">Add Book</a></button>
    <img src="${out.image}" alt="">
    <div class="main1">
    <p>Book Name:${out.name}</p>

    <p>Auther: ${out.auther}</p>

    <p>Description: ${out.description}</p>
    </div>
    <button class="btn2"><a href="main.html">Back</a></button>`
   
    mainVI.insertAdjacentHTML("afterbegin",html)
}






