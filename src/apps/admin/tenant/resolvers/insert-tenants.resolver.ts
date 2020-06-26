import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreateTenantInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { InsertTenantsCommand } from '@hades/admin/tenant/application/insert/insert-tenants.command';

@Resolver()
export class InsertTenantsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminInsertTenants')
    async main(@Args('payload') payload: AdminCreateTenantInput[])
    {
        await this.commandBus.dispatch(new InsertTenantsCommand(payload));
        return true;
    }
}