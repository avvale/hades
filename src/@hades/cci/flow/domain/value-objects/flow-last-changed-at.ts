import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class FlowLastChangedAt extends TimestampValueObject 
{
    public readonly type: 'FlowLastChangedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'FlowLastChangedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}