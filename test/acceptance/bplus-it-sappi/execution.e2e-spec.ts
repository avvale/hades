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
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'nlzhc44jpxfawwceridvcg8kig0gzclea3ab96s06ciikh1cef',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: '0ticwnotl949w2coi1v1',
                version: 'wb654551sekex1qwpazw',
                type: 'DETAIL',
                executedAt: '2020-07-29 05:55:37',
                monitoringStartAt: '2020-07-29 14:54:12',
                monitoringEndAt: '2020-07-29 11:24:16',
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
                
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'ej3i6ncuf0qk3t59f4nfwn8kfzql4grwg3zh7oxxx5z851532r',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: 'ky4yz9lb8n0ksmsh286o',
                version: 'xxja8hdmnakofjd4vjl8',
                type: 'SUMMARY',
                executedAt: '2020-07-28 15:49:12',
                monitoringStartAt: '2020-07-29 09:27:44',
                monitoringEndAt: '2020-07-29 08:57:26',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: null,
                tenantCode: 'd61w0rgo18b65irbvm197edpt4syz0yli7fmzs746s9qr1eu0d',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: 'puu4t7v33rtql4o1yz7a',
                version: 'o4fzljlybimppizscr2f',
                type: 'SUMMARY',
                executedAt: '2020-07-29 14:55:38',
                monitoringStartAt: '2020-07-28 22:09:52',
                monitoringEndAt: '2020-07-29 11:44:00',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                
                tenantCode: 'ceaxzomiw3w3kuwzl463ui06qtcyi50wfury5icqga3fpynxwt',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: '7wnem40prgcdwbmvruq5',
                version: 'nyszavf9z528a3ip1jer',
                type: 'SUMMARY',
                executedAt: '2020-07-29 15:01:13',
                monitoringStartAt: '2020-07-29 00:35:07',
                monitoringEndAt: '2020-07-28 18:56:44',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: null,
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: 'p530bn3iejaxf8151jku',
                version: 'ndlbq89e6uk48xu2rn0o',
                type: 'SUMMARY',
                executedAt: '2020-07-29 02:16:58',
                monitoringStartAt: '2020-07-28 20:56:47',
                monitoringEndAt: '2020-07-28 20:45:54',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: '2q7yy5wnnqso4w5a4y2o',
                version: '0fzl0kzk3z42vpw403bh',
                type: 'DETAIL',
                executedAt: '2020-07-29 02:20:15',
                monitoringStartAt: '2020-07-29 08:49:14',
                monitoringEndAt: '2020-07-29 03:58:00',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'dv36msygd77iqmexfqw8ek7mpmh7g4527znao6m41pbshop39m',
                systemId: null,
                systemName: 'y4njveuajk0s0in7vw7n',
                version: 'wx7yw7145k5wamj013rj',
                type: 'DETAIL',
                executedAt: '2020-07-29 08:22:39',
                monitoringStartAt: '2020-07-29 05:14:28',
                monitoringEndAt: '2020-07-29 07:10:18',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'b77gz4l23stb4bagcfj3rb0i7km6iv5g1658vlgp0ijw0i5db4',
                
                systemName: 'f32b0quyffziqn2cdp62',
                version: 'fu4o7q3t330t880inbli',
                type: 'SUMMARY',
                executedAt: '2020-07-29 14:31:00',
                monitoringStartAt: '2020-07-28 21:33:11',
                monitoringEndAt: '2020-07-29 13:04:11',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: '9nmhyyslxjnwdq9i5gwfj5zo5d7byot6q1kalg43nq9c1o0tsa',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: null,
                version: 'dmx9mbmf7mekv0ohu9m4',
                type: 'DETAIL',
                executedAt: '2020-07-29 15:21:09',
                monitoringStartAt: '2020-07-29 00:09:37',
                monitoringEndAt: '2020-07-28 20:52:18',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'tbrijgg24oqzk7bmjtpwv28r68hllf0js2izu5lpckj5scy6pd',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                
                version: 'fyvreeami09t3l5verwc',
                type: 'DETAIL',
                executedAt: '2020-07-28 22:17:46',
                monitoringStartAt: '2020-07-29 08:12:54',
                monitoringEndAt: '2020-07-29 09:33:06',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'wgqywjpmfbt9rcns5szd79dlr8vomavia78gnf9kbaf894e0pv',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: '49jeqb49llxiu5bwn8a1',
                version: null,
                type: 'DETAIL',
                executedAt: '2020-07-28 21:33:20',
                monitoringStartAt: '2020-07-28 21:04:45',
                monitoringEndAt: '2020-07-29 03:39:38',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'awulxg6ax3huyrmgj5m7cjzzl4lz6oh5cwk3ckjmmj81uep5uh',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: 'z52szbmup2ru7095e3ox',
                
                type: 'SUMMARY',
                executedAt: '2020-07-28 22:10:07',
                monitoringStartAt: '2020-07-29 07:07:32',
                monitoringEndAt: '2020-07-29 11:30:46',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'oz6rrwaodx1egh7wgvu5awfd95c5kwnxjab1l14l5039nuyd8j',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: 'b21qlesw5g98s584le1z',
                version: 't3td46c6z9ziiz4yhbgd',
                type: null,
                executedAt: '2020-07-28 17:34:09',
                monitoringStartAt: '2020-07-28 16:01:25',
                monitoringEndAt: '2020-07-29 06:27:10',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'ihjwhon1ga5vrwl258tot758ieio5rvcnzab9sttibco9885at',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: '1xs0zdzseov31nhzpqob',
                version: 'ccw5gvkxd3og2e0k2ja2',
                
                executedAt: '2020-07-29 07:35:31',
                monitoringStartAt: '2020-07-29 09:53:03',
                monitoringEndAt: '2020-07-29 03:23:25',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'f7630ax4uahwp4vzhp8xssf1bw2k90vaqintryf58eo1y2os9t',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: '9xp4buqui3zwpbynsm25',
                version: 'ub6uvvdh5pf9iqm8qw67',
                type: 'DETAIL',
                executedAt: null,
                monitoringStartAt: '2020-07-29 05:55:57',
                monitoringEndAt: '2020-07-28 17:15:39',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'kb2flomczcv54pa3prbxe1kzw4uz31qt6sfr5n73ayus8xm6s3',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: 'jg7m5hktt8zjr6lexrmn',
                version: '2925skgrhcspr3217bgn',
                type: 'DETAIL',
                
                monitoringStartAt: '2020-07-29 08:50:37',
                monitoringEndAt: '2020-07-28 19:36:59',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: '52884bra96lz9og1rq351ugxehkxn1jg91dzw1roa4lanyf9gj',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: 'ma1mefqoe3qzzsyn9gfb',
                version: 'tps0ze6isbw5ucfl8v11',
                type: 'SUMMARY',
                executedAt: '2020-07-28 23:18:55',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-28 20:27:32',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: '88t48rjafdta4a908l6t80umj5i8h9219o9r4p8l0ddhihsd0b',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: 'wt6sc37mnji5pqd3i9i2',
                version: 't73zv4kiujqtc2ebm23c',
                type: 'SUMMARY',
                executedAt: '2020-07-28 19:35:59',
                
                monitoringEndAt: '2020-07-29 00:49:51',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'ngjcklsaw56mg23bgiutk5ocbwrd37i0qb1bmhuakvy70jp1s0',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: '9gyd7je0xaavlhwhvmgz',
                version: 'otwwgu1v1jx585bxg9bn',
                type: 'SUMMARY',
                executedAt: '2020-07-29 10:13:28',
                monitoringStartAt: '2020-07-29 10:35:18',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'vhzx12kre5o5ij1aqdps0iyuyujjhi3czqogs4qexle6guv3q8',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: 'd8lbjtwht1v4azxrg9rv',
                version: 'dvjjsfzk0829ak1gper9',
                type: 'SUMMARY',
                executedAt: '2020-07-29 06:43:58',
                monitoringStartAt: '2020-07-29 06:56:26',
                
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
                id: 'f25uxefvpb762usdl0g4igpbfczto4iw3xj2n',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'sax887cfwhkrsnyebakzndyoacprflmprf8nrndxez345fcj0s',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: 'xm65ki4928p3g77afd10',
                version: '5koymcr2m33bpzf55b84',
                type: 'SUMMARY',
                executedAt: '2020-07-29 06:26:50',
                monitoringStartAt: '2020-07-29 10:16:21',
                monitoringEndAt: '2020-07-29 04:02:40',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: 'z7599uis1ah1hahmzvyto0npkt0imizqcpqsq',
                tenantCode: 'symw0hdmfm0symeg0uz9j27e39q4c8b6bhik9h5b2loymxjmak',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: '4xg04voyhr7szecz4gwz',
                version: 'du9v11568x3bfxek3l01',
                type: 'DETAIL',
                executedAt: '2020-07-29 05:10:56',
                monitoringStartAt: '2020-07-28 21:33:03',
                monitoringEndAt: '2020-07-29 02:49:33',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'bck6lgz0trjc030aka9dr8wrkln834m60asvfk0cghccov7tap',
                systemId: 'scshf35q3mtvoldgp7dn1s3gn95hgx9769y79',
                systemName: 'ti6kdnk1jptbk6b2xf8j',
                version: 'hm8ylo9kbyb2cn5nz029',
                type: 'DETAIL',
                executedAt: '2020-07-29 13:52:13',
                monitoringStartAt: '2020-07-28 18:55:25',
                monitoringEndAt: '2020-07-29 09:29:32',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: '17vkt91e7f91xhiqakvi5bnmavwsui26sc17ftl7cbk7akpl0ji',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: 'wlwa0jqrjrtg0u6fkbg3',
                version: '8f059tnw2y7z1eijxy86',
                type: 'SUMMARY',
                executedAt: '2020-07-29 13:19:45',
                monitoringStartAt: '2020-07-29 05:29:11',
                monitoringEndAt: '2020-07-29 15:33:40',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'vr9vk0hdb35qajeb3p8wx5iqjd6cqknxbte4kpums1rggrh5cl',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: 'd3p7c9qr8ht9bxx4ncvu0',
                version: '2xltis05zf6zxe39193j',
                type: 'SUMMARY',
                executedAt: '2020-07-29 04:57:01',
                monitoringStartAt: '2020-07-29 15:29:38',
                monitoringEndAt: '2020-07-29 02:50:47',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'c76ieartzfpwcpgmyrmaskllqd00yzgludjy3xfii88bf0cs08',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: 'a04glavndrma8stinaw5',
                version: 'f9vu7p6aqe3ayq32bms4z',
                type: 'DETAIL',
                executedAt: '2020-07-28 15:37:25',
                monitoringStartAt: '2020-07-28 22:45:54',
                monitoringEndAt: '2020-07-28 18:44:01',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'rcmk4pk9siupbfgh4b0tv4t5fwn775n7564qsy8fuj1wl7u0zz',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: 'jd76yckhf6o6zgygbb7a',
                version: '1rvl4rd88373kbtz6wa2',
                type: 'XXXX',
                executedAt: '2020-07-29 13:29:51',
                monitoringStartAt: '2020-07-29 15:24:14',
                monitoringEndAt: '2020-07-29 01:49:14',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'k8heol6k27q698msx7tbvhai6pvw6fnhmc5bckcdco59prkpy3',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: 'o7jp5dk258kqwfnmemc5',
                version: 'ajpbnqb08j9x4r8o5w4v',
                type: 'DETAIL',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-07-29 04:12:42',
                monitoringEndAt: '2020-07-28 22:25:01',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: 'ho1wnwofswrweimxs4cshfwovm2i3w98gutj1p4gax414zzetf',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: '88zg28cabfhb6e8wkr1z',
                version: 'bq4hp5aj98z88uili2bv',
                type: 'DETAIL',
                executedAt: '2020-07-29 10:00:11',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-29 13:50:58',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: '0l74v8tz5zu6qzro5aq0nit50xl5pukky5trosw4kk325qny91',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: '2fec4rhbdcjvozjng6db',
                version: '8y5s2d5vl9z5trzy56ds',
                type: 'SUMMARY',
                executedAt: '2020-07-29 03:08:11',
                monitoringStartAt: '2020-07-29 15:30:58',
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
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: '4ukjdqkykag1a8x56uforcq4inban7jds2isdpbfjuhneci85y',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: '0ffrea4xxm3x0ye9yhx1',
                version: 'o9s0gdf93obsk09y1atu',
                type: 'SUMMARY',
                executedAt: '2020-07-29 08:58:09',
                monitoringStartAt: '2020-07-28 17:46:02',
                monitoringEndAt: '2020-07-29 14:38:49',
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
                        value   : '29f10af9-38b5-4ed2-bdeb-d1c089dee660'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '29f10af9-38b5-4ed2-bdeb-d1c089dee660'));
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
            .get('/bplus-it-sappi/execution/29f10af9-38b5-4ed2-bdeb-d1c089dee660')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '29f10af9-38b5-4ed2-bdeb-d1c089dee660'));
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
                
                id: '93093266-186e-4f58-817b-8b63765b1613',
                tenantId: 'dc8027e8-de0f-4875-96f5-859040fb1180',
                tenantCode: 'jwu3lu22mryypmey8ljcau7lusdk7ftxrfragfekmd4c57axk8',
                systemId: '6fb6a201-a43b-41f9-89b4-d617b4a2a2f5',
                systemName: 'x8ku5xp1rrkt3olztxgc',
                version: '1zf8ne3ad17mbk68o7af',
                type: 'SUMMARY',
                executedAt: '2020-07-29 14:24:30',
                monitoringStartAt: '2020-07-29 14:00:09',
                monitoringEndAt: '2020-07-29 08:29:40',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                tenantCode: '511pd51vaan2msoo6ao2u9lrstjqtxps5rjji1gnuf081iigjq',
                systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                systemName: 'f3o0o3yhw4ssjoo7gk7x',
                version: 'f6rdmnn4p7ctpb03ey46',
                type: 'DETAIL',
                executedAt: '2020-07-29 04:32:25',
                monitoringStartAt: '2020-07-29 07:20:18',
                monitoringEndAt: '2020-07-28 17:59:52',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '29f10af9-38b5-4ed2-bdeb-d1c089dee660'));
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
            .delete('/bplus-it-sappi/execution/29f10af9-38b5-4ed2-bdeb-d1c089dee660')
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
                        id: '89a67ddd-3af7-487c-b511-fee48ee0adcb',
                        tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                        tenantCode: 'rujtxd242qszqhyhf2eotff053b3f2f2pu6l33tcu49lydazpa',
                        systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                        systemName: 'n3s80ivnb9vg0dvclmig',
                        version: 'ow06q1u7ac0ahemqehhr',
                        type: 'DETAIL',
                        executedAt: '2020-07-29 02:03:47',
                        monitoringStartAt: '2020-07-29 15:04:26',
                        monitoringEndAt: '2020-07-29 13:35:48',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', '89a67ddd-3af7-487c-b511-fee48ee0adcb');
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
                            value   : '29f10af9-38b5-4ed2-bdeb-d1c089dee660'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('29f10af9-38b5-4ed2-bdeb-d1c089dee660');
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
                    id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('29f10af9-38b5-4ed2-bdeb-d1c089dee660');
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
                        
                        id: '08d26afa-4194-40c1-b323-29f23178fec3',
                        tenantId: 'ad1f5f81-96aa-4ebb-9350-d42d2f64b576',
                        tenantCode: '2hcdvxekwu4p1trlh9acd78bk2q3ao585mkvdbxyl1dpqwbl0r',
                        systemId: '99605d1f-690d-476a-9b87-b5b089d4e888',
                        systemName: 'ts7joeppy0mv36m9mbjt',
                        version: 'f7zbn16i6cyfjk6m9vpc',
                        type: 'SUMMARY',
                        executedAt: '2020-07-29 05:46:35',
                        monitoringStartAt: '2020-07-28 17:07:09',
                        monitoringEndAt: '2020-07-29 06:40:07',
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
                        
                        id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660',
                        tenantId: '3c9d574b-c630-4b1a-8a72-19376453f625',
                        tenantCode: 'ykrtp3sc1dwb8czj44zjv9rtlxunghb7gp0vqer47p04w8uyq8',
                        systemId: 'd69db21e-92ec-4b54-b89a-06b3a551bcde',
                        systemName: '20hpeswagxd8iyeda73f',
                        version: '61drzwcgbpfx130rs2tr',
                        type: 'DETAIL',
                        executedAt: '2020-07-28 16:56:18',
                        monitoringStartAt: '2020-07-29 07:53:47',
                        monitoringEndAt: '2020-07-28 20:10:07',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('29f10af9-38b5-4ed2-bdeb-d1c089dee660');
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
                    id: '29f10af9-38b5-4ed2-bdeb-d1c089dee660'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('29f10af9-38b5-4ed2-bdeb-d1c089dee660');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});