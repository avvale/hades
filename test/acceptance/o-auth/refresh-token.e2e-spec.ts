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
                accessTokenId: '1111096a-50ca-47a1-ba30-055acf9523e4',
                token: 'Culpa quibusdam totam error nam harum. Minima voluptas non. Velit numquam ducimus. Iste molestias inventore. Necessitatibus est earum ut sed officia deserunt voluptatem.',
                isRevoked: false,
                expiresAt: '2021-04-18 17:45:14',
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
                
                accessTokenId: '1111096a-50ca-47a1-ba30-055acf9523e4',
                token: 'Fugit rerum non libero et tempora excepturi quisquam est quia. Labore consequatur voluptatem. Odio est non nulla aliquam deleniti mollitia aliquam distinctio. Blanditiis ab a earum. Tempora eum ea et. Sint recusandae optio libero ipsum maxime natus eaque.',
                isRevoked: false,
                expiresAt: '2021-04-18 16:34:08',
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
                id: '6615b736-24dd-4e02-923f-065102e9e592',
                accessTokenId: null,
                token: 'Et a sed reiciendis voluptatem pariatur. Ducimus iure et vero ut esse. Adipisci voluptas quaerat error repellendus vel.',
                isRevoked: true,
                expiresAt: '2021-04-18 20:45:15',
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
                id: '6615b736-24dd-4e02-923f-065102e9e592',
                
                token: 'Ab dolores qui voluptas. Nulla quae aliquam quis. Amet consequatur cupiditate soluta. Illo placeat sit reiciendis vero cum. Quaerat quod reiciendis labore.',
                isRevoked: false,
                expiresAt: '2021-04-18 17:05:53',
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
                id: '6615b736-24dd-4e02-923f-065102e9e592',
                accessTokenId: '1111096a-50ca-47a1-ba30-055acf9523e4',
                token: null,
                isRevoked: true,
                expiresAt: '2021-04-18 19:02:03',
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
                id: '6615b736-24dd-4e02-923f-065102e9e592',
                accessTokenId: '1111096a-50ca-47a1-ba30-055acf9523e4',
                
                isRevoked: true,
                expiresAt: '2021-04-18 23:45:33',
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
                id: '6615b736-24dd-4e02-923f-065102e9e592',
                accessTokenId: '1111096a-50ca-47a1-ba30-055acf9523e4',
                token: 'Quia sit optio sunt quibusdam qui. Sunt temporibus qui et omnis aut ex necessitatibus rerum. Maiores sit quibusdam qui laudantium et libero recusandae.',
                isRevoked: null,
                expiresAt: '2021-04-18 17:04:16',
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
                id: '6615b736-24dd-4e02-923f-065102e9e592',
                accessTokenId: '1111096a-50ca-47a1-ba30-055acf9523e4',
                token: 'Et sint dolore quos aspernatur adipisci voluptas temporibus aut. Voluptatem laborum vero. Ea officia aut quibusdam dolorem aliquid at id.',
                
                expiresAt: '2021-04-18 07:24:33',
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
                id: 'rjjynqg4cx4soxm7x4j9kt9lzwngd12zj48yr',
                accessTokenId: '1111096a-50ca-47a1-ba30-055acf9523e4',
                token: 'Et quasi eum numquam sapiente sunt autem esse dolor. Et ut et possimus eveniet iure et nemo. Quos at ducimus voluptate fuga et sint. Eos quisquam rerum consequatur velit et repellendus. Deserunt enim similique qui repellat ratione facere esse sequi ratione.',
                isRevoked: false,
                expiresAt: '2021-04-18 23:13:32',
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
                id: '6615b736-24dd-4e02-923f-065102e9e592',
                accessTokenId: 'jv5291cke21bvn1ogvb0qfodla7jgv9z2604u',
                token: 'Et quis animi voluptas eaque sunt voluptatem quia nisi magni. Ut non nobis in et. Molestiae facere ut rerum temporibus. Temporibus ab ab. Eligendi molestiae eius. Iste aut voluptatibus.',
                isRevoked: true,
                expiresAt: '2021-04-18 04:17:12',
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
                id: '6615b736-24dd-4e02-923f-065102e9e592',
                accessTokenId: '1111096a-50ca-47a1-ba30-055acf9523e4',
                token: 'Quam sequi natus voluptas odio dolorem et nemo expedita officia. Nemo minima sed. Maiores autem saepe soluta hic sed sit autem. Animi adipisci molestias. Facere eveniet possimus laboriosam impedit delectus.',
                isRevoked: 'true',
                expiresAt: '2021-04-18 14:45:50',
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
                id: '6615b736-24dd-4e02-923f-065102e9e592',
                accessTokenId: '1111096a-50ca-47a1-ba30-055acf9523e4',
                token: 'Hic amet aut ut ea. Qui quia voluptatibus velit possimus. Sed molestiae cum sed ullam. Fuga id sed in.',
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
                id: '6615b736-24dd-4e02-923f-065102e9e592',
                accessTokenId: '1111096a-50ca-47a1-ba30-055acf9523e4',
                token: 'Consequatur animi iure facilis. Unde facilis nemo modi est. Et dolor laborum quo qui laboriosam error nihil vero voluptas. Quis voluptatum in quos molestiae neque.',
                isRevoked: false,
                expiresAt: '2021-04-18 17:32:20',
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
                        id: 'abcfddf1-39e1-46dd-bad4-7f1ce15ca58c'
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
                        id: '6615b736-24dd-4e02-923f-065102e9e592'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6615b736-24dd-4e02-923f-065102e9e592'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/01a1b067-c6ec-4c27-a6cd-1afbf1f65eba')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/6615b736-24dd-4e02-923f-065102e9e592')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6615b736-24dd-4e02-923f-065102e9e592'));
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
                
                id: '5660e56c-3c95-4663-8849-25cc1f8d0182',
                accessTokenId: '88893d5c-2860-4037-85d2-5eb1035cda84',
                token: 'Laborum reiciendis molestiae. Occaecati voluptas consequatur non quaerat neque inventore. Pariatur velit repudiandae. Voluptates voluptas dolore fugiat. Voluptate dolor autem est sed veniam fuga voluptatem dolore.',
                isRevoked: true,
                expiresAt: '2021-04-18 08:07:01',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '6615b736-24dd-4e02-923f-065102e9e592',
                accessTokenId: '1111096a-50ca-47a1-ba30-055acf9523e4',
                token: 'Omnis dolore est et deleniti perspiciatis illo. Minus natus odio est. Odio quis molestiae. Quia ut suscipit sit aperiam illum.',
                isRevoked: true,
                expiresAt: '2021-04-18 09:13:27',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6615b736-24dd-4e02-923f-065102e9e592'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/5c695493-583c-409f-b413-e938da0ad388')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/6615b736-24dd-4e02-923f-065102e9e592')
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
                        id: '63d8b5dc-e7d7-4af5-b793-5b8d63a40571',
                        accessTokenId: '1111096a-50ca-47a1-ba30-055acf9523e4',
                        token: 'Esse ex saepe tempora incidunt. Sit cum amet reprehenderit ea maxime veniam labore. Omnis maiores maiores minima fuga necessitatibus quos id.',
                        isRevoked: true,
                        expiresAt: '2021-04-18 17:16:31',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', '63d8b5dc-e7d7-4af5-b793-5b8d63a40571');
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
                            id: 'e436dd81-214b-4b96-90dd-23900de483f1'
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
                            id: '6615b736-24dd-4e02-923f-065102e9e592'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('6615b736-24dd-4e02-923f-065102e9e592');
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
                    id: 'c3d069d1-4dd2-4133-ae7c-7ef78bbc539d'
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
                    id: '6615b736-24dd-4e02-923f-065102e9e592'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('6615b736-24dd-4e02-923f-065102e9e592');
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
                        
                        id: '9649fa13-e403-4f2a-94b7-011da8e0926b',
                        accessTokenId: 'fcdd9623-8642-49cd-a1f5-b52c67dd7738',
                        token: 'Rerum ullam rerum dignissimos. Dolore beatae aut id veniam culpa qui iste voluptas. Qui enim voluptatem. Modi quis eum id non et repudiandae voluptatem ea necessitatibus.',
                        isRevoked: true,
                        expiresAt: '2021-04-18 18:31:10',
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
                        
                        id: '6615b736-24dd-4e02-923f-065102e9e592',
                        accessTokenId: '1111096a-50ca-47a1-ba30-055acf9523e4',
                        token: 'Iste sequi suscipit sit soluta corporis enim. Et et libero blanditiis aut. Voluptatem et repellendus labore qui voluptatem soluta aliquam enim dolor.',
                        isRevoked: false,
                        expiresAt: '2021-04-18 08:12:12',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('6615b736-24dd-4e02-923f-065102e9e592');
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
                    id: 'd9d4a93b-4626-47f1-a407-63760aba6660'
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
                    id: '6615b736-24dd-4e02-923f-065102e9e592'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('6615b736-24dd-4e02-923f-065102e9e592');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});