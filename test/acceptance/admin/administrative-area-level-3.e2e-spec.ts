import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel3Repository } from '@hades/admin/administrative-area-level-3/domain/administrative-area-level-3.repository';
import { MockAdministrativeAreaLevel3Repository } from '@hades/admin/administrative-area-level-3/infrastructure/mock/mock-administrative-area-level-3.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('administrative-area-level-3', () =>
{
    let app: INestApplication;
    let repository: MockAdministrativeAreaLevel3Repository;

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
            .overrideProvider(IAdministrativeAreaLevel3Repository)
            .useClass(MockAdministrativeAreaLevel3Repository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAdministrativeAreaLevel3Repository>module.get<IAdministrativeAreaLevel3Repository>(IAdministrativeAreaLevel3Repository);

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Id property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: null,
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 'zmcx2ie5',
                customCode: 'qy12l70jzv',
                name: 'qyujvkbx2jnzu7dd4xrb8p9tz2snyov5u9n1rrq1rpj3ik0l4q7axjzfgtv4dvx4a1heerf73uw45eep6rg41wx6oc39aomwi18b2rvyxzkh6zwey6wmuft132rsytnzz9dast2du4ppnrqg829vne5zmmyq5o2ish1w8r6k8p2e0yp10mpbrcknlcsoxcbfab4umi1x8gpz36id2qzryrpyjh7fz7c2zaa3jkt7x31nlr7oa8gip7obj0tm0yw',
                slug: '8xci0iavn4zaywhkbmlsuydml90qm1lpxuya115wtilk1xx15jyoaismuag2ne43igfxltutibau6g3jaeedgpm05q8s4yd0eqngh1hid7xdagzc1dpsa2xrc9qers13m00od4x58b9vcsrw1e0v4vbfcpm28dn6mkznsic3lrclm3tyu3yw2g9zddh8d34uo3370cx4fgnsmzhz50ev0mi2rrrqfwt0h0ojybhc2hp9axbnhmi22x0m9vemsux',
                latitude: 701.40,
                longitude: 680.01,
                zoom: 88,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Id property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 'zw4vuhwf',
                customCode: 'b8a9h4gi08',
                name: '2iuf35j2ms5re9chqj4622cjpjndaqxzvj5vukmvcdjlw9po5g22vdovllmm095m5uftqva84oqqqey8hp8ld979xuonju8ps2wvj66u040jn7nsuhrdkmzjrkhdv66qgo0hlet6cjmh3k5fpqdggeeomtehbeh8ugmpv8uz30a5vubz9ctjdhqnegmu2pszp1l1zfmafq7muo8j12edlrpou2i6pm2tfe3cq3os1ej4h1adh01cirdjxbze0re',
                slug: 'nexvk4vd8pjd31k77bpdvd6y3wc39z8r17quzd21zc2pu6k61tj4m3mleh989dlroqoeapbog62ye42tetilx7f5inypl784oeptmchln0qgcuwr65bkm5gr7ihwp8au0h57dwnjpb5iqtekgm3xvjmhyo5d4frya0uvy8r2blibitgbk29npkednjbw4s2jc6b3nzc2jl28s5aprjruujrgwcegyqg6rgix5kagik8lliuk2w5rrvwunq8874y',
                latitude: 733.25,
                longitude: 119.09,
                zoom: 44,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: null,
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 'p10bdfr8',
                customCode: 'keks0yqivi',
                name: 'wguwpz43rcwbtsqqhqvehqzc63k2bn78a409t8qragjeurxsp2xdciv4vmydgmrw907lpjv8r0unbfffpwml4mg4bhd2c8haw2aym3q0olbe3ec0g41eprar5a3yh6uo8n0wjreaou1vo7os6hg54vjzbkz5cood1922wp0un4vjvcvw1wszdz01jjo2so08yy5j0c4l4g2ddalaivui2p8ulxijdkzx7ptw39d5g7ba2rgn0sarbivqeom0g6w',
                slug: 'c265723f83cl7z1lccdo6obe81kvkanpq2f4vxm7h002pdhutb86jqlr63uokyxjseegrmd6bp1grjhwjxgsjzvy3zihwxkptglqcq5jtrke2qmfb92bo4zhc00ixsh9tgy00wzvanx3ia4ez2hv78y5pfe4fmj06gxld8tqyha6865xzcp058y57iagb89bqpl0e0gvsfghopxbigv4t7s6yyfqm2n2zxnidff6hguhkb18p3fec0iasszi2da',
                latitude: 757.10,
                longitude: 958.85,
                zoom: 34,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: '9bfr8ii8',
                customCode: 'q4oomxw9zf',
                name: 'nq3dihhnct9ixy8ivxnq0mm63mlrc7d0m3088u0ymcpyaiz8r26a09crj1wglt9f1xdju18533gi7an5o8hduykrie1n90v8lnibgu8nnv0oydv7b1yfxow1cs5yxf3eusxmjbd9cj1ufjh47em6l6oxqo3x7cnwn4vpa3o54e1zsery5kozjfb7iicxh6yv20iujj25njyf1m4xc57nd1m5qnpzopn8rt1ittq47d3pm2vrpi9hlxvr70ezlx8',
                slug: 'slwor96msyangyp3lpply3qypk4j0kugq5ij5onm9b8zxtic4rwdemmpgp8et1lbsydi333sg7spqz6y82scjk1xd49uw0ctiwuae2fofn4z9tsi4gbpudcep5grybe9nvs8k652asuagjztimme4dwvftd7x9g833nc31pbyg0a7awrk1spmi2386f8spuwqyz5in5drm6psin6sef7z59bup281c4wzog4q62oebrrbwh8d9zuiasvblwx4p3',
                latitude: 333.31,
                longitude: 513.43,
                zoom: 99,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: null,
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 'luyjrxdh',
                customCode: 'cu51ddwuu5',
                name: 'f14wzl5p5w0dny5woxbn0i8rgpzk3ql65gqugbyuo7hos90ze10xxpvpmvg1z4gwlkb6usd3vath02gkov7pr2igwn6zklun9ix4ld0o00995j3b4t1ct2bhlxup4olppogvbmn0wfkvxnw3c50xfch73rrajzcakx2glgsbizz5g9m73v6osjsl3sj2ab630v2zus3psxihljtahvs0puxc5m5xcwetzvxf8r5luebjrt0btj8pzwkpt30zauv',
                slug: '15jdunyzvfqq9b2tt6crask16366b96s8ewe6w7w1fadgpg0k8itbmq4l4uclyjwe8ni7701bx80wzqspfue91hkey9561b9k27bkm152enkeugye65ba75uqhepwpc2d0rspyfuln0lgvarssfnc6lv1sfzxxxwi2olzoer44utzhps2jnuhfbzrc5q35s94ri3tlilogll8shpu3pfqhm51jsf2j7x457jse31942r5pp5atgsax8mixam6be',
                latitude: 932.88,
                longitude: 371.20,
                zoom: 87,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 'rplo5q6j',
                customCode: 'b2iuv7jvhh',
                name: 'l45ljqe2y19v5h5jrxjanonxu81ti1ii9pg9zljs8sux9ltvdfer6pjromw4x4vuhikwns4jaxksvsamsihv5zw5ofgf5w8zlyf827v7tynjg3yzijpohii2chootz7nbijhfwhfwx7sbn97j8z282ekegxsddr6uunn20ou4vrvhbijx1uih2i4f89h4nye3qatljgudx1he6radtaegltfjltflwl474iajcu3l1rhd21tdalljvbjm6jsqvm',
                slug: 'htwag9gemkrmczavfv9q4f8okid4fckeon45ppicjl7r4rejy55wxjauvlsyf6dan6qf11sqv70a60theu7rwp8xznl4cxschnc1c5tgi0hpmt0ducc1ap2na17rka2uas9zdwlqwmbbkv8uyvjw8uh1s00do3fuvff5ksoe6j1369gllosv6lslzipmd5kl6apjbxxhb7uk9dhogvoszol4e7mv9d4i7oifx19niyl1znx3u3pkaetxygt0pdv',
                latitude: 2.85,
                longitude: 96.25,
                zoom: 12,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: null,
                code: 'dfvu3rjc',
                customCode: '5e9fusxvfh',
                name: '2t3hbrwetvyysu0k6sa51ikmmrqtbgdy2xh7sohve4icn6zunjxmuznxsmxa6ir5ofamt2cz4yeuvfplcelwus501bwasyqsvx40znwxcc26ft9mspuvlb3vijnidbef6act0kqnln2yrzd0luqa26x63b5al28lwy1twc9uq5y99qy6uw3xz4zygnn1kq8s29r7e5295nd7fagkvjq9h95kbfgmnsclsbph8cbkdi17kztxds0u0fqeidhqh18',
                slug: 'j86f7cuhe2i3ugctuxtcdvxgaxhb0vxiib3hdsmlmmqy1f4g3nlzlq698yarccreo7kdjkruj6tjxc0b23hitvg44mr5iysbjnhb16ahj5j31prf8784z0ukvei623qptf0pbj7b8ahxeafmbs4skuvmszucmacr4h7rbyywmw2hnv4uwkoo1w1oghvlf7zw6kfyks8uuc8sssbe6ki7iqx66akjzr3lfjoweq6zvm7oro35ma626i2e98zbmsm',
                latitude: 435.16,
                longitude: 89.67,
                zoom: 22,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                
                code: '3xp3f6f3',
                customCode: 'ei8rc1k20u',
                name: 'xe4uiywt5s5u3gzgxb4dbt2fob035kqg4d4kalck8nklk2w8t3eig5rcw89zecbp4wc9e8okht864rhyqlodn2zi5t535p4620bi1e8s74x5nc75a7ofkuue9nxfy7vao7rq1n46ovrqptrc0v66bb80gvam88rygg3c31poidyxmbtytpn7w8xm4pjih2cx5ochjp7nqeh7vq1qc33aiboywz1ixxfalllb4hxvr0ufahqi5zhl3mqsjrfzqra',
                slug: '22nadzfgihc0gm0yysct75tdcu8ndpx5qgtn8im0bv5mj7kd8m87wrc2vk2hj7fnj3ux33uwrnzvogaiats4v28u7qo8myxn7gk0h9qphi3bdyje5wi1chva61dtcnup5xix2ehwrsx36078pcb3uwj11ph8szfpz857s5tsjlg3zinb9ir4u70l2o7u8inbvhhaq1i1b4jy6tzbw5haml691l3o0puedg5woolo98d99ac6gargvtyh6y8finu',
                latitude: 615.33,
                longitude: 745.82,
                zoom: 22,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Code property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: null,
                customCode: 'k39rknvvf9',
                name: 'g7i6hyeycznvrftbouevncetcuzlssd2vkj00mkt8ld700eri4oc6a0za6p10b89mwewa3vywpbb9ye3yaopohrtcflia9wwrc70velykdzzq4257up6pa66obs12kf0myfcsenuu1nmn8ldb7p4yitp2xx9nt68aab2fr96wzrgll43olaj0j5giky3y9m3uz695svecw4ct0rs3rpaxhfzeixtbghaafmjr5crbwdupsaf23ft2z00itmys3n',
                slug: 'yqic658ud5g7lu3fg1l2i0qyhjwjf3lkay7jadbh8m4g48a0dj5v19ona4bnbq473z5rudgujvehxzdhwjbr92zw411ob000no6u20cf3rlmlk84zx6z4wqdpgahpkj45f9ysknsbvbwjmlyffuc694zu1z2jvhnww4cyc9n7nu2btqratut8mjsokq50namlbaufsbevrmpc1ilqvicfuuvaurfje43t6v29vtw7ntusho47tmeh3p2du6t1fi',
                latitude: 755.74,
                longitude: 258.96,
                zoom: 76,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Code property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                
                customCode: '0385287wp0',
                name: 'f88loo4ppbquux6ighksib70fl6b8in7ug27ljweutd0s7xfanx58xq02spwtcj0ldvyp8dk8yry9pajt3q8ws97g5a0n2ajeqmcjt7p2zpjiob8anmawt861k5wui45t3wx699eh9pnpiudvqdoi69yprluj8d2csdnludgot8sh5alfl53s1waiceyq1gkg306k148ym1ooxhg180euzbndtjafnh0j42ns7wekwtflwow8px1b6rg15mrc03',
                slug: 'o21042cutrwzmk86zr2a7buyixxu606cypxs93zwkjxyiocxasqr2rg1us6pxib8uy8ggc05wn1l1fn2ba94scr6e2mj6jdlsva6vbnmdd7y0pjrkxhirnt871dpg65jvxsw9ej0b9vh0bdak3bibw7lzfwg9le1fv5goa4sca5cm6o3vxp0epjd11qpflmsoauwkan59avhsiy1y7ehba2e3qbkgp91xed4yan9icvnqaux48ym8i8pvosch77',
                latitude: 349.30,
                longitude: 750.21,
                zoom: 67,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Name property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 'crw15sxd',
                customCode: '77yo9govyl',
                name: null,
                slug: 'n68nnfcrpd1nt0x9hrw31n9jejdheaeuqhk8x3ifksealqnei1lw9o5tqw0y4gekfgbaj4jklm993m3hlcvwjqxye8xukvg1glu9dt438ibl3a7i4o66ogybgli17l21rmggkzra8lhn8pnizy3ens98rp64zewqdd10jin3oqw31ca4sm4y5stcxnfuqwb7igscxxnb2frpozzb57atsdg5snjj176mdkn3im4wawygmfy6meoac3lbbtfs796',
                latitude: 489.64,
                longitude: 970.30,
                zoom: 47,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Name property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 'p1srj1z7',
                customCode: '0dhkwuyyk5',
                
                slug: 'g0tfu1rwicyqpnznynfps4jqz0fizceo92x5silwto10n3rf52to3kmhyxqo3ckp1nekgr9hxv1deo14ydleopcgzd6k2fclegu36ntnz4mjf886f6uul0vylsn6zp25pyajktywgi98qtyxoctt3330rikhqg7ebb0zeroqk8kk8qbyhq4aa0t5g2rsf166egxmfh3knwhvbwssefvaii1qcr5w7gzsk04tvmmp2l61rx4vmrjo2axwuiqi2ta',
                latitude: 718.73,
                longitude: 105.13,
                zoom: 10,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Slug property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 'pgxhdxsa',
                customCode: '4636xmu8xd',
                name: 'qv195nm5g73kn2cnp1uddn72z8mf7n8hecn6fr4f9p7bak6jhx5zyo9qt0mzcs8ira0qe8q622riqww5fo8jwbij1n6tvi0zvvx2f6a0425hib1f290htjh78mzkjp933dp13v83752cqv7ay2sn5iekcrg5wfz2tf8vm8bl3bur4nnp12rtkmnnlytqehua2l10h11kq6o4cgxodz8mk1prc27kg8k3d8ar94yl2syg81pal2eb038rl0mt390',
                slug: null,
                latitude: 777.45,
                longitude: 904.68,
                zoom: 84,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Slug property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 'ijeen4ic',
                customCode: 'swr3usthqq',
                name: 'fyq41byw28bm0uu3x4k8wlsubb9hsx11t2c6p6w2w85n9jgwtvs2is3950fsg74qunosl6xj3g0bx4oobadg7q9nwfz3qs16lb5oaj4q9ejsh16drbjuhq9muqjxgm95ptkcs3fb1b1awnwe6126p613h5xwhvh2fdryngduojikacxoj111ohyicjwi8hzrgyt01e4waexkhagu9mdunvwtwtfc3ej7wkykwyp684xz407gy078v3do4tom9x1',
                
                latitude: 126.43,
                longitude: 476.20,
                zoom: 22,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Slug must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: 'sxd2wb2gih7xy2xw3jlvpwq6vzwo7sn3lk886',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 'j966gxlk',
                customCode: 'q44t6y91ut',
                name: 'gzw8kx1rsvukqf7lu3fvvkbm249e3smp3jgxakw400obrs6w178192vgsf4jijz94fo1k1evgg6wzx8w19euzxure7xlimmlgbujj05hzioe0icc5qnzkdf854yfp8e7xqeuyz098axgyl2lg9qtld6k6zlsnqjjfi6asgll4gzp1rusfcwljwuly0u52mlsebq739xr377ycstf1gb21mkdg1pg7mllwtrw5cqfco6vd55lom0i6cetnbtbhxt',
                slug: '1k7n3o08dnksfch5pjcg2gzyl7dsx2iwvfuy46yb8zudy0zkr8mf9qjhcuj51j0mifmw4px1k1c8np6syhvex3he578kktod6q8ho9ookl3nozzn7kivhbffjl3eistgm49wqy5dosnajn52piqc0w0mg9gk1a4fdwq7wv2bu47bgy4iynzh6l1y3ndejrat1w0dxfcjqpshcokzsc7nqxvmdc70x9617i914aunyubq3aq0bek2kscpzk1k7hn',
                latitude: 741.91,
                longitude: 484.66,
                zoom: 84,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Id is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CountryCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: 'us6654ivocswelqxnvktxzjolgddj8ugpsapp',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 'e5d57oce',
                customCode: 'tlr69jnii8',
                name: 'zpveg8o9afgq4c5pqalamof32s3574ugsthzg8wo32shkai4znvh2v5e4g2yztgmptbeygzx4tujmgu1dtkkeww20vnzi3mfwwqa6husrutm314tbsz1yfibd2se4e41miy26c373lzqeqvt5gcqrev2t35y0ow8mo0va0z7yp3ar8gm85dkh1z89gjxm4k4dy2fa39ofttg4c147dsh22i1cg3d64qf2u20ks345jdmc39d5n900bu218gtv0z',
                slug: 'ubm5r935fn1ga1uizxvz3r9fdqeulaea0rejb5xbzhxx1sryc44xypsluhbpwt0f013laevydpqzb7qw7skwz3cym0jqnx9pbek4zngigmycnbgmxfmp9jxf6z7wq4ueq3pmkc3twk5m03dj473qn70ztrvckguu5z0rbq3oe2n5jxejm45ivdxwalgsckgy4192ft6ut7sj21yefnf8f8tepr2l6bgsqdx3jnhjgr3j110s18w3lzvubs49ovh',
                latitude: 966.32,
                longitude: 284.33,
                zoom: 53,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CountryCommonId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '4sm0veuawggqz6nynopkgm3srlfed3z3lyk1k',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 'ieh1vilh',
                customCode: 'gq2euf9g1g',
                name: 'bcucjerj2i8eqdjxu11p1ubehc2uokrk5l3c4cspaggb486kgwoj5sptax8q7cgx2yvql7h9kgtvaogyqkgdza20oflz85608v4muw2yarcub69wwacprf73gh7vdz7tdhhilg0ji2cj0ij8gmge1p2428y3bbg9zaibr6haw246x69e8ichjdyodfgdoisw0m9for39m57v4gbcpca3umqpm3ttkodp2dfg1h9emkfmg1s7ceyp5yh4aooaffg',
                slug: 'jnhpkjqnw5g5dqcyzifk8fshldsfa2kdgo9o3y88m6uujls75kexw0bd7eicsb2w1fg90ddayx6ut053ulbbthyzjy3bcgjrnybubmxqnzq9se76ei6wkep95d3qa3fhq8wrkgyw83yjmespzjtulgz872iyt0nh0ya59amiqdt1vwg2w938dpyccfi4o6j60j66spp7rd4eadkgtqyu2ok2gfpwisu6v1e29g2q4ucnm36al4vmag70ln6ezq0',
                latitude: 826.39,
                longitude: 453.07,
                zoom: 81,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3AdministrativeAreaLevel2Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'im0cahg937gkgun8w4rn2tlv03oi81ys3ccbu',
                code: 'wofpk7lu',
                customCode: 'rcsykwymk4',
                name: 'g4sq6glhir5qfplmj8payuksn6t6yjvl3b7v9h3jzm5ll311yv7wjckp5sjo5ankj80aha3m85zpbfary5eg6ns30znargc9lxv0if3xw0igkyakbydboaxri122e98nzmfderlw0et1xpxll4nqbqponr0k5f0iu88zn370ai0g0qnhv6kbf04y4enasz3xis471qx807j6x423jt3nkc4wos7c00whicebu4qdm1snzx5dts3m6w243bfm4iu',
                slug: 'ox28ruufrexccr979oqz70ttb57uauf5z56weffhpzzayh0yij2oywx1z85rsuadjc0bu2bk9ygyjj7vm17s8epit5afw0f4tzfjusa6mk0ski717udp6yxhvwptzv8ksw6eki3p4xt228clo398urc2hmy9ppy2euv9zv7m0hej0ka8i8xe90akyf8gehyovs2d4c484rlahxk7td205v2uax9e5z8jj43shxrbudyx06z9hgpszbfu91jsr0t',
                latitude: 104.14,
                longitude: 396.96,
                zoom: 18,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3AdministrativeAreaLevel2Id is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Code is too large, has a maximum length of 8`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 'nw3t1k768',
                customCode: '9us8nn7cyn',
                name: 'dpgevqcuf1z1ljeu7rxmwl5ts4jht1l8b3nbek5ox92u4bszr9ve721b9k6f5bawab8bokjn8ajwf675edlkxm80sqo5j6pgtdb7rkape036b2rp7rdl514wk4mykp3twejpg8wr6dtg05cl1wll8utkf8vaq2tbobl93zk6socriy01kc0yfe7jfmevf8kui9y6b6xvw0mba0ch8ajind3hkymhfvama3hc525o8j5xqi5nrmoml4hkw5u4kuy',
                slug: '5d85tzi5x9nqqfb0a8ff8xw20lij8eap79zuk66axkeddlt9t9gth0sc6u7c7y4h9e9w351r6i5gvazfty1uwksdgtv2w2ce1a7wxfr2mqg21tmdpgbq58nw15mjwalobg3dvcparavfc8cfq45ec4h4oyo49cowl4qw3p7yz9p8i3mplpu4cewf99d50d9soim7ynygi7kmlcsjh1e8ar0dt13inwt3c77bemx78mvlj8uwmnohgz8ozwjx3d9',
                latitude: 106.02,
                longitude: 128.21,
                zoom: 72,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Code is too large, has a maximum length of 8');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3CustomCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: '6nohkbqz',
                customCode: 'tfi66e8tj72',
                name: 'rv55j8j47m1ewb0dmk73dmd1lhjod83b4p9jmvkihc3gic5o1ic6f30s055060hr6u2c99gjl9xp1ft76msbpetdhirw8uzf0962jqpqiwj1p754s9mjwqqilzkxusxgwoyhhe5hhxohjq351di77sw3c3ykboinmknk554crcj4pv0s10j1oa4r6gnffy974sfhythtkfovzcvwb1bars7tucvddwqglhiujzteckwb0fmwbsbagto4c76qmri',
                slug: '7vvgnrg0l4lk6kzshdzjub868tiq733sh1x3o5lsy29johvpqs3bp8gu1ncuv6fswj1hqcy4l494iyrz1cxr879uwwd5z3rysgj3jh19bfjr3blhkws39hv2gmr9hddduncp78src7qj5n2oqi4jn2gq25u1ruq6bg25rjqm0u9sq5dv8tigynm2sxpuww6skd7nut14x0i45oa3x31frhjmv4okzln0s3gtvdpzdz7k2r6ioqtt98k0cmeiktp',
                latitude: 545.22,
                longitude: 515.67,
                zoom: 76,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3CustomCode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Name is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 'd2sf8918',
                customCode: '0x7a9pzyxe',
                name: 'd0kngwjzzqxstyhufe60jstw2ohqklec4t2pph9qt5v6ggl0xj0gc1qycug7tmy3hgugnb8owusv1xpe1egvfi9z535wv14rekvo9g810po2oikdfl22agekxeppze298lndv4tfafeksrptujbwwan85sxk7pfly1ebzcg51ksvoqsvotn62a09g327htwzc5rb7qna2vnze7u1pljrybct1hepzhz7c4u2ak96yqpeldif7au5p237p7i0tc2n',
                slug: 'kg215p0ovcb9wb7w24bfm1nxsxzpuss2njjgqy66ieot2w4eo7huqq9vl8mgult8gwpl9tpwk8iiic6zv8nmotjz8gwchkx8ouj4qcemkz6ky1hhasu3t4g70jxan0na5qysmwm8gq657d9ptmjmz3ri9o8ecooeuolfdgm2huv3x4f7dnycsgnzd60etpu6wtgwiwxa7yzfgd4os1eci2bwspzr12lss30ruv9cbnlcwgoj4rm2h0agngi3rb8',
                latitude: 693.97,
                longitude: 976.96,
                zoom: 14,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Name is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Slug is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 'ftqlf0gu',
                customCode: 'kdnomh9gxi',
                name: '13d47hwjo4egfke21tvl66x0z6wh9bl9vse71jpqovjokcbwxkhqskmdqa4jvfowhrk8ie2qsn896rix45ie3wnqof1zcatev7l6yygkggk2vlv1e557rxizueoo93q6hr5lgcx2ixsbqognlwiagcofan1d7hq8k4tagnbx2iiltaswf7m6zoo9qzazas131fjdqitqcg368b18p3l66hmmdwpk443xeiiyekcytpd6ms2t3iqpmia5netqmxa',
                slug: '4dhxaypjzvhq53xa2hb9qyxv219p0su4vyvjw8933o483hlrsqaj08gqkvjkgcnc5wwrtv6c7bq9le5fgwrj58nmbf7mstyca25utx42gyl6mwpif8unthbxrpna1y3qje60twq1tfqkrfsninylsyxwyft9a4xaxqk2bmpi2gbn097sxqazxxgokeekcyxnmlq9bpmg6sa34vn64vid3e9xre1wrz5d5l7z73igihrbl9rq0b6gyo3i34gxgqc1',
                latitude: 931.40,
                longitude: 719.13,
                zoom: 55,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Slug is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Latitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: '7t7l31um',
                customCode: 'm2xc075z0f',
                name: 'rkzu33ndalkr0d9ulop9ft7ay6zv5waihwtf31xnq3lyey2xa13nzyo5j7lfx3b6c2jrfc22z4njpdo1z51wbactjx4x67j6ht26qu0mmiwhn6r6t8uop6x96676w7npz510npp9nv1n3aazxpmu2xk0itytr5ovvhdz2o3xy986nhp2winm8noj44neiw4zzxm24e0sprrw7trthugqctqakbqototnl2h808egm639r339shn5cd4ziv95n6y',
                slug: 'vl0683fdavky56xs520dtlvmekkjsr2qcwlmb69x9gm11794vum0hi71n2gs2usd8yobzsbtl61qobfb9boqff179obxyurzche0g1bn3agw47w1e61wpj2037talusdpzdhhjf4g16s327df57oczhbkg2cc9ejv9w600qyiigqpiv26imn0cg24kti0bywyh97ef7cgkdo3xwpx1cni93vv4ffm44z3ggr0n7roa586lssm2gdm4kku12giwl',
                latitude: 267.71,
                longitude: 336.59,
                zoom: 96,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Latitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Longitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: '6ux5jkt5',
                customCode: 'aja9tcye40',
                name: 'fxio2rep1fbt35xgu0xx5dhi3miqwmk0h3utf8l3er208jdjow89gdlq68rwjpvam4tm0x12k3n0u5ctvjbcmui3k2kyxcb4jjgaaggl6c4yzrmpdyjgnq395ux7p4d7mdgtpw7x6egy0afeoy29w3lowo1i29abeb9s7pb76lpmddme3hg34kv49quxtcuym8mjcy0bcc4kq9v1cn6fiasxcuww14ohnyl71rtmvrxdx1q0qxuevmxxrapix76',
                slug: 'w7p79njh6bszaa0gzsju4uq5kbn7zbcff9ernjg0m1f7brne2ye197e9o4afwqu8ruwygwq1rm7w4yck9glh4400jgcf4q4j4j7gyaln5lftf3l4ls6wn2ipb452y9r1zfe8gvjmfq7s75m6ndda61zet285fskgsm0ylq4udgn7clg2b6ep4l0n649kqax3486bk0g4i789nbzgd5vpi8haiabgcpcg3nl1ay1hbp8d6omvdoiues1so4hpw4m',
                latitude: 156.73,
                longitude: 227.55,
                zoom: 67,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Longitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Zoom is too large, has a maximum length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 'a69mlv2n',
                customCode: 'iwcqaf6aah',
                name: 'zukwtrjgju53a6x5j17skh15530ts8oefs8wdkcguu71xswf5588wg4f7j3bzg0fsha47ztq0tqgb0nyolpyn6tywvxc8c4ccw9xsyb5or5hhvoxfy3tndmvoy34bqxwzhpmcq0udl7axohcp83x86vxnox4isbmk94hrrsro3egx29xivr7ir1uggcnt71sd0pjcx0xlkzxyb97wj8wedtlbi7t2x06tc2t15lrs0j9r8zlmg990i1pz4lcx4y',
                slug: 'duwl9ymqmvji9c1sfmts5pqmrpiuy880egses10okobim684q2libskedtmsxqwlu5uayhealzerqqgxtes4goz1y5nvlr06756gipj6gib3tml6glrd8ptpq8kc4mf3n6q8h3jxz9jijwqvsna3vdhtwawxca1zzy9jrknqoqsqhveabyp9ggwocfk9la1mfvhbtkljh4lt6by6bwqoiursbj513nyu6ct6ygeofrwzq7j3lesu44h1zbyx27h',
                latitude: 705.50,
                longitude: 827.22,
                zoom: 786,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel3Zoom is too large, has a maximum length of 2');
            });
    });
    

    

    

    
    test(`/REST:POST admin/administrative-area-level-3 - Got 400 Conflict, AdministrativeAreaLevel3Zoom must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: '139q9eu9',
                customCode: 'cdlrokuk0y',
                name: '1uhjyxe8fi2oirjlylhabcf7w8wgljvinkmmnznbw3f5hmzeaigbfv30fmhio1gmofc4zn8t0g7ckgiox5zxddlbh1ddjy1w670muhfaxi6rq1vdd4zvjugda58l7nyzehzu5py490oxxpft9pg5x926l56jk6ajeud5gw2emlktm5r29ho1tlsz9ufzm3jxkjzlvci8f7d7ft00y9d4en3ur3rse411desnws6efwczlxwi8oalmnm7jhygri5',
                slug: 'g1wyh6rs8ihuz7myw8pwoqzr0hcjq0uwdoeztthrc5oodqtrm5wd702dg6rnsou7rlpe0kknxwp1lbskubzq69qsays6xpm8d8j13l8vtcvg4pyijlz9tomuhgyirhopy0q8l5o9rlmschfcfxvtm3ics9grju0qiynnklhg1iczr59s52bdrimk8ull21rixza3v3ast80vv6yb969lsy1juus7cpzg3k7lgjqavm68ceffasxfse7mggfx55o',
                latitude: 616.71,
                longitude: 717.32,
                zoom: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel3Zoom must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    

    

    test(`/REST:POST admin/administrative-area-level-3`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 'cljn66nb',
                customCode: 'xjf8vuxjue',
                name: 'tonasbk6qcjr7hgk9inrbtps7hzwspi70uwvn6se0zwqil78hs3q7dxb7ddgw0s0za3byus7jh53ehpd6y5e5y0jba058i0xfdq2nqsw6q46jvss64s7brqtj01mo4u8oxf4rtu0yl2w9lelagdkzpasppcglrofpk0jiuv461y44p0nmkea4dm5ixevqklri1ro1n1zwr81aafk9cg1yn1bph2f7s6xxedbduorjd0azq90z084g6uw2yb80im',
                slug: 'zogbg1ipql3ks1k568zu1t9y85l1fm43588hf1qeivk80cllaijdg65iqvx8n9pcforlatrxc5aduidud4wsvrolp6how9fmuh9ypqcd4l98z5jfweito0aed20olm9e2jw79qtkcuisd1mrr4a7yg85txm3cy6ndqrq8aw13ej42d6fkwsius9v61ddxqscutvmxsq6nks85isx0hdt7vw6p9jqlod2ye8eccwxf5jvat1fvcecjdrt3mm26t1',
                latitude: 829.60,
                longitude: 550.57,
                zoom: 40,
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-areas-level-3/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-3/paginate')
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

    test(`/REST:GET admin/administrative-area-level-3 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '68aa98f2-0600-438f-b820-ef279993bbc4'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-3`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '269e1735-e5d1-4da6-9dcf-42a127314dfa'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '269e1735-e5d1-4da6-9dcf-42a127314dfa'));
    });

    test(`/REST:GET admin/administrative-area-level-3/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3/33c35c4a-8786-49c7-950f-2dad682107d9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-3/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-3/269e1735-e5d1-4da6-9dcf-42a127314dfa')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '269e1735-e5d1-4da6-9dcf-42a127314dfa'));
    });

    test(`/REST:GET admin/administrative-areas-level-3`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-3')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/administrative-area-level-3 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                
                id: '476f3674-8df7-4ee3-bd3e-ad03a5beeafb',
                countryCommonId: '7e2f5482-12d3-4421-be2b-3506d13b4ac4',
                administrativeAreaLevel1Id: 'f7ce1162-6e02-48e9-8fd1-3f30e4e6b866',
                administrativeAreaLevel2Id: 'ef9f1339-78d7-4e1e-bbdd-9152070444dc',
                code: '55cn33a1',
                customCode: 'rjfilvf4im',
                name: 'c3yl7lj5bfjhpyp8vx1m0cqu5oxr7hoionk63nk33a9lsc4ebaupku610bekr7uec9u10un136rjns81vpkyeirmjt55i9d5pf97c7l4upc2cprakynlmiav6isxdfw28wugzou2fvh9r9avqksj4u37nozn4riwen6q4362x94nell6k2yn2mlebhtfolae92ussxbgdlyhgj4a9mk5e071ib6rg2qhjx8b32vh0r0j6jwdxi2boinp6w8bnke',
                slug: 'm8sfgpxly2kt05ltv1kt3h2oluhm2enru75r49rybga6uphzm8r9zli41js7jnotj4uxh7jwpxliqb7mgouearlamvjvdtgdqitfv0ibgq6dgrm7q9pc36rzeyhj1lei3voa7qay67tkfj3jnwo81fa6jr2bwho13jnz3nzx2h0t67wkxhwczffon96kou1z51fm71x34vdm7xoil6bx7gs50m8mtogu7lwlrovhnnjpa784a93uojmsvz3hcv5',
                latitude: 985.23,
                longitude: 364.15,
                zoom: 29,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-3`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-3')
            .set('Accept', 'application/json')
            .send({
                
                id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                code: 't3wqc87x',
                customCode: 'g0e5sjxl3a',
                name: '3teddipxy2328r4on134igc8uayofzha8jyp6vjecoy6pb1gpaintyygytni9rp8ay9t0v8ea4iqnjojqekv1pym0rbfaj2rtt7jyz5d8o9ls7fv4o77cpipdy67tcpsqngaysxn0v2916c79qkhdulgv0mypehssgeq6sbeexh3d09mo44yhxbuk439snvmw0ournmgzs897fqvoxhewoj5cbaymdq3mnewi7hdirj5ck4vz7v2k4azdu4pzd0',
                slug: 'opuwl3jco1dzwwt969hx5ss6nkg0albkgx9qs03eivqjqwz0xo6tu068cpadww3315be93ocnd57apt0iv1p3ql57in12icj5cl9c1svvk2ifzwy5lydwasqm505662k6g2o47mid71mfec4npru9xnde4fk113rdd7vpvmmaa9elwmd7ll3u0fqx003lopuyimrt3iwq90yyoovzckcysqs7302mvbwd9fqdxn6nvmzb5j0g0pjt7g1t8j4muj',
                latitude: 5.98,
                longitude: 328.96,
                zoom: 24,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '269e1735-e5d1-4da6-9dcf-42a127314dfa'));
    });

    test(`/REST:DELETE admin/administrative-area-level-3/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-3/d198aaeb-2662-4ef7-b6b5-67e19e4730be')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-3/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-3/269e1735-e5d1-4da6-9dcf-42a127314dfa')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel3 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel3Input!)
                    {
                        adminCreateAdministrativeAreaLevel3 (payload:$payload)
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

    test(`/GraphQL adminCreateAdministrativeAreaLevel3`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel3Input!)
                    {
                        adminCreateAdministrativeAreaLevel3 (payload:$payload)
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
                        id: 'ce7191cb-a625-4e94-a5cd-ba0d2b371ca9',
                        countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                        administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                        administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                        code: 'zbg9ismh',
                        customCode: 'kim1ptmcma',
                        name: 'xhkia4orkjhb7w6vatejevri7e20tnd9raxze1l0wklvltlft1p052r8su6ighhd1rkul488qdlyx8ywqyvfdkrv6hehgloma2mu3m8asb3ai3e60ti0t4jo4m1ul8wlzwv6s0jxk9euxenm73zl784m53u0kn73ctvai940n9wcbq9p1n3ygzc58qigiyuqgdyc9ymnshpf4ronodpez23u8r8hrkre8081aaj3padygtzvvk20oavj7diziux',
                        slug: 'wcy0u8jgjs2b04opiabdq8llytegqcm0yrn61qtoiqsrhf783l6vd5cp7ilklo13ll3eb3tmbpyn5f3kil6qoe9wgac6vdbejsk11nbe79r2e3clu51c48ubcgrfadfcdqpwhchg975e3pe2gtdll1by46r12k5772edrpsmz61mfkgk755vpq2tn4wn0fim9hanv30a5ohuua5z9kmvikj3ugq29m1a1oz80u32rt815rjyqqcquv43h23dxfc',
                        latitude: 972.12,
                        longitude: 216.48,
                        zoom: 50,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel3).toHaveProperty('id', 'ce7191cb-a625-4e94-a5cd-ba0d2b371ca9');
            });
    });

    test(`/GraphQL adminPaginateAdministrativeAreasLevel3`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAdministrativeAreasLevel3 (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAdministrativeAreasLevel3.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel3.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel3.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel3 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel3 (query:$query)
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
                            id: '1c32bf6f-6422-4133-b641-a9dd4bfbe0ab'
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

    test(`/GraphQL adminFindAdministrativeAreaLevel3`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel3 (query:$query)
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
                            id: '269e1735-e5d1-4da6-9dcf-42a127314dfa'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel3.id).toStrictEqual('269e1735-e5d1-4da6-9dcf-42a127314dfa');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel3ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel3ById (id:$id)
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
                    id: 'aa9c3f79-ef54-4c8a-85e7-f53678cf19eb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel3ById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel3ById (id:$id)
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
                    id: '269e1735-e5d1-4da6-9dcf-42a127314dfa'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel3ById.id).toStrictEqual('269e1735-e5d1-4da6-9dcf-42a127314dfa');
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel3`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAdministrativeAreasLevel3 (query:$query)
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
                for (const [index, value] of res.body.data.adminGetAdministrativeAreasLevel3.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAdministrativeAreaLevel3 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel3Input!)
                    {
                        adminUpdateAdministrativeAreaLevel3 (payload:$payload)
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
                        
                        id: '5cfb5fb9-2fe7-46c6-95ca-866688a9e50a',
                        countryCommonId: 'b9b6d039-e2ee-4c46-9b06-e889b305729c',
                        administrativeAreaLevel1Id: '028dd061-0d0b-46c3-98a2-281e0c472971',
                        administrativeAreaLevel2Id: 'fc6e709e-64b6-4e3c-9835-07e6a9188843',
                        code: 'pvnp4pm9',
                        customCode: 'dj7tqaot43',
                        name: '9cjd0ie8q7bsvm2f1t1h3yqclkz1zyf8xystc052a8vajjjyuc0wftbxib0l2150ltd3l9jqczxq2ljmbd2ye3arl2ifnb08pzc7u2fisad5p4etnipddphkk9yia8m4p00u6vraactj06cotwfjchlwh4mhad7v4cbop1xjngx5gb0cx9n38s68otf96rjihr7y61bbnn9hdng4gobsbigku2kpgde20sdr1ah6dp5jlorxn6mh638l6id4aef',
                        slug: 'uhhmei2c7k8fz77mgxviluwngoy6w0ii7jtpt75d0s9de024pcg9evjhjzslieogw1adg99u5kco8q7r68qvkj4kczu8e3p1ge0zsxpetqr6jdtirmmxmm90oehw95mqiqogn3o5sn1jdhb9osx5m2naijf1saq3vbf00vva6xlv87eebjfkic57e116py8uqqroy8rpmsxcov90dhn8r5ew25j3nw9cigpyqs9gmrh1owbne3mg90cvkj8aydf',
                        latitude: 920.41,
                        longitude: 777.68,
                        zoom: 15,
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

    test(`/GraphQL adminUpdateAdministrativeAreaLevel3`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel3Input!)
                    {
                        adminUpdateAdministrativeAreaLevel3 (payload:$payload)
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
                        
                        id: '269e1735-e5d1-4da6-9dcf-42a127314dfa',
                        countryCommonId: '2aa23829-f2b4-43e2-9ad1-7b18ea0a35ab',
                        administrativeAreaLevel1Id: '0792a86b-2d97-4bec-ac09-09de90ab454e',
                        administrativeAreaLevel2Id: 'ed1a6b6a-0951-4752-8560-e988e1170dfa',
                        code: 'pi2ahigk',
                        customCode: 'vjtzpyagj3',
                        name: '9qda6yc4ohzavg51drxrrgpaxj79ej7ogpalfm2yorwahnj5bk82m4ysdholf9l70wgk81bz28zzq4qw7mqzchfj9gigrcfwgcc7i1txl95uakgus3lr2vh9veikzncz7wsxn81yl2eopm6ewm2b294jkdr5jfgwikfn8lrpu2vkd57294v01owj9h2qwayjfeysp7pi457xi6zodzvdptxl8k54p61olnrntw0w8p13n7zxo77r8ncxaw8nj1e',
                        slug: 'qp5jy20su56a4go6yq9tyg19s6funrlc4jcz6bpowoayxe7ai30lqvkgccnhm4de21zyb9oeogu0leys7z5s0cx859kei8o5ab583nvk8xu05o9hqt5h70s7sw63xej0gttgr88sypkxomhwb2yd3hgchvbg0v710jie02k5hbysuh4yfufqcp7sz8qmgys86r4n4x4mlaeg7tasopg3bcjzs4amqz0vclba0294bdjal6kzg53w90p2rgddbml',
                        latitude: 154.48,
                        longitude: 914.49,
                        zoom: 48,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel3.id).toStrictEqual('269e1735-e5d1-4da6-9dcf-42a127314dfa');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel3ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel3ById (id:$id)
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
                    id: '81ad638b-d5b9-4b4b-93db-0a2b00de62ab'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel3ById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel3ById (id:$id)
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
                    id: '269e1735-e5d1-4da6-9dcf-42a127314dfa'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel3ById.id).toStrictEqual('269e1735-e5d1-4da6-9dcf-42a127314dfa');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});