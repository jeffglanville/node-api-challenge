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