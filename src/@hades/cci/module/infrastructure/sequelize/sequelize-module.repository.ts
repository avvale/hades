import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IModuleRepository } from './../../domain/module.repository';
import { CciModule } from './../../domain/module.aggregate';
import { ModuleMapper } from './../../domain/module.mapper';
import { CciModuleModel } from './sequelize-module.model';

@Injectable()
export class SequelizeModuleRepository extends SequelizeRepository<CciModule, CciModuleModel> implements IModuleRepository
{
    public readonly aggregateName: string = 'CciModule';
    public readonly mapper: ModuleMapper = new ModuleMapper();

    constructor(
        @InjectModel(CciModuleModel)
        public readonly repository: typeof CciModuleModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}