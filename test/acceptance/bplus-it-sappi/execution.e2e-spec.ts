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
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'xxm22v6bgr7rmi5fijfapjf55jubkxnpo8nm77cskv5nfkb02n',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: '6i13mksp2x1kjc6aeg6z',
                version: 'u8s1x04rv0esak4i16u7',
                type: 'SUMMARY',
                executedAt: '2020-07-29 13:47:25',
                monitoringStartAt: '2020-07-29 00:42:00',
                monitoringEndAt: '2020-07-29 09:39:44',
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
                
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'zztomptpjo92nwcpxmsmximoowmnvdq0jabal4aj10sth7put3',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: 'zlz1o4aaex2yt0rq4yem',
                version: 'lup82ktbtxywds5r845q',
                type: 'SUMMARY',
                executedAt: '2020-07-29 01:54:06',
                monitoringStartAt: '2020-07-28 23:22:31',
                monitoringEndAt: '2020-07-29 06:33:53',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: null,
                tenantCode: '0eqpqshehyj3kb0kodr7m0vjr1g3lpnvbu4t8j207qw49wq0ho',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: 'x7l2wq61orfh4a0pfuy8',
                version: 'enyqke388ki0c4pgi2kh',
                type: 'DETAIL',
                executedAt: '2020-07-28 18:00:34',
                monitoringStartAt: '2020-07-28 21:08:03',
                monitoringEndAt: '2020-07-29 07:29:29',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                
                tenantCode: 'is9dofudbzs3b8393453s9tbrvivfr7uqor69gcrxhc0rwinj7',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: 'ty3tdb23solir4az7ibg',
                version: 'enq8a8uxfwn29z2aq6nw',
                type: 'SUMMARY',
                executedAt: '2020-07-29 12:47:39',
                monitoringStartAt: '2020-07-28 22:14:52',
                monitoringEndAt: '2020-07-28 20:04:03',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: null,
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: '55zns6xqlq13s15i523z',
                version: 'x4qw4jwx4wjfpgsiji17',
                type: 'SUMMARY',
                executedAt: '2020-07-28 18:04:21',
                monitoringStartAt: '2020-07-29 12:26:16',
                monitoringEndAt: '2020-07-29 04:03:56',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: 'bx8oafebf2x5wh6v53rf',
                version: '6969votrdikexu3ft3zj',
                type: 'DETAIL',
                executedAt: '2020-07-28 23:24:20',
                monitoringStartAt: '2020-07-29 06:08:40',
                monitoringEndAt: '2020-07-29 14:52:26',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: '83apbpqxgcm9nsionbn30rzay9s9eziufamju1hexke8j4rf1i',
                systemId: null,
                systemName: 'pj2n0f7p31pge34xx28j',
                version: '8t04ogb76x7a98qzf2lt',
                type: 'DETAIL',
                executedAt: '2020-07-29 16:46:08',
                monitoringStartAt: '2020-07-28 21:57:12',
                monitoringEndAt: '2020-07-29 03:34:21',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'xibhpwz1ikojrumhl9boua08tzl78xk773bahd532idr4qmxig',
                
                systemName: 'q9zxb82vui9xkc4kkkss',
                version: 'vccrd5wiavl6imhaqm66',
                type: 'SUMMARY',
                executedAt: '2020-07-29 01:50:51',
                monitoringStartAt: '2020-07-29 08:39:59',
                monitoringEndAt: '2020-07-29 05:42:34',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: '6gd75au0aaak79g2ykqy3j84n84l6g68e0v4425loaty12vluo',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: null,
                version: '1xkvk5n37vuc8bkvo8zo',
                type: 'DETAIL',
                executedAt: '2020-07-29 08:00:16',
                monitoringStartAt: '2020-07-28 20:05:24',
                monitoringEndAt: '2020-07-29 04:14:06',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'yao89eh0m849bc5dvxygr65kb04ub22dwdn8ocvvodbcjr549k',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                
                version: 'h8m92copxm67um8pl9am',
                type: 'SUMMARY',
                executedAt: '2020-07-29 00:50:22',
                monitoringStartAt: '2020-07-29 06:03:55',
                monitoringEndAt: '2020-07-29 08:24:03',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: '4y4hf0modronhqq54l2ewmqq45j5pgji54c3gol3rt19c1lk1l',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: 'dd33u17w75plfm96pews',
                version: null,
                type: 'SUMMARY',
                executedAt: '2020-07-29 04:47:40',
                monitoringStartAt: '2020-07-29 11:23:45',
                monitoringEndAt: '2020-07-29 07:35:25',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'xquyniljcg8e5sqg4imy33s86iogkriplc0h1n8tp5ja43p7wx',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: 'kaj93eon6am82w4y5v3p',
                
                type: 'DETAIL',
                executedAt: '2020-07-29 10:40:02',
                monitoringStartAt: '2020-07-28 22:47:29',
                monitoringEndAt: '2020-07-29 07:41:10',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'q8g6cf0hy390ypj2tdg8g05pfrizqzy8s6kygwh69z7b75g561',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: 'rjv1tobmoh0rnlcb12ye',
                version: 'pxot25ilujziqimfsljf',
                type: null,
                executedAt: '2020-07-28 20:01:49',
                monitoringStartAt: '2020-07-29 00:00:21',
                monitoringEndAt: '2020-07-29 00:57:22',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'jpr1ga67hq79yoh0wna52fn7v7hz71c6dndvwhgl91b082aofp',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: 'ea85ljcs99revommmo0t',
                version: '9loe7fssg6ilst5668yf',
                
                executedAt: '2020-07-29 09:30:37',
                monitoringStartAt: '2020-07-29 13:07:02',
                monitoringEndAt: '2020-07-29 02:08:49',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'yywr1sxdwlr16ucpylm9u4jg7r0gu2hn7iktt1ibmcsra0hglx',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: '8ki38nj03yi0g99xsx97',
                version: 'tn3kqflf2ll4ilul22i8',
                type: 'DETAIL',
                executedAt: null,
                monitoringStartAt: '2020-07-29 09:45:27',
                monitoringEndAt: '2020-07-29 15:55:57',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'j6xpfoxcjarqvruaegs5sexmj7s637xqvx0mmo0byvdp2xkerx',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: '4tc3srofmpeapc0swjsn',
                version: 'u4hfo09jd8u63mx91fis',
                type: 'SUMMARY',
                
                monitoringStartAt: '2020-07-28 18:19:21',
                monitoringEndAt: '2020-07-29 12:15:53',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: '5h6d0j01uqacl03c4xajuuq51f6xuo7fls266jw2i9mamxaelx',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: 'k67j2tcq62otlrkxlsm5',
                version: 'nxo7f9x766w613sx5430',
                type: 'SUMMARY',
                executedAt: '2020-07-28 21:28:28',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-29 10:32:59',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'akvpbr8m0lozgi5oraxo607mufb3j0vvkh9ssyhn7ap8hxov6z',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: '0u1ewbgv7swu92v0y2oi',
                version: 'ujnzsq1o1tmwnhdixc8y',
                type: 'SUMMARY',
                executedAt: '2020-07-28 18:37:05',
                
                monitoringEndAt: '2020-07-29 06:56:53',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'tmsssdooj0l04xrwv0z6jqxgkzj5bsnog3l88c85y508807tzt',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: '2h2gbbcqi0afm5bm3kf0',
                version: 'yymfbb0kh63d82dj9ujs',
                type: 'SUMMARY',
                executedAt: '2020-07-28 19:56:20',
                monitoringStartAt: '2020-07-28 22:25:53',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'uz2jfcd549k8l5x6bqb5tiddjhti4ho9k2n82ddwl4s3fujrzc',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: 'ultipesx2m72az8tq17e',
                version: 'npum2utykt2anhcbew5k',
                type: 'SUMMARY',
                executedAt: '2020-07-29 03:37:29',
                monitoringStartAt: '2020-07-28 18:13:29',
                
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
                id: '57k5099ueciy1rcgq1axmw4q7bj6cc380jsfr',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: '216hplcgk71alr44b2q2i4dqwjkcpankrov1aubi0ex4ceq3kj',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: '56856jg3ercz3y9g1hrr',
                version: 'y2a1lcx775mk68ncbjgp',
                type: 'SUMMARY',
                executedAt: '2020-07-28 17:56:09',
                monitoringStartAt: '2020-07-29 00:08:59',
                monitoringEndAt: '2020-07-29 08:33:40',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: 'g2pjavyo9w84aa7xnukozc9abi89tu32nimyi',
                tenantCode: 'm5dwm6wbobsg6rygll8cin1kes6tsxzy70udas7vg4kujv9uy4',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: 'tk312dz9l8xt400ojsm4',
                version: '4hg4qz7mivsr397z2vwr',
                type: 'DETAIL',
                executedAt: '2020-07-28 20:33:25',
                monitoringStartAt: '2020-07-29 08:07:58',
                monitoringEndAt: '2020-07-29 05:06:29',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'b5ko2x9e7di9ruhtoxrblogyda19bkrt3meh9gqcsnb5qt8xoh',
                systemId: 'zoq0kygx1ih3axnhfw5vnx6uo40of5ih9r8ee',
                systemName: 'lsz86bl1zcwaz9f1tzu0',
                version: '5m4vqshwnwf97kkjsfbl',
                type: 'SUMMARY',
                executedAt: '2020-07-28 23:40:23',
                monitoringStartAt: '2020-07-29 13:34:47',
                monitoringEndAt: '2020-07-28 23:18:12',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: '5dk5qt7sot44r38bj3bicka239lrrs1v3pd4cb2fhm2z3ayin34',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: 'cqrr8ksg2v3wqw9oftdt',
                version: 'bf21mbv6rze9hupk03kx',
                type: 'DETAIL',
                executedAt: '2020-07-29 09:11:32',
                monitoringStartAt: '2020-07-29 06:14:19',
                monitoringEndAt: '2020-07-28 23:19:28',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'uy4i7ccdby0tc146e03mhw4jubws5fab3grtcx56vmafih2jit',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: 'ctp366tvdf59lmf0hmza1',
                version: 'ywrgyqfnapwg4l79jr9n',
                type: 'DETAIL',
                executedAt: '2020-07-29 13:22:42',
                monitoringStartAt: '2020-07-28 21:44:25',
                monitoringEndAt: '2020-07-29 08:54:06',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'm14v44kn4mfa2fwat4q2tbjn9djhg590bdxjdz843e4x1g6thx',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: '5ycw4576zdxncs70inq9',
                version: 'axyix53aucv7tljbmfz1z',
                type: 'DETAIL',
                executedAt: '2020-07-29 00:18:03',
                monitoringStartAt: '2020-07-29 10:43:44',
                monitoringEndAt: '2020-07-29 14:00:00',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'zl39p4o042a4ukmukrh2jpyzefttryje0sei2bhqmlgycnbulr',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: '4p3aphg19oqtwindpzu1',
                version: 's6f17yyqb566vbwvlzc8',
                type: 'XXXX',
                executedAt: '2020-07-28 22:30:27',
                monitoringStartAt: '2020-07-28 22:38:29',
                monitoringEndAt: '2020-07-29 15:42:20',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: '47ix272fjfs04owmyti23rtge2j4dlw7x7uo8g863pnqjl8gjt',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: '0e4fj5umn7wgl4lf6b6z',
                version: 'mxoobjsd6gejp2eavsqp',
                type: 'DETAIL',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-07-28 22:56:09',
                monitoringEndAt: '2020-07-29 00:03:04',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'ax48sdmdfzskvblht3ifhrh17rf38ezmguiz5l1tntv7vci8e9',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: 'loal3ugjbfcot7q9cyh8',
                version: '44citunqfemg9rxak6gm',
                type: 'DETAIL',
                executedAt: '2020-07-29 03:01:47',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-28 23:09:19',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'z84rovni5oj7swq46mz42bkxn66h4c6yjedmzqte1cczo7bf30',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: '8h1xmkp7lcjggffzqplh',
                version: 'oyivd3mov7h3pc9ujbcy',
                type: 'SUMMARY',
                executedAt: '2020-07-29 15:53:10',
                monitoringStartAt: '2020-07-29 11:12:52',
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
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: 'tkoa0x7qdf124i73l2hqwd5gn7mpisyg4poz7ury7gdpch7jhk',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: 'ht0p99la2rv09ob5gqwz',
                version: 'mdad64mhphyek5iav2j3',
                type: 'DETAIL',
                executedAt: '2020-07-29 02:37:43',
                monitoringStartAt: '2020-07-29 06:20:49',
                monitoringEndAt: '2020-07-29 03:15:33',
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
                        value   : 'd72c3119-4524-4571-97de-b036494a9e0c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd72c3119-4524-4571-97de-b036494a9e0c'));
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
            .get('/bplus-it-sappi/execution/d72c3119-4524-4571-97de-b036494a9e0c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd72c3119-4524-4571-97de-b036494a9e0c'));
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
                
                id: '80b59e02-2e14-4547-b53f-dcc3797bf58c',
                tenantId: '315ae1f8-39fb-4606-b993-254579b88cee',
                tenantCode: 'l6dgmsm9k9l5cvkz04my5nkok2r5v4abriirjz368052gw4jmh',
                systemId: 'cabdf75d-d58c-4fcc-8374-3f98f4c03e26',
                systemName: 'sxlggcabhy05y2w4yhjh',
                version: 'mgxhpml5j8766ibuwyye',
                type: 'SUMMARY',
                executedAt: '2020-07-28 21:37:05',
                monitoringStartAt: '2020-07-28 17:02:23',
                monitoringEndAt: '2020-07-29 04:48:51',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                tenantCode: '6kjpwkprqx4px5fifuwgsosk0pav7f3ccan8rzxxvszlw1uvj8',
                systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                systemName: '7yd396u2slgun2qvxx3d',
                version: 'zrq6di0ddlju7vwm9bjy',
                type: 'DETAIL',
                executedAt: '2020-07-29 04:38:36',
                monitoringStartAt: '2020-07-28 21:50:13',
                monitoringEndAt: '2020-07-29 00:25:43',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd72c3119-4524-4571-97de-b036494a9e0c'));
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
            .delete('/bplus-it-sappi/execution/d72c3119-4524-4571-97de-b036494a9e0c')
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
                        id: 'ed047789-d0ef-44d8-a416-4373761f4c64',
                        tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                        tenantCode: '6xjhz2ynfqeh1s0yjuyr78ims6o3xuj37vrxnsnic9edx7ifz7',
                        systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                        systemName: 'qlc39rvy5x8d0i56vk8c',
                        version: '0nqf36uh19bwrona8rpv',
                        type: 'DETAIL',
                        executedAt: '2020-07-28 19:11:54',
                        monitoringStartAt: '2020-07-28 22:16:53',
                        monitoringEndAt: '2020-07-29 06:35:16',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', 'ed047789-d0ef-44d8-a416-4373761f4c64');
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
                            value   : 'd72c3119-4524-4571-97de-b036494a9e0c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('d72c3119-4524-4571-97de-b036494a9e0c');
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
                    id: 'd72c3119-4524-4571-97de-b036494a9e0c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('d72c3119-4524-4571-97de-b036494a9e0c');
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
                        
                        id: '797e847a-f5c7-4a78-9d4d-5edd2654f3b8',
                        tenantId: '8d63898d-1646-415e-886f-84a492b1269f',
                        tenantCode: 'clf1y223ej72tzmt09roltc96t3o7g40q81s2tg3vbnglapev3',
                        systemId: '22e309b8-8939-4d8f-b365-a93d36e797ff',
                        systemName: '82gumwr34r1dynnfpb4i',
                        version: 'x6nz2qr2lh1cajwttjv5',
                        type: 'SUMMARY',
                        executedAt: '2020-07-28 17:06:20',
                        monitoringStartAt: '2020-07-29 14:53:52',
                        monitoringEndAt: '2020-07-29 15:52:57',
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
                        
                        id: 'd72c3119-4524-4571-97de-b036494a9e0c',
                        tenantId: '63c9dd56-da47-4947-aab4-6f130460c22f',
                        tenantCode: 'qpgbt8nfor662pdrexkckenp2hzurxupjxz2d9k8869dme7ijs',
                        systemId: 'e59f6400-9d21-4433-a3bb-b1d087ab0cf8',
                        systemName: '3znsw957o51fwytpw3pl',
                        version: 'ts12ykxgj0egluguwgfi',
                        type: 'DETAIL',
                        executedAt: '2020-07-28 20:01:00',
                        monitoringStartAt: '2020-07-29 13:29:44',
                        monitoringEndAt: '2020-07-29 10:42:54',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('d72c3119-4524-4571-97de-b036494a9e0c');
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
                    id: 'd72c3119-4524-4571-97de-b036494a9e0c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('d72c3119-4524-4571-97de-b036494a9e0c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});