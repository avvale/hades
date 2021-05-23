import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ISystemRepository } from './../../domain/system.repository';
import { CciSystem } from './../../domain/system.aggregate';
import { SystemMapper } from './../../domain/system.mapper';
import { CciSystemModel } from './sequelize-system.model';

@Injectable()
export class SequelizeSystemRepository extends SequelizeRepository<CciSystem, CciSystemModel> implements ISystemRepository
{
    public readonly aggregateName: string = 'CciSystem';
    public readonly mapper: SystemMapper = new SystemMapper();

    constructor(
        @InjectModel(CciSystemModel)
        public readonly repository: typeof CciSystemModel,
        public readonly criteria: ICriteria,
    ) {
        super();
    }
}