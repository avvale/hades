import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IModuleRepository } from './../../domain/module.repository';
import { AdminModule } from './../../domain/module.entity';

@Injectable()
export class FindModuleService
{
    constructor(
        private readonly repository: IModuleRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<AdminModule>
    {        
        return await this.repository.find(queryStatements);
    }
}