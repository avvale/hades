import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetLangsQuery } from '@hades/admin/lang/application/get/get-langs.query';
import { DeleteLangsCommand } from '@hades/admin/lang/application/delete/delete-langs.command';

@Resolver()
export class DeleteLangsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminDeleteLangs')
    async main(@Args('query') queryStatement?: QueryStatement)
    {
        const langs = await this.queryBus.ask(new GetLangsQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteLangsCommand(queryStatement));

        return langs;
    }
}