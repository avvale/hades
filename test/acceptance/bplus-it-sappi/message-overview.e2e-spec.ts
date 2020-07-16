import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageOverviewRepository } from '@hades/bplus-it-sappi/message-overview/domain/message-overview.repository';
import { MockMessageOverviewRepository } from '@hades/bplus-it-sappi/message-overview/infrastructure/mock/mock-message-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('message-overview', () => 
{
    let app: INestApplication;
    let repository: MockMessageOverviewRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    BplusItSappiModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IMessageOverviewRepository)
            .useClass(MockMessageOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockMessageOverviewRepository>module.get<IMessageOverviewRepository>(IMessageOverviewRepository);

        await app.init();
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: '6yxp4r9phka5xg00allp',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 05:40:56',
                executionMonitoringStartAt: '2020-07-16 13:48:28',
                executionMonitoringEndAt: '2020-07-16 14:31:13',
                numberMax: 4351760250,
                numberDays: 6674979051,
                success: 1852500329,
                cancelled: 5527456405,
                delivering: 8952055015,
                error: 5389202363,
                holding: 3342810719,
                toBeDelivered: 5612771589,
                waiting: 8568457937,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: '9cq49a2c2rl57lz7ybvm',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 08:34:06',
                executionMonitoringStartAt: '2020-07-16 11:03:30',
                executionMonitoringEndAt: '2020-07-16 09:48:56',
                numberMax: 7533399317,
                numberDays: 1272360822,
                success: 6709869502,
                cancelled: 7146707938,
                delivering: 3287971822,
                error: 4510629168,
                holding: 5406056566,
                toBeDelivered: 2854665098,
                waiting: 9614374235,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: null,
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: '5gimf5y07d5kdpktn0b3',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 06:47:52',
                executionMonitoringStartAt: '2020-07-16 16:14:52',
                executionMonitoringEndAt: '2020-07-16 06:32:01',
                numberMax: 6163170951,
                numberDays: 2352191446,
                success: 3157157522,
                cancelled: 3852258158,
                delivering: 8040328356,
                error: 8121884340,
                holding: 7945215226,
                toBeDelivered: 9908663216,
                waiting: 4629517360,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'e74wsjry3mkzemkvhfqe',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 21:23:00',
                executionMonitoringStartAt: '2020-07-15 21:31:16',
                executionMonitoringEndAt: '2020-07-16 06:32:09',
                numberMax: 4007409634,
                numberDays: 7676529544,
                success: 6100311073,
                cancelled: 1665591500,
                delivering: 3456606026,
                error: 5312971902,
                holding: 1644217441,
                toBeDelivered: 9858802696,
                waiting: 1833172432,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: null,
                systemName: '2hhq4uig1b5yb9nki520',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 00:38:02',
                executionMonitoringStartAt: '2020-07-16 03:18:18',
                executionMonitoringEndAt: '2020-07-16 00:19:54',
                numberMax: 2174589966,
                numberDays: 3069530194,
                success: 1210806735,
                cancelled: 1372071968,
                delivering: 3894391450,
                error: 2103381695,
                holding: 8715239677,
                toBeDelivered: 5790909490,
                waiting: 6311699497,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                
                systemName: 'fmzo2h9lzzlfjwh0t9zs',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 10:14:37',
                executionMonitoringStartAt: '2020-07-15 21:22:34',
                executionMonitoringEndAt: '2020-07-16 10:08:35',
                numberMax: 7975860861,
                numberDays: 5560282602,
                success: 4591870688,
                cancelled: 9907478921,
                delivering: 1838526719,
                error: 2387685685,
                holding: 7392059766,
                toBeDelivered: 6430193342,
                waiting: 8706932735,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: null,
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 12:48:30',
                executionMonitoringStartAt: '2020-07-16 08:25:03',
                executionMonitoringEndAt: '2020-07-16 09:26:26',
                numberMax: 5624720051,
                numberDays: 5040143692,
                success: 3150873921,
                cancelled: 1590981166,
                delivering: 7243917167,
                error: 9710880761,
                holding: 3684498590,
                toBeDelivered: 7784347812,
                waiting: 7976991371,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 05:29:02',
                executionMonitoringStartAt: '2020-07-16 08:02:11',
                executionMonitoringEndAt: '2020-07-16 07:27:17',
                numberMax: 3761181950,
                numberDays: 6428985311,
                success: 3356669943,
                cancelled: 8997800355,
                delivering: 2041388830,
                error: 7162938817,
                holding: 6897925584,
                toBeDelivered: 6384968652,
                waiting: 9260188634,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'kwv5426eal7oufxpo35n',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 06:47:04',
                executionMonitoringStartAt: '2020-07-16 02:04:19',
                executionMonitoringEndAt: '2020-07-16 01:46:49',
                numberMax: 8716805377,
                numberDays: 6123911681,
                success: 9067515750,
                cancelled: 7015151842,
                delivering: 6815997870,
                error: 5935786553,
                holding: 5189442433,
                toBeDelivered: 5698997910,
                waiting: 7360141214,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'swqmuxwdik2bigc4bi44',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 21:22:52',
                executionMonitoringStartAt: '2020-07-16 07:51:02',
                executionMonitoringEndAt: '2020-07-16 10:35:37',
                numberMax: 3081718607,
                numberDays: 2809419431,
                success: 1053992908,
                cancelled: 5649214199,
                delivering: 2548605199,
                error: 9984116325,
                holding: 9083091367,
                toBeDelivered: 7947303160,
                waiting: 5969568620,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: '1mbpqyqelivqf9njuf10',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: null,
                executionExecutedAt: '2020-07-16 12:29:15',
                executionMonitoringStartAt: '2020-07-15 21:12:08',
                executionMonitoringEndAt: '2020-07-16 10:09:31',
                numberMax: 5213716294,
                numberDays: 4160381048,
                success: 9088964943,
                cancelled: 1819071165,
                delivering: 7735194536,
                error: 8780267016,
                holding: 4817152560,
                toBeDelivered: 4014605406,
                waiting: 9644668245,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: '5p6kky6fm12w5xbx60y3',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                
                executionExecutedAt: '2020-07-15 19:49:07',
                executionMonitoringStartAt: '2020-07-15 23:42:56',
                executionMonitoringEndAt: '2020-07-16 09:44:28',
                numberMax: 9217133235,
                numberDays: 1504003242,
                success: 3609221471,
                cancelled: 6265193268,
                delivering: 7190878979,
                error: 4982972380,
                holding: 4073022518,
                toBeDelivered: 3024236454,
                waiting: 2450276079,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'lh52xdzzebvwwt010lkj',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-15 20:07:34',
                executionMonitoringEndAt: '2020-07-16 03:06:02',
                numberMax: 4572084580,
                numberDays: 9048121541,
                success: 8555612573,
                cancelled: 8698423646,
                delivering: 9415409206,
                error: 2675763835,
                holding: 9646706088,
                toBeDelivered: 4344010315,
                waiting: 2762664720,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'sbwn2ak7w0ytz21hv2tb',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-16 09:03:51',
                executionMonitoringEndAt: '2020-07-16 11:56:35',
                numberMax: 3129570677,
                numberDays: 7539868195,
                success: 8838675750,
                cancelled: 2082396304,
                delivering: 5499150007,
                error: 9472862847,
                holding: 4439107943,
                toBeDelivered: 3455102978,
                waiting: 1501582918,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'tn2p2lu8kimkevc2hwsk',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 19:31:53',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-16 02:07:54',
                numberMax: 4142593943,
                numberDays: 1901328587,
                success: 7293930002,
                cancelled: 6840022021,
                delivering: 4105703320,
                error: 2086834180,
                holding: 6508425672,
                toBeDelivered: 8748047150,
                waiting: 2000175745,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'mzj76mp344unr43tctan',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 21:38:46',
                
                executionMonitoringEndAt: '2020-07-16 17:16:20',
                numberMax: 3601219829,
                numberDays: 8408308750,
                success: 8885115662,
                cancelled: 3426647569,
                delivering: 5173438722,
                error: 1507443091,
                holding: 3852306303,
                toBeDelivered: 7265957754,
                waiting: 7995965162,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: '32urqmaebr1ryp10hqp8',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 23:09:06',
                executionMonitoringStartAt: '2020-07-15 19:17:38',
                executionMonitoringEndAt: null,
                numberMax: 9462484035,
                numberDays: 4619486017,
                success: 4979045168,
                cancelled: 9704788432,
                delivering: 1956631962,
                error: 9612965924,
                holding: 9485220918,
                toBeDelivered: 9855181090,
                waiting: 7408455806,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: '9qwcl1ttt6y7gp1s6kuq',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 08:48:12',
                executionMonitoringStartAt: '2020-07-15 21:26:12',
                
                numberMax: 4131221026,
                numberDays: 9438421426,
                success: 4510235682,
                cancelled: 8400092638,
                delivering: 5337313072,
                error: 3639934057,
                holding: 4736446281,
                toBeDelivered: 4124674234,
                waiting: 9215038502,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'rkd0c3sjv1ozyjko6qnccvfad356t753anoi5',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'uqggm1m2h1iurpyae1n1',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 11:08:07',
                executionMonitoringStartAt: '2020-07-16 17:07:41',
                executionMonitoringEndAt: '2020-07-16 16:43:12',
                numberMax: 6754255118,
                numberDays: 3515452018,
                success: 4485760777,
                cancelled: 9130964027,
                delivering: 3553980970,
                error: 5474028508,
                holding: 9500179763,
                toBeDelivered: 2098691359,
                waiting: 4142598088,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'a533pmznho3ypte4nr0dpoe4ccz8rficuat28',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'bvgphdrx3ajci40cdtqu',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 07:49:19',
                executionMonitoringStartAt: '2020-07-16 13:00:54',
                executionMonitoringEndAt: '2020-07-16 14:30:25',
                numberMax: 4922379598,
                numberDays: 6931798277,
                success: 9298033895,
                cancelled: 3691285644,
                delivering: 9856822992,
                error: 5437120208,
                holding: 4069291282,
                toBeDelivered: 7066831196,
                waiting: 8668639563,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'gaadob14mr48nx7c9cg4arv1i0p4gbw5coguj',
                systemName: 'al9du7xvso9rco95kmnn',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 18:39:53',
                executionMonitoringStartAt: '2020-07-16 03:25:01',
                executionMonitoringEndAt: '2020-07-16 13:48:03',
                numberMax: 8615581329,
                numberDays: 5510707510,
                success: 6127419956,
                cancelled: 6675337221,
                delivering: 5161834894,
                error: 8789188667,
                holding: 4644595048,
                toBeDelivered: 5239869457,
                waiting: 9967688903,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'rhb87mslgn1bcpg73hzb',
                executionId: 'wi93i09hjyju6moe6dj0olzo0h2uiljk9ie29',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 07:07:22',
                executionMonitoringStartAt: '2020-07-15 21:57:02',
                executionMonitoringEndAt: '2020-07-16 16:20:50',
                numberMax: 5076123462,
                numberDays: 3407371834,
                success: 3878230643,
                cancelled: 1095538236,
                delivering: 8792167546,
                error: 5347388361,
                holding: 2716394460,
                toBeDelivered: 7225767589,
                waiting: 3019744931,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'g69lis5jp460dwfx5wb3a',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 08:32:18',
                executionMonitoringStartAt: '2020-07-16 01:19:43',
                executionMonitoringEndAt: '2020-07-16 00:03:27',
                numberMax: 1785346911,
                numberDays: 9799957214,
                success: 1345268854,
                cancelled: 2066941900,
                delivering: 4975027752,
                error: 3908583423,
                holding: 1947765233,
                toBeDelivered: 1060694408,
                waiting: 8886257747,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberMax is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'wmfgujdv0pzyokkxtd2b',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 23:53:25',
                executionMonitoringStartAt: '2020-07-16 02:17:05',
                executionMonitoringEndAt: '2020-07-16 15:27:18',
                numberMax: 57516547747,
                numberDays: 4777520967,
                success: 2933801735,
                cancelled: 5050293524,
                delivering: 4712910247,
                error: 3180446182,
                holding: 6728283241,
                toBeDelivered: 6530829794,
                waiting: 3573988815,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberMax is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberDays is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'on5nb78jc8rcdiqedex6',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 12:21:01',
                executionMonitoringStartAt: '2020-07-16 05:08:29',
                executionMonitoringEndAt: '2020-07-16 07:40:11',
                numberMax: 6400121047,
                numberDays: 14489461097,
                success: 7776244165,
                cancelled: 6391405700,
                delivering: 4172810809,
                error: 3841233514,
                holding: 6167085331,
                toBeDelivered: 2119885421,
                waiting: 8639047499,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberDays is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSuccess is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'y3ailm47lykt6xi5pkha',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 00:24:24',
                executionMonitoringStartAt: '2020-07-16 19:08:25',
                executionMonitoringEndAt: '2020-07-16 09:57:19',
                numberMax: 2101389697,
                numberDays: 3662806069,
                success: 42345348969,
                cancelled: 8955493050,
                delivering: 5917546139,
                error: 8926586963,
                holding: 4472362076,
                toBeDelivered: 7177448806,
                waiting: 2742240929,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSuccess is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'gqgfyjsxbldzcxy2fl11',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 04:33:36',
                executionMonitoringStartAt: '2020-07-16 09:25:07',
                executionMonitoringEndAt: '2020-07-16 06:19:53',
                numberMax: 6464325635,
                numberDays: 3741086296,
                success: 8075370325,
                cancelled: 38953511185,
                delivering: 8353428674,
                error: 8531036019,
                holding: 5173677563,
                toBeDelivered: 3052275710,
                waiting: 7538803889,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewCancelled is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewDelivering is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'kzdxfthzauuherzujwje',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 23:13:37',
                executionMonitoringStartAt: '2020-07-16 09:00:44',
                executionMonitoringEndAt: '2020-07-15 19:48:29',
                numberMax: 1457343206,
                numberDays: 7328395177,
                success: 6716465588,
                cancelled: 6363535641,
                delivering: 68679047245,
                error: 7520347684,
                holding: 2275375617,
                toBeDelivered: 7517286333,
                waiting: 5044654175,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewDelivering is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'f40256q42dl58v8whixt',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 01:45:31',
                executionMonitoringStartAt: '2020-07-16 10:15:21',
                executionMonitoringEndAt: '2020-07-15 19:29:10',
                numberMax: 6833814915,
                numberDays: 4476955713,
                success: 2560466203,
                cancelled: 8579649732,
                delivering: 6989868744,
                error: 95635429629,
                holding: 2622728373,
                toBeDelivered: 9082571027,
                waiting: 9674755592,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewError is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewHolding is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: '6o6kcho09tsbfqkme244',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 09:16:03',
                executionMonitoringStartAt: '2020-07-16 05:04:04',
                executionMonitoringEndAt: '2020-07-16 01:58:24',
                numberMax: 2076081847,
                numberDays: 1462475240,
                success: 8035022106,
                cancelled: 1786677769,
                delivering: 5354155042,
                error: 1585195231,
                holding: 52537411076,
                toBeDelivered: 5299807505,
                waiting: 5845781314,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewHolding is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'ju25awrg60imyxl3ort3',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 19:38:08',
                executionMonitoringStartAt: '2020-07-15 19:14:26',
                executionMonitoringEndAt: '2020-07-16 18:13:00',
                numberMax: 2323801477,
                numberDays: 6158841673,
                success: 6283805986,
                cancelled: 8908640148,
                delivering: 5943628763,
                error: 8468637522,
                holding: 5921691348,
                toBeDelivered: 30867740565,
                waiting: 8683145252,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewToBeDelivered is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewWaiting is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'vzwcr3dlaescfs6w2d9y',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 06:37:55',
                executionMonitoringStartAt: '2020-07-16 16:15:08',
                executionMonitoringEndAt: '2020-07-16 05:46:11',
                numberMax: 3148270112,
                numberDays: 6336554166,
                success: 1650996503,
                cancelled: 7112504533,
                delivering: 3662372423,
                error: 9262597796,
                holding: 2324816981,
                toBeDelivered: 1840764002,
                waiting: 20462977493,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewWaiting is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberMax must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'zm0iy0qv5vjd40lae4ea',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 14:00:11',
                executionMonitoringStartAt: '2020-07-16 03:31:57',
                executionMonitoringEndAt: '2020-07-15 19:27:05',
                numberMax: -9,
                numberDays: 6128214730,
                success: 7460080319,
                cancelled: 4549635690,
                delivering: 4292146088,
                error: 9659642491,
                holding: 9033229207,
                toBeDelivered: 6690393006,
                waiting: 5839062119,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberMax must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberDays must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'emm7jr4out79w9o3ji2j',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 17:37:41',
                executionMonitoringStartAt: '2020-07-16 17:25:30',
                executionMonitoringEndAt: '2020-07-16 02:41:38',
                numberMax: 1642576193,
                numberDays: -9,
                success: 2729452228,
                cancelled: 4215831782,
                delivering: 1742554006,
                error: 3578327089,
                holding: 4163197779,
                toBeDelivered: 1825493845,
                waiting: 6888824128,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberDays must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSuccess must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'mtj0okovvll0lty4dmsm',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 14:55:46',
                executionMonitoringStartAt: '2020-07-15 21:35:11',
                executionMonitoringEndAt: '2020-07-16 09:06:05',
                numberMax: 5977423050,
                numberDays: 2566068001,
                success: -9,
                cancelled: 7022677226,
                delivering: 8552733999,
                error: 6701718552,
                holding: 9040150651,
                toBeDelivered: 1843049748,
                waiting: 4844557828,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewSuccess must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewCancelled must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'zy1asn8jvei2xe34dn09',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 06:33:17',
                executionMonitoringStartAt: '2020-07-16 13:41:33',
                executionMonitoringEndAt: '2020-07-16 08:55:11',
                numberMax: 1503822061,
                numberDays: 8425658111,
                success: 3211969375,
                cancelled: -9,
                delivering: 5617997275,
                error: 8374461628,
                holding: 2724817454,
                toBeDelivered: 9176169192,
                waiting: 7675238671,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewCancelled must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewDelivering must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'a046wrepuwfwgykrojyi',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 07:33:31',
                executionMonitoringStartAt: '2020-07-16 01:00:58',
                executionMonitoringEndAt: '2020-07-16 07:17:42',
                numberMax: 2731841373,
                numberDays: 1633190832,
                success: 4042457001,
                cancelled: 6194461294,
                delivering: -9,
                error: 2342032431,
                holding: 3224574312,
                toBeDelivered: 5450172502,
                waiting: 5131156783,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewDelivering must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'g7mcnfdde5qnys1q2c0x',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 07:23:05',
                executionMonitoringStartAt: '2020-07-16 15:13:32',
                executionMonitoringEndAt: '2020-07-16 06:35:41',
                numberMax: 7002660039,
                numberDays: 5434146565,
                success: 1826168404,
                cancelled: 9830054777,
                delivering: 8959488570,
                error: -9,
                holding: 8132774644,
                toBeDelivered: 6232371523,
                waiting: 6651115053,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewHolding must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'ecouqkltm0k8y9kcehdz',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 12:40:26',
                executionMonitoringStartAt: '2020-07-16 02:15:34',
                executionMonitoringEndAt: '2020-07-16 11:45:47',
                numberMax: 7970322849,
                numberDays: 3438845040,
                success: 7241618606,
                cancelled: 5792642400,
                delivering: 3308424381,
                error: 7263135594,
                holding: -9,
                toBeDelivered: 9616830376,
                waiting: 6456654755,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewHolding must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'xr4mzpzr2wbhdn2ikwoz',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 16:33:25',
                executionMonitoringStartAt: '2020-07-16 03:10:05',
                executionMonitoringEndAt: '2020-07-16 06:41:40',
                numberMax: 9259578557,
                numberDays: 5681581002,
                success: 4698221235,
                cancelled: 6427577038,
                delivering: 7170696886,
                error: 7751863556,
                holding: 7398272118,
                toBeDelivered: -9,
                waiting: 8297233647,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewToBeDelivered must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewWaiting must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'ahcivtoe1m5hrl8k3cak',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 15:26:56',
                executionMonitoringStartAt: '2020-07-16 09:19:14',
                executionMonitoringEndAt: '2020-07-16 13:27:07',
                numberMax: 1249027456,
                numberDays: 5745211626,
                success: 4916239665,
                cancelled: 8388111722,
                delivering: 9618090217,
                error: 4394472064,
                holding: 5481066734,
                toBeDelivered: 2342615369,
                waiting: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewWaiting must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 't6znddd1rtngveuswiec',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-16 16:04:27',
                executionMonitoringStartAt: '2020-07-16 06:06:49',
                executionMonitoringEndAt: '2020-07-16 09:46:31',
                numberMax: 6646987651,
                numberDays: 3893516478,
                success: 6996593607,
                cancelled: 3401368573,
                delivering: 2832811200,
                error: 6377090832,
                holding: 5541786862,
                toBeDelivered: 9313872651,
                waiting: 1077939023,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'ewifl9yrdz1qiyhp6xb2',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-16 10:39:29',
                executionMonitoringEndAt: '2020-07-16 07:42:48',
                numberMax: 5084710703,
                numberDays: 7671604719,
                success: 8392509338,
                cancelled: 4936579467,
                delivering: 7216673907,
                error: 7804730066,
                holding: 3528620591,
                toBeDelivered: 2365887719,
                waiting: 4512919199,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'm2egxcbwuesc3s9g7t7f',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 22:51:46',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-16 07:03:39',
                numberMax: 9372758656,
                numberDays: 3961589675,
                success: 8669086144,
                cancelled: 1633540569,
                delivering: 3888327767,
                error: 7716480966,
                holding: 5082304523,
                toBeDelivered: 7427112987,
                waiting: 5339126172,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'wla5u2g2rz4kr0126bl2',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 12:51:25',
                executionMonitoringStartAt: '2020-07-16 10:37:20',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 2212399419,
                numberDays: 2793147648,
                success: 9942449053,
                cancelled: 4433981428,
                delivering: 8295587400,
                error: 8847209569,
                holding: 2669833093,
                toBeDelivered: 4314815177,
                waiting: 4413017698,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: 'j2xarlnqabdpjj9l2sjr',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 03:12:57',
                executionMonitoringStartAt: '2020-07-16 18:48:45',
                executionMonitoringEndAt: '2020-07-16 12:13:33',
                numberMax: 3743978070,
                numberDays: 1269055297,
                success: 5327643606,
                cancelled: 2566939332,
                delivering: 8981023114,
                error: 8536597598,
                holding: 9925828105,
                toBeDelivered: 1528173242,
                waiting: 1548210252,
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/messages-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-overview/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    it(`/REST:GET bplus-it-sappi/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6'));
    });

    it(`/REST:GET bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/6ecb0b28-79f6-444a-abd9-2b6d911ddeb6')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6'));
    });

    it(`/REST:GET bplus-it-sappi/messages-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f4688366-b93e-49eb-87d7-9d09657376e0',
                tenantId: 'c3a17656-767b-4e18-9832-d3f4494237c6',
                systemId: 'ebcaa479-1f87-47fa-8798-900e1e2769aa',
                systemName: 'qy7802mgne4iumh23xin',
                executionId: 'cc909bcd-1af0-480a-ba7e-a51841ac6c81',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 19:36:52',
                executionMonitoringStartAt: '2020-07-16 03:01:16',
                executionMonitoringEndAt: '2020-07-15 22:56:07',
                numberMax: 2419789387,
                numberDays: 1246951815,
                success: 5404873119,
                cancelled: 8691550450,
                delivering: 1531756154,
                error: 3676947165,
                holding: 5160534486,
                toBeDelivered: 2114741245,
                waiting: 2102050444,
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                systemName: '7d01peh3xnw5eo98bhvw',
                executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 05:03:32',
                executionMonitoringStartAt: '2020-07-16 11:32:10',
                executionMonitoringEndAt: '2020-07-16 17:26:17',
                numberMax: 8984925360,
                numberDays: 5297675720,
                success: 3257057265,
                cancelled: 9911560894,
                delivering: 6652838234,
                error: 6041190196,
                holding: 4059136061,
                toBeDelivered: 2163369508,
                waiting: 1607737497,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6'));
    });

    it(`/REST:DELETE bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/6ecb0b28-79f6-444a-abd9-2b6d911ddeb6')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateMessageOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageOverviewInput!)
                    {
                        bplusItSappiCreateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: _.omit(repository.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    it(`/GraphQL bplusItSappiCreateMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageOverviewInput!)
                    {
                        bplusItSappiCreateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '2ed6fa91-ba97-4c36-b313-17792b367191',
                        tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                        systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                        systemName: 'uysaise56hz58w90acqs',
                        executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-16 17:23:58',
                        executionMonitoringStartAt: '2020-07-16 14:10:55',
                        executionMonitoringEndAt: '2020-07-16 04:56:29',
                        numberMax: 2733213610,
                        numberDays: 2529957733,
                        success: 8033406306,
                        cancelled: 8042261188,
                        delivering: 6825887421,
                        error: 9439567035,
                        holding: 9913892139,
                        toBeDelivered: 8061738960,
                        waiting: 4950141004,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', '2ed6fa91-ba97-4c36-b313-17792b367191');
            });
    });

    it(`/GraphQL bplusItSappiPaginateMessagesOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateMessagesOverview (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiPaginateMessagesOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL bplusItSappiFindMessageOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageOverview (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '00000000-0000-0000-0000-000000000000'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL bplusItSappiFindMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageOverview (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('6ecb0b28-79f6-444a-abd9-2b6d911ddeb6');
            });
    });

    it(`/GraphQL bplusItSappiFindMessageOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL bplusItSappiFindMessageOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('6ecb0b28-79f6-444a-abd9-2b6d911ddeb6');
            });
    });

    it(`/GraphQL bplusItSappiGetMessagesOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetMessagesOverview (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetMessagesOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL bplusItSappiUpdateMessageOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageOverviewInput!)
                    {
                        bplusItSappiUpdateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd2486c3a-71e6-4fc3-90d5-78cc681148cd',
                        tenantId: 'db411cc9-245d-4940-b1d8-636eb0d374ba',
                        systemId: '3d76dd77-8b46-4c1d-8ab8-2dc4db333a03',
                        systemName: '8fpcpdn0smig4625wgtg',
                        executionId: '459f96e7-7e3c-41a0-9ae8-33a145232c54',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-16 08:58:35',
                        executionMonitoringStartAt: '2020-07-16 16:47:40',
                        executionMonitoringEndAt: '2020-07-16 02:57:19',
                        numberMax: 8350706966,
                        numberDays: 4185940358,
                        success: 4758965602,
                        cancelled: 4982291018,
                        delivering: 3976807090,
                        error: 8923658240,
                        holding: 9690973324,
                        toBeDelivered: 6208040426,
                        waiting: 1408260545,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL bplusItSappiUpdateMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageOverviewInput!)
                    {
                        bplusItSappiUpdateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6',
                        tenantId: 'eb99ae78-3b53-4c7d-b64e-d1734cf345e9',
                        systemId: 'ff252981-b0a8-41f8-b442-a157a8b14a57',
                        systemName: 'cl3q89bljs5gfy1kia53',
                        executionId: '04ca9210-8f45-4142-b0ea-ee390fdd1b1e',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-16 17:13:30',
                        executionMonitoringStartAt: '2020-07-16 12:09:33',
                        executionMonitoringEndAt: '2020-07-16 11:12:58',
                        numberMax: 1031554361,
                        numberDays: 1145921336,
                        success: 7368632466,
                        cancelled: 8316162158,
                        delivering: 9963992533,
                        error: 7898668319,
                        holding: 1181787520,
                        toBeDelivered: 7443197627,
                        waiting: 7073625335,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('6ecb0b28-79f6-444a-abd9-2b6d911ddeb6');
            });
    });

    it(`/GraphQL bplusItSappiDeleteMessageOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL bplusItSappiDeleteMessageOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6ecb0b28-79f6-444a-abd9-2b6d911ddeb6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('6ecb0b28-79f6-444a-abd9-2b6d911ddeb6');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});