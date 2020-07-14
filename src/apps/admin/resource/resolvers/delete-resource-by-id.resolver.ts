import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindResourceByIdQuery } from '@hades/admin/resource/application/find/find-resource-by-id.query';
import { DeleteResourceByIdCommand } from '@hades/admin/resource/application/delete/delete-resource-by-id.command';

@Resolver()
export class DeleteResourceByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminDeleteResourceById')
    async main(@Args('id') id: string)
    {
        const resource = await this.queryBus.ask(new FindResourceByIdQuery(id));

        await this.commandBus.dispatch(new DeleteResourceByIdCommand(id));

        return resource;
    }
}