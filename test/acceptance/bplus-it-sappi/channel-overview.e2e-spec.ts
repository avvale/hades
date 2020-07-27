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
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'wajetz9wis452cz05puxdr7dan7nfmna5r6so1swx5j1d1sh8k',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'zc1f8xo6nfa0ofkuj99n',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 23:52:12',
                executionMonitoringStartAt: '2020-07-27 00:12:11',
                executionMonitoringEndAt: '2020-07-26 19:34:15',
                error: 2300353396,
                inactive: 3179771629,
                successful: 2192487845,
                stopped: 1886124639,
                unknown: 1071653851,
                unregistered: 9515685223,
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
                
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: '9fmbg94snrumo9ye5murjiujziw8f0vx4u1vuea9vb8vgcf4zt',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'atkhpnxrpbzsawe8riss',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 00:34:06',
                executionMonitoringStartAt: '2020-07-27 08:01:23',
                executionMonitoringEndAt: '2020-07-27 05:14:06',
                error: 2890978388,
                inactive: 3848256550,
                successful: 9602355608,
                stopped: 6617083436,
                unknown: 4313778265,
                unregistered: 9303564620,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: null,
                tenantCode: '9ic4hihjahjuk1l3441kt2m1owbeo8de7fao4dfj9m0eo8jkgy',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: '7ojrcwz9jif8kfvhj0ha',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 21:21:40',
                executionMonitoringStartAt: '2020-07-26 22:43:14',
                executionMonitoringEndAt: '2020-07-27 07:30:49',
                error: 7258400870,
                inactive: 3459491354,
                successful: 6740120765,
                stopped: 4659696700,
                unknown: 8128417856,
                unregistered: 2622684473,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                
                tenantCode: '14l1a7uygzkhb8v09qjzpv8zgbjsebvkgih2vjf8dmvkdns27m',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'ljt9ol5ssflt5pe5czg8',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:35:01',
                executionMonitoringStartAt: '2020-07-27 01:07:15',
                executionMonitoringEndAt: '2020-07-26 22:30:34',
                error: 1873887726,
                inactive: 4996389554,
                successful: 2244389725,
                stopped: 4788471341,
                unknown: 6712805778,
                unregistered: 2862224448,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: null,
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: '3xqp8vab5b9wlibcl932',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 19:16:03',
                executionMonitoringStartAt: '2020-07-26 22:24:10',
                executionMonitoringEndAt: '2020-07-27 02:26:21',
                error: 3140068628,
                inactive: 8346519522,
                successful: 4067088553,
                stopped: 7856619169,
                unknown: 8920196787,
                unregistered: 7895293009,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: '9b0d3k1c8ju5ogtqfmd2',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:08:03',
                executionMonitoringStartAt: '2020-07-27 13:23:00',
                executionMonitoringEndAt: '2020-07-27 13:38:19',
                error: 9021086226,
                inactive: 7083496889,
                successful: 7136949913,
                stopped: 3650729842,
                unknown: 6456374342,
                unregistered: 8492629669,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'yw68fhd2ii1yu80dpufvugbm85dugifix3eg3jo109v1ig2cxw',
                systemId: null,
                systemName: 'g42x48naa95b1h9w7ldv',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:36:23',
                executionMonitoringStartAt: '2020-07-27 07:15:56',
                executionMonitoringEndAt: '2020-07-26 18:36:02',
                error: 1899843158,
                inactive: 9977082201,
                successful: 8152626287,
                stopped: 7941630898,
                unknown: 6289053959,
                unregistered: 3763735418,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'z0todvker4o47h0memuglqdcjz3uolible079lbihr655m9uel',
                
                systemName: 'zjkz2s04ieaflopgir0c',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 02:39:37',
                executionMonitoringStartAt: '2020-07-27 12:28:49',
                executionMonitoringEndAt: '2020-07-26 17:18:54',
                error: 1929647331,
                inactive: 5747108814,
                successful: 7894891159,
                stopped: 7334933482,
                unknown: 4334187704,
                unregistered: 5633340561,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: '37tpaxbnzp8893fagddmu2fdr3sloob2vm73jcf4kupa3ulbwp',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: null,
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 00:15:28',
                executionMonitoringStartAt: '2020-07-27 04:58:03',
                executionMonitoringEndAt: '2020-07-27 15:53:21',
                error: 2092957645,
                inactive: 3512620630,
                successful: 7716540948,
                stopped: 1429347585,
                unknown: 3781548364,
                unregistered: 6960737377,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: '83hqldrxt0zlypdcx31fto9ynif14oij9vxfg10sznputpmm1r',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 00:44:54',
                executionMonitoringStartAt: '2020-07-26 23:38:51',
                executionMonitoringEndAt: '2020-07-27 00:08:06',
                error: 7954652421,
                inactive: 7090982317,
                successful: 3415035432,
                stopped: 7453760065,
                unknown: 2844544173,
                unregistered: 2708371556,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'ekt8n8fh5marab4nfe9ngt5dn80vhlwhniov7ezj4v146j89ix',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: '3yj0s3ugqe70zae2grp4',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:02:57',
                executionMonitoringStartAt: '2020-07-27 10:53:36',
                executionMonitoringEndAt: '2020-07-27 13:34:53',
                error: 8496405074,
                inactive: 9700847659,
                successful: 9308339625,
                stopped: 9243848739,
                unknown: 4574185550,
                unregistered: 2256396777,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'to75i9dd4jbcg7kskulidvjetxrejpccals94by7nblb4fu3j4',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'q8yo94n5k06gg8xwgwsz',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:18:34',
                executionMonitoringStartAt: '2020-07-27 09:00:01',
                executionMonitoringEndAt: '2020-07-26 16:42:03',
                error: 1376621464,
                inactive: 2751980080,
                successful: 4033862094,
                stopped: 9669756305,
                unknown: 1722438733,
                unregistered: 3387593709,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'i01jtk1ezprg30emhu8832wd1ccugem1lqmj380khjub6qyv2k',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'k3jv2hgkf2cdeoeu6hz8',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: null,
                executionExecutedAt: '2020-07-27 14:42:26',
                executionMonitoringStartAt: '2020-07-27 09:30:26',
                executionMonitoringEndAt: '2020-07-27 04:11:47',
                error: 1247792461,
                inactive: 9628322749,
                successful: 8001869305,
                stopped: 5584345482,
                unknown: 1683309200,
                unregistered: 8557940665,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'nirn7yh6d8n4n10etypdkd9zmolgobnmuy0yuk6mevkil0khar',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'uv7zcjk3744vtdj3aj1g',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                
                executionExecutedAt: '2020-07-27 02:24:31',
                executionMonitoringStartAt: '2020-07-27 13:33:29',
                executionMonitoringEndAt: '2020-07-26 22:16:01',
                error: 7739066755,
                inactive: 9634326519,
                successful: 7657815658,
                stopped: 3350732011,
                unknown: 6071372143,
                unregistered: 7237996758,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: '1fkcxsetshyapuwdo8f42fcfny6lant0it59tqyjyodxa6qv94',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'z141wpxhsnuf14izli1r',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 06:08:52',
                executionMonitoringEndAt: '2020-07-27 05:55:45',
                error: 6341441918,
                inactive: 3249050534,
                successful: 3481697724,
                stopped: 6264648357,
                unknown: 3737214277,
                unregistered: 3888322388,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'df2rewzy6d2pqmp0ip60mionji9nsoc75m497ctzuyshntwc41',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'nyxpk3jq55y0f5pevofz',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-26 20:09:41',
                executionMonitoringEndAt: '2020-07-27 06:09:50',
                error: 3989078519,
                inactive: 2880436362,
                successful: 6001260802,
                stopped: 5545286662,
                unknown: 1363757990,
                unregistered: 7131102957,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: '07msfrsyma5r6p4et750u2gdxvu0d279t8iycttr5jep5ughbh',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'mzdqpeiku9lvqu1pvkfh',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-26 18:14:16',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-27 09:46:32',
                error: 2151493286,
                inactive: 4622572517,
                successful: 1701333637,
                stopped: 4463727568,
                unknown: 5087044976,
                unregistered: 7868427933,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'uwrsswfe2c2ilm06imfpse6oy3nhvl1ydxx78q7kc8hqwtfjrp',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: '17mrxhe69o6bjn94n4c2',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 04:02:28',
                
                executionMonitoringEndAt: '2020-07-27 09:28:00',
                error: 6512784798,
                inactive: 5511215432,
                successful: 9602031965,
                stopped: 4581420731,
                unknown: 4178036587,
                unregistered: 8726717714,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'bjywp5uskwvhh788q40beah6jba3j5t8erfm9o1ekegn38u4ne',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'mwnyyzs23a8he6yoi9z1',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 10:07:05',
                executionMonitoringStartAt: '2020-07-26 21:20:20',
                executionMonitoringEndAt: null,
                error: 2493801848,
                inactive: 7765827830,
                successful: 8596740336,
                stopped: 5734288404,
                unknown: 1952660852,
                unregistered: 5125244878,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'czgju5bckzky7x962d97yqongdis9u9pd8pv0n80l9bh9vvc1m',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'ju47rj7y55abmffzsp2o',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:54:29',
                executionMonitoringStartAt: '2020-07-27 10:52:44',
                
                error: 8409650196,
                inactive: 1291017613,
                successful: 7184119835,
                stopped: 7984978009,
                unknown: 8004476920,
                unregistered: 8116420647,
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
                id: 'mdvfmcg65n4txe1kffmyfzyr0x45v7h6u34wi',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'wjvywe8ho5keq3dpz6nzwi6i54s8fxhxo3dxnomvarpyfqr0jm',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: '9hgra9kxlhtgem481kkb',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:59:21',
                executionMonitoringStartAt: '2020-07-26 16:59:28',
                executionMonitoringEndAt: '2020-07-26 19:03:38',
                error: 3538666839,
                inactive: 5070926068,
                successful: 4104085505,
                stopped: 6717070081,
                unknown: 7973347798,
                unregistered: 4542286157,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: 'ii7bye07eu4jsfq7ajf28yixs8abmjeh1vpa2',
                tenantCode: 'niv15dajlyteluyh5xvukq090upk05sc25x5qagwgne0oriq1j',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: '5vnwjvrbbo05sthrr9ds',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 01:45:33',
                executionMonitoringStartAt: '2020-07-27 00:36:04',
                executionMonitoringEndAt: '2020-07-27 01:11:48',
                error: 5676302826,
                inactive: 6852166584,
                successful: 1610445232,
                stopped: 8526881863,
                unknown: 4579712237,
                unregistered: 5231978435,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: '34kxma1a6ju9u23cu28aejrdi5jciwzhymne6zgkj45pnjz2iu',
                systemId: 'pwwu96674ifnrdc89t3plards4kovgu8kmk46',
                systemName: 'ighj69doocxj9mf8li9o',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 15:27:17',
                executionMonitoringStartAt: '2020-07-26 23:11:01',
                executionMonitoringEndAt: '2020-07-26 23:08:38',
                error: 1870024981,
                inactive: 4220467294,
                successful: 2723044039,
                stopped: 3160223614,
                unknown: 8386659719,
                unregistered: 1508474054,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'qy000voube9gh6kkguq3w7zgmo5byc5lg6gqale0cd0ydlb74j',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'vu2b3orwsgzaa5xpuvgu',
                executionId: 'mbay0tdorr1z9j4j4mbt0gjncjegenb020ory',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 03:39:27',
                executionMonitoringStartAt: '2020-07-27 12:04:50',
                executionMonitoringEndAt: '2020-07-27 01:03:46',
                error: 7358273761,
                inactive: 4402720569,
                successful: 8663629113,
                stopped: 7968029793,
                unknown: 3049508252,
                unregistered: 8763102668,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'ujo3dzxi4r2woo0dgmmsy7byud5yoe6aqwj7fc5sxg3q1g9p2vl',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'yzyoz5br8fc1080wnkyl',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 08:28:35',
                executionMonitoringStartAt: '2020-07-27 02:27:56',
                executionMonitoringEndAt: '2020-07-27 07:28:50',
                error: 7798906936,
                inactive: 6687055374,
                successful: 5221352919,
                stopped: 1423558177,
                unknown: 5138874895,
                unregistered: 3762703411,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'ws0f97xukkwyl5k1m5l4a91w5mc8q7lxk5qcmkd0mwg1odyriw',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: '05sfr31osolppeyu7n4ob',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 06:48:03',
                executionMonitoringStartAt: '2020-07-27 00:54:03',
                executionMonitoringEndAt: '2020-07-26 17:36:00',
                error: 5193130667,
                inactive: 7969978889,
                successful: 5435045275,
                stopped: 1937492814,
                unknown: 4692600426,
                unregistered: 7463007677,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: '3du7rtoc4gxi08nmysf1zg4u7kn5aa4zk8753137cw1hr0d0je',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: '4rp8q1xtdqd9ivb7v3kr',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:01:34',
                executionMonitoringStartAt: '2020-07-26 23:51:32',
                executionMonitoringEndAt: '2020-07-27 02:09:57',
                error: 62706039604,
                inactive: 3226770333,
                successful: 5962313221,
                stopped: 1165941527,
                unknown: 2071005623,
                unregistered: 9664713063,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 't24syuefhf26a2wu19kq6ceh6k7k37s6t0bbmnx7z1m87kxe1r',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'abwdn3dg6unamxekkwvh',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 06:53:36',
                executionMonitoringStartAt: '2020-07-27 11:29:43',
                executionMonitoringEndAt: '2020-07-27 00:21:32',
                error: 5112197864,
                inactive: 28834759125,
                successful: 5827449207,
                stopped: 3090825411,
                unknown: 8671125729,
                unregistered: 2210681302,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'qg88wddz7106bogci76rl1fa7csgpbrrdpng90h2r2jrompgvn',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'a25zf4x9fqvuortzsrvf',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 21:11:21',
                executionMonitoringStartAt: '2020-07-27 00:49:00',
                executionMonitoringEndAt: '2020-07-27 04:08:17',
                error: 1360286254,
                inactive: 5229718482,
                successful: 59190640181,
                stopped: 8676302132,
                unknown: 5047310855,
                unregistered: 8140719945,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: '86zfy2cnfyuu6oyo7nxzxi8cs85y713aw7bwddn7bv7omrasbf',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'm6xtr3xeezqs80ym3mt9',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:23:17',
                executionMonitoringStartAt: '2020-07-27 13:10:26',
                executionMonitoringEndAt: '2020-07-27 11:24:27',
                error: 1482545385,
                inactive: 6245201639,
                successful: 6871872929,
                stopped: 83596220009,
                unknown: 1487625043,
                unregistered: 9323145830,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: '0nsp9ffjufk0hzsl367b16mro4bknzibxyy5udykicdlmhx1u4',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'vwqbmy7ebxf5rbjr6fs9',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 21:42:35',
                executionMonitoringStartAt: '2020-07-27 13:58:58',
                executionMonitoringEndAt: '2020-07-27 06:56:53',
                error: 6741074006,
                inactive: 5298442410,
                successful: 5084300170,
                stopped: 4877767608,
                unknown: 70106401692,
                unregistered: 7079461615,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: '6vrk0kv3rer8qjizwvxg8a6q4nxg75i0rd3utl60j8wp94bonl',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'wb1i06llhbexj7w02q9f',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:20:54',
                executionMonitoringStartAt: '2020-07-26 21:24:34',
                executionMonitoringEndAt: '2020-07-27 14:23:20',
                error: 9154407246,
                inactive: 1395295418,
                successful: 1649438971,
                stopped: 8384068625,
                unknown: 5718852456,
                unregistered: 59415021681,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'astf5db3gxsof4yt07dimlte1wbw24acug5ad8ygqxig353dkq',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: '8idtyrfas1nc2a9owbfm',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 03:47:47',
                executionMonitoringStartAt: '2020-07-27 13:09:58',
                executionMonitoringEndAt: '2020-07-26 22:22:22',
                error: -9,
                inactive: 2883565996,
                successful: 9454039785,
                stopped: 2861492690,
                unknown: 1216029148,
                unregistered: 4838376685,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'p9i57xbujqu08ls57yoq5a8jpm4d2kwaucb4c8jprk1dg7yn63',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'nyiev1d9xo045j7p0wfc',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 03:34:27',
                executionMonitoringStartAt: '2020-07-26 19:18:24',
                executionMonitoringEndAt: '2020-07-27 02:12:23',
                error: 5647563638,
                inactive: -9,
                successful: 9179740437,
                stopped: 4273509709,
                unknown: 6818874427,
                unregistered: 4052705422,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'v4hcozt8fia0d5as15uijzmvgqh162810rh6otuck5g1no13u3',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'irqzji6yzpat1ooe32dw',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 09:36:04',
                executionMonitoringStartAt: '2020-07-26 18:44:20',
                executionMonitoringEndAt: '2020-07-26 16:41:50',
                error: 8960855143,
                inactive: 5990947472,
                successful: -9,
                stopped: 7377775752,
                unknown: 6042703922,
                unregistered: 7341251254,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'f986wxyibsosgei9vqc3chb9h2mmrrucm9ob521eh3b1p1llq9',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'tk0l4zc779yxqhawkt0c',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:19:36',
                executionMonitoringStartAt: '2020-07-27 11:24:38',
                executionMonitoringEndAt: '2020-07-26 22:07:47',
                error: 5947776196,
                inactive: 5172782848,
                successful: 3055788489,
                stopped: -9,
                unknown: 6800947453,
                unregistered: 1781927803,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'fbyhfwfji88qwvsa8q0deun3y3yt0m2zn30kvqze8yzil20csj',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'izdqjsal5m88hxd4i8va',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:59:08',
                executionMonitoringStartAt: '2020-07-27 11:34:04',
                executionMonitoringEndAt: '2020-07-27 16:00:32',
                error: 2627754960,
                inactive: 8716284907,
                successful: 7960249986,
                stopped: 8720619312,
                unknown: -9,
                unregistered: 2916010428,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'd1zdzqy6gxujjbssnt0kx5j1tem3su65jmto81dh5u45eyzr74',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'vgf2s7pi22afzehpd05v',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 18:43:51',
                executionMonitoringStartAt: '2020-07-26 16:49:46',
                executionMonitoringEndAt: '2020-07-27 14:32:18',
                error: 8222445873,
                inactive: 1004344145,
                successful: 9660620341,
                stopped: 8612065392,
                unknown: 6286478100,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'kq8ih3gr1borvs0ndvsguqd0tn8xk07ls2mk620m2j8fvkokcc',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: '763cn9m9du7rfjdzhtge',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-27 12:16:48',
                executionMonitoringStartAt: '2020-07-26 23:10:56',
                executionMonitoringEndAt: '2020-07-26 18:16:01',
                error: 2254184227,
                inactive: 1378054943,
                successful: 5220139725,
                stopped: 9782436953,
                unknown: 2487051729,
                unregistered: 5828194402,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'f7jgfrsfq75jc8znzqijkbrwahgpqyxsf72pyr4q84cte6pjmc',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'h2cazxdu94bq1m9cv6sf',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 00:19:31',
                executionMonitoringEndAt: '2020-07-27 09:18:02',
                error: 8378331973,
                inactive: 3686719928,
                successful: 8624203019,
                stopped: 7280145804,
                unknown: 6339364041,
                unregistered: 2454662794,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'h00y16faclym5mmfl01y90ouxpodwi9d55twneid3rfxf4jgo3',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'ldka48mmwxbiow5pop9r',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-26 18:33:42',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 09:44:46',
                error: 2473893936,
                inactive: 2167656440,
                successful: 9717565533,
                stopped: 5910948072,
                unknown: 9781991683,
                unregistered: 6737113995,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: 'xh8o3uwynbj2w054aw5psfz7yecm0qy2v3gl6n7yhylkw5xpy6',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'l3ekg69ep8fbl9u5ov2s',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 06:33:04',
                executionMonitoringStartAt: '2020-07-27 03:57:16',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 4617657824,
                inactive: 6032685798,
                successful: 1203807031,
                stopped: 7201892978,
                unknown: 1522579859,
                unregistered: 4703057597,
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
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: '01xm3vodq3utqarbni27sdiq5pf20v4vm3omxwhdepja41t54l',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'gmz3gw0crygzirr5waew',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 14:29:11',
                executionMonitoringStartAt: '2020-07-27 07:47:06',
                executionMonitoringEndAt: '2020-07-26 19:34:36',
                error: 5808049706,
                inactive: 9224790414,
                successful: 4792186544,
                stopped: 5360749356,
                unknown: 6729442759,
                unregistered: 2773381032,
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
                        value   : '15dbe3d6-e1cd-4391-b444-f1eef640ee86'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '15dbe3d6-e1cd-4391-b444-f1eef640ee86'));
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
            .get('/bplus-it-sappi/channel-overview/15dbe3d6-e1cd-4391-b444-f1eef640ee86')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '15dbe3d6-e1cd-4391-b444-f1eef640ee86'));
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
                
                id: 'fdef5928-dab1-454f-b3a9-828f302f3de7',
                tenantId: 'fe9f6db0-bbf9-451b-b35b-52fd23d572ab',
                tenantCode: 'n12e9erhefbqe080wesnmqeahk0p48g36xsut3c2yqlgujrz4r',
                systemId: '190a542f-3ae3-4a53-9923-018b57e9818f',
                systemName: 'ytiho36mzqv2d4bc3wri',
                executionId: '59000eb9-602b-4f73-998a-43ccfe1a1cdb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 02:36:59',
                executionMonitoringStartAt: '2020-07-26 23:59:09',
                executionMonitoringEndAt: '2020-07-27 08:49:47',
                error: 1627459798,
                inactive: 5597792856,
                successful: 7151527545,
                stopped: 8850655145,
                unknown: 6252756481,
                unregistered: 5540479676,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                tenantCode: '4z42kku0sgs6duz88qae1vtr09uwt0vd50dxadvgeo4zjuf109',
                systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                systemName: 'plgmui49utycnpqk7g9h',
                executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:52:43',
                executionMonitoringStartAt: '2020-07-27 11:58:58',
                executionMonitoringEndAt: '2020-07-27 16:14:16',
                error: 6069201465,
                inactive: 8750711753,
                successful: 7296732423,
                stopped: 6560620484,
                unknown: 2719207054,
                unregistered: 8519249478,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '15dbe3d6-e1cd-4391-b444-f1eef640ee86'));
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
            .delete('/bplus-it-sappi/channel-overview/15dbe3d6-e1cd-4391-b444-f1eef640ee86')
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
                        id: 'e9dc4997-db33-4371-bf7d-9228c05c5983',
                        tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                        tenantCode: 'd6xgqw1ravxvsbvsupuhgimaenqaczwsyuzvzdabm5q1r03w3p',
                        systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                        systemName: 'mw1lc0w0jnhonvfm0hqr',
                        executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 12:38:45',
                        executionMonitoringStartAt: '2020-07-26 19:24:36',
                        executionMonitoringEndAt: '2020-07-27 03:40:11',
                        error: 5860498803,
                        inactive: 9073000672,
                        successful: 5925412179,
                        stopped: 9207096639,
                        unknown: 3630946836,
                        unregistered: 5907662679,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', 'e9dc4997-db33-4371-bf7d-9228c05c5983');
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
                            value   : '15dbe3d6-e1cd-4391-b444-f1eef640ee86'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('15dbe3d6-e1cd-4391-b444-f1eef640ee86');
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
                    id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('15dbe3d6-e1cd-4391-b444-f1eef640ee86');
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
                        
                        id: '8efb05f9-dd75-4c60-83de-d98fbbcedaaf',
                        tenantId: '22ff2cc7-cf7e-46ca-8365-d3f6e84bbd77',
                        tenantCode: 'wy1xxfugaiz539im3s43hfi1biqd4eq84ieuzf9wxria33vs3t',
                        systemId: '984df020-e6e3-4524-a06b-9dbe11eb9c52',
                        systemName: 'bw8qeisqo6ivhj5ouuhx',
                        executionId: 'c2c5c937-0924-45df-9db0-b6bebaed33da',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 03:50:20',
                        executionMonitoringStartAt: '2020-07-27 02:38:10',
                        executionMonitoringEndAt: '2020-07-27 04:57:57',
                        error: 8003650079,
                        inactive: 6870204349,
                        successful: 7694526417,
                        stopped: 3026352187,
                        unknown: 3425077183,
                        unregistered: 1223503628,
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
                        
                        id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86',
                        tenantId: '18d0e2ae-3169-4729-8bf5-ebc76dfe1c0f',
                        tenantCode: '478yn3sa3mdec5ygbqugedoruuzy0dv28toez3cf9dp1rmug9y',
                        systemId: 'b64c6669-e2f5-44a4-89b8-4690542e1fed',
                        systemName: '1pk4v7gemmgatftzdijt',
                        executionId: 'b3536620-65f5-436b-adec-ebe82dfe8502',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 12:58:12',
                        executionMonitoringStartAt: '2020-07-27 09:00:09',
                        executionMonitoringEndAt: '2020-07-26 19:04:31',
                        error: 7673952824,
                        inactive: 9684912765,
                        successful: 5154160516,
                        stopped: 7771335638,
                        unknown: 5536203617,
                        unregistered: 1904618248,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('15dbe3d6-e1cd-4391-b444-f1eef640ee86');
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
                    id: '15dbe3d6-e1cd-4391-b444-f1eef640ee86'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('15dbe3d6-e1cd-4391-b444-f1eef640ee86');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});