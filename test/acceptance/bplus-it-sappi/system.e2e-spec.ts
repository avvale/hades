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
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                tenantCode: 'zzxtytsxy18cf7okdpqipzcc2clb4q5ce5bv9qjiu5701qkm1d',
                version: 'm',
                name: 'j',
                environment: 'r',
                isActive: false,
                cancelledAt: '2020-07-29 15:39:05',
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
                
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                tenantCode: 'xhfvxk3pd7uqon39os5jjb7j5rnzp7ppz5mrusydrnjdg9zwno',
                version: '9',
                name: 'o',
                environment: 'b',
                isActive: true,
                cancelledAt: '2020-07-29 21:58:29',
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
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                tenantId: null,
                tenantCode: '6i2c6tkq6w3lea0u3c285t5f6p3vrrdeozkoyun18a3lpjfeeq',
                version: '1',
                name: 'p',
                environment: 'j',
                isActive: false,
                cancelledAt: '2020-07-29 02:52:47',
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
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                
                tenantCode: '8flbbl1itcf1xdvo2yuwcjl18fdsl8kerwl1h7wuc0xvgovgi7',
                version: 'e',
                name: '6',
                environment: 'v',
                isActive: true,
                cancelledAt: '2020-07-29 17:22:19',
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
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                tenantCode: null,
                version: 'f',
                name: '0',
                environment: 'w',
                isActive: true,
                cancelledAt: '2020-07-29 13:44:58',
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
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                
                version: 'k',
                name: '0',
                environment: 'r',
                isActive: true,
                cancelledAt: '2020-07-29 01:58:38',
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
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                tenantCode: 'dqoi4gh7wkqv93y34tywsg07adgdszqkk9brg66r8vz2869mln',
                version: null,
                name: 's',
                environment: 'w',
                isActive: true,
                cancelledAt: '2020-07-29 11:06:54',
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
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                tenantCode: 'z79h0hdnxznmyvuymgqcz78z6ws0lokdnv8dcfsnozysntc9eq',
                
                name: 'c',
                environment: 'c',
                isActive: true,
                cancelledAt: '2020-07-29 12:48:56',
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
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                tenantCode: 'wwsscdz6tcgstf61m8ct25xogtsfmb0s9z9nzm2ifhvb06ycyv',
                version: 'n',
                name: null,
                environment: 'm',
                isActive: true,
                cancelledAt: '2020-07-29 11:09:11',
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
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                tenantCode: 'f1rbycbfc0nwo3ciql0lb3jag726ovdcz2bwhiunuvjdevmk4e',
                version: 'u',
                
                environment: 'f',
                isActive: false,
                cancelledAt: '2020-07-29 22:33:29',
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
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                tenantCode: 'ldmj78pt6j94cdo69vsvhhv948ht0dfet1j1jdqeo2rzgmgn13',
                version: 'i',
                name: 'r',
                environment: null,
                isActive: true,
                cancelledAt: '2020-07-29 18:23:02',
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
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                tenantCode: 'fr2gvlmtb2wrf7hgypu1cp168i5fouhlr1ajcy3ohsou3zugki',
                version: 'a',
                name: '0',
                
                isActive: true,
                cancelledAt: '2020-07-29 20:22:41',
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
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                tenantCode: 'n9tldh3z42wy83zxc1cmi1vimvu2ctv714dz0a918wshuk08y8',
                version: 'd',
                name: '0',
                environment: '6',
                isActive: null,
                cancelledAt: '2020-07-29 19:17:06',
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
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                tenantCode: '0yw4silu93e6w1jvpsbml2c070mzkmdz8pb0ioy15l5g6oym1o',
                version: 't',
                name: '8',
                environment: 'e',
                
                cancelledAt: '2020-07-29 02:34:36',
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
                id: 'luey7pygt8talpqdh4vt77ndc8p3wdhk86m4f',
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                tenantCode: 'rph87hjf6az4kshia4uzk4nb9w79oo4utgbdhz090933h59xa4',
                version: 'l',
                name: 'y',
                environment: 's',
                isActive: false,
                cancelledAt: '2020-07-29 16:58:06',
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
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                tenantId: 'lb7bod6pm6yiy3lultum844kdmgct0oib56qp',
                tenantCode: '76poncz2j6p25k07w7d8o5ga6vzztqz1ff3wr5jyfnzmwen0im',
                version: 'g',
                name: '0',
                environment: 'y',
                isActive: false,
                cancelledAt: '2020-07-29 19:02:24',
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
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                tenantCode: 'k00eea448jmjujdrhigprf622xqf976w9025n448r8ky4v8jeqk',
                version: 'p',
                name: 'l',
                environment: 'b',
                isActive: true,
                cancelledAt: '2020-07-29 21:52:21',
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
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                tenantCode: 'wte7jr5pzufiif4g7qerzfuvvesy3obpip8w5zr21fl53p4ju5',
                version: 'l',
                name: 'o',
                environment: 't',
                isActive: 'true',
                cancelledAt: '2020-07-29 21:40:55',
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
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                tenantCode: '2gjwyyq4r9ondnq48iu68tuhz8nrz6jj06p6nkifv45b2yo3gt',
                version: 'r',
                name: 'j',
                environment: 'd',
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
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                tenantCode: 'dbsf7hy9yedbd9k6ea99b6p20228qewm2o6des1jjeyfhfh0ad',
                version: 't',
                name: 'n',
                environment: 'f',
                isActive: true,
                cancelledAt: '2020-07-29 13:35:41',
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
                        value   : 'aaaa9d83-49a8-4d51-8453-d08ac5d6a3c0'
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
                        value   : 'cdba0a48-1ae1-4775-88ad-1cb716fd719e'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cdba0a48-1ae1-4775-88ad-1cb716fd719e'));
    });

    test(`/REST:GET bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/02730bed-d1e3-4148-b84c-614661c9caed')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/cdba0a48-1ae1-4775-88ad-1cb716fd719e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cdba0a48-1ae1-4775-88ad-1cb716fd719e'));
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
                
                id: '82fd7a4d-6602-49a1-9f78-d2a91ed5a111',
                tenantId: 'b538625a-0e1d-4825-98f9-fe57e78b31ce',
                tenantCode: '7zasvhx0yjxoywdgl184y8u4ue5lohhj6mj8hstbn6nogfgcj3',
                version: '5',
                name: 'n',
                environment: 'd',
                isActive: true,
                cancelledAt: '2020-07-30 00:29:17',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                tenantCode: 'xpq5ac15bnb0cdk85i8y9aprn2nx9f2c5y3ua1r5hvhzpsoc6t',
                version: 'y',
                name: '5',
                environment: '3',
                isActive: true,
                cancelledAt: '2020-07-29 01:04:59',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cdba0a48-1ae1-4775-88ad-1cb716fd719e'));
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/8ec775df-b9cd-4f69-864a-79eb4dd9cb38')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/cdba0a48-1ae1-4775-88ad-1cb716fd719e')
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
                        id: '2afd7590-2b26-4b34-a02b-db052cda61ff',
                        tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                        tenantCode: 'p811tx25nvbsmfmux5orek0q1ybd8r54evwg6551lsaf3269p2',
                        version: 't',
                        name: 'n',
                        environment: 'h',
                        isActive: false,
                        cancelledAt: '2020-07-29 06:01:36',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', '2afd7590-2b26-4b34-a02b-db052cda61ff');
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
                            value   : '58b4faa7-dd0f-440c-aa98-56a9bf03b090'
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
                            value   : 'cdba0a48-1ae1-4775-88ad-1cb716fd719e'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('cdba0a48-1ae1-4775-88ad-1cb716fd719e');
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
                    id: '2019b5bd-c6a5-47d4-ba99-4830138d6c07'
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
                    id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('cdba0a48-1ae1-4775-88ad-1cb716fd719e');
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
                        
                        id: '0ced4a5f-ea29-4f71-bb6b-abc557c5fb3c',
                        tenantId: 'dd72d483-3f84-47f4-9bfe-f6c721efc2f3',
                        tenantCode: '7e76s3gad15hjpcqdftcp2bqoep5u745e60penx5irjux3rzaf',
                        version: 'o',
                        name: '1',
                        environment: '5',
                        isActive: true,
                        cancelledAt: '2020-07-29 08:39:11',
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
                        
                        id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e',
                        tenantId: '7f3de06e-d3e6-4cf9-a396-0e766957cf10',
                        tenantCode: 'mbkviroxtc9rk3al2nowz55dpl4zw7l4d4q49thc2v61a71z54',
                        version: 'r',
                        name: 'l',
                        environment: 'm',
                        isActive: true,
                        cancelledAt: '2020-07-29 17:05:13',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('cdba0a48-1ae1-4775-88ad-1cb716fd719e');
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
                    id: '85a17719-877a-42f5-9ed5-efbe58fecc69'
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
                    id: 'cdba0a48-1ae1-4775-88ad-1cb716fd719e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('cdba0a48-1ae1-4775-88ad-1cb716fd719e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});