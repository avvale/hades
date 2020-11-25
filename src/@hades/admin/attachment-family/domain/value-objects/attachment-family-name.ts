import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentFamilyName extends StringValueObject
{
    public readonly type: 'AttachmentFamilyName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentFamilyName',
            nullable: false,
            undefinable: false,
            maxLength: 255,
        }, validationRules));
    }
}