import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { TenantDto } from './../../dto/tenant.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetTenantsQuery } from '@hades/admin/tenant/application/get/get-tenants.query';
import { DeleteTenantsCommand } from '@hades/admin/tenant/application/delete/delete-tenants.command';

@ApiTags('tenant')
@ApiOkResponse({ description: 'The records has been deleted successfully.', type: TenantDto})
@Controller('admin/tenants')
export class DeleteTenantsController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    async main(@Body('query') queryStatements: QueryStatementInput[])
    {
        const tenants = await this.queryBus.ask(new GetTenantsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteTenantsCommand(queryStatements));

        return tenants;
    }
}