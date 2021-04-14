import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IClientRepository } from '@hades/o-auth/client/domain/client.repository';
import { MockClientRepository } from '@hades/o-auth/client/infrastructure/mock/mock-client.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('client', () =>
{
    let app: INestApplication;
    let repository: MockClientRepository;

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
            .overrideProvider(IClientRepository)
            .useClass(MockClientRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockClientRepository>module.get<IClientRepository>(IClientRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/client - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: null,
                grantType: 'AUTHORIZATION_CODE',
                name: 'lct50g43h61w5fr4kq6vx2j5hpjzwxdfqofpo04oob96vwcsl63oevhhhl3i0z5ckxcjr353p3mqandav8l3x908hbmnj32655z5i7c9ap6zbx75cx1mn13l2d0ystfobkg28475nguufts52vs5oukrg05toxhklmi7oardjnupxkyd38o56yabmp1l6na5vjzsnps4e5xrrpxa58j14pnn9i3eeglk4fyrgqqhmywywuo0ihrvhy8bzdy4oc5',
                secret: 't3qnvweuv9ed5jlra74nnkjl1ukhhgobo9lm6da2zviq8xzcb512i679rk2yorbfqk4n5213a9fwr214ex6d69bsoh',
                authUrl: 'da9v5j1wpdpv5j1puhryqemd013f9yhz28ho1f9jdctor2myrrda7gi6d3ysu4jo5hb8ylinlues0zzhnwwcq83hurxfhxfwz7yfjadw985gq2ouvljt3mfroehk1gtz4zsbexsvjs845pjivbxi3nzrm2yp2qk1wh984ufi4tefei6zzkr2ubl2xuowtiv2v2kde849ur8anug4u08k8xgv2k06w26c6exj5rf5nnym96hn1tsyef4m5vka1rl37wlovkhr6vixfsk6lvs53k6ehjlxwp0melez1h0py0874frx1h18mv20reo57337de3flixxn0elnlwyh17dhnhp8hae2kar79h4goo1nm3371n4jcew8my7ro9c7j4wlkwyjiu6qk7vjy4fxf604a2dsjlq9cpvgnv54ajsvsso88po3mi6iyuedrautkdxiv67jy0t1b41auk2d3at1e5t7f8b1yv54ztr2ec043jt7i9y8f557ergj95ghm9wqf21jhs6c9brhkllpnmea7dzr1k445by773uearvezzct72ce4fdyxexgx2av70xpmynb2iga9bcptt3vy1rmc317j4x3igbi47578bzpwa7l9n1e6tynhvnsueu2m3flg9le08p264dvilnr7sivkjdscosu8xh430lkn45pps2i32s78pgaymkajfcr057hrgrs0vyl5np97vvtusfq86mzd3cnkvzjiek6b3q7o6q1y3dn6v7kki0y6y2oekl0l5kuj6kc79gz8tom3nsml6ezo2rbf3i558ude22srqmy9tih38iejhri4d43awm41sj3ozialq66mqixlt9gcysff2giw76g9wveq7q6r3mrbxllubk9yut2ir8l6yl23jnzs1brsli5njuog1xydw5x1kq7xeot8bi54sps6kgqyyacn5w42d4f6zdk8hco0isljnx4pcbfj5bl2b5m4ife7a21779my7pozfh5rif8joxmg8v9sgwby9qg65i25lj996stilnxip2yc4vwz4poyfhwgl2weox3oqpe2hiretme9ua3v0215sm39pzkt1m4l43ru3xvba56p6nw4rzaivlq9qrojt6aqpqo9e7fe40cjtg4r56emf0meco5m50qyvaglupjltvh2nuhnkzpazqxd90fo9crlicz8b9q6kv3hrc8pi7066c47ae5sg2n9e107yqukb8u55jhnde2bvm58ywgnkoi11evf6qmui3vugbrs0e7bvmzvsf2s1vofo6cjakvjzdjf954yxbhpaz6c73jj2n1utwp9j04qiaijgvtxh9msaw2vzsa6h2qgf90b5hynuj5oefby76fzxrj72ao4wkcmjca0hm074cx2orhrlmo62wtwrjo34hh0472u6fm7uqv46ys2pwtuz5qw6f95cdd7gupxxmbqlxbpm37amo4whdzucs3rukl2i1koo3tuabyf0clesnwcog5j2o52ptkbiaui8dfb0rb3d9yen1m74hkqzbowxxq7i8p6eubyrewlnzedxk5mug4rf8nvl9yegpvtgrf3g4il3z8cmva2m5uy0k95up2kxou2da3u6e4c7nndhwiyy03brnzgxshfowbicbhnf5ou2a09xa43et36xvi6ci5hiipo24ff2149531ub6jc1y0gmcdu21kgl0xc6hlppmyoujkp3k5ius5ubza1do87qgh18ydji7czrsetgjgpepn8ruqf96v4f3zgvk0yawvhv5xxxc68pvjkx95upm4e5spocat7a5uqhack79j0r29518g327yd060cfyd9dai0it1efhyge8gxxc7apn0t1ocvhi264zwz0vwm1sd2whywajh5rwuw0gjgve6u4ej61osavhbxjf19xatv0pg00e3bxpk7rcw2t7mzrnnpiz2knzch0i5qe1342ehnxmyg9gfn9jw8m8b1rden4w1zkdyd2hjb1sfad0h4gxz4rtmjizwkvupvi5gdu38yrdmovf3veqeqqbrch4',
                redirect: 'd3nqktk9sh2z8vhas5xsulw8vwkuhcreosj0r8yxtfcuhuv18mxpx1eq6wqkp37goxqf9kda8xd84zpjc81xk82bsosjr5n5qm5v6vra8evmtqlt76di9i2xreysefhhlm8fzic7rgodkxhmt82hvarz53cq6yi797h3594zscp1k4busz9drjl99fq1bxhv5tsze0yqgdvmtaskel28u57rcej5w013nr0tpjf4wr3izp198ll0agnstjxsi3mzu6awsu0nu3ws3gymmwzktlkovvhrc9hy9sdh13tdmrqksr3x0qkuaz6exhxifkzx0ul5tdz0rh15u2lnfcssay618yn2uz9t1e4usihtgj7f4lv3euku3egappk5inxskv3drnbklijhwjcgngo3cpiqdkuq4th8ekvczyv1bhhmol089k6binamsjc7msoubls6uc7cq5qljimmsprm9lfmawz7r70xg1nqpqjaird9ecu3v77evaeogg7dykoq3my012tbmbc1385y5frpe5r7qt5d8nwxbkbzutcqb4g8pxlbz5jq46n29i8a2eep6dx6zkigc5h5z2lpdq0rumgrk3ii9rw3solgrxmu9va66j4dfkfjeufzoh17cku9ncfznh5khu9d2kbzb2tam88noild5lf9kq3ddf8fu68tqrbuh3us1lfcdbsy7zes2jnicq1er165zpcpsyd9xysvc65n62otg2f19lq5gozxaqn7a1cnych3s57k26f6i4nmztw1mxh2jxbwaamcnp3zj1o3llro3ffmho2hni2jdkfzv9zv345mhg5db4ygd33cymxbz68y8fr64afjdhfuzqltg9gv9ysn5gxnd12kw9xmp9liehjtu1q8xhiz9hhl2zthxcl2dynh1krpgcjo8enphba1v6mqzlnx7bbjk8zeyau9f65n80prvdiizokgktgd2fv3o4zbt90c06w4ns2yg0cjynme66p6z9yw0vdiu9wffdych5j93bqvjjv70ctxclt22r4644mi2cmtg7vf8v3nntctd5eyfawq38j9vm3rqoyv1aya9tui0fz50e840xqyknamrcsjiyxkwqnmjd0uqcebkdgvc45i037jpo0isoqkl4le3725c249iktlp53mv0pvkmjong6jurfw7wg6x54dd8ebia25f3raljwkd0vcxkvb3ehtoescbjla1wy16xqr57bmu231o7itijlbbtetnpj04qeuxyy85latewqs10h9yz5bzjkbulmpquo9bmiqt46y9y454aacue6f3157iamq1pmzkxxqr6wf65ipxqxqpck1te1l0op0g13x92f6nngs1jn8xld0cmr77tte00d72a65wt19v3y6314n35am7bzrn2dbku5eo457gnyriqadud5s189esmvzbq81c7gxvunvsncwrzejday2kiiajrqlr6kloc0ovbt43klmxxgzprh141279j0bccoa9ysho43noxdmqwdmp9idm66hybpa4dneipi282xbiopga2xurt8uuo8frssldo6mhod62q1jbpvwhfc3d1qa2fkua82psqw7vctwie6ecwjf4rhv1cwzx0kh9lnodil4ngwetjp01hya1xtdza71o10g2gkx2jqkk0zbeytgpdaegm6d0y0i6nh1lcneuy3gduck0jc2h1zruelc008odbgif6k1u2q3digaj1n12m1dw8q1gh8t7r08l986k7esudcy33ru4fu0z6oxeqrvb5wzlnwl2pgeu1r6bqh900ne8vg2bky50qpe97fxj7p6jvvrvkfyhm3pe1augsq0zdpx210mgh1clitpajxhqr5yhoa2firtlckw18fqx2yfk2dwj791ou2m0i01e5y5v33c1m36yt1qpye4lys0564rbar283gh520bun8f8648s5nkzmudk6zf0yrghstunubcwn7qnr41xec723eebn79efr7emhb7jgtcw8tjt1v9d0lde5cc8ayxqrywyxc2te6jw9j',
                expiredAccessToken: 8960349951,
                expiredRefreshToken: 9622844669,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                grantType: 'PASSWORD',
                name: 'dx9meb9kqq065j7mgp6y5ofrblhbisn3lcyfetxxyymqy1j3d1bdevapt58jbbxd8qnsvornpvksznn6o5pcpc7bl4z5ttlnn3ur6i31e30tndzdu8fc97kfvkdyotogxu2luxfiifz9m8cmpewyo2hhyrokvxg62ocbiiqt4j5mrno9vtwu1fpk2wn21snp4b9uujhj5at7i67mscvw1yovx8aikh0ifqtrklhi0xn7t2ktvs5oe7ppljjfm0m',
                secret: 'pr208aww4wljvs4kh9nr5os1nggm1o0jqgyellq4qihozvzn7ld7wk9s70o17it431tf5mn75rh31zr4v05dhd4jih',
                authUrl: 'mfhrjt68h7nl3tisrojqu4kbdmvonydo4z0nssfi1m2a0grqbwvu6lcgsrtyilbncuuqendwlj6p8vlcv9qzlr0c999qofmmw1ij84lhbuw4jkvl4b6crbtk3a0rkh3bgam67mx83bxasva58hwogt8ofci4gaqkxeuyzicmgkhulrrr3axufv6pjhefeblytheyq4y4y7j2lva0kjsprqujvqvpz3v2ys0m6qr9ndet5nnnsocqhw0br4if159fax4a1lv194fq0p7hcnup6k7bc0by1ynocfful1c3ut4y8x9whd97fqzm8ufdzjmafw20hh9rebplu4xrdf28tl9t4akf1jhgq5ojm3klyu064xrxljn5eft8n75o9zfamvh7a9mvq6yuanld55g8s6360qxdk7imt077fhhgwvd57mr25tl6dvg6vvxlx0arylvl324md92m2e6fhsyfg95fccu9xnmfb46vq23bm1nijhg7692l57ehwjvarah97p2nz5w7ld8wgtj6ss8bt1bmeddr0kmomveuim61j29lqntb6636mrybx48330wipuxje73tg89vtmr5wgjtzvut1j8jd9pjdu2l9ifuc7lfx3hktzae4xtqtbqwax2dkd5luqr8d2esa7foxezdul0al2kt8d9kj1g2ix26mqpdfcwwsyn5dz5udu8lryw86ci5i8bxfxucgrid9c6c3kqadh4rqayhr1k0essptk8m6l5ookmspjsydbed7p19nn47dzhytw1v7fdfs3m0etwryr2pvgox3zd17ygtimyln932i7534laz8guar5eqgfpe5kh4dbxk5bf1309woi1dveerwjlaz34rw9ixv2pegyjnuw3w17lx6nmj7xegfozxmv7382g950rwnewene8l3ny8dugdm3lglzwg79e8184vo06vwezbcgppcupkea25joeypaqyg3ut91rficwsegoiy6z1d009514qi4vi795uln489jn75uqzx6lt6trl7ngoak1v04o2rf3eam08tal8pzju98ydaxxdedqcomrqmmyli6wa08orceom9umko2j33ifffz8yckdxa7zdzz6aon1t0c3tgdyza6hcpzypt8nw0gzbg4adq2ulbbujxyqvqv084vtdrljynvo0ga70iaz5xfqh71a6qgxvc0ml4q6qw3742oo3a8a5vz2w4mefb443bjz1xrq1rikloth1zm5lx95dysihopvy9az49ygs2xdc0l2ubt3bw1ng373dbz9nv439hxkm3qbbavaves5bhbjzop2grpv3voauc23dpt8nukzdv943u9sgdmqhj5wytk4u00vmznl941969s87539wv2qbcck4tori4kw0ziondu5twgwty6pggjm0jebpor972kszph6672ewl3pwi6zy9010nowtt5ezi0x9m1i5e2il6puop39kbghea8zq360eubt2otpmokawg2klv5grbuay1oxc8rcph5skk9bzms2d0de4c110qjgqw9ql9mvjlyb8cwoxmy7yv5mobjltssesxiubtpt8up1qt25mxy7axo0t9mn3ee1rp3sg3wck6ojvj0a11kp3nd4znhtegaxolz8gx4u01har183apzprhhh2avvlrgesihmx8deo7dxrthnvuuh8vli9fkdl9bcs3t7tvn5y16dtpbrc4easczfmqkic5q59fo9xuifgz7koj0pfmd6sy36ogkjr450pqg2xplz3lvgwnp2rpij05erjpgwkvgzxpgdefesjnq3oqe2ktjwa90km5jljdxvuu4siomnq3hardxtotxvu6e5di6x52svv9zt3ydx15k42ifk0y4ahtdikvglkyatp011ulr76uhe6fbq987wv2kar36nf1w6xruojjgsn4sb7a9m87jn2zgev9ed1zrfh2ru6j83h8mi6e3j5981qxgauf7jgtl5d527zbgcg12snu8ga9nmn7jszbad2kn32z2yiqibpb4pykifmbad8vt4n',
                redirect: 'vvue59zpzx4okig7kmh0m9qrnqewo1vtgf8x37ls46crx158vfy6lhf21jyv2k9u2k99du0r2ywtmxq9pzpcyvy1r3ffssbwnu0wunkvaqgjbwjd0jlrxyfb05lypvnxf6bmvjiixmbwya4cmvjm3r002oxtdd03tzu4ka81x3mpi8z4trs6h1mpuo7q94wed2pdxlm1o9zlnbwlrtjlee3f0y5y4m7d5luzuf2rl8ugbe50dutaxg2kybmft7uwjras0spr01nbcsop6c6thr5lejt9f9irxdvk2ppdwq0d98atq2s4j3ptw31hg1pu9u1v7i4a3kfphwflu1xoo4y77ylubxim4oc743t5m4saiwv56edsjhf5yrojrln9022u3gqyaq2vj3x1e4p996p42pu9fwqcy9adwr7dvwq8kx3m565thb1pg9cyzwlwbynqn78xbqssnbbddau9g717pi73o4yzq8xvrmyv9g36hl41re13ieatwvc9gl0hdoobv6h4npdjhaopq74apqawdgyiihbo0uuqigzg0qczk89xcdybn3cmfpvmcesktg656pya79bebd49re6kaf0o0yyax8n0wxbcv5emaanjnspet0qwb0t0atsb3oaklt4kglen14odxfxf6l971zvpwblcyhqn8lsegwcyc517w2tfzkf2hbre8jjmw3u2mryprbt9po2575qsmh83vmar6ouek99s199yktvvfat8rj490mlwivyt0kb9xtoe6a9o3v689p6xpdcfl8hkvw12af85orknjqx155uflfcnrvdmoeys8tq2dby7872sfpuvf40ozcwtfyu3bmpa17okv3ls25yh1wfh72mvtjqmvp8ymt4fyhctf4834p2mkvd9zcc0tmub2tqkc71j8hjybdbebdknxykzkvqwi6s2yo3i0b6h40vpuyl4uy9j3od9audc6kxvwffox9p9abhw91d0xvy3xbc6k0i4a6obfzq30h52bk8troxlnqpiy060jl7j9j53mtem71qiatpvw29jm3oz7fvbte70qq7v30b8m0x7hxeny4hl9i0sobqqadin9apqhpa1vft5yqzrlsiz4im9yoyywml7i1g0l6vacnrqd7b2yefj0pxiik2khowz4w8bma991knw23tg9898lotncvsn9my1jqhhue1zz1jtrrodipbaczo8skljcj7hnjvjx27zuuyfp1m8jhk8t4dqxwx54qn8paohrjdcxfhzqr62dn9zybs6naixvh8msli3vayaoybdhpms9en1tuwicrvfoen7oluz47qex3nngpoevzmspzppvhtj0cavr5op31ewndryod985eiaqi73dkyp7hvxf010q4jh7kn7vl1cxtmd86cynu1r02se1goz7ik0zz6hi0crgt8h4mb6mdtua5kj2aw2afa4s7x7ng6j3kd37j7zv704zfgwd1o311d4g8adsw290mn97udqfdgrojh1us8t0oe79nbp39k6blgmfgy2hnabmyxt1qqdw4l3vfjex6uci23y36wslclzs1kysgny8xqc8iy9n2xhty9ufli411t9w8mj27hksmnrahs6j9tiz05o0uyjkl3wc8d0in2e591yy64vy4o05q67dxtrebgmdngkf00ispjb1bo8o7nrndo8phynzad4yuxzj7f43ia0x6vrba4q1fw4fzbxqu8h2vhgg0cy5m32d8csikmk4cexfaygtizkgd8uvlzrovc5rl75zuscfq6g8or4x5sfxwwr2f6fmek8kwygiykmwp17ptk1ytg04yk0ud2e3wnjlwbozzkfcmrymejj81po5sbyt36goqbwpdsq3zq60dkyb9mqdc2ov5xgpk68c8rte1n2dkubpah2rg8c9ax4ymttlm3w06sfm6r5fvoe253bjuegv7lem84cob56kcamxmd1zso093i01p01p9q9h2g4fixk6frsp4qgbbyb8p9jll49fba2ufzf6bt2gnpnj6e51hllra6ynnqs',
                expiredAccessToken: 9394272398,
                expiredRefreshToken: 1581810152,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: null,
                name: '51l3ns979rvsi95gf1nxg9dp08nyg1w1nwqik3ykuscfm3v22rbe4sxkek442na7l8c31vy3vwwrpxghzp4w7vu460vmbpdz16646bwnr02nu2m17o7j4dlaat64keiu72sjq3h83q8huxpi6d0tdi6036wwhvp4gpnrbds9lw6ly1atxocb0u1dkv4scf17z60iml963mpsmdhyaxfwq5ortn4qesmmkl0njf8rqyi42urxmyprzqct7ldk7om',
                secret: '4pxhca1a8v88u8vb4i9jv53h6zpo2kk4bx64z0y8ux3fg2tbaruorhrounkeu2r56bo2dn2j0rl91ay5fml7d1yb12',
                authUrl: 'nkfqpn14be285s437ie6tbddjk3sm41s717av6hgogr0i093agqsfx539eslrz8i355nfunbqe4q1qwxq892hr2ir3h4656fwvoc78uzg4ev07jzxr90vekyx7vtxmhvgvcyk4d8xqxd3msfn1w6lzn4ugekllxj81vw61f5sar8mh17wks97gdfzhnmhlbk2bgo769crerhcofwujfl13gnkx4z7ewu3k9himzratrc21u3k5fvsa2ff2jf8r0lv7cc9u1lo2nlsqh1x67cy2wk694bhbq86lawn7lcf9t2ylnsbk84sv8llhd7u87sp7dz8phcctcgmem8u0ri21ctnm7isnznnkh7uiwmkx9s021dwypb29s02q8v6rp8hwzdooofrzerytyb3048bkxpht9vzo42mz2uc80hnrncerx0gdadr4f7jgr4h7pve2hnqated4bn3y52j95ne25txiaryjpqf1xqek3502mkf2uwf7nagm6vowrcxmiw2js31r7q2kao6bsyjumvad91402q056pk8jycqrp421ngv9hfhn3995ieym86zmxlcupg2tzd6t2tqq3wn10wkm9sxb6j2lggtkrsnthytg31jhqbouy72o0mv2ekn11x79ct2xaf53x5wng6npeh8v6jvgbmn1yownepfa3wwpfx10glct3cw9gvep1q4o7rupy0nynj7aiuiu00wq8wl0pylypb1by1z8annou74tunmk7p5vngl4fy3k0nsbeoo6r9dl2z9ketfev1l4fkv7pfd76eowbghpeu5broi4px548zb4w6kd53mq95tq3d6knon0pnc7drhyahbt5ybknlex2k6az2btzap7k7r9yh6p22s26hvtd236ip28bvxq412ihud48ai1zsev6kpd64te72fyy0341vdf7983l6q3ed8lcnnboq8mbc9ptasr2sksplcyppqx5wbss3cj1r3vlrr1byyfbg7w7p3jj6ni8pqtgy8inzqfgvkoqxb1gphudb6vfpglld7a87og1gog6ve9tcvq4fm7kn66l3hp6rttwkmj2jydwf4ivyitlhuoiuh12w2hxrqu7hyxo2zty62rj622szvgqe2co01qgynqmyjwbnyse7uvgh10vzegi8ce6t92cd6q8b6q1d9mtc6kpa436jex1omk4l5kdfplv7aj5lcsj9kloa23sd07a8s3dcz26vddufbrekq74vqktzf5sc6n0dz3d91b2wcq8ry4i481fm7d0wcwmhba1ckczr4kyn37dbu3f1wx1mbene4k5rdqowzd01g4gw2fzl6dq46e5vzcqhhw772vlyfh8cm6z0ec3c13q1csg5snqqyzrft361dpdbymz3857zbmc5erjtwist3wu6ou6pdqflv4zlz1l6r215mq3to4lip11v2mcjyzyrwivkcamsmxwykutezaq6i20tstmujx9bsc0ml65ti58hl57vw8ugzkl6y5y2d3c5st6ikbzmvxwm9y4j8c40offhasy0p7io2pqrmym5i3d2zu9uz1o8h45f6l772v8c7qwuxzc6hkey2z9msw7hgezc7en22m9zh6fd9r40zqp0b6v69awor3259pu7l7mqz0bfxejxb155avv1yeaecwugwxoo3xemcaxx3kav688xswgyyw3ihvu6u0ntr6k4z8oohekv2jkkz52d1e1msadnpavrq4kjlywezyl0t85p0mlb9d8io8kml391p7byt5qoi1to9os88fsuicg2wqqv7m69ovueo1v14ndavg4eglblcmpga5meajwysny9wyg6yp3k9adh3f42ujll2avphyiyvr41ihqi8s6ug62xdnt9n968mn388ksgl5wjbm6q59xaq6wzj8aiitqmuuppb4veutiwd2mf1q4ou5h2r42pcdy10j2corunti4r4iwuhegm90zzf6oikkdn03n6o24tsx0qqxaywgvlrepuwzhy8tzuvd7gzmcwoptq29dtrm67jqs1unlj3sp',
                redirect: '4amm41x38i3ga68ft8v13merunzqq7f7grkpc4tcxwun4wy77d6i7rqr5g4lpjp97u5fw8a0prny66zbkysddmiqlqreme9mi4ltxx4xx0oscch2ecsppq5rbtx75ot7aenupd3zylabes3vhg9ppcceqhxij05x8vd62rrudsfqgzkpoua72v4cbybymen96w7bh15nbhrt29empkyi4b2255tnkaj5fasy5ujmb6928vog4ibwky76l5fxhenfrg3csqpthwz31idhi3mhievl7oqc7ev5q6r2f0gpxdms92q6bk32g96ttiakxbkfpjiu364zmcsaulsrui4qwemh7s0mhmzrrc2npa1o145n0fvy7w6w8s4uktd11nh9z491z7of3u2jolfvgkgrnsuez059hctsy0v9a7q6eaan9sydtxrlh9s75xf9l52jhn9p4innk62zddqfa2dqgs16ac4pzmfexqc79xtgsb32chs30vcgt0zhmex1q5zbvfjpgx3xa8195vcte0qbiovyycnd9c9umy11gfsvc3lln8p3orc07frkcua0ikls76s73gkzkwk81mnbg61gtydwyhvmpnf9pog61zjtcj24ho3yvnlwhj03txi9oj7o6zwqiy8cpm30jabthv1ykj7vleoqkkw3jlrkjsd07b2qwrlbmdeb8zi77ya2c32vi4cfma3vbacbl1othx550nbudu4uzu5qhguwqc4zsb1gs2pys7tpdvoii183ql5lt4um2b0n2vfrxwx6vv6vyott06ld0zeed89tzq75arptyl70o4ywtkg9cdt9rhxxa4yqq6qcn60yndgrrujp279qy8agw7rs7qhlowh5b2zdepwh9ig8ss1rzcmo88srhitm9dqs7ajolwfyvc2etbcx89m6tiwl6o6ko7if4q61mggp3c5p6om4750r2rpv6uz1ikwf3qne156rzpy5gdsls9xgcpm1s9yfn92dej138n4at5ol6u9taggjg36cl5vyxgu898phmrxbt32yph0rwubyzb0i6260mrn2xikh836xe09a7ky9fpbj18hkq23tkyjjffjmqiehl1llu35lfvssw3u5u57bdfo6scq00wsapu7051pcwvfr55zyds6t6kg86kv7fhesj8y2bkfidaq1fnaqmuc3b06rjsj5zzpdy96a82nrqrol7ey4ohhbi38ulkiq9nzbyk6h8movli896ue3dwsgdz9hzfp496k9xh3n6rdvlcmr2ejz1hp7pistljcikn7t3g6etra9s7803fi820fgq45mgz5mfxvsusxhlh8tpzu0es455vztg8wem7chvpdki4g37c6359s31ghb75nex0kqi2s7tndr14ub6pzx98yxy864fq0y0p5dp2zuxkw0daf9nyq6hosl39rhxaocsivgcuji581t8c3u57cwscnycrrep72q4facdjhm0h95xh20qt8k4lgqncmgu6espftrk614yjmvg7f6500t1c7v72inb0pv4te1ghhkfjbouhsb983yrm4li04j17auq72yt2e6wvhu61wl1tte8s5w3zf5juv85uiz35bh8se58jmxykw0ctppprax0j08fw63bulx42mzg8uyf57kkmtzrl1u4pw1aelsy495ro74qt0bx6q2oz6p9wfikz3pwnolbwn6jlpm72q62hbhjx6onaifjjjjph064uv3dsnsrt5wrpt05qik01vvjcg89cn4jbbr1093j4ux0u36g35cjnvijyjzo90iz6qcmxxuu914klaixxi0wzalel57vvz5y42csdnznhjuj8daa9id19tvn400vkslqb8637dh71j9d7ao16ahor58lkgto7ujb00btbm0vsbjhuf8xessuvo8ajlevpa8yijzob84572cnf2j327lh2jiimvzpy8dvxz9r1uzljnwoce9g7uui2f0s7mr1ipa102ap6urrm8yj6rhanzrvknd054janv7sr66az0quunyi6dvmkxeup5f',
                expiredAccessToken: 4335419851,
                expiredRefreshToken: 5839728359,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                
                name: 'bxvyo0vdbm6wdw2jims94utce75kxjithpcrvy14du41wlmuox9q63rwbaulms11tt3bfjlck5xcp0vjvjfbq4t6j4oiu8ani91vko8x391v9pjc11rrz5x4k6geiurcf66gi10ywbiuv32p2qgczfqwdayltwfrwjmoxkl9jcsu65u5p3wpv6lielf9yoms8t5uwdvmej2f79thhhgkzv00rsodog0h0bvco8x12m16jbuymkv261e9v1xuw6v',
                secret: '6f125v27643pc814149jcv5gmlwrsnxmndbv8k16kx717pgpp6ekbz29q4qu0o7vj5jn8tkglbhk2piruqp0wwicqw',
                authUrl: 'cuqrgrnagt7ukxpht64hlhpu60459ixxnjq2g6vbigvuf4q3iz3mzpxclygtkppqwn2j2w4vseyvggacgloac5lm0qkkkpb037tz5dtskwoopn40y5n5yf3ch33p3kn1d830k670rsppt44jqqt7i58604gddnf7garuy8vywqwlp9hmiu65p72tp5rafkohcjbjfqekg4yuf7o86g4cqhmwnt0z0buljcbxrqvm7ui5xbs4r1f1g956nrkf4ee18cxi240md6b8xpzbccjjhfejac7nhb8w22uye721jn7bi0ejve8js5mm59r8sxv8bpsxyq7d7qwahnaszygt7iy8jik8w1012cip6ar40ziwf6hv8lw7j38mairj8y05xr5ad04jwrhj5mqqeg4xdvylze8sqy1oywkb5prqeui1423uan8jpeqdi2xlp8288mncpgussj9zvmi85m7pd5wjbxrt5r9sbm06gnhg5teozz1woy1dn6m9jzs0397d34nug8xr0wia902kqhri9i9crjecy6zy23xqpfys1h9trmmz391baagb2sj1tjsesyz0qn4num8k6t2rznn7rth5xeqtm259q0n8co9sxp7we08k877r04oj3752u8v5f9hdym2n6ual5pvrkprdf42eyjl16xka00ub8ztyjn7joq6uzu6mbs92q6vu4my75j68ruie8t3pm0hwk7nmnds8mc322cugtvt0kler92sxrgi1r2ol1s50swpw3w73u11u8c40n1nmb0acx4kkap25bopmkzjeuvt3exg0s41g5tuy5r6319trz1prdruv35asdv2bie96z0ozm2x9cmiughmzet7yj8ugehe0va50o4kqctm68ow9dbnxau4laf46gh3xqia1s8cyqi7h1whq2z1i4xm9v03oig7a8uv69x9ic9btehou1kb7gxvjnfk3g6asqbtsfilipq8nuupkyhts7unt5tgc86w9hifgs2p0w6plo05tdk7xz55gflp1osf3vnw4mrpocn5se8ansbtbv13x9t5n80dr7yr242xwl014ha8rnkz8kttb9xhwm52pgqmm90iaunx34721e6pelkcj95xw9awlmpki1vgstza2ayopce2mql02m16bhupej3wi7bwhfypmut50vuj8ti90tp7kecg2jprboztxp8psvf2wrcr4kpahma4yzhwl5k1lplnahe45dcmm02g0bwx88fxfrhnr62lu61q1xsmdrdjjl1v9m7qa5roz529f4igmp9evzu6h3ew2yetf76al438dpvn2lvjjphlrzjcve1wvlsnfn4xo1exruz07zlm0ho53ijhxa6imqj93zn1sxxmg4u89przwd0z0vvp69xcx4qk1b9953hvt0zkbsngg6ebt0wm7mci8apqmoo0nxeuff4t065b41iikt51jgzj464pco8hvfdi7du537x48sjc8shammra5ao6oni1ov06f8lkzgguojmovied1qjeg3yym040r67c2aw790892242t9fn7k9m98lng3njyjius9xjkw87ebztc0vvs21f8ykllstqxq510sg2h0v8gi37zm1mpjf760d31kx7d045yeisckz6ra4t3oge4dxu0541nhudsk9683vgngdg7mcf4pb1xrfqc25bzx6u58s7ujw1ioknl5ueotagcj1cntb00j49s8eu3b8wv03uh0zofb5i8i5qy6wxti2g56tqrdst1avhx5r7gf1orycrbcci9owqtpljqf047wre9bii3yf9rvuzw591ny3sakmzwjzi3mziasesynj803z06q1h22wzwhmgf5wjvli5lcbevyszemli7qnb1ok2ie4rzruhxzx9xp7gem3410e4p1se2gwgnuev7prdq5wd572v6fqqwzx2iwfkpat25vc1v6qm9vmrfo1hrgbecr32izrs7s1uxpz848sprgy5bx0irrff7homwaxjq5en4ctgk5m9vabmkhljiqaohnankuvzemmq2',
                redirect: 'ah5qet2eobzfivfiebznjwqyd05ixl2vszsakw8adftw9zs6j0kk6z84qb7ztofs3j8kk0i05qh9w049wv4l5u6fmrn6i2lz2r484kpx3suwmo6dahjl2eu4ummylwedmvxies8qi4lr0aypgju0gj7g3558ns9d7lbjqtjodca4fwdm0en4v7un29zy12jidblic7ymrf1hkabbgy8c49l1bkwb3oov03g5n6u8in5l79m485n76xyw7ffr7ep8f79gersu6almw1phijal5j25w33h78ebolryb48fbxaael4gr5g535wfald9c3mafl7o14pxilqa0s9bjxh9hhsmed88zl671e40ei29nyixbvsc44y17ok8p1inlu3u4gavhbp0d7l1v774s8fvxmzvbwye3rf4wl6feh287k1enbbt52b2v1frnl0eqx8k3p6zrc9iso5y5n14pcf8ih8ew8d3eonvest0rpx0qmknh3m00ft6d9qd8ajknfbtke1got3do914q20gmdvv1lkzlqfxdnqxiidfc59qvp30huoywzjrlk4yqfcd3vkoiv7ovyu8xxyx6du5hs21t8nvrm8i3sy8vwrjw8bg2b010na8rnzj5slupw4yxk54m8l1488rvz4vxxxsprv1oi0ye746rczz0vtwm2nzbu9e2mhojsv6cwtmgfihb29cvylxa1del2baczxrzysaw81azxkirzh1bhru6pkuv7fqu897c2yg1i5cv7qkpky1fxowijqqo6n7yj7r1heh5yw5aab33sza4h360cas037qpg20ssl0i6dzc6pfs9rzrxtvb84gbd66hicofiesffgqyfi2mf3tukjndc0nlrwnnushnx9pa5zzmq2o86x1v5flbvize95vjtzd825ubazfpmg42wa43pbhj5aoe8uw4j5j8bvefyunld3ayhyt6hx12ep5c6gtfjco37imh54cj1g9omquha3wyep2s064sgno3h02sr3lyzxaq7hq25jaqy3apgteu9awd7p7wk5whn5kccdcof6dnb2wyfb871l6p2r0z8o1o9mftt8gjisa6twd1bx5zo5qjp0dlqwidmfgzr9bslxdutli9p0qafkr9h59r6p1s3hhp84gg3d35e11xiamcp46j5x8dqlunwmpiuum6tf8ppea4x1wuoahnl8u2wfn8h6jim1e1t6wsha7p87o0buwe4dh9x81z7hfqbdan1pp7y4q6re3bict0rpx3bvzybyso9eyzq4zmp2wod4v6flhjdticftcc42jq9m5t4qcmzn8popgtjcelfrxh84kvktc4cbrl95gjf7daxoyssxdzj0knte4h41i03764d2uxwu42pdbrjl4fbjkmkqmf5p8qe0geug5t5frx0tmsjptoi8bjcp4ada791o66zd8taohb4fu7ft4yarlrsg7nejvs35m5zoe24cr0gcx2dwlbib4efzcbvmge468ujt2ask95ugasocdomrbp54dkho9cxsvogkvc9j7k2g872p09qrhhwyagyq5o32egz6c5m08uje1tg72v5845bkld9093m2zpt6j6w9bbtj712ra46yk5bldfpj2dohi2b1nlylrxr4v378dqtd02rf7vwt7i6qbhcavf70phdtwlfsfu29cwmrbrxd33p1r9p8ed2at756kbheq7s1gjpe4xnxj7gx1mu88qqc7jfk3koaqe5153cfsggmoi4v7l8ltbhpbtuv0srsvkjrsxjfgc26ynevcgp0ugoptlqn2mll4961q6w9qsx25ps5gvkonb8qnwnpzlg7ezhnkfifhzjg4bs9qkd4bs93c4xmgtginkddk4o613t3bcl1f3fp00bsolez2xn48xa9ov9ep3kkstn3jln5wzr7hxokkc77xhmxgyleo6tlkxuxio1h551v1ta8ccn9xwpyeybuh1nddw992oitcq15kqqjhuqn2ld77ly3ooq081r4tamylzzsob7lrgprpnoxyj7q3qj5vqdr2',
                expiredAccessToken: 5843621412,
                expiredRefreshToken: 9281571304,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'AUTHORIZATION_CODE',
                name: null,
                secret: 'oci5ivsl28ap5d0mhbtu06cw45pwv6jays249g5nvrra3rnj3kim9in2j6cm3ffv1wfrbvsv2cz56dtc70chyqodet',
                authUrl: 'qdnn7v3xpb1wcohvq7sw2li2ifa9i4f1mw53azfkkll2lcvdt9k7qoui6dplvx3wijnxcxriec4qfawt062w99ydufsltj818uu5t8z7j5v3cgjr9lzba9v9lggbbjj216biow9lsd3rtmtb47708q75wmgcnvy0xz3v1rf2yddcgmgahyxgjqakav37c4qaz2spe4b3wggujcjvn0h94zg5ou1msih3f29ew9mgv9ton0x14t7b1ssf125daipk2oyg85o5c6z0b8pft5abg7j15lqzaqvlgji9shatdv5a8klz5c6gtj0fq8amkje4frha97gwe0v4d25pckwupcl3dxyn5xkexrjjjj0mnjl4q8srw8fnub58o1dnl8gu3udv0gljorrddkepckyyaeqxlvxash1p38t964mtx256gljrlbrfw8mkz72likuvkt2eeolts27qw6ufljkuav6hqqw75p4spz83yhu9mau8dbqf73jsfsnvzc4rtjyf1lb3rtnc141z4q8es8lpgwolhpaw6i237ray3mwrxr1gw6f1p1qiqxokok4s42laq6565s79zii0z6l8irpqmcjheyzbm3yv6vr1tdzfnfaywrsmtri11n3nufj055s7r5hegt8mpc1kec18gyyai4ot1t7azszqy28ybydd3s9f8512s0y517ha6ca6poikyhp69xlttb76tx2s4x9m55cmvbyeilhrc0abgkfrpy4wti7vp6mgtv2mtc4ig4c1tby5mqmcv3zr1jl5plih6krj4x6swe800i558gsl9udi4y7ulux8epq3dzqs14lmallbziuxsvqy2aojrtrr35pb8fuar5v1fz14eu1pi96piugm8rv3ek46gn0k90lu8aul1c4bpqopbylg2ioqebujubcyijcokhw42a4i895gqz2os5g2fxr5gg64t8nygv3uimvfuyl3gktowiof2d7694n5krub1sn0p3oapm90qp5gxc1repvftu874rpxr7qkrsmolkzucc396zrce660p5r9yhv6jzxtswy6dthkbutjqqguxqnsxj8cthmyakr7csgyhv1b10v7wq4xc76bs8r1r9uiw9bsf0koc5xxdie4pnukovaupivxhbes0et65xvo3pwnuv7hvcknu7n1t3rh3wywge0m0hoo8icmk96h66ds0pfqzevm7twebpyg6lbu8qu91dyedwe6jyjaokngn93tv5kzc73qs13omvm2q15rf3ctu7y0mgx7n80tzuvzbg1na1y4mhnkhog51ca9oko87zn075njo7n1gf59qyupae68y8h91lcp3qeumhuin8v82ykqki2g066dn0q4jmr5tlsw575p8z7xy55rh9x2co9kgccammd9jem8f56uwrzb9eb7s2poqbh38gvc4n627s7nvysumcgzndvhor5hwmerv82b40xl1ju7dmucjiuipnqgvw6e49t2e1k53l5jdrdxo8ketyerc2yxghasgf7gli7a0nmiluvkx5tbcnzpvc4ts1ag1pwyf4i1grotci24v4axep5rtohw9c9uu0wxyxooxy5vhnmag23ezrq5m71ri35upba8ai2e7lf0maieoqqxrr8lvca68qo4uracfm7uv9xt9bu3nv47aedakj7j1eqbx8hj49emajb854da9hsyp3ty1e2hsz8jvhzqjohtjflre36xk2v1xl0lh71h4v4141kysqzqadv05cdmiv0jziiqwzqtqxp39bhfnvfewp5uadfk4zkw2cmvlia98e3fuoy1j8hsoyl4us9wykc4clcnhxxg9oe4x3qdrsonqzvqzoukx755aqwgr8fc9cyg8qx1xiif4ff9e519cke2tkcbsr2u8p7awe0slll30td9zp9v7a474i9cnra4sprotxlut7dw5ghlayl9ane9su95r3432niiriunpj42uptne5bnohz8vz94s4aiexqiz3fjuob4iwu8j8o4njy0n74mpx26absrpbw8hsjmbuzj',
                redirect: '6rj8bf2ib3l376aa2r7kfu324xch6jq3hz3uzsivms4816d2t5xabj0u4wo0ng6xe7io9c3rnblsewjg20sr8gcfyda3ad2cjrozbnu7gxi37pvntfd4ja45dlff4rq5y4b13q1x9zd35hh7bd80hf9qz7y8swtmi5zyzql4sdgtbn450lsngcfkxznstuyffqwjpkhhc0n7iw6mjbkujg6e4rppja5w78y21hjva5wgyezscp9lkqh5lxmp7tffeozjsm8lttt37v0vy98qm42ts0znxbur5b9zy4jussb0u94u5i4az4jr8mybmretny2rqzf90fo2nmqa2k9722jcn3pk2luku84olqrzd9o61lz7ezhcfwb1huugug0demv5wx2ki5r715bhh9z6kiroefgtksquprlk6et301vnhexz5ggkuqoeyownelk2g0ewqiq0l9hz1m30car0a7oht5pdsi5ogi0gxxvitozej0zvp5tehmsncb7be2r0t3l4jeq9bh7gc95wv3jc71qdckxfjp5d459tgek88gj379tfxcfbx88vrt3uv1v8m0qz9c5ukuz1dmhiiihqz9u43jx49mwsgawwy0egz6d7zb045qbsr8ji7bneluhdpcgtr11ncyq29b18869j33kuedrez1bbcntderrx8xt8deiu5hkwn8kshawmyy8bqdf2eg13glhkkol72hpxk4rk2rn1sd8p22tml6yewbqzqrtct8j23yr3m5cotzoy7xkc0uhp7jifemb15tat9cah47c99zuclvemts97k3wa30dx1wc0ddlnvrv8nje19sz4bq2y7225a4m9wib3t2jwofj7dzykviwoo6d8h32l8z9yk9x3nrmm2dxo7crqfqqsiebezzs17up1o7elv8w48wenpyk4ul0kdtofxefnfrizpakquht0co1dlil6gscsbixq8oksdkfodcl5sc9jy16a3rfk5vpw1r6jgj4bsbyim444y98mmxd6seugxkcz6whwss6gr79yut288jd427a6lvckwyk4dpjypovtvonnbdmobb38z1vy2kx4ir43o5oqsj705mzaey2ylhelq6vd8ngrp1fxwa880849vjowugj0oi9jrunb0q2rxkuvo1tixsdk22npucvswrjoo05c0m11fup9ryjc0j4uwtf9gscawet87d92nn0eq9szd852tg2953h1afw0qo8d5oq7i7j67dsgto2he6li9q6xhflj0cjmewj5c8k0vnlbcvcl2oka7zl18yw6jujy5e7kuyuc2nftcwwnfjub85mqj5fd44ptdydsy4a2dhuk2p61deoghjlur3w1j96jkrrnrkd9s91x5gdfdzg4kdyrn3mm7q9r6y90klzsynydo18psx6bafbl4hhw7bc49hs87l2ozwfojltw4asw0atyhrv1tnq42sb6ywpikliw6xr0cubdjlultynbg2wwefh04lr2oed23kklaunf8mzwjqnwbsw1jw273jg0c6yk4co6i6tigp3o1vw94bthfacypgrsai24eje5aasf8mgryfkq6nbg70lega1gwy6f86wk1rz9tgpo0hb2vhwr5yrwcyo4o4quwongniznhe1zn3uvgap9xvugosb55zjm1758ca62vuwz6ibyb361cs9t8edmmx0q72frm9k78st8rezwstrc30pj5zsxrlrohzisqe3u8bb6a3vb4n93y97chzhxw7s32mgvt04z9npwa23qgsdz0c85hlqdgbms5kyizm4sgivhfpl6d3bjyf7gxc3rgaske0nj220anqru60ajv1lxp9cr10oa13gji6nmqk093ufe6rw1t6s0e4vuq45cvlw751iudhgbof62dxgm0gw0ety2no9al4d18vqqbum0xb55bdoh784o4b81vh2d1erigxwsnabpi7u9tp2z68y2piuxw4cmz0n89ub1dfvoba81120hwwww4n2fk4jius6s35q0w1bdrlggegb51rnh6jyxmjr2',
                expiredAccessToken: 4924863016,
                expiredRefreshToken: 4802638715,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'CLIENT_CREDENTIALS',
                
                secret: 'ca7cqwzrlh4vx7lf61yiepshdnfaph0xuie8ir751brziiv6qwmks31uji7uc05v3n8xgbpcciad28zwoy3kh6pci4',
                authUrl: 'n6cs09pdl8xssc6ab17k0tvx3iqv3u4ssi3mvlvorxgpuf06dt93notxqgoawa6hms8ozh7g2u0zojcytfagmlk9n3hhjnhe1y6zji537qmsdm80bys5knhzfcrt9hwsjzmovye2kcn64bot7ss4pj1y8brz2pprjiphqegialfx1iwp2v2l5aonzz9rqmzsie4l2mrlr9xqo6hit810noe71ybddaw31uqu6vz5lzymn9ff9utepwwdk7qt51cr6gku0z4auf0vv783o8boqths9cxglp8xmq33xlono87o40zor321rwrmbr9t106esx4vcwgrdsrc1xreg9fo77wkd9e9zskekq9m7qmpmf608w673f547p5651n02bq6s7iivqiqyqkpq9rb6jf8seqnc2icjrwrehanw3vbhf1fp6vuazz8n9wawotn5l20t4p08u8mgmvwjqt7x3wl5mvi5kvhtmg64w9329rmwcuo2t2e1u7onkirofyts9hgee5qwdtpr6m5ntp78953wx11h9n95dbq63n3sc4b6l7668ms1adhyexrx10kr16gt2xc7aqdo86lr1tish7dw1e313pe5hc5phsqfwis9fjbpbelfclfwosi0v2nd1gu4cocgnlk48ofl0w19ekybbf6ce4bg9m9oqocv4eiin0ee6wzghcnw4my5lvef48bg73yul0oymqqpdzr3umhihmvzgpv8v7zfe39fb73d73zq5o4qa7vuapmrmwq5f187thjvzsxj1e9e97q02ab9uijybqwzfzrvk51fwq7tzx9c0hs8514an817j3t6o74ggdrg5fzbs16n4w7127chlddu9q73yt97r38soqgp675983w6ciq0k5cz1zvi8tm5fhcxi367y0d8pnbwkxncglte3wgsr6rc3rr4f76jnjmry13d6wyd74njmjhdhlvaus20l6bzputdjafa8m0h7zo51xpbehppg4oqzia6936ugah4h7f510hyworsqbai8qk5lzru20izp79kedtotd749qmby9ddc87sfssch6cqhsy62eoom09fh5fz9m186f6hvdq8968yo94ho4r9k19kxbs66ntwixp4mfrzln68xwqq5wlvsg9w5a8rp8gjcj4nlcw8hin8tfz6i530ql0zlhqif0tuq0la7l1lvidtxqgifexlkb3ldu8dhsvenpvofhxe1phtwv6reutgrwxt59d8gsw015gv7o6ehbg1qshpdzt55jsdimqgede24hrvy7nn3jtgpkia1v40z6csa2pwrzbp5yy6590wrx23vmmwxaucusjav3g5zhy0n0c5w8kpx51l60x2z8yaou52uzsbw8jzjdvaikgkme8fprgqdgjwnn8iyckm80w1lkpoic8v2738ozajm86t4k5p4ubcsqxlff26oeb0fmb12ehfzxpb6ue7ozoq1y87so3e5vzstcczd6coslf0vdmm1luglnp1e7snmlei4pshyv4pons8wfgn2y26g4wctiwfi4dv6gkp0p2fu13y4p097vw00x1zae3bhf65aqwybznha98707tbzna5d7p66uy3zctuivg0f8u1nhldjz96bntrl59uzirvdultt4klmkdxg2hhrbc0ydrpd6821q43bhnhbr0gxase2ujhdcz3hpg2fyt87mibc3s3zxt0uurq3e43atpwew44i9cypu2f72lgr7rt3x5h6igq1eqmwunkqzmywwooawsdsqoj5s2ies8tqaiiw181j7y2st3circx0pdg2t6qa4vmu37z64u1igcxqih3yi3dmyh6mil9jlnlrt9shz5g6qbrt0rdtd3d4iyc11svqjt37hzj26opw58cejtmryxh5d833ejljk9hl1id1u16zak8l3cp0kvieq9yto2zudskowmkly1jd9969i5099pu6czyj6x600aw89bugo26rl164bl64vk3j7ctus0i47479oltw994nk8tp60gyyvcjgjy19el7atm4mxsunze7k5',
                redirect: '14ukpthr340ythk8eo4xyc6ou0eud1kfc15huhnssafqbeeqq6upoz1g4jeou55p0axa0t0ckdoxg5ljvtzujx8vucon2htolzn746y708pgq9689yo0urw9wld8x4e2yjjgspvu7mce2nrnewg7e8kyo87blu3pe5yl5yi8r39hr74h9yrhabrnkrno0alec4cla7e5jfyortzv3hljf2xczusp1chmwt0d6jmvlxelp2ash8xymoo098qhld1yg5qf4t5ex4hvqw0eugz5x3ke65vta98g5s2nbgza1v15wa7qqzmofnbht73l5q5yulhm7avhmb1m5jgq6x45vw3jih9b1y5v3r51a636syyxpzki40r4f5gsqdx5tgea10nv3okylguyfi5sdtec701qt4y93n23io9q6jyahe2t4h3en9ir5knj2w4a7zvdc86i822v5isge9d05i6raxijd086jh5rnrbxvuyos04jqt1n0zmii0036ba3b7hn3yuv6lrotlnbn3qjov89yawadkky2i3o4p1qcwbf7xxb7mmb0xbt34bbne6hm7yx62g1y8h3xocdrvu1gta9vh7cubjgz3zmtfc8od2aymiwhk6yeupdld953z0oq8p7z2k5t2asho7exus4te1vqj5yzmtqm4hwqgekrk0ln59go5whe902agda1gddzzezvsjkuwz465zg900nabouckjggxqamd8qvgqzp5sm6tuw7xyhxccovangfk3x19j72nrnxh1jn3zj83lyzd0akjo0zxpm0h9zpkb160k63d9bktxh6841lm2b9cqbd3a9qweliagjbinhw7o8ly4b1p4gukexoq71ss27h5q228yeti58th6wewm1sfeuhag3dwvq2zdtknksul6j07da9md9el74qf5htmicqo6ytids4cmb4xfmawdgo92jup0rht8tn0kbom8ila630ny9kh4knc4zdeocklbdwiph0igfb95tbm0t4sl9e139myaqc24woyz5hpckqclu1edl50l7x9igb047rxrh2dvtid4e8mj4ryq4lflf0bre7vxeaxekgvov3n5s2hn2esz7hnmynbtat8mv10333z3utran4fzt5hbd8m33v9138w5cbl0p75xx9cmo8q3axdm1thwabgds7kg6t9698q09rs55bopogal2b31il3y5mkbkmkrny4sxbftx7yt9s4b7fvcfiiio7ke0df5capddfgf9ibk038gtczhgxzr6r3m82tuyxcqssx127876ihrszh0l4g14g8cwmemwclaf7we6s1iuwt0uqukda4hi553baxtso9phkchpt5zop4fievw8r0ha3cyhh29ojr1rt7a2dpmuiw6v7zu8xc79xye9sw861n5rozlu3pj5d1brsjfecrhyhwn21w7mnfkhlr2t5piksf6xji9rf3tybx1ye7c3j09thgpr4e8ug3d7vcl2qtyig4yn8i6wuf47b526bw4dxjyibdlvjseybllkhe5lh6afodqki93ndsd8valdoxt23yaybpg6k3duuarw763j71fzawyyw79pzj769y8w32qyntjqbdxwozzs4yh5getrnasl0n6xf0y3aj6d63ik6tfhy7i9977iezm7bqhtzmvi1je5xaazreme4f9vztzbth2tqn6cdyvrekogijlpov4pn3b7ktg4sfqcylkd6obw04euxsbq7ifh0ucyx9dt2ryrfyl5fihgrsk81miet3flrmo89xuar5ycrshndwzyd8orforzyfce366iqkue5u5oqs2mvm1qdhyvdw50zxz77kpu779molfiamfettc00n3gwhqjw5qthdktdfxzppi9cbu1t0lzoftuudqctlcn391vmmyerdfrse4oa2maigkv47jrrptukhjmq38aa9y4s881saerh8bmp8mo4piqgf2p8ligw58or351pfzih3tro84unff2qpo07rgt6fr7so9an3xx7z3ctxjeclv8kgbi9rhxp51i',
                expiredAccessToken: 2445194717,
                expiredRefreshToken: 5992611428,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'CLIENT_CREDENTIALS',
                name: '35gtjitvycpiz0vhdew2n5y2xcfkisr3fuio3a6afbaj7ch3w325yzn6ivnnab8pt8fzzzcay7hcsvnl11l5cuzgwpcd66kgh220wie5vod2u5ns2xyqodj8g4h4sk9l63iudust2tyzte7o5qhenovada9joftbh3dtir1vwzju8newcxbbm0ohdldeg0zcpwvrj0ckwguqwy8g62mj322hejbty3l9gb4sqp54jfkupyg796lc8a130a6xute',
                secret: null,
                authUrl: 'jzk947xeqfa877a1wnt91xgtwj0qs6iov48pbud6f1aibx2loq2j00zt6wetfj65r80ybsj2q942qjrp4if29pnioqh7xh2z3c0uw3qvjhjiqwfckxpecw4nhjqfr1fi9rto80yr379yc6d9co4d617nc61imak88bkyczu9copj8wn45fwsx564dwyk63qez3osyohfjwrlgtkq56quk287fintyzwogq4csrgl34ai1g6p740uhx4a2kwdztroydix8y9v9jx151zpb0v30ws68zrftlkvrgx8tiy94csosg4klu1r1sgnkunkxmkv9fcbq6p9lnz6b92f91dq2y8yhp2ztoi804bnd3ic93k9uw8iwnujf6wsdquf96k7p2le83v83yqt4cflavdhli293jvar9vt7vgt2f0q9mun3icbh05namszg95776ek8voj61sf0l000c8nguq9z4wrie0p0kyz0ac7ud61elfiaszg56zv44j4k2aj00ypyh0n0zweecqihg4933l5yrrhtnx4719vxfgjndh445wehiygn73s9z83nw3wiy5ngfk5myp8xe0zufq45tlsouc466agzbzvmaxyqqi20tfzra3jbnfkckz063gb10eqookgqlskddz3l18cgn8jkxsa7tgu5zqimp5nn6788ohuiu5x2pnykn8xu1wnvy6t2fgqrs20ikth5hdfqfsyo79x8dpeqv0ps41uifa6900rv1fqdg8kczytaj4fg6ot36edcij4odqwjz88mv2b373fydcdbdnktsymgu67suq8h1tzn9xr9dg97wao9wgulnrgtfvea035urwowon5cnzu5tpf4lm18lemdcfmngrp4j1si3vfbvo5i7vb33259cvrdd5j12jstqo4mws0x6qz9f24qcwk4inhyu88ukwf9b9kwxzrufetvu30qarqktblj1xptwynza5zmsor2csnplu46k475i1wmrgwhp16u45j3m02zqb562h2ukq6bydxvs4abc4me70kiv72yqq2g6s9od20rbrcv95csn0wgottjf8j1o9ptnyl13t1acwpenu2ge0ynt6lsrsqxjymldd3dqiq003jrbf1h5vxbhwul4eh8wjnll6wtzg56ag78kqwbc4c37ezhn5v5gtlbr2783f7c4mejv0mgo3dy9r6glcxlyi2eah9e4t5wfxo7bn0gtsu1uo9w4nmerf0azrqn1z2clfehknq71t26xru85itfc33i4hqx7iufsms0tw2w7nxewxjj2c34cyv7n1lgrbwxed1rkf4m9r4nkur9ytn1efmr8rwxzrz38weflp46oj1xda1d82x2zikfahd1o51n6gzux659enb5jwt4rld84q9br3irulk35tce3wqk8ouf3jzp73459hxdm6mgmbbyca8y2j4mvot68vrc6vw9x9ohecgb11ond392186gky8ym1juj2bkrtv4kbdvpix3vdkkrl5qzqxfpxeinsnsxar7wp7ylx3g6re7rm4bul3w7r8mggolrgmg2ttew8hit0i2s2t7c1wfoy8jb4mtd94bhsujajj8mat1mirczsb8fx9elw6t7077zhlbux8wokx0hbbgxe732i7c27llnff89aco1n292gadtrj7rgxfbq9es6q4o1fgkfgmwbaz4cr3u9hz3ltf9zxag5umtr3bvk1s1pkonq64uv94igd4mm8jgmj49rosj5rigtt42wdtssnqvusqu1f1lthwrcciwxsh6y6kz2lsp1x5upez3qkhodjhqt1tted4g8sn31icl3wbicf1iy67nes8iooew5dfj98ajx5bw56xr9f7xwwahx5t7ocj9zbarbz9ln6jiaarnlc81t9g4sc81i5cnizo8l742mapl0cepgkm9hxoetmb3ikz59vzekcyidg95t2t0k661411plk2w3ntej9s1e55498g8997hsbem8kw4v7y75i0rnp8y564miu0h73epx39fcygdydnf8tke7ltpd5',
                redirect: '8o8a1qszcqevja1i56v4myygj7j5mp80lrazyudmm5j0gpk2miotereo0up3zcqt0thilslog6ddux2zoxmhie0bddxvoexmw6iekaram938qplyiummhhqihx6jrvcqo4ua2wmctg1nnbt7ru6dyimyhabtuw3i0myxbbaqdm4o2ccsrdrpadjtmm4svsolw7jcar8fdtzkgbbojvdsh2v0lorr1xgjl1mi34ff163fc0ljjwe9brpny4am6c4dyzo7jvj1kvnzmj54sis6zigpkjgk49v8xoudbr8tufa3hze2umehfkt6g2euebw4cmisucw666ommq5clkuxzsb8ycqgqsckpjsjpwgcz4y4k5hdmmmu0m1gkurou9y9f3rsd4higu2uzzcburp6zzy7gcrox0xm0xdf17qrkkb32cfjg3hkts09wv6028a8ycdfn1o0sr94ypufcloha9ng8h01scr2h1db97v8niqdcxwuud88z7hdlzkicflwgi097yjzomctk6nl148uilzw8rqg09o4l4prxwzpb3uuppyf4fscu8kbx4pl9s64cbrc2l17ql9yql5f6qxsstlnxs1am32c2hesv88zvmx27715htwl1okl586kcc7nqrvournkvstm0eaz8q7t5zj6bkshtoylmxrsp876rnkkmzqsd4fxh8o4pjsz4g1iduvzg08k1eenkbwj13v0ocqkpkm8vdbr3oosqyt9kea4s4wax1ntljbz0imeyzbb2zhwykme30zsy4sqk1hm64yntof3kr18n3eq222hl1iqh2tlgclk56tfwj41anp91jbtlqitg21njxz3pr0zp6yyxqrlyv6j87dzj41s95nrmgpsjcuisza7cswz4ahjj9vl5aan0k8ol9ejkvbxu4tjx484i9rs455q7y6jhqxqy6zjocw7ushxxdtykwwi5fjnctlkkq5a1x5fgh1a4h6rcca3zjqa1ei4j1p12eh2nco1li30juz99ywri89kwohwiaeegss7hxiw3mjgg6zn4nygjn3rl1lq7xdsuws196txf7z4r6svefmvl3nuy1rrnf56g2huu7uhamlmoqbpxpgyxmk25971rtxw77ow53b2c974j1q9tnedd6tzyyflji25l6svg585westkluwfyuepiok3q1cq9lqipwpu6yutnnraeggzxymodqfu0ck8sx1oc9dnywnhzop0q9xzbbiyyj7wz3o3u5xdupwpvruwifodp3k6osqrm91c76bthkj41ouw2alrjawsnelv96j7zoc0fkgjoc8gwxiphfjkslhqlalpapkjgmnt4azrgv7pn3uriec0kemfnix348r35cz3jea2suip8lqhmbl7qzheyb15hhxeg818b7epwy8u5hw9pqkqulqiep4bd2jfg01zykq4wfke6efn5361wa7dxiblwgniuu25nde7xtakflkdnatl0e25z5vvc4tradelrjy8ovo09ewce745i4y81os3yos2227n5okkx59plmbjqscangk5tbfe7inlgmf89iv3xnpf621pckatmol1zk5fqrx0k0fhsvkeivnuoyial2hyzf8m0jyqrwaj8qi3pli9xiygwilhfchuolglx54vuglr8q1nhhd65p9wc6hb2ee95xjs9pt5j7qacmjz0yjmxolyiyoo34q830kitqh2lsbxdke1it7rje6oh72kw0nuu9h7khiyo7mv2odwccp7u119dnvy8p8pnn91c049c205hyramu9z2ddnn24l8locn822dqqp0jmw0f8xb1bpihbx5x0rg9e4j4f535s5b4s9cmw2x1tnxogunaq7fdl1jrh50f61mnp97vqncwy4a70y2vqiiegxybp2f7up7our136yoz94m4svqg6j1hwbh7f44zlzuq9s0r6zedu5c5qslw8ay4buytfgmbtn2dsiw82ilruj9l6g72zxq4t5i2mzbc08k8rry6g9qxzo7grme8mehckzdvxdcnqcwsg4593',
                expiredAccessToken: 2603703441,
                expiredRefreshToken: 2221821631,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'PASSWORD',
                name: 'i0swp5wwr20tpjguf3g4j907lhr361ykxcxhws92smet7immfg1gk3n4rdhmtd8kb92xdfs3bj696gfumd9gmc4mc76b72qn1v89qzevbicw3cojbg7qn4mn8h8ft9kqyew16z5l9qmspqna58b6r8zvvir904e34vlk4hr1bbo1b0jx3vj8qqilyyzu8co0e7c6o2by5pi82241pa60w9lt9r0lh58d7ob6ag0tlm68pkbuumwoo5xmrx4vnwg',
                
                authUrl: '1dcmyk2zzqlu28vnkmviq0axlnskzbuyd27r831wrzda657amoxoahy4klzlrd36gi6vmnm2nervv8r645olfswh3biva203fehk3hts9epn4eie1xjucyeqpho3f42h343h6peo3h96zbp8apftwor59sx05ljr55phv8o571bcfw9ty8p4scu5e4bp3lhljlonuvd506a1gx1qajbkzrnl7ny18xowicuw2r6bpyh68czjqe89j86y044lli5q1fpdth3b9xosta1kgthzjrn9bxjhrg0ikvbmwbycc2kbjuk36gwdcke24atzlbhs6dql1rebhugl9lmn8euhzxbkfgtwnrhae1qg14nprejx91i6lktktpnhl7olpcuc6kr8t4dreirwgcxuug5w9njbvk5wf63gmc0k4ioh9snu0xfjdujum4ej9nk0nhhf4ajefnxg12hh2jad6hse883dqk8yh92b6gwrcswzgq0702oep18n6rmek0dkmz8373gvvrzn4etm93pep2cxnhvgv97j8gd9enoideeu5r0e4zg11b8ctgwtx0ynnzk8z5gsmc9lrp27pt48744lxdxyjo4up4k1ii1mqcgi4mcz63ao0kib2qh1w6pbs79ldhiih1x0us4mqheod55e3e0mppb2qa6y5c9n4k6cb60pmmhrut3kry7jlkjjunjvy0z23x94fkon16kiv57z73mylbur2phi2igfpsaw79rbob7fqy5lmrrr0lev85xbrjd5h2kxbm7tlyvig2wpa77odw8zjm3zdj1evc8pk5skwaraubgm1o7jd72vq0x11pz31sh2i28dm2w4qykxtesqkhsgr2wjrstcr0ltjlhikqo9l14nfvv5cy2ele9ce1mhkdt94l0m3098eiibiekau579nit686q0gjousb98sdsy1ou9jz05jb4ka3gx4mueeyis94bjdsxgrofwx6127nymwtq0hh99yvdkj5wwv9302k8p450un3lhh78yysu7qn09q9mrhlc4dc145m1ahf2sk6p9oakf27pzjkqne0qybskfe0b497lnxh5e036qay6jvk68l3cf4orwbgl9qm1at6vnwwg2yrmag5xntorjinxhd4pohtuxxjhyou76qm5uw411sc6px97bf5tnxgp291s3rlrzbdjldyl4iezlbxwz11z4jv038d6vitffzznfcy7n93byhw775kjfau8qiofiodf1hncd7ue22ug1dpo0m021o5rxoktmw48ssdfzpfpfq9nuurny4c5bdf195zcv15nb1kpg59wkfjb7wbq48br1ot4c8i5ifbfya82mja56ql31uvf7iepb4z8q5vps2b0zqjdynzcwzmsfiwphx9o9noyfn9n9ivkb6n29mbkjmulg1jk9n48bluf8esy10wwbyzvu8e51sg4tol7vgeei6nhtvlvpqndp51krq3yefzgwyjqyndy5rpisg21jkcuakhjguozw51rb1vjben2sn3caoq1cdxw43znzfc81azqmk13j1o67lt8vrodj5bsjacxso7hcq6lq4ww38kfx2rbfepvcqwf3l9zh4q99fmrz4gmtirh0ojjjwspd6rz6umcn8eq9830jxk9yucan80ohnhjqhqo1s7bzsw178bdftbducwqlxtocrhks9a6r11w51s4ehzq1m6wlmjpwra9et38knty9m3bsjfsqec77dq4bm6vik6e0m3c2i9ip12gu9itkek1v8zwd4msmrg0fxfitp9a2aw22qmzg3vfh5wojsvo9q13n6sisp696bpe6gcjorhw4x74xjoomxu9bq17vqejirlqu4iqimyohbcqi52xtsebwn9rtfmpmdmg4roq9sl6c4r6veiodmy1qih5um13zadpnruaizkb7wah0i2j5ejshgtxhtj8w8mwkd9ndw9wwxulgcdpnoyrmgvgaf2t7i636y6z0c3yfnbk6v48ca1kkhs33049pq6tud3stn9j120i589pbm1tswa1g',
                redirect: 'krqic68sexldcugtrffchizwuk51ve1h3nob0jsirl6sf1zi0snnu7xud954zjd47msk1as9zmq4n0e2sh673iurn3cqxf43tmpzg6japf9z28gf1r6ey3v7km2zef3pwjhtzn2sqwkh3gjcf2laocrka8jd3r06vuh21d8j425cxisb481bnl9v9fofkffwu4vvgxtil0mj6i8x9vfdcaq3im52aa685ulj02no232be6asdhs8f6ikie63aspr3e3u4mfpiey10tgnb07cin909ll01unxwxq0euksu97t8clmwxmo0wmts666jivjloyubj4051qd725hw18o381ejk4tc837k22t8zcf5wtcz9j1iqk7996160yooz8cjilryszgpf79x36j0fh3nc57i5oeckbwlxqlpi02n9h7bclh19mb6j48gd27e2goupj3r41n0cxuf5uvpu148uroktjf2xw6q1rkkry0j33ftsrcj190tp8ag6y90uncejtq352tntxie8v0v320pl76uqe7f07223rn9c6nu0q7j3z4py34vykh88bjyfw4myds6uk9v57ip9i5ka8tg18l1jlq349h0psii813iw4c6ag9elo38eh4cg52awirx0wf26qc2rvzog1mqpu6qabei1vtbhgj9beqd732s1dybvvuq7nivo86c4jekr3g1ptykwtucu1hoer70s6u89ynr6c28v75rm7klwdy5mrltvuqoq91hfgd9foxlz9tfw9rd1v90cshnn80rj6pvawc3p56qvmr5m1rj33tzgtx6r8uryz9uhr90fjstppo8q5za2rz9h71a2hgafyo3wexjbcus2rxjbj69v728tixdz6zjrf1sdr872thj4ukcgnvs3c93i4m8pkk2ydoqr9zyw4agojp8kbp5j85cw7lsdytej50plzoxou1rjtkfpn9fwhabcbhzxra63hh8x4yofw944i1fesj71coev9gxuwpr85d0nb7y3fdzja835gk7m2gr7mxjalleq8pe33p9cc47pcnin6hxqeg2n0azlrcbtwqaljmczca261yzdmi56bum9nd5ire2geys73y080mho95ngusfyw33v40muv7sjsyyute0p67sp335rvg32hhedewgc3fu3981x5zjjbare0f8190pgyexlggjwjb1me2fgthu3zo9v3tfsvtgyw0b6m5naeuvwgik908njaiyhscztr9duksii2zq1spe9v5e84h50h9d4rv84lsds6gikyafsn5ek2ltaq4zjobe445cfy8byxczo3xifwxb23rrldzfk2b76d41ihfyqouaevzqfea594q2l4rnh4jd9g8pfwc340qquhqugioljikk8qpk2q9uyea8pyvfg40vyhbpay24wamey2nfd1pyho0a9txjukxu8a516kkc0lnn664mqsw7yqe5a8kb440cn388s76c9itmi6g229v9txxouzbdif7x43lxq0tkw9hppcszywjygwsmmgc4wi9caf6f8uuzg45nzz1fppkcf0cuh3bh3or1g91g4i28w8zf5c2ehx82fq3ncs0qdjraar8g73ffcbbfqp4pwjk0b1w4uw05wzflnv592rme4qhaz069132iesiebfe01rknuy6ui60663ynon2qtpvuf3403bkkd23vv9838zudbq2z5r65wjyalxqzjobz99hs3oxjs9btavyc12sbilbr9irv9nzxusqbe32lpzz1tebc794iliiyvzkorv89mlgfqrfhn52zipbcxg0lshs147h5ddrcfopzw2bxhyyxlyyybq2r2phut2e8cmn31dv9pfov2qvl97pwf8c5ji6g8f97aubaatcgo0bxag2yul1tygiz3gohex4je692peqpndrh57jjsjdfdp5nviq8jarjgr69ojovz79zv21inmiwai9ihsmjz0cek5zs8tk4s2u5gl0t2kjwnkvz48f7scj2e01qq2gu3govwt7hzk0b4u9955xhohu',
                expiredAccessToken: 7342771668,
                expiredRefreshToken: 2381568806,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'AUTHORIZATION_CODE',
                name: 'p5swiaifcsya52ahoedcfjiw9dwyocz8ramuizingi31td4spz49jp0n07g0esymbbnfp89nnh06q8fa5wbfb4w67i2qqaltyd0rggpi0l0oj0nmkuzq95d0xccb609r8f7hmgq9q5a5923edwcnzpzgjw4d4ihpncb6epd1a9q44itojx38xss54to7jgoqh7l9vhm3gebjpxfutju39po2l3hgefba5ybbcqprwo4uk1g9h1ry1yr9pwpcp3w',
                secret: 'jxod4438qik4gjg0pfkyalmfxyds5ljj4m7dq2t4is1af3f5849dm8ay0d99gzf2jjovn13d9iyeulqnrjxh2j8nry',
                authUrl: '16hcdlmgp4drus7yy50628rjhj1liqhgxhttcm7l7amd9b8wtzb3qzuhibp0dbrtml5cg4nwmjkd2i7t4icybsji40dfgkdjlzh06csjoe3tgxiebh5uux2phmumae4x6f5esqcxdpnzzc6frscxba7aqzt6xl6vqy3l245p8s45fwgwb28ktrj0xzlay37ta58cqmy30rfqe4tcvg4oxrp77yizwsc93x6e9cioa4kfiw3x8s7t7bidl9upu80sfqqj6o4lvwsi8wa5fcbtfhq2p88zw0j3h3xd12lmxetllk4lkf7tqysfvq1xxyuwwsabz46mmd1gme3qyua5i4iy961e9t6s2dbo866b9pohs5jfc1ikeeok21ppks1vuvmv7iz8njbfkii74p4b16bl8l8jqeomneb43oh35uelrya4fh7lnkj9z2s4rk0a8125uehdu662zpo1pvjijcbcovnuvet51evhiu0o8jb1gy9k9c8m9ophxrkiklyj1s9zg82yof6tgjn6jo311nl89u912prvr9lwugrr1tw74yoo3u2l6uepvhrf7ixtozhey10oui1fvzh4sv7jd7c2g7vrm3mz0s8lcat6f9n96mn0prn1kicya60dj0ejz0qxq5ubagy7eva0k2dsl8hrpp129gu6m3j18pdyswth15zy95458qq8vilxyzzafg7gs6pvvg93tes651nkjvueehaf1nbbvzyxj5tn0uldtc9vf8jrxvb4jqo7rfwzgei94os2otmcqlcbzjerikrztsuy8px2kx8qi2mpwjvpwpu3ezchsq559d2qquiknolm6wgt3keafbhzqe9sqk207xcnausya8zihk20y0kewt7zfx7ggivhzbdmqv3ekurpzpen660uvqtauujxubvsp1gqekye14vrgbrwgbqky7mnpz48q7t53l3glo2cmftq8ygm6z0ltld73ym58j6td8f2w5m5i3pasp1f43f3tkhixws9534j41kvefcm6p0edm0wsvqtxm8l259yz7bsk1whn7b14gzbvwy5lona5sbjvllj84haqnl6cbqqhdhdodpc9efc1red262u1zu7wsmdfjmjd8ocx1j0hdmdma5z24vc6thbnkhqis9vn5x1e2f96osti4v9y5o4amqmkify600fgi6s4ityvva1719d2lixcqffsltoljwffzoiwzn81sgc0jh2kidv43i4p6ru0fsu187j29twqjsh4nv3fu8gqohdckwohp6i308klm3qr1lqu24webxlobnam4m2ipkdijoybh8kfbomqxthq74tb8vbmtcsb0f5fn5wo1g9er9df7s1ohhr6px0toog15tqm7737wac5raonf7phambg289gi2kaeht5mb4diao5u4pe2t11485f3uknerfejirv3sjdw63x244s1qclw41gm1314ef2c75ibbkqcav0vk8gg6lve1bkge1ht031vckversd00lf0pyl3z9swxf74v4cae6qg4oqocimeemx3061d3fz2gotcmv8embxukziq2hcn03zxt51wjw2ubfmvzvv5tv7wjikils6okr75cdh3tuecuzra28su09upxqoiz4o0auacb325f6itif2wry5j4fey2l2nbl5g6garj1wvfz01nxs1gl7e1w54tatudxuah9q6wkx4if1s07ca8gphay5sxigqvnryyq21b1521xzyqwt6l8cqjsbqkevfa6oltphohrydsbbrgf4nwd315jk06tjgro5lbmp0thsfaj5rpzn00q89482bfomyapt4cyi7acff77caz6bceqw21eo3xs20p7ppduyis4sgmnz24bh04m88gwvqoyv4faftnuvvj7v42fc3odgh3v2jicq2vffncc0qmscdc5h5cr0ded5w9w7hcj0iag3cbd4mfvniou0nep6le7wrstkumucp7nsnvm7dpe6f884ijiz8xbbot1ebky1z32ndcr6pxgmcfwbids5zczq7wy2imvs4co',
                redirect: '1dka8hu9vttnr910ztxlsn6lwhkifi9cjh28tbxboz6bdf4w5mloaohy2fv80nnje5zn9tnuyr7nevkyolqm8wr5x7gld9u1nm67vewp8bx3tbupcyk040sw4celqdrqkbnlnoyezockmj7nqkdswxtw6rt367gnmqhbqjivp4ca3ygn274a9y72ltn4zvnvz8veaia87r3tbb5mmzxs4ox9kixlc9ggu16rg7x4q2dozpxhyb9cwx6wxhxv2edsw2lfd9aezg4b8n5jqi0e0j7vvgivyfyndkir2iy05jikxo7uoe7n1e82jrgwx7v36qvy4iedwk3oii9ixfdy3za629kh7uqu7c9lct89goi52wynwlv438qpmap4h9vfxpl7v5paml8mftk4useigeip34eedjc0vloavno1ukkeq656phtfcb5pvprpak22gx518efp2hg8ta7sg6htwfcsn681a4d1km6bkv4j5jnr05ph0ryacxuspn8zsgxbcw7mdwplovfvx30mgmatsehclplqrudkplwgfz9wbgz7uwankbe3qtkb5xol8m7js4bdaf3uxe6yj1tygevw2ixbus4wkvnmxtemftkxvy90pel9okv662wtr2m62kdykxqwiev3go8mab6qxzgix0p64l2p0p2zk2xv4lq7d2woykey480crdm6yzgts9gtrh0gxdysatxi4wvs3rnj0f1nn360d3t137atieewikfrt38rgaw636zucd25prdf2nvebyc2nesx59b8t7p8y5tvnmrbswlsjxgdznw7r2ktu7by3pwjalioniisg13330jw78n67tfsr3qp3038g7mqsuf021i5fyts93bqvp00uy32sp2ge7y9nw0dzju3l5iwtci2cdm6hwsvfh27cugdpaup1emggawh850g63pnjdlt62u03rdnwjyjotvgysgg9rk93et1abkmtxwm9w54ejdbvnbvq8xtq6dhrialjp8f2bu3ruf1u758cuvz02j5rfo2wdxh4g7sqh3ia1p014v5u5sltc8svx16wlt8i6xzftdgjwi0q34s7limks479olpt93s98aiwvzwet0swdcz13iwph0w4mk3bs1zb4kweqwubome61djvvbm6vvr9gr8xmb7usiwbsbo1n5c9vj0c7vo65sb4e8c0ok86a7dzdvvn1oxsmzcc1ijxaf1wr4htopsojf1wl4y44mzxbvwu5ozp41co66xhjcu3p3ym4uuy4mnksm3g9avyquevawf8a4uycwaxbzg1wh1nyaj3s9tncu1sdphg8znou3a8bcpflbkkl5tnrpxns2cca4uwpld0hwvibyyn2g4kv8l9uf5rrwubz7rxqiuy9rk6c2cwzlutp1tk52jvr20d86sr3cvo3bbpva07qe4ez1zvwnxio0dyb1lthmpu4ls5auhg20asze1i1kzhbptrqtrm2m59tisza1c36tacvwlp86exsp52k0omc15pmanzn2u1ecewh19br0ukvzsshkzq9oexm3rj87zmurznizm2byjwm91nffjt2i5u90lrcrb55zqbymnmeu5sysv9109ac6mvkzhh4pytu3gup1f6qwg5fqi6zqdjid9uwclqa8pii1r6271bdd98f73ujnils6i6azxus62zudg386lkovaz2jwawg8i3a2vwu9shd7rztc7vsdm833p7m9cve3elx8lzfe475eb96evycowrn3ai0vr2e2li77l4oqfm73t2hq9j3lljm1drfkm1xx4rnjk9eup91qstkwjvajc6woot9ppg1la5sxa4h4fxy3lazkm55bhzavrazxt1muzhvsc9dg9s3c008hd3cpaelj0dbc7typjz478yrvrps4qa9ya6e0v8rm0992muoeshq57l4c8of9j1skdtf2nvedzi0ivf42bgadhtevavbou6dvl5lhgkvegf1w88fmngj2qhsbr0dhg8g0o87f9qs41svts7u0s7et2w3ukmfnqu1c79q1hr26',
                expiredAccessToken: 9136658425,
                expiredRefreshToken: 1137092052,
                isActive: null,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'PASSWORD',
                name: '0665uea0vn7u9758kqjcgu8ts81sxlkoet4ngmssnsh3npu5jus5pp19fxgcmoetyqqe2q8a7ysu64cy0qonfyw8l8atuzmzlxxdprxl1a7dlf4sxwact6lgrrhltiz8m831ta1wahi702o84462l5v0cq7iu7fzkupaa8pt11leto09j7rsxqt60i7um9orjnue37jzof9vc1yot2chtgj0lkiwglfbauubw3nvnn9qme5rij3i9arl13eziw7',
                secret: 'u8w6yodr8rdfzsrfvexdpjmoakmheh6e130qq5sljy06swty9eojo1w75sg9t6p30su2jbu916w0pnjzr8pg3xqsk8',
                authUrl: 'r2izs23hph8m31c1sy2e9uj16dvuamb05sknt7m7mb48cdfse9v500jhpcp0tkuxfyqr8ftw5bb0fad8qmqv4t00khw7mk2780agfu9i5t7laq6m71ytcp0v3mfftiqehnsbidi9bpm2xc2oszb74t21yf68kdcuk9o6kjl8musbf8e1w9xw0zb6xvy9b8wp18tq7f2g4l0i5wkzhrsldj4jsw513s7olq8scd9hjkdaw1hcfb90lvwdpcwcrzpmmdh0pyebseef79g2ylkk2fnwisu2jwf5p6r9dvza3qgudkror493oygt01mcaz3ib8fxfgsc2haerj4whqveb31no4e8ki9ofbl4d2khyfdrw22nay6re9stfzi91l4hs7mdlihuvcy8gkeww6x3b079xakhicozkrie15w4catkz38xqh8aw8bxd5eaq5vc79k95euta1tniigup31x1688lq4pe39yu3a01h0luynpp5tsq2xuzi32jyhfux0jx1nik4smwnsj641yvwxn9ixq4dt0ttf3yi6dnjoisiw2ml7u4z8eb5ncayewbhaklpowgksgt24xy3e4rp361gohawllc8n5r56npe9m0x9xpoqhyqov1dd4jefw9geqfmntt1hxzudmo9031w2x33783zecbh9uhw6k7dswxi5am1mqagxtpjhz2tq7943pq198lsfn7xswaf5dkn7dp1j5ycd0bd9eviksvljo2p7zqrlekaidot74ig47a13008d3765e8ufb2i3wvsqrtbr3rcajbbntx8m2evy1jhums6ipbv3en3st9x3t8w0ta4ni4keaeh6jdhccradlnr2c75siv2909jwqye93rrh3d49co7ikmng41bveufor18iwthmfg5ukiujwop34vflqqgubtcqjlcegaojgoyfynlt74vcioq7zcmgzlwkqpxp25ale8iec37j8ry06i6kmbquabeia4v2bghkjw1vboo5nwq3tdsco04m1rofpfokvbo91bxrdvzzggwn4j1wwlxjftbzrvilwoa53w5rbfzxxubn5zozd5btt85u9yiqxjnby5vw17zsc5v0iq4hgkz2pqdufgja0c6pte6150xwsshuxldxb7983l5d6l0dea4eq4mor7ey3rcnthzjdvqnx2bktafaqc65gefz6r7oeqo1c7k0was95agb1fn3d0nzw3rb5mxoc0xaaj8eodjexfvlfnvwmycine4xgznhy9esubnu6sjog0x78xm2ystluew6p88fhpauf71z20qwurzcnnd8khwppi57plgxy0oz4i2rv3plpjybdkkz2hyhbg8jn14ozco0cuywf5a509ny1wnveprf2sfmlhf8xcf371wkw2xffp6s24s8b54hos1v05mhnwum32xg6z38tc1rvizwbsm1tijlavk7q6gsd8d00cigupdmk91o4ulf43n3zf88xhr6gyzgxusmt0xsobaarjwa3j76d1eky9c1fxn474tt2bi61ru7rbr5xim63pmcz86am7fmpib4v5zqw7rtf6ul1n5rwkcc112g8768sk2rz944rar4d7k6disa9bxry8ptelwoaejvhy7dubw3g8q06427s4jj9zmlj920o7jxyvvjf9s2mh1a1fggogtjf72upcs74c29ih122dd8x9gg6hx4jhng8pr3bxsbwdqx7f5hifuml8zqxfquue86wfqrstae5o1gt3yl0bnrjehokbv1gr6grkg5nrsx0tjtxl8ep0uyw5yn6t1bpjq5s790ho0kuxpqrqudx85zp7qhi680z5xqkyluj50n76b8kqg21lbdi6jancgocq0eixboz3lfw547r46jgjecgdwbz5jdbvaosas038tfcatj4oxm1nf5zhyeqyuvhaj7c6327hom8ztn9zyra2f7caobmu7rtwr4jvaou379xmwpfmgf3ept7gijzh29dkrjfwa6z8f8pt3jqxrx3a0ms6euidr47yp20cotsa1wqehiiunmc',
                redirect: 'szedc66hhhz3cc68b5rtj5j9f6srn77f1wnqt1em1hbb2h6foodjexly7qcjadmgap741f73vprritsqnkkxqf7hbpxey1bavg2png8zy2zj9qo0np57c8bri53if0rqhgw1o5cxrpwlgjbm9xb3dv0qdwyaa8r8b8ez7tdmp5vsl4whgb2ngxghmzke3gdkpkf3bkakthqgr9snln6phl994utvaugk27301x6t8jnqhbfls57gweo3fa4sztaine759xj1qf3vplun72l0dcw5ka5yfckfyaypjwa55ev2db8gr42a0d8mgcm0x4el3qtpj6whkg2srn3448j3q16j6iy323afb1pyxga1ajf0je242bjmc05yjh3bbk0rqsj9awmifrjbdfftswkqr40oee8g9psdoel407cndd3gpf72eylg8e8e66fgb1i2analhz0ark7h3tet7hhjv3fhlrbrgzsnqm4516fq0fkeouh5pik0aytv4ss2fnx88wk7yn9zmubf9ckip3lgjaqk1aryuoxlpvfmr614mcpf5ugubxuzq46h2exz8wr30cxhtvuh9kj9ornkyy27xh3usjva0ypriyksarpxe6l57mv8unc4fom8nln7eqw03mbbqv4ss6htdfhsrtdp543jteoi24c3087kyd6d6wt1t0gfm0vmr2at0ln6sgnbi4e496d2rwoxlyotsitglikh8s0ynizgxvo9mifgp4biopc54lp83uyc5pxfhaz32rsu7jyxi7dm3mdfhmwusm1wxmu9lu2zoyrf3nwsnij5rf7tcadyasswhf2ycyllxobegfxjntsizypnf4mvczt9ifuge85mm3mu2fyoahph0sutbqxvd2b4cb6d3qr6wqi63a3jmm7mxaf0zs9f08eydlsanisedtuxam2lodt3a4qmtn7zrlcb3ud17hmoo57uqmpgs9fva36nbj5e3sx5f5fryw30vcx64jmwt6qlkr2fpynqqgf8b71f2ivy93jpzc3y0ja7ww4jgwn2wrqf729v7rgyo7je9u6gr674vzmbs6q3zvp5rzuyhkv1gsm9rpl4x5iljxcvutzxx99zfmgo0i980wik2se4eovfwdeydua6i53zr882q2ax05ipu2gvlmb6m95gmcufii3j78oacs75z7m1o2qzcvde1bjoqzo7vsckyrwmhem27k7wdc0cdj23q4um5zkdbf8g19k0vs1ew4i08yntx1muebjqlscxh2t85zhyzbjviaouz4q9ca64xhsomsimxlwpw88da0hxj36rx8v2exfiaqb90edj3bf8ytpqtpn5t0o09ujjgu240hicolc1yx7f4up2p3uv7nx0asnuol09gzehe248q3a7837ani34wsw3z3r5nze58x6mxrni4nsrexyf1sqx0z0kx2zhhh8e4vhjqor85biwdgca6t7gcnxczod7qeizl34qshc9nsmscec7ov41gdpdcxwlokuvm4ydeegcbel7dfmpvu7r5ubi7z672d6gqzd0npko28whk8st6m7neknmo2qt9dzfiolgmp1o5yvzdtwetzam01dh3dopjzc4bc1szqolfjiibitscridknb7gbtaq1rqo5d58r6wcmigakp7xbjpjdmyj2erwyzuzsjxr6kpd13gv4r7gitxqcnin4si6wn9r8h91m40u94wq4vrn4ku96qckmcl5jdj9mfby66kjqtv85pl0rr793hwoikvtids70ctxio15xr6sweiihcst1g67s534ws6xtc35lpmftla9xpwku2dhiwhlepokbwnztuv3yzjx5pwk55y0b0vsxdjfntqm4zlck269q1ri0fiawlkzy3frn8r6q6zbq9mq95ffwru9eoo5ed4532cwzx36iu0cd47uhf7h1lgwvhhd51t4ikzskkjabxhqqgbm208hmf2lv7vfys5pvxnqydks0dfvo4dindnckgpffm9l2agh9aqk4qdjubghd4qg0eq5qe5tms6m2bguqcm',
                expiredAccessToken: 7099759036,
                expiredRefreshToken: 9057650057,
                
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'AUTHORIZATION_CODE',
                name: 'l0uctml4nxsv981mm0g7929xe8p7yxvmoutn65ox6o1fo3u2p18s46octq7mwpd0ynescstizd1f26nlbh4swm957x10iqr404gfnpnrkxwr7l7wc60xrjr3sb0izubl2vk0kdg2fs70vnqxz5t2rup7leiuswzui6e3nfy5zyo5zx44z6wk96lqe4pr42m9fnrxuip13axwq3mtkvmslac84kc9fsa8c3qzs1xvvx3bbvb23xhwzh9ka9s8jvt',
                secret: '0xpc1omrn9gp8btcplzdoj0gwh615wxqpgplpkpzc48n4ccpr8lfwj1qrya9xg1vm3iqwll6odzb9yy8bnh075dwau',
                authUrl: 'shfq0jm92uausz0hlrb7bcfmw7myt1lf0wrvyi3ii8abj3p3ysjktdxd5hzmuxmeooi12guya6a91lw1jt46ubyug8dwg0ctxxyidc8o0koxc79rab4yvsogo98oqe58d47qxn06xstjazdv6xef6ckkzqyz8ylwx7nc4r91akp42n9yo9qrq9gb3tse5g4gw3902070x3idpqha61qx8vzkqdgatnvuap0756kiu4oq3eogxd3qhgpd1hvw3xrpr67blgity7y1c6ilrtcreqbdbhimtsi5edymcnfa2ay5a832uiqjbmcgnn4e7o6v7dmj75msven0pqfcnjt1alx6mngrxk3mquk6mctzrx484o320zfewf51gz3v7o4ssqaxsbld04kwc9uc858v3hzyzjcjohr1qu856w0kiry5m5xh6exm3yakhq5oo0rbzrbz25o5pl686rpo03lkla7gfadistrrr516r1w2kvqtmear59b60udhaj64e6vu8c5frifqcs7vy1gy2hksuh8vz3neh08ekvulkqauyddv7jj9ko2sqqm0tq8f9pqjkdu5zcqrsb70qq3nwt5f4k4o6kbk6oo3riu3n45kl3kixbx7steupzpouhvt3zdipmjbr6cesgwf2x5y4j0k0c119053g3ufko97vt24ki11zt8zjxqzmp09db9d38j1ps0mwlk6aaawqd24wke0298u7ztd3oiwrnpm3m1u1ikuk3wmqzz96l89fxyqiiglbojuhkywz9csz2w8e4g0jrdyjfiq26opudkrgg7iidkabopawq1il1yp6g0dsfazyovjy4xgtc8nnh7nxjt6dhgoary7ms1bbpzl46prlxthbxe7ffoes09zorgagt2otf1o5kudzlshpdojdqnzt5ni850dw5b62fac2998ogdscudb8abo8mklxxde1z6fikz1shak8klmp1e7ych3hvb3annifij9gowqe411ehcalfmbjpyd7v7mt2jzc9wkgv85y4hrclch76thxbwugyzss4y38045u6ch6dbt8fxkkn15yhm9tbp46786lh5xla8i55izilzadmhp4lsppc5s8ygkasdxc9oycri0184x62obadbijydc60zllzondt9vi31x418d3rfzxtzomfdyld1tdrvxmusi2ag5mzapmee984s74jsd6fr0u34y8pify9v5ckjk7lm863d35leisq4v7ha93o7n0kb6l04r7uzrgxzzu00l48ph69dvv4kvrzwa1eq10fo46ps25ku285hbxxutm4q3x25y43ueqzgfx3te5ihrvqnxqol71qg2o4u1y8i0njrc7lg3affsyzaxyonoe6luqznouwpfdz5wn70bufw7c8a0y0lto1pf8c552167fu0jmh49x5lgnq2luhh8vgoxqjarqxeve2baxeud4tu8m7rxy1bd2sarvfclnyb7ok7ob621fkkuxb1mwbz6quz45ygkr0ljljkf9n2fwputjhah3cr7oquv1dnrbmhcxt8b12zeqo248rnff6v247cmfg5ws62s4zvw1i7tezl3pllnalhwhri73zfkgy2iyeznqpznyrbxcji805jit4mu08on4xr0s4b9pbc3670pxc1k5pbkui752onhq3m5kogcn9uo3irryojer7rk7xxqrnvg9ov23cgpksksimnleedqegs7o2u5im6z2t7g13h60e0akrv2ewv2wmt6aqcd9j9zcvenmr8kqdprxtilr9lvzywmq3sf98x5duwktfxo6dqyt44dhmsey6qkhe8ibceb3q3pjxw7z03w6cwpvtzoblshwt2mbtvbnc4vlosch59oaqialgs96i2kgkf76z6jz8muqb0yxyntinw2k8aoemtbu81ieg2r8segwppmcgpln9oha97jz01gnnl7w3mjoleopwal9lh3uxwwfp7a0pv2jsbvdrffd8dpnnpl8n2ygrstld0ifo4a8dc7xvim3mtsmgwpjdu33qvchgpliudo',
                redirect: '7dzt1bf39t98xaw4ap6ujsv2trtfhf0m90dxcqiiek97w9bi5r125i7vrr17qkc691f6ua5rhxp7p5sns7sehln21sizwxec3g4fop2gvcu2054kp9ty5u3ni8ve18w7v2ruyzlqh0mrte2e6lkugd37r7swn8u19k9hxqrenkb7mmv5tg0hpsxzjuhnnyt1gwe5w0c2b2edskjipwftl177cw13r26spc3boj98oy95ywcczoo0u1du5igqr0e57sgnspwghybyiniscuwsg0944noqlftbh6lvd6obs86tm0zw6h8dr46cebwvngi9k2qdcv3am5ttwmh1jbkk25sb6ms97hdp70oc5rmrd6pycfrub5omphweioadjz3t92zghpez6eero3qdcug8ek6dnn69lar2qeb86t33knuiv8jnvdx3k537e9xa9fqz522oi0o8rlr647o5yc6ut59mf9pogqu8hhd9i1b4wv3hdcponff64gqfmnhbhf72o7f7qr2pz8yp6f4l8fp1v3txvdnr8hjl593u6tmek9w6dgcr4g50x0ncpeh4dmop80hi1w46uh0dooqbvtb7627ullcqtknw20hjbvbw2p4hj2kddhr5nyucqdt31k7ijnazk2q4uebq58zpkjkfq0ve6abwcd5ionx48e4m4zlxnr61fpr383zvsiiw5lvua27vxv852pbsjmndkp6igdmyy44cms5ya6dwgqa5cs20t5ba79184h8ohk1iifph3k17v44pa4vem7ykfii8onxsp9akkxsnduxb37lutvef4srrmuegr9fiowzgkzsbd752j9295ev8krc6krg8w6ellr3v0rb3cmjay5hjr29f3rm9uhyx3bxbvbosgmkrzg76m3kbyp217fqc4pnbzy7f8mh6da4xcsty68sxwzgl5qq0kk5epqlm825w0zkiqrztq7v7sen3xttcnte6kh7b5nhm2t4b8cfvir1487ao730pkivlhbtu440xap5g6ko0p164c74y03rv2t89s2adl8quvjwji71f1l641b7oz9djvzpoc99nyugddqh150ifsd15igboo8vw9eo2tb14vk3xsdqlgt4edh6mtlz8vkbjyg5mg7xxevn1bqm27oqmxj0m3fx6nky0tarmdpnpnadjxfgdak980q7itvwjcbycrvkseq02ecemkcnlnzgqu3t6uytxc15nadgjxr1v0f0oxp9ng5xzrdztl19rasm323wzv8yfvgqrprjekjopwo3btd14suqco3k5gubfh6s8bzwauykzz3oexzz34805trnjdxg0a5gjbhg2ull5aqp2jw1k5negmk3is2p5c2agk8vtqbwqrkxuioz494xw1jkho9l7ccc90ucw3rlo5ae3utvev1knichipg09p3d06ze2gne3npgx4fhl02v04j1c4y9bl0scoujcb20oip5a60osbwg0w7813vq35cjaei7mzrrww8ls7frqok9192qghfjl3pmnbxax28dmie2npsdx12w1rnau1y6uo7kas3dtrwct4bromy3g0nzhqts01z3vsymdnvj5fvoyof1tbzmm8dq23urh7ylym1su3l258csu0z43y8t3e5vjgpxdrl8c01yc0k8terkk7wwkq21yw9t2scrk8q6qisjy3blriyxcznidsgfzr7hsfxyeplccnvzb3i1t2snzuw4pv8v5v7z9ru3dhk9l0h250c2la04ysudcdggt6s1svtaqmmdpuzm6yzsqtkdftc4qkcfxm13z8jp107tb5vjmv1nh979d2cyqrx0q9i9x91t3drsc2hyxmniwk4whzbwxbjf6ep7bwlekyjy0sdz7s2qanqn2y7ytvvn2k0ma5zzxllpgr1k1acyjkyuja1tr75pf296huq0fcaaf7tth92xwevprg7thc51esbyyebbvwe8zqo8wgdskosx0dcyxoyzwrxhlxzl7ycx6o5hcn6xtafhdaclp4zjogh2qjpn35tdzp2ufwtx6',
                expiredAccessToken: 5612982456,
                expiredRefreshToken: 1523664208,
                isActive: true,
                isMaster: null,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'AUTHORIZATION_CODE',
                name: 'yown19nj6ujl6ky1t995knym367prv3bnxiklsmbc4s0hwzgpeh3z3ea0z7bt1qmnt5wgeq1btrmppglcehg833nwfxn1oovab9imw1f1cc6l7zo4cw6qfd0t9bbqtprxt12ct9vaxtbv5vhlxv0pq25lffpa4puh02wt89o586ft70no6r74m7hvdq0w328g6h0vxrn4cem01bus4muris1b0h0re97z65ykt4p1is0w0su3jdj3v5scqq9msl',
                secret: '7kqj02r5llvtri1umhd5z0mf727e9u0fs0fj06jf73u5npul2b3vjkn9nwlfinjpk1cl7709w33gy51aetbd81jj6p',
                authUrl: '3zhpk4ct3d7spkj10v1dnd51yiddslnjigrztt507lazj0axox0qsrr6hny9hef63zsoh4ql5xw63at9ocy8yefevuvd8nct73m84oc24nxiafcc27cvkl7wde529p4fqdrv7gp4rjcll9603ijwgqfycobcwpwbvoyzqvjwv230m32sgsal2y16cuqrz5v8eshk17wcyo59y49wggu8g0jifvbld4eadsjnexd9bj3dg11ift68umsfnhm3qu3sel6ckh5jh6k0zuj5i7d6rm6zz8yx9dw9xp19p3bkurgzhm5paakjcai1guozqk3ki6sri0zu8s0zftq6hu784lqi35248ivay9x8w9ewzerduw3dx1a4x6p9lvu27gt6606fugk87zla2s6cr8djn274g0xc557g54cczdwi299ju1ldcux8h29est255sxdycr6tinj05sk924hpsf1bveqho4bvgkk7q71ptilxqfyjvdlr5fcyz65tq5ic71n66kgytprtqv9iced4i6xucrzhqwepo633mtofabqiwvhkuzdjleezhsau3pqs4m68wu56l4d0fr6ifnqxf48jx46hk53x7d878k8x8wu6cyhgh5clircj5lzno2w0iry46z6pkdtv0w89agrh1xnw5z2kxoj9i35yywkg6y39gqzlflhjdm1i6dej7mecl7ro0g6aen79u95o5x46ehu1j67oi9t3nrs53zlfyr98z4u33z44yd6ftijckbzyleuaygdgstbqtp5b4z2et2rhxsyrgs8say7vl5y7jpenfoi2p2pun339is019ymbx2r4ncag8c2k79jn6jwovstin33axq0o3t14hxe8f7gq641e73wy22afpccdtacvyy9a2hl2qh9jsazcroq6wr69gsmuiwo0j9k8mjt2y4vv75jp2v0dx7fd821ylulmbphrm3vwr71sozdy7xd7x89x8vkcjadwori2q9ytu9dby5idvf9w7cgpm30fvkzqwpwipngkikxkqda9vrq2nvj18541bde3tqdqhkjw781hyf2tlr7ilhbfove68nbmaed5anqmu0r1057dw19cltdaygr1s7ytnisliye0n6o6tuotoyj2fibf9wza3e5jgs9ntektutcw2kzy5pg7ymy3gtvjnjyij4xicww7y99n07n1a6p2dftfsgsa6w7lzrdm2fqxkog7zqm8l906qh9sxf0d9ewp01m8qubeugt03mt21vz9ce7y2jlfrg3ro79efo2sc6r7rjy3rkzbal2g8xeeg17umjemz0vx9w8009ba6t0i47y5qahx3jn3n80esbgp5pl4yg0kan9tr8a5v36how1lori5rxuvqo1mrak31pwsxx73di297gyt69pa9v2z9p6754rrwjlac8eep3b295fj3qzrvhdlgyo3x42mysrb4dd1jnc01230uf9be893wtfsvn2hrexzh8ku9c8axnkczp025art2lcav7reec3ho13e2658uwqnm60fkmsoimh58iy424hqd3qetesywfbio28vi4881wq3input5at6h6af15ajur2pcswo27xi12k2a8xmiviobg2oixe9c0k5gd42sn4otx84fbqdeu6ey13h0ekjduv7iuym55axky4hjl4axs8wocjzn5yqbogei643y4152n98ujdxv2pv3d9l6ptwww3l6rkf2jeqjjolq1tbuo55xwh88yw9c7r5x0w62t7v482gmltfqihbqo3gbi9qfgmmtzfima7bwb397gq7yi5yrgyceatnx0v6igxg90zbtehdd380hgpniexc6j8cjx8a34otsv6pg9fihbli16g1s2nwlgpgsd1mfykvinuqktybey41ey99yd05yy66tp9yq4m0dyou92jj4xszcm0y9tm4eewn8hnjcvrl1pfr94xwinypmal3sv1ol7aoi7t7l2kyhgpj79h4nztpzmdwgvv48x6zqm2oqq67k9suetqnlk3vf23zpimsfwvqv43u5b',
                redirect: '0q0e9e9ic3ky3peg32eufn5n4edbaadt89gkysi8eftnj1p4nchduwjb1aqnt6rkvinpdykw4ppjgykhm3znb4qt6u5ry31r8ibaeljfvg56231lv0simghm46p6af4h0zhjc306w57hcs95nfz351w9ugxijysg1zzymrckw4wdbt4b92edfhlhx0kaand16e2ucaha64gsqp89chmm1tronyzk0rmhbm3laf1hgnhw0g4od0g375mnux98qdnhm4d1taergst1jrwbey0q1u14dzkilqawxb4e6rfy6oqabwjgvwpeo0vrlo9kzeqw805uvcf8mqpsvct31s9qdpsbf1nkfe5afu47b5uvdaoc5xg4r7abg26mcsm9ob1b59zu90qlu3lfdutyeuofdhlzutcrldvt6wr1qmabagjfh01cgirhb6n48yk06ah4dnyffm561vi1xb8cut7xsm4aalapsthnkn8fhoxdgvkmfy30sk3q4zxgmjay7fyzka4n2bczr5735jtgh4z71vdia6dvg2ie9eb2754zwta2vebkzuz950amq9z7rtcewunmi5llcj93sk7iohjb0eer4orrgf37653inu2jwsbojmqr0sr2npsis3w8nq24cj474yg3l80w3ylvlzapr1h4dmi393r6iyu7t7x90mn8bhb6532beeg5cw3n8dgsmhit3oomks7w3uegbgt6vrnjy09clqezjq5zqks42hzsc6vil2r2gr3smvysjko6j5d9948hh6bup984rscser59sa4trpab28bfje2dgqsciz4t3116nr55jgd62t6xf5kcc8ywsgkhlkyhwutnn2c6370wvdff4qpqe4uwoi45heu0m9fqtiyldwhypniqq8l4rlm9e7298z96e77ej3x9gyo5d3vrv9458z1knnl0koxob269nsn7bicuinx1j9k8cexjq4fj6gyai1rcjvvtpwhm6gcno0mhc7r8w4fguldxa198jvzjf9n8hkcd53dhdnztytcn63jqce8v2j75of9kpj4sya262vihwx6pqyn2cgk9zy6s4wijik2c9plljds0uhwyz79funqn89s0jgd3f1lazzz6ysroi3rk7nlvupqc3i01me8mcasi0whfyaxpfwi1foi4z351nggk9n9vxsxfqvsfxq6vg6a4tvs7hx15mxfowwua821bie8n55qhw9ywyzw2xnmafbbeksyxzhh58hp1q7dm299d5ut65mtk92fm96zh2xpbl6muojfzev02le5fudj8v738jfupvanb0m7salbhh9keylde8xnuxef4hkc9oa28m0fdb39nazcte61mwfd3gj4vmeald2182erfgdf2y8ttmhxt3hvdjj2twxt1xfth1c3zx5wn8uxj352w0gd0l36jy273s6uz3mt5hlok14yaugvna57y33ndb9rd9utf2yxc5uazoywtfj5oue99g9yq5zwz8qselm4qob0bm5ki40uxrs7qksoucfm5hex9e4yfnelefykdnu9c67dmglp0kn0vyo0kbk2u58geeg5p8yh1ny5f7kgybo84erhlyduo1hvt5z742wwyem7flue9uppbuw0aozlrt03iubyr433n17ubjw2gzb7q9mauiptxilzvv9m6i06to50zwu036frhdjs2c0tk2xleybkxlxef1nbs8ioza1mxop5w1f320tyvnj89g8646137mcodxw3c8t0ltas1e3ntz97lel6t057l6dkhtjg48ns83qvlrhj7o64z0v5o0zusqzgmsd0rabtacp5jk7fvmyld5ejvbwv9hwx2ytaseon9fuho0sm5q0i84xjxo9a1iagwul1y4jfl0ej59bf0z1i848gadhl7o91fqw5t1mmvklcwvjrta0r57o6hjk3bsr0u1akewlx5wbsdykzkbmydpsbuybp8gazlp2kxp1lbwfmb8nsvbcms5m5xepz4lodai756ypczfwhzfcyob21d4cr27rrvoulesaqp4y3k',
                expiredAccessToken: 5324814144,
                expiredRefreshToken: 6099713917,
                isActive: false,
                
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '84xq98u0klqt4iktopo32mlepmc7kf6k8g1sb',
                grantType: 'AUTHORIZATION_CODE',
                name: 'tquc68i0uqaouarvrf342rsqj17y1j9a6z3gx0inimom209rlz4yalg1w0zt2ypyjhzj1ctlndju7xncbwnup94kqkt6yq5ocn6liheieldfiycg6a61jjnh8vflugjef67easdez4ej4pdffc02ag8zmfw0hfbhcum0zpwtabvb491i3sluxba70br66728z1ts1qmnq1qj2vn815jwgl1uxrsxl4acugwq1jb44wtp84osru2axw16ks4hu7o',
                secret: 'zyrza4e2l1hdjw2gv8syy1wi20us32j7d3un7qwkywus1zmjnwz0hi6fl1ti2rm0p9ljzky29kj2emt34xbkbuj19y',
                authUrl: '48mcb1ojj33oskux95nkx2oz01otvprhl3dgybt2wy9al2jj0xgofn10cno4o87jt6x2f6nic40iisepdyh9yykqugeogg8f12ldq0a7k16lv2obprbz03zm9prq2vdlh8hgg546b5je9v0dfq9fujmprup5cozhoxnrowkut8vqwjslns3yesiutpl2u27wmhz76ldedasw8ud3m2mbrl94b1v8istgp717j9hsuradznesrkerqsd8qlt81gwcqccqf9pafdufjc4s8oum38ivf2i098flxau2153q4pmsy8v3wxc6rj99zbapzpin8pehxedtg1mpii74ok9uqlytn6mxdglmj0v5n839eh42cyijkr8x63hoh1qw33ogck4vps3pvzi87vqrvumxzntr9zp41ypem5otwq7yyqdvhjzvbzc4gtzxsm0k75gowfqs0wmp8xuul996agv8wjm8nmowx6qyxz3fvku5c7ijriebvlr0g63quk6zw6p9jgm3gu4x5h3llle1ot6fwn3kb9cfjgjbfdxxxtf11bjaz5bd7htsci59ikvokje8c5vnis46hfwvn9bnsju4kbj64m0ph4e3pmoeo4vn6ere56ju4o4ept8c9bt7pxcwyvbhk7o1xcoqr9xos62d6tbpgeucb7revym7hj1l9hx9gqol3na1yhn1cvm85jxemvkjwngu6ixnlolh4pj37l84z7docnuw816cmcr5j3op11ypajv6qwor6jcf5j7nqoz2y7s7naszwvl03cjuejhk7afekaet6j2wnkp592rtb5t265j0rtczlq6muttyloztifjnkn9xaq7266qq1wa4uosersd6vcnczuzqf5brn3qjs31bi0gkdk9sydstky9z8de0ru62gbor0ti0tupz52btfv12oacqoevi2ldarv81vm3uboyc880n59jx412i0d517ujkxc2xd411cstmqiiwfrmj5aq31yf8osxhvxa4w6z9mwse0zv7nrjmmd45gtospd2pmmj5eyc35odhm7v2gz8fvjafrkf5rsmtdnutaul825sdh22d26xzo9l9z4a8tq4tud1f9r1j0vosrbh6qns9667cllul5jkrbcmkj31pu9v1p6josuzaq3xhojfzom17ium9w8cxlj7uzrxnov28lcugjyy4f05oy3d9fk8i3jw88ojcogutob2p26j3lj754hkcs5v5o1hu24mw55c0gnyyw35er5sd9d0vsq5qhwtmg466kj7kmhg0kj595vmgx2fdq8begapxdov2rvj37erorzyor58k2zbkli4f0hn3hawpauvcybcqvh3bjnskb0y9a6zwophh27lcx00efct2xmwkzfbre2wxm5bo47kjpywb3ksj8ug7l63lbl7k1iyks6xc4dvklwd40kwgiwtuusyk497yy4zgsrk63sc1t414xrnh69xqpd3ujirshhs2g53rhysug58t0q0w3xck73aq805t89fxjptn36ywg3qacp93fx3456uf3jsdlcy18agislxcjw0ki00djvi2btb4qdoqe9lin8l7zursraw15pw1znzkilp1c6jvab916fmd7s2ga7wzfwndqh1yg9l0gmh9qsturrbjw9aftsxaxkkcv2kgvlryrwebujill6v13i07ppms55ldwbb5jf8rakxk7k0865bpnosfk2929cig3yo19soe4atu7datakbjh0fm0dxfkggvxgrdl9j7i1e8evuftcpfrfzshqc8rq1xxno3tnso0xumjsgfehdtp691ka20r2r553wdh676s0z0ttzylnh1rq0hvatxw93jorlzw9wgneec61kpyqlqp7rkmbbwqb0ypaxwvfb5ykunarzkfhfkayhfxp6itfg0u024jl3x9ozspksc3an8v5r9n9bi1iwcr5agx17ucf9luwbo1wa850qfsypy7nruksurshxiuhyp7l3meplfdxe504nze69kkggobf6epxdpv0bwa7objk8r7rpy3d96',
                redirect: 'gt0zvhplj17xj7zn3a9oy3d3f8d6rm4m6jamg4ph3ajrfvwzreoo5jv2c8b2ohzf21019v2es2g875ah7j0ga4z0nnxdyld9u4evmv884dsfeqmcp4u0do3dha38d2x3qfmb92kecumtv5aqhtq78hoatid92jlqu4b8263m4b17j5riyc23rb9slqm5yi2crqi21u8adv460jkio8q6b8mzhf5ynig83xa5whi1avbufwkl5hd8vm7k1e9r340krbvo697ugjrcy5tkwzny40968ip1bosmzlwkjb6c4tc0d4q6agj81gkzzm74xwtgnz1yx5rxarngrh1a4j6f5tsuj5aopldhb5rmclrr9moz2hmkpu8btt9m504wax10n9saw5w8r6z7mgkl172z6n7v2ltvgktn9xfzrvxxzoahunuugqxc1j93t7xpympnls4jps5595g67ypbpfc50ouoktvdn58i2ygm3k67mq83y67l2jamh25qwvahivxylcd3wylgrzfdnso4mlr2vl7zihaghnof1wap0wubaz2cd51b2446lyvzarx9vpwo2hums0gyhwonvafcc5lqd7chg4zo8kteszo308bgj4kwh6mwcz6jjaaghhvpyafnmxbcte3awml8ld8rox7mz3i94xih0gt3vcyvy81sl2l6azfa058ocj76v5udse1o203wi8c1o2lv3malz78vnk3k3tdp4vdxstm0vgfc56ztr615jl7peh6zyv4eh6qxzue55wegbx5cq4bvc5kvwwmy4inbgrs13xgrvwhrgxhg5wwf60u3pacdso5x55beeelawkawms9mfkszpu51z2n2cs6wfzrkovxbnbuur8jkvzj1sqow5y2c5nmxm6ynpcz03hahuu807smdt3e2ocd7zdg40vhh2xzgmnqm75a5djef1orva5hqsrmzkb0dr1vk5ydlhrqeiobtex6ca7b1kv6bcrd85pnx9lyyxbmn4fhqxrryp5hyrbetmwv89g2oy37f18o4zc8czbjio6m7i0agzz1kxfkoyloww620o1ieidmlhrm11eglr4tvjhxpd0ow8852gbnshc9tyfyux2us1xjx57fc9eenugnlvqksoambxoqimu4y98jsblkrxd4vn5dyxyqlcjdmd8ku28btdtqenrxtjcfeo1fy9zv7jflil75nttmykoog9plmprwkmo59vslynyji9cfkl4ey98k52e7vmy8g8tu0ppjvzcw3ozsaphl4iwq5i6dnf65a4keawctqm194zfqau7eafhw26l6lvz229h9adiosd67mk0zno5f8g6t9hdiqb36wp6gl07y46cnpu988bl23gz1d0bnlhcd9p3exdfzwz27uzw48jn5aiw1auuoytvfgp57yd2c0ayfenl8tjhk283en2o1qvll6y4pynavex13032xkfhjkky04ow0eaqgo3eznpnlyle7yxnj8at3k7rjst8qwq07fkdiif4rib4x99f5kwlka6zkmpo2792oghzvdn1kjn1wpvdfauqwqtevq5ar3kar3t3juepkyr0jhv5h287df2uqaxqmufq2npnm3gks8rpton22e63kwre8aagtoxh7t8ac2bopidaj84pwoc76oc8pweez843pv1pnetq0ordc6v1dd9uaxmv04ydkwm7v40fmbhqmj5lowhbblookgaguws4t1p4qhv71bwdwtepdp1nplw4ut13slg96n2bvvh3u9muu1lejaa0gg39h9x9njknn49z8rp3aglwa7g68vksoz4bbbfktkkbd4kxck2hm2nh0e64rdp0gcw2mi8jxjnjyossuogsi7j2krr22wmee0obn9yvhglyy1xuht3zzq1n9zkst9xz4fz8k89wdcvuwftwmm4yavmtycft3pr17qt97l6cjodg8hdg958o203fi4xqv7cazrfhb3vpf2oqzxxc3qtjqzlxzk37cwmbpx08jukp3w7587gz25tpj9y7ermj1l41l5o63cdaj9',
                expiredAccessToken: 2220440605,
                expiredRefreshToken: 7829240862,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'AUTHORIZATION_CODE',
                name: 'ygiy52w3ati9duydf7g0q7onno88r870i50i15xy3ytpee4v3efju2wz2e1ypos94j36grzhih1hieisoyvdjmtqaz6w3gocjw42z3q75h4rokuib2rgll5c4zrhv6x5d0n8phswrqw5eiup7p9s4ugco5bvi509yyz5xknsyjefw17vxabgnxdito3swekw6zed7r329lw9t76o5g83hhsv003149jml4ycp5odi8h1d40a1236x74ugat7zmaa',
                secret: 'uglgn36tsybvmfpnxfasi2qta919gsujqethrn151u4vp6zyw1xgf2pc5t90qloggeo1lcakh74z4rdw1s1bkkb9u2',
                authUrl: 'a10gete094g9a9hee8vv0okjqsuca7lolwhbkmxez9h8vmsg6ajwbjnkylzx3oenpuc2nmbdtsbkmoy0vqq4nea85mmlie34fnb5icfeza1lcycj52v12r4mnb1yfrl7l393064cz5whu3ulrp7kf7kpnns63yem5e3m9xm5adovzj0wjb5gt1mvg9sohies5armj1jofb2xrmq2s1jvcdnuyonxpit7bdar9tsz7hmqpj5yf848rpkpoavizyzxkiauvi8w9kid2k3opb7djiyfn5ggxaf3htdgji3npksk8ka8e31excskxjb7in44o7nzajeq36ofzq0694s380re4gza8axt1o07903e109kodmjzgyzkzr2xglzdna3f2hnrlbqvs1wqjnfihhuiugs1xvcoiywbh254og9zgfwbuqnxbz5zp0m0qlew5tx154wfamewanu0ng7wo1qf4fs6gfj772g7qk3t2dd01gd34r9t8q5op9kkujav5hkzbrb1rglxlcmnrfwmfk5g2x66fv6xaspvn13dqki7chim4mph7c815dcw2n148nhitufezbj58mh1epwdf4p0hnjj720r2y7cu36iw7i5s1ybvn9rdlvnyp6cnsmj67ida0o0kihq2rddlkt0hpk5hmdw1dpiibiefk10hzrr7cl2fqknl10hah78993oo9h4xx43lrfgwycp8b6zrw89q6zu4wl09682f8ql9dd15h2uc5h9gu253cnkstwbncdh23u8556sm2redkq3kvoe17ywyt9f77y800ad5tsfx0oejl662b6iefhw2slrvw6n28k45uf2t00hw4jwldjpq4yhsng2q72292qq1kpeehjay53tvkbpw8jygsqr2h215yz0slg3o4ilpjciftffuyzricv8won7qs07d9lkx1xx7lkefkdbdlulyo3areuyi308zsv5qmdqpd0bkaldidii85knp55ru450ausb311r60ic9zppnbqcfjrgxjkxvpu8anox2mo8h2upbbe2rahqzpulh1nkxcn2qviiau25htbt08shfq3wr9p0k41bp8vyzcbpdy7qhymen6jjhkuejvf1f02rsjo2uufxz37yif10jre0lygq3pvnn49wda3my2rw25qlt176pnfwam5qi0f4vj39mqkk1h3cok19s1zvg01e16ngz7gcs7odblayanrttc3346vxuix2iuyjtahzhhd29wxg4b8r4gnzmgk07t26z0c1rsfdbt1fa5iv72h2c801wbng3qvyqrugjd6a7zypbiodv1oqp2cnuer9ncuf7svikiwajimdec0n5e0ck6lswgklb5wn5wndy4ri985jsn6nvy0tlm17ak59l2s70y3g2w01nh3celtmnplpkzu6g6s5iegshu1dx59n09o6fiyd14cw5oqftzhhgli0imp3x6frjyg6o5s7ymw9ne7wdyc9lhjsfes3uwj9o80x2sxdhcps1h8qkdblw7gglw75jpirus27eyxy1zs848bixf6fx3169r4qw9u09crxr4zy4foii40swfp4tujzhxp9dzrxdf6xr966xfjooh8ahsjs2ph6dfrg7cuf3yle91b7hpiqqoz2x4zdvhwgc5bzcrafq82i620jggvwmfsq808wuppckhlwx1r4ud7zp6uhhjyn8o7e2vblvndx9sxz0mbgqnkdjpkknqrpvbhuzr1dyby5zn2e4tlmn7vfivwvqw1oap4f610ds07asz3j0dfgy7kmc41fvwf8t9zbb55xmmr3ondyk4delevk1zz9m0rv2tekalx1z3hs6o4ioezsrkdimi0ja2cw86texfof4iz7eh1a4raqmfnhgs30rcrskpgdespc29pvgisgk1qsj0iup5xcfe5cyvedgw5ukzn4qypteu606vkn6jjmmoh01a0935hxpgzatl45zyql012q8lvqt05vmnenfuth23tk6uph47wuv47sijrabz61og1zxt3e8o0fe5dm85zevmg',
                redirect: 'qulet7jeqzu3f3ggunpuqwwdw8s9nnyueuov8wah54qjq84wa9lcektqmkyhauu9g745d4k3kzj6xssjp8vzwol4b3euz9tj682492ybqg90phfccdh6lvlmmn4genq6bfb0z813y3hksd01s53w00tc8rlcsky00wyzz3ngn5za1z5o0jh19ru8z3oy4hy3hh7gnxcloa3ied9fem9kldzevsjvq9mu4kvrbgwnuoxaphpnvauu8qklb8y7qzys9kdwhh4vs6uzkgflp5p38nf963b02abf8jgkf8rsn4z5rm97fzhxrnus38wdeusn6oftt1g9f5psgjtlkmmive51ktaadi1ftgo7euw3737077x78tlp08c6i6fxgq945n1ejyn8wjemthqxnqph9wsmkcvzsbpuuuwu4n7f26adtsbnpisvanhyfw5cg2v8i2zi48ltljqgf1obpu1f7rsdf92t7zjp342oyhiyhuv0r7gkzyg8lqo0z8ili4fu0evbmwsy8ax5nc10yh1rrvn50me1wv74h8dmpm1wqstgr5rqswec58ocrbkvkzevx399z0ri22jjs5yp5qdqpw7cqd1a32fk6wtljlqps7731mmms2jdlluyf02fhisa0smtmxit8hi49qp0m9pio5wkugeedley4ryproz6ewns4oqfr16kmomejdh86zmntzfzv7jhyozgmbmyus5sc486gfoe4b9o5aor7kt4b6epopkw6nsvhbbzgtuqlw5axsqu93097eae81ju1c7p1ntojjazqa5ian8dqsdr3guwa0chx3fdshk9f8thpwm0ciwzb46anp1k1ouyawc0oio8caz22c6muvh777a1rpfumzrw2f4ovitve0tolo9jqwyp4t3xy5wx0chgio3neoeitsctzueycvcpw2ang244ikd9dsa1x8vi283vp4bden1rimb1hrwq22gq7by4odnq4lq040p0k5be79i2gsw4mct5jc76fveymi8kkfkkqknw7bf545sgk5s3q48q54xd26rrvvdrglfkng26q3t6v2jsrqav2txouxr6ge20b3cjwsu897g6acl5wljpqq6hiyaow9cngowsn5oi06mp9wo2b7eiiy59e492w64vzc5ic693dw7bsomt867l96d271i8g5e5ruk0qxrluz0cda7vph5pkslt84m908ktnavnxgatqpy46gkulkqzrl7b00yri2rh0y2kz32tmv1pwfge3q5uaug43ntpzt84uq335btjy6zbk19aoorrt8a2hmovzlf0wu5dp4xa7rvr36izs580x5dh90u2lmcthit6akxqtw3czaehrhxvwlqbbscbcepxjuusi4ohdan7bu6iwlddejshp8jn7rx2zsuvyu9v3hqiklp0mughef2hqnyft4xak5xrirjry15tgeitjrh20a3vg24lffb31xn4wya0nxdhlpli13dx310slfwko0654obt7uujbs2v7na009vmt949la4fqmi2rf9o1ntvhqh2bd5zmdu39a0g8hvhl7r9hvr4hjv8kv3r5cz708ditu1bbttukqf03061fafkey41j1bie4rw73insxpcor1mburgvtwhd2t1dilo17vct41x5ry6mko3lq3841wpg61jahpk0yvcz7xys557yvw5zj8l33aa9gik3ccjzm9n7ze67xe0g6tr97sc7y97dacim98jeoc8nujt79puok71n7yzzphslwgjvlh1s0iyfd98iuye5dzvs8b0y2f3ds27zvfim81impqo94oi0b1aqln226yiqiee6le0z289spgosuqhifdywgkncakar1l426v8eazkiqqc3homfruo49pmkcvdiably2idfxxc4wa53albve8u7h6hwcltz5xny9xrx7f8vy6hw3uajj5eztnuzsb2fqj5gi1wornt3sxit5wiap0lhwcny22feddlp1ahatdtm28qfuwzpsttjsfvc90627b1gfqcxxknvmv2tdb8t0qe',
                expiredAccessToken: 6061483225,
                expiredRefreshToken: 6434240972,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'AUTHORIZATION_CODE',
                name: '7mksl2qtjpk5mb3igo4zmwuzwch6fx704gz4i8y6wqros5ihiwhewjz0abx6cj336eya2vgfhme4yc07z3ex2knmn7z0id6o7c8ej4i5abj2f7l9863gyvt81adom5iznp7v92jqeucj3fcj0x5llkbtjnujul7t9k0rzhed623sg497rg524csoc551dpondbvest9823am0isb1fl02ay8ixb47ncvwp2ts5irnl33wd63qag03w1fsj29ori',
                secret: 'nlel2p4hlm8sspae4ndp5uvjbeyvyskodh88zjyh1r7f43kcse0gt7v5op4hwfuccst36cmxdcao0bo8zgc2n7kvds7',
                authUrl: 'jghulks4ac1pm4fxlovdenzokrz7k89rgnyk43jelph5jc507sqk4ypozcc14zc3hrcpyt0l5oxrtnok9gtf2sguiju8exs8bqjyqa1022td4plwboh4lweptfa0wrerfb5k8p2kv604j705z8zy8nm437an8rcxpe570cm2ksqijjj663ltccmkkcvb2jen8v0n4gwl1g5t484s9w8b1ku3rl2gswvnf42leef0w5s74eqhwlkh8bxtz5iq33reje1b5bof4e9lyaoed0wvxnhr7wwq0rn2ma1cvi4lhui4cnocpfeofwkrjda5irk15oytbsiu2ewd2ux24lenkj2uj6xcnwbfv5x4us64t9e19nx1nilg8cs8ps564em5p1xg3gmsrpp71tfkmuur79rhs13ic473lmgurh4wznh6n3or0wvq955zndv2pv0qymncireh3y1hf1oel0rqbe9k9y2d3yevjovayyshnyd2jqo4trw2v1mjxfpp47bqwryca8crs8zrpu04o39m0583th4u6oe7viy87trso3whjw41j4fquao1rx0r9hzcuumraw4gnbgv5btaiu5h3g28zc8aydt58m5xvd2328hnhw7xw8d2cri0jujioduf204fkw519ufpt7hqqadeqjn7or5m1ht1kd1f63bboyg74ka2a5z0i5aimsu78hltoadmuge6gglbfkbsk800vqf32knhen7u2fkx93zvpy17w4f6p3rnabl66vkckwj64lv2u57brssles5mwjfszdcrpuel1bt9jr6gxhb2c9d1wlqkkzwl17uv1i5smezo9ulvcblprsdbrpq9ugwi2cg4lh051nh7ua4tetumowducj1cv1mn9z94grj6kbdk625cru9hvu1gn0mxbnx9647h14y7hget33py0chwuvovtkksuoogeqg3n1arih6v03asbyy1om7e6os4lx85fc868t5axu1aexzo9t2o6q7jpqsqp6iaqrhmunllnpe0j54kjxgfg0mjjsjop7c5xc2cs4hyuj5gmh32c7tv4fmv8ovyhp1pja5ighyjb4nx4p4id6mzx4jjmz040br28oewe1iw01tyrvcdu4b4pchbpu6in2f7532kxclzd8tfqlzxfwnpdvupl216723yzfnou25bc7lqfthkil1y4ywk85l6rgsxcmxzcsenplip7wpay0mo4syzisfddogqhqldambef82w246hm8i9cr8t8jj7l463fx8n437pwj34hljgacdjz8jrwx5wigw65mmrkbjwio600jgrzol20pi4tgd39ka4fv95c3lcga6gvkwiluh567wkrxlic0xijudjeyhoaptkhhyyf4z6zweygiscxnh3ug75wz2zc634s6xuj1g6kzxooeytf6v8k967sd2xqsbdcbjhmswtvrwtwf69u3kf3l5z6hcwc94zce926oawa68dl6ogiv5qgi4hov8q7h6is31y8ogb4neb80h6d1q2e1ehm057ez89movypnisxq99g0xgn042ontfrwdst8kaivi4wx03aa03tjsobha3jiwvtrshxfxyzw5jzuh91l2378xocxkv8wu8fh2cud8n4qi4rx0dfw7m4xyd0excgm56yxkj42gcxbnu11uefw2qgvre4bl2vt637ki7s68oh93plgvb8ozd76hbo37tvi3zegl34lufnayjx73i5m0lhmmbnjncq0gwletivwdtyrhq0pxavzs244nbpqxrqeacek7yv6bxy5tnjm7urcw4bhnnvbivcnv7dzlvktbnzvjjxvcuagy59gwuqwtmwn1o6el64gel5buh3orp19j0315mew4edzv76761bilp6s0u1sedkaqnrpg2tul0164669m8iit39jhsxqqvgkt80tnym7sbp4p7crkbzhj5bjvqvusw7gusnz2qmeff0ya63my3i6t3jc8axjcbv6npx552rdbrjelyakdt3bfy67efuyl3ecu8plu9ncmbahlj80esiuwv',
                redirect: 'abdruj6s8g1ma14s870ngxcdkieingtqojuimr4xtslyldqh57m28obetcl7xu6a788runoly9cc70plpcd6jjnftm03jn8em1kuzjjdm976gyhvv2zcvbkve2i9jjkj71z8jvr9ni88gnhuu3n865awuyo8ocxyek7f51avuasq2wksl9ibi6r4dzast4izu099sgpxzq20vcnsk00s8qykzohdl0k1uwi6v6pvyu3wt2qbrb4c6yjfkx5e796d128orptyq8kzfgscuffpa8rfmyyb51lr90pnoykz7ys80yk03jfrva41a7ny0afk928ror9rwl2e59fu63c1rdmoiltme46njppkh1gt2s9kfk8pa78vda465gsqzsb6lojui3emzngabn24nwu7k3c5m8wf4uxsblzupqabm7om56jwppucc43ftgopur2c7saszuve5h923xts6t41o1nk35i8cw7i8r53g0ya4tmajmjxck6q0lbxgcejcv9w8pwzuo6uqud7x1jlsg428263k34i3nuuvrdscjnhbts2854x61ih53u405nqeoeicyi5lhdwkv45y1xfclpq8kodxbc45pvu1qk9mb5qe7y40g8cdy9iwzt59hshko5wy145crs0nxfyw787kuamtojkkb8pkr32x57ld2ykhxeufdr6nypnww9k4r2iajnopwj4wsifysf2y60sviooipyx8aarm8awxyfvc2fxmi8evd01ww8p53soei7uknlkflllyerorf0jbywsgwfyiir0lge5zeg6xx28epg80kxo41w9kzxf89ptirr5mp86xdj75ir7ls52d5xvjcls4oxqkzsw6cz6z9kh8r3jtnjtuwvnh42w8glrnub0e8mmq2dfu2tqh49zc0gv05jffaf2t3yjj6w3lgzv969zf5g5x87vxiwzhqu4hbcuetbt5tyt3p8rer3m373g5wzlnaekrp08ul7yyn7jvax6uf6r5ywtqz2r8pkuhqurauzappdu0kj81m9iqxnlkrq5t148l5pnrtl1t9q7syfdjfad4twv7bg48pl0tsjl440nqdz18mi8glri7otzw3hk7nxtni2vo19cgfliriuguchcfc204a96pmdzs8mwvfmf3bec15h0kza2etz43brg79a018iq7b5udx6navzf650ow9d49kqpkyfw0vihr9oruea8aukolrk515ch5lppjpb8so16uvp98kvurbw83ahbim8cifi44z1cq4mnsfduf99pm0ueoeuh8y4vunijk7hrkzjh8u2hqx4y3gcqv4dhiaze4i9mm9v6alsmlehd2pi4f5ncjmktlqqb0b8idr5ozpam0src0ih4vxpds31xz6cvjqs9nai5zlpbp755vxrp31jqo104kxr5csfxtrgts6l8zbeq5z79p4phzyijvul52qwizrwkt9w8nbhhci7dkus1dk3zfzp6qn397tif89x2w9ykzfd47qu3r5u64ahif6gkzrvjp7tbhkt73ghjq6iyed8kj4c2ocnnmi2k79rkd667jlct85ov1zyf6aosv2i3d12wxt9ujnyq4438ymhkd0mgb3hhgpdmyjjqa665j4u9s1wzjdhxc0qb33yhxp5flhy1fv6klgfo41nmhduz3z1m87xudm444qkji9maarrx7gmmotyp3ijrziz4bhbo0wdinbtpzlyepa1zbsysg6e4a7xk3nmw4wusgbt4x1uckfqk5pecb4x39xjspp9i7dnmrh8aja9yf2ztq4wla0iajd1kzy3jo1i63wa4mwpf0vmqxr40urqclp9g5oy90e9dr5oltlejbeullgwys3k7axy3tfoowr5o998v2mbcmxf86n7sojoj2xn9h2iq3uhofbylepqtp01qkvanrjq8pkhx1gnunfzgk9sf65l1qwvg03pusdr3c0yn9kk6i4akpt0h3cz0wtconby2q95shzkj7lr8tqds1jflnkprbft9y8vk4mwejl7hwbrpo0qrxvvifug6',
                expiredAccessToken: 2010956669,
                expiredRefreshToken: 3656863688,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret is too large, has a maximum length of 90');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientAuthUrl is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'PASSWORD',
                name: '768xki16xx5egab3v47ok76tr4fl202bltoefqrd7bgq3cw59so590nlk7gyssqs8dbuiq7g4ms8roqpc650xdccyakwnc2parn7z8wrun2m58pbpx81samvzjqzw8uw1qytdvri7sudta51otfvu7gahaekivkhbdzkux9cy69xtnikphsf9gtvim927j51pdie058xytt5r6ss1sl4qev1hbwo3o95hyke1ddfvyiq1ux46ko580xso122jhq',
                secret: 'mu6ux6qhr40oq4ve9nqj830v52jzlkme7yfg66356mw9zmujdj1yyneab4444zxqjb1pz2evgcatun5qes1mioq79f',
                authUrl: 'nfcaqx6qddwrca16yw1ozkv1dxny4035xm0mju0bpw8snmj0a86e81536rf9ww5aj23ok5yv4filjqvk2vp5uiqjofoi9pp74rds2o8p2wpo1zq22ahrup2h5znk9xi1l72dyxlhnwkgisv58td20nu1rovpaqivc72qsbv0dwvf75ih7stg0sx4pia6wvl6ov41j3jq48cvw1ds8ds0pr1ykrx1sua86ji0sxdlq6opkwoaxu6g627brgdsarplmu99urtwtwj5jyfc75rgygxhfjq0emczlq4xy6dbfoaxh1nwa9r2vx43qtuuff6dokga4oezx0tleuofigv9y1okqnd6vevelirw6lc2lr1wpkg8qdsv86qbvap1882nv9qo58wh0nf4ktqxklmkdow347wrgtvve3crmid4smte35ct2sdqqdb4qocxmttxx463o144rfkw05d78ksxn9eyynlsrfxjh63ax8tx6e5yl8hkzv8nlzz84jymi112p4xv94airgjco43tjmy3xyd4t4m1if86tecyoner6pcl9ldkq3g52zdm162d4euhz1aqxykicsqh03yh4wjh17b2ig7uuo645q41hb4gggjp5svj00o66dkvpwd459cbjfksytrv949el4qjxdk1tdx5mj29dkw9v5qm4e3x4xo7mdor51tpl06eu1ghwmut4ug5gdnbcegb8w5120mk3ix1c69ohjm3ek3gdwsaduy5o83i0r17qo5hqkn1hvlfltt50attwx3l2yqqaox2mkx32jid95spzmwc7gb1297041za9f0933vhnkbjdk6n2bqn3n1om8qb7rxz6o28cm30dkvfi31iqhpg3qgv3bgxzad2jte8fcfo4bfs39hmvkiywjk1dscqgotxw78ljrd0eow7stwycsk2ksmk2jcdmitntap14gzl8cdc8jn21yrau0yf62t63j3e8d19td1si44v26ipweaj0kgtegvznf1pirwy3wabcxy7e7d8af3hh0wiugl8k8fytzscwrjvnxbzq9yna0lump22t02un51h7c8rjhe5eedg8oqerzq7wv1o4q4pjw00huwm4plf0y3bgvbggygme6f06pzuwnkjx5kga20dydfdp1d9hfg3dp7n6i9hs24xujv32efj1adgznbyrdsuu7xt8d5kxdet12tb0lwl0m9iep6q5r1d1ryg70hbuistu5ox6nwdv548bg39wszulvss97qk6fbwaux04nqt8wb2tj32jh0ejqz6ev8x7zihu86ebbga183sp1rsp9vmvegjqw383752n2kledlybjxtue7745emsag5e2fsjfa3adugegm58kcim7pb1cn5zruxecpcy2fc4lqol47mmz4kem6n9tp0jkz8m8otragsoo1beywnvuawt1vyhx7bcfy881yd3tsiw2k04948z1aa89m0wuxz9q17wl8hfb1ekpu8dfxbclcia6pikrwuxrrobia836e0oek76yax5id3mkyajao5hal2s7g76swp2vs355ylc8upw1t7jnzx43xr1ck1n29pr1ywagjxzl41o0pmm74rgscscjyll43dmler9lu039kwxzduhh90zb6gw0449ggyq74uqiv21s6o6rq5bsx1r4tf9vmi8p6b0jj6p21wo2ou9ipmgks7u1lj71ev2pt2joajzvzga1ppatrmgnzes4fkvpfqbqrx0kg3w6vo033ghxt8neuapu8xnmfco7lic15ln4n806w7phx40nj08r0fytp43zl6qhzgumi04e8vd1p4xd7ibsvxanh1xz6k80zn5e9ise04ytyzfberwj0mojdp0hyi83e7nv8kplwyq1ix4ucjivou669sq76vtlwp1zea4e2xiojdcnt3p8njep6tjxfgbxp44n26j32nwuomagpbqnr1u36ad8x6ohf50wjz7n8phxxkvjkv7fk49y5wwcbltmspq1n4sz0xvapemk7vu1yxh3tldx2gnpw4lve74kddvjwez',
                redirect: 'tv7qydx7eozwiud8vtfo3akd1vg2yxft4iye4wwi2blm2tcyd83kjkcpd053winoc3cnx2a7k7ljvem91br90auj1wdgwsb88gac0h978aierb7qt0qk154pophlldpq50xz7hkphy5tg9k68865pui19ieysj9rjshk9icpem5gwyohse8da8cy41fb8y9bxx1kq4mn5ljo3hla0rwk1ij7l0jc70z3de27yxk2x821szwhx37x0nzycop9flwimjwppohss1hnwfmosxnmuul35xpik3pg7m4vqbxpn4vuo4cbtkwwb52s306ekw4ejiwfm2awf4ogm5tsnnso3bzplr5xv2znyxbisf3mts2a8ai3ripon5c8vdno6hcga4jloi9yewf0c52lws185ofctvlhs5ys2dqisu3zie0zom1rx7ntgip7phtnlsyonhke6lm9oiz2prx6allhrwswnm0ofdau52r3qm3d43gsi9rgbcanz8zm7hpiqcn93c2wkbi9df9n6ght01hihlrw1ktloh56bqo9m30m1q2znk1e42pmelyeulsedgpwqgqwfcuhsmiz612au2j8whqavl2bzkfj2bnmpa3udjw32cmrxzrnway6mx3m1oauh2qsbv2vpjpk23c2t2x5x14hqqi8xfprgrm025by51978vw7bkslls0zvcpsz6vzg6mcq1mm1qpukunxxa671d8raievb92ekfmk62aoa3aqirdv7m6z949gvp7wqn8lhmu7pdt7lkl0c1lm49gpiu0y71qybsr3kbhrpnflngaobbl1vkeyi2ure46ol325kve58xluy94f1ed2v4bmfocpvrbyvox9tntvmjyeo429ukqj3wxc4cup8ei3nbkywwl1k4sgtvgsds7cfatbn27dqponkwkwa7x4p61u1g1ot9ta6k0qq7zz8a9wbkwcp409olyw5vhec01t70b1av4rr2vfag8hn2s4618qy1dd4ypjghx23qjukyzlvg4v2mfqhsq9qhixdhbvi5efz519s87kk8hca88r80lu8wqjksn870gr1h42jdfmbj8wc3nqjem5c1y7sspha1tx4haln1d3aqb5ktcpt0jzoy5l7sjicgg1iv0f3c2ju9ebndbe2bm8ny4iteje4818t2z6b4f9l7wgj3wk8s4jnq10gr406bo42mqt07klr5l7x3zpin7xp6ge3ml4mm432hwk46mytnzqq53lqs4zbspwadh99fbjq39lz7vrn2jvrmj798pe8qzv7fec7yh9dxsn7lsch61pcimmi2aue6ow9wlicadktg72264gvc62teyybzfgo2kag75pnmoxxc2zvooncc7hc5eoeyfe6n6hv5uip7hwrbt6gpq1djcvt7v59uioh62vtlg0z61toeg9vowbml3xte9iqcbhoe086by73scu2g1u4zrcqw7fs561zehqx8d2f4zd2sx4xh8em5eadk4w76x8khfytoywgp6kxp8kyh71ydm8h2pamob9bujrw36vxyjtm7yxhrbat8rzhpwhycm598hubr416js08wr91b0s03mwylqogy9hde3jh2iib648d80hbfusp9j0931tdjt5y6v8y5i0486wm0got48g4kwtjilm8g5z1z5cv4r9p37494gxh2e5ii6ore38hgk6bqrh20ebsjepxukhujrwhb3nekava1y2bjsvahpz8g6tx7z6rze4k9k35hklnv48y4m0fqoxeedveael54rtcn6xi8r650gk8e08zrbbfch823bhwrs69c5at3ex1mgroctz7xlcy7abq3olemk9oybbf3czv8il2t8rrib2wq4j6wtrnmvu0h9w5yl55iw77818t0prn4c5dzbg9b4oeffapsq8ct5vrdbv5gywzbdxshb6656730uxcdwg6kgizyiq7q4z461nhgtcyz51rqqr13rk5rhn0x0exitpdveqjiwatcu3rdszbz98c8zlf04p3pimiro4d35fnqzkscyq0j06',
                expiredAccessToken: 2843339094,
                expiredRefreshToken: 3620546958,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientAuthUrl is too large, has a maximum length of 2048');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientRedirect is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'aj25e3x3qvk4d3xml3fyjuwncgb1liyg6dpdfpu6d2iy14rbj2ig77rqo3id4ps1b0xktna6ckly1t9chsas0z4jj4ltok6ray4vc2bqdv1a04huatj1sd6pn10yuo8jze3imks1mkitutrukov6uheyx2herjayfggo2m6cvsogcqyjv3xabu435qunb7o7qrnwtnsffwufdiw1j4ueex96irxnzf4mhipw3rlioz8fcnexck8cso976fba9oy',
                secret: '2q9fwn0hzr1eommg81m5tq52prrjbynn10rv3iioaomvhnymllqj7yr0nh4tadofslop8w7nmc7w1moqvkrcc0poph',
                authUrl: '8f5uw703fyxqswxn632cwwbuy7f1c5drvfg18p6y1ftfw2xag2xq2u357l8jwml507adv40apcl693wqpi0j3jtbgd10kc39nnj1pg8zej9t3c4mcdrmeon55wu6mfbz1ubpc10slrwicvmzvdg7dmwbdjuyiwsh756lc2zy94goeu3b8lr48vjiah9ay8yt1qr3hin74yg5rwwq4pyxsynwor7on224ocqu1suqpdshu2fty83cx3sixefa4sjl3kwy6ao2o7t3okiriskeg5w0fcyposqlihmyxjp6eant66eh47e01rgu6v6u7j3fs2exw19dx21m2kk9s8nbndrhx897izanlvvqfepx2hn6swwf5q5de7v1t8yazdfjkylurtgfjb10i3xj751yfv28tjquhq78e3fh0uughkh7vi9kb1nvleyo9o7kyf8y85fksv88s137d0oxxhqvcie8iwa3vxngs4m9aiy1d1hla5uc2fee0z7rfffvmtrhjhp15s79hvv7b60ufgb8ppiep0kjpb7z7poehq4dq7ofmosnxxyxj0brz2i2vnq4upgav9glfapcvwgz5e22gijy7i6njlmsvob5m547wjgu56k9lg5kefvm0247f4b7pteibrgaiyxe1gf8j2t7xhqliyb6o3hled1cv4i6njvn1jk1h24hsf154p00c16nesk7bnzlstzy65fw2fe7i8rfnn1juwbiu6p9ozv7a16vs86h4daat6m2tikcn8su5ihgzsneay4cf9d650cq79t4k25qud4a3quw0k5xm5ijapcbkdgh9gfw3fl6ruc391370m5kdsiltft1z39e271ovwbps5erl750s8vyh0twso3xzau1azf9uzpvfk59avapwagpyix85bljwcx2xgxtpk64ro46bj7toxl3m1kfptk7m056j167u8se9d7v27xhg8vm94cexwhb8tkshkjte96nrypwrf1smy5dfxddm39kadbryuszdicsxd98klejyurxg83awjsctg8bsd8s3jgctz8u5nzf6z84ge94dds2hhlsqida1tub9e2h125eaupnq9f1dk4t5vgbztv5fwcouj900hri5v10d5rn8qvoq2koyw27zcfg6is7b4rgyeg5qegtmswgdn2i8oux1c8ktrxadfi8rjd46p6wapatk3ja027r0r5marc549saaf02d6q76h1ug7w3vnpo6dg4t9t9tosfbqex0mjlybhkk07gpr34ivah2sg787jvxa1uqs5aumqt9lfs97tnfalpns8pd53gp5qklnyy8u50ixibsunrxzvu07a9dc3ovx9843lv8kngdnsdtu0y797ehu70onhry1yhzh90fqoiy5is6cus94twuoeszf13kjooleupuxfjgsi304hr0lhijgnlg9fne2y7qp5i2tac9qooui0qb3kirti4olulz1xo1k03leyojmfiefn5c0aktc68duozkddm3dgyt8f5ryxoyap5y41im2oy26lnf4kkz48y6ajgt2bymoo0z4cu8wqj9lvlwn6qkzdzsl8u8cqu2isxoeap120i3bspyr7u2bwqhmnsyig8gximrgrhifapdwo1zmkq27dgc0oykag6ejjigpxe72ibe8kgqsqgdlmpwv6yj7uvp927ssxmpad9v6nxyosi6s37q9oed8huuxmb387lwla7vzy8fe2gdk0pxgdt497li0tmyu5546fvpx66b2gimr4w1k5h8m402cpn5bwvfxa8rif0sqiszvpfsdf32g890glcxd7ctm27zuky54owya5sc1ena1k1nqyrx6p9xh1cg37q0my881tnq5k3vkpyidpdcs2q8wr0zc6yv6ki2uqt1a62ou8wzuzlfyw4ktys94yvrhlz7dyl8egiu4o2kfu1zohbbfw2iendruswr304zgu6377nj6qzlptmn6xcz5lbjm80if11cnqzhmq257jap47ccdm1m6wyp3o57aq13yn0knofspw1vrofj55f',
                redirect: '8hn3dun82j2uerxn3c5w0xvpv650andsd8rlhl40g92kpw60xty33pb6sdza0co3zofkpxt9qswt3nklodaw4t5tjm09c5jdd6qcxafy7kt3hfphi32pbhzxa3ni3lowkau9g5sp4j229bawrwrehl64j4e844tpd4aktpu5g285knt1tmtf6ciuom4gdiv0o2sgfk9zyuag6qyssfs8hdzbfbmvatiflqwnz1hilo0yd5iiewwgzigeq5d5xhw4iqrc2f6uuvdo45cra0u5z79vz31kth5bs8u57r9jwas7n4jbpey23o5oseuj93fy0caskoyz8yzs67tck9r3s10v2c4j9olqpbzpmypm6jejgbl16ruqoc6tx2xy526xkgyh3oo99l9vnacolq0l4z3lacggivubvrahdr1nqco395dk261x91xfcg1h1ubzoim4khdxlzggpcro083s72u8jk99aedg6amp6l3rtpifrvbboavg1h8yujzltj7ihnec5qcxo2es6d9qk59nbsqk5z6g1dp5a3ao9sq6lleh2w8t5wco1c2rkx8vhmgbvyx8bmq8gu1t5a4gca1qozmonyae0faz849cfx8xxlrey5sg3z5innpkb2oo77o43hn9992a2unqg58gtuyoa9o8qypeksv5qa35czvba8ki7gpk6akbn71x9fnx2e06qtuji7reexvy71cgb2pudw99ebh47chdndbcs6sd0hhhsxi1zll81luw9q6tibh1jkwxlckg898pfaofbzvz9d1yi2v4331nuyrsf7xu688v5fbmx7nwu0hhp7nd1tuxp7wb267hwurag9x0lpg1ppwsm4t668t011iwdsx1lon8p9zpwx4vumdnl3g1wh85o7x2q8dpon89za6c58smn7p4dd5kj7ggqb7yoibvv6h2yk9b8oz4or9ioua4gin3v9ks6tyzlrs412k180exwz8tekzxri7n28oxq4ljvwrr6uouxx1i6uebrikl6r3zn5nggzg9ueo150bsilixvo953e380ktv5gkj2wdn6bmyty4gz8pzftlcfjzk78ouwpd8e0gfb5hlk91qmsl454mwoo3etfqrhzx873bwp64tmfxirhnlt8tncw2xufxa9yp6r75533iaa5q7004joz8qwom0pdcjxgrgxzvetiai0gat6kz9r16gapb09xdc3omnlapso6r38zhzxtc9sg62wld74do55v3epjzfmqk8wfljdajp2cppd6xu5a05pop28d2yanr9xy9flulnjq7etijq0936yu0cocuasi476bq70j0h7zb9dcncjr8txdq3ws1qtqk72iq3mq85mg9mq4aw5nwfxgblrf2mu5ha2p4pk1kyinly6059q822xmgwvzihw6mvr7zpue8arm7jd4fyt5n3qm0atpsxrie4yld85d2iqs6nr8zegbhlrl0t20nudu1fonbt55vhuujq20jffzo0hdlvmms5ar62foqjijdcstrmxz5vr4oc9tk1bm2bkidiu55npp51mj6tg7mfejuo7f4f832duqhesq3gfgxq9dx0aupm17khqrxs82d5tmbx7bjfqvbjtbduj65ds24l5153nq1a1ocra26xquxfgp0rqxqn2csfix9o0o0pd3yvziofsx3tj5oe3l503aeagkqmxeo9u4ulobi15mk3b9reydppxj15zhqzo20ufacq8cxxquy5gjm7owo1wy9hxht1rir1f4ffmcng9fe10gvivmvk5e1r79bfhm2aua5u73czugen15dl8hbzdxd41203ko5zox4rce46jylruc43nkg6uxttrqhgudvntv2lfewfrdu96el4ud2kbeoktwvhh1lflacvdw5ao3yqd7a5hm44sjqpx6war598q1bc2lgzq3lpk0lt0gxzkir8efow89kf3j6qj6fh4ppxilokdhy3wa4iai86czlws7cnb0gmn3oxojhk0rcxg148bjd9twe99728q295dmflsj6ndph7of7z1',
                expiredAccessToken: 1643899083,
                expiredRefreshToken: 9263691136,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientRedirect is too large, has a maximum length of 2048');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'PASSWORD',
                name: 'j4bhq37lghc108rendkuxa2szhyyfls40hog1obdvlwehchzh4omjuo4d2f5wj9b7z2kvik7i82d4zm2hpf71s4xzc1resryj4rsjzgrw70p84vwjbkqzkxh5ez0xkc5sravwn8ds6eqaw0lm9s67ctlwl11d1ac3t52h0k5t85muddmfzkyjg3l3ui56moyoiyhsiahzqh50yps3lrg1fuv0jtsc3gfxc6rwcphlxk11u66t8y134wxddedq7t',
                secret: 'c8qvrmubvhdneevg7y9j1fffso394990e02amgzw7di8h3wkkp5rcmlqwdhh8ug1r2igoilggrump86w3o6bxufzfa',
                authUrl: 'tkhw696cnn4swnqnammgc7yxak31jaj1s4qxhzyiu4cltjvd4c9mfune320eiefkd1ygmhmjcmztid3o51omp3ecpp97qcd2pr8y18sj2ytu93r6i2936zushxkfmwspzqsxdt76em8sz3vk2rn44a4fmbrpzqh2orzzrv3tc049gdkoyi04x0jjd3g2efs6b1j1dqqc0j9ct07vf1b6owkkg7jpt8znez8jotir8ixj775j82ye69rj6kiu7nms7srsxqqv28thx81ncfxkrkhkyrkzqpv6o2uhhq0vtbjoptllfptetdjfi72zrvdd2hcp3n5em8tq0sdx14ab7rkqp8xkjm7d6fz5c8vmmurertlb44nodg7e7uvp0n4bm5vbs0dwv9ils6oj7rs2wabqlg2vlqg6yg4s0emt8c7dh6zkb8jtcxjwmsnwyx15p8muno11rzyhpf57lq9a5j2zwk6psrp6zk8by5grftlmu8aw9iesu8bq9y9q00ucmd20z0t7vl2pvnt7uyk5gdhvttlrjn6pbqndo1of71eraf27kganvatr91io6b0axs6gcwqzv6r61xay0i80ulzr679jycdzhcqob7och70ix1uakvl1oxse1zwfsuze8ychpqjmfxwah8my7kny4zbm7vtlxagv9cio39ax2gp5czq75196xrj3r2f3ruti8u010sigu3egapnfbmne6o0t7vy84sh3rml9bxiahlx3ay0eapometzx5dos5sxdcgzetzvmu6rrf92zxxh9on56il8zcnp28dc5zzx6wkjcqr5cwjvkkgx6x9ckoggh1sse6j9u2wif1la7ox1104murnje2jxnbod7akcm35ut4vlz3paiul6zj0p00dzqcivmyf52sn5ejeeqetwnmazvn4bvkngbsmmnk8xl5sapo2a9zxkn53cf2sta1ynp0elr0w2h1nkd309df79dp599gn1fm1366urua051iiumg9yqxscr0kau64udlvyckpoi7y51y83uvjsfgvgsidr8qhau6d1ucsofmvclbj5w0rdgkrbttsqauugjd3i42s2mu9inv6kl3uf98jstr5ogg890y1yh8bkcz6ibdyy4lsjxhuyqdyrjm3icchfl4j822du2j67itffjg5b19g12oltm6ncmy60ov7jzdr7k2wf6grrizittc0sd8knmwatswsv7u6hsy6f2hw3qmacqpu81d9lfwnst21yzql48fzfnsp4eio5k8227136qnpdt7pt2ot2ust3n73dliy09zbhlarg8fnn448gjprlqfhj5u1fkljjs1yf0jgbnnxtoxenhxqc38wfy71ve5i5f0yj1g0hu9c0vwa96wxs60q594pefep2rb8hnirjdx9fcqm2r0a95sme1keohk2k55b5ablj80rsv95ucu2g34cewfk3yrebxynjfrobzo1nddidautmnrkje82ivjbb7p71asunqaoukrbyd4guxci48u0w4n29smappfko9jxoziiauqksvzaho72qc2qclb1653kuve0soh01iht9wf3esntmmih7tpnmcxlqzldqqp763h9zu1kl7kun79abzsle2b7h1csul7orkcmwhga58sdhplml7zeizr4knndwnvpn2xn3tjif7i6my238kd0xvh8nzv2aswzg5c2h6zku1seiebzdtk3mttgi4yra5in5ecnjgpo48yzcjopi0rnhrj9wnbqauakr67w8ussuhftm1frn3m4o6gblqi6qqtyrru2eig7o03cy850qapmi944ok4jj5dqer8pb6izbkjwgnghwdosjwyae7cj9zejkeqbh7ykb4i4f02qzmbzrfuw5sntlrdnl6di75o7bu3pg8m3fkc9keful2gz20lcs3o9kpwjrlentzksud5v1j6nocmocp1bf84ehwz3cmomo23yqyr7o44lbvoc06mdcsm5rlk3pap07shb27b4ulisx2ighzcqjas5vx4dwdla94oz102lxrm3v1',
                redirect: 'pstb4kswvhz2ta541vc8p8mm7w06l2atzv2b5jgf26terv4k8j7chgu4sk09o5d299hcjvs39tcoyxbg0u8a1qtfq16xp2jctn6igc6e2owc70huuwmlf20i71z0nnlgxktjlaex6pt3wlncbhfpwjphpgo5hr3zoaybafh4hfq7qtz85nuzdbarxuzz6rscjyz8yusp3m89khdjy3uj62zwzgypepd7fcue4q67693oy6923jy2zna5nfju0xdbs6ks12z3r48vk6rp6d7fbms8gdlfytmchn7uqp0y9c5xkzlbfnqk071btvov4sc7a83x381cy96dywym745lbf3jk7eye1ixc9t9ptqdc67bf27mt78b2s8uzn4pb5et0hxodb78iyd9njbv2tmxivnjxdi8gdvvgjt6e40fynvyelhi1772ykwq49grm629ff6wqs070akwa6rm9wfapgu04wg9mssd7n07fin438l2yrq1p56jzeuiyejlvyk132368za4q01vtu51pgvm228x4vsm7empzd19fjsc9anw7geh9jx5kbwmuhz9y7i3q74tlwiu59ixn15q6zy2se19kohugxr6n596zvj9z8yhxzk2zylp20gulg0v3xpah6c1r8izuo2c7ahbwmi3vnnq193z4p3g0leakuife5jq0uc3wkgg9njv1fy3z6f3vqgdn34mglitxq2nmo7w9uedfkb8rol4ire9tv5o7qu1skdqya8zab09rzlzyy6sagibyf1pegyq8os4pg7pz8l71aeog8vhnp3g5stenp37l65i33dsyuhhl9uxepkg8xf49h1w5z32rjupllbsplp8cq5ttw57owtwpg9cboj2o2l8vtykk3c14c8lzneq6pp3e21ch5gu7gv887v0l3lnon0z90lyfrg3sk8m46y4x0r92i3h8so76nlvjnyabjvsrh0mmx4bt9gdyfzlsgeomyul46jqojphgugq019rwel6r3gk6xne977ogawspmmdj96l0ao4c92c5gk8a5ridoy4gc9c5huj4tay96m44v5f6sklgl4ebaekpgcg2jq9yak2w8g5psqgcuqpun2zcf54vylhsz4btt4g5g24tcveht17hnvddcki4jjzde8b8t6xg3qgzreu91scnnm8ag7dvgpo2nf4rvp7xdz6vukm4aow2hfbzxs9hoptxy1dym89q2y8bdjzm2fdvr89ykhao4f4p5qw4uulmsl4em7xjxgxkod0tjna9r3ido740g9x1dj3tuejrmy2a2w7xfioh2jzx1qs7ruc6yszrajm9tqgs6z5ibzwq3nsqujoax135bdeyvu7gopqdxg5r1oc25by4csrzylwjwb2b4ayc8zsviwrzosi4ecby9xh1rzgggdfil6dj63ntldpg0wkjhvgnyc8p5uf1cb4hg83ez4zxwfm15av3ve1b1wqo36hw557wj7jro9k0opdgs01l8yh9j33ucp7u49t5pn3s5ft5to8kjg26zoiy3qy8cocao4bt52hnw4qv3ne63a47lzrt407e3y5fpt3thcs92jopu49rrg7r4trxn2uwsy2mt10jewr9aebztwby8j31mqokm1cupoqr2ziqaj57ec0fcgkw9f3vrac13obxhk4nfmd0dnzjsl2hi1ugczmqlq4chzzq8vqmf4suks5zu3bloo1ta1f4nb22vi1y0ju8obiys93zqj3v3huh3vmqbgnounxel73rfr245luxjttwzclgw9vbtzmzzi0f1x8as1c7fczc84fid1y5ya0dsx316f2h8fe7s5uldgmfq1fll0wguv9al66rq4hr9qhueltjuinm1lpinh7vnr4fp2taioe0rfl0772gkdt2pkd1exm24fd6md3lxnes6sfrvd9nswkk5fvw4i1286viy18r3rqd13vn0roqllfhxp1pse42xqp7kmp5c2bmn8th3ig7dngapai0sk1czim4k8idz40fco2dubh3tmuu0hqy0l51d9m37cg',
                expiredAccessToken: 32865150827,
                expiredRefreshToken: 4633139364,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredAccessToken is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'PASSWORD',
                name: '5k75kpx4n614rr9rws6tjyisln3ru1p1ir2zge8d146eew4gkoe34yyla9ytrto7gxkf1irs7z605vtbz23kawurdyfeblvw7ojxlaf20gl4cota7w3tjd3yf0g59x7tvd7zxkmyh5uqp9ftg5qr1abeae1kgyow11kr9s827qyuwcdi34r25lsnqmslhhchnl1rblca3hj6hqlrpcfsh2tjnx7nwpmaoan5u8x21kziycy9dggjiwv2z86doye',
                secret: 'gcoy4qda8of21eg25dc62wyyk6qulign2mnjonjxofbsfka2wphr0xzctpwyx5zfc715vm95qau2gfdhg6oitsooq3',
                authUrl: 'qi1dm0q30terruzsoasbi0372n11dekuzmuti80rxkakltc1gds4n15yopna2xha4a0m1j27ywk27ewj02olsn27p2r7rfx27ededi599o0avlvlonfkty37dnxr0mtcmfkio4n6tug17zc1mdr5ggkqvqr9o5unxoe5v2vlcivien9eqmtbqdq2vgwolc2crixmxu3uyjsbcqzcna8c4bsfe1kswf6jcdmeklng2zzkzhyiaf426p57408tnk0uxkhq1rtk2loybys29wvhaws735o5uzr12spb9tckibg7qlo7xyg3n6p96hs9v1mxkcosp1dea5l0gy23xodtcdx5tm2pq9jxe5xmeng8pahug51aj5jt5pessp8h0jbecgjwwshfh2yxkixr4fjc2grrjhr1frv5twxh4cizrvcdrl12l5c2mo6ncl8ynuo3xju1n897ho6wdxgq1u2br5h8bing9n2fst030gzajih96xnc42l941hihjzklmdtafvofti6zmh86ekd2p1mxj203cpwre7g5tc9hw0d82az24hm1hxcbq6k3wowxq5ovdqqpi5ejfigu9icmyd5aqy46ycpdsn4tjcsq9zx0yyi6wtp66056dd7t7ggtrrtdhwmkxgdwt68tkrfjt119wr97lt23hintrrjhmoqvl93c5eyekqt93n1mp8zibd46ukwkbxy2cyolo0sbmv9u34yj0sg8xeb4t3tc245yel54nea61qwbmyy6jf7mcbxr1gfamjz2jw2l0aco5e4ci7favlxu8xfxun85q1n4su2oyez5ybdh30muw243xujjvf6cqzl1iwzpp495428k31enpvz50etg79zyg0ynn552bp1lujjr21aarb2lrathjfjvemymrgimemcth7a0n5pz4q7vhdghfc7mjuug00cytgf3gapr5wopnbgukn4s1vqvrv636qkkxgxear0v08l68v7lm245h9zrrhfunzo6iok5s1l4eviusd5trkk299i90noca7yrktewqwc866myq5zpihqog5sxaam4tf28esxjp43iscu0cfbtknnlcujw4f5tft01k6hs81qudm4zpwxr3puaioa2k7zkvnuskgvcz4acmmdamrmr3wmxdozs4de0ukqfd7g6rpwstz5t4ruu0pqc54kpaccm9awamofmqpbw2j5z8pxhfklptz9ma41b6smejk57p7brujcazedxlv4g4ondbk9ag3okeive8jaacwr3v1wsxbw5sj0ejkk7txdapr5dvtnfa395wp6gzkyu3u6pidzag09f882bmrcuz6mrd9j3495joepb05gam9sbagymtu8tbc5cou3gyml7nc2cbh8p36jv4r8sh8krlgq9x2lslw6lemj66cvjd4htxya19373bkwugf1m8zti8pdn40g8fs130h0p8fgssavisfgvttatv6w4t5vogi3iu6q91sjwlw3wgwq0a7evuabzgs0so5x5dcd3j4s2cnpxx3a956u41mxw2sq5sya2ktcr4gip6c2d7vfqws8xe0gqb79qvqket57wmq7poa1o5a5oiultypbgshdw5kwpev80zl0ft36l8y9wmflfp6ne16zk66u7d91d2edce1o39orcqrxsyj3317gxi7h8vh7zrkf9n2zj5nrp7twpybpqhzkpsyzidf1nk5dxssi9zcye6dlk7raj7mz17wq7v6ht7cm2kkc8b0ld4ne5389ttrh0wgm11ff5prur08ymbq5qt0javlbnc5s1zg4dqcum37jg9v9x7mti1hjtltxdbykfek675qqiqnepk6ub9063s5e2ij5jflhi1q0cnvq3mt1o3tbjbr460ggynky0v6vprm4akaw30ceaba5lqjxsjhbe69y0eiymbumrzj57fy8hs3ojppzstf3o0mdz1od3vfksc8rpe287qmzbiz8ispab70ebf4bd4bd9x2qp7bm7gqy0ak4qr1z4cthabmoftg5dqkql22njqm7w4etrqw7',
                redirect: '6tj81288y3josoie01hzvz1ek24ie15nwrxzotg5x3u6vxapg8zp1dzhbqt21dp336xlqs77zbu181v218zesif0z9briy5zvkc1jubgkitau7rtnsb3la12dbnm6bjwz4xm5se5usrcfuwahblvgocds8axse3mmbhpwxc282x1wzx0vrb8q8zc817of9izsewimzh2y4ek3v3feotsqfzzhyutlld7jbekmu97gf9154evt4ivlix5lus5cv3gbammye5e7e3m3kwc4pz6tw31t5axalmgnbnos8qse2afg4o3yup64e0zwv70f766g48uet0li3kn79gbdivomj7e0mtqa443kq5fyaclezasrq32a471y9adr6qtbx9bhc3u6hl10c49prkmsiglq5vf3nh4s3pqho2pms1hpab7cxoihn7vwnnvaizvcsfbjuirc0p2swipbk8a19w6voljsrsnfdp1egxkgz4v93xwraah48m366agty8sihaggbjvapyvwln3diz6zu5362v9kmq72xgla93anqyqkdl49dsgqo5h4e94wlvdzi5yepqnh90xyx9jb5znh125h5a99sr5wxq38xps65hbel6n5pweht9ffcpkbxhbax31vn25yb1u39v1p1iivypy766gyi494x51uh08a8w7acf3d46zbwyxuk7rve31ps06ktuucv4pqu69pspx1njlrpwz3vfx2loodyikxm9js85hzga2fzkmgdk8tywypav8lcenervjxm5h73plisty8jud9t5w2jjvvu6f2unl8nc2c9afqwizsqusevvgxgd0gbewnljgu6zioww934vrlq3tpixteb904empx67f34zg0rfgg8gjiji7dh7ab1v429n9houwl76h6eyeis9ut2sf315xd6ehif7ua5z0a4s403h2n8y5yuamkqy4crxuujaipsq7fndg2fkwwh892xappy84f9bsxpvee2t9ncn1n8xjtj1z1s9ad0acgow5i07rjhml81weqw5w6fwrlxakutinp02va9h599el99e36tgk8dorttrws6kvmo5ugypydbo4rjbhc0apb4e3ypp9d1ae2ahldejpvsg1yqz71100dael8s980xsbvegoohtyu4declyoe218chr36dvw6o5lqt2e12keq8hwuhmahb2c897mf5q31b94oxm66horavskpwfh37x1q1ac9b8qhffsv5yz5rpawcqgkz8adjkapfupprzls9jf1nv8b2iurhk4ok4m639zk0njlxo31158un866j5yx1ddptpcnko690i7q2bn5gje1k2cr067c33ev4pa41momwhred892o1r2aegsoi0rq8kcqxb7eht5wi9smnyllp10a9r130apyupcph1i8arpjyabi8da4nobpagu0l9mpztnu0c0foztpxtqruwj5uke7siazs38a65ke7z59p5970pt3izi0jn4ejjp19ycu29nijt88b6q7mcgne9w8h1gloy9guzi0udw8c3j6viv3i4xnfr7wl31cbh6bvi0luiggzfelbe5kduojcebcyzvubixzom7tad8aottygpqwwmsuxdzokxa94h89sggi9kbkxslp6cx5m785q35hmgjgq57xk5hpekfxvlxvp0vxzp6wp79glnic801f14e3jucgds0zwi62jxm8yfect67i2k5ui6er8g7j5fvbwlsx4xcwkomt4xsx8uezitlcu2jni0rkowyd0gjdmzj8a1r85xzquzop23kasudwtq9jdb7sdqj4fwivwiw9jhj68jn5sje1zucbtrpuva9bxwznfxggxc72op4ihzdrfp459ypqr1pydktudhq3rh5b56bhggcxpvnzq7mdxwneehgkbuc0zc6wccgzsnqe7ukxx5a4t2tugkn15e9gi2jwys6t263vitgiltlb0lt9vga5ba7levcqt10vi9yey98khu2mlnbzw81cwkm68u2xvmelr1atq8350bv3gmsnlmwnc6',
                expiredAccessToken: 2621808481,
                expiredRefreshToken: 97720535417,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredRefreshToken is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'PASSWORD',
                name: 'cgoredimqxkekhv5jff2g0k1jadbv967fndwka3kdpj6jpciat88eph37v8swau65cyheeyufd6wbfiokqk0fqvtqcnycddgv9nea719ti5gxq2wqkw9p9cmql5i6dvl7xasvkuwqf8zpznxmfs42x3470ifsw9bh2ybybwwlbmgsiwhjg09e4wezilovpotg1wq4ti9qq4hp2l53ukahwtrup1cmf6xe79ldcymlvs25wd9usw41eoahkgqwdz',
                secret: 'x83ypcihz9li9idhz20vaz6fr18kuy6b0h35bto1j26q2u77ub7s959h41vpyvnikm4fz7moii070g06h3p0a3twle',
                authUrl: '4zgy8cexgb1ff4ur422ayqrwe1fry4j4yyntbokozhd0ns1tmpp36fo0biwkom4hk8me098muyuk9hyhm8wo5fpx7aptyd2wcguixxb7hs72hxl0rpfeh1xjt4j147pmez8y4c7i0umtc2abi4apawjg6svoxi4lyi13hs93xd71h5y1az7m3kxfcdap1sodh2hmpc0q6fjhm7pzqgyoz9vfevk4ply31t5l4edpf0r39ykf3gfrqkyovd2qynkkfxr85nnlxp7udimcck0omjo3ox4y2c9job3hjczih5xrh2xfuodvaivczwg9nv46x1sp4rw0uqcdlfzwr4h8wd1e427mwhqzxn0plgxkp6s64bzd7c1fdk1vog87cb9e9199kye8rfa6z0x97l6ommnbqrni727mjrbbvtsc35wy4rnhlezaxxrfghih79mth2q5mcsjvpl2mo1lnkg9kucxjm5dnoy6qtlyviusyxif1iftcrd527sa44i4az2t282p0h31nnlvh3oqv1da5pzjpc0zn26kq5zah6vp8xa2messi75m9b4bn0v1m1py1b6bb9ybfi6466pa5r8qm6ql330ssla5ghuyk2t6wtu3hp2nf6chnwenxzsjuafip09620auk55d6gje5d6ro9nm87ybsyx6kktt6mnzr50586pjpklrgslm9vokg6bx2bvzxd568f3o7h99brjdn3rigivp493p1io5kvoir0y4zsfsa5hik68p8u16ct6f33mqjvf5nr7han6k4r2pjdfwpgwvzpkgzntwxknu9pa74yipi204mtlszbnmzkwt6czyp666dn862686dva0ls1xpn4aohgbz7h8yto2gvz18z6boodiqcrci1f9inzdboc2qc2qnxtv13obknhvigjpx7tw0juj7ez1stb00b5n5eqn3dq10v4b0ecxh95k5x3mfmqvmy9n38xw1eimy5kxbpme7gaqhbolspbkutbotmqzsnqyneqmgz5b8wk8sx6383gsjgbvjjame11ft0oz734qdeawx211wdxypdgkeb474i0ncbs78r9el72mmnvgaimriucor5xarsta2cldf2i7egzrn2fki5bveq2p3871af4s7vu21mex7bitrzaerqhdxm4b6be4wi8iymebjpbq1ggfv7idurc9pi0rurfgxgt2yig7cwnj383ikh97s7pca2ak67bvrorz7pdffbccu5jyh8kilkyo5rfp5ur3988zf0lgr7a59f1cva1z8rdrmg2hvwlbpbwks193g00uyzgqzh1q2jgq13tcj0iw8dpdxinfdcpz5vza1699wpjtjycox48nmu78kr2phrm7h0r5vql827wqotzbktty36km2erfawiq2raus0gvadjxuj990y6k2rwks80lulzgjych4rjw3uog0l3artzvqp47asdhitu2vnxvsdbbkdaskisg3wb5dh8nfigyt32k2atcq515gwx3ojwngpkvzkj7fl9fbnke0c4tw49d3puhztj1ze56evq7h2oec2phcy4a4bi7gfrpc58wo8n9600l8751gv43hl82e94tvwebtsc0tul6c99afpy6ykhz388fwaaelvxhngpbkqyvyte4m63yjuw8dxcz8ejcvrmo2f50fve10dvanwknus5i1bgwlkiydr96miea1pdmlu5z2kd1xmkuwqquooyvpyeifwdf5znwu1w2sc5ivzddve8se7snaq5yip74kwij17yvhdrth7xfmilaj25m3zogj3yzcvb568gwv9lq4t31cl7cghn3y1nhwyaubur0jg5rs5excnhe09spact1ey28syx3xv0t6ncai4pdewle44wecvzuyjmt2q3y1tfsyosrkjrs6ktyy1d97mw9c82kjbc7e2q63rwo0baih3f65c51lharshhcalpgbiw1qine9a58sa4w5dyb1li4lfp44pvpmp53iox6w1xphq59hiq3nyp8wlf3xmowpky1uk3pj4i3aywx8bj4',
                redirect: 'dytjqt7kf65hw74chgevuch7rtnmos1cks4w27k2oenaf2zrpogv0lkso2qcs63rm1lhhw2ddsogyn9j2hohd9a6z6kswo4yn9calj6ignfsaf6kd4hqf3uiijk6pv8e2g3s6mq11i76q83gbovwc4u1tbjw1zzmro6ay9hqd78pd5ljgb389lk9hc36b7xlrzlmxicxmoh6ntoy7997auhglbn0mfhe4fc0lrzx0f5hmq2selpfwoqyhke4dmz1n0txez5dcy15ko5z37dbk2qiid25wm2zgmm9gd8cs4ssnkmqf88twx3aevnq8qyqzaix3kktfexukbxqgnm9k4bv9dr2j9xt4iu6k0kew3v95zyle5iqfnj97mu5jf0107wnmi4e1rfs7xn8guokvp81umyw6ed2re86ke0g6vfk9wgwp3rmh721cc21e6b7y7vfytkph54i0lmx0n09thwrnng0oeagrcomezil5tf5x7kxk797rndnkigfeweao1nats4mgk4f3dmozilkdeg9ag605b04g3ynbli20otlw1j6sgbsp4gsfyoique9gps45co0ule1agyem21rarr24a7t2kivgvi1ikgbi04f8vkejk5v2rr0kx83hvlwns4bp2dtbvaj1a3n5s5f32kh9t6gwxc742zzz4y0pc96rxboi9s17p6pwxsbwfidlw4unqak7zohkrhchnis7ygvj97gqi96v0aqm54ny8sgn4qy1ru3oyi60rcwry2ud0rkbhw08m13z7uu83bj8tvqbt2c34pszdp7m1pcszgobl93k7f65j4fomt474pa9lq884c39ve67du9bhqn1s4ddb61fjp9vnnnhuitbse2d0vp6g7tk4szhayvglxjlgi6pkiw1xvv46zkyajrlnfa1feko0i6v5euc5m1rr6un6t6gmz6iy249l2phytscg0u9h921a2x0480lsmybxozedm6vs3oqnh59qmqrbqxv6dr7fqo5xnfc58fmjc7yqgbqjkf9vt3826o1bwegs57mlsobh4izw6mwqwg5kqjfofazl0x0d9k7lu0any2h92jf7qnn6owd9q2goh4vt0rplmtubq0u8o26o7t1iehowtghd11qy7kzy2n7nk4rs0lk1ymnfhdc4eaws5qxyvkdperb7pz05qsm5gerui0axx227sjwb1yoyniqkiv33qyxqreffobzn4xx1q78kkgblbf9oq7l5jq5gk02vjnysvjqvpr9wd81tsh56a2l82hmjma52csx5usw4wrsukpw28nq658yefjj6jru1xu48u6rqzai916krc5ycskppqtysuwk0ue9csaqr050le555bix38fwb3uen9xefufnf8v6nuce75njkvo2pku0iyj4tkj6pkffwa50v2qi8mi666h7p3qca98rh4o21w971dcvoj5dpkk9y1q6g6rutx7rfndnhaeipiwqklh9323rr8x5qrix920wd22rxf4vrcih6mpgxm16wgbx13vsrr8ixs4axasjqxyhoqtp61b3hyr0ujquy9ci6a8gl3dgi4t80d33wch7pn7pidpz9d4r3alow3ilc9h15d64iwtjt33l0rm1pm9b2s7pzy81gw77yxnh51vn718j9fbmvjjhde6i2jkzvcbu61ri74f84sjtmkeso8kzv0a8rv4lfuud7i8i1eiucvqn7cgyscis5hzha4dst0lm8pivvtjsap4lguee7publ3qsgae5xhgegnkhqjmxfhuw45grgt26w8loa9rlcxmfvzhrjwpw1pc78k2hbnmdw2sxmlgcqfq0ccdlaazck8jazqyxj6uqd7oytn18dd3moiyg7no7gswn02t68gz3n2q4oo16svm67n9rx0wkqu0u10qtb5h4fbmaxavsiti2l7d69stt6a9rhdgbh1e0cjdx56wfbfyikf3h3bjw8fmzlerl90p7zztadlpxy6krz6dv7vd4gg8m3q1yox47uro7e28fvhrt6or0r6fwye8dv4n',
                expiredAccessToken: -9,
                expiredRefreshToken: 8471232763,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredAccessToken must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'PASSWORD',
                name: '7eo5u2lt9rt8z7kbwuawpd7c8crflqf0yjqttk3az9obmtme8t4qhnbi1ghe2mt1qegoxusdr07scsbw3z9sl1j3jtmzjqar5br1o3i0ubpls6r9gubusrtn967pvmq5b80zlf4asd7vi0fsxzt5j56exsm3bisaeq6zcd6ncpwtu2js01dwp2wdcz8afowfn5go9tdjct83f5quwgn5scol0svybz0dv05427rm5y12nits2zh2hm3g1akrexs',
                secret: '4vqxw6wat6tkk6lmjgm10tozadok3zoqrwppzegm5685k0qoq9ws58chyhmqj0wbnuwuh18oq73iou96nypgwqwc5b',
                authUrl: '9h14cg2wr7f6y2emqnjke6bi96tyio21kjahy5uo37oj32pjc4z239dg88g1ikl0jvvov6y6kmpwed41mv9pkmrjda0tt61e3mnw99yy9ksq7kqdy45cw68cel6k9p9tl5uykug2bh4goure67bkh32z9x44ltfsve0lsatwqd0e8qvh17tf30pui76zcw89mjvs1a1suq8pns701ef2b86ntrp2fkdogtiiuqawk3av4c15nw5dirq7r2b1u94wd1lkvtmv21g81dfwz1e5aj6y9b4eptt3yv20uwzd4leketkqhunri9kcfq3p8bjyl4d99xeqj220ca8r7ev2n21l8tbebcl2hccrdm65wdli4seexkqr0v8chrkqpk78jwhiuu85zwgt3vmqer3w4uckfrwcc07d1ki2uil72dnlq961t17kipocn645em35kc99lt0mybn5z3qk93ioqbhlb6p1l36lqab6r7uzsqiuew3vo1scxdv7jjdg1ts53f95phmccelo5pv9d4gvlu5gea44t3cypv2cvs94c575g7kupqyxt94bmz6r7bfykehxad0ajtpviev6uw9fixh6nl5gf56nhftws7jugbfvd8hgbind2pl4safe3adiel4j52rin69w5cd5sdf52b7ty4fm6gnol3s6jguugj2l0vpfdb0a52dnxmnluyuvdhe96bdxyi9z0ik2a9f4pih751hpfcrxzj00ex2z6xp6bnsa1643r9j136yajjj9k1agh6gyhfuehasd6gzy4gdxmqfqa682jghzwprji722k8z18a9mgat7nfhlhqdj9ddoiraf0bdnefwnogv9t3fqjluy8ocn9lvltuzlb352pntplnu6w5b45ygn38v45juujgm6o0j286p7vji0irdf0861i0rf70m20adzlpxjedev2vobqad240zup0j2ib31rvzsy2rnj0zbdz7sku3p7fyrnik7go4ve7lj1cav3m7bubap49mvcfml0jz2sqyuvqapfjvsh59daghcl8wv1hq5tp21lwa7907gsgaecvkvo3w13yjsgudo224ffxdi8o2ls6fn3vtt60s67e3c0ufscxrtsdw8wnvda10xuxw55bdvz1c6i4n47w24yv1npzok3rjl3plld521b2nqxoamv1ix5gtdfts8t2sjg058j5cae7rcp9lx5sc535y8b971ptcicftv6qpum51beu66ofgwznp2685zp06sb06d18iq8retafr6i5j3nz8oog4go9r04qu8vzvvylwqzowmmfrervlco3u4x56zsmtz8utmphfd7rd9wc4p6a2041kv4zglo06lrr97c9vjcacj0ms7c37l9oaupva590qrh3vnjp5ik882wcyhdy114l9g5xipzyv5emmj2dsqglppv4qdojk7awesskst9da88yyc4laic555kiyq1813375ewey4bxy5ofjwyzmr1p5npo34pyc5n04ssgil3c13aekfz78y4fjdnlmx0k0jayvas3dkhm7wthmp693q6yzhkvs8x9uimg24b7l2pm9econqtb0i2ujbssyaer6gwku3ivczvdp0eumgr985rcwiclrper4ma7dnti6urud0r78x2a1162n0e51ao2d9eqsghr9rtxm5mdbijkrghgzt6oa9xuipn80m3so0jk4o3q6ct0dc7iqfht4ju4a3hzoi7lng53whslvpnb2skwzs682xrpk5qc23msrfwl9t9z4jpps1pul7oknx9xu2d6ue5n9e22rajn6luborvuunk2xix3nsphq08y9tpy95mvknhscssw1rkfna9wn9qobfn7r4mpj04hokx2nih4g2ui6uf32n1ugga9cwsm27hruajz65c7hodvk19fs7ex134absppufdu5tb6gvs826yufgfbkybsz13rja708cz833amgy4asqxbk8953ufu78snhk772eywvd5te8rr3n3d9uo9uqfbtv872f0rhk0ee23xd55l2qmpu7',
                redirect: 'diyma4y2rucshb54puvsfn6ibr2bw0ihguh79jldpk6jq4m3iuf5z3s4hla2pcpgfbq3afirc8jko2sr203n4cwwqytq6r78xzk3a4o1r5edwuiabui4hxg7dt766cg3r00ivmk9m92gtrlhwv5txsmdn87ta7lptzch7270n3m9557y8fswpzlehyxcfg6et5y1v5eya7id1nl96gc0lkd0590848pxg8ip29koyxngtpqurvwllpddjo9fmqtw4093cerz16e34kjge43h7o9qvbmfn0n6t36kpifurdvk5gse08n8fxft2rqc7n4gzifdzeg4udh3ol8r7yie34pbkunjl7ot7i4w3o3a6993a6s5exiu9q4s4az59n7x29tqcj25nviz3venhjtp2ckadd2k5mlqv2ykzvlu0rufz5b9nh4jysxmwreey86h41tlihfvrl34lwyohkwrj0eengwb0ldl3wrp3be6f0nnvsev16fx4xlkcwi0sai1wle7mvtj0qw2ovljv7mknnwe5vata1p1uubasnjlz28b9akf46ti0rewvk4d8zmc30ttg1ifnbkezv2lhze9sl8snz7peaveghj8tx918l7bujc8loo0msmfu9dbnmlv0if3t4vsfttdyv07k5h7c5o3fg13q390ergx6qhmoxgxf6je545rlzg4jsxqj0ium2d97fmnbnklif1660ih4u1aqsxlng0fjiyjbeqpjtydwxqu0nkz85rov3rnl6agcg4s2y8w3lmutyw5n2p4uebz8kmpz5z4nhlppzixdf86q0hk5x4avkir28xxdl9llw6wi8qz7s3t6z788efgo33s0h6183yxs6de63vqj6twwg348e0968541kjw55cuka6dbzvw6z7g0yk3w86ozc6ei6gzqd5fdizszapxm6mlwuni3ca25gr6ibzs7l42j0xmy2dk166fzsccm22na71yux65cnuzq6qhw5y1bp8jf4vr0b369rdsxgtiriwo07mdvfnz55m18f234doikdoqgf4en8cq87zuktjswi9cj1y1bw08t0vl7g41vx6dxkl39m8gtn636ij163iilmhdjdzz6isusr4chsxrcb6zqruzxw6uog46i85ygu6qhxy0mf72y78cafp7ve98us3oho9o0l0p8rdw5bmxyvwkw6jjszc411s6xmwpaytcjkbnqo6c8gi2x4via1hsz95fsf0rr3ybnkc8mtut7hm62rh4rvg9lkmscmp1a1p67xmn62tjpdxetcnpvydnu25lob6c10px745ukqu42b9fl8ljimbrhz75bm8w5jqd7q2j79qcxr7kudj0zq8t5xbcckp5sb61ai2ss6dv8o4qas24khwi6bggbv03pc96mdbz54c50tuttg9cgh2vfd1vqadrqno8lc6c9sk02odede382p6axji3dy891ll1zaat7ks30bwm2djo19vrwdnmtdasrzk20ksjc3nwvp2fdn7xzdamet8wi5yx5avc305tssijoghqxnc9mzu6bt5nz4ar6k4sppq0gt5a1eovt3kt78868vjhx9j02elgqpglaq81r9x2089ae7eq7l9o17g0u0qsxbxdhie4o222qqgq2dxupi234rs2dpack4zsdrreqgukw87058sjpaep1e9srtvwm0d8c1c0r0bfuz2ub5dua0mdttrgxome97qk1i7dmxqovmni20v3vlhkn6tnowztmjjueod3sgact1zzrtqqqg4fj3a45jwr99ajffffy864abevgw9d33y6gxu2icbwhh0r0j6ad8pefpizkq8kaybv208uvnw3b6w7cy77l19i2scbbkg4z7z032nv47g7wzahrp2v8da8048ter89grda99px84zyn48935stwk6m39ey4hh32d7eftgtmdwnkx9rh1ai9ky941qb64205h821widv9ljc8ubr0jlt7aphkdi6s3irqiz97e7e86m2whxriunpbvilxk9c6l0sdchlq2lln82',
                expiredAccessToken: 1206379592,
                expiredRefreshToken: -9,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredRefreshToken must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'PASSWORD',
                name: 'txsxaw5oju18c3wgu6tx8gcdhm0conhrbpe3lfz6mlqu45yxycq459thvcthx7ee25ajja5pxlx8gjlnrnmubzv6he5eoxuyuzu6vgahktgnnz80ptec6q2k3a567ncdeze891jyyjhz7esnujztulvfjrcmvslrqp1xglmubzq2x91hfmw4q11vtwsw9j167nh5fo10l6e6ang6grfdq8kfr1i3bsxd17h0tgyyonmp67yvibw94rxrehuns7v',
                secret: '0esfqyjueqqa8ipzlgwlcb5x0m5m8bewpto9zt22fvvajjhmtkp5q47lgx4o4g7p12x8ybaw21zssenk8to8gb3y79',
                authUrl: '4lbk0lzgvkurpsrkcsc384n57t4yh060gft8k717atccvqh78kuad622pjhn2falbisiylj9j189yf0buvg4bun26epefa2j7lc8q62yalejhp1d0z7inpzrc4rfstl4q8159lq5gc6rmmlb8qd3mn99qiyyhqcvxnzi2f318oceiu5fbt4xcampzma178vhp3znv5ckuoitb7nqjw7or8cazm0il10j224z8bn12gohn9r2zfud8jfnswbnliinf6rvcvn34hcr6w9pk57ck67bfjbd7tnswmj452bs4z3g0eid5yozus3mk83oc7at4b46n5re9f8yaizbmpu319m1kuf6knu01cb8gsz4n11bu9w8m2asn5xj7tjt46kr4fdlw4t0c7a28rqykmk2o9ptjbr98i9wqmfghp445okuudmzhmbmwm03mfmui9siiy4thmgpyqunxiflkl26tsjica637uffl8q1kduiv0tsrmzgjqijp4h2zwd1c6depj2hba8g99joo868lq5wrnhcwwrgyl9uf2u3eskyzgn0gb8foz146fquodf2e94ygcwtbe5tzcnurrajdowxkrur6iyczx6tbg7bgztlq86ovdqskudgih4k6ktm9dnxp0wncp0f8w7uya2vvdbkl6nzrxprjawalw6gime6lr1muac0e8ksnamnewmx2e6v7symfpldainnil671r5w7d3mb4ie8j1m9otjymdjw5aoojbdwelu817wkumh7eoyvjcbq8gxb0gdhbjwuj5wvhpzvo1t1njb290vz8n70wdhisve49sxetrqle5ncwskpkqjfx2yzuy1iibva5lma9z6u2k5n1kkdb8x2c8dsjs7h8sf32w35qf44vn3kh2lh02fvcesmttfz4054mlfnyprnazpt6y54s1y8sma5u2z2bke50grxltimpomvunjvu4gwrnmzlvnexkd9gp3ype4mm358w46hqgq12ucygkixnfepqr4ss3f1vjkpglw4rymtlw6yw41s6v24d5vblrdbsd96isrtu37y71ru7t7x7ghnq8ty8473nk6gcybrad603ach0jpgbvlumvvri4pjq6i63vmcmdb3kn7kiikvmbvst02nlfd34f013m0ky9n254uv6mz7z10cfgymhnns1afzk03rayhi1r7dpneyfihc3hmutghkvps6g7uvd99w37k1rn1ewnbr0096of7p8nth2js5188sdtshnom2sr2pa3lhes5zxrbosovug3hvm6a94ceewxb3xsesutf492nz0qeyihmm322p6dr80h7q1pwvqtkj3bnwkk9he0wydmpj8bzj161fw7lzlzlu30svh3eoilndmtn9umrrho9urw7e4wm0u1o675nu9dzns77efbpmm552zs0xtg9u5y5qtwt42hnimmyxwpayq1vl2wzp9b71y20tfc5b67wgl30w795f4brke3rj51zbt7t4jpbceapgyh8uta8zy3sb6hcgesa0w0w1e0ec19r4ydmlkk0em5zfuxx0dd7ipj6y3lu13kh6vvx9f5i43lq430ulr8r1e6ycqoxilwcaou31o1myy5g3nwpqkceo2wnqotpudi7hi9ud1ikqwsvwr84o6vbrrneulufgmca8nuey56x4uff4560y2ly86sh95rc2oy70npwnd9bktai4fp91wtap5m0zv0875ccvviex7q39cdt6nnwbqpke15eoonz5p6t5ltnw501dhl0ombd2f4okb3rkbimy10umuf3fyo3xl489ri2kfzkkbq4bq8ftqnoshp5wivf9ejjl27opv64fa97gzzmtuxsq7yvjt15pxwxtpn0b7i26pslzrn16i1z6tcmftturaefm35yfec99w6lp724a6mxwcqkfsljxg94zvjm7u33lvfke2nuje1d78biukffrviyiuaekj0g0qz231cuypo7kzzkla82j3dmb4g3mhf8qn93opsljdq0kzwr08xkpnxicevpnm9mdvygocbv',
                redirect: 'emjuotqpi4mk9a31efy3cmsu5gr8excntymk67129os7l80cko0gvsx2o7yfg3ngir749ysbu6yvyy09j5k7bxrwob9fyvno5anuifr4ceg4rodyebz6lvbbcapuezbmjhn0qotv455glot2n2ipklhpjrxkvw719nvrnvvow2timuh1anslfg1fks4mhot9yolprpwalwtb07brz9xf3c8sato00kv5xxkkxexcuh6jj5w3nknc147jdubfy279pbljx7otl74t7yjplb96jc8raax3ey3ollqs4mwvl25482m5cp6do97l8pvjnofq0csjp5ozbr69uc0goh3rsyumelds10ymhssw5nv38y5g9mpl3sy30s7ejoj6kw8a6hvtvovynvefghl902302ynhepuirjzevitna3l02j0643qrjdv6sle21yfri52fcscvwo914yyjkdmpidia9353n0qpy44z1ocszw7bkmikf5vqe6lqfrgxhvvky05duhuwgoni5w7coz1la92y5xigoc48cyi5fuqkg43sihh2qspbw8prb7lrpn3qdmopjef1z6qbnssninjd5rri5q5go7rh7p8oj32se6idvp7gspyioiupow1iwaf2wesngzpebmq5eu4t74k3tj0xdzu9vq8lnh0cr29nyjawbgd9p2noyxo23n2xfb006divkqe46buhpfhn8kvcm2ijqmmehq1wp5wzot0xowg3sl2f8cznu0a5zqdztsdpx3brypbg804sv6bc4h16ejdui962578uvhchtbh8u9w72ad17xbce30fpr9bg9btkkvpgj4qurv7shk68lt5s2jxnoqs1ceq72taz6dtqpydz5nfofdm4arqo65w08g74mopnmtu0hxk1sufiy211phx1y3vmr0hxc77akqf1cb4fw8ug4m0qzxs9b3s7f5295f0s37kle3wgn2cuhwfvs04m34lg9itrlxnr0hn4cabo8ynzfz75qknk0mad4yukf6ev6k2yswkk7ev9eimdjxssnwapjuhrvdipnsbl855cuqelcs1xl5qxgvvbg94skjitlzgczwe9c9hbuv4q6y8n9ttauhoxc66fiwt2zacxcypl01h8swgsm4uwmstosd8xmena3md85851ayvnq12ndcxz3ek8bjlb6wyfwtpl32z8verfh7i3tiktwmk6z5zbwsvr61sk6dzps9nomdad45rledg351s1asqtvqo10h8juo0sfi3v9ww1dqgakyezbnn5ft3mkql2neml48ml2621906l5kfmcst6phmneafuh1vg2960eqhaubm0a25e1hq9a3s7bspomt58jgu1in8aqwpym8jr3mw2pbkq9w9zpf1im64phbw9jt5pl2lwez15vih9z3opeiiyacegrb8lunogzx4r3oh9yj1tzd7f2o892bspzuzcre7nxo3gv0uwheuw1bi6tbk3u961yc8kxsn0yo39u85a2sunff8904ybx9dfud641ntgyq3wfrcuu1jcvnrkh9455wix11dtvqxosjt2p3gdn29xqeeja8phalhihig6magxptoo40ar2qr0sjes1qqt26fgd0acf8lwrbvxa3vgh1b4layybvd28q7gl3oyeqt8oyksbpw7yo94nd40ihisco4a83lpe20u3cr7l9pypb4ai2lr15dbwncgg5f9lln593mqr1ooax0ftxrwmk41sk7inwypfxs44pmprb3syuv3tzhgm0fd7s0jt4jltlnx7fnvg98tc01ls43slu9t8cbccs7uzlnh90plox8o3ub7qjct641nji6fs4glru5xytiq5mdh4ebk8gmhq5856tk2jqyc18zfsyp756ilopzoqtvnxy9f9svvf2q1xaqe0avtd1xvoydpfnwgptkkjjoqwk8vgtlpted13ov1kcaei8ygzgns1iw84tc4jc6x9fx2xu72m8vcfn7lffp33sy9ts1c7ags7etvgafa8yr0cc0a17ibb88p2xcagw5l87c',
                expiredAccessToken: 5490962532,
                expiredRefreshToken: 3087565328,
                isActive: 'true',
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive has to be a boolean value');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'PASSWORD',
                name: 'tunm2c9v7fk35hdfrariggqub2afc7vyrab86gzoz4gjczzovtu6r91rkclyzisncss534mrib3uhexvm2z2k6qg8575ral39sx746t2rx5gydcta8a85xhca007xrpwnrgngyd0seqhlkv4zom2ktnsw67luysfr3zaw05rvidv0wzcujpjpphgt00yvips8evdh9k55p81zhng4wt1xxat7gs2xuwcf8scromcur59cy07jv5wr6877kyex4d',
                secret: '7h273rub7cf0qkknz6igbnoshrphhkigkr8rvpeecwxgir32ye1sikv2x9i6fti4wlwnld61ilwvwxgkn535rjw3f5',
                authUrl: 'zhzfscyej0ut5ytrmv44yt1i6lwkddaq0of1hjom2onemyx20ssvw1d6vm0br35jdtz19gterbcp0x5mvxi34lq801fc2ctjrs1aigcgm0as0aypm2h1dfwin8o6ypky6wshnf3rkf18de8cza0entd38cjtdrsl2z1787p2lkm3wf633cu9kjszwvi0sn5iwh6txxq72qwt86fbkgg72ym30szlemzun3makf1rikxsnayll1gi32rmrrla4cutsj45jfjgnrlxymprtbn2n7wecwyz9c36ui9lqh3c4xvvo1xyl6p38kow20gdkubxpxddnw15f73xsn7y48dzdh9x1yvppv8ol450q5fbgm5w5h8xdcyz790cc6zh6fng7s2mzs999euq4gjqqrcu2j81u5dy1zdsx0j54n47z8ezmgifthe5o28n2xha6oqzhx6ei7kz8770rf3s5xm7ivcihwc41cin3po0uz2sj4diun5x3wjbzug9s1nj1nnbgfge0wzqyfrbnjxeniskq6txo9vp85mo6lkf4x5bgwss5m5aactjy5993mr3rdblnw0jjt9ap2s4nl2buygdgwpyuiim3lf2oo9zbcr1nerd2tc5tnsnu67cvm8rfakg8prsxu4zxrnxzu8unrm623122v11mw5w4my8z63kevxg1s6p4g8kueq1paj7sa4su0nb38zopgrvt8b9otnwjvj439zd7zux6dbmd68bfpkf60qoj9ous5sxbqjj7gb9fqn0b0rb8klnmzvs9jybh014m82cvb679f0ifs50q036el4wmig5j20dxwrwbbqyctkkkr212bh8bfopdbagdqhrf03a0adeuoovtu4adjfrp4z4ihiy78u5q85qin8dcq5j15lycsjj3a9kkgzyqdo4250rqpg3sy5flxaucfzmj6and3rqch5jjwjun0lztgujd5ms0ug4mnsmr8eaecyfslxeg13cuft0482k6tbgd97jnw5ptncuh8venddmwoecstodpkovwgo4d865mpuw32zbayay90gmf6jhw0llj4t25xi2ftfkjyq76e40cbgq2h2z1rvkx7l9xl5hwn8vie71lu9lmiyleg722nxjykp70vl17gtm4rlsgmapn2s0xy7p9dqp1enpdzwtqm36uhvz93ospqjcqlebbcmks711uqtg9wldsrrtf58lfevzyig6fgnc3ltuy28ij04c3ujv21w4r96p8nm11hgpakw5y3twr8kiuy511yc413krop3dcvk9wfmop2etrmq03rmz35l49944j18zuvo4xlbjlwjxrgy3j0znko1t4myo6oreavl927c4h0yrsumk51wtaoah49jm2j2pvcnobrkp697sgoase17i6esdwbb1onm9cedkt0llfpwb9uq54akgy4fc8fhn1yo1x0cyxj27x7i5yoqd8s3c5wphyvd99rnk6b9431u7q4cyw20x8doyyuqwdhppq1xnny1e6xn1j3e0h961hc99qop5miquvtdrb24usytohwoztg9dlwrpinqsw3787t4s195n9hq2sfpvn4iyjwm7ppca42m7m4bb2qhdpfc7548s23782a3mw3zk2w50b6b29yqsqz7oy142ksfu8hql4g7x82giu1rc1v77bvuiu2qshhhki3xv1qaisqrudk1ayqv24lfsaj482m3supfez9ttzv5n5332lgbkjpwp028k4weqp0vpv8jgqwr9q5l9lt9ljpxwtr9f6sea94urayb6bmcr5z4o12alcyppbbwv22wpe2g1f8mx0ba6oggt4eeh573qx2jsrgflpndtinth8zhxzf4e4dyi8rmbtg4vu0akm1st0bjpzft5pur8i3cfq5h679ka39kh77oo0d0igcb27apgl71tfnr1ef27g6fdyqc4ewcvxjvbp2gjhb05l1pzfufzlu32ioxoyhslr1svt9nuq3fqc69a7yglhxryk540r98ke134q3vk4hpvji54jvu5a9pqmtv4gp4q',
                redirect: '13ycggnn0n924d7kalxy9ecaei79hyhjg7a42ukjmz90jjg3vx7op370170egdwpg8zvro3t6cne64mv58qj5rai8tpgo8kre4hirljsv4l2fvavzucp0kco5mpslz46dixx0nvahcshcgo5y2d44gpdsokv9w59li5dediv4svqumu5ctf8l8v9wqq78m9dvqxt7rt6i8p2ctnmruwtdm7yvtdut8xa5hhwpctow6j6zdjgqw6fkk8c74e1q98lelasry8xy94ycy41axwikcxmw1y7dt661tid2l4h4gewzvn9etnpl1v15aq0iwjtyq5abefm30x8fgwep6r8yvqqrerxvyoskguufcal08vzdet1cp8a902kbhwj2jlnhpriogehpnab7god1astud245lyz60fmiv2bqzpehmpqqyt7nnbnhr25ndpqncfc91w9wfk55hc9zt1d8ukncgc5m4bstv0qqoes3rn8rr3i0xcsnc4bjzbpwxb0ttsl8r0z6ijeap3cti13pjo4hipmulw5zcwlvc4dgpqundo29gmouzkqye4ncud7r8aa8zlgevcun35zsg5rkw6gdhgx8s03gv55wkqt335bjeqidpawpiogkjr50b6hg1dr0gpwhjco034h4ekk19fxofcwizz97ax62pqgifdgza2qa614ehhovhpxzikq8uj8v5o2egbrg29iulsw09pomx10a8257nnmm1lwvfwbe28u0gjmf1ig4w8tjysel69pg48huy9ev16mtw0qdgzdclszf5q5bs0qrs4z8l47l3z06erz8jm2m35qyuprh3oy6h14jotekmtlek8gdnuwa6j5gq7r1t37n3g700hm42l7pdduxwa7tcoxe02y2zrzpzhtnuel30sy232g5we40rhb888xytl0adjw9b1il9yy7rc4mr33qglad8enxfrp8n48e50nwdfmcq0jpk0r1x73369u26p803na01pg98nn8bij7dvwccmpw35aj1i386gvherg8vp4j5oc7ogq7bhyllwjyr1g4ig621zi0m6ph0mkn90ctxewh1py9xq0hepild3j8mo6rs6urdbn8v43uli4ah5dt2d1x7p83pfpx4syz66wxwy0bizsb3szb0c8v0x9icnyagp304f5zauiukdla3fe4w9o0ewnoh8aq1wy3nd9jhj3n9f3dlihyaxy47twh18wfvdolgwrcxfv9ciccht6g6yjyv2d1homexfrpkw49w1mpyy57nmxbbbbuz4qff6j576qcm0yam1w76bdrlaxgj82g11412i1ncs6kvkawoqvqmc4g042roma9fmgb33lizfo2u14uh01b8vfnj1h01v25vc78kcpqp7yz2rs2fx0uzke5g5b3vh1gmnfnz22sk89j59f4uimj5zilvlx2jpd27vyjcmtrak7x5hre8d25tt68qwt6h0epsxao6pjke0yaxiaxmij2rg8vyhqxvhb6zviw4zo8jdrxtl9qo4uiijapag2fwwwp7ru7t6remci2wgrgsyy4rvh91srdyu0psge3i365ndkhmtn12ajo3gcygepxn6w2k6xbxd9lbc9eiz9gw4w43vk1rs46j695u6vcl4ceb58ol44vg4gop7bpdp3vglfn1z4dp9wqjb5yyx53qqni2iu9uho5wsh63qrchi8un3o2l0y5qkpe7gubkt4l13s2s6gqzwv7jwrsdnb3e7fr6hfnjat8l19dpq1rh5tggg9kkrv2wjd2zklz5a4ypxc6z4ylbd53vl1buimuqpfwtel5h177valtvoz7bnqfhfi2w4r8oeowv3mww94eej2o61nl00sr6q8y6mdoyoi9qxtjygu7c09infovh0a69mljmay5w0c6y29cz262nbabnq63banje9brnkvdgkujg6plo5g4n5aoskqjal30n6xt5j5ohqgn8zxwayl19hxb1ofwx1cc62w0x5vuokva3xl9pnj4el1v05kbhkawhn4tgiimqj7scigc4dn',
                expiredAccessToken: 4089527680,
                expiredRefreshToken: 4367577912,
                isActive: false,
                isMaster: 'true',
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType has to be a enum option of AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'XXXX',
                name: '5fus0bg2b7i8tthldxu69ynowrucyzi3gscwahljy2oz336ql72nsc74a2sljg363ilj8ybpjllywfasyg06ct62wb19wy9gvkbapxm4lb4l4mxdu7toe1ui42g4z6i5tivfdci8ybfhp2oqfvl0ivy8971701d028r42uheceq8ksndkqyjylly1fvux7fsud83gn6felnano3j1ukjbvsofbpopt82j0z5pjrgrdrgb1sdbe1usxtw8aj8qtm',
                secret: '21yf98rw3fwavl40ipk0vakrv66j11tfr6plenxpbfvemnstvm7b167wr7agrip1tnq0caqgoatzqwkxhlqjyq3eew',
                authUrl: 'ilfyxxvskop6sdinn05u7hbumps1ds1cowi2mxbci139hjfn5d7qwvolutmxqbrsugab8asv5q4xs1ij8uida8e72udwdfc3tthgx42svi1c4egjjfg8b4kq0r6vn2t0tjzswj77axt8zsf8xl9k0xpaeuh7lxxq428z3iiv7thqhxh6wgn74m3bkw6sb0w1tkuwlk4dl4c9mugsvmamgukune1j8obt29kz96c3vw93wc2via4p9w23t80p5b8xytnrdgxu9j2qm5cbxy5b35hzbt532bep83m8sq3d6mdvif72j6xx61muzur8oi0gjcp8adp4riwjaqky89x05fy7v8813petvq979jpiszntfc0joakcxbq18lffu5wkzg8vef043n2i1q2ctq95b3q9r19d7kc7z8y5imbsil3fpf800cofw46tr3u01gm5ptq8gf1pbvb5rm54f0bxawkcib3vzcgeqwq574fxpw4jkwaxd6l9ea346xnrebs56cvcrzk4j36k4rq0uqbdhcdibfs9ycsdd93ii166qldrb4wa2kjuhuyfhw8amee182llke7h3vd7fj4gqcidu3h7iis5m8li0bilp5gpegcpigapkn6ezo91lowlq0wganvpdo62lawq89ircjm66j2fdypzgld5oaf531ipisjuepd207n5qx8dpfjkxnb8myzszeuap9jbxzmmsbbny5wia36y58kx2fgxne7tirikhggwph70ra3b0b9nudu2pv8uvggz4wjxy3riskf9d3ihpslmx4zzlcp6752gph35dob41mdx0z59ybnl9u6f7dsbyfr1w9e8ifpypsxls67zakexw94x25k8xjy7stvb83ubq29x62if7l3u66q58wrqjo0w20ezbf021gzdah7ybxj0l3onw6xdg3w2hp7b992d4rkwc12dfzbahtz7cjaj1usokf2y0mcvr79moj1pmnkc7cfpzm4tqmkpcrtnf45s9gbpevbnhf577fd1e0crcmawvnm1usyw33g1x8xsg2yv5encwk9pi1bmysrlzo42oogcsoxsgbmfo4wqsz89a2jxvx0v1fqpa21wql1ap3qwq54k90zjctmvdxc5zu8qmt4ai5zupz2bbsxkuwcc4o8i4dwp1epf1lfcyxqe9zo6tlwd9tuo2afrmhitvzbbqx1ga7o3wgmur7511azlaa4b3inntetnmiyfxqy5usr294oqd7mpzv1r6vxzchoay3ot57j8th1cch993dz9zszp3nkc5ldleiw1nne87a3fr4y8l4t139vqoz4ayr7b4hk1ctg7yitgt6co1y99d75ooutcnzq5mez1jz3p4hkccqjg3arsmaoaa0fwpiz9vujn7cwctl524hpfgw0sbmya0c8g6alsquxbrcruewbfsyfmsph7kdy6t9h3mszebrssh5gvhfw355z3ch4yzl4ii7matfbf2uj2umax5ac0sreh1fachmo3bpw3ydpcejh3o7v0szn15ryj3cuu0kgg1hv1z8inye0a86ti40rqa7zy33j4erp06ttccsffrmkvazaq5aqwaocvioh01bcwxmuz20mlohsk8ffzmt7ff69fq16hsre8ejvnl2idtsay58tq95xoza2ne7sizynue8kqnp3lrrxbkdfle56k8co4g82ouvz68xc850dvmwt7vkboc9d2ogcrpw2wyn1sjvix96gv4ipunmzz8o8cosucp65ct9tr9du3z2xlehwuoxl3lmnmb7j8h9newupuux9wzoa7l9xzm87qbnerxkkv9etewzf7bqg4qu7t54qc6ca9vic0z5u6a1ssx69wsgye1k3f0d1umkqvqucmtyh662gjgb2oi58ii5mmdh2ftr763dfe9qaefytz6byfknfica0tfk1a22gutr7037gjyntdt55lepgpfz1lkdov6aqrc1ds4lis0ne8ke2h1ie2u217cg6u8rnm6y4fdj642xcnpv8rcrqwxm12609zatag0gcqd0vg',
                redirect: '52c35mi6iblmx76nzhjcd1rbpkc9u8lmiew3uxrl30fxxrf0rxzbklswpyso8wqwhdlknfv4gii7hygm99fnc0twooooozoe2aw62f1miez86m3u8or9pbt7flnrbes6nq6yvrwmigm06u9pfo3tqp07udd4b2g1579g7x1wb7ude4pj5jeccn9cxpzpupkqw6471xe5fbrg1tbilxpt50gz9swvz14b5nm7kopz0ktfrifwz6a8p6vlhxinmexcoqftvk1lpt1mn3qiex6tsoiu4vf8ii2hzxcdv1f47u87xksuu97mng4nhw0pujg43oxutgty62non4u3eabexyjgmj39io3057anpgjq8h43butms487z685us2fgeh43wzif6ku4mlsp5g4m9a1g6pvmno4712sox84wwa48guoh4c651qmsqnc79kko272c3mf7t578toh293nquqmlual8lh2utzjnqncjdirlcucq7w3nop6cbnk9l0jbb2ax50f9wghmgibmc24quqwbhgdk5w5alovx8lu9xyy8rrbzu67nfrthygd17jubhj3n6htl1eecwux02tgczaawasb9afud7xnb863vgwcrpx1njjtzbxn5eova5kubgi76h2kc02ezlt1b0uym9tptkou70v95cznmkdhe35pgxhwl5upll68rxduewpj3qfyls37rzowifjhhjkkt93ysv2foysmr9j6hc980mv18bgyhhj54tb1uaisz92k20ct0pso553bh4le9v2alwkego8upax5iz82978eafk9jjy8ir36xnwccuub4li089rbrn0uxfklpvr3gcdgyw9r0171s91oeluo5twk10rzhy8460fhs0ltf788vfyqjkjac10ohfkalkxsnfaz8whgubshxb8apgoli2siif59kzzq65zlkrxzrohkeec3ead4srtwvj41mayvwk0e5b7ta1ezdst34yp8rccu0uezsrvmkyl34vflswqw1az7ultvslaqbn8i4n9f1tk6m0nbntt84llgakvyfcsv4bgtyxaov1y85214ir6jo33xjov8ntoh3bpaiu6jw1labvwaexuysoazvnfe0wytetwlvktgz1a7k11yhwsad8vvwtuqefnujuyi36wdscke4r4pnyewfdkjs6lzxe6xzfepkxrlw87209sx8onsemb92730wdc9roxd3eg68b4l0y8o9tefo8j6sfwb5013fhx1qjcdx9984xg5b4ct3q0bd05ytwlrwzlxq2eopndad96n8uo2v5p2go8ktmwaa0buxsmkmzp6kcvpgii9ggvu8r5fhjqy8f6r81oz345sbh9baq4lcbptf2yjf7tfyup4kwhh3a8yiemet9y4p12shfubiil0rk3pf360w4o1t5u6jdxgnv3o93pyrfpl8rotnt8pw3ao2arwa0d4mtth956xpnp3ol3syu11dmyy1gopzh52v8vi75jhv38y5u83wteugkf31uynakqovpnjq658s8ve8iqavnmm7pq09dgxparb2kpgk6d3wba2vx1fop8rp8wypx587utoahw4kcvssz7wm39f7hl63kbcqt9u34vz1inz3wahskzc2pciamfg5onlzs8q006k959iyoyoc2ut7s971dgy9tming7ney777kri1suvvmlv7j5imu65moredx5b52jk4xi9tg344381qaxhr4v2o0cjb9sx14zjx5fypi23w3eehgxpl6qhvzw51htqf3hn66p2sx3tlie5960ttzq6p2dev1j9jo8wol87tx09j9besfhv8xrtm0n9z6173nr3wod2d1jp4hb3o4lzgb3fm922kzyks4ihsblirfjoyfiug1wawfgb12zwwhb27o8liyvi6b2q5oc01iwyfkq9lbnp8grnret6bu7dmja2mc6o0kclf175qntkldb51u2nk16nwbxc4qp01cg2gpkq6vrzk4bo7692cm8s42nidq0myve5n1if9yvg46q7rni5jzv1um96',
                expiredAccessToken: 9555233936,
                expiredRefreshToken: 6860464734,
                isActive: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType has to be any of this options: AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD');
            });
    });
    

    

    test(`/REST:POST o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'AUTHORIZATION_CODE',
                name: 'm88oug9zf54sqpleckgcvsir4mluubwu560jkyxhuz1t1cxn8qrkw2brtsi70clh0rgwvz7wepguyohzaievguqp0l88d3kigqjurkvhgbmx9nbwpx9bkwrnpoier3bdb8kny2on35wo9uhxce05mlt6urbo5je9xu3jwksvces9007jrqp8sunwype8usiibw87emr3n8g8ur9ggftnuc6m3mes7vh78vo7upr0o8tmn8qaicswcq5p068yu2c',
                secret: 'o1715uisu77ypqa0fcbmk2otokpby3wu0r5b2xb7qoyrfoxrl0tfaz06wgqd6yov5ek2tfu0nqnnsvmela4pcbihvx',
                authUrl: 'sqn6ibai4p0lt05sj4bgigegf4g4mp9et0hbicykjpr728rm9m8h9jebzfg8pl9fj354effvxniz9e8j4g1l3lumv2g7oygvb2rxh925y8b1u823wkbsxr1toi4j0pxuurphdlkb05jrdpsr88sannhd0j5rl55svys0jxnhsgvrhtqgz9yogltp0vkxg9kmhla4xyv9b2oj8bjtg4xg09194d8hxc0f80zpweajtbyssdy0fvmpl9dxox5saos9aszqv4djrbjrozed7dlmv1kmqnck8mghwkl0b171yci6082sju4hsiwtg7u5mdsogmdwwmfjgdo1cc37mhwlz4mr864ex76orss3acojr00tj4tpc96pssr9fij7vg14aimpspt2ufa6tr85uqx9xgd9szynkkcn2z41qt5vgr29oso3f54x2d45lmf7xee3ptjka0pus80h820e26ebsowcbdc0rc765vp3pte0hydn28la1ccxj0qc8nz76jka9v6847wmgisxemyx66hzqo9cxu92lo5byjubdmb5h7oocjawiju50scufahg9ts1vmy8lufqynb9gw8umj3lc9anooj7w8xg6kk3c8g20ixjeds3dp1qocuk5oketa2fnyhtcnvj84eik056ea950h84h11emhud2bkvwtgiv9xc10a6fkfbchryijf0kbcp63tcf60t6ceol5c68hvjcokgb5kmvf42colh2h5eafm888bn6qh10bawjs91h4empbqz4ascsce278f0vcgvwn6uzouxhrrl720rxv6xr03l6tobkxxp8vo3vqs1ew87nfoouqqpz9kvgr7aqblf4o948gij5ck8iirsz3npfx328mf8ou85mqxpiuc0o03x8sjqjbqxz4rufappggt1al5zi0s4r97z3h4rko67hsz7dk5mit25y0d5lf59mnopnigx4dl686gxi98yocrftk99x6otk5xktg7pvhf64mw34w8zm113q3pey77ficusv5gzb8lgcl5n9ewx2p6z3bl24yz01zvzv3nrknqlqaruoddkhby131ed2qfzykbm2l9sy000a5j16kz06rdye5l20n5yfaet39b48z8xs7e1jv57akx02kpzhli63744krm6wcwojdxu58d175iyhh8f684tzjc017r2mpvg1il7ofpr274ldhd4vfs3eqmv3iszca9e3343jhfxihagu2saqdmu8xqjcihqdaxaa34w307w5din6weatc0czy70zerzw9vi545ntcgfq6bnravi75bw21bf5q99r4uypr93b4vu2o1o8tiglt9fx0o0hlp8tz6eqmfxtuz8p4o04moxrnmzeu756nbnp8jsdqg4ry5veyjmem7qa4koi7h247gg99prbvnew00pv637yfie8s5laywiwkt8bisgmkmogaszhxy5lhayua9purhqvh0spks2owqm045ywzdxodh0880x0z3rpo3rxvaae2s89x86m23kwjjinhi8teoj5fgu4h9jy23n795qn051lbv978u59hwdpe4ilhih7t6my4m251fovgy2aeow0pctx3vi9uknyopsf6d4m9w32x6ua1cunwr9mki8bzsuvlgece1mi6sa74aambpy4qo166zjogyx7og168hhurejlekxpqf9ivc8hhyx61xfijxcc8qf7rw55xq2n7mlz655xmrpowq8zdwhc9i5s1vjqjgwawfgyg6qfvi51qofz0rv8u9ps9zoo0084fvv5vas8q6nhuaij4j2r1oy79jpgirvi3jg1drqdm2hm2w197n62g9n4v5cf1i7c2huh9pc7uk133p5i4ft3nwy9hsj85lf2bxhnk7jozifjviabohbcbpfnb3hjt5fdxpoutmqzfowmk7yvzmj0q7q7bwkawt2jvs1y1fw5xto7gy2vk2wz0r8dg3ksrc97xwhgl5xwlw5tds83gb1odmkcq33jbhvfpqfiqf7jwz9md7zd7k1yh5110b2mq7c9w6hogfp',
                redirect: 'fclkqsfns7fpgk0714tdzmubbda4at222wym8j78u4tbe5qyru8ws82ojjs9si88ti17580lvgeb0p7xyf21t9nm4b0cw3n0kktwmr2mk2j3igv959lsfapf8cdfc6telihi99tw1mjuc8fd2q8zell9pin4mu38t4v9pdgtigra18olq4c843vbm3bz20onmuo93ks3q8ba0zywo24gxva5r75mprykgmvvn1q998hwjh6z4g6ii4i42jmzszfhzpx5c26q7h4baf28b8njfxl9ho8hpkrpkkl3jnvuf7pre6qmw0u0r5173jldi2x8eqkwazni8bwoh9fygjronlcddt3zmkna7dzn2nleeq09h9qjlcvtmgel3yajkgcto120ucpbzkzcmkxu4a2ztjo8maw61fi3yr9l8ep5263z75lbi5hfaf19vbd1ngmsnrwaefer81y0j8ow4xu2jmcx723mrdsq63itxcjlbzqlr3nxqsqkpoql5pfpwx2lxspmqgsgheqz8urws4tl9do7bb5w620fll7vm4xpe207yfvfusfl23mxiyawepqvhhi2o04azc77asp7lsyqwu327bnx4j5nt0k63a85u53308au7ri9y4nsghbb76efhtxlrgctqq1c5bsxcwofpoii649bx85ff53y4wpg43tcxizh1yo2t1wrf7hki8kugkeu2ldrslcb9dpcx9ngl4afu8jp5zqk3rvssv6cl7nylzizzi5rnvk2nr43jhbap2140jby95yy5p5vf9a3uoxcyzw40kjehc9yysff35zai34fbjhlljaf9jltcrwssl6ahxz1hwwf6ddhmuicapjnhuukjomodur6khss0csz11z056m10vvualoweoxmr9vvl3hi0n8k7zvnmdyrr1ysvdsl8jnxf0ublcfvfz01uz36z55i7u33hhomm0tesbt2qgfoisds10twbm853ikw4e2v0jo4kz24wnul0vbu98of059gm7h7va7vrlsr3nb1c4visphga8nmxud0opxpkqbzbphcv3csfl6xwa01g18v8icprsq4ay5wxva6als4l6cpj7dgkpu1c8645yb9v3uo40rgdvcfnfsiv7pmlowvhqv7jq7sz5dk1ei8ceth3hiaa7eja7l5u05ygo3ityuq4dbvpk5rfmyf772kvbihk4npukxgjj5qnzwlxlj59xbv7v7fgg40e4x5jskcaosb9yertoh8p7r7cixuw9ky9bw72egqdfmo83xfe5crtsz3wcxhmv1oa1slhtu9o5ndqoizw0je06cwxqzuqp6xckzk7jc5cpnwbh9nlfbbaz61yau4cxpdf24p08a09v2hmb61mbe6w9tne0lptec7ngtfzscm0svfk082phjh1kczghr2gb2mwfhn8yxu7ijacq7usa1oyzanlak0whtu8w2ze26ii1k294wqslppay5tgyfuuy90ry576wc1cr3dj52zzm6kbmxuyw4xbrz43ya723f2vg5g6j56b59pib8xzw2htnx0vk267uqiv4m349lt61lpdhssb3l556mbftrz6i5a1r07jedrudzpqjgetihphv2nst9dgvdj6j0r2haaqcgswlstm49uo2hdqye977nyxj8ezgkglcdwp25j94f0iagokddhgy53m6moiwta4d90wjysqyjvackdmcb7bpebu3vvmd4l6gomavryjz6s73cg2zlpjca2uq5wdh4soyi8cagosefyxcco5teywvocy0nt93kp2ofp45kyswizd10zygn4wbxagq0kx19f9lzuqr0lbhkp9hmg23moaiiiho3k0w7bh52pqjhht9lxto63fcmacnymuvu9pcgvcs631e9fs6u5tmbn0wswrfgc3qqqfpyb9vzpestnpzdydsujh8029wi56mqi8letkqomrfkuppjxszpptd1ngq4ykae9y9s3bh2r470how72lvpc712hblby4gryv86y9otlnwd7jm99w0xfe0rw60yq8htb3s4i',
                expiredAccessToken: 2490215243,
                expiredRefreshToken: 8391724799,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/clients/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients/paginate')
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

    test(`/REST:GET o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'a366e986-430d-4643-8950-8e76c60a4fb2'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '508b09aa-21fe-45ee-af1d-5508d7110064'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '508b09aa-21fe-45ee-af1d-5508d7110064'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/d3396a80-b42f-45bf-9c64-eef5f79283f7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/508b09aa-21fe-45ee-af1d-5508d7110064')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '508b09aa-21fe-45ee-af1d-5508d7110064'));
    });

    test(`/REST:GET o-auth/clients`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ecf15604-c805-415e-a637-dfad49ed6c4e',
                grantType: 'PASSWORD',
                name: 't9skah4qne6ss52twoj5hjajfurmo6wbjyifxm2nbmd5sug2surc8xsy54e5d1irnohy24eqpisxe36jdas39oft5loz437afg0ab5cyeswqvtrvn8e1g2qpod8i4wpxdplvswd1z1v2355xk598g81mzxyx4bfb5il763xkjz5du8jqg2y8qvcmblpepdqqxu033njdnxmhgb2kpprlz3y51tl2o6fc6tngfh4b2mto9bzd5xatuoxwqb3zdxj',
                secret: '7svx7okjfy9k9ht5g4nq6k4t4e6z9wcncoszyex7yh5qykg9hdtcdqe3jfl2pctdi5gwzps0782plzg15rsw1qlhb8',
                authUrl: 'u2fspf5lrjeedpxw6tf31qavucgtuvssawgzqqi9cv8xj7bnn14kbn2s32x1q191ze9kuz5vvdq1sta99z9idpmqljf1l59uojsi0llltbz2l9jyd3wrgqrqu715e3au6ra9bd6cbgnvccr9h2ldoq0ap3ir1mrss0w1buz6e8jttnhq867nsg0emug45s0z1iqpmjqocd6h5wv91akmsvcnza9fjh58bmtplzucuhm15i6nc0m33ov22zlmfakpaa1aqtrovbb2qba2oi6dvq551co8olpxxbmk13xm63aqlzb2c9agph71uhb7rdaws5jhiwpibqd4lvqks42vyyodt4dgvbo9efk2oeee9bu8ix8b5j3p08iu6ivjt1u4p9vyrs4x6k0s2pu6f36c87damdweaqnbmy85vuk8k2zjy58eerinf3pe4b3hm6b3tr3w9jporkhgaueql6nmquphe5x7ygatdi34uao326wu6u19xcji95jpt455z89ndtp0xrcffsq25mv3lsnbakyn9fqgi5wb0yhv6cqowowa7jqcpjwohiwghnnxvv4ysoix6gnmnpgz7vkea6wda3zarzfvux81f5lxb90d8qga7j711e9wkptkmsftxhj2whjsisinlz2hun6r03x99jcttutj92zkuixypgabhfasiycgr84it12dk72thmct9e55tdk350yvobvirtsjbz6821cqynrx92hj7hspi2or61ocls7cwqlxmxnt13v49qgogrjl8pa1cwm0h2ewgojlg27oyk032w4wqxz1snixruly20nduhj06vej4n5fljx9uifaydmppi7vmx3dozu9j45ycooviddu34bwbpwsk8qjcwovqktebgkith3yyv8r0i686pifl4zvntv1wnsp9h5ubmxjdevo1yw12m9mzwwji6jytssd0735o6hy0m4befmnhkzf1qu2w67lej3nfexym0qlk2t6q887ojq8g23zt1fku798ohgqys29zq9jv8rv1arv8xrfpld0cr9hcvlx8jwaccw1qi4j2uz05eme097la4afqgotkct39eytau0z38pcohzznsydgqaflex3qtcve8mela0vygmo5m2hby8hjp6apgyu3uzilvgv49kffb2kgo90t75biwulm6mkfp74jqje1bcr3ayk7pacch5spyspo0ew5mq5wrdojwwyf0bwo9n3vum7q68mfajdla5zghv9ejles4hk0pjztw66js092fb9htlhghwxqd7cd34svhoo8t6l72es0uhim7p7l36t9zshb7hg5u14pvptg2a3t8ckq24igz5071s6lahapzukea52ir5w5ql50j3rq6ywtap3tu4bne0btok8tlw1sj0frldz486sui1njz56plw8gbisc6gd3k08xc8znsn3i5gm8oybvxhnlfy7zypxmju1u9rvwltnq0mhjjpn9iq4tz1mg0xvhmx2eu5z3b1gtlbo4kdjv8dogv345m52ac0syrf9tydx5ppxm701e4bexvk6gsihg206k8vxmggfy1u17ku67akyzsy5ygdmz4tr0mhta2gltuj17ivkkvbzgq6hby98ze406b1vzusz3i2kjmgj184vecupl5pnxio0xdsqhre1mzutgodbp0ukehznf7oueit4koxp781jwdvo3vuqr4peghkj2g7ix1tfzyoaxvs5excwhybn272qrkhwl4x4jwn4rguegdx9oyskfe7chwlkz1uswr9giwlm8p6d2t5x1qcu8g1h5mgi0puqig5qqaiiuwwhpbu70bcp5jpi95dcbdf759umcabkm932l431ex69fdbcyoccui75yb4uhb3cyo0cckbgiw09hxaw3ze7bu6ujyqd4phc2u4y396pndkme29p5gwjlzkt0m1x2gojpxir4633oopre8ejvdqk3ne2491t7bo15sokbjjqx8xysic69xofaq51q71vxdhmz2ov7rmosm5rrj24ncw94wcyamzs42pjahc3',
                redirect: 'ihmksi454ttolljsplweclc1wrxvh2mz7bj1runw7ivrx5sjryypejad0vtajrd9f8t2hjlmk5wzlksbv0tjgfjudadwl3ik4sthbzwkzzxksrzx2i1u0t8296mq14op1de15titd3xykvftgxu57wfkyu87p4xi98j6xdd2le9g2b4vfwmz26dkx3aqsof1qe6y47ewe43u6ejll9pogfadnzbii6g3xlluxnvgc54q1ru7gwikran9ph8mmvrfq2rqf68vyd59arnzac9sceddaedkcu5byhmlnl338rsdvovufoh0mc4bb21ehxpdnby2r83jedkt2vd8jqvy0nmkua2k7ed3x313odplp8uj596880jzpd2a6cwy7fc8uiuh3awnfutdt4al40bpf9hjkgrrq2c50807mv0c1g06ab7qcnsou7foandhlr7252sewze2wt860gz9i46rrrzx18qf04ryrq7skit6qr8p1i7pfaoqqicmfnqa7te1pdzvhh4394qngvy4wlgzkq42bjoojatsi6tbjhlok4cnmmv2lyp6qj98kug9q5bv6tvd2vzbx77ys02vblu6gi2smmf4a82q8ky5y2idzo69bm4jia9mu3wmfeto4ch00m8teo8wbdrzp5nd5sr7j4kdi03kpvfou84bujlp7llzuzxjkjusg3fr6iild7s19ygohkskh6poq78p1rkcz7upgrnzvbgk3hpm43ifr67jvu4iwj6hwrm8k7ijopngq0h6nz9jp230hn3gawwlem4gufpg7pg5whfey8kzzyosslh1dr92819hp8ykyja58xqctnoxljryzn7vdqoffje9jcrh102ualzaawgdx9znhhlce09lohlvvd2qtjduo94vg34nbgbb7094rrxmtq3m4czeue33xa82pawroa176d8sbsohio84yauzoba6t7xp88feu92854elvx8jmdusmh1z3u9e2ifga7oghn0tzfxalef02i34zimk7atz3ithewheqv2p59ri7s7xqjcjy2ch5ui4qepl2cosu2tu7c7qg8usth3sp2oyr3ine4d8xhl2gasy5u33u7zbs5abof3xshvf4a2ixcbv34rd207myavf2557uwh21rr8r7ei7doyrqkpctw81qgetz7bu6goi6agazj8m0z5ted4u45sigwl0bljud280wfiwq3tvnfkworsrzavaszyqm9lc1haipi8wtqypqsv623fby0q9zmy6alydqon9r8isnxi1zs2covsxdt4exa9fze3j75ghv23afsgd1le9t5mn8d33wbmvdregmly3jebduzwktoj8hewuerhcn3qllz961d7i06kg4vw9jlwxc932arhl97vh6xm8qketjr7kn9ml1eo9oqayuq8dxaanx044jkioq7ucvep8q1nw6ylxqt7zeq63hjsn4vd6ssqj4udh7vnchwcthyfinfuavp5pl1b35jg052xb64zcq27tghpkla1ukdx8xu7n67slxfsbs6ly7fe6nzff3wrq5fjbepn0vdtveuu7z6ajxestbz44jssy1svuckhpzmd8sq01uf8ij8zljb6e2fafxq1xcq5omzg5paea0uvm33c1g67xy4rnnl5tt5k4laitytzapjob0hjgu3og1q83i2qttl2x2z109plg3grrzyiriqud0e68lav6k7fwdpl7xflc47hai3uxj5woah1vb2jbohtlp00pr4vm98bo23iflgaii5s8zp20prjjzsazh4xukhhgpvf9e7v1bdpcqeorhjne373vwdbrhsks2sc0xh79gjsa0lrxs0a6b7sisgq9x8jarh43ezpbxf382jir2hy6mmhqi8ls0bq3lp9v8lsxnr4m8tyerfvnhm143pv4pmjjvsc33kvrwk5jyj2yj1yhj1ovhkf61sqi1pdl4ht879gicrh2ilqfp9s1whvzsgcqzo45ansy348ygv6i881edvhmeu5e8q8jn7ikst6bjkiwhozrjslpun0',
                expiredAccessToken: 7570803315,
                expiredRefreshToken: 1563951164,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                grantType: 'AUTHORIZATION_CODE',
                name: 'ckuutngh9auw01vd5r3fc1lm57g1pm7nio2cad7ceuurdsuav8w2m43jk0ldjhberu91t7bq7gu1c4ldbeojl34678jxdxy3b3ry7ri8authq2cxazvkly426bu1pdyr65j2nd613sqkdbdl315vj6d6xthha1ax0fbwwfluhdty8r5jk791o7wrvrm0xdyeox8tq19zf3z961hef6yc4h18wj9fg3f98g2hua1px2hlb98vh8j5uvjxji540b7',
                secret: '8m91bgyy4a9o66hjaqd36k2ib173v3ejg1ig0f6k6kcykjlsaif1uxieytnur3w3sfbyh2ynjrg9omcfxepmpncvuk',
                authUrl: 'acy4fuay0kl3s306gelkcphe6d21xffspell95hf5mhxmh6hdqlulg4r0rq7sgo4hnkd1tpmi9zf6qr52fsaqckq26o96vryw9lllzv9xb33fikdpblhw2me5a44cmwhr7yl6oskiknyx9tq80wvha25v8fkw95xckkw6ydiartddnp25zyvja2xqzybc55sljx7tgq93u1cx6h8aj45ziqxhc587hqn7inkxm8x1truozmj8mpcdzj68htu7vqzotezp5yztgp65316c5jdlpcfm9mx1klmxq2bqzh5ub3ang3etyrae8cmwvhgkk2wi79r871ta7zov3wg8itcwk9rzhagjtwy9cs3s4b4taraol7a7mha7g3z28sea2kb94h2a0jr1sob7wdyl9zw9m7o3c7ekrssv0it5vy8uizdyc2jpyku1cc26mdjsh2k3dcgryyaq012iqr8rj2jiurynbh782lmzm1sxvpe3afnjue55ec64krwimtcf2lke7igaxozw17kd86tsdozfxzw7l3goh6llpl58nzfh9nk8vnfc9f18nwaqz6fg204n71acojdw8lz081gc45i2s99f0z5uwb68kbaftogr5lh7oxi1rh3rjkngv5e1a8a5xb9hwkxht1qqmhinwuepq41lbcnso30ewu8zie2haddfbs5tboc3cf03q75pbcx464yooiq2a2spm7fpl8badgk8dwyutp82s58d0za09agib1lk7dos5q18xms9f3npzueeojbplj2bu5vybhvus1iry96p0vlupjp9nf6xubzv1p7u2oyu8z7oveea8xrml24e2lgfarpidssnqcss28r694ykkiivecyza0vodpe998g20jgegzdpuvbq0mcrbrcovoycz73tjcg4oj2en59zl3dt7stmyay14oithhrxr49reerbc3e7zclvm3pgzc3xniqohb4a6tdonokxt6xvjofd2rbcdf6ly99eyy33gscx0d50rfeptoa78ii64kbrt337mklzpf1m00l06rdsp09tq1nflgi6unfzxmjmpisr6wq6jwasrvx3zadpq8hpkeu6f6c920twla4cubbgblzc7h4fb0zmilurm77y1gl1sz38acrtd1nayan6ybigtc4guiacpo8z6dubgq5q9wnr0rt0ud28krg55zxqovxmql45aogoe8ar5i2geukz9db3fxlwg5tvmnsp4oq8y95hkw1kd6kixudnff8q2fuj56s2ph0p1rrslee7y01v4aqb83d8mvtm8oi60wguyuts3bvu6np5f7sa6md370kfbjyznomawxq12g7fkj46bg5ommy0pqv36ggrfxdam64s4fh6opwqkggxrsrmtpq4i6x083tt9fy8b745ym36mov0o929pz44ekh04l57kjueltg72cy97x39j9wfmumdq0cw71gphkka7oh1ddtdi0wb4itimbda4tpwfqvk48pmqib1c5bv6yrl9yf9wpu3izoba7h4e621ni7tfd4dtem0aqxzveyk14o3dogn5p9i98t0h864gh8mq18suaw88czibqx5qa8u995ltd3tcrhzf0yw7sj0vs3gbeigcquzkf1e8tl21gnk4370wg0ujwe297ptuzhtm63ietya61s8o57byke98zwsfjdiuavfgavd01dngll1jk95x86vuyct5gsgabr8ciyc9twjuz7bccaer5bpf59uvk4fbonal7912sgjhhlzblx1c261mxji7b0vlszhwsfzfjxdp78jp1nvo0rfckgedanm5ezhgyf1cpt2t92jdwo8qz7m3r2sf1chzzd4w4q1stu7p2dym1x01zcfzrjfz7im7g5ii0li6pgil2ed84nte7wq0tyn34kmxca87vd6no5f94ge38qlj2q23vt8eqrcb2pg7dbf1d0h7r2ution3begsqv3nrhkbrl562ddwphp05951drrmcv37e0v2cf5lyxq7cyzahhduc827dc4miodfemj9k168iap7c9',
                redirect: 'xnruh9aes84twj6xaa905e3g5ne0s6ziegovtunzn5ajdwz81pbljc2p7mhmlj66aezh1nsq4ajbzsuw21iy9kc0bvs1rc5znknwhhlpncy40bss4uoeus3d7yb3gplsa6hlbwies64nt80ptjrxr1vzi5nc06r5h18i77pwxx562diqfhx3w3p0ut4fegg9323zrjxkcnj0izb6o23o8n7zcrri2duuz6x8gz20911w27yyomqohxolt0vey8x2tcxsew5k9vnzm738mwnszo60dplsyef1ys8s7gw6nzo77a1y0rj8q4zjk28pm3ajbfn9zr2t8ymnc1keq9r7f63bj3j1cx6zjp08a7l2e5c65biscrc7h2lamlhz8w838jgxrc9qlvl6dlvgoa5spcvny5r72bpuo3ys9hxrozs58bcqs5j2ijmhod3rk5e9wa2xyey584pfxlh68rxu1fj0hz3882el1tnmh7y0hkp56qfftc0j0tv3ewq4pn0wu1sn6198vdhcvk6ydb7ppj1tfjrf3g702wz7jxjt2du6coxrwt25bbot63me9qoka1ub2udo4gtd0oypzyl52rkxo3smwz79drz2lui28gff3dcgorfaxco9doep2fb233hrsnzjh2lzfuuk9m7g6806kdys9owqlnxv9zbmd8c6x9hs44ussxxl3gmu7w2qtdrav3uvn2yuf3ygplids0pflftfj45ie03m32d5nwttebm7ybikdmkhtedc3qqye9r6do5m9v7ji15atelwq554efa0hxu50o8e70m1ep0vshd7njj4ordicbfisthxvs48vm7kc4mxqf1vmiufrwpzkdh1nd9t5mvdxyx0qrkx1i2i35okto0otkjxr9z22dsmzmi7ohwmvaqbpulhwjec9erdxb3ym2j2mz1z6lsjm9atemgu5xo8ifv2lir28fz67r2jbfti9lg9sv50oqz5oj854hlvvijimqcyudeu2y1ypu4nqk0m8jcbl9qk3dwfcmydwokkwh9lur3au8g45qfbl9tjytvkoo9i6i0p10q4147jyv1q9k3yjkhl997x7d3jd6x421z47q65f7dxrme27cr30tkpe6uknryf8p5jybrw97n7p9krgswo0q4qb6gcgepu6evo5to5pa69tztzjbnsv0s9la4e477ef1wj862xr7qulxo938e9r9b38nq31lfn3znuq55hv0dwshzlufv17txsuqby4fi90b3x9lei3orfigt1yjca1asnuhfr1bftk81hazj3fdvf7c9emeshun58t7mffzb67vkrqfdhu9eyyjxgj0kxgspuetkxxweke4ydddkhk1lhixul17ti70vfu115v83rwi58zcv1ilm2s7z94nl1bzo4pgihun3woc4x47holpphxo4zwm51gkic7s447ih6o0wvpf481i6sfdes5ntqdfco7nlmcmdizf0bj2o6daxiirehpzfclrfv6ue2ji4pulcd76bg19ffox4wbsu0j7mnpa5jba0ddx5l1lcg0v9wmt4ajdrdl607ot57geita4yzv1rb2c830hs09aygefzljppv1jen01zy0hcm2bpw41la3wismu1epftjlqy94kn1fftta32n2mh69cqa38xlg8thbs42j1bf3r4se99gwsmt5ervz9ral7epdl9jf1nawhot9iqimo3apcwkclqphkjmkf2jut1sepqbs6o6plj2xcev7tg2wvh4rod8zw26dofjy6jhqyuqg33xdeulc3734m3unjlwwlvakh29rbpd3p0uzb7wfjhnp4ffalkdnfqmf9y1v6t53q341oznnlg1i5xu75dt9zg1bmywsdoyhhfqw7m03io6fhzia83iycnol904qxrpkbcxqs6q628el2152m5i6rw72qk6w7xcbty7vbwpstnu7m8hgz4wdjafc2506posue2yq9hl8y7jznfbw3wsgnzzkm86sijm75mgcnrukd97hke61eev5qfpron0jglj7abk',
                expiredAccessToken: 8221388604,
                expiredRefreshToken: 4415309535,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '508b09aa-21fe-45ee-af1d-5508d7110064'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/92bcc874-2f9c-4919-b90c-0d26a056b8ac')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/508b09aa-21fe-45ee-af1d-5508d7110064')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateClient - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
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

    test(`/GraphQL oAuthCreateClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'f4dfb573-aa93-4d9e-b2de-4e30b4ec9e42',
                        grantType: 'AUTHORIZATION_CODE',
                        name: 'hkjknshuhtaggy8zo2zqzzc3u56re7gyrh16qh2qlfmkpdllm6kywpgp6ely8u31l5igo1ey0c5h3mofzgpde14vwi5mfdltlcmr70vcym3q46ag6ltkvamb5a590xfqvbzevjrtia0ve25mwomjx1il54q8be2d0lvd8rpaog7t9krum0dikjk453xaejcsl4ke0swlb02e07wp8njryd8i2uunqvd4ymmoo7969aqtzm9j8g1ehvlteoyzjvv',
                        secret: '8aumyaellgnbqpyv922u9ao8nymyicyjwdfpvv1w8ah4vitao4i9x47okl6fwvpruupv34gr5namkem0au8yh5gyqd',
                        authUrl: 'p7f59fh9e7e8245dotgsffpr6v6gu6x9cju6n3dzr5ctuvbf3nxz3hbflhfb1yotjl7x7i3poz5c263knliqvubthvqzmwlltoocoymuadpq7kyy2ttczofjg83dtduvgiche036fvg7te9ucqgegamhryotc79odxrq850il13j85hzpucb424l5opa6zv3x9fkdx04cumaait2ogzx424sjypwj5hrgo9hqk26sj155ujd9ek8tbrissutu4m74v20j0ojsq8rxr93kvl6wvc6ggp878do23ikgg6lx6hhg55k7943vdm97bpzrzfn6hzdb79esgirtg8x1zb9x6fqwlkwj3er979fe2gyj2jp9tsrjde83avhz9lmd9cq9d98u2qd26lm8wra8ynhk07du6ps9px0mlwwd9n2omxh91n6ln516yg9vqrc6hk8eozpgq0kuoftqr7isfmju9njk22hyagqnl6xtxd69yfmpb0gd6lg0arak299khktmmqtzt6ralnda66p0obccmtslj09t71cdewgzvrsazsvyemk974mavw1p2sdsqk93gwfgdom2mjyut454xjcl9otjq4h9db82n8eysicj5qtg7i6fsq9zwuz1qkni7de3bowuf8tgd9fvow6uecolnil3nh5rqjavqm1hrw2y0xu3yr2fjtiucvrehhkpb180qsgs5lvywcahes1in9e0n6rw0rqvbypyjjt56ylq9hvnr9at7dfx0j5j1d05r07dmagotezqihxf9ekb30ol5sw3mcpb311mxumw9bknkfmz8oa8roy86v3fqcjxnktttyn4nl1nxx2lc7aum1ljlc6c394dsoqlv1q2u0j8tvyb81ewftafqnejyoe1g61td2cpb0jyqj2rxvpxw3q5vdo73hf7j694qlow4ksi8tyrbgcleixahhb2aqj187jxf7oiarvdoru656c4na18pdvenzk4bao81ogeuivh9mkuhwg5h2exkg0jw0r89uwb01pv7k6nt2ywwlblbzp1dtpyrd57hbd072n8fdr8gfbl5rr7ktcb4pvn2lju5j4nkp998fgjs092dcv6fnf4qif7gcxof9u5rkt5widvoo7gih3a9s8xirved0g2m7jv1fsljps74qm1nk222mj8xlmsju63lj45bk5u8xn3hdhmefzfwb1kswrwi893p40abpd70fr8qn5ovh6oasocqsktyfjf4i96woeoxww174eobcudgxgm4r6ylc9e0ieyv2yi5kaw4fskpet1ap752qcyo6b5ymmvmbk5584rar5ekqdgdtx9kjmsnv98hpgp5f04fa3t0xx12psbuw4r7uekr4774ye0c4lo4fwg7sdtgponor2juowiihnct5405jpyjv5pec2zbc5hxkvhp24b9ltblu0m9tabtb1x94mxp9w733kudrqa20dvdoxlvq3u64r2x3qjsarfwcty1ljxcmtz2ubyx3b6pjko24xd64kjndzvq0oh9rx9fy9b1mh7nz0zjmrgd97smnjcopgmrdxcbiatwuyzi45sgyq4nubgjqw595spn77aufyj2rf23eai2ze8t48ftf33sazirsjuswaqpfhckyewj22hmsuyavv6hgq7isc8v47vyvxkgqth7smak9kpqshrkfmykzfaj0xmloktc0vhuobhwvc2sceda4vq3435dq6mqxgu1hmxj1ag0s10ps8nqhe3o63mlatq05vyhp0agaa32z36ez2xs967yj9ne4hafojby5ieicmkjon6x2bo2h4kyvstf7067km7y6upxzkbr7lmtnjfh0if2cdu57b6iewoiu7jm8vlvdkxe8tltvb7zv2f1dt5j2lxv059901b88xdaimslr1sx7hdllux05tvizc4bzfzm41ryywm39qae77u7emq2bvlphk043kqhew3dj9g45xcxn63kelmif2d86gekegf3nrxsv5l8qmncgs4z1wxrg50i813dj8624j0qbrgxzp65seegyq',
                        redirect: 'd490ejhfs6s6zvxrh9a1elpz6cz3xnp9fwuqr9u2y7kq2ag02461k8rjpi5vnzvnver97ajqan4n3yhcctq9tpl7vw3qt7dlrh72oz1bq0zdi8wrawfiupvk0w0q035eq95i7ljo2apiw44pnfybipcvaxp9r0h5mc4va19mbso0qnx7dgvgms9w47zi5erusdlc57dich512tcyolv167m8oij3o8i95r4fgzz2rhtogson9bqrl5xceps2hks5r9kztbhdmajdgk2oh7xd2rrb7swzepluo5n14vmkbiv3qqlh8q34kme3qw172b2nhrsz07nmawc4q13e6bdg44q6xtzclnsqdki4pj8ve5lr1q3ufh5y24362aykz8l5cabprllppxqzwxpne4p5fvlg9pbtnot19fndq5lux3l3vu4j6jyi5uoky3jcg73plp1a49lvfrwgqtppg3tsk80qy5dxto6x1npltjuqpecsqs25j4pat26twv9lfgoexnlvfcuvtintwzrms1afv0hf4x5asns2lnvftv3qv06wgnijhl8475oeutl9jenqfge5vha7efrh4ybu9e5uptvey1yd1iphr5bn224fq63eb4k63tepxiszf417byddi907dnhhwsgdtlnbognsnkzxgsqhtmn8okr0ps84bwvkedj0713gll28wgquuy1x6advls090vvow3tg2q5ransy4zbo2ahogbpce8fefe2zv3bxj13s6ctqg2tyhynf98tzyvdcps94tbomdkuqirytz0mwdp0vvxwhe06bufozzcl5w6jv1e7hxjv2m6p5hjf764ah1z892a39gg1j64muclnu5ckiiefqwtbrwmwsmqkg04xdiz837qjvg02hdznbyjbmf6zsuxmqcley3kuo31scr3mftlb1v9ybii5yj6ywgubtzxp6xjsnduyv1ymb0tr8umz53d0r49s1ep1yz02tr24krmma3zalkjmepyi0rccbgimxxd46d8acr5nr76z56b5d2capy05hwlcmlkpeau890wn9r4xaettg4j3oupgascu58kcn8juq5okwcnypuotfi8w884fb5sya9n2nsnbvfnse5103niotpoq8b8lp9m2tnmgzum27ruj6exwsldxmq6hfeteuj9a6o2ayivvlqapf0oh3sqmck36c1v502ctyg7uv1iuz8m1dgfk433ir6s6bmbrd5wdulkmvv75iznlla3acknquz2w3240c00wx0v8qsr33izenagx4n7ty4c9fqofn6xcl9sxt6hk7a1w656eym8d2sgp6ty4qiyjzkrlhz2mfdj65nixw1nrznqkz841vyvxfkmzixtgncqpleps8x4yst88fs1ohe08yd7pf7abz7jbk32a8y5nqbnoy3ce6frj0ranwhgvdvcc9tg9lwg2tq99gr0z4q6cr5s5t8yyvfu84cjo49e4gd4wpolgrylz0cpvxtaodhzkdttxm0gk91z12ddeyepxu08fl09qppfvphcjxmvcsvqkd6q4h8moqri2q6vufv4r6kgpgtlx460h4pdt2x4qu2zawf1qqwelefe8u0c2gn3qict85wzyupi0ugix6h9pav5geugtfyds99u1d3htowl5fl7oetz7ucr9tyhnpx97u1mgwzcgnswhly2zb64u0zja5fj1po9kdiob0oamgn5vggrzn0ylm9xo6bep1tarjy0wl3rsdn94w6m4ttr7p9vrppn701gpzh1ne3cz0eac6oxembi4hstaq13qv9dyan4tyong0z4houxed9rjmnkckg8qm457zwlxdbo1diroakti5mayheqi1ybdt2sughfonh51u9b7ukpdn65wey2zkxiaerlp667pxknpbagi03h4lseaj3f81mjoetituxcrkcfw55kut9c8z1ooeuewjshvbruajd5ri81y2m05m2ieri9j5m5cbyo1vzhq8rxydzzqejfjk6ah67hehn3rmddvtk4uuah2ehemebe81jcvu',
                        expiredAccessToken: 2561567670,
                        expiredRefreshToken: 2950432939,
                        isActive: true,
                        isMaster: false,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', 'f4dfb573-aa93-4d9e-b2de-4e30b4ec9e42');
            });
    });

    test(`/GraphQL oAuthPaginateClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateClients (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateClients.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
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
                            id: '4176ea23-b840-4865-bb7f-6c4febb7c407'
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

    test(`/GraphQL oAuthFindClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
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
                            id: '508b09aa-21fe-45ee-af1d-5508d7110064'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('508b09aa-21fe-45ee-af1d-5508d7110064');
            });
    });

    test(`/GraphQL oAuthFindClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd7ee834b-aa4d-4f61-bda0-fa535af15477'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindClientById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '508b09aa-21fe-45ee-af1d-5508d7110064'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('508b09aa-21fe-45ee-af1d-5508d7110064');
            });
    });

    test(`/GraphQL oAuthGetClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetClients (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
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
                for (const [index, value] of res.body.data.oAuthGetClients.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'add8697f-0bb5-4e57-b26b-107f99b5560d',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'fvqqpequphrxhdij2c5yolepiv0ula5qrhtlrn0pg6h2lfcv068xpi2z9752an4e02h5rbvkkozkw8zjkq0ravyf907gvpid51q8npm1br87oczq0dezpqqz2lf2hctcnlkja6oqcw84r8p2wgoy7n64kpkqp608qtxho4fltva6s6qqk5ruo03ugy82kf9a5smfg9aoosfa7tm30eyaq9tukkcshodq53bn96jen2dbclcrvaiuohjgpt82k2s',
                        secret: 'qqscxu9b56l8mtdvmv69rdy804y2f05zsnvucdp5831r0onnu3k4gdc0j6or2evyqiotjft34gl9i9q26bfbkndxbn',
                        authUrl: '6livesbz8brre93nbuj8dilud9hqq8lbipt3tz9z4radt20xf6vc1kp2azfc8ou886en39tbrx5td39f1acc9aox48qd9271v9fmujcij40e7a3r50cvwalu6aq82zx4i22v82ytcb9jl4zoowsdmvn4ptl0tzar38wlyqmyevri0he75eukpe85m113kptr1nj3glioqbb6kalodtgu8aedd5d4o8h80f5janm3j08genhhke9i53ozyk91qd9vwm6bbwao5gyujcm7ttxkzzzs1t944hni5ryicllloyfygw75sycb23qi61tb2vax68ah6egxhsmwaagoegaoguqy0revnugc7jfhxny9zrnggou2kbbd3lvk8owgo92unu2l8n1jatjq9n5u8bitegtqus1e1tm0zh9uvklgrkzrakc46grvdg9fyscsa2tbmangu9cosc05zdfew3nodttokviefjdvsrgyskka5w1aw4mn3oz67a4l3dg7y78mnzquhaeb8ccdni85i8ocfyoyrl4a0o8ah000ydw75vz4p4uaetirxekpepdi8zeb2x1jkez1njkt9g4cx0vh3c2nttcbkm1oo3hazqhhqyfwfw56cywx61j7mivdn0zk6xmdzw6axxlbad0yb5zhv9a8ztq09d7uk43e9j8v6mwk242qclh552fnar7pf8583ikqbdogixxzfzvmzlreiipwxapvfovl3zk63iu8zsciinakcddg5eqnp3tbk7ceuin4g589ltjlmxhl9l33aa5kxv6zqmh36gcw7xjhocb3lexnauoxk38o6nc2syy3fm19r2tpz3838u1j0smchi1crwyvtuypmmrcpw2e7hlkdg95furv04ss58n1xvf54mbfuro08fonncnp9d6dz8l92b2pogsvqqix2splkngtw7fl8xnt8kuu2x2iuaaeok7luto6el140nw1cdk6r7d2xj2fkql73dhlugyrlbsjg71dqvh3uabniccbgwk9ujmd7jzl2tj285lfs72a5ochpbxwyzxnrg0j86rluvsckttgo3r4dtgos7gbpzxvuir8op54gkll60r25ezp4mptqc9d498tue3ujzpauijktirqtin474b0em8dboj53bfpvr0r8z2f2g1amjsmytbh181uzpnuvj0hw8asna8wrn1nfwmu8snr0yoefe7kpd6szibfyjwgnfb63ifki1e5nocv14v18wy5am8hxxf1ypqmcruo2sdxszft344zv6kjgrcjdnv2j02ndfpcmcesomls69jry8qv2x1cor197nsl2vcy7ioj0s6tynvg5z0f7jp62tbwkwjqowj3ihtkb4jjx1b7wzpbddez7rc0yr04q0q5c9u3c817uvg25dnox00x62ihhupcdb0pxjnj9018clp4pb0fm5xu3jexn6kqj1syvxuy1ihpn91fz0e725ietewlxh1wfvp3693n3nqfrwwo4yxq5ocdn86j0alfop0xcxz8pxkj3uok30jhj72jou7tk1gpnpvnv2e57j5mw5vqmianc37b53uquxxa8ahexa23lonk89x0s7egfoe3cmrixf14ko6obwah0rsvujnfy6nppvkl4mgxfq6cc4gu317fsreoqmtp9vqgf5wjndd3skgzxc9x0tell4af8dkevgj4toyeaistys1fkz1ojafyt13klsgq3pke4lvmvdu6kvxq5uxw7jywdgjkdibhotzwh876kby2t3djj31bf8d7oa2d0ddzqzels76z3wo8pfy187e7od9o3zf6g3myx49wzmiw4szih9ti93lueg8uvnve82fwq21a81d7c1ojq84wbqflk1qywug90gayy6d249z9a5mfcp4o007w8vxnq1n12cieae3ntd9u82uoly5nbte3dwa6mopgqsaun9d48mulxaoes11w3znwcj4230rl0as2si1ks9d01is5xldeumgfq7f36sj6yrie9mb6gbhl1ce4l3wruni85no4cgb08cyw',
                        redirect: '9r27vhlw7t35nd4tflb7pxuekz9i13540m3mrow432z9ii5lnuwtscy22o4zye3enf2uxw6piauif7ttg298jdx37bjug6jerj07v54j775wm2w2rmuait9iespmlc8kw4jhm5jp3vgal68x1bpamtclrux3c5x8ng9m8fe3ocmlny656r0zd45lfigycjwnmtvgyug72260l58m09d4v7hm66houuh3zhx1ovmcsds0nznikaxgq3pojhwvnsqbvea1k1wn89qmv4y3qyhog2dc3nlnn103hab32cqwajzx3pvd23fi1r2vah43pl8k2qfjmksyiyixcckhifkvdg41sna46awi965qv4d3svt7eqseuzdq5wz2uj5qrynyvpzbxag9s5rln3qnjkp68diteaeesak4e3ge5n7p8tgk0075hpeyeckegocn5y746an5ikoxn7ewbafvovniod90hq8zqq03f0w98byx4xn6p7603qeaylfcbb2e512cakv42u8f6o9iqygnmculkppw911co7sa6j8oyc4tlh62fcwocg3lur8nm7fdke5tyi3c02afb1n1ul91qcv3ot5u7clgwfy60dpq0qgm1vdvtaanxg0fv1e8qi5dysbm38ulb93r1psbabnqldcks6q41xzgy1hcmqtphqh4ul382quoie0ewyo0lgitubi09wbn9mex6qkodqkvbmolmw6jf1qsbxq2iz4swyeobpilmz2c3cgcusb2axyi388pumkebpyim9nvfffri2fqfjfwpk6mlkh3ig5r5xqg969tta96e3me642psx9pdlpfdboup6rohhtqjr04d134t570voslfvjr3weig8jgtj4zkldpeyuqm7hza9z7ydd351s661vhhbrmd335plgacgnylk8c7m8xcv4vqf1p175au3o666gachjowr3xd5u0s2rl30tudv8bmmaobf6sljv4hxpbvjvdc2us80fi9f5zq3qixp0lduy8o8egafwjnyxwu6p6cmc3mlojxj0v766k8dxmvu9theziy7qkksx2v5f1eyevwpj33kys9zbp3tcrehyhosvef1f0pxmzrjgs9v6zum38b00922sdikvi75j0e36q0p93c6ai4nhohkg03yw3t4da8f34owyt8mcvcv17vwfies28vvoe7l9k2n7xinykqi3l38dkhttcofrhcyzd2mwz14pp5pm796ivgin8co8ckxzkpr2lz6osm7e6mssfs5h4dsgucl926bqkc93vm3o6viy6yosvfk4zhqwltzhjn6l533pol1ko0f6oqjw0ultq4f19zxyhgy8rn7ztsloje04n313jf08pauls60nget3njlm92y47fooqgrtxekmvmzut48zn8gucmm3ahx04lxnuyb8nznzi8cjvnw7ufoms7nj4218mcj7g1vqyaggjfqpp50bji8u2qkd587ukb1vxeixt8exwovahb9lu2dh9ofhvmbl3xqqdncn34dasjz8mhjhjck2pnoh1w2hhqjx3ctetvkyl3jihqgmatrze69etphqxzt8tqfrn6l5ne1esuiiipiz2mm28lnlifh7cxhk8cpt4hrpx5dd81ibi932kzneajat5w1rwhq5a81qeqn7ahsascqw2fr2b2of8ihadupemqzxfebpjvo21mj5lu55lq5a38lt189599i8fy4prx1lmdf6q57skxnrnch74y6iur358p9oddv060aq7wjjhcfo9pgr3nux72yqgxpegga2rxhvatma34ek8ga026b9pqvd3dds93m5w17dv0cmx95rzcevipwa5st1k86fyc9589v2ikyxjter94dpwwlemtp9csc8t7e490wf5teunc41rgsy2tfgqrylk2c3utim27r4q1cdrrzci99kv5z250lj35fhxavm42l7qzp4zawkhqfr9fhxpzjm9cm5me7fpk38bx4lgpqmg3k1hlyhh8brflejxaxeu4pkbhrtsso6hc6f8589n8hjszw6u',
                        expiredAccessToken: 9074032044,
                        expiredRefreshToken: 9151758399,
                        isActive: true,
                        isMaster: true,
                        applicationIds: [],
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

    test(`/GraphQL oAuthUpdateClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '508b09aa-21fe-45ee-af1d-5508d7110064',
                        grantType: 'AUTHORIZATION_CODE',
                        name: 'um5txnxbbo6okr2bhpyk1popl9s4o6go3xcs2442a5ltyyy9ms39o00ty7b6kpi1g2rkdwoxtqqhsjtb62xfgc2s78snu6k1xvvn01js42qvbehv8xzu4z87081ur2wwom8aeom3tfpiwnerzsh6tm3en82t97qjczx8gim72em4zzyom73u695wb4frvgn9htl4psddkli3p6upqw87h12d26ajzxj5b18h24mn7nlsccunrnigsp9agz3se1t',
                        secret: 'ce29j886eq3bm4b7yz9zihy6tfy9e7rgslonnp0aup9u87834ufhwtoxhqcfna486ueq7pdfr4l5aisd46zm4bmm9k',
                        authUrl: '0f9e42cflatkn8oy49on9ayg70fggxlxje764nqpe96w60li95trjbko6374mr9kfi6cl4wurxre13c4hqrxftt5r8zqrikax2m6bz5xql5mkx86jj153plewaw9u2i5im3t1zcghbs0h5q1j8run44179k5aq16kjrbvs19ak6di8k8ur0gx7w3yws1j4c233ngk1ggmn4wf6txzsbtcng833s3hxgulup6r3q78pdbx633qixhx50n0c3qiyhh74rb3mxeqiirn97twtdh5vh1u24d9wq95xhrkng1l62518d0fwd6dhpbffd0nmg60pqxkjltvz1e7tnywg13gji1m402yw8njd0gq09p3lbmzbf5jgroet1gv1z4d9446v01bwzk1fqtxsh7dp0j41x3fwzb6cr4dmxkboxio39q5ew9i3jingv8lon77fw2orqbq26fbjn9mpteuqirf8anay20rd2waz0rn8jf0w0nvgpa7883qzmp5jyobqc6cmaek4ecjco328n409rmcj776ccsgdnct7tmr485080owqrhusgwhoyery4tm02bfr63wb827l658qihh8hj8f8ohzqdf29ysapo24t0gh1roj369ctarrwyk6cwcsikrz3rdlewsmb5ri429c1x2ulw7thap6g2upyxkjb5cor6p8sa16j4ischty0ux2ru7me4665j8qu9gdy8xilahuib7s8swpsbwrpkpllnaopnmzsclzt11x5ugclhaoes538uamsnz0v717716w9gdy320wpb919s3tow2zwga4kwqdndi8uryfk7a9j8xwh0eeaard9qhbfqg52fbbjcsovoqf9bh8blb5ykkbjzu1dbuulvaybpi0hqqjqcjwmj2lh0dqmg5sqhlsy1bqiv3u9c5r94nydioffr2r1q67qdnqk71a8doq14jbmhikrimpg2spyzkwboiisa0skr6yuett59l23rjl54aqoyr5xex5knsfes9kdh1t7q593vog2t7al4y081dpoxho6j2wdvdc729zptgqz1ven5b3rloi3fa5ya0d3f49ayk56wm8kswluk5tyle0tjhi4mrd6xn3tczwf2j8fih8x9r2v6nqxawphpz7dzurwet5kvnj0fl0z6hvwzd9epqo6tpn9uorp4lc26acp2zylomd9p2dpwic9opykukdiuo4yxb61r39eh8kmp2hsyl2psz8fn4wt69u2avilwqpur9sj3kkqhp9qyro18qva6atgxmimdt3xeafjzbco91qko751f58vqvono3amzg8xe9ocg1e0tdpn0bjontfebpn5t8l7589rchjjldfrfjx3limb9k9b0yphven417crkktmgeel5l4occ353j3fg2agr5o8610nkhyl0xrbwczqbilij2x4b5ginxzvsacgg04v8sz8b5joflsuqi2gocj3l20gbit6hyvsdb5fkhl1o43djfzzaqdgw4rgv4ohi90d2s07pshxiohvjo8629vv51araztdobez66oc6ygclapjrf5630gjqfs6kdrcqup03gq42n4uo5hj8yv7oilf7fr2hkl5klll0vk4oeizw83o9ms6jwol9p1jq6zvb6tsi9nalvxxqg0mxiofp3rkmm0jje6i12dukjm03c1xbjqjuuzsbha2tybqh3knabnedo8t40730tt2i1crd8tr5ptg2ybuhxcgrm0t892blungo4kv4zidwcmijx9vlbnnfbmxkti6b9fo273tvpgh6toy190etzmtpemsus2kx58bzk2co7vit35gpwyn0uvqzsvhn51vasso0jmwuvg08e0r4uoamhvegfnivj08cp9zindu2af5ykwmhvlg003p37bv5nrrhq3mgyarxbbpy9x668wyaxgt8x23k2zvi9z8vfu25ivdvhnvurblk7ze3yomdjezkbp90ohildyf6p6ph3olh8f9c4i58ibnrs1nb45s9z9f8c9gf819evb4oajcj73ozsih9a5r05ql3',
                        redirect: 'jfukt231mcl1v3j8adgbfkp13f7bw4zfrn3hyxvuytlxrqi925zwmjmgexxdcrgp30wqbyh0hdk6lqo551lkkysumdqq13gldmu5fo13fsd3ep6qd9jp2c9jb0huwwyzm0i7dox5lh4pytohf5be8hyicyancsijshknliyqvf7a0dr6tt4au82ft5ifb583sihd8zur04bizv2l4zxqhi06by4shdd019pjkd3ogzphha1n0n24xxqv31capk0rn9jrka0sl19og2cxt93eoow9joecbfu3b5pwe2djlv0uso8gxlirx02j7o2dng9kmz76e5x1btik5937w8rhj7uqt1x4gqwsojo3tcuka3f5mexcznesgtnnmoccqo4xkrvttedp14fthf9tj2cmgnry24s1kx3pghq7im2zhvggu1mcugwdmw88js51fawhtuqfpbty0db0atrqtn4oweizhz99ue9bkl81x4apqpafcrn9620nn30vbi2563w0npjqpww59yhplroul1cc9rlg6wi73zcduc8fr4w4c49izyc07xvzsqea15czobk6ol9zgg4vkdyn4sfkrdr0wlv14m5w64cmehfvw4dzbwz32ywuiljlwgjq7a3pbad4kbsktry74a1c4743grza8eb82nz7plutovtvcekzybr5l4v4gqtd2yq5jkfa8247arxnrwbi3x3nletdr75fv1pmig69mgl7imhss39hfzrd3g90pg22rwcpwdsqvont8jt1av54cv5dxgd83k1u6hfve1xe75vbx1t08txp8757k6wp7ia62mh9stk664b8syyl5ui0l8pkb8rws6imjfnizgmtgg5gkecqrfz7eqm1qonf2fps71894fhf7kq99df1kyb9kky6s0dn8ojkostihs59l6funm1ja9kophl4l74j59ncoquzpa9nbuzutzinoz1q8nslgt9wq2vd2kbdqpfel03fgrmf3jmz62twhd3jfuxfbjqpjcs41hf9zmnhnd7kw2ynzfld2nl87aad5v2k4whbiga5izcqoclnn5shpwuufqw4u62ravi51l6nbk2lu0fkgq7ij2nm7009d3dq7qvg54vyakjf80ok705v3nw1oc8ie309esn7dt80b9wwp083x54alvlx1c935c32hrqa1ekfpfqirjp1jxyopl2w6ey9xqpby07s67dwlwy41h1cnohok0rqvju7ckihz6cmf6i624m261vwvnjklvct4wn8gylxa5nobg297x8if9qzah0doreiy41hnnz61phtbh5hwvjhiwxpkzrz8jskinp8awctgxks7y3qvsy5s6jlibzr7pi2t4l0awernbx5i3su71fomyyfs8g425qpfdmjxuy7dxibt36368q07j6ostbr65fez3gitbfyfpc213l23zkwunz5enin4xwzu7p6c88wuqez6ap48d2imz65yubdtfvwxg8rejz8auuqlzadt59wo11kl3y9d50h1pl13herw16zek19npx3aw766nvu1bd41822rc83gyogcwzw8fbzd5z98vg3r6d3bgi3ygibvqpnxbd2iot5sp7c9w69afes22vv6wcxot03wylmde9wwnz025jk7mn89m64kq3hjmymf43tqrwp1c99ox1whh286l0pf612v7c7vs73k377r5uh7ipup2no3omdddc2x0hlfme59uy3e11prnt7i1yjlg3sazzu3cgv7hpwux87eiipdutv2uh9d6be6mr14w3askmrayrx4e9sbqvsy35ptibkmz11j3h3shwnz12zsn5rsu30crb6ncwwzfx86zfi3wzze6lvrj8al1jozcwjv7a42859lk2t0p6h0rrcps8f6xlk7orcwq9z3b1i8ot88e3b258fgfwqcsvk0mwshv5ch0zfjblfgy3utdsurxc2ccimo8bf0qoxdxypo3prpd3cncgaj0r3jjbg9gfd8bop150e6i2xq45hm8mxinjv3ji1rauekqjunsb1edmd',
                        expiredAccessToken: 7804579470,
                        expiredRefreshToken: 7927865536,
                        isActive: true,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('508b09aa-21fe-45ee-af1d-5508d7110064');
            });
    });

    test(`/GraphQL oAuthDeleteClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b41abdf5-8e82-4f27-8645-1b62a916e212'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteClientById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '508b09aa-21fe-45ee-af1d-5508d7110064'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('508b09aa-21fe-45ee-af1d-5508d7110064');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});