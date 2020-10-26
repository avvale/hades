import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class UpdatePermissionCommand
{
    constructor(
        public readonly id: string,
        public readonly name?: string,
        public readonly boundedContextId?: string,
        public readonly roleIds?: string[],
        
        public readonly constraint?: QueryStatement,
    ) {}
}