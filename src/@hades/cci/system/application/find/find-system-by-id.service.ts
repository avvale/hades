import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { ISystemRepository } from './../../domain/system.repository';
import { CciSystem } from './../../domain/system.aggregate';
import { SystemId } from './../../domain/value-objects';

@Injectable()
export class FindSystemByIdService
{
    constructor(
        private readonly repository: ISystemRepository,
    ) {}

    public async main(id: SystemId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciSystem>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}