import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IExecutionRepository } from './../../domain/execution.repository';
import { CciExecution } from './../../domain/execution.aggregate';
import { ExecutionMapper } from './../../domain/execution.mapper';
import { CciExecutionModel } from './sequelize-execution.model';

@Injectable()
export class SequelizeExecutionRepository extends SequelizeRepository<CciExecution, CciExecutionModel> implements IExecutionRepository
{
    public readonly aggregateName: string = 'CciExecution';
    public readonly mapper: ExecutionMapper = new ExecutionMapper();

    constructor(
        @InjectModel(CciExecutionModel)
        public readonly repository: typeof CciExecutionModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}