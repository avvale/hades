import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSummaryCommand } from './update-summary.command';
import { UpdateSummaryService } from './update-summary.service';
import { 
    SummaryId, 
    SummaryTagId, 
    SummaryTenantId, 
    SummaryAccessAt, 
    SummaryCounter
    
} from './../../domain/value-objects';

@CommandHandler(UpdateSummaryCommand)
export class UpdateSummaryCommandHandler implements ICommandHandler<UpdateSummaryCommand>
{
    constructor(
        private readonly updateSummaryService: UpdateSummaryService
    ) { }

    async execute(command: UpdateSummaryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateSummaryService.main(
            new SummaryId(command.id),
            new SummaryTagId(command.tagId, { undefinable: true }),
            new SummaryTenantId(command.tenantId, { undefinable: true }),
            new SummaryAccessAt(command.accessAt, { undefinable: true }),
            new SummaryCounter(command.counter, { undefinable: true }),
            
        )
    }
}