import { LunchMenuItem, Question } from '../types';

export const LUNCH_QUESTIONS: Question[] = [
  // 영역 1: 든든함 & 영양 (Vitality)
  {
    id: 1,
    areaId: 1,
    areaName: '든든함 & 영양',
    text: '오늘 오후 일정이 빡빡해서 점심을 든든하게 먹고 싶다.',
    hint: '오후 집중력을 위한 든든한 에너지 보충'
  },
  {
    id: 2,
    areaId: 1,
    areaName: '든든함 & 영양',
    text: '고기나 해산물 등 단백질이 풍부한 식단을 선호한다.',
    hint: '기운을 돋워주는 든든한 육류/해물 메뉴'
  },
  {
    id: 3,
    areaId: 1,
    areaName: '든든함 & 영양',
    text: '역시 한국인은 밥심! 밥과 따뜻한 국/반찬 정식이 좋다.',
    hint: '쌀밥과 제대로 차려진 정갈한 한상'
  },
  {
    id: 4,
    areaId: 1,
    areaName: '든든함 & 영양',
    text: '포만감이 오래가는 푸짐한 한 끼를 먹어야 안심이 된다.',
    hint: '오후 4~5시에도 배고프지 않을 만족감'
  },

  // 영역 2: 속편함 & 소화력 (Comfort)
  {
    id: 5,
    areaId: 2,
    areaName: '속편함 & 소화력',
    text: '오늘 위에 부담이 적고 소화가 잘되는 깔끔한 음식을 원한다.',
    hint: '자극 없이 속이 편안하고 가벼운 식사'
  },
  {
    id: 6,
    areaId: 2,
    areaName: '속편함 & 소화력',
    text: '기름지거나 튀긴 음식보다는 담백하거나 맑은 국물을 선호한다.',
    hint: '맑은 탕, 나물, 죽, 생선구이, 샐러드 등'
  },
  {
    id: 7,
    areaId: 2,
    areaName: '속편함 & 소화력',
    text: '자극적인 조미료보다는 재료 본연의 맛이 살아있는 음식이 좋다.',
    hint: '신선한 채소와 건강한 조리법'
  },
  {
    id: 8,
    areaId: 2,
    areaName: '속편함 & 소화력',
    text: '식사 후 더부룩하지 않고 활력 있게 움직이고 싶다.',
    hint: '나른한 식곤증 없이 가뿐한 오후 컨디션'
  },

  // 영역 3: 매콤함 & 스트레스 해소 (Flavor & Spiciness)
  {
    id: 9,
    areaId: 3,
    areaName: '매콤함 & 자극도',
    text: '오늘 스트레스가 있어 칼칼하거나 매콤한 맛으로 풀고 싶다.',
    hint: '땀 송글송글 맺히는 기분 좋은 매콤함'
  },
  {
    id: 10,
    areaId: 3,
    areaName: '매콤함 & 자극도',
    text: '빨간 양념이나 얼큰한 찌개/볶음 요리가 당긴다.',
    hint: '김치찌개, 제육볶음, 낙지덮밥, 짬뽕 등'
  },
  {
    id: 11,
    areaId: 3,
    areaName: '매콤함 & 자극도',
    text: '심심한 맛보다는 입맛을 확 돋우는 감칠맛 있는 요리가 좋다.',
    hint: '진한 국물, 달콤짭조름한 양념'
  },
  {
    id: 12,
    areaId: 3,
    areaName: '매콤함 & 자극도',
    text: '칼칼한 국물을 후루룩 마셨을 때 카타르시스를 느낀다.',
    hint: '얼큰한 국물 한 숟가락의 개운함'
  },

  // 영역 4: 스피드 & 편의성 (Speed)
  {
    id: 13,
    areaId: 4,
    areaName: '스피드 & 편의성',
    text: '점심시간이 여유롭지 않아 빠르게 먹을 수 있는 곳이 좋다.',
    hint: '주문 후 신속하게 나오고 금방 먹는 메뉴'
  },
  {
    id: 14,
    areaId: 4,
    areaName: '스피드 & 편의성',
    text: '웨이팅(대기줄) 없이 바로 앉아서 먹을 수 있는 식당을 선호한다.',
    hint: '시간 절약이 최우선인 오늘의 점심'
  },
  {
    id: 15,
    areaId: 4,
    areaName: '스피드 & 편의성',
    text: '한 그릇으로 간편하게 깔끔하게 해결되는 단품 요리가 편하다.',
    hint: '덮밥, 국밥, 샌드위치, 면 요리 등 단품 위주'
  },
  {
    id: 16,
    areaId: 4,
    areaName: '스피드 & 편의성',
    text: '혼자 먹거나 조용히 빠르게 식사하고 휴식을 취하고 싶다.',
    hint: '식사 후 20~30분 나만의 꿀잠/산책 시간 확보'
  },

  // 영역 5: 가성비 & 힐링 (Value & Satisfaction)
  {
    id: 17,
    areaId: 5,
    areaName: '가성비 & 힐링',
    text: '요즘 외식 물가가 부담되어 만원 안팎의 실속 있는 가격이 좋다.',
    hint: '지갑도 편안하고 배도 부른 갓성비 점심'
  },
  {
    id: 18,
    areaId: 5,
    areaName: '가성비 & 힐링',
    text: '가격 대비 반찬이나 양이 풍성하게 나오는 집을 선호한다.',
    hint: '가성비 백반, 뷔페, 넉넉한 인심의 식당'
  },
  {
    id: 19,
    areaId: 5,
    areaName: '가성비 & 힐링',
    text: '오늘 하루 수고하는 나를 위해 소소한 미식의 즐거움을 누리고 싶다.',
    hint: '기분전환이 되는 맛있는 한 끼의 행복'
  },
  {
    id: 20,
    areaId: 5,
    areaName: '가성비 & 힐링',
    text: '점심 한 끼로 오늘 하루의 행복 지수를 올리고 싶다.',
    hint: '식사 후 만족스러운 미소가 절로 나오는 메뉴'
  }
];

