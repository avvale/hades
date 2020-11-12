import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IResourceRepository } from './../../domain/resource.repository';
import { AdminResource } from './../../domain/resource.aggregate';
import { ResourceId } from './../../domain/value-objects';

@Injectable()
export class FindResourceByIdService
{
    constructor(
        private readonly repository: IResourceRepository,
    ) {}

    public async main(id: ResourceId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminResource>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}