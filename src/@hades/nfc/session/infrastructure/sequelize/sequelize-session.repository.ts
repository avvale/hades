import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ISessionRepository } from './../../domain/session.repository';
import { NfcSession } from './../../domain/session.aggregate';
import { NfcSessionModel } from './sequelize-session.model';
import { SequelizeSessionMapper } from './sequelize-session.mapper';

@Injectable()
export class SequelizeSessionRepository extends SequelizeRepository<NfcSession> implements ISessionRepository
{
    public readonly aggregateName: string = 'NfcSession';
    public readonly mapper: SequelizeSessionMapper = new SequelizeSessionMapper();

    constructor(
        @InjectModel(NfcSessionModel)
        public readonly repository: typeof NfcSessionModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}