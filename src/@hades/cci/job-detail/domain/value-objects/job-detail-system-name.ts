import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class JobDetailSystemName extends StringValueObject
{
    public readonly type: 'JobDetailSystemName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'JobDetailSystemName',
            nullable: false,
            undefinable: false,
            maxLength: 20,
        }, validationRules));
    }
}