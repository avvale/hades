import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { NfcSummary } from './summary.aggregate';
import { SummaryResponse } from './summary.response';
import { 
    SummaryId, 
    SummaryTagId, 
    SummaryTenantId, 
    SummaryAccessAt, 
    SummaryCounter, 
    SummaryCreatedAt, 
    SummaryUpdatedAt, 
    SummaryDeletedAt
    
} from './value-objects';

export class SummaryMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param summary
     */
    mapObjectToAggregate(summary: ObjectLiteral): NfcSummary
    {
        return this.makeAggregate(summary);
    }

    /**
     * Map array of objects to array aggregates
     * @param summaries 
     */
    mapObjectsToAggregates(summaries: ObjectLiteral[]): NfcSummary[]
    {
        return summaries.map(summary  => this.makeAggregate(summary ));
    }

    /**
     * Map aggregate to response
     * @param summary 
     */
    mapAggregateToResponse(summary: NfcSummary): SummaryResponse
    {
        return this.makeResponse(summary);
    }

    /**
     * Map array of aggregates to array responses
     * @param summaries
     */
    mapAggregatesToResponses(summaries: NfcSummary[]): SummaryResponse[]
    {
        return summaries.map(summary => this.makeResponse(summary));
    }

    private makeAggregate(summary: ObjectLiteral): NfcSummary
    {
        return NfcSummary.register(
            new SummaryId(summary.id),
            new SummaryTagId(summary.tagId),
            new SummaryTenantId(summary.tenantId),
            new SummaryAccessAt(summary.accessAt),
            new SummaryCounter(summary.counter),
            new SummaryCreatedAt(summary.createdAt),
            new SummaryUpdatedAt(summary.updatedAt),
            new SummaryDeletedAt(summary.deletedAt),
              
        );
    }

    private makeResponse(summary: NfcSummary): SummaryResponse
    {
        return new SummaryResponse(
            summary.id.value,
            summary.tagId.value,
            summary.tenantId.value,
            summary.accessAt.value,
            summary.counter.value,
            summary.createdAt.value,
            summary.updatedAt.value,
            summary.deletedAt.value,
            
        );
    }
}