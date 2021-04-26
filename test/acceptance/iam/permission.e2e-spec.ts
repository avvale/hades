import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IPermissionRepository } from '@hades/iam/permission/domain/permission.repository';
import { MockPermissionRepository } from '@hades/iam/permission/infrastructure/mock/mock-permission.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [];

describe('permission', () =>
{
    let app: INestApplication;
    let repository: MockPermissionRepository;
    let testJwt: string;

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
                    }),
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    TestingJwtService,
                ]
            })
            .overrideProvider(IPermissionRepository)
            .useClass(MockPermissionRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockPermissionRepository>module.get<IPermissionRepository>(IPermissionRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST iam/permission - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                name: 'v5rcttd620q7knnghgiuot5vicnx7f1gd3m2eyuuec9rrio0l7nhph608q47x2i3by1bx01rnwdiuelokagrtvbqtwedrlp9w7umm4t33ie87qftdy3x73d7xwegf89cfl0co0mr7mczl3807ywjocjd64vlfiawc2um2di626om3g60rx2hp5e2x6qdpb1yt2z1ynt2liccvshq4qd4xpes9qcas76jhvybc5atp3tvj5gfz8rqpc1pj31c4ok',
                boundedContextId: 'bd2fedbb-ecb4-4d95-804c-bfbc047bcfac',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1b74bb3c-30b9-4273-88f2-311e7fe605bf',
                name: null,
                boundedContextId: 'bd2fedbb-ecb4-4d95-804c-bfbc047bcfac',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1b74bb3c-30b9-4273-88f2-311e7fe605bf',
                name: 'w3yrbb9pthxifit0gttcws3t3e8e9pzmn293jukspgc56bhr3rqrxggu8yy6a6oj6xkzl5hwju6c6r3v4bt5b41wbv0t11lvad3advn7bb93mjg4pg5943wg172mr9fstt834n9d996sskucjiy7havnz9pma8vsjey2jdag7s95fze3t9wefhw4gqch5c9dadtbtubqtxye6zzgpj0uwd23py2bg3l48gnlwrx0hjql4h79qmmfksvd1mvgnjm',
                boundedContextId: null,
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                name: 'noj56e7dxwfzbccbrbws7sq30pld3zimo1t85r0eaphy4x4u63eevrtv4ftueeymcjbjk5gpzrvbejblk3jt52wsn6xo9eqdqsdv31qmkwejsv0p0kxb2d3hs7ygdof3zleqj7l6s3v6c4t5a04c3un5y79irrwq3xtszm3ibxg9sj5k6a4l23fyjcxvgjo05bwscxvg3gauu8yp2zgowagpqn4gsy5lj4fa0u0ew3uhd157v77reymh6lae9gi',
                boundedContextId: 'bd2fedbb-ecb4-4d95-804c-bfbc047bcfac',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1b74bb3c-30b9-4273-88f2-311e7fe605bf',
                boundedContextId: 'bd2fedbb-ecb4-4d95-804c-bfbc047bcfac',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1b74bb3c-30b9-4273-88f2-311e7fe605bf',
                name: 'xnkzcfhsxp828dz3nxoecuf06t5yhgiwg2tba2be7p1trqt65zdh3w8y9hvoyoln1kbaimq1emp3b4rdajvvyxf7e8uogixkb5jj5n4k7d2c31b7h51ueevmne07unryv81514mmtr3od2jv8179ande834ff38ydp37kpppquwhgnvs5v0a9gatocvmzp9rpronk86o4owadog3j86hrb27o24gkw8krikkvxt40n60z2sfxbsykj6osg87pje',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'lk1w5ssypis9svqqqugziq10q2ujxquof37mt',
                name: 'iizsb3tvevkmxbj9vh057hkx3r0xq2vzo4c7w859jyu5z64msixzx4pvn9rf57pslpg7j40ak9bztn8lv608wxtgxmramlcotig9cilp0tmxyiyzd1uxhxymd6e7a9q98xh6wi8pm5rz7x1qq5ui3umydozere4gv11ki45dm7xikmwyzq1g5irk0gt96aqugkz16tg9ciennt89int638liuj26v86pdq69ua9v4hg3mq7r2qjn8ub184hy5av',
                boundedContextId: 'bd2fedbb-ecb4-4d95-804c-bfbc047bcfac',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1b74bb3c-30b9-4273-88f2-311e7fe605bf',
                name: 'fwvsi6z23hyqaknimkzwd1jsuk9n5hatrpqn21yfvwttjqua237vmxzmf5gswb44sws5if1sy0uz7govdj1r308fvdbglgx2flayonp6zy9jvtpg4wodfqchdodagj30j1azyn59xzs7uhh9f0wzi8etobp2wnjqt2475pt5hasm87enk1d9nqsud3ar1tcpt8xp19ju8kvyofaml6pezl8d3sag5lrb3d4o1g0c8tuw8n0i9m1pxa659xppn1x',
                boundedContextId: 'plyq99lj20lb41g61lrtfgqsydvb11t93c3s3',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1b74bb3c-30b9-4273-88f2-311e7fe605bf',
                name: 'pp7c1m040johlqolfr93eueajrdnpok7a01ylvcmu57u08ub5ajpaq42jye6aqniyfr3mm11q6c7dy206lcycidwnngibz4pf30q9sn3thd837fzl2fo3whflzgij7xrxwln0j2i0l33umrs1kqbqka4mupr4zbeg687jjv8suy420jb7edblcphjhsaob8yxm0hz9gt5ddykvdjenylfny5mjc2lbhofj97e74edk0497ff6m16fxtxjl8tl6k4',
                boundedContextId: 'bd2fedbb-ecb4-4d95-804c-bfbc047bcfac',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1b74bb3c-30b9-4273-88f2-311e7fe605bf',
                name: '8gkwzybs7w2jb54ouvcnopud0vyvyyzabclpls6pib32p1djj071kzpeqq1s8bu48xnhsbv4vk33bbjhbai1lle0zjltpba5cz6cajq38xusgnja98d3ll1ueqmbz2b45xkkrhnqo0tti2oyuulyxd8jdwolhq16bsy2ukxl9aga38xitb305aqq1xfcrlehliiv57vxpqyxtyu6ne604hmah2ei4ilv7izda32dyjisk8g8n3ew0fegsnh1c0z',
                boundedContextId: 'bd2fedbb-ecb4-4d95-804c-bfbc047bcfac',
                roleIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/permissions/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/permissions/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'dc734aa0-9b80-4cd1-9cf7-e51882f64c01'
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '1b74bb3c-30b9-4273-88f2-311e7fe605bf'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1b74bb3c-30b9-4273-88f2-311e7fe605bf'));
    });

    test(`/REST:GET iam/permission/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/permission/f32c5a4c-7754-4eed-b81b-237bb8128959')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/permission/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/permission/1b74bb3c-30b9-4273-88f2-311e7fe605bf')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1b74bb3c-30b9-4273-88f2-311e7fe605bf'));
    });

    test(`/REST:GET iam/permissions`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/permissions')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/permission - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/permission')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '06eeb184-19a0-49bb-912f-58ca47e7e49b',
                name: 'dz1sxitf0feydfgaqaaekpb5qixbqeld56ertn0euigq89amm1aggg7hxaempve0uh2ny0eaap12wlpfg348f3wir7vewt4td132hm5drw0g0h22p2454vd64lle0qnznsxc4a821w8nvaodb8om3pjtnrzd1j2lpob30z7wqivzlmoo8vvg3q0b7bl7oq0q6hctpotyqwkds5ny3zz3t3fshifyavwreymxygqu5blbiioyubf2gbsch68p4sk',
                boundedContextId: 'e0b1870f-c22e-4206-a3dd-b80e14f9c4bc',
                roleIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/permission`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/permission')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1b74bb3c-30b9-4273-88f2-311e7fe605bf',
                name: '3wb84god9k2u30tyyp6cshe5vu4pn7t2f196xc9e0zh82wrp6kuvfagwumviexkqvjfhll1ycjj4zvqzjvkb3kt7h8hf9411cxeovrhhwc6eksxk4bvl75vatd9c39ovgfmp5rsp4w67bp0ccyc3172593hdgmifr0sq5x14ysawgo6e04jw88g5ns3u9l2l761u15cmw4nguaozvl3kkwytjwpscb9hqkb5j7o1kp8aq1n43qqxuklh2pe6kbs',
                boundedContextId: 'bd2fedbb-ecb4-4d95-804c-bfbc047bcfac',
                roleIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1b74bb3c-30b9-4273-88f2-311e7fe605bf'));
    });

    test(`/REST:DELETE iam/permission/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/ea8ecc2a-ecc9-499d-b76f-a5d2121c3477')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/permission/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/1b74bb3c-30b9-4273-88f2-311e7fe605bf')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

  /*   test(`/GraphQL iamCreatePermission - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreatePermissionInput!)
                    {
                        iamCreatePermission (payload:$payload)
                        {
                            id
                            name
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreatePermissionInput!)
                    {
                        iamCreatePermission (payload:$payload)
                        {
                            id
                            name
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'c3d45238-0d40-436a-b468-3636f2bebe70',
                        name: 's8dumoh2v59nzldhoyzvmte43mkdr2cz9q05tjnqjb5c36rb561j4kpt819trxvo0py3zynme26nzfzkravz8le7wtozmhiwp9ht6n53ka0u2vl8075y8vpkdvt74ogznknegl0cngiq4clcbl33o9d6n4lqoykuyj1z8xnjxedhu59o97u3hv0fxz6tcmiu4mgu38u2g3upqhbia4jm6il0a0x4pfn7ct61hhcr71sf8c9lhj1jypxoansj3sr',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreatePermission).toHaveProperty('id', 'c3d45238-0d40-436a-b468-3636f2bebe70');
            });
    });

    test(`/GraphQL iamPaginatePermissions`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
    }); */
