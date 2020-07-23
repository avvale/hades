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
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: 'm7jok8zciithe9adowq9mylnwdd9fzb1ott0pklaldz5e3zs4y',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: 'rc249xy5yqxhp0k5vvsm',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-23 00:41:57',
                monitoringEndAt: '2020-07-22 20:27:39',
                executedAt: '2020-07-23 00:45:30',
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
                
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: '6ynsoeucv753dv7nmfqeu9mu6gran6a00xzh1ogzax9x4silwi',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: 'ob2jrda6ukgt3z7fxrl9',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-23 01:46:23',
                monitoringEndAt: '2020-07-23 16:33:01',
                executedAt: '2020-07-23 06:23:25',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: null,
                tenantCode: 'v6b1qdqhj4f6cv6t2jdky9iy7m3vm9mnplnmxbzuqml27tgo9o',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: 'op3lqy6enaq9kuo153qq',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-23 01:27:15',
                monitoringEndAt: '2020-07-23 09:16:59',
                executedAt: '2020-07-22 21:37:33',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                
                tenantCode: '0atk0jkbu0kzn67b92kpjylcfswesxgicecb07ol4fedlu31by',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: '4g6nqeuyra3el51dejr0',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-23 05:02:27',
                monitoringEndAt: '2020-07-23 01:50:25',
                executedAt: '2020-07-22 23:56:17',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: null,
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: 'iuk8isahg90u18dw1bpv',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-23 04:00:04',
                monitoringEndAt: '2020-07-23 02:32:57',
                executedAt: '2020-07-23 08:07:43',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: '54nn4ct736efe08mm6dd',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-23 17:27:27',
                monitoringEndAt: '2020-07-23 05:00:41',
                executedAt: '2020-07-22 23:43:35',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: 'a4pove9sfeg5wd18gm7k6j3ua1scwrkolljn58zwu6v7vg7ydn',
                systemId: null,
                systemName: 'l4uodab1r86jkr405pro',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-23 05:14:23',
                monitoringEndAt: '2020-07-22 23:37:36',
                executedAt: '2020-07-23 11:20:01',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: 'trkkmr1tae4a9amgi1yhxrhweq8sz1amuqyzq5yk8d8yfqaa7q',
                
                systemName: '7o6fjogsv9jef7qmmeak',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-23 15:39:52',
                monitoringEndAt: '2020-07-23 18:26:31',
                executedAt: '2020-07-23 06:05:24',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: 'alonun683t8r976pos9uccgmglcqov733s7r4v26abdqdcr503',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: null,
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-23 03:50:21',
                monitoringEndAt: '2020-07-23 11:57:45',
                executedAt: '2020-07-23 00:00:20',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: 'grw4xc5osrxeioy29xfsz6iyea54u2je6at4irvpp0h0958eg1',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                
                type: 'DETAIL',
                monitoringStartAt: '2020-07-23 00:33:26',
                monitoringEndAt: '2020-07-23 05:03:18',
                executedAt: '2020-07-23 16:17:19',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: '2oxo7zccb77xljwb2enrhjxynw8p13x985yeu9uuvemzgsi6qn',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: 'b7retpjieamps7buhgkg',
                type: null,
                monitoringStartAt: '2020-07-23 07:10:37',
                monitoringEndAt: '2020-07-22 21:49:03',
                executedAt: '2020-07-23 00:15:03',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: 'nfybdxigdue461b2ewcdlc2hwslc755ad0i7qp409r96icxees',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: 'rur7t8x7zc9uaf5ao7ec',
                
                monitoringStartAt: '2020-07-22 18:30:43',
                monitoringEndAt: '2020-07-23 01:29:58',
                executedAt: '2020-07-23 17:38:03',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: 'rz7jocphpwkkfz2q1y0pftz1utaev1b4hx9m69keqco6w86w12',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: 'vdo84b9ct1i7c407z2cp',
                type: 'DETAIL',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-23 00:15:58',
                executedAt: '2020-07-22 21:44:20',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: '8e9kr2fy3baywbpmibwf05bi3zqz06jj6osmw5318ge7rut13w',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: 'l37575awnw2snhl9enc5',
                type: 'DETAIL',
                
                monitoringEndAt: '2020-07-23 05:44:58',
                executedAt: '2020-07-23 12:35:15',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: 'xlpfazpmazw0otimsfcj8i4pl9l2qirhwlpkdg81k1joyg0g2z',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: 'fuhjtjiqxlmo3uushm5s',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-22 19:23:31',
                monitoringEndAt: null,
                executedAt: '2020-07-23 16:19:29',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: 'e0a7775vlc36lsn2ehi0x7ncpkrb8v49sgg32b6doxc98vc8fs',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: 't3ss1nl1fm4knpo44mbp',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-23 02:49:47',
                
                executedAt: '2020-07-23 08:45:31',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: '9u9fupdhht2li687lah0fwh2xo4wypfhg499srbtz3oyzlsusz',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: '9km8rss824wzqmncsb3z',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-23 14:04:46',
                monitoringEndAt: '2020-07-23 04:31:27',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: 'dsp56y6pbfj5m90hzltbywedgqvyfspblxl454jvp5e1dyiffs',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: '6q441tb3w7ynb13vwvs8',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-23 01:34:41',
                monitoringEndAt: '2020-07-23 16:42:56',
                
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
                id: '4o1qoq5ogz7pu8ftdpjzq9y5scaf27j6uqfrb',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: 'fx3l8a3o5f0hrb07qdi89vip5s1xo762rla19zmwnj7eoobrjn',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: 'vnpbnj7vnn3fjzganwd4',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-23 18:28:16',
                monitoringEndAt: '2020-07-23 13:54:35',
                executedAt: '2020-07-23 15:30:25',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'uiml2qpezq5yinssfuybm3duxpuen8fjuewnk',
                tenantCode: '2c6q1xcy711xtp6ko5pldvwwo4nt9s42jzioei3lq7zwga71j1',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: 'iq9vb8y1thc7vtfs6d8b',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-23 06:30:48',
                monitoringEndAt: '2020-07-23 06:04:34',
                executedAt: '2020-07-22 21:09:01',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: '78q84lun74ryotlyjigtirbrvwuefch47foinrbdhapq8f3tif',
                systemId: '76acgauv9z5cp3gk2jg5i5vdf6eqlzcgojfpg',
                systemName: '12mhm8ix41wqnpzzt7mv',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-23 14:01:55',
                monitoringEndAt: '2020-07-23 08:33:24',
                executedAt: '2020-07-23 10:42:42',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: '2jfr66a5pcvhrtld0566zc4qzzrijxbrmrv6t2hjj82qpabc92k',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: 'fjnwcfze2uc6vupso2os',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-23 12:18:39',
                monitoringEndAt: '2020-07-23 17:49:57',
                executedAt: '2020-07-23 02:48:41',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: '4e9toyyc1ffninq4r3p7feqwk7186uj85ontx1srfa7q41txqe',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: '647jq9cci25edwv561fbh',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-23 00:17:53',
                monitoringEndAt: '2020-07-23 14:52:07',
                executedAt: '2020-07-22 22:16:29',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: 'c3u5brzfnoslkku143v1bjjnx4aoqaeald96xw9l58tt4w8i2c',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: '3dozy2i7kq3a30lyl5d8',
                type: 'XXXX',
                monitoringStartAt: '2020-07-23 10:21:05',
                monitoringEndAt: '2020-07-23 03:53:08',
                executedAt: '2020-07-23 10:49:37',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: 'z5ikgiqcfavgrsk8i9x7m7j2avhluzit5izt8ajxb1qdj3a8wd',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: 'nm18rnc6mkcp65eqhkqd',
                type: 'DETAIL',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-23 08:26:19',
                executedAt: '2020-07-22 19:30:51',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: 'cx302ol4nfv92rzjt7pmvx9n71e9q10vfo1vmogtzvu5ce6rap',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: 'tomzwddzpeywjdit85v5',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-23 00:04:44',
                monitoringEndAt: 'XXXXXXXX',
                executedAt: '2020-07-23 00:23:25',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: '7wv74qbbm63bhw4bsxpwj79uux5ghwx33irniz2di9egzwegxh',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: 'r7jtpfvm3y977ovb7red',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-23 01:38:03',
                monitoringEndAt: '2020-07-23 17:39:26',
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
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: 'fqxzvvbydrxsqkbdqsrkou7ek3goargewjcjy99shzvtw6gm2s',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: 'zhbcgadhfcvpyipvkkm9',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-23 08:28:06',
                monitoringEndAt: '2020-07-23 08:54:25',
                executedAt: '2020-07-22 21:28:15',
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
                        value   : '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1'));
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
            .get('/bplus-it-sappi/execution/46ccad1d-8ed4-4aac-9636-dcc8d554a7e1')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1'));
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
                
                id: '26b6662a-624c-462d-921b-5d47d08052e7',
                tenantId: 'ccd7d381-2683-4a01-8da1-73f817478cba',
                tenantCode: 's833s61orc05f2awxxf0cfsouvthiz6grreih6umh6sd05sezx',
                systemId: '7fa3bda3-4734-4eb0-96ae-ce10e93d86f7',
                systemName: '9asxz7jhd599p97idabp',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-23 16:49:12',
                monitoringEndAt: '2020-07-23 03:07:40',
                executedAt: '2020-07-23 15:57:38',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                tenantCode: '9mciqnjxquw0e5y0wiu860bvyob6navyhfqwe771c6uofovn5x',
                systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                systemName: '0oq00kcdk3uj7kitjy6z',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-22 20:36:08',
                monitoringEndAt: '2020-07-23 14:36:36',
                executedAt: '2020-07-23 18:07:11',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1'));
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
            .delete('/bplus-it-sappi/execution/46ccad1d-8ed4-4aac-9636-dcc8d554a7e1')
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
                        id: '87f6a1f8-ee6d-4867-af78-07d271e65cf6',
                        tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                        tenantCode: '6nl7adtxa6rd3klxipzwwkglqxtrrqxm18rua1al1minhkupts',
                        systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                        systemName: '1h6uvbg82hxyr26h9rou',
                        type: 'SUMMARY',
                        monitoringStartAt: '2020-07-23 08:31:54',
                        monitoringEndAt: '2020-07-23 17:19:51',
                        executedAt: '2020-07-23 07:46:00',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', '87f6a1f8-ee6d-4867-af78-07d271e65cf6');
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
                            value   : '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('46ccad1d-8ed4-4aac-9636-dcc8d554a7e1');
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
                    id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('46ccad1d-8ed4-4aac-9636-dcc8d554a7e1');
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
                        
                        id: '90cb00b8-27b1-4561-bf1c-270442c661d9',
                        tenantId: 'a8c0d99c-f96b-4139-9f58-517f24836593',
                        tenantCode: 'htr0kstfrc404n6c481yh94i5tv4kwknob5del175g0lmg62az',
                        systemId: '3f6a5aad-c429-4621-8ad5-cb87d19aba58',
                        systemName: 'qu5ukgxp0en0n4tx7j3p',
                        type: 'SUMMARY',
                        monitoringStartAt: '2020-07-23 15:51:27',
                        monitoringEndAt: '2020-07-22 19:04:28',
                        executedAt: '2020-07-23 08:02:54',
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
                        
                        id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1',
                        tenantId: 'debfed2c-37c6-4a44-82e2-280bf3e97e90',
                        tenantCode: 'rlb6fcw7hrfohhvit0mrn13nbj1t7yqe7i8idd9l1rmeciokbl',
                        systemId: 'edb15ea0-fa28-4094-acc1-214a20b104d8',
                        systemName: 'rfymepjyah3mf4jnqbjf',
                        type: 'DETAIL',
                        monitoringStartAt: '2020-07-23 11:10:31',
                        monitoringEndAt: '2020-07-23 17:08:37',
                        executedAt: '2020-07-23 09:59:35',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('46ccad1d-8ed4-4aac-9636-dcc8d554a7e1');
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
                    id: '46ccad1d-8ed4-4aac-9636-dcc8d554a7e1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('46ccad1d-8ed4-4aac-9636-dcc8d554a7e1');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});