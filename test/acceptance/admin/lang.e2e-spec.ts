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
                name: 'w',
                image: 'b',
                iso6392: 'e9',
                iso6393: 'gft',
                ietf: 'c6etp',
                dir: 'RTL',
                sort: 800256,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: null,
                image: 'k',
                iso6392: '6d',
                iso6393: 'ji2',
                ietf: '27fbu',
                dir: 'RTL',
                sort: 104892,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: 'u',
                image: '0',
                iso6392: null,
                iso6393: 'al7',
                ietf: 'vse4f',
                dir: 'RTL',
                sort: 684458,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: 'i',
                image: 'x',
                iso6392: 'mt',
                iso6393: null,
                ietf: 'ag0a7',
                dir: 'RTL',
                sort: 919273,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: '6',
                image: 'f',
                iso6392: '9j',
                iso6393: 'lmn',
                ietf: null,
                dir: 'LTR',
                sort: 702650,
                isActive: true,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: 'g',
                image: '1',
                iso6392: '7x',
                iso6393: '5td',
                ietf: 'y9ycv',
                dir: null,
                sort: 165362,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: '1',
                image: '5',
                iso6392: 'v4',
                iso6393: 'cf7',
                ietf: 'pgrmg',
                dir: 'LTR',
                sort: 971988,
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
                name: 'u',
                image: 'w',
                iso6392: 'k8',
                iso6393: 'wr9',
                ietf: 'srans',
                dir: 'RTL',
                sort: 395954,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                image: 's',
                iso6392: 'ga',
                iso6393: 'mir',
                ietf: '0i5wi',
                dir: 'RTL',
                sort: 311102,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: 'r',
                image: '1',
                iso6393: 'i2b',
                ietf: 'xzd5q',
                dir: 'RTL',
                sort: 816576,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: 'm',
                image: '1',
                iso6392: 'kd',
                ietf: 'hsjz6',
                dir: 'RTL',
                sort: 923417,
                isActive: true,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: '9',
                image: 'j',
                iso6392: 'n5',
                iso6393: 'lx7',
                dir: 'LTR',
                sort: 590961,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: '8',
                image: 'c',
                iso6392: 'ct',
                iso6393: 'y6n',
                ietf: 'm56an',
                sort: 787323,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: 'k',
                image: 't',
                iso6392: 'gr',
                iso6393: 'hfo',
                ietf: '62gb9',
                dir: 'RTL',
                sort: 488410,
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
                id: '0ll2hrwjzv49h8o1sp43s4y9q73ktcntsflq8',
                name: 'e',
                image: 't',
                iso6392: 'ji',
                iso6393: 't99',
                ietf: '26nau',
                dir: 'RTL',
                sort: 863789,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: 'h',
                image: 'k',
                iso6392: '1fx',
                iso6393: '6ta',
                ietf: 'osahr',
                dir: 'LTR',
                sort: 496472,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: 'b',
                image: 'r',
                iso6392: 'mc',
                iso6393: 'z54e',
                ietf: 'zv757',
                dir: 'LTR',
                sort: 448830,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: 'a',
                image: 't',
                iso6392: 'xh',
                iso6393: 'vdy',
                ietf: 'tewg7k',
                dir: 'RTL',
                sort: 719271,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: '0',
                image: 'u',
                iso6392: 'le',
                iso6393: 'jas',
                ietf: 'gz947',
                dir: 'LTR',
                sort: 8358385,
                isActive: true,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: 'a',
                image: 'b',
                iso6392: '96',
                iso6393: 'rp8',
                ietf: 'okokb',
                dir: 'RTL',
                sort: 582564,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: 'q',
                image: 'u',
                iso6392: 'u7',
                iso6393: '0qt',
                ietf: 'glxjg',
                dir: 'XXXX',
                sort: 919768,
                isActive: true,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: 's',
                image: 's',
                iso6392: 'zm',
                iso6393: 'a7n',
                ietf: 'plkyj',
                dir: 'LTR',
                sort: 159937,
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
                        id: '50c59c42-092a-401b-b160-7f546dde81e2'
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
                        id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa'));
    });

    test(`/REST:GET admin/lang/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/lang/b4392832-72c3-4225-a9a2-23cec23df8f6')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/lang/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/lang/d6a762ad-c73f-454d-9a41-529bdc2bb7fa')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa'));
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
                id: '2a182654-da7f-459e-8fea-3175e4ea6d11',
                name: '5',
                image: 'x',
                iso6392: '44',
                iso6393: '4nx',
                ietf: 'sxl4x',
                dir: 'LTR',
                sort: 586292,
                isActive: false,
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
                id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                name: '4',
                image: '5',
                iso6392: 'n0',
                iso6393: 'xok',
                ietf: '7vhzp',
                dir: 'LTR',
                sort: 689412,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa'));
    });

    test(`/REST:DELETE admin/lang/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/lang/0ce1690e-2cc3-480c-ae5b-c47ab1cac291')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/lang/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/lang/d6a762ad-c73f-454d-9a41-529bdc2bb7fa')
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
                        id: '1be6ab72-5122-4074-bb06-6776a16f7a02',
                        name: 'e',
                        image: '7',
                        iso6392: 'l6',
                        iso6393: 'vdi',
                        ietf: '0i50w',
                        dir: 'RTL',
                        sort: 820899,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateLang).toHaveProperty('id', '1be6ab72-5122-4074-bb06-6776a16f7a02');
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
                            id: '75665190-28c3-47dd-8e72-9c1c22dc069c'
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
                            id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindLang.id).toStrictEqual('d6a762ad-c73f-454d-9a41-529bdc2bb7fa');
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
                    id: 'ac543297-5d1f-4422-82ad-f2280cba3c13'
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
                    id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindLangById.id).toStrictEqual('d6a762ad-c73f-454d-9a41-529bdc2bb7fa');
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
                        id: '52ce5d9f-4791-4c11-a906-908228b6a383',
                        name: '4',
                        image: 's',
                        iso6392: 'qt',
                        iso6393: 'uuz',
                        ietf: '42gph',
                        dir: 'RTL',
                        sort: 404770,
                        isActive: false,
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
                        id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa',
                        name: 'f',
                        image: 'v',
                        iso6392: 'g8',
                        iso6393: 'epr',
                        ietf: 'ktbxq',
                        dir: 'RTL',
                        sort: 713289,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateLang.id).toStrictEqual('d6a762ad-c73f-454d-9a41-529bdc2bb7fa');
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
                    id: '2cb1d691-8c46-42dd-a41c-785050d9116c'
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
                    id: 'd6a762ad-c73f-454d-9a41-529bdc2bb7fa'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteLangById.id).toStrictEqual('d6a762ad-c73f-454d-9a41-529bdc2bb7fa');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});