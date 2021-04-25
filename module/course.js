const uuid = require('uuid')
const fs = require('fs')
const path = require('path')

class Course {
    constructor(title, price, img) {
        this.id = uuid.v1()
        this.title = title,
            this.price = price,
            this.img = img
    }



    static async edit(body) {
        const courses = await Course.getAll()
        const idx = courses.findIndex(el => el.id === body.id)
        courses[idx] = body

        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'courses.json'), JSON.stringify(courses), (err) => {
                if (err) {
                    rej(err)
                } else {
                    res()
                }
            })
        })

    }


    async save() {
        const newCoursesData = {
            id: this.id,
            title: this.title,
            price: this.price,
            img: this.img
        }

        const courses = await Course.getAll()
        courses.push(newCoursesData)

        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'courses.json'), JSON.stringify(courses), (err) => {
                if (err) {
                    rej(err)
                } else {
                    res()
                }
            })
        })
    }

    static getAll() {
        return new Promise((res, rej) => {
            fs.readFile(path.join(__dirname, '..', 'data', 'courses.json'), 'utf-8', (err, content) => {
                if (err) {
                    rej(err)
                } else {
                    res(JSON.parse(content))
                }
            })
        })
    }


    static async getById(id) {
        const course = await Course.getAll()
        return course.find(el => el.id === id)
    }
}

module.exports = Course