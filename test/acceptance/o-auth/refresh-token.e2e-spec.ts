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
                accessTokenId: '1a6225ad-8326-4229-9682-6db7f2205498',
                token: 'Aut quo ipsa quo voluptas consequatur voluptas dolorum. Dolores iusto quos. Molestiae et veniam velit quia. Necessitatibus voluptatem eveniet commodi adipisci est mollitia distinctio voluptas. Ut enim odio quia. Aperiam at non ex dolorem.',
                isRevoked: true,
                expiresAt: '2020-09-20 17:06:33',
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
                
                accessTokenId: '1a6225ad-8326-4229-9682-6db7f2205498',
                token: 'Molestiae quis voluptate nisi ipsam id. Voluptas aut tenetur molestias quibusdam ut. Optio non ex debitis aperiam.',
                isRevoked: true,
                expiresAt: '2020-09-20 13:33:12',
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
                id: '683f4d32-cd49-4dea-bd4a-093cad48e11b',
                accessTokenId: null,
                token: 'Et ipsum id facilis ipsum consequatur id ipsam libero vel. Dolorum amet sed architecto eligendi. Et molestiae iure. Voluptatem ut reiciendis voluptates fugiat aut provident esse nihil. Voluptatem eveniet omnis quas doloremque suscipit sed qui. Odit non reprehenderit consequatur nihil quis id nihil omnis velit.',
                isRevoked: false,
                expiresAt: '2020-09-21 05:34:35',
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
                id: '683f4d32-cd49-4dea-bd4a-093cad48e11b',
                
                token: 'Dolor voluptatem ipsam est. Totam quia nemo ut. Dignissimos culpa ab voluptatem et. Voluptates autem sed.',
                isRevoked: true,
                expiresAt: '2020-09-21 04:22:27',
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
                id: '683f4d32-cd49-4dea-bd4a-093cad48e11b',
                accessTokenId: '1a6225ad-8326-4229-9682-6db7f2205498',
                token: null,
                isRevoked: false,
                expiresAt: '2020-09-21 00:04:11',
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
                id: '683f4d32-cd49-4dea-bd4a-093cad48e11b',
                accessTokenId: '1a6225ad-8326-4229-9682-6db7f2205498',
                
                isRevoked: false,
                expiresAt: '2020-09-21 07:30:18',
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
                id: '683f4d32-cd49-4dea-bd4a-093cad48e11b',
                accessTokenId: '1a6225ad-8326-4229-9682-6db7f2205498',
                token: 'Repudiandae nulla dolorum. Numquam et atque dolores pariatur ducimus et deserunt. Eos accusantium illo esse et ea.',
                isRevoked: null,
                expiresAt: '2020-09-21 02:43:10',
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
                id: '683f4d32-cd49-4dea-bd4a-093cad48e11b',
                accessTokenId: '1a6225ad-8326-4229-9682-6db7f2205498',
                token: 'Distinctio enim possimus. In vero corporis soluta. Omnis sint aut non. Non aut et quisquam magni maxime eaque provident. Illum cum est voluptate aliquam et quisquam et alias nesciunt. Corporis fuga laboriosam veritatis.',
                
                expiresAt: '2020-09-20 19:46:44',
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
                id: '656f4eln4agef7afj9k3nth9ed4riu7yy6qr5',
                accessTokenId: '1a6225ad-8326-4229-9682-6db7f2205498',
                token: 'Dolore minima amet alias fuga fugiat vitae et quas. Dolorem fugit molestiae molestias distinctio rerum. A reiciendis culpa aut tenetur voluptatem in. Autem id hic recusandae quis quisquam saepe ratione mollitia.',
                isRevoked: false,
                expiresAt: '2020-09-20 20:31:34',
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
                id: '683f4d32-cd49-4dea-bd4a-093cad48e11b',
                accessTokenId: 'wy30dxr2qg83938nw06a3qz1fga3nk8pp8vn5',
                token: 'Quia nostrum inventore. Praesentium qui totam at asperiores iusto cum dolorem id ducimus. Iste doloribus et sed recusandae aut doloribus. Qui nesciunt quam quia enim consequatur laboriosam eos officiis.',
                isRevoked: true,
                expiresAt: '2020-09-21 06:37:13',
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
                id: '683f4d32-cd49-4dea-bd4a-093cad48e11b',
                accessTokenId: '1a6225ad-8326-4229-9682-6db7f2205498',
                token: 'Tempora consequatur dicta. Nihil rem quaerat. Dolorem quia voluptatem aut delectus quo sunt et libero repellat. Inventore velit earum.',
                isRevoked: 'true',
                expiresAt: '2020-09-21 05:21:01',
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
                id: '683f4d32-cd49-4dea-bd4a-093cad48e11b',
                accessTokenId: '1a6225ad-8326-4229-9682-6db7f2205498',
                token: 'Ut cum ab iure nesciunt debitis dolor rerum officia sed. Aut repellendus libero minima laboriosam officia provident ipsum qui dolore. Sint qui possimus alias nobis quia accusantium vero eos explicabo. Accusantium aut sed voluptatum quas ea ipsam autem quis.',
                isRevoked: false,
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
                id: '683f4d32-cd49-4dea-bd4a-093cad48e11b',
                accessTokenId: '1a6225ad-8326-4229-9682-6db7f2205498',
                token: 'Reiciendis in qui dolores. Autem similique labore quisquam sequi. Quaerat qui velit.',
                isRevoked: false,
                expiresAt: '2020-09-21 07:36:34',
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
                        id: 'f1e7c816-c3db-41de-8b80-cf4a2a30d31b'
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
                        id: '683f4d32-cd49-4dea-bd4a-093cad48e11b'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '683f4d32-cd49-4dea-bd4a-093cad48e11b'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/dd230f8b-a5d6-47f4-98b1-e21b83db5c9a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/683f4d32-cd49-4dea-bd4a-093cad48e11b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '683f4d32-cd49-4dea-bd4a-093cad48e11b'));
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
                
                id: '7a0dfbed-e65c-44b4-a611-733f1c7b3807',
                accessTokenId: '1102ff80-60ad-48de-8ae4-c75f12f40e75',
                token: 'Beatae sed ut quaerat reiciendis. Veritatis saepe nesciunt ut quia quas numquam. Harum corrupti distinctio accusamus hic veritatis. Maxime qui aliquid voluptatum voluptas quis aspernatur non voluptatem ut.',
                isRevoked: true,
                expiresAt: '2020-09-21 01:57:15',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '683f4d32-cd49-4dea-bd4a-093cad48e11b',
                accessTokenId: '1a6225ad-8326-4229-9682-6db7f2205498',
                token: 'Sed quae voluptatem consequuntur. Esse dignissimos quam vero consequuntur consequatur. Dolorem in et ut.',
                isRevoked: false,
                expiresAt: '2020-09-21 04:08:41',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '683f4d32-cd49-4dea-bd4a-093cad48e11b'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/872736bc-ffe5-4b89-9427-612fd4bb1a09')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/683f4d32-cd49-4dea-bd4a-093cad48e11b')
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
                        id: '78a87acb-6b6a-4114-af35-3b83014264e7',
                        accessTokenId: '1a6225ad-8326-4229-9682-6db7f2205498',
                        token: 'Molestiae neque vel. Est et id dolores suscipit soluta dignissimos. Molestiae sequi molestiae omnis ducimus. Asperiores cupiditate quo in.',
                        isRevoked: false,
                        expiresAt: '2020-09-20 21:11:02',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', '78a87acb-6b6a-4114-af35-3b83014264e7');
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
                            id: '21034487-bcc5-4085-9af1-d60c84ceca0c'
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
                            id: '683f4d32-cd49-4dea-bd4a-093cad48e11b'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('683f4d32-cd49-4dea-bd4a-093cad48e11b');
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
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '86138793-76f9-46ca-8d83-ff4f0cdf86ff'
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
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '683f4d32-cd49-4dea-bd4a-093cad48e11b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('683f4d32-cd49-4dea-bd4a-093cad48e11b');
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
                        
                        id: '9d3ffe38-e8e6-4e04-affe-811028066226',
                        accessTokenId: '02275c13-5599-47d4-b0b6-1b6b216ccdf2',
                        token: 'Consequatur magnam voluptatibus est voluptas voluptas distinctio voluptatem. Dolorem consequatur quos. Voluptates earum doloremque ut necessitatibus pariatur. Totam nihil ea qui ut asperiores nam natus beatae.',
                        isRevoked: true,
                        expiresAt: '2020-09-20 22:33:57',
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
                        
                        id: '683f4d32-cd49-4dea-bd4a-093cad48e11b',
                        accessTokenId: '1a6225ad-8326-4229-9682-6db7f2205498',
                        token: 'Dolor porro doloremque officia laudantium rerum. Itaque natus assumenda aut ut repellat rerum quis. Ducimus et facilis repellat qui fugit. Provident cumque eaque incidunt eveniet. Officiis molestiae maxime quae.',
                        isRevoked: true,
                        expiresAt: '2020-09-20 14:43:51',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('683f4d32-cd49-4dea-bd4a-093cad48e11b');
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
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '933ad23c-1d29-4c1c-8ea3-9abb4113f487'
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
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '683f4d32-cd49-4dea-bd4a-093cad48e11b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('683f4d32-cd49-4dea-bd4a-093cad48e11b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});