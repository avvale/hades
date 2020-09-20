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
                accessTokenId: '9b230849-92aa-4f0d-8137-c4cb9e78216b',
                token: 'Molestias esse molestiae nesciunt soluta. Repellat fugit repellendus ut ex atque necessitatibus. Autem eveniet architecto laborum similique. Fugiat dolor animi voluptates officiis voluptate.',
                isRevoked: true,
                expiresAt: '2020-09-20 09:24:22',
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
                
                accessTokenId: '9b230849-92aa-4f0d-8137-c4cb9e78216b',
                token: 'Veritatis ut maiores. Veritatis eos quos doloribus velit. Tempora maiores rerum aliquid tempore sit. Odio hic sunt natus quasi voluptatem ea sunt aspernatur. Dicta aperiam rerum officia aliquid iste sed fuga aliquam. Sed dolores ea minima est.',
                isRevoked: true,
                expiresAt: '2020-09-20 05:15:45',
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
                id: 'b160900a-ca08-478c-a564-7425049b2ffc',
                accessTokenId: null,
                token: 'Molestiae architecto molestiae ut. Vel similique in sed ex. Ratione modi voluptatibus omnis nam et. Et unde numquam sit optio officia.',
                isRevoked: false,
                expiresAt: '2020-09-20 01:49:17',
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
                id: 'b160900a-ca08-478c-a564-7425049b2ffc',
                
                token: 'Eos deserunt magni facere laudantium dolorum rerum. Molestiae suscipit eaque repudiandae ipsam dolorum quidem. Qui voluptatem facilis error cum officiis fugit rerum in. Cum qui eum in. Et ut eos et repudiandae sed voluptatibus.',
                isRevoked: false,
                expiresAt: '2020-09-20 11:32:42',
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
                id: 'b160900a-ca08-478c-a564-7425049b2ffc',
                accessTokenId: '9b230849-92aa-4f0d-8137-c4cb9e78216b',
                token: null,
                isRevoked: false,
                expiresAt: '2020-09-20 12:15:46',
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
                id: 'b160900a-ca08-478c-a564-7425049b2ffc',
                accessTokenId: '9b230849-92aa-4f0d-8137-c4cb9e78216b',
                
                isRevoked: true,
                expiresAt: '2020-09-20 02:52:08',
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
                id: 'b160900a-ca08-478c-a564-7425049b2ffc',
                accessTokenId: '9b230849-92aa-4f0d-8137-c4cb9e78216b',
                token: 'Maxime porro accusamus natus dolorem voluptatem consequatur odit sunt tenetur. Veniam voluptas deserunt exercitationem nesciunt aliquam sapiente doloremque. Quibusdam illum quaerat voluptatem dolorem labore quasi nulla.',
                isRevoked: null,
                expiresAt: '2020-09-20 16:14:19',
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
                id: 'b160900a-ca08-478c-a564-7425049b2ffc',
                accessTokenId: '9b230849-92aa-4f0d-8137-c4cb9e78216b',
                token: 'In et enim voluptatem dignissimos at nemo delectus. Aut qui exercitationem explicabo delectus facilis. Magni nemo doloremque ut et suscipit animi rem. Quia fugit hic dolorem aut. Reprehenderit minus ab nemo similique odio voluptatibus sunt omnis. Velit quisquam omnis tempore odio dolorum quia quae tenetur.',
                
                expiresAt: '2020-09-20 13:03:40',
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
                id: 'pj1jhre2lezy95gl6g3681g29i3xowoq8rdwu',
                accessTokenId: '9b230849-92aa-4f0d-8137-c4cb9e78216b',
                token: 'Ullam ut et consequuntur ea pariatur nihil omnis in. Molestiae eius sint est iure aut aut praesentium similique. Consequatur non minima quod. Laboriosam vitae sed.',
                isRevoked: false,
                expiresAt: '2020-09-20 03:03:04',
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
                id: 'b160900a-ca08-478c-a564-7425049b2ffc',
                accessTokenId: '6chp8mx7xp3ihj1p08ddnfr991i1asndbhhaa',
                token: 'Qui iusto rerum sit enim. Rerum occaecati laboriosam aut. Quibusdam eos nesciunt. Temporibus in in quod architecto neque. Eos et a voluptatem dignissimos quo. Consequatur aut nostrum doloribus architecto quia qui velit et id.',
                isRevoked: false,
                expiresAt: '2020-09-20 11:07:38',
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
                id: 'b160900a-ca08-478c-a564-7425049b2ffc',
                accessTokenId: '9b230849-92aa-4f0d-8137-c4cb9e78216b',
                token: 'Eaque ut et aspernatur animi dignissimos sunt numquam explicabo magnam. Officiis corrupti aspernatur. Distinctio voluptas quisquam asperiores.',
                isRevoked: 'true',
                expiresAt: '2020-09-19 23:36:35',
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
                id: 'b160900a-ca08-478c-a564-7425049b2ffc',
                accessTokenId: '9b230849-92aa-4f0d-8137-c4cb9e78216b',
                token: 'Est ullam quia et eos tempore quia voluptas. Odio ex nisi tempora eius in deserunt est quia. Rerum est officia ut et dolorem saepe qui. Molestiae sed ut totam dolorum laborum qui. Ea facilis enim sunt voluptatem.',
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
                id: 'b160900a-ca08-478c-a564-7425049b2ffc',
                accessTokenId: '9b230849-92aa-4f0d-8137-c4cb9e78216b',
                token: 'Qui omnis nostrum. Non aperiam eaque. Pariatur dicta consectetur consequatur fugiat dolorem. Nihil consectetur sed labore voluptate provident nihil. Sint nam accusamus rerum architecto sed voluptatem.',
                isRevoked: true,
                expiresAt: '2020-09-20 10:13:48',
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
                        id: '3a3e7716-92b6-4c94-82f2-74a3578767c7'
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
                        id: 'b160900a-ca08-478c-a564-7425049b2ffc'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b160900a-ca08-478c-a564-7425049b2ffc'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/5e99ac3a-fa58-4b5b-9d13-20f22d95a8c3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/b160900a-ca08-478c-a564-7425049b2ffc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b160900a-ca08-478c-a564-7425049b2ffc'));
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
                
                id: '9106520b-4cb2-45d9-86b0-f89435a42963',
                accessTokenId: '5a409488-3805-4848-bb76-a34f9b14661a',
                token: 'Sit veritatis totam. Error unde sed vel quia sed accusamus ex libero. Minima accusamus eum quo magni. Excepturi libero commodi. Perspiciatis occaecati doloribus soluta. Aut ut sapiente ea nihil perferendis sit quae.',
                isRevoked: true,
                expiresAt: '2020-09-20 00:53:03',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b160900a-ca08-478c-a564-7425049b2ffc',
                accessTokenId: '9b230849-92aa-4f0d-8137-c4cb9e78216b',
                token: 'Quisquam enim officiis non placeat nesciunt occaecati. Asperiores nihil commodi. Sint vitae voluptas laboriosam rerum. Nam qui earum cumque quae minus nemo aspernatur explicabo voluptates. Earum iure veniam voluptas eum aut eum. Fuga impedit qui dicta qui ut.',
                isRevoked: true,
                expiresAt: '2020-09-20 14:14:54',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b160900a-ca08-478c-a564-7425049b2ffc'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/2fd0b0a8-af01-455b-99ea-8e3e776ff107')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/b160900a-ca08-478c-a564-7425049b2ffc')
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
                        id: '8b09e0c0-00fc-436b-bcd8-0a65af088a9a',
                        accessTokenId: '9b230849-92aa-4f0d-8137-c4cb9e78216b',
                        token: 'Et illo dolores non esse nostrum aut officiis molestiae. Repudiandae praesentium non eos et. Dolorem sequi dolorum nam consequatur. Labore aut eveniet est. Est velit voluptatum fuga illo ex.',
                        isRevoked: false,
                        expiresAt: '2020-09-20 15:08:42',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', '8b09e0c0-00fc-436b-bcd8-0a65af088a9a');
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
                            id: '3d1d2437-653a-4cca-b9ff-be5f978ab115'
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
                            id: 'b160900a-ca08-478c-a564-7425049b2ffc'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('b160900a-ca08-478c-a564-7425049b2ffc');
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
                    id: '5672f12a-40bf-4787-b99e-19b0579cc9ff'
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
                    id: 'b160900a-ca08-478c-a564-7425049b2ffc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('b160900a-ca08-478c-a564-7425049b2ffc');
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
                        
                        id: 'c799106d-06f3-41e1-848a-32475e5f7498',
                        accessTokenId: '5fbb7103-c8b0-4cb9-9286-8592478a2a36',
                        token: 'Est soluta vero rem a ut provident ut assumenda excepturi. Hic culpa quia omnis quibusdam. Et voluptas non blanditiis ad qui quam nisi aperiam. Eos vel aut deserunt inventore.',
                        isRevoked: false,
                        expiresAt: '2020-09-20 13:36:15',
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
                        
                        id: 'b160900a-ca08-478c-a564-7425049b2ffc',
                        accessTokenId: '9b230849-92aa-4f0d-8137-c4cb9e78216b',
                        token: 'Et similique eius suscipit laudantium voluptas provident ea. Dolorem aliquid numquam occaecati voluptas magni beatae et rerum illum. Ullam tempora vel quia. Laboriosam ut voluptatem nihil vero tempora et. Voluptatem voluptatem numquam et saepe.',
                        isRevoked: true,
                        expiresAt: '2020-09-20 03:59:21',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('b160900a-ca08-478c-a564-7425049b2ffc');
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
                    id: 'ef1fabae-ff34-4dc0-9a15-02624a4869d9'
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
                    id: 'b160900a-ca08-478c-a564-7425049b2ffc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('b160900a-ca08-478c-a564-7425049b2ffc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});