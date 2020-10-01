import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelOverviewExecutionMonitoringStartAt extends TimestampValueObject 
{
    public readonly type: 'ChannelOverviewExecutionMonitoringStartAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelOverviewExecutionMonitoringStartAt',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}