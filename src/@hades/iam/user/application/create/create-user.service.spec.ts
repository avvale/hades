import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { users } from '@hades/iam/user/infrastructure/seeds/user.seed';
import { CreateUserService } from './create-user.service';
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
import { IUserRepository } from './../../domain/user.repository';
import { MockUserRepository } from './../../infrastructure/mock/mock-user.repository';

describe('CreateUserService', () => 
{
    let service: CreateUserService;
    let repository: IUserRepository;
    let mockRepository: MockUserRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateUserService,
                MockUserRepository,
                { 
                    provide: IUserRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateUserService);
        repository      = module.get(IUserRepository);
        mockRepository  = module.get(MockUserRepository);
    });

    describe('main', () => 
    {
        test('CreateUserService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a user and emit event', async () => 
        {
            expect(await service.main(
                new UserId(users[0].id),
                new UserAccountId(users[0].accountId),
                new UserName(users[0].name),
                new UserSurname(users[0].surname),
                new UserAvatar(users[0].avatar),
                new UserMobile(users[0].mobile),
                new UserLangId(users[0].langId),
                new UserUsername(users[0].username),
                new UserPassword(users[0].password),
                new UserRememberToken(users[0].rememberToken),
                new UserData(users[0].data),
                
            )).toBe(undefined);
        });
    });
});