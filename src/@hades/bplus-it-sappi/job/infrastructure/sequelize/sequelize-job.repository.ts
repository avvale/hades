import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IJobRepository } from './../../domain/job.repository';
import { BplusItSappiJob } from './../../domain/job.entity';
import { BplusItSappiJobModel } from './sequelize-job.model';
import { SequelizeJobMapper } from './sequelize-job.mapper';

@Injectable()
export class SequelizeJobRepository extends SequelizeRepository<BplusItSappiJob> implements IJobRepository
{
    public readonly entityName: string = 'BplusItSappiJob';
    public readonly mapper: SequelizeJobMapper = new SequelizeJobMapper();

    constructor(
        @InjectModel(BplusItSappiJobModel)
        public readonly repository: typeof BplusItSappiJobModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}