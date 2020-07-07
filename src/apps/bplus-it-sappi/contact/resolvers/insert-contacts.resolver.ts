import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateContactInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { InsertContactsCommand } from '@hades/bplus-it-sappi/contact/application/insert/insert-contacts.command';

@Resolver()
export class InsertContactsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiInsertContacts')
    async main(@Args('payload') payload: BplusItSappiCreateContactInput[])
    {
        await this.commandBus.dispatch(new InsertContactsCommand(payload));
        return true;
    }
}