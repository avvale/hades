import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICredentialRepository } from '@hades/o-auth/credential/domain/credential.repository';
import { MockCredentialRepository } from '@hades/o-auth/credential/infrastructure/mock/mock-credential.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('credential', () => 
{
    let app: INestApplication;
    let repository: MockCredentialRepository;
    
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
            .overrideProvider(ICredentialRepository)
            .useClass(MockCredentialRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockCredentialRepository>module.get<ICredentialRepository>(ICredentialRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/credential - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/credential - Got 400 Conflict, CredentialId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id: null,
                grantType: 'AUTHORIZATON_CODE',
                username: 'xf5ecx3nakj73robfgax40zhbmvjbtv07rfn3n4bdy19btdabpkytw7h47ih24yadbdhfunwms2x8w5a089dvphuil9zymn5iw1i0gshrwdh67de99esp3m124xqhfiio60hmpkppzg5a62bb0kpw7hslj32tcjj0wakzw7oe543c2ytxvf3ae8uqmxv69ifh6n7u04i4h0vmt81al7q97fox4x02oc21a3s9d5eaii0mmip1f3auvh617zhhgq',
                password: 'y1blsad18qf77svcjfkgta46wbe22lz2ohssj9hztvrtkl2gm3v9kidfdpu3u33s3v7xc83zqkrwe2n2fh9x2or639blc5a608q8vxv0bbyeavxpvkqrw8d5p45dway2wl9f4a0h5ywqtngi4vezz902bphgeclzeppd8rhicbdtot81c33vhlpy46pftxf8gos80nsru7cynflt5hrsgnyq4cknt46wfn9ik74f4rnjuwxqqgwb3576c9vyyhl',
                accessTokenId: 'a541c23f-4449-44b6-b83d-f41146489211',
                refreshToken: 'Impedit quo enim. Voluptatem et autem perspiciatis incidunt voluptate quae. Magni esse voluptatibus molestiae sed quis sunt id accusamus. Et quia molestias architecto. Totam et at quo maxime doloribus.',
                clientSecret: 'ef0d9a60poz54wgzetlpkdxy9ip480oxka5ikfm8ge4sutne9k9oarhhuvhrry21stg1zka7aakgnnrfacxaodp3vf',
                redirect: 'swrnc22togajhvatc61q8x17b5j4nbvj8a5jynnusrpcs8m80htpq6lc8yn1irh5ej2ffyvk0qixz0iftjrq3atrkn75yaptw7m4bzxq6jhqumxmplp3x1knk3dtb3xlb7ke4qyxfmqxeiisxvvhcr7q8t1w3dxldy7b8cew7tied3th4opywnn37ufry18eu33mugye0htjoz5xfi1xh90nw0e807st64whktp24iztsgnfwm7mrn1gxgfedww6zuqycotfch8r6r760cvlpzbafnvf4tqchtysk3nuoocfbyglapabv6fttm6nw7me25y8740da4cz8tk09fap5bb41pf5k9xvzbp9mm6pf7l3zw8cqxtupzgwqmr6wjloobl5osr4vcdgwlrf7suz08qdunxgc630tadt1s3thq1168bzisg3xi40y0jiwjx6zexnxwnhv42a5klslx4ctki1dd8qbb4z9ff05r0ngpk2g8rglq8lsepff5azv5g0hbpqxf1d8abk1zzj7c76t3wn6m0thp6ddp59hfmh3px4r8vm5ejent4jm50x25fihw3z8ldd6ovviy9welps67wcxus551im6lg0q67fikdx68lu0sta5yu3pbiuc2v9k0g8bvtzdv5pmpditl3rnk8v9a3inz85pbobfvyw6r39qwph2r304yevo6yy3yxr5nio313exrxc9ujtknwoxzdbse863uvxm6d8elxvbpf0e4h5aqbezu5h2lm1666vhwawcuf58vfuvqzvd2wwj57af5g7b7leogppv4o5g9jitinqlrb8d3h4r2iy47vo82h3na2u9okfanx776zqpi4hxczko9xzcwolplhx35f7nbpm9g7ggq7ki1zi3f0a3i3mqcxg91v3fbh3x05rtc6vatu7ast19lpluu6ijqkn8ifnkck5109qb8wpghwg8jwpd44dpga1h0f1zm5nghrr0j0lbmv849g132a9huwm3dlmlejwzkgd7ov5esxk0mswso43jmv0thyoho06uoohb4mu7sfn0m1anijzub3aks5lfbs8m81t8uvm24m3hi2wckh9jgaq18yjusxefy9xx7al9y30situ8yuuuowbu2tntelvqbxmiv5y0j10whehjymk8dm0j0c6v295tj8hr9ln2e7odrpo5szvqixzo8ga7reieo0csvr927rmxa51qgsqoo8o3ygx7yz9za44vamu1p0ul12nvus1e1zhek3rxccom2hj6lhq50epmi9uj3wxapwl3s55zcyi7gfl4nvr8lutibmi2y019im3g7zla2rk70c7k6b7m63527kzxzztv4iv58biw75bhqw4om9fl4y3wyy5qf0da27wrcpharhl9xlpqkov6g7s0302y0mnds3if4fxdo7zdyp341sbgmxui75p55wldgzgckvtkutg1ofk9sj7z89150wng66jgdivndyw1jrxsnr7ietedhz8zj20vyjqd99eei6smm6zclyfw5bxaslqsqlk7vyvltde8h3myedzzgly0iqq9m16qil6nfbldc4dqemtipn3ig9xap80lgj2ju89yeeyw0eqkzi8g92i93pjk9gd3pz90tjt58q8tlx087le2u9wf2rddtw46lpwzxcfs8hj5emjpqhc834e3btuys1pvzvyzo30l078346uop1iufv41meqf24aj0k10uzkn2ie5s89vfsiitj2icgkhqx4tytt2j231r4t1x4uffj5qj8hbtyf724jewfz16kzsdfh5gd43r0g4jjdz2arpqr5gw5xb1s0obtw0avuld5m4ji0y0xcve3eiwx8hp4djetjdeyvpybw8iohcrnnoe3qlnrskax34l7msod5alc3k2tk1d8o9qj1vc0fwlx4a6jrjncens39n72hfg09j6r932lp07b90ge07phvhzt1tzwt6xzq49ibyr0bbqsbd73sis504hlxv4xyxbrimx7elnb1yort4jngol5zahmicvbssowmkabvl16u',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/credential - Got 400 Conflict, CredentialId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                
                grantType: 'AUTHORIZATON_CODE',
                username: '7tk4umbpfgn8ak5rvxuqoejibfr2pb8p1fso9ytj3z1lnrujilqxqtw7sz62rg4ycjyc2830ne46npr7euwmljbo7rv4yupaahyfoas4h9am17hop23522ubp6sjzbq3rgyv1mq1gayqdl43v8ag6ug9wehaslk4oxns51906ty44nffymgi1etmvzzcbchz7ds5ea170hx578u8jvg855fd8c00wcisewh8e64aroin6ptph3pc7gopz83g7uh',
                password: 'pdhct5n7cduyxhydj8mzkb9lniony9z669ymv8umvxjnv90cte2xirt8rh4owv7ch49b8v9r1w7gul66g03s7f0vknfxzy4l7ead8avaf7gx43xfk9gg9fhyai1iz7ci4hbb74fqmpbx56iwwoyf13xoojcyq9rwp1tjkl7zqr7jv22bcyx6d6kuff5hs8tcafw3qgm6v80dl10wpm3nugijhtoopr2qbizmz49ojg1o7i3dfh21fg4wu98uuk2',
                accessTokenId: 'a541c23f-4449-44b6-b83d-f41146489211',
                refreshToken: 'Vero expedita deleniti accusamus cumque amet consequuntur delectus quis. Tempore qui dolorem. Vel et adipisci facilis qui quae aut. Quo ut voluptas necessitatibus et quae esse modi sit.',
                clientSecret: 'lydonu9dzoxffd20898ckv09w4jncectb1gal6nc5vdeeikx17ivmb2hyyj83gzhiv959tg70klq2strzf1amaxneo',
                redirect: 'fpyxnxl8smlfn1mstyk38rn5pafcvu9sqd69s2riumzdczz06un7sc9e7o9ebt78x8eu5ljci08bj8ohn060oy9wja6hx8j41spsugotx3ve0ov3soxfd9zhuurrttqq9utnhmhnejprxmt0fa2f6wk6ftzdiia55ybk06jepfema758octfqtac9jwtth4rwpvcwo2bsv40u2hzvw6rg1z0ca2ct3l8w94loeb3vjl2z8buhht6o64z8m448rwttnomf7fanm8fbaburoc86iu70v0xku9pl7hrh3haakwjhk318vu17f5mkdqs3r6bwtugb8jkh0zh57x1o6zqd0gp3wa80jwsoe833ho2g67cfd1y68enrxlogjo7bgui5vlhtqne47k5qa7xlym9ncxvianihnw2zde0pam8h941jstyi4emsuxh4fnljhbas6jjgi5mcp9fvmpqud8i9rpgxta1hiquyny2ptdfhekggy6asurf7dtdzb3hasiri5l50o03af3dl1j618uvlfp84zfnho0clbeds4o9ndibigpxgjxaffx2bhdkvwh8viuwp5be0mml9nrnraf2yj9hh8b1ngigjw8wzesm3zvkni83j98a3gbs2aswvy45nfrmatpy8co1yuvst7b722fbb5jz9siplp3tv8nrsk7200nayzgm1f1mu7ewil6d1i9o5zawv8q39kuph8rjmr9o9katmn2tvy2816bxaxdn1w5bje7wilkeluhvlnskviyewfxoehyv3d1gck6wq1ws6s6jvi1uayqdk3yqyygp252v8yimmdttuy27nbj49we6bgg57luu5fhf9fvf7kf5j7zor7f9fsyve9862yntsapivbeiyrda4zxrizo1jgzy4sdsa7wtk0ywv4uem7upx62kegyypmppvhsm6ninvwnn3vmdobpuu9z542tc67p5p0bpw6iz34e0cnwpwmuui9rebkxx5iq1pt1ibyosg8e4ilhdpnuxfr091w4nk19v8qbx18wumgpwjbba0lew7nxw8jri924kj3p02tl4hzh5vkm0b2jnowr8snl65l8zi3ypt7zwwu0a1p361mikxddg5g2m9sw1bhk5y49od1wc3agzq4qdfc9jq0k0epkfj16fke6mwoj2ufuabqek6lianrpwtj71nuumjk4oxmypw53hdt62rnpnsr0v0ccp45lk359b3wjsto9ho92s4gb5whoqejb70wvcnjq31c5kr3mwedl2h1tlal8hxcio6flxb1zfg9h5bjfv15kgd2opikdst0rw4h3vxrbbswz6quiodpr90elcn1kck8qwexnoi6y6emqoaryv6jd9ka6saxl3icm9qt4c44q2crlla99ktlk3o2i1eju1l55jkkrx56b1eidmz5kyj506eoclc4htiadfjrmbjg0ee8aef8fjvsga8mb3xqaqxygf6afcrlssjp5vpisi3wryuj59uhno03o0uifdgg3gm5gnv5639ae33qmkm29nzshsky6ysawbtfctb04xdvzqosj1oy7lkysaz72o396ffh9fep5ux2nq07p5zm1tcaoqjkc8jzecbfnrzv3ebjb5g51qb5onhrqcrwvgr3t6ffur78jlzl6390ff7mryvk7vc0b93b1n7grbiqm0nxxal1a0c2bf6v9eq86192bbplsb85wqq36s8esbdsopv74kjlv3naucew7zv2uuwz97f8z0lyhhaaqbmv5i7x4ashnqhx6wet787fblvxqw5zuirsz6twfze51ac1giojbhk34p0l0urjiqw8hg1y5rwd9ad5a32vh32v8qo6gb2drxf0d3yz8rajqgnd4v744sf5ckz87y9jqqn5jpy4yp50fhzxwk2z0ok1dhwyjzytbxv8n2zeylixj26b0axpice4tmbreqrztpguc85i4b0pt8ntxwsefubd0s15oxmxoxwvavaau8p93e7e3m6wdxcsn2dastz0b3efk23yhl6bur00fmat6i22849pq1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/credential - Got 400 Conflict, CredentialGrantType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id: 'a1f70100-d23d-457a-a90b-3958ed92e3ec',
                grantType: null,
                username: '17tkyb1knr0d21obaoe2xv4c6givql47eawqkmad5a9szqujwx4r2ow87mbuxqg02l5y2ty7phyhiyplhff9esw5yq2whdov1nu1kp3fvs2qppzq95y8ajmvifzgiaxkxnfpogms6q0dt2grmcj0lfdqa3vx9l3dadyic26wc5c2n5rqlugf00v65qlw4bmaz357xhu6j9xt4v4dd4voa7lw1qy0cv7ss8rqi9edcku4lugnoxuxumvthev150t',
                password: '0tlej480fyhtr22c8xhdu8wpfmol5ppnanif4gc4xc9obaz7qaztclca2kob738smhetktwd0bqo5jm07ti9iw1x6tjgetfonkuqjqwc3vcnnisiok7ph7pbxc1nqpcmqsh9n6k1hcoinz965r4x242kheeljh64zvpx6hrf00r9gb5oyz5uycg6ly9fru6f3e03lormhjxsw2ag1gu5omxq4utji7in6j2thxejxyxue2i70urczlih7y2aqb5',
                accessTokenId: 'a541c23f-4449-44b6-b83d-f41146489211',
                refreshToken: 'Minus unde quas qui accusantium magni quisquam in rem. Beatae recusandae consequatur repellendus nisi quidem eligendi sed nihil voluptatibus. Rerum quas qui odit. Neque porro laboriosam earum et ipsum. Et omnis sunt est doloremque sequi officia id et voluptas.',
                clientSecret: '0rgvoiptn9ai9qez80n1t4y82t12st2ogzmreinmm7p26plf208pw3281ozzqjry2ozom5gnp64rdssgfwzguupbnx',
                redirect: '487o7ooz4g2du00467rayp4y62vb1qbqg66q9ifdnzwdld4zf0u7u9qzy3s4els8ujs49uwkoxot2d96g162y19nc3xbillzwzy3bjddhmjk0hhbh2uzka6m2nxj02zku7z6orfhd56dllv30hv9z8hhrbvfixjkom12ej1vtl5n41l32ea95zoqpmtuc2j8y1ni3hdket2ywfysumic0wn74un7mjze2sqos6ptnpb9zf80xbirrxipjaflkbk01i0reumg5dvhpxo3n5jzt9gzpk553xpln8co9upppnegsehb1plspp67oucf47e3c8iygxjzfemj7233dkyt5f0wakezznwdymk04l9ufdq8uf10f185kpx44kr8v4ijy6qt0o9eg30d69h65ytskooq845azcp7bvo58ic4vwz6bu239m8a7l50ee5fx7y5unm0igfqmn5tpoyu30e1bejw6ouihnbewqojctonqd68ux0wg9iognyq41pn4sjqv7hems3n1nxdlvvdrdosajcsmtx2owjgl1yhmuyfvt5msx1gr29roy6po8mj4txjx2xd53dgz2rfso2r4zc9wwyw7019eokmortnczhhbsz6e8olva3p3uxg9cbp4ltwt4pq7ryeirnm38fjeak0x94eyrj5gypdnlgi8sfbgjcxssute3jt75l7gw4or1znru65zn7lgmbmo3izg84wj6b1lxb4z91tmt5ihef597nv0qqn8qp600x1pkirr9hubx339lhk8byazh4y3zhxvyk9m5go7y610i6ajlw5fob8yh1tiamq7avehjiz6el3d5ek3f3rma6i7q7j32f31tnb3n8nv46g9vc8jfowigs13n49o8pcw3kov67j8hls1ngg1aotewtb0ga7xqqi3edoceb4f3b52avgcv3pyv93itxjmhc2hymmwajrthq3nf144on9ih69ogrkc0z7f3parkii6opwjde21k9vn4thza1mkyf6dphsd2rg2wx1cxhtcj0fa4b4j8hwfe16ijld9mhyoefd0zfxeowyz7o5rzc3auwkkgbu22on47gbivmpf34jmsuf4rjmo5ez8mcrs2cbjvsyyvi29brl7jjj1a81b80xy4nor33msnn3ose3e0dstvu2sgrj8zu0jb1az5luzxblg6lu1v727518bg4gq0n9nir5uuxhyp49ugat0cqdx230g0h5higmt6zw2018euknlyxgspp05hqtgajaw3rn7ys5n5hwv2j9ju8rizvelvh8vf4b8650g6ezkhg9cfxyja2imn487q4lm2728av4rbs3h3dunnprcjm143gf3kw3r6tkzjoh5q7xkaxsxhxt9ahhpxticc38jnfbrnfnj3u7sw3lmp3yvoen0ppk8spxoiw6yvr61cm4wo405xgglzmxq12dmd3vul5mbfqoqi9nnpam8dd4o2mguscse4zi0a3f86xcvy8knvcytffweztwudbeo66esc4o3x6ci9rvymdust49f1xfscqnbiole2bv09mizwdxy54vcf4ccy4u7dlf8s52i4gye9ny3nhg5e099neo941akr93f85j67xfc5zqahe5ayjf9gigo0k3709c0r6rkqe2qpb3co8ag8wp1nkamm2dgp4o0pqif649ml40tsmiwhtqkhen33i5z0gvdhmohf21aa4tuxw67gj44ywgvaipqur5n46i1035nbq395ckm9af100676zf2sgxxme9vhq0rpysgiyrmrm8epa4mda3de40por4rrk5hf64tps0lffj6pvjfudwf4kcg8nrd6iqx1y3ish1ko0kfdgc88gl4u0bx5a1n1p9nj9o6nkr1b8gfpc64x136bejaxtubpig7opzma9u6zjmbbdg5icdwn2iryxkw5m48k8er2cdvhjk0o370yfax68pf05yze2fm1xre7z3201w1f59vh4fkiklnao60tg4ma9zo0sqo5ynjz73qa1ll62ecyttoabc06h3aaba53rk016b',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialGrantType must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/credential - Got 400 Conflict, CredentialGrantType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id: 'a1f70100-d23d-457a-a90b-3958ed92e3ec',
                
                username: '55q93e787scd6z7r5lcpnofxc5tn9kydeq3n9xk9res16za6xmd9znioq3sp1cw1ypuqatp22spz5uq0au6swmooe70g2e4m99d5c7f9duhpoz5uji89mgm06l6oy4uo16qpl24qj54m8uc0niw7kuka1l0y2z3n8d2fjh51bck1edc3owvkam4rxelfacr1ikgmzyu878ci0xfnxy3xkxx2ehjaqgoe3f1kdvfsyslxi809tsqxsj3dhd1xkpz',
                password: 'g5hhzio7icgt4rsle9ebdcgbw3jza3zw5bjf2jm731419j7xfa4b9ha39mkul8seg2ftfh9py8yoapl4r59rnhequrkovs0u7m3tdx8ku4uh368fjxilhgbabj5v16igw15iji4oakrtl19xrryqi2m5v5ej2o0c3genybr21gd0sc0mbped2yb00klt3ecjxm51b2w2vqddbc5opy8w0oms5164f27p186ybxfg874vjecmjn62s4rd6i0qh07',
                accessTokenId: 'a541c23f-4449-44b6-b83d-f41146489211',
                refreshToken: 'Delectus vero iste recusandae nulla vitae cupiditate. Sit laboriosam tempore possimus impedit voluptatem. Aut et cum esse qui sit saepe.',
                clientSecret: '0557xxryknapqogd21kd90thvvtxzdb9707sqe35cdodt857b3gzkl5zquvogyzympg6rxszyji7evhm9ou9fqvv16',
                redirect: '9b39skp1src51bo5aohu0qfyw8dt7z988ae9j62y0huawis4pfen86sanitkp5vadbkl9vphjzer4e058i55vrca1pg89yoyutdp1uvdazh4ppjic39szr78g3s185qifvf37q5prgfgffhxtw3ltaampyb9te1uyrku170xj8if3l9x65xtu6onitj490hpuufjjsagwpasbjq52fufq2g4yyoqyvlx9taps7syshwumudfgtvmp21kardt93cix35roas6s7pala69i9ajz7ro7mgtkvmyslr7gkf5ggw4i7jmqawrl1k1iwapozzcicz28x5sth6p72ue3ugmktku1qpnyugsm99frpvtott6ct4v61i1udlm5b4uj37ptlaej4tvvr2p9hxm7lg34jo1y0qyrszter0j6vvak8pdwvkx1six2cpzwlg9btpess9is59gnb8qkmxdqszt93nsmmvwyfeal3sgfn4qwbmm1kpzhx4f6m5wdnk7615zgnmzkbu60h46h675cbgi7g7rbz9jyyrgi3615vzc8jtjowhsfhozf5x659p7e5t2smxim40nk7landipbe0qydqxlovmfl1ekreriyvdpfdwkw0xl9vlcajpfypkkqwc0llcniovrr2yql0scwfgda1w33dnthc3hj2x11c9p9y571ux0cwd5g2zel7nfn6k6ezj3jz7afzlgg8yevxoeckzi76s6mx3m0ygu6nihqmoot4v4ltlulet3rqkhf11q9exmb4slt1czwnfve6fkblat33tf8m2b9uxomxww5l9ia0f1j67wy8dqwr5qp72govuslbt7w0p4ym3cgn135ghjvk2czllgu9otg7fb5l5s276gvaiw3416j0q65iwij5xr0r4dhou9fj6ej1synlv0zsxocaji357y3jsdzjbt81o41okuekhl3if78u2qj2zjcycpc6wd964bbjaoxo6nrmgp1mlewezk61lomexesffzfj706636dxwigtvnky23kacq584yvdoehop040ykey5vh27pi8qhdiw4mse0x3gymqcwx6prau86qju9328gmg5bm0ypz09p6xw7vn5vzembnz8fc1ow6vtnxsx8mdwu0oqctsaphucizb8cnn7iyn2pj0dg1nuhvyh5ikj32pxfq0w5opfi5m5uc2hz6s5sjk69wnvzmehx7u31j7vnqmcarrsyvvwvjokxbn8sf08jtpnvoo0fywriwx8dffezvgb53pwtse5sraklff55ppgw6r1a6x6z4bua8n7ylnd6vn9kxjyz6jy14y3xt5lm9fqnwbic4w1b7hcbz5c5bol0vano8lbcxkny1snda95juf7wjn8rjnpyd649d8x2mei06b5lbj82svjdw9cuy0abiyok4qqc9vph7kuseq4tcvqzux3uv24olffm2kz9wwicchvjflyokcyajcboaj05zj33p83nfntqp4y6h7mky32g25l2xbopv5s8ysdtki562ibglr0o81gjv78jhv90rdezsv0ozi61lky7aw0fkdavafg82pxd964j3eb985lfhi1r6okoz26gvpssi3fru1z1odl2zciyp5h22snyu0t77ee63lp2u5re60ckh4ulzmxpi4bt8erpir8j1iu7xz392x7sskwbj0kg6q0oqkuavya8rb6j6mb59sz2zc9a4dm9xm183hkkm5odum7ssiekb53s8sl1004c6nl1w894ncmdtvfdkl68vn56z06dae9etl3xnpjvo13wes4a7pe7xiryzl140nbh558x3kbzx53k74fl0b7o4y5male8rqbut2bcrto8fmsa60dtv70hnd303fbugb66e40bpqgzxg17d8h8ha8bd8kpwwnqogbocopka1po2hyyg7ypn6b2q8yrnj5avo271t50zytafiddr0xn7xzqylw1v80vmbzdf5ul5uj3laxfbvh40tyz8vkmrtnavnb5wsca7qe5bd6ia6f4uf3zfayjliw0iv2fui4nhq8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialGrantType must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/credential - Got 400 Conflict, CredentialId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id: 'nhvwfntvxbpf0p6d8ddl38twz7b0mriyy34mk',
                grantType: 'AUTHORIZATON_CODE',
                username: '73wuep88altzra85tx8qoagjku11kqqdvw8m9ozu7b4izzf6kwt7zhkyjf143jadzhv3mmtyut42ts74sau5eo3thqhwbhny1exjo3pwz3540wi4ujfcl776v31t9sqdb8qvdo5odihurkha9frrehdahsmbq66x4c3aq3d0pgz9l7xa6jzpdg4j8ljtfgn3m20l898b8sqt9no1ei515f0cxtjln0camrm0ov2mfurzjlk7z7u19u29ovoat2w',
                password: '3fh7kd46l8jbh4ocxy7tnqijvjnuro9axjrvnlmk90h8bvt477679ob3kfehx58joxgirnjrmzpamss2ak5wzwm1fja1ymnsent6fzh7lau7ksa76opmnsq9ln6bilzhi5ei3mak1ebnh1jtghiyzd8m607pk5zt3lbhhu4sza37yscp79hm7mvn7by98g9gzt63i07m1cjkbse0656628bi7xhdpttiua6nfre2xvj8ekzh59xm4ae6bcocsrd',
                accessTokenId: 'a541c23f-4449-44b6-b83d-f41146489211',
                refreshToken: 'Laudantium sequi numquam autem voluptatibus. Quidem perspiciatis doloribus ratione iusto ab consequuntur commodi veritatis. Quae soluta ut dignissimos atque vero odio blanditiis in voluptas. Quia corrupti rerum consectetur ducimus.',
                clientSecret: '3k9ij4zdceyragos64vjtp1fvq5fwuh95ky6li0a0dpnyxkg956agpmn5m5vcio8bktsnxjxirk80gizej9dx8sbiu',
                redirect: 'fxa3hazhsuv3l3fxqq2or0n8iblkeq7c7mgb0z4uay7qcmn7qk6vx4f7fq0ovgzpqh1vbh9v7fozezj7n78p1c1g0va8ohz7qmqyqjiwg7fopeyfu97oa6g2d9giailr9t5oxam2blsb91f8tsd5dft07tn75i7o5646mi9ok26d9ibs59acccpoc8qwhg73sck6460h67stxbit8g6s4wqdvs0hrodv8xqcgz4xr71asv0bfjoxya4wt0qq871na6xn23c2txexsyu7suvl1jweojzeidqm57wtwhrtrdl3hhmlquj618ve0ybojoy4i0wdphbn7yjcc29o4y2gzwkacy2d7qreyb6l0s5522kl1cjbcqf1l9yfqp85f08xxcopzt6kwiwqm6emdiqqtghlt4h57xhiy3zx81zdma88mbhll5z6g9wlu4xariyp26bkayz77vjytnxymxlzu4nmypj262zk40188hcwnkf5rypr97losyfhzh5orkgwd512t840n21w23n5iw7c34wzapw79mvbd2qccmev1ckjaa5s74lw7llbb17pwzi3lhii2e3sneeft5m49dbplocj065ttaf6v9jftmltvmvm1fh0bowsqnmhomaarjugfwsetqne8u1wq2ynutllqcchu91nhkitljnmyagnfet6km1t769u3u1g7v3ynmxll2li5lt59bo8651mihufbnxbxkpa0ku1msdzcqdogdg4mfa9koqr5ydf7ih698jrhwxp63dyja7jkf7zdrsxjly1y788wbnw2d9c89mw2y0gilv8p7z2wl3v4abw4d8ku59fdz5d3q9ywzypjyho80yj912hdm1cydjjfzjdvqptklc0ylh1t4sckn85mhekmbbxo0ukc5r8btsm2507htteedtt6g2stfjftdyyd0fhq4vpyqtandtnltofrez74qbjxhdzmtpskrfsi4h82c8mnz264pdgh118yihvgxjmhsch3eei46b1bsduu34gyqt1inuvqmhlzi1tqmz8oeosjsnsfkg56t4x5auu5eetnkogb0gz28g01pq7ee54fcpcdegm2lkvb8xfd5efzl9kx1sk1havjq17lwsbtzydzos8sn5h6fyd02nhb9xagmugv744tbvy1oznxxe16ca5pt80ikh95bqeqg7j8cu6qfxemr5y9m7o1zwrmxh2hk2d2ykhmuop5eepnd6wdbg3ipkdmrtuq2tscoloapp31ug4sexpfaybuc237v0rrenlgceplzf5yzq3esi6nr6rzbvwknwvi0uxxqg6qisr44bhoio7076gn4xrjpoeexy7gy4uufyq45rvam43t9kfvikr951hnvenk087ewau04ozmoyglbsss3vgzwuifn9ahrdqxmbgka99i5qpl5tqo5xcf33n8gv1w1axnrdkeskmuux94j57lckwwmkpiq1w9i7pzamydj5760n7762wmhr5tuzj73w2hgt1xmdaqz5jponz94dv05uhogedjdp03qw5o3wx6saiydjhb2jlghtbzkfjj8sny8hhdf4o4b6c1doi6glln213vxsh9e4c5e1jr7wqn0j65jl3ac5xpa2a4so0bp22oh6zisjs63lyf490h9xl6a15r9yx7vy7e0yjhg9rhi1nkg5gxm9xhspa1ox2wg8b4293hm3pp3uhjg563age467swo3329okotac6y755d8mo21946sh75at6y5v6ztsjyyia3qx4xbr7eapyaegtgqnslz2bpe0e1ma1ls0dwa036b8y75ztllsng751p5xfx3fstjdeb221255n948okyx4otbnq7zemk45aoja3p1rky2j0cr9lz1383prloxycl3scevgvfc59u17whal9pql35wdfijl362xh6by6whx2c1dra6nqo69k47jbelf2tjmhrcju751qf9t49zc1wnw2eokruoar252k8grojw64yrxtmqy86smurpa3xfk11jughv1jeu9kyw7237xknjlwla',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST o-auth/credential - Got 400 Conflict, CredentialAccessTokenId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id: 'a1f70100-d23d-457a-a90b-3958ed92e3ec',
                grantType: 'PASSWORD_GRANT',
                username: '3p0nnpv69pj43ybuwp4cyeu2es5yqmw6b5yfbui5x9c6d2ku3q205b9lqic503jc9dtl05vghfh2gk0x5thzbnov1khaxswn72r65y97zr7gjb44eze5turfnsp1lpcvewr5sqwm9dnsbhsur9av33ilb0ykyz95x3aqjwxhdaf7mnqewscfygizxo1bn150j2355qlbxccslmzegvs1i9k40jt39s7uwx02ez3gdbjh47cozjcno7z7kukpuen',
                password: 'prthyqbj4lbeqijzbygf14z0a6p9yigd9sosr0nscxg1gxpi4yu6to7ag9wj4d19vts8ktfxxlclfob6hq741ebt6gan9hzesrc7lkw11u7nmk3zz0gj2z2l51541p969qr2gg144258ypsbjm37n3oquhj6rsi8tlfhmxmeherxuqy4y0599148pn8g2i1vn3tum1w9y55n5jakzv82oo9v8821q462nngby2aboh6dw5isssnlyjwy8ueveo5',
                accessTokenId: 'jty2v6tdoma1cjdgadbhd7kfqg628mkgzlb1h',
                refreshToken: 'Asperiores molestiae est dolor ducimus voluptatem. Placeat reiciendis quia et dicta eos. Quia fugiat dolores doloribus dolorem natus et pariatur aut quod.',
                clientSecret: '9ai3ht7knakhec9h9ap5xna0lppmvnue82p4cvgfzjsc3hng4r3d3aff8h4kptysq209oocodfmmd3wdscj20lwcc9',
                redirect: 'gbkirou3ob9xh1v5cuk31oj27kxq4akv2lfkpjewiqmzcmsmmbv9ol44ofw0lo561y0r69xafppqmg8znl5154du2aw35msbf85iqlqg0u799rmu66mgg5scf02ui0x6n3gfz8h6q1hwd732uvlrs9d0595kp5trf731shk9votfnzgt5zgvnc94aejjm4u5mw6dmjlrrhjhmcz8yszevd8gxiivf0knza9pgi4vcl03au8q6vxxbqcgm8df8hxth2o0gi3cwq5b2633q6bbckneyk7b0q09xbmhkedy3iuwgle9ebw7rrrw414k1yzbzmbx4sahtflldim3wudiev3n1w9weu1w6tsvt37lvvp8luw7csrgshmv4eoadp7neqv7l89epbfahlqmjdufbzio4fcxttrajd44jsxe9ebiols64fh2jrnjxsdfbso2d8kxfybwxuppnmshznxucmxf6nvernuzrvle32zxhfrbom7yc4buctbeqi1o9xcc6epzmknxugrws3bayjk2nxdwyjy44j6q4zrj6ispbn86n8r4zdc5vrgq9xbnzlhq2cvvyxppyvdyhjuy4nlhhlc2biy1c01zmtd1cpzvmtuazu044x60qsgrwxx2ho6amqht4vhrmrloqmjcija04ike1hdkm43lgx1udy30lg6qyjq7hvgag60fa3zsi0ojasdlw1ctf4tfxk4cd5km1um85oivs0916swsg6ou06aysatzazauretx0h390q5u99ko2buhwulksur5qczdtit8ptjr58xyiry68f2jn59qc4ymsy43ty8dnuq5gagg248vajk1meg29nylrz92ik2axlvmcr7xb0r4ryr78eicu62vtkvhpuqbweeyi6l1z6f40j5htwf0pvh9ddu5et8saakl491nxroxtlmje27kkxfybo385v46x1beix2vjgnfd3iygde69dib588dehp03yi95olm7bqp8khn3m1buvfkf4exxe9pi8jrnv9v5bmhfe6s9c9zoeb43h45esiva0brt8qp5m7sekfn3uni28oms654sdlzniiy9lqjo6798m3qjlkdb6k8964jqxsjjbb8heuizfi84c5ed40hgrjxle1k7cw4dovl2b04m2ec2bju9yl7nhbdeqxct5mk51pywwmueysji2mduzu0lyb62r9xvf3d53h1slf6peyupt53n6tujncrzgozounnb9cs75la3wics4g5rrdx5tpj4z6wpgz8xfh64exu8ky802a5olertzoyxmw9r83d23c077v13z89u3vej7vt1n3up37spmipxfp4fxajvsjmvaxnnrcyjxfzas83pew4kh0neb93cc9lzww5u8huqznq2b1wag6tkels8c2xcehb6v55upgwjk8o3xu1cng1xlr29urshj93q6rxz4rgbq549x964z17kz05d065yezhgzkcwomwi43x5vjs9jewqni56tgv6vkshongs5f2ffdi36uke3uhbwy81hp4iofzez2iyq89t22m3cc5g07th74h4r2oqsbn94czxo3znsj6vs98a4n04zc4smenahko3g99rdutafi6x3vzuifzrix6toikvtnzmagdaq8xle4vpdvqdjmmyi4recr2xhluuv5w5wtusryv4n7ihe4iele8l7eybqkgmztt6uh4r3gibou9stpdwewhaiptqc41a1d4gxx7nge610w3v0ngvual2zflvhegimdp4lj535dt3mtp09wd1lj39gx6suyn0yci5axdohp8o3himjvwbv9h4wpl19i13wjrmhtf8zajovv0jtpdq704iggbejqwtu83kaozk6l6rag9ffoeitf0ckrlfm04sjorzf6q7eu56fwwu76c9tkog9miv60bmzhp5vasrnot7ybnecfreaax9dwipvcnmk3e79luctp29b1vhgc48zx5wglblzv0cqpsn0uwhwksvevd9xaoccglpays0x26q3a8kzpholcv19bb1gq43gkbfxn2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialAccessTokenId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/credential - Got 400 Conflict, CredentialUsername is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id: 'a1f70100-d23d-457a-a90b-3958ed92e3ec',
                grantType: 'AUTHORIZATON_CODE',
                username: 'mdb0ezfwaqq8i51wc4dgub8o406fvyh3v9pjhvr0tw2wl44gftq57ax5qocc551s3rqgo1xll3c350i3d6tc70teugkgbhniwrij43wirbukjfedq6oy3wql4w4xiy5w076nl6pvn50avehobmnka9yrrxbd4a4pjjr9u9i33edhte420995ugfn7kwu9ozm53tqhm3xztvgqwao986eho83zcsrz0iu4f8o1hexggidenvnnska1xxi5nbytrrq',
                password: '6q7drzldb9nwa0988i0goqysn65pui4zxtfb5uu9s9imifronmi8swkj8nq2yediwopwwelgigkdrjlgl6teiqyarzmm1yceg6n3t5z2sbzw6coym271u6qlbzaf3yn1ijj8dqgyad1ev05plcrmuakddmm71kz3xtop2ka0outk76e18z8x86r9aumr8be751sido38umrqxs7a07jbkbpk1242e6e0tf5ll2qmy9jfi6kkkozo0xpdp6t7u4b',
                accessTokenId: 'a541c23f-4449-44b6-b83d-f41146489211',
                refreshToken: 'In minus pariatur fuga dolores ratione in sunt. Quia perferendis rerum velit consequatur nihil id voluptates. Dolores consequatur rerum repellat aut et non vel atque. Sint consequatur accusantium ipsa. Distinctio possimus laborum.',
                clientSecret: '6x4ntdqd9hkhgrxf8wxbg59xf8g8rw51frwan1cqn5qfwkxpkmszgpoby1xirrc8olkx16b9b58o6qz3b8ka3pthmd',
                redirect: 'in5z0e2ugah75oizy36erlrz008w2bgusbwf73a91gy7p9imlcydlmhov86e2elqf57yz8a1m2fjkdmh6e9cdikkb18ofuk8299ioajzabazxz6wltiww2s501ramem93pt351thzea8q2e4kiukg6eddhiz16q4jrq8d0j7vvnms6lt3t2l6rvrmgjm4i0qgrllb6hebtcsqmy3512qj3b6hgksi5uwkx7bboog5u2c9mtx3itybtoou6ajma652xihrd3qtk1pshunik7xo8dryzl66tsdj0sm34ei6nk2m8679f027hsnla0evkbr36zztowhew4q6yckfee43i8phwm6x4u2oludbqg1dndq9jc3ppz9ox6yqt9eso9u82ucftueiedu8y7zggy2zkttfu00tt02goc9io4rypc9xlwig6zbsg6tmyykjdpare92m0819d7s3z3anytbnimw0bl2nie50vvw5tljjr772pmfzrqniabm69qbe8ruc6d8wyn9ayks5bdlu2xrw481lslu0mroaqfehbwz4ibsiwch3544q0o8sr0nnzk7ms47qv1pascl16zp80psbcbbftferp54ewkw7k1teclhj3xcon718351qt3a7guker1m4lury0kojuhztwqaamozacafog7etu6jemh9g1ab87taplkttcmbr3ohwbmns1fum2seryyuth9bnlr6efxm0rxfglt6k17nn7uw8ffe1p0uedljg8stvcrhonhttq87k7d5heeuhy8y94aqmbi18a592s98cayalo4u4u5mszgmvura58qvfg9bedalcbt45ny8rfr8fi2gdw8xg4k22fjx3bspi05tr3vahf8r364fsr2rrmasgunba7g8vliunptszrssn6kla7xh8ktfuvkvp5s3k3oechh8vcr4tq97lf2bmbzd02v1we3o74w58qjrok8gqwtoy7k0zxg5bum7b8w06r6zytqw2zgafg4sm75i5ilxask6hx4tmrkb1r23yqw40nrknjt6zvqmtpbl08s28e9eo20wactj2anws2izn644ylwq196ua1kzdky0bu9m37u4non9o8qyrfcng49a54dhqs41hpkp6i0qsmopuxcp7n407tnxqddqtavio5esqtnow7j9aojkwqkm8m4mov9ne9i9d0mlhjo2gacb3xxy1h56unxkg342bivfar4jmdjqdvcvu43l59rf0x4d0ew0hzncytnxc398a41875uu8no6yiav4p2fv8fji4ytgquyie18avpyr8vqu21zkdfjf23atocafc0jonbfdn6zn5iipfzmt4aeslidixtkailk9e9o32sisqifh9u7kefeuta8m0x6bhpu48peqo3lkvfq9vfo0wdq3oadsgk7wd2rehrkn3vh46owbm94etwpgh8q3cyb60p78vm5g0oia1yliha1t441pgvkf33bebsfx0eut6mu2gt6r7h851kl3ict8yahzsfbfu1u9uwgg9daze9hn1a2etul7ji8etzhka6br0cu454tmtfg9n36eox2lvnnwdihnrizis8pwtdig2ru2bt2lde9ms594znpv10596j6ye472tii5anpiy6v1gdsxhmsl4r9i7jwbhq5xbsja7m1dkg22qzsg5a4dw0qqxadigq53fg0p88h4e6kljin01qiko76uwrb1dc7oc1rcn6upzk1vgbkbaelb4bvn58hm50w3wq3qn5t5gticj053dcpddw2j0pmu37pln632gmaovkisnwm9aw8qdz14u5e5ku9s87d0thrdfxegba489ilvqm9jpa7w4we9ff903kgzbll9iuos79imvqjbitq9xac8n97q20teau0kmgebozklemhhk2yfy2310f1325dlbvoqpy97mr1i80xwt1h2b2ooi0s547y8h79ff9wcji0z3t56wr4sw1wfk6u4qiue1uoaj09xxxe5te04knh27ufceq41aqsypycnktx7f9v476jmu0cn2cz0f7j',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialUsername is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/credential - Got 400 Conflict, CredentialPassword is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id: 'a1f70100-d23d-457a-a90b-3958ed92e3ec',
                grantType: 'CLIENT_CREDENTIALS',
                username: 'h7qik7w1gpidwt2v24eymurbf34kbdln2lbr4o8gyhhmwv82vnif1b01j7ggwtonxw2jvagtmmxukogvaafakngdl8th0gogpowcvlh5nm457khs0likpvkxr4owi0dvttpaprpdgsbxknogcof4t9yipnjj2cy5mgmpbmn8y2d4mxgv2qpq2pprk712cvbsyxahhwspo3akrn30g2ko57qb4l4fvd4pfepycz1dwfvel78qou1q2h4askf4xif',
                password: 'yzr962239bagk0jknkz470dkyg5wk0ouc8h5v37i3xh0jb7th1xf1vnf72fytjc1upgc963b4mvzzevgqj6vjhlr4ker7r6ryrkbgyi0yut9ccam7avyevsvbbaq6tyey7eek9hqazhwkjdzdqinycjgg5bf8ui2okv6wjt20e77dsy6ra2npazr0hnooox3misdi85s1rrnrh0aquohsum2i1mb3eqijvsu2uzf52w1163na4dkz2m182k6bjp0',
                accessTokenId: 'a541c23f-4449-44b6-b83d-f41146489211',
                refreshToken: 'Minima perspiciatis consequatur est optio enim enim est recusandae. Repudiandae rem eos. Nisi amet velit voluptatem repellat error laudantium fugit magni. Natus id autem et.',
                clientSecret: '3dlh4zvboqdxnknfd07mb8bsiz2bw3dhl1l4qpwnlalfmt83at1u3nqes6g3ng2mggjm62gi3ncbpx0s3azopjrqng',
                redirect: 'hfg5dajkn12jpsgv1w8cxjm9hn6jb1ol13vkrryk25q1tpfazionfnb5rbpi2l9b0dw1rhflzqrr9gcap0cugtfart6iyi58xgk5cdblpjfknptq6ty3gyo39ddu4x92wqt4qvwz1yzflgocx8im7j87yx7ntz8oixmtbghkjp3ha0k9gp3n41j3oo5fh3dmmhyjmxdwiyguiotlr5zpaurdn4f8mxjc9ril5javwl11xpv73vz9pxj7sjr2zwy7xk1ujq0884zwcetdzzo7mb2t9wh4dz5ojrhwk9jz2dwxbhvtk5oavsdfr5b5fzqtblputx25ng9wgsixt2556nhlw2k1o6yl47n149nw7lgfzlz8q6uf2gkkz4kfdjkd4te546t5yyhkytt8w2mbj8pz0w75c079v6ed7hfpdqdkn9jcpjmvfr7ifqo21agc1k71sf6ez8f9gojqwhspysmzvz6lflw4dr0dpx786w1bttrfs5h6v4vb8nbcjx8396rn9o46b03b8ran317irrv9o7ff7vaynulhhxogos3ufynoo3nq8sjlv6kzkxwoek3a8484way3o2eoylmsh3zmmgkfjdr4u1rwchpakmbfea7c3i6osqi49qqvlh132inrna7pstfni29efxz7mxfmixx6tpnl7ia7sfxmzzsp8iniyiftsdl7xhvo61fvi59tj6a78w4rmo82brm3xmfr7yqq6wryfzrg4s955d598gctm1oivwkfbcieoed2fzgc0rh9drutmcdkx5htzfebepzohzmv03ec0dlsydqzhxkdyy95t37nbgzq8nnp0gjoovweg8m11sueznh8hdq43gjm4sfrjx7myzl53p6frstujtm4x8jrbrz5mx0vuqjfxekkmsvg15o3k7cmdqvlttwhlbtj1o6rzfatygpaxmmuwgrf0j4yhkas8ql1nyjsbyjrrapmvbmsdbra3wkczm133w3jjkw78zv8iluwqv7mvwm3rkqnvjtpxdeou7xuscea2yhl3pvhtjiw6fsvjg1k3y0ous733fx5zfl616isnpcrpjdegv1r9zt1ui0qb7k6y3vjxpk784tyci3phcx2zed94hp5xi03an5veo5wla1gcd73cv2ln77bde8tdkahc8wdmkkcg5p108hdee92xotikyfwwwbalifimq1gkd0m9rc4dvebircxows1sm24dj4bax2j94knfwb2gugwr74itka6xbw3u5wpz095o0o870di3oo3ehvvou9m3lb6l8l09zr95dtqt5s5i7tkx0127phtw4vmuwin7isaz1jt7d9ae07r814vwjn40we7rjs6p3efa9alee7ae0zmijbi7hr8fqc3ozm8h4stzmitgqg5l4jt12dtul8hghisp36jbqysiq7tbjvheaixax42bsn4pwndyt9ght06np4jdl324lqldrp31uuzkzzt11ymk2wh3vi2442hzp8ffdpsjul6ide4yrgr05a1jy3vimki8etmm2ha11uv6bzrr1zfdf1okxhi6lbfflccohxq47ojxv3la2q1hgy4dchljg0ofq8p70qlzgay07rx0x3jhx5tv2phdeg3irnxkdg40logsdh7gbrbsz0d6l9dj3cpvg058h0zpq0woezvy6wv9v8m42rm49i005t89x8urnbqqa7pihray7fkwbsh61kme4zl2tryl044prp5egdupsg79xz77p1xam47uxz2jrujbr4y9agt06ekom6t8lf3es90c60ifsqzny5m1vgybtq8wbm94ifg4yznrov1bs52sbvrc9ms7op3np6gta3w6qwfgjbeoze45zhcy4egw1oir7l9edttep9kfb5eu6xvi674g4f8cfnmrm8kbi3f8or3pkhtnpzwy3whuatcmp1cti24h943rh2v5fek1arfaddbsgdwoqh0k12drocv2n4k6l3ksxltlyizt3sclfmfekrn2prlg0apzhv0is2q19yre33ixyp6ido6auxfyudrh8xq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialPassword is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/credential - Got 400 Conflict, CredentialClientSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id: 'a1f70100-d23d-457a-a90b-3958ed92e3ec',
                grantType: 'PASSWORD_GRANT',
                username: 'tojlitijf7s2xv8baq289ljrbjo4vhhp7f2u4i8k40o1xlzv9liyk7wt1c1q54na2weg9rgzaf5q7l5x0hu7rd748qpnurt3nbqmr1o8538tsvu3kztkl9ufmi8db73hdpczf1c55ey2sj7xppls9juaq02qasetvho4k8h0luzytnb24zmi6yiv4qn8sa97nwalysajmvyjphb556mj2dlhgcyr7wskcy4xobtcj6cr78qe6t7glbtcpxtgfe8',
                password: 'wenetfi8vbtjptpssh01h54tlo3xq7smccfs1qplc6r1lwg66f25phqqmsd64zcmg31tx94zz47mkl54vgnmy7q68h0zza89lkd52rvbbys9avfnzutal2rlki6is7ccxiapvlg2c38kfy41eub58xc6mpor70dnn8i2b47aqchpy0ocryrlfhe7q8hhl3v1vmebk9w9trxa9u9cipsn6mqd5sabq8bacg4w5fm3znykldb349hjxjmw8dxm9d9',
                accessTokenId: 'a541c23f-4449-44b6-b83d-f41146489211',
                refreshToken: 'Rerum animi voluptatem. Pariatur qui qui et. Autem asperiores qui accusamus. Et itaque quos explicabo in. Necessitatibus illum et praesentium saepe placeat omnis. Beatae et tempore assumenda blanditiis eum odio harum.',
                clientSecret: 'gtdkgpjpftfs3l1y179tg46wba7st14amjw6vkvp3znxszzuciopiur1krxthfctm4zxqnygd1wm0xvq58o827sorz7',
                redirect: 'jrp6rvp84rz0xrgvcq8ro1ib0et0gpsy3ds9ciqwofznb7207fuhgq22djcj1byo7mhnr77jv4gw95voyazygutn6xhuvduuppam4ebuc9juvk6lq3kh267kc2kioff41eomgrfgyohjgicohvmoelww7hnvpc4csq8lu6y8wsax5it83nlosjjqqob4p9ok7le5regfgblyna840p0j3k4e4ip4y0ic703ph4xvclmw5o2odorrhx0iaxbm7d08nlhe04ari9fgz6hbfyiwizxm6gkxwds5ceqdpue6sd1g4zk3dvh526x71f07n08vnxwaof9g6ja4ug0o3rg6xxmmw8ybnum355bk1fh4arzs9v5dk2l9kpkhrh6jmpgo3lgzgefpnphy0jpvgszchvrgz9pjwi3ih5xwloz3n4pv1vrhze0pcgd57ebfa8y7419yxzlelqlzaa2x8gtei5lpyx1t4z8end1u6sk3o9l5isqt6igsrtx0qtcanjs0942cpuxf0ju1foa7zkivpzi795sn2zst1g2g7pi7is1dksls332rigyisdn0gsj6c3zp0lwdpbqc46896yb1es1n2zpgnlf9v2g1v2fi9x3jjgerbic5zfslkaisa3brd91kh9kamdidhiz6em8y6qgnrijlsbkr2ee6rk9x7spx9jm7lfenfueh6ji071z4g9q4op7g5ejabijdcxyn40iz6zoeyftbic0q8ahgbe250pkfq18uolg6m9kbor2utvlm95ld9tm3s012v1oaelyitrozd5w6r10xx281yexi69qj8smokyqr1fhoasxcxhhjosre513b4vpqlf88p7t0g0xc4zpw036d27dxbzp8jafdkcnr1czs3trnga25onyvw6rdu8o32yvy4v1xhd8econnmo2ruguwtnjcnm0z9h3wwce8kblckzjgc7xx25uvn38eaqyw54tfzspuk76k2kfjyk93khf7ojeze1k1g4ewbl06xaq70hllpoz3zgsdnk032y09xb6hh20sxn1ckukxal722ez6cqjx8pczwv3yx7s1yco2udbvb06ehhf1179osm262rjgjah544wecwk7mgxtwgcxsj70hbq08g9ep8c7vnjelaj9dy1gakgrert9phpohvojhqyky2ve03pc8j41tq2eetrbszrdzvg2j26pj3amfv22prquvjrkxmdc0573e7xojif87gb75cii37t71efj46xev7ymt8ffumwf2cdpm2jz3gtcxauucauya4l8o2jh4bjkejzo3z4eb5vvul0jxv7ul9n8p19v5gq51gcsf021jrdgcg02fbln2ejxn8r4a9w4zspusrnzxz0iyll81wbmnavct94ca71jz5lvqglitzndcagpdvwiak9ia9njhme0vh4y8lnxjibhf0h0p2iv2svi9z3plhyuezkrsl4q5cki87tuthjrb6lxlu7i8qy9kksz8oq3qebz2zqsp7mtmxijh8ijstb8kxq54xuvz1hnxub5u7fh3069ipx8xmyrku7cu634tq3q2ch00mgr20uh94k855kow9sfbetju7yci5jq1uczdruuomvry6g9f0taceg1o1uvklchj3su10smhuq8tebaxln68nga6daj4twwla6rfi16ldarmb4r2al7yml8gep0wxrrrt1lbl86lqfc0a01uqlcc2mu5qkmo2c9bw9ml0u7ygmbja4us4rvfh1wgxbmfdex023ryhq29puq34ylmo41r73c6nqfhh6wkekuis9u83ygl32ye7dgkpmeo1lo7wiuqdh1u7fj4ox3j6zjhvg9sjl43kk9xug5tr9dg6t4t0509m5f25rdbgtgz587qplqffskuf2gn255q9asxtrlm87noikwv3lcd5ltjccc6z137m7vze6wvvej8i2lygc08qxsnucj1crjpm2ykml2tozrr17k4ltafk0c8ndm5anwqlf4xehy26tf1h98qzazyksizbcnyei4gc2ubtc95ezg7gto',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialClientSecret is too large, has a maximum length of 90');
            });
    });
    
    test(`/REST:POST o-auth/credential - Got 400 Conflict, CredentialRedirect is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id: 'a1f70100-d23d-457a-a90b-3958ed92e3ec',
                grantType: 'AUTHORIZATON_CODE',
                username: 'xcsqoulmz7zshrzrj1t96y08vassrb5cn55z9mmi1bcns53hi4n0dvcdcqgrqf53tnhxzcgjr1g7yxj6vnuiljpcpvgh98foxuicun6hv9hocgi6l12mqn33q71c15nbksuoqpnjd4b0r7gsh1n80z7171jrh5o996doeub892rzbik6v8q593sixni5c9btd2pzjj8450ovmyszq5tqwpyh15meqzx9wh0oqh6w6649zsirk5v8tc905r9y0ni',
                password: 'zb0aez3mbl52ufikwnspgr90a4za74wkjvo3obz323g7ybbxhlvh644x45m3fa5s2cjug1d82rj9mmcgn8xfytu4mi8xr6s3wgmm77rxzo9v71alk96kcxjyvpxcld2d6pjhqdtsyzadn6td71ucs7319eoidvhp0k22yq1t74omfkowwih1n0swrjhl9y9jgl3p5ywuxk13x6ljlae7t3aaij7oskn7otjnd5o74cywadfq7mkts6por90bwgx',
                accessTokenId: 'a541c23f-4449-44b6-b83d-f41146489211',
                refreshToken: 'Optio sint delectus accusantium est sunt culpa explicabo. Molestiae aut voluptatem ducimus voluptatem aut libero quod sed quas. Fugit a sit iusto et aliquam repellat dignissimos et explicabo.',
                clientSecret: '4sozedd80s1b5j0ezpxg0jag15pouwwngcyi4pe1nqvhirua2i42cge9ej57kg7lson3hz8to25xvu7kpqt36jvjkq',
                redirect: 'ia0pvqb84oja2mh5mopxy2fl7gl7k738ahe6nkn4ijmcgxsh6q5jupvdmi3efmn2txt1rw8vye9obn552qv9o8qsj6ghnbyrid5i2qa2nrj9jxb8z0t71iejektaxfe8ho12hzrma7gz8c4oaxc5fpsm5avkfa30zvnr5vzx8ju7oaqhfd1h37q13kypfzeg1vnoisbb6oa3l0zz8nzq2q060ebdqiwoztd397o4g10k2wk88t5pt7207qvhy2020niqsb37l8xfwylppoppkte9x4fl2urp4k5z6o4lrctm8t6l6yvt78bc6l5fuyxd4t83k18c2ul9f0qwyzfgbcei6bencfxwz8kec6snkamip96wms5vcv4cybhqfvtpyjds91r0ahr1izdis9rb0m5vpziudx3zb41qbb2kho82w8261w6k0kubhr68rudw5jx6qadvov40p52r014t985nugiyflupr9bfmgr0esickgovjmvb086d0zf6seo13uxlq94l4r9n1nk3onyhweg6el5pjepttj5blcwsu8neawikamvvjl3et7en4dz05bmiu64cm3p9aiuywxc8xcjbuv0eb7otehq3qkuq3q9yygyir6o47jkf1equlnq8bqw5u5ash5kxn8u5ilhxc6lfv32ym6lpp9ieevxh93twwrf7wh65x7uxvosr8xktr28ww3wuzj8ng17gpsvabfyuzkmzf9cq2njozsbfyezsm2dfqvjxz9p08qrdgu59422pt7utt79itpkmlct983wpukk8z7ahmm6a7jleyak1gelhbabrjjnwfjrcgguy9se8c1giw6obf3fg0iwehd7yxp79shr9vcazxmkf9cowolgpsxrqwcg6crold8e6esr0hiqlm3a5olt94z55xdxhmmvw4sgnda7h54aplonmqn2sk2mk72lzwu7ptlpc4ddb84ljid62d3du0hvuynmshq0btuvj349375w32m7mw5049tdmvxtngf6ur7v70h4uqmoxwcyxp77c8k69e3cpnx5hvjrx2qz9icfk9wx3g64mm0m56lcazyz5hk53iknx38e6bua8anhjtlywj4y2htxxxc7hu9pcukhe5ghdgrf0qvrf4hkhskzrqfc3tvuq8st75iuak4pigytkirxbg1u8fj6lrkmj2dqebrxd3x4k0ylao98nx5r8vykd9c068ibletxwf9pthz1cskr2f6ni2uy1lovdt881uacgvrg9cfsjvt7ls214f289u3szb40dk61te207a2wkppzeqtf1xzqs8qz7ridx27nkw73fnkagxd1ypnzr5ow8j4ntf49lohtaz70l70l1zb6c4qajd0fleyxbx3u76eavea89xsfysjlmfg79zh516tk429hrlgg8gze2aez3klw5qlys5kr6ubrkqckpz1gmghu6dx8sy1qjwokf84qv4ud2ar8i5y0xf67vojus3ayondlk6a18v4zhsnpxiuekqp6ehcy9zn5ukfcvsjfel91exj506go6a40xsi4psoccu320g7dr5mkn9ex9v6hdx8xbe1opj6y1uz45hhyo0pjnpfrrbk9zm4n5ml6d1o6qlikydaraj2s593ft6bzdweay7q4md0yzf368x9u5ixienu8p9ypavijr4gz5k7cyu3gd0ccmt3vfuika7ccs62ycoh5jilnxhq4o9oz4fhrwi0uoouel3o2uyhm4npkh42qqv8po571hzi9ex0360iof5475jeooqx8eldankmrbwtnqwaj2awsfjor21epfsw8cwqteusymilpto6ux02ktufioodz896h0m8kjui6uyw4cb8hjpxvmmunhmk3q1kcavkjgrz0hefcn4w21842shanorjnjjmgro499x9l0enf2w0xwi6rtjhvob7969f4j6ux7cxv6uhucgao10s0yd5xs7fpq5txr4h8ax4twmdv5yjpwnmejwbrm601erso9mhlgd8lkw4qc206z6kgnkn22fykrfxi1a01x2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialRedirect is too large, has a maximum length of 2048');
            });
    });
    

    

    
    
    

    

    
    test(`/REST:POST o-auth/credential - Got 400 Conflict, CredentialGrantType has to be a enum option of AUTHORIZATON_CODE, CLIENT_CREDENTIALS, PASSWORD_GRANT`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id: 'a1f70100-d23d-457a-a90b-3958ed92e3ec',
                grantType: 'XXXX',
                username: 'bnx0ld8n35usd4xpyoer6fr5dy6kk6wauy9wqbf5k1fnpd1qa1woehhhr8sn4tgtyev0n1884cirntqio2bvn119pl9fnludy9x26q1k78y88olw0mllrnt6p8q298wydpncnopwnap9jjaxfoaeh3j4xx5ba87mc3i1qu7gttg9dgkjmdh973c2fo0cw2w3fgxlch9kyiz19ks5g4qk6acwjjd82nwxmpmdsj4rkngs3adt7u7ifwa0e10le2s',
                password: '0qvxi3sn1rysymvjopy1rn8ppfu985orckox81x2gw9t8toa1px5bxt138a3t7k89aazola572yzzm32bsluqi7rcybsd6gwb6l6aua7wysz1j6ih9w2cx7yomwvl2tdt88103fgnsnxatwzyowgrq706vk3vpb3g0qw3ct9ro4tcbkq0tqghah6fmnmysxxdyjwke26h5d3jt6zyhzfsg5pj689owsvxdaeo9rqbopvfy7n8ass7w0jy3ouxca',
                accessTokenId: 'a541c23f-4449-44b6-b83d-f41146489211',
                refreshToken: 'Ut consequuntur ea in sed odio asperiores. Sapiente repudiandae esse eum molestiae provident cupiditate. Laboriosam voluptas ut dolor. Id maxime non blanditiis est quisquam mollitia dolor numquam aspernatur. Et id maiores. Nostrum blanditiis nam qui.',
                clientSecret: '7oauh4ouu5ug98t4kcjdgc9c6f7no1skrag640rflap0228k0mbpofz910901rsgnwdg4bzj595m241kgb92xwq3t4',
                redirect: 'j25ipz2vl6k25xgexwimfwh1n19uks3aei8c0s5o3ali2nnagim3tir3ysaj60u0l9yss08qd7pvqapn7e2klua7ihbfh346s8fbrlczuvs6ck56ej4n425oinwtu5013xd0i1r7ywneawsgouzhh65a3wf9v969uxkw07eksz4k9cskg13nbtp03lom48xrs78gq1661j3y5q82amkeo5pegsukrfvrjheqg00tricx5h4p3w3kilicuf3wbq9kvrnl2y80dtbytupzgbcy213v6hjdqkjm55xrblub6t1yphxokudxjarhkciobzz3d8la125pnxowrkg2zuplgfjzdn6gik5psvmyk6dw4gysxv11eekkb0dm5ixd8mcicdl88fxxelzf7u24kt1cyo0rx4lol98m8joi3a0vm4gwd2xnm7cv0u86auvhohj9bmcbu1zbsqfjrg42v8uax7g4008l9tyy5bvaep7lsc1nqmvul31524a0yh5uclkxvi3qneaasb6hhrm508rmel4bfcd7k3s3qcvji8445hm395u0ufh77kn783q64if8ndu7p4u5qfqcs4la7rbezp6f50tdpo5vtmp1j834gevlaix6j3ptgrfi9q23ih3o9446dqxfzqz8cbe18lycvhu02puwgy1yp4dikr2tdfxluwesrwqiwfwfgo247vbqmg5xyj5zji8vu2oy4zqvqrjrr82gtkf8dnfnirvaqb1qjfipor8abdbu2c1f5tqe5p6ohhzmc6qhw8snfovpxpuwl08l5ywtzwob02kyt63f8mi59wppr8rs64wopd8hzbvovgv0tmu1h967zzrgf1a6kozxmys0kbmny8rewxmttk4b4s52e6gyzumyk9zbo4c25xy48la1yuqfsjez1fr78acnfzoy0ir5dz6ia0ebak03wq63s2d6gyu3u9q389uy7tla5ikytt71oo3j9fzq2qgp1wape375u8j1xdiw1cdg15ir8hsxrvty4v3kq6ns2e5u2m6w6iqmbao8xw5sml9fq9pb2eo8xc27hpxnb19y4yk43panxx61a3t7g3n1jgbkb0wt8ulh9s3rsf93l03t6hy4b3kky45fokkzt6j8jp8d7u1tzrzulgyf4s5d8fabos5he6dohylkzjacr7665jujnerm4tpg1xme77k5b4xenuer9oopccjv6now89mur52sj8dpt3cidgrwyij6jlloxtt28r97r7lzffjd8hwzb7iukoipnqha77m82v33cpkt1sg8vh8x5n2ys6emvopsvdl4h452bndvgwkrqa5r9x92jc2r2u4tv06f622o4kaws8jqydbr5srbui5vb7sp6kxu8tdl959jx9ykd0yrprjmpq7075g8jy0nc157trnhb2t3cysd9rrti0nwra8umy276fdvaa3kqsnvyaee241duiclfqtpfpjbo8od05wxopg17rchj9gdsmvyn37ajs1skl81way2gdb0u4mn6fpwc9hoporxq1js3arnmut3odllp1wwyb1cccqid4bg155d6et438a8mzfzvuqjqxa0nz3v7sttcf2q3ammza4530jon0ozzpue2zblwr7y9du1m1wlh38ypcp2k2bsdoozemu1n8x741v78ftt930brk0b9puguay9rygsk3xp96rrphyk0w8ttno4xn17ctqjr7sl64f4577xmjwmeigd597kbpqsjow17p5gi9cwpj1imvay98mih7j0cs5he8p9oqt3ihq0mh3b2ojbzvo2y8n4tfgqonidga2zoz1d1yxk1hjzqm7j809ep3gsc3axubzwovy0ail63cbbdpkw1j3ynywi4ul3egvmm8aekv9u64z9tliz6df9vbqlhjop7szdks9wzvsu66l3i51ivkb5xmfkvrzni7stgm9q5hqpyxqe7zfnxppp4c86zj8n4y7j342oxv0acjqn8tczocx8jfphr6k1zno3ffgnhw9w4petp87xmzceqxeko2ahndj8zwqo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CredentialGrantType has to be any of this options: AUTHORIZATON_CODE, CLIENT_CREDENTIALS, PASSWORD_GRANT');
            });
    });
    

    

    test(`/REST:POST o-auth/credential`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                id: 'a1f70100-d23d-457a-a90b-3958ed92e3ec',
                grantType: 'AUTHORIZATON_CODE',
                username: '6goz49jyvac1xlkc6c6v6loe4efuonz66329dh441rxgxnt69xarvyzuwanbn1b93wkvdxvfldgue6lmgla4crbkfwjlskvodyv7g5sl41xcrl66erhxw2mwkarhakdlr4sp4k0wugajyccyt4njnrldt0lma2xffedevyfzxa1eod0uqxi873ju9bneg0ob3jslmtm1xyvogv00rwvl2caida5wbi35a1wb80vvx6ua3lyalj7x0z64lkxc4c6',
                password: 'r66i23boeaohbrqa64hkaaxujt9hn2bw95l7boua2zmlw152zpbo27l13dfa9s5rdzwof645s3zl29qkla0eppr4junpjnmhwmo27019c0fvmtx8998a5cg85j8z4qxiazakpto2pk8fypp5yds5uepkahrriwpj84kp2sqfssz97kaihm83ueaqtyfcuablnfvy3b7x4yawahdxlqtf9x62vweqki92gvl48a7qs7smf6w157ghaj0vlleln1w',
                accessTokenId: 'a541c23f-4449-44b6-b83d-f41146489211',
                refreshToken: 'Error unde qui molestiae sed porro nihil doloribus quaerat et. Nihil asperiores dolorum eos nemo quo rerum. Sit eligendi voluptas incidunt deleniti quasi.',
                clientSecret: '4rlvrsxkkelqlit8g666shvwnb90hk536oxtqo6hfbvqyv3piv501o3v7m9s5xxz55q8hktoepj3lwnu2zlcxpf92c',
                redirect: 'zqx187rbi1td43hb6alnb7w6p3aobrl244byoipd7p8dectut9l708s4uuz7js0sz3dx2cxil0g1lglu0twvbd7yyh4mbg4nmf9yn5h05jvipdhy2chygae79iooo63guvrf06ehz9cghf079m0knrkbkik7qnp3xphsi4o6w290imevymk6plhrdt1g0nsma2e1m3sa5o7qrba513boa9vfrmcyjxde49mbl5a5thzu0yuqw5qnon8jdolmoq44vvxeumknpiypgrcq748i0quj9derd6l5bm19oc21sm8tv0lwt0dbww5ddnkydkuy8dq9zxamqb6a20fjud0rp8urjfl0l36v57w7obfd6ykv1tw3a263u9gv9uh7vfpssqtpukc88sylnh3f423841gtxp7ftrzjgr449lx07nv3dzuluy4k5s2v0988894izs0hokmfk94whj02uuolyy9wwww1m0kuizkjkad3pjv88xh70qbsxjb776k7u3s2pr73396vuvcigv1jdhwbhzxdhxcac6s27utwbh1ih16bxeb183yu2uvzueork7jsjepnvqwgjhq1daeq7lssdwxc6ofbzw5kychapl7y5uyfnlontjv4nckxmbrhdbvctxglt47bv1v4keskcj691e3zlby75eo6oumxsdv5h7l4t2t6i9mhodfmlyjrir1ocgasy50e5upzpmdgkxsnyiwifi23crrkkx7u2ja7mqk319vbdbq7hym4gogqvf5s9yddkyr6432ln1i3yxhg4h6gbiq4barbw5wnsiwvui8q0srr54bq1l9r5oxlw468z4aj013otpjk4xfg9qcznudxz5dbyuo8v9jio4d4e6ev4m5dwp35xiasmaz6exvfeggfv5j2rnousnfl9rxa09vjv77f8d8s9df9f4mjwa1zw5muy98evm514ersgban442rdhpfgoeys5gqsogefcc2d6anqopwhq5vymqc692ai2kqv6ikjzmw0dlp8j7fh6944a2rcmjwr99e62hnh06q8thewho5ur7x9psib5fq30g8l99dhffh3n9f7vg2x1lmzv9j07h16kigxghqx2jn57a87ge54mxgv4ezoqqsb2e2wjszp72d1rf227jb4xvx5h6s2h1o7pozshv5d8d5fzt4omxewp5acvhkazaghduwsy43f4o7xvt9hh14fl5semn8dyd210gfoe2fxkenu0npjqexvqbgcqvkm7quugkfsnhwx72h5k7882ujly3feaisb2z9u6th227gs5fcy0qjrigbyl8bonl40e6ubuffbs3yjaf919re2a1hzj04kt6coicwx39je8629e5c4b1v96964os27uck0hvwfvzjh1q0qq68d5a1piajnk2v14e1j9adxjhz11laqpt8ofqsuiwihj5zm35dns6redx9927r9xwfq3sdeforv0s2l3p7e70hbofyv7luvkcppkkfbsci9dvwlr2tw0idakczaxictpkhmlsshqgwge3ptfvj8kk0a7s91gjnzcwmf1qf7ja4cx7gjczg9qg8cpocydlj5ntnqb3qyz5180lu6covjykzgnqpl3lzhy0x1agrvtokcdlom5a5kslyy0d9his8px2z6q26w85uvhkw1ncliy5j6q4i0irns4bmuqgr59jwx3qn4970ox9i9xgddknvc6ijxrfxpgpc4wkv73eq0chwzuvewhl0lk1lc6ak8ion3fg4dj7cl4hdhiamzbusi3bykrp1ir8ukrdxms6qua1irknoafgbp5qhg1m2kja95nbn2qkwety3ksihsv5nl61q29q5u0cvrk2jkbn26ipyj9s3gurmlmjx92z5vpt2tmufepbh4d1k40l1b13tosbws3rwt23iqmu2pvg5pvjj8dyh339hxvhac56ioy2eu1628jmmt3tce6gwtrluvrxwsbfm2jgafy3mhn6p415yct32l392j0ulsmkeq6rvup3rg9kgigniem1mo7gxdptgcece7m9s',
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/credentials/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/credentials/paginate')
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

    test(`/REST:GET o-auth/credential - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'a30e0a51-7888-4607-8c22-54b54fda2422'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/credential`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'a1f70100-d23d-457a-a90b-3958ed92e3ec'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a1f70100-d23d-457a-a90b-3958ed92e3ec'));
    });

    test(`/REST:GET o-auth/credential/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/credential/50898b06-c524-44e6-b810-c56c0e3c6a68')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/credential/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/credential/a1f70100-d23d-457a-a90b-3958ed92e3ec')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a1f70100-d23d-457a-a90b-3958ed92e3ec'));
    });

    test(`/REST:GET o-auth/credentials`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/credentials')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/credential - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                
                id: '0e4e5d29-6834-42ea-9799-ebb14a0059e6',
                grantType: 'AUTHORIZATON_CODE',
                username: 'q9hcdqovqpwx6nugrnjt35jve0vfjoq5igs5qbdzypmqlrwzbegylj13y1fa06h6gx12nouydvkw0j7b58pq6q6clvp0hx4gle2qmxe1i39056xkjhq8v62eymfcaxa4k267grouu3mx6cov3le6qd4kj7gthdzhbf9v5xp4n2egh5hfi1cxomxbuzpbtq1gqnhov0grxo1ny9dlmi4vqw96v69u8jx5i660z4covjvxhxkl3r22qlwlb81lqvm',
                password: '7tav0uks5jb7ec4j1u631pu537l937ce2peam6on3w0ijyrvov3hrars5bz8i2yt6z8saiytbpikezv6i6qwrp7kxv6yi3nrc9l34bs7116hwdid5tbsw9fh2x7m3t2b2k9xeabgtdm4ocllfyy076tfyvo20dzvh45pl85vjid5aei5oagzs21p2ypipf03kgrwmz2r4xyfsk809odxloa0l7eze9i6bzt899y57qshf8coc69xajthd234g3j',
                accessTokenId: '8eace4f7-5840-4d08-9b98-7590815c8610',
                refreshToken: 'Neque doloribus dolorem ab ea illo unde perspiciatis sint explicabo. Aliquid sunt odit. Quod quaerat aut voluptas porro nemo sed mollitia velit. Sunt velit voluptatem aut. Commodi qui laboriosam similique sequi et ipsa. Veniam odit ut qui ea soluta et facere praesentium quasi.',
                clientSecret: 'wpuyvf1043ct6x2afcx2phochp3gm1bsb6z55n5ltu7y7lztqbznpc1gk4uzddkopr9nxbxdhvgecxajotob22hwec',
                redirect: 'rn6lqyg64ar9mujkh7lrren87afkfizq48v4w7e9psn3e6g6l7pswl2hna34ettmezygjql687gm0etdw2j1qhsq7w2bcv7lk4mtbtvlexsn935kjx3okz6gd1hv3zvypouiothky0qbukn0vfx5acbxvrq2ea5z0vcj7r7210fn99g975vn8aepkjccggypnawmbcjrsj5nkgs8qy0qe7mf7yqmepcr6y5nzntge7db860pyxcqvuujvvrjmzkxpf4hcf8sbe3aaobnh8ykukwwce4xp7f334ew348oxw81gq69xtjs9u5znsd3cua5z3gg2pdektlflpxcp5w9pdds8sunjsmp3a4w03wnh59in4lzis0dggrv8i6sfzizmtqvakhdr1upxacqtx3kv8nzmh0i8lwu01v38uctvod86ollbg8rysxfhp0m4ews4fkcc9ksjea0d31gz0s654ux9veqs8zhrck8smoh2ic656ebdshqvlw9yrk0pjbx73oh8qbf739bt1irsv2zo8jozbfjj7r1a40l4uduswe940lh6c32o1ztdbc1npqfhu6jh4t8cdovitdsmtpqdpvgmmrp3mcsecbuiirofzyz6812cqamf4em2y7ae8ogpwwxre8h7r2ogw11gn5qc418qdba2nx1r9vwquan4lhtlq0ujknjzkxsotizlomytt2d5mv3k11jnbkli3ypihfqjyul33mzeb4f1sc0ahcfn1jil0k12lyaulcups8i82fahw1q29shv3vuwx8uxlqzqtw4eh9rj11srnbzwzebg71zb309xk29wevn9wx7y35svjc0sl08lecoa78jyob7vtk1gt072e8gm0mn634srwekle092fom6uiknd2uq8d05xiz6fgoj6ydh3wj8nl37k5bcrrccgxi7xb54ayozlqwgi54uzkx8m5cpcqy8ibk6ptwftkmz2z1nwuhfu7xedh84ii5szgdqfjrge1gkornzrb672kzlbur3hkftbrsvy3tvq3a1e6sda2ukvxw0l26fj91h02f0xeco8yt4qt3rud2gooy33v9lvfa5gy4ptcui08dw4jf771v7vzxx2uzi781tp7436fzo53l5559xwid82skyd0osvbndsgnqa1lua2avbb3crgi61d5agt1j3mvzruj3yoc22zq4po4zi3oy79mkyt2qeu2oh8k16bg2swa6m8l95sixyalmvtlm6c39q6gcghfowqpm5yl0h3140sw8q4xa09w76qk1byd0k3j5qb1afe2ytip0omrdhkx65w97787cx4drtswewe4liz67vjc69k7skq6u5hqa65hhhvhko2tuijm14u35pe0e6rnd025yx7p010z3brogl53lewybh62mfjj5j1qajrjqxb2u4a7prftcqk621jay4crlu4ogu1e13is2gqauvk9ho1yzad5m4ssy1oya8lgpicm5xzoe5o834vkd3mpxlyrd7o5x8ng2jgc16vv4750o91nnzj6kihregiu2zd29grsmabc8pzhu93e01cf7iuba1edjeczg7skz4xytgd1ibxlbxwpmsrhjvsu3rahbnarj5k2shy10jl8a2punukzqk88p2ma09c9tt327pkns9ptqpmn3whupvylh1op7lfss0am49h64d94vimcdojzvmd4plf7rnoxcw0n1l9td3axzwt5hv5toae3linxnlprf5fl6tezvtry6rjpeikz3ii6u7c71zvf6a0dgqc8lh1p13fv3zpa704tggqzfzg3vnbyia035dxdfellne81zg6wkuec9kjx0p01rsduhhj6zkm0xr1pl6vwfkipu6gi59yrlhxm89lsbk7ya0gfzish6k5wi3ja2xjn6gmbi4nnerkb004o7ixsu5zz2vzz1iboj3zxgddrko5obrnvcirgungajiartyyg3p97n72gnh8wdvrpmksxkmq6fi4yye6mvpkygs6mlymvryztr24br8g44wplk3lc9g1td70ai79g',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/credential`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/credential')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a1f70100-d23d-457a-a90b-3958ed92e3ec',
                grantType: 'AUTHORIZATON_CODE',
                username: 'cz3fqxjp7d9adipfbhcfk0r2csbfh660q0cjuxg3i3hcw0f48bmqiz5vlr9io1huj00y9deyyfntfv12bq4nhz8a8zalvww46jti4fzx3mej2jp7jvkfwu7euqbqgwamjrsdguv404xetohf4ee6ejnyqruwiswsqis5i7t0bxd44war3espz0pk6p215xirnnla8zhwye203ksnxf4ckv3rviyk7utk7lhw0sr943tutp27l4v2vohbt5zhrg2',
                password: '3umwtf43sssisbzdxkpls30053hvgjbgthyk2bu84t8fgni9tuajzknnmfx9n1r7a7mafickayfcqafj1ajddlheo66o0kgjrwmhlqine82wyoqa8o245g9xp5nk9m5obmyikmgc6jvoadwt9cawca88xxhq2s3kzocac7brdhp4xgjsbx6632oo3dpgbqr9v4nyzmcbg48phmtd96i7lpq5e3h9u7zeo4p3w5uy6ia1bbfug03aw33blpovt6n',
                accessTokenId: 'a541c23f-4449-44b6-b83d-f41146489211',
                refreshToken: 'Dolores tempora sunt voluptates non natus impedit unde laboriosam. Architecto corrupti voluptate voluptas vel eos est aperiam tempore officiis. Amet atque quaerat earum architecto nihil occaecati aperiam.',
                clientSecret: 'jz80dae0984hhasl1iox7iaev1q8b73owazdxefo5k00i3sh11m8tavtdprsl8pqk233crpqrrcur3wi2xel517vnw',
                redirect: 'e4tbtwkeg4dnb12bdzp5axfh1env9tagye5rsx7rk6zuw88dayjoanlq6smuo6unlsc9eexee3roj42819ihp7hg52hyuhw3deuo4dx6jqqqf9gz5c61o9ve8mqkqjtqshx0tzcdj0ic3bvc9ixblc59jymrwjsi80fmhbjakwvlv96ysa9jn3f2aurctbd4wxdcm3girm0h0rtq7hbvlu5gg43w4azmdh8n3ppftmquxq4lpuzkw4qvta8nzhxv4weqwpebff4gj7izi21992s0l0tyo3sicsplz9eqo2neukagmxynthg4fcplm42awhc6x3jfawf3js3z05zpyqut33zhxrwzzbow49abrb9r0soydakz1itlgb7vpi7rkzvm2tl8h0ng6itm9t85iytwcwntko3hupc5gybsetan6zdg18vme9wk9evhg7rdmg7rujy74jret3ecems813xbx4wpqmm2r1icprm675sf2giv57m36455y1u6lj8w076f9j33d5i978zyx4qxmvrtndcevzcu8biu7tsdpzo5svutstt5k1bxcjhva4orl5s8rpen3ld197suwbo88nv6hvcom6789n449ncckg1ytp7jrqeyhd8p2hlv3ejyfwjq27he6djuseesrnesn9fw28d8fna5w5sy8uj1v8lxxes5mvp8hxrbwl9to769te0ikre90pzhi7yxkcvz4pr8h5btvtzb7z3nz6cm7e4fn1vqn45tismd0pv635t9nam2zgg8epxytw7h0tykbxmq42v8wspxjiwjcnquz9diivcfyzwo0hj5iq3dym8yr38aoya9up8fj9k4xx66xmkvu0r3pqmtmds9obobu21gyxtgigxgf2u73wal345bwi6lki7ndo978ngqexfupd3lhbixjire2tawl4ej373exshee7s01kxjhlccat7n7awjh5moqkys8e56y5b63ewuswlmipag4mya472qvhho2hdw14jcc9opsgsyrkmml7yxjtf7ptidjr3vtc4mb4kk0votyvc3hn5rrh2i0f1dw5uz1bkraliu9ociz3jdu5foggpi8eu0kfb2qsb9316egw08px2eoftddqz8hbmww2an3boq0khlw89fmpoli5wuz881o7swdhrcre72ftuifppxvh5l2v1p45i59uwqgql59cb0gj4nf4o7xnknsmz3zdyq4a9whwqif9u96tgvfxoipxn7w4eaeedz6h7497o0w3zixip8cnd96e7o1hlbm6hx9psrm53auub5ljtj9v1gt15jkuzjvonly04amlkh26ribkk4macthztepr4t6kdmft47w5g42ys42iev90ev0kdxaydf4py2odsy2bn2gejnqv80s06oyvw8rcu69e3pj21vl96xyv03sff2y355pj3v6pzxjlnhpkml6byd1fu6mpbr02mwensdsq00sqgqf6essmrmeyv4gg89477s3rlk4irr3g6z32ru2yc3afxo4vgvjccm2z0dmyi8y1hjddut678maob8tynnv9fjeos29lxkhq73i4xjlxwj5qlqe7j541yaj4rpnshnnjuwx0nggky4lt5q1cra2nm53z2ow15jonbd0s18kgupyqsbeepe4at8jhe8rz300m3nq6m2h3qkx8wbvs6oszuls6o09j7so8nl02zepkhrcrp0m1x3731bsvz99thyymt03qqov24y06aozzy83y6277vclt3zbmfdyy6yk9kcgjna90srmafjom7vdq4dg49us8w63nm1vlyw7p4xtlh3civk7ghjrnq316xvoxv4u4xuzip8kzxsnue5befjrtry10zfltqeskukq3i0a3a224g30lcgjwpi76c0nr78m1pynqqbfp64d7aoaftyubzyguzs3k7wx6ks6lms7sadc7571p7abwx4u6azllze3a0n8j72w1rza2bwsil77mc0ktvgjcmcw7edvhe5lvjrdvdzv9ix6w1bfs04gjd0q51kjaad8yw0r9zn',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a1f70100-d23d-457a-a90b-3958ed92e3ec'));
    });

    test(`/REST:DELETE o-auth/credential/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/credential/4b08a8d5-8cc6-493d-aaab-e2b196864531')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/credential/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/credential/a1f70100-d23d-457a-a90b-3958ed92e3ec')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateCredential - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateCredentialInput!)
                    {
                        oAuthCreateCredential (payload:$payload)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
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

    test(`/GraphQL oAuthCreateCredential`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateCredentialInput!)
                    {
                        oAuthCreateCredential (payload:$payload)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'd8ab867b-463e-4ddc-aca8-27b632451803',
                        grantType: 'PASSWORD_GRANT',
                        username: 'in07hf6cgkk2f2rmzmhqa97dv0tjc64tgp428m2vw98fkpep2q8664hi623d3q7dxffqp4jkby6ukvi8wmds4qngf1xp1pa5zlvpqod0uj4nd8nplhc3txupkjxdrr47zfxihjchtyqcdyl6cn4iklvjmbdrzf5y7i5qri76b81aczh5tniq0e98p25311mw3e7ld8r48u5hmimxvlq0med6u1z72r0d1e72qmdmi3omiyehzq88jnbswti4hif',
                        password: 'u6vvtrtsked6efarct552j2kovu22hz0zoux2ugmixblbaj48fkklm4kpvn8zd5j95k7wyfzb18zd4uhzgblq7kqicflm0gi4q8abpgyfk9qlu1tyymte3hwpkj27ioa3ehnw17gmo78rl4d3okxmigm6ohxeyv0j71t2so1jwyuny86wrr1f1ifpsunvqwec1ww8yhe4j1dwldnx117jss09mtil7k9pzkbojz0a0u4t7zl5fvq6z78undo0ld',
                        accessTokenId: 'a541c23f-4449-44b6-b83d-f41146489211',
                        refreshToken: 'Cumque expedita voluptatibus laborum quod. Ut possimus sint dolores neque autem possimus deleniti nostrum. Consectetur doloribus nihil qui voluptate repellendus autem odio error. Alias doloremque quia.',
                        clientSecret: '4b94ooztp6m4ghwxe0p2t508nfub8o1x4gvgwwdasypulbrxloksep5s1g1oj06a708sg2pmhhu8mppqs1jonclk12',
                        redirect: 'tt5drh3gf0pj2whiea0iws7z0c63zfoveooe4ihsl99y9hhvtzmkkccrb2qjmdgk5k7gjlz7raaen0642vjeqhwvsg6e67wv2mw713opu73j1txsryn0we4apf1lvrl9hw8aairadu7c2gtnl9wgyxbq0eecx2nqxf7rzu4zmcf50ruzs29pkcqdb15nlplgbgsxrcuhh552iw19bcaopeq0tptnuxyzb04l9nktte9ci2scalplfy9q0oic0qqap906ng71ytymunukwjeyfal2q18af0pu6j06djxswk2e0tatpl1kkxobtfuzx2h64wprf4wrjg954lxj9uw2q0yqgirxsp8jqfrft73zp387lzqh6wn5ynw2zpbvyss6ocs8ljpt17qwvkii41it7pqkrxz0frkw6vnlu50pozw6dikcchuovu9n7rl5pav4mojh18aj93td148z0miwknqmdhcru5qsjsf0zzsq3svf5i690g6sfa1pyi8d5qtkwnrrbiglh768u90civoycpxye4sia243909ti1lj48gsp2juquob5xacef4s291htrqyuy1os21ktvmqgegbsq7rvdvu5jjvcqy2meyqvuo42uwbnx4opsafbdqv7zkdewxdtuh78xlv53t4t442ykrerdffiyyktxa7zp3onp2ev6zimmutgozd71bd8y3frijslhcydswl2zuvwdtcsow1g9p0vu9nlw6i4c303kjd09d56uj43qyhf3fqbjmncfb1ecjyljmvn68777iaiz03zyjzif1f6vc724vknek9ynlzz92dyf7eosfqpvv9uwkw0fbhvo6dbn0n4hmzu5aeqdamqdcmiyg7c6tih91n098zi3c4hh8cyyi22p9b9va8wk2eefllowts5lzg5eo3s9iz2uq5jti5gm0sm6zxhi34xscx4rw2o7h0r4e3pqv66osxr1j2nfd8pbiat2x6o7oneqm5pw7ypc0sk64o6b5xeg12mcfjaxvfd2mnmspf2dyybl0f2257xbq97derfitro0ai3662ywm9sgsvjonbgte4z8h2pr7wvgt53wxz6t8dfdoodb5l8zcsi1d6cy74yyzlyhqwplq0rmop6kip14iraow0snw0zddho2zrq176onf5vhgyd4qxlrmuucnkobqozizdtt79fyvtevfm4bis464uj11xzbeyb8icbn7ias4iwjo78hj5n4zx9rzl38fb5xmqnwzun6f28bj3vgfhrjhpcl0s3z6gx68rlfy6ux99bo2xr73vyg9iaymehwsjfvcy5wu7i6vtoftxz38wlm6gc2wye1jtvzpkmcqwrz9pbm2z1ezg5rb45j9n54kjz60w4k6kt7g29vsff7qe37gk4ut2pndfam3m1ah5vw44mg0bngtl2o50j7sur8hq95l0eqnek5ivsw4ca0avir49iys50rxupv6vyj38h4robr2z03ibb2ccnwe6roor9dxo9ohefv9paukjt49qohny2c80qlh8cp28q318k2re7tspqdswjf0ybartvqwewmjuumwz5xvkr25qzo0yz0ue1no70a78wg2hf5apxrph1reu2l3b5n7he9hczptyhyibx3aa67egv4z2ybpe6omd2usk8fn9lswgc15cbloxa1wnboteymsv2rxh8nys08q7mvrq9ovrpymzwdft45w4bqrwqgm5bivka3buh2gpwpm4m32ti6zrfxu3nk17pmj38300ixs32tkrhqhqlnwp8jg6v0rl6m1f9et1yiqsxtx4xlrd6hsz0w0gq0anejhw4bhe8cteybc8fpa8iu2ghjeltw3rc1wwd9wql6zc7f7f1y1cdm6c42jma554irwavxvpxq9lo4ytp8jjh0h8qwp104zqrlks9zk6ib3028yyes2cbdm2zw82g1oorh0z1jatjmivo6rr9f8l79z9fsyckwcd77rcibn52c9qomxi7uvm4rdn7qpvjli1il5pphugcha1j2pmry85g5wtbxc15cx4',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateCredential).toHaveProperty('id', 'd8ab867b-463e-4ddc-aca8-27b632451803');
            });
    });

    test(`/GraphQL oAuthPaginateCredentials`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateCredentials (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateCredentials.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateCredentials.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateCredentials.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindCredential - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindCredential (query:$query)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'ef6685a3-9103-4895-b334-6c166b72a64e'
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

    test(`/GraphQL oAuthFindCredential`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindCredential (query:$query)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'a1f70100-d23d-457a-a90b-3958ed92e3ec'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindCredential.id).toStrictEqual('a1f70100-d23d-457a-a90b-3958ed92e3ec');
            });
    });

    test(`/GraphQL oAuthFindCredentialById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindCredentialById (id:$id)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    id: 'dafa9ee8-fd82-4da3-b708-a14019583da4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindCredentialById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindCredentialById (id:$id)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    id: 'a1f70100-d23d-457a-a90b-3958ed92e3ec'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindCredentialById.id).toStrictEqual('a1f70100-d23d-457a-a90b-3958ed92e3ec');
            });
    });

    test(`/GraphQL oAuthGetCredentials`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetCredentials (query:$query)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetCredentials.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateCredential - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateCredentialInput!)
                    {
                        oAuthUpdateCredential (payload:$payload)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'fddf2b1a-8eed-41ea-9be9-8967101d82cc',
                        grantType: 'AUTHORIZATON_CODE',
                        username: 'zbjae7o7t9ipf556u6kk1w1fqn67u0tyjihev0z2tzhothmzbihfb5ufv30f9auqmkybv80pauio3vzlsdypomcvnih62uj77cs0iulat2t9jyjogq58zcc7zt18cy68wsys9trlxwljl3jo4x2y94tfrb0d2yonosqw9ohzxw8dfpu2gerqpryuzvtndkh7dj4mid0vh0psydx0ip7lza1xd99iclyyr5zg50kwwfo6cduko584op2e9fbw206',
                        password: 'cggmwn6ei7uyhznmwk2rp4agj7j26wjtay1ar0fonxl2e8o0l4j4n93m10egpvwgqqx6tg61vekbk4vetgusq0wx0h18wsla5tacamzreq0w7fd27dwoldlagh89x31l8rfo57cq7jpx4pgkt1wyufomstduwc0s2ydw73cp2c3g7k9nfbkezlb94xjx3xc8gtl7z64triweoog1fiv5yphjeqishzi11cm9dqd43r9ux1m5nfrwjs3l4ceyhy6',
                        accessTokenId: '06a814e7-3956-4b49-b065-b0ec44441799',
                        refreshToken: 'Voluptate inventore nemo a et consequatur. Autem corrupti laboriosam et officiis. Et veniam mollitia tempora excepturi quisquam perspiciatis. Dolores autem qui. Aut dolorum voluptas dolore dolorem id et maxime. Dicta alias quod minima quidem et consequatur qui fugit fugiat.',
                        clientSecret: 'e048sxvazbtn6kxkj9jtp7ej9rum1fhrnfw9v5hpf9vkad202hta0kg52lz0sqf8si2y27qx87q3kvks66g8yyws6w',
                        redirect: '2yev7omfugq304j3rlbh5i9zamzpnu4r4zyd9tzachg8tsn84ij2m7mz2mi3svrdyrg81t5a4wgh3tcnqoyj6afigx9khzsod1rsre7a0grle51xurv5ri4gsvq7zdumy35ey9qykmg6246s4kbrdrmlq7sd8azheym10vrjqbztsucxsximy62rdylcnat4u4itdqpz0z8hs9dxc4h9ulqaba4d5sy3i5af3ropvpmf576czlcuqxoq7xuyrpgemor7sfmfzosdm8su3noi0lr13tstzxbkjsejew7le9vzpt7271qejepztn78w8a5dt9qolsfwpj2iwrapakvt1bgz84pu9scx7kzu6m9j83sf0mze3lc3lq6xy5bzy6wmbbclnecfckzobtfifb0oul8d4h34voc07on031wpzlke69it3abhn52vhlrso1a446z34i93sfkfn530kzmtscmmex6keiaben6f8hcjd5n62uddk6n9zs658e8cpsela34jlmlkopsl11icrh000dh577craarqstesael0g0zd7pu0kzhw4o7hj213r2tfvyolr19ipwdnu7q0juwff16ycft4pef4srakldqtuwgvjkpkstqculdjh3c6lktxa1s9772wrrq55kotpo3ufurt09q3wqm7gv8u9ay92ysv974s61ow6ru2r9azlrpc8v298t1hp840f6etz7d8qvfuztzo3xt43l0g1bkz7es6pe1t6sx7z3qw0srdcv0o7pr5tzqby3nf69kk77e4131vfl1phcexeu0ec71g04secugpgtvuwguz9ng97gskbtxuwb4exgnxeodwk48ccyw3r5qlflq2r2k5tw4yycgvsctzx7mwsa5xvr319xfv3fani5x29h56rydlecpklygw4jbtbcoguc9rhy7jmp7shclemnjsd03062pfgzem7s7iasbno56vxs91jn5gf1bzfowto1uby5cvpais7yrrp6ba62i7j95yvpyhadntwr0wvkxt6gy700j3c8xt50ajmp3vy8eowv2kj79qqcyijetphngpyh96lhg6ulxepn74anlcz8kxqolxq6qdm970tjwrato45787s1mh59cyvpl6bqes951l958aqbfbf7rzp6nfyciq8fg8dc6fu6gykemvolmfrj3821lxibxx4amesanzob1eawbqbbn2anmo0d3ob8cuw90azwuwbv2ryo5didug1nysuohhqsxvyettb5m0w788l32961wwo9apa1g34bisj069vu9uep3o4zt9k0uorj88nwijb2wzafyu00rxudi8derwxlnlex79akr031q0f0cm6rvu2rqinu5ewdsdnkrmxn9k1hb9vcmcrueg1h2gzjzk8xdaask0ihueho3myswgvwbn1fenvzsx3a7itnrq1gtavdw4vkmsmtypwjyijcq7sz4wd62mxxj11i9kclcscqcafbui8md0yu9u0oxn1cp1656vabmfysk5qcsmp80si19754luoo5vmexkam7xp26c7h8ogf5ol2pqn8dflxuxvdagm5809icgl5s6kr8qkaecg7rsbz7lc46c2h16ej79lls13wqdzmc2u8fzbps57sr5yyl4a3kssxjt6grh7usb34eqn3t3o1109xkcosscrif07i193u5olvhoi6t25qax9ryraf6qsxoqimt8lf5cjc8l5mmva9edon033hflqailw5j148xlnk78922a1lmz0uaujcoayaeev9mpumxoaxyph253qaqd0imybnsd0z8sjv7llvm7lztimjkv913m4qjhcgav6fct3lmsvb0t69u7ohbebo0pcd5f7bmxvixiogcngu6gmgdvyxijndm0ndh103th8kdtfyng4hzdkljcrojwiqynpr2f8eqsya2n8qv75ph87gld12gebb3ord2ck4271am0p2f1wdst7rixdhttub5s7bkkr5cs5rh329jldgbbwn3ub9omddziaakdo6ez8luwhuohhw8',
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

    test(`/GraphQL oAuthUpdateCredential`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateCredentialInput!)
                    {
                        oAuthUpdateCredential (payload:$payload)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a1f70100-d23d-457a-a90b-3958ed92e3ec',
                        grantType: 'CLIENT_CREDENTIALS',
                        username: '30cnalu5wm1cohnuhxuv2tbrk8gyydjfoew48ox3pa0czclyoztpmqfafmxnrlvt8ve6fns6vnqdjshtas37xoeuc9j2vdtn3khibppldq8wzgusf7xzeyr3pv4dl1r3jdj0lyey1at6vwevidxlkvshbdnkyszxjbti94hecuti4jo9f56sqdlsx8ro65tzu83tof6mjzc7aodpy8al21yoeie3am1ecmgqbfjb53fim9e21l4q560ssdxd4di',
                        password: 'cbh9jzknwersy7dffvzfgay3iwbidjf9bhe23ijzv15du92w7pk6f9z42mqmpnauu6pb2zzv1dh64id1a5ykkzjxx4oo6d30m7bluhvcc7n5s2029epe7pp9kkoxf0efqv3tnf5qv5kipyqm50ya46nf8ku0l6ltrqy05a8rc26x2s5niof3v8dfdkf0wry00gpbhfu5smwyzluuhginwhkcvsb0w4svghptz48m5p8eiwxvrft3gl93o2ycmbm',
                        accessTokenId: 'a541c23f-4449-44b6-b83d-f41146489211',
                        refreshToken: 'Debitis nemo ex. Quo iusto natus illo vitae aperiam accusamus repellendus. Accusamus numquam rerum voluptas adipisci. Maxime adipisci odio. Non molestiae recusandae et est rerum fuga voluptatibus.',
                        clientSecret: 'j24lb3umqov9pqjaddbsumg40pa4gads5izsbxmof5xjflrxb4lq8a3avcd79nqiod9tkpg1qnczpk3byjire9i2nf',
                        redirect: 'qzgun9oidic641zy38td8n8bchh2qtcujuadg85ll01yywk2758f9ow8atg8dqrjsjzl9o20izds0zdd9m2mtpo8256agmlu5kvrlsyrt7ept5zd4m4nngupcoi9t75hxi8x7w94n57dqtqer3gztr55of0pqbs39sg0ak2u4jlc0ymwnjpmimrvd1xg3fnxl9349jbmbdtlhg6g6uil6yoyb3isnmhthmdmelhm3rz0x5phv123j13qgg5fnzpiqo17uoe4izgr5gewmegyrffckvmorc0mtonqr10id214f3ta0wxfiod54m1lhjsudzjsisraaa2mj3r62zmpan4cztzll1h0y62a52rqfjeaaokcu7uacsprgcs7dwdr95arlv6vu1q7nr8cxwzagfr7ray1zgyvh7976cet3s9droa49tkka5ptymeuvltia71pnz3noss12fcqc4vk0hba045bbbmj7m3mq9kwebudlg1vrl4m6qbp6hyxxtiubavagu9hjm1nvv2dqa5s82a7hmfp2rxt3hkwzbixs3q9m4jqb0887e5516kc69yaiol0o1hk48r4lcpqj3ynk0g0dxkqf62jwi2apaohoyeokbajk3jvoxynuugibeshs3me0hegtyhyqk5t2y92wkfgbmpyiynxngdudngvodbrey2mjy4lcu3aqs3l9zm6pejb7wt56m3t7u3htwox85i25f60na0vc5hkoq235al3gm5au19ambezw37wdmq7wbd5cl2nhjf3a9gvyjvdg32egbxw2vxk7d9r9ybwoanrv4dxy4vzpbh56ubk79ns9ofi45p32ewmz6h262k1zn8lq5nadezx52nlc6vqrnyntugmbaqi2197dc8nal9oi2bqhuw6jl5ut7s78qwgu336cq941vu9sda061d6slptjkpahlp35jjwh35lkv0muy7j5p7czh3j7zdvnvmgngib756nk1118ipbz3ezzlh14aqp4x14b89n2i8b9jbjmut4ih01c19e1yfeu5bn0xf3v49vcdcnruc8h9ip6uuppxt8ofpjyh3ns1pduvp03o72bgr83d8stawvbrnl39tka1oz3ngg9h96662pe7lpmmpc9yywi6dnwtx2x92pa2r5yrbbr3l8xaeulbf4y8t7bb4e9whvuzpcofpsoqfmox54uk9egtahnioheljgpjp4phtmfmnaqham8lnhe71xthbhrzumdlrkrjv24tp2e6f5v3hbbwnyoh26fntlt4gina9iee86m5a6np974q79fuab89zal1p97v3js5wvdfwdvafbzk1iyvaqfpowence1ktp0ecwnj6ise280hbjenrcqm51clw65trnlmhs3l2l6mkmswzmpsx389tspnynukvkr8hlqmdjxy77o2y7h0udk8mfc9ej501byhpmv09czyzkkwom4qw0enjftzjrslb9wsgatmfg35dybaovqtx0lmo3hp35qe5a3iz30tqht3m4500t7nftexjo727coutv0fmwumcjsmyp8rnr7g7r2bmsrn0sjqdnl25t00wehixj4qh773h04qo3eyo15wpzqvp305xl4a8mcohtn905q757kl3dfh9yg78q0raanz4eq73l4064vmjjtmntuypi9ev9g17ow8bozac072f8orzjy9co8dtqx11lzc6x2d0v5hia05az0jjvy1pb2drmkej0aurreyvhb29susai6bv6zo8gfk500ybkk05kbxqngbtmdqcq9aqum3cfgoq9l13z1jeb84rueese6z9onqqj6gjuunbnosl1bo0mrghjjcaokclp2nxgtro9riv3ko6wkn9gxf7r00c9o8pp4p9dohn85yymnya22bo6iu8kq0bb4b29ozrk0oapwcl5rlnt8h98vhdkertgebpx3mnjrubv7xny11fcy6k06gajo7xqxzfqo9wv22saa4yvhvvab87ec3lnih3je0zkx99la8sijh4xvqv99i4shqj5z9vi75zca4z5',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateCredential.id).toStrictEqual('a1f70100-d23d-457a-a90b-3958ed92e3ec');
            });
    });

    test(`/GraphQL oAuthDeleteCredentialById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteCredentialById (id:$id)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    id: '21034d03-e560-43f6-bff0-7c53deac5f24'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteCredentialById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteCredentialById (id:$id)
                        {   
                            id
                            grantType
                            username
                            password
                            accessTokenId
                            refreshToken
                            clientSecret
                            redirect
                        }
                    }
                `,
                variables: {
                    id: 'a1f70100-d23d-457a-a90b-3958ed92e3ec'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteCredentialById.id).toStrictEqual('a1f70100-d23d-457a-a90b-3958ed92e3ec');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});