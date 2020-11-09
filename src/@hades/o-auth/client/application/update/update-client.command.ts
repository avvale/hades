import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateClientCommand
{
    constructor(
        public readonly payload: {
            id: string,
            grantType?: string,
            name?: string,
            secret?: string,
            authUrl?: string,
            redirect?: string,
            expiredAccessToken?: number,
            expiredRefreshToken?: number,
            isActive?: boolean,
            isMaster?: boolean,
            applicationIds?: string[],
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}