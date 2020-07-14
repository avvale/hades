import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateRoleInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateRoleCommand } from '@hades/bplus-it-sappi/role/application/create/create-role.command';
import { FindRoleByIdQuery } from '@hades/bplus-it-sappi/role/application/find/find-role-by-id.query';

@Resolver()
export class CreateRoleResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateRole')
    async main(@Args('payload') payload: BplusItSappiCreateRoleInput)
    {
        await this.commandBus.dispatch(new CreateRoleCommand(
            payload.id,
            payload.tenantId,
            payload.name,
            
        ));
        
        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id));
    }
}