import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccessTokenName extends StringValueObject
{
    public readonly type: 'AccessTokenName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AccessTokenName',
            nullable: true,
            undefinable: true,
            maxLength: 255,
        }, validationRules));
    }
}