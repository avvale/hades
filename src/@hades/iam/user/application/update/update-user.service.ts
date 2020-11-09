import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
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
    UserDeletedAt,
} from './../../domain/value-objects';
import { IUserRepository } from './../../domain/user.repository';
import { IamUser } from './../../domain/user.aggregate';

@Injectable()
export class UpdateUserService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IUserRepository,
    ) {}

    public async main(
        payload: {
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
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const user = IamUser.register(
            payload.id,
            payload.accountId,
            payload.name,
            payload.surname,
            payload.avatar,
            payload.mobile,
            payload.langId,
            payload.username,
            payload.password,
            payload.rememberToken,
            payload.data,
            null,
            new UserUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(user, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const userRegister = this.publisher.mergeObjectContext(
            user
        );

        userRegister.updated(user); // apply event to model events
        userRegister.commit(); // commit all events of model
    }
}