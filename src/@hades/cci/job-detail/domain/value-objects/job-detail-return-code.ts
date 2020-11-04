import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class JobDetailReturnCode extends IntValueObject
{
    public readonly type: 'JobDetailReturnCode';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'JobDetailReturnCode',
            nullable:  true ,
            undefinable:  true ,
            maxLength: 10,
            unsigned: false,
        }, validationRules));
    }
}