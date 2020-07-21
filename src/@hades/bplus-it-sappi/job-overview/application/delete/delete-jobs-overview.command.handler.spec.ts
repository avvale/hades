import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteJobsOverviewCommandHandler } from './delete-jobs-overview.command-handler';
import { DeleteJobsOverviewCommand } from './delete-jobs-overview.command';
import { DeleteJobsOverviewService } from './delete-jobs-overview.service';

describe('DeleteJobsOverviewCommandHandler', () => 
{
    let commandHandler: DeleteJobsOverviewCommandHandler;
    let service: DeleteJobsOverviewService;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteJobsOverviewCommandHandler,
                {
                    provide: DeleteJobsOverviewService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<DeleteJobsOverviewCommandHandler>(DeleteJobsOverviewCommandHandler);
        service         = module.get<DeleteJobsOverviewService>(DeleteJobsOverviewService);
    });

    describe('main', () => 
    {
        test('DeleteJobsOverviewCommandHandler should be defined', () => 
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => 
        {
            expect(await commandHandler.execute(
                new DeleteJobsOverviewCommand()
            )).toBe(undefined);
        });
    });
});