import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IResourceRepository } from '@hades/admin/resource/domain/resource.repository';
import { MockResourceRepository } from '@hades/admin/resource/infrastructure/mock/mock-resource.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('resource', () => 
{
    let app: INestApplication;
    let repository: MockResourceRepository;
    
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
            .overrideProvider(IResourceRepository)
            .useClass(MockResourceRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockResourceRepository>module.get<IResourceRepository>(IResourceRepository);

        await app.init();
    });

    test(`/REST:POST admin/resource - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: null,
                boundedContextId: '14e8adae-7ae9-4146-817e-36f43618ad8b',
                name: 'yiv3no4qg812gkhh426dwj3scrutj76mxa8qcnmh4qcyiy6vuim485qyja7ygepjjl5w00glp714jb8cvszfzwwh14sp4f8xmu8qxsuzrwz4zwvmzcq4okv2f8ioort6p1yo41o9wgvwjr94wr64zu2okyycrabwa3sp4tuomuav3zphyqpxi93cd48gxncz6p0mitt79mfe3rwpngk1ze7fbl7dw5cdqbqf6pa59tjy4tv9i904ipnffxsspkb',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                boundedContextId: '14e8adae-7ae9-4146-817e-36f43618ad8b',
                name: 'pp0te41mzkwc3b65pnkul3bl6s48jfrsamllkbe0oylgfmgx2fm7yay7flafaxsirs1ru047akm1ibt22yxqwcgdb1tablbe5kdo40patjr6tllp7133no7mtngx43wcggxrpy095duksfmbn2le77ma0ovzlqid9selcsd01o5umpngtzl6bqlb2tjixurm25cbnfn2d4cu2ye8tttn3ot9nr3uyam8st0c1ovlvsj1r1aulpr9ug418m94e2y',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'eb375bd5-0f7a-4b15-b617-8ace4437c646',
                boundedContextId: null,
                name: 'ydtxswhbv75ids5dazxhzgwyjuui36bven6vqe9689w0d2ed7kwtcnbzui6r2kczr1jwn7cpku286oqwvrpxanqbz2ty2m3ek7cgared9fm5kahc67dxy9sxqq4v2h03j8fd188c87rk0u4eitz7gw0ll40r7yc4h3olgezzktutfw069gt60ylq478ky4iar3vdoc5g7eroizprh2yl4p4h7twalqxy2o5hcblxo8nqgtxs8mn6ypxhelgmw42',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'eb375bd5-0f7a-4b15-b617-8ace4437c646',
                
                name: '8apirljficw0s04f004az4vtdruf7mi15fijykcj7h7w6jkrooyljydve3ufu16cyccn6s7hh0p60zkdytn3lo20unnp7kouwmcrfknb4nvusvxgt9ktp1bzmrqzgmliqzc99uolw10qd6xk9vrzmo0efd6sg3l75in98cfyecr392emtuc19964arnyllbvelcovlcusfcr36b8977ydo58mcbln4t8xqf1jw13e82llst3iltq9n7bb2z68a9',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'eb375bd5-0f7a-4b15-b617-8ace4437c646',
                boundedContextId: '14e8adae-7ae9-4146-817e-36f43618ad8b',
                name: null,
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'eb375bd5-0f7a-4b15-b617-8ace4437c646',
                boundedContextId: '14e8adae-7ae9-4146-817e-36f43618ad8b',
                
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'eb375bd5-0f7a-4b15-b617-8ace4437c646',
                boundedContextId: '14e8adae-7ae9-4146-817e-36f43618ad8b',
                name: 'ozno3b4b0kxfrk8j30rzxmj266eabnq5cg43y3ubq0eozisrwx89r3ydxulhornjwptsqwyiw8y3p02bw2l3qgv8ed1omumbem5ot90z48sjcc9afi8cnadtfet08l6heikr4yrxt3we275nvt6iznyxk7bbla84owukled6wq3rxs04gn1jva8adnsan4bdne64hqyq6nu10pfqrut5kjerpypu88bl0r1b8xyq3dn67fllmpu45szfvofiask',
                hasCustomFields: null,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'eb375bd5-0f7a-4b15-b617-8ace4437c646',
                boundedContextId: '14e8adae-7ae9-4146-817e-36f43618ad8b',
                name: 'spwl3ck5nzmiy1ibhiqc1y1m4f4lw1vbaxwiu75umuhgeizzngah85xdjdv82wep6kksyglcnllwxyo3umv26a21a3s67dmv9xa5ysliz57cfmjz4zbzun3j3muoa8r0aicdo8d4swxbvdvqb3etna07apewzu8ejbvt85q69eouir3dz0a90hukfyk8b2leksd00ng045y1mp2qxhs42hs9r5pd2m0p43o163j1gkwx644dqeo64x540ab1fde',
                
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'eb375bd5-0f7a-4b15-b617-8ace4437c646',
                boundedContextId: '14e8adae-7ae9-4146-817e-36f43618ad8b',
                name: 'xbinhkrv3oqryn3el1cxqarcyj9e614w787r6sbb7kjmcy1h5a6zbz020qo8fa8sibyvrzvez32l4zsqayeopl5zonbzi3zbmcmke4eub7jlsxtkxomuqul3hfl1irkn29bgv19u6pdegszeyc1o3hx06bhopcibd9hksbw26uyr22i8owk6nkpcqodug39dn73l3ygxd9z6ursftbyaxrm1bv1qsqj58nf58xibmgkcjjtxcsbf79qydrhsnmg',
                hasCustomFields: false,
                hasAttachments: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'eb375bd5-0f7a-4b15-b617-8ace4437c646',
                boundedContextId: '14e8adae-7ae9-4146-817e-36f43618ad8b',
                name: '7b6xxc1igk7qd558zsodpisi29gt4p3qa6qqx5t0fv1txpjpswpzt1lqh9qngbvipnnhowkag3q9v9hb15ngkfze4iicmwkot8zbn52tu4rqcdsfxcz87xjvlg74h3488nxmsjpk0hfwwjepg8jpc8cbs1lvh1s2oiqeia3am00wpsywuyisp616762cdmpm08z7ptn44e00zhut9b1wlzx7qxtudt5oaxg8s9ufwg09zy5jxsa0cltfamqfqwa',
                hasCustomFields: true,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'tpzpr8f892mnld8ni45m4s4jmvtd800vr68mv',
                boundedContextId: '14e8adae-7ae9-4146-817e-36f43618ad8b',
                name: 'dw21su743q7mccc78oe82mrw7232wkco4f9rnrg5e6ck8b3hsapgglger4jqt517xgvswot9kzwqtcy9xgtdxx59fa5591xgih1t09j36e0omilpzox88ttnxo8dp11ywbwra496o8ccc57gzgng1mltu943cgul89kzdzr1yxllgfsml5zcye6rcqphguofo6z56b3xbd7llbzrdwnychvyilxriw80fz7nnkvtmapgbteh4poivkvq0htd4jf',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'eb375bd5-0f7a-4b15-b617-8ace4437c646',
                boundedContextId: 'ue7qhtjqbx9q4yr6baj5ejrweeb4202kxftoi',
                name: 'gmv3y6r6xxivdwi2zrg7rsshgbf97wp890i1at98hls5t6mn6c4dupclwfvperjoyq3jx2gkph3mimgrmn5durdpra0ljb1skfqbhjognmexqgrfrgxxnyc682uwsw4i0jyrjs9nqqsximvcr61gxb5pyh0fn2h7kmeu0k0wh2xy59hoxts59ekk2zk0issdkhbi8gxlasshghulx1hyj5mqfrwg1wtii2c36l9jckn1waye36n786149c4gjim',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'eb375bd5-0f7a-4b15-b617-8ace4437c646',
                boundedContextId: '14e8adae-7ae9-4146-817e-36f43618ad8b',
                name: 'fh48w6ryuztsaj102p10r8nosjaj8wo65r7hjmcg0l491btgv0dhfxpjtie6oh2zln5qnllzc77lm8nm6tiy60i0jw5v2ublxus9unr3b46k1tl3kpzgjqwu89ocp3nf9c0qe9onu2ecfo12p5rj177bd9tkj6pdkkj033lflxlu7v15rr7cp3pk5h4cqe48fxlt945wifagh33d68oq347g07jlcjji6hdg3frphkei8cyjj8epl9i73vaxfu20',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'eb375bd5-0f7a-4b15-b617-8ace4437c646',
                boundedContextId: '14e8adae-7ae9-4146-817e-36f43618ad8b',
                name: 'dn19o0zixa7h1qnsmp3nty0feofi7j1afkvpvaz2ppnc7pjvkqn8lynp5vz64tccw7p2fwzkw76b9hwwos29iu9dsmeemm79p1r5jgtez5o5dmlcv122pw1exq2yv5kmf026yf8yq5r77ru5mirmgxr34efvdhr0bgrjedqayih4uyyl3ntmpfmod5o8p6nnilo8xo36u4tqkj0r51h1c24otjx25bvf04srjna66yfhr87a9qxi8zdn2y587g9',
                hasCustomFields: 'true',
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields has to be a boolean value');
            });
    });
    
    test(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'eb375bd5-0f7a-4b15-b617-8ace4437c646',
                boundedContextId: '14e8adae-7ae9-4146-817e-36f43618ad8b',
                name: 'a96z3cti7vi86gcfcgmq0abxqc1mpmgxu7gqv6mqibo6c0ljrtxempcp8u4n6ohojh6vcwpnah5ngs5zwhkk4o8z15dzy7udixnjxgwsgn917jvi8eoqlxhlmklmhtxv9jkjrymlbr20zkh5npj8ueqeofz99aogzi0hysfibkhicajmquddd4smighzheqooktrw3vg7gqa5bp0p0mhny6mndhhbcovra4vtrsd0xkjut21ilt7mec6f6rk8nw',
                hasCustomFields: false,
                hasAttachments: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'eb375bd5-0f7a-4b15-b617-8ace4437c646',
                boundedContextId: '14e8adae-7ae9-4146-817e-36f43618ad8b',
                name: '35csvsoze08y0vgkadt38tw1swdod24qu4rgweavnr4kbut45d6y99jajly46p7l3lwv9j3dtyawml0hjt2p089m2h2k12sdke3sm7tv0h3ylwoetjl6bya5xmhjdqmqye2gryjza522j5tjo7ntqlx5h5tnqah8u5tczkhizerr9dz5w9hwhyadglmhj3kmbkoodqwo70mywpsndxdwgm95jinu51916i48xzmrqnfapv1z4m2cax4ftrcp2qd',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(201);
    });

    test(`/REST:GET admin/resources/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resources/paginate')
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

    test(`/REST:GET admin/resource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
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

    test(`/REST:GET admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'eb375bd5-0f7a-4b15-b617-8ace4437c646'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'eb375bd5-0f7a-4b15-b617-8ace4437c646'));
    });

    test(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/eb375bd5-0f7a-4b15-b617-8ace4437c646')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'eb375bd5-0f7a-4b15-b617-8ace4437c646'));
    });

    test(`/REST:GET admin/resources`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resources')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/resource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: '9fb1c42a-9170-420a-8dff-4f8291c54b6e',
                boundedContextId: '28f64151-cf11-4c6a-930d-01f101edc45a',
                name: 'eti91vnxrgj8pwqgne4w9nv9sa3ltskmf1g1g0418td6ftu4q1eagolymtufscehglopzw9qew6uaxtr8frhxrxkjnk5thxhqfa2oypvo64vnx108np4i59tjepmf8vs69dicz1rlyrveekm7a6hwdifk0z259cxatscji8crmsde4dt2tkhy1whqb3ri0xl3p9uglwez12zvl4hly0kdsfyek5kk68vpegzf7aiaw1tvkef20j5m0fec5e0srf',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: 'eb375bd5-0f7a-4b15-b617-8ace4437c646',
                boundedContextId: '14e8adae-7ae9-4146-817e-36f43618ad8b',
                name: '17xozgcmt3m7utushd2u59cfv1uhraaj720wfaxx446cgw659rsw0ok842sawqk8rjmw88tgfko6ave100ulk0t17xhb7fut17l657d3kl780oq7ef2j062zrofndc2rsswgjydjls8w4425r6widnop102jp3shxabzq4a1v6gngvc4h7ana2y78yaadonfcwmyskhfxlftqsku8ukwh1y1605at4nuw07ppewiwh8e23bs2tqg48x2ox6agyx',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'eb375bd5-0f7a-4b15-b617-8ace4437c646'));
    });

    test(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/eb375bd5-0f7a-4b15-b617-8ace4437c646')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateResource - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateResourceInput!)
                    {
                        adminCreateResource (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
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

    test(`/GraphQL adminCreateResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateResourceInput!)
                    {
                        adminCreateResource (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '19f689c0-ad49-459f-9ea6-1b937b44fae7',
                        boundedContextId: '14e8adae-7ae9-4146-817e-36f43618ad8b',
                        name: 'ixze5oox5qsg3wqgb9jaie6te2mkfrvk7m2dewta91kvs31v8mzg1lm8h3261bcguek7xd9ahktzkgh7fcesos8a61kl151whcg8jgknqi1eu5til2wpgy7icsz245gbszc3maektey2bib80natv60bq8bc15yhmsvt0yl9z0rcez9ndi6x36z1asq9zkz4h7sxhnmqpwba70tk5s7dzt7lin1b7320rdu6x37y4re4ifkd7ly7ts14hy2g3bu',
                        hasCustomFields: true,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', '19f689c0-ad49-459f-9ea6-1b937b44fae7');
            });
    });

    test(`/GraphQL adminPaginateResources`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateResources (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateResources.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL adminFindResource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindResource (query:$query)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
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

    test(`/GraphQL adminFindResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindResource (query:$query)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
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
                            value   : 'eb375bd5-0f7a-4b15-b617-8ace4437c646'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('eb375bd5-0f7a-4b15-b617-8ace4437c646');
            });
    });

    test(`/GraphQL adminFindResourceById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindResourceById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
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

    test(`/GraphQL adminFindResourceById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindResourceById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'eb375bd5-0f7a-4b15-b617-8ace4437c646'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('eb375bd5-0f7a-4b15-b617-8ace4437c646');
            });
    });

    test(`/GraphQL adminGetResources`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetResources (query:$query)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetResources.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateResource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateResourceInput!)
                    {
                        adminUpdateResource (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'b307e0e6-2404-4019-b923-711f3e7de57e',
                        boundedContextId: 'fd6c12c0-5006-434e-b9bc-d1ef3eef5ed4',
                        name: 'mm6dm0fq4ojxd5xgi7g2kstfi3okai5tea6gv4l5aurjp6zsv71w876l5xjn3ay7y1uft4fibj6q0rlf0tjnzm723o05m4ymkla3nm6opj0bjgrhk3a9bomndqr685xlyway4yh3fnods74q85u8qm5bl6t1aw5cf0erkmptb7ufopg71lu3yd04pj1t5wjow5ehnsstlkf2wcgs165ch5okwh6kohe6smooddr6g40g3ydzsnmhlwkqows9c2h',
                        hasCustomFields: true,
                        hasAttachments: true,
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

    test(`/GraphQL adminUpdateResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateResourceInput!)
                    {
                        adminUpdateResource (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'eb375bd5-0f7a-4b15-b617-8ace4437c646',
                        boundedContextId: '14e8adae-7ae9-4146-817e-36f43618ad8b',
                        name: 'f6rw6s7ev4z0fvujqvegkx4xomkvlahd4s86jm073omca6ktpor2zd6bp5blwky7z9bcqm9wrs435vqlmtwz80lvphpyviftwqe7myvet5j343nj62t4atg7izwm3jwm0bwb1mowj9lw91jfyi9jxu33hzavfdseeetwjn46seprq0h2ubxsw463q5j80tfq0qoequgyb0sxyi93gy3x0ojlw37oj1027era7r3d1r86bwkt3427kvivdsojpun',
                        hasCustomFields: false,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('eb375bd5-0f7a-4b15-b617-8ace4437c646');
            });
    });

    test(`/GraphQL adminDeleteResourceById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteResourceById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
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

    test(`/GraphQL adminDeleteResourceById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteResourceById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'eb375bd5-0f7a-4b15-b617-8ace4437c646'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('eb375bd5-0f7a-4b15-b617-8ace4437c646');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});