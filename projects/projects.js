const express = require("express")
const projects = require("")

const router = express.Router()

router.get("/projects/:id", (req,res) => {
    projects.get(req.params.id)
    .then((project) => {
        if (project.length == 0) {
            res.status(400).json({
                message: "The project with the specified id does not exist."
            })
        }else {
            res.status(200).json(project)
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "The project information could not be retrieved."
        })
    })
})

router.get("/projects/:id/actions", (req,res) => {
    if (!req.params.id) {
        return res.status(404).json({
            message: "The project with the specified id could not be found."
        })
    }
    projects.getProjectAction(req.params.id)
    .then((actions) => {
        res.json(actions)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "The actions information could not be retrieved."
        })
    })
})

router.post("/projects", (req, res) => {
    if(!req.body.name || !req.ody.description) {
        return res.status(400).json({
            message: "Please provide a name and description for the project"
        })
    }
    projects.insert(req.body)
    .then((project) => {
        res.status(201).json(project)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "There was an error while saving the post to the database"
        })
    })
})

router.post("/projects/:id/actions", (req,res) => {
    if (!req.params.id) {
        return res.status(404).json({
            message: "The project with the specified id does not exist"
        })
    }

    if(!req.body.name || !req.body.description) {
        return res.status(400).json({
            message: "Please provide a name and description for the project"
        })
    }

    project.insert(req.params.id, req.body)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "There was an error while saving the action to the database"
        })
    })
})