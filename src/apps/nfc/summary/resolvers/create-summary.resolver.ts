import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { NfcCreateSummaryInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { CreateSummaryCommand } from '@hades/nfc/summary/application/create/create-summary.command';
import { FindSummaryByIdQuery } from '@hades/nfc/summary/application/find/find-summary-by-id.query';

@Resolver()
export class CreateSummaryResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcCreateSummary')
    async main(@Args('payload') payload: NfcCreateSummaryInput)
    {
        await this.commandBus.dispatch(new CreateSummaryCommand(
            payload.id,
            payload.tagId,
            payload.tenantId,
            payload.accessAt,
            payload.counter,
            
        ));
        
        return await this.queryBus.ask(new FindSummaryByIdQuery(payload.id));
    }
}