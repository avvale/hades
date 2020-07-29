import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/bplus-it-sappi/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/bplus-it-sappi/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('contact', () => 
{
    let app: INestApplication;
    let repository: MockContactRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
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
            .overrideProvider(IContactRepository)
            .useClass(MockContactRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockContactRepository>module.get<IContactRepository>(IContactRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'cwvawdkjzyypbh4jdynlcfjg7peur361y6iyqls3ii3ybaeshr',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'ozgr1kwlg5feh1wpk5v1',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'aznw56biseneadhwz4wwm3rk1u3ir6qr5jb3d60rb03lqobotftqci4odc55ohbige1xu6sgaj57bzstkei76wqsukw06cr07l3p7uhpmvclkntncg3uwbhvswy07o3s36bhctqmbv88stj8mr2gc9yib422do61859aiay6md7vcrt2q6zocn77j17fq01rslhlyx3cexnaas02b60feo2h3o77ir1cjw9o9p9awgmy7fsb8j1boka6bct2zeu',
                name: 'axm00lx5r3clouy548us9x4yx3m616bapi2qxpi3r1amh0cnhuyfuozjf2fkx7uwy5dk9qxva8y50depgzqkb9vcy36gnp4q2oet3wybho9ypjq9mdbofrj0yzm99rsdbk7pookhvt1rnpznh57fxa4vsnaqmmxarnrn7kpalaaiwwy65n41qydaf99bzwsyp696u4cbgzfz9t7chqa427lc2xl48vzbsb2a5d9w1t3mluiep8odxkzom7w3zci',
                surname: 'kuvkfa3c1jm86gs10y62mumsdynnetrsi36lfu7sxzlo46pi19zla1gn3blaw1pf3n877h13cnw2lofyyx0wpi6agk84rf34bmuxpv1i8i66hg7xd2ibxw3czpjpx4lhke2asf2vsx2xi4feeqoj7ui01pcseklbqqkwutitd7ks2whjoycz2drof69cos55siougijefbbd4q8rcqik1i954wsgim1g2krqftxed2glyv2pj3c05klrxy47w9a',
                email: 'my55hvcel3siui7n4mtuox8wl9ricu2478rz75xlmc5zf23xpbhgofl0fazuzvg1yii7jtspuveons0yfdpfq6xpgwouf8i1anf5qto536honhoy269coiv1',
                mobile: 'a6xfv9lef8rj9v11ibj4buy972qwglh045b7d0y70m7we2hz4m33x1fuzksr',
                area: '0hj1wct3cc1pzp3zovzb8grafn3pr7afjnlrfhgsm255pabrf1dg5g986hk9f2z2wsae4a4jk16c46ez93nksiguruuiqrvv69oxb6m6xsnukbrliodck5a3dhhn1at8oifv5pr15dcg8y350sfc5uz1tcb68x6ccmmh3kprs4hig6yfq2kgmdjh1edug3oxf23j3iyqmqa37ibvq9n68pw2uicmfgm63sruw7f5cr9wpwvjlqkgx42x1e6rqzs',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'kb79ss789ejez9mc3bnsfig2o09bukpwgsenqe0v54zd0dr3eq',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: '4dr0phg0rrubudy5amoe',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'cwdim2fx1pzfwjo6me8ifmcucm3go48c670bf2rdk9ijgu1q5osfcxiq7g4ufinyzm70bffnmh0qm4px5nc9ousx66dkc16z9iyszj3meebgdki85c9dwps9vgzwfcow95rf836v3f04j3zvfjl0wujj8i5mgi7a8wb6urx3corxv2kchp8lc4uthrzu4ok9i0r03dh5p07ej738ozcvgzw91uvrm7bp9ey2pfhneg5uly6pft7uemtl993nf4e',
                name: 'y5t80taxzifk69ezlw9ikskblzfcglzs6d5ajg6s4wcrzgyiexpk1gs97h98rzy6najjmtzn1rgx1iz3anqk6lv58si3p04ne82z1tvubczovm9rnbtm74qdul8254f68bvbolx5o6ctlioh2ei0tyk3cidcoc2m29tdj2kfv3ymi8bhrdht0hrtrlnxcvu5dpjs3s05xqqmroz2pnkiucfybo3spdepw8pfwtbcbfcmknohuysq8z7ox7zho3z',
                surname: '6to8e6slvxo7julzfigqasnqo05qe73qrvtfedwghmx7tko6dyjuly08nzu62th7hoc6vzib84uj86znfhkq54lfpf4m5vbmlut514914o73d6u7k33041834t1rfhbbq2vf9ey8u2frmdikmmskjj2fabdp7hdxoc9tpl7cz51rin4fei6alw5atpgej6izv4rrmp4jcds7z1kme0wuzkt4xepq90ym2ry5fuzg0hdg383y9s50obroh4j3hht',
                email: 'kb9kzqccq4kubhi65a5532x98awzzgw4kzh3vnx0jeus7hj009gcr1ct9jv4oqh8g0lvlhefrk3jnbtwqk1edhngkwu5gnq5vx45kf89yoonx1he3108uy1b',
                mobile: 'xm9aq9b9k2pdh3knn1tzasz9wjacfyur8p71ekkjjiunbyoqxrbq3zsone0s',
                area: 'yfeo6c7pm2k14zn26kj8gh5gzta5294tyy88144ysqtbu4k3ut24vku2qvxc4notwdurls6c9njaam3jhteqlm9198bwa8lwz68gqjc5r4m9cqonptvsjykukfb4plqhpoe2n0uumnkmfthmynga13vn5bzznqdhkyxc05vsygqtq52i4wdraoonje2ijyc7prqakbjxkooqe8zudg7h8kfnqqw4132kcmw8cd3u8f2kc23ys5phbwr7udrp239',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: null,
                tenantCode: 'r8hx18pth892ujowgzusx368x9jhapeqgbak3lpbmkxw8yowwa',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: '5hwjewvnih15zn323b6d',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'av9r0p4tb0yssp7j9g7cvhiyl3ybnzwov5j4vzbibvpbtwhdl60pjj9xcl18u5vqs4672sevnd6t1p0bmds5v69fq2q8kao31efevgt1f8j1tt8hn4w9afb40fubeku2pbj4sftgq6veq7qakaq0233mizsvetzdplcpdxw5bxe8wzvvx1uedbd9qbgxr8qpkqqqgs69szdfbkjnow1rq6gnizv7v40vgn9o4uc7y4398jzgq301my03xoh2cdq',
                name: 'oc0iabdbd2o8fme2130bm5g73yrqe2y0ff5e58od03jdcnay3rmz2o0quzmj1s86yt8tl0gvbc8nkwvldyiv1ayh67tbpkmn9n312e5vimvv3kyqbd2oj91c6nll7kfv6dtgcgh16persra0vqkc6p3o538u3uv0ua02hox2w23rt0wd0fe97its81oiimd49bvfauk7vie9s3g067liv7yyo7wd7pdi6ndeg6q348y98z4ch9b0u7d1kchd3kf',
                surname: 'vw5vum8ku01czw5vfo4edmfbb969tbeo74w9stbcui9y8pc7hj8vnmrpr4ifuhc6osoq3f4f3l879po8k4nirdw4ziuy17ylgjte1yalm2ht78g0sxwesqxrhiup9h8pba9aqxk38fy06p17r2fy6c6av9b9n8h4sr1q5ge6xb5opqaxf3m72q9brqitzv63vwkva0gqhimhpejssmynbtg8fh5przfn37copj018qvsi5gcr15gfya6yxrtdc5',
                email: 'xgqtt49zfd8tk056h2xbq75mez9yn8x43hfpmr2ypzamxix7csv9awufcwbdejst7gj48khwu4nc6zaavdotx1m280hgni8qtn1ovzp2g3sqy1jdteoqjq16',
                mobile: 'c4q22u1irx0dzu4oj923u6avotkvqu52zs0v7zrfcy0ymjsm2jwedlmhgpx4',
                area: 'ftwkkxxg63ske8kxr6ddug2zi4d1wwnzjbfhfvyot21uq1r9e994f1r7xhxv5483laagl7wo4h4hnjgnysvpypr4ni3y475rvi7gg7n7v0d2biymora1dc9dxc8f57sl4xe9loespo83943h7wj4jxogv0mxmwcybmokrb2wcf3i1lktc2fme1w4yybyp0zmjut3rui3h9qzw7x2s7rhmz7eddctuxzpyqgcqd4bf0obak9e5nfv24k1dotmko8',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                
                tenantCode: 'bsf1oj4kjq7cuu0c03c06cqw4fv4eyr77tkd11dbdz53sph2mo',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'nr55ga4uveh0f8hl7pe3',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'um0g57mh9y2guzuj3eff9tz71h3x2fwsp2n59sjwccj5jje6q1w7lcsxxywvj1cg61zvd0j3nza59vg0opjy8t96c5acis8c9f4i8myz35t19ru5uzoyzzj8cbijag9hhhoewwauck68q4j9q4c2om9ote5iuohqzbdimy9k22exshosappo4u16wvht4jf8phl1otq64jkyr5v3hryfk8w44o5xpulywv1rqipz6tx0aozwjek4dah7y7ieyq7',
                name: 'k0vyg2lqtwqgcjo5k7zjogewcf8emh9q5w1uzqmx4ri5dtr5qctqtty41ywb99ii80pt679f3ksclys6sa7sfuvqlvgsa8zrzu428aketd5sprfe0qyhj78ixtdn25528yn421lbx0b5miz770u7avrsw7glv585vyj89qvtqemolfevyi7n37fea2bl7e7ysgsng7xkk37ph6eugef5ch4by9cdmjsxv5e3zfh773vknjp2igvs553rymua99p',
                surname: 'hyn4zpa3ncqjkdliudt493kea8214sepmccpwokvvj5iym9nohy1fcebc10n3lfl377bf51ite4gjax5hy546hfgso9e3uz5h0ck2n06dvgzngubr2oyos83ob2vvg0nyjp5s33ch6hyokp83nktia4bwdimp7jqc2b92qv3k7zk2zlapeklui2avvg69iqdtp5vwdios3s28bk55hzih63zeae2bdcsr2em9nme35asidqe467cp8qy1r3cle7',
                email: 'gwdhphnr06l3eqfigwxmnc5wlunywg5fg0s4h28fzwy60rs6w8g5qydbd7arlq4iyk1nrp8pct7rg0s4qpe9qfvr7sl3qmisquom0do7qtlvgiyzrhhpzvhs',
                mobile: 'qk871mx973ikqp3lcoqjxjdhqhfsk6jcunjt1nuzn7jg0jz6zcpeqy8bgxgh',
                area: 'd3y09jrc9p8fc5isbiv64lrnrqmt5zr7mp0n3n1l0oqavskiiz2y8e06th9ig0b68jpmw0ej3ymycexwb0xmwro5i7mjmxihtswt4h8e5iq2nfyc5o2wr5oy2aomp4evu4qq28985qacciya7swkj9rn6jsyluf8a9dhs4doookajc18d9hmb32n2nl7gxesu8bbf7rdr07qpsg8cuwcujogombuafkc6ucd1ga7bodhfdxvvmim860kp0pfqrl',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: null,
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'um28fmhy0emyz391qxc7',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'l13fgbsp6a24xkc7c9m6tbbkypq1d96ux7gr7oujb3qtw1l89k1rjjra60esmyshpf10mml8lwlonjcow39qm6d8urk2k6009b538sezmf265pf2fszmhtia8k0fwdw7gn71vkdx25g91q8f9jpquy8u8m14py7ht1xcq7ebg50nrnp3gcc7rza2q56wfjkpakz56dild613v8j1oiafk030rojmqzcc3gz5w966rb0sp61k07px1eac99id0sb',
                name: 'u7257dzchbmvln7b0btlcggwwvbnqxu9rskoo4dwtgabh6fxavplrjlqq7tombtc8ihdusjisjfr1038vsqe30bplx8qitkufd5vxne40iyzfszslxd1wdw7ccdei18oi2b7mej4usxdqz9vh600ksxpt2h4g2z2z9pwacocm670mno2vxypfg2l6j4y7nx2ktz9pgd2968a7et2c6d05na8nts2q56tiai3a9amm2t7xbej4gzt770wu6j6sve',
                surname: 'i15yz823odtc6dse9updlam7wufbrgybxg6jgzlbu5wwf5ofcutfr178vbm1ldk5e2nrrw5ty6jp07226mo02aakl9jj2jhwr2c4sm24tiw3o1akxxfng7cv31npvrwtwom98qd85zjxm0ztmtmfphbtldyce9gsmqctt0a89hnyra4bduhkkd4c8aaq20dugyp04dod1m402bzyan8dnfe5bo6t1dtg1oin3ri8r2co77si1cy6dchvgg53qq1',
                email: 'xs8v35mtpev7cyvglpyx1lc5ezg6hytnvgn586b6izmd60bwfgh18emie25tvbdi6ragg2nxmv1uhfwm1b41ltmxtbz3gcugkasg045f2a6bt2rq5qldieme',
                mobile: '63l6rbbqxgtac9gr0rqortpvib04gzli5ozbzwxanvugrv77o5p7pytc6tsq',
                area: 'fefnz71jqxkmdetcp4ihp3ky0fza2j0wkbec76kmeb15muzeem3ykd6mseb6nq4i4feqj7w0uzqbezdj5bi1of6tejwcgc6x44g97eatn6t4i04nkeav336zyeiompee8ehwh5hxghb3cq85yvpv0wgd8c9c1vvck2ggn3rhlptowxgsllb2xydxd30r893mph5o7gabzc5w030ou2dt253cbadimbsrj3n0eauxnztva3ecuqgdxda58r0mlul',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'eycxan0mlxaces8bpumh',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: '7cpp4i7bkndrf8bodz01rop0f375dh02tvgpfvi3mffllnckmb8tmbfqqq58c9e5yrcfacua8x8hvmoo0ih66n3y20kh5ae9ntdmje91k1lvs9aij6s1789w54mxcsqyrw656odxkr4oevntkpckilzd6f7bs1u15dya9mdjzm196znqe664rwesl38s5bmm92zhla6il7lgzo3e7ac1fwdztd308dkni2ytxoa8um59z2i9agkvq0g8tttiavw',
                name: 'igrd5j6cbwxon27gfhi9imdydlisvznfwl283f6yl1q345ujkb1uunu0icze08mj8384hkncz3nn81ecknxhgdzauzqkqyywj270ov1aovchb4qoxr3vfmupt3omalcy6ggir95p8p70fqppr08kt3qophouon3019eooz5jry5y58ny5jduiypc91tbgwgfupkblad8illjlfbowdk2bsar0frmpvrezb6gmsancg0l8pwx1o2qw3fuowt5o5p',
                surname: 'khp4wmhei0ya7b0xfs5nclnohmw2flvq52kjvvmla6wy0ipujb63i9srkm0jitc55y77p68svdi06cg5umywkmzfru5yur2mmhzmik1xqi0f3d1hc8008p0xsm7htzgfygxbzn57jxlawno7g5wonw7cjw2wyupw1r8kcqti6d8kh77udg8sa54w9gpnz017fszfwo3ycqqaq1ii93x9nh170j7rxfyu4inkwddx3hjqp904gxqxdbc0yydzntg',
                email: '4ystyt81kd701u6vspf1we58whir9yphq2ahjkevt9wnudcwgj0aukcmjawck4je1jkn2j01jd4qvvmtw6ho9y4rpo5lf4f2hx9iqyetu8d936gxfur8rn7u',
                mobile: 'kt93pu0j6rou3shv15xyvt7sgz0em98k1tmmcomdy5iev9kazqf0c39hp64l',
                area: 'x2ypcfidt6gwbmwd3s42fti6pfvq5smnbhqqlwwyyt0qpzyvzx499zvxs0wyet2htfet8vyjbegnkzspsfaybhq2dk9n60u5n7jg7uinog03f1rh8m7cs0g3j1mh5bw7kwkblqi27nhb1t1f1j2ebumq2kbfdvhcl0p3kkwiwegv3rkubdsse51r86746fltr7obgl0dcc54a6adfs586908cyddm68po13igh61b438ngjex7ezcjt340cjgkv',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'i4uwe7f2yfylfew42h34ihv2xudbwru61sfxemswqjqav9znjr',
                systemId: null,
                systemName: '5bjeops9h4hxzhkk13zx',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'skjfuju421il5jkk0ifwdc4d8zh3if38nihwpdrnb6bhzv4psgx2llsf4cw8dq24oepcypks0v2rkwyajel8f2c9fwmrxv844oebs94s9f34tfn3xlb4e3nfm0hymihqh306ja8q2x1xnlk3uymjr74jahmymmfxp2lq26fkmd7fhxgmrfm667f0xg0vurl4iuve1a8qeg4cx2ev2tbnwm5mlpnyb0xxivdmhyy39q633zpfyf70c1pcf8ordbh',
                name: '6evehqjw77f8vfc3swd970scz8ld8ia301b40mspy9xfnq02jkesnm186dssw3sncpn5qpmrt5indki85ou0tx7i88i4g31hty0x3zd7f7hnmz8nkisjj8w9d04oehrqrb8pda0lkk3nisvwncukl9n1t20rxqm5fgk001kvlp7cb565wsb9vyel4fi8tgjhfwb5pyf1vor50xly4r5wyi4puhzaqdkycto27lug6ybuil5rbesyv9wu834f0tg',
                surname: '22nk3jvuxy5p0m8xwpo7agptmyxz4ed0aqbxgmbp3qv97h2siratydo7u4enuiqy3rhevi3b0nd3o15jels56n7lxjga26djn72oinzjl40ggqdaljdiakx1e62t11mam5j3qa8u75ucxv3wliws8l3uj453msmuh4twnixodcnrvwqr9dasrvpxjm0cm04pchlxsxtvbqacrifcb48hh6mfpr7keob8qhrz1odfj98t7qmha9mn3n22mk2mpm8',
                email: 'vb2ql7co3vhlroiutu5rtss69cf429v76gma10mgp2xcldhdbuiabnvhilyyyd0xms084jot99ec9i1wv0li0o2sz1pux8t35623ftog6pefqxqx2o1knoy5',
                mobile: '7x848lmm1u988bsakj5ymzxnvv34rikf4qa97gnj6ukwx3aodv1hbs2lwba1',
                area: 'azw4r9cm47bpkaa845y3ugoyeoap3ql8xpe4s3erh58bqp1s451azogwtnb7kejglrstbcqefcb7bijg8wegza4jnzzt4ai29ktwpg6onqwn0nki11m8llv5mwfkv5ot3zv7he3hadb8vbzuyq17u2tin32sfs61l95xrv0dmxdlxbyg3mbjs3cpul7pcl14g31a6vsddj5ixudy4rf1fe0u4dl8m8xahqgzqq93uwv0t7992ebv2ktajh5sj2j',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'gdb361bncp3z38cih0ppaowhi53y1uvv115vo8e9iuasx2yoyj',
                
                systemName: 'aegj1q82l0bkcufwy6f1',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'kkdc174s878f09m4mwd5b1r8yt7cw1qwzto1ec8qalewily765yefkfsqntcgm83oveyql87vkt6furwo8jvx7v0s0ysyur7ljb191ltsourgs1wwg1oxve3whpjd3qm8iidlus5pij99ryy896avlmfravhgx745ld86aqtmpchvt3siltq8divt4wp7gdaprn1foj0kxbkscc3v5ue7728k01vhn5ntpsrs8axghngb164px9qih6pro2582h',
                name: 'ba3ypj4y7f62ur040k0btsmc3f59b34tpli7idpu6fh2bjy5lghbjg6wuj15ybf8zt8w7srsnb1lrf1mh1gw0q9nxde2f5zn04u1i9gwxclq2xejdmmaw79mxx96w0pgzpjixmf7wnnlldjpeswjwmsty78guqu22i9g8p6lksyg1v5mu1zh7utgdf4amddl8z7645sj0xp4r6ub9u9wi5fst768warm93a8pq0rm0fw0gow4fdw8djlgjearnb',
                surname: 'ntkcmt0gu7nyk0xzyfrbmuklz2cx626rq696zlxkrjxoan9ocejguu18dwrw2ce1ob2ke980z8hx87pkhe3dry5i8pv8w2q7eiyuawmj4ik0lcf0u1h6iff8ji3a2ri40cn6gpeevis20pxrngl7dzpv7ocka38ht5me7y8s7pk09p4xxak9z3jmh0fe5urhanjfk0ivqo9i11mbkqkqoaadvfjdjpm6vafy5fkmsvs7s6b55z1csleqgdvmj2q',
                email: 'mydsb7i16a5inan3d4yxuqcdskbs90kf23iqd1avvh4930hezu02i6nedplsttftsfdfmadghpd61ygvzvgwe21oyjnt84uituubgegced54cfm91dqsvrle',
                mobile: 'wfxxa8x8r3v12s1csodqtb7zbc9zv7o9z6tmkvv3hv5tnsgq4v7u1ft3q58n',
                area: 'ghfwdp9hzf7m67kq1o122z3i32349d1rzkjt4aprmw9ot4jmq71cwpxfzwczr4suemzhaorpzw01zrgztxnk82tbz2zq3gzz4lhw97fz8o3dpipa2is04x7wg17fonzlk98yz1bbjrnwfzvysj1d98uit8q1o837rdukwpnkd7zxm5fcngjrpuybzvycxo38p9llhhm2tze161zqlx83caznts9xqfljryz2owudx6zazsj21zq5c8b6xy2if39',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 's74pt3pdnssnxcxlvv28n8n3htmrxk4j1nucfiiowt6k4hj7s1',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: null,
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'cmhb72mc5jb3kfrlx870pwrq0golrx527b245wqrjumeioyshbbobqwza6jbaehes4ksoqln8ct41d1dtylyxhpdh8sjzjh6n3794znkzzjd955kwr5yhxbt58428j59y9s7ynq8sqnqycl8fj0g22tbo5m6vodntg9ygyags9aegkjvami2do3w0yoodo8wt4zm5pgm795jqjitdcj1sj2q1k2ftbjfaw3d4d7j4b6oq9s4ikooqv3skiolht1',
                name: 'jjngfynhe0evj7zegawv33min2rn3q59r85gbkalq50ib0fdimrd6xe00nvt56tokdnd6bfhx14runujcyr8wwpzu6tcr1q6bejth7z0au4qufb8t745epjsb71516qdm2f5m3rczj8jf4xhsaf7gmk06iq2vsck08evefmh8m8vyvt52hbkeq617qkumws3sz86i561gm6gve5szksew1mwb06d6pposj40escv2ygaktfk3j8jb3850r1a0ru',
                surname: 'oxyxop13eot1xplj6vnd07hog9rxypo8vhjsm59elzy3w73d2mtw9jbas35h5e25hbu7g474suj09mf8myjnt5pqd2w6w9zq5zrazn82dsyi568jlik6vaobultuxxz66lcn4w2lhtjou45lcrj67vi2lnyjisc0oe9oaz23wexx3ujau3yds8qcni8crg9umzulqu03vow5w0c1hclj79z6dr41fk45a2uubvigjmi2l9wl4evtze74j0r7c1w',
                email: 'cvmxccj34kpzmpxftttu1iwb9h28ycrady2iy7zjv8zc9g3mi400l4cv5iaa86dp82xpmijoc6rplokvkkmbzm2iom8cc8k06c6iry7o6reb3x6cfxeqhaks',
                mobile: 'wn9i18kq52qgr11yvl9gfhse3pygd5s5xitqnwyfq0acwcpt10f83f8e228i',
                area: 'mtq55nnl9enswhu9ettv0uhq63l0dw9vne5a74faxvkhlpcld6pcruynf9cdbf81sku59v20qga2espv51u1f1p42z18naziflkllylaivacy9it2u7rbtlo5u50fqregzo4wvz31efknnsgzoyo1pozzu6pud18v8xp73c87xal8tdcyfaxsafjv8v0vqjr0zvascc9p1egvsjprwabanejy5ntkvzceb4ltfdcog1iy8igea10d28dkbesrq9',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'wyo7kfql5l1xmdz7cv2u7z0lhm915f6ipxg1t0wnmf4lpp0nxu',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'voulba2xbizz2q3kaidbnireuy5576zewh0gf41vqvs6qdkz6umm3953iwnvenupp1aohwn41q8vr3vxyonxj61of4fegx2wgww93x4t1hig0rd2xa70ox3avip2k0vcrvcy4nb4o2u4fx0fi6yynn3ab2xl8kue36htyxs7k3x5tfdxfeix7z8y8ketah75pkxrbdq76gwogsuk80egkq9oc5xizeb5y6ektvujhcb0tbvuufb3mz194h534v5',
                name: 's0ezw1dwb7jtqsptpsje275u6lmnpx1borqnul9jvp5qu7zqvow1f7i7fn6tr7dt2yg7jlacffum6lomzo0q2qgl76rmof1evk9deo7fvu89l2u3tawns0suv0pc7xlrsii4n6z7weycn1xf4w1t99cgngonzb9llzjzd9j6c9425ko57za9x1utx3t1h6ekky2mqxxcwiyc3cdwywij6rrrk0sqpdkuoyt5qtc2c2moy6t5vjztcnhowy0x4cg',
                surname: '53zub3rztzsqc0nrrenqv4z4zdbiuxu4g1e74bngmcpd2p1g5vng8xwo3d74ifvunjbia3apax0yahzgbsa9i278owx6s7lqp6qmr0iy2bolh7wpafjaqi09uaxofjlh7q4lks0nybfczud336weebv5kt0at26nfcfb4flpwi0v85sxny2yvm9yn9rxzyw1nsnaxkz27i7e3fmk4dlbqdlh6w5xlimlmdgymvwj36go0smy96aleowgl8ql3it',
                email: 'p40dz7imwymv567phn061gf1eazxr5itqwciyk5kryx45uwic9zvnqzcpu78j06ayqhobklic1psq0o2um472mfazn96qz9dtc53n8hh5bhqjd5ipeuhc563',
                mobile: 'hua9woeinwzmdqim27r0x5cah7qvdrdxtok1kjlxebiwp0ty29qip7a8w0xs',
                area: 'n4t2m16uxm3fatt75atg2z2bf0awgbdu4igjdux0qsno8okh7gfba37cmxlear1mm363pwikp7m0butifpyvi4s658rv9wzrt0rehcyz672zmzcyysmcs21sh2c1wt8xf5m87cxk0uvcyc51k5l7x6759o1p8h68p6j95qzgh6n6l04ekbv1e7a6ek2oni8h1466bmrjzlrdj83gygcvbovor92xam0xlg0sj2r8gddsehv49okroxuojo0ehbh',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'dnfqojyhbopq9vsvfii47aqn5glnw6gru3tvsaot4by2twy1g8',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'cvfozn1ytoacju15k1xa',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'dbvt8mhfnyup11rdcmqqvc2ex5zt63b52qjgq3qwgu6v42odxf7yx7jgh9aiimkm8mohlbsbvkxfwzqr9jr8jmgv49auq7kgkc9m5aw5y6rtuahbpnsvdbzueh0njq1esu0we6489wawwoidifxxmugowsmqziyl47v1im0smm6s9tyfdxsh33c1mv7sezsop86e9l7hj4hv6wbt6z3guvkbfc75c6q0pfbqbi8ngloz2eo3ux9io6cw3zylkvg',
                name: null,
                surname: 'jlh3ioak1lonow2dd6mnvar7nio9vlg64hsmjmz1eh3eix1qo9r0o3btjqcmshc8hs29a5kdkimhttbh94fsmp8o2ftzzi6qocytlj9b7zb4tjui87311jii2j7swxmksz84ndhxggqi9xy16ighxqe3yb34jgu5jmaeky1hpga0gxuorpisnyqb97azfno0rp1s9njblp2gxe33ne9zxguklr1p1h2m7le8bhr7k82u9oigcw5j2tjfjtk7de0',
                email: 'q9tmgh9zqpz4j85nlzsiol2e3tn4fdt1ycc3hk2bw1yep5fni6xmbov30f06a3chi8fj0u8if9ur5p02yv0s30cxi2e4v7f29we3ls1c9hafqdfwj5pm7hei',
                mobile: 'uvbq63qh3rgsks5w0rkzhsuqwv4uqgj2h15jlheg5q9s7g44nifsetoi0pgd',
                area: '9ysiaopnsb5e6r4yu8th499qwt2du3dvmrxb6jl82scv70kzup3hfxaym7gsxq4ofdt3nhu7tb5ipkzjakwzkt722a2xjo72h2gu5zrurgvxbpenifhg1mzke98paz4zblk0hg8jfb3il1bw66o4908y5xnnax5fac7w9gnkwotsyidw7rixym48v3iwvrrbcpu80y4zgalqeknvz4hgx0ndxl30oqp9eqohacfg0fan234nicjrtf4wg0sroq4',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: '8pmfcb6a6jizggg1hftrlcse9esxbhucx4f9x4qngzererpbcb',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'vh65w1xyzrk4m4wncnis',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'h6mzw81wsxbymqpjszd9g5b5cq4ijjxq31n10c3a647cwyi05a4mj31xgzma1oaoo6j42gssxrip0d2gu8j25ul2bg8c8xoyqmohuq22zpy5cu9r5f64zf4gpt5f8g3newbzldz6f4756gew2mckdjr7wi21gxyp9use8wiy0phnukkckwx8mzmi6q1rijt770rxu8rvk3d4bbfmbeyxpmfx0m6yo5blk2f0sd772eci3jc782s4y65m3tmk25s',
                
                surname: '3krd6hxu0w2a3d1qfckvic01fg6aq85tqnzbrcarvp9zfth7cki070kjku3umdru6b2fcykjxkbs1oku9uo3a7tlmq3552kp5pecwa4zaisdwou9wf7obuht5svuowy23k5z2m60yykprph6pvv8fiocmpfhkjpcx3qsg60dm8pv6imoxje0xhq9q2cheyb19vixj696w8n027gbrb208aw6rmezkwkhyqwjxqgsazk5s9znxmo67n3mrzxyza0',
                email: 'kqqhic4slpbpe8dnwvq68yaxf80ygfjofu9far449ptb3h8poaweoes91an8t3qkk309xawh3oo05ysochke0kj2mv7hvtdhj0uc65pdhxtc1uh5z4gwsn7k',
                mobile: 'vlb9wx5srv5s70zo8ce5onpn7yf1phdi5t7kd3bn6y77yd7b6widah1p5t1m',
                area: 'es2l3hwsau5r3bgdg20vqyojy2s2slkhfs5j0hc7r72zb38pb1f3o9tm5eo1c1d3gsj9c8pm14u63azt66hlhd2x6lzczumfwxvcmef95e99bgik0fifqa3fmapy1sz14l979wrab0czlb7sc9jjkpyabnp0l9chy2017c6cltpd0t0w5eo0k24oi85ead32o6j6m62ywc2jaca68s4umxe78vvz19b3jyn80rxvf74r4apz3g58t4wzijihqhx',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: '55humpt7v6hpm1c0o68nm98d24p0y053t0rp7or53u1e68qg2g',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'nddrgpbu8omcqmlqatfm',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'r38cpxgnu4e83hm16xpexicuvlykhwsrsqovgu5c83xt0j3mil8oxs2jxwauiogr8pytks4um666qpe0lm1pzz5r61n3x1revn1979e5h8gwcdbf5acakyz3wcj65y38rqez96c78asb0qmc4v5gw2lv1h3lbq3y2iad413306avetyn4w88mxmm3ejgv4gkuh77bw89l9022f90tcc8li29x2wml7flqwa127kbzij0h39zifokk5p47j4r1s7',
                name: 'xykl4785f9fs4roskmhp51shvt7dfyjw5mtynbfpogtjl1zyh2s5z2p93m9gg1hpyjaa0z1uu1ioor8tl2rm5qxixok3m7ik8dzo7srw6fmsyz26g4fyyqszdov1jly8fkbm0ok1uer3kudrshps97s5k1gdmuqo0ik4l2w0iwhtdveirfgxgyv7rlccv2n4z8brq5xcms0d6c9j81bkkt31m89t7l4uoodgak45w01bz3e8nztjzejnvsdnvnr',
                surname: 'e2yikas2latznjkyb8nxocvvm12ff7sxk886swrjh79rz4sl0nyw0euu7oxeb4yw0lukmlgk5nw7hf77u42eth0ia17fdx583f0gbyz2jmvejxnf3bwdbaky06lceunzkdkvx7mv0buy55wfoxldoa5e9rmpklkuiw317agftjse0feqsfvghduh3m7stssgbnwjwz2y1zl0kpb6vj6yqsgl3bpjeg4tcfkwp9jdn4u7szk6zqn2u044xigod4i',
                email: null,
                mobile: '1dn5260mxpd4luvy64ae5or93wakxtilaa8xz74jyf0nlvad424tqlxy0520',
                area: 'qa468lhkd3w0njmojsdwj1top0yn61xhvlu6pyu9dknb7ebr2yte02gycr6bvg8dxcmec71yfdf08lirom32ndkzh6o0ofqyu9gw50xnid935nynip56et5fm0pnkxuhjwros5mcld19vgnxxucwqo830t6gleonlxnm07oh6ge32rx667a4o9g70nqomzd696bmmnrjztmzboiy9uk9yxu9q6vwc6nlnw9yi0e94om866gsr7fr8d6pjnp8nyg',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'z9shktf3a6061jakmyt8clz8wplbbsivideoqanucmtwfhiq5z',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'thq7gj549w3o8rmxc65s',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'dm09g2wxyckjllrjcvbt88whcg7go6tfr2td6fnjg5oll3rhk9hj0p2mhe282cez374b0kk7gackoaqac57lcv3sxk1inpmmcq4kuojbl4cz0qhhg547fv34r0heq8mqv5fwxi556hn8abjypc7p8akpm1xkhqn7k4qhr4wz7uowus3dldori139wewixcbg5gq2r3lqa0exz2ndw066oqnsras80ur2aqx9e1rvh7hb2ox7v1082xkebqg0s1h',
                name: 'jo8t6e8k6rnecjo32r58xm8ehgkvts9rrsrp90gwjmrfnz7cizffw9vyq9h9zb6l1tclukhutvbpz0ipicaxv9egplgxxbb6psb8g0bfekgliuczmqdx1uls03zixhlz2otyy64eoolyl5xj5chlqk7qlocvammtksxssdo1ahgze0vta3hlavl6yqi7phk2k456zfs7kmgg162oyp7uwhhsppy97s4lahs3b6p3yolinr6sq6ggrbhsqf7l26s',
                surname: 'tlzr5mho46h3yub7413uvatq3qvxh8q1njazpc7dkbpufwlhjdigp38na7gbqoc6h03p5vrrgaaaojjrcu6ft9zxd62xz9j7t5onizhxpfe33y3ldrlzk96754c9gly7knzc6bl6rt08n0jt597yq9x5xqxmxp3c957roe4yka8egihvq8plauutxxa0sk65cx5p6vy9owh2radakvdpsu95tlzagc317l5d4y72lnjf2wycxwjzihd6qfgjq2c',
                
                mobile: '4bn8kar63mwggzxwqv4zgx70r97xc5mjhh7e3qo34dx7pqjow12ubsz831w1',
                area: 'xj12p98qtll11v08xxhtsi2kelll9ltdauk6pkzwkthl5ymn1uy0o9jcotc1h24ahtg657q5otioeewsqiy3v6hwa76w6i44i94o61e42ien5wziza0ou7rvibbozta5eyodxrao4rtkpy6rhuxcxa61ebisuxro90qn05lp1x1fxb4len2nhhvfaaq1rjvth6mc1iaz22cxgq0xstit75zd3rtf4e5imhp9acyr05j8z1f909jf53tdony6em8',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'qbbt6hajz9zfs8ypmk5014bit5z25q6hncdr73ylwtbfr4brsd',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'iejvyuw6z6myil5vamrt',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: '7hrkvpd81714kjsieets64ah5wip5stat0soplta5iucrddjrkpyl2fx2f3dg1ty1pzdrluwb5im6mjahxlxrou8211tv27q3d5yrkwn7nlpry61wjztwjme4zbruh7bvilslkm4aa1amud61gm3xhcfyjjo3e6lojgr7mcnx3j241s3at56vj702afgda6wagdx77zsd93ts440sqw24qcv6oh7prkub7s6uvkdal03fch88om2r7q8wcqklwt',
                name: 'r2uo2n54vgpdez78yqnqygjzbhchvn72rd4j5e7gb3pypna6g83zsmt878sy302f21y3ugai25p2cdne2wdgruvhy9he69uhb408aix6tmc26qbkbtrfuotwi7imvoe97mt0fazzteww0nglla7e1q57w1kphwy3pq204bi75zv5ydcms4gs9lzmpyzl0ahw4a1ydpb9l9nxl8u3r4h2qzo9g5b3um4wxz1vey9kz9hqk7kkm7bbreth3vsprlk',
                surname: 'spvzpzwewfti5g2euhuohi0k34vom64p3t9xg69pdheim4x49l53basjnzb2rjpit9qb9sq32f8nsfv71kqb1a0e21vpug28nyvoxzo0nrsekkbkwktqedl85msbzkivwzq5koyb8wwr6dibjx1w83afen29d0d7vsrhlyx3ug9fv71mo4hxijdnag7kl697kgkcizbdf1nripd3b9rmhndxn3ib2wlkya5tb9ar2msaoft37esvjjwr60a8pxx',
                email: '19tidzjxabamtueu4rgg6uy08xpvurm0ake088isnz3lylzb1ej1nncuz11xy2qj0ozm28z0pvw998nsnptsevhzetwdvvsslts3yfeme93ksdamfujn46hp',
                mobile: 'cd5eciygs3i5my4om08l2p16c0pa4c4az094invaj9t803v1gpeofdlyqcx7',
                area: 'owq3onel4w7ovjg228rzrjh7hh2jedijk8lj67zitk8gmhc6mq9ne712ohtrnuacn3flxx3kaa69hrm819jix62nsl9y8t29o3cxgm1wjclj9chta7bhlkuxy8nhq8r3d6s7n6060ur9tsm3kvbdn69c2wmmu97f2u0yka60bqwdujiko3gn1wesk6c87ja4qgvxn8zbyaiidti9d4wr2w5yrjmld2k7c67hkjy4ppjby89jexhwfc59ltd7f5n',
                hasConsentEmail: null,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: '4k7zwt3qgfg28azkekmu2gxhemd80m9r10bkm6agi3z18o0u4z',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'pig1m3t4tmkx29t1h8be',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'wjp3n48foptz69sg7t40acne11fwbzyxca07711cl25yfxsd1tphp6ev1meu6mqnj13wb6bfk4tu1impwjzj4z5bo30avvnmgmhezyrz359fd36sg0ik0fhc9iqzqk86291gcwq395jlie61jcxa5tee8g8vy0imwyhrm7a2w6g3l336a507uq2mjy6cqk8lggk2xliv0vs8jvig1xbn65g4jakc9zkqmmkpfco9bofkdzq0vvgma508jkzk6ep',
                name: 'vqrxf5trx4pdz9b02htaiatvzw69grcyrhujft0o3gkq2z8bwemayscbsxp085c4zetyjsw3kq2waykysctgsxajmj3du0jjosa1cclb1xki7avoq3tjlojuwid2dkhmugef808yklf7q904zsl9wx96knla4tb27zquz3g3drd9vzkff6ptrhvgeui3l30vifvw5vb4bpdk6x1zhrsxd9hci5fvvxoj0fojzgyv5grjyvcuhnodtxop0lg4xdx',
                surname: 'p6moxyre0jmlgsvr2u4lffe7kwys4usyz216xl70c9g6i2gf9d0vplw73ey00fbm9lrxp36jdzvj0fibwpjpbhnepj2ikmf9blyv3yck752g9rmuh4hr2o012r2q2kzpnjqf6ijghv23vcka1lqfy8n9yjrmxs5u8o1f0mbvo91etkjw4w8kwqkyd61ytqkd6zw4megfkiuyz8a523rv6vpuj95wxbbpzxqg2djg3srjxkiuboq0yn4iteu3hcp',
                email: '33hjv2i0lne8hy0q83jbzzzhxzyftzi92xij1638imh5lt9g479ofy0wxgxl764noh6grb4bnwakq9eyom2gb9mdoyodh86x2cxyf3y8bkqueuoy9ejaakh8',
                mobile: '4yo5972ryaoejwyr0rmg0oc29722ixqmdvkff7ikvpkjhvgmfz3flip3efjr',
                area: 'pci2e4t2e3dy01zkha4vwvzhq130pcmnmax48mvchuu9fga2y2zgyos0nlauhow9gt5li50b2h7xjq3nnvqmxbm8ybyxs47n0x14oeeoxpgkm8d6ueueav1kxut6l5nm8ptdhu3q2s2hfnezl71d2uvejsh090rja8233vvq796ldgqor4c02tar7k2e1eud2gh9csrm1bx4ld62mxj1q7shrm864b7uvkwoqj3crlui2tcqn0r98dgojwtchgp',
                
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'ht60ev8llyyo22fk5evwwxd8a9rzu5o3t4ahmhsycpgqv29h87',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'md4d8i7uqoac0zisybbz',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: '6pzw230gcn1nywbfhkdn58awzi9kmfbqqtwi7yfzkh6d9ysgbgrxv51fxonopu2faqzxrc7fg1ql7fnxfz7x288xulbwugqe9rd9fwktfh7ignuftplypcpm7pfadmn7a7vaei0bebvgrspsq5142qtuwfnqhnes3c9qlmgfk66pc9xdtudlcb54e9fvnbn42roljwo40az6sn1q56hce1e9cz3gjemwoct9bjxrkbt4xfb0y0s1uuylq3fye0k',
                name: 'h3t0aypmdd8oqizpb2f0zjwonktf45opqsmbhzkgnhmcj76akm01potjqt7iz4d6hq6p7jsd19gzuxw6tak5f5z5g01j3ir4079pful40p7a8wqaqb0ixlihxvfohlxozgeapvpg2mhczeydilmaie3z9drb8rr6d4of0t2ntv4lffxyhd928arm4y7dmtr4e2rzuqwgkyqrlc946i3igjkd00qflb7d2zfly8o2vl331ril4wvqej49pyhepls',
                surname: 'ifgs2d61qizj7kvis32f8c67850wt5la085v3espdyyf4yudc26x78bsnbjfbretbxkiucye1r91ikta83jf2g1pxd47sab3jbber07vr05s5r45a1ijl70zkj8eq307f7xfpda03i4h1jc306sjucm0sv0blfrcuose8si9k6gczb7anm1xkjs50x8s59b5rfahlg1nh2wwkusr3hq6m2stc6x0wbzn8a3vu2utvyr5ichnp1yqailf9esctnr',
                email: '2k5vxq76n5e7k68zsyu5ytkz6kqrb3fktr8i58swo9v323g0qegkutwbtmz85eky7p44ugp02l7kgf21813zvqgw5k0rrvbmrbyqpm0opbwou512z9ntbfo6',
                mobile: 'iauv6wxr5wyf0re8tl02kq2az05rw23k106n6mplxfvsvajgymgsmdnsvgja',
                area: '88a9714dzllvjjuquy4tfvrcedx2r0pi46u4y5nb5hsnxqt1mfta841k4f0t1qah3buyp0cmeja5fex9u63oe3ivvcx4ddcq7h154wt1zdj78m40gq0hay39nv2exry0i6tceadgzvmm579bcc6ltplwojtvk1l0swxva3ee89ylm8l0wnnpg0hedqn9xbjn24rt6kv15de36lbnk6w6oiisxn3khqt27islvngy00nk4myiitq4dezohvrrbc7',
                hasConsentEmail: true,
                hasConsentMobile: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'xgqynd1lmi45pvgxaj20ueyt9vknvcqkt3i9wiocs5e76yzgh1',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'a9lhnzo0bbcmpk7g6hnn',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'yhrvwtt2imxuwnv51g9c3tx838fujj2e4eiy70hcs9ndvl3ngd6kixch65ljbt9py13md1mgkv9ohu0xlat665h7ahcbikdmyzgfdoy1zrnfi0089p3waaqzdx8wq7o0211i4u9sopceqazkssk0ftxhr8g3rnjzp0xdob6frw0vzqogiqjoce3g2xiaix96116cg28xx7epi7akdgivj7m0rzcn0zzelew4rrwe35ao42svptm6dq01dfiexxa',
                name: 'n9fd4s1qgmk2b6cz63rsz9tsvkqec3kwxj7gushb1rw8xsva0y9b3em8kgr2zc8fiblac8oaz3itr2kadit73kff6q445j0lrr7oyilctwjhhv7o57uu58vv67kzt378ohfyn4zqj2td0s2eap4rltfiekopee5eftjfj022p4jqlg0zkrkzc7nbkjuh659wbsshf4cm1ovwjnlkybrj6d91t2rcdu7ly7q5wa8ar594uj2wwfkyurz4vl4td7x',
                surname: 'e6b05cruvbpog7w4whp396chv9vx3rx4ri2xt2a6ru26yucgh79uc4ive3825xqprykm0c4y5a5auih9wmu0ka54v1zg4me9z8olaxq8ubv4pwe3x4pt9ps2xxmp1zalfxxjfmqqmz02wwype3dp9ua8ceyywwnhicx88ciaa9fxbl9jkzxv5ihgj8sy6dwt75j1hz0dhua6xmua1ne267uf6ggpvmh9l9o28zcnp12f28xq447dposa2twmlkl',
                email: 'ekiqqtpqbp2sttrmpthxvatusdd45k6t3vev6s9rdixkjbe32rnuqv5t07y9o6jt4n5nmn75xz3o3eimwe0hyc36s8pdl74swe66ehnh57u222mnfmp39kii',
                mobile: 'vzimkdv0xiftmyr6uk8pwxut4aydv3zipjsvawutkdsk0vphifz7lo1injmu',
                area: '6uh6rwa3llokb3ezt3anafljfu04h7a70h14anuykj086sfhlfh6ry8oqeompapzomsso3oxtpecqzuxncxwqyma4udtgyifuvl19vaz4o9lkkpwxnpt9r8z2dzb8i7mvp13cz06eljc6fgv00xlwq0g8i67g5h95r50l05ndnayi96mxs439t0oewwgg37jkx4dc6pcfgpwr666w5ofkqiabn4f0y1cvcta0w3d8990w4lp73jw1tckjnvmpt6',
                hasConsentEmail: true,
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'bx5t0dv9ni89ixh5mgl7aziic4qpb8ses3nc23kt8d3qkgm5a8',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'fb8cd24zaus6iy261g2d',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'walxizyvyw4x5yb3sbcmyqn43ky4thpg4p495fq8pf72opxf3f9a5kktxyx30somd90apkok1ul6iq4geh3znve2h19zgksnqz93uslf3g4x35jsjsplugki7vhjlmq3scrkjcyxmv4wgn23mp2mteoisfgx54p2c9ojktdyrxd3l9h218rxy9udw5ljduqy3pdyg90c9pypvzgwgls7jylv6s0fyvdzvcsr8m4sb2zcub9md6xf69dcxbesesy',
                name: 'ks2ujw2t79fgu94p60j3ollf5oawbuiipb223y7fujn2sawmwpo8hdx0kckszhucjrlhu7gri3cwc95zon5wxth0y5et412azsvevwo7ml7cwr78a90lkg3umlkqfcq04nny4varbiwd5zvjp841sbt2ik6pucjjj8pytajst0r1dhhwgy1nrmdnekdx1562vmfjk15gs5to08w9hd2vnmtjc5dikd4n8cve1g6nvhzz0dpfwnrkuhhdwvmoal9',
                surname: 'ctddank517uafjilkka757wvwwskihfxlr48pdla2xa0if2x03a2yrzqi2qsgxlmwrymuy5ibs0m6ik3vcbkvgolxccd3h09lojpxxt96u8xsuysmofwo4lam8vwp6lgwr5tzf8tusyk873cblngnnzfo3y7jn98y3rocmft3kx04w0024l5vewfx2zc2p6zn3jy2d1s8fn56j8q5as22w67j8re8mp9xpgemikvhzd3hgavrhf0pkl6zgqn2be',
                email: 'ou6gk1qeh4xufb74o6qncf0vlctt9c9pz3yide5xfz8kn0qu2uh9ccxbb7zywtfvto1odkgknueaat6vnc24dkst1z3ylr4iowrui9x8yyv0i5nn37syw6xm',
                mobile: '0svox3flbompwbrj81zbh11629tz6t9xp25sjj7fhucpbi6d7sq0tg539mmo',
                area: 'zf13wkwzvb35sbkapcr8tpgr1b0x6741mktp80ldjj06h49qc70xrzycwynbtzagijmx6zvhkyh2j613rrsw8gllxyv4yqzcfayeiv5fg5sxglnsy0isis33chs77wmeu1r5l9o0vxxibwe60ldtep9fwnte0lo7x0e5eyhbe28wwxt4ee0mw7ef1lxxzlpezc75lmr3h4nm827fhca336amw8qyzg3ueux74mmgzy5r296ougjwxomhibixypz',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'abz81uqd1cze6ncm8elvi8bqerndhvdp4p41fcnq0ups8wq7vf',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'de686e3hojgmlk5jp6xv',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'fynofzpwb1cz17dd25c9ftqratf60l8df9w1ncfmf29zyfw3hxfi4g97qjw8o7ulwtz5exc3qtt6t0ur45sgbsd14jrwjhcyeiotkw2nm585lfzy2p1lti2hix4fg4q5x3iksivg0s2s0409ylnw121oud6bbme86wrb2hzfd9a1jdh50h7h5xxeiigmy8zhsmpoiv6ux9o9mi7kr93llvllt7s20v5xtjtqpe3ib71ra5gw56madrbhtzalr0a',
                name: '5zmvf7rm45x7xk38tyaw248wjfb0wc16g25ungr1yb302o7xkscl7zpyn0ewmzv4w3g0eiicatuc5wex1k232pdv9z0j5wv8o61k5hr4k8xh7vfq1wnz942tqe4zuelcuaa530tmsmsuyy1ucp6oku0izkslko0gybsbtan2mcof4vqn1812pvl80rrgwqvx1ewgvp37f4rrvcxm0t0og1pdrt498for175f6xjtfvjggrhwwp9yv6uxuol7ouj',
                surname: 'xu3muhncrf06on3m7n0czw3dlhcwt1c7hdxkokxr3uztgazehfq6d2wib9m7c6vo4675ce6d23vo9y9q2vekcacyc6hf56rmkwnvnz4bfg5onersjtgqa3abghd5j13dnq320xwvptfhomhyc8k16smo6pi3wuliibh6vko892x7t7dih7j11m5j1a14cvzp04ibpsqgzcfz8cpciz4xa0lue72fq7lfwop7xke3yn9tpznkvas0crlybe07scu',
                email: 'fd46aoqc2ksh6oe5a7b4qzz2dlcp5bna4wu3x0dakxm4rwi9frlklgx08xfg2yu8wp9yb32ucvhqtvdutaclj7thid4d5jxqbrbesg4hy2n7l88xo06ivtma',
                mobile: 'y2es5536vb80jgfts87ud1789kqeh6tbqz3srzej6o579xiizsxn3fultks8',
                area: 'rzacu3j2ul6lrlgzr3bd7azt1pozp89wp2bb8m8jaxou1fz6z69glnvi85skoyel7voycxqxbwk8dboycxgjy2nixavuejn4n6pzc0hah1whw5jnci6939svrzr9cz2h7s0z4zw9vfbieucgocg7l5sncp9b5kqzq88t7trqj0aadcjtaljyk56meifhxqv2sxusuka369pdb9n5i8qwib074vo4yfhsgz1p11tofklkx7ar0ukpv0fpe4lp9kd',
                hasConsentEmail: false,
                hasConsentMobile: false,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'niks4ck9dhdl4l0ocr41g7j60e62hheo4cmsy',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'eopyefd47jhzuaa4vfxe91mzfv90u40udodw65bdoou7f404ji',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'r167sj8semx0817amw27',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'xg5yd81gg3jvja9oau1ijbxzxx2feu4m75f8lhvx0z9nf457sb0rgtjdze1zbfu3y9g6cfkt920eoumhj365hdwvfhx9p1b0exa923lk5l1o4dlpei3y79fyeept5uua6qier5qtc1w6rd2lwba4gbiyu93ld35fk4auzrdx1wfvxefhr5duwiisldndb9i9woceyvio5cwnpxnusk3wpdznjur61f9svhmuhquqsq8gejwakzqrqjtg5ueuiqq',
                name: '3kgxppkmz5bc9yr5yvykbvfbur5ne7nb5hk31pdp280dcry7fo3nhutx0mx9oru3l2256xp2hsabb7n7a7tt81cb4muveh6epi7jqf6mzczggwv54xm06muqweg5x3zsb4lg202on4dv23ck284i7wcn78nymnjptgoeqsnm3h6th3516t8y0qycufd75lo09d3tt2f6ct9ovzzrs1mezs0sq4o488bsrmmqt2t0r405va7q35pf8xqy5a07wcv',
                surname: 'qis3x6ix7ezsnbspxlr9ysbx97gwhv1q3fqicmvi8tcggomehn01c3gb8tvs6f3l0arxwvt3m2qsgm0szxd51bfdtkflxz726x8tbrwiqpvksw3xvmcwruektjke8lkgx3e4uui2nx1x6me4qi6gyuuxr1sprvgozupwftzfyioo1luw3n4pn8l846ts6xtw2esulmcbteodqqtzd2j0dhfh2mhqkwhes6mgok7goai63gqay5dp70w4q8j4twq',
                email: 'tryf635geyws0ah09lc2y8q017bzt6wlj1huk8lpvg43hscoiw4witlp08e4t7zu1xbat1jrsdvsecqf44rm8zxuxbvtvq3xwcmnwb6ark0dhz6jonsygl2h',
                mobile: '3l6cqtndkr0367241exh0qci2pjt5mqofc0b35igzf3d6hvnmtre9bummp0o',
                area: 'f2tsoku2cjiaundc1q2iimgrgrolmbxom1a4ysuqxcqim0chmc2ysvsbzmx5ia0pd7tcbnt0p2fwdho3boglb6hekg5ohisva72fnchx3ew06km5k94zhra7l47mdpyvtxfxrdi2rs02vueg3j8j5ap1vu4ur5p4j1yvh5k9fg8m5n80ikkrddkk2xeczmosvgfa6x7cujf9vu28px1nl8le6fnzogy9dsfup7cvqdgipn9aojw0w2na10n0w67',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: 'ihzt1q0w5ahqd666h74yy3g5vc543vy5uepwh',
                tenantCode: 'u66opgneljy5h6n7z8c7iw1fxk2lsun5s7u0cbqi28uf8luibo',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'a1u63e3a34ths4eo3hw7',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: '6o55rn1sgo4msl0o5bticaadic9ebla4utla8as61vvklpi2l8rykqn6fxd998gqdinux03cs6n15lw9pdxzn7h9ugsdc9tt58r0ydk4miof4nhpdu2qke9pk1lrco6abxy8jy3jmad3kan511ppomdf9va0p06m9jyu022a5eaqpu5jkwi8ob8zddakedjw6e7asjuxdghfr71v6x7yce48z8rqxt0ijy7d151djj8tn31fjmiqne7ck2nq2dn',
                name: 'ae0wx60n9ahwihbhy62aixkx8ey9m303wfeez5jj5fywbnea1gfzdm7bv3525n96dezocb5q4zrhbvn47qigm6ezbz40q4enm9ya4j52r9kjdfcul61w5esof306n6fgphfmhcabzsjfv88fvfyc9kveg2hpvz5t8q1fhabvp11q9y2er0y81c0griphm20ek7kuifs10v8jcdqhyfjp92ybe0u4t5yblle7e8wplvvmtbtvom57tgvy1vh6efu',
                surname: '3u8e99idx3raamntg5rcwgfqjcnsci6vowq0x8wi7wjw1g38xazit8fd1yyu9o557ws8s68k6le8x9n0orld1b63achilcztj5ndx00wgf29d626xozqjdadj26orxx5ssvg2w93s5p6n1iwhl2t8t9uclmlxa86anm82egy1itr9qzp3qpx6tjqabfwtwl0dmz4p7yj3e8e6mmbeviuhry9nohbry6wd16l7qszei62o7z2pns5enpma37368l',
                email: 'olwu0pu07fos3vl3tmohx8cbg6qop22zsnf4jz617doqaa2k14zu8aydlkhcjxnzvk1wagsxo4v4iqc6erpc1ze4g0exjvajlchh1pnssdovuq85c70nimb7',
                mobile: 'le55q4bbi61aobeop50ywykvzh26jfv1gnss44nvckmlkblv3aigrtxvudit',
                area: 'aqh6yz976vrnjdfageo5vtbz0dttfxdbyggr0zw1jk9ti73p4wslhopfpxlwi0xa2ntuts8qmtjm8uioix5wbyafpo6ikqd92ug6vij65y1t4fhd208sa1kge50grsbwijoy2dt58n1hxw6csxg72m6ms4gmb9hy2eix6w4ibx1y0me3m02u82t9d0s8vgc2lbgu4a3799vdqvpt5wgqfurbasrepjn8tcruvlxet8xwlwbpirp4m0l085mr6dw',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'fg0vhlmdn9b22vzgb0ra440rehmm5smiciytuqzhtq4j4iipn7',
                systemId: 'p77ew6fg5ghzylpsr7j7ok8oohz9setkswyo0',
                systemName: 'kehlejcvjkpdwc6algio',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'lytecad5bp46rekrfqenzsopjhqy16hry91w2kvhwgng9gtz41bsd292uznxdk83xefb1v263v4wo6l24l6eaj4w92ebj81hk82mlxhnrig02ylh6ai7lo6lb5r2orj5m9v64mjdz35tx2de3rlk85293ys3vpt7onerrs6rgfdgmkjnzj9oz68xxc420qjgk9i62l5zfdcfyw2lmkt2ren55jtq897mc56gd8ulqn06vmx4htwap8ww8qmn44b',
                name: 'sf4m06r7x01kse96cz6l7hwdvua78cng5q5wspixx0puq29f740b356c2v5qlcuaq8i4wow3dw4rbt3h4rvpo3g95z0lhg42rvuei1n3z8fh21estuwccbok7hd3kzohdolccdmwaaigbiaxkh9mhmhuejhw1ogw3j2b2vqk09666yeh4azzr2q5706hfq6tya71bkpoi6qc1h10cheiabnmsnfr9t5cq17976pkfqakr8cl5u34x15vml7vgkb',
                surname: 'hxm71mj53r5jrhknx16d45tnejwn4seimx02p0wmxt90kn2vhmmjdloazmujxzl9l3l7uadezuzy86sw07qnpz70z98ve2aoqlnl843qjtg5z07nuerbrjkdzt5utxpl3sjfl6swv5w69bn0sohkx0q9neet4sug8vkpazcu32zg36esddkeg6967j1avqeuogzlwjrwnond2o6862fa0rlm8prgispv3kmzupqfeur892531fwm8nj9xy2tgu0',
                email: 'j8iyj131ops2h7zmssvflwegrt3bn7iya8tfkr0v85aqrmxfep5wb8qzk3bxbmkisrrobiqhrtuyv4b5dw6kiouusjxhy15vpkq2n4dy4yqc01y640hfaspt',
                mobile: 'meop0gaxf0z97ltbfvf1qu4wz9sc4h8419vk718afvqb976jm494vtsg3rra',
                area: 'lrcy7fje9whyfwbna8ea4pqzrtkayouu9wax8jstzm1vw8edayx3pgsfxkiklelgptgfthxvcjkpdqzauef8eaj8m1ubwa3woeu3eupbaz102p1ph2xb67spva2jxk505ekp6qjdwxtk8184vgqrczu4vk8r7dldbsuh7kdd8ioats20ynjq0p50nkhy99gopt3ijxz9j2a7hgrywr0zo5tsb3bsgs7vtpnly1pd2ihh576idp0d7lry6i4be7p',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'ugry6vleyy450u9qhos9w6ntt172pjck9hhrpqtn7ay57qc7me',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'nmaufr0ns2ywfmlhzrs9',
                roleId: '63xdakq6yj2maq77swtetn0e7rh5m90pcsz9k',
                roleName: 'fsm550tmr48568u0f81xg3exa1ttzm2qg6e4yur4cr0na13gtb6femtmw9evy1irru7kpcsfyxum3npca1ozu0sy8tk6kjd55cxiph3dvnwkfxx4r2482yek5qhytgvmmz7kv6i1uby9ctip2r30fl20m08w0nvzfmaj5iyokryvu1lwcwp1owsj2g3faw6iiejctlsgdk9cvwvd0kpz0nml9ykdfxyshxy3i5bpmd80al9vjezsjjx6i9rzrrm',
                name: 'qi83urtpk65vwcprcujghdfavyar3y8u3clekca8uky93tlakcdlkawc5p1k6kv1ohzhgfvn63p8wkbdobti2zx50odiy74y6y1lnv8r58n55116jhdtli12vnlmy2qmb315n5eptas9bmeswvb1xe4s6lenrx5zphke3jy554g2bmfm37usgk3s2f5w1ghhlg87wud7t9dhwpzzntxc7tef2xt6ot41v2c5ghwy0dqsynkxrjsn3pl31c4w3ey',
                surname: 'icvysi8kducqzdayxa33re4entbv6s7479ylm6n4ogz670gbqpd1afu0nnjik76sjzua5xkis9jfquqpt4amm3dtoucosxn4dd2wy0qbnja685ndx7io1l8ctfxetcwzawspqa9zmzo1zl5bulstkkejxc04zr195kidykyzx4rd98xb7qzzdtdt1pypm1o293dy7cfe7mf5ejz9mqlqmrs7tnmilds3l9mnp9ql993g9d0eno8j74fuwpym0re',
                email: '4dewadqznld5ye85bjza43nrr0rqwvn0pw24v5cm3lrvvmc6olleuofuc22do3m5smc7963zfksqr355p5b3zx1eeodj3kl4mml5pvj83bgeu04d9lo4wgj5',
                mobile: 'ut39iw99y1ebef0bbkswjqeil4px3cqadte0m53dvndh791f4xyoq317dg7h',
                area: 'siqa0m1mg4vdf5ej26kqaui9gs71cywpltb0w2larep26lpdc90tm766rvm3d1gtaxeyckcs4izjctj0kekoi1lwwuf3cmrtf5r837kenaqfvis51y33dfvgl79lrfm5powr8cb164x0f81tklb62vo3siqpod219f13gubb9uieog05bo7c0547q3cowf84n40rz1ejo1i71wicoaiyyd7ndc6il4r7qtuashmuokl4015gi1y489q7evasz9x',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: '9lgir3exephkbf9mnhufhawcvib8o5dudincasgjeekwcl94wqg',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'akrjj12djeud87ml3fdl',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'xvprg6e29istlrsqf1fkra6htreuizjif0zfpsggev9n3i2vj1wvkwx1f4cbmgre4c4p0il1lxa12h319kc2l5uyzp5wqc39rh0peb5qlabga5g3kgyneuf25t1uoi3tvqkpylpspptq9hj09ukaed7p0fi0ep4tob300hzqmn0x5kzts0nlmi6usulv1aluv5jsxkty24d328zgsw0i9agf55eelwkfeck2hnn7nlhyxnbmhrkb5sl6cs7z580',
                name: 'x22glna7im2z5rrvgk7e7fi11a0831m468ka4de3x2hlofqi0xp96r82eyq5sjt4o18a59wyrw6f6ju3d86a3980pecu85qetv3gktajq0fg1mavxhq5se5k1dd6t60uw5j5ykofi89zieb2xviarn18qu35samblrqowhvr7rxqpj8miwju78gv6x6j8003y6fte96lw9dqg3xvrtr3jlg83dzqiav447605qre66rbv3k8cxd7t8mck76wppn',
                surname: 'h5kb5akg7ca4lk8l72b4z4bpmvju5zsc2qc0iaffsbtdf5x1twbn3qym0g03ufu8w86q2f2vx0yck5kmxtlekfqxgcfkdunt0riegk5qtmmqpqkkto7yg35qzr2peept4v1di26l5uyp9fgl3b00ged1wgm4jomvqda2g4i1zwnq74d72rt0ys2vbl2ts01rhykzkvsxm3untun30c2ce811p8wsbz2ik9d87azctavinofk74sueikdv6bugp3',
                email: 'ikbfig0gtgmvu9l36dhwqf3hkq7nj0y7d8awsnthvw1feeh05c0ekqcxezz69i6q0hpq7fv95vr2up68i943mononlt921yb04qa07ox8m3mf1mcktd3v22w',
                mobile: 'bbmvhlvbcyyl4hck1xmrprs4uux21ndmid6kx3u4wnnmjfcdniowzcrcirtw',
                area: '5pi4zvbndu21p51zdqzjygsggscuhk8o2wx4onv0acpa76pj5uf2c77wlt5zndvitw442d355u1h2l9lft26svndib8ixpn0r5v4rrvbd1ll92ebaqsbh8nqkvc5oij8ptjdsuekvunw5fmyaezu25zwi9b8ebhfx2z9rbfm331ubm5ri7luevy7olyhx125ps74jwubg8wjh5l7uv3qu3rl92q5s08jo397y91ihv5olb7fdu535d5qkkuvurp',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'l7zmixrkgo3ao1alebleajou08hw33r88cimm904ghtw44p3pe',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'yrh6wcvgi3p5vdnsaml57',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: '5nxjsrtsaosiynzg49bo60jglpwabsqahu28p6re0zf4u5db65fkkh4zk1iwolmqhj0telgimzb2ci4k61yr7hijwapmu2z4axnh8jd55hb503vgpea795ws5mtzh8k6uwjj5dcrg5q9v9q8pztnnjp54604bpt115k4v5ksjzfs7g63cvv7ue9835jpfzlepcjzl2dg9eiy8dgvaox34gguntn27y1fwakc9u59odnmq822othay1pw1jh1fqj',
                name: '9noy16ofhpjb0zbcdatapj8z9078nsweeiud1f03wk9t6mwjf0txsmi00arkpzcoutg0cxuhbntnzba5priqkxv5lo7zwghw9irll9suqy7lr4fqq4f8gjuhyhcxhcc5h2ijdm9q3tqjfawykpwqv6uqh697ymkt18yu11j048o57bqzpj8wsg9wwwzfme4znmjtgaa3b5xybdkhbh69q84cnbp2u7cnhpgacqvy1qvgftly5z18qob8p10rju0',
                surname: '2oekoxkuhjz4rulufgdl4b0kl6ppvhi9upv4lv4yhlcjcewamsptcwb5nklacgy2251xblkk9ztahjo68cc9oyb4xqsrh0tjmervt5pwkj73wde9dpso78ezjhx8zszv1d235sqky84u3hprn81d7rnjt703tsisanvkqy6tzwxbud8vnrp1jk6k73cns93mk8btmc5flka9k5bvz5wc3gjfyi8mo3vvo6v7uwgp7l1qf6hhaaornh16qwke514',
                email: 'v8mrbyz8hxw3oa6kwdzw5snbfj6if7m4t4g20kb1lm09cpw1kibp0zhbi5ek82c7yak5lrl8cf4gm48y8epi9f5ii898fljw3u4xbtcaxupxyrwdjzkvf9x2',
                mobile: 'b4fqat2nj9j64oitsw78o9r5101490ogyoiv75tag1n6lwnaxdnpnzglwii0',
                area: '8d410zquumib6ofre0pebsdzow46askoj0t25bmpl63ynoweqn1r3i9ng74huy272zcjdudp9uxn5qdematbbjg8i462pgzcetkmtsg2iv0yyjqbn2o3r9fkiyg88my3gk0npnxm17ts8c2h60ewysesl7bce2ffd6aoju1ow0fop04jws65883ynp938ryjtx95itxagzbgxj4fqv6ngnvl90c6pm7dnzjse9uhak4gp9h4rlbbxuw54iu4p3h',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'w9b8xsl9sx5peqpv7cx9j7juyyi58cbkaiy5wyh8m9uatfnv1t',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: '0vu2icagg0klui7qocjy',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: '9spb2zvl7zt3wp2pdeowg6j84cx44kegkoe02cru6wlonymy8q6sy8774br6vtsln90cnkv6mqa9u11zf1xve03tz3sfrib6xqs4flb6815k4ab7x9qobg1lad2fb3ozaxvlcijhvfozcu1abcqga8c1h1r6meezgdhnvyajizie1ekxbgbfsmvhpr6phfg27t26hzeupgh1ejrlv4dsbx3u1gubfbhnbqc3lrh49gn04tmqwq1t29jya3q256uv',
                name: '2js2cumuz00l42eq6y2dnezxhb90rc7txh84btgh1bl10uzdlrbu456svh2jo6bfkz4pxzcwol9clepgwoedgqpodx9a27hxvcsau8ri4014xzp01d1lg118qfefcqd5c0qvyw02xf7kcvykygr2vpf8h01amirff5t6eotrsutweruaqfz071ftsrdrsljk2ob7yybm0acf89kow2jh6is0cnso9qwfst57ggzgj73nj6mrui6mqzz7ypb9ip4',
                surname: '8p8z0gcjkwu2quu0ptcqqthuwgql5dpogj9qa220dipf8l3tmfsde5z6jolgg4ljtyxvxyzszd43mfj2oookw5wa5j291itccpcdyqxt8amcyaliej9duir17g4jc21420lt1qb1zriny0g4g2tfqoddlnod3e95mzp8w4dxt4kq3eloc2ztnpwj85axi5a5ut345yv2cgqoqird605xwqn2y7rmvs41b9fi8u6tc7vkh9ybngu02ycqwep57y5',
                email: 'tw1j7v1tf8i8ngkwjbnedyk94xwo8wyz1o49v8mj1bvcy8h4ua3s61zhys5sd0o4fbn4s68o05nodgz735tp86y3ij6x6o2m3fwaham1dglg2x55vmgll0h5',
                mobile: '1ogjo7f14jsg0humvondzgkix49qpywk2rw6wppj7gjgm4id8uiuuzou8vd3',
                area: '8s96s8pewcrrl31zdvml8vvjhayka693gg8fab6t2fq498k1o6durpogvhk0ufslg8r9kgwvq6p16vl8imhmlfetzoa9prt2gr1ceambf8h7i60z09aeqq0bmi5hfpey2wng0l40l53jym05mcqqsrn313jhx0kb4gmxqxskdxm62zdm31d4524loz0zcco9dt8kl18w4yxrarw4rdqrhgc5te1rasiqciafvj6d1b68wn217z405zjaimgzp7h',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'znaqvvj18v637268wvdndc1tdd5nxif3oyx620693nsorxdshe',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'j0226khrikgxt3j1zofj',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'x29fkvfbg22v6hjhpul7rfxb1ez81gg34f4hj7z056fxhouhukjzjljga637wugdx6i1mma49m7vxcpj1b26ue7un457l33qkzjsgshhgpwewsxh7uwv3vfwnpipglv5nr0nrwmtpthsi26pkdvkgzm50ftrtmeiynyj2yvmzwd6i0tugng5w2vuav2aaa87pwq1zbar8kuzcnuwx4trepap2v2po24tpj2wrgjcb1wr7onzimusrrgn13uukjv',
                name: '98ahcrhodmo79i533n219gkzg7di8i9wr0zmr0t7sxqhlm5ab3i85utb5zo4t9rmj4o18h5t9h5hny19gbh5je0j2amdbscxbrc2pkg99oyz1us0z7rngikdz75b10cfxpx8zk4t57icml3x79gnpmx62knwc7a5jqr8enik1uiyltfis72c08efkfhjxacpgvnr6jeap2ngx6af0woiv6mfyg7iz7848gq56z7vjfdjimjwuo1dhtuvnh6qfnxi',
                surname: '4p7badxm0mxj6mm0ko2897c0f9i2iuppo5gx5no4ytv49y08sj18s524l34cmux90jth05szdogwdi8tsxa5ux4sxk4cya2o2pa3hkvoa7uebpmohjvfcdxc6ol3yb7xc8o6ti0yahhlzsyth3okphac3aq47s83ejtp2s2ril7gh952h2b350bysn4z8fa3ns24zy2spkbqskh6pz02rccrlm0otmrt5rppbzihw78n2ry8eu41myi34u1a3za',
                email: 'f2ibgb5hyqkumg98ni9fmgtowlhomigsfbwmqjj4l4k5cg4ssm71i0nkm2wad7a1mdpkno71c7itdsqn6cxfx7a80yy96k56xem76zmzfvxpl8id6s6x6aix',
                mobile: '6z0xhklq40c4o9sb6jft0mjd7i0pq5k4rzp3g0ufxtw6qaqr5crvd7tquh8h',
                area: 'pvwfca150anloc2ds2xcvvr1lvd7pa4g2ge86nejxif78787avkn0xe8itg6n1av165tdyhadizc76j9tjqaq36pxhp6j62w35aybm49oir0hq2yvk494tc2tcjrbhzmyuah21wb3kocgfreyr7gy6k6p9grgbe1y6onm8mhfo222d5q4j61bcvcmkiypod06z7rmr0gsp2xdhinwwbctoyq3oupx29peuvgvc34e5cw7mhlnr5uu9p8r46lpjl',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'e5ubipi5z47d7af3hvpqemtnq1fwsemjvt0stacyny0dkc9e32',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: '8c9te8krmypx3p32367i',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'v2sxeapzkzkzjvtq0wqjv0wowi0ignydj5gr2vjea8lrkxequgmcla90b1liczztc1bf04ljedydmdxsg7izwjcy60ax32m5wl2g5e7qevbe6bi9ug69rwlnud9r1my6fcfy3lc52iibh097jj61sgdmlp5p1rcm3mojfiprhkpnt1fxo2gboi7vxu205zujoso8zovs4mmu6mqaulmy4ox0u3ep5fo43c6to3bmzu8foykn4lpfao5h1chtel5',
                name: 'xgs9klkxazxgm3ymngi1j6fbwin1ypat7xv75c7jzpnfcwclljmssooa0c39g7c8dord794l3fogptgqkn47pk7nfm8oipa187i85oryjcsa14y8q35q1pr7g914lkhfy0y2qzznqz8a33pzyo3ma5g4bclzh5cx3n65e20o0b471hhgpf7a6ce1mvjde2b8f7154edu9fb8zlaf7mqnp5actp0jtb3ee1drkw21ytl9ov94shkupkx972hrkhq',
                surname: 'rrc8yo9pagc9ztp9zu2w0li4djsuta063od3rydjz61xuds83jbxrlze73pyolkzkn752wy1dpb4p7ivqpq2nw4seuoqler9j7vgcklgloztnriace2457qn1ulprigyr4grrwh6oiipy6qoizk3796f7szgitr1lyxt6nlrkcis7egoqcjmej1iv112c7lgm095maxav9zi6u3aefej1rj7v7tcqu36j0cbbkiz81mi6a5nqo6mli5dkc8xymyo',
                email: 'og9wuqs0yqfn4si23bo80yxty9tyq623dfnfsijrbfmwiv5y3l47vicgtnp5nt4pw8fuhb5akjg2jip3kxgimkinf7exkrwj6eslttnj2fbzv9xg0tcf62xj',
                mobile: 't7grvrjkpofosexcq0737owucofm571u46hkc8fvs0qumspay09u7a2j1k4s',
                area: 'daji4k1qcuoxkb0rqka2bt22ap4zkbxxhoh74v45430j39easn9nurxzrl3z2b10b1bzshaxqe17sjoj3vbwu360aaryusprt89bcx7ufoidrylro25mj5z2ukz55m1ebpeij0ryocg3i8s2kga6mxyakm64z683co328jz4pbq0pfiopu3mo0102a372gva1nlpywdbea8g7hlpr6a6fe73ia8h0b6ooj2eqv7n6s34hlp27jdbtxx5ojxgfmf',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: '2bymjfm1su5u7tqaogny5ta5f1tmq8c5sgxedtdzwq8eilq3fc',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: '4xh9ueamn4fkrdm5ln3x',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: '53ribvcz6x3nc2dz0tit8v465fms6n10lnkj6pluuqj3ibow2gude1b6qq1bmvp8sjr1kenlz19a3cndlv1tx0dpdu5fxid92snp7g9tjp4mb7mf30r48spv6www9fb6j426zi5st3e4cir3a1c2u7lbb53c0kqanyhwvdj7ha56e070mm36x2heu6rogpda3ck9uplax0mz0y7tsk8waoccupy7cuzwpo34yx2o4dd1baxnnm4r03yau1mckxa',
                name: 'ka3ewjrw6c5an5hdborka5kypt6g7qo0ee8icethninajhnzyxm77dyx8s91vo3owlvsi8sp0drj7xe4co36486r187cp6xgmuq5pofakucwmzsfuuzhilojt8w9n9mttthen4m40epquugtcbxi5tkbto5fk3e9q3xbv4raymf6buqil1uhulmoj3l43s4iofg93hknpsgp1dvqghbdbjul0wctjpz68cryiv4ysvae03wr9pmctuzuqp3xmjd',
                surname: 'jra1x7uamh0m2b7ryb1axxogs3a9k2k5xjv0dpsd2x3i4b72rulawr3k29so7e11zgnv82w0howxqzh9tww8flet6k85oyg4w39oyqo6vmr4w7uhkouz26enduqegm6p5wua07be61jm5i6vwbn58lznz2ygl8o9deicn9bzeogt3goxwwptt3ula05fys7nreiwg0tkmjler6xtg3e1o8761f6t15pr6gcz2d7meercbsnt8be6fwowd8ukl2c',
                email: '7vuuronf86lqmqbduo5d73nihbr1lhh8r2cxxpcblxjqbxrpna106za6yb1t7vqev7gk5j8z1l8avxe463ytle26tdxl09ponsu2lrlt4w178p6k39za94evv',
                mobile: 'qf0upimz8emvcrngj9g32n4s24dm1wy4qnofovkhjl7vveuknaazovitwoxa',
                area: 'dcdhpkzsmzell8haztlivx4757pyvrffujo45rabu518n3884fpszstlwkhdovhbl5sa4cs6c2ih22bx59nhsi90ul2llm4tahrag46jztilczgo7iw374jsuvywuxpgk5y4g814uzbj7l0ydzxc4jnrr4d6bpgi63c0cjpsf174y51x0dokjpcgxhjp08cr70rlegx22hq2exxl5z3bkc326edxj7la3ikaih5jcelkff4vo18d9mx0z205246',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'm5mz9p0osehakre0dsgbb04lwrjnukrgziokju70new4txekri',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: '1st80afo9r7ufwyb2pwh',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'euu9b9ra2acr9swd0tu52lmqvepddyxgnlcjdy9r2ddr52t0o697yf479p8cmecqesfeb71gx3o5oznc8oo2qikigjtgn68h4reokiu3wnm1po41r1hgp1utqpekml3zsv7w7p86esct5gveqf5exya6nfe6mtt1nll4f6l1z5ukh049e0gtksj1mjdddpup6f9t87h43hyrw1vmak29e7mb1fp764zig0o3r7hh3ss91fbgponcnzcdzh55q81',
                name: '2lb0gc86cp0f3jotx4ezt2ak58olvd8agk19q0sz72aqv9drnytiq8j0tqcgbdd0e006ja2pe79jrgjt5ytk6cvjx6eod20fgmpv5xxesh38t07euhjdfvxpbo7zva5pbyc6ea5n5ycktrdbz8q67daft3jbyn2s9eubk10umigtj5so1lf70p096tqr7mugi04zo18tzrsfwpq0fbf0hiug88tx32u35rb6wjo5cr608jx8t1fe4gai4ayv1xa',
                surname: 'mz0yqqqj9kk38tfqzgf2zadvbk8q6gh5jstcr4p4xt6v1fh1erv60zskg7skt8fd43u5137wyt7gdwvu4l5lk4yzd5w4uy84whlt7ocz0eu3mxj2cawta7erg7xx6jhcwc3dh1sddy7cl3k16j39twdgg1uv9vz5mf6ve02pmar0mwgpnn2dt2za0negebnccnf4qmkclfnlmt4z1h989keczs8t2cobdkepjw7aqv208u2foolkfsfwgbjftkr',
                email: 'ikrkzf9yckmfvppfbve7hqgqug17twj4tr65flzqqbjt5txyygr1fjhzm3mkoppw8x9kfyujpqkw93w6yzmal9huqb7cx19p2a93bsf23isy6dkykb7zxkcy',
                mobile: 'ibb2fpzyxudikxo395isw85v0z6fy9f0r1xrezs87niiij85td1k0ia9swj5o',
                area: 'f6dsd3r4haw6ai6e9sdyw33omkbua3fw7zsqgp9fl2oaogwa7ha07s2evukozb1gp4s44zw8lozicqy87gz5k0gkwofi2uvzglrx8a4tr2hvsppefnahihn3arr0nqwrcqcgiypkdzh0bblpxi1al16j6g8o92cu142phq778azdzoq15kdv9w4fj4o89ggavvf5yuafw5mo3p6q6t5zxm741xpgh3g6vomwepp9zns292ifuqx88xcb3a1ht2s',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: '8v3ilszkh24okz83ixedwupnuwtvvpgijv5saorkt24ts49vlz',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'ttf2gl96pty9eort4n8o',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'bnnw2nr6idl6zql5zb32c62zo4v6257n9h8aa87l7alu9tqi6f6bn9jbzy9y8ofzh8umqg5ug02lig8jxowmnel3rigbzr0ya5klhqw60ikryg6tkfs3a309n6uw40yttzx5388o9pt7e18cidaw2lchskn1bi0hn83y2smm73gw529113cr7c7flllw042xyqpeh1sh84cvs4r2c1bsb1cbdccz8z1cztegoyj980p7vtqqzbhmibpebghf7ug',
                name: '2ue1dti5amfa7ll4ieg9r1svc9qrcovxvng4up2lelp3rlpguwrs8gy1x7yfs4hnqlz72k7pv2ctlmyrvv0gre8l8erx7h1wd1tqmhh5ghfbme94uy1f5tqilsasdo29lsj7lb427jj395vlhkqsbiqzgg1jaoa04bxihxmjxyg81s31k6xaapgojmppez1ralyko7mbz256ws0oq7sakejvmbbx0pgr4ui4ub3t2kfzwgrx16bs41zy1t9tgjh',
                surname: 'v5j62gopju0ef1rc52rvaangis95w4o8ubxiymuzg6n7i1k0yn62a9gmtx3h25ogb8v0nvshgw5jm1zvss9ml0y6vdmijedptro9obkpzibfg3oith4s9fy2lo463zp71bxdq42txoq1rezu6evkc99ibay77d8k52shv4ken63iq00b0kfth36ber0hu51rl4s1pvjjy8oif1dx3i87jynq900d26yfem2njmbu1n85xeygmpty457tdw6k53h',
                email: 'kkid5gqo4od0rxlynkb9uipq8fu2prox1z1hjfr6uje440wwgbpis7kz3oscn7yia312oav5qyd3cvlyplsyg2idbadhpw03dj43dustqglm0sqar44lmbt2',
                mobile: 'uft263733p9qaesewaa5gn85dbb5zgwrs4i2vl29usop4gaiyhsb516mx5ng',
                area: 'b6lij7v5mtc3o382lvht1bl2eq5woocoa12z1ztztp4hauik71cg6yokwcfja06t5uss5591ceeyt9q3jl67f7atjw04958oa9jt6g2z1r48p8l61ncc3uxdl3wkavmkairbfzzo91rkp0o4cl0ssffmsa81qoq2q8vp0ztz8rj9rhq6wnfw02gz4ranse8gwlpfd5ftfq6frptgs5ejhxg24yq3ds0l1a8bttmbsspba7vtbagmd6edr990hksr',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'emylnqvcrzngjqpi9s8rl6ufkoorxcxj89xu3grfrf7fky9eru',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'nk6rlkvlq43pg2937bde',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'tt0c2rpcqstgl0qsdb9hmyo0cl2avzgb30ij3dfgyvz72ty14uphulfyvd79l4y8au3kah4o8mczxv61ovzqvi92ivm0zwdxpvixtppjopyfz1cq0viaujtxduj4l5vduwstyb8ii10nadxffkyjkuv7cgp9yywicpsn0cp9faeb9abkcbhyjanpulk405t9q2vwfwp99u8jccc4p8nso5q3wixs3px7rynqmpz18mvbmh1yvgrghf1m16f6dk5',
                name: 'p5937dww9uzyzzhser1kyfqkdgdb6asw7sy0q1wlnz1mkdi74wbsr1xm093v1a6u5hbc2a46onlzmpx13zp18nu4wa7qey6dnjcc736w7hiif6rx7rrtt736ci8yrtn0921cvqeskul81yvc46y1ni531y5tp9p4ibrgsphd1tny79nh6vxh46fm7xx1uhe3k9uwunyyog0o5s8jkeymczezm784j5in3r56csdsfv1l5ge2s1ohd500wgmh7in',
                surname: '2cqicxuvgzhos816wh4s3d57dne0fssk1ehmwvomjbst6ks7t7auegh36mq3d4sb5ltptflwy9euqot17yw1zpcipwn1k083s9znackwv4fnnpr1nensp52s68jl4m4ut2rdeqgygwgpjcdypkipd10gypan18rqknvrv4umdg5lyx0sjt6xv67dkfor7ouio8txutdfj3w8p9abi0yonq9pb27yqwmu3t7741ff5nbzg0pd70yznydjy0c4log',
                email: 'ks685dt08ibn2atbtd0in9momjju3vpja6e0utnn25dh3ji9rawll1b7bn0v33eo5dj2wv78ws6odbpta2tyf8uzbcs7x8rkktbtmzwh3bz5lk7j6ivo3wod',
                mobile: 'qqwz06sud62otwg2ikrdk3l98fdspgyeopreppzxdkl5r6by0rg8xznsm6d8',
                area: '5mp2jz3u97rzpvl6o0yomhlwqny99a12ua5xyfjwcqfrdmp3pw4jlzgdqxlanis9ukoyeh0g2xi8vjqw1e4fx1f8ydeahup2onexmgefm2zo9lbl9f035vy1wz7a2qajhhamnmn5pxyliu3yggrinbaw3l9427yrsxdvf5gsy54g0uxmbrst0vgqqmh3t9d8upcy436s23adpqlkeu6p7di0xvg8477ncz9v6n5e9ptfjvzerm12z6nmxktar0g',
                hasConsentEmail: 'true',
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'bwio8brwqt550miahdl28kju0d65ard0jthkwwhyamq3uqaagw',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'uqa1t79tfbwx19fl9qbw',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'anbqennrh9yfpcrd8ibzjo9qlzry6shm7nvtd6v359dnx4x5eda45rrzvvp4big2rzsnv2xyd9qnq4vioxbq20pywddd8rvh7cgxsdheq2tecpvn2q0jwznf1e9xmoll48kjcsqs26pwg16fn3h22zgb3okwjchv0er7gwkgrlf1jjducdztst4p9jf146p78649m2x80lpd04vdkbfhndtjuhug1z5rs8oennf6iss6dtllt4o53voo8kim6wc',
                name: 'arxhj2xvo39880cf18kfgi0z9tst4lizkw6j2tt4ag5nc2hrt0giwuc48b13s1vzsmloiqi9i2zpzvz53evmpwd042zhwyvzo1j50zhn75nx79wqiwr9phctizndrtzlxh8anx8tvnhopwur2rmzm9d7syvmxln8ok27zkzs1uwvkv23aunjmqvqjm7g7l69z771ru39e7f91kl4fv5h9qcercgo2ge36hjsprymqp5qb9z70sjjl36vh0l6gwl',
                surname: '29cw4uqllar0pccr2itmlbkfftescp5ov1vnsx09n4u9a2uualkydv116g28ezsvfocfkff9ke8gabece0wckk3sgk0qgledpp3lsrloqxnu0w00pu2mc29pwn0jnehip68vwez4rb7da4c30ogi6wb3v82qiiuzelkuoenp2xo4zk06wgc7n191mzq6av23qvhhf8ma4bww5dt1f6zmziz9m1txqytl9x6awczmotkxalzdqpxhejyder1j6xv',
                email: 'b6rk6hrmqnnro9u0dkpntmsa10kffklvjat06lk42fxhbtbbwp2jn4uhikm2x5cdxonoh00mvjx3fmp2p4tyl9hyekc7gada8zkcktni2jr7vj6p1ewijm1g',
                mobile: 'j3grgpif70fo9s0bnlcm1k0gnmtd74akl6x76tz2ffrgjaqznsqx0kbplqfd',
                area: '9qd26qw4pvj1jt0p2rp1upewh41aeedohw4cpcy3pb4dzwu99brbejs1y9ugdnag4hyo76w6erpa62jmb0xovzh47atfcghlec1c02f42gifa3y1je5tp27z741gen244zxr2b3dmx8tcq6fk4a22a9onjud3yqddq1nqir5ecklvd5z6l0y681qy5gvajd49k8o9009ho1kdlr0390gzgma0z1obu24vsxhz5avr3ssqih4jml005ufx490e4l',
                hasConsentEmail: false,
                hasConsentMobile: 'true',
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'efd0ebh04mpv7tw8dmmx9qng1f330yckbvu6gmr8rtztqrxdmb',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'utpt0hk2spuhfps7dnmh',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'pptbk2if1x3s8by32uo84yytzztsyy5uedvul2tf8zwpll9j105g9qnwevvni7ql0238hkgnaoj4wnertjvfq1ci0t8a8sl3lo9t1v2g4rffl91jizcj0c1pvkgwk6ek292dz667965wtxx4iboq6xbhxb5tak9gflvfvs3d8mfuoeqqnskygxfogxjueli6c8abcfgta53te2qgtctnt31imsasccjfbjkfvymgpa9f7igparg0gf7ofrbaw1q',
                name: 'nk6ohngxdvp16scyhvtfscnwebn3ncj039o59rnc5zauf7ewavvu3hm54yok4nutoe8dfdlje716jxsfnwr4b5oagnib22f9ylhdamz5vdfn5v6gzkojaswx451w4t4uj1e8q9h0q0xd9517ivb538a8jl1rwdy2ec3o2fmud6au3xesq8jdyeh119tr7e29etl2euflggdsj87r1r3gzt7k4mt3o6cb4lscfwx4hwos6u1hoq7w4l4fz9x6w9c',
                surname: '8pd0xhi24ipsskx76l614zue1cmnxg56wawhtej8n87nvnaaocciovvu0y6kupnqhbeppwfaqo3h7xuwv5tg0tfbghgni6v7vqbjcep7orof9cxj0et7e4b2hrs46v8g257dwvumcgktd6zcnxpe82wc0c11x973fksjxw5xvz70241cyq4mdu4pcwgoutsd95xotzgec1gof29ig3lnzpiodwn9p685yevkc660q9yanlj1t7jozul8748e2wa',
                email: 'k23igr7p0jyfv35ecqbav36erq247zqnhtxltubmf3pulxzs2shc1yjde8asdkukoit9gfc7lknqz649alb6cw96q7ls54bqeezufr6hzn5g0uraap8j0p8l',
                mobile: 'zirm43m59rdjuiq624aqpkwq54d1u3ustmfh4dvbqryd86xuqn7h993w9569',
                area: 'taov2qh22f3zvi02gb67s2n4s8bff1tos5znpvpyobehwi65dl6rhtx00kjl2cxnbwrjra2y2pwwuona4slwk3wim9937ut3d862xloqszmfqzb4dedrrf5n2ron5zuk5lye9iu4y84m36jm5h2qgaf4qzrohnl99vn9f3fjlqawprh58hgvpemoqbaq25zxxey6stg4y08re1qxgerdkjw3tpn2uf71updvd4ybhn9eegq9zs7cteh2uzxl6ya',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'eadng89pe3eluwa9jaitgmtqnv9mihm1pem6fgdwkipak5tms4',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: 'rh26bd3o8arnon16pn1h',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'e4xrmnvb5bz01vto7u0z2zes0it04puvjmoe4h0pjqozwgi2oc0shvga7idk72303qfybvle12csn99z8uhzcq3kty2n3vnuahegh5jpxfqh27wdjv2dojcu5u6zvivt6p8g94dl8a3knunkmabcu7as8ckz7gdapuil3nsvym01z6yf9botgglzavgc8p8kfkkpc2rsvqry4yng3costkbbizutdz2eh2p1qqdn5902dp7s6ixwnimtwtc8r98',
                name: 'sz222740iogeoc7d9v2zzbv6zok1fj3ncmlhqb9drpy32uzshqgqkp3itylq3mbmo7fehl8cllu4yi7ard1fhuanb8z0y33pvryp5wzymuympyvb3iqb5xdibqpr4cv98gzzc7ff19xmw998c4ptglbs1vshwbqdnl79ov49tdp6o030m4iby8mefi318f4gxwqm3zodcdynopx5vunaiz9dqaopl3j3k0pxwfhgherz7kgx64cyju77dz9ri5p',
                surname: 'ulnv8a0jp9yixo55c62o2ebax0ag77t5wsu5ob40ohhubs34nw118ttg8prax9h3l9ef35f1ouf8rn00poy9h01yjtct2si8aih1q2pfmrsonak1czt5jkx7i8xwxypi0eckl69u7tsebexpo0ascia4siw2nndg836pbycbhn5ciktou8dz0wscop66o4s6quzs8e3ybl884kx2jdy82vgohx2eiobn3oh7kkju9inmxb5c41wr619so8q0h7w',
                email: 'vrl9tsiz30gu2cvd1b5cjc4g6a6qpxjzrscqv0y0dtklhfh5ovoxvtbx5x6s4bnxazknlq2l4c2dsqwhxysqxhawwue72qgg5mp08lg6vayh9tg7ibqav53n',
                mobile: 'ctgalzh8q5kjt25y1993lnbazajyam9zws4kcgksfvtbdaumpizdkwiv5vdg',
                area: 'jw5bynesi7vpb1nttwk865a349a1c8iyfhx21oy6sy3mzhbz4n4ndfm2izysyarx765ry9hd53emlgopfr326mdmj64ha86kjaflrz7ffdmwwnkw8vi138pqem6yg2241157dd8kgdfsze1nm7m7s3tvww8bum1284kl0lvsgei6swc02b4onn2yqxx1eg1wi7pxy8m0eayorvp78p2mlscpirb6e5hi3wd3mccj055s35h958s44mpkwzzylh7',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/contacts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts/paginate')
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

    test(`/REST:GET bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
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

    test(`/REST:GET bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'afd4f63e-b392-4b42-9fb0-4dbc917c014b'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'afd4f63e-b392-4b42-9fb0-4dbc917c014b'));
    });

    test(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/afd4f63e-b392-4b42-9fb0-4dbc917c014b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'afd4f63e-b392-4b42-9fb0-4dbc917c014b'));
    });

    test(`/REST:GET bplus-it-sappi/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '46a56425-db81-460c-9ef5-981c4a7f25bf',
                tenantId: '42060dd2-8e94-43ea-b518-0f8bea2115ba',
                tenantCode: '75stf4eokdxvw9l8xybi7rvxlonh421jp8v849z460y3wqpk1n',
                systemId: '13515103-e9fa-464a-bac1-d0a798630222',
                systemName: '1ezqj4cpaefymukqds1t',
                roleId: 'a42249c6-3113-4710-87ee-4a42ab8a5304',
                roleName: 'fvg112n6om1z9pk2fj0a9dsxxaxs2p72kv31f0p2or28txfxawoqmmgb2fvhfhousmwq1potobh4043z65yrjhtd63cdzr80flpa5mbqk611l6kalpejs89llet16fij79hmh5smm4kwpttodjlp5begict7fr4zdnxr2mb43h9dybinkapd6er0409gh0ey8w2ckpirlg8x6g9qdauakebmi7kmbz66kwdgtuwxy5kaq7a3wl7ku72wsiz51v8',
                name: 'qzhi98hlozpamm9wnfiyrfpgbzlrrloua4zrvqh5x65swsfwecdmurceevewg0nt37y7iyjx31fbswtcyis5l47p00f5i0wnk3wcp6rifrkts11wmodlfgu18jd1w0rsqcfzxqc09gquqab0bj0sqbbgh287vcpyieb6wos9wxa03w6a4nmm46zmqvd8qbxc5oiqtiy29g2eum465uytzcrtpc4ktc8hv00fcp05zb4r6xjghozbzl377p3mifp',
                surname: 'kyxv74p53uotwj0g1yvywamrst81en570cg7vdxy7c8osg9jm1fkabsz6hdrxzmxieb5vrglgwpkczuf2dad1abdk8w47gvdrgd9au0s5qolauj92gj1if3wv0485ekosuo8bfpx36mn7jnezvyc5bq7esz3nisepwtv96741juannhaimq2dy64yym7y7rz67tc3mbibfz2y11mzma0197xscgjlpegbfqyahmb7sn6f1uozqfzy4y435lbvcp',
                email: 'ww0trepeogg2obhm37h26quhqmn9x96gcedkohfu6ykwgdikvh9ogjeoxzdse6yt824wv73telimmafcsivtjj26zpvofqrujsoowp63nsrro7pbhnenipix',
                mobile: 'ola64fpq96gu08nt0jxegct4fdvt3zfoy7gw0vxfpxq6kuq7blndnqj6lujm',
                area: 'bxcvm5xzwgfbp7ua27bl9908f58276kc1e666l8bnt7hs6fbsrcynzrcj2hid7n4wt3dddt4mwp05kyvdtpvp65m5bm0xb3nku7cscv64mcp02inwkmaliimgxnyz59nl79ynevw2ackxnpbuiuncxs5ozeslp07t9ngp436qhsz5cg7nlfupwwntv1eli1jsx7j29n3jxo4n9sz7s7ffaxloxzyu1nkmey2ndxfbye9p7ytz7rkxra659girvw',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                tenantCode: 'wxqpcja1bt7857s9gjvsdxf76xl5klm09w9w9hcygdl0irk43g',
                systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                systemName: '600byxoybj3lpetfbe10',
                roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                roleName: 'u543h0n9b017xfe4up9fyfk7lch4ezw22tpjbm3agwkfq49xyxvh37m9lmy8oh1rrs3nfvj5rh92a03pb3n1k14hdd7kds3zibim2ldydilh2z2e1bqiy2bdw6doyn8fcv43kjgwm4mjd9jixra7r513ul71lx2bu7prbjrqp6es050nqpqyeduvi627bc3zvvfuu85x8o26k9mjwurku21p43re4s4duqodsac6aocp6okx1g9cjwqnhpt20kf',
                name: '1au2bfx9xl7n0wrra3pkoqbx4wpkqjahbh8ozm7091obcwsncexwdn6ic9l7c7kxbcijo7t6mkl71uvvtcqc5kanr7ctc6fr60ocq10ntohx7ijteeuxh053rsgv9efxngyopxqvhtk1fwv2xwb9k2xavb8e60q9isow3qjdgkkyiqcwu8fy72brrxvnfspx64k57m5e2ow8lzv6qfwou1c2qsvocm0oweuwkw69x9tgs8wq0ucj9li6vw7pma9',
                surname: 'voqisfu80jlbdvdhh0v2wqokjyttcg55zpzaic2e6vt96kukro2slfm7srg06t1agawyv5a5oryqrmw7nhecpi56wzs4hli6f6rvm07htqtrp9jzvbhber1cal5tpfb612ivaf5xtrdixjy479zkx7q3q5h80jq9cqlnhta28ebmwg0djdsk6uvrtkhx1dvrunei1ev4zkpiwmskkmuyzh0msjxpt6kir6sp1ud0dqg9k8o4gmb6i1tdk59nsbs',
                email: '766qdezf70fu0t50jhij9p6iejhz0lkyv8zr53e2fvgnc5v02ndg6jw80n9v6hkwk9ih9mcw0w3lrt1bj3eaam5in01v15une47awaxgw6gfw3tnow2fj9or',
                mobile: 'k5g97rvu2oushlcgmd0yllpm7f5vsccvu10k36j5w85ngrj50ywancrmco35',
                area: 'iiettk1kotjohcp3naih3d3gf8t57zjopeglkqdad376uf2pmkm7jdpjczl5jj9amorzw8hq0qbd75xelf2w5obw1zsdmvkmeu98u249dk62njv1eubsxdezh8bljqpv412grxqikx4jhteqbto03in3jhzypqqe89k64xswr41uy5s7n2rshd812vtd3ctfgn2de8k8sc5dc9u995pi2hq7gz00eshe2uadhu89ulo19wzhoxea6fbc8d55elm',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'afd4f63e-b392-4b42-9fb0-4dbc917c014b'));
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/afd4f63e-b392-4b42-9fb0-4dbc917c014b')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateContact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
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

    test(`/GraphQL bplusItSappiCreateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '69606239-33fa-4128-91ae-4ec1a3dc9b4a',
                        tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                        tenantCode: 'm14heae4hbmom8gxahe3txqa5wp4twv5ee0v3pt6654nmydfqs',
                        systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                        systemName: 'jmtlnpoak6tz9mekd163',
                        roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                        roleName: '9u99vgqnk3blqwrdq46r0mva9t0k4zqtez661awcpip0f9m6t429thwpazdl55yxj7ielbgni5cl1yy05he7f1rrzgkthpe1tf79354s33w7bcgx6jq9g6q4i08dmtu88mjl3wyaakjn94plq932n3akwym5nwemozr9ikdma66l5z2f3nvvjuc9va0zyhl3e6v17hc704sp5e5f3fn3jgbhzryg91kqgi0jqbi959gwl5lja9u1lv91sc6gdc8',
                        name: 'vcm9gtm1tjlt781ettge9ajutg7psm145m25vh5vzrnb848dt9293j5n00hhuxqh7n7hd1y6bgl35mmxnmn1ic9xbm5xipyvg0jwi62yqqiyz7ttrne0tvnqpqkhah8wbuutj8ks5crlpyhtp3qs7vk1adrxfoga0fducdzog1ere6v45d0jmg3c55d0xabtfnbsi8c5ccmw91be0wui9tt2tm1im7k4a6s94hg1szl4z9h2equpufknv0gusqe',
                        surname: '38t53odvttgvbhtn428bweqqjpr4zmrmf1auwl9c0z7akeklazshbrz608pw2wuu9eoe7fl6bp85igdloalnhur7pl9r9ls6wpot0w3wdoeu4q41k2q4pb8jnw7o6hf4fkx869qh216xdw5dzw8qlel7igou805k6mza7a69gliw4yitdv8runpuc9hvhgsn980s8ap45s6ajjrpk41bjo1h86lte0ere5ahse0xkvo0fehcj6arjhpgb4klalg',
                        email: 'liw9c50p6slxvsi78lc9mwtzdiimwhoaqvkkhmbwbx387x91voxai14oy590rasu4zkpwix0d81j2asz6thby8gbvewjuxs8t6cyul5fuvp3efoim76gnzl5',
                        mobile: '3qvzfvto69lxsnl74o3z2xltts689ws3cu1i9rdqzbo1lfhjovkrk6ysjw7k',
                        area: 'tk1q050t0bv7opm1a8yg4kj8rpno7jyhy9hd05806wk3z5g301gzeq2hyvn77yd7ompyma36xb49j887zgq29jt1mplcg0k4bx5f1hkwh3dpxlxi69w6f5nqws7xyupjj7uy1joycn8y8lzk6v5ywirr3ctjv9kh5sf10bfy6ushl18qpzaaclf5mww6jiwnqsqx0vzcd252dcgnduibgwne34yi95ug6jo1vqjtrdg8fko03valg6lsfg7ddc9',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', '69606239-33fa-4128-91ae-4ec1a3dc9b4a');
            });
    });

    test(`/GraphQL bplusItSappiPaginateContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateContacts (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateContacts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
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

    test(`/GraphQL bplusItSappiFindContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
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
                            value   : 'afd4f63e-b392-4b42-9fb0-4dbc917c014b'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('afd4f63e-b392-4b42-9fb0-4dbc917c014b');
            });
    });

    test(`/GraphQL bplusItSappiFindContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
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

    test(`/GraphQL bplusItSappiFindContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('afd4f63e-b392-4b42-9fb0-4dbc917c014b');
            });
    });

    test(`/GraphQL bplusItSappiGetContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetContacts (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
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
                for (const [index, value] of res.body.data.bplusItSappiGetContacts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'c3c284f9-3051-4cac-aee9-302347c1c36e',
                        tenantId: 'bdc7396a-8a29-4654-aa2f-a53b8e0b970f',
                        tenantCode: '2lwytadmoish5ss0foa7s126rryr44gy3l2olocu5gik3uyxhf',
                        systemId: '648ebc9e-cb38-4125-b8d6-f0f6a5c289da',
                        systemName: 'kangb89aedq7iah9k3nf',
                        roleId: '422f0d7c-69a4-4aac-89e7-711f29ce3ee9',
                        roleName: '9w7dmv2p4zuvz9htvx8d2xjqdn5ypu3xm3vcyitaxixixzel2b4i82c16nxw7nbka7mdeiizmnbydw9ghwwoj82hdvmd3mwv9o9s5abmlsmjuvil72hdro44npz8j60us0zjvp2t9l6cs967et54s0k1fka5stf67ik6zdthnjvqp5oab2ip0lkq2j0kcrn6hvekrm7q6b4gofx3ju1452lralck6oehyva16fsa6zs6v6zlg8ratunuc3j0cvi',
                        name: '6kffqhlaki1715xc8351nyzc2ndotjbxqmx7xi40jmswgllgw37d8gcm8ez5q2327clofj1fp0ew8qfoanvvvns7hd6oiispzqhq1tf6svp6l9pm2l982v76bzmzolysg3c0rkssoxwo20kpo87gra6ii6enw43qavjit69y912z4bu3jpxp2obsdzyadyvr9cz5rz6xqmdhbbplb8shhr3bf2o6519j0r4rsanl8yu8n2m1icqbc3da1hm4l5u',
                        surname: '4mxmvctll2bwpbipn4hnvm3s8vq3iio6qcb2ev9k8w6vhade1wj9yz1u69y6f3l4cspy5ev2q3kqu2trj4c7exjb4ybl7saetdqkqs0ftxnfg6ibk19nbzkyi5xri17v7nnmrulwlkf30vzaooaqgboe44nymzmaxudauttn6hafcu4lhd6ryrxmt5006ttuma1aurlwpf6w5dewe92hqapx4dxyc7dppghunlgff2uih4e9mwr3bdhgljqb6dj',
                        email: 'kf37ie6ejoid3gn3tl1ldvnpxlz7bvqyo8xsgk98skvt3jpx1vuka09rv8nutj5lo21sm6qkcdgh9refblpvqm48wdtl27w6oyo1gf4lng3v364cng3samgk',
                        mobile: 'yh82mxesxryqjfmxz99r2fv8b4nm1vg0f5owvvlcrrspuu21ochlab9poetq',
                        area: 'amknznfbskr4qtca4bumtmdckwd97t3y9a8vjo64m4kbrzfo4axvv51kunw44uoqbmi80qtdkwp3t4gm70qjbufpryh0dvzdhyosqwjhn0vdi2k5tt97r6k3g3m2cukvwx2gu1d3ugr9ar5ux4n17dlvgr4gq7d08zed0m43w18u8owkj76l0xko0jvyp2t5w4eadnf1wxfcy5n6ax7p4du0ntigck4e3qtx8usqz0mz3impxtvffrkqr1ohjec',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
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

    test(`/GraphQL bplusItSappiUpdateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b',
                        tenantId: '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9',
                        tenantCode: '316201q5jwwl9ch1sijufqhu4838995n0j4f0lbgbjrfw5j4ez',
                        systemId: '48589111-984e-4c69-8f49-fb35c30d2e43',
                        systemName: 'l1amxtfrhe2j5xepj7lm',
                        roleId: 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b',
                        roleName: 'chqk57bn84bie02bnwwno3xqc7nuf8nv65u1pcn3op2s1jriexwtek2o527uc2q23a7iiovg5lqgvda0hwl7iuzxl4bgbptn0it6rbrvl6iqo4ubk912ook1gfu5xs51zmbg0vp4j01shmsoc319mcejkhybs1z0p7g1j5hqrhmqg07iudl23ri6geo6hl7eyp5ucsd5v4ti59k7u9z26l11facueoett6rlp76shr14qt5dtq3hywyoapgnz0j',
                        name: '6ki1cuik280b961ik8lmngtrj1929vjy0yu00ro6zx4az47me4t6s9e30s8nuv21jpvcif22s1u44el1vvbjh39vhryknzcxx8z51tqnjir3wiu3234a9rp5s7dkswrc1ho6ekmflu0gmjysbz77u11g0brwgujmw5q18wduhp8vvfve329j7fl6cneugeju2m7examaa1tdis6sluiq1cnsx5eo44dwvg76xwmfx3t6o4iugn5nj2i1ea41ch7',
                        surname: '25hvnmn2euvwi9v267k1kvboir9jdbps09ug483ph6669xrdxn1x7qo3l9sinwwfpgaei4qsqlfcz270h3dltrmdonc329ivoyhxeyn4nug7mubpcuemygwfpqmen3r0exbttywrcuar0mer46qq7k8fqtf9zd5qsqtqze16kvnisikq11e7quweerovh0x6c7oqhmvbkkuwg19amumlg4d2kd8hsh7gmf2hspiwl8evg94w38w97w8g08b0z07',
                        email: '9btpe9g84kel9j3p87edpbxuv0kbmchnupiw1o31ht2mft8xiv6n9fmwmsjz4fy90ggok96q4hzx4nps48s7ysi42w00stn9zy22eklacz61ixsqccqamsxt',
                        mobile: '89iazlz274soyghslrjcgcbhuci3v1r8au0hmox2j2kbthjcrz9i4usnw0da',
                        area: 'iqhumbmuwz6ha9g56dk55b74q1fvm5yiowtixe30ou8mt07of2j4s6lfxgcxe1z0jma8r1jcngoutzi0vwdomrd4pdfsfjvrpvl446nmwl2f64ts2paghzyv6041mnq3q1puhrgjhhmg9gxas66ywyld3n7by39xvbwes22mtyhpgui2q4yuv0nk3nje95r8dtp1l04l99nqp6u7k11t6snmqbf4x4a2lfluq9fuzuh14u37vapp3ct2hb15642',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('afd4f63e-b392-4b42-9fb0-4dbc917c014b');
            });
    });

    test(`/GraphQL bplusItSappiDeleteContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
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

    test(`/GraphQL bplusItSappiDeleteContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            roleId
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'afd4f63e-b392-4b42-9fb0-4dbc917c014b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('afd4f63e-b392-4b42-9fb0-4dbc917c014b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});