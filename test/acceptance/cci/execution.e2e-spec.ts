import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IExecutionRepository } from '@hades/cci/execution/domain/execution.repository';
import { MockExecutionRepository } from '@hades/cci/execution/infrastructure/mock/mock-execution.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
            .overrideProvider(IExecutionRepository)
            .useClass(MockExecutionRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockExecutionRepository>module.get<IExecutionRepository>(IExecutionRepository);

        await app.init();
    });

    test(`/REST:POST cci/execution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 't2dhpxfex6jrg6rqdcqzrjh39nsbpzg30fyhiazqobh8fy63t8',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: '50yexeya7bpm6n90ns2o',
                version: '59909pbzvnb5mylkwvac',
                type: 'DETAIL',
                executedAt: '2020-11-04 05:48:20',
                monitoringStartAt: '2020-11-03 14:32:21',
                monitoringEndAt: '2020-11-04 07:38:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'spd10ur1jjruyclpfwu3yh0adqfefjimbo0osowjtpqqau27nl',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: '6vewlvtz3o21pzzoinrf',
                version: '2vwhzvphlj08rr5jz98s',
                type: 'SUMMARY',
                executedAt: '2020-11-03 19:01:45',
                monitoringStartAt: '2020-11-03 15:22:47',
                monitoringEndAt: '2020-11-04 05:55:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: null,
                tenantCode: '9b3fzxx1yottn5k3zxx27ekxbzj02pwbay75v6by4pzs9eu5gl',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: 's9j6k8omcp0ylqm9xld7',
                version: 'l703ymqkf3o9inqtntt9',
                type: 'DETAIL',
                executedAt: '2020-11-04 09:03:17',
                monitoringStartAt: '2020-11-03 17:29:46',
                monitoringEndAt: '2020-11-04 04:40:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                
                tenantCode: '2u6wpyk0r05r3mob7mg8igru6tm8ooq5yp4h5jlwkui4evpf6c',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: '5i152n3n6kq3sboir1w2',
                version: 'x7m22415cimi2v5h1has',
                type: 'SUMMARY',
                executedAt: '2020-11-04 08:41:28',
                monitoringStartAt: '2020-11-03 17:10:01',
                monitoringEndAt: '2020-11-04 03:01:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: null,
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: 'uv2mkaazfvat1w4m3vmh',
                version: 'p11h8go0i2zb5rjeq9zw',
                type: 'SUMMARY',
                executedAt: '2020-11-03 14:44:14',
                monitoringStartAt: '2020-11-04 01:02:25',
                monitoringEndAt: '2020-11-03 21:23:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: 'knc8vkyumdzvslaqffx6',
                version: 'fpwn1phdleg9pa0wng0y',
                type: 'DETAIL',
                executedAt: '2020-11-03 19:32:42',
                monitoringStartAt: '2020-11-03 21:55:09',
                monitoringEndAt: '2020-11-04 08:18:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'ib7dyv77ligrizayoov8vihwbkqyr3q9oo7wbyu9h7qp4rm380',
                systemId: null,
                systemName: 'jyh2v2musj9x9f7aj5ge',
                version: 'fs4eywh8wbsnbz1j1m84',
                type: 'SUMMARY',
                executedAt: '2020-11-04 03:38:42',
                monitoringStartAt: '2020-11-03 14:30:48',
                monitoringEndAt: '2020-11-04 01:07:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'ijhxxq9sgcmb9b9qnsfd5a89ehw2wni6ezncek8e7xs7g2otbm',
                
                systemName: 'anqp40w8f9e9tim2ppop',
                version: 'wjr8g4ea02abbxjvkxgl',
                type: 'SUMMARY',
                executedAt: '2020-11-04 12:24:26',
                monitoringStartAt: '2020-11-03 18:58:37',
                monitoringEndAt: '2020-11-04 02:38:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'pg8ntn5dhheokls7v8shxgluja4czs9shvppsp3f2p83opavn5',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: null,
                version: '9nwnzkgtvmylrhcbs048',
                type: 'DETAIL',
                executedAt: '2020-11-04 13:42:33',
                monitoringStartAt: '2020-11-03 22:08:49',
                monitoringEndAt: '2020-11-04 10:12:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'pqxfqfxctqh0lyva1dgwbi1xwy04meq1sobidjfjnelk0beoay',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                
                version: 'wl9b6zh4j4s2q2cl7foq',
                type: 'DETAIL',
                executedAt: '2020-11-03 13:55:47',
                monitoringStartAt: '2020-11-04 07:01:33',
                monitoringEndAt: '2020-11-04 06:15:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'zj6tw3nhxiwj6rcpjjlmj2p94qqja50fmt4nlw18jhbhof5tiy',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: '1rivdcvl3wh2rxiusv61',
                version: null,
                type: 'SUMMARY',
                executedAt: '2020-11-04 13:09:27',
                monitoringStartAt: '2020-11-03 20:50:55',
                monitoringEndAt: '2020-11-04 00:40:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'fetiiwf6cq2jv8mpb9rxw6g622lneyr6tqm98up9qaf1yg7ycu',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: '2wnn67yrq3tk3hqpykyk',
                
                type: 'SUMMARY',
                executedAt: '2020-11-04 05:26:41',
                monitoringStartAt: '2020-11-04 03:00:21',
                monitoringEndAt: '2020-11-03 19:32:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'kgj68yth60sgc8zb2jura6nuf3mu6xoi2rxorh8rwaa942gyzk',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: '4zbkj5m1u8vfatpuu0yv',
                version: '5tu5bhxg1n2mf6djakv1',
                type: null,
                executedAt: '2020-11-03 22:32:32',
                monitoringStartAt: '2020-11-03 17:57:05',
                monitoringEndAt: '2020-11-04 02:42:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'rzzdsz931ttucbcjysijgcfw2usqhepu1v1r4ppmaen8jegxth',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: 'pdu94nx24wcjdf1e3lwx',
                version: 't3nsn14x9t2tsvj97qtf',
                
                executedAt: '2020-11-03 23:17:43',
                monitoringStartAt: '2020-11-03 17:31:47',
                monitoringEndAt: '2020-11-04 11:35:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'qwqna3b36oys7lva3m3uwklf4ki0xb0khq83ogww1raakd251h',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: '62qlhxvrfrs5lk9ks7as',
                version: 'ct3wwqgwio7dg58qo613',
                type: 'DETAIL',
                executedAt: null,
                monitoringStartAt: '2020-11-03 19:23:50',
                monitoringEndAt: '2020-11-03 21:51:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'rcu9hxe72aw85gk01bxznssviskw8cez58cryqpndvlyzeg0ci',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: 'xn8iygu5qp68jdfo7gbo',
                version: 'qditncznz3u8easjnhwb',
                type: 'DETAIL',
                
                monitoringStartAt: '2020-11-03 18:32:12',
                monitoringEndAt: '2020-11-04 02:39:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'z5wp5oiaqclglzexrtu4rxue5lovs4y334te48yznjfjxhdxqg',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: 'nvy4zcr8yg0jn7j9pn5i',
                version: '42pokbj6z8f5gx6irxr5',
                type: 'SUMMARY',
                executedAt: '2020-11-04 12:55:34',
                monitoringStartAt: null,
                monitoringEndAt: '2020-11-04 02:50:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: '5q0z68tky47nesng3le6oxvot4av0mua5b93mu0meivxocgj7q',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: '47i1fowk5r9t4pmutlfb',
                version: 'trvju59y4mnmk6n1htdm',
                type: 'SUMMARY',
                executedAt: '2020-11-04 12:11:00',
                
                monitoringEndAt: '2020-11-04 08:24:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'py9ssity9vyeycs5pbot53liiicqq6sahuq9yjmkio0os22i9e',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: '8gmdinco737h5q5p8fhn',
                version: 'f84wsci6olt36i7vyled',
                type: 'DETAIL',
                executedAt: '2020-11-03 21:05:08',
                monitoringStartAt: '2020-11-04 13:37:17',
                monitoringEndAt: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: '3w9wsn8129lza9z3pdoayt85yo4djaijwmy8c9y6jzqmtretr0',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: 'q1uqv9hs6acene85l505',
                version: 'tohqw6ftoxhvkapyntm7',
                type: 'DETAIL',
                executedAt: '2020-11-03 17:20:33',
                monitoringStartAt: '2020-11-03 14:53:07',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'kt1xp9qi3l515ed0kzz65g7h4qh1m3p24c35h',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'gegt1hg1rvlfcyeprx08zosa5wgpextyjl1oarcmstbqvz2267',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: 'y05dbqtt5zexwu4g4p6s',
                version: 'uu3y3kmu801it0r1vseq',
                type: 'SUMMARY',
                executedAt: '2020-11-03 19:39:50',
                monitoringStartAt: '2020-11-03 20:20:20',
                monitoringEndAt: '2020-11-04 04:35:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: 'j59gnmt42bwssoqtzebhw22cc9iahyyt56swr',
                tenantCode: 'y5j1wii0lw6jfnxjiky15y9wxda40le3mprp5p05qtv3mu0cvo',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: 'xjfe5xh0orsm3gmhacdw',
                version: '3icr5am5rc1xh3mn3sm0',
                type: 'DETAIL',
                executedAt: '2020-11-04 03:18:47',
                monitoringStartAt: '2020-11-03 18:59:02',
                monitoringEndAt: '2020-11-04 08:42:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: '63bvppkwh8w3rshlsw4gs8n3pytd1qeu2tpfaty2dld2we6iwp',
                systemId: 'p597vs4pclek10spq8s5vy40h7a47mrplp2n3',
                systemName: '0trc4pk7es1fjqp5tm8i',
                version: 'kcdc72sdlqo046nnc0bd',
                type: 'SUMMARY',
                executedAt: '2020-11-03 23:22:11',
                monitoringStartAt: '2020-11-03 18:23:12',
                monitoringEndAt: '2020-11-03 19:29:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'qlkrqgmd4rrn0279oqzppjve8zopag8twz7iau4c4zniku3ckcl',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: 'llapoiwd2e7hd74ff9lg',
                version: '9nhvdael3qaix2gc6r1e',
                type: 'DETAIL',
                executedAt: '2020-11-04 00:43:44',
                monitoringStartAt: '2020-11-03 22:17:35',
                monitoringEndAt: '2020-11-03 18:55:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'ql7epd4329efn9hfkzqop6gqio453wb5a3r3onovzo21rousw4',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: 'ucs9hsk8peddxcxydoe5u',
                version: 'i8qnzemcoq9nh81ugvc6',
                type: 'DETAIL',
                executedAt: '2020-11-04 03:33:33',
                monitoringStartAt: '2020-11-03 19:59:43',
                monitoringEndAt: '2020-11-04 03:16:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'ryb93pc8luoioc9d38ovu1trg61eq6bjzbyze0safy75gihl1o',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: '4odkj5rx2dp9ixo89l3x',
                version: '3p9otjhlee85n5r0pf2u4',
                type: 'DETAIL',
                executedAt: '2020-11-04 13:04:58',
                monitoringStartAt: '2020-11-03 14:11:12',
                monitoringEndAt: '2020-11-04 12:34:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion is too large, has a maximum length of 20');
            });
    });
    

    

    

    

    

    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: '6npy1brdjlpb068b5ffc5tl5mbbev042wjfdlj8aruonqsdjf0',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: 'kfu7fzfn4m9c6qzh0qyj',
                version: 'cjziblslafn8w4ezdqrl',
                type: 'XXXX',
                executedAt: '2020-11-04 09:24:37',
                monitoringStartAt: '2020-11-04 11:19:52',
                monitoringEndAt: '2020-11-03 15:26:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'iocj4adg7cl0cp3cz0p1ro6leuw2xiy0ghcv78pi0rufw1ruof',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: 'n6ebgwqc8lcrws0huweq',
                version: 'hmn5ctwkmlnds1i8kq0h',
                type: 'SUMMARY',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-11-04 10:42:09',
                monitoringEndAt: '2020-11-04 11:49:24',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: '1r8wpruf9aqjnf0chx1qm4nw9y4csv8zp673jyxd4kyeqcfn3e',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: 'jva0b9vg2rqoybhljb6m',
                version: 'xo4tmyyfq3vkze747rdo',
                type: 'SUMMARY',
                executedAt: '2020-11-04 01:24:59',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-11-03 19:51:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'rxti5p9n20iyuutnv8m8zzj7yn4hne13ncbxeom8mo4foaf0cu',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: 'xofdj45siu4exixn343p',
                version: 'wqq7oalgq4y8r379781b',
                type: 'DETAIL',
                executedAt: '2020-11-03 18:23:18',
                monitoringStartAt: '2020-11-04 01:59:09',
                monitoringEndAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: '761l5knndix7efa6ppua9pb00eo8pwjx6xyjs9q91ljfxooyfk',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: 'ih5tlz1qaeu76qjb1etr',
                version: 'fsgdmxls2briyy403pvr',
                type: 'SUMMARY',
                executedAt: '2020-11-04 09:41:14',
                monitoringStartAt: '2020-11-03 22:36:40',
                monitoringEndAt: '2020-11-04 12:26:10',
            })
            .expect(201);
    });

    test(`/REST:GET cci/executions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/executions/paginate')
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

    test(`/REST:GET cci/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '76fc03bd-6a68-4877-a48c-2f982de207ea'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2a446f97-e00a-4c2b-ae85-581f7e701bd9'));
    });

    test(`/REST:GET cci/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/8d924504-6164-46d2-b42a-c396d975d80a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/2a446f97-e00a-4c2b-ae85-581f7e701bd9')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2a446f97-e00a-4c2b-ae85-581f7e701bd9'));
    });

    test(`/REST:GET cci/executions`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/executions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '3c8c62f3-60d1-4584-b738-333ba0947138',
                tenantId: 'c9f85521-af67-42e5-b6f1-b6e09bab09e8',
                tenantCode: '5ek03r3f4f32sy7kmkihh8cmbnvmukn8n80c5rrpmniduuorg5',
                systemId: 'aadb621b-0777-4ce9-b0c0-4454fcd97454',
                systemName: 'vpdnktm5f2qppcq6wqox',
                version: 'jv20lkghps3i26yy1y1u',
                type: 'DETAIL',
                executedAt: '2020-11-03 22:38:07',
                monitoringStartAt: '2020-11-03 19:20:21',
                monitoringEndAt: '2020-11-04 11:17:11',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                tenantCode: 'cqf8m6v1g2cm8ko36sqp2w2i84pottajwkhjajoz1biau73rv7',
                systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                systemName: '6sxiervlqzu725cfh0ih',
                version: 'hwfry4uipnwkh4qpmkyk',
                type: 'SUMMARY',
                executedAt: '2020-11-04 05:33:26',
                monitoringStartAt: '2020-11-04 04:05:55',
                monitoringEndAt: '2020-11-04 03:58:25',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2a446f97-e00a-4c2b-ae85-581f7e701bd9'));
    });

    test(`/REST:DELETE cci/execution/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/ca4dcac3-cf49-443b-af70-11ab6b54d89a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/execution/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/2a446f97-e00a-4c2b-ae85-581f7e701bd9')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateExecution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateExecutionInput!)
                    {
                        cciCreateExecution (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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

    test(`/GraphQL cciCreateExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateExecutionInput!)
                    {
                        cciCreateExecution (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'eeed5be3-7a76-4395-8331-015ec09991ef',
                        tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                        tenantCode: 'awbkd0vihydbezeeiyb75mwj1k60sxi4bmnskcsq0s4sraz1jh',
                        systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                        systemName: '4nky9s1hv238xft35ksm',
                        version: 'x861j536egbbkqki4f0o',
                        type: 'SUMMARY',
                        executedAt: '2020-11-03 14:58:21',
                        monitoringStartAt: '2020-11-03 13:57:20',
                        monitoringEndAt: '2020-11-04 08:27:36',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateExecution).toHaveProperty('id', 'eeed5be3-7a76-4395-8331-015ec09991ef');
            });
    });

    test(`/GraphQL cciPaginateExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateExecutions (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateExecutions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateExecutions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateExecutions.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindExecution (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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
                            id: '55bfb5e1-8f52-4c19-b97b-626c8ecc8d93'
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

    test(`/GraphQL cciFindExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindExecution (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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
                            id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecution.id).toStrictEqual('2a446f97-e00a-4c2b-ae85-581f7e701bd9');
            });
    });

    test(`/GraphQL cciFindExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindExecutionById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '29fc2bd6-7ff3-49cc-ad90-bf3483d8fb2b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindExecutionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindExecutionById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecutionById.id).toStrictEqual('2a446f97-e00a-4c2b-ae85-581f7e701bd9');
            });
    });

    test(`/GraphQL cciGetExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetExecutions (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetExecutions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateExecutionInput!)
                    {
                        cciUpdateExecution (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '8f8870ac-f45e-42d3-87d4-140c2e8b263e',
                        tenantId: '2d6b6170-36dc-49a0-affc-633435cd1def',
                        tenantCode: 'e9u9wnvx8isogh4mslupsuf67vuvuqdrtwqo6odkdt7vulbljm',
                        systemId: '3999a77e-df93-4ae4-860b-8bace2ee4bfb',
                        systemName: 'w6y7i5gqrmoe1gqrkerg',
                        version: 'c6jvo6vds6l8e7wxiixh',
                        type: 'DETAIL',
                        executedAt: '2020-11-03 15:05:37',
                        monitoringStartAt: '2020-11-03 20:19:38',
                        monitoringEndAt: '2020-11-04 00:15:00',
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

    test(`/GraphQL cciUpdateExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateExecutionInput!)
                    {
                        cciUpdateExecution (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9',
                        tenantId: '1bdcf77b-b0ed-48c6-9ad3-cff695866be5',
                        tenantCode: '0duhd8yrvxbbz6sa5lu0mb85y1xo7jucw1zahffxgy9mtxrr68',
                        systemId: 'a1be7d3b-7211-4b91-9052-08c9751bcd46',
                        systemName: 'zljaujopb26kuvvrdk1i',
                        version: 'fhvjdouqe6d40j8r1inz',
                        type: 'DETAIL',
                        executedAt: '2020-11-04 10:44:16',
                        monitoringStartAt: '2020-11-03 18:58:45',
                        monitoringEndAt: '2020-11-04 13:08:04',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateExecution.id).toStrictEqual('2a446f97-e00a-4c2b-ae85-581f7e701bd9');
            });
    });

    test(`/GraphQL cciDeleteExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteExecutionById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8ac092b9-debe-49ff-9889-36ea935a3dcb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteExecutionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteExecutionById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2a446f97-e00a-4c2b-ae85-581f7e701bd9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteExecutionById.id).toStrictEqual('2a446f97-e00a-4c2b-ae85-581f7e701bd9');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});