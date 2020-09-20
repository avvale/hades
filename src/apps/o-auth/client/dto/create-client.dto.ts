import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '895b4570-a8b8-4b47-bd7e-9643d2017523'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'PASSWORD_GRANT',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD_GRANT']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ygpk35cld1qjlyooape99dm23f7i1yxl4fnid0gv6c1gdmsj48dvjnim23slfes7578wqva335wgpfi50jetr7wo76zjgi9j3wmy0c3j443g52scclrxhdytgftpa4pfu0uj841volxygnbm3a8sezqorr1qylts6r5bldrfknmt807b83ogo8t7y6b94vlwe1a65gtxyr1zb8jy29h89o7h5deffccsh41agm68xdbiepvhrt37yzyktalj6rw'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'oo4b880i3fdhbtpeqorne2qyr5d3zp7yt7pfal0bwqx0mlg1c9l8b8ejhqn4u7srao7lnrb3qcl5hpqgklvar1ietz'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'fo04spa9eltra5fb8pje85i6yht2ye7ysik6wxpg4gqng2a3oc5yfkw53frfyqhkxoesk7ob46x3pgr0xfgnfqolwxskqtwdedp4w8pezyc973mnhe3eujo8g8wpqpt9zc0v99hxoltpbqi4q0t78yibu7m13n2r8fg2swfovizdfommojtye1vpbt8hgier0cs7wm4napqaoqh4ed298n03dr4o332p04mok900ub60dr8dzhcwq2co5hfo1i1up4wou3phc1xd5knur4ocx3cb625te45hpc243yfkah73n2bv0slp17oul54wn6wblebr2bitcsfln7kgooeixurre8kmq8aq14dlu9qb3zxivl0hbporkdl2esqvch6qsiqfrn4aygb2ms4u732f5pljufxyplv7ea9yd5gejiivdypzovw98xkm7zutoqm5vcauk4z5p6x222i1s3gwhlb8dclob00kg8dwf1hr5velgek2xgvbiyfl84jwj5anovn5pccpquroo2mnw7nui294aib436hbjqqq6sz6byf7jij5b5zqb2he3mv30eowobw2uugiz9pgrowjpvtdjpdlfhqjwjqj4ei8zb8kijwkxdl65ytbyfmfdi1x7jfydxh0uqfpk41u42vrjrgr0igdh0svix0vg3f294jwd8svfwa78glptieph8jh1s3bvcxnoczijz9iq23r77zfwbfsz3a2xdfr9em3vxf30617p4zbsv6oqgaiz5mviaxdwph647s5y2ql2w5lwd6ubcxc46yo3hwu9db9ksie60vrqjw0obhj144ou8p8gbpml1ml9up3dunn4i68s7vjkrvqef226g6w8cc6ftjmbjnxbn9mnglcllbb5m0awsfx9ygb6vfeoc2z0g7cbyr4fktp77lodktkihz9ee7dhjrfb8i9qihkgpcfnwpwznid5z6iar7e80scyp58rq12cntwiyi2fihrqenbn32nozfp13u3ss8iw10dn6spzodc0zphsb85utb0stwr3my5mgk1pjw71u3stcrxgqbe7chrjhobck7ek5gn35stl9tl97mis1155qe5leohpfju3fd0dsf3ec2ki0u2cba2xahk4y4dpyssij3f4gf42amlo4bvc2nv35rc072e1fyhlosxtcftj6tvz11bviq0m5pz72wxe112edcp06fo7kynryocb8pfyczmcev10wga3nkhtf13vrln6dwbjbmtnxdisiwxdkmvvysy0yp2ttmr0us2eyjchve6m7yabj1s031x3ivwwfiayo6se8rygbgkbsynkbi2c7wdti07yqpj6kxwopluyj6mfrlxgujkqa3fndqzs5ht2ci5gyy77ezgouwizvayewjh0leuz1z4vf3imrgvn5gjwufezx6zypcajn0a17g6gtzhpi8ut0uauvhn8ohw7cg656uvowpr4psbzoe7acsuv01qzaphnermmqkufcf78binmv4r3gt5zjlja5s5ny6dkuemytfw7951lc2ynuk369iwo9xcbrjqifm91mdfmyzsoncfsbhvcknpe0jubood46itzzhbl26pwyw9u0acra696h0tnw2zzwd8gfgk75ndki8xvwuganf98zf2bjzu9oni1au89wpj3iz8edbm6ovnnqenlipnn1aaeirydlfw251kpeldo03xquram51e56s1bd1g1avggcg8uzk9nkm0pn9nulztqkqiy9f4x4zh4g75mdn7sq1e3kj1p6ccgw3hrx3xris6thbtka86iwki7p2o0mho0j6me4zz6mk8zs0s6jbid0eqzj5s6rkq21kmpwfj7o8htejz03ip314001hh06bi6ntoq6mqj1befe2fgakfm2g3k1btq9b82eg66054l0ao2o94s63pwlj2fhml7spt8e66utia9u1vpoonw2m67x7wj1it5n9ckmtsdaciqcyu5fzsjot2nnszztajcq4fud55z5snfnilau87dwoip5id1fio7btcml3obuph'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'vh635cd698fiaqp0qmkyrd3qbbu9qfn7hji6ti0rezrpuqv0lplp6bexmk3ukto0t9331prrua7lkqzomfxr11hekl9exp669njfug9z2fdojg92f72smab1ewtcfflsjr8r6wt0cqm4addf7u6kjpst3vmyej6z0ea305090jrrmdgd0xbv74evk7dqk64rdtk5df9y621lofbibwn7qj93hknyuvdpk6mt9qyjjlxuy5vy9snbg41l2xc7r7rovt52c4quos3eu2ev4f2o2nsh6akt41qgnzdgqpi31rxvvypnyjylaq7c010fcg9dskga503b9lb1vhg7agsnklxx5hpu3rjuxz4h00z3afb1ei6s61ov56akremby55456jon1g2nfjlnkis8pgmp9v67tgf36zfoiha6uwmh4vmr3y4ltroc90l4t7r0daipcdw5w1aonkh5xaks20274de4juu1zvoovuoj3trmsyva0uz88qlxkn2mbvqtdxi719wpy44413r0vse8vxhum0riw418rp0w7zvq7tic2uzsazpanszj8kj7zs0n5bgnz0fmy4juulwkodk8hsr3groqj8hhwvrrgcdwchsf3736t5g88fp89labh4rhon9wereve4p3nnrdolqfb21c9e6q03qfnsjus5d2nin0efjptaaizfwj4eawctj7ywtm4nljl4yxl9mptxbe2xqhwf08osn3d7ggcx9rlspmcpmncplunnlfepf39bsz6fwhbzjzb5tru3a5dpco567rqismnxwksuzcs98hklrkcik94lzg7jutd2ksz4frz6wecj761apwwz6wn2hfarirmc6ll0v1mg809v1dyootoo8xck2l5bl3qokkqatc53t2ml37tog2r7fa4zijvlw9j2suxw9np6jvzn6uv37or2m60g228pqrpmv0ei9hsf3j5x8nmzyt3xbt8zy8belsw10q41akgp9vcws0i3uv19mnmy2az6lp640keifw6u1udjtkcfsq929ffjh711pvz47gyaxy5638eoqdj1vq13s6hvvxu8tfi5z0t17ps946f70j023518r0i6cbeyk0csfpvj9bged16ka5deb1ed6olu33fbx5z3w2u65t1oyw6sgbc9177f2w7p2kcdt2cd1loz1qbmf57ixmb6l0dw6sf0al4djucvflyyhbpr1hp1ded9bo2dae0qzfihgolovods9kczyex5s0666hx6bll9fmo80gloy4p1iuksjyduzzft1e09xawmvieep3a994vh4jn24lgtw9yabk4jqs0eb190agyih45z4yg06s1e8um1vs4q87uupzclw41fynsy8jhf9eztns4eynod2se3x8iicqbx22mkiembsgydlf61x4zwznvrjbq6glfg80rldfxsl8wac9azyghasagro5kwg4j17yv8hirshzq9hwhmqrqji3epifit06nbdernvdjjkdj4aw745n16zpuuatjptnaor4ztbrty4b32e0s5rdf9bn7tw5jmzcvccjmw1o6oh4dkp7o6z99rhemzdlx1xub2hbic48ozvhdbtbcw3l0i8c88dgw8ru657602j1e2ivp51g6ajeblc8swdvo771xwuec6ff1e2s2ukgekpn88q062z5e5e11k5eprbiahiq60h54j3ldctz43b4u87mm4h2qkescc2n0mpcqe7o4wf1jph47qvla29q32iishlpuglmmb57jso2ze0rageqc01adjlbjs1djw5qvm5h5psj17mchjsu6jhfiguajx18cc9aj7kvqnkt6nosopannslilyck8oxr4k0weh66iyb4tkry7cd6un46p0kqoy0rq8bojdg6wjxc7n0eqamsw5gv4mdegytpiu7xyaqwakwisj83ka474gzbu4yuzrzr9jwfwl6pklktsy2pitkxdo50gsuxml2hb65lubmkv62ba4xzbzuyhcpq5ja5nc7udib81r9gp8w7fbu56km07tw5d6y85ng'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'resourceCodes [input here api field description]',
        example     : { "foo" : "bar" }
    })
    resourceCodes: any;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 4024834421
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 2306721052
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
}
