import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteRefreshTokensCommand 
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}