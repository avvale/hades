import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { TenantDto } from './../dto/tenant.dto';
import { CreateTenantDto } from './../dto/create-tenant.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { CreateTenantsCommand } from '@hades/admin/tenant/application/create/create-tenants.command';

@ApiTags('[admin] tenant')
@Controller('admin/tenants')
export class CreateTenantsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create tenants in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [TenantDto] })
    @ApiBody({ type: [CreateTenantDto] })
    async main(@Body() payload: CreateTenantDto[])
    {
        await this.commandBus.dispatch(new CreateTenantsCommand(payload));
    }
}