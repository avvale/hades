import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindPermissionByIdQuery } from '@hades/admin/permission/application/find/find-permission-by-id.query';
import { DeletePermissionByIdCommand } from '@hades/admin/permission/application/delete/delete-permission-by-id.command';

@Resolver()
export class DeletePermissionByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminDeletePermissionById')
    async main(@Args('id') id: string)
    {
        const permission = await this.queryBus.ask(new FindPermissionByIdQuery(id));

        await this.commandBus.dispatch(new DeletePermissionByIdCommand(id));

        return permission;
    }
}