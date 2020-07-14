import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateDataLakeInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { InsertDataLakesCommand } from '@hades/bplus-it-sappi/data-lake/application/insert/insert-data-lakes.command';

@Resolver()
export class InsertDataLakesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiInsertDataLakes')
    async main(@Args('payload') payload: BplusItSappiCreateDataLakeInput[])
    {
        await this.commandBus.dispatch(new InsertDataLakesCommand(payload));
        return true;
    }
}