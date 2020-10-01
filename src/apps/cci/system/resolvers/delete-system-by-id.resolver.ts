import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindSystemByIdQuery } from '@hades/cci/system/application/find/find-system-by-id.query';
import { DeleteSystemByIdCommand } from '@hades/cci/system/application/delete/delete-system-by-id.command';

@Resolver()
export class DeleteSystemByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciDeleteSystemById')
    async main(@Args('id') id: string)
    {
        const system = await this.queryBus.ask(new FindSystemByIdQuery(id));

        await this.commandBus.dispatch(new DeleteSystemByIdCommand(id));

        return system;
    }
}