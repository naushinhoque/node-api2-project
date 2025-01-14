// implement your posts router here
const express = require('express')
const Post = require('../models/post')

const router = express.Router()

router.get('/', (req, res) => {
    Post.find()
        .then(found => {
            res.json(found)
        })
        .catch(err => {
            res.status(500).json({
                 message: "The posts information could not be retrieved",
                 err: err.message,
                 stack: err.stack,
            })
        })
})
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({
                message: "The post with the specified ID does not exist",
            })
        }
        res.json('bad')
    } catch (err) {
        res.status(500).json({
            message: "The post information could not be retrieved",
            err: err.message,
            stack: err.stack
        })
    }
})
router.post('/', (req, res) => {
    const { title, contents } = req.body
    if(!title || !contents) {
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        })
    } else {
      Post.insert({ title, contents })
        .then(({ id }) => {
            return Post.findById(id)
        })
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the post to the database",
                err: err.message,
                stack: err.stack
            })
        })
    }
})
router.delete('/:id', (req, res) => {
    
})
router.put('/:id', (req, res) => {
    
})
router.get('/:id/message', (req, res) => {
    
})


module.exports = router 