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
                accessTokenId: '00529c69-1e76-4b34-90b9-cf8392b2924c',
                token: 'Odit corrupti expedita. Error eos molestiae doloremque voluptates. Necessitatibus et molestiae suscipit est ea voluptas ut architecto sint.',
                isRevoked: true,
                expiresAt: '2021-04-14 05:47:13',
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
                
                accessTokenId: '00529c69-1e76-4b34-90b9-cf8392b2924c',
                token: 'Doloremque sunt saepe veniam aut corrupti nobis est. Qui qui perspiciatis. Quaerat est eos natus. Deserunt rerum eaque delectus possimus consequatur in provident ipsa. Ut consectetur aliquam perferendis optio ea. Exercitationem dolores molestiae pariatur dolor accusamus optio exercitationem.',
                isRevoked: false,
                expiresAt: '2021-04-14 03:04:16',
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
                id: 'ea58125f-94ee-4129-9f3b-d59b20d3a685',
                accessTokenId: null,
                token: 'Sit et nihil iure sapiente et impedit dignissimos est. Eaque quam sit. Rerum eius rerum.',
                isRevoked: false,
                expiresAt: '2021-04-14 22:58:09',
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
                id: 'ea58125f-94ee-4129-9f3b-d59b20d3a685',
                
                token: 'Ducimus voluptas repellat rerum suscipit. Placeat dolore laboriosam doloremque nisi qui sint molestiae. Velit ut ratione consequatur sint asperiores dolores. Est optio sunt quia.',
                isRevoked: false,
                expiresAt: '2021-04-14 10:33:28',
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
                id: 'ea58125f-94ee-4129-9f3b-d59b20d3a685',
                accessTokenId: '00529c69-1e76-4b34-90b9-cf8392b2924c',
                token: null,
                isRevoked: false,
                expiresAt: '2021-04-14 22:38:14',
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
                id: 'ea58125f-94ee-4129-9f3b-d59b20d3a685',
                accessTokenId: '00529c69-1e76-4b34-90b9-cf8392b2924c',
                
                isRevoked: true,
                expiresAt: '2021-04-14 13:08:13',
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
                id: 'ea58125f-94ee-4129-9f3b-d59b20d3a685',
                accessTokenId: '00529c69-1e76-4b34-90b9-cf8392b2924c',
                token: 'Laborum sit velit est et sit. Veritatis numquam dolores. Illo et qui dignissimos voluptatem velit eos. Consequatur ipsum voluptatem ut quis perspiciatis rerum facilis aliquid. Sunt ipsam consequatur optio natus ea suscipit iusto.',
                isRevoked: null,
                expiresAt: '2021-04-14 05:05:45',
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
                id: 'ea58125f-94ee-4129-9f3b-d59b20d3a685',
                accessTokenId: '00529c69-1e76-4b34-90b9-cf8392b2924c',
                token: 'Nesciunt animi possimus reprehenderit laudantium. A magnam in consequuntur explicabo saepe. Ut quia quis aliquam. Sapiente neque est qui.',
                
                expiresAt: '2021-04-14 16:37:47',
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
                id: 'kfc5l6hrasjqd5c2oo8sewki9jospokc8y790',
                accessTokenId: '00529c69-1e76-4b34-90b9-cf8392b2924c',
                token: 'Et ea quo et qui mollitia voluptate aliquam nisi assumenda. Qui est aut qui enim fugiat atque voluptatem ratione. Et porro itaque alias tenetur hic. Ut quaerat et delectus. Tenetur autem unde incidunt. Itaque omnis id nisi quidem ad.',
                isRevoked: true,
                expiresAt: '2021-04-14 01:08:04',
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
                id: 'ea58125f-94ee-4129-9f3b-d59b20d3a685',
                accessTokenId: 'vnlqlfo09zdz9uewl7aqa2baqt2g9929ymmn5',
                token: 'Quas quasi omnis unde et praesentium cupiditate molestias et. Atque vitae deleniti magnam a. Libero sint in ex. Soluta mollitia eius commodi sed facere ut officia voluptas magnam.',
                isRevoked: false,
                expiresAt: '2021-04-14 03:53:19',
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
                id: 'ea58125f-94ee-4129-9f3b-d59b20d3a685',
                accessTokenId: '00529c69-1e76-4b34-90b9-cf8392b2924c',
                token: 'Sunt et tenetur. Adipisci ut sunt tempore ipsam laboriosam. Quibusdam quis ut illo alias ea expedita et aut. Sed alias repellendus.',
                isRevoked: 'true',
                expiresAt: '2021-04-14 04:24:48',
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
                id: 'ea58125f-94ee-4129-9f3b-d59b20d3a685',
                accessTokenId: '00529c69-1e76-4b34-90b9-cf8392b2924c',
                token: 'Pariatur voluptas inventore. Ut similique rem quae non omnis error eos illum. Illum deserunt dolor rerum ratione facilis magni. Eius tempora nemo earum quo in. Fuga quae laboriosam eos molestiae asperiores tempore impedit ratione reiciendis.',
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
                id: 'ea58125f-94ee-4129-9f3b-d59b20d3a685',
                accessTokenId: '00529c69-1e76-4b34-90b9-cf8392b2924c',
                token: 'Ducimus omnis velit magnam nulla omnis quaerat. Consequatur pariatur suscipit. Ullam quaerat eos nemo dolorum ut. Ex iusto voluptate atque. Vel reprehenderit deleniti. Quia et cum quia corrupti beatae.',
                isRevoked: true,
                expiresAt: '2021-04-15 00:39:59',
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
                        id: '382290a5-9d02-4838-873b-3404932d2f25'
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
                        id: 'ea58125f-94ee-4129-9f3b-d59b20d3a685'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ea58125f-94ee-4129-9f3b-d59b20d3a685'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/c7b729d1-a69d-48da-8665-919ba54b5c81')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/ea58125f-94ee-4129-9f3b-d59b20d3a685')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ea58125f-94ee-4129-9f3b-d59b20d3a685'));
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
                
                id: '8f837335-91d7-45f2-827b-693d7f662015',
                accessTokenId: 'a803b7a1-e971-4f93-bbbd-1212e9df7a9f',
                token: 'Nihil tenetur incidunt et suscipit facilis aut. Dolores hic porro dolor. Non dolor voluptas possimus. Magnam neque earum aut consequatur. Pariatur dolores soluta quasi sunt alias sapiente dolorem minus. Ducimus beatae illo.',
                isRevoked: true,
                expiresAt: '2021-04-15 00:59:48',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ea58125f-94ee-4129-9f3b-d59b20d3a685',
                accessTokenId: '00529c69-1e76-4b34-90b9-cf8392b2924c',
                token: 'Quae neque et est nulla doloremque totam aut cum omnis. Voluptas at facilis blanditiis et nobis ut sunt. Reiciendis quis sed voluptas placeat saepe suscipit impedit consectetur. Ab et enim in quia. Nostrum voluptates provident dolor et quidem illum sint. Asperiores sed maxime.',
                isRevoked: true,
                expiresAt: '2021-04-14 11:41:28',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ea58125f-94ee-4129-9f3b-d59b20d3a685'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/b59c4a62-79fb-430f-b76a-e94deca91dc2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/ea58125f-94ee-4129-9f3b-d59b20d3a685')
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
                        id: '22a34a23-298b-40bf-a658-ae58263e815e',
                        accessTokenId: '00529c69-1e76-4b34-90b9-cf8392b2924c',
                        token: 'Sed eum fugit in nostrum. Nostrum ex cumque accusantium possimus iste ut. Repudiandae quia molestiae. Accusantium est unde minus. Nemo officiis doloremque. Rem esse iure.',
                        isRevoked: false,
                        expiresAt: '2021-04-14 03:21:43',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', '22a34a23-298b-40bf-a658-ae58263e815e');
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
                            id: 'ad39cd02-3e02-4596-89c4-1c6fd4b3ed59'
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
                            id: 'ea58125f-94ee-4129-9f3b-d59b20d3a685'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('ea58125f-94ee-4129-9f3b-d59b20d3a685');
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
                    id: '86f3e7f0-d688-44cd-9aca-0f516c89dcb1'
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
                    id: 'ea58125f-94ee-4129-9f3b-d59b20d3a685'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('ea58125f-94ee-4129-9f3b-d59b20d3a685');
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
                        
                        id: '9e9087a8-85bb-4ed8-9428-ff49377430cc',
                        accessTokenId: 'b3bfcb4a-3f8f-4379-b4db-a0a976c5b1e0',
                        token: 'Nostrum et rerum reprehenderit. Numquam non animi totam est delectus repellat quia et. Deserunt aliquam nam provident voluptate. Dolores ea et dolores ratione aliquam odit labore neque et. Amet aut qui omnis perferendis dolorum accusamus consequatur sit dolores.',
                        isRevoked: true,
                        expiresAt: '2021-04-14 11:46:17',
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
                        
                        id: 'ea58125f-94ee-4129-9f3b-d59b20d3a685',
                        accessTokenId: '00529c69-1e76-4b34-90b9-cf8392b2924c',
                        token: 'Assumenda numquam placeat et. Officia doloribus tempore. Velit qui impedit delectus nihil nisi unde omnis. Error id et libero architecto veniam reiciendis alias ducimus praesentium. Quaerat suscipit praesentium est deserunt ratione at asperiores. Est odit omnis qui quidem.',
                        isRevoked: false,
                        expiresAt: '2021-04-14 18:12:44',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('ea58125f-94ee-4129-9f3b-d59b20d3a685');
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
                    id: '59fa3148-a4ab-4857-9251-378f7ce06717'
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
                    id: 'ea58125f-94ee-4129-9f3b-d59b20d3a685'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('ea58125f-94ee-4129-9f3b-d59b20d3a685');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});