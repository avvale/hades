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
                name: 'o080zj05me13mr68lj444d69syjzaybqx5ttmzh606w7xanpm1yq0zqbsxij8mzkclf9rukc8seewplwfyq0tqjdd3oi3120h158i0vvkiztw6kk4py7pvcdw6vcbq1ecxv1qso93eoxhpc83a0urbjsn1tn292lwmgdqn3lf1ptaibxzzoff6fe881qs0mkt8osmen8ijpq3p9an7hvd3qaq1j3lk693dc4r06zlt70y38g4b82bve0h0qdk5g',
                code: 'y5jn9mz21wy125r4lcfh24u1ml5vwupjmy1dxqwjwn74j5v92g',
                secret: 'z0dz7jdqj1dtb0nmcj1uzbqr0n3b0gbdtqeea0fq0nl6odnh2mz4xv4tn8x622umjrhvkynt6mp5qz8hv486ycmc1i',
                isMaster: false,
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
                
                name: 'ufm0h0zuvf48gsu320ytdjc2owglvgm38poplwpmkr8s0pk9ynapstc7zb2s2f302u5o4m2dhn1he1fa1es1rhwx305lhqo86httmwisnuw6tar7rlf926obm25x8x69qvu9zq61anp1e1qpw31csrhfrmjgcjqqjx5j722fu010d6e68sqmof335s2he8yk9bcwyxj73y5a05n37ahzkuv8xdgwa6a3wm3ze8jr4y89br3tcr2wgk63ou0ynsl',
                code: 'uujmyj79nyx0nlg5azo3eew5m52ojk133rgnisj3hid88sz38o',
                secret: 'y9io8mn7bnl5bnxlumgcyeswk5obmytnbmk35pnrw2v27lu11q63lzqru8hlid283ji0ti976ghrc3oon463ex3x7w',
                isMaster: false,
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
                id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6',
                name: null,
                code: 'y1y1y15dftb6x02owp0dyst085r6x5zwodvf77xynp6ig99q1p',
                secret: 'qrw64m0c9iy3li31135r1bs2ivupwacfixihgzgyqshuqapz05dr51efmqy5r3wjuda5cyvt9glmax11h878jkm6dn',
                isMaster: true,
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
                id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6',
                
                code: 'k0av267lu7dfa551v7ti3gol3bhkaydh9hrlub8m7z7mb39tia',
                secret: 'razsm37yty9gmaf0n05o5b0pb5pjcz3vkthdhhie0ar77nf8ajwtg8ovzh05wbdhmaiqosqkvpx3yn2sgiikld4uzf',
                isMaster: false,
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
                id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6',
                name: 't2ces91o1zosqbzh27lzxu9kafrz0m0o5l9iw20yd8yu243492x2rbdscug7j9fco25fhc5a1faxxlhsoesefssxmnicvrazgnnpswg5swj2dnyjkgpv5trlume5ei9qr28p9gqj5eyaw4pac15iaar63kn4tgod9i1i2zjvqqwcsg88v1omirt0stz2v5i1x5jfskhbo8qbav5oa92956pie34yncq5o6604c0zqip69k7po9uyz6sj76du79p',
                code: null,
                secret: 'tlsdgtp6b9m6629w914t60t1j2domimc981qdvyam9bmawmcqxqzfhqvnsrekfhkhw4wnmf5j7hquyacxp8vvk60od',
                isMaster: false,
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
                id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6',
                name: '66qnb5une0v99ae3zzokhtm3nct2rc64uw8vzn8ewbjvmc1szs9pqtcobff9961f2fjrd5ou391vjxxgyqngdvutd625vns716mx8gu5wiy2nuy3g2u55ji15glin88ia42ixwxumqyayhr97j5yphv48zlo3dek9qbv7f8nhvio44niczgnybcnmaer09yhr0xfmhta2lapzhqjbbzq8uke6wvf08denekc09tp5wlwixluxxk04j2awby4ba7',
                
                secret: '4yr89fd7y49dxjzh8i4twnynl02yrzzfat57apgbkkvtqro8zc1y1yp47s04fnshsklc8csth20m4yejegblvcn46g',
                isMaster: true,
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
                id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6',
                name: 'tonjdi9qj0x5dkru9e4bnpyfgyzmu28h200duki4ue3waw5s0qcgz2ob3g3tweithszq6nnqp70zz3uoxde92pr1ksh6tkxb9f8bb39cr9vplwg4gan7xqj7rk7v3e0k9wzmyzskghdtfklnotyeun5ta0u4ytbg9mtwx1z4c7fj21cjw0cbf8cjtqiqpulw8cvmc0rkm5oryyqqad7yhx2lpsebss3k6uqul2y2gj39a30xp2yloptxwdcnahj',
                code: 'uyiv6wlt326gjqf9hgz3kxb54gjxtdgayw3q4jp5jot63cgiet',
                secret: null,
                isMaster: false,
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
                id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6',
                name: '4atvhza244yuu4l5yuzco5dl4v56aek9zos8wqfsacectgxpy3h7dplzl6h5vova7229bv3wjr85fr1jktwk8w3jfcy5skt64b4jrhvxbhrw4wqwqipaxmg1pnxrdd66r7kdne9ruxvknmrk5kdxliy87r1yaq9ioyils2reeah4w54s2pr6j1yz0lscl9g3n7fheys469mmhix0e9z5zt67sovlb9igfhqazsq1e7au7o96apa0a85t3dyd4b5',
                code: 'kovurp3ffffhht00fr1ufr15kmua1zbry5vsds3hfoo0hmfoiq',
                
                isMaster: false,
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
                id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6',
                name: '0j86vsrx65tn3alwz5bl7azn34zlotucsoix311snu5bu75jbz2manat5af8w8o7142z95it3vryu3vs2spxerrbxa26z2b44wci2d9y1pxbgxcxspj73t3zqw1labtz7lt2g998k33i6plpm45rf0bxdv70nbp9nf2dar4x9pv3v6g1yd14we1u0i2y5brcwii18ewf32y4qhw1fvhtxvoyli8evqg1v405rdqeom5qeate2e0j1s197slkelt',
                code: 'dy1ct8rv6ur6m7htdiqzg51x1qje76iwa4xzmph3r6oqt72ixg',
                secret: '9zye427llbtcwxutsfbasuv25p6mnd29z2mbrgtf448v4g6meu7tjlutc1abwhnt8xba1r7c18h1k2orvvxl35subj',
                isMaster: null,
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
                id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6',
                name: 'rvduod4b5lxdu73zcfmwiynjfww5ggejl2x45vs5a24g6ft8qc8jkgu4u161z75x1pua06qrp6n33slzsz3q6rnrv4ngnt95mc0o2ssnxv5j26o31337atgo0lws2mnwd4u0f05olzu35xr3sqlirqxs48k2bhrtjcff40mz0t665ydvehf35muyvy483c7sa36hy0nd03rgt4a0oickdu2xt5bow10ntcmk18z972wfs8t69o5v88kq71p4msf',
                code: '53owj1nutx1kw4w9t0ydvbrkpsfvdo442q46ggfanlk881welr',
                secret: 'b1ugsc3urit1qgsb6citatw6f8hvbqpzs6g0xqs3v9cyh99i81w8x6r1susilr628pk5q4utq2dj8hwlxjndzs61sm',
                
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
                id: 'dmcs0ba8owmdayivh7bhijlr7tu0uye80w8bw',
                name: 'c3uki3ybgedzji16t36etk900lbdp9opdvadzcy21bf8rklt57oog22p58hve9lwg2b1fjsmtl2vx9wpt30vr6q3zzq6hh0uwvrxphqcmvoekt8a0fda19sopy5ce8lksgxjq81zwm7wmulgp2v8t1rk8bt54ck5j4cmqtqyx374v1k5yi2pb2huio1eodcgv2noafh8awvyb8qaun2enniyljknlry4y5nmv2adjjzlwmmwa99fyu9vjh91z36',
                code: 'wdouqh582855tdziunj9bfm4ml67dlay496dm9lvab8g6w4y2m',
                secret: '7gfqna0diwfg9j95woz3ouxoko30jhz1p5cnrqw47zoc1so4khbovro9o45dt2vnen2hz5fffuzvg2fv3wdwqyiu9x',
                isMaster: false,
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
                id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6',
                name: '1p5o64ggvar0knc3hdp82wfijecqg8izx6375m0ievgp9enxfffihrb4g4dpjv72tvy80x2aqgv8d2kef3bjsnizzponlgqdd5b7l1if2k14mm06p34ljbjxs42agz3npybdickejsxfcd0lrhr0v7kwplrh2pl1jyb8gssgycr10dv8qp1p3lhnukwmz7y4liwdwkqyqo57dooo759ke7230tsygmh1jgcnmitgs0ibspyh3b42o0wmqth6m5oa',
                code: 'a3vaa6thp6ww0bx52qmz9tp4fp5t86hojs5z558hobvclsgyof',
                secret: 'qkgxxjfpeb9gj22ast9vw0iapzxpbwj4ndy4qbd3g7i1koxuersk4kkojpb5mm02f9t1j3se1oyntr4bluqdlolpzt',
                isMaster: true,
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
                id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6',
                name: '8dx7r0nxf30kot4f8z73j0qkrzi8rz2szqz70mbzhupsns0i00toddxxk89stuh4wne13x8lx5ouklcyrjr4vb17n48xuiet1ah1dbnd4tinsske0lvwvalm3exsdxw4aeyyph6wmnwgwga52owi45hp6pmcvdrc102kc8dwgyea328w28d10ogm5rly871m0r5o91prdhhis32mfbp95ooun33oh2zrao8f8rqdrl5cvvxc51ugi30m9p1uekf',
                code: 'mi852gxel3o1n2kyvsz4phz17ih4nj0p9yicqgumc2h98z6hejy',
                secret: '49ppxqbdj8j2m5jhjc24mxq30h2ihif3jfp1bb4xf1bj4fq3xgclorbxbenigssvi38778n2mu89d01o4iw32vzy40',
                isMaster: true,
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
                id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6',
                name: 'z7tbb3o8srg3ilzby1mfqxvqdr2d5yyd34ut65zqthikr9r0fqw8bbemzyhxd50jqbg5op6gs83j2wce6w1y1rhxdt49snc5humfjpot229vozr5ggkgfpw3ffqn6etsqar78qk6uk2zzfntk8fmm9zf5zbwaq9io96lj8puuqegbfe85v8wvpr5nl6pl5tfjcj46tyh22vgzcfrd3riea7t7l6hujiry3vxdgid9ovzo7jmmk8nw5lqa8cdsm2',
                code: 'vf8ckyk10ym8u4wvwov322m7n0qa3xy08fcxti8qfmub7btuqn',
                secret: 'oidf9cea3pwugqkw2txuom1phm1b8shvirmexqkccumtd0tmamfzu7p1yv742h6937qavjtp6nkoghqqcqevfmmf1cy',
                isMaster: false,
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
                id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6',
                name: 'ojx0zfbjqjsfqvbr12ad7jxkfh1jx0y3canaohwvomq07wr92owtest9wrh39u4vtmtmxia5mf2igq5tktc72a1tlknfnjwic6z13ehhzvwoebjjfqed3sif4s3jvithh4qw7mcvgq57iz6ma398klak4zcd6569mq3ngrk655xqk2ib4tgroxjgj0zp8zid4yg1rtd8iry8bh0cn17qu8cbwycpd6wdb3pq7xvklgz46qp4wtkni53nuvz97xt',
                code: 'x5xn2zg3tg07ruvj0kd8ifbf6pprrk614v1gvm0i9vkg1fwhuo',
                secret: '5lnzkepmyyqy5cjioknurall65mw9b4798t9i618118um7arb021baskkt8tbcvitlpy79trklxr7mjhe03jt1u8ya',
                isMaster: 'true',
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
                id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6',
                name: 'xj4j0ojl83bht5t8cj3m462i22andl2w084qbkqwv5czmri0t17m5w56emoyi5u43rytn5o2fj8qxg3vzsw147npth4jm0cdd3mkcsxgtz2e18c1j7j4dufu7uy6bcyi6rh03a0f3kgzexol5bcmqg5dsbcffq8jl6iaxtkw51ra6jwx7qdug24sba0ellerzbl4ot2dk70scqp0uxa5a8ku5tbdv41rvv5xljrywlwoge9liaxto9p25frbcyt',
                code: 'r8ace5uggluxapm1kcdkl56dbcu9kyyxvmrgj13gp11vro8wld',
                secret: 'adqulfvguzr1dx43qtywnpjtp9b5nrfgcq2i3sdycnxtg89jy6kjv7nis4w571nwenljr1d4lw7eukhiyf3lmvjt6s',
                isMaster: false,
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
                        id: '9a0ef6fb-6634-4833-a6f2-5af9eca95057'
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
                        id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/b9cfa085-1e29-4e1a-9a8f-ae260467ca27')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6'));
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
                
                id: 'f19874af-5ce1-4123-a5d1-7c3d17a8e38e',
                name: 'c6osmy1q2z4gzazuxi3r3ueab1v6ohi9zoey5t43tlp3olefb9enbsyq63ovvtxrgx1f3zdox2ckljvks5h8n765z67t6hueaxa06rdae5tkr94l9voe5z5im88bzbbrxueuptabj1mk5t00u2w8yq4x5t5zm9skdzpd1nsqy6i51xkcso6kl8bvtxz5buc9iao4zgnaxtbej0i51ujdopsqldgyhyepbamaxds3hbxcmopyf5x87k9qbpsyo6z',
                code: '5pwi4i6ecbgffcmp9hmluj8x89te7oubb5mbbqjc6sxtvny8ud',
                secret: '71nqenspbbg9qhk9th0k5ykoanelzcvb8n4xx2a6ajszvadtvzl12kh9k20dbeb1qe06bd9qzedaitsid29sg18xax',
                isMaster: true,
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6',
                name: 'o4ukvq6p8solo2wzqlesh29nk2k74m4c8ul11ryom4ijlvi8rshyndl2hirop0jh52j4bddqlbhki1ujyk67r3h98l5u58gwv24h1zq6qght76dibuqwgrnfbchp974nrr5semlnln8kgwjrmwsyfqjvqcmte64cmyrasvqlvzbm1jgl5w88cwzp3sgm0kt05s55mmaz0rqtgv0yeej2ixouktu78gib9r019u6afl49veq0m115jpgc5hat4sf',
                code: 'ccgoykax6maq8tplq35jj4se16bll2srzycxjhlu4b8s2g2e81',
                secret: 'bk2z13ms4lg21u48nrnvuj6umjbwe0kldx7p6d4jihj6vxzpcjh7ttgvbmiw25ebnqk821tgjidkvccc1s890of1ll',
                isMaster: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/6aed2c96-306d-4fbd-a118-45287c9c18b8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6')
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
                        id: '4b1515d6-14f5-4053-a24e-24b8925186ef',
                        name: '54can7qe4fp48g0zxviq93mbntbvx9qjwes6dwih9j3bdhp3fk46dip6c68sns8slbg3yldicn4mzaspmp40199xyxx15239595iy3fh7vv0mdtyi97rqhexgio33c9ab89betxwgktut9rp56dhw6exxlcg6k5951vxfou5w2veffeqdc4ovkpetpqlusqyp50dcyee0m5y0nx2diz3j7ba1cx1mnth3f2x1d6y6qjmifpv3w649hkk4l5oykt',
                        code: 'cywqtoe0c5q1x2tuc33sl2vegj6urd3ltdy75v13kd5949mhf7',
                        secret: 'xa3cel7pt9rv0hyjtb39u3h87k7urtdun2cdq8xx9upmclonzo2torictdew05pcdj9flxloihodbmqknz5n062iko',
                        isMaster: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', '4b1515d6-14f5-4053-a24e-24b8925186ef');
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
                            id: '31c81e30-c9f4-4182-b91d-c7db02941cb1'
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
                            id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6');
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
                    id: '7f3ed393-e428-45fc-a194-c15dc2626805'
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
                    id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6');
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
                        
                        id: '34e5dcc2-26e9-4e91-8ffe-d64e1e7d8ccb',
                        name: 'pipu3o4jjou4uqns8gvz38eq4xslg8pf8fkg149etzzsuvi4ighezinxfdjf1u304usmqxxte1avv8uh9nrlyrwffrxm071asap9fisog2dmupv23ooyv15360dwoit8hjwh5nkcom2ux28jjfxsxbsetr4g0u6bvl93he65gf3jtudmjp56v8ejxrdmwrqptoi2n3qy5awqkvt7a9x4dcd0rdikmsus045zrf9zu6lwyxnh1yd0a02qiyssmm3',
                        code: 'awpq0inkgv1zfqhy42yprf6fwsnr7lfhgxckdf14m3fdpuq5o0',
                        secret: 'r6wdj2q086p7k5zxefj9vg90a1ujsfzda1m2z9x3zfb8fnoh01knxdljeyel25f3bwkthhlku7vcwwwfdagm4iplq8',
                        isMaster: true,
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
                        
                        id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6',
                        name: 'h925zulmchqufkboh2jqns5v4gskqxpyo2lfvnxw45d5nks4on3ea602aeij9ostj4pex9hkhncbz7byivyxfajapall94lm30v0vewu3jgtr921gkgogh54yerf04siyc5m3w5m6hzaqamlpmd9n6hjtdy80s4rf9d5gv0ewvcv83ml84ay0cvjoblb3k8hq9jt9g7ft5j20n5pdo87lort6sxcxl5mb8pa78bpiw7nn1m4eyrq1pk78g1gl3a',
                        code: '536rsl847w7tioox1dda8j71c739arspaiunv5ziu8uqo7ihyp',
                        secret: '294qviav6noi0f5vi9izu9gja7kphd869gc2r7mnvsswnij15mhroj39vq3zuv2l8rmu7fx4ya64f3nt0raoez28e0',
                        isMaster: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6');
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
                    id: '8f844b5b-757e-4e3c-a4df-3375f902845d'
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
                    id: 'fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('fe3c8ea6-40ba-40bb-bcac-bbd13039a1c6');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});