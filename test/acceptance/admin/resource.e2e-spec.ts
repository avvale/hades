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
                boundedContextId: 'fd5147f0-8c9a-42fd-9562-1770439a07c6',
                name: 'fkl3zcpv8nrmc6z89hxhjit5fsr341byqruequ60d0im64wijrvwi0s4mldr4wcsliwegs2acwp9k6w66y3vom0r2aux0hagy9d5jci7d4k1yrbue9q5ny56dsq75wds1xukg9gjwb2lg96de0yv30mcg02ugv9rbd6780kj87ewyp9cvccbird83tt2w4c8cgjhrs9rjn37xcdb9vimdurlibcj0dacvogd8a1ya8ousgv588vwxn4y3136fng',
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
                
                boundedContextId: 'fd5147f0-8c9a-42fd-9562-1770439a07c6',
                name: 'hr2n9pkfk90u8ajhh2nll9vbbdg9vr0f2gx6bve4bi7gqk2i5xpsik8npi00ytxufblbdgnqbr8bshv602vb3we1x0jt1gnvu7pysifksnlnvsz2nsr48x0mqdaj0xr0qe5g5fta89756wrz880zyhdxu0ki02cfjhwyi3mkg2fgm5dky2afto1csapzsq9ndq7yssr27m2unqw0kf98q3pnte5g4rl1ufnwzgfrwwfz26vghnld4vle7y9q1k1',
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
                id: 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd',
                boundedContextId: null,
                name: 'bq11q1piqy9fcf25bwwxle5krfbyo0f1dvpo17kobczfwgf8et841r5kmrmvy7tklla0nnhz9h5p4jfgjauakvcv06bwae07ovry5v8grchb8f681l2jphlrx84lzs0dneiklzjtuymvsa2lfhc0v0heaz6lvfta0i5qvahudg70wkcdy976q6hwemgo0mpmfzcjf403t9804e2ih7tp89wm1po80n6gja0gpju1n5ir57de45krehjdf0f360q',
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
                id: 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd',
                
                name: 'j443u8h9p77ejeirb8eyrhlfqul7ojpa3lva16i5r987yjbcs87vw2lulvxn1qiw3gj8ku601exht2dwszb4dmayg7e2skdp8nqqywp5b6dl4xvk95dhdgj6h75tadn0nnm156b9cq3a470656j9b33w46n5tv5vpdsurflmu1jde6g2mxnv1y9n7j6k1u4q2wpfze6s00diru5ulp305qtye31vzsqkbolkfd6blsdi46hxakm3730c0dacdsy',
                hasCustomFields: false,
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
                id: 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd',
                boundedContextId: 'fd5147f0-8c9a-42fd-9562-1770439a07c6',
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
                id: 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd',
                boundedContextId: 'fd5147f0-8c9a-42fd-9562-1770439a07c6',
                
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
                id: 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd',
                boundedContextId: 'fd5147f0-8c9a-42fd-9562-1770439a07c6',
                name: '7g6dlxbm1h6cehpa58963anwzhm2byqnd1ryjpb1dykyqe1haq9m1pinpqdw9m93k97apfzyzdixh32ep0h6dj0jkmncni6wfxxzgc36oem3ludspad1htv62mjntckwftlc2j8uh4rjb0e664ivumnppc8pn6qmd0c501ep99uzocpfnsrgj10b8ha8zza3157oh073lhd1pug016dp1cxxdrli2nbi1mihxwauh9vtwsd8x6s26i2fqysa5p8',
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
                id: 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd',
                boundedContextId: 'fd5147f0-8c9a-42fd-9562-1770439a07c6',
                name: 'twck7mkfety76gt0tgitpiygniwaoyrkyo1op9estfd6dhv3p2ve1ksx0gkwtege2dnw3v9ry1yhc0wwziwup788sruhptzb2wzfwokpvychsjgx4onp3oats1j645x6o2e87yavy3e6ky7qxcn4uevhx5vj6vw4daj9pdx2p1guhnddnk25n5x3ejotrigq4xsc2d9ys10z6s5x2dtbo0ctn35bqyxibavs76kyw2plvh71tzzh0r1zo5wz1dc',
                
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
                id: 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd',
                boundedContextId: 'fd5147f0-8c9a-42fd-9562-1770439a07c6',
                name: '4iozzf9aoeejnzzd44oxdwth432nlp5yj3cjcr97niv0gq7fmsxcfv2axqynmjiscuq2v8hrkis8ns7m9twijc38oi68y2svqzuf7v1us4d9nt6l187cqlikkzk5raw71i2w991te93sa3h982g9pnfw5891qdqjk9s6yjpsfqrlf6rs94twy2iwr3tvw0q7l9gb04crl8qbx56v58hjpmjwnjk39cfd48a26zu1ca00s9pdvcjqh5o7u5w5u1u',
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
                id: 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd',
                boundedContextId: 'fd5147f0-8c9a-42fd-9562-1770439a07c6',
                name: 'ni92ligosrvhrg29leokkejla4wkjzoqqnuip8b9kf9i1g283570kedx4pwethyvfwjjo12z4y0917mup1nkyt4xd5hqnuqooifh0ivink05amay9s5cljqs8ok5czt7obx6abq8voqr4nhwmgvub446gk6di57na4jc8mgebl1og9xqwvd5kycfombkzid56t33sogtjxgvhrx251wi13gctvklsoso60ik44nq32h0v5aqq1kzpitfza0k6bk',
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
                id: 'rrl6v99ibrugfp1400i6ciaqxo725t253xj6y',
                boundedContextId: 'fd5147f0-8c9a-42fd-9562-1770439a07c6',
                name: '65o12keevmex9g04hoi0mlp447tk2uthfojqpz9v67wyx07yg8r9wblswrwptd9sbwdi0cva8y82qkw9zqachow2ifba7hbrph3x43zfgrr57t4qofnrui4g3pgimfkkugotd09n5hdzlgr6ejdgcl6m324p8cp1gkkcu9lrqlgyj5a6e2k8hi99oht7g65o3erdvymbg1mjus50402r5s6bq9qzbrkim74m8pnl837n39kjvdhmy7nz84gok0u',
                hasCustomFields: true,
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
                id: 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd',
                boundedContextId: '6zldw0nnudxyojkvrv71aqggladthnzx5nzeu',
                name: 'qmpock1bb2wujfm90ltp4unlfjeujpgkq8x55lwvmg2u8lw7e1llmbjp58upif3v9eggr43gim0aahl07rlkrglsdnzdbjlsozqs5v4wchxcpfscb8pvw0pl5s2psl41c6f5oyyx055opzvuipvi0g72t7o8205fnrgkoa203wfkfyguy2ark2uoqnf3d7iwqrtq3xp4tsiz3kislyjb9hrm82b69ywspegiifa57lgv0f7wjcmf20gym29n1yn',
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
                id: 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd',
                boundedContextId: 'fd5147f0-8c9a-42fd-9562-1770439a07c6',
                name: 'sla49dzowbqxewv5kkoqsq77kqodotb1oi6k3rzvy1sq7ycllaskf60r5kjhryfinnxjrzf6nv8ej2v59jvz84qmotq61dmsebthxcqu0ngj5pxuykuuuo7w8hh79gui2fjbdozjyzel6gog8q8hnf61y2c5q8ttcwnunptpf2wamb1jpfg2pnleh2x3i1v7xwzedngwcdcj260z34388dx51qn7wg7fen93cul2i70y7x8mifbhvb4fyaa6m6bp',
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
                id: 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd',
                boundedContextId: 'fd5147f0-8c9a-42fd-9562-1770439a07c6',
                name: 'k97rh6pyk8wyx3jp6pljxhse5iytiis33tc3ru91mpb0159s4bkbd6r3gvivvmmdop331df0rfeh7uiig49rbhl7qe1t0s8b0znt6k0v7ht2g47ocib6li9a71inl5ebyine5dh0s42l4t6yohlnx5c62fh3gdktoxwjwr6zqc5ih4tvzcen9v1c8un6uyjlkf1opl8jwqde0cgwaokw2pmhyab03htbu88dwfn7e5p5aev72lqz4njna0x33gb',
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
                id: 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd',
                boundedContextId: 'fd5147f0-8c9a-42fd-9562-1770439a07c6',
                name: 'rynscmg75mrde5vkzcubxpq5e9ivepsb4hokwbadllpdqm8ox2mz5svm2cejgngyhfi921je0c7ug1wsnkrc6p1v278kiegw5mw9c9dekvjc2wdjd90cysbb3w3qxtfqy826mn4zs8sll2876qxvz3lqmofjgx89tfu3udp5cuohgrzi0nk8kivgtcyfiv9li15uijacb71m92lhwglbboi5dll9k8trndoyohxw6rujzowgynhexwbnsy2sd9y',
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
                id: 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd',
                boundedContextId: 'fd5147f0-8c9a-42fd-9562-1770439a07c6',
                name: 'ng4o5g4lantfp46ubhpydafj92fcm9sqqms5rwc3c8dvb1ej5wzbwz4zqahekqlcjxpyy4c6ld70a2frduyz7uh9efz0wr8tz69hxctyhcqrnppt1j9piooidrrmt8a1pdjn5xjelzemku97ki6490gn8cxiruxilh6gc0los7zylohiix68s4y5ekk4ma05mj7j675tswrbh6ahqsoip8unv3z1uj9j50afigpguovly8syfk2f88cg5gliwut',
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
                        value   : '97be3680-61fc-4eee-ab03-c2978adf5e1c'
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
                        value   : 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd'));
    });

    test(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/cd9170eb-4e9f-4f54-a90f-eb66dc484b3f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/ca9c61ea-b7d0-40f5-87ea-6238bd504cfd')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd'));
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
                
                id: 'e39fad4d-e820-449e-83f2-57dca3cf5ebc',
                boundedContextId: 'b3c5ffb3-850e-4732-b60e-cb582af61776',
                name: 'bpvn78d7c20f6p7rkv87czvgwdxnwnsz44p0j4bwcaws67vxwlntfj64j1idi2ivytcka9mhzjkfmq8f6zgwelxkqms1pamnsj62gpiw7y4p28cb5zopwp40b8saltxqq019mbka3kyjdps8ue0vmaaimb82tmztzwtte6bvobg45v8x0a8l8ylzbtofgnjl7wrc2f4fn5pkm2bjn3xczi3xdwhuv5blzskavp6kyexd8jr1houq9rd8mafjfp5',
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
                
                id: 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd',
                boundedContextId: 'fd5147f0-8c9a-42fd-9562-1770439a07c6',
                name: 'zeryu6v9plqe822fpsnwtgpp7fc4xyxj0gwt23a1c805z1mca62vkpbgph75cii8ud9p5byal950vwj5n1gvam1831uepuvj3qgm965j2i2rg4n8xzm2vg1p6zi1gl8svq4m5r7ycgdg7lg9i6i60hdsff19xzs3zbvemr1rtv59194qzby0k6jsy9sbdc89bpevxl9ooed4kyneagggkay70smq6vziv036gytlup5riqpk572xl3iubua99ls',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd'));
    });

    test(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/694ad108-274f-4ef6-a8ee-f69fff715350')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/ca9c61ea-b7d0-40f5-87ea-6238bd504cfd')
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
                        id: '8bf9540a-fa8b-48d1-aceb-ff0cc1b8a33e',
                        boundedContextId: 'fd5147f0-8c9a-42fd-9562-1770439a07c6',
                        name: 'o77hh9ifhw66ts4154eit8j55znc5l031d0y3f2w7xc6vd5rdoltd1vnyo6gfnadjf2ccj2ni2z7o6t5cz8c0ce5681tc18jbuzvs0hnyqiooan9qhfu8xs8c3cpxn5wts8g5srme7yiji4c2y55q733cyvrjchfogae2v3us8mfs9arprnsy9o23r3wyu5ufb9ep2w8ufc2awkmnmtkqxtepfsfnodsh64gurmwt0t8uvgkb751cldx3tkf1dx',
                        hasCustomFields: false,
                        hasAttachments: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', '8bf9540a-fa8b-48d1-aceb-ff0cc1b8a33e');
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
                            value   : '37810067-3e14-4612-bc37-368179de0415'
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
                            value   : 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('ca9c61ea-b7d0-40f5-87ea-6238bd504cfd');
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
                    id: 'bfe781dd-395a-4afb-85c8-1c77f3122750'
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
                    id: 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('ca9c61ea-b7d0-40f5-87ea-6238bd504cfd');
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
                        
                        id: '3a82539d-e09a-4345-afe5-4b1090811f7c',
                        boundedContextId: '43973892-b138-4552-9e4c-ef1a97b7c581',
                        name: '1b33l7ii9tig24dacdcz39rknllkdfi5fi54z8r9tnfniaefhc1jhyecw2w0m1i9qb59ysifn7ahrp8x4ucm2va67p67m8rq8jh6bksc7rr341tzmpauf329ypr7hilkq4il3rk6wufatruj6xjm4txrvp5jdyj59hnpa0ax2ajewa8c1gqchhcvd8ni10ylp8ptkskp6n3rq9go1so5t8kwsqsfp18tz3l3nn4eek4n2bx7iy0hf5lkdttb8sa',
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
                        
                        id: 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd',
                        boundedContextId: 'fd5147f0-8c9a-42fd-9562-1770439a07c6',
                        name: 'cbm805x6d4de70tybcooss03vf9daa2sfqf66vlwdzwix8qi4c498tqkgf3i0ga55ofgmw7h0s09hc7h0f7gdrns6vve0sxuqnmien6ujf7gemtpu4c8dmpq8i6714bqdgiebmbe9emln1azoyu73rd9yhdzpvzbb3b2vgbaybebd2xabh5lg145ffs72g8tdm60ldl1kzce2wpassmp1z0f2hzejmc7iq2g3q2nuq5l5tcay20o8sb28cx56mk',
                        hasCustomFields: true,
                        hasAttachments: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('ca9c61ea-b7d0-40f5-87ea-6238bd504cfd');
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
                    id: '8f1fb2ee-0630-49f8-a8a4-d1e5188ed948'
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
                    id: 'ca9c61ea-b7d0-40f5-87ea-6238bd504cfd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('ca9c61ea-b7d0-40f5-87ea-6238bd504cfd');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});