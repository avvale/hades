import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateTenantDto } from './../dto/create-tenant.dto';
import { TenantDto } from './../dto/tenant.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindTenantByIdQuery } from '@hades/iam/tenant/application/find/find-tenant-by-id.query';
import { CreateTenantCommand } from '@hades/iam/tenant/application/create/create-tenant.command';

@ApiTags('[iam] tenant')
@Controller('iam/tenant')
export class CreateTenantController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create tenant' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: TenantDto })
    async main(@Body() payload: CreateTenantDto)
    {
        await this.commandBus.dispatch(new CreateTenantCommand(
            payload.id,
            payload.name,
            payload.code,
            payload.logo,
            payload.isActive,
            payload.data,
            payload.accountIds,
            
        ));

        return await this.queryBus.ask(new FindTenantByIdQuery(payload.id));
    }
}