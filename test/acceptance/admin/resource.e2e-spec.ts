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
                boundedContextId: '0b882ef9-f9ee-4002-be44-715d6405aad1',
                attachmentFamilyIds: [],
                name: 'xf1vnacd19odnbuhpzk85gkj93fct8kkjnc0pzz6alkcl81nqlmvujoblbvd3wgi6qn6t0z5egidxes3tqo68iw74a2oylr6uqbl9v60t8r3u7lhwthz1y5vmbgecof1nwoo0aied6917zgrxfhhg0u49hhkui1jajayy45ug219pll51mu30ke0thtle7x9303k4d7wm7f937q7de4afgscej7x5eqd7z425vk9i29poptwf5b7bhj8ui9w3n5',
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
                
                boundedContextId: '0b882ef9-f9ee-4002-be44-715d6405aad1',
                attachmentFamilyIds: [],
                name: '70qjmj8rxbghktq742q4lngqsvbshuay9l8r1km3cmlbn9um6m51l3yseffmw4k5mg1eyj3ne6cje4csahnw6s7ay93o2abrlfnpzhi6o1ljjr3dcb8qvcd4282g75v1gv9wdcob0pd5t7tvk9tt9e0u0w23z37d00btpdz1wuzy49y58wt80l1v0f8y1xdh5p00b4rk5e6sqzxn642avf0flm673kt9ms39hyosvsvt63fske8gjufmnwrfd9o',
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
                id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa',
                boundedContextId: null,
                attachmentFamilyIds: [],
                name: 'un8l3bqqabfqqpdny1ghxrw03ofbxrdhng9l8d84fjuc878bye24x6cns6kj8mcaefft8d65hp8y9rsk9hh3f5oijijw2q0ytc5tvmmww9tpaxmcwmnlfvvzowawhk1hjnbtnkah3ii3j9nrg1poxtlnpuvbjr0783b9i8q37k3irtfa5u9nefk9myphksuwe2mfvgr2aoe6lnvyfrxb3kckfugasd2ttann7bv2jq1z1y1qimskeena5jtcy3m',
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
                id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa',
                
                attachmentFamilyIds: [],
                name: '5mns7wwsio3jp6p2ilc738cqztyv99o1yhno4w4vldri5esozk2xsmlai0r99gk3pz6x1p8vh4b7floew1c3buke3lep8u38do4sgreqxltnmspx73cm3pimmh5in30pak9l4f5ylsg0b46mh8f9lb836ebf4g2lu3bkxq3oi5opu8j73uql2kwqunxq5b47tjtxbk6q50svb3m1vjq1v7gv5zyomeo0j8ety7so7x8t6ss4mwm0qqaud39rrky',
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
                id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa',
                boundedContextId: '0b882ef9-f9ee-4002-be44-715d6405aad1',
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
                id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa',
                boundedContextId: '0b882ef9-f9ee-4002-be44-715d6405aad1',
                attachmentFamilyIds: [],
                
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
                id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa',
                boundedContextId: '0b882ef9-f9ee-4002-be44-715d6405aad1',
                attachmentFamilyIds: [],
                name: 'w02lp37h2jc6tqmeiq3bs7v8bm6uj8yat2xfqu4s1oofsjt2lzvwd32l1skox5w0gihgx9ehp8gxf37kda35dy7y96ykxp0pez2lt6zp2rwj5z4pflmt7hltg3rzl9uv7qbzlwwz6vvjb9pyey1qzaibpsno6hsr195htqdldzx4844a35err9oq7yqw58wl81ndo66ge3nlb3l6i9lquoiq43ylevz9s8bpr7zq2qv5p70s2j5pzt03r8xvl1r',
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
                id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa',
                boundedContextId: '0b882ef9-f9ee-4002-be44-715d6405aad1',
                attachmentFamilyIds: [],
                name: '6ymhg3fgd92shxay7gzpsa5q6m6l57z3nm9vhu4dxuggsppv0oy4h02oj8s86kz5iz2kpnepex0zsk8nzhmrncz268nkm3k7xjdgx5jvr3mxm0w314z76bz5y525nzprf3c2mb2nbmsulxms8gbqn7ca37xg88ny1to5wn030moxz28gvl21ud166xfgzbusc5v9d1pe7plc81nlpvn4haeyh7h6tuc6wjflkawigm4sihsydjncx293443lyua',
                
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
                id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa',
                boundedContextId: '0b882ef9-f9ee-4002-be44-715d6405aad1',
                attachmentFamilyIds: [],
                name: 'nknb2vhzfnzpcynvd2b8ng55itf1ptoyflpw7z1s9nckb2cezpphpxmmizk6dnwk70c0gwj9ci8i8rhbrwf1v18cd585hv1nu38rsyo6zjoa87uz5ljt7msptrz34qaz5qqz4g34g2y5l60ufwa8xx15x7rnuml581k5qsb69gm99dlg2du1o1hns1f23x3qt0clhabv4kpix6vdup2yjfwue9pfwo1q505j2ooo94bvh3p4wumubmw40zfjxss',
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
                id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa',
                boundedContextId: '0b882ef9-f9ee-4002-be44-715d6405aad1',
                attachmentFamilyIds: [],
                name: 'h4uxw48wanlne064aq2ucipx4e96hgel5afke6mx5fusl0iou8tye93fqg6ttqw8gxbswxp67iq77c7zx6ult2a4umx04uyre4vrg63rx9cwrkeqxfg3pdzztmyzma2f6v5qljl33oh5bkaqgl8fej2wqpr7yw2sbqbcfg58en3t3xto9j6n8aiwy8xf3cx332f952uxe7yj2fj081jgjcqwejw6x4zeenzc95f2kqptwzaa7n8zdb6afk16ffm',
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
                id: '9xmkrq5hpjgpvtixpfeenj79xm2dq2x14kot6',
                boundedContextId: '0b882ef9-f9ee-4002-be44-715d6405aad1',
                attachmentFamilyIds: [],
                name: 'ca3a5er4rvo2v2441k2zisg21c3crj497fv6l3b114vdtedl692ydwgqem4o1ik138q304sg36a6ipsgxdh0uxp3yb58hmwtw9s8tezx3i8yu2r6l8ie1tormrxlth3wkjijpwzg7glb12cwadp86iowgry76htllok7ph8o327mmtdaoi02nxq53udhqvb7fcgcjutv7zm8jcm7v3fpxepwvmxdiia67b1ptlbtrlm7tts2jb5c1b86onv7rje',
                hasCustomFields: false,
                hasAttachments: false,
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
                id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa',
                boundedContextId: 'xzpz27ul4k4ga2lzpz7dkk8mqe77yr32jihi9',
                attachmentFamilyIds: [],
                name: '7picuse2ewlhv03vnfajlsrztph5xf9gfqdb1ggx06w5t1r2nm47fnbv159iva9g0sr9s8o3ih7eslsc1khuiy53jj16l59dwtcpuihhnoibpxuw66jnxvxfnc5n4sdr9csp8icyrdkvov7ug7d8nc07wsdq2ngww04he45ct43eujmzmqd20946sqpjioycv34gcoozm2on0s0qaapyaa4e6jzeidwesmkszu2v8tkbrwr9fn83crwh5fokoaw',
                hasCustomFields: false,
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
                id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa',
                boundedContextId: '0b882ef9-f9ee-4002-be44-715d6405aad1',
                attachmentFamilyIds: [],
                name: 'z4vyqm7t3i3wd9yxd6o4qaokgf9cr2k8xwn7klpb8n42x992hcl378xqwuwteyquj5m537t8331p1w0kyhjn1rgwhjf17ohm4369aepojqbpjwxss93r1dc9e8lzc785bcg2ai00p62zseo5ubtl77bpl8yfk0nhy5kzkzvfnfg5h63qwlnfk60hhu1r2dz8fyyht2ndkizxwfs8amonnp1lw47gazygpsmaq2po75xg8rgsm66fg2olb6mt61dx',
                hasCustomFields: true,
                hasAttachments: false,
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
                id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa',
                boundedContextId: '0b882ef9-f9ee-4002-be44-715d6405aad1',
                attachmentFamilyIds: [],
                name: 'hil4x35dxiyn1alxg3mbg5ngjfgm3ttfojd0niw2fiql0gqs2q6m52969mptpvkavy0lb9mmd6q5xg4qfq5mn6p98q3e3tzsubinvjyqilxciezbcaaku1w08hqv16devd26rjilspo1kbjv9y8fa9d88wq08ebbwwbb2gxh0ybzmjzilz8k5526jqsg37h65bgkkulhyit5k60qmoo41fk00xgs02ocuxugmcyihiwjx17fytib2s2soacg06i',
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
                id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa',
                boundedContextId: '0b882ef9-f9ee-4002-be44-715d6405aad1',
                attachmentFamilyIds: [],
                name: 'pmlj96y7apla4phs765y45dk9yumt1mvcuk0ofkt3lxdrojapon0x1xvewglknsrs0134wduaix6m7yuem5qa0kgooe4gont1dga74jfokbo9snu32zfn1r5vw7rm8jwl18b4w90va2z4fzjahttusqbg5tu8wnrhdx7tv8kx5zj63q8cpl39pc1reme7dnzkrxgk558o2lw3i82u9tbs7tp23yczsryga3jerok9242csikys755qm4z5wpdnd',
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
                id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa',
                boundedContextId: '0b882ef9-f9ee-4002-be44-715d6405aad1',
                attachmentFamilyIds: [],
                name: 'u1hgn38easz3b2d6bgzsn1isu0wmmi9in6ezwceotzgfexgosheu5hfhta98k1jd9r988me0azf67f8qx9gfgsvvds4dl1q9hmu8petabtxw79f4dlmrnem16l86w1v4up1bubs6di52i59p1o2wv146r8lzya9pay26uwnmzxwytr6kvxbwirro9ck32qb8paa2n71s59t5ud11pgzjisu00078mvui1fy62z550jtfhlpy0ldgqwit3rg2jh6',
                hasCustomFields: false,
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
                        id: '1afbc286-ea2c-4e00-a1e7-abc39a689631'
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
                        id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa'));
    });

    test(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/09895ab5-174f-409b-87a0-499ba72a679a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/84f0aa75-6b29-497b-8a5c-7b2ab809f5aa')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa'));
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
                
                id: '975ba312-4b62-4f26-824c-8193adc1ccad',
                boundedContextId: '919544dc-0e2a-4a68-a6b4-e40f2fe7d70d',
                attachmentFamilyIds: [],
                name: 'ppc6iqg8mypa0hrar2odtnr3jap18nfr47e6yoqkkbbwtiuggu4u205gcopppexwbof1g2ek9emnm09uwlb2c5njbynrgt5jhx2sroe9dzzv0neychox9w6ujps5i3bvnxjwj28ya307t0fef4t3a0lm6peteawj5jj1gyx0eki2zme0eut8i2wsypydd7qoj0hpsxlyix4es2mj69s1zkzrkw3hjt3qktqvpfp98f8ryto3yjnl55rgapln9p1',
                hasCustomFields: true,
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
                
                id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa',
                boundedContextId: '0b882ef9-f9ee-4002-be44-715d6405aad1',
                attachmentFamilyIds: [],
                name: 'c5ob6s9pd4ji7wtyouroxyx7frvs3gyczp7hb1uiadu04a2h65m4mwdtec3934yire1u87tbe08bxrd9fr8elunpipqshvvtv9o7cyrxijes01tqywo6cu23m65eb2xgnwrkvmtwe2if6xac0r99la043b5x9sl983vzea7hbeqz0hmismmq14q0l1kqjj0n5ys66c9a96y3u465g8r1ylcbz0s87yfotn3pjax9c3nbgrw11ghm0ih8k6fyfl7',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa'));
    });

    test(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/f88a1e53-7278-4729-9525-fbc7a8e90469')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/resource/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/84f0aa75-6b29-497b-8a5c-7b2ab809f5aa')
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
                        id: '881e0a12-e4fd-4616-83d4-34686f80f28d',
                        boundedContextId: '0b882ef9-f9ee-4002-be44-715d6405aad1',
                        attachmentFamilyIds: [],
                        name: 'vdlp484so4rwyddyel3s0wqlf4wfo04etnjpofbq6qd8hg1quh3gnnfd7idbsuhs80jtxmheofo9jcemld332rfobqhg9jlcz82emncldpilcr5l158gn4fp9vhfotsojr1rejmjvjckwr5fkg7keypx1bf2dxoctm37b48akikpdl1z9n0pt6a1jgyla7iafks4us5ya63ypk7pmrn60fu20nhej4yhwi3cl3qhqd83enaf4jsl2ooo3wlw0f7',
                        hasCustomFields: false,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', '881e0a12-e4fd-4616-83d4-34686f80f28d');
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
                            id: '3a8a69a0-4076-4dba-b8d3-0dc47e7bb2f8'
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
                            id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('84f0aa75-6b29-497b-8a5c-7b2ab809f5aa');
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
                    id: '55eafeb7-d2b1-49ab-b195-e7a47e2871d4'
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
                    id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('84f0aa75-6b29-497b-8a5c-7b2ab809f5aa');
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
                        
                        id: '49e6038b-29ae-47f8-8dd2-36b0f40668b1',
                        boundedContextId: '30d5598d-458b-4153-9ab1-eb8af8fafa3c',
                        attachmentFamilyIds: [],
                        name: 'ry4dsbuat8ibowgk1f9dc5ujxvp09spyu0kizvmcw3g5h0dwv7vpe4e7p6z4tequcuw4gddpd6bp96if647tjpnalf7pphdyv1borinqlds6geum2cxn7vbr0lcq18qh8zrr7wlpoy4ki79u8vwr0125dov2gyxx2imbp8bv7bfhvz7j6zsz0wk3fb02u6p5h86bvgo5y293jrkb89nn20ype2eq035zt6lw48aypphjd9ma0rbrastkc0di799',
                        hasCustomFields: false,
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
                        
                        id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa',
                        boundedContextId: '0b882ef9-f9ee-4002-be44-715d6405aad1',
                        attachmentFamilyIds: [],
                        name: 'qksvt80hl36s9n8kd2f1bel0xxvkx1kzhs8x9hpxpgq465mmlugxf2gxavqcl3lep24n4mk6g89dpx7cvwi7uf29u3xqd5vxjje281csxmdhdmjb4q94odv31u63lfyj8qirzfkwbhxbz40uxbb9jc47s3ombo4gauxrdb4hljsou6kqvssghtf22xknzj870l3mj9cqfd49u38swhzqoy32z5hymxu7f55hcin8gnlx7wwx90882o9cvodkmru',
                        hasCustomFields: true,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('84f0aa75-6b29-497b-8a5c-7b2ab809f5aa');
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
                    id: '354a7b16-d9b5-4f54-96c6-e72377fcc355'
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
                    id: '84f0aa75-6b29-497b-8a5c-7b2ab809f5aa'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('84f0aa75-6b29-497b-8a5c-7b2ab809f5aa');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});