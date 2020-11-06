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
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'e607yk6xyzmcd870i5pdxr6kco0rsr91ne6lhu7kmej9sx1h4f',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'x0m5oa6ifg2s769tgb2n',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 06:45:11',
                executionMonitoringStartAt: '2020-11-05 22:57:57',
                executionMonitoringEndAt: '2020-11-06 12:06:50',
                cancelled: 5027445889,
                completed: 7067151094,
                error: 4816742334,
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
                
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'ar934hbmpyu85icv2gn1c8bja2xrdlqjopu6bsj6n0gtd7dyoj',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'heasm3jevo0nmycas2dm',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 01:56:57',
                executionMonitoringStartAt: '2020-11-06 12:03:57',
                executionMonitoringEndAt: '2020-11-05 17:48:16',
                cancelled: 6354863783,
                completed: 1817527568,
                error: 8453359270,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: null,
                tenantCode: 'fufagn2aal323loncie5k3pmrxol9xasuk55q1sq512izwkmgz',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'hmfmlp1wxze7x0r80to7',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 20:10:57',
                executionMonitoringStartAt: '2020-11-06 03:29:27',
                executionMonitoringEndAt: '2020-11-05 22:04:29',
                cancelled: 4639622763,
                completed: 7892674697,
                error: 7374515510,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                
                tenantCode: 'af911turin9v7szs4xuyaisaq4bykir93pe6j3bpld764xod6l',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'zhfm56cahu8bwz2phdgf',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 13:45:33',
                executionMonitoringStartAt: '2020-11-05 12:52:45',
                executionMonitoringEndAt: '2020-11-05 14:33:20',
                cancelled: 5350970820,
                completed: 6514466600,
                error: 9499391532,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: null,
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'egykwyn16hhc8uqbj6uu',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 09:19:36',
                executionMonitoringStartAt: '2020-11-05 20:00:10',
                executionMonitoringEndAt: '2020-11-06 11:40:59',
                cancelled: 2415747435,
                completed: 3613274654,
                error: 1779209028,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'iypi1ucsrgio58jo3ipv',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 19:14:17',
                executionMonitoringStartAt: '2020-11-05 16:16:56',
                executionMonitoringEndAt: '2020-11-05 16:46:16',
                cancelled: 3482204499,
                completed: 5856283907,
                error: 4865621765,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'wzzxk1wq43bq2nvciidvo1s0z44gticetcccbhsd7ug25a5h5a',
                systemId: null,
                systemName: '1tnld1pz5dekoas4epnr',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 17:34:37',
                executionMonitoringStartAt: '2020-11-06 02:01:36',
                executionMonitoringEndAt: '2020-11-06 11:28:29',
                cancelled: 2234240084,
                completed: 1240501952,
                error: 1657526606,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'urgoxcos0zqstwzsvqabnkdmv0crq6aurflagotlmpoxeyg3kd',
                
                systemName: 'ehdun4bq2ntdi26hm5ch',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 11:53:05',
                executionMonitoringStartAt: '2020-11-05 23:02:47',
                executionMonitoringEndAt: '2020-11-06 04:48:40',
                cancelled: 8555776012,
                completed: 1208947465,
                error: 3365226158,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'w13wu9xaadcemuqpzrvqbj4k2xpocv4a2180xmqjpbmttezg8u',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: null,
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 04:18:24',
                executionMonitoringStartAt: '2020-11-06 06:22:36',
                executionMonitoringEndAt: '2020-11-05 17:54:26',
                cancelled: 2328893365,
                completed: 3972017979,
                error: 3201776362,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: '2y9gc9nrmhjzgliaqcwff9sgghag7rcfwv6lcyxcb0x4fd62mk',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 17:30:27',
                executionMonitoringStartAt: '2020-11-06 11:42:15',
                executionMonitoringEndAt: '2020-11-06 01:57:40',
                cancelled: 6076363993,
                completed: 1541749494,
                error: 1153062517,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'zoqspswbuub0tkothzsl2gqmrfolfhuhf9q2u6e75hb98np0ri',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'sl47zb7zs8oipi7w7n9z',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 21:53:29',
                executionMonitoringStartAt: '2020-11-05 18:11:36',
                executionMonitoringEndAt: '2020-11-05 18:32:46',
                cancelled: 1013600243,
                completed: 8708195762,
                error: 3123047724,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'yrdz6n81j9i2844wejfjs4nni8y4s7l0595stoedampdy8sdiw',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'q57xjzz9vo24158uu8gf',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 22:27:54',
                executionMonitoringStartAt: '2020-11-05 13:42:36',
                executionMonitoringEndAt: '2020-11-06 00:01:27',
                cancelled: 7119467366,
                completed: 8307127596,
                error: 3179368167,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'voe3lesz8p5bwp3sh23z12zxpu3rybefot0d3ixybyzhpsnb1h',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: '28nqon05529umaczx1w3',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: null,
                executionExecutedAt: '2020-11-05 19:11:43',
                executionMonitoringStartAt: '2020-11-06 08:21:51',
                executionMonitoringEndAt: '2020-11-06 06:38:51',
                cancelled: 4903828206,
                completed: 2101270285,
                error: 3438760145,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'cuc9ccb8zwavk2r0t5803ty7f5g822brpg0qotjb778fnqxldd',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'ivqzxkno5vajuyimn991',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                
                executionExecutedAt: '2020-11-06 06:10:05',
                executionMonitoringStartAt: '2020-11-06 06:50:52',
                executionMonitoringEndAt: '2020-11-06 10:53:19',
                cancelled: 6374106985,
                completed: 3716930280,
                error: 2392558873,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'lbbxzhpmuyx936q0y6nd7s3yrx5a7wv1fa8n8j804nr92s9b9d',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'qzen4009224jkoth2mv7',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-05 18:02:56',
                executionMonitoringEndAt: '2020-11-05 12:39:41',
                cancelled: 3474484291,
                completed: 7961806758,
                error: 2221839155,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'pdibmwd9oa11xg971tur7je3yg118b0nhm9c7mgnawu3h21k5x',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: '1mphw2szzdl9h2n4chd0',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-11-05 23:08:36',
                executionMonitoringEndAt: '2020-11-05 21:17:47',
                cancelled: 9179167734,
                completed: 4708131805,
                error: 3532236825,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'vp6ix9o3pcnh85uznom3qoionknn7wnmo6cswqh7oxa203qpoi',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'uaa4kl0b6a0ifnzb6dch',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 13:05:32',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-06 11:42:00',
                cancelled: 3783792309,
                completed: 9604957378,
                error: 6765496354,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: '84ke8ykbc1kgbhorf0v4tkxuvwqn9yd87dc301pqlqt2ti6mgz',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: '6849bc6nwzsdc60fai8s',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 23:11:48',
                
                executionMonitoringEndAt: '2020-11-06 05:36:06',
                cancelled: 6707503837,
                completed: 3831249804,
                error: 9152135580,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: '08z3ib5h1b5h0tesstupgnfuy4bqf8bbl8a42xdwcvshcqfu8w',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'v4rc283lp7oml7vo09bc',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 01:13:23',
                executionMonitoringStartAt: '2020-11-05 14:21:41',
                executionMonitoringEndAt: null,
                cancelled: 6870541852,
                completed: 1862036459,
                error: 5861770133,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'xj1we5z3rs2ogvl9v0zgqsnf27y5gv4chli2dctsy6vd3faz10',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'hb0a3e6kq10zhjskfnbt',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 03:06:47',
                executionMonitoringStartAt: '2020-11-06 10:13:09',
                
                cancelled: 4201163299,
                completed: 6658096643,
                error: 5138230681,
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
                id: 'ag06rvh88xl61s75dtjhxuulgc04av3aojcxz',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'rbq2lh8ss2rxomv3slh5pfy741zfrc9hkv8niep6h0uojtjsi8',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'unwjkf915teifuf3s8a7',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 02:33:44',
                executionMonitoringStartAt: '2020-11-05 23:56:36',
                executionMonitoringEndAt: '2020-11-05 20:55:41',
                cancelled: 1321975777,
                completed: 8303224518,
                error: 9765511899,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: 'knna7l1trih132s71to4igk5gbstcp4pnn1cr',
                tenantCode: '07tzm6npkfvv97ayhcj1l6j9arbiurtviqbgrr7fx0zcti8zxo',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'h1bjna65pjrppkytwqf0',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 17:11:10',
                executionMonitoringStartAt: '2020-11-05 13:47:24',
                executionMonitoringEndAt: '2020-11-06 02:31:29',
                cancelled: 5283601268,
                completed: 8321371783,
                error: 9842566476,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: '57y00s98s9okj4gqybvmsynzl8mmvnodzfduk4dvpzpr7oc1ui',
                systemId: 'mf00yrotb6o6fqtbz159kdo4kb9hm04rz7ple',
                systemName: 'ihmsg4515kjvxdmmn2e3',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 02:09:36',
                executionMonitoringStartAt: '2020-11-05 12:38:49',
                executionMonitoringEndAt: '2020-11-06 08:36:50',
                cancelled: 8069988413,
                completed: 5660866062,
                error: 1931769735,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: '5zwj5fvf8q1bl2eavr9gbhsqm5k3k04ttqjssde2kz0boksqfn',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'y2st74z76mgai3lavtsb',
                executionId: 'pwq8q325lctuw7d37h1akacusse6f622juesp',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 00:48:23',
                executionMonitoringStartAt: '2020-11-06 00:09:06',
                executionMonitoringEndAt: '2020-11-06 10:25:06',
                cancelled: 7855308569,
                completed: 7526314060,
                error: 5290639644,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: '2hbpp6hn5eqkuestpx6c7ubrpexrtfvbyaetnuskzfxqumehtpy',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: '9ppcwrytg28qkfn5wo2o',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 03:32:05',
                executionMonitoringStartAt: '2020-11-05 21:05:54',
                executionMonitoringEndAt: '2020-11-06 03:31:10',
                cancelled: 5719694085,
                completed: 4309213228,
                error: 3597981826,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'v10r3u4d24o4rtelfqe0y9j4y8n2hgr4yzzuzsi86snpolsnkj',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'dzt5rt23igt8i50zyvxtr',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 18:06:28',
                executionMonitoringStartAt: '2020-11-06 05:49:54',
                executionMonitoringEndAt: '2020-11-06 05:44:28',
                cancelled: 1922801084,
                completed: 7494422547,
                error: 1720217875,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: '3bfh9e2rv9rav2ustrd560wdy2dsfitxawj3j0b66eah95ha9o',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: '3l9o2j6o4xdrrbzze9z2',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 21:32:52',
                executionMonitoringStartAt: '2020-11-06 12:02:27',
                executionMonitoringEndAt: '2020-11-05 13:49:24',
                cancelled: 53209211351,
                completed: 1971277585,
                error: 2649572825,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'y032bi9sksbu3u475obkvd3c1d5nlwe9bvpbtc5v9nfxew1mp8',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'v3s3g2o4rn0wt6nvjdqa',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 10:32:14',
                executionMonitoringStartAt: '2020-11-06 11:12:54',
                executionMonitoringEndAt: '2020-11-06 02:40:04',
                cancelled: 8207182951,
                completed: 32853221914,
                error: 2050492063,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: '4rqfcw65v6drwcl3g962172251wc79xvn56ygwgsoko8etji8v',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'jfjzs5le62b54eteumn4',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 09:56:31',
                executionMonitoringStartAt: '2020-11-05 23:02:31',
                executionMonitoringEndAt: '2020-11-06 04:47:24',
                cancelled: 4489990102,
                completed: 9290255141,
                error: 73378026649,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'q8qmeg27rvcyz28s0bi8eg6f6z9qhijx4wbd02gk2tnpiluy8b',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'dugza8uzs2g1tlglqt6p',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 16:57:11',
                executionMonitoringStartAt: '2020-11-05 14:01:45',
                executionMonitoringEndAt: '2020-11-06 08:04:59',
                cancelled: -9,
                completed: 4806657358,
                error: 7310605530,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'vv3r9w7vm0q0vr6zdk95beul46vwgdpv4dbjp4hh2eawv6ln6c',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'p08509uby9e8as0u87x2',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-06 03:00:03',
                executionMonitoringStartAt: '2020-11-05 23:41:54',
                executionMonitoringEndAt: '2020-11-06 07:51:08',
                cancelled: 2075492406,
                completed: -9,
                error: 6151135948,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'qqphx2knneyfblf49ktcwv9zm8jrxx0lltsghq36pqlkwcr7ql',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'j71te32xmj2yw8aq47wf',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 06:01:17',
                executionMonitoringStartAt: '2020-11-05 14:28:20',
                executionMonitoringEndAt: '2020-11-06 02:59:16',
                cancelled: 4221532680,
                completed: 4887371091,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'gji9jdez1p2re3g94hvlutq3o0r01ag113t8c1vi2ukkusmc99',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'h4nhbln8u4b43qvn1iso',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-05 16:14:00',
                executionMonitoringStartAt: '2020-11-05 13:06:47',
                executionMonitoringEndAt: '2020-11-05 22:13:57',
                cancelled: 3894730524,
                completed: 8110096178,
                error: 1686225523,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'b1dryua223l46bll89cftkm4hbgfwiy5prf9bzkojg9v8tdjk6',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: '91vra1fqevbhydj8m93x',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-05 15:25:47',
                executionMonitoringEndAt: '2020-11-05 20:00:33',
                cancelled: 2850243972,
                completed: 2855984789,
                error: 1957684698,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'u7rjzl8gbyetahxfsidl3vd216jm0bi8857m0jjlrc6p1rskwa',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'gdhzrl45p0ftzdjmh2t5',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 12:50:26',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-05 14:34:25',
                cancelled: 2726353820,
                completed: 7777679888,
                error: 8507363710,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'mc07yozu7ss3qwkemo5sbf69kosf1wn4hy2obvs7y48qf78lff',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'pbxc77fjd5datz8uemmp',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-06 05:15:02',
                executionMonitoringStartAt: '2020-11-06 10:50:29',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 3544318200,
                completed: 7501880423,
                error: 4044084768,
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
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: '8sgmigrpehbyqpegyt1kywpdpnnedpqja6ape5c4cjbm3uvihz',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 'rxt54u2vu5cj7d3idzpe',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 22:12:58',
                executionMonitoringStartAt: '2020-11-06 11:34:32',
                executionMonitoringEndAt: '2020-11-06 07:02:58',
                cancelled: 4600203654,
                completed: 9033856978,
                error: 8500021110,
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
                        id: 'bc319b7a-de51-4263-9fa9-613702114f28'
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
                        id: 'f52d0530-f935-4cb4-80cf-639a713ed14f'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f52d0530-f935-4cb4-80cf-639a713ed14f'));
    });

    test(`/REST:GET cci/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview/894c40a0-173a-41dc-8207-789de481aa15')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview/f52d0530-f935-4cb4-80cf-639a713ed14f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f52d0530-f935-4cb4-80cf-639a713ed14f'));
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
                
                id: 'aa547c9e-081e-4e18-bd83-f1d99eae7be9',
                tenantId: '90762bb4-5d95-4cd9-8183-1f11e935e1d9',
                tenantCode: 'winu9oq3rosgw67to9vquvvl52acam5r5036qbeily0gal94a0',
                systemId: 'c84d2df8-6e22-4895-ae14-8a9799e3c818',
                systemName: '9s1cnwegtsw9owe4ptmm',
                executionId: '2c652e8f-bb79-4714-b706-bd460fbe385b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-05 22:33:07',
                executionMonitoringStartAt: '2020-11-06 11:55:09',
                executionMonitoringEndAt: '2020-11-05 22:33:04',
                cancelled: 1071935507,
                completed: 6118218377,
                error: 7453141840,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                tenantCode: 'b9x26m1wrokpd5z6eguzviqibk05fvgw1oxp8q3hnu0h5onriy',
                systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                systemName: 't7xu90otmuzrcfkigdxg',
                executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-05 14:12:49',
                executionMonitoringStartAt: '2020-11-06 07:58:16',
                executionMonitoringEndAt: '2020-11-06 04:28:10',
                cancelled: 8972229463,
                completed: 9140581013,
                error: 5104520558,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f52d0530-f935-4cb4-80cf-639a713ed14f'));
    });

    test(`/REST:DELETE cci/job-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-overview/cc719cc4-aa99-4a05-9ac1-e6fde6ea9c93')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/job-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-overview/f52d0530-f935-4cb4-80cf-639a713ed14f')
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
                        id: 'd832722d-c0ba-4944-961d-740a3a6c3518',
                        tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                        tenantCode: 'forlzggfl4cf4rdsngdl098xyjk3x39uqrg6rb9fdzggjvgw7l',
                        systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                        systemName: 'uoz4co65bgr0vk7l4nup',
                        executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-06 11:50:25',
                        executionMonitoringStartAt: '2020-11-05 17:14:07',
                        executionMonitoringEndAt: '2020-11-06 07:21:47',
                        cancelled: 1242277391,
                        completed: 5657484859,
                        error: 6429305061,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateJobOverview).toHaveProperty('id', 'd832722d-c0ba-4944-961d-740a3a6c3518');
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
                            id: '435a7664-87ea-4b3d-b958-1e03926658f5'
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
                            id: 'f52d0530-f935-4cb4-80cf-639a713ed14f'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobOverview.id).toStrictEqual('f52d0530-f935-4cb4-80cf-639a713ed14f');
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
                    id: '4b260693-0768-4e71-becf-23c4d3f8b848'
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
                    id: 'f52d0530-f935-4cb4-80cf-639a713ed14f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobOverviewById.id).toStrictEqual('f52d0530-f935-4cb4-80cf-639a713ed14f');
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
                        
                        id: '24295bf5-c26a-4147-80e9-897914026791',
                        tenantId: '185be47a-c263-4f1a-a0c8-0c53f6d12ff9',
                        tenantCode: 'ai5n2tswc690tajolxkbnysyz0uxr4d6308j0gik5wgryq5jac',
                        systemId: 'a8d7218a-e78a-4c8b-bfb9-b90fbb20b1f0',
                        systemName: 'wc3ygb7m7q0zfgkbr5ag',
                        executionId: '7bd18250-3f31-4a8d-9787-b3863d61fa04',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-05 22:08:28',
                        executionMonitoringStartAt: '2020-11-06 03:24:21',
                        executionMonitoringEndAt: '2020-11-06 03:19:17',
                        cancelled: 4639339744,
                        completed: 2369183109,
                        error: 4649448080,
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
                        
                        id: 'f52d0530-f935-4cb4-80cf-639a713ed14f',
                        tenantId: '6c6a51d0-2519-4d17-81b3-fa029303934d',
                        tenantCode: 'hqmt7jhs6leq1mw96fxaby8lkww8y7d8j70vluv0rh74nq2n2i',
                        systemId: 'bc3fbba8-ded7-4758-9188-7b7e89ab632b',
                        systemName: 'tt2f6e25ulisrwovzjxg',
                        executionId: '7b264874-2fe9-42cd-bfa2-22c00f65e1ed',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-06 10:06:23',
                        executionMonitoringStartAt: '2020-11-06 06:32:30',
                        executionMonitoringEndAt: '2020-11-06 06:36:56',
                        cancelled: 4008140472,
                        completed: 8935473476,
                        error: 4840496138,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateJobOverview.id).toStrictEqual('f52d0530-f935-4cb4-80cf-639a713ed14f');
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
                    id: '1fb29ec9-bbb0-42be-9332-d525e4eb45d9'
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
                    id: 'f52d0530-f935-4cb4-80cf-639a713ed14f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteJobOverviewById.id).toStrictEqual('f52d0530-f935-4cb4-80cf-639a713ed14f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});