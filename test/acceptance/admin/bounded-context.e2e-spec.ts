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
                name: 'ix9dk033ammbn7zazz13iinsxzenxey2x7ar43o4ljkrrwxpzw2pbqj4pcd4mp9ceqaybrs2b80286x37gn17xw011wkmm2jbgtm29hjsy5ykgq1fptb2hb7jvechjn90hbiuw7rgos6jbspgc2cimk3ga42vtewg4hbuk6l91xoshkivo9fzlmiptd9zzj2jmg045kd18jhwwos1yr5wf54tgz2ipcz6c6ch672vqqrw6vu0x056xbzoiiexf5',
                root: 'sm4j6zgavn5q8ftpewcs',
                sort: 757131,
                isActive: false,
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
                
                name: 'hj20pjweeny3pa7x5u5jv6ngpgpzwna6a5t6do87fwim9d2yducafdcyj1q4m299byjp9ag72qu8o9kgtv84n4as9mp0ckz0w42ye95pet9supm1h377a7fo9q87icymnbcailug74uqvvzfumafg6iq0p8zwnlts7n8ps8lrk1wdefvxqkb72zwm8io8qgjj57s1mq1wfkefmxk8040lvlxcgh92eovvpuj8sp6gj9n9bv5nm3ewcy8stqzl5x',
                root: 'vtcpwzwa7u68qchihzak',
                sort: 250103,
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
                id: '2d9a6100-8699-42ea-82b3-6b87f096d0bf',
                name: null,
                root: '3tv7bmqxjnomfecz030g',
                sort: 499620,
                isActive: false,
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
                id: '2d9a6100-8699-42ea-82b3-6b87f096d0bf',
                
                root: 'j2yyim0ikm4o9dnoyr3k',
                sort: 883541,
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
                id: '2d9a6100-8699-42ea-82b3-6b87f096d0bf',
                name: 'mag49t4cnvf1haf9qdsz7n1zqde68l3buh63f6ide6gh4im1wnp7lb4uvhuxdoz3p12qplo0zqb5ectblwalrtdbyi7x1s3k4w99plmq3fcfmwtvz0mxlnn24emjv36go7x6vgtcgi0svy74ogzp4ierph92r2rmvb5dazr5iavk3n3puxte2f47ljfwbksbgxt9u22topi894efzh0aixjpd4cnwfc5t06wd39e810p87mks8m7jx8j8samm2s',
                root: null,
                sort: 172351,
                isActive: true,
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
                id: '2d9a6100-8699-42ea-82b3-6b87f096d0bf',
                name: 'saywq2y81hdtumnl5z8hd006burotr1jyjvwxfyg9bhhtjav0xakc4yvbz2z5vli9a5o2f9zmz0zsdy1v1m922bnx5re7wmkqfg54oba9g2eqct6ipu4mtfgjykzkxfm0ina6dhvtdc7gv4djcracvfcx9y1ctrx0murmmor3vbifsqjhp4odt9ixs4q839y8t3hrxk9361i0xp6xyqlqlkmscs0xr6acmkshagkls4vkkc5htg8uhlt29vd6om',
                
                sort: 609871,
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
                id: '2d9a6100-8699-42ea-82b3-6b87f096d0bf',
                name: 'uv7b4x9e7dlfnr30ryl7ns47piw3ywo4e6et1pu3o8crc9e3hzbd1bw56khdhsofbce4zmb4fvwkfx2mtp59s5u55cgzd1ssgoqgp9tuzu4b12mnj9sy4fpx7f8x84uoo5gxydy8ej5fnlpmmqw5qkicnzmfh8rfzopzh136wy1rxnsnpnme06yy0zqqwnhro7rnee3h07p8dj5stxks870bjmm6o4hljmc3yakeo503wq62aabw2xs32n954qw',
                root: '1ffxgujuw54ybpp4qkd4',
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
                id: '2d9a6100-8699-42ea-82b3-6b87f096d0bf',
                name: 'dqny81fhxzvwh1b2im09ptegnzghb0wi7s6ixq1t56bf42q1jdhtk9j29f0z3dowuop9etzcdzjv1m6j7mofi4orkd4qc9zq1x6pxtmamc4f66uvujvl8oq24r8u4l1cmv7yruego1yepxoojqzg8qs76xwf8th6yj9twhn98mac5dnu0q7a92pqoiua6a1rlg1h6rwozcjc9y2kts530bz301fdpa18zckqt7d2ixu2uv62mgshdie6xtb3ebe',
                root: 'zcmuyvngwo3keij7pvq9',
                
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
                id: '2d9a6100-8699-42ea-82b3-6b87f096d0bf',
                name: 'mplctfyuis8qucg2qsjraehwy268jerjd6cv4s4dov31js2nqc3smusk3a0kyqd2bqvxdrwz10znttv6ewlg80fpxdn0u13e8vsjl77atz27l1h8mzws8cyz85jz4fl0nxg93494sgkgy3b9j19bagwuexmmsnaklra77k93ux0e1xppcy8yw3a1i9fn6tyuxl3wke166rrjzitrddz3sbrrcn16grad72j3xntyybje856uuwdmwbfkm4c2xxq',
                root: 'fh589si8qulamh9mh9ie',
                sort: 493297,
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
                id: '2d9a6100-8699-42ea-82b3-6b87f096d0bf',
                name: 'v9pxnuf42iytiiqf7vajkpv384j7bj52y04xhdo1pun5tr6v6z6a4y7bn5x59s0u2javk8e1k0l0h0goiuk9k4m9vrcv1alor502jllih81nlu6l00rsdpek72dkrkz81ul7wgjsl5ur0kf8tp2njc68r9oyy586bhbvazcg2cg855gd05bgivmbj7iny2zcnbvxwocc7pd5m5dpwkfrijg7a7v0rykmq3789mgprzyybzjmt5pg1gr0riycjpv',
                root: '9sfn4pl0upszqlnn0k84',
                sort: 952381,
                
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
                id: '6a33smt57lcu6d1kbx80jkhgczs58q78ha4si',
                name: 'y1ekx3wwzdagy0g79mvj2fwvis6ypn4oupnndvqqf57skwwnmerh77s9qkuew6czbyinfffiuanpz5tmep43en7zgt3m9sl49t3byc6dym1g2desz4izjr3zw2rgadt31hlxloc9u1414d2qhgsho85rjt95qgtdk8d0gnud90509cae3a2xijvr80viylr63ojpy8j288gxag0yfs4c9873hcww90zzecpl9itqubnk4s3pgeweobibrqjaqa1',
                root: 'sh7pbde9n5jscubxk2p9',
                sort: 451155,
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
                id: '2d9a6100-8699-42ea-82b3-6b87f096d0bf',
                name: 'qvulk08xo2ohwem4daeucbrrxw4ycur20wd0bzw0c7bbknki6ml5besvqnmeovhxx1ss8mam1t5z1b17c9ur68qhax617nltrbk2o9l0fxy8xecf8jdlzz9cinjqt6nockmdav9rwg7a6aac8z7oll3jd7kxler1nlyn01gd8vscj8uah6v6u7y8fde9ku3gr4fj1br43qjowh6pwqwmtar9t8hvcemgy4osa1r38yb3pbqylphpuhpxzwnzy5pl',
                root: 'vcymvhae9kxa6owqczdp',
                sort: 496016,
                isActive: false,
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
                id: '2d9a6100-8699-42ea-82b3-6b87f096d0bf',
                name: 'yi8e2u4yslm34bkjxvq4zoia0b1vs4k6uexxx8dxbl3jalufznummjxebdt9lcky8if9joo9gbcimsqcf25kazibuc94hdz4f9gd5mamy47cd44fgwtu9f5yf4e7o9z23fmjjonj9eg7y1njo6dniv9wussaxror9wc5t6rhrixwhan2tl1dmruu98vu6zqxrs0ruvtsyx941iur2a9538u4fdc0q3clr422w2fzn43d3p195p73b80rsz8ex3s',
                root: 'yqau67cpkdm70byhe0eyf',
                sort: 631958,
                isActive: false,
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
                id: '2d9a6100-8699-42ea-82b3-6b87f096d0bf',
                name: '56mrm3u3lo4pvpq14r491i9ky2bopuinh37i2abeud7psauw8b01syzf3u54c74rw9wgivzn7b20boz1xph63it6grr7m8c7wag13ckvuosqnu0sga8lkptls8485azfrw9ltzc16nysxvajy5rplhrdeva456js1eg8tzqxnl10wnqed3ucc9lk1s7smsai39qisu12oulqu5vk2uw24nnv3tztlrsdo8b2caxvi91yfqvru7elxzw6ps0mbrz',
                root: 'oiigqgiqnfoudnc12avh',
                sort: 9108971,
                isActive: false,
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
                id: '2d9a6100-8699-42ea-82b3-6b87f096d0bf',
                name: '9o5bq73cilrtoh9ptjgod7lptozf4j2mo3niqv3a4jo7cps1cu4at44mun59rs69kc39ggr4yi4s7lmkrdzzg2efr7bl8zp9atnt4kv7dbf4kqpqvbtrc9lg1tk7j0wbij8xkehomzszky2pdzbvlw6mb74kdwzx5r3doccmjhqe3l8xtuvhzd9j20segva3qtw1v3l9zqm5tjyiosv6bowtp3vqqoghyfu36un4o34jkt1e36wps69dpap14h5',
                root: 'ba0syxw4nbvwaye4kzwg',
                sort: 914389,
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
                id: '2d9a6100-8699-42ea-82b3-6b87f096d0bf',
                name: '0l1wc06bapoyeyi6sk36fyz2tdbvgz2dzlc2nf0chowketgzaprrwv5e347lwu4lpbccmsaq4j3b962loczjt3enoutnelju87gzko2xgzn8kdhdlnybjnkifec4i5potx5a1rlqzj9xwo3lwnawreg30aeda7vvmxq658pjq72z6w5sg02mw4lylh7vtohx1n85gkd02l6ootovg4yrmlbgfked1mq89lawh2y0rxh9c6p5q5ylp3ixx94l4i5',
                root: 'ftqzella01mk7xwoe5iy',
                sort: 463123,
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
                        value   : 'ffbadeae-260d-4816-9489-19249204f02c'
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
                        value   : '2d9a6100-8699-42ea-82b3-6b87f096d0bf'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2d9a6100-8699-42ea-82b3-6b87f096d0bf'));
    });

    test(`/REST:GET admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/91d5ac76-678d-4621-b837-ad010f6c50ca')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/2d9a6100-8699-42ea-82b3-6b87f096d0bf')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2d9a6100-8699-42ea-82b3-6b87f096d0bf'));
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
                
                id: 'bfb5c8d2-ab2c-475c-aa0e-d01cc27b7e44',
                name: 'or9m5j6408llxevwnxe5a0iuz4aippkihqmmadbl1q3xm35dhyrienhigj70kirgr5oxintntstyrcgk4bzxni0r91y5hm8p4bg5ny9fz413qcdjiglmht9kn1j55ind9fcl2i6j6zk1hbiihmktzxjo3yw4ix09urzjo7eezvl580nkf0fqebxcfwkhfl2gvzbxun5txeti0rc6d8i9rs9t77snpo3zyxskgyg93lguhi8k00id5nnhzyho1gd',
                root: 'z2fde2pg0tibf3fvnrh4',
                sort: 498793,
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
                
                id: '2d9a6100-8699-42ea-82b3-6b87f096d0bf',
                name: 'uroqn4zci33s45iopjupod889bekacy45epv1eoo6rsrj4pkt0slrmyu4tzcyccc62uvj5w2ficvrjp9nznjyvak66kg1ltu4alrpad43nbx059jcn39lnqfg6zrw8xmuo1pce1z6180z93wiapxx1ne73pjjwyjca7lwmsd1zjtjba18t5f300yzfcsvf90d2ajamfg36i9pw1d73mela8cirvnxah0q5izltgjx1e9sc15nv0tulasf12gn7c',
                root: 'rz26ht8w06xeam4zhfdr',
                sort: 284203,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2d9a6100-8699-42ea-82b3-6b87f096d0bf'));
    });

    test(`/REST:DELETE admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/6c899a5c-090e-44b4-9a54-c7c038bda8f1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/2d9a6100-8699-42ea-82b3-6b87f096d0bf')
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
                        id: '401d96d0-2931-42ed-9186-35d04060693c',
                        name: 'juxt5r4obk3vu0tyug04cxtu1tf183uorm4c772ye9ka90dauytzy8p6o5knaoltnajppl660lh7d7ly7tfuaim36uz5quy6kmkr70t3yjagb5j9xbutkvikg77w8zigp7arv6r356izeyl86xc87i6u1ez0e0lqfbthdq7m84zxjyy6ng8sl05ypeshti1zxdzm5eswak7g02kmq2qw1mkhjssz8awpv7cyfezbr8s5iw4nu53tsi1t3k2zs14',
                        root: 'obm7n15er1udusawjibc',
                        sort: 903917,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateBoundedContext).toHaveProperty('id', '401d96d0-2931-42ed-9186-35d04060693c');
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
                            value   : '66b7dcb0-a182-4f57-8877-a82741b72c47'
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
                            value   : '2d9a6100-8699-42ea-82b3-6b87f096d0bf'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContext.id).toStrictEqual('2d9a6100-8699-42ea-82b3-6b87f096d0bf');
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
                    id: '24a91db1-742a-4f91-897a-837ed57f87ec'
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
                    id: '2d9a6100-8699-42ea-82b3-6b87f096d0bf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContextById.id).toStrictEqual('2d9a6100-8699-42ea-82b3-6b87f096d0bf');
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
                        
                        id: '8593ec09-f4b2-4224-a9fb-a05104b51bd9',
                        name: 'zd8nvun3vjfvkkekwl1p1u1l2bkznra6lz0um1zil98fw91zvze87vaq3k3l4dfyyoc1vlikq7sx3ni6xkk95dkjxpzhknxg4hmewgq2j5lc90djlp478o8bwoe7y1iu06jxzfzvcsl86uf0arujb1bmd96n4s3gd7am9k5vxaijz65cirjajdiobeqkig000dzuxqa70lgsxdnru94653kqa5vjbktg5zjkuyir85z24hl1zkx6nk41e96a1mn',
                        root: '9q6vw31oxqjrpxkosd67',
                        sort: 959376,
                        isActive: true,
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
                        
                        id: '2d9a6100-8699-42ea-82b3-6b87f096d0bf',
                        name: '4o2zma5j327p44m1ivjypf6trd3gtk0qge5bmilc7eg9if4bpk3yapabymvppftrtxhl6h4ml3u5y7z3tygzhfldedljb3jx5pxq0t8nipoyc4d42ig90l98qi6yx929cmo5twayw7s35om0ulcy8jrk8kfcyljxiobm3k4vqjfmdflgtdkfyvdfua70ia1fpg1jl3m202arz6ga8s0t8o9eq72boyf4smgmri28rxt5eo2e35zvkw76ji27y4t',
                        root: 'x9xgpie8qszpbmvt7046',
                        sort: 248145,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateBoundedContext.id).toStrictEqual('2d9a6100-8699-42ea-82b3-6b87f096d0bf');
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
                    id: '1ccd50ce-e7c0-4836-8519-18cf119335bb'
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
                    id: '2d9a6100-8699-42ea-82b3-6b87f096d0bf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteBoundedContextById.id).toStrictEqual('2d9a6100-8699-42ea-82b3-6b87f096d0bf');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});