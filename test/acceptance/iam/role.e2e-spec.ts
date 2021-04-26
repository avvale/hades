import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/iam/role/domain/role.repository';
import { MockRoleRepository } from '@hades/iam/role/infrastructure/mock/mock-role.repository';
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

describe('role', () =>
{
    let app: INestApplication;
    let repository: MockRoleRepository;
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
            .overrideProvider(IRoleRepository)
            .useClass(MockRoleRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST iam/role - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                name: 'uyo455uvw98zxy87zmax75mxxtjwn4fc5f21unrba85tjhtu91po2jinanh8ypp3yvg6em7xc7elqhyodvbw76tky1d4j54ob82pulz8amm9d00znz1qfw84e8hmyytgtv5i8wwmyg7vrr4xs7cep1vc2eirwj8igb9k2vdgvifrxp50m5jz4h4e7550bouvha5hnw08vdu8p0pjhlu1oq0nf3pl89jg1qgfcffjqcf6a4k17tqxwe5ao4zflia',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5a08719b-171f-4fa2-914b-dd42b5813add',
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

    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5a08719b-171f-4fa2-914b-dd42b5813add',
                name: '6b1nno6drxnb1h03kqtaby814tyo2odfk7rmz3xi3f7i8rt86l6xu7ucdd40i4t6zn9mkr7yfz54o629l9rovir5cathrvkw2ekbiq32wlxt4o9y6yf1t30m5g6prk886uk6ghueeykie7eczf1cjur66mzjndt3rsl82nyx4z2u5umebc4bi3m595u0itzczx69xxfo2512kbatti51048coim25xralixz05bssqkw0np37aso92f40vwu031',
                isMaster: null,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                name: 'jqdhwgcrqenwi5ecqpaq85upl2krjlx490wehb1i6ch758feavjys6an0tnv7og3rfh3xo98o26g37p0g681a58wd4ou3t9wd16blok816qrk6d8dq7hhsl36lth8kzh1lnag430vmkimf9u9tfsm88f9lghmf4lx2vg3egmke2hskm5a9uwch6fbeyf2561pggreqks2cabgf94le9iwu5qloyw38qiit8w6mgkddqo4qetkl4xv1si8ylls63',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5a08719b-171f-4fa2-914b-dd42b5813add',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5a08719b-171f-4fa2-914b-dd42b5813add',
                name: 'ggp0emtyz3tpwopd1bwfcq8i5uum8ueus1mz59ep4zi9smmc2l6cdayq4s7j8bswegqzvec7e3kysfrkb722f4yc9f6753mzfq28kaqj17auyg6ndzjgm6uf8vwfa7mbs93nqmnglouute72evppocexkh9d4mebpgaivx7bar7uplklc702zrenj2vsn037k0mfypany8537jg9rpvamuqw5022lilkuen02votrftaw7n0nm2po2khxq5s2yb',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'oa6nxmquj113qc61i1euiah8vejw5h42rg4wt',
                name: '9chn0s7k257xqtl8ukhg71whu3gq3lkzdxy1vf095fvd7wglya74ptwyog5j5kawwv5fy4jnctok5mwvseaehqyvcc75dezzz5a4hldzgll8jyxbe01pbozqguxd5366o3aicbua2wiakkww78i7fcksvl0aponq002tinbpdiies7o7r2hhswkse72c8uj5db2pgo2gyxp98r09uiuehe472wu3ptviloz48ulbvhxawcug3nzs7m6i369gars',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5a08719b-171f-4fa2-914b-dd42b5813add',
                name: 'pgs7zte9ilv8yvvtttymrdu1f34k8mb8g7qua9xd69f5w6z32eag4irc0jjjpcfrwa8e8edbd93bbiq2wxh0fxpj7gxbrsmrb1ohgffmpiwbz1xpddnvw7iz5pz44h6xrm4qh6gto8ogo5g9uj34loizgu3zjf10rd5f8dyafyzljht5jmsx5k45gtmq26mnmr3p9vbwma0g6h637gdgtdenm8rtqw34fezjxq26kdj4o7me1l681ficss3tvtdj',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5a08719b-171f-4fa2-914b-dd42b5813add',
                name: 'gihajj4tpr4kfkp8uwwg38q4jyhqimh7hamr8szvjuv3k0bpe7crjg57cint3h9qsobgu80goq6u49b6qb16p5od5edatq12ypt2w35qcydl7bh670yaxsfz5qcp19wlchmh5qchue8ajjd2fgh8b6pkpt7onq72pww1cpndnb6gpook7o7wa6x1yi50asw1uqa82s117sw0rfu1zeb0mezzutmt3uuryu5xjbdo0n9qnfylx78a7n8u7atizb6',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5a08719b-171f-4fa2-914b-dd42b5813add',
                name: 'cole1arsm3dmyqqk8m92em2y96ce8orxddkr58b62570ca3py14t3588o82dj5fznjk9lx7v7mluwscm2bt5onjcoqkhg4avletld7z9gsgs0k2vgbze3fxrxav5h50j67nh7lqgz69xad2xfgdt1ju97bmypf73z67ba4jsok0uzvg3flew1klcw8w2k2s6ng3ifsozqdfzrqqwm8q0g54x8hg6njrsnf72apwy7wwk726tmw0bapzcvzutuka',
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

    test(`/REST:GET iam/role - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/role')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '6896fc41-8813-417c-81bb-06b6d4650f5a'
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '5a08719b-171f-4fa2-914b-dd42b5813add'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5a08719b-171f-4fa2-914b-dd42b5813add'));
    });

    test(`/REST:GET iam/role/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/role/198f7bac-bae1-4e1a-bd6b-f9d0e026f086')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/role/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/role/5a08719b-171f-4fa2-914b-dd42b5813add')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5a08719b-171f-4fa2-914b-dd42b5813add'));
    });

    test(`/REST:GET iam/roles`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/roles')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/role - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/role')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c2dac325-4e5e-46f4-aad4-4a7e97f179ad',
                name: 'sdsjquyk8tgjmmt2ndebw0bd1p8snpobwxx43j2jtwtr7csjm6icajjhmvrk6kwbhs7dvq2qcbsuo43s11i5hxk8k6nqj9nja913al3pkvgv168sscs5ynl2vkvvp78jxrczquge45dbdpen9gzrax972ohw4nue9ylc8zu5qw2zl31aislc1x4xn771plpkh58hyxvetjlo96jvp54poil04yv83u2gni40plw4ykkqhgqsjgrsw21f91d9xsr',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5a08719b-171f-4fa2-914b-dd42b5813add',
                name: '2o9z1mdpl8eokmr4e4jh6viajwj7gfi5t46kzru7iyeeuiu3slok52vsdkx759lcb11q8abgiy86nf0eiam48ltwdc82esvbye318g2xl2o58fnd1ftzsamk0agdi2zcvm2go8xfye637cz2vhv8ie45nei265t5epols08snmd4j4gzn8bkr79hw59n7w5uccwdaeb9sceo3j8j5lbdp6c2feezg8n1x2zhz22wy9r6z3ig2pewobjyy41poo6',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5a08719b-171f-4fa2-914b-dd42b5813add'));
    });

    test(`/REST:DELETE iam/role/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/2fc3a1af-cabe-4d0b-ad2f-5877d464ea99')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/role/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/5a08719b-171f-4fa2-914b-dd42b5813add')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL iamCreateRole - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateRoleInput!)
                    {
                        iamCreateRole (payload:$payload)
                        {
                            id
                            name
                            isMaster
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateRoleInput!)
                    {
                        iamCreateRole (payload:$payload)
                        {
                            id
                            name
                            isMaster
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'cced423a-7b88-4815-8529-9c0154b5c967',
                        name: 'bsram4zl7uel47ra2o61xqn8pqbwyga869pa4h6qdt46f60z0uupcvuxy78h2pqlnmfvvk6hdekh5l7sp9olslh0edoqizz7fo1a1did05933uqnpenq7q2fb1i0kg30iofyucbm15d4w3znah62yt1fqu7ka7sbl41m664xz3jilcbh9lanycu2t503ul66eqf84lbw8cnoa49pax8wz2xxvba5kga4l4l44chsazi9nlsxd7wn430kql3r6zx',
                        isMaster: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateRole).toHaveProperty('id', 'cced423a-7b88-4815-8529-9c0154b5c967');
            });
    });

    test(`/GraphQL iamPaginateRoles`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            id: 'b984715c-c733-40d3-addd-fe6226c19a7b'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            id: '5a08719b-171f-4fa2-914b-dd42b5813add'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRole.id).toStrictEqual('5a08719b-171f-4fa2-914b-dd42b5813add');
            });
    });

    test(`/GraphQL iamFindRoleById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '601bbdc0-38a2-4f09-b94d-de01785a9d63'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '5a08719b-171f-4fa2-914b-dd42b5813add'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRoleById.id).toStrictEqual('5a08719b-171f-4fa2-914b-dd42b5813add');
            });
    });

    test(`/GraphQL iamGetRoles`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        id: '531f5310-cd42-41e1-b29d-c87279f149bf',
                        name: 'eob2wfmheanfx82wmnq2zsl4xurvinw96d145d24hil8tjik6d2gftbf5f8ifke2ywoecabp33ys86pdlktskdwq29siqniqm0qc1sp2zoggih3vdhj98iu9kbwrb0e5jt4te99crot7ejtt14oxd9aw1wjp8gfl5px8gcl47shmazfzne10e6u30wvtfnowg0u26s861x6k21sa9txovuenwuj4w4jm7lkjrar1h3lpaxthphw2pyy2qjyeimb',
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        id: '5a08719b-171f-4fa2-914b-dd42b5813add',
                        name: '2wxps550z21le8wt8av5ogcgy6jbc1g9wqa8evxvbvj0d13ojb9nccpoz6cbkp54rgkrisn8dlea9jl575jpuowpku0mqdymaw3i2sse8dn1hea7o92e8hr21j5b4vfmrueu0i1lpew93pmdj98i06r6z4f87i1ghtg0go5pbeaozsqdgle5581j3kh88szbhyulu3b4wibnks5ew7e9g0wvqjpijaree28rd11us53ftpjtcdhuvsdkqe7uje8',
                        isMaster: true,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateRole.id).toStrictEqual('5a08719b-171f-4fa2-914b-dd42b5813add');
            });
    });

    test(`/GraphQL iamDeleteRoleById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: 'c1fc0a49-1015-4440-b698-14b27025e3fa'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '5a08719b-171f-4fa2-914b-dd42b5813add'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteRoleById.id).toStrictEqual('5a08719b-171f-4fa2-914b-dd42b5813add');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});