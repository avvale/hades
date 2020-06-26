import { Timestamp } from '@hades/shared/domain/value-objects/timestamp';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SystemCreatedAt extends Timestamp 
{
    public readonly type: 'SystemCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SystemCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}