import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IModuleRepository } from './../../domain/module.repository';
import { AdminModule } from './../../domain/module.entity';
import { AdminModuleModel } from './sequelize-module.model';
import { SequelizeModuleMapper } from './sequelize-module.mapper';

@Injectable()
export class SequelizeModuleRepository extends SequelizeRepository<AdminModule> implements IModuleRepository
{
    public readonly entityName: string = 'AdminModule';
    public readonly mapper: SequelizeModuleMapper = new SequelizeModuleMapper();

    constructor(
        @InjectModel(AdminModuleModel)
        public readonly repository: typeof AdminModuleModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}