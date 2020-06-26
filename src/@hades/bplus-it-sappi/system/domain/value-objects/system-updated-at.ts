import { Timestamp } from '@hades/shared/domain/value-objects/timestamp';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SystemUpdatedAt extends Timestamp 
{
    public readonly type: 'SystemUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SystemUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}