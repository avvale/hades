import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { TenantDto } from './../dto/tenant.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetTenantsQuery } from '@hades/iam/tenant/application/get/get-tenants.query';
import { DeleteTenantsCommand } from '@hades/iam/tenant/application/delete/delete-tenants.command';

@ApiTags('[iam] tenant')
@Controller('iam/tenants')
@Permissions('iam.tenant.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamDeleteTenantsController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete tenants in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [TenantDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const tenants = await this.queryBus.ask(new GetTenantsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteTenantsCommand(queryStatement, constraint, { timezone }));

        return tenants;
    }
}