import { Injectable } from '@nestjs/common';
import { IUserRepository } from './../../domain/user.repository';
import { IamUser } from './../../domain/user.aggregate';
import { UserPassword, UserUsername } from './../../domain/value-objects';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FindUserByUsernamePasswordService
{
    constructor(
        private readonly repository: IUserRepository
    ) {}

    public async main(username: UserUsername, password: UserPassword): Promise<IamUser>
    {
        const user = await this.repository.find({
            where: {
                username: username.value
            },
            include: ['account']
        });
        
        if (user && bcrypt.compareSync(password.value, user.password.value)) 
        {
            // delete password from response
            user.password.value = undefined;

            return user;
        }

        return null;
    }
}