import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize/types';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { CciJobOverview } from './../../domain/job-overview.aggregate';
import { JobOverviewMapper } from './../../domain/job-overview.mapper';
import { CciJobOverviewModel } from './sequelize-job-overview.model';

@Injectable()
export class SequelizeJobOverviewRepository extends SequelizeRepository<CciJobOverview, CciJobOverviewModel> implements IJobOverviewRepository
{
    public readonly aggregateName: string = 'CciJobOverview';
    public readonly mapper: JobOverviewMapper = new JobOverviewMapper();

    constructor(
        @InjectModel(CciJobOverviewModel)
        public readonly repository: typeof CciJobOverviewModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }
    
}