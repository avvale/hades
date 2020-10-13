import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class FindChannelByIdQuery
{
    constructor(
        public id: string,
        public constraint?: QueryStatement,
    ) {}
}