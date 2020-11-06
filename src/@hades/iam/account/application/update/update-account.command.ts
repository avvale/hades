import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateAccountCommand
{
    constructor(
        public readonly payload: {
            id: string,
            type?: string,
            email?: string,
            isActive?: boolean,
            clientId?: string,
            dApplicationCodes?: any,
            dPermissions?: any,
            data?: any,
            roleIds?: string[],
            tenantIds?: string[],
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}