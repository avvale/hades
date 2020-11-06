import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class UserRememberToken extends StringValueObject
{
    public readonly type: 'UserRememberToken';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'UserRememberToken',
            nullable: true,
            undefinable: true,
            maxLength: 255,
        }, validationRules));
    }
}