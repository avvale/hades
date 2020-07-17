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
                tenantId: 'd76e18ba-d0b3-48e4-bebf-0bb95a5c04b7',
                name: 'o9k96z0y55t0hqf789aqjddm01tm8y1bom773np94inj38uoiyilc441m3qflcd285l2n68id53ditygc1gcttacr9gbauvv00e94l27rczf5xlxnh3qqtqch1v1czgpn67419psp5r8ybh5ubaevt5n1h8gnufua5d6hker30w92w79k46y6os763ok9jxmngvx83hhsuptxrjwsht5vxsph53lbgpjeoot5zxshpyvj3mm3e24lddmp8kmria',
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
                
                tenantId: 'd76e18ba-d0b3-48e4-bebf-0bb95a5c04b7',
                name: '84o2mv5e9nczg0njzuvtcpamw8091f1nkve5a5bmtksdww529cv20wgvxgehj9689mupitbm87h5fceyzutvyq0urle9ztexyge1ku9o97puylyydzomr4vhbvk10z74js7aw7cdy62sdz26r02kqycvpaogyh3gkbdukvxm60oayfr82wm7hh9rt0q37nlhew60cie8up3ou5xmxjzgrxk9k9uqhnovxd3wqvj0c2hvgazeywn693c3z1ualmw',
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
                id: '3b1bb011-1b5b-4ff1-8453-d226ed4351dc',
                tenantId: null,
                name: 'nw9hkm33wjs5sovph6izalif3dre2lmsnq8v8qoqusprfv0jk8jhp620at1qamzd1iyu93dcsg39ou2mlii6hkcwy07i2anyjex80u3xpnvv7v4f4273zqscvn0xs138t6128b4oi4oybp6td01slgrwwwty9dq12n2v6b8c9j3719b2u742p7ef77wgk55jtdh6jcoccmlr4ln6lzwb91ui1vk35ts7u8pwkwk11utbuc0tiid4e1kwoutleou',
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
                id: '3b1bb011-1b5b-4ff1-8453-d226ed4351dc',
                
                name: 'm49mq60e9fk1o3lozknqjx72773ak3px0i3kjs3grzilbc24nkp7wluu602706qrfodxqwvl1awu9rgtqa4ei15nicbi8xxja8kzufzkjbdldislerabwvcwdnnxu74prrkq2dhe3o9o3ucixrmwpgfr83m0ks9694g0cyh43asqa9iyizh6wkids0ri3o7p3cdyymp7rxju0gh71phpwa1fnr9m9h12zm8k0yi69pzxlejeej7vgcjm801vpaw',
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
                id: '3b1bb011-1b5b-4ff1-8453-d226ed4351dc',
                tenantId: 'd76e18ba-d0b3-48e4-bebf-0bb95a5c04b7',
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
                id: '3b1bb011-1b5b-4ff1-8453-d226ed4351dc',
                tenantId: 'd76e18ba-d0b3-48e4-bebf-0bb95a5c04b7',
                
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
                id: 'r0o2q0fl1e0iz6p8kcn3dwvard9kn6uahtvwg',
                tenantId: 'd76e18ba-d0b3-48e4-bebf-0bb95a5c04b7',
                name: 'qv1q1wlal71a8h9xmc7pm0eoxtdmn1gqvxcioab18qo48d72c0sgr86k926ycfnod8ob79bvsfmhx0gn024obr87wfsp9gn3v68fvp97ggf9bwf7e6zizzoi84bjmh62k8oo1b1gx7u26u8a0f29n6ezzytm5vqffeomj52vgnyaaeuu779st0ejxec3mfwbuy5r67j8vn04phpnal6gzao4zzxgcrft2ey5eut9p9rj8tm51xu2vyl7wplvsby',
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
                id: '3b1bb011-1b5b-4ff1-8453-d226ed4351dc',
                tenantId: '92993c9ibrjrdbicojbmndjbpzmugnl83oywh',
                name: 'pv2ja4jnichrx3bvbqbdt6o0lokixynj4ytg1eejxk5zvu0tw51ehogij90pjlhv9giwp2ym150y4wyuhcq8v4ifxxjt5n2hbikt43i0gdaji5i943zekq9vqfr7r90ob2t9v1jo8j8ub21lx6ffb184bqu6169jkla84w6mz502ybfflpy7c0kh3dss0q83qxsisz7q07db8kop66lwk0p4klyugr850k2825ljrd7nkyyejxnvkb7lorbnj7v',
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
                id: '3b1bb011-1b5b-4ff1-8453-d226ed4351dc',
                tenantId: 'd76e18ba-d0b3-48e4-bebf-0bb95a5c04b7',
                name: 'kcucfb3ibuqfndcut5y3opoc1gjcvnjhgvzm26pxsjwqfd369j22d7rs4l2lfl5pbf9g9ba33zuhppfzc25q0kfifdxd20oflswr9jtchw89i2tnh5hsufpd6e9h4xu5vc0g707c56ljlm61cyzyvdolh6lfv4hrr10wjhab124jx1r9o4xkxxu2llkwp665ucgue5d2amaa2fc823m8xorgvnbx27d7o0xdi0uqbrfu7eq7kp3v3dbhmmfd275z',
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
                id: '3b1bb011-1b5b-4ff1-8453-d226ed4351dc',
                tenantId: 'd76e18ba-d0b3-48e4-bebf-0bb95a5c04b7',
                name: '76q0mdk58bvbu44tcei32hyh6v4hommlbev0wxhf14glvvb7k20e2yvhz2xyk8q5gtqpopy6hcmim0r987rgqojaum06tplhqfexn7ydo53c6c0h71th3pbpa7yoss66gyk596xys33icgiy52lkeykv3tf84yiufor26zi7cuxnqq26l64sd63kh4aa8tq7kygzn3w837lhve4m6181qr8g1rq3e6dyzp5p7mm914ucovgx20vh61xkpbi5uxj',
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
                        value   : '3b1bb011-1b5b-4ff1-8453-d226ed4351dc'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3b1bb011-1b5b-4ff1-8453-d226ed4351dc'));
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
            .get('/bplus-it-sappi/role/3b1bb011-1b5b-4ff1-8453-d226ed4351dc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3b1bb011-1b5b-4ff1-8453-d226ed4351dc'));
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
                
                id: 'b95f9402-60b9-4355-8998-fc5185102481',
                tenantId: '9ddd85ba-9c0e-461a-a648-1b26c55369fa',
                name: '98joaldjpll0lp7ou7q3mkdljjvfabmnc4y1ffkrpiwzazap3x7a0kz29fxytoz3paj414i8coayfb8xpamqs5f1pxwtmlzraz5fkdzzzyhsk6kk1dilll0bn3ywmmflp7lzfgbckrcrv2k8gud0k37rbrizy7qm5qffwd34cjapxyse8gd3ogdgryy3giqzb4412o2oaivedr6c9p4opclae5uwcrdze4cuihzicahyscf993ngiu460jlk441',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '3b1bb011-1b5b-4ff1-8453-d226ed4351dc',
                tenantId: 'd76e18ba-d0b3-48e4-bebf-0bb95a5c04b7',
                name: '58l2cdfqrf2xedhg9vn0pzum200rvrfabqjrny8v6f0d0be6f8sszgc1dka1gf0a8rqnohxnfcig1cgb91l0u33dmdcjhkvd60yy81yhwvcy74b6xytty87ftbs9jnwphuiu8bwr9raohte1mys8mbcrmpp6i329fzojmahk5itgfolp4p531ottdse4yxu5efk9qe508dgbv0n7q9fdhie22l4lauwxhm3tafx70qwopp7ootqxyset8sxpyu9',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3b1bb011-1b5b-4ff1-8453-d226ed4351dc'));
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
            .delete('/bplus-it-sappi/role/3b1bb011-1b5b-4ff1-8453-d226ed4351dc')
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
                        id: 'ab3515bb-f9c2-485d-a34c-d695444e05bb',
                        tenantId: 'd76e18ba-d0b3-48e4-bebf-0bb95a5c04b7',
                        name: 'a1limfmv5j5kq9tc9pp5u60korlcqezfgs0n40emf4eoq4i8gk3rkctxf3h1ouneuxjnwjje54v3mhv4s334wkgqxt5mdrqe562asytzx35p2fc4ltmsp93wyuvgb9meltjcdrxc5kj9to8iuatshulrbn3lf1lpng1als2ldwgl50rysvd0iv8p1sftls10bprkhghb4n3qn1jwr10cnodj4qaub2bhnrdwma283crudtnezwmp5kl8nverqv3',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', 'ab3515bb-f9c2-485d-a34c-d695444e05bb');
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
                            value   : '3b1bb011-1b5b-4ff1-8453-d226ed4351dc'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('3b1bb011-1b5b-4ff1-8453-d226ed4351dc');
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
                    id: '3b1bb011-1b5b-4ff1-8453-d226ed4351dc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('3b1bb011-1b5b-4ff1-8453-d226ed4351dc');
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
                        
                        id: '173782f9-150b-4225-a48f-be7cc72a18df',
                        tenantId: '9f22c43f-4d89-41bc-a2a9-5740510f7d6f',
                        name: 'yi19p7a0y1aomsht9b4om9x6qvt4ychm1vbzhkqkpl3f1i344ljl4bm5xpf9x07o8jsvbwmi6zr4z28yol54fob5unl3kcy82m2mtl8gqbk2egl9c2sh57aibsy470vgik5lmze2k5lq0iwqi0uell99hjrxyfzoe9omryubnd6406nlxtbxeps5eyy6ymish6xncxktbulrq3if3a0t1hak5i1su8vj0oklxgqo6dzshslk25z355v4deggwfm',
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
                        
                        id: '3b1bb011-1b5b-4ff1-8453-d226ed4351dc',
                        tenantId: 'd76e18ba-d0b3-48e4-bebf-0bb95a5c04b7',
                        name: 'n6kodik8tqhq63pvzpvs3pz0ysv23ohy429x2w9kt6dyq8mnly8giea1e8mxcbmkp6ywwky132fgp1nlijuovggmpuprwlf5anzw1ezm5khgfh4r86zptj3u0veteks076acccac8twyrl82yvf8o1ol9ajhtyz2dbq5pcfghbvqev1w1q6d413alsu5ns566n6cgsvffhg3mob8ult0yqojv2tg8lz9q2l8qze9sypya9d1o46h7ui1j2iybh6',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('3b1bb011-1b5b-4ff1-8453-d226ed4351dc');
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
                    id: '3b1bb011-1b5b-4ff1-8453-d226ed4351dc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('3b1bb011-1b5b-4ff1-8453-d226ed4351dc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});