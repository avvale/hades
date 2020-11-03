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
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'y0thursxponsp7rn8vpvp5fwipb23bzitcqrexs7klxsqb33qe',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'qfrakp5vodasszei3o8r',
                version: 'dn9ver0qfnb0blkjby93',
                type: 'SUMMARY',
                executedAt: '2020-11-03 04:41:55',
                monitoringStartAt: '2020-11-03 00:43:31',
                monitoringEndAt: '2020-11-03 09:09:39',
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
                
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'ufpg48q6xvxk64ov8h7hmxfwk836mfi5pulc9ghihs9k8rkwoi',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'j6aemndkwq3nbsuu21nz',
                version: 'pcyfj80lh12j6836so33',
                type: 'SUMMARY',
                executedAt: '2020-11-03 01:45:13',
                monitoringStartAt: '2020-11-02 18:57:32',
                monitoringEndAt: '2020-11-02 18:06:45',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: null,
                tenantCode: '1y0534g7q2y3mpgj8zq6pzgwrpqr99ebuv5r84ki9zprvjt165',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'o4u06p6741bp7g3foasf',
                version: 'iz3eis7qy2l1cwfufiqv',
                type: 'DETAIL',
                executedAt: '2020-11-02 21:26:54',
                monitoringStartAt: '2020-11-03 05:40:58',
                monitoringEndAt: '2020-11-03 11:49:22',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                
                tenantCode: 'yrfe6dcexpumqm316rhcmtufq77tqjmjhw74382xzkng6c7ob9',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'uq7l52dt01pku7uqu7ps',
                version: '4xr4hlwiuqumjnfmyett',
                type: 'DETAIL',
                executedAt: '2020-11-03 08:04:18',
                monitoringStartAt: '2020-11-03 10:58:53',
                monitoringEndAt: '2020-11-03 05:39:43',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: null,
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'wdkx3nj349jtvmi0bqfc',
                version: '51w8bmy5yg142mn4tpez',
                type: 'DETAIL',
                executedAt: '2020-11-03 01:55:29',
                monitoringStartAt: '2020-11-03 14:17:20',
                monitoringEndAt: '2020-11-03 10:46:49',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'x5pn4dww4q8qn5aropk7',
                version: '3yyhnj8vqb17fxzpoyzk',
                type: 'DETAIL',
                executedAt: '2020-11-03 00:20:07',
                monitoringStartAt: '2020-11-03 15:56:04',
                monitoringEndAt: '2020-11-03 05:10:18',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'xy7qc7xstwrdb262fvda8xbgt0bqule2vxn13mydur9o6ufhpo',
                systemId: null,
                systemName: 'iekuzn6na3valt6jjers',
                version: '1ar5d9ae7bp45k7vxkt8',
                type: 'SUMMARY',
                executedAt: '2020-11-03 10:06:57',
                monitoringStartAt: '2020-11-03 01:44:38',
                monitoringEndAt: '2020-11-03 08:22:17',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: '0aze43v4z3ofv66wbz1p2c7hqxvjb5adzbt0eafna6uzgftt4p',
                
                systemName: '5qp44gjfkl0hvrng9e52',
                version: 'chsrb8n8fnv8pe9xqhcf',
                type: 'DETAIL',
                executedAt: '2020-11-03 09:39:52',
                monitoringStartAt: '2020-11-03 00:56:14',
                monitoringEndAt: '2020-11-03 09:14:48',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: '6yeur54a5lhx9h176vjpttdxoqljmahfkfon2xg5au8h95borb',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: null,
                version: 'zsgh9rnsaq9cgc74fru3',
                type: 'SUMMARY',
                executedAt: '2020-11-02 23:36:20',
                monitoringStartAt: '2020-11-03 02:41:35',
                monitoringEndAt: '2020-11-03 09:39:52',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'le41cfofo9n1r71tny6huce7bvptj0y65zxtsgm0vlcnhspwya',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                
                version: 'ewurt9smer1yillfcqpo',
                type: 'SUMMARY',
                executedAt: '2020-11-03 15:11:55',
                monitoringStartAt: '2020-11-03 05:19:44',
                monitoringEndAt: '2020-11-03 16:55:59',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: '9ic6y0vqvbekbei6sem1n03txhcy7asnq64ivuc1wg5okcdban',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'l64fz0v71kbfog7xz39s',
                version: null,
                type: 'SUMMARY',
                executedAt: '2020-11-03 09:05:30',
                monitoringStartAt: '2020-11-03 10:36:35',
                monitoringEndAt: '2020-11-03 00:27:47',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'd8zjj4n1avnzkwo9k9nxexjdaq82wmgdvf2cnna6mxpclunr4e',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'daewudedrzqi413mfq7g',
                
                type: 'DETAIL',
                executedAt: '2020-11-02 22:21:52',
                monitoringStartAt: '2020-11-03 15:41:40',
                monitoringEndAt: '2020-11-03 04:59:10',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'no5zry9o7d1ad8r2ay324x1yhu5xt5r6fmsvqxkpk0v0ov6s5x',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: '9aswrgn1l1tyvccxp5rl',
                version: 'qr935cuzr5pnoj5ggary',
                type: null,
                executedAt: '2020-11-03 12:10:03',
                monitoringStartAt: '2020-11-02 22:39:26',
                monitoringEndAt: '2020-11-03 04:53:36',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'u8kh7uon4gy3b7gpotz9lbeso2wsql4x8plqw2f85oeyzfkf6e',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: '2eifs3j875husl8fodys',
                version: 'zyj3xmazxdnuv6ddhaqk',
                
                executedAt: '2020-11-02 19:29:27',
                monitoringStartAt: '2020-11-03 07:53:58',
                monitoringEndAt: '2020-11-03 06:59:11',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'wfzlqmceze2v3e9rbrylb28qr40y15r4w2sijndz6bn2j9qmwf',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'dl10f0sgu9xhbwp9awcu',
                version: 'la6b6b5iu3kfbc6x489t',
                type: 'SUMMARY',
                executedAt: null,
                monitoringStartAt: '2020-11-02 18:03:08',
                monitoringEndAt: '2020-11-03 12:04:10',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'tlv93k2irk676inyiyse7gxi4d25pnuubhqsgxeqt6yoevttz4',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'vgocpqi1ppyba22agy3w',
                version: 'lo4mpydqh8nzgccbdlov',
                type: 'DETAIL',
                
                monitoringStartAt: '2020-11-03 11:21:29',
                monitoringEndAt: '2020-11-02 19:08:45',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'zb707s0i45iqh3szauh9qgsdbc0pewizonzw0mgjc1olfchei7',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'ey2v8ix0zgrh0s62w7at',
                version: '8exxa5bgmet8qv2g7fmk',
                type: 'SUMMARY',
                executedAt: '2020-11-03 12:33:21',
                monitoringStartAt: null,
                monitoringEndAt: '2020-11-03 02:52:14',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'v6eqz3j43vd91wjwb51yhwlarf8crjk5xacebzq8zkwp9d76qc',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: '8p6a18jm8mvgaahbsth6',
                version: 'wed14vbvk4qffrypa87d',
                type: 'SUMMARY',
                executedAt: '2020-11-02 23:02:33',
                
                monitoringEndAt: '2020-11-03 03:48:11',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'ubkfk18otfnnijkv0e5jo5ufhe1ukfhpprlymfr8lufs47yexm',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'kss8p2ol4yka8dkz4vj8',
                version: 'szm9rc7uzxx1bsxh2hp7',
                type: 'DETAIL',
                executedAt: '2020-11-03 05:34:15',
                monitoringStartAt: '2020-11-02 18:56:04',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'lacvvx2vofi39yo8u2dq33fzmc6d6mtsgs7yvkrnsdqsquipqq',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'lgnjqz5sivmw6xlr6ak3',
                version: 'scfibzyah2aielivghec',
                type: 'DETAIL',
                executedAt: '2020-11-02 19:28:48',
                monitoringStartAt: '2020-11-03 05:51:06',
                
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
                id: '2cjkqa9d1r5box41bfhsc1ulq0a2k5al7h0uw',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'rgfvcpa661sqk222fzos0lklipoi5bf0wr6lxo6230n22scbcw',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'koajjrnfew7dffepb06p',
                version: 'zg4wbx9gd8fplfqfup2t',
                type: 'SUMMARY',
                executedAt: '2020-11-02 19:37:26',
                monitoringStartAt: '2020-11-03 16:28:28',
                monitoringEndAt: '2020-11-03 11:50:27',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '50f7dpjtxeslzzlygcfuu51k3nmoyuci9trjj',
                tenantCode: '8ejhklytm1ndlcmo33kigss6dv2tkvntdawtik0n0zl2xrvog4',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'n1u2hzmd4i1a4j634c6h',
                version: 'bfaywelcispj157ei5u6',
                type: 'SUMMARY',
                executedAt: '2020-11-03 13:25:17',
                monitoringStartAt: '2020-11-03 14:29:46',
                monitoringEndAt: '2020-11-03 10:49:58',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'fla7t6zrg2q6na30v03hjpumic20jv3755orjbc1arcwaol1jt',
                systemId: 'f21imd7mwzrwm9wayajgwjyq8fevwgvjxweqs',
                systemName: 'iu8c88sb8jcu1bbw5tqm',
                version: 'e0xao12jm2m6anofibby',
                type: 'DETAIL',
                executedAt: '2020-11-03 09:38:59',
                monitoringStartAt: '2020-11-02 18:00:23',
                monitoringEndAt: '2020-11-03 08:47:45',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'ht41dqifg92vbq2ckpp83e1l00426alradoqbrhcqlz0cn1oedr',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'k1fckfgnga9qmckrdbph',
                version: 'pnjyiu0zib4eltviv0nj',
                type: 'DETAIL',
                executedAt: '2020-11-02 21:29:50',
                monitoringStartAt: '2020-11-03 06:04:43',
                monitoringEndAt: '2020-11-03 04:04:06',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'txf4e700rqez67opfyd5g2pe2wxznad30zk4icgc7nj04qefzb',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'bj9q0ahf6u94ula1dp6lv',
                version: '8v35fgb3acgowy0tfn8a',
                type: 'SUMMARY',
                executedAt: '2020-11-03 13:48:38',
                monitoringStartAt: '2020-11-03 07:19:43',
                monitoringEndAt: '2020-11-02 23:15:13',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: '5fm3pdhm648obkn70yz4mbiokz3u3tsfci85kdyyw4d4tkh27e',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: '3jh7kxt09aql51vem5qz',
                version: 'vel9h8mhljo43nse73duf',
                type: 'DETAIL',
                executedAt: '2020-11-03 15:52:09',
                monitoringStartAt: '2020-11-03 03:37:14',
                monitoringEndAt: '2020-11-03 13:25:34',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'xa4odypva66rmrpk1fduyvidpugh3ys730uvmm3ax5v8zmiqdm',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'vip2a8t7k6g17d89jtoj',
                version: '5nl0ebhgokls392uuwoq',
                type: 'XXXX',
                executedAt: '2020-11-03 06:20:51',
                monitoringStartAt: '2020-11-03 14:13:32',
                monitoringEndAt: '2020-11-03 07:24:55',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'ab8348fyr28c4oxu1ejs296uetudz18lmwf2oaf2wjrxs2hi71',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'evrqo3fxp4oglh3lpiz2',
                version: 'i60842zsqr53ss5i5jao',
                type: 'SUMMARY',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-11-03 15:22:49',
                monitoringEndAt: '2020-11-03 10:42:33',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'f7yez8w5nofr18dwzc226kmbrr6acosu1qbi3cljbnxel0lb61',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'yfdze5mvz8jl1ev6jmjo',
                version: 'dg67xourwhx7l9kymfon',
                type: 'DETAIL',
                executedAt: '2020-11-03 05:54:30',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-11-02 18:32:51',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'u4g6mtagkm37dlt3gnb0j6y103hr3oy2ax7d404leqb1w05xsb',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'ck5eaad4v92s98z8kh2v',
                version: 'j8n7xl4373l3ori1k25w',
                type: 'SUMMARY',
                executedAt: '2020-11-03 09:01:37',
                monitoringStartAt: '2020-11-03 08:54:46',
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
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'jjlp5ekpundo4bp9t5xawiehz3j16a8echrw9vhuphbky8zno6',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'iv4q17fg8m31etvs6g7q',
                version: 'ffc49yqkljea8rmugxfz',
                type: 'DETAIL',
                executedAt: '2020-11-03 10:05:52',
                monitoringStartAt: '2020-11-03 11:00:01',
                monitoringEndAt: '2020-11-03 15:54:27',
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
                        id: '2d6d7a75-4dd7-4712-90f8-e00ade6512f1'
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
                        id: 'fd628283-5905-4b21-bef8-07f23d44d85a'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fd628283-5905-4b21-bef8-07f23d44d85a'));
    });

    test(`/REST:GET cci/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/43af37d6-f055-4921-a139-eede66a1dbc3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/fd628283-5905-4b21-bef8-07f23d44d85a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fd628283-5905-4b21-bef8-07f23d44d85a'));
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
                
                id: '2790b13b-e1f3-4e3a-bc16-4948b2eb8482',
                tenantId: '0898a9ba-57b8-4ae5-af99-9ef6f8cdf548',
                tenantCode: '7z9q1js9f8vsh53uottplo1i79y9a16vpqurtp6vbrad4rm1rh',
                systemId: 'c2e40091-978a-4ebb-9af7-29b165d3303d',
                systemName: 'b85srhsae9bdqm59fd4w',
                version: 'b7gfjl0xxcxobqhgqfg7',
                type: 'DETAIL',
                executedAt: '2020-11-03 04:21:05',
                monitoringStartAt: '2020-11-02 20:13:06',
                monitoringEndAt: '2020-11-03 13:38:03',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                tenantCode: 'q4vf2ays0drv9jr3vjlfzhtlc6vnndhkn35sumvtms5t2ph142',
                systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                systemName: 'psai38f8bzx4k7pc7fa9',
                version: '1rzsygfhjkxggi559jw2',
                type: 'SUMMARY',
                executedAt: '2020-11-03 13:40:43',
                monitoringStartAt: '2020-11-03 14:02:14',
                monitoringEndAt: '2020-11-02 18:54:50',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fd628283-5905-4b21-bef8-07f23d44d85a'));
    });

    test(`/REST:DELETE cci/execution/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/7b6389e7-0f0c-4d04-8ee4-cfc564496b34')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/execution/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/fd628283-5905-4b21-bef8-07f23d44d85a')
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
                        id: 'cd3b62d0-889f-4d29-921a-880ba768aa87',
                        tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                        tenantCode: 'j3ch5i980398pgun6wf3utxev8bnzcg9idyo8kfxj9v8jvaf5j',
                        systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                        systemName: '0p9tgwng6lez8nk2fhgr',
                        version: 'q7pudk0hu8gu6rr1hfj4',
                        type: 'SUMMARY',
                        executedAt: '2020-11-03 10:24:12',
                        monitoringStartAt: '2020-11-03 00:22:32',
                        monitoringEndAt: '2020-11-02 21:33:20',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateExecution).toHaveProperty('id', 'cd3b62d0-889f-4d29-921a-880ba768aa87');
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
                            id: '40378615-f681-47f1-aafb-1977bf63b153'
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
                            id: 'fd628283-5905-4b21-bef8-07f23d44d85a'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecution.id).toStrictEqual('fd628283-5905-4b21-bef8-07f23d44d85a');
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
                    id: '290dd520-6ded-483e-a603-c80a75c16964'
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
                    id: 'fd628283-5905-4b21-bef8-07f23d44d85a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecutionById.id).toStrictEqual('fd628283-5905-4b21-bef8-07f23d44d85a');
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
                        
                        id: 'b7980db2-d9a9-4aec-9f94-f2f022a1f202',
                        tenantId: '08d27097-6f87-4be9-b694-54d48717f43e',
                        tenantCode: '0divm4p1oytiqhja1wi9iohuqnajz2i54c6z9ipli3hdtycn9r',
                        systemId: '0930de42-c511-4f28-bc74-6bf9e414da3c',
                        systemName: '6bpo6axu1bpu6r0p6g51',
                        version: 'g4h04z22b5qd8wwq57zq',
                        type: 'DETAIL',
                        executedAt: '2020-11-03 07:00:45',
                        monitoringStartAt: '2020-11-03 04:20:03',
                        monitoringEndAt: '2020-11-03 05:42:16',
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
                        
                        id: 'fd628283-5905-4b21-bef8-07f23d44d85a',
                        tenantId: '3cdee523-fdbd-4e13-9167-c9468a244a37',
                        tenantCode: '0rtf4utns53gjg0kr7tczzokv9k1z11wy67nc6srzkror494jz',
                        systemId: '6fa143da-32c1-415e-be24-1a756ca65436',
                        systemName: 'k6a2z6nghsiioq517vyr',
                        version: 'e61i48l129xwuhr39ld6',
                        type: 'SUMMARY',
                        executedAt: '2020-11-02 19:56:38',
                        monitoringStartAt: '2020-11-03 04:53:03',
                        monitoringEndAt: '2020-11-03 08:20:00',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateExecution.id).toStrictEqual('fd628283-5905-4b21-bef8-07f23d44d85a');
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
                    id: '8775b58a-e29f-4844-9720-57bc086d50f2'
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
                    id: 'fd628283-5905-4b21-bef8-07f23d44d85a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteExecutionById.id).toStrictEqual('fd628283-5905-4b21-bef8-07f23d44d85a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});