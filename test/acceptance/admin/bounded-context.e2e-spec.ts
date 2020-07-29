import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IBoundedContextRepository } from '@hades/admin/bounded-context/domain/bounded-context.repository';
import { MockBoundedContextRepository } from '@hades/admin/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('bounded-context', () => 
{
    let app: INestApplication;
    let repository: MockBoundedContextRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
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
            .overrideProvider(IBoundedContextRepository)
            .useClass(MockBoundedContextRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);

        await app.init();
    });

    test(`/REST:POST admin/bounded-context - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'qw5o9mb82r0byk9itahioy4mas6a997a2xrplvj19b51x1fyrd4i86i9vxioczpl5fw5r7biqrdkeuw6pngs0w7m6gr42q1tzxacpp3tyjs4rty00d8k8ycdd8bjeaukfu4j19241vi0vw48l42idqv6e318yxkpummgm2jbouu5tvj6fxjw1oc7ymxqmxglwfg3s5fzr6tu4tg6v2fcaclj9jxgi6g8w7iiyzuy8ppjube7noqob754cp2xnbn',
                root: 'qqmyf0vnnnkkeqelia2x',
                sort: 468536,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                name: 'ofu6of4rkxuv3znmadt7gt39t5n7vetromgn8pqihalacodiypc0ed2wdwbo26siawplzugw0c6cxhgsjssfnc36nnuovs2jywzzsxwpm1l6dhylsxtsz4ud8ln7leix5c7hze0cwgdlglvplmpp9t6po81futpvntw8jbt9cbly3nc7tw03votwy6n4fzgl9cgru2wwm6uqbn9dbo4boz8kfezm1qbw6qsg4b8oixhsg0uze130uisqcpwictg',
                root: 'acktu2etdqmfltgzgd8t',
                sort: 275874,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '026a47ba-5353-480b-bc65-9a0bf9402f6b',
                name: null,
                root: 'mxbbye68ipf9vla6ekxb',
                sort: 139490,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '026a47ba-5353-480b-bc65-9a0bf9402f6b',
                
                root: '5cylys91qfl8v6x4ljj7',
                sort: 970524,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '026a47ba-5353-480b-bc65-9a0bf9402f6b',
                name: 'hnqk8tnuuxnafoshnoepw3ivxe08fzpc34mnhjrgde4qoadga4dpzowrcgw8c9v2l3t4rg0cgx1x6obbdtyoqbgffpia4rdywfi9hp5yhkh9k5ljjzl1h06sp6nmvce0lyoowjhgoalyid26xy7pyz4mg8uh4t6y777in5ikukruyiv6o6qygf1hm5or9le9wum7b3pz3jtvplgb4g4uaftkxre07fue56eppdlkrpx1szuovypu9p6394qvbxh',
                root: null,
                sort: 882493,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '026a47ba-5353-480b-bc65-9a0bf9402f6b',
                name: '3v5z6j7p1pm5z4r63nb9xbpret8rlfinu5992vsmr3pqir6hpw5c4j6echdmrlzp79gzqpbligoaq61l0ohaz0fxj2hc0cn0twag4yt3orkvexjkjim0670hqkx2zl95pnj4mtozmmp96sjcsvyax3zaw54i4vovxz6spti1i8by6r6swq6alrt8vjtsryfnl079kwi526xcxb2a2fjs7wt9kbj5vgsp2jb8ifqp3fnpqjiwrydsn4jujnooedz',
                
                sort: 721392,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '026a47ba-5353-480b-bc65-9a0bf9402f6b',
                name: 'h4eo2us27j1bd424rfu2dmxwq5yc7yvenl059fv3xmk5foszsn28dcbq1p7f5jo6ii9jmdzd3e51ma5kuv28ha0b0fbtzs4dspnn2nka4loc63lv65fgm1o18rxbb80j1thr1n14xhawhrz98tbktd329ozmbx7i8dwgh99t2b78iqjrcels5cpa143d95k2ku707z5c21z4xzogrvuk22iuz19bce9y9a7ivntfn0166y57qgr69d7vo5kwb7w',
                root: '7y98gb9wq7vwnvb5kkhq',
                sort: null,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '026a47ba-5353-480b-bc65-9a0bf9402f6b',
                name: 'woohnny11jtrrzmdpirocv5ce8033xok3elxk14ojq4j6jf0uy06qztdhguapwa7mwavbkdaneeyl6wna6g1x583kriqpvse9dibb51oxnifehr0o7ud4kh5bnu9upwr2d4efvgewta79vtc587ue5ctinprny72juom69bo0l73zomiysiihzs8moeel1645a40q93xh950j4r1qdhjddopflxz147uwbw0ckpktc1eh3fiakbu5hxm872namy',
                root: 'ja9f2245wrp0pgaxyaks',
                
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '026a47ba-5353-480b-bc65-9a0bf9402f6b',
                name: '2yd1tlk8rb26bb8xunkyhp00mbb3ak24uk0qkh3wx52fjz35bznh7f7lxydzu7r7qby3rp04sa8nqrm2nvht3yhje5ulc6i20logrp1dylaoz7ypcga73ww2ht70l4serb04zvsweq03i4br4rugupksgjc0mw255zk4rbvuq8if06ogbgyt42nja0za692pc50psey3k4dki2i9x753fzyxygecx4pw09ey2f0io54eqqzis2sqd0vi2zfqndr',
                root: '8luyv0jl5gni0keydlh9',
                sort: 811562,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '026a47ba-5353-480b-bc65-9a0bf9402f6b',
                name: '4zrosibrffchgcm8hzwe4d8jioxoog197z50sd915p6b1cgvzwjoh9c58zetnvin61pu671jy71op1z1cgeqgkvg4z7psl5ju510u8711akeeycqa6l2jux8xztkc5blewei1q1jv05yv3ohlf5alcdmlr7tfd4t2i3big8ck06lqbqi7l5e1oefc179p5xujz7yj2dnpfg1wrj98lnn740w65y477vrjarwsyih7wz0zrg0ch2p8rnute5j661',
                root: 'bhhqh9h1f6dvt35c45xb',
                sort: 241872,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'yjdqct7v1o37yqpl4isic66r6eytdtp7wmsyt',
                name: '8k7p8hp047f3xvdkq3ushm4u74vc46tqv4yh9cuqkw4s5m2g4kl9elabpucqzrdg988mcczitzn8sg3dhpya4x120wi1u1nlhl51jhynzazif1uyffokwf1pmdmwjl5vnxea3adfnuhrs9xrly5ebbjqp5vw3djo9zbkzz1asmt0ewra0zb5k6sk2ttq5ap84nnyfing7krgzp3huu4ej8qghrb7c99ylahtdhi6q2t850t4axqf8zveznptu72',
                root: 'ka40cz0ijlekvr55iz3p',
                sort: 684899,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '026a47ba-5353-480b-bc65-9a0bf9402f6b',
                name: 'rddox9bxe0aqnhqv171efrm0f2al6atffuzprqpts1hx3i7xoxtdgqqc0nvlxnrsespj489vmowsbh0421j2tu4y26vuozjvfk389wtvvgedp8jao8tqkkai6yjtbji1nbk7xom6nkhoge8uu1yaw39zdletez07muukl88yqeds400ublxgyxo7hzzg5gq1tih2zj2qdbr3274vt4bkw9aw3g0no4hxbdctp5cj65jnlw0552pso97u87b5fgka',
                root: 'qobknxwekyq3nj7r33tb',
                sort: 231077,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '026a47ba-5353-480b-bc65-9a0bf9402f6b',
                name: 'qjgsk3fo314fzxjlh708bx9kg7bz8svs6trf27dvs5c1li3jhmwqh6edonhwtrp26zxs3a1zfuyvlv56notwb09tizcnlfi0i2pa6xethabp2zino8xqbo0ld1ynlscoru0juy9xpofltgtfqlpf50306xb0gmnihnpip7lhxm4hrn2ujx13pk4ch9j6zudbitej4le3593t498pul1t77ow5o2haiwus7n5va6lmxmm2912uqd5o889csflly7',
                root: 'k64puqp88il0rs9kwtlh8',
                sort: 435315,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '026a47ba-5353-480b-bc65-9a0bf9402f6b',
                name: 'r29czum1u5tciva7w981yt3vgdcvc84wsc7yij27a5899uhjza81d8bjl9jltb2nupyylfe3fqcyfb4onh0h063fcvphty8hizjq439qqms82szohcdd14qaka84u2sw0awtp37hctao9um7jnti4iwedzvihf6nm0qdas17cl8985zuktxegnxr7v3rc0lxufy4fty47n3q3cjjv43ctrmrshi6b62203zai05eco00vk4mbscjpr62onfkv2x',
                root: 'pe999baxic2zxrlt8w2c',
                sort: 3283925,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '026a47ba-5353-480b-bc65-9a0bf9402f6b',
                name: 'vwk9vyhbp048ws027y9t3tp7igmduobnoryaeuuc3jnz9n7ebqrf138x377tywpj9tli7h7n87rt6tocqojkjarzjnv355t9tbhxd9qix4jrxnesrxedasled8n9imfmshmssihq04dxzqlijyr773r833miou193u5owzoe0ju5m0k8j4loc5o5xk1gdsnk35px98oel9q8v12s0jcf6xqbu4lmeb4n8wt9xq9c1iauf5evdmwut5m4tcqie77',
                root: 'k22ece14ljcpxub8abxp',
                sort: 434776,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '026a47ba-5353-480b-bc65-9a0bf9402f6b',
                name: '76zf3mwfgojyoibphr2y51jevendgy13ski0f8xdw9winibw69p26q8ao41egjmdndb0j0qm4mjwhk83v9yhe8vhtd97h8s2oaa127tu15ijb956qw3v4b9zi9m5y0v7ygbv5zqqj5957bnjusi1i1y6j2okrpkay82ezk7xm9obdepjcvzv5di5xygajlaz29r7pz4jmyzh6zgxcflus1nsx6b67l1h3k7rv13p2kn5ckqkzyj489ybdr1gzta',
                root: '5coet7h5aq02r1wmkit6',
                sort: 651112,
                isActive: true,
            })
            .expect(201);
    });

    test(`/REST:GET admin/bounded-contexts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-contexts/paginate')
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

    test(`/REST:GET admin/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context')
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

    test(`/REST:GET admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '026a47ba-5353-480b-bc65-9a0bf9402f6b'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '026a47ba-5353-480b-bc65-9a0bf9402f6b'));
    });

    test(`/REST:GET admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/026a47ba-5353-480b-bc65-9a0bf9402f6b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '026a47ba-5353-480b-bc65-9a0bf9402f6b'));
    });

    test(`/REST:GET admin/bounded-contexts`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-contexts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '8109466e-0f8b-4ab5-b669-cd1e0cd4fb50',
                name: 'abypeauf0soeurx55trqetu3wu70f6954cmkxqtckvrobjond5rw8sh2kqf6uh5yfekuf34iqnfzbwt7mgh51zicmbl2ms9upiayrk2i3j40f5enpdqvlaptmvzw5m5v9tia6i0imnptowpgq6klkjz6uk7wdcsm7akrcqz8b582th2kzpvbqa1njl8byukozbcoh0g05iwza5booa4286kxti7ntcxz7f4ifk1nzc6jdcvsdvmihowtshc5xnk',
                root: 'fk8xyr3a9olmqnmoqs85',
                sort: 580458,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '026a47ba-5353-480b-bc65-9a0bf9402f6b',
                name: '4ucohg1rjyeddmdmn181kamq0m8bmiondyqt1n1wrqarewwitmd3xlk5ivhuxg63s5xfbjsrvadlq99xku5fdw3jtsztp2ewprk8cgu87qbmnygnky60q0l3ngapcaop1m0ajo4uiby6d17fj548mfq3kmiv9dp7g9xdldfg36lw35p1td3s9fk985s2ywgltuvvrox2wge36rgi6du7s5d8vjfw1228ojhs66fvv6hphixpku9zr0bc0sjp7xu',
                root: 'ydctkdap3tyqx2rdq4hh',
                sort: 980416,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '026a47ba-5353-480b-bc65-9a0bf9402f6b'));
    });

    test(`/REST:DELETE admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/026a47ba-5353-480b-bc65-9a0bf9402f6b')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateBoundedContext - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateBoundedContextInput!)
                    {
                        adminCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    test(`/GraphQL adminCreateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateBoundedContextInput!)
                    {
                        adminCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '3f3ec0ef-31fd-420d-a2d9-42f2d34f009e',
                        name: 'ngmw5nqe5wdyubu6e6fhyhrlvsl63fsaszji1z3g2etb8v6gaqtfbr8atjvizckyvxv34o0uhcuyyaay0bxq7pvs66fvn2fjnysivgq9v7gchkpid8ua99ueenr3xygkvw3roxitj2frym9gx29rsolpt84ma4nx00y5p6jt7mlydtfn9ann2tsswnrsvwu2dtmmzv251ande0xbgj2sxcjz0h5t9dw6ijck61kyixl70whlc1hdv797qxeo21g',
                        root: 'vp1x12kb7ky4vhlozy5z',
                        sort: 356097,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateBoundedContext).toHaveProperty('id', '3f3ec0ef-31fd-420d-a2d9-42f2d34f009e');
            });
    });

    test(`/GraphQL adminPaginateBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateBoundedContexts (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateBoundedContexts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateBoundedContexts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateBoundedContexts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL adminFindBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    test(`/GraphQL adminFindBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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
                            value   : '026a47ba-5353-480b-bc65-9a0bf9402f6b'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContext.id).toStrictEqual('026a47ba-5353-480b-bc65-9a0bf9402f6b');
            });
    });

    test(`/GraphQL adminFindBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    test(`/GraphQL adminFindBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '026a47ba-5353-480b-bc65-9a0bf9402f6b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContextById.id).toStrictEqual('026a47ba-5353-480b-bc65-9a0bf9402f6b');
            });
    });

    test(`/GraphQL adminGetBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetBoundedContexts (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetBoundedContexts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateBoundedContextInput!)
                    {
                        adminUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '375d0e69-3409-4826-9d55-6ee4b665c5fe',
                        name: 'gndjk83jt4kw1lxle4lun3lumbebnvbrtesnvgse7ysi4b2cp7mjc49p3vzs8eoxh1v53ecavsrzubr2q3pc6cclcatygmz3xea6863385u5xq2npauebzqo2uuu10jyeamtucpp0j6c7akib42df7pyg4agu8q3jhem183y98alm6cpx7q7dq6ewkx51soxwup90mehxfdt6z4hcvpc7ddjctfoza9619thv8tm0qozqad6fy497vmz9633c4i',
                        root: 'yf1lhxupil4rzo2zfw9k',
                        sort: 902945,
                        isActive: false,
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

    test(`/GraphQL adminUpdateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateBoundedContextInput!)
                    {
                        adminUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '026a47ba-5353-480b-bc65-9a0bf9402f6b',
                        name: 'fzwz60e1862loscmt5nnygd81rfck1kia3cecrapdms8tja6u45a9o0wem00y9djy6qs86ttyjmw523hbaruk1o2ro41vmr9m0c8px8zzqtcncuj7i4ne7i1duurzlj53g0fhemguzt2j5gsxomhdlxym5capbj8b67sy6daykogzg98fuseosipe70keytiei0rp9pvm461zmri5g6ldmriyujf1kms57jzcvnj80mhxcnx5859flnhfu15het',
                        root: '09vq05nruo752orf5pgz',
                        sort: 853786,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateBoundedContext.id).toStrictEqual('026a47ba-5353-480b-bc65-9a0bf9402f6b');
            });
    });

    test(`/GraphQL adminDeleteBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    test(`/GraphQL adminDeleteBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '026a47ba-5353-480b-bc65-9a0bf9402f6b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteBoundedContextById.id).toStrictEqual('026a47ba-5353-480b-bc65-9a0bf9402f6b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});