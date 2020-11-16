import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class UserName extends StringValueObject
{
    public readonly type: 'UserName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'UserName',
            nullable: false,
            undefinable: false,
            maxLength: 255,
        }, validationRules));
    }
}