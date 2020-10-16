import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class UpdateBoundedContextCommand 
{
    constructor(
        public readonly id: string,
        public readonly name?: string,
        public readonly root?: string,
        public readonly sort?: number,
        public readonly isActive?: boolean,
        
        public readonly constraint?: QueryStatement,
    ) {}
}