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
                name: '1pcb5fci8h46406je7mh59uqch67hnf9q98ls4tousg0b9c9yqumvuhfxp44y2xymy673djltrxtmjmqmir195qlvcholqencab1yg5qla7p2hpel6yc7ds80fdo7p8wqbjksrdg1g5sjhuvlb4zf4p64543kailzp28kdapbvtpd66vm3ef7ctnx1g5it3fwsey8tsool6xbrbudfbymgao608auwp3dhwdhpxg484gwi8wl8psmx3qwtye70j',
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
                
                name: 'ivlb2n2tgx5qt1gzbo8ciqkw1f8kupmtyzdo4xssme3a50wmfb1brjtp41zxkmo3bj8ka5jrwkfk8bo2ew440ibnsvssh0apxyapvvtnw72mg41l5y8uck3sqbugh4g5n2elb5uddzfds9b4qyhqtepzguhysgiud6ue6dkclv7ju1zkoval5eq8oi5rlt8x5k3lh9r162hg78qp77j2sfhlzeki845f6qqbzmbr0hkct4x7fyc07zxsiw6g5jm',
                isMaster: false,
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
                id: '137ca1be-c845-4c36-97a7-82961ae1b2ce',
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
                id: '137ca1be-c845-4c36-97a7-82961ae1b2ce',
                
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
                id: '137ca1be-c845-4c36-97a7-82961ae1b2ce',
                name: '4nh9kbxvriyzbygcjos2i0u6iyxgk1lbxd4gcoiiyg37ps65nyf4e0kcp0085p8nuxq8cbz26xszt2c9jm2nwffrf8ykrc5yxlw862nqtfb08bzo1wenhzrtk1x94u3syqmjaj4pa4glwejmzr208q8ozoceoka9y0dj332v53ix86c5cz84cfkvbdrgghj6hiwdt9aajn25fe8k9iw63i1xbg6kg7b0i2855s8mqy4gun47cqkevkniobw2607',
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
                id: '137ca1be-c845-4c36-97a7-82961ae1b2ce',
                name: '8rkrb4arywv89ldaqre8lbxqjssbjmlddbvdyc6ibvzg2mvtdhff4dxhlz094sf6wdvr9mrdbu9qnujof0spvdou6u3llya7y64tn5yj29z9ea8rugq9861oe4fpnxtva700uzf2k3y4nvfi98bq6y4nb6edelrgv8turmthhljyg0nca1uwoxf5h7c8fk3m3qgdwmjkkz4kiea2zyrml1xbehhu320rgw6gm56r9ff07ihpfutfdr0npty1h7x',
                
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
                id: '75aw3r6d6wld2xofgcblypygms9mx26mae0qg',
                name: 'jsti9wifvrmi74flib4n82vvmy0jzw7hyxd8xnkqc0174keqb4i2757r44wzu7i1tpfwbni6sjpgm2cv6kzhemukk3bhb34hppi9dpc0zxpn7pphokbri1qdmdnl87d2kdnv2zoi86dkjjzrpf1poynce5f569lhlbf817ly3jumi5lagq1p99gct7uypjnjo55covmsvr1gm15ism516o1xmfvtfrv875us8u62rv5wqexrsotkiz6hx8h78ia',
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
                id: '137ca1be-c845-4c36-97a7-82961ae1b2ce',
                name: '8octii7z1dkmcxnclmksyecd9h52mxl40lsjvtvm19f9sg1mnttkinb1mvgppjuta5vgwjoknu6iwyyp780f6fqlacaviibv5777jaynzcez39q9xs1jy68ibd0czsj51nd8zsadqkn9oef41o5fhb3g746quobqhld38qbg8kzcssmz4vpeerx76p66off5ip5l74mvamkr8lriw2ca0hep4yedx3i12s725dp219wfbaejq9miq57zvsaj43n6',
                isMaster: true,
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
                id: '137ca1be-c845-4c36-97a7-82961ae1b2ce',
                name: 'k17bmt7ks1dbnhrgalrs6sx29aujrcgrw53asevx6x93n0m4fe8azf0gq7pml1dv2272pdtekrgvxgezqo1ksm5q9ixwwlkwe1gue43emxxlw0teyu03jllpsqdx7sgreack1j9y4fe7aiha5ye5wf1v2zklegegmtvye9au0giopupae0iscp732qh6n66zlwz0eckyf5uc4g8zcftx37p0jis0rl4e2a50qdu0dgu0hayygqrvjsepk96vjku',
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
                id: '137ca1be-c845-4c36-97a7-82961ae1b2ce',
                name: 'ota7glducxqaj575gqc7af5n9vzhcfunxh18dazw2mi1heppsyeh3ve7iv9q2n3dejkxxz6r453ifewr9qjpq8fraupy0yja08aigit04io48z5s87yk660mfttpeqndjs5yqjhewj6nco4l6vfhslqeab085qp9so5t345x4f7viuqoqn96756rfqp8pqc2xyr13jlscfh3eeoquhl7tm8glpvh6sgbh31gpuevec96g57ii6g8pknbmxivkxm',
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
                        id: '9f7a1d6d-abee-444e-8714-691cbb4196a8'
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
                        id: '137ca1be-c845-4c36-97a7-82961ae1b2ce'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '137ca1be-c845-4c36-97a7-82961ae1b2ce'));
    });

    test(`/REST:GET iam/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/c9cf115f-d555-4219-a2fb-d7ecbab4526f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/137ca1be-c845-4c36-97a7-82961ae1b2ce')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '137ca1be-c845-4c36-97a7-82961ae1b2ce'));
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
                
                id: '992aaa9a-69f7-45ed-a910-392863a88d0d',
                name: '3si4wtsk4dfm6vef27h0ikgficuur4nteelu6zgnumvd2xv60slayju9t4uc7rvn3qu7c8iqxc0nnol3t9gibv3usdbyzjn2fevibpphcj58zu2b0767e50l36321t82g3ogrol568qth4j500en4pui8460zzyvlhsm4nvc1psrgvrdsyzcpk6cmk0a1bucrw63z6cwi3fzgzwyls25ed76euu12oe8uokzpk6d8qx4rox6lxzi5r3jf80hob2',
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
                
                id: '137ca1be-c845-4c36-97a7-82961ae1b2ce',
                name: 'ntr92fjq1477ebv3uoxt68rxmwou0cfa1p7xw30awxjb9nmnzwxvexwjlbhx8twczvekudxykwu5w2xnzyxkf41436rxknacp1v1cqo2qeeu8atf7js61c0jj65gr8czwfuuzw6761jndf44i08b3vaclu5k8zyicetr75m7bgqu2m8oviwe91biazzd60t6nywngpfk9vp1n0pqc48q58d6ldpfuhdvvjbmru7ln3xk5bztx1qlyij88b0z2gv',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '137ca1be-c845-4c36-97a7-82961ae1b2ce'));
    });

    test(`/REST:DELETE iam/role/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/52bd6d27-3a1a-4daf-92b0-fed6e11a48fa')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/role/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/137ca1be-c845-4c36-97a7-82961ae1b2ce')
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
                        id: 'e8d69d9e-b540-4b2b-8928-e0e636851620',
                        name: 'ixvzjrgmxpv8seqbqdyrujf9xz7zf3y9kb5edett87pfrfch6jhnd3yhmoql3col37lizl207ggn5ft8if2rgweyuw5nav3y5tbrl98c1yedll79vyh4xhbxzof8r812w8nmmhp6wujh01byvkzsfhgclshpoc9cq8m6drrdamrcvp1n76ch8gvloy4hnjemqbvdzq9mm7prstbtc85fnqcysr3g6rjpy77sqaz8y4r2qm2ulybr92bfqkhaqfa',
                        isMaster: false,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateRole).toHaveProperty('id', 'e8d69d9e-b540-4b2b-8928-e0e636851620');
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
                            id: 'ddc8bdef-4016-4459-a9e1-0efa04f62af9'
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
                            id: '137ca1be-c845-4c36-97a7-82961ae1b2ce'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRole.id).toStrictEqual('137ca1be-c845-4c36-97a7-82961ae1b2ce');
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
                    id: 'e233d237-e934-490d-bcbc-73f21948c689'
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
                    id: '137ca1be-c845-4c36-97a7-82961ae1b2ce'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRoleById.id).toStrictEqual('137ca1be-c845-4c36-97a7-82961ae1b2ce');
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
                        
                        id: '12cad122-2ce4-4b14-b9f8-6ed59ee919bc',
                        name: 'gap7uet3hxkprwu2g598snw3yw7wph40voe60284ey0pnls1grpio0myw38gvi45ehs2t1qqc1ecv6qdp4fmajkgx1hmlx9sl88qo13jwgy7bb1438i9a0ms0hvjumfb2w5pxvuah539z11rkpqtib8xpaqakextcuje9kco0di9pedy6aq59cvdasy4r5e5u31lb9b21vioc76u2vryo9pmrgnw129r9l3ilfyh4heia0czpiyez3ga7qwgwwc',
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
                        
                        id: '137ca1be-c845-4c36-97a7-82961ae1b2ce',
                        name: '7e2fgmbnjjb80c1tvp5t4ks7sedudpgip89z4bev0ke1b3zrauu7ebhx4msxq1c95pidzokotdde0xtnb6vho9w2q4z3my61b3nxq41i4d8534pihj4alfmm7s4u1ek9kh3hjuc9e9v7prubc16pdl8kborhw667us41f7gob4z9483h94hg8qourkhkp7w9bgwpbx6alkn9ieklmzxo5unaw6gdbvtrq56zqxkp5hs7ckzp86okvv4bj6vtryu',
                        isMaster: true,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateRole.id).toStrictEqual('137ca1be-c845-4c36-97a7-82961ae1b2ce');
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
                    id: '1ba0b54a-0d31-4f80-99d9-3a30a6c38589'
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
                    id: '137ca1be-c845-4c36-97a7-82961ae1b2ce'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteRoleById.id).toStrictEqual('137ca1be-c845-4c36-97a7-82961ae1b2ce');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});