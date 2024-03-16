const axios = require ('axios');
const MongoClient = require('mongodb').MongoClient;
const OpenAI =require("openai");
const {HfInference}=require( '@huggingface/inference');
const  testVector =require( "../utils/testVector")

// const openai = new OpenAI();

// async function getEmbedding(query) {
//     try {
//         const embedding = await openai.embeddings.create({
//         model: "text-embedding-ada-002",
//         input: query,
//         encoding_format: "float",
//         });
//         return embedding;
//     } catch (error) {
//         throw new Error(`Error getting embedding: ${error.message}`);
//     }
// }

const hf_token="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"

const model = "text-embedding-ada-002";

async function getEmbedding(inputs) {
   return  [
    0.00072939653,
    -0.026834568,
    0.013515796,
    -0.033257525,
    -0.001295428,
    0.022092875,
    -0.015958885,
    0.018283758,
    -0.030315313,
    -0.019479034,
    0.019400224,
    0.0106917955,
    -0.005001107,
    0.017981656,
    0.0036416466,
    -0.012918158,
    0.029816188,
    -0.00018706948,
    0.013193991,
    -0.024483424,
    -0.016011424,
    0.0019275442,
    -0.007467182,
    -0.011768856,
    0.012859052,
    -0.011722884,
    -0.002154121,
    -0.022539461,
    0.0010910163,
    -0.017351182,
    -0.005122605,
    -0.010035052,
    0.0073161307,
    -0.04103338,
    -0.021068355,
    0.009877433,
    0.023918625,
    -0.0037828467,
    0.0067776004,
    0.02159375,
    0.018993042,
    0.0034905956,
    0.0053557493,
    0.001825749,
    -0.026493061,
    0.021580614,
    0.0004851698,
    -0.02837135,
    -0.00970668,
    0.009279796,
    0.021751368,
    0.007834959,
    -0.0130495075,
    -0.02049042,
    -0.0009054861,
    -0.0011345256,
    0.00089563493,
    0.02842389,
    -0.012957564,
    0.014133136,
    0.035831966,
    -0.015538569,
    -0.0022296465,
    -0.0038419536,
    0.005523219,
    -0.009240391,
    -0.012215442,
    0.011447052,
    -0.032574512,
    0.017232968,
    0.03985124,
    0.009719814,
    0.01255695,
    0.0013964024,
    0.014592856,
    -0.020319667,
    -0.022119146,
    0.013922977,
    -0.021948392,
    0.0051423074,
    0.024930011,
    -0.037014104,
    0.0042688376,
    0.0041407724,
    0.009752652,
    0.0025235396,
    -0.02721548,
    0.004038977,
    -0.02274962,
    -0.0015835745,
    0.035884503,
    0.029317062,
    -0.012727703,
    0.0074080746,
    -0.0012510978,
    0.009844596,
    -0.003332977,
    0.023432633,
    0.00880694,
    -0.0066364002,
    -0.016773248,
    0.019531572,
    -0.0059632375,
    -0.00668894,
    -0.012898456,
    -0.023406364,
    -0.006025628,
    -0.02336696,
    0.014908094,
    -0.0026089165,
    -0.017745228,
    0.013581471,
    0.032600783,
    -0.01761388,
    0.024798661,
    -0.047338124,
    0.0020211304,
    -0.00039219944,
    -0.0108691165,
    0.008820075,
    0.010704931,
    0.019597247,
    0.016142773,
    -0.005050363,
    0.004790949,
    0.01661563,
    0.01987308,
    -0.017732093,
    -0.00998908,
    0.0045643724,
    0.012373061,
    -0.012438736,
    0.0018405257,
    0.021212839,
    -0.03286348,
    -0.00081066863,
    -0.02395803,
    0.000641557,
    -0.009798624,
    -0.020608634,
    -0.004423172,
    0.027767146,
    -0.015210196,
    -0.0030111722,
    0.022683945,
    -0.0047613955,
    0.006061749,
    0.012799945,
    0.010612987,
    0.0033756653,
    0.00623907,
    0.01168348,
    0.04665511,
    -0.021422997,
    0.03060428,
    0.0037762793,
    -0.002083521,
    -0.0009596675,
    0.0055856095,
    -0.008123926,
    0.0042097303,
    0.033073638,
    0.0053064935,
    -0.002037549,
    0.0008192884,
    0.030683089,
    0.0049124467,
    0.013896707,
    -0.0118936375,
    0.0032525258,
    -0.020319667,
    0.016221583,
    -0.027845955,
    0.026335442,
    -0.0051587257,
    0.017338047,
    0.0003144163,
    -0.00998908,
    -0.018533321,
    0.000037506252,
    -0.011341972,
    0.0033346189,
    -0.0022641257,
    0.029133173,
    -0.022513192,
    -0.0020671024,
    -0.00998908,
    0.007467182,
    0.010586717,
    0.017955387,
    0.0038518049,
    0.013647145,
    0.024010569,
    -0.023025453,
    -0.66620135,
    0.0043312283,
    -0.0021968095,
    0.0011328838,
    -0.008820075,
    0.015486029,
    0.015105117,
    -0.007073135,
    -0.026020207,
    0.0007257024,
    0.005792484,
    0.020582363,
    -0.009332336,
    0.0010105652,
    -0.007230754,
    -0.02213228,
    0.005464112,
    -0.0375395,
    0.0050832,
    -0.005523219,
    -0.0015006606,
    0.0389318,
    0.008465433,
    0.016142773,
    0.019965025,
    0.016523685,
    0.007979442,
    -0.009542493,
    -0.017390586,
    0.0029454979,
    -0.0029537072,
    0.023498308,
    -0.010376559,
    -0.008629619,
    0.04190028,
    0.009798624,
    -0.004866475,
    -0.0096016005,
    0.008301247,
    0.024535963,
    -0.030000076,
    -0.014133136,
    0.005920549,
    -0.016274123,
    -0.0017124605,
    0.0025465258,
    0.008110791,
    0.0075919633,
    0.0051160376,
    0.02559989,
    0.005657851,
    0.014553452,
    -0.009253526,
    -0.019019313,
    -0.005322912,
    -0.005096335,
    0.01584067,
    -0.0318915,
    -0.02672949,
    0.014461508,
    -0.0033395444,
    -0.0020785953,
    -0.0273731,
    -0.007460614,
    0.010796875,
    0.015289006,
    -0.009726382,
    0.025928263,
    -0.020713713,
    -0.018572727,
    0.0038944932,
    0.010429098,
    0.009838029,
    0.017508801,
    0.02718921,
    -0.0055856095,
    0.0153415445,
    -0.017232968,
    -0.016957136,
    0.007460614,
    0.0051751444,
    -0.010015349,
    -0.03633109,
    0.018966774,
    0.022670811,
    -0.0081764655,
    -0.035385378,
    0.0013512513,
    0.023695331,
    -0.0035529863,
    -0.004380484,
    0.018441377,
    -0.007027163,
    0.009286364,
    -0.0018766467,
    0.02834508,
    -0.022657676,
    -0.0043640654,
    0.023275016,
    -0.03267959,
    0.023222476,
    0.00023047617,
    0.0014349861,
    -0.0014029698,
    0.03848521,
    0.0038452374,
    0.0012084093,
    0.0059960745,
    0.03507014,
    -0.017692689,
    0.025744373,
    -0.011979015,
    0.007946605,
    -0.01815241,
    -0.033677842,
    -0.032574512,
    0.022119146,
    0.02320934,
    -0.0026975768,
    -0.011841098,
    -0.0030752048,
    0.022736484,
    -0.006603563,
    -0.024220727,
    -0.002741907,
    0.013476391,
    -0.017745228,
    -0.020345936,
    -0.0115586985,
    0.009522791,
    0.004649749,
    -0.015998289,
    0.01656309,
    -0.011486457,
    0.009516223,
    -0.003756577,
    0.034938794,
    -0.030866979,
    0.02675576,
    -0.017416857,
    -0.006665954,
    0.0126488935,
    0.024220727,
    -0.004708856,
    0.011144949,
    -0.03499133,
    -0.022618271,
    -0.026125286,
    -0.053800486,
    0.0034708933,
    -0.010961061,
    0.008229005,
    -0.012878754,
    0.007073135,
    0.018507052,
    0.0033855163,
    -0.007710177,
    -0.0031031165,
    -0.016208448,
    -0.019492168,
    0.008485136,
    0.0036646328,
    -0.025324058,
    0.0047055725,
    -0.0037138886,
    -0.006298177,
    0.011913341,
    0.008274977,
    0.0055626235,
    -0.008432596,
    -0.002649963,
    0.005723526,
    -0.007854661,
    -0.0009219047,
    0.02506136,
    0.028896745,
    0.015433489,
    0.010199238,
    -0.021974662,
    -0.008353787,
    -0.008563945,
    -0.012970698,
    -0.004649749,
    -0.0051620095,
    0.032548245,
    0.006876112,
    -0.016182177,
    0.03176015,
    0.0046924376,
    -0.0038583723,
    0.014605992,
    0.010061322,
    0.0065969955,
    0.007637935,
    0.0065477397,
    0.010015349,
    0.017876578,
    -0.001625442,
    0.020687442,
    0.0073161307,
    -0.00079917564,
    -0.0018093303,
    0.004413321,
    -0.0129378615,
    0.014803015,
    -0.028056113,
    0.016326662,
    -0.0186384,
    0.03170761,
    0.006393405,
    -0.0036876188,
    -0.003016098,
    -0.009430847,
    0.00002683416,
    0.024877472,
    0.012662029,
    -0.008104224,
    -0.0035825397,
    0.012432168,
    0.012182605,
    0.008340651,
    -0.003121177,
    -0.006698791,
    -0.0067841676,
    -0.01771896,
    0.002211586,
    0.02611215,
    -0.023931758,
    -0.0045545213,
    -0.00544441,
    -0.020845061,
    -0.0083997585,
    -0.005664419,
    0.03183896,
    0.0041571907,
    -0.010632689,
    0.0038583723,
    -0.029211983,
    0.0069417865,
    -0.0032984978,
    0.01255695,
    0.009851163,
    0.020700578,
    0.0004203163,
    0.00067398377,
    0.00683014,
    0.032311816,
    0.007854661,
    -0.0017026094,
    0.01422508,
    -0.0005812186,
    0.01584067,
    -0.007454047,
    0.011781991,
    0.017968522,
    -0.025796913,
    0.009030233,
    0.02387922,
    0.027924765,
    0.019176932,
    -0.0037500095,
    0.002635186,
    -0.019702327,
    -0.0033855163,
    0.019649787,
    0.00087675353,
    0.0081764655,
    -0.008866047,
    -0.007145377,
    -0.021698829,
    -0.01412,
    -0.009831461,
    -0.010396261,
    0.0015843954,
    0.01815241,
    -0.017679553,
    0.007480317,
    0.0027763862,
    0.010961061,
    0.005910698,
    -0.028318811,
    -0.021462401,
    0.029658569,
    0.047968596,
    0.0047778143,
    -0.025271518,
    0.0077627166,
    -0.00033740234,
    -0.0019850093,
    0.0055593397,
    0.012281117,
    0.025166439,
    -0.013844168,
    -0.004590642,
    -0.012845917,
    0.00383867,
    0.013988652,
    -0.0053393305,
    0.008938289,
    -0.034649827,
    0.02062177,
    -0.0030226652,
    -0.01422508,
    -0.01535468,
    0.013896707,
    0.015459759,
    -0.013391014,
    0.006058465,
    -0.005004391,
    -0.021554345,
    -0.012950996,
    -0.0127605405,
    -0.011236894,
    -0.0045545213,
    -0.00080245937,
    -0.0051160376,
    0.016260987,
    0.014711071,
    0.02675576,
    0.013765359,
    -0.0012322164,
    -0.006002642,
    -0.03971989,
    0.0053656003,
    0.122732356,
    0.039509732,
    0.005405005,
    0.017154159,
    -0.007690475,
    -0.0057563633,
    -0.0035661212,
    -0.016037693,
    0.026190959,
    0.010126996,
    0.023038587,
    -0.005697256,
    0.00068917096,
    0.019584112,
    0.01422508,
    0.00069450703,
    0.007920335,
    -0.034676094,
    0.009870865,
    -0.004439591,
    0.035148952,
    0.013581471,
    0.009404577,
    0.023025453,
    -0.032574512,
    -0.009916837,
    0.010251777,
    0.013003536,
    -0.0122942515,
    0.012662029,
    -0.015617377,
    -0.026690084,
    0.004794233,
    0.018901099,
    -0.011611238,
    -0.008117358,
    -0.0035923908,
    -0.0054575442,
    0.037119184,
    -0.0048008002,
    0.011985582,
    0.0048073675,
    -0.002815791,
    -0.005825321,
    0.00929293,
    0.00028322096,
    -0.0217251,
    0.036803946,
    0.016602494,
    -0.003848521,
    0.035779424,
    -0.0014981978,
    -0.0005730093,
    -0.011033303,
    0.016655033,
    -0.0030883397,
    0.0075197215,
    -0.0009604884,
    -0.0012642327,
    0.039430924,
    -0.015998289,
    -0.027478179,
    0.009424279,
    -0.012616056,
    0.025087629,
    -0.0071322424,
    -0.0045479536,
    -0.016418606,
    0.000326525,
    -0.013154587,
    0.02210601,
    -0.018480781,
    -0.004393619,
    -0.016681302,
    0.0014046117,
    0.008557377,
    0.018467648,
    -0.009995647,
    -0.007723312,
    0.0048336373,
    -0.0020900886,
    -0.028108653,
    -0.012819647,
    -0.01702281,
    -0.008117358,
    0.030972058,
    0.0010048187,
    -0.0070205955,
    -0.01817868,
    0.015709322,
    0.0077692843,
    0.01876975,
    -0.002402042,
    -0.021344187,
    0.0023445769,
    0.009870865,
    -0.008018847,
    0.0008882466,
    -0.008156763,
    0.007907201,
    0.012281117,
    -0.0066002794,
    -0.04410694,
    -0.021015815,
    0.006511619,
    0.015367814,
    -0.00018768519,
    0.024155052,
    0.0024184606,
    -0.0070140283,
    0.007486884,
    -0.022276765,
    0.0055593397,
    0.01817868,
    -0.03619974,
    0.023156801,
    0.016707573,
    0.02156748,
    0.016786382,
    0.0025235396,
    -0.015551703,
    -0.012622624,
    0.02939587,
    0.02565243,
    -0.019886214,
    0.0031786421,
    -0.0035102977,
    -0.024273267,
    0.027057862,
    0.008156763,
    0.038879257,
    -0.017141024,
    0.0037828467,
    -0.008406326,
    -0.026506197,
    -0.010330587,
    -0.0074212095,
    -0.02621723,
    -0.023353824,
    0.005523219,
    -0.012583219,
    0.008327517,
    -0.0021738233,
    -0.018887963,
    0.012662029,
    -0.031970307,
    0.0017058931,
    0.0041342047,
    0.0012921443,
    0.033730384,
    -0.018296894,
    0.0026171256,
    -0.009095907,
    0.01825749,
    0.011532429,
    -0.027898494,
    0.004226149,
    -0.016287256,
    0.0019817257,
    -0.0010943001,
    0.036042124,
    -0.0067776004,
    -0.0074474793,
    0.017521936,
    0.01165721,
    -0.0033493955,
    -0.019321416,
    -0.029474681,
    -0.026821434,
    0.03267959,
    0.00623907,
    0.013128317,
    0.021974662,
    -0.037224263,
    -0.0061569773,
    0.017298643,
    0.004226149,
    -0.008347219,
    -0.016050829,
    -0.03969362,
    -0.012399331,
    -0.0038747909,
    -0.016182177,
    -0.013949247,
    0.0008053326,
    -0.016418606,
    -0.008537675,
    -0.014658531,
    -0.0008266768,
    -0.0007745477,
    0.01871721,
    -0.006025628,
    0.0025153304,
    -0.010626121,
    -0.015000038,
    -0.0037106047,
    0.0023051722,
    -0.005510084,
    0.0071782144,
    0.017324913,
    0.0132728005,
    0.009358605,
    -0.0059993584,
    -0.007867795,
    -0.008202735,
    0.013410717,
    -0.0052112653,
    -0.038091164,
    0.02387922,
    -0.011952745,
    -0.024759257,
    -0.01930828,
    0.002837135,
    -0.035359107,
    0.005710391,
    -0.011900205,
    -0.0057760654,
    0.015394084,
    -0.029343331,
    -0.028581508,
    -0.004616912,
    -0.019754866,
    0.007040298,
    0.0033690978,
    0.022329304,
    0.03183896,
    -0.0015113326,
    -0.010665526,
    0.010238643,
    0.003651498,
    0.0028781816,
    0.031287294,
    0.02845016,
    -0.0012190815,
    0.008951424,
    0.0018536606,
    0.012373061,
    -0.023472039,
    -0.024168188,
    -0.001153407,
    -0.007894065,
    0.009424279,
    0.0036646328,
    -0.010803442,
    0.0043772003,
    0.028082382,
    -0.0075065866,
    0.0011566908,
    -0.027346829,
    -0.017351182,
    -0.029264523,
    -0.008150196,
    0.009759219,
    0.013121749,
    0.0033477535,
    -0.008452298,
    0.003625228,
    -0.021790773,
    -0.016720708,
    0.020937005,
    -0.016366066,
    0.010028484,
    -0.001024521,
    0.002543242,
    -0.005828605,
    -0.028581508,
    -0.005230968,
    0.00468587,
    0.0007215977,
    0.023563983,
    0.01656309,
    -0.003638363,
    0.010409396,
    -0.006278475,
    0.0016861908,
    -0.02457537,
    -0.011650642,
    -0.025560485,
    0.0018421676,
    -0.018966774,
    -0.0088003725,
    -0.0065969955,
    -0.0148292845,
    -0.01419881,
    -0.009273228,
    -0.009595033,
    -0.011250028,
    -0.004426456,
    0.012780243,
    0.0022674093,
    -0.014816149,
    -0.016852057,
    0.0067644655,
    -0.01137481,
    -0.0078021213,
    0.00821587,
    0.009969377,
    0.014632261,
    -0.012642326,
    0.012832782,
    -0.010718065,
    0.0010491489,
    -0.015683051,
    0.015669918,
    -0.00795974,
    0.010619554,
    0.041164726,
    -0.02038534,
    -0.017167294,
    0.008314381,
    0.016392335,
    0.011427349,
    0.0021968095,
    -0.004495414,
    -0.016576225,
    0.0073424005,
    0.02221109,
    0.0020391908,
    -0.0059238328,
    -0.016103368,
    -0.0020621768,
    -0.0018093303,
    0.024352076,
    -0.025796913,
    -0.003628512,
    -0.008531108,
    0.009352038,
    0.0036843352,
    -0.013489527,
    0.002732056,
    0.0045972094,
    0.012799945,
    0.008990828,
    -0.011834531,
    -0.027110402,
    -0.012103796,
    -0.0041243536,
    0.02732056,
    0.0039338977,
    -0.018704075,
    -0.0053294795,
    0.019242605,
    0.029632298,
    -0.006078168,
    -0.0023002466,
    0.019071853,
    -0.011098977,
    -0.030131426,
    -0.013804764,
    -0.000812721,
    0.0023987582,
    0.01887483,
    0.011637508,
    -0.025074495,
    -0.018546456,
    0.012865619,
    -0.03168134,
    -0.008465433,
    -0.013515796,
    0.023931758,
    0.02148867,
    0.013095479,
    0.0034807443,
    0.012300819,
    0.017246103,
    0.024535963,
    -0.022434382,
    -0.02708413,
    0.01941336,
    -0.009818326,
    -0.013647145,
    0.004695721,
    -0.026125286,
    -0.021554345,
    0.010987331,
    -0.023077993,
    -0.0011993791,
    0.0039962884,
    -0.016392335,
    -0.021462401,
    -0.015591107,
    0.020805657,
    0.0067381957,
    0.01419881,
    0.009168149,
    -0.0078021213,
    0.01021894,
    0.011979015,
    0.0040783817,
    -0.035674345,
    0.005230968,
    0.0007872721,
    -0.010658959,
    0.0017173862,
    -0.007283293,
    -0.0031983443,
    -0.029422142,
    -0.008760968,
    0.05351152,
    -0.0025826467,
    0.003651498,
    0.00880694,
    0.027162941,
    -0.0083997585,
    -0.011059573,
    0.01419881,
    -0.023485173,
    -0.0194659,
    0.01132227,
    -0.0027008606,
    0.03299483,
    -0.017246103,
    0.007145377,
    -0.012267982,
    -0.0043377955,
    -0.0043870513,
    0.001860228,
    -0.003779563,
    0.0101795355,
    0.015985154,
    -0.017311778,
    0.022578867,
    -0.021764504,
    -0.014934364,
    -0.026690084,
    -0.039063144,
    0.015183927,
    -0.027740875,
    -0.02724175,
    0.001930828,
    0.0049879723,
    -0.017285507,
    -0.0061372747,
    -0.008058252,
    -0.010442233,
    0.038143706,
    0.21709336,
    0.005309777,
    0.0121366335,
    0.03157626,
    -0.004590642,
    0.008583647,
    0.018493917,
    0.0053590327,
    -0.0028059396,
    -0.02444402,
    -0.040429175,
    0.0015827536,
    0.0036186606,
    0.0071191075,
    -0.0107574705,
    -0.028029844,
    -0.02423386,
    -0.013108615,
    0.0010146698,
    -0.0150525775,
    -0.017232968,
    0.014894959,
    -0.00939801,
    -0.02282843,
    0.030472932,
    0.00025202558,
    -0.011821396,
    0.004630047,
    0.013003536,
    0.02102895,
    -0.013391014,
    -0.011190921,
    -0.022907238,
    0.015367814,
    -0.022421248,
    -0.019938754,
    -0.014408968,
    -0.010704931,
    0.0013233396,
    0.027451908,
    0.022907238,
    0.0047515444,
    -0.0015819327,
    -0.009233824,
    0.013463257,
    0.020818792,
    -0.008064819,
    -0.0035726884,
    -0.045972094,
    0.0026762327,
    -0.047285583,
    -0.031208485,
    0.05319628,
    0.0016155908,
    0.00051349186,
    0.019820541,
    0.015748726,
    0.024115648,
    -0.047022887,
    -0.0014661815,
    -0.011250028,
    0.0014924513,
    -0.013213694,
    0.0443171,
    0.006275191,
    0.030499201,
    -0.008491702,
    -0.022972913,
    0.017246103,
    -0.017929116,
    0.009437415,
    0.0037040373,
    0.010823145,
    -0.0028716142,
    -0.002223079,
    -0.029684838,
    0.029317062,
    0.0053721676,
    0.007900633,
    -0.0075722607,
    -0.007966307,
    0.016878327,
    -0.008944856,
    0.004213014,
    -0.0067316284,
    -0.0352803,
    0.010632689,
    0.009851163,
    0.0095556285,
    -0.0008430954,
    -0.0011755722,
    -0.025087629,
    -0.008537675,
    0.011420782,
    -0.0020047117,
    0.036593787,
    0.0034577583,
    0.034912523,
    -0.024930011,
    0.017810903,
    -0.014894959,
    -0.005470679,
    0.010586717,
    0.0018273907,
    -0.013857303,
    -0.0028666884,
    -0.0089776935,
    0.029106904,
    0.016536819,
    -0.021738233,
    -0.005654568,
    -0.021134028,
    0.014973768,
    -0.0065378887,
    0.026979053,
    0.0023560699,
    -0.01887483,
    -0.018441377,
    0.020004429,
    -0.014487778,
    -0.022789024,
    -0.00878067,
    -0.0022903956,
    0.018914234,
    0.027688336,
    0.0006395047,
    -0.015026308,
    0.004344363,
    -0.005661135,
    -0.02565243,
    0.020253992,
    -0.026952783,
    0.015183927,
    -0.018283758,
    -0.03194404,
    0.0059599536,
    0.005030661,
    -0.00570054,
    -0.0044789957,
    -0.0013569978,
    0.021987796,
    -0.020359071,
    -0.0008504838,
    -0.008649321,
    0.004367349,
    -0.016944,
    0.012405898,
    0.004406754,
    0.00031646862,
    0.0020506838,
    -0.05558683,
    -0.028187461,
    -0.010639257,
    -0.011309136,
    0.0007203663,
    -0.0163792,
    -0.016930865,
    -0.023051722,
    0.0053951535,
    0.007953173,
    -0.030578012,
    0.029632298,
    0.016878327,
    -0.012950996,
    0.0053951535,
    -0.011571833,
    -0.16749604,
    0.023708466,
    0.014737341,
    -0.02613842,
    0.031155946,
    0.021908987,
    0.0043016747,
    -0.012300819,
    -0.032364354,
    -0.012392763,
    0.026571872,
    -0.004613628,
    0.0065444564,
    -0.0041965954,
    -0.018625267,
    0.021291647,
    -0.029211983,
    0.019557843,
    0.033178717,
    0.008839777,
    0.017929116,
    -0.01871721,
    0.0071059726,
    0.0074343444,
    0.013200559,
    0.025928263,
    -0.020017564,
    -0.01476361,
    -0.012898456,
    -0.0069417865,
    -0.015315276,
    0.015499163,
    0.026046475,
    0.005450977,
    0.012609489,
    0.008662457,
    -0.011177787,
    -0.0072701587,
    -0.010744335,
    0.012038122,
    0.026348578,
    0.028817937,
    0.006193098,
    0.0018388839,
    -0.0033231257,
    0.0477059,
    0.01702281,
    0.0066002794,
    0.022933507,
    -0.0059960745,
    0.02732056,
    -0.038038626,
    0.022316169,
    0.009614735,
    -0.010658959,
    0.008563945,
    0.004380484,
    -0.003533284,
    -0.0034938792,
    0.011171219,
    0.003319842,
    -0.00708627,
    0.0003302192,
    0.012064392,
    0.0020506838,
    -0.015367814,
    0.003096549,
    -0.0071716467,
    -0.029264523,
    0.0108691165,
    0.010067889,
    -0.021738233,
    0.007782419,
    -0.034308318,
    0.0012396047,
    0.0009851163,
    -0.007427777,
    0.0011796769,
    -0.0030555024,
    0.036672596,
    -0.0122942515,
    0.03743442,
    0.0066364002,
    -0.015827537,
    0.0023232326,
    -0.014684801,
    0.007513154,
    0.00083283376,
    0.018231219,
    -0.028555239,
    -0.0130495075,
    -0.022526328,
    -0.0063375817,
    -0.01055388,
    0.0063737025,
    0.0065575913,
    0.012379629,
    0.005181712,
    -0.0208976,
    -0.011578401,
    -0.005470679,
    -0.0009136954,
    -0.020792522,
    0.007690475,
    0.05584953,
    0.011933043,
    0.02226363,
    -0.015144521,
    0.016326662,
    0.00058819656,
    0.00584174,
    0.005969805,
    0.00063252676,
    0.02028026,
    -0.021239107,
    0.03643617,
    -0.0069417865,
    -0.032521974,
    0.01530214,
    -0.0307619,
    0.066147275,
    0.018007927,
    -0.004298391,
    0.011762289,
    -0.020687442,
    0.0014826001,
    -0.10318765,
    -0.0017830606,
    0.011506159,
    0.022999182,
    0.0039338977,
    -0.012602922,
    0.01134854,
    0.0046694516,
    0.00021221048,
    0.005299926,
    0.0010031768,
    -0.010849414,
    0.0122482795,
    0.0020900886,
    0.004219582,
    -0.014159406,
    -0.005168577,
    -0.029001825,
    -0.0049058795,
    -0.008721563,
    -0.008183033,
    0.018218085,
    -0.0019997861,
    -0.02226363,
    -0.01368655,
    -0.017377453,
    -0.03315245,
    0.014737341,
    0.015932614,
    0.015394084,
    -0.010672093,
    -0.010816577,
    -0.0027698188,
    -0.01882229,
    -0.003109684,
    -0.018441377,
    -0.013949247,
    -0.011144949,
    0.012307387,
    -0.02603334,
    0.0066823727,
    0.011466754,
    0.026834568,
    -0.026335442,
    0.007631368,
    -0.0022000931,
    -0.024063108,
    0.00821587,
    0.013909843,
    -0.007289861,
    -0.038327593,
    -0.005569191,
    -0.007322698,
    -0.010317451,
    0.036042124,
    0.0003907628,
    0.014894959,
    0.022316169,
    -0.0023035305,
    0.0049551353,
    -0.0069746235,
    -0.008570512,
    -0.028134922,
    -0.0021344188,
    0.009286364,
    0.010514475,
    0.02049042,
    -0.016300391,
    0.0330211,
    -0.015827537,
    -0.018375704,
    0.026361713,
    -0.0071519446,
    0.023655927,
    -0.026348578,
    -0.008826642,
    -0.0217251,
    0.011624373,
    0.008025414,
    -0.009726382,
    -0.011250028,
    -0.0101664,
    0.015197061,
    0.008511405,
    0.00033699188,
    0.0051127537,
    -0.0067841676,
    0.023669062,
    0.018126141,
    -0.0007261128,
    0.00071297796,
    0.023012318,
    0.013515796,
    -0.005723526,
    0.0012708,
    -0.0071519446,
    -0.011394512,
    -0.041348618,
    0.0041374885,
    -0.01476361,
    -0.027583256,
    -0.010961061,
    -0.06246951,
    0.027845955,
    0.021409862,
    -0.0011025093,
    -0.010133564,
    0.003756577,
    0.02269708,
    0.009411145,
    -0.033362605,
    0.0045578047,
    -0.02210601,
    0.02436521,
    0.013423852,
    0.016957136,
    -0.023406364,
    -0.018979907,
    0.008629619,
    0.004452726,
    0.014264485,
    0.015604243,
    0.013134885,
    -0.0021048652,
    0.02274962,
    0.0002943035,
    0.001519542,
    0.011368242,
    -0.001366028,
    -0.01255695,
    0.0035004467,
    -0.0070205955,
    0.0019570978,
    -0.034176968,
    0.0069155167,
    0.013233396,
    0.015932614,
    -0.022316169,
    -0.0041276375,
    0.00017988635,
    0.026296038,
    0.01997816,
    -0.009141879,
    -0.042793453,
    0.005460828,
    -0.0051193214,
    -0.002308456,
    0.00801228,
    -0.012484708,
    -0.0022789023,
    0.03160253,
    0.00084227446,
    0.033677842,
    0.031261023,
    0.004203163,
    -0.018835424,
    -0.0077167447,
    0.010481638,
    0.013180857,
    -0.014737341,
    -0.017508801,
    -0.03740815,
    0.018086735,
    -0.00015197472,
    -0.0011640792,
    0.015210196,
    0.002648321,
    -0.022736484,
    -0.007880931,
    -0.01086255,
    0.0033001397,
    -0.03785474,
    -0.03299483,
    -0.002600707,
    0.005523219,
    0.031523723,
    0.012740837,
    0.0066134143,
    -0.0036777677,
    0.0018290327,
    -0.025941396,
    0.028791666,
    0.021331051,
    0.025153304,
    -0.040849492,
    -0.014330159,
    0.03541165,
    0.0028075816,
    -0.009805191,
    -0.009122177,
    -0.0051718606,
    0.021751368,
    0.011644075,
    0.022421248,
    -0.010737768,
    -0.017246103,
    -0.011637508,
    0.0034741769,
    -0.03055174,
    -0.0051849955,
    -0.027031591,
    -0.010796875,
    0.01163094,
    -0.002929079,
    0.005299926,
    -0.021580614,
    -0.016536819,
    -0.009588466,
    -0.011164652,
    -0.03309991,
    0.006593712,
    -0.0011509443,
    0.007500019,
    -0.0016164117,
    -0.0029816187,
    0.012740837,
    -0.018336298,
    -0.0067973025,
    0.0049387165,
    -0.01417254,
    -0.009903703,
    0.007657638,
    0.0037598608,
    -0.004830354,
    0.023734735,
    -0.0071322424,
    0.0018109722,
    0.014619126,
    -0.0033888002,
    -0.0364099,
    -0.0035267165,
    -0.028318811,
    0.019991294,
    -0.001766642,
    -0.037828468,
    -0.012320521,
    0.0060913027,
    -0.009365172,
    -0.009430847,
    0.027504448,
    -0.03160253,
    0.047022887,
    -0.0053951535,
    -0.014934364,
    0.0005639791,
    -0.0055593397,
    0.0027287721,
    0.015814401,
    0.0053853025,
    -0.025402866,
    0.0052112653,
    -0.033940542,
    -0.021094624,
    0.03296856,
    -0.013397582,
    -0.015065713,
    -0.0043148096,
    -0.015932614,
    0.024102513,
    -0.014422103,
    0.016549954,
    0.010599852,
    0.0055954605,
    0.004012707,
    -0.000038788956,
    -0.018007927,
    -0.0002528465,
    0.0017502233,
    0.016957136,
    0.026519332,
    -0.03746069,
    0.0077627166,
    -0.0026565304,
    -0.006248921,
    -0.012090661,
    0.023248745,
    -0.02441775,
    0.01419881,
    -0.01640547,
    0.00013750582,
    0.006629833,
    -0.017154159,
    0.024312671,
    -0.010875684,
    -0.025035089,
    -0.011946177,
    0.00004302188,
    -0.0019981442,
    0.004042261,
    -0.01163094
  ]
}


async function findSimilarDocuments(embedding) {
    const url = process.env.MONGODB_URI; 
    const client = new MongoClient(url);

    try {
        await client.connect();

        const db = client.db("sample_mflix"); 
        const collection = db.collection('embedded_movies'); 

        const documents = await collection.aggregate([
            {
              "$vectorSearch": {
                "index": "vector_search",
                "path": "plot_embedding",
                "queryVector":embedding,
                "numCandidates": 100,
                "limit": 5
              }
            }
          ]).toArray();

        return documents;
    } finally {
        await client.close();
    }
}

const semanticMovies = async (req, res) => {
    const query = req.query.q;
    console.log("hello")

    try {
        const embedding = await getEmbedding(query);
        const documents = await findSimilarDocuments(embedding);

        // console.log(documents);
        res.status(200).json(documents);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
}

module.exports= { semanticMovies };