import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentPathname extends StringValueObject
{
    public readonly type: 'AttachmentPathname';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentPathname',
            nullable: false,
            undefinable: false,
            maxLength: 1024,
        }, validationRules));
    }
}