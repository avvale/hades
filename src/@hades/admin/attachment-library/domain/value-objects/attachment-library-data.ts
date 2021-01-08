import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentLibraryData extends JsonValueObject
{
    public readonly type: 'AttachmentLibraryData';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentLibraryData',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}