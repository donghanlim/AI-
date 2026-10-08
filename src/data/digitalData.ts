import { Question } from '../types';

export const DIGITAL_QUESTIONS: Question[] = [
  // [영역 1: 디지털 기초]
  {
    id: 1,
    areaId: 1,
    areaName: '디지털 기초',
    text: '화면 글자 크기와 밝기를 조절할 수 있다.',
    hint: '설정 화면이나 상단바에서 조절'
  },
  {
    id: 2,
    areaId: 1,
    areaName: '디지털 기초',
    text: '필요한 앱(어플)을 직접 설치하거나 삭제할 수 있다.',
    hint: '구글 플레이스토어나 앱스토어 이용'
  },
  {
    id: 3,
    areaId: 1,
    areaName: '디지털 기초',
    text: '앱이 멈췄을 때 스마트폰을 전원 껐다 켤 수 있다.',
    hint: '측면 버튼을 길게 눌러 재부팅'
  },
  {
    id: 4,
    areaId: 1,
    areaName: '디지털 기초',
    text: '소리/진동 모드나 비밀번호 설정을 변경할 수 있다.',
    hint: '간단한 기기 환경설정 변경'
  },

  // [영역 2: 일상 디지털]
  {
    id: 5,
    areaId: 2,
    areaName: '일상 디지털',
    text: '네이버나 카톡에서 날씨, 길 찾기 등 정보를 검색한다.',
    hint: '일상적인 정보 검색 활용'
  },
  {
    id: 6,
    areaId: 2,
    areaName: '일상 디지털',
    text: '병원 예약, 기차/버스 예매, 은행 송금 중 1가지를 할 수 있다.',
    hint: '생활 편의 앱 실사용 여부'
  },
  {
    id: 7,
    areaId: 2,
    areaName: '일상 디지털',
    text: '식당 키오스크나 배달 앱으로 음식을 주문해 본 적 있다.',
    hint: '무인 주문기나 배달 서비스 경험'
  },
  {
    id: 8,
    areaId: 2,
    areaName: '일상 디지털',
    text: '지도 앱을 이용해 목적지까지 가는 길을 찾을 수 있다.',
    hint: '카카오맵, 네이버지도 길찾기'
  },

  // [영역 3: 미디어 & 소통]
  {
    id: 9,
    areaId: 3,
    areaName: '미디어 & 소통',
    text: '카톡으로 사진, 동영상, 인터넷 링크를 보낼 수 있다.',
    hint: '지인에게 다양한 미디어 공유'
  },
  {
    id: 10,
    areaId: 3,
    areaName: '미디어 & 소통',
    text: '유튜브에서 필요한 영상을 직접 검색해서 본다.',
    hint: '관심 있는 콘텐츠 직접 탐색'
  },
  {
    id: 11,
    areaId: 3,
    areaName: '미디어 & 소통',
    text: '인터넷의 수상한 뉴스나 소식은 사실인지 확인해 본다.',
    hint: '허위 조작 정보 분별 노력'
  },
  {
    id: 12,
    areaId: 3,
    areaName: '미디어 & 소통',
    text: '밴드나 단체방에 사진이나 글을 올릴 수 있다.',
    hint: '동호회, 가족 단체방 소통'
  },

  // [영역 4: 디지털 윤리]
  {
    id: 13,
    areaId: 4,
    areaName: '디지털 윤리',
    text: '의심스러운 스팸 문자나 링크(URL)는 누르지 않는다.',
    hint: '스미싱 및 피싱 예방 습관'
  },
  {
    id: 14,
    areaId: 4,
    areaName: '디지털 윤리',
    text: '주민번호나 비밀번호 같은 개인정보를 잘 관리한다.',
    hint: '개인정보 보호 및 보안 의식'
  },
  {
    id: 15,
    areaId: 4,
    areaName: '디지털 윤리',
    text: '다른 사람의 사진이나 글을 올릴 때 주의한다.',
    hint: '타인의 초상권 및 저작권 존중'
  },
  {
    id: 16,
    areaId: 4,
    areaName: '디지털 윤리',
    text: '인터넷에 댓글을 쓸 때 바른 언어를 사용한다.',
    hint: '선플 문화 및 예절 있는 디지털 언어'
  },

  // [영역 5: AI 이해 및 활용]
  {
    id: 17,
    areaId: 5,
    areaName: 'AI 이해 및 활용',
    text: 'AI(인공지능)가 질문에 답을 해주는 기술임을 안다.',
    hint: '생성형 AI의 기본 개념 이해'
  },
  {
    id: 18,
    areaId: 5,
    areaName: 'AI 이해 및 활용',
    text: '챗GPT, 뤼튼 같은 AI 서비스를 들어본 적 있다.',
    hint: '국내외 대표 대화형 AI 서비스 인지'
  },
  {
    id: 19,
    areaId: 5,
    areaName: 'AI 이해 및 활용',
    text: 'AI에게 궁금한 점을 직접 질문해 본 적이 있다.',
    hint: '프롬프트 입력 및 대화 경험'
  },
  {
    id: 20,
    areaId: 5,
    areaName: 'AI 이해 및 활용',
    text: 'AI의 답변이 틀릴 수도 있음을 알고 확인한다.',
    hint: '할루시네이션(환각) 인지 및 사실 확인'
  }
];

export const DIGITAL_LEVEL_RULES = [
  {
    min: 20,
    max: 39,
    level: 1 as const,
    name: '디지털 첫걸음',
    desc: '스마트폰의 기초 기능부터 차근차근 배우며 세상과 소통하는 멋진 첫 여정을 시작하셨습니다!'
  },
  {
    min: 40,
    max: 59,
    level: 2 as const,
    name: '디지털 친화가',
    desc: '일상에서 필요한 검색과 소통, 생활 앱을 능숙하게 활용하며 스마트한 생활을 즐기고 계십니다.'
  },
  {
    min: 60,
    max: 79,
    level: 3 as const,
    name: 'AI 유망주 (탐험가)',
    desc: '디지털 환경에 매우 익숙하며, 새로운 AI 기술에도 두려움 없이 적극적으로 도전하는 훌륭한 탐험가이십니다.'
  },
  {
    min: 80,
    max: 100,
    level: 4 as const,
    name: 'AI 얼리어답터',
    desc: '디지털과 생성형 AI를 실생활과 업무에 지혜롭게 접목하고 분별력 있게 선도하는 최고의 디지털 리더이십니다.'
  }
];
