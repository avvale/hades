import { Timestamp } from '@hades/shared/domain/value-objects/timestamp';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class LangUpdatedAt extends Timestamp 
{
    public readonly type: 'LangUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'LangUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}