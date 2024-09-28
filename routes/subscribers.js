const express = require('express')
const router = express.Router()
const Subscribers = require('../models/subscribers')

//Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscribers.find();
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//Getting one
router.get('/:id', getSubscriberById, (req, res) => {
    res.json(res.subscriber)
})
//creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscribers({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubcriber = await subscriber.save()
        res.status(201).json(newSubcriber)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Updating one
router.patch('/:id', getSubscriberById, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubcriber = await res.subscriber.save()
        res.json(updatedSubcriber)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})
//Deleting one
router.delete('/:id', getSubscriberById, async (req, res) => {
    try {
        await res.subscriber.deleteOne()
        res.json({ message: 'Deleted subscriber' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


async function getSubscriberById(req, res, next) {
    let subscriber

    try {
        subscriber = await Subscribers.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: "can't find subscriber " })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }

    res.subscriber = subscriber;
    next()
}

module.exports = router