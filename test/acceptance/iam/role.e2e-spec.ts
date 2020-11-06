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
                name: '9qudsof7mx1h5orwp0zjj3tqqlnbfe5xtfnddv4r6k5haae0j0qkkctyjh39n8vgehcbl46hzaay31aksn4o50ysxmdg089smlcx4ubyyhy9jenqucla9xooef34noi3wiblvw8ynokgq5h7ipto65tpb3bjchdro5sg5hmh1ae84ps6bggef711gqxsclzgi507jo6uzkhv8hxxws1xpclx0x88hkaox3njxgcsgy0nqclwd1i1gmdh48o9nsf',
                isMaster: false,
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
                
                name: 'tji292s1lm55waqpd0u4k7xdgy7um997rg2t52ge7t69k8ad4ev67vovq9eiixjjui6qvjkfdfhqfaghov3psb0p586xxyo933w6jpeaa1lb29ryins95adr0pzsajas8z47t01io2iyaz8llesldkh4xmvca8rzmxj161hnd3h2zbq292zgio4bisu33plbwnobulwut84s20baptkmpslamzvhtwmuo7sgjuf0gdxwc5z6xxxkoeb3px2hcp0',
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
                id: 'e6e82534-4a82-4a6b-b4a5-0b262c6fd26e',
                name: null,
                isMaster: false,
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
                id: 'e6e82534-4a82-4a6b-b4a5-0b262c6fd26e',
                
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
                id: 'e6e82534-4a82-4a6b-b4a5-0b262c6fd26e',
                name: '7ztpd9eo92imylyb1imrcms6drg7e2dljsi7k15ybyfh971sm8wdi6e5tv22f6emn8y7nyiobkdvjdlly4vdl4m3ss4ykd57pc1ha1aol4dn1iq89o5nsr5l11qvrjya55pjkzcx7lk2ihwvmw92q9gctf1xh4urhqi2mh265nkuuxw2jpri97t8sgv4p148m489xl9uh9b74c0rvcgwzwu3ho1qsnu3ei4hspcdr1st85l4ohufdtamq3f4kiy',
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
                id: 'e6e82534-4a82-4a6b-b4a5-0b262c6fd26e',
                name: 'ci2xb81xgr5k2s7m3gbarl2ii66q325qz1jdag3h73y25gnlztr73zry8tov7fq4toq3npkyrifbu1ai0lqezidvbayvrvgvmg0o778pbkirjls92oj64lkmxxn7p867ozpv9uyk3mncdrlemjzca6j39wnfgmyc2feie8t2mbo69uigzwqhb48dksoz20nzl5enc159wj8l7f26h5dpo2z5wd7fp2180geneflg00ty9l2bpbedlykzvteh9r9',
                
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
                id: 'f8qpz161fyohohcyemip64wwuolcqgwnxswga',
                name: 'ib3gwenyziy65ghqbf5rvt5sqwbymg9p8ktlrvyta0hem8xdutxyuzb59w4pisidv0trq0o3xea8mnr8jyc02ms6b0zzpfy9ipuo9e1c6kkitcw4v0ivp0jpvyzjnq2gldobsdsq998zkh31isywebzh4dkpkwg54pxwy4g376dr3vs4lice5c4chqtmhzd3wneq9pejg5jz8x0oqv6tdiivmyr0uf83tqmsz0614w6isnw5xsg2aih21wo5vnl',
                isMaster: false,
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
                id: 'e6e82534-4a82-4a6b-b4a5-0b262c6fd26e',
                name: '31hvrtvl0jkyejhoqm672u9jesuy6o24kqdez641nc00v7l64o9oocmcoqnyepcx1k9rn6sihz3yhz3qmw66usxx9xx78sdvpqye4jmembwry07l4bxlbgxinfjb3r6qypcksggpl27pettjxuj716zixmvzrlmeialqc4hxxevwyeu4v5t6maxqhpimdk0tqybwoq91ss38nl64p5hmj3kuf3v1szmad03x2e1oejc1nk8kuxkc5t38v62fpntc',
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
                id: 'e6e82534-4a82-4a6b-b4a5-0b262c6fd26e',
                name: '0wdmz14hgq7xnq3sl5zxfr0do0ubviu3u31x205o4ignftfgaf4l1g0khzkddrl94ubusny5rc14nl1h32v8p3s8ax937l0oocut0259t6b0dl2gjdxqn5cwg7buej2k9xt3c9h9bn2offfs19opvaurt8s13dyxumv58gk2eiq1u22zlxw7g30mreegaa7b3x8ufyafkxrjti0podjbhdx00wyt4t8jkuvcw512bw42aowbts5mhm5kmq00ixh',
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
                id: 'e6e82534-4a82-4a6b-b4a5-0b262c6fd26e',
                name: '5m6xdtv8l6899nzefavo0jqosne6a5kairdc3wcy6gwtufl72ipmr2jg98u5carfk3pk1j9zur48g6ne1kek3w4gd8jxdnss8nyup23rwxm21ulf3ff6kcreogq28hu84z683wahm7hulrou2rtmn0v9he3cgr63ju41trajbt9wa9j4cte2ghkfay6l8a63qpocsr6gl35khrarnnqei2kb08c06g6tvin4zf43c1585vkkv2azxn9hkquopec',
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
                        id: '2b7a97a8-b8c2-4f50-8190-7bcc89744227'
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
                        id: 'e6e82534-4a82-4a6b-b4a5-0b262c6fd26e'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e6e82534-4a82-4a6b-b4a5-0b262c6fd26e'));
    });

    test(`/REST:GET iam/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/d1e64555-29a9-4deb-9794-3814eb9a96d8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/e6e82534-4a82-4a6b-b4a5-0b262c6fd26e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e6e82534-4a82-4a6b-b4a5-0b262c6fd26e'));
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
                
                id: 'c570e044-b841-4dcd-b411-ecfe2a029ff6',
                name: '0xh898ecklst3qylydg6idz93hr620rl600gyg4thhzefx1vp1hudeq6y32a5hd85q0wi8duyhqjkjwrww5ab05r64uiihwrqdexjfqmtcvd84qb63xnmyozjhebujem6xqrg4kzn2c9kro0ssdc8l0fkatfb6dt60s6lix7pu8bo06qb58kij2g8alufbuwatfqxchpd6o4lwf0ohie1mb6cv2jx7z15nelmcg528mtby9r6decpa5qf5khaan',
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
                
                id: 'e6e82534-4a82-4a6b-b4a5-0b262c6fd26e',
                name: '4zxpwx3h9ga195yjn9nur3wemxvf8l9gjm9iazf7jekxw192d1rskr9xgrlnouavdzz6cvph4kh3ltkgskr6mman76gy8aqzqsrflhwf5q9ro45bu541h0ksphar6fingh3lcpupn3h4447gzcd9dbbmis4ho7uqraziacqs7bpsbebya9haniv27gjdqsolur450v0hinhvach08ejv4de1csuy2u936u4jimk28ayvhcnryulk962pntns5we',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e6e82534-4a82-4a6b-b4a5-0b262c6fd26e'));
    });

    test(`/REST:DELETE iam/role/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/37074fd5-2d68-466e-8c2f-167d9ce307cb')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/role/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/e6e82534-4a82-4a6b-b4a5-0b262c6fd26e')
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
                        id: '4f9307e5-be1b-4bd3-8ea0-c9f0ec4cd7e7',
                        name: '6e9oe8ujgx26o7s4lp4csqm3z06iib1q4ppy5lkwqy715knatmec4tdp3qau1574jwbbl7z3a1ixsv1v9hxsutsfg19vm73uc36gszahg6t86owq85z7vfxbfdyvgipw0yryb62fhjr0n1ymuhjw1cog0yt5da2o40a053a8ll6wi2ylvm0vuv416xowqiudy90ohyfv876apsxo7hisaa1rtpt414isuwrvgbd2a6muynsparjwlz0hn7ekoyg',
                        isMaster: false,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateRole).toHaveProperty('id', '4f9307e5-be1b-4bd3-8ea0-c9f0ec4cd7e7');
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
                            id: '2d627f1d-b551-469d-a400-80030425c160'
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
                            id: 'e6e82534-4a82-4a6b-b4a5-0b262c6fd26e'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRole.id).toStrictEqual('e6e82534-4a82-4a6b-b4a5-0b262c6fd26e');
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
                    id: '641fcdd3-b296-4d0c-9b71-00756035ada1'
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
                    id: 'e6e82534-4a82-4a6b-b4a5-0b262c6fd26e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRoleById.id).toStrictEqual('e6e82534-4a82-4a6b-b4a5-0b262c6fd26e');
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
                        
                        id: '02b5baaa-f61a-4d27-a910-6731504cc589',
                        name: 'm6vr5xy8z83gciu594h4kj2fw5dmkdcxbdxp7ko4hw0fn3oi54m9mnvj240nu8bptcc7wgkx0g1t8x7fx27n13x8asjztkiccg8pwrbcmb2sdkjd019cky0hne8ip4a8v07pswthcxwf8v0maznni3rdqveosvskoia3efbnb3uf87s5axhn7a2mw95lf85w1tetreaml3kwz684r1cqllw3itmtk96ob5fut3rhjscoacjrhzdeovlq0ng11q1',
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
                        
                        id: 'e6e82534-4a82-4a6b-b4a5-0b262c6fd26e',
                        name: 'vtkt2l0xnb827pni7b2foh2nu6oid1b8n3zs6nbi369r2en8rrqqlpd5mxmy2bhzr2pgmj3p5a9pbr6ry36iuxyn71tc834kshs4hc1yuo1371qr6a8f7isry67yes20wvfmal36evs3i1ssde5f8pttzh1jxetmz34ws6ec8sh5zosyxfd9ify4ssv7ikjprhso0lzmgcfn76lsg2l1vjyjo283mbvzoe5dlphuze5celklvoxksspd1ra5h0q',
                        isMaster: false,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateRole.id).toStrictEqual('e6e82534-4a82-4a6b-b4a5-0b262c6fd26e');
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
                    id: 'b2ad07dc-f42e-40ee-bcfd-b35aa5448f67'
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
                    id: 'e6e82534-4a82-4a6b-b4a5-0b262c6fd26e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteRoleById.id).toStrictEqual('e6e82534-4a82-4a6b-b4a5-0b262c6fd26e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});