import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IJobOverviewRepository } from '@hades/bplus-it-sappi/job-overview/domain/job-overview.repository';
import { MockJobOverviewRepository } from '@hades/bplus-it-sappi/job-overview/infrastructure/mock/mock-job-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('job-overview', () => 
{
    let app: INestApplication;
    let repository: MockJobOverviewRepository;
    
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
            .overrideProvider(IJobOverviewRepository)
            .useClass(MockJobOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockJobOverviewRepository>module.get<IJobOverviewRepository>(IJobOverviewRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: '2rk5hmha9g1kbixqdiphkzwjr4odkqx39troc3ud2634577ta7',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: '9yo714e1v76d0yvai2it',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 04:17:24',
                executionMonitoringStartAt: '2020-07-23 02:35:11',
                executionMonitoringEndAt: '2020-07-23 11:55:53',
                cancelled: 2191865242,
                completed: 1885853339,
                error: 5833405298,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'lgbggyemgkx6uixni640o6y41rkvabmps3j3yv00c94zffywr8',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'jzsh70hyypkrzr7wmwvh',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 12:42:09',
                executionMonitoringStartAt: '2020-07-23 04:55:44',
                executionMonitoringEndAt: '2020-07-23 09:35:34',
                cancelled: 1033760186,
                completed: 8371007682,
                error: 4535068558,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: null,
                tenantCode: 'k1ryqhyuckilft7kf2ulfyje215w4072p2l9d7vxgjzr2efdov',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'waikjh871qcmohuo56qt',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 20:39:25',
                executionMonitoringStartAt: '2020-07-22 22:57:19',
                executionMonitoringEndAt: '2020-07-23 13:29:52',
                cancelled: 7976007397,
                completed: 2269836016,
                error: 1783073018,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                
                tenantCode: 'gk1d2a5qetdiwbf1a2ol70zs9l460qv7nxdj1ocgu2uos62io0',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'e6t3spknnultc0kt10ej',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 07:21:19',
                executionMonitoringStartAt: '2020-07-22 22:15:51',
                executionMonitoringEndAt: '2020-07-22 20:55:28',
                cancelled: 7741595940,
                completed: 6920226992,
                error: 4325061866,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: null,
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'lnh1bvpoq1sm8p1mvux4',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 15:54:20',
                executionMonitoringStartAt: '2020-07-23 01:02:39',
                executionMonitoringEndAt: '2020-07-23 07:38:58',
                cancelled: 8979320869,
                completed: 9522827263,
                error: 7151375733,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'ydo4agn5ow2ybttxvz9e',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 00:53:05',
                executionMonitoringStartAt: '2020-07-23 06:42:14',
                executionMonitoringEndAt: '2020-07-23 03:42:22',
                cancelled: 3020321396,
                completed: 8974311294,
                error: 4737100035,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'jvsci3p7loz5dmo2dqq0r416wi2sruelqd9etrys24rvqmsr0i',
                systemId: null,
                systemName: 'b8nd05rchq0hu4gup4tj',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 05:56:22',
                executionMonitoringStartAt: '2020-07-23 11:58:51',
                executionMonitoringEndAt: '2020-07-23 08:58:48',
                cancelled: 8863192422,
                completed: 4651579930,
                error: 8792580435,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'geggrqzsxlys60fqbgsagznsjqxe5uty6e9vw1scng5dnhvnbw',
                
                systemName: '37k7f1njtjfqsen1qc8m',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 00:41:10',
                executionMonitoringStartAt: '2020-07-22 20:43:21',
                executionMonitoringEndAt: '2020-07-23 08:47:31',
                cancelled: 2523100991,
                completed: 4878952655,
                error: 8817394311,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: '5cp6o8586qfl5wh705f1e2l77p81gy6hm1qla6hxsxlig22p48',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: null,
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 12:59:21',
                executionMonitoringStartAt: '2020-07-22 21:59:53',
                executionMonitoringEndAt: '2020-07-23 18:09:46',
                cancelled: 3681095247,
                completed: 3401830247,
                error: 5269409893,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'juuk7gkburtlzzx70km3ounhc63b4xly4pjot96n6q33unke8q',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 16:34:11',
                executionMonitoringStartAt: '2020-07-23 16:27:00',
                executionMonitoringEndAt: '2020-07-23 17:59:39',
                cancelled: 8506795651,
                completed: 5024022716,
                error: 8583271616,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'ne4h1lfmozxccvc7a5q3mdoh6tnr4hi4agb8pjz04dujf8wuqd',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'tvcer71206k74yb2mven',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 06:05:48',
                executionMonitoringStartAt: '2020-07-22 23:51:24',
                executionMonitoringEndAt: '2020-07-23 13:58:01',
                cancelled: 8423369031,
                completed: 9183319824,
                error: 2769070308,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: '4ba70khk50n13rbu7dn1m7ypranifd51gx6fouw6zp09014sua',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: '27wh11raxar8ebfc2m72',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 14:55:27',
                executionMonitoringStartAt: '2020-07-23 17:13:13',
                executionMonitoringEndAt: '2020-07-22 19:06:32',
                cancelled: 5333977282,
                completed: 6413185063,
                error: 4784716584,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'u0kqb3rohb5vm5obyskucco12di7r4m2ki36st76pmpey0sruh',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'zuz4bc7z31sw86do6mub',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: null,
                executionExecutedAt: '2020-07-23 11:27:40',
                executionMonitoringStartAt: '2020-07-23 00:56:07',
                executionMonitoringEndAt: '2020-07-22 23:34:44',
                cancelled: 8606238541,
                completed: 7516001984,
                error: 7996302585,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'ie0cm45l7kq7iwcjaou84kwpnn0btieyizm05ln7st4niofhus',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: '47jeg9qnyelmahjbbf2t',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                
                executionExecutedAt: '2020-07-22 19:38:12',
                executionMonitoringStartAt: '2020-07-23 13:07:39',
                executionMonitoringEndAt: '2020-07-23 07:36:47',
                cancelled: 2090163877,
                completed: 8587946838,
                error: 5691900578,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: '0ggb5gbqhdnc83dazkv2441njv4f0bfaaz0mi1etexgtesndem',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: '7nkmb7spq8dnef2gb6lq',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-23 09:51:06',
                executionMonitoringEndAt: '2020-07-22 23:09:15',
                cancelled: 7899451829,
                completed: 1680707673,
                error: 4028536384,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: '8vqtsarxw7g0xvnn9mfd0uxy78sb1e5yd5b52d99nzqe0wmkqv',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'dr5zwvlfdoawqw9kfv9k',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-22 22:15:10',
                executionMonitoringEndAt: '2020-07-23 11:32:35',
                cancelled: 5696172251,
                completed: 2080111293,
                error: 3993083267,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: '5u5yvwbyhgom8az20hdjzlp6z8ucq11knoducgzdigkq5ytalg',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'x43kjfde61xlvm82wic1',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 20:51:02',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-23 16:43:47',
                cancelled: 8372743097,
                completed: 9207358819,
                error: 6880232168,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'smva7fyhml4j798w7wzy52xefod19ra34z12a8ji18f58q1761',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'a5m7gs93568u0jfj28qs',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 16:16:55',
                
                executionMonitoringEndAt: '2020-07-23 06:03:06',
                cancelled: 5217321211,
                completed: 2411573821,
                error: 2370311052,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: '0t8aghe8w8x6k44lu6xqnfy97c91kuy3i5m48vcyp99ju4o4nb',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: '4bcao7ioexo8k8lwww76',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 23:02:02',
                executionMonitoringStartAt: '2020-07-23 05:03:20',
                executionMonitoringEndAt: null,
                cancelled: 3390090279,
                completed: 6105212059,
                error: 7386579350,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'zxl5mdru9p92br5ub701oh0xl3m23uy66izp52s847e8mcyaqh',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'qqem0gv58jiom2xnr0zx',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 01:56:09',
                executionMonitoringStartAt: '2020-07-23 05:40:08',
                
                cancelled: 7242232154,
                completed: 7066918374,
                error: 8941270934,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'jhpv7xd9o36p0ljmkvbun4nnmo3u44lbcnodh',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'ym9h8btum08kfzl13b2yl7kh8j3aaximxcfc4itf4ojl7d7gu3',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'uv0jythgcqqfegunwxo1',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 05:37:57',
                executionMonitoringStartAt: '2020-07-23 10:56:01',
                executionMonitoringEndAt: '2020-07-23 13:03:07',
                cancelled: 6051351613,
                completed: 7989937074,
                error: 1903440218,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '009aq0d3pc9bxnh6mmo1bmpdtsj2uhvsulebr',
                tenantCode: 'sj2bw3i9k9ow8eu21yl9lq1vjy1ao6vmpy0x0hjby8yggdjl7t',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'uuy5rtohswtf11d5xcgr',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 09:50:48',
                executionMonitoringStartAt: '2020-07-23 04:24:55',
                executionMonitoringEndAt: '2020-07-23 08:25:31',
                cancelled: 3695227076,
                completed: 3257858433,
                error: 7399137802,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'jnsmbxms7khncufc1ium83f90kzmeuza5tduj2qo6saqxcde1x',
                systemId: 'f0shreggfu2lhglc0o65pawhx6tylxb9g309q',
                systemName: 'iw7fr6uml67codf2oife',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 02:42:08',
                executionMonitoringStartAt: '2020-07-23 07:35:33',
                executionMonitoringEndAt: '2020-07-23 02:38:16',
                cancelled: 5038933173,
                completed: 6401250647,
                error: 4967854675,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'l8atnft8ap6nyc6a0gkwbdddpozqvujx3ze3v8hhuw3tkuavwx',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'fgesghgd2qj7dzrl2bwg',
                executionId: 'aqea384r4oh31sqnpza83jzy4umj65bhh86u2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 12:36:23',
                executionMonitoringStartAt: '2020-07-22 19:58:45',
                executionMonitoringEndAt: '2020-07-23 03:16:21',
                cancelled: 8686994558,
                completed: 8200417793,
                error: 4672892025,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: '6op17862n5l2kumvzx3foqwfw4aimnpgd6y88qgkjb7o7k4eyt4',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: '08my29pglzccu4trbyjw',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 17:58:45',
                executionMonitoringStartAt: '2020-07-23 09:07:29',
                executionMonitoringEndAt: '2020-07-23 04:41:53',
                cancelled: 5257586522,
                completed: 7380506146,
                error: 1504913786,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'lsw82udrzo6356e9hvbthruostrztoz8paqzws8isibt3ste51',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'pkosvgqx6mbwsmqje1wm2',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 11:27:14',
                executionMonitoringStartAt: '2020-07-22 21:26:41',
                executionMonitoringEndAt: '2020-07-22 21:02:58',
                cancelled: 4146268393,
                completed: 5133661895,
                error: 3692900704,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'wbyyykj0pzaysq8t8s6ajx954fsav148h3uw3yl5cv0pj7we1m',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: '6isgy62hcq67sqi189md',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 19:12:05',
                executionMonitoringStartAt: '2020-07-23 07:28:02',
                executionMonitoringEndAt: '2020-07-23 03:22:22',
                cancelled: 82551347440,
                completed: 9911175589,
                error: 9306140286,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCancelled is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCompleted is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: '4pdmt2rrmzn0kigylgck5v3dw2tldvn29p7vb4bua1o0f6rlan',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'k44xx8h14bvs58jtxstq',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 15:07:49',
                executionMonitoringStartAt: '2020-07-23 00:54:44',
                executionMonitoringEndAt: '2020-07-23 16:47:40',
                cancelled: 1916996665,
                completed: 55078447346,
                error: 9303616422,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCompleted is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'zpodicp5rjprv9jc25zmgx3t4wvt0q925ghodlwdm05gtcjfvv',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'iyp2nu8nsd0x2v29kolk',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 08:51:12',
                executionMonitoringStartAt: '2020-07-23 06:00:13',
                executionMonitoringEndAt: '2020-07-23 17:20:04',
                cancelled: 9105114781,
                completed: 1517245410,
                error: 94041301313,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewError is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCancelled must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'aaynetvjqe5t8xyre0upnrjldal7r48axz4th5imqlf1b9mvlu',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'etzvz5jrquf3ptch0wgm',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 13:08:57',
                executionMonitoringStartAt: '2020-07-22 21:46:41',
                executionMonitoringEndAt: '2020-07-22 20:54:43',
                cancelled: -9,
                completed: 8102774741,
                error: 9514295109,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewCancelled must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCompleted must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'hu9pgbqlc1n7i7bn2f9m61zpsxzfu2sg7ehher75deeu4guy08',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'hfdjltb7e3q6mqt9zi7r',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 18:55:37',
                executionMonitoringStartAt: '2020-07-23 08:45:13',
                executionMonitoringEndAt: '2020-07-23 14:37:08',
                cancelled: 4386875850,
                completed: -9,
                error: 1545820584,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewCompleted must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'bkzl3ch85nf19qahg4tfoj8kbbh9tqcz086xxvytyn465l9lk8',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'udj367h8sqp5dyfdpzc4',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 20:33:29',
                executionMonitoringStartAt: '2020-07-23 01:07:59',
                executionMonitoringEndAt: '2020-07-23 12:59:50',
                cancelled: 3537110702,
                completed: 1481794208,
                error: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: '8wahfaiww9jalf4njf31zuttoey4mu8b6kkswdn7kqyw0enz7q',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'kaix01o47lxh3ejfps7u',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-23 12:12:30',
                executionMonitoringStartAt: '2020-07-22 23:37:00',
                executionMonitoringEndAt: '2020-07-23 06:30:47',
                cancelled: 1853818333,
                completed: 4843433289,
                error: 1795337617,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'd3axds4fhqx7l2ody789ib40o0rr0d4my660u16dqudwby5bki',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'mvm16evseycdjywydl8j',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-23 00:18:47',
                executionMonitoringEndAt: '2020-07-23 12:05:36',
                cancelled: 6777428492,
                completed: 2512873978,
                error: 1927052526,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'jumvzg1o69pvvogo8kqm0xpgbwumqynvx4ix5a8stnl18xc7re',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'hsyq085ykrgtcu7mxo17',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 02:55:17',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-23 06:49:47',
                cancelled: 4695650033,
                completed: 7837380486,
                error: 4380366342,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'veskd2hm76hje4y2g0b1up59657wfbvfcy7lhbxlmmeapjxsgm',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: '7j2spkmkkwqmqu2lpm91',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 23:49:32',
                executionMonitoringStartAt: '2020-07-23 00:04:24',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 9510944143,
                completed: 7608766566,
                error: 7683929648,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 'qz5n8r2cylp71lc606tjcwsjnicb9zrpaa4yxj8bly2mbjy3lb',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'n7vgk3r6pqve4ozxm9aa',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 11:43:44',
                executionMonitoringStartAt: '2020-07-23 00:07:54',
                executionMonitoringEndAt: '2020-07-23 09:02:54',
                cancelled: 3364908233,
                completed: 5685180415,
                error: 8250209485,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/jobs-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-overview/paginate')
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

    test(`/REST:GET bplus-it-sappi/job-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview')
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

    test(`/REST:GET bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'd833827b-9d13-45e1-91e2-1b640360cc81'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd833827b-9d13-45e1-91e2-1b640360cc81'));
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/d833827b-9d13-45e1-91e2-1b640360cc81')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd833827b-9d13-45e1-91e2-1b640360cc81'));
    });

    test(`/REST:GET bplus-it-sappi/jobs-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd9aeed98-fab9-4c20-86ca-bfc93af519b9',
                tenantId: '6b5b1928-65f4-4003-8ce7-395964a1c0c9',
                tenantCode: '6wjhx67vxgp03ag82g7pd41k8al6gnwgy8h26cqcbb836a0dbp',
                systemId: 'fc8c433d-6dba-4efc-8ac5-af485f31926b',
                systemName: 'r9f1x49xglnotvkxskgd',
                executionId: '6da907c0-1ea1-420a-8aea-4382967b6e93',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 05:43:42',
                executionMonitoringStartAt: '2020-07-23 11:25:49',
                executionMonitoringEndAt: '2020-07-23 05:50:02',
                cancelled: 5552873184,
                completed: 5575979417,
                error: 5941500786,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                tenantCode: 't5wpw4t1jpycjxcy9dja0bx340ingheyu6yg0dml36cdvyrvf6',
                systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                systemName: 'clr2ums3wxovqsss4hhm',
                executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 16:54:30',
                executionMonitoringStartAt: '2020-07-23 15:07:15',
                executionMonitoringEndAt: '2020-07-23 06:26:56',
                cancelled: 1822130954,
                completed: 5846593249,
                error: 6252575327,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd833827b-9d13-45e1-91e2-1b640360cc81'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/d833827b-9d13-45e1-91e2-1b640360cc81')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateJobOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobOverviewInput!)
                    {
                        bplusItSappiCreateJobOverview (payload:$payload)
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
                            cancelled
                            completed
                            error
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

    test(`/GraphQL bplusItSappiCreateJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobOverviewInput!)
                    {
                        bplusItSappiCreateJobOverview (payload:$payload)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'e670f45c-137e-4c9b-86a5-96f0dea2bc65',
                        tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                        tenantCode: '1qbe0p8tqhcl0xiibqaz16dl89emwomajm8wm9eeqgmz7kfcp6',
                        systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                        systemName: 'spzhlfdxvl1ttba1bkw1',
                        executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-23 15:34:46',
                        executionMonitoringStartAt: '2020-07-22 23:15:41',
                        executionMonitoringEndAt: '2020-07-22 21:59:56',
                        cancelled: 3756358402,
                        completed: 1144855974,
                        error: 5583727602,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', 'e670f45c-137e-4c9b-86a5-96f0dea2bc65');
            });
    });

    test(`/GraphQL bplusItSappiPaginateJobsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateJobsOverview (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateJobsOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobsOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobsOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindJobOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJobOverview (query:$query)
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
                            cancelled
                            completed
                            error
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

    test(`/GraphQL bplusItSappiFindJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJobOverview (query:$query)
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
                            cancelled
                            completed
                            error
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
                            value   : 'd833827b-9d13-45e1-91e2-1b640360cc81'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('d833827b-9d13-45e1-91e2-1b640360cc81');
            });
    });

    test(`/GraphQL bplusItSappiFindJobOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobOverviewById (id:$id)
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
                            cancelled
                            completed
                            error
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

    test(`/GraphQL bplusItSappiFindJobOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobOverviewById (id:$id)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd833827b-9d13-45e1-91e2-1b640360cc81'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('d833827b-9d13-45e1-91e2-1b640360cc81');
            });
    });

    test(`/GraphQL bplusItSappiGetJobsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetJobsOverview (query:$query)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetJobsOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateJobOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobOverviewInput!)
                    {
                        bplusItSappiUpdateJobOverview (payload:$payload)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a8688127-be58-42c7-9af9-27ae6c7ade18',
                        tenantId: '3002dfc1-08b2-4d4f-916d-999888c0d9de',
                        tenantCode: 'xjxq600u9zrtodqtbq1mrdh88ztsmgu37gfxjo2zbh3a7kx2cv',
                        systemId: '2278cca8-c4e6-4527-bf49-26c557e12aeb',
                        systemName: 'dbzlvc0nlkyuo7zphud5',
                        executionId: 'e8fcc251-ef76-4ec4-aa64-1d4e20c63b1e',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-23 11:10:42',
                        executionMonitoringStartAt: '2020-07-22 19:36:03',
                        executionMonitoringEndAt: '2020-07-23 01:54:49',
                        cancelled: 5065710141,
                        completed: 6956184981,
                        error: 4330608923,
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

    test(`/GraphQL bplusItSappiUpdateJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobOverviewInput!)
                    {
                        bplusItSappiUpdateJobOverview (payload:$payload)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd833827b-9d13-45e1-91e2-1b640360cc81',
                        tenantId: '3e6e1139-e0e8-4197-90ba-8e8d0476ff42',
                        tenantCode: 'tynjifsamgh7yv0nwwl6u3a2vbpc8znvlmqeat20pw6543ze5j',
                        systemId: '01050082-1ea0-4fdc-903c-a06f07981d18',
                        systemName: 'pvh9pyyo9iwwvbfybj4s',
                        executionId: '5ed33919-3bda-4143-a347-9267e0bd2a31',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-23 15:52:58',
                        executionMonitoringStartAt: '2020-07-22 20:21:11',
                        executionMonitoringEndAt: '2020-07-23 06:34:41',
                        cancelled: 6361083826,
                        completed: 4683370755,
                        error: 4982786961,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('d833827b-9d13-45e1-91e2-1b640360cc81');
            });
    });

    test(`/GraphQL bplusItSappiDeleteJobOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobOverviewById (id:$id)
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
                            cancelled
                            completed
                            error
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

    test(`/GraphQL bplusItSappiDeleteJobOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobOverviewById (id:$id)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd833827b-9d13-45e1-91e2-1b640360cc81'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('d833827b-9d13-45e1-91e2-1b640360cc81');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});