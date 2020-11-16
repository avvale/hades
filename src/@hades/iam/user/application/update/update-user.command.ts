import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateUserCommand
{
    constructor(
        public readonly payload: {
            id: string,
            accountId?: string,
            name?: string,
            surname?: string,
            avatar?: string,
            mobile?: string,
            langId?: string,
            username?: string,
            password?: string,
            rememberToken?: string,
            data?: any,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}