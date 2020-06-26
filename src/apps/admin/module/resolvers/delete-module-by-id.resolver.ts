import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindModuleByIdQuery } from '@hades/admin/module/application/find/find-module-by-id.query';
import { DeleteModuleByIdCommand } from '@hades/admin/module/application/delete/delete-module-by-id.command';

@Resolver()
export class DeleteModuleByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminDeleteModuleById')
    async main(@Args('id') id: string)
    {
        const module = await this.queryBus.ask(new FindModuleByIdQuery(id));

        await this.commandBus.dispatch(new DeleteModuleByIdCommand(id));

        return module;
    }
}