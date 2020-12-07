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
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { UpdateResourceCommand } from '@hades/admin/resource/application/update/update-resource.command';
import { FindResourceByIdQuery } from '@hades/admin/resource/application/find/find-resource-by-id.query';
import { AdminUpdateResourceInput } from './../../../../graphql';

@Resolver()
@Permissions('admin.resource.update')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminUpdateResourceResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminUpdateResource')
    async main(
        @Args('payload') payload: AdminUpdateResourceInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateResourceCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindResourceByIdQuery(payload.id, constraint, { timezone }));
    }
}