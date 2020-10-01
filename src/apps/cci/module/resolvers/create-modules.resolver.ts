import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciCreateModuleInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateModulesCommand } from '@hades/cci/module/application/create/create-modules.command';

@Resolver()
export class CreateModulesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateModules')
    async main(@Args('payload') payload: CciCreateModuleInput[])
    {
        await this.commandBus.dispatch(new CreateModulesCommand(payload));
        return true;
    }
}