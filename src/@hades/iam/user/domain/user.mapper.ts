import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { IamUser } from './user.aggregate';
import { UserResponse } from './user.response';
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
    
} from './value-objects';
import { AccountMapper } from '@hades/iam/account/domain/account.mapper';




export class UserMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true }
    ) {}

    /**
     * Map object to aggregate
     * @param user
     */
    mapModelToAggregate(user: ObjectLiteral): IamUser
    {
        if (!user) return;

        return this.makeAggregate(user);
    }

    /**
     * Map array of objects to array aggregates
     * @param users 
     */
    mapModelsToAggregates(users: ObjectLiteral[]): IamUser[]
    {
        if (!Array.isArray(users)) return;

        return users.map(user  => this.makeAggregate(user));
    }

    /**
     * Map aggregate to response
     * @param user
     */
    mapAggregateToResponse(user: IamUser): UserResponse
    {
        return this.makeResponse(user);
    }

    /**
     * Map array of aggregates to array responses
     * @param users
     */
    mapAggregatesToResponses(users: IamUser[]): UserResponse[]
    {
        if (!Array.isArray(users)) return;

        return users.map(user => this.makeResponse(user));
    }

    private makeAggregate(user: ObjectLiteral): IamUser
    {
        return IamUser.register(
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
            new UserCreatedAt(user.createdAt),
            new UserUpdatedAt(user.updatedAt),
            new UserDeletedAt(user.deletedAt),
            
            this.options.eagerLoading ? new AccountMapper({ eagerLoading: false }).mapModelToAggregate(user.account) : undefined,
            
            
            
            
            
        );
    }

    private makeResponse(user: IamUser): UserResponse
    {
        if (!user) return;

        return new UserResponse(
            user.id.value,
            user.accountId.value,
            user.name.value,
            user.surname.value,
            user.avatar.value,
            user.mobile.value,
            user.langId.value,
            user.username.value,
            user.password.value,
            user.rememberToken.value,
            user.data.value,
            user.createdAt.value,
            user.updatedAt.value,
            user.deletedAt.value,
            
            this.options.eagerLoading ? new AccountMapper({ eagerLoading: false }).mapAggregateToResponse(user.account) : undefined,
            
            
            
            
            
        );
    }
}