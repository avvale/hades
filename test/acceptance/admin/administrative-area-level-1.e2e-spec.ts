import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1/domain/administrative-area-level-1.repository';
import { MockAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1/infrastructure/mock/mock-administrative-area-level-1.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('administrative-area-level-1', () =>
{
    let app: INestApplication;
    let repository: MockAdministrativeAreaLevel1Repository;

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
            .overrideProvider(IAdministrativeAreaLevel1Repository)
            .useClass(MockAdministrativeAreaLevel1Repository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAdministrativeAreaLevel1Repository>module.get<IAdministrativeAreaLevel1Repository>(IAdministrativeAreaLevel1Repository);

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: null,
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: 'wv0vq7c8',
                customCode: 'sxopu98bks',
                name: '6687hydf3bjed6hyxrv476y6bgize8m4qygg1ktdgcsruw8265kr76qv2fet952ucittgoscvw4jaf9rcrjwqbppbo01ax1cqvlaimnjvqg6i3petkrwxcf3vs52zke4ikiim5vtkd4h1mx5lqjlrshua99otw783e87top3pa9o0h95tzl81x5u41smyzdse539tidpgnzdoncfzc89qk4t4golx0m6yg787c0a1q4unhkp7sjirlaj13q807g',
                slug: '0oq3d5x9u04mrgzvo5u8rrhugp4tesc3gs4ipfw5se3ln2fhiniqtmfam4hvrah6pv4o5y3w5fzhj9f4tjb7ltrxucs47d8jfamfxk36i3duv7megsz762qpz0wv1om2nq0ide5pkf0okhsjq1etnz0c21tw7ths3tictaic7czv3i17yes820u7eg946rgtqm4l7fb4jz7p0n18pjmc6khtljjuwwlg2rumqhocci07xqt2yvp7z0ruan7k4mt',
                latitude: 417.71,
                longitude: 337.18,
                zoom: 10,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: 'vbzdhoj2',
                customCode: '6pxxspz5nq',
                name: '9vq5k03tj7lcyrbqtc208uz8f3mfm00oy6x12ww2gzlfdu2yrrjx30f0geqek2b1dpnottphz6mx3728594p4zyh36be9gwfxe4yjp87flr86ma9rrro2m9tljgve3xs7vrbzlw9o81dtlsktplf1d6wcud5p0obqqb1hqce3q7j0gaf6jscfj2jl3mi7h05vc8oaamhyt37qvrp67e4cndpciconsclksk8y77avvb2hm7sx9oufb9y3icdqr4',
                slug: 'i6fywj00z6gpgqejy1wy5qcmi3jcoepdnzhyvkonlvvj884zhiwfr0q7uds5ecvnufsg5u6u55qi0al94u74xksl9xcbgkhkupmcbr1uuqjdi103ckxwp9iwggp9421z087o6qvff9tr215d8bd05n3rwozhmq44awp3eokjsgz0o2ih5oa3ee4si2yufwlhazylvb7yerx29a6n7tuot4hgifkti0uohborkxyt2df2a76b10njxdbutvbrzip',
                latitude: 46.66,
                longitude: 500.97,
                zoom: 29,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: null,
                code: 'rlm5m8vd',
                customCode: '0fgicu808u',
                name: 'sqa2tkbkly852ybe5ycckhw5b4bqwqwmmi9j2b3ipgfpjygzjywdd0xeibg3mzrjoivr3cwydlkhlviywmjkzetdlwvevozz6yplw43wdjieylwlqjepf4r2x7n33aibxzw7q331tcwa65i15ytktg3w97ctng85td8fniecsr6vch3abcj6to6isjfealn85plrq0n1qhks2yobp3fycuj9jgv1410phf3guej4s2719vr7680p29q40cy70bg',
                slug: 'ppqiet2oeshlz4wfi9wh4mp2lbazpajmvj9bdz0jj8g8p3qp2vq56x4wt08l38snuh9ot8jen5e7le32894adbn1en3pnul9648x603x4vudqnckk0j2kol3uu1oeo1lsyvtutcraea6yx348orfw9feiawdmdfawm2i5tw2144n6qp2ptasbek1nqdyskc6aue604gqz7mclop3gv330x4phoeyg4lv521iftqn83vqas8hb7w0ldok03hmln0',
                latitude: 467.10,
                longitude: 143.21,
                zoom: 20,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                
                code: 'qrrym6mr',
                customCode: 'ax0zxskn2j',
                name: 'o2er7chvshjfgkaeyqavaw1wqnllygeo5dbp4tw43c069o91hdb77x21me5h94r4bk86f7f0x2mgjfofilqbtcul1hlbxgedsklpyfe1nwe1e7gonz4dsi6dbmkhkj8kwmsa7ojews4ne9ys3wc400g0m4pmrcaas79dglzjqx6mrhdz6yvg20h5pi37h3qmsgn1i1ao3v7vmdwnfish6461rrozl87r0bbjz69jsizggh7m2npi1vn41953rhj',
                slug: 'oap6m91pn95buco6n8mw56o49k4mpxaquyx6cqs8nk6jgir84uc7rk52oqmk5b1z2jhla7sdumpe91vahwtxiri37goa26m4vjb864grqu5ufwoeso9k573pt7why038qjss2vfxhp76voib4fqgf7apofijuxzmg9pwnh90ou9fyeyonxm7rcvmln36t7tktv0w6dgnnan7iad62tv3c0c2r6s7xizujmeb63fbg4tgenmhmx2hjcszmyeafey',
                latitude: 266.22,
                longitude: 266.84,
                zoom: 84,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: null,
                customCode: 'nqiv8kt1y8',
                name: 'jwne9slzj017dpk9615m4d461dw5l9mk70u7yri43h4u4wydq0l7dslrjpr7bcefw99bg2e4b4krbvk7m14d90wf2oiy11arb1w66iei11z8iepv1j7rmzma3d1q9a37e1onddg910bmn9nhvjjlm8rx75rxb6s18u0lvxzf70nwd7th9mtdpwzc9x102rz1b9aci535b3dbad8ke5fxp0g6n40snirhancdl91e4yo3cd6atvbtfzi8jklcgmb',
                slug: 'kfcnf063fjyewfzx7zw01bu3u33wb7bsbi3qty9oag375wmahy3ydzer3t0klgi3chp2nsqji1h6jwccb7gna5em56giwl8cw7amubwpfgca0nzpdxgjjxfcp9d87bhk7asoly0faea3jttgbga1bxovrltqnqu3ewrbbx4wkw47bin1c4uu9x2o6up9ecrgh4bkbkds8ws2sgwcm1m8wq7htyfdhyuqd15u7kect9nnln4ip4djmyuvk0c7sh2',
                latitude: 915.64,
                longitude: 0.11,
                zoom: 21,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                
                customCode: '80qgfjxh3c',
                name: 'ljtj0de34zow65r0lwr54zeat8lw6s85fbwhq36bk3fkl5h3anzov9ftm5wabqz5897tdjrz6gjnyn9jm30v2j3i4wp17hli022q9iekw468rcnb7re6g8jdc17pbza1ga84w4de9hgpg7q66eroem3azmswt64wu62rqww4usf9h8mtriso19yihr7qxowggjhvoyay7bznf9xooyo84xbf7h4cxoebgcxjvvp4ceutnp7fdwe4uhh917t5amc',
                slug: 's5zfv0iwz550lhljrckak51iqa54w6w6m9pgueuure7p6vqs5vo4gko78ak4tsmrj8c75nrnp1tfdifpqk1iqftxr6ushni40qxtrhe7dx6xtoewjchepz21s42ucfnsp7uwvz9zul7qnkyys5ss0qcu7pbudu2n84636f6il0l7fx5d1smka7dzlhdxz3hqxt7g0w3557o16aww2crbnr76ltaugihorox86e7syzmsarr3qz0ro0kpdc7vq8u',
                latitude: 167.76,
                longitude: 143.74,
                zoom: 13,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: '1vorum9k',
                customCode: '689l9bibsk',
                name: null,
                slug: '28dsiq9q1dfmdvufudj4lpska1pwsjz2t4llbdu5oty10prldfy5mdn7rhm0gdk3c9z9qr28tzjp6sk5wn65sjjre2m4d00dwglnjxtl9i4917ofktwk6q57wi0z79zm8okwupjqjye2be1wsm47fzjrx0nkmx2lbee202un71jcc34g2ppn3hm4h7s9cwe7mml4rfphl9jl4lbryqu3lazho9gpjf82xynlp1vyubresb2hngoncebr45s5n92',
                latitude: 262.48,
                longitude: 713.74,
                zoom: 30,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: '9tfde4vw',
                customCode: 'luf0vyqk35',
                
                slug: 'y55fzrbi0n91c0u0hflhx0d7d671hdrc4avhs6xqkzgwl52j0lf7k8t24jqtplxgl38dikyd1tchcuy8v86cajy00f3mbgtqj2d2pq05oc5g3xqzmkccfcp17fr6qfmfbr34i76rlieg27n2rvs7459khgdxq6rfbjja1ayt80phhqjhl1385zpcim3knujzmftmunlshk211dosaijdz4vxnu7ue7f8tu9fkya2i6nyyltfp5lcx092wzugv2z',
                latitude: 520.13,
                longitude: 227.61,
                zoom: 64,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: 'uylqs6di',
                customCode: 'keb3w3ujoy',
                name: '2dk0cihnaf39atvax4icb0wdcaxed6vc8850bd0edp28axswevtk7jsrgpltlt4kt2mogw686rx4l94r89nwfoquib2y06vs6ndrkgr1mz46m5zi9uiufebiv9lxm6s6l5mqgx7vhpawm0a9ejfgi36ced3ypdb7sck23568yj9wk0yhbp799y71urgaktgm9yprpuwurz746fknisfl5x84yxf2t4a8pzmhs1x1a7z20nclfo5chpozxtv09lo',
                slug: null,
                latitude: 6.05,
                longitude: 664.75,
                zoom: 27,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: '9m38lq4z',
                customCode: '70b29pyhvj',
                name: '0y9ue3yhv9qog2iobg7dm3ht3k31op5hjrl6q38lgqvcplogylzvau2pplb4zthmvkdra8dga22bjalstyfeys6zctjn8etka8et5bj21zenh13kv8k72ik9bityxt1cmj1gq4ukyy9czcjysh1ha0t406pjmj7luafxsrnacubsa3b9mvn5ywtolbvd2gns24slahp27yz4w08g84ta217kyu1nznbmwgdx8yuh24g6ok8v1jwlr0v8v8kh6h7',
                
                latitude: 461.29,
                longitude: 226.46,
                zoom: 76,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: 'hntcmiwmwa04sdmlzm3ctympdojr4t4rcw6cg',
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: 'q8cx9w6w',
                customCode: '6ujrgutcfa',
                name: 'fv7dadt3e5b79x7fg14en5cfzyuqrmqa0z3kpxb5ixk5ouay60rviprf5gd6spyqdc6qz5uo0y5ceaw944myzyis2qqfg0aq7hnlyczl1clyd28tvabgzb1bybs0kazw3sope0h2ycsr5k5vys16y8hwtzvddfiput8prom5podsfzr84zrtjs4y10qk6se0rzi5jn3kpwjr68to849ei6ko0sre2emwo5n0jfuuahioq0tzah8qrljiuy6wfm3',
                slug: '1fhs2n9rdnsg14rddoasie7b27sk9nanssgb7rvyejmeu7avr7gcp61sz8195j8se5ydh44jwf84kookhsi228mdmgdbjoit5hol6762xpjmj416pgq22je6kml6kg6yjgxnm74jrez3ekcpkh7j7i0dl0i7qovbrtctuh498p13na0wimyloi6m0y2873qij1wra60jvwtabz94lyamzjbhaeop1qda650neu68otev0j385kc22wabq98s30v',
                latitude: 912.90,
                longitude: 792.44,
                zoom: 92,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: 'kabrurwk2twomzrxx8o7qz08aw290hhctjl99',
                code: '4erbnawn',
                customCode: 'ewta4sbm4p',
                name: 'hpe5zh9zt033c7o7gmzoos6p22z874gg6lx5y22lc1jy6z9naj6gzwbftkeruwgs4e94y5mf59wed0euip1dglmq5olzd6h24azmo1fj5z5dvin8mfosndk5ddi12y54i3fpdcdgmadd6x3796zn7a8ckgl12dagey13ky0iadrio8icjnkb38nc09sjnkp9s4b9xyas6axah2ztszatoqrtlkwysh8u7swz8rqwsibnvuv33j5x3n3sou38kyl',
                slug: 'fkadwmis0o99l4jvzbxvzbpgo30rjxzm77synor596ynjprmztufd5eieyndnzrg5w5bpssaiuoki00sgz5f0cw0dfwrvj74cihzaie5s4mj69wtwssurbhu5gw2xalt335lcyib0g2hoounr1dyjfolcmw1yuzsstk8pr4c7ewhs4v5pe1b8jtxaxdb1suza41jo2tyddzrd51y25bjjl9m5xf0rr74bmikkdhi4o3j1ayiuka1cczcuu8padz',
                latitude: 572.77,
                longitude: 764.42,
                zoom: 62,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryCommonId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code is too large, has a maximum length of 8`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: '1iudm863i',
                customCode: '4rmy61z0sl',
                name: '6qajw4o4oghrpx8x02d4d8ilsgheyfpdilnfyq54bpes4w4h6scs7mfj8dw7ck60rl0i52u8e4cc5ko5mmtpf8qvuutyk71931hiqq5n9ym1voxhfb2ionfqf9bbzj1fs3hz1urrngd5gjsvqmuemf5onqwuwhkmwx7xosapaavfmjhxrd7uc5i1xx9nvpx6l9supro5jk88m9i3wz57p2rcr9xn80ovw7r3vbaepg58dz1e5je150wbzuy0i1c',
                slug: 'psex0bgblmcn53s5pyrie15ou4h0lwz0nzq3909bij0o5vse62nsr2h3a6u1rh00dhrde2gwws7d820aodx3jad5rs561t9mqn2rf4ysp2b3kwfn2htccbkp4lwcuzfcv5egflq8u192qazeldoj4au7m29isn4pll7r1hixbgbwog3g1egv6tjdleoi5r8dn9hanrkmj86705vzlpp8py6oz61dvrq5316zs11wum0vxa7yew5gh7ozhdc05qh',
                latitude: 826.07,
                longitude: 131.00,
                zoom: 87,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code is too large, has a maximum length of 8');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CustomCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: '3u7t4hnr',
                customCode: 'l5tm29ygijx',
                name: 'ccdpburest9jlza34kuehcxax0x0xq1tp04a518u9sz8tap2yyq6n571g1c4gyvdqrtm3iw540wi8d7tjz9ppu31todouhr4uedhgio4uu1tl2u0sx392eeyhxmbgq8nbtaus2m2pellm6c95jv6p7m78i1q5hd6ji3qxix59296j5sj960imhgu0gh9i0d6f0eo4sutxm0u2608gg46uxrad96pbb967rbcyj0zffw3piygz7g8qgfnml93ujm',
                slug: 'tonfwyd0t6hv64g29l70v4acrxt21a2tg1bvc477jg1t1111dnzlfw3vc6zlfb3cbukumnvtl0z21zrd5mrcvnpcwm3mfifscwf2davf0tk2d4a8acryz0aof7fz5byh17xgfgmy00re37e4mclrcwqtym7fplgmv0r222r8xyyi1iwsbmfbejaz8i2ivy1peans2h75rkg45ne8lhpd6px1yrsm0l5tcgizo44lo44j5zw3ds6ha1tl8qs4gaw',
                latitude: 774.80,
                longitude: 571.78,
                zoom: 35,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CustomCode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: 'o9z2vv1i',
                customCode: 'u8gnerryfn',
                name: 'gufiquda2yrk04cpvcvy5yym2x5dpwzlf9xh3bocjbcaafq1xpzw33la5li5nrtvd2bn5nppav04qdi7s71g69ica7v4mj2xo14o2gc7s7972a47rhudq1g8fbn2joitugiqua3dsfx4mrv1nl81tja91k34svpe5cujaafoufx9zcz4ukap7j8jmtym5uw35v3mkdecrdfzhua0h3zbmqkw05dsu2unqminjwr32fii75pzdxgjpepfuhgggryl',
                slug: 'wsigebkkn9de35ms2ja3l06pr5gjf7n6jhvw0fk3qajxus8lcs0xcfwni0hvcr5l9j39n84taq0cltwguwlcemqv24np94h9mbl14du3tudciee5rxiu34rspd72r9j0mmqrl7lvxbh2ui1l11fox0xbyt838miwo7qorbmqtbaxd5nmsd0m8jrxdi7erxo5q2x30ddh5zn8gs5urkjnzi45pjbqqbd6wgjb6o19hus9pr303zz5ew1xncqbvka',
                latitude: 681.66,
                longitude: 523.11,
                zoom: 84,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: 'ey4q3g0i',
                customCode: 'g3vcisduce',
                name: '1vb5t9rm5qo2sh9pws4enq6bj40q0zwmpu83mza7eyohci3vztsd7qt6hv3vdsabovpsy4ckuvjob3t7yp3cxiwe5uc2zok4bopbqsyur03oxw6unzq9mhydd00x8byo0tfiuhydsew5nb4jm6h6qr8nx1nm0vd3ldffpm637msjbzlmsmysn2zdaea18la478if0i0qezmtpkezervvu6j8klw8jlvquiu8u621l7ys5twet9owhcg9heud8mn',
                slug: 'faap3o6ywwfsxybkh8dsztlhgyn6w0q8j22vbxqm8fq3rlboczud7lyf55x1qozpnzlxos0seepnx003a75g783cbirxi6ou4ewf34qfwrfd4vfxxb0by9ejpk642ikk7qm4o9kawuc04s9iaq6g3172fjm2hp5qn8uchws4q59adf450xk3crhbuuot6iet1tocps2k9t7yd03obq7b94qtyhocz80e4f13jcrp25qe398npg8naep1kac4bcxv',
                latitude: 500.91,
                longitude: 932.24,
                zoom: 23,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Latitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: 'proseorn',
                customCode: 'js2tqtyo85',
                name: 'jq2rw5894nc2lfpnxh5lwo3j192fe8sn62om1dnyv2pk8v789cxw9iblczrbciytlzwmiegcb9cjsi0oto5jeictk05l0e05pev8o2ucokawwj69sf1yctesmhj7mqblvn6g540k1xw4tn1wlzj0zgl87tjxl5sphb22bzui4ek6mjvndnu6ekfyum0qvsolzcfta9rmk10vg4rgn12vk3gp66h1uhaebn75fb3404q7j8o41r27oipdl4obrgk',
                slug: 'fn7mz2xu6auf65iww3dgeucngatkhiym3zcma8qefxl60xs7qdu8miih8qm79nv0nlygfouniwaoam6ggukmzzmw2na60f39r5blk75iq0hl2gseutz08hni57its0arx8pl6p1gyi1s8etjldjjlvwiyu008sfj6vtktenb1aoz1041c3hntodxrm0b5rqskvx8kpex4rhmjsgayw0u1yfpwo0n5k3901ndxhghg6q7nn89jm4udfcg644akl5',
                latitude: 581.94,
                longitude: 29.18,
                zoom: 44,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Latitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Longitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: 'c6nwu6r0',
                customCode: 'a5bte4r8wj',
                name: '12689w4vvll6rtz0zkpj4qo62ygjpaoepc7x7361kimux0mrzduvokmb19w8aw14l4d4713x42y92idzshci5irh6vhdnjl4bh9a0ci78wj0g0dkbzq7jkleeat2otazyfvg7hg7t54uwdw5vx2kkbsgjhqll27iraa723wujjz72j9kkcqqa963g6nk2z1ty9qkrmy160o6jxsucztiskvjaelp5sf5nrxqrrsk4i1bez9p3aylqm89nz3lu74',
                slug: 'cka2fcbyr2uvwgsnp8g51ngv1vv1ac9k61uechtrwbu1nuq8l4cuvgev7s2qn3ewijo79y4ymxj3gz3iiw6iu8aj2ayd1xggpdp0y7xs8gqhgegmil3odvhho64sh2wfar6adwshwva7lq4rngimbjzsov1ubxavshapw9qrhv8pjb8jlhn1lw8cjhegq341lpbg46m62o10ahpfibwr95swjdbjvgf3lz5p330ruvhb2mdl6oke2jwcl3xm1b3',
                latitude: 538.65,
                longitude: 478.94,
                zoom: 90,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Longitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Zoom is too large, has a maximum length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: 'uai854jk',
                customCode: 'cw9l1mr6a9',
                name: 'f74h8wh0aptxeyqdn5bti8k8n6yrms0tiqnojiwon0pt2lv17vro05p18ccn3j3ml48k67lkg0h8wwik8upr54x7bhzd01q2z2o5k6lbv6904hgbrknolhlyp61ic4rvbvk26ka8wbocrxovgadmuksnvsk16oq8ls2caexlmxk9zd9nba41d4i7eoxleh0fw2kk5b6ndtkbisue62v7icmjfh021y7tmo56aedcq988e5vfrg4sqweicb19tci',
                slug: 'sy4c3pwpd4lqge7rvpt3yuzw122z01a25w3as6khq5ucdj4p8ksztd60sv21kn0ojt6q2s0iku26m72r6r9afdhx93jnedzw2wzxpm392kv0fhninhutlfus48jrd5a2k27w46h7q5y79zdkj0rmiqei1qed6kzh26dyx67qo63s4jw7ydtwp46ow47gwssso17up96xull1szqj2m540a3ieta0hsvbug2dunnh31wandf83go0ti1c5t9byyn',
                latitude: 466.56,
                longitude: 589.25,
                zoom: 809,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Zoom is too large, has a maximum length of 2');
            });
    });
    

    

    

    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Zoom must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: 'c0y2ymdt',
                customCode: 'tc7v4w3mye',
                name: 'q9sad0dbxoluetdvy0f6utaaoe3zzii6pi9od2iqwm8bid475u3p27mt46xc8vui14i5dc3nfw2acm0msb02u5k7xyt4nz0qiz99ase1sutjztnl4sy4mo91gppb77autxxzt5t9s002s2exj2fofdrhapdoaxt77oktm8cxlmfuc7dc39lpp348ne4gd1db9y170xsqedoch2wb0tvv9av0gbrkg6swamlp1xtuq01b7tmjbc1m06kbx2ugo2f',
                slug: 'wjxw8ibe7lwr0jrqh8i21o4evv3l55lc0f9p435ymh3zy6xz7rk1bubqjegdg4r9uqmdbm0vrgpfyc3cgpcy4no1y3cjfat6pgtu1f6cf746njf8bsectq47j9c19qpwpzxob8dggxnhkshvifke4zicpffpn915ltim3d8p7hne31ojhe31hucnrj38wsdrq9vxoa7txbxrdsqppqar3z0fa05l785bujdqordt10jewytw34bh4am93zdrzue',
                latitude: 851.18,
                longitude: 22.15,
                zoom: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel1Zoom must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    

    

    test(`/REST:POST admin/administrative-area-level-1`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: 'g9wll9jh',
                customCode: 'iiw0ssqycp',
                name: '6uvupohy1dpbbgnu1xeg1rjpm6fh8ugpjodl400iw4b93d7wbaxhjlrbv93e5n6bgl65jivqehdwdfvag6cl3ujawkygzwp9ka1bosxwwbcceo0nfh9sn1jkqhrrl1mol1ke2pqx8203cu9jmjq8injn42xyatwe3rmf68g3owlq4qao8nub66v16air8cilf1rn3p0cp7c488b7g7mlinolxqkxsfpmccyz8rkri9hajsupxhw5e5932kof2i0',
                slug: '8j887auv6gdykjwexeb1h4126tttob8c5dwh5s5hdfbkqvuocz7ppaiibps26hqekg9up2yh41lglr2b1fod1k8ll2wtapci70z8ly60soez0bh8q348hxk7j8vi9ihfqmffbt7ylmd96thw8r7ljtvjan72onmg19c7kybskggvu5lrsbywwwd1jvlqc3u1a4j2bu2v66hto9umsegf4fsefxf7hon22g5i08aki321fgfob8hemq89d3s7npj',
                latitude: 13.32,
                longitude: 610.08,
                zoom: 33,
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-areas-level-1/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-1/paginate')
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

    test(`/REST:GET admin/administrative-area-level-1 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '5e8a42e5-b8b4-4011-bbb1-d67416739b68'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-1`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5b6b5705-a8d1-4228-bc41-9b1ce055baa0'));
    });

    test(`/REST:GET admin/administrative-area-level-1/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/662e9ba5-a8a8-415d-87f8-153097a04cab')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-1/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/5b6b5705-a8d1-4228-bc41-9b1ce055baa0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5b6b5705-a8d1-4228-bc41-9b1ce055baa0'));
    });

    test(`/REST:GET admin/administrative-areas-level-1`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-1')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/administrative-area-level-1 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a83329c5-6aec-4dc3-899c-021f7025e90b',
                countryCommonId: 'c3d11b52-81c7-408d-b95e-8238f7a1ce16',
                code: '6sxmhrag',
                customCode: 'lvbtkw7892',
                name: 'jlivdyfpyqwdkn52k90ztj8hdp503p29c9m4tie54f3x96c7zmdpum9991f64y0oc9xkieyam051gvhrsck2iz6g1ldvka6vojs0w05nzjbi06870oc77oq6bltri2lgst3tuaglkkm26uqa9wk8t3op0x1dkf91bfqphbf4xv5ygy187jrc6l1ga32p1239m4hxkg96dx3wnt4cxmz6kh09l0elbu5vw9grmh7f2sa3lb9m04kdghpf6apbvc5',
                slug: 'veuytzd2gfdsr3qlq7gg5czu2vkq9afwyl46q263yxgi0v7wf5sansfntlpifcghdekkkswiz4sqbwkvyw9uwfsbyxyzyopptr3ubqk11h6a7kw4k5i7bqno9ccnl8t5w5pscktey1vfn50zovoll9n4qobybygjokq7l662zhfl2nt1gyahqdntegp1xs1n3lljqe3udt5lagjgikpvwzyr61cjfbqkfoilud8xmpehpvaekd9wj1erbjx7l93',
                latitude: 792.16,
                longitude: 330.99,
                zoom: 40,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-1`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                
                id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                code: 'ue1hnp9l',
                customCode: 'smxvbhkc4i',
                name: 'ghtgcgxyddxf5zqclyhqjiju52jh4y4eq1eqbqib5at5tz44m1nmkdvx5i7xn8w3cg0pwe3nnekv5gjfbu4kfd9vcao2nb7rvnaq5elaqep1z7kmjj22x96eajh8vf841vq2aer52bsl3k9jwl4d32lj59nshkhi7d649akw00qfkop69by07cn5lyt3prbjvaxljyd8igfznc9faonw4zo8awi71x36y3qvkx3c41fgyjrgtgfo418w90ta8iw',
                slug: 'bos6sa1jrh4gi6ogho31aa4to7btnx6a2bri79rrg1n5h697700xpem0l974uux6fk3rvcg48zt6yaghk881xuw37ytz5s37ck151frmugvbof4ef0f0gcv3339ix1s7p3ql4hxy1lx56setv9o6n6fvx57xcvr7jkgo530hwgtm4xw9bfc545l609lyd7vs8w4jgzeaawmqqj0ke9pu5sbhi7gf2a9vmq3uvdgqii2rrhjhqcm6a5x6dpzla70',
                latitude: 808.70,
                longitude: 263.48,
                zoom: 63,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5b6b5705-a8d1-4228-bc41-9b1ce055baa0'));
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/9a9f0367-ad93-4bbd-89ce-6d5624316d7c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/5b6b5705-a8d1-4228-bc41-9b1ce055baa0')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel1 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel1Input!)
                    {
                        adminCreateAdministrativeAreaLevel1 (payload:$payload)
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

    test(`/GraphQL adminCreateAdministrativeAreaLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel1Input!)
                    {
                        adminCreateAdministrativeAreaLevel1 (payload:$payload)
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
                        id: '667dbe0f-85e5-4ba5-aa4f-b4067ec93f08',
                        countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                        code: 'fesihkyt',
                        customCode: 'p1d0jg0iva',
                        name: 'ufljzfspillsn497xn6574gwmoniw5781l9ifu6nsolbe2kz82r8pvxytuxvx5kwigibqytgx91quig7v0252lsnsdel7lz0efywbb33ej5ke7a3pywdf017ulpwan0frzo6sasntowgdzg60r2wqi70aysamqrhysr456gewrsa7es2dow8auknl6p74upsgdoxvz5qgx42p0e7a48nsyakp10efy0pvbroqv5ckimjk2iav367k6599nk64rr',
                        slug: 'xhrr7oyibbf86eodjksqs4ehhapl0102yb7q66a4j9xxu7c0lfxgaxohzw4k5ug5trvnl67r4oqryg7snd802qx17w15rvlouw60zv7vaxhjy06ioelqej3ldc4zs6auz5u8e4x44gs19t1jmcp2p8bfm00yah844zcplh0ljylxkv5fcruj2yaj29nke306xlmkxieodi7jjlmsoieot3v5179j68ija3yokxw6rpej3kq7ahsobtcbwuml91u',
                        latitude: 124.74,
                        longitude: 527.90,
                        zoom: 65,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel1).toHaveProperty('id', '667dbe0f-85e5-4ba5-aa4f-b4067ec93f08');
            });
    });

    test(`/GraphQL adminPaginateAdministrativeAreasLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAdministrativeAreasLevel1 (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel1 (query:$query)
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
                            id: 'e3b62123-c75d-4e13-8b70-6a2412f3c1dc'
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

    test(`/GraphQL adminFindAdministrativeAreaLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel1 (query:$query)
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
                            id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1.id).toStrictEqual('5b6b5705-a8d1-4228-bc41-9b1ce055baa0');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel1ById (id:$id)
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
                    id: 'a93ddc84-0bd6-4102-b45a-751a61a8ce76'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1ById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel1ById (id:$id)
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
                    id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1ById.id).toStrictEqual('5b6b5705-a8d1-4228-bc41-9b1ce055baa0');
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAdministrativeAreasLevel1 (query:$query)
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
                for (const [index, value] of res.body.data.adminGetAdministrativeAreasLevel1.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAdministrativeAreaLevel1 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel1Input!)
                    {
                        adminUpdateAdministrativeAreaLevel1 (payload:$payload)
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
                        
                        id: 'f21e674f-b0c0-4566-8a67-9cb098efca8d',
                        countryCommonId: '940d02a3-a67b-4cc2-a0b7-b9f0ed4d3bd3',
                        code: 'zs9otqsq',
                        customCode: 'u8xqo6r4tk',
                        name: 'ytihx74osban6ivkwntcmyfrwed3ry7jwr5bdho4y324jxgdtw7c9rp7m1kwfx0pjxnpsyqtq9alygx8rhyfbckzfo13fueyqthg3ok9a0xhk7gw4xsnhtfdz0uirijnpuzw16b9ujf5mmpzyrdx9yjznb7apjkbxtp5qmi6wxpr9elfqasla130r6d1buk64gt0zddsz256oxcav6i9v89wcv42h9a9i48ya6rljpzyq4dmsv1znpp02m0fol8',
                        slug: 'fn0nhm5fhsw2dj1w13nunpvluck9n7lgapcy10giv65v7wgcaeh6expzafs6m26ia848kf8gks3z6td1pis3qbeqpv9ofiogkai5guv2pa2o6rt1ion5dvxtkbr9xt2vhuz9o9iymo8yla47m2dk8kx2yj5rvrjnavsym6ygnj8a26xiaficel154ozpvbxx57dnsuft9tkqgbpy29b1bg30jgofvnmozmohdcr2ok0hgmu5psgi459lrkykl05',
                        latitude: 817.88,
                        longitude: 953.58,
                        zoom: 14,
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

    test(`/GraphQL adminUpdateAdministrativeAreaLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel1Input!)
                    {
                        adminUpdateAdministrativeAreaLevel1 (payload:$payload)
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
                        
                        id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0',
                        countryCommonId: '358d15b6-baad-4828-96fa-9a2c98e6ed1f',
                        code: '3evonirb',
                        customCode: '996jety8wn',
                        name: 'd9y536e862fnoesz8tlrw234lz4hrcvnknxsxjm60vfgiintja8vi1ep0lo3x6xr24jh17jqoio1kbtg8bnenqstci2wwehigv1eir17hsli2llvsdwrc84j250rh2dod4gc9o9f69e5z3f5tey6uq32ohlezqv7d7v7kr78nxowbrreflwkfoee23tlgkcfeoj6mw4bv9p9kw9z4h0awmkop4malzx8w7bb14dfedmsb0er5jg9yznwrs3m8n0',
                        slug: 's5uun5wlgyhhu2twenho9oqnld0elj90lbuhgqsi35ptzded24f6t46iio42rb0aslgm5sg3vmavddbz1ia8cccvxz4upcxy8rulmqvbeirnl3uffoik1shpdechk4bgk7ck565n5hmk4gcyhxfsgonen9zedpmq1oet7t37agledi0uobi77775vyjgmzgrv1h91qsk489xxyonge3f9abdo7om151sty24oz4lh8766r69niwzuz0u8yphjyu',
                        latitude: 806.55,
                        longitude: 913.94,
                        zoom: 22,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel1.id).toStrictEqual('5b6b5705-a8d1-4228-bc41-9b1ce055baa0');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel1ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel1ById (id:$id)
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
                    id: '2e16e3b5-b9bc-4264-abcb-2b725400bcb4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel1ById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel1ById (id:$id)
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
                    id: '5b6b5705-a8d1-4228-bc41-9b1ce055baa0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel1ById.id).toStrictEqual('5b6b5705-a8d1-4228-bc41-9b1ce055baa0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});