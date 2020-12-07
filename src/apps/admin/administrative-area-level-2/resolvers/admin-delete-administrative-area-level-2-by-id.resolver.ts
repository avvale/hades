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
import { FindAdministrativeAreaLevel2ByIdQuery } from '@hades/admin/administrative-area-level-2/application/find/find-administrative-area-level-2-by-id.query';
import { DeleteAdministrativeAreaLevel2ByIdCommand } from '@hades/admin/administrative-area-level-2/application/delete/delete-administrative-area-level-2-by-id.command';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('admin.administrativeAreaLevel2.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminDeleteAdministrativeAreaLevel2ByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminDeleteAdministrativeAreaLevel2ById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const administrativeAreaLevel2 = await this.queryBus.ask(new FindAdministrativeAreaLevel2ByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreaLevel2ByIdCommand(id, constraint, { timezone }));

        return administrativeAreaLevel2;
    }
}