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

    it(`/REST:POST admin/bounded-context - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: '1u28jha879zqxfv8gxh7fwnjwhv46eof629qfpxn5xqvdzs84os3ndy3o9b1o3bndsvkfodgzvd2gv9nb130umsutdr1vtqvnros11z6pd2b7s5272dffajqdrx35enfv8m6o6h1ykiw11nm5nov877ukf9ojhpa7kyq5b06mvaroi8jyccn285e2hrpe3ae7c87zuretn00nci6tazy2sefjy7aik8t4qg4yibu43oh3z96jsgft55xksuf0yk',
                root: 'rlr06hqbeyfx81e3jwnc',
                sort: 733040,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                name: 'txz9siqgx2x0trlz2bh4q7mqxd782ubun74x7krdd8yigtsh6rbpvgas3u1i67759585bh4f3lgm32bsye5z0e29wsbmke40sakotbj0zk9zresz8rukswq5knirgvifjsar4vgtj7rkkd1qmba02xsvjifoihs8ey7w1b0j7capk4p7skiqg36rwom1gktnt1w694xzc63q0komnjq6199b4lmtiljok7p2a69tl7o3oozzcqspqsm7fxpok2t',
                root: 'pxm07zrslkf7x5hx02j9',
                sort: 705595,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'db1564dd-99ac-4a9e-b51d-87a45133fc0b',
                name: null,
                root: 'e9jd89zozdk64eobqj0w',
                sort: 271886,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'db1564dd-99ac-4a9e-b51d-87a45133fc0b',
                
                root: 'mwgg9ycolh7gwj5ofyky',
                sort: 155175,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'db1564dd-99ac-4a9e-b51d-87a45133fc0b',
                name: 'iim3nbc7j9n17fjqkdsd3vbyxfojzqpk2js3z0wpbz07cuelefx5aby0gsnze89p6rs2zrq0dpwerjvvvly24cqjds6xuuq5q056lj3rtnwzpf1xvg34nxu1a6kgx9iotw794revczd36qv27i0vo1b79i8rs0yyzyvaautqmxoipx2yrsefwkvj35x6vqcxrt4mmfzlcptxce250ap5k59bovxe3j1b5r7ek2fjd0bhj17wnv7fryffuhbh0wu',
                root: null,
                sort: 978867,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'db1564dd-99ac-4a9e-b51d-87a45133fc0b',
                name: 'jrwqr50zhqeggge6rxc34f6iqr4wgqqmejdlwznj23k8kr68emdwbn9xmx80vybaf8qj58rmc6sup1b0pf1ikdxrto5ub7mchoysionl1ijq5x3xtm5yffdtnekjypa3cr1v8psnh9u861999gnnj69mko5v6sqrhuk20a2mjui4c4euqqsi6vdi6aisbhvjv6ficohhbn8gpe44mz8l3fsh31uexnuwkpdjg9b2qv3b2idtuksj8p7j9f59wgg',
                
                sort: 631271,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'db1564dd-99ac-4a9e-b51d-87a45133fc0b',
                name: 'ulo8efymzzys14g0x9dsr090np4nnvsthdu9z5m263n1d9mpzqclnne6uf0nr9llw3w4sthes9grrn13548qhytqqeibhzhajpkdu8tjk0ifneom1g84z7czz06a5zv6g0medlojba4n4mh3skhlznbctevbilukl3x1i0fd690u6r9jnc0ahaacfee6cvhect73t2uid6ocu4pztxw9k9r8gowr6b37nnv83s3cmkrfje73s3pacoq06biq3l2',
                root: '9o6nnmtzvqw10rf4exyc',
                sort: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'db1564dd-99ac-4a9e-b51d-87a45133fc0b',
                name: '71tjg4aox07697wa78twkm2s5ug7sxmsoot8ly7pnoxn3oo852jd1olhx22a3y2zsbpcpc4eer1xxqu67rmptl1uli4w6bz6popv48yw79hln42f8dfuzhuro0gwqblf00ocrn3fe4o8ibtzczjvpv3t7t9qvvqoxxrqvsft5e4dek6v92niz0odfmciqshn5acumourcc6t5yg1fxv2vayscyo8qybycp6aqd45i1prcw378fz84gzwksenw2a',
                root: 'j88l18ikw879xfsjva0p',
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'db1564dd-99ac-4a9e-b51d-87a45133fc0b',
                name: 'cofpm9f8y3mb2w0gr77epeorhmsekcq7002osntntxkrf9udxgvh5wrwq3gzd6nx04m3g4fur2vqeajrbzf3qvqmyr6bcav5q90p7fopprwayqhg187iajz0sd8l5yer1127z0yhxd6jjhg9a11mdz93p6005ilqhq48vh1uz2orrg4rzdowjg09e6jl6nxtfjrmqxrshvyrx435b1cfz0n2ddcdhzc0jvge3mc2f1i8hqnwgwfna9kahj2x9e9',
                root: 'shlxu1o39lknvx8sqrk5',
                sort: 471356,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'db1564dd-99ac-4a9e-b51d-87a45133fc0b',
                name: 'l1dc6fmewfo4eeot30mu4x2vz4h4hn47rnevrjrso18jloitfczlemrfdlpnux1ym2wxrcajqk5a9rlfkq9fum9bgfd6xcgdlmxw8ltw2sq5lr37aiupn9vy2z1g00b98zunu1io28yu5b8rfq3tuicu43txes8gr7lu4gkgz6m0fyii6s1fx5oti388agxq1abccq66pnm9079ht3ev0phv4tbkzaszdu5qwkd6bozw9o43ludxyhjemwmmiut',
                root: 'll29ejnbbet34oneda5a',
                sort: 506820,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'glqc6g3vax0un1v9grk4nr29vlp9tom7f8cgo',
                name: '8x5n7t4khjav1y568lfwxkjpa1ghxaufylhd920fdh3oq5e22fl4c60nb84vzjmgu0qq1lru7qxdzxu3a3mny3ijcjncognq1c67l67n8qr1y8p2o4bjaku64gu0tln1rsgkbvlteddfpf4uda2nutfru5vnd3sjc1we724bj6ld0xgw6nieaabjfsztx7yapqn7dm1n76xwom3xifyv7hv2b3n8fxgegi6k0diliwvrzvf1unci30gvmo9nlmr',
                root: 'o6khf4i3z8julqdzz6a1',
                sort: 266131,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'db1564dd-99ac-4a9e-b51d-87a45133fc0b',
                name: '4fy9ekhei69ny25t4powqd9zcub2hyy6zb592ga2rtxc9askppirb7xvxp1j3a8v8awut39irr6z8fva4ob64rj6n5db29no21hyudx3ujhi1rfrdyu64q8yduh2rk7xxcllv919ljstan98bhbr5gg1ux5j0ygj45rkiyg4792lv4l0026buha4hsw10pi0wmpstp9vy5h81ic33338oslq7b53ekqjz6awivo6811lob91gp2xty09gompwvru',
                root: 'df98k82vy9109gbu7bpy',
                sort: 103480,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'db1564dd-99ac-4a9e-b51d-87a45133fc0b',
                name: 'qem12i53avz4d77nv8eiebve00iktl1mae36jk1pt6qtqu0inzmb0cv4octmgms7agolbo2rci44816lf0fgw9j8spwwrck29hxg7otyi57ggzabku2330dxwr9w3yek9nv183juuteqg02qiotvxfhqvf3hp9tl61f6jnal0iondt6oofrb16gw7zxuma77nreuv2sht8u5ptu7c96cp6qmpiyh4h764hxg4n28hxs6d4obqf0799jjy5e2buu',
                root: 't9jm28nv68vxy7cqgk5hj',
                sort: 974388,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'db1564dd-99ac-4a9e-b51d-87a45133fc0b',
                name: '3uns4zeamdv1i4iobpiv6gqmsjo6tzim9l7kf3h8w2kro8gxdmdbo46a0m5tc0wws3aksq0tvla127w5981743gwsotiq05joahn4ckd66zz21q8nf9pclx95jypvur1aumb843h9copcdzwlq7p9b5k7wi9nnnw3w7vwir2idx2c6zuf6qha3qm74y7t23x0agvsn18pib8596o2j5xzddslrrbbt2y9ofi66zfkzwi7nygpgw4rbgoragairk',
                root: '49vmawp9bmzbf84vygxb',
                sort: 7081836,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });
    

    

    
    
    

    
    it(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'db1564dd-99ac-4a9e-b51d-87a45133fc0b',
                name: '5ggyz9bacc1ed1gprdiv43jpt8hnh5ondomittzmm6zioymvdyodjtutdicxccmgeb7p5baed7dmai77c3psaagiw2qwbr58pljbmlldkeg1bkazgrgygeixa23wbs34ycrreew0c53zugi7lpx1eydv02zooddpa9z2dp5epqk4k00nm1g0yc6qhres33t25uh74urql6xovoj5qymt86yuv83kpeat9g2fnksr84e8ldkeso3ukim2j0hwc9x',
                root: 'vg1ak40y0jpmnapd0pnq',
                sort: 138614,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });
    

    

    

    it(`/REST:POST admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'db1564dd-99ac-4a9e-b51d-87a45133fc0b',
                name: '2avnp6e2c48zs6tyyjilgbv8v28y9jdvjona9lq9kz68ddayc0iqp5qh6ydfiwdgw44lwdts77fvlnrenauhtqcklggng7net6ep5s8lcxuk1nuc6jnaekk50xlxl19sppdhrq6b7r5n1nxjckme0dv3yum9dj07tioyzkm42ncjcfcsqsrk0sf2iyo8m0n1u5odb24x2h6p48ywyo2gm96i99e7i36v7mw1269km6ytkthvf4bnxl3ytwqoch4',
                root: 'zxifyqxbtrb51xwisj5a',
                sort: 916522,
                isActive: false,
            })
            .expect(201);
    });

    it(`/REST:GET admin/bounded-contexts/paginate`, () => 
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

    it(`/REST:GET admin/bounded-context - Got 404 Not Found`, () => 
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
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    it(`/REST:GET admin/bounded-context`, () => 
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
                        value   : 'db1564dd-99ac-4a9e-b51d-87a45133fc0b'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'db1564dd-99ac-4a9e-b51d-87a45133fc0b'));
    });

    it(`/REST:GET admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/db1564dd-99ac-4a9e-b51d-87a45133fc0b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'db1564dd-99ac-4a9e-b51d-87a45133fc0b'));
    });

    it(`/REST:GET admin/bounded-contexts`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-contexts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT admin/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '7959fb10-4364-4f0b-ab0b-3bcc5ec47188',
                name: '8c0wm11xwrj36iw9hr6o7a3nqdqycriw9t24pe416fdfrs63cya8f20hslvfy4lxdy6f7lrym6g9rrg13c50eihgek0gru7fr9fcgvdv0p4zhgydmkilcjcspal9z18j8ng0ooq6mn1b5cef267fkl2zthbqdlg26jq5txlz462im10f8wzup6hxritqgk9ooj7kcvlguc56ni4wk7cn4lwcr6jpoe5khst2za5h900l00fsq2ob2xzuhpkvmpa',
                root: 'jxwuhjt8ohfs77a049re',
                sort: 347870,
                isActive: false,
            })
            .expect(404);
    });

    it(`/REST:PUT admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: 'db1564dd-99ac-4a9e-b51d-87a45133fc0b',
                name: 'gwxq06wuj1ydbag2x5ocenxrxhisftczpd0v2nwi14njh0wjwbo78ued9yavhs46lttumn022wc74fy5h99roizq1awx2h1i3dc00o1xnah7gzcs9434k5fffpc7vy5a8hnmuwbrhxre0w4cu36z6zx8k2geudqs2hx0ddapbeaegu08b1v3j451kg8amwhyn14jrtxbxjisolpnttzw9nhfqxviw4lg4u3nenfxh98epuqxvfmvil1uuk79ph8',
                root: 'i7tbin6brgi0t0r6899g',
                sort: 121155,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'db1564dd-99ac-4a9e-b51d-87a45133fc0b'));
    });

    it(`/REST:DELETE admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/db1564dd-99ac-4a9e-b51d-87a45133fc0b')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL adminCreateBoundedContext - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL adminCreateBoundedContext`, () => 
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
                        id: '6a3278d2-0e16-4d39-9a06-abd98bfec1a1',
                        name: '5g03dgftl1sacwmxp04fm95ix3b2tijqxlpyi5u9tue1n31k1c2b46hbhuneo97pbrxhqsl5fqa9w2qtyqfukmfoqax70z1gw97fu9z7ofoqjgotwu9w1u5wqbwub2crxui4nt61gm4zvshz0xulkmeaofrlhmwfeffsecti2py161ve5vqplle3jb9eth81u6ibcdv58yiqa52t76widk61lr8ih9gizso94wnlpfwscl8klbwtiowwdf8jebu',
                        root: '2lcksrzp2lwbwze6hcyk',
                        sort: 413366,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateBoundedContext).toHaveProperty('id', '6a3278d2-0e16-4d39-9a06-abd98bfec1a1');
            });
    });

    it(`/GraphQL adminPaginateBoundedContexts`, () => 
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

    it(`/GraphQL adminFindBoundedContext - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminFindBoundedContext`, () => 
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
                            value   : 'db1564dd-99ac-4a9e-b51d-87a45133fc0b'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContext.id).toStrictEqual('db1564dd-99ac-4a9e-b51d-87a45133fc0b');
            });
    });

    it(`/GraphQL adminFindBoundedContextById - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminFindBoundedContextById`, () => 
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
                    id: 'db1564dd-99ac-4a9e-b51d-87a45133fc0b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContextById.id).toStrictEqual('db1564dd-99ac-4a9e-b51d-87a45133fc0b');
            });
    });

    it(`/GraphQL adminGetBoundedContexts`, () => 
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

    it(`/GraphQL adminUpdateBoundedContext - Got 404 Not Found`, () => 
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
                        
                        id: '467e129c-c59e-47dc-b966-72e0244a9423',
                        name: '44u4kg3lpdl3b0li1yzcz1qs1mlvzy0zszixirdb4in0si64dooc1jlcjldwmllrvab62s1ikr8fmkayzkkymvf9834o0paie9m3jp4cf0bklbpq88yrek8igtx5z3um9cscvsak6e0qfx2wpi43j34fdc18o0efjws1xb3pb4yui454udira5719733uyajoq53di5nrycplw7hdta4djdhid54f9zs42a0iuwozcgsgbagh8wxu5rwihq28is',
                        root: '2q29mgg9zeeu1j5tz34i',
                        sort: 324863,
                        isActive: false,
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

    it(`/GraphQL adminUpdateBoundedContext`, () => 
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
                        
                        id: 'db1564dd-99ac-4a9e-b51d-87a45133fc0b',
                        name: '8asoddw6lv99y4gbvobxtf5iyci0w4ju8hoe9392m9eiipxt2qawxxa9a4vcrmyv6vcnffa8yl2ili1uadrn4el0aip32rsc5rd06l4ip06l9zq041jd6j9vlc812xf89modtq2kr4dukcfo5p2djc3zp0ofy6c51a8rc1llow5fv4kws4ggublcmr2c33nlj6x7wbneing2rzb367u8msvhvkqpf8evq364yioh81k1lplpm2g0ebu64eknf2s',
                        root: '599snczbc52jl9tvn9st',
                        sort: 482949,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateBoundedContext.id).toStrictEqual('db1564dd-99ac-4a9e-b51d-87a45133fc0b');
            });
    });

    it(`/GraphQL adminDeleteBoundedContextById - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminDeleteBoundedContextById`, () => 
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
                    id: 'db1564dd-99ac-4a9e-b51d-87a45133fc0b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteBoundedContextById.id).toStrictEqual('db1564dd-99ac-4a9e-b51d-87a45133fc0b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});