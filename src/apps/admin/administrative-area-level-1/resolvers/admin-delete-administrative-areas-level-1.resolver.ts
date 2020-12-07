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
import { DeleteAdministrativeAreasLevel1Command } from '@hades/admin/administrative-area-level-1/application/delete/delete-administrative-areas-level-1.command';
import { GetAdministrativeAreasLevel1Query } from '@hades/admin/administrative-area-level-1/application/get/get-administrative-areas-level-1.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

@Resolver()
@Permissions('admin.administrativeAreaLevel1.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class AdminDeleteAdministrativeAreasLevel1Resolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('adminDeleteAdministrativeAreasLevel1')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const administrativeAreasLevel1 = await this.queryBus.ask(new GetAdministrativeAreasLevel1Query(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAdministrativeAreasLevel1Command(queryStatement, constraint, { timezone }));

        return administrativeAreasLevel1;
    }
}