export const LUNCH_MENUS: LunchMenuItem[] = [
  {
    id: 'm1',
    name: '맑은 나주곰탕 & 깍두기',
    category: '한식',
    description: '기름기를 걷어낸 맑고 깊은 양지고기 육수에 밥을 말아 아삭한 깍두기를 얹어 먹는 속 편하고 든든한 보양식',
    emoji: '🍲',
    tags: ['속편함', '든든한단백질', '맑은국물', '전통한식'],
    bestSide: '시원한 석박지와 양파절임',
    priceRange: '적정(9천~1.2만원)',
    attributes: { nutrition: 5, speed: 4, spiciness: 1, value: 4, comfort: 5 }
  },
  {
    id: 'm2',
    name: '얼큰 차돌 된장찌개 정식',
    category: '한식',
    description: '고소한 차돌박이와 구수한 재래된장, 칼칼한 청양고추가 어우러져 밥 한 공기 뚝딱 비우게 하는 마성의 찌개',
    emoji: '🥘',
    tags: ['얼큰칼칼', '밥도둑', '든든한한상', '한국인의맛'],
    bestSide: '반숙 계란후라이와 조미김',
    priceRange: '적정(9천~1.2만원)',
    attributes: { nutrition: 4, speed: 4, spiciness: 4, value: 4, comfort: 3 }
  },
  {
    id: 'm3',
    name: '직화 제육볶음 & 쌈채소',
    category: '한식',
    description: '불향 가득 입힌 매콤달콤 돼지고기 볶음과 싱싱한 상추·깻잎 쌈으로 오후 활력을 100% 충전하는 직장인 1위 메뉴',
    emoji: '🥩',
    tags: ['불맛', '단백질충전', '매콤달콤', '쌈밥'],
    bestSide: '따뜻한 콩나물국과 마늘쌈장',
    priceRange: '적정(9천~1.2만원)',
    attributes: { nutrition: 5, speed: 4, spiciness: 4, value: 4, comfort: 3 }
  },
  {
    id: 'm4',
    name: '산채 비빔밥 & 된장국',
    category: '한식',
    description: '다채로운 제철 나물과 고소한 참기름, 달걀후라이를 넣어 슥슥 비벼 먹는 소화 만점 웰빙 식단',
    emoji: '🥗',
    tags: ['속편함', '풍부한식이섬유', '비건친화', '건강식단'],
    bestSide: '구수한 배추된장국과 열무김치',
    priceRange: '실속(8천원 이하)',
    attributes: { nutrition: 4, speed: 5, spiciness: 2, value: 5, comfort: 5 }
  },
  {
    id: 'm5',
    name: '얼큰 돼지 김치찌개 & 라면사리',
    category: '한식',
    description: '잘 익은 묵은지와 두툼한 돼지고기를 푹 끓여내 땀 흘리며 스트레스를 날려버리는 한국인의 소울푸드',
    emoji: '🍲',
    tags: ['스트레스해소', '얼큰칼칼', '국민메뉴', '푸짐함'],
    bestSide: '두툼한 달걀말이와 도시락김',
    priceRange: '실속(8천원 이하)',
    attributes: { nutrition: 4, speed: 4, spiciness: 5, value: 5, comfort: 2 }
  },
  {
    id: 'm6',
    name: '신선한 연어 아보카도 포케',
    category: '건강/보양',
    description: '도톰한 생연어, 크리미한 아보카도, 현미밥과 신선한 야채가 어우러져 오후 식곤증 없이 가뿐한 프리미엄 보울',
    emoji: '🥑',
    tags: ['다이어트', '오메가3', '가뿐한오후', '속편함'],
    bestSide: '미소 된장국과 레몬 탄산수',
    priceRange: '든든/특별(1.3만원 이상)',
    attributes: { nutrition: 4, speed: 4, spiciness: 1, value: 3, comfort: 5 }
  },
  {
    id: 'm7',
    name: '진한 삼계탕 / 반계탕',
    category: '건강/보양',
    description: '인삼, 대추, 찹쌀을 넣고 푹 고아내어 지친 체력과 기력을 단번에 끌어올려 주는 대한민국 대표 보양 한 그릇',
    emoji: '🍗',
    tags: ['원기회복', '보양식', '단백질폭탄', '환절기추천'],
    bestSide: '알싸한 마늘장아찌와 깍두기',
    priceRange: '든든/특별(1.3만원 이상)',
    attributes: { nutrition: 5, speed: 3, spiciness: 1, value: 3, comfort: 4 }
  },
  {
    id: 'm8',
    name: '바삭 수제 돈까스 정식',
    category: '일식',
    description: '겉은 바삭하고 속은 촉촉한 등심 돈까스에 특제 브라운 소스와 양배추 샐러드가 곁들여진 실패 없는 힐링 메뉴',
    emoji: '🍱',
    tags: ['겉바속촉', '기분전환', '남녀노소인기', '바삭함'],
    bestSide: '흑임자 양배추 샐러드와 미니 우동',
    priceRange: '적정(9천~1.2만원)',
    attributes: { nutrition: 4, speed: 4, spiciness: 1, value: 4, comfort: 3 }
  },
  {
    id: 'm9',
    name: '해물 짬뽕 & 찹쌀 탕수육',
    category: '중식',
    description: '불맛 나는 얼큰 칼칼한 해물 육수와 쫄깃한 면발, 갓 튀긴 탕수육 한 조각으로 도파민을 충전하는 화끈한 선택',
    emoji: '🍜',
    tags: ['불맛짬뽕', '해물가득', '해장추천', '화끈함'],
    bestSide: '아삭한 단무지와 양파 춘장',
    priceRange: '적정(9천~1.2만원)',
    attributes: { nutrition: 4, speed: 4, spiciness: 5, value: 4, comfort: 2 }
  },
  {
    id: 'm10',
    name: '담백한 순두부찌개 백반',
    category: '한식',
    description: '몽글몽글 부드러운 순두부에 계란 탁 풀어 넣어 부드럽게 목을 타고 넘어가는 온기 가득한 집밥 스타일',
    emoji: '🍲',
    tags: ['부드러움', '단백질', '따뜻한국물', '가성비'],
    bestSide: '어묵볶음과 아삭 콩나물무침',
    priceRange: '실속(8천원 이하)',
    attributes: { nutrition: 4, speed: 5, spiciness: 3, value: 5, comfort: 4 }
  },
  {
    id: 'm11',
    name: '따뜻한 가쓰오 우동 & 모둠 유부초밥',
    category: '일식',
    description: '가쓰오부시의 그윽한 감칠맛 국물에 통통한 면발, 달콤 짭조름한 유부초밥으로 신속하고 따뜻하게 채우는 점심',
    emoji: '🥢',
    tags: ['빠른식사', '간편단품', '따뜻한국물', '담백함'],
    bestSide: '바삭한 야채튀김과 초생강',
    priceRange: '실속(8천원 이하)',
    attributes: { nutrition: 3, speed: 5, spiciness: 1, value: 5, comfort: 4 }
  },
  {
    id: 'm12',
    name: '소고기 쌀국수 (포 보) & 스프링롤',
    category: '양식',
    description: '깊게 우려낸 소고기 육수에 숙주나물과 쌀면, 향긋한 고수가 어우러져 속을 시원하게 풀어주는 에스닉 힐링 푸드',
    emoji: '🍜',
    tags: ['해장강추', '시원한육수', '글루텐프리', '깔끔함'],
    bestSide: '칠리소스 양파절임과 땅콩소스 롤',
    priceRange: '적정(9천~1.2만원)',
    attributes: { nutrition: 4, speed: 5, spiciness: 2, value: 4, comfort: 4 }
  },
  {
    id: 'm13',
    name: '모둠 초밥 10pcs & 미니 우동',
    category: '일식',
    description: '신선한 광어, 연어, 참치, 새우 등이 정갈하게 쥐어진 품격 있는 한 상으로 점심시간 소소한 사치를 즐기는 메뉴',
    emoji: '🍣',
    tags: ['신선함', '소확행', '깔끔한뒷맛', '프리미엄'],
    bestSide: '부드러운 일본식 계란찜(차완무시)',
    priceRange: '든든/특별(1.3만원 이상)',
    attributes: { nutrition: 4, speed: 4, spiciness: 1, value: 3, comfort: 4 }
  },
  {
    id: 'm14',
    name: '수제 햄버거 & 감자튀김',
    category: '양식',
    description: '육즙 가득한 소고기 패티와 멜팅 치즈, 신선한 토마토가 꽉 찬 미국식 정통 버거로 즐기는 화려한 입맛 저격',
    emoji: '🍔',
    tags: ['육즙가득', '치즈풍미', '젊은감성', '스트레스해소'],
    bestSide: '어니언링과 시원한 제로 콜라',
    priceRange: '적정(9천~1.2만원)',
    attributes: { nutrition: 4, speed: 4, spiciness: 2, value: 3, comfort: 2 }
  },
  {
    id: 'm15',
    name: '황태 콩나물국밥 & 수란',
    category: '한식',
    description: '뽀얗게 우려낸 황태 육수에 아삭한 콩나물과 부드러운 수란으로 속을 편안하게 어루만져 주는 불멸의 스테디셀러',
    emoji: '🥣',
    tags: ['해장의정석', '소화만점', '착한가격', '속편함'],
    bestSide: '오징어젓갈과 바삭 김가루',
    priceRange: '실속(8천원 이하)',
    attributes: { nutrition: 4, speed: 5, spiciness: 2, value: 5, comfort: 5 }
  },
  {
    id: 'm16',
    name: '매콤 낙지볶음 덮밥',
    category: '한식',
    description: '통통하고 쫄깃한 낙지를 불맛 양념에 센 불로 볶아 밥 위에 콩나물과 함께 비벼 먹는 원기 충전 매운맛의 결정체',
    emoji: '🐙',
    tags: ['화끈한매운맛', '원기충전', '입맛돋움', '쫄깃함'],
    bestSide: '시원한 미역오이냉국과 데친 콩나물',
    priceRange: '적정(9천~1.2만원)',
    attributes: { nutrition: 4, speed: 4, spiciness: 5, value: 4, comfort: 3 }
  }
];

export const LUNCH_LEVEL_RULES = [
  {
    min: 20,
    max: 39,
    level: 1 as const,
    name: '실속 웰빙 탐험가',
    desc: '가볍고 부담 없는 식사를 추구하며, 속 편하고 건강한 한 끼를 가장 중요하게 여기는 담백형 미식가입니다.'
  },
  {
    min: 40,
    max: 59,
    level: 2 as const,
    name: '밸런스 조화 식도락가',
    desc: '영양과 스피드, 가성비의 균형을 슬기롭게 맞추며 다양한 메뉴를 유연하게 즐길 줄 아는 실속파 미식가입니다.'
  },
  {
    min: 60,
    max: 79,
    level: 3 as const,
    name: '든든 힐링 미식가',
    desc: '점심 한 끼로 오후의 활력과 심리적 만족을 꽉 채우는 것을 선호하며, 맛과 영양 모두를 챙기는 정통 미식가입니다.'
  },
  {
    min: 80,
    max: 100,
    level: 4 as const,
    name: '열정 에너지 먹리어답터',
    desc: '확실한 미식의 즐거움과 화끈한 만족도를 추구하며, 맛있는 점심을 통해 하루의 에너지를 200% 충전하는 열정파입니다.'
  }
];
