import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateApplicationsCommand
{
    constructor(
        public readonly payload: {
            id: string,
            name: string,
            code: string,
            secret: string,
            isMaster: boolean,
            clientIds?: string[],
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}