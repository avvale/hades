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

describe('bounded-context', () => 
{
    let app: INestApplication;
    let repository: MockBoundedContextRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
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

    it(`/REST:POST admin/bounded-context - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'ngk9xdxrcrw96021eiwer9l4ziieyslv7nyyjwvzq90ej7j3anj1hdl2vb7fn9ok23qaynntawh8gh9l7ndooa0f492f62t95karkjtsdh0lze6bvayage94zhuqba3wkd63fnhi0flb2brbqvip5n9bi3npta7rri960g1lgvl6236d69bnwyo9ng5xu2ocb8lkh7t29l0zwclnfz0zvb5j6zhz2zrbwcwor6q6nkb4mgf7f42o4p42do1o8ni',
                root: 'xxkhj7cwykaqgturx2o0',
                sort: 413641,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                name: 'f5wxloklcygr2wbhhiw18ex8vhme4gqc0qp125blepisxae7q8szaujqbdscg9kjmewgcwfljgydda1ctaznxw6nkztifo07j9bipykyy6u0cht9kptrqusy99ru6bai0alu23e0kqwo5lktxpoehne4hy96uvjhfhiyah06sq2hh02xg4qba5zix5v0e5y1fwv7ry6ryh8othrurpj2ntedgv89ohn665pb3uujhe2m2h7bw76t28jl36gxq3k',
                root: 'pjyjpzpm3houc05nfy1v',
                sort: 565760,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '927455c7-af1c-4132-98d5-bc91f9286763',
                name: null,
                root: 'pu88qwvzdc3ydtquyyhs',
                sort: 662616,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '927455c7-af1c-4132-98d5-bc91f9286763',
                
                root: '1t33stvfb3wlo5r3zgdq',
                sort: 486267,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '927455c7-af1c-4132-98d5-bc91f9286763',
                name: '1dofup2i69evjcwsc54jn3tkpjdzlx2bb7ji2o1p6jna3buz63mlurpfmw78y9y17paffj3ckqwxfy1soy03tkwh50azj0bibstnfb55ynge1z4estwoy72s6h76eyxfluau872xk0xkmc3rvhilzcb9f6lt1bews837o5vs4a07fnjq9dc595jiux0sqhl3xp5ll4iazdj1vp0b8ek12glqc493hszfux9w7hi4m5vsleya4fk578i1btlp001',
                root: null,
                sort: 628058,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '927455c7-af1c-4132-98d5-bc91f9286763',
                name: '14jjhe3sd2igmee2iev5j95sqs85vw3w1xedw79zsu13s3p2atf8xofqgh95z2e83woe6emwedcgeyaq7gbump6tixriercen1c8gww2vt6qfte07ix9u3218dkr4dv0g2teidnh7b3i3drkay4pdowz6vkygcasih019tqbjcztubc4i9p0x41437cm3eglypmxazv22lisnae1dnhd63la9aan1hetgnhu0mxt8iueee2zvbfz5pf0i88weyc',
                
                sort: 947692,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '927455c7-af1c-4132-98d5-bc91f9286763',
                name: 'l3v994noynpsbnwt4ezbnwnznynxqqhgzzxggwriy8duyacfevp87g6ccxbugpaf8xha8up5j2autswfwufkdjm73d12y2auc9culeh4a3vepz2grediqlnpjdr5e2e81vyzjomahx6gpny2eikygq0okkbembqzj0vrtludg1d3xos3aese0scxf4xgpm5vslrwvdd4ynhy00v2xpu5oz07mjyqovennc6rvf6cuegeksm47wy10reiw8ytg90',
                root: '80ikcjhjo39c5zs1v9u5',
                sort: null,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '927455c7-af1c-4132-98d5-bc91f9286763',
                name: 'c2jjpwr3970cmevfk837ko292m1tm9azo5au3nh4lgnwga0qxye3qu787p1pjmxqkiy0vz4wvpo3bj60pz7h0rfrkelporx6saxuxugn7ocvl3d7fjvdpu5xkehkkktac27lvxf94t3nacu5y9li4tz7rnghdke89vnjdsuhfi5k5pprigpqszy4lh9085bti6so5uktko8ptneojpiqd3mtw9e101xrci3vt6vut49co9215e5b06zemwz4n56',
                root: '57aik05w8hfdocxzfv5n',
                
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '927455c7-af1c-4132-98d5-bc91f9286763',
                name: '97q41o77dr3lpbdg24i55hnxi5vk0wvqubxxlrcoawvhirmrf9omy2p1nsps5n26kdowkfk7pxof91hrqmzi25rgll8hnht113iinhsj40vazpgtyscwje8fh3ez1rafu4xv6847f3v4n47mq4gretpkizullidqfrlca17nmj19e0ykacpjpyd2cgyz3j2d3kky7s4bnhltps88ryt9v54r1dso6ne45r4c3ryaakguv6f7bpk6t9lnmvpvnby',
                root: '968bwnu8pz2l0b41pee9',
                sort: 969587,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '927455c7-af1c-4132-98d5-bc91f9286763',
                name: 'gxebuhvvisr229f6zpgvulvd1won9xc54gh4wxyx9klub1bzlh63yvjkbxis7pp4piijy8orhhnmx15bwj3ux82s5euy831lrns4r3gr860gb1w9qluek078yc5z60avpzmcku8ql8r40rfk4j5fwqgmpx43mvsim5sik0myabmwaha48ct2108arloslnotkblpqn8rfq7pt1gzobca44hphkxjhbk2y8y1l3sggzemo61d98ilyx49fravfes',
                root: 'h7xkicoupfnztpumamg7',
                sort: 463961,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '9ik59p07vywdwpz91nawde1hg53nvcb990mdm',
                name: 'ca0wcroapabcqtvr3lyk3maten2ho98typbag8fhkq9qt9pftccpj96qzkqwgvq7lyoe04e7m6riamstphzb9pyeq406pp2tyockf4103ewofxiozd2prdk65aykp6by82b6quhhfu3xdqygmzad461487q9auby7me7cd55n2fuyueunueohu9lk9p46v5czql5o3idh1veavkxs2dxxv3fy9jlgoy21xw7dkh0cua0pv9uije4zly9gbqh511',
                root: 'pyfdtksb4cnd93u155mp',
                sort: 809704,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '927455c7-af1c-4132-98d5-bc91f9286763',
                name: 'zo6ahxmty58ys6migkdjmfzh1i8wvdo9fbntwm02py57t89aa1nj2qk0vf4wy52ehwe5tl29mmmjuhbmq7f287obfg4rxeruntv9b9fwveycfz9eggnhu14bc099nd606to962juq7ecf1gil60u1oakocfsqzdf3360dn1yzgvnrezdhuzl4r3lvmktxdpwhwn3zxe06oqeja39y4d1ig3j81vnfaf9499em0m7tf00yyo6caeda9icus4mlso8',
                root: 'asbwij3xpkuhwt6c71u9',
                sort: 214080,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '927455c7-af1c-4132-98d5-bc91f9286763',
                name: 'rjj7vi3tdirug73anvfp7nx4805mbqa4e88hggfz2dlaxlz38h21nob81sv27cr5rgaq0vp8zyfk0yndl4l79xjpewwgie8opv9vyzji1rkjmlfkwvlfkoh54nkzewgh8e70v5b0rlz1g9d3dobm6le2r9pat0mqxnez2osqo6ctgghumv6uhaj4gmo304o5jnizi8y9146mjisl2vkh3lxaoct961wkm2naki6tiklwj4g8hqsoqh9qjik8vea',
                root: '1ekd1w3rkt03cnhp2637r',
                sort: 876474,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '927455c7-af1c-4132-98d5-bc91f9286763',
                name: '6aytqdkuw9cdcia7rpwrv66gl35axp3gnv81thl91587hdkpr5840th9nrj49wn38a9s96srgmrxzhvzbfnb0wkcg9tf1p6ix2u98fdf804gvkqtyu9c0u987nw16h9ny0x18kq5oj1x3zho5od8ab344cq4xez4lm5ef3lyegf0aqsnfv5lnp4425ppvynymb5f4qoe7exy0t6rstx4fvpkok4ri0pvejtvhze2ezw0knhtpiagceb47pme9c2',
                root: '5jnsha2rxtmb45k8pz7f',
                sort: 6173452,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });
    

    

    

    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '927455c7-af1c-4132-98d5-bc91f9286763',
                name: 'ifo4xhckr6yfo8eypns7gqm2y2exr1x45cw2s1ubklkcy0v0de08bmadi1gtn6bxch87k251fs8zhg2s5saqkujm9mh47g7nct1c742cnui75t1w036y4ju506pnwi4hnburstao8qh5010ec46g5ptadixyh09fw3ezq2mpjn8pm4at7frunl779k4vjbpx1m4ud06e0tc7bhtkbucc6r09tfl8ex8kh6vpyua2e4f7nuvo2cllzgo68h6d6yg',
                root: 'ng7sqtneo8cp8anj2ep9',
                sort: 385253,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });
    

    

    

    it(`/REST:POST admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '927455c7-af1c-4132-98d5-bc91f9286763',
                name: 'xmmv288a0uggornc23atq8y8go9mteupuwa6tasos0bw23r3kchk02w4ren5uvlijdsy8zwf935k2pzzdqplcjrfk1hecousou6bsht51nnr9ntu87kr1vs5vtvjbr64pi5d42scc78q2z17kolrrwcm48m76pkephui3t5i6mawsdgv0ojs0c9uy2ktnb9oo6grjbjvef04qar9hx35gmaoloy92bl82ij2utrm1myf0uooirex35pvzg6hxxb',
                root: 'px290cp9mf2h258rllqg',
                sort: 354063,
                isActive: true,
            })
            .expect(201);
    });

    it(`/REST:GET admin/bounded-contexts/paginate`, () => 
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

    it(`/REST:GET admin/bounded-context - Got 404 Not Found`, () => 
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

    it(`/REST:GET admin/bounded-context`, () => 
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
                        value   : '927455c7-af1c-4132-98d5-bc91f9286763'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '927455c7-af1c-4132-98d5-bc91f9286763'));
    });

    it(`/REST:GET admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/927455c7-af1c-4132-98d5-bc91f9286763')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '927455c7-af1c-4132-98d5-bc91f9286763'));
    });

    it(`/REST:GET admin/bounded-contexts`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-contexts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT admin/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '0b9479df-3603-4927-8a1e-a8727b22b570',
                name: '7u5log19vchtptsid2swpq2wacqg9o7gfckpe5iijo372lkl47614jiuz9ndfgheuuimbc7k41dpqj8hltf5twxyf1704cfdvqruz4vtlmzh9z86c3kcc28mr09i46lromcwizwjyac1xuln1sp36wnvezt2qpyz6b20h2760mev5gchne5ry2aruapzhh0u19eug10b0wjmy2e1423bao5v9wts81j7mcfzi8nn646todrwywkkhskyw91pkxd',
                root: 'zzbcltw4dt1o9o2msnvp',
                sort: 888431,
                isActive: false,
            })
            .expect(404);
    });

    it(`/REST:PUT admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '927455c7-af1c-4132-98d5-bc91f9286763',
                name: 'kebqdqo5v6d05iar8ujjkrp17nrllg1b1u79a458ul13lg3l535iavg22gy4stblha8h1u3aac2git36a1sjwjka7gvalabwekkq8sb6tx0xay8p5sl273hjeijtq2fq1o2llafqoz06jcesjujy0mdzjk4nuwqsc5vwf16hzf68uc1yv8qz88x2s2ywa5qhcx9opezufoablqxhhm4q6ukqu0govyyjm4fpj5hsoa2nqyv66h4f0depbnk669y',
                root: '2vqnycb9cc2x3o064c3j',
                sort: 817448,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '927455c7-af1c-4132-98d5-bc91f9286763'));
    });

    it(`/REST:DELETE admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/927455c7-af1c-4132-98d5-bc91f9286763')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL adminCreateBoundedContext - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL adminCreateBoundedContext`, () => 
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
                        id: 'df58a18e-2674-402b-8a5f-836ceaa11dfb',
                        name: '8ojlou2da28w43gxnk1u4edcnnihwbqako5ig97s5cj4kmwdjyphio32ah83eyb5fnmnycm1zdp3llgddfgqeaytcaczm7uwdtv8if1kpzfu9ii9cpi7evs5wxw7ap8bbvrpin5zoa1rv8z7rrbsj0ugguufivgqb2q1wtj21lhrbyka0khv3mqg78i7d6lcu99wb7jp3x5xu0usiqt3lvppdjqe1fx6gdhumof8k4emu571vwfj209umprssci',
                        root: 'jjq31sqiqu3h702ucvq0',
                        sort: 238443,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateBoundedContext).toHaveProperty('id', 'df58a18e-2674-402b-8a5f-836ceaa11dfb');
            });
    });

    it(`/GraphQL adminPaginateBoundedContexts`, () => 
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

    it(`/GraphQL adminFindBoundedContext - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminFindBoundedContext`, () => 
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
                            value   : '927455c7-af1c-4132-98d5-bc91f9286763'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContext.id).toStrictEqual('927455c7-af1c-4132-98d5-bc91f9286763');
            });
    });

    it(`/GraphQL adminFindBoundedContextById - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminFindBoundedContextById`, () => 
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
                    id: '927455c7-af1c-4132-98d5-bc91f9286763'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContextById.id).toStrictEqual('927455c7-af1c-4132-98d5-bc91f9286763');
            });
    });

    it(`/GraphQL adminGetBoundedContexts`, () => 
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

    it(`/GraphQL adminUpdateBoundedContext - Got 404 Not Found`, () => 
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
                        
                        id: '50c0fe14-387b-401a-8bb9-1eb5fafa9a8a',
                        name: 'a99a2wt7mgud0qgimvkheu531l6odvk1snj6538g052a758kndhmzgqr2y1fjbv6yp3m6v9nl3hte2mf4b78mpfm7dwdeem8ti69p0dtmgfydbb0ig4zj6vv2ogbo3rv00xwf4uc2wai7ir28rbyskzv5oz7zme88rvtbopz4nygg4dl1t79d9ckdans3yshw95v30dr4l1fzc3ygp9ans3xwfcfc8em58ywpow2wc8qqhqpel47fn1hbf6hwm2',
                        root: '9fhep6hw2lp3k39lzm5s',
                        sort: 942750,
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

    it(`/GraphQL adminUpdateBoundedContext`, () => 
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
                        
                        id: '927455c7-af1c-4132-98d5-bc91f9286763',
                        name: 'xxlel5qjhxvy6ygz67yp7qg6agxbolmyifix88t1frunb7ib30kvxburonjxzad75fiumd55m7914rgfjdcpqui9wu38aazn6j8ujwn1dkzlswf87rrxbsfz1bjbbg1wf0t911g7r9pbw1rb6z1guimvpoq6p91xcspsut2doz27o2x8vgs48na9zsm7gi893slcc38ezaiveqr3u42f74z8tiw9clxs7yj6tmc2n289erm7daf4kqrn64tlrmc',
                        root: '164ttzy0dfhqfsht7ezy',
                        sort: 196004,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateBoundedContext.id).toStrictEqual('927455c7-af1c-4132-98d5-bc91f9286763');
            });
    });

    it(`/GraphQL adminDeleteBoundedContextById - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminDeleteBoundedContextById`, () => 
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
                    id: '927455c7-af1c-4132-98d5-bc91f9286763'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteBoundedContextById.id).toStrictEqual('927455c7-af1c-4132-98d5-bc91f9286763');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});