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
                accessTokenId: 'b8d3db3a-2583-4735-b934-145d0d19bc5b',
                token: 'Similique voluptas eum dolor. Voluptatem quaerat iure a. Ab dolorem non enim placeat et. Pariatur qui consequatur adipisci distinctio consequatur. Dicta sit nobis.',
                isRevoked: true,
                expiresAt: '2020-09-20 03:35:12',
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
                
                accessTokenId: 'b8d3db3a-2583-4735-b934-145d0d19bc5b',
                token: 'Aut id quo et est quis. Est iste quae odit dolor rerum. Eius non corporis. Non et nemo. Ea odio aut. Ut et quas.',
                isRevoked: false,
                expiresAt: '2020-09-20 00:06:44',
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
                id: 'a744b29b-0483-4a8d-ad34-f34bf2ebe040',
                accessTokenId: null,
                token: 'Ut saepe qui. Repellendus repellendus expedita voluptas velit necessitatibus. Enim est facere. Voluptatem accusantium nobis beatae non.',
                isRevoked: true,
                expiresAt: '2020-09-20 12:44:28',
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
                id: 'a744b29b-0483-4a8d-ad34-f34bf2ebe040',
                
                token: 'Et cum dolores eum qui. Voluptas magnam eum soluta quia. Hic necessitatibus est inventore quo sed eius.',
                isRevoked: true,
                expiresAt: '2020-09-20 15:50:10',
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
                id: 'a744b29b-0483-4a8d-ad34-f34bf2ebe040',
                accessTokenId: 'b8d3db3a-2583-4735-b934-145d0d19bc5b',
                token: null,
                isRevoked: false,
                expiresAt: '2020-09-20 08:41:48',
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
                id: 'a744b29b-0483-4a8d-ad34-f34bf2ebe040',
                accessTokenId: 'b8d3db3a-2583-4735-b934-145d0d19bc5b',
                
                isRevoked: false,
                expiresAt: '2020-09-20 14:14:19',
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
                id: 'a744b29b-0483-4a8d-ad34-f34bf2ebe040',
                accessTokenId: 'b8d3db3a-2583-4735-b934-145d0d19bc5b',
                token: 'Sit rerum dolore in consequatur. Consequatur non quam voluptatum iusto nihil consequatur est qui. Velit enim aut qui. Non ut ut enim beatae neque quibusdam quis.',
                isRevoked: null,
                expiresAt: '2020-09-19 21:22:10',
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
                id: 'a744b29b-0483-4a8d-ad34-f34bf2ebe040',
                accessTokenId: 'b8d3db3a-2583-4735-b934-145d0d19bc5b',
                token: 'Sit et quidem saepe minus dignissimos. Neque vitae facilis sequi cum necessitatibus quidem animi aut voluptatibus. Maxime sequi qui voluptatibus repellat occaecati soluta et illum et. Et aperiam omnis. Magnam libero architecto sint ut sequi repudiandae dolorum suscipit. Maiores assumenda optio dolorem placeat numquam cum.',
                
                expiresAt: '2020-09-20 15:13:43',
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
                id: '028k9y6bg0v0xq3wvbostta0l8atpmyoqwy3n',
                accessTokenId: 'b8d3db3a-2583-4735-b934-145d0d19bc5b',
                token: 'Commodi alias tempore non iusto ducimus quo earum. Est necessitatibus voluptatem in est aut qui. Dignissimos sit rerum non est. Nobis voluptatem velit. Non consequatur doloribus sunt consequatur sed sed voluptatem nulla.',
                isRevoked: true,
                expiresAt: '2020-09-20 06:27:22',
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
                id: 'a744b29b-0483-4a8d-ad34-f34bf2ebe040',
                accessTokenId: 'd0y86rmdog102ibvnlq0ghtor8blek0qw9hyd',
                token: 'Qui nam officiis eum impedit qui et omnis ex doloremque. Iusto excepturi et et aut. Illum magnam aut veritatis unde non voluptatum qui. Quia quas nostrum ullam hic voluptas qui excepturi qui delectus. Dolores voluptatem vel excepturi consectetur reiciendis et nisi nostrum aut.',
                isRevoked: false,
                expiresAt: '2020-09-19 21:18:01',
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
                id: 'a744b29b-0483-4a8d-ad34-f34bf2ebe040',
                accessTokenId: 'b8d3db3a-2583-4735-b934-145d0d19bc5b',
                token: 'Eos non voluptates quis ut. Ut voluptatem quia ea sapiente est. Ipsa nulla molestiae corrupti non doloribus debitis dolores. Deleniti omnis rerum placeat.',
                isRevoked: 'true',
                expiresAt: '2020-09-20 02:35:36',
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
                id: 'a744b29b-0483-4a8d-ad34-f34bf2ebe040',
                accessTokenId: 'b8d3db3a-2583-4735-b934-145d0d19bc5b',
                token: 'Tempore illum ipsam illo et provident sit consequatur quia ea. Possimus doloribus deleniti repudiandae aut. Recusandae vero dolor ullam aut vero voluptatem mollitia maiores rerum.',
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
                id: 'a744b29b-0483-4a8d-ad34-f34bf2ebe040',
                accessTokenId: 'b8d3db3a-2583-4735-b934-145d0d19bc5b',
                token: 'Ducimus pariatur qui non dicta ad. Minus qui animi unde quia exercitationem qui rerum ea est. Est minima sint quibusdam sunt. Quis eius ea corporis. Nihil corrupti labore deserunt. Praesentium qui laudantium totam sit a iure et ut voluptate.',
                isRevoked: true,
                expiresAt: '2020-09-19 22:45:09',
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
                        id: '3074921f-181c-4105-ad50-ca2d18371107'
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
                        id: 'a744b29b-0483-4a8d-ad34-f34bf2ebe040'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a744b29b-0483-4a8d-ad34-f34bf2ebe040'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/bbd1cb14-f25e-4b17-9cbb-9738483b3408')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/a744b29b-0483-4a8d-ad34-f34bf2ebe040')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a744b29b-0483-4a8d-ad34-f34bf2ebe040'));
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
                
                id: '4929adaf-383f-42b0-9f74-8ea804c0e0d2',
                accessTokenId: 'f00daa26-24f0-46b8-9dc9-16ed54ae3211',
                token: 'Nobis voluptate vero ut voluptas beatae voluptatibus sed vitae. Ut odio provident labore possimus. Et recusandae omnis magnam neque alias quidem dolores. Saepe aut dolorem ut quia eos tenetur.',
                isRevoked: false,
                expiresAt: '2020-09-19 18:10:53',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a744b29b-0483-4a8d-ad34-f34bf2ebe040',
                accessTokenId: 'b8d3db3a-2583-4735-b934-145d0d19bc5b',
                token: 'Illum assumenda esse voluptatem iure vero delectus quia iusto eos. Ipsam tenetur nesciunt aut ut est architecto tenetur eum. Est et et est vel in sit quam consequatur. Hic quam pariatur suscipit architecto. Laboriosam eos inventore sequi ut dignissimos ea labore facere.',
                isRevoked: true,
                expiresAt: '2020-09-19 20:47:53',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a744b29b-0483-4a8d-ad34-f34bf2ebe040'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/80d2c1c3-5a22-4c1a-abb1-945ecc3a43f9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/a744b29b-0483-4a8d-ad34-f34bf2ebe040')
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
                        id: 'aee4be89-902f-4d0a-8327-9abfc60f79d8',
                        accessTokenId: 'b8d3db3a-2583-4735-b934-145d0d19bc5b',
                        token: 'Placeat mollitia exercitationem dignissimos laborum. Expedita nihil sed voluptatem nobis molestiae minima voluptatem et voluptatem. Doloremque nihil eligendi. Vel error eos non consequatur voluptas occaecati vel ducimus illum. Optio quia voluptatem deleniti in.',
                        isRevoked: true,
                        expiresAt: '2020-09-20 04:42:06',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', 'aee4be89-902f-4d0a-8327-9abfc60f79d8');
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
                            id: '14ba5c45-9c17-4659-a388-bbb2e1403553'
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
                            id: 'a744b29b-0483-4a8d-ad34-f34bf2ebe040'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('a744b29b-0483-4a8d-ad34-f34bf2ebe040');
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
                    id: '4745fd6b-7f8c-4c1b-a07d-7907b0e0539d'
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
                    id: 'a744b29b-0483-4a8d-ad34-f34bf2ebe040'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('a744b29b-0483-4a8d-ad34-f34bf2ebe040');
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
                        
                        id: '72a17863-5921-4772-b764-1968b260b6c9',
                        accessTokenId: '8ab4031c-c936-4352-b17c-37994366c7b6',
                        token: 'Nam aperiam ea. Sit qui porro adipisci et in quia. Cupiditate optio est in dolore vel. Dicta fugiat pariatur sit ad architecto sint dolores perferendis officia.',
                        isRevoked: true,
                        expiresAt: '2020-09-20 11:49:13',
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
                        
                        id: 'a744b29b-0483-4a8d-ad34-f34bf2ebe040',
                        accessTokenId: 'b8d3db3a-2583-4735-b934-145d0d19bc5b',
                        token: 'Officiis et accusamus tenetur autem vitae non quae ab sed. Numquam illo qui. Nulla at et veritatis ut aliquam nisi eum vel voluptatem. Vitae aliquid voluptatibus aut ad ut repudiandae consequatur sed ratione. Voluptatem sit minus sed et.',
                        isRevoked: true,
                        expiresAt: '2020-09-20 10:12:07',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('a744b29b-0483-4a8d-ad34-f34bf2ebe040');
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
                    id: 'd4bd2abb-afcd-49de-87e8-4124fa0c594f'
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
                    id: 'a744b29b-0483-4a8d-ad34-f34bf2ebe040'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('a744b29b-0483-4a8d-ad34-f34bf2ebe040');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});