import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { MockAttachmentRepository } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('attachment', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentRepository;

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
            .overrideProvider(IAttachmentRepository)
            .useClass(MockAttachmentRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentRepository>module.get<IAttachmentRepository>(IAttachmentRepository);

        await app.init();
    });

    test(`/REST:POST admin/attachment - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: null,
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'k4x1c5d8c0npevb9nsm6zyuj3rr5xbgg3m75b88p4fqbhpkla1h4akozrpvnd6j7c4uhkw873ho',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 893805,
                alt: '6127123rifz31gbatd75tt9rbwt37kmgjnvzf4aps34dzkzs2jvfw6u7w7zxye4xvaun9536247recjcfdivmvkpwevoznhuc15jk2ob1uoclfxakab1ntp8cmcju751nlf48ymyxyb6eurl0szuq14dion5i4u93h4bcbasr84l6q347rmhpsb3jaziu8k6k77igmrngqtlzgbmpfglm12j7j7g9psmhp12i0c2rzslpxfly2vxby3qpvdbxbq',
                title: 'orcuhjph7th7agaakcuhi28lxt871l5httf7qg55cocplduoe2jmoi40v717liq2pw0q88lchqredvs8oe6a59fqj5j45bjogr9syvqg4mw639l29kvqefgcymjknnz1x1j27vp28uncz5v937qn7j9701ql15qjj3gj2xla9kb52xkojitkust285q39rl9aw3offxmzo6tlpu7dz6z8h1wziw5ttwzaw4lne0h6qmvt9drd93t6q3x03g4fge',
                description: 'Eveniet repudiandae sit. Et enim ut eos voluptatem possimus exercitationem nulla. Quisquam corporis sint unde in voluptatibus dolorem. Eveniet nostrum et ea. Et ut dignissimos et consequatur officia unde aut neque maxime.',
                excerpt: 'Harum eaque qui libero ut beatae ea. Odit sit voluptatem sit. Nulla at iusto. Est illum nihil qui voluptas voluptatem. Nulla molestias quo recusandae omnis ipsam nesciunt quos.',
                name: 'frngjldyo6ocspwoqul1o745o6l5gzqbz8k2apxamx1zcpejc5gm5xhasiytp4ldbvk1li7tc743ykga519h6s59yphxxaw27g2vzg5boa4csgt9wvuzwji8ykc2rpsx4s4cfw7fhqblf5tk8izu7ck3ri0mvqfgbtv8vsp9eakqloub6qbwxxva62tp07veob70g6q46jdshgeweb5iasonbpfmn2titel0x8rkacdv5vmlh81es62ywokmayj',
                pathname: 'xg1agpz0g5khcctiu13m5twcy8b8rm65wq38c7fbnbmsb6jtp8fj5y5jlfuwijq5jz3vr6ciad0oo4jza9iq72fle6cxtoxd6hc80zhvhlvr296zqxzf58m522r0almpvf5v9b4i8bvlw1vpd0wn38by7whx81vm2an32b4q70fi4u5ye87pdhybf0jxyflg64aeos0905ie8hcz68qb709vkbjtwjo3z2pij8j0r9ldlpeyhrvqlospzoo49947hxtm2imx0rrbe92ufms762jmh7kcy2yb6sfhgod3po814w971pla6pcnkjwrpm6l5lb82cihqz8b5399pbx3kuthgmnifazedrh06paczjf1styn6r5oarw28iykigmud3xm7t23ki4wk4sbpuz351cvoq3clelrl5igawgrrtoolpufug8fyrxgrq7tlnlx5fmtxa9n7msj1hkkz4se7wwve0bhjjbxlse1vmt6hp3xr703fw2kygl02qc84gjdvigaa7mnq2sk2d5j3bg08zuya9gnx1f95zzh1d3euu9yvnne94g55f9qh3172oa97e56p68rz1o17dscszqmurmogcp0ytsk98kifmexbwn08ttq6vhze337svl58jwszq9r6c46swf0gfguz8uskrnmuueoboidh3vs6ph123gz2x1fvz8prl5zs6on1kepxm6lb2vlk4d161pfolhzh2qg0mdykbiel6qqe06bv1ke4a2mioncrsj2zwxwgor3u0qghzb437hagabtfandt924u1oneaguj98a4igs08q8434apod7n1jj16vl2bs0sct42699w0x4d3wiiyqgtvuy6p8xdor202i2tf36v24cxxhpqad1kxatsmb0klsvft8zioxf8b4kx29xotpdixpoa1a83witajljs79cfb5w0zu42qy48oo2ou3r42xkw3ryggcs9lskfag3511lg6bjqvlohwul4zbx47bz3t6xn9gj5jupjuk0vh2w2fb9',
                filename: 'i43e1rvdpff7ertnprkx7xg55lgqw2ei1aouzbduneuztr0b0xp7g85ui9wp6c8bc139uiereowquk9o84aoytv1txdmhxhmkrs681y8jtbrogrrnkw4uj8cazhwnrthv1fdk38zi9pvuex002fb2qsiiqggchllcwujuqbd7s3wjyyzkn8xfas2bf74hp0gwxym60lidemp4j0kb6wvta4r1anhez6gelrxjt1i0dkcr3a9ks5jeum2dwdhz00',
                url: 'wjly0mzz5fw9bxy0x4gc03vflervf818ov8dp12nx33jzhqbucdfh1wfsys11w4da7x2pjhwqp6ikw2dx6lo66gua6eg5x42ddm4dqe1goc80e00y0x1ox6awwjzxyqzsi0lgpmh897pggktfcjydq676v64vgnozocugg5hrbf9n3w6sb5wqlav9wjd32176kd30lcyez8sza5xaqbgrv57sij3yz77s4rs9lpyuejbycef5jek1yf2ews7h2widt9lfstqxi7etw0zmea00ra3fbbzlq04yrwgonhuiwlu922u15b0vmzkpxq84w5o4ud36s1k5m0oamufmzzyk63d8kyg5mo0o6g1anvaw3d2d9cf51zy9m584xyef2pf9jxxl0xdacu8tlar7gmdsz9hyny11oedjonjsdbv6hpnndizgg6vhwfyvuttfo0vf52c5cw6n4ocdpweudhytg1z7t47nsz7ofonbmptmo2iky15io7m49bc23vf5512fx6apulzjo4k3bc8dqs1eul522brx3gng180uchp2mbfegnb3pmzaqh3j8dzla46y54h8w34hoxghmeuqh2mfb8k6gcqoj4fndowx0gegtw0mjwngelf5tvficbmrqm7jauw5r1b6dftwf4anmklvrsjlwzqh0n6h94c4is97s2xgigvs4w5v2hm61f3sos1irb3mhzvfjktiphkfbxhcs9e4y43mfvsb411xkyj1c4f1xkmgiw1fjbnqaizhrxq0u419t759jffhhh4st1l2pik89k06uyg4sic744d6e1e2tx26ecq4mhhfyuvbuqn1guvd0uvhgzy8i9kye0w46b7qsfxfkmyq8kh0hrprxl8lnk0j4usy9h537irlswd1ciejxjsquj9fgswaykj08yexvnxq3a4xs8kyd32dusnvwwbw0o4ic1jpi4gj1okc3mhjr6vjk27qwpy1lu63nigxljwzxkuwn95pauxvjm7wndvgsg4fumgn8ml4jy9',
                mime: 'twnuxba2pcb4ke3j5wj436ifyy85k930m9wva71rbznqsfivf3',
                extension: 'trahg54ifjnsj5wi0re8334tjt7l2mvleirxtvu5avjbvqky84',
                size: 3970296475,
                width: 702394,
                height: 561832,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'v1gbvvw9chygrsnf9lr51k4zzocjtapqswynkftgdzxni9o8daxz7h6up0jj8zzjsagc5mme2a5efrr8is61mr6qomk7vgbnne2o3coolk0sv08p34rmt2hxn40puenfd884atpbdz3agw7qm3axejcjhkf87u6zx52hhhlu50gd2n8j67yocfb9n2kcmpmez9o9rncr5aiyb1f9e2qi4st6qetteo5fpqyjztb9zhldcxyvhqeaqobo22mtir1',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'iud1z8ayd1fai343q8rvvofe9huyb6hee58u6h2c6tqilsw15zwl8whvk9q2o2zhnw3927pqghs',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 853790,
                alt: 'qrao9496k2w0l9p9sfa3h9wftm0ssppvw6opodkzzz3g30d2gwribc9r90pradarmer4imywnc6cqwpqk4l5cj6l1xj0plg99yhgzeie3t50gi6wsk83eqm2wk3n41kvf7tk4vjxcnocgjwtf3hjt8gylvf64d435r0i5ezzbuwawsdpck88xicsk21o67kpjxtzgojfgkgu0rbk1vd6j7vp59hk79c7wctoc30a1dgtknrc39wwubge0sj8jqt',
                title: 'r2sx3glo7r9w5ls8zn6q3ilwyq80g7ifptbx1lri7j0l6ehrv966k31l4ngyh4ev3o4w5he6mt31m5ci5ayvna32nndeswtoybcrmug9kmk2o73aqf1av10xxsww8o9yck4qq4eotq0s7zoarrtztpo334zdmyoc4hf8ivz6cj9i6b2jinxxn0mrhr7q14cak54mry5dp5norx5vserpayi2sy89gahtu6umo3ycsj8fmv1hevnv6benjei9nda',
                description: 'Magnam vel velit et nostrum quo. Quibusdam et delectus itaque nisi et officiis. Laboriosam non rerum provident aut voluptatum debitis nam.',
                excerpt: 'Enim facilis est nobis ex sint magnam nostrum ut. Cum repudiandae aperiam debitis est. Adipisci est ipsa eaque. Magni mollitia repellendus adipisci tempore. Temporibus aut fugiat veniam.',
                name: 'e1lxx8t7g763es9w30y136aygdqauoejkbrksarzzm3bhc4u4p3uh1n2o0ofceo3crx7egxqw2fun7padh4n1s4lgscik2chbhgcc3gs2z33jglfknu5hmyfeidgldzvh82byt63sxlfx9xu85a889t0j47dc3ydzh07ffgvnp8x8sriwyg75cy82qao340xf8a84qq64ia7rhsre8l6lb6bopmx5jzao98hbgczu4au66g8eqxj5s3mn5krj53',
                pathname: 'amlmijsbh0mn6x5cs9mm9swbymmrtp6n9fqxbyvk1i2pzsw5dd6zs9t5lsggvs4s0oydhxtrelkrzzx6xcg207kg92eiu9mwghex56vb8uqqzqtktm6pzgd1yeybc5iyacttnxqkv5xuo8udeaacgav5v3ezw36ixe8urb174ng17w4ukkzkdid7bcuibcu1rm85ei4g2t75ezyndssxnxyy30lz9urtnkpebuupcjlnvk9bi6j7gi02aqd74ciqx11s0mot9i6e4l48rxqz134purx2p3nmv3ubo0slwj5eah56i8r90txq2tcogyiu035rb0t7uoti02ynawcmrvcb6fsliqnr98q3912j68lgd99s5mh0gio1gwpnsfnr9rfsqrut4mjs404vkhfoj7iifqjb524nneock9ncyuhsusro3pqgf9pga7et3s8jlcftkdqsvizy2wqu989m4f0ubfurgc497wi8d8ziip717laa924qvuullvompjj5nyrjhluv3u593usvspbkyu2l4vsk86ugkj8n8in4zqnkzdg1b23ms7onpvwdvi8gktr10z2esm6n57oov0uaq73fyfi1atob1eouap2qztkhgn4qe79i9vd99uzf43zi14jzipnntqzu76wup8zq2m0ndnb1dmpcg56zs6zauy4mey9041o92s44k4klqrlztzvytu3k74h8kskfvc4iflnftbuwo4gxcc7d22mpcte46dleqzrgzogwzqj110ox0eqbx3505jlyprgjoo2tzdld159t7f9u0pbx0ptng39bl7qngmozxkaebddkd2w3z9nz529uvw0v2c1yre062y4biy0x288e7d5is5wz8am8rjy15kpzaytb792l5tz3v628l5n2p9bi29pi4yctps88qnzchk0aylbe1zftpgr10ii1x9hqo5hd2dcyu9b7jj71joatm1i07zqu13ea5blmfltoamfb6chlqngl033dkgu05529sqk9t55cvvb3',
                filename: 'lrsggv85ztkn8u8335let3q5qyk3ofnpy17yxfjo2otyp49170wymuvfrjymnrkm8xyjp95i8vrj040ylba44f369em5k4qnas4bj6piz7wiq3jlsm1ryko6zgsqfrnl7ux3hfmmf3j17k6folkhjjy3ajroengnnspye4mzith3eiur7f7qothsotf3ug6r42sjce1gjuuv7bi9j14fnifltob0vmhy5g379q0d3i01vze3nppxgb7176xz29x',
                url: 'nc8bhv37ifznyuekkqhudrju07upw3bjchexaqiqvzaexcsn4mhbcfwuetbq7bp6t1bt0grzvvzqbp81608ocm3g6qxaglkzctxtjxxfh4kf7b00io3ixalngzf9jn34lqxx78zaswd4m01zv68a3y6a6lz5psje4qvdttxl1l3c7zdhb1922oo3txz7frsi935oimrq618t610r6zybjwb2jt42jl63a57rb3y1h3fr40u127tif7qjiznacbokz3dwfiv0hadptvo6p8di9hzp2g30wmory7ypidjgk3uoejs47m4yjccjabyxwbd8affzzi4gwb8p9h3nvu44x13j7v86ji7arbvbxhv0m4xez9w14pedjuz8h4xiwxd71sr1ua4pvmyuyrv4j96v8yfefj96vyil13h1bb9lvdtbhl3gnygihmh8eage7pijzsej01htbnzouxrlva4hfqwi52bltt98hzztf7ly8siwprgtsrqkprs1qb6fuqudbvqmj3wwmpa72v7bmioub7zct44qi08topxhs3uzickg688uuwk8i6phkag3lcd5rfaq9f587j9vku98crzkptw5eduqtqx69f719udf75s27bib5gq0xtwrq2ljn6jxcvr3b602yjcqy9l5hjioxaynqav7hnc378jzlpw08z7rtghh5bwcaud6y9j2y70g5nma5rabmjregfp1enbil9lrqx2r8nv4kaihtqd7vp6bwt66b4616wurwrlr8fqop97ccw35x3oeih9ebmihvy8ki6j7kys3now35v2xixgrsxrebs6f0u39vmybu6j9vka2be3x55tj596npglxdowqqwmp8jt7a29o5h6d4q9jw0u6qxu38tcslq482dzi9iaemzuf25boir0u32m6hmn01deh6vyv0b1w9f3dycn2o21gr8hgfv2t235zamyq7i6l4fezo8djpumbtjhdlo21iix2ms4kibjchbuot7tnyogayjpi94n25il1qn15',
                mime: 'ioe9kcbqb0zgnwd0yk7w24ndz3y0lr1p4r8x2rx36nmrtqjkbn',
                extension: 'koq2x44ufs5fnw3oin8d0nx9m1mtjsqlmwe77afkislkt4rgqm',
                size: 8265695032,
                width: 475995,
                height: 273774,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: '14fl0t3uf1t1etaaopkjcda4nyxv6w93rvceuo7yvciun0ky3ysler5gypfid56tmy1sal2e1too82r8rgvxvtzjjvxtoxkczxrm02uz9np6zjogegff94a0eeixs80lo72y9bvj2oz25iwrffyd1yr75o7x9f6cjdtv03708aurf89srittvkmr3ygopl2lr5pd0ycst0t6l9gov7604gmq3a0ow14ny1wutqilnp2fgmcch95cjuyv46xxw1v',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: null,
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'og66jkigpsyni9repr3zw04ikabtnvxg89u1osdonjahdwj5zpvawoq9zcrbilmjxybzg18hew1',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 728513,
                alt: 'xx8ik7dh5f6bhkkhmr2168kg4ydu2c2f0q2cndbqm6rfbmes7u42eju3w2d2tpfgo2yvz5ny77l67u0jd4k0foe5iwmq55f5vemquwdwj5zo56geo5lh3r8w784vsdboxey34pfxg48t7oyyhjb3v107vwxqvfqe3895xlnxdn1ik06ez7fjfjd2rzf1dvi4ebmysk2vv5mip7qvjxzf03u12hhhreb4jr4qiwzuas58f2sijnva0pmhton8b08',
                title: '617vcuzsz9j8s7co4gcfx9jt2yhk8trxaunvbjwxmwgtjblbrqguemg8qwv1rqdyp15t6xd3spjaqi7ju14cyfdcbozazbe42xaruwmauwg4s6rkvedx4qkhgeitfb1pltuufpff9l5rrn6ysgvo1wx1e26g8y8btx43brcx30ve5mat141otjo3wzvydhvnewplb5qp1pkrctz95mznhzws6qyo6ek7stry844wud6gyrm76ey0wn28cji1cz2',
                description: 'Illum quo consectetur nisi. Magnam alias voluptatem architecto numquam autem. Qui autem hic aut sit aut sed repellendus esse.',
                excerpt: 'Expedita maxime id occaecati sequi et. Ipsa nulla quibusdam nesciunt necessitatibus sed corporis quaerat ratione ut. Eum necessitatibus nam rerum officia enim asperiores aut consequuntur iure. Voluptatem non sed. Vero ut rerum at eveniet id illo. Eos accusamus consequuntur rerum sit dicta exercitationem.',
                name: 'f2ie6n2xq97inorxjhgfa5039ctndl6i7o8rlbrehlma0iphhx36kto9rvrv535hx4wmfvr5z7g3hm729kpmvrh8r9cb332r4rygxinurdygg518iegh7amd0li8e8gfag9lk4if3jayuheth4322orkfn7m4bj7ewupl7ne7wasts33cfp1w9227ru31nitcxykhpqqmzcs4mip2zi7zoflonuqsxm34dt9koi9txazqrqux6a1uupjn3o9djy',
                pathname: 'cjrdb9t3m4obja17guv0l5qwaaqgmrs98ycedjrs1ayt40mjg6q3jbifvvoownmw4hbff37rk0nqu0ljoeoklvol2ii2imu6dxvh2ic0jkn8g6xhe07665f6thnfe02vsxsizwim6a3pxawdg0uom4wh58o2fnyitbcwlhbyduqirrnek85a2jhd193dtxyjeyvj6cxaru1k277rxbf494x8xh90p9u1deahiherxfnuuidm20qyac9kcnm5cgfg504mgz5x4vw1l5ng0k0he52b38ekmglmb3l2233yb7iwfez9jaj86mmugb73m1o5xcy5ui0f74xitgwdlgi5a7eog2xqsz1bzz86hp9518772h2pl37a0mgnt6gtmnwwf9eydke76q7fri43l6cshg5ykltlvfsprgj11tozsixgrj825vzquboiitkwg9g0a7aae7ys565hfg8yxogk17y7e7zat4npmiwh1ndxrio7vprctx9gkj3xhqjdwo19zi5shtpj4ibvtitnsyw2ul6ezmkbenmanf4xb46xbbhuhokwcz99pqfppdxb8sacymiupjxwj7ln3lx4tu57aqnjhgajym2e091njs46qw8p1irl9y3099d1bllj3fhzkqpvkrzi7iwjgzon5zvnguiodcngjyyfkd4nsvm3z34e5s10tv9tuaw3xiyhlk6e058l7a2orvthdnp959p3mv9bluc856ec4c0zvv5cvnbndirxt6ual6mun5qy9ycfd4d8eupdi5be600fx0ws65kz3yfa6rsfc01qkre24vajyskei9o84uoivmcudt81ytizovi64t0bv7owi7fklzv2gj1pzzlbzhdwhagqu8ql8rxe8iilfl8slvgzk45c0clc0o4jtxyanneo9p1aj2wienrnlv57pfcg0hatmbcn3io84cq0qkg6ln2mnw4376j2954nr68jl0hajwemns7g3gd83cfdvcry8mv77aszkmevt70phwug58cqiot5',
                filename: 'w692wzex1g4jl0vbspp5juwqvzoohzhjiibsit9v64d8amhq9cuxf3ysldyizznlq0u3bfr5lme3dr9fvhi3wpgzb6vqqvp94lq7qwrxdmns0hv5eh88y16spkugmmqmdq3erv8tzg11hlj3z1f766ozicw77akzrgoduhpbx0wegiv2ggsfhmbtb9ybnj5k1sogxmz7dr7z4pq5k6ua6ab7t3p1u6waio7tba0wx1xad42gop0kef89n7edhc4',
                url: '8e3di1bgnxbj6ipyqu0r6ak65uauzdkdrsvwm22gszm7cn9d2qd15d396lum33kha6yb0r76dwijfmy90o9x5a97czy4p470qqr2zirfohek6t85lzpgusqw30lpee4ur7iyj576skkbcqqac1nsfo6jcvafdawwi4tzxwbd7lrt7gmqa2mlsl3al9939i71syuv0e2znszp2gswjxzmpzi33b3wuacwt2rw93jah8zx08zalqxry60lvcp8unaqywsmr8dam1tkba3it12hofm0ueofrlafionohkmghskvbcsxq7rw7qsw37gyxjsasy96x7zcubjqhrckpnhdi49rfbnvox7n4qur8xgus9dncj06a0tdxxunj2ebr21zrelr0itbt6lw7s4xbg89raxyvbxx52lnhlf06iopsqg2fmcqsb24xr3jakih8cm4w8n6a0i3flg4a7rrjrenw6sxt2l42sxt7d8l3h4fu8j673lbk27v2f4ba6f5hmgma3wcb24452qaz4sdlkqppg0gh0dftteo4fad0c07gw9wentbqu5u911m05vgsy5wj0cgv2gvxbovd4vkqe2tujhyfx7pdj3jpl4r9ou0qjrdzr5sqrfxufyycuwokx6z2vu5h9wvdqn6syjsjyrajf3e6qr0hlsyzp62qh6hdkqf9bxcnrgjojt6uptjtn0d8fsok5ihojazhnrasm52eeg396wc6ffd8kji20m901gypudgwvuztdg849foqzcs3g1luspmvsvw6p1sax7iazs3khw6h2enyzvkr9d55nufj5pcjlo52z5dlxo7szu6js95oz78vrwiyi6mynqpcictuk9yfar9c3i53ygxhdhiohuj3tdhq4xykbptc5rej7biy7hchl0dwby5bsqhx3nxclgn9t5qs9l9rd8z2p45xjb1mu7n6ft2d5r8quzt5kzx4nmb88paz2tauq445gnecav6ee8bwbco4r640n6xa8ntjg8xq82mo75ae0pr',
                mime: '11kqa5yl1ntwylh23mo2hu23m8so2ldd99bm8y133me0ezj3k8',
                extension: 't6qxhevno03bc9uggnlxmox2y9hglx1rauvvutw3a1xk7b5i3x',
                size: 2642274389,
                width: 729572,
                height: 731589,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: '5ednpb5x8zhq5pzdh08ej5cefxclo3ufypw2kh65r0o98rwpbx0yyag3vck5xjot39d7uafejqky58vfhhjc7o0zqb93pkd72j1p0cj2o7dygh3vu4ff9af866r0n0oku6xpz810z1f1xs6pjdztxh8gmm9pouubvt2vnpxqkjuycatt7wnata46dji94ob4gur7libq9yyplkaudtb0mc1uyu1io4g8wqc3ok8aogkgbe2bhfmn3u0e50of289',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'xvwkhotv8vmq4fj7h53ijf9a0ls091mjryw5enc8jgdgnf1luputgsqdimbpqa8w9v5qe1bcve8',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 396166,
                alt: '9emhim83xrh33i0mftf134xu2mfncwhjju9u1jxf8hz4o6f0wifxacu2ivgfsjaa7wt66edx0pv9excuknmb90ljly8omivwlxni83l2abcabhfwq7eam5cv372c9c1r7uagh4rdkk8zpt0kd83nxprlceqwycgtc9jv7q7q94lscp4l13opb1xowzniweg5xmberhu37j2xizzdz8g31u66gkakf9ie27o0wl3lddp0qk89qco3sagjok62t5f',
                title: 'ltpi3tlze2e983kuctm8i7jm925f44et1vpsbezvpio53e3bmkn0rlkkv2dx2zoliluiggjqllo7qgrorx3fv7couqeiusc94fnv0c7s0cyuesrpak71ur7lv7x39rz98ubc17h5h20rtji7hhqjt1pdb6acne4922ov8hkk47elw576sp9u5pr3ph55aq3fkbijojh9bm5q1fi0q0kpvepjn8wqm90hh399uva630k755h8jacbtr5v7drs51a',
                description: 'Velit incidunt amet natus molestiae et quo. Error nihil consequatur blanditiis. Sequi enim expedita dolore impedit blanditiis voluptatem aut ut aperiam. Illum adipisci quasi neque maxime.',
                excerpt: 'Et similique ratione quod ducimus. Cupiditate et enim perspiciatis id. Harum voluptates non quibusdam porro perferendis maxime numquam placeat ab. Et ducimus doloremque porro ab quaerat et quae eum nihil. Et autem et ipsum quo quia. Laboriosam error laudantium eaque modi ab dolor nostrum modi neque.',
                name: '4jj3bnsbl4sl7nzbpcwmgupmas9moyy3rwqxuz95qc0my02zroal3j2hlexhvm30cothrmaocm9nmb82y7w76qfm71rjjdt3iu7zol41qlsqbvvy2bkonkazsew0umh00o65h3bvczf0twnd9t0o8ancise2bhlrpcjqlmna8b0wk5ftgbmdaodol3inih83d2m5a6b5eok2slbmp72q9afuyge2b6bqdt7szzs2ocx5ke31jzifphbkywz3qi3',
                pathname: '7blzob4hgrwdtrqn84nk021qpj4tnolbeca2g8eqq0u6q8uilvm81qqmp8g05yks3vaew4j27b7mqxwuchwtbuauzphtc57yqbnvkw7oyuzxj41naxdjjubuo5d2n9gp2utxjems6g9vqitv23dt8dsb41rz68c2gg6dal643c4npo7ibpguvbeisex5mcib19e52thnk435lhviqsnz9xm4pi5sdtwz0xi8yvf8adeqwe1ilqczf9j0j12016l2xq75p3e3zks5otx86r5bmnmknh4n7pvw31elohb5d0txlr7pdh8g4hnyzkuc3fbpysegev0g53icqqyhktql8tsnke9socerkehv005zym3oxncalo3yte24p9mxxd405iyg053h7ln4ryrcih5htjf5jf66x0txlvzo16d3sy6k45fj036qqoxpins51ptzfkzjtkpcfbdlhjthtuw9w8vo94i3zaom0z2gittwu6nq2t93vbtrlhl3fvyk922zonww7j9k8mq7e5kqqlba2kj54vpbpmje814179fr24kcwz12x7irgdtqtbqxql61986re9rfdrlj4wfvrzpnaqudo7e3mhnqcq4hm90hn021cx2chiev5fxoqqvus29rghpfd1k6pnbf2m670k1wrb995pw578yib7lscwlrtdtd9ww4tzxde4uk1j8icmmcljgjuq0vlubtm5tfq59d07rvtv93jhpwc68vrc9a2sgsbvl8ot71sgoaasvm9zw79bd53y4ot6w03ang6wwbf6czapnl2ughzwe4dame8d0kar1whl60j8udop7rht5v068gbn75byduy4gw3efv4n0glsz8fkudoapsx508i8k98lils0n1jgkmjjps3fwgcro9zx7x00p1svauiikbf1dy1wur75f2j9k7vpdhgwwzf5tp8hpjrlv2tlfipalju1grgf8rc2sxmxomdgxz6jc40o11tb1z5g8zifkzimznzf8326sw1pdhz1wwd6f0',
                filename: 'juj7zkae06em5tjbx0hiqdx484nz8k580td90srpf7djper5869jbvnhizsk44tugb4qdhqlp0dvnkijhryap52pyd0b0zv9gsqcfsq38en2efp2okp2zqqots8wokzzvdwgryrrli384wtv879mql41gmo2favtp8ulz3ivy0zkp8lw8n822ggwbvskba574qa519d508z7w6hafmrsbpag02gsydgtfhgaytbsk1ue67o4pqksfpishl2hl6x',
                url: 'iwnah54snb111rgwi9w43sl2kwnwonalj8q41jkvoie9evyjy787sifrbakjmw0lxbi8hfoi707chnwj273evpjzrz0d6hv31x8mpu4hoc7ey05afo2qzqekmlsc44jml8bnrvilwoloo7nw5zcpr4eclevqj84kkwyvn3qryws60ilxlzm5h8cpuebwdh8878u2g9w5dmmgjuymsqwyvl33q4dgumzd1cukalva9vc2li4rhtw2bzss5g9h4uey585j9809mpdd43x0pe80j6qev1nxthymehuswlnksjnoim6bbzk70qok15vpwsjxa3tgsby1t5ptlo6v2360e3sehu8whl6w4kmuh75fjtq0mw3gyplg310k3subv05a0dxjl1djst3gsqc0b1j35rkfghrnfgn82kuvz17wu0moqycy4o0ljyh605uf6fib9mv28paio8o675fzsv03e5lkxxhyyqadw7bnjozixylmjs8zpj5mhiq5lhvsezxwwirartw6noc1o7oelp32bh7nzdk0hh2rvhwyvqw7ppj68gr6xm3hvi7mdajc0ytteplbgs8zd01eyg8p7ex8qe4ny6fazznvug9q0cpn1zw7m2mnncqxe3qi97fgs1brahoof0lcxmbgxv2kljw8462p493jcan2e0ajwtnfxgiadj5molfxtf6wzt0higkqtghjoue8hnzkiyn68genm9yu4ce6mg8drajehoqqvd139u1rrsmoy7kagupv6u4j42ms0fihvinuowbndrhsb9lhczd6rxpkwqnt1pm6qhwyl7oge6m36b1kdhhllevd3ee662erw6l0wrnxwdopfhqey2x6hhxosvzerxc70guwd1ftiatkob4s1nc8ncig6m1a0lsn9hu72ydnk164cg7mwgkvkb90ql7puwjbc5nqkn41mvuydurgy0xt9mgm18hgkqksgtq8oaflsslowllbw8w53rc2zky5qfuyy326sohdku3stzoeh014xw5v',
                mime: 'xh1s0h3fbmk92wxnz759zgpwaes1y3ugyfvrvlubczf4mkv205',
                extension: '8yc6ghiygzedti1tvi0l6g5drrpk1ur9grayxu1l50nr1d3bxx',
                size: 3759619351,
                width: 998031,
                height: 594785,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'y8il1amy9em6tvc0qx34cyhkh8p9kg9aloc513sfuq2fjylbhsgdtwei881eh183pan332s6k242ybw5qfnbifxrv75sm84dlm5539cs1455dbmetc9oao35gvxnx8ep677qz6ritx4ks6rxz9ktt67w41gxgjqighm0d0fw2yk3g02uhjgl1uhh38sfxn1xycdukz4pnaeflvcoceyypu1c7kta9s416sabcn7as1j8h5xhab8q5fcih2nd60f',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: null,
                attachableModel: 'm3czq6m645a8pjm9nk462qod4opim3d6ury6kfyg7c5c8mkt0sl65vn6uvcgeyz5jvc39nlwps0',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 201308,
                alt: 'fogwpl0589ekxhuw0iv1ct4fpo0tp8lixetbd2u0pzq1t6cgb5kmruvmqwa9h2yp5a927tznigr1ede0uyfn6qbsatigx7cxkyruy023wdy0ro1vskp62ukts514xft8q0qkh69cjlnyox1pejpfrh0r330ntt6wfjuzk0m9904kmfcm3rxdr2y6j1cjc8uhpogpzcwmwvyc0fjyh2ini4bvbhuysbugojyv0dtejxd7arw3m9xvphz76j0e3do',
                title: '2252km9z7f5x1d42r4wik3ar05gmzo2ms83xr9u4kmsz8yclsc4iwbhvv2n9vahosxyhe2oviqfgd5v5u5blb7th8gy59vpb870l5lgm72fimully7lqx6dyyqn6sb8unodu5nq6bwokhhd7mz0axbjien1v8pbsje03mqlwegdaco87c8m08pzehddlakjj6u31occtyzkl6ngkdrk9zvf74h2lbvvu9qtecd4g6a72rb2lv8vgvz1auyj7nax',
                description: 'Commodi fugiat et dolorem asperiores ut. Explicabo iure ut eos quia omnis voluptatibus dolores inventore. Qui doloribus atque.',
                excerpt: 'Ad similique recusandae soluta quia ab asperiores perferendis sit aut. Optio libero error quaerat earum nulla qui rerum quasi quibusdam. Autem et ex. Quisquam voluptatum cum.',
                name: 'y15uxlmomhd2uupqzjuafttfvh6wh4f8mqzyjd6v4uuw6h2n83kaltvj58tu28eq7n52bwb1ctzj8kiui8xf3ywbkucjeoozuf9bjrn57a3lde78njn79cufvytdbfm10awagd3utv7eshxj57904lhnyokg4woiz1odvw8odge7h9hjpynbkz7g53le71b3jkdln2gif5b5b1zqp1m8xnz7owthcx1yjpqlhoomms1is3op581nushr2qdc9if',
                pathname: '302jnvg6t29olqusij991uei97c3oiqn5rce872b5hp1k60f6kvfa1bb19krj74aivqtynpykwgrnlwsrytdfk0uu79jfk022mc80mtu82mcx3s7zezeb9v8x1bdoz2zf2ze8g3d2aameoe5hqk8a5b63yd5k2j80looloya5yrxa4kaidfvel7jejdotr2de6bg3os4imucjls3uxdjwkjj48txr11rve4g737w36yy2t5bbfuwjpwagdbtyh4ccl7okz8ijl0wq86vixeaiesz2wjny9hlhbb09yj28ajzprv4qgi8v9o6bmc3ff67dmsq1zjswv9b2hjbvn2frsfb3e59j4a71n4we9f2dt9a9ud9k54q552nvvlrxim3pq0fy72yjgiitdnr44c1x0rmbkvef4nuz9cdmrrrqfvggc4trdf5x7u90f199qgyiwjbsixkadswstq73dkr567qtiagxbo78bm4ow7s3p08lj01z5g84xs3um963ts8yw7fsi6z0r1ncsm2nuhi18hbivc1n0n2p0t0mp1ejsy42588hj03m595yxfug2wwgtwl4ywg5nu4gvt7ej6lwf53ughxd8t37wda75fxsbfuk07y8tc4akdqtr1yv39l88fp0l1slr20ksi928wdlskq9elhx0ubie8umznxlclabdb2uz1b8f3g3e64zg1ia1raq4xo8yj7bc6ecvvh54o87ii5so2095fnu1z8zkxh5pmh8xmp1tm4vefhm3k1jyj9gnsblwz3xpi4wf0jfovzxof4v8bmmnw89vjlf9y020uxp6c0rr2isu89ddydli3de9yjdt6f8yjigmdkagqq13us16djbt4ob2dxxch83ro3v3fc75c00kj7qetg3vh7f7d8afor6wylt39sw2bv58mfyvnnv4fc8tenz75ja2rm9oykkr0sa9snnfprmd4aubs9h80grrg6iauq3qtcanytumdr9twy9a3ggxr2tnkjbgzomerzu37f2irf',
                filename: 'gn3nkm706jebhxnwa0u0rxw1nmhvqzpb474o68djz4g1rgkup43gpix1q7yll5956fkrv1dqwipxqq7pe0n42m3jgqe2hhxi55gkagv0sx71sn37brwz9nh3cf79iywgvctb7ei1as73y2f621e3z2ofrxgzzpc0vj7f0wj6g3tbpiyr8a3b7wv9kjttgidbpcx19b2tzwzek25f1bq08745pp047qqw4m69jv40wuuv7qms9mc5bvxuih5jawy',
                url: 'hze6vp6hf14srlwkyzcjzsqopr1nly7u5ncelx3qi3lrvgphhsrdsq6c29cjqg72vgwf8vmrf4yn6zzch5sa0485n0r02cuhaqrhfcj9r99g84xii586epkyvx0i6cjv76ydwcteu0x7semqxh236i14cpb8qzscx6um7n9d7fyg56g43ixrxxgpjjjxnanijeay6d1qkl1kqpymc1l5v15ewrblr6ky27pax97wa2eo26ug8ey9hp3hkpk6cywx7gsaazsarns17tvyi9tg0fljds8tvh9wm9ew6dpm8jac8cgynqz3zbw51m05rcn4v4riex9xxxig0kcdtvk109f7pofqj6impiqjqbey3fs22ty6pqs8sbznzoln2iiut01w88thq6k17935jtid1cyoxeitv27bzc6jrfpjagf9sl2mvicbynp0qc1g1y9jc3zc3b16fhknuziob6ccw99kjgtlfj8efn0l20ydsl3d4m1lle99jp52tn6z2r9zjm8fyi29n2ahkmx6dcnj1b14dthbsd9rq4bgc8t87wshkrbmitoqeryt1ou5sjbm3vdehdm9sfixtiu5g742d332sagw1dkdqye4c12eseb2mn9zvt0l7lb040tihmsxfvx4e0s2cqmz4suz9zu31h4hduuwwfu6j300escyqbe1ypiua1me8hga8y0cii9gnxf193juk46tpb1xxt20bpgrlrdn86a80icphpofykxrgi9izr2skx899ixm1c5umyce0c7lr5awzyqvi9go3b86xqbcaqwhagkp51m8vvpwq1yb22kkvgu7k49a2ah7ajoz7hurytam5x6kxr0dwq41rcqawzuscuus3uo3sbbte10zgfaabf1rrvs9h380e1f690mf8yfq3b05gn5utn4k275v74iifs0hvpa5bxpsn7ums3m99vy4jzch8skm62hz8ul6nck7vuyczg232xqe0rj1y75usvgug7yggvkn11hdvbh93l3o0q8yj4ik',
                mime: 'r6sm5kl839aj6jabyomz9cfcluv0xvuoohgbnzry2xkjqk8ad5',
                extension: 'ykvzxrs4331b441jqcq5crobhp32vowpavd8xa1hlqxhqrvx1k',
                size: 7913990614,
                width: 562224,
                height: 181325,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'uao43fx4bzdmx29fjgukje5m7zauwnmuxavilulyq4durcbxm1mzcu0r4lbrszwumjkeqa4ji1gxd9a8ycovl86h8r5z6sz058walo20w68qb9d7dimu8d5geghuqrytq4shanx282e3tq7ftans29e5ay3w71gdn4zi8umg04o7zc0okuvxflp913zcvlfk1flokfbwf7ni3oqwywmv8sx0udtr60971hgjwnd4hxd398980pedetz49khl00e',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                
                attachableModel: 'bbuwtomaweqsb4mdwyag1qf2hiurqw5txquh526vwhv585p2ofabh0rm1cdvq65vanfr4uwhp4a',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 889595,
                alt: 'feyhn0p82t5n4fa7myexzf80btty2a8frl9ng5vj0wvrv999wqqa65zg1y96ms2i07vb0hwznyunu3q9vh3ici8e0by6j0abml2g8vs19o89a0uaxm85imi8naqb1uxri281fqsk85v90z6aecpbpyvm57lmy64y7sz0dbz252z5jdl390hvdbfkeuuyi8dl0b7ip6k8mr08fcdwjgk14idlr97580e201246zdcoqgq8x2smr5e8uceqxaw3j9',
                title: '4ypb57t5prod72mmn4lb3q4acihqw7cucu8voqrfro4a8mwz5z0ylzn5bp9hzwkq3x8brsmyk87ewea7t57ynkt4vl5ry79hcmh9ahs1pyfwzlce9o7mol920qyti8cxyudjshmgtrubfi6emarb8ir2klhkp7sqgo9j2adokxg81i6h4jiq41mbtbk293e94a1y8c8etx3lo50qaxh8h85k8drb2tvmgzf719zve0cj0ar02n5tix6i9myh8az',
                description: 'Quidem ducimus fugiat earum omnis voluptatem placeat facilis repellendus quisquam. Et autem aut quidem voluptas ut. Voluptatem ut aspernatur debitis quis dolore. Minus reprehenderit accusamus.',
                excerpt: 'Libero veritatis dolorem velit et. Est dolorem cupiditate voluptas debitis. Ratione aut ab.',
                name: 'hbqn1r8k5dpszvarf7fdyoa8dokspp9bm2311m1pab38sif3hbxque33jhj371d6o2fe3oiroptrv5c9nkvwre68px0sg2unwlqgkjz0d5lr6rperzj37jqniqmhoerarhpzor0yh7w9n12damq34oeq8hzere0ei29wrfqhuzb228xc7g7mxqg0u0hq3loruhphu7pxr2z5gflkqe2hl650vrr5a410cmd3dvmgx1c4aev1uk50cl1h0fimbkk',
                pathname: 'zobwhlw6msxbk3jaqujcu3e4b5utdk8vv2dzwpuoppex429a8nxbvlkk9c6xvnfpnzvri5l6sxvv8e8t0c5vwfb1xst9m5s1fcjzzjp8ev4c1plxmacdqol9x2wxpvoeg5xds2498957oonyt3ezug2cpslyvar6ip5id6fp3cfzbezdqmxyf7vbnslj2vq4vzivmrl22aau9wd545s3kgeaz6isqgd3kb7w58p9mjw1p3zfiw3wddvj1174zh7u67f0mxmgo9tpzgc1t01ht23nj5fmv2w4a3zcw37crhg211eshiz2ji6qiktcpl8glirluqjmmlfoqwmn2npp1xc1975itssv40l9125k2gsnyqp6zjdy5w56gxdpiwj2cwv60b073xb06ngklvs8sryy1heqknhumat910knvfk1b8zps466kdt97ivkl5o2mwqzi26kfvogef6it0iqkdyjuxfpttx89mezpv2yb9hu8vznsxrovilba8y8leuf2sc8nzdfkq86g4i08zpl47eh8t6xpesetglw0kx0gqlxpx6qcq8j3jdct6fsipz8yk6eky063vsjm19ep7ko4citykzh2aw7uj0tr7s0kyoejkn8a1noclnyooa6ofwbqqttrvuso7fv6hdsbrbjjlf3qnlh5j7tgmnju2gypgsmcxf15zktmbqudphgtsp42k3x9ycfmb4ce0ovfbynrha4bfwdh49y2jf6or83k38xepthuc9rqr30razkzza6bndbwqh5z1a0l90a30fsqz3aiphz4xw1b3rozodtptar49msyud0dp1qxr20u5v9yxr1gimnpf0742cmy4g1t4tvxctibsole96icrafnc2hdnz9bcforp3dzr65zmhfr2cp223gfpg0i3bbkp7m8rnkj4v983ylv9rvxykjptg5wmzxua4nd33oa2gh7grjnbyza0apa8w01oisju0candlqrcpq1buuxdzm4sjpze5rtp4becs2f3dx64gw8qc',
                filename: 'trchf4jmy89a21ylz8pcls6t6862rhtzor7c3gswcayvwjgt9wzr5khf1fe0v1cqms3eaheg06j70du3vlebp4kgky40ul3ywizk9drwor0kc7o9j70bn1g2k3uo6s9ag70vos93p9qyzdqnhi9t2h7drg6rfuuzpb24468aynley6td23y6s5x1bapce8j3udnuro864f3x5pvm711vntumeo3lalus1g8v5lew5qduhcgws0ejlll3icbnn00',
                url: 'lfx1bzarh9l7tlcsmphc7w9y88iwptqzgidg6afafooul42vlh4it1kj5qizg4afcu3zyv1cyjqwms61mhnmbjzgm3dh608bh5543h7km4wn5um03fwfsufr6nfky9p7us3nm39yxs9f0otsrx29lj6k6yq03dpasw8vqmnupppthjtxic6im9a1qzgihukd14kff2yd2ogdzxc5ccsohn5utj5cff1e82mrltndldyqqlr6sltzrh19y34cs75mwdfnklntk0yyat1xa6e483jji3va361au37ee2wqt5jjdks4r4ndxdd73me10trwxj62ho522vnex6v2z6xt7ba982c4plhcrebt7kaerli1wkm9384yfmkdzxmdeztbwmd0ubkspvcokudvqv9rywnfzx1s0b0jq2nbhvkedo11lmfcow835osnfeolog2uofzrmrnn8a4yzxssngvlb1vper1ad2k692g4w6c20xk17seznk8iphsx33v0wf2hky9zcwfqhfe4xv3802ad6heeo8n2gosd10h725nlv6ibc4gj1dbtcwz9hfk0p9wpihc4nxo9lf4c08zmo5daj940kgvp39jb3d4hplzsatszchd4c6ix1rsmmpzpv9oipoktnj4dmghtgz45k683w3dznyulknsp8b7qemq8lc60fjbv5tafsn9grxc0rgyk1pf42vny22l3v4vwnzqtsxlf4fua0nxbvc31uly94uqvwy3u4gjahnrnyypz78ulayf7emaimxc5o7fnk3il8kh2k6enyqybchx83f0rdcu626hx5cy2arhxq8uktz3zj5843mjndbpt7gygiwu7qrvhui0j0kwo6fe3p9nqm0626ay3j8nczucbawniucfxt41a3iph8rk7irxveds44przw0mbfcw53y2vacy5tppstxu5b9m5o04gwkw56e2opbzy44wdud5zevtwvgfqcizk3loqa9efysqt809uosnspn071yj181qgzon2ztld',
                mime: 'u9nm9m48ugfvlgp55szs9df0vwklpi79r1nfjczjztrur0r1gx',
                extension: 'jqarh3g4rf3g2x3idtuf7ug2d5lgc5num71jjvzzwwuubrqp6y',
                size: 9092320158,
                width: 852744,
                height: 976614,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'kl490q1mx64drin5cmvpi4555mrnbdwg3bmamikpdx7n8ls458yfujl59nqmj4nu5tfgixnwbtsa30lonskknn2g8s5t1x1w4ib89emj0boltutvha3kwfi13ir6wd6goh4e6rlq5o8bbz3cru84g00r9nrkt9kc0yj4ak32j0vem2i8xp1aldhjyz9ozc5ni7657v45gs2kto0guw9ni4zcegb7wtoxwjw9yr9ga7i0t30kki4jv2gss44mqek',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: null,
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 117360,
                alt: 'mziey0os3e3ud9u247daqod880s0l4vmruxwkjj6j35on0learuiv8vd8mpx3a48xigh16l9olliumhw3lao16oh3213xjzje96oisfhd4utijymwpgtsarb6coope2w0siwfhngpwn3rwkkgegsvmuh6j63ozyrxk407pop6ngpx0v3yjpblazujgnxer75jb8xfne2phgu0gigeksahibbhysvgz7uncicl66x3u20a5qhdr9t0qcohnn8jh4',
                title: '6kmhavatgwfnk92oh0jl7s5s23600d0yfybxcb8bjh8534ymbo7px7sg1an5q1wpy0epu6gee0lq2loysvp9l9mvcm4q36gif9q2n0ad8h6v156o510rzn10opm7ba240dvnhv59pi3hzzv2cdcgckr9ccb0f7otf8rtomyiydcltj5gv35bde1c7qaoawxenrx48ihk7q8y3cve941yrhddhfnz7yhon08wkw4cgzm78kh336zpjuxn9xshl7d',
                description: 'Nobis molestiae facilis eius dicta repudiandae. Quibusdam explicabo provident fuga aut. Est nam iste omnis commodi pariatur labore. Ea quaerat dolorem. Laboriosam perspiciatis ea et numquam non laboriosam odio.',
                excerpt: 'Rerum expedita eligendi qui recusandae earum aut sit expedita. Modi ex harum exercitationem iste dolores dolor sit voluptas temporibus. Architecto sunt ad doloribus reiciendis voluptatem et quis quisquam ut.',
                name: 'fo8vqwnhttt85g7g7z26j70p9a75r3iup0rccpk3sajarv1zr8p3c59qbe5l5xf54343c76a5wc6fb9idb34zvjklkpzlcp3aq4hs4020337r3n0c7ma4f61qnqlflmzkylgemmdcbfgorpaw2yzav7j814j587cur8py9hz45vu677jmyow6uu6pz2cki31tmcvy1kzkakfu6qqvhkkhfk2qkpz33681tlohzqn65fv62ayezu5txll7l9o0sr',
                pathname: 'zgs9sg20eoxtlndqff46q6o54nvjk9jc759khcj2vc0yf7xgglj9vulijpdxgm65pdh851l1uprkiwu4glose52dmowlkijz5rk6ozrat5lqn2y5pbe610p6jry1drdwm32p3z2a5ier2c5aicawt2gi00f2ygpzgaxddq9k3dv7wx5ak8j77jg2vaczhxeg2wgisx4heg3bewrvpp2bzvcd9wyj4fh0xzq3qsc8vobigwvd5bwpeenuc6jeqb0wbcemi6ljqebht4nvzip5qd0dn6efimkoz7es4bj6xvwv1j5n1rzaj656ktwhzd06f9fhgk042dv2suw78fsocvhu0gplqr0npswao16d8rraq2hcjcpwjua6tl4zv3j02piyca0vueoo16hb6wjjn1nmr1fuwi69d8zq2rkoec5qdh3rcec88v1jrcrtp39yjgy14rsryw3lleatz5utyr2tk07snkhjso6dejum7g76p2bb9n0uwd7vn32vxbigsct71gh3jg5pccqwb2qywnua3zq1h4yux7bf7edxiuwdv21nlz1n9w1i775l6mlg8byr5gszcrgmvj2eeiph47za09ihibpgzhm4gs15viv1kkw0xlcsu9c0pti9l4qhto1n8nt218bsdhbh1lxchmnxueqjpaghcx6hnzqehbj43u84q14fu2jbaolcnqs71xoehj76eh7lri2j64crdlpkto895dkgmg52rs0w9w9eaaykk37t7pfz0jw8lledrr82y3ahs3req9sd8yes7m4h1bmzof8yu6g8wgrjsgo5kzckngfxg4ncpkjpgd64dp2r3e0el99051b2rrncw3oifwvynk1en1r5or82tmhi3y3hbux5m7s5lmjpin3i9d9fma0j5t3dgi6gplbmkjtedqhi9ce0l1uol5jclx6bt4on02kd84089fh8h7yqrnzd1q5c6aj21bzoc09wkwxxq670yon6t57ep0b5xafzy67kw9n4nq9x2du8a9s0',
                filename: 'drdmjjh0grepabk2wtuekhy746vdgpz193esfyb90ca2qsa34cd1u029y6tl6vhondaeyfjwwmnrxqy68ibxhtpy78dw1jfpmwh0yidt13frubgubd9p0yqwfpmibewyaw79hxoceiq5brzq12gne1mum1naxnt0lzkwcneu5o2kon0f4xk08gmsdkixdqtvm59wtc34ppioq4sr4h53mix9a2cp579cowwboklam8xzs17adr6wvsjs1fa4qn9',
                url: 'rfjrnozmofjlzaunofl24uiol9b0zd646tbqebxxl2idw005jaj76bj8z1hdtrai1rbj2fabxby67cbzixpndhc96v2u6k9w6fw8b54p56hhvx9qkonksff8dm9041nwi33ce0xs4yly1akwsy3mjk804bxa6izx3fkphnuewbgr8nhcsyedxdf9nsovsn7h7atnbaztbp0dk2ooea5q3et1vmua3s17haqb33road0lcmpkm3dd3ffa45lhhn6v5lfzweige20t0u755znqfpcjhurchxy8um5kbmrc0rye3qlvg518upwlm80ygjntbxlvuew3m4xom8ihwuxclsj9lqdpb3maqytpfgydcvkb9vjhbetggn0zkyq080my7g4ivurmfx3t65x0h7dns0tspdfos4907ehknswsaz9jcn82tdk7tsodmleawu775g6axkizapvzgkv4cyzvwrbbmit3x2kk57fmq0uwbyi6du9xiieq21giu7gowpw3la2l7sasccdtcgdfvz721v7rpzuclq4gkioxy86r19aha7wcvujpchgpysvudfxu37f2ir8fgv5p6fi8dwhiu2s1vii89fndeq1et6i4sovb39srxqbbw84y4ycoq79dko7c6cpto014cdl10jc6dzcpo7usxu29aekmeqxdvi7cj7xokfdzhuo51d2xnonl3ifz1myw4d9aqfbntniuqfdf8oejsib6jwjcb085yw8x42o4pp8e9d2kkgeh3vq1e1sndn8vllk6oi2mvp5bk48bdzlh19j4ahk2us41c34l47xpxy8sedcp20sjdkbuf1g4leigoap5ahj1lsgpid41ttbq9ew3pmr8u68g416lfi29768q0ioeatovf6cijwvxrchrpguv7ajjd1uf804zioq6e75tm14mfgszfbh3s42ioy0w97bdshyjaecql2a7nfefeldumjxn878k4g159vwep1b001ielara46i4i48alrvczrfcn8i3xcke',
                mime: 'sfuz7suldgkhou9nq1oipckp9mwollhl6cx6j63ym9bm61z1bb',
                extension: 'm9pouo4yx88fn8hkhhrgr7y077i5wpquuvvsacdcg5k6ovi6ur',
                size: 4962815279,
                width: 491940,
                height: 144075,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: '378qhv4xiyznga6f06dylq7l858ywx10j9bepx7woqkmw6bc4cyx1yp1q60lgx2cw954lonpbn7ohciv9qlql6t9hhonjx30kpqtf58hwut5qbdrx56e848d50jxv90xxxrad6iv28cy72a4rsoo6m1x8lnfjiq4fodx2rji4r8h6c2htqh0cvv3rsux9u24mjejm1aqkisfyuumk39dp6z4rwzqrny17p662gbx0e3lf0ros6ixpb45p5wgtbj',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 770259,
                alt: '0fd7zgw0xscirqxgdvskyzitue1ybk7g5kp18e8aasu7yf7d28efhh1erbhaawcpuapub49sycpal9p04eue9poaqdyqnu3142jpdma1he5ua7eptapeu74mh9socomfnto7opgqsb4wab4xu5bs79ph3x88afbekfv4qrmejmfbe732f464ujp6yhp4gr3aa5qnq2mdqcy7u902iialeadxpgin7dcrip8px97j4fvqm1ev6y4kvy40l6w3jym',
                title: 'cotcat2me4phuhj3ij50ffn479ataeom9db3ps9bxiecwk1hndf882gbr5bisbvqc6w43ldgj2fhg1bz3u57dx472opvgw9or7lvwrnp5orjm384wi5ifepluw82r6ry7kqcwyrkrd0mmlvce0tca9z5jwbcnf56x0euhafgyfoo6xpt9sddyve3cl9bc6f9wgz4ji41tmr7475mgiwhm1mbw5ll995fpxzvti3kyu7arjvjzcq9yadol9clrat',
                description: 'Aperiam et dolore enim veniam quisquam et. Ut velit ut qui voluptate aut eveniet nihil dicta tempore. Atque vitae autem est aut dolore eum.',
                excerpt: 'Quos nobis aliquid iusto ratione rerum. Amet quod perferendis doloremque natus blanditiis necessitatibus totam ut sed. Et rerum ut voluptas nobis modi eos ducimus nisi.',
                name: 'zv6b6ofxkg6o8mvlw27b6y4sh02bilh0c5ihfm4lotgt1pzjv4ui8terlyda39oigvx5j6eesalyqhx0rtetv8a89y1sy5la8pfd5b8gnd9ai37i57wpnt3hxepmktif835t9dzq0vxmyepaau6pf1jfq5b5h26qsyr4wqwpgntwbnk9v29o0veto8uq7epabvrqq170dja69d6ls38e4zd7gef92v3oy6jyyuz5co693z1vn5ri8w8fr5dbhjc',
                pathname: 'gomwcy7gpv0rflff9cj9vifd4nrew65mmq8nbbxo3qrzxknjjz7b10ez8hzth569of8kyy4qv9mz051re3576bqxddux8y8phjl96c9eyh97yxgm2z3ptedqntp8f1o8xhahpdcoolgb0v7b7nyoiolbd50dy1gljn8xu9lbfah594pil84kjn2ricd1o6va6poht0rpk0g94u3bnhgqssanpqc5aqtnnjqmzm3x8umyhvcyhx2zit51iwl1qoca3k7p8umfy79pl2aejy6uayiw5s04gkiqp5gmoq8vkllvif0mx32coipp0e7roc7htnefx6jpp7aa1rnwchowzl5wm4nodxryz1rc25liqhukn3j8aoxe76ayr21ixnbi4406rbtk8mc3byel60b0dmzew5u9k59hxgzl17z53rlmbkxpwba43n7yhiyaka3tpnhy9rvvxahqkbx8jlhsxzrrw6gfnacmq8k4h3w1pjebt2ckek6bdr9z8zip7btg4fopbi68svr0c6y74ezqm1f0kvlckohbtrfe9rwex1ajlsa1i6lmcq9ssu88wyq1lv8p460t2bm6i8geh3dgfu4k1atgxzfkkgn5fbim6p70h0l0ivufjxcb4a6lx0csezb7iqevy7rb7ept134ftoujjmr2rwedvf4fbxjy61u6tstpyt01yyjgs8b4vbckqtzmml3ev81m50vu87v9thsa9gwy212vvujpmdfcx5r90d5me9mnlbbvgzbp3fq8gg2fq4xp56jk5zwmk9ti6b7v93h7pocr9cvh7shpovnpjz6jv7bmfz6uzi1bthw0ukvbw2mj0jz49d41hyk6e8kn1582fpkhi3py0gkfr8jtti8c83cd0u78dhc7bxav586l0daim0k9qqcihqrwamrg0l4ni4hl2jh6i2gil9kh8wqzoj81mzcxcu10qfw5avnjzhjle8bbxslp9qwgl33sbzpfhbyvkg4rsem7wdm01sp4yc2anexe0wq6fexq',
                filename: '9tvmm4ylozr3kkxfp8y7rjrt6vcxzv9fwltryzrpw1p4q6x393itiacssxckirfh00g2myaj2bbzeqfe06jli6y87inh8zaa563tpkaayns97lefc13c5k7eabbxp5dkfk9kabkwhwy9sdxczaf8y1reiq4mzp56wpy4jjokjc2ok63dpx45cytcoeafzwachrgogfzjm0t4mewwj059mcd6z3k1day7ld93z9e8jmqwst96ot643xxg2iies82',
                url: '3tfsaqbjkx07flg5eo92i7reevyu0f6pndnkzya1438f87ogjkze7qp3tag9ajrh9rbulwj2ofy9lkvc1izkncoyomp9pad3t3zzsznfa3girmvw1oc685myjbu1sfqfn8suxj5clt26btu9xbp68g7lukvds8ej3qejxmlt4m0h3dzhy0zzjd3l3miq2au3daxodtsi8th1p4e4rmhepm7a7tjhvrqxqgaegr7izqgbb5e9ra5ffdn5hv72a3l1pzatj0yq5mpykrkbq6jxt935rnprkpm8k57ugb41m3lnp0yn1b5yd1tsj7xpk1rapzk29rjrilnz08q5zmq4h2clip2cl56ugygut8gvwiat56vk5oem7163dnv3ite58x0xyo85ipge39wwcakl4x5bbnldzdr0l15rmafsbtcpwom9et7u92nn8d6qifit6x8rjk2n5n2g8n6vtpvh0ujzfjl1yrtv5ddlufx37gxrgdokbjabnl9gtqracgq9a8jl0lve3hlauzj44i81hmlv7oj07lhr15uvi335oanlr5x4s8ztl7zy4q7c12ul9oy8vr2d6ollmrsdqgkjn5ii4b8gk5onjqdt0ytpnu11h61q51zsa1kut43kpp1cy7fktvq95xxf81ruqm6kko0vjvfumhq7lgndkiyt9skem0v8cgwpuddblk1esw26uvnpwe1i13yxt1l0g4hrmydpdpl7liwvql6i1exy0j22c09hx1dv92zkkjn002w19yfemhzk9yyoklsk3wigv4y1wdyq77rjhz3wo5kk0pxcllu972xlaf8tn2dt4jxv09mvb3cg1ryrp72h6fjukxcbm7r33xdggo99h77ig9h3mkny84z9uojjs2nru2kb3ghqe86law1q4yqfcku6fl9pl3cwciny82turdx62tegcefbxzif5mk7a1ftz117n8vljcoqihsy57wtrt7oipivit7ej29smtwggw5j8wn7a3827xhd2ms036xruu66',
                mime: 'mw78hq83mah0ms6xwog62epawp8f2xct3d37apz5dlpeew0h6t',
                extension: 'mblenoombeaoo0td5em2q1rtll20wpmfd9danwx58hczlad1ka',
                size: 6887806147,
                width: 279344,
                height: 896895,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'ok5fokhlq0vo2uayuh7t798f51wnn8mqxhwo48ujq6qnyz4bbi6rjjnv07e6ew1ri0ooexlwe5gqw0re4l2uu9roh3wj8m5yedqc07ct8iavog70ernoc13c1azzdiqgv1b6kezpkpzryyaexsetv4i9eltoiz4ev2j3cz10yhpq4ddnfqy2od4nun0qrx5ho55vu1bm5oj3wvnqxtmpftw3lz0qhe0dyu7800u0nqqdw9myn55xtpbceiq2ri6',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 't0o1fer65s3axk2b2zgrekdapjp0tmphfxac7md7epdn4nsh9suu7n1oq046clp8dua24ig27gm',
                attachableId: null,
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 890119,
                alt: 'xc7u9yboov246t07iybc1ymrg0mizehkeglj5ui1dqw89lklxt7mjksjgwffnlaq03dzdwy3vim1e73ijx608gclk10q1v6wk8818b7lwni5ysccv7e3t415krtgdstt8hxwjr23aqk9xcigykemela8rj4zvbyqcje4imnljagl8hfdovd05dxf44j2tsva81p62gk0cib0h22skkiyp01yko2y177419dgwwd5ue1vwws8zxboeztv94wwwrk',
                title: 'lhotq5vxwgckg83yuvwp2ig93nhb878yhehce613o7u59n4mk5d15pqx1opsvlaoz5bnpcz35gnd66xywps8096q8u82sgz6iy47gku5ddeiechukeo2dk99q1i6j8ylvp3r13onfq4p9mlkg1b11x0pqd5vnbqcy4s5r62mrxxil8qkjjq3kouk44cbsmiuypn2axi4g9cop27p5li74fyabl6n522ftf7fdfnr2et2gebnywur0wo3ep9o0rp',
                description: 'Corrupti quia accusantium blanditiis sit sed repellat. Tenetur cupiditate adipisci ratione soluta et. Odio velit saepe laborum quasi dolores non quos.',
                excerpt: 'Qui eligendi illo nisi veritatis voluptate. Sit sit voluptatem aliquam. Voluptatem molestiae sed et aliquam et quo molestiae. Et porro quaerat maxime harum.',
                name: 'whmdw7d9cnd876i0g84asq8lmei6pxexmdf6hvxe613yunpc8vvn8nxrq22p19kqgpigc52307oe29ng3mihsckkghqnt6ckiyvlsv8igjnbipro5no3d86ntj2x2byfbujfjeqqmpp3o3bzj43awogc0asmz2kfqo9060bjvm8ed12ghp5hmwyzusf6sw2piujykgutdld4k1vno9burk30asiek2easeuesr69xhe9328ls12bbcnrf1ag8hx',
                pathname: 'kuoouwri4nnh7uo0titgwt434v9uut535qmfxikxglakslsjmx7wgc86v2ugc80yv9l4wchqinln5xys9ttzcqt3fylb1qsaskh2xg5k1sb9r1nctidtro195yyornis5u421988yydt8eyrtqbdval87jdiof9nuz692q4d4scj3rwh28d7726uqoheq8wuwveqogql972mu8t7eusfkw7njz0oaix5ofl37ojok6zp3tb10alku0jgozngxv3hwodfc23uk1dnuru9ac87vgpl3g9pq0oy9esfx8kwdd4hbp7e9l2d56mb1poky346dr6wqlzhcvt5gh36ic1xpoj2cxs3i568kw2yrxb7fm0mwxwnwb49yvi9mrrqdg80of8itayyia5wkt1lfra5d37ay1r7r4yyf13hgteruc90eflzujukexrjfgf4kzplcbajltrjnajg5t60uvuktzp6ydlicfaphhaer12osey7o8hsp8ybpewbpmqp23wbs6z6n9i7dbu1uo3ali656ecfh4h2si8quzldp78ue7vq6gj105fwb33uxoemrzxawmsahhsxnniapluaa204wmwgxrg300r0056evjg959g33spj9kcoo0zvhbu6pknzw8ohx5iejb3sft5snyzny59jj37jz4zpe01bbyuwcymfir6d32wctothuy7r59lk80i2sgn1nvaq3x5b2h6ie8idl77nd76ndwen398q1uhmi072b5zfcl6gwqe3wepodki8o7uprsiuj4siyoortne4y889t0is7yt65f3zxaak8qc6lwuzv5abxtoy849lr4xw66zrbiqs9tofzaspkd3hv329docj6ouzjafgnvicxtgab9sv41zdlha3f4etvdj0atms62746eg8zelhm6lle0jxobdpi0nzt4xanwtkwbtku12ggk576n33pfiez7tsvb317oc2cu0sigfcyn3gjc3ttopv1ix1caqvej40sk1tk69yapchxwt2k4ip',
                filename: '7ebkxzddch2jelihxudfkoqt41obvjcwjyj4vratw28nnryaprmllkop3w0gsqbdodzfq5makq4crrazo2mfo4g1gi8wyoiei5ebd7gxbhy2zre0iobo2zusz71m6ey0e2p0j14p9qip224b6w513lpdo0dat7q6sufk3jwiwen7ev6c0rmtyn75c65iuotrzbfplkc2yu4og40d2xp37qbeid0mn96evzrwjmke0zcuqflw2o1nv429v7p1gqd',
                url: 'm8zlg6v6e687lxa0ay0gghvlet4u4wyo1f3l6ssm1r5u9pwyow58vs9iqqndcvcl3w6lniln4xdagwt84in2f2yixew5uc1pzrc4y6j18cgmvq0wmae9cr91i5bm2qq5qh6110e9nv4hjjzsvw5j93ueu2eexskf13bmtpynt4yvgsjfntkymz9g8g0lf04t64ijai4etr9xnuwy21lxs2m893c0q2f09xtmdk2et8p8th4q7vho92yx69bfeh549q8ggt4znnjgczolugwpzs902xa8i9nc0o0xo79k9el1mlir42e4ji471vcmfl7hbclicf2h6298uxj9b8lxvkqs6tq2ms2jk0rjutd5mkalkvb6gzb799mk7ax764s528j0xd5ja0usb2cd2zl289vt1eq1axz8x6e7wu7k5if71yhfz6d7nutmf46bi5tipa5d72g2nqy0s16m1fisxk0om6ynihnzvvntncs444j2t8ldblt956cu1zjzja2qyil1m38nb21l2uzaiuw5d8tu55q471kr8g9micn3e2jsx4zdkspwf08g56t4z4flwzw8g9v1e33myslnj6kg6vw3rhxw1z0u5u6keqa7ni2pg2mbtgbjwk7jxy9qyi7uamk6s5t1td0sikyd1nib4b53rr9phnub74v8gel28eubls353tr5j01acuqnmx5wo490fr6655s0vngsngejw0gicuu1givqpugnskfyykd76yxxg7eczpe4z9qyhonn2voeyb81ymn4cze7t5ut9oq7v7fs7cxsjn5wujv93soev2ytx2z0601vp0o9ubi2b182mrge951mwl8dcvjkubl2hufp74m00hpbk2qykiwj5hojdvayxktl8o86e3pcxnnr856qt4zi8nau94j5lm6vc6f6ru3vi67ygunxvq8yx3hfux6fbbejc2t700vgv9f6alht31cvitb9qt05f134c28fkip4cm6h0qhav75d0doe7enmiy7zubw1h4ra',
                mime: '1d20s4hxgn5i24gimrwfyktmegpas743yfhqy0jr1o18fdf6zq',
                extension: 'h44jhp5de80nywakrbs8ukgfljfgzxlo22aw7d1iuf0gmo3eb8',
                size: 4744074543,
                width: 616317,
                height: 883649,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'bzyf42bvpzky4krk8ceu260o6q3grulcl504u45nnhj0tomyrg3sh0zaj5b9lw2l005u0ki2xpczs7qdvl1elq2rovqxs7jm301gmuei07kthvi7i4gppdmt9l9hmgk3zqpe45abjwb0n45nbmusmdyu413icn3yglbl0o8jw522oli5d2wdl9p0i0xn78eu5f24wk1ilz1xr50nk3u44eo06k0ixlz8on6lkp0lqojbpo5xrraojxfumcb08z0',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: '5z9wf94lyq5lmdl5uamjj2lyu82479de0m6ocv4lmxhf13rhm75xktvk076yedrnh5vincbwr0y',
                
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 748294,
                alt: 'xeto6b83snstca203lweh4ojo2ttjfxnhi3oyittdpsrt5tl7h1patn585s6flbgzsfvq7krhecrm2shv1o6yi0sq3xslm4cjp1dru5o457adobb67nkzgzsdgaepvzhqbgug1jl0ush8fxrv99f1t3f2wk128nbgph4ifhzslvv63ce2ii8kjeiwrkdsbxbjuu0wdivej39lka6yvpk2ac5vneknqyatdcok3mrdyf2h3a04r11e1cvvkrldel',
                title: 'cbeos3nt7gkpblcyg9q723m2ctofxo032027nnj5dkbpn3mpk3p85b8rne0o63e3nezcncaiz1brapcwn0wrbg065b3drgetff8qu76mve1kaayzf9db24thelidw10sl57tjvnizm811iyb6g4kcywfkcqybw6sr9qrzfzlz6e7lfg2g7cx7hr4jiqgwpfcdp23gt0t5qeq4cql9fankt87inzprbbd21t8uni0rfouifpebtaukwetg41ri18',
                description: 'Minima sunt eos earum non. Veritatis est molestias expedita omnis aut temporibus. Et voluptas tempore. Expedita quos sit.',
                excerpt: 'A tenetur quidem aut voluptatibus modi rem ut. Necessitatibus sed eos accusantium libero porro veniam voluptas aut. Id odio molestiae rerum consectetur non ut. Harum adipisci occaecati soluta odit et ut.',
                name: '2ppxgvmyjlubj0etprii5g5m7a4topxjtyq4w9ig43m8arfvevu09b1xsl4i8rpy76fttwena8zlary40mnl4bxxvbvfjch60u2taevthkmbh812a8xvg600h49e5zhj5d9amc98s5ja37coydk1klj61o51ms29v7d449s4j9oxu6auor5pje0dj9bezbm5u67lb1d5ha8qcmria98ymz32igiiv7in3hj81bxuwfi02g5fhedsoimkstqkugo',
                pathname: 'nv14deqsrsf9f2rkbpqdi82g8b9tm55983htsavqnvdu4ub71vp2j0poe6rhehj8if71ou5miq2q3ulzcmuzrkqgseq3hfr14uuanh5kggntmmo8jb2m398h3z4ymswxnt2r35jtlotjsysxj4hu074mv082qgsm1gk5lxerpztv227a5ly0b866x9kn1sl2z9ig0xvw14xtmhvvom9p06sjuh3ji0q9pyo7csv6cva2nmitkqbfgvd3vr5w0tjoz27lswxf5zccmdb8yfntci2fkmtwk6y4qv9n6arjvpygqk7q9m4md98cf94vz15qohp6zbgvo2zaa767i3kxy0z3ir0at4x1im6kolkxw8zw06pndugbhef6gn1jrj7rzz0xyb4h8v5w08yyaq0szxaj6em849hy9muz3w9d5vbixi3cmfq29y1sn174rb8xn3swln4widkxf4cwqh5ys574ma6dfi9czfw69u568auddgs8pc3gj2k0yv5zxvs41gqhf9v31auask2g1cthdpt532mu2iugos2ttjnu9jhrywdn1z4bcmo79jx6ywtwupxtzp8fazf58i6edltmtkogjadkg40py0187ei9ogwpga2rwcxm2ggqnml28u3b0wmdr1qd9qm5f8ipohhjw7rhy52hsjzl9qgebnrytivoxvn7y3iytcq0oa64axobb3nxwpdhmsf16urxjhn35ebnx14gn521suyfkhzge200dzfr37jkakd4mjjej81g711rjkvxcz2i77rom08flkbeoxd3zju789q8t2klchas2je0e3d5fkakvfeaxcb58s0dpi6r7fkacsr7eshiqpyhv7suyfxgw6iucc2lm6e4fudt2lk0jrlof39prwg4k3x3juebmzhpq1wf07sp71o4xro8810icp16u3ev8jz9huxqu1lfwdwxxcnetnyyq57dnx5vcj9n4i48ji8jrgdtbmvkdh7nq5rwz9et8bpbdsug6slobw2rqdn8zk20',
                filename: '1ljhvhlq0t5sepdyelofpa5b5wf6geeemoqg1mzm1d7k10zi69cqkn6z0ytzcbnujklm5257eni6lpbe69kb0skykakullhpc8rezc5s4d4ewtdk1rjovk25oqvjucjyi3phz1pb5ld7zk5x8ic2xviegns0thzqjdgtr1rnv20db1nsnmu1h62s5wap1v68or1ijwemdb5fuf48foe6mf24vcp6dv85i8zg0vmlwx63ptken0tzedl5tdyb1bs',
                url: 'tf4t0bqgx57ziq2g5tkcnsiumc7r3vvqy2wpqalqdnwm0xhbqaqx4vt3iaulfd3dakxmaasyarl0v7f5c0lhyfji3o0onx933xl5f4fc2z3aqjtkr6lhyh6xhlgtqarajmhdpqpuv58jxma35cg29s7ic1qok8dybumxgq1a2dmgwqdv9h5vd6zxeemz3foa1xnfpf906tl5oncj1l8h7uzj2262her8suxhc8kjwbbpwrcnssg5u9you0gwepltgy4weghixhcry4qr8gd81y1c589eocken299bnbmpd0whw0ly55tl5o8m8y2woagx66wjlfxpmc2z4r8p43krblsnfzl4rvx1c0d6o33vzopk9u4iz58enb586bspwzn0mwt59ol9pj8xfcbfpeiszoampv5zarykhhym56rgwlnuc8in7sehm81hz6md9vvadn32tc33jtgv2k1ggms9bcc0k42n5l64a5udd5iizcv0kzbqaw80979cywflz16g01p35kwd3jhiya2979ex8guhi7pk2t0oa7a0cr2oqst8v1xhmzeliyta4bz74ogg6ry24g01id9vhbrf1rxidebjnbe512a70bmcno15n5d08oslfy1y1ieit8ebp6gocmk8gq0uoxiwl7o3wp7qnrnhwub2hwihx7ezhtk0f3032beoia0xu1jgzkwykn0b5ekm0dhlpcfposnfxa54whh3ui39qgwk1ym9bixxpn2oaixo58l0sa9fvo7oqvwv975rtdkcsugjm6e90hwvi9zi80ap41a381zfvst3ky1i0798is6xf8ciej50401g332jfmssyehnbjwcxuhsfv97jmegxke3eded9h0lx90u8muermn8zk74arzl35lxx2f7ozcpm4omvojykq4ty3o0sswpk7ezh5yks5segcn3jwouzjowr379h0w1mrwer2ipraqbefi1z5rt83rahvq6zvldma5r1ahi4bws6ihfnocsbad5wjvr31h7c2y',
                mime: '83kfyyklo86rk2xyhetoloylg82gv8lqfrvx6b0eas7v1gypqi',
                extension: 'wrya1jincts8rws9znrmfhnt1x56lynj6kdmpvbdiwwxafofho',
                size: 7998794875,
                width: 341996,
                height: 573747,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'g5sowy7oq54l074czy45pfvh9xg1i5fp7ndzin22us97ft70x3151qcaszht2e1extoaq18giljwxxmdphzd31odkiwrxqzsy2bz1aqzqq4zw3m9j4ppxqom3xwhlgge9bu9bopqpuy3yaeze67bwp2gqr2nwi1h8f9lt7ysru0cfvbjjuzlqlryvlyamss3an4oll4s0q9bym0t5jirk41569g2ftajj7kbv7hk8molr4v4e5bzi9dc3oe6lx3',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: '0wq2pk5fjiur14mivn6h6sj8ptkwai94n3q5wzcvn27mcardg8aw8tnkpgx6yugzbht5ac4qq58',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 847243,
                alt: '22bnph6b8cyyd2mr0srpvtojktfh8thyu6l0gny1yuna2xu4517u0rby3v6uph8citzmmr2aav2e7t37ftjk9mlvtxg8j5abh9xypxcu84gd73oqg5bonm9xjkzeq8r5pqwe40d19vwazu7pxbkppy8xq028wxpvjcogbfntj2yjlallwq08tisejzlnrwzx029k3id6lzjyt6eftl29inwv3x66eswp0i118iuzhklx6xxyfb3o36sekczu20o',
                title: 'j4rygpyu19l1daxhcm67o6l7nf0ybfmplba642v0qokd1jkwjt5ltfnid8jobvh4j5a3v4kgug3rw3okxgrnyeybse9ovlj70wn376g31npt370hip3wlabsakkncpmjvuzhktd3vxuqtzeonfskwdqddcw29ik2l1xfegeyv0p3ddppfydjwmadxgl76b6t16l6ct4hra2k4848135pgp2vwdta9c1q51vikwc1ej17dzde0la0kenc72ufqht',
                description: 'Facilis explicabo magni saepe qui maiores nostrum quas eos. Reprehenderit dolorem voluptatem. Error nihil nisi. Dolorum blanditiis inventore reiciendis rerum sunt inventore voluptas. Omnis facilis quia voluptatum maxime nobis non inventore.',
                excerpt: 'Ad aut doloribus provident eos. Temporibus neque et. Laborum deleniti delectus accusantium voluptas minus libero. Et commodi dolorem sunt. Aliquam animi quia provident.',
                name: null,
                pathname: 'ejn5t6qshzo7ht8m3stga10rumme5yxxeiaas0ogkkvnutvutwsshsherjtvkv7tlnurg0s4hvji71a4n8ylm7tj5juh67xdo573rfas8i5bv8sr143zeq33n3j5x2abzex4he2ysnihts13790756899qtl4alzxe7rn8giabiqkic54wq9joesh7gtfxb3vzawr1knwi7hdflb50z7kyh31qcq2mpq7ko1rd97uf3lnnecgc93rhjn2crnc8isgdtd0iseb7vp8txyz6d34y1i07n77musp390phdfpgvn12o07824lisahjeqgbye724zdc82jyxl2gfwvf6kc2m87yim5pih9zirbfpz0fyurqx0q43wh10wiqhy7isq9mpmts03522cachv1ftxfu5ghfx9kw2091d8kvh6v1afsf2rsg6jq9921gfptt7umkwblehvrsxuu3n7znxwq9c9ufu0hh6ts3svg0iwdgz8i2iva53mls5kzedosf17nqkf1nptq9cy2z4u21obpbe2em05doxy2to5b3wmdvrb786b8alif31zenf77c0j612lkf0v8flam4448twq995odpmewoehod8rlmg2shhb7oc48442ya8iw87i2apz1f3jexp3vkfvmm33fs9kkmei91azuk9mp0m2j0xz4e7gneknr3f7tnrq542mch6qyrxcf5zmy6p26dha2grv1sx05lvfibymxngic138vtq9wadpzofgtne1s2zq83r95rg838p4se033ixe11h7uy58oo8gnq1qv89xy5ufo7jc3qy2fiui3fjl3fqd1jfa8hutrqixp6xrhbrh3odytx700lm79omcamjsoz7y9vvndu65a92z2ehg7j4s0u8s7o46spahvm3ge846ayx29q9ba541f1zwmqlgoccfsj23j25pmly5s3o472hbnw5nhqph4ztamhgrifosyroiukrze3c1xikeo9m3uhq51vfb8e74l25s4mxwpcukf3f9',
                filename: 'mk36co7g61y114fesf2optjaci5su8a1gnq1cu6lvy0xax6amvykziv4n4usz7089rdg25c1zr36b46np3iw288tq1xhvo252myph4ygszx3yua4t8h8ptlqurdkskrg9lc31jo5h3v534nrujwmvz4k1c2p6582fzez0enkbhqaw26tliuiq86ilr6gm6tekxrklj0zy8k3hsbi6mj3kmd3utew1fb03brp7in6gs7y1au0elzyfs4szmhdq0e',
                url: 'fg0kba7mjfd13o0ch9uemgnx7b0tzoxikcgqer6w70ntlpddl8veat6dssytetvaeifpiyr5g4m60e7qmlol6wyhfgk23kzrima28umbi566pw5gla1up6qfy9daioxfzlx10err0nerfsbtfp7awjqzk9d9pfizfk3dhgk0cqsx4hueiz402jo1k2ope7c3ni96ez4spe65vu5nzoo45zh1ky1hotm9lsh2a6rxurtlhc16xvzsz6vw5c5e3n058p7b2o33aovkuxukahlb98sy9jn17xezi8mfo0x88d2dhd4es6aobqvbqwoe4qy0yp50a2orur5bp7vytregcjzt217e3oiqsob4shw21tve29rucghgbngqatsnnq9hhukwoaxhhroc9n1oguzpt092rido213p6hpf4i2j5zv6p1l5qvwq3bvdac8be1crvvo0a4md2sgp42wk2466wzshq159vkc5c03p608te9jay1oxakqxa8gt62is71gaay7zjm2t99lp1dwynosy7sm0duyync5at261fde6dvrtd0w1181rjva5in602ajcflzchklgpoo6wjele8ipy62xdmnu9hcm31h4fbcoxzli8ykh0xd7ubxhykl6a1fxf6lbkpshnlg5k1tu2is5jfhp89pfomixe9augs0tsp7dofcdneen2b8wj84feiusaia6t8bz600fj7r843mx0i6gbcwny0hhsgt9hhlki2i1etp2sbcz01anll4dnplwhbtxmifjdkk8pw9oirv4k0kafkmmo0uysc4846vwawl3lwjvp05ugvl8bbwdubt5h2fobwcp3pre7n504vjrdv0h78xy6ojej9jy2d7i7jcgvzeeqcci5a7cjol381p3gkiswuk4vyv96p5f3960g22kgp6dz5ljnnztzrfa0hlvefbhefw23k63vbff70y82rpp5cf4c8ac3l9qf7c5jl4ikpjuze7l9o4mjjr4bqk4lrwhy7tk7nio5voy5e7q',
                mime: 'vp2c138a2214jqewnvwoeig6if8q7mqil9wqwheujdie8nbwft',
                extension: 'km0a8q71ruef1uu2jzmfvx3bl5ur7v08vi4585cs3txfjmjd63',
                size: 6964135272,
                width: 595343,
                height: 749242,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: '5qkzbd0tnd6ubbxbcb7sspfngpdil7opw6a4vicc8vuc6e7clgpmaat56ty11h9obg3zns9l75r51mf80zz56vtfv9xznccza1nm7vm2n0g6sg5qsnkap8niixkzien4cqtyntbxa0sd0pvd6yhjrhak87bt6smb9wujgrjnsg1om5hgvqchfatmyp3pxgyskpi3jfnau38vz2kknciucscc989gm5pxk8ms32hegrmfwq7cs8detq235hdeh6g',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: '8bv1l622pl9i3ng39rvzmiy2kwceg4y6b6lwu1ctrrcorqtpaof0swpu542kryzeruojgvf7pcv',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 595122,
                alt: 'lre9li7i30bfn8b6jwzjqgwk0v3q12tvzsmbsqoyhee3tozxlgce5k7mh79mwyczh60dba0a2csbkwmpcddeqg8ipycehmi8qkwv368sjcqx22qytu2n4b2g9mwrgfh3eqn89f5xju47s8wmwa9rxo4ndx5zee3ge32u6vknlss0uxof43vgat9eabl4jj3j25gpk9qaw1z1rj2js8ia9ud0yz3jkgu39c7u01eaaxi213vettjd776z3z16fgu',
                title: 'gpjjeqc5izz39fnzoatl2a7unxg1uqarwr8ze52tk6q1go2piwdlwrul7ujs5vprodok04sbx6esfpzvcbpuvvvwf0f0g0sho4ea8erguq21dgnc8xut3cmx37axc2brgflgxttb7tt7413ysyuhlva7j85dksf5eku3fl2nhw29f17fcgoifk2u9fujpsxw4iulti9qcc4s7buzqm6g7ijg4vlchholovtxjemxu2gtu0488ap6257ta7301pg',
                description: 'Dolores quo excepturi saepe non amet dolores perspiciatis est. Saepe officia libero dolorum cumque. Modi natus accusamus qui quod voluptatem dolor dolores. Tempore suscipit totam beatae delectus dolorem ducimus occaecati et. Sit molestiae ducimus aspernatur magnam vitae eos accusamus ipsam.',
                excerpt: 'Aut est ducimus doloremque sit. Ad tenetur ut sed eum voluptas. Voluptatem quo qui vero vel explicabo nobis molestias quia. Corporis cum suscipit ut odio facilis culpa provident. Quibusdam similique odio. Repellendus velit aspernatur ducimus velit sint eum at.',
                
                pathname: 'rawdojx7w3gdxi28qcpyd3xddhq6nwrnbxf59rkq72dfnfaoqpipvhhej9k7e4l2e899xcfcuduz9kvuwegttlq8569xzkboafox31ifyabw798ywfexgvr10pax2a2z8at1rfoepxv5xnrojug4cnv17irw9xbecctg9qve3hw7ph69ndigja8qi7q6fbh2tk3kq9aqja2xj5djnhbl2wg1s7zh9ou43l2uch8t6g48pzgz5fu0wehnyt1qgmp9twqqd3xgk6mdzhd2ftfm6ggk24rf3ja5n3doimlnptvs4hg13s5ri4kgcjt1jix06jzykrcoae0evqqegingjq6xvgbiv36msp5dgr2z7v9dag6epi2q3dq9lrf6t6ps4rgntx46wz1czmznpmi2k52ela1ufk6zyk5r5glzu1fd65k65otgio8yrg2upvdbr6iuyt7beif0cp3aflf7ndxuzulxju7gki5wms6brb3rrbbcygs4lpn0xdskv66hxucdbfms1636v9eiqoqyfyn68te96xdd0rmk59zba9xq94a82mv8prf26isiff3w0xlx48szgow87l2k1vwyd7rta2p81medhcg29f8b6ter5oje6ork86unuxi7evswye77z909ng749wokjcb8vb8261wfokl4fpv0nw2txafg0lrmj3ybxznkep8rzjrrq7l66cinsl3lmg9ug4pg4wurkg2rg56woptd595br9bm6q4tqlysemwwh6k0wgihfuubs65a6s93q6dtn5xb1qi392v8zlgxc1jmwkdrkt23cpve3kctf3bfi0h8khgke3jatcusenrmsajkk3ldhhytccwjauu9tafls4euwe9wxiz4v4hgozc3qgpwigfudxhnlwaaj9z42maocdqkn5kyi2gugwexefpzkjll5l1i48kp8esj0n5sfj9vemkhdsklx8ry6j5pja0brmxr4q0m9bjfa5wayj51w9vxnz8df7kalpvrmtk5cp0ca8ow',
                filename: '8xbz8rdr4aj8m2rjtbb0r1bcfnx6gn6tcvjk00xcdktzabf9df6zowpw4p79sij6f3k53bsmeqf1aiho6azzzesibxvqpnu44nw1t5nio7zjqmjh6235s31wkj5wyvpseykzqgh5qzwjr8zf8v3eeze136paofoqa6nkhkdg3a7d1d89kqgflvh29aogc0h18p4em3cmsi5dkbgty2zw9pyhzs6xft2i3dp5bi5hiricr729bxnfkuy7e1rmynj',
                url: 'uxaocugvkvex43u8f59prrbpgjsbj7zqwkhb7fkvnbe4d350upqjcqhulp9rs2dk8ftj1knh91eh1ppcop0qc3g58qhbzh79uizs38w9po3b26s60snpatgxbaiksejj33zxya2bx0j3t4d6w8db6cmhn5xihika786j6p3l3sm25f77onlueh6nj3ki1xsrvp043j8sh5p5zk37miwsv57x3ihgzdrj2xkoovyq75573zvibtxjkec0fuphiicukjqrr5y8bycksycti8lbxbehpkwvzm7g1uo92yhyagccwlaz63b8hdgvvrvottyfrn6ilcvidm4zhctcuqvsisiv14xfwh2ldkbyz062y41fd6g337odjjvy5t7ndgybla81k187gf162rdiyudm47mivcqvjb2gc0sy1kz229ncqaxuz9biythlu8zw51o20hri93zg3j2wsl0tt82hpbnwxln83xd5qk5ki09bxefbr22q5het1s0x0aykxhjbr753h3x3cqmhberbddbbz50sugb6fcxu7xovqzb7wtlx79xy5d6d85fbf7wijolck0vwwngx1q8vbt42qu1zs6th9w2qio69p8db6sy7tcq8h0y8h7prz1zak5rvdughrrji25gtli6gu89j9312784j7svharb87q7imsf9g4tm3f62crvfc3bcuvf8px29ml4xbrgjp1qyhc7obm65c0hdic024n2j2asks66lm8qkxg3h47gvxm9rus277psa1yzalw4gnx7jojr1uwg6qo4es88mjr10v6ba51b6n0tgnt2du2lguqijrxkhgccekf7ma3eh73svhun8of2ocknoqyklnf1xznqbynrfuxwfxv12uvqgu77lsz2ho082auu0cw8o496gl5i0m5agd1se9ix43l31t8qimxathkit118046rj6vns8b9odjsr9fcwn7a8xag7txm9pmn1x6cjtvlwnxt9fb6i4a4a456lc9r3zd45hepy4trrjnqm',
                mime: '2ap966rka5trwxapjhfwping43hm62ajwh6cix5hqc72xr9p2d',
                extension: 'azaaw9no7o6xone35qjgeue7tezgns5yaxsapnq7p466o7ghhv',
                size: 4680943877,
                width: 582668,
                height: 315749,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 're1skww670upnp5osutu42blosb18op3cmlkbs9w1lx6pua22t7ovete0ouq24bs4qpdokycf3iqok5foh6lgrnivepyl54gci66yk0wf5jjnhwkl8g6o1mk19448zt4gg4k0vys794iamh53n3t0u9p9vbojisoiz452ls1ehoub1el9j1knhbyhtle4kqttagodjvpra8h4r2vtbpelyzy0njv3yettvz6qql8blg2rsk2ttdryt81bu1wwo3',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'moh89zth7ipadm58niulsjkh9ev1pti862snmzkqthh2pkv9g9jmbu1uao7z4fn1x2utumnzbgr',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 124474,
                alt: '2crr7ylu6yz90rjzyf52fxbgwjq5k938iozphnurzp1qfdipz5ptbauvsj642hjzwukfa4qpqwl31xy9kloz3od67si8a1fka3t2jmyaer2gdwvf2xc1nkrbujagug4oxq5ysq2esvu107ivmvyb5tf6ymgg0rt67m6g9grx5r3odn2wgx83nly0obiu44bqv72uy1tdyh42nrmbeqbsdkgwtxqhlrcz01xa0flza1p0qplbvlb2o0d194990h6',
                title: '95rnthogeugwcnwd6yui2i4o7p5a871lh2jotlp3u8ft500dn6clukwe3mogrv90cp9gpdmmzv3zews6ff1t6ezi11dnf5guz1km7ifhmyacow864xlwryov4jgnjdyyt1bj19iyx35bgp65kmh6fs28iu12vh40ze5je6pvdmbtm82qcco4oizkic1ciuo3a9xr223d2ajvbbejd9817pqdjzid58ijnrr2wf3qprokxeysxrdcxtzsh1c0kc6',
                description: 'Cumque dolores atque eos molestiae animi commodi voluptatem dolorum cupiditate. Maxime hic est eius. Odio aspernatur voluptatem. Eum quidem voluptatem deserunt. Sapiente blanditiis quod vel et expedita dignissimos qui.',
                excerpt: 'Et explicabo excepturi est dolorem voluptate molestias culpa. Necessitatibus et cum facilis magni tempore magni. Sit rerum illo repellendus doloremque sunt. Quia qui tenetur cumque autem ut soluta modi quam quia.',
                name: 'phe6larzf930o15r2xdtj5d73mjbktxk10dcwgavfntdnmkw0688qzt3jlqfn60s70tt26s36ct8ixh9ie3sxmoh7g85h9sl91ow5u2ubvthrnxbb8w5wxh9lkbprkbr9flfbl9zkssvqk9vo19ssejree0oknuuc8n5bw26gh5hhlanq7ai0pdzf6n50nfm55i3j6pcfh1dencfh26k1ii7mxufe3924cwrx0u4wcaohu1r875z7f5qy6wrd9d',
                pathname: null,
                filename: 'wrraejarzgk0634p0xy74gby8n3atwh45yla38u0k6gj5g5vcebbdhduw8s5p4jsh540bc9emioi611ghuloav1agkioh9a9biiag01ljfq7wnq3u0hq1bbnkivve6knffu8cq6wirkgoxy1ro22zremvqmnumy4kvrda34mmn6blwfkdf9uamiu9kewfyhq1xwva8401sk93bm4r0w6d4ib6558v2e5z0ew6ar040k7ucb8u7vq8i07l1iq8d3',
                url: 'a5zsqjjx1u329k4w03ew4ibrnj6j23zuioyn0qazivzkb3rjn9afkxdmd3ylcati6te9eorr8a3ixhn704m8i1rdcb9l8ju0jjah2op7hdt05bp3bjcfmqpcdvlma1mv064y07vfvffrj2ifz6wvd8j20hpwhkow390cd0nugx9tunonlf0wd5xgux26bbrf6ssxtdcp1a5x7pc38i846qhwr9xop3t8o58ve25gkarnam0anyed6o0peiiud06orzgojjyv2lj009s83n9rnaa24eldrqv2wybf4qeugjq5rdpcr16epf4ort7jdlk9ugljhgrrms67ccf9wnydgygukie5lo45fzpmwnh36n1c7zqp85rzhpnlpgho1yb1g5g9x0hjf890200mxmeogygt03un0byolungy3lrpnw6hb51fv0nz8vzle9b2tm9uhre9mv0pxue9537vlovb45eaeka0p4invd1ns1ja8cqei3qzxu8qdfyctb61bhzb2rm5pqzvt97xaa8t7dbcujnkrd3l92nui8h177ksfjbrpa45l2fsqdkkydh7gyfe8h6zuxxw253fwjwdt94gr8r2ctr08swetsj7r266lij8yk7andazi9pe4huq40e2hsgp07bhhqn3x6mkqeqkf0i1m6erum486n547upfm8mbdlvixaajhbc58k5ix1ifm49x67y2rrz24m3f7yz7gu5k31rlu6k77cmwvagpa58xbq7ubvdow8rlo8m87r483no7cqy3os6qb82qbmanyk3qyr69sm7q5txcq5nzmorx3spsm4810m6ahbg2u0yl0fqefpge1hzla7vs2vee3oed19m8dwszkeohebcs0l1or6c4lpazh8htj3pl7zcph47399i4ho9kttwj36qibux6uy8y58inz9il0mnav70foxp8v2u5cpqqcj9pykb1hg4arxa14orfsgr5a31jrsnufuqgjr4sad8tcxnfhu3j5zxklrabx17lthutzv6',
                mime: '0fct1nqlaw0pmgs5ibpesjmhrpc5523beh1borpd7bk874gdfl',
                extension: 'jgk9lg6lx3nzpwra1t4mui8elhmc0tqtrwa4o1de7l556v96dx',
                size: 7003477467,
                width: 767838,
                height: 670909,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: '5v8ch9qmobpmfy8khr7uqukwvte7egkmay3mpx4mi5xbaxlnkxp9xdluty3rtbfvn7x7zhddwmnx7k7t8o80xnp6uplj3is4f37no1z8503iuq8n8x5kzkq5oq6pt3ubmj7ih3cvlqhfxduwspgabdgc2gxlop7sjwwlmv558ir7ge1ud0rw3jl2s0gt4dzpxhtx1bg8yw3cblh92bue0w8xafl6skqm1abgh0srs4tc3tajov5nhxa5dgpc3ve',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: '3fwx9jp7xhz2n4fnm51kd8l71ufnpsiarlneu06jzf2txb31waagg5ce5280lo7vitioxnyoyzk',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 335445,
                alt: 'i2v8we47n2xe9eamtk6hi53hxkbsu7klspjq0l0ejfeg4gzsyciutk8npes73il9s4b1zl489tmypkbgt3e8206y3sg8u86ktf5dw9osh70q6lxbezh2r7uk4fdh3e571pdx9qqqzve35ic584j5e3dfq965qhs864aogsmqx5hhhiugyrgzbgqoz426liuo51mh68x0h6831b3hezs20rznqallzdk9r4vky3jn2gaabkqsovusvfpbiauuxvr',
                title: 'tsqr5jv2usqjzgi7dx6ciik3p8t5m45dft9q9np8od51eyyddqtubb970vfhxmfh4kumosps17rbhvcshiur1q7s1qxp622x1s6k3go6z68flc785h4wnziaokjcs18up79hs1b4zdkf0qx39eoxij46qixfw8iftwmopq7ber383pxl9yuwyfs9uufsjiqgtd6sgah6cgxg5fu4g62jpzd5f9dhqdx5vn8h6zhj45dxnnf8amupgdcpom3mvbh',
                description: 'Iure ut ut omnis deserunt quod perspiciatis asperiores modi eveniet. Optio et atque reprehenderit in. Sed veniam et molestiae iste ab qui. Sit quia rerum ab et ipsum. Non quos omnis est quisquam ut sequi et et nihil. Dolorem in sit voluptas cumque aut error et in.',
                excerpt: 'Eos assumenda expedita reprehenderit consequuntur et molestiae. Dolorem voluptas non ea. Facere veniam quia. Rerum mollitia facilis a quibusdam corrupti. Porro aliquam doloribus rerum ea laboriosam cupiditate omnis impedit.',
                name: 'btkjfsj4cxv0284jof8a65dpa9lxr2kzjcik51x8kr40oe4ny5yb5y6ly11xzcb1jz9hh7sgrrkp4y7nckyylc174s3e3rj01f25kvzwhgq5p13nn2nxuy09u039eb42raew32h4k0bjs6ymwaxjeyn8nxb2fhfs85sbuv4z0s7ydwv7398fldhlzsir59iw2qpjsqh659j1sj7yk3etgm00wwwxcdumw5wzb7n1he2vjg3j8cfulps2jbwt5qv',
                
                filename: 'uqore5b285gfdcl2tkbi1o7tm6l27two1gf4khd5e5mt0vuxfjpf4seh6d2skz4e4xuq9elyv55pyngpjyswvhqjqa0hs19b2zvl7df3w4alxhwjh6e40c9wd7rgall4o7gfaijoio3c3whdd1ij1u6f04soh8gm4j4j44d9318wwueb49iqzwlacv7emeit929t3bwpy8x3p7y8uyprlf905royjwlkyds7czw6l39pow8ywp6jvsa26hv6hj4',
                url: 'u9572tibq0rxkcpoy0co6zj7pxhcz37z1214elb340p43450divjqa4fcwyg219wza9ajkabmgxfegd9kalr67t4ocg3hqfxiil0cd5surdgfn1dldivc60j8c32g8efgtbtopvqcdmooe73abjioqqllcwp0mdjpjibict43zl9f62i399v5d6yg60nte5l5p1fcqwmlygbpvwcftdcqf2ydm1qmfnkzo5onczqisyn7zed60693uux9ftyc3ms2fj1krexe26amcynzid2irt1siyqc6ukqnlkp8vu4e17tzvenqags24u73xmtdep1kuw77x9dmn0bufp8sxjetrk2joc6yh362d9p4nxowsohvm8zxdul58935iz8qltir382kthr3xkkzh7tobl2hhqy9p8yw0u6znthn6m8hu21viw2n8obtd9kadbnqpa1lyf7rekqoj75k7hds2r32ap1llldc7skem5qtytx0os7c9yr43wqp891mqoici5s8kidqjubkq4h7vi4wnryow3p81kuljoo6jnq3pex931yz1fyr6yc929r7lpzozkwi68qri90p4tin6cvp07z7xg345pk3qb26iac476joanf0ypl2w9hnjp35oji0oxlonmyt13yvywai4vgq1c2nc6k0a25hs15j9p15gavd90423t01uweatld8psykon3fkupn8hva7larhrp05ojrcqsvuj9zr43e5sfd7zp4xakyutv54zmb3g53ygc8ctt2ofxks8susgv5eqoj5076rm4kzqnpxtvhyb71uzjt2cg84vff4axsu3yon8sa78xlp8ywcajvxcbpf8oyyd6rp6otlwcgz242k5b3lp3sqwwnnxtl1oxdjx3jyorb3pn47vvvzoftvtw4dbhjgh6emm83b8e5f3uh99mulvg14hq51vfl9br7zthefmsr2aotj2afavwvro918kxr94bec4fvu36zgu4q50np684dy3o3thphy25vrxxbrv6pys',
                mime: '6rjwz9602fexzuf33qcp4scnu1y4zg9dj72wmjhhf07abm74ru',
                extension: 'sg76vvbtzq9ay1ak1kybx63tbi9j6ffj9zn1kgdenozkgxx34h',
                size: 8607777119,
                width: 754987,
                height: 608140,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: '1mzxa08ft0e9k7u8t2gf7ryzsuh6yf1puqaiy1tyo8g9uoc8028fctc7g71n9qp64hsc5b8uxps0sjv23fnb83ut1a600hh2a89ytdcc7nomraxsiw3rabqe2t5219dbyvoi8ki48l1bnzovn7nnvap1cxmc80vurc4hvg3arg5g7vh685jcsb4p2u8n79hn8ll153ftudm2rf6t48sm16ntfwll48jeyvg9v36mqioif2a4mk04gzflrzh2423',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'xi213ddxyiahs50ify5jcs36b2jt0w8psylfkx577ko3fy8z653e745x0aiv0ro7bn5jkcjhsrp',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 341633,
                alt: '1myg48s9s3fjpwizqpmpd1gkdisnppso5vww1y8ntci8alunj73fwobljsbe3tpy674bnp09ky1vqkoplwn8ibkuy57bbgroiict4n6y975wclwrt96apfb52amestynpp8e1ef3c0j2bf6a16ldp5fc0jshfhy2b8nxgdbm7tobcag719tz7vqlt19zqvg2sm6o5vdvquglg1e1mbc9fp6hqilntt01mrxu73cb324c82bky4cxzf6yollvfnp',
                title: 'v9khhwlbn7kvru24uouhxrvtfnrpqruzte1lbqqttn0tx0zi91en3asu5pf5v39ba90xhnidqv0w7tm3erq4z1yeyqjy3e02pkhoyh07nhj7fvoek17ca3q8j8kse8p47oul8bi52ul8q0g0ehzuhn5cl2e8nq3hj0qgcrjxyz2hdp93jqp03vy3smk41nib4eorfiekmv0uewkkbf75vdtt8zeo8ng34w4xc48nzyh4kl233avokqf3f2p4xkz',
                description: 'Amet harum pariatur amet molestiae enim sit. Quo et est sit mollitia ut reiciendis. Voluptate ex id qui. Facilis debitis qui ut. Non perferendis dolores omnis libero.',
                excerpt: 'Quia voluptate asperiores autem et quia voluptate at. Omnis animi vero dolor ea commodi quam enim. Nam consequuntur illum. Nisi similique distinctio omnis quidem autem similique. Unde non laborum.',
                name: 'bg0etq7n4hrkpv2injepqh6e3tw2da9g0aashpmvyk970ob642u09svtphhwl9emcsbqjdimgzmsrgln64x9uoh9ung6mlsqpf9lsvp9bi1mj1yy480av2lk9bzm3v1gjpvfoj6p7mdn745ozolx3gktfjdt9x4yv6dtd5kzr7lqkgy09mn4m03ceoqcxytefiwrrhymzdl8n4mwxnztfd78yuwyuls5l0m5k6mlai6e4wokz9m7ua8a4thy6zg',
                pathname: 'qribau1r5hjj645g59d6sp5xvnwk40cg3n91jz4nevxsr6g8se7hj23wnqm1u25uq24rk48dho4t4w7t0tv95awskhin9la8eaa2wu4qb1p5yinaxvvi2xc52kemv4v06avvnt1k0osnauw7ll9csgd5phxbjsi8mf7bij6spo4ald8s4aj2qi4f8snu7ltqkn6andmg4udsm29tevvda8phqlj05k7zqb3cm0cumdhxjrr1ym5wkyfu131jg413birl3da5wq0rw2chs5839af33qgn62jz5g6bg5gb6azuhw5bsysn2am0b335zruwnqfcyclzb6z2y98db5gvd9lmg97gzq9q3g9phmgnkzcg927l2ouq5j8i32tn2zighx3d8f3ykp4l56grlnslisqrf00eo2ciou9c8mtu7qv21edfq8j2frfzahk4httznxsneacorxdxi4fald8n9w6tx4fbjuoa2v05el299eqwt24mrv5ejzjr5o687f0miok7kc113h0b4i67qm2grm51ydz9ccvxc6bdk93bqtbvxi4tob56c4tvrdle6qskekdx4l75alljwsqjiz1lky5ywakwfesy26vb8cd1rd605g3hnc188b0t4qubj7k1su889lgk85rwe8g2bw2yg00xlhct3gzqgaf50yg4p0mzyqnf7qfq9rkpduqyv305cci44ksxemv5bg4ciemgdej9tiypkxmo37qla5va8t58vyppkz49vhm9yqy8827ic4vcwi1o7m8g7slw6jf4yptsi8fudsu5eohcx8jh1fr0lpflu6z0r0dquay0dszafv2i09eapugpkoynd825xbqwnombc06jl3t80k8oweheajmnm00xzlomgjd24v9wvby2yfdja0phy5ksyhnsr7a4s3dcdowhr6f89lnr0prsnmc1mxzcjx4ekvvgaa762pfc1ef0qemcv5w0699w6v1pfve815x8r5r76sx1d51lv301be0emvsvcgvtfex1',
                filename: null,
                url: '81n9wdgdlu2r3i9544bixk2fdqsz8jy2x82h4le0gu5lg88ialwh4uzudr5ohaageky60v5yadlymauwmjwqo8ekhcszvg4uqss5g611mkbua73zi07ccgw749i0m4qdidj4nnoryykrl55umm8sdykefekq5l8j40leooymufbzegyquj9zqglxsyks43pjaiveuc6j8wki4g9u4uzat84yqvijdxncpj07auo6vxpenodhtst3u4v5ho432ifpn8e5n5rapp8u7ehwzjlpzs9ntgf1hqwflegd3vqicrcv9eos34onh5pyehv5sej2ngd9tpr21v3jtyeykzsczu8w4j2t75zvktmtr9okyg2yhqfuxi8c3jtd2bn8lz24x8ikkga4s91iy013oz1ftcxtteh12fwckdxa6t2lf8wcmuvvfs1qjt1ehdbtxbjxevcco3opg56pjj5nt5y1n2wf3pxend8xyrsjm805aj5pftegikbn7xh4eisu2e0pmideo12em9hkoj3kzx1ggnzqh2jnc0j0kj4cuy3d852og289ig7g57tsw2r1n6hsltpm5fwuh3pgfilazviq1asgtpxiykl8ufu24h6jafpjfe4vf3j6zucded40poj4w2eg1vh3eofzp6qwoj5bj10s0h5j77box1dfuvk0upe1qcppjkrd42l5nnuxjjlluxkq5xz4ig50cnnhy6gd965z6uzd0p7ljgvrawq6c7s1o671ldedwpyuw0yzwt00kqa1avg0en7o88f2dshrkye91rs34q1g9j74fljia075bmk1xxwpo3ie36wn7iwxfvo0zn4tj40s69qjwo59d529fffcizgujjdl9elewldd88z5qmt3iju260yp498oq7okqj876nk2qzwj1x3i8czx4y4mho8pioqwofunznblxs99y6m3vwskogskr6k13v9pl3d2buof62xexvqwe9jci23qhm5gxjp5ikg4yt7412l48pki9zsdzclc92xf',
                mime: '64y2nmqepxs6qxuzt50f0e6qf5anp8d40ahyayxwxzkohbou1m',
                extension: 'c2jbxco55m5vqrnng1ro88ze79ir0kzp3phwq13cautyp7w8x8',
                size: 7340406702,
                width: 881773,
                height: 379978,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: '60xinw2pbtk7u6mzphnv6f0n67rh7ui2l99ahlgixw4e232t2iq0jrjraph22vnvgrp3zjc23vgh4lwidlf3rx6wjptl1aintmdd5ido1q1qag80oxdv4t4ypm1wiexi110cyt451p14efmxzl226xb9frrcyz0un0mxx6ce91n1ppf3lvkwe77xso49tbrmqic8ec6mj48zddfmd9qm4fb2wco314i8xm9vuihw78j6y7y2t0r1itr8lmb5ff2',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'nkfq0s7nybdgfytos8ay2rzp741nccivttad0dvmyteo66h5kla4unwsckf4zm1wa8qdxeilqv0',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 712977,
                alt: '62tn67t9zxzvzrpgvxiur3aswz9zv4tkm5n4jcljwluwsq9oucpz9irzjwof99ze6ipx09s2av209vh1ngkbmotkfd9jafjnzn7kr48qdqb6ngvfkwqrdzt538uwvp2xcjbb44vxtsdu34ymcc6l1u1ulaxv8dqdrjrwd9v9xmpbubz4vk64wxac7a2du16m9fptuifwd9hz5uqj292caoinurk78vmoy0zt3p29gntyfc808hnpcqvm17owzxm',
                title: 'vsfxdlxhxfe449cik4otgn7lobp4rqxudj85p1tyjxi1csm2jf4n2z6dstvrqv2vqpoc4dgnrzbr6qjzjr2aqiaj397z8lv6dxebx1h0fua4jkyjh3ylzwdsx313x55ide62wtq5ghvpfzjhui0nmpydymrwlhj8fkurwjmew7mz2a99djcele8np2qcw5umx6dlualkjvfqjs832bi95lshsqyorx5njlzlnzcm1mm1dmdqm89kparhd70wi2w',
                description: 'Vel consequatur aut odio tempora temporibus numquam quia ratione suscipit. Necessitatibus inventore porro assumenda nostrum quasi aut qui non. Tempora odio iure tempora aut enim explicabo aliquid. Aut dolorem et.',
                excerpt: 'Et soluta tempora et. Repudiandae nemo numquam rem. Ea quas aut et. Officiis assumenda saepe expedita.',
                name: 'je084nklt549k6xafq2ef2dofos662ggejw6a9qkldwapomuwc9dflycsj6y41krmuq8khm9cn8m82jxzc02es7yuzhym9kahoxasyd49s1ljfrwjqv0hat2e25ns9217trzn7lbiwc19zk4p2cssjzit01wm4ofyvbzn0k7w88eaoh615e0lib69n0c5qztkm8od8p64c76usqi2lse2kyp4q69ri9eaeiorpqvhu6foe989k69a5mps3wskgu',
                pathname: 'zp7n5naelh8pq66by0ujanf8xkh75nh7qmbowh9kcdixkdspz2qj595pmcgpet27tmh4lk856bigdk9qqo3d65vwr2mqywkv7u2v6zoslr28r0nlci291a4yiu8o4fy1ndgib9ho41bahx3b8goisgppsqy6rl5gdnpn56pkfu5ea42bibfuu5sorat2p16n9wu07is0sfir1grkj1rcgj139bz731dpifm6498xtdubo3mx8d4dby4pks15rx69n8pk6mqs3i8bwf0rqe9dxfgwtd7x7l9h6091xgh7hm59yopg7b3zrz8xw88qbeipn4tqdhbq4bu9mqts68ixjeqnz2f5gozu35qr7oftg3vuamqryko8leue3ea1ucss5na7zisr0qc1g55bkvid5eb70fhzq4wfbynkt02akws7fd99pa84yu2lv5kqcwpimind114un6l9smdqe9mcl8f2o088oa44k9onqvez4778pkck1qg8692ymqbf5yo3b8pzhry7yzvojxqdb0hffb4yqwqz2fjmxoe5p57np92ccvckz7ckgt0xeynw40p0uvrau0cwg1f2pq6dbli9n0tcehkutl6u3zadt9jr4ccqr8o1gh2nwholbxmlwt9vj9oxgg9gqy165u6pdnbd8dyzgut8knmg8iqh7pbvue2tx1ctj5yvbkypwcfuyra6yyab6o7hqo1sutruqoi23gi57x9qjnkbv79m54e3kr6bdgt59fk1oxq3aebfnh8mvg2cd3x7idgeabfl5w183h1z4vcsi7o4ffuq50rav5zo5mqbgt3jk4wst9pz5lu198fzwxlz9sxmsxyqgshtk65fgb0020fv8qemit0wda7p8pi1alakxkbia3mwywzwtwdpg1rowitjad00z8agd1f1ne4tf8c7r4s0ts0ejrz2ggkwwri0n0mag0mqm83qylhqqvr0td5nawbarqefl3cd64ve529o352uxgc4k6e3k9ku2ejhgqju16tk0t5e',
                
                url: '4hxzmrq8xcr97j3zu4iies4o5hxekgdtfgvcca97w4hkbe4zojj4gkm3xxy9rwq9v92a5oyb8sou7yo6jvat6pb7u067ipixsfmqrk56u7hj1p7d565w6owmd8cwoh6kl0cmxel1drjj1zqlmufklaip0ketptnyvj4qujsw2f31l1arobsxxqmzmerlajsc64fctxycu2mw0fk59eelr05a4kvcthpdqmltjln8ybktphy0syd3b8chj3btz72d8sn5m5py4y1rq417wrkyclegq05gysoo855706ks5ia106pv3v2kaop2gjhie9yzko5g0dpsqwulmr8fjotmxsx4di4k3f7ezeksa5p17nsr66e2mwjaxpc5l1mu52wvpkobcr408fz8fg94nqyi44pt63otttfhk8rwgfdhnmiayf91n9gdjgr9h2fjlrfz4t2ldn84jppgkvj9h8n80qf169i9vou1ty47pos7tj8krq2ljtn2klnrjtsizr1syq1bozjglrtdoc5vjikik44h1bpsw20pcwy5s5fsirggz3o4qerklz50nbsh0ufn8vsv264opj9mt3nre5ddm20vr4sd7srjr6fc03v5dzjd4ejw2ewar2ktlawakrqpx2nui2bte8pr0o8rywi543i4q6071que88jaq4dw22q6gim3uvmnbx2fx6n2xqkrtz5h5lpccsql8t5xttciap4rh5b3d9njbkwz71m7viu0yfvtjj76ojkl91t1um4p1lh3cs4lq5t551xpkt4w8cmlk9sy8chjr3fgxioz0tx2sifrs1rwmug7sp30se8gy50o938dkrl4ny16rpawcpy9oomy7lxkcy04mcnexmf8hcu01fer2n3vqms59v9fa67d68utcorufbdho04kafn7esexav2le8cf270ad6tcmh08woph2yhls5nqxxclz7iljnqepu3l5bfsulempom3p8jw0bq1ugf1tg8d1petfu4tryni52bmxyaj2wrb',
                mime: 'fxbzfycy62t8y2y8mywb3d28vwcdpgyl4fmztbst15w3qn667n',
                extension: 'k4yuwytxewms0bcxj4406geturtrzd4mb4p5gg6vde2wdlldd3',
                size: 7674367456,
                width: 894569,
                height: 477624,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'domxccc50gz26wt3ny4o0f1bvp3l7adbewvi2gupnw5xd21d4j6w1cu5075nnydlqc3ez8dh5o2r53jwkaqdjjdwxpr451jq0zv8q9gxeqnxk8lfypr6vtmga3z5uvbj81ftt8ul7v2753g1csph536zbn9u82s7mdv4gm52qkrfeaafz1oc0js8i5fybwwa9o1pbq7sgeazn7lvsjro87w91o3nxt3wi9i4ffm6o6ufn9w7lcix249cdhljtkm',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'wd9gxmpt809id26ckeuiyvi5okflrp4g3mkbd5tqjfx0yl8upf3ii2rbhh3duab8qrw74tk6nfl',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 491576,
                alt: 'vog2hj5ipcox34pw1vnxt3erqq09j1sqyeibgvmmahwhbuai7zw2av608sgoedwsbsnqadw5xrszjdwc80bhbw62bq5za3umzub355noe4t0tl4h9wf1vsai3zen11xjdlavfm1o7m0wzm2c1l63wngx6qf4gls34tyfvgo73cgi1t9wvx5yddh95hk8c4izw9jwatss6dhhm1vz7wxddtbdstmpwgcu4f9ac7bizjkzwbp4m0fvzs9hwz2kgxy',
                title: 'q24rljpvk3wimsaqc7qowgaj15w2albxvl8k66e7f6snhdi1ry0idcy3vkww8nqhtmwv3lkxg9x8kvs99p1vj77jd0vsre59yfsbbv9j5i8ubjajzlidh1eokmg7beq5e1sl32v45kr9um1nodhdo6jybkeijd9tdn6znkty86d3prjmb0wne6g3cvjuv2pi5mdmvpkqz7wf699162n4dntwiig3iz0nql7usgd0v5o13oq9i7k1axo9p8iqvku',
                description: 'Hic aliquam quia sit optio esse odit quo asperiores maiores. Iste neque consequatur in illo eum. Vel magnam accusamus occaecati perspiciatis aliquam aut voluptate ut.',
                excerpt: 'Enim perspiciatis et veniam. Blanditiis quia accusantium alias animi. Nesciunt unde fugiat quos sapiente cupiditate sit impedit et non. Molestiae et quos consequuntur.',
                name: 'p3x2ocf9upolqkg1mwvj08iu22l1ykcvlbixpcqp13tatr8wb1m483hc2l5eqbg52b54645xzaz9auf2yeqy72elvi0y3shuhak71c5hjzk2tip4leeaer8dtvvg66yj6912rs5be5avwlh214xkr7cyrb9405mqazoqaar3q1gqferi765v11b8esglmihbthzji3cf8xjh8bit6aqncl06tltb1i6t4c66rlgpv8w7asjk28pg3rqmlcdbaju',
                pathname: 'otnd3q9vjvdn8m2dab1oav2xujeghan9nb1lsv3tzu6p9xomoziq3khtuljavrwb8dh0jhqb1ejmo2r1ks1ijajxqkdhg4tqosb84ysuq3eaz5kotj5b1isomsjgs9psdq8c21b8d4qaafli44n40erw2nyo7r7xhg75tr3y6082ji26b0g5swnuahip6ght0mwa4hvzm1k4sg8a827s2nhg8hiukxl9iijqm60ctlcsra0xeg1355abngtgd1bwb8k7ljyxd90w5zrke3wbwk70qu03cinbbxel19se94301dp9df5hn3o744h72hhm8i1ov4mmxkx570f1bqtzyqdft5h3casmtj1rciz4pm9gxrqd8o6ao0kbqdmf8sblr6sqvi6cw5gcl4c9c5uw664a90n9m9lmqrksf4dyeu0mmu7ey017th08nj19x2hr4xyeb4ordrbsqf6fvfy1gnw1mcpdrrybwvhc484vk0ltqbk779seb4l6ey04zygmtj3sqtbggd64yugeaevd0j26fhx43qpvpyxn4ujhv3c48st6x61cx9nv1fo1pkaqe6v6psjav01ug84vjpmxrq5nokyh7qihl30fbc3cm8mybxufphvho2tzcpsh1v5enw9zjnbzrh0csuw1dvm5xmwy4ybpz6mgc189tqfbche194avliezztcctbmmhrn8dbg9kxprf5n94hrnwrt6ptjux9cf94dkbw0r8l5omcljdnjl8np416ss51gk81ozq2zpo82emqv5owd15ggj96802c5g0qgwhzvzk1wmt2m6gqz5fw2et2flhfhs0t8ausmehk49g1jjm9b84kbc0835tz9jpt2i8odroek6r9fvg1sj0hpczgae5kahrk5xw6ic0nsgb908wp05blugu3yyysol8lfdjt7kp110psu43td64fs5c20d7tqh80ubptyhky2obci95ka4z108ms0u2anzjapum8ctptwrq5gm47k5c7e5g6jsp7b4hxg7',
                filename: 'wsdrg9oiyqabu8ngy0fpg9p2pwvzgrrdxuh0z2qthpvj6t318dyzl24o6fdlhlh79ls7vc8pqvps3uz9m7gdunadhyk3k6gprvp7fcbsr2pazek1nofa4zhfu83ysty80pr7wd0yonr5uptk48ij1cnq6ddxlee8ps9qlrmvmy0k6yyacayqvnuvfitltmfzq0pju3qfv3z75hszidnl63cvw4gx1v0j6pjc46nwaw0i852qedj108ttitn072l',
                url: null,
                mime: '1fwjafxaiwyzp7mzndo7jyucc2we86sek77jruaw4hlkwftrga',
                extension: '1xy61s6qtkndpdb9hr79nedv14285u9kye618o2rs7pype29y8',
                size: 7444434917,
                width: 550445,
                height: 641349,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'mpq434yi5b8x9du1q2q2p8u2va3p6fw3enxan5o8fmqvzhrmrtx5wmg7qcarp5vosepnbtv8aygdw9icbqvlojqt9m3h8rwhu2j3gy24gcu5pwleif6h22est0iijvuo5t71df0yna88hqhhjj436u8p0hprnz4tosvfxr1tv90g4xjdxjdhyacx301hwymn1mzwjqw3mwx7ory0xma09ueddwvslg7o8f8jo6remt54e75f9tsjn0087gutezf',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'eva1z0togbkpu8oxnqo6nm1l0lw338wwsjack10rza64xpa2fymftqot0rvbbmkvrd0m0q6whwb',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 617918,
                alt: '4suv1r05q1uxbnuqglmjndx01cyqy31jebkkrphwrcy2kgborpf9hm3b131aley0eifpchep8y3kzgfheh12ylfdl4fexiimvzln8hb354ly8xobufoiy4pwvpix5hvvrz5iua7ng14jve50pw67f8934w07zis09avdvtwhre1hzd3q7xwmz007e3zq9cu16oxrd25js9hfwnrighkzun9meoukk3tumdkwwli0qrs1i51m5b71t9u73muo0a6',
                title: 'o44rz9apog15wpz2uewc52al5ml32bv10zvuvciu3iddljbjzbe9aakiwi8kf0w1lb520kj8u3eupygneoh31el976kvwwag77jysgbyoqkpe7n211cpd7pzywx493yt8fusn19j6mso5httk5mo7hqfga6qlk5ra9jlq8e6j30hppx6wmhntv2s20jqwx98fl6hdqgu6pptk7xwfsnm030e3hvy29pfg8teezpn1s35j0e8ftdkyxgq4nuqprd',
                description: 'Qui est velit repudiandae harum odio. Quasi facere veritatis placeat sint expedita praesentium consequatur eum. Accusamus reiciendis est porro dolorem corporis est quisquam atque est. Modi delectus id autem a voluptas. Consectetur blanditiis voluptas quia aspernatur vitae est. Rerum ratione hic eveniet libero.',
                excerpt: 'Perspiciatis doloribus eaque quia quibusdam sed. Laudantium voluptatem quia aut provident nihil ad temporibus. Soluta enim ut sapiente ab consequatur sunt ducimus. Rerum dolorem nesciunt quidem ut aut et saepe necessitatibus fugit.',
                name: 'd6ch8wi77gumux549jk8vgz8xu59zbae7xsi04nf5bzgpt4cxgmkh80kq4c5b9892uv3utkytex2u3v8q22i7magj3blnn32qsk7ir4bwdfsyj8d9cz782p1fputbe64idgwbtsdzl07hpr0b0t47e8hql7zu0ghu20q0ia6vxr0dlsuv14jyrlzqo60q9ay1d73fg656fk63h8oghw6aw718p1l4rwh0jtzg2w2p2xkvz2mou42nbv2tjsh616',
                pathname: '1w9cmsifys4pmf8zty4072b0oh5exlfwldbzu3c166teldogkpmyzbzzdmcwi5iuhdr3joeacpievndhjd3rd5xmdmr43u1jizo6jdw3v963f02i8ha06bqlgeh1i3h3z26h4ft098lny90cmj8zac98lwawu6zeqzildkmmmk383eqav4i2h8s3hyww4syjiqay55cqco5hxb7yx25tav5hwdf1tgx44svkzwlci3zzzi7qz1fdin4vbms4wo10qpjgqsotvws3i4vnrankc3pn0qexn5h0udp1pb1g9uf3n2ebd5i8t6ztsnf3eyy5x3w256483hraj804764izl1kvw49je8d5xek5krczthboybakbvk7wqedd8w3nnutuwzmpd6lvkqcy6r47ulni2eqgtpccm6cxxkg4dvvzpcdiyc2rcbf12aqje1drpb2u081pi9gg0gtfdafko2k52oll1fasywwv1r4io3zxk2jvr5zuimsu3c9h7q6ecwca0pkiod576sxdk2vs7s6vk3cqwr7ib2y6jol2rb5jelw0w20cnqecprbn23g71lopf8ga8c6py97rells10ho80wvyrefqohkndq521te2tp8g6fbhdm4yj7azi3f0iqtmuxl5iqzey3z2iw0ojdgb54az8ug3vv3wz2ztw6ui18imipujphborbak66w9r77emrcc0tj2pw9rinh2d4tcfnwwqrw01t7y6zb3va8ibe1vk85rx8eao6yqcwnhlrsq95l6nvjemiq318njpwbxbxq7ogpsrviw5ue3ksb1lsiek2b2sh8jtocsaoblyd9eg29d7a1pxe31qjm5ogp4glq8p7gs8jeniihlbrq2pkrk99ffe7tlhncdgx5tmfcxfxw9dpz53i6bz9sjwnaeyn2hi8943pafycbvuj3u2t1t88ns3bdcnrvhmenl8vgf1gx1fy0l3v6g6zaykjs8m78zpfgntvnmtvy4vbxaonq2dtu7vkcmnalvckxop',
                filename: 'kc9go0fif2jfnkfos73qvhrhkonfsi714o8r6wnl57t04qna7dypbzrnugftcw97w59w75q6fgxac0c6oqwd9a096r35ywkyw9qnwiv5iuyxoq4oo6mz67808pdfh65w07lviphwjstl3rvqtifs7qguv8l0lbigfepy4o0u7g60na9cua3vqu8wknff0865vjs8dcz6pjl2lruthkz2vg6ncel4nmogj90dyhfjl6l4flixj5njne0j6oy6wwk',
                
                mime: 'y5whemw3s8w7sg48v5ez3b7caw4a3ja3gzlvv4nwemg51kphms',
                extension: 'ezeusbmn5euyvazifc4nzlmxkos2rnz6aq0x82b2jzuh5csq8c',
                size: 3619971305,
                width: 898259,
                height: 597873,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'r229sontjf355zo0p8qrr75dkievghhc03g55rmieh67dalmt3e9n2ek7foppo71ddfuv2olxaifpuxy5clpgufo1tztl7msw5o82jc8wx112jscao4b34rf565xeb03xss9av7dou8dtz3vzdhcjlldf5jkzvvdbypbsvlx3nmvvqnl8n52r6eikrxw9zo4d2r1q9qpfis4rvtxnscg2j89b45br87sbeux3dxgxckbqfqg6cked2uuayqmhc3',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'znf5s76l23a4fiyulgiiwv99gqmbretpf8zs95kxdtarc057e4u3t2g383b0gh665kaznuypohy',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 235503,
                alt: 'p45h5x6gvk5u2so9c7cf6pj80yuqtmnc27uju5bn0zqkkcbrtq20mz0kqnbsim5fg5tz06dnxeencokw5q88cb9n202twtzge5fxcvmlnuftmdwdexvwbihjj7v92bqkw1zduwrh1uyl6whwzq3ygg8tmyqojiqf43qm6p5d7zx5zcp0rtyr1fqod1yoyfiagkxyrh99yzwpmhn3rx1jqvr2li6824sylp1d4zftkex01f5ws1hxuh777ksavg3',
                title: 'l0t3xccy3btuetsp328p2pks89wxerqeu1j4u5eyg8f95t1db22o7cqnh0hdzdebixn06bym3x1xk41btqm4o3nm048dn3n1z9njo2favimvpdi7nneu1qh6t98xlam2b23efv4t7k6oinqt7yij23g88je1nhhfvx4jfsh86a7ad3wwwh1abt7qpo6410gghydl0poatn23hrhdrp0zjs6f3pjhndz91e5xk92eluvvtix2m96k1etvigzkxah',
                description: 'Natus et voluptatem delectus aliquam ullam eos nobis dolorem alias. Culpa quos ducimus. Recusandae autem expedita reiciendis cum. Voluptas magnam nihil eos aut eaque nostrum quis commodi mollitia.',
                excerpt: 'Aliquam qui possimus pariatur tempora consequatur odio distinctio. Corrupti et rerum est temporibus occaecati repellat odit. In voluptas non tempore veniam et. Magni perferendis numquam accusantium dolores.',
                name: 'pdovaxsebxozqqh307kjld2zyu1hit78c7ylkghu5hmfei812jfxtj36ych3sze4x2bypmte0uduq3i0b7tb32jhvuhoy7wlhivbu944hp4n56b32i6kgma2nqrhlqxrxrb7ldi3a3rhjh2h4tfwbhx5rottqf8vdcxujeqqop42be8cwuh3ie25iltj1miv6unstaam36tya8rs4m64wbwsonjpfe0bl83wns7zpj061kdxtta02rbl0pzmii2',
                pathname: '42v48v76zpw0j24nxk1lc0953d29xvaimsthkzxf6hdsoo14nldsbms7dr8072ufpbxyeba4qa6j0dkz59ue7flkun8nvcef75na08m70ozch6ml3n7sycp859lijrvzr0r4bxr2d50ywwu963k8ns6ug4d0uary1a5gtdnyi9bv47mxwdq6lv9n0crz3na0xl5hr1dz8twu103phm9hbs3xt56on5ah0af8qu6o8039mv6bn3y3crcyz36w6lbsnlos07ntugupdk364odeyqw10wqirk7xndcqmp1wtiwekyj51n0wzwpf10hwlficy37mbmyj5pn8nkp14n3tm3m4qiumqqp8i0n4daiee7215lawj4q4cokwl3qtx2k1v7sk2v0ur3rmvz0flp8iawuyimm6qvmgicm9uo0csnffbdvms1qcg03eq6rdaf8ovisw9x2l95djqiwbmo23fuuwyc2jozk61z361uibhk86yg83828up3cc831nljjfelowdaqz2rq9hmxi1j01ohezuoju9xgjtw1h0qvd5d7kfooc6bndnrz51omc61tov89imo89soy3wkio9yjhak3yms13knna0or7xvfz1u8h87b5n9ouqdinulqs34vlpejjid6ma5iv6gmqp4vxrj6773eitqc8vrqasg6omrzw9vx8lou6y45sf1d9w884w47mrrcj8d8p8tzm28z3e1vscikjf836byp0x03732ah4thk133ld8a8hqv49wd68q9ahso4mshy82rotyqqrxtonj1sserlywj25cuxiik9q1mvujxvaq1qy48bwx7ff2rid9om7ur9t9qzau09sfl0qsftszbdmskkkl5fdl1lpsm2i9j710y7s20g2l8fuh40n3ukme8palf9y1jwqtlwc0g8n2zvrb2xbfxab1erzx2ckppijdcz54o9k6iejibc9sdvr4rzuouqrtcrfk3nwyebwpqj3s9evuxosl5yl9rvr4ujl8c6bvuc5g7a',
                filename: 'ywgu7xjzmfekivbvqx9ofm0ed0lqqrlj70uw5rtcxuf1jabcfhin2g3uwxsjmi4xvoiv0vj3ox7t3tjmqzfnifwv9y5hb03dylmr2vxmebb2f0scdc0socdcanzp6ethnvmh887iff1y0m6uk25o0rqj69luhomzsgzm3cnu6lorims2hro4zt14w6mend5y7rjxoz5e8obq8k2hiyn4yb3a96drzu9ra6c5wevyvl77wf8vipiejgs1qcs3j5k',
                url: '9klg8v8t4pjo3myj3x3jus8tvobbtnoc0oymggahu9ysswls1x3g0t6voeswo2vcuv7cpfp0ppqalo64ngmmckfrk09p0yisynih6e7eqplxucifqk1zlj4kb12ym99ygy8za6ojuukkaas3lizwpf9zz7ft6jjj9acx78i3n5hxdjgmtj1a8bd0taqmcddlb030txkkn1fpd7sywfl5j3n3kdqfm78v82ku1zva9w3vq9qd3sllxdwnqjyug12c9qn6xyo9syn13ro9td6l3he39ydow89rk9m095or1dhjanuk3pd233mo1mrrt7qkxt3yysk3too091q7i9nyoho7th79vb59av0dyd221kd8bgb312fzf0mxy3vbme1xnj8tnhns0x04uu71sp4eibjlchdk7xclkqdry4ntf07b8b57w0tjjsl5aq86tkqmfqalsnb16xgshmeo2wjpryk4b1dadhbzg9n5b39zzlvq0xk6smij8hu8zdafnado2c2wkrmp3tj226j2953wa7pfow2ysz4yjxs9mamvsc37cgo8odp1ca17h8bsb0fppchfcdm38lazqa2nhmtcdpfh3uy9kqwiave2k9i11rcy1fz35t7p11qarlzc1ril06epqecscu1jgp22c5mtje1sfg2f4emlqudw2qc557wmx2o0l3bn05fbhpbwc3wsw7giqzjyv4r7qzftahfz459l598svx7670mi204x7x1oivw4apvytgmrs5f2xdvlyj3hy88elgr7tmsayd6xvek5rckiwyckn6apa6y6sbj6wkyxqa5jrqi3zdtq51740k3d4ouqk7exo7parkge8uls30gx30x6w9w7il2qvra532c3savanx03wyofenuv54ohmburhf6y6wpdrebxdyj35wl66geee35m51z9ptucp5ogki8mrzj9447qjft26w07h4oaggzwflthpph2mt5du7qffzws9uuqyf1gku4yb02v2lls8yb9r6ofwv16',
                mime: null,
                extension: 'p556txz5lhxn679a0w1zhn7ximnmdox3wkhxgguhykefmzsj68',
                size: 2624674639,
                width: 617987,
                height: 103028,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'w0pdq6r54rwcou5na2dfqhfra0dfd08jqoq5ck5sohtmhbf3b11l8f302afq0feqjr50niu6x6qpm1j0bomh2gxc7o45g3y47auq3gxjwwn7jdmi3w7j898e0ai57pd1inlbiv6ddsyit9kn4pysjb51lg01y2q74gl3t0wl40m7krjns78ik9ls1m4wqo4rbghgb8107dn922o7uslpdyztq2232oedpunlakxt03tgkbypytbdgkq5id11ysd',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'kf2y5xhjjnwnenxl5rhc4afad9skzv2llozzhggeigijgvbcsyqc0dgnn06e9jmk2zx03rkjmdg',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 150795,
                alt: 'era2ksyopow4w6hz4s1913zm10mdlzkkuysfdgd53rvdri2j7iszjexnzxlx77iv9tzhic810bkiy0n9namlvtajwi2u7kiqdbtumskdacd98z4bu11fw2i41apr1qdiux1v101oawx1wlf8wo2jhf7ivagm53go3auu3o3ajddaxmgmqvw80cnqk47ixa2o7fvxvz22d9yonrk7rzu5jbi8wklsiiprdzeob1oaz2n0vaq59nzsd4osx1rd0ws',
                title: '6u3l1n548o11zjnz5hqc7gvhl5wzk3f5ocarkjbdqigiwz5ncylrnpj42m81ei3701u2bykrua588cw5as6dom7mzo3ix90ddzn45bpyc3bl42bir4ib77kpqjhd0pkcp3gu9hkpm3bw86ghpaj05s0d3s2are2pqywrnoac5koagv3je4o4wnyd097swyjavcs2x3t1n68meenh7wpd61subqds9bym2a6waa0dn123sot5h7mywppkho9kqmc',
                description: 'Ab dolores molestias. Est suscipit ab numquam sint consequuntur doloribus. Quidem incidunt et similique molestiae quo. Sit ipsa sunt et ut nostrum. Qui earum neque quia laborum quisquam voluptas aliquam. Beatae et quia aut esse ipsum.',
                excerpt: 'Deleniti harum totam odit eveniet est ut fuga debitis saepe. In perspiciatis consequatur a similique voluptas iure eligendi consequatur omnis. Assumenda asperiores ut tempore amet quam velit doloribus accusantium et. Provident aliquam facere animi iusto similique suscipit. Reprehenderit sunt aliquam aliquam tempora fugit.',
                name: 'lz41i5c4lo1qa6ele6sylxg90ydu77ht4ul9ci8hn5iofp151qxgs9rhhpig1kns2cuquhlhituqqjy65qhhszsism42snm66e94wzutdgb9w76mnv0l9y3f9js1rtw7yq9dyxcou6fx3zqxzjlaymmzoanahqtfkzxcuim6z8a25i6tzjsaw7943nzlvrjmqyixkhw0b0xp73mqfits2qkndw43gk9koa86niub4bnm0rpgx810544s46wewhc',
                pathname: 'fjirauia0ywhafu4k7ispc18fzdey6om4nh8s7bodw2insxwjyitvteenwsz8h401d18sx36z73jdaae02e8q76oc72l5xt7evlpvjpn0ip222giopl0xgtn2apmjrmr9g662a8wi86ms4y1dv5tzfnrbomr6b47j5pf01p2hmidbm0d9ikf8gm4g9og9b5liiq194ye2pk3gthjkf8yj5s3hw3xdd1ezf3s16hj3ize7nv9dia04z5m6b2km8iftqs7vkuu7budmfnewcf9k5k88vfxs912tnp152wgnvvfmadjvowrycvppxxl9gr737qot1sqfmduzzpisqkhpkzka1ccaqn7d6gri6tewhpbw5m8h29obvmqxnzn3xi81to41yzi3feye3ywysdk4bcwtbzkc41hd3gjtn8628oiv237pdqdzjc8e6q38ac3ij0qq4545va938m7g5moab9yzgz8ijlq1sjejvrk5hkl1yrzfm6fiuxq2xbvaf3sr22t97feaecnx9dw8g7xuedvoqtl25ifbxnep1knxy02nb2syqhoy0ji7b7p962xey27asr2r05rdsoschubopv8z4gl5sb8sr1983p5yp3dzhycoq2saodiba1hze38lygicm3szw8pfxlsjif9gcfx9grkmn5ngcuhtfdxsj1c1rukqg7magxdd71tfm6j7dwuq75ogjq2xqm4cii2skd5gn6nw3hr10unpdy5wlguuwrqyo1f28iiy4tdzonss7uaek853raw596z19eb592rok2mutpwbytxual805skmry3ykex0sqgwebut3kontjgq6sv98z8qk95zaew2hy9gyli9icuoi82tbxk9ndp4919jp8h5kfzukqyoe1j3o8fcno8uwvwmltxxofcouh1rwunw05c0bif64lojzqzzpuftkb6z9y6guhnsu9xqftm15e6wpsmbuwr2io01i3hx73jyespyuug4dwzjhos3l30o3d491jm7mp0xwvx',
                filename: 'o8ykfqjutfpswwtdi2a92cbb1u3r2vnafejs5f68whx5vsa570f54ozdwusfchx3dbcfbused30az611nmngu8v7hfqfcj73bm48t0khqd2tnfnq2m462tbv56e50aogq6os5pwa9murh16pfmuqxvmegdges0iluvkt8k7a7novpj5jzvao72g2lshcbhmcvzfyctmvnuitnlybrhb3rwntceoraqf5v8jkhxxj3stkffj38nv3lfp70szre5k',
                url: 'fj6my3lg1jvo4gba7vdi99vu378p04hwqh42gwlp86vby8shfy71ujn8lx16ymitgdej6wemnx0ajdeg6rhbj13uk0iaovgokodmh7oid3tybzznapmmmitc0ijt0uhnediq2tzgtwmcqj90uzn9qj62hdd8f10jvezz4gnjwqojhmms15bt9822b1m3un9re5s3cpq4xx7pjxvzedtu200ychdhbuiadyvhlyuta4xyno8hspm0fsoigdrb6xpg2wgyvfpxg93amly0dgguvsgittswkmdufwq66lqefj6brh7bn7l3w1hvtrwdl7npq6tnl1p10f9ylmvtb18demhxizf8409bbvyzzobc8ybxhfsjtj81tuv5dows3ahgxehp2c7enczwws4w0e2bbgqx904hv4dx3nvpjge1x56dr0dxwva53nsj3nubaq5wububl9lx47ckkkq3pzruydenl1sb3kmwywexv5cfjo43z5wztf5aw4wmq6cewbxfsna5t85026zyr2ejztjvov6igm0af7qujlnb11tg02h9ngz21i27edq5f2x7ph3wbxxes6xg1vxibpebcj8dblsxgyppnv94monhovvsqecgvilf3pncwqnsm9uk5r07qw7jjf9zkzw0knv467j0k12l57lo5ldj87eyjbelppghw450pv4ox82mpgj5720mzg6bq7971xhxbx8qrs4amofmh1tfw8g5z5yni4jsingaofz8x8cq08r611c3pdv9dc8qs1l1d4wnft2nxzuhx3pjhma80opk454i8wgn0hrl81gsyq0ljtnxoc30wsu8h4s7qqwculobb8yyoclc4o1ghp0s0vbost2mo2stcxneygls0ad9jxojdjnas7fhrxds5jl5hyjoozqqpofryn7zw4o7edg3aims8hyn7m8tmavb6z5g2l6kptz6x1r59qv89z873c7hrda5eti5t9v4yj4niq5grnlyeepa60nh7wavyxy8qzbggvc62crg',
                
                extension: 'j1nc6ml8x5mmvo00af3dt74an0qamn6uauckp3yuvnipmqfse5',
                size: 3771811159,
                width: 119721,
                height: 220817,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: '7k6u1jgqmgs06gtlduu5xmktd3nnrlc1bhzfkoj0ako0xzqml8bbwd0dyaxvre6glcq3dug0txcoca6gr0d8svt5amwcxpdy4zx8k9h5cmqz9abhq7nz8ibf1vp4mvteajeqf83p2lr8uljy5ex4qnkx0rcyk2jnh1s6zd8oc4i8zvbx6qwgztodnvfw62ew5zw73k6beyzm4isgvvn2js8ftbfg2qt870zlkmpi7ymnvd9j9balafomofjialw',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'aalp7t05v8zmsrbln8ppcg54ov62unh5fevroh0lg7euekoa8pjnelg6jipj5lej62gp7vc57yh',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 859187,
                alt: 'ryjljev0wuy1d5cg088wwmbtuiqrbh0ptw4ksyx4715aojlh5tqp3kjorlqq07uqeyc7zs6wvck1xykvucvqipejshm0e47tf3dd10ob5sq8i9wx0cixjaymkl59jksgpsp2srrp8nub4pmf5mol9q92e0rrq706kh6gaohcqnyjqpl12nbriglgm665s405ujkfemn8ry0zyhsbdzcifma52s7ymqggv9q7rsponyjo0g3nyxkkr4y3koic6gj',
                title: 's8d4uhgmdivfrocfaid57h9ncn2lhk43vjov35djbj6zzvtxvnfcvc69xvyuqtqdmoowd7yfgzm7mrl0fhguhg3n3qkzk4lzqb2sr3q8ylp8ogwh0ciot1vuui4gucxsvuf0xhc6appc1l3euomy2lhs7wu0f096eju46rvd1nlj4g3y1dk7e6sqfgzm65d8zwzjvbh45r9ftxssj3dl0o5bafe2qy7vf1t50npvvodupq8l68gac0dbdlt9oam',
                description: 'Atque non aut adipisci non. Eos distinctio voluptatem temporibus aliquam labore qui vel. Et aut at laboriosam eum. Optio cupiditate fugiat doloribus consequatur. Excepturi corrupti aut sunt fuga aut odio sed rerum.',
                excerpt: 'Officia asperiores velit et et omnis quaerat rem. Tenetur illum dolore quaerat aspernatur ut neque corporis. Qui sed quam. Harum omnis et tempore. Autem nesciunt eligendi sint cupiditate consequatur ea unde sed ipsam. Placeat ut ipsum blanditiis mollitia et fugit non ipsum.',
                name: 'uzslfog7rh2e5jpb24zdj87c1t9hzub2keh705f08a2owylpw7h0ggk0ifp9luzb51fglpumwnllas10ph9iwv59fvuwownp0erdtdiwx6z4gokpwj60inomrc2o9cbq9cfq8qjk7uu5e1bsk0p2xnze8c60sqjovhiof2hhrubbfhk1orory0e83yllbgbv79u8k41fezdn3izjpzhxbfsjre07c7ni9p5ei12bb18xp1d1nzfzpbn2h2vqbxv',
                pathname: '7yhcklhu5ay6vqj3tvk40fps90913z9tk9ulhd3gu3yv9tp4nh2equer8w30ae4srwuan1ub6lsyf5n8yrnvxhuys5o4s4xwqjpdb1ux03zamm87avz4z8drrk5ftsbm95gf4jl4l8w34iwp63htql3bkquv71wo5r3ivh9ay3ht7grb6x672l7aq4xvfqzt5dxw82vyj1v1tcxuwhu630jkxpvnz7hcvsbo3jngsqwmxh599ur34sdokcc6naesf65tcohvvfba9ltdl5s9o4lk7qym1xy4arztdwpco2lidjpb26p70mi2tqvz7k6oey8bauy99myde335r951wyrdl01mhl9eq54fyd89fhpc7ae4lksclwprwdkby01ahtldwxwp55xkwyqc37xs0s5roy95cut6ygsw9cvedbk31gr8xazrvsdz66e9y1hbmzj6huauel4mcqavx3wp49ifyq8thk37ftcaeoqb9us94ximd7pfo5wculk018iaxjqbjpd5s512v1geojyrot44s44afn35vls1hxvjqdhtlnvuz7fdinwvgpdp3iaa08x4fm5wmou8ks4nczlz7jcd36nvybqceqk2dcd7lkkamk4hg068s4vaqstaiur8wy49drlfhcxe8oj0y1e3wqrjycq8e2l4j2mrwh46lsfu5pvgvlzkn6nh3phjxq8cwonh5wu0wrghdrzb557ipi9x8cu9np9dnj5pu2r6x0pnigeg7i3tjbt6jasibt3jlacazgb36n95cwnjtxlivr9xtwnsn8zxq6gibk3noggketaqumefdum3d3ux059aicztujx9e5by3idhlqq5efakyou016wtjqjy8peom49zqyk5p8xhi5mna12n0x7lfuubwp9ez5o61p8p21xru8pi0p7b9az0z43mwyj5d1n4gha66or82m4r0wuryklgbiq5c72mstoom2xlvm9qycmvl6rivvf928lf5bibbdratb5uw1zlaluvypflrq6m',
                filename: '6kck5k575nqfa00o5o2maymp3y72q984op6mme3b4ldk63x7ubcf5n6m57j08rbag5293250kji23fs0hbm3na27vg81ogvt7nnfluqyp8oorwuw1wmg1popxtjbqguncj9ch9974udyth2m3gweikognuhtm7vcqclb5rxz3xecxu53hraipl4nxqnvsus69df5mi0pot8vwytj7rp6pvkdf3dzotkkexnhfgvdivsoj2oc6oqko4s5xrutwbs',
                url: '3dgv8zmew0onk1vddse47j9xzu1n6a1nmxvksf1euyprc1x5fv22ag3jxfwkv2v5mf55n6zqp2xzb63h1ujb08q5gy8b0vbz1x0f5nfs61gwscacsingvl52j230pxovk9rh6fm6xpzvd0dghjkac5roqbmv9rpvbbluhwbtpt51z68khlqsm1jrlb20zvzuvx2r628vqg69ssj07yqng1tih75m7j9lmafdzdtzxqrpsmkc11ekt0a2a9f70vli65ken68mn8zbso4ms8fg5fsiohk362jla32dbtxxukkjqnw6jyuox62k6b8y33u3sk910kolp3ed1eivd3nzcythef8gbka17k9t2zm2a1zy1j3yey3qqpr2kcpo13h22jtwgjd5a66sx7fv63d2x91kdyk99ci8ki8i71kkpkug4j2710j33rzh7msur78680cbwvjzb1tfp7j62qjopt37ga1s6uxf57tc22vwnzb5l8fwl953el2xnuwi75rusz4mggdjcn095q0kljjgp5he1zfqg9ouqovvx0uv319urw7ircvztrj4l94aqcgwby1xggdkn3s943nmow2qmuc92nji1i9k8u4wzmjr3nxxgemm7937o90e347iso2cnphc16ddi7rv28fkxn43urgp77app7ckvggjjp2vbog8kc695zaufmf1798jzeumpo24l39oroltaijikul2wdjyhowaph5xzuyzrha07kce9glbsckob2l5upoall6us3a66mukqc20v3onb8xgcb7ujfb9iuek4ppulu1mavgr5d5m9fg77ef1pqxeqf7rvu1er25nmus8b3ntagofw5rce37fm016dgxc0l453zhnbjcynh2w1muheyrn766idt7x1p4sfizjj70gntoujawujl6w46996raful0hr0qj5rzzaak7pmddvpxmpull6vde1kq0vrfnofcasic4ip5qvxcx2pcclcedbnhavevk7mfx4p0ascahfgrsi2xn',
                mime: 'dn61jcsmndh4x3yjsfv1mztel0u1594dbun2g9eydm6xex2aed',
                extension: 'gy8ud0osybrd7nrcajtzso1xmzzsvi0wh2oiso85qt49j7ncf1',
                size: null,
                width: 647801,
                height: 531508,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'zmdk016s0oil9u72mn5bfmymp1e03ueh4lt7x7fus37awbh1lns365lyvhp739cnzbysttizufi07gzwm6yl78szbbp72fjnvsfoffxb5bmhl95tem5xpanuwevhb3b0ihum5pfgf8i4aml6xpord73bwjzkcd73dqedat1t0m5nv03nu0jfuea1wdyio2cci0jlkdg1f1j9wzadsz2a62bais3kz42qkhq92h46384wx4p3msvcn1dmfwh89xu',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'atpp2zy0yik0j9euk8vgewtgoyzeb98vy7p1pyx06gxpftz7vq47e8uxbgteky68nk6o1ot052h',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 525648,
                alt: 'eo7vhspu3tktesviyjpj26ue24roih72aqomm1qhq3kcmt2rrtbz6pfh17ybf5mv82ugdn1fpeo92ga5scrvkarnr46xu25zautvrar9n5kultajzrlrg8rgozdvgx28hz3mwjctq9ibr3tkolhp3xhmmjxu9nx2viqgaevd5934pbyoow6cdizh6oj4pe46j3oqzxvxu7q9eljugqosnl5n0ys4zkhowwj2xbzqvds5b4m4voa6jcvv71e2ddo',
                title: '5pfv6xqgvwxf2dgwl5ti4m8c9ek8p0cr3al13oz59emw8ld2yvtm5npy0vsrsrrg3a0gybj6sflkrgm007xgimaokiwsbyw2kk02sfl13841p3dzav6u914jr9byirl823bdovm37yqfq08dk72dfvftmzpl9my9mw164iquonnyyvby0x4s657aemp5jzc8gdjgnjb56fxzabb6zh4h6ot1bv13q44vbkhjcqty1908j59pwok4robnqqmvc64',
                description: 'Consequatur quo architecto maiores minima laborum ea officiis debitis vel. Voluptas consequatur deserunt ab. Perspiciatis incidunt enim ducimus explicabo enim numquam accusamus suscipit. Rem vitae fugit maxime molestiae dolorem minima accusamus. Mollitia vel sint impedit dolores.',
                excerpt: 'Aut tempore mollitia excepturi. Ea dignissimos esse quas minus. Vel pariatur tempore non ea ullam libero. Porro quia alias sit corrupti ipsa libero cum asperiores.',
                name: 'lwhuv8q9vdqkg6na55xzzg7fhzju7h8ilnho9p2vx3csno7n12tfite32kzt7mhasyyyerst6c8xdlhs4427krc4wx3ddjavyh07iyxpmbx1xtb1mwjlt9pe6a0t2jzulyrrbwnqtnm7ppceh6osz6smg17ybcocmy3vrwqeichrbxhyp7p76ythcxnkkaf8rr85qz9cpdaye2n1czjnc5igtcit9lzc9hal07pxg36k8ol7bv6km7vq5i8gaml',
                pathname: '2cbsz8xfq5a9lpbckixolielngyubzkvy3aidsg9dc5e1y4339fk5a9wwurrjykich40oovkqbbwvq2sutragbuvsl18llxv8frz4be0gp3u87ifmygktqhbbt4hcejlo0t0sb08jv2q6lvj1afs1rlmfir26kakig3z06nr937urehgm2z7tzty20vby6oqgympq2jesxse7ojj1f7jlq324ezcrtqsz7todqrt9dz1rdimjyeoo7z5fauhxso3wllvbbfswjx8tza552zv3jiifieamctasfwi7c8sr8uowruyufn7kd3kd0slvdg3vwjq4fwkf4l10t7yo8qr5qkyv41160sze8hdaogvncos412xdnpfv2nv9n7chykgii2usgk25ddptuvjhnea5ddpi4ci6ucby6nu6gtyalw9m9nv453qs177aepv6r737ja2cm5f8fzswe2bexdyt5t3r7bg70ydra09j3n0ixra4xq29miyhtd55wvhunp1txotybmsnarqqf2ibnv3wwuqojkdj96so6c8gvrnrl9zcrlhe47v1k4hb0bkt3pks850h4td1vd37zc65owkkbuaf6okwuwz6kk6cvenjjhan19vvhwp2bbjlynzos7w6llgvlf3glxqcua79bcbdnuvfvxfyn1dn4dcd1kq2y3i77ptxmccmws8t2xczib99ft5n0zfebtom4ckhylxpnuqf5ad0m0ac36gtr94vn58feglsdfkgfm8lptu3bz62fu34df0n8v40ymle8emjyymp56s9qagj982dgtg3lbjkjcmqgmme84t33ff3fttl3jw2ccmxcrdp01mmeaanzxanwsv13j3qdd6kb01446vjrmiw9cfleso0e1qu9bg11bwqhpzs995i79t2bbvcfj9hb3x98o6yslg0g7ei7qhhx1pvioc3im0jzksjrcqeem2k5c81gw1byox4o5lfpxzz5x975bwlxisoyy8d338upfg3ym2fa6ivjgaq2hy',
                filename: 'jzklr73zbz1locj02bx393dwobo7g29qhhnlv1mta8jbp7hofo2jrfaamrehsg31wjr893xfukq9fce98rdstknbgpjnc085ko2o72w5mq195eauk75m9pe25f4jhexi2kx540kvy47n84gulscb9a31u2uxf8jyhymgh05thb994mvi7k4kfco6t2l7b3qbj1tgi4c66v1fzk0ziyarwokgv908s74ovj8z4smgni2qm58s0owqxm44fjpgev8',
                url: '3zuax11la2ck2vhrcyabpxj4rusu4gv5n59pb3bslnmicjnlb2arurovelnlu74dxsf0ac7ro8975cgsuk9tmrv5gbklb6dllu445pzqkvmuy4hxtulqmbgq677x1cnk2itf7qx38o9bgdfwieogipabgueoj2h1z8quprb9giftt088iytmxef6r85vqpgn2g2aj6myf1ty7z0wk7dc53c4eyghaciy447atdd2sb46r3jozmxm82fnp86vvvag2ihrfwz8pyvd2jqk506ddk1980oeuh1p2cajmpjah88idq9phqslrku6343gldlg4e2xxlwa3pn4szefyx7w5hsmkkhl1bnnfmie8y0aoqh8hq6ck4onqcplzhl0pm1u2er5gu71ao6pvbqcmqnrmz3k0vycrl0jpo8tws2z4a1fvjt0p8n25vdw3f3d4n6a3pvvdcg5pjz8h6bu4konlwbwhufp8iudtow4vk02gp1v2a9c0ebhuj6g277h8p0ovjmuxatfv7p90sl87vg4v7zh95sppbytd9hvue0krdtrskbmpefrmcbl0mga7qt03rfnh4fk9x1qtckyd6e04f3zck7eq1n3963glrjxpbm62fzkro9h14g7qq3ww1ujqxi8wsqz3kxhbnlyydntid670ewgvgqa9l6dfldybitefvmmkxh5wlq0vzleq7tlfwymxy0honr5zbk9fxxdo2vweq5nmx3mxmaqgqi3n5c8smmn4j0c9xzbgp01pwh4tsdh2rygqte44quwt70sw7g49i47oy31b1yyt7f3vdh3hqulcqfvin6ceh2esti8m34u73bt1ha7hoz48tm3mylphm8jfoa4e7z0oc2y6xhxjuajmwjtyw1fvbecjfg899hbsc0l4lgg19lnk38jidjuzmi0lbikq5plzd4ldrcc7ngm0d4zfndl9rxogccarpjtm06m4b17y0hgd69v5ns9xcz9ya30btjl19swxtfi109w3ectyzs9ex3olbrg',
                mime: 'f8dbsdya00fw56i16a16gloa5q4nm82sejkbexhmzc8rd67t7f',
                extension: 'rpo67gj6zvk1gon8dik78fgbe3xmyc3k7aqfum6u8gkmugzo4s',
                
                width: 965252,
                height: 204245,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'uxakqng7n4vvuj13s0wk32ker8ghab8gxx0atmqcbvyuz2njr7l9q3fik2qd3zrjrs3t79qwoxcnmozj7vnc6ili5l8tjru20xbp2d2v3hhg0u09w7plwnfl2x6tf538i7me0ewt0u2p23vahzuoxjaubrkfqz7zvk5j07llkm2ewxfgkd07za93nhu6dccw83wploat39k7xerv96vtrzoqw04xriu9779n5djga51yoshle4twskqj0hi10j4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'mp1mnz70u2saw5l50m30y1id1aqf9mgfzv4mh',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'psb21lvhipqe0jts4yj00n6r9no4vew35p9t7y66hnylsc95stujckfy6d9s27xdmgr7331qgpo',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 500068,
                alt: 'kovayp9fehzwud9gkqry7tif7ah3w19irrefhr9ijb5j1nor1a8obxv2qk9lwlfu25pf65bqxmofd6ak0h6h3wav1ualtyr379woxul9vpjps0lr72dbli1ljvx1dd065mg4gwf512qlxww21cvdsrnlhukshhzff9ajy1kvccntvl41pb4tohvig3nhtx5dtv40wv9kb4rvip1k7btz7ibeh7ylyb3xck57eyd6uivgcgu6nuiw1lqzeuh0xf5',
                title: 'd3qins4uknxlahh5s29xpppadtufd8go9m3vjry8j0inms0r0t8pb4e33qdc5hd8ce3q1fdo55iqca7e8xc8kkl6mnn05uul76gw787mmbj5273kxsevr3atkezwbjhdzdmnnkbq1y2v3fkj78aey9dixfewu7sr3m8u2ui14mxahj0osr5pdmx5h2pp2niknlfa0i6yk7dvfv82gffwfw97lu7itsiy9dizumyzt0sn56x8ji77aldhu8d29ie',
                description: 'Dolor omnis veniam asperiores aspernatur. Adipisci natus voluptas mollitia mollitia vel error voluptas culpa. Pariatur dolor ut vero sequi dolores ipsum eaque. Ut unde possimus. Maxime expedita rerum voluptatibus dolorem ullam voluptate.',
                excerpt: 'Dolore iusto occaecati voluptates dicta at eum voluptas quaerat. Recusandae vero dolor libero. Ea harum accusamus nisi voluptatibus eligendi quo. Cupiditate est tempore omnis quod pariatur odit.',
                name: 'pegb1adoqwb18tiz4jk4jv7yaj7eontduxsn4ponbnvccxb30dc76zszp5zlyhbet11e215k0wkqf8tfn0ixb96xmd48nuynw9nja35hl5kdeggvyufyvrjw325ze5vw53mnumiu8ey03quoaitazd6edkjc4pg6jvlzmonu51ms635lll5mdsv0mn0jo90xp1kraur4znxk8l7p5bhow64fx5bjq9im6035f8vt63amawxmudcojm93ocqcck7',
                pathname: 'olrx5pehxzlimecvd578cc8aj7v7c09czcgu5s0k9t03bl52icvh8tknzgakhmsjsg8lhgv0gu6ilnndmg4ir8phsok28vc4m1v0abmgtzsg10oi1mp4u4cyi99jofvqb6c7rnfe7718bxr0vnk4hv5dvjeb9clrpr657kttjgmgzmdr70c7qoq7n6a76cz7ayqt15g0p22uwp34jw3eis7odjcd1i2ip7pcs8anrzlouxidsgj9kyynos7a8cqsipgl7cgi1wk63tqrh8ppteirbqgl05krcuimbbf26l3ax1pvaqipl0p0ifcnns8xui8bgba4bvmr6psos31sd89koqzfa49o2zh0ui8av1w0answ55h2psir7ludw9vu82aci35ny4cj44f66k9g6ajtwlyacgnzxqdy4oxent0as9ry7hpumhfc62wxa82xy267v3ergojwxqkxx51hgi0ic09kcbolpejp13sf0itfyfff6m202vs1guw9km154xlxcugl65an8ascu88lj0u2owxq82dviyt309jr15ylf3dwn57ygwqwmxgide5clo8755umzp5jqan59lnnirw2pl4ed1j96eymilx6pahfdfoqhj5ordi33hjaltj2lrbf8qejd4shrnd4atgruiy6u66x3q0l3joydh6u3ogdsejeaies4571umovg1ffvm1njsryervmq9yuouo4kuskt4cbqc64zu1svaziudt9q96z6cd58z5q49sy93nnsp5mrqe993bvwe9qtjzsvy88zg991yumulnaux3n2gyhhs8bsbko1gxj15hz6vby3fu7av4pi1gnak2fiotslr4giy6vnkg1szw411w2vssz9ymyns5oacv8f1s6kr0qwpi0za09ac9ioobdsz5ctg8g0jzsawc0annzdvjlg525f9kzte5qklnt7mvojws2us55equ7qm8s5so0vvxrtgszi9dzu20x8czk7z2nwdrf6t1wp0mj7o21mjez4voq',
                filename: 'cmz2dnqhvm50dx1hplqlfcf83xmuccdu6rrd6jhaf8z7cyxo9ba2c9olrgams88c0yxd4gox12v2geafsq6ynz1qiksxvlshhv3sp9h3w8cd0ry1hr8w5twte4q29c69xnqba219u5xmayklsw5qglu4hr49pdk8oxcpuwgw7szxxgp7oeio2fsavcd8bp8mxydmqjgr61nhbid9t00m01u1iqjlhwpm67ptkhj1n7gntq0aya89zeku3ehb0zu',
                url: 'l0eekgb5l98wk6iz2mzxmpii83yb50eznzynqnjw4prur3fndz805398jk6qsy3to67e6ixcw2d1o03s4i8d2rod4xuhlkjpnny3v8duxq4o9n9bjyyxfwub2uqn7svgpfcnwtvasln99z5qm3fct1ix6g68319hg8zvdn3bpx3r0mwcitafwj9137c3wwtzy8qmsaosoj4q8jqywo14hcnqenpy1k43tg3zermf2uk33pyfla00i9q5clrriaytmuz77ug6f8zuwxklfswm3p5d181v0cjjkp1c9tv4kq14d8wk7onvdla7oha330m3v7pbemqper6y6lciuksgh63qui4kw9v8vxakptftcqniiieli8yifizc5t39xzjrfqzm5yuyue6wh376gpyjnlu7a3cvf9tglr9s5zmy7wexg62z12t9fpoxb5ogxyzch19oned74l0jbin0eonlsg1izzsfq253dmvu3vwgrpqv36j2rd82jqnw5y9g3hrm1ug5u86ly7u26dqr805wilv5k5v9lsxecpfvqdlphz0t69b0wmqrmratd8hes4eclgrkmj7j2515bjf5q8b107cnlv4z8y3a7il1lb49tv5rjwtefhsetshw1q5wt7gzjyrp4xvkwumb7utvzlz3t50y89z2cwnefusuv6ty6t59d0ck1ffkog4u0urg2c5m1hh4h2xtskbds8lgtbsw4l77qxesa12ghk4yk308xnbxxatjh2jar6cjrsidylo8ab8i1ckf4v9xui8i1lv3yx9pryc3uumoo69ty4rz72s9ili5v446aw2wadcnv1iuwusiwgu0fj6bxhzy39pwuz523hw9fagm1zblhvevnubj4i49rudgugmmnjb45wvb9ecls82i1b1j8lgkzh41a1etvrwdpdsxw71mg1n1imry9rhr3a2tuiz2xc4g344wxaaqrgg97pmc8881gn29a3spg4qxa9c8kongkgxqnw2gqtfx59cgyyv4xvfm4ukj',
                mime: 'sm0ga3ztwm7pualka2784jqi7j65i8hkj5ql62dwigtc9hicr7',
                extension: 'dfr4f9nhl4d9g0okevks6iough25eu4mnwm262bd5opwqfdfrh',
                size: 6245007409,
                width: 215999,
                height: 772946,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'oevxzczv88x7bc62uh7734kidjsw9r5nl0qcxrwwv3yjm5va8gh2dos3xrir983jgh7wqwnytkw5ftahcy5zmho0ink6pxb50cudm6ap9k4h6xm055sovhjfpj3651y6evm11o6kstedlpy6u0vb20ftr2ihlj672hklrdm4chz7wz1cjmg9voygkmfb53jyc46ursbloxkahp9j188enoiufkacmfrfj725p7r7urlbvyvpfjnnof7wsymwu3k',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: 'on6uygfwdoub6dff2mwzsvp89sya69bh1v99t',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'hwh3gry1q6ya37l890992v4dkozwmhj5sglu3hs653ockir4594h79g5d7asoklug082zfgl76b',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 597205,
                alt: 'i0w47dkcchupe6qf90korxc20466mgzeowbfkd51tdcyw0wi2ahpyqo7q7yvnv5a0j260bq70ujgo46m5qp9jy7xxz2lr9jkqkokk3ob97e2y2ennneike8mflmqj6a0kuuhp6dea22xio75sxpf82b4ainixji0rzz701y48g2la6dx4xql4m4naflh2esaz9n0xlfu6vpmy1iqtyuef7x0ldoflre8ktsvqartuuws4royl201j3y29q5ufay',
                title: 'vdwmwxxkw5cfuiz4mo30msnkoiwi3xdtydb6e7d0ywejolauso1cdfc2av4xr78nii47zqzbh6ujk1qlr1ym18rl67eogbgijtpehmed4cp3vaso59zwv64calv0ywo2nrc44uji7i72ulsrs5iauzqhpn2e1r9uitbzmxcn7q6vjq92o7j4pbbjz59b0icpooxq67ttwu8vcu0evlrw8eioh1rcz14lo9aia3mxaxp9ol5508kkuuliv7grc1b',
                description: 'Omnis placeat saepe perferendis provident qui repellat culpa maiores nam. Minus qui autem amet non. Dolorem facilis provident atque. Ipsam eaque in pariatur consequatur voluptas dolores a. Repudiandae tempora accusamus. Atque omnis placeat.',
                excerpt: 'Eos ducimus nobis possimus sit pariatur incidunt temporibus qui est. Corrupti similique et. Architecto debitis aut sapiente. Ratione officiis et quia ut ducimus. Et cum commodi accusamus.',
                name: '8bvu9hvtnfds1kp8w6y6kcrodlw3krf9x9m20kdtuc4jg0o0tv2scrigyrhj4h62jiywphv39qtcg5zxtv5fc9nkazueac1gqc7l54p4sm5u2130dq2rkhlqkdifzeiivb9z3cpnus5svjmcdsa7uh2uv2ptgh371o4oqu4gol2tsxbgmn1yntc6u471ds6sf9j03xa3xleysgmgyukvqtu6d9hkiwa42vahenbpu4tmohe25jraf10u40df2n3',
                pathname: '13dm8nc5js6pbdtwfd4w91cbe9bm0yd6j2zyyrytimpp8i07n4oftqyrtezuw60tpnsbd0s5koel7yybccrw36emiykd54hobnk9ey0fcuzqh7yd7yvkxxkpu2uc63pzc1dzjm7egq01876svg58oui1qgprvg6kq7z7l5gajsv5p5b1st08vf0lt8knn2e783my9wvjia81bj0dlr2jwih3pxoy31ubcukp7zcos3gf7z1skxu0ywpjnim6m408i4kcyrsa545lh85g9p6b8jzk6uaouz1l1j2i6j0152c98y3v7dn8h1jej983r07r8d19u6avjf9lauih9gplnia1ymwuvrafght5cxkn14b24kw26ulm7kq6g0fkakcku6tgyarqdyslf6ddggx8l32kxl40exts1oawpgrp2pvegws7un9zuzvdiwnd64uiv1w2zj9yapbyn0i14ws6z459n5silv2ko825xdy8f07oakr7xvt2dhuv6wgu7pxz4qm96fm1m2pzmmiemarzjl53nxxxvjui2nmdf8krh0z86yc461zv1qph1vl3j0utl0ic8hi0mdkt1zkh5qi5y9ay1ujn5p3brwrc1qpas01n27aoslvcbw0m968yc1i009ubwflgpsr1lm72fhgs5pi9z7a4ux8ruwkvfea1zrlz7vmv710mngl619slabbtpawqk9j5trpxk3fpgs035cbyx591l3rspusupucolr3kmjmvp5vwc49jt6uvwq2gy2ve32k0too8n4ub6c33m5s8pr923wof0hp9bt6caao25io4pl7j98f2eh9a5w2ulxblsss1ryjeet32tdy5qwx3rhox83ptmmzk3o8oqjih8db9d658qvi7ny707rcdtwqg5jxlxr91fs8x8r8xpwbu48yzrn65hmvtg3ksl3n2gs2s4f2aj162u795udsfn7mtgn8rx0wtn8sedl2etvsjf4du38drq3i8atqrjtrs3axgj29k65vva6b7k8m0',
                filename: '5u836f6gv8vr4u0ymy16f54vcyf8padxsgx8yrubtlskyky93yyoer9vwjdrsqt9wk4v0mdfosicqmkfivizw0a3v4srwrj5daqksaufvnw0hoo5czkfh14zn6r2g3tno7om5itwdh8b0l3lwqdvp9cpkx8c0cb1brac2ink70bd38g0j3vv6x5qoygknp6u3t8s786jlgocdt0q9zv3bz6lestr8o55pymgkj758qpdclyk2yvj7e9zlf5ql75',
                url: 'n0tvz6onts9dv4rn5q99u7ggjdwob9vn5aajpvpjsqxw6f4r69m9tnrgk836snq1sg7rrhr6srx5uwpewqgaszkdtmpl8sjg062vf92cd4sb84foikgeuxxv1b4yeq3iv50ffotg5qbpzx2qwxrbs5stvd6b2l6pullqe1ztr64q06nc2inl3qpsmlmqdc1f0kaw3lxalav7y0pmw09kjfqnxzuiu5hphrda8hn5ti1a6168t03aslkvu0jgj6rkshapenb4toglxlnq356cjemjvwws3x1tzzizeu8ik490e20x0eba3703guwl8emewvcfqh3mws9e6hdz2agidwa52vvda8i14jcq2dmugx5ma0hhcvoh3g1i87cc7hk6n1jejq6voj67gvcx6rtmlutvrvqgrykfva13qzjy7j3wa87f9gxq5j8rc3lpls7pb9lmv3j8ygpcty44r4l87rxg8z3enumfq00zy3mevjxz27qlymr3zsrzhswonvhbzeyt7xtqbl3kcz3lvzx5q3vyarrfqdmjs5kxz97xbk6w3i3a1dfj8iuiyj6fwymgcss99rpltmly2cczvsc4iqd1sr0y8thl77qq7su5ud1unqot6sdckx0sqv5samwcxsd403p5ns1xh8jfqb5t3oz0pjfp8cd2wc0mevplcg0ut02rhozbg904syv0td581kqi7hnx7jw1x4jqvknl4io4g00unpbkxtgxy2p6a0fgizpbct5gjlzxwipy5u9buytnx7oh7wb427lx1bo2iou9url6yo0nbavtazgc97zmyphm89ir7vclh2qz3h8vely4ztwimk3i9ajy5hwp4fhf5pgcvaxmw659ytk3hgww9e2qvwwa5r1qmyshi6t7ui6o8e8vzr91730i05xw8su3pm01ivgth6e83vw88tzryf9jpdirnnbinft3as6wcfnyf7ylnzz69c6hkb23bo19saqffky5oxjscbpr6hvbpkxd5ygxew7p16710m3d',
                mime: 'htjir30i2rciwts8qck7vcp51hwyhzzpy4w9lqztl6jinqhfoj',
                extension: 'bhm49oqr4vkc25kg0b3k9xi4tto31bvbv5hpm5x5m4tw7qdonk',
                size: 3219157869,
                width: 330579,
                height: 907749,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: '5aa4xbxga7pnjxizedpuwhcktha4jw0yytjfgc9kgy58qdyfgzhlq5k80rb465iagzr4geyv3r925i6trpqagi24hwk2h3b9iw95bnkogt430iqhag8mnjbk4phu9x88kz58phw7wm4rmxaqknioctzfnny6odnnxhq2skrg0o6t5e2zv5fp03zleo804muic4g2mhtreh3a6v5p35j42o1d6bdhq20j3rlmccg1q9npfbdrv5t7508mrj9xtnb',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: 'dk8dcgszzb9d4sdci1pikgzqxbbprep22fnkm',
                attachableModel: 'rg0szay5wzlzqftcw0w0or70fudzx61gapm514gmr07kketisqa0y7oatwomvn3ldvggoeyjua3',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 224442,
                alt: 'zsperh92kokp41cmf0j8ke4skw6hlh8ukqvmp5w25mwe9iiw3jw496ad7sin4ngqaydmydar7h750dje5wyyrj54as11aw2y17y7vro9gdypoou008spxv45jvd0rfojj115ooew577cpe9y9uwm31f7yebj7n5o24erdfyj99f8kvhhd1xlb181lpbigevhxk83x5ys40pxxua13yx6qrm0eex22edytgxj99igoc4g12g5oyoeore4z6v18m8',
                title: '81sg00vfab4301qu4co1jzsgiohpu2o17lt0havj2xlxzwjgsz56mcmpwdzdf1awj7mgg4ts4cm3yb7yfw4adg8bbuwee6f87wfzcu70k9ecx73nkh1z8rlsgtsfhj6si2z4lncouw65h2rdpwi9huh9v5xub1bg3q63tg3gibfg821ws4r5iygb6vhs3csqbs5wy5xu2ovtaonomgjudx6gi3lmd4a2tuoy5cbqflzya9kac3ajsdqh8xnux3t',
                description: 'Atque molestiae soluta delectus quibusdam non. Accusantium et atque veritatis est eveniet. Ut labore dolores a.',
                excerpt: 'Excepturi laudantium consequuntur iusto. Dolorem nobis et libero eum eius occaecati. Non deserunt sequi. Consequatur eligendi dignissimos consequatur labore non voluptas quia rerum iure.',
                name: 'pdixt36gg1bhr9b4n99i15ci8na3jwcptv5psodjkd113f6soqn7yq0fl68zcug8jo6bhpn59i17i9a8dnc7l0z6rf1x7489z5yhx0w7w3at7ktmu27merjlq9riikm2lb4qruby3i3v3hw6jc5qd16qom2dt9m5aj7lxhq1952pyokt4ru58fgdh8i8ebtttfvgb2git7vrpbj9y2k7c744mib76u7v0k9uffeakk5nw5gtrg35ec69wkllfsg',
                pathname: '1eov1dwpafk5lbm9bqnmcoreb8jyovzur4aox7uxmjmnptjf8dqi97cqylq1kzeexmm3c9dg7z8esagujlgwy949nsca4yv3pvpfvzcn90cq39kti2z3tbzg3qjtz3thnvrdgr7vuxrhhuuph5gm0c1ma4g3o89hmngwii9linajzj3g9jh2daj9ythurqua12ra5qxqkpbbqm9etda1cpjp3kfw33zclna5hreo6dddv8junudczfz1pvmqi67r5youqygnxjtfzdhl294kw1w1sc0dznoonqz0twqzmxsfw22xh1njesgaany04014w4uyn8lshg24ju3di9n0qttexsckqwayappvqgq0rsiy7afkzc0jtbi47im8bzgen4wyzti6c14rdkpeyo7z977gcwr72cl7g7dhri8mvjaig20yk2k6fwudz08534khtt9h1i6rojpq5023gygzhw9b5pnqtuedps2lymvlgp3mwdfdth6bwauv4lq4br3k0w1rzxwj2gw19c0ddj3hcvpr8gv3my4s5nvyra1zk0dgfw0sj6770itmly52y2xay7vd78b6qhzuo67kn7l5sb8vj4knnfiyj2j3z08r9pwm09yqu5q13o4mjrwxj6h9789pdl1uc2zv5hd8hls2q3plqq36m7cxtp3z2olfebuzbc3xlub0ysfc7fp1s6sgntvmr6zy464uzm8gewb5ybjx24b3ega9m8vbr5r3y3acud2kyma7vnrr95ahey6y23pv24fnq0a2cn2aavf86e04nbu4mohby7to2pf0yb77vklvykwk824iotst79xgsdc984w9s8rns9oh34p686e0biqyh3qlzfegzqvpqisd0a4w4go2xzhow99cny233lloainv6gk2uu5xx7ii9fya6zzljquohk6y7rrc818o23pkind0l1dlhkvkoyzhx1fstmxuzs7uxw8nkpu6ulhg64w79v6d9gewbcrvsqw6cwcvpgbh5koxgqav31u5',
                filename: 'x8x3fncyuvjqw1062ujjzgul62prp91hsstcnwo0kzfqt8o1dcmlfjip3ruhyk124l7iiclhx1vbp1zl3de1zcoypyyszp2rvodpkhzwapqdlddtw91p5vkrx4fzfg4qrqgoe2xpizd7bj83usqyjsfy89j2eiu3u6lemrzrvd6yruycs80ddvl6w9gzpa5caduxsobdcjk3lagj14phtk8wvxzj910euzzhrqt2d97uumpkf9l4iimh09pz3ub',
                url: 'sv89erw19pl303bfnjwdx47u64qd53rfp5xwo7hwmd9j3tvbbw7j8nrjzv81c3qacomqdkof1ggshijm4c4tekv9i6d09uq27cav4602arybol0ji7z9euu6evbrv466xnym93kzfq6zbaacoepx21nyacfkdz2eaej5ipo2ksmlgyghtoh0bowiz5yn4300d8b8fz2r62wk3rto2o59gzrqy8a154yyam3j209fnmodvv7r946esdu7i0iea18xhe905moja1t2sofx7foedr7rein05heoje1zp43oa63y5acu4rawb4hww3wzqdmgpfio487ypflurctzrlreqmapqqwgcg9q0vurfcb2m1imtnhs35ylgong328rqqirwicmvhiroatmj2dk8rrtllr4gjhl3ox8doa4y8g5r96qflw4xpror6vyw5cz36hu7eq7zdssoeaearzx7tbffjjr71t19a8mvvhjppl3ojw976e0vy63r2x4hw5sy8q5z0s7w7ffug12flgyo1ojp0njebqenh3m6jyqhpi8o0qnpvfk7l7gf5cokmwtz2e33dzpocdvrysk225ll7suprsrli27ijkducha0zm0yr4tkwn6i4hift4xq3rhwh8h3yk75qh3bv5at9ux4wwvatk14hu6fjcmlv147fnjt2vh3aw1k1xmaabi1lgfi6mclf86ydiavijymxs5nfepqo44ogfzlj74yge8a2kow0ud7cugiat9p15qou4j84zfe7a02ewmmrwqwz01o24z7qg29hyclltl0h0mrs0rwep4thlc131ivhxx8dqb9dzjuiocg9ugdgboufe4nj2c4zjn2w33o0tlhp3ta7repow6o8pcc3qc3zdgqnlpm3arsqkz212jo3xyc0w4oo7n5lqx5mtaw6yln5ebh906ix3hsv9j49pvileaekthyh9f2usc84y6nye30978ig6ntn9fxoqjk77vx95q92gppf8spq67ivvxdrssw5rwob8e',
                mime: 'nt1om34vaf88irl4bkqgapd0yg5e130w8fhg8s7zhbymvvyqel',
                extension: 'utkgt2dsg183c8ty0p8n9s7e1gsts0tt8cx8t7ty6qmijkz767',
                size: 4360619710,
                width: 414964,
                height: 592708,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'xkb6u4ur9wknf8er2k512fuw18rb2mnc36jebpziomcivksmvvasc3kjviyuj0saxc3h27slz71igqxrbszwhr2q864xbujgz935vv67rztv6hh352crankp764rizvi3di55ae43ekgaxknnw8b8yga75iiglknzwxdxw1d08rr0utnzsprg8u3lgth7weu4eilvr83zyiricxeknciotw1gkcsa1k3kn5x59n2muqlsonvpq8l4rxekqapbek',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'fc4i4aqlsqwfs0r7t51o0ror1k9a3yy7et7alrj546lg1b226r2s61bmc64cxq386x7ca6lf8z7',
                attachableId: 'jvfd7bp6tg2mcfgnj0nn3k0i7j3h5orpowkuc',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 996180,
                alt: 'rkkb0adxu17x9xjdzl760p53llklcpm5ycalbrrmbe4bug99sza6rj8u9drp76upaispq7f0e87z10ymap9vlx2ut20wgvnybt73iqlbv1ps2rcgq6a9diaqiv3qplqb9ckc7agz4gznioe1292fzg9bq9c9dr72zpcwn3f9fdy1e0lqwa86rs9y8i2ur5hvhfhblhvf3vkp8n7or6nf3xjrh7skmtwuo91h5cqi8v2ahc6fgle7e9qjcdqvl31',
                title: 'cahu9jol8ak4u98orc2ngrm2pzxskvc0fjx2uv4wjco7dp16j0yul0uyi26ralforefsrf3if12z4gue31yhwsqbh479fj0jzirxy2jo3qvkkb74xflvcgfw9dyvyupv6jny4em1941xe7vov6xf7c334r23dzm3rp6gt7mbfrohtnht5l4n4ehhevrquaxmxq2wuf1oxp5mijkg5kgher3wk59eg90x1hbbwehthnqxh4tejkbz8pp6jq5yr6u',
                description: 'Aut vero quaerat qui sint molestias dolorum totam. Deleniti nisi sint tempore harum provident sit reiciendis itaque recusandae. Sed ut explicabo mollitia itaque fugit in. Sequi consequatur voluptates quo ut nihil non.',
                excerpt: 'Minima rerum nobis et et. Nihil et cupiditate velit saepe praesentium. Ex exercitationem molestiae id qui. Sint magnam soluta similique iure inventore in aut quia. Quia reiciendis voluptatem consequatur distinctio.',
                name: 'nsms5x8h1vl35cwj4rjnslbr3qs80bvsnqg7979cnwgcaruobpdbncntnk2ag4hl03u8o1vivk6z6ypd0syq3jjoeh7o1zsxsiz918v0pl7lznn8sd2pwtyhk382xdd6rpdw9dp0v3c5kxngckb7hsfi4466ynzowrg4ht6zvxlwv0hvv14c99aj98w9vfagzqwghp0pdw9ne87wyy8z5as0zymtwnli3et09kj5ikwr1qoxor54eq53prt0ivd',
                pathname: '6xsabd7jgaw7b0jbibpm2t2hv60q30tglpru0m9urpf23tmhsme5s3wkxjd84y45mid3vypzzmtg5gqrfux2446mrebv0if52woxdg3nvxwuo8dezeldj573yh7q7gxt3nvg7qo465oklaj0xv8rrtkdccpzmd7dej95fkdwql6eiym7d221msllxdg45ooawnv643dwvs72l33httiu5tvttvc5qdcqq9peixrydntx27ugh1jbry5oz4g6c09sc0c2gtufbiubz8i71ootw4csq2yf43qtecgx5a42hk553kf2b5u9ysm17iwpdafu4xasfkownedvuplowiq1siztkfg6n14gyqp7cwoex7xaqe8o04f4i1m3zym7e88q7n46s91caaxl5nus06jhmpk0j29dizbwshcd2owqjhm8bxsnows0vbtjn5i66rsxrlacq7eeuzg7s4gdeg3gxl7sew1as3tof29zmatq63qxem3q4579q782ctspakcmxnyz7yty16l6n5pv3ihlcw4kpwakguiie5xlxdoeqhpgui88v5hat4s8whsavrm5p3v5ag2ny7fmt5hc9gpki814kl2df20doy3cdxlwbiuk96l3ynm8gespvqa0jkcrhiccxhhrv29ui9k7qi67k0oa7bx3n9e43enh13hwk4qn8cf1nfbnpmgvdpmd5aiqridwrdtmlzza9y11bfm6l8j17q4a17mfbhupyii6ky9ztgy6pbcb1eijpchvvgga20wfdae26acg6w626kedfa26esi7ctw2rs5demzzuhcjtk6iyj3jlqqkhyel92zl4yozkg55ggekjx3ic7ilmgq1bbfjahoo4psnn7gg0sjeq7rucxerob1zvo45yhkj38rvlsp9sm9adn2fu52xbvr1cd1osh93c7y6ty2cx8lmec2bz9p8mvm1ecwghxal8fqyypspgfvc7vwnx6dsstlbg0o9lhqfsygwqzx8dfwkgh90p5ca2jywkjwk8s7j',
                filename: '830tv1oievb2mr56vtvti0fhklv2ggjt54rr6b4jar2qi7a3vqai4gip77ea546zny223xvsjkzell9eaatkjf51xtr9xp1vit7ecuo57c07vi9t225ryas3donraoqkzrgoyphnlkneulbjn9v88msvbxzrd4nv0w9idhmcq4fyk4zseh8fjiurp113z0ru8129mz2z5zrckov57mgigcgrssl9usy5lpuneui6cnpwnd2g0c594uut3n48gz4',
                url: 'nadpo85or2l3axldxgc37w9yvs58t09ice2brqauadhksdmljidfnaig8h56a8rk38dt2qg3bbo9br9agcdoz2eqp6clhaz2nk94e3jyrzccw96p46o6n1sg8duweb0g6o8qlocogc4gj3gl1z5gx9a0pcww9csk8ifsm7gckygklo9wb6ev3th9sanxk4722w5a2ayj71vzbvn4hq3keyehxjgdkel9x62tvx27mzihvb560r9nzsv4d5oz9vp2lfs8cer36y05fjrc3efwelzd2eddw11md4xdduajj2okf7p2zfln2vta2iowmc54wmvub66hc4l47nw9i5ba0ttztpa3r9dkt4zdv3nppmtzo051qvamdj1xa2tprwyuahzgwavtbhy4igodjq1orgji7aruidr0wi4varrc496z4af0q9nu8gmrnmbm8asckrtch3txgd93mjywdu6j6p6nox6arxtyxdk5a40hgl34365m1vwlym32qcxmhgzqum9cfter9c5z0plfrii0u6p6jk8vntxjmdnw0cpo4zsahqf9gt4vsmdjpg8gif8lyd0n909qtb6gscbgcciez3ntsouga1ac2azngibnsfbfrli0mxx0ti3veo8g8fnk4aw6in81qlpmarfwvnu6c0zvcarln4gcoroaxkrma7136bt1fkbjvqsd755ke1vuxufafnjqwpal9dh43un446b3vmqb9fkg3gcebvuhi4sl70xdbmri10rywpr5nw14b7yuvcgec86rcutuityxw9naus6jh5rbzk1wjgj2tqzx3tc1v3y7sokoymbqy1tbrxmrwaox3mpi9atunr7m4vya8p6upwuohyil4fke3k1cdpn5uwazijwg0z0gnmb9thgrr4aki7eqgdyfpf8cr0ml7rpuxq2tfpdk8sj17bbj62kua1guwv3dq58ehy2yhm5p7a3dqs6y5zk2he31m7jdrtqcyu5uhv3771czhkdr4vkhj3l00e22276v9iqj',
                mime: 'gfh2i9hcnchs1gzd9g3z91g1vslza3vsqbkn9tg0kesy64jr8e',
                extension: 'wgrhqsb1d45mjjveuzvv06d5tvz7vtmqj1qnq719hysgcfy6gh',
                size: 4018123671,
                width: 902993,
                height: 818363,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'k2e41vc020nxb6pqk8or8sc6xvowzney3ne2kxvunv86ms6qg4yn8d4w3sg2fi14dn2ruskaub9ua7kcfj12fv7i59ge3wzqzt0r89k1ucwb5uyjxncftfrjignzp3sz2znugyk8ppjyr8m7vkwd0xrnm7a2q9fgrf8va3y13ou3djvtd5805j5qbzdogrhpjhb52llsaaj2rpp631bvfds6vz5kx8wvu08jq5jmcovw3k9qwem4s99nho3yu2x',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'wuubbj6s7tbzkd65f9lqe2sn249hx3fcs5djc7wbfkq788ye4pjkptx6nnvuy98sn6jm509rx3e',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: '5rzl47qfz0dqgg3bnpejk2a1o78gmtgah3ib0',
                sort: 173216,
                alt: 'i30bpg69m21oftcxmko8u5s63bxkrzwa1sahlsm1zfqvebfjxyfxhar5qdkriq0sohbvnn1yh4h4j2av0ciejqj2u8htgxwimqpd5ua28kbvm1q5lvjkhomvv2xlrlehxqeqp9awc74sx0teuvuczniabwd1cuqudewkinhbn3u9x0c83hf09guqo88ls538p7368w2i41qqhvqu902v4sl6sb6u3g42vynkypsew9gd6au6ksx5v941743kxfv',
                title: 'qzg5iurqe9qd54mltuartjul95sfaprl5vvrh2fgcmf5t7ufsm6c17qa97po2asu692188m8me5ahmx63bf017k260by49awfc76l7zi3o4jy4b491wwecr8kcqd881p9hrbvlwe4pkyb7g8bb620zrnimqefjm9m4g3pev3txjbm8eox02y9tvsybmr9g6dcp52zw6msw3yrhkgc08xx4z03mq4wx9fzah6vhppxuy5kpo8llybkdfz06jvtsv',
                description: 'Deleniti minus molestias molestiae occaecati earum cum. Non non voluptatem ratione dolor officiis. Eaque nam quis molestiae laboriosam.',
                excerpt: 'Atque maiores dolorum. Quod ut distinctio repellat ullam expedita vero enim labore aliquid. Sed in beatae. Saepe rerum officia eius quas consequuntur aut quia et.',
                name: 'jfplchfgy93x7f5tsa73tdb6vj47er4x31vr7oyd7gnq58sjbmyzjsdkwsnkuftpqih3bxa9hju41w9o2qj0s3byk424mzqld8562bu2kbfo1ag3bvew965q3pn2nj7631rn2b8abtftfgxx5kyi987j5qfcv1xf831j79ax0d6catgqh8tr5mygfk5o7rxgff2syp3vte11ivt4uom4g04w74fdu6rt9p7dd74ax881vpugbi97fpptbbdsu15',
                pathname: 'x8k0elutx9psvvb8vraqg12wdtl0249albzyaww36wjaavgeejlqb9w7xtjdbvi41gcny5u3eumrsxzqqjq8bkgg7ti20qzdrtr05bb5g6kdcobg5bii76mnhsp2ubp15a5nwpnsmoryajgbactsvq4zxxtqz9872t55vng02txrit9oozmfgn1tr0rntalxs58anmiuby614q5mepjlg9a6utklu093qdprfcc2don9w8tzwawyxk9petfic81u3jcoaebyshx07n6que3o4mdyxereo3aecurzcqjg7ra0hpcg7k7dz92m4t552dyqwvgomfn61k3u7lx9agij4zq35lc752398mvq5dalje6kwnb0snuj35mmm0sz5g0qaom3ntv0310936cx04zyvez2mu2mn5x5ctrfz7sb01j1se8b48eigejxftmr2do8jaeu5es1kg95e7y2sixqbwhaiagb3dqcx6dzr9zjgyc1bvjodiuew8x0h550pzh3efvx1a1fky4rrf54firgmll5o2v18fdaytioncht8q60fm65fehowaku2oynqxftboblmrq4wriv540msl9vd8pzn16y4vxqyhbketmbx31sz6y7nwjm0bluv3jyrv7i1swyn8zlspp2b23iy6q2q6yhjjfeha146e1hhgtanerghhjsi9hb8t8uoe8kc26for2wiv2ypjutm25lhexnsmevl6xfc5zb28qawrs5vxe5fh2poscj6m2bh52jwxxcdr1niv1w3eocfohdk7ekkkl99ujuxugzmmv5oiwy83vlcs8rcf9qnpbq5kyf6yrgrm3nrgvjb7uqaw22wb3qm5maz1clqs7e4mjuu37relafcuix47cyvwrzikzhavw5jpncz18ertznqzg34hf1xg3rd19b955l6a01e0y7p982v99rmjrmrqqpaajbnnixmsjqllb7b0wdigib6wtz3rlxmb1s0bsdrn41uhk6xjuoxqtsm2iqghisjijt439g',
                filename: 'buflpsocoiul8e1lfw0qzy8nczjgvp1af979dguzqaz535bvaryy89k5kcpqhbbc5qj8g0b134dewd8npy54ivlcz451yst5297c6ecizwnughgf1ewjjoxjzrn6ngeygwh718xr83893azdndwe0ugcx0q1xr3qgaixs0rw82kty3uenap34bhkqp2xszu04t9j76djwsv7urnlvndrcjrq3osbnqbtl45std0ptker85cb41zb7cfmby2rijk',
                url: 'tcnm74nhptqiurlqxzmog50833smka2pkc6dd26xirjj80refscgwnniwsyrlxdcitoq9bs7288rt9ls5muy7stlvfurgcmj8uzau6l1ab3bc7idyq3ztzd6g9yjsn4wyqq38uhq1za9na712r3skc0i2fhow4gg5tm3bzr6przdw7pu6ipp8fy1rck0igh6x2igy8pr17a6wy1fi4dfge9jtnlfaevnawxb3avndr49owt1prpxeetibyzx1vwnoo3a376z45zxraeuxihdktlhmdgqg9twpzk3isdxy3b7knf9ldsl6u4l1kzguhzjfhhdgj5en62zyhlt9573td7wzgv4u2us2d9xob8cebedgb87rnse4z2zpk7kueoua0t4wjkxko1539ikpp89v65srnw002vjesgbpf1wxft6zpusbv83zxeedpsa69m370165yfzkh8jvvoh9lxezat3bb5x0yk8q4j9bxxyhj6fknq0n7mnoj1iom5yyzj5t9z7d2hn52bqy64s2srrbbmeuzcmmujxgdmpzykoiobim78gj4hoyno6r3uaouson91lo1o990ju87pcu1thh4juond8k8umkp90didqtgw6efp41sc2yawww1jolcwjwwxfxegmmu0ovsz1p05e4a6j71zwmul97voayojt9zz8ae16t2i8f5r6891zszr595q6qktly6049kcsz9dwd8hf9xrp0pa8wrwi1vifkaeioypk16x5ky3yqg5wan9w2o5l3zkz1e6q788wnvszbmu76acexkzforsgso7kcvwkgrxchqplbitevoira8pq0lgxyoamg1qucyh5qd04i0jr3tqybo3l0rmgdsdqv06u9oju5s768m5yio8g4xpn752wo6jnzze0lc8ocp0auc4irlykkfskwng7wi1cu86ompntwv70bo9g1w378xwz1vv8z8p5ipnvvkyhrk4h7onxrfpefkfo2dntt524ty24vnd8xxggnwuc4i99y4fs',
                mime: 'zngeftn0ryul5m1tyhsmxuqbikkv2n27evkyp8yr3jyjdnfkhh',
                extension: '29w59srseua8ia4yy7pkjjt2pvsizcdh1aeneexaiu8jrc6j7c',
                size: 2572649906,
                width: 333327,
                height: 586548,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'lhwnrdme020377dtzo59couer5o15rag0cjb4v7h0kfydzkv3j4m3l84fpubm7higahgngetq4cs9s4tv3a4znzx069zdv4neuca3zqqnpglhi2k7k2uoa9bfz72r0o2rizib946cwkcniyj8cmfl85jict9cjgsha8awio5biohw667m4cdu8thfm3u1t3v5gph46e9hgkj4m5474dkq4z5za7actc8mn627fwp9lxvbthm12216fy96ni5fas',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: '9cokb650kp8g6qzn34348r9amghv6m4cruenyzyoq2np6lof2hk2g5dqodod2h8etnwt04n0akm',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 254264,
                alt: '7w6dnx8lle3fdcxz327lmnf59urnylzd8xzc6tiztqwv98a267cg8pc5v9pqxzlou3yh5fj9m1i0mmp3ptuoz3ekanxinr8tn0bosihrcdt1ulhdqjfribn8abp8vq1bhbgzk9w6lwj8kvrugsnnrmh1bk6n78kscxzas3yxm4asgomvkhlamc8p10f2iyel4jtld8f9um33pimx0ybbnfsd402p8wvfclwbt5ehdrlfhf1q1wg20pwod1af6ap',
                title: 'ipc582atea7mryo41axquqyp2ndtwequsdo1g1jsgilcaazmiirxqf72wdwb3x9dbflh8i1faifpoy0v739a2ejna8wtk724267uybjgrgpqsuv7wkbne1m4qcglxoap74wq63ojw37l4ac85gsvtbbukgnt0m44qrnzlm9jp1c5cs1ep84es8qeighq8rqelk2ew83mfwf6rngsru655fkge9r8jzaie1frrugm84fd9hws8wd07g7t5tmh2ub',
                description: 'Culpa iure eius est iusto tempore. Alias sapiente officia corrupti harum eum officia vel neque officiis. Aspernatur et consequatur libero sequi. Saepe nihil nihil iste. Quasi expedita ratione atque. Labore porro praesentium sequi sunt inventore.',
                excerpt: 'Quam debitis consectetur tempora itaque voluptatem numquam. Ab molestias molestiae debitis nisi enim. In nesciunt et fugit fugit consequatur ad sapiente. Eum iure iste sequi omnis necessitatibus. Ut eum voluptatum. Est eum ut totam vero nihil et voluptatibus.',
                name: '62gh2iaelr869s4z7nuoxpl9kcgiwu7bttiojyyjprq5rfg2fiw3eeo9rieg8da7uf900m456cjsg6rnz05j9mhvk43dj723p8q8g8e55m2zpge1hoyo017qktgcz8dycu197svlofcen8ukjmyqqami804xlhe212mz49p4kvoru7665drz0xiqt0b411bf0m01azrq5uxbjavwjitjzh5xxlwliqmsvnwbfkkrfbdgx46mhxygqmaj1ihl58o',
                pathname: 'hgpfbf4hy3fxk361pcvwd532w1w7e6frmna7pxc8u5jt8yi5ev2r2ccbpx4356busx7lh3vakdeggskj1af0z2rp0e6nz2bbygtepdpagv4v5coyp5bsqrfl6m4lpzzlgokymo3r8m8jfsc9906ivgsg8jozvu4gpfb5l12s53uc66zv7vlmuk57zsa0y3cfcwp084doykgw5ad4f4fruxom7qvn2403andrcaf4s1wuddj79j7qvbzh20xvrjiee3hwszf7hc9vxtkxsvouo2fhnvulfr6tnpc1jmzkunvtql90p6vfqh93cgpmjiurm38gl4dlaohay8vjyryr2juz3q6i4q9tzlpvwvyxqkjjkdeig3rk5b9hbn496rkop83rd6mhqxxu7d46rqz3f5sshz4ezp5mjm2de63uoyhc2h4zve8kfkr61x8t6tsjdmcst6r0z7k6btytpms017adly61io1tsxzhvofx3ycwiuxjd3efq9mfkvex6xtcuagqt3et7fzheeak7n80h15aiez9bt7gnsa63smxm015m2io6u4xc22wd35n5wl5egjsip5b32pglnecnptgwdkgqq4fbys6qvq9t1bt37ikb8kvw4goc5yw3vxgru8mmlejjo20u11l9mum7sm1y10y0o9ze6v5ggfjvytqlpxc9qw4zwjpgr9eqbrdzupporl3yejtuyv285u36uaokm6r5wqiecxyisvts00wo3hhxb5quhmr1854rxggk5pyttno60eljs3qt95h8lupe7c4y9vtowy8any4dz0bdgncgh782gurftmhwy435sssrg8k90j15cdohncn6594oi4ssrbl3cwul93yakmunkbbq0wvlemrxm0itzwsmpaqdccj6inpxlznr212g41mc1hu6l5iq58gib8xac93nf4zvye2fzj9uf7ckhjo0v16v3scot5l8ah62a59r496ytj6jlvazwnl3wilzorm6321we8ozx2z1el906lpuiui',
                filename: '6jhax4xieacvjk3xezgsgdrfq6j0xu2kszligeld86eygqafpji24yym3ljh9qxx800i907f3eqy79yuwwzckpxo88fbmzrths9ohkiv4pe5khyhnref97vvssx9nuh26o01lcuwfhnqdgjt0n914k6uaicdgxc3ocd41e82scrt98pxcmvg7sde4a1p5ytues11qju24msjuixbxlohlz7ni92273fdhyx4l3c77fldsv87wx9mg86d4n8hwmt',
                url: 'jxra8qrix6g6i5kp7anmmtama3k8tnizdbklyvytpnohenoiqpg7s61by9yi1e9p0vcrogv4maaxyyyh2z9uh2kfh6jyuz1a60sjq1l2v8bd129mdyzlh888ccf8z99zm72j8rnsnjoota1muwtznls83zw0j7tnxmxqe3ilb85jlvffbxaukumfkybn20dt729hep8axprf6yyhxuor0jsbsjksbqlb30sne0mcnacodfzzmr2c8p4hqjl1ob1xunsnxvijhc3rjz4hpx8mvuytdg9t7m932twyb48lsb8qg8tnm01v93s7t0b1rdiljc9k3nz909a5vpol11296q58ruf8t8scch2vgc0tfm0v6m1ubwlspmyjbdsphjs5s8iidkn82o0bw9rhrczdum82fx3l99zl4nzp4pl3cfklor0ubvxxxg91yb8pduvr4zgls10sehtd5plppsxca7fm0ksb88f7ir5ojb8t87k19pbwlmdex8ctqj8zmgqgk0ttnzixsvd6u5ocbd1ymkb0r0ai9rhjidmasjt3wtrqtk00vk2m3mo9j6z813uslum1u82srlx90o63hzdzhpbufgih7s4zwle4uoavzacjp9ca5oqt8rzqoc5db01hhrw3ofpzxq0qbw30md3r5ijwpa9kpby4v1gpa7kzgqq66qtuol9f13n5eyji4e2pb7og3mezpjzbcg5t33avxmpfw3ofe65b2lx0ex18tngeddzt2em31qxfgprqd3slv5nqlb8vdlvjgceo1uc90id9d2w6erg8pon33t0kj3vecein6z94hd8n0okx0578zor3psstp6t35run2cc8ep05odoo3jadt7eoeaadbxieeilpugry9uwam2iirc303srslkojki057u2n1dsjndwwmzc35wafn9g8g79y9g4lsuy7r2a9ws19xa7qtrhpzhqlipn56njaklg5bekr8cqmwjqzb16xn2qpsql5wju8oe966hzf88bctp9m4qxf',
                mime: 's315fvj9ki02oacop0rgw8l8go8ooyd6csyekxmgthsq8zk0f6',
                extension: 'q1794c2k8vyid1s92r0m6cot8ukvels0qmc545piohm6wlhx11',
                size: 8243337025,
                width: 542617,
                height: 835751,
                libraryId: '0emr796aqzyxny4k6du5m1yk77h89r2zyl4u0',
                libraryFilename: 'm2dj9n0kut6ioq5uk83ut208anwt0sx6vgfbsbqnn9uu29pna0us2rz7owh7zf94jl4thenspr4809313dh12j3nbgia59mxinugr9c15c73lenutx4xhi9b88yum71bofc0htt6hdq7cllsdh9a3qnq1mmndnrfep9idvw8bybv3g25rw81hwv79emjcbs993p66lexzna7jcwoi62gr23w77q3h58k1b4qk4jfhkunfxever8vw8j03tgbjo4',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel is too large, has a maximum length of 75`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'bkno4rkr7xapczwbscev1vcsoyzejmzacisp7schrwim3r1589ere91ac27q3tn0w9371qd8l9x1',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 557116,
                alt: 'dbn3bu3bp5o8yl1j4mcnfl48a36krwyxnatisjlxisjckssbpwjhikypexhewvu90rrrq5zn0c0e1q8hzcdxa25gmbc60qb3o1t8mnmm3yg9uqlqemamf32ec27651maw50kp8zwncjs3m7y1ksxkh7b38fpfy699q9w3a4aaq9yhr82eea24q4svf8zjmde4r228x7v7rsol7k9r3rk6qqh5vh1fd75du74bwjk1fl9gpt0dwh2jlxr7dengdo',
                title: 'sa30lc9lqzd3mw5ehsh3xhsg2oiy5by0esvzui46k8idirc54ctkfc6uwk0jh57asbt7t9mjxrnxn8izvhbkhp68srcnp7a0y83g7pyv4ay6k8ip4xehz4j1xggt7g63r2u0hg6a8nrp10jygnl4e2iv2lefno0q89h6b958dwfhavlu9u48nncf2uk6vsbe6pfpkjipb96ik948k2uf5vwlvcoj4iwdz531gbbfhizm1t2zlsl3126zhovqukm',
                description: 'Voluptatem deserunt quia dicta nisi. Ab voluptas ad qui tempora est nulla harum vitae. Voluptas aspernatur quis dolor et tempora corporis omnis. Ducimus fugiat quis architecto consequatur cum. Odit deleniti vel ut nobis sequi suscipit ut enim quisquam.',
                excerpt: 'Architecto odit rerum maxime cumque vitae recusandae voluptas nesciunt. Sint qui veritatis aut fugit vel nemo. Ab sapiente consectetur in reiciendis corrupti velit dolore.',
                name: '4p58osheu568hypfrn2dzj1ptydcxb9dvxfixp33em1c42ct96kxulwn2au8eraxbpgom3y79q1pnrovvuw5jkdkd3fnzb3nrqiklubiv8ppvhasnfhfabug6o4qzc94idauhbqq687xbm47xm6fu6olr2lfjs2yvzo0evzpxxa66pepvg9lh9pzjlpna0g23jfpd8whnmzujkzdm2ja4ik8wm01so8hvlbw43ut20au15ehvjdqpqzm6teuerv',
                pathname: 'k792fxzrrf8g416vna03p2j1g06dwv4du0hw8c7ng5pdpns94byyxwxoujvdm8n8p3gvtglxjxgr26j3701pljxgl889n5ksb36zh3v78yv4r919hgerjsumr8in0rod57n4j6uqsh2lqbi3cwqk12rxhhu1nx4rcylgthvc121pty3w6jg30xd91jvefpvzsfxyatniy2kqco9w4fptcs34bzh1wywtpj69gmn6q6frpel9fx1ju33kjsjcvduhmre46hg3dqhiudto3iilwdte2u8vwytzxsc2qqyut4bmhpqt5wazn3n0ms3ihef8u10n2t1ombzhnfbr60gyut5cfpdpsirg9vq33fnk539g6o9mkkc05oshwbtpanzmpnm5nyza2dys6z3rzvor4tjwdymbicsjpz4q7orwoyo5h2rat98t9jm2l8rkkirn1luipdjk8fx4242k6279yiot8bh04nfd42r8zu92jxx5zx9yw0gbvll6rke6or8zlncqb30dlqhkkc8lo38rds5me9x4gb9hlfx2cdo8lhpzptq43z1al4ertn1tmqh6ski6iifynq1p7pbvq5cwhg6kzkr3vwenvfjniuwf3pcz9bnb5gs73l4pa0ccmbjems4yhznc4l5uqcim273a2su5q57yq30l6chhp5jup62d9qkqax1g6h0bmhjz4v0wec34iu57nao8djsqq5sdw1ag6mmzz1e6y3mcwnn659bsh5ql3mtlozwuiayuzlg03b3y8lvwj0yywjf6unji2sr07p1cpngt8wr9u7p9kwrbq4t4seh80a74chlu5s9y344zg6nsuhvmgpsu9qagla76xbwz5cxmkhuqiy2h298uegd9lv9slbv45kp7u2tj4afizni0hpcnjjn6r8zu07m91eec8e2mbjp8attpraam7bseev96j9gkatc0ukk44t9p7mx13bmanesl1yr85wzscp1x584f71e8m0qtlgm6oiw7ryp8rfhuaoxizriz',
                filename: '9dlgy55o36f6ub5a9glwantgm5lvhks8kiuvz4jiukvipqwkczjpwd49uil2xqg2v28xlqstuunj4mvnbqfp7zo5lx45nljwnl2zhs2n5o40gvfvoewereby7yjhjt56yce08dwjkssx6bc9zzoconprxdk1vo3lc3sw7tev12xs8xu1iadp2hvznmtzt48476w4xlnbuvq32051rx7lv6esfjamjdqkna0huxc0tgdpx79or74sn5odqe8wjtu',
                url: 'h559tak64kocz5rir8oqvr09gkpeew8w6p8pjr8pxhsnrbrhv67yiae7etdg7jw9l734c2e2mermkvb9myrza07vz8sryc0kzstqsnu3764ftlda9mo93d39ou8j6ura45dub5apssmg24zxyo0vd8ieevu6ne8qsatibl10gmbtumssel8iwm0dvmyept3kycqqdg7il4nxnz16159esc08ts9spq2lyt4ydxvfuwrqsrkzwg2uko6z3pedqlvr2zs7hwy3as50n13qqqdzeewpd3d9771csbjd2jmvqs96243a94whvw6f8wv94pnucha22oveuinqlk87ixirgtw399paqf0w00m5t6w98tusd50o3w9v76rda0a2xmjtllc9wlckrmgn32044i5k7wzzzy2nhaf6voxv1sedbwuooaf6bxita11vsv2t99qnyq7xkdvn7mafo623liy386nzjnm373cx2xm1grd4kg2ytn7hmowtg92ljoi4gtqkj18esjih84kubof5o9hsw15qcr3q0m3j502n965yu818sq32hpqlj4gwsj6nyc66oi7ywbqkekgi021g86zm3ntbd0rrr38a64wcha9iv6wffz4y1cjs1b3s8xi2us7a84sfee1b8av51aznkkzadkqa9ms8own69kw6g9hsdnpyswk4s4926hxllmssviqs6plxytc5gtneomcm5g3pi78os67bdntprcfbld65x7v9pi8t0a66v2kpc7fiud43jpffht4of0hnxos3t2n8lerilfjwtc7rj3g66uviuhmnhilzmxoi3w7yzzjjg4r6ns1c95k45cw0oz1lru3r30yv5b93v8vat7e8zdz8qo79vv0ac8iver2ldh88ry04bp8wri3rx0hovxf8r5owplsq1xj6bk5whthvk9jufvw7f7enzaflwyiyyvokplgbo2e0gzig03ery1r0hjholk4njq9uf4zy5oliyjxt6sc2ftk7gp8zncikxu0yukzg',
                mime: 'e12cbae33bsqa4awl967sq9wdd5h4w8rzxucgpy0z6gnb3fogv',
                extension: 'lnenva2xzqk7h0yif3vl27ofbmcg278gcrfylcycn3yzl6azdj',
                size: 8437497917,
                width: 750417,
                height: 543629,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: '8aui8m43u3ffarafiez0ccjgdsuenrrcl844bkvcbr4a5awm67x00q1in9rlktp5p5w6tamgpc8jjpgwd7at7q3eczfg0qtab4n6m9zeine7pb87lsk4i86hzgu4540llq02yxcxadp0739fxb57f1jyzx4mycby59z0wnx590k78kunh07yy4bbmn2oecqz8xq7ce20hfdejwc00wpubv28344xo0id487bkg1sfirknylr7rprzv5lqap76yd',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel is too large, has a maximum length of 75');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'ta81dvmb5lhf9bn21yh0oyj7rlpiiljltx19wf5kz73k1u72ihrrrs7ourwuut2ked2oa0ylgma',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 1334048,
                alt: 'ic6qxbj8hlr9fngxu0n4a1lvcgrtswyngiqyyxtk72h1pikkb77b580wsua938zsykgg5mqfg1e9ynck66gugqbe4g6vtkb85wbdzf0zo921c7pocw1yghaoz8c2icznw26oeu3o11keaui3fwqskhogzg8tlqu7syiudxfa07svrhe384vfgicdsw13zu3gpy3nhbel5we9pnihff3gq82lhorfwxeoefo4lz0dnzi4j8mnicnffsg927o2zk9',
                title: 'cwzbaflj5azyz8nrqcwpv2crxtca08l1fl49ny73vl2vx7egylwvrgvaf9bp9s1z8ny67j9gy13d1igf9yj4ep440tx1uv8bqkn84ed4vbijjcf594fog6135pqwspzmxwxifabn5f4p2dzlje895r89ovsza741wrk27y0mtznk8vsvnlrw4ns5tmgfvpf3kebld5xx7u5c5pfu6aomeht6k2hdq2fmvkry2tts1hu8zvkqhgw6nju1eeqr6jr',
                description: 'Ipsa sequi aspernatur. Corrupti hic magni commodi beatae voluptatum fugiat consequatur beatae. Ea rerum qui labore eligendi incidunt consequatur animi totam mollitia. Aut voluptas dolor qui.',
                excerpt: 'Omnis provident magnam id voluptates officia tempore at. Quis natus accusamus. Enim laborum et qui est voluptas et impedit.',
                name: 'pvujteux220u3xy6r075csscp6eunq0ujdlr6dkjorbw3cg645zjmqvfbradmylb3tfkquf4a0nyym9e9ha6ak5tg032dnbl17xucfk5nqo03ypp3349qr58plodkgoz9ler8ykejj3z6k97f4xem01oi9hv7aschsda1k19da72jrbl3orrbt41zfzy0sss548d1u50fwohm27uzjw29xlzc3hforpnc4vr33hy3dg6qzkmbhwa4g81r3ghvwa',
                pathname: 'j1uqlcoj8i67qupvj5vstjzewvtscaerzh86qi632j891zsv1c2m4x6wx9la3latez3nv2hjdwm9muw6gl02e0porw9cx6quaohm5gurcym0c7q579bew6p2w9the3aqq2gmjigyrimwt4ue8ro7j59vlfrm85arnb2aifjag4cya58c494hitrh3eszjn3bk1etl1szgmjmdnkwwsw6p7odrusnu8g5xna7tsxjx0wvh5vf5ersp6n9gengw7todspi8gq876f95oz364sv31u82wfzrmqjt5s6urxbqfj6geenmhaiji48ksyz6ba5dysdtyilm9uaad0kdfgtsgkgtxtp3pnqmqyjwj5ls7jsy02fh8zc50ox6erp8jtzmeitz5n8mabgixe2d4zivbstfogts4a40k0mbi11vyx46riou8sir89tmk6d24ifi22yu87oo7i0yv8e8466rvp88srps85ixaxhhb32m63jx0mdf4levk0wiwlxs3g457ctp3c9kr5n9hgbzxn5xcxa8xcrqdaxy5calmjf00oubt0suclsbwaxkloi3q5gzrz7z45eknnj4qqplgd85aa78drhp5b9enfnzpmr85aaq4bg54gfdh54q7ig1wae3vq9b8yanz1xf03jipmh7oqlcqiehihll6h37x2rmtij2tjnljrlz9nz952g0iqrf7kj561orzpextice6fejf8n8tnt1mk1hlqoxphdemmbknpem9ylleakn0rufqzik7qv50cfgwtnkrkmgbp7oxrqfq5rwlf4bkcx4o5yjh1qtrgrgaqtijky2s7ym5c7kp1dn92ixu2zfpac47xkr3hh2dd7wvsef9nq0r49vizrzmt01vmzewnjos0ynfjt18oexdhbokb896xjhvacdtcqnp79wtadz2iupnaegda77r8rhks7qmik3bz56wfa6wq080upqb4mcaqm4xwf1c43burx1asy5lvnmade3h4y0c4ocxg4hs77u09gl7ek',
                filename: 's2ay07huhizs7gcpvhartojxc9mijdwdtn7jgcxs1xzqzpahi5jp5y3iupjjd6v0cwaqkruz4o385o2lsicu7z9rfxpax30x9wajrnjw1mgy0gccu1cccb04iuxecr813uj6jzgiv2yohwjmx7vdzonktzr5djx59lkudu61jpiigmtozy3ycr8eejsinrovnifynkrg0ojt20wjy0q369fzc7073mbpqbhab4b1jocilupgya7b19msva5qqx2',
                url: '34zwyb6thaxjgj315x0h74v2je3lub846rhf9f4fz1xjc8gu6x0vcpidv9f09ph4tpyir04619cmq3t0iun6gtq3981f2r9y08p3rw0titn3e63kkf7gw4jehk9k71z3ywdf0isfrx2rtvsidvqkjt8zlwj95x5906ic68ykvs77wycolw2xdxz21wf3h46hz40h1lali0a7m2f0e8i8p0pzi3l0u35bo078imcbi1m6hpyajyqmtapf5g8wihz9uxu2xnhma1amzt4feecoxzqhojib2ll0mtvzbgfsiqqavcusx3couocgtlmmb2jwv8he7sxa3z0jiwbswo4kvlroyb5kec8hyyqfd1x1v43iemh20wvpcn6natsvhoc6xxltbmrla6l4rrgmvc0liymcm9dxoo9lf5mr58jzu0lol2wq3grehtofw3eiukezr5b8i833hpp38y08xvcw7x4g9zsq54j4vdotfnwklbygcfmj8l1f2e8sy889wbmtgyxaza21y9kjbn0g2x2tpy813trb51tiso915zq2noein0xbr8r1e7yftk2okliqa318691ohxud8m48i0vk3pbrbjlpl43716fyu4vibmypg9s7wvww7pn3od6ys03syh0oc17h2l78lcb00dt9mdbssbrzi223aeef82og0zmklra8dd45kqz32h3boir2n7d7nakpyyr0werqeyflekm61xhidzs31auuztgcxtijrtvx5mjawgva6spy1dk4em05wzzo3zaexrj7njdcbg008c4q0lx1mgu1wp9q6djg3bykiluro64sarb5390cf484zm1ikx6yuxc270kzlgprxm41h2ajqiw4h8aiocqh2laf25jhvglmg28s30vxoqu7u54dqiy9tmy1ti0gantbpfzivy33myftwy12anga1f4bds4sjbhrr572bz077nvdj33hp7ymrw3uo0a14z5uxo8b1qpb27hc12umfmt24x5k7b6tasvkiv18529v',
                mime: 'nmwsk23ncfoxr6ytimtxpcux0qcjl2vaq2j9iqedz3fpipu1yx',
                extension: 'sus3qxyq8pi5i0ehnzmersbld24ubn8ytyhlw2shrpkaqe1fr6',
                size: 8133948285,
                width: 262638,
                height: 737313,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'a6gxpz9xrrhi47ts7nd59hmwydloqx030466raokixuc79v1o4vmscvzwbpa64d5s8n11yi74y2a56i0jaggaa6aq74uc7lhr8m67ks8b0mtr70lm3q0uefmwbsb6qabxqhr6woioymnx6j0q88o18tti319ba1apgosf9xet55pyb5xvipkcnpv4fzjwmm7w1h58fo9s0ufxmj3lmue8v1ulkp12am3ylhdg2j6q5jmej345vbfv18ems7sewb',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSort is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAlt is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: '4gxrknccaq5zd0lyi2msg4hr6dupr6414faet1rh6uzztkxu756nnn2s5eh6y3l9432i95667ms',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 992504,
                alt: '2rkk2oxl4vpj2n4gvi6i6yui0bvffdbc02ivud5ysf83ebmq5hnhpxpeg2q0jxqkzlg3alxcn09bbv877b9gfqebiqxnik2q6hxuegkkgzd92cjlsf97kd61699qkbp51h04f5ask3x1mi8x6r0fq0ol26ffrqrrdfcp8f4jhpa12nngxv5gficf3dwsepevo6ud8rzlslqhp968us6n6gsib77f070gj7rij1q9wrriehc9p4ew0u7qyygsxj6w',
                title: '3vw3l3ke095r24z6xkqc3orjh1yextiksyw0beqon37h18b3p0qp2cq1prlyalxrykewov7ahmwzdq4p3d3y669p3b8hb53uw48tyqcf3kzhdstdb210ilt15o6mdpybreix1pwthzhx5azeqq0gzw9d2hq9g98sff8c0mewo1kp9e5kyoul2nkt7kc6vg9kbx5qeq33kqia66z6ylsin544oecyjdsook2yws5661gdgaoujqkha2v1kvsm6w8',
                description: 'Sit et dolorum ut corporis esse placeat ea voluptatum. Inventore et et nulla. Qui adipisci aliquam veniam nulla. Sit labore voluptatem ea voluptas velit similique nostrum.',
                excerpt: 'Impedit aliquid ut eaque ut molestiae exercitationem aperiam sit. Eum maiores culpa tenetur sed et beatae. Quia repellendus quasi consequatur suscipit fugit quia. Incidunt et doloribus voluptas voluptatem error vel.',
                name: 'xcoqn4wxnrhq2hhudl9qv9ldcd56psh50563s2q145lus6olap5w0y2fgiag77pfgi2rfhlosdqnbm2bgrujtbgcucyg3lzxtjkx3gsdyvf76anwasu46a3ic61z3m6ikof8b1deflzn5smuwie2wjp7119d5nbdhrmjgak651zqlq4h4m03uwkrtfy6zd65gdmpih42exzxt1loy81dak4xnsi7xuwr0hlq9m0v5m87r165zjnx49rj3jdviz0',
                pathname: '1nz7j94mvzdnwtfvltwuiuuhizizx0qb3p2jvmp8ywx2zktvw5792rc4u3t1wlsvhio495napn5rnmh155rwrwsfaaukvl6epqvcpjzlq12pwi3d35tmhw5y4fe80p18onlbyfw6l20eoh9ginzn7exz3rehj2dp8owlfgpeu8con6i316av59zclwd6q3daee8sk1hgsi2rv0f4yzosdwwhfj3hgje6b9vru8pxkxbwlm0vmqcjz52fqokybb5nqc44g6q6gmv9c0o3p6b1iq6awtjbktvczh6ssqdc3x68s9m09bqg71qjgv8pqsnbudk1alp0ha5q2p3i78irzzukvmj3ryigjovm6r6she1u4wt96evg8lahi2otzcg640byf3kbak1lflgofntph710bnpdn6kpp9gcwxq64mla0p2m4f1hselj0k8hsw2zrgjr9ajuh3xapklrjqff6qwnsl5iwdbhzu0jlqdvittf0lqnyplikslmn5smkuaz2ievk6jrlmsa9jqoseeejhts5eigemqxte3gd2691ai8op16h834i6drei6b2z71ru2vanonr734wpcmwb40xkc8stmd2vefbpb4gb2gk7ttesgrcgh36lvbbszyx4dlp960glzbe9c3go42si5npnxsqtb8aj6hix0ncsl3bfgukxf3kt50549smuq2iasap21rwxngo8p60mo4lu0kbu0xhbbfx2puj2teqdiph9gx5ir1oemar9xx18v4bswjec1li85p90in46d8hb88ni3qk3cgdowck1835ayxsg98tygfy6xtwnqm1mwqklhyar23lq2lbo1jwpezm10dox3v9d9upvvln62g3hmhfmfvqca1doqn407ngguvpabvqazqnax83rueocq8p030mudkbl2nasumdilcw9gp7efpb6m5iixmx6mbxh3z64j2dcvqj82ncj3mexvk9k69cnm009nee7dpljqhy994y28sfijquspddwqmu65b8tlr',
                filename: 'ds51hoaiz9el5xqbm3846urixhnfkls2m5oq9wpanjxfbmun5ql4jkry1of1zxjffap3dfyyq4purn27gq2j7dogvbgx00rfolw6x3itnciwcc1m8d8viqgatmj9zsu67flcu44io2dhb4qw6h8yscijvlu7pwmr3o33lbb6c54s2o1kfqehcv9c7k1mk68ppws1ab2hc2sdmyr8akt4utk7dcsrv9dnu8rx498nqcupfm24ouo628jaitbpw2d',
                url: 'uwak757tw2oyywug6iyl2sxah2zes02nwbwwiegaqnx6xle9zj3orelj4zijrnvrh47ziut40ay9evs9lqvk4jrhi0egzr4rfczvfvtceeoy3a5qlup43h7c19ry86o6jxg814sl7wviz2cblqtjnwmyakkhy0c93h2rdwkdnxf6oa4kod4b9auqc2cucbj25wl7ovfa5lrej7aheb0kgvhrkyum2oso855ybq8emtfgh2jet1jnkpif4dtozdtwhwc960k3ri14xigf2u57c5mi9ma6vgy3h4asfut5mv3ohve8nebcahcvubf9bwen86t05w8u0g5kwmfbod4o1zrs021y35nhiijyxoqu9n42ns1guiopdt0m4qn1lvkzli67vwy6tzt8nt1hwnjdxqtxr2evrpx81oi3as11sng7mwgg2vnfot4iqusp320xz530uh7m1jehsvsbax454bt50bnv2ir9zuqte1mm71cr8gctiyu7asd2wivg9jorazaymafuluqiasv863y2ukryozbn2sd79ntyr4hm60t3aln7a5y0qfp5hly0uf9zc0dht0wglw0fdpq0draj7tra4v8gi6rfvdy6jool1bby52s800tqjthuzo5ro0c6vvq51bgrefo71m70dzhuoqrkuqrpk7kedud5lvrwvibv5hnv67sq7gyd9gtu14cf3h4n16poxifndvwtj3nxqcpfm0ibtnrz77gzne23ddjxtpbhnojgghc817sb4ldarqts6tgw2cxcotpxg6ntbuinv8x3lzrtgh4uds86hbruz7ri7ycj9piu7yzliaxl5wimlvhsrp1hfbfa3u8fotc9gwg1o7gancpskv4kmj0tnr2hf74qfyjc7mwgduhysk7xn3y3wq9oo99g4onq1jol6lglgx0juoinyssncuzv09e4rerkvspy8hflnklp1kq836u5gt3fa8x4du1uyc4xdgqex0o8gdwd196csmfuva2qox1lna8qyu7cs7vx',
                mime: 'nnt5388rh7iz2n876kwftzoywowq283m0oqx4xfjnu002mppdw',
                extension: '9peb2g5sh6hc5zs1cqibacmwwf4roxu43htv6qzwymi2ynleno',
                size: 4993075609,
                width: 236295,
                height: 251463,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'zmlhxcez0mrdoinwt7ldn5w88tc73cahjn5be1dgyusxcnb8xqb1bkmeu8c9w7h639ctziyzcoycejshi3b6lmv78wkg0js20ks9qd7uvpcrxjunlv5lexlpdi2vd2i34xhuss22mv0uci1gvenc6rq74fkd9pwh7n267m46cu15aj1dhwcomeyylxk25tfo4pvzo4ti1yp6ij8x2w9i112mye6ubknoxx72l0u2wlz3gmdsy0ne06y1t8qc96m',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAlt is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentTitle is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'byqmylllbyseqwgepplcq5yss90zufbntsrahlgyrcoc4tz0wk4nvn4codjhjkkysoigr4u1jl7',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 779309,
                alt: 'vmy5xynto7eti24x974kv3p3kt82258eqo9s96l3ghapeynj2621gn5rhe5c031338n4z1cuc3ua2yypnlhqh7hvbmepjjbco506sk2vxwyrxtci2u3d4zen4qckm0o6ieuky6wchxfaud2fyy0e4iifk0rmdkutass0ahpg39mf6q9syq0et2czowcdui9hw2ipxfdz8oeobr0abjz0yx9eoe93mcllyqbct974u9mv4xzxg6udcmidtczbihj',
                title: '7c140bni85hx0x4zopwk5ikcfxyg3fjp9go6se100kvnlxuib0l6yd1efksgndvge6sruczwdsy5su7rid48yqps2v0eoh8eq59orl7dbkqxkgqk4cs54yznmb6yo610exblyqy5ebe54jio9omkcsmifvp9ew8mxgbsaxro2mg0alb9x77b4nplbt8p4s2y5zowmo7a1d8xcqp8xe7l9qy0jezjtqrmkb66o4h79zyspwagne7zyh6c8xpm1zwf',
                description: 'Facilis magni voluptatem minima sint voluptas ipsum excepturi. Vel et neque fugiat delectus dolorem et. Recusandae officia debitis veniam laudantium. Nesciunt voluptatem est ipsam eius consectetur itaque. Et modi veniam consequatur qui aut. Quis atque aut veritatis quam ut.',
                excerpt: 'Velit sunt aut enim quo id alias quas quae optio. Omnis qui et ipsum velit qui molestiae. Odio sed soluta dolores qui provident corrupti. Laudantium ipsam accusantium expedita consequatur.',
                name: '9js9rirfzrtrpmn0k1pjl477fr3e0etecrm9wlhabq9hwx2ustjx31va1zbni4nm5ghuyc1efzdmmyf50xihwm3ouv4y4mj1lun83srlekznqucufc4l6rsrz91hy3bi3w4pfma5nuxzergxgsnga0x98e5i9tr5ribuyr2cj91wrt5v5vlv880t0jdi7y5swky4k0g94quxmlzo27nsexvgy7ic7r6y8lh02gyoiaqctu5mnwl8mti2try9cds',
                pathname: 'wvydd1vbqokjuxo0h5n86nz3mexx9xqg2uuk3w99n6kmygrfhp2j4jm772lutfawbmli8czm61nygz258as909nrz8kq2nmcw06411812hdifs8ahnlnf9fw6mxj36pnd6fxza810ndnmejo71v0vsjs4ehn5nn68dfoigkwzttf7e96rv7y1r8sdidmkdz1d37igu8xhj2bx2qb71bu8152mt8pgi7pzmhzo91cqcomg1wq4c9fmackaxnwc1cfiwg9un4pzq4rcrp143sckrwxo2gumsle4ptsu4upbdo5l8vd4i2yjhg8sfmrr8c1dp18r9ftffrovok8x953lks5orgmew1fmzn5e76ys5mi746n15g1ksa1sjeyjvwf1ghe3sb78xxg9nputpedw2zmpzbdbafxz38cskmj5wjio9z51uheotvyz9zco4157mek23f9yc4cxlcb7j8664vrb1f3umfprkd573xrno38d2ndj8dnu5vriij98ey8n1o7xki341nue7215vuuc0n3ucs8cp3mozshxpgykh938awavxfg45m5fbhgkc2hbn8tcrxf41gv6chlpj5qfsknh76uxb98y1cffve2fvo37w37negia4ydcz1ykljilxoip3l1z0267mmlgn2c5xddx779z794i06npm335gbe5nbq8cdqsvi7c6uioc78om9i8tztn8f22psbgrklbl54tl02kh0i55o3mujupoecy9j00a0lqds7r8hua2spb9upw2zel3r5am2bblbbylv75oo1fxp06d5fml9znjka1xcz1xyyxk52zy4f6yxtdti9t1vir0vmm88oiyrt986baphqqwabzhwxvhtu49psb6im4alhp55hlg2kf34h5n3djjvxz8w0ewbjobmr7lctv2ultzao19rsvnk68rbodpx0q3nrrcif1i9009kz2xk3s9d5r1hmgdk8wjlui0o57q8h0scoj9tp5keh8x3qsxrtm991gd5ablt31tq1',
                filename: '55nrer891f1uay30wln73sd9cwdk6zgp6vj7s69qxyeen2tanow0l87r4uydwr1x19u0yhxuk64qfqsh42yvlcdm8lccyw06yaf6ipe1g4z4ual9ff4uq3qyr545fapfcxppdiz2jiuk0b50dws5cklzy5c3vt5k0uuchwgrzxlccbuo6o5fb46kxs503vlh2khu1nm257rt3v7c45qvthafta684trkm3pm32unm9jajwk8skhip9gd87flfdu',
                url: 'n9assmzuf3erks3cgtvxxmagvq75o27vii0lhgrku9jm5b17zts2kyvo4o7xgvg0yxaohywg4cu30xmqgouwm7xxvhpfnd3x5vzho7l3ebi3m1fs8v5zdoq8sbd3nh8z9gw0x9e51tbsbbojhxij103tdsh5i2a1loyds1q6seyxlvm6j0ijsr846j663qhbard0l0q2y8dwsmo4kea8263hsrrzws05mrfpjlmtijr0ax40cq7vc28dtc5on6hgexnp9t1tkxkwqeuy6sui2pskwv90rgmlyhpxi7fhqc7cdnluobj4fjf9i533b6qm4w7avp7kxtwfvxxuyo6vt1at3uj26ny8xw0nqzco2iz1yiot9d71gqqeaqi2smkvrwp5839yc2ybn0jbpd1t9jhkx9041iyirv4a5btsmvscb9fj6tslnrkyu3wngb123qgb9ozf4jc82iih0kjrrvvpyunq764q2rx1cdkdbq3v2ksysqss611dlt5qomf0m3l3y1myyy5qrv8y0tifomupzcppjd5lnbvejppvz289qbxcks1nuf6ijgcht4x81m6n0yxxvm31lgoqyy670ho47mck7aq8t2k90qds81pjogev4q4bd6g1nhdd40pr9hcebksf31bxmy16aie72f92mte4dxvwf2zy34mkzrhatvh05wylgo1dt6cdruuixwp1sxd2qjcu7dt7yox9pa3ip41ev68bluo6joeldncm5qdhlbso4xcnj8wl6x9qzswagogprf3h9bpmjaptjoloi80i3s6ve26fhuvtdz826bprgtfiy2tjm2o9hv3a50kmot1relkxjg1wtcry6hippvwp1uwcuxwg44t30kpcgam7kco87u7wfgzmyb4xdfq3x14fwlv4k5xq16b87fm6ujunbwxpkwrib1zr7zvaxm4skl6khbqx8ac9ejtm1ks03fn3vzactzwxj4og9t1lnsui0wcg49ig25x7g80uqcclqocahrr4qque71mn',
                mime: '41a4yituhw5c1ywrgag2pffn6vcuk4nqjyp0nv60fosvasc20k',
                extension: 'srytk40jp31mj7js6cpv5v4rokq1xps9tgq5c3r9qahlojltx8',
                size: 1521261459,
                width: 319098,
                height: 674943,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'z71roa0e3mljxsvkhtky5o2sb5hnmmfl2j121hl5yyilq2cebdtzhyx7w8wg8sccpi05ns16p7vtuvn5tubikwcuxavvyinmlimdc5mmd7cb19mmkglkxo3fl8ed3nfn3pwif99vei4swoqu30yq2npbnssfkuj9cu5f9acsf4wd7bl34zamm8xdbuwiujkj5bu17ius5e7y5ntrhutsubdltazvyzpc65qfyldyrid112ows60d1pazoxtgv5y',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentTitle is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'yjy9j902e4sslo47r3whc9e104kkkkc66af5xxhobmkfs0z513pcenc1v1b0hfekmx82brhnr4x',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 530815,
                alt: 'y34ds99p4aq2mg8wtozljhcxupooh94cytd94tsl86h3cjtdci62y1kirdn43xcp4qbbshh7cl7so8g6vr6ps981kxtjg7slsn3fnpnv0fmc7cjrt7zm1vk8dg2eoqwxmf7ztvj1rit0wus9b0sicp6npatclut5wzby26x59bvqcghmjmi385sb2vpzohm0p9afbo8p6egfo3cwod3jze18vcnjp3srka946kuhk4ks9vv4gv5svv8i9n1vgx5',
                title: 'nxbb29ajj0u25ht8b0k2nxhrzqci2u6v5o05vspzl02qqc617tpd58ljeg7tjzyr76lma4gmprfnwyjjecxoz48c41zs4ggp3nt0628uytrn4hifjytqgycyc1qzwk9ptlvef57wwlram9iyyroujj18zwmjj7sqn86bnzgmg0ynp655uoh0qta56je0z43dbvlyztdh4neu25w1kc91sv0ikzj1m4ejitjzuq8xn3aocfg5qhlakxdtj7ous60',
                description: 'Sint quis corporis. Suscipit non cum voluptatem nobis qui dicta dolore incidunt asperiores. Voluptate rerum saepe vel. Ut eum deserunt est.',
                excerpt: 'Qui ducimus quibusdam architecto dolores ipsam molestias magnam qui voluptatem. Reprehenderit fuga sed. Vel libero qui. Sit est ut esse ratione non earum esse. Qui at repellendus cum unde doloribus dignissimos consectetur.',
                name: 'bfksmy827s5nxa0y1gan6pe7g1b230yk3468fqbyjirzwfrr6gejhafu0uc76mo19m93jc40u4pq7a6nzzh8jzmdo9ma1p1pw83hgr2ppfpddmj5zdl772mrtnxp12ezfz9h93a71kzean8xkvv4wg5pqav0w9iw0zi7xjir9xdha29t0mfx8f4q5zcaxsldh24tocgowlbd8t5nm13j32xv3kxeoexctfyd3y3aoggmsjdmxmb3dyn2e2ottmoz',
                pathname: 'zfzg0yph2v13g60d5xqc8lxzmsto7n9lma8o94i6i1qcl9jvmbrtd81vmqz7z4397srxlglnriyqmyo668zrsnagrjfxtxnz7xers199of0ti1jai7i4oo64nyks89izegemtxbii1zwf3npwtn0elc49chuxaz8ey9tu2rwmajgchg9k0i14aukvwcjarb9dt6l67n62ftconzl5fvnh76i0qqkczg701rgz9pnfdtlrbuh04xpm9jjyc3oaqba5som7wz3gvqj3rtp0nkmvwj2ex6scsyjzirr6g461adda1raoeyu0hucamzftkgbhoz438npth9nhauqfikj6u8honbfz7vo561nq346qh0yo4v8jvbzw1b66glufu1cue1t4x0m6z9jm6ub09l9yq98sqbukqf10j29w3344xkr5bbc7mx8xr07o1aw37402gvmievu8wjbsz214hxg90lesjfue2gbs1q9cbhhvf414b8d5aj55b6jzybufpyk7xgwk466hchccbsext5ps5wyt1slhxqcck8yjp5ydrmme4aatqxrim9ipl59qrlu5g5n5zne97q9ld5nx3c2kzgr0yjip3dkfgq1dcx6yvawcyml3l901zyd8c1a43pvrj08zh8ns58qhatxk6eor0zrhhr89joihrat6xlmnrz9y4fu9n93t7ayzwiom16gkx1skzignfjwuqeqha1fmt5xmgmrf02k2929wmj46dd7lyjptiza89neizebukdjokxwwlr2k4qhdc7ciao970rfh3dakgano43wmrmcj611s2bgbo6o6exiq245u0egbu6ww342x7p96benff5mbk9lr14e1k5zkxajucyc7kq87j9vf9s3mkvieb0w96c7vbdm76vk9l5a8ap72b6eu40vau58jxerm0iyz7nm84bgyviu01xq658mkreikyzjliii1fogpncwl3uaex2vzbkqze0tusjyq542fwae70rsbp04yv931ganyys4i161',
                filename: 'az5huy91nfal22l41c3nwabout7olipdqvw5fc5h3tf63xbqw9w9ql3k2fvc1wndsos2mmxwnhajnd0qkwep63spladm7cj8iu3a1pjzs9jed8n7t5ozjkfs0rdyoh5foxfn681bv0g76gcyjqrko40ij8n166wiqype6faij8jsi68l9ok0c5rxg7xqtrw1i05dh5qtd2baov8fk3ks4jx526kypa0s56b9w8ojwx7msftssl6sdz5dkpkj8tp',
                url: '5noo5wjeqmsajgh5oo3mz8mpe0th048koatdan63fhwaraoqg1jedlp2pxnx9ajx8uny275g9r34lue04a8v3vpds02n4g63h0lzgn8fwbonxnargjyjlir4cjra38ygqh3h6i4ir6fmewg1ri2ijckd6eimupz5o6p3j5ngvrsbsbuzsx6b1ryoiad0ub48a6be8i53yzqszxmoefqqyvbiv645i09r5c7t72zwsfk3dec44xribl0206cep9dteeqkc713rw5iosjw1esdxaieoyzz4eggbul4iy4hwkzp5nud5d78vzror9vtovjzl2z5ljtiwg30yopc89cxqamhc4so052b7d1gkza17x5b3iq5gttc21iw05jeg8kxrwg1a68fezuukjv6tclnujfugd99huu7bad60sib1r34a3sm4p6kw9tttv6l01w55t4vh4itgbt8rqu5cuslrpw3l6nzm04nsr6eqvrqwh46oafxudcccfwsrdrjipuzxuh6zehtvs8lp7r1k3yacucdvp1zdont827d6d8luivg5jiojj1lo4gdw4y48sftnukuykczgu5vq39svn7e91tz0q5rgj2llzyke9nhym49fmg64oqx4t2a5gpu4bno3ads9dagmyomi805o6ddq91cdit282mbnai2uirr3bayz3bmre94x2u2k5eb9ag1yy404oj4t1clvq1g0k43bqei3hxoxyv9ny1gjcit7bgpdq38ah2upl3h2hfb1x3ltke6bczlf2jfheyak176cbk1fei3hggukl9hkhuivfyj2l8r078ul4183902rjnbopmdspiqi64ilg5vrntc0josf40ge1ek21pdepfolhppss5asapcz0d595djg34s3ywosd8uy97sc3bov21qoyfffmvsqqlhodcaexsdhlw8gfiigprafrrh5b4empeyuftjt9sktm9f6ibcg8l9p0gondq2n552hw5a7kx6qhu67418eanojhtk2islviz1',
                mime: 'zlyc1gckerczzqgppqpb54pn5o2p63iidy95bwiosdy7p7esb9',
                extension: 'b8ltbpvq2wv82t5oicyay8hei814dztd79c9sk6vckaern44rw',
                size: 8227067437,
                width: 121281,
                height: 881281,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'mo8elbdhkhreypclvahky96w4xkcehdj4iy00mwgc6u2pvldwfj6ygxwuwf941bvw6zm0nhqqogmnmrb1256md0ue4pxeff2gkdz2dpprmdm5p6vt5u8d5xbol7at8tplzt0hnfmn3qoh99gljc1sihgrfbxymk5a74sk45yjg6h2xu86z5bein69rnromj16j2ue8bkyyb9wrpwj7my1t07tjbcbrqzh76yodootp8o72vjfv8jkxrhnf88vxh',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: '5r5vqk6dd4g9t4zgbbmrimuq7yxypnam6e0yqq7g78ig1sx6izy8nb5ys33zs7drhfedf8dol6y',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 382214,
                alt: 'qbytxbwtyh0sinorknr9b119ke4lygglgp9q9hfbdl8vfkomxh1qavd35uxna2tuvdds9o8un5ccrlizplfkrgwuleywzdft0wdbaelmjy3u8ls94ph0dyv18il8w0qcii6e4aiqyj8yanxqvqvt4obn49ag5krff99pxymw7srd0ojzgz6zh7jwziuknf3fapkn6tbohu22tcggyh72ekctm7dcp43mcoezwr1lp764mv7v4bb0j38gn2zwu4h',
                title: 'cgxp1g86yre7lnan57aaqmfu93ypkvpmbps16y0gd4j6rfct4g6ehi0oc36gltj1frd5c5molzosmfjulbaur32xduhdx6pwob1nhfilzprb2r5phvc3irxiaz7hjpaocw1gitlosqsiwtl05qg00mumjmszops5acs5bkys1xqvp6x5e9y496ht8z7u0lu6lj9ds6i8po68o3t6cs77nzf33iepucn56uenbe7xl26czmoouxmbll41153s5p8',
                description: 'Soluta provident aliquid molestiae. Voluptatem possimus facilis ducimus repudiandae itaque quae et. Quia nesciunt vel odio eveniet facilis.',
                excerpt: 'Aperiam quis id sint molestiae. Est consequatur voluptatum consequatur vitae voluptatem sed. Est rem et. Vitae eveniet excepturi et et quos et.',
                name: 'nmqux18re7klhj6s5844yyhtewsulhj8f4i7ocwew9yoei8tkptwrgql0n9c94830m07n1tji4flt4cqcmbls279jil0l5uqbqqty388uxrblw1zp3dfrp1i7w3daarjn8ftrnxpfev45pm9byvfh1bgwmxod38fzyyj65dexwbqouj80nw8j95dcamj905z9cr14mw8cfkm6pikepxr781l4kcwxcwx3y92170zs2z1i9dwowpq3rqiw9kn4qo',
                pathname: 'v8737pahx404njvq4egn0drjwnoyxl6ap3kw0ds8h5xhdxjl80n6spe57vrpba6vl02q94dnzp7dulle1xwo4046igp43oi6aiw8q2gtg4jka36xj9u3nfi7rdm1am9xdp5nbmqcvutmssf3e856ot1nxe3xgz7it1dergngsrfj6cfo4wivhpjdf8atrtfg7m7670ge4u32fsz8jh94s6yrc5300gkmopwn6449768a6zfajcyti5bd6epluy23en5n3a8bz6b69opdl4fqejolsym4x0pgwyu0bmzpnitocnkcxlqcz38cwhegazd0vrnq35kt4rnkayjdm1lhj4e510nogi6brc2qah499pb0tmkk5diedfze9t7zmtkvd6ygprsqj5sb9y0fpdbwqaijegxx688msb2ijw9kko2pm8qb3ubcjwzeuy3wspoqi3v7mp9ntz3ij1skv0hrw25h1zqew92jhmcftepak2ee132x55ypm9861yio0tv9iw41m2anpqlomjcik46g1rn3yys16vbc6bzqcwppojtgu4k5b0m5gf099n0sjzdozz0bgvnzxe3dccc4kl5zr9tjd9ux8o207xye19mie3qw5xtbpr0jr3djb86yw51dyhxf1iszd1skdqmwlsq3iasp5bzi3i1vgg8awqqhhzxwsdn4rdp61i5650v95svies9p3rra6zef42s5il0xddf81a80a17bhfpmk9hlrt6rqcsjumly56ngx4q2n299y9atvlt97rkwy539dpotn62qeuy4kbrhk4372g4o6hith8pcwf2yeb9plkef3hav7wsacg6b6y9yqgblegq8560uzz5w2kq9lytqfdgbcovc9097cvvd8sjkrce6vuzl3a529sduor8fbz2fsvzw73gpfvhi80spx8bpt5qayhy8a5mi5ovwg44s4dwztgz8jx9wq74xipdjny27ewi6emmkv7jygc2ge5y7689gvictwvqs1trdpfkooo3al0dq1',
                filename: 'i1abefxz3qtjk4glmp3kyzsu4vzv59q86lic47znxum3ucekyw2hpuo7fn1pnorw2epqnlwqg7onwesjktvp3bjxwjvq21t4bo2s0o3pcxpyb70vrrylf0x7nknit7aszd73e0dqtkb0jnshjuo56tlp56q8fi589xw3yj3t1wpisx9cu5kr2k0tm4hqcvf6g1e9m08p1kp98jaglyk63pn0xiqnqvn0nb423f9bc62y0iesu8xd6xxg9hvv49n',
                url: 'bu88t9xcoql0l987s27twe601ilwn8s3wpajnxajk1fsquomn9we639z4e0rhdlic6p82ehpjo3skb90tbz2uel9l8i2w9b2qzvz5zd8rob9gdy6ji6et68493g64ahp69vjtw5e9w4klulktlfo13jk8e6bxmb1p7b43gsj0l2u1vxtc655ihpbpdqkeqlq86ouc8ibk5rsil0a9w1f1784v15u5f7znrifuri2w9bg0r1zisqtzxj681191pz637f9yjhwokv04v8y0x23x9pq630skh9mr3s1yphq5zyboe58b4aj72otje5evbnqydeirpuek653ljcrxdpro2g3pvxvjwb189m02137r66n48du6c95fn60cwi9zbc75qm42didd8j213vxrn2siixuygrzif76jhnysao5ims54asijt2sii1806nza2goglv2p5hjgjlzkzzxvjjihwsxxi0djgtukw60j2mt5fi5oqewnvpphf1t51rnsnmmgkb2zdpfr6fdctv3frm46g7dv0wxtb4u5m85g7rz13q6rynd4272om53doxqwdanvcxqtfhrixcu6q2tno8zjvwd1tq681dmvhhhchie6da3127u38do52929v64tt7awm3oh7cidoelioeyarntaud09t5im4zgwfhutou63c0godzb1qllh9hf3pevvdgk96665z74l161uzkh6hubmvd2k64dpcurthaa1307pz70c9awa65bkeix1exknwdybjl6vta5aa9fkhg35357dvyugcw0sef5q6q1pqf3m0zpxegih8big4pbw67ntang5otddrd8iad57qynewievm5j5ltkjjolcoi0hdn0v82z08a47uvtmsybxjjdjvxr8j338w1zdiw25552zv4mfxvzsq7xwzxidnktyge888i31gc40rtm8nzdl2r7q8nkf6j1ma407iimugi17prhwvb5lr1x90h9kmtfe21gmx4o0e6wpt88zpyfs4bs4ayk',
                mime: 'g80pls7503gnos771mzg5xgfcr7lordkc35z2unf04bavxsc9j',
                extension: 'n316htcenmr9qykakxcoek4acmta3os1zvayyyen0ghg4sio7w',
                size: 8814618446,
                width: 663634,
                height: 627123,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'wgshkusjjiynnt2vkggtyekdn6r3cxz5rkz1xib8qh24c37z1928ax4yg5olj2hzzp2yk0o2l27qadu0i1rvr573v6vzqmz2mpbkott7yzh9a180q0z8evus78kuf8yz8d9ivoka8q525bi27nmmzk2kemw0kmevh4t5484jf73mta5t7s004jxwsro9pm5lq4k2eetnn9xyfctdq7gepgqjcsut957fa6yvsj9gt1jdi9cey2plrmhq2clgf9h',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'succpqc5yibzkytd728g5cgfdjcu5ou15x5zj8i8vjjsahz090ev8gl40zall9ekhe7fcnwawiw',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 468692,
                alt: 'u5rp72910hf28q1t59pqmmti6pm4yjd5a28f4vj2h5w0ohtcmssa6hdv3bwkaeytd4d96xhvqy20hyci8opjjharn0hbppkcj3vw2ln46kn5mdhd7zelbn382lpiap18m2ra17itjjyoqbui0qtf8td7oyzjd1no9g9komjg1fu79b621n6o7katz07qg8gzuw0niwot6kkus6a3tiipnqxvy14xd4eunc9on4u7a21ki80bvb8h388v9oxq4ae',
                title: '4n5a2kxatnawwpjzp0c49w027aun8c0q3tyboqzq9ygdiqy52jsztlzmwy1bw2y2cjjlt1d7mffk1x6mspo2dsejgv9entlz87tx4blfyr4aq2mamkocrq62ochby184a9xm2nxgmdbbjye9u9arkhlbxri8udyg9kxqzkymcsose9zknh497qzuxyug5rmdg15idpanfjjj2kq1sp45hgdn9uh0nq8gm9twjtizbfmltjvuvfrurp3pdlwax31',
                description: 'Dolor quidem mollitia qui vel beatae ab natus eos debitis. Maiores minus voluptates incidunt quo labore doloribus nostrum. Pariatur aut facere sit aliquid nihil. Voluptas aut velit inventore temporibus natus voluptatem dicta. Ut eum distinctio nulla dolorum odio dolor optio.',
                excerpt: 'Aliquid cumque animi dolorum nostrum voluptatibus et soluta commodi. Autem animi quisquam dolores laboriosam quis eum officiis rerum. Et et quibusdam itaque. Ad aliquid facilis maxime. Voluptatibus dolores hic quia.',
                name: '97havolovbq2v9olq33tpgixd0izjthpnr0gm6svgld9d7j11q76vly4ho2bdivgljvlh8ltcgvbwnx123iw3du7ivmn04q8zmw3q5v6i08p458qfmbsf956hyrfrbvf3d9h4ybno6yeze2nb888pxibpvrk8enavi0xfb8g276qenkr6qkd7fg449557pj0wfi5eq13wgrtrlzwzkq7a3lx4rvd2pikae1r3tu4f22cr57ana62tgbh15ywykb',
                pathname: 'nusanrqdlw7y4goyj18sqm80mbl9w7s5c5c36zos80hor6fgoll18f287awysz22mtcfbixm2g18xe7cpgepewnyri2eztmlos2y21oqsry95euqi2exwtnqhh20o08cubdqyih2jhhf69rmgpyc38b0t73ncw7z9eu8uskoxx6219r1vyaa0q2uh04foszq8o1kwqmo339g11kip5uk6vci1rzoo7i694chgp1a9jj9uxnfaaxuon7q0cu8rmphu26onvqtqgqd82ta95vugfmosrzk3k4ve9hacd7cel6lff3s9d21qr6obx89eortyn7uc4xcfenanwp6uu2r6my5t9ssqb9n1m2y41chtwiwb9lovo1tn9gg1weec6khj2n39gpsz601r9ggey45nzwj6es9hppp2g5980qaflliri3ja07jtlv5qsbfbz44k0op8obzm8eo6xsq9letd7rbfzijkkdc5qktl10r6adbry57dtnbgncuku86af5apu29tjbix8cu05vqk0orinft2cyqvptsusrmrem2k4wzv79moe2hsp2x2lqeomowfz1zd795pktzgwzz2qa0bh86tiub61vl0nk0at72f24vw7hpxhm956kchu0ec1otcedsja8ryzsor37ruloatm7o8k5lzpjocjrhce8iqvi4b1at0s2m853jcoxkzot5y0igbd99fgipmzx1z44dy8h3xmnbpq7f1yj0ysbm5nwdgf6apw6c8vg67en44d5dnl5570c9w003gmgdprmc742mz7nm1ih481dwt0iv1vvsm4x3u0x3008n2ysbvajk67vcu5o6cy9a5v2441gpj98t0u8ijplcasa1rxey2mt9pkua4gztwxzpcelutf818ohub7etifsnkp6qc47gbzm2r0fqwm62j9srh5hdmifxuiy8hsl3dzl14mnuozuo1thhavk0pbuq47zs0ux372ey7zhca4i8u6ok3hscvvk5mllkpmj2en3gakvwf6di',
                filename: 'ddwvheh9gzhjewpfte9snx2s7hq3x1629jhk0zmkf94k3j81wxxpdqe7vj84izgja5wbz3obbberq9rdzneixb5753mojg3owd693nqo4253xvw7mpda1cst4ruda3a9c27rqrsxaech38zjwhe71i4uvid92ovabou6l1tq9ixc0s5tpngxw06mpsua88bxyeh3rjj5tdtu68k6nucrnd3jjulzc62jxfmnfy5b4yibn5w8c7hr7v4xcj64gn95',
                url: 'uo1qfiwb1wakl85nubp3obp5kmlklh55zo74fs6ina0kjlxyin44s1phqpwmfur9lfq8fvt8dkusik0k01azil5uavymbw68284x2zoenyn702q5lv79m8ndeogr463ph354hcjvcxu7g6yi730kgnmcna3x79qbi3t24zfk6p8njm8dlw3nk6u3dkdhmxv10d9ccngfgcbn2w51k8d4eonfsx9r530wlpwtaoxg3ntyy54328hpqalqyhrey0ufmeu84qh9ife1vvc3oh42xg6iah17ee1ndfqw992td2h8k86t3wkibctecyrhr28blazvesn8mwnvoq9fj3id85ffanbouajqy27dh1i69l6ap5stoemc8c64nmqcqba9n4qnygm01p75vdkvexdvnskw37vylmf72hsvsl4jqbm9skgf157srqf1y3ic2egjrigufa0bzg8y87kmmexmagspu3ca4bgba7o258ntiz5th0382iisjv7h0evbmgpt6pgz729tld20hx0lbl6787atxgilaj65mf9gvfq5zfi8kitw7m0brclt69p76cpvap1kb1odijdo1sntka17cgq346g41gsmqhld7bdbflpsl6ia5b63a4zlisdyud5if064xrse2w0iml2a339aj9oxipufzq1jow1bib2cdi1h1ubgoovnur81xvso0hikrhc6mg2qzkiawqih4irm099whgx5r27qvpx3k9ips3kge30fd7zrmmh6vjyen0ylvtatnr9jdcm6ivy9te2me6btchq3u18meaw7eps6tqi2zys03ww7djlf12r1gxvtm0nirnpd7ze90jutepu4q714xphgfg9o8trksbvz0vl16i35t56zeeywowk6u0is6070npzgtgernnvs3py0qrqnnbk3ln3z4xgwh2aqmriuhfekxqsu1lierfmrkxva18241g8ys24grscrwpj9js8cp5lvymvjoj5rf8nq8e8q15zac9ko3et97pbbx0n0',
                mime: 'yo9b6amzkeyokt526w9fmk1ac2t2ynpommrhw8p2l1wubv9eam',
                extension: 'zwvvtib4d38d0eo3mvfxm2koqjdf38cei8t09s8t1a1afmvcnt',
                size: 1506867713,
                width: 541880,
                height: 576796,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: '5d302dzsruwtq08fyu17j9o30rvghn43ho185eefxo15rnw95mon5t33xt1wovn9kuukozdvcdweu1fk1xoe5gjvf91gxyiyxmrzcfd78akakzkphvsy3bu685byckbovus3rt2ohqhqs99gwh1u4fzjts3d05q6muz9pjxeqsbfonsmhy8irkcqxwlejj4du7l294h4kdfpddzsxn6ozpatwmjokie16gvnu74si42lh08a8pnrtsdje1b17ee',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'ao2t4zlxk9inrvsg8zdu3ecatauv0yl1cidwo2b9ht8qv9hqse34a98jt9b93drfcatbj335mhi',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 972764,
                alt: '8ewy69b69jukpolpew37220sk60qojkoxputlo9dudyqhupuji47e3591zihcf2rrbjf3fqeohb3ww0n29s1jtjybzfsd2n36wb66uyikm38js50msieiwq59k8y0mqydsntg4jjd0r70xy08l7mq6l7lfug08o3s7nwjqnutjskgadnbb3ywnwuflxqdmmuhk8wpj95ydhypnif44kairq36sug9lmfmy3bym5ad860z4yqx58j0xjv8pjo7rh',
                title: 'e764s9e954jegdr2gvm79e3dc6qj4wz7mym5gyqdq9izd1is695nax43rr530f1efc250thctzf2ed37n5z9ubr6hys2si1b89zaofxt9tu47egmg1sr83g8x9qyowgnwk5lyhjabdh8uf7dyb9vpcxlor80gw0am4gisx3gsx0wz2na91qgpiza6am4e5nzv86y0zki120iqj0ckfv08vqf7rsgrdpluakdjekdb831s9iw9q3bno4of1br2in',
                description: 'Qui fugiat doloremque est. Et perferendis ad doloribus temporibus eum hic aliquid. Magni harum aut. Sed exercitationem repellendus maxime illum eos rerum neque.',
                excerpt: 'Odit harum iste. Rerum error quis architecto. Voluptate quae non dolores.',
                name: '64gu0xk0ehl8k28w038yca9y0icowr1acohnkeud4l02w62m9dpuszhzh2incw7rebncxef7rmmgxltloto7jlfppuswkhwae8ptn3gzek3so5amj6k86xfl92duhxhkf3cm608httr6o03hy9zl5rsyij4l36g2ljd8d2ickmpqgaik41j0g7wz66csp0ysfmlafvissydtflwmk7yy4v3u09wzi4rnnmwbbrzf8qieqljr003kwhfo2c0hq5h',
                pathname: '7f0hzbc1x6mu3baennv4dg97avnumcrtxb808xwzryi8uabo2kqkz8qn1zd8b1f68ibv791sswchpefi8019zt26u3j2n6mgiubzubdgi4n1zwjhx8zi6lpzmyi1xib00y63mmmtjrqrd324hhzmd4xhgmz5qve62zrw3xzkd2zteqey9cf4rsgnxpqhufv7o1s8e96koj2oee1dkryukqonnl4cms00wls63owmi9btmvpkl7u93abnxs0h9rqd1ayzotnk2ruvre53pbp6kwxprona73b8mwj5e3uc4wdwwe26qf0lrzpajdndzx28y6lo49mlg268dnfn9mck9os9eoxas8hsq6xu787lgomxgnj88qmdurdyw87m1czqlalw0jzjpod8jaub2jn4ljz0y7y91zxzef0zinn2k2sjb4qkuq4n9n5ipqo4fyaf2gt3s7svzfhllxth8inik0jecym111vm406hu8ty8oabxuo76mw1lzclbzad3sdjku4f89bpdxqpieo7o0aqo1et86xzy3ftncciie6abphazq5ncmnfilp98l3709isvrb5rhwk0tp8h5k37zszd9emcjyph85yxh3t3zfnuite96z1k3f4xpaki80e0ep0gpix06wyirxfdopn0lhi0ozsewgfu3v4c7pm9lxelrdeu2qy7i5h6ssil8ab92vbcg47npttz9cqka4gj7nj84v48kurcscdisibi6mnzqx4xee6v7se0im7qmxrqn35o6fakrn2cfbv31ghtrr3h1ndevt8c5cie4tea0payz5mslrn8qvzyi1se735d877n37j6dcnjdacnmft9hoj47j6pfg13y7t1kp70dwoc1ildgpak8lov744v3yee4mt0arkyydbl6nbe2b7px5j7n74md1e3yxjioagzbe08pwf4dkhu6b6cqxv7tegp29kaymhddj4vuaaar141wjahtawxyh0dfj8kk9oxti68127wxsxpqvyp157q5h4ambj',
                filename: 'cbussq4vbm0lvewr0xkft14rqfquqrzk6nlu82cahtqby4a3ab0hflvht48x8p949izs8xwgbkfvknulk6yyi14yql7wk9ynnvibv39vy0q6d9ty6anu1j4afnghyllh3ga3fk07jim5tzgsxqfr5i9j8m4hnfhe7z17twzfwauil6jik45i2c8tngoa25sgf2zdgari7ouvcotmubt1nvnfcolpj1xxdxkyp2ue5ojtj0il5agfhkehh1ro7t4',
                url: '7s76oirx39gj3iuab9qbk370p6bkwyf13m9ehkalvix4kuabgsrf3v33bqax7rpwh8f6n9pjbv3u4jjv9qht9kvt3vsdrlyidji8l467drp9yf6m8aythrqlu2pte86oqr7tagll6qj8o0u9oc90jfzqb36v04lwuif9wriwk668o2vp4lt0tm2z3dk9ts8myjmfz6eg4cqhq3mfogi7pyuk1exp2g96ub44im5jbu4st8hdab3cbv34m7nrj8ggy6ncy1n731iiuejazp4cadgbq6uix6diw1ax46y33x5pzw66nbebrhl8r0z920b2d75zcf7iotj1hwuulwp4juxpkssbfjs05jlkv6v7rghzsf4hboidrsohdct2i8etwldogs6sgeysuyommh06plkray9mr61jb15c5o59vpn4jwb72w4aezpf3ltxpfk6sgewwjw3rb9hlcigtw87m2ls9hhasete543ptcvd8iu09aujebn2bo7gah1zti88e4mxhe45m821wnf55pvgayb26sy2gnern0rbpbk05d54y5aa31xmnkfc5jfiajo8m7tiun33b8id7d5l9a3o8otgfomv8m50f9579kwjrs4w1voicdjt1satn8jzqlsd1qt2wg97wif2zap5iaibdgadhq0me3wvknvl8qfm73qei9vzuzed85uar82axxvazu5ecotz957uofs0p0e9ou5ufgqps2ip8lojltvadh1e8ykjvzqtfk88e7edkcefztxp0wxpdzd1ig88wi8vnyih4t76pk2ztn70332a2hrkyovat4c0pn15hn9nc1x31s1x2dyyjnhnto15gm0a4g8ee44fogt07obl1774c6g28e2px72ssgv5pgyit3gurf149866sjd06h8yhyw9v82c8r3dsmzajwxh2cereytgmqq7la5w641tbi30o5fowthxtufdfj1asg64y7dm4s8132os19oix4pu8lb42qhr8hk8s5s1rj5fb3836cmhl',
                mime: 'bc8wgia0ruu0alqw6ywmwzcid4sxj56jtyijk4w1o08csnhz9h',
                extension: '5ztktcp2oui0n08iy23rbaintsh45ccfzvrvpnd2mjmoprx3d1',
                size: 3484412434,
                width: 283486,
                height: 446065,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'uia5a1a35v74pd0c0bbm0ysgzezlr40k56a2tn3hld5ye8vbi06txzrwxqtnewfv89illr573yo0pqeb3ye9omn9df7zzokq7qzlm3y3kb4hpvw2wt0c9l2q03znn8dsv50c4fb3egcq6rkoqlg6s6m4idbvn9nalrogfp0sp18dafahob8fh03eqf0sc7sphc9aye5zg38z2mmwywodibg8hhipd1ucf0sz24hqf1fldlxphlry6u99q9gi06g',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: '9m41xumpu6qcaq9uqj2ewomx4h7yswpml3zqrxb6mxm7avbwd6miibo59ralxvslv4gzyf5ed9b',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 678288,
                alt: 'liity7njzjf7v96qhnx54e3crv1z4fntq2wubc4qv3jax3jxvfgzt3n3fnz37tm7p0qjtu1kikttf82e0p2ti4juthnkyzjwzn7oxeo9bzvwz9c9m8mgqw5v10t59nqg9ypqbo4ejzu5nfxrw6xwbstmka184qc6wbisktqrcwnmrs17312rvtxpmicyg797hsf2t0sqnhrjgaoy7h8wxh7215yldk87m6rid9akrj1zca1e9090hmaks5z1jtz',
                title: 'pdzj0e3wo8yhcmmzx78xp5iefxdli2idnwjd0nu5owjdtnu8ev3hd0er0rmdhn199bwlcjha8y88d9q5c5tq86ujg24vtgsn4x4f3p70w81c6lnamdiv1si0m8i5vaqitvxl4nil8rbcva6zfkxq4b0tstxbf4axwrmuxkum0x0gfry0dbkx4qo37kyr0l6rn08jnw514n68qqj69x4qos9ltrun9llbx8iaigbvhsv9yehnuedizyg9afwh1sd',
                description: 'Dignissimos animi incidunt labore autem repellendus tempora enim qui est. Aut consectetur rem. Nulla voluptatem fugit iure. Aut eveniet tempore consectetur deserunt quaerat minus vitae delectus.',
                excerpt: 'Rerum optio adipisci beatae laudantium. Aut accusamus consequuntur enim rem excepturi enim omnis eum laborum. Et culpa omnis vitae beatae officia sit quia. Repellat quia quaerat et aliquid adipisci sunt qui ut rem.',
                name: 'quc20nnbqbjpg0qbp3w3uy357r2kkt1vcsm8ndonoi3eifpo1d5w44bodq0zafsqtr0gpkbew4a18wvvbkfgd8rrkceidk32uyhndlfah3fbymmlzdp8es84g0ognex2d2lh5m6kesxfimht95l5ib959y7f9fpffl430tu9im9dkdd1sqeub2kf5zbs4jecmt0xubhoz99ppxsnz2b3je20v2xvm2ocyh1pzk3b7zuyf9twputw8pj8hrf8hea',
                pathname: 'd9etdtn97u77yt50eqtd7u1zz2y7ifm2kzhdeloopg4yr8viuqxh1tfvvlrsa688kfcazcb3kny3sjismhyug9iw8o18qir5lurrlaqn4j16zbmlguyvk5rqdm4qxl22q9uuectkn582elobtv39k7sfbj4uo385nnx5wun86zlywnajyvrbo6xelp7p5y435lo3r3a9cyh99xen5l4660mq9w1k10cwwftfw8g4hpg1naq4ipcvwgfpe69xeb6j8txwlpltwjyxjlxim87kl1otbcmugzzlbc5ejyyqg76s2h1uzenrdu14jr3bde8tw0q79ldb5mn95jdd6u98rd1afwzue71ptxetcg7x3eatluzubijqesfkfze3d0xkjvz0214kin1nncym2aphkxa3s8wvzf0e41ao9fgb1b0wir9fcsqb15k5c3vhehwb4uvwq500c94ei2r8biz1c2a1g3a8eczehv607jrsr2559g3yrv8jaonn8aqkjpeqi6latz39sh8lmlmkmbqez9wdf09cgbhlfg0pe6xg80j3cclb9p4hnfvt82vix08mr5txndeibgggkzqrih25z570lgy5t5hk0ahlay3a4asjdvz5c8grbevyahkdc0u8u5yyzht5j332ko17jsyftinlyv6q94rb40wumubtx1axo8xh8bpgb8xdbn3b5ajg58h683iebkzajnes4cvul6p2xw3sstsfvaavr412i1btaid63dj17tzjdo75m2xjcqrfrblcg1bxdjy933p70kqahua1ss63j6prtmeanoaccz9ygkph30k6relqq2gvdwlv64ve07zq7czx1crkx57o3ms487bor58g2rso1r1c5g4qhlpfl7e1h82r5rvlmnuxslspo8ma9w1jffg4rjnae8r2n6rj3jrucnfle6glx6al6up4ekax13gialhm8h1ck0qj6b9flok4wg9nyx8ooz0culrkpzi22kab9053ax8mocnsu2bu23fo2wgg',
                filename: 'x8mwusd7fwoowlu3niz7wyggxmr3ml7r0glbrxfl7wkpxhklsipyhcbdiwj312pxwyrht9kpf0npvw0vozu6z28ir5bd3eolc3a2isdi43mf5m6ueaahyi15si3ut4myn2ig97t1rw4fmwukeaolmruy35ecps7eokyup1eil60g6smu9gs0sh2bjt5vihnlhge8qma2gu115e3kicuy8lfkiyssohx4jxrjvhy618nijgt4xw03yl9spb9dgql',
                url: 'qmkqwgcmhozmbvuxgupwev6su8fenoorcsn4ur2xkzq57xs2iqurowb2dh8vwspe4yscwwdzh7mrq5s1zuvcxtzwml6q23il9z9y3lgzmniy8t5pnb5do4ldm2iy5rumxpc7k38qi1j7la4cmbjjmsl9ttxgwu2g7g8i36xccvmtiw1ehf2tbmfeg4h8737khj0b0uc7eylu70bk1qzvj9bs8hekgv7ojflloij73birdx4rl1mgnd0d8vtr0h1wr2i9als6ldcjfvslt9s1xia1xy97xdhtlrj1n18p8ppemgfq05jr6n7av4xc1dahsajmffomf48zskg66das5414th1lbjxu5bifzcpcqvwychwwdfoj527z3578lc2ghmbu7qmkqtzmph3r2iy8hn3ndn9ymxgqq0gjqqtmjmku6ja81u7yopailpidxepaspnuu33d73wlhq4q2xr5m27h8dj5295932mirqmgnncwka3dqc9p4tjedybntevssinfj9jzbko8q8mree9z2ovqdp7tg4zus099orrur7guxlh9gqduzdwitiz0o05nbhhj6mhvyr3887c1amsi7k65cen4i5mzpn4ujuschy3hgz0fynei91w1hgj13h0q4djp8lbnln0333ospn20upzp61dd00v7l2fab2c5d3s6htlly10v3t5m3suanxhc1ur2ao864crybd9z21hjeagtmbrp5pagai7sk58ncbjzwii0gftm4vwb7epr2oxoo3noo316p536tceb55cvpdnhicgbnur4ui5abxaldkts4hf29ddvldvt9usb6u41owkaikr3zislkrqv2p705onuusr70vo9dyyd4saj4kaoj8d5b38hi3m3a860ywm3x5cv1gvlwrbf5sq6iy5zrzipyb9v6u4pkcg7qloo5fiit2f0ndocwace7ev3jlzch4wci66qnnl7m9fvb6sr9lb1um8rifk03mb12pi8thuxwi1zlw47ts29zzoa2qqj',
                mime: 'bithy5ed6esztoztdxti2ygq4pxjvp6op6owfssddott5f7clw3',
                extension: 'yk7flk0m3cvx0lruz3htxm0ph2nfxr8r3czx81cqv34q486j6v',
                size: 5874663078,
                width: 304056,
                height: 960051,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'geanc5r16tn7x3uq3buihbonlnn8f13uhqys50zlu149byfeqae0sgq6s03bki0gs4ow124rbs48geixbuqx7cs1975j9nv2yx4trmucovx23z03qcyvv33fus1nyd78urzuwak5a2il7480kiiqvykoyi0fe4m5es17x7mwj4xmxxbjvkr0sdzl2l35s5jrkp7c8bduawstov1vm2g7qel4ragudaadufsxs5qi6tu7ks1q9sfw8zz67k5c7bh',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentExtension is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'dqqyibwlvvf1p4mxsr63muvz12cavtvasehwevmwkrrhd18k76cuqxkmw8r32zu8b3fgg20ztid',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 400704,
                alt: 'fifukkf5usq68a67m1mph63k4ddmnabc6q4fcdv9zen98nyjisg9duy1klp3unk3heowg3j7rl9gulmsz5kpg0ghgmttkqy4sy6z57uu4zt03txbbj5prkgpnowkaoauzgz29d9jprt2zlv1740hagrn5f7edeb1neozr1pxycdgepemwrklc2du0xrsgw0gyz5bvcggmvi3g9c1jyqxp2mqm94durbmgtyq6oc6kflunvvtk3r8mztcsduaewg',
                title: '7dcdn09cv2rawa1yvtgv3ad1jaug6wuq0p1wacvv1st00hzq6r0nxnwqdz9ain6tkeyzjufhum9wkbmprkf6nqpbz17jym3jgjmr95466flxeeg8p5vd0qbuvdi13ijszd5b7y6q2pj0upw1epxgx3d6s3dylgya7anpfovfu6fuje545cg1omz4n4vqj0nnjglnpkz8pqfwgigmhc8acdbjxb57be5hfbqnjgs1p4h2cpqeg38zyc69ihjca3z',
                description: 'Odio officia qui ab sint. Tempore saepe beatae aliquid voluptas. Libero quo reprehenderit ut. Iusto laborum cupiditate suscipit qui nihil qui aut ipsa illum. Ipsum quia exercitationem debitis illo reprehenderit aperiam.',
                excerpt: 'Id aut fuga nam eum debitis ea at. Assumenda impedit sint quia autem. Sed placeat omnis. Consequatur vel nihil eum aut. Quisquam nisi fugiat magni illo optio quo accusamus consequatur.',
                name: 'xoiar2jokkqptj3kx3vqc356u7qs59dm9xxplp2i3fipfrnymbgms9mdwuvd6ztdz51azcovl23mx9q2gnhmciee2wics5i6wi58zyl3qxi3v6wmo3bnx8szoobc8ohhbff2gr66zjc6olb77p1u5dorjydu7yd9bwqmdal40ndn87vh6s8ozzc8hmvtd9pbwke9dm35qw5taf5s6b3yv1tkqou8qdhilp9spt1t4et5udct6iz50zlb36z60sq',
                pathname: '1k0dvkbekpucskqxw198tdm3ppiouo5pisj3u7nbpheh64b7ge41ujl82s84ww20xkbn67miuo6bgspgy5pzo7app4uff00t9loqaeqk34ig4e5d3mojrf271cz988lgd7xhgnuunkgb4v9okax1kqo6hgsw2rlqa3mtwxc1ngt039l9nyxpxn1oxddgswa9kuioqk6lt6dj5mapxf0yayos8ani0sax7hhu4vfd8kr1790r3sfu62nf8grvqqtsmezvmayiydtenudn9ya4vjsdnyc5cv7cqb1a6xeulrblczehu0cwz3ritbb8imzaf2e4dg3zkhfl0ghq1j07uzrskyf5bmr0ml36xz0g9abnhvpusmo0qnv47xrolwla2i2fxfl4go46vpxddobhh4cyoe37vrqmucpqftnph3uwblnub8xyiezvbjc2df32ji4ncu96f661w079wvp20mwkhk0xsuyfwicimvy6gmhbf6jbmhiv3uy4b97u7q2vh4wtwtzxx7oo9aiz8vmtc4xzo0qbez3awn0pv7sp7oe0bzl2620nvv3k99yi537lpj2e3w0seopgq73oozaoz9n41s8caku4o1tb9vatcvoqsti2wr7k7omeix7l9ce586icjxztskspn1rp9douu0awp6s5c3qwhrgkxiehjj5aj7x5omyu8ubvig7k36sjytttnm8faxcvegqdwmepayouxg91ozwg4qth7hzsltja08c0mw2bsvfrejqtvnbzdaevmrty01d7k8nqics7hfsrf9gls88kcev7w7acw38ztv5bv1zslhk5z21us43y8tiere2os91200chpkcllg0le3en3t28a4r9r2m5muyeo2j4ogzcmkjnckjmq5dk7ayjq8grs09m6fwaykv874r759k192x9ejmkrkuz0zgfx7b3twjbj7iy4ngddydwc8wyeekmusm8b72d95m6pjyv9s0tau5z91vpehurnejgvr1zcz4z828kkjms9775',
                filename: 'd5i6zgfsriangittb8n9bod9m1h0bgjur0p7koz7wvw138fchzggusan7mjtmokss80u5rkenn7ztdttgmq0qgh8xmutbdyc2tj5ymthxj0ceba4m95903sjy3ds3lwphzt6fpdu35tldc0qdplnxbakfk6tfw4m25tgatcsw8xudoai1pr742bhurg2r70t4qoyf4ftqz3zevamws0pq10lurd1ybfpl087o6x57lc3vqhbzkiqfnkyldyu46r',
                url: 'kofp7v7mhtdk1izrdljhd55qdnob9zse7w34r31zv1jnfau6aolfuy1lwbgd81iwkf4e5g0tw21j1qprmany5gqduvouuj22r627csqcouu0zru2owj0ctg3wb3fb8hmy0kq4e3s5oyrogd2uwk2b8u2x62mfutlmf31u3ew75cwx67wll6wxwigcj75xa2oe4axtxh3ephx699652hi15hi3bmwnqm5s2hrch6fhxij4hgwtg03f5xdtf50xpwayxwipyn6kv7bv9vlq2p0evqegjmmbgq0bvs6lwabdamx2l47hcgbzv84thfsovlghgnnppvr8825m2e5f8dj46s8grsif318nocp2byo44fhdqqfe3pwuio4s2s4f725fx67t7yetoyo4p6prw3si8j5qm18in8scbatzw82554e07atx5pac551l2wzujpylye56xsxdtlh1pw8pgzvdj1ql788857jzv4fxxoekvysek5alq1cdjej3dagbemnysvpob8w47cq2vtb866w7zpymab5wvj3ph2xeqvhwxa719s6vv89ib1hyaejo7l478mqg32ja87lpvdgn814a1tvc3o7ja0n74byfbwf2kxtov565apngezqem99sayrnm03yr3wps97lf99179xptpcw9ak7wv8s5i5sdm8972ovg0g5nye23t9lcxlo6844zlxdcne4myv0vbdl7ljhcyrqukmi3se6g28w4ajusmqmj822tqpf9xaie1pbc46t3poibh6k1vpagwjsgz1n5thjilqpd63lr09z1g3ixrypzcda4o4hiuj3bku4t3s8ekc2xaxzu4ualqtrpc35jrphpnu627hqckxcfzl6dzqelplqc0ruzc9u1p4d677wrsqpoz0edb6q4bmwy7ecdacf3s9w121hy1g6ap8c397rq804a5x5yoc49ad9yq5889v4pm0nt01zmg5zkwv78qdamhii2nfkp746owxhuiugnxmhwevsa4scfmaarfu',
                mime: 'gj1htqu139dnpp7ozdwgdqs8xpcf7fq9swejscoxsnk9xda3z6',
                extension: 'sv8ycx7a9m5qrs23wigpzxwpyk2nb2ylb8dzfcmw3qo006eeukm',
                size: 6438613545,
                width: 400204,
                height: 841329,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'i92qs51fjnlbncjeqrgdr06egjcumw0n902b6n4t6x5uzt04zugr70dxugdxsd3iowxff6qynqnfraswyc7b4nfejkip0588dz9ikehhol3idqhezwzv5gatzn3whh7tsuc9rxxfebzzkstosv9hmos456q8g3hq9h5r1uwkxyjkvbw4yypa6bv4azuq961nyfgm6x2fi2i0bqc2pkhcidvtiavsp7zcy74ly4vucmbrg2iw8k83zzaauyot32f',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentExtension is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'p17dlqu5ozocx9w3z4jk2qzolcmh5suyqza82j8mjgw3ho86sk3z8nu7h3tsdakwek2hkadla6x',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 240952,
                alt: '3maxymvrhsoagrya72zrn69flbtidv0txs63p3jg3rq7ea88fan3d0zrgpt5yiu81dzl3oakhglefzkaz6sih0xlykp7v059cu92tgnnq0k9ak1dmu8a5rfr9pnvdfp4owjzrsinmqk1xhbqqdmd3viyw72f8pub77g79xf6h1008hohq2dyresczidhhercgthvdkw29srui2guz47ll8r64np8ly5e12k5q6vwlr2v55k4le7023ay4g5yvln',
                title: 'kxbyytzl9hkw6gtto5fpvonjm72jgbbmecrabzeqslqt5vt2knigv0o3j4u0b2nvcgz30mm6husjf37tjqd58yhkfkf11rlmb1y6xhxno1iafpy4wtvhmumq5m089zipphoxzir592ebtufoz2ny5n5vds1yw5iuzox51eye9hk18f7pgxwmcdtgccz7i2e8blblhnd1el1878evc0byd8x4x93hgg2h63cewd0pwpet7fsnewy11g5qce6y8ji',
                description: 'Rerum corporis vero quia quas. Sed cupiditate cumque vel placeat odit dolores ipsum aperiam. In non dolorem earum tempora repudiandae. Aut dolorum dolore autem quos molestias.',
                excerpt: 'Non ex et facilis vel cupiditate labore. Qui qui excepturi sed ipsa nulla minus architecto commodi. Id beatae et nihil ut.',
                name: 'cyal0uqrpo5jea1ck3mb0zl4xdbynj57gnzuk7qfl22bnar798ntdrhahvg4l5d8mam9esz3pe3fv2qhrt3qwcu7otgs5ynebgt65cvdjxw17du7ny0vxfkd90eu2pq9ralhinaafxfyiqi74ecp2v5grl28cjkmp31bmfvqem7jooy1c4i2c942izxv4u6avpds8vh3nrpe448v0mifcgbhlmt8urj58ahdrdxckbhbuxnyka9m0lcgva2mgmx',
                pathname: 'oqpig15qoh8tnl733fbqx7mtvcw6y60tpub01d5qc4yx9911f4fy4q312jtvmmuwx5q5zvvhti8np87v35kfl87gn55yk3bkobt4aoe73uup64zocyeq7iivp1xomt75lcykh1m8o9oeygnxrwjob07lbd9nzziz08bhmkg0v6zazjym2pgf3pvqmfevun1x5mtm2i0ikmkl28rqby9taoz9arvp82hmlc9kinut1fp7e9b3hxlcrnj6pq3sepld9vs6gae6w5yrmczscmt4yrvqqw6hngbim8vhy0eegz9pvm0w0zw0d5c1qgog9in6mnolw3paj210f70ojlhdx2gzy99l1ovsyv78q3hws8y5ymu3gpjxt9mjhuub44z06yfn1h6u6z5grgktakoa14pvxw1dknonwyc5cisfyki9hjk4ydln16vcsanpipi6dyih82fvnmnmbp93iai6jyc2twrhrcvjl65ihuwdxpove3qzwepejaxyvi5dqhfyn3esy8srgmxkekrjj5b8xnt2gdw5ylemzwrnbxaab763l0mm0m2wgjdnp1mrxm250dmqng1smtbmtl940etao8vvzw8w7hj5qn3r1k5v8vrdrygbwufq4j15mppmr99xqgxasoacs7x49me94w92bus2iw582xbyjv9oz5uswv1w8sd6ckt9qcq0b2e0mc6g25wt7jf16g2nihqbfef6njtzpl416gwp46lchtogcgyjypua38lrbk20eng1t1q0kc31hb5ap1s9cscoowsujtdp5vk2zckh22wzvsyk9nrpe554zgvs229tqjgxozgo51ld7vmhe6wnmnrzusvdq2rl64vlm0iptbmkcr3p6wn0adu2fyvw4cbuxev1u6k8hwoj7y6dp6j1inn784url7qt3u6zvhvhcxe86yfrlj6f6xr52zdr3wis456y5p2jderh1rj1unp2ns8r2qw0cgen3t2k0jzz6ap9p5n28ttvhn3uldeqxckoq8mqjzev',
                filename: '35am9srrawcbykkemm0gs1p5kizqsnjc3h9ruf6zfdcprjan71agvs55fxpzl8cewg7m2a5dvinp0lw11l5ch9ensdbf97fhngi3oxcnq6i1vvsnn3f1mj53ufr9jkx6k67a8rgmxwzgv2tgs38grf8kdkchg0jppp51rd5dd8l9b8dupx1gfvcrdk4lxz5houov8elqcw6lvc9cjdh5xa2nblqnyeqgz5bw9vkqlugv6zizah2n6stqg6vxvs7',
                url: '7kqgppvquiespf05ihasf6y7qig1erm0il0t91lmiio9cf7ajg1rjxsu25f9cg7fjs3mpc32091v0r3towez59panvlg7dotu3gm2lpe83op7c26v47b5l0sjj576zl4nrsuoimc685za4oarvr42y7aavpm6wz5qoy3arna6j2skzzatmnw0crvutgz9h1pp3ln24v7zruqa9s5efe7g3fcrrjx28vhu5pzu5i9247dekl35q38a99cixiwjlg3wpr998ujiixo1l7f1tjmcwckjbb1x4mpqpp0a38l1l3kntdq8s037l7asd40b02wywu7zgri8kkah8jarbkst23o37fbltgriqzib46ujsmwmwsb4ejqlw3dfwrntl7x6wcyo6dwpgtoaq0hip01scccvgk37pvfxc6nguumtshkdohpml7kjs9r5d2p9u57bpgvo64msegihsuq6mczp8yqucctfsvz8w6tqfdqgosksu7ohdv8z00i0dgru82540qwwktxno5nc9wypnobvfnfb8ckg59ftt1e3fa106xyj1afdh1ptcimh8nt5qutl5k0fb4f55uo9lpslxanuyoh9zcz0bnz2y9xkcf720zv6v8x9lhx8tf2nigktb9z5so5rn47usbhvbopha6auwdush2c7f0phc695a5jomruv21tch9lgiqdwxi031k2wvxija7983kqvi2mpz6kljvgjkcz1dtv9w47chgf2v56va2tiq93ezutswomuja0yy2u8lbfyvx0lfa8ltx9gql4i7rws8lacokcxbg17477k9lneko5lv7o5ffzkqlfpsee0uy09ho6zw231nhbetalpsgn1jo9jowf221iqycyeqcf9bzhpjvwmb269wfn9ji3wzxgycknq8rrkozycp7x9u6kfw6kt04q1qvkiua7scgvtb1kpj4ef42a8e9wkysfuci7216lb1zgx5by2s6yfs7q8fplf0zygh6rss02k989pigr38zvcsiueilt',
                mime: 'f8w508j271xwcaqoafabmt5p5kmx6dylmfjpkcwznn53hv38jo',
                extension: '93tvzpbra0gcoee92smxd8ba06kg3dt1isc0z6rilm3v2coifp',
                size: 79184573686,
                width: 557871,
                height: 690053,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: '2k5yox1m0l6p6rh0wvaobdr4n42un93c5qpxt31r99ft8axk3q5ln5x5y1nosxv75zi6jiymi4ot7kddljgtu423bv68gvky8nggh4zcypfkmq4z85x5f13w738uwvi41r93szibghb5ptrqichuw3fhvgytr2jsjhfvg10r11fs1mo06n2mykz5w2s8hojtqhlr8i8onfuxx5y2evuhjlxckakitded77gt4vlohftb780tzfu19te7o1zh44r',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentWidth is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: '59shi86o2a17y6kewidmp5iceuqevuna0ns6x0dhr5u1ktna79krqeowcqey67yoqmjuqed6n4c',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 735060,
                alt: 'qqx4zs9v3mfjmmrknysiozon0mjabeirlwmwvk8mr5kn1oqf7ixqnr1ofcmpjmsaul7de0mb1bod83vunkx9mixd5mipqa83sg75hahj3rgoxjnuze5h442z1qsdcz5l1uyshp2iyfnaklf9gb6daocml8rkx8uqh9gjf42l3imqwjk68njgukitq3haslrhqwby23166kuhaussbb1r18dt9i2eoajzl70i9gr07815estuq8kexutu06w2avy',
                title: 'g72rpbeoc0pg96y0kd6tr4lwo8v8iscfdumbc4u059rktf1q5mikkkowom2qvcbdp1wp5p9rv86las7nqnl6k9kso2e6da46kebbdcjhyxagfdqidpk9oqhvwdnzw3lb8w75r9rf4cfe64w8uv2wz81vbpm7x2vm6jlrjdamql8a6n4xks79gw3fj983sbedqareuk767m3ylqy8nv9qw9ve7xcs3moqo76qjvfb2nzml9uo3il2mpnxmud0x89',
                description: 'Quod consequatur molestiae nisi perspiciatis dignissimos ipsum dolor. Ipsam sunt eligendi ut. Sed dolorem quia dolore deserunt ratione illo voluptatibus non. Dolor itaque cumque ratione quibusdam voluptates rerum quisquam eveniet vitae.',
                excerpt: 'Dignissimos non molestiae voluptates similique quidem et. Cum ipsum optio doloremque voluptas voluptas natus harum ut exercitationem. Voluptas rerum ducimus.',
                name: 'zlprn7ua3fe3ey0pm0mf0egtljggqy8xm0996g02xvdoufquznmi3o0v871rz0uzo8wzr4sizf6l7o2xbdtwm6m3045th16zo0gs0pdn20q2cocfkyvgh620pv5p9z4l093br0ln449zzyaqiytps4akwq2u2zvjppbixtmy6tfm1oqak5s1p7i6qpuokaavpyg3knltkzhkehtfkoeb7n33rdk41d8aqnrcpczakw4bpew96x6jv692an572a1',
                pathname: 'q5lkdvqxnmzqy3fsy4ecn8s80u58c1nbs3rnokt4uscq2of0asax12ohhe3fccbpgrrm9tlpl8q632e8dqakt4l9og13faq4vwwplx5m93gn0y4e6rsdxoruxd81rnl0wanr3h0od5qwcgue9v0dh4i9uzl4nyorhj607xietujk2xk9fyl53tbd4nmjtqp8c05sj3hlmt67sy5unoiwchlc7i8j9jnvs57asgsm4ilvfgadgkgkvxviuiipbja011hjx6a9fls37jp23o1kbuqsxgkcdk176apvo6fpzyp5pyiu1x3ixz7l5tslq9rhprba097oxu5wvts7kdqvamqn16dgzkpc7v1agu5n5cpxbmxajibzj29pdjtvrwzyoq3q6eqdcxjnl3rysi6lcoq4m2qtdgw5yq0yf23b214hcio6rjb3zp04977s1iybzdpjvsyqnkm66ezb90uh5ny2jhjqqikps4ngx84vgafhruflbqlm8c9uwmhx64e69jg8lx2ychyz3jrqqld33l98rkpbj4eprojvgplajekj5ldus0kp9hqyjd538nbwtiqwi0ckzp8hnvl1crmv36pu8boe0lu5a4tdxf65s3d2c0hiwl54lyq9uffui13ptwnlbfz2t4cqvts8is70t2fm2uyb302p7iqfdlqm8884wjrjzh5soquzlhv3f1ksumxqi0f7kqldw805a82y0kupxwmdokzxrx7vp4vx0xr9i8ad8yvqmakc64xkkmjlb3mn0iwi7tc8eaitwud6a31a9zwx5x5rnse58q7edxtxda5r575xswspzgn9uf743hz8v0lrzrbhq74j4f7rid12iohr09aib2aov7gpu4j1p6wykp0ds3f9ljo5x43w9paur8eqz1cpiwap0jo62c9l03o4tkshop3890imqduaqi1wae2t6zgb8c44yguqe4hrdpuqxcv0nm41d8bw7wbo9ngra88tf151wesdivaq9viauedre25dm17abhzw',
                filename: 'nl2quir3hsx974o30ybcrn80bial4ew926sw8l313tia5029wrzjgc0h4ine82y0dak47256nb96y4dbi7ia3lm8vwi4ue5vfjca94etofq0peo5gcomvdu0290t38hiffxnt2o1o29332gbkf9nizhtuwd1cpqlbjojny3nn1tzmp6hjx7b2jh543l3wpsf2zmvoeum3nazouof5xy6kzlo0wz9x0add0cgdx7tk8xxr03a5u7oba9nvhw6te3',
                url: '0sp6egd5yp3n0io0okf61c6dcrdb9abxca09z7ojwaviup1dyfbj79c7zl4f5m217fhhrh0xjgdsrosti14e9qtunjthrigzw08s8l7zlow9fnnugo0suko1zzi2g7jjzrz2gg6rddps9j4i11db59t3vfgus3dnvc2q4nxlbdx7ozj0izu2widyxdz81pfp9yh9fznnke4sujh3w2m6swdkcvt5gc3gii9glf84bf9eb0mpq8itddvtskg3eta6pkgsv3ah29s9z7of6dsnns5amnh5da18mfr3vjoeqer501xqcsijjk23v56jfwgfizvzduhxevxiq6ne15gbj6z20j4d3meqlmrddots7rszus9xj2bzijiiyg7wbdsmy6cmylfpef9dneqjemjotbr3ta7pdwl3lh8xy030booc1d19gcvad7dpomhk0aw1tluy3ai3sjb28ebxbmgem13ggqs29a34z0wjnadf9qnch2c882sd1hplkk4ofas1s7szz2if0l2qakhzfil1gzo8wmugc5le6h2mw97159vzawew33n97sr4zlsw894mdvmbvasu0y9ys6uprhb636zg4m3k4y5szm8myqpdg951peqx42kf3tk2g422ddb90gqfk1vnkgw7qoxb15yk1dxr87jjakx8s29mkqrvi4uqv1sfoeri5jc2x42fq01246qrtiowtbakbfgbzp2w449eejcmrg32jwr054yhgi697wrpfq5cxfz8gafh2ou2wml0lc1qjp83jtj55go7ahman321xblphmn17x7yajjt08c357ekekikpr9balh5ld2hqq2z9wvj8g1emg91moe17qss44gy0myxhzcdyx562w7b6n0sq2au7fio74v043gxiojokw37mvppwk7usb91t7663i0vzikvh4c2x69qkc9ny7aqey1lykk9il9ugkewbz7dp5v4gxyd7vdjv44yko6f4xq9j3pwptgq4oejsk5ak7si6rdg8cgvxf31',
                mime: 'e28ycq8bz69o4p0gbr3yqu9cuf9v8zvrap77r6nk0mgiyqmyxd',
                extension: 'ddwxasqknavuj0nw14psy1f5tmrqmp2uyozrqxkdt0zses8shj',
                size: 3707840600,
                width: 9937353,
                height: 983220,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'q54luzu15s4duewcc0jvpztemjlpvj9i0mi5h8fn5b7l9898yes2uhayhjeufstjpy5413nz1jnwoxw9o80sc3t1we2tn3g9joroquaqjgalu9x4c7ijh4s5c1dqt7lcboljpt21yfofx5hnrrl5nhbx8tvah62843yqz2qretbjnw1ftoabipsu3hjledro1hy2cr367squjtanhccr03fjmewdkr7puyav7k0tkz1bn44ya5o1pnher0chq94',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentWidth is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentHeight is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: '2mctg450fnmrv0t8l52ubjaezpohwbm87gof2uy6s88aczdmapxdtmubcc7pdglneodx6krwbh1',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 175686,
                alt: 'qkz9veyhx41h2d09mj0mnic7mh5p5x5307kzijaw1lpa1v8chz56e7ydh6ndtdfx6qpd7eptoqukwjc4pno88fi83sw0j1wi19pancqr80e8mi1qynk4fcicddgrgloe7ningl01tkixnazcq4ww3ask0duaj2urbnujovhhw7mi6zlzuwr4ygz8029vugdadw7o20h1nmi4jqdo4iaalghds8m4mwn6bcawxqk0y0rtc662kh0ivmey6ta4g5v',
                title: 'qso1njtp9ors69u6yba0gylybqtacgklc7bv44m1iwmcpyykn71rqxyswj6f8j6s96deqswicdh5ybnbu097uo8iuczkcpbcg2otnr1psgl32193q4m2gxj1wbg07weqmyierqjuvr7kovmoh6h5xt2am27jjziv8j2ek9hb8ihlo5t52urx3udfhj43r23vbhquf7yq4oee9tzrb5zdx1la0qtjmkdetensa0aaide8f80nurwwlf29bryipca',
                description: 'Consequatur et aspernatur ea. Ut tempora id quidem sed quia aut culpa. Odio cupiditate ipsam rem nobis maiores ea. Fugit qui maiores necessitatibus tempore distinctio autem molestias. Hic dicta voluptatibus blanditiis consequatur veniam fugiat sint. Possimus voluptatem perferendis omnis et nihil doloribus.',
                excerpt: 'Aperiam sunt possimus et ab libero iusto nesciunt voluptas. Illum reprehenderit omnis tenetur nulla. Eaque animi minima ab.',
                name: '7oa2d5v9owoi9pqwv1gogt54zlpqb2k1xlhhpdep2npqh79euz060zt85hwuel1aru49gqd7qzvm2k5xgql4crk4om7vd1xr7c1jovk3zvws8lrl0dc6640tnhle727b2jvb0d7y25npbz77o5f5pb0tpmoxrnpywrb9k2finbrfhvuzy7n9yvd7w0247wxhjo9uo5onhdujl4ymbojbfcr9cfxgcx4pljec7c7di734btvdx3x4c6gk12vwile',
                pathname: 'a3n9nq56w570aaf2gdd5q3xf4515sljc9tdvryf2bfbbl4xlxs5j973yh0ae56rmhvir7fc5d3mssy5fzj9frdjs57udftexp322zazub5ey8c4sb075qr1g0w673v5wrp0qymfycjktf81sxkpz8xf1glulubk3ym31rskcwdo7qglv9qcbyfckzyvyb496ho2cnqvtkf842epciofvpwe62nhnpuqwa9ptevpv5lp4ajnuunwphfd588l4utmtyh7a50893zg7gezy1ii0v79pmesch2dug51dundumcvsrtdq3rmui4foyy03ril8vqx2nrwiu3gxf3rg5334x4o6kyvar8me2yasm9dz85w79hk26mp5pj0qgby40pacm4px5cpyl54p49yxdwckkbn5o267d0fw0y5adzqd78ym3hv64duc2zt4hmi0qtvnjir1a05qyfd2jxjpu8vo259hqkujrkvj6c2nmqa4lsny5kiopk82im75nphkm6iu74b8a8i7l5jrhp9lefnk10s2gty82iql2y8p7fa700tq5j8waodgmrfx1ygxctq6rsp7pi5dx6zkmaazsebubzxzok37wi49k8ynbrdk6mtbp21actl36visuzj5z9mhlbhyhxr0tll921lfdhgdl9n2vokmiisfgz40zo0d3hu6h4gq1z08bfus0crkxh3bej99sylx6azr7v1xt7umgq9tq4gmr6839rdol79ti27g3t4ea4ipw332schifza8x3qitzb1j9tvsiw0atcpqf5rbedj7ton2c200thzltizt2gz1ram53cx0bmd28fbksv1llh6ytjz2wkezwzes91x7s4gceuaduzn1jrlf4mjbue9y3lyzn1xeomadcjd4kj13a9elnd7docy72m9ja1ohkb774ldcwvqw7pibtzlldq57ydx2a1bl6nqttpz775tabbfi4q97tayg9u581oy91nwogwi12y3r35xqpg7zt772n1rml3y7d3d8k6c',
                filename: '463xje0bwf4k5e1cb6kyk5ybddr5rbjnz1s6jlfo95jz9vb3lnp6i0xqwjw1kq92gc8pd2r59nk5xg3ormqagxsujv9fiox3lk8jlrocx9u7rxypd97rtqxknltrmvhsttt69t315itfh69dgoexu2osbwcfum4t3q7zmdrgznkr7pwzlapbuwr3j1wug1c0q37fk2d3h5qs1mcvseg09tiulg37nzbthtjj0jakirmiiz8gw0buq7re8c7h7u2',
                url: 'l9qoenfizo77u2hzflkw2154582f3svmkxmqzy0rh5lqh5kcmxzurwzaigykobdx0x9oq096mcuiq3scds6gdrblx2magwgzuif0x57bwa4mpq8wanlgcmrz99f2ei7b60n0sdbqzh8xz8gyulklfaxp8mv9ikvd83u6exqsr1xisv52q3qhe45vup5g5bfff6an2wghdvdu8pn73rq82znpbzrayt3v6ckv54q979sint4ivbhzkm31xihfgrosrcenvv7rib2u9cqgvnw0430elsenkbgkdj3axzuox7kvy4qauq9pfog2975khs6c9qbopr4ovy9hhx6g0j892pyemwdd9je5d5t8wbka48qiyhs3qzmen4wx53ljmlxb9kl4c4wykq5lsolrfxocku8gmtwzk8qgtmxn01pmrn1mogf9ms9n8j4y7qdjlqjm1umhg09dudgzv21iye6va7x3uo2ihajr31zoulndzfd3owxvob9y8l5fk1l1vganjjokcglh3dyhbzlm9b8hz5ksdxmyyjt1k4tily6u1bxfwdlbsluonuced74tv6lpyd9v7ybdh60jet9699ehfep9o20z5obwxloz02wk8ht5qyiny63reqsh3xevqv6jqdpbhygkg1eu6vpha241v7o2ni7egqtkm4v6i2kpt1b6dx0ao1qrvww5ycceqhcnin8esfmpq98xmdp5wbty47lhrvrvgpc4egcbnayosauti5gkvvvy71jwwr2sf0by1zv4xqut4c090e28tpnnlqyg0laq8y1ghhvceqhhujaeiaxsrdhpm6lsdz4w4gahkc7v680k9uq7indxkuvvwbwlxlq4evnz632bmp1povhqnidshk3pdlei9xeaq2byl65wqbfnoguofd4nod5kbdf33hpzu8jy1fpuckl29qk6hj9ejfn2p4mgjil3lvi1jjdzvzbo4he8l6oophkwtmgl28vdp50b3ktrb57b3omevn6zbhd9sw26ysaae2n9',
                mime: 'qt1a47n2fcpnsmnh79smkyody9v4cz379ap68mewqhc4vzl2w9',
                extension: '48165zjwavv9ix33cjpjz40ui447rqyvb4fapujpxh90s686di',
                size: 9032748267,
                width: 539293,
                height: 6203675,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'vfw7abkhxqld7gz50f6e4scutl036z809xo49j26k9g9mdta1zncd4f903ssjzta0wy9zbmnvdmfzqkx67h4zwo47dqbklp4xd7ppr3egkwvs6xgegfyzhj4cvgfs67a1jqbd0a3i9b3yxrlh5lkc8fmdvopzp8x4tgaq3jrfmo2gdkh7f2ul402h8uab4dmshui3qdn1vhmws2zosgnypv1vfa9hsuobsh466ikgls346lidq6ds87fgjhq8lu',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentHeight is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryFilename is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'basasdrzvuxjv1bbneaxgo7kf1em2tyhrsfje2pk76szrtsllau2cpakr2yw1oredlxyjv7frx1',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 958219,
                alt: 'h3r61o7z1645v228ai4exx00xh7y4j0671n09sdfyxa7ziunxb22d3d3eielxwiqzqanbmea5a0gtnv0e8fhl7bbzwpakhswxzd2cry8lgwlq67zqn4dce298j7m2odpdb7x629xa0cuqj1ks007yj7upt8ufnhpdlyi60vtieprjii53quug5mgc30dnnqepkkjvdzcx6c3llm5o9chlmg3v2la44eg5kjgzazu3l6j5mwuqeyoctifdqpyu3p',
                title: 'skfoi03zt2oovheu1bc8afmo6ffi2ioan9wxt86h80l2ait1pkfwhib894ho5japcfejybfrgjfh9udc0f7xw6qhy4wt4bria4flm28s97kxr0q2on6s4kknmq96fye6yxf59ei1oe77r2tg1362ld4gi1kjmi1fuvc9owou9elevicy4qj1b2d43p2cm2kf85fun47v3zwtkacfh4kyp3wsm62qm6zsi5sm2kndkv15j7ptc41l571unb9roof',
                description: 'Qui qui consequatur id est. Voluptatem ab ut alias. Ut ducimus recusandae molestiae. Rerum fugit tenetur. Illum sit sunt vero rerum.',
                excerpt: 'Omnis voluptatem ut cum atque consectetur. Odio cumque omnis. Neque modi magnam molestiae vel sint dicta iusto totam.',
                name: 'b55ofp1if6j9mc3epss32xwfxhhuotanpluyfgz6325vueadkm1aqxjmn84y4r6ryiz5ra4n7y4a0klqfwh52vskkgh8r0xhx4vc0zvw6ri0iv6c01mzc3teo528oo6kdzoxt8zorswltkx4s7e0i4dbqfka5nwoirem8asii0as4k4guwdlw1ra4gikvl1f3avooetn3kf0v0dxumiczztqhi5dy2ian4mh4lwt2lojs3kyp2tipkmpml4wsgv',
                pathname: '0a5ro393434nwnh941eycxj8jkapnzyczd4tt22fmoq7eynz34l1wh4qagow4b09pq8im2mer7aecrjx9lcps6j2yfc4gheehbj2htsd3iz1ev6w2szeai6d49y0umrq8qnie2lcfd4eheb8vgfwlzghsyt9cbv49smv5hnmsx4v9wmsm5tmr5kvag6huz0ftl27d2z5ca2g1ygxkkw455o5dd07rte6nepkb9x44dgsekt279hmvu7x6mplufc9q5isu85qzxh2tb83mx5tqsp9r4cderjz5nwk1y7lkmay72vblfs9hbaamp1y5hbv7zt3z4720wc3qnn0x8nt7xm3wamt65bq27c1duk2uam3rguzqky1h2qit4o3nr74iazmyawlyv5j1udlbswacmax0r2x42nightnrofed32699tim39shelu3bjotjsqw58af114dmw32wkbjl1x3111uoht2yl9m9b0ek33bwqpn219p6bvr41mvm272hforzc1nh49hlnl9qp22rb9sh7zen08amd2wqaj9iu4n6jmggrfftmno2vrg8b6uogayr3jvhzp8a9piscklcqtggzzcnkxeplhsvti8wmx6mwitud11rfnnprpasectpr196h7hg0gf3o2soi24wsumylv0gki4i5l09arua7nst8ego9b47q4zonjofsdd2b5bhwojfqbtttpapybl518u9eh9bx8ezs066ye339a67dsst5ccc4phf651rtqee1tassvn1s6v1jd1ztzxrob0nqc2l6opfzn8ldf298vpk3vqk1ry520t6hhmvyxuvki8lu0tdvivs0bzjc4vcoq8npabyu0yus5vvd2opom1tajiym6pkt9oxfntmm4ed4ikxmsiiyd9fpelyoqqmmj6rqgswh8g583b3vkgjbsnbw7b8xyd57d2z7ruks9um7svru5eywf0pnc8lpysppg5bofu8ccplnudtoroshpao85gn5th7det4n8bdsacxk0',
                filename: '4s4zn6i1bkskauy0kxcq76rdt73xxvoongb3qa45431zmmnlibv0b7umqttod5jlnj8mkjlzle95lamj73pbf384p0yvkt6d715qnhy5i9gi2od9p11y6in3h5wlef1n1x03xtdzjkvqs3tv594r61pb93brs8088q47rebplsyjoo58oenqghrufjrvisrphczh17znu4v4quq1g4bmkdcq67xbuk18c0x76wzaq7ghs4s98mghnf25a1h06d0',
                url: 'q1hwe5mfsr6646dgurzs3f6grhapidluij30nq88f2qzynrel5u2insja31g54f512z82zjljo51ipzbmp850xu184ppmtlo0lrjv75r0abpgx1r1i3j7q2j1dnyajqn087heolmw4b4gt27tcvfyxb25si1btweh1wm2tb891jam3sd3vnxbm8d1z2q8p0beax7c70rdgkos4docwyiw6lrhsnam6stqzydr7l8jv65ylg6od7wsfj0dvd957vv9dp2d9kvu3zkhychkfaxg3gcsx3ud9kg1bqzrfvrfn2bgvvtnrhdpuoxwrbg9wmvnuuu3s6y3tsiymliyzwol2sgrq9pjyft8hcw2anxp9jkylzmeilwq7kkxuw0uhi9zblt2j5nwo57nspbh9772w7d3lp2cuiqgnpp8qme5jw7xeagkin4fkz5wn39kjkja6rxohvtu9ngnrrko6kqhi57bahiueydssxgb14ue9fgnryfcigjkgwwv4iwrnwsjj8y0r1s92e59wmyx4uj263akfrnb1p48vp79da6f0iaeggqkvlrjhosnuhouis39h6vbeh0vyt678xtbaq13vmtczain5sq9aja7mum2g808wqbqrj9kamp9plbtsbxytgg72clg57ce3hq9vu39cuc4b6591bvwkqf4vfl33cuyx1lrmdr8cue411879hr6b90hkglw99efp6u9lpsajupwz7n3zzu8dqoiiazni6i98en2r1vgzwiibpsctdghgjna4u9ifl31m78pxhdtr1waavu9nhzfxvf1h6jkpsezsayikgymptw79ly99k5zeykyyxu55fti9m14i7jmcarroorxhrezn8viqxtz2myti1iaj9vcwqx7aku3k1xliv90rjq5feu5dfbzl29n1yvo9vto6ztriboqgnjb1xtlt1febh1vzs2wxsxbnd62b98bcbbhu2u7vz9ad7q126hx8v14xpwqnnzd6oaxil9f49n64ikbnmn8fq11mal',
                mime: 'xem5lpm80wcuvauluuqvryp0xxxwjibzfa2wo0o93v31hw20wd',
                extension: 'ng7e7a7mw8m0mj0qkqfphyjrneopntou61n4wn63a66i1o0yol',
                size: 5489637150,
                width: 835244,
                height: 519376,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: '1u5dm8mjov4ymzfgph6gqj7cso33nbniauu018m1sb4x1vruwfanx7w5v2mr9x7pprn92f1uccizmvzzsc8iv375sqjrtsk319yva34a8gikcz207gj2i9c33slw3zrejjb2a0m7vpqtu16idhk647zzlopx3kndiulsi3hrxoy80yx3so07dseuybgcf794fu4avrxxohds57h0tnw8b77i1vumas4k7iwjnafnp7owtbibv2sjfq9uf0ibxwh6',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename is too large, has a maximum length of 255');
            });
    });
    

    

    

    
    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'wep4q2bzpv7iy5wmozg3opmo4im2lnet95k2k0f1222dzdjvtttjnxklfr04uql515i9sums0ga',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 500462,
                alt: '4wlpac3p5o1gn50g908jwj7cmfzcwhreyrwotn12fvxzaperfxmen33gx0epb59gfkgfj4ia5n2vo6km8cgs3c7c8x7x0sved2qou74thnnd2flejr6vcqs1md9a4ddjtlytodp091499b06258ra6l7qncxmfd1w2hy9tagm4jws090galhc01i37d03y7clvokepudro9rjowedrxfpwccfhbxw6ji0in1ybmit4griumlbk6wxmeckcv27xu',
                title: 'sm35eall3l9mbe1qh31rn631evh0j847p0ze8cu0eicem21krnbsc6x5rrlznnejekz9ttaj1iybw4x9nx2y4ptlv5t3657jvg59liyg5ibhpds9uxjxv5yv1pt8eg92zibbvurhp7rojcyctk76nj3h6ggd2qodkt3m0i8rw2569c6dogp53xqcx2gteeablyjvanbnuxmyaonn4ba3tbwoowed9cuo7p6he5yzvyzwry9o3cei5tghfb5vy9k',
                description: 'Corrupti dicta quia vel aliquid minus facere. Voluptatibus at eos voluptas est itaque ea esse. A praesentium accusantium culpa aliquid natus omnis fugit aut. Cupiditate porro in perferendis eveniet quasi. Culpa nesciunt enim modi dignissimos voluptatem maxime voluptatem.',
                excerpt: 'Voluptatum vero et. Sapiente vel molestias totam occaecati. Distinctio iste provident qui.',
                name: 'sby1lk85vf5a2x8mua6k9eohyolxf9fvk0x9b2etymtf223q28r7oixv15e1unhsd0om2oggkfkoy2lrymw3ka9t28ci02r00uvg863ux7nnfpphpxeu2ulmy4cee2jl2izvaq8iudnhjdmrgwwsyp2kittq4wn6m019bfyy96kyona1crx7mvdz66joukp9q7vlu9ymw4wofb5brlm1ze6duhm40dto0x5c1eg9fmogof2anmyy4945d1czrbn',
                pathname: 's407u1dbuga8gym1wzoanbx1s4bwpiwk9tvahcv4cb0e0pll2xmkwl0w293z21fx3lxpiqarea8fh1mwqt83chnm9pcvpbtdotw4icuav0wfk7edzl83n1sxdmkgd9f257ihi0dg1mhc8kgz2p94j3z79fndj08la2f3mtchlodspopnrvr0izdsz9825iqtayw4e5gq4i0kp6z68h7mgmhippsu8eubaswiuang06fs1eb9oz7o2hl29o3gzxkfw5dyss9435hx6uulpjj76s9l92h3h4p9rt2t189glfniut6hqjn7katlbrr69yilfmmlxen8enwbtetqhg38zjwe9gx9za6del2tap8n8vaq5559vq3qq7rllrh7pf07cvx3jjkkbz2frsokyv7pbgy50j3c389yg67camtzt7686p0dtv5tcauar3iwac1hu61m5il0ofvlo5qi40r8nn7xxd928060134wd2gvor9mw5n59moqbem8zg8plihgthkfdsyabgiljhuqbfqe6sga2rik6zderp0j27ekrm2hxmmpq04e9agt58276gpp59vg9i0s46nxqkjn7i12a5nxmxnctxbqn0bzr5jrre5op6jsxu8xusgugkf88xaufaothma1d0iia6zrj0a9x5yogjq36s86hsjqetpa18gaocrkig49jxocrl4cqk5y2im6pbf15q7fyx91qzpobui1x0iafz3xehv4vqcojsg7ndzg24grq5gzqx5k9erjhbikqnnrymeh49w4gvzthfdxdepu1bggvhbl4amhint2e82ofm60zzkfntqx9t8838ka9bibhfj405cuw5sbkml0ex9pphw1b4jzt6jf3dsmnk0o5tmon0hlnq2cf5008yph4toqi9zyer58z9n9zs6ixx1mw4jr09z6raju6nko5io3w9hwxx6twlsvgcfog8r6yzuc1ccr9eacnlpm1g6bcy3ofewt5wozt14lif9126mbdw0exw0kfax9we04',
                filename: 'y9sa2a62ypfw6yri4b3o4th3ynx7ucfe8hqq4oshu1t84yswf776db0ycjudtwv2fvvcks3hsiczo9wy8uurmyrsbwl126kbeulqhl85s895e39q10yjfdgwnggboco2hj482iq5xv9syyz1vedy3a6hqxko6ysepcnnrqctc64aibrm367tk9drdd291njkuc1387d0it315v7bceruxfotbxs1rofj74n1acbenrv990g6zq451mq7s1f4plr',
                url: 'g3c03g2cz2wv5fbqm0dex77j2mssivpcv9xbhvnrz8pizymn0z52tj34aqn2es995pgf6hbskqzfglb8rsekt3c904k2i0pbr11th9ycvbvp2mda9nu9xhpt2hiwmdhixow9jlulc7gc5cs6e6ilvxmaazdjxh5o9dc32757ly9ufj3yfuds3ngavnusdhkqi3wrp64puhw662k3p1uhbny6l7esglumbds7txs7t0l19pj94xvwuw20tua0qwtk8b55il1l9sbhvnjrax7lmmkg1g7uqdolo63hhdxahq6mw244qpva9oz39tr7u07kg4xmazyt2pdbquwy4k73nuu0fcch2oi1boqjsc34fzuxoyrafy5f9q0qo3qw8xbf0hzazi5vkizwg7y1subvnqfvuu9cu32syyntdma3m37830a3q7lkdp91kehkz9i6tkpbqkd5soo142sf927cov8zlm5kxgsjepmv7uuj9dajv0aunf40ut7wp2udlqe35vp0ocpgqdqgx0ldnq9xt8tot9cpg79at1x9qiaw9xjgawa70egxr47uh5tyu1a86x96o5ckezwcbq4kntv6mrqvoxcd5htq1ndsbldv7x5bhsf9svperu0rxrqewqarardyx1q4r6b9nnytye8ogbfp8bur1s3m4q50ocg4vcj0un79ixqw2rcl5hwtfljalcib83iw9irseyb62xx4rudyxn50x468f3wux91jhrnn0zsbj1yj2h8sdwwgyaplho0esbxulfad4f4y2krjqnkot6lfh4dpo98cw3ip5v1ofn0l1mx84k0xsxhujyxwlthkt6nw4lmpazdf3p9coxylwelm9lxwmp6kkbn3k1wagdc836xdnxcos0k4r5xiu0tkuf1ld1pov0svs4fo4hq8v71xfrjfkewxeqpfah5t5wzogwxy7uzab33fnbau5vzj517t149pwrzj6exagpkzt79pa4ddufifuzuoxg5bwxz1p11g2fpmimdb7j9y',
                mime: 'p3pardyfbh7xx3dg3w3z38j8v5rq0gyrbyu992krcptbyjefpy',
                extension: 'e1j9w93zjpsujxupi7rfr6dk22muvqeu9makqr7iy95noem0jd',
                size: -9,
                width: 787748,
                height: 155428,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'eetcmf1fpq6gluhb7fmceyaheh76rn7i500ivdjo55wxpllkv2d37zmrpili4odgcguhz5jo4jnkabpabyx1v9ls5by1jqwr4a7b8egshfot9mu2a31so43l7wm9r7b7qcazd166yhiwr5inwwixcmx63kf2y8bfcz2ru5eol9n8kzoo170wz5jdx64b0q94njddvqv5aknn5rpau1n9x6zfycgmc14lhtn89chqhp1sz2h61n3uoczc76eggwo',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentSize must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    

    

    test(`/REST:POST admin/attachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: 'u9t2oldkns5yplr9f7euqbln0mz45qit42ne36s4x55moas8xywhjaa6j5fgyfgp7gqk0xp538c',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 711911,
                alt: '0dppsd91m1841cfotnnx7hay3l5xqxruw9mfuh21x8qiyezgl1dv0psljm7xg6j9q481vxe1d2q0ub74ptmi7484of3is6li2gy28jy5omc0p6bw1k4epr69bt1vo3xx5ig0eyhl4skpvkiuwdwio62l430nddcnx1fd1wmj3kx1a04j4cdr7cp24embmibwjir3wywk5astewzqdjp241zpsxvpzh8m2i2pj800law7ka9rmbos2n9ee7r0l1z',
                title: '4yr0puek2yk0128342mjxbftwztv08p7xdyhs8xa4w2v4zjquxusdy55rsxbic736c1zn4ew98q6u7by030qu9na4o8yrszpkur6g2txwlnxas9d6voamzu8md43ajs8t9qhynuckeerj0m4zjeiy6wp3sv4wyv6ag4rpbibu2cmplphe71rt37yy0vqnuq04j6kninccv5t5lbezrpfq4jbwfvaje1ntun3qlsqhee2igya7783gis2dwkyjiq',
                description: 'Itaque corporis ipsum tempora quasi possimus ipsa aliquam vel. Harum error ut saepe. Reiciendis soluta quia consequuntur eum ut quia nemo. Molestiae alias est nobis dolor ea et itaque.',
                excerpt: 'Sint praesentium molestiae expedita unde dicta autem quisquam. Est inventore nihil cum qui. Odit saepe repudiandae fugiat dolor. Dignissimos temporibus magni cupiditate amet voluptatem sapiente. Rerum molestias hic.',
                name: 'gl5d65ozfjkhrgsucckozk1wlh6i8z1dks95oszaffhefh712uzcaxs8yl2nwhxn2y8r8csi2oiz6v16i1601erlxbiwdpdulim8ze105fycn1pgnzyy0mn3z08inoxfxz1o9mxhl6olhnq5ttxh2ujpsl139w6r998hpzwuh2a3r8yy39vvvc930bmukckmgbvpf98p46ycp3novo70xfdg5ocoy23z5z6f9788whpgh9uw9psh3xaea7hjl72',
                pathname: 'yey1g3s74pnhh9fyo1n0s7uxyaqtyso8p42paxuee3mlt3u1a9lvub531envylw1ab4i473ni8xhumz3g2qxayq7duysh7274znxb8jd1jhy9xxsttj4us37oms2laqf74vqx3zeq1erawv3kw72bsid4yk4ooq8klwuj171bqn6vppv2x7lqg7irng8v1omqxr7cb0lyibwefjwzm8pj79w8po7fru3okunr8qwqn75u7n9akpaar6efk9kl4h2x870bohzlaugn4clx0jgg2ydvt8h90bsjihi9i5dlehnp7wnowjamlv7txw3qispksup54rj09zp46wybqoh7ls1pnmtetdi24791c780sqbsskicl6f1dpd8lro9zjfba9tfgw1og04chb53yidmg7xnbyu5dy4mygut8kael6xecvhvwesab7e7c68ay3h8sje7eoklf7o1i6yr21pmwuqj524ooiqoz7zlr1j1vbkj6zne9yhtwthk1tkuc7rmqm3dfuf2vbhvx0riee2s3zpkphkgfq9c5p0afe6r3tqejs4bde3au56hz94a9x8e7yypjcjdkt0o3eddo93jfz9gnn0yp1snffbqhuqeim636rqe2zv0g0pflrtjxl65i44yl57aubknlp5ixe4hfcpi6puffw6frdq6okz745t5why641oavuz8mqzmeyp9j1udglt9sbgspsvg6dvqiet6mnp70nkf5n9yrhe6nr16uqsexxb786nvmn4rqao0ekw1ydj6tsfiu40ue412kdjls8ugb76nfpeqgf0nro5jkfedrx809r89j67dox0o079q18ah8wzlcykenbup2ff4eyc72uabe7gtf6gb3d2yp5k2y7jb3dapuzpu0aogme3twrj38r1naeuj1cvmq59sme2uuhbcjhz6p3ye8s5sk0yc05wqmk9itm76lnxycqat2pgpaabr5o5fnwda250xgszxj17t7po4you4zsm76kyldwyktgnz2icm8uq',
                filename: 'o2qrsbqy2j4f1qvid7mf9gtbxkny8ksnfelb0w2liu4n7ltg58mfex4oaa70d53ie07hjcypzcdhbe1bia6puez3as9780x2co45qwv9mpwihk6s19veuvpbfwauwy1b1a1mpu5wufgu07scm6s3j4b77rqunxlwhqtk4lc3jvhl6encjgrwkz6haz645i65c3twkuwnq1l0yz9qsouabm9p598mhqi7hcpqxewfhwzey42v8gl4ap7ykfs16rx',
                url: '9pmrziog0trevcw0ri3oienlqxhd81ifmh9pl5gwvrmx5u7e6k1nvu0tz6ofnvct0t8z9070wp267n1xm3khjrtwbkcjbb6f3mn0c75qrfqp609w9j23xlhr45iu8kqe3eomfucluivm8m9g3u6a0k7riyndtxhj4dshayf4uodgycaibjt8ngdfx6scjfikk91xvpg8rb1rgp67bk4bx4cvaqzbcvoqdmcilvpp7ior69t75rnnvlva6int03ao76kjlylkcfepb4om0eghks5f4o5n0hvqlryeawghj61lhnm89844sbpxole2w2fta44xeh0e0p97ex6wpnbfotqivv04aqux0oj4qdwlvbs1gj9v9kylqggi98nrr4g7c9vw3l5oc0ldjoj1ndkl42ee1y4mk0msdaitpv8jkzprdcfni7i1fmcshjl32xsbxxciqpdw38lnhjvbwhf4dtb8w2ow7tmr9tnz81yvy8kgtsndps0hr64o6ec9an65mapnl1c9978guw8s53yhcmo2wt3fgfe6ahi2jirt8fa9xye8g7qvofo6mqfcfn296xcgkujk7if37bz77it6mqhg0gxdfbh34s1cl0r6tw2k0hqild5db643hua3e5r8z31ghrxf1b9kxci470dhvsao6a6w86cgn3rr0zv8lsl5gm39age726zhkl0xtnrw11izggq4tln9gm1f4g960j2bn18i6qe0qa3rqlis3oy8ck1p6xmezo8bg5b9m4gm5z16wdnyb8u2b4zaxmt8mgohlhspoyf2kiqdfmark9u14olfbsqarbux4d0dmak059mwmu7rqngl67me1bnw3fdnxerj6mwllx1vgfyxl6ocyo5z2ye9fwefpq6qpne6nfromzx97jvic0daplottnigcrrbq7rdksuzr9psfievbux1bq59rufalcml6c4nfg3dzqbf2ppzqtkgh5lxrozotuhnz5u83ty531063ny5djx1ln6hpmcvzdb0ew4u',
                mime: '20gavw3gpquyombz7cfv58tbpqyas9z2zw5terxwdqgvf23odp',
                extension: 's8cxo869haw19w4vxsnn0yb59p6arfzcdus69mhlo53w1wjipp',
                size: 6500526448,
                width: 150591,
                height: 448380,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'pz24v39fp0e2hv6xfag0lypx0phuilg9wbd488i55y5wjpalxmlnt6t18wsq6tl1cykibabbj8z8pwpvk2dewbbhdwsopkia54kf25w30jar3fa2f2l8xtjgnclm3yhqvu8w1uf689un4g06vmccc5qkx8eml8vxliu2u0tb0y66xj4ykpzu30d6xtj06y6xpfmw5cxi10e84me3twxaaskbr5k8r953kez363dbp6y1prj9dz3k7dxtqv1j0jv',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachments/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachments/paginate')
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

    test(`/REST:GET admin/attachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'eac6a980-9481-49fa-ac33-53a537e3be5f'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'a7828584-aeab-4542-ad90-1d35e663be89'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a7828584-aeab-4542-ad90-1d35e663be89'));
    });

    test(`/REST:GET admin/attachment/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/3c883815-57b5-4e84-bf0d-3145aec3657f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/a7828584-aeab-4542-ad90-1d35e663be89')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a7828584-aeab-4542-ad90-1d35e663be89'));
    });

    test(`/REST:GET admin/attachments`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachments')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fa569a4a-17e9-4415-af25-3e80d24cdad5',
                commonId: '5475ad61-fe20-410a-b245-f1e690c42637',
                langId: '1c7382f0-0117-4f18-a8c4-6212814e7c9b',
                attachableModel: 'vsp7ntlj1ymomv2mlzf00qmlrn0j1intmxe0dd728autn0zxp1xmq8gptynxzjuoq65gnpaxyzu',
                attachableId: '90f76488-64d6-44da-8775-c01916206fbc',
                familyId: '127cefc2-f84e-447f-a8c4-2719ea231896',
                sort: 843851,
                alt: 'ilij0o33byresqlifscs6q3ry5bkgywk8gew4cuykol4y8k9bbtboqui62t9o4iwan9eyupwzc0mkszithk1f0ifb0wsowyij1oweh03k5q90e5oe5egg20fem5q70c2vfb4o7nko5upz77n2fryaalnpdluq9fszjvbpc3ocygxg4gkqwp1453wujzjc22v6hkbtdlmelkdxf1xa9z96f1enal4ni6i42r8p3aluar33tez6m8ajx6z34uf3gm',
                title: 'bbalwg9qg623e3wbc4j5q9kbf0y0vt6eist5if7b42hfzthgivdsrg2hhicz2ho5ukffl4eh1fjy5vle9euhnl4e0zv851a9nadqchyfdcegp1pyl1klig7ezjyn1ampfwtotbe4fsys4cc6xnheydb3vp6s21oreyl9t7r3uxe262eou5iplu44vom27vn7umgndd1xjzkgzyd3oldorl2k5fh5cbm53scajedd549sy0q9o50tkulrjsbgv8t',
                description: 'Iure ex autem placeat iste sed eligendi qui. Soluta dolorem aut accusamus natus at. Qui delectus placeat dolore consequuntur aspernatur consectetur maxime praesentium consequuntur. Distinctio est ipsum quae.',
                excerpt: 'Nihil eos ipsam voluptate eius soluta voluptatem. Rerum aliquid consequatur eum magni perspiciatis aut nobis voluptatibus accusamus. Magni aut ad eos sapiente dolorem mollitia quia consequuntur. Nemo et reprehenderit quis quo veritatis et necessitatibus.',
                name: 't8kk7l570b1n011j83g3f3wxys3mguytdetrajtga7u1jvnafzialbd3pyvxflgl0x9zqn9m28cj1yol0v36edqq5q0ozmxts8ly4fe1n52xs5yfwyn08crdjm28kyolwep5c5tcn6nl3jus26kughva3gn637ti9rgq6ro2bem4bi3o1ehe6lmfmf0si9o9i29y76bfzghw5mopeeif2vnpmi18ybvm9mv4y2ftrjk3llg7fdp8v67hry2uob7',
                pathname: 'dhupeu9fr27tr50egjqwxjirf5edy2vhhx2llgk30go5l6ch71mgeca95hq8ii3oixgofk1sq1u8iej2zuigm0t08amobu0we0o5pndaupisuzp9wpim3htjm6ir8g8bmcksaigy6a32n0sz6arpmvuwmizqstiqwyke2uiqhletnga87qc9pec9m6sl6xfeesdlgrzg4hexw1iq2bm6cqimjare574m9jryb3q8p8tsuctsbgecugxzxfsbdhxq0t2yd832xyyb60jcecghhothvo8zftojx4nuryukvsjp1npxzoutm9svxel6h8ezh8ibiaz19ddh8r0zetfn5q9v3zukkf5q75qne59huuhedd1ev8ow4v5p4qpoca5w6lap3ajvyd65jjnr4fhvya5mnti9v3lvd0vmcaafw9p5jqx6irwzzykt21lov6fg76ljtvfawpehmgwdopurianlpouqi38tr12qoizz6qd1w2dt01r4x9pmpalxosoe59xsg8cbp8no6ax1xvtd3mwiy0rbw2fea0d9sk4hy8jce2cz2azizx6fcfsv4ephyxa910rj2zn1tle0wex8owni1k2eqo2afbpgli2kr131qxvhr39z653cm0po2d7bd783ssjjsfgo87bvht2x4wvm34t9hjpgklboawknu22kcgkir5ug33qvtky1tm2zlc1zzu33ric4i5zxc644yi4lg99voz2sazz1t10bzzc7nzca61fvuwo66di5phsnjwkr2c7ejuxxnw1dcydgalbtyi3mfv0ilxwjjn45z62w2j0i1xpc1nckh0sm399e901wol7nhk1pvte7dyz0m7ik7ltqjomrvm35zeodkuo7wfgnegcj6wzprbkcu9obk89zyqhxpelo5qi96vnpywyk2ihae9lx5lv2pr0l1c8u73qxy8k2z7kdmwugfeb9ydsk6gj1t47nc0ibj1eg8gl8c6bvjlg7c716s6awsujmdlbr480rjrjtqd0po43j',
                filename: 'mh548t40968j0yillg1tbdnx5a3zp6esnetx9q3y8ybnerzkdkicx8os9madmvtrp6t8kecz3a1i25kcdprhj2pcj6amxuxauq57o9yc7ru2tps48jaojx73dtct63lsnrquas8uuk9aroq74xx6gtbuboouazuesi2ms5cm3z6j8m84bi65ffpr95ie313ysu1n80r9w0amnx17p8knzu3q4mhvhapoxnphvodgoymzpgkepv4gmrxzi8dr58n',
                url: 'smy95dcmed2rxnpduk79dbvgz5messh1civwvxgnconkqj40j9dp1yn8vdhvvqfuo26ab4ko9kzpr0zvr7foas6zhho6dktci51s77u549twkj7t5dred4d2zvd835iak4zg786rx47gohimjld5ylsenzus2o12gqf5fcp3crb8gx5q2j2z73fveu9mq4w1s6c4r257cjy74pq3dtgqc72ttog2wp7uglk1fwrnbw4d4mjh0jjgbtg1vdhztpsvx99fguzcl3og9y2he8wgtnya073pn9jq3ofxbpvg4uihcmpg05w3zs3jh13txv34yjewxqzsghjfk3wv10m9i6d55jey0je3lg7qmd8y9r7yknngqe0qva4cbvf22f0rthppdykiufgp8r57un2cv708og1dncqlrdsqrodujtksg74k33qjru33rr8qybv20gr3ogcydseujfglu3kdvwefg02huubh4c3ohwllt5kctd1x4mruzz3t8f0xh3zs3vlbj07fjq8x52s1eomc24gysqb7r0a34dznwekwggogm95uweejs7n21r11oypkr02vpasp3jfauai6kzl2tef8m1wkj7qq168twz0si9fl6uqi8awwuacm4mj4jcdzeqfte6x3abysuglbspkia9uibfzfy4x4fp94gvnf196z80oxfgerkyjivoe1cbi5nhe4z17u0dezexss3ix3sgkdzajgd6wp4td2sz200thn17kshixg1idq6z4ntkuinp26yftk69jnkkbyj2purdpduxe1j16c8mynml7oh0b7bk62yafdaud2b3bvwd1s4c94qbuixiekwbfc5hiooa155iwzm663muu0rr702fzrd2pu8y4tv427cesdrfl2tcfdt3aiwo5alclfka8wrnkvmqiamnz13c212tfvqcrzqzw7bfr4j9fyrsikxmc9uwbyhvtgwa8dffvy7lkf70kfzb1hzjv9oaomfttfgx49bqiq62atemli8od4k8ny',
                mime: 'uysqnq35652glohp2vvrr8pgvuyewretl0gn7yueayz8vnwgep',
                extension: 'wxrt5n5dy5zo60fjnj50yxthf3iceu0gycdvs0v44s7w2crrgk',
                size: 8616850693,
                width: 965877,
                height: 507167,
                libraryId: '4ea2fe1c-3e0c-46d9-9706-dad14bb6bf6d',
                libraryFilename: 'vzgjeqjpykrvt7jskng23m81n2ncqgikn3bb3abhz2jhkkm3e9xfbmdqu0viduthnd74bq3a7n4esamai564vs98ae211npj48olpmmcqu8r2j6o08lrvnm8tg95xrtnewr4moo89o3i6ovthei8g6rq0bgu5omlen3s1aop3fhanlf412mc4ep20dpg7bryzre683v1tnpilit1a49ods9gp9wu2x71x5k5vtuk13t02ip5jb9tir4muvyw2na',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                attachableModel: '60vrnmb6oyw5x7djaewzkvbs5t8w3c5xri6m0ifcva8aplsdkmgzb3xw07p0lc3o15kkmwsce69',
                attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                sort: 523235,
                alt: '5rf75xu9ihv0btj3bad7aiz9ijir766w8gjflhxsxajclr0ma57ud0h88gt3pak7suy4fssuwc9ggf6inb5o9svkv9cly7wj69uw54wsg23ri6hu9em65zu014gpkhxiwhzpu9xg5swd22optuc7kqmtcjdt3y2w5cfbjun5e430iyynaxzvr1jra9z1xue2zv9i4yecwkjkuahg0ovz47fk5u0w9kg65ycalhtgrws7t0atfhcfxhy7uekk68t',
                title: 'jnpgfljtw147enyyqrpq77w7qgtb51ukmryed1gso4aze1z22009xjk4eqb8uvxi75o056tbwbihoadmffq8jook2fhrbxq60d3qewsbvvqg8uges3xqkudnfmz7b4x5lb68s7cmr8jhm173h2setj6l0440aaxlc41vwc7xmz00b9lxgx21z4lqtbxl0l0ad4o3ti191gazj2u2vxyuaankkjg9azy6vv6wopml6k0yvn7gv62p28vq0fizdcg',
                description: 'Nostrum tempore doloribus sed atque dolor aut qui. Dicta vitae voluptas autem. Illo eius aut.',
                excerpt: 'Sint necessitatibus suscipit. Velit veniam repellendus aut nulla culpa enim dolor non. Quis placeat id nisi voluptatem. Debitis et labore consequatur qui sed dicta ipsum nam.',
                name: '78fe81q8qf0yncxu9yprmxmjrqv0cbm8az38xc39s3ifm01oc5w3if5ubck3gy867hl0n8poojbxkcvmny58d7b1o539gmk2jkkhvrgvivmeg60ry9m15ufj8j60nubyobfesmainuayf8vkv6bjc4jkb4m72qnqam9al1mrn6dzt37rbsui86dw5zqaxhbt0nebk7wd2b6p18dvyyt1qy1455gls5ktzxdivco0t3ru5n1i0yk84s4p326gjkf',
                pathname: 'ty4qnfbhc91x9fnmt618hm731k16bgr85kdevhyfzaznn7ewxbp8ztwjm0z41ef250yawbeyjckkiqlfq3ct1f9g6rjq1d974a3bzpgmfc4gjk54efwqgy76bsbvdspn32g7mi5741lf05bd46wbudx6xzsd408m16jo53ki54mz2w6zi7o92dylj8h31k5dkt3zxpnkgcg4kxktwtpwgypw7b6d3oqz8aymfesnz27bqa1d9mjuqvmdpmy95uvujpyriqixq7ut85ys25l3jcyxu3kmis5ist74xt6r4d35wdn0bnfx456ea4rva4ibp5gm4bklx3egoj658ghwp1aas02g3e1d1jbyx3i8huma2bqo0z46l69ebw9hfsnzc46uwxpm7tcfen9dhskpk71hxidhsssup22a2hlxi7m8y0xz8vdfwfz1kvhx5lpxlzbxx2r7ncch9et5szw31uh32kmdco9nxh2wp7acq9q5b0tu9acw8we0ny1ruanhlxcjidyapv59mo6hpcyrd3jsr1mcm8boxe5bs27da8t636wqtli5xkpufcuta1sf9xek198h89o4jyz1j9cvy5t7362rr11gpjim1oqd78fcnbkzqu9o1h03wt503h2soyquj69lm4ld1j2zsy9py89wssaa4hixk6xdtdtt8wvvvhjbehf7t9dlyxwhtxoai2wzufogy2mpdbcw5l2z5jsik0f49mwejkhzw7mm7k8hipfb1vi548jfhtxb7wmgrurzo2shzzbk75x79uj5auqcd14lk95obqorpebh51en7yml4s874vsqmiqpuwj5swqud1tz9gjdmf89s5gzho9yuo2xkqpnfqyfjjgkecyxb5nazh2gmgxztx3c9gwsy7yqyq8aps4mpsznej1s9s9090yuh9htqpxrexijvtmn233rxone7ue4seg86rwkbmyocynpl6qy6g3ctqnp108t8nckzd3m0ejbrdxcvyjzo2ptlky7pot90pt18trf',
                filename: '39zpzxnau4e427c1s0nqta399zilv8mgkckc20u7ows8m8khpxtlezkqvbl0dk85zgxu6kzwwtij8bkm8fyqvu2webj56rmmg8r0zfgmlwmsx73hv23pdn4n38n126t4ukjlznvetr03hhkn493q26jt4e0n7ryq9ixqcdmohrlofys6uow2ctpwnoa6vssd3pr7qsdfrc9aqa6fxfn3wa8wueqc5pqlfo2ww8fe71r3jtw7zdmht7tut5f97eu',
                url: '3gfmlg7njr3086bfbnyy3zujf2ufci1jy7tlk4hax21rnpf623yys8u9ltmqcmscam0tabxjl62rz4fmk0i0mtw28k73z4mxop34vadwd0yz6uykjp0fz3rn73c0logz8qj2xj1zb8zzhpxgop2rex5aembho8t75xp86kba1bo6mpujmfqii6pp25r3k5xnek9m5kvrhemmk9zjje2nhelbuengqefjxj2pa10pmkk3h2m4xxpa8r3iww8ov8so3a40bbf06scw46csjvqiwkk1qzcczwjceb2mmcq2s9qelhama3az1wxn1qo00vg2gzvn6nyefw8ftwiokwherbmkvzyl1nqvicz6ql88pb3mefux2uqdjr4dky3zzzars21o8t2vzns0hr0zbd52m2aac5nr5hoyp2entswt5c7wbqg8vzkay46038pceh2s3a5401aqqy8cr5x8amxevr0m81dwkui79s6h384yizbswj7g0ystyhik397ui72ls7ri0mwxlo909rk0612f4ius6n2z2i9rmk5pogwi0mhxf46ap9vmofpony0bfw2rl2lnmm0pq8sa1t0qzocnvqccadw5sijozwv4m2vujnytj4e09kg2k5650n73irs1ly47if5o1332brnhclr5smgvscfb9u5hx2dwc3w1c1s6t1d1avh24vltsx2vcgq81jb2jfd2au95ofvq9ye5old1pu7vtwieitsuzfdkpooqw8ea5rle9n1ok8iot4jlv5rgp3m0u7h59ryeyxav5pj5ynmd5o941jm3poub0giwsmly9051l6dk8qfnm4pdpz7ojlhx085f3xx8hgh94odag2e0g2n5psyzsef319j24qvhslba6m8uh8osugw810r4vd4iz8ggqfwnpfujxcwx9zr5yf3484218awwln1k7ssne8c7w8fpr3g1b9k2db4gm2vd50fkdgy36u4bkyrqh7v3lruq338fjayg1qfcdwa7l01s1mw6rzo5lcto',
                mime: 'nwokzhpa5os9jbtvvlrph4ecfhn2tp7oro9q5r34smlmpfk4oa',
                extension: 'bvwb57mypfhifuzkerz8vr4snk6swrdx7twu6iq7r02qqbn8ta',
                size: 3164949524,
                width: 275391,
                height: 749791,
                libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                libraryFilename: 'z0otpc1lhyffsl3uba6rufz6uz6m5oy1nl1z1oqk2zk3d8dr8yurcx6zeg69dl7hn0eiffr3f9q6plxjxnf74i98uopxpiser1pjwza5c7lurc53f3gewlbhseadb8iv33svl18vcvgh1e3k95mpqu1l5w1vkuz9ddwltkoxbdh3oc7who3f199hml7gct04cv5a8y3vcjcrgm8jy6m9pt70qzoxkzuvvv6g86p2r5g66jw4tagiwqylf55wfn9',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a7828584-aeab-4542-ad90-1d35e663be89'));
    });

    test(`/REST:DELETE admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/343d8505-0fc3-4d1f-b70b-162b7d849219')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/a7828584-aeab-4542-ad90-1d35e663be89')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachment - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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

    test(`/GraphQL adminCreateAttachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'd500067e-4369-4782-b59b-c9b584392e0f',
                        commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                        langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                        attachableModel: 'usleenakm3ugko6ll1xfzhubeihcby686jykt34hhbkab3qvxvwpr41hflla42e4b1m97ifvty6',
                        attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                        familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                        sort: 430386,
                        alt: 'cttlfbdcmi9abm7wjap19j6bbn1j50pg80yt8u573mb4vzzftc1f52874zjwwvyfqxbhzt7ujy91umrv652xbt1b0ps2zxk6ufh24k0pkmeoogi6td4co7hhd51mgkx739zh4u5g41fs3u95frlwevopa4ez9hkeah18uly0rhn51aiwsupotjc0x0jmy0p59l1ws5hke5sapy4zerw1y1ynkptfeq087450ad0atlukd0ieahyjlf7xbhag1hq',
                        title: 'zouywstfajaygwgaoavedul4w1theet57an2u2jysi0t4kjmuuc8sfd6fiozoejnhrypvk02hwtne7mico09b45dibj452m1vvorcebyd7akt7qrxmii7xyirnjrtya3d0bs5o2xyqdrhei4zkxz0wzv2bvomk1brpk8zen5t4mieetgr0uemoqzfzrh3ebu1xgektqrtk0xxmhv4uepl2p3pdh9je9eqmyifglb5a6euqv8yl5ccg45jlctp9x',
                        description: 'Nesciunt assumenda saepe facilis. Eum est ut. Qui natus ut voluptatum quo sed. Officia eum iure corporis quod dolorem asperiores incidunt. Eos voluptatem ea harum. Est doloribus voluptatem modi.',
                        excerpt: 'Iusto perferendis deserunt repellendus totam porro totam distinctio aliquid corporis. Perspiciatis laudantium consequatur perspiciatis omnis omnis. Dolor qui assumenda ipsum consequatur minima. Omnis dolor error aut voluptatibus ipsa nulla commodi similique.',
                        name: 'w25xsqxu9qffsgm0tiugejepa48yncjl6d96wvebdtia65opwftk8s97yi2rukocu6gstr3fpbppq7gmw7d7gqyzy59rr12isvj5vw26bmknfu29v237fxinbnf57k3mf0by1paelnwqycnqebakutd3vd3ouk8915mrgdcqp1v6geymmdknc9feym27jg5zl1qj5l8iy2wrc5ir0xduwckynrnirvhfw57gdz4vqgjdyzczuxza2kb9bet4pry',
                        pathname: 'iacj4jnvbi5b2fnqrzh0p0eyk2arval01qsbt3is756dxf4ao25vzypfvcw4ytoaxw9ks7ysz30euezl9oyqej33311nkg71qv3fnvpj05e42muzy0sz3yd329f7r4xfgeqjjz5blg47l7uqwgah34qvj99scmqq8a34cnvujesj3d5sr2dmr08eyarq5zf15e1x9mmx8z5qb98av8q9s5nggwqsr510ckn309cjz22iia6ew0i4fzj4vbdpfls0pnde9pa3kkj0wfyrmsvfnyb2ehgdg9yto8dv9h9miqr0maqoucdrvpvfhxx3xgosaesu7x6psjsiogz22momeh8ou9l2kxudvu84m4usn2v5zi7483rsxutogp5508gs3ez0n1cggpzfa1xfzqe3ntl0rn951mmx97mo535ewfohwr2jyucpo7xcm0i7fkmntcjpfq4nnrmmhvf3pduq5yg4mso6vs8v1alqxiln4vu0mey5n0qrca0ne93d3jkssa3o88rqit0ofhhjycvx82jz6j75ntwhdakyow8frwwlfhji071t862paj4ehjn58zljy9uk3wy7ovlgvfhz0xogkefgjowp69wzg6hivfbfkph3iotj30iwadkegwxer79aabrt7e0ulhwr9mwevoxunqef3h92nt0ehl4i1135ycpssai3edjevjnbrqmcknazasgodbnng4m1anj7ee7bgc7o26iixmgnqmsti4366uijktcl6epuq7s1xjgpigcyb3g8zvt68v7rayzefsog6qn0a86ngf77xrj7lfx8qeflgn4b9cylvn12mxyg2qjq3sh3qxf1b4mx4u7r5qlsmzww31dybpsxwmvz7uu56ddkfz0q2d3ek26mw3gk6v4wvcjlswtm9ta7t6vcce2j9zlh4joix6klf2qc5vt20cg1yl8olipmyer6yrfg26dkjoib5sog8a66ugzgzbqou4zlmjfqh2rw4sskfkt2143nvxw9o9n7270hv4ll',
                        filename: 'l2yz558z5aig74im2kleo6dtdwu78xr6h6su3lxqpc4q7md1cwvbb2vs5bezusgenpr4nr2qgz6wz1yem6l39u8ug2r468g0rx23b78rv4oop3obswyhl4s7ktd4k49ith5eouc9em0cdvwh8afcio7w0ev6jn26szymvmxyvl2zexdygdhslnh0fije67uys1j3spejheld4nm4frw4plx4rtge45r44qrmi1eq72vqsy99hx0d6m35kxvwztz',
                        url: 'axczwxj2kixj5y26chugf6mizaup356f8ijokzwc3ytgp5jjvo1zhck3x3s6tfoj0ppsbll9olxenj60uv2dzu4qgirvj5clh2todjslhq8udd0lf34rbvu6hvvfxtpiv50uoz6jfrsfq27ydtkmcxh4smtdihvleoe8rmpssjzt2nu7zsyrluil3f7kt3xlzexito5exexzpg7p0ek0djnub5v81arorow0190tavmiq5x4b2fkzhh8vzh9axeuwb0exnbovnr9rn1kfq3xbthqog78pjfcf0cbk4gzflg1p6vv3y349qib1yt6mc3qoz03r01addp9l8bokpaevxotty7ogbhvca4tca9r5kqdvvbrkujzumn92iz8pfpciy5d6ajnm65fvq64w61xw0q9inpc5hw9lw6p3ylbeveddwlsnoh3pi7zy362vm8d89pawftwd3p82ql02443ewrnc7f5chajtaqoguglgo7vx8jbi99zxgzeyaujys3yeeaa6ersjg6b6o8x3p3dqiwes33m57almc607k50flcc7i8w75qv8zut653oyeevot46jfui5x7c9fu2su1bvrt8qc91y25140hq5jxeodieq3pkss3o58i30wzji8gryslqaao8d2q2vs93pa5axagkorl1ic80bs3d5cx38z5frhk4q9atltvfrszbnfutne9u8i9og4t1qnav8ery8l19w6jq93q68qoao6zyai8po5liqa00bwifdmu37ll3igmo44gn8an8spqfnwssy5kfikvpgi5awc3fouxhr90ttnnhek1ktu86b5ytr9512gw93c22a3f2o0d5b4c8wxwlku491hzra1rz27tvy8j3aslxvsm1xwzivxzp7hw5axsxo43sn2t3e3m8bks8ia8sh3pta5kpyhd7fkcz90ol6pqugqgywgmp0g8gnymhehdg6ojt2d56wsb5bjyyezcxpzg1ef9v3mqshf3c9067auymrp5zozfrumzljqxn',
                        mime: 'eeams8tex0e1fkti443i4hhcy0zhajqufsnjw965d3trsiavsr',
                        extension: 'dmgzldth6poiavnfmbltnmwssj10ciuzw8f93ih1hgs0kdjxz0',
                        size: 8101983268,
                        width: 951347,
                        height: 161981,
                        libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                        libraryFilename: 'su1oif8b6747rqemcc4jwyil4iwlmfvipnyt9iac7r0y66zhe4ihu27f0ky0q18m10zh598hbhj1h6uojaad8ro0lrtm0w4futzcnk9jjm2bvr72u01im3bx45i5fazzs5lj476883oyqzmupa3fyehkhl0aa0ogq5rco8smxr7y2nj5zz4nn3qng46w2ww18bg9fld3ghndx83sfs0we4w4ibglr5dzffd6rl24gl558tzpkcw9j1yfbgi12fd',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachment).toHaveProperty('id', 'd500067e-4369-4782-b59b-c9b584392e0f');
            });
    });

    test(`/GraphQL adminPaginateAttachments`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachments (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachments.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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
                            id: '53a51c0d-9d7e-4057-b040-97b2f2a4b428'
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

    test(`/GraphQL adminFindAttachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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
                            id: 'a7828584-aeab-4542-ad90-1d35e663be89'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachment.id).toStrictEqual('a7828584-aeab-4542-ad90-1d35e663be89');
            });
    });

    test(`/GraphQL adminFindAttachmentById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '103d971e-b0ac-4427-ae0d-ad1d26727b45'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a7828584-aeab-4542-ad90-1d35e663be89'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentById.id).toStrictEqual('a7828584-aeab-4542-ad90-1d35e663be89');
            });
    });

    test(`/GraphQL adminGetAttachments`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachments (query:$query)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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
                for (const [index, value] of res.body.data.adminGetAttachments.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachment - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'faa7a3a2-3fc4-4b45-80c6-856441fb87f1',
                        commonId: '9c19ee79-c687-4b36-bb6a-a19eac351129',
                        langId: 'f226d282-433e-43cb-850b-89f329db2147',
                        attachableModel: '3l1wzlxh5x4tk4eydtfc1xhv15t2n5z39ea0rafh41lo1wef26b7ukh6juicboj39j8cpz5dji1',
                        attachableId: '5517d990-940e-48d9-ac0f-b661e987b251',
                        familyId: '8b8447d2-f5ca-43f5-8593-5edfe26ebea2',
                        sort: 540210,
                        alt: 'dh61s8yaxp71unjelhsaq0e3rt71pvzj1dkx9a5v2o3g5u0ewlr7b3tkl3p7yojf5skj3ixiy1ml2b68wm64onbo8h30txab042n7czo1ia1lobnu10umu643hdfrs8ekaf626picr7wiuwt32x0j055awaweshazwpbsya4zw9lb74ka1d49vipmapjy4yz14lmzvu665vsgfbw2aq7932k65lvzjndwy78avhgx7v0r7oahi37q3qo5r7p5w4',
                        title: 'm9j9d2s6rptgdof0brshf108m8pq2z383c4cyqvb5447lczlnqg091fl6ilyewb6vg4v67gfa80e8umq170n090p0vyxruzh0as5gc2k0qzb00fkqbtz2e0y5xpmgakkv4t0ts1j5jqsjhxao06v5vc4n9c75jsspt98szm8zkwm0gcfgx9kpmiin1w5qic1nlvo40ak2p1cxonlxi4lcdv78exhrxlmrga0g6mxig8mphzk9ibqvafbsdancwc',
                        description: 'Reiciendis doloribus voluptatem at facilis quis dignissimos nemo. Sed non perferendis neque. Et modi quia officia. Qui natus quis fugiat sequi perspiciatis ipsum. Qui voluptas reiciendis nobis incidunt deserunt odit nobis explicabo accusantium. Odit tempora sed.',
                        excerpt: 'Possimus aut quam rerum veniam ea aut. Officia odit nihil quis est soluta natus. Dolor exercitationem eos.',
                        name: 'q5pdd7r6wghwsn18tr41fjbnx43hx9t80r8pbwomys6dy8wqzbixq73bbzd2hr1f30zfbdgykjwszb3biu6b69m14gd3tsq6h8dthkbatm4p3v5k0jdboknllcq5mlctdrdzlwum7wlqcu65clg0r5rkplwu6i10z3t4mll1inf8wsqkaiac6jpizythu4myag774w0fwcx27jq92uvyiwaslphiqciv8kbxt6ws82xgf1wqon1klsthdwvyf82',
                        pathname: 'wl7n59678aq1yi0tuwj6rv4lf90aitfggf1jdrvjab83jiuobfj2gvaksm4o4py55e0m90b4ywkglailpsfboztuyrhu1o17603xt2cui1rwp5px8kfcl5htd5p2kldbkfg9xt2tj13fa4y1nkiozhrmkwqzh2d5n8nb1rzix013fsgtvoz8alv1ocq2wx1acp18uf4074nyymfssek2dfmenwwwxyteihr1pxpz0gtp3ufpuzznvqm9ibl3o7du713m5nu1mr2g86vivsvqi74i8uqxowidcju45ymylap3hxz6u0yzd8o2kbsyd0bsa7b6951co824s77z0ysjao2we482oqk511jde4bqkvu451gwaabp2mo32fl5bs0ea45sqgrwrkc37wn123zstr3w52xy5s21nkuaqr806uvb95v314cu625idpm61gsyuaq3yezhty42ynnltwiztlicn77u63cws0m9bbgr9uzmki3da8w54iaplw38c19i2hd54p88m9hxcxb6zwz5ae25uapj1ewp94kvkod0kvbxfgkomiuuh49s7st3c45htoqwqxrepouj167zotmnhg8jl0oihrran06xrabc2wrqntd8o65jkp75sjexoq2v91966lp8g48ui9ddnp81dlxsbenefgbrz9h7c8e8949bxb8a4rb3ny7g86wgvgey96kartfwn99f3srg3bho6tkzmwms9u7lnr6jf5qhmvtd0nx0b5e4rspj7vlcyy5othismvkdta7wff924docxliksory6uk6vwc1ephifhn0b22aaydmtf1vayjvue0e3royiruj1csg1g7afaog1orr5gr2xdqg3qk2y00f1tc8bnw3x9lh2sqrqxnz9imfb43zt4xnionc2fw78hu4in6pr1gi7jix7vl4zidoxek80k9zvhbbq5q9ppw9wwschn2eddo53fahym3r3893q39her915r8i8x52tvs3nkup7vs4upxlc9ea0nhary7d',
                        filename: 'os7n0llwy0ib0znmc6dujdfxsoc343fqiey6y9zr9t3n0nunij6un3cx6emyjwer349ecnrh7qe3l2zs5faqkyqfnkwlrp51gw0epr9p7owaint03snjsz9bj94y33djmigtddj3kikqtvk4umqtugqe7p0rbbb322cfzhzbltse5119mdem1iy0dkdbb3w5fej0iz72lf7b2mul7h9tv9mczeji2fpgwd102us12y1iwe4uz7j49lxmb9oc8uy',
                        url: '15gukw77z3ku35l99z6gu9ek9amujni0kq4nhvunhxz8sb3iccy06rhck0u883g18obuc80nbydzx0vfwwxaiz1yk1op9r8nonxjz9wpn8l5yxp34t63dxb93awlig1o0vc948aip8eg04wc9xqm1hxqixquvh8c9vl1qx63rxuppucngnrkmwdxkwzhhpxjc3hc612x7hr19d76wjbeppm5fkxc36jfeet406atw69w8q1le1bgzawmz143mm6nc34xb2m1n1998wvu11ttvbi1fmapu1cpki3qzrk8496cg535ekm7i1d6z41nhgqaj7vz26vajad4cav46z2qgt5x11k6lo9xhykgbtyfac4rr7qyxtjhky1ogtcqx0iw5evaqm24rcvw3wrcwrspys8yayaeovrjf7k4e8bpz5s7y1hipa0bht3jxsy5fvucpua822cfmbm1kdich0p566bgu5j2io0hxpv0zck9hvvrvrkhabka30knyw25ipi3y5xm4mcxmze4ozn4qx3eo2elbe4116lo4hq6a8ys84309k5p7eps6uyk2z6b6n04j6a8mpf755cc0alo1zgyfk7fs3xg4rqjmdm1eftvhdugvt49gr9dssgcvpa0mqsmmf3npdvxjs29ke9nvp1asm7mun8greo6738m6cgvo7npasz52plqvkhuer09abltqcz10fn75qyo0i83fa2b2va9g7vl2xg1c7b0nr33bpp4kq6926umkfp0ovlgpgsvnwlk2gniclmlccb6mw7zqjx3i4a8daz74ighnq3wjp7vvnp495q18yvqul3glodr9s8usxwd9ogpp5ma692ggtg639pn1oa1tpd9kmh1ato38qp5m31ze4r68zldrjtcl15ubr8w0wtdog7871w7v2sw6tqkr4nw0x8jtkdiy4vaydjc1v56dznze9eozg9w331f5ul1ywaty73igeerpvrsl2oy9e35frt0p8ypulyjcohjngagvy0ixeppzxzk',
                        mime: '70v6igruemj9km5tw006ay5x9ktif47p41afnu94ej0gv29ezd',
                        extension: 'h7yk0j6qsv1mgx7kabo69pfz8fneajbx90oewcz3ibmcqqs2a3',
                        size: 1148213944,
                        width: 573907,
                        height: 691945,
                        libraryId: '982fb2b7-6871-464a-8aa5-4194cda41746',
                        libraryFilename: 'bv0fexhk5u7j8aojgevkwnwme6khzq06j4zl4r1mnvzyb4b2ypt5ayxrssqfrrjewcif0rkia8nedxxpjh2d0m3kyo7pgj5zqlr2ocbuarw5uad13q7c0pf05ltjd8796qh0nyd2ahvros5lr1d295yhdeo50v6wswlocgu1t8i049fgtto7ihdid2y18f9yl4ttrdkl4xoewor2stjhmjm7dybe8i0eo2es5xm1qr2wk32wsd1y1gacotm6krw',
                        data: { "foo" : "bar" },
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

    test(`/GraphQL adminUpdateAttachment`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a7828584-aeab-4542-ad90-1d35e663be89',
                        commonId: '2143a44f-0bc4-4ba8-b02b-574faf4020bd',
                        langId: '2192510a-0e4a-43b4-ac80-f67f48f48bef',
                        attachableModel: '5y724l7cbul2mo7g3mokwc7fegwopbqxi5ptrocntt74a99gkk3ys4fjfdo8g2w2270uf399n7s',
                        attachableId: '8a0944be-9618-4fa6-a580-d23dba07af1a',
                        familyId: 'ad45a7c7-88c4-45cd-9ae0-4861ab695b88',
                        sort: 109100,
                        alt: 'mvwi1robu4jdkpyw9gs68vtpzoiitzfwx2ie30eidsxeg2l9kmzpibsfrq7nyrqicpwviu3mbhu55tndqct68p8hx6w18sm551igj40ptt29xw09jakyfo372wa649j4d95l5f7udnwchvhn7893apa65efwd9d0o9hggshgn1djpcsv1z2s1fduuigy2hxj4ujk9ur9oden401kqcsegw6btnnejovzbnftbb5jur5wre4ylvakl620ivj83ti',
                        title: 'sbrlhle47ald9wxww6dt0fwg8vlcry8i4so6nzd8w9kaedftdnr6vsw41z7khi2in3v33f08vvupmb9gm95k8no9xyfomvykvj5oo1z8kk3lt6ni2kyaidliy5zm9t6s2smbh4jvlgze1qgs3u4v7u6d60pch4k0f98t2iiv1o2ylz8zskfnntfw7kfhhujsmc4akntxg7bmyfy03sbo997pubhfjztdbamv9d0e3cxo0w9564wklp1i0eublt0',
                        description: 'Qui rerum aspernatur natus quasi. Porro sit consequatur voluptatem vel. Est perferendis sint sint et. Quia cumque eius repellendus animi et consequatur.',
                        excerpt: 'Debitis eveniet aut. Sint ipsam et aut et rem. Ut ut mollitia enim voluptatem non voluptatem fuga sit.',
                        name: 'a46q5o5wnu6dsytjudgmxjwmcas3vcgguzsa8a8exc884k6vx9sazme09aus14ti7bgvuco55l7b5wts0tg04l3kuoa1oo3oz3xzsk3u2r02wvocj3gc0vbi9kjx3jcrizz4e7j2ex5z2i1r7hwjafitwnsurnz42v9ysbabtbfghfgr0di0pyyn86uy7jgs851j30k361aglhvjq3azbdp3unbuq501vi60bwrc8hpjcohx6l6lmbosfewczyt',
                        pathname: '87epdc5n7o65mtozs3ebmjk2u7ofxvt3xcgwaut319b9hajh1ljxdya0tr6ihwhe4f6boyapbpscygjm8z9p0q9bg4ll7y13cbhp4oi25bk53t4qubbjwryy7akumfoptrop0luthke0wnfqnlmdz2x9q8but8iw4k8oi8sirutsi9f86uilyydcx9xjine7j5mvfqe05ks73z9m4s76s964eaqhn3e9c7i7709qsecwmhhis3ahp0mvfi3j40np05qwht3lzjaqqmnz57sea8gc919udonn04dlu6ke356lajsp0erqekh5c9igu2htsezpbycobho0sa7dx1dj2py1357zx7bb0stsn15ie7ab70c0doqp133bro6w7msx42qvtv59uhz96lyd17t7von3yd3jfamfwp0id12n756jwcn8hs28qkn1dni5rklcnsk8qmpxthxpe0140sybi7lagm0sky5mhjxrspunyz3ztu7995mbzyi4cryfvf8dynmr83kt7omvfphnzbs4e8j0ljc40zh4d57dlrky1re257lig5xqxn5ui50p4qngwodry6gqngfi3b61h10pdidipojgzb04pe5e5lzjyev135hc637yiwwx6q1i4ijgja5z1anwa773w55ehos1v6cpft5fp3l9aej27w9x43d7d8ae61i564r22deitb6xl46rkfiverymlusr1ad1iw4cxueocp7b1hos8p6oe9h6j0bjsxr0p2r5sirag55x07dhtratprj5pvqegko6zdjda99tw5rr4nifqs89fyeyshuf14egbmfrqtdswwd7brr9iw9pz13hijy7wr9wn5sblcvhbqddpsdqzuaihdhyjb9zd1nb2khggfxlxe8m1b62qkp4uvxv9nk1h6gmiracheuiet4in1wb3vm83hv2aa1ow4p8buqvr8d8r4fqu9356oheqwgcwvuc88p922din6unclts1wf3sgharw442se7e80fbit1k12pqbmv',
                        filename: '66ve0lwdjjn1flck32cg7qsekic8a1buiguowq6mb6ub4zyfxnr8nubum7ka9tbwr1lqlq5qfjs8zka8rbl4gjmal9j89bmgoiwjdzvhn9ndv7z3tud24wm24hq407titblygpbtvz8amr60ek1ffuq666q8en9c9b4okve9akdzgr8pa485x98f9o15fo58005rfh22f74xjt2nx87k79o5cy088x9h1w1byw9g75sodyxv6arnba0n5hvfzem',
                        url: '4enufk93bwsz2ly8cji2lgl584ry7gtow4bpbl7wc7vkx690ou3ip9pew8vjnpm08brlk6uijg3bv8t23to1aztidw34ghxfjko3c6qlqe87qd4rksh104yblu5hmjq1ttfjoo4vo59qxnavxufu0wm8ilxaeehyigs1knuj6c89zpry0z2cjh8rwh4k1qga05lzoyc5gsn4nz08e9g9mp1yevcsvuczqk6snsmzq014sodglj3hthhtlnwdh0oo8rjhffiu4typ73owtmoolrsa5kj2ngdhck3tonjqx2whafbcc96km0604f0zn6vqgsmdydhjc9s2gn363uaq9ze2x4v41f44n5yph74iu5znyc0nmsmfuz09ve0mpf3vw74jrma5wh224meqz9i17g99jbhbbgtf1b3434od1rakw34vmrl71ru95mry18mxburmksnmcdsi1uckzaygyr8z2shwxvk0adxtuq61cgr4djafhwedg03wx373gu524xko4f21i0982vu72t6hsyq36gloap6zmfhmir8bpqr021mewgq8qns2kuh8kvqzkwhbyj67mwbg5np97e0et5js0rv04ik7pzai313x26dk46nvc7a7lcrfbfh6z9qigc6kd1vnfzlyvxylfy3srz4f3i4utec9foanoxf1hm6znc6awb8n4zf6x9sualoe44ew3ql7y10tqx02qxv53kvmseukwk5c2sf8cwvm3u5iwsxid2o15j3cecug8lbet04wnc1kdgeu3aawsp8uk4b5ibvpo6fqek0db4mb6d86fifxdzqf5j9tlhgwqa9q7sgifs1bj3rm6gvhzxrszen9g4nez004s3hwcgr24mgd0h6cp1h7xxpkbc218nd5itp2kyoryq3dr5mciyotn0z259xg8ye9elho4znoewoyt38ht5vokwnfi8qsoe35t74gy57672b4m9grbep0rovrpln5raqpkujwhg28zhpottd5drtpmtgscrxjkn8s',
                        mime: 'wn0batvq5wd801obcf8akdz31lfoassata0ew4lhzhueebgv9m',
                        extension: 'xkxe111eycrghc2umzh2w29hzwpnb2amm6q2s7lx42mfefabyz',
                        size: 2735207494,
                        width: 970311,
                        height: 753303,
                        libraryId: 'c8df62e2-87a9-4027-9c55-e838dd159e23',
                        libraryFilename: 'dqq3gt6yfnyn5xk1pat7bw5c5ndepg3ehusil7kvg9lib4bb92hdcofw44qhaf4spug6j7ewcvi6c1vluah13qz5lxdhnr7dnddjtqjq91aaxa38ddzn2p3twvg9jd87hd4zrr9xsw9ykt3va94vxup0u2g23zo1gk5tyk5ya1ah298bkiovpskhfiqko570e1rjnfdkmevd9v7hgms2pno6qk6zluuezk79e1ekcipwnk5fwzvexr36eh26tob',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachment.id).toStrictEqual('a7828584-aeab-4542-ad90-1d35e663be89');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'eecf485c-f501-4e1c-bf79-2bdf743000ad'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {   
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a7828584-aeab-4542-ad90-1d35e663be89'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentById.id).toStrictEqual('a7828584-aeab-4542-ad90-1d35e663be89');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});