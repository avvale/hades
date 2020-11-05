import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreatePermissionCommand
{
    constructor(
        public readonly payload: {
            id: string,
            name: string,
            boundedContextId: string,
            roleIds?: string[],
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}