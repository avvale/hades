import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { BplusItSappiDataLake } from './../../domain/data-lake.entity';

@Injectable()
export class FindDataLakeService
{
    constructor(
        private readonly repository: IDataLakeRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<BplusItSappiDataLake>
    {        
        return await this.repository.find(queryStatements);
    }
}