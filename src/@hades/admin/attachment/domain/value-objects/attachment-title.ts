import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentTitle extends StringValueObject
{
    public readonly type: 'AttachmentTitle';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentTitle',
            nullable: true,
            undefinable: true,
            maxLength: 255,
        }, validationRules));
    }
}