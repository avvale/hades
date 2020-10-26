import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class UserUsername extends StringValueObject
{
    public readonly type: 'UserUsername';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'UserUsername',
            nullable: false,
            undefinable: false,
            maxLength: 120,        }, validationRules));
    }
}