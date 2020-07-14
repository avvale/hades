import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiUpdateModuleInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateModuleCommand } from '@hades/bplus-it-sappi/module/application/update/update-module.command';
import { FindModuleByIdQuery } from '@hades/bplus-it-sappi/module/application/find/find-module-by-id.query';

@Resolver()
export class UpdateModuleResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiUpdateModule')
    async main(@Args('payload') payload: BplusItSappiUpdateModuleInput)
    {
        await this.commandBus.dispatch(new UpdateModuleCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
            payload.systemName,
            payload.channelId,
            payload.channelParty,
            payload.channelComponent,
            payload.channelName,
            payload.flowParty,
            payload.flowComponent,
            payload.flowInterfaceName,
            payload.flowInterfaceNamespace,
            payload.parameterGroup,
            payload.name,
            payload.parameterName,
            payload.parameterValue,
            
        ));
        
        return await this.queryBus.ask(new FindModuleByIdQuery(payload.id));
    }
}