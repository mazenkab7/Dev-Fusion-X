const express= require('express')
const app= express()




app.use(express.static('public'))
const bodyParser = require('body-parser');
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());

app.set('view engine', 'ejs');


app.get('/',(req,res)=>{
    res.render('index')
})



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
