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
        
        // check user active, and correct password
        if (user && user.account.isActive && bcrypt.compareSync(password.value, user.password.value)) 
        {
            // set validation rule to undefinedable
            user.password.validationRules = Object.assign(user.password.validationRules, { 
                undefinable: true,
            })
           
            // delete password from response
            user.password.value = undefined;

            return user;
        }

        return null;
    }
}