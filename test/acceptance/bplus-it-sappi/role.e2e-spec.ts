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

describe('role', () => 
{
    let app: INestApplication;
    let repository: MockRoleRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
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

    it(`/REST:POST bplus-it-sappi/role - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '28186aed-f2d9-4ca6-870c-36d994e0fd6e',
                name: 'iivprocscoflcc4upd25l6nenygujb5lacun7m9ol4h0rknms340eiwdbpxc5xn1ib8ywk6l34hyxbpqp8icvjfbn34s8ke4yjq1021lr6obcs4887wjktk50rzib5pfsco8j8dragy795j30w7xodqqdcbmhffgqa9ibxt0b656t2jsgdw74vjk9ulgxamr94g2ovzuwd3mic07ad2ojbix7niw2m2ynwsr4ixbh3ylgaui7m98vvgehvcfyh3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '28186aed-f2d9-4ca6-870c-36d994e0fd6e',
                name: '1ywsqwvi5oyjrhtwvpkepzfa1tcf012ybept3g5foqf5sudzh44cufds4ks62v7du2a5htnrhjlfz4amc0px1mkxn3kgkeh15042njwktn785nro2hiiezh23xhmpqraqitrrnviwplol110yyh2uqh6zswrycywao31e2u9qbhjlkwwjvlyon5q17vz6b94a5mcc3we2aksb2ttu5i8u9ud7h6td2af468oceji5ads7n9zuw3d5qa0gq73acw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62',
                tenantId: null,
                name: 'u3tz0lfc12gmgnavzkn0xr6ziq9e802ykqt9k0ynej5s2c9uc5zp4m1mrb4f6847kaswfle13k20q0z6jxdlx3xhpudew8ifk2gcla09c2lbpuv83djdx318h3lt6nxwxkfxukt82pn6b39evp06pzuznwv1tairuh7gb9keiebdic2dv69ddefn3uzp6pc26s7e6fsx6zhrx7anvgc21srkllqeoosjzlayul8tk339t0j3m0q1lyi03mz0m5u',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62',
                
                name: 'u1dqoxkvxopgxdpuo89m4lcqeel0jpy64ueadrpwxab0t448ynb92ztxa9isw4icb07ogrwscxb2wb658a2onha859knxtelplyksfy1l7wxe7ggj9v4cv3xd0hmftbw59rc709o2lckkz04t19cet92527e429tvsqxilnu5u0w8uvsp4zcwhdz5thboya9e47vvk3bbsbr3ipi7wqzksowxscyyncezfjacea040ita061a35q9kv501pwewj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62',
                tenantId: '28186aed-f2d9-4ca6-870c-36d994e0fd6e',
                name: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62',
                tenantId: '28186aed-f2d9-4ca6-870c-36d994e0fd6e',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'vsl18fekuah94ch6qw8bbvj012axpw08c82d4',
                tenantId: '28186aed-f2d9-4ca6-870c-36d994e0fd6e',
                name: 'koivdr32cm1w6yods6ra84yl3szdczh8lo8o9gg2anqcfvv9t1etos28qtygdigzdsbbl75vr014o6xcmo06elnkbmdhr9pmgkge9ef2e1rs786dgqn75q4u8l0j7eck1zfn4gjdez84cmjt9p542hsfdgl9l7ewgek0ftjgxwgyyjs6n72k1bwysms3gdwuziisukm32uayboawfkchq1xl75wntblruajnvolzken9fvlt2bl3gum9nik8yf0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62',
                tenantId: 'ogy5kcqp2o3ltg5jid0z1r8l3v6v2w1da79d2',
                name: '1ha1biaaaib5zrxyrjvc3x0dn8baq9cary3colxemxadwoynpcznkek8rks4tk4rsy568zmxv3nas32tucas8i6i82z22n6ubh7w08goge26mnkexhjix1lyxq519iuiv4eezkd4b4pa5ofoiw8wayvmvgd120xgndqtia2zm76zizweul5zqdlmmsy9hlatr7rcacx8dvfmldf0vnhgarlkvketj0jne3qil1u331jitoiod2k7vrmlgo8zegw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62',
                tenantId: '28186aed-f2d9-4ca6-870c-36d994e0fd6e',
                name: 'in2hm7kclnyepxih0dsr0ner2mclwk9pvtas0vxcv949ft3k0uj3d3ku6k3dyk95ox8nvi86kykcu9soetbymhtiy6ajtr40hv94vigpkxdk1ppdbgusgww4m04nou254gaqcrahyyjm61t8gcwo8rsiurc6dqwwe9yiwrczvlpfmvduvgthccje8qdz7sbzu8uoxyz54tlcbo8nmzlp5h5svzxjon811pijpojrus89jlrx8nib4fto0z58l9aq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    

    

    

    it(`/REST:POST bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62',
                tenantId: '28186aed-f2d9-4ca6-870c-36d994e0fd6e',
                name: 'hl7shpgvzjrk3tm19ng0gl7z3kqgkkg7ir5oyhx4opalklrltmopqxkdtqzaqota0g622w709i1nujz6pdtv7dltsp3957prrpheh07ggosxhdlqsycvu96u2uxims1rpl2h1p2zrasc78ije91okznbafgu90s5gpb513fuyqiosvd0ekobte2dovyukldy49ch61j21w7aq7malq2men4wdsaudh7jfl7xgwiyw3lkm2b3rjbr1pw0zrd13sb',
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/roles/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/role - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/role`, () => 
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
                        value   : 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62'));
    });

    it(`/REST:GET bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/d247bdf1-4cb9-4e35-be80-5a4bb5acbe62')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62'));
    });

    it(`/REST:GET bplus-it-sappi/roles`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd3150011-c6d4-4f79-a77c-61f7195dd937',
                tenantId: '62f77dc0-472b-4dd6-a819-7be5d207550c',
                name: 'kqlhzwmqn8lh8mv5qgz4axmdajp8i47xq155tstjw9u5vusjae964h0elo4wuh8zx7rk0t0xr7o3xo3sya2k8qlq75w2tn5stll2gk8rlipthmgl9wvcnq4joxh9gm1dj605ns45wh1zt50dnol8qwcgw7kiv212zmr6xef3oxk83fq9q1goykdk07e1nupqgy1js1wtwmjj6pmxxgm4lyr6yb6o2zfnvitfb7jv69bqojllzobvkk605j5grv0',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62',
                tenantId: '28186aed-f2d9-4ca6-870c-36d994e0fd6e',
                name: 'o5to47y1yib87fartrmfgppujv7rj05p4ix5k4invnhl60qoub0h35edi4boeix97120q0a17rwp8mhmz3g5ri1ka55sc6pv6ymm94prbw2fa6m5zev0ulgbx7fvxuz6ap6btojxu78vrhu7tpk0fp6av8nrpqnkr1pw4nwvvknl4zovo2xzao268e4chooyhl7qkyrt0wtynye05m1eouoi2u07cf21j5lqu9yo1h4e78agjz3mmqgcpwo02n0',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62'));
    });

    it(`/REST:DELETE bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/d247bdf1-4cb9-4e35-be80-5a4bb5acbe62')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateRole - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateRole`, () => 
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
                        id: '6fdbfc63-bfc2-45dc-bc65-531cd366cf2a',
                        tenantId: '28186aed-f2d9-4ca6-870c-36d994e0fd6e',
                        name: 'brbdhgof54w77cq0k2cvknacz3xtk0058g23ed8j111yzr9e555cpd6970djunrzjiuv0cgtrnpsnl2m7r9nuuih9fjvm7l4aefbsupufmwf3re4wd9pkr190y0hrnqglyft9xe92ksc4ytro7dys6c4eau6svqxylr8xa65k0j0fvru17g2srda4a32fwe61llmg9mo2rv797aulp167agrdaphc6nfqto1gq5f24yr1hqght5d198x6t4yamk',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', '6fdbfc63-bfc2-45dc-bc65-531cd366cf2a');
            });
    });

    it(`/GraphQL bplusItSappiPaginateRoles`, () => 
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

    it(`/GraphQL bplusItSappiFindRole - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindRole`, () => 
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
                            value   : 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('d247bdf1-4cb9-4e35-be80-5a4bb5acbe62');
            });
    });

    it(`/GraphQL bplusItSappiFindRoleById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindRoleById`, () => 
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
                    id: 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('d247bdf1-4cb9-4e35-be80-5a4bb5acbe62');
            });
    });

    it(`/GraphQL bplusItSappiGetRoles`, () => 
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

    it(`/GraphQL bplusItSappiUpdateRole - Got 404 Not Found`, () => 
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
                        
                        id: '95c61a71-bedd-4d3d-af41-e715a2d6fac4',
                        tenantId: '7627fb5a-63bc-4a02-8e39-b472076cd066',
                        name: '1tzrp7vk7bnrf7j44utzeq50frdexrufto0qwcjcbhspp4ws801mzffbi12wvko7odaa0job7rlcvewcs1ync7l24pe6oq6e79niujp54o87l5o9rg882tpx5n4w3bb5ybyweo2dyq2yrqret1hzfpo8pcxs0zpmiotkbcepn1tp4qdh4ix91r4g48xay72u9x1v4ce2tzr5dyjg4v4tsxuiwcqpcjpg9aoof7omznjjz9t013mybbtwk5hl5fn',
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

    it(`/GraphQL bplusItSappiUpdateRole`, () => 
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
                        
                        id: 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62',
                        tenantId: '28186aed-f2d9-4ca6-870c-36d994e0fd6e',
                        name: 'hre9jn3u1gryi0wki0o1jq95ml0lkva8d53lgwa3oruvu7ygiizzcq5nnd5ysgvnzouiamtsxskfp4nimw6jl9oc0yv6atofypv8iz6s90j3ywf68g1x32g1fyn1zle414u6hu3mhovhk809bdf5vr7cqb2ezaozldw61797ok1av8u0d0b3xf1ezslqcaye8kv4j2dqbw9xv8fc8ce0ygz5ypr12o99lk6tvuj0sfcmbljn3totdy9qxt502el',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('d247bdf1-4cb9-4e35-be80-5a4bb5acbe62');
            });
    });

    it(`/GraphQL bplusItSappiDeleteRoleById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteRoleById`, () => 
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
                    id: 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('d247bdf1-4cb9-4e35-be80-5a4bb5acbe62');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});