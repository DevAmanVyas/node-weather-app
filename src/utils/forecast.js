const request = require("postman-request");

const forecast = (lat,long,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=6b06631681713f1fce409966f2d5f88c&query='+lat+','+long ;

   request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect , Plaease try again later',undefined);
        }else if(response.error){
            callback('Uanble to fetch forecast for the given location, try another location',undefined);
        }else{
            callback(undefined,`${response.body.current.weather_descriptions[0]}, It is currently ${response.body.current.temperature} degress out. But it feels like  ${response.body.current.feelslike} out`);
        }
   });
};

module.exports = forecast;