import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindLangQueryHandler } from './find-lang.query-handler';
import { MockLangRepository } from '@hades/admin/lang/infrastructure/mock/mock-lang.repository';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed';
import { ILangRepository } from '@hades/admin/lang/domain/lang.repository';
import { LangMapper } from '@hades/admin/lang/domain/lang.mapper';

import { FindLangQuery } from './find-lang.query';
import { FindLangService } from './find-lang.service';

describe('FindLangQueryHandler', () => 
{
    let queryHandler: FindLangQueryHandler;
    let service: FindLangService;
    let repository: MockLangRepository;
    let mapper: LangMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindLangQueryHandler,
                {
                    provide: ILangRepository,
                    useClass: MockLangRepository
                },
                {
                    provide: FindLangService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindLangQueryHandler>(FindLangQueryHandler);
        service         = module.get<FindLangService>(FindLangService);
        repository      = <MockLangRepository>module.get<ILangRepository>(ILangRepository);
        mapper          = new LangMapper();
    });

    it('FindLangQueryHandler should be defined', () => 
    {
        expect(queryHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('FindLangQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        it('should return an lang founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindLangQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});