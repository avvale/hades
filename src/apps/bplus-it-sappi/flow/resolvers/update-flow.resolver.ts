import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiUpdateFlowInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateFlowCommand } from '@hades/bplus-it-sappi/flow/application/update/update-flow.command';
import { FindFlowByIdQuery } from '@hades/bplus-it-sappi/flow/application/find/find-flow-by-id.query';

@Resolver()
export class UpdateFlowResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiUpdateFlow')
    async main(@Args('payload') payload: BplusItSappiUpdateFlowInput)
    {
        await this.commandBus.dispatch(new UpdateFlowCommand(
            payload.id,
            payload.tenantId,
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
            payload.contactsIdId,
            
        ));
        
        return await this.queryBus.ask(new FindFlowByIdQuery(payload.id));
    }
}