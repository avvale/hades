import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { RoleDto } from './../dto/role.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantConstraint } from './../../../shared/decorators/tenant-constraint.decorator';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetRolesQuery } from '@hades/cci/role/application/get/get-roles.query';

@ApiTags('[cci] role')
@Controller('cci/roles')
@Permissions('cci.role.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciGetRolesController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find roles according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [RoleDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new GetRolesQuery(queryStatement, constraint, { timezone }));
    }
}