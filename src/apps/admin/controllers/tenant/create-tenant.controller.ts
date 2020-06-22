import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateTenantDto } from './../../dto/create-tenant.dto';
import { TenantDto } from './../../dto/tenant.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindTenantByIdQuery } from '@hades/admin/tenant/application/find/find-tenant-by-id.query';
import { CreateTenantCommand } from '@hades/admin/tenant/application/create/create-tenant.command';

@ApiTags('tenant')
@ApiCreatedResponse({ description: 'The record has been successfully created.', type: TenantDto})
@Controller('admin/tenant')
export class CreateTenantController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    async main(@Body() payload: CreateTenantDto)
    {
        await this.commandBus.dispatch(new CreateTenantCommand(
            payload.id,
            payload.name,
            payload.code,
            payload.logo,
            payload.isActive,
            payload.data,
            
        ));

        return await this.queryBus.ask(new FindTenantByIdQuery(payload.id));
    }
}