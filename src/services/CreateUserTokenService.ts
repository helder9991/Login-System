import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface IProps {
    email: string;
}

class CreateUserTokenService {
    execute({ email }: IProps): string {
        const { expiresIn, secret } = authConfig.jwt;

        const token = sign({ email }, secret, {
            subject: email,
            expiresIn,
        });

        return token;
    }
}

export default new CreateUserTokenService();
