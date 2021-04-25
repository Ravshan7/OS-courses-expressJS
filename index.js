const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express() 

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine) // c помощью engine мы регистрируем в express движок первый параметр навзыавем имя движка а второе значение
app.set('view engine', 'hbs') // с помошью метода set мы получаем движок под названием hbs

app.use(express.static(path.join(__dirname, 'public'))) // Метод use нам позволяет добавлять какие то новые middleware или дополнительные функциональность в приложение
app.use(express.urlencoded({extended: true})) // Автоматический парсим входящие buffer запросы



app.use('/', require('./router/home')) // Здесь подключаем роуты главная как мидлваер
app.use('/courses', require('./router/courses')) // Здесь подключаем роуты курсы как мидлваер
app.use('/add', require('./router/add')) // Здесь подключаем роуты добавить курсы как мидлваер
app.use('/card', require('./router/card')) // Здесь подключаем роуты корзина курсы как мидлваер

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})