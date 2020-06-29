import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindDataLakeByIdQuery } from '@hades/bplus-it-sappi/data-lake/application/find/find-data-lake-by-id.query';
import { DeleteDataLakeByIdCommand } from '@hades/bplus-it-sappi/data-lake/application/delete/delete-data-lake-by-id.command';

@Resolver()
export class DeleteDataLakeByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteDataLakeById')
    async main(@Args('id') id: string)
    {
        const dataLake = await this.queryBus.ask(new FindDataLakeByIdQuery(id));

        await this.commandBus.dispatch(new DeleteDataLakeByIdCommand(id));

        return dataLake;
    }
}