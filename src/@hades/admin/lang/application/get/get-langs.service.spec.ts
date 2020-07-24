import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetLangsService } from './get-langs.service';
import { ILangRepository } from './../../domain/lang.repository';
import { MockLangRepository } from './../../infrastructure/mock/mock-lang.repository';

describe('GetLangsService', () => 
{
    let service: GetLangsService;
    let repository: ILangRepository;
    let mockRepository: MockLangRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetLangsService,
                MockLangRepository,
                { 
                    provide: ILangRepository,
                    useValue: {
                        get: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(GetLangsService);
        repository      = module.get(ILangRepository);
        mockRepository  = module.get(MockLangRepository);
    });

    describe('main', () => 
    {
        it('GetLangsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should get langs', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main([])).toBe(mockRepository.collectionSource);
        });
    });
});