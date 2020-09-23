import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { credentials } from '@hades/o-auth/credential/infrastructure/seeds/credential.seed';
import { FindCredentialByIdService } from './find-credential-by-id.service';
import { CredentialId } from './../../domain/value-objects';
import { ICredentialRepository } from './../../domain/credential.repository';
import { MockCredentialRepository } from './../../infrastructure/mock/mock-credential.repository';

describe('FindCredentialByIdService', () => 
{
    let service: FindCredentialByIdService;
    let repository: ICredentialRepository;
    let mockRepository: MockCredentialRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindCredentialByIdService,
                MockCredentialRepository,
                { 
                    provide: ICredentialRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindCredentialByIdService);
        repository      = module.get(ICredentialRepository);
        mockRepository  = module.get(MockCredentialRepository);
    });

    describe('main', () => 
    {
        test('FindCredentialByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find credential by id', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new CredentialId(credentials[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});