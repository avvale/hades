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
                accessTokenId: '3c444d6b-1e50-44c3-a691-1b98c728aec2',
                token: 'Explicabo enim aut illum perferendis quis debitis voluptas molestias earum. Sed similique ut quaerat quia temporibus enim nostrum. Accusamus delectus et veniam odio quia expedita. Quaerat aut vitae nihil sunt modi non enim veritatis. Illum suscipit hic labore facilis.',
                isRevoked: true,
                expiresAt: 6068436226,
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
                
                accessTokenId: '3c444d6b-1e50-44c3-a691-1b98c728aec2',
                token: 'Totam exercitationem unde est veniam cum voluptatibus velit. Est delectus est recusandae amet est molestias rerum ipsum. Voluptatem ut omnis aperiam aliquam maiores exercitationem exercitationem laboriosam. Et libero numquam quo dolores minima. Molestiae officia officia vel eaque.',
                isRevoked: true,
                expiresAt: 2225171320,
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
                id: 'f7c89e63-d17f-4ecd-a624-5631fafb66cf',
                accessTokenId: null,
                token: 'Vitae accusantium autem autem nisi dignissimos aut. Sequi ut consequatur at eum unde aspernatur omnis illum. Dolor tenetur modi voluptatum possimus aut. Accusamus est voluptatem enim est vel.',
                isRevoked: true,
                expiresAt: 8362685621,
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
                id: 'f7c89e63-d17f-4ecd-a624-5631fafb66cf',
                
                token: 'Necessitatibus fuga repellat neque voluptates. Nemo sit velit sed eligendi hic libero et. Perspiciatis quo non qui dolorem est fugiat in deleniti dolorem. Perspiciatis optio tempore nesciunt omnis. Tempora facilis fugiat et architecto odio sit provident.',
                isRevoked: false,
                expiresAt: 3591793601,
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
                id: 'f7c89e63-d17f-4ecd-a624-5631fafb66cf',
                accessTokenId: '3c444d6b-1e50-44c3-a691-1b98c728aec2',
                token: null,
                isRevoked: true,
                expiresAt: 8811320363,
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
                id: 'f7c89e63-d17f-4ecd-a624-5631fafb66cf',
                accessTokenId: '3c444d6b-1e50-44c3-a691-1b98c728aec2',
                
                isRevoked: true,
                expiresAt: 8930792588,
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
                id: 'f7c89e63-d17f-4ecd-a624-5631fafb66cf',
                accessTokenId: '3c444d6b-1e50-44c3-a691-1b98c728aec2',
                token: 'Occaecati impedit animi. Eos nostrum distinctio officiis. Quia culpa assumenda fugit omnis dolorem et rerum eum blanditiis.',
                isRevoked: null,
                expiresAt: 2936004555,
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
                id: 'f7c89e63-d17f-4ecd-a624-5631fafb66cf',
                accessTokenId: '3c444d6b-1e50-44c3-a691-1b98c728aec2',
                token: 'Ea pariatur hic ut ratione quo magni voluptatum ea. Magnam sed laudantium velit dolorem et vero facere expedita. Debitis beatae qui rerum. Reiciendis et veniam fugiat commodi et omnis enim reiciendis enim.',
                
                expiresAt: 2972078012,
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
                id: 'lhtitcjib4ej7dmg42voganjs2ete5pe5ojqr',
                accessTokenId: '3c444d6b-1e50-44c3-a691-1b98c728aec2',
                token: 'Atque non animi accusamus minus ullam asperiores. Fugit consectetur dolorum. Debitis illo nobis sit et non dolores tenetur dicta eius. Quia mollitia aut ipsum quia praesentium. Perferendis eius ut est. Accusantium aspernatur cupiditate esse voluptatem voluptate sunt et quod.',
                isRevoked: true,
                expiresAt: 7565416501,
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
                id: 'f7c89e63-d17f-4ecd-a624-5631fafb66cf',
                accessTokenId: 'cd3rupprl26x5za4768kaq8pnfuoyhrhgoyf9',
                token: 'Id neque dolores sint accusamus. Numquam voluptate qui maxime praesentium perspiciatis deserunt exercitationem blanditiis. Eveniet in laboriosam.',
                isRevoked: false,
                expiresAt: 8526371118,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenAccessTokenId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenExpiresAt is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: 'f7c89e63-d17f-4ecd-a624-5631fafb66cf',
                accessTokenId: '3c444d6b-1e50-44c3-a691-1b98c728aec2',
                token: 'Amet nisi ut debitis molestiae quis error sed. Sed et enim unde eius voluptas quaerat. Quia dolorem laboriosam accusamus dolor nihil ut ea dolor.',
                isRevoked: false,
                expiresAt: 13458090505,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenExpiresAt is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenExpiresAt must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: 'f7c89e63-d17f-4ecd-a624-5631fafb66cf',
                accessTokenId: '3c444d6b-1e50-44c3-a691-1b98c728aec2',
                token: 'Ut inventore veniam incidunt esse ut possimus libero vitae qui. Officia reprehenderit maxime sequi voluptatibus nihil quia laboriosam qui. Natus illum nihil voluptate ea est nesciunt alias sed. Fugiat non delectus unde fuga amet.',
                isRevoked: true,
                expiresAt: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for RefreshTokenExpiresAt must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST o-auth/refresh-token - Got 400 Conflict, RefreshTokenIsRevoked has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: 'f7c89e63-d17f-4ecd-a624-5631fafb66cf',
                accessTokenId: '3c444d6b-1e50-44c3-a691-1b98c728aec2',
                token: 'Pariatur consequatur id laudantium. Ut ut dolores sit soluta. Sed quidem reiciendis sed consequuntur impedit voluptas nisi. Aliquid culpa ex. Architecto autem omnis esse animi vero perferendis ut iusto in.',
                isRevoked: 'true',
                expiresAt: 7534305762,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RefreshTokenIsRevoked has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                id: 'f7c89e63-d17f-4ecd-a624-5631fafb66cf',
                accessTokenId: '3c444d6b-1e50-44c3-a691-1b98c728aec2',
                token: 'Nihil officiis sit aliquam. Facere dolorem veniam voluptatem et non ut voluptate culpa omnis. Et sed rerum iste qui et qui animi facilis.',
                isRevoked: true,
                expiresAt: 8870586625,
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
                        id: '0dabb08c-3ab0-4fcb-8809-e3d6d87f5a7c'
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
                        id: 'f7c89e63-d17f-4ecd-a624-5631fafb66cf'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f7c89e63-d17f-4ecd-a624-5631fafb66cf'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/d2f6016e-4223-43a1-acbf-15b16bc2a1b6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/f7c89e63-d17f-4ecd-a624-5631fafb66cf')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f7c89e63-d17f-4ecd-a624-5631fafb66cf'));
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
                
                id: '89731507-589d-4524-9333-39f4b39412e0',
                accessTokenId: '375d8f29-8718-4014-95ff-ecc5a3b6178c',
                token: 'Magni non quibusdam omnis at nemo aspernatur. Excepturi praesentium ut. Aperiam itaque id est nostrum. Vel deserunt quibusdam inventore inventore at et ex veritatis. Neque suscipit tempore dolorem commodi illum.',
                isRevoked: true,
                expiresAt: 3300325916,
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f7c89e63-d17f-4ecd-a624-5631fafb66cf',
                accessTokenId: '3c444d6b-1e50-44c3-a691-1b98c728aec2',
                token: 'Explicabo doloremque voluptatem voluptas vel dolorem eos sit consequatur quisquam. Voluptatem a quo dolorem illum facilis possimus odit nostrum quaerat. Natus ut maiores nam qui nobis porro quasi accusamus sunt. Quo magnam et consequuntur.',
                isRevoked: true,
                expiresAt: 8915148912,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f7c89e63-d17f-4ecd-a624-5631fafb66cf'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/7059ed82-7b9c-4358-8fd0-ad1a6f095627')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/f7c89e63-d17f-4ecd-a624-5631fafb66cf')
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
                        id: '2c111357-00f7-40a3-a971-833e218ee6a0',
                        accessTokenId: '3c444d6b-1e50-44c3-a691-1b98c728aec2',
                        token: 'In officia voluptas odit sint nostrum quas placeat. Quo quae quis nemo cupiditate voluptatem officiis. Nihil nihil distinctio expedita quod.',
                        isRevoked: true,
                        expiresAt: 3427292829,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', '2c111357-00f7-40a3-a971-833e218ee6a0');
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
                            id: '3c44aa37-d788-4ea1-aa98-f3ee47af5cd4'
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
                            id: 'f7c89e63-d17f-4ecd-a624-5631fafb66cf'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('f7c89e63-d17f-4ecd-a624-5631fafb66cf');
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
                    id: '3725bf5d-6617-4ef5-ae8b-6d0812bb459b'
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
                    id: 'f7c89e63-d17f-4ecd-a624-5631fafb66cf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('f7c89e63-d17f-4ecd-a624-5631fafb66cf');
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
                        
                        id: 'bedc99ce-aa19-4ee7-8e3a-6891979c3ee9',
                        accessTokenId: '6b30cb5d-76c3-41d2-947b-c14cf6be5799',
                        token: 'Corrupti nam nobis quidem nihil animi. Provident illum adipisci sequi repellendus tenetur aut fuga modi. Voluptatum qui temporibus minima voluptas assumenda qui laborum temporibus. Nihil et non voluptatem minima voluptatum dolores. Vel nihil nihil incidunt nihil suscipit. Consequatur ratione quidem ex necessitatibus quia accusantium ipsa amet.',
                        isRevoked: true,
                        expiresAt: 1786637887,
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
                        
                        id: 'f7c89e63-d17f-4ecd-a624-5631fafb66cf',
                        accessTokenId: '3c444d6b-1e50-44c3-a691-1b98c728aec2',
                        token: 'Dicta quos repellat tempore nam sed quo laborum autem laboriosam. Est animi inventore cupiditate. Deserunt aperiam voluptates necessitatibus magnam ipsa aut rerum id.',
                        isRevoked: true,
                        expiresAt: 9244360272,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('f7c89e63-d17f-4ecd-a624-5631fafb66cf');
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
                    id: '8b9fe066-79e5-41e0-a1f4-2217a83f79d7'
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
                    id: 'f7c89e63-d17f-4ecd-a624-5631fafb66cf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('f7c89e63-d17f-4ecd-a624-5631fafb66cf');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});