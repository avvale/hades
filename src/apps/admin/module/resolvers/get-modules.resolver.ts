import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetModulesQuery } from '@hades/admin/module/application/get/get-modules.query';
import { AdminModule } from './../../../../graphql';

@Resolver()
export class GetModulesResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminGetModules')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<AdminModule[]>
    {
        return await this.queryBus.ask(new GetModulesQuery(queryStatements));
    }
}