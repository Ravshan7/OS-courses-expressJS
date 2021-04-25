const path = require('path')
const fs = require('fs')
const { count } = require('console')

const p = path.join(__dirname, '..', 'data', 'card.json')

class Card {

    static async removeCard(id) {
        const card = await Card.fetch()
        const idx = card.course.findIndex(el => el.id === id)
        const course = card.course[idx]
        
        if(course.count === 1) {
            console.log(course);
            card.course = card.course.filter(el => el.id !== id)
        } else {
            card.course[idx].count--
        }

        card.price -= course.price

        return new Promise((res, rej) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    rej(err)
                } else {
                    res(card)
                }
            })
        })
    }


    static async add(course) {
        const card = await Card.fetch()
        const idx = card.course.findIndex(el => el.id === course.id)
        const candidate = card.course[idx]
        if (candidate) {
            candidate.count++,
                card.course[idx] = candidate
        } else {
            course.count = 1
            card.course.push(course)
        }

        card.price += +course.price

        return new Promise((res, rej) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    rej(err)
                } else {
                    res()
                }
            })
        })


    }

    static fetch() {
        return new Promise((res, rej) => {
            fs.readFile(p, 'utf-8', (err, data) => {
                if (err) {
                    rej(err)
                } else {
                    res(JSON.parse(data))
                }
            })
        })

    }
}

module.exports = Card