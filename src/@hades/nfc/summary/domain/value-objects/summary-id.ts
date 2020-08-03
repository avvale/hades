import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SummaryId extends UuidValueObject
{
    public readonly type: 'SummaryId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SummaryId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}