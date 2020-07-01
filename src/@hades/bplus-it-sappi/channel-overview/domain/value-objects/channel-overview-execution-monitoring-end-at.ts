import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelOverviewExecutionMonitoringEndAt extends TimestampValueObject 
{
    public readonly type: 'ChannelOverviewExecutionMonitoringEndAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelOverviewExecutionMonitoringEndAt',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}