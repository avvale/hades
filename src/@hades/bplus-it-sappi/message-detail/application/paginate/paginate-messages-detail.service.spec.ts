import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';

// custom items
import { PaginateMessagesDetailService } from './paginate-messages-detail.service';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { MockMessageDetailRepository } from './../../infrastructure/mock/mock-message-detail.repository';

describe('PaginateMessagesDetailService', () => 
{
    let service: PaginateMessagesDetailService;
    let repository: IMessageDetailRepository;
    let mockRepository: MockMessageDetailRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateMessagesDetailService,
                MockMessageDetailRepository,
                { 
                    provide: IMessageDetailRepository,
                    useValue: {
                        paginate: (queryStatements, constraints) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(PaginateMessagesDetailService);
        repository      = module.get(IMessageDetailRepository);
        mockRepository  = module.get(MockMessageDetailRepository);
    });

    describe('main', () => 
    {
        test('PaginateMessagesDetailService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should paginate messagesDetail', async () => 
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