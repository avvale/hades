import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateSystemInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { CreateSystemCommand } from '@hades/bplus-it-sappi/system/application/create/create-system.command';
import { FindSystemByIdQuery } from '@hades/bplus-it-sappi/system/application/find/find-system-by-id.query';

@Resolver()
export class CreateSystemResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateSystem')
    async main(@Args('payload') payload: BplusItSappiCreateSystemInput)
    {
        await this.commandBus.dispatch(new CreateSystemCommand(
            payload.id,
            payload.tenantId,
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