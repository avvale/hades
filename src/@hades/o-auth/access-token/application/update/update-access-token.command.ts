import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class UpdateAccessTokenCommand 
{
    constructor(
        public readonly id: string,
        public readonly clientId?: string,
        public readonly accountId?: string,
        public readonly token?: string,
        public readonly name?: string,
        public readonly isRevoked?: boolean,
        public readonly expiresAt?: string,
        
        public readonly constraint?: QueryStatement,
    ) {}
}