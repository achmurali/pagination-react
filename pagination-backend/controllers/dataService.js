const dataRouter = require('express').Router()
const data = require('../models/data')

dataRouter.get('/', async (req, res) => {
    const page = req.query.page ? +req.query.page : 1;
    const size = req.query.page ? +req.query.size : 10;
    console.log(`${page},${size}`)

    const result = await data.find({}).skip((page * size) - size).limit(size)
    const totalUsers = await data.count({});

    res.json({
        count: totalUsers,
        page: page,
        size: size,
        users: result.map(e => e.toJSON())
    })
})

module.exports = dataRouter
