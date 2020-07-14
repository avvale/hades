import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindContactByIdQuery } from '@hades/bplus-it-sappi/contact/application/find/find-contact-by-id.query';
import { DeleteContactByIdCommand } from '@hades/bplus-it-sappi/contact/application/delete/delete-contact-by-id.command';

@Resolver()
export class DeleteContactByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteContactById')
    async main(@Args('id') id: string)
    {
        const contact = await this.queryBus.ask(new FindContactByIdQuery(id));

        await this.commandBus.dispatch(new DeleteContactByIdCommand(id));

        return contact;
    }
}