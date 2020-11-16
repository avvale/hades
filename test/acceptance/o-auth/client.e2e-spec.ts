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
                grantType: 'CLIENT_CREDENTIALS',
                name: '17cvwxefumj1m58u0sf6vmc557da1abjtk49zyxjk79uj4lbhbu1iizg4r37d0blw0xgqbj4wk1h44afs12jd8m30hfayjcfn863yxwrnilsx3yn9pi519etevwyzcccld8qumg8u4fi02hl7ouvhyaty7bp7re15f52o9pk64p1e3lhh6i64rsuddy58kwkysczz8dmr8bmooano9ph3rtiigv8ws1o4br13c7d8hbnt688ifieupu8759ti8j',
                secret: '5o006tiv14wt3iy5q129lmdjhkc4a2tqc4xcu6d7mdsem0ftky7dr2d3mv2s0mr1usvypyjlly94oq3d13yprof17o',
                authUrl: 'phf30z3dl7san3pctvuxekltxzbyiftaf3bncy6ro88u2rt4nyaim6oq8xz16lxe4ju7fq4nns0h6ihr9ftyhyte55tsi6expgfr511qg7lo9i05dp9bz4bg218hqm6ghviaw83lwhu0brquejqgxxwakmmoedejdtug9vj3ey97gft4mk75nv33y0wyw3i0j8o0qe4niuos7naxufdf12fx2k1iv0mvp12x1hokrx3rlxv5hn3q7haxpb46thsu7j934vf68kc6posgqc7x0bnuirqmxfnje9e5t2hmu6jryry3zi92f192maj3g29qqnqkug8slya0x5d2mcog06hn7zd7brb9jm9ad8jdpg6pe3jzld5044zv8682jl330d34lj08jezcw1xw87d1dnns37fy3lj0e40asaic86v4xiu10sgaocfpmw7ckg3b6226iy4ft9kzpugp5s4n47n1vtip7sg03xr62gacm77wykbg80lttv3vjgodjjfh900x2ozya0cih49ul2ye24avsguu1xvd4o5e44gd1g7hngen90vsgo331njscno49py99lxeej618rkyaz4ynxckn5tiqgbq5kz8sm1icmluicbw7hgjn6wn2mkzlm7glvb3ard8ko92lthnhm46igmc0p47h0px9dj3zrfr3ltsifpk6qdm1p6f9fas2nyou105pi4h2mblz3t36ofcandafrlmfzwluaj5x8cvvpamj4wt7bwyia1i9an4xfsibpmvuteflwm6bcdy74a2kngqsp4y2d4x2i947jxwzni2ye2qnu650yqb7o0xiva8o4h343etmx3rvmg77pi5h4pk6er5svhu1ql2slnv3ogukide7yiajgoz07xokj2pfkqarswn3gs7ee5sfdyks481fspre4ystpii5akh94yshi5squ8uk0nq2i9y6nzt9kpxmpph5squff4jta0xjqowyij9fhlt82ldz853k0v6k13olebgsetbqr6o0tsljoaj9iif8u7qlr0szjgq5b2g7wwf1evuu6nf8ygj8a3yrprf5e7ij1asnossep24vgc4byy57qh6yxq9p8umj5fxsuaddk3t37c8pez7d4ucmfzbmb948p918mxgt47ekavazzgavuuc21njpw41sl7o4n6ai3mf58t69awgpo6i9lm1mhnl3817d8slu795jrw6f8504sxz6d4tmsvu6xa2qcs162d1yl0xrx4a5mpzxi4ogjsten6cwjs2ed0nk9w1u1wb0jw3dvfw1q8qbpkeddpg548l627xe26e37zwxyhqeybq83wyecikuedwd3gaswts6qdumu5166daj61g076up8xhdodc0vxa7y3brjbrk103fdwy32arkrp8m0sbdx5syfifaj01n5zlcwk6wdxto65s8qinbkzakthlv8r8y2ua921tsvpuvdvdlwfz4sxietlij9kzty75n5fa5oymlmaoj8649kh7itld5flpgvjh6jpu1mahr7m3ngcvc5i3nwuy6swohu3kfa4ghptdujjyyujzmfggtdzy1hy37gf889tpwl1jo9pneq9jdkxn93od2rxq2zmy129rspvdenfcvo3q5zxoj1xl0exroailh5aj2adyzabekh1k4jdeucmv54sus2k2qmukxindlg05hdw0ojr171otm4qz1zbcsn9yhs7cly83km6q3r9jkalj6psq70qcdkm63106tbiofdweta8z2q2j1uf6ehb023md34bln4lwju84h4vgi4bjxc50lwd4v0d9qkck1is1u5d4a8ldau87e3ug5yzbdfek8uwo65qqnlo0k8c0ensn6mnyfonmm7fpa5hnmei3hsloykxbh0j2x56zxbo6mhrl4igm5qdx9chmvuw52fkizhrb1ce58q81srjckh6q3ygyfuedpzdznrlhkmo2xg0lwakhpxcaaxj3cn409v76lbovjq7itufgieo45zun821o1jxpx962i73gdc5pf3h8xyoc02mi',
                redirect: 'yph27ito29nwzurvbqgg003meng50xckaa2i2o124qyh9h6uiipv5s058escxfmp0i1aum29iuoqgvnbzwpeyjmr8ay0zsenly5xfka0mnu677sqfsg8dcfy88zz71v3exw0q5rr8eb93ze6wns3ouaxcpyaxq3hykrcv6ncn8enbqf3jvy3fz5jgj97aciub4zaeo6gz2x9wnc4nhq3lbqx8yxr6ixvoapilwi0bcog6j4n2oh7sq219py4v5279f9j4qyrqb3836o2kyu0w7nfcsb46kzmnf2i844mfxxu3eyekaret5zyrr8vkqvsyvmgf2i4pd1y4k0r6yoifoi02lrs0crmvmjlffzf31z0hpovbd2rrvhwljdlgdrau2ltfxjrgr9dkp4blhambzuny69h6f7rlr7f9qzu5c8sfbbd1vn1zrmc5hn0bzada0902by6xwnnh8y0tzp7x46pmj162au7h3ojwswt504gmf6ebifbs09rju3wluuig8wafz3rat0i6eoymjrlvda7x5kv23y4qgtn00pkdcd83anmpges3rlmbbl4ra0u2t42wi7r35hnn01js4c35wtjms46i00owpofoixisd0qli5hnpmjht917i41dvubvu5lupz1bkqbhlft7yq550lij9na6ew4jcgzyrtue1uuptx0y59cn5p3fy3846lr7m6tsoiio2n0tctgeqd75i2bj7s7krxmff898zb6h64kgx7nm5qy12h5kli62xbr6iuim4co54m0p8sfkdmnu4rtkqji87xzp7t6han9srwe71pjmmizwidws1vnpn60acmwti0ffberin9hf58wv4lg1gdmilfovjqkm60c3jra9woajbg5cm8yurzoze7pvgommb5qn1uzquoe0nb5rdfoiiif88soqtqueliq34xigdkhsc1ac5gy0em7c20j6cwaj1ukiy7pr7actr05ri7y82cptni7htp88aiiddiarg1cwdx01slaig1l5q5o8btrji57dklg2q8ltp0qzp4tsa9hexmd2veq4nzsxso51x062dtqmlljimyo5oyxxspimt633hjlq24rmatyufql3hya7hyg9rp6z13qf0u68sqy97k3gr7nz6j21j3a8978c5ujlyvxh5xpytp7dsenzyty2xuk898ihj5twqmbncnvbt08wq87cldujkdsdzpfh8lgdrs98t5k7ohgcyi8wnpgtmr4qm5f12haf01l9ntoyjjabobdsewbkss45uufkcqhcr71h64xepbq5b2skcmghxwibwoxjsg2h51uvp4hconxhz3g4eb42eqdv4a4sl7fre0tznj553k9u0ssvjzfjvaagofpkufhg3v0sw8d2uc6e131dn9d1k59jux17894f6v4otphmf8evuif6xo6b85rgpzugsda6ls4yjhns9p2z4fwsujdlf1tuqsjfxm8q8wdk4bbzg5tdj373ti29weumt4rprtxtreeoniaa9da9huxbynkqcd71btzdq2f8ublfyswhmauqyp5a2wt1pj7bj4dn4nneglq83sge9ribhpfv263yuzwopatonz6zsonq9p7wa2kiidflf4h1819zxf4s6atd1deqpgd8m4x4vqsyyz2sgg18twcnfntmmmiogqha45jpoqr4a5j77rniie3z0h4v0ocazh5u3d2fh28g6kdiijano2z1s0y9x0iito92z5tl6fi90mh8upnwunnikul2zyk1yxdv572qt90he4f6rfcwzsg1ahlxpem7qo113kaqwxe7gs3h5fk6g0tungxbuur9j7fspx7rusbbxzpx3v2e360fv9jq0uvf0agh3lrnpkkxp2zqgsffiixz3fity5hwv783z16t3qrt4ip3797ecy8gtos94ghtupqeg6qwningysmxroajjm1q5yazw83r2gv4mpccnj24lmbaqakkez4oyv59t2t0gnmpr85km0a475t1jqy7rp619o9np05jx6k1qipr1ij9gr3na9x',
                expiredAccessToken: 6701391669,
                expiredRefreshToken: 1250760606,
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
                
                grantType: 'AUTHORIZATION_CODE',
                name: 'bbvw24djv6q6x2tsm3a68uxjqgaruwfo6lia3fucidojxoeldyk37f25nmx03mldfuvox9t9uuae6l2fvp9t1fvxzkyeoab7c9k1wt0abncggb7h9g6i9s6gaamd5juv79dvmzfnj8p2fawv0f70efb81mxquhmn7yjc630rg40m63hh4gcfy7pk4q8er4e47uw452urcm8qlxy69afg32hz8puqx2jnr2t3xbchs27d0wibpcqvoypiso2rfa0',
                secret: '8dqkd9f3nozn6l9vax7pwrabxu770mebt6w5nn5wm3zget598x9i1s818nfbqyj46e7xdra64ugt6u2sy88ndla5t6',
                authUrl: 'a0swl8a0cfpoonbmkk3zplyps2j7kr41errh2hhqsh3eu2ubphgomzwy79ux986tcgg7q279qnim1aoqok4yhickxm2941macksui80nsmtyk8csni6ncd74zbhdjrfqfz1ouk76q0pbxwqoh0n0eyes3lxdodfckte05tyre3e5bcmwnfr6rsq73j0kz6ij2wvc5fgz8g9ew1rfrcrcqo2ewzfejnvvo2e15osv4j6a8c3ldy2olo1e3s3c98ksoilewl7ag4wi20s83syd4rw40l5518l8bgp005c5qucgmqd9mvde8nz8x9r1b5xsr1l81ukq5w4irb3dsvi9a0w4jvx6o9ecvcm4f1pb0smrdh02jvid01ycdyos8m7qrgb4rkfxenfy3ssr9kw77phnap41sipwzkhp7qtpy9yryufxqlpztnuc9lntkk0hr63rl7t36132l7bbt1r4lqkfzpvcdrylhqsecmmytv9z3mz7vb4nie8klybfaegpxxl30bsm6p1j83fc474rcz32dv8rrvblak36dyt1um1qp1m51a215j89livbm6cyxma3vjq6xmd994s8dq34upg2r8dal38daxlt1rbvnzt46y2nlon3l0jqg7zf5p71j3v2spccp15ubvxourygv3znu0a08zqspngvjld4reeprnfhs4rl9mozkguilelnz8nz95pqet56vpp3j0deb0aa7k2z8mmnye7p58otmqmwykkfbui4oy7dcucr64i4inclx47kkcf4bgyyit6x1sx0bg1ouqtmg85b1i19of59ceef9dv0rugeg442xsryzu4ot25ivoz7qc50q7mbli7qfgp97tczdiiguturqcaqtx2hmfpu9bapotujqudzuu6qwu13mdz7x5iryylu5yjwaj8su7wct96qcpb54s2h2rm24jhcwwb91l5hj4o4yl0e8mntrgxpdn50eddecc5yt933to5bcanfmpagloi7n15q1hbwic3eurz57bbfydjv7uovyzz06ote4nzq01saqwd5bs2gvm3a5zg4xzajnjam3emxa9nw74ib3xw2pzuishpr82m7jqvxngetfe5h8xi5df7oa741zzg1blt9vr6hwoids23oa8v05b859q4v5th9htsjtb8204jslwhmfctjsstfmtyrmepfcj0zdj604pvi2euvg706qlr9y88hecf0sswc503osp6q6f5a44jctr6o0sgaw1zq3cik8q8hu0lidmx9pjcduo144mkibg76mqf17j24snb3x9buq8clg2ncehqt6m1ufxhwcss9qykzou96uhxnhuqqwzyxl62a8exbmhh3e046m1euu8pym2fn0qd31jfm86lfv6rv0nfkf746p0rq1ulnsz11f58a2rhu4czl8k1m6gxdufrzbwu4wkxws67o5glug3m48j120pm0cliyf1ykhh9u8vutf0v3i5o32ouvmptt8ogct6qaev79c3j4mzlax9wk3jykoqi4wwbf8e6ps2zfjcfz75cwsv4lqtp9lxagelj90skkljhivjogpuzarrztear5rd69fgo3ulfq4m441anslykupp6un2yxqpfqzdrs4gek5bkdv473x84scf6j9yg1s7iiicvundnt6aev5kbuz9g256m7wyuabwuwr8e7ya1naplrzv0wiwiyp629qnpyvhymsk927ziiud4bz5javygdwk1dlopg1woq0ruh72exhqu49xja7nrutyar0vr1pq4ex4n7qeg1d04ezi9x47n9aobt4bbldarbfqkjrex62jvmsdpvyh3t1id5a6zh5d7atzabepaeyx4gepuvoic23raed66z3hlkf8y8vfndfpgu01soegzritzry9h940p7js4gayqomqdcicgk0xvo6epoleq2pcpqc8kucnbn85riczer4dc4kcyhgl3ctskh2mpw2tdvf8w1prw61vfabarw8144rxzciofdsg55nq09rmpc8bz8glw0nw985ns4d4q21umq',
                redirect: 'pvq7gh4cozljudfll6j1vl8h9te350916vz7npn4ohlncfl3i8xn4h7b8njvq30av49kpwc59gvh1nb2pz4kj55cz1bny1gzv8aez1p53k2yaoc7rkq0m40s4x9y26hnkunm0bvgepdkmj8vse8yrp0um7duamykzsoph266xi9ey8aeaag5a0m0fpf1uwinll6rjrm6lms7oz2ne3ywtymoq3mfk5fku4yn6m572wngbln9v9sxbtc0q8r3u9ickzqd69wc2a8g1t5pk76hqwpq3q7wc5cc6b918gxcje7yu9rht577032qchj9op4m0s761bcieqoefdk15jxxa6dxyi74mdqhq905b148hyog2wbabf1b2m5n1xt24a5lrrok405xrx7kzvd3rn8yupnj9i8hmgugluqrcm6u1h2agquf86fomh4c8c7c8mifgekgixqstmgywbu7jllnj2hdcu6jq798p2z0pvq65euii5izs9l1s881u8ihpehfei8gf831i0cf3x9zrgdnk1fv4gxx0m9vbjb3ogljlknx1vy124t611jvnxmtcznksp74kryerypalcs7bxtu8zw4uabu2attop6enusv92tpn9lo3y9dlr1fp92ki1bfazk8az9q1j8iwjj1h4qozyb5obkgfl1u3tpg1mthfrbz1z8k86sc6bu3lku07wpn2ikuiebvhm8sfij2pbbrup6i2213xb654te3v5wi0pr3yfvvfue6shbf9gbumazvasi2m36iet89nv9t02zv66ahtuzimaofce02egxr8yldsz752lsl5py25oou2axjta3ptw5t87i56luciw3zcq73oxhubt12yuoom0e5jg792hyzfxelp6527ks1xbau44zp73ybjovtmgzh6ajbnw9m0f0m9l1yeu5txn03vt3hbu7xhbln6jnpx3zifcpsezpzbjq9h2f65srv4190r1zmddod6kicoue1pby26rrpv5jc2so34ypdtn64atuurojp39c1i2u2du7m07m1pi9ytt5gyj5chqy30gxiaad9e8kujgjzqbp7pej7aelpk69mrmy82402asyeq823slwcl4xrkzdvgie63153ht03zijs79l1zmpka9yzggqnoh8l4hs5q5b2xyt9c6j084grplntgbt1sep7cbyqprvboykahalifur0u2uxu7ozdg0arh9xxotqrg3b4ze8jxnbxx0peirhi3bewugybd1htgjgd9qukzxpzphi5r12ztdayk16u06r5qq46znzfxq7zsk077pa038nx52qvovve7368h7mcw52prnbelxtwlshj95io71lp3dj59xr4gmf4pjpehf7xf1kbxzug2lp0fdseimh7tx9qa23dydqs7ua7d0utmwrjkajb96kppn81plnqhbujsbeygc3129fq6i70yuet1ovq807aqc1sos24t1hk925sgt2ipeqwpca3d8tvmzbe5fiziszca4msybjm7p5509zwurtcmspx98eomsavgfwf4zdsnjatxxwdvp1e3f14ngvuehng5sjmerehtpnawus0gvd0g43u46oipj3w3c5rvj5pi3lo8uqs25sahod6042pn1ifz4revvm7x9qkrcui12ac9m6v1ld0htwpcyihois9y72ddtn3kqx3i767mly08jt0wt6eiland4a7ci0x83llg9gw3opugt4vdzbe3bo4sjqbnipb74x09lm3y16fhlj5hc013dolz8aeod5okydzqo7ifb074o26xwztk395xykz0w7ipvl4lkpop5unq81abskxcoqejk75undak3ayfgaly2tolnuoaxxm5imd90t4dd08kzoa7lptefm0ybacd2vsdx29nihqyugxle3vc1tvx33lnq5n8cjj0ljyu5l8gnagitze4kq50r9n170qmn7uuexy1872mrqwupmw8o006edmozfko5da7u5vhvjioskutj2gnqcwrwja00wkzzkhylve24sauo74gu73f3v',
                expiredAccessToken: 6602163130,
                expiredRefreshToken: 4086027861,
                isActive: true,
                isMaster: false,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: null,
                name: 'g4ag1i1bj428ucxe9if2uvafubs4bni7sz1u0cdbpyxfwdhbh3tyfqpi71x3hq8cs1gs2gfobzfbc8hmnm17xa1s4m25gi3it15bdd0dnjpbo4qjrlm4yxqj7xwgr62komebyqqhuoz3p5au3x9xamnjn99eog0lzsoof3rt72olyxuk0uec8odzzf8bmmukh8gkwdsg1a04jlmjp09h9fulb7fb9neuuq4h84sf0e6u7b9tzlygr8gpc07hqfw',
                secret: 'sbzfiut7ju8vipt0hhyh4ca7zc1m3scti9d48es5bs55pbji1ytw04cuv9xal1wpo3ml8wux20qkym978eau9e1bbn',
                authUrl: '537bdsjcdsfi2dh95zn482ib8ql8t8oz6bbeuke7pv97873bg23pas2gfatpzgjo5mc2a3vx9lhavav5xnicl9zf9kldi7k8g8kv6mv053rg9946ex9abvu2i6fsw7koi4w7lgb1ofc22ueojprcxxvia7dhfx0a7b7ucr7a2gybmkko201hs0mwdni9izx0u4ncwar5eblpqss6mqs18o9fg8n8lse37k7wf4jkgdllpbof3eugv0ct4bbvg4yr5dkws1bzkup37brrkqlplwksslz058e9mzg08yy5lilmzgvnjbjaxyhm0dyywc4hk3nuw85ojeti46n5xchqgx4qqy0upn0tpkzkxj0x4folmqicu7mv7xmnyb3xb6t959hqemn7aqcje1wu7yc5hgn29564e5g6jipzd246ik6ufvnptwp9tfgicrv3in64uky3762rof073yqy2gb0ggzxn92j6tpyxwclg7r22n6mclx7i1jw2xgdiz9bhp7pav6jyrljh8bqhlu4906074zozl3836wmp8fhz87c2onxqac61vbe3hjyswxj1pmkhlw0fe5qrwiaigapok9yxf9waaga3e9um9kbmrpjcggs5zicpnwyb8etwhcqwpt740zpq4g9nmnv8bskryn2r614v5bmab1bs7usvrpw3gpa01ye0dvwkld9k5qqc2xkv5zx3yaxglbtuao1imxslbnxi3x7qnc3afu121ib1qjsutvu40343ml3vyg0rcxye9g64xvqqhn476vu5xdd97ctp1e4px11f4kin51fmf4ohgn32m8lkrmit6ox8piyxsnsp1f0ijza9jm34mit1jv6hm6kczfwy0327vdywpllpnoq2zc86vchftfopdbebgeqsl05fyk6p9igffrc2suv7ze56gsc1td5f19jp9tarmp72qna4x58frbbfzb94vi154hr2jk08zczwk858dd5mfyh7zfs3jg6cua5uaao12hkxozrpbg8p99pr2h2iba8rbue6bth5e7qxt5qrop3z2time30ii8vhkkx8epiogt71d36kjqsgnxx9bl3cwqlwu3em846t9vezsdy4kglzywrvfv7of4yqvxzrchtv6um01k7m7g9shfle81m2hfh97ahumzli382mvli083v0obdf4e2nfs1l1fk588oeobs37btgb79n4x5ztmls2ph6xh6biqhqmlku7er5k8twcw75ugrumdc6zvstd8rl3p7mkqs7fh6lzvzlln6qdfkyfjgk57916fyj2h194ejc46ukienllv01kye9gwqvzal0c2s611ouyu2gk8jalwxleiwskrsny11pvzll6mhpf6ga5ch79vmnrxcjaxk8g81ythoeaf3rnq09goc5clzqej4b6wbbafh26cgnlzgeucktuefjeorf99cgvpmx3aowryh3hg0mutsuf4bzhkd9x5oeqi6oolebzdn8rotnfvn3l3b8rv7wphc0fwlrzlcsasw5izqyh0z41pmsot97kat4uofx4z4gz9kr56cpukk5ftjv9e2cvcnp4wzitynyjs0yn5dxbkuzr7874hvldnag6wg2rpumpmdnaul7cwbn4t466bw1z20izzr5z4jsuynz7g0ynbfcu1l6tg3esc9zcqwse0c1b36r3vyr1wpta4a31e2ul8qhn0xhtapenlfpufiq24li75jo4jbb26n6zqznqf9r4qufwkj8xogbb4krr03rdbdz2mgp64z6n2ga5oy2jc3mvf2cfjssqwht7siyinulpdsdwzvi19nnvxaxeorbteo29vhi6s5lming61mbdb2hdvhaylls2h4fgtbx5f3mwjmhqgyty1epvtzo2ttakhyfklj109o0j51l6mk6zgeo9mhdghm687d9uvhfrc0j3u580gwv66f19r15ksfd1iv9osjll0pbt8qnd3dlkhh9u4by35idsja6baggejfxogjunyj47tt7uuffe14ebmqgtbjiiwfeezx25nf0zr18s89',
                redirect: '3ny86shs2wwlcmpxoww5fwugbmcjxlfgxmilho7kda5k9cnu4o1mdgj8bdio11psvysmg6g2jp64ro4bwmrclb6cpw6p3chmfcvfiatnv0dros42z1b961syif30k45jh0dugkg6h340tad72v8uf4hjb2aw1zcxcsofvdl7sdexzatgt4x1uutb803m4c86bf9o8zhw7uezprzqfsdsb2j1emffxiudikrxaf1rvgmpz886zeyevwjuwes0m1evxh512voszejd0bo0ngyv7f5iz8xab6fhdtkupzu5tzf9hjn9eejmhu15b8x8nd3lbybf0wbvw9pl6xsw6uwvl64us0atzjkr9y5j9djjwo6cjqmtjvm5w1ftv9x6m2kmhzkrzjurvp0nykk0pw9rgh42hs6b2me7s4uxv058icbt3z294z9w77ooi9f9ig0rvjbxs0y34tmfxtvdil200vy7wl7eq3zfx6n68q215zlcms6vdhztwtwrp0f1wk2ugjxs8ga7ifdazs2yybe3px87rnlare1iw06w7if1zw8gjbc2fefujgkh0r6qzbpvd7wtbe0xyfhnx0mzcrx9yqx5qvuad9zthw6sri9jgjtvijk8mqb8rokw30gp211k8bzt5ja8xhmc1odsrju3waveh048dit9591z0aj3uo9eg4560ca0ft0ycc3gn0ysmze8g3y08cbdwjtgltvl4olxjnjp6ur7ydu6kbpr9zjr1fusmt4tvfuwiugav7wiahsm43sjg06dx852exs4n7elh03kyyf7x6i3mbj2gdainzkp01yemw8fijaimp962zd8qgf47e7317i9tsfhts1zb3j0tgphs6tyy9sl19gg4vog8sqrny49sgplsxxtmenpb5jjdauvxphlbq8e3jo9z4nh31rptjotbzxwby8rlyh67j434v9cyqatuvrahs9jgo48p7ftnn9j1fbecls8v9a7gjquu5sj084agx7mr4x98upt92dckwxw4f886ta4v8fgt9l7207j2edis0n5fjt3g2v216wz2t8fda8xp12283aqcapcjazla7n17w46ges8ealucdauwlzduzh7jpwexkgqbrrkmkihhde7hi74wtpklto4cuuz1a72kxfp0omt8ryhobge04546b8rxk2z3pdngqg2gr8lc2jkc9kxk1gm1e7ta6ifj8axvd3dj5l9lynp62p2qo239gq5y5l2yeopt7xj66vxqraug8oka5otpndnqabe0dkbg1ay8e7lspl32nlrge5umesfhxacajaq2ghjghb6670edbl2uf0b3ogu27s8ojm419wb1xnctzqhfy6jlo3yd9nad5lbs4zx2zhwy7vkf2eu7mmaxggnryisn9e61u11ptzlyqsektkhj29fp6gvo44ltcimpprxp36mew0etvk57mwmtmb3gelp09bwiw5n9bk5lo7j6c7rmi5n16r5ymksf1168ijkbkd5xt42e70zr8y6ibtcwnlkfqdghngd048mr8wxa08qbazx35z6btrnrztcuam6oxdz5i78h02xa2wshbtxiv6q72l7nq73yf80v59pd56wz30w9faxkw9hanac3sx86trj57efds1a3uy9x8ae0dbcxmmn0w06vj2rsyj5vpthrte9kd9ciz4khgppvja87up1theflxw9i18m9cbyiwyowg94bczjv5xzzjmezxipq79q3utacfom8ynu1aakz5t6ibwl9cm143sdsyos71orck2fqgkqoxy0obka697l9sf6obghnpuxiyd0tllx583zor09wphaufcigsn69gaofltvk0rxvs3p7cbdz77wfe31ip413wp986zkzwln9ivl96yg2wl8pph2ve7rirlhbsbau8hhhotanahykv3mx7b2vat6fr73iy6trn1dze2j57mcs8ol0qcytwyr1ak6axrq7q6pz8lsx1u9wecp3sh4skyk1n5o9bzdv9f5b1duby432ve6cx1z02os0wte05gf2eij',
                expiredAccessToken: 8648307275,
                expiredRefreshToken: 2736590590,
                isActive: true,
                isMaster: false,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                
                name: '2pzaq3dz1f580zmmc1ruvm7813tl5glf53ywvhh22jenljhwgjw554hihp9aj44aolhpygp32vky9edjl9cq0yswa2y2ve7c5g3hoyrbsjwdseq2nnvxeurjfum0on2r3dh633vv6bhxaa1yisnwhawjz4tm8yhx4ozukrqtedyawc26i73bwkw6d4tec5pzkf9qpgg7p3oxqk9i4kiuo3w4xk24lfon1zjew9dr59ck19tzmv8qpf46euklfbe',
                secret: 'sjskvfis0g3lvetwgtrxmhuofb9rnv6i2a3xksaicgw74oejqzn6sx0y273ybk3te7jd6kylu6jcs0l3zcuq18my7y',
                authUrl: 'w5bbugsxiamh6y83tjvfcii4g7dx6svpzy1t0b4cv5ux5g5nz4vcnrl4heoznblz5bd2kpekszeq5ziao4g9hnqjtxygsw5q1697fbr2dc02h0p6pytk944rdoq7ho3cg4whp3d8uyzvm8qeq1uj7lptyr74ex9laemsng7obkhfy1aunfaip7jr9g3qavgfk0ik5sa4wzqsezocs0pigpkk3lui4lnjjsowhogyssvlc3nbx26wsefijdfk7lr7gqusk3iofzlwpjcyqfz4zxj089o6mq8q9bq0oszjswsmjmvhdu4cylx2mkuk4kix1iv613yjwgy7zfe63apprpwhh5jknupbu6aqexv4at8fgiqfw3qe7v0wlewxkuffp3fyz1rr2t1t5nhvbro1bhzcn9owyzwtl6jj4h5vivrawopcr19qw7q1wme8bi5t6dc7aq3nq3f1h92vvyfes85xtrjlrw8g5hk8zomcb5xzqoypttr1ci4zr0fszyidxrbhr30g4jdkyy8gvr1gkjav2otcj2cfc3p7n6s1emleuyc920fnusky8nm9a8i6aat3rx353kcax40ylce5f6wwscq96kphtlf520t4laj64wis2dbn3cxcvdxwbz7ufh12bzc4rr2p9l4kbt9s0tdqtm98gn2tt9p450tbray6radzvb5crnz900z51swo6iyqv52wioiw9e01xiqo0cp5omlhve00nwgdh7xw7fugundsoohnjht0b809ho87glb9mr14xzvmsxre551tdu6vo1i8pe2l187c2rmxjahcivv7lnwje7ia9t898q3i2zwvmr1sxjjnrd3oqrqe285b4i9ppcpsnsfrbugwilrd3swndsucy11z4da3snqz4cxsq0npq3qafr1yp6sjwzk2xzmxt5t4d5505p9r2ii90vmd7xbjqqo2rsqb99fsgz59kdv76qa5dclbkxnojqatsrf01pwoavzjcxbwz566brv5wlh9hav1pe2i9o7k2nwtyiq9n4qvjng16uvuiditt2fzba9bi4p9lzsu6nwn6nfcad0emkzqvf4egdpi12gdcbstb2yuzmxdtzmkohqd3yb902xop7ftcrjy1p09pqpvtkjg86pth3im0uovqd7tayndsxu0s9xy3xc69l1qfpzxk2dqadv6i1tudvqny6jzgnql0rq61gh4sem6w0r3afra16lpk5y13cejd6gng8vhaidhv1i0y0gg1luq7bsc5yj7qrye1a5sty2l3aobdpgbntxq7j37x2mxoxmcwby69zwjwu0fr5myh0520prpbkohlan864pygoxnnz3wl5692lgjyncyzssqvqtmjz2nzr5atn30jmne3yj360ei9eamyll6ryeuuypuyc0zvse9vc1gurhm58v8xo71aj0pdnda6om975r2pvm9qtz4rqkxgf8yitftjitcmvd7d2p58adrzwhytsocfw7gax2zz3ozq8edda0s9jt3cv5nlq5t54h2l171wsn7odwa7horvsvnzeov4pis5r3s3d2ifjo4tmlk6kn8pvtf5um48gh6z4zapme4qkdytobpn9srzal0lv1bsddk7g5bd56eo1evi9dqh7k51bouo7b5udapaka3jj9rr5x3ntmq9c9vdcye94wezwpmo2skp8i2pi1ksgm8x68i447dwspqoy0ve40fwtdnxd2zl2jiy8hks7sakvb2juwps5lrh0f495ist1bv651yma6y8xudnd68owgtajcxv44x8i22pq789ws992mqsnruq9u4b632scxy7tsxdspfxeu8nq39a3awgvbyyv9sf8m8x4nzxergzp6qb4ygab5ueo7yc80sfc3b9x0dm11at8jxshdxcyu41haw8oppl1174ksz0nyrippz3dyw79dm0pan9zt0dagvgdp786lyqf4zfofatxkojjy9mteibpdfw8md3x802q5774mlcmowr0n9vogf4hlbep5hpjjww4bem3glnqyc8rk55bepqsxr',
                redirect: 'j2bcf9gq5pa330ji7y0wb1ei10wv3qo9n8d4hx40bi9ld8q17bjipwo1v8x33efgg1h0illvednwr96oqkorgpvl5l23n99bgljrfzzrcmidribcvvfdywfhwub47gf3600wvn0bzithtkll31rivy8narm3fp1gpnzeejngnndzcodi7rmis8fpstfijubbi7a1u6s7cgncczvbh3s18r0hnokobuw80k92fa2wwqdsgg4o1y6lke5norrdeknzmahr0n54yqj2i6w24nccbhlfyb4j1uvqdrwrwwy1jirmiw21dg11ddcbbn4o4ofbnokv3cf6cgn9kq45i307qdcz82xfocr10k9cx1mr1y76wa3uahiobz8hv13th53wiyxi64jm2sdxw3wuybavse5042j2tl9zagvaf0xul5wvzk1q4a9p5y9qqs4zp49mm59xntjczkgx1gso7jqaey2dbzqkg7e9fydfbfxqvbmjk92ui5dcn3s9ugoa19qqjlgj3xdakg4lnqc869hkaz3nzrmgol2l5659h6fumayoiqf740b74rmomuy1hqan2j2q9kk9kfbb7p8anv797kha5wqsqgedyf3bapao4bch91uk1pse48zw7fclr0hai8cfh96yv69xtdz3mh82jf2qncdv5dsn40ulr6dr9j69b47o8pefyb0ifx0k82436f9rl2tag6dv1sh9x8h2d64vukz2no3g71azner2s5hmzfn523m6er7749uqmyr22tcn05oqlw3voe5wkoisaudlfbctzc4frc21rck36zlen1w8ditj3j3y48agwiow6zvt92p6uyh8l1hq34nc7bc8vclnrwgcan09rk0vq0gwo8c6jhpuc01bxa4ob3uwtha093i6g7rfbls1uzrhcemjkls9vep75en1i0u5vozttm1dekjlkmrguhilbkqfyvfyq6sqqe8rnm449eisaupbzr1fg0up4esb6fgrh3p2sy27u5zqqmwnq8h76hlb3i6inzopcpihn2ql8f947ntxyqm0spidragtlhyz2nkoex3os176dvir2pql58kafjlzgcpw85l09fq79ibdugnaffgbnllmgole82ypw2jj7l01zlzth9n2wpls95nqfrfmzglhjqzd1wacm4bx0dky6n43txergfc3nkhe2g0uubr5u7zlvgem4f6v8iu01sdk7kctkvecnlc6libo4k9ewfpihao39pzbpnojuei8ocvx9jxz6jxxnec92o0wicpyel0dw5sq9zmssymbn9z7mb7p61jh90pq30h7x1gzlxhrlpm5jhinjlhvf7p5jagpjlvn6quhqmaancokxspz00z5vcwrgr38tm9sqk7rsl5gdfjmxnwvv2zo8eoipd5r2dp7aub0aq22qhy781br4ra0r0y6t5h0m2n8fkc7y3xnkq1i1uxgf2uhe96uy0m92gqjmxvm7furnyygl02ho49kb5ki6lcjvsmp7dmsu92lxv2st56x5sm8nznfjzkjhe3idgggr1nicj0r0ditap4anls1nj1m1zbtyptqmz3schb5pf5zzqhda80rrck6nwj7es38ukv7gy2bux525epezprri637fz03gijv7wljv9b54kb238rg5ibc0jl30uujjcfy9qdypvesmcxmen6nuvspas4lzohj6fvhh561n62gdtu0fag2xa22de9o5qra90luznacnr740ntkbfnt8l0l02dvpuozy6bcnssv5wcnkb1k91adfdzrk77z2petp6undg0fkylidvibouxsnvuh00lto1kcfhcu8lp770r71g6gp9mef7yc5slaxq3apbrtx5l07dfcgqop1sqqzypbj2cs2utsqvzc0by2ml31bim41lna3zuxlkcihyuuth832cwlbqdcmawmv7rw21yfzt3qnwnm1flphtnebyrser3s84ncp09yklp416qs73sfruo7adc8abmdux6kwyt7z3utxp3uv9yynlwcnyrqc71lsnab2jqr',
                expiredAccessToken: 9168473365,
                expiredRefreshToken: 7346009356,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'PASSWORD',
                name: null,
                secret: '0a4wnu4kn6b9nmxjbqxbc4epyi5xveg1gv3qze3t51qxqhigk18pku2sqxmdfy481w6g3utkuyy4cob32mwzza0u3m',
                authUrl: 'bm4fdcmbheeai8vm1q6gxqn5yh0mi2wi9y2vs20olqdcgapkwuw1bjkewjxj3q5h45l1at31neot4at2029pqs61yfkjkr4i0qgjwq50y6alln9k4vow14cm4phzshhl4lr0x87bcxtduxg687zcd38vwsq5ubkhaqzvx6xqprs8hngo54kw3yl64xnz9vfu2hzjcvf95fc38y37ubfbydzc17269rd9i4o6zwulqkxdkr173wo2dhw15d4y3jdgmwo1eua34ibkromnhwedykttfnwlfmv9nmmstbs8bbeaqdtrq7y3unbn1bmtegredls3bzsc86olxj5x691js5eoinfmksw94beuyvtk2vw65zqyjn856nyedobhb7bkmj4muysm751d10rwreymw4sgshr50r0q9f8d9f3gd7jqpqnh6xi6xo7aph93vzwrp6w2itog8zqwkp593kymmueculs6yzzo2wiao42v777d9ejc3kvt79imz9onr5zsb4ln56vtehqlak4h80l3977vns736dg1farb7xuvo46wg1amgkq6ot20k9alcswuwupgz0y9bssq0u2bei7k3dq0urbabt9smrwomidt2vrc7f1xdvbx8fnlry331t0o3u1phs66br5u3xeqygr5il2frj0rl70ih38fwjdav2p6p60ioe2uuvm2l2als6wooi4kaoiwf9d8p3s2xv42ije5o7uagfx7t9hwgspswnquxze49ezcrfyu8ervuj0y4snunqjjh48au96mii7cer0bhydlfm031f6oea3xwm8abzav4fcl5g602tpn8keozg18395mdz29tm9jbsdfeolnxxekkkt6kvu0tkrkmspbf9165gpj5s7bgxsojeoej2s8bi15fo98yvbi6i3dqs7571nmqk9tw8c6lc7fm8m524hzh8rh2b85x2239o6ulvufjnoevvggpck3bynmv5b66yasy2n0ohhji4p16827qap2hr78bne0f1itycj1lgumq8yez8ve90qfp51yu57gd40v7rsse7ac7uvvt0v1o4aynzwscp4mv269qkl8kzlkywleyhq2bhzuthson4laxcjkt7eabswdby27uy7dqdxg7j5jgsk6sme270q8exgrqmriae8d3fafpr814df1syq3wvmh4xj1eqrllpmo8eig8b1ck6uvshqh4tcqt0ltlj4mo0cxgxll6rxwizv3ladqeeiyz6upp7aaletkpwk3kuk2hyvysxafsp6eopih9ae7mh4k180vfn5vlyyrwjazqcylja2hax676biwe7dnwxsfo7dsgbziu0puas2vxlfj1jm132at87s9u4fxl0ltoif9l27fgyugoqy5wezcleq2xifdyrv5a69de977g7kxkm6e97amd9mbnxwev82ohzqx14ccfbrf3ohgd6pphf6c4043dm9eg8rff8441z5e6iic7vx2e96x8i8b4v9a1c0qgsjoab3c28k1li79idfqxfe2dndpko1j4ul2ttv3jftgbkautba0i1mt6v9pwtei263xrvlxzqj3lg4diuoccskwtyqgvhybto4h8jzs28kw7gv9c8pk2rll5nz5axcyg8m7ptha26y0suqitp4pvzg7ru5g4bo78f1mpoxbq0ctn5it38c7n8h4gs5tqoxjfideookrsokqyak5nc70edyrrg0tbvpmwhaauluzv93w4cyxk7323whoudh40ox1dilkxurfyz56r0ts2sl7if3wuq2nk56zcl2q66nxxnvzrxcgv4zconc0osze09bjj3ugb6iub1l856zcmqgfuakcgbu5esfr1mkslfqsaj17u9ndpr1qcsr251ah5nzvuxfptoq7qsci24zzajw6df4fbet5r8ww1f2ybt41wnkmvdj5z4a6qt7up41g47zcrvhcypxgc56hug3a8157to3an6ghmx8lz3u7n1cthb2h4hrbvqizisrfrawbvb9vdg7du92e07xzpbddycqhlyrhbypl83iq',
                redirect: 'cm3idzeyon3a3ifaot4bfuwrri6sndbgwcaxlt80a7klqvidpdqs5pim5nnow7gdz4fohzlfpdl9893zra7xg74pfvrnjriyln5hj7vrgv57p8rzw7u14qbyrqn00coysl9dwu9n9k6k9suv1fow2d8r474m01jn8695y3cvmntihornl5hv9ejq1m4l5022vw4hc20rnq794irh62pzcwqux8dgh1ft3fjbll87wle7moikop6uzi7nt0n86yqjkg6rmxs0iely4obxuf6g66ofpcawi5dseuxkc0px747jvjf2eng91hl57nl7b40q4ub6uty8wgmhbg1x9jhshw15akdcgdwbfq1vhs2qarcj3ppwsyalvqf1srze1rgb91xo6nqlhydpkpikjunwr4fge8wkb0igwsswnyyud1babui9oyvyu3bxpaamimmcidvhxuvi2a4ncoqg9qbnnbr3b6q3kpcnhjhb2ars1py6pwc8c9tf6hcnnembvnuh980kg5mzihw1eedhl32poebazl13va3isgczyjlglus7zd3iqmpoduhxgfa2k2secjv45zfu98goj0cry74r11402ak9fb6flbycf2hkagc7mjh937afpe1braqhmq3ibbzznah94nlbps2ysxkdg0vkov131qc18us0l0ar3yv4ey8cly7cxvq3384gcjyi1bxu620kn1gb6mb03mke8yfuojavd6ldwvsysnth6b9e485vual4jxqqfdf46i8goejkhdd6s2juq6xzpw9bt08ja4in3d08ouuf23zp8vq9m96qzs2uj08s2fm4fijqoco3j1pe6k2d3iw3v5ojacn74mxonjj9m6qutcka89nqii01a68mkf9mpq1ckfbijxf1qr7kn84hz4f08dyxch6as1ufv21dfjvp322ewnviw8zn42g9relvzmra6wcsdp0ai8lis55jbjlaxwgey7r37sqabn9fiyui4sjv5kkvv332u8mgv1943m1g6em7rtopto4q7gufqojtnn5oi320hq16d7xf61v8yux10ua5h4yy7g4f8e2sxqh6nh8bqdt0kjfq167unlwwvvbrix7k9lqej9cgq1bfczd8yrssdt0cghyih7qnscnf1s26fctz1r4101ygmp1z72w1is0osag5nexo1xbr2055692se284yvrj6ka4kfoiyd6weixa6guwfgnmzjd1xzd6oq8vnp600c5zts6n9d3uju0ivp1agzxzben294kix1dl9c8cvoky2kelnwh8k2ozyf5s46qsxlz8ngo518wes6r4re8p4f47yddzve45r4q7w54nmzaeutr2738j0ln4okbdwdo3tmqi2z42z1s0w5q0d1g4gbmbk29es5mcupuhgoeiuske0tve2e00dbpkznv2o7b60jabydxtqaw5ys5ti1u4h0818n1128fdibroq9l8vb7qdtyvvm0jw449jtso44xhnn5dankz2ecfh6ufahhc0p8ws5znx51584oknawckn6mqcqfjdlybcxyabang8v8e30l2xtxnlzl5p0hj15va69o0wosehvtp177bh9ju157ybburzfezf44yupkhpwtjvmy7ns59w8kewk4qncwbq48ch9g8b2753kh56ersvcgns08uzkvxexut0bhjz2mq3rtztgg6w9dhr2il2up5rw6c8w5f0rj2y9e2dasj2fnwiepnsygfbl0a4c0csjrwua7tegjc0oh6o53g3enc7ly4gf4sqcxi7gkj9d4dssrpcx7nnbhutq9o0tqb315rzgs8eq80jiqjold8i0kse017ov0qsodsz9c36z5fz1pc2r57qzwtvdlfphsf62dqnslzxbnwv0akk5cn5u9kwqub0gtonrywxc2pk0tav3ejscuxeuw8ijib7crt27fq3pp0r0fgyirbleoasb31x2wn103jk42oyaaweal0omujlje9dsm5udqmwcu70k9b670sopclx22dx4utxw3a9hp1emiv0l46l6y',
                expiredAccessToken: 9230220506,
                expiredRefreshToken: 6203712827,
                isActive: false,
                isMaster: false,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'CLIENT_CREDENTIALS',
                
                secret: '5ie8vmkeocslo3t3cl07h8xh1pqfrng28nn9akv2jvrl09arln5xwsv9iufbkg1dzpu2fgr95f8uwuhpmzv9jlob8o',
                authUrl: 'vjcrfgmz92dxbp9otfwae987nako69uvvfkkzsrxns5jizuge0pt6riw1qes0bagj8k0z0lwrt1jykff2dcvmre4jv4au8uin0uus1faidsj6hc5nb5lsb1i9h2dfe4oow1qydvw3914t956z483x4s0bxyxrgywojl2rzsctgwjy27rp8drzi6d2f6l4zer9uhxituowf5dwbizbb6siuinxiklveeo1azcfiw16mon0ybj9gmx36kl7n5qia0f3yxgkekz4g7biglr2fi53hlya8jlgp6u2ruqg241oi66ynltqowafefk2fnxrgy2q12prdiakt9kto8sx6y6yhchk1f3qy8utmf6jtrsqquqv46uyfsb6h3x9f87kmz9igxl9o10ht0dupm1at21ecg7vvg5x2jl0bjao4uui596vs22n0z0681aim9f2o6htf6buymaxgff8a4y1b0uedcu40qfe5tr27zrur6ae6wrpsq6v35sm9bgf7dlyg1d8d0r83y276w86anb5jtk4q4a1vhnu6v8ghsp8y0wy9jniu7m109vwppspn4q5oy24upuwgyhhdi4mh3zc256777xaq57rxq1vt63ycr25kveqrilcs36vu1zbz5513urt9bq0xsv0oz36fgt4vc96lwg595fl0ep17d6feqfubhhmhjgjp1wec8p6ap5l8j5rxh54dwiw4kcfhjks0jwzyumgzw1kecz6qhs8qhg50hzpawoldskioneyte6cn6715fc4l0by6jq7dl3gg2mkij1b5003adpn40svb0pa4jhew5bpzdqokzf5rkacjejzo0aybk954cdfzqad8egt5vjpbvwobjcqxl8wq6jqeji4jilx0i3npf70y1d1svtna8x34hvtte93mgogpax6ktoqmyzyp121sspmyxvr2yl0z0dx57ird2092er5v184zyj337vp7usdqs6uhe1zzgwt4zr5cdy0ju6w32jzcq39jjcl89dnr8s7a9fjz924ryk35pkiqmmwu8ba6buoqt4znvehwpms18fj88jyov3trrkc5sllurc71h4jfl3b28hb5f75omkkpiexxvm38pmg65b29crv3qt8jfuit7m43z4tszb00lqh8ulggvxeja22u7zm1x56kifvjihw80x945asbaa18eluooti958ax62g20xwt1rhlvwzv5l5b0c983ovonbjbs71wgd5y6vckp7o6o01xax7s95sbgil3hhw4l5200j2kaer32z50rwifkmxxc4v6ozn5r1ws6ttfen6nd4pkj6w67bcf9k4euf2x2wor038p782xocrakbclwu30qsidzae1tgf23o4i08pd8n3es8kzu4sf1cqlmz1kn8hzscd93dm13n0vmj93crrduj3ra7n5mfgcg4a7qgv0g75e41d2gzaqm3zvc3xyjal1mjfj8zkhk7nom3vgji2s8bvu622puwty65b84iqr198pq5bzn1l45993b2v91yurdwq9qgm4s6l25jr182dh5pgn6m7n5dqhq7wxbwgetuun2y0ikrghn1crweqeuxk9ytqqniev7c70261g5wd13fgqaxfptmmui6abjav1brcmw4cfqtz5ie5htp1pgicrrn4c1ztorhnlmirhnqgiyfyjobi6s61k0m4dm7xqsd6fqlfju0r8i1lttmqbcma9jd7ufm6vyqt4q148nyim1zr9oj6gorfqhmme595jv2toi67wh4tnpc8snh0a3vq2cqm7q91prgdj9fup18sybit9wo0mh64ov45lou853p0hbwxtc96blluujz0yybvym1k4g7lxpb0ipgfuql4gdknpipvh73l27i7rayjt9040jx8h46uwztaczhu2yikl7nmg5gthf07rvhosby643ssjgaj6wxm34c2emwfryb1tft8jvk6g1u1g0h4hya24bga9yxexvsbgsxitrjzlhgfh49xjdegw52hf9u11z0ucwzmb3uxmyquwln0va4uiuhj3xu6k6n',
                redirect: '4s5xwzkomhom88gc01ydwqyxnz6cfdc5nv2y6ltejj1bcrpzdzp8epbt5n0zysrwd2lp15u1724qyx05lpcsfd7gotz6r9khums66mdczry2moc00gs21u8ud22g7cpi0u0tgyg66shgoueodnrtm876b1x0ylopbad3cnvjpdukswifmbc28xu57i1434uh451e0gvveinmxfttw0l5i25fyd0cw1yqjw1fifqpkxgl3fwb4f7sj81poxpd6plxxah2an8gadwr0nqedjf26f82nmnwlp2cnqws76lfw6c1xazgpsmw0o97imcbu3aplgevgeco3f6yuaxraa20x5b150ats3fvvqobzoxvk17dwlc8fjjckh7ymc98x9415xbaqy04u4eozemr5lg8jnqjb6eai620z1svqtjekvcpkzgfhxwl88348rpvudm3ycz45cfh59sp0yyo0hqho3uar1ysp80fvw03gmplb8mejqtn6ly9rhouh6sdszfaoz3zga1umnbwdb37uwj10tib2kna03uals8c0nr1naoycvkr6xp31fqwqbummlvojvgloc3niqo8vqs17qrpmma6fr3wzbasqea90hyrykxtojpwxmywvj0sy903kpcgzbzozk4gd3ym5161km8kyaie0u9cuslanaz6clb1kcf0qxa5r0nx7ycucdn5p0x9ad2jdgwqxfu4lvyir1p2r8dnnhzow06u0lfcgnkwepyysldq9bo9jtwr7f0y29j81ydmemf5f3udtg90ubwipw84tzd5xwdq6q4s4fixkx4028uahq13esptf7wn2k9puazryujgs15cgkksooogcdur1hxfsy1u5v189ip4wfpwawspj16yvv5w4s227z82dvjsjjbx57lkd4gse1exhyorcfgt9uvsaz1y1lxs44a2yimpbgvz7eyk1qukxf5ssvypllk12t0934cofuzjntvl14rmnedwbh606fipjmh5xwynd8l7uh8rblg9pnanfcxfcddpvq26wp3e33r9s4hojml0oz2m3i0lqpz7bj4uvsjzdaqoeg1vtifkqqxcppk57xgaqmpqz7vujswrqrcgzd69yncd4f7k57n2v3fjn8erfca13nr8y7vbolyhinsyrapvh8pjazntk24eaqiywh4wkg5vjqcw2ejf24ijzherbj4rfgvhcw1yprwjxwpyy3h76sz9nizyyvvgu110544izceqp2uwoaduxev5gqgrzy7jejbc376lyupvl87v8owkglxwoiaz70xsbmb3wzh7o54zjjpnjg2yfccusumrgjndia7e5qs0hl4xpalpugsgsozfjv443iwuchddfwjxmbzh5kelmo3voofi0aluygnv241de7mq43cy6owql30tm7grknng32m4scud760w2s3ptq5pcl1ktm09t5h6hm4516idn7rhn9vg3r4q0lx7eh3kq43r9r435gplglsys76zw18zo85whmtctbaojl1v6cgjxypna9ep7ptg20b9193xakkzaoblr8to7rvauzpvm6bexrkfyiz257hyizy61e22lhu4uzu76wcg5yjpqjmhtw2kvygdsbl90kfx2au75n356m2covg8remx16co0e8dtz1poyckf11j3pdcszgiebrt0k6oi7sxd4ylkkwsjll5wdftjhaqz96eccpvr2gdu7tknos9fvd9n0jr4detubzofcf7wlvq5gwc1oj118a7ceoq0933cc5cgpyl0fvrim5m10gxo878nxjh2ekpkpwrhj103tjabzrc1qsz6cwg3ygpynsbe8oytr9ila3efjstxj6h5tww5pqzv5fo6uybyx1lgnwt446azarlotmj03xd8pexv0ezoz45e3nsxtdyg913a5ek3i1vcf84petps5jnzktjbawbwcg9r67teu2mi7ckde7veual0s8izspnsfoq6qpdlg0xbkfpviij4dxe8shtnil3mmxvfod1xthqqo226rei268wdzf02m3syoju',
                expiredAccessToken: 1872655287,
                expiredRefreshToken: 7287120282,
                isActive: false,
                isMaster: false,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'AUTHORIZATION_CODE',
                name: '6ot48t1oq0640g0m4xuyc9ew0xwn1sunz2zfcaspts7jr8rw6cc4k7qayprgo0xgz2tzv9mbem1np70uvvw6pku9p6cs06qk4gu5rz8pzr1er2677tgm06sz6l9wg5zuma8pkq82mdzyensj6empivu9kfjj0dv7tfut16iz4b3wp4y20lburad5waye5ctykyi5l4cr3hozr4rdskq0ntpcvrwi17rk1j3pd61lswnd66uuyhos67atywnuogz',
                secret: null,
                authUrl: 'prd2ak0wiackg73wqadq9kwr2reqf948j8ryf860iy60yzd51gcccgoonutupqlfp28la18wrhydj8t6ppj71p3n8bgqt6uxf3ccqoqn9p7efn4cxcly09xntd7w62apm8ymfqzbobdnho98lc1yfshkvleu8kkv0l7u4ejfkhuauzqsppzcuypgucvb1nmr3dbk0orc1ga2cmrkp5if3u2xovcb3m8tt39pn0j7bu6n4zqwaa6npezxizpxxjikdojq3o0tscr1xvol0tqh2eijxs9ocg9fmdh1gjn3qtehifyn14la6zvpf3puadcm5uqzypk9nm3imqgsr98fgzmngx01s6vxdapsi06jdupv4ngdml421ty0hvv2l1hn0lydvwtg1y5wcrcj0h4okvr4xutmb49ft1zgw7iryykz6g88ec0rofzv9bt09spmyg72wd8s7bs2ryq42em2hj84reigqsoyvkrpber30ycoda3tdr0hmd8559ew9sdqu1wgnmdosh2cnb9ch4a1hitjzw5cr66p5452o0xafb7k799ckcr6c4phv7hjgncr483rzddnxt3wyb8j50ex49gc071x0sssprlhp8s08iegcaj3x49dofjfpuq8ft0rz9vlublteff8caddybye4led2zidxro8p75ymy7mxglt79vgfoy5rteg56ivm5x27kyyv7bwy411wbd7y1v7dbgtnedd0o84vjytjs0tk3z48adt6i7rzqwhnlwdb1c3vq1pua3qs9ix535ml8z9xb0w5xsas3ey2nwtvddmf1hl5jer6j1132ywo7nu60sn5a14tvzuj7dfjstdzjqeqdamo6oh2h5lu6zjb8m5u5rqr25shg09rf12acy1bjvny54lk7udlztdddxxgw86j2xgipq53r37ah1g38fdaj3cxqnptk9j4yx8ap9ek6nphtozb8pymtdvyissfszj5pygas8hzcrv0i7zb9jrpu88mjalo0nt5sl479014mmtty1srhmz381nmwj9bkqffo1uow2ylgucuk3p6wokiymyrz0ifhjjik3jnympuckujokv2fbc2y7eorlevc8tk607va0mnmn900tqzlyple72nz7lfqsawigbdsfn434i4u45f8nec7x0sx8t105sw3fyvqfl290ojydycu7dufivze9qm1i30i8r4m7hep4vjysst54yhw8re7vlja4w55rsse25auq7tdtrrgnzugg460p9un6z927nat1n5ykqg4vk1h1mm695p3o6u8wm570xruami3m3yhb47rr4cacb9f7l15w4l2ichn9hnq5uarscaix69k8qr7rz17m8054ehrimwtbnq4llz9bxmsuch6q45lug1zn6zy80rjyuen81y4xw7qshw4rhljsy61o2ipv48crjl8b981nqa4vmyn3xtggml8hazswipk5r9erwb70tsqembagsm6suqbh5grkc5v0eqnwsrt4j9gw4cwl6luq6i44hgx3c99z3rcta9n99t52d0gv108lf1zwbepjrdjfl3yu0qv2su9pfmrghq37nk5ebagob4cci3ntjkivxao6ps2a40i95y0xidlsbo3voow0h2ap9pduu0rtmg9q5cejplshu1aq7hntq8m4gdtd42wrl0uyqzagac61zqwe6u4d0umkhtahtdkd624kcytgzuxl5qp3ticug2lhuel0a543j24zm4311oci2ywdfokdzdrb85pvpwmduh5ioscs7te28tvkc6dt3v5dv7zezfesptyc1fjfdjdlotasamfqn0zu3giecq37wq8zhkk03cj28cfavnayn7icpc2jt06v5clajmof3d6dl6v83n0mggohwkb5c9vo634pl6nkvwl4ywn4swa8nnxehysudiqtja1v19btl9tmp4d0sgw6ooqjzquw2xhj84fxuloavy1yv88z70z9cjsuxzq87p59wja0tfg20k1wfiyu1350ro4tp9s880llxzeeflzbr495g8g3s',
                redirect: 'zypvnh0kutjk54uiqfa4gjlnpcuozqg6wtxzyzcezomo8t4jlo1oh65pcoax320o3mgq715vv7fhc70sgw6h62b7id1bxubwah8fbdt2ix7k3t56n06x88oblrsuujcsm0qn9l187d0jgouiujwit5zw9vyniadw4zq2ynajck4hey2zpuxp70lgki8efce2o038hw7qahvtb02yx0ofs9jyn3s8teei2i5dsvc3rj5rejro64hsfnpdv4e5s24pcr1sa78jkzf0blca8gjg5senjc0s6ag2cmmdhv1soo99heb2qztze0zovbgw07pl20s8vocfrtfb63pnzee3m6yfa0hi87guuij0m3p0r9pl1iiiamvnlnoite58dnzf7hpx3ws7adp9ohofrt6dhxc19z3ixdgmpiry6clo275o249p9uusk5a6s08a1o7v7uj1b5x5ir8vbyf5sz4xp20qrwc6hy76gq20b6ej88jgdt4491suu0u3mi3xhv2nsxo65qom64e4q57bxvhvq2g870rnznyc3qsh60oi4710f86tojy3c3htkgqwulc4wl49ru4cg8msi21zl1hta0g1q5cdd1qfpozqrp4jg82wvzysriycmbcm2lbckoydmdkr816pq0sfsncyh44hmgfm3nrtaljv689wbqarw19lvdnqy8gaerhldkc4xbdn43gqyon087xp7b61nlv1cgpa0obnmrwhkin41faik4ieci7xcey35xkoowc8udfcuo9r27c6gg0rjc56vsclnyiv37znqb261tngra5fpqngv91tp6h45higwwb6p7an88i4iccbpq5a89soza8nexwi81c1nn55crzqx9u1i5sl2tqftkl71j5pkoz51yt0j33559edlocb8l19sbywmvyskbv309jam4z0901p6thgzifw7eo6pxgj9d6f2ibqtf907wq7li8xg3ehlaqpjtt31ieuqu81lwk65eqnvptj8sbwtat3xacz8eyvs4iaybh42gr0hb46v0znsr3yne8tz4jceb332iz5cathjas9ngzlni71plca65s03ykf1lwu0ixwfdl4x6t6oak7vevdylg43g8cvw4mpmnmstl9ydum8ej0o8m1g29e4ms57j04yfq6trju3zt7hf74tb27tyi8fyozk446qhk7h59vxrysyzcc6g85h0ur18wlcjllqo4lmp0eahku85efi5xu2w6q5pon0kp7n32ccsn0p96dzym75u3cypld2a694l6xzutswhlqljevkxkb7dq75dgzcnjwylrhbw5i18qr0svzw15twaun2cig5e5feblu73c1zf14cs1pyhsx53x9ri05k9pzjetmanmjzkckcqaozvyz8xgqpd3d75x23v5383favtil3upaeq242hizhp8lsnj9kijpitmxyhnfhklnr738npq814kkhqhb20lee45vbl2jb9o3s2lbpu1mjggk0y6l8ohm8tlbad40a4fpb45w8n5nrte8ff6p4cmzyjpkpyb0qkqf5kbzxur6tax7itflhyoentebifrvcetu5sybeqab32xotm1y8jpokzks3x7zzmdxaqnvamzzcws8ckfdkwj09jmavmcn6ofhghgzyot4r9ggpdjk8dpehj5tjzvd23k0r9b5xo6x7d13pe3ium1hoq9wfqa6os4huv4xyx7ymvo9hcn2t0wgpik2tze1hnisa4lwze01ov7ohloi6fdgn8lezi8k9e0beb43rd94zg1e92yjc8wdy3jkw17fqdyzfjeq1kdq1op06pkln96idd799qkv5rsprlfqs4eyu6u8c2kccerj71lci3hs497ohycrv24vtdstf8h1vmu3wyhztcn2wmbshobcraxtxpz3bqmmybic1pmanxpwxwognlhppexf41siher4686ju4ll2thqsez1izno7uivpuwhfdszn2tss5jzypnmb9kjkffx5olr3vlq3no7t3ph523got1qpk1qf8z9kv2wa7pwpo10',
                expiredAccessToken: 3771937986,
                expiredRefreshToken: 2524833320,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'PASSWORD',
                name: 'sy6r4mtixcviuxwymxbcdd2ujm6bmygy000saug8vdo53h0i34ujq4drsuh4wvl6boo4s9y4bdgysk5nepab3q0ldua8t3w0mdtxsg6417cjc90rm6dj29nb4uaoxr3w6qsul8wc13wukd0kpctgpxsnayaevco6q6bxxczc133xc9erlt1eo6kpjk04vclwstmizetrh6ovymnmj8znw5rwqa6r2szd3x2b66ookf1op3seg8wucna67nh4dmq',
                
                authUrl: 'g9tryf3zkl9x9phhcfadthrrm06ngtrgctg164d5j7hs0bv2zwh27avpxubk7vwn0pvmvr2rrgylj6l15by9ibpknu3yqqqyzojogwv4ygwo3r9a4lws8ywlgwuh90ohpayf5o86tcih8vbqqng6ztnrlt0jmg4xc8xnooee1cufy75dy59gdu9pat3qk3gouhd309fcc4wmufggnki37mtyivejwrt41k6s5v6fqxsnk20itnbcmvpbe63m3whylyokh7ut3br8j98su3x5nkb0cunnom1uxk07mxz9myn1tdmuifsowsedvojrxtkjt4ixrmtmfm9hh079yajybmsm8uvhtk2umna7wpsuusyohewfsnsfjqce4wqptml8886vkxscvijhwbrhofcblc8b4moewkdd9ov17ssld19u64d5frnf91ykha4axwv8ca1zyj27ixk42e2bl5oa74flu2fo5k3hf1hz2roml18wi06l2vgwobonf3t0a6hylyagzit7m5t1aep6p39bj74cfbx4fxsnci3dod9g840bbivi0ax1usxmthmi2yxjk4pwrmm2f5ywxe5cgkjk19rf9oy4d7lo45etmxcqpgh4g1ed4h1w14r8hgfrhoohxyhuqlxhcn7xwvtuajxe93i1sywlwxtctsqf7l7j5xnov3m1vascxak73fief2ltshzfg8ipdpvvp4xm1o41zx6ex1pe2xv8q22hcg6umcknlnncz98k7018kbhinb6sbqfdscryhm9yw0ps1h4wz8tz4uweaf96rx0l5xlctqlsmv0wzvo7nxfjphiihzpxoz5v6bbmth02t79w8ysok1zbktftvwsu0pdkvzvtmu06n9jrhyy5nqsrb9to3z6820m9cllwwoxxyr6jhrgm0dy2joo0cfm09320t4n84jpruan2hzs2gmk5m484qp8wrcxus8614bm2pwu2i1po2ei03rzaxwg1u7m23l16id62sy46676732mnxa4o6nlwq9pshwo2o5ykdqre2qgby1p94aw7fp1yreq9h3vi7d3zvux19yct79wibjc4zrzwz2bfe3md48bkkmn8pigtkjh5jp5zidfrdknfwm9pp4ztnj827jksqhv6x348x4mys1iug1ff74mi4j1uw0lw7xaoxsdr049au54w79ipqo4gwifv03ysizq4adde9d0of3k92k55wnrzbitm2olbh8zph7mxaqdr9apbf8et818dvwer4jbdvxt505k1t5cjyc5objswm1pmyiys1f9cfypccs723efi8e0gtb5cs3gg11w2kl9jg774mim8si70zbyjwk3ggsajw8gpyhrg76kaiohih2xm4dvebpqpqn066e1wzeanv2fxmlbhswgym87au8yi881d784eghbb24qd11jp7xtevs1q5aro8hw1ckkybq48oe9lve3jz55tpfdw922z20psizqa09xommkh3fu37o25bwq7dizbr8tnlk3w7h25lval9tgzszb3uh26ej145olsfp0cigyn4uaakbpg73hn0t08z3srd3agu1p784ppcn3x8jh5bhv9gnrffxd3b7jwfpsbqz7ghxhgeomurs9ohwso415z9ns0l4pz09wl9lkhrmmdjn5jnfjieyn9j0q3f0gouymhxeac72saty38utot1ebeafxwsvbkpo3zczspfacntvbr072aeld8jmodphhsjdgoa5fkkrt05acvf3pvi8bdn2idkq4w1te6mep43f4zx6nluurnju2i2pehgcw3apjdigjbxpz7aej9qt872vf647jjx0uh9ff9pyyhxyzg29bbjv3rw3byg8ox7ucu3if4ntzeq9phh0co5hv7tb6nv1yhvk6db0ller5cs2i4oa22l8mdnuy759rqt6hu5eqscbo2y11kdlqi2v0dk9w4wsh87u64polkhkysju1tv3dpg2syiik01xtmdcpl0h5ro65sbyd4vhqdjrubad7jnjdsvlc3sehrb3501li87goh',
                redirect: '7a9xu71rvnmzpv8uh6xjeq2jefum2tppbvvnpmqcc48d1ar6a0jl5e2zyqp1fhquz5dmispl603fhepa5zcknrkkyywi1lrob4gqwcrytxy6ku5lz232cr63hybw95a46hqm1xrfbjyha80rk2zru5n82x74p9odhmg4s5q34jyq4sebc5nu3f9b3iolfb32hn852ymj8u11wp81uwh6knijbk4593q0k5ad131dy9j2vmgyqyfhms8c85ijn2es4onduhb4g4hho0j713h16rn9gpha1c8zje5pbv6kkqcdr8tttrq79y6bx13ueuhowv2w15xlz8urmy96oiy8oa9s22ymk18dngk7s16be9dbfg3daxn8mq5adkqd2xhxapt3vq8wn0jox6s7qpxbu7mgbukab6o0cejy9qmge3hdjl6i3de21fvm4v9skdysvmvketg8h6dgrzq177mapf0v64l9ddcfszq0oyu7imrllf7800jcu2ipf0l8m370a8jdu05zuo6jdstam6jy3sofq7n8kw171gqc3jbl5luyyqj1y0dpd8ijtk7zj2r368rjldrjs3eutk08d5wb2nyn1kjk63lwftihcg7azbu8najkj3rjcgsbnntys3gxbjrvbbz99k75vxxl8detgp215f39gcvoprnzi618x0wdfbplhdnkhm05ipo5iwxokjbhjmu7vtgq72yqotelehfkolgbwe5apsrrqj56zaf4vwcb09j8i8487s4976owv599kwnmelxmphxiatrappnlhf3fam5d1pxklbkq3t9nnixr3qy4ueppyuvd3w67m9oe5t6izebjs35ywv1vqowsd3i7vzmy452aairsfskgby8wf3k43glok3dkal34e4qdp9ti8g6nf4qzn0brbcvrw5t4ypshn7znk9zan7rj5b4q1b7xly13vp5swwu8jvqwdyhs7z5sk9k8s8k5skiotlfmbjw7lem8mojwb7vnkh36oxpzdum29k6as91f1jl32gl4iacg0i3p58mfs6slkwyy7hdvjcogl80r6w2m9ukxmge5eys2iu27pky701iyoh6ndabaqjiruox7097xhxoeqsr0ity8r98nvydfocc574wzxtupeg41i5f9vouphkoqq1jpx6n3lh6xq0zpw02nxen4tzo90qqbqdk5l50ckpmfmxpqbrp1mr8k23phznji4v6clkwi2hs3nylad9lcd3wc9ppcx1dtq4ce71l3p2l6009yelr739fbm09suhr17udemnt8o8t3i2scanz2et4sw102dcujy0icpwhqvt8f0knk7feq7f7vxgmy28umwwjp9pzt4ozsvu324xx6vmt2e0pqau50hufynt56we5ouu2l939lxtyvefbrrujo4v22r3jl5bkd7wn85ua89ymw0uf2imve0wwas422tzycvvujssqq15j5lsycoszuejjoqorf4mut6tig7nbd7jbhgnjlu67m0bg8q7wz0tobqxkz2an2d1ncuzbm08kbvsksx0601hlvo2vls25tr1qqsyczhpxqy0qxxuqw0a7h0otkzg76idtjtjjyahb31kbwz82w2cmsv2o2re0xz3a7rbqwrfn2dcrf8x4qmkbla6ry1285m6mlwuxxo7x1973gukzhq3ahq0qrbsdwu7t7w72u22mdp5q179e2tvixdjay5u8q70aqhu3g4kmleakcddm1y2uwdqjpr1vwfdti2iuqf17e4y8s1eg6cegk671n87rrpyoknpr31kbbjf1io4xk4nv2lje6x0av2lobio64949csvydmsbto4eh4a5pew92z1akyt4s1dkbxn8i87dhmvf88ylmqm4blxjiiuoqjpwzadipopnmugoq61402beiai1txphftwdwin2wdik79lhkv2z5uvdlvzb9xqz295slezlfnzznbuf1somm1fye525nulyj5t45uj96f1ka1ui3fyp7kfvxitqwvfn1hn6zlhdv2qneqvp2pis0w8jq5aq7',
                expiredAccessToken: 2380012977,
                expiredRefreshToken: 5754001920,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'PASSWORD',
                name: 'cxzqyzgt9y5absu41yf7h1ru1dc5e9er3qcottymqsubwpesau5gz53a99h2o3fqv5f8euoorglucdiyouhbbwrbmtvjyrwyzniz92h34utktk1n3jfr4nv8ovuyr41jd7q8efpvhacako3o6kiv6qlmvrssvy5r1atszgofy36jprckgnw195ud593v6rjauwid8u4oj5fl13p9h5mkaaccqdsoo97a9qltjjli277249hx7ig4rgc1ho6hgkn',
                secret: 'w9gpayrwhi4cp0g9gz49pcsnn6hx6rteomwqahp3um0ets3d6q3u1n5nsd4yzpkupuewi1ic3m9qdgcj30nj3lpkx2',
                authUrl: 'ejx70zdgoyjh171k1w69xoi5ncjxon9hjgyft6u53fljur7xm5gly6kr9k4ksmc7rljsl512wcn4kwnt7pr1pjrdi8umf3frkxeebn327me739vtba0fywoxc5vpfo3fba8u79uzrb2ue6epu44t2i54i3to325bzfote85mwu8u5cn5jig8upwqaqmnly1r6ksemege3al5o25af8xyjfsy4bb9gx8c6b2srob7ifgz87fuuribgv3qhbs6ut909b8p7n77htjtndw6i9tdkig67wu4up242b3jvyf47znvjvsiy7hpgc7iaxhrpgs7muyrpu6szq7avcd2o7id6e9p4wkgbb4f4k7majiyqrczuehr3r7xrtqsn1thonuqv0plei7mdmumx03832dp7h38uic5rqscrr76iqswagyza8t2mxi9qy6azjm2vylujzhgvohjryptk8p5o2ohk6riescqcxef4njk15fiyykmcbp0t8ok8wf3q4z7wlwvc5urfoextbnjs9uggt4id5zc1wisw763y33qmbb3y3860j1v3opaubwcnpx5wj0plo5dq1nyavlk2sjar9djb47xon4s1fxu19hd6fb0ivc2hz0wa8rqyzn9mscjsomcajyfd0ugs0cq5anxtvneeuons1vftucwxfcrrv457jaeb58znc203scujygx7afsjeh9g91u20zx30pwy9gwccpjw7hs85tufb4t3ombe4hn94ammzpq0ng0xt5drxz1xcv14smrlybtnqmz239fjbdgleq6kz7r2ikyietpbjgyz198ot4glrc2z51sbhxxhc0psobvk5ccm3ziktroxdy96krplpqj2y145bnjbjlicf07yw3zz6zd5y94iu6u9ngyj0siwbrim11t1pz1d6o4736ci44nsmlsgj9ze9y2jqjpx650uyyvnnapvmi0ar38u5pp7pr9djc2tm1jmcagbky0wa2h8wdvfw1w9ksy7szuwb44p5o87dj8zhixc6c1cauo4y4i9d1cfb7b39yrg1cu8e8fjfckrnfrwyatdpwpvdmnroag8nn1j6mym24e8rjauda4mxbjdxsandk6w2zwpo8maswmgbvqokcw1ilhufhbzc2u178wvq67xd182fuv3clxi91xo8z2p2ccno7t1k9id0eoqugv1v08p1w8s950ocssbf929kpbtduf8gnje75htthj9d27a3privvn5s61bo4v1aihdi94sb9y7zfthwa069j8ev1ngufntlxb214saxfpr2djsvn50md3mwfdiybg9nbfbmcjzcmpm16linel39el5smvz47mygx08ri28htr3b5ugfzpkvnql4bxl1watdqy5hp648q6l67xbpvsblsm6vn22q3gjcenyvsywpbhlf2z9yez1jorh3xliha1yrwilucx7ccqsembobs3zwddwm1pfir22ngrdk9ns8mmphzqgupm4sgvhcvj62ni4t23h574v6dtj9ju52o7bx1qhtqc7b8q912jg4xyphzgk3kucdgdf7fzi7l341m8fbiho35vfd3wejx4gt9zxu7sajuidor46pnjhojnujs9iuoq3x6v994c671qbljre9jsh9z2aj6z72isxcgw5kx6svs24lelqe41gncengx9vadve6lh21ce1k34iv9ptun678aj7zqh8wrfnltqldisuimcyzvywxqzmosbl8lfpci74ahx2hf7ppztu8a0h8ffgtwlxgn5gk50dsnm9drp8mh3s4g1ct5g3sdi50ut3qz843n882az07cfutfsn764rk2pjafz9qykl59tzyt47hcp7pmi0reb2gp9guklvd5nnrnsezq1f7e9e77cb6wnswnd1dpwavnm8xbwmyf371aaqjcib2sr5oay57vmeb0apxd2gjjsl99q580oemcwyuarcnsnwjst53a4b6902jgnzelf8iu27qq5ykiyp8jyu51sb20916axj2ko4rxxhyxtsy73y8snpzapgdut6t89',
                redirect: '0u5t1ambhka0oywhd9ql2hh1mg3n9co02albn0bz36awglu8uackl01fv89sb4o6buuwi8gjbyfqpvsb5hmu5s69yn791l8uarqacks61dqeulgmg1kgv1rv71hv8538g1a0gtop7qrjmzgq6pmu3jlr42zv0f9sfpotxtv7srec7k6du7soex14wkexx5ify9tbleqlq4w2wvw883com6amks7bcefv2n92meb92i22jzve0ri51n540bce12bxsjo5dq8eqf2mngphjs9yccwl5p1nyguvwrbv6amp8wsaswbbihwqycw0ieprkhbewdcmym1l8z6ndr5i11woyvocizouq4y8h4jtock94onb49wwvvvezldzj9tly3u7n91idcdq9pg7fe60g5nrhav4w9jhw7qunmhzsdriope562tosle0psq2j0qld4nin4rzvlubh9rgd9x2xlxqjs2qauwub3wyrigtv2gvaez8dtgvl1qbk7mew7llkslofn20mq3bfuf7be3sx58maarsh83qautye92mhszv82ft7bjcvm1qikp3iqqrtomhso9n2viiswavhie8sg82xfiki44gtb85u5o73dtujxgxk8adlzxyfpry0uwe8v3g5o9jlnwpxyin1ywd96ncqp4uikz04u9u54g85zdq8pftgp4uuxxtv4e35zjhh5nohajhnt8k6s0terqk7unt6ticvwmul2iqoummw480574bu1vabn8s9rmg4wgffvxsvmjmj5gqi9et0jzy5lidks4x7lz2npfhv94sqxekgwslkammk3qcofkilh8xg6g12upvon9jkhj8tbp0alf9d1h17x965u1qcz4tqeo7k4jy0zw4d6ibyp3ey5x57lyqaaert8k015ihku109k0vn7rrydrbhwcnzob2lzys9on7ln8k7o96hz2o0o0d0unyvaouamwt0g7aw6jpz00wtcesr56rda7080plbd1kybpoy6jb3ri13k9qehhns7wee4u0vvao5xuuy673lsfc9gf9db75tw79yy10idiiblm09igdo01qwy11vnbkqzj0985mhblh996xos7tsqeleky0gjyyeyuky2sayz6vcinhgpe0tezg4jzlhyxurnljcfli781t3wqtge55pw1etj8bl9oyei1c1kx563c412b4rmkiytz5856vazx56frl6y8t5vimthlgvm342bvf8q8wwf4htjysybk3db4ymbnq9y9tk7jun1x71giap933w49swvrxka247qdx84ypkqtq48xgvedjxqcu7g5r1y9zxkag61naqnlutw3nvfrrenk6xth11qkqcbx9w8dcobwsi5h30bn33w57ic92hqlozsgyy53sdgfjsuji49cl3ad8hp2fiydommx7nb0sp3qn8xxbu3cer05ke63d8ww9ads95yy35ehs321qck0j9dlhkwqm8p0ippa7s3namlxsxidxjr3hkzraw1y1teocbrl1nj3kzsdt630kktu2p136tav2ip5ajc2vfa6fh1ju12uxc4h0ckc33i70rgm43jbsqokqk5rpw1ane0lnjqk376y3chirq9snpopgggujw9fozrbq45778dlgqxg463rpyj2rzlbsno3ct19kv6632rw6wazrknug4shbs3gabtdxzyulfw6d548vhne62sjx74mt4x6bb7go0actn2m6gcga2b8h6adrw3cg0dxo9u7d4wn04k820rakto08ff6hoewxy3ku3izy2mlu8tcyqnq4mloz0m8i1lgyuw5tiupecm0eap34yk0itqtfs84zmh73drdk46arfi1kmd5q5tz7m1xikaq21pgn2y2aqydccvy2bzyqfadwqqn3dmwso899mk4ofa2khjekd2bzww02ct9bwiq8q0tutpousp01uwed2fhh63hnr3nqwqvs8jqpc3x4w613jamwuod8jteevrpdhzc8047us14iqz1fanu0kftyss8relf3xxvieghtpz1w0g8cxaak',
                expiredAccessToken: 3622588349,
                expiredRefreshToken: 6536686799,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'AUTHORIZATION_CODE',
                name: 'bttev3wh9emty4zn2sg9edvzuwpx9m2gugrlphk4jjz86rh2v3tfsfnf9i6re1l5c0ebwaxmit15gez3g98ub9q6xr5nzeb2hk89mcnpusptno3flrm7j3u8x8qp5sy9waces7bu29eyn3v2mwg1er1jr8i3z93x4lsoe1srsievbumchzl5u5u900n99mai7v0mv4xxxlnhqxnqy02ut4dfnx5o9fp15kkw7xdnqac5f3mlf7j64p7ddvvh2o6',
                secret: '0j6sn5mutyjxk54lh8ti0wg1bxkydf4uxhxjcbyhrahipvn23p2buebdbjc71dmyiqqianq3gnxwfu78u1snxcqe90',
                authUrl: 'a3dukyxsoadr3nb7cuwz0is2ome58ovir60snsc4kashg4ibb1478t6yusxvkp4xkbr07o305aotj2dr45tvhi77ga97xultfsvptidnhxiivuah3niq70pa2nfqz70engrcltd8tuwhrg7zo8bi0eu6c16z4gokm84d20yn8u26pte1nlvfcgh21oxesuhjgjeag061s1lwupdl5p6rp86uzygaj2hcv5fype46ndyxgnna9s37iacm8gdpnu03xzj61blifakf4nkqjdsm0vze7effm4um9ecnduop6ycck74jf7ldhheh908kqc5cpew2wm4wcf2spheiiji1naa66i7fe0vq7dt1vvgehr1wcm61yl6pdpw74z7r6eze7g44mqdz0k7u64gbe0g4yop22nco2jxy2rjkvru826wq20xdmp7bb765krsfbd82nm1gxehzvcp9zrb9e951md71nopj9m4g8wwkia6n8xlpbrlt4cgqdqgvl623frhdasl8g5tl3xp737aphm6vgjetuokan6tyovjsu940usqtvyleoskcxn7mrx7tj59lyswrde7ngh1bjtowznfogli1rl4bab5drzib3j3jw21rc4b4awunckfrt717r9vfnq0x54r516ecr3a5cf68iwlirklfm01b1doddqkw4shsqdoe3t89sz29lakuikxz23oz2xy8bgth4sg10x858msm9l9zv8gyrpq9wxmt3qc2edmatx9xmmu9awx53col7xeztme6way21bra0e7b8jxqj2vju8x028suiwlr6b3r3zl03i7outl1f5hvep4s3chjp1en52qp2pm5aezss3sbrxtpbdarycwjmbvnddfxqawrkjqi83ffog43pi5nenfcve98b9mtxxixnw9karcoqnprsguhl89hy3f99rwkg8qd082nvwmnwxugkgl600wd6gghe109j4dzmm9ldyxc042gu2il6a0f21zmpxxf5la3c3p9a0w52xkd5k1nkslcy6s9o9q985xyyk729jx3s6f6knwq1m29s7bauaz13ns0huvbms0m1kjqtygpxsholgmmi7apop0k0gsutl4s88hx8uhwojv7zoy4wqzfz8vdpqe3e9p6in0tgf5ozqtsecjqa8l6j8e9zkkwkif7g0ucmlo45msj3nbtn1ag1djhavnjh08c4iiuo3tqawyv8wwzi8ipm64qdbf5y7bw0ru7e6mqmj8pbrrkfxx59f1oi7a6rre8uzn46aj9bnxhxipwkztxdpk0mqo44hnvehhqqu5suq2e2vztzf2msydg2na4n0mnhyl4vcwac33dhpz57xty1whjmi7joxleexjxuhsuw9nujrxpbn289uvy43d9rko40j45d9d9rz6pcjyv18ylg78wbflzyiswxqo50mcar3jyybefnlh30xzd4mcc46aihh90u3ig1bftzsbbmv4xjuzkanb7o0agffwbbey69kl5dl4c18meeb58fnun05cppp69c8l1axkrx0zb2h9ders24w7v9l8b4cbt0ag694c6e44k7gyim53npytpp892jk5uhihf0f4d4t6uw0d4t41pg1n4dyxz144wljxfa0hty9161fmwk5vtekic9ic49ffr2yhnr79bvcpmqe6kxjxduccl316jryqdipyyzm9acd1uwk1l88z4qpdds430a6m5qwbi28bb73noqvfxgg9er2n1qittdm2tvxsm1tn6q2mtvjebhy0cl5uyoajetkevho3krzcg9hjhq5z8s7z93xpfckfmfopxcyuo5mo280u5wh2qsc75wxeiasorh6lg8hoh2p00qzrg9wl8dvac9tup0hq3i0q7ka10t7m6z9sax6rrp7jks3fg8zqqa03536om4f0w84q7kcv30jztvnw5p647mhij2yz44fjkx2vzz7gkad24xkik86kjsvv2prif388x7stwnf3fzri1zw6hlg7ul9faxwjac7uqp00qhw0dy90zeioy481cchp1seyo',
                redirect: 'c76st6ebeskawmfwz7sdfaxjj3bisiyr9u094ymiuk3u0cj8rtp1wi4ts6uo6jiunkm7w6ucdxmrzxjb03mildk4u5pifehc4w1am3pc6z2oigrzk28adau063effrop7nfp9h0tuy5e6ow3jywzn7j53ac4j6cxbej209yhewrajrxaz8tseizj3pzywjantluf9cxcybkdc2vk9q2a79btyxlixxxkhmrtgiqw94w9mn19cf1d2ovxduouhhc8zm31no5no4j2ecwc2z9impd75siwra0m2hzvl6r4mby0zdjvbr8ubvd26mdq2076mhjznxavcufs4fgbc6wyon3ycswtgz56zd3nsqcdgq88ilr96on1my2i7xjfre26nil5rtboa58lvoq5vrszjiagyerrmb1u86mqezcevk0t6m336n40by0rnmo0ntfwkcisjvhdpqmoi3tssia218b41bm1kt9mx6fvphsgl314hrtvwridfixnq5011fag6ydelsqf8p5tv9u38k0s5xhjobtyjqiswckv6ssldfm9mkfvfvfxh4s9lviuc0uqhmzzjs6e0i63p56dp1wsdry29jm5hse10a0tlnnwsbulem0yamsfkxx8gjnx8ew92lnicc40oh8hmcnaad8zw68jle2yzths70var0zit8jfgifvomkfkjau6q1rd6ltimljkdsgrdoy3mcvuknxircorv3sovqle2vfgy4zoasz9jxozwce3hbt6lfi6i5rmvtpk0gj2annek79nz2y6ywmz9hsb9uxyy8b5lue508tmbnj3m81chvu57u6hol1ni0q064mkket9kz0dk569qgywkndsvxg3jj7exyzwq3c2i79ikdgj1zqjosmc940wso6vj34ey52dc5rd3dj8tf4ors542klg0yqm6e4g2157rmjrv4q2t6wwdeg3m60grku3rve0mq3uqsi4l9hhw9eh5oyo36ty618epxndlroujsatbkotg4jvwa08n99a6w3tff5oyr2zg9van0ps7ue3ha1fk79bmawdp3n2xfikrx9a58c88tyomapbh8o76cn3v6nxcaz7glriz14ypm8dv9vzgf8fs4q9erguuk6u3v3iuh2vy50cmancjkcbnoxmuy5zflrrgdr4n7txcry70298k4lvnx6wkcclu9r2dt458jjc240jy3mqr2z51r0ktqliinzibz5j9khu2lp52m35nrvj2hrf84uqe1enaxkuye5gq2zs72b93lzzncx0gqk8os0k1mq63joewecqlic3ups08jrjrsco6bvwx32q7a4kr9wglfkgub4vvr2cuzkm5an2sxcp4ai7k37zw5r071ijf42ad1opncstx5cmu4fkz6s1qgwylqh6j7hdonzno1uqrr7d67t33ehlbyj65eo1218yic008s837hcrnb9sog4as1uc1iwq8o03p7dd3ec9zgiltbihgl8iwl8ke2mkr2qbgn60a70lx2zmipl93t25lrgq01zrh967xuw17homi0pmy21lxgb4w80e8ti2vbhbldmku11miza3amzlv8q6os9o3iyeipzfyod8peb43gsc8wczb86d88idx78sfy7wkb460mcnoer7o9us6hjwt2wqwvzagd5bk65twx7f9dgn7dowo9pnjsq1jcomo49u5afhw8ezpguxswdp364u5oqo2cb21b6fd1k2ama5h7tknr5cyog1fg0uq7ebnumqm389pvaif4nkwxbxfckusy83bw7f6eht1ameltc03nq91hv1ozrfd09q1cfmvph5uy1gu503c8ww531491so5xsvezn3659h293xo49uvkupvla69evbc9pvbc6cd0x49dh38ctz5dc38b2yhus0k9v6p0oa4fua2ew5a2j5lpe1kyh6tpfezv5mulqw58ygxekfj5v18a2c8zu35gmj88vv172mfw24o198mxozx48q4gkza6zehmugie0o9azgejk003465prpnrcwsnecimom887',
                expiredAccessToken: 3577265515,
                expiredRefreshToken: 8806793271,
                
                isMaster: true,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'xs75f5san9nguenv840w5ampprfozoqjbxxbpwymxjtz1zs95ydnejsbk5clbragpjo8ameniyng11up2lkg3c591uxta9g2i7e8ugea07p3lf7ykir5yqy6sbgzr5b4nkh5ys5yb0vnnn1y3d54leckzwwej8m3i5egv5u39vp5lajfoptxo0cpquyn99vcdchvw2jsucrftunvb0q5e9tbq96qlxvbj4qp9wc11s6xpezo3qeq0xg3q3uf3le',
                secret: '9q1wfs84urw2mpi30zd2djve87ahq0ys27t4b7ecnfxqzxjdjht9f9ehwb1bsfumgdnqtle5khn4j9tlq8asnzqzrc',
                authUrl: '8z8di3n6eg6hakk2mu0aqe4tl7fa776wao3j7ltp2esrmymig32z8o15go4qp6pobl900lxmflq7loofflj8h1xofrifp739r63f2ay5ct1p6c3fz41wf7wivjn1bfz7x49tkb9rki7sfxrrm0cjocb5ukxzihwdiw7q4kmtlj8acouvcmte907e4093pop414p0lmtb4iq9rvpivk9u64o4h3q15jprp0641ijve4bh8fwvqnll5qdhy5ri7cryxxfh6xabtwn0q35ex11gwdwk53o76h3a3qnlgvsrx3v4bqlbuymnp2ttoi4b5v1x35w189ard1nbjtrkuchyh478x6phb97i42774nrqo7if1nstu43j2lou0vkqunf32nkjq8obolhtdq69vbq8io8yw1mskrzxr1aemuua7iq099dnv4vmtupvmm4psz3lg8b6xcy3p1qjry2wzw0c4k1kcxm0qz7b7qyqp0zn9q9v1x0pyw04th42thqr5mqa9k7zl11fkw1eh71smhsxj0kzdf4nifa6jlcrrnklf7n2z3xnf775am8ns0d45x3cv1znpgzq91uqp7gp37rkn15b0cypjybrtejehz10g3iryqkmohx8hmq3idtiq2ncx3xrkdl24hcrjwm5uypins1zmsmc76czb4vxucfztpumbetpvohf1chjlg925z4y47bl24a155c5dlqmqk74mce9pwvvzuy4pui5zso7sus69hstdyaohky9wme9bvbew0bqbeqqkt5k2n2h81eah5xvirp6xvnjoginvpwx6u2dpbuizik2lekkzg441wd0c8rs8bgaqj8xlsrraqe1gv18ztpon936nspgaq988736jpbk42ruvbm7lhoq9a99wae3o6i5hoc82whbe94ufetn5fe8kowbhtxmd5vionze2pn9czph9sparvj73yo0iw1he01jfftpm2rukwjof5mhcmvixlu1yg525ojr4tft010e548jji6y8z53gts0bvcwrag7st807vsuqoje6vaawm89pvwwprs1jiigcpzbwq42actv3qi8eol5nawb0dz8qzd3xfka0sirsnezr0jfp08u8a0pxxdstzbvt4w55zs90c12r1hm71ij0zabyqr78ndl3x01iasivjxmpt2le04iynmiq90ujmbtxa83f05zvg5dmqw2so8jp2lijjkgcol1j69nx18po357ye8y5467925xgjh4tljw725ievkgkmtx3pshsv5l9puynqiw0jy1rq2yfcbpocux31o895mc25m5evfvi9onutbkwm764eujz2cwwg1eogj6h2q2a3lmpku0l22smr7l1vb73mammafhn6nds2yamplk0vbcbt6gfpowso52ng302brldyil28o1if120mnj7ty0pdw9shfht9pmk7pf3o478hzxjx9fn57d7x2lcjpvfi3xb2o9getou2qbti6c7uewaw9cklxhh2t7xkwe41s47xzshmkgzn21tblucwwz0d8tmgpsigkmtff20olbc6eahl5ngk5gvy12hqsffcrhhhzsrji7hc8mgkvhh3fuh2srsrjzg2qpudhyd1278a42jmo0371eu0bl582huqfwzowh5fx66gijfih71yoewt0uypc5xcglgllcbclaeojrk5210xnccuzv85pquscbafl5w7i54xvoa12tpt860bb4atb8fsipblic8b8ixn7k8vjsa3dfy6xthnk3t154qjfsls609mzp2vy6gwcfagy8w2rszh09ga4706myzk1h9aoesxvf46e7hrgth2ebgyo1o81a5y5529b97q4c4fuciz4y0djg7sht9mm9z2fd8f0d980j8lai0jpbaz6jjkmdfmnymc8bjy7t493x0qxol4dzmo4fhnndxahji8m16c66ej4z61fh79o4v9y2j615c9owzkdp85upup7b22qf1f54pykl8gh9v4dqtjsmxsjaunt5ioto3symtvkcvjtdgad3flcf1xaeyhiq',
                redirect: '6fria0ye28gkr9mkeqo5qbcnn0ac0eopf8xisrprhggm8oowd7nvzhkgnu3v854qrpn598euq48b0hohr216ooohgcvd9sa9ejcvug2efcqy4291u04hc1sk1xx3vp0ulqporube30vy1sdgbuef461j8czudsegc20a30l4g3yrt1tutzujxyjs6i0o5u3mepij7g68w2zo96yyigi37v4uop4ufk0elly7hrhukmay6z8z7iqx9xdk9rzaqoixmr5yqievmohoq12u0446fnrle8o1muimboftxzvp0md8engs63olg68mstgkhwjyg1gqiiz47reuuhgqk9xu7do8xtlni1tfor1jb52x89kky6xy09heo38o0tyk3qt3gm87beaexnsjimevu3q6ur7s6zh6jl1wdce3ks3tnutw0ya04musfzo90xvx07xrt2m2t7ugf6cogbh5g25opi0yb6l8i6xkfcnd53oqwk0vocpkokxseophhxq4im2gvtotfhu226kjuspnzqwxkkeld2tzy8zbform0qboaartjl05jax5d96z19rr3z2o8wn5ey0q7wrdil7v018ib1yix65zlxa87u2ueywl9ne3a0uh3a64tskr2jbe37hkk06kslqijzhkjxkxfoofahuikpkvyjbwf1uw9izt1wf0ltqk1lng7hmallet23kff1p9jx7oy244y0fn275wodeu001i45se69dcwr5rg7dp9r3a3lpvor8y4y9n38bpaq7hu01fh4jmzvk2vbbyg8r43kn6ii05d49ewl36qwon3gjdyovigp88tttc89awt444l13xj2bnmqzhsdqolp9w7d2euxpr4d80g0ntjqlq16ah39i167qz4rlxnz73rg3ta0kykaskx0bkc0emcv691q9iairyonnvqm2z0nwj5z3bqirp17fdzyphjcx2g2x1kmmyvihfh10gfxh0ffggoas8pblmzpnywj6f2qsqw2gr21dr4nt1twoy4xkpx6oss1gp5izq2yggah77t3sfcgwb1lpwfvhdvrof19d9cbwtpsqe1f1z0ycjk9lo1evzrrbujj97aiwmlhuq3ozoxf9pkqhlffbuef4w2qj98k4cq9e4agmn4pekobukbr1jov2qxls2bio9pgw5mzy2mj40lgcp8x9chyttw0ahv865g2zyk7q8dnpzb2oomzxk1n7nhj6sg797cdi0gjqcad8u30q5ibr7oq74fef2dy4q0p9zsqkqeqrfsddpnx9tphai5j5g66su1qhxv8ogaqgmdpu6kfveqoa0bhezulnxmwccwpx41fxtxj5vftdhq5bf228861z7dbot9kbuc4fvggl6syq2pfgpqmlkpyfvq867fl09g8w7bteawa0x052jr4v1rkgxwq2qovvsvfsw8zyzkvop7ifogigs7ryqgurn3fpz3kwhrcj44euk99mz0v2ytxhjq7wpe1ontvyojwzfwy48ifcpb5wb8sbrohiokp5z66j1zhjql2ocuaddie7m9cnn589mejfvh4jz8xy16xxrsog1eduyw2hu9b44ptaxqlbx6299e7iyjyh3062bymsfywcrn593npm9zy4n3ues2l54en6nm05o6clgdxerqxwwkj3p97vdh4t37gd1bbz2a3cv611d0b7dbu69kpn3jec92khd9ojprwhbch4vyfo18a7ge8b17o6jrwsnvknemwh7veeym8wjs299ac6v4tsu5kmd3yuuh7rnc90zeq6btbkaokrc2p7sngbruk7wb9vmvqsr7vud21234ks9nq6c9zbjid1jpovwp8mhf5hyyd8h9iejc3sxart4187xgfgwd2j36orr2bxi17y1znvle0tj789ftk7wv2c6fl92ff1jarwgyq4pdxp533nzg5krm2y6oxkt17u9gkoz5weevbvrth7gc4y02ohj4e5rsh52oylq5xayl7nxinkw4r8iw0k34aofhdq12hbzlj03dqh9y97jl4v48mz7hbmnt4z3',
                expiredAccessToken: 5135582812,
                expiredRefreshToken: 7959226811,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'AUTHORIZATION_CODE',
                name: '6ecuq6gvjrgzfja76jtgu6t2c3z4quifk4h4r3asawihqugv6morxadnc7awmia8jjy7kbu7atln71gpiy8sanl6kr1wxn9a8yxoomsq199wxok6htqk6o5kkqjg1exhu62gmpzprsu5q7djvvsjgkh71yx9n16nz0b363w26fqj7cpp71xzxz05cob27da8tncnfivo0qrn44b6bjbsoul6rut0yvdvdcjprxotq2x7vqmhb72umtvvz6ri1oh',
                secret: 'ddbw6vlk1cx2ez970jwwesqs482anj3ekspngb5g16p3z7kkqafacbjk2jvgqafexg2wicrkwl1x6boc0jebmnnxhx',
                authUrl: '2nhqvrjp4ugmhcp13vqqui2mbyz9kmyoktgivctoj9ria8hjyio78r56phzxhk45mmt6osnsp2mrj7fel5bkgxh69mblfymypipb3q1l60r6ber7jkdegei5r2q5uycgs185lgp1eeya4hn1cnx4mr7kjbozhklqrulp71gw3sqeksxtn69e2d1erplyap0wig78y7ii2542k3dow13ypxstr4zyga01h8959i8o0x4x8tf66cft83id2tqgwd4pw798sqo9x2ootafw5c652puwdk2qc1vqynxr38v9yqab33hbkxj09w6m0zbe77i24t4itgv8tj94n5cbb41mestntvf76tafvmb9hvd73nxgdjm0hndkyaf2yndmiawsz718763dol8uhmuuxu1gogihev1i1irvxih53207499a1ypn507ij9k1ycv4kl98g7w0lr6smgag91bed3c2gm4ck7zyq9sz6ovl6s5i0t90i69thpvtyv8nhmjf58ndb5jojh6f3g7g4l1e5qc681xkgiwu9ofc3qv5oi0gvfx9crrowux2ovq7am8nj193421xb2fmsqfqz1lw9zl0l71g42zbgu7t9k0vik5vdan97ro945mzz6zof7x80ewdco3zur812p7roew935tiqcy2886q3tomgumg38ccvtmg7l0g43ubvgmc66nbv66pp130gpheg3yuko7xtmvs053tnqsdok48qc706915rp9jxgqxcrgbw6pgen61l7bdcp012fugjzo518hro1tzvzbyzqq3hxoy5x0y2mwe3sic9f0evyg1ygkzg0run5tizr9tmyr724eqylzqhu631sl2ga55xcq4zwlxcum3jhzmhb9k1ybdw15zuxus2thil8wiydvmizpn5azlsrvk4b83cojj24mo4jdrd06euas2klxr5qod55tq8pppl9pz06jzk2pxelktnudwaoqvi2mvcgfnosm0ej9sqt17mlhqx7o9z3nvh769twuygas3war4xxvoq30asppsa5igqnueyraoceb8tip845xh26uhzmvk15hzh7nsm8ou44zcpztjsz3n94x1di0qvxijiykfg4wtcikjh29w8ugoy5malxaz9alky9ijpsr0upgmakf75v2go4g026m0qi4g8ipogqgj2mpqzpwm1x8bnzh1lwuuvw842mpkq0shz2k9kbq2yomao5yhia4f08ze94dcci6hcg8zfjq27gmbz1q2oj89s2u6a48j01nfpbnthtgywwp5t38tosgtauxja93osvu0vc8cex7euc01ritq74blsdw3g2k57tpdaxdfx4hwpus1vlkj0fpdgstcdnkdyvug29d7i8vi6ncq0h2hemrfxd2dyi97wh4x18jc6hhzhxe8fmtw68z1kz5qpg4a2vj1wlrbl1k4lk86hwp67frg8cm56i4n5yx2ni2h2pu9424c08ib2pcsb8dcfnx6cmibo4mjrekfliq84o3hahv7ni2ksuudaep30of0uci19pm8lbwrm0o63ghonukm8qqsiuhmx13exb0wn4g0k1qnsm3817oxzdo845z89104h56fxmmtyb0cwhin2uo082s4caj5e2wy3mkez2uuh7p8qszdmasbbdw3n3iy1x9sc8m5hmbw547a98yizo7tmsa7ceou2q9cymzm6vfne772hvc8tryatd994p6g3a42ovj2yf2g1af3o9wvbupbsbz9vnw2c78lafrh168rtovnbk70i4p8a64va9xsplizr71k0d92y6h2d4ic8t6gria4fzxm7tn9b6w8d4hpkuot4n1kmllkp8ydi321ndmdxyi24zfv5uowpqlhw8dfoqrq0dgi2ai6ejivvgvzg3vxq4rvai29ayon6yimwks0tg8k9lasqyczvyoc2wvspkqyx72a27t1lq3c6o1d77sqo55bmyqdueyvvwm8ot3s7ntjwl8sqkbo4zfsy2ytbhhuv2r0ghoft0spka9s05uwvbmp5ukgbafpoyf6',
                redirect: 'pcgpymsi0s1w8y36fllrjj4vxxc0cffkv8zxh7oadrt7aanoc4ycgj1o2twf6atdxvl1h8y3toq06w131k9ndlcnzkodai6hpldeyyqey9x36v1oj181raj2183lpips5aawcd9d8mobivyvpej99jslvekkv5b5790o6pr1trkc6dh5gcjqjufuc5kb792sx928518i98whtlusksjb825vr2sh1kw0xfvoxopjf38y616a0uc60x3f07tn199bpro666icuayu6p8b2l6h6vv6f9wj2l2as0dspghfn1qkgu9emeop0udje94ts5nrhhf5pj3d4whzpfb30cwaao0iwiteo1efv5xageev7eh09cxj9ni0e73jp20rjwavrx8o5a5y588wcvdc26du01jbcw45czf7d08ns8pigbnsj6ok4eho4t5l2wglpwmyudg00tsbneofbhdqumulv6n1yb1zw673wkhjqfl85iob8bd4p7os8wy9854u0uhegr5c7um90z2krxsqafu20hgj3osc0w7sz1yz5t53xvf8zyyzmyelmhz79wps55zbj0jlaws3noybzok81pv9w7q6miq0cfdze4n8cvonj686sxulk6pt11d0k7yb05u3yj6crd7yw5m9y9f6rzowwag0u49mzgguvyaso71ldkvpy3nk63kttbaxfloddfblyuirtknlp0o3ito0497w6bwspt0h6eai17eponyhrgbbdwncmjcvshe3tmew7rr9sz33rh6p75owtjems04vpuv02vkuaia8z5ift8t8hhjxrqzrcmkth93ami8ic72n7kqgh14i274pwps9syglqw0nyyv32hy9greotrmfguskf7j1s17a7w8qzqvr97b2h7pxfpsjkd28u708akzqang1xdv1j0hadhe5qdc09pkyds4ih60uw5epwanp39zvnbls4fvk5mgtip5s2a8grrvkg4eblt4f3ya26untpzvjwy8e5hh8sq8uggn8fmypj71xk3aq71edhloxpo331zk1s5hnyb2mqxnunafoaa23efpd0sgrlnnxkou9ugvfhm9lhlwgz3fxgem9oatzdhp091yvryp8zwz7quxh9asn2krooa0g032vl4l6toczdgouia6yk7hkdbt286cugjq9di8cxertcpttdcmqhrzooqtizle20db1irs21w06j8peia03945sre3ahpw4nuef25vij9yvroszt7ypfdkh74pbi0w7zm8mkle06ttt94e9479kjxnadkrzd0qxhikn5i6phippepxmqyld1yhija1jpnj8i4r60ea83584x6x18nxj1fctcu5imn5re76pj4mvipats7epfr3a2am8yh3wzrvzm0r2e9nxz02q7z8njzw08rejae876xd45n05aywrq2tw4b1lnekxcm2lfe5sv8e3y4mhmlc92e6fybelf0d1dio0jo3vodwuy94eo5yg3xoex4sdzj7e189pbatgbwoxs3tnqnmufahinetwx3bsvremudysoslp7wy61pjnu4rrgbj7jepuccfs76jil7lv7o9frzht6xraxhrz92zzmwm9b5ayycrpt5d74zom2jhxy6n2qop2x8lhwvmrp2r8i3od6tngq5l3gkqfd27vai67545swyfr812d3639u2id4iqv4sgmeaqpfpwqfsomhx410lg96q134luq9ig3exjt9ze1sf7ou11j6o9yeqd21vebrd21xw9z5xswxllabv2lqq4e441avq7wlzpaz4a78ou0x9fdl3a8fb3il47987tmcyr12hhs54975k4y9xol9k1qitqlbcdy0g6pavyechpb9zf02uf4403o4dnjf6mznpumxzwve2oqtyv0upunpif0w3g4uieotx1qlhs14ndvuv8016sq8hyxiq43hozyvwi5p5r4db48phs63wi1bch34sgef4qoggso6f4blqj3b97lae5pkjr0uou3urmoes1z8w0p5fpp1rsbklp7dn6slkkj',
                expiredAccessToken: 9804244752,
                expiredRefreshToken: 3474711789,
                isActive: true,
                
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
                id: 'nworszpezubgg8gu98014dqj863ltc240yi6c',
                grantType: 'PASSWORD',
                name: 'qoe0q2006lzs3na4i3801lae4d1etclbz65iyaiwfoj2bvgd13tm9n1tnm5nxcxk0ynebbl9rx7mk8riylslljes2fcjrekuw2ii1uuap1i74vlsm110tkfxu1fea0nezqp7l0z42e2e6q0k6ejgrnn5fcm2lgk2fju62xhmd35chm0e7a95dks3yvtv7zis52vzyo1bh478qqxlf8otclgig4hbl719n7vx3e669zx6aj9etio37zf1jv8obws',
                secret: 'zd8k2asd29v51lxm4qyq70kp3cmldg65z53jsvix27d0v8lc5q1yfrfxcis6u4upevqg6mpmbfw3qvg9q566jx53py',
                authUrl: 'zmmlzo02qxf79hlxkkbq9pi9xk4ivm58lw4a9lnenn6iln0ke4tw9qb9w62hrld9e116gljd7nx1756gxl93qzkd5z6ealt7qol7tnsnmzsovj8hsbaj59jihw3asstjjocidscw0okrsvjcm99a1plu7envah0d46wrwauomf7h207ct4dc7hg7babb6oegkkdavxw4nrcp4sdrrjzgfp0b7caw7bp6yrwyj574lh1701crfhf6f00i36sc154snq86s5y9eqvsjlwb3gp3oppmczgf4bz8gzfpkoloxzxutor6yesytuai0zrcd9s0uvl92onrpg0d6mzs5h0etgfxddshtwf3zh7hlvp5gpcim5lzx9u1qtuxnhozash34ddzskwykvzjui2m3x8scjydnln4y0yus3q9m8crrx29ecypx8y4e3nwuc0d7ejfjb3sk22312am85em290dj90x73k5ai7xdn9ddnk4neewkz7sgqjfjrmwgnwnqdxylnihd6ifwtcvp2qeppwege5xxnykosg3voptoncfqvh2d2zcswrzzvkvrzzsew2et5nffj69pv1bikje28evytv5cu8afeiepej2mchy7yzec47hv6xkauhegs1x9npqd3nuvz957dgxxarmdexqazqcy96ymxdc80lk4azlvxy00qqrholug09x8klk6y81pwtpcb4o4romn96jlfhrt95q1c2g1hd76d3fhhx9zd8rs6h5zx7b8shey214wlwkdgu7efflt8ocitx03w1kyfze479kk5eapgs1hgnjiodblb5jufluil3hamrcavw8g7vqwzj030yq15ufwddon9pozz2c53k2dy3zv7e80cvuoo9p9se7jnh5h8nps3iim13mng728jp4qvv1cols6zctrrmzptdv39cogow7mxzhywjsyiblvs5r3q6x667v46wvsubf1zzydcqqylj8ggkwfh9vqsfzmx77edkfcys8u5ilhnad7o4g4ef32ita45v6chc4wwdjh1g0pb3zgazswh5r9t1z4i2wymy84e54suaq6xnrcuhyr7ngv730vai9xuead95b3i9qokc3thgfg2y60ugufstowp9mu2gwedtmpaoa9rsk4ff6meodib2dpe28evhiv2615yoxcvgeljo4qr9v8p83h0upzcsu8a2uid02yprapgopdsgmqo1pwf8m660yx0vgpmz8tppvmjc74cevjlucenr59uw751x3cxx1x9fdlttyyr35zwctlcu2cnabmq1k87roer9e1xvdlptvgucg0cy3hj61v99y48n52mktjb14kd7d7t43rpntxj485zbn1tk1zu4kciar1cwn7bsozzp6nzp0sycgsw6rk55rvagxrmke42cxlkyld65jbiras02tomedcvwknk6nlyndilvqn7w7yxazax0szmapz25vvgfs171llgbkiz5zlwpzgpd3h6mhuw75g38f7mask8jywqkatdc0h64qfakeeucihngjxk1h0wsutxuje3zz2xndhtyqbrxg4dltmsq8w9otr9q8k59zogunhz1ikxngtk6y17ztlf6kjdsk1sq0dh5ecqorauwl2i4usra3if8ycaiyzdljf0vmi83y1zrgpa7xshflb1o3w5ilc31xm3j7fepo0uqayvkzvg4h29xxxjjbr5w4u2hvbr2q956vrem1c5ysjzbiowi0frr3fsj28ta96ohdaxmh8di3m56vav9pr1l051zf7e33gh7wh6d83vejt05wbnbaefqr9qs5xjbhqc1dktyvgmps3h2ynhcnfsx40z30zrg327kbz7ddyhnsak8sjbfskvu0u7hrew8tv0r6bk1nnazpwygrmkglfgb1m5n59mmvwq2yed5bxdocywwo6m25mzfrgpdgi6bz1skwcms0dfdhcpl3qyo5nopc71f7jldeycwwcnp6ws0o18cdliyqwu6c87nab6pnkjv4fjua8zckq4evqyhy69x2z32o6iz16qbheuse',
                redirect: 'nbosdsr3rb8z9atyi5nkcafraw1z1boi573faye2l0epo0tbyr70zhtp2pmtk792otkp9rr4y5df2uye7e2p8pcual9j2dpiapw5y46rry7hl1us18tvbnr2mxvj9u9je4zuimw28sxzte1caczjupa6ollsdvttkwaw2i10kzkwcl2xsag9gdzhp79uh65fb8suphjlgurxqil63sv6r9yl23go1gpi7xwdh6gmbgh1a9md5aydl1h1aizq2kj3z1itvda1ydybhrxuwh8bnbue0yhx7bz1n966tkvj7cdoww89zvg8668qmj52ru11l4c2n679pcpl5dv1sau1n13y3q35o7hiqdi1e5r4ohiywlv72mg5lq25v10egxp23827ynt9tvnf8j1hb47m69958iewzglk9ri8356uqkewqsdvhxaknrz9p7uk4p0nn2ui59i2ihxvayc7er4jel93i7s677ewqkb05e9b2trmbx9xkxkbtw8jqsffjdh520hk4qcaoxq5i6k1yjeo379eanu4ozts16w4ze8h8an0wngxu8o7tg4gac8kzruu3rqvt2gujttpzqfpsend6fpwmck5no3f3gemxiomnoy2b70h0zw1vhzht5hebg56g9rjbm4i5dclfrpju19j1albdls7l0ag75eq2yy432aoxr7o8ranfpar3hh2kljfhvztn8shss2ljif6uhltn9f661v0o1fhlx0zmes0lcc1vwa8wyikx8usnstg1f2zklubjlnt7dzn5q0bqxsaujnrvf7wld7pi1ryonl7pgydio0qugmuhkym05u9zy0vp8ckne3kr200orkg5fkzdcbbz5qqteevacmeaaq10hxstnzcjlfyhfsfgs4cmgndc32n0qx5sxdloi7t3gx1zuc7s0d49gxw2tjkh1mcdgijpdak4k0jr2sruse4zbjf7rhigaxhqb1mrg0om1bc1kw2nw58qofclbs8ok04ftb5f0e1ckzatwk60nnfi2lkhzudu2xfjymost35zddg6wbjq8y9p41nlkdccyeaunmidg5di2yazln066r69a6hub6706so61jhi8zq34354kjvmk8tlrxz1k5yj0uiiil5pqx3iap3ytxeu0s65pudqb9nx1jhnxpnzo1an1qoqcrkxbjy06cucnxr66k529nxvxbho69max7gsrvwoo8bxktuw4omud0bylyky6fkgqnl8wlvx3x7t26ix084a56vaaui7hh5qshvwi5u8hmu2jvhbdl9gzd3jp9u6bf5ka3ccbatx64ywyu96bilgcho3995ov7q4wkdf3ulfl8kutama3vx2n6dlygnwi9xmyid1d7fmh78p4xgfe4bpxbhmq5uczgcduuko7vwo44bwo064wb8384us6xdib16yhnm9l847reu5pjgsa0vmumfe57bkr3wmk3vak9j16n4ne3h1g6xuuao3sx1g10uf8npzhfp97crb28m18twtmadg20lxu3od0ywpmk35lq65s8jnyxinznjgjbz1acrr6w2eh9qxnw5g7k073zqg6ws042setkprpefca5o0zzu3z0i4a424yg2nfrz4yqznsau4wvx1kmkm0cg9hs0ovtjom2fz4jdv4uipkb3zsx2c7dbi8wokjklpbl7zf1huef37x3mj5ui3yks1mm3q3ub4jnuoqik5c66stsp2ohivajl3dhwj156499iq2ide64p4annzsupdqqf5zh70be8i6jm9153l04ulfpeulx6bmjaewytvo6o71cycwavmoykr6r870c1cus2lb11251uat5rnu6fiy2r841n42kpc7y8r76kjp528a8dqp7bw5lem03v3q0t2w98jtjyzg9k98a3otqsu108j4wmevlpa608l2zyt6lk5kd341okwtdqbti98aobwhakty6debcvablzo9whape478q9rg3e6xl270qlo9tbcv4h5bv39kws6bwv7fu7gke9jk7xnd941a9pe9vyv2hhvqukd1pa',
                expiredAccessToken: 4673130862,
                expiredRefreshToken: 3421435409,
                isActive: true,
                isMaster: true,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'PASSWORD',
                name: 't71dwgsz1t2jrg5i2giz2t3gg9vt8k2e8q17sl52wliml6bmlxw3v90q901w1prihww92ne4nw1yk6sdnjsr2ij6dbha7al2gp2rmal1zrswfm1emr2tcqspv4ezw79364k90ns3wsw74ckbztfyccf0qjja2jlme3spjsgo9lw9wu8siau8fjocbqpxih33l3pboe9a1jg4a0sqr15p0ppd9sj0dp3370rxy2y99qxjbd6prqx32tn80mhx4gil',
                secret: 't4zxd9m9cardl3vk0x0hqk9hveqond8k6zgjmtqh9gyss08em0alotuagw4rmono0o1dobr2vbok5ytdf302zqz7v5',
                authUrl: 'rud0xr46oitibw2p4ijntzjo48eukjjz8jnwbsf2kabgsceikjebn8a1pqv3kfuvn25ar86nq1qvcwkcupqt7pn9hpohek4w5x7elhogcoz2b925ubljfo0j25etq4omhwajlm5cx20q9lgh0sfoava8q7kww0algaaiuv6tdd0ge47h9bori5kkt7hvknwfj00ye5osnwy5jwe4phyzvd45jdakhoxavr06jukxdt8qqf4zd65242kvqfehyw2q2f9lz7pt2qm41x79bsvwtm8crbupn9t5ydkxkrz14nacvu0vry76o1sywwwsrb0jdjwvvjiwi7a0c82cognh37s266zkj5ecrho0oubiavskov5s04pr2qg7iai8ez8f12m5xf1om92hecra0tipow9cg0iotr9u2bl7rqui5c3fwztkzw2htgpauz6hx1abw660xztev9bptp84balt9he593q7eu9xe60juks7y50ldsmhajee7zby4960419pwlr3lv5f86gu03y0bc24rft64t602w3ryhz30gajo00a41z9okjdxh0apry4zs387wk3978iv919xd4xnmmnkfntwzlko8ph0rvmuothwdbtxgqyvuq40ocbtui6dp8n0suyur7uxsxgej7kyhwfw0jm2sgaxapvasu0pfxmj0bi8o52lkyz7bacc424rt9ebmg6ug3870osiol69t480li0twsup19013refb7a7aiy8fl5a68f696i0a727k7reiphnseogd668oyhicjhwypfghjg2xuw7q2rzhg35jnphnpk0p32nql17tv5cy0qpymxq1dzn6u8tgii22d0ladd3e85ugeysjl87thmza9o085me55e9xy5jgp3y913ux2qddjqxlzmkadzevu1d2r2j7co1g2qw0n8p3rchmmccv0qf0pj3q2oi2m5siqlymzkejjgcug8kwj6kzec5v4h8jxr5e7tmmp4pini4uamn9j5zvct6g2o7xo9rglwiydj5ehguqr7fbrye35an3sng0jv7ysglwsogijky7frmxrjninvcyp2y3qbre8o33ya7kwihvcyf87zi1s741ibrqnh7k4l8iahowr6x3zwtiypd0ld2zznke3auzwmbxxhwt8xkcqzziltihm9ru1npkp3qu388eyerigk6wopbwzk2v0v4k691xnt7f0wsvc3ayr443a0ovnl29r4et9n814l3h0d1lwcbf5x4b9fejepuyry7swjdlaad6ms17u467difb43powyptfqfivt5c073zb4jk26am27ryfpkrft0shh8btvsvgonj58262f2jy1fzcu5ggrihrrs4zzff16jhvqjh0crspmhe2wqwg7rgzh2eukhublz41mnbqqgw62hoyc047x9i0hobdhox22b3oweb71tv75c0okamaeflsqbj3p41014l6n32bcxtcad0ll4np38xby78kjx3gy0g9vlsqs72byiyui93fdetux2j6x1jse72h4mqnrd595m8y7bafsuwuf90ru6p0gtuvvv6dgkxm4hoh08bqdcfxodeswc2q0k38rgzzv9ei57mihnjd6gep6i0ewjkre8xervrueiuzo09vip16pp5akfcfm9ot7v4it1fkwg2n28eg98elfu5y6teemvtruvqa4jclcjmjrdy5m4ct4h2b0xvf2g8phjtrvanumkix8s27dmkd4s0ansrmnsxmgmgckrn3e865cofzpsb7cwtefqr59ak7fi1cid42siq2wucrdbvb8cqn7m66vxkooz83hny014d12d8ki5ans0s33fq1l9ofjod3hc74916oftyvl7y6xptcrckoue0sqg1atng3uhlh79yec0vj80v9tlnk0xy2un7zzykjethc66lyf1j63w8mmt570f1nizsc1cpvhm2h6zfos4lfccyzvfxntz5veotgkcxsinm3632y2amge8lahvjbthiuzqktb9f4tcf28fz2xmowhqqbm7c3r6ooowrzo',
                redirect: 'shithsu4foingdzglcw8quisxh13zc9ucv9724zv9mmt5dlcav74oz9ag2owkvjvqa1mtj7f71hm2aaglnew3fes64zjzyr0d55nfif7bbrl0rc66ue1ksbzw2ckadfeyemdde3xohhc8ew3d52u6scps8x92zgx350rvjfmnpqllcbdpiev0ssh1hoaqku3js7os7l4a2fdsgatmq3x97s774ueouyvb83cd03quy34ue8mj803sr2ve9is9b01doecizflaz01yqflz8kb9ld3wzw1htt7geaqjozf2bx8ifibl8b93au5g7o2jqp6pbcfrz3x0lgjwv2sw72h17zoatxkhx4rasgt0nlwlprc9yy58kds4syhfdd2exojcl4irtl4czpwwobq6lzkl3vng67wdbvu45mqgkm9mkkgn65hmz25iv6gigihdozz1fefz09vb8t0h3cos9vcaj174reizem4cix6xif9d86y6ppx5xy5l37tode24kqcmw56wezyspbl52pkz6eyhh163l3r2w4tspffyukezfj4lp9m1dmspmud2oeq3fp0tjnpmws4frhebdlf9ylh2hhuqz8ktz33l85qk4j407ee0fuka19fb0n5q9z0fivnhfms1m333cojb5tae5dy0048hayqg2ojj3dybrdg3fu0dd44yfyg4vdenuxgpml7p40r96bpl98xu3oannlgd76kyh1zz6vu1zduxrd32llspfvqf1879tuxcms5rfbv1ogqemacp0fmt3eoxyk8j1kmddnhp9082wypjngcmp6in63cs13sn6oh4wcuxko342s5ztldmyqq2bh66iy81lyi6herdxc6o047x79kkw9a90cjyteitowg814wuaksgfwiif6z9v7i6txozidvhn0ujjdnpgxeegzd99h4z73y0el2qut9ed3gchqvfzxcqg0lr6lc188gosjo6ke5m2djru9t99pdncmdqxoosb3qmchdgt1b540zcw6a9cyk3suuuar3zyvejze07aacc68ho2edhhcl5knzig0gaqh4ppi9twnjx2fxfmo282rsn43qzj24sb62xowann9xjo786gsfzvrxfatie8cg4etw8sv6sb6rwto0n8sg3hxdfr6trg4p5sq35vutxxnhqkoflfko2bdvm3tdhohr2jy1m2a7egmkmici1qu4hselayq6v00isb9fgbug072rfkpa8jtw4rey02mnreu3hxm2rdhixdi2mctakugme8b2tjkc9h99y9ptt2zpp895uxemnnr3n9hbjaqo2il5lteywoboaz2ppj555rq01aeg8rh24wxoslb8ft1tqcmcpr14gu3u5uqrfkzw5i982ysxnl1z70t9hfqppoif57aak0wc1d3fx4e5jdvkvc6nm3sib70xy6c8i22sjqfh9wchhouwm0ol305gb677doc1b0db27osh6kxkomug2t4ha9r6bnwis5nsclqdx1zqkfsfj8gq8svm00fip5lskpgv0kl5wk475spba8ujnfcyu5jeaaud42djsm182mkemu859fdp43xtx64dzssl1ti9s19x8sh8x5u6wzlgyhqg7ft5nbrebeomrrqa5lgt0xxhbv1x5igm33oxl10irf2ymwx80gieo7eglcsusi2cptktax8thypuzxw1m6jhnw7hti7cgp2cox2avnfz09dxeac46uds1pfs9ho790e8ju8b2qhcnqtig2ch0x6je4yv4i82v01behgyd4xx64swijgwwxne73g7hr4k07afdnw9c04c4t9xe9xxv48q10vjkbjcxa2sj38s6zs2l048mitqwxzwuoep7ribbbtn0wtrqkiu5cea2koiyj8ngr9ow4xkwykqn0qsc7xs14iyelhm4rcpg0xr9n9cn7u5i1rqifm9xfid4s87tlkhq5db8sxreckmnh4zyje9no9ti63sqjo405b6o8lmebleckebo42k1jpknb13evu5n7ibhyx5jto40sail85ly5p',
                expiredAccessToken: 7158041456,
                expiredRefreshToken: 3658330266,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'PASSWORD',
                name: 'd845vrmrgxrgpg7tbrci7xanhtk7lx4hysh4pvklh10aasfj5z5px4fxdjmtwweivhpuh114dly20slavxev2z69htoesz79w48x2li4s00v45pmgjz1t651utun8ny2mz1nyuc0b3nnduim5yvxwtzfn29cwfwzhts4e9fn828urv3heidajezkx7fvxi9q6k2ynp8uqeonltyr3kyttgf4xd8kdtvh7plwrxh8zwbl94sr3s69nwfl49ppu13',
                secret: 'nd6n3qtiitqrzqyz0j791s7x2zlbh80m73veyjz6nxk36doopuunqh1wsa4jouyvfvuvvoscz2x4hsdahqhl37jf5h8',
                authUrl: 'jd9aeorxjhwjko24nwkd00cypro9vh9irj815dy189wtptx8ifdl7ti761b4fhvl9s6q1er9dd5lgtirat12awatboioxd6m2moo5w4z3sw3px9d4cgzo2ltj8p2peexpo7lbn00h8x1phprcoreoic3ezla0wr3rhzmkgyxgw6rhz2vxj6s77j2dh1lfpz29400rp5lourfl6bks2cihqcpehdsgxqz1c2w09i2q1zbf6scg26v4z77ai0nfdfo4uer5l3nwk2bfthemcbug4ekfr6vwdvsr6tyqb5sb71ejmwrxzqpacp0ldwhh6l4386l09auiem41hq4yoqy36o0g7bdqhi9bxr2r2lt4wtqnchfxydfp2ohzhxde75r9xoju4i63vrsesvl0mv6koqi04tpp4wlr20ypp5s6nasxn000zbqfjzg0a18re79fnrlo3jirq5ayjd9lvf9rwcnvdbghosiw7kevaw5a9vvyyfa20fb3te0zx7p2mun4la8yj4g65ijvi14lokkfx69da1rb735lv980246rw3tk1a8y7as21tbsixszww899rwi2l5da666nlf8u73nutqx17cfryws4g3igfz4obiji1jxyifv6fj9cvf2gdjdv0urzqnpt1fkiif72r6lq99q4djo0whi71vxxwvvklm6s8yog1g3l5jxafue7jh6oe4knyeuyc1cr2ozjxs5rl38qe7t60doo68kpb4rgevtf0ml2usmsplj5yfaw5xcshjb9uijp4kecc303i05i096vxnudm2sn11oiukso04m0hmfreaasiqa5ku5kkl95fzd7z0ninx50k5t9yw24k28wpn2zh2o4osqi4n7c5ydul7smdxy3ck42cqa4j7elf0gco2hyspl69brq9njmv2fuvrs8fpoygdizrmxblbtf3yjqaflbomf48nw9ferpqfpxgvi2vda3o11d0yy9ap4935fegqifayo7dn9algposwvfieqfwqyqsfazwqczcj5539d9i06l8s0xs9j2etnko34zyczeyvuam6mtuyfa4m45ckx1v4jb2rmzhojlc3yeajw6fqmlrxa5vmjp54zmbpqom30hl8bb1cw39zvv4shznxee3kpk00g3keqlfyj0e8zzx1elznlh01cdos5omk8z0mo8jmp8zvr198elqvn733tv3yxgzmwizflzq80hmzy94j6bbjhln1m0l8o09hvknvyiy16j95was4ijcgmmsmf1qxvp98bv4v0v6y95b3f7wx0w1evpfe7t3lib7aaraplhj15yqnse2nw27ierv0r4xwub3dqrxnjtkmm3cb658pz7gtuwspu042uuj05na2smsmmi4o7zy1j99pvgqbq4zojv29vzkbv1jz0jedd35hgokk40a6pktd9mr19g221aopqf54zx8ygo805wmr2cioppgx1rkk028e3rwfek7fxp66bn7c0y3ul16lv07nd5n451uhotszaykhfbf7q271uv9zonkni3ke7275i2tg9gib4gcew06r548djazjo21u7k9m6sgdmlkfi92scnh75eo0ccwhvajdrzm40rinjkbkx3tqt73qmot5icpzt73kuj0xndm4u6xy4vtaqrtfg2yequg6tpizvwknffan60fysofca57h6y5198pmv0xz8xfhwo7ys8wu5k8ap9qqndrn1k372qnwrtagfvmrj4jafql8n7aav8avmdgyzoavmpnu8dvgw9cztr1x5f8fte8xnifkcd3qbhdzx6g6pl0oo74yw3z22ozhsb9nvl31zdoabklvq1krqjxc5hd03nskmha66asscwjob6n8ysub9d1nnjskyicinwupr1a62z7f1fr70sxv8s0wgwr1dtxc1r33dutexrz6paegciim3eeby55endvhc813v3q58f25udc94q9mk1f9k9rj38fngclg6l8nd44vive1krvmvlvrrz1aa6uafs47yja7uvi96ml6azidk3ulmyzzylj1svm6',
                redirect: 'lgml16n7my7yj5pemft4lpuwcmqf3wynx7d4i058k58ls2bjx6vhe6qhyif0txs8s8d678caak4bcaj9l00cf9oevcuzjfjy0ejsk5ic9cjccsf3w9t2gwzlsgz7tnw2gy4a93trw26saa30ri7z3gytc5o93kh8sw87jmp9v07z30ecxmhb57lx3sxxrpxmcm8ecgdntt0kjx16x815qjbf6q25mkmn4v4d6hbud1xnpnwq5ggnb6qsc7j8oicucj3gb75t1novbkian3abt2c0mqredseuw9m18oxqrr4pvt8g1ixijmlsvavowu777m6tv77cgt6fu0jdo0hjztddbvbkup92esl2fu2af4d5oyqp30sio0g6kv60odobs4fnoobq86glq9rzzp1085bw4ozks28ynnxu701ivcgsjz35aryl5lnu0fzxhhojvhgzwfb9akx5kuubdty1azr9gxgr8lp18a56gch8baxa497278ljbvjyyqbgq27mze3j3q0uhm8au8cd5umtzrqmpxxzd696lrjdh5d97cdyie6czrq2fi419jpp2lfeqngmkqmo7l2thtryyujvorfzkss9eks1g66jn81mk38ybnhz77l7osf533hu7segdxnj56c0tkemoz8937oxnepom18g21llmds2as4mddfyd97q6h6btll0t10l1usgnbsx7yvzzfjme1f8jym3yocrw0xvcht0lmpt0b0zyw7bmtafaao174bzlpon8iha9a4nmuf64ojel41js3hix785en3lop4qlirru5qx6fva6nvg9z3hlwqb0y47r8d21r7m16rp9mx85zusjgzqt150g2z99a0fwy1wqe4pwhzqczb3o80olv060hc4stahy6vd6240m99xyb34uaqx2x7aol8i94u59r3gsxlawafgrf2udsosbaufsrdocnhz10vunqtl3kf5zr2bei6nywbz73wa6kg2mf6f5230s96itymvazys8ej4k8csclrcbk00pwhudv6mp23yqf9e953imik070fzwd8ltjv7zxfy7a1cc80lj0rrvqs8tz5ruetnsmda3pcli5vbabkxtpjt8ac3nnythuntzmdnca7017ms57feh2eytcs76sce21qggjs9q2fhb5k76hfoewpq76vwvl11vfij8alhtlqccdzeekj89igiqtjl6j5zvb0choxlhb20edyjqvqbxc77i292t4v3z6jdbilh4k9zo4cahf3sye5cmsrnn7xjgs6eon6dvclk87091ko3pt18ht9i5rkdxoz2w7g7f3w3bmv18pllylle5fjb9d97sbtq1cjmbrbt3bfdm6lfn01u1d84ezrrllj8n2mf1fczhc4gsyztv5g6yrzodm3w8konc3wce887n0e822jnq9lsfrdgab3w8zfcz36653soup7zyw916256t1lsuocrq6vnp741fuwjhcjcyq0quuircrqsj18j0dbbj2hfnqye7mrectuaszje2ftng2bex3n9ffa63g1xwsvgnuvdn3y4cfdwc8i8bllh1uhba3mxsratjt11ku02fn69mcooxyxszeuwi06cxm0v4w9ttkhhy1dxql4bogii5va8640czurwucfxdxkc4usthzitmb94rtsqeq13pxpky3lmfwoqk4nlpiodppp6jz71v5jpa3gu9b5mivl5i19f6m4lph7wg94fk11k0hyercxavmi5iecbvukpcge2rytrzdf9473mh3gtsanc2a0v9zj48uzd8zqmni9zosnyuwxdi9ogfb0uggo1yktlfsbxqriige3amppfurj4bpnfzs6l17ubaz34bht9ayseb9cvc0s79ktnj7cua763s83taffnfcrsi9fsznggpy5si65nx4tg1uqvskgur5zz4jixflrwf73ap37enc0xqrs9acy0i35t7kf5hzci360gwnaqm6v7qpdl53u7of8qj4iaf1ckfna8isyohzb4uz9cg43x8xfb7tv7bz7o0nx92iie',
                expiredAccessToken: 4412132253,
                expiredRefreshToken: 6326658839,
                isActive: false,
                isMaster: false,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'PASSWORD',
                name: '6lwpykuz7gg3gt4x690bhiap6emuy8pwjhuylezu3dbfmtnfh0fmo1l0nn123gid2v7iczl8ysca6v1uzzm0xlqf3mxaczbdkjjarawzdvae74rrfnuyp8h5fqbaigatdgweq1ap6t7v3chh3152s0howqazestf0lptru940gy1oa9b7yp43kcxmv4ss8w341r3rdnirojubp398sa1rcxfnq7h8m2b84fb9dua2ufecxq6ka1pp3htvspep90',
                secret: 'armf63nq6wffat0gz7s1yzez5yav37p1r02x2tq5n0ff02oqlh0emmvmroiyvkeheanhb6x04j433615i0x492r5wf',
                authUrl: '6kz4hrk8km317il2nqia1alq7dx0q69zih9j4z13626e9l6g7hcpixgh6an36x9hzzvevosdmf9lhnxxv5x56ytd2nccxojtqdrdk4o5yd55xxqltk3wyq2qgtaqd5m3kgwk7hu0kq8q9kd731q8jci6ks71kwvj9pb4gprym2zy0h2aa83ykcp6chf9aax1xcz6my6bnfzkprvtmgwcszbvctw80v298turclfg77743qd27b52ilmjfu3cmjcgnajqu5ha09gplllkeml6g1opgp1g4i963priutrkka0eat6xr1cyhloz4usvf4jxzxa8rpl0dghkxck9bzlmg09zhli4da3d0lygkpw0nzecestkdsa4vzdvcq2pfr9i6kvmgocv2etgqb5jg3o5mn1fowtul7kabnbiuzxdom6pwrggdewki7qykof2nte8h6dokmvw1cmto8cm38v769bi9m608jhxrth5f5dr9jxm0y2quhbyvr7rcpwasqc1uuapxrdnkpau7fekz9ymzb2fvg7lhm89vw4cdd0vawc88wr3kinyxsk3keob62098fpp8wm867fcwdubrpj0w47opo358nyxzygco1kd3rbnw553eqgturibe3tcem0rcwkh9idwedk4x372ge9wuyzujvznba2kgrt4p2t5vrm2nfvd1k7wrxycaw0l7uq6ttgf2w9eotv19hzeqq89vdq0n97ttof6hp28anser3jadmi9wfwgzw0ed5zps2sfs64xi6001sdr5olubhc9teg0aoq353qxbj337t9m9dzbigygt00c0mbsv4wvl622kobvvso1e7jr0jgwab41tultcv01hmsnmbddwxf0h3lki98gtn17gigyy1olbv8q5waongvds27s584ns6ar4xyvk6y9ume4bl2g7rvu5o6jv4x6yee94xt3pw7jtfj8222gf55a70ussivc7ojkq6f3c4q5ar5qthup4b7vdwkpxcip7w2ej3xqee5mzrimwyjq9w5kekl8i2najwmdl5b03xycz48ncqxb1a5zgcj7u99hi8c1uj15oivpf18nrn8wkqyq1yqaqjmhz93t2njp23abdx551320f7d8u1cab34wnu016t5dumm89b8cmsgyicsnuk4yeldwgw72tv0rlbvp9ik2h0qqoww14z4zmmx3cng4yburo346cqozpdbem3594hrdb1ots0b2tmom3396hmjr58ffqbnt8ih18t2prcqosv4zbvrctri46s7m5m7tqdqj8hsk7wgsy86ewxbu1fgexgv827e8ruwsba2f0f2c1ypepzk43w5trsw4mw5gzao1t24h6ahsqtgj951zm4xk5k7x2ivzypfqhvdnvnxslqv8ldtq4jnv3nhx56fd207un74e8ah63jdue8vyp1jpxrpak1pzbrso16h4fy92mlrmdm05zk6s112oydvrsncnro2dsw9ke7gyzh2i7o6ibjun13ku0y5nfg0395i8g8cqymurxwvi6dscqgkcmmflw6hv9i3dithkuthock3hkz29li5l72enfc3nk46j86jk9ttblvfmsmw6ezf35n8i0149pbw1xmuwm8oyy5szyayujd3rlxpuh5o1hrv0gflpe636zvqlyp4wuy5b93f56lbi2lt94j8tr9yp7r571hla08n2przd0x1f6ifugf6332vub6clcef3qchic6su86klmzfbu7byd0qddxtysgkz9xcogaxgitp09xms8a7v4xfx75o2cbuf9pk4nc3he31b4o4h9xsyiy8bh442aodijovoxupl9ur4xf8g3nqm8u68dk0iqa9vqtb3i8we4o91rxxl6ifk0qi34z8l9c7qxctzgbzlrqapc7tlhhyb0ztsdyj87w6jctrvxtaq2u5u9lmr91nmf05ujdvlge4jt1ts6t2k6cit87ha6kkyztvurtzqn5jy4qeytfq4t69mu0h3r1v4t595f19mi854l93kzamk00uir725bhig0c58xg2n2',
                redirect: 'ihu9x0bhrda99h77sx8fyq90k8931971doib43x78evj9e5j36uid89qgffzx62ysun425l4d6lytt6o5dbq8ptt2w3t99nwddl3v3vb437cvbdt5w0nlubqalzgm6sm80jz3ympa0ulq270jqtp0egdlt8p9kt2y0i0o084ys4f0jktpq07nu3jb9beyk5tx8ntnpjpm5dc3kfvmvxjtkmk01bmrog2hrkqc8wx8w6ehw03pqvfusxjya4zd6sq09ewo0vi5aqsmoe5gpznbifrbm0o59bbwtxmjzt0momib800maidu2ouczcwomiewae4sfmelof06lirl0jhwhpzvmv43f8rpnxhvqmrqwaxns52nkm3qvafsns9igktyk2o3marqclorv7at1kqngno2eyuj0cjaxhclq5kvo61tsfrrfa17kadr5bwxad8ge94p34123ha66l8dnv07zyavzh54x3lvmz508ty049jfu5cqdarmrpe5zcls0ummf0hzpz0d57c78s7z9jfddtst9efl2tttgisp9zrhmjxs9jbz33i10stgf1wk5dmi5nm0id41f0fi5nxl49mb23axnzdolee6nia89r4dqkbd5h52gho9ddgl0re9s8ur9bu0p0jcml3q7eg0ltgwpl2nwt645lxe5fenp24s1mxmvakcx1i32b371j096csncsz8h3538tkxefw961gacdm4u5hmji5qsfrqlmr4xeu22gs41xnjidt7z9itia4rrxmn3oa7v72va964zm2jn38oy1ani8xlonknkq33ablmypa1mq6slvt1hdw0itp1p0whnoyhcludfr72i04i7ayqem9mqi2j8cqzzrbjposn7nfrvghgw0968mmgs3heq7098fedpdbplmytz9w4lt0eznz0blrx5zfo5nyp6qmgbyix7e3rx33r9tynzom1ft8hz0wimzu8wfevij709dsv98vucqijnw9fvqktr3dckq6zz5zfm6y8r64vrpcr44caeaw26a9d8agouvpsol5owxtkqvdpf298ihl9ftqzbsnk3ymwx053m16bhjt59c85x3u0xocxyp0vln4sfqojwrhynpx78hsoswai2ksfq5ee115jqeqrt14kbpez126e53mg08ti5olwvzppovj31vfrt2haviot3u2xqp3so1t2957u38qryys942yqa3w1rza5hhd5ea8ub7v2dw73tkq7hrfmr13nspwh3s51ypqr4lwflc0fdcvcdgy9w06t6tb5k98rhszvg9c29pdb1n57bpozmq08clntp0ymrbyd0clq16dqsc18tqkstppqj80c54w9o7f29jv2py8e9em0qde445l9547gjx87pcpsuuu5g8d1w2uuy20sb9jlb3jupt2v9txqem94ivjropysktt90sbk1s14a0mezweqfk3btwqovpg42a0163bkfmvl2ul11axd8o9kjc65cztwnfsv1c61zdpmdjjjvg2zlin9vbqaz70ud1611jagkihefn497ydhsw9c37vhpf8ltsjlchg04kyogziw1enx6b807jk8n8kkq2t4n0qloi08ix49c8men19cu3vx9ulu47p0tee9dd3xgl0w1lj9gkgpp2e0zqie96s5h2ibz8atx0grsy9k2y91c5ds8g4prg0x6v61el1z0cpa52mpnygw6pidxkkerowrtucvqlzvedh3uxqv97trmb3m79lk5dqf045royacbav7q2hkyreobn96vftq5zju3bi64krd4qtomt9c70uiei0v57tz54yp457h7xjfooyb1n8372iq53ajxsca0ystz61450slurnyoy8ivun42cua0qoq6wr56i88yw255x3puxow0lvfd5zk7gzbucwi5ug915jj36hydck43vra1qd1lofktve8plht4z8frt9q2epp15f46qd72pz3ncs3unkm1naqd83r476ahoxzk2gih6pmsr0sib19wc5f7uopasaci2dshcd8xoej79r',
                expiredAccessToken: 5926834464,
                expiredRefreshToken: 2869626353,
                isActive: false,
                isMaster: true,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'wuhnfajx98uznoiqnz7ze8pjso7d94nj67vuns3u276i58q0szuzcazl31ga1f4gac439zevails23et5yarkzd7prytots5wnj7ennjgg2hc0ld4s8lct3anuaanszsuurbc363vf3t1tn7ht7d0psc0qb9qqdfw2a1892eam9i2a6bmsy86y0m8f3hf5sesyb3cdm6gk8ch88lzur5n979grrc14xep2qmuc3waewbiwftvn2m5vbc8kzau7o',
                secret: 'touunlxvu4n817htcyno8t7o44axtl1vupbqxeedw13kj8lpomk5zblqt2llexl52p1u1f3utd65txyfjtoa91f6pi',
                authUrl: 'i6wz1h0zgcdk2t5iwq18u3oi8wgknrlxmjhbeok8pt5hky8p4s2hhj4q7kkub5r8wkzyis8y1tv5wy57eq5kcv9nktf8d94e5iaz7nlumge1ogwxkyfj3qlmdcghfakq3jzsfe4l7p9oplqeihmuzluubujimxxnqd6zyzkt5cpqr4zfylj3yksk4w8lrvykij78yf833jcwibyp5hqqygv6rxk2poptfblxfes35hw07ro2gazu3mwwl5i8l8ii7f2nq7cnsixizguei16qs78saxkft8qwvmpw05nnqsf3vrewvf3wr1i1r98fvb5gocf5nwlp3df16dwqysz6s7b44tievkmn75d4veynsq4ubrzrfbhot1ifqepae9523rlfin4n8w4xkwc6hj9a3e84m6azzbj9gojbusthivl7bcoaum5vbme6uco8xd6gshy1r3ptkrymdck2nqp9dhcf76nu9nyvgod5wb1drmqo1z71fjsj58f6cszk6zhxgdbr9c2jl9nqsej4y29mkbxj48b872c0pd1cx4n0wdr2xzd16mwlg3852oxfy0k2wpukfwwb987yn3c0ne0l6vankns1fz1fz36l7v77woemawuu5yx1rzq3fid5qkhu6y8p705p5fapbcs2lv4rqrvpiod18nx2rho8zybnj0yf8gkzrnqo2uao57jxxl8r1vni1innqfsi3x94tbiwuapstapzvg6genkl6xqseqkqoqczdm8vuc6e8hpagapc0m1relhe4lzn3n7mrau5d5o3kr73skyvwrnshyhcdh7o1da72hqzvwz9uy0l0ykzjtwn48x0dv5zkidkchlozr0db9k599h4igffgc2lu6522m9407tnepk2rw6zit71b4tl30yywwf0tlowbe9zu9fi5w2kljacgsjx02yc8xnbi8ij6sjafif4a1vbgs4pds4kbibsqigfki1mflpwyursoinb0s3ske8mkob4ef43fycpi54z3ej0cfi47ackxz0jevob0k1n93ygn8luqpc541syp59lqphcxvtsf2dws7rlzdz8yphcbckdl2n8xc4uhur3e51uemc6904rj2tm8frfgql539okza4dy0iugxbo5f8crnkc5ae7tu215x7tbzj5zv0zydqi9qf4aoh5t1qamdtzmket3b5ow2dsvrtcswigaxs4u4e15pksfmmedq8hnguviu2e91ixzqek6isxl2p6a5upojlmtpaqa5wu8t9v995fq8lutjnen23m7hyk2dhjz0cgpizv3mtegnvu1z2xjmlygk5hcyqaf672bgh6jpsqms4e8t8qeq87l9qz8uhmht7xdwjdl5oofcapxosp3a8nk409z21nv825x9tsv5gdinag5epx313o0cb6wwhc6tklc7v5ami2mh5b49y8jtyqyfr3f2anr1api0axqb7mea5k82nxmbnctf8yirppemmvtp1y0b86yndb5spgvv0o9tro56jwnfaguxy7l9o8guuvp73jk2ke28wkmqx3wd4m2hf0b5h8hsdt7fg183kbzlmi5n4ywfgm7pmuihhuaqc1s8amtgv5ux693vpr0dyiaq9eq2o4m5i2rbth8hr4e8m8ga0uxt6a1ee92m3teo2l93xyg8vezi44newwh61ubgxw7sp8mx3jmmoqerkme9gjn0pdfdfkviteqv0an0vvmoyo21w2zaxmq1w800lugw30jknroo5310s6vtk55pzwr6oukfilez6qtu1y10utfr44g1ccbj4vpcpen9vwoxiv7bebajg9ncnyxwu2b1fjkri3h9utebhj018zz0epqhg9dzsg8mstr4zeibcyrn30ttz7s2f8cehykduxxblwa5tr1e8uw4i1ufdbrkl0697ox0s03n6v6m1raqak0fthr71ypfieo7qbfkpt60w1lvkonsyc4ynzw1wwu9qanj00wb5kf6vftgv4fiq0atggco9aaootctuz1mqq36qomv8lcp595mvr03lom5w5grin',
                redirect: 'r2ykoh6ekdktf6xtpad7ltsx2hzuzdgcvys7tnafxvjj7m1e5m26k5t6gnvqxeh1qivyoa0515b4y73lyd9wh9myweusiyk72zfffdp4229r0joebtq0scitkm14q094myxufm003mqrrj8jdfwdfgara3vc7faod78eeu7hxs38ipe9nhfrt57oj5a8llchhjcpyatmb3hy9lxlqqx1p3i0xdh5wll24rczpntz9lr292d0t54ippcvca34pcckucsdexhq5m5sgfghy352ug53cl8anpm2dfw95glv461o7bc26n0rujibrsn46go7h3tg1a8elr858a15680vcbu53wsx3e1bhn7slouqceynldou45k8sjp3jfnp9j9k4ejkre0mqh1j8wpl3wh68vukygwurb8kwyr0s5i3ax9qcl6mrplvla94njnkexrlytgygzr9qg6qfsoad0q75558v45dhd5oqtchru0fjqdxfda99hg95v6u732vxuy4aupvpi7dpudh0rde2s0abx9gp0nn8rlcmb0anincc8z1ta14gd5i2ghu0pa65mcpgyu2ha7evb38ygk63eor2z7308sqemtipt4lgz2107if79d775ppruljp6cndv84mer6uzb6jo0qxllych41atm6ddrq30cknqoyak000mi5ag0dh1m7n522wvrebnrp7aan5l4jbwrg3t6s3r2ghfh5s0jx8hgd0t5x6j3eh7v75xr6lbqgpjm6xaw46b3b7w1jg09hn9op0esiiixgtkn5ofetbcgjmxbdpgj5ajys8c7d9pplt2a54z6aaati5h9k6d3l5nt6q89bdb2aoy7mcwz613m7s1zf0c37ohfa0qgi05z2a2f2epp1ord1hd96um2hrjp7g32zlds745c14xplc3ipdp0hj266d7n7044k7ss30r4jmbclwln3vruy642mgxppqgfq8dgi098mjwj5cxquprdtwx4ubd2ofn94awz2wzz7hs1ierkzajltjajj0lmorx80k56l6za2ap8k591kho3con7d1ei563b18tuabaew00wk8gr1nw4nreog0webzn2bwtpyeyrzxssp6kf13ne8wun9n2ang0x8suekiufhw50oazbs9npehd6uyygnxmiuol3f7dcc1v4535cx7k4hxhab5cqy12hodpiz5azor8i5tkmm2g7q2kbixw7f1wj829dwjs605z3x3hb9615elnaouc1ofvgvbb71q3yy3w2vefmw3ad6cjz7zyey8tw66nlqv1ev4mn74meiobtf28205741jl16g12fw28hwb2orlmlgis67yxqqbl3ady5id2c59dpor7dn6ywi237j9bpoew41jrvvhbvvwdkvvdvuvhyy2j66t6dwcrxd9gh7ng1c5ycqgu61x16if8vu4tjcnl336229uf99c4qogp78zg4syzyjm8zac5yky3amw8k1ujj1o898p7u88scd35l3ayj8figomvoepgllkqaz1nikrafal1jx1coj7tror070rzcjsoh1rzv10b9qlp98schlwpz3j8po6mc5xlnp0hyfhwzw5mgnmfb5r0cv7dm2y78e0c5nr2i2mzmy0618vgq6f5kn0cdij1v178j6v37bd3gfj8dfppuxgcl33upwcx76as78eyxmz86n0bv1qjdzypg9vv2z0mzh3tbvk9pxqs2zfjjcvcbnvmd3kwipivgv5vuovy8fx9qrthhyjna7wd0j61b5ho4bh5jezr8jc8364el4ie0zwnpvl3t91hkx1uv1xnj929w6g135fba1fqx8070y2uagx0hcybt2oln2y4emv31tm1jzn0alp1rm14qrlrf4kqup9eenj9azvzeddvxd5ti79f9xd4x8n12ckyk201jl3bghhxbaq0aswq0kdm21b1fzy11fm45nua032vlw6u02h3coronfp0kna2etfy7v2jrbm92aftjcisih2qvzvo6kc9r3aha0wzlb21qyuk3dkveda7ik',
                expiredAccessToken: 8160765068,
                expiredRefreshToken: 4068059112,
                isActive: true,
                isMaster: true,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'PASSWORD',
                name: 'z4r61fat0iliweyhprahwlxn1wqe92xfjfuxeacu4sdncdvydawadkv5lg2yv2i2xfa9glruvxpl5dt8zyinrxbjsaf9ejk4dkzmopiweku4xi2pnmgimcfbjdr47zy00vhuvf3ijpj84ff6kk5qrbgcjskkw1p8iz8mymgsbqgeu3ocjxol436kbygudpway0n9fmp5th22ypyim57ek94jsdnye2bp7gpo1jvrb10h4fdfxtjjavxo9ckvxnz',
                secret: 'qggzouryp6i9rgahtarjdm3mjpgklt5dqdsgugh7mtdtu2bhfkigrdv9xe4op3oqytb6zt85n7y8734od5xmyh50uf',
                authUrl: 'mn4c07d0xu2iz1rgzzz7e1qb4dpx209af6o7xaa6w19rqv3n0m4m1ea6qopjhgmu9biwp1kjixw3g57o79dmzrpcb1rxjriylt24bk3r6727hof5vgep68dsysb3frtz40w69jnyst5aff5l4zx3vt5glukiqjpsyhxoziyc337oywm0jlxsrqwgufjpqurpod5gljn88mj8pfjlo6dq31ujutf1ww79l10n4m4e9zcrc59lhy6n3frqsdgarmu7b8me1wdwo855d0bx7j939rc6kykb2gvf8vpgp050gairm71s6p9wabhswk8kf4pxgtqje0z4ce4ou57pkbv8pg8j2mbcwsa5ozblf8crq2fbxm1iugebimsy2384m4gswduaqppmqiopbxk3lnqrhotcfq63rluc047fxbn5hckejikqyq6cyqjl4q1z6i6uvrb4ccjyk3t7eglze1tluqne9hprr4ak3ew5avtsw7pdaiu1vwk932snpcu3g1jzisx7lspsrl4mam72c23i0103r1agsjvye1ddwu773mtugrbvhyk631c02k79bqu1feb7svtaun4ic8xioe8rpqnjiork6xq4ag1coikfcjazww3qjjy52w4timarhm5drkz3d5rxc3cj8ckxa1wn2h4dg9r6ez0klvbl50jy2szrl664lm8wc4lvk87vi9u8piqbcldbbn9589cx7nwdgk8qoaxnbe7qijsjlf2pillgbr3s9zhqzx36cpstrz5ej3utrayhz2vxnjloxjoojyjbuiawa9ip4sbb4ds7wa3kpy9gkl7n0tac3h7top2ct5hiho9h8ch9r7q160i7yif4evt4xmhm85m18gozifgzz912gld210e4pcx4fpmpyvzp05o55jh2yjapddr9qzx4ftvfe1u4jtp8ixijx4t8kiuo5oh47sdht7sjth3ewk00f2j22fkttt7wl7dzduc37d6fjycfvjaxvjm55xz5gpl2b1zbz4p4098nxsk83xrjnwleyysg008cwxb2z6sggtyr5vwanlkn7w7d45mgsji221d9cr5s2abelyzcc7ugbglte6x11y7z7rq5ki10f9s7qxpsz75nrs7g24e60ciwgw30049u3wwnvchulmjwu4189c4x4shioc27wj59hpv2y58w0rpbf8ku2w2zaps95jfba8bw0q1axqawqxl4xinyj017a65bfbt22s0bqr7tjzex1ma19q44txvx0m5d75nnyfhkw7n3fa3g3i0i4tuey4q4ift3kkozbueluca5btw2hzu2e9bwaaewlekjapxf1ynd0r84rcoadrtrc9jm334j11e4ohfnynoemfrfuli1cg30zs1telq2ds8xt5cnu01rec09yl39vsip3pggnjxsq7m39dabi2jze9btqvp7u3xeuv4e3hkcae2yaspswn2odc9bd2sw5xjmajujoygg9451kwje54m7sh5o8xlrc1izqb42bau0rwyuu5ruy2mu1h9atdnuf5rpbo2lsc11x4bkjzq29kukhp7n4alpz67rp0i05gd5bohb2t8enmfuhbx7dmpqfudc4py0wpnxpik64a8zgw5fxqflui14y56p0x6hdvkcc7izkg96agfwgwac5imijzgl46fwwlxwv0pmnnycr25enlurk6rulyito3pdn0ps26c4t7gxdklfi0mc87dkib5cbb2grg3jrpd4dy2ls9mm7ebcpacdgcs3lpz8bd7ozh5nelovajaol6k05pi1eoxh828efj0hhrp39ir4pnqqso2rofj8ir0tzmayhnk1q9ltfs04s6qy8nzhviyj0srjxzn4u81dmu9x6etp7i1p0kifmnlj4s91cn4w3kmqtk02bmnirmulwfeq628ylwwhitwmbqhc6r2ao40cvkzizmktn43m0eybxwg2zsnfdjcfc92dqfgdaml8kkav9hqyu8xt440s40kufm95ezdw1tii1v616shrb28sn1t98zrx7t5xgeki0mun3w1l',
                redirect: 'esftcvxnvdb6b0dfvx687ltvqg477s6cpbw3ht10yw3r07m3slexuqs1wfuvx8w7zietw4jbmpxdm1jykk8a5zr96kn75ml51kvao09udnf8f8fa2u0z7v1x0wppmla510w3765lra3pva94gbnrigm61sgpev5qo55lgajhqtj56lbgxihnm8fkxph5pd0z3cvjwwnknixmxe2dk0ygis9ifyxxoqs2g3cfoer4hcs46z93lvzlme4562re3r6xdikv474umf0b2ukao7h9xz94h5zgis4lvrw8ue44yir79e4fh4evl47noe82begohtr9ysjc7g5iu8uclup5xpnt9vvwhg0xzxd5gle33ayw0m5ts8mae7okskutmwvdoil7mja3iagk017l98tz9krbw0ogiupyqm5ufbm2fkjko8bf7p3zny4x66ax9woujf3am4540yq50dnrsxvzrmsjg30jny7c1kp1vdl2rgwfw6pht0nvkh88ynsvy2tpowg02jo5wnr1m9rpvut035osmb8rwe546d9itb5ce7xlg1qgnrw2q4fi83ug2c9nwmtxweei4jruxb8qz5uy9ohlsjgy5hv6vwph6zgu4yva48zbekjarfj51xiy9i6a9jznoabbxnwxxao9l4q25q41j7p7fc3ennu5j38j5lnj6ln4omko50sksu1v9bj9bgmqx67m0mrmx4qp88funnnqo90jfhpnavbsteo4gze0rhbnci9gspyj7aavda77nbthz0md355n1mcqt1j8zkl8o6xlig7s6ux2yr108879j1jvqd7ghokorwdg2y73g9y42rsrc8grkuudwx8g3dnkap7x08ipi2ir9fx5ocay7ikhu5ldjcix5joxwvhtfune5qnubhz9dbvj4qr4x5tpn3funntkyoncuklnk8xsz8n8gn94n0tuuxupfc8o9ahmp1al1q0mwrr623k93311lbdm12tdl0jksxvy19eliil4mizpdtznj6zrx86n69njuf7gpceav2c718h7xlw7wulhsrw4dh6jyde6exqkqwu90wgqjaory1h5tk1rbquyq29s1mmwnv7t8xu0x5l3a8ho4dmy1ymd8vm0o0x01nfdwjwoew6jqmhpxbmipv2fzlz8on3u2fwg6ijvr48ozahq8pfrmi5wg37cmftw2z9iew0wliujayivwwtvcubohc7bglrsreeair66so96jd2uix2zkchueljskyqw69bee085ldlgznl8k354aln1nw3cn41rz26mczc4qb912sfptgkwqv8wu2o8q5oa8nc5ar0z2u14x4fal4ezs4pd8bu99ud07i04f7d19rhxhm5go4si7lj7q472w624l7bjcfeh47ugy4syxm9f5dr9jjuzlvgy0lw37r3gkmtmdicmncbz826avm9s8cq4h3wwtwm5o6dg63bux0pm477zwfquokxyuiqntqhtc9dkp4u6tw760hl3puc14baa0ag4wxh6mz4zvrqz3wv9c8pyf1dv2u4h1hovyaf0usfqcokjzpfbpq49cngwwi2olxwgl0yxul652cmegw67biev6nzshsoe7kzw6bm04bfj2cweej2z0jy343vmaqmnthy4i4pcdnl31w38eqdl4wpewjcsd6vi38rsv8p0rl85lykftvnd63drpj2r6ltjrqs47vixfxb4c03vdmcw90zetjryr32hhm6kqvcfjxv0361trsrf0sy0jgtmria507drlx8cbz25fnx5f2hmyh02g6kvy4asm5amzor4v47yvrj44cdne0bg6hobrnrd9777pfvp299y0duo7h0qzb5o3eyaw3ux7pg83ioqh9ewl6sfzenxoq4vyvhnx0vrazk0o4dcs8r6c9t3tuccebccm89dlclbnpeh8a9attuoevynlendz0crtf5malj05c7pmz7enehydlvw35cjvjf1o9qf809jg362jgo73dllp41zzsid8qfqf06ia9qminhs7q5pj1kbpb8xupv8',
                expiredAccessToken: 54670564584,
                expiredRefreshToken: 6414445052,
                isActive: true,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'AUTHORIZATION_CODE',
                name: 'kwl8pq18gb2ehhc0qvzbparcvwiu1pjhbhgwhe0pyliojyyymnsaszpmfns5ba64fnlzufy9jmdmjfakhwm5bkiwhw1r6gxceqpgsuyo4oppamyt7bb5eq9ehfxma23r11dw4p5vw2l9ahyiijkut0zsoz418g3m86oxbdybbvidyg924p4xn4snhpkvhf9ilvg39re9749wwuajiytyqnlbgli4dky6bkljfyb450nkoo1lmw2y0464csl5886',
                secret: '3b9e7kwe321053rse9v8sbyfrcjasia0kvk8cpyn6ejzue545y10biyaf8lizxugf8v21p8ae4s2zz8vw6tiz1qy0b',
                authUrl: 'eozinnbwhtdn3uhqd83fvdaaob7c6ll9m5kxq2rc2c9044go741f4x8g5xqoi6s3z2e9pstgx0of53uyovh4a95g4owq4s9bamhkfaetx3emyb4maxh88imjrcqtaihza4w3rsoapjcgn5thsilii31khd0lxabprrnfqlwgs6iye3vmuywxvhk7h0p4ezthiu8hs79ew9qzzblud0xjufr5evdonjv2risvf31sx17zta5s5icsgjqid5es0two0rvulw35rkojg0f6tidr1gzr8vc5muh42hdkd0i3ynfbk4e5pyadrwck121ndog8x1p0clz484z1mts323k0ld5l0q9skujg9fxj4dy50qef88nimsce8e4k07z66p09c8q8l1tcs08pa5rf4zkw76p2bdyqdm8ty6yjppsx0zat909942wm7nluh57fm7ccbe1fflxdk3g5dp8kg96i7npmtkg39due5xw6zh4m1r29qf5jbjwpdclj7uiru41wvjkmuvcgozllbgubb1anhwhqusrwdu7alhb2tvnt5d17lcnq437lpixuxevzh8hy0tn620dyw57m8drw53po765bxfzj1wqsz3f7ktuo7metx0rj0bxp5gg1618uz1k59muj7umu1rur7sjhxdjv0o4cg5i0shklya6g3b1o9g2blmr4p371fuhg867e7y0ofv7ag7224morapfilqf8ui3u4aacnopn86h9qlysm708v8h29gel2obnulmlgesofx5t7v26zdgicalqrjme5b7ra58801mn4sf2yj8lhdvwv5sawjiaecghlhg2cacpvebvhwgfteuq21is9hf078ge3me4ccu0pfmli3ll1ws8bo4bs6lj5ewa7n6wxbbf28kg43d5chjxvmxy1n5gdmnum8dstx7rmt0o00hutdb3ilgk9knb1i9rkwdrtayt10x23jdye9kwurd8skd1fwhx7v03p9l2deo8bgkfdhpgr5149wesh8o8q5je8q6uf8781qy4o283r6h926nw1etjhghguy0cu7g1e1jnmca7b45l93alvz3no4tu47dyuklla4utzrqksc3ixee0qhkzsxry03cjg5193jq0um7pioglaughrgspd4nvkzzeo5hfod88prz1busrw3ple2rya24eq61hnkpsr8y9da58nxdf47mt8vlycd5bod0z3oa74wfu3w3yv3mjpwahgejf9gh5eumxe69wap0wwbrvipzdvq0rsicur3ww3v437bkix6h7mde6r694rsnjzfnnzeorddd07g0z8s2ebjobzpi5mlbxfozqtbm0q4trv6mgvtqylbx9d0llqdra974qi3gjmvaft6dzokrftt3rowmvb4oe23pur586f5ieqz0ndmmklvordfnpnuk3j48c2wkcb8ixwq90uhriz4o41vug0831c5951xijxjsvs2id1b52a8w2vmsvuogd9l8wwhr5oyu7ucjdum7vfaq8u2ex6vq9v5y2fmm5pj8duku0x32591z1smu3d4n2k3yp2g0v7t7lqlmq9d2uc3kkzntndjuxm1utuo6dawcpsuvjyd0y72mtqfik4c1y1yamgx41kgmn4qr4h2xbkn2wmfve95eel5m7slusvzwropqpbrkgs6t6zu0c38ms02xepfxyzsexmyp1eiiv2m21eevlng2czkgeg4cncz8whzljwttxov2ih7pder2zh6we0mg0jps7jnwni5tsob693njszi5mosbnm970wf3v3xljl72nr55tdz7402ueh5k3l2yer9xwi1vw9kclpvhj6cz702qhsiyhkkeknx69u1919vibz8541w714t5zam3563zkk897jzd517glvrjrkie0dtavvd8egh9jzhf2hn1uh5v1ykuv5udsdhoipx3rw3ktnakq02dvm8nml701tmjh80vgb5uc82cenqsdrspd4jdgxk9u09xyabrxaqu83xlsbp6b02570fz6lvi1wxnjcmld0zkol4z937l0',
                redirect: 'i4lulsudp9etb8za1y0kpupje32ib9d4aemwu2j0xcjbsc66d6b2ag34fo6p1acse3oerjcl9o52pst47edd92qad4rwjt1q253s8mxjbpoyip1vlp37wvnxdy6lxntjopjwjti0drb3k4nwqzc6oupd9vq2cma62noy3njnd815rdtk1o4hzmr26b1cvm8ygijdzugwrnplx1atgmsaqvc1gr1gk43gtj7h3v3tya0fnitxwe57kib4fckn4jksrkv7l3jrk011ihrcyav1l75i9nz8z79d49utw5eg46anx4z1jnmxwtu9usa8p55zmxn56t3g27dvqp6hkt7yympjqws6ydo22nd78haeyhv56cu3t2q8vf86b1emhdsfcln27bbe6x9nqv79lh79g1w514e4sdyl4em9obqu7j2i0ufvsjssqzsc3e5mxdwxnya6v6816d2ql1brzeirnq1y7zmmrcf8u5gyx10kymf1wxprd1phcekcmvtveyrowu0gfy8sdxlqfxlrcgrl71n724s9dziaapgvvbhdh9yh3lj7niq5fehfcugcliy3ovwg1t10mu6cmqp7tscdi70gh8084qrb8rxim43kskwskxzi8yegdhy5hdfxct9fdsb49qvntwf84d8a3aeq41wvlrn7ksjvy1epoj7klb142p4ms37hdgd1y2wr7r7yupcarixcyooc7h9s79mkq32nz13xi678xgh48k2evfjzdlozbxnb6aeezb0s0eultjterq0qy0m6xv2jg2cdxji5k4af08eq9epmn3pjluxxprbanvtjgfu42cvctwi2966qoiy0nygd5lfrtk0hkp4dmq3s03nu6tzaqpj9eygq2shf7tkdjmcyvwz9tw0q44tvvhv8avdgxd37r87yxjw09axq2pun4hte70fr1jy97qppanlto40uzd0ens68xsrj615mgg2s6sa0uepdrf0tuuis6bha785yemmqjheiyti9tlcpi63ieb7j9z31r3ikfz8jxna90ngkqcy5n7iiwbvdmigauhcpoij9ufyrgabsj1d5vzbgbhox8iv6vqtd5mrckrdq9z181scz22sf3ajwlf0f1zaa0evktp7b14ukm9isz41k1ham0y9vtbun01r1tq4ug2pdfm3ehhj099r2gjb5zsnzrdazgg1bpxki9fzs9co6ii1xjcr0c6rj8knfrl7y7ygofcx7mqkgmf1mhw3e342jrul1ijw07jojgdyuyi34eha6rqb58g0ndao8ll2w2blve33l52m4mvtr2wqe5ii3w8wc21gx730lacwcmcgj8as2y5n9frme62h1cscikmn7deseth2qc30am6og4i6vj5y4dr1dg2uf5kydls823y6g9m99oxymyj2kzjk9jaoekgt5ic70rp7ygdn0nwsrp9oyt9001m903juuacqw34jkchmtvva0lxl8li5el9d1m0gzty2ghzok9rgqx8cd66el4ex2ahaqw9pj658azdx4x9tf0cho84mfb4rzyy4kgksh8bxo6c6crr9vzipi81d9tviabz459jqs2dsn05z9w1a1mhx6rzv0qf26i0qjsk2vxogy9omiio0ipmr86rkklqy3pesky6xbzj1r7f7hbca3azzzvsjyhne04ydm9vrvo9oakusyqjnzhrvr80ploda3i0bh29kyi33r3rr6kk0ho7lez5c4eb3l3xqukprrtu59ibh7fncl4jl790iefgs3lhdiw9bb1z1b81dzom7cjjvdfq4i8mdvw8ovupy9bb8l0nez6yxbtsc917146z2hybky4efa0sr03em4s7166vdln902jipb8clplticnsakbt7wn49fr2tr2psl7987vdbm8r8wcrzeys64e52e6vmhvg874cbvcrz0yc5nrcvndrphg9om8sekjnd5uj2ul8tf7akkf00aejpyh8pr9zjg07lc08kj56h4fm64he0uj8dq0ugl2eyn4aju7xln7gjhmnnkfvo5ueiaup9e',
                expiredAccessToken: 3317712479,
                expiredRefreshToken: 53622151956,
                isActive: false,
                isMaster: false,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'AUTHORIZATION_CODE',
                name: 'xsthop5v95qrtj9t40n20uyge54yz3tzc6kobulrsq18i07xwnrnseo58ayoqcnntisvfcqmrh480r4squyuw6d3kjg7tozyhmerdihge57gwk72qgdim0ovypt0e5ctbjdry829o0fx2xwo78k9xapgacebahheofwo4um7ct9impjo95oncnsz3cyb57fy86blnzd6rszp5q1wgzyc7qh2neilndsjoxplllproz5noz61aaeheoibou5hvy5',
                secret: 'yye6686uxlx543jeywz0b9cgn4osiaebofvbsb417pnnqanxhcnw1znartudbpb7ry3p266sri7oj88bimjhnvq80d',
                authUrl: 'is6xrcp4su9r7axlvv2xqodavi78ka7ikkegavq9qf47pj0tt9uepvjenjqtbrofzm0qxb10p99wzkn1o2cp46i4fpjz77kkjxnbzrrnbot49bc1q1y7v5u5od5eth7u0j65nh4ektjhr0n3zu4wfn8mbuhp6ajlggcv7oebyuan3rv9ogouojfsrioiqpkq7ykyoew1fekl464s0zmlsw3dxmlj4moro9u1hxazoosi43ococlrfvr6z2621nctxfwko0l9no3zbljljtmw77q3ikqzluoa225aw9zd001xc5m2vzd9lxrrizvy3xida4c6ff006w9rphwownu2666333jql55j4fc2r26i8c10lkmza1qagtrnqoq0qdxfzdi7x9bzh06kv9gr3p3hxhlmn4y39k4ry3amv7itycttin78z3ga2nzd18nxnc97k74kauya1ou8gx9adcj44bpp2rhqmzwxpxseu2c8sef5ety91byw3h40l7tzkm4ymusosnfrvgvxdbi0ac3u6idoqu5l9kzrftr1iuddlw42gsllwpdarl58cpago19apuxwpz8cszgpg1wjbtiazyes0tbusoz1p8fndkopb0plunal7gvjus6qr0a2sd0x6cq2ebprq77tovufjqw4xvf47d3nbo9ad1b0krcqunnbxycgqm9kxtf19zshtgfqoukbdssnckpee3yf9er6arx5zxr35bx7eoo1onmcotuzhl6cv50aq6b66xxkb4viu1rrmauz5s7tm0ecpbjiaphuj6q0g39m4jaeowegtnvt5f2f6inocxevmiyb448w3vct3xgbmoem4sayrtdgxdyvgcq8bhh1args6h4d717j6b4zh8jwny2c2c84i7ptcvib0ew5xegt5qtlzzteq1elcze967xuakqri0b0a8s1ta4lyimomjibwz4fesv0yeq1nijyr8vy25crvfb4pr0d65mindkrn5kh6zzxwhvpyri80mrkvqn94arbal7a92l7qtzvk8p37f0erpt5q1zgt4tanki1niiaq4iebe8j0vb2b51hg1ds159l90u3yvu9hpsncoxy4dab1p5wvsvwp0dn2hfut2bb2gz2jy0jxf9cgdz6eb27ayyy39eg1huroqgacvtjxqg55jeeuan00pol1oh7l6lqy00hn3lp7tpc6ios94y56fp7rdmroyfcgehty9njd2rsctprg9cm4p5sf6516ar0v0x4tw5wvg1x7wkp5gt11s1noy1n1gumsomlrn4m3paqzp2wu1vdjlz6jfe236lys26c4k5rogeq2g845voworozyck0mj0m850e92vb49k808046zorab7l2liaujz2sphr2hermwfkoaa769nxxbnwxch6a72a6fgqvn8h4cw4cvj9fux4r8hltc9eiwqrbzl33kv3g2aycfbxxpkeqi45zovef8p0bea6ikcqke6otc2r66a4h8vxw4oz6jjrb6ykcp1rtabkwg42qdq2o8jx79b0rf5qvwk4pcfwz21odubbbohrjoiybls1vo0n51vxnb5drkif655193skqulezmwv2rssw3molfldqeix6ikomsfikb42eugxx2i6hyxx7xa8zoy3u7f86nl8w3h1vatyw8yn4i53q72vvnvz0hqd8n55b16uqzj5n3qbl3ijmqjvmgiqkkl0s54s2ukldfc768ucou3yzqqugxij3djlkyh9ass5z3twe4e251oym1pbqh2xsww1fahvthz7gbji9e45ryokstffm1p9o246rctslwfe2974k1s6ovz2xbhtec2g94e3p7kzzo93b7o597pwbquvhlj2nuw1aal48uq35qi2vzm8ocb1j42ll5dc0gf4q3sf4r3wwzvz73msa98ckn5qjtr7rv6aketh8e7p0j91ugdfkegwztikdybjfzdpj12o6ys7s58o3iydvt7st93at93x4mqlrileyjncdo5fdb32alu9svghaqmeqdb5xog3ddghd6j2k3ef',
                redirect: '829740e8po6oqg8206640ptelfo2k87ichlammrm7p36yg4xfwtnlbq382zmumx0sw81uhz96nr7krw7cprvlilyyus5gecpk4bjq4hb6z58hsd7fjhiw6v1ij38kychxtaha4ekhhujy6x7piagxwcjik4iza76qg4t5xnyoh2lwcu2urir8skz6m7hxasn0zju7p57echk8xil45qj1s94vqqi8i6krmc6c85cmtt4dpr2y6oygr1alagghs16bzvqatamjd3m15xmq5qyfm86lvzbfy0oer0t5q1tvtbj9d2jim8oxczqrpho5whhl9wve2014fbb5y0mbyj89qqqefh7j7ol8c69uis86sxdcb6459z1amacdxxe7hzis1wyr7or1sl6axyzeq8q66b5pchyjzt1737nyuorjurqjwn14z2zf5fqusnqvirmnls5a27l3z83dkgkvtt8h5z3sl1x4tt5a8y706agp09mguqwatkk0evmlc1za1m52eluuhqr06fjf5aifep7zm6xt1irksr1dnd7k2s2cwc9w6cndk0lljp2kanf1tooo9tihghkeupu8jmjbe6hodzq6p31z5laxeai6vjzhn62ir8c5348pr3qmisahx887bjr87hjl4nj0ftnciq2wtpopberrhbbuxnytxk3m39f315hgjj7yheiqqalot9skd1l614nix5ihrb0dsmhisv9srjnyh8bmimmkv707tkqik8s58guiyewo9u0mcz7wum2l8nnm1e39m1ijswqa5nba4q3e5yb8r4hq4ty2t2xm2pic7fbcklq2n0tqact4oohftry6n5r4a3ghzjshh3q9x4j9g75co4smqnqgkj7215sth6ly0lsxswjfm08x338qqvpv1fnmut4xj35t4fli66p6clg64kqdg2vqv8mts5dot8mmjdzeh5eg8ctqz04t7tkxanadqvcp8yarju4w73q9g0i4t8iu17wlcfy1vfi0h7oo57gqvo3d8cbo746o1srlqgb9bg1436aeucbcr6sz7sbna32kxa8m63qzxp21ihb7o1nc8kj37h8akk8i18rrl16dxl1nqz7a1udig10cm6rqczm4d94atga6cwtptrc7q0gxlbxayvhfrbd7fm2txw03jyce98orx95cbhscc7g8zxkj6ljcg6rtb69dsdv6pm7c673clf2y2qzzoshnc6phrgvg95m3r30rfcdnmjtipslirhyap03yqqt67v2dxayh2ughyyd2lt17rcwytch0usakpf8r1z4d4vejbcf59pium7dhm73dwj4mfzrl09jiwnt56orjk7s24vfa6ej75fwhsn5batqipof8varz7p49eyuptcvyesig3ntxwpikvfsux9deolje1qr16yh0qbz78vxhbxcvzkkk756p5kmda29xdveq41n2xyyu2ub3l564j0fja5joy6h12lilyevdbf4f8k7ptjdpfsfgz1ey49xq7nb6gv2wl5s212oerp1k06kzpnejh3qlhk0vni9pfu9crrtza7iztpt64u23v64qu7ow92wunzmi4pd9qo79plnryur0db4rdgpzzjfqzpna2inynrgotimj2da9dami40f9qtr25kmstf8u7qoha1hj61n9ymm3o7bnulxi1mlnsivb03amyb7dqnx2gbkcb35l4pa3cu7ff1uy8viep95a7yv9lruaaqobwcv1yuuan1me8n3hmdj6y8oni58nhvtcshmdid5ebdgua6mw2bvu60n4a622ise7lq7dnle6uxb3qskycvu1gfkv4m1ljjnvr00w2ik1mh6ighi73u80obqf47o9l3ndy3ossnzfj1ki0h2fmzzoe0hx7mor1nd2g9lyzik205lhvu4b5v3gjnsqzoc4tuhng2rn467dzp7cb0r7tny3a9w1ookyb6w8l7nm6d0dvylnwpjziqcjnp5yz6eauv5864zpxi2l4nd1603fjd33khms3pqt82mkd27yvof1fepsoq6k6hx',
                expiredAccessToken: -9,
                expiredRefreshToken: 8688808998,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'AUTHORIZATION_CODE',
                name: 'hxu7yakvqqnl1xks6d87vqc3l7mczo1f7r78ed127s5nplipq027n1nyv118uhy2azb4jef0gc4drdpw3hrxsdisu2x8vj8rnxb9z6m6pb439apu9ddxhqii65s5b132pkemk61d6ezcx9ogs3w3jpnl4b1dl1hvu0buha1hozixndqv00odwo4cx4a53tp33q1pwnr88hkiszb14gg64zuad3fhdswjo3w4h309gdzsvjyjmmwlq6edf1f4lu0',
                secret: 'fx3jkr7ok795krvbn6fkrxediy7c9nf5y0s91r9bwd4j2u9ybmo4re1raj1tbkf00t6oj16q3t3g8y3w4pnc114991',
                authUrl: 'zs4umjs133gvj33dohzscbeatcy19ln25d4f6gj9t3qq2xos9prltj2u3bippp4ycjnacc56khv1yh4gz5y8goamjwsjusf60vmgo2g6juxwmjv6ooy4c391g43b37zf4ye8zs21xngor6jf50pjjzcjgbkamrk14arse28up6wzwoxlje4zfylwy2g42xzdvvb6vi9murkkqqvyemrgkmb3k9cunm8aecgbdfv1alote681ufqfpvnioskadaw52sie27exffocoqyzhbqefrg674hqc0v6o8iqp5h3fuhs4le85n8k1rruoe9rqdtvfos19zpqoiiv9f89stsdssvw8pbjmrnxpq1lvjjz1cf95npst2xr0cfz8bee43eket3x2fkfiltkq0sxp9t52iti8wci9apjts7kaihzpdilhgkg26q1rd8vvpdfjjd8s9ci74qvm2ux9o7m3fuvxyq7xnq5o4rjawr41pyltqmoemwzq7k9c2kj526oq2z98osojycpr93wl8aps1t3flzpgronorxa2f8bov9lw29dd8jue2gzoc83t4xpmkl6euxdzkjlfy1oe6qmi94x1357yc5c0n6iackztn1in7uqb408vtdtzri56okjx6v6j2t0f0id6rrku2ky0epbeze13mhfp4a95q5r6r3z8xdgml1m4lqy8r4rdkkbla098rnhl25lb95qfeohlk1dq1rm6r7e2v1oeepj34gyv7wzel4gwb5l1vpkyxgy4fznnpv48g784u5ckcwo6m1u6a4x4qlgzx1vgfr8tn6wks9oume1zs45zjptwlkrz40g5hu296ztcaatoi6qcao0zg3hzbmb0u923pqxr1rheteey1z49kllzhc2m1hogtcmn9d21l0pmuqw33wcvgzf9nwredq7ld83iu3mgh8ulduurvpmhn0eb7epmmrd9hixz4o1stchfmld9uyeev6nd3wey2hfk1obuskkkaa0grumvcqj1kfsbmz296mfke4ynznzbik7nqdiwymnilcewczmfs79csglze6as7jgfv6ui269f19ch865vziwrdpuoace0mx6n913uvjny5lgimqdctu4628o0hdg9wh6fjdzozrr6bmxbrtf2i0kru8qthgmpn6kejetd9qqnjbxo16u8x4v4xec2iio7zci2wcm4i1vpxvblfnzxqf4huotoh27orglrn08beow8l9thun99w88uc33b338hsoxanifua8vowsydgp6sy89b5igrcbe2sx09uivmtkol5nkow0pt4544vaf84q05u34qcg0l0kd28zq6qzma50nz0cx702eap52co45edajjkw3o9i7ez87t75niecyiiy8dwu1vhuxvxqqp1xldzdqh71hm1ama3xpzpp6cxpiqf6oj7j48wnp6kpm73firv3cpj6dxptkx0xn6poplthrysftyvrleqmg3y9o7e0qkqk567dgsv0wcvt3c6cxhlbuitfbmqfh3anm65xw76i93bb1mgwpk0clcskw90w00p0mltzb0flb2c51539yi4j2gvew20w2o2lsnru2e93qjm0q6c4jzu8kk8bbxu04bdtu6xrbi27pdklza6auv4d098bqxj8ueiueqk2y1atc4oc61xy9xrqmkm4fz5k8g0lycqwto5dad0xd208ati4ycqvhr91x7q66j85jc7cpls278cnjedmsb3kx48rq4kqu2ln2j0ccb1j6lupk9xflqjqqkougugk7vluyq6spzgibx5mt170fehbiz64o0trr4bz1bmv3hblbpxqf8zrqzmiqr15z1790tl51dhqne3uqf0qph38akmzrehl44jpe109vjcp9csnt7yqks3hryxx8s3u7euxd71h62b48cxltt2opx7j74zutl14aunm2r198lay9jzan48kcy10v63rc40n3c9jdbkm18r46ziabluzv0qixupw6w7dfo7cclk972yijs8h1zgdth67u7xj6e5pw61jy285zjf6wian7',
                redirect: '4euofkzi6w763cu2ubvlizl3qcudzoxzsi9g1annjw5nh1summmls7a5j1rktdfah2w5b3g1180850dt2kxgmrp5m0nmt9uam9e0jz0ekgfsevgpip42znr48rlz9yom5pqswve4vz1mzv9u6jwp7pugznsbvil8wgbmu7rytz0wl786qom6ms6jric9qb1ulssb6j0w0136updmka7v8ftu5mo76lfcw0vet8lw3oqnnh2u0ly2s1eez359agm3dsttuj8m0ammybw4dmu5c7dftoqsx3z9q3vk26jn71f9t8cus68e1xpu6un3yrf1vm8ebye29ljk0cce02uznv7lfhi5i4g3rv2h3gpp7dcamj9jqny2qgz09gr4j595djxlxa1tqagt0xnqu9v1ukc4are60nw9nwx9ei6fe547wegx0mv5jnxfft691ag4wgseqqkvbozry2iavil9yrcf2jmj8wngejh4xndilekr0jg1gv1tluf7gyk26pkoerda1t4cvv30fw6s5miskvl415z52mzwjbf5o5ea0t9qsmkf4e3biwi6tpwfsfdzrs9dwfymvvn29x2a1y3wnnnncohl76dywbv3jccr1fq88sv843bq8rvwtbnjsqmi8yhcc3e33spc2mgbkcwz5b24wzgxjfhr9wuossudbhk18zbaklzmso84mbcg7pd132wquzbxeh2fqk0d9l3zhhnvy8kpn6cun9aatt1yy006z1ov13jw5dx8fijujy6x828ruvh56sxa3r4dyoezvu1oufla325364lhcvcf5xfrbuw1onl4bvsb8vxpznhcbl971nvvhfddtenbm1aiqy4eeid23t3u9qi7fpcpdlnhjwg33eak573gkeegswbihipklcwszbwlrm2tqrlmpzrn1ve8bksesce8xlx7flyecgq7e6nx4pzg9t8e2lwwttj8cp1affv359uiwe2dhj01g32p1tx5ui7nz4bpsn8i30qwc8pai2tcvpj12h4itu0t1cmyowknzubvd1asjg2p21mas4k317v9t9oaa07wjmqm2lrehqtxma1yzn6mjdffnx7pb73p44f8xx4igu20omg5c9lm055j12zsd2ema11hebhhs8zwquuss0xjl07fpe8q1cjf45vgelsy8yu3v57zzlv9y6327mtghtqiezeaf2c33o970taumtaeoca1ri6n8h43n4axn73fzetqjb2oc4v4947i2oco2ky0uv3ml3ju4feltyjmqh1jntk2uosr5wuder79e9e3lnq4zufa3a1zjysbe8v1hrd6lp1ku210l5v14ip8fwt75jlgahtorre62191yth8n92dkgnn69hsgfej0qehxqczvj251xkx9znf1u0fidtqef66xruax6qcl60a7bbz0yplp86hjaefw3vbq0an9zwdq4q5qshf38fyfsc0wnri7u35r44xhdhvcs677jiq3gxo5ysh04x50wsyrsai9wwfi9kqjd20t9htqdbayutq11uvbaj8wr9gkuvu1t0p4vo8e5lijaq55a5nr1bmfav8emwewd0ib1d8ve1czlp0aua3o6rrgh4ep6ekhlo1h1fwxb42cgxlf3gfqirq6dpq8vbwls7rfbp4gov31icvos0uzsj0v1ly5su9hr85espputpkrxtdz0gq36dof7s8lugzadql9jv9p3rp5t0pj6iobgzpeg7cy6z7y5er7h7s2fbixfucz6zu2cewppy0q2d2qutz6vnolko4oezyty9nwexs5qk0z5rkuscle6h30nyqv7woq0r3yw4n8amxoen13h1963ybkwxm5tar8sq2gqhixrdrr7ivte89lzfdgtu1kul3gxbm5o7ksk4ws8vm3hf8ycvfnllgchmwk2fvw4q86a1rn5q5afuh43kzniuve0g90g93te8ibcol3om7oclvsuivwdrah9lcrr76oxwox0n8ogzggbdqkycm4uguq71luz5hqf1hvct3q3bud5bmkowzp2akgoey',
                expiredAccessToken: 8169874865,
                expiredRefreshToken: -9,
                isActive: false,
                isMaster: false,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'PASSWORD',
                name: '2ysfbt9lxy1uaantkm3ysh5ukbge9xu3iczvsbxqgiruy50hzzhask1x6618cz305srvn1uhv7y0efw9nzakvuv53eqdp1tmeasd2sjfleyczvhvljeof1qjy2xez2x6nj3rjt7rd466fxfcfcvnzjfw69jdds71mzes08syxyf2hdkbvphbbwsrkmexmccxu1lwme9p58g75c68s2st7mzt5fc61jyinqfb6qtr5m7zpaoxvcvlpes2aqutizw',
                secret: 'pl53jvbcoc4h7288iva80mrh416yeocvgubo2r6mrhxk6zy8993hkdpvlqpbe1c5oos6ci6d45amcv9knv8rk2sv9g',
                authUrl: '3tiqe3zwzc013m4jp08j0s2qpetwq77aur5lx7r4sxgtkstmnw5pfs5kczyu6ntedw5zq7htsajs7gv3v3p81uzcrhrqafcqp79wcc6kff37zeqsw7qe2drgqru7qtges2a5leqeozlucgj3luw03gb7omm4323s6ow2gow8cue63kgzhw2ezq18kzwuwicbuog52qxzbcqtgcuv2rgaemv0wyyhm989oid3cg49013hefr5j58xax45umzlcwd5fr7h87mft71pd0jz8o04v9l0wsn6uwja9xtjnu7dygbeqfkwofg6zisbh7piph35hqpt13g54dmzys7e9mp7ligxmb246yym5sgabxk0840pd40r42z94enc1j983x7uwcfo9em4dn3dfe2bt094xk8yrl2fxorrw7b2sebf7dw1fmh7bi1vzv9ti6yprc37hx5cag4stm9eg42lw8vuhipiivbvjqtzrhzzhqfpf11w5t71i4af5513glqzcq77z46y5ghjt8b7vtii9de6s8znt9fpmgy5xmxo4ay0uofxrf0edix14358p26n6kkrxn9cn3vn732wb2nexyo4ym34jdkslscf0qpom509hdgox5jxeoc3wmfcm9up580llptcb3cfr7djc0jplakj6g3udvaztyu35mk3ycyf7zkf4k3ucsqx7p2696uvf0otham9oi6lqq3jnlsp08jnkk1kx1arx79v3zuz7qs387uggtw7zvij05g9h4jw81k9hs5irvz49fd6av2mgozxvdu9a65ypsx4jm24a9q3pkdghvl6dxud9ufj5p2lz5o85nkmya73glsvv2zqeki3hab13kiglehz276zlt85cmqou97l5m4dw87fcuy7use294zv98x5vruk1mfkq8ohmrrsznm7yaxx6ywftjzsq8q0nb5abfu33yo323i4dieal34oxx59drfunnf9py00mfixyb459rqrz4qm6tswszvvyu1n8zq9jiprf9d35dj8vugp8cefq218eda2d4aevt1hldykwd5ijw0s04qhb47hxsx82c2a3o9w5izgkolnsv7tryrh63cansz5atg2mb5c1iesijfycvnmyqe6501wbwakf5ykdkhjml86yenchtg30pd0gbdj918mynbi1itq1dwir8qd3pebv6jnnmt39umkbrl1gsw6a9nzour1cxj74olq1d7fp3mkexf1td5ec6kbfhdh236qcigpps0z9angm2w21skd9dsc86s35xgophciekqjokk4agngllme94sjsvy5nyszo60x48staorq1y36939bktr6izfuqvx1edgqpmnu67nivs83fb03th4mx6d74dvh15xt5a2mbwblblwjwikw2ehn5tdybiuco0j3lp3420spbn7078mwzk2tcqvx3jc79e3tzbpz8rw6v5gtvf0zd5v6yvvbwcf5qxzktygukgbbc00x2nlo06ha0usf9wpaq4hn3rz47mjfcmam63rylm7jvtplhu7vdfcgrnaf4mvidd7k6gy2xvc00a5aqyu8ip4k0m8t1hpa10ab5lkupou56miu5p9vmw7r12x0p0rv1t1lycgvbfia3d9d8lrbfagl7inneks2ziq1dhwhl72uhnyint3l39r24mxobakvsnr4sk17e9398t7ovxtngbgxa1m1rrz30urtuyxvozo8br4gcqm0uhvjegnwkxip3urauakomk29517uxauq83pmtor9h5h665t93p2laatsz60n3wf620x6ocr3kcvu6262c15hj5ug7hrbfiryymmpw5xxf5l7x6zpo75c3i0qmatc1taevhz7h0ffatwc5vuw6l9e5l0hp5bwmvxhqpggnv2rcnw3q0xe4hzvrm8alj75piopmg4znao308wzwy4bn003zsmcnrsjnz48ckj286oqtui95g858lbfqqcri9i466tfyp7acoqea6bz4yw7culjghxmo2lzr8w12oorp5pxm1cdsj0qd7q5wbynaqfn',
                redirect: '4yc2uh4wfuqa2kd10moc4r9amlalzlsj3q41v5n6bfd5xhed46afz7ch8vukbtiz2suuc1gxcp4rvl617pcpp3le81pcptrh2fxkclkgloruiwccx55d0w1iwfpws2jy93yiqjtimvwtyqn42052zvhnqwzx5ssqw9s2rg8cjcfz3a7zrxdfaaqk463gwpfumk21zync7twouurt4nf4ivwox7bb71xna7hdn1q94zndyqlsvybuaiv4cbcc597p935onr1g3uyx65h3wd6bjz15opqquadrk4rq29apqcpvb0r0iz6g9zhc0lt6znwiz8h7qv1f6mopi6ftuyio28p1xsnoow1arnic4w5qdr383tkvmlrec6w0595cggidna134y181hrq3358p82q93bmq0vbhakk63dpfko8cux7huigv7fjb8l7p2fkpcn27kqgwnom3evv184shgnjkcvne5wukv1br54qexowwg0bgnwbxwo28xvhgx6wt2a6hz8scmb186ps44vof7s9hd3vvoqw03ect5eakdpacjr2go4pk77xxqr622cjk0vcpecnuxk4tu8w9nfsc18r2glsc1utesewpapl66kjqrfmpc5mapatilnbt6fuiayrkywqi64cdr5rp4d3q59jofzmp8w005rl5bl73pu3xw67b8snpuea7z2mfa65mdudlugh7rs3fz6yooqyxbi54vxziwy4yt3o0spp6ckoyt6q5krmku8mu7s0s25qvm3mia7ow1xva1hj1jvr9jrws804k7gwmdnr8ml688ld83bhd0es0mr1oclrow292f2kzsdy7getcv364oibej2cilwjhp9lcds4yr18h1ab00g98l2xabspyze7bedapzwtbrosgbm6hwkcee1wcezu6adyr4u0m7y0tmw6hewata9h82uhi4hp8r1sbxqscrrnms3w77okihlctxwfefcuzj0i9kmyzy36g2f04vp5s90v42izf96pp8n2fhehkrja5c9b4n0zdxglv3la4pl3x0dyeexmr6kjxsgnwylm4t1w5pwlaoj7ow28c3hzvqk3kbnabtgr1lpfihvdvc899apgax769b35gaywu2lyqyjade95lwlwotew9321rtzeqzn63e7q07sv39vcxij9vd1eu6wrm0mn03mnwequiz8ma1f1c8a5ia784prllpjpote3c5cxny3e2fboau4etyg48btoag06f6b6nfz1y9ls9bylax0l61gff37e7bi15z3sjenhs5tz9ykmffrd6glrtxk62oalmvaisqkv1qgcw0ipslsycdmezmh79svn5l013yztho6f6wotbxnbuzo92f4yqbop2s4eb2591a9nfdg6yq8s1acsppck7muw6ab5mlwp8vv9lt4p9v9lz95oegean0lb5jdpbivrjw3vr6qyr0rlf7wlrirj3t2az8yca681tixnu7h9dqttf678sk3m0l7qjf4nh7y8ng3xze9rdt428ftcoi2n88t24fjf26bnjrj3f8uzvuog25r3l827amloly2tzpou02p107dj1zyvcogn4406k3o7i1ia6a1tqvnpv5wht463jy1zgo1cfn7739zhhqcmqtn04my7hrhxm4iezgt719cpz9nuid70sou91bmnnspmcf3h70ccjax4gecita0iz1u931ucu5ioc2xztkad7a0us8sivcmcvyvatplv54u6glgkyt2ijsp5touc9ronyuco1gdqvnatstsf5zltbhesf7s3t1icxpbdm6nzcapmucapqj1hjeernedcot5rtql50fspi88ka81vq3exqwl9z608f2srzk48pawzm0v03ufvtpfk0ejx2sim1z8yswt5c416imp3i3ugic51i2cmex2kgjovdml3h4dbjvemd51nlgo76njushi5o6jitkofwj7i3068pcilywskb3sztgqbogra310j4glx8pg38bh2twd8lkkuououflpkvb02ikxpxnkvdz9ee5o5xn3r',
                expiredAccessToken: 9310679552,
                expiredRefreshToken: 9860651351,
                isActive: 'true',
                isMaster: false,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'PASSWORD',
                name: 'omcrw11939im20qvgoewrjfs80v24qj5ul9d7hm6hjz06edcfnsv2v9zoeqk02uxob4lx9po3rqookan4krfgom759pgfhtt0ojdeazcg874gejdvyr1gj0hw07r44e1hxzuodbhiqd6lcvilf8yebn5dlfqeq1c0l6e69arpwhm39fecwtnxxehih2x33rzrm3hkavtk226hgm5go9n65qkdvo5uhhyudki2rvoh2q32n5vsuypn2o5x3rpctz',
                secret: '3m24jggzyqcgo4qkxdku2ssx1ddw2gec2hvpkia93gp2upze5ove3c70l2zdt9flqdxagc6u6944444pm9gl3on3md',
                authUrl: 'f6pbd47da5q76cpi10yokyo3y6a5oo0fpeezqjgf12ye3055eyj40w8j8rvsom9fxus6pf6nvez2e0vch7nxo0d68awaoc16nriif3ra714iif917i1xuixisix7ttwato1kqkzo0tj2lpvvos0onfaxadc0osbhz52je22j2j4kvtn4oj8jjkb5gg0otv29k293m5zcyrfxepr78wn7vdmu226qp5dgb64unxmxdbvuh0888rno7pdwfo5sfsv4nib5lbepfftzwmorg73gsc6hjsdkjh7pqccb9ailg9dshn11ybzthctmiug478xd32vq2et39faxbc6k306lx554dyoyqz7mkcqaqiuagbv8buz5gzxxy5698ijpmj77k7dyrdmbh0720n0wmaklrkscrbp0j0n79t4pihv2siy8mvlmkkoefl3v1dam4qbndc0hl9bbvujwpd89znujvyjmysbbqi5ynbkok96hr4ti9ms27882qgw4am0zrhnz6n1qhxi8ywi15s9kpyf4xqanc0g2dltwxd0hpflxo01y0w4p5atpoi3fzw3sja1hifba39no9sm3hglcmsxhpocia6p6g56x03kltazn6eqc1hbggzfzqsvrqivj2lwgjk71gg6vcwvukbxvbow90q7nsom1zb5mn85bfxhvxy82qu5luo6rnoelqpfdinnn3qdayo8pklk9gu3o1qf410f5v9cpbq7em76ob86xkuxsl8it5sevws867ask59xxrbc2o4vsdlrbeq94oy31e51i5jitdx851spxrnsg76ipbbp1b6tlbvlu5suh1fbwkjw7ygb43laf22d513vt0vsy7h1g2tmj92oxklfcwkegzerwk1i6twj1qizprt0o95znc7m52wmfq38pc1s7py6sjl3bfurlb0osuro1nx033fvyajqye06p26232h0q8jilbou4680f9ob1bz6lg11kzbyv454uz15h0tfi7oio4t8f574c8lgpbrg3c4gkj5o212ud025w06tvi0jyvlqghxadg5alz8wtctft114zpjgl8xp6ggdmonudgrujtundxyqdr5s3jl1whzjz31xqqs2w9fqq18x16mnlyii53qofp3gorl2o1nr2iy9smjc6h7l4o0xaiweyyt4iz8xqcqe151x7p3irlzmvijh17f3al5o31pq13ppyi67bxt89rnyz04ijemghiflf65aqk0prdo540jwzm5dbstw8yaufigb4g0hbvtsdm8vq09jjggy9spe033gy7saefrm6anwmb5jcr22xf0sbcdzvccqm7plunxt2w7520iei4q9c981ry1zcjx2kectoe74ce3gghgg85cd02llroqie408o0n5rvw1j3s0yqmyjm6qx02k9s3ipqn766xvy5w9jukm35phuztol9lipbzesojxqcd0yeh9d7u1omsb8akwukjesvcvjgtkaajao0uc0m6g8kck3fw7zn50sw8t6amw8a9l4tgqybtj2j8xpz9tahe2ndblq52xwjaaqftxr89nj14ep47ja8srz7u30f65sza21pgy43cih5nm7goasdbxg3b5iy5ck1f1hgbsjwdz56s0dzq4o3k2c1w6jnn4leigywf6rganzf6w5ted0adoph91cy4zem14i1pl8s7bu575vk5u8e90eu88byrp8umu1h8d756autfaedaxqsmdaqe4p6fyj1yuuuaj9awshj10s1i3xdlqu7k77gqb2wtemb21bkdhd297b59nspaf1j1psoc21scci0rrwd9sgq59vmee440edubi20g8ydtmrjb2hn3vxwl7tvw31zjc4jz7xic0icocmuejt90zqbzo0v0jnelkcl1bclf4c3cqem2lu2e3kkmbdi8ojgizxi9y5d3hsksf94ui773e2pn4c89jqgk0do1ykawr89a2iy5knh75i4dsxd4d72w33h9rvk0ezv7hlazz7uxu92tyz3r8ly3jkmfvhs76njsryf48ejiypbq7w',
                redirect: 'vu92c4ybrl37uemkrjyvq7dae6ke9hplahpqsbf6fwe37x4ngvg1jclb5llaxtd7xx39x3myktg1vffkpvzc5xpjzbplyvqwx7jsqf43y4tlrshfee5ovxy089ckngt86cxrburutfqy1n178z80x3ul5uto5yyti1sqr64j5xni4s8nhnf7q5qj75npew6tdlegd5vi2np57b42dgdboblu0w8bpo1q2ucvrkvnka1mchohx2uz71ars6kgqtrye30jwv1djsn50v7obbpc0qtb8qviq2n2a39yhq9frmvk06973g1g4eivrx10o7hxgdsih9j92kiz33i6k4cjzd0fl8a2jj4x5bx5iprxu14p2i31srp2wzugqzvykww2qm0kha4vghtg65qvch2s8eqi5nwjrpvwgap56bdfp4ylsyr6oznrto3w3wj4uy4gc61n31xzbbmh07ret9e0euf6e1o8gx80xbd6annrjh6z5yc401utmeji0tvtbxrj2g1cqzzl7t7mgymnjjujb51givu80tovuy2if90lhd0p2nsrxjw3mvyf5fu991fcxd56vj9oxh8o7xtcq5vtfzfwdo93hacqrqs5t1odwyjko6q0nossub6b9jk7wntgsoiirpj1n415moqdpieutj11n82mrtqwj2kdui82jnjljuk1j6mg7fainreo7dy9bx9q8t8mqf0hwf2pmyqrlzdigj0t8jj5q1j6ott6b981qhg0x0bh4kl9yo0nghmp16dwe21nt3aqsvwxac0o8foqoreyopujw0q7lukhum33gqw2hykvhrvlb9uk9srejhcr9odsm4ky43iixg6ldtmg0vgnritrl7pbbmz03i3l3mssyutu21aa5uxpyg8jjuze10z0ayslsvp0l37fzal30hftemyl46byufpchjqswiqmizqe7dfw0fd6wad0zb7oucapxrakoes22i8ndaqrkhnura8oo5c1gcwipnokh2pzxtijl0axr1p9p05706qthmbz8h6r8hg7y9w8j6qrsyklw699a606jaxs9ebbbdxxpdx8kri7e5jo633cnyc9t1kzli3wfqttj40k6ps4sfl3cpcgl8uyrsytm27cql9emw0br4xncr1g47ocd4dgp3169p8xc7tphh5p69zqk291j2ebpe3byxim6kbm464t53kw0fbb0f53uh6i3wapd3qo6ceh1gc1sslogdjimcbflhm28eztpatowpkduezegvct1kqevyifwp3pu2xeqdslcy7vs9evf014xvxh4cl8wr4z0qcgi4bkzgicu9ak7f7jii8wt1t6ls0ykspf4zxjdjah9zymhtfcifqa6skurxmam2ui2c97t955wo0xvbimblg6dur13v4v0yl6gyw6jgb4duxutjfszzstdco3w4jw0dvmmbd74w4wwx26w226eczdbx779gozwg84sckvacyi4ifmmtdpds9ifo8ssga375r5jv75agwnmvfbp2tyzvmslab0n8bes3dwmdhyp0pxod5t9v6vf1bzsojcgyul01e1qfn9r76mde2gcr1b002h2figes6qeqtg4u0q9v4o7f5knzriwmeqvb8fc85keiwuhmchdovi0hq1ay1xe4t1cf0lo5whgc4hwdjf7os31mfy94sg6t3c51cklxrvn43d0wdwwb3p2fjmhpbnkbgo5anss6i8zx08617v1mb7zx326kphw4ljbjh9i1b7p6oe4r4vpwz30tdqcbblsssnn01866fvr59jms57ljdadkdttb515921yp81s9fy6fs42jby42rlabptjf6vw2qkngqpy3zdvpz3ljvvaoycmhsz2asgtzbwg8exfmck43j4f8dzzhk1dq5o1zazzf6xj1ex6qo9tytzkqxfcf90e1i9zm86otnd8z29of043qhyszo8hg2ww220ic6cewylalgth8sb0s4be9fitzq5lr1dckc0e18fuslhlhp22rrgg8jnkle1exhtl5ae05f2wxnnu4or',
                expiredAccessToken: 1393790990,
                expiredRefreshToken: 1677500148,
                isActive: true,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'XXXX',
                name: 'kceaiwi3p0jv6iib12ih1yfssdf1vboxmgjttxt3j2zx9dlhg2a7p0yldkqgqv4qk2qnceluh33n4fe2l7cfp5ygvwuvcsm2jem3m88404l3wywvh1uygkixpr6iskk832satd5p616iujqmg0dw11hp72mhhtsl7lzuqa712kpchbn29zisfmugjhshbaih2wtrzoqpgxhwv0hs81ipa1q6esvbvbvuwyzqjvnckrqr0gvfcsi3bm0ej82v8ic',
                secret: '671jqv3frcesa8uenrrtn0cio4sondj1d961q1018awynt3rn21913s9ync0zxykxx7mma6cy4mlptb1bh09iwq27j',
                authUrl: 'qyn5l66gjyts99pipoxayv1d0qzxz93bmvjmcq780mepnrnhbjw34zn91sefdtun4qaoiz8fxf15ilmiz4jx42esbxsm1ytysobd2uls77pw51zxfz1og22ohse7ajl1alvogy4n6dh7q2duqje2unxs0rgz43c84mx5p0temu0o2syvxk5hd7jq6ws9pec6zimxmprqc6pfbbmm2rbbg78hapc3zqynoocfy7uci2j5kz0590viwthu5dmyvtemi4n5av28x0c61dxb23eef1iwn3enfadyauq0ouvh0zxo5bfvcbe2bwya6zxj7qs081hh6tccctxj20quy2md7gu2dqairwxsonaxpvo3kgq7eogcxhi3a66lx3efs08lee3vbcebo3iji4exow9mnxgvhxm1wr5c5lpc7d2qo2puwvjex9jbgksebas1u6zr0dognee5m9cmlhl48vzecqoo6dgtrbl67m34as7iflais7sxrzjlycrnag9usxbhcykkoure6tkfcnufyal8eui5kpsx2jncy6sran1tgynt5zvx8rxt5aw4mgjlr9h6risc4kj2k9mauoh44c40wg3oxwjlsak4wg7qmku0pv447c4u2oj204ex96vm7dzh08l6pqx8xe7km0i9j4f9rhhfoenp0serlu21q7722wpatpps2uu8k48fffjdoawi7tpr9m745fvp1f2xrutfebk5azf8u8hrru2pw7h9cu9q84llwrlu5m9d6t05hppx7rokoq5q9f6u1otyrkq1g22cjlrx98tufgckahwrcv52wvfnrw3ajizz4ymbzi7ampjhg3ed4zh0snabvp30009cvcjtdv57jz5rr4x4g1iormyy1uu9baeqx0kctyclcs3o358z9vd31044k8ju14l5g8f2c2l9tuygj6seza9sbqcw8o87ex2960mzflk0y7p1qu9mn2kvh9eewwrynx89msez38dd4n7ybytuqqf5fv403he1ff4tqavh0hunkt2fmb8tqjs4pgb2v1shdqyuzjnspcxmfuqul0e4y6jzqm5qwlnfynw2afpb0k8rmxfx8ozgbdt1vm5bl2es1ib7le3fwby4iglvuiumg8ix2ap7g8ni2wne2bq96we6etqetlkx5rh79u3bkuyvvoe3etamooo3vcbpx5rni969kstk52kpy7256ouwmyr43u1z93s4o4tnz5mvgz4ojg106xethhp7dsm07dc6bmiqctdnhbmteuvdqqngjfb29wwqx9yleo7x8dbpcuuudzwcclhodfm46jga9zzxtnzxgh0p6egb7aokpevamwoyc234bahkstuw5ks6bditf25ys9hoqq7di8y3kez8d7flby7raw1kwc0ylpl3aelogppwja9qdz5pp5zg4pdt83ufxotofonjlovroffn0ys2k9e5f91dqiltfu2pexozznmqn1x2k8b2gvhgn6xuij33xv46wrdbp92ywaajh0xgle6ic9s47guouubv04krv0da0zizcecig3e2s5exqcphdlspz1snhgv85m2hrj4ent0ks3ctj9829k907wiq86i8ujpbib8g590jzlv92idm6ahhsbhotxnvhkbcj2g02ocmkk6xz8fel4bl04h7kgsp8nic9u9w1yd9p5gxd5begobg8i0lzf0uqfo0md1zp3v67l583333aqiwr25mkpk55fprczvzyj6f1v9n62c1jre1h2hwqp3nlprpinjd3suhuda9him66ft2h02alcvezq2s9lkzkwj0zncxmxjlc6xusk110p70yzctv3g1zanyxz6x7x5u9cmkudzcnvnkn53unmjutrw9bm60z160oywgbtbytau54n1v16vvp1zn1et7f3yc4ml7a7z4hcu9hjtpmtk8h9zmy015vbt0zb1aruik9a4sfl34peh8bkqvbi0tg7kho143td8gjfoe7zls5ta8ioxc5hfx9c89v2xorgs9lwde0y2wno4jbl06j90cp0msofk0u39g',
                redirect: '07hh73vk015toocqg4hc5xchercbitxgosryfgsofoy4wa2hxspcz6qt1oq26tti4jqqr0v9ac3gb16hkvmkcz82ptmtihj2ymfigukccclcoxq3iu1efyxehhhjwq0vh1bgbvkhoa5eb82aynm4xhdf5gtkxpc8c0xuedukxl439i40ty0iv9dqch8yiokl92vgluakpfgwclosyzvowouyzyyongfndyddq5b8ioznxvx8e8cdv70zpyrmznhl7dbzw865fv6q8dasro2q2yfzwej95n23yxxrxw9mwjmgtkvd1gwdb55aty45vmg262td5db5eahal0v8s3uhxwzyk1102x360bmnq4fzhdxy8tbfvvdin7zjql0r3n8xy71jblt1bh0gutaszywh7lll71oif87m9iqo2fsju93szx65dkd59uo5je14egjpspkgxh5t7qwswp17sx1y88wj0edaq8l5rayndlgidmv0hcgputobl6zvnrfz2x77c866gr7dtrjsmr0yaa8eryhafuwgvdzv0okeawfbrp2wygqf8xn4w76i64z73rsd3yr1gpnbbyyr54m1xpt7zc17pxzxhn6v07we98ytota449simtefh7p2c4frnan54rzvfsyt4lh4zg6vhfjqosuoryqn8n6lk5qw8qe6v7nbtb2aczipbsaj6rzm9dfjd2qr6cp3zhczoktc1gj55sdzakah4bm8krgs8i33ph0iiao11aq67tywrb2mwu7yqx2qvf3n8daarp1fper0wpkrcrc0p9ehgk1sxi8zlhvnv5hudx2ixn2bop7i9xz0g96gmrmzdhltgnifj3n9u38677mitzbwfc1a5y01u5sgmylkwq0eijukqnfx1vjkt6i1il5qw1b6ymp8rj1m6fvnua0edg51vfj7rkqu92eh56esr27xgo6bqdmrjnyih7tj59fbyfbopzkcc1e51h5agvwzeazv7dawdy7ngtw1mx12sh1ow2b4udhjy5n4issnqw21eoll0p2i07ylh3f4nkseb04x94vrqiosupmfxv3dg3gg5col8zecnhjvaujatw56evbxi10gyomia7uorkqxm38zcnnbmi1xwnq60ihl05eb4g635tc3ixmu6cmm066kznq00ty1d4c0ph963ftjfq4zi3vd6w6lxzyfmhtqd18xk01z7tkagakpsolocp9d8zbqrajbo2dwn9kqmfdm51pvy8gf6sfz1cj4c6q9fxe1t24nhe9pjn64590mla9l6uja75zk0rz0fr3we48fx29x20u1oq21wddleuwbqdntewtfmkll95zxtqxv3340o2fiatumg8jz913ysxegpqf0r4m1q40v8jc9jj8q6xmb8aaltr6ivzv0b0n0aydxni478wry22nja1y6s9j5aachrkbnfpe6g2biyce1dvrvcohwq7ptmjj4qjubqszzna023vcujnr0ygo6j07y6spu3r2yg0fj0ifa3t06jko65h9nspm7x778drf29mq3sr7f9laf6l3ds84opb7okb3ji9r6xxcsynt17ixekeiiqn2paw43dw9u4jyyenpv3zdspktraox22w2orguzdnvdl3qo47w8adgzp2s0jfiwdpexhl2lfwh019f7ka2o9gvuiza3ozqq7oidlw89amk65jpzn0scknin5vljbbruqd68qbtpw8pyb8nv0ycmjrfnu1lsxkm130vlviv1akspzl4zzwqbugu64c45qgw3mllsw6wjx556sb951xe4jahfpx80oc0afdl7bmanlrp91ta95gyviq8vbzkrfuykqtkpfwz6lkljgczva55mcc4w5zqw24agpl5ogw728r5nqup6z8kfm2etvcb9wfjz17ii5e4q3t5ihhscdyuvj00qztzva2ipbqrwppq3qayfmpgzru064r83stdaxdzzu80s65co13037hqqa8dlwgackad0onvhiyesusbw1v24vrisic3n4wvr80p02jaw05pxs7e0y0k3',
                expiredAccessToken: 4038534372,
                expiredRefreshToken: 4508545204,
                isActive: false,
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
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'z3syr5qbmqpycsee0nikhdpxewaliacpfmcguekow7swu7od5kgbsa7mvpxfjx5dmkhdhvj5pdrxpqj515znv0blfzw92csgexs32vzv8yjmogmghbnpokjcb949gn2h675z90gcw86a2cskgkrdewws9jgqjofssw0h7rsmuzo2rh9rwvxe78pgppvgjz3jtdu55soe5bzgcq5ao7e8umgo6fabmx3ysmq3p168qzdop2um7u76p3pzlgkp7eh',
                secret: 'uw5ns8nl6lbxs3wpd0pkmsuaywuq55yt98doco45of7iiikrl19vwojri14w10n2jwe90ziefhgmf0a3912gopppmf',
                authUrl: 'sbfhag4p5tn7e002q5qnmuz9nz5hsb9icdla74bzkzdnujfgk5xwrjjczn62wg25xhm5fuh8m0lcwbz9pxhl72fogwpqw1u2m0ug2k57zpv68hthefnlgmvmutqeyn962o3qac5rtdlhwknei5zormhf00dplr759oh1ivxzqecgf0y61d9nhsjapkqopgatvjp2i0lt0dqardj9sq0outgzp72oryo9wxwa48p2gh2m1bxj3pvf5dhy6o62o54satvefbyn0lxy6zxldmz3jnp784wc8avjd49kxe28bpt8jn65ofjqqrdr0touj07flpx1a0c0tzdswc6xmjcs57k3ipc209qdq6cxfiqi469rt21tqmk9ets54zgmm5j2j48amei4jcbxzepsfc13i94b80qmiva6v9vlp1armipildoo2m2gxpmpk7nppx1varvfiavt7j74d8li0v9xn4ybyyqyvn19u7lp6gnuidq17sjpgdz5857rw97u3hjoddgfwx8yn7imgrxavt3p1epbmx2r3ciuvimdj54iw0ok5rgtuqtw0r2h1yzngx1n1pnzwtxbm6qbnp48620z36s391eblgfgopmf2vbu8tuwxvzqncdjfy55dclmglpt9tpf4l48fqmb49vgetkucaynq3ogdd9s4qpnplrec8drvoumz6dyixg1n3umkvjkvg41s7g390c2kvtx1r861a2dadq3gxhthf98pl03atezvjufy4xt70depvqnce231995rolszvbgb75l8hlv3fzj9rzw7j6m1qganx8kt0xia014su7w7p7h8f9n8ewkjkxtorxkipobmyjcyqrr0foxl2vlihffyoblisnzzyyyuebss51uvi6ajd1fmjasf0585i6cjw75ti7j51u4djn2bml3ybclu5ba54jmlim13280rxw4nfg6n6e6q4oso1rnv04vrmqhacqahd219r71nyfo9fgx7520popbxta6ih26c7opr38j1rt9adigfj9e72rwx7yfvb9i1363fu4c00bh24prqiigzhhhvs0ntnvg3i8jsub4oon01s8jtapseb1zza627f5adoa0hya7gglf42gew4qa6fzzv1vloucx3h4xj0bwmvmjnnngaepo0naz7uybgxkngxgf5tmn99fjw39xutxh21i0tv56pjd03r31a8lcg8casl2q6iv2mckhytn1vfcsf67zgr0ehtl90kd31hnm8aboc3kyeirpodi3cfe0vjc34xiqn8hdpg1w8ed693hxo4k8mzcoqbdo1oesg5w7lkttdnyaf4o7jj2ah3v0gbqywn993xu690uz4lbkxm56imhoigy44xvfo84n6q70mou1savdyvqh4bukbzrbxl3hp0r86ytpvj8peuteafwv2wt2jqqqkczxqibq5hqa93eszq0ni3m242p58h7juaotqqvkwnfiyo96wr380kpvorcp80givacyetj0tfhmkjlipwqicjp54etrxomnvwyp3nn53d38eadyhgnkaplt185ohlt4c899ohma3nkf7z02qhhkzgdxat9wyhy6u4mp3erahh8gb2w7ow4qhfvn20tvsva1wmbksw7nlxwlhb79oqeg5k2sa6vohl3yeb2zfpt7h7awjxamdfzzk4r4d0ztq8qiu4q9707jxyzg2o8itcrflgr1ltienxprvzmx4x18t8sobx707mizcumpxyvnagg8coti10krb1dshcu5t8het6b6w6s17i5404j1hj7j60vlqq3b1os7wwug5bnpxqqmwd9ibvkajt17w1ybovslg8we1med6mbbk3vs1x0ni5havmhfkarnylbyqldw937alld9vwcgpkqw4tg5zw3cbydu7qfd9m4a5qmpzoneejbr5mbfxj9rjy111qgo1g3qwpcrda84fjq76hnfk4014y8xmqk1wjzvfwvuf9m7b2fskyvak94gpm04v6v87ye53e0pl0t45wpo0dt6pcngd9tasckpyz5d32sqi1go',
                redirect: 'pdhxwt3xiyfn732hkq2n587ilst7r7okosq1dz7fooc9msrawkxj3mes09mp3j4sij6ypgzryc8jgygbgqm1a2oqgpli3t83013chsrjtinajllhj4nq5pbzg85nviqgxr0s7p7ur5cuwxiijnbm2v9m5daqu74nds2k8zjt6ns88x3iwoef7dbjy1qj6vsqoyt8mustyiu0z14kq0yv5j4z3t7rz8xc67jze23ryz2z4hgdy8ovtnaz9xcmkts1r4l2k4mzekye9rindk45hx5qm8w2xtrrhkyhzxd48i4yz549vv013nqnseqs2h82q7nglwvaanttcsteo89l6ox2yb9l484uoag7c8k15b6hr3dfe7midrmq9hdkqxclk7rqwkxxm5h27lrf3yq107ruc4xy1k665fshkvextyrf95ow02i43x9umqcmn579anczu168dhhymqb5ewdthewixr4xbkfu33st7dvm9pq9ioko2f4y6nri8orvhxof1nqa2rfx2oil5r34j02vrh1yf1iti1d7whef0ed7jmjkczv7xeprfogbx6vz2qd77fehk2xjce4vewe6yjdb9nc9utgtud29svawlhypkpza9csxaaty0lmfmkcr8ocz7n1pmlxrxt3asi24mtfgoq0qwhyzvq36ri29l3rv3r35cbhf2y9laeat9d7fq5trv02umzfsf58ut7iii9bw03jdie5j6kongb0pvkaoggrp2v1weayzdf5g9ii1eobaprskehj107wdja1l1wii9feop9o5jakuap9tekyo9rk51l6dkyajvlxwgr1dqud3s1otwlw71dpwbc5uzsuka93wev93r1htw2jh3wo6h0b8c8li6qqgff2lom7pdju5xkhtfg7m9xgk704pcpv37yikpfuffkxax9b5z56w70uo1otcss7hkttbf38tcjz20ijab67754rd1govq4b9xbqi133r8jkze5dq53u8709m5o2o6b5tgesdygtenjfrlyic302bkl8yxg7118q0zmm5t6ajgtf00a6lgxvfxswg0j7q8i1frgyqzm7bjcuioaq613yfsscm9pb1ktoyjon0bv6ejx6u5rdspu1xgvw9rg253dfderq1y274z3rea2cu035nt7qlvzrk8yxjct8zm9avtwrmh9r98y6mm8dgy9jmweytj5ntkt6oyo77yj8im0lx55wqxh2ou0upg1w27t67lyim9ee874d5tv3bpff6fjyhud5rwozktstwtse2gu3satde03tvz9fvpjp4dowgi5i2tsf29zhimrlhxmct963lvc54laa0gkd2dyl0uz804b6h2t87c7l1bkliwt7cjgkdcrxm80v6enpmbk4tvgq49zv8dk2uz76gpe5szzys05l38kjkki50ws2m6l2yrwzmgspt78bver6dpmns3fz4yvdkrga34w0odhnk93kkcp87mkb14wbhcw3y5icfaserrg699mfgomvhd1h5fmhn67f7um9atqwwl792wyo62u3c6977wa4zn4iits64iiscj1mn6yk96mti2419p2ix6jlr5lak3bx3nro6j6m98e4u5pwnkl4l4so5h9qk8olf9atbvl5hyy0yis4sjqx928tq5cesenhx0zmcxqk1w1dnrw9dwh8vwevg7c5bj2i1hjliwfihwnai3r4ocvoueaoaytw24x8mcyb2lmh5pel7n91kvgok99d87sdtlm1howu92zejf63vedlwxwaqd0mvtuzf9pjddr4zggw8yv3c1sl761un2vy3pzzyivsd36c40hj5ug0tn9zq5c3hgl4041mberyml6gv5as3h77n3ibf6nc4fc71ubjl79j4m802088hg25lbgm3p9mv0jj2hul4z7c3gvpew8p60bzh47syykjs4pqemn4kmamd5l73kpomzuek3pp9srvyhg8a79is8lia370zycygxzxhz1s7mtr4wb2sdaa3kv9x0x2ms3o4l7yb937jrcyunw42cee3oyrb',
                expiredAccessToken: 4082193437,
                expiredRefreshToken: 1432208495,
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
                        id: '906d954b-d102-4a4f-a095-69b76ad42241'
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
                        id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7b95f0d0-bffc-4ada-a59d-77afa8ba866d'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/bd87fc92-62b6-4a94-999c-ab7fa2979be8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/7b95f0d0-bffc-4ada-a59d-77afa8ba866d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7b95f0d0-bffc-4ada-a59d-77afa8ba866d'));
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
                
                id: '9a4e3eb6-1f20-4bec-8a4b-5add773001a6',
                grantType: 'PASSWORD',
                name: '8k0svsje93pnxryx5ahrx5r8is6zp93naq45a2kyoe2klwbdszbbzpwbct2t5zb7vvos6cqa6bfnga6h18dsibbte8jslsu21pdigtg0xa7sr14yw91fjyebv5wr384p0lf32f4c0zfhqmk9adnwpjaxswimrr5dp9yv0upikb60x6z2l04lqhn2t685c55upi7pcgu7zk9fsh0a8uwkoeusi16eta5nlj0jhd7p86q653hcdm8jy39hk128i53',
                secret: 'dtodzc4oknntbx6lsh620btn1mvft7cxu9faj87bweqd42pj8s0cbieid4jw2zfx0rgzccy8f5d63sn49hnbjkdc9v',
                authUrl: '5caet9dg8w67rkl8mzrzlp6bavl0r9e9wjc8bv1lg7krv4n8n78yy1lzywoh806gb1hkz96b0124tysgg4f3290blccg9knp4obdx88dcr2d6ocubpydwcyov6cnlysdn8gpbkskj0j04jq3je52ag76mdhsl0370dthr20unrnnn8q2z27dwopo1w09akuza9b2utxcxe5uihzt0hvgk9nptkpt51f4s2hz60pomji0fcj1zyswwweamdauz9969q3prh29v31uhn6g4ua57fp7gruzgvxbjn2zbntdgy7rcxgu0z7fam8npyy0weg0hb03s8litb69qmaec4orrbltbhjsufcort0kdtigj5h8gbniprg1o00kxakkc9a6t4tov3n7eh18j67ahbv1y8jcxq2pca3bk0stey0ohkhnpxlomuureboczdpqcqq4p84wk3u0mlh5v1zplhhaho2rujpw1dckpxy9zw8chfup1ff1tyso7ayhdvkc2o7tf2co5hpneqt89bhesyi3nt3niqt3d9mb6ox2c8yi83na2ftifl56wfawi54zor00ldwso35qw24mkkhn9am7dwdxion0kurugzimrsdmvpbxkju69rkubsejfhxob0gltouobj2bafeuin6jjz27f7u1g62ibtjazf1v0h98d9y6hwtlr5jj93vnq6843zhuvl8286k4aomvf37kerjca5x7mm081f0h9kf0cltgvvo7x5pi3qi3wg1u34olnhiv90vq92va8qhkkw09pkepzf0kn0sems5972py9pj9cjm76mp1ydon17tjwuix6c7chzvr5bb0vyilik6wn2zvt43nct7s4fuac6qzkyk79abd6sjxp0ieu64043o4j3tdv8lxoujwdisxona1qlvcrlx4ndzadoigr37wc0jslw5zvktse93ykij9phg951hajpuaf9uh1z4qiiyihcee8jwrmwkir9mc0021sj7ab7t84q9l7kgqbggj1r9sm0w4prxir6fqpswm9cy3zya5cb34np81dp6gw7d32n32oxyjnoygi7zf6307szl4jwbfpfyqek1mdgy90yg5ehur2o6b6c01yom13v8yk9b9f1i73ib7rjss3xc0i2crklx8rg3kq1n7fqxfxybs8859nq9fensjoce0dmmiq9kq0tmyuwcldsz222vah8xej39xlhw8qptlg2k33qik2miecha991564w94mf8oapxi49eduuksrkqo6w2l6syxaco9nsux97qa0er23hzgs8pqwquzz6dz9s8qz7r0k2ckqg29sgilubu1let887e5ert4bosxyen7c8h6wl7ebpu0c0clujpr7ll171l4r6kqkxbxnxlx0mkfk16nx8na81ztopui57r7bmos24dvmkox5r77wo8ns1463f41uho3pi2eu4o084zzralrqbfz5kh5oetz51cj9wbx32v9xk5cggc8q9u9svrs22nbjh8kbt0vke7glk66sf0lgy9auxytd9na1jp0xjnc2j3yo5q3ccs89xrpamsrh44xohjx6vt9nfbzmkornxrhwzdp2t5tc31evm63jb634ssgg65kgetpocxr4u3loasd2bu9mdvi0nx9xeh6n6lfo0gg6qnsyn5e5f9phbkzxifk8r97nlodsbvoizwwepme83jpuci38ixhjwjh61l8f280333ofgtr22l7pelf24uump6zhs5ymhkd9f435nwysxac4vlk84sngzrw7pmd0ht9i8icasqnx838wzkcuejpethi3zsf0im5udpnxi16055dwshsikjh392dowo366p6mp1tcmcu13e9opeg3u0d22z4luqik24jbelnk6jlad97hk4rk747a7fzq0dvjlf7mxe0velysji2u1w6960mw4v9y9suoa1216lh5z8p9n6goeuw3ee01c4w36zw9cjemgi6f7vh85ulsiy4ez9dvhiwd4ve8i2i2dn503lc0a8r9dfhmwn4jjr4bykvou3jqzr4',
                redirect: 'fa0zq2j504mx21sdxfp1yfuewdagjjsws304rdvorlau6lh3uyex3lzitaxepsoakgdze833q0linhdscktqs2y8yimfam8ar11cy5lgjqf77p0a1oku96t99gpuitj89lkpr3cb1hld95kflkgoah4eqvv50c5weuj9qh3q2gts4epfphiqtdkwu1fdkbj3ixfa6arvwvhnklyyc6z517wos0jlkh34c975voveud0bt9es4821gx51odana8aispwal75pkk6r0lkvdj3wpxfmhkzt574bv32f77kttlluibauxyv0g8ivq27k8f7qciiopemukvbd8j2h5spdbjtyz6ncgkfz4o7pp0zhymhu4unx2tt3ulppnnpswmn18jy47eh2yy1gcrsypx6x7c10uz2qlw8fzcpptqkrnl0f2yqg9nyqqvwz1j0ty8y924xcl4x01y1aa8t3vjlpd06i42kdvrhcpp0qpx5vhflvtow6njjns38qyy6lwelh6crrq1vlqwiyo43zl6sp2kfzcxqa13kg0rmqivp20ukb7v72ctpoih2vziwakzqisxsbkw4f29s4yy2n93axdb5shcyr3aq6k9c28gbhh77d8sqhj55jdtktnpg4lxr2rkbchn8kp14u4n03ybxal3tlhz6qnnt7qj1adljqs6osfr348le41yrc9atu0slm1iapbthf3ohe6ar64cmgiubcjacogqxrrls9jiwwgemeab6m274btp6n2axtr1oxpohtk4hti1t4ckf8fn8f0u5jnvwnjvk3htiwcyfc9i4582m26fhi4730orhjfhz7vokcfbbtgu6y8mvdzx6j9uveg4f9rcgmkp2euodseagoarill00fr0w16co268yy36tskqverqkf449nid7ussizkaugovkcdejue5cu6qobo8cy09jfawvq6howjggacip2vtet0br5dbnndw0tbut5mjq7uo7j0qzz8se1wk91kwzcew5j1mda8fvr3h9buzswgfi2afbb38qagjp23v8la84yf6q5y9aql4uzuxcx7ey878b093ogj2lhvv9xez4xv0t74iq9bvlp7axpp05lggazbh0ynl4befxqpz508imcz90xcxjj3cl2gtfrw5t7mnaqkg74rovza6wxwn7lf7w792t75eqe5xsyb9wo64i9oeu5uafic0euo16fbsifetk10l7mnyt7m720rgfsrpifcnsfn9m9wxfxu1kzksqmvhwte0f23l7xfhonqi1gk1v1fi5r8julmsokbgytue46hjnhpmskaowilfgdl7dqhqtst0fgh32htejujmhgy4oydz0wut21ac6v09pyx6xmmcfbfqdj0mnm8n3vr2977m0oqbbwqljucxrro6ehpm8ss6yg7d0s7l29j08qgstz3vwlwmx4duzd6o5r6n82p0rlgay74jjiuws6vnvsg0ax05feefvjljrib5qkfa3wyeit6igix0kwisr0ilnx6rfs7n8ub4tbbddecrn52kfe0bl6c8njp7eap8e6wx79pict7mvi5i73beinwbrc9ojlql36ak35zcwkzub48hl2i6cn2j6t5vcw6k3fqe3wphi97uiksucuq3deag9kaarxrnkwf5vpixd9no018h4isoxsl6qfdn2ywptey4c7zertr7kau9ak36o7nmvm8x0p421t1uw1isoqkklatdtysnmc01q396pjnf7d9r8j6pea8zh8idaxzs541tfg8uaif1y40mzyrtwb9ah7etjeo4pii1ibxxvzy2ubqzee4h285u84jjwsqxudv9jgv39stpzfepzi5a3tmd2y95p9afhy0frgk15bq6uscj9b75g0ig655fkc0ylzreftd4ju460r76q24wqu6a3farzj8n8wsc135x84qgjxcr5jgc76b537k8tqq8i6rq3epq9pewdscbdcm0l09o6icspdx3gozqtwwr7akkywn1gbx3tx10ukxz1i01g2w5xs8ugbavotdehszl0j',
                expiredAccessToken: 4519859807,
                expiredRefreshToken: 4417351222,
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
                
                id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                grantType: 'AUTHORIZATION_CODE',
                name: 'glkslzyyrgelediaf6kjhnf894dkn1s4rfadhuvt7ne1vdf7o9bac50m153hvaf5pvv65bvj5ycv12jlls16mpmokqzcv6w5wlnqnds6hfekjrjbcp0pzuo9pfevooaka9t59aq8giksv0olhzy80j6tw4yusnk2antyws781vyaje8sau3xu6ywzyom7eb45aqw3ho8hzoli9j1godebxe0u6e1qpap1qs7w91zho4w68ae2ij8bm0nk41jtkk',
                secret: 'uidrvnestl15fxw3g417glbqi8e34aej9hjy5fagpae75i348ehpgv989hlsnz981ys5u39veges7wwjikc1ayskl6',
                authUrl: 'ji4jtkbrjqd6zb12uimacdyx0hk428hb1w6wfqzhpzue69ffmay3s7rf81frfucsa3rlk0averj3pw8koedvbpmaxwzd8vutxxdsjzsi64etu5cikfqxrxah2gnogn0ww959xm6zg780rx5lny7bzdgclize93zjsqik3r6vydym9cyrc8kl2osstfpoja3r3i41g9xm5lp0ctjejmbogza08ol9gyj2ezdvtdmj60dp5xa0au3rjuyo1y1inke2mkl0egcwb1ev28gnyn64vrvicjoaa8pnus5utk7ljimiunnwmwybztoxjjg326kr54cbcxwncxxbg2kygy5vwg3a07ju6fdp5o74wjqgo8tj5o71lao58jac9p0kezfoz79afjnpzuz33jkl432gwc17rjjhnyu8l8usitfp8si1bd122fr2oz4i4niomq2061kus4e44kbwfrpv4ni9e9cezhs9pcij529g5z9w03q2c5jmtcpawsa3rj6sx8ddbrf8jvi1yceqricmfnbnudefgz8r4gag8c48bs58l5q0x8d6f2vc2fy84p1h3q3zem82ygq58986tjj75yz6twttvjb0z2rutf3x20dd2z3w8yh43mrnj2i8norihzk70uuwa5izc23cizeb3egursy3x76t768rtxbemryrdafnckwl3vrg89t0k3bez9cf2f3gceqm58r0jfjipw2ycnnh5szn6f1oybl773kuoe8cp8zoyti9jw9e21mzrrv4vp4kzstqfchwljoius9yspzq3tpf8tnofqbh7uthh8mzkgae948t9sjxiwj48w18z8t4mv1h8vlnyg2x6vsdj2vlerlpx0zna3zhhr570rnzxlupfw7u5pfol0kg5tjgpkocd5pus562l0tvhchgl5u3k57x5jh3y3lebjwrw27qe5tf7t0b9r7hbfnfouumcc8p6lsvqvu08s5422yj3j9vuqxsahvsy32rozo8cxmlryklr7x0kl0m132iuzsyazw8gtdhjtcuvfov8y7gykhr0h0aijdxehwitpkxlbuobke577svkj7hdby6q662sjmnk876tobqf8wtic4kkprdn6s57gco9ar0ppr3t6b3758a9ag7zprvu5yo4qedz56zfxht05u8onv92hd0qwktdcdlv3bchh44g1284r747p577hrkddb4l68rxlklhc0pozv4l3f5uzmbo9rzjv5jdoc0f98xt2ci84l5tqumlfh82oqjq5s38080h1wzkn4cmzqlhw3klen2xmam0sm662dopxb4uwl30k5m7j0krji6za0n8e1amhc89yoi8pu2smmri0khlj6o0jp3qw7i94dswe1mu763f2qhgrx5h2nypwsf2m2geximakfnvjh9f2zq8w4yp36gazfvqfwhcg0o76l28j94a0qbj5hs9mqds9kj8lsjrnt6z2bpglkapddg3wh4y19atk0uqhbmjkrt1c5buftfafdkbu5oqewnhwt8p7a0u9js90r654876tclqxa96erqq7iklmmyo688sa70gzf9dygwzzoik1f9rc3sarief0g7hnzaqjwlez5vaed04tex73uy08x7wkl2k2msgfn427dvwm1sok9g6alvhu9zwlwxollxdk2pmuas1ok18q90y2wglxrw651vapp5ys6n1wpwan9ydasyp88ly2iekl37jqre55y8tzzriaeexjuuqc5g2qlxdd4rjtug4yw945pe3basz8icofvapkwkf6jlhovmywbzr3e1fi10kwlmqixfrg20fiipuwhibz7w1h8a3b71dysyfqvoyu9pmuuzr7741bfi7p3y5k07etiavwe10i9v9wm8b68shnhjyjjjdtu1tdn0jphdt4eztj990pezdzjz9mo4ls8zqm6cx6ytsg2b3vov7g6xgyptt7yui44qvu3nzx3qixg93tlokp6iq9bbmj08a89ziapn7vxfzq986wb3w742qzv02ygluppu2bix74c2i5c9dl5w13lm',
                redirect: 'i2nsnytq3iaysakw7syhn12ikrgnpdixyqq7vmgdrnmd6mip4g4pyo919umtcds29qk1ofnjj7tokn8at1de1tmymrcukjjzjmpyp7c9xtr3v1dk94ckphwp6vzjs0tid2ib3uajv8vvnwwm4eycnl7a4hpa13dfr228xwxf4nsoadzwzbda1ffcdvdg9o2in19q15bvbndcgiyd59nimk5hi82kviz3g8k76cld3nzj1p2at694hzu0m0h222pd3bbzk40th7okla0g0hdxfu8ist1jfb23zppx2ih1f1zgausjnfffd9s5q4zuogs46d1fbv4dqtu8nrnqv75rt1lazik2p2sdhvj9sgz2zljg7y2vkoyokkvfbzqmui3kp7crgcwdsmpcg9bewnc03auqh6qn8x0ba8vt7sudvu0kt23m4v2rwkqlpy8sba1iu29e5us0fcsuhfgg2wg1sj3dkgfj9bpu73uwdy39hgz7jk42bfco9wvcasjjmxxgybyvwr1czyzp4340zgc7zftcj0axcvmo2oil1r5zbvw6m3daeptq1dpvv2us5s6q8vxypjxafi1uwvu6pkomprre1snt7feusis55bfy7sg0gl67b5bqeqwamsgn679yrezvpwkumq2m1gd8pooqp2aex4dxb38jicpgr4jops30i2k30zksfcqdhiy9j3ut8ye5maqsrcvfetn3zf8a8hggmwumbb24bfh1zm619q73d005p55zj22rk7jzg6g5ar2vwcnpfacl747c4mtltcx64ljfnrz373giesuf09auo2qy1ua4wnkll0iv55o99qiam5uli5wx4ly6r87tgk2lh3sfmw3a1vip2qibt9k36ykfy0176bajyx6w5o64nvfl9z7tvu6zv5f5wi7sxcrus4usdrxlnnpe472z2lurhq4m3hy9ulyfpr3ljg1ir4tcj5zl3fkt3nej34nb8nuuyeweluls1ansjd1uy1lwqo7p45w4b3ke7e0zfar2d2cra4s9un6s2ih4z7ka6y0eyhqkegfvdp9yrl2aqk1usg7ycxtex52fph2gtww110jiwav1xqun59a7eb2knlnkc94xl5kxt9nsuutjpgr0kdh4edv1jc2bvqhkbd56na3w1p7o32fnm7is97isbhzdiz7tfrd1ah47pa7s1pzoi0gks93ah6nzpd1el2t5bd47kpq7bc444vy8ki66bsi1le9tlcrtcv8071m1r0d6xygs8grpqfpwgg96utj1uvgs25jqwdtle78oq55z7l19j4uqj1skbn4wdrqmmsaii3tei09z4c1jecuckyc4o7wzxu4bpq53fzqwinr18sa2hilnqrvtjkajbxwia0k1flnffnyo5ggss27621v2nqqrix9npq5co8e8tejfsjvjusqwbzf0qufd246hukyndd0tlyw2raok6snjyw34o2u7ncs4snrbg3q1b4kcnojsdmdlg7k9gannx49z7uzwnht0hnb2oekanl83qid7h4kt2a52o2d3jcw78ppdr1ouaw12810b0cmmbnro5a9h27hei0444kwloz0jdzm0e0biwinijoj2k7dl14oc3uk7atzp52ehu417l4bxxkmld0eph4vn0wuqr0puhty2zile289e4df0j94sc3vkmrqluzbm8hiyxnafkee2bspcmcm161ivsrk503aa40go1bj9w5o80f56kh7xywsox14uddyjg3fig2k7g5amv9vb8m79h7xbpuu4vpg1au6b42k2th5umvaukzj6irak6dy2cxw7bl1b32qiegohgg9v31roybqm8tnzbt1opsq7pc8pb55934zjap8809orncr8iusrl1n43ly2l515iek61dgol0btleyyrwsv98v81h39nzpdzkv5rsyjvna3kxhz4q93pr1lgrhgy42dykj7wc3242vjbih5y8h9mapiqneonz9zttevitenlv9dng60u1ovu20b53ipv46npm46zhostt1t6xv1mkq4rx87',
                expiredAccessToken: 2542901173,
                expiredRefreshToken: 7574340370,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7b95f0d0-bffc-4ada-a59d-77afa8ba866d'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/3892f0bf-48e0-43f6-bc6d-2b809113757e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/7b95f0d0-bffc-4ada-a59d-77afa8ba866d')
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
                        id: 'f1879f37-3f05-4055-bb47-8a1d1fad576c',
                        grantType: 'PASSWORD',
                        name: 'pgbnw597brew1yp7erysxa3v96z04r0kr7s91sau5odjdyd84qu08kugykfbbwrcwqbjz2nzw8cbl9ptl2hxww2kgf46t79epl5spbowkdojvg4byahmuxcb0qw8sex2w5v1x8yr4sudquigebhy1xa6uc93jnvghxqc4mkk9q3q052fsrjhl0a2qatnx8sneg5ah34gmtk3jzjeis8n4i4ahc8ufa800wz1wl44zn8rqx4kjff2aebe2zmljba',
                        secret: '3xrwii37nbuye7c0gvdp0x4plu830xvw1k190mrai5oldb615e99c55s486x2tjfn2ydamd29auwfe10xypsbrplhl',
                        authUrl: '2kvzy1dcdn7lnoyt5d0uxgwe4cf4ng2fgpyz40pvi2977nc2n444476w5dwd6jk3szoap3hk32huo6qns8wlalcjttpvbachojvi2r5e03b7q21wjqw45d7uy9jk8h9z8dea8uagcty3g2fkauu79yidekmwq1bah66qsorlsbgbeannisvg6y1r6kd2hvjmioja6eboipii9nv4yevmpsfj74loaao1mnqbwv03250w3cfmr616tt0zj58njpjtqp54e69rzzkmgcffv5jyy4nk2khj6nk6cjo67gwi5bhw6drmnn8zlgiz69wubagx327uzemawt3ku4ssib14z5qrt8pumxvaieny2xhlq1a2zm6tl3ep6ns78npu6y6vswp5no5qd71bttogdkteyu9e4jxgava8x1ajitdtdyv20mofb5gfn2bdtstmjnpcdi1mj3kyx2amb3y73hzjza5tjhyjgmi24ko9ndxmijlrjt8bqbpp4qeqb24li21sgjhsaifim33b5xqc749lhsvgfkbu9zvyam4f82y5a2xveizj3k1j9z2w5qzezb1v2js9gdkdhlatgxbne4jisu4rkpt97bffvqusvx0cmfwe0mm7kr679anu583tq1fmt5rr8rceg9q5briwnik55p4ag5fdyj88rdb79undqju1yjfenq7fc0xfhwm8ah47hg8gnxfj30rfwxl1yq1rrekwzezvw851ul23ezuaj270g8edozpccfv9j22yqpgnjqtm0wkbme2bdowqltsf2aj0wi3u9i1163rgg13pen74olguch9elmq95p20hllcx5sy6mrjoleffvjj92qy4bsj8d9a93wh1ly3w14hyo3mzlpp1jgii1npzlikedsqqkvq5i4q0hnnvqhnaawa4yrasp70ykt94uvm5eltow5pf2v3ryagm6lzl67plp9ngfbeumvslu0shfyycmhiat9ufs44xmo0rwftq9p903lzl5f8oy003almw4mvuin6lfhl5speci6rxx93hveek0rt0cwtymqedhvksa67xa74ym5nmzuu6gb5kevtuo3n8c4e3904t40y9clsbi0nef2ui157k8a79qbr7k3wpg961vq7kd5eufqxiv5wt0jlzah7oh82ls7numodqlf679ahkd5rznrokzf78oj96yrdtygxz8jf1asvfhnuc45f11l3zemm4x1vv8i4y3n4r40wu8rt0nql59ll4kceofga4t6d005j9mfsgskrrzdvmfrwz3niqfyqebugk0xffks49kz87lbdctyl4h3ethp0ijlhfchtw1m13kl6hal2vr3iq5m1s9zw3hx9sjz0avyb11b2kk35lvrsq0d0ub239k4a35v17eqiu0dqis78xx03tgo3votgkf6x3l856l1x7qzjcra9avhtci12uvbbhtccbwi2vy71tsorn76eexm4jwubqf7srvprmtx4atjhpxy1ko9r61rvf4vs1x5ualcyp11t0qqyghjgf0vymby5ycgxxjdgpwai70yg1kgjbgnobyv9zpx31qiwq7mgle0raiyum8y30re0tosf3eo75jnxxvhirkoxiiwffpmsmg5ksabccij7pzbj70avbnm9h84djabm1n3tpcqicvrkauuq1prajz0tc2f5s5qq8x35pbzucz0vnybgnkslumyt40ow885w2kfox86vy6189ge6ivkz46g9003ivggorteoccbgtt3vyu767jiopnl5evkvdj9sdozl4pryrghr9t7im2bzom4sqoj7mx1d4hc3tz0a4qcw7pic01qeg2ec7hf3dd9las1xlllllpexc3mmmnich6piegkgyzu74g6ldp8phidxqhxhwf1z7x0t11wn0gs56v5gyfbw8do38agawmftx3ibvuhpd2ots8asjgpdr5rxn82wlraetc5f29yz92kenkaamhe619v0trscteiz6s8whkwu4axpjus4woapfef7b0br84rumu55qgyr9qfqjso8w0e3',
                        redirect: '3tflowajie4vld9o563c9j4xhplx6hisbgy3oardka5ebf9j18eqp8c2uq9wndx96t5r8v38lsmlsseayj1yxtcb1v2kllj83xkfpaqrszdu56xv3b958cwi7k39akl5gh478f6b49gtgfbbbxmd19xq7qvaxpzl1x4kr48zss23hw5eu2medpkh8t34lt5wh9bjrcvp8bnd7hbal8eruf4vt4gr1hr8ohobhu5jhvnoifyoz7ikbnb781rpc0f0ez37tkgvrnqa41meybkn3ijxes1p7crasi1rieotl9srxwtbyha1rv0f1q4i0s2fd40v4ezhlxoyz3qbc4yhx9qbah5lzui6shlgxy3yijkcbwry187214zrsi5p6zqrwbhxxdwqvau8bw89rymqpzkpymz9wz3gh5xp8ncmgvo1qr39h7xmg4gbe8sk3ex1duehohglf4sjrv53oj2qct77lsr7wfj30icbm3n4fj8n1x069te6cxvfaoh04i2uytryhpfaeti20qvndh1cewc5mrym3e17o0hg8220an2usotr1avakynvh6c8o98g5wfgr2b24wbre4v63qb6gvt3x0xc1gf99lonbu9xk88kwoxl6ufogbgedlhh325m929qu1jxr3qgek5ldecx4pskcw94un4kxet4ih7a9ell16qa94olnxkxuqp4gj2bvcopmrbiib5dy3hxt59w9ny343qmt7wjx5z6r1s5dezqnhj4dn4fl9kpm0goryoom6ytya7am5zgwn31u6tihu89zngaj6n7f4vgeby4giizfyn24qnny4cy658f665j5c7uykgqfp2p89wth47wkim7vb9p63g6pqxmv9er6d9mtlqn3ytx1knfnj5xnrh9igauo7bh8p118zbvdo4qjpxie1l8nzgglevk81epqchyxi1srutv1m4hsxusi1zehvlebatpnijcjtpmpp7juga1bo4ii16wxu4w59zre5fogr1jo9sutg2lebc62z9221fycsasz6cisi0gl3wyy5rfjroxdyr9znsjgvhj7s9y0y6ci2ih3zr53ezglxc07ut90b1h3nay3lcx2zpgovb32bsj0c2t117kyn55n8d9lzqempuidl6rah315sla1wx1kvnzo3r1lruj5cz5fs5w2eswhnqmmjkuosq9o9rruye2iahgk0ax9jpeomxcfdqzlk6yxvmevx4x052n7jmh6arfsy7fas7sy5i9ljmdpo8uhnni375p30l31fseo57bq75255e7u4v1r3fgjgbucgfhk4pa2q46b5ybd01eru6sup536d26p2igk72ac1slqspo8sel93wmf8cmzmft6xq2kalxt7rm3afbxy5g3aj7u24gzitzo8c8posjak441lkidgnlwgzmyatuayuquxh3d25ufm9g76j1q6201368cxpfpjxowv4fsebicv7e1bs2tn7yat6ge6y370nl0751t6icucholf60gj1hu3s9a8nkffnojzfu663to4pr4bihppawa0k5bftualxsfzt1p5llhbllxtc7sm2bg8timlbmshldmd1979v6gcrtzyg02csbs82f4quu0cmxlanf0450im7moxqilf87n8w2e9gqn35pkou0t296q06feezsiyh6yupya15641qtztgwvv0gl2ztlwrseab8sfzgyam91zlfytm33wb2u9l5rjt23q1ric0617yc9hidmjcg070isdw5xr0af9eow36myqeyc3ht1sysl4nih65lasd38tkvo4rtkiyii5ued6ul12u5w5beyqn8pstxbhdx5g6f4pjpmva8q8ilejf1zmzx0ohjrnwi01wi2tzhss89gynifcj9wvyts7kz2k036eq4a98yq1ioihyqwoeqakymj46az8iie57sa42r35sfuqlip3ze74hmytikee53034xjsixtyt88hruon8amwo3yyofiv5ctkujb8uwny64z0za2y2x2hax40h2wdpsdry23hhlm9f63m5y',
                        expiredAccessToken: 4258881071,
                        expiredRefreshToken: 2153848040,
                        isActive: false,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', 'f1879f37-3f05-4055-bb47-8a1d1fad576c');
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
                            id: '4d9130d4-27d0-4c69-9f91-cb607b947c21'
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
                            id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('7b95f0d0-bffc-4ada-a59d-77afa8ba866d');
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
                    id: 'fef6997e-b117-4d28-a44b-9c568b9716a2'
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
                    id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('7b95f0d0-bffc-4ada-a59d-77afa8ba866d');
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
                        
                        id: 'ead8f6cd-9ed9-4a56-9038-b02eb95a87f5',
                        grantType: 'AUTHORIZATION_CODE',
                        name: 'otvyyfoa9j6t6qridfmcjvxps4cc7hdq27rbp4d67ro7zfe5l8k0v4hb597uyzb8f1qyqomofhdasztsj52sgke8o0pbzhzlnyntb4lcbce1gpwqij3wljije3os1rybx254mnmen0361wiynunlqvo8vt1nik19azd12uf08if9vpg0v8jhmp4p1pkh4osp78p9qq1e2tlfeyn2d4s4z5f4sjhszklox360nqoed36oajfmdhoz9trjhgb59mg',
                        secret: '9rjihprq7pmh4mruxnmjwdmwuvg5ptuq2c5a4bu1wttym0oydlzlfwn3d3m4q4g9z5frgljt2882i3q08iobgdvc30',
                        authUrl: 'ld775h3ylchsmr6yfao38pp8h4rulrvmbz87m06b640078gapnxiw356o52t3b7vut4ctdiqlta2kg754l9cm7jh2gfpts163o3d2s3ob3w5rd5kpyviwnsu00wf75hsjtwhxz4m8fb7ok5debe1wfjr35j897ayb3l5gcwp6huab915qikk11yyhe0s75tk377ukirv2elm6wdnk8oed3huj0bsd3kfdi4i1dfgx5orq9870vq9s70ydwwzk8wegwgsup981weh0qj676wkci8f8uipsts21gcdhiti8w9fr33egmgaurpete2108ksmxytjigasfaqourm4addsnhxh3km05bjfnji88vde45jnko9646q2n21g5zm4mf5z09rkion0mmkamam4f877ojougwvofipmuqpgyzjoye4cz09uto55be1j0qf07hcsoegrvqtmrgpcel00pnf53f05ise7r6qbtys3ygyhux2ian5nq84cjny9zjnt6bphob1z4vbmk9whsvgqdljiwoceuzgp3a07prtqqd7gpgsrsll7l86vpe5zcauphrf12nj2sg3d9izbqafszt8focuizipjytxbzlyqo43dse6pzdrku3x76zjt1szxjkdkxq4m6rsxujs9ey0lu5kmhwfq4xys91pfdkp40m8cbfgefgd6him28k8udgsw1qnhni1j47kov6tozewas5a0tb3q806v5v01t0h5dauoynyfj9sr45sn8c10gblqb65a3yy77fmnzc1h9pnyjtkq2yspsiq3ewu8omubgkq6o5bzc2ibjnhtpkgoakhdphfmtf163yp0spcitj1pzxdor0rl8rt1o1ln3ustowl502zdm09lcszg3xk29cmxahtp5c7r6u3sykd2ipizqshov7bgggcwnnonoy9qoe4b1dghahtzz8jehhdvyv4iqbc0czd4faw8hncyz4605vbq3xcjlqrkr1v80tlijdh6rotgkeaw7az7zfjfxi3t6x9gdsd03k768vypd0o66xh07qvnxeynwx2ftvbqtz9gkmk9cmshhiqun3duj6dee95e3wng8bvhi0xqonefxu47b57nl6r1hzomkq15cwndglzone4yz5sxicgmctcgeufa7z2v3p3hiei9khktmh367bapasdfvzb1jlkvv9dugfs1sfm83o1mhxq0060wog13udkvr4fa7ez24m14jotv5uzz9bc1o0c8xg1993v1f7shkgfr0obyemajp0hgypp7wsh34xf1ap8v30i3dp541k4e83md1ngikm6ss68guxy0ntbv6zsaskqzzp1vhzouhqqhmn8vaf9bn631jrd7c3e639zd0h00tyto8p2glkme1w03ppvti9h93qp3x9uc5l7n167yhggn0o9k2toavkat433aej6yll2kerj64g4o8z5fw7ayz7k3yt90aq5oazdvgzu7lb3vvdpansg9ts1vy8614thwg3w0r1byqrmra1uvl18pr7ajmhotlmgu8nsihvfoabjar2fe9b28ebcdeh63wss3moed1h2sg2suqpxslyunjxt8rtwjmny73tx8asx5g721w6m3xshqh5u7bjf9agbyfnt1vdxfx6chokfmmu6bgao5jsvv2w710sw9pp9t3ui67ona2csdl0rsbvdmpvad6o75pkd0fitef9pucepuhpxomlyimurqgntyiudljrwgy4xrxiami3gee9fb42c508y811wxx5crzmrdnbyiq2tl6pety76ky2bfl2z8xukb79mfh0222pnv4r0r4f3gcxktm9rna27x2hyyq7z2lp2w2tu2zvbo449guwdnbhhir5irrr1uh3qz8me71ex8nk47j1ntup1zn0horlu8u77d6qfkzwyz0jy9irzbgu8jb5hnm1262amiwulxo306crd3zwpf8isvm98mu7peb8u7y4o7rfjsrti7a6cdtk5pabhdm7u8t85idxo6qyxzxprfeo4c9cqhpmsc400rfj8adediy1q',
                        redirect: 'ikz2o68yv7fpbha2ttg2n8olptp4mqhtab52x082115m1rrq8gowumd49hbhs6weifibigsbqh6jgjc0peeo2ld9fln4synqw6nx9d2plf8z7usa4lsopoj44yw4mh63165bh6a2eci3s04r0ziwy7ctcbm010ax78v50pvfqrrqtq7fr8zweno9l64saofcg1zy34nkzv3tgoh117cau0xnwvi2xwo37a7kf5tr3hm1qjejhnm29xcbu40rmjthbiakqjgd9kvkcpiaq2mouq2w96x5k4nj9c9y359fugrs6jo1i4hv7xl1uol15eu12lbt5lw8qj18irw47pggvjd3uthl94bf7qdqbi3qo0b2h9vp7fqd5ifcm56asnk32jy6q1yx16iwnbpdeec62vrvgtxmiuolbrjxf0238kr4p8nchpcx9zx3qgbmqeqdx6wuy45qvc9z2qtmc2o8jvtmo1uovo90pk9c7oidssnsmcoq71w0v6nvvf9q58hu3z62shd61fs6bt8vt22dm4f0vjovp3vhjuugtgypek0u7ehahyccf24yqxmy9p7nnj6d7qjjjkfv0ccjyxerzcssssg3q05hfzyosptb332r5l4lrwflxu1zpiclhia6infoqr8lfsmsvvy86c69qy4bu5n2mt1in61z80pdns51ns5gxrih3vihuqfrnb7vbuszv1s63458k7gblq8tbuedsoi2ga4c97iqytfd1vrjp55dsiy1pxeka74u7v4yx4ucoftxqc4sdbpr3ovmpxzien7aqgbch13l74ksw5z6w1eu0vv585uan91c2m31mt0umsdzvrhnsyjajw77qvq5oqsaws1uso63b1hzs3tb4deuxtwbc83u8yp8d8o2womzdhxi2tw3n8w2luthnl8e6xcveysuqti8prwtn4v76zfjydhxv7wok606f0rvwsk1d7at067myfr8vszmqsfr914wm8avm38xg47kb7uqc175ihp5txie1kfnw58myciffw0zaq6ls6ftwqyab3032ak0pcidurpmuoxdzkv892mwy2sa5k5qfy088grjxr66ro5w7t6xx7bkwgnj9it58drmbc0gi2yph6k09u5h0qetpeanwpd2jiyvdypz2blkb24xoe8bttlqcikawyjz6lv3tbj0u1c8tcwsm7a7a94uxctro34cg96rsmx18mez9n9f8x7c5kflxeclc1tboxh90o118j2n13kahb2j4q4yjpumf812hikw5w2e4sba4p0innu71xjypme6m8zbbb0xbmdzhequ09s7crub4wgv2w400sl1ycq5sn41lybvdc4iwd8ou6dlezit2b5o1m7oizmboznzzr5l2zseml9xyff9rt88cr1fdnmrt2b6o93yxxv0qivznn5ki8ng5t85k3xx0xm2q26tlw9ecq7whwcwl4mfra4j24imihw0n5toh1v3egd4kvk7zgtg76ehsyge6h7kaough6v6tezs2ci0gixb3qb8jknwf2c91kebpu6enz6xpxqwlpl7oq2zxuee94zucta19hwchmw3cwskybydj1o3solwsbaez45j8hhv01ie0fm9uvaf3yhkc53f1o91yhj3nqhcprf7sgdniylhbk5vj5cav6d35bgto850mjj576hcdij2c52i4nofahiw8g7qhzsi8td40ni4n72tnmtlmkhsxv2gg7zz5ck0wkbhh6lpm57ldo5aez2sarw0uuqf43wvi8aljf3ypgpgyoyhll6fqbfxnhprtpwd5pwbnafu6brx18ynawt4np34ajzbndd9k3v0nmntv07iz404rrdt8a2f12c9ef8twkdp9yi6xstg31hnnj3wpkwn2j1oi3rs0k10mb93dq7glxwclquymiuje94rm0e2svonvvgwevpdlsjx4cza1kj0d204vbld5ywl9g1itiafis0b5hrrrljqv6n5odzu3g37wr9y4ktbufg3nt7cz5zvbkwbiewdnbunprwdnikfmubl096k',
                        expiredAccessToken: 1497145445,
                        expiredRefreshToken: 7431761457,
                        isActive: false,
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
                        
                        id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'z7f8fjhwc7jivgiov4jbm2mf29pt4uldpdu9nqq24j68q7jjkeovgummzoaf6oxrucwlonh0p47pl84fwer6ima4tqbs9m5p5n31n5n0majej53c6pe3q5k1hw6mxtgycoh46ro5x3tplv4vu08w0rlbnrdkrvuva6mubyaz4sg4g508u7viflwyyw2t5v1vjwte8lzh59a3zmoahrt98upgiifi5dmftmme2od0k4kdg3tsvz66rnngesnph5f',
                        secret: 'cpj34gqp5mffzn3wg52xpkuembtqmxyhjrjtvzsrmg57cd3ilty02eutq6iji9sj5r958kjn4ygjhpz4ho5fn09z7j',
                        authUrl: 'zysxar09yvi9fzt9ca5u85nwv39plgv6ezmrvs92qss2xj94dro89iw9d3uapx8g9ydr7vlszq7538s5ug0q9pvahe44fpk3mnn6h5j6zux1uh1yyax1uo0f6gngc8b1cef6g8vcaqkx0ukraxqihk9ssedxrami780j0i6rhrxqvmbbepx6cf6dyoe7xvm0wpvz95k883njgis9yy7vhh6c4rbt45fryo58zu34s3smp7q4bnbwi2n7mc4c4nnvlpu1lzuu28bw83mfu25j4xmmy686n783j5cktbexcdgxpp2jql7gp7k2kwa8csts6scrnhvjuevyoah958ouf6xw5n3vqnt1q1rszsncjkem30xg4y63mqcotfte2nd7t2oo1nynn6kgy49zzqqemsxjipfx8d6tgi01bav2drci1eutc2u1ma0zzc0bwwijvmetizqy02w3rvkigsviu6aob19cjh7s739tvx8sg0y4chsxlftbtqcja5gsgx6nawm509aqu63yot9aya60yysno3vv85vyakzci5xth0vjuyq8y4br4syz5b0zewn3zjtck826m9cdrbohslnsp3ucb9xg5cztsfxwzb7kiegnvthq681m1mzt0sz0wyntsdihiktj2f54ir2njwddnt4psd38azyfzngpuvs85ntmjxtdm6osnf30v5t416fgmqkjpz1okdio56wy1umdnqa4qajxwd6k0qd8s7zln19pcmva93ys31azd643oi2rymaxih335d6lfl4d44aun8u31nc3ipxvz68mxg6pclf7fcxvuxtaq4x9w9s74ee4dx8vv4k7ysc9qvcw8jgiefdmp8h9nbn92iovslzqx2pd4mzul55i2wykzmmclppqodged7opvftkzzxihj2kli2gcmdlzn489obp45ibq6nkns95hkqh16xxokj2u54eygapqi7rc6fwz36t3idmz1dshhh87vccpv8afw4dbgvqrz3f0etvxzqity3w7isf8csl0g3jei0w7a00slk48isbmtc7cvpdl35t9ex1471w5fzi0tvw52qgpmhdqpcnfpswenvrl4p4zyvir58a87lxb5mlmecztf1sais10m4xllhhqj3ddapzzp5mze11vt77mk1ogzbd02ost8armgrj5wdn6zmd41cmeeikql5agv7pz7e7j12u57le8plltmv6js2tqivhat9x3hn5z2lhtb31xtye7yxvajg3se02te6pm5o4zfraroagbu76qfz5oebvc1tcrcdjb32pqfghzmotcovz2uld7kyrnw7b5unbtu13gy6zyxrwuouzh7lclq1aymh6jyii2qzoqvq5q0jbmr5cy4zz0tkoha0550vaelrycmyp30eiijwf3sq3ncb5faho0df1t52td28qtigqb9sxtkafli3w2nxdhw8ghsivfa6s8j0i2cp1073h6kd4drzvshn6xdxu4e2cny3insxafdcm6wst8g3bxokqfl0krkkspwfvhzzfpn8mgzicb6uz5z7o1ttlhaix6rrlqlvwq0wbxhnrkzqibdnj8nifevvjvjrxka9dr9bxgp7qgas5dzrnw9vvcteb0ia22ayvwsze9cngq5xhalls24v5ex8kv5hidsy8vyz016djjbelq0296wh38qqcaa7ymww9dpdbcljf7khi1eoy1r7hwp72h1f8xbo7izze5tjh4bth2afmqm2aupvc1aldep6twcawumlsu0q3fqkewtla9979slnklwt933vyzi8qtxy2wejjx7hwycr7vqs1r0blnu3lycznavtzhsqjh0xjsuju6oewvcndpd8nyka4e0glpgmyhu4c06habg5d6atsnjzs7cmva1jgg9lp7p2fk827rmcd85akvzbxh6l1jqtkb547iuzgxbdh5pta1gc4q44gem0clsc77h1cmb4w12884bhpr6pk3qild9fndgeuc3s6jz5mtuked0tg2ioie5ywm0tnt9tqjnvlcr107rvm4uf65d17',
                        redirect: 'pitjbl0vantguz6ycz7rr0kr8v4tjcdklyabhkko682all90zd31bqwd0uneqpva68x8fb4dhmwtsxaqp71ox6d0mutnrf3g5lheqa59cd8v4l84r0hjdiutaeh2eumsbekoyx1tfmuqy2kbjduej15wvjansl8oudh1zj24n5fxrhyhlwtffcfmu6zu7w4lc7di7l3wsh743wxtfvtz47osg7oqksszwyhxhnxr4ntwcx4rnh8xrgvr2f6zpbkvrshpq0koc4t9ptd093skmeigg92l1h72flju7jv81hbui05jtd2ogtzpvoiimw51pkclp7zexltomreiniiadv5qmcengub21x7k8xe7y9s9ep2tovulmbpyrmxn5xwb0goqw1ybfy3khbbqthrw2mqfdoc2izr262u0mkdg5txwq5n3t68s7ij71i0sl71dvwjmw2vdjtxhwizxv4opxfz9yrpi06m0xldngjc8ctw53zxf2jnnykf4oos6ub9r81bkchkha3ws7lnn1hkax24himwjdiwtdplle90gvvm903b4pstikxzp6ub8adkm0hd6dj1buypgcd8qyhqoevm6v3qv9dhndz3p82kviung8shtijff74lib11osxe8jcjaxfsvyo3dtit07qvu8ez0c3y06ox1uqbzks9jrvmsmgjo9fzjehc0etp7h0wrlkkr2ukyhwbxnxrkqc749f8ema2ck2psi9pujvn6rx1esn3cv1efajo3ckq18nafxeo7qlc9o3qenm2bt0rws201zf86oewxd9dp0qkzhhpgw38en67r7s5y8a9yvcbkudyxfp55w1smt0fr2gukj2y6jcal5ghk08b82j82h8tkhjdda0pqo6c7462divqh8tmfqyu5mvoz7lr6277wokxoqc3p6qz020gte4ymccl1v7l58b8vhj1p0r227znjhinh30rbllhah20p1hy8tz953akdbogv1mz9wn42cgk4v3xcobbppcwioyldro0paysop34b8mtibboiuoikehc6hc3kpqtr9hn4sn9pqr7kt8kwq9mevexzoehr5jxc3fe7autpf51qfcebj53inri9121pypgav99l3pvsqzexbn3w9yhk8jrqzspjix1z3afkxjlfncyhi9d82mlco1zg5t8jx6on56gehif2h26bsxv94cva8izhz3g5ptu22hxadzmrnje5vaatp6vrr7uzx7khluccj8aplmhuxuq5yw29zhq3flovczvuwz9ui7e48aa5sxa38nx317q69ly85z9dlomntpc410u3zm7j5cv9gah62bh35kbuq86u2us9e9lpycu5swdk5jkmww7tdm9xot02awt8cfcgl2mafhbewvxdwsdl722zlmo4yjrarxk6gwib7qxiin12te4mbviqpzhy4ucp4295mjpxdrkg8tv75h36lks11d44upykeior73ihm2nzys60aj09x6s9c7q1pf78jiscemi5kodmy94whg1pni3958958jrlj91nlxtkqcyr7tidzerjtdbcjaxe7ejly4nmo63slkhbor9y0rtf81uwpau1qw32m0jwcwqespf5squkpzpegfx9t7i73nwwzt607yx06fgmc8klzd8u08m1768g22cr2k5myew5s9t55dvz4tfk5al2mnjml0nz4utioh6uu0nxwufpflwthowgvt5dhrm0aujj8u2wgo522u9gklmky8er2tol6vbhq26osf9rrql1urdea6umsbuzm7vovi1x7jotcov9tom9a72pes56n1m2yp83wjcr0w9nduxx7ucyoesibgilzogir7maetj8ni3hcr0jybod2uydlrewa4fwsck11uglummgriw0pinx7d90yh8n10zwy2krkk1bjo6i3sc3tt7r95smk54o83k6i3omfzqzs5g7kbfmal4jdreq1wlb20erk8ntvbgg35xeddpzw4xy8naaepwuiykud5zpf1pinqty40wa32ef2lfjk63vlk4pwpw6',
                        expiredAccessToken: 8024473547,
                        expiredRefreshToken: 3304619012,
                        isActive: true,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('7b95f0d0-bffc-4ada-a59d-77afa8ba866d');
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
                    id: '8a264b36-25fb-4b31-913a-466948cdefda'
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
                    id: '7b95f0d0-bffc-4ada-a59d-77afa8ba866d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('7b95f0d0-bffc-4ada-a59d-77afa8ba866d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});