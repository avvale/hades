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
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: '7ov4pekjmut57dxc8unx',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 08:07:38',
                executionMonitoringStartAt: '2020-07-21 10:44:42',
                executionMonitoringEndAt: '2020-07-21 19:43:07',
                error: 3690162609,
                inactive: 2812966768,
                successful: 3261928585,
                stopped: 7419269435,
                unknown: 2330592205,
                unregistered: 2945116134,
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
                
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'qdhnl802o4icrktjzaqs',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:12:23',
                executionMonitoringStartAt: '2020-07-21 08:20:40',
                executionMonitoringEndAt: '2020-07-21 06:22:33',
                error: 3930434686,
                inactive: 1794032060,
                successful: 8915289616,
                stopped: 1327985878,
                unknown: 1351822013,
                unregistered: 3949958185,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: null,
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'gwvqdt4vafbec13gngje',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 10:30:50',
                executionMonitoringStartAt: '2020-07-21 20:19:33',
                executionMonitoringEndAt: '2020-07-22 00:30:12',
                error: 2549173053,
                inactive: 6789249124,
                successful: 7490826927,
                stopped: 9901958694,
                unknown: 3380328561,
                unregistered: 3863882474,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'owobz94s38av5lrhn46l',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 08:32:03',
                executionMonitoringStartAt: '2020-07-21 15:12:05',
                executionMonitoringEndAt: '2020-07-21 13:54:43',
                error: 4125384055,
                inactive: 1540075530,
                successful: 3169030991,
                stopped: 6935427716,
                unknown: 7180198200,
                unregistered: 6916095514,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: null,
                systemName: '345dwx54b513qtjuhyfn',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 02:18:24',
                executionMonitoringStartAt: '2020-07-21 17:57:28',
                executionMonitoringEndAt: '2020-07-21 02:36:25',
                error: 3361224613,
                inactive: 8539820229,
                successful: 5183126926,
                stopped: 8355645417,
                unknown: 7529518255,
                unregistered: 1636235512,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                
                systemName: 'lbmwxehu9jseofsrtkrq',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 18:52:05',
                executionMonitoringStartAt: '2020-07-21 14:13:14',
                executionMonitoringEndAt: '2020-07-21 13:50:59',
                error: 5794082530,
                inactive: 4337017452,
                successful: 6643092531,
                stopped: 4983987574,
                unknown: 8340087060,
                unregistered: 6371702076,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: null,
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 02:48:23',
                executionMonitoringStartAt: '2020-07-21 21:37:13',
                executionMonitoringEndAt: '2020-07-21 14:40:14',
                error: 8427709046,
                inactive: 2978501207,
                successful: 5790353833,
                stopped: 2028769504,
                unknown: 8499704511,
                unregistered: 9142061313,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 12:07:37',
                executionMonitoringStartAt: '2020-07-21 04:59:47',
                executionMonitoringEndAt: '2020-07-21 00:56:03',
                error: 5144236896,
                inactive: 3037188412,
                successful: 1738675371,
                stopped: 9517954329,
                unknown: 8725025074,
                unregistered: 6115310249,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: '8ebmf34c7g71nc2ybs69',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 23:11:18',
                executionMonitoringStartAt: '2020-07-21 21:48:40',
                executionMonitoringEndAt: '2020-07-21 13:47:46',
                error: 9616612912,
                inactive: 2505377641,
                successful: 9959921498,
                stopped: 8957609046,
                unknown: 5507178248,
                unregistered: 4479483845,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: '343bjn4tlf0uzw8gc7h5',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 14:27:42',
                executionMonitoringStartAt: '2020-07-21 16:46:44',
                executionMonitoringEndAt: '2020-07-21 09:08:22',
                error: 2206086586,
                inactive: 9211146244,
                successful: 5080612748,
                stopped: 3682225987,
                unknown: 7646289192,
                unregistered: 5087889871,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'uq6eemh7nrjmmdrp9ihr',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: null,
                executionExecutedAt: '2020-07-21 20:55:18',
                executionMonitoringStartAt: '2020-07-21 12:38:09',
                executionMonitoringEndAt: '2020-07-21 17:25:56',
                error: 3629009559,
                inactive: 9507046257,
                successful: 3692159975,
                stopped: 3657137833,
                unknown: 7683203042,
                unregistered: 4660617296,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'a3ppk0gt4vqyrku4q8yi',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                
                executionExecutedAt: '2020-07-21 05:27:47',
                executionMonitoringStartAt: '2020-07-21 19:59:31',
                executionMonitoringEndAt: '2020-07-21 18:51:14',
                error: 5347197425,
                inactive: 1442470204,
                successful: 7122073248,
                stopped: 1656825445,
                unknown: 2554159413,
                unregistered: 9330050515,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: '2g64vvc7bi4ox44gigp7',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-21 09:16:22',
                executionMonitoringEndAt: '2020-07-21 14:58:47',
                error: 5313247903,
                inactive: 9298333063,
                successful: 6266902580,
                stopped: 2156554953,
                unknown: 8875366210,
                unregistered: 3615998729,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'mgwj2y34e7l8eob9ptcd',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-21 12:40:04',
                executionMonitoringEndAt: '2020-07-21 21:14:17',
                error: 5436001933,
                inactive: 1915396702,
                successful: 7288936680,
                stopped: 5105766622,
                unknown: 1729004908,
                unregistered: 9749984427,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: '5emd0spru8ia8wkci4r2',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 18:03:47',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-21 23:46:59',
                error: 1211875124,
                inactive: 8314864525,
                successful: 6328197754,
                stopped: 9441858822,
                unknown: 6624876586,
                unregistered: 3639961159,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'gv66tlym1gldksacfcyj',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 23:57:14',
                
                executionMonitoringEndAt: '2020-07-21 04:55:56',
                error: 2567773907,
                inactive: 1507553626,
                successful: 9515296738,
                stopped: 5503464844,
                unknown: 5118779035,
                unregistered: 1136841973,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: '427y8p44kosnq87y8let',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 07:20:59',
                executionMonitoringStartAt: '2020-07-21 07:17:52',
                executionMonitoringEndAt: null,
                error: 7903911630,
                inactive: 1230043248,
                successful: 1148043750,
                stopped: 6816921341,
                unknown: 1861272038,
                unregistered: 7924276505,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'l35a0w594yu6u1bbua71',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 14:10:58',
                executionMonitoringStartAt: '2020-07-21 04:11:03',
                
                error: 9061880669,
                inactive: 3047287063,
                successful: 6790747088,
                stopped: 2105597444,
                unknown: 5052283292,
                unregistered: 6473551714,
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
                id: '4e1bcbtvj1svw6rjkjxfl5uqtf5a746vci3xi',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'h2fojy5cvyh14djmhtlj',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:42:00',
                executionMonitoringStartAt: '2020-07-21 13:38:26',
                executionMonitoringEndAt: '2020-07-21 02:15:02',
                error: 3589373256,
                inactive: 3778281234,
                successful: 2517722797,
                stopped: 7585144859,
                unknown: 1469658676,
                unregistered: 7094545478,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '4ycsk8wl7xfevxf9o76hocxbyr3xetn0fs1lv',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'yt8t43j84ewob3gj36bu',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 08:02:11',
                executionMonitoringStartAt: '2020-07-21 14:17:03',
                executionMonitoringEndAt: '2020-07-21 08:01:02',
                error: 3095286521,
                inactive: 3891709613,
                successful: 6865452322,
                stopped: 7239961082,
                unknown: 4779123591,
                unregistered: 7723544187,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'npsjeswhe6i4fqoz9c7m2bo02vr7ypb8y46fg',
                systemName: 'eelcrdgat712p24xtqbz',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 23:55:07',
                executionMonitoringStartAt: '2020-07-21 13:33:56',
                executionMonitoringEndAt: '2020-07-21 17:23:34',
                error: 9499881717,
                inactive: 5025926720,
                successful: 2313322882,
                stopped: 8249668289,
                unknown: 6074689547,
                unregistered: 2169221576,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'peysfbr4kaj40a7azdzk',
                executionId: '6j1codtm4uy0d0j9p9576cwdxmd90vbnte844',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 02:42:40',
                executionMonitoringStartAt: '2020-07-21 22:43:09',
                executionMonitoringEndAt: '2020-07-22 00:10:45',
                error: 6007052173,
                inactive: 7740814713,
                successful: 6633805765,
                stopped: 8384344368,
                unknown: 3348294580,
                unregistered: 8347123296,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'az03bu1zv7tlhp08rjvbd',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 00:36:58',
                executionMonitoringStartAt: '2020-07-21 19:05:36',
                executionMonitoringEndAt: '2020-07-21 09:04:23',
                error: 8495793459,
                inactive: 8801049432,
                successful: 6908688265,
                stopped: 5756064001,
                unknown: 3325189214,
                unregistered: 6701459483,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: '32rzxwn802lav5h2kk61',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 09:03:37',
                executionMonitoringStartAt: '2020-07-21 12:16:00',
                executionMonitoringEndAt: '2020-07-21 06:29:31',
                error: 17291407943,
                inactive: 1702526894,
                successful: 7764452576,
                stopped: 2483476998,
                unknown: 9877108831,
                unregistered: 6495090202,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'c5iq4waabccgsj7fflmq',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 20:13:01',
                executionMonitoringStartAt: '2020-07-21 05:38:37',
                executionMonitoringEndAt: '2020-07-21 19:52:56',
                error: 9985806373,
                inactive: 57907988423,
                successful: 6856985134,
                stopped: 2491666575,
                unknown: 1763449595,
                unregistered: 4031732406,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: '8jh86sj9r6cy831u04k6',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 01:58:57',
                executionMonitoringStartAt: '2020-07-21 09:57:28',
                executionMonitoringEndAt: '2020-07-21 06:08:27',
                error: 7365612291,
                inactive: 7226943943,
                successful: 46985016870,
                stopped: 7969423062,
                unknown: 1019710680,
                unregistered: 9623832205,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'bc6mt26j5tb9wu1m2qg0',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 14:54:09',
                executionMonitoringStartAt: '2020-07-21 11:52:25',
                executionMonitoringEndAt: '2020-07-21 13:34:47',
                error: 7960200580,
                inactive: 5597454616,
                successful: 8773063828,
                stopped: 69709319651,
                unknown: 6188752547,
                unregistered: 4479293241,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: '2l7p7eu901q1dxsb2wnr',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 22:47:47',
                executionMonitoringStartAt: '2020-07-21 05:23:33',
                executionMonitoringEndAt: '2020-07-21 14:11:21',
                error: 6512477111,
                inactive: 2044686695,
                successful: 4934068845,
                stopped: 3876231580,
                unknown: 54403822740,
                unregistered: 7306075753,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'e2xpquk2vcdk3ky3y2kp',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 12:12:11',
                executionMonitoringStartAt: '2020-07-21 23:42:45',
                executionMonitoringEndAt: '2020-07-21 22:26:54',
                error: 8621388158,
                inactive: 2209389091,
                successful: 6928378568,
                stopped: 1500477156,
                unknown: 2905164013,
                unregistered: 28038177962,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: '0jteb6o1qs247zpug87z',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 12:29:43',
                executionMonitoringStartAt: '2020-07-21 10:00:07',
                executionMonitoringEndAt: '2020-07-21 05:34:59',
                error: -9,
                inactive: 5942931750,
                successful: 8439305328,
                stopped: 9667049522,
                unknown: 9575817055,
                unregistered: 9176175518,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'ny8ue6qfqsaxew2w5kh3',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 07:18:48',
                executionMonitoringStartAt: '2020-07-21 06:01:03',
                executionMonitoringEndAt: '2020-07-21 16:56:29',
                error: 9528282168,
                inactive: -9,
                successful: 5929025481,
                stopped: 2160394830,
                unknown: 5744448129,
                unregistered: 8189009401,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'd6kd6q7lmlhucgrroqrl',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:21:52',
                executionMonitoringStartAt: '2020-07-21 09:56:49',
                executionMonitoringEndAt: '2020-07-21 08:49:32',
                error: 1258404546,
                inactive: 2020683614,
                successful: -9,
                stopped: 9351525511,
                unknown: 3377120291,
                unregistered: 7595352501,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'jcfam8y5e2na8gs6gkk0',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 12:28:43',
                executionMonitoringStartAt: '2020-07-21 04:41:28',
                executionMonitoringEndAt: '2020-07-21 04:56:07',
                error: 5331311029,
                inactive: 4380845397,
                successful: 3187535799,
                stopped: -9,
                unknown: 8178481356,
                unregistered: 9760058211,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'm6usq97adlf4m1tmgjep',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 08:01:55',
                executionMonitoringStartAt: '2020-07-21 20:49:44',
                executionMonitoringEndAt: '2020-07-21 09:16:30',
                error: 8013288593,
                inactive: 1563241350,
                successful: 3704598602,
                stopped: 1330288649,
                unknown: -9,
                unregistered: 5619501828,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: '7f379x2ayovfq2gtacfg',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 02:03:16',
                executionMonitoringStartAt: '2020-07-21 06:39:11',
                executionMonitoringEndAt: '2020-07-21 10:28:14',
                error: 4741838960,
                inactive: 1904867110,
                successful: 9288580101,
                stopped: 8736107901,
                unknown: 9404096677,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: '1is36u0sc5ltn5afamps',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-21 19:56:50',
                executionMonitoringStartAt: '2020-07-21 07:20:39',
                executionMonitoringEndAt: '2020-07-21 20:20:07',
                error: 1281062467,
                inactive: 6293530993,
                successful: 9604605266,
                stopped: 4719118882,
                unknown: 8558893394,
                unregistered: 2438529405,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'detexblhzx7vmxnlzihb',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-21 03:41:50',
                executionMonitoringEndAt: '2020-07-21 13:03:03',
                error: 3441107039,
                inactive: 8140788877,
                successful: 3516357075,
                stopped: 9538502864,
                unknown: 2528076596,
                unregistered: 2083671213,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'ituf9e0w2sjkevrt66j1',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 18:48:58',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-21 01:36:54',
                error: 4782205942,
                inactive: 3277435939,
                successful: 8353354311,
                stopped: 1796463222,
                unknown: 7224900146,
                unregistered: 6224490618,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'o8cm0706a0g4e1nsjkwk',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 13:52:27',
                executionMonitoringStartAt: '2020-07-21 15:55:06',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 1092627538,
                inactive: 3922574355,
                successful: 7746719048,
                stopped: 1859462333,
                unknown: 7460901924,
                unregistered: 7444720730,
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
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'thuscgyi333vtoeqty60',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 17:52:42',
                executionMonitoringStartAt: '2020-07-21 13:07:12',
                executionMonitoringEndAt: '2020-07-21 21:16:38',
                error: 2329341265,
                inactive: 6838123110,
                successful: 6138340071,
                stopped: 7296353191,
                unknown: 3056133265,
                unregistered: 4007632704,
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
                        value   : '423d8a3e-2701-4236-ad44-c3167fcb5691'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '423d8a3e-2701-4236-ad44-c3167fcb5691'));
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
            .get('/bplus-it-sappi/channel-overview/423d8a3e-2701-4236-ad44-c3167fcb5691')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '423d8a3e-2701-4236-ad44-c3167fcb5691'));
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
                
                id: 'a5469bf7-ed1f-421d-9d18-f222d018fc5a',
                tenantId: 'b3f4ecd8-993b-46d2-af49-189c950c05d6',
                systemId: 'c8466262-954c-4e60-955b-c4aba1245371',
                systemName: 'akjil17k4ixtieg2ma5f',
                executionId: 'c299edf1-f174-4538-a3f5-25f1f7506a74',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 14:03:36',
                executionMonitoringStartAt: '2020-07-21 01:50:58',
                executionMonitoringEndAt: '2020-07-21 11:23:23',
                error: 9206657434,
                inactive: 1914184240,
                successful: 9707672496,
                stopped: 7000165553,
                unknown: 8111564574,
                unregistered: 5594997281,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                systemName: 'dvw9mgecaknrsevsassa',
                executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 09:58:49',
                executionMonitoringStartAt: '2020-07-21 07:19:24',
                executionMonitoringEndAt: '2020-07-21 16:51:46',
                error: 6881881765,
                inactive: 8991942894,
                successful: 3613743007,
                stopped: 8215279999,
                unknown: 5712258225,
                unregistered: 1302433297,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '423d8a3e-2701-4236-ad44-c3167fcb5691'));
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
            .delete('/bplus-it-sappi/channel-overview/423d8a3e-2701-4236-ad44-c3167fcb5691')
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
                        id: '70896bf8-2405-415c-a2bc-2be09b53381c',
                        tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                        systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                        systemName: 'msjw4103kqpjs09aetlu',
                        executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-22 00:27:26',
                        executionMonitoringStartAt: '2020-07-21 19:38:05',
                        executionMonitoringEndAt: '2020-07-21 06:12:24',
                        error: 8027889238,
                        inactive: 5821057195,
                        successful: 4144575814,
                        stopped: 3096131240,
                        unknown: 1878899251,
                        unregistered: 8568104813,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', '70896bf8-2405-415c-a2bc-2be09b53381c');
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
                            value   : '423d8a3e-2701-4236-ad44-c3167fcb5691'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('423d8a3e-2701-4236-ad44-c3167fcb5691');
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
                    id: '423d8a3e-2701-4236-ad44-c3167fcb5691'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('423d8a3e-2701-4236-ad44-c3167fcb5691');
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
                        
                        id: '65cf7934-318b-4a8a-b185-22a40bc632cd',
                        tenantId: '074e391f-161d-4451-8f0b-8358a48f4fba',
                        systemId: '4243970b-2a46-4d4a-ab6a-bc377664813c',
                        systemName: 'kxlitma562p9k6l7jvys',
                        executionId: '97973029-e21a-44e7-8bfe-1424857c0af6',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-21 14:08:05',
                        executionMonitoringStartAt: '2020-07-21 14:19:04',
                        executionMonitoringEndAt: '2020-07-21 10:08:41',
                        error: 4200332168,
                        inactive: 2687073338,
                        successful: 7384447908,
                        stopped: 3565123963,
                        unknown: 9887015707,
                        unregistered: 3574945318,
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
                        
                        id: '423d8a3e-2701-4236-ad44-c3167fcb5691',
                        tenantId: '7373cee6-d316-4085-8f27-ab48d3e74d6d',
                        systemId: 'db96dfe9-46bd-412e-af3b-dde8988d644c',
                        systemName: 'bgdqdyyoix1dfjzqzcwv',
                        executionId: 'ac24879f-862f-4b27-af72-47ce34cfe605',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-21 12:51:24',
                        executionMonitoringStartAt: '2020-07-21 15:32:49',
                        executionMonitoringEndAt: '2020-07-21 23:29:28',
                        error: 8420943883,
                        inactive: 8265052024,
                        successful: 5834503198,
                        stopped: 9220714944,
                        unknown: 5134809823,
                        unregistered: 1270231065,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('423d8a3e-2701-4236-ad44-c3167fcb5691');
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
                    id: '423d8a3e-2701-4236-ad44-c3167fcb5691'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('423d8a3e-2701-4236-ad44-c3167fcb5691');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});