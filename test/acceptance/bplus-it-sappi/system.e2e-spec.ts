import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ISystemRepository } from '@hades/bplus-it-sappi/system/domain/system.repository';
import { MockSystemRepository } from '@hades/bplus-it-sappi/system/infrastructure/mock/mock-system.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('system', () => 
{
    let app: INestApplication;
    let repository: MockSystemRepository;
    
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
            .overrideProvider(ISystemRepository)
            .useClass(MockSystemRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockSystemRepository>module.get<ISystemRepository>(ISystemRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/system - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                tenantCode: 'x4i0992v2r9gvsdvmjm3p0hmnvve2a1gnj311nl2ygm1vwktf0',
                version: 'b',
                name: 'y',
                environment: 'y',
                isActive: true,
                cancelledAt: '2020-07-27 14:38:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                tenantCode: 'bwpnzjjtabmbrb2r9k7y03gcelfmay4yu1z3idp6fh30pfafxw',
                version: 'y',
                name: 'n',
                environment: 'o',
                isActive: false,
                cancelledAt: '2020-07-27 06:25:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                tenantId: null,
                tenantCode: 'g4zbqgw7rtigcv2pc16j1nxitcr8o0497b0a0oijnqsluko5jo',
                version: '3',
                name: 'y',
                environment: 'k',
                isActive: true,
                cancelledAt: '2020-07-27 08:08:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                
                tenantCode: '8cpn9fcabf417ny95k1p1z68vaoxa7rxy4k5bco9td092n46oz',
                version: '7',
                name: 'x',
                environment: 'u',
                isActive: false,
                cancelledAt: '2020-07-27 15:49:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                tenantCode: null,
                version: '5',
                name: 'j',
                environment: '1',
                isActive: true,
                cancelledAt: '2020-07-26 18:14:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                
                version: 'u',
                name: 'a',
                environment: 'c',
                isActive: false,
                cancelledAt: '2020-07-27 08:56:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                tenantCode: '4s6dib5nqtqjqbnt9cvx9r6kg3fiugw4g0k0tcfeqt9bko08qt',
                version: null,
                name: '3',
                environment: 'j',
                isActive: true,
                cancelledAt: '2020-07-27 12:11:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                tenantCode: '1fdp87hvjgivi7nh7p6290v7jxuzxhfcgv0iray04wehhlcp4i',
                
                name: 'l',
                environment: 'a',
                isActive: true,
                cancelledAt: '2020-07-27 12:06:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                tenantCode: 'wzxgnka7qgw2ljsk80trkts0l0n5dod75yceab9lgdt2anvmne',
                version: 'v',
                name: null,
                environment: '3',
                isActive: true,
                cancelledAt: '2020-07-27 02:50:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                tenantCode: 'lyq3t4mjq9haquua4yjp3pj0s3l5p1qeoi76e2tdgym8d0wk4b',
                version: 'n',
                
                environment: 'd',
                isActive: false,
                cancelledAt: '2020-07-27 07:34:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                tenantCode: 'll2k9yrr2tqvnr73aebidlwup61c17ns72606p1ocs8rm1nmuf',
                version: 'a',
                name: '3',
                environment: null,
                isActive: true,
                cancelledAt: '2020-07-27 02:44:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                tenantCode: 'ertilmx0ijggsh9ak58l19rsb8ixjtvkgc618hg8t0w250ilo5',
                version: '6',
                name: 'k',
                
                isActive: false,
                cancelledAt: '2020-07-27 00:19:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                tenantCode: 'mmi8ookoojzz1dlyjpsfwphzuwmm5ivstb08f8ewuqfi10j77s',
                version: 'j',
                name: 't',
                environment: '3',
                isActive: null,
                cancelledAt: '2020-07-26 22:10:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                tenantCode: 'j03snothw9r206st5aifxukdbcff0naqgn53qznksrynk35hq7',
                version: '2',
                name: 'f',
                environment: 'i',
                
                cancelledAt: '2020-07-27 09:42:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'ew39nzqtpj7wwwweh3fvo0e3jh4u9bjwpunse',
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                tenantCode: 'ztjgmfdovi30tjii84ycgacc5cbc5mf8ho1rzgo6mzohtyhqp0',
                version: 'x',
                name: 'y',
                environment: 'u',
                isActive: false,
                cancelledAt: '2020-07-26 18:48:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                tenantId: 'x1qidzptuz6o01sdbv4sienf2yryppzwcw1xa',
                tenantCode: '5703x1xboetj5fn54an6go4mqyx055kth8kyl338gxqlc6y7ok',
                version: '2',
                name: 'b',
                environment: 'f',
                isActive: false,
                cancelledAt: '2020-07-27 06:42:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                tenantCode: 'znr16m32q6kolkhns0jsb2c8zbpy2lz3nd85546xsmjuys0zgtf',
                version: 'i',
                name: 'f',
                environment: 'a',
                isActive: true,
                cancelledAt: '2020-07-27 07:52:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode is too large, has a maximum length of 50');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                tenantCode: '6ys2rmxvnd4ylimb9sxuideso27op7wy1pvif7mzvohyggv9bw',
                version: 'j',
                name: 'm',
                environment: '7',
                isActive: 'true',
                cancelledAt: '2020-07-27 00:02:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemCancelledAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                tenantCode: '7qrcf078vtlu536ux8cioc7u29k1xxdcbbqidrht1z1sa7g78h',
                version: 'p',
                name: 'f',
                environment: 'p',
                isActive: false,
                cancelledAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemCancelledAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                tenantCode: 'ydd1ihef1t919zmhoiskw872q95i4ssatpkt9jrxs8jkb676fo',
                version: 'i',
                name: 'h',
                environment: 'w',
                isActive: true,
                cancelledAt: '2020-07-27 02:50:27',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/systems/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/systems/paginate')
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

    test(`/REST:GET bplus-it-sappi/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system')
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

    test(`/REST:GET bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'b136e272-cbcf-4fcf-99c8-792a60dca591'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b136e272-cbcf-4fcf-99c8-792a60dca591'));
    });

    test(`/REST:GET bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/b136e272-cbcf-4fcf-99c8-792a60dca591')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b136e272-cbcf-4fcf-99c8-792a60dca591'));
    });

    test(`/REST:GET bplus-it-sappi/systems`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/systems')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c0fcc390-0ea9-4bcc-8439-44efee50ad50',
                tenantId: '533cbd8f-582f-4589-af3c-d4161c4771a0',
                tenantCode: 'ao9kw9akp61swl8w48x4niyf89p6vvqbt7lx0zvy17tvwrpzc4',
                version: '3',
                name: 'd',
                environment: 'l',
                isActive: false,
                cancelledAt: '2020-07-26 20:57:20',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                tenantCode: 'y0v4qptsfd53j93y860u6serbwv75y5i6456myepw2cw8ta7yf',
                version: 'h',
                name: 'l',
                environment: 'd',
                isActive: true,
                cancelledAt: '2020-07-26 20:26:11',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b136e272-cbcf-4fcf-99c8-792a60dca591'));
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/b136e272-cbcf-4fcf-99c8-792a60dca591')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateSystem - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateSystemInput!)
                    {
                        bplusItSappiCreateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
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

    test(`/GraphQL bplusItSappiCreateSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateSystemInput!)
                    {
                        bplusItSappiCreateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'b131686d-21f2-4fb5-b249-086a11e2ba40',
                        tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                        tenantCode: '26251thfcb3znt9rwkjkeqbo9bywyzvnx1t7n4y76aukw31hb4',
                        version: 'h',
                        name: 'r',
                        environment: 'o',
                        isActive: false,
                        cancelledAt: '2020-07-27 02:35:50',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', 'b131686d-21f2-4fb5-b249-086a11e2ba40');
            });
    });

    test(`/GraphQL bplusItSappiPaginateSystems`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateSystems (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateSystems.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateSystems.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateSystems.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindSystem - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindSystem (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
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

    test(`/GraphQL bplusItSappiFindSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindSystem (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
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
                            value   : 'b136e272-cbcf-4fcf-99c8-792a60dca591'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('b136e272-cbcf-4fcf-99c8-792a60dca591');
            });
    });

    test(`/GraphQL bplusItSappiFindSystemById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindSystemById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
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

    test(`/GraphQL bplusItSappiFindSystemById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindSystemById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b136e272-cbcf-4fcf-99c8-792a60dca591'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('b136e272-cbcf-4fcf-99c8-792a60dca591');
            });
    });

    test(`/GraphQL bplusItSappiGetSystems`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetSystems (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetSystems.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateSystem - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateSystemInput!)
                    {
                        bplusItSappiUpdateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'c303baac-2fbc-4799-b5e4-15c7d31636b6',
                        tenantId: '80cdc7f0-f3b8-4e28-b0e0-835f95895b4c',
                        tenantCode: 'qkrug3m192ktsfrz4suey86qg6i9phfnl45jz17qk8hjffp2ez',
                        version: 'f',
                        name: 'i',
                        environment: 'l',
                        isActive: true,
                        cancelledAt: '2020-07-27 12:20:17',
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

    test(`/GraphQL bplusItSappiUpdateSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateSystemInput!)
                    {
                        bplusItSappiUpdateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'b136e272-cbcf-4fcf-99c8-792a60dca591',
                        tenantId: 'd7dd29de-caac-4819-8f63-0e2f037c15db',
                        tenantCode: 's8es1ej0cuvp31v4ijtwdmk78xo23c0w62j2aid7w1ds7qdcts',
                        version: '7',
                        name: 'o',
                        environment: 'o',
                        isActive: true,
                        cancelledAt: '2020-07-27 05:08:27',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('b136e272-cbcf-4fcf-99c8-792a60dca591');
            });
    });

    test(`/GraphQL bplusItSappiDeleteSystemById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteSystemById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
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

    test(`/GraphQL bplusItSappiDeleteSystemById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteSystemById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b136e272-cbcf-4fcf-99c8-792a60dca591'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('b136e272-cbcf-4fcf-99c8-792a60dca591');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});