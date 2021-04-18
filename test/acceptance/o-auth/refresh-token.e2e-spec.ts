import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRefreshTokenRepository } from '@hades/o-auth/refresh-token/domain/refresh-token.repository';
import { MockRefreshTokenRepository } from '@hades/o-auth/refresh-token/infrastructure/mock/mock-refresh-token.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('refresh-token', () =>
{
    let app: INestApplication;
    let repository: MockRefreshTokenRepository;

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
                    })
                ]
            })
            .overrideProvider(IRefreshTokenRepository)
            .useClass(MockRefreshTokenRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockRefreshTokenRepository>module.get<IRefreshTokenRepository>(IRefreshTokenRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/refresh-token - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: null,
                accessTokenId: '4424af6f-a11c-49f2-a3bc-056eb7177c91',
                token: 'Sunt at esse. Est in ipsa neque itaque aliquid totam officiis asperiores ducimus. Magni a atque dicta consequatur velit totam rerum velit nulla. Id earum ullam aspernatur sed quia et nobis. Non qui sit hic sunt nihil voluptatibus ipsa aut voluptatem.',
                isRevoked: true,
                expiresAt: '2021-04-18 18:25:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                accessTokenId: '4424af6f-a11c-49f2-a3bc-056eb7177c91',
                token: 'Vero qui eveniet nostrum. Corrupti natus iure. Tempore ea non placeat dolores a sit. Ratione eos quisquam minima sit dolor sit qui voluptatem mollitia.',
                isRevoked: false,
                expiresAt: '2021-04-18 23:31:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenAccessTokenId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '8c4b3516-7663-4da4-9e17-1a7abbc5f37c',
                accessTokenId: null,
                token: 'Quod aut amet. Id blanditiis aliquid tempora est aut necessitatibus tempore blanditiis. Possimus ipsam et nobis velit aperiam id itaque. Id ducimus numquam distinctio labore porro qui. Sunt fugiat quos qui.',
                isRevoked: false,
                expiresAt: '2021-04-18 20:02:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenAccessTokenId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenAccessTokenId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '8c4b3516-7663-4da4-9e17-1a7abbc5f37c',
                
                token: 'Eos architecto dolores quia error explicabo blanditiis dicta ratione. Saepe cumque omnis dolores deserunt. Beatae totam ut quia quam inventore fugiat.',
                isRevoked: false,
                expiresAt: '2021-04-18 21:51:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenAccessTokenId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenToken property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '8c4b3516-7663-4da4-9e17-1a7abbc5f37c',
                accessTokenId: '4424af6f-a11c-49f2-a3bc-056eb7177c91',
                token: null,
                isRevoked: false,
                expiresAt: '2021-04-18 08:39:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenToken must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenToken property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '8c4b3516-7663-4da4-9e17-1a7abbc5f37c',
                accessTokenId: '4424af6f-a11c-49f2-a3bc-056eb7177c91',
                
                isRevoked: false,
                expiresAt: '2021-04-18 22:41:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenToken must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenIsRevoked property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '8c4b3516-7663-4da4-9e17-1a7abbc5f37c',
                accessTokenId: '4424af6f-a11c-49f2-a3bc-056eb7177c91',
                token: 'Reprehenderit earum et placeat. Blanditiis iusto incidunt minus tempore vitae. Ullam culpa suscipit. Ab dolores et voluptate maxime. Voluptas necessitatibus sequi culpa consectetur similique consequatur qui sequi.',
                isRevoked: null,
                expiresAt: '2021-04-18 20:23:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenIsRevoked must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenIsRevoked property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '8c4b3516-7663-4da4-9e17-1a7abbc5f37c',
                accessTokenId: '4424af6f-a11c-49f2-a3bc-056eb7177c91',
                token: 'Illo ab nesciunt ipsam repellat expedita. Officiis rerum culpa dicta iusto praesentium sapiente consequatur. Aliquid labore quo reprehenderit numquam sit aut voluptatum ut. Quaerat officiis ut at corporis veritatis reiciendis quo. Perferendis omnis quis.',
                
                expiresAt: '2021-04-18 01:20:13',
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
            .send({
                id: 'hnfxg72j60sg299rkado2nexhfyukul8ftx26',
                accessTokenId: '4424af6f-a11c-49f2-a3bc-056eb7177c91',
                token: 'Quas asperiores dolore voluptatibus totam et nobis. Sed repellat dolor. Debitis qui provident qui quis. Illum numquam quibusdam qui praesentium velit. Sit non esse.',
                isRevoked: true,
                expiresAt: '2021-04-18 17:40:57',
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
            .send({
                id: '8c4b3516-7663-4da4-9e17-1a7abbc5f37c',
                accessTokenId: '4q6qcjmiw0ozl4uha83xef5ubwpakyw5qmjq1',
                token: 'Ipsum ab rem saepe. Nemo voluptas aspernatur provident sequi quia. Recusandae odit fuga iste a. Non exercitationem atque ducimus eos necessitatibus nulla itaque ratione. Eaque quasi consequatur sunt vero laborum porro et dolores voluptatem. Eveniet ut sapiente tempora.',
                isRevoked: false,
                expiresAt: '2021-04-18 06:11:44',
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
            .send({
                id: '8c4b3516-7663-4da4-9e17-1a7abbc5f37c',
                accessTokenId: '4424af6f-a11c-49f2-a3bc-056eb7177c91',
                token: 'Harum rem est est unde in non et. Aut excepturi qui nostrum ut velit delectus. Voluptas aut sit sit libero repellat porro eaque saepe similique. Deserunt consequatur dolore aut totam soluta. Blanditiis magni similique culpa vero et rerum.',
                isRevoked: 'true',
                expiresAt: '2021-04-18 13:00:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenIsRevoked has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenExpiresAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '8c4b3516-7663-4da4-9e17-1a7abbc5f37c',
                accessTokenId: '4424af6f-a11c-49f2-a3bc-056eb7177c91',
                token: 'Facere reprehenderit vero et et veniam nobis quo. Quia voluptatem est dolores porro. Qui ea dignissimos officia.',
                isRevoked: true,
                expiresAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenExpiresAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: '8c4b3516-7663-4da4-9e17-1a7abbc5f37c',
                accessTokenId: '4424af6f-a11c-49f2-a3bc-056eb7177c91',
                token: 'Optio et ea. Rerum asperiores est. Nisi dolorum et atque et voluptas facilis sed architecto. Tempore ullam natus vel. Quos error saepe explicabo hic autem sit rerum.',
                isRevoked: true,
                expiresAt: '2021-04-18 03:14:29',
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/refresh-tokens/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-tokens/paginate')
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

    test(`/REST:GET o-auth/refresh-token - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '9d78e119-c372-4d90-8220-237ce6277ee6'
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
            .send({
                query: 
                {
                    where: 
                    {
                        id: '8c4b3516-7663-4da4-9e17-1a7abbc5f37c'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '8c4b3516-7663-4da4-9e17-1a7abbc5f37c'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/92e1673d-4976-4a22-8646-7f25a7c4ec9f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/8c4b3516-7663-4da4-9e17-1a7abbc5f37c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8c4b3516-7663-4da4-9e17-1a7abbc5f37c'));
    });

    test(`/REST:GET o-auth/refresh-tokens`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-tokens')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/refresh-token - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '52b55629-225c-4f06-990a-0afd877f7654',
                accessTokenId: '683ac61b-5fb4-44f6-aa81-67f6beb8cec3',
                token: 'Ut modi distinctio consectetur sed. At dolorem temporibus sed autem itaque sapiente perspiciatis fuga ut. Sit eveniet itaque voluptatum quae autem illum repudiandae eligendi necessitatibus. Corrupti voluptatem minus omnis sequi ut consequatur quibusdam ut. Voluptatibus veritatis impedit. Cumque impedit animi cupiditate quo optio quas ipsa dicta in.',
                isRevoked: true,
                expiresAt: '2021-04-18 10:27:03',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '8c4b3516-7663-4da4-9e17-1a7abbc5f37c',
                accessTokenId: '4424af6f-a11c-49f2-a3bc-056eb7177c91',
                token: 'Sed doloremque culpa et iusto praesentium ad. Officiis qui quo assumenda porro consequatur reiciendis. Omnis vel sapiente vel voluptas veniam ut eos autem.',
                isRevoked: true,
                expiresAt: '2021-04-18 05:37:01',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8c4b3516-7663-4da4-9e17-1a7abbc5f37c'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/f6f6ce7c-ad6e-4d76-8b78-f699a7d905bf')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/8c4b3516-7663-4da4-9e17-1a7abbc5f37c')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateRefreshToken - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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

    test(`/GraphQL oAuthCreateRefreshToken`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '39f640a5-bc04-49db-912d-f1db16c32671',
                        accessTokenId: '4424af6f-a11c-49f2-a3bc-056eb7177c91',
                        token: 'Iste et laboriosam mollitia. Praesentium laboriosam atque provident consequatur laboriosam sunt. Consequuntur facere et excepturi ab vitae quia quam laudantium. Iusto ut enim a officiis enim. Voluptatem voluptate omnis voluptatibus. At consequuntur sit deleniti incidunt nihil consequatur quam.',
                        isRevoked: true,
                        expiresAt: '2021-04-18 17:42:17',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', '39f640a5-bc04-49db-912d-f1db16c32671');
            });
    });

    test(`/GraphQL oAuthPaginateRefreshTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                            id: '59fd45b6-8b88-4e1f-beca-b0b7b0be53f9'
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
                            id: '8c4b3516-7663-4da4-9e17-1a7abbc5f37c'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('8c4b3516-7663-4da4-9e17-1a7abbc5f37c');
            });
    });

    test(`/GraphQL oAuthFindRefreshTokenById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: 'e3952c4e-77e2-40dd-a4dc-878f3bdb5922'
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
                    id: '8c4b3516-7663-4da4-9e17-1a7abbc5f37c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('8c4b3516-7663-4da4-9e17-1a7abbc5f37c');
            });
    });

    test(`/GraphQL oAuthGetRefreshTokens`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                        
                        id: 'c34bd4ab-fe36-475f-990b-4438677c6d17',
                        accessTokenId: 'ab398628-cdc1-462c-bb85-81a6b052a6ff',
                        token: 'Voluptatem rerum voluptate illo ut enim blanditiis voluptatibus ab. Et sequi sit necessitatibus et sit recusandae. Quod at eum nemo maxime reiciendis et corporis consectetur harum. Cum voluptatem nihil. Praesentium consequatur quo. Modi ut veniam tenetur iure voluptatum.',
                        isRevoked: false,
                        expiresAt: '2021-04-18 03:05:33',
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
                        
                        id: '8c4b3516-7663-4da4-9e17-1a7abbc5f37c',
                        accessTokenId: '4424af6f-a11c-49f2-a3bc-056eb7177c91',
                        token: 'Accusamus aperiam asperiores et in adipisci. Sequi laborum ea repellendus in illum perspiciatis sit omnis placeat. Et nobis et perferendis consequatur qui temporibus excepturi. Excepturi nam hic dolores voluptatibus commodi doloremque excepturi. In ut recusandae tenetur inventore dolores ut.',
                        isRevoked: false,
                        expiresAt: '2021-04-18 20:24:05',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('8c4b3516-7663-4da4-9e17-1a7abbc5f37c');
            });
    });

    test(`/GraphQL oAuthDeleteRefreshTokenById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: 'f4743c25-2ed8-4686-8f22-cdbcf7f9e1ac'
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
                    id: '8c4b3516-7663-4da4-9e17-1a7abbc5f37c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('8c4b3516-7663-4da4-9e17-1a7abbc5f37c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});