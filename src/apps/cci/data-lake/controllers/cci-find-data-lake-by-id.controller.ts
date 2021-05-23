import { Controller, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { DataLakeDto } from './../dto/data-lake.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { TenantConstraint } from '@hades/iam/shared/domain/decorators/tenant-constraint.decorator';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindDataLakeByIdQuery } from '@hades/cci/data-lake/application/find/find-data-lake-by-id.query';

@ApiTags('[cci] data-lake')
@Controller('cci/data-lake')
@Permissions('cci.dataLake.get')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciFindDataLakeByIdController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find data-lake by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: DataLakeDto })
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindDataLakeByIdQuery(id, constraint, { timezone }));
    }
}