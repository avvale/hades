import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { CreateUserService } from './create-user.service';
import { 
    UserId,
    UserAccountId,
    UserName,
    UserSurname,
    UserAvatar,
    UserEmail,
    UserMobile,
    UserLangId,
    UserUsername,
    UserPassword,
    UserRememberToken,
    UserData
    
} from './../../domain/value-objects';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand>
{
    constructor(
        private readonly createUserService: CreateUserService
    ) { }

    async execute(command: CreateUserCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createUserService.main(
            new UserId(command.id),
            new UserAccountId(command.accountId),
            new UserName(command.name),
            new UserSurname(command.surname),
            new UserAvatar(command.avatar),
            new UserEmail(command.email),
            new UserMobile(command.mobile),
            new UserLangId(command.langId),
            new UserUsername(command.username),
            new UserPassword(command.password, {}, {haveToEncrypt: true}),
            new UserRememberToken(command.rememberToken),
            new UserData(command.data),
            
        );
    }
}