import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindActionQuery } from '@hades/nfc/action/application/find/find-action.query';
import { NfcAction } from './../../../../graphql';

@Resolver()
export class FindActionResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('nfcFindAction')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<NfcAction>
    {
        return await this.queryBus.ask(new FindActionQuery(queryStatements));
    }
}