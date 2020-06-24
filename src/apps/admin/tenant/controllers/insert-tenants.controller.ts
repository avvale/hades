import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { CreateTenantDto } from './../dto/create-tenant.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { InsertTenantsCommand } from '@hades/admin/tenant/application/insert/insert-tenants.command';

@ApiTags('tenant')
@ApiCreatedResponse({ description: 'The records has been created successfully.'})
@Controller('admin/tenants')
export class InsertTenantsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiBody({ 
        type: [CreateTenantDto]
    })
    async main(@Body() payload: CreateTenantDto[])
    {
        await this.commandBus.dispatch(new InsertTenantsCommand(payload));
    }
}