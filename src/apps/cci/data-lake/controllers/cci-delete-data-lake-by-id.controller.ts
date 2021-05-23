import { Controller, Param, Delete, Body, UseGuards } from '@nestjs/common';
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
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindDataLakeByIdQuery } from '@hades/cci/data-lake/application/find/find-data-lake-by-id.query';
import { DeleteDataLakeByIdCommand } from '@hades/cci/data-lake/application/delete/delete-data-lake-by-id.command';

@ApiTags('[cci] data-lake')
@Controller('cci/data-lake')
@Permissions('cci.dataLake.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciDeleteDataLakeByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete data-lake by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: DataLakeDto })
    @TenantConstraint()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const dataLake = await this.queryBus.ask(new FindDataLakeByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteDataLakeByIdCommand(id, constraint, { timezone }));

        return dataLake;
    }
}