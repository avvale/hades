import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindDataLakeByIdQuery } from '@hades/cci/data-lake/application/find/find-data-lake-by-id.query';
import { DeleteDataLakeByIdCommand } from '@hades/cci/data-lake/application/delete/delete-data-lake-by-id.command';

@Resolver()
export class DeleteDataLakeByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteDataLakeById')
    async main(@Args('id') id: string)
    {
        const dataLake = await this.queryBus.ask(new FindDataLakeByIdQuery(id));

        await this.commandBus.dispatch(new DeleteDataLakeByIdCommand(id));

        return dataLake;
    }
}