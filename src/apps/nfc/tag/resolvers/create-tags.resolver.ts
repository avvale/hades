import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { NfcCreateTagInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateTagsCommand } from '@hades/nfc/tag/application/create/create-tags.command';

@Resolver()
export class CreateTagsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcCreateTags')
    async main(@Args('payload') payload: NfcCreateTagInput[])
    {
        await this.commandBus.dispatch(new CreateTagsCommand(payload));
        return true;
    }
}