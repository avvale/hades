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
                name: '8z9d27gfxj5b0zqosm9b3m8fy6clozs3ab2yei98uzj58unjjmt94na5nt8bwwbni5uytanb0xcohl4gqc7eib48dg52bhv1rpuyusqj23vq4d6vb02ob66n3odelagk70tfyo2t6e26b3t396l1ho5tzarlwhohphvuk7xjj7dc3byawtzumfps4p4dhtu7ypsugyai9pvcy9k5quoo35mwmuymcgnw0eghgi9j4ny9ak73sne2lrcr40rkh1m',
                isMaster: false,
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
                id: '68bd6820-a76f-4f63-b954-9d14b501f557',
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

    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '68bd6820-a76f-4f63-b954-9d14b501f557',
                name: 'ylkdqer2o3jxbudui44o01186sfk0foeqwddfjv2dmblb7onqodbhmcymi3692juwus8ttfyuzao7olx86mq20bqo5r9r0q4htazb03cchah7n6ne05kt1zo2cbevp6ja5tz4ktycq76rnncqb07o6zrh0z9j0wrqp5cx9jd0sqcbhd334puxfbjhm5zppkqdm2wws69752jewlkusu0xgfpti2eumalvgmcbg3utr062bd5cxsidyb15x6rxtc',
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
                name: 'cdx02u9w93r3hb3kkxr5a9jowwg7h77xer5ceo0my7o5o1ydwx97g0tak2e3r8ua243n3j8fo0vbzrpte938ghies3ey9il11eulwvaq4enye0yxsvyll5b9a18mmiojw319q5u0e6255m9yu0htbi0hm1hb82n41jgqbs6dn93nsbcv26zx7sfgqt1uiysfblfhijndviyl167saiigzlziqpvllcgx93iz1iwqzy0b31e97hk1lv22kpjhf8j',
                isMaster: true,
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
                id: '68bd6820-a76f-4f63-b954-9d14b501f557',
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
                id: '68bd6820-a76f-4f63-b954-9d14b501f557',
                name: '1twdoq4nazndi1ykbumf7688ssgrik5xat0wdyo2i8dvmhzt2myjh39tj44tnd63h5kkzxtwb750y2bs8h8x66euhginvs9e73ssmfsyk6wwpswqcokcrsgojvnhw2djllke8gq7xrq7ecm63j0mb6r83jppm9uqjylh9rjpzgfuj33xwf6bv6gaxbbdl4thiqg0r13voxplviepk8ahywn096fcao7czlq3dgpkrariv2pl74u0g4z9snj2clb',
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
                id: 'omnj6ilw1i659noei18w562r27ee4j7v2l5oi',
                name: '33r2q9cavufcfw9ivdoe043t03w8u45vfeeti6ehgxjkftaq2uutdxkkcmf6gfg50dgkw1g0sv8quie9sj35ecx0xhgua3113hgdap80ugncs3vxf9wlm5ky9bq8cb4w923jcoyd8m4kr3kw0cstbcvx3dhu199z4y8giozhjrt9uqp904jh0ar7r155qbp427lhxlqtxw6qidz6x682af5e7cdpaqv3ezrhsmjau9mi28svvc9mocp1ds6coe8',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '68bd6820-a76f-4f63-b954-9d14b501f557',
                name: 'ztail0o8kduekt234j0izcaqfqw4lgf5buuanbrgy2qyqmr2zbt1ho3h1nq992m1z603d0y0xoni210le07ur79yeyswgzvp92wmudjmdbedctij0qqsjt8job1nhl3tdobv4m2j72ggfu5vac3ab1me0dpxlwgjad1zyrxn758mqu58vlihslvs3ozauajq02s3afc4qh16dwcyxrpmt7qo019qu1k89otc0vikoq65filhv498ammjamdtmni8',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '68bd6820-a76f-4f63-b954-9d14b501f557',
                name: 'jlkkyngz9502pwbxw94zg80s8e9i9wi95yb7x7l1l1m92mlw802kbffazwyasovgdp4oav7erm08h747pecaxq3u1lytop4xp7smgj8c1y8cclpjdvcyhlmf8kt2bmy21595bk25veydv5hlx5c87n5sse8jl0f82i7a330uq5syvyi47kh64eib89fclntlnbj1e7rgn6g40igxdw3s2eanj2w7ow8jn2c7cg70s3sf05mf5rgrc06ns5wor33',
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
                id: '68bd6820-a76f-4f63-b954-9d14b501f557',
                name: '9t37eqr7yun46nmgf27669v41j8vwbaopww43t6ruab8wbsrcjsofiu0apnkvell6qewji3adv043bwgtbnn2y4hrzv5l9lcc0nrjrh8wq9dq2ttyed9ylnipr9cjyzvmc4ilqrruqnbrq2vckz93stgouu97uwqio04y89cigo2w8xv8inv50uvjzrzs03jl9r796ben0fq2h5wb9ix997w6wjb70i7jozfx0vduwwpsu12f4zmex9x3e4z1e0',
                isMaster: false,
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
                        id: 'c37dab43-8121-42a5-ad00-3fd96c19f2b3'
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
                        id: '68bd6820-a76f-4f63-b954-9d14b501f557'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '68bd6820-a76f-4f63-b954-9d14b501f557'));
    });

    test(`/REST:GET iam/role/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/role/225a9d6f-8b67-4676-9391-a6754be37f5d')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/role/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/role/68bd6820-a76f-4f63-b954-9d14b501f557')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '68bd6820-a76f-4f63-b954-9d14b501f557'));
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
                id: '86d633aa-e21f-4da2-a35f-4e07f4c007ca',
                name: '94ydpywqx4i9y35gtm6lwi5iousqs3gz50v0hzr5n4tzq8fqynze9rmk4u2qzkit6kit1nvohx3klsmvfjhv0za1pju4d63mcro1qmk354vhwql5gxqaezjuov642pnulakkuncdyzl1yc7wur1idns2g4uv0log8wzr29mu8o3atgnxjbbzg3fjbsarogxu3jd0hq5r524wpalpa2x567b15tmyr3tksgj2m2wjt9n4gf7ay31h8aepho46kpc',
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
                id: '68bd6820-a76f-4f63-b954-9d14b501f557',
                name: 'anr6o9qmwgx4qybz4xd14ctfqw1c06b1dmklkog7x2aym9cdxbsecvbpadlt7dblf21zgu53b3dqgiqrfyk2wmmz7cexwpem0pjy96xwydlpuv310ug4a5iburc2c3mrl1m25co3m5lnxz19i85f85aziacnc264s1r7oatkn4tt5r0stoyndsuhcvviidpzxmoag52p6e8zm4blnh5jauzjr85rhp059n40781hqsn2kf7ugeqhzyqec6g1yhi',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '68bd6820-a76f-4f63-b954-9d14b501f557'));
    });

    test(`/REST:DELETE iam/role/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/44ae6753-826d-4570-befb-940da851ec43')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/role/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/68bd6820-a76f-4f63-b954-9d14b501f557')
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
                        id: 'd12a1eb6-38e0-45c5-8a1a-b1fcaaadd149',
                        name: 'o4o77ftevyri55pel2hnuqvdyybojyjqqo010i72z6fi9mij028kdqq2unr2sutcwvfdgcswr5qubykx3ftyk4rgyf7cfma3sw6t9cxunmun9llzchex9eoxornnq8antm63dr5l9ikqu6jqraxk8za9lt1m49a1wu4irbu2d829adlpqgri9kjdbrz2axe0kc8ynnmxhn300bycag0x6bw814oo2gllaq2xuj4k3ha8fwbye33rrbc5o7iarri',
                        isMaster: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateRole).toHaveProperty('id', 'd12a1eb6-38e0-45c5-8a1a-b1fcaaadd149');
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
                            id: '51a0e95c-05ea-4c9c-b3da-a5ef23756eff'
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
                            id: '68bd6820-a76f-4f63-b954-9d14b501f557'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRole.id).toStrictEqual('68bd6820-a76f-4f63-b954-9d14b501f557');
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
                    id: 'e0dd1206-4a0f-4770-b887-adae9715cb90'
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
                    id: '68bd6820-a76f-4f63-b954-9d14b501f557'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRoleById.id).toStrictEqual('68bd6820-a76f-4f63-b954-9d14b501f557');
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
                        id: 'd0e06500-3256-47f8-adba-1a8d7161971e',
                        name: '8ltme37vymq9gifbab030urtmtpukt6yfsgz20pn7dvz33jbuxpl4xzvs1918veesuj8ice7fc2aa9rjwssripvvjtwje5b0el7vek610cbh7yfryq6mzu7qfoknygh9ecdew196uhxe10epz1yjkbonigtz3gn2m6gp4dmex4h8v6qtza8bjtbx304xvugbtuwr9d9ua6zei989x9ej650wuve6uu7lyrmdd5ysyisgts72tnmajivyz7iaknq',
                        isMaster: false,
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
                        id: '68bd6820-a76f-4f63-b954-9d14b501f557',
                        name: 'ar5pe877inlxnt55hapxndo1davuqsjpwahmmtsko5pfi6im4mzeczrt38clnf637n138uz0w5eni7jmxhe4io5fhq1bu5dzktos6q7r1kfe954fm18ec0rxkcurwkizo06aham3yltkuue48tavi9pyrkq79janrbbws8djacadhjpa38p25lc0qxxpdsqqtxfkry5f3pgxbflythav69vfi1slj1qmqfp9vzdn35gthk9qmun6273dqkev87u',
                        isMaster: false,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateRole.id).toStrictEqual('68bd6820-a76f-4f63-b954-9d14b501f557');
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
                    id: '043dd8b8-3b47-42dc-9a3e-1440425200d8'
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
                    id: '68bd6820-a76f-4f63-b954-9d14b501f557'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteRoleById.id).toStrictEqual('68bd6820-a76f-4f63-b954-9d14b501f557');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});