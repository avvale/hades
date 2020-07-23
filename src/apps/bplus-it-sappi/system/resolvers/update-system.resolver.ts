import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiUpdateSystemInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateSystemCommand } from '@hades/bplus-it-sappi/system/application/update/update-system.command';
import { FindSystemByIdQuery } from '@hades/bplus-it-sappi/system/application/find/find-system-by-id.query';

@Resolver()
export class UpdateSystemResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiUpdateSystem')
    async main(@Args('payload') payload: BplusItSappiUpdateSystemInput)
    {
        await this.commandBus.dispatch(new UpdateSystemCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.name,
            payload.tenantCode,
            payload.environment,
            payload.version,
            payload.isActive,
            payload.cancelledAt,
            
        ));
        
        return await this.queryBus.ask(new FindSystemByIdQuery(payload.id));
    }
}