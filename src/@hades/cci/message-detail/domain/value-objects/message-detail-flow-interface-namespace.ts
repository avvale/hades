import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageDetailFlowInterfaceNamespace extends StringValueObject
{
    public readonly type: 'MessageDetailFlowInterfaceNamespace';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'MessageDetailFlowInterfaceNamespace',
            nullable:  false ,
            undefinable:  false ,
            maxLength: 160,
        }, validationRules));
    }
}