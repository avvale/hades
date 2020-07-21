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
                name: '3im1f5jg3brlccqu4utz9d0orxbl3r0yqq075nahrgk7w0236xbrc56zmb7zv3030x20diy7it50myo15m6gl8qwy2fvufr2td98emgflcl0l3vck3mdp2fvchui7hbv4dasp5r4t8m08ershoto6yn6b7d8zp0w6dtkm1a1eq42j5ryhfpgl5oytme40z8os5ei4ox232ydp98tlfyl5wnojfz1f75df5qltx9fj28sjadf6h8uyj8d1an7dns',
                root: 'ga46ve4uxfq8ydft78fi',
                sort: 366970,
                isActive: true,
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
                
                name: 'g03zjnkmxtz2h9l7nzw656jyl3qnellzo9y3d6na903eool4c439yrimnaw1pbznk8fpgjhashv23q47r0gncc0g4w249otf40d134nf0qu4cttl3vb3plnepr5h0yy1zm57225fbf8tg3nah455s780y73zprqzg862b1onkyjo7869szx0js05faet7na1gujcwnflwgseud7thd5bupexo6ea48jvjamdxgifzn9bs18d45bbxh90yg3wnry',
                root: 'yhef2llnebs88c4uo3uw',
                sort: 370418,
                isActive: true,
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
                id: 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc',
                name: null,
                root: 'ffeona4wq4y3fx44214i',
                sort: 991590,
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
                id: 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc',
                
                root: 'mn054etzfvfa5d6n9nca',
                sort: 307439,
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
                id: 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc',
                name: 'sbtgvpszfezsu7hv9khlh95jh546fbco9m47hutfc934oj5qx2j83ferdxir0h2bqf88tushyhavengl3ueqj4syqi6ga3bv3lu5u0qzqk8ipjaqu8ajdcsqym7zan49jqd7g43q361kdfgym6qxu7e5dlmhes24wh47gqwypyljo2ivifw033f52rff46t37vy7fnn1zl9dxjb9gk96rhprup8juadu7l15x5v922jfoh6q996t0moy6w7bsp5',
                root: null,
                sort: 525504,
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
                id: 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc',
                name: 'wufocxw84qn50irrzktaofo88kig50ithix3dvl5snjh1yhca277tb7v3doxg65zpdrbj5esmsegy356hnjywg0annwsm9i5c00jllbcdmc71313b6yuxkwueahflj43ghbn1xki7gmxj7jrygj0wbczn8288vz964a5bldcgcnoble5g6p0jtw2gxg105dvgb8g3tt28xjh2djeo5qku4m5ixqa3xx0ou7jkzaqcbosryovvpjf5xnl4s1v74n',
                
                sort: 144364,
                isActive: true,
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
                id: 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc',
                name: 'g00b02qdocazku5lbr1a3zqd3wbfjmja9450cxf3w7u4r596pjaqt80kmu1qzoptbtjmdqcmd21qlctewmr238buvvkae5f3vmv70wkbcu04agx1yqd9ppe6wd3dzj8nc99x13ilun9fikverynowmcjqu0dq3u6yaaf22ejsgkjgmihukny72o2lzopfpiar5pumsjp9t7hbhqwjjsgecs8281gpq7mrv9s4ksw8k0e2qi4p3ip1swub1yua1g',
                root: '70yk9b1dbhle5n5b9l0m',
                sort: null,
                isActive: false,
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
                id: 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc',
                name: '4cvydi4u6d01yywub7zt3xt04ylbnbx67jckxp1cvtpejemamvugrxx020vqh1v1fooc0rzfao64bhync4zqebmzvgve49kuvl4po61xc1j658fwphrwr1p8vt4fgdz24wif47kbb0ma5kgbnm7rg86yhbeqnxrx0g4ywqophmup5k104973dh5udz5xg5se312q8vav2b06uvczvektvj6b3vf7mnpozi8azzq5mj676qlq4crbuzs22m6na3z',
                root: 'ss6g4uszk4tuttwgedek',
                
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
                id: 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc',
                name: 'w5czilajlwrl4x0vvruz54sv19goysh3v7zhnl13p9pofult0wt3el4vwqfhlbslj1x24g7mg1dnuwskxgbzlbm88qeiyqdegybrkc8viyxb3l0mipldoufvln53sk57vkrs39592iigmvfx1n99g6yucs11gzwd3wva2gslat6y9b3apcu0o5w5ddnlnmgzjhzzyblmkrtwrscfm25cltgs34vgzooh38m6bs85g12r3v3eis1n3u8vxw7zlet',
                root: 'ty97p4muxpdshk4wxgqv',
                sort: 536391,
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
                id: 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc',
                name: 'wh0t1zhiymq1h2tz8hnqoeyeimgmzlxgcecwtxo7q5n1zouofjqtb707fqp1ltq23dwls5v1pvsjo4sf70oihrczqkf60piyg0uuep7efvv54s9g6up1nhk0yecs18ox2iazqh4rx42y6yevdlntfo18ueejyjloon213hj3zg4ovz2hmwo2jc6row9ygttv3a9oe1hrhmth9y819pcjoexsx12f4aywl6q2rzjt0x3wbtojpdcs0gyugv24l9h',
                root: 'dkv7hh3lbo804x21z0ph',
                sort: 375023,
                
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
                id: 'b2v5b0lltakoybrm3aary3vqov8r2jqfdddex',
                name: 'pu1vujj4sfi14yg9hwxgkgfy5jy1z9hhu3sobjnjeogm3wzj9zagr21nlfp2xrvzfbcxyz8nad8rn9lxl95m79nxx7ukxb4rxtonmntvsx4d9ynp2qdj774ugn58ho1mylhafc8advghlsf62uo9007eonls9fb4qx7etjfpka71foa8y3bwk0j2qtqp6i1sx47o8c46snqtaxxro1k9vrwg8xh2km7vuot1kk077mpddjtg8su884gg18snx92',
                root: '2fvp41vmoee87lnzwd5l',
                sort: 751604,
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
                id: 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc',
                name: 'ju3tn3oi6pndl6fkvo6ew3l7psmzqq63vungkn005gd30a5dhrv7dpgv2l3a0l4bxduhdxnmay7xl3ryw2fdu2k5v3v22jqcev8m5xb2ttkmfrk2kf14ijtln2chg8pd8cm1zf25q3697oow4qk4m5iflqjhch4n1caj7u85j8sbcj9cbp63m70p9wmqzamlw28f2miz5c33l9ogqms09o5uekw2dzp6ela6ykb1ly4i4s684qbwywb4j1ssx09x',
                root: '1u9t4vxnnwvmz2bah1wz',
                sort: 380757,
                isActive: false,
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
                id: 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc',
                name: 'v3l8iuq3maqusqv8jv18yw6fdwb0z2n6f3pwhlpxzlejh6i3i7ix5lntzwt7afnxgg968kpdjq6iugzlips73fwah8ctrqp6022ue5cxlse8w5ehg0tpbd5i5r5y86iv5y0fr74tx5vz1jq19y1etzkb7oaqjuj9r5xcm7nn8bnovabn2ahs00v20u2znss4vtziroydmgdy0tzqurz2hbymfhrbdohgxk28vksfuw8dnydqlmwi3gluzkfdkr8',
                root: 'w31cp6hptyjdbeqc057wt',
                sort: 758245,
                isActive: true,
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
                id: 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc',
                name: 'ekrusutrsxo38p8axni9wd5yr5l5w0s02t4eiv62wkdj7rvqqs5wx81i57d7i6njzll09u8b3e7iwfsbv2cue3lnybdsqu5b334hreukkts0xrlnhb5g14ysrkhmt9j4f6mt0gk6iwerwgib0cnu3kaxpydvas91qun5qqjx98pigpeyosx4d501jhqjk4poqf6ss8rt2bf8yuxmj95okn8li8zsjp2re7p4yqw9je1di2jivwmttsosyqvq6id',
                root: '9c9krq0sm92s477s7iof',
                sort: 2988054,
                isActive: false,
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
                id: 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc',
                name: '33l5e80dbnaatgdde58hlx11hs50lr8uh0wycv7ij1x2f9xxm4n5932e20bjb53w50h2c6i7zs3hqqh4xzo0t9b9tnx6oenp1ryzjh83z1uagupq3gmosjfrtqz956gz80o50yvhwr58m7g6kj94cta3isuuisq5m712wjf4o4l525azjowbxaads45higfrpw4qrgm1d7vuuy0i9oh9m5ha5546k2jrv1kc5xlv6en7rdgbmlxtgqdqaqlir62',
                root: 'l8gsortojy8osovgoa8j',
                sort: 957630,
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
                id: 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc',
                name: 'gfx1uoc9kiuqai3lqvikkh6b09q2eabfvgacxdghs3taqkx1v8wq1e9g9xjcgdhe0zi6k7uoomi09sd6u51mzqqfmsyl6xzip3tj4lg5o7uhftel7xshiad0h6i3i5ru6lij8lpf0b6p492jhpnqbjg5jjzmi14qefanckaf5k3uxrxize4g5gr16il0th6wjor4ds1wnt679an9k5j849or0fbw2glm3umli66mb9kqepamf2d7jcdtwx6ps30',
                root: 'fe6f4x74ui67bkttym3o',
                sort: 454319,
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
                        value   : 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc'));
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
            .get('/admin/bounded-context/fe84c0ad-e326-4c1d-8775-1ce2a82260bc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc'));
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
                
                id: '8d2ebeed-a8e5-4976-a222-d5716a7b31ea',
                name: 'zjnjzwal7zl0ry4ghn0bhkyz0fq61ce6ikwpstso98o957qx3ju45peskrw1dhj14l7dutvpqi3vkyhn111jyuwr4ce3jz2p439emmbzw5yb3ld4g3exua9ezxss2rxhe4lzkeeoj4lkpxrroexdrj1am1704rd60rc3td0gonrcu9gn76q2ur8sttrhs8vqf3c7weet1k9hgsfd7m1qlk22xh16ryjf3cnsnlbdf4qig90u6t40tgebxtoascj',
                root: '2t70kleeg921kwaknrlf',
                sort: 493190,
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
                
                id: 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc',
                name: '2c40qygux96mc1m4ev7pfdra69tk6p7wx7j0gj6t0k1e0zp85ax3svxn1sbsz86v27lgxinnana3uvfky7991bncr36dleyiurliwhwi7p47e20fqez0sfvje0wdtskouak1hcbrb4nnjst9sur1jtcj1f1xeof9an1oxl00lfb1vh07rb4u819x89fr36lergeetjzcys7b64ymf7tpz85moazv2jvadfqmpdpae5bziwzhqlv5jp9rsr1rgl7',
                root: '4wsaabqbnb3cabhofvir',
                sort: 133526,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc'));
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
            .delete('/admin/bounded-context/fe84c0ad-e326-4c1d-8775-1ce2a82260bc')
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
                        id: 'bbc4af5f-3d4e-4204-b772-0f832bdcb179',
                        name: '4b53gz900qsakbnav5q3bfsk273bli52tkdjhvpfricfaoxll3koix0xp7izwua7m8x2o9ldtzhebnehiia2cby5o0c9zohj53sss7fpr8skiy15jrtn0ttvecohrrnqcpwkxqhry8qzfq3wkahbo2550njsns0bbhvpmcbwpv7nnc9raoyl168fmmorqtr2wulnt9fjko9a48ml2iyt5gz2s4bskpn5utpoeedyy748ras7te3yruoe9ycdpy0',
                        root: 'gk6r0hzig4adm0e95g2w',
                        sort: 237509,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateBoundedContext).toHaveProperty('id', 'bbc4af5f-3d4e-4204-b772-0f832bdcb179');
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
                            value   : 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContext.id).toStrictEqual('fe84c0ad-e326-4c1d-8775-1ce2a82260bc');
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
                    id: 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContextById.id).toStrictEqual('fe84c0ad-e326-4c1d-8775-1ce2a82260bc');
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
                        
                        id: '40bdc80d-4ab1-46af-82ae-7ea71fef2828',
                        name: '208szxsaq7a301ru4pwij5292lpvgc3354ctwjk8w2lnljnxpagnsehr3ld7u269fvsgxcslnjv1h5dzz7yeg9flp2mpq8u1gh0rff04t97bah40q326wohhnov0wisxzh39pxktb1tlu8yakxd6c9pi7wcls34c4jmeqr41fz50nprazq6806ox07c5aowyq8in0u6osh7cyr90l3gs6hmvzvc6dddbzcq5ez2c1zpbnbnen7rptdy3vfsmnb4',
                        root: '0nemkdpgezgrq4qsf9d0',
                        sort: 764520,
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
                        
                        id: 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc',
                        name: 'dpjbwcbegu0lwrlb4g9jwtwr2qsabqdjsv1adl6oo6286ottvbx4rp6mgqm9it941aumc9px6fgllcd7iyineueh2fva650xkmaxkoyg47s4p8igt11etkzm4twcmu4aia745lyg33atp8ftlho3cpsexmsoxm1l7n0zbpwon26yl45pemmtjla081g7u8trh8krwo9mce5wus1mbmjr77i7l83bnn8x1i7i2gs16r4gs5qax8whxmfg5btx50k',
                        root: 'mhz9rc11ylqx69owycm8',
                        sort: 280777,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateBoundedContext.id).toStrictEqual('fe84c0ad-e326-4c1d-8775-1ce2a82260bc');
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
                    id: 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteBoundedContextById.id).toStrictEqual('fe84c0ad-e326-4c1d-8775-1ce2a82260bc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});