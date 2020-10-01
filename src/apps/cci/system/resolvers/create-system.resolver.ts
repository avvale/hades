import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciCreateSystemInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateSystemCommand } from '@hades/cci/system/application/create/create-system.command';
import { FindSystemByIdQuery } from '@hades/cci/system/application/find/find-system-by-id.query';

@Resolver()
export class CreateSystemResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateSystem')
    async main(@Args('payload') payload: CciCreateSystemInput)
    {
        await this.commandBus.dispatch(new CreateSystemCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.version,
            payload.name,
            payload.environment,
            payload.isActive,
            payload.cancelledAt,
            
        ));
        
        return await this.queryBus.ask(new FindSystemByIdQuery(payload.id));
    }
}