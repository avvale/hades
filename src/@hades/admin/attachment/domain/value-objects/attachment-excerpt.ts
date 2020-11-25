import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentExcerpt extends StringValueObject
{
    public readonly type: 'AttachmentExcerpt';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentExcerpt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}