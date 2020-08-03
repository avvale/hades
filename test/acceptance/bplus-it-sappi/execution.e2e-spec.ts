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
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: '067hi2w7ynbi1ma4mlqbqaiuce1n93je8jwci1gaql7eehyq6r',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: '493u09787i26zx5jgqln',
                version: '95r9pwn2v5xgoac57j4p',
                type: 'SUMMARY',
                executedAt: '2020-08-02 20:09:49',
                monitoringStartAt: '2020-08-03 09:20:48',
                monitoringEndAt: '2020-08-03 01:19:00',
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
                
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: 'jluvyzv6solwg7wfon8mwnek44abvnrnkf3ounwz02zboz09od',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: 'vd17rcai4d5qotwvw42r',
                version: 'inkx8vspxhpd3xwzwb6o',
                type: 'DETAIL',
                executedAt: '2020-08-03 10:55:47',
                monitoringStartAt: '2020-08-02 22:53:42',
                monitoringEndAt: '2020-08-03 06:56:13',
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
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: null,
                tenantCode: 'pue1sx8iwj6ao0f3rm174hkutg1hrtpa0roc4lwsgg47kw7x30',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: 'a90lbslcmt8gcp9r98zp',
                version: '3q88ciw0jzt7vd56q8qh',
                type: 'DETAIL',
                executedAt: '2020-08-03 07:29:51',
                monitoringStartAt: '2020-08-03 05:34:25',
                monitoringEndAt: '2020-08-02 21:44:37',
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
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                
                tenantCode: 'ea8jmhzcl5yl35z1powhsb3r1ij3vif1udgekqsw8o92ktdvor',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: 'h261y9p3sx95jdq9jgd9',
                version: '4se58lp5grxpg4j1s5zr',
                type: 'SUMMARY',
                executedAt: '2020-08-02 23:07:11',
                monitoringStartAt: '2020-08-03 17:24:46',
                monitoringEndAt: '2020-08-03 02:03:59',
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
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: null,
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: '7mre7scdh1lt2ttipzck',
                version: 'dip9nqng8xemaqd27u5o',
                type: 'DETAIL',
                executedAt: '2020-08-02 20:26:49',
                monitoringStartAt: '2020-08-03 08:23:18',
                monitoringEndAt: '2020-08-03 16:46:54',
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
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: 'yca7mdlxxltr0xu75vd1',
                version: 'oxwt6kdrzkpajwgxtt98',
                type: 'SUMMARY',
                executedAt: '2020-08-03 07:14:17',
                monitoringStartAt: '2020-08-03 08:53:18',
                monitoringEndAt: '2020-08-03 05:55:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: '64ydfc3o87tgl9l0iflo433tv4rcw7duqq11ajvxmxvretti0b',
                systemId: null,
                systemName: 'efnxdejoip9arijlvj5f',
                version: 'pl1tcac7dusgf8no4qwv',
                type: 'SUMMARY',
                executedAt: '2020-08-03 11:04:13',
                monitoringStartAt: '2020-08-02 23:00:56',
                monitoringEndAt: '2020-08-03 06:03:04',
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
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: 'qyc6f334b34v1ms4osre9fm864jnu5lxk8nkrctwns2v6pd52n',
                
                systemName: 'ru9r3h9s7sf5zpvopne3',
                version: 'en04hdmxk038mey0aarg',
                type: 'DETAIL',
                executedAt: '2020-08-03 17:48:03',
                monitoringStartAt: '2020-08-03 14:41:25',
                monitoringEndAt: '2020-08-03 05:15:59',
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
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: 'jusbmou03vzpy55e887rgspyemdyx311ssbzj2z4st7jgdkjld',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: null,
                version: 'lfoj48j8pn94afdevhm7',
                type: 'SUMMARY',
                executedAt: '2020-08-03 16:14:28',
                monitoringStartAt: '2020-08-03 13:46:12',
                monitoringEndAt: '2020-08-02 23:19:20',
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
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: 'swqobjtahpf2yhq11bdzpjtmrc5732abqg3xpky0clanqntus2',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                
                version: '1mgdueu1z6o2emsm65f3',
                type: 'SUMMARY',
                executedAt: '2020-08-02 20:00:11',
                monitoringStartAt: '2020-08-03 04:44:44',
                monitoringEndAt: '2020-08-03 11:01:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: 'sl72z8kh9rwfd3p8v5dig3xyrsslpu98a2m71ja76h3yts6nyb',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: '4q2hnenchravb9rsnyjn',
                version: null,
                type: 'DETAIL',
                executedAt: '2020-08-03 14:43:11',
                monitoringStartAt: '2020-08-02 20:19:25',
                monitoringEndAt: '2020-08-03 13:25:40',
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
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: 'uislciz0474qfj0zbw3csqlwt1is0v66rlkqqh9sxvjdhfs07i',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: 'gdpjukkj2abs9vfxrl9w',
                
                type: 'DETAIL',
                executedAt: '2020-08-03 11:44:51',
                monitoringStartAt: '2020-08-03 10:56:04',
                monitoringEndAt: '2020-08-03 01:23:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: '6jbm8yxcaxdyc9e2awwkhmpgjlg975eqmapyd3it18dumxn1fg',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: 'mcvcatv1hwgtfnoqr3mp',
                version: 'dq8ua0uqs8m4cpgwsjv2',
                type: null,
                executedAt: '2020-08-03 00:04:43',
                monitoringStartAt: '2020-08-03 17:20:58',
                monitoringEndAt: '2020-08-03 08:43:48',
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
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: '5dx4g7pd6n8mo5h8kgznvy4ufvv8qw4qgwcvys66bqg3kxl95z',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: '8qloelye8zrtlinokuys',
                version: 'gh9hn2vdr12tqbffkfue',
                
                executedAt: '2020-08-03 11:16:51',
                monitoringStartAt: '2020-08-03 01:18:49',
                monitoringEndAt: '2020-08-03 13:57:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: '2st2qadcxctqz64y0g2kvoqic9yx1d1vv15vdlhgb6c6xsb9zk',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: '12sfucplww1y4zpmfxqc',
                version: 'o8mt54spyr98y6v8r2ht',
                type: 'SUMMARY',
                executedAt: null,
                monitoringStartAt: '2020-08-03 17:51:03',
                monitoringEndAt: '2020-08-03 06:48:04',
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
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: 'fasnxvy1s1f69m1lpoms5m6ph4zj7d9lmcbi1e4knrgd4xs393',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: 'uqoihc6ys0n9nsnw123s',
                version: 'es1pkmodo2722ame5zyk',
                type: 'DETAIL',
                
                monitoringStartAt: '2020-08-03 14:51:39',
                monitoringEndAt: '2020-08-03 09:44:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: '1jc61ccfvyzpklltr1bj1823oz44nxd6k60tfuye7hj81fxbp1',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: 'lqroblm9e0t1tg0810dk',
                version: 'x8yg51bfuh48z99sk1sk',
                type: 'DETAIL',
                executedAt: '2020-08-03 10:11:43',
                monitoringStartAt: null,
                monitoringEndAt: '2020-08-02 21:54:43',
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
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: 'az4fztoxc1i7laux53yl35t5t2rcnad9tm8jxx8yi03j0zez0s',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: '8u5i6ncp5v0ws9rwuoe7',
                version: 'w184h31gw7hmvjb03l9m',
                type: 'DETAIL',
                executedAt: '2020-08-03 04:32:19',
                
                monitoringEndAt: '2020-08-03 06:33:24',
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
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: 'nwxtcfkwfldo2r34heb1gwf0037tfy2vtlck8xqr7qsr5f36fw',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: 'krip680l2dm0rq9ce7a7',
                version: 'b4sttmnnlkv70viffb3f',
                type: 'DETAIL',
                executedAt: '2020-08-03 10:43:31',
                monitoringStartAt: '2020-08-03 06:00:46',
                monitoringEndAt: null,
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
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: 'vcxqfj4ckxf8ti71ohe5rrazodd37e7c8cp172h9v6571q5lyo',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: 'r9e0s1rbrfigka98plbz',
                version: 'ptm1dn3uaur95kehuz0k',
                type: 'DETAIL',
                executedAt: '2020-08-03 16:08:26',
                monitoringStartAt: '2020-08-03 12:00:51',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '9hv5jf3zphasc1o62mg5rbwfueu235nxbboe1',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: '7c3uo2yfq8ln2w5dz2z28njpsob9xppzun01l6vvqot5msjrmv',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: 'fsak4rva515uvlmnvp3o',
                version: 'lkir3pmj7fshyfmae4vo',
                type: 'DETAIL',
                executedAt: '2020-08-03 05:30:31',
                monitoringStartAt: '2020-08-03 06:20:48',
                monitoringEndAt: '2020-08-03 01:43:31',
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
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: 'ddhypu2pjapwfl053py8iq2eag5ld2lubka7e',
                tenantCode: 'mmx8fotiolsfw9xi2rfpa7ul7kws9x3c2ao1bvotxjtubbg6wk',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: 'fziuitu6x0s7uqquuhkh',
                version: 'cheanuq3i1616cbg5qif',
                type: 'SUMMARY',
                executedAt: '2020-08-03 05:50:52',
                monitoringStartAt: '2020-08-03 11:47:08',
                monitoringEndAt: '2020-08-03 09:03:25',
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
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: 'n8vov21d4pvtb3pss21621wfb6gp6c6o0srz5tvbhi58cswckm',
                systemId: 'we6yh438wkhkqanhynq8fwtkv1k2buzcpxvwt',
                systemName: 'sbqkuu5wlwfu7ti3yc3e',
                version: '6nb50gg2xfrpiftc2zrr',
                type: 'DETAIL',
                executedAt: '2020-08-03 02:32:00',
                monitoringStartAt: '2020-08-02 23:02:33',
                monitoringEndAt: '2020-08-03 12:05:33',
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
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: 't4y18uhamdol96jlsbw5syuysslcuhz9qr1zzmpufaqr2o9557f',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: 'gb9siu1jz12bp4fk1oad',
                version: 'altktj4dius20ya8v4vj',
                type: 'SUMMARY',
                executedAt: '2020-08-03 13:57:36',
                monitoringStartAt: '2020-08-03 07:48:15',
                monitoringEndAt: '2020-08-03 02:31:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: '6ritkd18n83nskxtlt8tpt0g88ga6pya4j72z9yhw0fk2plsug',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: '1abib366gj0hn4zz7rrfh',
                version: 'y01cw2tgjlc8vp237lpc',
                type: 'SUMMARY',
                executedAt: '2020-08-03 11:56:21',
                monitoringStartAt: '2020-08-03 02:58:13',
                monitoringEndAt: '2020-08-03 07:37:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: 'ttya32yt5q6cq3zs8jecf7yclrxqnso4h92p44nwhxiagcw5nv',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: '7vb5dskd3wchrqfx0e6u',
                version: 'f06qmgml1xwlc4utnw3tf',
                type: 'SUMMARY',
                executedAt: '2020-08-03 10:02:29',
                monitoringStartAt: '2020-08-03 12:26:40',
                monitoringEndAt: '2020-08-02 21:18:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion is too large, has a maximum length of 20');
            });
    });
    

    

    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: '9ec69w7ek5n7wno98hp2qz26ny43963a0dgn9balwrfaqgzlpp',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: 'ovut3u5a9tg2je20sglv',
                version: '1a72ck2hmq2oi1nre1pb',
                type: 'XXXX',
                executedAt: '2020-08-03 02:28:08',
                monitoringStartAt: '2020-08-03 07:07:08',
                monitoringEndAt: '2020-08-03 05:39:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: '29tc66c4wmzd4hn0ehcwk749fe6sppe21c2arm7wdx2u3u250h',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: '7da03urkrzwgghmcmi3n',
                version: 'nhnfeezcgs56gysdhfqh',
                type: 'SUMMARY',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-08-03 17:08:39',
                monitoringEndAt: '2020-08-03 03:03:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: '29z85ysgomnz6dv72z0ubfkzyyk1bqtoirvffjjdg9zx1ym5mw',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: '7brzf73t6ejhyq95uy1e',
                version: 'iks7q4inaqq2nsjp8p53',
                type: 'SUMMARY',
                executedAt: '2020-08-03 12:49:09',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-08-02 18:31:28',
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
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: '4ia5hbnsafaazsuurtaytjqsm2d7ss36yghhe8scqv571hrm37',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: '1zopwzkzvnh2wmn0vli9',
                version: 'zao67uzdhd9vm3lrm1kp',
                type: 'DETAIL',
                executedAt: '2020-08-03 16:43:01',
                monitoringStartAt: '2020-08-03 14:34:30',
                monitoringEndAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: 'ffkf28s4d4dv06whez80euenbthue1n5mbhhchxa6b6y0975ue',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: 'q1btxo6dktim1g7u2g2o',
                version: 'nzy0uxnkoaggts9ue793',
                type: 'DETAIL',
                executedAt: '2020-08-03 17:15:13',
                monitoringStartAt: '2020-08-02 20:17:18',
                monitoringEndAt: '2020-08-03 17:32:42',
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
                        value   : '5877fbed-bab9-4bcc-b8ed-f16829d1dcad'
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
                        value   : '6c4b35a8-6315-4b38-bd68-7346d2b383e8'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6c4b35a8-6315-4b38-bd68-7346d2b383e8'));
    });

    test(`/REST:GET bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/6c2761b2-8312-4a1a-9a28-b9927610e5a7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/6c4b35a8-6315-4b38-bd68-7346d2b383e8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6c4b35a8-6315-4b38-bd68-7346d2b383e8'));
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
                
                id: '35208016-6f72-4ccb-88a2-969df8440c9d',
                tenantId: '0223bf8b-8d30-4e5d-a084-f959af315d9f',
                tenantCode: '55nh6otyyhgirmg86yvkusrzg9az5w5buabc0kwauviv2hjsxr',
                systemId: '124d5949-d043-46aa-8220-ed3a8718af5e',
                systemName: 'kkmbuodz2e16uywhk83u',
                version: '9quzf6pkvhptnjd9hdw0',
                type: 'SUMMARY',
                executedAt: '2020-08-02 23:52:37',
                monitoringStartAt: '2020-08-02 18:52:17',
                monitoringEndAt: '2020-08-03 10:31:59',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                tenantCode: 'zmxd4oedi5v2ep6grq69hhrivyb00ke4sfyo1w7jreo5ipbmmv',
                systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                systemName: '0bo53h9318pcyw7njhdv',
                version: 'n6dkelskss86sm55ai8p',
                type: 'DETAIL',
                executedAt: '2020-08-02 22:55:08',
                monitoringStartAt: '2020-08-03 09:55:27',
                monitoringEndAt: '2020-08-03 01:03:52',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6c4b35a8-6315-4b38-bd68-7346d2b383e8'));
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/550f7fb1-4a0c-462c-80b0-20124aba4d0e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/6c4b35a8-6315-4b38-bd68-7346d2b383e8')
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
                            systemId
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
                            systemId
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
                        id: '3b9c4b46-0776-4f38-a974-4f3af56fd1fc',
                        tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                        tenantCode: 'jl1mt19c498r0l56vx85box4eeqesg4sqiz2b8in0vx8rmptvt',
                        systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                        systemName: 'zn276jvsn56durnh2fcc',
                        version: 'qltlpu3myeffxt1mycmq',
                        type: 'SUMMARY',
                        executedAt: '2020-08-03 14:41:12',
                        monitoringStartAt: '2020-08-03 13:19:41',
                        monitoringEndAt: '2020-08-02 20:21:34',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', '3b9c4b46-0776-4f38-a974-4f3af56fd1fc');
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
                            systemId
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '25aad2fa-9b68-4789-b8d2-f4bf28fea33a'
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
                            systemId
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '6c4b35a8-6315-4b38-bd68-7346d2b383e8'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('6c4b35a8-6315-4b38-bd68-7346d2b383e8');
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
                            systemId
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
                    id: '18aee515-222b-4f01-9668-b6233ae81809'
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
                            systemId
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
                    id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('6c4b35a8-6315-4b38-bd68-7346d2b383e8');
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
                            systemId
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
                            systemId
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
                        
                        id: 'c4581497-f527-4e7b-8242-9c404d8228c9',
                        tenantId: '787831b5-0f9e-4f33-9b46-c68f72614e8f',
                        tenantCode: 'yp81xl2c5bopksk9onfsn8ubzlqs0qivtxyt8lcoqq4kqvb8fr',
                        systemId: '1f904c1a-4325-4d9f-936c-86af490e359b',
                        systemName: 'wl3dumxaemi9wuaxt5sn',
                        version: 'gubgvr8265m3cxyhh0rf',
                        type: 'DETAIL',
                        executedAt: '2020-08-03 10:42:08',
                        monitoringStartAt: '2020-08-03 09:17:05',
                        monitoringEndAt: '2020-08-03 17:11:22',
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
                            systemId
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
                        
                        id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8',
                        tenantId: '5fdea104-74c8-4b8b-98b2-7d2abc71511e',
                        tenantCode: 'o49kwn3cfwha9rrl32kpmlprktsrbl8nifmm0sqmpuzhbxxa13',
                        systemId: 'b5b50091-3fb2-45e1-aaa2-2b2a11598ca6',
                        systemName: 'zowi4snrk62g9kistz53',
                        version: 'lh97reeo3we8a8v99np6',
                        type: 'SUMMARY',
                        executedAt: '2020-08-03 13:44:46',
                        monitoringStartAt: '2020-08-03 12:19:52',
                        monitoringEndAt: '2020-08-03 01:04:00',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('6c4b35a8-6315-4b38-bd68-7346d2b383e8');
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
                            systemId
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
                    id: 'a3134d64-3486-4e02-88de-a738f27dc9eb'
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
                            systemId
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
                    id: '6c4b35a8-6315-4b38-bd68-7346d2b383e8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('6c4b35a8-6315-4b38-bd68-7346d2b383e8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});