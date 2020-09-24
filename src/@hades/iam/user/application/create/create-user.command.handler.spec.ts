import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CreateUserCommandHandler } from './create-user.command-handler';
import { users } from '@hades/iam/user/infrastructure/seeds/user.seed';
import { CreateUserCommand } from './create-user.command';
import { CreateUserService } from './create-user.service';

describe('CreateUserCommandHandler', () => 
{
    let commandHandler: CreateUserCommandHandler;
    let service: CreateUserService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUserCommandHandler,
                {
                    provide: CreateUserService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateUserCommandHandler>(CreateUserCommandHandler);
        service         = module.get<CreateUserService>(CreateUserService);
    });

    describe('main', () => 
    {
        test('CreateUserCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateUserService', async () => 
        {
            expect(await commandHandler.execute(
                new CreateUserCommand(
                    users[0].id,
                    users[0].accountId,
                    users[0].surname,
                    users[0].avatar,
                    users[0].email,
                    users[0].mobile,
                    users[0].langId,
                    users[0].username,
                    users[0].password,
                    users[0].rememberToken,
                    users[0].data,
                    
                )
            )).toBe(undefined);
        });
    });
});