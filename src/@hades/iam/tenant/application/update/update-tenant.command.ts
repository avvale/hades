import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class UpdateTenantCommand
{
    constructor(
        public readonly id: string,
        public readonly name?: string,
        public readonly code?: string,
        public readonly logo?: string,
        public readonly isActive?: boolean,
        public readonly data?: any,
        public readonly accountIds?: string[],
        
        public readonly constraint?: QueryStatement,
    ) {}
}