import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class UpdateAttachmentCommand
{
    constructor(
        public readonly payload: {
            id: string,
            commonId?: string,
            langId?: string,
            attachableModel?: string,
            attachableId?: string,
            familyId?: string,
            sort?: number,
            alt?: string,
            title?: string,
            description?: string,
            excerpt?: string,
            pathname?: string,
            filename?: string,
            url?: string,
            mime?: string,
            extension?: string,
            size?: number,
            width?: number,
            height?: number,
            libraryId?: string,
            libraryFilename?: string,
            data?: any,
        },
        public readonly constraint?: QueryStatement,
        public readonly cQMetadata?: CQMetadata,
    ) {}
}