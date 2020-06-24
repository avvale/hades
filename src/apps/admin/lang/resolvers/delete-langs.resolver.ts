import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { GetLangsQuery } from '@hades/admin/lang/application/get/get-langs.query';
import { DeleteLangsCommand } from '@hades/admin/lang/application/delete/delete-langs.command';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

@Resolver()
export class DeleteLangsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminDeleteLangs')
    async main(@Args('query') queryStatements: QueryStatementInput[])
    {
        const langs = await this.queryBus.ask(new GetLangsQuery(queryStatements));

        await this.commandBus.dispatch(new DeleteLangsCommand(queryStatements));

        return langs;
    }
}