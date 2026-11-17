import {
  ChatMessage,
  DateEvent,
  LockNotification,
  MusicTrack,
  NoteItem,
  PhotoMemory,
  QuickReplyOption,
  StoryChapter,
  StorySlide,
  WallpaperItem,
} from '../types/ios';

// 11월 18일, 지유 누나의 생일 데이트 — 사쿠야(한 살 연하) 시점의 사진/영상 자료
export const SAKUYA_PHOTOS = {
  roomCasual: './assets/aistudio/IMG_7192_9f5ee0b2.jpeg', // casual room sofa smile
  morningSelfie: './assets/aistudio/IMG_7206_6e07b6a6.jpeg', // white tee close-up selfie
  readySelfie: './assets/aistudio/sakuya_ready_0900.jpg', // 외출 준비 마친 셀카 (코트 · 브이)
  bouquet: './assets/aistudio/IMG_7193_bb1fc60e.jpeg', // holding colorful flower bouquet
  cafePastry: './assets/aistudio/IMG_7195_0ab9f6a2.jpeg', // eating chocolate pastry
  brunchPastry: './assets/aistudio/sakuya_brunch_pastry.jpg', // 초코빵 한 입 (브런치 카페)
  photobooth: './assets/aistudio/photobooth_fourcut.jpg', // 즉석사진 네 컷 두 장
  appleJuice2Cut: './assets/aistudio/IMG_7200_013df19e.jpeg', // 2-cut night school jacket w/ apple juice
  snowHoodie: './assets/aistudio/IMG_7205_9683af63.jpeg', // outdoor hooded jacket smile
  konbiniBanana: './assets/aistudio/IMG_7203_58d73d93.jpeg', // convenience store snack
  mallShopping: './assets/aistudio/sakuya_mall_shopping.jpg', // 백화점 옷 매장
  mallDino: './assets/aistudio/IMG_7197_641bc48a.jpeg', // mall floor curiosity
  closeUpGaze: './assets/aistudio/IMG_7196_4a8c29f3.jpeg', // close-up gaze
  phoneCamera: './assets/aistudio/sakuya_phone_camera.jpg', // 폰 카메라로 담는 순간
  matchaDessert: './assets/aistudio/IMG_7204_97e4020e.jpeg', // holding green matcha dessert cup
  heartGummy: './assets/aistudio/IMG_7191_2c06626d.jpeg', // pink heart gummy
  parkDusk: './assets/aistudio/IMG_6975_9ec0d021.jpeg', // park dusk sitting
  nightWalk: './assets/aistudio/sakuya_night_walk.jpg', // 밤 산책로 (가로등 · 검은 셔츠)
  yukataPhone: './assets/aistudio/IMG_7199_8c6cd109.jpeg', // yukata looking at phone by window
  yukataDoor: './assets/aistudio/IMG_7201_1282ab66.jpeg', // yukata smiling indoors
  dinnerTable: './assets/aistudio/dinner_table_candle.jpg', // 촛불 · 장미 테이블
  nightIllumination: './assets/aistudio/IMG_7202_f5ccc935.jpeg', // night illuminated trees
  nightCloseSmile: './assets/aistudio/IMG_7198_8ce0e2a1.jpeg', // close-up night outdoor smile
  facetimeCall: './assets/aistudio/facetime_call_night.jpg', // 헤어진 뒤 밤 영상통화 화면
  lockNight: './assets/aistudio/sakuya_lock_wallpaper.jpg', // 잠금화면 배경 (밤길 · 검은 재킷)
  handwrittenLetter: './assets/aistudio/sakuya_handwritten_letter.jpg', // 손편지 "사랑이 이렇게 행복한 것이란 걸 알려 줘서 고마워"
  taxiNight: './assets/aistudio/sakuya_taxi_night.jpg', // 밤 택시 안에서 본 앞좌석
  phoneCase: './assets/aistudio/sakuya_phone_case.jpg', // 즉석사진을 핸드폰 케이스에 넣은 손
  cafeSunlight: './assets/aistudio/sakuya_cafe_sunlight.jpg', // 햇살 들어오는 브런치 카페 실내
  konbiniSnack: './assets/aistudio/sakuya_konbini_snack.jpg', // 편의점 냉장고에서 간식 고르는 순간
  aquariumWatch: './assets/aistudio/sakuya_aquarium_watch.jpg', // 수조를 들여다보는 사쿠야
  cafePhonePhotos: './assets/aistudio/sakuya_cafe_phone_photos.jpg', // 카페에서 휴대전화 사진을 넘겨보는 사쿠야
  parkEnvelopeNight: './assets/aistudio/sakuya_park_envelope_night.jpg', // 밤 공원, 교복 자켓 옆모습
  parkLetterNight: './assets/aistudio/sakuya_park_letter_night.jpg', // 밤 산책로 가죽재킷
  secondLetterNote: './assets/aistudio/sakuya_second_letter_note.jpg', // 두 번째 손편지 (하루하루는 더 따뜻해 되자)
  callProfile: './assets/aistudio/sakuya_call_profile.jpg', // 전화 수신 배너 프로필 사진
  birthdayCake: './src/assets/images/sakuya_birthday_cake_1794916860554.jpg',
};

// 동영상 (iOS Safari 자동재생: muted + playsInline)
export const SAKUYA_VIDEOS = {
  icecream: './assets/aistudio/icecream_date.mp4', // 디저트 카페 — 아이스크림 먹는 장면
  icecreamPoster: './assets/aistudio/icecream_date_poster.jpg',
  cakeCandle: './assets/aistudio/cake_candle_blow.mp4', // 서프라이즈 — 케이크 초 부는 장면
  cakeCandlePoster: './assets/aistudio/cake_candle_blow_poster.jpg',
};

export const SAKUYA_AVATAR = SAKUYA_PHOTOS.heartGummy;

export const WALLPAPERS: WallpaperItem[] = [
  {
    id: 'sakuya-lock-night',
    name: '밤길의 사쿠야',
    subtitle: 'iOS 27 리퀴드 글래스 잠금화면',
    imageUrl: SAKUYA_PHOTOS.lockNight,
    gradientClass: 'from-slate-950 via-zinc-950 to-black',
    isDarkBg: true,
  },
  {
    id: 'ios27-glass',
    name: 'iOS 27 리퀴드 글래스',
    subtitle: '하늘빛 · 모닝 햇살 기본 테마',
    imageUrl: './src/assets/images/ios_wallpaper_birthday_1794916858749.jpg',
    gradientClass: 'from-sky-200 via-slate-100 to-amber-100',
    isDarkBg: false,
  },
  {
    id: 'sakuya-bouquet',
    name: '꽃다발을 든 사쿠야',
    subtitle: '09:50 첫 만남의 순간',
    imageUrl: SAKUYA_PHOTOS.bouquet,
    gradientClass: 'from-stone-900 via-zinc-800 to-stone-900',
    isDarkBg: true,
  },
  {
    id: 'sakuya-illumination',
    name: '도쿄 일루미네이션',
    subtitle: '21:00 야경 데이트',
    imageUrl: SAKUYA_PHOTOS.nightIllumination,
    gradientClass: 'from-slate-900 via-amber-950 to-slate-950',
    isDarkBg: true,
  },
  {
    id: 'sakuya-matcha',
    name: '오후의 디저트 타임',
    subtitle: '15:40 카페에서 웃던 얼굴',
    imageUrl: SAKUYA_PHOTOS.matchaDessert,
    gradientClass: 'from-stone-800 via-zinc-900 to-stone-950',
    isDarkBg: true,
  },
  {
    id: 'midnight-sapphire',
    name: '미드나잇 사파이어',
    subtitle: 'iOS 27 딥 블루 글래스',
    gradientClass: 'from-slate-950 via-sky-950 to-indigo-950',
    isDarkBg: true,
  },
];

