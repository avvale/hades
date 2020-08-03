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
                boundedContextId: '6418ef3e-8d2a-4555-a5a0-e1e611036456',
                name: '6fo92ajk30osz3qa2y66rjjwtq0f3hyvzi5luyberwzg6g17mrk10doyuciumv63ch4v41afnsnw0bz7hb6lbjs58vvuukn2nmyu4bf7hkamwwk1dufhsjh1osbbyo3rob9jfn910zzbey4rdsak2p85k4eu7tivz371l4yva4yb4027maqg4lems3h9y05bp9wt053j261g7vm6rrd86s0ctthybdsah9oefddcovx2damyzo539x89pbfamss',
                hasCustomFields: false,
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
                
                boundedContextId: '6418ef3e-8d2a-4555-a5a0-e1e611036456',
                name: 'r6h0dr8mhuq3bgu28jqqwxlf2nwaikjab4oz53bk56za57ipzljeauiccwyr47w7hntrmmetaqie3tov42qkd8azb9i6fd4ziq6ro8i3lmoh2kfup1ztobrsi4v9xbjhbhg3kvgar0oq8gspz7snt2q0xsaeo2zddeqko9bwj8swtg00c9kxyu1djwbu8tl6r7r8t6m2f7inbmmhat7123qfmonjpfvg2rgtup3gc7p9romply7h4wb3ugvvwjx',
                hasCustomFields: true,
                hasAttachments: false,
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
                id: 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8',
                boundedContextId: null,
                name: 'fda6uy7e5yb19w2k2oyxbnwp2dnj76tzjco5lb8gbyl0kv6msmuls2skvlx7jsm9h3ehrt3uei350a2kf5wc0mxi1p8g8gr4xt580j2ymthnz6cbz9omvnalyxij7rceb6kav4nn12rr8x0hz4j3f8eskbkflpm6h8zm72rhytvd1f1m8vaueltcaz373yvjrdyhtagie8jx6fhfe0vmmt6741mjyl5pel527h0392lh9gtia7jktkxpo2n5cry',
                hasCustomFields: false,
                hasAttachments: true,
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
                id: 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8',
                
                name: 'ogrya0h48syutmrh65klf2hfm6z2epjtk18bje6oumn4bi3zgnbivehvfdguc7at1ol9lgpkkpu1axu5g92rd37egexxhzdj3cb8mr55sgih77tsookxoqbxcj402b8hriigp571p7df3dfhv51rvt4oo0rqrle3jsdfx42k402y3gs5ikscouwq8z1w1r7whw7wiu2d81gswv370f49m67ychfkmy7wr5mto87vmpk0j81tch7bte7zf7e5eb2',
                hasCustomFields: true,
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
                id: 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8',
                boundedContextId: '6418ef3e-8d2a-4555-a5a0-e1e611036456',
                name: null,
                hasCustomFields: false,
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
                id: 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8',
                boundedContextId: '6418ef3e-8d2a-4555-a5a0-e1e611036456',
                
                hasCustomFields: true,
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
                id: 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8',
                boundedContextId: '6418ef3e-8d2a-4555-a5a0-e1e611036456',
                name: '0l48u3fllu46saycvnonkauywjfmqf5tlg5g9yfzg3ijims8tzjboogoktg3a3toly6yrmy2wuorxu6iubyw1j79ra8qhzo4jleeoettmtv7r24w314wmplckln62dgkyiuw0nl8ixzszoe6hzt7sqmvlvgce2xo2lbyprn61ww17x2kkto7n4z2j1t4kdalucspvlyzlkan6jfv1s3ss14cdib0uoq15efwvj84uxk07emo99k5ivedti24nu3',
                hasCustomFields: null,
                hasAttachments: false,
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
                id: 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8',
                boundedContextId: '6418ef3e-8d2a-4555-a5a0-e1e611036456',
                name: '12d0rk3v46a7ji23nhv80ezng6k32u6beav3656dcxinqeanr5c3kgum5yn0zhjc0h8gxtpkmi585kf0drpbh68bdxw1pohnav6nqa973rnmphuxt9ppjj3ys7xm5kki1servsac5ngwz02ozc295s07z7l40583ju8nu601y5frrp5pvozbyv5vsntkhf06klgdyfc89fovp8ykvns4flq7ti18zmg86pe6rmvfzjqwr0zqoy3xg34irsqfee8',
                
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
                id: 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8',
                boundedContextId: '6418ef3e-8d2a-4555-a5a0-e1e611036456',
                name: 'ot1aqyn0zipasxrgisqj2c6hwo8f93tsilt3k13vngwnjxms5po0eugkkc6iqk28lzrog26o7q03bx90pm2hxh9we9lows2h1medl8gs262wxleqhunwcn9nscc2qgujrcfzk2tggusgdg7rhyow9kbeqbgzj56bfuc2365b37pj5nvlv7dym6a4jip1qmd031fh0d2yenrqxhp6s33fyd9c8aqdm2t11rmsyg6ywq12yeicf94omjjrelcd7rd',
                hasCustomFields: true,
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
                id: 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8',
                boundedContextId: '6418ef3e-8d2a-4555-a5a0-e1e611036456',
                name: 'pdjejkz5mr1h5bhbha9ipt8n4tn0diyb3v3tuk545t1orn73hofmpvd2w9fzrafs78x4rm35j2q5s8154qja0nbswhj0oc39klyu78r6xz88b0owb4jj76y6blcezdax8lc17l0575sq66chy54su5sghv3ht0avunsu358hcti3me382s57t6ph83w7i1j79hdi98l0tpln0p9axm9mu3hjle2g6tza5qw4zktnzgrb2619cusr53rxu07qiw5',
                hasCustomFields: false,
                
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
                id: 'udms6ksiy8jbxmzm0inuc6b192zoqbatabxjc',
                boundedContextId: '6418ef3e-8d2a-4555-a5a0-e1e611036456',
                name: 'p6i10w0jy8pa3r8kxfs835m16rctajy422xu1evbq9r3kaedp4sgy75zk2yqd0ql46a3lbtssq0drct547zo2248wjl0oa88fr29k0kgwsr1lvrpzpdghs6z9zjsf6uz0dbm6eb9b3mwgoy0vnbjs575tdii7dqwzx4tnwatb1o6wq4xx2fjxssqs9f0fkxcm4xufzz2hwks6vdcvq1olxsphq11xaprehnupjlkuvf5me4zsmr7ukp7vkmmc3w',
                hasCustomFields: true,
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
                id: 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8',
                boundedContextId: 'p0zxh8ossq8n5seree9rvyh4x9ogbg8ry7e0a',
                name: '54awi8fopxb19hxw0xxddzj3yencxelox9rnvcxbzcpjftmcuk8u1oyze0gfeap9noj7zivzk5anicreoz4k1nlx6ez9adp2e8r9obosmsu8lfianlm3mniv6ck3j5nmskdtfaa8m2bk8evywd7h0zovvyye5s9dyfvun36bymt1xybf0nb8zei1x6odrmynwxnwd7vc3ckydmomvraoj1wvm8msq1a85mv7ya2vndq7jiojbb3rhkamgld34ok',
                hasCustomFields: true,
                hasAttachments: false,
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
                id: 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8',
                boundedContextId: '6418ef3e-8d2a-4555-a5a0-e1e611036456',
                name: 'qk4hl3ygttsahnrxrg0jtxaitwh6avmw3at0udqcfogxkrprbk599eyldjt030zk21vj9ic2e6i7xkf5ps4y2q0grc38f5dcde3v0g7n5rx1gtblc3liw2rhu4a9doh4eninwykxxl51009bkyo3ydneet4luswo4pqrql2fzzvupzgc8ynnpz35xrcdzcb1bw6fiv2opgh3dr8yl1v4og2pkvtb2sca74kcl3t6itut46b7ep3haknz21trix7o',
                hasCustomFields: false,
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
                id: 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8',
                boundedContextId: '6418ef3e-8d2a-4555-a5a0-e1e611036456',
                name: 'lr6xdz0y1zf740bxfhj7bvci0v1ub5b7hfnsbyy2gjpp0rijltjyp7cemww3ehu2d17jvz68zej57zfc56wgnvau1w2rpt1wd4wjzqt0lkxrjf5kk8257rii760yagzvb06affo18cxiy4htnd59bnyxppcwe12487o67zw7526l7ziss5efyhekvxyb0czs5nb3dh1ln60d9h9g33ly8mrwhj812qb0tiwni6h1tuwk2o7kxx0yt35bmdwccrj',
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
                id: 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8',
                boundedContextId: '6418ef3e-8d2a-4555-a5a0-e1e611036456',
                name: 'ne90nh1h50kzq2d78y81t54c148476mgiw8hnu4cjxmznari2hesqjaoxqevl87pqa1k8s41h0sgf0wdf7nqhtoq228yxsi415z00znx4pa2iw19wphba2blbpbfbqfsy31hrti7jkbklbqhr4hz7q4nz4faynf87j58i51cunakqc4v95cfqcw7pg19pgr2lgkiouykbinec6gkqw7m65xkt0w7gvv62k5t9uh3pnu3ayhu5igh8hi1pd4xyh0',
                hasCustomFields: true,
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
                id: 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8',
                boundedContextId: '6418ef3e-8d2a-4555-a5a0-e1e611036456',
                name: 'z01g8jits1z5upecgb2fs68l0rmr6cz8u6emigksnvjp46y1vq2kck5slakqbaa1dj2pvwwaxun49oh8gz8g2ap3b6z3qknzqzmvehjsm7n6fpjjvbafx07jr239jvhfs3bwdnhukpuvozgsd4xlvca82q1v2nfacg75bl6pbydcu4d2rhczlyspxsmnf48naksrt1d8ay66xwuqbx160mq1hii04rss4jzg4rnmthq02111mlmfess4we42gf5',
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
                        value   : 'b6cc838c-2f6e-4a5f-8ef2-8afb48919bb3'
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
                        value   : 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8'));
    });

    test(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/4e482f37-a65e-4a64-9176-239228a6f73e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/a06e9d16-bddb-4f2c-b9bd-4dab319949a8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8'));
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
                
                id: 'afcf183c-2d10-4efb-acd6-35f612235d30',
                boundedContextId: 'd24e4a8d-239f-48c9-ae6c-c3536ff69059',
                name: '2cm8u7sm7kh5qlr089i99nfxgljnmlckojpb39dzv7750mie1j8tsmk56nldxe3y9nvo81xhzo25sonj2je2sh18gdy2rszvtg1etuormbmbfyop2cumjnnkukrk23n5c7yrdd6ovhs0su628l0kxeeh4sypitrahynaqtzje4w89xmwcy1bklr5jl06oekhj2g4wwoqurn3damw8rhzkd0wxck7mehpyu7m93falorbdpwgwhsi4ltvrl3ww8a',
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
                
                id: 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8',
                boundedContextId: '6418ef3e-8d2a-4555-a5a0-e1e611036456',
                name: 'jil4dnhyhnd7hwl7ida02w32hn0wgdc6t4vl57lg7klrfut1kswtfkeokc9mgt0zcs4kkke5v4ptx28stz1b2lrc0kxvf4h4q81z6nw6iiog0smri8wicucltg514zz8bk02hsuiljknyj97nr1c9aexuj5xopgrtmta3mf1xb4xve4lldzqyqefkdf0awu7q2e6vzmwfnrjjeldxy51salcxr0iidsy3j9nasqvherharj7wgzlk531r3ub4tu',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8'));
    });

    test(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/9cc59d1d-02a4-4dcb-be1f-8572128ab52a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/a06e9d16-bddb-4f2c-b9bd-4dab319949a8')
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
                        id: '1ec8a4b8-0fed-4b0c-b342-c7de6b47700c',
                        boundedContextId: '6418ef3e-8d2a-4555-a5a0-e1e611036456',
                        name: 'w121cspb95unwn9fxuyuwhy8jczdurjj9q2ut825acakt5d7wdjzx3ubhu6cbty03o9vieqj7kynt2m8ne74h3ct6jnlm6ajmni5uo7l57gvaeoomn736o9k86vzmialvwb37g5nti9iof03dk2orx0ndsmive70fp15xit78s3qdtzl66utaf5c5hvkfr88gm5j2a8gxx6bpjzfcvgr5y7qxqezp6z423axp4z1j4l3o4i73tb4fa1joayv5x2',
                        hasCustomFields: true,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', '1ec8a4b8-0fed-4b0c-b342-c7de6b47700c');
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
                            value   : '190b845a-b5f3-406d-bef0-2859dc17bda2'
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
                            value   : 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('a06e9d16-bddb-4f2c-b9bd-4dab319949a8');
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
                    id: 'd94e9406-3ef1-4f28-a0b6-27e1f4b468d0'
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
                    id: 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('a06e9d16-bddb-4f2c-b9bd-4dab319949a8');
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
                        
                        id: '15f90941-83ec-4267-a1ba-e99d114e4799',
                        boundedContextId: '02ff9948-fa1e-4c51-be33-635a7e03bdf4',
                        name: 'cvvb3lpbqc0zv11fhai3owclza86wwjk0j43rtnc111a683md65x21gnv6wxfm69usxji4geotpk1l490hdynwthf6dq63xc8kz0yicabt2pojs9hchccntk9a9srh8is93cyl0gfyh6193tgbfx38w6pwax7y1hzm9lxyhaoxktd6807kvd7kdxy7m781nwcdmx9m9sim93avmp8qbd8qrm8j4r6v13vhisdawbphpbil61hwdb1k1ea1n96gv',
                        hasCustomFields: true,
                        hasAttachments: false,
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
                        
                        id: 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8',
                        boundedContextId: '6418ef3e-8d2a-4555-a5a0-e1e611036456',
                        name: 'j8maxkz1uh7s806rv9f6zxeen7tkhdr9l8yd7lv17gyicrijoaqorikyk1zuvmg3s44vcqb4hr6w6arce0wxibegy0p3lpjmnf9lk3kux61lyyfk0ctz0yfowvuxeyzm7fpzhqi5i6olyw935jmyll0ztl1r2ye98z7t3ssf9s9e13yd6yw6v8sxoh1lxscn6l0fc1ooamerv8kkady7lhvni1kcvcbpf298gtr5b9zlg40ne199lwpz2n35tap',
                        hasCustomFields: true,
                        hasAttachments: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('a06e9d16-bddb-4f2c-b9bd-4dab319949a8');
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
                    id: '8f5209b2-a9cd-49b0-b07b-10fd98456864'
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
                    id: 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('a06e9d16-bddb-4f2c-b9bd-4dab319949a8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});