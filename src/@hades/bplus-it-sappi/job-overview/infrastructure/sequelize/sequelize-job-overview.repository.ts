import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { BplusItSappiJobOverview } from './../../domain/job-overview.entity';
import { BplusItSappiJobOverviewModel } from './sequelize-job-overview.model';
import { SequelizeJobOverviewMapper } from './sequelize-job-overview.mapper';

@Injectable()
export class SequelizeJobOverviewRepository extends SequelizeRepository<BplusItSappiJobOverview> implements IJobOverviewRepository
{
    public readonly entityName: string = 'BplusItSappiJobOverview';
    public readonly mapper: SequelizeJobOverviewMapper = new SequelizeJobOverviewMapper();

    constructor(
        @InjectModel(BplusItSappiJobOverviewModel)
        public readonly repository: typeof BplusItSappiJobOverviewModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}