export const INITIAL_NOTIFICATIONS: LockNotification[] = [
  {
    id: 'notif-1',
    appId: 'pota',
    appName: '메시지',
    title: '사쿠야 ♡',
    body: '누나, 생일 축하해 ♡ 일어났어? 오늘은 진짜 내가 하루 종일 데리고 다닐 거야.',
    time: '오전 08:00',
    unread: true,
  },
  {
    id: 'notif-2',
    appId: 'pota',
    appName: '캘린더',
    title: '11월 18일 · 지유 누나의 생일 ♡',
    body: '잠금을 해제하면 08:00 첫 번째 일정부터 바로 시작됩니다.',
    time: '오전 08:00',
    unread: true,
  },
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'sakuya',
    text: '누나, 생일 축하해 ♡',
    time: '08:00',
  },
  {
    id: 'm2',
    sender: 'sakuya',
    text: '오늘 하루는 내가 다 예약했으니까 기대해.',
    time: '08:01',
  },
  {
    id: 'm3',
    sender: 'sakuya',
    text: '빨리 보고 싶다, 누나.',
    time: '08:02',
  },
];

export const QUICK_REPLIES: QuickReplyOption[] = [
  { id: 'qr-1', label: '나도 보고 싶어 ♡', userText: '나도 보고 싶어.' },
  { id: 'qr-2', label: '뭐 준비했어?', userText: '오늘 뭐 준비했는데?' },
  {
    id: 'qr-3',
    label: '너도 예쁘게 하고 와',
    userText: '사쿠야도 오늘 예쁘게 하고 와.',
  },
  { id: 'qr-4', label: '사랑해', userText: '사랑해.' },
];

export const SAKUYA_AUTO_CHAT_MSGS: string[] = [
  '누나, 다음 장소로 가자. 준비됐어?',
  '오늘 누나랑 있으니까 시간이 너무 빠르다.',
  '아까 찍은 사진 보내 줄까?',
  '누나 지금 뭐 하고 있어? 나는 누나 생각 중.',
  '오늘 정말 행복해.',
  '조금만 더 같이 있자, 누나.',
];

export const SAKUYA_RANDOM_REPLIES: string[] = [
  'ㅋㅋㅋㅋ 누나 귀여워.',
  '나도 그렇게 생각했어.',
  '누나 보고 싶다.',
  '오늘 정말 좋았어.',
  '왜 이렇게 사랑스럽지, 누나는.',
  '응. 나 여기 있어.',
  '누나, 오늘 사진 또 보내 줄까?',
  '사랑해 ♡',
];

function buildSlides(
  story: string,
  primaryImage: string,
  secondaryImage?: string,
): StorySlide[] {
  const blocks = story
    .split('\n\n')
    .map((b) => b.trim())
    .filter(Boolean);
  const slides: StorySlide[] = [];
  let buffer = '';

  for (const block of blocks) {
    const candidate = buffer ? `${buffer}\n\n${block}` : block;
    if (candidate.length > 130 && buffer) {
      slides.push({
        text: buffer,
        image:
          secondaryImage && slides.length >= 2 ? secondaryImage : primaryImage,
      });
      buffer = block;
    } else {
      buffer = candidate;
    }
  }
  if (buffer) {
    slides.push({
      text: buffer,
      image:
        secondaryImage && slides.length >= 2 ? secondaryImage : primaryImage,
    });
  }
  return slides;
}

