import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    UserId,
    UserAccountId,
    UserSurname,
    UserAvatar,
    UserEmail,
    UserMobile,
    UserLangId,
    UserUsername,
    UserPassword,
    UserRememberToken,
    UserData,
    UserCreatedAt,
    UserUpdatedAt,
    UserDeletedAt
    
} from './../../domain/value-objects';
import { IUserRepository } from './../../domain/user.repository';
import { IamUser } from './../../domain/user.aggregate';

@Injectable()
export class UpdateUserService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IUserRepository
    ) {}

    public async main(
        id: UserId,
        accountId?: UserAccountId,
        surname?: UserSurname,
        avatar?: UserAvatar,
        email?: UserEmail,
        mobile?: UserMobile,
        langId?: UserLangId,
        username?: UserUsername,
        password?: UserPassword,
        rememberToken?: UserRememberToken,
        data?: UserData,
        
    ): Promise<void>
    {        
        // create aggregate with factory pattern
        const user = IamUser.register(
            id,
            accountId,
            surname,
            avatar,
            email,
            mobile,
            langId,
            username,
            password,
            rememberToken,
            data,
            null,
            new UserUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(user);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const userRegister = this.publisher.mergeObjectContext(
            user
        );
        
        userRegister.updated(user); // apply event to model events
        userRegister.commit(); // commit all events of model
    }
}