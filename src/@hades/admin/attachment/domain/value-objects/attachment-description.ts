import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentDescription extends StringValueObject
{
    public readonly type: 'AttachmentDescription';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentDescription',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}