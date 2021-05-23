import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { CciJobDetail } from './../../domain/job-detail.aggregate';
import { JobDetailMapper } from './../../domain/job-detail.mapper';
import { CciJobDetailModel } from './sequelize-job-detail.model';

@Injectable()
export class SequelizeJobDetailRepository extends SequelizeRepository<CciJobDetail, CciJobDetailModel> implements IJobDetailRepository
{
    public readonly aggregateName: string = 'CciJobDetail';
    public readonly mapper: JobDetailMapper = new JobDetailMapper();

    constructor(
        @InjectModel(CciJobDetailModel)
        public readonly repository: typeof CciJobDetailModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}