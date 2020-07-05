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

describe('resource', () => 
{
    let app: INestApplication;
    let repository: MockResourceRepository;
    
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
            .overrideProvider(IResourceRepository)
            .useClass(MockResourceRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockResourceRepository>module.get<IResourceRepository>(IResourceRepository);

        await app.init();
    });

    it(`/REST:POST admin/resource - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: null,
                boundedContextId: '7c1f725a-2fd6-48e4-b73a-9814c76458ac',
                name: 'b9xsrbtxqq3we0uc9jtp1c5drbff1r6q34zdb7xyzctzq3dj42csph35bfo22ktcsqdcfij926h08bbfkgwujwgug7ipx1fnmw5ysafbd3ffzogx286d14peezd88e39l7bfett0elt15d453ywqpnr68joihgebnzzuqra9cxyiqbxta9sn7cusscb3xsspp4lw4je13ceybylrp0dl0dlhmw02amulog8j3kqthtcez11kryhqb34wc5rv9qf',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                boundedContextId: '7c1f725a-2fd6-48e4-b73a-9814c76458ac',
                name: 'c7s4ht068yyqjnq40z537cssy2dtym9i9o95ocf2b64acypjp8o4m3rmvm4n4idlkkrf5dwwriitp11kze2ahy96gz3hf249fse4spcxwszm7nsr6o9vf6hclnhphoxfxzfqs8nmi4iz07ooq0upj7euxflnwzh9uqph86nheo2qxxl9yd0kxuv66bx999etio098j1xzrdkxtmidu9sx34n8b747zjg5vfynm0qnc625w9pgg12p7zbpnoo32i',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90',
                boundedContextId: null,
                name: '8q8qladgt9ca0i9phkqsmopdc73magxwterg8lq96sa80dy5z0z876yehhegb86dh7bf03v3svhq8ci77k1ggrule6k7gslyhbocpv5wul34v3fb7oicnvfirmsbjhkp47rw3bpvtov1ctsiq3og8kvve6ujx1pgeidl0khidb81nr675n42thklu1lcbbiooxxxd095lvk6mukj3tvobr6lb7umxacadxrwxt1hvrgv0o14wzl5nxvd164za6u',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90',
                
                name: 'dn77dv4nubbusyg27r41v47k4wxtktlyzxzax2jst2y2qnz4k4bpyu625hthx80fcdoji54rslnqzz7jrpdg3ycv3offgsd4roushhs6a6cpu91u3hc9u3rubsqgoyu2ppp9xx2ff4vg6mly14peisxea1scatz29c2l83hc0ahky76ev4ig60bn9w4pzj7fh1rja3ktxi0v0zi6n5ipf31sgcbpoy0tg7kojunijmvjntvtg5fzddhvl2ykg12',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90',
                boundedContextId: '7c1f725a-2fd6-48e4-b73a-9814c76458ac',
                name: null,
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90',
                boundedContextId: '7c1f725a-2fd6-48e4-b73a-9814c76458ac',
                
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90',
                boundedContextId: '7c1f725a-2fd6-48e4-b73a-9814c76458ac',
                name: 'oxpmrkijqpntakjxkjbtsfvy7y8gaeuq1cs8zgqtdziz0f5qsvwhnn0smxmi3hag88goayp56bs7fdjvhz6420o6iqn2vvoezzqyafq75l4h3yjkpa0zqt0wp7v4cwp3ukzqa8ucpf1sislrp5za9z36b7jfg3kpqfw7tcj82uls0wxcgv0hmj1m9edjvby21ymm81pvfnd98dtl6ema0i8r405luj0loptxo5samgzngc1kzpbb8p7dgqojmka',
                hasCustomFields: null,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90',
                boundedContextId: '7c1f725a-2fd6-48e4-b73a-9814c76458ac',
                name: '8wj485kov9cwu8f6y3dgzgt0gv1tu907qyvxla9uak1uqgad4mr1u68k1wndudz39o055jtwqzr1pl3ekoun8qjhjysro29ieyxprmlmzakkm8zcyx2lmxc8sky6q53i8upgerl7o7r6f4cqzfqhfusn4pbkg2rky0j88c9iv2dt9uco9mvnphv5e39p091gwh7v6wcm00n8oy117fofhdprcmwf5b7atkbjv7wzyxyl0y0ffcgn586h3us7j3o',
                
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90',
                boundedContextId: '7c1f725a-2fd6-48e4-b73a-9814c76458ac',
                name: 'af1uop44ooo0sn8a0y11zrxdmu5fh72k3u38a3x4i7qeh4pjch07lxkxvpbaypumlevdm7wv2pfs4n0vmp4fhxczd4lcpcpkobak870a4xybdd54to3u88e7vub3m1oyioqi0bzgsnt269k4jpyjphm7pkqr9dtg05wnmfh1u1io3r0n4xv8ggszkhz8h0az6pb062cubxzkg5n3hnz8fsv2od72hdh2ha2yozcebyya1utxv2sb6vxg0crfyem',
                hasCustomFields: false,
                hasAttachments: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90',
                boundedContextId: '7c1f725a-2fd6-48e4-b73a-9814c76458ac',
                name: 's9mlaroim7qealtdaqzehqlzmp6xp65rv04p807c9k57zvzjjuo6w85yrhwmwtjtg2w1vnz8np5pj9y3vq2yxfmt2swwcsywjehl3fxr9keghgv817uoazn7r1wuurwj25zbuh2hedho2odbq6cnfjbpzssbpzbmd59x64wgl9yz7fbj9o9k88t7l3ndntidnutczez9pvoqettcktay0dqahd7dzu8wonku3t58zxkwdkgvqgsruizros2ejmf',
                hasCustomFields: true,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: '6bv4ew9jl949oeb8bop3jgul0wgrxeqzr7tro',
                boundedContextId: '7c1f725a-2fd6-48e4-b73a-9814c76458ac',
                name: 'gzg256o0lohz1mse7ocfbfq1he4lm9ot9f257g8l33kbke0tsq47jl3tiquc7s59gfbqq7w9mmvncx3znqla7km65qg987is7lxrkmsknm0x1tgfsbrlmyib1o2uy8rg96joz930knplrt6m6yeo06edxxnhjfrpg0ixcwkovenlnmtm2vtyvvq2xililuv5qzfja9whnctygbd1b06rburxeeeyl7fmg0125zvydeg3sjl2rxmlmqviaqctddx',
                hasCustomFields: true,
                hasAttachments: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceBoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90',
                boundedContextId: 'z8vvgq58hy0xdf3ll4nmrzjwzotufk6znysb8',
                name: 'y3109dqyciq6ol0mykeconsuce7dogbz08tf63m5i274htxx06l5h5k3j2pm7l1v4anz7p2jpjuzqbk8h1gqcgbugqudnet3m1i8xpfxmbnk0jk9hbuw51zxsedp5mmz2spbjeflosw3j31ceb27mhn4juvgrad9nrnz9csk1t3a8e4iyhwzp98qv2c5cos9hptmmnivun6ai84owxk89x0ldwqizzqtwcna4rqp42ry5eo99fpmz6u1fy347b1',
                hasCustomFields: false,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceBoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90',
                boundedContextId: '7c1f725a-2fd6-48e4-b73a-9814c76458ac',
                name: 'rteb5e9au84lg7lklg7gb8xi1y1i4oq9qdhnol13gglywjhdp2jw4tm3rd07vmkgzbuul80lp1l26wb50i4t8lbrjl1rytbduo84evcj0h94lp9hykeea57sd3gmtgzrd09j5pgrpywfzidaf4es6b8rs258rke0lf3neyazey5cc8wm76ugtjjhz0q0l1q6s2q16wxuyb5h442qgp7r1bmmuzf220ygeq46wh73v9nowd7ht8fldjz7g2cjwz61',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceName is too large, has a maximum length of 255');
            });
    });
    

    

    

    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasCustomFields has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90',
                boundedContextId: '7c1f725a-2fd6-48e4-b73a-9814c76458ac',
                name: 'oixbvty1ud2ir0efr77nr8czuj2ejzlb48ota0jyrwaw6cniza5wyw4pj9cwy9nq37pqj7zs8fz71j172vdudg170a5x7lwl6yzd8gg9jxdbe42s55lzdk51e2s38rxdnb4n2it35oma3signarqnm8c8j73o3z7cmmb036z8ar7waw9n0ppfjfbs8p4ur687n2q8lz33ipjtozn650tngfb7srph8ij644n92m6jatxv7jbhz5vablm5qlge7g',
                hasCustomFields: 'true',
                hasAttachments: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasCustomFields has to be a boolean value');
            });
    });
    
    it(`/REST:POST admin/resource - Got 400 Conflict, ResourceHasAttachments has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90',
                boundedContextId: '7c1f725a-2fd6-48e4-b73a-9814c76458ac',
                name: 'v7opjklf80per67v6dxcx2z5ybx7vqxlowgpkzrmuuaomurvy1uo4rd6j8bg5cv6k101yol5sqncxumnrats5biada9am0g8mtt86oukh72mb444dz2dklhaec8spfc1ya8j9ctz8jhmldqwot16vfigpbfuw36flp9oyb0lmp2ei4ha4zxhho7hpvj2ua0vju7ry9mnq693r847g86fpdlnlz6t1vqnki4ea5qb3krn6rje4h76e39peidg7fx',
                hasCustomFields: true,
                hasAttachments: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ResourceHasAttachments has to be a boolean value');
            });
    });
    

    

    

    it(`/REST:POST admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                id: 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90',
                boundedContextId: '7c1f725a-2fd6-48e4-b73a-9814c76458ac',
                name: '55hf3sqc6sl15x8q7t0rke233n8yw3xmospkdg0yn4manpewmrggslraricjrgmpjr4qjau9yfkjukyqcrhpuewabphi77ec1wdeob5fe83x4o1yr7mo6mdb44i4uuzu3m9rmuy9j8qpy0c56wc2jrhyyj91fuby6yph44iitno8dlgx1bh6rcvfb4aqa30gh4hxuo88rnz968bw11gpeg6peo49ygvc8qba3gplssz2hyo7svuzelhtza6ik3i',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(201);
    });

    it(`/REST:GET admin/resources/paginate`, () => 
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

    it(`/REST:GET admin/resource - Got 404 Not Found`, () => 
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

    it(`/REST:GET admin/resource`, () => 
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
                        value   : 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90'));
    });

    it(`/REST:GET admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resource/bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90'));
    });

    it(`/REST:GET admin/resources`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/resources')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT admin/resource - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: 'def3f25d-20ef-4286-9f86-9e160b66349e',
                boundedContextId: '7659423d-621c-410a-a614-6034025ec637',
                name: 'w3ltnmrnhj4lwfpz3kcbzs5uhr83u0pokbn4hho84s32o8o55g4vhhek1feee44cpofot1lfldftu8pky1toxaufre3kl1wz1jvg1emljojhtsn4o53iof8i8fkdnu5f00ii41i6gxthmnyoc6uyz3yolcsp2e9badmz85d91kzm0vpr7jh80r1md889e2wr1dqhqk37p2qn6a2ibrjvca7y7dlxrs5302qhk49uo6vwz4zb0tw1efdaj423n9f',
                hasCustomFields: true,
                hasAttachments: false,
            })
            .expect(404);
    });

    it(`/REST:PUT admin/resource`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/resource')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90',
                boundedContextId: '7c1f725a-2fd6-48e4-b73a-9814c76458ac',
                name: 'whatw84uy6d10y4ikhvt3z2zftoy7kymjjmia8tf8eth4uamp7967iug6e7zq38oqojoqnsptxbzw67vn92wnjqh3szaj6f0aeior19x70saonnha0m6kdqqwupx9qu0zqc5k423d6ch4luuh217rnjxn72sgo2l6wdml884g9ojtrek3e5strv4ubz9rwcvzbm48payykoyaos6ag3bwlw4imswr93xnwc4xnm8n3gde3a0y3pw4sd5k2fz7iu',
                hasCustomFields: false,
                hasAttachments: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90'));
    });

    it(`/REST:DELETE admin/resource/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE admin/resource/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/resource/bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL adminCreateResource - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL adminCreateResource`, () => 
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
                        id: '4e2e6a6f-51a1-4092-a8d0-fa1ffb09ca09',
                        boundedContextId: '7c1f725a-2fd6-48e4-b73a-9814c76458ac',
                        name: 'h0ytypcwv5t223v03rs7c1koxdbfcruaae1qrqlzzzvzona5ocbsjofe48ik321s31gq7mkxe3gp7kqt4oqfmlaqgoksolx73e3jn1r4yio3r3d8sws9gl8bqovp3ey8ugpmkwivls6g825rb4p0wzkelm40wq87uqum2uggxfnk4k9pbqua68orp1pu5tjw21zvi40ss6j0olr5jysn9nrgnavv3j46sk8gv0wi63segfmva8grrijwzh3dvay',
                        hasCustomFields: true,
                        hasAttachments: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateResource).toHaveProperty('id', '4e2e6a6f-51a1-4092-a8d0-fa1ffb09ca09');
            });
    });

    it(`/GraphQL adminPaginateResources`, () => 
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

    it(`/GraphQL adminFindResource - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminFindResource`, () => 
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
                            value   : 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResource.id).toStrictEqual('bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90');
            });
    });

    it(`/GraphQL adminFindResourceById - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminFindResourceById`, () => 
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
                    id: 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindResourceById.id).toStrictEqual('bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90');
            });
    });

    it(`/GraphQL adminGetResources`, () => 
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

    it(`/GraphQL adminUpdateResource - Got 404 Not Found`, () => 
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
                        
                        id: 'bfe376dc-3fba-47e3-af5b-5c2e0bac00aa',
                        boundedContextId: '08a544c2-370a-458d-9007-04e1dd7d0219',
                        name: '7k9vfbwrt3s44qpahsqnw6lv1zdkpklqzrz5163xg4mp6xxhm9u55p44upjxq7i7fa29izbo0a7e1p73gwg2mhkvxj68pb53hl1ugccfajwf2gya6la1ekm3gtbqwxw60xmxmhqn5aubwm07fbiegrf52xc2a6xfx1xywr6v5530qwozrzvkp1hl42yph8he6a57xfrd9s6vobtj9umzty6zp4xsyzqjzzd5nema9s71engmxg56otnvmb81eaz',
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

    it(`/GraphQL adminUpdateResource`, () => 
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
                        
                        id: 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90',
                        boundedContextId: '7c1f725a-2fd6-48e4-b73a-9814c76458ac',
                        name: 'yy7l1gfy1qm13gjsx3htnmqbyms9430zjc87tdnan5kib6aq58coblq0gvnq86utqrl0zgwyvl8a8biypfs9rhh7hn2gs2qo37h9cnxb7oekomaqkqnb2cy2v0d98sarwmxjyeazsd3f8ifajq7f9dajy8jx51sxcqir16gfhzjia2m72v7kz4oxhtx47xnpjnr4li0lx53l9b1dfz64d5k0nbnvb39dj3k5hywuv1wla4slzuum5yj8ambpti6',
                        hasCustomFields: true,
                        hasAttachments: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateResource.id).toStrictEqual('bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90');
            });
    });

    it(`/GraphQL adminDeleteResourceById - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminDeleteResourceById`, () => 
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
                    id: 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteResourceById.id).toStrictEqual('bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});