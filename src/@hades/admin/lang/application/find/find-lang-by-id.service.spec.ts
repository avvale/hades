import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';
import { FindLangByIdService } from './find-lang-by-id.service';
import { LangId } from './../../domain/value-objects';
import { ILangRepository } from './../../domain/lang.repository';
import { MockLangRepository } from './../../infrastructure/mock/mock-lang.repository';

describe('FindLangByIdService', () => 
{
    let service: FindLangByIdService;
    let repository: ILangRepository;
    let mockRepository: MockLangRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindLangByIdService,
                MockLangRepository,
                { 
                    provide: ILangRepository,
                    useValue: {
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindLangByIdService);
        repository      = module.get(ILangRepository);
        mockRepository  = module.get(MockLangRepository);
    });

    describe('main', () => 
    {
        test('FindLangByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should find lang by id', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new LangId(langs[0].id)
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});