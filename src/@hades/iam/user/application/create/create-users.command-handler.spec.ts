import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { users } from '@hades/iam/user/infrastructure/seeds/user.seed';
import { CreateUsersCommandHandler } from './create-users.command-handler';
import { CreateUsersCommand } from './create-users.command';
import { CreateUsersService } from './create-users.service';

describe('CreateUsersCommandHandler', () =>
{
    let commandHandler: CreateUsersCommandHandler;
    let service: CreateUsersService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUsersCommandHandler,
                {
                    provide: CreateUsersService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<CreateUsersCommandHandler>(CreateUsersCommandHandler);
        service         = module.get<CreateUsersService>(CreateUsersService);
    });

    describe('main', () =>
    {
        test('CreateUsersCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an user created', async () =>
        {
            expect(await commandHandler.execute(
                new CreateUsersCommand(
                    users

                )
            )).toBe(undefined);
        });
    });
});