import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IPermissionRepository } from '@hades/iam/permission/domain/permission.repository';
import { MockPermissionRepository } from '@hades/iam/permission/infrastructure/mock/mock-permission.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
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
            .overrideProvider(IPermissionRepository)
            .useClass(MockPermissionRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockPermissionRepository>module.get<IPermissionRepository>(IPermissionRepository);

        await app.init();
    });

    test(`/REST:POST iam/permission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'kdchv80ugygm3to6l0rnqz5u391qpixizitoq9ftbawvgiychabjxc8ee10glvrp9nk3q8s6lc84fw43uotsaojgeo04zdv4xmxocryhwdx6omdqn5y63ir8erl7f09dwcxja41zf7n3zfuosho0jg48kb2sikpbjsdf64kc39635eyu4r62631ozllltbucyvbvak0x4q04zroygyi1ujy2ftwm8psrpa3uulnhtq4x222jmuao6z8bhccxbj6',
                boundedContextId: '51d1244c-95f3-45f8-b042-cee2360ece67',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                
                name: 'vqjdlvswpyrcq9o6n78l9mbiqadvgnzaeii61m7s7k7wy2cvz5cr8n4wmbbkqem5qdruillrptbzdw6ts8zshibev9zssnvx3jpbidxegcpuw101gbnur6rssmo78u5edegz4c9tmszu1uym34f3xadl6atgn4q8k1dbsap5xwsffqgx9eucc3189z3cag6w074m5w50zwfhjamgv1qdcm4i6slnkbi1du1xtcxk3wbotte5y4x98nm1lvjd6z9',
                boundedContextId: '51d1244c-95f3-45f8-b042-cee2360ece67',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '08832010-55a7-467b-866e-ab9df91d99be',
                name: null,
                boundedContextId: '51d1244c-95f3-45f8-b042-cee2360ece67',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '08832010-55a7-467b-866e-ab9df91d99be',
                
                boundedContextId: '51d1244c-95f3-45f8-b042-cee2360ece67',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '08832010-55a7-467b-866e-ab9df91d99be',
                name: 'x0aj81aoa0lhzpjfqaz52ie0j3to8or811s9pko2cue05udrt033yh0epiiwgj4x48e00enzjlc8x4hm2564zdim08z260di0u6af8dpg6vnqgt0ub1ymjb9w3ug8xxlnqwocna4dr06twos72bvnvzj4rgde33fru2qoa84a0dp6p4a84yvxi581xushkd449q2zm0t49j5xb1lagwewyabdlr48dbp4e799snzztyaz9qmbnkea4fk72rafxg',
                boundedContextId: null,
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '08832010-55a7-467b-866e-ab9df91d99be',
                name: 'o60d5frxctrywvnrdag80rs6o38jzpcahc5th8aojurjoxe1htj9fxv2sx5fq1y6rezs2sv5du8muhnm751hvlrfwy2kbfksjz92kek3w9y8giamn479nfmbzymujhmujr39tuzpnjy2rm09v9mawls6d6ugi8c2hs23t5dz3k982vqjlppfa4qs90eopmvq145f5e8d4e5528txcs13knajakofzamgt9jq525izijj5wp6e416a3agau2d0rx',
                
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '6nd3d1svtf26gn5ot2elr3nugsfgn74sxe0o9',
                name: 'c37a6x0dasoyrbuwco39pflgbyvubtloe7ssn37ec0zrp1blp5li8bzgcx55l29fyaqqsops6wv800lamwcrdhioixbff6d3cts55hw4bpnv05l5ocnfhtvyi74cthbx2bf2b8njja3o54ty5850pk0xcwf9vjphqhu3wl5u9dij2aimlq2zv8xmpa5gxsnnyj6fbajieh9oa71lrrek4yu6dbv4gvvxbip765np7qj10v26int5wuu6umj66ge',
                boundedContextId: '51d1244c-95f3-45f8-b042-cee2360ece67',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionBoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '08832010-55a7-467b-866e-ab9df91d99be',
                name: 'ech0j754cc1u28pv92026ugzoh16bldgbns1mk4n9htbokhul42f6ozj204fex258pxp1i6po6396r31wwkkeu8oqv3h2sy11wsyjrc96gdhy5jyqdseljvwk28x47jayuiera26rrumlp6szvpg46e5bdkvfymqzvlquqcmljbl4tuly83ehglgn0xdmcjl0r2aw6lcdufsrz32lsicsqbgdyrjvc5h94qplmy2cwesy74il7r13ausddoeude',
                boundedContextId: 'k0pax0uo3snlcoebtao1gx9req9yds83s4ukx',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '08832010-55a7-467b-866e-ab9df91d99be',
                name: 'm1fkh6z7y7yst88xf9z92tm7szr5s065hdjfc7u0gawuf89v4n7znbpkp7aaudb47nub0lh902jv5av82os2vggpsmhkgfqo48zlngrrlseum2ivlqg10qnutlo50gwuorikmdlpm82bxjdn6awbk73tn4dy2crgr4m90olyxxg7hxialphfchyg0uees2t37b4c4c5n4rr7tpvvpxfuzvw09yu6tngh5y4vxs7nvm6ltsmuoqd1wug4ho6cmg7r',
                boundedContextId: '51d1244c-95f3-45f8-b042-cee2360ece67',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST iam/permission`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '08832010-55a7-467b-866e-ab9df91d99be',
                name: 'ph2is0i01pssyzza4wls2ncd1y7brxsnmym2g5izu8olo6mtxdnhhns059bhdcnckslzpdbh710adxhvw1sli0ava8vsda15g16n07m058jj8i65jegpzp7h60dpuilnovv0kh49k920uw2eoixvd2n50e48cb7trqqc8kduv5ido4lr7f2q8zzte2tko85fwrrsb4hbwxct4u5z8uzw3jhdgao67qb7ilp5on4fveqj7sakxkwvjbx5jnbbd0q',
                boundedContextId: '51d1244c-95f3-45f8-b042-cee2360ece67',
                roleIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/permissions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permissions/paginate')
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

    test(`/REST:GET iam/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '40b322c6-e630-4682-8843-6b4e5bd34859'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/permission`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '08832010-55a7-467b-866e-ab9df91d99be'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '08832010-55a7-467b-866e-ab9df91d99be'));
    });

    test(`/REST:GET iam/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/597579ed-8ac3-4436-8d86-84f172f54e32')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/08832010-55a7-467b-866e-ab9df91d99be')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '08832010-55a7-467b-866e-ab9df91d99be'));
    });

    test(`/REST:GET iam/permissions`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permissions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '6f5c583c-4212-4ebc-a21a-2e2c75fd6082',
                name: '1c44erlem6dkp6rpphjt78gigxye4qwa96mwt25g34ogtxifqfimxit7dits4y1rnyp8rfyp0tpsjs2wluvboju4zn03o4d7pko9s0x40sbcldjzuj3obug35cu72ovi8bgskxkakogjrav0gjea8cfb5bx7g73j1ybcw3h8mk97j7dapn695y4argonc64jx83hd000v6khcgxggsjzvxm8ra5dgixcsc4i7eyfv3kibcmwxk2q2vks59wlif4',
                boundedContextId: '4bef9067-116f-4268-a76e-5f80e6fa4521',
                roleIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/permission`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '08832010-55a7-467b-866e-ab9df91d99be',
                name: 'qzwajf77febuwda8esz9j6qmq55f7h9bkjfvqekmesv87i59pjrsp240j650xtkafztmrdhw55vwqmg1d4ig41ztaarp9j4wv3mtcuefc5zma81z4v14d77kln2nqgeu7cdsmzcwpyd0sx8wwlpb927ri97e0ybm7k3a0wwdydl7206cr6cwy7zrzey57yvp2xxyp2mljaemu6c6dkfdqiiv1xc8zhhe5gn7efdscgnzpms3ml14kvnqff8ycz3',
                boundedContextId: '51d1244c-95f3-45f8-b042-cee2360ece67',
                roleIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '08832010-55a7-467b-866e-ab9df91d99be'));
    });

    test(`/REST:DELETE iam/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/041cbfd9-d269-4ee4-85e6-9e37fca324eb')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/08832010-55a7-467b-866e-ab9df91d99be')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreatePermission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreatePermissionInput!)
                    {
                        iamCreatePermission (payload:$payload)
                        {   
                            id
                            name
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

    test(`/GraphQL iamCreatePermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreatePermissionInput!)
                    {
                        iamCreatePermission (payload:$payload)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '9c9a2faf-d039-4b0c-ba08-7cd9ad077908',
                        name: 'alqqimvfome1mu9hst3kponioppla3h7wm96ihvqch8ofb0cgke4jhrp7mix5ivq132byuz5s7xxbgwt848bh64ef058cfccfun4zpq4977wkzzhb3ym876mnpwct6pw2e2aytlwtaik8xxcf9nmdwdswu2rj1dow3ru3in1ng0ww9r3isr9lwvxtyzsbuu2avoax7prmkf5wbl2ymy08ttysgv3iz6dqo6fnstnlpkcpjyl832hjuuv2osbova',
                        boundedContextId: '51d1244c-95f3-45f8-b042-cee2360ece67',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreatePermission).toHaveProperty('id', '9c9a2faf-d039-4b0c-ba08-7cd9ad077908');
            });
    });

    test(`/GraphQL iamPaginatePermissions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginatePermissions (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginatePermissions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginatePermissions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginatePermissions.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindPermission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindPermission (query:$query)
                        {   
                            id
                            name
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
                            id: '1d2ed9bd-43ce-41c8-95be-15c639aebf40'
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

    test(`/GraphQL iamFindPermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindPermission (query:$query)
                        {   
                            id
                            name
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
                            id: '08832010-55a7-467b-866e-ab9df91d99be'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermission.id).toStrictEqual('08832010-55a7-467b-866e-ab9df91d99be');
            });
    });

    test(`/GraphQL iamFindPermissionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindPermissionById (id:$id)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4734e6e2-45b4-446b-9a71-2d3c5cb7e1e2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindPermissionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindPermissionById (id:$id)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '08832010-55a7-467b-866e-ab9df91d99be'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermissionById.id).toStrictEqual('08832010-55a7-467b-866e-ab9df91d99be');
            });
    });

    test(`/GraphQL iamGetPermissions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetPermissions (query:$query)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetPermissions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdatePermission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdatePermissionInput!)
                    {
                        iamUpdatePermission (payload:$payload)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '8f52e081-4d2f-491c-b3d9-b7e84e39e12d',
                        name: 'pv9wsfo1nt2duyploaefd5ykl5zdfc41plam25kw33l71g11g31f6wc775oqvzd8ltjppb206n5a79pzqww0n3oz1ohp9767i8mrvi3shl8t6g1j6dwbj2w838jzjb9k3epzg2mthiwe9rolyfon8tf9cixhbpuxlaeupezf4c4yfsl6wrvytydjc4qbgy7mvqi9w9q99ytuzu8xnwkwhwwamyzimcwxiw2nvccrkj8j94dpddufaw5ulu0nw09',
                        boundedContextId: 'e3dd35d4-941d-4605-88e6-538b9206ad97',
                        roleIds: [],
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

    test(`/GraphQL iamUpdatePermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdatePermissionInput!)
                    {
                        iamUpdatePermission (payload:$payload)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '08832010-55a7-467b-866e-ab9df91d99be',
                        name: 'nlp39vkpr3jls21orht93uxo4m6m60bgpyh9js9hukev3zckec1uf72ei23813vjuhsx3drknyjyhwzsh2rt72gblevbhxi69ya64pp0d8cipcgcv8ekkv3qq6jsnjpkwhq58qbbaptmvdehstyw413ioij8ddyzd8rcpoc7fk25no6g7v4x7s1p1gkcrr2mwlvhztm9ji46gor7t70jgd1xidewjox5zma61wmt81lqlr0gsmymvnsomleissv',
                        boundedContextId: '51d1244c-95f3-45f8-b042-cee2360ece67',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdatePermission.id).toStrictEqual('08832010-55a7-467b-866e-ab9df91d99be');
            });
    });

    test(`/GraphQL iamDeletePermissionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeletePermissionById (id:$id)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c7b03a8f-6ed8-4463-9cf4-2ff150cee0ac'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeletePermissionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeletePermissionById (id:$id)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '08832010-55a7-467b-866e-ab9df91d99be'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeletePermissionById.id).toStrictEqual('08832010-55a7-467b-866e-ab9df91d99be');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});