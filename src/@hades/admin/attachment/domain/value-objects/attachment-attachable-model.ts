import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentAttachableModel extends StringValueObject
{
    public readonly type: 'AttachmentAttachableModel';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentAttachableModel',
            nullable: false,
            undefinable: false,
            maxLength: 75,
        }, validationRules));
    }
}