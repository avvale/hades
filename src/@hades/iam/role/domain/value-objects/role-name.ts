import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class RoleName extends StringValueObject
{
    public readonly type: 'RoleName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'RoleName',
            nullable: false,
            undefinable: false,
            maxLength: 255,
        }, validationRules));
    }
}