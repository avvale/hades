import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateModuleInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateModulesCommand } from '@hades/bplus-it-sappi/module/application/create/create-modules.command';

@Resolver()
export class CreateModulesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateModules')
    async main(@Args('payload') payload: BplusItSappiCreateModuleInput[])
    {
        await this.commandBus.dispatch(new CreateModulesCommand(payload));
        return true;
    }
}