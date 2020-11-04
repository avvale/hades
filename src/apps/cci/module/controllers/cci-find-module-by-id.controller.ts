import { Controller, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';
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
import { FindModuleByIdQuery } from '@hades/cci/module/application/find/find-module-by-id.query';

@ApiTags('[cci] module')
@Controller('cci/module')
@Permissions('cci.module.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciFindModuleByIdController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find module by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ModuleDto })
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindModuleByIdQuery(id, constraint, { timezone }));
    }
}