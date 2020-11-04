import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { CciDataLake } from './../../domain/data-lake.aggregate';
import { DataLakeMapper } from './../../domain/data-lake.mapper';
import { CciDataLakeModel } from './sequelize-data-lake.model';

@Injectable()
export class SequelizeDataLakeRepository extends SequelizeRepository<CciDataLake, CciDataLakeModel> implements IDataLakeRepository
{
    public readonly aggregateName: string = 'CciDataLake';
    public readonly mapper: DataLakeMapper = new DataLakeMapper();
    public readonly timezoneColumns: string[] = ['createdAt','updatedAt','deletedAt'];

    constructor(
        @InjectModel(CciDataLakeModel)
        public readonly repository: typeof CciDataLakeModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}