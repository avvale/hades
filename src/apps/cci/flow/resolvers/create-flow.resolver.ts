import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciCreateFlowInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateFlowCommand } from '@hades/cci/flow/application/create/create-flow.command';
import { FindFlowByIdQuery } from '@hades/cci/flow/application/find/find-flow-by-id.query';

@Resolver()
export class CreateFlowResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateFlow')
    async main(@Args('payload') payload: CciCreateFlowInput)
    {
        await this.commandBus.dispatch(new CreateFlowCommand(
            payload.id,
            payload.hash,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.version,
            payload.scenario,
            payload.party,
            payload.receiverParty,
            payload.component,
            payload.receiverComponent,
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