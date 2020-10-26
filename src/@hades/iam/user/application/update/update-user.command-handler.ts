import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { UpdateUserService } from './update-user.service';
import {
    UserId,
    UserAccountId,
    UserName,
    UserSurname,
    UserAvatar,
    UserMobile,
    UserLangId,
    UserUsername,
    UserPassword,
    UserRememberToken,
    UserData
    
} from './../../domain/value-objects';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand>
{
    constructor(
        private readonly updateUserService: UpdateUserService
    ) {}

    async execute(command: UpdateUserCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateUserService.main(
            new UserId(command.id),
            new UserAccountId(command.accountId, { undefinable: true }),
            new UserName(command.name, { undefinable: true }),
            new UserSurname(command.surname),
            new UserAvatar(command.avatar),
            new UserMobile(command.mobile),
            new UserLangId(command.langId),
            new UserUsername(command.username, { undefinable: true }),
            new UserPassword(command.password === '' ? undefined : command.password, { undefinable: true }, { haveToEncrypt: true }),
            new UserRememberToken(command.rememberToken),
            new UserData(command.data),
            
        )
    }
}