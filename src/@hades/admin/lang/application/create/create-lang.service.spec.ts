import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';
import { CreateLangService } from './create-lang.service';
import { 
    LangId,
    LangName,
    LangImage,
    LangIso6392,
    LangIso6393,
    LangIetf,
    LangSort,
    LangIsActive
    
} from './../../domain/value-objects';
import { ILangRepository } from './../../domain/lang.repository';
import { MockLangRepository } from './../../infrastructure/mock/mock-lang.repository';

describe('CreateLangService', () => 
{
    let service: CreateLangService;
    let repository: ILangRepository;
    let mockRepository: MockLangRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateLangService,
                MockLangRepository,
                { 
                    provide: ILangRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateLangService);
        repository      = module.get(ILangRepository);
        mockRepository  = module.get(MockLangRepository);
    });

    describe('main', () => 
    {
        test('CreateLangService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a lang and emit event', async () => 
        {
            expect(await service.main(
                new LangId(langs[0].id),
                new LangName(langs[0].name),
                new LangImage(langs[0].image),
                new LangIso6392(langs[0].iso6392),
                new LangIso6393(langs[0].iso6393),
                new LangIetf(langs[0].ietf),
                new LangSort(langs[0].sort),
                new LangIsActive(langs[0].isActive),
                
            )).toBe(undefined);
        });
    });
});