import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { TenantDto } from './../dto/tenant.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindTenantByIdQuery } from '@hades/admin/tenant/application/find/find-tenant-by-id.query';
import { DeleteTenantByIdCommand } from '@hades/admin/tenant/application/delete/delete-tenant-by-id.command';

@ApiTags('tenant')
@ApiOkResponse({ description: 'The record has been deleted successfully.', type: TenantDto})
@Controller('admin/tenant')
export class DeleteTenantByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    async main(@Param('id') id: string)
    {
        const tenant = await this.queryBus.ask(new FindTenantByIdQuery(id));

        await this.commandBus.dispatch(new DeleteTenantByIdCommand(id));

        return tenant;
    }
}