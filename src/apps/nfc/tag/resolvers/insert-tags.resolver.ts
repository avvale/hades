import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { NfcCreateTagInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { InsertTagsCommand } from '@hades/nfc/tag/application/insert/insert-tags.command';

@Resolver()
export class InsertTagsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcInsertTags')
    async main(@Args('payload') payload: NfcCreateTagInput[])
    {
        await this.commandBus.dispatch(new InsertTagsCommand(payload));
        return true;
    }
}