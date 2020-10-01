import { Controller, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateTenantDto } from './../dto/update-tenant.dto';
import { TenantDto } from './../dto/tenant.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateTenantCommand } from '@hades/iam/tenant/application/update/update-tenant.command';
import { FindTenantByIdQuery } from '@hades/iam/tenant/application/find/find-tenant-by-id.query';

@ApiTags('[iam] tenant')
@Controller('iam/tenant')
export class UpdateTenantController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update tenant' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: TenantDto})
    async main(@Body() payload: UpdateTenantDto)
    {
        await this.commandBus.dispatch(new UpdateTenantCommand(
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