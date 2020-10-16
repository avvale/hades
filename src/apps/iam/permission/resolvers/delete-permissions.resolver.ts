import { Resolver, Args, Mutation } from '@nestjs/graphql';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { DeletePermissionsCommand } from '@hades/iam/permission/application/delete/delete-permissions.command';
import { GetPermissionsQuery } from '@hades/iam/permission/application/get/get-permissions.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('iam.permission.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class DeletePermissionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamDeletePermissions')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement, )
    {
        const permissions = await this.queryBus.ask(new GetPermissionsQuery(queryStatement, constraint));

        await this.commandBus.dispatch(new DeletePermissionsCommand(queryStatement, constraint));

        return permissions;
    }
}