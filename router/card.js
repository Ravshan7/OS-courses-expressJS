const { Router } = require('express')
const Card = require('../module/card')
const Course = require('../module/course')

const router = Router()


router.get('/', async (req, res) => {
    const card = await Card.fetch()
    res.render('card', {
        title: 'Корзина',
        isCard: true,
        course: card.course,
        price: card.price
    })
})

router.post('/', async (req, res) => {
    const course = await Course.getAll()
    const findCource = course.find(el => el.id === req.body.id)
    await Card.add(findCource)

    res.redirect('/card')
})


router.delete('/:id', async (req, res) => {
    const card = await Card.removeCard(req.params.id)
    res.status(200).json(card)
})


module.exports = router