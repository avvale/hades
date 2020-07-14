import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SequelizeRepository } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.repository';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { ISummaryRepository } from './../../domain/summary.repository';
import { NfcSummary } from './../../domain/summary.aggregate';
import { SummaryMapper } from './../../domain/summary.mapper';
import { NfcSummaryModel } from './sequelize-summary.model';

@Injectable()
export class SequelizeSummaryRepository extends SequelizeRepository<NfcSummary> implements ISummaryRepository
{
    public readonly aggregateName: string = 'NfcSummary';
    public readonly mapper: SummaryMapper = new SummaryMapper();

    constructor(
        @InjectModel(NfcSummaryModel)
        public readonly repository: typeof NfcSummaryModel,
        public readonly criteria: ICriteria
    ) {
        super();
    }

    
}