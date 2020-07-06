import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ISystemRepository } from './../../domain/system.repository';
import { BplusItSappiSystem } from './../../domain/system.aggregate';

@Injectable()
export class FindSystemService
{
    constructor(
        private readonly repository: ISystemRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<BplusItSappiSystem>
    {        
        return await this.repository.find(queryStatements);
    }
}