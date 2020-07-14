import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IFlowRepository } from './../../domain/flow.repository';
import { BplusItSappiFlow } from './../../domain/flow.aggregate';
import { FlowMapper } from './../../domain/flow.mapper';
import { BplusItSappiFlowModel } from './sequelize-flow.model';

@Injectable()
export class SequelizeFlowRepository extends SequelizeRepository<BplusItSappiFlow> implements IFlowRepository
{
    public readonly aggregateName: string = 'BplusItSappiFlow';
    public readonly mapper: FlowMapper = new FlowMapper();

    constructor(
        @InjectModel(BplusItSappiFlowModel)
        public readonly repository: typeof BplusItSappiFlowModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}