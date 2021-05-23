import { Injectable} from '@nestjs/common';
import { MockSeeder } from '@hades/shared/infrastructure/persistence/mock/mock.seeder';
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
import { IamUser } from './../../domain/user.aggregate';
import { users } from './../seeds/user.seed';

@Injectable()
export class MockUserSeeder extends MockSeeder<IamUser>
{
    public collectionSource: IamUser[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (let user of users)
        {
            this.collectionSource.push(
                IamUser.register(
                    new UserId(user.id),
                    new UserAccountId(user.accountId),
                    new UserName(user.name),
                    new UserSurname(user.surname),
                    new UserAvatar(user.avatar),
                    new UserMobile(user.mobile),
                    new UserLangId(user.langId),
                    new UserUsername(user.username),
                    new UserPassword(user.password),
                    new UserRememberToken(user.rememberToken),
                    new UserData(user.data),
                    new UserCreatedAt({currentTimestamp: true}),
                    new UserUpdatedAt({currentTimestamp: true}),
                    new UserDeletedAt(null),
                )
            );
        }
    }
}