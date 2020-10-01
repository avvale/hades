import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    UserId,
    UserAccountId,
    UserName,
    UserSurname,
    UserAvatar,
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
        name?: UserName,
        surname?: UserSurname,
        avatar?: UserAvatar,
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
            name,
            surname,
            avatar,
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