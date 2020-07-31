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
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'td3sr0wi7783pd7aehf191czhh5z2l1yosh0y0vhjvcjhavx5w',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'mdl5w5k70q4doxkut6hr',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 20:00:14',
                executionMonitoringStartAt: '2020-07-31 00:58:40',
                executionMonitoringEndAt: '2020-07-31 04:15:21',
                error: 2312917037,
                inactive: 9971117511,
                successful: 4656353744,
                stopped: 5452754403,
                unknown: 2042217419,
                unregistered: 9759278824,
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
                
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: '4lqhbk66w8hq5nulnq1vwuqmkuilmc29hccg6u7keb571f9i44',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'vp9kyjsh8mtl4xu21so4',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 15:27:34',
                executionMonitoringStartAt: '2020-07-31 06:29:10',
                executionMonitoringEndAt: '2020-07-30 23:05:44',
                error: 1360994042,
                inactive: 5198651620,
                successful: 5121033940,
                stopped: 4504721694,
                unknown: 9753647611,
                unregistered: 8947524221,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: null,
                tenantCode: '9gyxwdb19nebrnypdc2cgiv482luu9lcgsy6cad668p5dj1kp7',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'ri06pgqfwv7xngnbt3aj',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 08:57:39',
                executionMonitoringStartAt: '2020-07-31 06:41:34',
                executionMonitoringEndAt: '2020-07-31 01:04:22',
                error: 4740630912,
                inactive: 5247126034,
                successful: 4198196594,
                stopped: 2479742561,
                unknown: 6767310319,
                unregistered: 2877808879,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                
                tenantCode: 'zu826mrjaomc2oetx2zh5pz656egfto5yqlzmjbhrstluhsgy3',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: '5txbuozojuialnz39evs',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 07:16:48',
                executionMonitoringStartAt: '2020-07-31 03:13:34',
                executionMonitoringEndAt: '2020-07-30 20:09:10',
                error: 1272875911,
                inactive: 2329236904,
                successful: 7096002941,
                stopped: 8979823319,
                unknown: 2788804341,
                unregistered: 8399710426,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: null,
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'b923mfu3chrwg3q8n34e',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 00:36:32',
                executionMonitoringStartAt: '2020-07-31 07:38:53',
                executionMonitoringEndAt: '2020-07-30 23:43:42',
                error: 8969099843,
                inactive: 6484481322,
                successful: 3520896912,
                stopped: 2332321875,
                unknown: 7088738714,
                unregistered: 2894407469,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'gpefps6vulgrbsi9q67f',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 09:35:28',
                executionMonitoringStartAt: '2020-07-31 06:31:30',
                executionMonitoringEndAt: '2020-07-31 09:59:48',
                error: 3012429619,
                inactive: 6482097547,
                successful: 6013838476,
                stopped: 8604477550,
                unknown: 1920403564,
                unregistered: 4150844154,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'ruezag1u3gob6tg5xnfbv5n0ee3zagi6d3fzqm6vzwp0fa2j3z',
                systemId: null,
                systemName: 'z85clld1lc0wyea833mc',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 00:00:59',
                executionMonitoringStartAt: '2020-07-31 06:36:19',
                executionMonitoringEndAt: '2020-07-30 20:40:51',
                error: 6275371868,
                inactive: 9116642599,
                successful: 1318217037,
                stopped: 8576269743,
                unknown: 9360556221,
                unregistered: 8018591037,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'wj07eb1nuyudh0gmls9ekygodcpj4g4p7gomw0mpzzo3mszjva',
                
                systemName: '6phzvauba7rzfjfbsthr',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 01:31:31',
                executionMonitoringStartAt: '2020-07-31 05:27:56',
                executionMonitoringEndAt: '2020-07-30 14:47:19',
                error: 5160198724,
                inactive: 2420854413,
                successful: 2648125644,
                stopped: 9878946517,
                unknown: 8787898011,
                unregistered: 2450675999,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: '3d2n8sne7fcf8j7vj17srjcqpftk1a3g5moclvh2s6cdfteqfd',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: null,
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 15:52:32',
                executionMonitoringStartAt: '2020-07-31 10:31:53',
                executionMonitoringEndAt: '2020-07-30 20:09:26',
                error: 1982656713,
                inactive: 8062433486,
                successful: 6269925176,
                stopped: 2998603413,
                unknown: 5795545257,
                unregistered: 1903615467,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'a2aff1w79y9zugn9ntacxov469yvc0cz568n2cdzipw2te8x1u',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 10:36:21',
                executionMonitoringStartAt: '2020-07-31 10:22:06',
                executionMonitoringEndAt: '2020-07-31 09:12:47',
                error: 8654514634,
                inactive: 5315652312,
                successful: 3441789637,
                stopped: 7605886537,
                unknown: 8816413182,
                unregistered: 6051179913,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'iukxgmubgoxfbollo4pgfhn7vtm6gj6tjgnx46u3ho1y7u1j03',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'y9zo4fhs91y0pvkuh7fm',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 03:34:49',
                executionMonitoringStartAt: '2020-07-30 23:58:19',
                executionMonitoringEndAt: '2020-07-31 00:43:49',
                error: 7328974706,
                inactive: 6130855618,
                successful: 1857014318,
                stopped: 9651592312,
                unknown: 5254957237,
                unregistered: 3424945255,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'bsruu7uq85ge0ihtnkm1pxvaa2686exg07q7eghj6qbfivutxe',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: '16gx0met3fym09luv9m6',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 08:05:41',
                executionMonitoringStartAt: '2020-07-31 08:05:51',
                executionMonitoringEndAt: '2020-07-31 12:39:39',
                error: 3725185223,
                inactive: 4338276476,
                successful: 8763179576,
                stopped: 3826983737,
                unknown: 6146503697,
                unregistered: 3001451470,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'f2p0dd378mffzkvg0r1o91fus3itlt4u1835oprsvn1hpp683s',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: '9m61vdwc46nvm3rd4kds',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: null,
                executionExecutedAt: '2020-07-31 12:35:49',
                executionMonitoringStartAt: '2020-07-30 16:43:22',
                executionMonitoringEndAt: '2020-07-31 07:39:31',
                error: 5609088833,
                inactive: 1368980436,
                successful: 8913431128,
                stopped: 7720243926,
                unknown: 8196269768,
                unregistered: 7726661348,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'ffr33zu3wu7rtzkdkxpt24tf4ijddd3l6ugeshd88ah3qp8unz',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'd62553d5zogjbjs3k12o',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                
                executionExecutedAt: '2020-07-31 00:37:52',
                executionMonitoringStartAt: '2020-07-30 17:05:32',
                executionMonitoringEndAt: '2020-07-31 11:33:27',
                error: 8131988109,
                inactive: 7759657787,
                successful: 7702413003,
                stopped: 4506822113,
                unknown: 1097597941,
                unregistered: 6915390738,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'bizyovx8pf4nqiauvaezbpfl1npigq4k1sg3nf7g43h8pjty66',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'vt5qt6b4eo8yx5ox6b1i',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-31 00:06:32',
                executionMonitoringEndAt: '2020-07-31 00:15:53',
                error: 3649758475,
                inactive: 7336329842,
                successful: 5663248342,
                stopped: 4060746388,
                unknown: 5501859657,
                unregistered: 1401500842,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: '8ehrsqms0as4ddpbju76oapnbuaym542ba7vf5fzz8xefozlx5',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'gzvebia6ygec4e7f9cmm',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-31 10:54:03',
                executionMonitoringEndAt: '2020-07-31 11:14:33',
                error: 2408600571,
                inactive: 4867371615,
                successful: 1981547272,
                stopped: 8540249198,
                unknown: 5002598001,
                unregistered: 5035492718,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: '4hwcallkvq6xwc99pwngnql6rywa2wahs8f9mk6afd3iaoe0w4',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'xkgh26htx28jjofrk2gu',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 00:44:16',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-31 01:53:35',
                error: 5519196447,
                inactive: 9195581006,
                successful: 8501707034,
                stopped: 9855299951,
                unknown: 2964062677,
                unregistered: 5932798298,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: '9ucw8jzm4l8cocxhrwca8lkghdhl1n971fw33qdrplrz8fw66d',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 's1xaxedfi50q2t15sixx',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 03:09:33',
                
                executionMonitoringEndAt: '2020-07-31 07:21:24',
                error: 9080937837,
                inactive: 7465211299,
                successful: 2407972490,
                stopped: 9536274413,
                unknown: 9679286307,
                unregistered: 7227276845,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'v2fmpcmgjop7mq223fwrtrq42ujz9kve832sbffs8zzta8269e',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: '8oga54zcg9jrrfv59lc9',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 02:59:02',
                executionMonitoringStartAt: '2020-07-30 21:38:59',
                executionMonitoringEndAt: null,
                error: 9344531131,
                inactive: 4984791637,
                successful: 9479577879,
                stopped: 2472122546,
                unknown: 3066979879,
                unregistered: 6709593324,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'dxxwsfajzt61e35qvh1dlqild1z5do0d2k8u7q7x6j3hxm14uu',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'pvomchael2ft0f3cxdru',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 19:33:42',
                executionMonitoringStartAt: '2020-07-30 21:39:32',
                
                error: 1446489987,
                inactive: 6610592515,
                successful: 1515463297,
                stopped: 9861078123,
                unknown: 4859097552,
                unregistered: 2174119497,
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
                id: 'y8s1hbfucnx79a1bs9atly4bldwxz5s3wi25n',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'vhz636xjeda2yb31n3xzfm60raugu6trg4h9eddjsh206gk7nx',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'jvjyn6f7ymhuplmnrm8l',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 07:57:15',
                executionMonitoringStartAt: '2020-07-30 21:32:08',
                executionMonitoringEndAt: '2020-07-31 13:50:48',
                error: 2818332662,
                inactive: 7973928694,
                successful: 1109706602,
                stopped: 2389423843,
                unknown: 2844168972,
                unregistered: 6733871605,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: 'sadb3lro1e84k0pwuyvilejo2plbph0ls34dl',
                tenantCode: 'stwt3pdw6810k3pa7bnn6eswg719xnsek33fjfqnuvg882frzx',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: '9u1y611stfp1f8z96ah3',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 19:17:56',
                executionMonitoringStartAt: '2020-07-31 01:50:17',
                executionMonitoringEndAt: '2020-07-30 23:46:20',
                error: 2594544398,
                inactive: 4065433929,
                successful: 8280141518,
                stopped: 3531258382,
                unknown: 8110234941,
                unregistered: 1811022310,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'fq73u95at4ladihhhdsf4q7b3bjqk3pk6tf349xqrqgccpsohk',
                systemId: '4bwszg034rfxpjyj6qkpqy0frw9zq6amtoo1n',
                systemName: 'w85a9ddujbx9y3b2o1zx',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 11:58:33',
                executionMonitoringStartAt: '2020-07-30 18:05:33',
                executionMonitoringEndAt: '2020-07-30 20:47:46',
                error: 1123133414,
                inactive: 4136236607,
                successful: 2485895987,
                stopped: 9636043040,
                unknown: 2456591804,
                unregistered: 3566462186,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'gy6axagclhm0ierbq9jonnlj2jy2hlt26rlvfeiv2m8ijbfzm2',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: '5lewqrap1mpri7brfyl4',
                executionId: '4kb2y1kj1915f4g8qh89bxhyj25drdyvlrevq',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 22:45:06',
                executionMonitoringStartAt: '2020-07-31 13:05:53',
                executionMonitoringEndAt: '2020-07-30 22:51:08',
                error: 1248845602,
                inactive: 6631753873,
                successful: 4725915345,
                stopped: 1608182145,
                unknown: 9174207457,
                unregistered: 7329037277,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: '73wzqunt1vcgbapseib8y10hoo742ju5ktoknkgawutwn7z2knb',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: '6py50grrk59u68da5lo7',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 08:59:09',
                executionMonitoringStartAt: '2020-07-30 16:59:00',
                executionMonitoringEndAt: '2020-07-31 11:42:03',
                error: 9405467026,
                inactive: 3341934318,
                successful: 8878107396,
                stopped: 6815471205,
                unknown: 5452229035,
                unregistered: 5391022548,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'ok9nv9kbqiy4989t5k0c2fneyiwvlnyfdn15r4akkrz735gakv',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'cynoufrisckge2lrzmbzy',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 11:05:52',
                executionMonitoringStartAt: '2020-07-30 17:29:35',
                executionMonitoringEndAt: '2020-07-30 16:57:18',
                error: 1944483161,
                inactive: 2191881065,
                successful: 2890508952,
                stopped: 3225388232,
                unknown: 8136106939,
                unregistered: 9481788656,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: '9qydi0q8pqlkf88xqjqvaj1jqqwgza56va87a3mch8g39cmbhr',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'y5mlhrb7nd30qd9n4mqq',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 07:46:26',
                executionMonitoringStartAt: '2020-07-31 05:21:55',
                executionMonitoringEndAt: '2020-07-31 01:25:07',
                error: 19372710384,
                inactive: 7462370321,
                successful: 1870605038,
                stopped: 3196421875,
                unknown: 5794724005,
                unregistered: 6934072146,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'xjz64t1w7fiqgbypok07qdef0kmmg2dd0fu9akhh48w88awxdo',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: '72mzug7byo8rqelt3qnk',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 22:18:45',
                executionMonitoringStartAt: '2020-07-30 20:45:11',
                executionMonitoringEndAt: '2020-07-31 02:16:23',
                error: 6707216117,
                inactive: 95222712135,
                successful: 1633027354,
                stopped: 5175161516,
                unknown: 8684860073,
                unregistered: 8131256056,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'nqr5ulfojhih84p2tn5iiel0ci1ez1kf1i3bl8g2ej2wkdo1hp',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'f89vz6ukxvwlmkcjwlcc',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 05:53:26',
                executionMonitoringStartAt: '2020-07-30 14:31:41',
                executionMonitoringEndAt: '2020-07-31 08:18:46',
                error: 6748074246,
                inactive: 8985068934,
                successful: 95384569496,
                stopped: 4610021018,
                unknown: 5058584466,
                unregistered: 9782116568,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: '2wnaaz2onca0witay1ydcyi5djxdunpz53hwmjbaqie4fnz3ri',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'ljvbis2gijjwvz7v11en',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 21:36:32',
                executionMonitoringStartAt: '2020-07-30 15:42:42',
                executionMonitoringEndAt: '2020-07-31 10:25:37',
                error: 4230844717,
                inactive: 8971759161,
                successful: 9871849708,
                stopped: 10163916453,
                unknown: 2559296647,
                unregistered: 7210022628,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: '5f8be05olo6cfomxq4cogdfg4i483c7pwvjcstyx7w5w31ojxm',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'n48lqkqf4zqkjshg6ash',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 21:37:54',
                executionMonitoringStartAt: '2020-07-30 18:07:02',
                executionMonitoringEndAt: '2020-07-31 02:02:55',
                error: 2909577875,
                inactive: 3768600506,
                successful: 3220055046,
                stopped: 4024830270,
                unknown: 73917135912,
                unregistered: 9467427292,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'c6wc2aa0sd38q5js1agqu475o9iyy7m0o6o3qgvoa726v8trqz',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'j59ke50l3kclkpzkovgo',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 09:41:33',
                executionMonitoringStartAt: '2020-07-31 08:00:48',
                executionMonitoringEndAt: '2020-07-31 09:40:39',
                error: 5534893564,
                inactive: 1633902947,
                successful: 5009315479,
                stopped: 2317692332,
                unknown: 9278086377,
                unregistered: 69331658618,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'c0xc0m4zn7wrcloyd7swpd8hkzxexak51xpcdefet0zh1l6hkj',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'g3p7ivng57tr4m6nnmgq',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 16:38:00',
                executionMonitoringStartAt: '2020-07-30 20:35:38',
                executionMonitoringEndAt: '2020-07-31 13:32:26',
                error: -9,
                inactive: 9892958477,
                successful: 1058161984,
                stopped: 2239023783,
                unknown: 6813763710,
                unregistered: 9268182258,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'wst2yvnexecpa5x72lm4kptcp3cugskwctvlxnavqbeyzulqfd',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'tout5capp14rxxm2guuu',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 01:10:57',
                executionMonitoringStartAt: '2020-07-30 23:49:09',
                executionMonitoringEndAt: '2020-07-31 09:34:58',
                error: 9601933257,
                inactive: -9,
                successful: 4670334690,
                stopped: 3326353768,
                unknown: 2951794272,
                unregistered: 5671665606,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'b2yseamkmyi6oddylridzrckjsqm86iwif9lthsrqpup4aiv1v',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'amdarrnc2wpch4o8pog3',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 02:20:55',
                executionMonitoringStartAt: '2020-07-31 03:36:01',
                executionMonitoringEndAt: '2020-07-30 15:52:20',
                error: 1297988277,
                inactive: 1528958831,
                successful: -9,
                stopped: 6486001070,
                unknown: 9569906044,
                unregistered: 7831989419,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'knyu1aousgb3pklxezmrd2p62gcm6fxavcxrqfy1kmz8vbdebd',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'vh75fwxg8cv6r5z71lv6',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 20:59:56',
                executionMonitoringStartAt: '2020-07-31 07:41:02',
                executionMonitoringEndAt: '2020-07-30 19:37:07',
                error: 1353011414,
                inactive: 7217045744,
                successful: 5614190463,
                stopped: -9,
                unknown: 6217081772,
                unregistered: 3939885904,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'z96ksi7ebzn06st4rqzyhpyq56emokp46o0687fa6wmbecpjhv',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'c8u5rurj6987kgn6twal',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 21:01:54',
                executionMonitoringStartAt: '2020-07-31 02:01:15',
                executionMonitoringEndAt: '2020-07-30 16:25:39',
                error: 2412338334,
                inactive: 1531443013,
                successful: 7910678148,
                stopped: 4103468799,
                unknown: -9,
                unregistered: 1300454165,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'hf19chdl6u1b3idwa1ujyi50dmzgvvotwbudp7tom9w4cv6jwq',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: '8rfqvb8ka73gc3xpsri4',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 06:04:47',
                executionMonitoringStartAt: '2020-07-30 22:49:16',
                executionMonitoringEndAt: '2020-07-30 14:36:27',
                error: 3806979397,
                inactive: 3416356868,
                successful: 7935970216,
                stopped: 3393829459,
                unknown: 6112174578,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'sotr44scoon2vtnd4vkworig0syf9ocj9b4t629e0mnmi1xjzi',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'yfmgr6bbgculyndjz4oy',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-31 08:12:34',
                executionMonitoringStartAt: '2020-07-31 04:29:58',
                executionMonitoringEndAt: '2020-07-31 06:13:15',
                error: 2313224487,
                inactive: 8575913726,
                successful: 8445436858,
                stopped: 8031523370,
                unknown: 8498901517,
                unregistered: 6157864935,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'w0lyl3o47tekaldzmm10chhzu4pyvcby9r2yilp9u3bwok6u0f',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'i72mcqpmn8997b0973bo',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-31 11:43:29',
                executionMonitoringEndAt: '2020-07-31 00:11:26',
                error: 4892013813,
                inactive: 1048371497,
                successful: 3749646328,
                stopped: 9292121742,
                unknown: 5564514788,
                unregistered: 1672859515,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'cpkn2aa6we3lfpoop4cjscaczqb9ptw87rrrc8zqksrkgahc5a',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 's04fgxzl70koza7n0ixw',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 21:12:39',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-31 08:47:40',
                error: 4915189106,
                inactive: 8783310290,
                successful: 3541851139,
                stopped: 5345835136,
                unknown: 8202315922,
                unregistered: 3580158464,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'f68r4kwp489ff3zeswgtup95w0nn3scko8zargjwuzvzvdmmgz',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'jdc5hl3z8wfjz7blo91i',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 02:45:04',
                executionMonitoringStartAt: '2020-07-30 15:04:53',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 8651021895,
                inactive: 5163378777,
                successful: 7254517800,
                stopped: 7323392998,
                unknown: 3142293478,
                unregistered: 3111000096,
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
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'viees1rqjzol99dvh5zhgfwegablyqzhrw8wo34mm36t41t1sh',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: '7u78ojmw1sjwkcbssdvf',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-31 09:49:08',
                executionMonitoringStartAt: '2020-07-31 02:12:58',
                executionMonitoringEndAt: '2020-07-30 15:20:36',
                error: 2255248345,
                inactive: 3248981532,
                successful: 9240705210,
                stopped: 2156009510,
                unknown: 8291814828,
                unregistered: 3963635754,
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
                        value   : '6ecaea1b-e476-482e-8a6c-ad84bd7bebd5'
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
                        value   : '5cdaeaf2-6d3b-4a16-907a-409cc69eec04'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5cdaeaf2-6d3b-4a16-907a-409cc69eec04'));
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/b42738f0-03a4-4fa3-94d4-26d970c23c11')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/5cdaeaf2-6d3b-4a16-907a-409cc69eec04')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5cdaeaf2-6d3b-4a16-907a-409cc69eec04'));
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
                
                id: 'e35256a8-3075-40e2-8386-d7f7b5aa8cbb',
                tenantId: '8b3ea81e-9429-4382-a0f3-5884175433ee',
                tenantCode: 'yvuf4jpnk9g0fpl0fpzcinq3wwnmy7nf9c0bh1lpse44izfzdw',
                systemId: '12625f8a-bf35-452a-baea-615674d5df52',
                systemName: 'kqrquy911vl2y3ziajyd',
                executionId: '08e8e602-10c0-4379-842e-4c773d8c77bf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-31 07:23:39',
                executionMonitoringStartAt: '2020-07-30 14:54:50',
                executionMonitoringEndAt: '2020-07-31 09:47:35',
                error: 2685944636,
                inactive: 9586407322,
                successful: 8415320911,
                stopped: 6648859349,
                unknown: 9086950923,
                unregistered: 9444781353,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                tenantCode: 'wzm12ia61g8ernhtd1l7bfwyvovcb0tzd4ipgnrat8o7nwkg81',
                systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                systemName: 'cgzs74f2m5q5rdn6ei8f',
                executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 20:00:00',
                executionMonitoringStartAt: '2020-07-30 16:32:07',
                executionMonitoringEndAt: '2020-07-31 10:03:12',
                error: 7099220548,
                inactive: 9691181238,
                successful: 7038149177,
                stopped: 9620729919,
                unknown: 2928929288,
                unregistered: 8483063914,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5cdaeaf2-6d3b-4a16-907a-409cc69eec04'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/d3257fb6-94ca-4f39-a6c5-4aec846a3203')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/5cdaeaf2-6d3b-4a16-907a-409cc69eec04')
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
                        id: '1d662d16-0d5a-4b86-bc64-422e50838bfc',
                        tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                        tenantCode: 'qa7ezhcywnlq74l5c1m39dk8k0c7jyxpc9udt9l5wz4el0mhlq',
                        systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                        systemName: '61c50yuzap4v6yc3cqia',
                        executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-31 11:56:53',
                        executionMonitoringStartAt: '2020-07-31 11:15:05',
                        executionMonitoringEndAt: '2020-07-30 20:35:51',
                        error: 2931838806,
                        inactive: 6855756185,
                        successful: 5784582479,
                        stopped: 3816642934,
                        unknown: 7978788265,
                        unregistered: 7739405446,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', '1d662d16-0d5a-4b86-bc64-422e50838bfc');
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
                            value   : '2ac6cb0d-1a77-49c0-9454-bfed81e57b40'
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
                            value   : '5cdaeaf2-6d3b-4a16-907a-409cc69eec04'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('5cdaeaf2-6d3b-4a16-907a-409cc69eec04');
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
                    id: 'f7dd385a-8c3a-43cc-990d-60be3953a0a7'
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
                    id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('5cdaeaf2-6d3b-4a16-907a-409cc69eec04');
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
                        
                        id: 'b30a2e4d-61df-480f-b93f-2628fbbfb475',
                        tenantId: 'a7597545-7db5-40db-9a00-d2a38f6f505c',
                        tenantCode: '0b7guw8kd07z1kyddj206pvbdwc1fkla8q762an8jwyd1s5ie6',
                        systemId: 'da6e06c0-a201-4dbc-8822-3921ff3336c7',
                        systemName: '9f680454j33p40rk54a2',
                        executionId: '81e452be-54b9-435d-be2b-f181d9b7d094',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-30 21:32:17',
                        executionMonitoringStartAt: '2020-07-31 02:20:38',
                        executionMonitoringEndAt: '2020-07-31 00:24:38',
                        error: 5073592537,
                        inactive: 4257374671,
                        successful: 9210455059,
                        stopped: 8982051614,
                        unknown: 8575677133,
                        unregistered: 8639886062,
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
                        
                        id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04',
                        tenantId: '018920d0-77b7-42f8-b9ca-4bbca611967a',
                        tenantCode: 'vznao025bg4qlmdu8n1hqhcdm9gzid3avpqz4zxdm281wmv6n0',
                        systemId: '513dec1e-3cb7-4145-9b48-9089c3ce464c',
                        systemName: 'nkjfj7utpno7yx75arrd',
                        executionId: 'b41bf9c2-ebe7-4e3f-ad47-7845913274af',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-31 06:47:40',
                        executionMonitoringStartAt: '2020-07-30 21:32:14',
                        executionMonitoringEndAt: '2020-07-30 22:46:20',
                        error: 5080158036,
                        inactive: 1867987729,
                        successful: 5656375906,
                        stopped: 9050480273,
                        unknown: 4029494156,
                        unregistered: 2125981968,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('5cdaeaf2-6d3b-4a16-907a-409cc69eec04');
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
                    id: 'e34e10b5-ce99-4e14-aa99-540e2146f8a4'
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
                    id: '5cdaeaf2-6d3b-4a16-907a-409cc69eec04'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('5cdaeaf2-6d3b-4a16-907a-409cc69eec04');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});