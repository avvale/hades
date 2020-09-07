import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IPermissionRepository } from '@hades/admin/permission/domain/permission.repository';
import { MockPermissionRepository } from '@hades/admin/permission/infrastructure/mock/mock-permission.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('permission', () => 
{
    let app: INestApplication;
    let repository: MockPermissionRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
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
            .overrideProvider(IPermissionRepository)
            .useClass(MockPermissionRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockPermissionRepository>module.get<IPermissionRepository>(IPermissionRepository);

        await app.init();
    });

    test(`/REST:POST admin/permission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: null,
                boundedContextId: '45489bf1-b3cd-492a-8510-413b42dfd34b',
                name: '8h331ygeqbj78rgnnm0q9yvn6wzgpwsovb8eflckq8bc3vzb3fs7jxul39w3e1m1nlkrcf6cp80t6acytdlqdnqy3weiima5hmzy11pugjka9zhke5khh7hgxciqluvb9wf5pzhtpglka2wjubuhwr5pt6ke2et5ax0tq2568mqnrv7jnydrwvv5t1ax5lw40mixehbjhkhvfdlzzsuqqi577nsoqhkh58ogsmp8scal2717myvc440alqlwjrq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                boundedContextId: '45489bf1-b3cd-492a-8510-413b42dfd34b',
                name: 'kat1f5p3hkto8te4laoagb6hj8fseyk6iwrngt8korbyk31imy7g7gt174wwj23g8e4rm7povfdn4f0i51bzk2tnisgwvw0e3i5gdcfyq2tbfbrfqle94oqaz0a9004mmu95mubkt5ua04fmvnyv3vr1uo95pr8brdfi6778clehryvo5kdt76x3nzji932het33vr78pgjfoyq6dgx9ahe42f9a8fw3m8v4zx6z5if85uqmj7rcc7hun7phi9i',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '563049ab-6a1d-4790-b182-2c1ac0a109b3',
                boundedContextId: null,
                name: 'h6bkywk746igg1pw6jmd0043xsgming30li784juga3u0dyh1te3hzfbwiyaqe1hev1lzmcw9948l13pqaooif2816znstf8bpbhrfyto93nlehvr7rqnsrkl4pwr2g1tt3yk0psxtj41zal1a5xg281fwvrnozn31g7ggiv27dwx50c1quf0658x0mhobpuklndsy3mz0zy0zrialojd38popo3qzfvy364p2mn3v5v03ary2on5wadsm6aus7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '563049ab-6a1d-4790-b182-2c1ac0a109b3',
                
                name: 'e29yzzbk49zm2ipeexhbxqz4wj2fjzz2qqd1d56cqm8yf887qjnsvd0qtw21i0xsat3ajuo5raolla0rel87r8j4dlregnnulgo0ao7sg766cwvc2yvfd6udz5xmtvg86eohp39ogexroi3t00l1k4i85qmd97pqhoxpn6pk625fhz5g2dnp0ggfui2w9w3v8r01neig3vwubxlz38z0ku4o8jqaaxpk8b2bsvmxdjl6luxomqzmzsf8hv8t9e8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '563049ab-6a1d-4790-b182-2c1ac0a109b3',
                boundedContextId: '45489bf1-b3cd-492a-8510-413b42dfd34b',
                name: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '563049ab-6a1d-4790-b182-2c1ac0a109b3',
                boundedContextId: '45489bf1-b3cd-492a-8510-413b42dfd34b',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '46kz3ua7ejh5mo0hlwaruqmawbcvytc9scc8c',
                boundedContextId: '45489bf1-b3cd-492a-8510-413b42dfd34b',
                name: '2s5qr748w0c3u791cbz0g60hztq3us0ket0m73qrlr9wqo8rd8wkaus5zn7c8c101cagi48brb9vtzsw08haekyum7imp5xab4au96ydl40pjavw7nmk3ovbnby4vg9x238dvexuqsx97e6kog21f060kem3tfktu8767da61xqlzpz7cbvpgqbrpmk13s3pmb5b9dpp5aycb1fhdbc6ifhpdjegl8jacniquw7jve5ix262dfypf7tky0zay15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '563049ab-6a1d-4790-b182-2c1ac0a109b3',
                boundedContextId: '5pel9qkz2zvldapap64xw1va587c0qogzq2fr',
                name: '1370ob44odyq3ye9fdtqtlhpabdkgxsbn02s9gyef1fl2axqq7a0wu85hgdofnrb12fs57rs8433nd2m1o7pjz0rkivz5crmjftb53lzcdig6sn5gqw56dyb0higvtl2pji0xef3k9thv6daf5ypfc5n1zepz17k9j853e1v7w2e1wuo94wm2hg3zgg2uk29xsrnx3cd284qif7ssdd057capdqikusqm5uaaixej5cxhj5pt3e6mjzdpim4po3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '563049ab-6a1d-4790-b182-2c1ac0a109b3',
                boundedContextId: '45489bf1-b3cd-492a-8510-413b42dfd34b',
                name: '5fmq5n3uj291dwj0qyd1ahbhh0pzufmriv5ubbmfi7p4hm4liozw06dh753smtt9gfw5jl9k7gcl9b826j8y5rdcjom8263n02oyi258nmt6pvcom32ltt71v6csg805uafrboz3wq4n2pj69v1xdy3heksg3bvpxrraw9e8wtwla5mr8fpcso2e6b930b4wgvcxct35st12tx4zyhezxk8j2ki8f0i4euy8vetosxgssx96pyu64s1x5njtd04p',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '563049ab-6a1d-4790-b182-2c1ac0a109b3',
                boundedContextId: '45489bf1-b3cd-492a-8510-413b42dfd34b',
                name: '6aar36qz2jgfn0mlvi42o7qo4k7dsvx886980x6be87dvgprdu0q8c185nvt2pehmh7kyugbih5trhu608mzvilfaah3jjivuocicnr2aqf86ksz1513bj18m4yc05rk6njmgq21yg1yysll583lvhx1rpr3jos0o96tipewlsyba7l9llydik89km97on1z3cq6npcbuyk5nljy5e23a91gcmpsz6ksgutr095md2ym2k9x0fx1nk6xkokgter',
            })
            .expect(201);
    });

    test(`/REST:GET admin/permissions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permissions/paginate')
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

    test(`/REST:GET admin/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '66e8e339-d98d-43d0-853b-0e0470bf0dba'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '563049ab-6a1d-4790-b182-2c1ac0a109b3'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '563049ab-6a1d-4790-b182-2c1ac0a109b3'));
    });

    test(`/REST:GET admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/4a8ea448-f843-4bb7-89d3-991609a3603e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/563049ab-6a1d-4790-b182-2c1ac0a109b3')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '563049ab-6a1d-4790-b182-2c1ac0a109b3'));
    });

    test(`/REST:GET admin/permissions`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permissions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '0cc73296-7c72-46d5-8dc2-49e8103f25be',
                boundedContextId: 'cd2c62a3-f006-4ecf-9290-d6e9b23d7eb4',
                name: 'uwr89domhd7xupmu84jbptgp5r9fhraktap3i218oht42zj1b5mhpta788pixo6kym8ko8ym4h8hm8jbzvidjur14xsvdxhriy9kylak5ovxfywom7273aboulu9gn3aclzz9z5dm7ktv57giz39gkxkp5i3q2o8wxce1dqtt6rb13u6bdajgnlapkyulp1op6he7nqibhgnaptai9rwcmu0d773o30dyp1pguff8ujm6tvcteybhzi88yzkvpt',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '563049ab-6a1d-4790-b182-2c1ac0a109b3',
                boundedContextId: '45489bf1-b3cd-492a-8510-413b42dfd34b',
                name: 'rm69c8v64w6w7e8tzy9wyab8qbcek991lwqx461xj6zcpp5tp3jutvi792vbffo2362mm9frzmplkbchusp454huv1za7mdhpl9xhsz7rug9klfj6n1c8e7ls6oiyrx7jxmfmkwxtjpi5o37p0dfi1iyu4iyy2upiwnyik7c1z8fz9z3o69t45vg39na24h2oos26sisb6fcngl1jgqhzu64hxbp436lk49dv7gpnyfxxhatmcptrgy0ew4mkog',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '563049ab-6a1d-4790-b182-2c1ac0a109b3'));
    });

    test(`/REST:DELETE admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/f6a9565e-2326-42b6-8b97-da36d11ca89b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/563049ab-6a1d-4790-b182-2c1ac0a109b3')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreatePermission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreatePermissionInput!)
                    {
                        adminCreatePermission (payload:$payload)
                        {   
                            id
                            boundedContextId
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

    test(`/GraphQL adminCreatePermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreatePermissionInput!)
                    {
                        adminCreatePermission (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '4e39451b-d209-4e2f-a86d-b3972046614e',
                        boundedContextId: '45489bf1-b3cd-492a-8510-413b42dfd34b',
                        name: '7izxmlwdvkr1sts2jpmeejbninvpk5emuxh2nen6ahix0joztrmhvjmyf0waqgpl2g7pborp2j1jhrggekd6302tyweol8tsdzb5y58f4mqn0e4iejqukwnmwqgcf3qignah5rb0riv0yxot5z0anf17q8thdgkxuigpu34h410yhunxobo8sj4rdezfvroqnqow2mbq56v3gr4848ovcky4j9yv4kt9v00is68z4r52qq1spj80j3lsc84nzb0',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreatePermission).toHaveProperty('id', '4e39451b-d209-4e2f-a86d-b3972046614e');
            });
    });

    test(`/GraphQL adminPaginatePermissions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginatePermissions (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginatePermissions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginatePermissions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginatePermissions.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL adminFindPermission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindPermission (query:$query)
                        {   
                            id
                            boundedContextId
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
                            value   : '87f517fb-2dfb-4b11-98c8-0dd94d97d382'
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

    test(`/GraphQL adminFindPermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindPermission (query:$query)
                        {   
                            id
                            boundedContextId
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
                            value   : '563049ab-6a1d-4790-b182-2c1ac0a109b3'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermission.id).toStrictEqual('563049ab-6a1d-4790-b182-2c1ac0a109b3');
            });
    });

    test(`/GraphQL adminFindPermissionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindPermissionById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f6b35ae0-c7f3-46b0-8166-14d8f75edfa6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindPermissionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindPermissionById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '563049ab-6a1d-4790-b182-2c1ac0a109b3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermissionById.id).toStrictEqual('563049ab-6a1d-4790-b182-2c1ac0a109b3');
            });
    });

    test(`/GraphQL adminGetPermissions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetPermissions (query:$query)
                        {   
                            id
                            boundedContextId
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
                for (const [index, value] of res.body.data.adminGetPermissions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdatePermission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdatePermissionInput!)
                    {
                        adminUpdatePermission (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '8e6e93d6-031c-4712-ac5e-61cbb9402881',
                        boundedContextId: '7b4fe3ae-3ab1-4100-99bf-b73f744a2359',
                        name: 'x1gd3l4j6hvuxnfx0mvdl4smwo9rlsx9ws1ouot5om8fnl6ew3nkqmddsn0uvnqvoabjhxcnqx4bvd93nys9o2iaakw39l58tm1d62rp4wg53l9n73wuukfbtcto2kg3escp7490rfciyzfqurvqf5lvhbpu4hifzpag5uq2c4d5og2qdhwyoxisjf37vdysefpfcnp2qt8g368wrz3g740kjra38nvrgj6zgekdlgytfiyuk1a0fb1fsvz1cm4',
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

    test(`/GraphQL adminUpdatePermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdatePermissionInput!)
                    {
                        adminUpdatePermission (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '563049ab-6a1d-4790-b182-2c1ac0a109b3',
                        boundedContextId: '45489bf1-b3cd-492a-8510-413b42dfd34b',
                        name: '5pbpp10bxhjsugdh90sh3bjkbfcb0mj5z7loxdl8pucvduhw5kmoqkvkc0nv3g08kd5nufdmv6gb5s3gq7kns61t6ms9ei7utylwhw4whhgfdd1k8cvuyjwkaap0h54eq9yao3rclhmvishqaa8ynll9kqu45ia7pqtudsksaysynjwc3a6uvv93ayw7xzxi00hm8fb8srsi0q2w8ufzu7g81p2wln71wa1j0c4693opcqqn8wd0teozxp4sk94',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdatePermission.id).toStrictEqual('563049ab-6a1d-4790-b182-2c1ac0a109b3');
            });
    });

    test(`/GraphQL adminDeletePermissionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeletePermissionById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd27a1bd8-e7f4-4f6a-b224-ee340c2b9406'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeletePermissionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeletePermissionById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '563049ab-6a1d-4790-b182-2c1ac0a109b3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeletePermissionById.id).toStrictEqual('563049ab-6a1d-4790-b182-2c1ac0a109b3');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});