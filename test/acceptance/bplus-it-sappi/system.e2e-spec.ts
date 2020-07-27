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
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                tenantCode: '6g7uwahkf6utf7lgydultpdj6eo8y197zc4f54hetnx4s2o3h2',
                version: 'g',
                name: 'r',
                environment: 'q',
                isActive: false,
                cancelledAt: '2020-07-27 12:13:05',
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
                
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                tenantCode: 'gqmc8utju8paht50u4uvnq1qdyq7ehf6926fmo5rxo9zdah7y2',
                version: '0',
                name: 'q',
                environment: 'a',
                isActive: true,
                cancelledAt: '2020-07-27 03:33:37',
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
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                tenantId: null,
                tenantCode: 'jzzr6ks28esifnhw2ulyiy8xxk7n2y79fwv7ej3nv73ooehqpi',
                version: 'y',
                name: 's',
                environment: '8',
                isActive: false,
                cancelledAt: '2020-07-27 17:18:21',
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
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                
                tenantCode: 'jkdnaaecsjh87t62o65ti2fuxi96ememx6kh6fat3lm5qfroh4',
                version: '5',
                name: 'b',
                environment: 'v',
                isActive: true,
                cancelledAt: '2020-07-27 13:45:41',
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
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                tenantCode: null,
                version: 'i',
                name: 'x',
                environment: 'i',
                isActive: false,
                cancelledAt: '2020-07-26 22:16:00',
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
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                
                version: 'g',
                name: '6',
                environment: 'c',
                isActive: false,
                cancelledAt: '2020-07-27 12:46:33',
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
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                tenantCode: 'ky9ei3wt0j7m1yn15to848osuui2r5k88nk5346b32b31symfs',
                version: null,
                name: 'g',
                environment: 'g',
                isActive: true,
                cancelledAt: '2020-07-27 11:38:23',
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
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                tenantCode: 'wrc4ialor30dpq8mg4j92rbuqkcr53mw9ww5rtvgeerj6oepn8',
                
                name: '8',
                environment: 'y',
                isActive: true,
                cancelledAt: '2020-07-26 21:22:44',
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
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                tenantCode: '8j27dx1e6olijzeahvxip27207j34glzjn2z2yfojh8soju12h',
                version: 'w',
                name: null,
                environment: 'y',
                isActive: true,
                cancelledAt: '2020-07-26 20:06:42',
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
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                tenantCode: 'xumyglfw8pw1i5ng2a82a8ywa16yesyxpt9mzl63o8flzib4d6',
                version: 'f',
                
                environment: 'p',
                isActive: true,
                cancelledAt: '2020-07-26 22:51:17',
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
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                tenantCode: 'y4voshnuw1qjhxi41kmkmxn7ja38ssjvzaf9hzl6unrc8bzfm3',
                version: 'a',
                name: 's',
                environment: null,
                isActive: false,
                cancelledAt: '2020-07-26 21:36:59',
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
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                tenantCode: 'pczsbunnzmzgxh0kgul0bg7qub3h0fripwzhsyxl4ksy5lhxgp',
                version: 'z',
                name: 'k',
                
                isActive: false,
                cancelledAt: '2020-07-26 19:21:26',
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
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                tenantCode: 'ad91lprw28bqwp3x4z5xfduj6jmzrrgyozslz8s07d4gsc3vec',
                version: 'p',
                name: 'g',
                environment: 'q',
                isActive: null,
                cancelledAt: '2020-07-27 11:56:53',
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
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                tenantCode: 'wh76gu30n6oy38i1uw7sjfttgf7n23cbw4jhkij9mjqsnk7nsr',
                version: 'd',
                name: '2',
                environment: 'f',
                
                cancelledAt: '2020-07-27 12:52:01',
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
                id: '5ekx57m1q0qy79lqc1w10phoplxp1l790eflw',
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                tenantCode: '0kdhrtqdy108irz6sqxqga7zf1in0swmkiqrku6w9z2nzb84q3',
                version: 'p',
                name: 's',
                environment: 'v',
                isActive: false,
                cancelledAt: '2020-07-26 21:20:24',
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
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                tenantId: 'idknlnqxfss568townsxkx2m76k7ya3rynrqy',
                tenantCode: 'npep5vm767owwbcgj5kqztkiotk692t8jufls3gymgvdyaugz8',
                version: 'i',
                name: 'l',
                environment: 'w',
                isActive: true,
                cancelledAt: '2020-07-27 13:07:25',
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
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                tenantCode: 'l3u6pju50106nnekfx1x3z8o6sd73otdbrq1bseyeg76ixdx4m7',
                version: 'r',
                name: 'x',
                environment: '8',
                isActive: true,
                cancelledAt: '2020-07-27 07:30:36',
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
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                tenantCode: 'ei1qwj25rthyi94slhh4z43gelm199nylyx5qafy6pwxlyr27w',
                version: 'u',
                name: 'z',
                environment: 'y',
                isActive: 'true',
                cancelledAt: '2020-07-27 05:18:20',
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
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                tenantCode: 'h4wdx9muir1uokpg2p7emnm5disqus476lx0sr22tpmpq5sqkw',
                version: 'v',
                name: 'j',
                environment: '5',
                isActive: true,
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
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                tenantCode: 'nfxevvmuyskthacy3nh064jwb6mcctmsdwcwfk78wj6qvr6bmw',
                version: 'c',
                name: 'x',
                environment: '7',
                isActive: true,
                cancelledAt: '2020-07-26 20:14:22',
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
                        value   : 'dcb392b9-7456-4ab4-87fa-433736e684d0'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'dcb392b9-7456-4ab4-87fa-433736e684d0'));
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
            .get('/bplus-it-sappi/system/dcb392b9-7456-4ab4-87fa-433736e684d0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dcb392b9-7456-4ab4-87fa-433736e684d0'));
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
                
                id: '892de1ce-e93f-4b12-8ac5-d70952875343',
                tenantId: '85b9d2b8-eafb-47c9-b1ea-519168b86c55',
                tenantCode: 'enujzf7mmsn4qw00t9xyunp07a4tpgd85zq1p6l14qcamhliw0',
                version: '2',
                name: 'h',
                environment: '1',
                isActive: true,
                cancelledAt: '2020-07-27 12:00:36',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                tenantCode: 'uiq3t85c55e83sh5a5xht3cin3vaqovyrvkmnn0wxqh5qwnczp',
                version: 'a',
                name: 'p',
                environment: 'x',
                isActive: true,
                cancelledAt: '2020-07-26 22:24:30',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dcb392b9-7456-4ab4-87fa-433736e684d0'));
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
            .delete('/bplus-it-sappi/system/dcb392b9-7456-4ab4-87fa-433736e684d0')
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
                        id: '58333d2a-468c-4b31-8d0f-510d2a2e1462',
                        tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                        tenantCode: 'jaolqrnnjkq6t442nb6b95zwu4xdnc592mnshxpyloe5t3ehz8',
                        version: 'a',
                        name: 'b',
                        environment: 'z',
                        isActive: true,
                        cancelledAt: '2020-07-27 06:20:29',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', '58333d2a-468c-4b31-8d0f-510d2a2e1462');
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
                            value   : 'dcb392b9-7456-4ab4-87fa-433736e684d0'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('dcb392b9-7456-4ab4-87fa-433736e684d0');
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
                    id: 'dcb392b9-7456-4ab4-87fa-433736e684d0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('dcb392b9-7456-4ab4-87fa-433736e684d0');
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
                        
                        id: 'a2589cc1-db7d-4fe5-aaab-c4e40358ae4c',
                        tenantId: '3b097c74-6035-440d-a11e-a998258333d6',
                        tenantCode: 'kv0nfq98zwni2v6c534ucf4951eats7nc7hzyjotjnhj3uqjcl',
                        version: '2',
                        name: '8',
                        environment: 'p',
                        isActive: true,
                        cancelledAt: '2020-07-26 22:56:06',
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
                        
                        id: 'dcb392b9-7456-4ab4-87fa-433736e684d0',
                        tenantId: '5cccbc40-c574-4977-9ed6-de4ad5da75a4',
                        tenantCode: 'l8tuhehmax312udjqbovnnwxhyke991ilcd7irgt3u4sfphfds',
                        version: 'u',
                        name: '6',
                        environment: 'o',
                        isActive: true,
                        cancelledAt: '2020-07-27 09:44:13',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('dcb392b9-7456-4ab4-87fa-433736e684d0');
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
                    id: 'dcb392b9-7456-4ab4-87fa-433736e684d0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('dcb392b9-7456-4ab4-87fa-433736e684d0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});