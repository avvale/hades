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
                name: 'zstsa4r8f6wathetf71c6ni7hf1hzidenh3bp6kmacn6xco4ndvhsmhmqwzro42qx3467wny6lpmxhlonvo9ku9orv1eyqnejrp5fcaalk3pub2h6ts0a6d0wt7udysl0xl5x0xmnv1ymf0pjkj96hhll4yeduycpe5aw01iv99yfpk2vgnv381hr78fe0zcchxem883xjgbjk96uru1icx7dmodj6wrzxpmggfhi0rpc3o9mi84xbw4rn6hc3f',
                root: 'd4kas67seuxbnny0cpp4',
                sort: 539782,
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
                
                name: 'bbems92q421f9olsq8kws812xgajgbaatih4u9ksetxuzn7dtr6gs5sn8jpjmqfbs0pnozld77hpvvz3rjwet5f6rksxh0cb4udxs2gdf2aofdnart002so51v2hdlvjdfwvah1p8wxmmhffgi343507z2o12zl9x18vta54om7i4ot1oz6zugl39fc267norrtfvovc85o377z6mdw6z7ed2x6okrdsh7mz317qc4p2g2zxymg9nt17vf0gwdl',
                root: 'q5u84vdaresap9loqdkg',
                sort: 801006,
                isActive: false,
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
                id: 'ea11ad2c-6782-4afd-8f84-a7832524f60a',
                name: null,
                root: 'ixcgog2s8d8ry6mjxrbw',
                sort: 400249,
                isActive: false,
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
                id: 'ea11ad2c-6782-4afd-8f84-a7832524f60a',
                
                root: 'j15t4xeqmkrtqc26woad',
                sort: 616523,
                isActive: false,
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
                id: 'ea11ad2c-6782-4afd-8f84-a7832524f60a',
                name: 'ih4m4zxxwrxsdipxp5a4r7hgkr8e2a53s4y3gh92m59fp8t1km4h3nfs9mrj7pogmmrj0xwar8iro5nmahk814njl770l2r2baaf08fumnnbs973x5d182zqdewq7vuugeb0jxr56wr21s323vdtmwmpwsf4rfgrad1ogvi2gtd3i817h54tkdw7vwm9y8w31rizowdx3nzgxltkrqx9kbsy5evts9apgfo2kkft2owb01385mwqi1hjtf3ucot',
                root: null,
                sort: 629517,
                isActive: true,
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
                id: 'ea11ad2c-6782-4afd-8f84-a7832524f60a',
                name: '7odpur64ydc2m87kt06suk70bjwnemul1nizo5oni49m9zzy5qudvtjkun2asm5l26ounr6h1eqx2ynbdl773cyqg6z7nin1ag67a7j4l5e6r5fcpi9bhutlyhf3wu1i2e89mobsv0b6utpr28d4baisvcpztwleoz6k21htzoekcsy0bffsyqi97lnw0c954xz9wsw4xkt94a28autkm3vi592hs3knsrklbc3kq5cx76d4f2nhlwoc2bifhkd',
                
                sort: 401216,
                isActive: true,
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
                id: 'ea11ad2c-6782-4afd-8f84-a7832524f60a',
                name: 'foiihnrrmmzb09lc3i23btod07hptsi1zu53hb4iq2ry8ruoqk9z3tx7lej7g8lbc4f1lp9z9tydoblb6ss368rnlxtmd06da84hez36g75udj5hyicfe0ls4fiwrlxgn5leyd4zcnvj9s084y8eo2q14l03q12olbqvrrm6c7kvsepg5g726hwna56qllw0y3d601upc53dpz6niggj11bcuvyqytl6if10xbnjbhn5l702ks5rv4q37yghpk3',
                root: 'y6qbphpguiliir1z3mjq',
                sort: null,
                isActive: false,
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
                id: 'ea11ad2c-6782-4afd-8f84-a7832524f60a',
                name: 'lm77j54i5k7epmwj13qui7dsg9xi4z9y48wl8yx79yla9uga4tzmddqhhu1ildx823u6r0nxl0ekxrrkn58cmlrgft41oey9pt6u9vrntkmxw1zdvhe0oeaw326zxxwu50qh7en75nuhs888h4uqa696kexb7povf5g51aph1s8a483sfwznk7xgu17b5pomq952jf3a3jloxtql6kyysss4h3idebmdyll5td0jxjtsrxu6arbj4kfev48948p',
                root: '6rn0viv4tbscq6al31ek',
                
                isActive: true,
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
                id: 'ea11ad2c-6782-4afd-8f84-a7832524f60a',
                name: 'xqff3v0g7pwc2wsb1xm6w7pjeuuyqibhxjnjvpxt62big57gpz2amruj040ydiox4dt0oou86gcd6xj3lht61klz3rr4z6ft9fzpqofkcg8oncmvj1qzf3rpfodec85wv6pul4bf8xr78rhcyto3mo9jafkozeixii9mmgw1d6yt3kxglftyqdowlug41p2t4m04iijdj7eqfpzlekq53p5jlxd4zz08bf5h9hv2kwpsca4ti4gmj2fnzf8wnvu',
                root: '6qut1x9eww6sp2irzii6',
                sort: 145097,
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
                id: 'ea11ad2c-6782-4afd-8f84-a7832524f60a',
                name: 'p3olcj4n5v6pz985tl2tinsflh7cadlsp1qfejtanqsj3db6yd48yh3seo5xiud5tsak3gzm04xhqefe84mfy10cskba6tvar3nsgu3azgfjvwjbmiw0h0pkl3yd70vuitols881oom71a4pix632msuievnmtsb38whuscw0sg05ghrvl2ngtalteyju3isqabxl6242357eq5zoxbzkt4ivbwucoisobrparn7jkthl9v5w3hy0glbayue27w',
                root: '1uyu69za48rzxf1rneec',
                sort: 595306,
                
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
                id: '6ddjpljk5wb84mrdx93usbr0p441470ojxngc',
                name: 'l6gl81lyfdvvni2hhi36dklomnctlidg96p496oskmxxe4x08vsduxzyhlsp4xisvn0ojr8u1blxu3hp1i1scl3yy5xorf3huuvna8tvnxr8noe6lwcgf9ulpu7x5h492wuxg3xm2t36hl8n6nxs5plt2bel7lrtav6t7d335c28f2qa260cybd9r7nt4h7hupdc64231eikgg0am5nov91a7gsz3tqeitlj95jnov3x6fbtdhqjqwkgngzqcaw',
                root: '0womp77g38wvd4raig9z',
                sort: 500067,
                isActive: false,
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
                id: 'ea11ad2c-6782-4afd-8f84-a7832524f60a',
                name: 'jtlze98zakh76joekjqfiix4xsiduosx9hy7f8w6rfhn911mlgsal1zjt0gu13bl1efum8q4v4z2272ymcjbgapfu9r85f6dcj5kp3c6gfek3k3p00j9761v1mz8vi1eh48hvs5uo4x40p52wp7jbrl48ebhff0hxp90l1ux9dru2kzkttaysxir4ce6km4ybu41rv6albky7ntizmt4ny4dzpiokmjvc9116os5uu6ofwt3xaoxrik7li9pwv54',
                root: '5aql9b4qsqolx7atqda8',
                sort: 782885,
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
                id: 'ea11ad2c-6782-4afd-8f84-a7832524f60a',
                name: 'iesyay2rwz2414ahma39gyovwor6sln45e9ekpzgl94klgnzdqjtrgzxbcerdvt1dfvgz798t07dek9zcv0pjfpujdfn2lbid3aw3wk15e5d7kmb4qyfq6ugopmv7d3luaanjpmclc5gtqtp5l9gm4uit26hdf4y1az0o2n158lp2mnctio1928kofh4cra0ypo6wgpitq4f1gymkp689xa6lhyktwkd76rnu8aer8eso72ow8re3efj8mv6ejz',
                root: '7ijskgwalk8fdrt3ebp08',
                sort: 534352,
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
                id: 'ea11ad2c-6782-4afd-8f84-a7832524f60a',
                name: 'tcrx8gdjqv5kdq9ym088cnvryibzu4dr1fj3ueoyhna09vc5fvr1yssdulayg85vhidt3eoakp0idfhv3cqss3gqm2zxcs4n2rj6mxw8vt3irqqdy35kxf1lifzyr6w88np5u41xwxhfht9vgn2h1t7r3rmfqhn4mfaibtj55c5tyyjijm9a60cv8qmwknte0os0fmx65ekdv3yxynegdhrz61mijion7q87ikz2iv3g9ixyyuzmw654lb15s72',
                root: '8mlxhlq7xximxojf0xdv',
                sort: 1070303,
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
                id: 'ea11ad2c-6782-4afd-8f84-a7832524f60a',
                name: 'u6m9iic1h0d0o9meu9fnrj4xk0o8i1i1t0jges6timktoxcl6nf88luelraouy3jnbvzhpj3tcbupkimv0althg3o4u0hbjqr1uk4qlczrhurhcm8koouexyp9sx3tmqms6v1sizbzmxn4sezjbvshmkn8805wo1r8yv62eb4cj6mpq248ioklbcbl2u0ez4qnqa2y58g49cvs9r04syw68dxsif5pzmkv65p8suoq4znu2zf18802vdvhj4c6h',
                root: 'gq6ajjwviyqrl4i423rq',
                sort: 636526,
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
                id: 'ea11ad2c-6782-4afd-8f84-a7832524f60a',
                name: 'm5pa0ugkvy34rfnmpmhrs6xxyvuh6y47gouj9n94joicvv5htfep57vddkjphiffcnyv2t7yycsh5jfjh6d56nxjxnrsq6sf0ufkl9h7paqum4jonz68jk1ep4d86j7fj9fja1eyyqgai9ycuk7361fqt2m7f9yrigr15z4iv6f3ulkizpttivt057apa39ggbxczw6cnbgziuzsf87oli1mueh7bu9y4u19i9rhy6kwapwe81ilq7h7l3y4cus',
                root: 'hg7objyrectwatcjk2cr',
                sort: 700010,
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
                        value   : 'ea11ad2c-6782-4afd-8f84-a7832524f60a'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ea11ad2c-6782-4afd-8f84-a7832524f60a'));
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
            .get('/admin/bounded-context/ea11ad2c-6782-4afd-8f84-a7832524f60a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ea11ad2c-6782-4afd-8f84-a7832524f60a'));
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
                
                id: 'f370bdc6-f8f4-42df-9277-90ca82e6da2a',
                name: '50k5a9oc3e39zf3in0ot8yitkm0me35se3gjtpumgajg1c3w317soawam4905qcue9lzhr0y937b4xlwp0bhfy0fosy1kdznareby920uoymaz1qn6jh1d0sjb0slhzf9ht9hkrmdbqbw1vja1eycexx48ilhyjwc1pskfxo14y190q7bcwr36if4cu4wpvbpofrm2yr661hnu1l9k5ttvobu7muwisrxrbd4owdox2nd3ujpsjeguawddmotms',
                root: 'whkm8edvtryapxf56qjm',
                sort: 160014,
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
                
                id: 'ea11ad2c-6782-4afd-8f84-a7832524f60a',
                name: 'b9mrl7nws2qunnr8pqv2ekq7zeilepd802o1i7lk0x1urnd1472ikghjhwjjls9r1o99e6d36p03wlc17wjbl9y8st3gc4m3bd6potp7f58lxw5zjbgda9zb5vutxy861p3o41qc3ysb6pnb8ewy591nw7c7g1lx02gjnkf4f1uwhq7etm74cgs6ua8d72j9ej1cfn7zdt52y0g9gyqadh1vn3ytbellzdjb45zufcbcqjkwv0w6dl6rcw0o79i',
                root: 'e5c79jav23s2va35e93o',
                sort: 927990,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ea11ad2c-6782-4afd-8f84-a7832524f60a'));
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
            .delete('/admin/bounded-context/ea11ad2c-6782-4afd-8f84-a7832524f60a')
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
                        id: '8d382c3f-50d1-44d0-a39c-7ed2fd3f5524',
                        name: '1on2m5ykcvj6ax3xrpz2uvhtcjyugzpn797nf18soom44nhhy6ioye9ao3xhq3cxg48hgwxfra01qi1m42iei399zsztzyakpra9q9co51z4lrt8poc47j6kn4yh4a2rdmqyomarsaxfjkk16qk7n1qyd2b9hyq2xrzncop9nort1hic6obho6j9uocw57xr3rmldy5dqovg5rrbxcamg3twuuatxod6pcdka1ab71u3zq4qunea1cxu74qjpbe',
                        root: 'jxctgeuekqfoxnwfofn3',
                        sort: 578034,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateBoundedContext).toHaveProperty('id', '8d382c3f-50d1-44d0-a39c-7ed2fd3f5524');
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
                            value   : 'ea11ad2c-6782-4afd-8f84-a7832524f60a'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContext.id).toStrictEqual('ea11ad2c-6782-4afd-8f84-a7832524f60a');
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
                    id: 'ea11ad2c-6782-4afd-8f84-a7832524f60a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContextById.id).toStrictEqual('ea11ad2c-6782-4afd-8f84-a7832524f60a');
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
                        
                        id: 'd50c0cba-f84c-4f9c-86ab-2221e366b590',
                        name: 'o6bcpie79csallqq5goav9zzx3tas8gblqqlpd0v57wk8cnz6jrw2icjo4wdw4mfi40msh4lujq2sw3vopbi30qb5xsqpye4any918kukcp2kbq29dsiwow94zo78vv454t6f928g31qyibm87mye3csl2nhktx3b19mazycrqetebffuoh4gbo1n3cb8arpmhqjbbdwnc83xpfa8dgz50byliy131pbl4esyoxcvynwe66my2874o6gvgkfw4h',
                        root: 'qdi260yedlsqjt66baek',
                        sort: 448633,
                        isActive: true,
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
                        
                        id: 'ea11ad2c-6782-4afd-8f84-a7832524f60a',
                        name: 'ti3des7aylezn3pbcj3aqnznr61ba1c2u1jwjld2pc9o1rymyf6l2wbtwwjazgsp8l5ace1o15bcajh6a3aa4ibr83uljvek2uwv5gm7urfp43cmkyj5xmm0nmqsrf68gwa16mppv7zn32orgi43tpnod08huv4dsladfalx0hetlyhlmnkdg7a9ij9u954ky97iuwibc2lzvwbw2lryoopw30aavoz7xg5bg8o9x9nbr6cyh55hu5i70orufa7',
                        root: 'qqkd8us16dc753vyq12h',
                        sort: 639559,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateBoundedContext.id).toStrictEqual('ea11ad2c-6782-4afd-8f84-a7832524f60a');
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
                    id: 'ea11ad2c-6782-4afd-8f84-a7832524f60a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteBoundedContextById.id).toStrictEqual('ea11ad2c-6782-4afd-8f84-a7832524f60a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});