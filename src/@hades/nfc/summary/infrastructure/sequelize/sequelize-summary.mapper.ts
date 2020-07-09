import { SequelizeMapper } from '@hades/shared/infrastructure/persistence/sequelize/sequelize.mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { NfcSummary } from './../../domain/summary.aggregate';
import { 
    SummaryId, 
    SummaryTagId, 
    SummaryTenantId, 
    SummaryAccessAt, 
    SummaryCounter, 
    SummaryCreatedAt, 
    SummaryUpdatedAt, 
    SummaryDeletedAt
    
} from './../../domain/value-objects';

export class SequelizeSummaryMapper implements SequelizeMapper
{
    mapToAggregate(summary: ObjectLiteral | ObjectLiteral[]): NfcSummary | NfcSummary[]
    {
        if (Array.isArray(summary))
        {
            return summary.map(item => NfcSummary.register(
                    new SummaryId(item.id),
                    new SummaryTagId(item.tagId),
                    new SummaryTenantId(item.tenantId),
                    new SummaryAccessAt(item.accessAt),
                    new SummaryCounter(item.counter),
                    new SummaryCreatedAt(item.createdAt),
                    new SummaryUpdatedAt(item.updatedAt),
                    new SummaryDeletedAt(item.deletedAt),
                    
                )
            );
        }
        
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
}