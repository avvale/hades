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
                name: '1gji7ovvcsjj71ieo6c6ijvcvlo9edliw0hw0w6vbzqa98f0ce2zro1bqgloj15kos3m8wk5q8pookxhiyoil7f862vgto1kllse3r3zcux6b3uuvxpjkd9hfdo0cc68y901p8ujqeyrdl6emig5whz3cwq81kzyrxgsqg43vbv4cmd7lgjy0xwh5hxrc0yql59ud7sy6nkyq9o1pbs35e01sdwzuz400ny8305a89dzhwigsfu061q3dxpa91o',
                root: 'udt06gzl4kcui39xkinj',
                sort: 454302,
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
                
                name: '6923o1zjaqw2mhx4931ppfefjzijc78yc9c1wgl9nbym2ih0eyof89l3v9ri7nryydgil51ek3qgarkdy8u2rznfwp94ltc0qy8zzvr3fayeh34tnwr624ouu1qtn80djzslwdoyxbx9qg89ybt18v9sky9zi6cwxt6dd2cz9wa0qi9pay5u0m41fib3tbifwpm4jlrd8vj00hvdcrf1pc4x5527edxezr0w4kpoa12wf4177d4rlfwujpirfix',
                root: '7cngkog83jzc9es2t176',
                sort: 208220,
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
                id: 'e98b198c-a3bc-469c-be1c-451001d6adf2',
                name: null,
                root: '5cpipbfryo1hb4nv3ezs',
                sort: 922289,
                isActive: true,
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
                id: 'e98b198c-a3bc-469c-be1c-451001d6adf2',
                
                root: '620r3ektia7s6si7qcts',
                sort: 497103,
                isActive: false,
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
                id: 'e98b198c-a3bc-469c-be1c-451001d6adf2',
                name: 'kok2z9wuag0ukzrqdia5isweq0wu560by1zyoyakqgpxkuy970w8fmehiybrb8a97surb3xr33no7haz7965ak9yc5rzwfl36p313l1qx2cos2vlzfglmp52fvth71vib1yihwg2d43oewt3o5lbi5bmj84ne348r8iay8achhls5k8ci2guab0i63v5hgw4d8byqi52xmlf1pbrbvt6vrkjogs42tk3x0efitx2krjps412kjrllgxddznrulz',
                root: null,
                sort: 793228,
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
                id: 'e98b198c-a3bc-469c-be1c-451001d6adf2',
                name: 'er72na7iecferk0rxsks3hj2zh1mniptasx54a3e12lguzu26hp6jzqlsqjq03pjcxpunh3rmgcjf5b5jlsjzkufn01neb7j2dpmenpdlqx194hhj6xu7xxuvmkkkfhvstqxdp7q7qgq2b5blvlowvpt2esp9gju13hayb7vnkbi7szmy7u5sa1mhjt6azx32fxwgv9wmukb9ytn2injqrqi3s56dkmrzd0jhuifqjmk64f4wgusukyzsm3v5x2',
                
                sort: 528462,
                isActive: false,
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
                id: 'e98b198c-a3bc-469c-be1c-451001d6adf2',
                name: 'nm9gx79bc7rx1e8dccp9f9m3hswsdsglo1nrt3j3k28mlbtkoe2aqr295a0r4w1f9mzgr4hlyiro1i70xrg0g9vzjbsddd87243lko2j78vdjhbvgm2uv92sxuzdncw29oukwkn0iy2rcat0nv6wmm71wyra4f4siow3wxziuk5tznerrkas5zhaf2izjnbm2si5t0527vxd0gu6o1svo8dzobwrszh3z0dxklkfr8pajwaeolr9o81pb5lzgil',
                root: 'ytn0kdgtfysr9u4qub0m',
                sort: null,
                isActive: true,
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
                id: 'e98b198c-a3bc-469c-be1c-451001d6adf2',
                name: 'gx0cemy1w808exryxzpi7erxesmbgnlaxfzb4whmg9xd8fkhxgbmuel673iwyhjft2fk61vuan21dtaskafuv7wx9pk3ja7xp12rrroo43y17uztt3qlbwry2pnvufofqlzdwq3oo5pf7f94jrk3m80yhx6iode85r57p7zeaxbzyjaj7el9aiv9tkuu4wcewe6zdow880r7bo3r904gmoi0fccfg5ekm42l7dwp5qjybbuzxmres8mieaqpreh',
                root: '2oz3j35pzjlzarxfc7nc',
                
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
                id: 'e98b198c-a3bc-469c-be1c-451001d6adf2',
                name: 'tip00ge2lydi4da4ka35wovhbxs6flbx2kaxjxb52j9w340h9nq85r5qnsqz3o6qkis49ftm98ff6pap59hjf2o6u0vvg3yhatih55o9rc12mccdbwce5bf9ahyetem3onvyys1xa6lw0kba8efimdqdhycelo3ggpys4xn3sfllwl6u110jatj5wpmdrm2tzr7eux7n1mcs2ohfc7ebp0fb2s4i08e8k21cru5ha52kz4hrluu617qn3f6tjlj',
                root: 'nm782tgodu4f7w3fjbnj',
                sort: 446792,
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
                id: 'e98b198c-a3bc-469c-be1c-451001d6adf2',
                name: 'wboa4nlld6mjsioej2lfe49d5420kzvgne7j42ltya0zkdciybf2sdn74dg7dix5560bp39ghyg59yxy2t65mv1266w8eh2jlga3qi19vv1qxqmmdwnayi8ezve1f1c6eaxr9skikotzdheex1a34h03or6c00564vnilocxnomumbs2jb8o1sa3m3mdgk6y9mkekj279jonmsg095vc8mprdo4s88cpkl6u5s83lodhe6ffy6rkajy25zfrbb5',
                root: 'yna3hiriiwi3f232db8o',
                sort: 260449,
                
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
                id: 'jw6twa35kfjx1xxskxyhcbknwx7nfxeqqn44x',
                name: '44tbmu60zsufpitfj2k0369zcb4301kyw80zdyxej4suoi7dx2x74u21hzmthts3udtkk8yx3o9k022247b5lliiljvg2dubw1bc5h2839d1nopmdr4cw4sk3h1uaki76b1c9efxyo0taqnrq6vrpjz3mjexk2cl76zdi47x39ihk66uy3ax2mkobb2b7pb7wdxpibxk66fzhoufmgsk3ij0nhmjw4yrdixhs1pf4o0iteay5ij7ghcvkhgzc77',
                root: '0f3prx80bhn0go8i9lwc',
                sort: 338311,
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
                id: 'e98b198c-a3bc-469c-be1c-451001d6adf2',
                name: 'jwly5ng998mh9mbu9rmedpxz4so9za1aq9yrec6tidyc5vrp0uqoz39fy2jyy8mp8du3va093junka247rdce6gamj55ar2ls9u6300vl48s6zqboilit0q0m0bx9nixfwf0q0ls4716occ1xs4ze8x0cu79qr8d9f74hys30ak4679o0nohw5xlyhvceewoh4jtwn8h3d0kg62mx5euxvnlmcwxkc8pzssmd3lvz8k58pwzvxkz8ixl6z9wvit9',
                root: 'ss6a76sjgykrr87c1kua',
                sort: 480052,
                isActive: true,
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
                id: 'e98b198c-a3bc-469c-be1c-451001d6adf2',
                name: 'kmokeojxd5ugjs1e3os5gm15r7dr4vy06wqffwftxq5qzbmem6slggf1a7p8nvmprnrquispth47errpgfc894efl1rnzwge3giy81iwg2ovt4hyfpcto42ucnev0ggjesc4gcxfja476rxc8byrw673ga73tyzpxwpxuihax3i1ps9csu0kfnzvwfz1647ilsrwx9jvbwxesph6g2xt3ppozbxwsofnq9fj7gydwsl9u7lyg2sfbekgsl0u9e5',
                root: 'tiiye3oafjpyba70ahuwk',
                sort: 853598,
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
                id: 'e98b198c-a3bc-469c-be1c-451001d6adf2',
                name: 'v1exejkckfbjnbit23sky6qdung2icdfoyeem1n5rxutzknirr42t1yjstqtrqc9bify2tkcncx0rfzv983j3e6njyz06x91soenxbjt3d9rqo89l6hgnwjtqoej996a5asaiaepua0wpcgm1dua8vmiljkl51wlo4bc7kkhczn2fjt8v7p5enx93khcdzgh1v3ok29ucva2hgtpoibxta1yo8kouwr3pxtq1iww24qx07oaw5j3xf76hrvtvnt',
                root: 'cc8vpbby8zwdb9g5tgr2',
                sort: 1552050,
                isActive: true,
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
                id: 'e98b198c-a3bc-469c-be1c-451001d6adf2',
                name: 'nrw8xdsh7ers1njxi6cafl612yssazyavt4koemctam60ohubdr96j6xn4y9ahbbdhfu8xojhvy1ro5jbulolydxkvtrti0omej2me7tirxuncw1gvlw4iulq9yvtil6pfpsof6op7q0xxp5vcqe95a3no66zg4bzvqs0wcn7ui6qzt9fkmcorf0t4asl26108dxsbeos34ptntvqo83ehdj93j27p38a7bqkvpoh7z1dfxjs9105ji112zw9f8',
                root: '21hc9sts008aqyu4lq61',
                sort: 425807,
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
                id: 'e98b198c-a3bc-469c-be1c-451001d6adf2',
                name: '588yl9z0s4mh4nqssvudyqi5s68kk0sv5c3low0xqkzsf284zhdvhjw0uh4yhxh9ph6yef6m1slfd2n18iill1b8gdpw9170rr34v0xl1hgf0loozi0mi2qt0oa6g2kpjdzpc8fcodj7dna0hh2vok05g7glbguhfsxtrcb9mxbqz1p1kek67x1vsmb1jlpvf4ocvnodwglk10jkj9p1qbs7orjqlv23ev2ld78dq3i1f99h9n0hpqmsqd64feq',
                root: '2uc83yon9bpm3osenhrh',
                sort: 399882,
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : 'e98b198c-a3bc-469c-be1c-451001d6adf2'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e98b198c-a3bc-469c-be1c-451001d6adf2'));
    });

    test(`/REST:GET admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/e98b198c-a3bc-469c-be1c-451001d6adf2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e98b198c-a3bc-469c-be1c-451001d6adf2'));
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
                
                id: '7078b4d9-3f65-4352-b9d2-6b665a981410',
                name: 'svz2xse2jbc360mzit8m00ceytnmfx104cga084nn2qw5shqybainit8tjt5d5auuj7408t3yddy6f1015bog0qfyrvagrzqzbkjtuk9zqpyxe09bz4uvx6v1skbpg4hu4qnufxiku2ourvuc2r9l2sclbz46phodt2xg60gqk0k0aqn92vueadh29ifz7nxdk2rjjef0rxbglnbqbe5vj1w84q56b8jgmt2x0kgnogw5xwbbuiayngi6jyoazd',
                root: 'gszlw6ctkbpse0vgi1zg',
                sort: 308602,
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
                
                id: 'e98b198c-a3bc-469c-be1c-451001d6adf2',
                name: '4bm207qroj10f0ecs3r5lnw4bu7hj1zfho2y5ygqy9n0x6bkrqvp4oej4lmc1sq5b3ytwhkbmevnea1ev07cvur3iz04huizukqi9l0l4hqx8f6ncazx23vnjyqp30bzxh8uho47jn0pfsrrwios50rtk9hhjf2icsverkz77fpd6c8jx8rb6hajh3wtynqw0glt2sjxuxtu08wsya99otlnyc4dbilc4kdejc4wnsz264bvcso6ypy6i8ketqv',
                root: '4plhp2x8wchfh3cu1rcg',
                sort: 971601,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e98b198c-a3bc-469c-be1c-451001d6adf2'));
    });

    test(`/REST:DELETE admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/e98b198c-a3bc-469c-be1c-451001d6adf2')
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
                        id: 'bc914df9-06fd-48e4-9b70-325aa9b2d104',
                        name: 'z9zy9z06oop0lqpjf1mdalxlzo2surai76m291nrcl1c8wvjgjr1l367bzeptjc8c7a6a3einl0mpovw0l2kakeu5awgwusr6c09qx7dbbsarca58mdhffamgs21u1y9ek2sxic0t7mci89knlsjpt5tp96cbuv7vnprdo9at78ottm8yy555tk67srm5lwgbzibh1rovsjf13mrnzu3f4143tm6yk9aunoi5o84p19lltsf07v3pbkr5gwwq5t',
                        root: 'i315n7lqg2rmvurlamjk',
                        sort: 875667,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateBoundedContext).toHaveProperty('id', 'bc914df9-06fd-48e4-9b70-325aa9b2d104');
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
                            value   : 'e98b198c-a3bc-469c-be1c-451001d6adf2'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContext.id).toStrictEqual('e98b198c-a3bc-469c-be1c-451001d6adf2');
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
                    id: 'e98b198c-a3bc-469c-be1c-451001d6adf2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContextById.id).toStrictEqual('e98b198c-a3bc-469c-be1c-451001d6adf2');
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
                        
                        id: '5113d7cc-f9cf-4797-8f28-39ffc9e7d84e',
                        name: 'j59qlad0me30bcp8xmfznttk5vd719vslqdme2osnnphng2byyxicckget25w6dlta10cbnkctha4w87bxumyp07tv30igahoz0dfbb7y1pdhur228ovfnpkmb627vbvd2ht84ws7sj9afo7m18hz7xwgb6l0woy4vy13xkgo1cfd7towpmowkk84a5uu367hzpguetiioe1yef03v8swv1j5e819olo0qy8llaromde7nm8bx5rzp46qxl53zg',
                        root: 'hfczv6v5erhin1pt7k3d',
                        sort: 857050,
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
                        
                        id: 'e98b198c-a3bc-469c-be1c-451001d6adf2',
                        name: '7icwa96yvy968yha7ur4292peepzx2xn8y4xiiqy7zkusfrubui9h3rcw3hhixecve44a7ndorgegou9zqj9gfzoinlld2cniiqfyld3q5f53ibmue8ejf9mrxzj1x0xi4luc2vjzttrns3dmr0ypq40eg8mnroipfta6482952h2if7n5l2l482900lnxpe8kqruqci9jzfiv7yht5hicbdi4lizlvbp0hiwxz19wpyr8f3yy7fs4w4nj8n5gv',
                        root: 'u912apmtffnxlu4r0qag',
                        sort: 318620,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateBoundedContext.id).toStrictEqual('e98b198c-a3bc-469c-be1c-451001d6adf2');
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
                    id: 'e98b198c-a3bc-469c-be1c-451001d6adf2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteBoundedContextById.id).toStrictEqual('e98b198c-a3bc-469c-be1c-451001d6adf2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});