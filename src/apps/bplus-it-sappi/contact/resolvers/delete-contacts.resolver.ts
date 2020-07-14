import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetContactsQuery } from '@hades/bplus-it-sappi/contact/application/get/get-contacts.query';
import { DeleteContactsCommand } from '@hades/bplus-it-sappi/contact/application/delete/delete-contacts.command';

@Resolver()
export class DeleteContactsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteContacts')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const contacts = await this.queryBus.ask(new GetContactsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteContactsCommand(queryStatements));

        return contacts;
    }
}