const RAW_CHAPTERS: Omit<StoryChapter, 'slides'>[] = [
  {
    id: 1,
    time: '08:00',
    label: 'BIRTHDAY MORNING',
    tag: 'BIRTHDAY',
    title: '생일의 시작 — 첫 번째 연락',
    place: '지유의 방',
    coverImage: SAKUYA_PHOTOS.roomCasual,
    // 2번째 장면은 전화 수신 배너, 메시지 문구가 나오는 장면은 메시지 알림 배너로 그린다
    slideScenes: {
      1: { overlay: 'call' },
      3: {
        overlay: 'messages',
        messages: [
          '누나, 생일 축하해 ♡ 일어났어? 오늘은 진짜 내가 하루 종일 데리고 다닐 거야.',
          '그러니까 예쁘게 하고 나와. 누나한테 어울리는 데는 내가 다 알아봤거든.',
        ],
      },
    },
    story: `11월의 아침은 생각보다 조용했다.

창문 사이로 들어오는 희미한 빛이 방 안을 천천히 채우고 있었다. 아직 잠에서 완전히 깨어나지 못한 채 이불 속에 누워 있던 순간, 침대 옆 휴대전화가 짧게 진동했다.

화면에는 익숙한 이름이 떠 있었다. 사쿠야. 지유보다 한 살 어린, 그런데 이상하게도 지유를 먼저 챙기는 사람.

자정이 지난 뒤에도 연락이 없었던 것은 아니었다. 하지만 아침에 눈을 뜨자마자 가장 먼저 확인한 사람이 그라는 사실은 여전히 기분 좋은 일이었다.

[사쿠야] 누나, 생일 축하해 ♡ 일어났어?
오늘은 진짜 내가 하루 종일 데리고 다닐 거야.

[사쿠야] 그러니까 예쁘게 하고 나와.
누나한테 어울리는 데는 내가 다 알아봤거든.

평소보다 들뜬 말투였다. 무엇을 준비했는지 물어보고 싶었지만, 그는 쉽게 알려줄 생각이 없어 보였다.

오늘 하루가 어떻게 흘러갈지 아직은 알 수 없었다. 다만 한 가지는 분명했다. 오늘은 사쿠야와 함께 보내는, 지유의 생일이었다.`,
    choices: [
      {
        text: '아침부터 이렇게 설레게 하면 어떡해.',
        result: '사쿠야가 웃으며 "누나, 오늘은 아직 시작도 안 했어"라고 답한다.',
        affectionDelta: 3,
      },
      {
        text: '뭐 준비했는지 미리 알려주면 안 돼?',
        result: '절대 안 된다며 "누나는 그냥 따라오기만 해"라고 대답한다.',
        affectionDelta: 1,
      },
      {
        text: '나도 보고 싶었어. 빨리 만나자.',
        result: '사쿠야가 "나도, 누나"라며 자기도 보고 싶었다고 답한다.',
        affectionDelta: 5,
      },
    ],
    memory: '생일 아침, 사쿠야에게 받은 첫 번째 축하 메시지.',
  },
  {
    id: 2,
    time: '09:00',
    label: 'GETTING READY',
    tag: 'PREPARATION',
    title: '준비하는 시간 — 오늘은 조금 특별하게',
    place: '지유의 방',
    coverImage: SAKUYA_PHOTOS.readySelfie,
    story: `옷장 문을 열어 놓은 채 한참을 고민했다. 평소라면 크게 신경 쓰지 않았을 선택이었다.

하지만 오늘은 조금 달랐다. 사쿠야를 만나는 날이라는 사실만으로도 평소에 입던 옷들이 어딘가 부족하게 느껴졌다.

몇 번이나 옷을 갈아입고 나서야 마음에 드는 조합을 찾았다. 거울 앞에 서서 머리를 정리하던 중 휴대전화가 다시 울렸다.

[사쿠야] 누나, 아직 준비 중이야? 나 거의 다 했는데.

잠시 뒤 사진 한 장이 도착했다. 외출할 준비를 마친 사쿠야의 셀카였다. 코트 깃을 세우고, 장난스럽게 브이를 그린 손.

[사쿠야] 누나, 어때. 오늘 나도 좀 괜찮지?

그런 메시지를 보내 놓고는 답장을 기다리는 듯했다. 오늘만큼은, 한 살 어린 그에게 예쁘다는 말을 듣고 싶었다.`,
    choices: [
      {
        text: '오늘 엄청 잘생겼는데?',
        result: '사쿠야가 기분 좋아진 듯 "누나가 그렇게 말해 주니까 좋다"며 셀카를 하나 더 보낸다.',
        affectionDelta: 4,
      },
      {
        text: '나도 사진 보내줄까?',
        result: '사쿠야가 당연히 보내달라며 재촉한다. "누나 얼굴 보고 싶어."',
        affectionDelta: 3,
      },
      {
        text: '직접 보면 알려줄게.',
        result: '사쿠야가 "그럼 빨리 만나야겠다"며 답한다.',
        affectionDelta: 2,
      },
    ],
    memory: '서로의 외출 준비 사진을 주고받은 오전.',
  },
  {
    id: 3,
    time: '09:50',
    label: 'FIRST MEETING',
    tag: 'SPECIAL',
    title: '첫 만남 — 꽃다발을 든 사쿠야',
    place: '약속 장소 앞',
    coverImage: SAKUYA_PHOTOS.bouquet,
    story: `약속 장소에 도착했을 때, 사쿠야는 이미 그곳에 와 있었다.

한 손에는 휴대전화가 들려 있었고 다른 손에는 포장된 꽃다발이 들려 있었다. 화면을 내려다보던 그는 다가오는 기척에 고개를 들었다.

그리고 잠시 멈췄다. "누나, 왔어?" 평소와 다를 것 없는 목소리였다. 다만 입가에 번지는 웃음은 조금 달랐다.

그는 천천히 다가와 꽃다발을 건넸다. "누나, 생일 축하해."

고맙다고 말하자 사쿠야는 한동안 대답 없이 얼굴을 바라봤다. "누나, 오늘 진짜 예쁘다. 아니, 원래 예뻤나."

그런 말을 아무렇지 않게 하는 사람이었다. 한 살 어린 남자에게 서로를 바라보는 사람만 쉽게 대답하지 못하게 만드는.

사쿠야는 머리카락을 가볍게 정리해 주며 자연스럽게 손을 내밀었다. "누나, 우리 이제 갈까?"`,
    choices: [
      {
        text: '꽃다발을 안고 그를 먼저 안아준다.',
        result: '사쿠야가 "누나…" 하고 작게 웃으며 한동안 포옹을 풀지 않는다.',
        affectionDelta: 5,
      },
      {
        text: '오늘 나 예뻐? 얼마나?',
        result: '사쿠야가 가까이 다가와 "누나, 말로는 부족해"라며 다시 한번 예쁘다고 말한다.',
        affectionDelta: 3,
      },
      {
        text: '꽃 너무 예쁘다. 고마워.',
        result: '사쿠야가 꽃을 고르느라 고민했던 이야기를 들려준다. "누나 좋아하는 색으로 맞췄어."',
        affectionDelta: 2,
      },
    ],
    memory: '사쿠야에게 처음 받은 꽃다발과 첫 포옹.',
  },
  {
    id: 4,
    time: '10:20',
    label: 'BRUNCH DATE',
    tag: 'DATE',
    title: '브런치 — 나란히 앉은 두 사람',
    place: '도쿄의 작은 브런치 카페',
    coverImage: SAKUYA_PHOTOS.brunchPastry,
    // 첫 장면(카페에 들어서는 대목)은 햇살 들어오는 카페 실내, 초코빵 장면은 그대로 둔다
    slideImages: { 0: SAKUYA_PHOTOS.cafeSunlight },
    story: `카페는 큰길에서 조금 벗어난 곳에 있었다. 유리창 너머로 들어오는 햇빛이 테이블 위에 길게 놓여 있었다.

사쿠야는 미리 예약해 둔 창가 자리로 안내했다. 메뉴를 고르는 동안 그는 취향을 먼저 물었다. "누나, 먹고 싶은 거 있어?"

주문한 음식이 도착하고 나서야 둘 사이에 대화가 이어졌다. 최근에 보고 싶었던 영화, 서로의 사소한 일상.

사쿠야는 이야기를 듣다가 초코가 묻은 빵을 집어 들고 한 입 베어 물었다. 그러고는 접시를 지유 쪽으로 밀며 웃었다. "누나, 이거 진짜 맛있어. 한 입 먹어 봐."

받아먹자 그는 만족스러운 표정을 지었다. "맛있지? 누나 입에 맞았으면 좋겠는데."

특별한 장소에 와 있어서가 아니라, 특별하지 않은 순간에도 함께 있다는 사실이 좋았다.`,
    choices: [
      {
        text: '사쿠야에게도 음식을 먹여준다.',
        result: '사쿠야가 "누나가 주는 거면 뭐든지"라며 웃고, 다음 것도 달라고 한다.',
        affectionDelta: 4,
      },
      {
        text: '오늘 예약하느라 고생했겠다.',
        result: '사쿠야가 "누나랑 보내는 날인데 당연하지"라고 말한다.',
        affectionDelta: 5,
      },
      {
        text: '음식보다 네 얼굴이 더 잘 보이는데.',
        result: '사쿠야가 잠시 말을 잃었다가, 고개를 숙이고 웃는다.',
        affectionDelta: 3,
      },
    ],
    memory: '창가 자리에서 함께 먹은 브런치.',
  },
  {
    id: 5,
    time: '11:30',
    label: 'PHOTO TIME',
    tag: 'MEMORY',
    title: '사진관 — 오늘을 기록하기',
    place: '도쿄의 즉석사진관',
    coverImage: SAKUYA_PHOTOS.photobooth,
    // 폰케이스 사진은 '사진을 휴대전화 케이스에 넣는다'를 골랐을 때의 결과 화면에만 나온다
    choiceImages: { 0: SAKUYA_PHOTOS.phoneCase },
    story: `카페를 나와 걷던 중 사쿠야가 사진관을 발견했다. "누나, 우리 이거 찍을까?"

기계 안으로 들어가자 사쿠야는 화면에 표시된 포즈를 하나씩 살펴봤다. 첫 번째 사진은 무난했다.

두 번째 사진에서는 사쿠야가 갑자기 얼굴을 가까이 가져왔다. 세 번째에서는 장난스럽게 웃었고, 마지막에서는 서로를 바라봤다.

사진이 출력되는 동안 사쿠야는 화면을 유심히 들여다봤다. "누나, 이거 잘 나왔다. 진짜."

그는 사진 두 장을 나란히 들어 보여 주고는 한 장을 건넸다. "이건 누나가 가져. 나는 이걸로." 사진 뒷면에는 작은 글씨가 적혀 있었다. 오늘, 누나의 생일. 다음에도 같이 찍자.`,
    choices: [
      {
        text: '사진을 휴대전화 케이스에 넣는다.',
        result: '사쿠야가 그 모습을 보고 기분 좋은 웃음을 짓는다. "누나 그거 안 빼는 거지?"',
        affectionDelta: 5,
      },
      {
        text: '다음에는 더 웃긴 포즈로 찍자.',
        result: '사쿠야가 "다음에는 내가 이길 거야"라며 장난친다.',
        affectionDelta: 2,
      },
      {
        text: '사진을 찍을 때 안아줬어야지.',
        result: '사쿠야가 "누나, 그럼 지금 다시 찍자"며 더 가까이 붙는다.',
        affectionDelta: 4,
      },
    ],
    memory: '둘이 함께 찍은 첫 번째 커플 즉석사진.',
  },
  {
    id: 6,
    time: '12:00',
    label: 'WALK TOGETHER',
    tag: 'DATE',
    title: '거리 산책 — 목적지 없는 데이트',
    place: '도쿄 오모테산도 거리',
    coverImage: SAKUYA_PHOTOS.snowHoodie,
    // 편의점에서 간식을 고르는 장면
    slideImages: { 1: SAKUYA_PHOTOS.konbiniSnack },
    story: `사진관을 나와서는 특별한 목적지 없이 거리를 걸었다.

사람들이 오가는 거리에는 겨울을 준비하는 상점들이 하나둘 모습을 드러내고 있었다.

사쿠야는 걷다가 마음에 드는 가게가 보이면 잠시 멈췄다. 편의점에 들러 간식을 고르기도 했다. "누나, 이거 먹을래?"

걷는 동안 손은 자연스럽게 맞잡혀 있었다. 사람들이 많은 곳에서는 사쿠야가 먼저 손을 잡았고, 걸음을 늦추면 함께 속도를 맞췄다.

"누나, 오늘은 천천히 다녀도 돼. 시간 많으니까." 그 말이 이상하게 마음에 남았다.`,
    choices: [
      {
        text: '손을 더 꽉 잡는다.',
        result: '사쿠야가 맞잡은 손을 내려다보고 작게 웃는다.',
        affectionDelta: 4,
      },
      {
        text: '길거리 간식을 하나 더 사 달라고 한다.',
        result: '사쿠야가 "누나는 원하는 만큼 사야 해"라며 발걸음을 돌린다.',
        affectionDelta: 2,
      },
      {
        text: '오늘 이렇게 같이 걷는 게 제일 좋다.',
        result: '사쿠야가 "나도. 누나랑 걸으면 어디든 좋아"라고 대답한다.',
        affectionDelta: 5,
      },
    ],
    memory: '도쿄 거리를 함께 걸으며 나눠 먹은 간식.',
  },
  {
    id: 7,
    time: '12:40',
    label: 'GAME TIME',
    tag: 'SPECIAL',
    title: '게임 대결 — 소원 하나 들어주기',
    place: '도쿄의 게임센터',
    coverImage: SAKUYA_PHOTOS.konbiniBanana,
    story: `게임센터 안은 생각보다 시끄러웠다. 사쿠야는 입구에 들어서자마자 기계를 둘러보기 시작했다. "누나, 뭐 할래?"

농구 게임부터 리듬 게임까지 여러 기계가 있었지만, 결국 둘이 선택한 것은 인형 뽑기였다.

처음에는 사쿠야가 자신만만했다. 하지만 인형은 생각처럼 쉽게 잡히지 않았다. "누나, 방금 거의 됐는데…"

그 말에 웃음이 터졌다. 결국 누가 먼저 인형을 뽑는지 내기를 하기로 했다. 지는 사람이 소원 하나를 들어주기로.

사쿠야는 다시 동전을 넣었다. "누나, 이번에는 진짜야." 그의 표정은 생각보다 진지했다.`,
    choices: [
      {
        text: '승부욕을 발휘해 반드시 이긴다.',
        result: '사쿠야가 "누나 진짜 잘한다…"라며 예상하지 못한 실력에 놀란다.',
        affectionDelta: 4,
      },
      {
        text: '일부러 사쿠야가 이기게 해준다.',
        result: '사쿠야가 기뻐하며 "그럼 내 소원은 지금 말할게"라며 준비를 한다.',
        affectionDelta: 2,
      },
      {
        text: '같이 인형을 뽑자고 제안한다.',
        result: '사쿠야가 결국 둘이 함께 인형을 잡고, 손을 마주 잡고 웃는다.',
        affectionDelta: 5,
      },
    ],
    memory: '게임센터에서 함께 도전한 인형 뽑기.',
  },
  {
    id: 8,
    time: '13:30',
    label: 'SHOPPING DATE',
    tag: 'DATE',
    title: '쇼핑 — 서로에게 어울리는 것',
    place: '도쿄 백화점',
    coverImage: SAKUYA_PHOTOS.mallShopping,
    story: `점심시간이 조금 지나자 두 사람은 백화점으로 향했다. 옷 매장 진열대 앞에서 사쿠야는 옷걸이를 하나씩 넘겨 보며 진지한 얼굴이었다.

한참을 고르던 그는 잘 어울릴 것 같은 옷을 발견하고는 자연스럽게 꺼내 들며 말했다. "누나, 이거 입어 봐."

피팅룸에서 나온 모습을 본 사쿠야는 고개를 끄덕였다. "봐. 내가 맞았지?"

이어서 향수 매장에 들렀다. 여러 향을 맡아 보던 사쿠야는 마지막에 한 가지 향을 골랐다. "누나, 이거. 누나한테 잘 어울릴 것 같아."

그는 잠시 망설이다가 덧붙였다. "나중에 이 향 맡으면 오늘 생각날 것 같아서."`,
    choices: [
      {
        text: '사쿠야에게도 향수를 골라준다.',
        result: '사쿠야가 향을 맡고는 "이건 누나 냄새네"라며 마음에 들어 한다.',
        affectionDelta: 5,
      },
      {
        text: '그가 고른 옷을 바로 구매한다.',
        result: '사쿠야가 "역시 내 안목은 틀리지 않는다니까"라며 웃는다.',
        affectionDelta: 3,
      },
      {
        text: '커플 아이템을 사자고 제안한다.',
        result: '사쿠야가 "누나, 그건 내가 먼저 말하려고 했는데"라며 흔쾌히 동의한다.',
        affectionDelta: 4,
      },
    ],
    memory: '서로에게 골라 준 향수와 쇼핑 아이템.',
  },
  {
    id: 9,
    time: '14:30',
    label: 'AQUARIUM',
    tag: 'DATE',
    title: '아쿠아리움 — 푸른빛 아래에서',
    place: '도쿄 아쿠아리움',
    coverImage: SAKUYA_PHOTOS.aquariumWatch,
    // 사진을 찍어 주는 장면에서만 폰 카메라 사진을 쓴다
    slideImages: {
      1: SAKUYA_PHOTOS.phoneCamera,
      2: SAKUYA_PHOTOS.phoneCamera,
    },
    story: `아쿠아리움 안은 바깥과 전혀 다른 분위기였다. 천장과 벽을 가득 채운 푸른빛 사이로 물고기들이 천천히 움직이고 있었다.

사쿠야는 수조 앞에서 걸음을 멈췄다. "누나, 이거 봐." 유리 너머로 커다란 물고기 한 마리가 지나갔다.

그는 휴대전화를 꺼내 지유를 화면에 담기 시작했다. 화면 속 얼굴이 어색하게 굳자 사쿠야가 웃었다. "누나, 그렇게 굳으면 안 되지. 한 번만 더."

사진을 확인하던 그는 마음에 드는 컷을 발견한 듯 만족했다. "이거 잘 나왔다. 누나 표정 진짜 예쁘다."

사진을 보려고 다가가자 그는 휴대전화를 조금 높이 들었다. "잠깐. 이건 내가 먼저 볼래."

둘은 대형 수조 앞에 나란히 섰다. 사쿠야가 손을 내밀었고, 그 손을 잡자 그는 아무 말 없이 손가락을 맞물렸다.`,
    choices: [
      {
        text: '수조를 배경으로 함께 사진을 찍는다.',
        result: '사쿠야가 사진을 찍어 바로 배경화면으로 설정한다. "누나, 이건 내 거."',
        affectionDelta: 4,
      },
      {
        text: '사쿠야의 어깨에 기대어 물고기를 본다.',
        result: '사쿠야가 조용히 어깨를 감싸 준다.',
        affectionDelta: 5,
      },
      {
        text: '그가 찍어 준 사진을 달라고 한다.',
        result: '사쿠야가 사진을 여러 장 보내 주며 "제일 잘 나온 건 내가 갖고 있을래"라고 한다.',
        affectionDelta: 2,
      },
    ],
    memory: '푸른 수조 앞에서 서로를 바라본 순간.',
  },
  {
    id: 10,
    time: '15:40',
    label: 'DESSERT CAFE',
    tag: 'REST',
    title: '카페 — 잠깐의 휴식',
    place: '아쿠아리움 근처 디저트 카페',
    coverImage: SAKUYA_VIDEOS.icecreamPoster,
    // 아이스크림을 먹는 장면에서만 영상, 사진을 넘겨보는 장면에서는 사진
    slideVideos: {
      0: SAKUYA_VIDEOS.icecream,
      1: SAKUYA_VIDEOS.icecream,
    },
    slideImages: {
      2: SAKUYA_PHOTOS.cafePhonePhotos,
      3: SAKUYA_PHOTOS.cafePhonePhotos,
    },
    story: `아쿠아리움을 나와 도착한 카페에는 달콤한 디저트 향이 가득했다. 둘은 창가에 앉아 아이스크림과 음료를 주문했다.

아이스크림이 나오자 사쿠야는 자기 컵에서 한 숟갈을 떠서 지유 쪽으로 내밀었다. "누나, 이거 진짜 맛있어. 한 입만."

받아먹는 사이 그는 계속 웃고 있었다. "누나가 맛있게 먹는 거 보는 게 제일 좋아."

사쿠야는 휴대전화를 꺼내 오전에 찍었던 사진들을 하나씩 넘겨 봤다. "누나, 이거 기억나? 이때 표정 진짜 웃겼어."

다른 사진을 보여 주자 이번에는 그가 민망한 듯 웃었다. "그건 보내지 마." "왜?" "그냥."

그런 사소한 장난이 계속됐다. 카페 밖으로는 사람들이 천천히 지나가고 있었다.

사쿠야는 컵을 내려놓고 바라봤다. "누나, 오늘 어때?" 그 질문에는 단순한 안부 이상의 의미가 담겨 있는 것 같았다.`,
    choices: [
      {
        text: '오늘 진짜 행복해.',
        result: '사쿠야가 "나도. 누나 생일이라서 더 좋아"라며 웃는다.',
        affectionDelta: 5,
      },
      {
        text: '아직 더 놀고 싶어.',
        result: '사쿠야가 "그럼 오늘은 늦게까지 같이 있자"고 한다.',
        affectionDelta: 3,
      },
      {
        text: '네가 준비해 준 거라서 다 좋아.',
        result: '사쿠야가 잠시 부끄러워하며 시선을 피한다.',
        affectionDelta: 4,
      },
    ],
    memory: '디저트 카페에서 함께 확인한 오늘의 사진들.',
  },
  {
    id: 11,
    time: '16:30',
    label: 'HANDWRITTEN LETTER',
    tag: 'SECRET',
    title: '공원 — 사쿠야가 준비한 편지',
    place: '도쿄의 한적한 공원',
    coverImage: SAKUYA_PHOTOS.heartGummy,
    // 봉투를 꺼내는 장면 · 편지 마지막 문장 장면(손편지 사진은 그 사이 장면에 유지)
    slideImages: {
      0: SAKUYA_PHOTOS.parkEnvelopeNight,
      1: SAKUYA_PHOTOS.handwrittenLetter,
      2: SAKUYA_PHOTOS.parkLetterNight,
    },
    story: `카페를 나왔을 때 햇빛은 조금씩 기울고 있었다. 사쿠야는 근처의 한적한 공원으로 데려갔다.

잠시 앉아 있던 사쿠야가 가방을 열었다. "누나, 이거." 작은 봉투 하나를 꺼냈다. 평소와 달리 조심스러운 표정이었다. "읽어 봐."

봉투 안에는 손으로 쓴 편지가 들어 있었다. 사소한 기억들, 함께 웃었던 날들, 별것 아닌 대화까지도 기억하고 있다는 이야기.

편지의 마지막에는 이런 문장이 적혀 있었다.
누나가 태어나서 다행이라고 생각해. 그래서 내가 누나를 만날 수 있었으니까.

편지를 다 읽었을 때 사쿠야는 조용히 바라보고 있었다. "누나, 마음에 들어?" 대답을 기다리는 표정이었다.`,
    choices: [
      {
        text: '편지를 읽고 그를 꼭 안아준다.',
        result: '사쿠야가 등을 천천히 쓸어 주며 안아준다. "누나, 나 아직 조금 떨려."',
        affectionDelta: 5,
      },
      {
        text: '편지를 소중히 접어 가방에 넣는다.',
        result: '사쿠야가 "누나, 꼭 잃어버리지 말아야 해"라고 당부한다.',
        affectionDelta: 4,
      },
      {
        text: '왜 이렇게 감동적으로 써 놓고 아무렇지 않은 척해?',
        result: '사쿠야가 웃으며 "사실 엄청 떨렸어, 누나"라고 고백한다.',
        affectionDelta: 3,
      },
    ],
    memory: '사쿠야가 직접 써 준 생일 편지.',
  },
  {
    id: 12,
    time: '17:00',
    label: 'GOLDEN HOUR',
    tag: 'ROMANCE',
    title: '노을 산책 — 조금 솔직해지는 시간',
    place: '공원 산책로',
    coverImage: SAKUYA_PHOTOS.nightWalk,
    story: `공원을 나서자 하늘의 색이 조금씩 변하고 있었다. 11월의 해는 생각보다 빠르게 기울었다.

두 사람은 나란히 걸었다. 사쿠야는 아까보다 말수가 조금 줄어 있었다. 그렇다고 어색한 침묵은 아니었다.

그는 손을 잡은 채 가끔씩 걸음을 늦췄다. "누나, 우리 처음 만났을 때 기억나?" 그리고 혼잣말처럼 덧붙였다. "빼빼로데이에 내가 고백하길 잘했어. 그때 용기 안 냈으면 지금 이렇게 걷지도 못했을 텐데."

사쿠야는 그날의 사소한 일들을 이야기했다. 처음 나눴던 대화, 서로 어색하게 웃었던 순간, 오래 이어졌던 연락.

"그때는 이렇게 될 줄 몰랐는데." 그가 웃었다. "지금은 누나가 없으면 좀 이상할 것 같아."`,
    choices: [
      {
        text: '나도 네가 없는 건 상상하기 싫어.',
        result: '사쿠야가 손을 더 꽉 잡는다.',
        affectionDelta: 5,
      },
      {
        text: '처음부터 좋아했어?',
        result: '사쿠야가 "처음부터 누나만 신경 쓰였어"라며 이야기한다.',
        affectionDelta: 3,
      },
      {
        text: '앞으로도 계속 같이 있자.',
        result: '사쿠야가 당연하다는 듯 고개를 끄덕인다. "그건 내가 할 말인데."',
        affectionDelta: 4,
      },
    ],
    memory: '노을 아래에서 나눈 첫 만남에 관한 이야기.',
  },
  {
    id: 13,
    time: '17:40',
    label: 'ON THE WAY',
    tag: 'MYSTERY',
    title: '이동하는 차 안 — 작은 비밀',
    place: '도쿄의 이동 중인 택시',
    coverImage: SAKUYA_PHOTOS.yukataPhone,
    // "사쿠야는 택시를 잡았다" 장면에 밤 택시 실내 사진
    slideImages: { 0: SAKUYA_PHOTOS.taxiNight },
    story: `공원을 나선 뒤 사쿠야는 택시를 잡았다. 어디로 가는지 묻자 그는 목적지를 알려주지 않았다. "누나, 조금만 더 비밀로 해."

창밖으로 도쿄의 풍경이 지나갔다. 사쿠야는 휴대전화로 예약 확인 메시지를 확인하고 있었다.

"뭐야, 그렇게 궁금해?" 그가 화면을 끄며 물었다. 대답 대신 고개를 끄덕이자 사쿠야는 웃었다.

"조금만 기다려." 그는 손을 잡았다. "누나, 오늘 아직 안 끝났어." 그 말이 마음을 조금 더 들뜨게 만들었다.`,
    choices: [
      {
        text: '어디 가는지 계속 물어본다.',
        result: '사쿠야가 "누나, 절대 안 알려줄 거야"라며 웃는다.',
        affectionDelta: 2,
      },
      {
        text: '그냥 사쿠야에게 기대어 있는다.',
        result: '사쿠야가 어깨를 내어 주고, 조용히 머리를 기대어 온다.',
        affectionDelta: 5,
      },
      {
        text: '오늘 준비한 게 또 있어?',
        result: '사쿠야가 "하나 더 있어. 누나가 좋아할 거야"라고 대답한다.',
        affectionDelta: 3,
      },
    ],
    memory: '목적지를 알려주지 않았던 택시 안의 시간.',
  },
  {
    id: 14,
    time: '18:30',
    label: 'BIRTHDAY DINNER',
    tag: 'SPECIAL',
    title: '저녁 식사 — 예약해 둔 자리',
    place: '도쿄의 분위기 좋은 레스토랑',
    coverImage: SAKUYA_PHOTOS.dinnerTable,
    story: `택시가 멈춘 곳은 조용한 분위기의 레스토랑이었다. 창가 쪽에는 두 사람을 위한 자리가 마련되어 있었다.

테이블 위에는 촛불과 장미가 놓여 있었다. 사쿠야는 의자를 빼 주었다. "누나, 여기 앉아."

음식을 기다리는 동안 둘은 오늘 있었던 일들을 다시 이야기했다. 하루가 길었던 만큼 이야기도 많았다.

사쿠야는 좋아하는 음식을 먼저 골랐다. "누나, 이거 좋아하잖아." 그런 사소한 취향을 기억하고 있다는 사실이 새삼스러웠다.

음식이 나오고 잔을 부딪쳤다. "누나, 생일 축하해. 누나가 태어나 줘서 고마워."`,
    choices: [
      {
        text: '잔을 부딪치며 고맙다고 말한다.',
        result: '사쿠야가 환하게 웃는다.',
        affectionDelta: 4,
      },
      {
        text: '사쿠야 덕분에 최고의 생일이라고 말한다.',
        result: '그가 "누나, 그 말 들으려고 준비한 거야"라며 보람 있어 한다.',
        affectionDelta: 5,
      },
      {
        text: '내년에도 이렇게 해 줄 거야?',
        result: '사쿠야가 "내년에는 더 잘할 거야. 누나 생일이니까"라며 약속한다.',
        affectionDelta: 3,
      },
    ],
    memory: '사쿠야가 예약한 레스토랑에서 함께한 생일 저녁.',
  },
  {
    id: 15,
    time: '19:40',
    label: 'SURPRISE PARTY',
    tag: 'SPECIAL EVENT',
    title: '서프라이즈 — 아직 끝나지 않은 생일',
    place: '예약된 프라이빗 공간',
    coverImage: SAKUYA_VIDEOS.cakeCandlePoster,
    video: SAKUYA_VIDEOS.cakeCandle,
    story: `식사를 마친 뒤 사쿠야는 손을 내밀었다. "누나, 이쪽으로 와."

문이 열리자 작은 공간이 모습을 드러냈다. 은은한 조명 아래 꽃과 풍선이 놓여 있었고, 테이블 중앙에는 케이크가 준비되어 있었다.

잠시 말을 잇지 못하자 사쿠야는 웃었다. "누나, 놀랐어?"

그는 케이크 앞으로 다가가 초에 불을 붙였다. 작은 불빛들이 흔들렸다. "누나, 소원 빌어. 무슨 소원 빌었는지는 나중에 알려줘."

지유가 초를 끄자 사쿠야가 박수를 쳤다. 그는 생일 축하 노래를 부르기 시작했다. 오늘만큼은 그 목소리가 유난히 가까이 들렸다.`,
    choices: [
      {
        text: '눈을 감고 진심으로 소원을 빈다.',
        result: '사쿠야가 조용히 그 모습을 바라본다. "누나, 소원은 비밀로 해도 돼."',
        affectionDelta: 5,
      },
      {
        text: '촛불을 끄기 전에 사쿠야를 바라본다.',
        result: '사쿠야가 웃으며 "누나, 얼른 소원 빌어"라고 재촉한다.',
        affectionDelta: 4,
      },
      {
        text: '소원은 사쿠야와 관련된 거라고 말한다.',
        result: '사쿠야가 "누나… 그건 반칙이지"라며 궁금해한다.',
        affectionDelta: 3,
      },
    ],
    memory: '사쿠야가 준비한 서프라이즈 생일 케이크와 초를 끄던 순간.',
  },
  {
    id: 16,
    time: '20:20',
    label: 'THE PRESENT',
    tag: 'GIFT',
    title: '선물 — 네가 좋아할 것 같아서',
    place: '프라이빗 룸',
    coverImage: SAKUYA_PHOTOS.bouquet,
    // 두 번째 손편지가 나오는 장면에 마지막 사진
    slideImages: { 1: SAKUYA_PHOTOS.secondLetterNote },
    story: `케이크를 나눠 먹고 난 뒤 사쿠야는 리본이 단정하게 묶인 작은 상자를 꺼냈다. "누나, 이것도 있어."

상자 안에는 평소에 관심을 보였던 물건이 들어 있었다. "전에 누나가 예쁘다고 했잖아." 그는 그런 말을 기억하고 있었다.

선물 상자 아래에는 짧은 손편지가 하나 더 들어 있었다.

오늘 하루를 준비하면서 누나가 좋아하는 표정을 몇 번이나 상상했어. 그리고 지금 그 표정을 보고 있으니까 기분이 좋아.

사쿠야는 조용히 말했다. "누나, 마음에 들었으면 좋겠다."`,
    choices: [
      {
        text: '선물을 꼭 안고 고맙다고 말한다.',
        result: '사쿠야가 만족스러운 표정으로 웃는다.',
        affectionDelta: 5,
      },
      {
        text: '언제부터 준비했는지 묻는다.',
        result: '사쿠야가 "꽤 오래전부터. 누나 생일 너무 많이 기다렸어"라고 말한다.',
        affectionDelta: 4,
      },
      {
        text: '사쿠야가 준 거라서 뭐든 좋아.',
        result: '사쿠야가 장난스럽게 "그럼 다음에도 기대해, 누나"라고 한다.',
        affectionDelta: 3,
      },
    ],
    memory: '생일 메인 선물과 두 번째 손편지.',
  },
  {
    id: 17,
    time: '21:00',
    label: 'NIGHT VIEW',
    tag: 'ROMANCE',
    title: '야경 — 오늘의 마지막 목적지',
    place: '도쿄 야경 명소',
    coverImage: SAKUYA_PHOTOS.nightIllumination,
    story: `밖으로 나왔을 때 도쿄의 하늘은 완전히 어두워져 있었다. 반짝이는 거리 불빛이 한눈에 들어왔다.

사쿠야는 옆에 서 있었다. "누나, 예쁘지?"

그는 야경을 바라보다가 시선을 돌렸다. "근데 나는 다른 게 더 예쁜데."

장난스럽게 말하는 듯했지만 눈빛은 진지했다. 그는 손을 잡았다.

오전의 꽃다발부터 저녁의 케이크까지, 휴대전화 속 사진들을 한 장씩 넘겨 보며 그가 말했다. "누나, 오늘 진짜 빨리 갔다."`,
    choices: [
      {
        text: '사쿠야의 어깨에 기대어 야경을 본다.',
        result: '그가 지유의 어깨를 감싸 안는다.',
        affectionDelta: 5,
      },
      {
        text: '오늘 사진을 함께 다시 본다.',
        result: '둘이 사진을 보며 한참 웃는다. "누나, 이 사진은 내가 저장해야겠다."',
        affectionDelta: 3,
      },
      {
        text: '조금만 더 여기 있자고 말한다.',
        result: '사쿠야가 "누나, 그럼 천천히 더 걷자"고 한다.',
        affectionDelta: 4,
      },
    ],
    memory: '도쿄의 야경을 함께 바라본 밤.',
  },
  {
    id: 18,
    time: '21:40',
    label: 'JUST US',
    tag: 'INTIMATE',
    title: '둘만의 시간 — 조금 더 솔직하게',
    place: '야경이 보이는 조용한 공간',
    coverImage: SAKUYA_PHOTOS.nightCloseSmile,
    story: `두 사람은 조금 더 조용한 곳으로 자리를 옮겼다. 사쿠야는 손을 잡고 한동안 서 있었다. "누나, 오늘 어땠어?"

"나 사실 오늘 엄청 기대했거든. 누나 생일이니까 기억에 남는 하루를 만들어 주고 싶었어."

그는 손가락을 맞물렸다. "근데 생각보다 내가 더 좋았던 것 같아. 누나가 좋아하는 거 보는 게 좋더라."

잠깐의 침묵이 흘렀다. "앞으로도 이렇게 같이 보내자. 누나 생일도, 그냥 평범한 날도."

그의 목소리는 낮고 차분했다. 서로의 마음을 확인하듯 천천히 이어지는 시간이었다.`,
    choices: [
      {
        text: '나도 앞으로 계속 네 옆에 있을게.',
        result: '사쿠야가 미소를 지으며 지유를 안아준다.',
        affectionDelta: 5,
      },
      {
        text: '사쿠야를 먼저 끌어안는다.',
        result: '그가 지유를 꼭 안아 준다. "누나, 고마워."',
        affectionDelta: 4,
      },
      {
        text: '내년 생일도 기대해도 되지?',
        result: '사쿠야가 "내년에는 더 멋진 하루로 준비할게, 누나"라고 한다.',
        affectionDelta: 3,
      },
    ],
    memory: '야경 아래에서 나눈 서로의 진심.',
  },
  {
    id: 19,
    time: '22:30',
    label: 'GOING HOME',
    tag: 'GOOD NIGHT',
    title: '돌아가는 길 — 하루가 끝나지 않았으면 해서',
    place: '도쿄의 밤거리',
    coverImage: SAKUYA_PHOTOS.yukataDoor,
    story: `시간이 조금 더 흐르고 나서야 돌아갈 준비를 했다. 사쿠야는 오늘 받은 꽃다발과 선물을 챙겨 주었다. "누나, 이거 놓고 가면 안 돼."

택시 안에서는 대화가 줄었다. 피곤함이 조금씩 밀려오고 있었다.

사쿠야는 손을 잡은 채 창밖을 바라봤다. "누나, 오늘 많이 걸었지. 발 안 아파?"

택시 창문 너머로 도쿄의 밤거리가 지나갔다. 하루가 끝나가는 것이 아쉬웠지만, 사쿠야는 손을 놓지 않았다.`,
    choices: [
      {
        text: '그의 어깨에 기대어 눈을 감는다.',
        result: '사쿠야가 조용히 손을 잡아 준다.',
        affectionDelta: 5,
      },
      {
        text: '오늘 너무 행복했다고 이야기한다.',
        result: '사쿠야가 "내일도 행복하게 해 줄게, 누나"라고 한다.',
        affectionDelta: 4,
      },
      {
        text: '집에 가기 싫다고 장난스럽게 말한다.',
        result: '사쿠야가 "나도야, 누나"라며 웃는다.',
        affectionDelta: 3,
      },
    ],
    memory: '집으로 돌아가는 택시 안에서 나눈 대화.',
  },
  {
    id: 20,
    time: '23:10',
    label: 'LAST HUG',
    tag: 'GOODBYE',
    title: '집 앞 — 마지막 인사',
    place: '지유의 집 앞',
    coverImage: SAKUYA_PHOTOS.appleJuice2Cut,
    story: `택시에서 내렸을 때는 밤이 깊어 있었다. 사쿠야는 집 앞까지 함께 걸어왔다. "누나, 오늘 고생했어."

하루 종일 함께 있었는데도 이제야 헤어지는 것이 조금 이상했다.

"누나, 들어가면 연락해." 짧은 포옹이었다. 하지만 쉽게 떨어지지는 않았다.

그는 머리카락을 한 번 쓸어 주었다. "누나, 오늘 예뻤어. 생일 축하해. 다시 한번."

마지막으로 입맞춤을 하고 나서야 한 걸음 물러섰고, 집으로 들어가는 모습을 한동안 지켜보았다.`,
    choices: [
      {
        text: '마지막으로 한 번 더 안아 달라고 한다.',
        result: '사쿠야가 웃으며 다시 품에 안아 준다. "누나, 나도 아쉬워."',
        affectionDelta: 5,
      },
      {
        text: '사쿠야에게 먼저 입맞춤한다.',
        result: '그가 놀랐다가 기분 좋게 웃는다.',
        affectionDelta: 4,
      },
      {
        text: '집에 도착하면 바로 전화하겠다고 약속한다.',
        result: '사쿠야가 "누나, 기다리고 있을게"라고 말한다.',
        affectionDelta: 3,
      },
    ],
    memory: '집 앞에서 나눈 마지막 포옹.',
  },
  {
    id: 21,
    time: '23:40',
    label: 'PRIVATE MESSAGE',
    tag: 'CHAT',
    title: '카카오톡 — 집에 도착했어?',
    place: '지유의 방',
    coverImage: SAKUYA_PHOTOS.yukataPhone,
    story: `집에 들어온 뒤 꽃다발과 선물, 편지를 나란히 놓았다. 휴대전화가 진동했다.

[사쿠야] 누나, 집 도착했어? 오늘 재밌었지? 나 아직도 오늘 사진 보고 있어 ㅋㅋ

잠시 뒤 사진이 여러 장 도착했다. 즉석사진, 아쿠아리움, 저녁 식사, 그리고 야경 아래 두 사람의 사진까지.

[사쿠야] 누나, 이거 내일도 보고 싶을 것 같아.

그는 오늘이 끝나가는 것을 아쉬워하는 듯했다. 아직 하지 못한 말이 남아 있었다.`,
    choices: [
      {
        text: '오늘 하루 만들어 줘서 정말 고마워.',
        result: '사쿠야가 "누나가 행복했으면 그걸로 됐어"라고 답한다.',
        affectionDelta: 5,
      },
      {
        text: '사진 더 보내 줘. 다 저장할래.',
        result: '사쿠야가 사진을 더 보내 준다. "누나, 이건 방금 골랐어."',
        affectionDelta: 3,
      },
      {
        text: '벌써 보고 싶어.',
        result: '사쿠야가 "나도, 누나"라며 곧바로 전화를 걸어온다.',
        affectionDelta: 4,
      },
    ],
    memory: '집에 돌아온 뒤 사쿠야와 주고받은 메시지.',
  },
  {
    id: 22,
    time: '23:59',
    label: 'THE END',
    tag: 'FINAL',
    title: '오늘의 마지막 1분 — 늦은 밤의 영상통화',
    place: '지유의 방',
    coverImage: SAKUYA_PHOTOS.facetimeCall,
    story: `방 안은 조용했다. 테이블 위에는 꽃다발과 선물 상자, 편지가 나란히 놓여 있었다.

데이트를 마치고 헤어진 뒤, 각자 집에 들어간 밤이었다. 이불 속에 누워 있던 지유의 휴대전화가 울렸다. 사쿠야의 영상통화였다.

화면 속 사쿠야는 이미 이불을 턱까지 끌어올리고 누워 있었다. 목소리가 평소보다 조금 낮았다.

[사쿠야] 누나, 잘 들어갔어?
오늘 진짜 재밌었다. 누나 생일이라서 더 좋았어.

[사쿠야] 누나, 오늘 하루 어땠어? 나는 아직 안 끝난 것 같아.
자고 일어나면 또 누나 생각할 거야, 아마.

[사쿠야] 누나, 생일 축하해. 오늘 태어나 줘서 고마워.
잘 자. 내일 또 연락할게 ♡

통화를 끊은 뒤에도 한동안 화면이 아른거렸다. 하루라는 시간은 짧았지만, 그 안에는 평소보다 훨씬 많은 기억이 담겨 있었다.

생일은 끝났지만 오늘의 기억은 끝나지 않았다. A DAY WITH SAKUYA · HAPPY BIRTHDAY JIYU ♡`,
    choices: [
      {
        text: '오늘 하루를 다시 떠올린다.',
        result: '오늘의 모든 순간이 추억 앨범에 기록된다.',
        affectionDelta: 5,
      },
      {
        text: '사쿠야에게 마지막 메시지를 보낸다.',
        result: '사쿠야가 "누나, 나 아직 안 자고 있었어"라며 잠들기 전 마지막 답장을 보낸다.',
        affectionDelta: 4,
      },
      {
        text: '사진과 편지를 소중히 보관한다.',
        result: '오늘의 추억 앨범이 완성된다.',
        affectionDelta: 3,
      },
    ],
    memory: '헤어지고 늦은 밤 나눈 영상통화, 그리고 지유의 생일 마지막 1분.',
  },
];

