import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindMessageDetailByIdQuery } from '@hades/cci/message-detail/application/find/find-message-detail-by-id.query';
import { DeleteMessageDetailByIdCommand } from '@hades/cci/message-detail/application/delete/delete-message-detail-by-id.command';

@Resolver()
export class DeleteMessageDetailByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteMessageDetailById')
    async main(@Args('id') id: string)
    {
        const messageDetail = await this.queryBus.ask(new FindMessageDetailByIdQuery(id));

        await this.commandBus.dispatch(new DeleteMessageDetailByIdCommand(id));

        return messageDetail;
    }
}