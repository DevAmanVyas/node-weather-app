const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;
const app = express();
const pubDirPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);
app.use(express.static(pubDirPath));


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Aman Vyas'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Aman Vyas'
    });
});
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Aman Vyas'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide an address',
            code:401
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }

        forecast(latitude,longitude,(error,forecast)=>{
            if(error){
                return res.send({
                    error:error
                })
            }

            res.send({
                location:location,
               forecast:forecast
            });

        })
    });
   
});

app.get('*',(req,res)=>{
    res.render('404',{
        title:'Oops! Page Not found - 404',
        name:'Aman Vyas'
    });
});
app.listen(port,()=>{
    console.log('Server is up on '+port);
});

