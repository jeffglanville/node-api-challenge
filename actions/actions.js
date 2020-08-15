const express = require("express")
const actions = require("../data/helpers/actionModel")

const router = express.Router()

router.get("/actions/:id", (req,res) => {
    actions.get(req.params.id)
    .then((action) => {
        if (action.length == 0) {
            res.status(404).json({
                message: "The action with the specified id does not exist"
            })
        }else {
            res.status(200).json(action)
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "The action information could not be retrieved"
        })
    })
})

router.post("/actions/:id", (req,res) => {
    if (!req.params.id) {
        return res.status(404).json({
            message: "The action with the specified id does not exist."
        })
    }

    if (!req.body.description || !req.body.notes) {
        return res.status(400).json({
            message: "Please provide text and description for the action."
        })
    }

    actions.insert({project_id: req.params.id, ...req.body})
    .then((action) => {
        res.status(201).json(action)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "There was an error while saving the action to the database."
        })
    })
})

router.put("/actions/:id", (req,res) => {
    if(!req.body.description || !req.body.notes) {
        return res.status(400).json({
            message: "Please provide a description and notes for the action."
        })
    }

    actions.update(rea.params.id, req.body)
    .then((action) => {
        if (action) {
            res.status(200).json(action)
        }else {
            res.status(400).json({
                message: "the action with the specified id does not exist."
            })
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "The action information could not be modified"
        })
    })
})

router.delete("/actions/:id", (req, res) => {
    actions.remove(req.params.id)
    .then((id) => {
        if (id > 0) {
            res.status(200).json({
                message: "The action has been deleted"
            })
        }else {
            return res.status(404).json({
                message: "The action with the specified id does not exist."
            })
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "The action could not be removed"
        })
    })
})