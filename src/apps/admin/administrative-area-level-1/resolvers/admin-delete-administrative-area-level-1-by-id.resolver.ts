import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindAdministrativeAreaLevel1ByIdQuery } from '@hades/admin/administrative-area-level-1/application/find/find-administrative-area-level-1-by-id.query';
import { DeleteAdministrativeAreaLevel1ByIdCommand } from '@hades/admin/administrative-area-level-1/application/delete/delete-administrative-area-level-1-by-id.command';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('admin.administrativeAreaLevel1.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminDeleteAdministrativeAreaLevel1ByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminDeleteAdministrativeAreaLevel1ById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const administrativeAreaLevel1 = await this.queryBus.ask(new FindAdministrativeAreaLevel1ByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreaLevel1ByIdCommand(id, constraint, { timezone }));

        return administrativeAreaLevel1;
    }
}