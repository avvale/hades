import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiUpdateRoleInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateRoleCommand } from '@hades/bplus-it-sappi/role/application/update/update-role.command';
import { FindRoleByIdQuery } from '@hades/bplus-it-sappi/role/application/find/find-role-by-id.query';

@Resolver()
export class UpdateRoleResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiUpdateRole')
    async main(@Args('payload') payload: BplusItSappiUpdateRoleInput)
    {
        await this.commandBus.dispatch(new UpdateRoleCommand(
            payload.id,
            payload.tenantId,
            payload.name,
            
        ));
        
        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id));
    }
}