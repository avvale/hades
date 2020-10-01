import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteAccessTokensCommand 
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}