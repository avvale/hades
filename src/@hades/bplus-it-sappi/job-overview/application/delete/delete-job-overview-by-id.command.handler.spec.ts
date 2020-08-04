import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteJobOverviewByIdCommandHandler } from './delete-job-overview-by-id.command-handler';
import { jobsOverview } from '@hades/bplus-it-sappi/job-overview/infrastructure/seeds/job-overview.seed';
import { DeleteJobOverviewByIdCommand } from './delete-job-overview-by-id.command';
import { DeleteJobOverviewByIdService } from './delete-job-overview-by-id.service';

describe('DeleteJobOverviewByIdCommandHandler', () => 
{
    let commandHandler: DeleteJobOverviewByIdCommandHandler;
    let service: DeleteJobOverviewByIdService;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteJobOverviewByIdCommandHandler,
                {
                    provide: DeleteJobOverviewByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteJobOverviewByIdCommandHandler>(DeleteJobOverviewByIdCommandHandler);
        service         = module.get<DeleteJobOverviewByIdService>(DeleteJobOverviewByIdService);
    });

    describe('main', () => 
    {
        test('DeleteJobOverviewByIdCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteJobOverviewByIdService', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteJobOverviewByIdCommand(
                    jobsOverview[0].id,
                
                )
            )).toBe(undefined);
        });
    });
});