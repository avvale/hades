import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateDataLakeDto } from './../dto/create-data-lake.dto';
import { DataLakeDto } from './../dto/data-lake.dto';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from './../../../shared/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from './../../../shared/modules/auth/guards/authorization.guard';

// tenant
import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';
import { TenantPolicy } from './../../../shared/decorators/tenant-policy.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindDataLakeByIdQuery } from '@hades/cci/data-lake/application/find/find-data-lake-by-id.query';
import { CreateDataLakeCommand } from '@hades/cci/data-lake/application/create/create-data-lake.command';

@ApiTags('[cci] data-lake')
@Controller('cci/data-lake')
@Permissions('cci.dataLake.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateDataLakeController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create data-lake' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: DataLakeDto })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateDataLakeDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateDataLakeCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindDataLakeByIdQuery(payload.id));
    }
}