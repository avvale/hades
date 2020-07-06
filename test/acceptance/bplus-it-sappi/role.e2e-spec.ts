import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/bplus-it-sappi/role/domain/role.repository';
import { MockRoleRepository } from '@hades/bplus-it-sappi/role/infrastructure/mock/mock-role.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
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
                    AdminModule,
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
                tenantId: 'a35fedca-15dc-422a-9a50-029d18c9764b',
                name: 'm3l54vktq5r5qrn1dhh9mo1kmzgtlqqmwkgrteq07tzc8o9m19ovqpdj8tweqv3cw9qsnqd492ev006ov6xprrek82n28q55ry4f0bey2u36f76kwwv6z0so9qk8sjyzvxzymfi42xa73ukq4iaybsxo31nsgjs9aes1v3qnv4fn18nnf6we9wmm9q028vk4fz8ltmjfxnn6ctoo03y7ub1fw4f7zx5s1bntah6h2d7i9ne04db30sjn4q0mhxg',
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
                
                tenantId: 'a35fedca-15dc-422a-9a50-029d18c9764b',
                name: 'nrsdgmmggncm0i1r75olbki3izb5w7izjyudh2lw2njguuyb0mjs292gmfexqbbq4uw2pa73prpi7eivqzgz8ukd6lup5yexweqgbsyvl7tsm3xjln4fr8xnkz7xmbu5ssd5wjvje28w6zc6r4crv5d7uzqnzcqsg3osfuj1yopj17fhixl2ecrjsjg3icvuglbaii5atd2r6oe65zpkb4695uqwb7qzgcu40qj2khb9iij54w6sc7dp2tbnrpt',
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
                id: 'ff8cb54d-0a91-475c-b0e5-1991a725d1da',
                tenantId: null,
                name: '8jf35blbnesyyblvx7iauxyvi6ig1du2g49fp7m8lh6wn4jjwizzy31xr15pldioh67wf6uufczw5iwqll6sd7tlomp7feoolq6fkb8n98hjwcqbc4hlw5f3gc03lzafcnsgulohroxk5y7sds0qg0zs1i1y4q7jedk3toxx81oagnsoqnmzb3gypjbff4woun44yiknc8zgm6m9bb8i6wndygj7ubr43bv0tonkxfa4xq4oja2a2igwzw3mu04',
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
                id: 'ff8cb54d-0a91-475c-b0e5-1991a725d1da',
                
                name: 'xj4hsoy7a437eqmeutefl430chl101tcs32dmcqwitw8ihw598m6lyjd4jjoriiq2zbj8u4rm6z0zbx7rfhenfc197fnm91kw02qy7lhuyl3t9uzjwd9cqqf03akkrmfik6hqxv3m491ntryzyhwug4e5odx2yhoxcmgmbyjqc8obst2f5l38e2vx9z5rmd5tj54qx6i0262lwz3ekogckc8dth37dmyr3udtilf2y5dku5uf5gtbd8d1gwerx6',
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
                id: 'ff8cb54d-0a91-475c-b0e5-1991a725d1da',
                tenantId: 'a35fedca-15dc-422a-9a50-029d18c9764b',
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
                id: 'ff8cb54d-0a91-475c-b0e5-1991a725d1da',
                tenantId: 'a35fedca-15dc-422a-9a50-029d18c9764b',
                
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
                id: 'w4viwj3mxcr4pccd3mgafkopz77aom66742wb',
                tenantId: 'a35fedca-15dc-422a-9a50-029d18c9764b',
                name: '794de7t2peabvfd4abfepzuy0y68zx8pvgbxbk4zcpjp5gn2kwn66tn2xv46v7v6iwfwzygk7vt63pu9x2458b561sidld71wtcnzmh4jglsoiky0nvtop8s18f4a4x0bs0yu9mwc2qqnnhveylnygdf6w2wrhcezesqia3ulap1z10bdl0q0dchgrfrvbpburw42jmofgwmvkw609hmvkfqumi3hhgkb367mw57nzj9ql56jsavvif690z3cfq',
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
                id: 'ff8cb54d-0a91-475c-b0e5-1991a725d1da',
                tenantId: 'p6dukvuww0m58denjuhoohk3cx1zc7zyfm5uh',
                name: 'ane9s8jp89y8sxshm04923peyl6sq7k1qk16xkdsi8809cuctt2cehsfsnz9ftcqi6pak1eify01izvg0pdpedhw85ipte9vmicyl515ime1ob10ce2k1jnhh9hteanpuzpho3vas2fmgt4ye84noldjqfl3z7wweeuc1y2ihv5gwszlxdzilwm0sk4fnv441tk0aeazvqbd7v9pl45d4rk3ijzub7c4tuo13zgb9jbyw7zak16n2low8bo29u6',
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
                id: 'ff8cb54d-0a91-475c-b0e5-1991a725d1da',
                tenantId: 'a35fedca-15dc-422a-9a50-029d18c9764b',
                name: 'rbz0qbxvs9nypp3royhwh4pxc1vhrr6mvc5bfc7cddo0k20ktihk462kcgs28e3hu3hcaxzys0zabj642p4vxulpcunt78tjfidgwy4r0g3pvzxl3kql6jzj36puzmpi731mu4umfr95dwewcd4oghqklzilprk6rninm6igu8vle51et3lsbabvk1mhdgfxoczm6gic9ij64qlk9dj82mnwf4ekcnpseus7rkrfyhque3ffaprermr1cgp6l609',
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
                id: 'ff8cb54d-0a91-475c-b0e5-1991a725d1da',
                tenantId: 'a35fedca-15dc-422a-9a50-029d18c9764b',
                name: 'tnw0gkxkf4eh7us19py4a7klg1gpgc8q3y3n2els3kykit9fkodzb101l1800ssiazwf1e8mwsz0788o1do6ikxxakvw1t60909yv5ekak9u7rgpc45iccbaygsp4ba1dkzdtvw8rc425caha6b6tcrxxy11270czm8ajedomrb1ne55fqgc5e900t9du16iblbdyk1c3m7hq2saim0txlixtx7t28ikqfi4b30dyp0rr5jfnl8pghmj19vd0l5',
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
                        value   : 'ff8cb54d-0a91-475c-b0e5-1991a725d1da'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ff8cb54d-0a91-475c-b0e5-1991a725d1da'));
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
            .get('/bplus-it-sappi/role/ff8cb54d-0a91-475c-b0e5-1991a725d1da')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ff8cb54d-0a91-475c-b0e5-1991a725d1da'));
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
                
                id: '79ea7970-b934-4a7c-81a1-8750399d11dd',
                tenantId: '2b558325-41ce-4638-8e6d-d2dee0a81f72',
                name: '11i503pgyarro5u7883z9txxtdf8mx57f0rrzyys8jjzdvnrenqj39oineeie0jt66lx6s0h3umz9eunpwhf80gg02bjuwk1w6wgalna07zgbdcon98u6emdivybyj9si4rk9p7mp1x26umg26oyulddslokyx4ha34k3aqo0truxumimrvarnw2otfd7sx1xkec46cyoi453xsv6gjvmzjpj73yh9eyrxbr0meyv3eey9xfnulh9q9ginleff3',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ff8cb54d-0a91-475c-b0e5-1991a725d1da',
                tenantId: 'a35fedca-15dc-422a-9a50-029d18c9764b',
                name: '2bjetrrbtgj0sxcsggf3caioj3iunsc4jxmxijc6ymrzn2rzgg2x5shugif9zfs38ihag9hij36jebvuzopt5htnm1le991gbtvci7226w1tbt5jrlardeg30gmq3gtb5wxa0l41uielyc257ulon7hugjc3gg08vgobuhp1urs81klo1k5ymjapna0cejydvgfrlln020pqk107mt1wa5w51a249hy5cj2w5l4hxkas503l1h0ozjmkjeyejmk',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ff8cb54d-0a91-475c-b0e5-1991a725d1da'));
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
            .delete('/bplus-it-sappi/role/ff8cb54d-0a91-475c-b0e5-1991a725d1da')
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
                        id: '90e39a1d-9ba2-41c2-a885-812168834cf7',
                        tenantId: 'a35fedca-15dc-422a-9a50-029d18c9764b',
                        name: 'ab77vwdcl3dqr27c8abvajuuitv2kvv4jzx4l0b70snpchnz7wko8mtt7nah5az2w8bp69brccmgi06mww1r10wznyt2vc3qybf3y5edu8kv6bqg2z8cq921uxhp2tpqd2pbhjtyrr998sgqxfznxzyrkefzmbxyhy4oz97jouvdys4c6k1y6cy33vfblkcxpdqar5ne26usjbotr8rry7mcgt4rncqmx62pkoqj5dbowf96pj8g9yx300cqt8j',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', '90e39a1d-9ba2-41c2-a885-812168834cf7');
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
                            value   : 'ff8cb54d-0a91-475c-b0e5-1991a725d1da'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('ff8cb54d-0a91-475c-b0e5-1991a725d1da');
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
                    id: 'ff8cb54d-0a91-475c-b0e5-1991a725d1da'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('ff8cb54d-0a91-475c-b0e5-1991a725d1da');
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
                        
                        id: '2ad4d5c1-163b-4d6d-b8c5-af0cb2f4b53f',
                        tenantId: '40e66d2c-3cf3-4c7e-b06d-349bf150ab9f',
                        name: 'g33czer9mdvii6907kyksa3rw54k5kgqxw4rzv9ga6srkch4hzwg0rheokw00o671yytyqyrzoywd8nbxy8yie0zpwhugve4pa4rrjqmqm7npmo8u0mij8mguauyjh567szhocg7sbvz6yh7w4hl089heluh7xioi3bk7dqv3f9nvpidwp9ph522bsne3zwr7ldwkmmw7xpfnte3c1oinz2majkri18cz46682xgxvqy8257iwpw2j5kld9e89v',
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
                        
                        id: 'ff8cb54d-0a91-475c-b0e5-1991a725d1da',
                        tenantId: 'a35fedca-15dc-422a-9a50-029d18c9764b',
                        name: '90q9ob5ojby51r11921xiea1cgz3vy5g2qv49j25l8u2dgdk7u8eynvldtpx7x5m5rwto1rr1bod96b2z3s91sf0bswoyezm7mlo85pdcm0os3w9tct8wz2h1qqy3vahqyt5h3erc21eas3q3i073j657jjeohsavo6ooop6ddd7vobhf862a89irj3uoqql6l1opxsdzp2ucshedpwl8dve8x0k1zhyn0arwxoooyi5n29k1fyz74mkkt059dz',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('ff8cb54d-0a91-475c-b0e5-1991a725d1da');
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
                    id: 'ff8cb54d-0a91-475c-b0e5-1991a725d1da'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('ff8cb54d-0a91-475c-b0e5-1991a725d1da');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});