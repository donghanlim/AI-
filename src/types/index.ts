export interface UserProfile {
  name: string;
  ageGroup: string; // '20대', '30대', '40대', '50대', '60대', '70대 이상'
}

export interface Question {
  id: number;
  areaId: number;
  areaName: string;
  text: string;
  hint?: string;
}

export interface LunchMenuItem {
  id: string;
  name: string;
  category: '한식' | '중식' | '일식' | '양식' | '분식/간편' | '건강/보양';
  description: string;
  emoji: string;
  tags: string[];
  bestSide: string; // 어울리는 반찬/디저트
  priceRange: '실속(8천원 이하)' | '적정(9천~1.2만원)' | '든든/특별(1.3만원 이상)';
  // 5대 축 점수 (1~5점)
  attributes: {
    nutrition: number; // 든든함 & 영양
    speed: number;     // 스피드 & 간편
    spiciness: number; // 매콤 & 자극도
    value: number;     // 가성비 & 실속
    comfort: number;   // 속편함 & 소화력
  };
}

export interface AreaScore {
  areaName: string;
  score: number;      // 실제 점수
  maxScore: number;   // 만점 (영역당 20점)
  percentage: number; // 백분율
}

export interface AssessmentResult {
  userName: string;
  ageGroup: string;
  totalScore: number;
  maxScore: number;
  levelNumber: 1 | 2 | 3 | 4;
  levelName: string;
  levelDescription: string;
  areaScores: AreaScore[];
  strengths: string[];
  improvements: string[];
  nextSteps: {
    step1: string;
    step2: string;
  };
  // 점심 추천인 경우 추가 정보
  recommendedMenu?: LunchMenuItem;
  alternativeMenus?: LunchMenuItem[];
  lunchTip?: string;
  dessertTip?: string;
}
