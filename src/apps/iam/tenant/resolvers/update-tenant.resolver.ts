import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { IamUpdateTenantInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateTenantCommand } from '@hades/iam/tenant/application/update/update-tenant.command';
import { FindTenantByIdQuery } from '@hades/iam/tenant/application/find/find-tenant-by-id.query';

@Resolver()
export class UpdateTenantResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamUpdateTenant')
    async main(@Args('payload') payload: IamUpdateTenantInput)
    {
        await this.commandBus.dispatch(new UpdateTenantCommand(
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