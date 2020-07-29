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
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: '0dh7ke158exzgxkqw7cnwb7aj3ppn0es9iqgr0f2mc6imb39oz',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'bm21znn0rg21e35pp1zv',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:14:09',
                executionMonitoringStartAt: '2020-07-29 14:55:08',
                executionMonitoringEndAt: '2020-07-28 22:12:08',
                error: 5250919537,
                inactive: 1343409126,
                successful: 4489476758,
                stopped: 6251062511,
                unknown: 7160266296,
                unregistered: 5167183244,
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
                
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'rjptlftm7tr3dcia0xa95cek5pqbb753p7oxgopfxwhp037vr0',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'uuyd6wrbou61hq5hjn6t',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:20:43',
                executionMonitoringStartAt: '2020-07-29 07:24:04',
                executionMonitoringEndAt: '2020-07-29 09:08:32',
                error: 4611206703,
                inactive: 7778088533,
                successful: 2039630366,
                stopped: 6398934056,
                unknown: 2877276687,
                unregistered: 9327258259,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: null,
                tenantCode: 'pjfgdx82gy51oeeyl5m0gzfxh3kwhuiswazd9yee7janhyu63t',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: '31ha7ma0w5mtepfy95ru',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:01:11',
                executionMonitoringStartAt: '2020-07-29 04:19:33',
                executionMonitoringEndAt: '2020-07-28 19:25:15',
                error: 8350667240,
                inactive: 5034822206,
                successful: 6112475130,
                stopped: 5881230319,
                unknown: 7305875174,
                unregistered: 9229018144,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                
                tenantCode: '23e3q2i5y8auhx8nbf6akqnrolq393odqcdukyz930cq123r3l',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: '8e7fg6ufpp6yaczq67vz',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:48:22',
                executionMonitoringStartAt: '2020-07-29 06:39:22',
                executionMonitoringEndAt: '2020-07-29 01:12:54',
                error: 6817587221,
                inactive: 3625955947,
                successful: 3445814846,
                stopped: 5039812853,
                unknown: 5800515502,
                unregistered: 3516337714,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: null,
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'be74q8yqe5n8hedyvlye',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:14:16',
                executionMonitoringStartAt: '2020-07-28 21:02:37',
                executionMonitoringEndAt: '2020-07-29 01:03:43',
                error: 2947107358,
                inactive: 3066523157,
                successful: 2376524864,
                stopped: 3107101719,
                unknown: 8827329377,
                unregistered: 4219987357,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'hjv8cm3pxh1gfvag7lt0',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:39:29',
                executionMonitoringStartAt: '2020-07-29 08:22:03',
                executionMonitoringEndAt: '2020-07-29 06:02:27',
                error: 6367884693,
                inactive: 7713921874,
                successful: 7601341907,
                stopped: 3300191927,
                unknown: 1509629322,
                unregistered: 8972945345,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: '8xw1hrpfnplanmyn4sjd0yyerkn7n61wq0wn2m49i0rgvu51te',
                systemId: null,
                systemName: 'gcplzg687bczr80lsmqb',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:04:21',
                executionMonitoringStartAt: '2020-07-29 06:30:51',
                executionMonitoringEndAt: '2020-07-29 07:37:45',
                error: 1815738526,
                inactive: 2897515805,
                successful: 2496841131,
                stopped: 8995106084,
                unknown: 4287288095,
                unregistered: 3168759658,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'pua2f085bcf40bx0bnizub3chetaml0uqv96f1522w36rghcdn',
                
                systemName: 'fs6dr7wd8mtmdwzmaixg',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:58:22',
                executionMonitoringStartAt: '2020-07-29 05:43:23',
                executionMonitoringEndAt: '2020-07-29 05:24:40',
                error: 3101665670,
                inactive: 1092622735,
                successful: 9444959530,
                stopped: 9689450645,
                unknown: 7552377779,
                unregistered: 8633669402,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'casydw24e8am59b129dsc35pngsjv3jk1th6hadq9oz97qyi2y',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: null,
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:58:42',
                executionMonitoringStartAt: '2020-07-29 13:26:04',
                executionMonitoringEndAt: '2020-07-29 12:15:18',
                error: 5486820767,
                inactive: 3850544827,
                successful: 1996381853,
                stopped: 5663784038,
                unknown: 3528214674,
                unregistered: 3210481395,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'uuvnpg59xok1dpmqe9e9n7vkjpm54oapot5s3z4ij4dzvac9qh',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:31:34',
                executionMonitoringStartAt: '2020-07-29 05:35:13',
                executionMonitoringEndAt: '2020-07-29 06:10:40',
                error: 9391126838,
                inactive: 5863899333,
                successful: 3145844836,
                stopped: 4134816692,
                unknown: 3620738344,
                unregistered: 3270303598,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'v1b3uj1pn6c5gnud5ypqcrlv29o54hpjoroqecb3awmugevepp',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: '5jugfcuobnod1aoa7d8z',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:58:53',
                executionMonitoringStartAt: '2020-07-28 16:05:51',
                executionMonitoringEndAt: '2020-07-29 02:24:07',
                error: 8811814557,
                inactive: 4291536920,
                successful: 1181048600,
                stopped: 1289656381,
                unknown: 9824182237,
                unregistered: 3227879074,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'ejao52sd6sxjrj5o6pitn6p2w5afu5h6ihjv7fj6g0wn2r1qtj',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'tfelk0vlh5y07ymj3ueo',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:55:30',
                executionMonitoringStartAt: '2020-07-28 16:21:26',
                executionMonitoringEndAt: '2020-07-28 16:10:35',
                error: 9518329598,
                inactive: 9408295804,
                successful: 9082791774,
                stopped: 7709877053,
                unknown: 6557205311,
                unregistered: 1381753620,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'miwq6vwc7pl5nr6112c9btgzhe83jn3u6htkbgc03260tlpwwj',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: '6ktwimsh594uihljee6u',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: null,
                executionExecutedAt: '2020-07-28 19:32:23',
                executionMonitoringStartAt: '2020-07-28 19:54:37',
                executionMonitoringEndAt: '2020-07-29 05:24:11',
                error: 9009085200,
                inactive: 8501249447,
                successful: 2656311380,
                stopped: 9843359001,
                unknown: 1869218966,
                unregistered: 5402465886,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: '3lpibune3i7mltgx85hc30zul9h9dn972m35ohywml2d2y6fb8',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'vn465b7x8nrvubv4e8ae',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                
                executionExecutedAt: '2020-07-28 20:19:39',
                executionMonitoringStartAt: '2020-07-29 11:12:07',
                executionMonitoringEndAt: '2020-07-28 23:17:30',
                error: 2756970640,
                inactive: 7722916075,
                successful: 7563696127,
                stopped: 2395962262,
                unknown: 7864016808,
                unregistered: 5255079571,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'tiuith557f0vh9n7ger2va915zmqhy8i7ohf6znt0cbnwqgbk3',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'd9hunpqb3cggsabkq2aa',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 05:57:48',
                executionMonitoringEndAt: '2020-07-29 01:06:52',
                error: 8435044303,
                inactive: 3257346064,
                successful: 1904463992,
                stopped: 9865564086,
                unknown: 4666525600,
                unregistered: 2625310490,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'k8yg12fajprfxyuave5qrnytfuz0km277skr7ehng45jmgaiqq',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'dwcckpsht1t5r3ap2cef',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 01:11:00',
                executionMonitoringEndAt: '2020-07-28 16:02:49',
                error: 6963229633,
                inactive: 4556643674,
                successful: 5621772623,
                stopped: 8271661928,
                unknown: 6942229037,
                unregistered: 8755918214,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: '79czxtnpnj9mnrxp6hhka038xg5hgoomdrpoj6jx4j9a9wxjr9',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'i28wzo2jekv5l124r2wt',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:01:38',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-28 21:41:14',
                error: 9111441125,
                inactive: 3239875658,
                successful: 6388242752,
                stopped: 7624751679,
                unknown: 8781047551,
                unregistered: 6556670185,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: '6ee4g8hk76ijqh2rrpr7egma63zvy9s1jzsmm5qofu5rqorwf2',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'cccqhs7othidv0l15byc',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:52:59',
                
                executionMonitoringEndAt: '2020-07-29 15:24:15',
                error: 4188259262,
                inactive: 5554673845,
                successful: 6842816280,
                stopped: 7783382669,
                unknown: 3641912771,
                unregistered: 8109432377,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: '8jct7dlo5p94cfitbxa18mqu1x27dc59pweonq2nfnntxt8p0r',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: '1ugmqmhswyr0j0n8h8r3',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:47:40',
                executionMonitoringStartAt: '2020-07-29 02:03:33',
                executionMonitoringEndAt: null,
                error: 6092717368,
                inactive: 6440776865,
                successful: 8618169713,
                stopped: 8778644990,
                unknown: 4561922478,
                unregistered: 6922039696,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'nz4exn74z2fwxumcrnl0joe3msh0rf6onz6j258ho68d3e6ec1',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: '7qhe94oj8emzj507rlra',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:51:08',
                executionMonitoringStartAt: '2020-07-28 16:02:34',
                
                error: 3685393499,
                inactive: 8907455132,
                successful: 3290738386,
                stopped: 1037629920,
                unknown: 1380789236,
                unregistered: 8339651310,
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
                id: '4ueizfdb0qvfbdxjd15t4yxgvwx6267iqomve',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'z091udxyt73q8krbc9ig5j0gs5en54zxl7oihefpyntyso4juq',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'jzj7myxba27nta0ptka9',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:30:30',
                executionMonitoringStartAt: '2020-07-29 04:16:17',
                executionMonitoringEndAt: '2020-07-29 02:08:25',
                error: 4427076447,
                inactive: 6565287531,
                successful: 3205737925,
                stopped: 8798787164,
                unknown: 1163562077,
                unregistered: 1793235219,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '1bn5tbd8a4ppdkm1gj6cs5x7p74sb7ts6wuaj',
                tenantCode: 'v7kw3bmxa49naxu746ujqtug5nzesnkwhcbk93exd79awtezlm',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'gnsx1gz124x7xw29v7y8',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:28:21',
                executionMonitoringStartAt: '2020-07-29 14:31:02',
                executionMonitoringEndAt: '2020-07-29 11:04:41',
                error: 5531997275,
                inactive: 6453027985,
                successful: 8035512381,
                stopped: 6835774383,
                unknown: 9498830973,
                unregistered: 8820913298,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'k86e7iewzgndd46yihi0ypzz2msumh3kq4f8c8bjdpseysdrfa',
                systemId: 'wfxiddrnb059sklmxedbszafywucc9khveppd',
                systemName: '6o9367bep5vqj5bzh8b4',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:50:53',
                executionMonitoringStartAt: '2020-07-29 04:19:02',
                executionMonitoringEndAt: '2020-07-29 03:30:43',
                error: 3310266306,
                inactive: 1300144775,
                successful: 5837716671,
                stopped: 8188083376,
                unknown: 1657259592,
                unregistered: 2154463179,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: '7clhyozsxkfz2ld7tz4plztvsgltyi36hcqyr6x2vchyccbkrj',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'xdd4yorlp921tj4osmm2',
                executionId: 'krjpty61z8i39andni0snpn2wddosic5cddu6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:44:12',
                executionMonitoringStartAt: '2020-07-28 18:42:16',
                executionMonitoringEndAt: '2020-07-29 12:56:09',
                error: 6157218815,
                inactive: 3702296021,
                successful: 6873411687,
                stopped: 6329853459,
                unknown: 8999193599,
                unregistered: 8193923532,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'l28067lnmihi9d7ams14ncanxzh7xd8n0sad7bpomna15zumvry',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: '374auifh5yn12qpu81w7',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:57:41',
                executionMonitoringStartAt: '2020-07-29 06:40:07',
                executionMonitoringEndAt: '2020-07-29 02:19:53',
                error: 9612460076,
                inactive: 5872746295,
                successful: 2765026889,
                stopped: 4336380373,
                unknown: 1434377717,
                unregistered: 1665351183,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'hxy4h7g74s1fu85ar72t8xr76b5jgq9k47umdrldvswibpfkm9',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'h2fhmljzhvkm0tefp2ey9',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 23:45:33',
                executionMonitoringStartAt: '2020-07-28 23:21:38',
                executionMonitoringEndAt: '2020-07-28 21:01:46',
                error: 1570206405,
                inactive: 9167455002,
                successful: 4468439154,
                stopped: 3959454874,
                unknown: 9167363862,
                unregistered: 8722717481,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'mt5m4up7wrasem92sospya2oxhl9ezdexr0mulam5nj8m408y1',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'kdf3d2y0qdpde7x76pdm',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:09:59',
                executionMonitoringStartAt: '2020-07-28 18:56:20',
                executionMonitoringEndAt: '2020-07-28 17:13:22',
                error: 84448269018,
                inactive: 3182948489,
                successful: 7879539088,
                stopped: 9261462428,
                unknown: 9841001676,
                unregistered: 6990075183,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: '76klo1xmoalhh14904wuvcyug7tp0jjis42b5i97ggsb87s70n',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: '2ywsa4vpfhvd2m2wi4t9',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:37:58',
                executionMonitoringStartAt: '2020-07-29 04:48:09',
                executionMonitoringEndAt: '2020-07-29 06:45:07',
                error: 2696148380,
                inactive: 79836334161,
                successful: 5814565711,
                stopped: 6180902215,
                unknown: 2521482195,
                unregistered: 1322180179,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'jrrltj7ybq4jazwireglr6dju58y46o01n2y147pz3o2km4dlh',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: '1o4f0hs4iandyc9168e7',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:37:34',
                executionMonitoringStartAt: '2020-07-28 21:26:02',
                executionMonitoringEndAt: '2020-07-29 02:12:14',
                error: 6803840604,
                inactive: 8755088155,
                successful: 23502093996,
                stopped: 2994851926,
                unknown: 6545547082,
                unregistered: 7426179134,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'm0ewtdoddiroghb8qcaqqwibdhtnym6o0uxkfyaal19jkoneoa',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: '4ljv1s2ch1vtoiznldpc',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:25:01',
                executionMonitoringStartAt: '2020-07-29 14:49:52',
                executionMonitoringEndAt: '2020-07-29 04:13:51',
                error: 7056130749,
                inactive: 6762983894,
                successful: 4867184693,
                stopped: 64424695949,
                unknown: 1469002461,
                unregistered: 8787594628,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'uh40r1w2ghzvsf19aur24h1cwdcvy29cx388ekbltv2tw1g6fk',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: '1ztxrube9gsol8erd1j6',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:47:47',
                executionMonitoringStartAt: '2020-07-29 13:05:52',
                executionMonitoringEndAt: '2020-07-28 19:51:49',
                error: 4940495338,
                inactive: 3321485102,
                successful: 1721517605,
                stopped: 3309276916,
                unknown: 33695729713,
                unregistered: 9281631205,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: '3nlclmrdbadibaedw9hoyl2akw6lu8w8s4hzcee1kj83mgj4pe',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'q2znu2e06yccdnodk8hh',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:16:32',
                executionMonitoringStartAt: '2020-07-28 22:07:47',
                executionMonitoringEndAt: '2020-07-29 10:13:09',
                error: 7607265237,
                inactive: 1107616247,
                successful: 1948924385,
                stopped: 1385427077,
                unknown: 4309104889,
                unregistered: 90065105495,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'bqixj9pv6qinicojswh8zu37zsx7v9nz2joibejwqry1qc03iu',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: '8aieclci5c8rwb2m6gpw',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:16:14',
                executionMonitoringStartAt: '2020-07-29 11:02:33',
                executionMonitoringEndAt: '2020-07-29 07:34:15',
                error: -9,
                inactive: 1210576461,
                successful: 8275219588,
                stopped: 7466773199,
                unknown: 8235207004,
                unregistered: 5385730413,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: '88fd363vddcxil9k3nj4b3x4oo37ynqk969gakdg3midh2nhti',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'tmeyz3xkk10mghpi5n3g',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:57:16',
                executionMonitoringStartAt: '2020-07-29 02:12:52',
                executionMonitoringEndAt: '2020-07-29 08:17:46',
                error: 4337884563,
                inactive: -9,
                successful: 3331286956,
                stopped: 5197105025,
                unknown: 4298999511,
                unregistered: 3462770440,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'orsr5crgwnnulweiqkga8pztgu729l2falx9tifzih9dwvo62i',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'ywavq8isr3h5d9wjcvh8',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:05:25',
                executionMonitoringStartAt: '2020-07-29 08:52:44',
                executionMonitoringEndAt: '2020-07-29 13:32:48',
                error: 6917456122,
                inactive: 8469433470,
                successful: -9,
                stopped: 9960398269,
                unknown: 8914663214,
                unregistered: 7716158707,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'iegms4p19j8jdks0mp73wzyt8phnem1st3ddifmc692wgnyjz2',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 't9rlt8hk2oeyz0rhgsag',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:55:58',
                executionMonitoringStartAt: '2020-07-28 20:44:31',
                executionMonitoringEndAt: '2020-07-29 11:08:35',
                error: 4890206546,
                inactive: 4500076160,
                successful: 7449940985,
                stopped: -9,
                unknown: 5662004688,
                unregistered: 8061234930,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'avz9vrzdfwlox470fowp2whhq2bm9nej4kiy2qusqka9lyzu3f',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'r9jqwaul9bbhxd5olpk4',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:57:53',
                executionMonitoringStartAt: '2020-07-28 17:48:45',
                executionMonitoringEndAt: '2020-07-29 08:40:04',
                error: 5291143474,
                inactive: 6995827701,
                successful: 6989996590,
                stopped: 9839813094,
                unknown: -9,
                unregistered: 7073264708,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: '364s5b3u4n256gc2x4eq113oy0gtnztmn6215g0rfge85q5b8v',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: '8ik10c74l1t8zabwiinx',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:02:04',
                executionMonitoringStartAt: '2020-07-28 17:51:49',
                executionMonitoringEndAt: '2020-07-28 19:09:07',
                error: 3631847539,
                inactive: 6800011179,
                successful: 2619621605,
                stopped: 7044362444,
                unknown: 2607470025,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'vt15dbdyzmrykptsd169lfh9vi3imu31zu8trvtq63hvrhx3qa',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'md9jb2wvnic6eomwojic',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-28 18:28:27',
                executionMonitoringStartAt: '2020-07-29 06:11:25',
                executionMonitoringEndAt: '2020-07-29 01:32:14',
                error: 5353984822,
                inactive: 1923482737,
                successful: 2626548744,
                stopped: 1308699981,
                unknown: 8289185073,
                unregistered: 4036588445,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'fxnqpm097kq10nq8119bsyz7s6lngooeclhu33d5m9rfkg18jw',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'ipt8g1tnkr81lj77d5sp',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 13:23:12',
                executionMonitoringEndAt: '2020-07-29 06:59:06',
                error: 4554442741,
                inactive: 5111624196,
                successful: 7079817610,
                stopped: 1295023480,
                unknown: 5668305532,
                unregistered: 4757913407,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'anv5t3l6ufahma3x28festehhbo8q1q6ggmc7q4oz9l3d8onie',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'tjvs9kdv6zl01gwi3nbj',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:07:17',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 12:40:34',
                error: 7358980295,
                inactive: 6052155441,
                successful: 8043406789,
                stopped: 3810888562,
                unknown: 7590811149,
                unregistered: 9075281692,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'hj7yozd3sd9ea4jc94kfyn5us81leye6hgzytzgwro5ml4wpt9',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'fsfr828v3iihuufmv8o0',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:22:42',
                executionMonitoringStartAt: '2020-07-29 09:22:07',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 4993857964,
                inactive: 9944776559,
                successful: 6828093824,
                stopped: 1877049370,
                unknown: 8415175429,
                unregistered: 1027895823,
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
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 'e29ycely26b59yxzpnxcilj4utww02rdypb5zhold2whb5rs9v',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: 'mj1eodzxajqoeifead04',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:17:19',
                executionMonitoringStartAt: '2020-07-29 14:23:15',
                executionMonitoringEndAt: '2020-07-28 16:52:01',
                error: 9975031961,
                inactive: 9746514607,
                successful: 4079588272,
                stopped: 6730112610,
                unknown: 5208876800,
                unregistered: 9225760237,
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
                        value   : '53608938-c593-479c-8108-1a59c2816e4b'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '53608938-c593-479c-8108-1a59c2816e4b'));
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
            .get('/bplus-it-sappi/channel-overview/53608938-c593-479c-8108-1a59c2816e4b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '53608938-c593-479c-8108-1a59c2816e4b'));
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
                
                id: 'ebd23f6d-913f-4f6a-adab-a9cb07cf0e96',
                tenantId: '031052db-aa25-427e-bbdd-9611935ed3db',
                tenantCode: 'g3npl0dt5rwvf3hza6dfp2dfl8pz2lbjal60jz03efkgvgyrmw',
                systemId: 'a702859d-3355-4f1a-ba43-d0f64034e4d9',
                systemName: 'tvk23oth6qepjihgiqp2',
                executionId: '193517b9-8cc8-4151-b2d8-de31c5c523a0',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:46:36',
                executionMonitoringStartAt: '2020-07-29 00:02:01',
                executionMonitoringEndAt: '2020-07-28 19:41:53',
                error: 1655888035,
                inactive: 4303355030,
                successful: 3597146538,
                stopped: 3287785172,
                unknown: 5373540771,
                unregistered: 6869534428,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '53608938-c593-479c-8108-1a59c2816e4b',
                tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                tenantCode: 't0k5z6rv7azsysev2xx3yo6tm2odguobby5tobtbhpyyts6nf4',
                systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                systemName: '4o1ooih3izs7zc8p1aep',
                executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:59:10',
                executionMonitoringStartAt: '2020-07-29 02:51:49',
                executionMonitoringEndAt: '2020-07-29 00:59:29',
                error: 7764530112,
                inactive: 2635147317,
                successful: 5304509428,
                stopped: 6902505582,
                unknown: 6091353382,
                unregistered: 3617673445,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '53608938-c593-479c-8108-1a59c2816e4b'));
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
            .delete('/bplus-it-sappi/channel-overview/53608938-c593-479c-8108-1a59c2816e4b')
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
                        id: '45fb9e5a-48dd-4ddb-ac90-8952c5210689',
                        tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                        tenantCode: 'ba98drkensbd8u5ycvn01kcopilvpi1vr8wxqua1pb2790idy4',
                        systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                        systemName: '948xv6opozrij7wgr0wa',
                        executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 08:52:56',
                        executionMonitoringStartAt: '2020-07-28 21:40:04',
                        executionMonitoringEndAt: '2020-07-29 13:48:35',
                        error: 2953335368,
                        inactive: 8980033452,
                        successful: 8066354875,
                        stopped: 9098635933,
                        unknown: 8606310210,
                        unregistered: 3409748590,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', '45fb9e5a-48dd-4ddb-ac90-8952c5210689');
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
                            value   : '53608938-c593-479c-8108-1a59c2816e4b'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('53608938-c593-479c-8108-1a59c2816e4b');
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
                    id: '53608938-c593-479c-8108-1a59c2816e4b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('53608938-c593-479c-8108-1a59c2816e4b');
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
                        
                        id: '7f7ad2dc-77c5-441b-84c6-cb1d493260a1',
                        tenantId: '3551f4d7-c948-4a92-98a9-28098f22b129',
                        tenantCode: 'zhx4hzjkml33i1o138rbdhe6hp7edrvd7mmu3q0iujinof3ntu',
                        systemId: '6dd35e18-0920-4c4e-a7a4-ae3d3a6dc06c',
                        systemName: 'cgkacszatrzh02on4nn2',
                        executionId: '7a40fdaf-4279-4b78-ae4b-388b0dd5021a',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 22:48:31',
                        executionMonitoringStartAt: '2020-07-29 07:35:12',
                        executionMonitoringEndAt: '2020-07-29 12:39:11',
                        error: 7580493799,
                        inactive: 1223267711,
                        successful: 3262740480,
                        stopped: 9848840078,
                        unknown: 2240038438,
                        unregistered: 4403037366,
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
                        
                        id: '53608938-c593-479c-8108-1a59c2816e4b',
                        tenantId: '98be3d28-a456-41d7-9de3-bd0ae7af5db4',
                        tenantCode: 'j8jifg8b6tdgfllq9ttxf5k2suat3bvf7hitshfydmeb0ajbe4',
                        systemId: 'a55a3c94-264d-42ae-a660-ec31f6d8441f',
                        systemName: 'csofvlku92ci97aspdky',
                        executionId: '7e31cd1c-833c-448e-8eb8-275494c5ffe7',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 07:55:11',
                        executionMonitoringStartAt: '2020-07-28 17:24:08',
                        executionMonitoringEndAt: '2020-07-28 23:45:58',
                        error: 6924533951,
                        inactive: 5169292933,
                        successful: 1945239177,
                        stopped: 2732947740,
                        unknown: 1979164207,
                        unregistered: 7230407417,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('53608938-c593-479c-8108-1a59c2816e4b');
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
                    id: '53608938-c593-479c-8108-1a59c2816e4b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('53608938-c593-479c-8108-1a59c2816e4b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});