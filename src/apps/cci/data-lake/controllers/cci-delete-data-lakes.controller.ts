import { Controller, Delete, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
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
import { GetDataLakesQuery } from '@hades/cci/data-lake/application/get/get-data-lakes.query';
import { DeleteDataLakesCommand } from '@hades/cci/data-lake/application/delete/delete-data-lakes.command';

@ApiTags('[cci] data-lake')
@Controller('cci/data-lakes')
@Permissions('cci.dataLake.delete')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciDeleteDataLakesController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete data-lakes in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [DataLakeDto] })
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
        const dataLakes = await this.queryBus.ask(new GetDataLakesQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteDataLakesCommand(queryStatement, constraint, { timezone }));

        return dataLakes;
    }
}