import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindActionByIdQuery } from '@hades/nfc/action/application/find/find-action-by-id.query';
import { DeleteActionByIdCommand } from '@hades/nfc/action/application/delete/delete-action-by-id.command';

@Resolver()
export class DeleteActionByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcDeleteActionById')
    async main(@Args('id') id: string)
    {
        const action = await this.queryBus.ask(new FindActionByIdQuery(id));

        await this.commandBus.dispatch(new DeleteActionByIdCommand(id));

        return action;
    }
}