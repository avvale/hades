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
                accessTokenId: '7d9c4c45-f264-4d67-bdb6-9acc20b9b2f3',
                token: 'Sapiente repellendus ut soluta nam optio repellendus. Hic occaecati quae velit iusto aut distinctio quos architecto. Et dolorem est illum culpa perferendis aut.',
                isRevoked: false,
                expiresAt: '2020-11-06 00:53:26',
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
                
                accessTokenId: '7d9c4c45-f264-4d67-bdb6-9acc20b9b2f3',
                token: 'Inventore et perferendis sint. Nihil facilis reiciendis ea. Nihil sit dolor. Quasi sit ad est earum est labore qui magnam facilis. In blanditiis aliquam consequatur ipsum a quo. Autem est perferendis.',
                isRevoked: false,
                expiresAt: '2020-11-06 10:09:19',
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
                id: 'e9b72952-e244-4112-ae1a-a6bbd0b21b53',
                accessTokenId: null,
                token: 'Ut cumque consequatur rem numquam soluta quod qui. Quis facilis corporis repellat itaque ad rem sint velit. Consectetur facere eligendi maiores voluptas est dolor ducimus. Aut beatae totam facere culpa quia excepturi voluptatem esse sit. Vel ut ut minus vel aut.',
                isRevoked: false,
                expiresAt: '2020-11-06 08:24:05',
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
                id: 'e9b72952-e244-4112-ae1a-a6bbd0b21b53',
                
                token: 'Asperiores aliquid voluptatem quis totam quia eos. Voluptates id in illum et cupiditate qui consequatur. Ab eum cum vitae. Inventore sapiente atque et sit. Suscipit consectetur molestiae harum quaerat illum autem architecto.',
                isRevoked: false,
                expiresAt: '2020-11-05 21:05:35',
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
                id: 'e9b72952-e244-4112-ae1a-a6bbd0b21b53',
                accessTokenId: '7d9c4c45-f264-4d67-bdb6-9acc20b9b2f3',
                token: null,
                isRevoked: true,
                expiresAt: '2020-11-06 09:21:28',
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
                id: 'e9b72952-e244-4112-ae1a-a6bbd0b21b53',
                accessTokenId: '7d9c4c45-f264-4d67-bdb6-9acc20b9b2f3',
                
                isRevoked: false,
                expiresAt: '2020-11-06 01:07:38',
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
                id: 'e9b72952-e244-4112-ae1a-a6bbd0b21b53',
                accessTokenId: '7d9c4c45-f264-4d67-bdb6-9acc20b9b2f3',
                token: 'Omnis at perferendis molestiae natus dolor fugiat minus corrupti voluptatem. Quia dolores deserunt est. Quod dolor temporibus possimus ut reiciendis quis enim aut. Odit autem doloribus ex omnis velit ab qui est sapiente.',
                isRevoked: null,
                expiresAt: '2020-11-06 02:31:27',
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
                id: 'e9b72952-e244-4112-ae1a-a6bbd0b21b53',
                accessTokenId: '7d9c4c45-f264-4d67-bdb6-9acc20b9b2f3',
                token: 'Odio aut eveniet autem accusantium rerum voluptatibus esse non ut. Debitis soluta ut repellat et hic eligendi saepe. Eligendi reiciendis impedit. Et sit et non deleniti cum officia et cum aliquid. Quia et odio ea.',
                
                expiresAt: '2020-11-05 14:31:34',
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
                id: '30rpxenzvm50yz8lmhu9gofwspmg21x52q4in',
                accessTokenId: '7d9c4c45-f264-4d67-bdb6-9acc20b9b2f3',
                token: 'Consequatur est asperiores aut qui quia fugiat nostrum vel. Ducimus sunt neque qui earum. Perferendis molestias ut nulla.',
                isRevoked: false,
                expiresAt: '2020-11-05 21:56:06',
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
                id: 'e9b72952-e244-4112-ae1a-a6bbd0b21b53',
                accessTokenId: 'cehltxjrppoa68ag37300395h7qfvwe5gy9a9',
                token: 'Aut perspiciatis praesentium rerum sed eligendi enim consequatur. In enim pariatur ipsa quis quis dicta. Quam esse magnam eum qui. Accusamus atque perspiciatis. Et laudantium earum iure.',
                isRevoked: true,
                expiresAt: '2020-11-06 05:46:26',
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
                id: 'e9b72952-e244-4112-ae1a-a6bbd0b21b53',
                accessTokenId: '7d9c4c45-f264-4d67-bdb6-9acc20b9b2f3',
                token: 'Nulla eligendi voluptates libero sed. A et qui consequatur. Non quo iste sapiente optio non sunt aliquid. Saepe consequatur ipsam laboriosam. Voluptate qui non error voluptas autem eligendi temporibus omnis occaecati. Ea dolores rem excepturi voluptatibus ea consequuntur sint quaerat vitae.',
                isRevoked: 'true',
                expiresAt: '2020-11-05 14:50:13',
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
                id: 'e9b72952-e244-4112-ae1a-a6bbd0b21b53',
                accessTokenId: '7d9c4c45-f264-4d67-bdb6-9acc20b9b2f3',
                token: 'Sequi sunt aut cum iusto aut asperiores ipsam modi. Et aut in minus in ut commodi natus et non. Dolorem qui dolores eum est reiciendis rerum labore ratione. Corporis modi rem minus perferendis quas quae commodi. Sequi placeat sed omnis ducimus impedit deleniti accusamus.',
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
                id: 'e9b72952-e244-4112-ae1a-a6bbd0b21b53',
                accessTokenId: '7d9c4c45-f264-4d67-bdb6-9acc20b9b2f3',
                token: 'Et laudantium repellendus cumque. Quibusdam et doloribus iure velit dolorem. Corrupti cum consectetur ipsum quasi accusamus quaerat illum voluptas. Modi quis sed est iure autem. Id libero molestias eum repudiandae nemo voluptas neque.',
                isRevoked: true,
                expiresAt: '2020-11-05 15:22:57',
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
                        id: 'fab1efdd-feb1-4901-a8c9-7cb1b8b7a20d'
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
                        id: 'e9b72952-e244-4112-ae1a-a6bbd0b21b53'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e9b72952-e244-4112-ae1a-a6bbd0b21b53'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/443074be-7331-41db-a111-39760f05b4da')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/e9b72952-e244-4112-ae1a-a6bbd0b21b53')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e9b72952-e244-4112-ae1a-a6bbd0b21b53'));
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
                
                id: 'ee71dcac-b83b-47e2-b4cf-4818f2076d51',
                accessTokenId: '14ad4c7f-d1ac-4802-9b51-d295419abcba',
                token: 'Et quia quidem et aut qui suscipit soluta tenetur et. Nam vel tempora vel qui animi error nihil enim quam. Neque quas doloribus cupiditate architecto quis qui libero quae illum. Explicabo voluptatem rem voluptas culpa enim est molestiae. Quibusdam laboriosam est ea quis.',
                isRevoked: false,
                expiresAt: '2020-11-06 10:16:12',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e9b72952-e244-4112-ae1a-a6bbd0b21b53',
                accessTokenId: '7d9c4c45-f264-4d67-bdb6-9acc20b9b2f3',
                token: 'Rerum dolores nihil. Asperiores consequatur possimus aperiam. Aut nam in numquam aut eius aliquid optio nesciunt distinctio. Beatae ea consequatur est velit porro tempora occaecati ut quo. Perspiciatis ullam reprehenderit. Asperiores labore delectus ea.',
                isRevoked: false,
                expiresAt: '2020-11-06 07:54:26',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e9b72952-e244-4112-ae1a-a6bbd0b21b53'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/b5cd27cf-e249-4d96-a3a8-f4f3e3edd603')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/e9b72952-e244-4112-ae1a-a6bbd0b21b53')
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
                        id: '05d39984-0c0a-41ca-9808-b3457743e404',
                        accessTokenId: '7d9c4c45-f264-4d67-bdb6-9acc20b9b2f3',
                        token: 'Id rerum sapiente voluptatem vel voluptatem. Enim ex natus impedit non quam. Laborum laudantium eaque voluptatem porro nostrum provident. Sunt autem dolores aliquam libero alias commodi vitae. Aliquid voluptatem et dolorum qui. Molestiae architecto ad in praesentium non et quaerat.',
                        isRevoked: false,
                        expiresAt: '2020-11-05 15:46:00',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', '05d39984-0c0a-41ca-9808-b3457743e404');
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
                            id: '2739d7e5-0a80-41af-8bb9-cd39bd89a238'
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
                            id: 'e9b72952-e244-4112-ae1a-a6bbd0b21b53'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('e9b72952-e244-4112-ae1a-a6bbd0b21b53');
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
                    id: '78fbad5b-18c8-4ac8-baa3-b060e548b7ba'
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
                    id: 'e9b72952-e244-4112-ae1a-a6bbd0b21b53'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('e9b72952-e244-4112-ae1a-a6bbd0b21b53');
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
                        
                        id: '024c59e3-21a9-4541-8829-683c87f64e4a',
                        accessTokenId: 'f48693a9-1210-4f7f-946c-cd0dcdd8305e',
                        token: 'Quibusdam doloremque velit unde amet. Dolor maiores dolor rerum id ipsam similique eius et. Excepturi numquam cum accusamus illum cumque.',
                        isRevoked: true,
                        expiresAt: '2020-11-06 05:00:57',
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
                        
                        id: 'e9b72952-e244-4112-ae1a-a6bbd0b21b53',
                        accessTokenId: '7d9c4c45-f264-4d67-bdb6-9acc20b9b2f3',
                        token: 'Debitis nihil reprehenderit fugiat impedit tenetur adipisci. Porro incidunt rem aspernatur. Et quam optio non at corporis ad. Perspiciatis qui qui inventore nobis nemo explicabo perferendis vero.',
                        isRevoked: false,
                        expiresAt: '2020-11-06 09:46:08',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('e9b72952-e244-4112-ae1a-a6bbd0b21b53');
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
                    id: '5fbd18a6-1e13-4c2b-baaa-863a041efe83'
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
                    id: 'e9b72952-e244-4112-ae1a-a6bbd0b21b53'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('e9b72952-e244-4112-ae1a-a6bbd0b21b53');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});