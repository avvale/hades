import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IModuleRepository } from './../../domain/module.repository';
import { CciModule } from './../../domain/module.aggregate';

@Injectable()
export class GetModulesService
{
    constructor(
        private readonly repository: IModuleRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciModule[]>
    {
        return await this.repository.get(queryStatement, constraint, cQMetadata);
    }
}