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
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: '6ar0rldsuwmhtluml8ll7nzr752qegecckl77d437r7xtktk37',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'cqcqlzbanqtgpyeqjydl',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 19:43:58',
                executionMonitoringStartAt: '2020-07-27 11:59:23',
                executionMonitoringEndAt: '2020-07-27 06:30:26',
                cancelled: 6269686068,
                completed: 5030047439,
                error: 2734164896,
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
                
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'szmlqwj567k4tkj7wwjyfqe4zm61wclj9pyaokt5un7y17a8s7',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: '5o5dcdr47kkis6bkxqe7',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:29:51',
                executionMonitoringStartAt: '2020-07-27 04:24:03',
                executionMonitoringEndAt: '2020-07-27 13:02:00',
                cancelled: 4658703155,
                completed: 2769778580,
                error: 7977650462,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: null,
                tenantCode: '1uqcms8799rwdg2bzc54o8njcg2gfpg4xspgavgfbmy0b867kf',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'c4c8ookyq355vowxcj2e',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 16:33:09',
                executionMonitoringStartAt: '2020-07-27 13:22:15',
                executionMonitoringEndAt: '2020-07-27 01:40:38',
                cancelled: 7565486582,
                completed: 7936514517,
                error: 2197315965,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                
                tenantCode: 'nh8pptgw2f66n28b75uzwxmo0ky1nf0y4ecdzhy3cabriufktw',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'h6vgdkulpi54m4fzw97m',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 06:03:53',
                executionMonitoringStartAt: '2020-07-27 09:03:43',
                executionMonitoringEndAt: '2020-07-27 19:10:34',
                cancelled: 6432891342,
                completed: 9763225285,
                error: 3273154049,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: null,
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: '8qx7s0irmz720q96e0k3',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:50:01',
                executionMonitoringStartAt: '2020-07-27 10:02:21',
                executionMonitoringEndAt: '2020-07-27 17:32:22',
                cancelled: 8823798051,
                completed: 6876233420,
                error: 8322548267,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'lief6m7v9nipyvx4kz43',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:13:56',
                executionMonitoringStartAt: '2020-07-27 01:21:32',
                executionMonitoringEndAt: '2020-07-27 06:06:25',
                cancelled: 2164104030,
                completed: 5214178762,
                error: 9107151293,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'p3fmkk1dge4xgstsndlpga8ww9i65bh6njfkl10i2qa1lo9vf0',
                systemId: null,
                systemName: '7xaqqp3b372lcgjsu837',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 07:00:59',
                executionMonitoringStartAt: '2020-07-27 17:42:55',
                executionMonitoringEndAt: '2020-07-27 20:41:39',
                cancelled: 9284021957,
                completed: 3303333113,
                error: 7759137122,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: '7x51mpe33eflb1o73yky8w7shgywm05p0xe2kqt8a96m14wgwz',
                
                systemName: '4vf0gxdtin6zrwtp8plp',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 17:37:48',
                executionMonitoringStartAt: '2020-07-27 03:54:52',
                executionMonitoringEndAt: '2020-07-27 18:44:05',
                cancelled: 2446670423,
                completed: 2331613622,
                error: 1578722120,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'lj8nu4re7ff0yjn0earqkhqxb4bbnok265o259vbropvg21tuz',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: null,
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 15:42:17',
                executionMonitoringStartAt: '2020-07-27 16:35:21',
                executionMonitoringEndAt: '2020-07-27 04:15:46',
                cancelled: 3361343219,
                completed: 2538734169,
                error: 5446625208,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'rmyetl7a32du1il2rk0j6z7mwgleqxj0bval8nmk74yf627jok',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:30:39',
                executionMonitoringStartAt: '2020-07-27 08:48:40',
                executionMonitoringEndAt: '2020-07-27 05:52:33',
                cancelled: 3253294980,
                completed: 3720429779,
                error: 3732806477,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: '4zib3liug33ixrjbud2lgjdp9em5ie2xbslblzvivgb394vk90',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'ui1ihh24djlxqudl1nzw',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:48:39',
                executionMonitoringStartAt: '2020-07-27 17:04:10',
                executionMonitoringEndAt: '2020-07-27 12:54:51',
                cancelled: 9992341136,
                completed: 5052301331,
                error: 1178189377,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'leett9t1yrgt777z5zwkrvv50txw2v4l269o2mo36bmukwprpk',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'bwfjxqz4fyzj1l1kk3vv',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 22:06:27',
                executionMonitoringStartAt: '2020-07-27 03:19:22',
                executionMonitoringEndAt: '2020-07-27 18:39:41',
                cancelled: 8860123244,
                completed: 9970349383,
                error: 1739281402,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'klju2tn1w3xcggi50mbnl7ei5nym93y9iivsedrjfj93ya1vq1',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'fgwwwyz9261bqdek3lq3',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: null,
                executionExecutedAt: '2020-07-27 05:12:34',
                executionMonitoringStartAt: '2020-07-27 13:45:30',
                executionMonitoringEndAt: '2020-07-27 19:22:59',
                cancelled: 7143014241,
                completed: 6080058996,
                error: 6479558444,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: '4o33hc5bcs4aav3fku21ba4j4rstc514tf5ogq24s7uru1qsxo',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: '44yjilozu4jmudo3u3ds',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                
                executionExecutedAt: '2020-07-27 14:24:08',
                executionMonitoringStartAt: '2020-07-27 04:48:46',
                executionMonitoringEndAt: '2020-07-27 10:13:45',
                cancelled: 2984639623,
                completed: 2727838891,
                error: 2993052095,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'nijcpxme0jztjm17dgx4tn6t63u6z9gcj7460nkqu45sgl42vg',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: '1vkliv5nfcqfrcw1kvv9',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 02:43:50',
                executionMonitoringEndAt: '2020-07-27 08:23:19',
                cancelled: 1759089139,
                completed: 2140610141,
                error: 4657821095,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'azz27wsgsxykk2xrcbw380xzfn4no50wymuyqr8pikbz42ibs8',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'rbdlbmbb54ctljqnyn6d',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-27 23:07:20',
                executionMonitoringEndAt: '2020-07-27 11:52:37',
                cancelled: 4757898374,
                completed: 4744495919,
                error: 4004453181,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'rwvbu82sha31gzv5chm20a7ysf8ylzinaj21rvx1wq7hm8svnh',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'rriz2jvncga8ukhmdde6',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 00:00:12',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-27 04:14:41',
                cancelled: 3430354331,
                completed: 3445746420,
                error: 7461590343,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'z4a56n76efglsbqeih6yzhhvmck9lnl9juy23nkz9fow4ey14u',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'fkk1niifwy2gnk9mo2u7',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 14:03:19',
                
                executionMonitoringEndAt: '2020-07-27 18:01:14',
                cancelled: 9674339655,
                completed: 6260678376,
                error: 6069690412,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'v4deey3qogxi2xfxo85wol1rr7kvw3krqu33wo4lwy3g2v3fgk',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: '2ptaru2goc62cqt8jo74',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 19:14:11',
                executionMonitoringStartAt: '2020-07-27 02:43:49',
                executionMonitoringEndAt: null,
                cancelled: 3840219517,
                completed: 8826238903,
                error: 1710913709,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'tirkwjv5qy0e23cacsdn4rsvbp3kbrifn145w902ruap9meo2v',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'iptodf4j9d6tdt92grxa',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 01:42:52',
                executionMonitoringStartAt: '2020-07-27 16:49:41',
                
                cancelled: 4606829193,
                completed: 1361315507,
                error: 3006742240,
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
                id: 'li8zwyiiryzcyjypbvt948x3uelmyve2twb9v',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: '5kzaek3o6z7dchnpq5m02pc8686vew9gz3w836t92ueqkhewxx',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: '6g0q88msh1babup1e6rv',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 13:44:59',
                executionMonitoringStartAt: '2020-07-27 09:03:01',
                executionMonitoringEndAt: '2020-07-27 21:50:15',
                cancelled: 8322024082,
                completed: 1629109825,
                error: 2848180367,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '8kh4rryzlpt9lknzd4u3gh39qopxv8kbhl2im',
                tenantCode: 'u8myk57gscer7zumh9t0w84gs6cmgfrfcrvtassroy5yuvxvut',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: '1hqow5lft9l7wwxrj30m',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 18:18:28',
                executionMonitoringStartAt: '2020-07-27 19:50:41',
                executionMonitoringEndAt: '2020-07-27 17:12:39',
                cancelled: 9250550269,
                completed: 1086281761,
                error: 6460221655,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: '1vy1e7pn7n62o57g4fotbap8yztjxk9z8fsrj8cfjzm8pg7olb',
                systemId: 'j6brgav1aznz4vmh1qvkjm4f9it4r6azx403c',
                systemName: 'y35uxkb4isdwjcnjjbe3',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:32:28',
                executionMonitoringStartAt: '2020-07-27 05:04:12',
                executionMonitoringEndAt: '2020-07-27 01:43:46',
                cancelled: 5616312100,
                completed: 3294140139,
                error: 8597754110,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'q8mcjnclkhncwlt9t58qoa3svsj0su9ko5dsr2ey0hj0f3wxc6',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'yqh3bgi1qugfpwrmsd2y',
                executionId: '8t2ww8unxrmz7tl9t3ert7rvzifyxrf36o49e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 16:28:35',
                executionMonitoringStartAt: '2020-07-27 09:07:47',
                executionMonitoringEndAt: '2020-07-27 23:39:50',
                cancelled: 2419844726,
                completed: 4686930674,
                error: 8688002397,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'aqd4h5bs0zecbfd1t42b0naxl2pjnmojacxcjl3upgmpnny9r8l',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'cdv2k060fevn8iu5q2jq',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:18:24',
                executionMonitoringStartAt: '2020-07-27 04:11:57',
                executionMonitoringEndAt: '2020-07-27 10:52:33',
                cancelled: 5172176115,
                completed: 4831718443,
                error: 3402541912,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'rsq6am1yjaldeq6owe1mx3u6r67z79q8cg6diuxual2rvj58gn',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'nol4e0xv3gbdouoxjjhpx',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 22:08:59',
                executionMonitoringStartAt: '2020-07-28 00:42:32',
                executionMonitoringEndAt: '2020-07-27 09:13:36',
                cancelled: 3547813930,
                completed: 9971694864,
                error: 6363447270,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'wsrcs41sbmdrr8ic4pk5bvlpxgv0qhwzy94imn0zzravt24m8y',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'dobktqqq0hf6q83az0cf',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 04:28:18',
                executionMonitoringStartAt: '2020-07-27 04:26:22',
                executionMonitoringEndAt: '2020-07-27 10:54:40',
                cancelled: 68837202007,
                completed: 1405035132,
                error: 4780061603,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'ziizvw277fmpneabi3hmpsmjehg1x516dkone0mpzkfbx63vqu',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'ac5u0wn2qfi3arzxaggs',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 21:07:36',
                executionMonitoringStartAt: '2020-07-27 06:12:41',
                executionMonitoringEndAt: '2020-07-27 17:40:44',
                cancelled: 8469156206,
                completed: 71391592347,
                error: 7308134804,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'x9zakdqjg4rre1061qi4bybmf8hg3nxhts3tsr9n8lq02udc00',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'xbfak7pbciopgbzxlxgz',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 06:07:09',
                executionMonitoringStartAt: '2020-07-27 18:02:47',
                executionMonitoringEndAt: '2020-07-27 21:39:06',
                cancelled: 2662631793,
                completed: 6976704401,
                error: 19239905584,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'hlyeqx0k9eefug3gbs6jme2ohvgskg93h0p4pfbs7pvjyxdpwv',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'lls5nshm2ckq1bqx93gr',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 01:04:40',
                executionMonitoringStartAt: '2020-07-27 20:08:32',
                executionMonitoringEndAt: '2020-07-27 05:12:20',
                cancelled: -9,
                completed: 8334272640,
                error: 1485393147,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'cxminrqgmtyt3vcgk551wl3htgcvjbdq3j6b45n0yxf31rat56',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'napv30tfu9aikipsbm4p',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 04:29:02',
                executionMonitoringStartAt: '2020-07-27 02:38:46',
                executionMonitoringEndAt: '2020-07-27 02:29:34',
                cancelled: 2994036566,
                completed: -9,
                error: 4974760058,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'mahufrane5h3jua2yq6qwdi7ha0087jq2l8ybomfqqcztz3g24',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'pu4fu0etc6vljsg0pav2',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 19:35:50',
                executionMonitoringStartAt: '2020-07-27 14:38:21',
                executionMonitoringEndAt: '2020-07-27 14:33:54',
                cancelled: 9093134578,
                completed: 5007718475,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: '70v3vlcwhnewe73ap5khyyddk3dv8dgdpqpzwjswy62vugokf8',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'y8dx472xbev72qtadf3u',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-27 22:04:05',
                executionMonitoringStartAt: '2020-07-27 13:41:22',
                executionMonitoringEndAt: '2020-07-27 16:29:21',
                cancelled: 6979189178,
                completed: 3783882526,
                error: 5665494850,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 't84tinj4jto5ufg0b8eri84p4bxdh9riy48s82s42bnzz8sgd3',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'wm5qgns5muzgwytqtd37',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 02:28:20',
                executionMonitoringEndAt: '2020-07-27 13:11:24',
                cancelled: 4351730173,
                completed: 5675953439,
                error: 7499229963,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'lrmkivli4lwifhnhvbigx4ruh3dmx7tx8czzxe2otc2a2ev9f5',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: '9k8koekrkqq6w6dd5nhe',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 21:10:21',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 18:16:32',
                cancelled: 7165189352,
                completed: 2914274910,
                error: 4417250123,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: '13jupfqhdliwkvca8hgidxc9mnjpp0j7nmv3w1br5cmhdko98x',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'm2nr6l2eq93uh18xdftp',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 12:12:16',
                executionMonitoringStartAt: '2020-07-27 08:26:06',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 3551241557,
                completed: 3216696693,
                error: 8713189492,
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
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'pw8d5ix2b8qbpuf1u7vhzma9kov6uljysbu6mjq3trb1lzz9pu',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'wq5bx1rl9aep4k8iyy5u',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 15:09:17',
                executionMonitoringStartAt: '2020-07-27 21:03:32',
                executionMonitoringEndAt: '2020-07-27 19:03:47',
                cancelled: 8616094573,
                completed: 8095013854,
                error: 4550051108,
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
                        value   : '9630b441-f059-46e9-945e-203f2bca4288'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9630b441-f059-46e9-945e-203f2bca4288'));
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
            .get('/bplus-it-sappi/job-overview/9630b441-f059-46e9-945e-203f2bca4288')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9630b441-f059-46e9-945e-203f2bca4288'));
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
                
                id: 'ecae551d-6253-4e9a-a96e-0e24b0b58926',
                tenantId: 'c3e57db5-45dc-4eb5-8263-0623ff432b37',
                tenantCode: 'lmf739rd1yhwxwohtpeny8r4xl36tvh59azr5hpnu6hda3d6fx',
                systemId: 'b57fa72e-be24-4b72-87a8-91f3dc851223',
                systemName: 'kcgsqupziihnk4afno25',
                executionId: 'eb67bc97-4edc-48b2-9c38-5cb6753370b0',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 02:54:24',
                executionMonitoringStartAt: '2020-07-28 00:50:29',
                executionMonitoringEndAt: '2020-07-27 09:33:31',
                cancelled: 5811477489,
                completed: 7788964533,
                error: 4618792612,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '9630b441-f059-46e9-945e-203f2bca4288',
                tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                tenantCode: 'qzsdfjj22c1p80py5zcgmhjtdqrvel8s59ryyh05e44fif5rkd',
                systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                systemName: 'd4pdzx92sb8vpgmg9itt',
                executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 17:19:09',
                executionMonitoringStartAt: '2020-07-27 18:14:33',
                executionMonitoringEndAt: '2020-07-27 09:14:19',
                cancelled: 6388279515,
                completed: 3586559832,
                error: 6505335173,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9630b441-f059-46e9-945e-203f2bca4288'));
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
            .delete('/bplus-it-sappi/job-overview/9630b441-f059-46e9-945e-203f2bca4288')
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
                        id: '0ac4fa8f-4160-409e-be2b-7fca81d6b900',
                        tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                        tenantCode: 'rolk9agh1broysbbxz6qj53bgvuk2hia5w5lj19xui862cbs6x',
                        systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                        systemName: 'kf2xrd7o0uzu8gt7jmy3',
                        executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 22:21:47',
                        executionMonitoringStartAt: '2020-07-27 06:32:50',
                        executionMonitoringEndAt: '2020-07-27 17:18:49',
                        cancelled: 2177443314,
                        completed: 1612193613,
                        error: 3843457389,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', '0ac4fa8f-4160-409e-be2b-7fca81d6b900');
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
                            value   : '9630b441-f059-46e9-945e-203f2bca4288'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('9630b441-f059-46e9-945e-203f2bca4288');
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
                    id: '9630b441-f059-46e9-945e-203f2bca4288'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('9630b441-f059-46e9-945e-203f2bca4288');
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
                        
                        id: '729aa109-d1b7-417b-901c-d4d53dd5dd87',
                        tenantId: '676f0040-418a-483d-b118-cdda11492e2a',
                        tenantCode: 'ldcmtazbie5cstew9qknp572p62fiy469sz7a3v3tswxaz3njn',
                        systemId: '1f8ead66-54a4-4255-8a6e-21e97e3301b6',
                        systemName: '5thqthfm3gisla766vic',
                        executionId: '29ab9df7-b3ab-40db-b127-fa3680d0fed7',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 06:46:54',
                        executionMonitoringStartAt: '2020-07-27 20:58:57',
                        executionMonitoringEndAt: '2020-07-27 10:45:23',
                        cancelled: 9576586251,
                        completed: 5762528209,
                        error: 5322666348,
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
                        
                        id: '9630b441-f059-46e9-945e-203f2bca4288',
                        tenantId: '0ed08673-3d6f-4d73-a820-ca3b8d860835',
                        tenantCode: '3vnvpq0485qlakl91b7rd4w0y4dhypja9sj97w4ugnc5esb7z6',
                        systemId: '1c8e478d-febc-4e40-8333-fc0a87443bcb',
                        systemName: 'aetoj5kkb3owcc3806dl',
                        executionId: '089e8f4b-631b-4784-97ac-7cc87a562231',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 06:53:55',
                        executionMonitoringStartAt: '2020-07-27 15:50:55',
                        executionMonitoringEndAt: '2020-07-27 17:29:05',
                        cancelled: 7093935484,
                        completed: 5378339961,
                        error: 4143253422,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('9630b441-f059-46e9-945e-203f2bca4288');
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
                    id: '9630b441-f059-46e9-945e-203f2bca4288'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('9630b441-f059-46e9-945e-203f2bca4288');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});