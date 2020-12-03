import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IPartnerRepository } from '@hades/origen/partner/domain/partner.repository';
import { MockPartnerRepository } from '@hades/origen/partner/infrastructure/mock/mock-partner.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OrigenModule } from './../../../src/apps/origen/origen.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('partner', () =>
{
    let app: INestApplication;
    let repository: MockPartnerRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OrigenModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IPartnerRepository)
            .useClass(MockPartnerRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockPartnerRepository>module.get<IPartnerRepository>(IPartnerRepository);

        await app.init();
    });

    test(`/REST:POST origen/partner - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'vrw5lzxoivg57g9gail93qzi6pzh9odxham9pcpeuij169zyekv53tp236k9htvb9fun9js3oua4yz79ojzewlyqd08ir5xsq3iwh1st77fan30epntjdxcuskc53tbkpy81i60hr0puzuywd19ji17xk3rutc51hrdst46ygcmw9ojw59hwmhbbl5jz0b2fycpzoypo783u2fu00r2b274x3i8g6rce34a7h31xa36zkc5l3tsgnj1hufcwmww',
                socialNetworks: { "foo" : "bar" },
                description: 'Quo ea aut aut cupiditate eaque. Et rerum vero et non voluptas. Fugiat alias fugit voluptas ad sed tempore.',
                excerpt: 'Eaque est ullam fuga corrupti autem. Voluptatem soluta sapiente velit. Dolores ut adipisci omnis sed. Et blanditiis et molestiae. Suscipit aut molestias qui iusto nesciunt molestiae optio. Nostrum facilis incidunt totam fugit dolor.',
                email: 'e9vnudmn02gcema43crf2lvrxlkhh5g8gn5oiguqq5jhumxdrrlnkkzaio4ttffbrstpya5wh926zom0bl5w6l5d2kzcfm6jyq09dztj0ch2mxsmp9sbldhx',
                phone: '7k3skpo0tdkulomum0zcpp47sjttinoeex8sc7v64elrqmr3443qb1afmslv4k4kuia7ukaz6ff4avkyh16ogiur08v6bwpm931qeys5q9l8uncunamm4rxj',
                fax: 'g34uowc1wrn6wc71lcqnwq2t6c0vqfhwbyil1ssqxqb79yciynfdugefqlhfklm1y8jlhcdrcbgsh7rkyj32f80caxn2k9cbzagxaeq8nmy5auj1oyv8d6rb',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: 'cn3rsq88j0',
                locality: 'wvqygn3mk0msioz3lh25461eiszte1dhe13nk3tzshxl55xmrs3xjdskcwafj582x22e6uksbce9kj7m0rx5pm7jipzm95a6zh2xp5xfnrcuups4j3nhstzuz25lm',
                address: 's4ubhdwrbf7pvd0td2r6hrxrm098bf5udzyaxlezlot72qzlomcixlmusqa6gkoac75050hzw7vmtgdc7shaithzw9us0wzp4mt7y1e8tvx551jbw0s2ddererg3f9myrqncmg8xad64gwpo6q9qkgujmwlle10slvw2qgromquqev0nbrh39aqa4a787b7ebpzrkka6n1mam1r2wm7i8jmbq3ssp3i3rh3ps05nexy062r7ymptqdta4w5gyy9',
                latitude: 22.09,
                longitude: 936.21,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerId must be defined, can not be null');
            });
    });

    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                
                name: 'puizzo118slvrk648u58zkyl8c0m998lpl98o5x9gtp3xn3ft108cy2xsfds2sbqt1p3qcyjxrx77oa4pkz7drv7495sgbgn64340wofjth9x2nrg65397ok5caq00ocyn26c6i6cqcofsaundugnv95yj4c9f5xk2kjpc31xcx095ojrcsdso2ro1kf3jd8o0zfhzk0sh585lukkqltnsa8a1umwgnlspsnu8w7e9olttqjtv152w0vft3m88t',
                socialNetworks: { "foo" : "bar" },
                description: 'Minus repudiandae quam. Et ipsa saepe nostrum ad molestias occaecati totam quibusdam aspernatur. Aut exercitationem autem dicta.',
                excerpt: 'Rerum molestiae nostrum nulla enim maiores explicabo iusto. Saepe labore id quo nemo. Optio necessitatibus enim velit rerum ut eos. Dolorum eos ut sint consequatur nulla.',
                email: 'xd6gxbrkhbcei65i2juuz9jg6t2izlisbc9vlasjf5nyw82v3nws0i7cvbsmu8ru6hfd7ofjag0ds908rzslidy30a5gadjd41n538pfzhu1da17dw2jqu2v',
                phone: 'hn27715qxfsynghxw0tmed7qden7fgwkddvufhczofutw0ubongvmvdv1s6bt988xezfqmgva4g9tqg0odtue67mowne2qn723tngakem793k75zm8tehl9m',
                fax: 'hbj7j0qvlldjxc3fcu6kwlp02aairg29cje0zvkzjxykbmno95a8fzrytw9269upuphdf8hsk9ipub1zao2dp61ffsgh57j7jszmjyuovoxw9v6eaamw59y2',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: 'rdh85zi6qc',
                locality: 'l48o64en4dcb127ce9g2zxt0i1mqalbduh9gwer0pph6ma4lcnnvaavv41pm094f5it0sf0c1ff1bhfgiw4kikgqxev9pcrvqbumg7npc4xcm6t5udtpbatnprr3a',
                address: 'c20ridr00to00uz510j9i19oeantrjon369944gcd589ld9zp78mag4xceird6wic71klgvw7onypydzusy69l3mfbyc0fjmf22boy9hewi3pkvzyekt1dg99pqpn97p72jdwu6456kz1g4bf9akr8z5lz08ds4lcb4q2t18nhrdw0ofsx9af4b6yknu6sws97ac5htl2pyhllu6o9tezvtd8xvk1j7jux1alxhj8u3s875zhmlm0itds62o8e3',
                latitude: 16.00,
                longitude: 315.30,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: null,
                socialNetworks: { "foo" : "bar" },
                description: 'Saepe quod est et minus similique. Dolorem ipsam ipsa et. Pariatur nam nobis praesentium tempora aspernatur consequatur quibusdam.',
                excerpt: 'Necessitatibus autem architecto ad qui earum nihil qui voluptas nihil. Minus et recusandae et asperiores officia fugiat. Iure fugiat eaque soluta aut.',
                email: '9p7wkanrb2k6ivmik1ipqf7yjf49knlexd21byjrgjdrcuhi9p28bj2kl1ailnpvvi1ehlzpx6898ieyb6c2eu742hw0n0yftzlf9gt3xiegt3c17b26pgus',
                phone: '3mlat8ky92nu7vejhzjkpxgcv1krpgbzee8bzdw01d6i0cb67r1xza49vz9zvrsyps5rjuu4yvxvt2vyz99rwigh6rbswx83swx0nbe2iqpgnhewlosufuio',
                fax: 'mh7cu8a7iy68vsnf9vfoigyulpxh7eorxmznlnuh0e9y7pv0v8qew26rp2a7bg2356pxmd8hkhj42f3arg9i2isjifpmuer6uqhv9b4ww2x8trh2hrvzliht',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: '7mkcqbo5xk',
                locality: '7oo635ckxw6ojixh9nzmthmsgwgsnrah9kwx32gudi5aopdzoyr8julqmzzuaebr280v458vodhic7m71n13ptel883q2hczt1yjuqz91ak59jjj874uaeddswpbs',
                address: 'quwpj23uyve6gv66dhtbu2rwvofv8ml2lvjadguui420olqy5b49tzc3893bzqaofbv5jfjdjbshw5xt7r3xx9zzi2ykei4ebhakmopbobp3adjwt0b7l8ph6ecyrdvspk5u6hrler5pru3avsjet2h8cz7b7k6p5iv72trgmwpnse82fgd97q0vbkzjk4f2s9zexykqr1oxg7ntf65os19mxr2ujalwgl4y6whmsyqdftnzkvl1xldw9j8uany',
                latitude: 683.14,
                longitude: 356.05,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerName must be defined, can not be null');
            });
    });

    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                
                socialNetworks: { "foo" : "bar" },
                description: 'Laudantium laborum quis et illum animi nam odit. Aspernatur illum fuga. Architecto ipsa non voluptate delectus exercitationem in fugit asperiores ipsa. Assumenda eligendi labore et ut in quia. Nam quaerat itaque dolores ea sit quis officiis aperiam. Vel odio laborum qui voluptatum neque molestias.',
                excerpt: 'Perspiciatis eos hic consectetur autem ullam itaque. Ducimus vero provident. Nihil dolores blanditiis saepe sapiente voluptates eum autem aliquid fugit.',
                email: 'zwx4qry0kaedqma2wr87arrhx2qu294epgkn7ty2qo86jbicnplqc4q97wrurnym7jykjzys6me4avv54hldlyyfa39djv9yoyliv9fpn1kyg8cjr4j4tyqw',
                phone: '8usvyh6vttgip8crdhribarqig07uzpiag666ozd6h7qtw7abzh8dxyz65bonn5fkpwg4txjt7qhlvz2fnhw508slmkpv6up2yyucpq12rnifowm6v38ddmm',
                fax: 'ckzkzrjlhqhquumhm1iqdtc7zpa7x87abn3hi7fu9do051vqk51m93u83btlj6onz1r2onloab8c41fil82dobifd8hggm6hzpk06wtpwxdcznu45ns11e71',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: 'vk2n9q0y0r',
                locality: 'f1e005ofprsu2j8uhjq2lp9zptnaxlp4q3llq0tiz1tevgpfx78jzlnidixm1kd4qggeakcwmxf9aabl7o98zauqx1iu5ninotrbfh6p0qhif93i3ovegk8onenfb',
                address: '4pugyfz3rvy7wr91v2k2ikeuvjxf72mejobosdosl7r6moyzrbndnsn2ph3wpx1ckf564n61wq41019sx3e3jonasd1isdbmob7he1m8an48nx8zs665y4kd8si4sm488nenh6vdjlzqt61i9s2aehp89au3e2hru2qdc7cvd7r6lgmosxmg25a1ejlomoqa5cj63moid4hovc78h76qbf0c0dfuc0jamz9ydtcynj9qmwxlx2mwvcl2h96nvcb',
                latitude: 351.30,
                longitude: 728.84,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerCountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: 'jx3dz2uxfkhds9ggrpepbm8l5bm7c1j1o24s8fki3o5h72m18is1ru9281ne57rt30oqqkhre8ewrntznmu8ay3qdeu0m7fmkuf4optrg8rz20fwmmfwx97g6invwq08047ml5zmmt4sjywyjufxz91p5stk107m47kv2449gyi2cgld0prx08uog1u2xqktm7e6bx2ug8hgbic4jocn5ijbrxw335shofkh6yyouizql8tcdjh6heu830p3rwy',
                socialNetworks: { "foo" : "bar" },
                description: 'Autem aut nihil deserunt suscipit at. Vero ab pariatur tempore cumque. Quas porro est error consequatur cupiditate non temporibus aut iure.',
                excerpt: 'Odit dolorem et assumenda labore delectus porro quibusdam esse voluptas. Esse quos maiores molestias vitae eaque. Optio similique ducimus non explicabo ut facere magni accusantium eum. Eos harum nihil ex. Inventore eveniet reprehenderit nobis alias error molestias rerum. Doloremque ducimus fugit sunt amet sed.',
                email: 'bbgvitawmrfa2r2imrozymhl4483uqjf7rao6i0v3erg0m7ezczmon4h408brl75om4zgmigygy5fmety23157dipph6eirzbpuv1hf0gxob2ug1qc2kgahd',
                phone: '09kg8wos0l1apc7uifrbk0a5s6bvv5g9nkbbxe72gryqsovj3ushcqmsjrudycarl073nso550jfs8h28wn0zp7c9vsbdx2ybugzz50qkav94i3ylrby58bv',
                fax: '8ncp6s7g2mlcskgr0zy5t17r8ir4v3evlyj8iv6ontypaxpyxj1pl86d9mryjp8uzurg78eqmmbowbmqimkbwxsfvfrlfpz73rm41ts4pxdn7pffnolhin5s',
                countryCommonId: null,
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: 's86k33xnb0',
                locality: 'lwnw8j031ppkjzh7hh03fsue1dvfhbwar6nkxtddmx1bafsmwyppf2st9qjep9tsrgp4ewm9sdfcgbns3wrd6itx5wt46zzl5q2bu2l6f5sjgji38hngeocg4jqvd',
                address: 'v4ncljii9bgyopcphvlbtcgy3spqmyt5wj3ii1m4yrrxzyek67lw9sqlxer6nine6rjlag4xexay9rdar5hxjvsdcja1zxmkaqyr3bexelw52sahn9v535lzvckcwclr4sxuc3ojuvwqkhfvr51dytahc8ckca1l339ojt38s3wrhgn3k0ge1bvgm63wl23kedimmg2e6ccg5ks0kll1yz2xl81mvp0tletdlkhxzpuukx8f838pjnbygcdclb3',
                latitude: 445.22,
                longitude: 122.95,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerCountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerCountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: '813tda4f89xvkdfmmp9ftu0sd5snhcy44xyw54gxufdk3rr0ajte6sweq3b84acy721e5q5u1n4m3749z9yfmxtml22m69m7equx1vfbl415iqbw406qntb33ik05d7jelnfphmsdu5uiy4hefrgenmmqvstoj2xolq3sgqutmj1x4zunhlb0h47x5oreif081fnelrlnrs50ippuiy3fvck1wq5u7fywmhayv31m9nhozwjbpoeuo03q7ykmms',
                socialNetworks: { "foo" : "bar" },
                description: 'Fugiat non necessitatibus autem voluptatum at ipsum dolor. Occaecati id architecto sapiente sed ratione eaque id. Molestiae vitae esse.',
                excerpt: 'Et et maxime et quod at velit non maxime animi. Sint sunt atque error consequatur non harum et deleniti. Aliquid similique ea modi assumenda a. Quis omnis nihil est incidunt quaerat.',
                email: 'ebjxno7vd7s3fllqr4qounvd0sddxaqqwt9j7u9kmp8tq9zshh15kj02v2dsk1gedsp6t0pym5fuej8tywx954alpiz4mqkmv4wi7phgespcwj7hhc0al298',
                phone: 'cuipfeoqx7kznh383bj7kvd1nn11y2x4scybw00nkqjaeozqb8ae2qx47g7kvvd9i88o5rxdbasgi6b0jq5r3qi1kcja6775orez70z1kqm3wljv9iuvqdw5',
                fax: '349hk70h46d9dr4ny3d6c6h5g0k46xamqytyzy7jofk4n85kpy7a6wnojz5peev54u61zod82alc4ke2gq9zqraztb2ub3ku5kye43w3vabpqhd5olzajjrv',
                
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: 'u94u5j1sck',
                locality: 'ytvanrj54ltksmz9490ax9dj8zul8v3h1lqkllhp56cviqnwln6weuu083t64v7tpqk8fcjeafzlhj72457f6c5x2dqoa0no2jz2rxff1bvz3nqghsy6ztke63lq3',
                address: 'zkkx71390h8poaj3na1kihs0njos0lkg0u6mo6j3nun701nsy32bv0kgga78c163lk884q6j2tjw3abfhymbm3zgar32i6ep1enpb5r7l14kp2lqbmj8e48r2xtdhiibo7x7opidiioe1kpvvgsctpwlzyl9yjqcpftiis3386clv816qvze5kx3h4zyz84dvnxispjx93rigsz3ile5awgmm6rk57zv7b4lnkkad4uwulz2tb9bkb3rcrohthf',
                latitude: 901.43,
                longitude: 603.05,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerCountryCommonId must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'pz7wf1d8qga68xxr4n0askg022kv8bq5ie6w8',
                name: '176h053id29tmu1v57204kcdf6q4s3ies1zb5a69ocz5h0jcil3sbuxrzvof2eq5s4o3yqhsaritwvd55j4s3xtmc9vthrgnson52mz37jlvszzwaiz47h71obrmbexvti9va15cgv1i57ophibm6gkgyxxrowfbq9oad90npvomyvdhngu80xmfh8ob5z93zva23btovhd4k32p3rpq9bc1ol572ohgcrqecf9spzyfpjqtvop6m18chsdb7q4',
                socialNetworks: { "foo" : "bar" },
                description: 'Consequatur molestias quas sapiente. A saepe qui omnis. Est iure eos porro praesentium sit ipsum. Nihil et provident laboriosam eligendi consectetur labore vero aspernatur. Recusandae pariatur omnis incidunt. Repudiandae impedit eligendi beatae et est soluta veniam.',
                excerpt: 'Aut rerum et quia eaque quo. Officiis voluptatem et nobis necessitatibus possimus consequatur. Exercitationem voluptas consequatur earum possimus itaque nihil eius aut. Facere expedita laudantium repellat inventore distinctio.',
                email: 'mof25riz8mipgcoxpglf25bls8fxqdi424b6m2dt1b8tejooaj7ck689u69oufxb5kikro243induhx6qditfsijobavpqw4jdzshhbhxqr4wtmn23o2dei3',
                phone: 'g0yva1k8l0u14yky696bfrj6gvqmr9654sew61xmjmdm4cfr4k5ywvq33rllbs07sz9hagpsxympelep7lw6zjsuohvgs0vph8jp10mfm0lmbnf8kqmheja9',
                fax: 'hzd3ql5sthytbep7jcr7bibrcox8l8hn2q3ic4jxrjky6jwovfdbnkuk61ng6qdstqi0fv3wv3pyd3gpr14vfahhe90brg818iqk70crgnfuov65wbmuv85s',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: 'fjp0r1uap6',
                locality: '877ckugcg94l1v3ng5s6c8sgiip6ftaidtogluf6dv81vdml429md67txnzzv2wdv8u43oem3mkno6cm6hc3gbu70zqtz3xae0a3z92l3ojuj7yh6470s466sq4vu',
                address: '1twcxs5a4djkzqpwow3czjr687qss56a1gie1nvpxlfeuiymigvbu5xtgzhcpb2jinrisxj856tqi0qkpapluzm1nmblbc6a2g8x4ux1yqf20m3ggaz79paa7v25y0zhycw24s1z6t5be07qsntbeznk8v108a0n49cqzimsilhnue906es64cnszlsbqxljqlbgrx5s0t789abwjswsqvfqpig9hagwmddm2hmwz9hfdm488i0cj9uvocqmens',
                latitude: 574.47,
                longitude: 327.61,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerCountryCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: 'f4s6sw9m12np5zf1chs35wv4xibaj0hjnl9jok7x1t7tf6rabxignro8jn543gu2nkxo2ia4mbblgqhqj60tr0fmstfpo9ubvso7qcva9twf5qwx81lstotb0fqieq9jpmqo4wtxjeylt9yf247krl00criejgzae4zzgw42l1n7792037fhr76aq9yc7t4vbmheltn9ailwx0s3whfufd365vsrxea0njndjy8soeybq9pqstcvcbw5vjfm17f',
                socialNetworks: { "foo" : "bar" },
                description: 'Velit reiciendis velit ex architecto porro qui pariatur. Ut tenetur minima. Ipsa ex numquam fugiat.',
                excerpt: 'Qui perferendis ut. Modi ipsa voluptas corporis laboriosam quisquam ut. Ducimus sint magnam inventore dolorem. In quia quo et autem consequatur et aut sit dolorem. Animi rerum suscipit incidunt debitis facere asperiores porro tenetur.',
                email: 'lh6fysh8rp9zjyvwjan6tg5i1yh3tzp5ki2x2yed7qc2rzotwr4h4d0hr3itaayit39wlxo68qw6bzob56ugzz7lrpvbt56me06ctygwltjs82us9snua1c1',
                phone: 'rd8vmegawcb75z3ir1834631nnxu27i40y2jowsr3xqms5zho9ddwdez8cvn0n2xp3jm7rgnk12xe8jy4qz82wpd8xmvdjgvannvb3yxu4cm1ck64q1whmtn',
                fax: '66aqna4y4hkw0hlv5k0hd2s3irmm7jir8lu0w6tr6ajacpjnavfy3nrt5tro3fiqzhz4x6a6r1565fcga5q1rhejzgn7kvas7gbze33ss6dy9cv9ogck92yk',
                countryCommonId: 'vi9c7yiidam6qclv8psjda675foat0u4c2bfa',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: '2ixgp2cbmi',
                locality: '6ws57vbxaw4pxmbx7nlz1eckxldn1jlk7cwkuv4jfvoaxlu3xu0tjbvpmv7kxjxyk91qqeo8nldbijkm40udrb6d19rvnhrftaez44641iia601kdh7runk5rer0s',
                address: 'jlhntu6hc2kpdliln7ubqwhvhaeldpgaq2b50vzvchxqigdcd7bgwjlytbzkgkey72bjp4f0zbtfxzz9czxeeharzg4t2oolj4s7o5mftvk4um57htn1ps22tqurzsnlwdy7jbmyboli9uzvab7xx952sqotuitskd6r7rvhr3rsxc3veodov7tr93wxdu8yqg7q4y26413lry76yajuprbvsmtnrfnlfv2xn2x2t0ihuqh8vbbv3w6poqaivi2',
                latitude: 720.87,
                longitude: 188.47,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerCountryCommonId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerAdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: 'aqik8fsjn2k7dw4zcq0vn6oc9r0ydlefkoe8qruvednp06pej8rarqy7kgrhw6kbi372ovx18p1xq0oqxgls3e3qn79kx41807ttm6wjvkub22qgrrwqxad23uo0ixw7dda9xt6v8s2vfvaqaq6rgi9nharsqi9tj5nfo4m3mtieo5l929vozpbb7jgdn86ta7m42faqw52q5wx7ug6r1y29c942tb1d89olfoz1rxvyesstb00on9nmjtnjp3l',
                socialNetworks: { "foo" : "bar" },
                description: 'Quo est dolor fugit. Eveniet debitis dolores occaecati ipsa voluptas dolore aut tenetur quia. Eligendi maxime sunt aut. Et non itaque et ratione maxime nostrum quam deserunt. Odio et tempora dicta. Corporis exercitationem nulla molestiae et.',
                excerpt: 'Aut non et doloribus harum. Numquam dicta perspiciatis vel accusantium commodi architecto accusantium consequatur. Nisi fugiat illum fugiat asperiores praesentium in. Quis magnam maxime sint voluptatem repudiandae. Amet rem facere tempora dolorem dolorem et doloremque et.',
                email: 'g49inum1zzm0i9ljuap8nv6jdtvgvwbjip4xadt6bqeiq2khkfrbdwuhbmayqs0zmnteytg5bktdh0sml4gnryu5q72r9484gtc4hb0r1o879odoza086eq0',
                phone: '0697lb8ix4xj0ky0tbelhc9odnnymlj2ihobg8atg9e3g0hvdnz5qngf163vzin2kufz77uypvpm2hwe1ltlvjui8oquojdw4hxtggot0qv1mifykvoloeg5',
                fax: 're2tkaem3gh4hzxmrix7tfo06c0kmsv4le6qpmp9kpxu5ig2p1zt16qvmpjbf1epypt4ktlp9ulhaz2k5m4dy70nn2he9xy9vg4h2be9qj6bdmvc6pdj4mnv',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: 'ged526d8c1j55fnhro7qkyu7gojaar61o3e44',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: 'lbi4n6pvnt',
                locality: 'uq5oyqrxvtqit3w5nr5bdkdg7ieof1snbsjry7edinjl5msy429u0wh12tbmobvtxwu18mf3nnfj2ewkdp6uv9bnngxdhgvfg6xyo7u7yk6zn9ufpyza89rnacqjh',
                address: 'moc441z2mvcwnc4sjlfi0wsnuy3rr093xk949a0ikfjsc57ch080mrj452953blukmzo3i8m0x7ovf7mnv3wx49hqjenih0mbpgtk3d6qlu7k1hoktparu8q7bgkkgkdh1ynwtiutqvnue7bd6p9zg2tzb8glppvoqiqv0tv1ukwpb2kpj4ijzfpt0raorno4zpwklitl6wrq5jv5op0615j6lrcss8of95jm115p6f7q3t1q1jjn7fpy8qwo5s',
                latitude: 284.12,
                longitude: 433.90,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerAdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerAdministrativeAreaLevel2Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: 'l72o7zl7pkivwva2uz72jm7pej27nrvwjqynnulmearr42jv4rjdgskn6taf8pde40kdu21k8ujk4zacpcj292nqnm9bpy8s3vh29fga7nh25bsvnvdps9r18pno6ggd80q4hznkqk8y4s5npulmvq8d3r53ytkth8kwuuzm4ezaqn8enovfi8hb83usdzsseyzbaejhogc7y3opkc2zta7045nlo4gtrjttukcsxo2bmraw5vzgogttx4y5b2z',
                socialNetworks: { "foo" : "bar" },
                description: 'Maiores corporis fugiat voluptatem sit odio sed qui. Id eum exercitationem ipsam cupiditate odio odio vero cum. Facere iure enim nostrum iusto id.',
                excerpt: 'Vel ab laborum adipisci sit consequatur. Eaque vel iure. Delectus repellendus enim eum non animi animi. Dolore aspernatur delectus iusto exercitationem ratione eligendi qui eaque. Eveniet vitae eum sint id qui. Vitae atque in est dolorum et.',
                email: 'pdk9x8yqtrx9q2xusqhh1w29eqaflj7uy6rs2zl06qxou326yj3gmc42el92wqkvbwtcbwtjwrbxb0ivzahjdl047a818gh0zx4jd1tz6yo0fun4od3spdyc',
                phone: 'zvdu341yhyn74bfp0w35yk7l21yd3ejeqaesiji1uzk7ke7hapv10vrfnu6gv4d7xr0072a4buscm9desr8syist8xfq4hpjxumijz4z5k2kxosll39pe72y',
                fax: 'i0s65s3jarwy1crh19s3d6n9ynxwnb46nycox8slzuryz4soywn1zwguxorwh13gwo2io8ueuvioucaku3b3jxte13tug59z74ne4m21mp1vgdsvxs1fqwqv',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'tff464mzb8fec6tpp0a81qfhiqjrs768d1cah',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: '69o0nrijr8',
                locality: 'ylm8hfxwky2e1pywr2f6mvtzrteo1fp3looqruxubg7ajqw5zhh8rzc0n1dgixcg1dk2i934o37m5fqok5twgjqmydmnfvgh7q0zasz5wpziya3pdrw6xek1uv25i',
                address: 'zpso083k5gfa1ecvyeh0qfxqjgz64jt3lddwg7g2xltcrsdgbyizvwkkx8xy6evzooku0giqvsrv4z28o7pi42mgo4jygryy0z4tmhbndw4ukfpum27qihjcwcfglmpbn3n6b4f3viaq30x2e2gv7ianh8jl0gwalkegs7ihjtm9r9buqlfvpdyb1r0yxjxwqlilnthmvv98n0g086xwbq2kn2arfc7dfam10l1dhc2wjlcpb1ip61pvgwkfzql',
                latitude: 263.45,
                longitude: 644.70,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerAdministrativeAreaLevel2Id is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerAdministrativeAreaLevel3Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: 'u9vdpnc554axsme2hseuup0ykxeq13fk957trnp0f71t2avgd0fs55v78l6ize1c3sj8yietezy43hj5ygasyz30lpyyuz06b7ks6qsf88zs4cctak80k5b3htwrz72ylzzwkd1onpwyqmewmyrt1gqys5plgj6byy19u6ai2qeql7xefs5wqbnql8t92g80wxfffpvmhky4o8bodvxjjj1i5p1gtwcf9b5dq46vmsdfl2laj7jl8bp7ne6u579',
                socialNetworks: { "foo" : "bar" },
                description: 'Officia voluptatem alias adipisci accusantium harum. Hic qui a. Et accusamus aspernatur. Et natus nihil repudiandae ut sit. Dolores porro qui rerum autem in.',
                excerpt: 'Delectus eius tempora eum sunt doloremque facere ipsum cum. Incidunt fugiat distinctio veniam. Atque sequi molestiae hic eveniet voluptas iste repellat. Quia magni est nihil inventore fugiat repudiandae. Et sed et possimus nobis incidunt a nulla.',
                email: 'xxh2tu58vi6twfnem3vxq3pa1wgp1nb2cavi73cyo5vv4ro5dypgcogiiqanwe9ueiinjs54f3z4ycw620g6avmlb5ribdxmngaab10e71utvlsquje869vh',
                phone: 'ltk5xa2t6w8pzr636qg5qg72ifjercuvckjcy5p53fg87exvzynts6osp38p0blife7msf67tqcp8o8h3nul4ri0zrajffvg1mjrikutfnd2ltqkdv147a6s',
                fax: '2rhn7ruq6655v1r63rsp6w4vmrqniavibfgzj344tw6i5pydtl7ywlcpbl0btc8knj7fzx6g1d1wxq4ecw5p86o01b036zmh2jw4acxhmqm80dzhifqh8e2d',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: 'az8xpvkzh9yaq8lsgl3uqympf7pwcw77pow54',
                zip: 'us6fnp3w2a',
                locality: 'aq5zsfhm43zxud49z6j45wi6il1skbx9kwexg9b8n4iam6ipnuytwgw366g9qt8c95xz2xy24bjjj42b7jhelohiyipqy1su7qfic7uoc30kl8aoeolx0gc4gh1ek',
                address: 'gypof62h45l3cja9u33bwgwda3yycw2w4b5a2mh7lytywwiayqq2jz2nnwbumw1mu6ol11igxb3lm1x4q2heloco24nu9mew1zo87clkg1hr1rj6ztxno45wba2ivufub9edtd04wqn74farkdr9rhj88qbk72aoprang620y1z5xaq2twf7ea77krhw0yd86bf1meytwb9s1py3pp36f3tljvlfywn59z0av10u5ysvgp7w5ercta7x2m5qyr1',
                latitude: 501.07,
                longitude: 972.07,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerAdministrativeAreaLevel3Id is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: '8mogkyaki2sherpcqm316b6mxih0e67eq8ns5m10o5d8r3yhqaevkq6tcermp37xt8ceoofq64k2fdhh0pio9nq7eylmwo91poxhdkaiw9wt3xee9vqt4atg25ah57lwifda21gl18cxym0wbeqaax7kalck9xznim33lhnzyn4iwijw18t9dwtxa0hk2fughm65iayhawja6t411xp2vusiso8ne43mgjtx4pt6xb9t8v1ksx6k4zwg8rb2zp1i',
                socialNetworks: { "foo" : "bar" },
                description: 'Illo est nihil enim fugit quisquam saepe totam sunt hic. Non quia quia repellendus animi ipsum tempore culpa. Placeat repellendus reprehenderit quod ipsa saepe est modi.',
                excerpt: 'Ad ut quas enim voluptatem cupiditate ipsum distinctio temporibus. Harum dicta sed perferendis facere recusandae est consequatur et. Similique est maxime et saepe quis assumenda et. Dolorem temporibus pariatur tempore omnis in voluptas architecto aut consequatur.',
                email: 'yc4xfoi03yzvop1p4fknoj4jitd8dkd43xt1mk8ezfqysclhe8cte9z5nqtdxm23u2wkzfsmt9ivrlm7jhug9p68moafbrhqwmf2ghcbukc8yigecbxeereu',
                phone: 'r82eju7joru1fnvfpae43b9w1j07cuix6bzsgd0rytb5x9qgvmoifi4str3v012zi1qe8xta5uiefp47nwllfnniy46r8dzrhlwdpajd2ka83e7pjdx89gom',
                fax: 'y6ldalqhdi014p3prj95jyhknpg4ozwe5b449o8mlp3oy0z4rtwrw7ig14wz5g1rsseqlohwhedukyimh4gcsmjh8x3dtcg2vc4wr7ik7qolgnmrim8g7qbt',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: 'u724tu279g',
                locality: 'i9bw3jncge4pvgzoe6vu97ogg28pfudchhijwt3sdef1colmt6uy64w0x8l3y9koajf2igiopfiab7jhva7qy4osewstd7ykzi2h3fvq6vy6vw4nx7csazvdhok2k',
                address: 'nms60x6wz81ue1ibikp04skfk9jpsbobjjxkhbdhpqolkejlmty1i7z11yj3e83yr338f83zvaagpedbxd79ccck9ujd1gjeljndvcextnrocgpj5yviyn3dolapsdowyxlsky3bpyh8xlfwhl3bqcxwfrbhq8wt0vnkwem9jz435wpj33r6sr10g0cjmtrtnstluxdw5qmng7lplav6qdro558kc7knu1mcnl3nzbzalxxclu8rnv73p2782dv',
                latitude: 434.65,
                longitude: 589.80,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: 'f74hujmdhb5dfb121iby4qmv18aszvfl7xvsp5vwvpaa7j172b92e810jixqdpgpgqibrnh0izeyir4hqvb6z6sfn15wy550gv0roafeqhti5x3ifcnvl08vkvmf9lf9lr4el646xp0g8n00g3t8ajq4md03pdm1pyj6904imun7p1ujha3lcib6383aioi7szft5rtdszla493onbz0vxqwsj2cutfmex7lcnqva031gpicz72kwgghh4y1kbs',
                socialNetworks: { "foo" : "bar" },
                description: 'Delectus totam nobis. Sunt aut at. Repudiandae dolorum eligendi. Voluptatum aut voluptatibus. Magni ex architecto aut.',
                excerpt: 'Libero atque provident. Aut sed laudantium facilis. Repudiandae enim nulla ratione excepturi aut asperiores nostrum. Id recusandae autem. Dolor quae explicabo pariatur corporis eum molestiae odit accusantium. Ut temporibus consectetur voluptas recusandae dolorem corporis quo.',
                email: 'qm1iwxelfpvsq6jl0cvh0qhddr9kqtsy2i98mem7rv7b4u2cf1wdwr34eavxmh9wiwzqouakj29sioov3617184byeeipncqlj97u469tt6hqvys3tq85hwqt',
                phone: 'beo0w4i721dr1wkc4to83zfhvdehn75qtirn2wiadrj9xu1q503auf96tnfe9m63esnldx099x6acl21t2uq5dbyzq3m6zera5apbn01fviuhxodko20q0a2',
                fax: 'klnvpx85r08xgmbgsbw37c0l8tp0sb7x4xkoiysudlmw4eph4nn27xgv5mu86z46pyntbyjpe1c980na624uqie8ujr1s6b9t5yi28jk25mug3ewvq7imlm3',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: 'n925kcuj98',
                locality: 'pau22h6uje59ax7dtr7ad5t0g2tv3vo3p2i4z7bwqn1a7hdu9eoyjjmv514bf9ug5qldy1fdmduozajfvwh4725l5f2piaa3kjzs1vppctdwr0jxnft036l34a3lj',
                address: 'xp0tzmzr93c9xkjw15ogt6u2ab904ab0d12gki0316yeo1cvhoy1g8u4nbfp3q9w515izu8xyrvjh1jsioaii7p5zlguz0rhmid9ikdfkcqhc37l34yc8puguo1iegq7ofg8orzdl7wei6w5pp2u30aa8ud2m1jf5erbwexojg9wgpzt29tvcsdsqq8l1klg4be44gd37yfins59h3v9qgkqh7ju670ljky91gku9sppzrpfu3epekk426lklhw',
                latitude: 105.41,
                longitude: 786.23,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerPhone is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: 'ej9s0smee8fjlm8s9v8ut63trxx0mkxs0hdn6jsz3ec0jprbz5sbhlgqm3jk91oiesqpyzkn1h3m1g6u6otqbjz5g9ztjp4cqn2hvs45yqqu99gyxt9k2mqlxzpq5ljgc5662fxmfflh48sd8n31q13z15zhh0ctszm2gfwdmenhf3uwicu2f0ti4x0vrjwqpgy84ukwkcg309hpqn69l4ocp7tsx4hepak3he5mbtampklo1wz6q30k4h1rgtq',
                socialNetworks: { "foo" : "bar" },
                description: 'Placeat laborum assumenda totam. Rerum qui itaque nostrum labore sit fuga. Sit vel aut mollitia. Ducimus suscipit magnam provident repudiandae labore similique eum quia. Dicta ut non quam.',
                excerpt: 'Soluta aut illo ipsum fuga. Quasi voluptatem quo quia sit odit officia nulla debitis. Similique nihil deserunt qui quis et doloremque doloremque unde. Et et consequatur quisquam quia tenetur animi ad.',
                email: 'jmderkdkybp4lmw2aqojt72b5e483qirawwo3xnlkceqyyp53lw54i70reh07x2emzng2gco2t76kvm5ybsqjv8auxxye4h87bbxxv6cvg1o988dqu3himwr',
                phone: 's8e4eg75bt30230635cvan1ic0405ddwb3lv94q9yu048tu8da3930t8xjzyc6bctflvuxc2g7bk19zx0yl9kml2p19ad5w3uao9h3i308ph3p5jh4juiq3kn',
                fax: '3medbtssev0jyfzmj2ujdyte8nga8dajve555bkeqp9fki9ogkr7x9p01psuuwsp9i5102nv7q5mfdid0ipzzushp9g01mulsdpamvaszduyhg483lyj09tg',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: 'bqwx9ijy7k',
                locality: 'nhhyviko0ruydiuxezii7cr24cqb9g290rqkg3i046dhumhkgrd7la49i1oisdnmi62l8l6oqep6v2d5x464pyrl55b72i1potcj9io1bh6n8kcz4hlktqbehi5zf',
                address: '4ikwn2tvnw9cijg7gtk70xqgnwzwu7two9bu46q9v3a946g9qvqckfapfodycs1f5ejvsaays0t5qba2b0hg9gchiah4g6tlfrkxhi9qzxzvh9j0uy9bsd2szve7tyxr8il2jrbh35n4q79930a62aqg355kg1i4iuy13p6r2sn9a4xxc2bhhqdcdbbu789g6ye4g02f1cotoj9l3pb4w0xqx4a8vu50zlj0ht217cex32evsc57eu0h29fehzq',
                latitude: 974.64,
                longitude: 473.76,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerPhone is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerFax is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: 'q2qmhll8e0hd54ayx501hstc14wflx88faileurdzmkbdvh4q4es7glvu7qx3cvlwoffpa1jhu3yv72t0j8psrj1wauwbqhcphn82pkhnfx5iiy4ofugjpdybou3iyj7l1jjmoz05pxmzkjy1t8wbb649wmxjrf96pnq8zazbq4c6f64w8f0nqvbcymiko6s61sipj10vub35zb4b6deunmus2uwafkdrsvhp1iadgwozwhf7nxld103vtazvt9',
                socialNetworks: { "foo" : "bar" },
                description: 'Ut dolor deleniti saepe. Quis sunt a possimus provident quia quis dolorum asperiores ipsum. Iusto officia ut non non.',
                excerpt: 'Explicabo vel eligendi possimus. Animi quaerat similique. Magni consequatur nobis ut consectetur esse at.',
                email: '3ydj83t6kg6um5xpnvo1x77kr5tonirubprzmgft3qrzthomawui87cx0geavxui5dh8pbus92d5ox7fyq3kigd3l9gg2m08tdvacrex97gg9bv278hjuv8w',
                phone: 't7wscfssztdcaqeiqpbbev06ju2jknzi5aw0pvxmhpgfrmwrhl6ljv73l5ofss8vfcafh7yq3dlcr3y3hd04qxll97d439wy6770gzob5olq7y6vcvt83ea5',
                fax: '2w9pbafnkk0jqv9flysf81auynaewyctyc9i257mywj2bkixapw7k2b3v3ec9ejyxh18izw3yg1912cy1i248n1h6eph95sjg66agvtslqwv3ikijmvg576d8',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: '59c8vj7h4m',
                locality: 'pu0ej70d3in6lkdlba28a0l0to29zj5po8tocdozbu4goldtdx75ke808gkh2tw8kefx1ck017s7e73uxy82p036dtyrgiytah7spmzez1fxyrf5wg4h6moa4t7z3',
                address: 'vu76k12rs1xv0vjsgydtgbb5yuynlmb793wzl1gwzj2427clkvh37y60utnousrjm6gafmivb5re16li4hbef02q3t6cswz8wyu1a7ptooz35lppownkr8lceeq4ty5b5sdm4qhvsnldfhk9xx6xjl4pi8jifwjtf4vs0a9w61hb5ntovvqhtnyycr6y0ec0iaavxk9fll614kcky6g193xks76dqttc78clj9o3nqxc7yyk6olvrkedaw3q0k0',
                latitude: 647.50,
                longitude: 941.58,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerFax is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerZip is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: 'mf41geu3gmo2iwf5zqqja8ll27gwo6taoq3roz8ukdn60a67o14m5f2imkqhp9i7ktye7s43c05mhqhxp1ok0xqqjhzg64lotoqn9i6qia4mr7bl7nzvts8rhtilh3rfwth4pwzzjell83b6nlfyzi13alg5j1v9kdimmp6ftqz10nkdyiy684v20ygc4ip7k1g7qheiovj1dz0svnm37tmyt6u7xdhjkw9qnr1gvolk75j417sntmt6c63ulp1',
                socialNetworks: { "foo" : "bar" },
                description: 'Facere accusamus ullam inventore aliquam consequatur consequatur labore doloribus. Voluptas et hic laborum consequatur ullam voluptatibus et architecto. Quia quia qui iste excepturi aut laudantium ullam sit alias.',
                excerpt: 'Est et architecto impedit consequatur sit eaque. Et porro commodi possimus totam doloremque. Sit iure magni aut sed.',
                email: 'xzqlbw0j0loecytl06b71zbpsze5kv0pguc26y23cfiy4i6ppujxp6za2q4a0k13ul403rcvbamh8i762ovppk30ttmhk197ldm7f8tyks7m7q6bqzp0xanz',
                phone: 'j8m8ht00sac0qfebktyre2hl3mst9cpqltff9ll1sg3d7o1gjwr7xloeel4r96020l74d44pi0znz2x6chwcjrkt3340jfz161cl4o6mt6otva2h8j5shzge',
                fax: 'zb22g8nfvfk0740skr2v1xhg5gbh0fg7xj2z5f0gmmy7cpresdy49mc42ai1bn3y9wsu8sr01mmbzqgsp9rne5733hzhl5l9bih67avco7z8ify33l7caqx1',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: '7x1vujmmaey',
                locality: 'wbm5q70txrg2299kkrsa1uw3tn33agnf1bin92x84scn6topjpxfmr82fg6yabintqohxz1wj2lub5a66j90snrg009frb2nyxoh8wt8oqntbyucmz6rtq6owsc91',
                address: 'd448bee2aexfbcx4c5j6epnjn5uclqi0qvoii5a80pxgy9j1g9xq9zamufsrydqcpbtbgv5vup8trvu7txdg550qfi7v29t39h4ima5as31b2pbmvw048s45xqdcl0jlsetb181gwnvp9wgaf7y5fbajeewnugo8unllexet8q8otwyv0fqiynab1yukg5neoovb2lx1ehdcn5mtj9nfuyg1dodgvwnzwo3024z2mah18mb7pzu1atl2a6ujdiq',
                latitude: 798.72,
                longitude: 459.32,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerZip is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerLocality is too large, has a maximum length of 125`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: 'ep67mq6i5qaq97oyp3zqi53v2phdf4vcythiw3k7hssjl9p05rs8kg80f4sebx0hxeuab12gqh1iwbohoeocbwtry0pw7e35xuoqq9240pv0mbqarapzl1e5nbcbtbsz2r3v2ch0rfj6od1nf1bqys9e97ljt0iwgkd3rp7rp7pve0i0vau7b63dx9b3mo1omb9q6k9ndppslratdlac7x5eqwsbu278o76kpkgyfd7p9t6dhznllx66vaf6ebx',
                socialNetworks: { "foo" : "bar" },
                description: 'Voluptates debitis ab. Error exercitationem explicabo architecto sequi. Molestiae maxime nihil dolorem doloribus repellat. Eos labore enim officia fuga aliquid omnis atque dolore dolore. Et facilis totam quo. Aliquid qui dolorum aut ea sapiente corporis enim voluptates eius.',
                excerpt: 'Nesciunt neque praesentium repudiandae quia quia ab sit voluptate deleniti. Voluptas neque odio dolores qui. Cum ut voluptatum aut quis id temporibus aut. Facere hic excepturi recusandae cupiditate vero cupiditate.',
                email: 'buz6y6ykpehecczutn1tmzmdv3eg1gfew0y14v4tuwmpsowhyfnnzqbcm2gvqd35md7bavd4832ndbkbqgd1zaucsp450889b4ce3keh4adkzy3eisfamosb',
                phone: '7xmn3cibe1nz92a4lvkxfwhajumfccxtfzjesnar9t37gyfx1jv92s5fcu8ib3g54cxf33r7nxnxrs5hc4ijhylylezhq4lpun1538czxfsm29hc083r9ebb',
                fax: '9qb4b03ii20f2lti7df92ktie1zse9draxobm8w1c0x9v36l56u22nkfb3jc15fsjt3986vcqn7jdhzjquuu7f9r6tsdbd485jlwc70gxes7286al6jmtf60',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: 'f1nx5at8ed',
                locality: 'e3qejvc57tjuis3k2y8umu88ebvp3ep2r98y81oez2we6m5u3z0goatw9prp19pp2samnndmrolcbf5pz0y39tx15kgh8monbro85kpv1yqcwkx6iq1tar9qwmlcxv',
                address: '94v3jayhnducl98puqf0xp0orkcpcb1lyk51mep3q1c0iut95pv8zgy9splv2xkh63r0e8k06pdi7js19px5kfk6uoc4zuehyzo5tnmk8jctjkrync8yr4abvh9ymh7m1fe2sxe3ju3u22kpvqenqupum9kck71q5idwnxna8wjtbqtj4i5gl8z5d071mdqq40w76e4rvqdiyh3re13vq02scndrzlg0ccjtcp6hmebbxdfd6k1r1cqolm31ec8',
                latitude: 168.96,
                longitude: 62.50,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerLocality is too large, has a maximum length of 125');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerAddress is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: 'ksuu6492yfs2x0vakdyfntwg3m7eis8ux18xn2dbnlp1qm1ckg9qbbm3nmbf7x5cwqx2xyro7qxnwlrptktumomxoepyhoqkw81drpqwgmkb84pvomjae0vl2pph7nf27j1ejpooqv187av0kdurhzxanftpy3qduwkbdcpxm2g8s3cbh71zbxc7fuam2748xvk7a1aiak3i9gf5q1thrcdqnopvjf1iqdszvtncbb1081w4ga4xyr8cwuwepse',
                socialNetworks: { "foo" : "bar" },
                description: 'Et facere aperiam adipisci similique autem temporibus rem quibusdam. Esse inventore aliquam quos amet quia temporibus corrupti. Et nam ea natus.',
                excerpt: 'Facilis voluptatum praesentium similique ipsam ab impedit aut. Voluptatem non aut voluptatem tempora rem. Aspernatur consequatur quae dignissimos.',
                email: 'y6v8b0fjtmw3dzn9h3jzm5vbp29pv5xyulfc5r5rfw3epbvx2al3j4wwnts6hmnka88d5tlugxlvcgmmdesi1yv4h5mpsdr4bvvlxgbnxmlc2v9qg08k4htz',
                phone: 'q7bt8yhlvckb48a6hvxrkav3j0xmmq4i10yqibtcti4sgrc9rxwgwo25m17q7zybueevjeo2lrnopz9r89d7njwduezev8uigw1y5aylv5kttg7pwui4uw2h',
                fax: 'hca0hulz7zx81e11k1b09p87wt002l8iravxvnjn8dofys20wxu4naolkp0jbm3b6izrqoz2tka4s9wzb75jb0icxden0byuxz5wxr3e37hl8n4mxaf46v80',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: 'iydfy56r3k',
                locality: '0hfckad4clfgb8l5it99h6ovg4x3ty9frtqvyo3s6t5pnrjh18m0aa0k4t4neotyzviguoasq9kesioabtcdset41p0y4mbtbqwi0jywv17uunl615kw50ckwik4t',
                address: '3u8dh1mses15ku0uacwec42isgm1wn1te87uqdbswuokot3e5sd6kogsre8121q53d2xfmbqi9ukpyo3tyl9lxa7mvinxn1t6jiij8eums1ezhsz88pplz9oz0dwaqo2engvilt9vkks935ici2pt6e5s5osx48zb2v3cgltc8crmt7230rdbi9ozz006yvgqbrbyd6zbhp98nts4p969yt56zmxec6yl1jo85mj47pcqxsz8h8uzo5eqhpv9v5h',
                latitude: 533.53,
                longitude: 530.43,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerAddress is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerLatitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: 'iyg0zitwmzpd7declidcuudpetg09zhtkxqlbb6c83gvoo5268eaixzva2swvzapjihi41rfm205960i18wq9xqouh4wsjm1xrisxtpt76eec7pkzxt6oa0kk9orzwkqbsrc89kvjqhjeaa6uogxqh5057qdsni70tfvstzmb2tmzs6bx3fi09tahdtb82ffoqicti57wti423dv7bn3jjj1v1u0tgtu7u2oubn4xl9ipk51yr3daj43tuso0at',
                socialNetworks: { "foo" : "bar" },
                description: 'Dolorem voluptatem tempora. Explicabo laboriosam magnam. Similique ullam placeat aut. Ipsum officiis et enim facilis non et. Eligendi asperiores error porro non voluptates odio qui.',
                excerpt: 'Repellendus recusandae eum voluptatibus nam et. Occaecati maxime quibusdam omnis. Quasi quia eum. Vel provident excepturi.',
                email: 'ip3tkjy3iutuxx9g4mc2n41vfbbfcqk5lmwyhzbcicq73xc4iiekwgw6fv7q39nw3x366npze2b72ti12at50gxf73tzui93v16fpug0twml77h6yowd8xfe',
                phone: '3x0uwy7rxhh6czeyroh54v4jcbh20rapl6quyzyk0e9ro94x5gh4ohir9xtdaqkbl5xkpjnq4wfuchkslonjg2wpxoa22wut5kmpvs6hi0sts1rilttyrep2',
                fax: 'as97vne82tj5xspdz8c4ifyjzaly8oss85jyhp9mn3wc18uzb9ct9u39hfh5w2tnzru7atem6oj5hmiywrvjt9uru9m24z9hcf7qu8cj719pd3zmzw2meejz',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: '3fvh52oxpd',
                locality: '44f9z5a7l1howfc98gibkf2luq859xtgww47f4xnxypf2q1tj33blya7nljc53qbloevo4l1e8qywbwid2lgwfvvazw36qd6sf4j833oni8vac5v578wcunxi4s6b',
                address: '8gsuf58j350cf2bcm2f7yjlgwbfrnuxx4ba1bnd3n6ab377raw37k0il3norzx783h28fagxocomzheb5nmbvmgou8x0f91qek275nzr5az2btvcxvf7nrkxt1dy62jpuawuerql4njpgmn88pizlu7glcc8dbx4iwoctm40phynugyd47qjqfe84f5s1unnhbcnvuz86bjgxr1q5v9xvs5cdbw4pk2jtx5rldgplg1cff4392vxhuly78yyvzy',
                latitude: 782.19,
                longitude: 885.50,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerLatitude is too large, has a maximum length of 17');
            });
    });
    
    test(`/REST:POST origen/partner - Got 400 Conflict, PartnerLongitude is too large, has a maximum length of 17`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: 'c75uubp9wvwmakcwjbf3l5085lj2qducwvuzicwbvx8bnop9wpe1r6sctxqcf0pkuuda3yqmi19nxvun0y7h7zowr3qxonqe7j0ontio5ncalvlt6nhqi4g4na63ojkog69he1xjp3rgiee5o3vs9w8h23sip5qk0aiyz7j9oypwpp08jfwligeg37jq6guncm9hgmz843gkeu9wvua248h372qwbdu6vrcz274tbebf4tjqlk98wdsf2m9q8es',
                socialNetworks: { "foo" : "bar" },
                description: 'Qui adipisci aliquid explicabo sit. Voluptas temporibus voluptates earum reiciendis sed qui. Velit vitae animi explicabo qui ad qui. Et commodi culpa quasi. Voluptatibus dolores dolor tempore consequatur maiores aut recusandae ratione.',
                excerpt: 'Voluptas quasi doloremque dolores quia beatae minus. Omnis atque adipisci quam laborum minus omnis dolores dignissimos laboriosam. Corrupti dolorem perspiciatis. Quos perspiciatis est magnam sed possimus. Corporis veniam sit quis aut eum et et.',
                email: 'zot4ttfqgkg6p62cd2bgbcyijdorbmm6eiihjar5dam4vp6pv4wzqpkwuflitj32j178hai2c55okan677820x8v7ww6djfd7yhh0c7pat68ve46xl02gj77',
                phone: 'vu1eajcxqmi8fcn164rahsz3ku5hlup53o3y1sdra2v0kxmhrxqbujdu0avtmu62zbhv940lk3tcoyj0nhn87t5955ikno9ekjy5tb887gkr5v1xtof4fb8b',
                fax: '9rm1p9ccw67q8ibzrcz3j94mteyscdow3zatrnxo1ynl4j143m8cupm55vw8sj5grg1khwcoifev9egnfskzazhmfwzhn320galhqpp5nx0853y7tr437ttf',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: 'x7sf2cslsj',
                locality: 'gcbnmcf7q0tjhl7idjzspw3jv0soj5c1sico7f9iwdbxcnf9tw6hc17e6ut8wle5aw54ebbwbiu2txbmsir4b38cckfp11sdo4amxcro5zv4ql96mlkst018ggvtx',
                address: 'ebngj7kjus5x85g8dlbcprjq2hekqub7ltfua7r0b1nn4tucj1ty05682k966my4ij9nhy7esaz1ewuqamohr5yh63mihme4k5l04rehgtl4c5kmd4v3g0n7kwfgc6gjtzzegrbdtvmyis1v6nrkdpmo1skl04p9rq7ixgkkva8jmecuciycafzhogs4d8cpzkv3gj5pnnx7flo4ugmofqdt46c7obwp13aqimg31a725z72ef8d1nyo82lkzj6',
                latitude: 978.14,
                longitude: 300.73,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PartnerLongitude is too large, has a maximum length of 17');
            });
    });
    

    

    

    

    

    

    

    test(`/REST:POST origen/partner`, () => 
    {
        return request(app.getHttpServer())
            .post('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: 'sckf9sgy86fms1zwktwlw3q0hnuwr99fhtu0ea0wmek0d4qaiw4d7zn8n3ohpslvisjj2wep77ws2en7526ygoyevsgyw4d5pggxhaefhoq4zj5fzrk7dbvnm2fdvsumvu4734wmkeyap2dvszp5jz0vsvpeg0rmwde4qhwaaodq978de9ooyfumlgkjmlt0s6084l4yjw4lrg582vg0fyql3t9sk39wn1h4h514sf1ihggw6ogahmzz6h1k1a9',
                socialNetworks: { "foo" : "bar" },
                description: 'Optio sequi non velit voluptatem. Voluptatum neque distinctio minima explicabo et. Ea est nesciunt fuga perspiciatis nobis. Officia corporis est facilis unde quis totam. Aliquam ab asperiores dicta mollitia exercitationem.',
                excerpt: 'Ut nihil et qui ipsum eligendi iusto animi. Aut dolor qui aliquam dignissimos quo recusandae. Sed porro eligendi.',
                email: 'k4onq08e2viymowgn1yielqixkfy0y91v0m6inmz8psfvh95wo0abuyxfw5ryhrgza18ob89buel30ash8dzw4ho8sa778ofmeq1ifup3xqhana366mf2fu3',
                phone: 'b75986rqydb5x88sr331ba9m06qsj2wrwmdyh58jpk9svg7xoondpzch1ggrl9vmis23b4kcz6o42qhhdo929nfwd6cdbesjk327skx2nslohi98k5v0nka5',
                fax: '4e2wa9s650hxohmuxcj47mtcmi4lhexvmfjf2ji45pzpr6veqyp54w4bmf2qe58bj87meg2z3drrw9d6lp7641vcwuwwdt3pqtsqaeo4jutzw7dn8hhh1b75',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: 'xgp7v1egly',
                locality: 'ttg8ugut175pk93pbqhosesrgp5ikaiype8xl8sw0rojo6ymqso0jir4sdkuwvxb5rz738tkye4mwjkz98wmwg59r20lv4xlyfx6p7p42927lte1hx9ygwra6xowr',
                address: 'kp66zcnfxwcq48jrgda3fa533r8kgncqymistq0d1a146alirrno9k7s3oop1c6rntlr65epwim6gl1dkik5xxrz3tk58640vek76td9u7eq5uyjuvudhnn2prolauqcbmfv7zeyk08jqnj6terh3tpxqx3em9sdzpx2o0qgpn36g83vg1s2rvcjodmiyr2ekul00a1kyqqw8w6765ifan3pn5fxlq404towwszicubwinj6mfflg7yvx0g7uwx',
                latitude: 755.55,
                longitude: 816.17,
            })
            .expect(201);
    });

    test(`/REST:GET origen/partners/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partners/paginate')
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

    test(`/REST:GET origen/partner - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '35dfcf1b-7ff0-42f4-91de-b6bf23bc10b4'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET origen/partner`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'fe7b6199-9ef6-4e85-86c0-538917234f71'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'fe7b6199-9ef6-4e85-86c0-538917234f71'));
    });

    test(`/REST:GET origen/partner/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner/a6581cf9-e20b-4785-9193-f30dc04837f8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET origen/partner/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partner/fe7b6199-9ef6-4e85-86c0-538917234f71')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fe7b6199-9ef6-4e85-86c0-538917234f71'));
    });

    test(`/REST:GET origen/partners`, () => 
    {
        return request(app.getHttpServer())
            .get('/origen/partners')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT origen/partner - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                
                id: '77f8a623-d799-45f5-981f-1db71f8f3f34',
                name: 'mqyfszu53hstwpvh1911gjykjrudinda23lvma71f8xs488urk5mpbfpuo5o75xs908sj4tlnwmyw3o0n954d4okparndgdzhkgkmn5csyupi4ea7i2xr9w0oijjle3we2pbokozxuhhlcvxduq40ezrlr406koec93uba8l177fvqqd6lmcuprsui5u3aejbap0gwuqt9pphmso9pa08jelozcpu8vtoekj33e310rylh1gtdik2i5wc8624ht',
                socialNetworks: { "foo" : "bar" },
                description: 'Et dolorem est non reprehenderit similique autem dolor non. Eos eaque quis ut aspernatur. Ut quia numquam saepe vero ut ea voluptatem a. Odit asperiores autem neque soluta et. Modi rerum minima.',
                excerpt: 'Illum accusamus est doloremque rerum provident. Voluptatibus eveniet cupiditate ut iure. Qui cupiditate error a animi voluptates et est blanditiis consequatur. Non omnis unde aut veniam beatae fugit repellendus quasi. Laboriosam quia ut.',
                email: '4kgmwlbyy7qp56jnjk2ixynmid31a9icflpb9ue2lz6np6rxfz08qufjgotfp2wj41dy749l42f08cc15239o6jmydu4pxwqypg5ukce088vg8sdgkkk18gd',
                phone: 'j4s01ugc5ujuy3nr8h2j4ba8v1quzrec0m7o0qdr1s3z3a22oz5ha59fmsvd2iim91q3qqrwkmf7kybj3ex3mf8jomovcmgeoxvy44p4qyd8w9dhab68h10u',
                fax: 'sd6na5ehhv5pqefx98qdcn6wz7cjkc35pjerm852fzykpaq4iy9loa6vkos9wflz0m3smcma4z5dl825paqfd6age8k2wyfvhpuuquy38bvq81ncljuap5gs',
                countryCommonId: '8431232d-c905-4365-810b-cb5073f9c782',
                administrativeAreaLevel1Id: '59f2c65c-eb64-48aa-9f41-b9ebd85f9b06',
                administrativeAreaLevel2Id: 'ad3febf8-d228-4b5f-9157-230ffe6ff07a',
                administrativeAreaLevel3Id: 'dafe8916-56ef-4659-a9b7-490cad367dc9',
                zip: 'med41a1bh3',
                locality: '49x7x4i6o64n3zdw9pf3sn4kx4ufzlmirwpoymom1crhj9exudv4d58ebhtpvd11xckyeq5wukfuhljv0rwl29flxsruwy6cgnn3h3wfvzg3sn00t1n0zadv0a4t3',
                address: 'wnbfjo6v9hvft7ebud9quzjt3kyffxrzee5eslby0z2v1rvd8j6ezjzguzjhcrg86rbda7ob4nead7fkmnu5o9qr06ks9r6wg2i5deyu6ha4588j1g3cg8vjufu9ew8rxsry4chuozf5g4vezhmxgg24hmhd13m20b3hff3alzyv8l0yp3l99awmwcd692qseilmib1wizdhdf9c73dapn8g2pklik22jdsxfab2k7e8ttl50x0mt24sp9om3ju',
                latitude: 846.60,
                longitude: 849.96,
            })
            .expect(404);
    });

    test(`/REST:PUT origen/partner`, () => 
    {
        return request(app.getHttpServer())
            .put('/origen/partner')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                name: 'zxns0uchus189x9bd6y23osmx1zlqi2imv2heus19rw905rquvoo0dr4u8b48ygxzu9a7lofzjtd71ee0n8jq711au3kaey3lqtcl175mu617a52vlcoi68vkkmvzy722jd74mvpjf4335u2krsnnx4oi24228rqta2lu28crtaq11dnry1hgo0n3gu47pqwnapxdxerxi1r8rm1jtd3qqbnoa2q9v3btadm7ug1ucurp116njm9sta7ce5m08l',
                socialNetworks: { "foo" : "bar" },
                description: 'Dolore repellendus sunt sed corrupti. Voluptate consequatur ad debitis harum itaque nemo. Ipsa sit ut quis fugit praesentium et dicta magni aut.',
                excerpt: 'Facere impedit sed sed deleniti ipsa ullam inventore sapiente. Eius iste deleniti libero illo vero ad eligendi qui. Nam velit quam neque.',
                email: 'vvah56ggs3shjxk3v6xapw8c1ucdanum6oz1638n515kuqn0xe4t6e6qm61h9xt32gbsclym76zsd3fzr29htf4o7lw7yszaizncyjjxfu5w1rep6zw1lbtb',
                phone: 'o8gt41bar06vhzshn61xu1b81kmi3o4zui9p3ay3vls9wwfkayfb0x1s727byqrond705yej7ehaf7rkm5wxfeh6dbe93l0sm5mm4otsu0q6jyw3vdmlk6y0',
                fax: 'lhl9uo7ndou9hbte590ksidvjkfr9lwweexuljyqcbxk9z4587kuh3hb21h6wkyn15qxsw5vk63nm2i1i1ig28gydya74c905a5p526b4tninffb66y27708',
                countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                zip: 'h53x8wa324',
                locality: '12y4szlyqlpdcdr4p6yd6gyhhw3mp79rncfcceg3qq7t8o6clb9bgzvy06q7ol1dsgm53k0znbx5dxvjfd32xgjxjlxx9quxxc9ixz8zuasq9isu5ds4541j3fcxt',
                address: 'esn9t0qw0r9pcwouqwtz7i6s4hmm4ouu585sz02qw0wbug0y4c6wjiow49ieipd8c6mv66ba161gsgbwqa5mxjy86dam3gl1mdyrrg208ti5egy7rghzdob9k5qsyukwqa1q5vn8qhzkwh8fawowdcwzph93ie1f9g3htwin5aidtnfzh33w26gwr6nl9x95jhtyk1h99tf4a5qbdfgo173d626uclnhzsublm2lpie2b97u5wilb3btw20h9np',
                latitude: 578.99,
                longitude: 412.32,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'fe7b6199-9ef6-4e85-86c0-538917234f71'));
    });

    test(`/REST:DELETE origen/partner/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/origen/partner/5b246b9e-c3e6-43b0-a629-7ab80cde05f3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE origen/partner/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/origen/partner/fe7b6199-9ef6-4e85-86c0-538917234f71')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL origenCreatePartner - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OrigenCreatePartnerInput!)
                    {
                        origenCreatePartner (payload:$payload)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
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

    test(`/GraphQL origenCreatePartner`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OrigenCreatePartnerInput!)
                    {
                        origenCreatePartner (payload:$payload)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '1d4e9686-4e5f-41b9-adb4-78098d7deacf',
                        name: 'eutwhdgomtqn50vvprazd9tn25g91nkb2nzf69obp36qot7f6rlrirkn8dti59utkx8b8orlocp0eqd0g283vz6vtuwhqy85g4vijfvmnlirhkaf4hklrlgecp7k4xfn6447fabu1z3ssqqzhol3qiniy9kbxxgec57py7fhxwtzv0i3czj4qiwe79ppms3oi0el152p6wiyjg7akrhrgyhnhwnpcrx4nq441n65rfcdi6q5xzvo30cz1vamzrc',
                        socialNetworks: { "foo" : "bar" },
                        description: 'Nihil qui quo eum laborum voluptatem. Quis ratione illo minima quis iste omnis doloribus. Fugit incidunt totam eveniet tempore id ipsa sunt quasi quo. Laboriosam quo sint eos in eveniet. Eos quis corrupti at atque eum.',
                        excerpt: 'Quam aliquam sed. Suscipit eveniet dolor dignissimos nobis quia. Voluptas minima sed excepturi minima autem.',
                        email: 'xvz2vgzcuqv7hw07o4m0p6jns8nisenwduw4lg0b7sos27ph8n89yyh8lanoytzbxdhn7in0uu1bdvmmgrfm9at6smw0n2rf14dw77dq0rh3mhaigs5wozue',
                        phone: 'nw6ej9fgeqfnjb17buw7ereygqmva5yqoteo2nkyxc63jn4gretc1dadbc93h6e1brl4uoqh9lblf0ix19ccymizti868u1lij64cdi9o623hksce1rd4tka',
                        fax: 'us5z44vo753hvng7a49wfvvnp2zuyq5kr3aj4xfcsm98dij1sxjxzz9uaskfe6tjz2wukd8aij46mulelbyzr04kncoizo0vwab5utb2ipw9evz711chjmm8',
                        countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                        administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                        administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                        administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                        zip: 'r5nxh017bu',
                        locality: 'n6esq2scewpw1l0xdgh2kpzu1r1mjynmwnx6mws5629xkjbvs0cycyxusuf3ur3limn3tfkys7yzl5b4p2jsovxwd2vu3dei70uku0n1b68zl16rimsyiikqcvtwa',
                        address: '9i03heuixn209y5610iyyj23cmfqoja3ryxsjuxy593z053jr71blbmz6l9vnmhlwxnz82hcs5fbebzthc8igli2kv05rs11lt5axlb0t0d5967lalt9hjxwc5t06ex44hgyr76xve3cyg5jl3id037hamy15srm25zbxu4knymnffzrnldijibq9m2i1zeqwxgzmww34xslu8x4jx2dovjnm0rrdxr87715bcfvk4hi4v6xc1ssscnznvrr31o',
                        latitude: 682.92,
                        longitude: 995.78,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenCreatePartner).toHaveProperty('id', '1d4e9686-4e5f-41b9-adb4-78098d7deacf');
            });
    });

    test(`/GraphQL origenPaginatePartners`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        origenPaginatePartners (query:$query constraint:$constraint)
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
                expect(res.body.data.origenPaginatePartners.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.origenPaginatePartners.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.origenPaginatePartners.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL origenFindPartner - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        origenFindPartner (query:$query)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
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
                            id: '71abc578-1adb-44ab-816b-dd3c8ea1cd4b'
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

    test(`/GraphQL origenFindPartner`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        origenFindPartner (query:$query)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
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
                            id: 'fe7b6199-9ef6-4e85-86c0-538917234f71'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenFindPartner.id).toStrictEqual('fe7b6199-9ef6-4e85-86c0-538917234f71');
            });
    });

    test(`/GraphQL origenFindPartnerById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        origenFindPartnerById (id:$id)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e911e7d2-de5f-4825-a3cc-88b27bdc3d4b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL origenFindPartnerById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        origenFindPartnerById (id:$id)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'fe7b6199-9ef6-4e85-86c0-538917234f71'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenFindPartnerById.id).toStrictEqual('fe7b6199-9ef6-4e85-86c0-538917234f71');
            });
    });

    test(`/GraphQL origenGetPartners`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        origenGetPartners (query:$query)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.origenGetPartners.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL origenUpdatePartner - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OrigenUpdatePartnerInput!)
                    {
                        origenUpdatePartner (payload:$payload)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '760fd004-7a04-4152-9d03-bc5957f0e7e3',
                        name: '3peccxb0tbtmii2l6497tv927lxtxeazm6i2d653mo1j7zbxrce0b5u99xk59ctquunwqz3bi3g9eggf8fbvtadr5eea04r2lm2baevxv4r4dxnfrvf76t8gmjgwyqodtj42e5x5tfesvu3iuc8djv0pj8bq9yfdvqnkooxps39zk5vueka66y7nkxxfe4fjuvcxlsbm5rxowkwnbywfjkp95qm7yqhhxxnltuocic78ui8dwa7tct3umantk1o',
                        socialNetworks: { "foo" : "bar" },
                        description: 'Est ut dolorem dolor. Veritatis laudantium minima doloremque. Id itaque ab voluptatem expedita. Mollitia quos fugiat eaque non architecto eligendi. Quos iure sed illum eius. Distinctio id atque labore aut a totam quisquam qui.',
                        excerpt: 'Perspiciatis in eaque voluptatem et quisquam odio. Sint exercitationem exercitationem. Ut aliquid rerum numquam quis dolorem dolor officia. Eveniet eius sunt pariatur rerum atque modi vel.',
                        email: '53vsw3a3xa0jo21fiuhxydie9tst5oa256ja0p506j5401q1od94z94zwohlzb50n96o3nu96p4ij9aasglkpfqj5ifbea3zqmvajr86nn3c5j47e7p56wqq',
                        phone: 'irnaazoxqy9fg2xkxsf47rianow7mqmbqgp0zf8lnaq6pxq7q0pb7asml762mkppcax24e1o65sp1y7gwn1mbn1oeqomkdxpyhif2sgscbe9n35xbjf1r64j',
                        fax: '92vb129djbh61z8nbrw3cqhdnsaq3ys7tbl53yj1bm13wx4ne4l511xhim28spoa0e2025g72q0bli7nn4p5x0rfxs8c6uhuzznul505jnm50znw22e1bgy2',
                        countryCommonId: '014fef16-7cf2-4992-9ae1-17ab0b0a86cd',
                        administrativeAreaLevel1Id: '8087cd86-e665-4e33-92f8-b68018bcfef9',
                        administrativeAreaLevel2Id: 'b4e5fd16-f481-4c17-a314-d815b96981a8',
                        administrativeAreaLevel3Id: 'a29291bd-38c2-4f66-ba24-a3376f718d91',
                        zip: 'c7n5woacmr',
                        locality: '3p3o1nxnxol2nw6qn9pkwn14y68pnf5ljejz3maucp3opww91e6grxhdz23u36eb83nzlbseqqx6d5nf7ohriccmqe2jh52mqdyrjot5x835efcj3v9vuwumkkuv2',
                        address: 'vvonksw9y5ih62t3wyimxe5dtvlk6ch56rt1la9xjowv7yz3zpwyzhl1lsv1zy36oz86na0hy7nmdxbjqz2a5mdd96v2l80ctnl3hh1p72mdqz3q306w7xjubz9d9xd1tm0myaika841un8kfbm5ugo1u57cka052bigw404r6jfl5hijmlxt5ca7b89cmbaoxt0becxuatpkwn3wvd43v3u8vrius7w3bkc8vkri444jb5gokr0gtiy9304nun',
                        latitude: 926.55,
                        longitude: 892.53,
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

    test(`/GraphQL origenUpdatePartner`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OrigenUpdatePartnerInput!)
                    {
                        origenUpdatePartner (payload:$payload)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'fe7b6199-9ef6-4e85-86c0-538917234f71',
                        name: 'bwzzwqvou9r2e9odyeh28jvhxum5gdr6o6peotu03w5kww2mgidcdlipp1r68p9xv4weq13xt4az7ci850toh4odajaoy7ipt1zs7ejrj528qi0fp9q9hjvnlpzu7h8gfgoh9bziofhtw2hl5f38j9cfnmc6r9607orcszonc3ig2xuped0vwz4o3xoesum23pn9zb3f1rgehqgxj80rk33e5pf85z7f8wohjwsjhxy0zcyfnwanwiyrkqenis1',
                        socialNetworks: { "foo" : "bar" },
                        description: 'Molestias non sit. Nihil velit rerum officiis reiciendis esse. Dolorem ad in nulla et beatae eaque non. Velit ut qui voluptatem quia.',
                        excerpt: 'Eligendi beatae in. Aliquid eos est. Omnis mollitia et adipisci iste facilis mollitia. Quasi facilis quo ratione ut voluptate.',
                        email: '7l16lo0ekofrrjm7bye4vjcidq1pclhsryi2biflw6hopwoe1jm6ho2zsoigruabxmlotbuf8z5mhlt8nsqedrzrcw3yn4wj3i7e4o5wrzjp11g8qlhnncbw',
                        phone: 'tc2xp8gzm0cbea8t1ugz9pxc0mhqcg5hpwdotvjt3n7f2zos1eonpd1s1zy0g7j27wquxtkdleqebeu6i0y62okdefpn93sujzl3ra0lni8cc493tuppgj6f',
                        fax: 'q4vu8l9nomswdzeeetpvtnizvhbj34uws7xd1t0vpe0rixqg3hcr2a80msue7thi58lnatxjb7te46437b3lozapevdcupldxbo0kv0ynkrfoua8e1n1vdfv',
                        countryCommonId: '47234be4-ce32-45ce-9d12-d05509c2c7a1',
                        administrativeAreaLevel1Id: '40cc5001-185a-4057-b71c-cec42cde97b3',
                        administrativeAreaLevel2Id: 'b9719ba8-ee1c-4f0c-9617-4c62d8d8aa0d',
                        administrativeAreaLevel3Id: '4455eff8-2510-4b35-a5d9-ffafac680033',
                        zip: 'czepfl18d3',
                        locality: 'j080kmnlw4hgjk68xw7t2adqw1uf2drzzeph4kp0xy7laspvkz1qn5e9sxo01f351k6u1chqub5svv1s6ff1maq073s5phq08pxxzf0e4nnhe3zb7z46jhpjotyk6',
                        address: '4i8ihz44bkxpbmzazb3fisolxxld24egxdkj9ccjary10xznnfyxykxwltohn6dk95dlqynrzvivt9l8j5qwibmwxgva8rfbl9tni1n3ulc1hyoem133vbu12frg06bnru280sjxyw0u82a2if2xrk3richke2rz60p3k9rjp9gg1ssz6o10vfg9x24s9agi7a4mncnwwpe1f0rozu3dyc1qza2l5fwyim0qu2pydb4bif7ydni9n1zs77i68hk',
                        latitude: 622.90,
                        longitude: 596.14,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenUpdatePartner.id).toStrictEqual('fe7b6199-9ef6-4e85-86c0-538917234f71');
            });
    });

    test(`/GraphQL origenDeletePartnerById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        origenDeletePartnerById (id:$id)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '041e6904-110b-4c12-a008-83aa880a4d84'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL origenDeletePartnerById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        origenDeletePartnerById (id:$id)
                        {   
                            id
                            name
                            socialNetworks
                            description
                            excerpt
                            email
                            phone
                            fax
                            zip
                            locality
                            address
                            latitude
                            longitude
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'fe7b6199-9ef6-4e85-86c0-538917234f71'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.origenDeletePartnerById.id).toStrictEqual('fe7b6199-9ef6-4e85-86c0-538917234f71');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});