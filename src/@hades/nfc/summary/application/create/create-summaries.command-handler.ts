import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSummariesCommand } from './create-summaries.command';
import { CreateSummariesService } from './create-summaries.service';
import { 
    SummaryId, 
    SummaryTagId, 
    SummaryTenantId, 
    SummaryAccessAt, 
    SummaryCounter
    
} from './../../domain/value-objects';

@CommandHandler(CreateSummariesCommand)
export class CreateSummariesCommandHandler implements ICommandHandler<CreateSummariesCommand>
{
    constructor(
        private readonly createSummariesService: CreateSummariesService
    ) { }

    async execute(command: CreateSummariesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createSummariesService.main(
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