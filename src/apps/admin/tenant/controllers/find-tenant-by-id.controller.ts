import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { TenantDto } from './../dto/tenant.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindTenantByIdQuery } from '@hades/admin/tenant/application/find/find-tenant-by-id.query';

@ApiTags('[admin] tenant')
@ApiOkResponse({ description: 'The record has been successfully created.', type: TenantDto})
@Controller('admin/tenant')
export class FindTenantByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find tenant by id' })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindTenantByIdQuery(id));
    }
}