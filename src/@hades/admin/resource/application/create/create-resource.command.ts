import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateResourceCommand
{
    constructor(
        public readonly payload: {
            id: string,
            boundedContextId: string,
            name: string,
            hasCustomFields: boolean,
            hasAttachments: boolean,
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}