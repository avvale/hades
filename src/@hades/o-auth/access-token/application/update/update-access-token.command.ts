import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateAccessTokenCommand
{
    constructor(
        public readonly payload: {
            id: string,
            clientId?: string,
            accountId?: string,
            token?: string,
            name?: string,
            isRevoked?: boolean,
            expiresAt?: string,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}