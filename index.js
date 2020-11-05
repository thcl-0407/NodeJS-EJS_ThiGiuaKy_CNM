const express = require('express')
const app = express()
const port = 3000

const dynamodb = require('./dynamo.js')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.set('views', './views')

//Get all may tinh
app.get('/', (req, res)=>{
    dynamodb.GetAllData((result, data)=>{
        res.render('home', {
            may_tinhs: data
        })
    })
})

//API them may tinh
app.post('/api/add', function (req, res) {
    let data = req.body;

  dynamodb.CreateItem(data, (result)=>{
      if(result){
        res.send({
            success: 1,
            message: "Thêm Thành Công"
          })
      }else{
        res.send({
            success: 0,
            message: "Có Lỗi Xảy Ra"
          })
      }
  })
})

app.listen(port, () => console.log('Running on Port: ' + port))

