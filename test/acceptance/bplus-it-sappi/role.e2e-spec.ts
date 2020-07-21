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
                tenantId: 'd0706715-b701-4bb1-9baf-372f4a71accd',
                name: 'q1xn0yal786rfmn1bz6dp6cxtiv04k18ioltpoc6kyrwba1vw3scwkxlzncy8jvxlvzjumouimy9wnqsy2znpzveuoa0jwvvuigqmqse67k1xlhet2ex8l2qmzphv446bll2pbqqymllmfj0r5sfm2xoolcmwpzyxc27zhp8lesqqrcd6s3cffp2y3a82lansr9c86u7bsypc511h1n0cpeei1ekco2s03zxd6f6opm15nhn1p4qcyl301ddf2a',
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
                
                tenantId: 'd0706715-b701-4bb1-9baf-372f4a71accd',
                name: 'jtb0s2oaowpvvmxy5clqmno6rgkhpzsnszdc5o6h56gma1i2kj36ngqsjm63bwx3i6wisnw7aknpxzqydlrjeut95qquzg9qs4m0qejwu61sqo9yhk9nrbqiwxvk65xqsc54d51vby3d33x84bqnvxxfb19rsipccm9vrmiozenkctbotb5i2h66bvmdlqdsa7vw2dk87lemyo96ohqt5ipq29y8dnojd2xzn9asb30uwb97pmilpfxyfjw9xii',
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
                id: '8fd69091-78d9-4942-be62-d502744fda3b',
                tenantId: null,
                name: 'hu5vq0ccgivtq1b5ft5h70dlpbkna5d9potplfqy4xsl4w6yll1cl6vcqgkg86dlcw21pbvt7jznj7x34jx26vpx7fzng64ogqhyodrrq8ehyz6dd6a9vlb8x8qb6a6z4cga1lzx2n99yxo19yeg6xjfntff3kr836hf4fi7adqkpf0jt9zghizm1p64a7kh1tw1k4f7wqoqj0i0go200myfrexv21ylory7vr6sq7ce9gaign7u1cnjr2e02pb',
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
                id: '8fd69091-78d9-4942-be62-d502744fda3b',
                
                name: 'qebi5cv5i2q37vycrn2imorv2z3qsv1scum5ikmwz433m0k5gcr08qatgz1e1omyv5csfhmwu45inqxsareobvb5wepf5lxmhm780xpgwmkfofggp89jx8bivvg5rztiamx6z3ps78r4dn5uhpq5u5l4yf7m7lesmhm2fdy7grl37gzqsmkm1zy5gthx1sp6ut7kmnt99ihulmpr9nwev5rwqvln2h3v9d8fpza6gdj02c4w6rs254mendlwscj',
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
                id: '8fd69091-78d9-4942-be62-d502744fda3b',
                tenantId: 'd0706715-b701-4bb1-9baf-372f4a71accd',
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
                id: '8fd69091-78d9-4942-be62-d502744fda3b',
                tenantId: 'd0706715-b701-4bb1-9baf-372f4a71accd',
                
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
                id: '6g9uhtt74375te3exji0mehogbqao474mqnxy',
                tenantId: 'd0706715-b701-4bb1-9baf-372f4a71accd',
                name: 'pmdszq37t9an3yap794wp3jajyfv8cqzt1tutmtdfbc917a91dbu41kajv86cmfejd59hgj69v30q2bdjl2io61fq0urzmdnoo6u1one1neg4gzeudyuc9450hmudo56ur51rg67iccks7o6rc0q9b4n4c3ucds971nsmwusd56mx2sx59wtvlsg3clyh5s87r6b64d3auhgd8kkh1p3ivvuv4oumbtshaertvbvq80pnq3osh7hd97u6h3csu6',
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
                id: '8fd69091-78d9-4942-be62-d502744fda3b',
                tenantId: 'nveyyox17iowr7l02yb41sbm06j5876j2rtvw',
                name: 'pobkxi4kfp473p28n1ur0jmmru91t6u50ggygu54vydf91h1teg5a5xejk1w37d67yj9dyobwrcjeid3lj56habpoklrckxwinf5v69wxnir3d53wwj773z0dbzmz05d9tugotnwnbko86tmmng11fvix5s9nza0gd50jbcd13o81vd4qmvvasm1tjt91jvczfp5ouopbdmnbyx5nzoo31ctfwlh4izh76me592657454u1i9ipyz2nayw3uqig',
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
                id: '8fd69091-78d9-4942-be62-d502744fda3b',
                tenantId: 'd0706715-b701-4bb1-9baf-372f4a71accd',
                name: 'pwwu5vo8mtwzk8vihstw3ysh4coh9tp3bd5hexbp5vqlrymqvj2lf1k00b31o1iia30rvv5d407qwx26wb0ia5re93rc6m08xp10t1ei0874gptwalx02jkfp8v14wyu6ojs2lg2uf490ptsn0d9y1o5d8sxognnyc66vhxly75x4i8qiwzvdk9ik455f55t1cnetcnk46u166io9j9e3w7o2g6v957waf2yid28bqqdppkb4e185i4tprw96uvp',
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
                id: '8fd69091-78d9-4942-be62-d502744fda3b',
                tenantId: 'd0706715-b701-4bb1-9baf-372f4a71accd',
                name: 'h0jovremip5nlmnn4e2tz9lmidca0fnb7my76th7q00a5vpmb9ngy5mespx33k3monlzw0g7ol4jyy5tdovv48qec25zrq2toriin6y164x6xe1i62m0f8m178wrvsd5e4w9q6i6x5n1odxhw5w87w8jasz4pv57gjc146hggip3wbqhpcytgmy5ab69yn83l7dw7tx4a3azlm5vdtptxkygzku4slbzfy0cmg5l393k3x2remo52azohia8f6f',
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
                        value   : '8fd69091-78d9-4942-be62-d502744fda3b'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '8fd69091-78d9-4942-be62-d502744fda3b'));
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
            .get('/bplus-it-sappi/role/8fd69091-78d9-4942-be62-d502744fda3b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8fd69091-78d9-4942-be62-d502744fda3b'));
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
                
                id: '123817b3-d2b3-49b9-929f-97791d5b4a81',
                tenantId: '6122202e-75b0-4ddd-a6c7-d7c93f9ec00e',
                name: 'ppaf772zbujycsdjshjy7qtjog4ewue6q8grjhenxm8pcc7pbmufoy114we1qwbovfveoomseqgjwflm18snmdqfnzmdm6jixusg927kqiapp10zj2e7pn1gib5vf1xsv3sryvu9a1web90vtiw03a2x21xljg1ug8df4z2ncc8ffiyrhn96oagu4zlh7jiyj9pftakil2bsxp18mpzxtjlprrmyj74wymxsg30wrs7v5os0sdjulebprr5pxgs',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '8fd69091-78d9-4942-be62-d502744fda3b',
                tenantId: 'd0706715-b701-4bb1-9baf-372f4a71accd',
                name: '3tqrv9ef5597162vese340gcsggvyvsglwuua1gr8eqni869cuncxkrwuyqxr3cvqoy3o53qzwb2s7v4vmlrwf9zb0r7tcf6tlkt3zdotebzyo3fyiboc9htug7gpimwaou9g2gw8ry0fwjfukxg49sl6s47qwkwo6f78g2jxjpaobinuoo8s1e1jfj82mi1hbc65mhjvh5kfu5atm40r9rl9kc7d05ce24wc9na389bmavei6rabfulwroqgb4',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8fd69091-78d9-4942-be62-d502744fda3b'));
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
            .delete('/bplus-it-sappi/role/8fd69091-78d9-4942-be62-d502744fda3b')
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
                        id: '42b6b7fc-5fd3-4c0d-a2a0-1b5343feebbc',
                        tenantId: 'd0706715-b701-4bb1-9baf-372f4a71accd',
                        name: '9rv7wzskrvlcivho058jt5s0eiqqxopy2w3o71bmiq8o4q9y8jru0sg7i7mzgs5r1h0renuohgxbhvdwfqar3t17ejvv8rop2xcu204lv4p1gypufjjj9mz6ctbwlbanpqjetqbvavyytpl180mi2976okz1x377ojnss6c7ptwiam49me648ue251wsw0fmz9vwck8pcysfsofcinpnpms23au3pb32vep94h05mqy9tota32jk3redfln2u5k',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', '42b6b7fc-5fd3-4c0d-a2a0-1b5343feebbc');
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
                            value   : '8fd69091-78d9-4942-be62-d502744fda3b'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('8fd69091-78d9-4942-be62-d502744fda3b');
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
                    id: '8fd69091-78d9-4942-be62-d502744fda3b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('8fd69091-78d9-4942-be62-d502744fda3b');
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
                        
                        id: 'd187a0de-0a76-4857-b4c4-9d8494ea6a1a',
                        tenantId: 'da652b78-4867-44c1-b2d8-b39a2d8ffa9f',
                        name: 'trpvg6uuukf163nlzk6pr06w4ab4xw4823lsd6t8yfn4o98jut1ppwa3u9fq2fr73rh55womzpj4327qsldwig2jex4q812z6zz9ji2mp8ubvr1bkkshs97upigtgjturars80ydao3wmlqpkdw7ivilri4cv71a2qpz5333u0359d2tt2lji0v0aem50qnr34wr6cx56zb5dtwba66qf8p4iajbt7ejguybkpf7ey85r39ahh3p8x793a3xi6n',
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
                        
                        id: '8fd69091-78d9-4942-be62-d502744fda3b',
                        tenantId: 'd0706715-b701-4bb1-9baf-372f4a71accd',
                        name: 'c94acwxzoticqi6jx6wt4j8zjk47h8lyl8ger8tgu5zsd3taa8t85ex4uhljso3iphpz7xifpns5srxrm8jvhrfjztbb2mywd6ypp12ut4bx2tum2dy81uuu559xltliwfrr8333f0ewu1j7kdinr5ek72cnd11zdz13cdq4h5h2aoc2mnf5u3l7iaz1fwxke1rh2dwj1085vqxa8ca3kqarsj9qvxcu73ijg1xz4yi53gwap4r7zgj7nreeuzv',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('8fd69091-78d9-4942-be62-d502744fda3b');
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
                    id: '8fd69091-78d9-4942-be62-d502744fda3b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('8fd69091-78d9-4942-be62-d502744fda3b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});