import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/bplus-it-sappi/role/domain/role.repository';
import { MockRoleRepository } from '@hades/bplus-it-sappi/role/infrastructure/mock/mock-role.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('role', () => 
{
    let app: INestApplication;
    let repository: MockRoleRepository;
    
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
            .overrideProvider(IRoleRepository)
            .useClass(MockRoleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/role - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '4ea53cf0-4253-42b5-b7ff-460ba94e25f4',
                name: 'y2180j8azegtw532ktya6y571tn8tq3wi3gy3l1ex14zjbd0kbewy8qh39z94iixjkf60tfotjf3680u40tu5xhosr64fqfttcjnhvv2wh1k8erh9apmeggylda2cg3auukqie1goyne360av9g17yfm59v2e0js44gu9ggy9ugdzczaaioknmghw5ph2inm54rlhw5jly1eadwqykadzfqrbij2nia9gu10v3h8bcum1liid11lqpgvzejuhi9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '4ea53cf0-4253-42b5-b7ff-460ba94e25f4',
                name: 'n8to5w7sswhmy43oupadqkaygqcbm2hqrg4pwj70mlzwq7onqqlqs7frjzcpv9mhuc5ksvxrtrq0opdh3alkyjypcklfon645i7w9a5ohiel9o96lz2pf5zojb3huhpmd7jwre1oc0ybxt0drpu34paj9xe28kj7znuzirajj7syf264krczx7opcbw506zxr5gucmbtfnjuijo17oy9iif75j1tjd35s3f8ng2feevyo08vz02hoqjb4xqp6xr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '6c68c5e4-ee23-44b4-855d-20ac92d58daa',
                tenantId: null,
                name: 'j7uobl1jsbzjaploje0bj5uide4urdwcvo3cr76uj92tie32g6xv688ouekgly58ydi6abhmcz09wsd6v5gghrb8vzvw4on1358o4qhamri394gdtsz5u1ki521csby8u6zijz0czcbl9fso9hmn43foho5t3ftjecw9truy27j1l4ykjaa5mmbcb2sv1eizfljh6oaoxlokry6ivcf9ks6uy2pybgndz22h5e34y4dola85bgr9tsmhf979my4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '6c68c5e4-ee23-44b4-855d-20ac92d58daa',
                
                name: 'gcocxgeoui4zbrecwmbi7vjbms5pxjbv5x0ja6vbbcybyysa3629nud11scnkyqphskjymz4f9uecnnlumgappj60nq01ookrnmabx8yxfyg2virb4glsvyswwhpe8w8swgy4hj1mfhjilwojcyk7ekib5vop6phv12zylh7isra0m8poo82nm30mpyo2h10og7jye6ib4kyznjjqhi8djpycqn98dbqpu5a698ms23dbtgoef6tmpmpq3l0qc3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '6c68c5e4-ee23-44b4-855d-20ac92d58daa',
                tenantId: '4ea53cf0-4253-42b5-b7ff-460ba94e25f4',
                name: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '6c68c5e4-ee23-44b4-855d-20ac92d58daa',
                tenantId: '4ea53cf0-4253-42b5-b7ff-460ba94e25f4',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'z4zqbcigq51l1fo7hpnv5alwvimi94xymfwi3',
                tenantId: '4ea53cf0-4253-42b5-b7ff-460ba94e25f4',
                name: '6dnbkhkp7w4br1jj55rqhzpae35rhp8p19aaue4wuyl4w7lybplett5fjr81c7t7nj7vuqplzyry1028phpxorhsffxqz0goo8kczo6dkiw3pv3nrnppofml147qv1kzv7lsfj1qtwlwch9i3tjytjh0pbqydzj6g71uk5vyrpltt0oz7mbjfgpw6vqb6o2sih147bjqswz5adoowc4v9tgkyavjsaqguadd3t6vrrot4y1b9lv1jdpdnr0ozs0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '6c68c5e4-ee23-44b4-855d-20ac92d58daa',
                tenantId: 'bteu56vo3dm8rootz7jg4x8u6duzsaqepx3id',
                name: 'r5i3x9nq67m0s98nl9zzusyamevzzjqw1mcqrryl8h4vkekbijid0jpde66ty4shrcpfm2iqi7owurv9hvqcg1vrtihrl7by897315kjvsknripy6sqvwjn709dki7oqgpxb7zqxedzod1jb0captoe4xlybt62soraldphp6s6jrkoh0h3bjpc2xrlyb4w0m9mm1sf5wshg85u7wflx5y7lpk20h8emu0n6xv0jzwe277gzndd1rt48uusvr82',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '6c68c5e4-ee23-44b4-855d-20ac92d58daa',
                tenantId: '4ea53cf0-4253-42b5-b7ff-460ba94e25f4',
                name: 'hs8tjkjb55aujh09xikw0aemc159muu51rzz4ukrefntbzbd0fjq37bztvf6ayi8m96000m1fjxxsv3jpbjmnievmpjj503nz05cu79wp6g3h606vqn8616og7gkbobpx34eiptap5zl07ap1b9tki3gi8f4i0nif2vrt5ctsyjwk0e3f78bsher2if7dsbr9y7d5pskdr34bgaq1s5zzkg22ld3yh539umfi6gdg5q4d2eez6vxt54qq5szp5zk',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: '6c68c5e4-ee23-44b4-855d-20ac92d58daa',
                tenantId: '4ea53cf0-4253-42b5-b7ff-460ba94e25f4',
                name: 'r3mhmm6w4g4ll5mpe5baqu0f5p2h4y20z2a0m1dtrtmg1nk79hyp6wmbf8kr3eb9cdmwhgr1edeu7kpwlwj2bshubh56pdlgg403ciyv0n9dvqpdw79mt27obj4fama168ky982dz6ezxq3t3gtbk1wm91ugpshup6vhe7kh2ht7eduppkcvflg5ej4g6dsdmqkadw80hzm5iqwzd4ah5kryvf1tn4n4tr2dkwxyvwf89h30e5oqgwa1l0s9frw',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/roles/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/roles/paginate')
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

    test(`/REST:GET bplus-it-sappi/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role')
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

    test(`/REST:GET bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '6c68c5e4-ee23-44b4-855d-20ac92d58daa'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6c68c5e4-ee23-44b4-855d-20ac92d58daa'));
    });

    test(`/REST:GET bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/6c68c5e4-ee23-44b4-855d-20ac92d58daa')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6c68c5e4-ee23-44b4-855d-20ac92d58daa'));
    });

    test(`/REST:GET bplus-it-sappi/roles`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '3d30e132-1cdf-42a0-9b3a-b9dfcf986e5c',
                tenantId: '2aad69a7-5d06-44fb-8f33-53a77c1d8c9f',
                name: 'bwkraojgxd9n93u2ya3ay9jtbkhcgj2xg74zapesacnvaixwcv585yu3ygkumdme2j5zao95tew9xmbcb3w42xqfp8uepy8qks0gnw0747d3zmbjtl0tbq31cnytqrnchlbobab160rqgmejvyip385e7e8avs5dae0zw5gcs5migil5jjzbp4n7xfujw90c0o0ijqkjcl1j0ukv8rzw1hdxmehlxl27usoig6ivozp5voxdrd3mt9rs49e2l7t',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '6c68c5e4-ee23-44b4-855d-20ac92d58daa',
                tenantId: '4ea53cf0-4253-42b5-b7ff-460ba94e25f4',
                name: 'kxz2dty910ksuhn2axg1xmxsmscwmd9uzehl7u8j4unj1hxuw77exqt3axjwst1mgtfgfy547qeo51rl4nulpauia5i97ibzw14b8nzfavlt186elrduxnvh0vcbjr2vuxztnni721s5y3w9nqs0z9hgxeq7jxkvdzejptfls06njj7obibomowikzjssrzu68qh5l081ojpifxh4g0z4i6bovt6x3rewksiq0rg4jlmig3whzjn6nczmatfv41',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6c68c5e4-ee23-44b4-855d-20ac92d58daa'));
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/6c68c5e4-ee23-44b4-855d-20ac92d58daa')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateRole - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateRoleInput!)
                    {
                        bplusItSappiCreateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            name
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

    test(`/GraphQL bplusItSappiCreateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateRoleInput!)
                    {
                        bplusItSappiCreateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '57a07484-a7cc-4d98-8447-1b7a30771d47',
                        tenantId: '4ea53cf0-4253-42b5-b7ff-460ba94e25f4',
                        name: '2t8jqbi7139buibpp2j10xrh2uzingy97gmn0ytz0vi0vv8lra4zzmo6fef9h7jgrxcpma3uddjq6pb3j65dlauk172lqhw7u95akop26g4oq7pfcs6ky93w5yhhugty5ikc4axqj2ec7dxywsde55td5ffr4mskd3m3bqtakhzhzbu2fbvcme63jntr524ndk5fm4bpq3tlwn3vsz6iuypmh4e1asv61ork867ck2p9sku6wm5x4k9zdm3uki6',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', '57a07484-a7cc-4d98-8447-1b7a30771d47');
            });
    });

    test(`/GraphQL bplusItSappiPaginateRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateRoles (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateRoles.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateRoles.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateRoles.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindRole (query:$query)
                        {   
                            id
                            tenantId
                            name
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

    test(`/GraphQL bplusItSappiFindRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindRole (query:$query)
                        {   
                            id
                            tenantId
                            name
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
                            value   : '6c68c5e4-ee23-44b4-855d-20ac92d58daa'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('6c68c5e4-ee23-44b4-855d-20ac92d58daa');
            });
    });

    test(`/GraphQL bplusItSappiFindRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindRoleById (id:$id)
                        {   
                            id
                            tenantId
                            name
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

    test(`/GraphQL bplusItSappiFindRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindRoleById (id:$id)
                        {   
                            id
                            tenantId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6c68c5e4-ee23-44b4-855d-20ac92d58daa'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('6c68c5e4-ee23-44b4-855d-20ac92d58daa');
            });
    });

    test(`/GraphQL bplusItSappiGetRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetRoles (query:$query)
                        {   
                            id
                            tenantId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetRoles.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateRoleInput!)
                    {
                        bplusItSappiUpdateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '1c200039-769e-472e-ac61-843dcd4b9155',
                        tenantId: '21fc280a-c767-4a32-a120-8be4cd87c9be',
                        name: 'vwrlrtyitvc8r0o4voorh92g3kg9mtju17bus7jl8jst9qq2kj74t1kib7ne8zzycpjsphulddremyor7l2l7cuxawyytlwfqwuw4tfzdg7umczywud73eumamijfklk569pjt27xf3hipv6mko99x7b8fmji96uav4ju56sxdj1tve4zakq7ai9u7mdjhp4n3bcuxdfzz5ysqeywmaobatz8lwxm2i1u0jduwhl4o7zs0gjrvbszf19452kea8',
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

    test(`/GraphQL bplusItSappiUpdateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateRoleInput!)
                    {
                        bplusItSappiUpdateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6c68c5e4-ee23-44b4-855d-20ac92d58daa',
                        tenantId: '4ea53cf0-4253-42b5-b7ff-460ba94e25f4',
                        name: '8sir9ummba7w7pw1q13jh4e5wjcjfgtwwcyrhhbu69ft1d2njvwb52lb2uq8tpjoi8r5alwb2fzx6zqoj5pdibbbadg1qicjm2gszf5gaekqaxaldjeybnhcb6bf71vl0evix5qcjm4r46tgttmzyglx06va8bxkhv5dh97ms3if9aiofn6yy1451afpmn414fwy66q82gpd0w59aiib6fu3ezhqi81ag3bt037iyp7ssukltfm0rx35zfrrh6a',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('6c68c5e4-ee23-44b4-855d-20ac92d58daa');
            });
    });

    test(`/GraphQL bplusItSappiDeleteRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteRoleById (id:$id)
                        {   
                            id
                            tenantId
                            name
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

    test(`/GraphQL bplusItSappiDeleteRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteRoleById (id:$id)
                        {   
                            id
                            tenantId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6c68c5e4-ee23-44b4-855d-20ac92d58daa'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('6c68c5e4-ee23-44b4-855d-20ac92d58daa');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});