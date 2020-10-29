import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ExecutionSystemName extends StringValueObject
{
    public readonly type: 'ExecutionSystemName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ExecutionSystemName',
            nullable:  false ,
            undefinable:  false ,
            maxLength: 20,
        }, validationRules));
    }
}