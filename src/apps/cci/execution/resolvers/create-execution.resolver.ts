import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciCreateExecutionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateExecutionCommand } from '@hades/cci/execution/application/create/create-execution.command';
import { FindExecutionByIdQuery } from '@hades/cci/execution/application/find/find-execution-by-id.query';

@Resolver()
export class CreateExecutionResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateExecution')
    async main(@Args('payload') payload: CciCreateExecutionInput)
    {
        await this.commandBus.dispatch(new CreateExecutionCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.version,
            payload.type,
            payload.executedAt,
            payload.monitoringStartAt,
            payload.monitoringEndAt,
            
        ));
        
        return await this.queryBus.ask(new FindExecutionByIdQuery(payload.id));
    }
}