export const STORY_CHAPTERS: StoryChapter[] = RAW_CHAPTERS.map((ch) => ({
  ...ch,
  slides: buildSlides(ch.story, ch.coverImage).map((slide, index) => {
    const override = ch.slideImages?.[index];
    const scene = ch.slideScenes?.[index];
    if (!override && !scene) return slide;
    return {
      ...slide,
      ...(override ? { image: override } : {}),
      ...(scene ? { scene } : {}),
    };
  }),
}));

export const INITIAL_PHOTOS: PhotoMemory[] = [
  {
    id: 'ph-1',
    title: '꽃다발을 든 사쿠야',
    location: '약속 장소 앞',
    time: '09:50',
    caption: '누나, 생일 축하해. 오늘 진짜 예쁘다.',
    imageUrl: SAKUYA_PHOTOS.bouquet,
    liked: true,
  },
  {
    id: 'ph-2',
    title: '브런치 카페의 초코빵',
    location: '도쿄 브런치 카페',
    time: '10:20',
    caption: '누나, 이거 진짜 맛있어. 한 입 먹어 봐.',
    imageUrl: SAKUYA_PHOTOS.brunchPastry,
    liked: true,
  },
  {
    id: 'ph-3',
    title: '즉석사진 네 컷',
    location: '도쿄 즉석사진관',
    time: '11:30',
    caption: '오늘, 누나의 생일. 다음에도 같이 찍자.',
    imageUrl: SAKUYA_PHOTOS.photobooth,
    liked: true,
  },
  {
    id: 'ph-4',
    title: '아이스크림 먹으며 웃던 오후',
    location: '디저트 카페',
    time: '15:40',
    caption: '누나가 맛있게 먹는 거 보는 게 제일 좋아.',
    imageUrl: SAKUYA_VIDEOS.icecreamPoster,
    liked: true,
  },
  {
    id: 'ph-5',
    title: '아침 준비 셀카',
    location: '출발 전',
    time: '09:00',
    caption: '누나, 어때. 오늘 나도 좀 괜찮지?',
    imageUrl: SAKUYA_PHOTOS.readySelfie,
    liked: true,
  },
  {
    id: 'ph-6',
    title: '촛불 앞에서',
    location: '프라이빗 룸',
    time: '19:40',
    caption: '누나, 소원 빌어. 무슨 소원인지는 나중에 알려줘.',
    imageUrl: SAKUYA_VIDEOS.cakeCandlePoster,
    liked: true,
  },
  {
    id: 'ph-7',
    title: '하트 젤리 하나',
    location: '도쿄 공원',
    time: '16:30',
    caption: '누나가 태어나서 다행이라고 생각해.',
    imageUrl: SAKUYA_PHOTOS.heartGummy,
    liked: true,
  },
  {
    id: 'ph-8',
    title: '오늘의 마지막 컷',
    location: '2026.11.18',
    time: '23:59',
    caption: '잘 자, 누나. 내일 또 연락할게.',
    imageUrl: SAKUYA_PHOTOS.facetimeCall,
    liked: true,
  },
];

