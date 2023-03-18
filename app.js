//require package used in the project
const express = require('express')
const app = express() //試試看跟上面統一
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//define server related variables
const port = 3000

// setting static files
app.use(express.static('public'))

//handle request and response here
//index page
app.get('/', (req, res) => {
    res.render('index', {restaurants: restaurantList.results})
})

//show pages
app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurant = restaurantList.results.find(
        theRestaurant => theRestaurant.id.toString() === req.params.restaurant_id
    )
    res.render('show', {restaurant: restaurant})
})

//search function
app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurants = restaurantList.results.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { restaurants: restaurants, keyword: keyword })
  })
  

//start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})