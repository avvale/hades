import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IModuleRepository } from './../../domain/module.repository';
import { CciModule } from './../../domain/module.aggregate';

@Injectable()
export class FindModuleService
{
    constructor(
        private readonly repository: IModuleRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<CciModule>
    {        
        return await this.repository.find(queryStatement);
    }
}