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
                boundedContextId: 'c466f698-71db-4cb2-ae46-08604fc10fe0',
                name: 'nsba7fuospmnq3jdb5lvloooff5dgksj208re7mk04mgsdp71nd4bouvdjfl3qf1qakrw0yphc4rcl3ewey8leqdn2t2lxnd9nin67x7cisoj86af88dm7eao3hcagcn2a682y7mfnejtu5uiwwk8ar72tyjo2z8jw270ivg13dfx0j3eiqqebflzvhbpto6x9588nkggho37uqm69ajl7bl0x3zhsi23scd7lr5n3bsgh81jwmgksdyq1wyuar',
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
                
                boundedContextId: 'c466f698-71db-4cb2-ae46-08604fc10fe0',
                name: 'y5hnqt0qr0wbzpnfj3epvf8omq8gbihj1zlen3q3z5l22nn9t8qh7zufhowxkem5eqwyxiwpkrdh5hzoqu7bv75twuy2izu1q27tte3exxsr1eed6bb67882q9n9i6jg4j9i5krbwxbezb7lgrb6of2eaciq2x9ltrd5ivjg0edechudr82z770dexhl2di47s0zwfafdqius1wvtgf6g4gbozihn73p6t873myzx9578u2o1uez6b5jg6gcfp0',
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
                id: 'a016b6d2-437a-46ba-92dc-d42c891ba04c',
                boundedContextId: null,
                name: 'nta51by6xi3u76mruqsw2mvnmxmnm4sgog7btx8fqhexlnubz070xsq8v2kkycrxjqai98hfwlolatuyvop07sn9qh5qtojhvmitedujii5l4yhu5iilc3v5daswpg6myxtb7brfs2f7dlf493udy1vj67ygn2dx52gzyrpr26wmofmlhddw2gpeu8e2452dccb3jmeo38sszbp9fgaoc4tqpk5uff4ym6jtq6k06u2rai94smf9898ldnfc2ce',
                hasCustomFields: true,
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
                id: 'a016b6d2-437a-46ba-92dc-d42c891ba04c',
                
                name: 'k02ro7k0gvvf2dlwmjjlyh97x2jpn1wmlm1qqwtoilmup3dasjw1cjambvda71qrldda2y9adh3axex8xs6ippbr1v1ohp6bsuhoh6zgexdsb62mar7aq85z6mdsdcoc6nx9mrynzkhj8gfvcvrowegrmpzz0nvj8pytrfvc4py8cirna3ovtgsimhnl8rug1kgkb5bolld66pkcf8iu765zrgutik33srwidqarnv4ub2wqvhxb9fq1inmx2sk',
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
                id: 'a016b6d2-437a-46ba-92dc-d42c891ba04c',
                boundedContextId: 'c466f698-71db-4cb2-ae46-08604fc10fe0',
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
                id: 'a016b6d2-437a-46ba-92dc-d42c891ba04c',
                boundedContextId: 'c466f698-71db-4cb2-ae46-08604fc10fe0',
                
                hasCustomFields: false,
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
                id: 'a016b6d2-437a-46ba-92dc-d42c891ba04c',
                boundedContextId: 'c466f698-71db-4cb2-ae46-08604fc10fe0',
                name: 'oak3klr16gxneeg06dcww8zugze1gwqe6r75c20sf7i3wb6x2hfbw4ht41bvuhrzfygjz7x8ofiddle72bl6tjupgpbvpqj2ucii3ot4q0qvmuziq2aghnpg0x5lu4hz6gsd554j6598tomufzswr4ky0urh18pmbc2zoelb64uoxf64ks9sghc8c9oplfhlz6am55qete3qg5hr8gr8k1eh9g6zfy63xhi8c8kai46naa8mqe11xycz42a0dqk',
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
                id: 'a016b6d2-437a-46ba-92dc-d42c891ba04c',
                boundedContextId: 'c466f698-71db-4cb2-ae46-08604fc10fe0',
                name: '2xqrlaqoucj8ffzejoi6s6r4o21usdn8smdrfgy4ql4vd6cfanym3fhcyz27efe40wywkfmvihrpo6zywg61wxzjt0yfc96dsdt1t4rcr78bapv2x01h89jbxud8ku19ts7tcks9z56xbr5xrbdbktut4d4wceuvfj4h312pqs4migr0muvprx43xeo6o7z1henfgbtqj8vao6p7zg4jppz59958gsmzl7ztamizcwzkha8pgss1nj1eliem63k',
                
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
                id: 'a016b6d2-437a-46ba-92dc-d42c891ba04c',
                boundedContextId: 'c466f698-71db-4cb2-ae46-08604fc10fe0',
                name: 'veojhott8ohk9hxzz6yb3qk3nt1c8k1asqpi5vlqt3xxo28dtzdrtcitx4b2el3qaw4oaac0ey1tu05ilasshw83omx4fig8c9o3iy7ngw85mj65s2fmkozxnf5w68xqp11cj6ydstxbt2riybjmv8jwf680lo7zyxvkcw2gx3sm8ilbv4higilwrrxillww8mijuzer7csd6be6y9mad3tphnz7nplbnerbv3xgta9r6q34ps2tt6ykfm1b6z8',
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
                id: 'a016b6d2-437a-46ba-92dc-d42c891ba04c',
                boundedContextId: 'c466f698-71db-4cb2-ae46-08604fc10fe0',
                name: '4ev5pehk6wbm8vjtaaae0uqkft6vc7ssmc08donamp0v04sbedzvjc9pc00qn5bd8ksw8kywx58bd4xmrg1anmorza85hraqivc0oxa4n7bg2le5osj1bb4ktequwvfjgtnvau26643a8ffaamytmcvrxirrq4jupcffb66i3pbhuturjhcq6n6g1x6dtn4z1igo30tbwwx8zh96i5dvzioi33vnbru0uoilun153ucqfk418bmsatvwxvs994x',
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
                id: 'whxm6u5pm6vbah8npxyfuyfd29fpflyy9aveo',
                boundedContextId: 'c466f698-71db-4cb2-ae46-08604fc10fe0',
                name: 't2c1akd9b3z8z83nr4emnhjplcex1ajcoa1srs7oxpfl8b5mxkhvcykp2qtrl6tdfc6vzrpxp47fcus0vp8e3wsd5sjijcl9zzr6xxxnab3146oj865h4vsn3cap2pedfybqwovrz8tcbge0kkceexhf8pigr6hh2ilgp4dbj9yt19aje6ugen18fce8cw7yaqrzq8q6uoa8x7lzozk939plclfmp14eab7ib4qq76v5cpc1fpqwy4csp1ro7y4',
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
                id: 'a016b6d2-437a-46ba-92dc-d42c891ba04c',
                boundedContextId: 'lf0t5bq5apzut8kj8glip6fimm187gcf51mng',
                name: 'iiae1327kokvekepzrxzwvnzx7u8f76ejuhrh1dparcxhlbf7bis6auszkery2fi013bitcnwgiaia5shmb3pc3h0wolrw05gvwo5k4sr9n1fxl01rbuzal91ywwz9rjpyir8paheylahmugxxrmrwyjcqd4ps5lqz2axg5acgniatnvnhwdnhc903qclkujt4hxds952jjnt1k1gy9h92f34g710nhduz7ig35o0l8rl02mzsoi6q1nlwigxq7',
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
                id: 'a016b6d2-437a-46ba-92dc-d42c891ba04c',
                boundedContextId: 'c466f698-71db-4cb2-ae46-08604fc10fe0',
                name: 'jog2gl82qi49e9nvwxo8uvfjl7w0o3nbum4il1u0txif7bbasstugrbixv4xsh7b5ohomjwytvi34i8yninlm2kpk5yrpacy0orb7uduu7lpbebm4zdm73tbzh41pgospnrogbgkg8ro45842zkafc1owwwjpbelhmj7k385jjt05lr972htp5vu3i0wil33talim6y639o3ahefmecnigwrq44ba35sq4fg5apj71krpftwh2mz7ckreviy25jy',
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
                id: 'a016b6d2-437a-46ba-92dc-d42c891ba04c',
                boundedContextId: 'c466f698-71db-4cb2-ae46-08604fc10fe0',
                name: '7u95sk2d3cusof383gzhou48mgfvaotx9grgsxwkpq73ah847kgrb0qf9cs28e44709e8s6l17hdc860fhgpoq9ivxok127zfpsr3a75omcyvlj7cl0yioe6bfgg6egkmifw7rgzmtz8tj3i9ehlkc41mmgk8sl1lk1vxj64hfqzxyoepgmcadjygmr6q1amgpa4shqn0na456eqeaf5gbqyzzyb5gaxb0qot6eqjnrcnkuym34e90dsit43kzv',
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
                id: 'a016b6d2-437a-46ba-92dc-d42c891ba04c',
                boundedContextId: 'c466f698-71db-4cb2-ae46-08604fc10fe0',
                name: 'i8427j15lgbhlhr1hvkf4kdnhrb2nx6kg1fu1fuy2zr5oilvz5u6deg3r18xxqdb37ryeng1tges0bym8kjezx5hkj4gg8psfl07zoochy84r67zzleg2grgmiy2qj08192ior00al84ct34df812ovcy7bnprahqkwxdw3jcbtun5ultkhslfux9sc8d2cnpl5nmknnnx76nf3a0nbfsntqy7xzi4m0pq5dvawz8leem7mc61e6rbm5lprwwzx',
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
                id: 'a016b6d2-437a-46ba-92dc-d42c891ba04c',
                boundedContextId: 'c466f698-71db-4cb2-ae46-08604fc10fe0',
                name: 'cah9l31kbxlywcff648z091gka8i83v084zx2xu35t6glkhph30pw8daa9164e514kgf67aafx529y7pvn909fip40gqruifsvfp9dcejv3ophdql6pg4ymu4be881cpkvegllrx0cvc1q1k69sp7n6jces3ntavffpr1bm105imq4pmxt2i4thowk031ie6wan26nozgpepw7wtq6krsvftf58q24itynpymz76h81o8269vwk49lopp3w86gk',
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
                        value   : 'a016b6d2-437a-46ba-92dc-d42c891ba04c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a016b6d2-437a-46ba-92dc-d42c891ba04c'));
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
            .get('/admin/resource/a016b6d2-437a-46ba-92dc-d42c891ba04c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a016b6d2-437a-46ba-92dc-d42c891ba04c'));
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
                
                id: '36d96632-0b05-4d4e-8e76-ac5fd84ad29f',
                boundedContextId: '3c10631c-12be-4c63-9d20-a5dc43341f4c',
                name: 'aof32mgzo4z680m7v24t0t43xioa3f7qp94lih2jaju003guyw71ipfqu2ofs8fy92or3dkxt22rc6ztb9818txf3r521qw8hcl05ewypd9uidlm6e5l2xsungvd7j4mb63e11fslwgwe5og29uuuf83bbu1yqa1cv5odo61i5mry7advd7t4il55a9l2ln0k789v81g5x0i6cfhkckhle5x4716w2wk7g52uz8jdaooy677lxn3i34t3t4ijr9',
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
                
                id: 'a016b6d2-437a-46ba-92dc-d42c891ba04c',
                boundedContextId: 'c466f698-71db-4cb2-ae46-08604fc10fe0',
                name: 'pfn3u3aj2gr0sqhv1ctc5rk1kwb7n4uqmafq4unluqnhe19q6k3nqq32ydbgjt59xfwjee33gatq78271vv7c96opyik1ypv7obyxahx1dx4mhp8cylk559igz2441u64cyp450lqyhyvj127v9v3r6bin8xfhlsmrpy48xeqkixb1l50nr61uvl5vqnpuh7aw5y5os2ayzncr9ykcfde2uizth45yvru0tvmdzdmh2xjv5dv6leixz6sok8a2e',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a016b6d2-437a-46ba-92dc-d42c891ba04c'));
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
            .delete('/admin/resource/a016b6d2-437a-46ba-92dc-d42c891ba04c')
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
                        id: '60553cb2-0506-4903-a6a9-0d92f47c8984',
                        boundedContextId: 'c466f698-71db-4cb2-ae46-08604fc10fe0',
                        name: 'y0uhl211n3x7ykewx7790cctv2xf30nz0oz311khbmv1gc86l3kte9uhd8jd5sdfvdhf844khbdfka4aplwmtqesgk08m2lfu6v4vxabt6jmjryugldt5umnpy7bz0gcwap1bxui7pz37mb86s40krpl67nmvts8q418x1fbgwlsg3s9ckkvyzj637ymyft10y5pzh7avf9bgn3osd7yug7iu1wempvt1sium1ivisejfu5dlchddckbx6w1l0v',
                        hasCustomFields: false,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', '60553cb2-0506-4903-a6a9-0d92f47c8984');
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
                            value   : 'a016b6d2-437a-46ba-92dc-d42c891ba04c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('a016b6d2-437a-46ba-92dc-d42c891ba04c');
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
                    id: 'a016b6d2-437a-46ba-92dc-d42c891ba04c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('a016b6d2-437a-46ba-92dc-d42c891ba04c');
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
                        
                        id: '8c4253bf-90ef-45af-8b49-dd4bd7cd3b80',
                        boundedContextId: 'f9ab075a-e1c2-45bd-bd07-2e422195cc97',
                        name: 'jlx68wzu5z9a7hfh3ji6s44k4vo3w0sr0evtkc1suvxr4j4cehy57a4w3fphx2yxuzxieum9d5t4xcpby9agvwis98cfeptesdj4yno7j98qj1ktaf53fcflig0ur34pc4jze8oibmibgbb8qw4w7s74lbxjun22foyy4t898wfhtkr2keghq27xr2cwn53ze9xo6lvw505igjvta26vkkkwik6lj850rzuhrppos6vo6mrm2ikmi0l3m3e4prg',
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
                        
                        id: 'a016b6d2-437a-46ba-92dc-d42c891ba04c',
                        boundedContextId: 'c466f698-71db-4cb2-ae46-08604fc10fe0',
                        name: 'ozcz3gobcgrfztr7mxf9oax0gix38aqc1sl4fxqlgugo91ok2q10pfv1ya44obhxjk9brxa5pn3c1u2x1d09ocl5cz6nhyv8fv0k4sk08xzt9bms85cge69gk6izotru0s15f16s1mzptjajnogglm3t1ava7a94e1ts6sk9uuf6kqt3nyfhd3hgaowfq7w7miytnlcznu8x49j2thvbuglavf1ylxkjr087y9wfe09sc7l1eonp4jqnefppdks',
                        hasCustomFields: false,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('a016b6d2-437a-46ba-92dc-d42c891ba04c');
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
                    id: 'a016b6d2-437a-46ba-92dc-d42c891ba04c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('a016b6d2-437a-46ba-92dc-d42c891ba04c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});