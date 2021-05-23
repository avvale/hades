import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateJobsDetailService } from './create-jobs-detail.service';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { MockJobDetailRepository } from './../../infrastructure/mock/mock-job-detail.repository';

describe('CreateJobsDetailService', () =>
{
    let service: CreateJobsDetailService;
    let repository: IJobDetailRepository;
    let mockRepository: MockJobDetailRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateJobsDetailService,
                MockJobDetailRepository,
                {
                    provide: IJobDetailRepository,
                    useValue: {
                        insert: (items) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateJobsDetailService);
        repository      = module.get(IJobDetailRepository);
        mockRepository  = module.get(MockJobDetailRepository);
    });

    describe('main', () =>
    {
        test('CreateJobsDetailService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create jobsDetail and emit event', async () =>
        {
            expect(await service.main(
                mockRepository.collectionSource
            )).toBe(undefined);
        });
    });
});