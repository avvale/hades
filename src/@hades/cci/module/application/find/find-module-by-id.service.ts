import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IModuleRepository } from './../../domain/module.repository';
import { CciModule } from './../../domain/module.aggregate';
import { ModuleId } from './../../domain/value-objects';

@Injectable()
export class FindModuleByIdService
{
    constructor(
        private readonly repository: IModuleRepository,
    ) {}

    public async main(id: ModuleId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciModule>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}