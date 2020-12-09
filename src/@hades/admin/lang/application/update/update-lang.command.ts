import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateLangCommand
{
    constructor(
        public readonly payload: {
            id: string,
            name?: string,
            image?: string,
            iso6392?: string,
            iso6393?: string,
            ietf?: string,
            dir?: string,
            sort?: number,
            isActive?: boolean,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}