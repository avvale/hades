import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateBoundedContextCommand
{
    constructor(
        public readonly payload: {
            id: string,
            name: string,
            root: string,
            sort: number,
            isActive: boolean,
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}