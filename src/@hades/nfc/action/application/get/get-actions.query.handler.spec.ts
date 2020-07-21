import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { GetActionsQueryHandler } from './get-actions.query-handler';
import { MockActionRepository } from '@hades/nfc/action/infrastructure/mock/mock-action.repository';
import { IActionRepository } from '@hades/nfc/action/domain/action.repository';
import { ActionMapper } from '@hades/nfc/action/domain/action.mapper';
import { GetActionsQuery } from './get-actions.query';
import { GetActionsService } from './get-actions.service';

describe('GetActionsQueryHandler', () => 
{
    let queryHandler: GetActionsQueryHandler;
    let service: GetActionsService;
    let repository: MockActionRepository;
    let mapper: ActionMapper;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetActionsQueryHandler,
                {
                    provide: IActionRepository,
                    useClass: MockActionRepository
                },
                {
                    provide: GetActionsService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<GetActionsQueryHandler>(GetActionsQueryHandler);
        service         = module.get<GetActionsService>(GetActionsService);
        repository      = <MockActionRepository>module.get<IActionRepository>(IActionRepository);
        mapper          = new ActionMapper();
    });

    describe('main', () => 
    {
        test('GetActionsQueryHandler should be defined', () => 
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an actions founded', async () => 
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource)));
            expect(await queryHandler.execute(
                new GetActionsQuery()
            )).toStrictEqual(mapper.mapAggregatesToResponses(repository.collectionSource));
        });
    });
});