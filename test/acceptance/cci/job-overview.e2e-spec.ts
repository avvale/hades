import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IJobOverviewRepository } from '@hades/cci/job-overview/domain/job-overview.repository';
import { MockJobOverviewRepository } from '@hades/cci/job-overview/infrastructure/mock/mock-job-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST cci/job-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'fishdrap5qy9kt6niqioa3ish6cvry1vbsz7ooo8r2w6ctd7l7',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'x3h710oej2e4cmqn9fgd',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:26:56',
                executionMonitoringStartAt: '2020-11-04 16:23:11',
                executionMonitoringEndAt: '2020-11-04 01:57:30',
                cancelled: 1914528143,
                completed: 8204055318,
                error: 6579420989,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'qzt12x8zd8qqxee36nvpyrvgm6dnxxt2w0sy7quaqfpigzqru6',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'jni82xigvmp3ph132ish',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 05:26:29',
                executionMonitoringStartAt: '2020-11-04 16:15:38',
                executionMonitoringEndAt: '2020-11-04 01:31:27',
                cancelled: 1404677386,
                completed: 7187464033,
                error: 3761979968,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: null,
                tenantCode: 'zjzc0nxxewe085n6jephieacnp40doanjvp3rzqxelebqlb1ia',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'cbypaaw38bysdlfx1tnw',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 20:46:08',
                executionMonitoringStartAt: '2020-11-04 19:52:26',
                executionMonitoringEndAt: '2020-11-04 17:02:44',
                cancelled: 1978017429,
                completed: 3747936886,
                error: 2097448662,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                
                tenantCode: '8fbnb868nuzrj7ly5h5iyk7s60156jjq9ip7ygxnihecd6gjpk',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: '8qxatbf5nxia2r2nt7r2',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 21:57:02',
                executionMonitoringStartAt: '2020-11-04 01:46:31',
                executionMonitoringEndAt: '2020-11-04 14:51:44',
                cancelled: 5163496311,
                completed: 1989288122,
                error: 2110637801,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: null,
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'zj7f2cn2vzvozje1kquw',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 11:27:29',
                executionMonitoringStartAt: '2020-11-04 10:44:30',
                executionMonitoringEndAt: '2020-11-04 01:46:21',
                cancelled: 1085143638,
                completed: 3197122217,
                error: 7431119189,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 's1glqummlkx28caudy0v',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 13:34:01',
                executionMonitoringStartAt: '2020-11-04 03:19:23',
                executionMonitoringEndAt: '2020-11-04 09:27:53',
                cancelled: 1592286599,
                completed: 8221788423,
                error: 2212855218,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'piijyhlsxzby5zbwj1r42jwlc2uky6ev9g0wp5aju0hoen54q6',
                systemId: null,
                systemName: 'pvpgoq7kt0r0anwds5tf',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:33:11',
                executionMonitoringStartAt: '2020-11-04 17:32:33',
                executionMonitoringEndAt: '2020-11-04 09:38:52',
                cancelled: 4093756592,
                completed: 8039082429,
                error: 2849682067,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: '45qotztljsttsnxrhnjirbh97iny8wua532rsjaxtbbxzalekk',
                
                systemName: 'zrezcteomwnp1hoqaeig',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:27:11',
                executionMonitoringStartAt: '2020-11-04 17:51:05',
                executionMonitoringEndAt: '2020-11-04 16:24:03',
                cancelled: 1784146329,
                completed: 5555125183,
                error: 8273120181,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: '394am49co5oil18nbcqzptpcx48p3rs649sbjzxoiywj9q8yz9',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: null,
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 22:14:43',
                executionMonitoringStartAt: '2020-11-04 12:50:49',
                executionMonitoringEndAt: '2020-11-04 11:27:22',
                cancelled: 4532072543,
                completed: 6606036133,
                error: 1584370646,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: '9e2d0079qe9jimlm3v7afgk24d4qvik047bk99oimjoxtxmmhu',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:21:39',
                executionMonitoringStartAt: '2020-11-04 21:45:05',
                executionMonitoringEndAt: '2020-11-04 06:23:37',
                cancelled: 8352641868,
                completed: 5069019234,
                error: 6284416539,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'h9cmg9px4n1x2sr5pwqupu1dsb939aq20ewc4npplyvmc3f5fw',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'di9rktccp965o3ic6va4',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 08:05:02',
                executionMonitoringStartAt: '2020-11-04 21:17:44',
                executionMonitoringEndAt: '2020-11-04 09:21:25',
                cancelled: 3835191125,
                completed: 3322550937,
                error: 4862715182,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'oezx268ioplyeapme2ubkubbbz9dl52sque0fqul68cdjjkavw',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: '0zlaumdvgimuv6x0viip',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 00:08:40',
                executionMonitoringStartAt: '2020-11-04 12:33:33',
                executionMonitoringEndAt: '2020-11-04 10:31:39',
                cancelled: 4918504537,
                completed: 3442497671,
                error: 9960468350,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'flq4iygh2dbgglfhf9h03jmb05jthovhp72c57rdwh3apzhnvx',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'je78kmius1501crv0z4s',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: null,
                executionExecutedAt: '2020-11-04 18:16:57',
                executionMonitoringStartAt: '2020-11-04 19:26:50',
                executionMonitoringEndAt: '2020-11-04 10:08:22',
                cancelled: 8515194997,
                completed: 3215680683,
                error: 4947951606,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'goyjt49a4k7i6bdtfcqd1bo4o3htv45112p9hxcjx35gzthw2c',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'an6l6qz7z1bykfpuh0o1',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                
                executionExecutedAt: '2020-11-04 20:31:22',
                executionMonitoringStartAt: '2020-11-04 05:28:38',
                executionMonitoringEndAt: '2020-11-04 16:32:25',
                cancelled: 1549397144,
                completed: 4271770504,
                error: 1067988983,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: '8yuqd78kpasmj6pso06zr52h1u54pi1z17rxwbpckd5af3dhyz',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'qb4pjyrb427kewd7cecx',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-04 19:18:46',
                executionMonitoringEndAt: '2020-11-04 07:44:53',
                cancelled: 4785478701,
                completed: 7400839736,
                error: 7083641047,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: '4a9dbpreeowx6youfuw03pay6jxpahjcpyutvp0q5ykc8l1ov2',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'tm0gzuzwbcjsvypqgr4v',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-11-04 22:18:43',
                executionMonitoringEndAt: '2020-11-04 07:26:40',
                cancelled: 2831131628,
                completed: 3101126158,
                error: 9593258005,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'jimprcbu5dns50poj7zy643njkz4c8qeiut9imp6ujf5p1mpvp',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'rv2n0q1vmu5smweblcmk',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 04:57:17',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-04 21:57:55',
                cancelled: 8741852981,
                completed: 6128885345,
                error: 1532987398,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: '0c4gjeusa46v8i04xvg9hlimgelsh9uak0cl1zzal6sp3z76rs',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'rff0hkbx5mkxnlx3fftv',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 20:13:13',
                
                executionMonitoringEndAt: '2020-11-04 04:44:08',
                cancelled: 2516342118,
                completed: 1912148360,
                error: 3434547211,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'uzgx3uh2l5xhot75x4thv7yurmq07tj5o5yepif7k434vl8fo0',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: '2o16hfysdulu88gmm333',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:55:13',
                executionMonitoringStartAt: '2020-11-04 14:29:42',
                executionMonitoringEndAt: null,
                cancelled: 7833090464,
                completed: 6146008027,
                error: 6683898030,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: '2e8pb07zph9jytvdqa6vbrv9ziu51zw6adicll3m90gyq7fowi',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'tod5q2c0msoop4iqu09c',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:59:17',
                executionMonitoringStartAt: '2020-11-04 02:51:56',
                
                cancelled: 7455547789,
                completed: 7618084252,
                error: 3885658163,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'naqjcr9cv52eah8gy1rcq04x735yr6s3e68f8',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: '83jziuw8sfc9duw0socjg3kw2zq0fli260azjew1rci5e08jho',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'vt3byz80l0dps1xsbphn',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:05:03',
                executionMonitoringStartAt: '2020-11-04 21:53:12',
                executionMonitoringEndAt: '2020-11-04 15:04:27',
                cancelled: 7593538207,
                completed: 8245398775,
                error: 4247556623,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: 'xow6yy86ig8jyzjsso8nygr8qbl3md0uqj6z8',
                tenantCode: '9ynejptlpha97wo9udiyah92cm2w0y3s5rhqgr6og54dj0tppj',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: '9y00snt5febkyy3an4ij',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 20:30:33',
                executionMonitoringStartAt: '2020-11-04 02:13:32',
                executionMonitoringEndAt: '2020-11-04 22:36:36',
                cancelled: 7991740166,
                completed: 6198284449,
                error: 3521953541,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'va96nc5bfu29bns8567isojgsmhhn5ktngig6yik2eo06ooot8',
                systemId: 'oqusikw9litoc8rpcer0i7rqhdu2d5chv420f',
                systemName: 'oa42qwkqj8xubsqo883s',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:49:39',
                executionMonitoringStartAt: '2020-11-04 06:32:02',
                executionMonitoringEndAt: '2020-11-04 02:58:05',
                cancelled: 1733344689,
                completed: 1326109626,
                error: 6196925401,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'z762ge3uzrx5xh119o48abnm6shrbq81qsfrhaircg68n0slx8',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: '7e1m4sz158o0sujal8j8',
                executionId: 'xgn35xjeb6dn022uhhpc90v9w7eml1tbi5zzp',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 14:07:56',
                executionMonitoringStartAt: '2020-11-04 21:33:11',
                executionMonitoringEndAt: '2020-11-04 12:33:20',
                cancelled: 4633777194,
                completed: 4996862581,
                error: 5458811362,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'ydodlb1znszp59n8phh50l006168t2clsldbepd1qn8vv24vy2c',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'j4thg76ydbevoc96w9hr',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 21:09:59',
                executionMonitoringStartAt: '2020-11-04 19:44:25',
                executionMonitoringEndAt: '2020-11-04 16:45:23',
                cancelled: 9061083725,
                completed: 9634885084,
                error: 1873416338,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'acsawkst1juel07pbqhrb4qevcgep5veej206tfxwg67zzwa51',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'f6ov588ju3f02e9w9gw7x',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 20:48:42',
                executionMonitoringStartAt: '2020-11-04 11:10:15',
                executionMonitoringEndAt: '2020-11-04 20:46:52',
                cancelled: 1803180052,
                completed: 7168415133,
                error: 6673110351,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'u2b926aj5zx8msgggjhn1cymsxqzpfamqe8edscwf7aypgsj9j',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'pcquqd96c0rvc467qc7w',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 02:15:16',
                executionMonitoringStartAt: '2020-11-04 08:57:50',
                executionMonitoringEndAt: '2020-11-04 17:19:03',
                cancelled: 29524508626,
                completed: 1165912253,
                error: 3513464223,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCancelled is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewCompleted is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'msidxxpw1jtblunlhtpmj0foqf9khcyy830vbntyny4r573ba2',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'hm5oht3vcucdssuftd2k',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 15:49:55',
                executionMonitoringStartAt: '2020-11-04 03:18:15',
                executionMonitoringEndAt: '2020-11-04 16:15:53',
                cancelled: 3827366263,
                completed: 27860050002,
                error: 4618322509,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCompleted is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'oi9a0h7714ujqqszrd5f1nf6fln5pxvsmjjiwo0k2fvfnigdbu',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'yam2u1y0mev9wv4ju4zz',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 18:00:41',
                executionMonitoringStartAt: '2020-11-04 15:43:40',
                executionMonitoringEndAt: '2020-11-04 19:19:14',
                cancelled: 4626463355,
                completed: 6431478069,
                error: 12585756527,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewError is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewCancelled must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'fz9zdggfr4eodo1s1h731r18l47gzs2za1xm2hjdwgucxgfxwj',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'p205gkt3tafrqy596byc',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 05:38:38',
                executionMonitoringStartAt: '2020-11-04 09:19:14',
                executionMonitoringEndAt: '2020-11-03 23:21:50',
                cancelled: -9,
                completed: 6846241310,
                error: 1255778362,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewCancelled must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewCompleted must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: '5zb62k5uyruhvr5av28lu07ihahjoyxvl611a1yu5g8qogck0v',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'krlvrbfhsmjinm6db3g1',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 19:16:52',
                executionMonitoringStartAt: '2020-11-04 17:32:00',
                executionMonitoringEndAt: '2020-11-04 04:57:51',
                cancelled: 9187160164,
                completed: -9,
                error: 1915076828,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewCompleted must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: '1vz7xqhuw3g01nn9pfebyp528nnpvekpuaw0qbq2ioz582m4bz',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: '0jlfe4aczugr9hm24tp2',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 12:54:35',
                executionMonitoringStartAt: '2020-11-04 08:38:51',
                executionMonitoringEndAt: '2020-11-04 11:30:07',
                cancelled: 9464564400,
                completed: 7232405399,
                error: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'gkcd0n5yiewqfj9hh8fli4v2va2i9did2wavom9exxc03ohhrf',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'ov2a5qlhv2b0jk0ej1xh',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-04 15:48:07',
                executionMonitoringStartAt: '2020-11-04 00:57:10',
                executionMonitoringEndAt: '2020-11-04 00:45:36',
                cancelled: 6951052449,
                completed: 4939094741,
                error: 5100022209,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'f9klfb7kig5mjb7kmf6q9i9tqnnqr2l2cxobtq0039ecq87od7',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'd44h8bc8k9hkigdk8ymf',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-04 08:28:51',
                executionMonitoringEndAt: '2020-11-04 20:26:14',
                cancelled: 7407964527,
                completed: 8126124447,
                error: 1580834755,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'hdimp6ly22bt99u64yz7yjhlfbgxuv4spf3y3s4rqriakwr07x',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: '6qi8m0qhnh000yzoelpd',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 17:03:21',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-04 15:18:48',
                cancelled: 9540198343,
                completed: 4454334953,
                error: 5509416770,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: '2k11ig1pt7gagxm0ts2bfek69t0zg8tnrvchllnnkr1jljq3ki',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'gr0swhv57z0552tlun95',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 21:09:52',
                executionMonitoringStartAt: '2020-11-04 12:46:36',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 1799892560,
                completed: 6562988720,
                error: 6629423670,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'dk45fk2nms1lnjdvubtlb0ztgy7post7cjbzxhy6oln9ecyrw9',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: '1jl8skjms2re4gko5n07',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:42:15',
                executionMonitoringStartAt: '2020-11-04 18:30:55',
                executionMonitoringEndAt: '2020-11-03 23:33:34',
                cancelled: 7171089028,
                completed: 9995000920,
                error: 4055992035,
            })
            .expect(201);
    });

    test(`/REST:GET cci/jobs-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/jobs-overview/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/job-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '927d5790-7933-417b-8789-bf2f82535b8b'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '84260cc7-2c44-4d77-a4b2-d16de456b52c'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '84260cc7-2c44-4d77-a4b2-d16de456b52c'));
    });

    test(`/REST:GET cci/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview/8d648e8d-e70b-45c5-b699-a4867400d1d8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview/84260cc7-2c44-4d77-a4b2-d16de456b52c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '84260cc7-2c44-4d77-a4b2-d16de456b52c'));
    });

    test(`/REST:GET cci/jobs-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/jobs-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/job-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '7e648068-8dad-49be-8af2-efeb9190e4b1',
                tenantId: 'd3ba6865-2ad0-4cde-a8af-5a8859b139fa',
                tenantCode: 'z1xdmiav5kqvw8w5nvduy8ewrsjd3v7fhhgbyub68snpurt7qw',
                systemId: '7fba13ee-65a6-4be9-8fe0-2ac44cb800f1',
                systemName: 'facu8da0fxp9hgfjtfzk',
                executionId: 'a1ba9d89-8f4f-47f9-9e1c-3e8a013d0234',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:47:13',
                executionMonitoringStartAt: '2020-11-04 04:08:52',
                executionMonitoringEndAt: '2020-11-04 22:56:48',
                cancelled: 2198871503,
                completed: 1261703105,
                error: 3705392326,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                tenantCode: 'w66h5vko8l99uewr2qtzbv44ap61twl5f3nl0fiz8v8asa9do2',
                systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                systemName: 'slwhguh8vztd95j12fz3',
                executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:36:28',
                executionMonitoringStartAt: '2020-11-04 04:04:42',
                executionMonitoringEndAt: '2020-11-03 23:37:57',
                cancelled: 2947762643,
                completed: 5141467961,
                error: 5317880390,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '84260cc7-2c44-4d77-a4b2-d16de456b52c'));
    });

    test(`/REST:DELETE cci/job-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-overview/7c1f4dd3-d63f-4040-8a3a-a0b4ee2f8b61')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/job-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-overview/84260cc7-2c44-4d77-a4b2-d16de456b52c')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateJobOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateJobOverviewInput!)
                    {
                        cciCreateJobOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
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

    test(`/GraphQL cciCreateJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateJobOverviewInput!)
                    {
                        cciCreateJobOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        id: '96d651b9-c205-446b-8cb9-48a74197cc14',
                        tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                        tenantCode: '9wmqwk5ypj4otddffjyauux21fzfvlvv7hklkej0h12nd15vkq',
                        systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                        systemName: 'zh8cjnzx42si2fd6i7cm',
                        executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 10:05:03',
                        executionMonitoringStartAt: '2020-11-04 20:54:31',
                        executionMonitoringEndAt: '2020-11-04 17:40:45',
                        cancelled: 8340592549,
                        completed: 6173912452,
                        error: 7444676590,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateJobOverview).toHaveProperty('id', '96d651b9-c205-446b-8cb9-48a74197cc14');
            });
    });

    test(`/GraphQL cciPaginateJobsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateJobsOverview (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciPaginateJobsOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateJobsOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateJobsOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindJobOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindJobOverview (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '50996520-c818-472f-b6b4-4d7c116ce739'
                        }
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

    test(`/GraphQL cciFindJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindJobOverview (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '84260cc7-2c44-4d77-a4b2-d16de456b52c'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobOverview.id).toStrictEqual('84260cc7-2c44-4d77-a4b2-d16de456b52c');
            });
    });

    test(`/GraphQL cciFindJobOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindJobOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'cfc89b07-f081-43f9-8aa9-3a99d2559edb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindJobOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindJobOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '84260cc7-2c44-4d77-a4b2-d16de456b52c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobOverviewById.id).toStrictEqual('84260cc7-2c44-4d77-a4b2-d16de456b52c');
            });
    });

    test(`/GraphQL cciGetJobsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetJobsOverview (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetJobsOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateJobOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateJobOverviewInput!)
                    {
                        cciUpdateJobOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: '2d097e7e-4b9b-42f7-ab13-f4ed317fd2a3',
                        tenantId: '4c4a148d-6233-4f0b-8cad-004d8088fd5a',
                        tenantCode: '55ttx4xu67l0q4tj0ktahe06fezxamiuoin2eid6s3ajjg5put',
                        systemId: '81646cc6-d59b-4c39-81be-39ffdf6a97f2',
                        systemName: '90avavbz5e3qggo19sln',
                        executionId: 'ec9e371d-42fc-4e5c-9223-bed0a2bb862e',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 11:06:28',
                        executionMonitoringStartAt: '2020-11-04 03:28:44',
                        executionMonitoringEndAt: '2020-11-04 12:22:17',
                        cancelled: 6685221595,
                        completed: 4803498544,
                        error: 7713102943,
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

    test(`/GraphQL cciUpdateJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateJobOverviewInput!)
                    {
                        cciUpdateJobOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: '84260cc7-2c44-4d77-a4b2-d16de456b52c',
                        tenantId: '6ecf3bef-4040-4071-b15e-29e5f343ffa2',
                        tenantCode: '5wgp4ulpqtmzqg817y5654t8ar8o2x2e4j947649idot5s61ho',
                        systemId: '7e2210bb-20b1-4c9f-986b-351637f7a421',
                        systemName: 'n7ld2bv80qwhbjxk5txl',
                        executionId: 'cc1af28e-afbd-4ab2-8401-025b0608196e',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-04 20:04:55',
                        executionMonitoringStartAt: '2020-11-04 07:18:05',
                        executionMonitoringEndAt: '2020-11-04 19:20:48',
                        cancelled: 3450284388,
                        completed: 8211891905,
                        error: 8870011457,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateJobOverview.id).toStrictEqual('84260cc7-2c44-4d77-a4b2-d16de456b52c');
            });
    });

    test(`/GraphQL cciDeleteJobOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteJobOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'f7a12874-cd28-4f8c-b8b3-f0ba4adaddec'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteJobOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteJobOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '84260cc7-2c44-4d77-a4b2-d16de456b52c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteJobOverviewById.id).toStrictEqual('84260cc7-2c44-4d77-a4b2-d16de456b52c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});