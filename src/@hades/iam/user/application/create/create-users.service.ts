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
import { AddUsersContextEvent } from './../events/add-users-context.event';

@Injectable()
export class CreateUsersService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IUserRepository
    ) {}

    public async main(
        users: {
            id: UserId,
            accountId: UserAccountId,
            name: UserName,
            surname: UserSurname,
            avatar: UserAvatar,
            mobile: UserMobile,
            langId: UserLangId,
            username: UserUsername,
            password: UserPassword,
            rememberToken: UserRememberToken,
            data: UserData,
            
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateUsers = users.map(user => IamUser.register(
            user.id,
            user.accountId,
            user.name,
            user.surname,
            user.avatar,
            user.mobile,
            user.langId,
            user.username,
            user.password,
            user.rememberToken,
            user.data,
            new UserCreatedAt(Utils.nowTimestamp()),
            new UserUpdatedAt(Utils.nowTimestamp()),
            null
        ));

        // insert
        await this.repository.insert(aggregateUsers);

        // create AddUsersContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const usersRegistered = this.publisher.mergeObjectContext(new AddUsersContextEvent(aggregateUsers));

        usersRegistered.created(); // apply event to model events
        usersRegistered.commit(); // commit all events of model
    }
}