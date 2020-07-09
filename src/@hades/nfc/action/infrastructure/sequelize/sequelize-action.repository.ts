import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { IActionRepository } from './../../domain/action.repository';
import { NfcAction } from './../../domain/action.aggregate';
import { NfcActionModel } from './sequelize-action.model';
import { SequelizeActionMapper } from './sequelize-action.mapper';

@Injectable()
export class SequelizeActionRepository extends SequelizeRepository<NfcAction> implements IActionRepository
{
    public readonly aggregateName: string = 'NfcAction';
    public readonly mapper: SequelizeActionMapper = new SequelizeActionMapper();

    constructor(
        @InjectModel(NfcActionModel)
        public readonly repository: typeof NfcActionModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}