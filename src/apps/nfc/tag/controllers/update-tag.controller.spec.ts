import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { UpdateTagController } from './update-tag.controller';
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { tags } from '@hades/nfc/tag/infrastructure/seeds/tag.seed';

describe('UpdateTagController', () => 
{
    let controller: UpdateTagController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                UpdateTagController
            ],
            providers: [
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {},
                    }
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {},
                    }
                },
            ]
        }).compile();

        controller  = module.get<UpdateTagController>(UpdateTagController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    it('UpdateTagController should be defined', () => 
    {
        expect(controller).toBeDefined();
    });

    // Test get method
    describe('main', () => 
    {
        it('UpdateTagController should be defined', () => 
        {
            expect(controller).toBeDefined();
        });

        it('should return a tag created', async () => 
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tags[0])));
            expect(await controller.main(tags[0])).toBe(tags[0]);
        });
    });
});