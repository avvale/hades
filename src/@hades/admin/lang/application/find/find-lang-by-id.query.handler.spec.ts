import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindLangByIdQueryHandler } from './find-lang-by-id.query-handler';
import { MockLangRepository } from '@hades/admin/lang/infrastructure/mock/mock-lang.repository';
import { langs } from '@hades/admin/lang/infrastructure/seeds/lang.seed'
import { ILangRepository } from '@hades/admin/lang/domain/lang.repository';
import { SequelizeLangMapper } from '@hades/admin/lang/infrastructure/sequelize/sequelize-lang.mapper';

import { FindLangByIdQuery } from './find-lang-by-id.query';
import { FindLangByIdService } from './find-lang-by-id.service';

describe('FindLangByIdQueryHandler', () => 
{
    let queryHandler: FindLangByIdQueryHandler;
    let service: FindLangByIdService;
    let repository: MockLangRepository;
    let mapper: SequelizeLangMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindLangByIdQueryHandler,
                {
                    provide: ILangRepository,
                    useClass: MockLangRepository
                },
                {
                    provide: FindLangByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindLangByIdQueryHandler>(FindLangByIdQueryHandler);
        service         = module.get<FindLangByIdService>(FindLangByIdService);
        repository      = <MockLangRepository>module.get<ILangRepository>(ILangRepository);
        mapper          = new SequelizeLangMapper();
    });

    it('FindLangByIdQueryHandler should be defined', () => 
    {
        expect(queryHandler).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('FindLangByIdQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        it('should return an lang founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindLangByIdQuery(
                    langs[0].id,
                
                )
            )).toStrictEqual(mapper.mapToResponse(repository.collectionSource[0]));
        });
    });
});