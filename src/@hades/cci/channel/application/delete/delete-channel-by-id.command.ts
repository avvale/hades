import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteChannelByIdCommand 
{
    constructor(
        public readonly id: string,
        public constraint?: QueryStatement,
    ) {}
}