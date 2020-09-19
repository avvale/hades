import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ClientCreatedAt extends TimestampValueObject 
{
    public readonly type: 'ClientCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ClientCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}