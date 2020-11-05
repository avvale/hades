import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateRefreshTokenCommand
{
    constructor(
        public readonly payload: {
            id: string,
            accessTokenId?: string,
            token?: string,
            isRevoked?: boolean,
            expiresAt?: string,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}