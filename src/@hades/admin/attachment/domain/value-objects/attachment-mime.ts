import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentMime extends StringValueObject
{
    public readonly type: 'AttachmentMime';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentMime',
            nullable: false,
            undefinable: false,
            maxLength: 50,
        }, validationRules));
    }
}