import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { jobsDetail } from '@hades/bplus-it-sappi/job-detail/infrastructure/seeds/job-detail.seed';
import { DeleteJobDetailByIdService } from './delete-job-detail-by-id.service';
import { JobDetailId } from './../../domain/value-objects';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { MockJobDetailRepository } from './../../infrastructure/mock/mock-job-detail.repository';

describe('DeleteJobDetailByIdService', () => 
{
    let service: DeleteJobDetailByIdService;
    let repository: IJobDetailRepository;
    let mockRepository: MockJobDetailRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteJobDetailByIdService,
                MockJobDetailRepository,
                { 
                    provide: IJobDetailRepository,
                    useValue: {
                        deleteById: (id) => {},
                        findById: (id) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteJobDetailByIdService);
        repository      = module.get(IJobDetailRepository);
        mockRepository  = module.get(MockJobDetailRepository);
    });

    describe('main', () => 
    {
        test('DeleteJobDetailByIdService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should delete jobDetail and emit event', async () => 
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new JobDetailId(jobsDetail[0].id)
            )).toBe(undefined);
        });
    });
});