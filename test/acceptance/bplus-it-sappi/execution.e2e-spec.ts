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
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: 'h7wsah9ojx2dzxwxh2s7563nkxxvcv159j2jvn0hfqbmj9m3j3',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'vk1xx2qg889puy4ple2i',
                version: 'a6kl50u0s5rnrrjfni1t',
                type: 'SUMMARY',
                executedAt: '2020-07-27 14:22:41',
                monitoringStartAt: '2020-07-27 21:08:31',
                monitoringEndAt: '2020-07-27 22:29:51',
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
                
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: 'wtz0osjjkp6dg59bnwuk8r2tr7zh8csxjdttgff4pwj71dz14k',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: '1dqtvs8rkju373zbsnxk',
                version: '6xksy2jnzejj4qq8ok0g',
                type: 'DETAIL',
                executedAt: '2020-07-28 06:28:30',
                monitoringStartAt: '2020-07-28 01:16:27',
                monitoringEndAt: '2020-07-28 07:58:39',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: null,
                tenantCode: 'tqybse1l55b8laenopuaax7pszdm8x8f1cp2cj76y1tz7aqpyw',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: '6o2qz7qylu98zfqfmnrz',
                version: 'avk445de5hj5f6q3edhm',
                type: 'DETAIL',
                executedAt: '2020-07-28 02:32:51',
                monitoringStartAt: '2020-07-27 19:53:46',
                monitoringEndAt: '2020-07-27 14:32:38',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                
                tenantCode: 'onmrsh7di2ukke5fbahljowjek9itd520y34wm8dx3x2jdmar2',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'm07luhnhdwm6t4nj1zzp',
                version: 'ctz7cisqw1e2ill44iaz',
                type: 'DETAIL',
                executedAt: '2020-07-27 21:05:55',
                monitoringStartAt: '2020-07-27 23:54:24',
                monitoringEndAt: '2020-07-28 00:22:16',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: null,
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'wm16zod66axgl6ofpf8r',
                version: 'd12r0dbfurchah7i1hvj',
                type: 'DETAIL',
                executedAt: '2020-07-27 18:05:08',
                monitoringStartAt: '2020-07-27 14:36:54',
                monitoringEndAt: '2020-07-28 01:04:40',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'mrfqpgljyt3x4pu5anq2',
                version: 'yd92l4nekftddl4kivev',
                type: 'SUMMARY',
                executedAt: '2020-07-28 02:53:39',
                monitoringStartAt: '2020-07-28 02:44:31',
                monitoringEndAt: '2020-07-27 22:18:55',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: 'vzd8lutrg8kbczrj9yxa2sc5kd3h3ys8pexljzpijkti4suz3s',
                systemId: null,
                systemName: 't9ltlyf2sbug6tkneqpa',
                version: 'phzme85b9vdd7tdu1luu',
                type: 'DETAIL',
                executedAt: '2020-07-27 22:36:30',
                monitoringStartAt: '2020-07-27 20:11:44',
                monitoringEndAt: '2020-07-27 15:30:37',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: 'lihyt1g68wahn2gja5ap8telpm52cqhtpmnpcmgl6dm7w7icst',
                
                systemName: '68d76vhatxc9y2635mi0',
                version: 'do5wwtlfegmappzmqqui',
                type: 'DETAIL',
                executedAt: '2020-07-27 14:02:46',
                monitoringStartAt: '2020-07-28 04:54:01',
                monitoringEndAt: '2020-07-27 17:42:55',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: '6k4gpc2axnuvdstejxxcize96cufgwluvh51u6wgp7swlqfwlk',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: null,
                version: 'abutvbko9juw9yqqm29x',
                type: 'DETAIL',
                executedAt: '2020-07-28 01:47:28',
                monitoringStartAt: '2020-07-28 10:43:53',
                monitoringEndAt: '2020-07-27 17:03:55',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: 'dn8w4xcb7yxi5rizqfzr2ss7hrzgzz0sjp1jkfg679sx8o4x6u',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                
                version: '0wn0cdc9itpsrjs6qi5o',
                type: 'SUMMARY',
                executedAt: '2020-07-27 16:25:25',
                monitoringStartAt: '2020-07-27 17:18:50',
                monitoringEndAt: '2020-07-27 23:58:40',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: '22858z1xja72rk6bml0zyq2sxbxrypzdyjve4bxw384qdnd0u1',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: '8dbofh380felrww1qkrx',
                version: null,
                type: 'DETAIL',
                executedAt: '2020-07-28 00:47:10',
                monitoringStartAt: '2020-07-27 23:21:50',
                monitoringEndAt: '2020-07-28 09:16:20',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: 'xzpq004zlrwng9nwwdyuv1on8wezt0f9b1x8kw45burdzcsmtu',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'fg6zfsad7op959h8bhut',
                
                type: 'SUMMARY',
                executedAt: '2020-07-27 14:07:10',
                monitoringStartAt: '2020-07-28 10:48:06',
                monitoringEndAt: '2020-07-27 11:56:30',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: '0jzqmycidrr41a4qdrxsis0ijp305y6yi82zoaiybcwo7t251i',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: '34xrlzubnjl868oy5s9s',
                version: 'ygoa7yrrowcgrs782y6u',
                type: null,
                executedAt: '2020-07-27 18:51:16',
                monitoringStartAt: '2020-07-27 22:24:13',
                monitoringEndAt: '2020-07-28 04:35:16',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: 'qwyb7cu26t0q9cxhzmm47ik3l4n9lnvyec04a4pcvhjznfd13e',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'ec2c4xiozru2r5msh9ec',
                version: 'hy3nfrkvbsjpo8ue7x0q',
                
                executedAt: '2020-07-28 07:09:40',
                monitoringStartAt: '2020-07-28 09:49:00',
                monitoringEndAt: '2020-07-28 01:50:47',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: 'gu61jv7ily3v9oohe70ttigr73ep3apqtdee4dx44x3mza2gub',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'znfnipjz1eqr3yew6rfo',
                version: 'zyqfyj8rs1s5ql7q64l3',
                type: 'DETAIL',
                executedAt: null,
                monitoringStartAt: '2020-07-28 06:06:22',
                monitoringEndAt: '2020-07-28 05:45:41',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: '16nyynxitnbqtc09dlj8gl7s3j322w64kdpat4vt9d75vb2cwe',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'qqhfrrh51ebol3haifn5',
                version: 'i7lwd3ta2pxh7cbtjimh',
                type: 'DETAIL',
                
                monitoringStartAt: '2020-07-28 11:15:49',
                monitoringEndAt: '2020-07-28 10:15:41',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: 'swf9p8u74vsam99pq3s7pszxhoov3byd4gsqoymbhmwc3lmgu2',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'sssy46xdbkkd8bxecgpf',
                version: '898bg2gmcmq69ritdfti',
                type: 'DETAIL',
                executedAt: '2020-07-27 15:23:27',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-27 21:53:44',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: '1os5mrhkl0kyvhky8wfhqvcqycvh27xvi06v6mbyysypryu768',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'lv20oymjvw3hhm4w3cct',
                version: '0fb8j7xlum8uwomdnvtz',
                type: 'DETAIL',
                executedAt: '2020-07-28 02:35:17',
                
                monitoringEndAt: '2020-07-27 21:50:41',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: '513ft62k05nm7nltoh5l80r84mv2e85vvz745hhcow0hgq8qv4',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'xk0pefvz22obm3903fei',
                version: 'sq9i420gi8dd8l78r58g',
                type: 'DETAIL',
                executedAt: '2020-07-27 12:05:20',
                monitoringStartAt: '2020-07-27 12:27:56',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: '6alnac5omqv29a42ixouts5b4386q7teo0ek74tc2866zweb0e',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 's6bf82suzlc28pjaoof5',
                version: 'rnonjpxrb2sau7v2k8h4',
                type: 'DETAIL',
                executedAt: '2020-07-27 23:54:30',
                monitoringStartAt: '2020-07-27 12:14:07',
                
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
                id: '5dywkue670d4jketjmzwfz0h58gg4cy3dtggx',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: 'wbph3r7hhpkg48obss7eulzs2zbesvsrv9wzknf56sq2v44bgk',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'kr6o2yjls691g5e7aabc',
                version: '5hnvdraim7kq2x6dfji4',
                type: 'DETAIL',
                executedAt: '2020-07-27 21:02:23',
                monitoringStartAt: '2020-07-27 20:34:48',
                monitoringEndAt: '2020-07-28 03:53:54',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '375zpzbhtiuu3uw93yk3p0r8xkk0qssngx38v',
                tenantCode: 'zfe4z1x8d0m44ieh3wiwd5xguxage69d32ou84g2lzlo200pgk',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'mstetpv62hmo63ndvp61',
                version: 'cho0v1l8vzxiq0sz78mm',
                type: 'DETAIL',
                executedAt: '2020-07-28 10:02:42',
                monitoringStartAt: '2020-07-27 21:13:33',
                monitoringEndAt: '2020-07-28 02:10:48',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: 'i4t0vdcvoy8hszhdsww58d7ty29dl79coz0xmqcnz711dz3msk',
                systemId: 'ixl4rbn2jjca1emhuse168qda8uic9bxj9qvk',
                systemName: 'qfxfr8j7b3cz30hsho8j',
                version: 'z8j19hmzsirbvrjvyxb2',
                type: 'DETAIL',
                executedAt: '2020-07-27 21:21:03',
                monitoringStartAt: '2020-07-27 14:39:39',
                monitoringEndAt: '2020-07-27 17:38:41',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: 'zdnniw48ituu4uso4lrpwq0z4hv7c8dqzm5190pre4vx84u0bfl',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'n7smoaublyj7vg3aauh4',
                version: 'zfe3t2dt06zy6mr1pezg',
                type: 'DETAIL',
                executedAt: '2020-07-28 06:31:06',
                monitoringStartAt: '2020-07-27 18:21:15',
                monitoringEndAt: '2020-07-27 13:29:07',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: 'tebhnh2nozae7fdwvuuiqmdyg1fo7x9bc5l5aopw6howrz3ma9',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'e6rz5vdl8ie8mo74wlrjq',
                version: 'ofoel7p1zqsc5ubxj7jr',
                type: 'SUMMARY',
                executedAt: '2020-07-27 21:36:20',
                monitoringStartAt: '2020-07-27 23:17:03',
                monitoringEndAt: '2020-07-28 00:57:07',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: 'ebxvb4l0r6qjdktxs5b4zasaqgf04wfbt9adbbgvtczxk2zbqe',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: '40ee2kfbgb0532fvo3gj',
                version: '6duyvfgffo3z1byk2t6gx',
                type: 'DETAIL',
                executedAt: '2020-07-27 22:31:25',
                monitoringStartAt: '2020-07-28 10:07:04',
                monitoringEndAt: '2020-07-28 03:12:00',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: '9ygw2t3ev7ar4jw3k2bxpbq2gwr9vhugcc3x58gv3wn2u1p0ut',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'g0yu0005mg20iuafgarf',
                version: 'fpv4cdvqru0sq5ncm7nc',
                type: 'XXXX',
                executedAt: '2020-07-27 16:30:06',
                monitoringStartAt: '2020-07-27 20:09:49',
                monitoringEndAt: '2020-07-27 21:37:18',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: 'g6vca10a5sbev837jibn7jzqbmhs065kor9bt5wsksgg76dsyg',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: '0ldfiif9qdhvemm2zzyp',
                version: 'iptl81v36gjjutw2pqdo',
                type: 'SUMMARY',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-07-27 20:20:20',
                monitoringEndAt: '2020-07-27 12:23:33',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: 'zj3p0x646p9ugjyr8ywp24pau5ymdpm6z5hqaign3248gpszwp',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'c1k8ovl1l6ockevioal8',
                version: 'oeqd9h1w5f9pmf4ng0np',
                type: 'SUMMARY',
                executedAt: '2020-07-28 08:36:31',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-28 05:46:35',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: '2p45l2ayj0ehar50o2fmnimw5d1n28f04r3iagb20qtd0xacxh',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'b9u02f2mgknaw106egek',
                version: 'g3qscgtxws0ecbgn8ya2',
                type: 'SUMMARY',
                executedAt: '2020-07-27 18:23:28',
                monitoringStartAt: '2020-07-27 11:45:56',
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
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: 'szv4y8qs2vimgtm9apelxouqh8zhn7ezfnwv6s9flpdkwoa4mw',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'ti70v1cj95khz7yu71vg',
                version: 'oqfs73u5d6wt900b7evy',
                type: 'DETAIL',
                executedAt: '2020-07-28 06:55:15',
                monitoringStartAt: '2020-07-28 01:09:04',
                monitoringEndAt: '2020-07-27 15:01:14',
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
                        value   : '0e4179f0-402f-4067-b19e-8bbb2c3e8889'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '0e4179f0-402f-4067-b19e-8bbb2c3e8889'));
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
            .get('/bplus-it-sappi/execution/0e4179f0-402f-4067-b19e-8bbb2c3e8889')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0e4179f0-402f-4067-b19e-8bbb2c3e8889'));
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
                
                id: '35241a96-2395-402c-a7cf-cff844a5d96f',
                tenantId: '080cc031-55e2-4dd5-83a8-9d3f435bea8a',
                tenantCode: 'z5qao91m5p3fu2rtps4zb4olx5cjx0xh8t9nbcgs0rbl40wpmv',
                systemId: '7c3a3cf3-b2b0-4f80-86b7-013794bf791b',
                systemName: 'l540b736i0dhitchls7x',
                version: 'ybwavwpq0rcm0cc636g9',
                type: 'SUMMARY',
                executedAt: '2020-07-28 06:00:23',
                monitoringStartAt: '2020-07-27 20:38:33',
                monitoringEndAt: '2020-07-27 21:53:22',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                tenantCode: '5gib8xvqpc6p17wk1v3bdh1mjnmwh00uwgf87l6rqhl5io9r1n',
                systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                systemName: 'mtfd8mbg4jih01y39bv0',
                version: 'v6vafq293chdxej512u1',
                type: 'DETAIL',
                executedAt: '2020-07-28 03:15:58',
                monitoringStartAt: '2020-07-27 12:24:06',
                monitoringEndAt: '2020-07-27 14:05:19',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0e4179f0-402f-4067-b19e-8bbb2c3e8889'));
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
            .delete('/bplus-it-sappi/execution/0e4179f0-402f-4067-b19e-8bbb2c3e8889')
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
                        id: 'b890942b-14e9-48ff-a3f4-6370911811ee',
                        tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                        tenantCode: '567g4s7zvstu7889mh0shm4o0f83mu21ya80vvps42qv53itdz',
                        systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                        systemName: 'dh7qpxbf20vjblh7y9ro',
                        version: 'anh16wc3v8coe9e7o8ud',
                        type: 'DETAIL',
                        executedAt: '2020-07-28 05:28:09',
                        monitoringStartAt: '2020-07-28 10:23:20',
                        monitoringEndAt: '2020-07-27 18:23:15',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', 'b890942b-14e9-48ff-a3f4-6370911811ee');
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
                            value   : '0e4179f0-402f-4067-b19e-8bbb2c3e8889'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('0e4179f0-402f-4067-b19e-8bbb2c3e8889');
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
                    id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('0e4179f0-402f-4067-b19e-8bbb2c3e8889');
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
                        
                        id: '685be465-d12c-4017-86a7-641c6e49eeff',
                        tenantId: '056bdfe1-8870-43e7-92f0-9c8cf336891d',
                        tenantCode: 'scfyg54zqpyfx48s86twmjnfx00m6ugcsllmrwopgm1wlnvvgj',
                        systemId: 'b43ce7bb-ca11-42ef-a93b-a68bc7fe2fd5',
                        systemName: 'lrhy4l6diy0j8vaywip7',
                        version: '0gic9fm6cp4o0zrvfuoc',
                        type: 'DETAIL',
                        executedAt: '2020-07-28 08:58:08',
                        monitoringStartAt: '2020-07-28 02:22:01',
                        monitoringEndAt: '2020-07-27 18:39:22',
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
                        
                        id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889',
                        tenantId: '4a31c600-f7ad-4bf6-87bb-bc2e2d012fb9',
                        tenantCode: '58ksztr5ek259pqjv87y1oa7pj924ef6f1163gozcqa9uq9jap',
                        systemId: 'a12bc244-c37b-4056-a944-f36c983fdb92',
                        systemName: 'v6t0bnohq0vzaqgro71i',
                        version: 'yrxx4qoib7os2crk0367',
                        type: 'DETAIL',
                        executedAt: '2020-07-27 15:47:31',
                        monitoringStartAt: '2020-07-27 17:57:39',
                        monitoringEndAt: '2020-07-28 01:09:22',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('0e4179f0-402f-4067-b19e-8bbb2c3e8889');
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
                    id: '0e4179f0-402f-4067-b19e-8bbb2c3e8889'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('0e4179f0-402f-4067-b19e-8bbb2c3e8889');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});