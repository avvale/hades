import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class UpdateApplicationCommand 
{
    constructor(
        public readonly id: string,
        public readonly name?: string,
        public readonly code?: string,
        public readonly secret?: string,
        public readonly isMaster?: boolean,
        public readonly clientIds?: string[],
        
        public readonly constraint?: QueryStatement,
    ) {}
}