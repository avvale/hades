import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { CciDataLake } from './../../domain/data-lake.aggregate';
import { DataLakeId } from './../../domain/value-objects';

@Injectable()
export class FindDataLakeByIdService
{
    constructor(
        private readonly repository: IDataLakeRepository,
    ) {}

    public async main(id: DataLakeId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciDataLake>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}