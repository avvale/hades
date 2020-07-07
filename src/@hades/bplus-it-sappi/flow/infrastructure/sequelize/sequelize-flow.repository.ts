import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IFlowRepository } from './../../domain/flow.repository';
import { BplusItSappiFlow } from './../../domain/flow.aggregate';
import { BplusItSappiFlowModel } from './sequelize-flow.model';
import { SequelizeFlowMapper } from './sequelize-flow.mapper';

@Injectable()
export class SequelizeFlowRepository extends SequelizeRepository<BplusItSappiFlow> implements IFlowRepository
{
    public readonly aggregateName: string = 'BplusItSappiFlow';
    public readonly mapper: SequelizeFlowMapper = new SequelizeFlowMapper();

    constructor(
        @InjectModel(BplusItSappiFlowModel)
        public readonly repository: typeof BplusItSappiFlowModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}