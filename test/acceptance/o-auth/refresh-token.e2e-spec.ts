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
                accessTokenId: '551635cf-b4ee-43e8-a0f8-a72779315c36',
                token: 'Aut qui aut expedita corporis cum alias. Similique fugit voluptatibus commodi. Veritatis eius cumque aspernatur adipisci numquam ut sit. Et voluptatem sit.',
                isRevoked: false,
                expiresAt: '2021-04-18 19:28:20',
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
                
                accessTokenId: '551635cf-b4ee-43e8-a0f8-a72779315c36',
                token: 'Sed enim enim illo inventore. Architecto aut provident vel. Laboriosam nulla exercitationem expedita.',
                isRevoked: true,
                expiresAt: '2021-04-18 18:45:52',
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
                id: '5c60b13f-18f4-4821-8c10-cb0f8ba6945a',
                accessTokenId: null,
                token: 'Et iusto et aut ipsum. Tempora provident non nesciunt. Similique ad provident nihil ipsum esse delectus. Recusandae asperiores aliquid dolores.',
                isRevoked: true,
                expiresAt: '2021-04-18 17:08:19',
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
                id: '5c60b13f-18f4-4821-8c10-cb0f8ba6945a',
                
                token: 'Sit commodi et deserunt repudiandae. Commodi dolore expedita voluptas voluptatem odit. Qui ut occaecati.',
                isRevoked: false,
                expiresAt: '2021-04-18 15:15:46',
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
                id: '5c60b13f-18f4-4821-8c10-cb0f8ba6945a',
                accessTokenId: '551635cf-b4ee-43e8-a0f8-a72779315c36',
                token: null,
                isRevoked: false,
                expiresAt: '2021-04-18 03:43:49',
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
                id: '5c60b13f-18f4-4821-8c10-cb0f8ba6945a',
                accessTokenId: '551635cf-b4ee-43e8-a0f8-a72779315c36',
                
                isRevoked: true,
                expiresAt: '2021-04-18 06:37:35',
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
                id: '5c60b13f-18f4-4821-8c10-cb0f8ba6945a',
                accessTokenId: '551635cf-b4ee-43e8-a0f8-a72779315c36',
                token: 'Nobis et totam ab vero ab. Nobis distinctio id. Qui ea et sit omnis quisquam alias aliquid voluptas enim. Nisi tenetur tempore qui nobis modi qui vel aut. Dolore molestiae nostrum omnis. Asperiores ducimus nemo vero fugit eaque inventore.',
                isRevoked: null,
                expiresAt: '2021-04-18 10:29:27',
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
                id: '5c60b13f-18f4-4821-8c10-cb0f8ba6945a',
                accessTokenId: '551635cf-b4ee-43e8-a0f8-a72779315c36',
                token: 'Perspiciatis error vero ex non. Minus sed voluptatibus. Repellendus dolore incidunt laboriosam. Enim rerum excepturi eius velit est consequatur. Soluta quasi ut.',
                
                expiresAt: '2021-04-18 04:23:05',
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
                id: 'gpiz5mhhsg60tkifnre20b8pz4pyt0b6le7uq',
                accessTokenId: '551635cf-b4ee-43e8-a0f8-a72779315c36',
                token: 'Assumenda saepe ipsum ut voluptas maiores est velit esse. Nisi a deleniti. Et consequatur deserunt voluptatem sed veritatis voluptate quia. In quia id. Accusamus voluptates corrupti. Debitis earum sit voluptas aut delectus sunt vitae consequatur.',
                isRevoked: false,
                expiresAt: '2021-04-18 16:33:21',
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
                id: '5c60b13f-18f4-4821-8c10-cb0f8ba6945a',
                accessTokenId: 'af21odbw5yv5azkjo8cru31iuuiheos9jy0rb',
                token: 'Qui quidem enim voluptatem dolor odit. Dolor perferendis eius laborum et quia. Ut deserunt deleniti placeat a sed dolorem. Perspiciatis possimus aliquam officiis cupiditate est doloremque non nemo non.',
                isRevoked: false,
                expiresAt: '2021-04-18 00:54:40',
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
                id: '5c60b13f-18f4-4821-8c10-cb0f8ba6945a',
                accessTokenId: '551635cf-b4ee-43e8-a0f8-a72779315c36',
                token: 'Voluptas voluptates est dolorem voluptatem dolorum nulla totam. Deleniti ut autem. Et velit dolorum rem ratione minima impedit.',
                isRevoked: 'true',
                expiresAt: '2021-04-18 16:02:13',
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
                id: '5c60b13f-18f4-4821-8c10-cb0f8ba6945a',
                accessTokenId: '551635cf-b4ee-43e8-a0f8-a72779315c36',
                token: 'Iusto exercitationem et et officia. Velit eaque omnis dolores error repudiandae consectetur. Consequatur repudiandae sit necessitatibus voluptatem sequi quod. Rerum occaecati eum et veritatis voluptatibus asperiores officia ea.',
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
                id: '5c60b13f-18f4-4821-8c10-cb0f8ba6945a',
                accessTokenId: '551635cf-b4ee-43e8-a0f8-a72779315c36',
                token: 'Vitae sint omnis minus non. Libero qui incidunt laboriosam ipsam possimus deleniti recusandae reprehenderit dignissimos. Deleniti eos deleniti dolorem sed. Maiores laborum dolores accusantium. Quo quia et.',
                isRevoked: false,
                expiresAt: '2021-04-18 17:58:05',
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
                        id: '3b2a8413-7703-4f12-8886-3d6ab81baf96'
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
                        id: '5c60b13f-18f4-4821-8c10-cb0f8ba6945a'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5c60b13f-18f4-4821-8c10-cb0f8ba6945a'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/669dfd7a-2933-4baf-b298-a4032a416719')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/5c60b13f-18f4-4821-8c10-cb0f8ba6945a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5c60b13f-18f4-4821-8c10-cb0f8ba6945a'));
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
                
                id: '7139a681-5e00-4f52-a6ee-2434c549b293',
                accessTokenId: '05161d89-2407-4a76-9439-935428f36d4f',
                token: 'Et dolorum rerum dolorem sunt cumque quae incidunt pariatur omnis. Aut est repellat porro quia. Et earum voluptatem aliquam dolores sed nihil enim aut. Quaerat sunt sint repellat nesciunt ullam repellendus. Est accusamus necessitatibus et illum in. Ducimus cumque voluptatum mollitia sit qui ullam et optio.',
                isRevoked: true,
                expiresAt: '2021-04-18 05:06:41',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '5c60b13f-18f4-4821-8c10-cb0f8ba6945a',
                accessTokenId: '551635cf-b4ee-43e8-a0f8-a72779315c36',
                token: 'Aliquid dolorem nulla aut quo adipisci qui. Sint sunt eos voluptas quia sed neque doloribus quae totam. Vel est omnis perferendis blanditiis ut facilis delectus non ad. Ex odit et magnam consequatur non. Inventore error eveniet sit nostrum minima id aut et.',
                isRevoked: true,
                expiresAt: '2021-04-18 19:25:33',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5c60b13f-18f4-4821-8c10-cb0f8ba6945a'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/eb52ae48-c92a-4390-9430-bd96a7f73ee0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/5c60b13f-18f4-4821-8c10-cb0f8ba6945a')
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
                        id: 'd2e3c92e-9881-490c-8076-3aa16ec6fcf9',
                        accessTokenId: '551635cf-b4ee-43e8-a0f8-a72779315c36',
                        token: 'In magni doloremque dolorem repellat. Consectetur laudantium aut ut occaecati non aut aut quae. Modi voluptas nulla ad nam itaque similique consectetur et. Qui ut sit accusamus non aspernatur nihil.',
                        isRevoked: true,
                        expiresAt: '2021-04-18 23:12:15',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', 'd2e3c92e-9881-490c-8076-3aa16ec6fcf9');
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
                            id: 'b73158bb-6e33-44f0-b515-aef49bbf4e54'
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
                            id: '5c60b13f-18f4-4821-8c10-cb0f8ba6945a'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('5c60b13f-18f4-4821-8c10-cb0f8ba6945a');
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
                    id: '97482c07-3641-415d-b69d-75541f9122b6'
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
                    id: '5c60b13f-18f4-4821-8c10-cb0f8ba6945a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('5c60b13f-18f4-4821-8c10-cb0f8ba6945a');
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
                        
                        id: '55de4710-9dd2-409c-a95e-fb42a69d19cd',
                        accessTokenId: '34034971-15ff-445f-ba22-c2fcbe0b0e37',
                        token: 'Minima voluptatibus vitae id. Voluptate magnam animi non. Occaecati soluta sunt maiores quo qui. Dolorum doloribus consequatur repudiandae. Et exercitationem soluta veritatis saepe neque et ut natus. Doloremque nihil deserunt et explicabo.',
                        isRevoked: false,
                        expiresAt: '2021-04-18 18:34:46',
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
                        
                        id: '5c60b13f-18f4-4821-8c10-cb0f8ba6945a',
                        accessTokenId: '551635cf-b4ee-43e8-a0f8-a72779315c36',
                        token: 'Nihil non delectus atque voluptatem rerum. Itaque dolorem consequatur. Consequatur et sequi ab eum suscipit beatae.',
                        isRevoked: false,
                        expiresAt: '2021-04-18 10:59:28',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('5c60b13f-18f4-4821-8c10-cb0f8ba6945a');
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
                    id: 'cda5a427-3467-4e80-9fee-c0897ac59f64'
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
                    id: '5c60b13f-18f4-4821-8c10-cb0f8ba6945a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('5c60b13f-18f4-4821-8c10-cb0f8ba6945a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});