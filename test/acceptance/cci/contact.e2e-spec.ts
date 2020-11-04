import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/cci/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/cci/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST cci/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: '8kxkef34ieoag7mtljvzfuddxzfoaolk9rbat7ixx03t0xnxfi',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 'ubsf4lusg348qvpf6wax',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'xjrx9lwq0mfros7j87h970pliffhd4xk05631as4mzim8tywpf48sfm8qogn2a1u58hdbhogcyui8pbaxoxo4sc8vtr001cro2yjpedawnh2waphp0xxx83y45o9tcg530kunz6093ydrtxqiwb5zr5t0u6nexawraichv2pqo7m9w8kd2ajgstrm3cbjau2xmq835jv665bruvnwmf7c80neh0utmi37fulw8txk6ev9bhcmzsc8d44gf2w0cz',
                name: '97i8vka1u5ugrpkldkznhunssw6725unmj374v15fiywvb2ya42fu3w9lgpd9u7h9agu0ikddao5ot01js9zmqrej51qem3ommsugs188xdv0vob9819xhm2co7ps42t141fry98q08vsx4wbej57cz2f3dsd9fe73c2j2x4ferxm4fldsmt594rixygepdyos168qf4nm6wfkod2jdicur65zsma4j6mmqju00yfd1druzoalzk5xug6itkfk3',
                surname: 'ow55n4y4ts7nbbze31g3x0rupo2wbsejwnbugepj2kns86gdtneci4sf2qd35i3t5al5qjs558lvu6pbacora5ieww2akkrba01xydp1zionz0kq96qajlceq7flp8sldqu06rva5rujkumz5bjt45wux571q1m7c2ak4lqqhavcbydqeripzl7u71hw39vv7e2ovsg6g2gfsz1yifj6syzr40yjgswrxc4q0e7e7af8dw81hvt7cu1blfhfkmu',
                email: 'o2rxgh1lpihf1iiyq78yf9t602qddefw0ebmt4ye3pztw10n4n8w0qcptyz2g2gnmgu43ix5zhv57wcspxaobwsyi2bcpizlay50zta6xa4pz9i0pjzco7yb',
                mobile: 'n5gcy7bjrifgz6glbw9rnxzttnd6yu1qv0en80en0xvjzl3vivu1bl6o3wh1',
                area: '8oz0ua82bx2kkmv623mp0025l27wna7uvs8yhsyfg4bvccqzuea1pfkfldhx82df3ful0limhm2dahdtzyyf4cyzi8d0u0gmrmakzhp497ndef3cowzcdg37vixmo3jm5pkf6odfmfy26xoqwwjtweiwki6qrgbav8meegrp6jqvraqgudvb92g75bu8dv0gvvm70w94zxv37uirypw0bilom21249viy9wfvhyv68pmmlt5nnkovvvfrjysrxs',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 't3o7qbunyohi5ji52dusl706kz7qs4hokpf8qmrelje0z0y0nw',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: '2jaqwhvfk29aaodgvit0',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'czlxct4yc39lni0nk9p413zly0zqjgchveke14kgmld0y2ng669qt5g4m4mqtnfyrlbe2isa2hrm0glwop8qacln30d1lyj0edi5tlu5rhihuokx6pukzyi73hwcd9us367qj0wzkso8t8kjhgkgjl9hu2w8g253u77wsiuk0nwkaz88knkym4hrrzc1dbq7vr8qov4xsfcd96okvrfwi3s6drgko0hdq9zai5flh9fkf7bfbxq9jzkikzqeveu',
                name: 'vgva4cakf4tnu7ha7ux3rng2t7d4jy1iqgc7x28zeaalc506in4akifakkwi38puczo8nzxbzeq4816k8yr1x87oi96m7p0ac4a3866irg3hktbps7dsgkvxmqw4e3gsxophblxaeye5mm3ow1v73twgtslq63ez83iifw3vq5vdjx4sn072lzm9c2bmf2sepkd3bptmlc5pf8i9sg0rpes83prhqrzeyr6lu2avx3ppvvb0wz0rgnoehfjfxb5',
                surname: 'wkvdciis8ld8dm4dmibga0fp46hto8jmxbvj64da1yl1qlk83k2akkmst6dhnawqq7tm91mh1qpj5cmsbghjkoa9r3gx5cebi060dqper83thcmtr3sej5zvcenko9873dmcs49bmctrdeix1paquqkuaetczeeyo8enme315e07ok77yudgs9guhktltyk7p0ynxid3rw11wx8p1loafgjvy5ffa3k4ka6rv3us8mp6syi9duxfklwq97y5wqk',
                email: 'ey3qfv0uuq1erjghq41ky5k4006p76d04n3m0ion7q2wtjpq35k2ydikgrci49x0mz21g27vnlzn6q8kdk43al1pc59i83by9zb1glyfo0gc1gncm5obo990',
                mobile: 'pwpvhs0meiga1pz81au7xmqbndcozcjrymg88fnly71l2u72fw8slnptki5y',
                area: 'hpgo1kyycyuiqnlfzr9w84zrdwdriidpb340yxi6daqqv3dxf1qwih5qtpj7u7l8690l6lg2hev306e0ittqtzb9kt8ounnhgl390gvsmu7yotztprkxcn6w1cjvqzfeadwhpv9o71stg4c326y79zolbvoafj9d0cjigsgpplmxi71qcx1d9h3px1qrclgk8a2wp41by7pmwdf7g71r3mowreqocoooxeuh5e8vw1107s3ce1qgrt0dp4b9t7j',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: null,
                tenantCode: 'mc5d5wnmlwixg1w32rk4wcy4qkppi33ved7s32vek4mo63bnvb',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 'ldfaep5ae4t59dp6lmm7',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'uivks1mibkxeja7t2nxxvbd6wxhmqukep4fjgie9srbmkkhvpgf7taqzr3327pt7z4qhfs7zvgo8zeg9dumcfoswzew8nm56zh7zb62qjpwy726vadslo0988uqwtlkfslrz855r5tswvxmbidxiq4qz2tcagw94k317nvifxnohympaxi7w5h8n71gmp1ddw5kdr2dpo8374wy5t1fqdo6770wrbvx4v60e4h6viw7s8ritcb9vdlw5p62mewo',
                name: '18ltjymproozfi3kqktlb0zsn7ufyg2d04yabejblos82pz8qtvl77la4d1bjqzt9ra9o499851gjfxb1qwo8914xv1y49ypttpk1tkylgwmrhf30epjyy06qwo38o4bxxppz1549q7krmvc4ibdind8lpswycmtt04f995s7ltr5lb17hghfxe64h1p9uhqkqv2rmuna85dkc32qj1nel1xustc08j61hb6o3scm3qnlx2elqsdy5s7hy3j7au',
                surname: 'uykio9yn8gqdy32ks9si0qa04sgog5p4u0tcv3c6j62kxgek7yxkulb0l5e5mrsfs7mlnchzis84dezqgnjqaojhcvi7lwwyf63au8l9fm1n8f0luc9j2gdlodxgqfo0zemwymx9m3h99qbef94517uxskq9cdirev3cg9ghf962qx3wlvbmto0bek15vgxkje261x9g87a04u3tx8cvirmqs9jwvrtlgkav1qxbfoimhrwioafs5b15hf9p7ny',
                email: 'd2knp8kmgxj4jy2x30dlthiuvvpynpigvic70gfp3crpgld2zq5dhik16fj0n9rjmphi9n4nqkog7usi2wxkycjaxh9ag1yasnbkdm3o2ysr15sag5tmhr55',
                mobile: 'muxy7w988648z2v1wem8mzr4fxbc6lxe13pij4mnvrd5e8nelkv27g7dwps9',
                area: 'xb9kvzttco1yt05ayunuxmld8untjio9ylit1lml42yr1wdpzwlbf17sge7kza1zemwyfqmgtdihvryuu9yf1ej0hc2f00xjj71ku0qcqtqqgnpvc0mkgs25ub2oavbpmt33l2g0lshj6lfcwtpqzhmpbzzu1sxz3l1dtldcaupwcapzdd4y9xrv7uwoulsufup2hyqig7l5kv1z3n0w5eyzytmy68v2l1ydzce54afa17mapw70jtxyk5fmm5q',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                
                tenantCode: '8g924v8vqjufqbvdohqfz8fp1796w2yna1gdt8vv3sdq14vh8q',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: '3l6jm9ow4bqusizdlx93',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'v4a27nr4e3hiieh0gehaynx4oeq56vp786i2oevlthg9s7ueykh37ys6dmpxkmhrqrqllv020k46yb6p497t5c8c5v2iff575wkb3mkp8r2chr2ehz9gyd2glv43rwqjgnb3je3izitj5ayc5n17709f7sxjnjuq5vh17pz8cnfubfm7cg1gqxbaz2kem5e94xhd1pan8kp1k8dztk1kg3jcxfine0gjdlnmk705gk1sdkxoc5udbzj14swo5ll',
                name: '4wwui7grqks3l8al6ex8yileumwnusdiwkzc8o7fva3xntuxa91abyxtlk17nvyxv592z8xm9efqypecu6cwo8gfmpdqdjzr8e5ravtigg7w2ydaqjpo3djb98i557xj34pydt6tth5fkek0dv0ei4sh5ggbg00admf5ifj64awlyl2sce18628dq0799zgszw7p4typq62xlwzv2s4rl2im2ix6xgnkefbas8zx9ccq3aasvem09sd9vhsmjen',
                surname: 'sbkofgfc536a3vx7flnb3jvgsv8y6qrt7gtp8qvsf9s2wtftsup7qsv5ehfcy9in6aky1zh6bw3xqu00ketgls196gsklye4h6denlkc5abqrx36mzt6yjpoqdfpgpo4fvidesj9xvqpwx52tiz8i6leu54m1m1rf16ft49v4009tm6m9z5zwfa5ag6ztda2c7qf3zuxs4qpsmav0btmwkky5kdhwwkc3lium1ixzs5xqz13uufuwv3s4slaxzy',
                email: 'ig7trgh6mmd75hhstbjkf1yuryt7vfwvybpyay4cr5cklmzkvy616vjrwintbkswydnfrpk7lyh9ykbqzyxm9z406dekjp1lfond372rsx7q16z081681rp1',
                mobile: '47u2obrxtvxaajk4yo21wjj7z9tcz21lhnow8d3bfjcvafnkzj6qfgho9mca',
                area: '8f027kcdni3ta91q140zm4dvogl04dm4rrwyxrxiyst0ir0ieqjba4hiiu23f399vegplkl250gox3vfhbef4s5snvs4zren0snqiyvom7duknc0bfv1ve0an0kbo5vdl52horsxh4yha3egg1mbqjqvt8gigepyjby1bqbnnnwu94yfc2v2tey49hh67mg6ajvmkb9wrnjadkpu36ybqaegctrmyf7ls0nrb27kk8peuzotgfneou2uv5wqx5y',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: null,
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 'w13dit48p32smpe1tdzz',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'i2jn3ly9vqvk1po4a7rq3orgvuyfi2zvyi153kkg9mrf68pp576tmgh5yppjjsq8lq6e6wkw465x0gxnle8iwpk5v9m0smm9hz8o79qk607mlfq33l7c9sduiz9i7m700bm9uehi7i6a09jf4h9w6srrk2slpuntd8hmsqmn0bidp4aq1u6nfbj22hnms00xxgz2hoi90epekvxav67fcl11p6b4xf2tv8uwvsdkpi5oc5ommyq9fghpfdplutl',
                name: 'qi34d2vx5ac3i74c095xax1walpbvj2y7j34cnsnytmz9oc4ulhdtm7ju67x0mkrjc7gonb949pdx8xu1t7f5s172fsiy839kh7x4sepzkesnunm6ndxb2ed7sak0tjz8c8nmz80zbzs1ezoab1hmuk0pem91awkxctaccky9nedihuy2wyowvgenzv2025e1qvk40xfdxo6vhaqrtazwvmr27vchxzzffqbj3oz9j00jqaxa1rynkaq6vxt4rt',
                surname: '12hr077zg70g3ee8khpdgnn17b2qm0jzcxv7yzdncd3bvt9jpzgqemgqrm194g9t3t75gg3r5xsperq5ugf6a070labcobeh4gite0i53na6pxg6eqp2ofu7627wbv6gbm1ohk8xh7pp2ii676fjqoo9ncax546pt299s7mylsc55bmoodcs6h3qa15gchk6de0zemx0rmtyusgn4q4sg3mk8q1hrs4ribhm9gsfdul4yfseka244tx68wvv47q',
                email: 'q5qw1y7s9cc6hqmkjnmxhyu9hnis3qiffye30yzarlolplprm520qxk9is7uw9z9a1dx0n860t62ie34cvvpqc0zpfupx0t8r6pndmk6z63lx2hqg385y4zx',
                mobile: 'v5jrba5tokzsyrbdaj4y8clr44byp8najaf7axgyrdtki1qephw8z8soc596',
                area: '4zkvhron1jtxr30l3lac8va6cfej7xlu019oplg9z84e9u1q66eynxexzac0ogjggfy6qr5mcwtswlmlw4n6p4g8ruva7ldie8frm01n9br0i6b7evko6hicluixfx1bgmjdctsnq7od97jwvv7kebayu0i2ui6d7ebqkrzenyzz6ltsjrwh2hymt2tvks1mbhio4n4hty99qh8p1ziybv4ll6ls8ds1r81qzg3oalhwoh5w67fg3j74e6j7ygk',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: '9phjbfpaz5d2sy3jnybn',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'f6v5rkhx33dod8mv5rm198jps3ydjk4igx6izaisiehuw4jlc32vrbuupma6iqzcaiky8jh7i4vxkmhvlrmiutr8yobzf0kdhrfy1zw4uo9ue6auefq146tefz8remvo6wv8b4o7kek5g3xlx4ncwr9jva63li8moozqh458oyp3l8cur9glm30gtylwhp3omm9mmsshjx3601pf4qo101dauo43ekf6akjc1319wsbzmm28145q4twdzkpc179',
                name: 'sv2xq9h2f52rk6so7yc1ik69bsxmcxxuq5igz3zxz3b4h044si5z5ziif794jw1eysqkww3qfo0y5cuxsu5ooxpz124m6qpj8qwsecne7f0gqnajfzy0xfizis5ubga2ijilqrm608dplfl1nh4ku7ruccnfbil5kl1reagtwkuz888qsulhmzhl6sc3afqmvspxufeionure76y2sf6dhhmcb0gpgeg3ms62t8gcbxelrcoxb2cmf4dgxr027x',
                surname: '7ncf7r78iezxzlxwwlbcoc909xh6dq3qa3ubrtomeepfgclgr8vobexd2kjteuof8b8q9036et13jf98jve1fofbmkrbiqjpvmqjpk37lznlllwr4on98eplq8kj2jwhcy5ialqqumm8ts9r08l4pl4yvwst2fyjwou76x187kctwy2lqqvhzelm3yg7c5phybimm0kcedozyr1gegh5unmox9yc8eknuo4dxrbjp3043kyupw53ccwtn1sy6sk',
                email: '5t3fjf6qng3uxm1tm7pv5bca8vo5muyurj0s6p06t18dvn829s5udavj7w3m8dnnttv7bagy8w4u6l3vo2f43c1xnm5fz27xxuwvit4f2aejvcf9z5a8s2pn',
                mobile: 'pseh67ufghdtgzkue8j9nt36dbfknkqym2j1jbsqel4uxnodwllgnd9q4zz2',
                area: 'mdoctea37ywubern35dim9zt6n6ehh2uv6s983ac9ytg3kms3l2bvn9kl59h0vci9okkaf51k04r191ncny8nij6o9frqa5nbl8zr9tdc5f9eezsg82lf2sml45mqyzx5vzio0d258vbqxzv0g3jk4c5cw7ifjom5h1sk3xqnv31petaws4ezdexogoayacqvtkprf0wn68qcxyflwqv524daspgnwajdt0csk464ozqmojqayxo6fkesbq4cm2',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'twz4xhvsrwu3fsuahrkfs7vy2z5hbz5tt3htbrjexx3qkke6mg',
                systemId: null,
                systemName: '79k5682ch47k0rgin5k0',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'd3m0zqlodug6kbivdzjvsbp4bg41jwuwr2mqc71zef2uldklz0f7g7caz9it1nj81em81isgt5qcksiqtgkl5zr5xyfj0u9ztf7oxp6c4jzkabpl7zyh7dgagvwz2bmkkuzf7xbilia90inu7fy0q3lam4e9il81rqnt2jzq9vi5r99io9vrca5vpwe6cnuj53yyrpq0av7ncmtujnhgbx1ykoxig78uki73ompb8htslpjhn1c70pxvb2fzlkn',
                name: 'scxfziads00o8uvhf8qnm5bcbimj0zl2fhpaij2noui8fm37631suot9bn52ru1rrutrhrzf3phb3thun43wru8e121mh63715mqrhgnveycd1o7zvmeklk1rngn126puy7x7qbismyk2fech7n7s16yyox0bkk7nc6gj6cl0h9kihqax17g6ctu522lyle7jkqr4iz4fmhwm7wlhc4a6nweay7h7cbrultjkqxystw6ajeiqpvoee8mn9zuafl',
                surname: 'wwto8m2lfmpljsketxq9nn9bd7lf4232u1zj3wweh4hd28ciu81exssufbn1dgwfgrx1f7ipwgzi2392tuc0nyy3mnypsj01l4lx9ypa3gflomhjexeo2x0evor48ann1dpzopodkfwue3ej02y4t96rqpfg4oqd8edf3sdtztlgn59wyv08zyj3xlxa74v3ory9kkx21fdce92eofhyk5f40uit1ibguu4q90ir67930fjuj1u2k3wgaphcnwn',
                email: 'wvpo2xocczn7oorzosxbpuador5d3f2kt6mqftbgb61anfyf9lfdcv8o99sb7m8ri8r7c3iihv08euzyj12rylf17mb1moqs3u183pgp420vtzify3i6pmo8',
                mobile: 'st7ssnukmrq34ofyr3zhf5fqsrifubr4zzjof08qfqn8hcny3h7so2hvemyw',
                area: 'ag14dq0k8abztmc72loysogxkyg7omnoc7bt3vz59fmni2czuhgpg4shjz99sln2qjoqc1r7ya2ak31pzmphkzapp79uoh614w1etsfhia3zmi8qgafaszztoov0xpxz6gbfm01lnlhec4hln4jpbe6s12s8upu3m37gdeorj7qkytujc9xt1ro2yq1vmx4bu0v3zoksvsr29sx72kwld16i7gvsn3tal8s0cq2n60y4iqy0k0kldvkpqu973qa',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: '9ybywfhfgjz5zaaimtungbeas4f30et6q0xi4knxuf5v302cjv',
                
                systemName: 'jhxqxuzazs12e5elxhpd',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'mqxrv169c30so2tzcdggnjl92rseh9m0siacgm9y1bqlu4zb0jk1odu9bei02fjpm919ua099ajoffylghc07vnyrl29wnvjo0q29tjsdns1pteii23zdwghlnpm8yngm8p9n3wscb2xdp6exy1l73a9zt96au524n55yl0tyetqn0mvyrg7h2a5pdhmf2hdrz6ibxult8elr3jfvw4kavwujz4b2smc5wjszeg8o2sy872zbodha24zjfjs9j6',
                name: '601zprqeqt0e92o7ln2dbd5frdha57rucyn90hogbrzpzntcp20kdooeydihws1vpsnso9or9ydx7nobrsp6os7ly0evmt79bjivbv59vflsmv743e4niph3qx3mm0iqhq443s6jnaajvmm1js50nueaerhdhit028xdqisrhxp2j1a0uh56ff750wsdz1kd9bfsth39ia53vrsshiqangk6qyzzf3iuqqavksp75tjepvp2r4lkgskl765ry9i',
                surname: '7crssh1v2xszk5trcdd2qbqoc7wuoj7hrp70hi48621p580qnvqlpll3mholds8efmkg31w85dg42k91ucl79twk9c60frhs6ulqngiw489nzpo1bk0qc31i08wo7v6l1po3auku83efy11cgaumivxwm8i731zv5qclkgyf1pr9gfao4n807z0di6php98ju1kam2yj4sqlaffuu7stniq1t8enawyr0fb58eub79kdmu9vpllc2u2236z3l33',
                email: 'ek8ar3e6gdndyfv5snlrhjtaokdww4cgk581glaql1ywpceldqsexw5tfxzxmnr8itmnv639f4djyxoqq1t8yxpz2j0a39861gipfj1pg9kzda9ez82jje2x',
                mobile: 'b480by2rexy8k09p48lg2lddt6xqyk8ii7v8n5rti1ggbhxkvtb7mix606vs',
                area: 'rkwh4ehq2v5455pvnebgsmayxp38x9n0qy5p6uw2e3bnhvbpt45a4wtusbbxyz40k8fhqpzm0x6yljwlludckk5gsxw3xmasr9np4pglksg4c4z8q1zd70jqqwqiasq19b1vbeydrrey4pnq3lcc5k5wbmcbi0mkmpm0pqgl3o200scrz1p2w1mplvibengs2ilpejq3ugw19hxmbrqi24fvtk1dws60ii1yca1fyywybole7zotpf6oxq2ks69',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'mfhug2dbziqddfiuwowyg5gzebb4xwdfsjbox04cn1itufv6db',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: null,
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: '0qlw7rccr6xyhx92n6xhc0pnin7agx0piqv0hoptwknlj1gzva6xtn07v2462wgup8c63hnk11hkyw7drq200p5yol8tw3atxe9mj6cz1k5xziu9i1d03p0bg8qay9x3q6hdlgeoc1fag33y7pm7c1xytuv1owct76d57ms9ijj9m8eu2kotrzhkbovsij62tfjh1b0xi7etxdni79934lzks9eqeyesgks9k1tgaw4xl0ymz7baog06hqd6m44',
                name: 'nufbck3djxf4i7ktgb2dcrbez2imb53lmu9nk6f1nw7088le5z8v7dt42vvlvps49upnxiw9sks9zd3vzj49wuifkqrkp66orjdtpah6hpz2i2udzqpdqnz9p67dyrvmq5uymz3x4kvnjwzcwbupdf9aocxp6oljonjw3nzzfyzhfea7uvzit1nojzakqynu2d95sing3ozt4lu6p9nsllk4eh7wx35feyrnqaqwxlgbjlpzf1yoyvi4fzrzg4q',
                surname: 'vzr1dtnqzm0c440zpeey2y6isqqaneexk6empxv5ahko527xqkqbw4s98a3iqjw3lzv2ntmjci5pg5rbac3acf796rveu9zhr7t08urjf1crd7crqunfoz1jcmllxmkkitd6yg38ecfdkiovi5w5z529djt6jpavz12i1ygj7jryk4yy9ycdtrs7rrjho8l5ji0xapptyvo5z4yqo95d9r3bwe307pcdjkysy0h6tpw8w2edlxrckabu34f9poh',
                email: 'h5t737s45heppsbrm9trohcpz4loi4cq1fkiakemztbkppzqdrq6n6xknffaf3ql3xo4d0h2nim3lbq4w7qw9ha05ln6nha9n59ji77pibewe1o20o2w2mgq',
                mobile: 'tr7qljkkrbi30f8oftgg1xyiyoh22j4ti7v0vwki3s6acr43unvcf4kka9gh',
                area: 'azk9na1g2ysv8ddwnma71peyn0lcve603wkdllhhx47r5nk3wmdo05imjgb324rbu8q97xhi5r9c7dk14izsm927ckos3yy2zct1w7zpikampmn4bdbyttmdket6d3cxd2udzirbyai8eqqgdorzu34ra8mrcpym065ma5pgoivpw5qufob7cbjb1yo317cl83y3p8q64w8923fhgtudhaobhx9p8mpjd86h5ce33jwk2saozdx94qzhrwo9can',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'hctw45k6hxtdqnlejdx59p2xgni2uipb03t528svdnv6xsf4xc',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'ce0ptpxz6i56qp74t96d8i0kjtnsppcp7alko6udi8fxs4h0txkwl64h0zafeos0rb59eh8qdmkbdd6ue13t87h68w4v0cowzg9chfb5rh89dt6b0ginmubiasn0dz608i16l7of6jbikm7mp5ch2wr75zdz98dysvd1f3c2koavlz5njzbop0h0nbcs7r6p1exul7nf1gy9m8jxgrj3kn2gnyrv6xjd7809p8lo7vy14synw5paep2o0bkfj3c',
                name: 'swrjv86n04ogv5g04plsv9ufv305k8efv3v8s41t1ft84dn8w6c9rjxirity0msql0s1p1czqrwplpqsxtna84lm3vqz8a7hlnrlrn035oc1fy5iqwauq9wvjghh7et8f59gbmeva17jhr4cgn1om7brio50g2yaslshge8tymgrcz6ljdc58t3yp4byev44us7rycazi3ci48gd8lp1vu32oijsjnbtme1rgkamtbv8zr70kj0icb1alpszqj2',
                surname: 'x7o0kalklo101ev1z1k4rh0pzclqu2xhyu767at614gpifeimtpxjeexc4uwdux3smo26wvu3qmxipcy6zam75p73ut3hylhonqbc7j4huod0twvucdv9wswxm6plkgjglbgsj9bweoesd23tbp4flc5dje8ticf5gb908bbrqrnk0y3cwuea8iwghe0dc2etbmnq3itkxsm3xv6y9qrkkq78lso4ywzc87q9jy0wh1qbri4g4jsphzjd7exujw',
                email: 'xq8lcndgtu3f1jyse3xnqei24rmfzyvbe9ofjifp7p3fskhpuvo7qf93gjkir4suilq4ee0tgrktyglfien137gmfiym34cwyqwjam1mge8i8nkkxijojgy2',
                mobile: 'rljb3ijs22l8wpakikvmgfcu69e2q4aup600fvxr4d8tm6hietxcigiqybw1',
                area: 'g1di0ey7mth0n3joyh3l2y0pi9isqv0799ju6leww72wzyzkiwtclo63ccmopsmduondtuxeprw33bo1stpk0c69oy6qbp29ail8a6h0hscgy7ds818ph87xyta8y8lxjiygkx614p6b0odi2va4rzem4aavy1qfn1nxv9m64zb7agoo5hldiuolue3vrzi5c8rhksswy4zxdxrhottlwxbo31cez1gzf02d207gwvtt9f0jcg1dgwmymcv2xky',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'zxmeesl2kgdjyrmz0sapnb3s1j9lhjbv604z4behhw17br0uc9',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: '18jnnjimks099jwlwold',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'vteo35vkgalvg7cx3jo87cm0gwpss0b1qvs1amf4ozew8tuhvll54un23unazkyqflipsvjkwglpd46a52btu1563vlyhiyivydhw92liyh8r2x1atwaq7jun79hgq8ixaa5ezduslimbaejefpdp3orice8e7o24f1jrzyipcxu0qd93ujrjix7x7m4im5jt06i01i1d42rr1hfgov3hiyth0py7eaany1op2p5rauvn2mhrx4e89s54vpxcuk',
                name: null,
                surname: 'y242q6nru077x6iu8bvlexzavqd815zppa6oetlsp10zgk782hvbrhulntpq9zbmgkctyn4bimc4im6e7dtehoo2v3fzdwhdawl3xthuocftkctvjk35yirsuab660xk6jtmplkfl3zymyx0494lb8af3joq0h4gl07z6ae74z84s9ivtmd8gj83wiorbop164w8ngj99bc8cvyp7bm9q54sfzkpzg7deuzwstjtcjh78z6q1gfjqwuuv3fl4mr',
                email: 'q8npmx81g0w5dbs6zbq7h2fx2a8aqs6c0v9aec10u25wrm1mvd5zo0ib95inigqf35u1kbp6qusvq6blckuo5bcosxdtd2d9jgisdne4eyxhzvpe85a2hcua',
                mobile: '3o5sl0puzmz16fwjwdv3bvrbti1zwhvchlg0pep8216c169gsvk7jsihbewk',
                area: '048gc53bg55sf93cmpaji19nnkz3x1uu4ta0ep0hd55yeqi3yorcneotjygi30bzdgxvuo7j3cfv2rep8uyfh7f3arozdbyl6vivsaw2l8yick1t75a57uqabd0lby6meyj1my7pd7gkds7l56u5bwngjcwnob8v0k24wc55s9pizf3l1g175suyw412ziiasahqz6havxok0h2x95qxv4x4si4yof5gga1sruiei02xowintpd42j9wj7a827i',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'r4d4x3ldsqyu27tohxzj4oq4guvobpd3pstk1ufrr8bwke8mkl',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 'lyflh40pntu02cloqf2m',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'z4g1ilss1eo1p0krbdq65090v1z5umt7lcvwwj9qfn1smo6ol2umjkqja7e61var2g0lnyvwm860pecv51csyd49bel2kerugc5ezesphdaii784zn69k4y05rflc1o82mbx6qe6jjqff7yhrgs9yv3djtsht44pso5iek21snvd2210dlybl6q8b32k43gix0c6913swnzklpkk9snlef6y45m23yv4btp3giky8y17tev18klx8bf0rwdy6dk',
                
                surname: '5ied2xib1ql2q1nt6jxmfwzh65rw5iunpp429i3vxfqiet7o887e8aynrkjmcbjizz5u5ypszeo3uusazj9ap8k7han4okh7a6j6y86zd4uzd2hh277dprkn4esr97ze4fe6wrve3p0qolvw6hjkt0005ko4vugdj12p7rx1uonn4yvdgbywmgvat64kwpn7ycdr5l9yid0gp7znitimmta5v8ipin6ffuvtr7mprkr84706hggzuruiuaiimb5',
                email: '65q5nmf2c0gkclamqea8xw63e9r3woex0w1joxyenjxnidpuzraoqv6heobrxk3yg8lkofszj9mxqls9ogo6sut6lro3hidvq39tack79awn3teg0ilrf7cn',
                mobile: 'x201zzy9ya971g5qr06n0z8q6owpkwy6q84139nagm5ddqjll8nvtaggotoz',
                area: 'bkij4epnjvnf8mjcsiil9bv5j39xmw93c545g9i1pxbepu48746pag3nqyx19tmqepbrwaknm0tfzssfbbki7obxxu3fk0e5w7r79ievejgzprdvgosjini4ibyqv5z1a11o3o655uuwb9tjw2806i9v6lfixmup1wjavfer8hdolfrttkx1aznl6tjfjl0osuw9tfhd7l871wmtk2ez4juz6677o5fks40vktiw99zdxgf1zarfxuqkdh4ls4s',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'dwy2tpm68278l0r8aibihotif1o9bmzb1pfs0xx7ca780cvb6q',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 'og4d4ryvbdk0t0jtzmc1',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'eiytrhyg5fpqg6m9h9pt7lpg82h9cfbitnv6iarly3my7qgurh7etby85ztakm2spseo9tnyipijkn3l3p3262nh2lwjm0u7w4kcynt4ulqkoh1c0rf3d1qp7e8zo15ynvya9dqgjs5fqs7ge1k9iptch3tfn1f3jofwvjeh7fb4ib0me9wf3oqh88s0f522b980sg62nd0z9awousuc4t88ah1b00xo27aga2bn6fjjw2ufa56of5tov9wdap7',
                name: 'atka3ch595l9s4k8xue7sny0hfknmcexua8sk5re74r3mqjnp7eflki83hzk2g1ms0shubqxv8bb7jewgcaxn3hlcqcx0dg6xu1pf7ef731smys5snbhhd3175l6uyskjr1aty5y9baqvg1bq4er690vxehq5wvou39hj2y8wiqy5wcs7uhcb81slugaeo8z438yk799pxw96apho0a9ukjxshlkj9p4z8ybfil7o1w4i9gwj8tc17cypo8jzfs',
                surname: 'noi6cqsvfaivu369be4j6awlu0ue5bxm7d5hzrbjs6y6z6mcfsf042f9n162webqx906z15r5q73f270bcqjlxd5xc5pchkn1olpy1vqyzs9sray7xf4opvn9yygkj8ku263q2cl7g9yueczqabosi4dri0l8eorr3qmejlvcc6mur6aeaikjq6mvydymxskxrdhrgq0eqckimuxvx31h6tdn6yzqyprn6z99q43f1vw5uwim04gg0txcxrw7tj',
                email: null,
                mobile: 'iavqj0lxbpxqpx2s3hblxc2uhs94gyx4whkq1vzjvf8bqn5ipi23wu0h81v7',
                area: 'qqbhzulvy6u8plsxwdhz8gzykur17t0ih77aq21ozua20ubrscsiafyjpgxthdh0qg5x8eohqefvu1dvabg0utwikcaj9lj6f29bugbn0w1w2nocamanwjkka3cnz3za9r6qrk51jr17cvrb35hyt8q3e4nn6i4odkcpg7b4i1bvypf07p9knlbmfv10c0va6e0ld8vdjwiikicc9tfp7urfkm75yukthd8mshoa8u5dw6ou6b0zpvrw4attz4n',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'n5chrsauaibny2rqrdpzc593899fko9yo0y93weg7wdssm9maw',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 'tebd0qfuie99xup1j2rp',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: '96vd2hoe57vvknsrwd34j89v4vm3wvag839ho5lrfbznginfq6jvnqz9jshiqxy3x7erod7er0jjdvinfchif6wac2zid1m7qr5uttw53aab1p0q1m04mx9px6saf52x04tblu6f9yqis7shrixp56w7c6np9lgofrp539f2tutp794pssm74kn03evn9wpmt7uaeupn3kqkgiyouzp4j5zrjcicrp5uq2nvbzfl0vpucidtpfoq0ucjnoujbb6',
                name: '88qkb9f2ds0m2y9kr65p8bs9kmy0fr85fhn3us82a4z5kr6sk41r51kha1v33aodq2naaqykvye9xyk18tk5iz7cwkt5n3gbf2qcd8bvvpn548ml0jicac1wrtneos54qb5ogqvh3vtrc9473n3vuzkrp7g6oong51rs3fp6174hs65g8wl5ev896762fazyph4zw5k0l6pg705he9gkqtf00jo84vwzajpp9ykrldp3yfjn1hd4a9hii8zmezv',
                surname: 'ho9uzpmutuod4flascrl2dee4koksuzhg4enhlndm8rnew3n7x7696sk8nu94r5liobwkx1ntvmblg8b401u9fkk2oilrf4www0j5nu0rjmw8ijwsidbz1waox5rf9surk58ix30r3a9p04b4csw2owvdh7ll80yvbbpzvfhpa899agcxbm01hf5av1vtosjx4h3ac1lyxb6prpk5e6bd3qq754y9ap2wfdpun0a1dxo9ubc7lbcmq9q0qiajxx',
                
                mobile: '5ulwyjqofj2mttoz4qz2jhz11ocyq7ersu03c5xwwojwajqumz2duy6uhv74',
                area: 'xqmhbqqq3vg8pouvp84qtb3zzdhkuc55jenn6h9n2qp206yr612glf063qqnqt4us23iso1kvp6alzivxtw4vc3cciuoa51kd8ooya2l1ccqo7ddkkjhpq3pgp6w2do0dqd1cdeq4rfnzxi3huf4u2q2cq1n3cwyqv9gt191qzvvsgynhkoa0hb8d7d2kd5wofjo2y4c926tkgrgxo1g16e7brzt2ai26oglrvf6osv2sxylduq0j1vi7l879cp',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: '45dm24o6uf26113c0egy5am8ykv84wt68ww2u2fj15ihj9hzpw',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 'mumz8ch4vx7h7wiy0309',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'mg53k242jm09xxfhc72146tpwit5ihcadoswx7b8yekl168p1udz33nc8gys85m58zal1ax4x6s7mj6h76b0u4piv9dtnn0cmy1d7nzt8pmnxppo69730b9mfk9ykwafim1h5xx5fd5l048jnqcnmh0epy6yk0u2i2nyja43z1ztnh5ojaj6ac1dut5dpxao79h0s9n3vlc181kbytrybiy1brsr5qh0pkoxktui7bdkfvl0xzwrfdllg5mfgkq',
                name: 'dfwmbkyo69pxsw844cdh6018v0gqqdlrxsape9v7b6whfwis0kdledefldgr8uipne732ts0ewt0icu754tfiqd4eudrxm2d822g3rg5plxh3i9uvzxky9phut80veyoqfnhn1qf36g9k6vhpnka0ywim06l4di6j9oi9aqjbgdplh0nq1i7pnindankqb5rhdgva1ahwanyits7y9mnc4u0o9dgmyt0p14u4z21kvh3tbzgppl8g2u0ef0mmdu',
                surname: 'yjxwp22ke9olalwkook7pd6pued9wtdmxp5l8e7114727193mqvjzdh167218ffoavjcxwn01g6y21uo3bkgrn0ng5yzw8kmwxv7kuqmf8hjctdwrag5gs6m5xkan1wurcmj6ri46kv6y0pjeuxr0mq121hmpepelumv4cazlm1359ot8pt8ar4fg95uenh5kw4vnwedkrc1s02gufwvwump12jv5pf4tyhzdyei8k0kpcbt0ic2mne991xfug8',
                email: 'mkfbx0ioq4b47oi9pws97k4o5lu2vuj369mdutv90hmth12bgpicdcaibwvt5aejwtsls4l3jwnyp4h73l0e922yr2wor8qdkf55casd6gw79fr5qjm5hvf6',
                mobile: 'tevu3wo5quop9hsyplranehr53h8389bamwkjxh2800s3jvf17pvo9vkpiry',
                area: 'stg5sqc1ycd3iqcmg0nrdd2xvjkm469f9ud3t03f8g1b3794al2iefqolmj9n1fcau15s8y0qtv65pfni62gaqbu79966furgmsq1tzwx99hob8zbio5agcrett5f3e8sndowhluhuj215qtryfdif14ip91lxcsg0159sjflsp1dz8oldx4bz88xicv8v0jutlkq6ggp1dsw9x32ivnlf75vrut6zghq8t8ogpwdejex9h4eaeblgn7myvhxpy',
                hasConsentEmail: null,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'l2q6or7cka250aijbevwnezx5216268dkxwezc8vv3x8nfioan',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 'ivzk65pigjns1806yq8e',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'etd7xonauyo3wy185na4178sw782v15pineayfgar9xl56lbfyprkhjlk5k2efyjjzcl802fks7li7qmeuqd9k03hhfxwmzbon6lrmt4yoz8so9gu4kje1vi0ujmnnd2js8wi4n4ck11zbu2un41a7u3034arpdrgtcp9jt53un0yeky3a8ald6oo271d2i141ha69v3110ehvhhu3366jf1zcng16m8z2l6hci3lc308onrlbzmskdv5lbp3w8',
                name: 'epyz4fqw4jon2fjq6sp79xfasdsnpw1xdqef0x9kqyijgffrylg609ydgvwadn4v1ub5ewgjvexh67iccs3gzhwrmsgvwheoacus2be2yw1pw2t5htcsmkgypqxwxwfd5wa9si1gngqp819wpc53zyc01ako1dr8c29v30zectyeh7vn2pdju9yclu9be8cuht9aarrtap17r3rstpe3606fi8h1w47o999e0mnkwgkl5fawjex33hrit4p485l',
                surname: 'jbplk7z2yksezkqmujan6kwwvw1reowym8a0j1b5yp7wu89y6qm51brj88m7lvzzlpzqjdzz7f8sdwezbsk0lei3a2vwrs0esw61m278wmn3xsc35830ytldm43n9tref1t0rojule4nmuhxgnkyu0eqv6n5obhdndjzhghoth989dfi9m2vo5iugsp33az5wvuf22xwgvw1upfymto0y6c9tfu7km4m5u97s89tunes6u4skpouvkfeva6eq2s',
                email: '9x85y3ekxtwapq2udnxsecly882b3zarcljpueh3abdcfdhfbi2zyxti8yvjyfc50r31g8wqxgw67yhcnitj8mcw4n7r30wuepx61uftgbiuvf5wo608yykw',
                mobile: 'ksm24fdsejjjgtcjaj63huw44z506qanolnfv7w73ypn7dd7mwmxqdje18f7',
                area: 'si3lu2lt5wssg75p6vfyc2sprpjt9bila3vwe142rrb0scvg0pdcuxih775oiipmfqzece6quvp7zkdwiy6lzzm6z3twt9ixafduk76z4828onmf8ai24cu1lp30d3zh4m325shp2sygcsc424axap74j91w3mkpizgwgualfmvo6a9xp2pdkced1sti7wdwaoi5di9ldvdoujxoerdv7hjqazktciripjvjxtzpls3phn67subptp8rdz9aaip',
                
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'hwrq09oedbvefwilkwumo3wogcncr6yjn43o68z5re5mxejgl2',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: '5czd7sm4xcn76o71ltz8',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: '7jv9hvy1cbx9a14zdw9f8uw2slja8bi69tlsoyqbf2dg5a3ld4z69g19jav24b75mwrnnvqsq0yitjy14wkrcgkrpi1tkevakp9vriz9xyb3s304tkzfshaftqzumpaf69vbgid6yvi5wgkr3zhct0cq6480gp1judzrs4763duthpwef5ol933pbqezy042r07jyc7vrbfkvysn39nfmohv08a8cm34p0g9ii8yra2jq0g8y5s4n938qjhl8d7',
                name: '9nddqsv5oug1j71lveg5my32o3zdrx1scp04uru61k87j7papdlnhrj1r3rd2hhr2dk2baxms6xuva1ihu2nw8swjdvt9ao23uys11n54f05ls0hsp19qec14ssrgvue99jl6ts083018670cn8o8o0wg9oqelplquddm32wlt4b45763fmajzhifg8mgusndmjcn26f7gmnlr5fz78ywqx3qu7bkoc0trzse2yuvp7x947uc7eypev24okc8nh',
                surname: 'hh51kh6eqddav2glpthh63sxhkforcct7gan2gcnvd4ql20bpnk52jihb74lwy9oteaopk1egoc2q2mf5cuaf7b5l3tmtg7lws19tw0rqisfeaq0zk3wm2qbh0d6bk5nwtttyyikrbkqjnh2fn92wt2hvpiu4qtugan73fg98359q33t4ort2tgyfix37hydji6z25fq87kzcjv1ma0gsqo9k9zlrmakzlwxwik5p283odf8nau7fvi106h1br9',
                email: 'u18dh1n71oolma46qibv5hzm2yymuais2zzhpqh8j6p9jyeez0njhrli2cl9ho5wux4wl0n5cfozmpty68hmak8s1lm94bzzsa9m1f6eei6pxkp94rg9sze1',
                mobile: 'drukrqw9muzsxykxkw25qcrhrj3w283irl22cyvyfy9d9lgtgt72a56s8y39',
                area: 'pht5d43vfx3tz3s2f755urq626b0smn6k3ctfjaw9ujv2mp3gk39bz2qvnvpcxsmw2le1svhu5hzfcsi5dnxmghkmah6wxpnqtzaascyxkqnenj4hkjg5uknnvs6ntlwtpdraulfwij9ubrfmiss39kc5qgoxlb9gzi3rdni1czp29wieut9nd0ve0zfomeic04fqg2f8a50ofzjpr2mzj88g9gdve6nnu1jcrcnw6jz8xjuig88scv6rp8qk3e',
                hasConsentEmail: false,
                hasConsentMobile: null,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'z8pcn8xrs8wlgae42wpukn7uu8rrmcvyi94pogmw00m7blxjwb',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: '89babzutb41wbaiiqbn3',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'as78g86dnlqbkox2qv0f1xlbafp78pcdrigozj8z8eyw8ma13xkr2t1dlsb5win4wci1od2m7nm8xihh5r1wrozfxa4zht0dw1wsmtl4ojs9s3drwwevu4xxquguuhecckr3l5f8wjst9l5mh6rsxj8cqetmj8barys906o2xqpjs25broom7wcgn5vt35bt5sgbpbltxs8gax2gwj53npubbsf0b55zxazmoii2mqdgieb31akf05o5qf5xhl0',
                name: 'hh6qobtjrfzkjaomfyt1n440p903c6mtcj31gqe0w5gtsdk7oyfk9artbegu2inuc33e276nyi15bcivhknxk2xej5hxj0iqlaj71gvzzabdq8oz8gah1ihlahe0klnmkejbp7wzxjjnwonw43mvlvx30gc2cecndp9ywlaqh09i8j5cmvsxp6prhr97ba9fammtsitvf1fx6ao3kv27687vrvkki3h78gwjsgk7jdstbgxgcse2hplgh3wq03d',
                surname: 'krpvlk2f3hcnrxb2y4b3lf0ps81r0y109b79xzsl06lo5brpq8hfc67a6cvzp7vi627q821l937gdrzs86c6g35leomhs4f3dc9ajrhwxz75359mxgdpd6x9ubqilo976wshdcs60xfc7a521av5uc3rfy1r6hr76bmdxjedfkjx9nd1dj17kh65sy7j4pszeco8yozn8njbrzeuo1gd81cj3fs434gm7gjk2u5607dj3ihny3gifyqc8an0zkp',
                email: 'xpah9rk26u36pwadajh34e54es6x13rry9xnyeyzp0m3dzbutf2zh4oxyr4x9j1ksldmq7ftl8v68a9ukeewom7i89tu5h5qysb12rxknn1ix1bzutb7603y',
                mobile: 'lwevkqcnsdx092oo0t2iiqc9j2oanwttynm5dpmovv9c1i4tc80kplhyyvhq',
                area: 'gbrrcaomrohqtpfab4gyd5zgaapsj0u8709cekx8qtsdknj252vf8om1vn840jfojy7sezakx9b20wv4wgja20se6ay7modkgsc0tekjtmn3ub4cqa822xs6v9t70nntv4hyqgwpz7h1vstm0b0tamhwl3v4omg62ev9da9jj4t77vjbwgxcw367day5v0qu5cndj70txrtg2wia558ptzta77biu0yy057okibt020d5kprje1exi17bjd5bmo',
                hasConsentEmail: true,
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'cza5qjwg67icsi465caw2zl1m8kn32442p2zgh3wkjgpngbgha',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: '16qlpm2o7nskoga4z0p6',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: '0mnmk5usknw2v3h1rgozcl3f1oauzmri27a4lne2xxx9qbg901jylwg11pwvae53ni4saqmsw2zmdabrdbziej0ylnw3ispvg1rs8w1s45sntlao6o8fptw2ibvlo35nge2gu17u8ptno56rtwby48u1d4ox4snjdee5zcueswpbbdo9tn4plgrwxeqs2lxmvapw0hm2fjpexjpmznsynkn45v5oevb3sclzyaxusauzofeklsm2pg121nfnajv',
                name: 't7ifvqxj1hv89bp30ucxid8xdagus74001waelclgonwz1uw13dsgayjuldi7yh4x313bthznm3ieyspl42lpqkg4rmeh60tmscpui2k59pu349b3zh3pque59o63wk60snwuaiq53y2q6r6fe3kbyuo2uvpyj2rgd9aaw1y3chd52he0hcudogqtgczu73tbgyckrxtu7ya9pl6aqb6h9kuppl6ezfk88prjtdsqbk7jok3xa5o98mvube1lzl',
                surname: '184mdl7d0hjrho6ymk95kfsm7gpy0lehi4n77ovkuaap1jg8rrb229usf3k720rpuddwddgconq4ohwdpkw0rtr1i26tp9q2y9umf9iye9btou875ld1l4uue2vhuhk6bumxkf7nam0gmluzgm7j7t62f8sidsy14716sjaq1k36gh9smx9dba9owwhikg61mejnzrrswotv9qrxhsx5ipgg7ff4mzqnwi19885knsx8cp78a15fv8b77mft9cy',
                email: '2f3pgkpb1q2gl17aqmes8llnwxq021diu6wkx8ox76750yajhdxeepzehf8fwuzm9fhigy9shfz6evz0jufi0khw019yebbxdd69bpct2q29o3eq9x32ebu8',
                mobile: 'nqoeavp109cb85pecfz3v24a68gotnbkmvqv72h8kfm71zemicnhvhllo60d',
                area: 'hj1aqsihd1qoopr5ulng22kubplhhficc8a7vwqzm5qobzi2p93cyeeobwlx5rrbxi4x7qqkwan9p4x7l46esdyxk7l1ejb59sc01j5k5z5doenzards6y5flwjb27a64aod88drh3v9c9h8o4yi3do0a7xk64i0og2d5chls2s90tvnutvbocpjeb1i958e1un8vy1m64alifr4ndr8sdja8a7py7hznebyyfqxd474k831104uyp6qteihdx3',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'jbg0sjblxqct7uvm8z05jcg0qqnkdmu4zgdjomufuw7bmfrczb',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: '2xn3btab593um4ghropr',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'z7e7e35nbxzm9v5032izl1mbty8l4kdu1tpi6z5e9ru1wencmhs9hkecs14d4hbx6biraiuioy750dz5sj0lxk43b3ev70p3zfg31lz6qk55jm3f3qvvs5ofj732h2hj49njc3w822gwh0u4xv4vu2dwxyqp43oa4nvy2e2g8t7qms4g7bcox0reosmiqruhudzftdwvsu637nq0lp94c1jxk18krzkb6c53t4v0fim2lafg7bmv9hcg0m19qeo',
                name: 'z07jbqct6pljahiwgksizdui6574vr3yph0nly5dhv5wnzct27f1x7p79uaskud8r10x04kxnb1yj7mh7bmj0zbs7i181muwtrb575twec5hfh9yz5zokftn8voccswplo41k5rynjmowzikai3qhsx29is7rafaw8rs1jlzwyqhfnp21g9yqmf8xgc9ttuanwxcy0ql9uidp5dd2oa8dkc11nxyiw4xdurzlur7252vb3uvdfm4ltyesw9gmx3',
                surname: 'ooc820dn7ibnxi6t1dj6o9sedb1z1yrep18546pgg90hwvcqy0tenm9hnxd3rl9qafi5jhu9tx03zc8aa2h6gbqlsymxvbw84qgi8vf122h07gdelq7j28rkcovkpdzlgg5mglvy4wus5j92l1w0ox7rslo1olklq5t1eskb3hbcbtp56snlff3cj1n67zunmls0prn0r0j3djb0rp4j4niemk01oeq0pv5cvncowvsb704aoiglw2m89sadtle',
                email: 'x2u8ljdbvqrzipepnq9cs71f8246l6akx8glg6vnnrrxs14n4z5nezz4utsdu4ockxntf96o87z50cewzla24sumho20t6tv1mu5a7wp3qw1suzb8hykdfds',
                mobile: 'aiz3vszrrh2wm859i2ysn7t7poizyqiwdc5ka5uo8r57sgljd4zy165w0fsx',
                area: '4tk1lnzk1ef3k359pg80u4cft9aq6vwkky9dqj2pwmoxysenq1han6p7eg4wf0446hj36iykpdl0e2ilq3knolg04325bgyo2w2eyl7rx0zjzrllm6hqt9s8qtv352ndibouarat25d3zffqr1pzu9z4yuyci4d0txndy4xvetp4m3bmk633yj4v4o9pkjnlpc7v6680f63lcovql8a7jvlz5juj9c0mxzjprk6zd947qbg6zj1cr8msyr9ehf0',
                hasConsentEmail: true,
                hasConsentMobile: true,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '4fnorex2lmkwrjxqo3643hk226j0plqx0f90k',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'eshwemncplktbjdabvh74kggkgphvkfkwl6bmjfxjvxjytgw8g',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 's3lcf1f686s3xf0gcttj',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'k8d59vcklxg2u5nfiseiwa39g7o1ip8u31lc5m4fz943pvcfkb2bsnbvfs8ov3uwgmm3sfayg4phzixrgptrete23wl5dyyli05er0qvgn7xq7b10jaae5uztayo4qa6jlsgyx4yrorjbeqwlsdtymddyb1ex5j69o9cgu2dxlughbj7qd3acztdkbbzsoyiubu73kzlizuvn2m0xmxgilou92xj7s88396qqndv893l8lb6kfmdvts83b5hxll',
                name: '31ysjs1acc7h8gjrhsm8rguiyjan2dg0gscq1ohf59561gwjr0dom0nea9gw6xusnjdr1vbwhfwn37tmrbl5v0pr56wdxa1fzoimbjxo7x4fmemfnebs6fpsafjkoh4nf28r8eci58e5sn8jcrvgh1vuyvwwb28r8o6m52npo5glwl3518fckpcw8k7zxtdd97a9mivgwyjb3qbqx7o7p40mypl20z27piygl64t90u7uzn34g31vcqrs6k7zp9',
                surname: 'v487t66shfajngshfuz5s5v4ks8f5453eaw74xic3pp6hfx9ki7pyufxj7n88iwfd22dkshlt2audc9fztujpie1e575nuoyexh8jlq4vuiw262v5nehh4kc2ycz8k99ar9vun5try5y8euzxv0wo8drt3wj7t9ywk3qh7orq63lq90ntn8y8en3vfi539lved5af18gj7laeq1nb6f8r4qo1930aoj8hv8kynzb3hny1z6z3vr8p0n60v29v19',
                email: 'm4rymxgaphfed04kzbgq0tzc8qfoihmufa3pk3n7p0ddxiua5m51hka8aw7b4it02l3r4sl1decbrnwzo3fb285tzds78xrl4ph5gmurxq4fk7ndrtax5w3q',
                mobile: '36yevzofex57kgeaaaqd9w9atc8dlwxjlh5ldzcsrvtyjbz6r9ttiicfbt4r',
                area: 'aib4kzfn21yihd09he421hroge3j8otieu87hrfit43r4gz210usovltrjk0puqxfh7tu05ce7vxclqjzuoq80nrghlk2gwo7099405pu3eqvdll31jppikbw77150kt3f0svuenzx63x5hnig4xc728wdbf426wikm9rmtn5ionbl0e1pywpu11r6el1vhzfsgohcnzpq8kykelvkk2ystc5bgrohcyu7ppldhvu6yj0evy14rnwus8dqp75gp',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: 'u22cdegiggmq2ocqu190tnjjwb75tbvdgf43w',
                tenantCode: '3cuj2z440pwp7e4fq86j83at6yor5pwbjqykyis5t7d7gic251',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: '6vo2s8jgczxgq82ieaqj',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'd9hmgp3zaczqtkzy99w5v7sppjz7aiwihzt4boewpo1l5i9fqwedn0cbgnfcfc77if360k4nm7jvpcsuxatqhb9txjsnlq7kjbx5m2ps9ur8sq2ysxxdf6j1iohxbm74su29gt3c596hk9p3jbhn8pyxul0bg5r9zfb3xyf98qm8fx8ajssrd0w09udn0ons88djvvc1io4zyirhbz9uivwhffzvb2sj9rdcqswoshdqe4upox3nh5q7znwqskg',
                name: 'i563wn3cwqlxz3uka56q4bwd8z4k8ow0ttqzeoc9zoy1nunp6v5tt7kttzl23mvgxu0gurcdb38fk5twqzeo7mffi7f4y9pwwic4pirf4a0b77u19kz1outfebuiht846setzpu2mv7w2dqnq4jeaj0m3y5naomlr3w87jj52oawtormbqwptqu2aco11d806k3n4a6ffu7qjo42yg85tbyacov5rhg7eo83vgrxmaxatipu9754ttky4y39x9x',
                surname: '51iuldao12k2bl7op7qyyv2zta83iyulu6ha8q0kkl7syaaiuijt96es2h3jnrdbp71otpiur7ro3gtruaxox4kt99usdidpx358bj0g2nilsfd5l8kxqikzdt6oh0ifsk103h869ylsx353ij0s4z968irwwbxhcu9yrk70cyzpnzgdm007ibe4roog5lysiku59xc8yktjtzbwzyr0fs1k3ov73jjaa5wdhl3x6d7pazpo6hx4j37vffedjxg',
                email: 'vsr38mq89ncqhkhz82gzwmopvqv27yogwao05tiih20x9t557v9ws1ywqvap0x9b2jg85ncb6e7e0d70z3mf3dywuuule41v79hfg03jh7emvptn7ovxd1tt',
                mobile: 'iy4syhx8vznfpot0q1wq5akzdzz3g8sx2rjx8gwieaelgt4s63affmjd4o0h',
                area: '1tonfhvznj5no3ezkd71u3uke2a8wwl9max9o05elcsv6qfw1100xaometqp02hteggdxyuwr6k3obcsm7sx6hh9a2i2nxpgwpu8ch2g919b0ln01ntzx0bcpp0bxss3etpsnf6rshbgy9vpi8d02mgpe38qa7jrtfd7ink7s8v14h9r78pnne5uymhyxtmbk79qf1cizr9f4v9eavw7crk367b33iu8up7ycc1ic24bxpm66rzfi1w07vek3tj',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: '93kx0r9qexs1ajz6sfo72rpj5lodrvf9ay9qalxhwvvvifcze7',
                systemId: '9nxar7itucshxn7lystg0v4bnc9hlgzuqxj27',
                systemName: 'n6oc1qowd73nph8cksa3',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'ok8o7f68qhr41f1n59y6dbzjquo2hn8ksbvvw6umdasti603pf3r32jq14on10mwt8axb6qalv3j4psyrmdub0xge0t11lwqjylkrk62mguc9wpf3l1ied78gj1jey61lpbnfxwcic655vdqgzdl0pjgsxploe7m6ocp0n7e35pn5zjjf16wxdnu05m8xkxhzz0mi0j4hacz04a268az2064dq1e0rb12xtz61lhl8tnsrqdj6whe907isah472',
                name: 'b0fji1kf8p7ykllb4wu7397o8n2k06e67jvizo33d6k0dns10x2ozf2o0hkwvrg15accs8dgm38b3toc69xmyaiefvd144avltbnperys4gzelx6zcum2e19relbozf8kpbocrxt9ubinmoly8okv5rlnd4hxd5sq77pnsdwnct42mltne2zcha16hp9dgv9d17mbwdsbtpfp8mi8g0c2nuu1e0f1wn8no396oeqyahb1nay12h58jbnjy4ln28',
                surname: 'z666kr76q6mhijg3snae3tw5w5vsyt9anxoyk1oh7htfskmei4ncuykrhvo1dacht9tzha05ijijmuskwz7vmsyhp2h7rzi7dybhd1d712zjoooc3tbkubmzyfekfxs2nrc5ujmusyurww7z28phcfb8v3x0fbj460acc6al2nb05uu98eviv1m9refxu3ot7qbxwqns8avb9g01l8nc0004qj5k7cr7eo320ydgg4km4cy0qihh0w58lmjx8sw',
                email: '7ezbwe53dp2u293jdrt2as9yhtkyjdoccvzpvkhr6pcdr5bgwshe499n9d6q31ekzk3f0pj61mz3f8xi2r2xay1qyb9xz97uw80fqoatylxat1yocos1zdk7',
                mobile: '4s5pvtu4w8rbj4kqt2skqxiiy7ltpq2ba842af3gaft5ruzbu4smsrsr007f',
                area: 'egmxbh7o8hv6cuchb115cgorns508onkutt4memibv2wovmfw4kzlylfb6e08xqf99vwpmrxdu71z5z1z2ke8548pa7qw2drd6qld7r42igax4pw7um3pq9n0a7till3sfw8u34ts5b0kzltzfwerob459k9zn50sx09r63mrr086u0zj4cuwoogz7i9d5012z6zu2kcx8quffhv8r4ahaovjl2z4m65xtkrcz6qpahv23jn5ujs0k48x7rzl77',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: '0lh0u7ghx0tumu5nejwikj5a2j5i69v64wb4nmdbsit1hj2c7b',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 'ewwhxwaajqq9sxzjo3i6',
                roleId: '40cck0qs7h9guhwdjqeusbrf12umsriefyzkb',
                roleName: 'v1ikallnq7v2ep6dm3daelyo09osdvllvbku7txawahal9zcohc3t3w057ncstv9jmpqi6szjv37ygcv2877pgfhjlbnnhthlmbahjngxu65k9a2qa381461ey3jjwq8p2f3rjl1hp1whvfx309vygbx09afyjwyl43s8f2ahp18nc0uusbju3gpdmg4z5hzz1f4jsv801zengsi0xwmwpjb3z4is7jws5r0ye9w3d2wlnaa5bxgd774gyxjq2e',
                name: 'wozs0w383rtu7clcry9c76tui8wop4h7z77kr34nkdos2m5zxl2235g5ulwjc7i4x3js9mhulmvuwehzqg5a73pxfzxwmh66fgqibw9an7ba3dx6xpok9t1ymvmh5c7n6yfxos2mgwtky3m6hdvougc2e4w75c0omio68jjh7trnswlysjt7p06togaui1313n34cpckeh8nganftojy2ks6d6lle33zqietj2cuefeo35cgkcf98n1zt0shze6',
                surname: 'wlh9dfgm1spqm8oyfpjdpmpzymxqsjye9lp86d9zgjwlv2nbyb4nif6v02rr574iqjvadb2kjmk3xr6ep7ga58tgq65uxjp0u1cr7kdcgklta1bjbdttardhy0a324qjxitfuso4bocp1spaieh99ucuo7zysruzl1g7y8p9upvo8u1070zvp7wn2wk1515p33cp527cme3wane6fl1tmvetis5vcsggyt221lkehnnsar16q0cwerzo3njf4cp',
                email: 'lzaiotyzz1j7oms7qbcra5inixxc5tf15cu4di2z6aoldn0816xy7ec9coeyqja1sqojdjgu03mlif7gx46sjuglqzmc1msmf3qqao2pcmqdya4e1ll2vbfa',
                mobile: '8abxnyukm4hfo8ywtdfxf5sl9358176krusb92cierd7xpbioejjlc04uo8i',
                area: '6nyxaavrekwl7vpsdgep1k0ilqmlboxwzspiobf2ldoxa108pjoplvz1ozz58tk9b04o2hz3y7sjzx2nl4c1sic3ft7v810g5z8xzmknxjo3xqzn6b02nuqfom34mravasicf2xs7vk067a7smca64a4j83oyr2se5poo2pvy9mdvurp1v88czd1bdhcbl28i4smz6c2ckqt0hfomfbznqspekdgwgiv30sgrm083q9ua89kc98wnzsr7iwz848',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'gov93cq1m9qyz4wreqt9du6my742jzfja6kig1q5qibipsjw25f',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 'ljhoa7ib6z27q0si4q5k',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'dc306ahke6l8wc753oya3njh299imqvn6k5fl6bb0mtratuw82dqsws6sp03jciy3g5v6ylcxkgfediwnibuii8vq8v4vbs5wvs7fo3trujk3tsfke79i1mk8gsni1oq3ggp0x6250bp4bobh6gcxcicc1mtzwh0fu17z36k18ey04f9pn4u3ghw7731n84d22opnqfr39jajs9e2paa04srqq2gtbup2ee3lo8164v7j01ohl1430dgsvk26h8',
                name: '3uqnp4dqgabb3et7o1w154inkepvaehnxh9hfbnp4chzrroqkgpvaabz6194u9s5co3htxjpwhmj820utdkfsxuro889qa9ymwcnqe82cziib64ldl3l37hccir86oh94el2xmhjfcj6jrrec1b9to1jcuwb8rcuk063qmvo3xd7qooa8y1ciztv456fh323ti9jj9no72h8c5s4wqx78btgdgzv90h2i613yz72an1gt5ln4u20n2ws87jfy4c',
                surname: 'jhjc1ogwrq7yik3mjdndmegbtclb4stdajht1yt81trc7g0qa851m2pp4auyt5m59ou6gkoa6dadanjfsyf3dslczy7q37zriyjfy3pt601kdjh4s2u926cmk1jfemymyxjch98x1tueizkbeysoc3mn8fyzt1k9um03wtqr26zv04vx4alquudgzz6sr3zhrr67da4n368s28w853e785k1vmrnhe8jroxbwat7hm4ujp3jbghdbzzd723lm79',
                email: 's37cwvlmjfukt3d7k30s2gzvcjysvqj0bg0b12zcjsxakyikx12tov34f2rsxv96msmypodm7wy1xqdmpx7b0p65yainpqy7jx80uv36w5zo5u49ql6yhgg6',
                mobile: 'qia7l8bl4kst14kybhpuppi5g7bupu9hwtqsmxib62x9nne9db9wtjbg13vy',
                area: 'ibbky0vcta0kys4m8n5skot9coytu1c9wbzlg23c6aifygp9s215nouvqqd6sjup96171qm31qdqacut5hjqmob7ck153lqhzwh4lefpnhhe1fl1r7d6hvk9r5mou5fg8rgjv0a2x8iv89e2i14l3df1a37od69wpjbfblb42imgxs3jxspkh2pa74n9bpml3ylblyhwydvcpcq1b2fro5zk0d7icz0pr1lec6szddccd7kjl431ze0q2ixcddb',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'vcwoddk7u670czjm9bu55z6dk82yzu7gvm5dcgaaqpmixlviz1',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 'v31gqr5nofvmredd2qix8',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'cb57m7djze1jk76li6gm3585w0o141ewdpqb0qpsfm8lr7xc73svnn1kfyagbi17d3lsa60kij3to849bbeqxd6hknaxkzflbftnw1jy7zd846g2k1enq602461g6btnb6gcjrdeifb0fnqipordtfmboxrn6v05c4t7uwwg4m3y9sj1surypmdix3w9fd74j5vfd2s8msp8260tc18w4wbfqv07sg52webu8fcd073mgyhz01kgk1uvo28xlwm',
                name: 'g7pns8s146tzqs370jvg2hvra38hslbu5cc9uy93vxgs4l2mklw187687wa3e5485vqoyhpuhhb8gx763lzf1eknleoou8lvqtg4d5s8i3lroxook1etep7na4dx8xmyp01wm0ht72p8e4g1phcmgn47oblo0kfeln2zdrtx45bb8ohl2h6cbztnokxk0efsdyypvn9554llva7dmr2owfuy3l5iy3unclrwpo0r1e6f722cbe6bo11k2a1kirk',
                surname: '0tsudaqhb9uqujrgqs9v8eoizg56lh9mpx4ju56g1buvkkmqrjdr6rkibx0ixfsiinscue0w2nad1tm2p7422992fv8vjw3v9m9rprxn46bif8e0sf7o1kblt4rfvrvg9w1k1laargj2p8jq5ekh7739we5fbq2p63i4mratfg6rbchti1u1i0ag8j0sxy1i9eugei61o731luyllwsfe8zar0zkjx85bfu182k0o0g854wultkznc2snek6ywn',
                email: 's9esbafpkaxfxeyacpxn7izmyv3sctt7y5stfgvo60bhjuub1t8tz0ws7xqtur3a0xyqcn0gezakxtnj9gkm9zn01ey28gzizlsm2ov0bnsng7h560wnazat',
                mobile: 'zrpjgdut5ngku39hb4r7wr2feh8bn8tscnmeer8t2e2wk3o3rhj566kffsny',
                area: 'r3k2kachim29kvvy66hyr9ev118cplmkrtk7ovz0zkli6sfyhyml8jelf8n6wehj60g1bq90qiv0cph0is2gnw94onsyxpda2vjb5s4fmzet7nhyxhtbd9udfcpben2a7rzv2q6ofp7ennu9ufa0rbwjqa4yjay5cqpz6jdyphpaqt41ez496vcuzzu3plao2ypck36viaqb62px085v5qp0dzaq065rv5zyeztsxshjyycir2q0iu8dtyhn8qd',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: '5ztq6kv90nozfgts792o29pe3v156vavaafnc6oh2piflte694',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 'i3bhr7rfzvgp3cg9glti',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'v67z9d93wcz9knd1ipmaazn19whtt8chgdflquoh4jjdrr31s361l3ata19founyq1z4lnk7ssytr3k7zvlg0gn87zzxrtpy8h71wmtp0rmfmg4coq8wcbtigspe20u3te6stwwmr12b1svkp3sjw3c83yxe0qlk2gdm32f6uq3so6pg2pffdlzsfuh4i4nwmd1l7suji0xro719xip61dg6dqaf9bohh58x89mzakb2uyjvccbiuou9u13vx9qv',
                name: 'fudgivrdzrn98vnpz91mwgihh53iqh1e7gzaivorvop973w9z7beo04mkg0g3snoans24q3iak9sr7w8m8kfnql7bqgpt0zvdziohkxspehkydibzmgma9vrqu3ztlo3b9t6l50asbn3xy9bqji64qfs0nqpjbcoghgmw40zhe8ul477v0g8jf75aue520h6kmc3li1axfroah6ctzxqve92f5fng3gdcv6432yywtt4xsvu8ahejkxh5bdzf34',
                surname: '9pxzb5fhhyestbvoowyxk1bwh9alswx9j9nurx063ycfrnm6o3efaa8cp2m5pbjd8i7295z2xfh66wgxvwapop2ona1tr92iic2ehezsqkd59decw4thwwieuknlr7zuyhrik3qbr91o7wndbw0isiirpx4s6rrbpuy11tux8zgwl64hqldk09xsag1j6z1obrxai3c235r86yva2j0nn8yp6nv84uyszh4h146xifkvcoy50fhbncqd9ynjjaa',
                email: 'cgbnptwv3ivv1o9dkvaji6m075vwxczbyqzmclhym8mmgi6riv3ez9cz1fluy26bbdxtgaarrd85qmjp9xsripwquby7rt0xg49uutpjwbs9kut1b06c2ilf',
                mobile: 'zu931r7os5h0nwdmtybzer0vl9nwupazjv0cbw1vhznhazh1szg3acfxxp61',
                area: 'u17kva5cezyvgzcg5poz8vw0vh4flgqm955le7y4cpghp0k0quyja7pj4tttqq91jv3f6t23c7d1d5cej760djgko3yt63x2l6teykr85vhvj5d89xa2wlk36v1aqkd95cehztoi2klaskexaakfyyh7jwkml4guopa15ooq0kxx5w9i7sndo4jkoh4ptxyc6qrxyho7qcxnjm09wwwd0g9c278dupbatyuxmg4106s5jao594skbja1iboc8j8',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'vlvotnyru3g1a3kybtndek75tuyrcikroie8k6egjp7bihlv2a',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 'esf5wzqnlnasn7sgp1mq',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: '2q0baggtrzh51e42q84rf9vh4fu4ynacvkisnlpx8c5ik07aekco5daerzab6bzhd5ih0u4oi15nvc49mjdgi7pc7iwdqodqar810bxxekdnepghn41x429786002gyrwfnhncc9zm1zpdze40qvrjjz1ucyq063dkby0czjj1u8fnvdwimq4zh0mhe99l0lcu27pyt8rjkuxqpfmhbisn3v45ctv5i9e5zl7cod1fmisq899hedigrsb9f9z0j',
                name: 'g4lwtz67dubutduc8b84anudeamkmorox24j8fc7n63gvqoluhhdoxt9gwe5831ci7vtyqyllepvbj7dnlaj31qvpvvoj5gox3lqowknjfshkpmvh5h0lhf6p44zs2nybg20o4j8gbobhenkgmqw5jc3sxfhdbd182tkgqmg729y9hggfxm8i27fopf9unow6f7uz2r4zx20ydoqiucnyyla8i4acm5awzm60gq4iuq1o7g0vxhm5atu6k15qyxv',
                surname: '6txm279innt8izjipuyhsbf39pxwl4bcb8mlwvrp70oqc5vc5to7vagoeymrowrmlxxgswfwra2lp4q1du7hnh1h6lu1l4q3pbv80li9pztud4sjcfly99qo9npo4t9dyufc73wwhcmkfygjvy6twdemtpygfvcv3csh7a5hkvqn6te9j66xb45keek26g4jaexc1dpz5va9t163ieecwls3oexhvhudhenax4gh6ftlosurd7i3woxtypvjq9h',
                email: 'we7yvg6qfw2e5uszi13hf91ect36f60t6lhzoahgor9drqquwcpk6syf0mp8bsxb0agcwzljbp61gvqjksmexxtsb3jhipo357jr04wd7x11iihaxo047x4r',
                mobile: '9wpbqw81z9bfjnnxrx34psoulctq1ed36ul7bedjf5prnavic6fsh4mcdcd0',
                area: 'otgsslmlq4jtypggibpk0bxyyn3059tv6if7wimesn7d81i8eteiggvs2l4z94bb5w42it5hmre4m3zcfu6vga064mf1cadfza7w8a2pumy7gitywoetv2im2locr166ne6kca97iuurayaxm1ff2fpfs4443fzkmrw4qcm2kdrghzscwxae2zgqax9x588c3gxxdg79nghrf5lun6koals21kex854x881ay1qvwcebqgu2a22hf0pygj87os7',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: '0sl8mtb19cw447wo3sjmx49ttguommahtmwv4y3wt4xpxqw2cj',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 'lmi0cf48yss928lj7cbp',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: '8u0dyj93m8cygk6bcrbed6k8uyfc62bty4tagsr5lsxi7a0jvfe45haa96defxt32lmia3fikd5llwiqrm2kbe9j5hc6cn7ukiu9zmun9ju4yjhpmiwfl1j84o49xrmym12k77seiagxflu0ks6jeumcae02qqoq82ph3kfve0czqe8qunuknpfmg65yc7qqchmo2q3zz5dzzrbhwl4w8rrs320wcyxnnvmrqxx5spaxa6yut4wm6og7xpjty90',
                name: 'w1civhsofz0xos3n8uwvpz578rcuwcr99in65s5syrfe5eckkzw6yyg6w8th8ujpjhvs4tjcw9j472038m7hddwmlgmengdlai9rbef7aupjx43n633z78k7r67xj9dwli6xgq95uqozdc4h0uhlmwobqkps558om3xzhtlk603x2ugk86nfei4uau4qte2gtf3ixezstwrfmnl7a2r8xbyld4rvkd5fvpz1tq8mrm7s3acauyttedtzj0hh7iw',
                surname: '784bubjh965o9is4qrjgo90kso19cs2ytr4gmdapk2g53dd4h7glmghncaebs4tgwhooxgg4ucyoepzk5hinsnbsqpu8l01v06046ho66d22g361dfwd8jwoi49w3w0skvw6walnbu7r2sx8wzby15plc0ph1kdzhmz11ihmr6pnqylsuugvrx6suv1k5f5fnmt6g9wiudld2jp2iq64wl4m0zv2f5y8434hkx9e3gvx7zv7z7k0isrd1ks26ir7',
                email: 'xw7ex1xggap4atambly7gz8dbeb3tyrjh0op7wdztu8137i59zb2jfh1papnsy6xb205ow4mwuiku5er4ezixf2yxs2p6n4pkpx4ufxsudmpdjqx00q1rv2j',
                mobile: 'oqbmqsq22zxi3cm7v4mnxqbpgd53ehoqwfznmvchldmc06lktte2tr9xdd5l',
                area: 'oadapl5yg7v18kn8y3751f2xxydvg57bsuke04dviob9c82wzgdns9asfnsqbox2rhdbu9b6elhgnlkn5bby0mb6n58850hr96ouhhp0yqk9v2lukephcx72yzbosjl8r5lznq4e1zs27shb6pmerw16jtmrk7j7k85cpgakhpnq1cox5rvw4oo1vxfmw39g3bjgl60yvjxm3m6ouk0hffll9h4bg975ge1vaw44y7jwjz9lyb0mee47d74z1v2',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: '1nwoxjb6lysx17ch27qoylan2mx2xdbay34k5h2cwui83ydxn5',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: '9h0ur87p86uwxmtkjjgx',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'k6detgie30vef1f0oxmj8p5hxc4385fy389f6xp9uwiare8mbz8pxqtx9veja3061yre4rmeht4ywd7demtqu6n6mjm91y06tv2v86ekb1u9fgwhjo0teddydoytc1vfswdg50ewa8pg3nzz33e6qzp3di2z0rcd0ehn02h8u1so37twqzkf0i7ucua5kftsy1zhjbirt3ebij3bqltwz3nglcls5du3y4ncsszjdur1kh39lcb9nr1njijww7r',
                name: 'h6lyrcy9ryr84wqjeuf4z1y91wj2n3ewd5lmosxhooe9l2wtxhgipdzw4qzqf0wd3n8q8kp7aumbahprrcn8p5v9do3ewmhruwzgekus538zruphxtodqjccc8xkbhdp69sheff0sh7aa54gcmtuego9hvu9uw1adogjqa0b9fgiw4kcdl6f03338a23skraoa9iyc3nom03hcxea4u6pzp4zcpeejackalczn866qxje85quacw06j5ggbceje',
                surname: 'zem2zworx4kprtfwlphowxuqw14s5qq0iywzklrji845s5ggrkedfnxvcx6gyn1nlvdufi7g4xnzegsobknvd71xc504r8fjly3eg422jgeu5evjqttd3f722htkvbb9vfahattwoc8uiczne7r5k7pr9kmf3vlykwrrtmknvn3pcb8j1zbf91ycptpwhnkw9nbb8rj6vhk7bjwrisgyfo6rh9ln66z31400ebygj9sf7jf6lm476sx8ub2tsri',
                email: '3g1hu05h0dfdoi2o93del2iaxwchyv8xe07a4590n6kq8rlyk0353yytxa7af411nzbbnfohac94i9vby8zm2s9xp4anzuo9sqyr24vw5iu08bdqi3tlh4of1',
                mobile: 'fjcw7hali3549jvk8b78mhebp7wty6119uzlnskd4qj2cnwlu2vdgzqw8baq',
                area: 'at7renz2xs3sdsisb1uwe02o9xgzh73asfh5578jpnlvdgnf8f6x43j36uh6xv96w47i7oqqobsgg6wr0gctjnltu1vuivurz4fmjbi7jokflcq9fsshdxnhsys8o95eliwalatwkwblky2075dxe4g3ftsavl2ga4bp03og3odakqsnl4b4hszgi2c7xcijiqcpw0tbk5tlrsjkulbcmln8qmdldpw4tbtaja067ie3vkfjcvpubl1z205owqz',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'kuujx98h94b94jm40qroc0sjpgvss6tp2dwroiv0n9x9ahvf2y',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: '5m7mt1is5lo4qymxbs1i',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'w55b5thzp3w8d3q5cdrxauq0oh0l949zvlk9ttsegl73uiqvxyo4cug38p70vqcgausclcb53zxak8ujt0d2xtf70ummix6sduhhyidkf0ro692w79xw5jd7l0ug61na69kqtyr8tjvdjq8wuat3dpnjorhx8twcas4in8myvrojfoor8q6p3i7hv6jwf3yoyb7gclts7nmjam3zavvs1vadb8iyub20jiy79zr34gawvuya0otqnnilmyypivl',
                name: 't5se7rola44bwf4iosxxquzcavvh39dxvxatrhdyb6pj8h9yra522iea5scjghtxjm7hbxp9241yxur1oe90kr2l2k48mo9t5ojceip5wdplsjkks39ngdwlzi1muqx38bsul5w3pr2snp1xhio9tr1ochlpxgfhxe8xmufe1l2ggd913d6kncd1ws2xlvcgw60raczpgxuz4izchggvbz48endn98xr67mtmkripzfh2vnpjwuho9ot9e5u5xp',
                surname: 'ne8pthq2b7uivfjyfpqjpwlnmkmobexdezgitqxqz6e5xp6ra1vo63uz35k6otcw7fqdn07i3y0lwnngu77drv05orinp2fmezrl5wnmzcm2rhspnozuog1bfb4chmnd0mua9cjsikfe2funmu4d82tafn1968mc3bpf8ms5hfzoe71ctlgwe7uv9tqvhrwo2myn33bmjovs7og3mt3l6icxzyucfix5pdgx0d04csq07xajekl1t4doxc5j5tv',
                email: 't3krscvum2i8lt4tf3c9ycgnctah7t1df54f6ii1ova6n9qzsaylslyhb0rv8k1wifo6hz4nej8ye0wpru92iewyjgd3v5wgwx8gljwlnxo3z8usygo9x4cw',
                mobile: 'c745685juray2guys5lmld386myuzgqjgaibovj0pistj65cwlw7knesih8u1',
                area: 'vpolrv7dsxng7qb0irplooej6p7cpe72nkfz69de16yh5lnopoxuql5uc0ll7vwjqkgy8g1aeshnpbwte34g7qcb3cuboow0tuddej2992to9mwwqu5bgv0a0eah5k4awzxhup26pyjusn1vvoomoa2u55r3k3nqa1z3akd7wr3695g1odgbs69ozlvdbr28zvgkcc4sb99po6e7vgn43k14mhopeml7rflb716ios4o88gn3or7it2rp644uj6',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'c843exizo013ogd63vjzb4hy8woqp5qtvsyiq40ws25irnsetu',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 'fv3v4pyclvl8qkghir3s',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'p4a1izlh0gu6n11ivs1fmcdkkz9q7o4noohgclnj4d9wfkz1wirfyqqhbn811bcti3599zm76vxyui155nsp5v03cfld3i7jsfoo2rp4k19znlvazn7zbsyfzloa9qaws4zbug8rfxjiy6t802ofcp1zqos53y7wiq0prrf9v482tpcl1hpdpgql59gb1z40onbq67dto1qfsff9te268x63uui4mbsbjtn128bma8wypuojc1n72m2hg32183n',
                name: '2yecxssnci4z2jl7f11l9jfohtfmic8e59q89ki2drlpg99ipu6r63iaq2540pwhulmn5hbm9tcgstmjja34xhpe7d7vwvhb9da5u2spklnhaj6sqpu7cjr8g9pds37f9rrbnckryrb8qzfqdnxbg3d491lb0k9qc9465o3kw864z1uhiw2jy03vep5skhvoakc5h1vxmvqku1rlyzbdfyi3dwhw1jr3u0zhqdyhecx9skwvz9xhaslort3zctl',
                surname: 'gpg2oqfvuo09nqr7vgog3pyimi7amibx63nc951s1f9ar7y686w0kluzilhchq0dwzv7ig5fd0k8ysl2gmbdquiwaytj0zb7tt1t9ns1wvi9h8pcyse59m3m6y01m9l4m269oemzznrlnp5rh1wpa9z9xp8ie0ghkhzofllwhlne9xi2w9q4onfdloxc23ykhmwwt4aw5e1trahkrl2wnf2vj5juceb8ih51r9zf74qncb2wti6abybw9a06h9i',
                email: 'dxkjvzc033vbnvwqf6jo5togbbqgipha4gp0ttaxp7bat0zglwz7imt1m12yo7h3kz331gs5xcjjny5k72iglhzg87ifmn7r7w80ob5035g94hqot69lystc',
                mobile: 'kr7cy0tguvf8nufgd3mp4gp0d63s4cdxisarr1739y4js7idfogh0hr9vw1w',
                area: '6g8iehperagtullgb2m20q0vwastcql3mlfhglk4akdqwc8vf621paf12td4ihht3caih3f875x3opbtzq1b4b0d6vabnapqeu391c6e3bvd5ep63zyi4nvdlq9f4vwlr41ileyktrkk1k6g4ztv96o2ytfdcj295u4x2j1jpfbvby9stm8nzo8f9ik4617m65tl4umb2unpujz6ts68icz14m1k19bhb2kx2bry3a5ru75tuphv8wrhoslh56jz',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: '5nlo70fv2cwvuwtelalhyiwkqtokdodd0gla56hud978f9uw1z',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: '2se5rxr3yny6wy2b21ux',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'ovmnu2y906pp4rxrtkuws4twhqr9mkzp3s3vwdjh3xdt2rmjp0x3ypbnfcge6kbtu4zz2jjsac76yf1jni6zpmri7stqv69d4czd367wyfn6e38d4q956crp00h3vvsvvm9ildmg554m7hge1i88cxmzjkhlfuhzsphatlfxlu2cmoof8q95zhueyjj11uamokatfu4ac7bw8wh1rkotwu4o7bhaoy3190a5dxt2wf5z6dfifdd5bil3rbsa9y6',
                name: 'j2j4l31gizc7usxd78yt3o3zvu55yo84hy78zeknydfyczms1xj6d31vr6msli3ab9w9msjgwsuhnwallnasouggk3ztm5tk9ukfgn29to0metcecueji1wxios8bqn0rd2hyn6sfk7q72k8hkpiw5966murijag7f3g5nw4lh9fh6k1121q1n1rezlzk7m14uxm0d7dv7ob3qvm6kd3lbarzklwl595z7t1ns2pjk04zoy2z9n9gwgw60kbiy0',
                surname: '1ncqj6s9ods98vbq6rfwji8uo7o5rm16rgwc344n7ipfi3p08jxy2tg5h9k9ye3d518jixbv9igsj8pw4nnpck0jss5lur9hjbqepbpnmzg6s2jeyo9hh83g9c8aaht13laqeez3s75a7o6ly72o9qy4fp227kjrtkd95as6f1kg2ezpog98nehe28sgn6ywh8tkgl3ldgqz6y66s39puofyqpemk3v6l9celvc66doykzxx7fe9eyrae6dw4j0',
                email: '52ftom3i7q3700qsrh5wte04tv3vucmqj3fvcg46x8r1jyjwib7spliy52x6lmt2su45ej74528g6tk5vl4eo4vs5v1mdd7vg7ktdwi4ux5o020zohxfmh9x',
                mobile: 'tpwv0k4gd0csanblhl70ugvtc6t5jaopoi7noti9eszvnk7jp22jwytjtj05',
                area: 'l6ic1srhk3bz0r8ip2ovrt3hrbn6l8z478vj45pug1hbgp2m7hmop7wymh01n4unuwjzoc80vu9nmk3ewerbh68v1rhdwrtrxpp5brizst4tf225ukuzer1p2nvuwlb2oap1ym0tl4xtbsg02taooeb2tfs2gz0d86ak1yikzd1n5gmc6n2p4dvj5gc2o26x2aijkjwaiqyxoy9hsjd7fbyf7j9to88cygau8faw53srrmsdo4om725vmq2jxzm',
                hasConsentEmail: 'true',
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'ap8hj6ljjnrycy3ld4hs63qvxej014luu3yiij3gmnhjgbw2rs',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 'y82scep4nrgpbl09qmep',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 't3me3v4skquzrv8dat0rtg50hqxxiyz71k9v1nsxewl36gtf9u8puv3uii31qg1gbza06unk5em5wcw5qgvewux268ld59zuppjtazpnljkero4x1gm1rrxxfdftx660l4sljcvw4kny5mz9mb2ysj2719h2b2zdcvevt31ihqtgf5l4mzv8p6xvk4e4uag5fnysvwn2krzl9b6rbtahza4gniysn4fzr0c9vqcnbn9c400yor62ynuyhjz53g9',
                name: 'snyvj1m1k7tnhwic7dtlcw0fwurujgsi8ws6z71u0r7l476w4zj7szwqi1jsb1c0i6me1iekq92yrlw0ys29n8j24ticwx4y0sbbgso3uuect5vzf1aq3hez4cjrgi1sym1qglt7ri65g8voubins28zjdomj2urcnwvsqsdt8168i2amg93qxca5f0vecx0dbc95puq2em3gk0ud5lyccf7dip6n5tt8kvc6u21cwjd1ynkoiw4aig72lcyof4',
                surname: 'dvacpz7fm3lbia1o00y099c0qotg2ibyqzv6feo0g0b4t06pk2okh5dd3taeypjd6sia0x02ac26swvi0m3pmjs1chtlb8d60k2zrcthkwibbkq25whm0aeufcc0zy9bnrwlyzbhocfdut7q4frwe2hfsd05fnlzddx6f3438lmqkui1h8w5exb78xvz2azz4wx5atrcii4u5t06kthsh15um3rbu1y2kwvmdx8v7tm42z9o5idwznq681hyoe8',
                email: '7w8vgdc45zsyp7ogn1jm86f2tjo9flu7oigjtu822c601boafyhr9f4s99cgnkv6kzrht11ythyn3bx78fr3nk3ftbu529mcw8vnpiu8a2s89c5mx4c9ylzx',
                mobile: 'wstg238qsadwob9izh422wk2sfsk2bygd5xfi7jdgghx2jk8064bnbm5n51n',
                area: 'kk0m05gpuofep5pgyf7yek97hbereq2mo3lj4ed6c9xtbv8kevzfbr0ecqm59e1ofdnh5jk2180t20a86stezcopc8slbxajwfc3jz01zio61eu536pmuv1xsdduk6dpvtz7ftpbmd2mw644r6j30lrpumvq9q4z21qu3g6tqmz5zw51lzsmg7e2x0jl29wkdt4yyv14v8evvkz8vc7k1cbfk7vtere4cpynjrwsqgkile5i76aynynrhyw9k50',
                hasConsentEmail: false,
                hasConsentMobile: 'true',
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'z418a8q6xsj27mvwdrjhoilkpnxf5iv1v06a0ed8k36agn1zus',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: '18h7j2cwho8dtfwv3ga3',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'in7240xkfji51eey9urxub323gkiy4b71mro5a0ske393zk53nhy1q6p1hb24ckgflocxadvffcae4qifi04qzgn2qszegvm0mfwcwmvwugf7ffpyso4kfzrft77una11d130c01fxm1ydeqjmt1kiyna256ajis0q3iupa79npjlra44ylab1rinb5xfk4m6679jjowec309c09f7vejnwsl6tptigaaulhqvb4t6ewm23nfg19drov9x89ift',
                name: 'czkhonnfpu90e283b48hd17t42ul7393tmqdo7spt1ktwi44s51hiha0j91q9s1r2urx7kb6waoxidj5h9jirsbm8wwho7dwqnkcmcrz2g8363p304xr1jdv9u865mcn4ml18wze6x43bezc80otpxqlruplelq66uz0it2t97ml52ts16sqoi0u0v6iviz0taryh9f4c64i7cy0o0e67h1dn7tco3uyvxa7vhqu98qcqcxtoq7b449m8ol8sr0',
                surname: 'qarocnx2472f5hkpfbnq0427lxll1mykanemztqgtp0g60uvgqdtpy5igjw92n2qm3ztaowtdhp88o57dzl7e0z8xaakt5dshmc1jf6pkogw5loc7y87utdpzpgrpvso75ygxu4ri1sb7bdwlmnudxb84r49wgmrrova1jtumiw5g4frgeeeljg91lianugghok8dj1rfmr03x10hb90c0txn5bftgnvkiy97zp58i2j8bg38fqwuv5ge5ca40c',
                email: '6hqtwfks1fdgk7sfvvbell65h3tw917ymxg1ibdzuyu90hu3idc0wztlajtnzwv2vl0f2nsplu44t2zwfro5gw0ywtwyviigy66b7rt7dhysg38v4d5kzra1',
                mobile: 'tg3eizbhufzapjo42ay2ft66ct109y000m40ydq3cz9drtasq2eggy6ipea1',
                area: 'q1u041cuyxpsycnewups6v2pestc66hiafd6j7qm0a6ptqzgies95p02euu236hpu83mgbhp9do1f71obm77kd672kf4fpz4vjwlz7sxby1atx2zmxeamnrdegsx23tj0cltbsz5i9mu6bkjiph3usrh8qq0ewn26glif07ibgsu3o5u7nm7f93jmcuxgr35awkkmigk22h91it5wixe1c2lr7plspac5po76lepnedirw0n52wjte3ssz6xjqz',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST cci/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'fjwyglbo226fi44ezp3gzjymznnxcq9r2ka07ywndkzz7q4lrl',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: 'ys24ape9k3sygdvzf42c',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'h896dqwbyspazdoo2vyffws2tk3k8z9j9hp385mkvpm5ck78aym3qxrqikufgwq9iid2gbp985u6h48vhst0anodek7x2dop2yjekb19zm84ec5kfvhfce8esl9cq8z7f8duwr6iaevskdgkys399venqsz28e2wdtvjelvm6ruxrc5m38g9ytpbk3og8wybbppo0qma6s5n0cy7qgknw9fsxewk6x5fbqd4yk98eb6mvargii2r7wr6ni86olt',
                name: 'xk1ati1sbhofcn3hkv3aw9560ekoikqqr1140t8hcz9p70x98ig6scmlke5hdt13czs9hoya23bk5fob1s2zkppplidmfcra9cxe4fxvgfl5teq9xv3dlnol44gfa659jgq54us2pxvzn1fajdq3yy7du99h2zsbamd3l3td8qc8cwppsd9xh8kfnlibd2ygdal39f8fdaaa32kb55yfvrwo7mtoik4g3n91ptcszrepywp93eig328b4aa58cr',
                surname: 'eu2thsf1ihw6ndx78vsjbvqk73kt8ak7kyvktrmb7fp6odooyb33d7eawq7y43hugeq82zvh2q1k8d2m9i5t1y2pxaefy5hb7s6o1cf84myrkr98k82axmk80dfjejpdgpc4739wkaes1fa0tbsbj00ud9e5esfng14n38y3uluvgn1aeynitkw5n6eixq0x60xi69omclbthsx7ux2tfnkqb6a7jqqsadmhq0b246suh8kvyb86fgva0yg7aay',
                email: 'f8e8t7j13de6xa6ubyyng6rfu372opimo21g8wntpdd08n5xzgc45imu9ntqtyietgdygrw0auvfh3cz1faibch32dofopr6d6s741ecfnk3d7vrnnkqlkdm',
                mobile: 'xcbw9kmao1g067uxqk50pjrbk04f4koeelb4snln2jaaokwgvi3hfc7zqycx',
                area: 'vnt6o2ogos2z9g9rkktnffl8tocipou49rggc2h4jy4dykyyqf82dls8bei9eq4bjzm29qvw41fqq2izbxsakyetely4gh0u85mf645anwq5l1ztmsru1xtemkcaqgqern5uflffvbegqbcjcgubak5x36iik4i8atfbra3ibp6cfxtnf19e4aktgv4ekmz2on6k5gvxm4sngayjsdheio60h0tdmfz520nt4l10ta3mqtu84upbv9wuo83uqwu',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET cci/contacts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contacts/paginate')
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

    test(`/REST:GET cci/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'dacc386b-0a1a-4fa4-aa5a-3026cda40527'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/contact`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'afd75e99-bcb6-4930-80fc-9369592d691d'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'afd75e99-bcb6-4930-80fc-9369592d691d'));
    });

    test(`/REST:GET cci/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contact/3e592f8c-af04-4044-931d-73fbeede6551')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contact/afd75e99-bcb6-4930-80fc-9369592d691d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'afd75e99-bcb6-4930-80fc-9369592d691d'));
    });

    test(`/REST:GET cci/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '78713125-8cf4-48a7-bd08-9ab35886ff18',
                tenantId: 'f9d6debc-93d3-4a28-b1ce-33e37e1870b5',
                tenantCode: 'tioik05a5gb6hhknv483vtpkzsoe4vn80ozrvuwzwqheh80qtv',
                systemId: '23eff5d3-7cbd-46be-88f1-dcd02e2de610',
                systemName: 'xf55tqv1xz5xm4mym14b',
                roleId: '561ea259-ae4d-45cc-81f9-42dec9a57379',
                roleName: '0xkgqr7zgr8yqfpjb3jmlgyp26urnijfyfs2hs7hn0b51kkouz9png4x8zz8agrzrshi2krrnxmhdhosx1uk0845jm59xbprg4m1blallmxpbdrdqqr005bwf6ihodhmg0k8p5ls7fps1ib84q7mv14whf1f3gd0hk7yqdonq12c166z0xs0juqpz8ajp2l5r5tkib6kjhdan7ay6eumn8vk5rfuue7bhbrausp57tiwxor2s6x3mbwsvuu5vyp',
                name: '7jo6l2w3fpv90nb2r5k7lyx0ccy2i0zcdm76t720b233sayjvlrp7z5pclmq0yntlrri1z056hft6mtcy0dxv78t8x80os1qzzuhypth5sscghzf5zd141vt4kzte2z0f52h2ujkg8pfa0xv6gn569qnkulizq9o6azw0lt998n175kq7tbsykk13fwtwmhavkaueim0sa0d13f1vy145wcjukiuergjoxoi6kw0dxalkrxvu02ozlbjkvar0t0',
                surname: '44ctclavyxit804u8h077i1idt048bcuzbz46l3qq6m3kgocql75yo28qlmfnaixzx72zvvbuxpn1tgaqnlwb1lrdrpkg7swxe5yzhwcj3gp7m8zae0wgrttfdrh4e436oze32ldqdy3e2a18yavb8pmk7cpu6k6bkqn4im2unvzk8rmgcy7nu19xtpxei59hxwl3w9xcclmopwrz63d1v25vzv3co6d45jfhgi7qp9chervvoc8reaqw3txu0y',
                email: 'hju2xgh27o1n4b3qygfp6ncee9d8hkozd62vae6mj7akv4wg4acg5h91bf9gemq7z4z50hv1jcx6idz95f02arqyd1pqkxy0by5to1zb11wvh08p335lhnoo',
                mobile: 'pgxk8sls69hdw0ko399w9fxwxm5dlzzeihqyjf64tyrq4o10p3yi23v3n65m',
                area: 'vvobh3k2ppkzq6zxcabp5zuubboj73nxgmhh4oypi6nmn41put8cr7poicxrtbaoktcxxwt9ggli6yb1v11cppkuxhfjof2dyepofhr7k8g3e18idgdp7z14lbihztp634n22xm71m5kbamq6l0eilxxfkvc7q2p40kpgs5k801v7pllt6odbk8ahp0mzz6k7m8gpx0t0md6f26snauhbtxdb5c0g6olj8zq9cv1avxfxrcrio3twy9p7lwtysl',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                tenantCode: 'g73i3vltno2cnwcjijkm4vdc5rkmdlp69ansbcu028a9uuir3p',
                systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                systemName: '99j465jywotwq3r9s0ma',
                roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                roleName: 'lziltzqmxag3bizwly65aomp0c4y4jc58etc68mgl04ugdx059amwgp1wle80l9rikw2d8fgynvkhjx2qjfx3wwsk17znseqg7hj7gwhdhtfz05dnwvpw9dax2b2hmqjgrxntx7v2t91g19mq2vu9dtrdzi4gr1v91u2jdrbynag5myhzd1sjdodorlx080dr5lt3b9t28h0n1wxyafagld069us6sbcymmlc8n9sxxq0k6ym1mulpdthoo54j8',
                name: 'sbzx9o7s4tzjopsh1ev8kk9vbkgma8b5qgo46avgbzpg78bjsh6f2cto15r588d47dktqbtse6i0kijpwhuri2ymshb5d044jrwkdq19azzwozwnnc6m8e4ilhp6cwan6hfjs7h59e1w5qt66l60ks1gyvs4f2163b8gu5mgcipjdvuxb6hqts25u5abdtmn3kpcwcw4bg5zlkiydt39diwg031we5o8vdrqsw0s6js398ope7x8ub6lqargc55',
                surname: 'a1f8vmoeqn3l0fj4i13ui9wxnr95o8ui0u0j5fv3nmmc01jqy7ioa36l7ypzxu4djukcf7uze1jhn8dctdnvl17diys29fhkhh5pd9krdfzpxxrvmst10o852aimss2t1a0yueyzcd4tkbver3i3lnjjxvv25jd32ek9e12hlkw5dirqdsx52b1nelf1zwo62ebhgvs2iksdsqqfs5ujzkl2w4ew2wmbtmot3f3nh4fygs18ysfk08cx0pph59p',
                email: 'vr509u6epm1kr3o2u4414mnf2bzm0c1fuo1d8qigy2g7wx5b16s3v0hcdhfco9o4j3paf7dxwucel6btpegxx513wczwufwojnpzqv9b2s4nxn77kga9ludi',
                mobile: 'nay8k4fomsnfiw83be3cmuyh264f2h8qdk6onpbuz9um8ryfbcu1vhzhvxul',
                area: 'cfdwugctq88f0lvb7l4dok1zwqe8sjlwt8x2o5zej2xqv0caber96m7htw5e7mtv8o0zkk7eh9bmr5j9tsg16kfh85kbc9qk0m9bxi0eedi6ehwshddiyzs10y8m8p94itiecmifu6hqc3jrizv24v973b1oets1361rrjqiz8rx4si6btu18g8b4um7jiv0i6cepunsuh5u6oieipe3siluo56823p4yik5p0hrwnwm8zaag9yp46figzo1l1a',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'afd75e99-bcb6-4930-80fc-9369592d691d'));
    });

    test(`/REST:DELETE cci/contact/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/contact/4eed34a1-4f4e-4cfe-928c-d4f3adaef44f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/contact/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/contact/afd75e99-bcb6-4930-80fc-9369592d691d')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateContact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateContactInput!)
                    {
                        cciCreateContact (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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

    test(`/GraphQL cciCreateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateContactInput!)
                    {
                        cciCreateContact (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        id: '066c3f71-7f17-416d-9d7d-a18740bed124',
                        tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                        tenantCode: 'o2c8wazxp7fpz3xf0ooy6mu0e580wuyhdr0pl1m3pqw29utd0u',
                        systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                        systemName: '1gkrnz3z4e7lfv0arnxl',
                        roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                        roleName: 'w5njo1vudxosf6pksg7rdvqqxmte3jrr4cvi8j6bf2v8jbe124oyub5gbu348avqeum0eyg8gt6i15yl9zulfds09scoyu58j66zzlhpyv80x8f0q7wohsm2x203ahxm2spqgxvx30konryyz0ucgvsnc6nogz12z9knd5slye47c4568e2lg960de3obcy8uropq3oh17xn6aj8ao7zzmo96nbhputoqy1gfdqanj53i31ox7s025y7lv17yp1',
                        name: 'bh3f3fum283qvptofh6vkrpzq9oa1y2o1rj2e84o9ynp0ki7umg8z13bvsyz655923sfcq9hpyzlgtt2qom6cv9nik0ypp3fzzpvp4ra5qiq843au4bqs2o2soitu5wwegw4u3nfj2vpelwcugpsgayh1yk3gjr7zvws0k00wnpdwoesln4b3vdkvxbwuixfurgah0anjlo3jhwp72804qxc8vpefh148qz7bcp6blh38z8rrudutzm1izkymlm',
                        surname: 'okr3c9mw1c15cfa6z111stmla2cvagq09e0oct8qph6j3rcprxw23n3laevkhcsandwkpoqll3xbbea3z6mt7wlo0hw70z7stop0ep0gdm08qf27hgczbkam1jiqr8mola3dmwd14464nzuhzmmbzg4nn2t2jqcnlftqskzvfwiq1npqri9x2xxlp1e8ma6c0hu409s7surrehzfvt7jmi7llmn08k2np5laq4hkstvld4mydzy69vk190sbi2t',
                        email: 'm5tv8qpmh4mqtv6vvit0rg6qm53stoh05wy18teoeqnv2kv77urj0wpez9782daywbh27r21ifh7b4x480m70pphzfkndnle75ywzm1tvvjh0yp3ovi5y8pw',
                        mobile: '8yu2lgyq2yad1ogyub3zx082lg3vpex001kjdjn97cru18j1pi7yfissf3wx',
                        area: 'lbxy8l9qbmebz7ckz5tyehvezpbhjr5e08v5ussipfb9p4vuqejs8leldpyf06hjz52tb88zk35sdohzh8u7t91eto4rltpqpg68ianhfmrov0ynkvmmezk05c3gpbm3efhbrb6pl6l3uechgj4tlz4woelxkd071dcnm91rjbeo5sagbjpp529g1h75zj2mrlp41mtodp576uss99zrk7xblw0rjpuvndgc2ko4th0u83uc0o3jj370mm9bg11',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateContact).toHaveProperty('id', '066c3f71-7f17-416d-9d7d-a18740bed124');
            });
    });

    test(`/GraphQL cciPaginateContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateContacts (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateContacts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateContacts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateContacts.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindContact (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'bd06bf6e-8b1b-43b7-b3a7-e8d81bd08433'
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

    test(`/GraphQL cciFindContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindContact (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'afd75e99-bcb6-4930-80fc-9369592d691d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindContact.id).toStrictEqual('afd75e99-bcb6-4930-80fc-9369592d691d');
            });
    });

    test(`/GraphQL cciFindContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindContactById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '23f62807-2d65-4f2c-aa59-2062f9fb97ec'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindContactById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'afd75e99-bcb6-4930-80fc-9369592d691d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindContactById.id).toStrictEqual('afd75e99-bcb6-4930-80fc-9369592d691d');
            });
    });

    test(`/GraphQL cciGetContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetContacts (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetContacts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateContactInput!)
                    {
                        cciUpdateContact (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: '4280fcb4-3b12-444d-ac58-fed4de85b3bf',
                        tenantId: '9ec7bde1-bc47-4319-827c-c9c5ec2580ae',
                        tenantCode: '52mlty2dii2ewvp0wctjdr03iryw1q4vcjg56w34vplbzdpqn4',
                        systemId: 'd34e7989-8483-4d43-9e66-5ad6f02589e7',
                        systemName: '79rslskd2ocg48a1kgjq',
                        roleId: 'a180bf2d-b2b9-4636-a3cb-2e6123a55803',
                        roleName: 'gl5o13v84xe2smna4q8picf1omxnhhpzmxlooa5li72pvbln7nt7oavcdbiqdmq3vua5slnh0u9qvfwggbdyu3jfirr4zd3jberknnwabv6nps0v052hmisn71sgmmxz346ltbrydr0piklv9aapixjkifhgha4r4hzfa2wf0fmx9hz2bmaeie94r08zjtorhaq6bxt9ms9i41j00z3jkeujjkw1z9su92z4vc4r8lii5m9v2re1h0iwqhgqi3c',
                        name: 'tndc0bor9g9l7yy27qfa01visll40yd2od4up4n1hd35dtdvxyy5plfjyx86z7iaaey1nz4079x6l87j949ipbpyam8vc47u2usghjukkrnr4b80dulzilswnjapcvc21d8wrca8cpwxck9i86dfgbl55d22hmdcoo4tguzr9cge787iovmmcwq47aozf42sp3fxbaagjnv2qia3pqd1c2i2jsx6hv8a3w1f1cnh1mqoyidjk7evqmwjj6oyhx0',
                        surname: '8t4bzmytidwa7o172xwx79xpwzpau8sbkv6ngq0fvfw70525a5x27p29aqzsopk4bs3n8gx3wx8x1mmild9d2mdioe82manjzdghwpvvz32hvfaqkx0kb10jhq0d9ilp66cfad016y8h5qtxdyo0nn3awwp0cdfjjp2bofz9msbbg9jvico6cpak6dtmrbsr60cd0h4ziqk5s5l3ayb6bn8rkhvwxy9gs03pwekgf78v54dsux30goevh8zwxzz',
                        email: 'rqq75edzki89rf4e0hljh6k0xyfn7aj0fpdj3uno7wowkzurtscpbdgb82niospg6xagn316nhc6ep43ogwhvi5s0kel7rg59f6teknnmgtaucjtyzvz73ad',
                        mobile: 'vo5elk4jjdfro4wrwzdpjh65909rhk8xr7owlemumz5zbxz8699y2vau9771',
                        area: 'xj596d2xiq93xj2b3025iasa00pryt29dpxtfnzw916wwg0ydi8ty85cohhdsi3q9r7p2oat08yz3jpxyahu97r7gnx5otl9zj8cuorkbc20y4u2daxfclbogbed5h14pyb1k4d1ohm192ppyqxioo7qfldwuxk4ryplopymzhywia74i8pmw7j854pninslee6vb5owbfr86n4udj5qtor510m3tl6idqulbndx4z8dajcd0svstd8rz12ybxv',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
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

    test(`/GraphQL cciUpdateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateContactInput!)
                    {
                        cciUpdateContact (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: 'afd75e99-bcb6-4930-80fc-9369592d691d',
                        tenantId: '17b07164-8158-483e-b027-5af2da2cf5a4',
                        tenantCode: 'biwnfrzcgon8l58ezx5o3gr5m0xkq5z38pbeoa6vme0nhl2xet',
                        systemId: '21ad520d-30e7-450c-afae-6e9578f92aaf',
                        systemName: '7u8nyvbeerq5r4gb5f6r',
                        roleId: 'aece5af2-e2df-4a01-ad66-88a11b4f480c',
                        roleName: 'bl129exebrydw6235280l0toq57h87xo2ttrkk698govhd3yhsf9un8uczgk01z9badc8d3fm5v4qzy4qhex643dyhulhvgg7gw67py9326iczfc2hkz329qxshg8dc2ypxaby8egxvvb8r8odnad90gx1ljgzi5d5p1lkyuk7r7hnvuh5ygt3i69a97o2qjwjrbbcz7kuvhbzx1uzifsgwylviycricd1knad1d0j10wveidfdw7bh50w8bjbu',
                        name: 'dnxwhct531aei8808dlozc1th93v8mdugi43eznsocd5ppni3vowkymtuc0y7bze1o1jb58ki8e1igfxj4hno7wimkmwkjx2w8pr3v34rg8htkhixwy8dms9v78bd6ug7n30aacusfbwfxymrwl8ucmfyub0oyukvop3lyl77zmxeg7uzmcfy123urn4xxtvww7vjk2rm7ozfnosnlz2p7vhl1sfhgh9mgtaf6wxvs5hzyh3dp9xzj8v0nzmd81',
                        surname: '1wmogehb9t5t5wjhqo6nasm6ecths3331s3xqfk7320sopmorhpnpciyu68fd3as069f3gxyelqki730jlv7qah18glv44ifeqzqcfiuos1u6vvxmlwevxmltx9q41qbjllur1hapwvydw7sudeux3z8tpbj82n8nisrrx2q76yg54slmai2f311hehdkss8dsijm4f1veqbqmnj6c1u2hu9ehp2ltplx2bx6g2l4jhwety9i695ec7vl64b760',
                        email: '7urabldf26327dr2zdzdq2gucua58abfg4jtmboplnkz3tk6ov23wneu967j1q91c6h0tza0k5y459ro5sj0pau638i0b4d3s2q5e9udv370uv0bv202ezfh',
                        mobile: 'q3wzg0g4602a3dpu35jeytu8xgc0qw3iq01hoqnn2gcsubq0yfatosex9x3x',
                        area: 'zch54k9x2gfwooq49tdnmwn2djva610wt044w9prniq0pt629ce2vr6k852wj3h9ah6z3pvpglfh8mt5k45c7t9wq9knoueisatgvnf0f803vg2txx5obb5ozxls0klfwg9dn5cmn0rtuhpkwavdhmlqfck2t2ghomjn14ul8l29atkgpim8jhj4noll0e4rhjo69e1j6512x8veo9t3d0fej15d82dn95upaqray8lwczv3ipumbw66jd7h2yl',
                        hasConsentEmail: true,
                        hasConsentMobile: true,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateContact.id).toStrictEqual('afd75e99-bcb6-4930-80fc-9369592d691d');
            });
    });

    test(`/GraphQL cciDeleteContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteContactById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '5fad1556-a79d-4e2e-9232-7033993bda37'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteContactById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'afd75e99-bcb6-4930-80fc-9369592d691d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteContactById.id).toStrictEqual('afd75e99-bcb6-4930-80fc-9369592d691d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});