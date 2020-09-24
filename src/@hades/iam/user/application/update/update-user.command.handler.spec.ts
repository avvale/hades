import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateUserCommandHandler } from './update-user.command-handler';
import { users } from '@hades/iam/user/infrastructure/seeds/user.seed';
import { UpdateUserCommand } from './update-user.command';
import { UpdateUserService } from './update-user.service';

describe('UpdateUserCommandHandler', () => 
{
    let commandHandler: UpdateUserCommandHandler;
    let service: UpdateUserService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateUserCommandHandler,
                {
                    provide: UpdateUserService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateUserCommandHandler>(UpdateUserCommandHandler);
        service         = module.get<UpdateUserService>(UpdateUserService);
    });

    describe('main', () => 
    {
        test('UpdateUserCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an user created', async () => 
        {
            expect(await commandHandler.execute(
                new UpdateUserCommand(
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