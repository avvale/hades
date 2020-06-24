import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreateTenantInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { CreateTenantCommand } from '@hades/admin/tenant/application/create/create-tenant.command';
import { FindTenantByIdQuery } from '@hades/admin/tenant/application/find/find-tenant-by-id.query';

@Resolver()
export class CreateTenantResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminCreateTenant')
    async main(@Args('payload') payload: AdminCreateTenantInput)
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