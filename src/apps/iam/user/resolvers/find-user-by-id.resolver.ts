import { Resolver, Args, Query } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindUserByIdQuery } from '@hades/iam/user/application/find/find-user-by-id.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IamUser } from './../../../../graphql';

@Resolver()
@Permissions('iam.user.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class FindUserByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindUserById')
    async main(@Args('id') id: string, @Args('constraint') constraint?: QueryStatement, ): Promise<IamUser>
    {
        return await this.queryBus.ask(new FindUserByIdQuery(id, constraint));
    }
}