/*
    

    

    test(`/GraphQL iamFindPermission - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindPermission (query:$query)
                        {   
                            
                            
                            
                            
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '2fd8ac04-f14e-4612-95f4-768fb283a59b'
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindPermission (query:$query)
                        {   
                            
                            
                            
                            
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '1b74bb3c-30b9-4273-88f2-311e7fe605bf'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermission.id).toStrictEqual('1b74bb3c-30b9-4273-88f2-311e7fe605bf');
            });
    });

    test(`/GraphQL iamFindPermissionById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindPermissionById (id:$id)
                        {   
                            
                            
                            
                            
                        }
                    }
                `,
                variables: {
                    id: '2b08be7b-7a48-4664-bed2-b3fcc6896682'
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindPermissionById (id:$id)
                        {   
                            
                            
                            
                            
                        }
                    }
                `,
                variables: {
                    id: '1b74bb3c-30b9-4273-88f2-311e7fe605bf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermissionById.id).toStrictEqual('1b74bb3c-30b9-4273-88f2-311e7fe605bf');
            });
    });

    test(`/GraphQL iamGetPermissions`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetPermissions (query:$query)
                        {   
                            
                            
                            
                            
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdatePermissionInput!)
                    {
                        iamUpdatePermission (payload:$payload)
                        {   
                            
                            
                            
                            
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        : 02254c8c-1ee3-4909-9bc1-ccb787d6fc24,
                        : kq9wmmbhbq7gv6jcgzr9eg263r3zl7da3zik4hjtls3swuu2b3x2gvxjipvzhlyvgmsrwvghwpki8b05li39cx4h013hetjy9y8xbbcqa3htlvl9dt1nkqmd3sdqnoqk4xtzdnpgw9a3uo9snfnxtq8o7fm17g43h89o9g8b4hpr4eyel4nvrwftz4braso36mxihabvirphzky4qfqptppm8tg22dt59l9bjmzipvtz98ym4k8fd3rv9elga16,
                        : dc93fdbc-816f-4170-a623-0ec4fec9a6ad,
                        : [],
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdatePermissionInput!)
                    {
                        iamUpdatePermission (payload:$payload)
                        {   
                            
                            
                            
                            
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        : 1b74bb3c-30b9-4273-88f2-311e7fe605bf,
                        : wnaktefutofvwyb5d77sypt93irgm1802qfmnlzfyhuhh1l43vc3j6kgncl270fu8zpxi251rxm1dj9jawg8mfkavv40pg349vy1ijs46th7sv13mpfdth02stcxrdmkx5qaos69mxadkzemmrrltthg91njnvg0gxxg4xsl6j42abfyzkc0ay68vob5mp0jezc77waao2zft6an6oal1g0pwr6jzwnvf3ftlysun4p2she2viyqprl5o4m2kpj,
                        : bd2fedbb-ecb4-4d95-804c-bfbc047bcfac,
                        : [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdatePermission.id).toStrictEqual('1b74bb3c-30b9-4273-88f2-311e7fe605bf');
            });
    });

    test(`/GraphQL iamDeletePermissionById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeletePermissionById (id:$id)
                        {   
                            
                            
                            
                            
                        }
                    }
                `,
                variables: {
                    id: 'd46e1a4f-f6e7-44f8-bc99-7bc9f77fa13f'
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeletePermissionById (id:$id)
                        {   
                            
                            
                            
                            
                        }
                    }
                `,
                variables: {
                    id: '1b74bb3c-30b9-4273-88f2-311e7fe605bf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeletePermissionById.id).toStrictEqual('1b74bb3c-30b9-4273-88f2-311e7fe605bf');
            });
    });
    */

    afterAll(async () =>
    {
        await app.close();
    });
});