import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IFlowRepository } from '@hades/bplus-it-sappi/flow/domain/flow.repository';
import { MockFlowRepository } from '@hades/bplus-it-sappi/flow/infrastructure/mock/mock-flow.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('flow', () => 
{
    let app: INestApplication;
    let repository: MockFlowRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    BplusItSappiModule,
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
            .overrideProvider(IFlowRepository)
            .useClass(MockFlowRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);

        await app.init();
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: '786vdgv09wporgvs5xze',
                scenario: '75mcnar81rc1hqb857u0gr7ldto5hy0zraxf5ggsaz6l3agdvbnduxfrbc9g',
                party: 'w362fxf4qz7ol82t0al9rd8nlgejeak60kfoknv4jvbkns0wlt3seb6bc64qkbiahkndi86ea3xkic38r634qkjixy0ggx9ivus30wkauefk1fuqigpitg70mltgko6rzryl8lqzabeib9cw5t7d7rblgx0vd8i5',
                component: 'xy6bsj0wb8gc70y59v2lbvd0zz4qseewvlxnv5xs49rbau140srnqjvyf1tyi9vpai9rt6jl9rpcp9t4txl2dmmd4rhihd11dsoqfveg1jkmchqtu0i45id3rqm5ewy10467buby31so0bl4bq0r3atmaxwslc3c',
                interfaceName: 'mtf5wwq838i1txf2njeid3yf6ff1k9hqkv98uc2scu3bt3ghx38g88axnzc19g0umka5ino5lzxvnyua27hhwtzm6av283cn86yqobxffg72mgr1lrwfci2ne31koq30wnjbuszkuovh9hk9loey8wz03uvu2lit',
                interfaceNamespace: '0mm3jmlcagfhzw2z3gctjhyne9yj88d4513mj7eva6in67w0wck0tig8wb6ufs0drh25bde9v7t0fbjxacxcesg8u76gway7zulhybfw6bqwjyoc76zpsn551ysuwua7ldi1cot4iswnxmbmseu2mghsn0c4cc7i',
                iflowName: 'qe87jrbdijzov7ch77gpb6agg6ee012ks2pvxi6kwcpx5fbjsg6tryii90yb5bl8wofmwft1evoh8eu744rsojsjp2aj3uf3v5qypv23t9knvnbq83xnarumtcqtgusclfjnbhmgmb7nlke8az6989umkpxm5bmp',
                responsibleUserAccount: '55xwchkmgdp0l9cqk5fa',
                lastChangeUserAccount: 'cd795l8zl5ocea5hjcfr',
                lastChangedAt: '2020-07-06 15:59:02',
                folderPath: '0axqluj67xy221ewe6r8z2hwfznb6y2rnxaz8wm3ux4ws0nlz9lnuoxgnjtp5akif5g5a9bvbwknxradzm1hhna4do44nlwm9pbo25odoh7799fepsnzoyyb7lggthmcmzv3tqa12fzkm4ovw76k9e8nmwhnc1ohhygu4z7ywzopaaalf978mtloq26thxdwx3tqp0wosopk9nrg82aidgahdkz1e1y54bm8uhq71ekv9rvwij43sw7tryekduz',
                description: 'qa2uq0aufhncnzer5guulor1xokt6pfw6kfc55qja1mamcst7rg9z3v4iaegrsphmoosciub8kyuepz7hjrsrrbl05z0rijt8j9ov5y6rdnaqia00112cdo2l2i2yxcgz0bw4ikxfm5rxfuqw3vgkj6uc4fm7zf5xk75xyjryuy1cfhjlmxp6qgkm9bwo7w00bzgn4w5jn1eosel5zjxp288nbplxa90xiaa3mb6a0ennq2n7poqyrz8ss009al',
                application: 'excmlzf4nnswbxgbwubrjiyf6meg63l9moxx9hja6n05rbzu12hmcx1y4ssi',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'tm6uooo9ubyr6wn2edtl',
                scenario: '7wmr7qie4vd6kzafqonuyt41g0vvkhnp1pe964y9phnxbdhj04f6h82snnp4',
                party: 'yg9f38gv5hfj87xiiyew9o9n0f9hrbajqyf1gb6xtluaxb87019hmnf94eyoc04qy4jwuiek7ig84j8tva1kif6grrlbhrf73cyny1zlsv38mn2l0eu5rvxmnmzpp6n19rn8stvzv6os1917qvhhtgwudndwt8bq',
                component: '9hnej9intqf3gf01kqr3tebztatw004upyvgl7gw093mwcku9ik4jul7q8n8szdzsey2skejjk8442ocda3spgtqlmopq22bjczfcljtwg7681iz6v8tabym02b6tlfjbedarolfkefieekw465qjo209x2jxuuk',
                interfaceName: '08pcdlzqfziigfnl0o8n28h9oqmciixjhpa1zgcd8tzb7bhpgyz73jfx7be4e3nwfthvwad21zyvmvm35y3nzzy3kxmtorw6sf6543sm32xoy3li2dj8bd55gkzcu2h0e4t3vh486vi8kpnluvt1753yifvcwit7',
                interfaceNamespace: 'v54omlv24aybm9gxits6pm8f0zhchk1x4ltihi7mww1i6kuh2tyu3zsxk6pek4vm0xkzst9dywj8b0vj1ce3esg6kmi6f6826s7lyql6pbd9myomgaj7hoz0p5impc21unsiivoyc48ticoybe2d8nve14d6mti6',
                iflowName: 'bdrpj5jz27ow2obq24amu8apxg04zbqiiq956xcpd14pjxwv039sik5hkl47g3keeash9ee7ngetx82xzfg9dwdnp8n41hls9ar2qu2uiu6q80wskmpehxt06haz1ypn8etjdy8hsrr2q0q0y7hxsqb4swbiszpa',
                responsibleUserAccount: '517vbyitub1vtrpa49om',
                lastChangeUserAccount: '68weyycyo25jzwzr0q63',
                lastChangedAt: '2020-07-06 14:32:31',
                folderPath: 'rb0ku477y0ye1z5s1yn062083i7nixda32n3dtwyvw0bba1e42hmhnu7bnsosvkfoc3lrm20qi3ocmxy24939atclrwmmd06fztprb376fx7zgg4cszppb8hvqrq6j6bqn0thl8jarayrmdvlaibl7aur8dvnlfgzef3jrjfv8mipipjtdgufnslz1ocprwut188eob5w8gxqv36v6jlaeki5q3da2pc7287owejvys6jl3pd7e2vg76luvr4yy',
                description: 'wppq7nz3hr834zeav9qoegzk4al3a4wapk7albfunpbic79k1edpqh1op19rtyo1on2wuwiaye3l7ppbzxexrjfdgtsgz4m9kaf8ccp6cql92bmuh8ygnnec6bb5e8kg1cdz4r6en6lssx9vnxfra77ix4fxrhnpe4o218sgtkc2sklae8ib4jpgivwoa0noaw255jicu4esoxzpqkxf9v8rydeah9pawvme1mzjskofmhxxkr1zfj9dvarxxny',
                application: 'adc95q4w3avi87qccn3xfk3qk6y6dmgxpqljz4r4kfg153eeq9vyzq2zj3gp',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: null,
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: '9c7opwu42idlqz39ruyb',
                scenario: 'zkii8qlqlbzvhap0fx4h3s0btbpgvb7cva2r4kk37cxr7z1gzg7ep2g2737g',
                party: 'epjqwm5dk39h1vmpg03qnf5r8jciuggurszdklyuah0t2nhw7b2h0trw85fv4hheuxuipnofn97jc8ht1mag6uyyd68bxynuu99xjlhipwmcfsdo8m6y40tyd3sgby4j14z1n5ha90upm1ldhp3e04wgqotbjray',
                component: 'bmvt55ivo0aygqxyd9p0ve6rt1hom6pee59f8iltofh8juw73z8vxeaoozpejevdokgulyn8e43rcgcxmciuzwmac6xkibhle9pbk7p5laf7vfg7ng200yn647plqjwq6ytfha4mp2totwx3o2mq5voed1jot786',
                interfaceName: 'kpxsvjegpgjygb5aa04b8lxaisir0c87bipa73baefultoy70azdos9wfawek8kst2xi0dzfi8z88zaljsazjtn0pi07psccfanbqcqtesml0scafitqlaw6u6bpnoix3lzd4unh2i8rwx9u1xmumhwkpccyhw0i',
                interfaceNamespace: 'dw8n2arhpz7arplxgpbc24y0wditbe8rbjdr49zk5lj0m24av2oynadkkqhpq40js0psj2991no1ooxj9puscwih7yz9453jcqejbc8qthy49dg6sqvk48z05mngnmzmoqd8gn6buqm0m7u46dggw3hc288ff2yu',
                iflowName: 'z1moq1nf9f55c2xenzqmyoutnj5t74pi4z28ukacdh8h4mjlx4kf46ufods90ml0em1fu2u9b5qj86l9nr5krhk24yly5o3b6o04c2xtn4yl5ve10s1e51wfde313p4qarke4t1q2tfy1pmdzyu54g8v5ee9jig2',
                responsibleUserAccount: '77r8agfpgoe4wpldvxq2',
                lastChangeUserAccount: 'y7jr0pb6264r2jhyezem',
                lastChangedAt: '2020-07-05 23:39:34',
                folderPath: 'w1i67pyyfs4whw5qpfafohoh2nvp0pjzhfa76wpqxjnfxc5ori8063cokjb7az72gyc4qjgzqvwxuo1tk9grfnowwl69n5p1yo2hb7qihjy98h5qpnb5qyxyz1lncohicip3lpcygqmsawfds208c14mgat27lq4ufx3cv0tg7yaa0hq3eo5630uid1osnzszhowrrbskbm952qheozbrkcx9rymth3yf8tf5o7906zoeh9epazhwmn1p1yztx4',
                description: '5pogsqz9ld2bu26lnk0i9nyur3ln3dzxkhumdxj8ck3gx41gupe356ayt6y6duoqtzrzzss2ke4g3lc2lehl3ojb9yog1w47pvkvpi03d2a14xw5g6bb0cwoskc44dgzst1jkne1q871alzg3v1twiw015czbij7emb81w8ff5qi2o6161lb39s7jzrht431gkw24vip0pdl9aiwnm68dumk60uas7ktgvmfxn8w5bzwh9i9q1ydpli8nr7z5yb',
                application: 'j1z2qt2bhm0ysczc9few5qltwgynt5tvkrsud0a7m16vradezkggq4hddpra',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: '7p3xvu3k8xa3tjxn3kpf',
                scenario: 'whbcdf4obwip0z9zaw4g66pyaof2bwi0nseuxl37fngoyh2stjhx2ve4iici',
                party: '5b4dui3ig0jgubo1rj6tk8x0fg8hb23n6wx4tpvw691ew72z5g6fpnspkoboq1t6ut6cykwa3s4vwq9ityzykcpj7ccdd4153knoyuvlsu95r875bb0zngjgtqxk98advju5i7x0s7397lg88cq345oh9sofgnlz',
                component: 'kbtwitzg08v1k66fa7mjckkjt48scbtms175g2merhgr5yt79dp6arwr5me3z13besqpasdh2jdfc60jwp9ld0ii1d3k7wmitbb9lkt3v0ogsmcmyfc07pr6uax8mkkzv1f10hx2qx5qk6d34n32v7tpyu96ayjj',
                interfaceName: 'w7wfs518ppem572m93r9mpo3fp0d422f2951rflndzt82072x6vnfke9qkhu300pdgh4r0k2ug5oyht4ejoxskn1f1tsh192xt6hqn7gir258izco7d3480neoq2mgkroxqbgvm5rqu88zd4n7t3rb4j5b31kr2r',
                interfaceNamespace: 'p4isubwp5j2hrs0n23wt4yh2dkrsk3hr98fk4lmnzlpiytgawfwfh5rr476j9xnzs4boyu6vya2ffposh7ieoc9dilrc5y2sqwciqdhjxhprpp0a3grrhlkzrh551s9rp4uilcbcx5ajp1hlmiw9t1o6tn8np86j',
                iflowName: 'vlkogllwnlsesxpgpsek516rydomjtmd41veayfzbwqnkmxgzqhpemvph821nlp7ye8a3v550updau5fg5dxzynpumsj8pk75jsyb0frj3gimnwgc08xb9uu18arcbzh0li5tirhgz05qytzdzq0uxsomu5njuam',
                responsibleUserAccount: 'ft0115qhq5sz8lx680i3',
                lastChangeUserAccount: 's3jdlqqi3b3son3ysz2o',
                lastChangedAt: '2020-07-06 11:20:57',
                folderPath: 'qyplottpox9ttp39hpaaz1wdk7xrdsyojkx60o0mfx5acrhjwz7six4ywx7z3lwdmy0uk30gicyiowlpdh2wj8vmnrgd8x8sb11o8bu82y8nolfvpcphniipq8kkt3ptnp4wdgkz6ygtd1tiavau3mic6nfbu2f5pjler8dmbahfimb5mdkfwnrh3hzvnryayhcr06pq90qwl7hbwwbtuq6pmx04z2r48hjjmcolxzac84opyuornz0rk40o0uw',
                description: 'xurfmzwvqu2dxuyaknqi200adqctxi9ynn271agpoi9pc3xk19bllw530cd050qokhv6dm0g9v1pea2sbyasmhye4fki0byuba5xd6rvh77a5psjfvwe3pg9t15zlji2kl5rxf13dietm4hwc2c5ifqfl35xvzzkmivqecqxx3ektulaiy7ua35l3ko3f41kjdhn59475fi7m1f10edor9lo1upovyzss4rl5yts6ule8ttz1r53q9muwpgk693',
                application: '4jvkhj4o47zavjnaiww9gpsb2xb9cd2nkf9duon66croiv2mmrv1l409kjxs',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: null,
                systemName: '0prrdotx8mw526ki0fbt',
                scenario: 'irz5xsyx7dwtkft33sltggo4yl498zpxq115bgsxez64mmrcyf2upmv9wklz',
                party: 'wibm9a8dk2qs5m8ejqb9xhx5yf27m5ajmg7jp56frdj7wv1iheiop6udsm4l07vnykvl32h7puvi1adwvxmvi4yzv1ofzceuk9bilr0xl7mwoqxw1w79vkca19v10m0ldkxh86wetl5gpig7fp0885527tigsx96',
                component: '82kz3n1l6ngk97ii6uafbwkx1ng9vm4k3x6ezjo62cm9k3e53cybzph283kxceqr6a0dto6c172wtaw9uev0z7d1psxb90whq502vi8f5r8e7mj2imiejdb5je5bfbzxb4rl6pejzczmkrhwkbvfppo4o8tnzcki',
                interfaceName: 'ip1kj207w6x6ctvxk90h9f0ov2targ9my1ihh2kvj06xgrasydf9dhbax60zma3z6du557422vf266m6mbvgx55jl6ttarkosan2gxnez6e1v266cg6ktvetn7s6kd83v4mn1unngwo92ql3wlkofjpyis1qddnk',
                interfaceNamespace: '39b48ozgklxq4op2leibelwqmzcde62uf8ibr73qpmg68cbc488qazflvbzuw4mf435i7k64mb6sctkken5vhmhq05bumdmfqx9snv7m7wc1afm6mtrpdkt4pbtzcakjnd6iz58qblhbefvkp2j7t5a964v0b3me',
                iflowName: 'pixodjk5hch8s8bpdu1f33tlx20a4o3oyubg3dxx5o6nfpfwmlfm9d3lqk2mjazg1szucvzgoizd4kvcx6kq2nmo3vieyk6yhpwl9e0ubtiunld2s6w67tq9h1kimw6cnhkdwtzieoy164wltp9t45k2ogmmdvlc',
                responsibleUserAccount: 'yxz9jy6f3pskp84550g8',
                lastChangeUserAccount: 'pvbw0bb0rvdf57y33saf',
                lastChangedAt: '2020-07-06 20:11:49',
                folderPath: '58tnglslnc3fmxlryauzhuf2y55ge07nw6tec302k2q3wizvin695c4avpdfr4ucsaz0gw6v6v22aawgqjlyqgb8zuaoo3kwtkclrn9jn4okz6malres2abc79cpxxxtrb82c4qjvhphlockmtdf8sovohapw481qs4dmdh6gh5ylwj24zuxwqbutsgyp6z4399xmn9wb1rd0fuesarjbk5wcweiapowriu2s7sl4m1ch86gsio0mag8cb6sml7',
                description: 't9qu1xe4s85mos7g8u8y3kzw5vhncyyb7q8l07mnu7mgo8fzqdiubctz1vzxituzi5ryyipdan2cvfjfe22fshu097xa54he4lj6ggqzzg2jv4mnkytbd4wtvizs99wh8357d4tlpxq37e1fqaqcyg2h38hfspxqwhwnnis9drzmzcp1rwtiuep4l27iqtbdanbr9o04qxvpfjn3zafs65zr7wuzv2lf018k5f6cc1veoo7511xnjzka93smyip',
                application: '2qy5ww30bqeyyecscfij143jq60p5apcexgznvdtzq8npdsedtgtkfo4fx40',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                
                systemName: '6grlxb6mfsv4u1airsif',
                scenario: '6y1bny29eu63u48d5zw63ky3qhp6gam126j0la963gwudvkgptxtcxchvdck',
                party: 'mlbzd9s2hgsrhelqtsyvqm2ujbnboq6d2jh3f8t1z47pv4swa27kr68ibuocoprvnepvrx599xnkufk4myifui9pjy347uqf4v2m7lk2ri3a63jh58cavqk91ljemdajnqfusega09fdssh5e57sbmwlox0kxar4',
                component: 'iqu6mndqchkwk0uiq7hk4zel1ympnrbvwkubwv99jzxs7motxg7y2nw6j7t2t9hs0u5szzlrj7oyy2pnmi7mq0n937yq8nqbjwp5miq5n6dtp7kew6q3sipk56qaoitcgpvukxed816bmn4t3qbu1uzxzdsuzdhw',
                interfaceName: '6bhwt964utarnoysups7nldz7ea1lyudictnrht3oopv8af1m2iin3o6pb2i01ce9bpu66a74qobo6e6vlgjp4jwn5li01n2vmrz6o0ajnvyc5fesbf21zwrvo18gm3336asf2coqt143xnv0q05zgy6iqyejvnq',
                interfaceNamespace: 'mg7vx783zhwh24ujvxpknphq5fv4hwx1m3qlwlb7rqalmoh18krx8o3vr4l03sahs2q5gdnptbcat3okjadoff0sl7hmcdekt2jv9fv4ojiqyw95clzi37zcn2j9ej12ru6lpun7bmrgwvgxqix50xk3wn8gem83',
                iflowName: '0omu72llw00jqo177qujhgr5u4eaqnic85ddvh5zj50v41leds87mlo2k4dt9mtqyxtzvr5esyy2qbns0lol80comcoxklz7to3fbo6bjfa7l4nlk1cssfir7jfft3zj3bm7galju0vtu4q1o8urwwjsc4w5pawq',
                responsibleUserAccount: 'vfs36udc6ep1hdltw1t5',
                lastChangeUserAccount: '4762pcefj7tll5fad8cb',
                lastChangedAt: '2020-07-06 10:53:41',
                folderPath: 'm9l7sfsd9i19u56esk9mo75ygi4s0aznaizp5all0u0jjgedpextdxmtzy7am5oqcrdlcja906zrrowooy5aibqh2tud2jdepopie2ixwd79n0axh500x9weh5siqn9o61ib254ewnmhzbrsocbkjg9rcub36ain8t30n4z95hwxphlo5epk4s5kquyfsa2gwxfa4v325ge7ih5c014ef9j1zvggcm2bxcujy2lfj6yb3kdbsdjpi67wuz0y8s0',
                description: 'unsjpxsxslfq2va4aji552ya2uye39fimo1jwbbf8413n5od5nlzbxvg33act7g35ko4q4pzep57wiqwv234kga7x7quefy7gb0av9pogacr9utas9yvc30j73h6ps3a0qcl9e1rktst1l895sk01wstl5o2firjosnowsrwnj7yqd9uhoqlas0ra4eb42a6aagcwlfetf8ckn39i7cmrvzpueds1bm1tf4ay7uu5f6v17j5hdqruc2rxn8qz4q',
                application: 'cxirrktjg0hewl9bkgdkwzrkg806e357sr9fgittaimf4s479rpgin6o7l0s',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: null,
                scenario: 'z4sk3uprwar8ruhowk7l5s7kcdeon4h5wvgiz9y6y5pw0tlgw81y3ev7b303',
                party: 'v78z0fy0az54xdxojwdtpq09ht4w95593y7k6oxo2h9zlzl2pdmj9do5d4z0xmj03hl6buz9lcqnygn652lex9reoguye6ntwgbdhxsw85o2pmupt6pdxlg6gtiigrz4bv6j5rqengayhbnwc3j1xqrimy3j3rmv',
                component: 'kg18x8f1aur3g8g9iy6mkns6xj8wxflrd39f839vuc7i9o89sutt11qrnn5ko06rfi6j2jtfs1f6w81qodqclpwxz1z2bc63iqg18eld9bza1m0tnbnj344g1yamxexlkngpl983gex553tn6kf2fc4lowzb6738',
                interfaceName: '3jlhr1kfch9pmt67gbxg396mljyoto0za7gl6r12y12m0h6wgtjxpmvxr4dqdn1c26ouw9rix31bs24ejv7663pjvtuztk8wwxdkc2hyl67nd4kwtr3yj912bl73n6gcrrb4x4wz0xshxk41mkaep3l6xethvhxw',
                interfaceNamespace: 'cxftwoqj3a3jcn0oiwyoqrn8belomqphuionqds7isxohc967vxvmdsdvsj4lmdtvwfyf37f24v0bvqu19s97eovq4hptcbgg9fft1bs2llyy5ogu0svfcamcsa63o5wkmghznpdf6dggvvb130xhucqug06ceoq',
                iflowName: 'ltmpdrqp9r4r7rx9ozb57y8fl4nlslh05hnrxtdooz80ng65euoejyf9x4ndg9o48prc6a6ugqz5l4ni5o8396808l8cz51nup6u92n156uxcixwx1ekqo7u4rxy4wy8py00i530qrkz27mfha0cnmlj6qztu0fg',
                responsibleUserAccount: 'wlx0x9j51fi6kckaz4vo',
                lastChangeUserAccount: 'vqyo6id8e3w2xsm2au4j',
                lastChangedAt: '2020-07-06 02:09:42',
                folderPath: 'iktzk9md54fin8pmjt5x3g8gn9ltkqxryimui83nncxqmu4thztadsfaan1m2l2h8d3svu85cwawkrcsjunmgzjh7fjev9uew5u43x4i9mbddbhnapu5pw9pbf45flzbo33b9k1k5dz3z3zstyupm4iahzhv0kr269p7vfxydczocdz05flk8athyufixt4z13v2559y6oy6rfq9mi0obyif4io4yxt6olq1p6t3p65br1y1rxmzmw71wjlb8u7',
                description: '402augy3xzkjglc2rvpaiq2c0ft1jpp3qc0eui2pq6qengariqbz4voap0d5iu7ovz4mc5p9woxzfd8cgaq97reqbekk08eytiyuzvwq3wazypr7fco1d9jv4i3niz2ea9gkt60t2tsxk045dobghwekcrpwopeqp44ac9pbju6l1idmlq4e33sh4d9zfv1066kvinh5ejcfx0yp4wpznov3qojhkjob5dx4k595f0zbs7w3xod7nrevjysjlb6',
                application: 'u57bbiiag6zvydo7fm9x2hybuwtwz7bcwwn3ftb3icrnbztbj5jp3bxmkd6e',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                
                scenario: 'bc9wwgatfx5w3k1cnw7qszo7wcle5aljbwdlr6k8hbpk643l3zf3auagmtfh',
                party: '8v6ne6tur4aekecx24dwkbv1neprkbfw3dvipt2w72b9dzpktp8mpdtyh525xhvp2ezybsca1nv1vh7lxtduav4qiugiatu00ydhvxeom0w4ffralnmvyjhxnh4xl0hxbi0xrldte7g9rdk4n38fyeb77dzg6wmb',
                component: '47oe62aactg2v2gv2i94dtxfxifzaj58mgog1fwd8g86mlzbj529qb3l95td404ubupgwg8cpgb34c62ihq8qbykdlkt6aar9d6kdw6vsmys0dxkvhuc41z539on1xsck2liho1zhcrba4q3gxnzriwiblwo9qsv',
                interfaceName: 'md1gu4g2thuostha7lyiozxo5whn9t6lkaracr1wjhe04alvcfnp2guow2cz8yzolopbfrqi2b6mvh8k12fbzhm21zjrjedch9gu5kly6tajx5onifwsyvxng70bed8fqqpwr2foddq60i8ygqpuhco156c2fl72',
                interfaceNamespace: 'djwlw9dy2e4msqkeov2s660lwd7em0fk1eckzkurimuxajumgl6cz9eect7wff5z7jwl9jyykerfjjenssnicytcg6dt16gbigeig53ekt2ggpjcb1zs2aq4fjfi0zv3cspqlgbsxgkin4qedj5pxkl8x4k0qf9h',
                iflowName: '3zcu843dwjy0jw0y9lj9o3fqe3wm9udk63t0tubp1ggoksq04hu1zf79zseyovo5he3m4uogt4m2vimzrkl3qmyj90k2h1gs37eeiw72q6zfyeb2a2e7o85kxoweu45vro675omuq1x4diiv7sfotvomvdtrmcsa',
                responsibleUserAccount: 'pthn0r095fpx89cdpgxb',
                lastChangeUserAccount: 'q32cy8uhjtaqgfjk7r70',
                lastChangedAt: '2020-07-06 19:17:28',
                folderPath: '1jm7b0i7h8vec9v9jajaxraiuyumw38gorajx74u28wtzx7hjpu0pw8gn59056de72u2g0ksb9tdng80dicnhg9xt1z4dj7iy7a0d3v2blra94ubt884z4cd0v7mv9fv1gj0gbscfox26m9768o8hf0lk9qy6wizqt4m2gbrjcdlax66ikoj7bhfdjl435bb8yc7bagkj1ap48gxfvjp25sdsr9bu9ye4fx9hqw00pr2hqh1cunkfo36ou8ohcm',
                description: 'c64m3hax8u40eq7eo5fuz6fsfq2pl281293dp84gvsg2jcp7qgatacbonvznthhqvn5r1rztmz59yxjl1kh7fckoy4mvq10hy7lhcaulqr3k67xgww3xytbfc6hc3dle1lufucvigtwetesa1slfav2demuxmjldqmu7qc6gc3m2vqlwulpm5vw3s8g9ag7nheeforap9w0u374ptpucljka7r6cx9j93dijnyr4tv9bmnj480pvqgptmrmqom7',
                application: '79btj8a0solcddnzn2ngvvim5evhwselja1gcmk6sp62foi30f1cxr72anl8',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'jnc3jeaoo39k3eq1ytyp',
                scenario: null,
                party: 'y6p9f3mu3v6zc59yl4ke8xzz5v6d20gsc829ldqgko2s1941ddhx7lrc289bwxogk7hi1p5cwxra9w84ext80j5bja0yw1dom55kdbpb67wdhhs1sru339dml55rt6ft8g16qhqwl1pltwpfxdvzvywfpvdptzbz',
                component: 'sr12rimzwjcn4rqxnlux2fpptc00xlat4lb0vniga6j8wjq18luig4nlg4x908txkn1w4uxr44g8x6q5hzh36wsqnbfygtiq49bvzqwpff08ywh5b0trc3bf3xt3adk89s6tragk8wbg0v3pokrd1dksyrovao53',
                interfaceName: 't7q4f1o5u65fhmwuuj2wapk7u7dk3sq46sirqa554loslvo13r5lorke7kk7arzwtfpgbstbk7ckljbj9ugqfu58985a7rgkomwciahumoo2cermclty8i8t8y0hsvn2h9qlhpxoobvwxsn81zol43hpp5wvch0n',
                interfaceNamespace: 'xypipk7u1o9rj2m000w2kczlnqwp1aey5gi0icl1begaq18enajf5ixlh97l3eiz65v6dzbnisg0dq7mm7bbfoq6glt8w1tvt069hviyxqtljyhmpkm5cn8zi56p2m2g8ftp9vohscgtnmo3h7404ygitqik8k25',
                iflowName: 'g681rk6hnqvepe0b54y1lmyc7j042ybr8buh74d2dtkjtja83l6wiqowxfqhq33vu3e3gu4uvkavubi99zwkiwpseijmi06l4y5fgadbg4pxxaxkim8if7s2jwki4hnbqonubh1fbli9apyjuxvpzkr52wset0q4',
                responsibleUserAccount: '2no2gp3hwh66yn4rbkl2',
                lastChangeUserAccount: 'iwrf0httuc5tkysyrlql',
                lastChangedAt: '2020-07-06 02:24:28',
                folderPath: 'i07gowlwkky6wouap1j4vx8tgrsuogk2t10l8j7whca3ygm98zsqnxhiguzlfn87wljpxva3zc8tz6n5xh5d7ikc328y9iw0ywj5h2fp9ypgu5sr08y2ljvjg5xn7yb9r5b5aamxpu8fj5h1ff9sdo1zxraxivql44b80f8y23544a1erdgfwdbet75akq1e7evg7c0jgrvkc9di06gnbj7cr9wuehnfnn645f3ea5ab7quz3g20fkp4j4gmboh',
                description: '4kyf5h6g68kups6ies7cjtdpmfjaqa4qkpx17pc77ugoaczstrx2nm2bzzd7q0l1z15hfv0ly62k20faqbmkyp9jgpatdvveybpdkhb7l86bgy0gvtno2gho1pj987oyhhv348v3nflq4mjm79csav0wowgwe7k4zy015rgivq93zemsal0me7huu8cc5b05541c4wol1sn0ozdr9g05sihpohuuwoosd7edhrrnzd0j7w2raam02zdyxc85g5j',
                application: 'uaui1diggvak5ac2l7khmop9qhmuveojduf5wspb9ewghlcbdgxkzgptpfxe',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'lik726sef45lkvlzlgw0',
                
                party: 'uufe4oftlyp6hvqgnqktzwz59lkwcj3702bvmexyv25dymcl7urig3uurrjff8xctnyufqfevjqutoyjmvg2xovgpkgr2ia3x2h549jbfrm0ht42iej6ozb62bx7junzbezwbdzi2401hkuwdjh2rq1h3qxj45ql',
                component: '8w5pbwvp7pklidzbdemb52ywh1pf57s90t917ohze42b1gyjbnpzfwmli7sboaavo58r72in0xv9601dlbrwa5rx3yenkrpwrx4fc2xey0nnjudaqxwh8zox1pa97nbqg8nh4rubn6miqx612lnxhhqiqpq30aj6',
                interfaceName: 'l3r1hh1z40ptudel9ou5r5lhjt2t4hamm13zqidudv5b8n0ifytp7kjul2up7alrbmq1mrvbtymc843b7hqd1d2x3rnow3xuard3q40qm41e6w4itpozkowofio91l8vtyk2p3cof6s95lpd363iihfl0j0vij1i',
                interfaceNamespace: 'm6dbtnl474nkpgd1fd6o0ofcyi0f4hk7t7gjhjkqch99k6uaflnhzydujnai8qm5n9tj83cwqjmotod1sct03zatg9spwqqvjbnbq2owizpn8kmpx6li6z9zr4hfwob6y2xjyfyek8oy4gvg6yqfsb0glhkgt8c1',
                iflowName: '7yybw6iouv4ksxtc8af5w18pulx9hjz7fl80xc58h9c2m8rugc5ry28mtf1gkjto837gpjlhxrz1f4y0c67w8urv3rcxqo02io73chbv4b2kfg83tq9rw2ssynglp5ez1s3a236piw69c8r3ptk7g70tsd2twko4',
                responsibleUserAccount: 'sreihiy6o937semst8zv',
                lastChangeUserAccount: 'ghpmf7fk3x4ytbqmftsg',
                lastChangedAt: '2020-07-06 15:03:44',
                folderPath: 'lquy21zqh0msnsvc9vzf9bf8fsaf7z65noo5u4j5dwqpom39u6ex9a44n6yhr01jd6ah85zbau3juknskw1wqm64d2d852rh1v1xkhp4rtxvzvd1ilkve458av2vv3sqx7xn9k7zhjxi5kstlu6t7rgt1mu2z20djwwpu6bdkritjqthjjx2s2emruw1vm0muc1cmwbt51r7jez7l7w8yf0rbmrnr6ohtpua5udwprue634bz0b92fi5gv746c7',
                description: 'bmbkj7ywei5f11g9n6ehvu6q1qfpic614pda947oo4plo3sf8krzbvijsnruupnnfz1a43i49ebej8mru8et82awog8z8ugb6oojiy640qmzgtrvv5iv53sfodx57f1xfpaq7vp2xs78rcvagl0gl0cfv2i9ti1wdhn5312x2hmcza5v37soe71qvnzxel00mm6g6fxphhmfkxiiqad9m91lv7diinf2q3f5wtu534qasqq7kp0kjhzmupyymd7',
                application: 'klw9wrbg6puykq4pw1fzuaz1ta33d7az8qm3ji5lyxw1mnzeppdff9air28p',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'lm108corn4bnyu91dyk8',
                scenario: 'anbdej3ptbiox23mtlf1zljxox2y2evpnhq8rm3austb7uu5qlpp91bw9r58',
                party: 'md63hwwt1myxt9tjkrtbzg2jhitgehlh12js2swlrpptu40fbprqfjid7dssm6u0i66o96xmlzgy1uuk4qh6wsqqd7hridaa8n8c2zjkhkaop0gjfvq35qf80enrtf93u7pi4k4yhu8c5olw3h6yjc9zejxwac8t',
                component: null,
                interfaceName: 'lfehno127wxi2aq38hrnokommh9wqoggvvmd0rsx199tjjzcj52ncu5pe5kcrs7n253m1qgi6t6bi7midvdfik5vog164qu3iirvk5ptr8tlbq8emgtw8iuieflhq2phxq97egivu8o9fcvaew4drpvsqji87sos',
                interfaceNamespace: 'n4nvxw38v8pz1dn43bvji5l93gqewnsrlcubihc5js9c38eovojhkvdgx3l1rewisbr6nghox2klmgyhptw776d7tqncyn4ovc3whqor3g1d4nfig9cb5vyfbs2uxnwo199obcp7igj1rpowr0oq5ypzm0ssay1n',
                iflowName: 'h0r5czz9fch26xk2hkymze0c2dpzw0abr0124jegnl1y3xzfrdgk15cykitabo65xyvnugsa75fh7ocaqbz1q1eeymgi6q5twnhu13egwadulkie75vib60clczpuqk3e6ou0lulgkw1qzt1hyzwj1zlpea1olxg',
                responsibleUserAccount: 'xg9ewmvutn62awxymx1x',
                lastChangeUserAccount: 'm4ohm1l56edfsglo71hk',
                lastChangedAt: '2020-07-06 01:24:10',
                folderPath: 'zppu62ebkkxmqtj5g5ipc0kr4zqu43qsesfbx1y4u3ximzvotmyaz82et4uvaq60hah0tl7przsyu3huwhnj3van4oxv7uj3ycpl8k1o508hqjdgeziml659a7b6vj7x8wll9h53iap6rrs2xaihb24c7y06txre8299bbntwc1zjyfrcyb3v7j931ycik4vbn6yg72ikuc4xdskl8fnthwrpegclmi8bddpk4zmkrucrc9y9u0br81kfhxbxw3',
                description: 'qztt1atpw6ktvu4ani2npqmsk10xa3fae7juq66ut3562v577c5s49lf6rgvrc7uid48pco6w0dt9ajgmma6chlnssf2l4wepzm0cle94qp7jlaq6l5f99qbpq0oh1qzhkan0nosuhjkc8gh64oy7iki54us1ajotogziqqiy4q0wmlft1esucmepcghnc8w9378ffmy0kpqsdqz4d280dfm3zdy89rfzvuzxhc4xz71jbuud2gh7ho73hb92zh',
                application: 'zd4yilgo6ofbk6i0ynv7y56lpkq1o2kyrvhndoq2dusy8orrodhqyxalk2ev',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: '36qij2qbevdnbk456wck',
                scenario: '8kosz7cuh3ax0jjg5alju0jezlrx60xx1h6d3rejays6z3102cw8cqra3sk3',
                party: '1dmsoyw7jctb57qpqt4d16n4124ztwnj0bw8iisp555wejxtlw9lpwp9uu9wgqirzulsvfzzk3wgokgmyh8qv411jwjaeav291cz074fq9azic7lex9t8xzph69je914by4u6xmpot999749o746vz3yo1zk2k7a',
                
                interfaceName: 'a1r4uietqyy44qhpge6kzzd7o9b6njvydilvev7mk4nyvltk4gdqnrfjk8qaa7xzblb14chv2jmclgh66in9ygkgo1ultho97bga7dp9tdrb6i0b6muvx116cjhldmt1a582xpotawqfg1dajpg5d2mrkjn6eva3',
                interfaceNamespace: '0gtciwzvv62895ichf2relu9n7ool6r0vtsb6v1rl4ys8ujxtuhgg0qliq2xtbvjd2eghotqrjdzi1sg1nwql0ahfa3eg22lq18eu2aqvaod28byfg7r52w5nwxvfbyt1i0w1owhhgrxn8d5s02i7mo9f50dthnq',
                iflowName: 'm3y1nwfvmsk1l5m3rp7y21zl8zeegf3udbewoorg2b4f64p57w4z7nk52ursuj44mknz8va3wz0zqea7ae3dl1hwer7t03v7wtq087ssepu4boz609m2gaqjy29xohnvu7rqruhjnkhacekvgs26u19k7psflotv',
                responsibleUserAccount: 'v69lq3u3qxrzv9w3qyyx',
                lastChangeUserAccount: '6td34lu67hje3c5bjfpt',
                lastChangedAt: '2020-07-05 23:30:10',
                folderPath: 'ck67e8stttsm03nziit51747c82tf266texow6gd7y0dq6g7de1tcjjj79mf9yg1wogizuyacqo88krugyrnsuite21qu351gwndogjwddmk2j4ezu0zchm8oka13klcjjqc5nw4nqhdi54jtq2nzxza62oc195j4d9bu4tbisv7nq9e880m8p1obfqvspqicmtzo48shrilzpds3fwe2cb0aoe8o5zowcmj5qntppom4b83812nmyl3wajet6s',
                description: 'ihj26j16kqxp94qimdvy0ouhnqcc316h26mtzadviyo1yt14ipz0ryvxcwqrki7tdj7foxuo0zbe116nnej9zrj3i8wqgykjg69onb1vl20pq4s46z36c1kqo71s1093ul9zf1c9lic4uje5ies0l0c1ey70tmg16kdpjb9v9t7gmcki3xh3d04tu9m4w8qpupf1feeuqw318u1kdt7xjgnn2k9fogrx7rk2hmja12tvc8ss3ekjf2m22ej0q0d',
                application: 'mz3fvuh2s44uzk0lbbr48y9j33nk2243fnjxfolkk148krk69s6cnh0g2cwo',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: '6ndil5tf5y641gkj2dy0',
                scenario: '3j4vyaklafkn9nz8z8mhqjm07gvmenwwf6k64utv4f6p9q8cwnvyq4whncsd',
                party: '9q33seranl58tgzgjstd7qupxq90k8e7noycljgrppx9m9o0nfxwigixksp68y8k35aif2jwu7kk3yboeznv9mqbp67fab41vcg0xvxhl3bqmdgm7dinm0gdt5eyo5x3bce5bskpitcz4ccxgorio75fvux0om5f',
                component: '0kbvh4hhn0doyp6kccili8v97xuarsfmkttigat84ujrzsilobsgeyrq9dtk634smuzum4wlqffm6f0by9xx7i278iwwoxnb3x96tu4jw5tzd8z2w57vt1c12q0sjz7oyba9noy9jhm47cjb7mpih7dy1o4l2hov',
                interfaceName: null,
                interfaceNamespace: 'b8ep35zab672xnn9jua2ggt0onrbbj5qwf0cn6joqil9iq7cws0rwj888ak0a3eweqv1c1u3e503js4ozuzsze386hoqvdrw11np8fizepin9s5142mm80nqpqbhpumlzsdrd07ktjq5n5mr3m1680pyze2c11wj',
                iflowName: 'h8wcm9h4ahrywhjj3s7joq0f7m46yhh87z6jgjj1jtwapkrzaagj56id0tglddyhsfnypgapci3u4nnynpkxd2e5yjbdjwhwbzuppd3a9p6ig26onnkjmz92yiix4apz99t7cgnhkk01fx8692zjhz2z0n1lct1u',
                responsibleUserAccount: 's7gs0y9kus8dalhidwsk',
                lastChangeUserAccount: 'nmgm28nz2lknl71vovou',
                lastChangedAt: '2020-07-06 04:43:41',
                folderPath: '8196xcaafzqy9570uisrv359id91fv0iivpht7td9re667rp38o0zyqnfb3i8u4imqzdi51lqxjcurd1l3kctvqlpng69sf6arquvyi18t9scqqjq2oz4rqjvajgu3s1wq3b89h5y8a6n0yeqdjnz5t5nsjdmw4vgna239wfheqdltm26uoev3oj0osbusobfbxg21yp0gfrwurbvqxjc7x32bwcljwtcdazg2hdc4tt17867dg75g1sdg2lf8y',
                description: 'mafasg5nn8xn3c8ivv1ykgkfvl67q71ubvxsx99q148rgq72vq0b6suljengfp0hl79o6a5cbrz3f4hl3u0o8jh4azrhrrxzn6gzgl0dqils9uqwiena262hiq22s3j9w5ow8w69jucxs9we2jwxyocslq0vz9jk8e9s0srjoo3991j0jk87mtgd61moqebnp45c2qsz98yjclrrpbm252j7pjrpu8jgfuunmva1k84r0x891prrhio4bamucae',
                application: '9n78xbkcgqtc3p7u7m0dviaaqb3b07b0m30740s5qej1bh9fiueydtiumi38',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: '6rtxg5q58w2xd9u8lwk2',
                scenario: 'sws4y7guu3b9cij50uq3y6yk8v4fo79a8dccv5yjif18957srl2wam5w28dr',
                party: 'h6rkeefxwg12bogayy32rh2gte5bkbbuoaq4hbenil6chy4wrefepuxp17xp8v64jkka4v19itokfogbaos066uqie25ct0eeevkm60qp5cwmtw4lvy030b377fhtgoncgo16n2uwtinedd0oeviqmcenz0ect14',
                component: 'l924iatr65zxgb778mkr781ecvbe4orha1mzaleqzqaeqpp0xpmlqkypxzjp22c9ckhk3sk80zs80jkkks5s01aekvl8zzm37clm67iun5jrge1yjf2kpy936h4yvg592pe7c1347aztgyvz8y1gzqx8shtuhlya',
                
                interfaceNamespace: '782vf0kzt0or2o8e6aictc902ym78w3ztr4fos5bhtcnr1wcncjwmn304u55te38ke2kiz3pl8h8nmsfptrdaklpwdkhw5rt197vxmr1xvm1dvrku9425hcyponoh33ko3wwbyp2fwb5gvfppspf0r3nzb3hwecp',
                iflowName: 'c44pncswf7t011c5zg62csi74uxddpf4nsi9t7etie1ivf5p5w4rpvym72cpr89lvrz9mr4abglxk16saxogok7dxn5t9dujwhuebnjeolpijyvi4cj169hd53lwvhrko468y2y7yv4wiw5kdimwfpv4uq399ump',
                responsibleUserAccount: 'tza85h7n5ucumor3kskb',
                lastChangeUserAccount: 'e3jydh4dlklvfzk7txm9',
                lastChangedAt: '2020-07-06 21:55:27',
                folderPath: '270o3bp5367z7uebg9vxfbqe34lpsyly05sok764d9x69uwug0i2msa3qv41g462g9bdy2qm9hnhsfy96eau7uwhmgrmsnqen68av8p6d9m7sja723ojud8l6wyeemdz7joxayfvpl2jbma4gu15flcga3knkkha3wg6kw2fj8eotjut9f653ow0vkbk141gilw0bppw1x8w321dav0hnwru5rrxu9ayqaffbw7s67yvbdxvhx8y25g4iojzq16',
                description: 'znu3pcp4g155zgxwxtu5ffwdhcb4c70f4b9ec5z6g4kdc11y9z1fl2aea7njqxpu7y4ou4dnj607bfxoz1f7x5b4r4iak1jdl8cqtd8a9slofnlx3fnhbxpfwtu9fy5oj236snm068efszrrszrabgn1h4d8o5fnwyfjtxvplaj88es7ktzv4muhyt3876l4f7ha2aulkjvzxr6csvy3r1smcz26regn5luv7xony1sjlf2lu6d3cmjit9qbkjj',
                application: 'adgs401zi9glozyiennqap43sraykge4pjptffzawfvmyc0ueenpyuftmo56',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: '57nsosmyqasr8ep0izut',
                scenario: 'ofuln7ntl1n4khk3s6kt75pxbbd986cbd71fjjjemjwpexwwrxcr8a6jv5ft',
                party: '157vesxqccnfmr84rch99g3j94qzerueo0w3sdg02hxvmi497diwz8w3rjm2471hkag2b5ybbqqvw1p68vgkvv4bareodubj7251da0bxnorxq70ypnx1qjik67xul3vfz9pb8nr0if5c6fjpsq4kymgusv2n6h8',
                component: 'pdy8krp5ekm4kcyr0caphgv4qzxtfkow89p7v9tu6hucl6p3yys6h94mnng9e4kig4mzy2otpwz2no6jab8orq5lgl5cfdwdzu58nc6u0zwknqca5sy6b6k6ivrkfto8sfn3tzsn41mma0w8ad5bvez0heoj7ibw',
                interfaceName: 'kgs23pxfffjq9dsw6ujbz03mztjw6t2vo60j5nrigyfy3n1d595v9ra7n7alanringtuqioo9u6878524rld3xfy5bq8299kbvclwylkk5gmnlhnqo80qa1784ff06xxmtyhd11dh67ghoskfvzdodswwpq2p2z6',
                interfaceNamespace: null,
                iflowName: 'm1l2jpko9w0q1n9c7m57sd0mm7xs80rl7wmfijl9v4xqszwim113u9lb6f5g6kg9uge0kqkxkpqnznvts50d1koyhhhpdmm9hblwik72skurt2lw16arfo90zay4g6rreo3kc1ecbvxyidy1c1dnop4wibke69hu',
                responsibleUserAccount: '1bi85qsoaet13a6zz8ud',
                lastChangeUserAccount: 'pj6aq8wuikpulgaule5a',
                lastChangedAt: '2020-07-06 03:10:06',
                folderPath: '9sbc2d9yksldmzfi8ox2986sfd6eq6iz857tanmwlf01squru5i44f3qkut5xgjsatq1rdy7oci5eupisbnsixwlsco2g28b1e7bogh11l9wwuwsl4bv8im2owrl6wbxu4eceja667fvip5hcg9xi7pjtiadxgqz1xxu4rp0mnfod9osko4vgkbhd9qw357af6bsqp84m5hsv8mxqpemfr830hz08g9j3h180lr3ikn2qrtl2me5ylqq1y8pxhc',
                description: 'kojv2ixf3qqmm2aef44sup0rcg0pheadjatpezexx7kne2y6ji5xek7icm47pmksyoxo102qw9melhcoutjmgtsopjkpvypg54e6r6cwo3hwyczw9ka7gizcqu1eo4qpw50trqkzu15rfzeurcj3f9glbnb1zbt73dmo2pk3kjdpif7j0r93b54xdlsy1t9fnu1uks1n4mchqlb9rds13rxe5rmuex05gje2232q48ag5hfisyayemig1pv4rcs',
                application: 'gby047lbzq3ynou8iwo5pknxudmi1kd7mgtlfjynl27nti11yop62daq6iqq',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'cz5eashcmoe5d4oxcy7k',
                scenario: 'mh5gn97igepoxtnvcpkadfq14bvfr74pe3qs0qubrm2d9orwjcwnoax1erld',
                party: 'n0z7q5qtaguwgzzhyc9boifbc2xca11krylzy4jfhxppohbdc7uo5qje2h58tdtmzysl2lpwekcwsej5ng1928x2rijutox7m1ididdx8ilkvksnhmwmzca84duxn2mx41dbtiqtwg92z9l24cfz0gfnx5x8an3f',
                component: '2668l3w6sbnyux0p71hzx1zed7plh9sa7sluyjf5edshv33l3bmxqjxbaij5qkxxv2xkwgc90yxygn0qpj7gaufgrqupow6sc2n6s6zdprbc2ghq4i2k4hwqg4elifgsc0pmk24cudfbuyixs2y31a9hyjwagomq',
                interfaceName: '5dp2rlig8f72y6eczq33fif3v7fmh3nzeizf4ktm9s3564tjt28jg8cr5derjgtvyqh9xmnk9c0qtsrntcqd9hz50snytcra5cvbdlm65lmz6b4pu56bgkfq23zkftxbmqn0p7sbv0eu9oogtues31o052tvpxhf',
                
                iflowName: '7pb0irnzocxm9ag6g5sbko6s56h2o52ukat7baeyt27gx3pmkfjnsicgn55hl3u5pvwwlrv1c8hicirfnxyi2k4efta00tl037eiymv48xraj4s3y1gq9ldkrs2x86ps5g514ew259z1gn6b135o98o1bx3cfbbe',
                responsibleUserAccount: 'x4782wxiv9cf8e05tq9y',
                lastChangeUserAccount: 'pfn3vesmk72kv0w4p7qn',
                lastChangedAt: '2020-07-05 22:47:13',
                folderPath: 'trsg8ls42wh8vmlk5rmyzg2updvax8et2x05vffg6fm76x0zkegiqjp7k33rxeqfoxfgtgd0zwamljx1oddazgbkf83jkj56civza3abrgfhh7ck96i2b8ltq4ij4ehj8on67qvw82ob3z9swiqw86o4a3zjp89go6oapk6zbu6jeavymi2f5j85u11qrqt2bbvmve7q8suvrsd8h4vzkr3ppmbzpbcjs3px8pzlgivyh1wrnt99kd2b999gmr8',
                description: 'cm5jcazue0o47es1u6lfy5vb6uk2pmrmt6mv28ds5qnj4nzy44tfl5bkp72qrwjlxvpb60s96n0mqg4qz77dtdhmwr3729h6x6tkhvuvqwcujtu4yqvjj6n029r2mfaqocn1wyzw2w7mlvomf0imv7vysne8l2y4be50bpzzx6ftrog44areeupmqkh557taorto6bv0q4dxg06wvb105dsdxu1c7bg5umxae9b84av0fni693xgrd66bu77ldg',
                application: 'makatkde5gvnlvg1r6f3c5qim11dm0o8wmmgxzprdykubeg0inokzbon832h',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'cpj3yo2dou8e73iy8b4c',
                scenario: 'xknwtb9nzzj7hjcf758zn07c5ap7h1j6jda8e6u862pgdhl6q1a930k83ikp',
                party: 'c1n899u1pj16h45ve0bsbxe4w1rx5zg4452nwj80lpvhs9nuo7pogcmk4m6ukg56t13k2nw9yzfv6u0gfehn7p1spmfo0h7awmpmg7h6r68w1zvfe20y6jvnntra8rfft5ex4lbxdlbw85ot0etkv180dgbm485g',
                component: 'usluo0vu5e413bb6my5edbd7dw58hudfgycls6fqwbmko590kukec0dfxyliqe1753dol6gux8bkj5r1ryk3mpesgqrlkwhctimyhlzpvsw93vfts8tfa7ash4o1d1nx739v6ns3vn1xm2xla5l7m6yzqo4kryxf',
                interfaceName: '2wtf3nzj0u1700nxxn0j5nozr57345jargh6s9yj8rrddu6cv31zmbqf8lyhylkzbbfchxttfs3i209s6h0n2qspp5v5w1q33mkofokfm0czul88k5i4gcsr39cr8b9gbdjv9irn50hnosbugj3aaos48p1zpiqm',
                interfaceNamespace: 'ok4dk04fsqtguuy22ew7974j9trg18n98ayii8cq7okh0dsdx2w206k6nua0v3241fck5507cd8wawk1iiltdtopc37iyoomvvrnhwjm1cybpncjhw25df4r9g4cmczq7uq11imfie60whbt0mgaauylg2r59msm',
                iflowName: 'ytwrsghj9r4ytttg5smim4xz7iu6bk13wguigtwyluptozyidv2vh8wdj3vv5s1jb5ixveo9wqnauktjhaqeqj7rfh6s7ox54qgy9xqdeiyuqc91cqh8i2ymwwlwqtza6372gvhho4uren4gzkblzlez59gov951',
                responsibleUserAccount: 'dxwbfp0tdyan1xotmore',
                lastChangeUserAccount: 'tdp10byw6qta5x1lktg3',
                lastChangedAt: '2020-07-06 21:31:23',
                folderPath: '6gxkh7wjzuelgovp4gr730qbazos49dkepcj0wpxefavzge96q1cqoi3vmr71u9ebd0hfxw20e1v0ket8h9yfm2far6rr6rwhsavfs5cm4p2wy3elhs8k8fi8n15p4ey292ttppvvckk1tf3bz2m1blspmx0bdn1mllcqqnt36lgtzrlea5ku2jz4xmz84vu34u9i6ax7i2th3jgt4l7eqclix1bfmseo9m1z5o0xzcnfj8jyvunzhl45lrtiri',
                description: 'm6r9kko3zapk9wfkn3qgc9toobhyo0hcdcunkpi4002448e0qnlz8mu8gxlttpk32ogl3ba1k533nwy8jbh7p7y6u02izejqpwg1gwy23w3t22hvlrbmxziag15ypnxf5yp7stqrf6ebpqlltuw6z9cw03lh6ngmly1s5ies74z0kye3fi71g4lz08gr1bcypge4dlajvde76opy6d6fln8pkxjpweggzpl2wolv54mhthczb12do0j66jqzhoi',
                application: 'vpouhzv9b2kl7manpobu7t3yleu2megprgl4bd482ir0alxdq7lnlemf4gy3',
                isCritical: null,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'ix9fnh6e0jovz9hb7gtt',
                scenario: '41kl7bucvo4yb63d6zyofmct3o0sip25559w96ogjin52hqk8iscxifs0vrc',
                party: 'vdhmbbxpirjo87rtx2pu5h3qf8q6m7ty49nk2fg4j6yudwm7nd07vcnu7zfsflko1kk7tru59s8rh7fm7rqt81ti2oe38phfge9cbzp1776gr2t1zu1b7bco3an83fibqnblkzjido8d78njuk6u7jpfbg9ixing',
                component: 'f5bzjrnebyy8rgaotq5un1dz4zzmkjnbr6wmzx34l5doapjupux11ebd6oielb8wehn2pkjavwjj8ldnhjcfa00uitd1x87d0ov7uqtm815f5l36iz2jdjw748jgnilbn42n4fkqefbexk2891qkvj6dhpqlf4qt',
                interfaceName: 'xn629lrwgja1glru7zu8ioc0suspzozgpmbpofih26hy2c73a8lg4s0025nhkm2c8xin0zx6bewszew8rib7m4osslgtegbtut85g0427ujmtgcvaz6ifb9easkluuetbt1rs3ls0y9efergkm6qxb0ay2y14jp1',
                interfaceNamespace: 'dk40085vsgvdfk4yt6ank1jye0eooxkt3ia4y3ikm7dv788n6lt0dpymff1zmd1mex1pslo2a30wcl74khm7kx1kuzoo4ww4m44n0wpwwjq117z0kfbkzul31kz6x69qjpguj3ajueu2a7mg6liyh9drmq4uwjef',
                iflowName: '96j6qi8lm3bo2761rheqsqe7xj546tndtx1cphoztqszido7z2vg0cgilexy1pkhb9jvvbvtcg88xseutpv9haeo9supkuotid124s8rq4orafb0ddpvhkrwazt512l4n7d2zokmdmt3q6v2kuwmosd15ucjyhoy',
                responsibleUserAccount: 'yfubvsvxex9yomyc7h5p',
                lastChangeUserAccount: 'attp56zgoc8mjlrshd1i',
                lastChangedAt: '2020-07-06 16:04:52',
                folderPath: 'egangutcjl0ig8ci7p6m17u1nj7zr7nmnjvc0da01m9u53bkkfsh4u8d6ru3gz3l96e6vmxertx2g46ryybmll0cwxcxt4dkb4wmctu5azk36hy0q6t5lbrtkblwdgofuro6x7f3nzzfy5nhlw6xmmj7sfk26k1omogqqidk4t51pjfzyf41s167yuabcxmztfx1ds05cu1by3cqn9g9k1udlh8jxdeshg77iji7vywr1ho84h36g4hn33xahrv',
                description: '0iws8l6rq1l1gdhpbbw544hqbqwtv8bo44m4nix1gpi62bcelqzxyp6ehpcq3n5iogga863f5l2116r6gypxzzspuld9wtey032vj6qf4n6doe7w9wxo15gzemkyzu322pdq76zxgemf8fqfajggvkmkn5etkjrxe2yshmizgsv357wmr19d2ehc5u0qecksdq4p5mr8xfid0gj0hse0mo1cj9jm3hvc04011hpfmx3m0p1j4aqed0w34y8vgxq',
                application: 'athp3pko9y5yd6ttg8u7nmhsm4tiuw7m66bqfwcex8mgii2q0r4grm1s3vpt',
                
                isComplex: true,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'b8nan0o499zwqffbw0pq',
                scenario: 'hzycrejiq6ovd5uiqz0ybcbnom3qbqzhadxz3knytdulz8lz6c8deg59mzuq',
                party: 'cz4jt4owuh2uvoxn6y945wldljsh0waf4vyu6vuelw3t3p5w2o3qk0r07fcwvzbyfjn9nn1yx8102stdupy7mc5ckcddjv83p5k1r977f14m2v6g6vcd8mr60fhfhi4aaabn4d3jlabiosqt0dh4t4p5q9s02izd',
                component: '9ki88c2sy5vtimuyj29i6cgp49afwxd140c2sfrxmgwooqftyd7f3ryhskwjd1uwe1rs57pobp0y90cvo1wxn8eorzmav08ytlts5a4fc6dzv3kkb9wblcf1kun3uudedba18bqhn87dq0b2qhoyzq2yues4hf0r',
                interfaceName: '2ukxa3oaua10pru8f03dm5ludywtu5o72o7hwiuvevgy6k7zau0rn1u52zn8ln4ep80ouxc9dyb80vbafuhqyudz5l3rxn021mrsd2vngdwzh3pvsnhtips4yf9cpj36qczaub2jd1x5pmj5urvggdeq1rw4h7er',
                interfaceNamespace: 'rilweyh8i6wmxw35irc47moqg6pfotna71odi3n2kis4ba75flxfj3wnyu99pmlpgpu24ewcwfeqdzwpjr583vna1o225s2venn5yf0ckwbh09fzx9b21nvdbz0slweiz970yxb5l65mncpj6odp7e6599w0btl9',
                iflowName: '9vxe3dpkt3n8m3bbas0x5hx77n8fdi6amyva5vqdihu2xuxl5hn74wa8y5x032wyy4mqj840zp7xur9gniy9n6wcbnfeus3xzxk8g5b01vvg2fdx1palg1s4zraz1o6zlj8qc1r42y9q39degco2kaoy17q2yh8f',
                responsibleUserAccount: 'uzgb9eghtsixpg92in1y',
                lastChangeUserAccount: '5qx9igjn9c0a464t0xab',
                lastChangedAt: '2020-07-05 22:53:07',
                folderPath: 'uu3d9a055sfea8xrrgky1h25wdvf092a5s09in68rkgzku8urzifwd1kk8qknn0jjzdfqqhuy8ifceg4unqlzjedblh5oaxhnc62n4by8a3l2oeclbeudonhcdqwjoip77u8491ma18c99x9krq1hxjztdb5ze3u0ba2gu3d397ro3t12yth0uubj5lx86oa9d9yscm879g8xzi1z70z9obcfvyitak9ua80eaiq98s8t8fhza83vob6jrrldtt',
                description: '7elbagxz44pksg7e91zsofyajd5a61my0o1azvby71pa1mbq2ixxg34o7lx7pr7aciofjf6jcfy5nc5epfegwtf3kdunn1svrhwwsuyqh5p257jk52g4ag7fiicdhqf8fjzpz042lcptupplf0e0cixl0016b32e4r7z6otby4wbmlkv01cn2kzza3nt51y9xdhigbgi2dib8rhawhk1gflit54w5w826wyiwyxwyjgyhpophs1qbm65i546iqm',
                application: '06exh6grxcccgp6nizdfnz7tujwa4tnnlwunvuyjy5a5vqlqbs5tyf8upjtd',
                isCritical: false,
                isComplex: null,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 's6qucxeoal5c6jwn734a',
                scenario: '5xrqa7l8emr6ytjws5k4tt12vk3owyrzeoqn26vz77zo6fnj4ehtgwvn3sql',
                party: 'vt84mrc4c5ovk4qz6nlbi7fh9bdtg0m873w7keuzh1mraxy0g0goxtiwkgigwabpcizvxfjx9q5yfxgpv64x14z3kb87p9qq9zlubdpx12pvefjyf0thiqudbe0kch7g8f58nsajbsdmem2tcqdmfgy86ghgete7',
                component: 'sylnmno6hdn2znfeu507ujtio72mq9n6wablmbhx1hsl893ngw8xd5hvspqw8fdd6k9oggtaqn5d460mzefotntpy40tds29xjh9ce80o9be3x6ikyj2v2a59oekn2mzz8axstc7q396km0yjbtm1itvcbewekq6',
                interfaceName: 'pqd47d5i724zd856ryj97lixl2vg4b39c42bqemhxc85ygovdjm0tamyd1mbnbcb8e0br7ta6ovdbkma1i7yw21msdcz78y8ukqj29hvu77tespzi434xgx8ldjs6hk5bmi3w8xq9a2feffarlx63ugmw8c83xrh',
                interfaceNamespace: '419v6gxixa7ip8mcbx4nszj8lmsd8sde6h0z45xf100kdyqnd77aaq6s4v787utoufddcwilrtts9ki4jg38mqib7a5f5lx3y828lpsljuh99s6qfinyt31fo7oydmjjjls10wrruf5ywcvbq4zlzlw6lhs5cwt9',
                iflowName: 'gm89qmkb61cqm3jyr26kk2u05lghc564ihvfyiu87ukyk2rxb5xpfi658ah1z0p4z5t6t0qm18mxp1cr6acyeclucafsmffaebvh9qv21dyqa39vrfe9xxqjs5rygzmsv3z0fgy6xbpyx307l9pbyuzcxqhy24mi',
                responsibleUserAccount: 'uln8u5s8huutgvkfxw6i',
                lastChangeUserAccount: '3ug40m6uq5dxhn5is1tu',
                lastChangedAt: '2020-07-06 20:01:55',
                folderPath: 'z4e2icufbf6swhz4p7w0n7acstfdoqllfudqlmm9vq1db82800otv12gn94jtrcpdds11luk7ywwnenojvvw8qym83xu36xenu8d4fddst46ejfavt2qm3cp8ytnljoeuskqbnmminalq7rwusg2eih2k69i3sh31n8lxnfq3nwyjo973rk4errjmgxjsgp7c5e2j7ysalhkh5q6nd82ta4s7hjxcjmorgmkd4r27he8hl15hrr4vwj4qnggokc',
                description: 'hrdu87jl1vc3nfxwominnc7shh7ftmqtwc1j0gvbcw489fej3vkiu2dw2grtjtfhtaz39djhfijr0l5mgxhygjnmrfn1ojh9p21od4qft8wz3gs2l9gh3h01vchomqlzybnphporeai2dx9yrjz47ym474c1q4h0o02fbnty18a78by89w3ekv4jckh3k49qqt8wwde8tcy3caq8y9hjn2f9ce6g69cssjrp0hpolgwn1inbcqc37kbzweexr4d',
                application: 'nbzzsooa6jqyz45b86t1oytqmo5p3gic8v9jj17d1vwpcpywrwckycur5zdh',
                isCritical: false,
                
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '9fut1hhc2yu08lzel5g1ths1lcbrj77oyp8kl',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 't23lqz6mbuqzrcuwp2rt',
                scenario: '9t3e6yi55t0a92nkicxsfyef10n8ytwrwb89hqgvafxobwufs9d1w1hrk44r',
                party: '7kewxsmyv3mpj5dvgi38qactzicojbmelarfeolvz8mmyo11r7g4gtgh06q8b7rj4v0n6lv8y8hyswjaschwbllpzt10q4vevfyz41jm3vbmsjbnuzyqeps02z65r6pzlojgb01gdc6j9pq1j5gayux6hg27hrip',
                component: 'dp18of3b3ez7uv7ttibs5uywxe4e1qtdfwzi4sycs2m525v13rlio142bayim8mimnrvaoj0czak8ynmc8ih2vqh06xdwg7vtkk5kh3zvyr1lod72vz675dflhof952wutxbsge1n6j68e211y6436afwzh7afip',
                interfaceName: 'uweadxx049nbiqe529obkhvchhb7bytbksmajskgowe361w7tzbk9qb742cmrgzttfmp5uz4js0vd86fd0zc3n0fluccccfec81clzsd7icrkd0e0av6qnhlo0prbkgzgysu6c4g0tm85uffhrnu4fiwyzxzwurm',
                interfaceNamespace: 'p4fyx2h2ywj2vzrp6jxcl4q4tti4lx40ddkuvqyyo3tz3aaf1c5cy0dw0xp5dkr7gheelvblsvxro061ca364e0xxx33g4pt4434ya7wyon60puszdhnmjma5pai3a6d8jogpjzwflgiavggmb3xq32nt726a629',
                iflowName: 'nglxacgze4gdv8nbvr3zmd0zq4619t8tu3tkerkudfu2rs9vke5w61hkxyp76aqzh5udyqk641lbb5x4p0xeg6w0gyuo2vcpxyndh24h9etz3iuid27xsg21b165lrby61hxvy6dd3l3pzoa5ipvfwkfuk6kvdy4',
                responsibleUserAccount: 'po8b4egwa658varbjqbv',
                lastChangeUserAccount: 'gmpr47dyotbjdi4fu0e0',
                lastChangedAt: '2020-07-06 05:50:09',
                folderPath: 'qh5s9l5jxvfbuwvufc1z2osr0urcxcjhhoqlad7g6e921z7tzzql1xmlk10i1fsog7tp81o4py2edjlxbsx5zia5y5xyqp2dtj2e0d6svyx6tiplyt2ububx134k7af495es4pgpzya205jcp47o31hv7z0f0b20qje91qmdvpn153bk0iluxe4b508s3y114bn2ee5isd9e6e645itveeqcq5a8w3u93ttnh1gtlt93xr13137nro7u572b9dz',
                description: 'w7ac1r4huy0l5j4bs7d2vsr7mfchmchkqzx3t5m7lige6o40iqxxrn17zkquj2yoq3e47ln856qgwneyn7k4dkg9v8z0jn746sbqv25ej5j14cu23pc6y5211x9d38ywnhp744t9segmf70s4rcte6gq9shd0d8up3zgpbgw3ek7ocn6ev5xpo6rj5hf09yiczuf537dzv1zjqwzbdsef5ipgbq47x29z8dxvdgc36ixi66g6pzwfqmu5y166yy',
                application: '2oij4ywyp030quj1tnqwb9ur5hykxgc9a955mwsqbgfb8nux0jqweblfkxxh',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: 'wro8ijgztdsdkr4sgwqxzlacblnf75gt03dmv',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'y0g39fdtuwpx0kecrsnr',
                scenario: '2sa2pkb6eb2v3wh9ka0zm3e0gmvp08j6uz477xq9707wd5pk7bq5bjalw4ag',
                party: 'xzkcfjyqlsqmbcjuyw4mnwp2zcbf89pl6d6hhi05jh9x3jztkgydwq42q6ijptl7koswo1989j14r1flbzfg7uojn90w6xytxzwckyoxfw7ufwikdcl0lu3d3hwzzus7xuffptq88nxuz0346d2nx54sn0pkpw6j',
                component: '1nwcijr83r81ivm28nrfjcyahbdazpbqa2py3ryf3yewt8bbtyu74kryxvi23xohjedfh74nq7b0ov7u7ygha9g95oig3w3u8hnz321wis82u5udjyikrk0gvt5xyejd49498vgbdwj0fcewoykuzcz5fjj8i223',
                interfaceName: 'w2p0w0atvy3qsz8nz9m3sv69h3yqp4ngorzsdkkdx09vbsexhqugzbomwiwixqiqj7kettjug8j4sv5a1z6h2881klnpt2clprc8e2i5e890w8bfoe72baxhlwd3whpb1owet776a144fy9bcbuqlox6bvp7pb2u',
                interfaceNamespace: '0ba3e3dbtleszrpk4it5p7v6pqo8cobwsl9rhv6h5d8vdq3v0x0lqaklv19fxzh8vd9cyxfu0ssbv4txc39s2bf6kblau6lftlurjxmkmioklhnvyo6n4wq7iv4a08b5jn5rz2hncm5j7kys2vsk8miu4nwajvfx',
                iflowName: 'h03op9p1om071od1bb5i5w3byxvmlwlimbjlvy1n3kb2h58r0xkhtbc5mior7l20d8lo2tg430onkzjgdrro0nfmgqibl64z7nmij7sdwzj16d262tbtnkl21lvzwa2kx7so3yrgseqju9dsndlxk2uvwfx1f2aa',
                responsibleUserAccount: 'ri3kfuob3nvxg9p6myrn',
                lastChangeUserAccount: 'w89sgv6e9rk58pj2dejk',
                lastChangedAt: '2020-07-06 00:44:11',
                folderPath: 'zdamqq9wxcrzawxczgiftl08w1dfwdeeumn443oda3rcpuh2xwp8dllsa9ihgvq30y5ome4agffxoy2qvwg2b96viecnehfkp1my3gwy9tiusj4bewv1pxqmtqv7ydj3jwn80xajoymnw69rilsboyn9d2cxs1qck00tusrpsdo2s73r38n41kb6yomivsjvdgid16e3euipdrjxjyxpsam0img1gmzow76e0pk4tt4lw92acpbt2tk50b7qfo8',
                description: 'qm16lat5r3m1gqt2t15v8mxieu7dftbuyy6ji99pa0yf2jqzdg7uxo9bp4itaqtgwkuop8glz7irelj98oso43fs2rdj932bb41z9y70ov3b5v32bok9qakh00v7f7fbbe6lk5tiaq0xx8xf9kluie6cvp1w4ovvi59g5zwq187j240zr2gc1pu8b64dkeibku8wxmrb60hasmo15jojs1qyqrslhu0asgooxxfavo7yl4m7akrmf06wmn165ke',
                application: 'yjfu2glhtjt92a4kfv868vyv9vg1n91kyqy99405udd9an8evnzknxj7s52j',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: 'hae5d2bosyfwop6ird8xfot9sgzocjl5bo28r',
                systemName: 'po13ew510wqs6su3xggc',
                scenario: 'p4a7jtl20d6ggaa86rj6g5aqjx5horddg8u2r2tlr32pzyc4j3tjiu5tp553',
                party: 'di5e4c4utnyqlja2wgiieztpez6uxz3zea1lh8j27r0vcyln0shidiz7tbf0rxpgh9kl2txxk7ofyxf2kl2d1l9rpyng5aydq82ihqbsg28g5uu5s3tgusx41jtfuc55gmkhiv29htp5bhuobb8hlt1j30xcahqo',
                component: 'yhqnku2kc1df2niin51xoi642rykvi0ct08n50v4dip6t3otvwq4pl5bzenp5k5ka0gjo3cted7pibuy40l5vrie5blc6qcka9pesi7jm1clbodcfsj8z2ka1trljxk2n1umdxy1v5v96ehqk7e8fwch48t9h5i3',
                interfaceName: 'o60j2oovphjmknqn93o5c6rd0zbfm80vjnuuu0frsutbtszvc496879e96a39al6wy156551xecd8m4mwa0k2pq982ioiqvhruq2ni2ddzdt3hhmsdupfjnlyfn4qtoq81j0b82mqtghzawovqwoj4edrj7xcy4a',
                interfaceNamespace: 'rfugxz23kc75crgah2s5n2ppefsvv8qv9ev2mncqe1gdys5eupg822lzi2v5qs4p6q9luqt2i8l4yonnhvllftf174p80azcydu8co0txxa0wwfi8vvod26yl2d6ytnsws4f018559xb344f2riuftq3yieoyysp',
                iflowName: 'uwr3iocycr3l10xrazgigyiymax1pn9vx9lslec8j55fh6f2c24ne5mdtowbx60jy1b1tfer60wnnxv5ub7m0p9p68aqsdap30l5ndnke5xu7iw1dcr5vaxvuf1kqzfv4lu7so8d861662gh4xvchprouiee3cbp',
                responsibleUserAccount: '9mp71eoj0mg9vwj6573r',
                lastChangeUserAccount: 'o05w1bc60w65f41xv2sx',
                lastChangedAt: '2020-07-06 12:14:26',
                folderPath: '3qacurp7uy22zfv5pfip8tlllv6ngffo5qio14cp6f6unjoib23q6549wez63okjzgn99plqn2pn7w2lmfu97ok07786ey3ojwu3j9bcc5h9mqw9y273mc32krxk5iag5evrlbu2bi7m9aao013d35malqjx20r0pjue0ktppy77puv4ewihqbq3tfjdykqhudiq8m5g3dumhrf697uk0diyhg98gdnr51pwiw9jaxjmhwkhk76upuym4z8up4m',
                description: '7pbn16pow5uwtabdzkqus39bzyaiswtgeh2xiyhd71h6lktvzyo05rvhjgvh983oln3ojj6pq6q0vhq54n849hdrem3w8tis5yq5sqdytde1u8p8i8rq4izfaaqahmg066f9gqrklqo2fkkt17jl0eh0s7i12u2liqrk4vdybpjwasqjg5pmz7tg6jwetffqwl9l4ted93c6kyj9q4uwss3121aczfh0cdhf41jsrocxqm8adlq95mqwa6z5pkr',
                application: '0lk6mdds3dp3xeasgcrjim3yxsvzr613iyrgvdc4nzawlpu0blq4wd4m00l4',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFieldGroupId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'uzc4rqmbjxxt67u45g07',
                scenario: 'p7ccc0g8zpci20hkb9oh5pw1l3q3h4ewvmoznqu3ng90hlgo0snxgpmwwzyw',
                party: 'bgy48ax3k0zn7aoahpaiswz8vbsyd8gk5rfsi9zc937uruy2gm8ne5m5vm2k6i7nsbgio1t0jh4rggyn0lvj5bc4hjy21pvrsfp41ij4q1j976mbwhc84fbhvkbtfoictm3tcm8vs5hpz4psjkd868daeq920jb3',
                component: '7b5e572m6d5bs5r5o3dtr2drkx0ot9sk8o4byacwe2x84dmcw8mekhbycxllpv0j6a9skowd15ka6u4vmb382r88qtuxilbe6afx7jql59vbh9iho8qi8r6j8yovwlsebw6440wnhrjvzc5f0vi6w30p3yf925pv',
                interfaceName: 'vx69fipzk3me952dd5qoxr7wrxti08ylck7s7id0fkluuahct2uptw2mu1s2vle65t2fcwlcfr1a81xby7qxtd5kisdfhc8llb768ymzlsf3wqpyf8zram7dobvveqroxcbzhzlnc6aap2bu58quva0pwk9ukam6',
                interfaceNamespace: 'fxoh12ooc9tb8areicwb9zj6jcp2yiixrnmlk8dhibdkqd2ehswpee95sqot7ilii48petufjnwy89i96951szrxy7tqahxnu9rqnji1rhuk5oqkwmhww7ne3ybdhhc1li0lk60x2ve7o9at5zqy21jn1pp51b0a',
                iflowName: 'dg1pyq6mdeegzxx2gmq5fjv2bytaaibeaiaojcnwvtfg2y1vca9xn6u7wl3z21yn3rr6tdtakm42nj8r0b0mgtkry4dykl460tz3vmimqstelampv7m0l8wo01aimj3aj5ybw8qo8jg6k8wsnckp0ba99zjcbmnp',
                responsibleUserAccount: 'h50gdufq7avwiwen5t8h',
                lastChangeUserAccount: 'zqkuse73981si61y6fjv',
                lastChangedAt: '2020-07-06 06:49:33',
                folderPath: 'xg8l3fd8ed379a7rvaxjuk4zseb14e3xomx80bdph3m8ffnzq26fcf4h9nsu953vu8jhh87ff4hx00h5dl4fk7hq5nxa1rknhh6um3qeb2ovuk277ol6af3em1dl8tm92mw537qz2nh0uhjo6x5gspqjyjjouvxo3ilce4qd6blhkrnqg1if41j3vy86vj45u4or0rbd65u4j91yk9rdv4zwjt0lvttfp4rrorb07eldxdab7ug6il5bn1d4c7t',
                description: 'umnam2tlb79jf9xhtmova67tsdv2uah66qp0w534c2hpqe4eo55bjytcw3kza2y8eswhoj16oxlnebyk0d3rs67mvbl04qvvl40wri7dt2l8fkp7k6era3ewe1iws6yvqhkak3go1tws5ex5058crh5hpfxd2p7ryb5fhvufx8bcpcmqvqm43kjkwseom6eu8ko58lxot0ia052t7rddx9cv4lhf5n48i0zju0bxitlpwkpgnky2h927af60kf6',
                application: 'mmjotqzvrjeqfcnxtdevh71oiohqeoedupzlikt686lp35lu1ri260yxp1u1',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'atbwx13ypctfsjwvo8oeys7nxytmzmfpridg1',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: '61qrh6mdckkwzbrsosixc',
                scenario: 'orohjzvvtw87tdiwygc42heup5qd42j6xjw3uiw729l6wqgjsnef45tt0uez',
                party: 'bycdw0l976dgcresx7jrqs06txyuxh8f7m3xcv20jpxdr8bh07obeluykbdw4y0kjc5sam8xm04u5kmof083h41nfxg3qc4gtdznxh66zj6qt9mlxor2nhvbi08r8b0gxopzevdz77l6plleyr7ua6npceza9jrl',
                component: 'attwg4gzo5xdh2nudj3j4jeiwa5b9yezljfne61x5tohfg387pbzgnygdzces5ce7oca2z9mligmos2nldr7nsflhj7uzijit6m0jl30p4ra2gbk18zx17p439jwzco5w5in3jf29im7ja09ocl394opujsd3oku',
                interfaceName: 'bngpyq99ao3qo9p3woezjun5j91na0f1motvdzh9lqoxk0vv7ffje2csuw604fyiuok546b0v3solwmzry8nkdru1vpli0fkg9puxpa3n0a60mq3puz0fwkxmwa70j72ekjgoeybwatsuce54qgnddg9cgejz1xs',
                interfaceNamespace: 'bju6x3u5ky38rsuix8cunk5t19a83pi7u1pn11olxnz1gaiha8ggbf94n71rxj7cjx3sd03dbzwljod990dz5a8wsdkxsyiw3dnza4qkoeb34fxn7dhbf5hads7xeon1836n3qwy1ncl8j94crg2rj1ec24z9htw',
                iflowName: 'rewzgie8cr7m2iu8iw4suexkur4dtg57pkbu5e2xsm0tcdpigqqzen4ahqgxjgwmua2g5ownh5kgppsxjs0d4dtgz7d3qlfigrrv77e1srbwn1n5zwxsidy2dkp9u91ww0ypx71o3uhs6czltlroiqfip56oac7a',
                responsibleUserAccount: 'b05l066y8a0auufqdno6',
                lastChangeUserAccount: '19suv69zgw99l7eqf4u5',
                lastChangedAt: '2020-07-06 16:58:08',
                folderPath: 'etl520kxjv4zv3mbjjxtfuntmbl416v8uki0d30714lzvs48tfqvqzff85dru82jb3w1s4nifhp2aawo6yuza0ttygu1pp0fnlzbtqb3teop9til0oqbx9o5mep89uuq3ww6t9npp7a2c1cizrve0ub4ydfluj11zz8zod8aq34axw6mvgoushc4fz9h88l8j4hrwhhhckrat4mwz1jw9w1yp8tu6tos7abj3k57w6pumli8gmdnb2fmw1khjts',
                description: 'our61f0kl9nrgcc6gkgk9zu5c8lbe219a9titqbci31xe57zdrirnsm75j4gvyp9fp3llp29vrmie66yjhcrrqehsfl1lgy0c7xs2voixzvx7vodvkh02k37u0hsqocyyy66u6ucparbuvp6vrdjdpgc33cu1w97l432w3tzgrcvmyu10bk5mq55jz5wkbkt2dlsxib66mxjoyp4bolp1y98rn5oiuf493izohgbvvn3spjdt165h1ybr5kpsy2',
                application: 'md9rwpa2z2tubx4yq4u7u0zup7ogqag92vhzuhn74xtv00oee6cke4syft51',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'fcxrs2obicpgh0f31jd4',
                scenario: 'nwj7i9qoilzfglsps3efysb9frlkos12s2ktkn2ybuf69zbr77jhmppe61698',
                party: '9nk8of3aqil904cyv8p1gn25zgj0hjb49ki3pchgjfbzwcnxkvbe4x2a2cbba51cvsg4vislwp7y5fc4lfb2dbyrk564orxrcszpto6mat54rhh166riryd53foz76nn2bq0c0dwh13q5j3at4bidm6q1engz90w',
                component: 'opoxwjh70rh9txk28hgrbnogtdkze7t3wognd11pq4vwztm7h7mrj39unzs4nphgzozi1jzlcvey5c8j7oosiktt8am14iiogvzgj4vur4bie3y257ef0ph6ddi12tgzttzqeyrjnf55uv2tk58hlmdjtlp0zvlw',
                interfaceName: 'mrzkwwc47lixu6pdczaewqu5o7b8w47uhunq16cn5xisf802fgz9xtlzy0017pw05ynhy5jw80hzidspbcd4hylvkbfe2n1jijex9e9d7xhtqwub2of71qjtv0uagfefpvesr3f0sac7zateadmfi86yy23m74k4',
                interfaceNamespace: '2kx9wpm2zt2nsw2behkt6vnv0zx8xdpccvzpeqycps3ukzn6fsqop0zm87r8gdkdqa5k6dvoyx3um63r8klhhmfmqa75m72sbpacpmbt5bnrvqiwf3acb8zmunetp85zkec8ass5d5a0qrlv5z7m3vc31k88bfel',
                iflowName: 'y6qq4ku0h3qc65i1v3t62yru63pfpiqwlxzt36n2v6meigzbk03h1rdvzbcdeqyjgi0p6cii1qhg254sa5jphmd0l3o2heyt6u6jg60widew461aijebipjc9ei7nnqxqnk6axzuw3m4d5tio2n7v11yq0jjjc41',
                responsibleUserAccount: 'j41qhl0tf6s90xmakur2',
                lastChangeUserAccount: 'rlq4ez2n0chsolv62mn7',
                lastChangedAt: '2020-07-06 13:19:33',
                folderPath: '4pz502ymwq8v3pcxz5gfrj8phkzax7qrs09yyny6nqqu7cgn7y3srvzv6q2jtc63r1h7c566hof2789837d9a1je7mszmb9c4utlzpah3seh2jscyn0qcqchcqdqw355iily2pj15pnj8ngyppo3nrvhnavyn9mr5569vr932ebgnj3qht3oni9w3ak34pdtqani8cbrqhqtwr660mdg951148jraqwsj3az1cgbnyw39dqpdywfegsz9e5wc2x',
                description: 'ey83w5g2sguid3fizps5dn0gyq87zgdkxdef9z5f3y0efm9v3nemacy2xu4v39gwfvb69lyvb88palw0aq9kerwts8kfswzg21hjosx4m0eoj2sdfzi1vrhr4gg6426cnbca3zhp78zi226e9084vcij4ht57edzxepim56tkeg6ahyzlc3a6frrhx45qgfsk1econh13ncq66fkgu56avmhpcv0oh5s3cdkdu3dr4yr8hlhci3zh6v9a6a2xos',
                application: 'xmt692p6vpkq76zlhdd5a13uqg3nz4m32vbl76s2kxanq3bkleqs37l9le71',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'vljj8k7cwdjt4ak89sj9',
                scenario: '1esd067ikkw58scra7m3qn0ynb0pnvt07dn251qpluzni3kp8vy2h6lpsq74',
                party: 'e9rhwr7r7xuv06hvpdkx6jywd09yuwkhyuijvv6u3ohcr9ks18z2w853uq32n3ooora0k5agb59mv2kjnfwkjdumcxq071a3uazbp33x96y7nws5egdm8d1mqtpuiftcjcpx162s6gx2tnbsp4z1tttjj7xuixl86',
                component: '1lqylr7i7i26wgn9mgqgw2t74xtziwj0va0ega45j3aefsl9y1uuh97pwj111jdy5qmdpeq08mij3sruj73g270xwwwzfqy0ztjh6d893t9d2qazc3ukjzutatknu4qs1jnafz7gfpk8vtmbquk15exzdba92i5y',
                interfaceName: 'za2abal3f9wp4jtgwd23rmk4sydrg7r6ece8ih5y6bdx2cvmkbrb4mm9wftvgofa9a34lb7rkp2fssm294coqfkvtre93e0una1w6kch2guzwgh85ufhd220ptxlft969bjxlgawdq7f35x87cse26nbpzvdufxb',
                interfaceNamespace: 'gtvefdycdejnr0tt197oxdm2f0hlgqesecqjnftp02do18t7m0azrukm1w6cb46vrhi7b48vru76rz2gnji7rsqyhhicxortxhmb79l4fsstb0d981arjq0bs3omqyvyo5joymv98yo9dd51e3f112frx6zyf2iy',
                iflowName: '1zchcenlp6t1fbqp4fb9nr3z3413xod8idei6gmrphv9pp9n39fhz083c1a7e14s4tnk3bfuk28fo3fo8idw002hmy3ogd5c2en0rw5f7zy3ij6fz2qaq1bgjz3a75v1zcbmujr7vsraqih8grqif2g51tc1ngli',
                responsibleUserAccount: 'cgm0y0vk6oby214u7xw4',
                lastChangeUserAccount: 'lkzx3a9xpwzcdavlw8mp',
                lastChangedAt: '2020-07-06 10:11:11',
                folderPath: '3hhebk5y6ouely2ybjo2bb527kepyehvkmacz1be2q3ynugwg8jz2g2jct1bct3c3gocioqgz0uqahbx8qh2z84xr2gz49kncxouwe7gtfi3m0591ze919r1582nnvtjc2p405hyr3jjeoaqfs4hrtnm983y5j344npe45v9aop43a8ihm94jq0hvv48gab0ly8oaqhxbs9xefuptuir7yrtri31h6uejv8ecygorewtm8snckau87u60b0p6h6',
                description: 'e9k6g4ci4jijetimrxa4uxis8f8obw9b21s4moo0ntrsplzy39kanz7o9cyn0el0ub8kifpvpapi0hgnhluq863dw1si97925aicgam0xybm5uajkrwnuyybj76izu9bwu9kpa404u91qy1wzybq26skpjhridigxk74pccvr8a8yu5vwv8kjdi7667j3n6sira39165xmn56cr6cvwet3i2i3d7x660qvfx30k50bo9znic1f67ustnr56b4rm',
                application: 'td3fjuq2daxy6vh4o2eqsl18dvjlrs71nebz4u57agb4k8yejqgffmlbgkf5',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'h49yscjqrub3k2ln33c6',
                scenario: '375gsfhotrcar3zxy4gu7a3rds3vnr1i906zw2l0klrlns4qh5uamuwpnv9d',
                party: '7hhgbeggsc04j0og6zdnjh771se7bfhmze54h5vdhof8muaaoh70no31uxtz19akyf9zm1uv79pbj7v99fdgj8uieyu99312sr5zvlgbpctucku7r9xwm2z8uqfz1uzc0i67ysap9typ6ekbg93fo9z1izs080k7',
                component: 'j2xdzwuhwl69nmeh3ruztg73geunxm9pvium35oqnig813kwcuifz6zragfdc5nb9993htfa0a5b0bj5u2lr5fbflzu9jdd1q5un6qoa289iac2n7sceb8ka4ezg0i4osdlxonc6imdg279rgk4egtnf03985e44s',
                interfaceName: '6hm9a4s19mmxsxe7lwosatd0ya4rlqjp5183dltzmryt4ku3rm7yh1klard15wydeywaqexl25mcm6pca7w7nuuznqu5cgee2r83kpxzekv3foi0j3gvl66gkmdy7ipiufhw23zf8j0b1qo19b5zl4uycs52ewbd',
                interfaceNamespace: 'w2825ihmby82kx9ofss46fnrziionlnayv0j6a0qyz09v6u9dx8jeez9068vwv4lg717wf44fx1af3l5vebdjn4zywps926zkul81rkamr3kyzrasmlwuqvt21l6sn40wkk1opgnax8u1icc3yxrfpot6e8mw05a',
                iflowName: 'mwsgpe7xighlinx2gwcd1j43n2etxmp1ap91c8fgn1s9cjht1qfvoc01xnnyj5zpik52yy1dk9d3wyveu29t5u5g9ovaarj6p0noyyfd1syhj38y3qon6no752x7td6lfvzvx3212t47mvyi9z3uoju6zihe1tnq',
                responsibleUserAccount: 'xj0ahyn6revo4itdryhh',
                lastChangeUserAccount: 'qifkrunz97zzjxcwgwt6',
                lastChangedAt: '2020-07-06 02:10:52',
                folderPath: 'qwdhzo45e9ozc6pwqddslopb4gfoeg64gvwy4u50ux3dnxw7y9th9irlh2pi751fhdm2seapbk571cdrdh85fqafi70ksnqbk95mwllcy6qwgm1niz1opg3znf85mm6k1rrh2jd8h5lcek6279mr4e24za5xxv3wjxah10u6hqw8763mhujkv8hftuvyi4if0w6klj2qlvrt7465qo0pbch6dosmco3heiwbz2lkm3ol4c74werrd2h2olrwhyu',
                description: 'oi42lufuhmwre1ururptauvtpwb2j6x7ltb9t1b0n8cr6210u8e9xgghwxn2andl3ob8ei6zx4b3ty49qxyur55s9ugdnru7zt7nflwqedd95gsyxm5r7lh5d8v5hy12ylifov5h1hbcwxszyh2uy69i2op22uwfjlp8500uplpk0sapn0xr3rkcudctwiuaky3qrnq9fw2wioajhqzvxw2sqworf0xoqaleloekpunshzbbkkys6hdynpzvwa5',
                application: 'rcqeb0a638g2ui7lz4gt9kn8xyssz5a5nm7zqzz2df3kqo39u91np1iqyutf',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: '9v5aptqxrz5zndipcw6g',
                scenario: 'l4m1ul5hu5ezmfumery1d1z7oawpeyl6v89dl14uoikbp4f8nj3isn74ez4y',
                party: 'xj5pluo3eaopzngvp537duobjqg12mx763stnlzxnrz6s18xmcivv7dkozxpdu0cea98bt0r37sd9xctac93tfnvl6dt6o4277fcpo73dktix48fx4t0xwjg2c1zjjnp9ty1bfx08osemg7sxoj4rf73ibely8ts',
                component: '2xp1jea01gajnhij0hvp05ksciltu2t4npr6qvcywgexjdcv1oxe872ugimbs5se4zn414f9m8v5vk15twx686akxbfoc4jny7u7u1z0kdxwh2fglbg1hgo6ddx957dbm1jq42yxants8n3yygw51gs92kk4d8qd',
                interfaceName: 'uia9o6ms6m4q6mxjb8ssrd12gk1a6vtz7ojc7moetatypzvmj2x1cqv0wi6ch1rk7tfqsmk1s2t57oat499zhrk219nv9ey9cqcfvt4hpe1nkhk3d0qhb7tuupy27hxv9i7d2otifx5inb2a9bvhysei3dwfs0hra',
                interfaceNamespace: '0uruhkf1ihww2mrfph2ng71m2t1ma5zlv3k8xmcufspsxwo9rimap6pc9m66r9tpcvfz9e62300ik7nphqmqp364rae0zf8h24jykh8u5y7uix910v141xpfzopswt0ppf7e2f2pbr4j8371skc0z33hd6szrv73',
                iflowName: '6jnce80rg6cn6i1kljv7a0pvnnjnbcrgnvuq39art7zel6h4cuvgg6pvvnn8wcbrmfpah4ko2ayaarkk5yo4ob0rgfy0fem9amllg0m729d0omgemgcxftr7ngiycmabw5qw2gd2ixv3u5eznljsbaghje6xm8sz',
                responsibleUserAccount: 'k6782hxfnzo5ckyxvb0l',
                lastChangeUserAccount: 'jbtzcji4u7rm0tj0vn2d',
                lastChangedAt: '2020-07-06 00:52:49',
                folderPath: 'dp6swyj59qgrg0ot8r4gq7zo80w3pzjv7lrogt54h5ka4y9pu1iv8n2jzexia1nn9lblkhdqe3f9t90jdctyqylpk6cbooihe16g6pkaz3dp6hgb43ivz8qwt41gh9ml95xpdbvv7o640rp0xm1dshyo8px9r7qqsee1c10y4tioejqjd7d6dfmvrnqul61vzbb6g99e4v1iqmic0nddgv02o3wv9phj3qf7l0dx3aajes3hy9f1ygs9avre385',
                description: 'djc4zx8de5ln6bs64db1qsj1ifz0l8rwx0zytyy0pz8zviue9siltwxqv8eq5vei9s5dnhgn7w97xok804mhg25yx2cn3epsyu6op88yardf1w4bsavy51sq1331pgb13slqa056me5kf7nd50digoipml749bax9u7vgb4syu96stx7a0433nt1g825t45cetjpvglvbmgesp7r1466totwv4csddi44qr54gc7a68nyuh63tb1exrew7gvys9',
                application: 'q3u495zxdtqsjxo4vlw3po6ynn6w9zyt27fsmmv39phebczozvcrcbpsdr8e',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: '93rv0kxbbslbl2l5x7ue',
                scenario: 'gzxgiczakkt6qaysvlzvmsomziss2gb6njo7g5cmlo35qggb6mvkmi36plcf',
                party: '6pmv7tj4pmmnynt3sbpi0jlgyub6qttzel18ym7ntcqyl6qal87kyetf1jxzbbgu2cxv9qeg7jnmkio8dq9fu5a9r4u3nmm3r0j8c41ddcmyrxog6v8ki03gwcliwyyht8yf1ttrt1gj7mi3nw99angmaekjqaep',
                component: 'gqgpqivb6gx7k7u7m0fpm6e17dd3r1dbxrne7ue1btdtj1qokfk1v03hn4yjtwa1g8gryhhdlb0qjg0wljgjt6aulweppish497pq0jsf87nco63h8qc5r02i2nnjpahwd9emypqns798073jdgg2q04gtnj2tub',
                interfaceName: 'jmvghl00b4drclyw0qlejkihtai7iz43ktvrb2ssub5za5hsfqac19o7fn91dk7cmrmu4pruuk05dwchnr7a43yb0erm2rp6efaizoo4scmduasishpy1xenug9yd20nn101m2sfqjsc01ufucqfegwnyv2sh4r6',
                interfaceNamespace: 'u2y9zigk31fjnkda54r56gg39rmfg85s63t9m6qxb1ob62b5608ie4kfq1npbutmmdg51c24whvp8bgs4ckyhghrib7h7n2fq457wgcmr5ji68qd1j38g39jonmjhlwrbe97staddj164sa0waumjg7qewmkp5lh8',
                iflowName: 'ov7su4x012ks4l241f00wdhfcbrlh1gqsx372nx7fjtmyjsjj2m3bie2txgdsnhpbex8esaqbhztr1iov1fh8hqqos2h2deq1xi3zswf1wsd1lv5kk04i5t6l13sth367juey27uvar4pizrulpqo8s799kmbbvt',
                responsibleUserAccount: 'zb37o0nlblz4sg63tu12',
                lastChangeUserAccount: 'no5v8f951x8aya91gvw5',
                lastChangedAt: '2020-07-05 23:18:03',
                folderPath: 'be63jcab7ikyzzp0sewvxnx8bql7moothzj1arx2q8rybaijxtc2yn9llwkem37o1a6gkrvz1amknrlmracbmt0jidhc7j3vl2gc6smtodw63f7lnlbc705uy2f9fzw4crpyu4p2r6ou0xadxm8h3p49l27ulqyvaii5v7ucv7q7v88e66ihch71nfx4xn9icvym7snm2qs26227pks2388cthmtcbogrn3l032ghrfpprmqu4tjr61ss77r6mq',
                description: 'v61yyu78yagrta2ywvyhiw8lqyhksh0p4mwzd3n69sbkux2ra9c96k4q79ft8wcdq9i6gks0cumrgjg67lzpc36ll4fsw71p2lwuxdxsdfz25zknbl1emjdypqt7m98nhp80c8xrezonwlygw8wx8988vy4etno5wr4yamux86mle89lbqxk2u2xia9eyixpq3rapanv581nzlihu2a1o1avnzs83io63leyg7jo8kuxvw4meoitglk7zoj7ahe',
                application: 'rcjzi8nep15an33zkzjaycs0xo71f5o4zfwsx2p9k647f68d3m8h95tz0wnz',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIflowName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'bm6m6kdgfmsebj1v92si',
                scenario: 'kcvo2mophgi6yrqjo2kgw6hy8knbpckdd8lb4pb2m5rp4ypnpfq64ftx78qu',
                party: 'j41uotxtyvbck29vtbwslmuob5vw3cm690iyti2gg88m3wgnlqke1jj8h11zxygygfw4q6vx2toe5vsrebrnrsxpn1e488x9a4yyxsm8wjgr61wxgez52m4m5zv08buflo38k39tsmnuy1wsxzjts4h3qmim86l8',
                component: 'cdhaa8ys15nnku7j3qpytjonivdddn7vdx47bhfcfcilnr7eeznyn5iqhu1dnxat4hyb9pelcq82iprzdiiwk5gdpxs6tjxenka6v6mfx4u1womg1gn707pjpsqdz5084k0fly68rt4u74sytqv90km39u2elob6',
                interfaceName: 'lozvm3c2fyo0nrl5wp7qermxunh3vtgjoo0dzow4cvisjgr60r1wnnbx88nni8vq285xwj9izy9aaaifl29vxynnizjly6acj2zsl4dk73rzylnc3jvfl7swowdmis7az13yt8vas15lrw2i9v3sp109l1dq3s0u',
                interfaceNamespace: 'o6xf57mjn70btndt57tzynxa0yp5mas4vdaze2900qk3okhff5god04op7mfqrq54tr0ud4pncchuu58ib417cmdjw4wodvz63r5bijouqtrmf3b4snb261v1i4d3t6a7lgu226puqgq633xmm8uiq75y88ad4tm',
                iflowName: '0bj291lwj5u2cmc8rhfm3do28hcxa6l5l8v77onixoj44bax2lgkq6vnnwpg7ofb3v9ud0h7etigrlecc8xz4jgk2ltvbd3gazdwj18pupl13bzgyfqgzmi5ew4py28b37u27iuv7bzmf20wvy43uj3iqun0rxu07',
                responsibleUserAccount: 'kx45a39xohsw20iqyijr',
                lastChangeUserAccount: 'ksq0r3q1oxlpipfq19mf',
                lastChangedAt: '2020-07-06 13:33:49',
                folderPath: 'lc4ccg6bqzwa7tq2zgyh97gvg8gnbcz5711tberlesaa2zml8n69djp0tqkt0w6voc5b3ai6my3m1m5nxxltrqa15mbv93jfer5q00wdd5ka1zm82ktwemcv9vbfgh55kgf8knrkcagf42cb31pk03zq0p9ydizsx13fn1ml3xauo5o5ku4r0vahprbfyly4vpsw377lqihpqf4bcmcan49jaef1d51fcxwgogk959llangkpedayye7rw8stc5',
                description: 'dtazrcdwb6h6x66puqcbrb8g0jcrtza05at5tovlcvae4eceq60fit0lpofrz1kdm6g8446b2uj5kilth0ih15yx6ntnr1s65i3vikl16u64v0h5rykpowd3risavez9j2pngwhipocen0zlnr0t3emwd8xwgr7slkiyivy8oejuu5fkcw4k1doupg7c5oz2kbj2qhta8vrgzomdpesgcs1529a9gjn4zyphf9a5svormxjnz24c05bij3yvth0',
                application: '85m25p2m143nbe2x63dtnsemmjly0viyuh4wivkla0ly7z6nnjpy2ixgxc8z',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIflowName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowResponsibleUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'duoad2b9l68t92nck219',
                scenario: '0ml1x3422497bsyckcy29bbfnminx4xkjkskmiy2hykziqk92lg3yidetjme',
                party: 'ewadv7w0sbq52p6h3lzpcda2cf25gnkapf303igcva1jd98fr7ccw6sw9nkevbh3a9018bz1jmtuqhmmdp1r5x6fle59lhzg8cwpvp4j0slt8rgob07svsmvzanjmqqkuichbk7fpz2eyqz0aahcnbgc5p837z84',
                component: 'zp71lot69gg4389whnvl0jgu88nypirq39qiiy2phofg2vlidv9yf5ypa7ovo1vuv5hejz7coatki2ecitvbgp8radh4ygnpim6ftgo21hl6kwv4es6vro21ey5latw6pctps7ekzqkeq3i1d75puqvez2e6sebq',
                interfaceName: 'k7aexhf5f5ccy1ux0lwghw32dqkp3ea6me0ox7aw2s2ay12kd533omafy8v672tistmvdg97nxka3tejj3zn9yxjmrgq6z814vzzxki60qo6a4v59i1pjnj8jsg5g2jvm1hrwcwve5ckl0sth5774qubxfrm6rcp',
                interfaceNamespace: 'tnc53ldb2ixh99qmpzyjjyi1i9021l68f97np50qi41qo1mm3dy71edges0d6tvz6k2vc0cqenuml7781pmvg6xaomy6n0yuvojtlpa8jnmu10eo6fj6s49xv5a89jxa8iz3azc4tg4e40ws8r6joxhkcjh2gxl8',
                iflowName: 'nmv7koz4a13sioc3dh1ljqfnqc3zy83wm9qs2byoqdd1xbley11mugn7xcljslivup1cqje734otn6iaib9nb5abhjpwjpgu316xc2odep2u2c616e4qhgfp2tnv8zcs3qtywwu8o9i88dphasqa1flew7x25evh',
                responsibleUserAccount: 'qdqlum02rlidrynxqhy41',
                lastChangeUserAccount: 'l9b97xjchyldmg8x7caz',
                lastChangedAt: '2020-07-06 10:02:09',
                folderPath: 'tj0n9lyh03s5rt6zjtrb5p825sq15mrpzqu0locrbmj2wu5dplwxy9ucieer0z6hjrqoqlm6mcv8yw8upmouqohh61l66zj8dncnuc9pbnptoanltlinud05lhbhtvevuu9zbzaqgl1y2p7fpj3tj1r32tn9fiz0sdg4fem5rse7gb1c2nidv5fd8wk6kb5fl70duefb0ntprgoar1hydll1885b4e2ms3kksg2bwb0bjg04opt7timdt4ox8q2',
                description: '2bqrnujafqranhs8mtcc4mclw8o05zwyiul9tho93q4y2sta7n60ugox8es8s58sjgcicylgzbqmr8wzkv6a5i11hkdk6fiyof4pckctv1a32nyci15wlthf796syghebranqvvj5w26f4cixu2pws3adj1dgbl06jbidx9lnpb81go6uopw9y3629lzc3fq1l12gfym8g7n090xdlz36lnlxf5lmjtdc8tt0n3hmvhluksn8g489u6zcqyzt7m',
                application: 'xgsv8co0i55m2oymbi4u7di0bw25yl21vap90yug1hkgndlenhx21hvopvl9',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowResponsibleUserAccount is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 's83oi6n25kpnrgx7zlme',
                scenario: 'dytewoqgcrae23si2jiw3wnf0fenly4vfrb2wny29bj2owkmvp88l4aicmnr',
                party: '88e8tsex2swknckfd81xltwhckiz7p67ir7ukl6h1bwifcktduxrds1ovuf0n4gwxlqodkynsek41iovqdeurcsq5tw0tisg0k0em0x4239kxgkpijs2hrmpz1qxe99nsk73iolfcn3l24gn761sq6yej83dz3ye',
                component: 'bqpnzbhhiixt2mwyhd14gqtlekbqy2t5jyjsdnvves7thkfjsner32mitkvmjtca7c3u19xa0v01lbjnyc9l69se4pu1577ptm379chhuu2pfx39vq2jkf9213ax9zzmhc3sh8r2jzc0lt5qx249fdl6al5hiawb',
                interfaceName: '91u7jfa7ofzytf5xa3vwev511b05yd3ym4g8u23nqtiaa2funm4n9lwh6hbir1xu5gneqafjv4shm7bln48lqinspfs5ri4hl41wsmyhq0quyw6n0ruon1z7ulmc5zmy50dowkhg34fdq0ggkfcknmvcd72oezi4',
                interfaceNamespace: 'wgjn5rgbe3q1319e0ff4xkvtsopp8zmd5ae5mltouk7b4db0iq262wkxtyi8232s08mbr9a9m3rt3ozbnzuwohk1gvpxht25gyk7n6atgt2ogg02w63r5w6c0r4uvthlh599yj7jz22uupb41il9s19y6wq167z6',
                iflowName: 'l92jl90y5mrt3c7rqy4iok63r75zqqefebklgdoum0d7npehi4byd20gieu7s63xpm9736opndbf0wozwmd3kdumiaz71cqrj31044rmtaezdbaaotyxc57bexzaz8ziowb8j2lqojj1hpb2m2ujp7zkghz7hrho',
                responsibleUserAccount: 'is0ppvzzlyzdczyrmj05',
                lastChangeUserAccount: 'og9b0ot4tyfsdqxuvyjnq',
                lastChangedAt: '2020-07-06 02:17:06',
                folderPath: 'owwuuqw9965uog049ps8ti9fcnb5ew6dm0s97x7c1m6ji8yizj7ifnve923iqs9f7vj23ubu00u9gzj7zm0sqr5i28f60q0waecdwczbuxu8hx9e166v8bxfcck47mw3tf66723zx2gfc2o1sfug94xv9sxhr25sb09iz7wtl2iq5gbnyyo0gdhtogczggcx5ql4k8k5t3wo9m8ennf8xfcxsr8xllfo76sroaw3kdusykp3l59larl7vp8pe98',
                description: '251pw9g4d6cyltuxwki5wa3vr1jpvwem37c7uj5wgxloh9kdsseqk2w8o2pf5cbbpzbn4d9hsttzalmh2ztmkhpt2bgw1s25nob8lsw33ocisvrq5grdxxjep6h36ku11ju5mu21tyyttgpp4zts867b1vdsstkw114yk6q2430x76nrq2e2veetit8pk11y6jk5i3tfh6w3pfha3pu2wc6gqf806hkvh0i5ei2ynmc1jk7idb6on08svprl9cw',
                application: '0iyhz2m3klatwlr73y74qmca3uukvom4gy5a58eoez408iiwg4flwcdtqi7a',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFolderPath is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'xv99o2ertnginnuqytfw',
                scenario: 'zaa4m46gpeagwda0l45gbkwqw0msm2tgj7cgqdx2mmjgoiec8lycfmg4676r',
                party: '6vcj2wz0h40ff9ltp8wi9r62fej0l7b1qn3jzsux2dzj1d7jfq0rztgapy34zggk2uaki4xk5p0q7v1uw2au7m0qdoeurmaaevrwnr3tvqux9afzmov6nj1h8gy836kk59lurddmrogq334yloed49gq5sw7qxkf',
                component: '41dfshfca80dwo7kyv3q589i128j0qv7o73oqpix7n8v5nu9kgcrthppdl5tc7ymwbge116pd64k9xbl0sdaz64mei3qjic3f9xv46ds64pylbnhsn0zb3zmm9wt24him9gwcrd8cpxov5cse8c8b8flrk50e58i',
                interfaceName: 'b554290jwud20m1ij9vrnfevac3iftml2pckt8axpd7bgy4n7kejt00xjokb9d1rk3w2cduph419yk2jvt1qta8gw3dvvbkrrer8fbwvv3pa5skxxoehbo93y8q2wombilsg402spomwsensszqdnn9zwi7wva9r',
                interfaceNamespace: 'mko8bjd4jcz8hoy9zpkr5etgxayja4nunve7d8jjd69ark3lram02t2aqih8rhqsqq9ecl4qchhr2yu5vle7umhtd7i5ylvhxk6xvjly0s9ojw1auxq2vu3ybto4ktyldu37b36cycnglyy6i35k3ng14f9p5ofc',
                iflowName: 'kmg4lg197ua35qg7kbpws1ib6se9wqly1vbukzjxmtk88k3a7xe0d1muiquki569ptcaczwtyigm9371fs2opuf89vxnbf1wnvmebx3qjcamgceygpxpecw9gu980d4xlgh10jhi7l3ikcic6fu6sblg1wvlg9ps',
                responsibleUserAccount: '740tklzlvm8xw7bku0f3',
                lastChangeUserAccount: 'b7luve54njc73i2qfpee',
                lastChangedAt: '2020-07-06 03:27:39',
                folderPath: 'dtgp7mpowvp1nd82aav4giwy0wv4rhuw477s8lbtx1e2o6575pafjr7cp12x9dk73ciy0cq1c3k8qpkaxs3eyrj1u3sgbkkmpyw2vbpmyq0knol3nczi2w0vo0ioe134sradicjth346wz6hqnyffggyym8y43kjh8fbp8xlbl1j7jgbgjy6i51qt2el0r6jpm9g1khrw94lzr4ul8kyhpcwqx9tizgx9aw2vfpk4hdnn2nth27il857tdswf52e',
                description: 'h60330orl7jyyhckkqhsll2r7ewbfb05zhyulr6nqpn7a233qlnolvyfhiplpm85nd5909e4ifpah1el5jxhhhxv2z6sjroim9cr4xnt8w2innql1lfkwr0mu2lp6nl1lwvoy63q5s3vazr46p6u1mougi8mt1qsqytyubhk0f5133rw2joov682xw4qmwcd1ho4r1k6vewhcz1flk8suxu7i927ead0btqztcyk4ml34438bthb71krk15kjh6',
                application: 'gkifgjt3769q9hosvw5qff5yvbk3m3i5rpzyywbeepwakx7tdrg5x1z5u74q',
                isCritical: false,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFolderPath is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowDescription is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: '6i28zpxe3ysfqipvax7q',
                scenario: '77olp37xq4oakyr8elwbz2t71y702r2lgqs3ody3ws0omhbqpw4b2e79wppj',
                party: 'd5vozltgangibise7mm0cdxtgpjjdatoi9bkjq3an0arz2ysej7juiarxioi6krzwvbeptxfe0oinr80i0t33k9bu9hwxgb4mu6pzq5zoq5os6zevl09hswa0cavwqd0yydhf2ycoumtkvbc3fkj0gypwxl6rokw',
                component: 'v7z0uf2d8hxnpxviqbbtcufz42uvetk8ecxs93na5dbhjpdpr4c43oz9atzynh9rflzrxiihdmpn3rl28kbsc1uz9t030bz0lzo3mcdjseiyh4u7lg3cq9g0wy5cm3nfifv7jn44lkmais5ohxlqkjtfgzs56473',
                interfaceName: 'xunz876m144dk4d4lcywe4x25ydxw8pc8q3fn0ra38eiq2yenwgphecrhp4d7e0vvo2lhqo51lugniy9jz84nqtg76dzgbxr971dc65j15yy6m6j8y9v9o6hm2at6kldr4yudgdkyh3ck26rxak50wh4805mwomb',
                interfaceNamespace: 'zdq7k45hv8rbvrfmenivuv4l85cy55woxzl08m6oh9v6mj6xcdyntw0rc285n05ac1jmq4rkvg6458s128elt9rjftl63kryv960aqx8hwda4jdenm7veveuf8jfple7clc4f0tda42p8hq8dtfpgb0noauejflb',
                iflowName: 'vc6k24uq138otb83f15rqf5c9ojsdaorhe7hgwztlm9n58ihto8qndi2n8swsjgm2mtc7gg0yiruubij08ibjwj779oh6c7wq3n87q79sc7vijqjq0v4exw83jc9f0cc54vkibymufdqm5wjpqco15ica3npqg4i',
                responsibleUserAccount: 'b4fglzodzexcle2wbcmc',
                lastChangeUserAccount: '0uz8qd4ljzwwgdlke2nf',
                lastChangedAt: '2020-07-06 10:08:59',
                folderPath: 'ac6i7hxkkamt5zhff51y39w17kt63ir4bsh1r0vk5t9zsd5l8oiiys71z39edidyrnr04movgmiil7r4rekc5hrt1jia0wkqulfmzqwwq824gzvibn87bgp2d1j8329wjve98pdhfgh066k2butromc901d20wzgk9l806o928y3vfcbibm4d9sjlao36fhpak4ph5n5v0uvxsrkpk2r4bo494szxoj5a6k1gsy8frznnb12sn7iajk4zi65m39',
                description: 'hik0xkrizhxy0nw7jgdw2yefm2krvr3r3ihtp6aohxrmqhe9s5316p9a3wimgyqb654lbylzvkja9k5w7grny46b2i7kdo15r7xppc2x4dk4x5md8gwbvsj1c762yo27935pkdn3miel22udz4dea2cxe3sjdj8ykiasi1my9s9gnnlx1d3zag6yv0956uz5emjzl2d4ielazwuiwaav10ncfluvmn3fpatazsanb8otx8zc6k74csqhq41ddhqf',
                application: 'lbz1d0f05zu2igie1uvbu8m52xrq1xkfdt9ge371pancb6d0cqt8g4ezvoqp',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowDescription is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowApplication is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'vj9ht2gy2jp30b1gc6ml',
                scenario: 'zzvlic239e0my0ngw05ruzng8n5l3400mxtqn0njxb9hqdj0rpw6as4qxlwy',
                party: 'ckcz7mky3xl78snpqzcva804ogt74l6mhk5o9wdhdl5f1du7zvq5866lhtrhgalwoj0u39alnn5l9knvunq01nll4k5q9jodfq9m8go3pfvutnbglzm5hcpdqrpjng3fhylz1msz6mt03s2jg3gza17b4kf5fy1i',
                component: 'i6mem7o3acah5yo3ggual0aoxsoz0ir2s5xyk5j1gv77p58hu5h2eyo8s140o3o9jvpntq65mnh9h0tclqkt4wenu0hmxf2g95eu0needoo5b5l3sowd9bzzvnely6buw0dufe8ivs5a7p95qpsxhq5153co5aih',
                interfaceName: 'n84ck6o8suorftqk0whifshm9qhh71ekue5wdytkorxoiurtyy1p4twwk9uyrzp78sz7kxlnbrsgaibz5c9zk1bh2tsecw9lhnbkd7m71k1p5jyo2xdcol8fblrp1jhhv8iz1x7b4680fuk7wayazoyg6a3wpa2f',
                interfaceNamespace: '4z8vq3hthym2tx8vgyevq8hjaig3xqnr268ekgctff6e4d8lm5lkaod0q7afwu2rmiobh8g1epsk9bsm8c781roiwy0kvykbj4wfrhe7fhawdou8n1916ggxypgkj9v3c11vjvdrzrd2x0vxt7gg2npy8qqmwdjx',
                iflowName: '1tog71vyw6bfym5ggux7k9kn63w4he8rfydg3b6fj0atc00h079p48pf67m4x29wg2fsfneixz8dv7u5thx0ec76leiuw8iie3a7wyc1i3w85upszefu2e85mk6nzs661b19q6gibrllolg3xzxneozt5e0s325t',
                responsibleUserAccount: '1e189o0x98k2q1u7cdnk',
                lastChangeUserAccount: 'hd44uod462kj8cq65lzt',
                lastChangedAt: '2020-07-05 23:41:24',
                folderPath: 'kh1vw7c1w8f3kuovxzyadjnq2mnple40p1yqeo57m5b3jqx1cjzqz2jv3h3h4nt4hxrfut4mck8p5ksrw13dxbaysf64cq2i3sndj8os4s2ztus4iw13uhpqtz0k5tfnz8usqvfczsft6oxl3dlpc6lz8bxw477yvj81uvlbinwof0bwrx27kowp2rdmroje4l0y15b7gjw8lrbfynic3rnjbm68nbqxnnap8of1joms5pieb4eilcnhxh6hkde',
                description: 'ga4d3um15ojh8punlshs56hq9zoc1vnnvoimnjhcsy3zyehk5gus6lg5r83jqjmx5bg1dzf0jo1atmdst7c3l9ymygvlnprkb7hmbl0d5hngsnp7is9oxzh56maui9r2hzpje8t8pyndnlf10rct0yzuqtsxrsvhg5yrstm238gi546no8kv8h7yx47x5dbv4okbqqnq3i72mfe2ircd8cdw3rkalamvvtxh4f3cvl0a3rbj50dgein624ouptb',
                application: 'kwsd22x09c94m8vu7vxxrj970mdijgwg4nc9i16nm9jro1of6i5xdx9wkwt9t',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowApplication is too large, has a maximum length of 60');
            });
    });
    

    

    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'lr6sbmtnwr767qom9w6n',
                scenario: 'v33a4kqdobmfpbxnfm9jr0tv7t7ifhdz0kg4tw6tuheu0b7h4ek9euoq1e8p',
                party: 'dzvmv6im4zsq1xz17sreo0gwrrjil18i6mjq45qf7n7nf93f65i8vl09ibu1d90sw0gdg99n2kmr3ftegm6i1v6unj2msrde5x27oikzaweqw1fmbfxl2hgj5yz695cpgf6cpn7scp0nwg71hum8rj67fc4n3fnu',
                component: 'en8627xf9p9di6jmsilqvmdvsoajtl26mb6nre5tt1tl7ivkfjie16blq9s0dk8qud317hn4hj0hf0zh2ybot8vr7oxhg7aiwl0y4xcn8xlepnn9losmifaednomwb87c52o4q008des81l2k7x9hx7g3ngchmfu',
                interfaceName: '5fqalq4lgiasbll28bgxotvcytiyaur2badlxlxhsauzpfcmquu1di76r4o4lppikdsf6djc1aaw4qoszzk8o87d8b7fhplfmbar6t3wwllner6zgp4kkjz1p88fc6sug93zw88i2u9wz7fzqdcx7nwxrn2ru4kl',
                interfaceNamespace: 'qmongq0jeusfj8mdwysqdasgpyk9qp823sp6oh38owlud841i327r0rx0qsbhxaje2yxx1viz8d3mrlyss7lwfy1nbajjauq8nr5j58ubllyshdyi6pp9zgf1r1yhfirpngmuk821s2luj5aft38k2io6xxhabwo',
                iflowName: '2z7tzre0t86yxm2eakywc0n9flf1jh6hffltmcp7ej7kll86ai8vafcx95k3bvjwqflgdvo9qqgdw15rl32i5hbdh2q4jhxdpz6v5agoq14g6djkbs60zl9n8ayeexnqcfktaj2ikg5g8her7js14eaa64di2uqj',
                responsibleUserAccount: 'cbdetezg5e3ad17qz4ml',
                lastChangeUserAccount: 'zbjs7iquzwj7uu0yap3i',
                lastChangedAt: '2020-07-06 15:32:44',
                folderPath: 'j3w08q9z2jubnjorjxoksowsadfu6h3hcak0xdqc7iaiuhihg2tts25h9l06qw5l1ujautuoiqfkiqfpds7oznixh8uny4fs1z8jdhfvh9op78fi8i0rllgjreb8avaw49dmw4y4ywamcgu9bpoan16k8k9v7izy683pmzn3pqngja05gb5012ypb24gq603tcbbl4phrb4lmi8jbzy26e6g052dzcdad4h5bjxllqm8qp913zuuo7mdo591ne0',
                description: '95gkwtwb9do9u9ir7tfkammjjh6pz6mrfj6phpat7eooxmandqom3kx6ec0mbqyzduhs4k84i9svjxsxttcczq9qc67uccqybh5hxjh18uk0xmq4zaiue5vx0ikmaz4gfnqg7ms1mbap6rh6ilzyhy64l4l1xf572v8l1nihdidqmdb40whwemlfyjmzsjq16r5so4bfp5j20pims955eoua2lhe9bzmuu6u4yd8b465mcfsiyj31ahljtqm4b7',
                application: 'mn9hxzawyjygq7rnrm7qowbj4qlk3eq1hhr31iwp9v6vb7qp9ddalhw8dbaz',
                isCritical: 'true',
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical has to be a boolean value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'm9vkte42skz1er17mhgw',
                scenario: 'dpva8larsirl9dm5uyytirehu91mdpvk6814s4d764kzq2iuc3xkc26vhhqn',
                party: '43aks0ny6wpk6thyigxvhiz2ss2soixxjpgwbn145viooatvsqq5v37l95rhgkdqko6db0ew1cb7i7n89ekcpy0rhd1261kiehnaaemgoi2s03yhj37hddlc4hdi36ohq9pzdd2hsgvfdvjetkvd9lc4746fw699',
                component: 'jngbt5hwpn2xhp006wvtkg5kk77mx0bg2ojlw1qigmj3izojphcc74amcoseq8kqtlrvt3okdzx763b8u4iedfx0uqgz0496bm24a58fjfani7a1x1chu7hyb59c3bxnbwndeu3te53j18k3ljkfth1ce0qlu88p',
                interfaceName: 'j7cwmn77ezqw3rvsh1g653pdvisk4oz2pa23tjk8zkcuc47mjaryqbsnec12k2smr774gxb8o4ddcf8ty1p4f5fby14z9gjx50tnodse9y3vugnxy261sb2u4tfmgmr1crfih1mhftifosthp1v33pibiged80hz',
                interfaceNamespace: 'j7sgizb67q1b7u40x8s7pbyztuc69ke6mzhdoboq14jshalh6zbj491tpplelsyfan9mns7idaxk86x3ginw98yde6vz6st324ss1gk8han51lmixpjwwkpqio20ons0yqzgwzdpbibckiq418pka67qvrgzp0wl',
                iflowName: 'n55gym6nrg41u5sdt244uyjgtqnhhgvmcufbs398qca4pvapzt03z9riz264kpeyui7q12d0h3y56ymug84um4mnaee217sd5f8wycx7b59j1rtpk96ll2qwdzizgrx86ptr5its6u2xy55opcli60fcje3c97yf',
                responsibleUserAccount: 'xm2sa2crhekg7pvl91x6',
                lastChangeUserAccount: 'mjtqgzf6nm3lerv6xoe6',
                lastChangedAt: '2020-07-06 13:56:02',
                folderPath: '8u5pl11nhboz32e9jqfnpq5wcctthwn5y1xo0b87o09v7sfbx5j8f5s91mnn7m7ryygqqrh79uvyrvn0iwdgheoxra7iqx2pes9echczudvd9v4pd2qyksd4h5cvpea9667o1nos1zyyyowquqjux4hc2hu876pi9gis3xm8r6naqigvyheguyvhv2d0ykcz2hk0uxxxav60yd4cq946mlaae47dmusieim6nz1miuzly8yjycz9na3oliubjim',
                description: 'og19fettsyusgx9g9wyv7i2553304ewt081cumeusof7v9zjuryq311dingzvkr9raivblfcfmyamxjzkenpmssk8icp9sb544q0phpm69kksiu0d4qkkyczt4q68kld2m553lboo3fj1ietgkyb4du6akv5vk4t1cfxmnge1k4t7axn9y9tx162q0f3329ocvmntacaz6igubwkzsrc8p79cuvyjzohbnapgg9qzomnq6982gkdjkxwfnjc61r',
                application: '48nfgilm43ww8vxkam0gsbwr2nw8hma00936b7ljqq9f94frqu6vrc33fkq9',
                isCritical: false,
                isComplex: 'true',
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex has to be a boolean value');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'sgi0dvnxmsz45qqnoy5s',
                scenario: 'ej8mmp32fcpj9ehg3ebvtdabyrwy8iibawhb42n78uong15o5mca6zprxq9z',
                party: 'vloljyzb78k5d0wjctwrwt1s30fya6ifvlrh31gds1a7b6rbjcd1exz8g4rf7bepinm5qv3cfcy5x9f88z7amhpw9pl5s366lfbcexm692i1vijxgqohlpm5kmcrzfw0hy32dt0a195xn4yt699885e1cu8mepd9',
                component: 'lyvmzpq6egtgs96zjw4313tgqwlh8vqk8mdbjf4qcz8em5b7geztu0ui25onq7v3ogu55z5qq9dy0at5h2l17jnfcenq1t414wsv5312a791iopzqu4v70tjpjpyh1e6dq0b5gupq6bk2reg7n222boxjuywhmzq',
                interfaceName: 'cqhdg2zp9yupwmkbenx02ah4fwiph2ycsy9pwzxdqp1aiu240umorerlpyl65d1vaqmwl7qtyh9va672qdp9eqzs41lzytnb3wnemxkcdkgen39t4drttzuq4wdlqtsqt8ognz0026dsp9fqy4ic73sa3m1yeaxh',
                interfaceNamespace: 'd95o70aampqqde9qf76o8sqehoxvzef9eig23m7jez248c7dlj6gsq45zlh719ic9cepthmc3ei0ca65c3ox27pkcd8q0a5cfb20mrlnbddl71edbcsco8tanvtb930ab7n3a66mhfkl2phv20njb2dn25qqeesa',
                iflowName: 'cu3s0au30zgtchut4menmadui8fxqnx7pva5rnsqbeeetbg57su8svk2yltshl7go1dqcolrvgnmh97tfzo6it9bugx4idvxtxeb0zaobkux3gjnfgqkyno6v0q3r8sq2s49s0bcjrzu7y3db3mk01ddhbac2kpy',
                responsibleUserAccount: 'eskldtcu7zhxenfthh5b',
                lastChangeUserAccount: 'u5ehjaoaq8scr8ptkslf',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'olfsi2qoj1ucbtk2jvq3x98xekrwyqsddzavizj17ic7t99tdt1sf32uz7x62icvrg0hv6dfobgtj8e4dbt2n8rumkkirfsues1yypnb6y561p1g3z338osqf6a0orbb4qpo3owgzzuxi5hiianqhxc1u3dc01sau2hc7h7onsrcsfk2seitpdj78bwbl048bcrt66ayx9507ivjcrlmrbfy06i5ua2gll4yw19jijwefr0xc0l5g1c2gw3f3fg',
                description: 'qv8vg1toefmmdzf2modybjqk9rx8lu3s350b334dve5kcrpxxrr0zek6irf3i2uovxhauqm7b4p5sxp2dlbzawto34kqfuquv3t16zd86v1apvw4a6r84eptbpurdv3ots0rdw81cznkp4sdu0kr49vssokh3ujkhct321dqqiy43qoaklndcf84lghat3dhbkpjl7g9e4lzagmc1tx1qtiwnyunnahuzfggtxlxa8ge5fiwr730290ftt38kmn',
                application: 'q7nu3r7bl6qlgdeybmpy1hghd8f8cx22ynp1lxwp1yfofufp7n0icrfywvx2',
                isCritical: true,
                isComplex: true,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangedAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'am6nn6vwvroe4msfcyzf',
                scenario: 'c6tjenxosqbcj8fpt94t3vnpj8nolh3fqujff2xpyqpei0p6b9wyhg0knf5c',
                party: 'yyktkm7fm0g543gas2ya0fcutdeqm6b1nlbubcmk4dufkeik61ywigg5umx0g5t3xule99i8k8qua0rn84sp2s84yy8y70w2oapvyc14ii2uq0iszwfxhbgw7i3twxsy5rikvsc5icezoeiqrc6lf1lez97wnkfu',
                component: 'au480pqt6emil2y6cpctvs10to1j501gpzr48okkpyv22hsdp0vrnm18s0ef5akg8x8xfezimvfv4s5fc5cfs6tbgn59q3kirguk8s5aboa5fxg9ziypwl9l5go8ldusu5kyt65v0jpk9chgdinp4gvv5dya0umr',
                interfaceName: 'p7x3kj206vimenws252nb8ivognvedj1el1bmimto9sm4gwse862lap9y1e3hdq8i56ihpjqddftnwj4wha4c85bjnq2q7u265l7ggmj89k8z0hh90287m9l9tpuvvvt4h8cpefg87f94ymop478i387lg2y7tjd',
                interfaceNamespace: 'cw0bk05ukuans6c03tl3l3tejmr9e2w749px7cppxy72hq77t9db9t2x7stb8gqehh7sycxx6ewxdr6y7byuxylatf26ifh4yhqsd7k7qwgbeqlqqzl84ct906vgt5zwtf19hp0incbtacis16fg8xqejkizk2a0',
                iflowName: 'nkxxowsu1z29pwz7w4bd1l4ny40etc8exe0f7oskzj89d75nqdvmbwzno75fypx63f3op7d9822q5mm803iiis45dym0oe7c7c8hf99p1vbdeah3enzit0gz8kudjcdb6uz4lz00kxqdl78iwfoioqdecysktg9c',
                responsibleUserAccount: '8qytt5ay7ty852tjd5fd',
                lastChangeUserAccount: 'oprtzwoh8my6an56s1we',
                lastChangedAt: '2020-07-06 18:06:27',
                folderPath: 'iwnhpamkdeabvh1djkgi6l6z7mly4lmgodw8b2mbi8af19w4c8rgj32jx7rruc7mgd9wh3336tbo8mjp3otvddt14oryb0smf0385ucpjxfjmjpdjnsjqv6ussjloglkrphtpkofzzare4mm969jgwz9dsf8ffotchyeawyk3wk15rfjtc2qy9txpour6sxsu79i6bdcqkfs3qy119999r0l7ftqnwid5gyqj85ig9xv72uer4sswxgjlxk7izm',
                description: 'rl09zucp14k6cktlz0r8ohl4pfigmlmceyc3xs0lzkgen60rng6wdyvohqhpr2ii572aor9ngnp9lm6tirlt4sfadw91uqzfq1qcksrnmmva44ilnbpmdk3amu8tm9afgrawz5tx27nkt5l5pxv619m0vtvzhv8v5yqsbimfa0dgl5irumgfoyrud5jt7idvtiz0jwnec2vjjo0x9tczpqh0t4iy1gc4bg7ylu26px8xb3en06hknbom6qa2bzp',
                application: 'pkqveqwc98pmycgrhj32m6hm86rb91dvglq1ch9xj1b8ndcl63m0jqfw7bni',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/flows/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows/paginate')
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

    it(`/REST:GET bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
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

    it(`/REST:GET bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '2555e035-48c1-48ad-97a6-1e3a58b51eb8'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2555e035-48c1-48ad-97a6-1e3a58b51eb8'));
    });

    it(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/2555e035-48c1-48ad-97a6-1e3a58b51eb8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2555e035-48c1-48ad-97a6-1e3a58b51eb8'));
    });

    it(`/REST:GET bplus-it-sappi/flows`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '8df162c1-77cf-47f1-b264-bea416d0c903',
                tenantId: 'c6a18e76-72e5-41c9-99de-6754ed5d5ddb',
                systemId: '7f86e257-2bec-4e2c-a1e5-4c2c91ac4733',
                systemName: 'x8xbzjumluhad1p1mvbz',
                scenario: '7agozhx5j8ogalp0rcepvhzixw2mlt8ju6pgp1zjemw2g16e03syw3ted5dq',
                party: 'k6y4txyywutvok8a9a1sqnk417cnek2m2uc18tksjry9oi30mjyi2sq3z0rzxnx3s28z6ub2ehmipalp1xymouz083azv0ui6ygwncawasph2x176948425kw3ohd4mj0115v42z5mvtvls2irrtufnyrswhu51h',
                component: 'psl2h7mxz6dibxeijnh738eut5pkhcsaeanchsmajj7t7mddbnjj90v6s837y0qj687hr3m1u49z5d2s2cfmjrfd2d3tbrxhjs8iuz2bjcv18le8uhrw1d4fsuox64m1xvlf8aptkefp74zp0pymni4z5ja3iyz1',
                interfaceName: 'wv28ysbzxp757xq4zgh7ywygmm5qelzjz2bqhhvl6e97aqdygjuqec8e14de69ar4t9kkzims6cpc1qmexydyaegu29tz4qsf33h5cuwjr9vdg060dsi0bu80asvsvd2lc38ipg89d8swr94kwytnue0sz5myvpe',
                interfaceNamespace: 'rp21johlwrbtrp8wg9ck9hiq5uedrpw8g4p7fbogc2v68tmzqgko6vjrir1gf8t4pwxu634hlauaj5a0o502mooxiz0onwzzlgdgunh3f4ozfz0fd547m75ja7s7lriat42hk9kj0v8gh59ixs29ohxjotm0knad',
                iflowName: '2mjkfcjs2udjronlc77y0nqg6tt1m0dmpbuu2rd87hix5j44sb2uxc3wwfyak12jxk9eo6hwoah9unefi0wmoq6d0mixe89balo2tubv8klwmsbpphybyeob47wt20w9icjmdg0hkbr8h1l8paptz0sgrgs5htye',
                responsibleUserAccount: '0btazg4ffywpyinhhukc',
                lastChangeUserAccount: 'ayh9du1mndsmy90t49tv',
                lastChangedAt: '2020-07-06 09:45:07',
                folderPath: 'xorb773q7mkm8pwuf2j6q2ckirw70m90mtu5kdngk1w2xvwn251gm7wmhaz8eir4xdfihr569jrlprby8m03ka6dwelznlvz9t3ytiemcy2aisv1ox8dq5qnejicptlmk2z7t6a76hyifzl2dbzml66edpjm8uey6yul7mzawn3yzrt7fu45jt657gmu7nhnindhi1va144v6sxo2egioujvug3lwhj7wftdecjab2qkidnkh6t7zws12hveol0',
                description: 't4w51wn90z84a635bvm60qusna6x9x5e9eo65ysg2xvabydxaioe8e9kr3i6paq53wcew3pcqqwvbx8la7xzyvjvqv5nyntoz1vqafdhh7ai3rcyrm1qfa3gxes9epjmow2zq8hemsn07c03zgcds3u0nz4nqj6b8fklq9m4mua7i44fxmrj55x5kbqur8ostddwl9z9w96nryccn0npmsoofsgwzyhllkzochncoxxd3r26ob6wei0mjdq4iuz',
                application: '3p0e9kwllc61j4x5tstadryoczxixrd083a8z6rr49hrkl2w80p424sacntc',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'c02cbe5c-70d9-43d4-8a7a-a852121a055f',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                systemName: 'a2149yut0wl0i4fa8wk2',
                scenario: 'y8skootqt4r8ycjr0bu2e9pz2bhcz9tzlfaxos8dslxqbd9x2mfxilbgdx3f',
                party: 'pbfqugd5nu3oriz3l5x3qti70gcx2mo52031ahujx4uy9l6v5wxa6o1o2pcnnhdxc03nngv8fwlkeeqmqnsmwec50g12isdt79swxk6v4cumdmu75f7wfsa59xao7y7rupzf9bw6ehdmkunbvbwwic121gxhtn10',
                component: '1c2mp39lzpb522o6kt4x4knbzx1tgfl4vecqkj3q8to3ylwruqirs2ldu9mqjrrltnfj04hru3753bviudbshyns552w72qzk5qrbxlx3hko6zdmolkbtlrln2m63d5m5kpdddq6ceaatvhsba5bvzthx5p2ap7d',
                interfaceName: 'tmvaxv36irvlzv2ehnpwy92c1r36f4qo1exv0o4ebzv75zf3t6ac7so5o0xy6plbvnsx5lmooy435k94mfngfu2sibt5a4n1yqusk9ay9syv8dusl9huw0el9re8cxb2ysiv1mfeq9jrbnlozt5wowbpo8ovfnut',
                interfaceNamespace: 'usqc1haeq6iiuiuusisc2s00asqzrq8u68q1zqktdiquw1olw16zfw3jsa9mo5b1osw639pmw7l3ymbb32b8d3yrydng33i2knqtwjkzgyvjxg7vj01ijyujdin19di5r916wx5hdyhaahlvreq8fq9fda1fkbh1',
                iflowName: 'pw08ky000gofr7y4wu2ad2l6lv6hzsknzjba5b6ixpcdlyblb05jw7gbrtzzc201itthye45b041itueg00ai4opgl5etchlfacb53l7s1ge3qcx0l8uyx784t6zuf3vnyc4ijldlk6ez118grwzz3x9cnim7te1',
                responsibleUserAccount: '7gpvmsnolsecom65y0wu',
                lastChangeUserAccount: 'dki1gcf9iqo6s4flju05',
                lastChangedAt: '2020-07-06 06:09:17',
                folderPath: 'feke43ciwh35l7onf2ljpx6p1h5jh7c49v5o2pw1a3nhn4v238skvqq33o9bs4d03xwyu5mdigqscn2fc97kb8muevilixzdja8nc6rfnzismav33p9u830ikisn4aua5jomjley6vrlcss8800rzrjyiu13d4vfjwwbczlu7pm8yhaugkkkfbtw0584sld8egoa92t22kmxoslodpfvn14e6b7n0k5e0rbhggvqg73k8zi5og3mn94sw0pnmip',
                description: 'mgxbct3la9avfjcsvsmzelr5yx0butphrc8wld0guugqr75x0y16ildtlsz17shyyuizq6ks5ewtts0qovy7may6ffjvwfuyrokm6qxcxxrszi8d814d3r2n7cktq1jzobdgrfg589h7vdj119pa3lz1ewluibn3bl7vwhf4kbrrxfb48dpdad1my8de7hcueqb0dm0zklyog1lk77b67l6d5v0mikguu06k01p9x9r13xyhf7pkl85j4kvbpej',
                application: 'lxe9bfifcao8h8qzy73epo7i3zmgom9w9s02v8hquxyir46ejhm1dnvtyj9y',
                isCritical: true,
                isComplex: false,
                fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                data: { "foo" : "bar" },
                contactsIdId: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2555e035-48c1-48ad-97a6-1e3a58b51eb8'));
    });

    it(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/2555e035-48c1-48ad-97a6-1e3a58b51eb8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateFlow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    it(`/GraphQL bplusItSappiCreateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'c69dc8be-01ec-41c6-be9b-3d29afd5bbfc',
                        tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                        systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                        systemName: 'as7z3byjgsmxlbimvt9h',
                        scenario: 'i45rjd66pzmnb12optb5l8hfzq0iywbvtdiof3iqcwzfsx8dhc6v0j4jh84s',
                        party: 'xxb1k8tz7xszlthxp6yiq6mqwf2qazigl8nmvsbp0v060jkdtrtesv3efcz5wwee9ax08movdoeljo1lu6vphjc7l8nkwixfl7mu3y8pvgzuky19zpdt5affpzoyocxa1awb3uj8qnb38qx79b24wn4p9ttw7p8a',
                        component: 'kfhdhpkb5vjf3kyecjzjsepitvitp5mrxfoz8oxqf3tqrv9fk28qwjhnkc02c0g4vjn5vkpummoga0guhvwxbx02uyd19lk1yxca2n1nlq4um6k828pdocr9krxlpnan6fvx9jfmod7fbi6aglygylqny1exfr3r',
                        interfaceName: 'ruot4msjp3owjs6up8tv1cj9ha3wp90dmtcmmnfdqdg7laar6q1j4gdp87wgu2ds9dv57ka83o2ejlhtq60v6derm2qn1dxby6zrncluz8j05yvze21bb62kgkshz5d0yorrkzd5qcys3xexcvgxte9uo9t4gm9y',
                        interfaceNamespace: 'rw5r6rne5fut9rxjqhcn20m49uuuo0ktjl10eia3xamp3f6lkxald74e4ulbc80k934tol12ms9ijht8xzwqf5sx8z5w2d40l26207ee8c4yal5kvmisnqfcupzob31nh99pjopidf2qxiz5bgrpd010wk6k0p3q',
                        iflowName: '9dsgxhyyik6s02heoun14hlukoed6bmsfxv6smzpsabz9vdh6tnhv1lz434mnlj4nyxp3iwolntg7smtxnk38mjxqdesixsvf7m8mv22ve05uh12nf9ezv5gh9s0w0rdhk0cqzn528ifjvog8k0wgmrk08vvy2on',
                        responsibleUserAccount: 'rer73b5vedfsqk73pquu',
                        lastChangeUserAccount: 'bj25zsuiuqr1ljkvk3oo',
                        lastChangedAt: '2020-07-06 11:07:08',
                        folderPath: 'dhvv25wmyihoztj1aoxs97qjxfqo68ny2fh57cyf7hptafsth24eykcphuy6og20ferqkogl2g425mbrg9taqh7uvnh7yaf9hylsahlnw5vqekx4tmer824ieunxtyiwkvamxosp9jsz93up2hho7id83iq506fmb8f0ujkhq6dvg59ivjsm5fq53sol9whznqdxzvaz8fe1tuv3gwdbm9wcqbmd2xi99q3o3l8jknzwxw5j5yif05nt2jz381c',
                        description: 'c0r6cguw2jdndb2drabzfd68lcgqoig1w9hvyrql63ro7rxovrr5ngh1syc3mhsgeaf4t0qp9bri0njkj04mfsth9ic7igtcmmfw5mf4yvg8u25wbsxrnebvn48fd9hdigo3dskcbyymjcw70gm3kdue1hj6lyfzv3n0qbfznr8q9j4ag29e94tpvazk0t1eolklyhr4ac0ncd2zhcjrvdexwa29siw2jvhu2ql5xjyhee6ex3hz4iqmb2nn8bq',
                        application: 't5mv4a4xxfs68at91hk8g5gmpcojg0au0wz5sgd7u268xz9zctziof3a0h7k',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                        data: { "foo" : "bar" },
                        contactsIdId: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', 'c69dc8be-01ec-41c6-be9b-3d29afd5bbfc');
            });
    });

    it(`/GraphQL bplusItSappiPaginateFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateFlows (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateFlows.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL bplusItSappiFindFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    it(`/GraphQL bplusItSappiFindFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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
                            value   : '2555e035-48c1-48ad-97a6-1e3a58b51eb8'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('2555e035-48c1-48ad-97a6-1e3a58b51eb8');
            });
    });

    it(`/GraphQL bplusItSappiFindFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    it(`/GraphQL bplusItSappiFindFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('2555e035-48c1-48ad-97a6-1e3a58b51eb8');
            });
    });

    it(`/GraphQL bplusItSappiGetFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetFlows (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetFlows.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL bplusItSappiUpdateFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '04879e18-b345-4c7a-9bb7-4e50aa4b5310',
                        tenantId: '18f65cf8-8917-4032-b357-4ed7899c83b4',
                        systemId: '5455bbb2-c95e-4ee4-801c-081e0032a90a',
                        systemName: '2ytvbsful59ci7xsuro1',
                        scenario: 'cr0igs5iot80505mff4l0fidy4e3njdd3ipynkoweeq438udimp0zn7pkou1',
                        party: '09xehtfj4u0iv1eic4kyihx2k4kj3v63261bkkl7ay6gykxe02s0h3bmxwv0grcwazdmtge8477ifmx7dnzjmsy4qht265yjjgflmq113w6g0zmd3grukkjtbhgxukgztnbtwi826sf48j4vby1cx68kfthyvt0l',
                        component: 'rwyras4rbazy2n8rkme0x5y0cleddg4sfg5th7q02cdbd3fx5lkcusm8y7brjuxh52gual1y4i0uuuqae1jmektypp2a1r1nf40cgiwhwddmzh4nalpfhou2i96x1xspqkvv1mziucz0gmswbno0jlbmvqa9lmw3',
                        interfaceName: 'xabo8g6ln3t5ze3kfd76wn3rpe0drzjjt7wmv1sxmq1gb33ay6ssqyp5exvgczcpu4nty1vjdihxkqqczhpyj32wzllf0ya2v4idhsqlusx6qouavxd7saiu849a71akgu97omk7zar6c0wri48toxwmkq13awke',
                        interfaceNamespace: 'ebataq3kuib5v2kbvon3wlbbjwgzn3i6n9c5qgh3gw6dcajxufkmp5xvtwkvwhzzuqt95oisw577fvrckma91q2g1wogoxtm718xdbh6wdxb7kd5z7380quhn05kd6bap3j2c0arkcmjhudcqopbh2d2vr7o1zvv',
                        iflowName: '1l9xwqbtxy6rgdbn8yrl87d0f1g9n1oueaxd4d7pnqxcwawgtxjs5deut8szd3nor3qx5l318pcg98x73f2rq27t6t7u1d5ixrrzmec0icp3nraxa3si975nzg4ilgrxzki837j1h5iu549d4dnz8p7jasxcaj8e',
                        responsibleUserAccount: 'iqebgg5jy83yy2wcexux',
                        lastChangeUserAccount: 'lojes08qwc2yzzff38p3',
                        lastChangedAt: '2020-07-06 06:59:22',
                        folderPath: 'oj15m5bp3cwfru7vlb89gfp4sje2600lh56kv2rlgp3nkn6zv4lyurydk3ol6h7wzpnp2r49bltt7yw2eiki0vsp8j7utccmih5uvzlebw6q27tr1zy3hew94v022rzcl28w0fzbxpoieq5bsz6aqwwf66ymd89g5k8hl477jsjqp0r9pvxm2c5oq7fb5ykiisqmzpk2v0s8494zygdxjh6d0ydivborrnc3uclewqpdzik7gpp268zp9qfrqfi',
                        description: '2wh2qt5yunc4sro217el24fnxt52as7na3j5xrystiy9y55mh9ncnnr7bewclx2eqb33jzs3ix012jl276dz1xmrrxgj690fzd5m04ufsuvk3f8b48706lg2218xc3dqy0qzfs8ggj2k96llzwq5at6asaxribf2gjahobaxhps5wbno85000tuwerjdcsoef3jc7wrrch6cvc7694aq858jzqrwyn8q59f41k0dzozogh5rqizut0czb58k7j3',
                        application: '2jgidhlkwun53vfidkq6pix3mop4f9xosto1ffa6ijf8nbaozy6zxldw6uye',
                        isCritical: true,
                        isComplex: false,
                        fieldGroupId: '3dd57f63-193d-463b-87b1-c8d7d7625f87',
                        data: { "foo" : "bar" },
                        contactsIdId: [],
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

    it(`/GraphQL bplusItSappiUpdateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8',
                        tenantId: '0e78d2df-f68f-4ec4-accf-64c4db55a59d',
                        systemId: '89c5ff48-29a3-4258-874e-72884d6f1c4e',
                        systemName: 'neccy5ulohtlizktdhfp',
                        scenario: '9y0c4rqvo4ay98k9ky44kz1mh4vla5vg1b9bgaev01mkqnwtsf5qyhnhw4n0',
                        party: '1n71m25b6exfnzdkxvnclk4ikfkd5bzpmhtw2nj1uq0nztxaspzb7sv9xrbmpuyvoiv689q1zows7da5li3yg7fr2gl3ov3jjqpllvy8h2snoo9vhfgzal320v9lwk6wilsv8jgkir4bm5omfpug8iqgmg9k0rjm',
                        component: '2hkbekxd87d384sd4ou15p38ah7lji7ezyyz10t6xar6rmkosv3jwvzpctebp5weexmp8f3n25thend520l7x87cg2jdqeahkw1tws0pqnc6kavixv0hivapzlw1fi7biq1j01nbs7lck0l2wbyn5ujvduyk6bh1',
                        interfaceName: 'mv75d7rltugexzw5yavdlo9pkrniot3ex9z45s0bac5dgsd5ejkm4fnxnwgqrsu7t9zf7znzfjippftn3c2bo05aq1pkmzz69hrp1mus0tx6hddd2w2b4a51cr5750avop97pvsroybnd99xc1qvw5qbztpofypz',
                        interfaceNamespace: '4wnn363cfsytgz9f107f54pj2aep8plya58jw7w39z0c1q2tlzzhhj0i574si5l9e6a1bp8tf5smo91gf8i8dxtzox86nc0xt30z3kwaqr7ieb6p2iyx1090xhhsv9h132f9xgrsrjr883d41ej6q8xf9qbkzxap',
                        iflowName: 'xl6qf1p5wrdin15nw7n17q42gns1q8y42511evu3sp1j2ym90543dnmgta11hbtcb6klkybota4b1kumzgrk241ovxu6ob4nsvolxxbf6kizfe3lgj0ztl1x84ptomxb4t8sf2yy2g8u9iwk1c7y9eburtg3yokg',
                        responsibleUserAccount: '291q0akk4tgb37qmcb4i',
                        lastChangeUserAccount: 'ks208znsmhlfqtapv3qc',
                        lastChangedAt: '2020-07-06 15:01:21',
                        folderPath: 'c4ddncdnsaysqgfhu48mrh72jrxc7wf2m5ihui8kfeahyawhscsehdmz8ejh31c6exylljpak8rtuivgmzxxubk1k4bd6f5uqgen2x21qzfbt0hb2mxecdlbkhb7zfmm8m1rb1xcyn49ty54u142sty4p15z2u759udx0wnongszg8bmb8xhg3q39brcexxlwe6g5hnub3c74rl69izjm8xoe5z3gitwgsxnvw2z0e5atz5iqpyp03rm8746ah7',
                        description: 'jy3z9wti1ey2mgm4v3va25reloojn33jiy63ynyfmzuh2h9fm8spt9axpcsapt71uce88antsvuppsoz7sinpt9n6cq0upy6l38jyslwwjashglcr4nwdkyl2bsqagcpdplg3d5dodwnmiu60im1cqswxwmerp2tsq71d72keyl5e27kuihcjtmx8ktv6h9p1e2iq0jtp3juekzcpv2r5lvi5666q6z59my67ylqq7uuhu8hpxwfnrqkdrtfdn7',
                        application: '7sbiutwupnu12idkj9ij9d20wnjglf1xb11xnomyf86wiyn9n20emsx8ksv6',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '18786df5-5e39-452d-99bf-35a1b0bfe5d0',
                        data: { "foo" : "bar" },
                        contactsIdId: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('2555e035-48c1-48ad-97a6-1e3a58b51eb8');
            });
    });

    it(`/GraphQL bplusItSappiDeleteFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    it(`/GraphQL bplusItSappiDeleteFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2555e035-48c1-48ad-97a6-1e3a58b51eb8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('2555e035-48c1-48ad-97a6-1e3a58b51eb8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});