import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSummaryCommand } from './create-summary.command';
import { CreateSummaryService } from './create-summary.service';
import { 
    SummaryId, 
    SummaryTagId, 
    SummaryTenantId, 
    SummaryAccessAt, 
    SummaryCounter
    
} from './../../domain/value-objects';

@CommandHandler(CreateSummaryCommand)
export class CreateSummaryCommandHandler implements ICommandHandler<CreateSummaryCommand>
{
    constructor(
        private readonly createSummaryService: CreateSummaryService
    ) { }

    async execute(command: CreateSummaryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createSummaryService.main(
            new SummaryId(command.id),
            new SummaryTagId(command.tagId),
            new SummaryTenantId(command.tenantId),
            new SummaryAccessAt(command.accessAt),
            new SummaryCounter(command.counter),
            
        );
    }
}