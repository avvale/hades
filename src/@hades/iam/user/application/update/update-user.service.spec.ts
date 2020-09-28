import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { users } from '@hades/iam/user/infrastructure/seeds/user.seed';
import { UpdateUserService } from './update-user.service';
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
    UserData,
    UserCreatedAt,
    UserUpdatedAt,
    UserDeletedAt
    
} from './../../domain/value-objects';
import { IUserRepository } from './../../domain/user.repository';
import { MockUserRepository } from './../../infrastructure/mock/mock-user.repository';

describe('UpdateUserService', () => 
{
    let service: UpdateUserService;
    let repository: IUserRepository;
    let mockRepository: MockUserRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpdateUserService,
                MockUserRepository,
                { 
                    provide: IUserRepository,
                    useValue: {
                        update: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(UpdateUserService);
        repository      = module.get(IUserRepository);
        mockRepository  = module.get(MockUserRepository);
    });

    describe('main', () => 
    {
        test('UpdateUserService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should update a user and emit event', async () => 
        {
            expect(await service.main(
                new UserId(users[0].id),
                new UserAccountId(users[0].accountId),
                new UserName(users[0].name),
                new UserSurname(users[0].surname),
                new UserAvatar(users[0].avatar),
                new UserEmail(users[0].email),
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