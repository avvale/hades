import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertSummariesCommand } from './insert-summaries.command';
import { InsertSummariesService } from './insert-summaries.service';
import { 
    SummaryId, 
    SummaryTagId, 
    SummaryTenantId, 
    SummaryAccessAt, 
    SummaryCounter
    
} from './../../domain/value-objects';

@CommandHandler(InsertSummariesCommand)
export class InsertSummariesCommandHandler implements ICommandHandler<InsertSummariesCommand>
{
    constructor(
        private readonly insertSummariesService: InsertSummariesService
    ) { }

    async execute(command: InsertSummariesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertSummariesService.main(
            command.summaries
                .map(summary => { 
                    return {
                        id: new SummaryId(summary.id),
                        tagId: new SummaryTagId(summary.tagId),
                        tenantId: new SummaryTenantId(summary.tenantId),
                        accessAt: new SummaryAccessAt(summary.accessAt),
                        counter: new SummaryCounter(summary.counter),
                        
                    }
                })
        );
    }
}