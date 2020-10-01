import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciUpdateFlowInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateFlowCommand } from '@hades/cci/flow/application/update/update-flow.command';
import { FindFlowByIdQuery } from '@hades/cci/flow/application/find/find-flow-by-id.query';

@Resolver()
export class UpdateFlowResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciUpdateFlow')
    async main(@Args('payload') payload: CciUpdateFlowInput)
    {
        await this.commandBus.dispatch(new UpdateFlowCommand(
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