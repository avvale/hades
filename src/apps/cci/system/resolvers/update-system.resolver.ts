import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciUpdateSystemInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateSystemCommand } from '@hades/cci/system/application/update/update-system.command';
import { FindSystemByIdQuery } from '@hades/cci/system/application/find/find-system-by-id.query';

@Resolver()
export class UpdateSystemResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciUpdateSystem')
    async main(@Args('payload') payload: CciUpdateSystemInput)
    {
        await this.commandBus.dispatch(new UpdateSystemCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.version,
            payload.name,
            payload.environment,
            payload.technology,
            payload.isActive,
            payload.cancelledAt,
            
        ));
        
        return await this.queryBus.ask(new FindSystemByIdQuery(payload.id));
    }
}