let express=require('express');
let axios=require('axios');
let cors=require('cors');
let app=express();
app.use(cors());
app.get('/search',async (request,response)=>{
    console.log(request.query);
    let data=[];
    let count=-1;
    try{
   await axios({
    method:"GET",
    url:"https://saavn.dev/api/search/songs",
    params:request.query
   }).then(res=>{
        res.data.data.results.map(e=>{
            data.push({
                name:e.name,
                duration:(Math.floor(e.duration/60)+":"+((e.duration%60))),
                imageUrl:e.image[2].url,
                songUrl:e.downloadUrl[4].url,
                author:e.artists.primary[0].name || "",
                id:++count
            })
        })
        console.log(data.length);
        count=0;
        response.status(200).json(data);
   }).catch(err=>{console.log("Server Error  ::",err);response.status(401).json({"message":"Bad Data"})});
}catch(err){
    response.status(500).json({"message":"server Error"});
}
   
})
app.listen(8082,()=>console.log("Server Connected"));