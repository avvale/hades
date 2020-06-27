import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateExecutionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { CreateExecutionCommand } from '@hades/bplus-it-sappi/execution/application/create/create-execution.command';
import { FindExecutionByIdQuery } from '@hades/bplus-it-sappi/execution/application/find/find-execution-by-id.query';

@Resolver()
export class CreateExecutionResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateExecution')
    async main(@Args('payload') payload: BplusItSappiCreateExecutionInput)
    {
        await this.commandBus.dispatch(new CreateExecutionCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
            payload.type,
            payload.monitoringStartAt,
            payload.monitoringEndAt,
            payload.executedAt,
            
        ));
        
        return await this.queryBus.ask(new FindExecutionByIdQuery(payload.id));
    }
}