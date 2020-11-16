import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentFilename extends StringValueObject
{
    public readonly type: 'AttachmentFilename';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentFilename',
            nullable: false,
            undefinable: false,
            maxLength: 255,
        }, validationRules));
    }
}