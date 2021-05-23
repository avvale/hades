import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindModuleQueryHandler } from './find-module.query-handler';
import { MockModuleRepository } from '@hades/cci/module/infrastructure/mock/mock-module.repository';
import { IModuleRepository } from '@hades/cci/module/domain/module.repository';
import { ModuleMapper } from '@hades/cci/module/domain/module.mapper';
import { FindModuleQuery } from './find-module.query';
import { FindModuleService } from './find-module.service';

describe('FindModuleQueryHandler', () =>
{
    let queryHandler: FindModuleQueryHandler;
    let service: FindModuleService;
    let repository: MockModuleRepository;
    let mapper: ModuleMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindModuleQueryHandler,
                {
                    provide: IModuleRepository,
                    useClass: MockModuleRepository
                },
                {
                    provide: FindModuleService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindModuleQueryHandler>(FindModuleQueryHandler);
        service         = module.get<FindModuleService>(FindModuleService);
        repository      = <MockModuleRepository>module.get<IModuleRepository>(IModuleRepository);
        mapper          = new ModuleMapper();
    });

    describe('main', () =>
    {
        test('FindModuleQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an module founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindModuleQuery()
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});