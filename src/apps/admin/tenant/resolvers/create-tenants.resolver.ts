import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreateTenantInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateTenantsCommand } from '@hades/admin/tenant/application/create/create-tenants.command';

@Resolver()
export class CreateTenantsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminCreateTenants')
    async main(@Args('payload') payload: AdminCreateTenantInput[])
    {
        await this.commandBus.dispatch(new CreateTenantsCommand(payload));
        return true;
    }
}