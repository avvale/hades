import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageDetailReceiverInterfaceNamespace extends StringValueObject
{
    public readonly type: 'MessageDetailReceiverInterfaceNamespace';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'MessageDetailReceiverInterfaceNamespace',
            nullable: true,
            undefinable: true,
            maxLength: 160,
        }, validationRules));
    }
}