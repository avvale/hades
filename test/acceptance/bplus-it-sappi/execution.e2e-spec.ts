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
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'fxyj7pcf07evaoaxatwmppjanyscsqp058u4l1efnlejl9u85x',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: '0kttqqjb9ay2b4lelhny',
                version: '3y5wh1my0nr32noci55p',
                type: 'SUMMARY',
                executedAt: '2020-07-27 06:14:38',
                monitoringStartAt: '2020-07-26 20:19:30',
                monitoringEndAt: '2020-07-27 04:57:57',
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
                
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: '0byq94yrs2a25loo172akdb7dse5m4u2k717oepeic57l607k4',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'fti7nlo55h5cdy435dmx',
                version: 'amsibremd4e0racc8hhu',
                type: 'DETAIL',
                executedAt: '2020-07-27 03:30:01',
                monitoringStartAt: '2020-07-27 08:38:23',
                monitoringEndAt: '2020-07-27 06:37:13',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: null,
                tenantCode: 'wk25ln7loymn596sh60p891uq4tgwwp94c89tut0u8bycdzniz',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'wr4pz9k8r08m9f11kxgm',
                version: 'u3e8llm4r0lo6ecm664u',
                type: 'DETAIL',
                executedAt: '2020-07-26 20:10:56',
                monitoringStartAt: '2020-07-26 19:10:01',
                monitoringEndAt: '2020-07-27 10:26:03',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                
                tenantCode: '5xpprq6w8c1xrj1m27t03jhv62fotenlhitkaejky6cny9dbse',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'enosxqr4bhdb82nnfiq8',
                version: 'eefmezwkmxwfm3w6f4a6',
                type: 'SUMMARY',
                executedAt: '2020-07-27 11:40:06',
                monitoringStartAt: '2020-07-27 12:08:03',
                monitoringEndAt: '2020-07-26 20:16:36',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: null,
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'tcixe9aym6hclicdf7sc',
                version: 'fsy6tdcix3v27jcbwgxz',
                type: 'SUMMARY',
                executedAt: '2020-07-27 18:06:14',
                monitoringStartAt: '2020-07-27 11:04:52',
                monitoringEndAt: '2020-07-27 07:57:09',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: '6eplnneytj7b5iilko9q',
                version: 'iv1izfj20a2jz8s6kltx',
                type: 'DETAIL',
                executedAt: '2020-07-26 19:52:45',
                monitoringStartAt: '2020-07-27 12:24:14',
                monitoringEndAt: '2020-07-27 17:53:39',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'v0g81cedfzvqod26omaa12de3lrfedh9cz0lfw1wico5fl2b39',
                systemId: null,
                systemName: 'htjwm4xhy6inxexktiip',
                version: '0ss63d05kquosr6tty4w',
                type: 'SUMMARY',
                executedAt: '2020-07-27 11:46:46',
                monitoringStartAt: '2020-07-27 08:25:00',
                monitoringEndAt: '2020-07-27 02:59:03',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: '2u30njrf8gdxy0yudgetbyzeq23e9ofkwenbclmeu7mk0q3xkz',
                
                systemName: '9h7cu5ti9j42vherj0ti',
                version: 'ei39kv8s1sxse2px3z8o',
                type: 'SUMMARY',
                executedAt: '2020-07-27 17:47:32',
                monitoringStartAt: '2020-07-27 08:16:22',
                monitoringEndAt: '2020-07-26 21:46:48',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'qf8ipl6mqecbfbvpf5ub9nopt13tbg4dyq2toopsqt30y0mkj9',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: null,
                version: 'e1ib9xcrouqahttw680n',
                type: 'DETAIL',
                executedAt: '2020-07-26 22:00:06',
                monitoringStartAt: '2020-07-27 10:42:17',
                monitoringEndAt: '2020-07-26 23:59:44',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: '0410p7u4w5t99dbiebowq1lf1ofdcopd24ffphqzh0soqqmyfj',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                
                version: 'v4ql1bdikpj84dlnk0uu',
                type: 'DETAIL',
                executedAt: '2020-07-27 05:28:01',
                monitoringStartAt: '2020-07-27 12:45:27',
                monitoringEndAt: '2020-07-27 01:09:48',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'pcyq9mvh99mm0jiebz1z7oqr960161j5j9c2eh4tvz4llcgcvq',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'svymukrxuuwikarvs3p0',
                version: null,
                type: 'SUMMARY',
                executedAt: '2020-07-26 23:37:04',
                monitoringStartAt: '2020-07-26 20:35:25',
                monitoringEndAt: '2020-07-27 08:59:10',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: '2fpf8pb5t34mfb58pmf149e64o57zlwo4iej4zwtivx0vhzevp',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'rx400l3iw7e5pvvu24sk',
                
                type: 'SUMMARY',
                executedAt: '2020-07-26 20:14:06',
                monitoringStartAt: '2020-07-27 15:49:55',
                monitoringEndAt: '2020-07-27 06:20:09',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'oqfb1kr5r9pox0a8ol9s5t27im20n582iya3e4cvs3xpmtk84l',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: '6efxipalujsw1eit4cu2',
                version: 'fg4kg3860ttsk918c4u5',
                type: null,
                executedAt: '2020-07-27 14:10:51',
                monitoringStartAt: '2020-07-27 08:40:47',
                monitoringEndAt: '2020-07-27 08:44:52',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'l8d70niilg4wdscivft6jvmwxztksaysebyq24ay6uoqe57zkp',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: '8i87urbv64b5uejl6615',
                version: 'xcp5cej5qifa86insncu',
                
                executedAt: '2020-07-27 02:42:42',
                monitoringStartAt: '2020-07-27 11:00:30',
                monitoringEndAt: '2020-07-27 05:22:05',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'pzcmmhfs7w1qxbe4pz134wpqqdeh11vm51y3rbckk6pgi6vgfq',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'biph40vhcvv0pry8bsob',
                version: '9to2xo77n64oa7xv1dw2',
                type: 'DETAIL',
                executedAt: null,
                monitoringStartAt: '2020-07-27 11:16:35',
                monitoringEndAt: '2020-07-26 19:55:56',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'cgpocg2zfis6oodzzyjirxdmqaeqrgvrjqy8aswfn3a9mhim81',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'j3zl3hne2k5dmp2czeuo',
                version: '5vzeyvz2w0wdemyv74vk',
                type: 'DETAIL',
                
                monitoringStartAt: '2020-07-26 20:39:39',
                monitoringEndAt: '2020-07-26 18:53:14',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: '5jmvgs80lm09ni3v3bhxsgfq4ez01iwfxjym5rfqr2mvr8kh8c',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: '72e266b2fvfqjsu2pvit',
                version: 'rwq3i3jlki2m64hm52bk',
                type: 'SUMMARY',
                executedAt: '2020-07-27 13:08:36',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-26 20:21:51',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'o0pk35qtoyenexesprkjxo93h6ouxz34cofkt5hjjcellhlglk',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'b8jdd8j6udfb7xlt9bzt',
                version: '6jyrt599qxbcjh1w6se5',
                type: 'SUMMARY',
                executedAt: '2020-07-27 00:08:26',
                
                monitoringEndAt: '2020-07-26 23:40:06',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'rj7lfj6988hhch5qtez47wg7igro2a4p8o1616weqov81ozf5d',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'e09e7tpq4amy87sne3md',
                version: 'p232cet7gbefhnpesadl',
                type: 'DETAIL',
                executedAt: '2020-07-26 23:04:35',
                monitoringStartAt: '2020-07-26 23:32:18',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'mnmselh36ugbj0eeu3r0lek0px7vkso2t9zha3q3sduq3l7qyt',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: '3o274k3kyqt0bugwfwj9',
                version: 'tindflhwkkp0lt79losg',
                type: 'DETAIL',
                executedAt: '2020-07-27 03:07:47',
                monitoringStartAt: '2020-07-27 17:37:05',
                
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
                id: 'p58aprrdjkk5gkrrsw0pgssys17bqicxbo397',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: '3oi3zjtwi4xz61n9uouax75798bf7rigtcfbotyp79w1h4urr6',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'i6p2vncch9i4gjnuqh6s',
                version: 'ajrrsemhkqskivaciu2s',
                type: 'DETAIL',
                executedAt: '2020-07-27 15:03:25',
                monitoringStartAt: '2020-07-27 16:25:19',
                monitoringEndAt: '2020-07-27 16:32:10',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: '5sn2k1woha6yhd0erzuzkmohwvfsbc2bdcd0x',
                tenantCode: 'ezkbnva6d2987ut7wvz26ye2ktkl5vbu6twmt9jnld8b3l9cju',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'jqfnf6galg09o07bcq6s',
                version: 'eaf37ux3jdyddl5ha0dc',
                type: 'DETAIL',
                executedAt: '2020-07-27 15:10:02',
                monitoringStartAt: '2020-07-26 20:18:44',
                monitoringEndAt: '2020-07-27 17:08:24',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'mcjyzc723gv8o8jc2toxqvmjg5s5muycij9pwcjpcxb3w4m9sy',
                systemId: 'xsvlv2edeikh6r2aqga0yjwm44gm5jxtecced',
                systemName: 's3qmlc78jgt7sfo8xl4w',
                version: 'goedkdqhs7fbv746pneb',
                type: 'SUMMARY',
                executedAt: '2020-07-27 05:33:58',
                monitoringStartAt: '2020-07-26 20:24:12',
                monitoringEndAt: '2020-07-27 08:57:02',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'ukec6i4ilt7pl2x0cg64tu7f3xbvxubh13io5zyju01h0hy88z7',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'loybmx3jfp8782iu5pfb',
                version: 'uc5b20r400cjymn5ac5b',
                type: 'DETAIL',
                executedAt: '2020-07-27 04:03:03',
                monitoringStartAt: '2020-07-27 00:17:44',
                monitoringEndAt: '2020-07-27 01:14:04',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'wwn2a2t8n0q54qkg2oo0mgic1hgkfe5g37dbuut0ee4988205w',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'xbnqpbodu6jppvmil6z47',
                version: 'eqjv3u98n8gp1sdhn9ss',
                type: 'DETAIL',
                executedAt: '2020-07-27 12:00:58',
                monitoringStartAt: '2020-07-27 15:29:03',
                monitoringEndAt: '2020-07-27 10:39:33',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'wmu6dtdddn9f2afzayl2x827lhvcbamo1m9f5pdkf1f4ws9eze',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'irwl0ikypu0uevazkh0b',
                version: '4hg7hijidcpdopmfsyror',
                type: 'SUMMARY',
                executedAt: '2020-07-27 02:23:53',
                monitoringStartAt: '2020-07-27 17:09:14',
                monitoringEndAt: '2020-07-26 23:28:20',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'rt1usf11ixzp739e6po8eedict9wt15nkror8qytoa8z1vzdjc',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: '5xlpmyyio91n7s7lkwzb',
                version: '9ivt6m6xcesuqyz5nf5v',
                type: 'XXXX',
                executedAt: '2020-07-27 09:38:27',
                monitoringStartAt: '2020-07-27 10:02:20',
                monitoringEndAt: '2020-07-27 07:44:06',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'nu2kut40djsy528obnje57opxk1h5qiuevuilol0gms9gwlb4m',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'h72ka0cluifchnidty5p',
                version: '8h2wjxujh2kax4csjzxp',
                type: 'DETAIL',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-07-27 08:32:18',
                monitoringEndAt: '2020-07-27 13:12:48',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'gbzt370voqa25poovhxntxtoagy6m57gjxl49vbs2ys2zw6syk',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'fdh28t0qj5h5jcyhh33l',
                version: 'hrsaswdrrbsxzc3l1yf6',
                type: 'SUMMARY',
                executedAt: '2020-07-27 16:05:36',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-27 10:24:12',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'dljobh2p6zzvbt243as94jnelucmcs112ooos5dqe6s5qxmuic',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: '5x36bupwdmxpj4dylx3j',
                version: 'ans1uly1sd3nwndqsjhq',
                type: 'SUMMARY',
                executedAt: '2020-07-27 15:36:36',
                monitoringStartAt: '2020-07-27 10:50:24',
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
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'rgbpr0yad92txifspreqveuvt8hrvrbosvwne34jhxj67ko7bx',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'q90b3n2voob9cxt08dz5',
                version: 'qa5te7sf3axer6egs3ws',
                type: 'DETAIL',
                executedAt: '2020-07-27 10:20:11',
                monitoringStartAt: '2020-07-27 08:28:14',
                monitoringEndAt: '2020-07-27 08:49:10',
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
                        value   : '96ff4eb6-7f39-47a1-9543-69caa6496867'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '96ff4eb6-7f39-47a1-9543-69caa6496867'));
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
            .get('/bplus-it-sappi/execution/96ff4eb6-7f39-47a1-9543-69caa6496867')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '96ff4eb6-7f39-47a1-9543-69caa6496867'));
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
                
                id: 'e6e090a0-952e-44c9-a23c-1e3c75460589',
                tenantId: '2f2b43b6-5361-4809-a2c0-36c8e977e279',
                tenantCode: 'a4v6iop2ip9st8wbv3mtgw37lx63r1ac2hx2nocu66nmmioo3l',
                systemId: '1ce296bf-fe6c-47c9-b0db-737ca84dd957',
                systemName: '9jdk1l7hcbcxhol6wv2p',
                version: '2bmucrkxo5qtlifjptaz',
                type: 'SUMMARY',
                executedAt: '2020-07-27 18:28:25',
                monitoringStartAt: '2020-07-27 00:16:52',
                monitoringEndAt: '2020-07-26 19:23:47',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                tenantCode: 'hm28dmmv729umwzrpoglheoyr04wh79tjq42bawdv05exasb9u',
                systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                systemName: 'mr692ibg22rj1sfrf28q',
                version: 'awa6qrc15qicl033jmux',
                type: 'DETAIL',
                executedAt: '2020-07-26 20:48:21',
                monitoringStartAt: '2020-07-27 11:39:21',
                monitoringEndAt: '2020-07-27 04:11:46',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '96ff4eb6-7f39-47a1-9543-69caa6496867'));
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
            .delete('/bplus-it-sappi/execution/96ff4eb6-7f39-47a1-9543-69caa6496867')
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
                        id: '425afdad-e228-4b9c-b7d2-e98008a0fcd1',
                        tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                        tenantCode: '21sywj3pqdj5bylomcie7qb11e8w1m029w3akmderb469a8dum',
                        systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                        systemName: '52widc77vvvzj3dh2dpa',
                        version: 'ntf4jhoejmq28xzdb2mp',
                        type: 'DETAIL',
                        executedAt: '2020-07-26 22:44:53',
                        monitoringStartAt: '2020-07-27 01:11:14',
                        monitoringEndAt: '2020-07-27 02:19:55',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', '425afdad-e228-4b9c-b7d2-e98008a0fcd1');
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
                            value   : '96ff4eb6-7f39-47a1-9543-69caa6496867'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('96ff4eb6-7f39-47a1-9543-69caa6496867');
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
                    id: '96ff4eb6-7f39-47a1-9543-69caa6496867'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('96ff4eb6-7f39-47a1-9543-69caa6496867');
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
                        
                        id: '1ec91d41-9086-4eb2-92d6-bbd81cc75154',
                        tenantId: '180a82c0-7d5c-4048-8cc0-462e9475273f',
                        tenantCode: 'yxkpw1srov979ys3j89p07ondibg1i5w8wgpo2ydrw29xkvx8u',
                        systemId: '2d53f2ea-41ea-43b2-a381-96d3bf8b6869',
                        systemName: 'tadbmzawuopvri4cxtdp',
                        version: 'kmw0py3hw6hdlhvu9suz',
                        type: 'SUMMARY',
                        executedAt: '2020-07-27 05:02:59',
                        monitoringStartAt: '2020-07-27 07:01:38',
                        monitoringEndAt: '2020-07-27 03:02:41',
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
                        
                        id: '96ff4eb6-7f39-47a1-9543-69caa6496867',
                        tenantId: 'e040f90f-131b-4acf-b17c-9b0c78f93d50',
                        tenantCode: '1dzbwq6lnc085zc78ef5qvov5nt7c4ue00n6tst4n6ehfb20bl',
                        systemId: '365bceb8-b0b6-4dbc-872b-99deb51ccb75',
                        systemName: 'xl21vcpob86sjqwlszni',
                        version: '76w2dz6n9wl6mzngv8wp',
                        type: 'SUMMARY',
                        executedAt: '2020-07-27 13:26:37',
                        monitoringStartAt: '2020-07-27 14:46:17',
                        monitoringEndAt: '2020-07-27 03:46:47',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('96ff4eb6-7f39-47a1-9543-69caa6496867');
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
                    id: '96ff4eb6-7f39-47a1-9543-69caa6496867'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('96ff4eb6-7f39-47a1-9543-69caa6496867');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});