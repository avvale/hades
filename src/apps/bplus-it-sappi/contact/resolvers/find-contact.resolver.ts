import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindContactQuery } from '@hades/bplus-it-sappi/contact/application/find/find-contact.query';
import { BplusItSappiContact } from './../../../../graphql';

@Resolver()
export class FindContactResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindContact')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiContact>
    {
        return await this.queryBus.ask(new FindContactQuery(queryStatements));
    }
}