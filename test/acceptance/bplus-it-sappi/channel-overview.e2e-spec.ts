import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/domain/channel-overview.repository';
import { MockChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/infrastructure/mock/mock-channel-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('channel-overview', () => 
{
    let app: INestApplication;
    let repository: MockChannelOverviewRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
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
            .overrideProvider(IChannelOverviewRepository)
            .useClass(MockChannelOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelOverviewRepository>module.get<IChannelOverviewRepository>(IChannelOverviewRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: '608qa48dcb6erqgu1dvhflrcwmiw3c9yut4g3zc3q0bjcu9o5g',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'pbv1y1o98m22isd80vfl',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:32:30',
                executionMonitoringStartAt: '2020-07-28 20:03:20',
                executionMonitoringEndAt: '2020-07-29 05:29:48',
                error: 5764953126,
                inactive: 7064124766,
                successful: 5366796503,
                stopped: 1273504683,
                unknown: 7695834153,
                unregistered: 4735461884,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'ii2tkg39puf586666vf37rh4qt7jja973mrsdzlolp9w3i6z2w',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'qrss2wl8h96l1bcwv830',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:17:50',
                executionMonitoringStartAt: '2020-07-29 02:48:36',
                executionMonitoringEndAt: '2020-07-29 06:55:36',
                error: 9020416920,
                inactive: 1227920063,
                successful: 9633620004,
                stopped: 1449316140,
                unknown: 8562807157,
                unregistered: 1306636384,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: null,
                tenantCode: 'ekk3ye2t62xb6ispccz8m43ngkn1gck58qoe40u2hs2iqcevgv',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'f977ie0vd3uog6vnv8kz',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:29:26',
                executionMonitoringStartAt: '2020-07-29 05:32:56',
                executionMonitoringEndAt: '2020-07-29 01:07:59',
                error: 6091662123,
                inactive: 4936130045,
                successful: 4900783315,
                stopped: 9199727435,
                unknown: 6946845966,
                unregistered: 6053082024,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                
                tenantCode: 'gw98fgbl3gzfcecivnpztjl6e9wr69o9gfeznd1ad9cvffs88r',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'f5qjzh1j3c8s2vhyq9f6',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:25:09',
                executionMonitoringStartAt: '2020-07-29 13:27:33',
                executionMonitoringEndAt: '2020-07-29 12:49:11',
                error: 8530410260,
                inactive: 9605843398,
                successful: 9352547799,
                stopped: 8645593613,
                unknown: 8105753178,
                unregistered: 7477799417,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: null,
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'g2qm4ucds95mdepuqmgy',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:19:06',
                executionMonitoringStartAt: '2020-07-29 04:08:57',
                executionMonitoringEndAt: '2020-07-29 08:00:33',
                error: 3536138096,
                inactive: 5695630369,
                successful: 1882604298,
                stopped: 5189841065,
                unknown: 7210242846,
                unregistered: 3030547015,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'pzea6v2m76mvpg45ikp0',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:19:34',
                executionMonitoringStartAt: '2020-07-29 10:22:18',
                executionMonitoringEndAt: '2020-07-29 12:36:49',
                error: 6344353351,
                inactive: 9255702525,
                successful: 3035432177,
                stopped: 5672370921,
                unknown: 1072712268,
                unregistered: 4104038814,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: '1u9ex72aw6xvnh8omtrfl8vlhw5aaejr0t6b2tjicawivpny1s',
                systemId: null,
                systemName: 'nhirmald4cnc3dpnhoh2',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:25:10',
                executionMonitoringStartAt: '2020-07-29 15:18:00',
                executionMonitoringEndAt: '2020-07-29 18:09:10',
                error: 4878009584,
                inactive: 3973898921,
                successful: 9694326894,
                stopped: 4202882617,
                unknown: 3582608825,
                unregistered: 3469640012,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'k2web8cwykrly9tx2gmg8qz4myojc3m2shelf300k6twbhrtg5',
                
                systemName: '7uwgdf8oddcvrmeee1zu',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:10:35',
                executionMonitoringStartAt: '2020-07-29 15:49:37',
                executionMonitoringEndAt: '2020-07-29 13:54:38',
                error: 1622476224,
                inactive: 9275230220,
                successful: 6269038069,
                stopped: 3381429570,
                unknown: 8075798403,
                unregistered: 7364958435,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'kr4cvsoun8155bgmqe5h0nf69i47rehteksfq6wf0u1hr7z7e9',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: null,
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:05:22',
                executionMonitoringStartAt: '2020-07-28 19:01:40',
                executionMonitoringEndAt: '2020-07-29 16:07:31',
                error: 9270061740,
                inactive: 3655353876,
                successful: 4770020503,
                stopped: 7301383994,
                unknown: 7923695685,
                unregistered: 2522067100,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'edhvisuzh0qxfg93o88b4tux82hyyxobpjqtxpm54klmv6hj0t',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:59:13',
                executionMonitoringStartAt: '2020-07-29 13:41:58',
                executionMonitoringEndAt: '2020-07-28 20:00:26',
                error: 8516718414,
                inactive: 5439866318,
                successful: 2301345111,
                stopped: 8187874474,
                unknown: 3851911006,
                unregistered: 8640429305,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'unzo2n8zqf96lt9tkwuy1es869swhyesaie3izymvao91u99kh',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'dcu6o13cbko8zq3kvbf3',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:46:42',
                executionMonitoringStartAt: '2020-07-29 05:47:57',
                executionMonitoringEndAt: '2020-07-29 16:54:29',
                error: 4724189272,
                inactive: 5224534605,
                successful: 2631445316,
                stopped: 2788247410,
                unknown: 1428845594,
                unregistered: 3646197096,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: '8o8a49tlg6w9ndntco7ku3uudte5rzuucla85obmye9iqlujzt',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'pjdlsfmmcmesfjf4gf8v',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:30:08',
                executionMonitoringStartAt: '2020-07-29 16:02:35',
                executionMonitoringEndAt: '2020-07-29 03:40:34',
                error: 4439430973,
                inactive: 7537437822,
                successful: 9414976114,
                stopped: 5955127796,
                unknown: 5799434216,
                unregistered: 8258874905,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'b2h36cbawgoihgtu9sgrac6caa7clizpr6rwskqaq0l89tou73',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: '8ly05stnjv3opjb92cbp',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: null,
                executionExecutedAt: '2020-07-29 10:11:04',
                executionMonitoringStartAt: '2020-07-28 22:14:02',
                executionMonitoringEndAt: '2020-07-29 17:20:43',
                error: 1773295154,
                inactive: 5138352051,
                successful: 1606789109,
                stopped: 8068433656,
                unknown: 3841362214,
                unregistered: 5179023194,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'deg1i370v1wi9rz9btzufpkas6n19qtep6l3vs7y56051l74k5',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'tn1a5lsgnr2titc41urq',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                
                executionExecutedAt: '2020-07-29 17:38:19',
                executionMonitoringStartAt: '2020-07-29 16:32:17',
                executionMonitoringEndAt: '2020-07-28 23:33:08',
                error: 7805547373,
                inactive: 9454957187,
                successful: 5879544088,
                stopped: 8135903024,
                unknown: 7387752608,
                unregistered: 6826765262,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'j3dialz2ro8xtajbqkbnrzt1r8rmhaignvrcoldlouh69xlw27',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'kcp32vfuh2usbqy9ahyi',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-28 18:33:00',
                executionMonitoringEndAt: '2020-07-28 19:37:56',
                error: 8465075963,
                inactive: 2203363398,
                successful: 1595394504,
                stopped: 1770432517,
                unknown: 9422069698,
                unregistered: 9225779832,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: '0oxcx53fvdxyui57rewbdqn4i1t6bfjzhj1v0gcsf9f6zah3j0',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'wzlwh7yfoy3156tl55hv',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-28 19:41:46',
                executionMonitoringEndAt: '2020-07-28 20:57:46',
                error: 1684299330,
                inactive: 6274807652,
                successful: 4776498719,
                stopped: 7539189399,
                unknown: 7008636873,
                unregistered: 4560695187,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'ij5fly7dzr939cjn9kzurap6eltzguqna3cjt02nlzhj0ik7fw',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'ffae4n1e7iaer15u96wp',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:15:05',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-28 23:20:22',
                error: 5293244244,
                inactive: 2669371391,
                successful: 7670799635,
                stopped: 1484376500,
                unknown: 9916242449,
                unregistered: 5424385902,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'tmeyrxyp12d5ht9ukxpmiqvbq4rex4fks1lehqe32xhp3ukumg',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'vw5ot8j9mpi9gkxizp2s',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:20:12',
                
                executionMonitoringEndAt: '2020-07-29 11:42:53',
                error: 5990758154,
                inactive: 4257092656,
                successful: 3450625566,
                stopped: 9747409813,
                unknown: 4924631644,
                unregistered: 9038625964,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'r9yl7s387iww2zhhnwvdorvi2urboikr1vgean9ehzmn0ajejj',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'c1o5eri6651l4n4igj57',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:29:34',
                executionMonitoringStartAt: '2020-07-29 08:47:37',
                executionMonitoringEndAt: null,
                error: 5466618859,
                inactive: 6950610870,
                successful: 5146573514,
                stopped: 9390454263,
                unknown: 7641205477,
                unregistered: 7618654295,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'my1vg9wq7oagqyg3b0kd1o63utwo3orc99yu6sk48tmeezg37y',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: '2e6n9sfx2f2hyrvotbi8',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:35:32',
                executionMonitoringStartAt: '2020-07-29 17:54:46',
                
                error: 4208045276,
                inactive: 1757632708,
                successful: 4473435109,
                stopped: 2727791365,
                unknown: 7953160796,
                unregistered: 5686213373,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ccncm58lrw4mw3yootyl153tt3it6fhrrj5jd',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'yd8i7nmxin6jndtrvmu8aidp8046lddftqyf6qtgxl2u2b4my4',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: '0h90wyst7f81wfvs5oiq',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:12:13',
                executionMonitoringStartAt: '2020-07-29 05:19:41',
                executionMonitoringEndAt: '2020-07-29 06:18:43',
                error: 9418388544,
                inactive: 9193549085,
                successful: 7440575746,
                stopped: 7005416585,
                unknown: 5607043336,
                unregistered: 5170082253,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'qbp7o2ntjatk6nyonz7m6dhs7bhxgo57wsvvx',
                tenantCode: 'mt3w27nbdinsbv7wz1e1gx57ebpo1ltjdce7p6k203wunthoms',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'phf85rigiohajkg2i5ke',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:56:03',
                executionMonitoringStartAt: '2020-07-29 05:33:45',
                executionMonitoringEndAt: '2020-07-28 21:17:50',
                error: 2239452301,
                inactive: 7910746150,
                successful: 8245952423,
                stopped: 1648864016,
                unknown: 9952527191,
                unregistered: 4686389999,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'rq0pg5jk64t0frb6m66idgs3u8xhkl3nhlcbth2exyxauahf1z',
                systemId: 'ztj0bjbd3nsk7wj9xa2jnm10tip9w8znvnwdr',
                systemName: 'bvuboay95osjb1gmx30e',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:13:40',
                executionMonitoringStartAt: '2020-07-29 07:21:11',
                executionMonitoringEndAt: '2020-07-29 06:49:23',
                error: 8068128332,
                inactive: 9460333536,
                successful: 3901577683,
                stopped: 3304396152,
                unknown: 6900315565,
                unregistered: 3372993441,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: '4y5xshx7ohrd7miv3dg71fbzgl8xo96ua9wlilahi0j6ow2r10',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: '91skiel0vpd8ddizlfi2',
                executionId: 'avvm8h8i58zp1mwd81f6fvxz893jrna84gcxf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:29:01',
                executionMonitoringStartAt: '2020-07-28 19:25:56',
                executionMonitoringEndAt: '2020-07-29 18:14:43',
                error: 9469566149,
                inactive: 8130224957,
                successful: 2214372380,
                stopped: 7995836453,
                unknown: 3950097019,
                unregistered: 2327431346,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'l6ij31phuunej4wrie2brbmky3jk2szzobi5gmiih7ig6vkj82c',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'l4nv53kv7ak9z66whmmv',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:04:28',
                executionMonitoringStartAt: '2020-07-29 12:11:20',
                executionMonitoringEndAt: '2020-07-29 00:43:20',
                error: 5180715142,
                inactive: 9683335909,
                successful: 7143344597,
                stopped: 6895970701,
                unknown: 2089087467,
                unregistered: 1492065948,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'imn3rltkhv404j8zhgpjn6ufc63mvj5hd5hvglbeqq2w2tr8zu',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'uvmi4yfybvve1uh2w52jk',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:37:22',
                executionMonitoringStartAt: '2020-07-29 00:22:34',
                executionMonitoringEndAt: '2020-07-29 03:18:03',
                error: 9329735402,
                inactive: 5026274400,
                successful: 6685842423,
                stopped: 9390769739,
                unknown: 6122526625,
                unregistered: 1922662085,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: '7cqxuf9qhu4xox1aerp6qrkm9l9az2tk0srfqk26sa7z5aykjg',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: '37p4ocda3s7wv6kf5jv3',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 16:11:49',
                executionMonitoringStartAt: '2020-07-29 08:09:57',
                executionMonitoringEndAt: '2020-07-29 01:51:58',
                error: 26319027205,
                inactive: 6116988417,
                successful: 9459092115,
                stopped: 1980131187,
                unknown: 6978699958,
                unregistered: 6225316680,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewError is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewInactive is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: '8ilfql7m5ernc2kt7yvvub49lbmrl6isuvm6446mzbwy7l78di',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: '95p4coiruya61ucrw18n',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:58:38',
                executionMonitoringStartAt: '2020-07-29 06:17:04',
                executionMonitoringEndAt: '2020-07-29 14:24:35',
                error: 6795700004,
                inactive: 94210354818,
                successful: 6583748520,
                stopped: 8558792930,
                unknown: 8008450747,
                unregistered: 3821263583,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewInactive is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'mt7xbn3p88ctqdbwj9wey2fkiq2zew62wqoq4g4mh64da6qw5v',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'i2exy1i8bsvc3oyhfer4',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:09:38',
                executionMonitoringStartAt: '2020-07-29 04:00:49',
                executionMonitoringEndAt: '2020-07-29 04:08:03',
                error: 8871093314,
                inactive: 8790711323,
                successful: 87805506998,
                stopped: 9577096050,
                unknown: 3830109767,
                unregistered: 7490528581,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSuccessful is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewStopped is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'jznm7yktql56yugkplmqjqlwgr9tuuqvesuk88p2f853rsx2od',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: '8wj3l8ih71dppjrve4qa',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:26:11',
                executionMonitoringStartAt: '2020-07-28 18:21:08',
                executionMonitoringEndAt: '2020-07-29 11:03:36',
                error: 8844271732,
                inactive: 7843175578,
                successful: 1339142883,
                stopped: 19735912486,
                unknown: 2984681426,
                unregistered: 6956577405,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewStopped is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnknown is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'v7p6gnr6g5i77b1wuc7l9g0z6bmwm6ys5nmbobwywi34dktnz0',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'b2ylncu0iscy1aic8yog',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:35:07',
                executionMonitoringStartAt: '2020-07-28 20:09:04',
                executionMonitoringEndAt: '2020-07-29 00:29:52',
                error: 3446546113,
                inactive: 6201306552,
                successful: 2383881387,
                stopped: 1492995090,
                unknown: 46467735497,
                unregistered: 1520707466,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnknown is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: '9pjp9d7bd9bzq7gljj4462jnnd1rfh80qk9cbtds5nnoj510jl',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: '5nncrbsct0hym7wx24e5',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:43:57',
                executionMonitoringStartAt: '2020-07-29 15:13:46',
                executionMonitoringEndAt: '2020-07-29 18:04:51',
                error: 9191723700,
                inactive: 2787752121,
                successful: 7723682586,
                stopped: 8427377263,
                unknown: 2078831080,
                unregistered: 96128029831,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnregistered is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'j7bnn1i8u804evrizg8zf39p5vkz86ujbe8085to85vdhup7my',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'k6cmb05cx2al38ue64ay',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:34:29',
                executionMonitoringStartAt: '2020-07-28 20:51:07',
                executionMonitoringEndAt: '2020-07-29 05:49:28',
                error: -9,
                inactive: 4338726006,
                successful: 2923568921,
                stopped: 2170653649,
                unknown: 2088266649,
                unregistered: 5487989336,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewInactive must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'xbl6c9ivym9ok0tss5097whda6lnubzyhinj7ui0ir1ec1zn8h',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'jagwt7qwn44uzj5gyj2h',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 17:38:41',
                executionMonitoringStartAt: '2020-07-29 12:05:44',
                executionMonitoringEndAt: '2020-07-29 03:22:57',
                error: 3330583934,
                inactive: -9,
                successful: 5314164796,
                stopped: 6559864862,
                unknown: 6427352841,
                unregistered: 9336787248,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewInactive must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'o1w341tkw7pu81y9lmljolyhiqyiws0vr8dfa92dq7zauee3a6',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'x2qmedgwlj43mwe71nch',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:02:47',
                executionMonitoringStartAt: '2020-07-29 13:38:51',
                executionMonitoringEndAt: '2020-07-29 10:22:29',
                error: 8252445146,
                inactive: 4470011350,
                successful: -9,
                stopped: 3262452878,
                unknown: 5342693107,
                unregistered: 5275527278,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewSuccessful must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewStopped must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'ml82zmlsaxdjloazofmplw3qyrsno00q501w1y7xiimiutgs1k',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: '2uqos1a6xhuhgc46i2z7',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:30:05',
                executionMonitoringStartAt: '2020-07-28 19:20:20',
                executionMonitoringEndAt: '2020-07-29 05:24:17',
                error: 2040889770,
                inactive: 7217940869,
                successful: 5943558119,
                stopped: -9,
                unknown: 2076476839,
                unregistered: 3325286187,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewStopped must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnknown must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: '7doew6l1k98h635h7977kusz3drki6z13jjuy9i633v10ihutb',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: '0ejrrkigr690c7uwzho5',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:57:56',
                executionMonitoringStartAt: '2020-07-29 13:08:37',
                executionMonitoringEndAt: '2020-07-29 03:24:20',
                error: 8874735694,
                inactive: 6927071823,
                successful: 9020234725,
                stopped: 4812817114,
                unknown: -9,
                unregistered: 8968665332,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewUnknown must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: '0i3bzjjbgdvnniaqfwdbhtglp2msgt04a9tqi8sqvyzb91qzbn',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'fulvewbamhxrupggohtg',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 23:44:45',
                executionMonitoringStartAt: '2020-07-29 09:27:25',
                executionMonitoringEndAt: '2020-07-29 17:39:39',
                error: 9301925794,
                inactive: 1186440809,
                successful: 4084929550,
                stopped: 3455639697,
                unknown: 5742338206,
                unregistered: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewUnregistered must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: '0rwium4jf4k5mm9ul47qj2spqhc66qko4l91dmnz3hpdbiw6jf',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'bfh0ak496xyj6dbccnrv',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 09:33:56',
                executionMonitoringStartAt: '2020-07-29 05:37:54',
                executionMonitoringEndAt: '2020-07-29 18:10:54',
                error: 2842343890,
                inactive: 5940140030,
                successful: 1630727522,
                stopped: 8931830095,
                unknown: 4003611302,
                unregistered: 5497046129,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'hwx97o36szkt8bzy2hzk7ckwzlv4wv88nbrkt0h5x1zxpgmjr7',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'u9ua4s1folp3ykuw7cb5',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 01:26:51',
                executionMonitoringEndAt: '2020-07-29 17:37:31',
                error: 9215916912,
                inactive: 4663683719,
                successful: 5276068773,
                stopped: 1674380313,
                unknown: 4460021771,
                unregistered: 2165397818,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'px9hjpftztqfj68mtxr02581wuznsuwmipwnvfakzgfmejepwg',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'upi43j03qeh44wqqndpf',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:19:54',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 00:30:41',
                error: 3138194673,
                inactive: 5838494160,
                successful: 9425480865,
                stopped: 6699939596,
                unknown: 5265877706,
                unregistered: 1782764937,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'mdxos1g57gnjuxgru4gmmzwngq8yg2ft8h45mbgmtqgrm7gl0h',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: '85pe4fa6m2vqhew35iod',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:13:25',
                executionMonitoringStartAt: '2020-07-29 06:17:15',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 6516476464,
                inactive: 5712032251,
                successful: 7800487603,
                stopped: 7582108720,
                unknown: 5962325894,
                unregistered: 9887880221,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'cdugbrrrrbmdfu09m89b1xqypreiygps8vjmiwzqfepcwac84e',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'ht2avg9rl2zkilhfh1ah',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:56:34',
                executionMonitoringStartAt: '2020-07-28 19:47:08',
                executionMonitoringEndAt: '2020-07-29 05:31:44',
                error: 1738435338,
                inactive: 4847107256,
                successful: 5308323991,
                stopped: 4055094276,
                unknown: 9286166313,
                unregistered: 5197141898,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/channels-overview/paginate`, () => 
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

    test(`/REST:GET bplus-it-sappi/channel-overview - Got 404 Not Found`, () => 
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

    test(`/REST:GET bplus-it-sappi/channel-overview`, () => 
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
                        value   : '3114e414-0d09-4b9e-acbd-e277e87d3c5f'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3114e414-0d09-4b9e-acbd-e277e87d3c5f'));
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/3114e414-0d09-4b9e-acbd-e277e87d3c5f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3114e414-0d09-4b9e-acbd-e277e87d3c5f'));
    });

    test(`/REST:GET bplus-it-sappi/channels-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fbba11d2-c87b-4c8f-8c14-d442035acd9a',
                tenantId: '39b87f96-88e6-459a-8fe1-deec06ffeacf',
                tenantCode: '33uh5ohhuqgtr1ok1rhnvv69ngjqabtnpa45snh9cofo7p0f6a',
                systemId: 'd7431e29-2eb9-459f-97f4-f237e02ae15a',
                systemName: 'hx46d0mea6bfdrh6aw56',
                executionId: '6184d6c9-f181-47df-b1b7-9450f2860454',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:31:41',
                executionMonitoringStartAt: '2020-07-28 23:33:59',
                executionMonitoringEndAt: '2020-07-29 08:04:52',
                error: 7461632940,
                inactive: 2425205502,
                successful: 6843392136,
                stopped: 6470406144,
                unknown: 9521898186,
                unregistered: 9369855258,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                tenantCode: 'iliqjsc2kws8ihlf3gqw3bt8mb5fz78j26xw25un4bcjsm7rr6',
                systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                systemName: 'yu8k892exb05ph75a7va',
                executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:15:18',
                executionMonitoringStartAt: '2020-07-29 13:02:58',
                executionMonitoringEndAt: '2020-07-29 12:39:24',
                error: 1695686556,
                inactive: 5341231063,
                successful: 3964633004,
                stopped: 3734483537,
                unknown: 7437518016,
                unregistered: 1578536301,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3114e414-0d09-4b9e-acbd-e277e87d3c5f'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/3114e414-0d09-4b9e-acbd-e277e87d3c5f')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateChannelOverview - Got 409 Conflict, item already exist in database`, () => 
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
                            tenantCode
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

    test(`/GraphQL bplusItSappiCreateChannelOverview`, () => 
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
                            tenantCode
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
                        id: '13a448f6-121d-4f66-a99e-9400871dbf86',
                        tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                        tenantCode: '9enagteizdp609rrombdv13ls5qh9haj07fgxwxwiu7qgsch61',
                        systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                        systemName: '478d2jvbzfhrwddljl77',
                        executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 00:11:15',
                        executionMonitoringStartAt: '2020-07-29 17:57:07',
                        executionMonitoringEndAt: '2020-07-28 22:59:28',
                        error: 6000633561,
                        inactive: 2021389648,
                        successful: 4445929346,
                        stopped: 7965617121,
                        unknown: 4763327870,
                        unregistered: 6215114715,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', '13a448f6-121d-4f66-a99e-9400871dbf86');
            });
    });

    test(`/GraphQL bplusItSappiPaginateChannelsOverview`, () => 
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

    test(`/GraphQL bplusItSappiFindChannelOverview - Got 404 Not Found`, () => 
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
                            tenantCode
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

    test(`/GraphQL bplusItSappiFindChannelOverview`, () => 
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
                            tenantCode
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
                            value   : '3114e414-0d09-4b9e-acbd-e277e87d3c5f'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('3114e414-0d09-4b9e-acbd-e277e87d3c5f');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelOverviewById - Got 404 Not Found`, () => 
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
                            tenantCode
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

    test(`/GraphQL bplusItSappiFindChannelOverviewById`, () => 
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
                            tenantCode
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
                    id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('3114e414-0d09-4b9e-acbd-e277e87d3c5f');
            });
    });

    test(`/GraphQL bplusItSappiGetChannelsOverview`, () => 
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
                            tenantCode
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

    test(`/GraphQL bplusItSappiUpdateChannelOverview - Got 404 Not Found`, () => 
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
                            tenantCode
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
                        
                        id: '258abd24-2875-4127-8317-612a4e95de4a',
                        tenantId: '25c8f9e2-3689-4378-8302-528d10fc9069',
                        tenantCode: 'vkxyzc37msj603opctxv0uforkdvkfzdum1soaus9ldvuhtt4c',
                        systemId: '31041316-a6de-4c99-918f-ebc8327b9273',
                        systemName: 'zkt80prdt3d8du0eezcz',
                        executionId: '1e982864-0eed-41f3-9558-dfd6ba22774d',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 22:50:29',
                        executionMonitoringStartAt: '2020-07-29 15:09:47',
                        executionMonitoringEndAt: '2020-07-28 20:57:15',
                        error: 5288082084,
                        inactive: 4718238053,
                        successful: 4314257950,
                        stopped: 4614893896,
                        unknown: 7496097267,
                        unregistered: 3165382623,
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

    test(`/GraphQL bplusItSappiUpdateChannelOverview`, () => 
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
                            tenantCode
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
                        
                        id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f',
                        tenantId: 'c78eef50-7581-42b5-af82-d62ae86742c1',
                        tenantCode: 'qna4akpfjk73gnemv6v85zdhagbsr1roi6uijy28m9of1om57x',
                        systemId: 'd6fbb19a-39ce-4adc-8c69-8267aca4a612',
                        systemName: '5lvqrw4dzpcedn0ygowj',
                        executionId: '29e8574d-4cd0-433a-a26e-f6de6d99b0e1',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 13:49:14',
                        executionMonitoringStartAt: '2020-07-28 19:13:42',
                        executionMonitoringEndAt: '2020-07-29 11:37:16',
                        error: 4542796418,
                        inactive: 6130493887,
                        successful: 8900897354,
                        stopped: 2530062221,
                        unknown: 7059041933,
                        unregistered: 9820170821,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('3114e414-0d09-4b9e-acbd-e277e87d3c5f');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelOverviewById - Got 404 Not Found`, () => 
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
                            tenantCode
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

    test(`/GraphQL bplusItSappiDeleteChannelOverviewById`, () => 
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
                            tenantCode
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
                    id: '3114e414-0d09-4b9e-acbd-e277e87d3c5f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('3114e414-0d09-4b9e-acbd-e277e87d3c5f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});