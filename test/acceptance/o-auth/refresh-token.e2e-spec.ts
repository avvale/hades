import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRefreshTokenRepository } from '@hades/o-auth/refresh-token/domain/refresh-token.repository';
import { MockRefreshTokenRepository } from '@hades/o-auth/refresh-token/infrastructure/mock/mock-refresh-token.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [];

describe('refresh-token', () =>
{
    let app: INestApplication;
    let repository: MockRefreshTokenRepository;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
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
            .overrideProvider(IRefreshTokenRepository)
            .useClass(MockRefreshTokenRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockRefreshTokenRepository>module.get<IRefreshTokenRepository>(IRefreshTokenRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST o-auth/refresh-token - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                accessTokenId: 'cf7efaea-7e5a-42fe-9ba7-bcc972bd6cdc',
                token: 'Voluptate et harum qui commodi temporibus enim voluptas est enim. Ut fuga magnam libero ab sunt itaque sed suscipit. Fugiat ullam quae labore voluptates quis minus enim rerum. Qui dolorem quia sint aut facilis commodi optio recusandae neque.',
                isRevoked: false,
                expiresAt: '2021-04-26 04:04:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenAccessTokenId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9d4f30c5-c26f-48f9-b749-a5e7195da46d',
                accessTokenId: null,
                token: 'Magni molestiae qui optio culpa eveniet et fugiat necessitatibus. Dignissimos sed sunt dignissimos eos neque omnis. Omnis est velit quia repudiandae earum sint voluptates. Delectus architecto maiores pariatur.',
                isRevoked: true,
                expiresAt: '2021-04-26 17:02:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenAccessTokenId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenToken property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9d4f30c5-c26f-48f9-b749-a5e7195da46d',
                accessTokenId: 'cf7efaea-7e5a-42fe-9ba7-bcc972bd6cdc',
                token: null,
                isRevoked: false,
                expiresAt: '2021-04-26 09:22:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenToken must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenIsRevoked property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9d4f30c5-c26f-48f9-b749-a5e7195da46d',
                accessTokenId: 'cf7efaea-7e5a-42fe-9ba7-bcc972bd6cdc',
                token: 'Fugiat harum occaecati culpa autem quia. Earum molestias non. At quis nobis quisquam doloremque dolorem.',
                isRevoked: null,
                expiresAt: '2021-04-26 05:46:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenIsRevoked must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                accessTokenId: 'cf7efaea-7e5a-42fe-9ba7-bcc972bd6cdc',
                token: 'Sed ipsa corporis facilis expedita. Ut odit soluta rem placeat sed vitae ducimus nesciunt. Expedita dignissimos dolorum voluptatibus itaque aperiam aliquam quidem tempore. Sit ducimus ea doloribus tempora doloremque eligendi. Voluptatem aperiam amet. Quaerat nostrum dolores non est atque qui.',
                isRevoked: false,
                expiresAt: '2021-04-26 10:46:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenAccessTokenId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9d4f30c5-c26f-48f9-b749-a5e7195da46d',
                token: 'Dolore est quia quia consectetur officiis. Excepturi exercitationem quaerat vel ea. Animi consequatur numquam totam esse quam eos. Sed vitae repudiandae. Est quod cumque voluptatem.',
                isRevoked: false,
                expiresAt: '2021-04-26 07:32:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenAccessTokenId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenToken property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9d4f30c5-c26f-48f9-b749-a5e7195da46d',
                accessTokenId: 'cf7efaea-7e5a-42fe-9ba7-bcc972bd6cdc',
                isRevoked: true,
                expiresAt: '2021-04-26 11:17:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenToken must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenIsRevoked property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9d4f30c5-c26f-48f9-b749-a5e7195da46d',
                accessTokenId: 'cf7efaea-7e5a-42fe-9ba7-bcc972bd6cdc',
                token: 'Sed qui quia iusto ducimus necessitatibus qui nemo. Vel eos id eum dignissimos possimus. Totam dolor quis. Autem amet sequi aliquid quidem rerum rerum soluta dolorum.',
                expiresAt: '2021-04-26 20:55:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenIsRevoked must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4gb2ugthv2biyblulbynraifrorxbu1gtjm1e',
                accessTokenId: 'cf7efaea-7e5a-42fe-9ba7-bcc972bd6cdc',
                token: 'Officia rem autem neque repellat suscipit. Atque minus autem ea laboriosam velit. Voluptatum non ducimus impedit rerum aliquam dolores.',
                isRevoked: true,
                expiresAt: '2021-04-26 00:55:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenAccessTokenId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9d4f30c5-c26f-48f9-b749-a5e7195da46d',
                accessTokenId: 't0xcaaxsstmqci3oj9rty592d7bu3er4kx0ec',
                token: 'Omnis praesentium nesciunt. Rerum vitae et accusamus. Eaque quaerat esse non distinctio rem nihil dolorem est.',
                isRevoked: true,
                expiresAt: '2021-04-26 01:15:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenAccessTokenId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenIsRevoked has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9d4f30c5-c26f-48f9-b749-a5e7195da46d',
                accessTokenId: 'cf7efaea-7e5a-42fe-9ba7-bcc972bd6cdc',
                token: 'Aut omnis aut aliquam. Ipsam officiis ipsa velit consectetur amet quo aut aut. Ullam iusto molestiae sed explicabo quam quisquam. Vel sed aliquam sunt sunt.',
                isRevoked: 'true',
                expiresAt: '2021-04-26 01:01:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenIsRevoked has to be a boolean value');
            });
    });
    test(`/REST:POST / - Got 400 Conflict, ExpiresAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('//')
            .set('Accept', 'application/json')
            .send({
                id: '9d4f30c5-c26f-48f9-b749-a5e7195da46d',
                accessTokenId: 'cf7efaea-7e5a-42fe-9ba7-bcc972bd6cdc',
                token: 'Est temporibus recusandae placeat ducimus inventore aut. Sit velit in deleniti quos consectetur molestiae. Molestiae odit quia voluptatem. Quam nihil eligendi molestias quisquam ut cumque ut. Quasi architecto nobis aut sunt qui dolor.',
                isRevoked: true,
                expiresAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExpiresAt has to be a timestamp value');
            });
    });

    test(`/REST:POST o-auth/refresh-token`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9d4f30c5-c26f-48f9-b749-a5e7195da46d',
                accessTokenId: 'cf7efaea-7e5a-42fe-9ba7-bcc972bd6cdc',
                token: 'Distinctio quos suscipit atque perferendis ipsa eos. Deleniti reprehenderit deleniti natus sed repudiandae itaque. Ipsam maxime consequatur et.',
                isRevoked: false,
                expiresAt: '2021-04-26 01:24:27',
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/refresh-tokens/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-tokens/paginate')
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

    test(`/REST:GET o-auth/refresh-token - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '24a9dd39-9259-4760-9dce-1504deebfa7b'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '9d4f30c5-c26f-48f9-b749-a5e7195da46d'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9d4f30c5-c26f-48f9-b749-a5e7195da46d'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/68a66bf4-2e6b-43ec-ae7d-f6894cd5ac4d')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/9d4f30c5-c26f-48f9-b749-a5e7195da46d')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9d4f30c5-c26f-48f9-b749-a5e7195da46d'));
    });

    test(`/REST:GET o-auth/refresh-tokens`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-tokens')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/refresh-token - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f8c42cc4-a11e-48f6-a32d-c71c5208141e',
                accessTokenId: '40b3de9a-7001-4700-83cf-d85760671c0d',
                token: 'Natus officiis consequuntur assumenda sed necessitatibus minima pariatur. Nihil dolores et magni est. At quis expedita porro necessitatibus corporis. Porro velit iure minus.',
                isRevoked: true,
                expiresAt: '2021-04-26 03:08:53',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9d4f30c5-c26f-48f9-b749-a5e7195da46d',
                accessTokenId: 'cf7efaea-7e5a-42fe-9ba7-bcc972bd6cdc',
                token: 'Quia omnis praesentium placeat. Placeat doloribus magni eius. Cupiditate quae placeat quaerat deleniti ab esse fugit minima nihil. Aut distinctio omnis. Quo labore eum qui. Amet temporibus repudiandae quae corporis sequi veritatis est.',
                isRevoked: false,
                expiresAt: '2021-04-26 15:31:51',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9d4f30c5-c26f-48f9-b749-a5e7195da46d'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/a2610524-aea6-47ab-88e8-997e1e0c6d8e')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/9d4f30c5-c26f-48f9-b749-a5e7195da46d')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL oAuthCreateRefreshToken - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateRefreshTokenInput!)
                    {
                        oAuthCreateRefreshToken (payload:$payload)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
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

    test(`/GraphQL oAuthCreateRefreshToken`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateRefreshTokenInput!)
                    {
                        oAuthCreateRefreshToken (payload:$payload)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'ce89a41d-b038-4ef3-b69b-cefc84d4356c',
                        accessTokenId: 'cf7efaea-7e5a-42fe-9ba7-bcc972bd6cdc',
                        token: 'Earum nisi voluptas. Enim culpa dolorum voluptatem sit illo architecto. Velit qui enim minus voluptatem veniam saepe fuga aut quas. Neque iure pariatur est. Rerum unde ad earum beatae alias.',
                        isRevoked: false,
                        expiresAt: '2021-04-26 00:20:52',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', 'ce89a41d-b038-4ef3-b69b-cefc84d4356c');
            });
    });

    test(`/GraphQL oAuthPaginateRefreshTokens`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateRefreshTokens (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateRefreshTokens.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateRefreshTokens.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateRefreshTokens.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindRefreshToken - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindRefreshToken (query:$query)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
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
                            id: 'cafe8169-4ac6-4bf2-a8eb-6f395d3a314d'
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

    test(`/GraphQL oAuthFindRefreshToken`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindRefreshToken (query:$query)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
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
                            id: '9d4f30c5-c26f-48f9-b749-a5e7195da46d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('9d4f30c5-c26f-48f9-b749-a5e7195da46d');
            });
    });

    test(`/GraphQL oAuthFindRefreshTokenById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindRefreshTokenById (id:$id)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3dbbf308-b737-4937-b45b-595a4c74d2f6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindRefreshTokenById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindRefreshTokenById (id:$id)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9d4f30c5-c26f-48f9-b749-a5e7195da46d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('9d4f30c5-c26f-48f9-b749-a5e7195da46d');
            });
    });

    test(`/GraphQL oAuthGetRefreshTokens`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetRefreshTokens (query:$query)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetRefreshTokens.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateRefreshToken - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthUpdateRefreshTokenInput!)
                    {
                        oAuthUpdateRefreshToken (payload:$payload)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '8f15eabf-258f-4841-87a5-347740443bd3',
                        accessTokenId: '8453f970-4174-406c-ba0d-88afb7a798f6',
                        token: 'Deleniti reprehenderit explicabo voluptates provident atque nesciunt quo quos. Libero rerum asperiores. Quidem culpa voluptatem voluptatum est. Qui rerum voluptas quia laboriosam incidunt.',
                        isRevoked: false,
                        expiresAt: '2021-04-26 23:35:31',
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

    test(`/GraphQL oAuthUpdateRefreshToken`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthUpdateRefreshTokenInput!)
                    {
                        oAuthUpdateRefreshToken (payload:$payload)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '9d4f30c5-c26f-48f9-b749-a5e7195da46d',
                        accessTokenId: 'cf7efaea-7e5a-42fe-9ba7-bcc972bd6cdc',
                        token: 'Consequatur ipsum commodi iusto in nobis molestiae facere. Consectetur nemo cupiditate aut. Nam molestias nesciunt incidunt amet quos consequatur aperiam. Ut cumque eum ratione.',
                        isRevoked: false,
                        expiresAt: '2021-04-26 16:25:54',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('9d4f30c5-c26f-48f9-b749-a5e7195da46d');
            });
    });

    test(`/GraphQL oAuthDeleteRefreshTokenById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteRefreshTokenById (id:$id)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e1f86dcc-5a07-4eaf-8104-77d14fe27be1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteRefreshTokenById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteRefreshTokenById (id:$id)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9d4f30c5-c26f-48f9-b749-a5e7195da46d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('9d4f30c5-c26f-48f9-b749-a5e7195da46d');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});