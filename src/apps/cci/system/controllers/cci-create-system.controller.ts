import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateSystemDto } from './../dto/create-system.dto';
import { SystemDto } from './../dto/system.dto';
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
import { FindSystemByIdQuery } from '@hades/cci/system/application/find/find-system-by-id.query';
import { CreateSystemCommand } from '@hades/cci/system/application/create/create-system.command';

@ApiTags('[cci] system')
@Controller('cci/system')
@Permissions('cci.system.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateSystemController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create system' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: SystemDto })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateSystemDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateSystemCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindSystemByIdQuery(payload.id));
    }
}