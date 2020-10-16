import { Resolver, Args, Query } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindRoleQuery } from '@hades/iam/role/application/find/find-role.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IamRole } from './../../../../graphql';

@Resolver()
@Permissions('iam.role.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class FindRoleResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindRole')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement, ): Promise<IamRole>
    {
        return await this.queryBus.ask(new FindRoleQuery(queryStatement, constraint));
    }
}