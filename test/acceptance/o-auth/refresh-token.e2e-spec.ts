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
                accessTokenId: 'b24c756f-fd4d-4ce2-b939-9921ac7293f8',
                token: 'Quaerat eos praesentium voluptatibus sunt eum eius voluptatem sint et. Ex sit animi quia qui soluta adipisci. Mollitia dolor quia maiores mollitia ducimus consequatur. Aliquid magnam quod. Et qui numquam vel quisquam quasi totam velit ratione.',
                isRevoked: true,
                expiresAt: '2020-11-04 21:12:40',
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
                
                accessTokenId: 'b24c756f-fd4d-4ce2-b939-9921ac7293f8',
                token: 'Voluptas repudiandae saepe. Consequatur exercitationem autem quia repellendus neque et. Nobis nemo dolore ut sunt hic suscipit ut tenetur eos.',
                isRevoked: false,
                expiresAt: '2020-11-05 15:48:02',
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
                id: '6ab18f41-248e-4f2f-accb-a9a082f35935',
                accessTokenId: null,
                token: 'Vero nihil et sed consequuntur. Facilis corrupti delectus molestiae reiciendis accusantium sit. Asperiores sed quod voluptatem.',
                isRevoked: true,
                expiresAt: '2020-11-05 06:25:54',
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
                id: '6ab18f41-248e-4f2f-accb-a9a082f35935',
                
                token: 'Et voluptate ut voluptatem sit qui repellendus eos. Asperiores sed voluptatum dolores temporibus et. Non architecto a ut blanditiis consectetur. Perspiciatis possimus architecto ad ducimus error excepturi sed veniam. Repellendus eligendi qui et et.',
                isRevoked: false,
                expiresAt: '2020-11-05 10:50:27',
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
                id: '6ab18f41-248e-4f2f-accb-a9a082f35935',
                accessTokenId: 'b24c756f-fd4d-4ce2-b939-9921ac7293f8',
                token: null,
                isRevoked: false,
                expiresAt: '2020-11-04 21:15:09',
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
                id: '6ab18f41-248e-4f2f-accb-a9a082f35935',
                accessTokenId: 'b24c756f-fd4d-4ce2-b939-9921ac7293f8',
                
                isRevoked: true,
                expiresAt: '2020-11-05 11:21:11',
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
                id: '6ab18f41-248e-4f2f-accb-a9a082f35935',
                accessTokenId: 'b24c756f-fd4d-4ce2-b939-9921ac7293f8',
                token: 'Qui neque neque deleniti nihil pariatur vero. Voluptate quaerat quae fuga omnis perferendis. Quidem veritatis tenetur provident ea distinctio eum est rerum voluptatem. Sed sapiente in eius aut eaque.',
                isRevoked: null,
                expiresAt: '2020-11-04 22:03:38',
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
                id: '6ab18f41-248e-4f2f-accb-a9a082f35935',
                accessTokenId: 'b24c756f-fd4d-4ce2-b939-9921ac7293f8',
                token: 'Nemo sit ratione modi deserunt autem sed quo autem. Dolore repellendus dolorem est. Velit quas omnis sunt eos maiores at omnis. Ut numquam dolor doloribus cum. Mollitia deleniti voluptatem ut.',
                
                expiresAt: '2020-11-05 06:50:15',
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
                id: 'ts9a1re00zp1vv8rwx6b7fe9acyytsqwgiqv2',
                accessTokenId: 'b24c756f-fd4d-4ce2-b939-9921ac7293f8',
                token: 'Ut nostrum et blanditiis voluptas autem fuga sint eligendi. Voluptatem nam sunt neque quibusdam incidunt. Quo reiciendis et nam reiciendis autem at. Molestiae illo recusandae. Temporibus maiores fuga cumque consequatur nihil quos eos. Recusandae aliquid rerum quia voluptatibus dolores.',
                isRevoked: true,
                expiresAt: '2020-11-04 17:22:19',
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
                id: '6ab18f41-248e-4f2f-accb-a9a082f35935',
                accessTokenId: '9m588t5rpfsqjtwrnxu5ib52r9x68arnyke3u',
                token: 'Ab qui quae. Corrupti aut sed velit vel tenetur eum molestiae. Dolores asperiores non iusto commodi earum omnis et perferendis est. Veniam officiis ex expedita molestiae officiis. Id architecto omnis fugiat sed repellendus quidem debitis voluptate. Sed natus dolorum accusantium incidunt odit commodi.',
                isRevoked: false,
                expiresAt: '2020-11-05 15:58:53',
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
                id: '6ab18f41-248e-4f2f-accb-a9a082f35935',
                accessTokenId: 'b24c756f-fd4d-4ce2-b939-9921ac7293f8',
                token: 'Deleniti inventore vero cumque nulla ea odit nihil quidem quia. Accusamus error voluptatem cumque inventore sit qui voluptas. Repellat similique temporibus rerum maiores voluptates debitis quidem. Quis ipsa libero ea recusandae blanditiis.',
                isRevoked: 'true',
                expiresAt: '2020-11-05 13:02:36',
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
                id: '6ab18f41-248e-4f2f-accb-a9a082f35935',
                accessTokenId: 'b24c756f-fd4d-4ce2-b939-9921ac7293f8',
                token: 'Id quo nobis in molestias molestiae iure possimus quia unde. Unde blanditiis autem ipsam aliquid nostrum dolorem necessitatibus dignissimos. Velit nihil necessitatibus recusandae voluptatibus aspernatur eligendi omnis. Aut itaque autem sed illum quasi sint possimus libero. Eum veritatis voluptatem dolorem animi est nulla nam et.',
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
                id: '6ab18f41-248e-4f2f-accb-a9a082f35935',
                accessTokenId: 'b24c756f-fd4d-4ce2-b939-9921ac7293f8',
                token: 'Qui rerum delectus. Nihil necessitatibus sit qui tempora est enim velit architecto velit. Est fugit ad qui est officiis. Sapiente a quae. Maiores voluptas quasi.',
                isRevoked: false,
                expiresAt: '2020-11-05 09:28:49',
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
                        id: '814fcb58-fe93-40b2-b609-02dfeab55bb2'
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
                        id: '6ab18f41-248e-4f2f-accb-a9a082f35935'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6ab18f41-248e-4f2f-accb-a9a082f35935'));
    });

    test(`/REST:GET o-auth/refresh-token/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/b63738ee-84f2-4d5d-b440-75cea518b713')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/refresh-token/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/6ab18f41-248e-4f2f-accb-a9a082f35935')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6ab18f41-248e-4f2f-accb-a9a082f35935'));
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
                
                id: '8c9a20de-03ab-41b5-a9c2-af478ae9bf48',
                accessTokenId: 'a929e9dd-6338-46d9-b648-65774705eab1',
                token: 'Vel nisi repudiandae laudantium ex. Et aut autem asperiores facilis. Veniam est qui est iure nesciunt qui.',
                isRevoked: false,
                expiresAt: '2020-11-05 16:21:47',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/refresh-token`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token')
            .set('Accept', 'application/json')
            .send({
                
                id: '6ab18f41-248e-4f2f-accb-a9a082f35935',
                accessTokenId: 'b24c756f-fd4d-4ce2-b939-9921ac7293f8',
                token: 'Quod ut nulla velit vitae quo dignissimos modi. Ipsa saepe possimus minima quia eos sit quis voluptatum. Iste praesentium qui quia atque in mollitia hic illo. Facilis corporis nisi et repellendus.',
                isRevoked: true,
                expiresAt: '2020-11-05 01:45:04',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6ab18f41-248e-4f2f-accb-a9a082f35935'));
    });

    test(`/REST:DELETE o-auth/refresh-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/7b3a99dd-f406-4c22-8c74-56b65995f557')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/refresh-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/6ab18f41-248e-4f2f-accb-a9a082f35935')
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
                        id: '6020654e-2f05-4cc5-a4e5-aab140d2e4ca',
                        accessTokenId: 'b24c756f-fd4d-4ce2-b939-9921ac7293f8',
                        token: 'Asperiores mollitia ipsam perspiciatis repudiandae sint deserunt aut officia vitae. Iste voluptate consequatur. Qui adipisci occaecati at eaque quasi similique sapiente quod impedit. Cum earum hic et rerum sunt iusto. Doloribus quia esse ad blanditiis neque facilis corporis qui dignissimos.',
                        isRevoked: false,
                        expiresAt: '2020-11-05 04:42:53',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', '6020654e-2f05-4cc5-a4e5-aab140d2e4ca');
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
                            id: 'f34e0593-6aaa-497a-9d29-7b404ee1fcd7'
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
                            id: '6ab18f41-248e-4f2f-accb-a9a082f35935'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('6ab18f41-248e-4f2f-accb-a9a082f35935');
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
                    id: '9ffeec21-f63c-4fd4-b761-6d644c983bf8'
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
                    id: '6ab18f41-248e-4f2f-accb-a9a082f35935'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('6ab18f41-248e-4f2f-accb-a9a082f35935');
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
                        
                        id: 'e7db66a8-0677-4397-9d4f-2f571701f33b',
                        accessTokenId: '26a34158-4f04-4a5e-87cf-e9c3fcb58173',
                        token: 'Sint atque laudantium veritatis nobis cumque eius tempora quia. Dolore minus reiciendis quaerat distinctio. Suscipit et dignissimos numquam perferendis.',
                        isRevoked: false,
                        expiresAt: '2020-11-05 00:27:50',
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
                        
                        id: '6ab18f41-248e-4f2f-accb-a9a082f35935',
                        accessTokenId: 'b24c756f-fd4d-4ce2-b939-9921ac7293f8',
                        token: 'Veritatis omnis dolorem corrupti dicta. Et sapiente ut dolores ratione error eos. Ut vitae tenetur. Ut tempore exercitationem rerum hic voluptates. Saepe in odio ipsa.',
                        isRevoked: true,
                        expiresAt: '2020-11-05 14:20:55',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('6ab18f41-248e-4f2f-accb-a9a082f35935');
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
                    id: 'b584ace7-e748-4a8c-b353-ddab910f68f4'
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
                    id: '6ab18f41-248e-4f2f-accb-a9a082f35935'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('6ab18f41-248e-4f2f-accb-a9a082f35935');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});