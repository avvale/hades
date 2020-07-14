import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ISystemRepository } from './../../domain/system.repository';
import { BplusItSappiSystem } from './../../domain/system.aggregate';
import { SystemMapper } from './../../domain/system.mapper';
import { BplusItSappiSystemModel } from './sequelize-system.model';

@Injectable()
export class SequelizeSystemRepository extends SequelizeRepository<BplusItSappiSystem> implements ISystemRepository
{
    public readonly aggregateName: string = 'BplusItSappiSystem';
    public readonly mapper: SystemMapper = new SystemMapper();

    constructor(
        @InjectModel(BplusItSappiSystemModel)
        public readonly repository: typeof BplusItSappiSystemModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}