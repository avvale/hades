import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ISessionRepository } from '@hades/nfc/session/domain/session.repository';
import { MockSessionRepository } from '@hades/nfc/session/infrastructure/mock/mock-session.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { NfcModule } from './../../../src/apps/nfc/nfc.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('session', () => 
{
    let app: INestApplication;
    let repository: MockSessionRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    NfcModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(ISessionRepository)
            .useClass(MockSessionRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockSessionRepository>module.get<ISessionRepository>(ISessionRepository);

        await app.init();
    });

    test(`/REST:POST nfc/session - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST nfc/session - Got 400 Conflict, SessionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: null,
                ip: '8xtl1i6krkvr7bu',
                tagId: 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd',
                uid: 'sorn31qgdykhxqhse284r0463oe9bqmlntmlrp5boxyz8iu32khjhl8sxtqtbd52',
                counter: 363432,
                expiredAt: '2020-07-29 05:58:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionId must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/session - Got 400 Conflict, SessionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                
                ip: 'vtcrum8fpmsof53',
                tagId: 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd',
                uid: '4vbwn656iq6j2y31hnajvdvni6t6pa0fu24ck0qn323eqyvtojp2zffg89a04iqg',
                counter: 515493,
                expiredAt: '2020-07-28 23:59:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/session - Got 400 Conflict, SessionIp property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0',
                ip: null,
                tagId: 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd',
                uid: '7k8fbh6utvngbm2h83o20wu35n0grogabjo53iqol5mzlk2o0z55flhoot16yqo7',
                counter: 156847,
                expiredAt: '2020-07-29 05:09:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionIp must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/session - Got 400 Conflict, SessionIp property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0',
                
                tagId: 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd',
                uid: '9gx48btg1vkg2fb5ziktp67h8x3pl4wzxvrk7tt4c0oit218v64hd43yjxyp4i41',
                counter: 690513,
                expiredAt: '2020-07-29 13:24:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionIp must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/session - Got 400 Conflict, SessionTagId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0',
                ip: 'rvau7lx1th1ktx1',
                tagId: null,
                uid: '2nx2abm4028ka2gdf3ui8qfwwr6utuotrjlnt66yayjsxf99s69lacptxphaopsa',
                counter: 617908,
                expiredAt: '2020-07-28 15:30:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionTagId must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/session - Got 400 Conflict, SessionTagId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0',
                ip: 'r45b9gc2o7dm0ga',
                
                uid: '11e1um6q3e46aos00gp5ho4xmr6iuaaeh84jf501yk64q07xgusb93fw8qjrq6v1',
                counter: 543684,
                expiredAt: '2020-07-28 17:03:21',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionTagId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/session - Got 400 Conflict, SessionUid property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0',
                ip: 'pfxrzxvt2kowc15',
                tagId: 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd',
                uid: null,
                counter: 318760,
                expiredAt: '2020-07-29 02:50:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionUid must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/session - Got 400 Conflict, SessionUid property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0',
                ip: 'i81deggf00v44uq',
                tagId: 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd',
                
                counter: 438759,
                expiredAt: '2020-07-28 18:05:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionUid must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/session - Got 400 Conflict, SessionCounter property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0',
                ip: 'siaxaqyyt0kxnlo',
                tagId: 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd',
                uid: 'l2f110ettdhb5hgghpt6dtrv6jyvg7p8o7v8c3duwqljkicto19oabf4kkpbz33j',
                counter: null,
                expiredAt: '2020-07-29 01:39:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionCounter must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/session - Got 400 Conflict, SessionCounter property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0',
                ip: 'tvwylryuh9vncen',
                tagId: 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd',
                uid: 'quzrh623uzb96xpw2v06zss7qlkwcjuvbimcnba1yyxnf9s1bu7ht8omjybn9lfy',
                
                expiredAt: '2020-07-29 01:55:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionCounter must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST nfc/session - Got 400 Conflict, SessionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: 'qi5ascg0a991f0ktr1yfyy5dtd77lbd98teuj',
                ip: 'bu419ca5z9podox',
                tagId: 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd',
                uid: 'w0rv9r1hmtqtswq4t33x7inf61b7pehnxu6epco5fvpis91l6xa99ek23f85vlx0',
                counter: 130019,
                expiredAt: '2020-07-28 21:26:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST nfc/session - Got 400 Conflict, SessionIp is not allowed, must be a length of 15`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0',
                ip: 'bnyfthgsvluj79j1',
                tagId: 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd',
                uid: '13zviptbm29qqgl7orx8x704x2ahm32zxi4d1bqa0ujclvlf3551vtdxyo06m2sv',
                counter: 663783,
                expiredAt: '2020-07-28 20:14:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionIp is not allowed, must be a length of 15');
            });
    });
    
    test(`/REST:POST nfc/session - Got 400 Conflict, SessionTagId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0',
                ip: '8t8ghy3yli9o3e0',
                tagId: 'zmcr8l0ovl5qe81f96g1qtelwltiwp9jja8dg',
                uid: '1nk9a3yhldk2mjc12fjcxo1whfkmbrzl004suc688wablxbqzztw06zfkykv5ck1',
                counter: 899958,
                expiredAt: '2020-07-29 00:08:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionTagId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST nfc/session - Got 400 Conflict, SessionUid is too large, has a maximum length of 64`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0',
                ip: 'ak2y653kep83gk8',
                tagId: 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd',
                uid: 'ur89myahfe3utwzm280qyxtaav4hr84kunocs37odffb9cgnuouvaxiduh990bnri',
                counter: 498852,
                expiredAt: '2020-07-28 19:21:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionUid is too large, has a maximum length of 64');
            });
    });
    
    test(`/REST:POST nfc/session - Got 400 Conflict, SessionCounter is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0',
                ip: 'o9f5xtfoz6fc631',
                tagId: 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd',
                uid: 'cusjk2csdakv8szlf50npb2tls8n20p7ihhv1dfhxvne1zp1qc00euei4khh57j3',
                counter: 7006669,
                expiredAt: '2020-07-28 21:59:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionCounter is too large, has a maximum length of 6');
            });
    });
    

    

    
    
    

    

    

    
    test(`/REST:POST nfc/session - Got 400 Conflict, SessionExpiredAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0',
                ip: 'chpaqiw6fkjbi4u',
                tagId: 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd',
                uid: 's52s6ms5pmn1uv2pj7lons23ldy675kwb9x6akpby9n3gtxhwlqt1vrus24j9dgq',
                counter: 309154,
                expiredAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionExpiredAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST nfc/session`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0',
                ip: 'rk6mkdew237jimd',
                tagId: 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd',
                uid: 'vsicddv0gzhfj6ig831r9ykw4si5oe51r5p7xpgs1hsjssv06qrirleohxf23ht9',
                counter: 371749,
                expiredAt: '2020-07-29 04:31:26',
            })
            .expect(201);
    });

    test(`/REST:GET nfc/sessions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/sessions/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    test(`/REST:GET nfc/session - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET nfc/session`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '8c6289c8-867f-4118-94f2-c6fc1fcc12e0'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '8c6289c8-867f-4118-94f2-c6fc1fcc12e0'));
    });

    test(`/REST:GET nfc/session/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/session/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET nfc/session/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/session/8c6289c8-867f-4118-94f2-c6fc1fcc12e0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8c6289c8-867f-4118-94f2-c6fc1fcc12e0'));
    });

    test(`/REST:GET nfc/sessions`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/sessions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT nfc/session - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                
                id: '1d6a11b1-e2f6-4e9b-9da1-d4ba4d2a91e7',
                ip: '7ctb406dydksfvv',
                tagId: '4fea738e-1793-4612-a7bc-227cad6e39be',
                uid: '7fk874fm2wf11z0vu0c53mcph6y445j8dcedp81ns2fmlbnvwqcztgd92gil2qbt',
                counter: 598688,
                expiredAt: '2020-07-29 10:10:15',
            })
            .expect(404);
    });

    test(`/REST:PUT nfc/session`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                
                id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0',
                ip: 'm8kthd2x6io3x9n',
                tagId: 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd',
                uid: '6ny2gk7w34qyluqowk4syo11z5irk6i6tby9ps2dz1excqo1agr4a5bg2mgvtesv',
                counter: 415293,
                expiredAt: '2020-07-29 01:55:52',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8c6289c8-867f-4118-94f2-c6fc1fcc12e0'));
    });

    test(`/REST:DELETE nfc/session/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/session/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE nfc/session/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/session/8c6289c8-867f-4118-94f2-c6fc1fcc12e0')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL nfcCreateSession - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcCreateSessionInput!)
                    {
                        nfcCreateSession (payload:$payload)
                        {   
                            id
                            ip
                            tagId
                            uid
                            counter
                            expiredAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
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

    test(`/GraphQL nfcCreateSession`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcCreateSessionInput!)
                    {
                        nfcCreateSession (payload:$payload)
                        {   
                            id
                            ip
                            tagId
                            uid
                            counter
                            expiredAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '156df821-ee6d-4ab3-9595-078e179ce245',
                        ip: 'ikdfidkvjeheqm3',
                        tagId: 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd',
                        uid: 'd48f7u52vndxppgo8ytw6k6nj0fz2r62xhmof90d997di1oyb9zauzo8adkjj4uv',
                        counter: 764583,
                        expiredAt: '2020-07-28 21:09:36',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcCreateSession).toHaveProperty('id', '156df821-ee6d-4ab3-9595-078e179ce245');
            });
    });

    test(`/GraphQL nfcPaginateSessions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        nfcPaginateSessions (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcPaginateSessions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.nfcPaginateSessions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.nfcPaginateSessions.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL nfcFindSession - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcFindSession (query:$query)
                        {   
                            id
                            ip
                            tagId
                            uid
                            counter
                            expiredAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '00000000-0000-0000-0000-000000000000'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL nfcFindSession`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcFindSession (query:$query)
                        {   
                            id
                            ip
                            tagId
                            uid
                            counter
                            expiredAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '8c6289c8-867f-4118-94f2-c6fc1fcc12e0'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindSession.id).toStrictEqual('8c6289c8-867f-4118-94f2-c6fc1fcc12e0');
            });
    });

    test(`/GraphQL nfcFindSessionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        nfcFindSessionById (id:$id)
                        {   
                            id
                            ip
                            tagId
                            uid
                            counter
                            expiredAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL nfcFindSessionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        nfcFindSessionById (id:$id)
                        {   
                            id
                            ip
                            tagId
                            uid
                            counter
                            expiredAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindSessionById.id).toStrictEqual('8c6289c8-867f-4118-94f2-c6fc1fcc12e0');
            });
    });

    test(`/GraphQL nfcGetSessions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcGetSessions (query:$query)
                        {   
                            id
                            ip
                            tagId
                            uid
                            counter
                            expiredAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.nfcGetSessions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL nfcUpdateSession - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcUpdateSessionInput!)
                    {
                        nfcUpdateSession (payload:$payload)
                        {   
                            id
                            ip
                            tagId
                            uid
                            counter
                            expiredAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '0590c33a-aa71-4e99-95b6-5bd07c56095b',
                        ip: '9yoyu69hs8fvld4',
                        tagId: '697e6b25-b760-4d4c-9a98-2248cd5697ad',
                        uid: '838l4e4wo46hhtc103ltx2bh1w8ixj9g70h7mhzf4fo3mkk9duq15uvhf7me1w1p',
                        counter: 191363,
                        expiredAt: '2020-07-28 22:37:01',
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

    test(`/GraphQL nfcUpdateSession`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcUpdateSessionInput!)
                    {
                        nfcUpdateSession (payload:$payload)
                        {   
                            id
                            ip
                            tagId
                            uid
                            counter
                            expiredAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0',
                        ip: 'n4pi1cizdxkjq5t',
                        tagId: 'e7600155-7e11-4dcc-bccf-52b0d13b9ccd',
                        uid: 'cydtj6fahluuug4eavv23o6qh4k87gpgalge6ii9uvpowbo936h2h9icuhteobdq',
                        counter: 925387,
                        expiredAt: '2020-07-28 18:21:36',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcUpdateSession.id).toStrictEqual('8c6289c8-867f-4118-94f2-c6fc1fcc12e0');
            });
    });

    test(`/GraphQL nfcDeleteSessionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        nfcDeleteSessionById (id:$id)
                        {   
                            id
                            ip
                            tagId
                            uid
                            counter
                            expiredAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL nfcDeleteSessionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        nfcDeleteSessionById (id:$id)
                        {   
                            id
                            ip
                            tagId
                            uid
                            counter
                            expiredAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8c6289c8-867f-4118-94f2-c6fc1fcc12e0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcDeleteSessionById.id).toStrictEqual('8c6289c8-867f-4118-94f2-c6fc1fcc12e0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});