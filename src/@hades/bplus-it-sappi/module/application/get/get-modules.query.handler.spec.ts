import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetModulesQueryHandler } from './get-modules.query-handler';
import { MockModuleRepository } from '@hades/bplus-it-sappi/module/infrastructure/mock/mock-module.repository';
import { IModuleRepository } from '@hades/bplus-it-sappi/module/domain/module.repository';
import { ModuleMapper } from '@hades/bplus-it-sappi/module/domain/module.mapper';
import { GetModulesQuery } from './get-modules.query';
import { GetModulesService } from './get-modules.service';

describe('GetModulesQueryHandler', () => 
{
    let queryHandler: GetModulesQueryHandler;
    let service: GetModulesService;
    let repository: MockModuleRepository;
    let mapper: ModuleMapper;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetModulesQueryHandler,
                {
                    provide: IModuleRepository,
                    useClass: MockModuleRepository
                },
                {
                    provide: GetModulesService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetModulesQueryHandler>(GetModulesQueryHandler);
        service         = module.get<GetModulesService>(GetModulesService);
        repository      = <MockModuleRepository>module.get<IModuleRepository>(IModuleRepository);
        mapper          = new ModuleMapper();
    });

    describe('main', () => 
    {
        test('GetModulesQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an modules founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetModulesQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});