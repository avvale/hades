import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';

// custom items
import { PaginateActionsService } from './paginate-actions.service';
import { IActionRepository } from './../../domain/action.repository';
import { MockActionRepository } from './../../infrastructure/mock/mock-action.repository';

describe('PaginateActionsService', () => 
{
    let service: PaginateActionsService;
    let repository: IActionRepository;
    let mockRepository: MockActionRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateActionsService,
                MockActionRepository,
                { 
                    provide: IActionRepository,
                    useValue: {
                        paginate: (queryStatements, constraints) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(PaginateActionsService);
        repository      = module.get(IActionRepository);
        mockRepository  = module.get(MockActionRepository);
    });

    describe('main', () => 
    {
        test('PaginateActionsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should paginate actions', async () => 
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            })));
            expect(await service.main([
                {
                    'command': Command.OFFSET,
                    'value': 0
                },
                {
                    'command': Command.LIMIT,
                    'value': 10
                }
            ], [])).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            });
        });
    });
});