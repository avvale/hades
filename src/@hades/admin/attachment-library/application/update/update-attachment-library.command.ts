import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateAttachmentLibraryCommand
{
    constructor(
        public readonly payload: {
            id: string,
            name?: string,
            pathname?: string,
            filename?: string,
            url?: string,
            mime?: string,
            extension?: string,
            size?: number,
            width?: number,
            height?: number,
            data?: any,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}