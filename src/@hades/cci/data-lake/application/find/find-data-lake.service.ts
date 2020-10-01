import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { CciDataLake } from './../../domain/data-lake.aggregate';

@Injectable()
export class FindDataLakeService
{
    constructor(
        private readonly repository: IDataLakeRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<CciDataLake>
    {        
        return await this.repository.find(queryStatement);
    }
}