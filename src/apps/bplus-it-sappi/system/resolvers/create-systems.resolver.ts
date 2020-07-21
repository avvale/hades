import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateSystemInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateSystemsCommand } from '@hades/bplus-it-sappi/system/application/create/create-systems.command';

@Resolver()
export class CreateSystemsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateSystems')
    async main(@Args('payload') payload: BplusItSappiCreateSystemInput[])
    {
        await this.commandBus.dispatch(new CreateSystemsCommand(payload));
        return true;
    }
}