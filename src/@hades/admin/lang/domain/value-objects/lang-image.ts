import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';

export class LangImage extends StringValueObject 
{
    public readonly type: 'LangImage';

    constructor(value: string) 
    {
        super(value, { 
            name: 'LangImage'
        });
    }
}