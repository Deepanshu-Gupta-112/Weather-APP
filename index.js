const http=require('http');
var path = require('path')
var requests=require('requests');
const fs=require('fs');
const homefile=fs.readFileSync("home.html","UTF-8");
var changeval=(temp)=>{
    const num=(temp)-273.15;
    const temps=num.toFixed(2);
    return temps;
}
const replaceVal=(tempVal,orgVal)=>{
     // const num=(orgVal.main.temp)-273.15;
      const temp=changeval(orgVal.main.temp);
      temperature=tempVal.replace("{%tempval%}",temp);
      temperature=temperature.replace("{%tempmin%}",changeval(orgVal.main.temp_min));
      temperature=temperature.replace("{%tempmax%}",changeval(orgVal.main.temp_max));
      temperature=temperature.replace("{%location%}",orgVal.name);
      temperature=temperature.replace("{%country%}",orgVal.sys.country);
      temperature=temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
    //  console.log(orgVal.weather[0].main)
      return temperature;
};

const server=http.createServer((req,res) => {
    if(req.url=='/'){
        requests("http://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=f48acce044299d90d95fcd72ebcff66a")
        .on("data", (chunk)=> {
        const  objdata=JSON.parse(chunk);
        const arrdata=[objdata];
       // console.log(arrdata);
         // console.log(arrdata);
       //const num=(arrdata[0].main.temp)-273.15;
       //const temp=num.toFixed(2);
      // console.log(temp);
       const realtimedata=arrdata.map((val)=> replaceVal(homefile,val)).join("");
    res.write(realtimedata);
        //console.log(realtimedata);
    })
        .on("end",  (err) => {
          if (err) return console.log('connection closed due to errors', err);
        res.end(); 
            });
          }
});
server.listen(8000,"127.0.0.1");
//console.log(objdata);