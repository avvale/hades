import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageDetailScenario extends StringValueObject
{
    public readonly type: 'MessageDetailScenario';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'MessageDetailScenario',
            nullable:  true ,
            undefinable:  true ,
            maxLength: 60,
        }, validationRules));
    }
}