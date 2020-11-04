import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateModuleDto } from './../dto/create-module.dto';
import { ModuleDto } from './../dto/module.dto';
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
import { FindModuleByIdQuery } from '@hades/cci/module/application/find/find-module-by-id.query';
import { CreateModuleCommand } from '@hades/cci/module/application/create/create-module.command';

@ApiTags('[cci] module')
@Controller('cci/module')
@Permissions('cci.module.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CciCreateModuleController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create module' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: ModuleDto })
    @TenantPolicy()
    async main(
        @CurrentAccount() account: AccountResponse,
        @Body() payload: CreateModuleDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateModuleCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindModuleByIdQuery(payload.id));
    }
}