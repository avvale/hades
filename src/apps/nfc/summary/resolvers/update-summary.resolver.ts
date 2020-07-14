import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { NfcUpdateSummaryInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateSummaryCommand } from '@hades/nfc/summary/application/update/update-summary.command';
import { FindSummaryByIdQuery } from '@hades/nfc/summary/application/find/find-summary-by-id.query';

@Resolver()
export class UpdateSummaryResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcUpdateSummary')
    async main(@Args('payload') payload: NfcUpdateSummaryInput)
    {
        await this.commandBus.dispatch(new UpdateSummaryCommand(
            payload.id,
            payload.tagId,
            payload.tenantId,
            payload.accessAt,
            payload.counter,
            
        ));
        
        return await this.queryBus.ask(new FindSummaryByIdQuery(payload.id));
    }
}