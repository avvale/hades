import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ModuleDto } from './../dto/module.dto';
import { CreateModuleDto } from './../dto/create-module.dto';

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
import { CreateModulesCommand } from '@hades/cci/module/application/create/create-modules.command';

@ApiTags('[cci] module')
@Controller('cci/modules')
@Permissions('cci.module.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class CreateModulesController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create modules in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [ModuleDto] })
    @ApiBody({ type: [CreateModuleDto] })
    @TenantPolicy()
    async main(@CurrentAccount() account: AccountResponse, @Body() payload: CreateModuleDto[], )
    {
        await this.commandBus.dispatch(new CreateModulesCommand(payload));
    }
}