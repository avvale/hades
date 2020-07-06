import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetResourcesQuery } from '@hades/admin/resource/application/get/get-resources.query';
import { DeleteResourcesCommand } from '@hades/admin/resource/application/delete/delete-resources.command';

@Resolver()
export class DeleteResourcesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminDeleteResources')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const resources = await this.queryBus.ask(new GetResourcesQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteResourcesCommand(queryStatements));

        return resources;
    }
}