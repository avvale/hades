import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciUpdateDataLakeInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateDataLakeCommand } from '@hades/cci/data-lake/application/update/update-data-lake.command';
import { FindDataLakeByIdQuery } from '@hades/cci/data-lake/application/find/find-data-lake-by-id.query';

@Resolver()
export class UpdateDataLakeResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciUpdateDataLake')
    async main(@Args('payload') payload: CciUpdateDataLakeInput)
    {
        await this.commandBus.dispatch(new UpdateDataLakeCommand(
            payload.id,
            payload.tenantId,
            payload.executionId,
            payload.tenantCode,
            payload.payload,
            
        ));
        
        return await this.queryBus.ask(new FindDataLakeByIdQuery(payload.id));
    }
}