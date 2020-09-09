import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetApplicationsQuery } from '@hades/o-auth/application/application/get/get-applications.query';
import { DeleteApplicationsCommand } from '@hades/o-auth/application/application/delete/delete-applications.command';

@Resolver()
export class DeleteApplicationsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthDeleteApplications')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const applications = await this.queryBus.ask(new GetApplicationsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteApplicationsCommand(queryStatements));

        return applications;
    }
}