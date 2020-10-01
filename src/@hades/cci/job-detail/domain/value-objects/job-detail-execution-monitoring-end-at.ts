import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class JobDetailExecutionMonitoringEndAt extends TimestampValueObject 
{
    public readonly type: 'JobDetailExecutionMonitoringEndAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobDetailExecutionMonitoringEndAt',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}