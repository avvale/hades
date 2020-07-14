import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { BplusItSappiDataLake } from './../../domain/data-lake.aggregate';
import { DataLakeMapper } from './../../domain/data-lake.mapper';
import { BplusItSappiDataLakeModel } from './sequelize-data-lake.model';

@Injectable()
export class SequelizeDataLakeRepository extends SequelizeRepository<BplusItSappiDataLake> implements IDataLakeRepository
{
    public readonly aggregateName: string = 'BplusItSappiDataLake';
    public readonly mapper: DataLakeMapper = new DataLakeMapper();

    constructor(
        @InjectModel(BplusItSappiDataLakeModel)
        public readonly repository: typeof BplusItSappiDataLakeModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}