import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentIsChanged extends BooleanValueObject
{
    public readonly type: 'AttachmentIsChanged';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentIsChanged',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}