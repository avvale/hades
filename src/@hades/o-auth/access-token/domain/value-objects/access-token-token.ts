import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccessTokenToken extends StringValueObject
{
    public readonly type: 'AccessTokenToken';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AccessTokenToken',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}