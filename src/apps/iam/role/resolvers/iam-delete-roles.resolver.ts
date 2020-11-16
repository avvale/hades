import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { DeleteRolesCommand } from '@hades/iam/role/application/delete/delete-roles.command';
import { GetRolesQuery } from '@hades/iam/role/application/get/get-roles.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('iam.role.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamDeleteRolesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamDeleteRoles')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const roles = await this.queryBus.ask(new GetRolesQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteRolesCommand(queryStatement, constraint, { timezone }));

        return roles;
    }
}