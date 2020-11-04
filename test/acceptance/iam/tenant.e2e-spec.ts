import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ITenantRepository } from '@hades/iam/tenant/domain/tenant.repository';
import { MockTenantRepository } from '@hades/iam/tenant/infrastructure/mock/mock-tenant.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('tenant', () =>
{
    let app: INestApplication;
    let repository: MockTenantRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(ITenantRepository)
            .useClass(MockTenantRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockTenantRepository>module.get<ITenantRepository>(ITenantRepository);

        await app.init();
    });

    test(`/REST:POST iam/tenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: '3blfs5sihhz092ya8p94ym58a86tc65fkcieuiom1nkecb452d202uhuxoerbeck7sz81m3u8eyygqdclo8ebotrzq1vvhqxxfqaked6tqgm0bfj0d61h3opsrnisd73rioxeylaysmfe6tf0nuni1omddhcpk5dqxm5nxkex8tdqam0d31jtn5kdhgxsedodneij5o0ntkhbivl2g0xsx7ppi5592jqrfk15oznwqbkzg8251coek0ew14voez',
                code: 'tud24gksvcf852662wwo60mjap9yutqip18i138kfz3ve62bh0',
                logo: 'd0mxjuzv9epfsdgpkba6jphm7r86m9le7ofu951dzqydyx7329n7z9294jsyxvqu62kwbvlo6k7nbul909owurwzsluxrn3rubxe5vdxo9q81i7w3p0rdnqgk7cng1973ndin1snj6l5msp0ceb7q3bqd65uhse4urmu8gm1o2xrt87jn3yn3few6584yyesjrwbgqiw9fzjcwkcndp4v5r2lsnvofwo6yot1u4swteiamc72w1mbfd8jvi0wwg',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                name: 'yvldmr1d98qqgsdizqelayuiugdotkbkmez9l8nqxe9h8bi8cqvwbtdofhgsnd650y804friocsey1c0ch4m2o8ry2bcw9j1cj2jpisieb77d8d2ivwg86nnnd3n96ndbt31kpiwxaoixi01bgvokvymp4e4vawag7bip53x7t0w4l1abgni3605dv7uh0u6gqxh5eozoqkfg5rzdjauhwcdfzyy9x06xa7dwd5j5d5ditdg3i1hrvrpfgy4y2t',
                code: 'pz4slk4h7kr96qphxjeni6q2tkxi3e7nsxhv3froiw1zoldkg3',
                logo: 'a6y09f3mgif9l2bkvlkd20rfd7muxc9qsnktqdv6ry33nxlz4pf5w81xhtz8mx9oszm120vvqeb8sd74so95o8dixlylcb4fguk50l00g8tkntkg9uagea4zerixjdge7teewf7vez269jy3tb9h5b4xvxtam9sgarwl8cexxyrkr7v8th48nvk9xdoorc1580gdxy55n8eoh4sp0qldcn1zj96hwi1jpxvkuofg4oycxxm8hqa815y0374qv5k',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '02642693-0691-438d-a98a-872c33b2ed27',
                name: null,
                code: 'pt72yvun29wsnptkikm0cg5nxrseh1b58od42mvpu3lb4jddpf',
                logo: 'fawuz492fcigjpcp2y4necpz1vz9hf9sh8syz9rtegky5bnpild5jd0buzyofasd8g8hi1we3lc7voe1pl8e2erewaq967r4f9ajmtte071l2r392kpeyf4l90a5cydvjsgc6vccofd5ld0neyr1wcrxjif84671ifw7lffk80hsesm28s57gd1imd0s3mo7gewtg7o2amn7kylxaf040hk70d9vb27z97qejjim4eedkr3cm702ikapmf2o43e',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '02642693-0691-438d-a98a-872c33b2ed27',
                
                code: '6jvlgtl7rckfflc7w1j1l5nfzunt1z46hcmnp90scdnsg6njzt',
                logo: 'tdozzqu8y3572mwm4grvvtbayo8aeh1a8g88woey00awc6yl06yins9pla9uqiphmr9rx6h085me3rr6188x8efsphvpzolzp0rvvelbz0pnhxxepawawjdqk47m6ym3typrvumpvvb1nogvehzupj9ohlx7m3bv0f0rrhsj0j89peqcvfc5ko3l9hbnsh9djn7zeq19hpj64ifwkib97a4wl7egcdmfgoz7nbjfhu2b3fd337cqu72v421gob6',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '02642693-0691-438d-a98a-872c33b2ed27',
                name: 'hdsgrdl81yzsv0vzfkhp04qg0z69gqn0wyiptb7zgryesdkhdbt8xq0ceczw4rakitigyl38ntjlq7aw7feu28azh5h4bmhdb9u0deni5dtfv8w035rjmdqadsz11ipfwxouzlyifzb7j8zqm98ih7727ydugz685y2luuof9kdvjdjhn6c79aw3104s3kuohhaagphj3268lbwxhebsng9sfmyh88yov5pw5qrdci8pmolyumpkiodojyd25ok',
                code: null,
                logo: 'rnr6ue5hal67mumdbcrniqeyh0dge9s4j9xznrrsi4z4a6ot5u563bf85yskx4p1diyr0ld5z37ai7ylzdp2bg2jlcw91df9z6ihdkcpekhkl1lultnmfbzvwvbjsc81ij7am29vdn480gjkgib7gb9dzbcvjl12oqpoezzuquyv6bhnh0ql2aobzf1lrgkcbeywixp4gfvs3xuuzlmfpeqz78oth9bp968twj8esxk3ag8uv32tjzayiu52a7t',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '02642693-0691-438d-a98a-872c33b2ed27',
                name: 'v3nc8sd98qbj61w31w4xcpbhi9l81bveyayedjhgqaesnwrb5lo6dhhlavhhx2hmlhwgaoktk0jozrvfg83vfal42x11cbken5n699p6t9zqyaloalqfckbttflhffsx9awgptavgao2d9ky1w4knk8voijoh82hr9utmscxvho2cyyuhvfe1k35lt6skevisneqaq232v7sbsla4d2ezw2ivp5m5c78v5nshv8fvt9azczbrwiv2smzorfulnp',
                
                logo: 'e6s9ijh2nefbmnaw09wrx44z429lvym2k1s46r5yrn91uu36qnailzn50bm4awmxeaq4vhy0wklgrond7j91atisgsmuxbsf120cmfkbo0fpg76cj6mkro8nm0fvzr7x9xz4sn0y592xjbcfb49en1sunt5w95wtncaeqw19tefw9obr1z2t3f5e1s4wok47ffnx1gwkyr5z48g25rbd6yqt03n55b6op573l5ww86p2il8ud5ewl7cx5xbyzqh',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '02642693-0691-438d-a98a-872c33b2ed27',
                name: 'a94ruc8yxjp4bt2dc9zfotffud0otkllhok9mlgziuazwk4pee0zxq9kubh530kux3hk9tqpwgqgu4w9iw1m86ijg5llhg0t60pak01rp7z2z058qps31wh3zdbyzze1zcfmspafvrgyuqal9o949oddoy2h4g2urg4i3jvx7hwv7mrdt1mkay7asgnvf5h6uli0fcbobj6xpydoa045kz1w9n0lbcwdfhltypsrrqygoacdw0v2wetrpc8f5jz',
                code: '4zzzoh9u9iwf97dcj9frz386k2xi214fi0p1rz9p2x9ik0vo9j',
                logo: 'ib96opvivzd5ks7ozubws7vg8n5l9yyoipm0lghymirozscegy27u8tntb2gkpxiukbwlkelgmlsieuerhsiptrhb5durnobgki5cgll1pg5v4g4rj5dob2vvjkadxh67irunids3akle54jm9e2t92k6zn6xg0l367wzbdygjga6r5m3f539qbhhb5oea4q12o8h6pekvz8zqmsnqmsnm1di3kdh6ughph8f0qxn7w1biy54dy3ghtzqcrg55m',
                isActive: null,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '02642693-0691-438d-a98a-872c33b2ed27',
                name: 'qhdzle90y4iywbe59wyck6jay2w63riofe44mpo8i7am0nijxv25lr9osw1ryu3z7npd311icqn14vr3zazezpwk1bh0dhzgdjqzcxu77fmdiisgnid06xa8qp13y6o204e9axrcc1tfuzdlincu88eyxerqom85bb51hty5999s06ghga07eokzgy7llpavjri08mtx568aqwmp9lu1sy79wwpy2w7s7xbq49pjz13dw7lcy1hxkql1ifuj3qo',
                code: 'ruoksu8vlm87u5idhnxi8p0cxokspdce77mxslawvsfg19c57j',
                logo: 'r63w9m2ujznqlso1btpn0xdkyqt3uomfks1ejc1ladm1ksa6h54uune2g2cejhbd1gfz09m0ytkrzv6uzrhd6bt8izhvlejkw4kqcbg7nrlqjp753o39wcev36owk561wm35bpt30bvwd2dnlujgndzdtfpw2uz7b4igvruopk9r198r8pic3y521dg8p32piamdpegmhsyxx24nvoejsy1z24llqgtll59g93kmlt8pl9s0vzd54nm9c00iqgv',
                
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'gkqj4hmaw7o7wqvphi5li0ns7hjpj5ehwc7oc',
                name: 't2ucb1kt5ppy445jlkfc4xmezolnd0dvq77kd9zcenmzu27i8x0g0b3bdc300oyi5pphcgnhwqp2fn3dwa4xp3pjktprzh3o24raflibhgcwaargrq9196cyc2mfni41k1yvtj1dzys5x2n2xqli6sitauztvr0most8b6bf1uvgue6uj3au1m00d7f2f603wtjjhounkqv9whyow6pquoyel2qr6979uaqddkfhk6aapc5m9391u8b2xf0mmra',
                code: '75oh01tqe6eezb7newmp2pg4pzbn9qnznpofb8ksoblk8hq268',
                logo: 'kswa4u3f01h900l91u6rez9gcuigpqp8irisda0tujzn4do82xpoonsxu02zowozbtlbkodf4hj9bv40frb10zflfkzm8ekhzmpmequwssfmkg9uubjehzbeinmq4a0gde5uhvudkqudn8ygljt9vqmlo4rzdgcwnkhvy3ojjcm21kbdvjksa0xi9cdgfl8gil1y5hsaxib0q02v0r1aya85ehnnleqawj5ewpo38dnprgwazxru6eeubeluaza',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '02642693-0691-438d-a98a-872c33b2ed27',
                name: 'olbmdkakmnwa10se43alodwsms4q23ywdq8wce1z5xdujwgpkb2fn716yeg2xohhwyxnbcnjl16558k8lp6b3joh781nvpdth5hg1yrw7xnp25ba13kcf5tcodxuphwyfg7fu8qki7yzz4g0dyg7txm4xw7se83o71nxswyqzzt8oseg6avmp1qwdlklbllbywq4ww5keiu5zkyllr7jk2hhnt8lu4ctqdmpex8kyfevqqg65ei5dazfo74abojw',
                code: '6ekj59hb65no8u4hhcnn3iwcnivhopw6dawk2h2yg4rhi9b9cb',
                logo: 'dhqs5bm4le5gybfv87egljmpks31yw92jeltwkaf0jzrg8d5ptvqxsgq35qrgegxw44cga27wb4daxfte1pebzs55fgcfjv3umyownp2yapb33pq6ql1muvxm6mg9el4ik4c8xo1omi9fqvwo6vkma5t17ass27zjlg4xmli4bswrrua4hm6g33nbxg5h7p0fj9tskmmb80mg4hm4gryv69354ehxwb9yqp4wp3q7add6ig44dovwxrk8xo49ch',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '02642693-0691-438d-a98a-872c33b2ed27',
                name: '53o5jgys7k8s9ibvnzqw43cil1znwsirk99ecpxj5j3hjqzo8xjtylcf2jivqjqg6zyyb8jg9qxj9ivjd4r11x0gepb66bnfza6i06azze9rtsmurpb1m5sut6p6pfpah4jcf0qmoxq9tk0m42a6ryx568vwpgi78r0wovxnunog8g3kv0g5jsizc8zgjni8ecvgycr1x7ovwqf41nix5eehewtjam459cvq5ue6kcaralecrg5mwn5wy0wg085',
                code: 'l8qk2fsjxt9o4uv7429e7nw8wdyufezprwxb4zvw9kpfcirrbsn',
                logo: 'sh6967slc222vk685ys7j699264azwo6xgisst5nlmruwoq79jp5yaj0fyczlmus12ogfedou4kpo7uenzul0q6akcaeigi8fhuuearewtgobowb1gorg3r80y9wxo0vh1qwwvt4ws9cn7ldqxew2moufwhgpzzpc4skvy10svn9hrr4nrtiyyxsiswlu4a761951pktz1cv4y8m8vf1sicmvhw1bm0e7ife3v5b0sng4jqdez5z6u9rafjl3i6',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantLogo is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '02642693-0691-438d-a98a-872c33b2ed27',
                name: 'dbaxy1f4cvvepo9upsuh1wrvytx6up4k08341wgwec1q47cty1uqr74snrv0sow7c2skbwdklsf02q8v34f5ajzgu12dkdgjcnoceimceazulict4f0om6143pbklhgpcekacf7nfut1ro9gj3y1mce1dqcgme3sv5yrsoqvgtgmnet6zr9mu5a00vukyeg3csn4pmn3p8x2xfjx710p47uw6jqnq9su3msqsi69l11on81z3ttoyljmu4aw37l',
                code: 'urdwxxe3psgfoujygvrps319mbfauime9ld4m5k99ynye4az2s',
                logo: 'h7i66159l7ywqkv3heprgbwcxkw7d8siz1e6i888d1kk22229qp9sflwr29moasoozd6eie9c7gawiaeyo3kkboc55iovxu52jpj5h22v5htreqzka49gyo10h9ps717sbikk9x6gp3y9rlfuxn8bj2wmyb9tsb46px6smxcc3cdtoz6ci3zv53fg9gdojc04d8605zvm9ht05lm8b9sco14u9xuohhnh0t0p6nmgk5r5atokzyhdvwdi8serel4',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantLogo is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '02642693-0691-438d-a98a-872c33b2ed27',
                name: '72cuv1bt127yk4yrx4q1wmz05kuhmjfovveqquohvwf3m46z7ll5i0nmg4bxkvo6vptc8574kf8z4uas7lcfj4mc49amekpp9mg0kkbsghnpxlwcekf1hmuglqxoet74g69l2a9gj3w02hjzhtbuoy1d35ljorm7o0m8s1g5f0mhufbzgme36bns3v3tntqzep7zfrtcpzirxujg5z2cdv7b7ly7aa1rlessd4dfzq7cmxz9570i7e3801yixfz',
                code: '36aah8jb7kkompji3vkt0cdydcbd6koxqkcyklzjaurhv8le3j',
                logo: '86mtbz3vg3w6m0jb46jsiebc8k370ilxp1gguy2ok436jh8h8nfz02pa5t6ffztyblvo4pf2s73ngslk9ucw5vb3kubginp01h59608pzbubiloiai4uanq2dkvqmal8zptdldd6lz80paybu4nkq432c681qqjjov5rd6fm7suuibajyfscolnlaalo9cvq5hv587vdlriekwrph9s177qnq480l5h2q6t7276k9j4ymm2v1d0ttb7ioz8vs38',
                isActive: 'true',
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '02642693-0691-438d-a98a-872c33b2ed27',
                name: 'mshp6kw5tea8ojoicvhjddyzdfre8rzcc6k7jij3wff5zz8ocrxlptw96eixfmse1kw6kw4x108491fz3o9lzky8k4311ptlacb1opd61sl4bfw0rfmbhvgua0bfftrlaviw7e3gxm1jiju31qyuqk3am52h1jai70y3d1hgp0a2jrq3nob3ph5oi86604bqk3p6s8rkre20g3chxctrqek9y8af9rv8rlhek51fwiiqtuhazqgpb9k7fi2rhge',
                code: 'gvmkgvwlc5ekbsd96k7ysbtcpawlkz8hpcpqzqk79n75u48vu1',
                logo: 'jrxbkczfwp669ydqfb7iko1iif3fsctdm4n3johvhjwdec1nuskzz0036evqddzu4394jb2p1d6tyt4m0bz24becq5fuw5wyb8oyeytfpubdbk848cpsamd9trzg863wzuf7luzqivmq572e96tn9m5p1bv2tazvmdf1skx9ds7r3olq6adoy4req9i6aub3f93oumggowv4ytk6sou6tfaky5goe8i7wn9qn8q0cz2zvvbfah73twwzb3w9o9d',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/tenants/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenants/paginate')
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

    test(`/REST:GET iam/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '2cbb012a-4dbc-4033-aab9-7f83acfefda7'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '02642693-0691-438d-a98a-872c33b2ed27'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '02642693-0691-438d-a98a-872c33b2ed27'));
    });

    test(`/REST:GET iam/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/ecd81f3b-78fc-4b55-b8ba-2229fab646b4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/02642693-0691-438d-a98a-872c33b2ed27')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '02642693-0691-438d-a98a-872c33b2ed27'));
    });

    test(`/REST:GET iam/tenants`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenants')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: '48c36278-9c9a-48b7-a985-88a414435c4f',
                name: 'nvjo1pzfga66empsq38jvphcecytajlgweczej2hbdh4y1vdubv1wnzcikey1fwya31l3vi373d9laqpume05ltcgpmt26yrxonfofpbio6b9l2570eo2xevu3j5f2gglrqlf398uke10l0hh2da5yqvrobve7cqit3dnxqrvexpxjqa96po6ni55kig2qk27u0ac6ylvrq6g4pyy7igyafhdp47o4a7mhfcjo1afsya6gqq7eh0afiaz13kyr6',
                code: 'fbjsm8iawnowf0047gxxwciulcreck0hguxou6cgxx43d7z7zw',
                logo: 'abcykf0507g591vx5or7tim6u2tft420012p92yg29evr3azs58nd1njwztrv06ffvd7pgmq6xscd56hk1lbpgf1utwfrue5f9dly2jl7srstwrb3tt0n5hmkqtoddm9xjyp79yxn52qjctsdh1ucretx503l5abtsvykc7qpexmkdnv9wpnch0yh419j57nee9jx4z0p63iacufls3tpzl7sdyv4vpjh17tmxkzqax1xpgb8voo2u6yrtct3z8',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: '02642693-0691-438d-a98a-872c33b2ed27',
                name: 'zamfcrvnnpvlkraxt1oewsuun2arvgvl8jaovwweb4rm344krzycnjn4kzulxkfqlbnscsc0j1ixcku388oeo67czjo4c6ewmzjb517ckd6luwokzydog5z53jx4p4ygpubag1qrmshq14kanynqo5wo29ayjftvfojmb56s81reu1fqptgstq92ept998f01vr4spmpcgup8ggdfei60298bpw6qoxq98vx6jmbjlgx7y0e7q0sz673502j1ur',
                code: 'obr4iwl4w82tki3z6ah8i15lwil9biev2gqczkm7dgyabe5dx0',
                logo: 'ewhqcjbt4bb27mfhv1m7ss59dqlsrc8zoiqcjgbc6rxtftimek8rivp0rvk59ttjjzw3ghzips92vgq9t1m6sb4w5nzdmtxpfd1h74dd95ahmtffttt6zd58eimo9152pes5o3oitum7qy90anbvdi2gyvhirs7ozbctcex8ze220u5sx0jhumsjssr3s8wd84lvc6xcns5fiozinahaklro7kko48qjmur3d3nxm85lcuygu7q3z6wc6ke2391',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '02642693-0691-438d-a98a-872c33b2ed27'));
    });

    test(`/REST:DELETE iam/tenant/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/43108a61-f10c-4699-ae4c-f592d4db9d94')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/tenant/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/02642693-0691-438d-a98a-872c33b2ed27')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateTenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
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

    test(`/GraphQL iamCreateTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'e893f981-78e1-4c35-a779-1eef70e50131',
                        name: '67vtej2d2krhna88gryakoih0bjqcvadxbc32jpovqxn3i3vnb0wkvrb4ek21vru6lnyx76n3eyj907yfqx2kxu93s2qykze8nrhpmdyup7i7ueko2a7f8f1gr5akzfrdnxnamqti80ayrhl3kw1o2w5flbrei99w88qkb7ds2qq8vv96n79m04m94tubi0uwf1zz49na9fk863p1p5vn2b1lyfcvg2xujy8bzq9lj34q6jii39n502sro47160',
                        code: 'kikewyxgpa7fgs175z1supxa7dbanrr05lrjg2fqdi85hyo3p5',
                        logo: 'nlit4tbja03v8gb756uf4u5yaa4y1lx63qufpuxmsg0krkhm6tbpkj965p3no3tfyld4t5webr3iu1psqk3kiqavngi2xkb2mokvajndw61bu4cc8wq4t1hqczp7cio65xfgqfd211o5ppdciwe0lqu0oish1t4o9peow6pybbl0q6teog27btnquy3ifk34mn4ejyhy0bcqu39m12q9f4htobxbl0ljtlnvl80mt9j1f4nlyghvqd7syufcxpa',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', 'e893f981-78e1-4c35-a779-1eef70e50131');
            });
    });

    test(`/GraphQL iamPaginateTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateTenants (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateTenants.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateTenants.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateTenants.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindTenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
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
                            id: '13ce63c4-49b9-4a16-8266-bf01e8d3ba1e'
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

    test(`/GraphQL iamFindTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
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
                            id: '02642693-0691-438d-a98a-872c33b2ed27'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenant.id).toStrictEqual('02642693-0691-438d-a98a-872c33b2ed27');
            });
    });

    test(`/GraphQL iamFindTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f74e3111-aed2-40d3-bbad-5f5991750af2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindTenantById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '02642693-0691-438d-a98a-872c33b2ed27'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('02642693-0691-438d-a98a-872c33b2ed27');
            });
    });

    test(`/GraphQL iamGetTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetTenants (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetTenants.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateTenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '3a2af6f5-e4a8-41b6-8da6-e0f52ace3674',
                        name: '0iqvjct3w23uwruju2rshtulyr2d7t25ss7xtd7ooodrxja0a5st83b3q8pgkj8isofmqsrwnijsnh6ijqlkw4arbie3qv19clqes2soky30h7u0db5tatp63mwvsxrbv9hd3iov3a52e2eidf8yn8rbr2mbda72g3zuwguvifmmd74vpyr2rl78pkayn8er9lefca56hdekyz0ibuksjkssd96ixpvu9aot8ei8yxjtkq4ib8jfamp68aivfte',
                        code: '8g3anadoxwc9awlsev78h2rnzpr7d2f1lekrdm8xnait753g5y',
                        logo: 'ehgb3w4fznlznofrsvgxq86tji2hmqmeezv7kgzyf9fy6a0m5ndnf2jhscz5plfkfxq61olc34k6eyspz2pp7glg9yhh94w851bsfb443y1qs95jtnkngxqiiesyz8iy6ivfjysqgc7qrz3rujnkthhtmdb6qcenhe1p3me9vti61kb9t0htkobjdxpjrg7zlj1bzc06z001n9472mhiyeq5f8o8d2r0s7qgq5afslbpzkp4sg2cawcacpnlng0',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
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

    test(`/GraphQL iamUpdateTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '02642693-0691-438d-a98a-872c33b2ed27',
                        name: 'zujx2n8fokah06jsf4sxww1rpxyc1tz0dmtc02y9wwdbp22pbqo6ec62ujvdxtxjmsfw1tr5y58l61xanh1bg1lnky9tdcg38ssz27rp04uawhnolapiyfxj5vxyrvxe7zmtn9xkf5nutykqwvv2pxs8qqlr53qvnne4erhtd5iyehg1g4poh6wa0yuqirmb2ry98d23ohaqldwjjerh55w7frq323jpqvwa1435cy8vblfc40bula17kgh8jlp',
                        code: 'byinborin4cikhfcg43teqidfep2vvt1ftm25dpxuneue7qyw5',
                        logo: 'siyavj7juse8w4kzz5kk2t0hnuykfqtekczqcoha4f1jndnjwitdf5wjgri1mcohum9168hgjcp3t1g889ww66g89y1ogdl4dcrgdxzbid9g75wj08fc91540zm07lk0rdphvj9fha4n6mkqm7cbtyg7vfcwsp3s3twtge3bwp4gtpenft2dk1youk0yc4o9mshc0p9dq3kp1h9ikguzwcy4tbqgzyq97qd5xpjl6pafdb2qo3rwb6yhdq2gj7r',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('02642693-0691-438d-a98a-872c33b2ed27');
            });
    });

    test(`/GraphQL iamDeleteTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5a8cbe59-4de9-424d-b052-517b486ac95b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteTenantById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '02642693-0691-438d-a98a-872c33b2ed27'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('02642693-0691-438d-a98a-872c33b2ed27');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});