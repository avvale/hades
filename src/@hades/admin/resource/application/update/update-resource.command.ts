import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateResourceCommand
{
    constructor(
        public readonly payload: {
            id: string,
            boundedContextId?: string,
            name?: string,
            hasCustomFields?: boolean,
            hasAttachments?: boolean,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}