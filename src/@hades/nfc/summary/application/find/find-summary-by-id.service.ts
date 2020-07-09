import { Injectable } from '@nestjs/common';
import { ISummaryRepository } from './../../domain/summary.repository';
import { NfcSummary } from './../../domain/summary.aggregate';
import { SummaryId } from './../../domain/value-objects';

@Injectable()
export class FindSummaryByIdService
{
    constructor(
        private readonly repository: ISummaryRepository
    ) {}

    public async main(id: SummaryId): Promise<NfcSummary>
    {        
        return await this.repository.findById(id);
    }
}