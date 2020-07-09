import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ISessionRepository } from '@hades/nfc/session/domain/session.repository';
import { MockSessionRepository } from '@hades/nfc/session/infrastructure/mock/mock-session.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { NfcModule } from './../../../src/apps/nfc/nfc.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('session', () => 
{
    let app: INestApplication;
    let repository: MockSessionRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    AdminModule,
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

    it(`/REST:POST nfc/session - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST nfc/session - Got 400 Conflict, SessionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: null,
                ip: '7cuoikrbo5wqo4t',
                tagId: 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
                uid: '5i74h2qkgo1gj6f92v6vwjttny90e6boaqs9fmx0xg504yq269w9g5ci7cn7e8iu',
                counter: 790774,
                expiredAt: '2020-07-09 00:14:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionId must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/session - Got 400 Conflict, SessionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                
                ip: '1w0av7kzndklwyl',
                tagId: 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
                uid: 'w0ph5pw0f18r7rkezmgidfqw9muwk3qyhoje6we5brp6lixd58wco1di9sm604ch',
                counter: 469127,
                expiredAt: '2020-07-08 21:18:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST nfc/session - Got 400 Conflict, SessionIp property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c',
                ip: null,
                tagId: 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
                uid: '1dy24h6ox19zm2cy0kbcvozgw4nf3npl03ub1k1scr342yadxihojjrs9uvqfgps',
                counter: 775471,
                expiredAt: '2020-07-08 22:36:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionIp must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/session - Got 400 Conflict, SessionIp property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c',
                
                tagId: 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
                uid: '3n8f7xb9jbv0cnafzi95fmo4uoydthh58unae3pf7cp9delcflnmvxjzwaqkz5gw',
                counter: 461742,
                expiredAt: '2020-07-08 23:08:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionIp must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST nfc/session - Got 400 Conflict, SessionTagId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c',
                ip: 'fjom9rc52x1mz6b',
                tagId: null,
                uid: '92wa8a8tn5bpwg7w6h1dhyuw5de3ip3tzl64v8eayyauoysvze7mx1xcdxw1r6hr',
                counter: 952457,
                expiredAt: '2020-07-09 12:44:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionTagId must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/session - Got 400 Conflict, SessionTagId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c',
                ip: '3s9e9z7ebj1sshu',
                
                uid: 'vfuyw1jole9hwop4umyjtaqw7qbfxyhqyelwtimo70o8onlkvoacfeulbdstdlpm',
                counter: 627760,
                expiredAt: '2020-07-09 11:54:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionTagId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST nfc/session - Got 400 Conflict, SessionUid property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c',
                ip: 'kg40k2mbfwnfxy0',
                tagId: 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
                uid: null,
                counter: 929427,
                expiredAt: '2020-07-09 10:10:27',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionUid must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/session - Got 400 Conflict, SessionUid property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c',
                ip: 'blx752roglbsmmj',
                tagId: 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
                
                counter: 409595,
                expiredAt: '2020-07-08 22:27:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionUid must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST nfc/session - Got 400 Conflict, SessionCounter property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c',
                ip: '17lyqmn1attdn47',
                tagId: 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
                uid: '12a8ot9jx9xne17brkdjz05obi29nbvcly74nu4uw1v1zi4p7q2rcn16cizazmow',
                counter: null,
                expiredAt: '2020-07-08 19:03:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionCounter must be defined, can not be null');
            });
    });

    it(`/REST:POST nfc/session - Got 400 Conflict, SessionCounter property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c',
                ip: 'exsc1d6nnqtvmxk',
                tagId: 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
                uid: 'jasxgrph9oypbfupph5lm8vdlpcmn6c55jt68nwhg588o2y6vndiukkgud0jmgmn',
                
                expiredAt: '2020-07-08 16:40:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionCounter must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST nfc/session - Got 400 Conflict, SessionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: 'axvh0uj6il3vhkxcwr87pc6z8hc4jnvexn4su',
                ip: 'jef9wdraymmy8po',
                tagId: 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
                uid: '53bkpbw3rnryk8fqztfcgtjigw0fv94hilaumtvos4g4fix80iavemk96z6392cg',
                counter: 766494,
                expiredAt: '2020-07-09 11:50:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST nfc/session - Got 400 Conflict, SessionIp is not allowed, must be a length of 15`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c',
                ip: 'opr8r35mr3w03esu',
                tagId: 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
                uid: 'cvzndjmowubl1as59234ph2b8l8dxs7ya5wtffk1awm396k3lrhp45k053cr4b0n',
                counter: 337592,
                expiredAt: '2020-07-09 14:06:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionIp is not allowed, must be a length of 15');
            });
    });
    
    it(`/REST:POST nfc/session - Got 400 Conflict, SessionTagId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c',
                ip: 'ym3ida9gx6atc05',
                tagId: '851x0mgddnarl1ihqoyzfwnkxrq2db8okjy4s',
                uid: 'd5r7772jzjy669mi6t99ckmxu410de5op1pj967cl3kqy1j85hl7pbzzzv66hxu6',
                counter: 106989,
                expiredAt: '2020-07-08 19:46:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionTagId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST nfc/session - Got 400 Conflict, SessionUid is too large, has a maximum length of 64`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c',
                ip: 'wl963ow44za7zsr',
                tagId: 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
                uid: 'q5lxuini3wxm5snqubb65fik48kjknfw8tqukqjogtf8o06b0rtre08sdtvo291rt',
                counter: 367364,
                expiredAt: '2020-07-09 06:05:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionUid is too large, has a maximum length of 64');
            });
    });
    
    it(`/REST:POST nfc/session - Got 400 Conflict, SessionCounter is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c',
                ip: 'kvi6tez167hlfw3',
                tagId: 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
                uid: 'g7ds778zacxgn1q44qpdgy8365gq6oc54telkbklxcxdy9sqxei1dxglt2v98fvk',
                counter: 4374375,
                expiredAt: '2020-07-08 21:07:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionCounter is too large, has a maximum length of 6');
            });
    });
    

    

    

    

    

    
    it(`/REST:POST nfc/session - Got 400 Conflict, SessionExpiredAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c',
                ip: 'r5pfe0ixcyrkoms',
                tagId: 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
                uid: 'd3wvw2hr3fwef8k0fnreokz6nkiy31n2645tr7jk1aujt93ij1xqddgqupnspshy',
                counter: 539560,
                expiredAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SessionExpiredAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST nfc/session`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c',
                ip: 'o946j68rbk2klpw',
                tagId: 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
                uid: '1i02d6xremrhgud1hgyj60oadmbnh8uqkg5h9nvf12sdgxw9bn3m3jciatfju5io',
                counter: 373458,
                expiredAt: '2020-07-08 20:03:39',
            })
            .expect(201);
    });

    it(`/REST:GET nfc/sessions/paginate`, () => 
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

    it(`/REST:GET nfc/session - Got 404 Not Found`, () => 
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

    it(`/REST:GET nfc/session`, () => 
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
                        value   : 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c'));
    });

    it(`/REST:GET nfc/session/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/session/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET nfc/session/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/session/ab627b95-5e94-4f7e-b2fd-b29af1ef833c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c'));
    });

    it(`/REST:GET nfc/sessions`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/sessions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT nfc/session - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a10a2363-c715-42f2-a5ed-28fe46d5b1d4',
                ip: 't3346x1u4ubb0dp',
                tagId: 'a07ca095-8243-4359-812f-7f67a14cc216',
                uid: 'okv1t420s9pofblo7eygety410k5241bd77jw52fkiovvhuw7sv18qovdlz07pve',
                counter: 583393,
                expiredAt: '2020-07-08 21:55:48',
            })
            .expect(404);
    });

    it(`/REST:PUT nfc/session`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c',
                ip: 'd6db9wqvaxaowbb',
                tagId: 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
                uid: 'r8nyl82k1pkq4htrgvpt2zjhdrrf9po7dhsqz59ifgfq1yj18mr9i04yxsoiiwjn',
                counter: 228989,
                expiredAt: '2020-07-08 23:16:18',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c'));
    });

    it(`/REST:DELETE nfc/session/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/session/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE nfc/session/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/session/ab627b95-5e94-4f7e-b2fd-b29af1ef833c')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL nfcCreateSession - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL nfcCreateSession`, () => 
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
                        id: 'a580189f-602d-4b4d-8df8-ffe469a84cc6',
                        ip: 'yvezozhh8hjci5h',
                        tagId: 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
                        uid: 'cxfetnmql7usfhd3bztx0s89gcroy1r1gv2yzk42kuoqm8nelzqs9zfgm64ircor',
                        counter: 140351,
                        expiredAt: '2020-07-08 22:16:42',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcCreateSession).toHaveProperty('id', 'a580189f-602d-4b4d-8df8-ffe469a84cc6');
            });
    });

    it(`/GraphQL nfcPaginateSessions`, () => 
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

    it(`/GraphQL nfcFindSession - Got 404 Not Found`, () => 
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

    it(`/GraphQL nfcFindSession`, () => 
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
                            value   : 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindSession.id).toStrictEqual('ab627b95-5e94-4f7e-b2fd-b29af1ef833c');
            });
    });

    it(`/GraphQL nfcFindSessionById - Got 404 Not Found`, () => 
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

    it(`/GraphQL nfcFindSessionById`, () => 
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
                    id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindSessionById.id).toStrictEqual('ab627b95-5e94-4f7e-b2fd-b29af1ef833c');
            });
    });

    it(`/GraphQL nfcGetSessions`, () => 
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

    it(`/GraphQL nfcUpdateSession - Got 404 Not Found`, () => 
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
                        
                        id: '4e177f15-9d0a-4727-9939-40b95fde5063',
                        ip: 'jnyv7veki56nh46',
                        tagId: '30071cc2-5500-426e-8cbd-849c6adcfc89',
                        uid: '3abdzm0y7x353chgkki4yu13dnl7v51m3smhyoa2aod7kihr0rs5cr0ktun514mh',
                        counter: 624599,
                        expiredAt: '2020-07-09 01:32:16',
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

    it(`/GraphQL nfcUpdateSession`, () => 
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
                        
                        id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c',
                        ip: 'l4o0uzr3z3uobs4',
                        tagId: 'b757a5a3-48c5-415f-bdb7-1d52efc782b1',
                        uid: 'p8blwv1xzhq34cemjstd5bvyb3qjv6w8rpbw2nhdx6t8q97giw4rm7y0xuo3m5e4',
                        counter: 923626,
                        expiredAt: '2020-07-09 02:33:18',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcUpdateSession.id).toStrictEqual('ab627b95-5e94-4f7e-b2fd-b29af1ef833c');
            });
    });

    it(`/GraphQL nfcDeleteSessionById - Got 404 Not Found`, () => 
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

    it(`/GraphQL nfcDeleteSessionById`, () => 
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
                    id: 'ab627b95-5e94-4f7e-b2fd-b29af1ef833c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcDeleteSessionById.id).toStrictEqual('ab627b95-5e94-4f7e-b2fd-b29af1ef833c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});