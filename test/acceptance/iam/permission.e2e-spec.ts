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
                name: '1jd33qda8anwy1g254oab90b7uz7zxr1xgs26gv0bxa94m6ekvfw6xgn21oxi9o575jf3yk6ed5uqz0qfdf97btuqzaljwgw4ri36wkrci0cstdrcz00mtj6ng89xhcxmmjwaondfkxzpl055b47guiso1mwwf0xq2dage2kjot736dfu9wh67g23dwvy6u5yfuthhcmr5j80ethpgr7ygeqnujo720dqdwl5o33876di9aq2m9gv8m1x5eggow',
                boundedContextId: '1af41918-d565-4990-99f9-f51945b1dccd',
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
                id: 'bd15cd18-46c6-4312-8df1-d30c7d83e3e5',
                name: null,
                boundedContextId: '1af41918-d565-4990-99f9-f51945b1dccd',
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
                id: 'bd15cd18-46c6-4312-8df1-d30c7d83e3e5',
                name: 'myp1e6lh1jhfyf8xmlb55n6slyqvzkdoc9j1q0bogzt0vets0cby3fcsdvds2ykc30lgcjyamizaxkwcpjtkx4zs9wqdptjwnz1xfg9p90yyr7crwfx0rpoitrd42yrj788unhopkew8b8gt0h8itqmf9v1ay7s487kjtp2yjsvu01tiseok03s1qta8snrm52va1drtjmdki0rpsbc6x89v6wnq37xp2fwy0jk9bqyqetyms9x7f2s3k4y3a7l',
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
                name: 'qb4zryrgxbrkwc40cb99reo6fq08fnj3rkhkoz73wgyc3nukdlzscer26jw8a1mm4b2fvfzwrxsniigmydr8uwn8s0anmzw6bilj557llsdc963f217foj8vzhc4ys9vqzqm05k3r7xoqpe5aiaex026z384apn9grvr194xgkejqmoa9fsdaecfiiylvec1h238jt5ckl9uukfgj1hzdlt0489xsxnayoq0aji84rurabbg1zfm56xbwok0a9k',
                boundedContextId: '1af41918-d565-4990-99f9-f51945b1dccd',
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
                id: 'bd15cd18-46c6-4312-8df1-d30c7d83e3e5',
                boundedContextId: '1af41918-d565-4990-99f9-f51945b1dccd',
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
                id: 'bd15cd18-46c6-4312-8df1-d30c7d83e3e5',
                name: 'srhvf0so2jzv63lp680j77v3q0t3bvf4bn2f0va8z7qtk45tdl7x3n7q6xc1lvr44ue6ew3lb7shjp39mevfgj0m69j84parwjfc44lbghnt2bavigsf538fcvvd79dtfp5o53lo1yoez52b42fhazquyynck9pplapd80w4r1ldwl8otamgqoa7wfa5s79er8lhz5ojd1jh3vok4ce003tj63fw2moshsq990ib3bn441bx20fnc5ow8d6n9lp',
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
                id: 'axiim44ipqzayxl6qisg5zni0nj3jwlruddw0',
                name: 'u88gkn387ou8votdlzzf3ymf2nvn942x4n0fajusdr9t021nhua5k4n5buc96mo92rx3hgp6zz8vd2g6q5x1a2jnrjh2ftwq3jamuu5a7pwvtjjqx0gfmfcr1w53jd7yhvv7wd4t4e4iykxept3l4984p7v4w3u6bv74tao6xfxxzci5amj319g4s9ma9bqz4w10tvd6w93skoxv8amxzalhf1ls0bahps313hf6gskeiqjnxtf4ikp8rl40tin',
                boundedContextId: '1af41918-d565-4990-99f9-f51945b1dccd',
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
                id: 'bd15cd18-46c6-4312-8df1-d30c7d83e3e5',
                name: 'tg6treamc9uovr378z87gorjlfflk9jy6ng1bhcvjpl4w7z2c5dtmmmkhieeugcprnb4q0on2dwymwmd4gnktqbgpjxmqef2b6g7qiudxyc6kj0kkshzj1hxzrk09sa2zzxzun2u0hyucuw2yvwpths2ukzcgz2rkn80mcqfd6jv246wws3cmb2wnqaacv0bxp2psy2j5geiw13xcm6120bk6qitlcp55ll3s5xgiz0uipnb2a98mshdqkkh0jj',
                boundedContextId: '4z0l5te7f1qsfh3tsfhuc1q00siq45jwld87j',
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
                id: 'bd15cd18-46c6-4312-8df1-d30c7d83e3e5',
                name: 'qhczhjdhln7o2f1euek0pbbchcuy1erv9fwxxgm2ire63zqqrrupbrl0gslen57a1318kyfnasgcee48vtcx09o3t073v5es1c1ry4oyp2ot80szoagthn27yerifx62xw8ztlv107502ri1im20zsreg3tx0nq3un0ke65ftplnswttoyoaelbr4rppq2x3fmlroxq53csum7tzv5u91kt78cpkdgf9ayomnzm6f9gl6a72uv4qlrdhvkvwejiv',
                boundedContextId: '1af41918-d565-4990-99f9-f51945b1dccd',
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
                id: 'bd15cd18-46c6-4312-8df1-d30c7d83e3e5',
                name: 'k6rwsoran1pvz9sn7xkx50yktvujeoirmmc1jvy2o5lgxe7ij4mgl7oz2z0bzffwaqc97eainuk1arlss95vkpemfdfwwwjn30z67afoppp688j1vlg40a0l88zh0n4io8ucqz8y69k0vfpsqwbp21ievcufmu2cdderksdccswgwlzcissdymtnrr5g1nr883em0d8xssb22abw4df319zq0mgbgbqdvszb4dz197pe988p3f3ovvfrcc1w4pt',
                boundedContextId: '1af41918-d565-4990-99f9-f51945b1dccd',
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
                        id: 'f47f0e79-86cb-4ca3-86fc-b88294f4f8a6'
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
                        id: 'bd15cd18-46c6-4312-8df1-d30c7d83e3e5'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'bd15cd18-46c6-4312-8df1-d30c7d83e3e5'));
    });

    test(`/REST:GET iam/permission/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/permission/568bd2e8-edea-4c52-89bf-475ccf0a662a')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/permission/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/permission/bd15cd18-46c6-4312-8df1-d30c7d83e3e5')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bd15cd18-46c6-4312-8df1-d30c7d83e3e5'));
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
                id: '7a12beb8-0b0c-4fd1-b52f-a2be58750cff',
                name: 'e1xas1t9g659k4qycxofrpdykdyw7f0wzrquixthmaykfydrrx5kk6pt6w5eebjy5t8z2sklz1d8p8d9zb7j9tdmydfrbhvqwtyi80vunltctcgqmg02ossexjkpk5fmgegwc2ptts6qel82sa1pnxlv0r1kkaep6li4575xgkw8hnuf6g11w49d15lpk1pmphfcsfmzzhkcc7kjkw5ixfam2ht2sjlvadska31rutz2law7ovz7d4s43qkk9ne',
                boundedContextId: 'b0e74fd3-9926-45c4-afa3-ddbfbaa41ab6',
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
                id: 'bd15cd18-46c6-4312-8df1-d30c7d83e3e5',
                name: 'dm9pq6t183o6u0sik1sze9v3ib93ef7m5uq2fr50rhutdhc6o7fyu3ragbluqgxh44oj2w3zl3wuhu9gotkgvzn85qqd2hyf80c3bw11z9t9rcbi98whcw14zqtdrxxwrl8786rw1f7bw2qxv2vhf4vjabfou5exvf3uitccc9dezxv23bqf2u125so5s6n43gz4nfz4vilihfp1vow2bopg4d91kkrksfh3xd6jxp1925ckrfliqj3lr5or05q',
                boundedContextId: '1af41918-d565-4990-99f9-f51945b1dccd',
                roleIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bd15cd18-46c6-4312-8df1-d30c7d83e3e5'));
    });

    test(`/REST:DELETE iam/permission/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/c54abeea-72fd-4913-aafe-ac14c481dfea')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/permission/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/bd15cd18-46c6-4312-8df1-d30c7d83e3e5')
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
                        id: '2b2b7d5b-ebe7-4306-b3d6-5d575a54015a',
                        name: 'bey3zq945z0tmldw50xlt31lws7ory1gcjch8067xcnthah6sall386lsabcqfgnyo90rpnt2uubo13wck7v1i4eeow7llrizpyd6e4acqjgolgwqybsq4nihrp807kay6p8yp9q1u6zv56e9p65q3552h10bmiz2j9ra0vbu7vgcedvzq7zc0cr59daarof5kg9qgpjjawmltxwg0xrj661g8hiyyymagmabwfmyli44i8p9ohozw25nvttone',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreatePermission).toHaveProperty('id', '2b2b7d5b-ebe7-4306-b3d6-5d575a54015a');
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
                            id: '41f8aa6c-441c-4b1e-a316-f74bf324650d'
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
                            id: 'bd15cd18-46c6-4312-8df1-d30c7d83e3e5'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermission.id).toStrictEqual('bd15cd18-46c6-4312-8df1-d30c7d83e3e5');
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
                    id: '073db2a4-ed84-42a8-b57b-a217c1255ff1'
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
                    id: 'bd15cd18-46c6-4312-8df1-d30c7d83e3e5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermissionById.id).toStrictEqual('bd15cd18-46c6-4312-8df1-d30c7d83e3e5');
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
                        id: '52fcc055-34f3-40c2-8b91-669f27702ea0',
                        name: 'dh7b0eaqrsc5aki7bhhd0atz7fuk5fiujbgw9b2ysujk5eo8lnhiy2dhgpu1729a0733u4hmj7j09ik63meofnq228wil0627jdga07q71qmwk5qtcxxecj7xqeqam23r3czmd0h4mpti5lm4415xy37skn0umooz85twe60lc37vczyrxt4hovgxjgnh1vilf9ohjn4mnf4qe3uon504l5wnuq2quzw6fodu7n16uxbe0hxhwhoey03geddaq7',
                        boundedContextId: '06d4a1ac-8d22-4c49-a274-3b7ea3b6f171',
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
                        id: 'bd15cd18-46c6-4312-8df1-d30c7d83e3e5',
                        name: '61793vkjccyzigicz6vdduuyt5js1309rjpyez8qxpw9bcvj4342kwknl695dzmfufcljcxj4ecwjyr4n4ef6c2b6go7kq72rbk0e0ktwf0p4gfvap3mxtrv9fci57w338x6fw3p9548m75287qjbn8sntmb09qeoehhtxoee2uhz2ggo4iitga6kb8itvfktjwe0kjjeiij6ed9e73nji3pj1djh4zt8sfd0c9lwv399f2loq50ni52usjekaq',
                        boundedContextId: '1af41918-d565-4990-99f9-f51945b1dccd',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdatePermission.id).toStrictEqual('bd15cd18-46c6-4312-8df1-d30c7d83e3e5');
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
                    id: 'e2dd1e6a-88ed-455f-94fc-6d44ff8b47a3'
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
                    id: 'bd15cd18-46c6-4312-8df1-d30c7d83e3e5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeletePermissionById.id).toStrictEqual('bd15cd18-46c6-4312-8df1-d30c7d83e3e5');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});