import express from 'express'
import { Idea } from '../../models';
import { Request, Response } from "express";

export let ideasRouter = express.Router();

ideasRouter.get('/', async function (req: Request, res: Response) {
    try {
        const idea = await Idea.findAll();
        if (!idea)
            res.sendStatus(404);
        else
            res.status(200).send(idea);
    } catch (err) {
        res.status(500).send(err);
    }
});

ideasRouter.delete('/:id', async function (req: Request, res: Response) {
    try {
        const idea = await Idea.destroy({ where: {id: req.params.id }})
        if(!idea)
            res.sendStatus(404);
        else
            res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

ideasRouter.post('/', async function (req: Request, res: Response) {
    try {
        const idea = await Idea.create({title: req.body.title, user: req.body.user, text: req.body.text, like: 0})
        if (!idea)
            res.sendStatus(404);
        else
            res.status(200).send(idea);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

ideasRouter.put('/:id', async function (req: Request, res: Response) {

    try {
        let idea = await Idea.update({ like: req.body.like }, {where:{ id: req.params.id}})
        if (!idea)
            res.sendStatus(404);
        else {
            res.status(200).send(idea);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

ideasRouter.get('/:id', async function (req: Request, res: Response) {
    try {
        const idea = await Idea.findOne({ where: {id: req.params.id }});
        if (!idea)
            res.sendStatus(404);
        else
            res.status(200).send(idea);
    } catch (err) {
        res.status(500).send(err);
    }
});