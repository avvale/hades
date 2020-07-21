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
                ip: 'fkcqq351ccw58cy',
                tagId: '8ae89090-39be-4439-8f58-e523b2ff12f4',
                uid: 'gpyjq89k9fkt5wymnwnnjozwdk064vx1x7861nomnmy4esyrhot2rh6sdmd799ys',
                counter: 478922,
                expiredAt: '2020-07-21 11:50:39',
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
                
                ip: '0nbmn5bdwuefbdv',
                tagId: '8ae89090-39be-4439-8f58-e523b2ff12f4',
                uid: 'eb48bm00pr3x9tv0jb0qvjsnzehg0f60iq23sg4ngsnxex30xhptnge7kl6wkn6z',
                counter: 363533,
                expiredAt: '2020-07-21 09:27:29',
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
                id: 'ab63d4ac-a941-4caa-ad47-78a315327f13',
                ip: null,
                tagId: '8ae89090-39be-4439-8f58-e523b2ff12f4',
                uid: 'cfd4wsrw9bmfzamyll6feycu4pmt76obginwt9i7pvjjfuifvm24c4iqjgmvn0pd',
                counter: 440092,
                expiredAt: '2020-07-21 10:12:51',
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
                id: 'ab63d4ac-a941-4caa-ad47-78a315327f13',
                
                tagId: '8ae89090-39be-4439-8f58-e523b2ff12f4',
                uid: 'sp3y9br1ej3gl666hz54sn0v0h2c8kocqb5c6h946v4oxzb4q4lhuepthouzcab8',
                counter: 894487,
                expiredAt: '2020-07-21 12:26:41',
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
                id: 'ab63d4ac-a941-4caa-ad47-78a315327f13',
                ip: 'dv4d4ufkm12nm33',
                tagId: null,
                uid: 'u1fu4r6mxw6lg7gqnb3tc4hjvvmxv1wsiw0dyjjkmv35m8zo67z6hqx6th39x5ec',
                counter: 957068,
                expiredAt: '2020-07-21 11:01:04',
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
                id: 'ab63d4ac-a941-4caa-ad47-78a315327f13',
                ip: 'rtv6chago2fcrd2',
                
                uid: '3t6rfpzq2tfuv4vgtendi480iq34uav8d2yyply5tpdgx0b0535wa5hdtl7gztuw',
                counter: 631155,
                expiredAt: '2020-07-21 23:23:54',
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
                id: 'ab63d4ac-a941-4caa-ad47-78a315327f13',
                ip: 'd6uglepcasoslp3',
                tagId: '8ae89090-39be-4439-8f58-e523b2ff12f4',
                uid: null,
                counter: 129207,
                expiredAt: '2020-07-21 10:36:33',
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
                id: 'ab63d4ac-a941-4caa-ad47-78a315327f13',
                ip: 'z786ibo1ubflb3y',
                tagId: '8ae89090-39be-4439-8f58-e523b2ff12f4',
                
                counter: 896899,
                expiredAt: '2020-07-21 03:02:31',
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
                id: 'ab63d4ac-a941-4caa-ad47-78a315327f13',
                ip: 'xt4w4uig7xxwlfl',
                tagId: '8ae89090-39be-4439-8f58-e523b2ff12f4',
                uid: 'tnjxt5edtp5ip3ix523aj94rcrj1oc2mct1u44867blps7awsfwh7fy3xbl5597h',
                counter: null,
                expiredAt: '2020-07-21 16:47:38',
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
                id: 'ab63d4ac-a941-4caa-ad47-78a315327f13',
                ip: 'zd5796ldwiftokd',
                tagId: '8ae89090-39be-4439-8f58-e523b2ff12f4',
                uid: 'oqckeros84ugs278he1xm0trxmt8grdvuhymedh4jmbm9ps5g3qztx2bkeyc6hxe',
                
                expiredAt: '2020-07-21 23:52:19',
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
                id: 'p8y65uys9lk1ttg5nzf11gbyfcb11db384ycj',
                ip: 'mbbcb1ff02k9wvy',
                tagId: '8ae89090-39be-4439-8f58-e523b2ff12f4',
                uid: 'ycsnkuovw9vyh6l2c1rkmm7y8ujyndyvzta5eakmp9bgk3oukvkjiqd4ngmiuxon',
                counter: 820947,
                expiredAt: '2020-07-21 20:19:56',
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
                id: 'ab63d4ac-a941-4caa-ad47-78a315327f13',
                ip: 'm4ez3ocqu3l7h7u7',
                tagId: '8ae89090-39be-4439-8f58-e523b2ff12f4',
                uid: 'ik7vbkym1zcdtb5icyjax364h0617mv05avnenbxvg6fe1muvjvp4f45wmpg1xz7',
                counter: 345051,
                expiredAt: '2020-07-21 15:50:57',
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
                id: 'ab63d4ac-a941-4caa-ad47-78a315327f13',
                ip: '8wu9n5c5pnx3h6k',
                tagId: '5iinjjys3h3l1d76iocyyevsx12zzzej4wsmi',
                uid: 'r2wecvm88gc6ons6iahmorhctqgu7i56wsgjg4zi2oboihfeykqtvrzr0nsr8m1u',
                counter: 733164,
                expiredAt: '2020-07-21 02:59:34',
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
                id: 'ab63d4ac-a941-4caa-ad47-78a315327f13',
                ip: 'p5kkoglpn4l7bhc',
                tagId: '8ae89090-39be-4439-8f58-e523b2ff12f4',
                uid: 'desox03thx341w1vf2th4ddq7m12vym6s6ems2s9xp4d9xvvr3q9v3hajeu5fo3w5',
                counter: 306166,
                expiredAt: '2020-07-21 06:24:39',
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
                id: 'ab63d4ac-a941-4caa-ad47-78a315327f13',
                ip: 'f7822dgm25crevi',
                tagId: '8ae89090-39be-4439-8f58-e523b2ff12f4',
                uid: 'ujjd6w43eul7s1gjw3ym2t0d5fnw3o6q3qiwvcivmsxogbf5fvlydkzc4ogbx260',
                counter: 3981225,
                expiredAt: '2020-07-21 21:04:13',
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
                id: 'ab63d4ac-a941-4caa-ad47-78a315327f13',
                ip: 'ay8dyite3usjb95',
                tagId: '8ae89090-39be-4439-8f58-e523b2ff12f4',
                uid: 'ws5zpghr89gwfw844tz5eoq3mi71xgcgnlgpe8xbook765mt41iv6lwcm4vnjrjx',
                counter: 136280,
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
                id: 'ab63d4ac-a941-4caa-ad47-78a315327f13',
                ip: 'ysn5ejetga4htr1',
                tagId: '8ae89090-39be-4439-8f58-e523b2ff12f4',
                uid: '5p1wb7hkrdxodn3huob76tbu49pha54kdf1k1fi9jg2l8eru7ed526erf5st66dq',
                counter: 436503,
                expiredAt: '2020-07-21 20:26:56',
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
                        value   : 'ab63d4ac-a941-4caa-ad47-78a315327f13'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ab63d4ac-a941-4caa-ad47-78a315327f13'));
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
            .get('/nfc/session/ab63d4ac-a941-4caa-ad47-78a315327f13')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ab63d4ac-a941-4caa-ad47-78a315327f13'));
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
                
                id: '76a0e15d-0f3a-4964-ab3c-083d3f3b7853',
                ip: 'bq2i0be7zbqwywb',
                tagId: 'fb4886ca-afd8-4acc-978d-bff9c58283f8',
                uid: 'bx5f7o4t7oajt2ax32b9ocbmxzl45jjsw1cdx5vnw64mouo2smgyq4x0o1q9wrcg',
                counter: 820774,
                expiredAt: '2020-07-21 22:13:12',
            })
            .expect(404);
    });

    test(`/REST:PUT nfc/session`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ab63d4ac-a941-4caa-ad47-78a315327f13',
                ip: 'x3zwqgf49yo8k6z',
                tagId: '8ae89090-39be-4439-8f58-e523b2ff12f4',
                uid: 'rn79fw8oiwbmszlow3eq66uki0tq00alrcosga2a09xqv1ixxfbghj9sksmwy6ea',
                counter: 891335,
                expiredAt: '2020-07-21 09:52:50',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ab63d4ac-a941-4caa-ad47-78a315327f13'));
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
            .delete('/nfc/session/ab63d4ac-a941-4caa-ad47-78a315327f13')
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
                        id: 'b6cf643f-102b-4219-8dcd-540abcc54963',
                        ip: 'i8blljucapfo179',
                        tagId: '8ae89090-39be-4439-8f58-e523b2ff12f4',
                        uid: 'zokzt6s3p08cf0c2x30avxetxqvg2k363m2ohfjlyvq7pp8yh35ym2d05mai764i',
                        counter: 434996,
                        expiredAt: '2020-07-21 17:45:51',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcCreateSession).toHaveProperty('id', 'b6cf643f-102b-4219-8dcd-540abcc54963');
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
                            value   : 'ab63d4ac-a941-4caa-ad47-78a315327f13'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindSession.id).toStrictEqual('ab63d4ac-a941-4caa-ad47-78a315327f13');
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
                    id: 'ab63d4ac-a941-4caa-ad47-78a315327f13'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindSessionById.id).toStrictEqual('ab63d4ac-a941-4caa-ad47-78a315327f13');
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
                        
                        id: 'adbbf5a4-192a-44be-90ba-9d371df84be0',
                        ip: 'r700ysftxh2u0bb',
                        tagId: 'f332bea1-dbb4-43dd-a326-66e4a36448bf',
                        uid: 'cnjgmu7czdksy5znhe9yrkqf1hz1z8x3og1cvb91hsmjl1z8219zk7fuq9z8t6y9',
                        counter: 202294,
                        expiredAt: '2020-07-21 05:13:33',
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
                        
                        id: 'ab63d4ac-a941-4caa-ad47-78a315327f13',
                        ip: 'zr8c8z1ap60jjtz',
                        tagId: '8ae89090-39be-4439-8f58-e523b2ff12f4',
                        uid: '8p43jajz9mwfhk0v6rr2y09qeguivldu2331y1zccj4gzxpyyrigjqjitkgg8cbw',
                        counter: 958901,
                        expiredAt: '2020-07-21 17:25:11',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcUpdateSession.id).toStrictEqual('ab63d4ac-a941-4caa-ad47-78a315327f13');
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
                    id: 'ab63d4ac-a941-4caa-ad47-78a315327f13'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcDeleteSessionById.id).toStrictEqual('ab63d4ac-a941-4caa-ad47-78a315327f13');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});