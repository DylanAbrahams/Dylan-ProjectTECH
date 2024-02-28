const express = require('express')
const app = express()
const port = 3000

const data = 
[{
  title:"Personenfilm",
  story:"Heel leuk verhaal over een personage",
  },
];


/* Middleware */
app.set('view engine', 'ejs')


app.use(express.json());
app.use(express.urlencoded({extended:true})).use(express.static('static'))


/* Routes */
app.get('/', (req, res) => {
  res.render('home', {data: data});
})



app.post("/", (req, res) => {
  console.log(req.body);
  data.push ({
    title:req.body.title,
    story:req.body.story,
  });
  res.redirect('/')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

