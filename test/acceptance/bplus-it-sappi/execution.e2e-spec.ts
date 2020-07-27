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
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'u0u1nvnmz14z03f4yrn0ki4hth6qji79kvvq6h7eei1j8e11h9',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: '801d67daizjxl409dc76',
                version: '3cvz2whmyxnxscv7bg7z',
                type: 'DETAIL',
                executedAt: '2020-07-27 08:35:50',
                monitoringStartAt: '2020-07-27 00:56:26',
                monitoringEndAt: '2020-07-27 05:47:32',
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
                
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: '70qxjqjmsyewngzc077rzkd15yxz98s4urxjva7o3dyid667o6',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: '1mu0rn43dmvkdi06t25q',
                version: 'llt0v1j87podkxphf0nj',
                type: 'SUMMARY',
                executedAt: '2020-07-27 23:26:11',
                monitoringStartAt: '2020-07-27 13:48:32',
                monitoringEndAt: '2020-07-27 10:08:14',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: null,
                tenantCode: 'z37to00wla7f7hmvcywxxurd0t6t4shf40nzw7ijfnswzb2tvv',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: '97ytwgmkjg870f6h55dt',
                version: 'xeprksdf2exifw9cb3b4',
                type: 'SUMMARY',
                executedAt: '2020-07-27 18:28:27',
                monitoringStartAt: '2020-07-27 16:07:16',
                monitoringEndAt: '2020-07-27 16:02:25',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                
                tenantCode: 'sjz42x2jlo6yqy8k2vi8lkv0plvdb30pfbtj191bziof2zo91v',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'l7hrgvphpdz9xaitobw3',
                version: 'j9dobw4xc8zcr6mgxae9',
                type: 'SUMMARY',
                executedAt: '2020-07-27 14:06:21',
                monitoringStartAt: '2020-07-27 12:02:43',
                monitoringEndAt: '2020-07-27 01:09:40',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: null,
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'dy92khcntnw3wlaqufr2',
                version: 'y8wx10zd62lt7a2eue2k',
                type: 'SUMMARY',
                executedAt: '2020-07-27 15:45:36',
                monitoringStartAt: '2020-07-27 19:29:11',
                monitoringEndAt: '2020-07-27 04:10:09',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'i7dd64nylzhrnkmp3rdi',
                version: '918l3wzuzgr750zthpta',
                type: 'SUMMARY',
                executedAt: '2020-07-27 20:48:19',
                monitoringStartAt: '2020-07-27 15:59:12',
                monitoringEndAt: '2020-07-28 00:01:07',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'd9y9vrssfezdeme5l3qrpberytzwum32briu0yfz13sg7f6fyb',
                systemId: null,
                systemName: '68qgx32vbhv9wsi5nn7z',
                version: 'rffwkh2oy3a50kjw12je',
                type: 'DETAIL',
                executedAt: '2020-07-27 19:27:29',
                monitoringStartAt: '2020-07-27 17:11:51',
                monitoringEndAt: '2020-07-27 13:40:50',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'wrj4pxkzsj9wrphapj0j1r34y31um3vosp20ebyhs8wneokeuv',
                
                systemName: '8iw4ge9ph3ss985idjt0',
                version: 'svw7eu26n992updf13au',
                type: 'DETAIL',
                executedAt: '2020-07-27 03:23:43',
                monitoringStartAt: '2020-07-27 02:12:10',
                monitoringEndAt: '2020-07-27 06:09:50',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'cg2yv1bsq7zn5wk1yxk3y1rdadvj51rphqe9iszap9qqcdeln3',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: null,
                version: 'j6b51qd1qtfj3jc1g1q7',
                type: 'DETAIL',
                executedAt: '2020-07-27 10:34:17',
                monitoringStartAt: '2020-07-27 06:03:56',
                monitoringEndAt: '2020-07-27 14:43:05',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: '64nqcuvccrtcdzpbe1vkmkfo09cjrwyl8ryrf6jhmv4alxw43n',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                
                version: 'hn9w5uzc62e7v2o8xxd2',
                type: 'SUMMARY',
                executedAt: '2020-07-27 11:26:07',
                monitoringStartAt: '2020-07-27 20:45:44',
                monitoringEndAt: '2020-07-27 20:52:04',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: '5o6dy065ejf5otxsa4vnk1xpj1gucu2oqyimdd91xa9aiv8xyz',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'ty07552j4lh88sf5p7ur',
                version: null,
                type: 'DETAIL',
                executedAt: '2020-07-27 18:50:06',
                monitoringStartAt: '2020-07-27 02:04:53',
                monitoringEndAt: '2020-07-27 02:11:33',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'wg7ppghti62joea7i2bspah22uhcutjb3cgmyfntad88jpvy4b',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'o03bi89l2ftxbrbhawbe',
                
                type: 'SUMMARY',
                executedAt: '2020-07-27 10:32:01',
                monitoringStartAt: '2020-07-27 16:08:40',
                monitoringEndAt: '2020-07-27 16:39:53',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'm424gqso1euvq2fkasu7xq4aonm5izlakaax61omld4ujsqrwd',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'z8j1sinejmlqytyzq8yo',
                version: 'upa437vh4omjk27ktmlh',
                type: null,
                executedAt: '2020-07-27 13:26:18',
                monitoringStartAt: '2020-07-27 09:40:26',
                monitoringEndAt: '2020-07-27 05:55:02',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'rrnav3wgky2i5jzvmn35gjukiur436rdfiqa2i59xcpjfwik7p',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: '4y478ds0nmb99ko4u3od',
                version: 'dmasb4p9lz3tyigij8hz',
                
                executedAt: '2020-07-27 12:19:23',
                monitoringStartAt: '2020-07-27 09:31:15',
                monitoringEndAt: '2020-07-27 17:22:41',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'mjprn170stzbv7r3k1qi220x0636loiy4neqda92029t5rxf8i',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'bnu1uaijtgd4n20ihvkf',
                version: 'rdkd35z3aq0pjbgkj77h',
                type: 'DETAIL',
                executedAt: null,
                monitoringStartAt: '2020-07-27 14:05:29',
                monitoringEndAt: '2020-07-27 23:12:15',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'vcrxdrp26hd2z5gaah9bw59cfopsfelbdym4c6x7mpwkv4ptqg',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: '9k9lfswm5lnraboik1bp',
                version: '1oc43r4d7oabx87q1w30',
                type: 'DETAIL',
                
                monitoringStartAt: '2020-07-27 02:19:17',
                monitoringEndAt: '2020-07-27 14:46:36',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'hf5sh9av31hu4qxai7cxge9ze6gg3vnjlqihanfrfi4xjkgp35',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'if1h8l5vpjjexpsmgu88',
                version: 'omw9dzsxqf5e9wgohrm6',
                type: 'SUMMARY',
                executedAt: '2020-07-27 15:06:55',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-27 01:34:21',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: '3ykrus9ao4otywtcaksd1cftq4l218tck4u9xrf9pf4lla7lvv',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'c8229o4omgcn0huoeert',
                version: '76y5x9lzeoedwftj8y14',
                type: 'SUMMARY',
                executedAt: '2020-07-27 22:57:40',
                
                monitoringEndAt: '2020-07-27 04:45:06',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'mye6cvwfn8akvf4jh7dp8kk574srys4qoce6k5bz1o0indtmhw',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'buife6yoffgqte8a488j',
                version: 'wxjp6zrnd497rqshtkxh',
                type: 'SUMMARY',
                executedAt: '2020-07-27 16:59:51',
                monitoringStartAt: '2020-07-27 19:14:36',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: '79zvg463guqnjv4tqj4nxjjqksdbamabsd81kfkltoupk9pk7z',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'p14kkjj3r9143gwtcqyz',
                version: 'dd5tsaegmcqc0rvodcsf',
                type: 'SUMMARY',
                executedAt: '2020-07-27 14:24:26',
                monitoringStartAt: '2020-07-27 17:41:41',
                
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
                id: 'jk7lxygnb6gwvkxdkrocmxzx2hd647vrkc9r5',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'yjhcvab3ff13xfiehsko2nessqngvx81rbmjifvu1r9mlur8al',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'ip80rbhf9ae2o98hpvka',
                version: '7t48ttfbi2c3ytfjo7pi',
                type: 'SUMMARY',
                executedAt: '2020-07-27 21:53:24',
                monitoringStartAt: '2020-07-27 19:07:38',
                monitoringEndAt: '2020-07-27 20:49:42',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'gg5e4lw80nkquzayhwv096a8bglh3kg0p6xke',
                tenantCode: '7uf5ob7pb2ikiz4dg9sbrhkjfi9itviuji0c146j3sn730csq2',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'zjai501chpp7oq50wya7',
                version: 'sx9lnp24k8o696qo10at',
                type: 'SUMMARY',
                executedAt: '2020-07-27 10:16:15',
                monitoringStartAt: '2020-07-27 14:56:54',
                monitoringEndAt: '2020-07-27 10:18:04',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 's9ccoq1lmkqml4nxkqun2gk1gvvucz282yr2i7es6rf4rb3c0s',
                systemId: '6mn6o6bq4klrenlevd6kaeoeyrrrbg3j6cgt2',
                systemName: 'heqtvee2z22t1hpl05jx',
                version: 'omm2l8553pu88eidilgz',
                type: 'SUMMARY',
                executedAt: '2020-07-27 10:35:49',
                monitoringStartAt: '2020-07-27 17:49:11',
                monitoringEndAt: '2020-07-27 13:15:04',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: '135xrf0xypm1uof27w4bj2dhvvxwj3joqummhsgm8jlefba7aqa',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: '4jkpjyrynv9nhzxushz2',
                version: 'c7r0xpeugqd6zwod51t7',
                type: 'SUMMARY',
                executedAt: '2020-07-27 14:25:18',
                monitoringStartAt: '2020-07-27 02:04:04',
                monitoringEndAt: '2020-07-27 21:52:26',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'ulrrg3t9tq7hwxkpj5xg9hl86wh4z167roaone4sf4sondcf80',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'suedzl648kuwd2zmzyma1',
                version: '9r00jwhashrz6c5fi2b2',
                type: 'DETAIL',
                executedAt: '2020-07-27 16:29:29',
                monitoringStartAt: '2020-07-27 23:13:14',
                monitoringEndAt: '2020-07-28 00:16:59',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'xygkjmnzkgnod6pnfv76szxiw9elc4afo6inds9l793ofolpil',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'nukmkqtm35vciuquj0mt',
                version: '2ckmkk9bgsocc3epuhtj1',
                type: 'DETAIL',
                executedAt: '2020-07-27 08:10:16',
                monitoringStartAt: '2020-07-28 00:33:22',
                monitoringEndAt: '2020-07-27 15:56:58',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'mjfdvhzkkcx501rgwkttv61tk8pz0qyddwjq7mnqz8oukzkbor',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: '54kt1rtb52gyl61hjd8q',
                version: 'drw6f7r7dlfki0bvoq4x',
                type: 'XXXX',
                executedAt: '2020-07-27 07:09:12',
                monitoringStartAt: '2020-07-27 12:34:39',
                monitoringEndAt: '2020-07-28 00:29:12',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'tf66x22je81zwvxvxvncl7sur8f8up5op3ojhk5pdabhiq0jpo',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'e2o0xvt3a6a5qdy6k24s',
                version: 'f41sham6sqi0dzlaph6j',
                type: 'DETAIL',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-07-27 18:12:40',
                monitoringEndAt: '2020-07-27 06:07:34',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'erkzg8b21qavohaqxxkxlungd73nn2wdz2trp621l5w0yislsn',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'tuazrz7uwqe35197aoyv',
                version: 't63osumrh4rihktlauwg',
                type: 'SUMMARY',
                executedAt: '2020-07-27 06:32:23',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-27 18:22:29',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'ybjfkv6h3bxjnqejnqxvu4vbout18dowhm6jylt1vc73fs766v',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: '711wj6ngklw8yp4nypl8',
                version: 'ccrwthi0ks8rwzcpd5mq',
                type: 'DETAIL',
                executedAt: '2020-07-27 01:27:44',
                monitoringStartAt: '2020-07-27 01:38:11',
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
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'ombi57f8ly79ftbu8eq3inw5i1u9stxv866jjesto8q9f567na',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'dh0cydp7s75s2ct0yw7z',
                version: '8cp2ku2otyaftmnyrnka',
                type: 'SUMMARY',
                executedAt: '2020-07-27 04:52:55',
                monitoringStartAt: '2020-07-27 03:31:42',
                monitoringEndAt: '2020-07-27 03:02:56',
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
                        value   : '5fb1e753-5840-4ef4-b847-55791024436c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5fb1e753-5840-4ef4-b847-55791024436c'));
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
            .get('/bplus-it-sappi/execution/5fb1e753-5840-4ef4-b847-55791024436c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5fb1e753-5840-4ef4-b847-55791024436c'));
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
                
                id: '8bd1b299-0d4e-4689-a242-36f7bcf74004',
                tenantId: 'fb6309d4-dfcd-49c5-80d9-e307935e5165',
                tenantCode: 'em6qml7acxeh1pcspeuw5bddvt1odjmkz7bv6hm8vsebdxk57d',
                systemId: '6af42b3f-55e4-4947-a2f9-e59d60a78fe4',
                systemName: 'f997porl7kfopfdj8fp0',
                version: '4et5ork2wtbhmq5h6vu6',
                type: 'SUMMARY',
                executedAt: '2020-07-27 03:49:30',
                monitoringStartAt: '2020-07-27 03:07:11',
                monitoringEndAt: '2020-07-28 00:37:23',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '5fb1e753-5840-4ef4-b847-55791024436c',
                tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                tenantCode: 'tsngqp3zxz57a5z56oteuznx103nskv3fzyhcf3e4j4u7d8b6l',
                systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                systemName: 'vxil9wskii93i6dx3t0l',
                version: 'omuicznwiczvj41wuup2',
                type: 'DETAIL',
                executedAt: '2020-07-27 18:13:11',
                monitoringStartAt: '2020-07-27 18:28:41',
                monitoringEndAt: '2020-07-27 19:27:46',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5fb1e753-5840-4ef4-b847-55791024436c'));
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
            .delete('/bplus-it-sappi/execution/5fb1e753-5840-4ef4-b847-55791024436c')
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
                        id: '599f9895-23c1-4340-923c-5b89c197028b',
                        tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                        tenantCode: '3fwvtx6v5w383l5e8ryuns3dwtd9ir2f3liz6ngrrw2c858uys',
                        systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                        systemName: 'sbmby2gqamlxexb4ye6n',
                        version: 'ivcvzg03aojyr4b95x5e',
                        type: 'SUMMARY',
                        executedAt: '2020-07-27 15:31:00',
                        monitoringStartAt: '2020-07-27 22:24:10',
                        monitoringEndAt: '2020-07-27 23:58:59',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', '599f9895-23c1-4340-923c-5b89c197028b');
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
                            value   : '5fb1e753-5840-4ef4-b847-55791024436c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('5fb1e753-5840-4ef4-b847-55791024436c');
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
                    id: '5fb1e753-5840-4ef4-b847-55791024436c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('5fb1e753-5840-4ef4-b847-55791024436c');
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
                        
                        id: '82b7dbd5-de9f-4105-8e1f-1dc1aa27df05',
                        tenantId: 'a8ba9184-609f-452c-93f2-986e3290821a',
                        tenantCode: '5uqeix2x9s61fnvq7irtasz9iiqcutie2wwmr9081hvxznzky6',
                        systemId: '58f28d78-7e52-4d60-8733-764e3d51a36a',
                        systemName: 'sqegxam6bi1vu3y4wogf',
                        version: '1i3ckogpm99cnihypb0j',
                        type: 'DETAIL',
                        executedAt: '2020-07-27 05:11:43',
                        monitoringStartAt: '2020-07-27 06:37:57',
                        monitoringEndAt: '2020-07-27 18:31:19',
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
                        
                        id: '5fb1e753-5840-4ef4-b847-55791024436c',
                        tenantId: 'b1eb5158-d641-4370-93ab-8256a87db1ab',
                        tenantCode: 'k60zywvaeqm6zth4zy2zrcmiivwv0u87q43xmyywj5p6esdqer',
                        systemId: '8af307e8-a267-44d6-ba2f-5ea05ca164ed',
                        systemName: 'ltb7t1ctahoibb65axl1',
                        version: 'w0w3iv4yrqu9cchyxsys',
                        type: 'SUMMARY',
                        executedAt: '2020-07-27 09:02:42',
                        monitoringStartAt: '2020-07-27 21:32:50',
                        monitoringEndAt: '2020-07-27 09:13:59',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('5fb1e753-5840-4ef4-b847-55791024436c');
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
                    id: '5fb1e753-5840-4ef4-b847-55791024436c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('5fb1e753-5840-4ef4-b847-55791024436c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});