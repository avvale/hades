import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciUpdateModuleInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateModuleCommand } from '@hades/cci/module/application/update/update-module.command';
import { FindModuleByIdQuery } from '@hades/cci/module/application/find/find-module-by-id.query';

@Resolver()
export class UpdateModuleResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciUpdateModule')
    async main(@Args('payload') payload: CciUpdateModuleInput)
    {
        await this.commandBus.dispatch(new UpdateModuleCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.channelHash,
            payload.channelParty,
            payload.channelComponent,
            payload.channelName,
            payload.flowHash,
            payload.flowParty,
            payload.flowReceiverParty,
            payload.flowComponent,
            payload.flowReceiverComponent,
            payload.flowInterfaceName,
            payload.flowInterfaceNamespace,
            payload.version,
            payload.parameterGroup,
            payload.name,
            payload.parameterName,
            payload.parameterValue,
            
        ));
        
        return await this.queryBus.ask(new FindModuleByIdQuery(payload.id));
    }
}