export const DATE_EVENTS: DateEvent[] = [
  {
    id: 'ev1',
    time: '09:50',
    title: '꽃다발을 든 사쿠야와 첫 만남',
    place: '약속 장소 앞',
    color: 'bg-rose-400',
    chapterIndex: 2,
    note: '누나 생일 꽃다발 & 첫 포옹',
  },
  {
    id: 'ev2',
    time: '10:20',
    title: '창가 브런치 데이트',
    place: '도쿄의 작은 브런치 카페',
    color: 'bg-sky-500',
    chapterIndex: 3,
    note: '미리 예약해 둔 창가 자리',
  },
  {
    id: 'ev3',
    time: '14:30',
    title: '아쿠아리움 · 푸른빛 아래',
    place: '도쿄 아쿠아리움',
    color: 'bg-blue-500',
    chapterIndex: 8,
    note: '대형 수조 앞 사진 & 손잡기',
  },
  {
    id: 'ev4',
    time: '21:00',
    title: '도쿄 야경 명소',
    place: '도쿄 야경 거리',
    color: 'bg-amber-400',
    chapterIndex: 16,
    note: '불빛 아래 둘만의 시간',
  },
];

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 't1',
    title: 'A Day With Sakuya',
    artist: 'November Tokyo Mix',
    album: '11.18 Jiyu Birthday',
    durationSec: 198,
    coverImage: SAKUYA_PHOTOS.heartGummy,
    notes: [523.25, 659.25, 783.99, 987.77],
  },
  {
    id: 't2',
    title: 'Omotesando Walk',
    artist: 'Autumn Tokyo',
    album: 'Afternoon Date',
    durationSec: 214,
    coverImage: SAKUYA_PHOTOS.matchaDessert,
    notes: [440, 554.37, 659.25, 880],
  },
  {
    id: 't3',
    title: 'Midnight Illumination',
    artist: '23:59 Private Room',
    album: 'Happy Birthday ♡',
    durationSec: 184,
    coverImage: SAKUYA_PHOTOS.nightIllumination,
    notes: [392, 493.88, 587.33, 783.99],
  },
];

export const INITIAL_NOTES: NoteItem[] = [
  {
    id: 'n1',
    title: 'A DAY WITH SAKUYA ♡ 누나 생일 데이트 메모',
    updatedAt: '오늘 오전 08:00',
    pinned: true,
    content:
      '• 08:00 생일의 시작 — 첫 번째 연락\n• 09:50 꽃다발을 든 사쿠야와 만남\n• 11:30 즉석사진관에서 네 컷\n• 14:30 도쿄 아쿠아리움\n• 15:40 디저트 카페 아이스크림\n• 16:30 공원에서 사쿠야가 써 준 손편지\n• 19:40 프라이빗 룸 서프라이즈 케이크 & 선물\n• 23:59 헤어지고 나서 나눈 영상통화',
  },
  {
    id: 'n2',
    title: '사쿠야가 오늘 해준 말들',
    updatedAt: '오늘',
    content:
      '“누나, 오늘은 진짜 내가 하루 종일 데리고 다닐 거야.”\n“누나가 태어나서 다행이라고 생각해. 그래서 내가 누나를 만날 수 있었으니까.”\n“잘 자, 누나. 내일 또 연락할게 ♡”',
  },
];
