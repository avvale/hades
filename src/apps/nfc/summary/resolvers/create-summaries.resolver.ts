import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { NfcCreateSummaryInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateSummariesCommand } from '@hades/nfc/summary/application/create/create-summaries.command';

@Resolver()
export class CreateSummariesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcCreateSummaries')
    async main(@Args('payload') payload: NfcCreateSummaryInput[])
    {
        await this.commandBus.dispatch(new CreateSummariesCommand(payload));
        return true;
    }
}