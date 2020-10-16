import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class UpdateAccountCommand 
{
    constructor(
        public readonly id: string,
        public readonly type?: string,
        public readonly email?: string,
        public readonly isActive?: boolean,
        public readonly clientId?: string,
        public readonly dApplicationCodes?: any,
        public readonly dPermissions?: any,
        public readonly data?: any,
        public readonly roleIds?: string[],
        public readonly tenantIds?: string[],
        public readonly constraint?: QueryStatement,
        
    ) {}
}