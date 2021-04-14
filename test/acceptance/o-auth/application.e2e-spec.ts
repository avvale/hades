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
                name: 'm2vwhqkeob5hsg7robpwfxgyjqvxst5hbtqwy5ct4n0ri4mo8mhdwx7wroh7yr2v44swxmvnb499p5p1wrcwipk0bwo3ipw2lzf172hlveiod1ozjzd7pg86vr3dkysi8sk0jwkbzzja78rp2lvparc49pskp027exyhgnioeb0rqqfg484yjhl7hi6krw6puvjjqv0oge8ib794ucdacu21wd6yqptjh78s3kg7vwkd8cirpyvcawrwugaeypn',
                code: 'qioo2xncf4vg6lp7wm1wf1gijr1xi0lf6fbdl7ubhdivatqhko',
                secret: 'pe9oqdf0f7z1wi1ig1hbqbqp71zfz6a2l1yssx4e00e7f9pntkhtbjthobbfhja2tenh5e1p8wdiwy36z1o1iiyabi',
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
                
                name: 't1rwu9l0za7n5my7ju8b1b7311qafo3jgwrhn79kqtq9g4m1v2c0oq2k9dmyfogsmsjrjtg4wlc4eg6o07ascdjxo5gc10ak69uosoosondt8b1iljwo9ojaqlwrppegum1b98s43ds2kwnhx3q6w29bz6a8hqqszf6rvz1fflg016gdd4w88i3k3jjdehaax471r79jypp3wkryzjsj3bbysr6o0zlgyguaiq4fl5xz5obw1wxssind5sq4m4c',
                code: '0f0zlysf3aqvb2rj7r3qsv6b5juw15nwhtj5uap890j6gm692b',
                secret: 'm3irixwth2iz3qswovp0skm6hlyquabsxgumb0dutrr17xbak9siy090v4py146acw3ljzoe6c4bg4ydwk34qzyaug',
                isMaster: false,
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
                id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d',
                name: null,
                code: '9xzjiqyce6mgnj3jlwg4yqf5mkw0oe4c5fmunp36r0hhurgw02',
                secret: '57s1pzahjulzclyede9cwi8hl6bcaqjkc3cb56y3vpq4663a9ofynv6bwkx3ftsl29sv4khzxoy5xn9eo72n0ipk5q',
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
                id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d',
                
                code: 'oyz9sm0xzmm78j8j5ad2k2o7sgtze39bbgfrnme3pda5hgcm6m',
                secret: 'fejpyt303k5hkpazsblazqmv2z84spzjhrs5vj81oyjqwv1hm7gwc52bdawzhhk52khaye66feoriyfnhfsrwf9bbq',
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
                id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d',
                name: 'u3rf8g7aqz2q7xljy6do8na93yaec20ed3mev1chgykbsm6p047h7bvxiewwhe6sxkfx0yzp9ccyp02ybgd4kd1uwn43cbbjxpipvi4r5uaukrucniseqdrfl3deecd8jay4wlm8ie1bzwqwg4goz0okfdkpp3zlbx81nylsu98z5lreh3vpvcdwvm3ym6uu6t8i9nta6i1rjv4yxp9oxvp6cmmdxii8h73n8y9hzkkleikpq1sr255iu664g77',
                code: null,
                secret: 'ub2tky95rkgiblbu7s6dyd7ayb394fzc2cxhh87orp84jznvpykt6xin371u5so1c05u97s3hrtiask3s1g05jcpqk',
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
                id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d',
                name: 'ocdje2gjfutgh63viizlkig5g4r953r1qtd3cd42ciswj0fg27s5czwl7p318g6eu89wwxlt10wopwv66ick3w9omer33i9nplmec0m2jqk730ooh79h1l7i46uefay07g7pr9r1f5gknd39tv9isa4lrvroe2w34mcwhyiw7s1zaviz1fcz8gqgujdh4x5g4rrekjv5r7r52lbaez0zkixayxyuf35hzt6f2h9xmhsf30zfzlwto2mc3qct57g',
                
                secret: 't28y0yhv7sal0aomoj40jpi7p5tab3u8sqsoi12hnpl0mkdrgc1hb4olxcffch2hokabx5ibjbighnd52t28c6bi6d',
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
                id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d',
                name: '67e7u9ro6bfx5it6dryc7pwoqgjd8a3v76fsse2a80hwjm9e0plezlga2fo777ftvuze0mbbx29um9u1u2nkefecqvt1tkmwjrpunfjbhvpue3ory7b2wz79pxs1t80ej1cyzajn47fy8132uroxuhzst5i8q69inzdtd4hwl30wpebquuopwpe4fzsx98ludmy18pkhjqv9xrrw0kg1uty2nunxnvieefz6uee0gg8nh6876svipn25tif54hg',
                code: 'zq7q5qrykoq7vbng70hqr1ugr8uabp5t0gwysoyl4mqwt7knny',
                secret: null,
                isMaster: false,
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
                id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d',
                name: 'pejtosksqabjuwxitpmuremn5alepzf4ze5a930to68bz3jy9rbk7bge58kglkqk2tb3jm6gc8jj0a30avj13rg6xnxryhu77gbhqn8puc9cvwqkihgqt16vvgebgm2lu4hkjziapii4sye7yiyzrp2omct4hy035kqzphbyi8ykt0h8d37aoha5tiwj0vyakj9xry427699akg2kp9r4f1u95b024i34hp90nhqm301o1fjgcmo2orm7ivxk1v',
                code: 'cx7gjv9t8b7rzpxe0ragp0pdpdsm6h82aqdgc3eyun8ksov4xa',
                
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
                id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d',
                name: 'bznwc4km94rl0t8nydqo2sghpu1tc4vkvfp1kf8rg1xfehz32mb3j108pikmlmqc0rdq6i5r28mm4y98k2tz19mp5006gtaxa0wfstresa80h9qa84827m68u8aqo5eb41r2qmsdfa5ur704uk42hovonkxsm3a3pkil9tfbci1avzs0j76mxytfyh0eiyxgayd43w9xji8ast71e6fzn1d5i5d6zj27ddvpo2mh35yw0qc6y1gr4jl73b2qmft',
                code: 'oyylida48b02mjj4v57hwtzmj0gk88fvorsz37o7xf955hi1pb',
                secret: 'mhlpvpowumbfo6kspa3c87swwq4ssijszzc33lix6bwpuhd94rlaq0daa5yxwbb68i9dao6reboj1p0zuupxldzfim',
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
                id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d',
                name: 'au21w0v1battlpqm6vz6zhn5a4jcz9zo8cntgoxjldqrbbbdq4r5iu2eqrwo7nepbd3babfm0k9b2vsbvi2nlrr3f1w132x7mi5j802iye7t9gwfmz8nrkr5t9owlumtjcv1qomtrq72qexezilvucy3x5k7zy71f9leog35c1r3dsy8hri7pldp69oinddri0tyqoi7o6od2kcm5l4eeds3fcxayl1rrobckj2slk7aysjpesvcdvzww7slmvf',
                code: 'rj41k4m6poedcpagkh21ze7p9swdxpx61o36phl5sb9t47b6jx',
                secret: 'k2rp87ffvx9wr9xgob4ns74mranlo84pmhieby7zv51ihs7dby3yrdmk8dw3srs1vzv0yjtgnbev4ohpevhcb01eoc',
                
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
                id: '7715wta00zmzeqa4x7pynwz5r57tabnmzgwwo',
                name: '375jcfl3zbsvgcuypvqycstxjo42nj2g49omzc11vbm1166vp440uo1ab1re3ve905lg9puiedjdpn2enfzraht9qk7vp24ivsx93n1spn8w6hbikmtzpn275ynemcxgzd9kqncknrffd5h2c3t0dq2rvsiz0juc7g8bjl7mwvco1du13b3c513q30tg3zmrfj2yiwhl68i4tpncmfni1bhinverrlsgrt6sxazqtj4lc4e9hyd7esispy3olqu',
                code: 'f2i1u60pjlv5khgqk8fl6wvn1ngl455diz9arf1y5jap9t9dxr',
                secret: 'sv410slal9fmhiwwoqi0b457cz0d8yj6i6zeojo6gbzkv553molf7uwf1rq7n3n0xx5sprvp5g2cvxb738vv3jcsy3',
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
                id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d',
                name: '7l34qgethgl5ylgyevps5144qcqg3i1wga6fk9ffr67tp0ghb7q6mucwj3912rkrzwxbykclhj2taf7mp9x4a7wyseonuifpai3rjkeeeofncvdjql57psujcyrx095hd2dxzzl1sy809oyrdx9n8pap2itqoaoo04bg07pflb09wckwkzl5rnfbsobka31730705xtljpasifj3ao96g79y89b02hh6rh74naqbxx1nc5oip5lllrou420qgakk',
                code: '1g1dxvrf09rronf2x34flhwacw3ytof1txgf14x7bhr82rwbvh',
                secret: '5jfr55mlk6oepgt4cvmptmps1bifnwfiwq6rnz6xdn3m03ryiiderbi8xchly0dudb4jlskogu63d9fvwocirx9r4x',
                isMaster: false,
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
                id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d',
                name: 'vasjkbsggdpssytehbrx7vorzxd3yv2c7q269hwra8yew7yvki2tndoo94v6h9i3on4t7dzb3vy4u9yphfkyb6k34gh8qru9cmkidu11vag15b4r1fgfnr5brxjto95d7v95swisvmc4h8im9oybogyt7ysxz2c9qd1qq4cf2usj6qdot9i0oalquw8wt1rz74dwxg28xkv616ndfwu3v5t1r9z6c44bub3vazkaisg640fitn5tffayzmybtiz',
                code: '6qbaecujumf7fl84qf350qhih80yain9opxygkwz2vmw62wisnr',
                secret: 'awlppf5s7wggj5qel5bx4zor5bfg6det94qx5zp4dooy20ssp6n7uiyeros1lhi7tafw25rwc1eeqdrmv7j1sxi8r3',
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
                id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d',
                name: 'r09d2uvh33zjqownv9osx3d0tus67r28ermjdi6n6c5xuo5leymmxuuk18av90m41w5nkgo64vgqia5ftxt9mem06x5o1n6ufrxptlvh1ysnjsyj1h1sxg7ne12c91jug17kjx7ktsdjioxanejeih2mbg33b46ylerr49d4papif8o8j2qwz1pjfm672ygti3md34yw6eq3hjh9qffhn7xdpk72zlran9ib81woc0rhvh10ysgg9xe1qskkmq6',
                code: 'fgr2m0ld3mbj0hdpklwciqrp7vrqkl6nozbeg32535libbm1ac',
                secret: 'q6dgd60snwpuuslnhkbe79mfzk6mk9epcefxydjhymxjt8p54r7yq2zci8azkqa1wmn0jgobd7ijyp0iagu46j4jg5a',
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
                id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d',
                name: 'zhl1l22xm92zhe1wn7so9cm70lrv9yiz34wgd710d8o9pmgawgjfk71zcamqm9gutd4buwpw5j7nwj3aognhgnm8qs5r59r5rlrq0peytij8rndsuk6q2aq2p0k9joxf7irnp6ftrdhy5aazcb0nvuno7652zf5ms8ulk1oztlp0732upzvxe2upvtkmp3rhjrynr94y2i2lv3myzbj8d6fuxfcfij0wzy696aiuk9ftzp7zrfmp8irk1dwmuok',
                code: 'mp4dh9dbam2fbfdyl9tlgu18b1tmspkpdqa4l1yf3g81hp1os0',
                secret: 'ob04773ht8yzavskrt831w3dbvo1kxjl9bcrxhj6uewhhu3wu68ijau68wyvgb9exefabyxt18t96c8mbd7dqt7ab8',
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
                id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d',
                name: 'juk2l39kmtf5qcdcyl8cwcaaz86z2bi7svqtupf7ojxnf1lamj2bxe5mmpz8gu72i5o0svrnvgmmlbgv0ioa5p3yxog0h6ro0817uqlak44n9m3d7801qjjdpvtf86wmvesjfe8tmf96694m1azde5p1gvtgu7lujpt42lqb97jfl545bijusacnli5ux2z19yuaquy1ilvtmq2npskdwxa1qotwh63e0aad3cf9r96l3mwsknge3alpcj3jy3o',
                code: 'gls8tl9wmw87fcti6whbkp5jcgu50bkcj4pdeft32v417sqftr',
                secret: 'zxa9uknsssgomf96d60qme1op98p833x6rofqm5rmz2hx0z2lfk9fx0aq9jg1z0axcl5w4gcklsyhwv3fgtamd7yqr',
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
                        id: '252d3cef-fa16-49fc-9288-c2c3d7d3b266'
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
                        id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd37e73b9-9fd2-4da6-9754-f87b66101f1d'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/25ac6004-94ab-481f-9a59-ae4417bec22b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/d37e73b9-9fd2-4da6-9754-f87b66101f1d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd37e73b9-9fd2-4da6-9754-f87b66101f1d'));
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
                
                id: '9c8290ef-4688-4207-bad0-e89ba1f51383',
                name: 'wbzyuhtm9zuzy29g8ojfvbzpikyv842r27p0g0hhdsyq923dmbpdvpjdf5pysb1lg3jtjzhycqt0jmq10lfh56g2h1ji856cgelq4ydeyy5w1zculh541cmxjsgz3memuingqsqsltobwlfqajjr8owf16ds0w7qn527ac10h1gleztd0ongtwsh9ye74ffft31oubfxyu66z4c8ah63ryo44j0s8oalt2tlpkksjwcast3niv1qewdu9gjrte4',
                code: 'mv89twov00sdjnezzo5nprpqofbuyrpgawufpol4abo5jldaop',
                secret: 'ocjji0mhyudvnj4ss79ntgt56910amf4ucas4lc3zp81l0k3f6a62qe3564xqfnwcgtx8mtgb4mt4b27f3i4ysnzdt',
                isMaster: true,
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
                
                id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d',
                name: '40w9rhnxsiib4zmjscuxsa5jioff09v3ndgzpvra6p1m627kvfmst3nbq6gsmpouqcas1ja7k0356qatdqgqxyj2xwyyfh3y3tuj5cr3dnx8nn185btt66oq67pzex0v8nvsnvkdj18tyrhxd5h0udt8pkdiacv9g4cydpq823pm6xcifxu47b7ke07z2liubp7oz8buchrcukwg05pac29axx8mb5ak1u3cdgnpfopz4i6yz4t4nywko7r4abb',
                code: 'lxg1aqotkcxdg6nd7cso7jnx7oyq05utk77gyz1ypnz4bgcior',
                secret: '7itkpweb5qt0jwyvtj5atxjaloidus21oxjfp4uakp0mf1ngrfzwm8jgzurx3dj8aqn82rfm6t4rrmo5tgln34ijyg',
                isMaster: true,
                clientIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd37e73b9-9fd2-4da6-9754-f87b66101f1d'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/15ab9fc1-99c2-42c9-80b3-f0f02d9689f1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/d37e73b9-9fd2-4da6-9754-f87b66101f1d')
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
                        id: '644faf65-8623-4042-b6c4-fa319a51b1af',
                        name: 'jpnj5kvyqtvr3o84z89w2izj1htf1ib2oc0ws1z8ya08z6uul91reh66znxn6pw5pzqam8iroyhp5wchc5ixmylphz80gkk9uaueogbk1n4qjtrpuz1wps5j30fu3eghsxj83aytwwmk9w30fwfjzcex3qu0n5tblgbvrlpy5tklb0p43rkoc3xoogu4qrqyfjvwfgvzr6fm2iqzwecxtwkhfhsffkqezz66jnr3h8qcnkf3z5bhcfuhn43rgmq',
                        code: 'i5lgnzopiv83uzgng67nkv73iv77k1ggmqht44pwgve62vn84b',
                        secret: 'd0w4k3tgjxl6s2rh1xa2l2g2844v344zrev0vjep51hse0avpwcqu5auk411fdep77es47kce4wor0z8taukk6br71',
                        isMaster: true,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', '644faf65-8623-4042-b6c4-fa319a51b1af');
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
                            id: 'db7e95ed-d5f3-4b60-84d8-266ad6b9d9e9'
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
                            id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('d37e73b9-9fd2-4da6-9754-f87b66101f1d');
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
                    id: '0e553a69-ad32-44eb-842e-d90655dbd333'
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
                    id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('d37e73b9-9fd2-4da6-9754-f87b66101f1d');
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
                        
                        id: '35bd7f20-8cbd-4798-887c-b39fc12ce743',
                        name: 'ucraty696k8m0fvzfs8upjq9gnq6irmbmwu0vkvs07kzdobdd5tab9lim9mom0gp0iwzu0cxos2zuoqv4cm4xw6h436d32zttrrhehokxmwl7is4ok64n3dtoplcgm8hxjc2iokv8ydtrdl38nqksnb8mw4pqhcxw0tvup04uzhm9w64klyt6dpujue36qdoe72znqz8903snj8xagi14gkfyi142jufv98g9idchemm38h9jbs4jhcdb13q4r8',
                        code: '90ois3ohp9s0s7dsq47onh24o9d38jejlnqlf5rrwrgqs25eza',
                        secret: 'bh5pm36otsru3dzginfnh6e3fi7tpywshr27ar799nxzwtz6tfadeiyerf92p4c40ozqwyc9zacpz6kekqs0efxibi',
                        isMaster: false,
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
                        
                        id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d',
                        name: 'qf0cfy01cye1n5mn2bg4756y9md9rj0xyvfedizytt7ic5x8w9uw74x1o8wfswgczaaeelyxahh4zj4sgxqwprbvw78b8zos47sxzm0xhs1ybuuap780meugiex7hkwiv0brpj953r8hcg5b0a63jrf4asq1c0suyffeblvpb94a77ehm1atlf7hzt7raufq67kv0t4946sakotrh1qm0p0e6svxhljmvl0dpr6yvb1rkexvtfwp7azx3v8w7aa',
                        code: 'kqdtb9z9r0ozdox3fy9zjkscvai3apej8q8vapge29b1ea4jp1',
                        secret: 'zanzu9de4zvf4o5zj8q2gt7nlk2s79wfvyz0ulo517hes54mai8jhrt42byswdvfwakznusk677s9ees3oq3mug1vt',
                        isMaster: false,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('d37e73b9-9fd2-4da6-9754-f87b66101f1d');
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
                    id: 'c8586250-9bd7-4ddb-bc76-8d9051092370'
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
                    id: 'd37e73b9-9fd2-4da6-9754-f87b66101f1d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('d37e73b9-9fd2-4da6-9754-f87b66101f1d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});