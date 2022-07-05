const funcRender=function(html,obj){
  let out=html.replace("{img}",obj.image)
  out=out.replace("{name}",obj.name)
  out=out.replace("{auther}",obj.auther)
  out=out.replace("{id}",obj.id)
  return out;
}
module.exports=funcRender