import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { BplusItSappiDataLake } from './../../domain/data-lake.entity';
import { BplusItSappiDataLakeModel } from './sequelize-data-lake.model';
import { SequelizeDataLakeMapper } from './sequelize-data-lake.mapper';

@Injectable()
export class SequelizeDataLakeRepository extends SequelizeRepository<BplusItSappiDataLake> implements IDataLakeRepository
{
    public readonly entityName: string = 'BplusItSappiDataLake';
    public readonly mapper: SequelizeDataLakeMapper = new SequelizeDataLakeMapper();

    constructor(
        @InjectModel(BplusItSappiDataLakeModel)
        public readonly repository: typeof BplusItSappiDataLakeModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}