import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IModuleRepository } from './../../domain/module.repository';
import { BplusItSappiModule } from './../../domain/module.aggregate';
import { BplusItSappiModuleModel } from './sequelize-module.model';
import { SequelizeModuleMapper } from './sequelize-module.mapper';

@Injectable()
export class SequelizeModuleRepository extends SequelizeRepository<BplusItSappiModule> implements IModuleRepository
{
    public readonly aggregateName: string = 'BplusItSappiModule';
    public readonly mapper: SequelizeModuleMapper = new SequelizeModuleMapper();

    constructor(
        @InjectModel(BplusItSappiModuleModel)
        public readonly repository: typeof BplusItSappiModuleModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}