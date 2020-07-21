import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateContactInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateContactsCommand } from '@hades/bplus-it-sappi/contact/application/create/create-contacts.command';

@Resolver()
export class CreateContactsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateContacts')
    async main(@Args('payload') payload: BplusItSappiCreateContactInput[])
    {
        await this.commandBus.dispatch(new CreateContactsCommand(payload));
        return true;
    }
}