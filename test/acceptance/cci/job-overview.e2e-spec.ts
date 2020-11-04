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
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'jv1mpamchxrmieniutvg7s52lpr4m7v55y5fhalc8px16l7cwn',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: '89g58ki4ixiwe2wfu62q',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 22:02:12',
                executionMonitoringStartAt: '2020-11-04 13:07:45',
                executionMonitoringEndAt: '2020-11-04 03:09:54',
                cancelled: 4673799749,
                completed: 5078241850,
                error: 4456575088,
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
                
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'xyc6bzaw24cba8o9rwdys2m4zgxaj9adk0uwsyofxa39brw3un',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'bdl77alb9hn846au097y',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 02:49:35',
                executionMonitoringStartAt: '2020-11-04 06:44:56',
                executionMonitoringEndAt: '2020-11-04 11:57:31',
                cancelled: 1797682533,
                completed: 8141774550,
                error: 3388046451,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: null,
                tenantCode: '05wco1c0huw4wj7wo57ufisfa4fuh7q54prsau6o64kh3m1y3s',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'xbh03l6l2c8r85llhk73',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 21:51:18',
                executionMonitoringStartAt: '2020-11-04 00:28:21',
                executionMonitoringEndAt: '2020-11-03 20:18:29',
                cancelled: 4849694377,
                completed: 3075380296,
                error: 3907761353,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                
                tenantCode: 'v1dc9z6iqc0073l7wdw698z53ncdbib39azhw8psmnf1w2e809',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'k5xfy1oo5ysl1nftqg4d',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 11:48:51',
                executionMonitoringStartAt: '2020-11-04 11:43:32',
                executionMonitoringEndAt: '2020-11-03 19:47:31',
                cancelled: 6056180150,
                completed: 7530413540,
                error: 9569739097,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: null,
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'gzsxwe61p65x0gb18kin',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 04:47:50',
                executionMonitoringStartAt: '2020-11-04 06:16:07',
                executionMonitoringEndAt: '2020-11-04 06:30:29',
                cancelled: 4484712748,
                completed: 4720288149,
                error: 7074133376,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'xppu8pc8zl98kwefv4nv',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:14:38',
                executionMonitoringStartAt: '2020-11-04 16:53:24',
                executionMonitoringEndAt: '2020-11-03 20:29:05',
                cancelled: 8058740511,
                completed: 4928987248,
                error: 5444632606,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: '9vjhdt1achssoinqysv5nge6ksn3unidz08rrlplpukiyy03s4',
                systemId: null,
                systemName: 'j2injix3da92hht7jzrx',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 10:32:00',
                executionMonitoringStartAt: '2020-11-04 15:24:57',
                executionMonitoringEndAt: '2020-11-04 13:30:58',
                cancelled: 3488280279,
                completed: 7685003598,
                error: 5991561426,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'sznirheb4kyuu2tags42f1mt1697bnv03z7q4wm68j9pbhw8a0',
                
                systemName: 'qou0wii1ij6nq0hcdb52',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:16:55',
                executionMonitoringStartAt: '2020-11-04 11:21:39',
                executionMonitoringEndAt: '2020-11-04 15:01:05',
                cancelled: 3913222473,
                completed: 2167125623,
                error: 6436043644,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: '00f6oal5qd00eyc3ycu6yn9w62orefxenesiv2fub6ic6sd0uf',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: null,
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:26:04',
                executionMonitoringStartAt: '2020-11-03 23:49:50',
                executionMonitoringEndAt: '2020-11-03 22:19:02',
                cancelled: 7255381519,
                completed: 6564110651,
                error: 7450218721,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: '6xcba18k6pclozb9khydee52bn5uaum0hontoejkjgmns62cw1',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 06:20:16',
                executionMonitoringStartAt: '2020-11-04 16:24:36',
                executionMonitoringEndAt: '2020-11-04 08:20:55',
                cancelled: 2052682523,
                completed: 2711683472,
                error: 5728812460,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'pxz3niqxkcsn6w2oe9m1xtvorwzpbg7nnnrec2vx3l9j4mo1l7',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: '00833vkq9u12lwls43qy',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 08:30:37',
                executionMonitoringStartAt: '2020-11-04 19:04:16',
                executionMonitoringEndAt: '2020-11-04 00:35:35',
                cancelled: 3931797104,
                completed: 3696614272,
                error: 4568272985,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'omlpc5d50z7mebahx49vcu7bk1h6nsef3n1fxsh16tla4vdgh0',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'j5qdsm8bj7bu87eubx21',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 04:46:38',
                executionMonitoringStartAt: '2020-11-04 18:14:25',
                executionMonitoringEndAt: '2020-11-04 19:16:20',
                cancelled: 8945497646,
                completed: 8679143569,
                error: 3339107790,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'bc4pzpwr3xd039zthkjn9nbyj8sbui42979meh3c7vnptwanhl',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'kd8hp8va38sy72cpv2w2',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: null,
                executionExecutedAt: '2020-11-04 16:03:19',
                executionMonitoringStartAt: '2020-11-04 06:50:37',
                executionMonitoringEndAt: '2020-11-04 19:24:37',
                cancelled: 6536675953,
                completed: 1900489208,
                error: 3455161904,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: '3xo3praunt4dlglpye3z9e3czbgv7gy9xyysqnfbxj1epmema0',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: '3l94qnv4v70z1adxyvy6',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                
                executionExecutedAt: '2020-11-04 02:46:50',
                executionMonitoringStartAt: '2020-11-04 05:22:25',
                executionMonitoringEndAt: '2020-11-04 16:27:02',
                cancelled: 3285468581,
                completed: 8425247024,
                error: 4363359001,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'g24tj8rb5cvfk0hei7ndtifbsq8zacywyepaabpnhv1bv8zsm0',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'tsnye95tcl3hm3z7e3sh',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-04 07:11:34',
                executionMonitoringEndAt: '2020-11-04 02:00:27',
                cancelled: 8853505424,
                completed: 8502233498,
                error: 4606465437,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'jjasb7i9vvr4wq0cuhfv1ixg5j14ru9tj5j4h3metjh8xp6p9d',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 's7nij8vj5t6m8e89kuci',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-11-04 16:11:33',
                executionMonitoringEndAt: '2020-11-04 16:48:59',
                cancelled: 1938208004,
                completed: 6574675208,
                error: 9766134430,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'rnzu9ouog5pjc5r1op3ncuyvjupm4imn3s9kgm98kexgqgbtyu',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'ohrz0h5y8v9biybtmej5',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:16:21',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-04 14:13:34',
                cancelled: 7353530509,
                completed: 8586358181,
                error: 8331379214,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'puia172l268ewulwjiqp3wuik0ghkr7go2p2kh0mbc81t5kqkg',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'serl4jv6b2jyyklzxf5x',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:08:14',
                
                executionMonitoringEndAt: '2020-11-04 13:14:34',
                cancelled: 5122594774,
                completed: 1614806606,
                error: 4503517540,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'ewjz5l7l6p9li8e2dilmwmmvqzbf6mb02w45erwa4gg6yfitid',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'om23stxcvmxnpp0o1kv2',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 18:45:55',
                executionMonitoringStartAt: '2020-11-04 01:39:39',
                executionMonitoringEndAt: null,
                cancelled: 4485430371,
                completed: 9804434702,
                error: 5110670847,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'qmlndxy85a32mbzgi2atf32zlujd8a59fz0t8nrbmpcysxeaff',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'nl0tptprl1apvz2j36em',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 09:04:08',
                executionMonitoringStartAt: '2020-11-04 05:25:13',
                
                cancelled: 8302024418,
                completed: 2389204595,
                error: 9714644207,
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
                id: '9tpm8xmtz408tmirn9wgmb6wrio1qm3ulmfwb',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'ixjsc6z28rnbrx6wcvayqju34zx1bgbjkbuu69mllnegs7onys',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'cxxen6zb83lotwmcuoon',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 20:44:43',
                executionMonitoringStartAt: '2020-11-04 01:37:35',
                executionMonitoringEndAt: '2020-11-04 09:07:41',
                cancelled: 6341817918,
                completed: 2184001040,
                error: 9090441802,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: 'vasy8lquy17iyfa87qjyvaywdtofm6w2qfmkl',
                tenantCode: 'ql0hi9hesdtmac6y9jjwjskx9whhr8aylam45j79v69hrplaq1',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: '1awt4b2qg1swlbkq6nk3',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 10:16:25',
                executionMonitoringStartAt: '2020-11-04 14:55:16',
                executionMonitoringEndAt: '2020-11-04 07:44:13',
                cancelled: 1143321003,
                completed: 1767776102,
                error: 4734351081,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: '9jk25ad5j3lkb6f9jadi70xe3ftldxplwb7gmf4r9n4269r5ds',
                systemId: 'llx5gcllc6dkoit33ed4mfxp6tgvsrpte3d2v',
                systemName: 'folnnh2h1dvqyddcduwp',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 21:40:48',
                executionMonitoringStartAt: '2020-11-04 00:54:56',
                executionMonitoringEndAt: '2020-11-04 04:21:55',
                cancelled: 5202685401,
                completed: 8976810174,
                error: 7043183469,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'heiso5tvizfybibk4xym3c2scqtcpaxz34f8zbiu7pi1603l84',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'gb3miiwtg9ozk5zcoyc6',
                executionId: 'sxn93yv2l6tprx5a2g4j73p9tjs7s54xfhcvf',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 13:03:19',
                executionMonitoringStartAt: '2020-11-04 06:26:58',
                executionMonitoringEndAt: '2020-11-03 22:54:03',
                cancelled: 2957956214,
                completed: 8626490130,
                error: 8210115934,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'thvvcasay352vv3cijv2mbvxsbcz1x9tfxah0xsexuydin24o8h',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: '3a2c3alhahdqxdwv7tgk',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 17:06:51',
                executionMonitoringStartAt: '2020-11-03 21:06:48',
                executionMonitoringEndAt: '2020-11-04 18:27:45',
                cancelled: 3006984955,
                completed: 1979014744,
                error: 6478276432,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'mprxgm5bmtvu26w8wksg7crdd06kbekosuv5yndiz9m745gid1',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'lifrtyobe24js9imvavry',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 01:44:01',
                executionMonitoringStartAt: '2020-11-03 19:32:26',
                executionMonitoringEndAt: '2020-11-03 23:35:16',
                cancelled: 6078006729,
                completed: 5216344796,
                error: 7238661891,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'r7pfrwbxv9mi568wpkrl7w7o4ugviczco511z0z2byah3037e5',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'pya4egflaare5j222tpg',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 19:47:16',
                executionMonitoringStartAt: '2020-11-04 05:38:26',
                executionMonitoringEndAt: '2020-11-04 15:55:02',
                cancelled: 87374138629,
                completed: 9207560439,
                error: 6740531954,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'ly8cwxn74tg88s767rz83oieak9hwk4b9jy8924kqtiu9cwryq',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: '4577i0ka96wn7e01dnbz',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 07:32:34',
                executionMonitoringStartAt: '2020-11-04 03:34:16',
                executionMonitoringEndAt: '2020-11-04 04:03:14',
                cancelled: 3440681756,
                completed: 48430198420,
                error: 9470247462,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'xyo7t56jfutzrv7ormcl6tc4kmuxs0ot9gc6ijronws40cip28',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'owjqc4oh04pf2o687ga4',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 20:01:08',
                executionMonitoringStartAt: '2020-11-04 06:37:13',
                executionMonitoringEndAt: '2020-11-04 18:28:49',
                cancelled: 9217453904,
                completed: 9739484350,
                error: 51460775783,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'gzicy4gwg8v0kobv9ylpf2d08knpza8w0va9i44knzvmwhm6e7',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'hb2g8rla2hsmy0c174ry',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 21:29:33',
                executionMonitoringStartAt: '2020-11-03 22:28:42',
                executionMonitoringEndAt: '2020-11-04 05:18:33',
                cancelled: -9,
                completed: 2438087621,
                error: 1034386530,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'm523mzbie1ndf2qmvsr5n3tv0hcubevbq52ct93gbgw5bxke5r',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'w7jrbmrrqj5f73phoa2i',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 19:38:54',
                executionMonitoringStartAt: '2020-11-04 18:11:35',
                executionMonitoringEndAt: '2020-11-04 03:41:10',
                cancelled: 6261459467,
                completed: -9,
                error: 5908134077,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'e6j59euav4a623s7pwr5okd62ejjd64cj8q2fl3hizc9rt36be',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'sibhjuac7mn1i7taeroj',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 05:49:17',
                executionMonitoringStartAt: '2020-11-04 15:54:49',
                executionMonitoringEndAt: '2020-11-04 02:20:57',
                cancelled: 7040313388,
                completed: 1201562095,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'q8bojb4wf6cd1rexhmqfm3bqdwfidl52eyd88bxdxk1o76mpuw',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'pzfjlzdx7phl222qx101',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-04 00:02:03',
                executionMonitoringStartAt: '2020-11-04 05:46:10',
                executionMonitoringEndAt: '2020-11-04 06:44:13',
                cancelled: 9722400312,
                completed: 1814404397,
                error: 8054494189,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'ckq6iflhdyrtp7uqlkgz89m274po46xxpxwg3oa4fu6ukmwu6c',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'ege4jfjua1uml9xdugss',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-04 08:54:29',
                executionMonitoringEndAt: '2020-11-03 22:03:31',
                cancelled: 1895099853,
                completed: 1511619155,
                error: 3761597951,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'fkpyajir0t8w0ppbr02ejm0u3s1oqkq0lxwi7q4onllys17d0e',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: '5fkoi3km0q3uqbqv012o',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 22:12:05',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-04 12:51:42',
                cancelled: 7805915824,
                completed: 6259390363,
                error: 9501702050,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'nlixks5s97m842aqplnwwv7oy5ob15sof4bm21b4onphz3no7h',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: '36j8fnhguz1rk5fi6hp8',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 18:50:59',
                executionMonitoringStartAt: '2020-11-04 01:51:38',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 2380075356,
                completed: 9579977915,
                error: 8267013079,
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
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'fntjapl9tgt02mrywesgch0617ex3pr2i4ordzgp5gicwd1rpe',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'b70npaencmlhobb3i2kx',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 03:30:08',
                executionMonitoringStartAt: '2020-11-04 04:12:52',
                executionMonitoringEndAt: '2020-11-03 20:12:15',
                cancelled: 1480020868,
                completed: 7685172353,
                error: 5914916512,
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
                        id: 'b8c390ad-6ca6-42cc-bf9d-4859bed4f68f'
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
                        id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fc353db1-1bb9-4bda-9d72-6cb8fc101469'));
    });

    test(`/REST:GET cci/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview/9e87ba78-01a6-44b2-ae5c-084f490f9dd3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview/fc353db1-1bb9-4bda-9d72-6cb8fc101469')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fc353db1-1bb9-4bda-9d72-6cb8fc101469'));
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
                
                id: '314744d9-d2e1-4e15-9a81-b349174d6a07',
                tenantId: '169ccd20-a5df-44f3-8a19-f5b480b745be',
                tenantCode: 'cqepjrv1wcdf7vsc708yy347cfayyvke7s8j22g2m5yllze9g3',
                systemId: '2c862812-4757-4587-add4-21401e1e02b7',
                systemName: 'g78hgkyxb58d653ht47l',
                executionId: '7196712a-f0d2-4206-92d4-c47ba9814ecf',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 20:09:20',
                executionMonitoringStartAt: '2020-11-04 14:06:49',
                executionMonitoringEndAt: '2020-11-04 16:11:44',
                cancelled: 5438916820,
                completed: 8618185342,
                error: 2310124472,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                tenantCode: 'xbyfrygwyoc7fo4ubv5ycxznqyuun2xh849bjtz7eeh1fcj47p',
                systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                systemName: 'dmkof9ntte6jmifdzhz4',
                executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 19:50:37',
                executionMonitoringStartAt: '2020-11-04 03:55:57',
                executionMonitoringEndAt: '2020-11-04 01:25:11',
                cancelled: 9165000983,
                completed: 6985536005,
                error: 2229913400,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fc353db1-1bb9-4bda-9d72-6cb8fc101469'));
    });

    test(`/REST:DELETE cci/job-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-overview/ca344c6d-2265-4816-aeb5-33f37b48f641')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/job-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-overview/fc353db1-1bb9-4bda-9d72-6cb8fc101469')
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
                        id: '1e46da2a-b9e9-4821-b369-40cbd924282d',
                        tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                        tenantCode: 'jcjca278zp1rsd9x7hsqevixdve0as2kkxrexfebrwh0wsye1c',
                        systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                        systemName: '3ae0uej5f3cfhp7vjqxv',
                        executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 00:17:25',
                        executionMonitoringStartAt: '2020-11-04 07:51:31',
                        executionMonitoringEndAt: '2020-11-04 12:07:22',
                        cancelled: 5890929516,
                        completed: 2818182973,
                        error: 9610830030,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateJobOverview).toHaveProperty('id', '1e46da2a-b9e9-4821-b369-40cbd924282d');
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
                            id: 'c5a702fe-a933-400f-8c93-0499bf1a69ed'
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
                            id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobOverview.id).toStrictEqual('fc353db1-1bb9-4bda-9d72-6cb8fc101469');
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
                    id: '71d3ae55-4b1e-4585-9762-a8054471f0a1'
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
                    id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobOverviewById.id).toStrictEqual('fc353db1-1bb9-4bda-9d72-6cb8fc101469');
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
                        
                        id: '353be6a5-c1bd-4655-9554-a42e72547486',
                        tenantId: 'a9d30616-2daf-4536-8165-ab6de1147c22',
                        tenantCode: 'ee0aako5h1j03s4nyuq544uqavxlz4m5sh2tsxsc0xap0tup8q',
                        systemId: '16649a9f-a715-4e70-8365-6554a3f2281d',
                        systemName: 'bwp04ue7k8mdraoup73u',
                        executionId: 'cbef1eb8-0f75-437a-816a-ecb9dd2da8f5',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 07:16:43',
                        executionMonitoringStartAt: '2020-11-04 07:54:42',
                        executionMonitoringEndAt: '2020-11-04 10:44:15',
                        cancelled: 3318336433,
                        completed: 8756428259,
                        error: 2945140835,
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
                        
                        id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469',
                        tenantId: '0e6179b4-8956-4b7f-8526-cde3c381d62b',
                        tenantCode: 'no0902ell8v2qn1sq5fz75m18ih5ocjg0xqha2hg9zfeo729q3',
                        systemId: '99da267f-f7a2-4a3d-b66d-f43a54590038',
                        systemName: 'yvbsow5fkbiscw438onu',
                        executionId: '29ef38ac-c4a7-4640-9b9c-dbdfd9d6d258',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-03 23:38:05',
                        executionMonitoringStartAt: '2020-11-04 10:07:26',
                        executionMonitoringEndAt: '2020-11-04 11:02:12',
                        cancelled: 6715773211,
                        completed: 1665843596,
                        error: 8116779719,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateJobOverview.id).toStrictEqual('fc353db1-1bb9-4bda-9d72-6cb8fc101469');
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
                    id: 'fffdc3bd-5a02-4a08-9521-c2b25e5a5e34'
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
                    id: 'fc353db1-1bb9-4bda-9d72-6cb8fc101469'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteJobOverviewById.id).toStrictEqual('fc353db1-1bb9-4bda-9d72-6cb8fc101469');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});