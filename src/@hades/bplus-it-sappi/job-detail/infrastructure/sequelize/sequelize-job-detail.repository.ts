import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { BplusItSappiJobDetail } from './../../domain/job-detail.entity';
import { BplusItSappiJobDetailModel } from './sequelize-job-detail.model';
import { SequelizeJobDetailMapper } from './sequelize-job-detail.mapper';

@Injectable()
export class SequelizeJobDetailRepository extends SequelizeRepository<BplusItSappiJobDetail> implements IJobDetailRepository
{
    public readonly entityName: string = 'BplusItSappiJobDetail';
    public readonly mapper: SequelizeJobDetailMapper = new SequelizeJobDetailMapper();

    constructor(
        @InjectModel(BplusItSappiJobDetailModel)
        public readonly repository: typeof BplusItSappiJobDetailModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}