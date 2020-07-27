import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IExecutionRepository } from '@hades/bplus-it-sappi/execution/domain/execution.repository';
import { MockExecutionRepository } from '@hades/bplus-it-sappi/execution/infrastructure/mock/mock-execution.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('execution', () => 
{
    let app: INestApplication;
    let repository: MockExecutionRepository;
    
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
            .overrideProvider(IExecutionRepository)
            .useClass(MockExecutionRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockExecutionRepository>module.get<IExecutionRepository>(IExecutionRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'tj9gos5xdwwcd4ebaq9st9p9mtsjdt7hhw4bg1pmm1hag11mi7',
                version: 'lgmyokmcqqjntz1v8orv',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'ycx3f8of08vk6z2jqexu',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-26 19:27:03',
                monitoringEndAt: '2020-07-27 16:03:47',
                executedAt: '2020-07-27 02:22:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: '3vfmpyrsrm9706sowut198mz71d8sbjb92ygzhp724a6gkptfu',
                version: 'vsi19862wlmv1e598lfc',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'pcdeyz3vnjy7wta76w56',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-27 12:40:19',
                monitoringEndAt: '2020-07-26 17:38:47',
                executedAt: '2020-07-27 01:31:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: null,
                tenantCode: 'bf4zxuzgqz2t81ka6ah6fup5bswx5apuad8frcoij35mita0et',
                version: 'y0fhxivpj621ag0xbau9',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'g625kk58wunxr6v7guio',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-27 07:44:36',
                monitoringEndAt: '2020-07-27 00:24:29',
                executedAt: '2020-07-27 05:15:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                
                tenantCode: 'b2b6uzcqwmow5b2ucr6zp2a9u6xjmknupbz08xryz2qu38ocof',
                version: '0nigwhrmvkh5ivb4x63t',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: '7grc9ahc3fyqu9jraojf',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-27 15:43:44',
                monitoringEndAt: '2020-07-27 08:22:00',
                executedAt: '2020-07-27 10:13:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: null,
                version: 'bhb7a43qzswlf0ytjfvv',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: '5658b0tbamxo1jixpsbq',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-27 06:31:18',
                monitoringEndAt: '2020-07-27 06:14:17',
                executedAt: '2020-07-27 05:12:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                
                version: 'iplz6o02t1rea24n5cdk',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'd0mnq5nzm2ok5yo9sofc',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-27 00:16:50',
                monitoringEndAt: '2020-07-26 19:10:13',
                executedAt: '2020-07-27 01:45:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'yv79deleizjg1zxc2ol9jgpj53zbafjm56qar11e1h0cdkkf8j',
                version: null,
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: '46mthwexoav3jg1wwar0',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-27 02:59:00',
                monitoringEndAt: '2020-07-26 19:14:19',
                executedAt: '2020-07-27 09:10:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'xbqb0s883dqqpedb1pyxp8t4wtdava0bphyo32jtkf2lqwwszn',
                
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: '3sglz7z3u380brxltgkm',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-26 21:07:09',
                monitoringEndAt: '2020-07-26 19:43:52',
                executedAt: '2020-07-27 08:48:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: '6a01sk75cwc951nsivqluqcb7oewrzfafw1ddwl9etm6u09t0g',
                version: 'rpnkouzxi4bjskdq3h6r',
                systemId: null,
                systemName: 'ar7oi6c7ejng5pg3s54b',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-27 13:47:28',
                monitoringEndAt: '2020-07-27 10:12:58',
                executedAt: '2020-07-27 02:28:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'q2mbsrw68vgk5pt1qp17dlwsxo4tjehxmeanx8ozgowu030scn',
                version: 'x2t3qs2d66lyd7rd493t',
                
                systemName: '0ggwwe2oalff683wjexo',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-26 18:00:25',
                monitoringEndAt: '2020-07-27 15:19:33',
                executedAt: '2020-07-26 22:18:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'xc5q4yqv1apbrzz87p80uuv5nsp8k4pqm7fc15rhzv5q0mihpz',
                version: 'b39o8jc8dekeeqy552jj',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: null,
                type: 'DETAIL',
                monitoringStartAt: '2020-07-27 12:37:13',
                monitoringEndAt: '2020-07-27 04:22:47',
                executedAt: '2020-07-27 00:22:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'l4ch72hwxdp5ky1laqf5utn4ra5mlz43tbd55wpxtsg43q35qo',
                version: 'ucj9hapxacukuvprats5',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-26 19:33:53',
                monitoringEndAt: '2020-07-27 16:48:54',
                executedAt: '2020-07-26 21:27:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'cqecfnalg0hh1xns0u4dm6uto6g2ji2yg4jue0orirfzdhc4al',
                version: 'xcaxl1lhgv2acevq4rr2',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: '7zc3tapf68lisrmt6a1p',
                type: null,
                monitoringStartAt: '2020-07-26 18:26:40',
                monitoringEndAt: '2020-07-27 09:34:22',
                executedAt: '2020-07-27 03:21:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'o3t3xbrmk5ri6cdubr4lapwwqzhloy4zs4fcb34o3exjb968vy',
                version: '6sukg1yuxsifv4li2hw4',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'mu59rno3volsvcmcoa16',
                
                monitoringStartAt: '2020-07-27 07:52:31',
                monitoringEndAt: '2020-07-27 08:44:04',
                executedAt: '2020-07-26 22:41:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'y6umrgkgwqum42t7j28xtkfsh437gifrrw9o8kvhngyut1nobj',
                version: '1djiwcpgc9twk83am10m',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'bu01smocibv1grjrlgnl',
                type: 'DETAIL',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-27 12:16:53',
                executedAt: '2020-07-27 05:11:23',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'ucz1ah43ggvlxopq1atkdgmzxzmctrxq5jvmvj774bk54e2y0q',
                version: 'z8l11t9y25pe1mkfqfxy',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'yda32mbm1q1bj702ti63',
                type: 'DETAIL',
                
                monitoringEndAt: '2020-07-27 02:47:26',
                executedAt: '2020-07-27 04:17:30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'isrqlc4jg7pejjbts0gwu2d0p5v848rispnys09wptme7e8lpb',
                version: 'pk7erwt24x2v4kugp5wn',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'kyu4unb6lc73n9ai9za6',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-26 20:04:02',
                monitoringEndAt: null,
                executedAt: '2020-07-27 03:25:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'kjxxaw1xkiam9y4txu620ko9aaqf5pe9jruvz01hptw73j6xpf',
                version: '9bxyej55lwz1stlsjmqr',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: '7z63h2pz8eegmasc9sav',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-27 00:22:59',
                
                executedAt: '2020-07-26 17:44:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'mus0jkcq19zb8u7gudzo2mbufzoysef95zm5f3l49xnd3fv311',
                version: 's48jdh5hlggvmbzyd6vx',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'vs2j2b305244jslh9ptw',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-27 06:58:56',
                monitoringEndAt: '2020-07-26 18:58:37',
                executedAt: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: '2okaq4tp4clefnjlovjj3xjqcgi121lamfg87merh657pfj37q',
                version: '6jut1ul4p556egnnj7ou',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'jktkell40emtnih2jebk',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-27 03:58:34',
                monitoringEndAt: '2020-07-27 09:15:57',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'uz9ljb08v85q0jpozasps7hgu3nn533jwj6qj',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'okq1wifcod42zhgs68m6az9q2e2vrp001jtpdj9p1jdom7kevd',
                version: 'cxugjygk9g8z5u2qw7fl',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'cgg9u3osnz4sz93zup44',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-27 09:17:35',
                monitoringEndAt: '2020-07-26 18:13:26',
                executedAt: '2020-07-27 00:27:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: 'bpdjilv572m9fxj1dxxlpvpwjbpopovje5byk',
                tenantCode: 'e9jx7mdrmcpass21sbimn63pi36ovs3pwdxvypwzlb62ldzijr',
                version: 'ohv7qxzxqc942fj7jlwc',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'yg4lp2jlkxjbk2m9752s',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-27 16:39:33',
                monitoringEndAt: '2020-07-27 01:23:16',
                executedAt: '2020-07-27 16:15:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 's8rj39chltx9ak509co7dk327uove80qjlqsxg6crfc9xi5k3r',
                version: 'ukiapelux74ssox98f7i',
                systemId: 'wimfb117cw9es9j79k6na6eotrvhgulqxd52z',
                systemName: 'bckmrt9ndaj6wly9yveq',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-26 19:19:14',
                monitoringEndAt: '2020-07-27 10:19:03',
                executedAt: '2020-07-27 11:02:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'bd1arlbmcnhli0i3sfie4huvrq2sud04crv2ww8xkvzmn1exjck',
                version: 'tw171r6lazd3fdlg134p',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'buc3qyp675aq088fc6e1',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-27 13:09:58',
                monitoringEndAt: '2020-07-26 23:04:30',
                executedAt: '2020-07-26 20:34:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'ygy8rh0mrufgdrwjry8o9v57yd703jismor0d29sxc3sdt43gp',
                version: '1eoqxhod64gz6d0ky0s6u',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'pw15hzlal9rqnou7ip2j',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-27 03:20:05',
                monitoringEndAt: '2020-07-26 23:27:11',
                executedAt: '2020-07-27 03:45:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'v9tsb6vqrve3z1m0vnyr856nqp1y9r0a1us321pjyeqc2ljpl8',
                version: 'eqrapj2lv34inu8lqpu0',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: '9exna2gqyillqce1zb8vn',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-27 07:22:14',
                monitoringEndAt: '2020-07-26 23:00:13',
                executedAt: '2020-07-27 00:53:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName is too large, has a maximum length of 20');
            });
    });
    

    

    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'kxwqlwyk01e26oi15vi31zg8esj57bho4w8mel2n3xzinotjji',
                version: 'eb70bptgm1y13jrd3wms',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'hg4pce7jzcciqn41mbzx',
                type: 'XXXX',
                monitoringStartAt: '2020-07-27 08:49:58',
                monitoringEndAt: '2020-07-27 14:20:03',
                executedAt: '2020-07-27 09:32:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'zyemzl4xeck1iw3wo61iptq33dmejl1enj1i7p6g4ss2uhwhgi',
                version: 'uf7vic3yu5j4tpu6xo3k',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'zez9kzscfksbnjgbxvr0',
                type: 'SUMMARY',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-27 11:55:38',
                executedAt: '2020-07-26 23:39:32',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: '9yp4xb4a4llz7h7gkkisktitm5fjk1qkyxojydfmc37nc0ee1i',
                version: 'y1oylbx6pvwb2jrxgzo7',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'uwlzzorno04wn4l0vynh',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-26 20:35:39',
                monitoringEndAt: 'XXXXXXXX',
                executedAt: '2020-07-26 18:37:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: '56055rugsad6qhhogxsbbuli6xlbrf84p94envi47nfg8q5oxr',
                version: '7sx3ebwx1a0cp8lzttjw',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: '0cb36hpuq3fgt4spzthl',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-27 13:37:40',
                monitoringEndAt: '2020-07-27 06:12:31',
                executedAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: '3cm7akj53cq9ozose5w2otfbxhts2kkjk8g16k9yrhrt549hqd',
                version: 'z6mfksxywwz377pqp350',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'f3azjbzo7no5b7e48i4u',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-26 22:57:12',
                monitoringEndAt: '2020-07-27 14:51:10',
                executedAt: '2020-07-27 13:00:22',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/executions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/executions/paginate')
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

    test(`/REST:GET bplus-it-sappi/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution')
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

    test(`/REST:GET bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6'));
    });

    test(`/REST:GET bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/ac34d5a2-d81d-4df8-83cd-c8a18286bdf6')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6'));
    });

    test(`/REST:GET bplus-it-sappi/executions`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/executions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '06059924-12df-4f4b-8c54-9c19223e3d04',
                tenantId: '9890280f-0ded-4d5a-84d3-ebb12fec2c16',
                tenantCode: 'oivbwonqkre358s0qn80c5ioq0padhef6tzkdb00hz97y8vsp3',
                version: 'nod3e50wauf6evikxvsv',
                systemId: 'b55f5295-faea-4db0-b05a-bb31f76489f3',
                systemName: 'xm2og7j21w9q7blg1y2q',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-26 20:21:34',
                monitoringEndAt: '2020-07-27 05:33:05',
                executedAt: '2020-07-27 10:22:30',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                tenantCode: 'euxl4qlya0u2zmwjgynhki351imw4iq1pevmj1ryn3n0owqfwm',
                version: 'm2jircqio88tr4pud452',
                systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                systemName: 'vwkzur1mf0ih8oh7w7rl',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-27 03:09:15',
                monitoringEndAt: '2020-07-27 11:37:40',
                executedAt: '2020-07-27 05:56:35',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6'));
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/ac34d5a2-d81d-4df8-83cd-c8a18286bdf6')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateExecution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateExecutionInput!)
                    {
                        bplusItSappiCreateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
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

    test(`/GraphQL bplusItSappiCreateExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateExecutionInput!)
                    {
                        bplusItSappiCreateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'f3870334-bc27-417f-9af0-6dbc526d1203',
                        tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                        tenantCode: 'l1gful5tl066mb4y0msazkkrwu15pcnu1g0qrops2x2kgumrs4',
                        version: 'ub9br575pcs670iktk9l',
                        systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                        systemName: 't9s3loduokff5x9ogsvy',
                        type: 'SUMMARY',
                        monitoringStartAt: '2020-07-27 13:25:39',
                        monitoringEndAt: '2020-07-27 16:11:33',
                        executedAt: '2020-07-27 03:40:29',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', 'f3870334-bc27-417f-9af0-6dbc526d1203');
            });
    });

    test(`/GraphQL bplusItSappiPaginateExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateExecutions (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateExecutions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateExecutions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateExecutions.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindExecution (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
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

    test(`/GraphQL bplusItSappiFindExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindExecution (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
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
                            value   : 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('ac34d5a2-d81d-4df8-83cd-c8a18286bdf6');
            });
    });

    test(`/GraphQL bplusItSappiFindExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
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

    test(`/GraphQL bplusItSappiFindExecutionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('ac34d5a2-d81d-4df8-83cd-c8a18286bdf6');
            });
    });

    test(`/GraphQL bplusItSappiGetExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetExecutions (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetExecutions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateExecutionInput!)
                    {
                        bplusItSappiUpdateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '26488db2-32ab-4132-a1c6-b6dc185f6351',
                        tenantId: 'b45b13be-2573-49d6-a930-af66abb8579c',
                        tenantCode: 'u2h6368e5zfyfc5zfx9dxj0nt73cjtnm506rtf4o60hytum8mv',
                        version: '1bgp1uggvqonrtcc07gf',
                        systemId: '507992dd-e3f2-4161-bac6-dcb394942ec8',
                        systemName: 'ootltjdugbtdnkl9hef4',
                        type: 'SUMMARY',
                        monitoringStartAt: '2020-07-27 15:56:59',
                        monitoringEndAt: '2020-07-26 22:39:47',
                        executedAt: '2020-07-27 06:45:27',
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

    test(`/GraphQL bplusItSappiUpdateExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateExecutionInput!)
                    {
                        bplusItSappiUpdateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6',
                        tenantId: '6fdccd80-3a60-423f-b172-be145ef75423',
                        tenantCode: 't7fh3vcp7fc8urhlq9c1j5m37yupbcrluip06ozzyyknllfzjf',
                        version: '8tzkfa0ecci9dgjrnefb',
                        systemId: '0e8502fb-f75c-481a-abdb-3138fc066c1d',
                        systemName: 'bueyvah1xqd3d07dew3l',
                        type: 'DETAIL',
                        monitoringStartAt: '2020-07-26 22:06:53',
                        monitoringEndAt: '2020-07-26 23:06:04',
                        executedAt: '2020-07-27 04:40:47',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('ac34d5a2-d81d-4df8-83cd-c8a18286bdf6');
            });
    });

    test(`/GraphQL bplusItSappiDeleteExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
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

    test(`/GraphQL bplusItSappiDeleteExecutionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            systemId
                            systemName
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ac34d5a2-d81d-4df8-83cd-c8a18286bdf6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('ac34d5a2-d81d-4df8-83cd-c8a18286bdf6');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});