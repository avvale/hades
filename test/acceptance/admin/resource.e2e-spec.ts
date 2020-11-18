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
                boundedContextId: '9dc182c2-8a95-4937-b863-5e914a9c6619',
                attachmentFamilyIds: [],
                name: '5bcgrmuxa6vz90tdo1w95wfm2lwaxa2vd56mq4c40ue02a2y2n979m1uvjkxz99a2g2imcmc8wiis2lp75uxfhq957uu5gw8e7ii490vy1rt1cp4kk4x0h9wi5a62kw9ot590j90gpy68by081hi5qgjth7idm9baitk2t50uqd4lyemc3q1geryrj00b63zkslqvuwkvszw62lhfzd68bryt5pi18wxhhlffjmbl4fpmy6koklwsvjti14fyrq',
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
                
                boundedContextId: '9dc182c2-8a95-4937-b863-5e914a9c6619',
                attachmentFamilyIds: [],
                name: 'f6b800my8d9rfe30jofbde60ky5f02fn1k3ylgux473op0pkby1yzk0bo4a5otm1h29pf025rjbjkwq4nnimy90nyffinjyh9vuhg44ekf1espd8bnqrup6df4bi49uxf4dw76ri3k5j96236kehp61k4btunzd15rvuxnu7y74ofn1vvaj4lx4nwfjru9xwlsdxiascwxq12akpq1nfe94gw2pxj0oljk7vgmfn2xfjc3vjz0dr0v2a8kzapw0',
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
                id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0',
                boundedContextId: null,
                attachmentFamilyIds: [],
                name: '5c4i8vi3bhgeynlgi4pvc3di7eh29xll19es46ghiu6lrpzumu34k4ejtsyis7hw1mnn1otmdjua40vkk70sbp7tdy1as6uh7hgk0jrr48oqygwmxfp4t637vyqi0nt3c1ub17n42z9msm0brqhualmjgxq8hlywh0pzhr26vvv302b0v4hlhp6xl9n07ok653akc8yg0gvnwh5qbzwc260gervuthewsegqd2eyko1ljnzdrpi7jdfjcyf2hgr',
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
                id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0',
                
                attachmentFamilyIds: [],
                name: 'p3gl1qosb6ek47xovdb65bcge2my40rd3s2xyqr1j1vwx8l8uaxrrfxvyli3gqdyrrs7vpxsojuqz62vwcoeinmmdfmlif6df8lsc8o6svilzwm8ascp8v9drztl6ekb3yy7x7vwye96qagqjdqyt8yod22kk6d0nacu6hkngjyhg4mm40kmwje17i1yqifzbnnfg8jwl9nusfpzw2qjul74w5j9dm2d1n4h3y7sxa7njfizu0gysu5g8zsrrkq',
                hasCustomFields: true,
                hasAttachments: false,
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
                id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0',
                boundedContextId: '9dc182c2-8a95-4937-b863-5e914a9c6619',
                attachmentFamilyIds: [],
                name: null,
                hasCustomFields: true,
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
                id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0',
                boundedContextId: '9dc182c2-8a95-4937-b863-5e914a9c6619',
                attachmentFamilyIds: [],
                
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
                id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0',
                boundedContextId: '9dc182c2-8a95-4937-b863-5e914a9c6619',
                attachmentFamilyIds: [],
                name: '91m6n40joym6i0gzouy8hsq3cv4jk8ffqgkpx5gteg6quzjjqifdzyfus3mm64zfn0kbclr194bpwdoeg1jsc72uz0t981lzkalymc8osergagdotrsexwvgyhtqx8yhurix6offzl2pahgktqlgrgcq64zev32ou18k1wfa9fdl2neo6eddv0k788xgadi61j9gf7vzjnvyo3f0pf72zycmand0m4amavxd6n1xoknc667726l5eqv4n0ir1tj',
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
                id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0',
                boundedContextId: '9dc182c2-8a95-4937-b863-5e914a9c6619',
                attachmentFamilyIds: [],
                name: 'lmd38tsivmrnrqs4zm775k9ejxufohmw7uctbpmue19yw0otlijnq544s3tff7fj9nc5g73g1ejmi3ahw7k7d0cvdq4q9b8ru2gbca8f5dpu8kmcsyfggzvdfksawohu4ml7p2q7qildx6nfz4n5igcp8lk4qe11nrtr4mdtxxh9og0z79vmhjp4107117ogozk8uoo001oflymtx1zj18z8j230nn13b06fk02fvvpv85uk68kmbqzc7rmek3q',
                
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
                id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0',
                boundedContextId: '9dc182c2-8a95-4937-b863-5e914a9c6619',
                attachmentFamilyIds: [],
                name: 'w2wtex5nmx5d1vntu83xm5n6f2vy8rfp3yel22ecdw4szb83l8wywmaljb9st7jkvh5i99gttoqwh98lb4g1ts8uf03l96wjsh61s1hw6qh20i2fjygvwrj39fn5s7uo8mojs7d4t0gqfv936o2ayrswap8x1d8l0n2zct026o6v6pfw421co2k40e1tkpq089ee284kslgzyb7h5ovlge58gg6loduezk301k6gfqkvrcg9dbbi25zwv1mg32n',
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
                id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0',
                boundedContextId: '9dc182c2-8a95-4937-b863-5e914a9c6619',
                attachmentFamilyIds: [],
                name: '99ijmte5wyv12qv96sslg7o9rgd0dv0jmtijl6xaupby1aazogfil4lo70xrwfxtzc6hlrlb8hac5excmsujk77jiookirrqkfqysppbm5taagypvexofk5fhqczkw8jx2mgyqanhktvup033yooa5jjov9az1ziqq2r9lhtpwpi2n09h365v3khd061mdkezjkg9sx7irqh3vcipe3kwegwfhdfdnwq9s8k16umq5qq2r4zctz2z3sq8vgxht8',
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
                id: '491lr3bnd9kxceojg8qqjtn4iss8nh1kuzsn3',
                boundedContextId: '9dc182c2-8a95-4937-b863-5e914a9c6619',
                attachmentFamilyIds: [],
                name: 'gm5ujza3gpx6xaqzmg4jt8jsc1qjttonxkg21fcqhseet7jw9m8wrw1og7p8vxoy7srfcuad2udl9mvguqkzmr767sqjn59sigddue2luwhk8evpa1qi3j8z5fzxa5ulef422sxoidpg5okrjerkw1wc4eeq9ujcvsmwt9opt8k9r45hgw3nb5by9jjhuxwk52lf367v7wg9g1lgx5fxk2amdgwzx6k6lnf42ggy0ynddfl7s3h64l1olne1e96',
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
                id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0',
                boundedContextId: 'qhlx34k14202q13sah9zxs4h8f6kgp8yk18pi',
                attachmentFamilyIds: [],
                name: '78q7mbo9tjyyn8wfmaijk1smn1ycuxdb4gb7llj5xnr6y8omfkpam2gt947ohrfmtfjl1fozueavdmfuj46jiqkszpz9cffm5a2jyk4rcnrgpqav7ry40z3blh60rzno36z9kngpshdt689v7k1x3buli7n8d7m9pnjckoxuac3yf40j4ycwrcpmaiezudzi8dmmz2blaps9p2fowenv6lanv1x7a6gf5j4ozxylxp2ldc254q20a5typp5owrk',
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
                id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0',
                boundedContextId: '9dc182c2-8a95-4937-b863-5e914a9c6619',
                attachmentFamilyIds: [],
                name: 'l4ekk7owbs809m00r99nn2gcngqlvna7dnhrc13gxur72rjeysksnclapksss5vbzwydqihyi0efylaflsuc2278tvfgw6xt542m5korfcrfm3ky5q9ks7qgphbr3q1yziauhd34gm5cieqvwechyr0z6iz2b4apl0qif31c8v6dh1acznc7f35xirc962oxh99j4kdnb3jlfoxn44h0a6uy2tlnvae9vwpapb3u10374j79t1h9qpr2l6ryc1b4',
                hasCustomFields: false,
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
                id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0',
                boundedContextId: '9dc182c2-8a95-4937-b863-5e914a9c6619',
                attachmentFamilyIds: [],
                name: 'vn4k5buuba9ljh36kn1cibrpnadc6mjm6rkps1shca0xmzzm32lgffayairf3hr0dy3aowl30mzpf6p7qy52j22e1brzx3xwal3s3pil06m7m8vvsn3t3aeoygdpooe50hw4qkbzxckbt7wjbg89vffbdi77i3w0qhrggb0zlciz97ix3f2i6ullqy8auqg5mx2ggqz4yh7p1f6789jsbfj2j6ddgh8iceov6t1wppnb58ygx3xygw2y43cxdua',
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
                id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0',
                boundedContextId: '9dc182c2-8a95-4937-b863-5e914a9c6619',
                attachmentFamilyIds: [],
                name: 'm5vh2wvzvs2my1gac9ji5c31n178qv9oahow3hddhz0n6jx23bpgkejytcgj9o4978r31s3k19lh164nncn5dqfh90bz8s4h62fr8p6h2j7vxg2weid06x26az90ino7rj994ta7m0c1ewcea7feax8d34z6i49lqrmp74fc9hw1i316qr0j06n8wstydx9hvwz53ohe3kkj882grs2kvib7mlfn1lr7nu5eal7xzw0a4ykwgsiez72uqkg0qkw',
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
                id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0',
                boundedContextId: '9dc182c2-8a95-4937-b863-5e914a9c6619',
                attachmentFamilyIds: [],
                name: 'r9qda0fwot6mnxs3e5ub6x5th90iui3l5x83dlyjcetu11jk5ccvag53pedveybvjgrcfw3c1br9zmn1qe4eip6vskganqej0xkdtfqs2fgiianw1yyeh89eboskk0qbklufcrc5j7yilsjvtuig87s7ayu4jbncjppjpbw9406clrbvomb31y3ipal3jcd4ep3e6nzv8o4fclgn2szql4dqyydtdbcvcv359wh36d3sqaabzwj9bjishg7ryfi',
                hasCustomFields: false,
                hasAttachments: true,
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
                        id: '84abe9d3-b49b-478e-8db9-79fb666cf3b1'
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
                        id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0'));
    });

    test(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/4a9af89c-125b-4fb8-84f1-e967a5ffff77')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/30eb2eb4-8efa-4ac8-a0b6-d47181caccd0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0'));
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
                
                id: '5bddedd2-3904-474e-ab0b-fa8afda4be32',
                boundedContextId: '2626143d-7f27-4997-8eb7-0ea962e3ae04',
                attachmentFamilyIds: [],
                name: 'he4m4q8ij74ix3quppyt5tapyohew76t785pb1we95dhcwh7ke0x3drnvt3q66blnk3hfizwnhj97sy0iigakygzv9d4fwqebtifmhn2at2085pe9jzadfv79cv14ocexts9bjitc9cpajtmlmu3sqivkgcglki6pg9k0igb2gbs9esgvwlpl7kundc4ko231zelvobapy9v8ti7jnhv3shm3tio77vp9ro88tl9rb9wggkdx63g8m5yp6zydfh',
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
                
                id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0',
                boundedContextId: '9dc182c2-8a95-4937-b863-5e914a9c6619',
                attachmentFamilyIds: [],
                name: 'zwnbra5hfovq659fzr9pw7fxm6jzckp11vu512au1rxnlz5cu5ayko7exz1agmpw8qac879qfw0s10xob018gs6pdyz2p7yi4hbdqddz34o72fz7clnsmow9v8co7mn3zgy2hdfrmutmaqyhvaofcmze855r719skhnwcrcqdclzmj1hx971lkkrsui6obx8su1v9pmj532h618sss611de08qjs3tisy81g964iltlrx8x510pub1i15exaxb5',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0'));
    });

    test(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/7959eeb7-1450-401d-b7cb-1d6470094652')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/resource/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/30eb2eb4-8efa-4ac8-a0b6-d47181caccd0')
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
                        id: 'a9522370-e51c-4994-b132-c4bf942ce5de',
                        boundedContextId: '9dc182c2-8a95-4937-b863-5e914a9c6619',
                        attachmentFamilyIds: [],
                        name: 'z4sc7lc0pxn2k0j2xvlxtva3v6b0boyiyernrj6okhqip53uvxaokr7vi5vugkvursmz8xsrypif0b7nhq8x4nrt4vcf1ydxdfg0npnfgongypdvs91qfm3yk53gsdki1i1y14gwvkjh3685fdwz5poiq9qra7wm9jglm9tc2lxngb35vpfuonlv2gejjtgdqflfqw3flr7owxfegg4r0tqnn24hmiz2vudods9nxgz7irgk7reol77zj7zs7th',
                        hasCustomFields: false,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', 'a9522370-e51c-4994-b132-c4bf942ce5de');
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
                            id: '766f6a7e-5d36-4ac3-b63d-461ec36072b0'
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
                            id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('30eb2eb4-8efa-4ac8-a0b6-d47181caccd0');
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
                    id: '5d77cfb8-3cdd-4a07-a11c-188a29a337bd'
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
                    id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('30eb2eb4-8efa-4ac8-a0b6-d47181caccd0');
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
                        
                        id: 'fc767efc-6764-4f05-bdb3-7cb3546bfd5d',
                        boundedContextId: '34be7155-efc7-44e1-87ec-db939aa49a7d',
                        attachmentFamilyIds: [],
                        name: 'qbysw63ergnpl15to6u3utdtvwkeftm83p3800y7xm5q6ukl1qk4n3267rr8kelx8qpd23yjsobp15ck25znqgxh6fio1qfnwhv2qzk5gk66lz4f3fojv3sroz8d4o88vvq5abgs0c0288txl0khckzi3a8hewehrxicydau6zwhirhirouigaiyv2w2cxhn2w7ypz57gf71arvz17ltdo19ohyceh4kvu333xnxkfrobobmugli0a5xenxfrju',
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
                        
                        id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0',
                        boundedContextId: '9dc182c2-8a95-4937-b863-5e914a9c6619',
                        attachmentFamilyIds: [],
                        name: 'xk640c4skt2s5omgcu9gtbmatlo2cjrz8a9hywuwqadmfm7mrk8volro1sz16ommov08n9ezuaukmbsf4rn138fuzhfom1gr92t3y626dgfvz16xian2uqcngivc6cg9zxnd9r3hxrdb3bbtdo2joxz60jd99hk6y8yvj4guvq8iyeuf82nwp6itcdqjm9uwwdxq0j0lwdcrabs9fbbworhhlxyfc9uue1q2yq7xiyslodzd3abk1wp04xmvrvd',
                        hasCustomFields: true,
                        hasAttachments: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('30eb2eb4-8efa-4ac8-a0b6-d47181caccd0');
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
                    id: '7b3a6646-b37c-473c-838e-d18549e98871'
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
                    id: '30eb2eb4-8efa-4ac8-a0b6-d47181caccd0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('30eb2eb4-8efa-4ac8-a0b6-d47181caccd0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});