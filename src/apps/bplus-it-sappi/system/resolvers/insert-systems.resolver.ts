import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateSystemInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { InsertSystemsCommand } from '@hades/bplus-it-sappi/system/application/insert/insert-systems.command';

@Resolver()
export class InsertSystemsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiInsertSystems')
    async main(@Args('payload') payload: BplusItSappiCreateSystemInput[])
    {
        await this.commandBus.dispatch(new InsertSystemsCommand(payload));
        return true;
    }
}