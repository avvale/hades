import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateDataLakeInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateDataLakeCommand } from '@hades/bplus-it-sappi/data-lake/application/create/create-data-lake.command';
import { FindDataLakeByIdQuery } from '@hades/bplus-it-sappi/data-lake/application/find/find-data-lake-by-id.query';

@Resolver()
export class CreateDataLakeResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateDataLake')
    async main(@Args('payload') payload: BplusItSappiCreateDataLakeInput)
    {
        await this.commandBus.dispatch(new CreateDataLakeCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.data,
            
        ));
        
        return await this.queryBus.ask(new FindDataLakeByIdQuery(payload.id));
    }
}