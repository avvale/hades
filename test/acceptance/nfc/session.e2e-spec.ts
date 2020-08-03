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
                ip: '4hv57t75dbjuaar',
                tagId: 'c3e53abc-9041-4dc5-b118-1243430c03a4',
                uid: 'xl9oi8mohztdbny76oskh1seaqy7q3wh1sh6837afxy31nglstjmsc9t0r14n9ez',
                counter: 102837,
                expiredAt: '2020-08-03 08:03:10',
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
                
                ip: 'z2d5r6ski354hll',
                tagId: 'c3e53abc-9041-4dc5-b118-1243430c03a4',
                uid: 'cnp0jqyxvn69b67nnlud4bhi031td5uwgufzqgzra36lk0657lsbsv8htucc8h3f',
                counter: 125827,
                expiredAt: '2020-08-03 12:17:23',
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
                id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88',
                ip: null,
                tagId: 'c3e53abc-9041-4dc5-b118-1243430c03a4',
                uid: 'rfwe13hx0w6h6n3ktb9h376qaupvskhu1tu8jati9rzeaghouwmeph48uwos44qk',
                counter: 654310,
                expiredAt: '2020-08-03 01:08:52',
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
                id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88',
                
                tagId: 'c3e53abc-9041-4dc5-b118-1243430c03a4',
                uid: '8ygojtaodw0exzwj09z7ba9n9cxrro054qvt3olcl6q8rtsute8jjv6322azap2h',
                counter: 762241,
                expiredAt: '2020-08-03 15:37:54',
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
                id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88',
                ip: 'r76jk6n2s2qbdva',
                tagId: null,
                uid: 'rqcg7fk688v2mnpxlv7dusacoz7hoj63mzaw2sgfnasouu00z3q94rgsefp02hzx',
                counter: 268514,
                expiredAt: '2020-08-03 15:44:32',
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
                id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88',
                ip: 'qtthjqvc9ympg9l',
                
                uid: 'p9ev6gom2rtpmbbb81q8k49e2ajnhp8c6aflkz4wi9u8zvoueb74naiql1iyumpk',
                counter: 903964,
                expiredAt: '2020-08-03 11:23:00',
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
                id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88',
                ip: '81uypxyxmbi2ftd',
                tagId: 'c3e53abc-9041-4dc5-b118-1243430c03a4',
                uid: null,
                counter: 659407,
                expiredAt: '2020-08-03 09:31:41',
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
                id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88',
                ip: '8k6qtbitgeiachu',
                tagId: 'c3e53abc-9041-4dc5-b118-1243430c03a4',
                
                counter: 279759,
                expiredAt: '2020-08-03 10:30:13',
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
                id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88',
                ip: '7wz2rti2fnf8q3z',
                tagId: 'c3e53abc-9041-4dc5-b118-1243430c03a4',
                uid: '4swhbqj3xdu9dig5317vk4qe5ehsrr01ennm4lsrea53p58rs7zatzpcg2d9hh0r',
                counter: null,
                expiredAt: '2020-08-03 01:18:57',
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
                id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88',
                ip: '4djix0mgpsm1v4y',
                tagId: 'c3e53abc-9041-4dc5-b118-1243430c03a4',
                uid: '0rdn48x6iyjrzlg7ocus6df45s8mdnjor61z2cqhouvzx0usvkwsr2gizhk52ho4',
                
                expiredAt: '2020-08-03 00:26:58',
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
                id: 'g5cmuqhge1iatorksp9kysn88ydqddi2gpr0p',
                ip: 'f50oe5kdmn1nr22',
                tagId: 'c3e53abc-9041-4dc5-b118-1243430c03a4',
                uid: 'z44v7zmbrrjx9lka72kifutl75pgsfscm9oj6wxazeujgfra4ii9loac2o4p329y',
                counter: 655038,
                expiredAt: '2020-08-03 15:16:08',
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
                id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88',
                ip: 'hbg6m5590avkrx3a',
                tagId: 'c3e53abc-9041-4dc5-b118-1243430c03a4',
                uid: 'gpi5dpy14vbfrid55k2tpq644m73o9u2qdtpa4koyywxq68qypypf6qqyvfg554q',
                counter: 136115,
                expiredAt: '2020-08-03 04:05:33',
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
                id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88',
                ip: 'jqf4glfsqrf4b3i',
                tagId: 's0nvwy50s5w1vfe6y3sw50cc7qaanqhsu60hz',
                uid: 'a9gaer0ckw1lhfg9h5i4oq1q4wd160157bl8t4x2j22wgxpwjekegesg5t75owj2',
                counter: 393440,
                expiredAt: '2020-08-03 03:54:37',
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
                id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88',
                ip: '8x3ligsguh8yyfh',
                tagId: 'c3e53abc-9041-4dc5-b118-1243430c03a4',
                uid: 'txkyp3s22gne6mrfgmo7zdjz9f2pt9q13k0id494fcy5mia2p4w9q8f6ocbk6omur',
                counter: 703027,
                expiredAt: '2020-08-03 00:39:03',
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
                id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88',
                ip: '1v4y43no262jwxj',
                tagId: 'c3e53abc-9041-4dc5-b118-1243430c03a4',
                uid: 'mj0gz062qq54vq32nfpuo94rat4m5tsjcjbukqimerdsi37kge73qbom9p05yror',
                counter: 5094408,
                expiredAt: '2020-08-03 08:06:29',
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
                id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88',
                ip: 'go8bb3h6bwywvky',
                tagId: 'c3e53abc-9041-4dc5-b118-1243430c03a4',
                uid: 'pfdupq5rgpsdxipfgjoi6uvonaryquhc1giqng5jdt77iz5376dh56uxn8t0yag5',
                counter: 471163,
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
                id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88',
                ip: 'opezu4buqu05tw2',
                tagId: 'c3e53abc-9041-4dc5-b118-1243430c03a4',
                uid: 'o1rgyh418xvgchnbp0u04myamovkofsbipuee60ty9qsbkb2hi3vh7jkzysptwzx',
                counter: 778729,
                expiredAt: '2020-08-03 05:34:39',
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
                        value   : '795e43d0-9a40-4a57-bb61-8eef7cbd2d02'
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
                        value   : 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88'));
    });

    test(`/REST:GET nfc/session/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/session/1a3a6106-d89f-493f-9b3b-2777e5629f08')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET nfc/session/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/session/b1020d1d-0ff7-423d-a233-6bf4d4a14b88')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88'));
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
                
                id: '364108dc-6ffd-49f5-84d6-5b7326ff1607',
                ip: 'exqeo2obqwec4xz',
                tagId: '4f51516f-b64f-40db-b8f4-7a9423bfb78a',
                uid: 'e7ughnpa7w0s64rafo6woghoqq2lbaoh51vbfobjgwzyxjjzfsoksv5lfyk3kxcv',
                counter: 647760,
                expiredAt: '2020-08-03 14:53:50',
            })
            .expect(404);
    });

    test(`/REST:PUT nfc/session`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/session')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88',
                ip: '8jw951hd83vcfg6',
                tagId: 'c3e53abc-9041-4dc5-b118-1243430c03a4',
                uid: 'sa95yeqmclnku5zpj1tvyu3u5ccfcslyjfdzpojcdnvypkj5e5yertkkbgvnacco',
                counter: 704774,
                expiredAt: '2020-08-03 00:40:18',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88'));
    });

    test(`/REST:DELETE nfc/session/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/session/9656f9f6-8a6b-43f1-bbef-d4fcef777775')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE nfc/session/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/session/b1020d1d-0ff7-423d-a233-6bf4d4a14b88')
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
                        id: '7836f940-858a-431a-a1ac-30f32f0ee6f0',
                        ip: '8r719tna09j1z0o',
                        tagId: 'c3e53abc-9041-4dc5-b118-1243430c03a4',
                        uid: 'jbkowzgcfw8jkzjap08sgkwah2kd9exvfmx3lgzzz8yulw7icrdnhrruzgri71ei',
                        counter: 761933,
                        expiredAt: '2020-08-03 17:52:33',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcCreateSession).toHaveProperty('id', '7836f940-858a-431a-a1ac-30f32f0ee6f0');
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
                            value   : '91d5b3d3-9b25-4c64-932e-8554da323ff7'
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
                            value   : 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindSession.id).toStrictEqual('b1020d1d-0ff7-423d-a233-6bf4d4a14b88');
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
                    id: '1f04b3ad-2a6c-45eb-847a-52dc657d1e26'
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
                    id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindSessionById.id).toStrictEqual('b1020d1d-0ff7-423d-a233-6bf4d4a14b88');
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
                        
                        id: '84f30b03-2651-47c1-82f0-51c152980f36',
                        ip: '05eiob9f6ihkvcb',
                        tagId: 'e7a48817-0473-48b5-b2e3-46c8e2c19530',
                        uid: '3sz0qbvescexgwoow9zkgysce8vk7numj30etkyvizvvsbobhxvy5f6qt5ktsm2b',
                        counter: 959714,
                        expiredAt: '2020-08-03 02:24:34',
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
                        
                        id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88',
                        ip: '5knvj1fe9a3mwnc',
                        tagId: 'c3e53abc-9041-4dc5-b118-1243430c03a4',
                        uid: '23vpbc0t8sbvjx8vn4a0uwj7n6ulcd02q12scpd9fivb1n1o4v2i7rpyczwra4sj',
                        counter: 179616,
                        expiredAt: '2020-08-03 02:58:40',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcUpdateSession.id).toStrictEqual('b1020d1d-0ff7-423d-a233-6bf4d4a14b88');
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
                    id: '4ccd9991-8751-4382-8af7-901fb2a57a61'
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
                    id: 'b1020d1d-0ff7-423d-a233-6bf4d4a14b88'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcDeleteSessionById.id).toStrictEqual('b1020d1d-0ff7-423d-a233-6bf4d4a14b88');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});