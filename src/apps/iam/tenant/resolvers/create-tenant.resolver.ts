import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamCreateTenantInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateTenantCommand } from '@hades/iam/tenant/application/create/create-tenant.command';
import { FindTenantByIdQuery } from '@hades/iam/tenant/application/find/find-tenant-by-id.query';

@Resolver()
export class CreateTenantResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamCreateTenant')
    async main(@Args('payload') payload: IamCreateTenantInput)
    {
        await this.commandBus.dispatch(new CreateTenantCommand(
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