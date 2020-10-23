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
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'jwzwxfhdlf9tcyqsi7lo9qmc295fv9mr47223qkrxr5y747tp8',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'tsm0qdc09bqpqeer6hig',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 16:26:31',
                executionMonitoringStartAt: '2020-10-23 04:14:36',
                executionMonitoringEndAt: '2020-10-22 19:58:28',
                cancelled: 6211060362,
                completed: 9063586844,
                error: 2753293785,
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
                
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'lmwlzjwvulz347x5hfz7emaljhvcyptbfphppp155u1d1l3ky6',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'zrsnlftdjuto2tr0l496',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 03:29:27',
                executionMonitoringStartAt: '2020-10-22 14:53:36',
                executionMonitoringEndAt: '2020-10-23 06:44:15',
                cancelled: 5711775449,
                completed: 1736601889,
                error: 3978143330,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: null,
                tenantCode: 'nqbi9knyqgn0uc7pr0yf68p9sno70acjwcm9p77ogt5qbz0uzc',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: '49xa2svb3nbxzxnb3y9y',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 03:17:19',
                executionMonitoringStartAt: '2020-10-22 17:53:07',
                executionMonitoringEndAt: '2020-10-22 12:44:17',
                cancelled: 5509654502,
                completed: 6010955823,
                error: 6722584849,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                
                tenantCode: 'dhcgdnkih5zh6tkpgvcnaob9q29mfzvyxoh8fjstu7wb8fofa5',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: '4ysfu962zjjje2g2dt9h',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 00:47:41',
                executionMonitoringStartAt: '2020-10-22 16:58:56',
                executionMonitoringEndAt: '2020-10-22 20:08:03',
                cancelled: 3273810481,
                completed: 5253546901,
                error: 6445715394,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: null,
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'xfjhacv8qixp68w7brrm',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 21:26:37',
                executionMonitoringStartAt: '2020-10-22 15:21:49',
                executionMonitoringEndAt: '2020-10-23 06:24:04',
                cancelled: 2809785033,
                completed: 5725300347,
                error: 5965706822,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'wvaq2yqcy75wxrbz98jx',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 20:58:51',
                executionMonitoringStartAt: '2020-10-23 05:46:52',
                executionMonitoringEndAt: '2020-10-22 21:03:12',
                cancelled: 1422255133,
                completed: 1245631290,
                error: 2208415797,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'g4wzq95rh8lhp0v4sdzlw3sly6kge360mlkfmcgaawaez85z8u',
                systemId: null,
                systemName: 'rd91h9w9jdubelzbnpx5',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 00:58:08',
                executionMonitoringStartAt: '2020-10-23 05:31:35',
                executionMonitoringEndAt: '2020-10-23 00:13:12',
                cancelled: 1787435001,
                completed: 1230516593,
                error: 6344358898,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'k3420wamdwtg7vjhfiu1lh5lbu6368t1bxk4ji2wc3vhgr5yz9',
                
                systemName: 'vb9vvrcov9o9qcfhg974',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 23:55:12',
                executionMonitoringStartAt: '2020-10-22 15:51:07',
                executionMonitoringEndAt: '2020-10-23 08:37:36',
                cancelled: 3909297145,
                completed: 6326593902,
                error: 2738099287,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'u9zp7raemz8xlee293xmj1aor6ytdc6qvcfjktcsxsukutfvgg',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: null,
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 06:20:44',
                executionMonitoringStartAt: '2020-10-22 16:08:56',
                executionMonitoringEndAt: '2020-10-22 11:54:53',
                cancelled: 6084453775,
                completed: 7123927478,
                error: 9687508474,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'kmmcvjvklmbgggck1gnw6dom39dpj3d124sibiijekrpc11mbl',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 11:48:15',
                executionMonitoringStartAt: '2020-10-22 15:57:46',
                executionMonitoringEndAt: '2020-10-23 05:10:12',
                cancelled: 9865188579,
                completed: 9962120160,
                error: 9636467301,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'oxv5mkpq7uzuf9asq4p9y8oevqwlzas6icyupg6xg0itwyiclc',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'xio4yjao1kk0t9h7k40x',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 17:55:31',
                executionMonitoringStartAt: '2020-10-23 08:53:30',
                executionMonitoringEndAt: '2020-10-22 17:11:20',
                cancelled: 8743939060,
                completed: 3001235214,
                error: 2681211609,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: '7xpp6a9qi873firkp9qwps9zppttswgcg8qseui61ge2bzb9n7',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'aqyux7x4ryo4o7sdev8o',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 12:30:59',
                executionMonitoringStartAt: '2020-10-23 05:06:56',
                executionMonitoringEndAt: '2020-10-23 03:35:38',
                cancelled: 6505275185,
                completed: 3991722990,
                error: 3021960668,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'ti8bwbtwys3qfgw1jsvs4xsnq1ocy6kw6rxf168g7gs0pdxvgo',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'f7dyz108xv1rnw10s55z',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: null,
                executionExecutedAt: '2020-10-22 17:28:25',
                executionMonitoringStartAt: '2020-10-23 03:12:59',
                executionMonitoringEndAt: '2020-10-22 19:30:20',
                cancelled: 4194900621,
                completed: 9802588984,
                error: 4397737354,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 't9avqfxmdz2y107is9v5hl5b58v9rl0acsao6t1rb3es57tax3',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'eokdcbny2c8gj9chycm1',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                
                executionExecutedAt: '2020-10-22 19:36:30',
                executionMonitoringStartAt: '2020-10-22 16:11:11',
                executionMonitoringEndAt: '2020-10-23 03:39:51',
                cancelled: 5949257227,
                completed: 1707824197,
                error: 5749973431,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'wjkhn6l8pqdooa7qmscnndrmbr7g5i5o1jksw0vstb3ycixcrh',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'wzow4ttwfam3l6jhgmzd',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-10-22 17:54:44',
                executionMonitoringEndAt: '2020-10-23 08:04:11',
                cancelled: 3081907135,
                completed: 7881204729,
                error: 7199488706,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'qkisw0qlvxufv9ka4xoeubvpy96ivzksnxe354yg5fac64drg1',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'r32n9o9805xjce46kgmd',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-10-22 20:10:34',
                executionMonitoringEndAt: '2020-10-22 17:47:03',
                cancelled: 7126434951,
                completed: 8849810969,
                error: 8009827424,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: '8tt82s4u96qtf4dk4juely0letcknqjgl3wl9boq1sz6oe83sf',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'fxtt0tnk44jnd9tfpvnl',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 21:38:04',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-10-23 00:34:48',
                cancelled: 2526117102,
                completed: 9696819318,
                error: 9734159980,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'rwob6ec9cnb2jwfvog6rgx51vgjxkt9o4e1c7od0ijbqunz9ad',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: '6a7v6elhxz5yvhjzufqx',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 21:20:09',
                
                executionMonitoringEndAt: '2020-10-22 23:51:37',
                cancelled: 9052802259,
                completed: 8614291477,
                error: 8526296649,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'tk75cjvrgs93nwv9ti8vq3zvznzs02wf6wd19f2fo9i84tqrld',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'owe9qa9i4jdg5hgwylh1',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 03:10:19',
                executionMonitoringStartAt: '2020-10-23 07:30:01',
                executionMonitoringEndAt: null,
                cancelled: 7193115727,
                completed: 9714436743,
                error: 2282664955,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: '5zrxh2o1f64dh1wdvq1ou2111bwtx0ryz4jqpj09wdium9j8b3',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: '2iab088dp4vlzy16hfof',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 18:11:27',
                executionMonitoringStartAt: '2020-10-22 12:00:06',
                
                cancelled: 4011847742,
                completed: 8459362345,
                error: 3704126742,
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
                id: 'wl5rzwck4o2mjwah8t6ls1tx3aks11g9z51iu',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'lng2ns61pifkchqhlt58uf5rpg2g2tlx5l34iy1v7yg9givpvh',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'y603y4c6kxuh9w79z0x1',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 12:04:31',
                executionMonitoringStartAt: '2020-10-22 23:19:26',
                executionMonitoringEndAt: '2020-10-23 05:45:04',
                cancelled: 8473369775,
                completed: 4780522464,
                error: 2989541979,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: 'obesjlyvzzihq60pep0ngrmnk9g1ciqaoaou4',
                tenantCode: '4m9vvn9ut29uczkusnw2h58t4ud3p57scxqesp3cuaq5d0pyez',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'qhvadh2yoxzi5l98veye',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 09:45:15',
                executionMonitoringStartAt: '2020-10-22 19:08:56',
                executionMonitoringEndAt: '2020-10-23 04:15:41',
                cancelled: 9959002391,
                completed: 2785402742,
                error: 5389149333,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: '1i2nbcyeuasup1x105gbq71cbfxuj85ojyzsh5s8herja5zboh',
                systemId: '6i73qqsd1wfi39xwv0zate9irwfi8qvj30z31',
                systemName: 'j6otaeg3zs2z0gp7n0ai',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 03:44:00',
                executionMonitoringStartAt: '2020-10-22 19:18:34',
                executionMonitoringEndAt: '2020-10-22 16:45:12',
                cancelled: 8546303796,
                completed: 6228605422,
                error: 1787822004,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: '755j5lnryribmnanfpa4rcbtge2ptktji1fqcar9hkbhiw2833',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'q8yj7qgcmzq4xxvpybcd',
                executionId: 'ruf8r7nhvmoyctkwra01bj0qm08icc5w63pzc',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 22:55:20',
                executionMonitoringStartAt: '2020-10-22 21:15:18',
                executionMonitoringEndAt: '2020-10-23 04:57:00',
                cancelled: 4602110744,
                completed: 3559606933,
                error: 9189178701,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'egpm2c6xnsutxgqthculs8y09xicq58a50m9v6p60eyrgrlmfmm',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'dv8rjb3vier90tp0djgo',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 09:11:30',
                executionMonitoringStartAt: '2020-10-22 16:24:26',
                executionMonitoringEndAt: '2020-10-22 12:10:12',
                cancelled: 9715931780,
                completed: 1177865666,
                error: 2559279540,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'sm9o0gjg0t4p8gxft8ea5sby8yntr24ubv28oeqppc2jio2orn',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'ubcs8it1iy0hnhuzi7uxg',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 15:34:25',
                executionMonitoringStartAt: '2020-10-23 08:48:19',
                executionMonitoringEndAt: '2020-10-22 21:42:14',
                cancelled: 7211798933,
                completed: 5160497250,
                error: 8866600499,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: '3jrnkdlhw7j3cis8vej88wya883tt8w0r3rqvebbszxc2q3ygv',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'fhbvxzpoqzn9mlezxhhu',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 18:01:44',
                executionMonitoringStartAt: '2020-10-23 00:47:15',
                executionMonitoringEndAt: '2020-10-23 06:55:35',
                cancelled: 16281805406,
                completed: 7844733679,
                error: 2204086480,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'sgdorbbzixhd3gkv6dfyzypjblkugz27f6eo58zqmte09i74i2',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'muk9q4nxj6sdtffast6v',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 04:15:20',
                executionMonitoringStartAt: '2020-10-22 17:03:45',
                executionMonitoringEndAt: '2020-10-23 03:42:52',
                cancelled: 7465496183,
                completed: 62430543255,
                error: 5629937610,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'pzkm0sfe4sqgpfobczvuryo9obgr2h2drjhsa3pix7puikspru',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'pxhn4xz3q913c0nqmz8o',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 04:10:45',
                executionMonitoringStartAt: '2020-10-23 07:54:36',
                executionMonitoringEndAt: '2020-10-22 14:57:52',
                cancelled: 2419733522,
                completed: 5067500516,
                error: 81343289740,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: '3et2hfb1wqfgdyt7pjxu60atthz42szu0h4b7uk4o17tvbmrk9',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: '5akyr1sxu8n9zrf9g4iu',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 02:06:00',
                executionMonitoringStartAt: '2020-10-23 06:30:49',
                executionMonitoringEndAt: '2020-10-23 09:52:38',
                cancelled: -9,
                completed: 9048024270,
                error: 3010514926,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: '4hhz09kz0nbfd4vh36zkm2erb0djgrj99ak6twsxbh8b7ya71i',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'c5ts0w1vrspp65ur3ut1',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 04:15:31',
                executionMonitoringStartAt: '2020-10-23 07:40:44',
                executionMonitoringEndAt: '2020-10-22 14:47:36',
                cancelled: 6394221957,
                completed: -9,
                error: 2109155855,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'ctzbap7sa23q41tljkb01et5ufl3xy85o9fa3rcmr3orgmukif',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: '095qa9tpzmf21240jvq1',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-22 16:48:29',
                executionMonitoringStartAt: '2020-10-22 18:59:02',
                executionMonitoringEndAt: '2020-10-23 08:34:16',
                cancelled: 1405469208,
                completed: 5789525791,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'n9oy0agshjc01fg424jt66l62l67ecltwix9c7kq392qqhuvzt',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'k2qyl018i81hnbu29f5w',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'XXXX',
                executionExecutedAt: '2020-10-23 04:12:27',
                executionMonitoringStartAt: '2020-10-22 18:27:44',
                executionMonitoringEndAt: '2020-10-23 09:56:06',
                cancelled: 3142848697,
                completed: 5091858717,
                error: 6511447961,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'nk9r43tpdjph2k3v6i848e0uq9fjq5oelcask8jqw2qglk4cty',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: '5ybfpzakli00sicqn621',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-10-23 09:30:01',
                executionMonitoringEndAt: '2020-10-22 16:27:28',
                cancelled: 7465335087,
                completed: 9091392675,
                error: 5039273886,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'o0u0nijxy7oje2j3n4nasr6gkjnll747rwcog0k3db04ske6nb',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: '53ywy3oqfanr5zts4uah',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-22 23:25:14',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-10-23 04:06:03',
                cancelled: 7732340103,
                completed: 5090722527,
                error: 8800937867,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: '40lym53wzp2fk4i54xjselz88uvno1fhrsga3v945d1jb7qea7',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'j6bpcpfyacqdre9ojw57',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-10-23 04:09:13',
                executionMonitoringStartAt: '2020-10-22 19:14:47',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 7483301630,
                completed: 8708065648,
                error: 1889881289,
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
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: 'un6s9dc4in0veuq138llxbswmsga4e42ea23b0yea5rgn0l8th',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: '3xf3h3xtfaxrqw3iqrxn',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 07:06:28',
                executionMonitoringStartAt: '2020-10-22 11:54:31',
                executionMonitoringEndAt: '2020-10-23 01:58:47',
                cancelled: 2932058863,
                completed: 4831860446,
                error: 7842888804,
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
                        id: '3096dd82-f161-4b78-8a5d-9b7a2cc690d2'
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
                        id: 'd152978a-734b-441e-9b34-7498da944059'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd152978a-734b-441e-9b34-7498da944059'));
    });

    test(`/REST:GET cci/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview/1c6e7ea3-bffd-456d-b31a-3ad53b90a3df')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview/d152978a-734b-441e-9b34-7498da944059')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd152978a-734b-441e-9b34-7498da944059'));
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
                
                id: '8be1daef-c60e-4a00-b7dc-2dd3966dcbbf',
                tenantId: 'dfa0d5df-2737-4481-bb57-714f04e4094d',
                tenantCode: 'c5utlkxfuq18fel2n30u333cmmy83v9t8clpvlrx33cuamxpvn',
                systemId: 'd7f17352-b625-4288-a181-4f1714bafb9a',
                systemName: 'tnw3o5vu1zv63kr6gym2',
                executionId: 'ff66a3a9-002f-4ca7-95f0-bf282b3f072a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 04:24:31',
                executionMonitoringStartAt: '2020-10-22 18:56:54',
                executionMonitoringEndAt: '2020-10-23 07:16:45',
                cancelled: 7904877316,
                completed: 5289834713,
                error: 6370275063,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd152978a-734b-441e-9b34-7498da944059',
                tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                tenantCode: '47pakdqitp6rbk832hizhcvw4bm0xq8cwhf5tgxdn7g46r05as',
                systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                systemName: 'mptim9f9n1c9gdfnceds',
                executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-10-23 10:51:49',
                executionMonitoringStartAt: '2020-10-23 10:20:03',
                executionMonitoringEndAt: '2020-10-22 23:24:22',
                cancelled: 7601476529,
                completed: 8419687596,
                error: 3019833549,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd152978a-734b-441e-9b34-7498da944059'));
    });

    test(`/REST:DELETE cci/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/job-overview/3ca347c2-5233-426d-ac98-0b48426095f5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/job-overview/d152978a-734b-441e-9b34-7498da944059')
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
                        id: '79aac509-a8f1-430a-86e4-68bf2575537f',
                        tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                        tenantCode: '7fyje8lk0r01u094rzkuaovjle7sjgfpw2tek7t0bfhl87rhfx',
                        systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                        systemName: 'mlzkoevjs8d48xj1qbe7',
                        executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-10-23 09:05:21',
                        executionMonitoringStartAt: '2020-10-23 03:29:19',
                        executionMonitoringEndAt: '2020-10-23 06:05:35',
                        cancelled: 5188975842,
                        completed: 7048505265,
                        error: 3870701297,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateJobOverview).toHaveProperty('id', '79aac509-a8f1-430a-86e4-68bf2575537f');
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
                            id: '92e33e5f-c3c8-4573-b1e1-0d9760ce1d57'
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
                            id: 'd152978a-734b-441e-9b34-7498da944059'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobOverview.id).toStrictEqual('d152978a-734b-441e-9b34-7498da944059');
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
                    id: 'bbb21092-0f69-40e9-aaa7-5b00d84c7077'
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
                    id: 'd152978a-734b-441e-9b34-7498da944059'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobOverviewById.id).toStrictEqual('d152978a-734b-441e-9b34-7498da944059');
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
                        
                        id: 'ae899e62-48dc-4867-9bac-6425e3df4371',
                        tenantId: '59cb88f8-6fd2-4c80-956c-331a17e9c5b3',
                        tenantCode: '315lgqxnvza96sg4a1bcfwhgilblrb32fs28v8qscg1ess38cs',
                        systemId: '816bd4ec-095c-4bc6-ba40-fe3aae7dff3e',
                        systemName: '5x5c6pmgmt0myt8dcc0j',
                        executionId: '105529ae-7ea4-41d1-bfe7-bedd4e3af243',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-10-22 23:09:58',
                        executionMonitoringStartAt: '2020-10-22 18:22:32',
                        executionMonitoringEndAt: '2020-10-22 17:33:28',
                        cancelled: 6053126144,
                        completed: 2907605547,
                        error: 3788687309,
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
                        
                        id: 'd152978a-734b-441e-9b34-7498da944059',
                        tenantId: '9fd19b74-4d8c-42bc-b206-8bc2425ced54',
                        tenantCode: 'eentkj97ygc8y6tp1mej6atii025vr11th1rrvketha82upz7b',
                        systemId: '4bf516c5-220a-43ad-afb3-1788a82ad277',
                        systemName: 'ngvxezs52g5h545lqzvm',
                        executionId: '625708a8-4ab5-4cb0-a471-74ba70c3bceb',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-10-23 00:35:45',
                        executionMonitoringStartAt: '2020-10-22 11:30:57',
                        executionMonitoringEndAt: '2020-10-22 13:31:19',
                        cancelled: 9026599734,
                        completed: 1761698730,
                        error: 5958081053,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateJobOverview.id).toStrictEqual('d152978a-734b-441e-9b34-7498da944059');
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
                    id: '072b2606-af80-48bd-9acb-87c10a0c7c58'
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
                    id: 'd152978a-734b-441e-9b34-7498da944059'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteJobOverviewById.id).toStrictEqual('d152978a-734b-441e-9b34-7498da944059');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});