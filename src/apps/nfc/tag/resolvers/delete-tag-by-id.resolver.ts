import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindTagByIdQuery } from '@hades/nfc/tag/application/find/find-tag-by-id.query';
import { DeleteTagByIdCommand } from '@hades/nfc/tag/application/delete/delete-tag-by-id.command';

@Resolver()
export class DeleteTagByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcDeleteTagById')
    async main(@Args('id') id: string)
    {
        const tag = await this.queryBus.ask(new FindTagByIdQuery(id));

        await this.commandBus.dispatch(new DeleteTagByIdCommand(id));

        return tag;
    }
}