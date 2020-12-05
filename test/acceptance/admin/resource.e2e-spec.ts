import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IResourceRepository } from '@hades/admin/resource/domain/resource.repository';
import { MockResourceRepository } from '@hades/admin/resource/infrastructure/mock/mock-resource.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

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
                            validateOnly: true,
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
                boundedContextId: '8f79043f-14c5-4c14-978a-846601c4bf65',
                attachmentFamilyIds: [],
                name: 'd7uwalb25exth8201ewtlb81sapi6k9ceun5ku9nlu2zae4gkz095p8rndzlmuk8st98eq362mzp5gj06gmbk04riogvuaz6bb00mzqc7oyz2ra26x3uam1zj21x6ufd2itfwz4ojj957pq0bcuj3bzbk11krxicxea6x7qp4901ayt4jkduyfjo55pb0ngsxhalkqdx8eo5fcfskos1kdg43tdzo0nvhz2t2ilcujgu799uk9kwjwdqweltmsj',
                hasCustomFields: true,
                hasAttachments: false,
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
                
                boundedContextId: '8f79043f-14c5-4c14-978a-846601c4bf65',
                attachmentFamilyIds: [],
                name: '78afe1d7jafj1o54drkej3lr4h5oa5xt7amp105yrweygu18wf7qkgm68v1sat6cnbjm0ixjzqprlbndqk5ymcts1sbhm90a1s9zdu0bav0ai8gq6rphriga0w2acqfaodu2e2eu7f3vadsusda9sq75yvmhxcgc7udjqilkec3nbue1mi2gsxylh1eosczf4reaycywa7tzxr4dlxdfyziqn501yyhpdmbu3zg6xh0ltphrwqzpyz5d7z2kwvx',
                hasCustomFields: false,
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
                id: 'a28317b1-74a0-4204-93f9-da0e040afa63',
                boundedContextId: null,
                attachmentFamilyIds: [],
                name: '3qtuc3u7xysw9xwgw9ploufq1zi7kovoq4528uf01ou0o59ss6n35nlcmd1zlncmlgcnu1i47ebg3v6jmq7uolxca1pjpdub2lfb00illzzeibmbq3994azbppz1uqiykhcm6q89zcqsd28z4w6yrrbza0gv81nn8a3c80umpbef53iqpsh9on90mj6v14szz5xk88xlte0qf4n7lp1elf3n3puzscos4343o1kyzhiy9zjh7ew62cirelp428t',
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
                id: 'a28317b1-74a0-4204-93f9-da0e040afa63',
                
                attachmentFamilyIds: [],
                name: 'lixp6j7nd8w5liwh3bx0nhe8whuv63kf11eoxqeh81500atjcizl4wqsv9qytm8jpus4wb4s52wl4rrfyqgrthbr0qxi8mlfloxg9svr8plflcr1e6upieu1kcbd5ddq252faxa7vr2j7gh3lgdy1gk3o4wtv56gxtt73yeczjb1jzdgjahn4zt0k61roizw0pxc01n8vv5pifs5wie9drz66yxi3xolikj2ekgajwu4uvbevadu0q6f0ucyb1j',
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
                id: 'a28317b1-74a0-4204-93f9-da0e040afa63',
                boundedContextId: '8f79043f-14c5-4c14-978a-846601c4bf65',
                attachmentFamilyIds: [],
                name: null,
                hasCustomFields: false,
                hasAttachments: false,
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
                id: 'a28317b1-74a0-4204-93f9-da0e040afa63',
                boundedContextId: '8f79043f-14c5-4c14-978a-846601c4bf65',
                attachmentFamilyIds: [],
                
                hasCustomFields: true,
                hasAttachments: false,
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
                id: 'a28317b1-74a0-4204-93f9-da0e040afa63',
                boundedContextId: '8f79043f-14c5-4c14-978a-846601c4bf65',
                attachmentFamilyIds: [],
                name: '5auqk7aghhk1f5rc3tvnt7xxi01je6k9mnzzeeu3gxueru1ta85fn092j4uv7qi0ycl6ndt5x5dgrokipcqidz5rn46g6q542kqi38wovwj0aadk4vd2hekq1hnqorwuijd1gvaunr3om4cbi2qlh3vkrmilgclmk206e3m8vvwvk2c08smq7xi1qvpju5hgp1x4fawtqkptp2lqtaoirbqnps4k0cs6r1pnaeqhrr0cpnn6u2ys499v4lncl98',
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
                id: 'a28317b1-74a0-4204-93f9-da0e040afa63',
                boundedContextId: '8f79043f-14c5-4c14-978a-846601c4bf65',
                attachmentFamilyIds: [],
                name: 'o3pj771upnwqcndsz2fb4eaxt2c1vetv2a2zx048lugitylghvevmnmdskr2py62izlilwu3f8d67hrzq2mab3jloc16qipste00psu3m1l9g5qsphxws2p7329qpia4c5dzjrstf6uoqp0v252waetg7rqx72rgqi9n5r4qwuldicijoblouub2lnegqgjpi1896os6u1516c8ve7n16o2wzdthnzl2xarvz7qjxtq8ipukhop3lmh2kj3nc45',
                
                hasAttachments: true,
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
                id: 'a28317b1-74a0-4204-93f9-da0e040afa63',
                boundedContextId: '8f79043f-14c5-4c14-978a-846601c4bf65',
                attachmentFamilyIds: [],
                name: '9hlg0d218bzoy4t21t4icfxel2x8o2gphwz5z3yf5czfb34tin9lxak5hg90sc1nqid99b8u6rxzv3rau3nryx02cycyh31oxovlkyt7so8yc5f264qgq4j96p9vbttf7eekx4y6qodjvigyp7hqabohas1dyeh92dpu5wsmbezr8ains6bpwelekcl8dszhmpu9x3537kv7a6yapwi3myfc0da2mrhei7h4aecf3jncme3kday6yamfnkibgsx',
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
                id: 'a28317b1-74a0-4204-93f9-da0e040afa63',
                boundedContextId: '8f79043f-14c5-4c14-978a-846601c4bf65',
                attachmentFamilyIds: [],
                name: 'jg4ssql9oz731liqh3soli9wqmu4mgswjv1ipef40c5mnlv3nlbt1mbv3kh4oaoeppe50cgoc0u269lbpd2nomhkcbxifshim55ennueuxfkgcmroajcdn8ggn1ymzp8pwtw968tat93o7533x95zonx2v697v8tq7o7zclqhwyzw7bz9fhtksvz3pb16xlzxk4modquw12dq7c5uuxbamaweu89ku0lzdc651hjw52su5v5mvx96qgc8acl6be',
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
                id: 'otuufqhff3i8cudrwqktqchkch6jw3ib33wpc',
                boundedContextId: '8f79043f-14c5-4c14-978a-846601c4bf65',
                attachmentFamilyIds: [],
                name: 'ooqikoh46i59iu9galamgv2gqrkdnk939m68gky115kl10eri02peixmdkka6u3wqx8yvi0suj5di8mmxz1tskr5pwjfv31cnh4f2nbvbw4fpuob2xbqshg1zxwmyov42sjarus468s4k1ulr2iowqdpoqktfw205srqfapzno8eakygapfwiqc8wl69zab3szujals715udsvsoot1zybpmkxmtbpaq6t67mnv63k01ko7il9wyx5n8ooge0ae',
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
                id: 'a28317b1-74a0-4204-93f9-da0e040afa63',
                boundedContextId: 'pkkqlqtw2hoc7lizbub1hv2d379rqkn8cawg6',
                attachmentFamilyIds: [],
                name: '3hz3qrc3hxtbxp7aw4hhi2ox0bkrwlnwx6si81iubk9nkhv7z48sv2k66nx3o9q6zk9y2pfrbnidx21pnfu4stnnwg2k1zj21gajnykmr87is3xdfdy4pe35b6520whvm0nvvjcszfas8xa5em6nck4gdqvl8m570d1kt4ae1r4zyaasnm3ifrrg4otftsqjle0gwg9vi4lw507ia0raciy630yabv4049et4twyb5rhic6xtocbnwd984zskf5',
                hasCustomFields: true,
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
                id: 'a28317b1-74a0-4204-93f9-da0e040afa63',
                boundedContextId: '8f79043f-14c5-4c14-978a-846601c4bf65',
                attachmentFamilyIds: [],
                name: '7vxfxsjlgg3cn3aqiwpvz0zr8i7r1e2ii2qngjc2w6zns0wim3sie0uyc8j8lfzwf8qyzr6vtgn1b7ncnd2frsrfy8ehnymvuqtkb6fxzb56dzea7ptu8rfcmxdrzvlbl1oxvwcm18vf0zrqdk3ppwg5ltdzba6vmsqjhn0ch1wryiex6ec2aywultlw2k6bprunnxb9zdtv83h1ngsvnz0lwf6uuhmgmtlhfywpo7w9l0zbuw6ldmbkc10p4amq',
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
                id: 'a28317b1-74a0-4204-93f9-da0e040afa63',
                boundedContextId: '8f79043f-14c5-4c14-978a-846601c4bf65',
                attachmentFamilyIds: [],
                name: 'bcmmx4ea8n7lormkhmrpwmeecambt2o8b71tqmy3915jufk0h1hk51t4iaqihqwbqv6sdelb1ui3qcb3vw9x0q0euilvu61y77r7on259wsw2zwuxjttyhhf3w48w5rij06t9y9kpu96qe5s5nqete5yaam34lw1xanouhjdbbxuumghd9mcq9tcq0r17h8rmzjd2er18vzmgb926b7l0wcb8eiyxmyk2t3pgfp5hveb5sz2bxxg6nu3nzbioc3',
                hasCustomFields: 'true',
                hasAttachments: false,
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
                id: 'a28317b1-74a0-4204-93f9-da0e040afa63',
                boundedContextId: '8f79043f-14c5-4c14-978a-846601c4bf65',
                attachmentFamilyIds: [],
                name: '2ci4kraxd2cwhk3gpog6q8w6e5uyaiwep6rkbtgvwckhofcx0tnz8dtr15v3b8u4t6qu3iak78s0rkq2o4finb3ba4u6d5cta6xkmhmjlixktu5trqsyox8817crwja2r6bh28j7tlwt0rwefofctfewshat0lqtpqsxrrsmyfgvnybyv96n0u2y8yl37kj0vskhs0mirs1zlvarbd8u1n6kmylvrmc0107yml0lbzijlme7zni7vg462g0niok',
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
                id: 'a28317b1-74a0-4204-93f9-da0e040afa63',
                boundedContextId: '8f79043f-14c5-4c14-978a-846601c4bf65',
                attachmentFamilyIds: [],
                name: 'ui468fulq7vawevx3pdeuecc41bmzue9v78108no1kea6j5un3s3cl2st6kgq653ci1h4ge8si47yrca7bjy59u1x7m2i45pvkqrfr6dvapxm7hfr7ic6bppvvgj86mfkr10s05tq5emvwnwrz70r573y6bwcvhgil6fg4girdtflur6olzmhz8r2rcf0hcix39yc2wjxowh3f487qolgxzzktaika5a0jn056o8th3446qrqrrf8vp3vpdqawk',
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

    test(`/REST:GET admin/resource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'c8bc192b-23b9-4784-897b-e84fe8e8b4fd'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'a28317b1-74a0-4204-93f9-da0e040afa63'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a28317b1-74a0-4204-93f9-da0e040afa63'));
    });

    test(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/6f8571d3-ff0e-4e87-8ec0-d06ccc7ff8ae')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/a28317b1-74a0-4204-93f9-da0e040afa63')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a28317b1-74a0-4204-93f9-da0e040afa63'));
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
                
                id: 'f312d726-45cd-4451-8176-bd77cb54b1a9',
                boundedContextId: '7fc23cc5-58cd-43a8-81a3-67b927578d78',
                attachmentFamilyIds: [],
                name: 'v1g28wppry4cm1rml4hkwaqucwhwwbesjawjhoq2z3uvvn1jl5qljt9yobgdyo99r8vwi81i5c4kj5s5kxebazy8b1b799mazznn1suu11enlzpm902p3iu093ohha2nwobabzmwiekk2a83kkch2hwga3k3y5qnqaqb04ksy2po62svlunpgplvdcjnsbxrzgno2s8axmssjcq7p5unlt0z21n77mp1j0pd3p7jrpppkj7ft2mvmori7fuxaod',
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
                
                id: 'a28317b1-74a0-4204-93f9-da0e040afa63',
                boundedContextId: '8f79043f-14c5-4c14-978a-846601c4bf65',
                attachmentFamilyIds: [],
                name: 'riugkkgi4o4dfyhurohkdalcmi1rcwlhh7tncp4kpwxm5x74ypxckh1vrtqh12fhj67x9kkdqzv80xk4j6qkv946vu3xl6iedraccbvf26intb5it9guc14qdcvzzlvl7prly8qk0co42vqalx7ece0f2wbya5hi0qgb0kx60grqk1w1ajkwij579jteu65iiaggpz3z7q7wey392r2ny4uqg3bl39ywb2q6gksxbfsmm6gy38pynmdabprbfiw',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a28317b1-74a0-4204-93f9-da0e040afa63'));
    });

    test(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/80f0dbb4-8e4c-452c-91f3-954324e3a235')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/resource/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/a28317b1-74a0-4204-93f9-da0e040afa63')
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
                            name
                            hasCustomFields
                            hasAttachments
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
                        id: 'a2cf86d1-6a45-4565-9bdb-835c434231c2',
                        boundedContextId: '8f79043f-14c5-4c14-978a-846601c4bf65',
                        attachmentFamilyIds: [],
                        name: 'ta85vwl2ubflw8ubgimqlhjgnlt7jvopkubv5btep0o7ytl87qsdqt2bgxyd9dcugnwqf9q15osyu2bka2tqrfan89wia1y6bgatmmyk5k3l7trb9redcqns4xcazbk0whflkppnj9uw6mh38jvpp9qt0gb0z9b4ig41x4hoyvoxiup8uryel0drf7vn892asxq8uvbzs56x5xsy9171cj8h5qv277gk329ahnl8j020efdgdyj9h14tx9k5hun',
                        hasCustomFields: true,
                        hasAttachments: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', 'a2cf86d1-6a45-4565-9bdb-835c434231c2');
            });
    });

    test(`/GraphQL adminPaginateResources`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateResources (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateResources.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateResources.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindResource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindResource (query:$query)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
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
                            id: 'ad8437ac-c8de-4183-bd00-5829e731860f'
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

    test(`/GraphQL adminFindResource`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindResource (query:$query)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
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
                            id: 'a28317b1-74a0-4204-93f9-da0e040afa63'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('a28317b1-74a0-4204-93f9-da0e040afa63');
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
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3bc0d1e6-53dc-41c4-96a5-9ec5d8d3ba01'
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
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a28317b1-74a0-4204-93f9-da0e040afa63'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('a28317b1-74a0-4204-93f9-da0e040afa63');
            });
    });

    test(`/GraphQL adminGetResources`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetResources (query:$query)
                        {   
                            id
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
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
                        
                        id: '6091f294-3106-4913-9e6a-b0a9dc951244',
                        boundedContextId: 'd98fab51-0485-42fd-856b-8038fed1a94f',
                        attachmentFamilyIds: [],
                        name: 'psixa1mcz6qk8t285opzytd61p6jw8diz8po1cvega263dh92jdwqon1fb6uxn3mele6e3vp2igb80gf88zwmisil4nhqcu9teqw64kv24kq6l6q3958rykzji17dvkzak9gzdjke4yp50radz3f863tg158tlcjexyd8w23echyzowcrj9z0knz0uw4eukotyqgx0wjjlltp2534rz6ghnqy8p6z5f9s4xytkrj09buhl5hodjcug1y4q3mwu6',
                        hasCustomFields: false,
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
                        
                        id: 'a28317b1-74a0-4204-93f9-da0e040afa63',
                        boundedContextId: '8f79043f-14c5-4c14-978a-846601c4bf65',
                        attachmentFamilyIds: [],
                        name: 'z2wenh0l9j0geyoobhcqfag153qsp7bwgurfbltjcvnnea7yl5rmzw4r94csaon4rcvfhuf705xlw1pw78tjdf1ggnrtjgiyfgxuzifmghv8m1rm0sa71y9iiydlzh4r94w5o62xezwsusbtrqz6vljdct75t6v4s5dxaxwvwpc28hvcvmmn8idzo9qho6ljz74zbn3z1dzht9lelklihptxytk8tf548oc5drv5ihepsvoflnrlke16zwu0ptd',
                        hasCustomFields: false,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('a28317b1-74a0-4204-93f9-da0e040afa63');
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
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '94b1f715-5f13-4b76-ac28-b32133864904'
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
                            name
                            hasCustomFields
                            hasAttachments
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a28317b1-74a0-4204-93f9-da0e040afa63'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('a28317b1-74a0-4204-93f9-da0e040afa63');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});