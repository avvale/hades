import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IApplicationRepository } from '@hades/o-auth/application/domain/application.repository';
import { MockApplicationRepository } from '@hades/o-auth/application/infrastructure/mock/mock-application.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('application', () =>
{
    let app: INestApplication;
    let repository: MockApplicationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IApplicationRepository)
            .useClass(MockApplicationRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockApplicationRepository>module.get<IApplicationRepository>(IApplicationRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/application - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'usmyz43ssczefp2f3hk6yyokp0zeg86phisw4epkkd043mfmlb0wvvfi8f6ps3elsfp985j1agzli6quouw3i21bow8muv2l46bhcv0axzoeybpcipud85p56xz7sartp9m5kwn6pu3twx8qb7qj804virulv6w1adjzkok41igncbncvqmpk2qb5hwcyfxc644i6q944mbfmg0kejgczwis2p4tsxkivcbv59v9797se8evkyxzsmufg8m4jcp',
                code: 'hi7s35n0tvmy3eeu344ps4229k652wjebkk450zmj6p5inpcg2',
                secret: '8nkrkef96jtjuxfhz3rozccnv5ikcpsicm518o3ckb9lenvrp85o9x50mgb4etaorggpi8tcmbadrbhj87dbojpin1',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                name: 'uy2e8krabmh03ptikntkb47uj58z9s1b5k0il6vy2phpnqbchadjowumwrjghesgojnhvau34wstje37neydnuubk83002nylfowywps075jrpu3bdwtj3dvrj1mn56mj9f0ysng6numl2kq4yk5o9yk9e5br7oeyfzc0czvvhmfvfv2t5466gfgdncjpy27ppzv919rz864uecpinmijs1eongufbiw3wothvn9y8zr6wim489pirns8ufrnkk',
                code: 'hmvcdbe939co95ydw27b0674g9gizlebx0w2b0cpcz5xjssa9v',
                secret: '5iix21kdsv2p60wkak4heb459ys5jgpfesmrmuj81xlfj5zzl16w40k0zi47cf18wjkt44sxzzhboblazv35cjrqpn',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '6f1404f0-bf52-4024-a26c-3adf3c133072',
                name: null,
                code: '645in9mofk7in9z1oybhjhobn4dpnv14d5687cba8pwvbwdzkp',
                secret: 'ze7lqhs2pchx61d63aodc4uhjpwcm2sl8l26fat64f7efpkfim3l7712vnby91bbfmylnr1nbt4ai0pzprrae1jnv3',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '6f1404f0-bf52-4024-a26c-3adf3c133072',
                
                code: '5f2nun5qiityofs5spxa8g78bf0bzlb0jdr3xs5hcy6zzhwxbj',
                secret: 'i7s3ch7nedl66wn1nuo2vpfhd73qss5ucpnojohdl9w1qtmgzarqu8hs1i41e8y03gi3arulawagrz06kw09y5f94a',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '6f1404f0-bf52-4024-a26c-3adf3c133072',
                name: '7id8iqdipy62uruwntg00npdz0iddtt1bxhj5e5rcpymzuyfxsqxsqb31c5e5a29cciket00ot8398yhcleoqbm919qgvqnfa2nynqipz0xzxutg43rvglyn9qucizlyamj0vtgfy10pxl83gutlr99u9boxtf90d2o6of6jyjk4wu8l3826gpkbjhswt13ncq3b436973wvxayd5sy4bpeveit480ulsq3jb3q7g4untg4moim9tkwd9978ny5',
                code: null,
                secret: '6n6dew52mwjwypovhsb3vi1xfgjfb24c345n8f8zv7olskq5fuc048xh0p841jvnxe2nw6ko68g1d6g82hgjv4rar2',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '6f1404f0-bf52-4024-a26c-3adf3c133072',
                name: 'l4tybpxmb1ct1ndqpsjuruvyh5qlt9j5zbmhk3iaiglnmfm9og4sbmc80vefa3iwcb540cfcgubdhc28otk3ekyoej61px3z97dzub5pa0rf25ry3qfdo3frwkztt56xzazqr87nhgy74xvnzttfq19uhfzu5i14vs6wad1jh2sliul33xzok7442ansywu8lli249pxyxdl656e0euqk5q8r04qm0r0l3ud0yx9eqhwz68qndljtgkh2tbnuuf',
                
                secret: 'agimhouaeb7qsfvuh20dwa7uiaf551qs1la0cixr21p74nbem2yqi068ggnel2pc6zvsvspqh9lkymxkq6f07yjivt',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '6f1404f0-bf52-4024-a26c-3adf3c133072',
                name: 'z8zukk2f69c77giysvoeijk8izuj3x7ms7wl5ee6hb6y9ez7jqrjuma4cme520ndk0ml4rwz9gikruu373e2v9qejlalyvn78v2cvmlrpghtvkngta1t5l4kwwglbmup3efm9ho9ehrnims64up8wvi844aqtt2x22wyn8spggzpbfpwcvup5oacc5enjom8j2rdjcf1m6nbvhlyxybh8y7oyo747cj06l4vj92h4akxdtmas4dgajptqg82ptj',
                code: 'ihxnmsbiqe31o6s9y385gb1h7o9vvdo8orj93hwfx12blgkdnb',
                secret: null,
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '6f1404f0-bf52-4024-a26c-3adf3c133072',
                name: 'dy6fiow9wm19bgi904jr2c6geb3gaqiowqxgpndq74k0e63eud0k2bstno6t9bp5wuetkqw005mqoacr10spytb0a7vuguarcc2eu3jr2hk7o68fv7fku2lccpm4ygf1nt4ft9nk0ec6gy9ewi2zpr8afnv1434yzyaxmp3vzyr8lmxs29jp0v1sbgu5etyjrg9mycrlki3virdi3zek7pajyuaaczy3w95j4zlkjv28iqp3zkbmsmfad66z9n1',
                code: 'fipx03wylw3jndflnrdzzi824o9jesqns3ccsrx6pwdpxa7lkt',
                
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '6f1404f0-bf52-4024-a26c-3adf3c133072',
                name: 'kg8c53wrjizrtgiobdrax8vrz0zdcufx5tn8cqef8m4q4qqb4p07qnhzsd0jtt542vqjb742pe7pp3oazeqehcunewgo3kzr9xef04v30c76xxm0nttzmsisweycmbfrzcmq9dcnbf3sqnbxw6191pm2033bin8mnstnfkr112m35xc1qh5k00eakvrbiziqwqn8jfhf5bhx9hd4wlqklka39p7q03nhp6ftu36xnxik4uxr844r0sv6q8osthj',
                code: '0lbew1yexba5knamrcv95s5vh9lbye4rjlbf4nk5dg3fzyp482',
                secret: '4rhk07mtc7ldugsvypytmh6kfw796logzga8nwmf6obphckldfz2f6eitk1ssyjx3f3zqf8ralpq6n9hwzbkywysbm',
                isMaster: null,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '6f1404f0-bf52-4024-a26c-3adf3c133072',
                name: 'u629fvrdp4mtxfgz00ba40iw4dpfi8wra1fk1mfccvykbjpp0krd5fj33089luhxqs2slyd09yy464irjarlp8oe5clvjuvvyimp2ys73ig2g3bx22z4x7baoctxg0vwhcwuxl00616sn9zvltdz950c53lgvmxgwndkannpvb9xuayxj4pm0qykxw91olcispb26s8gb7lgi3o3hf3c6d3c2f59q0v1cg6p2hv39uu097qt8i35yvvsyodz4kd',
                code: '7rlhguu8x7qglk5dt9lh9c83dosst0pymhcsuq1qqu0gxt36on',
                secret: '1kh7w4w2drb0th3tdz9comlwqhch6v5ly0kjw72ssxub5nmd79bc98kefxhhmkv1b2cho0d139lzoakvlf6kkl7k1q',
                
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: 'm7yfpjg2ameoqtye92qbr8qusbe5my9spk23t',
                name: 'xfqcwc0b6pi4m34m5gcyhrvolii314dhu3w8f84sbz2ax43mnogkt0rmq6it151877jf48q0yhspsiiuxrlq9f7kqjt7tulmiza1fer94g0fn3spau96pzmzvxg9okw3gi6y8r73yjqhg281jvuqdc95ys0rhjo81sko5m5in80xooeza0dz057ep6a9qzgbtieq3bqsc3vhbpkim7fr5xq8potxp9ixw7439qdsyi6vhzwqwpdaqjdvvxvo7dl',
                code: 'xo0fz5zgvr2ao5t1pp7wjotw7dypx3tjhmg7jgesou0sbys5w1',
                secret: 'ae9odp2bbafcnecktye9aqsnqf49ouprqyfgez7sfl4ioubg7ui4yhfkaqebrmg7jevb86vjgxhtfkm2l4l2ogft8w',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '6f1404f0-bf52-4024-a26c-3adf3c133072',
                name: 'eimrn2kp29rsftayhf2k63lpjv5218tfjuil68tk94c9jzfnyrgv34rq4orxd82myifcjtmu1fwlsoxgdy9uynpayh4cqb29m82fnxsdp0sgvd905i6mu1yesz2fkech504xa8n04tb09e36wz4uvjd0lrqoun01q8g1kgtqoq19zw37v843m7voj1ephgk31wefjdl6bulcnqnb3pb6u1d4txinqpeg951af096di9i8rnm9ngsp2lezuxzppdn',
                code: 'o9vy8sku1wtb75ebytl2gbhzpv9lc34dlpgcrp9jpwe5qzb1og',
                secret: 'chhz73p6wbdyybc7dokeo7u7166n3j3l98upq3o9etkmbf0bp1ksf98c1huen4c1m1pkulj01xe9apqb94nglhzqb9',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '6f1404f0-bf52-4024-a26c-3adf3c133072',
                name: '351dsqbhbdn8gqcv3d7w9k0fkyenuynstt23pjo6sldg50ohsp43n24rs7g57onpydvf3k9rco731ixhda15z14c91lnag31xvf955k3p7l74g1blfh9zcp29cwojir2s6fhrvk2ljuxpttop6687zme696tpi301ic9tzba1irnnbqppfw97kg5z335z7so8dw7rcrc1aknkp3bfjl1s3g4x9qpfl539i0aexurg1w2zusyzoswx9pw64aq7b3',
                code: 'nic3p167z9ne9k0gp1tlrh2vfl2aagcypufph1hxbgrvyrzxrph',
                secret: 'tmqn8eja0qxuvfhcdbjhn42u2qp1nbfxs304tvmougsw8onam3omnbosxqx3vdm14fz7oj7v13d63af3p1jph9pkcu',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '6f1404f0-bf52-4024-a26c-3adf3c133072',
                name: 'xhcpu0uzochawij9v1iz3n4izchq3x6ec6bfr4ff5y6uw205nxn39z9xnyldpk7za7xyxa6qizah635yxoeyvrpjs6bdmiixytz3sic7n3z5ki0vxjvkmjc8wexvl2edm9sb4l2skqc9j22do4pkb4evi4w80s3koq3b9slziug55mw4770dkug5u5ht8rmv1m1l6wa8jogy1ytlg4uq631hh4bqg36lbdokuc5jbp2k7r96d98qad6qot6uycn',
                code: 'o3u76394id7mphd4rgkihzd71zzbb5qqkfh1lpfrsfnutajb0w',
                secret: 'tsygdpq77fqmh4vuw0tmaverokdqowfr3hdvfhpqzzalnxrtij3u5q0757hay8pgvwb8ilbfuhw0s85joyg8mmbt918',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret is too large, has a maximum length of 90');
            });
    });
    

    

    

    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '6f1404f0-bf52-4024-a26c-3adf3c133072',
                name: 's41yj2wymxgjtbnc1hqle13zev9afy3uv66tauxhh09j7a78ce5kce2t3lliiymwr7cykn55hc68zkwaqdu9fja8nzptcy4pzl9npt1d7ivmlwls9pohao5jpquvbx5w97mmg6toozqzucgayivxmc6l4swp9ockzuy6oix7ihxpwrmdojp23wn5kapp06k9z3g9aw4b0c95tbikgxag5sz762hf6a715r71myxmf064kf0t6xftg3kg2om4707',
                code: '99o8nve32gc83tfl7mlbd6q0uwz3ygau5jofh9rsvudkdr3v8u',
                secret: 'tnbuuedp1eh11lho99ixxocmvhtwtiulgbp00acw1vcp6lsci5mz0e9ofzre8xxkxbwmiq6ncbry2qkacepeaue1gp',
                isMaster: 'true',
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '6f1404f0-bf52-4024-a26c-3adf3c133072',
                name: 'xmg34khhx5vra7n3h2ku3b10d23dggjhe96j1veampdo3ypgsb83rhb66wnapv8rbrlzd7veix86aqmgm6pc5jop689259orjqkllqf1b8i3nimk3qfk0vaguh9a2xnm4u4dhp1bbhwsm3ovj5qnaye3dg4g2qna49so97zakkqongeuvdcs1ch7zwggnfn2n643gscung1rtp2865nnw6naz06zfwxwee8cdlqqye3pqhei9x9tvdzlguxmrza',
                code: '8391b4cnxsx9w4xqmh4qo1zo38ovkpsh3ac9t66l2lfk9wdzik',
                secret: 'v37a7iuz48yty9zijpn9mazdhfmn3mtc0vztwmnyqz9he4w61p0mxg5voi743vttgppu169ymzgi0mz4lsewfyj7ck',
                isMaster: false,
                clientIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/applications/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications/paginate')
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

    test(`/REST:GET o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '33aaea5c-1c25-4dfa-98d5-d4977a31c5c3'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '6f1404f0-bf52-4024-a26c-3adf3c133072'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6f1404f0-bf52-4024-a26c-3adf3c133072'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/e9eed5a7-d244-4c9c-8a64-0dd08ce91547')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/6f1404f0-bf52-4024-a26c-3adf3c133072')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6f1404f0-bf52-4024-a26c-3adf3c133072'));
    });

    test(`/REST:GET o-auth/applications`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: '4b10b6a9-8466-4723-9882-ad9fb37964bb',
                name: '0gczrcc9j24umh7slidh0v1xnwm8xvhxwl51vpzqgnpylsgc4mjp7aa773hh8xf1nxxvp1btg7v88k68blrpzdx6pup16j3pxj2qjc5ma1kk8p0tqdfo5lrgbipj3jfa9h9u5xn0gmvajg09fzeaaii54iriuz4829nl1cumfbdqemnczdn2omcmkeffnu5ca570vmrlzi12al9oglpdb5w9n0gpgm09qtbrwm7iw0uiju1hl3w1e22ttbotjtm',
                code: 'rysymudcghqsxu9ynikla8seya2k4cf0y1dl4olnos8hd0u8wo',
                secret: 'u5khqrua9dvocxm2rygot9cyqtv1vvvjnrt9r1tvtzoacz53oxcjzjgkkyesivpfbdfz6u63mr72qqjy2ein7ug6f8',
                isMaster: false,
                clientIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: '6f1404f0-bf52-4024-a26c-3adf3c133072',
                name: '4e8bdblt8o9malaj0nh26whiepq58ufb6j965j52ia91hg3dyhmkzjint9rmoyl6tpxxmzvmxfoop33y8xxzxgeep2h6bm68jpows8vcrew34sgusrrbl8lphf3pd9m84t0grtju9qnzw1jldlf6b2hik4jxroxy7tf10xm5rrehblme0tdrzdfagi4rlrkl7ctpdriebctk7rybpahkwb7h0xdik108mil2dpibc0crpuwn96vprkyfqah2rz1',
                code: 'u0uwf2c9jsh8hl4687s0ol3lv66bl8nwxfovc8qkdxaaj1q4r6',
                secret: 'rbrsviltem8gx443lmmx6wj1gi4lf57ke9jsuxpog8s33flh9l9yhz7ur800aajmnmdj2xxlbttq0wxyck7bawg1pq',
                isMaster: true,
                clientIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6f1404f0-bf52-4024-a26c-3adf3c133072'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/0104c5ac-3e46-4ecb-b64e-192f975e86f1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/6f1404f0-bf52-4024-a26c-3adf3c133072')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateApplication - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
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

    test(`/GraphQL oAuthCreateApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '0711d33e-65d8-4de6-a74d-34ec70f95165',
                        name: '8isx65cup0uhq9iazyju3s50z0qzo2yyp2n3pjmrkim33w7o1t2zudfu86d4m9e962qmi7oij4zsrnlih0240zdxgaq3dyjavs1ierg9qbvebtm148t336z58zdqgv5xu13v3l3it26ehu5x0tlmqinpe6ud4ulmt4117n3qc2anub8g53boe63k2chwuoh1w2ev7kut7oaah0v526w4vr3h4z3u8t3jweo96hd40ue5kbwtwn2owc2bqz07slm',
                        code: 'j7x468d4whrckqk5dnrqn7fcpmna444h2zqg5t4ufmln8jof0d',
                        secret: 'fhdky9i5eta151tnnrfnounuxvfl0tqt5icl4dkbgdzkk8c7k7jhpcg6rz7dpznrdptglwprjvudqxgt7il5jpn9l5',
                        isMaster: true,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', '0711d33e-65d8-4de6-a74d-34ec70f95165');
            });
    });

    test(`/GraphQL oAuthPaginateApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateApplications (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateApplications.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindApplication - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
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
                            id: 'e1e9a641-4e74-43ea-abe2-75ac1344771c'
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

    test(`/GraphQL oAuthFindApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
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
                            id: '6f1404f0-bf52-4024-a26c-3adf3c133072'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('6f1404f0-bf52-4024-a26c-3adf3c133072');
            });
    });

    test(`/GraphQL oAuthFindApplicationById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '37836153-a58e-4e91-be09-fc67cadbe795'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindApplicationById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6f1404f0-bf52-4024-a26c-3adf3c133072'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('6f1404f0-bf52-4024-a26c-3adf3c133072');
            });
    });

    test(`/GraphQL oAuthGetApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetApplications (query:$query)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetApplications.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateApplication - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '4e5f7a8b-f583-4dec-a978-2c272da715c1',
                        name: 'ow8o02rquenc9a7zgjran8fz0b7whvtvrcie8ws43awvyrak7uevjpdmvwf6zwbtrkafd7xjwpj5g45pkd9gx81n5wy5nl1chbsqkjp4pievd53cmaccmeme5nrjn5mu20nzawmg821o97q49a8pj1guieui7s82s48bmdfph1bhp81xvb92lsevvxr9yevbatrb6xrfj5u28p6ot5n3yjdcdjrj6lr3neizdv97b10squ23yqsdtdpjyt91fhi',
                        code: 'kyki3wk52hn5m19es84dr1j51sxcq3gc2o1lnteycj8ku9lmca',
                        secret: '7wsdzoqr7yoq46tm8c52n4btv16xgxbno4zl0k5sd2sqgnu21gnv36tojohmdqwexgwhx3a9e0afx24zhno5ulgjbc',
                        isMaster: true,
                        clientIds: [],
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

    test(`/GraphQL oAuthUpdateApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '6f1404f0-bf52-4024-a26c-3adf3c133072',
                        name: 'tysa0qhiyrlkb3drejhm4cj2xvi4ceufqwshg671w4fdy0ako0cxshkhpnccm9l9ekpg7mdt0h6vuzo7f6jdzdjjs61xap5a252usehz4lyytk352kg4c2q7n5e9z48xakgpzva2etozz51yuqiz26tt48zb2m13jidcckl7txo8yyo87gs8sg4lrfsujy57s5ko6mmidtuqapyge5at1hjjn4iucthjnvsh5lnjiyupqo5o5g0graum753bgab',
                        code: 'dth2sfgpujb9d7zy1zanx9gq4ionbye4zfhalss9ooix1spzse',
                        secret: 'b9yn453wbchs7mhsibm39ve8wxsh8dj7ghknnazfhtfxpplrgw4jmwcjhz04hlfpjieadnasczamdd9e2k4be5j2sn',
                        isMaster: false,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('6f1404f0-bf52-4024-a26c-3adf3c133072');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '44e6ee9e-74a3-423b-a770-b4b2757fc1e4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6f1404f0-bf52-4024-a26c-3adf3c133072'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('6f1404f0-bf52-4024-a26c-3adf3c133072');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});