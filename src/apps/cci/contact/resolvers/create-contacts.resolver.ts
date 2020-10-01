import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciCreateContactInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateContactsCommand } from '@hades/cci/contact/application/create/create-contacts.command';

@Resolver()
export class CreateContactsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateContacts')
    async main(@Args('payload') payload: CciCreateContactInput[])
    {
        await this.commandBus.dispatch(new CreateContactsCommand(payload));
        return true;
    }
}