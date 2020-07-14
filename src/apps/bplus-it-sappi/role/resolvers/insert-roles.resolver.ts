import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateRoleInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { InsertRolesCommand } from '@hades/bplus-it-sappi/role/application/insert/insert-roles.command';

@Resolver()
export class InsertRolesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiInsertRoles')
    async main(@Args('payload') payload: BplusItSappiCreateRoleInput[])
    {
        await this.commandBus.dispatch(new InsertRolesCommand(payload));
        return true;
    }
}