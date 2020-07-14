import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminUpdateTenantInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateTenantCommand } from '@hades/admin/tenant/application/update/update-tenant.command';
import { FindTenantByIdQuery } from '@hades/admin/tenant/application/find/find-tenant-by-id.query';

@Resolver()
export class UpdateTenantResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminUpdateTenant')
    async main(@Args('payload') payload: AdminUpdateTenantInput)
    {
        await this.commandBus.dispatch(new UpdateTenantCommand(
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