import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetContactsQuery } from '@hades/bplus-it-sappi/contact/application/get/get-contacts.query';
import { BplusItSappiContact } from './../../../../graphql';

@Resolver()
export class GetContactsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiGetContacts')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiContact[]>
    {
        return await this.queryBus.ask(new GetContactsQuery(queryStatements));
    }
}