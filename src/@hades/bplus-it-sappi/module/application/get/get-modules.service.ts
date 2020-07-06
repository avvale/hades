import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IModuleRepository } from './../../domain/module.repository';
import { BplusItSappiModule } from './../../domain/module.aggregate';

@Injectable()
export class GetModulesService
{
    constructor(
        private readonly repository: IModuleRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<BplusItSappiModule[]>
    {        
        return await this.repository.get(queryStatements);
    }
}