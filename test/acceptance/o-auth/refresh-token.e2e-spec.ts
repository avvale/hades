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
                accessTokenId: '70ef4121-124b-450a-9e7e-2db83374f3ca',
                token: 'Ut temporibus quia et. Et reiciendis non eligendi delectus. Id soluta quae quo molestiae consectetur laboriosam ipsam.',
                isRevoked: false,
                expiresAt: '2021-04-17 21:47:10',
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
                
                accessTokenId: '70ef4121-124b-450a-9e7e-2db83374f3ca',
                token: 'Incidunt delectus similique aut eius sequi tenetur neque qui velit. Beatae molestiae omnis. Similique molestias similique temporibus voluptas magni vel voluptatem est nisi.',
                isRevoked: true,
                expiresAt: '2021-04-18 01:51:30',
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
                id: 'cf28c6f8-eb76-4a6d-b153-81bb9621b048',
                accessTokenId: null,
                token: 'Incidunt non officiis velit excepturi id nulla eos cupiditate eligendi. Non odit nemo fuga aliquam. Ipsum fugit numquam. Recusandae sed enim nihil animi officia est molestiae. Quis architecto et similique molestias modi ipsam quod non.',
                isRevoked: true,
                expiresAt: '2021-04-17 23:49:53',
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
                id: 'cf28c6f8-eb76-4a6d-b153-81bb9621b048',
                
                token: 'Et nesciunt magni sed et velit accusamus est. Natus pariatur illo. Dolore ut minima aut et sit non. Repellendus ea minus necessitatibus esse velit non inventore praesentium similique. Officiis ex omnis ullam blanditiis voluptatum sit.',
                isRevoked: false,
                expiresAt: '2021-04-17 20:40:03',
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
                id: 'cf28c6f8-eb76-4a6d-b153-81bb9621b048',
                accessTokenId: '70ef4121-124b-450a-9e7e-2db83374f3ca',
                token: null,
                isRevoked: true,
                expiresAt: '2021-04-18 04:41:57',
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
                id: 'cf28c6f8-eb76-4a6d-b153-81bb9621b048',
                accessTokenId: '70ef4121-124b-450a-9e7e-2db83374f3ca',
                
                isRevoked: false,
                expiresAt: '2021-04-18 07:18:53',
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
                id: 'cf28c6f8-eb76-4a6d-b153-81bb9621b048',
                accessTokenId: '70ef4121-124b-450a-9e7e-2db83374f3ca',
                token: 'Unde voluptates sunt ipsum ut. Repudiandae animi officiis et accusantium quia et pariatur fugit facere. Deserunt rerum id iusto aliquid vitae id provident rerum et. Accusantium et eos autem explicabo architecto ut. Sed impedit necessitatibus odit molestiae nihil sed iure atque optio.',
                isRevoked: null,
                expiresAt: '2021-04-18 04:11:42',
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
                id: 'cf28c6f8-eb76-4a6d-b153-81bb9621b048',
                accessTokenId: '70ef4121-124b-450a-9e7e-2db83374f3ca',
                token: 'Sint consequuntur rerum ea sint vero. Quia molestias ut. Et error necessitatibus libero totam quis omnis quasi.',
                
                expiresAt: '2021-04-17 19:39:00',
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
                id: 's249ld9drdngfgmujx4w7avi596a7jultkwa0',
                accessTokenId: '70ef4121-124b-450a-9e7e-2db83374f3ca',
                token: 'Qui sit et voluptas aut dolor. Laudantium quaerat quae sit. Vel et voluptate ipsa recusandae voluptatem consectetur sapiente.',
                isRevoked: false,
                expiresAt: '2021-04-18 03:03:55',
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
                id: 'cf28c6f8-eb76-4a6d-b153-81bb9621b048',
                accessTokenId: '3tjgmfzzghtjp7dirxt2apvoumejdxjxh2clt',
                token: 'Quo maxime qui nisi et nam aut. Quasi a voluptas molestiae deserunt omnis occaecati a et. Et voluptatum pariatur aut. Est minima error ut magnam itaque ratione molestias.',
                isRevoked: true,
                expiresAt: '2021-04-18 11:19:51',
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
                id: 'cf28c6f8-eb76-4a6d-b153-81bb9621b048',
                accessTokenId: '70ef4121-124b-450a-9e7e-2db83374f3ca',
                token: 'Ullam rem esse minima. Consectetur expedita necessitatibus qui nemo error excepturi voluptatibus harum. Magnam non est unde commodi. Ut voluptate sed velit sit deleniti. Et in suscipit ut.',
                isRevoked: 'true',
                expiresAt: '2021-04-18 08:39:25',
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
                id: 'cf28c6f8-eb76-4a6d-b153-81bb9621b048',
                accessTokenId: '70ef4121-124b-450a-9e7e-2db83374f3ca',
                token: 'Et minus reiciendis et fugiat corrupti. Voluptates animi suscipit officia fuga numquam laudantium. Ex hic dolor beatae ducimus beatae rem sint quis. Voluptatibus repellat atque rerum consequatur est exercitationem delectus. Natus dolorem exercitationem perferendis qui aut facere repellendus et.',
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
                id: 'cf28c6f8-eb76-4a6d-b153-81bb9621b048',
                accessTokenId: '70ef4121-124b-450a-9e7e-2db83374f3ca',
                token: 'Atque facilis sit quo aut inventore. Occaecati laudantium qui voluptatibus nesciunt modi voluptatem ad quam ipsam. Voluptatem sequi qui adipisci rerum et tenetur ea inventore qui. Est voluptas tempore nam qui praesentium sint.',
                isRevoked: true,
                expiresAt: '2021-04-18 12:58:20',
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
                        id: '6f7a3873-d108-4476-87d3-14e40e6faee4'
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
                        id: 'cf28c6f8-eb76-4a6d-b153-81bb9621b048'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cf28c6f8-eb76-4a6d-b153-81bb9621b048'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/ea801d64-1b65-4cdc-ad2f-73a90a223840')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/cf28c6f8-eb76-4a6d-b153-81bb9621b048')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cf28c6f8-eb76-4a6d-b153-81bb9621b048'));
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
                
                id: '1c62fd80-53df-4e73-b043-18e5c0ecf84b',
                accessTokenId: 'd5fdd019-e6c0-4813-a578-4ac072397ea0',
                token: 'Vel et nemo aut qui dolor. Numquam facere fuga ut asperiores iste dolore hic. Qui eos sunt. Vitae nisi possimus nam.',
                isRevoked: true,
                expiresAt: '2021-04-18 04:50:50',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cf28c6f8-eb76-4a6d-b153-81bb9621b048',
                accessTokenId: '70ef4121-124b-450a-9e7e-2db83374f3ca',
                token: 'Quasi et perspiciatis quia modi. A culpa est odio et dignissimos quod amet. Officiis eum rerum sed. Eveniet modi aliquam laborum delectus et odio rerum cumque quas. Molestiae quia dolores similique non possimus sint iure nihil. Et minus quam deserunt non voluptas.',
                isRevoked: true,
                expiresAt: '2021-04-18 16:52:31',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cf28c6f8-eb76-4a6d-b153-81bb9621b048'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/e0b4fb82-701f-4810-8636-943c26972fe6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/cf28c6f8-eb76-4a6d-b153-81bb9621b048')
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
                        id: '6b0e9c11-34b6-4d39-b03d-9b41327913ed',
                        accessTokenId: '70ef4121-124b-450a-9e7e-2db83374f3ca',
                        token: 'Aut repellat sapiente voluptas quia quo rerum dignissimos quis. Rerum ex dolor reiciendis voluptatum fugiat dolores quo consequatur totam. Enim autem pariatur iste voluptatem exercitationem debitis. Aut sint est. Dolorum perspiciatis vel voluptatem nisi temporibus earum nesciunt ullam amet. Expedita sit mollitia ipsam quis sint dolores.',
                        isRevoked: false,
                        expiresAt: '2021-04-18 15:58:23',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', '6b0e9c11-34b6-4d39-b03d-9b41327913ed');
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
                            id: '7aa6e70b-e6f3-41ae-b9b6-7aaefcece58f'
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
                            id: 'cf28c6f8-eb76-4a6d-b153-81bb9621b048'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('cf28c6f8-eb76-4a6d-b153-81bb9621b048');
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
                    id: '9b143673-3d65-4212-bc9f-e267b81d1b66'
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
                    id: 'cf28c6f8-eb76-4a6d-b153-81bb9621b048'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('cf28c6f8-eb76-4a6d-b153-81bb9621b048');
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
                        
                        id: 'fc6fa31f-c3df-4742-a24e-60e805c2691f',
                        accessTokenId: '0902bf87-2062-4b41-aea8-262f94145f56',
                        token: 'Reprehenderit doloremque qui occaecati dolore earum. Eos cumque soluta et perspiciatis. Maxime enim et fuga. Qui libero quasi ex modi odit. Quia quod et eum enim laborum ut porro suscipit repudiandae. Consequatur modi soluta eligendi a.',
                        isRevoked: true,
                        expiresAt: '2021-04-18 14:09:43',
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
                        
                        id: 'cf28c6f8-eb76-4a6d-b153-81bb9621b048',
                        accessTokenId: '70ef4121-124b-450a-9e7e-2db83374f3ca',
                        token: 'Aperiam est officia nesciunt quae officia delectus odio fugit nesciunt. Molestiae repellendus labore fugiat. Soluta veniam consequuntur a ipsa reiciendis et nam. Est consequuntur veritatis minima perspiciatis eligendi minus. Quod aspernatur quia commodi sit. Quas ea ut et quisquam enim nisi.',
                        isRevoked: true,
                        expiresAt: '2021-04-17 19:46:55',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('cf28c6f8-eb76-4a6d-b153-81bb9621b048');
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
                    id: 'e9db8fe8-0328-471f-9777-edffc490994c'
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
                    id: 'cf28c6f8-eb76-4a6d-b153-81bb9621b048'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('cf28c6f8-eb76-4a6d-b153-81bb9621b048');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});