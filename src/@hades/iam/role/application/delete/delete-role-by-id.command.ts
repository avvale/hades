import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteRoleByIdCommand 
{
    constructor(
        public readonly id: string,
        public readonly constraint?: QueryStatement,
    ) {}
}