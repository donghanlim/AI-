import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, ArrowRight, Utensils, Sparkles, Check, Heart, ShieldCheck, Clock, Award } from 'lucide-react';
import { LUNCH_QUESTIONS, LUNCH_MENUS, LUNCH_LEVEL_RULES } from '../data/lunchData';
import { AssessmentResult, LunchMenuItem } from '../types';
import { ReportPngRenderer } from './ReportPngRenderer';

export const LunchDiagnosis: React.FC = () => {
  // Step 0: User info, Step 1~5: Questions (4 questions each), Step 6: Result
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [ageGroup, setAgeGroup] = useState<string>('50대');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const ageOptions = ['20대', '30대', '40대', '50대', '60대', '70대 이상'];
  const scaleOptions = [
    { value: 1, label: '전혀 아니다', sub: '1점' },
    { value: 2, label: '아니다', sub: '2점' },
    { value: 3, label: '보통이다', sub: '3점' },
    { value: 4, label: '그렇다', sub: '4점' },
    { value: 5, label: '매우 그렇다', sub: '5점' }
  ];

  // 각 스텝당 4문항씩 분할
  const questionsPerStep = 4;
  const totalQuestionSteps = 5;

  const currentQuestions = LUNCH_QUESTIONS.slice(
    (currentStep - 1) * questionsPerStep,
    currentStep * questionsPerStep
  );

  const handleSelectAnswer = (questionId: number, score: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  const isCurrentStepComplete = () => {
    if (currentStep === 0) {
      return userName.trim().length > 0;
    }
    return currentQuestions.every(q => answers[q.id] !== undefined);
  };

  const calculateResult = () => {
    // 5개 영역 점수 계산 (각 영역 4문항, 합계 4~20점)
    const areaNames = [
      '든든함 & 영양',
      '속편함 & 소화력',
      '매콤함 & 자극도',
      '스피드 & 편의성',
      '가성비 & 힐링'
    ];

    const areaScores = areaNames.map((name, idx) => {
      const areaQIds = LUNCH_QUESTIONS.filter(q => q.areaId === idx + 1).map(q => q.id);
      const scoreSum = areaQIds.reduce((sum, qId) => sum + (answers[qId] || 3), 0);
      return {
        areaName: name,
        score: scoreSum,
        maxScore: 20,
        percentage: Math.round((scoreSum / 20) * 100)
      };
    });

    const totalScore = areaScores.reduce((sum, a) => sum + a.score, 0);

    // 4단계 레벨 매핑
    const levelMatch = LUNCH_LEVEL_RULES.find(r => totalScore >= r.min && totalScore <= r.max)
      || LUNCH_LEVEL_RULES[1];

    // 메뉴 매칭 알고리즘
    // 사용자 성향 정규화 (1~5 스케일)
    const userVector = {
      nutrition: areaScores[0].score / 4,
      comfort: areaScores[1].score / 4,
      spiciness: areaScores[2].score / 4,
      speed: areaScores[3].score / 4,
      value: areaScores[4].score / 4
    };

    // 메뉴와의 유클리드 유사도 / 가중치 거리 계산
    const scoredMenus = LUNCH_MENUS.map(menu => {
      const diffSq =
        Math.pow(menu.attributes.nutrition - userVector.nutrition, 2) * 1.2 +
        Math.pow(menu.attributes.comfort - userVector.comfort, 2) * 1.5 +
        Math.pow(menu.attributes.spiciness - userVector.spiciness, 2) * 1.3 +
        Math.pow(menu.attributes.speed - userVector.speed, 2) * 1.0 +
        Math.pow(menu.attributes.value - userVector.value, 2) * 1.0;
      return { menu, distance: Math.sqrt(diffSq) };
    });

    scoredMenus.sort((a, b) => a.distance - b.distance);

    const recommendedMenu: LunchMenuItem = scoredMenus[0].menu;
    const alternativeMenus: LunchMenuItem[] = [scoredMenus[1].menu, scoredMenus[2].menu];

    // 가장 높은 영역 & 낮은 영역 도출
    const sortedAreas = [...areaScores].sort((a, b) => b.score - a.score);
    const topArea = sortedAreas[0];
    const lowArea = sortedAreas[sortedAreas.length - 1];

    // 강점 분석 (2~3줄 구체적 칭찬)
    const strengths = [
      `오늘 수강생님께서는 '${topArea.areaName}'(20점 만점 중 ${topArea.score}점)에 대한 선호가 가장 뚜렷하십니다.`,
      `자신의 컨디션과 오후 일과를 고려하여 스스로에게 꼭 필요한 영양과 에너지를 현명하게 챙길 줄 아는 뛰어난 식단 감각을 지니셨습니다.`,
      `선택하신 취향에 맞춰 고른 '${recommendedMenu.name}'은(는) 오늘 오후의 만족도를 극대화해 줄 최고의 식단입니다.`
    ];

    // 보완점 및 따뜻한 조언 (2~3줄)
    const improvements = [
      `'${lowArea.areaName}' 항목 점수가 상대적으로 완만한 편(${lowArea.score}점)이니, 식사 시 천천히 씹어 드시며 소화에 무리가 가지 않도록 챙겨보세요.`,
      `국물 요리의 경우 나트륨 섭취를 고려해 건더기 위주로 드시거나, 식사 중간 따뜻한 숭늉 또는 미온수를 한 잔 곁들이면 훨씬 편안합니다.`,
      `식사 시간 동안만큼은 스마트폰이나 업무 생각을 잠시 내려놓고 음식의 향과 온기를 온전히 느껴보세요.`
    ];

    // 이후 맞춤 가이드 (1단계, 2단계)
    const nextSteps = {
      step1: `${recommendedMenu.bestSide}와 함께 식사를 정갈하게 즐기신 후, 소화를 돕는 따뜻한 보리차나 깔끔한 연한 아메리카노 한 잔을 추천합니다.`,
      step2: '식사 직후 자리에 바로 앉기보다는 10~15분간 건물 주변이나 공원을 가볍게 거닐며 오후를 위한 햇살 충전 산책을 즐겨보세요.'
    };

    const finalResult: AssessmentResult = {
      userName,
      ageGroup,
      totalScore,
      maxScore: 100,
      levelNumber: levelMatch.level,
      levelName: levelMatch.name,
      levelDescription: levelMatch.desc,
      areaScores,
      strengths,
      improvements,
      nextSteps,
      recommendedMenu,
      alternativeMenus
    };

    setResult(finalResult);
    setCurrentStep(6);

    // 축하 컨페티 효과
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  const handleNext = () => {
    if (!isCurrentStepComplete()) return;

    if (currentStep < totalQuestionSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      calculateResult();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRetest = () => {
    setAnswers({});
    setResult(null);
    setCurrentStep(0);
  };

  // 결과 화면
  if (currentStep === 6 && result) {
    return (
      <div className="py-6 px-4">
        <ReportPngRenderer
          result={result}
          type="lunch"
          onRetest={handleRetest}
        />
      </div>
    );
  }

  // 기본 정보 입력 스텝 (Step 0)
  if (currentStep === 0) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          {/* 헤더 안내 */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 text-[#2B6CB0] rounded-2xl mb-1 shadow-2xs">
              <Utensils className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              오늘 나를 위한 맞춤 점심메뉴 진단
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg mx-auto">
              안녕하세요! 오늘 나의 컨디션, 소화력, 기분과 취향을 종합 진단하여
              가장 속 편하고 든든한 맞춤 점심 메뉴와 리포트를 추천해 드립니다.
            </p>
          </div>

          <div className="space-y-6 pt-2">
            {/* 1. 이름/닉네임 입력 */}
            <div className="space-y-2">
              <label htmlFor="user-name" className="block text-sm sm:text-base font-bold text-slate-800">
                수강생(사용자)의 성함 또는 닉네임 <span className="text-blue-600">*</span>
              </label>
              <input
                id="user-name"
                type="text"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                placeholder="예: 홍길동, 해피런치"
                className="w-full px-4 py-3.5 text-base text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#2B6CB0] focus:bg-white transition-all"
                maxLength={20}
              />
              <p className="text-xs text-slate-500">
                입력하신 이름은 진단 결과 리포트에 예쁘게 인쇄 및 저장됩니다.
              </p>
            </div>

            {/* 2. 연령대 선택 (시니어 친화형 큰 버튼) */}
            <div className="space-y-2">
              <label className="block text-sm sm:text-base font-bold text-slate-800">
                연령대를 선택해 주세요 <span className="text-blue-600">*</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {ageOptions.map(age => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setAgeGroup(age)}
                    className={`py-3 px-2 text-sm sm:text-base font-semibold rounded-xl border transition-all cursor-pointer ${
                      ageGroup === age
                        ? 'bg-[#2B6CB0] text-white border-[#2B6CB0] shadow-xs scale-102'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* 안내 배지 */}
            <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <ShieldCheck className="w-5 h-5 text-[#2B6CB0] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-[#2B6CB0] block">20문항 5대 지표 안심 진단</span>
                <span className="text-slate-600 block">
                  시니어와 직장인 모두 편안하게 답변하실 수 있도록 4~5문항씩 정갈하게 제시되며,
                  진단 완료 시 오각형 차트 리포트 PNG 이미지와 인쇄 기능을 제공합니다.
                </span>
              </div>
            </div>

            {/* 시작 버튼 */}
            <button
              onClick={handleNext}
              disabled={!isCurrentStepComplete()}
              className="w-full py-4 px-6 bg-[#2B6CB0] hover:bg-[#235891] active:bg-[#1C4777] text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
              <span>진단 시작하기 (20문항)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 문항 풀이 스텝 (Step 1 ~ 5)
  const currentAreaName = currentQuestions[0]?.areaName || '';

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* 상단 프로그레스 바 & 스텝 안내 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-bold text-[#2B6CB0]">
              영역 {currentStep} / {totalQuestionSteps}: {currentAreaName}
            </span>
            <span className="font-semibold text-slate-500">
              전체 {Object.keys(answers).length} / {LUNCH_QUESTIONS.length} 문항 완료
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#2B6CB0] h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentStep - 1) * 20 + (currentQuestions.filter(q => answers[q.id] !== undefined).length / 4) * 20)}%`
              }}
            />
          </div>
        </div>

        {/* 현재 영역 타이틀 */}
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-5 bg-[#2B6CB0] rounded-xs inline-block" />
            <span>{currentAreaName} 진단</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            오늘 당신의 상태에 가장 가까운 정도를 솔직하고 편안하게 골라주세요.
          </p>
        </div>

        {/* 문항 목록 (4문항) */}
        <div className="space-y-6">
          {currentQuestions.map((q, qIndex) => {
            const currentVal = answers[q.id];
            return (
              <div
                key={q.id}
                className="p-4 sm:p-5 bg-slate-50/70 border border-slate-200/90 rounded-2xl space-y-3.5"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-[#2B6CB0] text-white text-xs font-bold rounded-lg shrink-0 mt-0.5">
                    Q{q.id}
                  </span>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {q.text}
                    </h4>
                    {q.hint && (
                      <p className="text-xs text-slate-500 mt-1 font-medium">
                        💡 {q.hint}
                      </p>
                    )}
                  </div>
                </div>

                {/* 1~5점 척도 버튼 그룹 (시니어 친화형 큰 터치 영역) */}
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2 pt-1">
                  {scaleOptions.map(opt => {
                    const isSelected = currentVal === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelectAnswer(q.id, opt.value)}
                        className={`py-3 px-1 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[56px] ${
                          isSelected
                            ? 'bg-[#2B6CB0] text-white border-[#2B6CB0] shadow-2xs font-extrabold scale-102 ring-2 ring-blue-200'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 font-medium'
                        }`}
                      >
                        <span className="text-sm sm:text-base font-black">
                          {opt.value}점
                        </span>
                        <span className={`text-[10px] sm:text-xs mt-0.5 leading-tight ${
                          isSelected ? 'text-blue-100 font-semibold' : 'text-slate-500'
                        }`}>
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* 이전 / 다음 버튼 */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-3">
          <button
            onClick={handlePrev}
            className="inline-flex items-center gap-1.5 px-4 py-3 text-sm sm:text-base font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            이전 단계
          </button>

          <button
            onClick={handleNext}
            disabled={!isCurrentStepComplete()}
            className="inline-flex items-center gap-1.5 px-6 py-3 text-sm sm:text-base font-extrabold text-white bg-[#2B6CB0] hover:bg-[#235891] rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>
              {currentStep === totalQuestionSteps ? '진단 결과 확인하기' : '다음 단계'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
