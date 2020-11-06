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
                name: '4wtltgi297wgz5ma2fxmkms3s21hsszs8ehqtk4mlw9sxpgn2gpvtaycayicrf4e1qx857vecg30jqgb3a3dl3wyqbc1o81uff1bp7pfqetwywgiqc67oyt9v03fdsne258bz2uxlssciqjahnei970oyhggczhhxjgrixn5j7mgj3smmvgp4ommi5287pk9c7x6cvwsl0gef6ubz8gedbd7hjd7tls1hide1oko8jw8n2vsnzt92xqs0pvr8me',
                boundedContextId: '59fd5c93-7ff3-487d-9d13-32c02ae59685',
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
                
                name: 'w3rt29o8xj6wmmlip4yyahv6y289ejy8815gdclt2n7n0ihjz1tp9kds6vntt8nh3n6pxdqqpoyxtjpaqv85hbw2qb8ollea6x34pt16vof3bw5kiss1vq0crpj1obep98wz20n4649yn0529q6sk7ds484lfa2jwrgn2ha9wvaa0mwzssnk66fd8uz6lx3vla3nd22lkp0e0d51zh8lp0f551znvltcsk3kcyttu362uqmvbojh5o7lk3fzn2l',
                boundedContextId: '59fd5c93-7ff3-487d-9d13-32c02ae59685',
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
                id: 'da181dcc-5790-48ff-8cf9-830d86f43724',
                name: null,
                boundedContextId: '59fd5c93-7ff3-487d-9d13-32c02ae59685',
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
                id: 'da181dcc-5790-48ff-8cf9-830d86f43724',
                
                boundedContextId: '59fd5c93-7ff3-487d-9d13-32c02ae59685',
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
                id: 'da181dcc-5790-48ff-8cf9-830d86f43724',
                name: 'em1so0vklxujp94wf1pjrno0dczv34p3lpef2mk5x822w38mcpwaxd5o7l2fis65tefkn799usuv12plew3mp5grpae7bzgfwv4jkwy3v795dq36zfk4cgqsysxkik7a8u6j0ynlqd5syc6644plo865i7njkqizq8959yz1w6tvx14q4mx0azbzw1a7tkrboue63zzozr9f2kmim7jjfjuqmw4c4x9qn77so0yd23c0ebe99mj0bd17ipk3wpd',
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
                id: 'da181dcc-5790-48ff-8cf9-830d86f43724',
                name: 't4kw7t2ndsqnv7jnr1dnwpjpdz8306sln9plcyqnratb1a45dzwt2kwud0cmsl9r5hbhh8d0m0crq75d5b097pztqnrf9m9f5pbgfo8cje19idgcky3hzofy6lhz419bschwwwf49zkrhzvsidfifuc86ovt0gg65m8i9nbwd1ubwsseh10js4xn9mcrrpsgfpz4kcu0op9iqqm0n50r21giojp7zdqgngaou6zy1j5kmt2bn7h4mfgqcszzbzf',
                
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
                id: '64b9avdxe6oobxed55iobb8k9trfefnh9n1qg',
                name: '5mtmaauhzqq3uadih8k75vlnxuq0d06ocylbw6mk7kotqjwzb6xmsd7ni8fkhqyrxvrx633sob61qzf6km64xzwbbcnmrqdic4x46056jm725ybt578fn60oou3tt2no12e0mao568jrc6agzoalt7fekeu2f0z3108a9b0etvs4b88xessst2z01lwqj52ygtprex6xt58sfc1kesrp5g47zsbrlba4bmqm1nobbz89i3wk0lkh2sr53qi83ix',
                boundedContextId: '59fd5c93-7ff3-487d-9d13-32c02ae59685',
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
                id: 'da181dcc-5790-48ff-8cf9-830d86f43724',
                name: 'l3kkomczeosnymnztvnaq89x8yjsibcz4msumk5ky7is7lgtbsbmla99rbpezcwnredduz61saoghsdib2z64hlx0p15716sz0u6q9raonyw893j16rrsoltal4jmmodikd0gvum7vuoe1fe519u2bsbvt5s7qdfsbpf08u22rsveag3vn89aq65xtmllinnzclht1yj431147jxor4up9a5d35y6thpbopuwhv68x319sgil9odxkngegdpq3o',
                boundedContextId: 'ogcrlafnagncvxbkwt7qlfxpepknec1t13axw',
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
                id: 'da181dcc-5790-48ff-8cf9-830d86f43724',
                name: '31sk5z0391k7xzruvz9si4bwdeljj42umqk0j0uhjlx4tc0pnrn8bzuy1z4os08dvnzpmca82c0y5dxr8tlgk9ha61lidqj7qp3x09li79cs1d7mxf27l2ui9xuv3f7tnyabp64g8a9ldw52a5h8a7d562wps4070fyoqs9gdbgoqsixka46l6ydpoxznxxojhvhlti7m4yovl2b3iv9is71jfevpciqjlamyxj3vxr0exypje1dt59ouf5yb9oj',
                boundedContextId: '59fd5c93-7ff3-487d-9d13-32c02ae59685',
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
                id: 'da181dcc-5790-48ff-8cf9-830d86f43724',
                name: 'cika2ugssxaa076r3nbsph3oh0h2vqe2cyasxkwvm5bqi4kll6f89yzceq1q7vef77y6mqx57sicl2nabzl6gthmjwvksuktnmfuoed20xn1ylx4ncjwk3xnfk9hniqw5mh70el5wrzhf2pil6djzshs6eg2ugpwges35qjcpuoeonygs1jhnsd34y83npzimwy8axdqomm754aol3ge9tywyd6e598nb8lopc1t37m80nhh0t8r0r91v9urywi',
                boundedContextId: '59fd5c93-7ff3-487d-9d13-32c02ae59685',
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
                        id: '4aa313d2-e624-4904-9dd5-0049d57ec6f1'
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
                        id: 'da181dcc-5790-48ff-8cf9-830d86f43724'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'da181dcc-5790-48ff-8cf9-830d86f43724'));
    });

    test(`/REST:GET iam/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/26ad34ce-f90c-479b-8fd5-d38e958613b8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/da181dcc-5790-48ff-8cf9-830d86f43724')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'da181dcc-5790-48ff-8cf9-830d86f43724'));
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
                
                id: '9981a6c4-9b03-4238-a6bb-dd6cfa2e3862',
                name: 'vqk49jkgfblp2qqbpoqktxh8kyir9ofjntppudldxu6jppkgkueuks4dqp8wnintxhc6fwatql90xpk2zfrb4o685yxk5shxm2qo3y13cx57jwy3dmsas55q5u2m7s8gakvuay2f14f9iaqfray0fok8zgfrkvt072q2l5gmdm0de0dq20w2pa5fatnq6pc0tqvc869cuf1h86hfk42thpdmmtv5juup2zv5bz2qywb6k74wjnk05tuoes28ql7',
                boundedContextId: '231aa600-94b8-4f56-b244-c7a8fe7248ba',
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
                
                id: 'da181dcc-5790-48ff-8cf9-830d86f43724',
                name: 'qca3e10qcheiig7ye785jckl7db1m34zvta13h09lb0v1d5daui41ral71yj0qjdza87y3wo2edf62nr4yangly7px5s4vdwfsvc7nmj16uuq25nqlr26c8np0v5twmlozwzkwnzj26zm0x9b70x83ulgkh4n4yrl3kfxmws88c1xkplw3bliwexgm1ngzpraxe2rb34rrgwzeeypgg1qglz2kmeial58qx628oq02bcj44j4lc7a06tqgb2sni',
                boundedContextId: '59fd5c93-7ff3-487d-9d13-32c02ae59685',
                roleIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'da181dcc-5790-48ff-8cf9-830d86f43724'));
    });

    test(`/REST:DELETE iam/permission/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/34b4d8d4-7a48-442e-8f77-9f06b2b6ab3b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/permission/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/da181dcc-5790-48ff-8cf9-830d86f43724')
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
                        id: 'a147cee5-36da-4d6f-9184-74e27359ac5c',
                        name: '4an87mdr1egclb3tponcf3ph8lpxjni9j5stlkv4fuvm3o9b28eankx4aebbifp75lpju3fv92xclyxp8h78xhpjg9wig2nb6dirge2oov8ye0ogmrlq5wyhrgk87x89zqqu6n94gywyg8n1x62u4de08h71exrq496pus1gj1w42b2u0u6kke7nkiboceiv6172eshux7ruvxpuk2m218mefm7r49vurueq929vpk3y1zci3me7bc71rclt7rq',
                        boundedContextId: '59fd5c93-7ff3-487d-9d13-32c02ae59685',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreatePermission).toHaveProperty('id', 'a147cee5-36da-4d6f-9184-74e27359ac5c');
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
                            id: '4a53277b-29b9-4be9-8893-bdb2af2f1b12'
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
                            id: 'da181dcc-5790-48ff-8cf9-830d86f43724'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermission.id).toStrictEqual('da181dcc-5790-48ff-8cf9-830d86f43724');
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
                    id: '136f0cf6-7dce-4ce3-823a-6f15f673053e'
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
                    id: 'da181dcc-5790-48ff-8cf9-830d86f43724'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermissionById.id).toStrictEqual('da181dcc-5790-48ff-8cf9-830d86f43724');
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
                        
                        id: '99c5520b-ced3-4385-80d8-f689ea861b1d',
                        name: '3mytppht9oghc7pnm4zdya2felbyqjwraiglst914mlghyr8x328br1fdgqd3b6q72jiazl00gxaj6rha8xi2323b7yuaf0jhdzrptp7kkhu0okebvzsmcj0510c3rhc2ltiskitjf3aqrysocmov62ycroiz16a6wldclpwh50ozzz3tpr605dug8a1k89mifosx7z473w0dib1pr996yeti9vyme7zpnotdlcyog6ozm4shfgura04kqn4e83',
                        boundedContextId: '8ecd08e5-4967-4647-82cb-a595f012bbc9',
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
                        
                        id: 'da181dcc-5790-48ff-8cf9-830d86f43724',
                        name: '6jj029gxzpdnmrkpv4rhv0zpbwo8gttgbbqp55w1uht96iywz5ibgdymjzfqwymg406rkkw3mx961cjuzy89wgku6pwdoajf40kli6uaopwb8luqxkcn536d9mlgzydqtkb8uhxwxm7sfci1iss3x5hn0ipcvaldo5e5a3os5d2r2ks5m4ovm1guix2o2dooh3b695voj55p0mhge7dv03ubdxwx8lalkhllgr0o8qp9qkwaprlla2xpx6dp4zm',
                        boundedContextId: '59fd5c93-7ff3-487d-9d13-32c02ae59685',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdatePermission.id).toStrictEqual('da181dcc-5790-48ff-8cf9-830d86f43724');
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
                    id: '088e4bbe-3c88-4c6c-be8c-427ce6073341'
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
                    id: 'da181dcc-5790-48ff-8cf9-830d86f43724'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeletePermissionById.id).toStrictEqual('da181dcc-5790-48ff-8cf9-830d86f43724');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});