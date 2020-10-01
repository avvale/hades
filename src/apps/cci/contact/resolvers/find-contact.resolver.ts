import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindContactQuery } from '@hades/cci/contact/application/find/find-contact.query';
import { CciContact } from './../../../../graphql';

@Resolver()
export class FindContactResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindContact')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciContact>
    {
        return await this.queryBus.ask(new FindContactQuery(queryStatement));
    }
}