import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateFlowInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateFlowCommand } from '@hades/bplus-it-sappi/flow/application/create/create-flow.command';
import { FindFlowByIdQuery } from '@hades/bplus-it-sappi/flow/application/find/find-flow-by-id.query';

@Resolver()
export class CreateFlowResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateFlow')
    async main(@Args('payload') payload: BplusItSappiCreateFlowInput)
    {
        await this.commandBus.dispatch(new CreateFlowCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.version,
            payload.systemId,
            payload.systemName,
            payload.scenario,
            payload.party,
            payload.component,
            payload.interfaceName,
            payload.interfaceNamespace,
            payload.iflowName,
            payload.responsibleUserAccount,
            payload.lastChangeUserAccount,
            payload.lastChangedAt,
            payload.folderPath,
            payload.description,
            payload.application,
            payload.isCritical,
            payload.isComplex,
            payload.fieldGroupId,
            payload.data,
            
        ));
        
        return await this.queryBus.ask(new FindFlowByIdQuery(payload.id));
    }
}