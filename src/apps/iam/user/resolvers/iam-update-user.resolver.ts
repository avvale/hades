import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateUserCommand } from '@hades/iam/user/application/update/update-user.command';
import { FindUserByIdQuery } from '@hades/iam/user/application/find/find-user-by-id.query';
import { IamUpdateUserInput } from './../../../../graphql';

@Resolver()
@Permissions('iam.user.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamUpdateUserResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamUpdateUser')
    async main(@Args('payload') payload: IamUpdateUserInput, @Args('constraint') constraint?: QueryStatement)
    {
        await this.commandBus.dispatch(new UpdateUserCommand(
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
            constraint,
        ));

        return await this.queryBus.ask(new FindUserByIdQuery(payload.id, constraint));
    }
}