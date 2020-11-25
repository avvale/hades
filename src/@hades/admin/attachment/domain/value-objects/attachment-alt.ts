import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentAlt extends StringValueObject
{
    public readonly type: 'AttachmentAlt';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentAlt',
            nullable: true,
            undefinable: true,
            maxLength: 255,
        }, validationRules));
    }
}