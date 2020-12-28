import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentIsUploaded extends BooleanValueObject
{
    public readonly type: 'AttachmentIsUploaded';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentIsUploaded',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}