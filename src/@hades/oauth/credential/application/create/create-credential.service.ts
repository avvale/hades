import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    CredentialUsername,
    CredentialPassword
} from './../../domain/value-objects';
import { ILangRepository } from './../../domain/lang.repository';
import { AdminLang } from './../../domain/lang.aggregate';

@Injectable()
export class CreateCredentialService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ILangRepository
    ) {}

    public async main(
        username: CredentialUsername,
        password: CredentialPassword,
        
        
    ): Promise<void>
    {
        // create object with factory pattern
        const lang = AdminLang.register(
            name,
            password,
            new LangCreatedAt(Utils.nowTimestamp()),
            new LangUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(lang);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const langRegister = this.publisher.mergeObjectContext(
            lang
        );
        
        langRegister.created(lang); // apply event to model events
        langRegister.commit(); // commit all events of model
    }
}