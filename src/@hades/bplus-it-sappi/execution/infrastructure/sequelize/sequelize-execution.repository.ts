import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IExecutionRepository } from './../../domain/execution.repository';
import { BplusItSappiExecution } from './../../domain/execution.aggregate';
import { ExecutionMapper } from './../../domain/execution.mapper';
import { BplusItSappiExecutionModel } from './sequelize-execution.model';

@Injectable()
export class SequelizeExecutionRepository extends SequelizeRepository<BplusItSappiExecution> implements IExecutionRepository
{
    public readonly aggregateName: string = 'BplusItSappiExecution';
    public readonly mapper: ExecutionMapper = new ExecutionMapper();

    constructor(
        @InjectModel(BplusItSappiExecutionModel)
        public readonly repository: typeof BplusItSappiExecutionModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}