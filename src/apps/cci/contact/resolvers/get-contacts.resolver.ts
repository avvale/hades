import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetContactsQuery } from '@hades/cci/contact/application/get/get-contacts.query';
import { CciContact } from './../../../../graphql';

@Resolver()
export class GetContactsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciGetContacts')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<CciContact[]>
    {
        return await this.queryBus.ask(new GetContactsQuery(queryStatement));
    }
}