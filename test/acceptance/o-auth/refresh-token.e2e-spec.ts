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
                accessTokenId: 'aed3278c-3f94-40d3-b8e1-fce5778307b1',
                token: 'Quas sed et nostrum dolor. Possimus molestiae dolorem. Voluptas consequuntur quae qui et. Nobis doloribus minus ut.',
                isRevoked: true,
                expiresAt: 5395290088,
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
                
                accessTokenId: 'aed3278c-3f94-40d3-b8e1-fce5778307b1',
                token: 'Dolorem esse voluptas aspernatur quis magnam qui non voluptatem reprehenderit. Incidunt quis omnis quae suscipit architecto officia corporis error ut. Eos molestiae non. Reiciendis illo est aliquam doloribus optio et. Cumque dolores libero nihil error rerum optio voluptas perspiciatis eum.',
                isRevoked: false,
                expiresAt: 2670664738,
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
                id: 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d',
                accessTokenId: null,
                token: 'Amet vel et maiores. Nulla impedit possimus dolores possimus. Laudantium laboriosam voluptatem.',
                isRevoked: false,
                expiresAt: 4820035598,
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
                id: 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d',
                
                token: 'Aperiam deleniti autem quasi quo sunt autem dignissimos ut. Saepe asperiores ea quas modi eum dolorem totam. Ut pariatur quod qui quibusdam quibusdam aut deserunt quis nihil. Rerum commodi exercitationem ad cum ut eos eum. Velit sunt voluptatibus ut quo eum. Temporibus cupiditate rerum eaque quo quis.',
                isRevoked: false,
                expiresAt: 6566024516,
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
                id: 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d',
                accessTokenId: 'aed3278c-3f94-40d3-b8e1-fce5778307b1',
                token: null,
                isRevoked: false,
                expiresAt: 1650789605,
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
                id: 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d',
                accessTokenId: 'aed3278c-3f94-40d3-b8e1-fce5778307b1',
                
                isRevoked: true,
                expiresAt: 7797294107,
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
                id: 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d',
                accessTokenId: 'aed3278c-3f94-40d3-b8e1-fce5778307b1',
                token: 'Ipsum minus doloremque dignissimos quis ab commodi voluptatem. Beatae quaerat sapiente voluptas sed. Et dolore consequatur eum dolores ipsam quidem ipsa voluptatum. Est quia voluptate odit et numquam vel soluta ut facilis.',
                isRevoked: null,
                expiresAt: 5837723752,
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
                id: 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d',
                accessTokenId: 'aed3278c-3f94-40d3-b8e1-fce5778307b1',
                token: 'Et maxime tempore debitis. Cupiditate blanditiis voluptatem. Facilis sunt voluptates eos. Maiores officiis aut ipsa totam quia consequatur vero mollitia. Blanditiis perferendis nobis vel maxime necessitatibus.',
                
                expiresAt: 1110185464,
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
                id: '7eyxjuqf582fw3s5weag48jli70rx741xxn6s',
                accessTokenId: 'aed3278c-3f94-40d3-b8e1-fce5778307b1',
                token: 'Velit et earum voluptas vel et odit aut est. Atque iusto eveniet non commodi. Iusto similique amet recusandae iusto. Nulla hic in vero et qui eum optio. Vel sit odio. Tempora quia architecto ducimus repellendus.',
                isRevoked: false,
                expiresAt: 3107727793,
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
                id: 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d',
                accessTokenId: 'minonxrt0m0fmtyfz923i6yqtmrvunc1alwn0',
                token: 'Et adipisci aliquid incidunt velit mollitia placeat. Voluptatem facere omnis repudiandae aut voluptates eius beatae aliquid quia. Ad excepturi nostrum quibusdam in est architecto tempora. Eius repellendus natus non numquam animi consectetur at. Excepturi ducimus voluptas deserunt sunt consequatur dolorum nemo.',
                isRevoked: false,
                expiresAt: 5684726675,
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
                id: 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d',
                accessTokenId: 'aed3278c-3f94-40d3-b8e1-fce5778307b1',
                token: 'Magni provident est porro voluptatem necessitatibus et ut. Exercitationem eaque porro quos. Minus nihil dolor sequi recusandae voluptatem doloribus voluptatem.',
                isRevoked: true,
                expiresAt: 12968032867,
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
                id: 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d',
                accessTokenId: 'aed3278c-3f94-40d3-b8e1-fce5778307b1',
                token: 'Et fuga quisquam mollitia aperiam aut pariatur quas qui. Repellendus et modi omnis. Dolorum cum optio ducimus ullam rem atque. Numquam aut unde quaerat asperiores odit labore. Sed ut dolores quae quo. Tempora quia est quas ut excepturi sint.',
                isRevoked: false,
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
                id: 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d',
                accessTokenId: 'aed3278c-3f94-40d3-b8e1-fce5778307b1',
                token: 'Enim earum dicta aut quia. Voluptatibus laudantium dolor tenetur est velit dolores. Necessitatibus repellat laboriosam perferendis accusantium. Ratione dicta autem omnis veritatis quo molestiae animi non quasi.',
                isRevoked: 'true',
                expiresAt: 3059553200,
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
                id: 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d',
                accessTokenId: 'aed3278c-3f94-40d3-b8e1-fce5778307b1',
                token: 'Eius quod dolor autem. At cum perferendis quidem. Provident eum sed aut. Nam est perferendis earum quisquam ut iusto exercitationem. Dolorum accusamus voluptas consectetur aliquid voluptas aspernatur et.',
                isRevoked: true,
                expiresAt: 9124042930,
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
                        id: '9fe37430-af08-4cc4-9503-10b436301f56'
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
                        id: 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/75e3345d-9118-4117-9af0-91fda440d462')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/f06461d0-8c2f-47cd-8717-b9b2d4ebd94d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d'));
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
                
                id: '6f0f6d2f-7333-4c0c-a279-2ba7c7d15057',
                accessTokenId: '3c54619d-04ab-4e6d-a575-fc19f22fba1a',
                token: 'Deserunt consequatur nam blanditiis fugiat quis cupiditate expedita minus. Ut nulla sint porro et sunt reprehenderit cum libero. Non iusto nisi natus nam quis consectetur. Reiciendis porro sunt recusandae autem. Quos omnis voluptas consectetur quia nesciunt temporibus. Recusandae qui voluptatem ea et quasi excepturi.',
                isRevoked: false,
                expiresAt: 4836670066,
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d',
                accessTokenId: 'aed3278c-3f94-40d3-b8e1-fce5778307b1',
                token: 'Natus quia nihil. Voluptas blanditiis suscipit non sit beatae. Qui quis perferendis sunt enim. Id voluptatum quo dolor distinctio et aperiam perspiciatis nam autem. Voluptate non facere. Quis velit veniam voluptatibus et voluptatum aut harum minima voluptas.',
                isRevoked: false,
                expiresAt: 7174591221,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/237afd17-3243-425a-b437-11b21bd1cc97')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/f06461d0-8c2f-47cd-8717-b9b2d4ebd94d')
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
                        id: 'd14e1540-e5f9-4eab-bb28-7a70cc58ea4e',
                        accessTokenId: 'aed3278c-3f94-40d3-b8e1-fce5778307b1',
                        token: 'Nihil quis quibusdam et qui. Dignissimos qui minima. Aspernatur dolorem unde qui adipisci aliquam dolores dolorem consequuntur. Placeat ullam aut dolorem velit sunt non consequatur. Dolorem consequatur in delectus amet deserunt. Fugit omnis exercitationem ut vero ipsa.',
                        isRevoked: false,
                        expiresAt: 5602606566,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', 'd14e1540-e5f9-4eab-bb28-7a70cc58ea4e');
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
                            id: '86774a4a-9cd0-4e18-907f-cb3efca56449'
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
                            id: 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('f06461d0-8c2f-47cd-8717-b9b2d4ebd94d');
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
                    id: '9090cfed-3465-4529-896c-af5baf938f74'
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
                    id: 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('f06461d0-8c2f-47cd-8717-b9b2d4ebd94d');
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
                        
                        id: 'bd70c9a7-d866-47f6-a2c5-09e52fe1ed31',
                        accessTokenId: '8058fe4c-637c-4308-97b1-932e9bd3feac',
                        token: 'In repudiandae est dicta quos quia minus maxime. Omnis quasi libero corrupti quae. Velit nam officia possimus reprehenderit dolorum sint quod. Sint voluptate repudiandae est in alias ex omnis consequatur.',
                        isRevoked: false,
                        expiresAt: 8649641824,
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
                        
                        id: 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d',
                        accessTokenId: 'aed3278c-3f94-40d3-b8e1-fce5778307b1',
                        token: 'Et qui ipsa. Sint doloribus et sit repellat ut sunt odio reiciendis ea. Est cum ducimus. Qui veritatis iusto magnam. Officiis sed eaque aliquid iste rerum corporis ab dolorem quia.',
                        isRevoked: false,
                        expiresAt: 5237161906,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('f06461d0-8c2f-47cd-8717-b9b2d4ebd94d');
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
                    id: 'a6891ddd-a05d-4249-97c3-44c0c47a5b35'
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
                    id: 'f06461d0-8c2f-47cd-8717-b9b2d4ebd94d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('f06461d0-8c2f-47cd-8717-b9b2d4ebd94d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});