import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SummaryTagId extends UuidValueObject
{
    public readonly type: 'SummaryTagId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SummaryTagId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}