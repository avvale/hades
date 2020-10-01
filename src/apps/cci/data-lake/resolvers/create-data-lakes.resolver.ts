import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciCreateDataLakeInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateDataLakesCommand } from '@hades/cci/data-lake/application/create/create-data-lakes.command';

@Resolver()
export class CreateDataLakesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateDataLakes')
    async main(@Args('payload') payload: CciCreateDataLakeInput[])
    {
        await this.commandBus.dispatch(new CreateDataLakesCommand(payload));
        return true;
    }
}