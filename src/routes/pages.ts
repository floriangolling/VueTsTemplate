import express, {Response, Request, response} from 'express';
import path from 'path'

let pageRouter = express.Router();

pageRouter.use(express.static(path.join(__dirname, '..', 'public')));
pageRouter.use(express.static(path.join(__dirname, '..', '..', 'distVue')));

pageRouter.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', '..', 'distVue', 'ideaList.html'))
});

export default pageRouter;