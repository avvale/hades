import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ILangRepository } from '@hades/admin/lang/domain/lang.repository';
import { MockLangRepository } from '@hades/admin/lang/infrastructure/mock/mock-lang.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('lang', () =>
{
    let app: INestApplication;
    let repository: MockLangRepository;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
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
            .overrideProvider(ILangRepository)
            .useClass(MockLangRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockLangRepository>module.get<ILangRepository>(ILangRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/lang - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                name: '6',
                image: 's',
                iso6392: 'ri',
                iso6393: 'thz',
                ietf: 'ms7ix',
                dir: 'LTR',
                sort: 989476,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: null,
                image: '1',
                iso6392: 'k3',
                iso6393: 'grb',
                ietf: 'ku50f',
                dir: 'LTR',
                sort: 568063,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6392 property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: 'r',
                image: 'b',
                iso6392: null,
                iso6393: 'fkd',
                ietf: 'opq0j',
                dir: 'LTR',
                sort: 759349,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6392 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6393 property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: '5',
                image: 'q',
                iso6392: 'pj',
                iso6393: null,
                ietf: 'tqnac',
                dir: 'LTR',
                sort: 813005,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6393 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIetf property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: '5',
                image: 'w',
                iso6392: 'xs',
                iso6393: '70q',
                ietf: null,
                dir: 'LTR',
                sort: 568030,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIetf must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangDir property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: '6',
                image: 'd',
                iso6392: 'hp',
                iso6393: '9dc',
                ietf: 'v40en',
                dir: null,
                sort: 386008,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangDir must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIsActive property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: 'b',
                image: 'l',
                iso6392: 'zi',
                iso6393: 'm0v',
                ietf: 'rszem',
                dir: 'LTR',
                sort: 525207,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                name: '6',
                image: 'n',
                iso6392: '2l',
                iso6393: 'tmz',
                ietf: '8mdee',
                dir: 'LTR',
                sort: 494810,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                image: 'i',
                iso6392: '3k',
                iso6393: 'h3g',
                ietf: 'rkful',
                dir: 'LTR',
                sort: 641965,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6392 property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: 'y',
                image: 'e',
                iso6393: 'pr0',
                ietf: 't8udx',
                dir: 'RTL',
                sort: 291498,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6392 must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6393 property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: 'm',
                image: 's',
                iso6392: '5a',
                ietf: 'vb9hy',
                dir: 'LTR',
                sort: 117197,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6393 must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIetf property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: 'q',
                image: 'p',
                iso6392: 'hk',
                iso6393: '71u',
                dir: 'LTR',
                sort: 168917,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIetf must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangDir property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: '1',
                image: 'f',
                iso6392: 'ja',
                iso6393: 'gpi',
                ietf: 'qdj1k',
                sort: 652416,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangDir must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIsActive property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: 'b',
                image: 'q',
                iso6392: '6j',
                iso6393: 'jsr',
                ietf: 'p10xd',
                dir: 'LTR',
                sort: 664671,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIsActive must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2dqw90fdrz4bkrtdnmujllruffh5b93vy8w71',
                name: 'l',
                image: 'y',
                iso6392: 'o8',
                iso6393: 'fk3',
                ietf: 'xwk7v',
                dir: 'LTR',
                sort: 484488,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6392 is not allowed, must be a length of 2`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: 'e',
                image: 'r',
                iso6392: '3nu',
                iso6393: 'blt',
                ietf: 'qrwau',
                dir: 'RTL',
                sort: 473439,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6392 is not allowed, must be a length of 2');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIso6393 is not allowed, must be a length of 3`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: 'c',
                image: 'j',
                iso6392: 'ns',
                iso6393: 'ix7b',
                ietf: 'z0ceo',
                dir: 'RTL',
                sort: 967169,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6393 is not allowed, must be a length of 3');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIetf is not allowed, must be a length of 5`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: '9',
                image: 'w',
                iso6392: '5q',
                iso6393: 'ivv',
                ietf: '9m4ku1',
                dir: 'LTR',
                sort: 467060,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIetf is not allowed, must be a length of 5');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangSort is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: '7',
                image: 'x',
                iso6392: 'dj',
                iso6393: 'fjs',
                ietf: 'xq1j0',
                dir: 'LTR',
                sort: 4081901,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangSort is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/lang - Got 400 Conflict, LangIsActive has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: 'g',
                image: 'a',
                iso6392: 'w6',
                iso6393: 'lbe',
                ietf: '8iyiu',
                dir: 'RTL',
                sort: 357776,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIsActive has to be a boolean value');
            });
    });
    test(`/REST:POST / - Got 400 Conflict, Dir has to be a enum option of LTR, RTL`, () =>
    {
        return request(app.getHttpServer())
            .post('//')
            .set('Accept', 'application/json')
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: 'l',
                image: 'i',
                iso6392: 'i3',
                iso6393: 'ewe',
                ietf: '38lh1',
                dir: 'XXXX',
                sort: 634145,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for Dir has to be any of this options: LTR, RTL');
            });
    });

    test(`/REST:POST admin/lang`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: '7',
                image: 'l',
                iso6392: '1s',
                iso6393: 'a78',
                ietf: '6jnpy',
                dir: 'RTL',
                sort: 832854,
                isActive: true,
            })
            .expect(201);
    });

    test(`/REST:GET admin/langs/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/langs/paginate')
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

    test(`/REST:GET admin/lang - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'fde75789-ac15-4b22-ae95-b9701ed08ab3'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/lang`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6b9c1623-e0a2-4d6b-b873-dfd8bec07435'));
    });

    test(`/REST:GET admin/lang/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/lang/7223e120-5b72-4719-abe3-24f060194284')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/lang/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/lang/6b9c1623-e0a2-4d6b-b873-dfd8bec07435')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6b9c1623-e0a2-4d6b-b873-dfd8bec07435'));
    });

    test(`/REST:GET admin/langs`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/langs')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/lang - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8ff9de42-3f20-4990-a28d-6ba003c66e12',
                name: 'n',
                image: 'u',
                iso6392: 'bo',
                iso6393: '8rb',
                ietf: 'laiv2',
                dir: 'LTR',
                sort: 863602,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/lang`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/lang')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                name: 'w',
                image: 'g',
                iso6392: 'ok',
                iso6393: '1bg',
                ietf: 'xmvwi',
                dir: 'LTR',
                sort: 620406,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6b9c1623-e0a2-4d6b-b873-dfd8bec07435'));
    });

    test(`/REST:DELETE admin/lang/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/lang/d6c565a8-d8a2-4962-8d11-b1e7d7dacea5')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/lang/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/lang/6b9c1623-e0a2-4d6b-b873-dfd8bec07435')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateLang - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateLangInput!)
                    {
                        adminCreateLang (payload:$payload)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            dir
                            sort
                            isActive
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

    test(`/GraphQL adminCreateLang`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateLangInput!)
                    {
                        adminCreateLang (payload:$payload)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            dir
                            sort
                            isActive
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '831cf19d-a0db-4814-8ab3-c77f067a365a',
                        name: '2',
                        image: 'e',
                        iso6392: 'as',
                        iso6393: 'ev0',
                        ietf: 'dcwrq',
                        dir: 'RTL',
                        sort: 588130,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateLang).toHaveProperty('id', '831cf19d-a0db-4814-8ab3-c77f067a365a');
            });
    });

    test(`/GraphQL adminPaginateLangs`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateLangs (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateLangs.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateLangs.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateLangs.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindLang - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindLang (query:$query)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            dir
                            sort
                            isActive
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
                            id: 'f839cf0a-462e-4edf-ba71-e80ed729758d'
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

    test(`/GraphQL adminFindLang`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindLang (query:$query)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            dir
                            sort
                            isActive
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
                            id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindLang.id).toStrictEqual('6b9c1623-e0a2-4d6b-b873-dfd8bec07435');
            });
    });

    test(`/GraphQL adminFindLangById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindLangById (id:$id)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c8fd454f-94bf-4487-a4a7-7cffb9f3dda9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindLangById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindLangById (id:$id)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindLangById.id).toStrictEqual('6b9c1623-e0a2-4d6b-b873-dfd8bec07435');
            });
    });

    test(`/GraphQL adminGetLangs`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetLangs (query:$query)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetLangs.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateLang - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateLangInput!)
                    {
                        adminUpdateLang (payload:$payload)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'dc95ab30-4a04-4625-8897-fc5042cb5fd7',
                        name: 'u',
                        image: 'n',
                        iso6392: 'z8',
                        iso6393: '738',
                        ietf: 'fhmho',
                        dir: 'RTL',
                        sort: 429891,
                        isActive: true,
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

    test(`/GraphQL adminUpdateLang`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateLangInput!)
                    {
                        adminUpdateLang (payload:$payload)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435',
                        name: 'g',
                        image: 'v',
                        iso6392: '1j',
                        iso6393: '274',
                        ietf: 'b8ord',
                        dir: 'LTR',
                        sort: 368770,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateLang.id).toStrictEqual('6b9c1623-e0a2-4d6b-b873-dfd8bec07435');
            });
    });

    test(`/GraphQL adminDeleteLangById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteLangById (id:$id)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '135e777c-9d19-4147-a2f6-d67a951b73f3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteLangById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteLangById (id:$id)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6b9c1623-e0a2-4d6b-b873-dfd8bec07435'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteLangById.id).toStrictEqual('6b9c1623-e0a2-4d6b-b873-dfd8bec07435');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});