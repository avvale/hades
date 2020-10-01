import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetContactsQuery } from '@hades/cci/contact/application/get/get-contacts.query';
import { DeleteContactsCommand } from '@hades/cci/contact/application/delete/delete-contacts.command';

@Resolver()
export class DeleteContactsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteContacts')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const contacts = await this.queryBus.ask(new GetContactsQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteContactsCommand(queryStatement));

        return contacts;
    }
}