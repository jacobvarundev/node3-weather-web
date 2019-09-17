const express=require('express');
const path=require('path');
const hbs=require('hbs');
const app=express();
const geocode=require('../utils/geocode');
const forecast=require('../utils/forecast');

console.log('__dirname');
console.log('__filename');
console.log(path.join(__dirname,'..'));
console.log(path.join(__dirname,'../..'));

const partialsPath=path.join(__dirname,'../partials');
console.log(partialsPath);
const PORT=3000;
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);
app.get('',(req,res)=>{
  res.render('index',{
      title:'weather ',
      name:'jacob'
  });
} );

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'jacob'
    });
  });
  app.get('/help',(req,res)=>{
      res.render('help',{
          title:'Help',
          message:'this is a message designed to help you ',
          name:'jacob'
      })
  })

app.use(express.static(path.join(__dirname,'../public')))



app.get('/weather',(req,res)=>{
    const {address}=req.query;
    if(!req.query.address){
        return res.send({
            error:'Address need to be provided'
        })
    }
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(latitude,longitude,(error,summary)=>{
            if(error){
                return res.send({error});
            }
            res.send({summary,location,address:req.query.address})
        
        })
    })
    });

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'add query strings'
        })
    }

    res.send({
        products:[ ]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{title:'error',
name:'jacob',
error:'help article not found'})
}
)
app.get('*',(req,res)=>{
    res.render('error',{title:'error',
    name:'jacob',
    error:'Page not founds'})
    
});
app.listen(PORT,()=>console.log('server is listening to port 3000'));