import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamCreateTenantInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateTenantsCommand } from '@hades/iam/tenant/application/create/create-tenants.command';

@Resolver()
export class CreateTenantsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamCreateTenants')
    async main(@Args('payload') payload: IamCreateTenantInput[])
    {
        await this.commandBus.dispatch(new CreateTenantsCommand(payload));
        return true;
    }
}