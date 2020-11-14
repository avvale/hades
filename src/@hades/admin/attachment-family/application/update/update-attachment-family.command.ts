import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateAttachmentFamilyCommand
{
    constructor(
        public readonly payload: {
            id: string,
            name?: string,
            resourceIds?: string[],
            width?: number,
            height?: number,
            fit?: string,
            sizes?: any,
            quality?: number,
            format?: string,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}