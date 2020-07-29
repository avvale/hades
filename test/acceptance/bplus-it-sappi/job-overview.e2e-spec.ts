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
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'i43eywtcahamhu9yarpnjg4pjsiihosg5o1f8f6l0ie3k9xrz8',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'l14oouelhnond2tor1bp',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:58:41',
                executionMonitoringStartAt: '2020-07-29 04:49:00',
                executionMonitoringEndAt: '2020-07-28 19:43:06',
                cancelled: 7854184217,
                completed: 4054649860,
                error: 2159657044,
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
                
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'tdd5xtbcybyjyeyda8rt01b9184yt3egp38dql8o4e0oat1q6a',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'ckbg2f0bphsk1j34rpg2',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:48:23',
                executionMonitoringStartAt: '2020-07-28 20:47:15',
                executionMonitoringEndAt: '2020-07-29 00:07:56',
                cancelled: 4543454708,
                completed: 6621645585,
                error: 4829787413,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: null,
                tenantCode: '36blaoxzdzpfrx1smdjrkup6wksye5bj64jwubxnjetxm7rrht',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: '1qagbgvoub2sn451cfgw',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:18:54',
                executionMonitoringStartAt: '2020-07-29 04:58:43',
                executionMonitoringEndAt: '2020-07-29 00:14:45',
                cancelled: 2758747082,
                completed: 3022519352,
                error: 2770771030,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                
                tenantCode: 'q2juq2e79fqk2cezgmaqgmyiw1dh410ob3c63gw3bnsqw3mfiz',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'whj295bkoooogkwapeqw',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:45:01',
                executionMonitoringStartAt: '2020-07-28 19:15:44',
                executionMonitoringEndAt: '2020-07-28 17:12:20',
                cancelled: 5172746432,
                completed: 3460655319,
                error: 4410469876,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: null,
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: '1zk1a6626bsiloc3dn22',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:21:12',
                executionMonitoringStartAt: '2020-07-28 15:48:42',
                executionMonitoringEndAt: '2020-07-29 04:37:09',
                cancelled: 5025111523,
                completed: 2852219992,
                error: 8053398133,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'cala3wy19ap0x0kb0qet',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:21:53',
                executionMonitoringStartAt: '2020-07-28 23:48:53',
                executionMonitoringEndAt: '2020-07-29 10:46:37',
                cancelled: 1601727974,
                completed: 3116584965,
                error: 7293229050,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'vxkjm1pmakwwtg97c8re59r7lo9jtlm1r1wv3ypj7fvr3gh1zp',
                systemId: null,
                systemName: 'q12lo6kjppxxlcbu78oe',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:30:19',
                executionMonitoringStartAt: '2020-07-28 21:21:17',
                executionMonitoringEndAt: '2020-07-28 18:41:40',
                cancelled: 4784640155,
                completed: 2451668962,
                error: 3377210742,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'ofbzpl4rg3sybct2frqej5mj8t08ht09s9j5r2t1th1bouv5f1',
                
                systemName: 'veg5rdjvp02vyx93alw6',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:14:43',
                executionMonitoringStartAt: '2020-07-29 05:53:54',
                executionMonitoringEndAt: '2020-07-28 22:30:38',
                cancelled: 4999584700,
                completed: 7611801443,
                error: 6547116496,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: '9obpeyi1sojdt114xlogdmhxe35g69qve2kv5fp8xebslrs9kq',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: null,
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:09:46',
                executionMonitoringStartAt: '2020-07-28 22:10:53',
                executionMonitoringEndAt: '2020-07-29 06:49:33',
                cancelled: 8343082585,
                completed: 1718200287,
                error: 2571645636,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: '9ymul5eej2j1akokwqitr3c0jvwz8kehx7ldm5wk2uk1j72kqw',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:04:09',
                executionMonitoringStartAt: '2020-07-29 04:43:00',
                executionMonitoringEndAt: '2020-07-29 11:08:08',
                cancelled: 5951490919,
                completed: 5830567032,
                error: 9791377781,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'gi2v1or4igd2v8jypet9cy38y6gj39keknx46trjzyy8e5ai1y',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'gzshemfj5jjsdc756fu2',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:58:51',
                executionMonitoringStartAt: '2020-07-29 01:56:47',
                executionMonitoringEndAt: '2020-07-29 14:11:33',
                cancelled: 3489297817,
                completed: 6043221554,
                error: 4031978322,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: '25zlwuwk3zwzj11qc0jlumntt66k2ik1shchhtky12esghoo9q',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: '7ribupdu29kudc1tocyw',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:57:53',
                executionMonitoringStartAt: '2020-07-29 14:10:52',
                executionMonitoringEndAt: '2020-07-28 21:25:00',
                cancelled: 7076599112,
                completed: 7841017810,
                error: 5173682555,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'ehim7bjmzmezd6zi84apm1hh6w2qgytmzxe948475h16o63rkw',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'kg21bs7ow2dohna52dc5',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: null,
                executionExecutedAt: '2020-07-28 17:27:10',
                executionMonitoringStartAt: '2020-07-28 23:41:10',
                executionMonitoringEndAt: '2020-07-28 23:57:11',
                cancelled: 9504299098,
                completed: 3769626270,
                error: 9328455679,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: '463ybqczn8dfh4r1813ruddj1tx6h3hybqb4lqtjcpvzbm5sm3',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: '2ictiawaoz5ad0x07bax',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                
                executionExecutedAt: '2020-07-28 15:51:49',
                executionMonitoringStartAt: '2020-07-29 06:44:59',
                executionMonitoringEndAt: '2020-07-29 02:00:15',
                cancelled: 3912362870,
                completed: 8553612791,
                error: 4619289038,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'mw0mdo8z3hzq3oddew70jy2lwrxzkpxyq9g5z2ycb7lhknmrpo',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'c4vkw9n3biencvcws402',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 08:32:59',
                executionMonitoringEndAt: '2020-07-29 09:56:29',
                cancelled: 5960180963,
                completed: 7585046872,
                error: 4908506768,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'u4zd8n7394dfprnlo34ri01o63yiliaatw3bp1k611tbpwefew',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'a8q63tty5ujnz0bbhbxb',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-29 15:12:48',
                executionMonitoringEndAt: '2020-07-28 16:03:08',
                cancelled: 6233669464,
                completed: 1281004114,
                error: 9415209219,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'i856t2xvnyll1b8y7yxqmha7k0mkzn4knofk6re502cco4y2e7',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'lsrtnum8a4qf457cq3aw',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:38:15',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-28 17:13:29',
                cancelled: 7293132547,
                completed: 8285241797,
                error: 1323831095,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'oqs3qkkmjka2tqqxvv7a3atxfh08dqrnpmoeo578uwgctbexkm',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: '8w9mqfzktx4yorkrz8qz',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:31:25',
                
                executionMonitoringEndAt: '2020-07-29 09:54:38',
                cancelled: 8559396867,
                completed: 8264104656,
                error: 1144058351,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'lws7erwr6mwp0a9sex1jhosuj0e7a3pyqos1o8s2h2tlb76yys',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'mwa3ahhejvclyqa4yxmr',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:47:53',
                executionMonitoringStartAt: '2020-07-28 16:41:48',
                executionMonitoringEndAt: null,
                cancelled: 8698089130,
                completed: 9903544695,
                error: 6113899400,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'w3ojgczhr59l2eu320e56mj31w5dnuzgnq53egk0wmewjhydtj',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'oht5nipdta1csln91ozv',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:14:48',
                executionMonitoringStartAt: '2020-07-29 06:54:45',
                
                cancelled: 5612313142,
                completed: 9618717683,
                error: 4309686233,
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
                id: 'rvsuch5yj033m21c8bukzlgmsu9c1nv5mo9qu',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'iu9jnr9cisxhayvv3mec1p0dk25ztr6djhenqjyd45ywizu7n2',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'i2jnr7oelkx3mq800i26',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:29:44',
                executionMonitoringStartAt: '2020-07-28 23:34:46',
                executionMonitoringEndAt: '2020-07-28 19:00:19',
                cancelled: 6555267701,
                completed: 7351794015,
                error: 6907023023,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '0ozrk1akt2mpdd09nnz8sik15ld90ln4qmew6',
                tenantCode: '2th27i58xg03bj61zjdbkte83742adi5wtdnwsunpjbm0jq65f',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'hpiqmngk2c6qoj71ku41',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:35:58',
                executionMonitoringStartAt: '2020-07-29 09:43:10',
                executionMonitoringEndAt: '2020-07-28 16:30:20',
                cancelled: 2033490820,
                completed: 6239270461,
                error: 8018814540,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'vaxxh5mszl94kx9ed3vsns7r9zh6kbyi0ph6i4gme1k94taei0',
                systemId: 'sdmoqoglvjeo9kw84u1p831fua6ss3zzi2epc',
                systemName: '24gqmzphgl3enomqhlm9',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 01:45:20',
                executionMonitoringStartAt: '2020-07-29 04:19:21',
                executionMonitoringEndAt: '2020-07-29 12:19:14',
                cancelled: 8230500890,
                completed: 7512689340,
                error: 2527429386,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'pk1lrdo4ftcde9zq8iqbywc8io1m76w6pq3z8yv6y4zd8nf8si',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: '87nypzcycdhm3f152yj4',
                executionId: 'l63q0k1hitnpc546z0fe6o1meokvbt7t58nix',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:39:01',
                executionMonitoringStartAt: '2020-07-29 12:01:28',
                executionMonitoringEndAt: '2020-07-29 09:37:05',
                cancelled: 8922880772,
                completed: 2952821374,
                error: 6154142785,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'dwc802d746ykx2mdwd8vmi84w7sc2y4huehim9qo9a4mei5dod1',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'iz2h9ca587w9ubz1lmez',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 20:47:25',
                executionMonitoringStartAt: '2020-07-29 02:47:29',
                executionMonitoringEndAt: '2020-07-29 04:15:01',
                cancelled: 2827176652,
                completed: 7291897370,
                error: 3857958951,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'e15vy19e9wj9xo12ip5jnuspddglvbom69o70qcw8ea8dfqo94',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'zmugbl0o2fq4kpdewk6y5',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:48:37',
                executionMonitoringStartAt: '2020-07-28 23:21:44',
                executionMonitoringEndAt: '2020-07-29 12:29:00',
                cancelled: 8888886179,
                completed: 5846354303,
                error: 1192263343,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'eizkk8l648yw9p46d011f0fc8ve5xtcyevx8q99yylez7iq9fn',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'v6z07amqumx40wkirnju',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:05:47',
                executionMonitoringStartAt: '2020-07-29 02:44:09',
                executionMonitoringEndAt: '2020-07-28 16:50:54',
                cancelled: 13054689693,
                completed: 4940690708,
                error: 2323175939,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: '8s0pgj5i8gxrw84r4iqy0t6vz72m6m1bi92672vyjdyd7gkwwn',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'z6nuh9s8irar47tjn5r4',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:10:58',
                executionMonitoringStartAt: '2020-07-29 12:37:15',
                executionMonitoringEndAt: '2020-07-29 08:49:05',
                cancelled: 7966524467,
                completed: 86148620714,
                error: 1228824716,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: '3u9ihkhw41wsk2bq3n7n989ysooss5s1lripaxn3gzvse8nnpo',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'er1llo65dte7zzgqgf8d',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:10:13',
                executionMonitoringStartAt: '2020-07-29 10:11:31',
                executionMonitoringEndAt: '2020-07-29 09:31:14',
                cancelled: 1770092576,
                completed: 8818382517,
                error: 38795784031,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'jj6m3pw9766m2pxnw679pjcqrksjelrsbax0h9fchsjiail6bn',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'f19h08pkt7zu79fnlj1b',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 16:47:09',
                executionMonitoringStartAt: '2020-07-29 13:03:43',
                executionMonitoringEndAt: '2020-07-29 08:44:44',
                cancelled: -9,
                completed: 1988732220,
                error: 4220016637,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'xjmz14ay6npi3jh5y860juq7rmu5yzam2qcvofcb0ndgsp4dyp',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: '3clcwk0wo5q8fmbo6s3p',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:39:45',
                executionMonitoringStartAt: '2020-07-29 02:44:01',
                executionMonitoringEndAt: '2020-07-29 05:19:13',
                cancelled: 7279490868,
                completed: -9,
                error: 7970932059,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'hbnl9gwk035cv8gc5ggb8hzasuz1j82fium7s5cuwhqs3mrjs6',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'mxujewkdp69lt5h6hdov',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:11:24',
                executionMonitoringStartAt: '2020-07-29 06:44:58',
                executionMonitoringEndAt: '2020-07-29 08:38:48',
                cancelled: 6939808676,
                completed: 9070423719,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: '8ep2agyvjthw6xfbvggky7l2p10p0jl60232puxcnuwa562s7b',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'mqka4hfrhu423p1r4tnp',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 07:15:28',
                executionMonitoringStartAt: '2020-07-28 20:52:37',
                executionMonitoringEndAt: '2020-07-28 23:33:36',
                cancelled: 6484708471,
                completed: 8420902728,
                error: 3380181603,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'nfllrja1e9rs62celppzyf3kx5isccmd8smhs7iwf8pwu5c4rn',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: '6pglhfhgmyyohx6ainaj',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 00:30:04',
                executionMonitoringEndAt: '2020-07-29 15:18:47',
                cancelled: 6158117056,
                completed: 5697449315,
                error: 9405870285,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: '6xzxhgxstcydwgpjpoco37wz6wmof6sdobf1edza6lc6w75utd',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'xxtnf6rklu1pr59cufou',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:16:04',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-28 16:53:23',
                cancelled: 9793127016,
                completed: 6821568450,
                error: 8928194365,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'rc7tygcwjpuq79nqh1gr134d6v5g92p81ib1gbo2byy0rd163y',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'o8ogk6934cw987slibjv',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:25:40',
                executionMonitoringStartAt: '2020-07-29 06:51:06',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 1554894683,
                completed: 8213683610,
                error: 8603860966,
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
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'tt0gmvxqe5v06u3ggta72a2lu6qz64h689vwkq9xk0y2t7laz5',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: 'kmlrn1rx3xhwge27z0k3',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:03:22',
                executionMonitoringStartAt: '2020-07-29 04:11:03',
                executionMonitoringEndAt: '2020-07-29 05:32:49',
                cancelled: 7493121956,
                completed: 9128001152,
                error: 3791339587,
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
                        value   : '209470df-e298-4001-95e4-cbf4636d655b'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '209470df-e298-4001-95e4-cbf4636d655b'));
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
            .get('/bplus-it-sappi/job-overview/209470df-e298-4001-95e4-cbf4636d655b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '209470df-e298-4001-95e4-cbf4636d655b'));
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
                
                id: '71433f48-afb5-48f6-bdd1-6ac8bb3d609d',
                tenantId: 'f47b4af9-6ee1-4d1a-a3e0-aa178a65bed2',
                tenantCode: '5202bm39c0oilio4h0evylpdt5vzr98v4f04ibxwglk646inix',
                systemId: '8ee2cc31-9ff6-497a-8c3c-d05c26690eb6',
                systemName: 'sqn5iim3y5egl2nng9ox',
                executionId: '35060e7c-9e30-485e-9217-5d95b76dab36',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:31:03',
                executionMonitoringStartAt: '2020-07-29 09:05:02',
                executionMonitoringEndAt: '2020-07-29 00:13:56',
                cancelled: 8876554017,
                completed: 1977986387,
                error: 9512106221,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '209470df-e298-4001-95e4-cbf4636d655b',
                tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                tenantCode: 'asrd566lxczr48v9z4b9omsu0e0nip1tum02aits48js5smn54',
                systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                systemName: '3mfkwsh2kvxgh6mtvim5',
                executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:05:51',
                executionMonitoringStartAt: '2020-07-29 03:35:35',
                executionMonitoringEndAt: '2020-07-28 17:59:07',
                cancelled: 8321660008,
                completed: 2092872232,
                error: 5947284387,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '209470df-e298-4001-95e4-cbf4636d655b'));
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
            .delete('/bplus-it-sappi/job-overview/209470df-e298-4001-95e4-cbf4636d655b')
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
                        id: 'e29af5b3-b68f-483a-9189-552b2dfa6d77',
                        tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                        tenantCode: 'pddpei74cq6ldco30i3waxie857suetm1fp7d5isc82ifgj48m',
                        systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                        systemName: 'syw2pcpr6ic3m5a4qy7d',
                        executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 01:07:06',
                        executionMonitoringStartAt: '2020-07-29 07:55:41',
                        executionMonitoringEndAt: '2020-07-29 01:59:28',
                        cancelled: 4227045789,
                        completed: 4472354480,
                        error: 3560155034,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', 'e29af5b3-b68f-483a-9189-552b2dfa6d77');
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
                            value   : '209470df-e298-4001-95e4-cbf4636d655b'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('209470df-e298-4001-95e4-cbf4636d655b');
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
                    id: '209470df-e298-4001-95e4-cbf4636d655b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('209470df-e298-4001-95e4-cbf4636d655b');
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
                        
                        id: '1ba9e6c1-cf00-417a-a971-83b22d7176ea',
                        tenantId: '87f4de19-904d-4550-82ae-d91f573251a3',
                        tenantCode: '1yj1d9b12p4irnxwprbvuulcwsw81kqgodza41fuv4f6xq7lnu',
                        systemId: 'aa2617c8-7c31-4fdf-ba7a-4b4cbc5a0379',
                        systemName: 'b1swzwd7znsdfiw11nti',
                        executionId: '73bbcb44-f4ea-4a34-928f-6972f3b7ae34',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 16:10:03',
                        executionMonitoringStartAt: '2020-07-29 07:07:25',
                        executionMonitoringEndAt: '2020-07-29 04:20:44',
                        cancelled: 2488183617,
                        completed: 1505163536,
                        error: 6322797335,
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
                        
                        id: '209470df-e298-4001-95e4-cbf4636d655b',
                        tenantId: '46d89f24-2a0b-4986-8288-1ca7796a670d',
                        tenantCode: 'xqw0ypina7ylehalaa3fo0ywd5bboc8glvxt85smf70zpem09n',
                        systemId: 'edd1969f-de7d-4ec7-a416-f4d2577ae06d',
                        systemName: 'glzp564wnklkofltojfu',
                        executionId: 'a31e3674-012a-4d16-a98c-45322d923b03',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 08:50:00',
                        executionMonitoringStartAt: '2020-07-29 13:35:12',
                        executionMonitoringEndAt: '2020-07-28 17:03:11',
                        cancelled: 7858363126,
                        completed: 2871635530,
                        error: 9192053329,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('209470df-e298-4001-95e4-cbf4636d655b');
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
                    id: '209470df-e298-4001-95e4-cbf4636d655b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('209470df-e298-4001-95e4-cbf4636d655b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});