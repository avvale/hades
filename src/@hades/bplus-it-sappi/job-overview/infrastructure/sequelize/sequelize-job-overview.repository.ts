import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { BplusItSappiJobOverview } from './../../domain/job-overview.aggregate';
import { JobOverviewMapper } from './../../domain/job-overview.mapper';
import { BplusItSappiJobOverviewModel } from './sequelize-job-overview.model';

@Injectable()
export class SequelizeJobOverviewRepository extends SequelizeRepository<BplusItSappiJobOverview> implements IJobOverviewRepository
{
    public readonly aggregateName: string = 'BplusItSappiJobOverview';
    public readonly mapper: JobOverviewMapper = new JobOverviewMapper();

    constructor(
        @InjectModel(BplusItSappiJobOverviewModel)
        public readonly repository: typeof BplusItSappiJobOverviewModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}