import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/domain/channel-overview.repository';
import { MockChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/infrastructure/mock/mock-channel-overview.repository';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('channel-overview', () => 
{
    let app: INestApplication;
    let repository: MockChannelOverviewRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    BplusItSappiModule,
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
            .overrideProvider(IChannelOverviewRepository)
            .useClass(MockChannelOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelOverviewRepository>module.get<IChannelOverviewRepository>(IChannelOverviewRepository);

        await app.init();
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'xokz5mcl9i5cvxbxdncz',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 18:57:27',
                executionMonitoringStartAt: '2020-06-30 23:16:43',
                executionMonitoringEndAt: '2020-07-01 04:27:08',
                error: 4870996415,
                inactive: 7987866006,
                successful: 2660270876,
                stopped: 1569246410,
                unknown: 6690118947,
                unregistered: 4187779364,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'wbyxf3r1p4cmqyrbxit5',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 22:34:02',
                executionMonitoringStartAt: '2020-07-01 12:23:05',
                executionMonitoringEndAt: '2020-07-01 09:28:34',
                error: 3028105043,
                inactive: 5977637516,
                successful: 2759530373,
                stopped: 1311724699,
                unknown: 2342342402,
                unregistered: 3473496288,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: null,
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: '6d8gwwjpp97aizgvk767',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 20:43:36',
                executionMonitoringStartAt: '2020-07-01 15:41:52',
                executionMonitoringEndAt: '2020-06-30 19:45:17',
                error: 4939925037,
                inactive: 8045836335,
                successful: 7219623068,
                stopped: 7035030676,
                unknown: 8128315188,
                unregistered: 1043963168,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'k0hgjdu050tfrrxvv3vq',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 16:32:02',
                executionMonitoringStartAt: '2020-07-01 11:00:58',
                executionMonitoringEndAt: '2020-07-01 17:06:11',
                error: 7823987512,
                inactive: 9037535678,
                successful: 9002030221,
                stopped: 8302970457,
                unknown: 8242868483,
                unregistered: 9863370423,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: null,
                systemName: 'w9ntq2a283dcvttlpmyb',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 01:28:04',
                executionMonitoringStartAt: '2020-06-30 21:06:55',
                executionMonitoringEndAt: '2020-07-01 08:05:35',
                error: 4334839466,
                inactive: 6365249063,
                successful: 9732520720,
                stopped: 9995043674,
                unknown: 1014960316,
                unregistered: 1161450745,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                
                systemName: '9vnf0vq6hm953ldnq4ri',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 13:23:17',
                executionMonitoringStartAt: '2020-07-01 00:11:16',
                executionMonitoringEndAt: '2020-06-30 21:15:27',
                error: 4930798613,
                inactive: 8037168891,
                successful: 1197912122,
                stopped: 6317033707,
                unknown: 6855325131,
                unregistered: 3426692349,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: null,
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 17:24:48',
                executionMonitoringStartAt: '2020-07-01 11:37:17',
                executionMonitoringEndAt: '2020-07-01 05:14:46',
                error: 2957148831,
                inactive: 8257431829,
                successful: 4533568262,
                stopped: 7946766544,
                unknown: 8991639074,
                unregistered: 5526770146,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 13:30:56',
                executionMonitoringStartAt: '2020-07-01 01:07:59',
                executionMonitoringEndAt: '2020-06-30 22:18:11',
                error: 6685507053,
                inactive: 9263959686,
                successful: 3788116549,
                stopped: 4949220235,
                unknown: 2851966680,
                unregistered: 5173885952,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'ydry02svitd3jz13io3j',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 16:56:09',
                executionMonitoringStartAt: '2020-07-01 04:15:13',
                executionMonitoringEndAt: '2020-07-01 08:53:17',
                error: 4966115857,
                inactive: 5611791730,
                successful: 9384249702,
                stopped: 4717845482,
                unknown: 6086677523,
                unregistered: 5161221505,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'okf0qvj2p7y1qsfv8n6n',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 16:20:02',
                executionMonitoringStartAt: '2020-07-01 09:57:06',
                executionMonitoringEndAt: '2020-07-01 04:09:37',
                error: 1408742189,
                inactive: 7825180032,
                successful: 3707241957,
                stopped: 6371781296,
                unknown: 2107248560,
                unregistered: 7125203932,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: '3di2gmjjdbwqyxwxwm9j',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: null,
                executionExecutedAt: '2020-07-01 02:57:06',
                executionMonitoringStartAt: '2020-07-01 13:23:51',
                executionMonitoringEndAt: '2020-07-01 05:16:43',
                error: 5654806067,
                inactive: 8045021323,
                successful: 7093360652,
                stopped: 6429847205,
                unknown: 6682576645,
                unregistered: 7326778879,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'l8ovpldjz68adt9dfa58',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                
                executionExecutedAt: '2020-07-01 06:28:36',
                executionMonitoringStartAt: '2020-07-01 01:08:57',
                executionMonitoringEndAt: '2020-07-01 03:30:41',
                error: 6808286658,
                inactive: 9500185395,
                successful: 3918974078,
                stopped: 8796330266,
                unknown: 5728632561,
                unregistered: 1747737566,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'lvcj8q6ygd2x3j44g1g8',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-01 12:10:51',
                executionMonitoringEndAt: '2020-06-30 21:15:20',
                error: 7369319565,
                inactive: 2091908852,
                successful: 6561286609,
                stopped: 1257070976,
                unknown: 1013962944,
                unregistered: 4624782990,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: '18kjn9ih8qmzl8cu4x20',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-01 03:46:15',
                executionMonitoringEndAt: '2020-06-30 17:22:38',
                error: 7551813978,
                inactive: 1865287427,
                successful: 2670058461,
                stopped: 3789631660,
                unknown: 9076005539,
                unregistered: 4180303484,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'v0z1sf2lfk5wkwsh1osb',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 08:03:24',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-01 16:43:52',
                error: 4802479156,
                inactive: 6624998834,
                successful: 4029457545,
                stopped: 9166035870,
                unknown: 3861760096,
                unregistered: 4748731502,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: '44o337mn5f24aiuvowvc',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 09:23:01',
                
                executionMonitoringEndAt: '2020-07-01 04:39:14',
                error: 9938047843,
                inactive: 7004902127,
                successful: 4075303037,
                stopped: 6073697552,
                unknown: 2547055725,
                unregistered: 5058103208,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'vvhn1i0cqribjchgbze2',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 21:48:20',
                executionMonitoringStartAt: '2020-07-01 10:04:07',
                executionMonitoringEndAt: null,
                error: 3495658594,
                inactive: 5642716054,
                successful: 6852529230,
                stopped: 2637862152,
                unknown: 6990301172,
                unregistered: 2398459437,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: '9saaosjtmfh8ulv5nrex',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 12:58:38',
                executionMonitoringStartAt: '2020-06-30 18:01:31',
                
                error: 6714978839,
                inactive: 8946987948,
                successful: 4038799237,
                stopped: 5972313447,
                unknown: 9151693807,
                unregistered: 1208143351,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'mrnap05httygn0zjsai0qxxovqcjzxgz6zpj7',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'wqvh48mmm6z8xlmaoptw',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 21:56:34',
                executionMonitoringStartAt: '2020-07-01 03:20:42',
                executionMonitoringEndAt: '2020-07-01 06:32:41',
                error: 2932413518,
                inactive: 9029760702,
                successful: 6655574943,
                stopped: 5343231578,
                unknown: 8904686652,
                unregistered: 7679083344,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'g7dgf0dqr0kwemn9hvk3hy0ylyfzdhizjqo9s',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'ufgbkxyowyf3drayrrmf',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 07:13:03',
                executionMonitoringStartAt: '2020-07-01 01:40:58',
                executionMonitoringEndAt: '2020-07-01 15:07:40',
                error: 2036573212,
                inactive: 3111288260,
                successful: 5023990714,
                stopped: 6532691740,
                unknown: 3869946576,
                unregistered: 1791024595,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: 'rdjgeb1rsanyv0fsh5ia9347ljn1vjdiw6twm',
                systemName: 'hurjhogrh39bvq937top',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 05:12:01',
                executionMonitoringStartAt: '2020-07-01 02:26:43',
                executionMonitoringEndAt: '2020-06-30 18:04:24',
                error: 4017611205,
                inactive: 4768466110,
                successful: 5718616489,
                stopped: 1953931930,
                unknown: 4990768580,
                unregistered: 3022088503,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: '0hyi68l267h4xlyvi8yq',
                executionId: 'oxro8w95zxj7dcmwxx0bt8eaywd5d9tfidq2g',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 04:39:25',
                executionMonitoringStartAt: '2020-07-01 11:02:07',
                executionMonitoringEndAt: '2020-06-30 21:05:47',
                error: 2084287517,
                inactive: 2943225605,
                successful: 1444536372,
                stopped: 5222139652,
                unknown: 9427226627,
                unregistered: 2297448260,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'vgv396gn2nz9wijaumx6f',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 15:08:23',
                executionMonitoringStartAt: '2020-07-01 04:59:08',
                executionMonitoringEndAt: '2020-06-30 20:21:13',
                error: 5751284823,
                inactive: 6526514271,
                successful: 5800781269,
                stopped: 1837920112,
                unknown: 5201067843,
                unregistered: 3580568361,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'n2mlzfwyfpeyhokfo2q7',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 05:18:21',
                executionMonitoringStartAt: '2020-07-01 01:26:32',
                executionMonitoringEndAt: '2020-07-01 13:29:49',
                error: 67556707214,
                inactive: 9732261831,
                successful: 7387534430,
                stopped: 9097036774,
                unknown: 1411523948,
                unregistered: 1977359439,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewError is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewInactive is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'phhu97xudxagyf47r2x8',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 22:18:54',
                executionMonitoringStartAt: '2020-06-30 22:39:53',
                executionMonitoringEndAt: '2020-06-30 18:46:08',
                error: 4695594060,
                inactive: 79569487817,
                successful: 4118962768,
                stopped: 7060937274,
                unknown: 3854343568,
                unregistered: 9806630046,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewInactive is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'tyjw6g9ya6dg0rtd0e0r',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 04:05:48',
                executionMonitoringStartAt: '2020-06-30 20:36:16',
                executionMonitoringEndAt: '2020-06-30 19:54:35',
                error: 7223183282,
                inactive: 5139528872,
                successful: 40161335979,
                stopped: 4561698367,
                unknown: 9024577051,
                unregistered: 7022294476,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSuccessful is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewStopped is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'zbkayx12w4mkrl71ihhj',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 20:03:11',
                executionMonitoringStartAt: '2020-06-30 22:37:59',
                executionMonitoringEndAt: '2020-07-01 14:43:38',
                error: 4502646365,
                inactive: 9362321577,
                successful: 5142920879,
                stopped: 51000922356,
                unknown: 9811337714,
                unregistered: 8177478381,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewStopped is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnknown is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'ha6qd7u7r3znh5e2gfej',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 00:53:25',
                executionMonitoringStartAt: '2020-07-01 09:57:55',
                executionMonitoringEndAt: '2020-07-01 14:05:49',
                error: 7915324034,
                inactive: 7313995431,
                successful: 8843773792,
                stopped: 6837786606,
                unknown: 14510288858,
                unregistered: 3877481167,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnknown is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'pv9pg4rf7snzepj5ikpr',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 20:16:15',
                executionMonitoringStartAt: '2020-07-01 14:05:50',
                executionMonitoringEndAt: '2020-06-30 20:30:29',
                error: 9433936722,
                inactive: 8204620561,
                successful: 3115589009,
                stopped: 9946390073,
                unknown: 9163927393,
                unregistered: 34356234893,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnregistered is too large, has a maximum length of 10');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewError has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: '343cxu5j0n6qrna7ag2r',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 16:32:26',
                executionMonitoringStartAt: '2020-06-30 18:07:38',
                executionMonitoringEndAt: '2020-07-01 14:35:58',
                error: 100.10,
                inactive: 4505808581,
                successful: 6231562777,
                stopped: 9521459866,
                unknown: 8489440440,
                unregistered: 3196847094,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewError has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewInactive has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: '56u74dovens9wk65o9r7',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 13:21:37',
                executionMonitoringStartAt: '2020-07-01 16:50:31',
                executionMonitoringEndAt: '2020-07-01 13:22:04',
                error: 4738041590,
                inactive: 100.10,
                successful: 5762157827,
                stopped: 2020938867,
                unknown: 8225393139,
                unregistered: 7748258529,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewInactive has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: '2kbbav2h3yed1n1hsvtn',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 08:23:38',
                executionMonitoringStartAt: '2020-07-01 02:39:53',
                executionMonitoringEndAt: '2020-07-01 01:25:32',
                error: 9049534195,
                inactive: 6271992705,
                successful: 100.10,
                stopped: 2635604096,
                unknown: 9177597752,
                unregistered: 5395006804,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSuccessful has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewStopped has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: '4x0d7dvtzkeukh21nzpz',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 22:44:45',
                executionMonitoringStartAt: '2020-07-01 05:47:49',
                executionMonitoringEndAt: '2020-07-01 13:09:05',
                error: 6629609229,
                inactive: 3760217520,
                successful: 7891415777,
                stopped: 100.10,
                unknown: 9154277575,
                unregistered: 9377950044,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewStopped has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnknown has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'ten0v0ozo5fltseh4qcb',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 18:09:46',
                executionMonitoringStartAt: '2020-07-01 13:08:32',
                executionMonitoringEndAt: '2020-07-01 05:44:25',
                error: 9061310461,
                inactive: 4176926748,
                successful: 2908777665,
                stopped: 5451623032,
                unknown: 100.10,
                unregistered: 7601180870,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnknown has to be a integer value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered has to be a integer value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'yuxf81sagyxm9quzugxt',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 00:24:56',
                executionMonitoringStartAt: '2020-07-01 07:18:44',
                executionMonitoringEndAt: '2020-07-01 11:47:09',
                error: 1569933546,
                inactive: 2429370944,
                successful: 3089420771,
                stopped: 5560098740,
                unknown: 4452167025,
                unregistered: 100.10,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnregistered has to be a integer value');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: '8cok7542hesktlfj656x',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-01 00:48:40',
                executionMonitoringStartAt: '2020-07-01 02:39:21',
                executionMonitoringEndAt: '2020-07-01 05:14:26',
                error: 5689587842,
                inactive: 4672766813,
                successful: 9333034467,
                stopped: 9634879939,
                unknown: 3223743549,
                unregistered: 2099877009,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'hzi0fb7ht0ksdgc6h6jv',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-06-30 20:23:24',
                executionMonitoringEndAt: '2020-07-01 13:56:21',
                error: 8675924919,
                inactive: 1168982521,
                successful: 3912886322,
                stopped: 6644563561,
                unknown: 9484873830,
                unregistered: 2427908592,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'boswdroc5xskq462544u',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 19:52:55',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-01 04:52:45',
                error: 1061558562,
                inactive: 6264010645,
                successful: 5622016714,
                stopped: 7871063216,
                unknown: 8705400583,
                unregistered: 2963865298,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'e5yam3g9hzsq9pmi415x',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-06-30 23:55:58',
                executionMonitoringStartAt: '2020-07-01 12:32:26',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 6200714872,
                inactive: 6635251742,
                successful: 7971468662,
                stopped: 7679915850,
                unknown: 2936833042,
                unregistered: 6704542441,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: 'baw2prta9iluxgaqa06z',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-01 12:06:10',
                executionMonitoringStartAt: '2020-07-01 14:38:32',
                executionMonitoringEndAt: '2020-06-30 18:54:22',
                error: 2216865915,
                inactive: 6498877643,
                successful: 6623515479,
                stopped: 3736669040,
                unknown: 2504599637,
                unregistered: 7927483902,
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/channels-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-overview/paginate')
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

    it(`/REST:GET bplus-it-sappi/channel-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview')
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

    it(`/REST:GET bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'd2e57786-cab5-4cd7-93d5-ab389176327f'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd2e57786-cab5-4cd7-93d5-ab389176327f'));
    });

    it(`/REST:GET bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/d2e57786-cab5-4cd7-93d5-ab389176327f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd2e57786-cab5-4cd7-93d5-ab389176327f'));
    });

    it(`/REST:GET bplus-it-sappi/channels-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/channel-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '5fd9cfef-d7ab-49ce-970c-a4aed59211f7',
                tenantId: 'aa1f6484-348e-457b-b0ae-046837618a25',
                systemId: 'ee8d0d25-fa9b-40ec-b1c7-d467f1d52701',
                systemName: 'py2nonwg00p9tik3ibib',
                executionId: 'd0af2f50-d5ce-4f6d-aa4d-7a24df9c0ff5',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-06-30 17:51:04',
                executionMonitoringStartAt: '2020-07-01 12:08:43',
                executionMonitoringEndAt: '2020-07-01 03:25:16',
                error: 7626126011,
                inactive: 1693457655,
                successful: 6901484742,
                stopped: 7031887714,
                unknown: 7561109948,
                unregistered: 3249041197,
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                systemName: '84ikbbcalc9rkr0zylap',
                executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-01 11:01:11',
                executionMonitoringStartAt: '2020-07-01 04:14:22',
                executionMonitoringEndAt: '2020-06-30 21:35:52',
                error: 4241060295,
                inactive: 2412614777,
                successful: 5276708426,
                stopped: 9372765806,
                unknown: 1297227982,
                unregistered: 1837317006,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd2e57786-cab5-4cd7-93d5-ab389176327f'));
    });

    it(`/REST:DELETE bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/d2e57786-cab5-4cd7-93d5-ab389176327f')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateChannelOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelOverviewInput!)
                    {
                        bplusItSappiCreateChannelOverview (payload:$payload)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
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

    it(`/GraphQL bplusItSappiCreateChannelOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelOverviewInput!)
                    {
                        bplusItSappiCreateChannelOverview (payload:$payload)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'be1514cc-9ecd-4659-8cf2-96e8431b3996',
                        tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                        systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                        systemName: 'lyxu08qb3bcr5felbdf2',
                        executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-01 10:49:35',
                        executionMonitoringStartAt: '2020-07-01 01:27:33',
                        executionMonitoringEndAt: '2020-06-30 22:47:30',
                        error: 1657077521,
                        inactive: 6468819111,
                        successful: 5587696380,
                        stopped: 3076610257,
                        unknown: 1637463980,
                        unregistered: 6798157330,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', 'be1514cc-9ecd-4659-8cf2-96e8431b3996');
            });
    });

    it(`/GraphQL bplusItSappiPaginateChannelsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateChannelsOverview (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateChannelsOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannelsOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannelsOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL bplusItSappiFindChannelOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannelOverview (query:$query)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
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

    it(`/GraphQL bplusItSappiFindChannelOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannelOverview (query:$query)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
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
                            value   : 'd2e57786-cab5-4cd7-93d5-ab389176327f'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('d2e57786-cab5-4cd7-93d5-ab389176327f');
            });
    });

    it(`/GraphQL bplusItSappiFindChannelOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelOverviewById (id:$id)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
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

    it(`/GraphQL bplusItSappiFindChannelOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelOverviewById (id:$id)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd2e57786-cab5-4cd7-93d5-ab389176327f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('d2e57786-cab5-4cd7-93d5-ab389176327f');
            });
    });

    it(`/GraphQL bplusItSappiGetChannelsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetChannelsOverview (query:$query)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetChannelsOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL bplusItSappiUpdateChannelOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelOverviewInput!)
                    {
                        bplusItSappiUpdateChannelOverview (payload:$payload)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '30fb0259-1d66-47a8-addd-9e5466417e8e',
                        tenantId: '50298cbc-d2e4-4653-808b-790eaf381b12',
                        systemId: 'c7f84dc6-19cf-40b4-b706-9979fab6b8d2',
                        systemName: 'qo3jtrgpqdmjf7x57eoa',
                        executionId: 'b2d1e3dd-b050-4e27-93bc-05981aa53fc2',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-06-30 20:08:05',
                        executionMonitoringStartAt: '2020-07-01 12:31:48',
                        executionMonitoringEndAt: '2020-06-30 18:06:46',
                        error: 5106773290,
                        inactive: 5431684656,
                        successful: 8373055950,
                        stopped: 3467831802,
                        unknown: 4605420066,
                        unregistered: 1797343822,
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

    it(`/GraphQL bplusItSappiUpdateChannelOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelOverviewInput!)
                    {
                        bplusItSappiUpdateChannelOverview (payload:$payload)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd2e57786-cab5-4cd7-93d5-ab389176327f',
                        tenantId: 'd4d58a5b-b7a0-40d2-b34d-17e48f7465ad',
                        systemId: '6bfac8e7-9f23-4787-a11d-4e149ae53ef3',
                        systemName: '9ud6zgk3ioiuz7h94ow0',
                        executionId: '599b5f70-345c-46d3-9938-f9f3810380c4',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-06-30 18:39:08',
                        executionMonitoringStartAt: '2020-06-30 21:23:19',
                        executionMonitoringEndAt: '2020-07-01 10:53:24',
                        error: 3068189031,
                        inactive: 5000835935,
                        successful: 6118274435,
                        stopped: 5249853182,
                        unknown: 8524898690,
                        unregistered: 5078687302,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('d2e57786-cab5-4cd7-93d5-ab389176327f');
            });
    });

    it(`/GraphQL bplusItSappiDeleteChannelOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelOverviewById (id:$id)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
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

    it(`/GraphQL bplusItSappiDeleteChannelOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelOverviewById (id:$id)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd2e57786-cab5-4cd7-93d5-ab389176327f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('d2e57786-cab5-4cd7-93d5-ab389176327f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});