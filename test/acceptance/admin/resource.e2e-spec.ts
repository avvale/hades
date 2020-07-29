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
                boundedContextId: 'b8f3d565-b9ed-403d-998f-26b70f67d093',
                name: 'zwo9jj3wdup9rlb6vjw96szb5laj6lhs9c20h6nfflnija7i20uvlbebbmynp8xtytqc7tasr168foz6vw6akhd99frmqdu2hq478pb6ged2w7d08cq2nhb9r2ubnvadg7walb4uquu0usap12qbj0l9wl8qz5pxxa2me1tndfq7qwth29b4cmyi74zkfvtvns1m7ops6xlblc9ztm0tfftzgvqqrrnv9sv3y0indj3d8atw72iycz5xcbc7hjv',
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
                
                boundedContextId: 'b8f3d565-b9ed-403d-998f-26b70f67d093',
                name: 'uwp49as8z8mtdgaatxwru5keyf12ejfqer2dmwe8nkt16rcmq45xit8qpliubsgqwyfzth8b4s6zjmnmekq133q96gz8g1vqd5kzn69ksltrwutsslncc3bnpzz41s1oclgexxndf2e9i2mifc6kq0g6cujg3blim9be4as3cfe5693qo7rwqjj4ftbvfmci1241j4rasqqcvxbxesui9z8mysauagowd4j7x79nviy6oum0fy8ulzb6eoyvg7k',
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
                id: 'be31694e-e0bc-405f-bb9c-c12206802ef8',
                boundedContextId: null,
                name: 'ptowqgksi7j9y14f8bgc445iisfpxvq15ojqouqcc9v4ey5zwouu7qqeii68mcdzx7gelh458x2ztlmw8mfd59r554v5oiy128f1onk0ucbu3dhd7yquerc2hhzbvfoinooa6zs5ydbk8zsbnwcp0yssjocoxthojbazdwotm9uuy2n2yn5kvcr5rbt0vi121picqf8rg677cw373b23sd8wh57xkzebvtle23af0poaof7bzt1d90b5hnx95ep',
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
                id: 'be31694e-e0bc-405f-bb9c-c12206802ef8',
                
                name: 'kf54thmr0n4nwkooz1kuzs02vb1n99727p7owetn3gmah6pj5rmwrwrayioid6m33boxderbx6eiduur5m765b153mylxumc5vrl1ygybgbl4unjsg484t30fdlcz3g7q7qrch4p59d154yu8pwapj38at7cozj139d4q5quyv1brfkq2s7lnkgqmmvttlgcch6x9ew71u5swtq635edyvsowxcq9equy3gwtexa4chme03c0quth6677yft0je',
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
                id: 'be31694e-e0bc-405f-bb9c-c12206802ef8',
                boundedContextId: 'b8f3d565-b9ed-403d-998f-26b70f67d093',
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
                id: 'be31694e-e0bc-405f-bb9c-c12206802ef8',
                boundedContextId: 'b8f3d565-b9ed-403d-998f-26b70f67d093',
                
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
                id: 'be31694e-e0bc-405f-bb9c-c12206802ef8',
                boundedContextId: 'b8f3d565-b9ed-403d-998f-26b70f67d093',
                name: '7d73xzea0yv8efy1dodoqr8cqhur4l4k6a25balmim3uy9rmdan775z5sc09warkwhnjlnmzypd50yfwf72x6yl84l5b82j3a1957lw6w1ghnps2q3go175png0tugh1hbn3olf39ypxi9hhdzryqwylae9pvbki3y570z413eidz3pkq30q249nm5dwh0pw18t8y89rkfnakcwllz0lsux8dp9uxrm6jbp46hkz4dm1tcyi03rmqfxooxdqfqz',
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
                id: 'be31694e-e0bc-405f-bb9c-c12206802ef8',
                boundedContextId: 'b8f3d565-b9ed-403d-998f-26b70f67d093',
                name: 'flxzydzxvexw33de4lcptd5ez5ukd4colr52jz3km6ytorifg10t2kack8xfyprwww8m713irsw4hafo7if53wbont2y5dnz5lk4vhyk54ga7vijhnouv7vglxmk31d89wzbrwmkxuc9n4ccsxvslbv049wlz7gdp1d8wwknmqbng7ode2u3v6xz7damdv70xnn7pb4b7z7719q1moe4nszbpvwe5qwi4lvitch5xfcdgvn9pnhh6q7w1c4kovi',
                
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
                id: 'be31694e-e0bc-405f-bb9c-c12206802ef8',
                boundedContextId: 'b8f3d565-b9ed-403d-998f-26b70f67d093',
                name: 'aapgo8ookjtbrfdnlydnodrh2wuge1vtcat5wdlmi7fupbf0anpwibqqhgrivi1l0awk1zkuat55lodi3efmsnz3q25u7muofsb3od53lphrq3j7ugcbxdz1xpqbysxor0qct2ot8zlpxa1w3yae62bk5so2qlhzmag849qtbhq5nyqada6iasv0mrsp95rvgjug2ylxw4o7o8qiw2naxsr81hvubobtl9e6sph9kp5t5t7dy0pz4fh85ypjjjv',
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
                id: 'be31694e-e0bc-405f-bb9c-c12206802ef8',
                boundedContextId: 'b8f3d565-b9ed-403d-998f-26b70f67d093',
                name: 'kybar6u571ko6zkuqvi8xwjqnwl2y13yv17fzqlyyrxft6trn8q0kz52jcesk7lixbc6gcxa8q8exn3zipn608k4ps7o9s5ldk4nuiza96bzlgphq8je2qfetp3jkxevhjtfwr6ylt1egbpjbzegq9d26kqcm6a62iumjj8jl6etrqj41d6c8ept45o5qip0ife94qg9aycf34ngohtl5o5ezs1ow8kp4l88cmziqqn2mtpir8kx1mdouy5ugly',
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
                id: 'krh2tc4sgcujmxerp784m9tud1m5clurtvzpd',
                boundedContextId: 'b8f3d565-b9ed-403d-998f-26b70f67d093',
                name: '5opurrd605ua4c63fd73n4sruc89vm36lppf1ucqhppitsaudubj53ngkbuu8k9h3b3xi7ghxtaz1bsxi57pl3ws86yybegl51z7n7a7k94haj5hbwwb20iouhzjg3jhqj9ozvo36eu6oqi1gnnwjbesvgxhdqvxmwut45xfgru0m3fcbqhc0pwh1r46r03s0pbfpzp5nn7mbvwkprnczm9x0c745x1z5ake9qs82pmtvp8t8knlwk1q0cu2u9q',
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
                id: 'be31694e-e0bc-405f-bb9c-c12206802ef8',
                boundedContextId: 'hevj32xs4h3em8bwdpxdphya0ug5vcobe71h8',
                name: 'pnepoc1nb1kenfo5kq5qyzb0cc0ubmow22w6ygekvcs227yvhxzn5e2qoqqii8xtllalzightxh2m9eprfd1enj91q41u3a9nvvndoh1cidg7b9jo1521herl1xos6zp2mld9d8lqo4yxt6bqm5x2h0jkqecmuwmpk0omf0rop06prfvfpk1vt7qj2a3vp4raeulq5sdxzinjgjjok6yj7o2p4frfk4680ss3vrae4gdydnlhohpmace5p58puf',
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
                id: 'be31694e-e0bc-405f-bb9c-c12206802ef8',
                boundedContextId: 'b8f3d565-b9ed-403d-998f-26b70f67d093',
                name: 'h70ygptt99zox5bt4i3vw30u1j6m74vwqbkvq7m1lsntntr1a43ckf0iiwbhtrzqvf3q65a982vozk3ustncepfu4665s69fozmuytwt46i03130ccykbebf68z3t9q21s592ilo14qs723nul95feb4j55i3wqexispli6eoxsjixyqichboeagdtmq4w4wsmhcxdexjrox4x46yjtf4y1yfy8ypyhsj6nlwhqgrqi05oszajj6w83eiaf1wlkw',
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
                id: 'be31694e-e0bc-405f-bb9c-c12206802ef8',
                boundedContextId: 'b8f3d565-b9ed-403d-998f-26b70f67d093',
                name: 'qt8tx12r7ax07sngm9ia58838nh4hcm1hjal61euv4ov91jkd73880j4s6bttlkrdtv4hu2ts5ogsb34hbcjm6p62yls5dr26vwr03ue01r9s2koia2dip7x733d5e1npk47m46u1kltdladbpkr2ct8w81kpmtednvusqm0z94l048gns4pu7t50d83m6f4xbymf16786wmelo628aoncexymxtz35mgf7i217zxkvjdqp4nlsw981687l8md4',
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
                id: 'be31694e-e0bc-405f-bb9c-c12206802ef8',
                boundedContextId: 'b8f3d565-b9ed-403d-998f-26b70f67d093',
                name: 'mo6jiyhhqy3nkqcm6tkhptp1ck6b9cnopo3kktslud6rnn4fusmzzgjhlze4itpsdpt77bh1dz4ph9l31ychzudf9q8q6rqlop1qr65wgofu6texbxdzxbtnfo1uyuubpbtbc6tmjpj26lyhp38p8hrkeffjo24bj4itepamx4fq476kh2tm9ucudj1xqxxv3cje1ldsj1bb201a6c2zjkl4u6sh1lhbfwlelsg79urmnyspico1yu5jc4fo45v',
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
                id: 'be31694e-e0bc-405f-bb9c-c12206802ef8',
                boundedContextId: 'b8f3d565-b9ed-403d-998f-26b70f67d093',
                name: 'fbo4nn3l3l4tnlwle1ruql8q0ho9dt1gzh90wqixeu8zd8alun5uey8oxi8vt7enssk2wdlf3xmiqnsadkgzr616o8n5yeq480oq7jox5z50quwpn3som5f5z5tihzilp2vngo7owc23t66nj2rmaz9k4dxplwz0nl7xpz2gdm481sue0dc86utbykadvt7gymzm0u8mq52higrz5vzqe70xcru49t8yp4ls32ov5l9dq3f4ur63bh1xuppuj5p',
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
                        value   : 'be31694e-e0bc-405f-bb9c-c12206802ef8'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'be31694e-e0bc-405f-bb9c-c12206802ef8'));
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
            .get('/admin/resource/be31694e-e0bc-405f-bb9c-c12206802ef8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'be31694e-e0bc-405f-bb9c-c12206802ef8'));
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
                
                id: '773cfb69-d0aa-4cf3-832b-4f6615add41b',
                boundedContextId: '4638b3c4-b9c5-4c6d-ad26-14938be6dc8e',
                name: 'yn1u9jpwixxetzob90zptcm0zxaocz0vp0j825qftcjyz70exabscruzqga10o4o5tfk7y3fv7cq9atsx66g79z33pfpq0vsgwgrvb3z5db4ulyh396ullamiald22xwvay60kep5tnrsqxamk5k1vqowumqg9ox0ixj0euatp4v01m3pd3z984gd18ekkdej8eskt4lmydpx3k955m4zfi4t8ngokljscivuwlth149xlrc6o2773x20z2vs00',
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
                
                id: 'be31694e-e0bc-405f-bb9c-c12206802ef8',
                boundedContextId: 'b8f3d565-b9ed-403d-998f-26b70f67d093',
                name: 'nqoztfo858q4vybu4zhofvk9y7jsgpn3zzjm08qh1kx40o5b0i0wu1ad9dc4ld6t86tpghxljv277wf66tuvdmp6zzj1o2mrb8f3klazigoncqlthi07gflj5pe5ftz0ht2klacgo62nxbklzvmk43ldfab2kn6ig8w3pr2rwx9eebvt3mmtm0kasocn3uzdm1q9v15vnegy832ntdcnkngl2xvtg6fufew1hvcs3z2klziogfsar4e0zd8a9jy',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'be31694e-e0bc-405f-bb9c-c12206802ef8'));
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
            .delete('/admin/resource/be31694e-e0bc-405f-bb9c-c12206802ef8')
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
                        id: '4c3b8da3-d109-4015-8388-1973ae653ec5',
                        boundedContextId: 'b8f3d565-b9ed-403d-998f-26b70f67d093',
                        name: 's9lli9mi9e23e7tgc0by2vi4apymibafuv9z77quzjrfgf6jq3roln6igpuuqkhop6trscm22wkk1r46ln6wnsef2ard2rqskp4un7dl6svox6zf4jld32j21cyoeci66i5be8wwt4qwtr33s6uw4mxl8q1w4c8095tftxij2tfvz3dof6tk1doxd90b9ff0xwb0sifrpodhbem6ayrxuffqqryvejgk6m1p6kfdahlofqph2tzixw50uh86d0q',
                        hasCustomFields: true,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', '4c3b8da3-d109-4015-8388-1973ae653ec5');
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
                            value   : 'be31694e-e0bc-405f-bb9c-c12206802ef8'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('be31694e-e0bc-405f-bb9c-c12206802ef8');
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
                    id: 'be31694e-e0bc-405f-bb9c-c12206802ef8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('be31694e-e0bc-405f-bb9c-c12206802ef8');
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
                        
                        id: '1718deb1-040f-4d58-9907-00a1327e8ae3',
                        boundedContextId: '86e2ca68-c19d-4b1f-bb8d-ef216dd2d65e',
                        name: 'znhe1032ybsm9ipaqkwowio7bwwd6ukoudv2w83x33l01girikql0t8a70jp5ueuaswj9skhamwd8fcyhts1yjtl3cc87n97zsbvnmdt98x1urne0egv48j70f4hoyuvcrpujxxiz6lcytuy2dzd29pj6prbc8pzkhdckz0aqtloz22t0x3upc5jnjhalclp0a3ed448qrdqgfi7xxgq0id8ypnqsrgbprdod4bblhaluejtu4h84fjypcyanhq',
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
                        
                        id: 'be31694e-e0bc-405f-bb9c-c12206802ef8',
                        boundedContextId: 'b8f3d565-b9ed-403d-998f-26b70f67d093',
                        name: 'b1pbzncr11hof9jv3kcrcaqyt9fjx7qx4bgliwa3bas105tv72xg1wa36i667h3zufrobr20qe8f9rti25hrsximhr4okg0flfghf9kg0nl9nmf80p07egwmk68x4fdle1v2942zwffflam5371avyx6hhtb8c8up82xo0t6p7y0rmgezb8l708qlgaurojmabnkfjnu0hl9gbt9fq6xt2ltqo4qh82l889emf7lwo2okvdu28bruobhyzusl7w',
                        hasCustomFields: true,
                        hasAttachments: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('be31694e-e0bc-405f-bb9c-c12206802ef8');
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
                    id: 'be31694e-e0bc-405f-bb9c-c12206802ef8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('be31694e-e0bc-405f-bb9c-c12206802ef8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});