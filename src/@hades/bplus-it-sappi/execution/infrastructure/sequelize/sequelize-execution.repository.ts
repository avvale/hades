import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IExecutionRepository } from './../../domain/execution.repository';
import { BplusItSappiExecution } from './../../domain/execution.entity';
import { BplusItSappiExecutionModel } from './sequelize-execution.model';
import { SequelizeExecutionMapper } from './sequelize-execution.mapper';

@Injectable()
export class SequelizeExecutionRepository extends SequelizeRepository<BplusItSappiExecution> implements IExecutionRepository
{
    public readonly entityName: string = 'BplusItSappiExecution';
    public readonly mapper: SequelizeExecutionMapper = new SequelizeExecutionMapper();

    constructor(
        @InjectModel(BplusItSappiExecutionModel)
        public readonly repository: typeof BplusItSappiExecutionModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}