import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel2Repository } from '@hades/admin/administrative-area-level-2/domain/administrative-area-level-2.repository';
import { MockAdministrativeAreaLevel2Repository } from '@hades/admin/administrative-area-level-2/infrastructure/mock/mock-administrative-area-level-2.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('administrative-area-level-2', () =>
{
    let app: INestApplication;
    let repository: MockAdministrativeAreaLevel2Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IAdministrativeAreaLevel2Repository)
            .useClass(MockAdministrativeAreaLevel2Repository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAdministrativeAreaLevel2Repository>module.get<IAdministrativeAreaLevel2Repository>(IAdministrativeAreaLevel2Repository);

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: null,
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: 'gegbzpj8',
                customCode: 'df5sm4ckx1',
                name: 'r4spvk32oxgla48qpedm3poexwiy9xc2jhrkogs2tr3sqje60uw0wq5k8dt6tq5h6ukf1om4deqpqb9oac9gydhg15zv8div3sbrglusxxo2neih3zjn3uu719dlt5q7y2s7cbtsv3mep98ozj11cvg1no71qglhfd8skasmd3z5sw8s06hcncu9lyrnd65y8bbmjz3aw8u6pxlkr98lrt4vc5hacmbug2h6a0pmyag4h2jgcgi7u7xn7cuf942',
                slug: 'haas69z8z5kgnra526s33lr1sfj73i99yxdv4bgfj6yn3giduonhj6qpaqj3nxrph4ba864cn7upl9uek06b2qj94s5w4bbbqfug2qtjw3qqkrniem46l6jmfs2ydbidel39tswf83x6t1pxhpiy6lbw81y5gj7o5ov882ggfmejgm3mlsl185z6mhbmkayadgofseueus43si6x8dijjplbdvnlo2z4uywp22b1jmu8hfz6a8x2iynbdgohqk6',
                latitude: 804.68,
                longitude: 275.94,
                zoom: 78,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: 'qye5ujog',
                customCode: 'fapl8xjfua',
                name: 'pc1rn555usppa6vte76bdbhotmadp08kweqmeyqvi2fwxisy1qowcn9zaqoklp2zbsysx26uvqcp0k2jl3ow0h9t80m9i2t3etrxb6c5830jchsznlc7c0o9bk9ekhulk7jx9bt405jvtibj0nz7iloufqlqr0zv8scr7qj6ga2d4cfvsedqunvsqawz1ej5qpk1n74p75hbth9u6222g65k3szlnnb9ajwbcia2g6zyui4yzh5ldr2tz7ko30e',
                slug: '9hqxji22cqhkhu62igyoycp0jfj4husj2g8cggwe35woow904igw7xld9rsbc2rahllmitlh5tcjjmhyvlgtvc6f8tle1jptrj2qexfcmc41hrd5xeyct51k2ptmey5feuoe4u8ae55yiqjm0a8oqyfta02jadwfvw0q8dbq6k48i7xnjx3d1c61osl98mtjj4581t4sri0a5rr1h3xgbh6qh3p00cxugn73odm825rxgw4rhfkmaf5a9ujaugj',
                latitude: 756.92,
                longitude: 753.22,
                zoom: 53,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: null,
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: 'szmoxs5p',
                customCode: '3hvb5cls4m',
                name: 'l21e4wymvw1vlshxixevnolzdb5x72474baa7lzt75nnezrjvc0l6xn9i6yb1atn76g9tpbevusuw9jv9ivsq8321j8u7bmor5e2f9t383i91cyellodt9f9qfrqofwgeb94ndeiej5p4xeugho3v12787sztthvk7d0hy0kt01q2lhzdetkam4fs94epjcc9bu07wnbtf68289d1qb0jog8b9i5jvf6v9xyz56ijdh4xo64hgvdvc2d4gn2dtn',
                slug: 'xfinkqapbtihq14cuys2khjl1fj439qzcufmtf679upuln4pmmedmim0295u58s7tm9dvj4xgr0mgtwn069v78kmw6pxvtkryyg7ebdg5ttlp99rca4rwbr53nlah89js2efw9qsjwaqes39vkghzsnl764fl2cntwi6kyy3wn4jlu823vh9d9oro6ekcixi5oy77rq7ioyegj308mimcz6v5h2vnvgup287dspbmnhfl69sl8sevp0d8rcpkiy',
                latitude: 133.28,
                longitude: 179.93,
                zoom: 90,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: 'fxqz0nyf',
                customCode: 'i7sxk1g967',
                name: '67gir1ak2o3qhnsso7geftx9w5w0k8fsedc5vgdpwkr5pq60n8tbx79tmml9izmvmt0713rug43rgpodu4pbrp4les4bxmmcnzseg36j1civaavsbr5jb8pc9ns3auicjb5377a7iuomlndpbxpk0qbnfaq1wy3r6mgdx465j273ijl736mhfbcmwm4ba3id1ffv0uywuq6h27g1qe1h5j8vazyzvm80hlnz3p4gkn061b1zuaci0fi8svhtw1b',
                slug: '8m84aj8azy62ysjnupl9yj1bc1oigdro88mnhcgo4p5slst7ipuw8zeg734kjsx32lx96qcp97amtmt1q1eq5dtviegy3dq0pte1t63x7ae4k8weex8hnuq3lhlchgbgsl9deq7lxg1ijpb2guwiqy53li2dkc0hcfh9p1h067pj7hdds353sdisux5i6h7hiz20gw7t9zc76yl1nwagpbi2hxvs2z91nj2uc1r7asgp1g3u5hu4ao9x1vmes9h',
                latitude: 493.62,
                longitude: 523.97,
                zoom: 74,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: null,
                code: '1y30nybv',
                customCode: 'rf0eeo6nbi',
                name: '9n8voik43tbgx4wozjtj4ncl370mwi1wvfc9j5vth78vo5o974v0wzklfat9e88zyceqnra9evgbx9u5ro7vo7x08xm32qflkczj8xd2dg4ovhlw0amqeri0fgwvuy2zv5hj3eeajyrmxjttr6ldpvkq4fogf2xbucjolfrzk7bx4d49y9y6sheymuqs4ecgmwiv1b7wy4666fqx6urlt8m2aoa2qmmqhhoai5vvo2ar6vrw7m5ejqgdprzxvid',
                slug: 'baeelbm5h1b8xyk2z7pq8lolmb73kpt77b5tcyy3cmc5sydo7kuast1wbxfqht39br1p0k2wtugeq204ekbtv4ia83mrvf45an7x8gsa5vh7dbgsufleam4e8s1q0buj2rwui0rhtavvduzz84i2cl5lxnu26qiqi497w8v4hzmdk3plrnrw2bzxnbptipp9jo4s25967qs2y644n3zcqi8s9vry9ohp77q83slwjlvzbvnxeu2u3ncxdib0nkn',
                latitude: 836.61,
                longitude: 224.48,
                zoom: 48,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                
                code: 'g2wufxzc',
                customCode: 'ifx9inqnmu',
                name: '2q6xvfcqadv5tfkmq1llkugpuoxzgvyczkiuwwnm0b5e5mnp28uedapinbsir2uan4752z69nxv6oeahs1qcs584hysv5ozgydsqqt2o2dafdhpp9qml8hw47hjpbn5rhsg3t0q1b2rnl3z0r19z3hf1ia4j6s8j6nsirennotl7ivjfuih4z9wc86tmu6w6j92ta6j3xruwttymzj775g07losbnao3a6xhm06q4vo3qizpj74bmkdvtiatwkk',
                slug: 'jdmyp56ehnmdpg717e2tvdwa3tl3k2leouxgllc1ilbvljlbf1ufaj5jv0inv6j4wg83we9ra1hp3z0k3n923xszi7galbi3vme7xycd5aok022lfqf7882k857kxtrolztk03wyfchf2zicv2qawvg7w3vuwlznidwa9dzupzwylxygfwqekd50m94nyn1rcza77d7h8x88vxa5dmssc0y7ajczp15x1n2bsci5xezwvwqa5tlb641xis2fxvm',
                latitude: 586.04,
                longitude: 501.49,
                zoom: 66,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: null,
                customCode: 'k2q3zfun6g',
                name: 'qiihqassha2g40nljg94i91ccblrsmfr5dd26pikqwj3aipbiddkjahtxo6uwlm3xwsgfbtu0xawe4ayyzjbc409cw8ymgwarkqbjm42jmbdnmj9hb81tcap5ev78dukxacnjsfp5ibx1mx4t0qp27rmgrp2p4sgxyxqb5inq52s7rik47yog7jzy3pmkow2fpa78k7qjvm6wun4bwola578jer6snye5cqbfsk5h28cvqfls7kshgllqwpv8fh',
                slug: '0pc42nx998ubz779hxi62t4pnopht9lwmaft5v1nfs4gvt99l1bidbf6zns1fev3mevgajacbqiwa0zed23thqito7sa2l4wiur8bjg8hde5seyqk9t58d6que2mt1sxyt71b44n10ba5bsaiwwxb0pdvok9ecab7448ic1qf5q883962zwl8inbp64s0q0lrj7fggl7a9am7gcyyh7m7iftnnoe22rom6q0fbzhmguyp96j72u30yz5106nsji',
                latitude: 474.94,
                longitude: 635.53,
                zoom: 16,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                
                customCode: 'pnldgl7vng',
                name: 'uaql615ubxe97lpemi9sjhrwp8ll3fr4z22khj46arxnn41j2fo02pljf52kyejlui5kapriwdpv20jew9rkm12tjj0rqqr9qtz8gs9ixqoiqg53mrjg3j5d69apwvgo1o4y4byoxzw1zkl8u5n8ibx8syhxya6kfad2igoagdf6zk2wl6efyw5kp145fwy9lvp69w1i81a5fvnuq0jhf620ltglkf305cfucoisuucsvnwhha44cwaoj5pdyww',
                slug: 'n16wqv0k7v1zfnhefn9tp508gkyr822by4rl52tiogveoidg4f87eiai1t5usf5v4spkw3bq9sovsdt66dc19bo17wm7jf85kcnuxnd6szpu13zemawip0w2e38jhltyucyvlabpn7x5i7osym60ybqzr0vyceeth1c5jnppqbmmyu4c0nsqeg0ru1nxa503a931c7j8yx3toc59ixkrcwpksuhtdkcwso5exh8tjazbnwf0tw9aufcs5qd03qp',
                latitude: 858.34,
                longitude: 604.13,
                zoom: 37,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: 'jzlxlff8',
                customCode: 'zn1ato6hqg',
                name: null,
                slug: '7oizbbvbg8ikmko93ri4a98j1s88l47eybxbwam8k3ebmwp3cd1y4d5sktsxn5ymjtydnjv6sbywfgehg4dd6z5aaaapgicioyaa8d17f24uvu4bkzwkzq0x1s2wed835p1f2zkblvqq9ljeb8wfd9rxgsyk38wnu75bazrt0d762of6yc2548dafuuwdu0sxlwnhj6besl8iu1sl1xobbhbb516ibtevz45grr5wfmqkgtit8kk09yj3hydfja',
                latitude: 496.13,
                longitude: 3.28,
                zoom: 71,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: 'slotb1zs',
                customCode: 'gqq333cbpz',
                
                slug: '1w8yr1u5q0cvuu9l0wqpoo6pt2lw6biea53gyn2gda7oh7lfoj15kqy1wxccgbyvx9s8l6vj0vd8rueuq8nf2h9jd11mh58qzvah8nmj4zbwvt7k5l250dw0fpj97pzeaai4tal9b3afofvqq3qjwbo5y8gwcb871y4vo32c6h5h13cojoj3x00kduc7g01106u9v4l61j73gn87978lgizutkslrupb26yta42fpll609vmp58qghj5dwp3v8e',
                latitude: 944.40,
                longitude: 620.26,
                zoom: 88,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: '5c0278jo',
                customCode: 'xk7qcjt7g1',
                name: 'rho5t73g37kb3ol3d4hhcnt6wv83frndgguppqq2yek4qisqvz78csqwjo341pytfylgl0i089jdgj8hs62jxqql5smmfnnl85ul7dihcajtcottdbjxi3xbmnzbg5sgewfwp41jxjo5684bdkap7n5zw1pinutidcjo4kqu34nzx2y1bxs4lf8cefpssnwadngby9ibn9madlitrp3znpdlugd5vpw4n330yqqftma0i1ddr6xkr70xfz55n75',
                slug: null,
                latitude: 598.33,
                longitude: 40.33,
                zoom: 72,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: 'nvwmk23g',
                customCode: 'er3pyg5lm0',
                name: 'n4ezcex9p4qg7o1qawgxqbb9540wh9qtb8jqq9upbz9fnvxwuwta0qfv2uidfc3oh0wev1sidsmuc582aunrbc26a7oakres8xqw8ypelzzh4x17sqd7dlyv92guppoizt9i4wnly4k4mopisu35ftr3c509ls3zoij92ijmbxc5p27773rpxk0b6u8vrzf1rdt60ypd6jh9qgkp1q89s1n50jrakox18jn6awjcea2bdrf7ons4mtf98ays9ca',
                
                latitude: 542.02,
                longitude: 843.50,
                zoom: 33,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: 'b5l40qn3h9rh6fplqx7hpuqlcp7ecvo7k0uip',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: '8r6ap5yp',
                customCode: '0gvk9jepme',
                name: '5adurx8jos3npxx5yf78fsgehpzs7f72ouajlet31pqj02l31fl4abjt8rkznk845i3oe6e6s0k830zblnr7jw1f8vykh5xnqvm2jwphunj7aqh1vrtsxz3noqj086vh3dlwxdjxvp6gahnjf5m2gsjtpil8s9penuzpyiqs377jr7fgu73xejnw1a7wmt9ddbtpwd71f9tozl0xwuxwvfkokl0avcmr40e0w3mrb08cgieeezw1yd9axcm195h',
                slug: '08l9y01amu22jbzjriop21vmejlecyvqf9p876lvzf1rjo3q1d6jst6njunde1eacm8wqp8mc7pkgaqsyao6590gqdjsyp177xs865i7348ops7s1xdvwj0hqcrmzxotxc219kwjrord0pkgl78jlt5k2ee27srwm8i09x9g42diqnqopa0qdlb39l83ngwsi54j7yqpvdymldvxw0z4arlkjripx2guq6p6uuytog2etlfkr606p184d5is521',
                latitude: 619.96,
                longitude: 380.30,
                zoom: 89,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Id is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CountryCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'njvsr852rx1hv366srv1n4u7wdwechium6wub',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: 'n9hf4isw',
                customCode: 'xy8auv5nja',
                name: 'rj37wllk1u74epd8qwzosrsthawty55iu74j3wws4fplkfa7wt7b64u8mr81wft4so840b3sq4ofms4j9dbxkq7jfsajxoaphepjxanh1uq5px7oqrcn83xaaiaq79u3ovfmj2xmimm399pdc7ojg4j3dhbb4gsmljvhtbg6zj4o2w7rck3oqaa6reulnkg8jlwnbb9d5l8ofeb1z3r0g5abwpxbpzajt2h2oq5gpibz9fmcvmfajnm45kx3q5a',
                slug: 'nyagcotd8ohd174ko8giaiz91tbun56eouf9ts0wfdlgp96vj4mde6iwoh27sbqay272b288kczbv50k046b7pkguu4sk3omjay0yrk0md38eu2hetgdxvv4buz8dv1ckgh1ji1up555p943tuia8m1mkfidxcpmho8uon5wbd3b976kzoif6t1f7h5qoimozl7vi023vt576g2l4tuislq2g6c8r2ukxvau0qqzi76gmz88idixsblluury2n1',
                latitude: 913.07,
                longitude: 382.50,
                zoom: 33,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CountryCommonId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2AdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: 'a496vpn6ymzxis9a1xbekml82837eo1m2uip4',
                code: 'kl7z8he1',
                customCode: 'tchph02v20',
                name: 'frvveoqh3ihjmn1indw43xxc7fh2xydossviirc0ehjfbqwzakczngtc9jd93skyhncxiqu0smejulzp0ilm4kf8jpim0mf8abcxtr64nypzzlwkz6jnidv2k3avu6gpd6wt72rb6ctedqdxtzm7fssk0zszmkvt4ay1da9wgujjv63yhcql3ittnycha42iv5ef5dylo8fqrkjilzheypmulzuxwhwgqzmyj63qsjjpqtfs3u887sl5zz6pj0v',
                slug: 'szm2we78c3lh79uf218b7ycr7ilkxj92orsswuw7uxjmzuwv6jh5ik43zf2j46ax4q0567j2l4x3rfcmquc83o16maoo31ic7ovyihg2igo5fbncx2daa3w748tvc5xyrjjrpakdt6nx4cyql339vh0ucdwqp32w679clcrau8baxtjl2566tzug470bx7j27987k5ww1u5jqukey23aqym9mtuo4iyorje2htb6qyanp2v9a5flk6qkv3ghriu',
                latitude: 442.51,
                longitude: 309.83,
                zoom: 27,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Code is too large, has a maximum length of 8`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: 'koj8koge3',
                customCode: '96knl28yhr',
                name: 'v6a83fzei62zcee34uln2zkbj9cm16264mimo5ufql91hboertmu3585s4gkl683pog2yd2rzhkbm0rzl8jlrr4qmt9kg45p6rekm6ooiwcx315vpunqn4hqmufp5xne8jqlgu7gtz643f96sunwjmmd24g9s5lvgf1darai2bxwozdt3wvt81a7uq2gv24da6okax9g7wnu8wvei19ro06p7jys16nmc99eybnzkxraa99cvleut3ttgjt776m',
                slug: '4sxnse42jpt8hgiuw07k6s45xnzp2sdincwyfr5spj854o9vi9xekzpklh62d7alir41w7nupelz4nstpbui1irwig21ig5p3nvsk4hvci1649efaj8mqem4s6frr44epzevkiojqvqgptzbfso2dk1l2pt7ou1ti1oxw64spskdno8r1imkbpwke0psz793zi2til8molk9587duh9tkwznh9848jdtby8qs4fbpo6gby72w9ep3tj4gmbjher',
                latitude: 613.38,
                longitude: 999.46,
                zoom: 22,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Code is too large, has a maximum length of 8');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2CustomCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: '6evoochd',
                customCode: 'tm14be265gt',
                name: 'jhneiq0acz4ze9rb6gmlajbbtjix6l6bsu2twfpfp5xblpo1omuhjjjt27zx951k89yjffi0ghrg2uah5qucdh865totub61ja3h0s928x3e3u2rxfsztk4a8stj62ang1ev0vnvf90uy8lskw2tgxnw1s8r85g595l0mwim5tqh7pmef4sovloeiclggj7dh4e0493rmxdgtg6r18vxmd4oglemqezuahtwl1sh7tlj1ksbxcf11y6jgs8d3qe',
                slug: 'm82ulnmaa1gsxhtwuujcfwe3ked7so8fy9vm9zjxsjpjcfd21vncfd4joikuh2ny1l3ejk96ra7dv2d1x94wpc9mpb0o3fofvppna30zkzyjh0c5m969db314bifukyys1uyg28zocffqm944s0zxec0qx60lw93masfky45whsizpiolgi1x0dbb0219x23xotf6tnkepdztz5t9zddagzkaz5v8sg938u3vts4jtiwrfoiv44865krm7ywqbm',
                latitude: 269.10,
                longitude: 192.60,
                zoom: 15,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2CustomCode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Name is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: 'trs6xbzy',
                customCode: '2xtqxl8f4v',
                name: 'xacgx6rfy68trio5tq2p3t53muqw47p0ozarik4c2gv5w53wsre0mccr90607605r8j7ldqtoepnkasob443p3gn1dc33ccpa2rfn81pv35vch68f20zgfzzc5c11ua2o0v3khferwk1kzseycnrdwe9mfghh2hsvexo9m5glyy8wlj2c8bzh5zdflga8wqafez5027j2bbfk62ebf9nqacscft5c388pxrkkmpk8lx4cxxtucbw2lu16q59p2nh',
                slug: 'h9rjqckkp2cv7kjoqds2fmdb4lq4eq4ubyrhviuo9vxsbg1l83x8kxxr2i398j366q96hf9809fj8ufgszdhtj2udq1785ee73g9ovlcm4z06uj5gf78ryvspuxth1mlgdr0zjtbu6hndsojin25nlqbwg5yog3gtawaycjgzaeydg8ziu6s5ofvng648ztl9wznxdz6k2c3ynemylo1mofvin7x0umrv8q1glkkkdbig807tzxhkjd1f2b8lfi',
                latitude: 382.96,
                longitude: 410.75,
                zoom: 14,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Name is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Slug is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: 'nsapf4x2',
                customCode: 'rhgr4yowl3',
                name: '1yxuby5yu2jnehjsu1zuwh2v95yivcux0yu3e2o5vg1fipi0e0d78owg0gmo8gg9uy1bhzx2f66mu77br0l6pmd8e1t701q5btatll7iqczp0jgq8uxpkon66bu42uh9ihp8k3lyfdbqdjbcb1tb7r1vl1n344s44cel05nt6tsgggfs8r47rpt0co55n2qtdgvllzu5mnn4jneyv4dz8fxynyfcqyi1n6tl8q35g9qhqe8i69n53qbdcmybk2m',
                slug: 'yn0rbw0ew8az6ox8xie9p218kb39atat3c9t0a9jr16dsh65ykghvslqdbpodns2fqsroscdu2cbk48pw12cit0ak0fu30tt1nqs7vyjtjiswz420qx9j2vl714oo81qmx2mrfzwy8byqs0nw44ann8uh6h0tlx5xqqbgrzskw0pcev5qj7pdhhgt4kg68h8vu9qhgq8vbggxqwit819jq7b4r89h4knkuz78ons5vdak0vjrhfsi9k7ji32ppea',
                latitude: 457.15,
                longitude: 549.59,
                zoom: 77,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Slug is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Latitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: '4007a6wl',
                customCode: 'gzvjgub9ci',
                name: '29mtkpf8zduk1xuet57q137zsb875stfbihiv9kbzkj218dt3iq2etrlrey8dbdp5g8etnwkin9t08vmcz74xqmbqocjx3ev9ok0ahxglxw9zwam2szn9s33hmp9vxrca9fg274nv8pgw7z61jblc4htfocn25baj8ywwp5xk0637wlj4ru2mo2cztqmut3w2tmdr888tsb9qopjzs55nzfin4wznnuiu8k1igyyzcqxqmmj3mw15b43q23oln1',
                slug: '0fb22pcasj8hhe87n0ys0bqmevighwcai5k3ug8mj1lge920z6u044x9ktk8eg5vtcxspcu67nbihe7edc58convl56xdbxb4vygmacucop2sq0en8lsu6wronxqtwb1aexncu2jfjx4gvzjyvb4rl3pt5ggj8p7uecoe5edq7s9tgg70bpqlg7xich223uamrhwoqcylbjc5nfqlznfc7ddvwiiusnl15w2l4r2ixs8t6073byx0y0opxmkece',
                latitude: 71.16,
                longitude: 630.52,
                zoom: 42,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Latitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Longitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: 'nlrnnbww',
                customCode: 'amqaoyse44',
                name: 'liazvboy445df9bize64si60k4qpugmmap3caygzeh7ozrtj5ns5bagr8g6xe8uypqgcnluvl0h48sf7nx723hzud0acxwdjqn93uh6u7hor8fpr2dx0tzyempdmabqnn1c6qlt87a5viu23lwyl3zsu47q9obn4vh61sue0rfzefgpaw5stlltqdnjjpmi8zt291zo3h0sc0v3jx97ry40ntu1md0e7gp0sz8zk56i9hnfmd2ulriqt0i7xqt2',
                slug: 'btplwbx54mryxq8tkh2x7uhzzxdbu3ce9awhl6yn2grbpm74yz123u9u5eu247zlpgu496lhtuk3365van6e9l21imkyetyjiur1jlfvaoffaqr1od60usenpqoos5iwcvs34gv4e252wct1eievi3dzjmxakobr7fyftprw8jf7nyyr1fa7y6j6du0sd7q0jmmca770c5ual481bd5xuwzpxizkabalbkdco3thbafalhmob0qufxd88gptz1m',
                latitude: 374.26,
                longitude: 715.29,
                zoom: 37,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Longitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Zoom is too large, has a maximum length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: '3i50z1ha',
                customCode: 'zo1v2nieae',
                name: 'x8wwl9c6sisf79utoufielcfmz4mzmep00krdq27w6y9lb8to12r763xkgwt15ae80b5zlz0xk7uobzhjd2k06kur6k8u0ctexhzoolqa9tmlnii65aa1zan3sf58hszo86y0fh7jujobqbusw611yd2b1lguby5mb3viz3iio00e7ei31l51qwmqes4b52m4w1ci9ly0szyvka8i9glq9ccryo7inc8yeeikdutv5rjeuz7lwuks6dwx2g0f35',
                slug: 'cry4inrkjpec9td39cqy9dlv6i9ppxe6jmqi78rqfkhabqtw8hinmfg3wl3a23d3ee3d15qh8x692yvm7p9t40oixukx971d53odgdxyoczj4iiko40pko5u6e41yks52vrz8gq2h5j93gfe9djexshxqr9jj4za12e68fycqv342fhg3wa6w7fy8sm066yz6jty5tnvwbo0es3myz4o9a3ri8wvpn0u1v74bjom0d9bdkx4a46wz8ps5b5ad6w',
                latitude: 780.78,
                longitude: 716.80,
                zoom: 683,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel2Zoom is too large, has a maximum length of 2');
            });
    });
    

    

    

    
    test(`/REST:POST admin/administrative-area-level-2 - Got 400 Conflict, AdministrativeAreaLevel2Zoom must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: 'x2tnpfhv',
                customCode: 'dh4skogip8',
                name: '6fm6ohy0ugucyy72z9rclvfveydeeh45janyh94pvdvt9stbus9hnqis64uqioxggxdgwdzj1z7zrxbu78z7scs2cmhhhums6i572jpp2t4wqg21dnbmik7uy5sxkqzhhgn8nduvxg5vjpcims0my9rqsukwhku19wbexaumqjkrxh9bu03vzi0jan6dw6pzyfws6wi380a5gv38c3fjjikz9z0ljdjcd2wlj55k2j12ppbp9eyb7uqb5wig6o4',
                slug: '3e57627t3cz637pp9x4kaxg5fepzyloqzk4auoxsa5nos9uidmtnynsvik312zpoyitlev9afg16b7oop5k20w78g5gdqo2j4vbd4eahfvcwp3aqx5gpwf3ce73mm6u9g5j6jbnc274tacdvqmjhphg8znx01jr34zjwq7fhj5shrzomaoozw5a2vvbbr2fi3j8rf7nd534uehe5qvwz6it3wx8mns54nvfm9ckfjudylyafecujzgcdmq794fr',
                latitude: 446.43,
                longitude: 463.60,
                zoom: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel2Zoom must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    

    

    test(`/REST:POST admin/administrative-area-level-2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: 'xvz2pt23',
                customCode: '4x0iwd5v2c',
                name: 'e5r8rez8cazqfab8uriygtdtgx6a5oxj4g6fukwwuo37zg41xq1inv7fq9sur3w9q13i0nam37z1sope2jshnt53uw29wcq6sm5vmnmknb4hcegmywr7zll634mzbickdu71nwt5od4sv5edmkoujjms3kmqmprxdozz0ecj59h3tvfkh8i0453pr79tc7bdyvi4d07xvbbpoomixl2qlaeucdp69e2lft07uqn4linf5647ps08pg6km4biyz8',
                slug: 'ngtnx4y49yvekhndndof9h6dd8v6u8iv3w4a0eayu01np32t57f99sgiul4zm1e2l8nvrzqna730uetp5uq0ii3749x5rzfoptftdb8tzqflpbw6tdyvx0w8qei6aqjpdzy7lwtqam56oo67edfsf7xxg7hlstycdra3x5jv5vrr991k94i88z88xg5s6hbse1pwsshn5s6kyy3c5p8qcfgjl7qye6tb0cpalxtr10i3v6yf6ne9d3dcvppy6iw',
                latitude: 668.94,
                longitude: 322.74,
                zoom: 29,
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-areas-level-2/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-2/paginate')
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

    test(`/REST:GET admin/administrative-area-level-2 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '6d2b0244-39dd-4336-8a74-1b06545eaf33'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-2`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '78d78ad1-6ebe-4ade-9e9b-8295e049f87a'));
    });

    test(`/REST:GET admin/administrative-area-level-2/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2/36612397-3928-4688-a153-7958ab46677d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-2/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2/78d78ad1-6ebe-4ade-9e9b-8295e049f87a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '78d78ad1-6ebe-4ade-9e9b-8295e049f87a'));
    });

    test(`/REST:GET admin/administrative-areas-level-2`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/administrative-area-level-2 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                
                id: '62f17254-c8be-4518-ab04-55573cfdb381',
                countryCommonId: 'b5d17d37-fa0e-4a02-b439-2734bf3e61fc',
                administrativeAreaLevel1Id: '393ebc1e-3b78-4bbe-b504-c993fd2b24fb',
                code: '4l0pyovw',
                customCode: 'lmut458km2',
                name: 'c98rdvm5qzjkzi76w8lc5brv4vkvbkmkh8v1bcgw50qsnuve03q8vb24s9zg0yphyk95k8v0p23s79emqtvia4wc49udblmajgo0yu47bol4axgk2j56zg9qw82o0e84auifvj4nmcjgopy29mnntc36qu6s4s4vnrbp8abujnnd58st4e7rt892mpglyi4ms6r9qmcskks2blnz2z4jfb009ca72smslaxp0yj45su5h94yomq3yx0s81w2hx4',
                slug: 'zdlqocoybmyf94cvlb7waefx5fehljnl1a5rvwfoaftlve7oquua2h2b70s4kcc5fqolscwxmafqkn5yyea465mzwrdzlwws75krxksewvydsy6p9cs2mi5u1zba8afdd49r7do8t2xr6mg3jpk86yxs18t5we5cic3rh5s2i1qxvanfftdym1188b9splag2naufuj9j328jigcb8mkdg3cxephran0ndx60472fskkui569tay81lotxapegj',
                latitude: 289.72,
                longitude: 469.30,
                zoom: 39,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-2`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                
                id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                code: 'rwa8avr3',
                customCode: 'gfi51iaoi4',
                name: '6b13q008msmfqc1johnvi88p9i8gzkcdwofuz8sjnnl0x1zec02fvd7766cn4isxu7dbg7qz0ug5s36yvrti1718vlz8zwboryqq2n5d24i3lv4gn5yvn6r2158p43pl3uk4fng9lm49a9xxg2wrspcm0vjoniqwacjjto9gsy8lntzpztt9lkcawrf7pnmcnqdclnkhnvn3gxjs73n9qfsmrgpvwdgpnbrnsf911bi4xi1wyoj13vzv2q64gma',
                slug: '6onwhwqj0ig1a50z5puely8bllj3g02l0jzm3j20dj7ci5bt4il1w0jmjv5gfn67mqyv7t9osft74jbid1f54nqq8f551o3erl1su4l2bu69o9adw72c13ahrux28e7z0jvf0dbjsjdb6zy7ghdbw3okjjv51h1o9buo42j3hhtjn3m1ac25bc5rfgo41jjkoqaxglplh6myond5p07es791odx41hdpy3lxvwmttxcq191w8ds8023l88xk6cv',
                latitude: 485.21,
                longitude: 382.19,
                zoom: 15,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '78d78ad1-6ebe-4ade-9e9b-8295e049f87a'));
    });

    test(`/REST:DELETE admin/administrative-area-level-2/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-2/744b38bd-d13c-47b5-8b0a-07e9de855841')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-2/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-2/78d78ad1-6ebe-4ade-9e9b-8295e049f87a')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel2 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel2Input!)
                    {
                        adminCreateAdministrativeAreaLevel2 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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

    test(`/GraphQL adminCreateAdministrativeAreaLevel2`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel2Input!)
                    {
                        adminCreateAdministrativeAreaLevel2 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '9e12d0ef-84f1-4cc2-9590-cf6181e5e9a8',
                        countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                        administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                        code: '3f4vfl1g',
                        customCode: 'kv3hfm0nkc',
                        name: 'hwkgm7olrpgyk0btzkzvjnlifjam7vmqjono38nk04rjyhlobtyqp2iur4d88wgeu3v5p7dn2ymsscn1a77hdpyuj7b2iwdjzrlcscucwaappceozp2e7yrbv4pgbezvcls3ix8qaftxsrfw1fslw8nqg5ac9gzthao7hriludrjrazso55yy5e48tjigr58x36fhsqjryw6ztqnwq9bceo5mxg9qhrgs87okkcbksgwyi7669nsdhoj5gt8xzh',
                        slug: 'i2cyi5gmj4y2ar53nicrnr4o9vptt9dicytn4mq67xyuovohq4dd3l0qneti33i58ebq9u55qly4rxylzpr48x7pthmak8y6nrup6ktq9pyd66rf4j2d639ce1kgl0lc07lflnoasqxh80a6ge8oka9skbie8yp1qrtwql7c1y39equ976oh1lhmts3c4fos6mzwzknjjr7f4ex7pm44big16vl34y4unsw5chf0r5zi1n5k5i7gvyydmwiqohn',
                        latitude: 657.82,
                        longitude: 737.21,
                        zoom: 10,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel2).toHaveProperty('id', '9e12d0ef-84f1-4cc2-9590-cf6181e5e9a8');
            });
    });

    test(`/GraphQL adminPaginateAdministrativeAreasLevel2`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAdministrativeAreasLevel2 (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAdministrativeAreasLevel2.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel2.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel2.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel2 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel2 (query:$query)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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
                            id: '29feca8a-6ed0-49d3-87c5-75db6783ed83'
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

    test(`/GraphQL adminFindAdministrativeAreaLevel2`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel2 (query:$query)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
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
                            id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel2.id).toStrictEqual('78d78ad1-6ebe-4ade-9e9b-8295e049f87a');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel2ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel2ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6960c9f0-f9c6-49ca-843e-3a3c8eac9672'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel2ById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel2ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel2ById.id).toStrictEqual('78d78ad1-6ebe-4ade-9e9b-8295e049f87a');
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel2`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAdministrativeAreasLevel2 (query:$query)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAdministrativeAreasLevel2.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAdministrativeAreaLevel2 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel2Input!)
                    {
                        adminUpdateAdministrativeAreaLevel2 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '82f19cc7-4440-48ae-8c17-99665772cd3c',
                        countryCommonId: 'b44e1d11-f307-4645-9931-afda5f901c97',
                        administrativeAreaLevel1Id: 'fb5dd8d0-0e25-4085-8a38-bd9ff45b01a4',
                        code: 'e2fcemln',
                        customCode: 'kubuity0gq',
                        name: 'mhi67ojdvyb5budz31kqt3j57b6y0bupbcir9ytumm0p7o4trg6944jl6dzgr43sdu3hfcz2vwm3bejndr05yg88ycoc3gux7s5oqzkhyusvc2opap7w5zaojpj47f2hjihfr9z0djsdj2a4obt4htv743c23prrc8fclpzufkt9fb1zp1347js4r9nnly4178qyv7helwcxydhw2vlv7vsmbre2n4ce1rh8b350ryonaj5c4h2gyzss2z7onjy',
                        slug: '9yfpvdk9wrlz3y1ifld10e6xicc791mpd9t46qsu5qlcl5fvrixetbz8xyui6y9lwsr0w0lg53pfwecbyrdxoyq86gpyiwagqq14rkm2rg7d009koeoamlenaw6flkb7pt4tjxyuvavgtbgly7x3s6pv6bd4mav5ejv9bqymion7d8jga4tjx72579rcs9fsporvpd9bxpd7teu2dkpwq7dokrr61zb95p8g3p2r30v1n6x9xh98dfnvlqyw6uj',
                        latitude: 465.06,
                        longitude: 586.88,
                        zoom: 28,
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

    test(`/GraphQL adminUpdateAdministrativeAreaLevel2`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel2Input!)
                    {
                        adminUpdateAdministrativeAreaLevel2 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a',
                        countryCommonId: 'b7fcbf87-420b-423f-9cdc-5e8b37b41a61',
                        administrativeAreaLevel1Id: '3de7bb91-708d-4e45-8ddf-e02620921a33',
                        code: 'bm0pbhzy',
                        customCode: 'c7t1agnuwb',
                        name: '13cmo6xfjzsw9ecv3xfexq87he5f2nq78vblolnc0d3xix8blfclwxjg7rhe80q9892ffg1ouzvrm5lpzikz39lov1hffnztzxytiyphyz876l8uxqkc5mgxx8tk0xubdx4izv836omrmkz74gwsjdwk7cx0tzvoxu9bkm3n5zmk6q60uvq1hx8vipsq2eaxrniw4hzhyc2cr2x3n9x2yikzbxep7rvyzy0lvoimr2rnq406a9u6q6afzdvgcum',
                        slug: 'xv15774xno8sdfnzyleb14lzl73kip8r2eeoxzgkxhthwtl9sphkh1htz8sz9kqztqzrvemn3ylyigs4pvqx433g4x7c8tmpr099opcalh5ww5qmt7khaou4wmly1l2obi5h7p2s4x7s61zrepjqwhrg2v466vq07wulr6yl13sgttmnj55ovr07hvljk5xpcyl5q34ywfbxgyfo7vb1tcxjbvg8pxtaj5azmf5ll14on0d23ki04ecdj5aftaa',
                        latitude: 44.59,
                        longitude: 14.76,
                        zoom: 95,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel2.id).toStrictEqual('78d78ad1-6ebe-4ade-9e9b-8295e049f87a');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel2ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel2ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e2016d88-d2c2-4450-ad41-062d91c5cd91'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel2ById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel2ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '78d78ad1-6ebe-4ade-9e9b-8295e049f87a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel2ById.id).toStrictEqual('78d78ad1-6ebe-4ade-9e9b-8295e049f87a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});