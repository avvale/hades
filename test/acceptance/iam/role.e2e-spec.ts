import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/iam/role/domain/role.repository';
import { MockRoleRepository } from '@hades/iam/role/infrastructure/mock/mock-role.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('role', () => 
{
    let app: INestApplication;
    let repository: MockRoleRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST iam/role - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'ql57unsh5a452r6fhtlz2j9lh6qaabyrszytnjzhkyjwv8wwpmrae6q3pnstz49melhl5or3grgjg1yn9iwdeecu2oe5wjsyh79vtp78836pabue6ufnpouj8bll5gzmovoi75qc2yxiucqitqsii8i13o2qtf3hf37z3f5e0zp48ssypa6fmmnxyw455524cry4b3htsiu7knciigk65ajfsz1puun7fycbgzozo21ccnmlqrycdg4og0i0cdo',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                
                name: 'q7jb692rfbwofwsvy4kx9b7dlkiw21oicr9ne3tg6nrwe9u2u6ckdqp8mwuio3qy6m8woo5psasg9soqijfe6ejpq09w5k2kfui97jde0yrxbahesvvhi7d0fq6rkdt3e853aoq1h7m3a74dyy4woa9htbhs9r9162zojn9thosteqhxq3bq8neqs65zch5ld6v5rjmvd1qe1aa88177pqt07pm1g02keitw3hsnulu3wvvr1bfkmypo7kdv6f0',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '922e168c-712d-48b3-9f45-137677eba31e',
                name: null,
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '922e168c-712d-48b3-9f45-137677eba31e',
                
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '922e168c-712d-48b3-9f45-137677eba31e',
                name: 'gimy4k5ohmotvw8228k2zjd4i6fua08ec4b3ldzhous7ey84yukel91g0ik4wtw7dpr5mqajprkkbd8yksf00vmb3qb1khqlf1c8pwgkjl7gydj7nab3f0cj38nvmgvmryatt8ej73r7xispcu2ftl8qgbguw4zw1dbg2z283rv3vnyk1zsmhvpgzkaah0zwfx4du39xwl2vcbkiss7qb8hkjd6k54o7njhravmatx19vdp7j3u4e46vabbaob6',
                isMaster: null,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '922e168c-712d-48b3-9f45-137677eba31e',
                name: '3n7574e4q535ov042rkuqljjyyzlexb63qa5phtgdqv76gwgzxeoh0usblig51asurvvg9ef1wg1oabtvt7gl8pn08sl09okb36u0uoog8rgp148e4a6d6jt3766zc9ml6w3n4m30e6ql2ofrsyw3e09ld07pbz8mbg1yzjy9p1ru6z7mf8h2zfyht37g1crxm6hbg398589l5e1n5cq6x28fgwl9z2az557iojwlc45sancf1rprbthenxsk0x',
                
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: 'wvs7pim5um0voj65kdscylkms927pnwishqc2',
                name: 'zatd6yj4hoebsj1spvklov2u2q9mfxackt3x0zf9al26310jbla75mb993c92i9gfsu5ocqzxe8rkx9sqikgy7swan1oh250wifyrhiafps12r1r67yvjfs7vzauqns3w86hfn18242mjsootd3qzu7tvg29qauennurok4zqwoesjnnbqv8qrt8aahu7lldrjvt2yw7478piptf17wrr79rfegtw7gel384ex1mf18kcp13eaf57axhqdv2gs1',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '922e168c-712d-48b3-9f45-137677eba31e',
                name: '7401c309gfrsi0vpw3nn826b4eluf3oimj767t5mdk9z02icmguavxbsy237w4bnfr4mjyxvytin71uqzeanm6bqim05v0qgyglbg9drg10olgnmdn8t9qi2ksrqquq5cotuuv6ot971xwxc56pxurjhdf0nmefsxvzif742vra7wv7u0uur15wyl49yl4as0762k0p34hqxvjhwr92xo479jgz1ftj9w5shmh4pu5wq9hikr5hx56l71hkogxor',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '922e168c-712d-48b3-9f45-137677eba31e',
                name: 'axrczwavdwwo43od63h2mt5cmx12631dzsctmjc6ldricshpl57v9a2g2uhhzm78todqe844twf5psxjspj33bz9wtau75s44lfq6flq016hi1vctd7uu3rjsgf2bc7u7vapqyivwxp0r8w0tdadz47ln3gvff0sosebfopfyvp2u9j1fumx8n8ca2uw58ak4hh2o4apsl21i06jjr6v0premhc08xk15tr7ydonkks5w8ow7shhv2fgn3klytz',
                isMaster: 'true',
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST iam/role`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '922e168c-712d-48b3-9f45-137677eba31e',
                name: 'cowmg2f3kjtxomr80ymkvaurwqrm014fd1rpz7qx2iyisholyhfpjxkaxlviq4nxzlh9kzzhfs1dqwos3vucmz6ihxw608of06revlh4e6wm81rrlvlwkp4xaeja2qyg0kgvi0v85u5xrok3ah6t9qmc4xgrice8i0lff6mnofrrj1josi5a8odc8jmvcbbfde2zc2e9fhv5r336j3mvegbc0hl9zfb61yon55z8ivvugtzno528udky936z555',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/roles/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/roles/paginate')
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

    test(`/REST:GET iam/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'f21c4930-3a2a-4470-a548-3eadaa71dd67'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/role`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '922e168c-712d-48b3-9f45-137677eba31e'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '922e168c-712d-48b3-9f45-137677eba31e'));
    });

    test(`/REST:GET iam/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/731c3fc2-eeb2-4f3e-a9f2-373ffb5903d9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/922e168c-712d-48b3-9f45-137677eba31e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '922e168c-712d-48b3-9f45-137677eba31e'));
    });

    test(`/REST:GET iam/roles`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e0a0d31f-f5cf-4982-b3c7-26de5345c69f',
                name: 'rjjb5zi27pv1v3qotb6i6roukca3xjatnpkims3skrym8vcpopuxdfogavcsnjs2u5tqtz1n1aiu5995zxetzjxzqy7r39grp7nm3mffeym9dtm819b9lbj3zl33kr67isfuvlly14ocpalyfl47mhb393owmae56rowwr1etqgq6nc32srjfam3mnliscwf7762445b7t38pgjt9b9bfdl1bb8xlritatfek9xzc5rkjkeqmt8sd1esglpho3y',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '922e168c-712d-48b3-9f45-137677eba31e',
                name: 'cyg4oxzmxnfu384semcmd7fdo1v63ushdv51js88yq470t9zalhvd1t0sz4c21n53gqpwhgen8eqjchpyfrufaijq7imjnijvhk32hcjt631w1udr86zou1d9azm3y031jejlptd7tirbh61sfe0b2n0vtpzd3dhewxopzxxrnyx1yo05eexj6p751gw06clpbdyigqb03wjthgufk5gwcr5tubvwmu6ezptw133gsviqq0fexwt902ocefyzan',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '922e168c-712d-48b3-9f45-137677eba31e'));
    });

    test(`/REST:DELETE iam/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/role/f25ed5cd-729b-4c5a-8c48-967c0d5e0a59')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/role/922e168c-712d-48b3-9f45-137677eba31e')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateRole - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateRoleInput!)
                    {
                        iamCreateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
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

    test(`/GraphQL iamCreateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateRoleInput!)
                    {
                        iamCreateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'f1ef5e95-6578-4893-a7ee-824af67092f1',
                        name: 'stsu72a2hv1h27l4rsfjgr2ssmm4prx0ewpjtewkwu9nbdrwa131mbdtt68g3kzpyzm0229r583onco64s76p75thhjn5zoa4r14ciw9pzrhmorcx8bfyipim96f8jel3984jq0mj1qf6i12a4v8695h78p1xkcqq8ztdej3va0pan65mxjsrgf2nz6zjo10q3dnmidn6gre37likjz62fd6uvw0hhsm07zhhrzgvdic7mozdzy4rmksc45c8mu',
                        isMaster: true,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateRole).toHaveProperty('id', 'f1ef5e95-6578-4893-a7ee-824af67092f1');
            });
    });

    test(`/GraphQL iamPaginateRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateRoles (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateRoles.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateRoles.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateRoles.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindRole (query:$query)
                        {   
                            id
                            name
                            isMaster
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
                            id: '9ddfe981-c082-476d-8ae8-15a62b97853d'
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

    test(`/GraphQL iamFindRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindRole (query:$query)
                        {   
                            id
                            name
                            isMaster
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
                            id: '922e168c-712d-48b3-9f45-137677eba31e'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRole.id).toStrictEqual('922e168c-712d-48b3-9f45-137677eba31e');
            });
    });

    test(`/GraphQL iamFindRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b381f5be-f4dc-4886-b44e-a13f5126bc85'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '922e168c-712d-48b3-9f45-137677eba31e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRoleById.id).toStrictEqual('922e168c-712d-48b3-9f45-137677eba31e');
            });
    });

    test(`/GraphQL iamGetRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetRoles (query:$query)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetRoles.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateRoleInput!)
                    {
                        iamUpdateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6ef1e056-4262-47c6-9db0-19c125e2a10f',
                        name: 'gtc05yf72lfjx3gajzk9urxf54pszgmg5vinz14sk2mxd5j793wdgm71w7k50r8ubu0ur7e2x068jss0jrgbtttrajbgz7t3969wkny4u35awe8khev40rikwr433bxvk9wl15tqiebzu41acr5ixrx8qx6o0plkt0um1e8815rcrixa7m555j6zbkrr8em5f2v5fwi1e9onebtszs2599wydi1aazi07t9e8e6qskpichggys7h2llafyh8imy',
                        isMaster: true,
                        permissionIds: [],
                        accountIds: [],
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

    test(`/GraphQL iamUpdateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateRoleInput!)
                    {
                        iamUpdateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '922e168c-712d-48b3-9f45-137677eba31e',
                        name: 'susjge7db24kjg59czpwz0nv8yzw86opbvb2fjzjq128z7uhrp5v2mwgcpk4r46x4450pmgrndh15x7h2fckaidjtx4zzma7efwfg5cqzvdbv2irdq9rnisop4yxfrrtm956q3db804n6yag5lav9otccbu6qf0pmb4lf2h60c63cjr2lph6x6wza6hwsb14pp0wwcwwmgjugbjs4ye1iey6dz771gmaib8bbzowohn4ffhm21rpvt95h8hu32w',
                        isMaster: true,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateRole.id).toStrictEqual('922e168c-712d-48b3-9f45-137677eba31e');
            });
    });

    test(`/GraphQL iamDeleteRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd01ff1c4-9b77-4511-8b59-8d7efd520758'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '922e168c-712d-48b3-9f45-137677eba31e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteRoleById.id).toStrictEqual('922e168c-712d-48b3-9f45-137677eba31e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});