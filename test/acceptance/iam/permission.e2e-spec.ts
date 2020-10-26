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
                name: 'mvrjabuznhcu2xmwxlxqadytz1i870xem9kep1uockb0o8nhyprcdtmfgttjdad35ylzgbvbisrzy7t048xrsvrrkzh97tttf8xpp7xk5s23cr83hs317fucnckupdj69efpt4sh751z3q0ary95xl1hisf42e5lfwxg8mamn6zrp2h02t3sncsh0hdj3psxfwa7cnj8lmc4ma2yja24rqymvwpxmcwafygtx8zi4eacyajp2657ho8s7krbrq2',
                boundedContextId: 'a849eac0-3664-43d8-8329-12c1973ffcc2',
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
                
                name: '7y86722ae3ywzrfkg76szj5bri6a0dr7m7ft1xlo2nnvnlh9usdnn4xdun95rhkg5qoxifdnhcfdmuo9586llgyd4w4ec1d82dxekuqyjyrrzsly8qtp6k4mouo6auzh8ujrsb5oekcykw06fmjsfk5uh8itf9t127llyv42kkff332h5dp7r106peicddb8toektz7y7yrfizwp5h1gvjplksj1hute2dqof7e4nchr9gwbvst4s7p5993ug0e',
                boundedContextId: 'a849eac0-3664-43d8-8329-12c1973ffcc2',
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
                id: '5dc42d11-c3c6-475d-b72d-1d8a8d733813',
                name: null,
                boundedContextId: 'a849eac0-3664-43d8-8329-12c1973ffcc2',
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
                id: '5dc42d11-c3c6-475d-b72d-1d8a8d733813',
                
                boundedContextId: 'a849eac0-3664-43d8-8329-12c1973ffcc2',
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
                id: '5dc42d11-c3c6-475d-b72d-1d8a8d733813',
                name: 'q0wrh2a7qge0evrk64sgfmoef2qxptolojqt9bcnvczs96s70oj34i310dki5xuf5vibeea0pl9usfzrs95itx33ac8ikvjj4qdc4hoa6s5h60r7jjuzkxlaq9z65s0j8s42eaqsotu4hbpw90ivexa6akxb9rzfsicz8suxsf5rnezpxqiymd3xn85i827ugkazzna3ewgtexi7a778czq0vfxfchvkjyjglsbu8hhugowwxegt6prc2rvvqv2',
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
                id: '5dc42d11-c3c6-475d-b72d-1d8a8d733813',
                name: 'rhv8gmtv1s4rwtg8fgr58o5sy5uhzfxznkpw4hq379rldxwvttc5qhvye2iai391l6bqpml07t726975a0clcu82u2tt3c55o3ilgjw1tyie3secbseoahth3mx6n9v5gxtkml67lc5whqghwsbqn4g79z81ontsyrcg5d74u69x68uux7ga7q4y5nrgpy8re0vaotmir6hgs4zr9i2a3g9kkk7n9i865pc9cbgva7mevpaqm3dvb0yf8kwjeap',
                
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
                id: 'z63bvqs9weaw7dn98p01x68z5v5mfsrrabksu',
                name: '9hiefz9staoxz669g84nduli93mjjps1alhgwp5k0li3y61nc6h6bw486hmk3ixb8purizakssy93j2o6n4btulmxwushevgkcm5at6jxnkrl66j16j1pik5a5y5qpue9eml737bm613447xip4ei7elq3z3cmgndn2p4i8j1g5ccytdkeycufjrsr163ostzfzfsiujfngcolh6yc76trzu7cwl2vyji3hfft3r7qzs8mh907mjew6o0glnlyx',
                boundedContextId: 'a849eac0-3664-43d8-8329-12c1973ffcc2',
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
                id: '5dc42d11-c3c6-475d-b72d-1d8a8d733813',
                name: 'p78z5try3mlzqvyrubwyf3ylc5q6qujr8pxajjd45z9xe01e8l1eorrgl9fq5p7gsva5ddrbvo6n4hb5y098vyl185dxaczjtx81aa1x8nttksq3mgnz4pe1hug6g2gz9amtew3wytqpl7zalvnrx4urg7hib2xfe1anbt6ihhdedbnps3bcguzvjcdbuviz096n4snfqzk4xyqpk5mu5xu78ief6ikst9b94qw2z1wblg894oez82ertafnq9n',
                boundedContextId: '3u11sw072g0rkquces1nznxt4ptze4ugs3ezq',
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
                id: '5dc42d11-c3c6-475d-b72d-1d8a8d733813',
                name: 't0iz1kkl7cn2gkgllnzg6g3hkhpfn9uiawl9hy4o94zslhg1kntidn7rgt5g35nbin4yidz6d2n6db3ehsdgz843n46gt6su85xctn83aedbnjwcfjuq61x9av5vife4kyveynrzn1z1tubj8byttfij8rz7ksbizmpcelk37iwxkytye4e1x5j9qythocf52gbr7zm1jj4lzlpw96qn8uovmidcuw6wvsk1t55nk7784plga77g89rkg5xcgvhu',
                boundedContextId: 'a849eac0-3664-43d8-8329-12c1973ffcc2',
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
                id: '5dc42d11-c3c6-475d-b72d-1d8a8d733813',
                name: 'hs74mosza9y0a3vdwr925tq8yh8uf063ajkwymhrdx4n0o7l1t6kvu3qganqqv6oa9yjuo880yli7388t5ckv2p47ej81josz3nwofsxj5wf6yjjz6cq9a0i9ushcyf17jkpbqbt08398nwoq1qknds5gujhb8eip05hepd6mf3tzpfq5g7tlj1kaz9rrowpsc4khv2cam9b1zuxlep8lsbn47zvd3t9jy2qjp20ti4vdw1nsybp0qr8o0bnzu5',
                boundedContextId: 'a849eac0-3664-43d8-8329-12c1973ffcc2',
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
                        id: '545790a5-8233-46a4-b275-a77eab454af2'
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
                        id: '5dc42d11-c3c6-475d-b72d-1d8a8d733813'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5dc42d11-c3c6-475d-b72d-1d8a8d733813'));
    });

    test(`/REST:GET iam/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/0559d569-2852-4b9e-8507-435f8369b9b2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/5dc42d11-c3c6-475d-b72d-1d8a8d733813')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5dc42d11-c3c6-475d-b72d-1d8a8d733813'));
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
                
                id: '4bc52f5f-bf10-41f3-b722-befde00d8210',
                name: 'outpf9wq9kysnc7jg42rqlo8hsj9zdjvba7as1ui3uk36q1mrveizkieeq5bbkdm44janbsky3yzf7mx9ypaq8734winb91fqawzhc3cjmwunegnewepe5bi1hdcm67mus621ykdkqp01vwwadca1wj2r8x63rp1iknxtq16iug2k9bubcxjmyo81lh9lnuprsankarm9v1nrx5xu12lcf8o6lgdl1qgq0rrito1e2aroklil8fn433s12o3csn',
                boundedContextId: '96e53e1f-801f-4257-8f51-f7d240dadc60',
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
                
                id: '5dc42d11-c3c6-475d-b72d-1d8a8d733813',
                name: 'jgkog6rqhkkes142m0lfcn1l713pw3cwghiilacezcrx3b8qo6xufzbdqrc0uhrvbvgnby20d5ikfhfzaod7cqtdkq2g8eef4hebviyyhm1p4ygabp2yg5xbpz2w46du1lx9ce752voly21dcmoamfrz8ae1xqda85nzbz7oxbbl21tyc9ywdlnb72emlykyw6a22chju9uzdfadlt7tgxd5m9yb5toua87r7r0sxfka2j1j0g6wwhbcvdg96wg',
                boundedContextId: 'a849eac0-3664-43d8-8329-12c1973ffcc2',
                roleIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5dc42d11-c3c6-475d-b72d-1d8a8d733813'));
    });

    test(`/REST:DELETE iam/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/cd0890cb-9fa7-4a7d-9b80-24d07639fdd9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/5dc42d11-c3c6-475d-b72d-1d8a8d733813')
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
                        id: '506c9de2-7574-493a-97b8-33790a74375a',
                        name: 'ptg7a50tyu7ako5731uhbvdhsraste7bfegkuu7rnh1mw4p9p428x7urba5svr4bj1usf6hkpoc94f4m0g403jn2eetot2z8n5jn4mul0020nzf1lmyh8khrogmcmnwrqfixrrcja8hvly6v687lem7kfkbzhql46x40g7egghy59ug1mrlj0wyekh8130eki7p6jqer7ysxctic3qs7plb279ohia75drg9yi9nmm2ozeh64jhv32c5ysb11qm',
                        boundedContextId: 'a849eac0-3664-43d8-8329-12c1973ffcc2',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreatePermission).toHaveProperty('id', '506c9de2-7574-493a-97b8-33790a74375a');
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
                            id: '3c89ea39-43b0-497e-aa4a-a96d64fe29b7'
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
                            id: '5dc42d11-c3c6-475d-b72d-1d8a8d733813'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermission.id).toStrictEqual('5dc42d11-c3c6-475d-b72d-1d8a8d733813');
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
                    id: '4b0fd958-8ba7-433a-b4b1-f88faf9e0cf1'
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
                    id: '5dc42d11-c3c6-475d-b72d-1d8a8d733813'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermissionById.id).toStrictEqual('5dc42d11-c3c6-475d-b72d-1d8a8d733813');
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
                        
                        id: 'ec34e3b2-f2ac-42a8-ad54-a5603eed4694',
                        name: 'ryfpbe435z6qf3ziql9d1plx4q5h3931yyaz4u06zvm51uc05p0c8g8nhtsaog5qba4tby1nu4dl1gz9o1mkesjbl04x22111woylelo7i9eu6cjjksczjlwbkn47s17jff589vawsehnill90inpgwsr08zltjy0lqrdlxc6s9u21dfg6j5syakxfhv28ip0yxi025hkd64cq02yvqgmoph0ve5i257ym6mjco4a2w4yijhl0kwxg0dijvlov0',
                        boundedContextId: '1438f940-8321-428f-9f93-dce7010a127c',
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
                        
                        id: '5dc42d11-c3c6-475d-b72d-1d8a8d733813',
                        name: '1x0abck0bv95h5h0qlzbguk6clrd040o1dgs0t1w3cf0g18t6z3fekyj73zvdpvhsjvtp3puidtn6wurww91g2vzt3m2109yihyn0gsa7jwoelqvlxn3ogaginilnhecrr0o9kc1hmu0dm10glcljurkz0pn780zf3bgp5xa38yelxazu345uqyqvu2v9r9cuj5rlboz20alghnrx0kib4kqt84vvz36hbh84l0dofxxa3fciw0pjuu90w5xe3i',
                        boundedContextId: 'a849eac0-3664-43d8-8329-12c1973ffcc2',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdatePermission.id).toStrictEqual('5dc42d11-c3c6-475d-b72d-1d8a8d733813');
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
                    id: 'ad8ab3f8-8258-4280-8152-8e999c4556d9'
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
                    id: '5dc42d11-c3c6-475d-b72d-1d8a8d733813'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeletePermissionById.id).toStrictEqual('5dc42d11-c3c6-475d-b72d-1d8a8d733813');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});