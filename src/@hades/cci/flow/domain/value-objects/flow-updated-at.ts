import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class FlowUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'FlowUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'FlowUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}