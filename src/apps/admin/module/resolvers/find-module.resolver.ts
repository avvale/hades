import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindModuleQuery } from '@hades/admin/module/application/find/find-module.query';
import { AdminModule } from './../../../../graphql';

@Resolver()
export class FindModuleResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindModule')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<AdminModule>
    {
        return await this.queryBus.ask(new FindModuleQuery(queryStatements));
    }
}