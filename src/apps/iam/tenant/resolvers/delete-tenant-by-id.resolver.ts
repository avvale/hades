import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindTenantByIdQuery } from '@hades/iam/tenant/application/find/find-tenant-by-id.query';
import { DeleteTenantByIdCommand } from '@hades/iam/tenant/application/delete/delete-tenant-by-id.command';

@Resolver()
export class DeleteTenantByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('iamDeleteTenantById')
    async main(@Args('id') id: string)
    {
        const tenant = await this.queryBus.ask(new FindTenantByIdQuery(id));

        await this.commandBus.dispatch(new DeleteTenantByIdCommand(id));

        return tenant;
    }
}