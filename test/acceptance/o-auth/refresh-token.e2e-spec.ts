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
                accessTokenId: '91528c05-bef1-4d55-a9d7-676db095b9df',
                token: 'Facere quibusdam aliquid quis odit repellat molestiae maxime. Ut quis repudiandae quis magnam numquam optio est aut. Eius sapiente explicabo corporis eos impedit quod.',
                isRevoked: true,
                expiresAt: '2021-04-26 04:30:02',
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
                id: '3171c5f3-7b98-4f87-abde-c3a572f73aa0',
                accessTokenId: null,
                token: 'Molestiae quas tempora sint voluptas quod sit assumenda reprehenderit. Perferendis nostrum architecto nihil deleniti non ea voluptatum aliquam. Possimus laudantium perferendis voluptates voluptatem labore eum ut in. Quod animi quia qui ea quasi pariatur et eveniet. Atque nostrum eum et dignissimos neque.',
                isRevoked: true,
                expiresAt: '2021-04-26 11:02:02',
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
                id: '3171c5f3-7b98-4f87-abde-c3a572f73aa0',
                accessTokenId: '91528c05-bef1-4d55-a9d7-676db095b9df',
                token: null,
                isRevoked: true,
                expiresAt: '2021-04-26 02:14:46',
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
                id: '3171c5f3-7b98-4f87-abde-c3a572f73aa0',
                accessTokenId: '91528c05-bef1-4d55-a9d7-676db095b9df',
                token: 'Unde officiis fugit molestiae excepturi rem ratione quis rerum. Aut dolores dolor. Culpa quia assumenda. Et et quos repellendus aspernatur. Velit ex dolorem iusto aut.',
                isRevoked: null,
                expiresAt: '2021-04-25 22:29:01',
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
                accessTokenId: '91528c05-bef1-4d55-a9d7-676db095b9df',
                token: 'Provident omnis debitis ullam labore reprehenderit. Iste modi est. Recusandae et nihil animi. Dolore eius unde.',
                isRevoked: true,
                expiresAt: '2021-04-26 08:49:03',
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
                id: '3171c5f3-7b98-4f87-abde-c3a572f73aa0',
                token: 'Qui sit placeat ut suscipit vero. Quia eaque et sapiente nam. Ad sint molestias eligendi id rerum enim quod.',
                isRevoked: true,
                expiresAt: '2021-04-26 12:44:27',
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
                id: '3171c5f3-7b98-4f87-abde-c3a572f73aa0',
                accessTokenId: '91528c05-bef1-4d55-a9d7-676db095b9df',
                isRevoked: true,
                expiresAt: '2021-04-26 14:04:47',
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
                id: '3171c5f3-7b98-4f87-abde-c3a572f73aa0',
                accessTokenId: '91528c05-bef1-4d55-a9d7-676db095b9df',
                token: 'Ut et incidunt culpa et sed nihil blanditiis qui. Magnam ut fugit deserunt. Qui doloremque nostrum ut. Iste aut mollitia voluptatem voluptate quae eaque. Quas aut id sunt enim necessitatibus. Esse vitae saepe qui labore minima soluta harum sit dolores.',
                expiresAt: '2021-04-26 07:30:20',
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
                id: 'c6uwkpcncjm50rs22hu38z5d14478fuyffiyu',
                accessTokenId: '91528c05-bef1-4d55-a9d7-676db095b9df',
                token: 'Modi iure omnis quidem. Repellat provident cupiditate. Necessitatibus est ea dicta.',
                isRevoked: false,
                expiresAt: '2021-04-26 09:46:20',
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
                id: '3171c5f3-7b98-4f87-abde-c3a572f73aa0',
                accessTokenId: 'vl76jsi8j3uwsf7hqhkgc08y7wqgtm4oddcvx',
                token: 'Aspernatur voluptatem qui autem ullam aut impedit enim animi. Optio aut possimus omnis. Et velit fugit unde doloremque. Rerum eaque qui rerum. A est ut et rem quo reprehenderit odio recusandae. Odit maxime culpa dolore ut consequatur.',
                isRevoked: false,
                expiresAt: '2021-04-26 04:31:36',
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
                id: '3171c5f3-7b98-4f87-abde-c3a572f73aa0',
                accessTokenId: '91528c05-bef1-4d55-a9d7-676db095b9df',
                token: 'Magnam vitae rerum occaecati omnis reiciendis eos consequatur molestiae inventore. Aut voluptatem dolor et officia. Nobis voluptatem a consequatur ut. Eveniet esse aut et perferendis temporibus recusandae dolor at ut.',
                isRevoked: 'true',
                expiresAt: '2021-04-26 16:35:25',
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
                id: '3171c5f3-7b98-4f87-abde-c3a572f73aa0',
                accessTokenId: '91528c05-bef1-4d55-a9d7-676db095b9df',
                token: 'Distinctio architecto omnis. Explicabo laborum voluptas ipsum assumenda ad aut nam sed. Amet delectus ut in repellat enim reiciendis. Non vel eos optio. Aut quis tempora modi.',
                isRevoked: false,
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
                id: '3171c5f3-7b98-4f87-abde-c3a572f73aa0',
                accessTokenId: '91528c05-bef1-4d55-a9d7-676db095b9df',
                token: 'Sed hic omnis non eum repellat. Possimus asperiores quia ipsum quo est qui quia at et. Fuga corrupti impedit numquam. Facere et consectetur reiciendis. Praesentium qui exercitationem sapiente pariatur deserunt minima.',
                isRevoked: false,
                expiresAt: '2021-04-26 04:34:09',
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
                        id: '0d5e044a-100f-45b3-8f35-fa2e2da0b3de'
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
                        id: '3171c5f3-7b98-4f87-abde-c3a572f73aa0'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3171c5f3-7b98-4f87-abde-c3a572f73aa0'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/e793ca83-1353-48b9-942e-408bad06f201')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/3171c5f3-7b98-4f87-abde-c3a572f73aa0')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3171c5f3-7b98-4f87-abde-c3a572f73aa0'));
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
                id: '0abd7c33-bb65-48b3-ba61-24ffdbb74768',
                accessTokenId: '9ff2d43e-36be-4533-bd0f-17f06162c931',
                token: 'Doloremque quis quisquam iure quam perspiciatis dolorem. Eum quia aut. Deleniti fugiat eum et cumque omnis est ea. Aspernatur deserunt quo suscipit impedit voluptatem voluptas dolores in neque. Blanditiis illo tenetur est repudiandae voluptas sed ratione eius.',
                isRevoked: false,
                expiresAt: '2021-04-26 10:57:46',
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
                id: '3171c5f3-7b98-4f87-abde-c3a572f73aa0',
                accessTokenId: '91528c05-bef1-4d55-a9d7-676db095b9df',
                token: 'Aut est ut pariatur doloribus culpa tempore quae delectus. Quo numquam consequatur dolores est qui fugiat. Dolorem dolor eligendi necessitatibus consequatur fugit mollitia fuga. Consequatur est corporis est qui. Laudantium harum quia ut dolores voluptatum. Quia aut in nemo ipsa sunt necessitatibus.',
                isRevoked: false,
                expiresAt: '2021-04-26 03:31:46',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3171c5f3-7b98-4f87-abde-c3a572f73aa0'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/80a4a6de-4f00-4e0a-a824-2fce868c776c')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/3171c5f3-7b98-4f87-abde-c3a572f73aa0')
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
                        id: 'be20d158-c9f3-4ea1-8f0c-0ed0ed2ff1ef',
                        accessTokenId: '91528c05-bef1-4d55-a9d7-676db095b9df',
                        token: 'Aut iste eum dicta quia at quam. Enim atque minima ut. Eum non vitae animi. Reprehenderit aliquid mollitia aut ut quis excepturi expedita temporibus. Voluptas nobis delectus a. Modi vel quia laborum maiores.',
                        isRevoked: false,
                        expiresAt: '2021-04-26 03:48:26',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', 'be20d158-c9f3-4ea1-8f0c-0ed0ed2ff1ef');
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
                            id: 'ca2fad8c-fb9b-487b-8379-a2a901ae4b05'
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
                            id: '3171c5f3-7b98-4f87-abde-c3a572f73aa0'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('3171c5f3-7b98-4f87-abde-c3a572f73aa0');
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
                    id: '2cedf7c2-5ee6-476f-9706-0fb1af71feb4'
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
                    id: '3171c5f3-7b98-4f87-abde-c3a572f73aa0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('3171c5f3-7b98-4f87-abde-c3a572f73aa0');
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
                        id: '6a9171b2-abf3-422b-afa8-9afaf301ac12',
                        accessTokenId: 'd59e61dc-065e-4c17-9285-ca13688581e3',
                        token: 'Alias quia consequatur excepturi dolores fugit nobis officia. Ipsum sunt nobis in alias corrupti est aperiam id eos. Rerum molestiae unde expedita molestias. Quos provident voluptas occaecati nihil.',
                        isRevoked: true,
                        expiresAt: '2021-04-26 12:31:51',
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
                        id: '3171c5f3-7b98-4f87-abde-c3a572f73aa0',
                        accessTokenId: '91528c05-bef1-4d55-a9d7-676db095b9df',
                        token: 'Nisi et ducimus rem. Repellendus adipisci harum nam sed ea sit aut aspernatur est. Officia dignissimos nostrum recusandae id maxime eum consequatur.',
                        isRevoked: true,
                        expiresAt: '2021-04-26 04:38:04',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('3171c5f3-7b98-4f87-abde-c3a572f73aa0');
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
                    id: '9247dc4e-58cb-4bce-9ebb-d1f293f569d2'
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
                    id: '3171c5f3-7b98-4f87-abde-c3a572f73aa0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('3171c5f3-7b98-4f87-abde-c3a572f73aa0');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});