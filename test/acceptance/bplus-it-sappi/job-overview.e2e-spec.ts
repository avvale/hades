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
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: '8jcd9djwwacxzk430ado',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 15:53:18',
                executionMonitoringStartAt: '2020-07-21 09:33:43',
                executionMonitoringEndAt: '2020-07-21 18:53:59',
                cancelled: 7628076281,
                completed: 1523939680,
                error: 5704447860,
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
                
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: '4cmrdeaien9j5h75mwbv',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 23:25:28',
                executionMonitoringStartAt: '2020-07-21 05:46:08',
                executionMonitoringEndAt: '2020-07-21 13:27:16',
                cancelled: 9841085498,
                completed: 4929205991,
                error: 5732348787,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: null,
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'thjfzp6emqpkc5btoxzq',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 09:24:35',
                executionMonitoringStartAt: '2020-07-21 14:39:57',
                executionMonitoringEndAt: '2020-07-21 05:56:26',
                cancelled: 9107522137,
                completed: 4603683249,
                error: 4761388213,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'ymolxn0mhed5k9gvjtyl',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 00:16:21',
                executionMonitoringStartAt: '2020-07-21 21:17:59',
                executionMonitoringEndAt: '2020-07-21 15:26:01',
                cancelled: 3787343363,
                completed: 9608713309,
                error: 1847772926,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: null,
                systemName: 'bfksscddtn4rjzk1oh7s',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 08:00:42',
                executionMonitoringStartAt: '2020-07-21 20:12:10',
                executionMonitoringEndAt: '2020-07-21 18:40:01',
                cancelled: 7294001212,
                completed: 9575522450,
                error: 6250855268,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                
                systemName: 'k00gbo3hiswonfcwfb8s',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 16:49:01',
                executionMonitoringStartAt: '2020-07-21 16:46:43',
                executionMonitoringEndAt: '2020-07-21 11:57:11',
                cancelled: 2227538005,
                completed: 2885453381,
                error: 6378409034,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: null,
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 04:22:45',
                executionMonitoringStartAt: '2020-07-21 21:14:02',
                executionMonitoringEndAt: '2020-07-21 19:07:52',
                cancelled: 1876563036,
                completed: 2432420195,
                error: 6271877148,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 04:20:34',
                executionMonitoringStartAt: '2020-07-21 02:42:25',
                executionMonitoringEndAt: '2020-07-21 07:06:12',
                cancelled: 9216435173,
                completed: 4734682416,
                error: 6369218225,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'ka5vflm2to6o2lhl59vs',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 09:19:09',
                executionMonitoringStartAt: '2020-07-21 18:21:00',
                executionMonitoringEndAt: '2020-07-21 15:04:52',
                cancelled: 2839149235,
                completed: 1213709364,
                error: 7816012330,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'k2ms9s22ywblppj9lcu0',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 22:44:37',
                executionMonitoringStartAt: '2020-07-21 12:24:07',
                executionMonitoringEndAt: '2020-07-21 13:01:42',
                cancelled: 4314128913,
                completed: 6891243178,
                error: 9075284957,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: '1z0abrfkazw6s03u8o0v',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: null,
                executionExecutedAt: '2020-07-21 09:58:55',
                executionMonitoringStartAt: '2020-07-21 20:29:21',
                executionMonitoringEndAt: '2020-07-21 08:24:41',
                cancelled: 7445179775,
                completed: 4286758607,
                error: 8939481427,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'bxqyz6cn2qj7eaz6dmmz',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                
                executionExecutedAt: '2020-07-21 20:14:16',
                executionMonitoringStartAt: '2020-07-21 15:11:27',
                executionMonitoringEndAt: '2020-07-21 20:30:17',
                cancelled: 5905699364,
                completed: 3816389447,
                error: 2240696519,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'd2z7mgdpteqk650k68tp',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-21 03:26:08',
                executionMonitoringEndAt: '2020-07-21 04:37:28',
                cancelled: 5152546085,
                completed: 6074605695,
                error: 9404824296,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'gmwdfmhljghc67rp1vu5',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-21 09:25:17',
                executionMonitoringEndAt: '2020-07-21 19:22:37',
                cancelled: 7392728817,
                completed: 8094418224,
                error: 9550468806,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'goqbp9ly0hoeemctn0vl',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 01:16:00',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-21 09:14:04',
                cancelled: 1438280711,
                completed: 6939958326,
                error: 5354708892,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'shda1wghk58hmqcvs2vg',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 01:04:24',
                
                executionMonitoringEndAt: '2020-07-21 01:11:05',
                cancelled: 2961632839,
                completed: 1673966394,
                error: 2769290303,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'suzubrmhm2sgsxl7ue1y',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 20:25:40',
                executionMonitoringStartAt: '2020-07-21 05:02:33',
                executionMonitoringEndAt: null,
                cancelled: 9648739748,
                completed: 6688242228,
                error: 5209657447,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: '18baxzz2kp7s63f8blgz',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 11:22:52',
                executionMonitoringStartAt: '2020-07-21 20:23:46',
                
                cancelled: 3432124494,
                completed: 6097814406,
                error: 9052068916,
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
                id: '2lh73xqpble9276b2eno05qkqox9tc9nrl6vd',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'ty2hgguckwjskyj84ocm',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 14:48:15',
                executionMonitoringStartAt: '2020-07-21 05:50:15',
                executionMonitoringEndAt: '2020-07-21 01:01:47',
                cancelled: 7997905212,
                completed: 3942686789,
                error: 9123998530,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: 'actkq7v91jd486zz8xsm8q1cwwedgd2wi6sxy',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'g3b9s7xww6nnkv92iyji',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 22:11:11',
                executionMonitoringStartAt: '2020-07-21 23:35:01',
                executionMonitoringEndAt: '2020-07-21 10:15:55',
                cancelled: 2541193508,
                completed: 4004600892,
                error: 3886668631,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'obdz0yvqei7vzh2u0tnry5kkeez50rduq3mlf',
                systemName: 'ls83xm4c2lt9h6qunrix',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 16:59:15',
                executionMonitoringStartAt: '2020-07-21 07:08:13',
                executionMonitoringEndAt: '2020-07-21 07:22:21',
                cancelled: 4920379380,
                completed: 4909261435,
                error: 2186653396,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'sduq32mwvt670zqhbz93',
                executionId: 'tymfvehebmtr7jnig70e75gzfssyl8v0zzpu6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 10:45:41',
                executionMonitoringStartAt: '2020-07-21 21:48:51',
                executionMonitoringEndAt: '2020-07-21 22:20:48',
                cancelled: 3878266170,
                completed: 3161720346,
                error: 1473928503,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'owcqf9ykk0ei7yinjy71i',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 13:01:22',
                executionMonitoringStartAt: '2020-07-21 13:31:07',
                executionMonitoringEndAt: '2020-07-21 20:04:37',
                cancelled: 5904973550,
                completed: 3527149434,
                error: 2722657311,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: '2p40k7p0r5jg34rz7t28',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 20:16:01',
                executionMonitoringStartAt: '2020-07-21 13:16:15',
                executionMonitoringEndAt: '2020-07-21 16:32:18',
                cancelled: 89963084301,
                completed: 5224993970,
                error: 2105401116,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'i04l504adhkckbtoh2rk',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 15:42:51',
                executionMonitoringStartAt: '2020-07-21 07:31:37',
                executionMonitoringEndAt: '2020-07-21 20:05:19',
                cancelled: 2973156907,
                completed: 88748671754,
                error: 9034101142,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'ue7kodss9949t6a1bxqr',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 23:05:42',
                executionMonitoringStartAt: '2020-07-21 12:40:55',
                executionMonitoringEndAt: '2020-07-21 10:17:08',
                cancelled: 7505272147,
                completed: 5910676423,
                error: 82205914249,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'pkr19evhnk2r6w27d73d',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 18:51:29',
                executionMonitoringStartAt: '2020-07-21 05:20:22',
                executionMonitoringEndAt: '2020-07-21 12:37:42',
                cancelled: -9,
                completed: 7715267683,
                error: 1968065524,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: '32pmj2p3z3nnrk2h25pp',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 16:48:31',
                executionMonitoringStartAt: '2020-07-21 07:12:26',
                executionMonitoringEndAt: '2020-07-21 15:25:49',
                cancelled: 1583454101,
                completed: -9,
                error: 4069274044,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'f6jjkssr9ht24qouq5su',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 00:51:59',
                executionMonitoringStartAt: '2020-07-21 15:11:43',
                executionMonitoringEndAt: '2020-07-21 03:27:25',
                cancelled: 3510974219,
                completed: 4884160619,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'ewwk5wswgh4r1k55m1v2',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-21 18:31:21',
                executionMonitoringStartAt: '2020-07-21 23:41:04',
                executionMonitoringEndAt: '2020-07-21 12:24:26',
                cancelled: 6842801366,
                completed: 2936326381,
                error: 9556378061,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'bqg0bm645hd08zyb4rm7',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-21 06:15:04',
                executionMonitoringEndAt: '2020-07-21 12:37:02',
                cancelled: 7239439294,
                completed: 2315922986,
                error: 2240522437,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'onhip93h9rasfsg4dd1n',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 19:38:02',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-21 14:32:53',
                cancelled: 3098216078,
                completed: 8996227647,
                error: 7618512098,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'vw43iour3lpmmds5g81h',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 23:29:48',
                executionMonitoringStartAt: '2020-07-21 05:13:13',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 1138121994,
                completed: 2475779794,
                error: 8796388711,
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
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'aecuyymikjtcga2ho0bx',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 06:47:37',
                executionMonitoringStartAt: '2020-07-21 11:21:18',
                executionMonitoringEndAt: '2020-07-21 09:19:06',
                cancelled: 9726706163,
                completed: 4041960531,
                error: 9819472666,
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
                        value   : 'd9846142-891a-47b0-a5e1-557f09ba8a1c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd9846142-891a-47b0-a5e1-557f09ba8a1c'));
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
            .get('/bplus-it-sappi/job-overview/d9846142-891a-47b0-a5e1-557f09ba8a1c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd9846142-891a-47b0-a5e1-557f09ba8a1c'));
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
                
                id: '110b17b0-66fb-4061-9d09-99dc56151711',
                tenantId: '007e89ab-f809-4d00-b1e7-c4104c5f0d29',
                systemId: '701e1481-19e7-47e2-850e-70c49914e5ed',
                systemName: 'j657l2jcdi199s1tzh87',
                executionId: '678de6cb-6e93-4b31-9dea-fe05cfb84de6',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-21 00:55:43',
                executionMonitoringStartAt: '2020-07-21 10:13:24',
                executionMonitoringEndAt: '2020-07-21 13:36:56',
                cancelled: 9972190596,
                completed: 5295083795,
                error: 7097251346,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                systemName: 'nkpah915rw6cohm2xqi5',
                executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-21 04:48:13',
                executionMonitoringStartAt: '2020-07-21 13:12:15',
                executionMonitoringEndAt: '2020-07-21 02:55:31',
                cancelled: 9115583796,
                completed: 2417000691,
                error: 2752177712,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd9846142-891a-47b0-a5e1-557f09ba8a1c'));
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
            .delete('/bplus-it-sappi/job-overview/d9846142-891a-47b0-a5e1-557f09ba8a1c')
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
                        id: '8615906c-65ef-42ad-8335-f680572c9c25',
                        tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                        systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                        systemName: 'u2ugnf8d0lcuhhsv291l',
                        executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 11:41:57',
                        executionMonitoringStartAt: '2020-07-21 17:06:51',
                        executionMonitoringEndAt: '2020-07-21 13:03:33',
                        cancelled: 6702058553,
                        completed: 6179966157,
                        error: 8933851759,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', '8615906c-65ef-42ad-8335-f680572c9c25');
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
                            value   : 'd9846142-891a-47b0-a5e1-557f09ba8a1c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('d9846142-891a-47b0-a5e1-557f09ba8a1c');
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
                    id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('d9846142-891a-47b0-a5e1-557f09ba8a1c');
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
                        
                        id: 'd1d32d3b-1f04-4346-ac74-440981cdb2a5',
                        tenantId: '6e82fef7-92a4-4e69-ac04-a31832120d87',
                        systemId: '64197fb5-bb60-47c2-9091-a1551e3c49b9',
                        systemName: 'aaqxtjjf0zs48r2yaq4s',
                        executionId: '033410f9-109a-4757-ace9-3f9fbdbef10c',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-21 03:49:44',
                        executionMonitoringStartAt: '2020-07-21 05:21:57',
                        executionMonitoringEndAt: '2020-07-21 12:43:02',
                        cancelled: 1216416123,
                        completed: 8468752587,
                        error: 9038257709,
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
                        
                        id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c',
                        tenantId: '219b5467-01f7-48de-a55a-6f48e54c6005',
                        systemId: 'fd1891e9-6550-4641-915f-9a62ab6c0324',
                        systemName: 'aay1rw836bopr9kh7vp1',
                        executionId: '0b64e3a3-44e2-4608-b06d-1ab7cea186e6',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-21 11:42:40',
                        executionMonitoringStartAt: '2020-07-21 18:21:44',
                        executionMonitoringEndAt: '2020-07-21 16:47:24',
                        cancelled: 8856079612,
                        completed: 7925965687,
                        error: 3036326796,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('d9846142-891a-47b0-a5e1-557f09ba8a1c');
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
                    id: 'd9846142-891a-47b0-a5e1-557f09ba8a1c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('d9846142-891a-47b0-a5e1-557f09ba8a1c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});