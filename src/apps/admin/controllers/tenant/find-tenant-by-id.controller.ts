import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { TenantDto } from './../../dto/tenant.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindTenantByIdQuery } from '@hades/admin/tenant/application/find/find-tenant-by-id.query';

@ApiTags('tenant')
@ApiOkResponse({ description: 'The record has been successfully created.', type: TenantDto})
@Controller('admin/tenant')
export class FindTenantByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindTenantByIdQuery(id));
    }
}