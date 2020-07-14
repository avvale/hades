import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetTagsQuery } from '@hades/nfc/tag/application/get/get-tags.query';
import { DeleteTagsCommand } from '@hades/nfc/tag/application/delete/delete-tags.command';

@Resolver()
export class DeleteTagsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcDeleteTags')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const tags = await this.queryBus.ask(new GetTagsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteTagsCommand(queryStatements));

        return tags;
    }
}