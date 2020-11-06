import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageDetailReceiverComponent extends StringValueObject
{
    public readonly type: 'MessageDetailReceiverComponent';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'MessageDetailReceiverComponent',
            nullable: true,
            undefinable: true,
            maxLength: 160,
        }, validationRules));
    }
}