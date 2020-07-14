import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { NfcCreateSummaryInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { InsertSummariesCommand } from '@hades/nfc/summary/application/insert/insert-summaries.command';

@Resolver()
export class InsertSummariesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcInsertSummaries')
    async main(@Args('payload') payload: NfcCreateSummaryInput[])
    {
        await this.commandBus.dispatch(new InsertSummariesCommand(payload));
        return true;
    }
}