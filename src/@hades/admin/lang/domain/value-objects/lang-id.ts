import { Uuid } from '@hades/shared/domain/value-objects/uuid';

export class LangId extends Uuid 
{
    public readonly type: 'LangId';

    constructor(value: string) 
    {
        super(value, { 
            name: 'LangId'
        });
    }
}