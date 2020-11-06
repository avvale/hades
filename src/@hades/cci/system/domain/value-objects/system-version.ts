import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class SystemVersion extends StringValueObject
{
    public readonly type: 'SystemVersion';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'SystemVersion',
            nullable: false,
            undefinable: false,
            
        }, validationRules));
    }
}