import { Request, Response } from 'express';

class UserController {
    index(req: Request, res: Response): void {
        res.json({ message: 'index' });
    }

    store(req: Request, res: Response): void {
        res.json({ message: 'store' });
    }
}

export default new UserController();
