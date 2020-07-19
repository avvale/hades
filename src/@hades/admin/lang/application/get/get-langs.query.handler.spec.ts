import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetLangsQueryHandler } from './get-langs.query-handler';
import { MockLangRepository } from '@hades/admin/lang/infrastructure/mock/mock-lang.repository';
import { ILangRepository } from '@hades/admin/lang/domain/lang.repository';
import { LangMapper } from '@hades/admin/lang/domain/lang.mapper';

import { GetLangsQuery } from './get-langs.query';
import { GetLangsService } from './get-langs.service';

describe('GetLangsQueryHandler', () => 
{
    let queryHandler: GetLangsQueryHandler;
    let service: GetLangsService;
    let repository: MockLangRepository;
    let mapper: LangMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetLangsQueryHandler,
                {
                    provide: ILangRepository,
                    useClass: MockLangRepository
                },
                {
                    provide: GetLangsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetLangsQueryHandler>(GetLangsQueryHandler);
        service         = module.get<GetLangsService>(GetLangsService);
        repository      = <MockLangRepository>module.get<ILangRepository>(ILangRepository);
        mapper          = new LangMapper();
    });

    it('GetLangsQueryHandler should be defined', () => 
    {
        expect(queryHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('GetLangsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        it('should return an langs founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetLangsQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});