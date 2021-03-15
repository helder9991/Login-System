import { getRepository } from 'typeorm';
import { differenceInMinutes } from 'date-fns';

import User from '../models/User';
import AppError from '../errors/AppError';

interface IProps {
    token: string;
    user_id: string;
}

class ShowUserService {
    async execute({ token, user_id }: IProps): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(user_id);

        if (user?.token !== token) throw new AppError('Não autorizado.', 401);

        if (differenceInMinutes(new Date(), user.ultimo_login) > 30)
            throw new AppError('Sessão inválida.', 401);

        return user;
    }
}

export default new ShowUserService();
