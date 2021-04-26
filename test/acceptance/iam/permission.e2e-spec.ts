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
                name: '0wnp6ac3zx964ah18au21xgh742t6fjjftj4f8vhm2e0a0v2cgogqcj904q9d0d0ogpwhwnouggh5u282o0eb6x4wl9xjc84fpmncuuln2xym9j150u7u6t6coj8waixcyrdpltemyx3x3trvewaibyn4f6cfuy9eelheu7a65nedvtumz8o6p1p8f7vvk38qtlkt40tfp18uy7ve4lgyu8fqvxeqd0pmmzk1fwwlnaaae33amd91k2lzwhooq4',
                boundedContextId: '39a3fe83-fb5d-40d0-891e-067e1e361ca2',
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
                id: 'a7136f10-a914-4399-af11-5d7e4e7f3de9',
                name: null,
                boundedContextId: '39a3fe83-fb5d-40d0-891e-067e1e361ca2',
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
                id: 'a7136f10-a914-4399-af11-5d7e4e7f3de9',
                name: 'xmbfm519rjugxg9qtwwed93b7zveeaaryo9cdboklp24h2yfhazn3wc0g4z6wi4yytmwf146ukvbvjs162ytt2kiihy4e9wjca6pkcys3j4ofgpqf6mpqiqiruvkt9vr0yh4mg6tari06swyqe2cwik24uv6ypm42ple6kespxp5p8cp4d4f75xjwn9xlbiaeszf0j011pibpuxdwwfykm2owhbln4iaqqyhxonqxl3hj0mtu8dhyavhlo2wkq3',
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
                name: 'c4jpqif1ee883phuo2ddvin8l64lg1q9nqo4ba2fjqtigx9q4ag6plmgt3jh0sgdtu5r1hl8jna2ol1r1hxsirgehelhhtqxji8zzyd6f9rghk8q9oxgug7rc2d873917b6i66bsbf5igvlmhfnseuxibjy40apv36b0zzj69e8ix024ro8xouqnjqkimgqtxufybkxcoxrylk0gt9stb5u81l5qia1d8vrhhr84nxi7yvebbsazhv71s54tjnx',
                boundedContextId: '39a3fe83-fb5d-40d0-891e-067e1e361ca2',
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
                id: 'a7136f10-a914-4399-af11-5d7e4e7f3de9',
                boundedContextId: '39a3fe83-fb5d-40d0-891e-067e1e361ca2',
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
                id: 'a7136f10-a914-4399-af11-5d7e4e7f3de9',
                name: '7815lri2trdcgen4m4ot98ma54vnqh37bssnxr2cpkaeotil7slysiqqhvn62k738bl99jnoxphdl9k4i1mkdnciatpf3y3xztebwppinwvrp1apk7ev3bkqlo8bp6lyzdu6kwgfrofh4u2iyo2lljqoi4tba1hhxbcnrzicgcd5qsw103hykyefco51c5123afcmm6ga0gbsjka4covcfpy8dqwl6fuw1rdahfaw73uqg2e0jgrmesx1rybp7k',
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
                id: 'fmpwsf1pyiky0slbp0hyfdz1cfcamh8heabyp',
                name: 'p7anei3lahgj2v6np5qeq5ftfc8yjrvsf35v7age12aakvt2ru1t2itgwruye1zqf91et6rd95q9p8ure5ay3opzvthe6xue6rhmbcj3n2m54jd7dyvu0kuycw4wb735jtsfebqzkh8b7rfn3atbt08nn3xkge7tnjcr1r5itrs5dia6j01b2eezv5j5sh70jfdd499cw502i5366u7hcrji5ke0pkov2bhga9tfd3jhyyghacrvl1x5dj7eeiv',
                boundedContextId: '39a3fe83-fb5d-40d0-891e-067e1e361ca2',
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
                id: 'a7136f10-a914-4399-af11-5d7e4e7f3de9',
                name: 'auxb2png8y0wunfcc1igfipu9bjgvrj6xeugao852fi67kyqyi1jus8qo8ek8x9ucpq72mhztlrgy9u0fiouceh6d8lsx2dr6kkvdknozcxt0qb5is5v6xbw5qaj1id0z4liq8isre5gy8jtcbq70aj8gu45q930e6i6cjmpickp4l215azrn2loj0vhck1flhc01kevtt7rc7aa3q9c70m26yr6n8g0d2rw4tjjq4j3kj50pjp1p8s9z2ns6id',
                boundedContextId: 'jvqiwz9wumwf0neegmex7fmqsbqa7chttc18d',
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
                id: 'a7136f10-a914-4399-af11-5d7e4e7f3de9',
                name: 'l6sybkgp4xkm407passf4imtrfkxxhs54p5f9o0g7sss9lr0d6zi8c9qvgjnfgthoevhyejjp28g6b8k0aian96jcoqvlsvfya3nutnsfai1ogalgamsvh0qbdhrxkgz2g3r11374xd0hpnggncjzoav4pib4upmbqrlg01gmhp6whvvab7ekn04usapnl2qc8zi8ndn19jovth71dqg8i33pv2lj6a85dohwk9painrf4c5d1wjl21kkg1mqo5y',
                boundedContextId: '39a3fe83-fb5d-40d0-891e-067e1e361ca2',
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
                id: 'a7136f10-a914-4399-af11-5d7e4e7f3de9',
                name: 'r278e3u8z07b7iozht074ydls2cog75nak6pii7fiqkjm0u7atw3yf3wqbo1g48gxmkqearxb2u3app7ltpaasxipz2t9qv3mkzq44qjb1jwwr705dxe9tspwivo69eh1lx5mwqz9ofngvrhahgo3rghjuhg46sdcolnju7boa0s756qbedlidur39dv23fmactkwhzyyz5ivbc3iknz1zfvcue7ctoofe3oy65dj5nb4h4uidnbzywcs2689j0',
                boundedContextId: '39a3fe83-fb5d-40d0-891e-067e1e361ca2',
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
                        id: '2ceb0b26-d144-412b-a346-f13f25e69f92'
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
                        id: 'a7136f10-a914-4399-af11-5d7e4e7f3de9'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a7136f10-a914-4399-af11-5d7e4e7f3de9'));
    });

    test(`/REST:GET iam/permission/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/permission/18424491-66a5-4f50-b815-e95fa94e2f5c')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/permission/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/permission/a7136f10-a914-4399-af11-5d7e4e7f3de9')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a7136f10-a914-4399-af11-5d7e4e7f3de9'));
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
                id: '0e4522f2-9067-421b-9528-b09f4d81f59f',
                name: 'rbri9nvzpkry6au3x3q7zyjciydqtegwrafg59fiz0vxfwkd43cs5ja8x7lhvnhdo49pebl9oyh6ai3d2xa2uwygpffdkas157at26mn7nywgvkgirvmre04qf1ambpuewdlyu1t5z50u9dhxcttuner86be2xeo6xmou4yg33y39a49l0ijw7d6545c87fgd7rzdyygip77h5ajlcg4nkm5ddx3z1leonpng0tpdyppzd6j8ff4sjmhj67bbtx',
                boundedContextId: 'e19cb305-bec2-4da8-b45b-5a5a24c0f539',
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
                id: 'a7136f10-a914-4399-af11-5d7e4e7f3de9',
                name: 'l3swtb19vnt3gzny6akwlrkfh71sajzc4pgnt9zbauhk2k6l9feeht0pcjyvvt8yubxwsdd02zq1p0yfoqhb6xnngeit0laostjjix93de7xjox1zl4ft81q2t4fov6mybkixf6g9955m2jol0fnflq9gra71qff8qtev06frydy5ngagov36vevfnjhjnlkrzv2au9r8ql2a4arsjc9vhwhd7f8gwadi831kqkbabck8buus7upu70hsk5umux',
                boundedContextId: '39a3fe83-fb5d-40d0-891e-067e1e361ca2',
                roleIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a7136f10-a914-4399-af11-5d7e4e7f3de9'));
    });

    test(`/REST:DELETE iam/permission/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/f3757bd7-6999-49f7-9e11-15a61534942c')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/permission/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/a7136f10-a914-4399-af11-5d7e4e7f3de9')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL iamCreatePermission - Got 409 Conflict, item already exist in database`, () =>
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
                        id: 'fb1b51fe-1d73-465f-88a3-05e6be1a765f',
                        name: 's61j2jsuwy14yu7jqcwyxfl21hfqnzcpn44v5wyveu69slg30vu8epapumbxx9dah8p4qyer6sp3552t949hbf177k5qd6ea1hz4copvenjznyyn19zbt5tlakh44ubzlvhw8yosmhnf2g4g7s97sfv1v6w5iciis84aqwungrfi0zyslsopzvpge2lzqvmtq6edb8427oyoq37f7kp96jnzm6e82xsxr6kepu736yhj1jqa4dvaepy904ftf63',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreatePermission).toHaveProperty('id', 'fb1b51fe-1d73-465f-88a3-05e6be1a765f');
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
    });

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
                            id: 'c3c29e82-8da9-4d0f-bea6-05347a48c224'
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
                            id: 'a7136f10-a914-4399-af11-5d7e4e7f3de9'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermission.id).toStrictEqual('a7136f10-a914-4399-af11-5d7e4e7f3de9');
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
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'da1fd182-d0e0-493d-8674-98da264b780f'
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
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a7136f10-a914-4399-af11-5d7e4e7f3de9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermissionById.id).toStrictEqual('a7136f10-a914-4399-af11-5d7e4e7f3de9');
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        id: '7f23d1fb-05ed-447e-8b50-345fd590b246',
                        name: 'kd2unqjixs03z7i5s5l90huvzjzxlwpza0mc8xuqyiuyb2pyfibj6xhfopg72dhup7hr5bfzuknlfg4gkniqkbc8rg7yx8mpcyo1c6cd2u5df0lbpixkf786l332dhjb7dug1zsmrcd28bg9efern1fnh3wckdaa6aw0bjahehldaw12f0hst33592o26uvbc123texgrid8h2rn5v5g6kw3df0cfvj3uqx83q453tn52oky1jcru3t6g1npope',
                        boundedContextId: 'fd6e8756-f6c0-44c9-a4a4-2056e2047a6b',
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        id: 'a7136f10-a914-4399-af11-5d7e4e7f3de9',
                        name: 'vzcq7q1ih4aitgs0dkm46lyzut0zjq4own71ykhzpl6f3ftx72x2jx2mnex7ygicdjsv0oc4zzf9s0rfcxf40sibydgzxoa1qh57cutq9r7kqwd7gn37d3vr4jnxx2e8levpxj4q26v77v5xr89bmfw3jokly1lgoz5tpvysb6j2rslx8x2jdz7jd2yd3yj3f2oifqh1iibejbv9tg227l01uwxtnzdmyubk28jegchvzwqtl2fczv39m1kfx0a',
                        boundedContextId: '39a3fe83-fb5d-40d0-891e-067e1e361ca2',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdatePermission.id).toStrictEqual('a7136f10-a914-4399-af11-5d7e4e7f3de9');
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
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a131e116-166b-40e3-a474-1960d9f0e987'
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
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a7136f10-a914-4399-af11-5d7e4e7f3de9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeletePermissionById.id).toStrictEqual('a7136f10-a914-4399-af11-5d7e4e7f3de9');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});