import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ClientExpiredAccessToken extends IntValueObject 
{
    public readonly type: 'ClientExpiredAccessToken';

    constructor(value: number, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ClientExpiredAccessToken',
            nullable: true,
            undefinable: true,
            maxLength: 10,
            unsigned: true,
        }, validationRules));
    }
}