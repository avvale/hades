import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class JobDetailUser extends StringValueObject
{
    public readonly type: 'JobDetailUser';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'JobDetailUser',
            nullable: true,
            undefinable: true,
            maxLength: 255,
        }, validationRules));
    }
}