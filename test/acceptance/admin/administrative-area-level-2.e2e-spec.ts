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
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: 'xy1mjusc',
                customCode: '0yy4acsku5',
                name: '1t5mwphyq2mbtuhp5n9c02vply03tly8dm6mu28c4v334tln5yh7gkf0t7vr1ht7794saioxkv24osdd5bbp2nnvyk2v7gfcmtq69lsl33x1dw5mztyry2eadr02u19eqzsdus6r10itd9rr8ziengifw00k2gdodia89z0qeyle941b6047fqv6t1i9st6d41kyqs16gj0bqhdpxp3zvvj83lvi2qpv0q00urpnzwto91iftn24cstj1m97g05',
                slug: 'kkghs3pcc2v6wztbhw7nnheivbfd5sjwc4on5h5persgag62wot1c3idxiz7t4fcdfc5ehsw6n9j6pp1iqttxd5y87lfooybwr4ppkyk467beut64oenq9oaht2gb2rm2otizzlgic8vy4ln0xjaa59bm8hpywwi6l7drg5tszjox7zx7sbnnltbsrcfunsz1qesltpxcz5cbd7hd0ezs18l8fi5zhqqbvtqya1pv8l0dwg6nhrblz9dodal2g6',
                latitude: 82.39,
                longitude: 550.95,
                zoom: 91,
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
                
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: 'dv3y19gd',
                customCode: '5h7nr8uy62',
                name: 'dwsb04yc17tg9wel2q4eyl7kayfp18ulse7kyrk2m954lr7jg360g1wt9vhj027bsohmln47be7qzvwf2ckejcdmjfa1f3ri6uil93km441dwmzc9j6smczbzgrchnzd6trgs3d9q1uuutlvmzkgiyeg0juoun2bt2saqlh33rxyyioxnhes6iso3ybvtmhjfv4m1fbmxnvt5ngbco34rtlfy7kukjw07udrw54haxf7yexgmqpuyn4upr9aom4',
                slug: 'bbzhxwkcicuzwu217qkarvifesfnx65m6dw9dt13qw5dtxm8ymxy9gn5ab3lsvt628wlckatsvltm8wv6la3ubl5v05n04h409o9wed19ac4pkm3u9co6geti9dhx7ndnq2wzmm6fe8mijeyjew1jkgftsig3stbij9xi3py78idveronuj7nebx6tbw64f50umjmxfsqa2s0x8f08930rqzjotlec0g2umf7l8a155h9yedwtf7kzbgjgcopka',
                latitude: 691.18,
                longitude: 86.58,
                zoom: 82,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: null,
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: '261yb8e2',
                customCode: 'r8y64vt60p',
                name: 'brecqpeq3owybgrzziy3196hjarpmrt34lnazr6t6o1skf1hxwxx2yb3trjnz28boq1oziwlvzvz1js397fittql5d0e5cmzv2dmtriz3poaknxq352y0zwt9d871jrf89ktwv25y42hckjc3fjnjh3bf0pgc6oas0zbsw7fxtp8e2zuzkv9tq4to7mv3r296p2e3popdpwz3atl2sldnbk339xdsy8sd6d1x66i8fycw61sv11dvmdhdoqqfc7',
                slug: 'hx55oc4lncsvlv3pw6gjqgjkmypv0j156i28xguxi8po76rv25u7pqjw81jd9dwp4kmf7vjjzurpjsvqpqw1kb8qenygk8jhup7arcoldhu6wi1m0w6eifpl2gts3p85qsqkup3bm1rim6ahu00rvg9o7z611xdweenrg66aqvyen5t30ele8p71y796snp89nidszwtjeyfkvny8t7ymvewgpq3d2paa2rzwdzh008z7nh1wh3xtuginehx7fs',
                latitude: 396.11,
                longitude: 230.70,
                zoom: 91,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: '4lsyxeuy',
                customCode: '6g4056f083',
                name: 'fkqw4xly1ff4fna8vzny3s4vc33t1g0x69r3u25s86jog4nyhh1ztjpd4ob9fsgl8fwpfjpxcbpoxlbbibjo0woi0zohdvdjclmjz9ddhpc7zb6i6qqcph0wps44eyugbch5c3e70fc22665zcxopai9kc2m86bvox8rl6cmrv6834f18hs8qx0trqwcw8l24h4x630cy5f0uwas30w5tm2a9wjhtdurt9h53ey00dvsoqvfiac6i24hsz8b6qr',
                slug: '5vfqak56szdxseoinx004egr2nphp7onx5cshq2oscnf7zr4f2sxrq23g3uapj6yyfqfko50i99j55xlevvi8esocmntw54fspoy1poekopgdhjman30k2s6oegqwg5dldr5ianeov5zrl4zk2lnopzyzqihcn3psv163iglho4ccagq7do24qhorobmsm8oycqgman35jqf1hp2qpieed1h0yeb884tcwq1h6bnq4144b6yzvmgsu3a8xema17',
                latitude: 689.49,
                longitude: 157.43,
                zoom: 78,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: null,
                code: 'n6i0tgzk',
                customCode: 'rex9gl4rsc',
                name: 'cqb20nnq4ajtvju7zz1xq3wczvj7jfjllyoxngfgoh25wq36txeanvutjvvtblm33wizrgx0z7pxxzvortaj5yajco5mvww3trcao1re0z1hayo851w8it9gylzr7a9x6hlec8c70t18ux5dsxart5gnowpme2l3augattcgevqy6gomzmweqp2d9k1rnivukbaua2l1jzl0cu236sxphanp9pzklntbk8zt6url7azywuy4zc0kmklkemdvcbb',
                slug: 'xvgrkkfdjwzwrtv0rccjn1ymu6x5bz1b4qtyan8eapjl6nw3ksmtp07yg210hxq4dyf7aj6hujl03ik26okpe0385we9zfev4y06rit9taz44xgd830mqrf37e6xcvwllxkbtq1ozzhtxtqez9yqqbe5xrnw8cfrjpmqajbk9zyhdafms59ozrx7ncph4t33vuidtl85f2j5tm4ffmr45xuzpfo947vso5fdrydtfgrif1h0woszaqezjfiq0ct',
                latitude: 180.01,
                longitude: 794.00,
                zoom: 23,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                
                code: 'aico61mo',
                customCode: '5sq9jx7onu',
                name: 'ya0g566053w1tju6tv8v2c47mpsvp53j2lbfxyjlh3llczmws9hru3utozroy4069oipomldseavqnd1ntqbyk88l9wep3xw7uakxd827eyfii1mj05mg80yektn0mi1bow8isq9s53nbw6bv3g953wwws607j0r5of4cctc9os0f7glovvo847fuojl101rpxc3acawotp70m15aoby0jahtr58l76x5nnn5ww2mlir4vhsejweavlahga8xld',
                slug: 'yujj1pqrkissvtsevbhb5tjy4um5t3rtsqx2pjvo1zsva64930uhe63bct4810icvnt96bn4s7ffhqh7bg41d0mts4cfu7ijur8o3s6okd05mfj5u0hj8j2n9p709wikr8smwmg4ymrmmws85kwhhqpc2dnwf4ti8gpso74e4478k891lyfx2778vbqp9io56ur0uom8nbgnk85v93vitbzqqymb60b30gthx55pnq3qeem409g4ioyvaetvez9',
                latitude: 260.40,
                longitude: 401.60,
                zoom: 90,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: null,
                customCode: '3fbhkdf45b',
                name: '80177tgfckkj29vieefwp369rjlhfl7ryvn5s8sn6kvafkdv3os50w7kan4s9c5tosvtelis7189bv1p8bkyi0u5ctkpisqotk4v57it7qvs54242u3b3lnv6s6nce9kt2m8lbll2ll6nz6yfnk54iu4bmirx46dx5f7zovg3yokp1blym94bg5zr5uju4dm817si7h4szwhn1ph2sk4sk8xcvxeghr9dx4qmp14zxpi6ju9fs4xlvqlaek1lar',
                slug: 'tz5xot92x6587og3lxbh9e158pavocyyhtmtouy8rtbofod2sm9mhlsh26hln1zxb4tdljyyt7g3fpuyrhmtio0h8gvk9q7eft271yr00s6mr5buh7o54ynnbi343zyxkxdfybbtfb5zduwthhyo2zclz9n8nrfr0lcyoii5erwkgn62o9ks3rb92azwux8fxr6zdmcg48f6e9y5tex85u7xqbqrxsalpybwxizdz48u0kghrm7l3se8zrc493p',
                latitude: 367.21,
                longitude: 47.48,
                zoom: 22,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                
                customCode: 'lcduhkl8vn',
                name: '6goq40nrh6fzrvkvezacnnfrfhjzo83w85y2fq8v8are9crfx5b97wdxs581b54ux0p0ghw6cxudt58klabkchwjwo83o7c75swhqx1bdoj1pq273f4cjbbqqkkahr5yupuhs2pqtutp2vflalx7cnvt31nyfonf3m9ll2p5k4cmlrn2tl56ggyv6c5c0xbqat7oj8zfkqyd45foql35hwqjvsp1n0vgvei9lzgs90wk30fu3oa54q3jbmpsrsy',
                slug: 'hx2fs9461uz2n9xsjla8igjtd08hsox8nlookfsaiopbm8himer1747uknfimzmyjexjftauqphsvuuibzjfq0lm47khsyghavc5bjoxwayqav4gsb411x62w99f5j62wiarq7doshyi9bxq5sm7ani1oih69yoyn8kx5d4pn4o40qnkh3t4nr3pjfz28rxfgrron9p3wthv282njt4213xusg3e2vf4wah5zl6m5qiu3i49apqlgtg5z8kbny5',
                latitude: 529.59,
                longitude: 844.44,
                zoom: 39,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: 'sotrlep4',
                customCode: 'rvitdhd4ww',
                name: null,
                slug: '4ss7u2uvg5uxjbho6raz8ubj33g5xvohtj4956x01u7p6dwowxtvu3uvz6fp2pe8k6oro0rniipmkhnwsc65zi4b6oufps2597q6o46316r4ebn7z8ucgalcdmphejj8d8rehvy9ki4nqt5croz8zdg8khjtl6q3ungr6b0g9neal7o9mrql4bski1cnkzz73b8qh741j9v9wmdnxack6wahiabzyh27mfc3ytybryux1xascchwpdbulbxh7hd',
                latitude: 999.40,
                longitude: 971.62,
                zoom: 12,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: 'oeszaik1',
                customCode: '09xdt4jxv6',
                
                slug: '2og9o53gvd9ue6wjmg57n4nmqckgjj17a9ls79rmxb0uy5zxcwatfv8bk9toag2wbo7p37l88c1w1k0cyrw282uw0vmxtgv4zs1wkov1oa8qi93cd60259d81fcvgie0zwwfymauv0lh026dl8chzcx7o95np10278100gl6imo6upoflp9duo87itz8ged83uwwrt4zofvfr71zaxdb8qbszvy5eerkdbeo9yzvh8syzq73mcvf96f44d84csy',
                latitude: 271.59,
                longitude: 212.55,
                zoom: 97,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: 'e9d7xddc',
                customCode: 'j0wxhupapc',
                name: 'xmwmqqbypbxe6qgi9zl8lfyvthp9t5bbiu33qxqp0h611h4lyxqx6vv1za0178fcfwu0jjawt9d8xiy2jc8p7rya86rz3jdpxyff5ihy4nlcora3vqyknqja4xf8toy4p3e07ghr1imi7ui2jpchbfh2q9bumxuu8y6ujjzxfe6qazqnxid6uinlwxo76aip0z5l8chms6z1ss99ntuu18yoefsx8djerzkqslui5v8mr3r7y7ak4s2k2k9bqhk',
                slug: null,
                latitude: 516.61,
                longitude: 131.09,
                zoom: 67,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: 'upx7f4om',
                customCode: '8n42c948r8',
                name: 'wn1cnv7z1ca31vie00xz5wjyjzre0u5w6oy05z0mxtqlslv75rswbwopw4xwlwtyvgalvzvr0az4hja5xpm0j0exogydfn7cdkjdr4fp5nbo9p04m890aae9sphsiqd9n7sdfk7xnqhyjimofs9dw13nkf6e7iy3yvzg6m8ei8gt66hnfyaswtu44kmuy4g149bq17j9bkfxgd7otgkjsq1j8q0fb5dn7n513svea1vllli189gc23gj4acijp2',
                
                latitude: 31.63,
                longitude: 792.08,
                zoom: 28,
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
                id: 'ykvgp3zvvt5xi5r0iv891y2teiz94g7gsclmx',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: 'jyexkgdm',
                customCode: '9xajgxi7ja',
                name: 'dd11ar9l0tnyfv88rte87wvj2tyfpd8rukuqlfzmuvmxvh80omut0wlv6qbdi02wqe6y8gkgdyji6cbja1asad0afq99zvqbuvm6cxiwxses6s16vbdbtei0x4g89fiucwygtgvrlj0cpho3eohrlsiol7btmj4mh1hd6o82wykwbf8357hlqdjlm1i5sbn16r43mv0061r9cbidww2g1uvv4aau6j3410ck720vjtwklfoy4y9qyzu708m4wlr',
                slug: 'sfphap48fgmqeq79cwwfomn2oifptzv5io1zmrdmqwe9cx4oz2ldywjiusgfop5rqfkj43ncp9k9kkg2h59pnpqxhc1418630ikvqnaozyvstjflvra0t3xioiu3nt0bpidw1o6ykrhmiytwo7tcd151tpr8pt3754f50yaml91w6cj0c25q3ic8juz1ulx9ba13j69qorevojp8f72sfdog7wf377raz3d8ch7ks4p47rc43pa0p0rtbeeh94o',
                latitude: 6.79,
                longitude: 360.03,
                zoom: 17,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: '2ujdx4ps0kbnaldpbri0gf32j79gk2yslv4xv',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: 'pot37saf',
                customCode: 'p89p4prthw',
                name: 'a2wvd7tkyemhrad6g5hncagqxrpmqu8qo9salot7gv64nszr1pkg9i1dtqbnm0w65h5vsz0hfs9jo836014iogb07uixj65q7bg3y514alh9qrlrcep1qlhaa17xpq6l6lfm54wjyctl0jlcdl3n6il8mmdggwuo8ah9tp26g2kwd60d1jdt9u398721u0uxhaylxac78iusntwb4inl6bh4p7i502z5hbhpb1mgs0fobwzkphhdpe8b0jxg3zd',
                slug: 'mafgp2vakf3fsutrukr8rjg0xjrotubbulf7282qxfnizpkyeiyisbd4tht3fwib5ryfgzq7bzrzv25xybsbdphstzcqfqirha18q01cib1becprhnzyyunw1ld83l4p53agd1srbmzzntms9qlfv8xwpm6oevuc57g8fcigertiyjuzmf25rngf2cmebw2nq4zyzgu1xkvtrqjirj1dprq2zgk25em8caywhsjugbph8occ1s6fg3gdvqmt7i5',
                latitude: 163.27,
                longitude: 282.43,
                zoom: 74,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: 'vjo8opvlpfk1r040b5aejhy5usjf1n3xml5do',
                code: 't0b48bgf',
                customCode: 'txok2c8jm3',
                name: '0b9jv90t4gvm7mqwyo9rxuovulq0ydi2epbh8k828ikn9pb9dqzdorkx857uaze4o1ok14h9gopbl184llajvwzuwiioqv3mgdrcqj2fpkfr5c6rj83grren8xawiirxv4gu32q727ipgu6wgkwdngcxwt9dguazs7l69giqui43zbbpjnfxtz76v5x0w9615ja26xqe6e45vwb0lhysm599tbvqgos9msd2c7n6j9r6q8dbeut0cb18pct236u',
                slug: 'yrfm3uuvscm2o3qh7rodhw1dq9vuub31mcxvu6d8lmh9oqaltv73j2xsltmc91ste7v3kmx04xue33txovhz5i8rgumamnb50lwlr3b7r6ua7tbo0iay8gabiqc1gote7g85w3we6n3n4jupvk7gr840qlw8bsy1wh63smw05d3ye2y1i1qmrim816354j03jae0epon6q9ldh0jij4e2idhxag5l98412r0mi4oa5x5uk13cuywwrh52jlaz6y',
                latitude: 468.43,
                longitude: 930.56,
                zoom: 29,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: 'uu3ixs8gr',
                customCode: 'qmai7wmfv7',
                name: 'k3i1z15ox9xzdanv69gbcpu7mu7dmth6c1abc88mz3r7kr245kgw9ovnd3u5b6zv8knb2i66x5tibe0i3nlyczvyqby06ki857057i70uy2sbp8uyiatmkwnnu76b2rjaztyeqeak288o025kt8qhn17pzio3f4036exgivvxtwoajdls6dkq060yquckwfzmstggxl9qz65miyddg2opsbfycrnerm11b783plwyifhmn6jc3fyg85dc79s1pd',
                slug: '527o3r41qdnjb4uqcor4v1ij8om6xi35uctlbkzyslzgl0pekk2jmp2lmg3orpa9w1kfml6yyyn3kcnh16k8vhwhjqgfb39v2i25r9fgetmfsjm8safp5kr6s9bw73cc7jvv4tcmotjctc2va3r3sk4nja7stk5ipl5i3by2ljahx2fzkkvqery4kkc1e1aq8t9y25x64ecik6gk00yos6300dc59y392k5y0pay7ry7ph6h3hdijgps522lft3',
                latitude: 477.03,
                longitude: 179.03,
                zoom: 14,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: '6va1f4ul',
                customCode: 'ctmj3bvetku',
                name: 'l06xpepw736723u2jrdt1rmy82m32avw3g6r4bakm4neh603edhl20b7mit987syaid5lccvrtmv8pcgz8ymbas1o98eugcfs07sf0pbkp25ygt9yomunwoi2zzp3qvtc88x79naxe0fjqitlx0lxf4m4hovn0sdu5puvo7071jdtjahm1cio6i14j75njewj9x00tiyhmta8dpk5i0bkqzhfc17jbyk5btb2s7zmq2a43nmf4vmwu7sk6gdylp',
                slug: '46ugn9d157qsq1in7s93ldzb55620a7cq1jv0grjmxe24b8uofaf4al4zqi2ggtb30slauri9cxo41kqun5l083pccq6xq6hw0b43o44w33iojg5yzyh7b7al1al4tjnb8ef7232qc5nqdwhh677v22zuua7n85b0yrrshso97j8en2011w2oain5es4x2m4zgogqbb1v735n4ocdvgrgc5e74pk1wvouncx0zcyocye31zizehn7ds6fpaeag4',
                latitude: 788.40,
                longitude: 191.68,
                zoom: 23,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: 'zfmme240',
                customCode: 'cu5oacg8kc',
                name: 'ip1483ciwm71fuiizisw4e56zosds3pq8ilq9ar3ruhyggek3znbs6etckpghja2uvwgmb5r77l59pfhg6zw31uhe5eicln99m4v8olkun5x9wxoqcb87u34f4y04mjquuougigzo5kx9zeaoyaywfr0fjcdgkz0zz7v7lmdtmaao27b7yfj6xxkc21omfufn6vk42f3hfo7cmpynl5w9d10hxll34r736v96ejz0s1a4gw2a8yvt7z8q3uoro8p',
                slug: 'j9qiqqk9no3ebxrtt02hz9ij5uo9t36ylokj7z8gnfmv144qriqewhhs4442m775hldtqwc5msuscsnaezehjfc8gnbwgboyrfc8fgo2kymjfuo2kjb11jnjfqkzfhdu502nhjagbeh2qxn1whsfvfg9idp16mrhmqv6s8zjg674ps3rc7m4iol8rh908dvgfeo8ck8c0ezixxaccmk45q9x72j91zbjpe69r09hk1yngsflvxmtmvtg44npqgk',
                latitude: 379.97,
                longitude: 654.88,
                zoom: 31,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: 'w3za78e8',
                customCode: 'w7f66av7cs',
                name: 'n054i4z3fdwnbq82dnkcs0n4wbrs9yv43zkv43di0j7c2ezlwjvkfaah7jss2act7kdyqj2uwfx66t8bci8ck1493lh442ijibyvtey9c6vxc37u00qtogm34gfslflknmidnfwiib982mph0ag4giwmcy5rkibv8sxvd8awroi451sntodcv5o36hlu6qlvd55iwfn2s029pfzmo7uf0rcmfj6e3idu8ekl5cret0iirc4tfbncwxm5jqi3fs1',
                slug: 'qj96t4ss9xxjda20bka9m6z0jegae49mz6ux9j0bh2yhsg1w79kr25cmvvelum9my0pateeze9juu08y10ip9acwx7zs94mm17j6xc6hcnpozpz2r3hkh1ffe5jek1vmx7sp28yf5yoh5t6e7za0wpaml2wnb6pyf4bms2yme2cg2cwh8vxmvk3rmar5koc2vvnx14m6zfdvl3f8qv0r64v14hnvsom0oxqzfx590xrzpe6ooqnc908scdyvl0r2',
                latitude: 72.14,
                longitude: 67.79,
                zoom: 92,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: '3a3pwbfk',
                customCode: 'd85zxykdc0',
                name: 'gce7awyqslkfya8p4pafy6e7bt6wzg6q3qemmp2b65wzttikd5eqocs4xih6eoaomc16eoz8u6nlc761ldtsu0popino3cvoqyeyc0ihn3ufmse1qsa9te3zpxdletzwfkhse0gnv4ih67wuqnrsv4pafppc0mb3tlwkvnvnxj77any2xd6xez0qsssq7ghvosgl7wxikwpn40gokl8xthvzi7nis6bplcx0glkvb75yf5s1hae6e6p2jugh882',
                slug: '2vzfpedhe87dqjdfqm4a7dfxjyd9ohjstzuhc2jyeo0ok4ew415mxj8x42uyx7wf2opv7e23nme0z73j3nloy2wy1hhkmlmwovfxol3ydrywr5rfjgc0f6ws09ie4mig7038mcu1vlbbammi78byx6tgofac91jz9txg4z428czjzagxbvb9i9gsekc7byoumi8xw6ujb3ogbpux72z882yfcovwhdf76q5lbbsjaxriobxsz9vaknqjqhtjs0f',
                latitude: 394.20,
                longitude: 629.10,
                zoom: 66,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: 'y83de4eu',
                customCode: 'fxwjvmfivc',
                name: 'xmjmtcguqt14tcykyx8uan427wwl55cxl5am0880oejpxnj8zjkyle1deicl1dnfytjjhkvkn5a7601hgged596x68d0j55r4g3vozupcp6pachub6u95b7r48dcq8qdbwlzjufnjs6iutx8ch6k0l6b41bugqo6riek2z975l3h2vzq4zi77tmwq5xi64tviaz4tcbow9apc2btm6135oyj2tgxz87wc1ai38wsxitior61tnawj26jkw0zysm',
                slug: 'ij7tipg0t76pw30vkny7d95eoqyhfm50unt7kh1nfy61ekgm0turpbtbzgt1h430kixsexuq5bk7yoj5bi138pt7ezzqb899hwhc46ulzbpy0eb5ro7tmx20g4gtue3ayq0ukkyw6xazo049ui5o2iupxzand09olmsfmvb8s43r00temi3hopc4nvs5btcjm52p0vsf2k9o8xszt7digixnitxk4s7wf9ribkf6nxktzbg6nuj8pi1sp6o5jat',
                latitude: 816.31,
                longitude: 175.41,
                zoom: 58,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: '003je4en',
                customCode: '8cwr9twrgn',
                name: '7jgilza4ckdbptxbs5167cgd2pcis7ht98ozv9q7x0lklopw61jq144jtauip2sctgy9560504uf38l6lqtr1zh43y1mqlvgri7c61pmd261wxq5avch83p58ztjozdwjjgpcm4avm0luyh07mq71anegru1b2nq6gb39evmou631pqfdza8ct4strvmz826q55a5mbc31zu2kn62lnnn9ynu5j377bu2enmlzxf5sf9ioened8hm9h8gk807yv',
                slug: 'uovlzsw37egqree9zdp5m2s2ggfpdcissmltov5om5r8vbdycaop5anzsep1zw5yhg5ba4hmitq2waiov1576aakb4to4er1d4yxaye0e0atj9decfxmk2ar2op6f8indsmtdkmh2u7e5r1ca5uwsskn5m5vnyqzitr930icnwj0533f4qilgaikbz8kettqc53yo1942ka9nygohx5znnmm36653bcyf5xzmdmzecr9v9d7pqzsc1ff0w60noi',
                latitude: 461.23,
                longitude: 859.36,
                zoom: 274,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: 'koyf49th',
                customCode: 'ht7e6yixga',
                name: '0gq4vm23nd3ytromz33rlxm9dwmxzqy1gh31f8zq9b1scwbgma1t70qgz30scafabvk7knzecu46hb7tpy6ag7yx94y9kwajokqjzv6k4z7e7w1gubl165ehiuoze927i82i1eosax7foj7a2f1wd2jrlluphwoize4d0t0h7ubmtkuf0fmifakya8u5y64yihqcwzt9uebgtctzymt7rb5bc8kirgqc22js26yg8tal3lizklgrztc1zsy3na2',
                slug: 'cmty431lmtedr29y9muf3eoaffwpr7893sjfhr5h35mw5ahzp2weln1pgah3dv7lz9nxlhvtrlq0quhio1s11ms386nui6irsmx6j3d6jhsue81xtba82p2b4xjxn95dzxkxt16mhnt52is51g6pgln48f4l90795ru4kt4ur0bx3so0rf9zna494wvkuy7bnflwlt7hg8pmz6esqpfgoebuvzp42ndznlw22qpyf8b8lemm0dle3anvqdz1d4z',
                latitude: 104.52,
                longitude: 139.21,
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
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: 'y6yjw2bi',
                customCode: 'bk9qjkr0op',
                name: 'nttvps174pmkkdzdd939jr2gzfqfue5eun7k0qupp6x8ytdz0d8mgv49juycrdjoy3tq340bthr3b9kfsqt7k4xy563uwwtdh3rkscwl6hbx9cj6nngrthv1a0rzrfmf7pmf2zawujga5r8mkqecm37a734nr4rgmqq2k6gnb503ckgo6xqb86y3apd8qjcjh532i5ox9wv1ggns8e8eeu0106xu1br9s5s9ev6ol2nw8uimd4cjaenvnwrsrzx',
                slug: '5jduf6xa4o0xc0k9onqjkuyh6mcpkf8snmu6dr7pgoypl8kkp9eem8hir3prig6cg3b1s9igq33tjr71yk3u7r42ilfss5a9mtn8jwhmct6lf1txu0h5i3rqk0wyzelnxc2m0h21m4w3g9e9kirp4kdk5875ptaxybfz5twragsk9qjmrdyam8e8y2igq2kxiiuitb3cz6kc2ssvyuysu73dvkbx70f64ec0s851q00mu842tu0ne5gkjg4a7zt',
                latitude: 716.32,
                longitude: 700.69,
                zoom: 67,
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
                        id: '12127955-4c1c-49ad-9913-f33dab0012f2'
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
                        id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e6b88abd-856a-4798-8c26-3a53cfa9a22b'));
    });

    test(`/REST:GET admin/administrative-area-level-2/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2/c687c981-ced7-415f-b39b-cf1572a02f0c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-2/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-2/e6b88abd-856a-4798-8c26-3a53cfa9a22b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e6b88abd-856a-4798-8c26-3a53cfa9a22b'));
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
                
                id: '0c526133-c553-450e-9ef3-5067adb592ef',
                countryCommonId: '13e7d552-8512-47d6-932b-ba686acc37ff',
                administrativeAreaLevel1Id: 'ccaf2808-e992-4aaa-a7c6-7739c351e395',
                code: '3ly3w3po',
                customCode: 'f2zhqo9o5r',
                name: 'wgnl0o2o67j9c5p2lyy6xwhehgvdq2fzyfughkh41vlfyyjflvg8ohodpik2ez4f0jkwpobhzpyqslv0hfjcygf7f1otvy7i3w8gt7rq45iv2uz3fr3n9ggx8ct0xi9mkohe4ssdg6rq214bvij0au243x0x7j4iddapfncypmllsoevkhsrprpno3woz0znm6vn514b9j8a029s9zfyby8jj3zqqnvmpojai8wbfgxaktu7vkdk6vfsts2ftwk',
                slug: 'edc6s4kitucgr6urleh18qx125smzfzzgjl2qn947mgymj2ydxr0nx0lna8tgh8e95mx9z869b9tppyma221y2z5z2o39wshr7i9w44y1vdc2d9tob5x6q2w3i9a3jh5s7gpj3o287rwmul75z6ljzj51uc5pokfw6qcpca6kl3eygvrv9voe1mhuzfrbmo96o6491madru6o6cij98zsr701id6y1upb0ra058w4xulan2o7h9nfcp8hp9eex0',
                latitude: 152.04,
                longitude: 611.78,
                zoom: 87,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-2`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-2')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                code: 'zbh0zo96',
                customCode: 'q2v8htp9aj',
                name: 'hk7p1mwme8rq5cvotnuei7v3dbeh231vmsdovgs1itlvshb0ikf4jzywmd2ovz7owiyvg1fr3uoljrps0nlk4axr41g9fzdu9vy76iubsuf0bju9iokpuuxtz7aeh1hh2flbmer1idu0g2usw56fad0qtoa46q1ccdvm0h7t156jptqka6q19tk1t2grlo3onetqrfmi9gff189izyb5kqu87yu1te9i632h4fde05bzsrc7jad0nlfvc2zg3jg',
                slug: 'w6mf2iujxonwtoad4d6vxjdaild7nefqdrg1n6e1rhfzikw7x7y28at962jm16783ognn70x3i9dccdvy14jgh8zvvog88sc7epae9swfoj70mkyigmhoy747yq71g9lenwc5kdy0b5xrqc7toknhlj318iblok4g4xl46365wftbw06pjmiw6u2u7s0nft6c8h51sdvs8rj7o85of3kfc0d27nkp9qfdqeqeoaqqocf4cukxutz56hwku1tiv2',
                latitude: 4.29,
                longitude: 284.81,
                zoom: 44,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e6b88abd-856a-4798-8c26-3a53cfa9a22b'));
    });

    test(`/REST:DELETE admin/administrative-area-level-2/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-2/7433b1f5-6fc7-464d-b63c-1b45a37b5486')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-2/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-2/e6b88abd-856a-4798-8c26-3a53cfa9a22b')
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
                        id: 'edf11bf3-ee50-46a7-8e4d-dc6ffe2e52fc',
                        countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                        administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                        code: 'pqt5jksk',
                        customCode: 'ckxcqvdne5',
                        name: 'icyt9brgos20eevfq6g55159b7779ibuio29kgbx5n68cp0f26nl8nwc1821s8g4v24alnhr5of467n07owpjyw05e9xistqywrrxoi54jrgdg3tlyp742sqqh0l09jex05f912nttf53s2l2djz8olrxjetn06y4gs32penigav0z4tgk8w0s7hnu05r4yxkje1am3dgc2sr9u5fi6ggt7uszk1oovi876rp6dftkalcz4b9tfgs85xio5ecri',
                        slug: 'qj9lq6l45nobvz4br653hb84xq9znpp4jqjp0irlt6hwvh1bbwi14jt4astqha9snbu1n2tr6kjceoczuxg8ogb5shqazmh6yvn0lokxjt03hv6woi1x5vtqztpdexzdh9o4vi41hh7q6juamoep20vsg6e29ntab4l5ghbdnulq2ly6f435c0mg52aindzj86mvpz0rfoeymlnzyy2dumi17zonexkf40s7rt7ankx6nub79y6995rhkjn1ozo',
                        latitude: 272.82,
                        longitude: 910.84,
                        zoom: 95,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel2).toHaveProperty('id', 'edf11bf3-ee50-46a7-8e4d-dc6ffe2e52fc');
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
                            id: 'c9dcbea5-f230-4b87-a969-82db75781bf7'
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
                            id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel2.id).toStrictEqual('e6b88abd-856a-4798-8c26-3a53cfa9a22b');
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
                    id: 'b71b6138-f130-4e9b-841f-5e792a7fd9f0'
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
                    id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel2ById.id).toStrictEqual('e6b88abd-856a-4798-8c26-3a53cfa9a22b');
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
                        
                        id: 'd250338c-4d38-4fe3-8a60-3f5dbd06681e',
                        countryCommonId: '913df2dd-7b2d-4140-b85c-36d2a66c788f',
                        administrativeAreaLevel1Id: 'd092ac46-af69-41d5-ad07-cb7b79c66fde',
                        code: 't5tmxo8t',
                        customCode: '65xevcojzb',
                        name: 'v6nrcxq9czq57hizlazyy7gsr6absacnca1bm0vm091ezug88w9hclxgw52uppml0rb8rel4mlgj0pmcmc6y5g3at8a1qu4503df7wxy2fzt9iqqcln4so5dll6va62dki1qechh9cm8gr9zoxisiqy9x8bt4af8qpivt7lcvq5ngqmz0aejm7sut4y4zheraetk9mqdy42sjkhbf6yuig4nyseqt0xo5e5d5qxdsk5xek8nguspwm0g3ej2x0w',
                        slug: '4s3v3k6kl4ylgb0s1s64ncd213170jbfxh9ltcj5o42j367gwkqernkw7n8loq7dzwtriq2hrkdius82g31uysu4nuo6ogcyjn5k6k682ixyywlhd1s3y85mxv12g8kgannvh1dlp7kow0d8qg9yp3zxxbgkbahcd13lrsf489zrpsli53k292fyuko1g4xc40k0gzc9ctqp4lv4gxzagc88sh5o73zi19hby38rtlrqobpeehulfijbq5hqkaj',
                        latitude: 864.80,
                        longitude: 985.09,
                        zoom: 29,
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
                        
                        id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b',
                        countryCommonId: 'd403937a-232e-4cec-9a46-6024a2633b1b',
                        administrativeAreaLevel1Id: '5fd585ad-9060-45c0-bbfc-32955759ca56',
                        code: '4qiaym9c',
                        customCode: 'qqin3xnjm3',
                        name: 'fy6kods4mmk2cnhqzkrksqtzvod33hrfmuefe16kemle8i1qgoq8kxt1lv7bd8nmp305zt5hc6wgw5h7fv50dfse3fbsa3zgrvfe507tye7gwofcwciwe38lem2hrkn3nw1cr9t8f7o8z52zch472hh9fy6fs3ncbq24yfho5u7boncwjd99p9tfx52lpfzuof5cjv813k84nhwe9hc8tostnugpgbz5n7hm06x9wz6e0gsos0ev5f65t3il66t',
                        slug: '5c0y4wxo5srxiobg1zrdaskxv7x2prayb7kaxtitxkf4rphzhl5s7ngkxpgq4civ9xlu36g0iohqp4cxtnzyc452ih5s4xl503nt4iuliny7b7seokvmlz4e2gjtryjy9l83tfrcfjijvad7wqdjupdkew9p9tq3ywb49l7kt2cdmaicb74dgux4tg4fiip5v8k1asgowuwbkhsc1gnrn0ybx20eadd2a1jwnyeagh65lnrhqeznf0jnwhr0c9p',
                        latitude: 834.01,
                        longitude: 497.24,
                        zoom: 19,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel2.id).toStrictEqual('e6b88abd-856a-4798-8c26-3a53cfa9a22b');
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
                    id: '291a2185-b66a-4241-aeff-e56ffc5e7bc6'
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
                    id: 'e6b88abd-856a-4798-8c26-3a53cfa9a22b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel2ById.id).toStrictEqual('e6b88abd-856a-4798-8c26-3a53cfa9a22b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});