import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class BoundedContextRoot extends StringValueObject
{
    public readonly type: 'BoundedContextRoot';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'BoundedContextRoot',
            nullable: false,
            undefinable: false,
            maxLength: 30,
        }, validationRules));
    }
}