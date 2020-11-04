import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { DataLakeDto } from './../dto/data-lake.dto';
import { CreateDataLakeDto } from './../dto/create-data-lake.dto';
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
import { CreateDataLakesCommand } from '@hades/cci/data-lake/application/create/create-data-lakes.command';

@ApiTags('[cci] data-lake')
@Controller('cci/data-lakes')
@Permissions('cci.dataLake.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateDataLakesController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create data-lakes in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [DataLakeDto] })
    @ApiBody({ type: [CreateDataLakeDto] })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateDataLakeDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateDataLakesCommand(payload, { timezone }));
    }
}