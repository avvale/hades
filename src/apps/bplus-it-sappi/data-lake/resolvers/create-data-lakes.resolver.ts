import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateDataLakeInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateDataLakesCommand } from '@hades/bplus-it-sappi/data-lake/application/create/create-data-lakes.command';

@Resolver()
export class CreateDataLakesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateDataLakes')
    async main(@Args('payload') payload: BplusItSappiCreateDataLakeInput[])
    {
        await this.commandBus.dispatch(new CreateDataLakesCommand(payload));
        return true;
    }
}