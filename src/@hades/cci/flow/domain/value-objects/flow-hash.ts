import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class FlowHash extends StringValueObject
{
    public readonly type: 'FlowHash';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'FlowHash',
            nullable:  false ,
            undefinable:  false ,
            length: 40,

        }, validationRules));
    }
}