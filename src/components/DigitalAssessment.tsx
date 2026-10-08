import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, ArrowRight, Laptop, Award, ShieldCheck } from 'lucide-react';
import { DIGITAL_QUESTIONS, DIGITAL_LEVEL_RULES } from '../data/digitalData';
import { AssessmentResult } from '../types';
import { ReportPngRenderer } from './ReportPngRenderer';

export const DigitalAssessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [ageGroup, setAgeGroup] = useState<string>('60대');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const ageOptions = ['50대', '60대', '70대', '80대 이상'];
  const scaleOptions = [
    { value: 1, label: '전혀 아니다', sub: '1점' },
    { value: 2, label: '아니다', sub: '2점' },
    { value: 3, label: '보통이다', sub: '3점' },
    { value: 4, label: '그렇다', sub: '4점' },
    { value: 5, label: '매우 그렇다', sub: '5점' }
  ];

  const questionsPerStep = 4;
  const totalQuestionSteps = 5;

  const currentQuestions = DIGITAL_QUESTIONS.slice(
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
    const areaNames = [
      '디지털 기초',
      '일상 디지털',
      '미디어 & 소통',
      '디지털 윤리',
      'AI 이해 및 활용'
    ];

    const areaScores = areaNames.map((name, idx) => {
      const areaQIds = DIGITAL_QUESTIONS.filter(q => q.areaId === idx + 1).map(q => q.id);
      const scoreSum = areaQIds.reduce((sum, qId) => sum + (answers[qId] || 3), 0);
      return {
        areaName: name,
        score: scoreSum,
        maxScore: 20,
        percentage: Math.round((scoreSum / 20) * 100)
      };
    });

    const totalScore = areaScores.reduce((sum, a) => sum + a.score, 0);

    const levelMatch = DIGITAL_LEVEL_RULES.find(r => totalScore >= r.min && totalScore <= r.max)
      || DIGITAL_LEVEL_RULES[0];

    const sortedAreas = [...areaScores].sort((a, b) => b.score - a.score);
    const topArea = sortedAreas[0];
    const lowArea = sortedAreas[sortedAreas.length - 1];

    // PDF Output Format 준수: 강점, 보완할 점, 이후 학습 가이드
    const strengths = [
      `수강생님께서는 '${topArea.areaName}' 영역에서 20점 만점 중 ${topArea.score}점으로 가장 뛰어난 역량을 보여주셨습니다!`,
      `실생활에서 필수적인 스마트폰 활용 능력이 탄탄하시며, 주변 지인들에게도 따뜻하게 도움을 주실 수 있는 소중한 경험을 갖고 계십니다.`,
      `새로운 디지털 도구를 배울 때 두려움보다 호기심으로 마주하시는 긍정적인 태도가 가장 큰 강점입니다.`
    ];

    const improvements = [
      `'${lowArea.areaName}' 영역(${lowArea.score}점)은 몇 가지 핵심 기능만 익히시면 가장 빠르게 실력이 향상될 수 있는 보완 영역입니다.`,
      `스마트폰 설정이나 복잡한 앱을 쓰실 때 천천히 한 단계씩 메모하며 따라 해보시면 부담 없이 익숙해지실 수 있습니다.`,
      `특히 보안(의심 링크 주의)과 AI 질문 요령을 조금만 더 보완하시면 더욱 안전하고 유익한 스마트 생활이 완성됩니다.`
    ];

    // 이후 학습 가이드 (1단계, 2단계)
    let step1 = '스마트폰 화면 설정, 앱 설치/정리 및 사진 공유 기초 마스터 강좌 수강';
    let step2 = '네이버지도 길찾기 및 카카오톡 안전 링크 확인 실습하기';

    if (levelMatch.level >= 3) {
      step1 = '생성형 AI(챗GPT, 뤼튼)에게 말하듯 편안하게 질문하고 레시피/건강 상식 묻기';
      step2 = 'AI가 알려준 정보의 출처와 사실 여부를 확인(팩트체크)하고 요약본 저장하기';
    } else if (levelMatch.level === 2) {
      step1 = '일상 편의 앱(기차 예매, 키오스크 체험 모드, 병원 예약) 집중 실습';
      step2 = '스팸 문자 구별법 및 챗GPT 대화형 AI 첫 사용법 체험';
    }

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
      nextSteps: {
        step1,
        step2
      }
    };

    setResult(finalResult);
    setCurrentStep(6);

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

  if (currentStep === 6 && result) {
    return (
      <div className="py-6 px-4">
        <ReportPngRenderer
          result={result}
          type="digital"
          onRetest={handleRetest}
        />
      </div>
    );
  }

  // Step 0: 기본 정보
  if (currentStep === 0) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 text-[#2B6CB0] rounded-2xl mb-1 shadow-2xs">
              <Laptop className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              중장년 & 시니어를 위한 디지털 & AI 역량 진단
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-lg mx-auto">
              부담 없이 따뜻하고 친절한 20개 문항을 통해 현재 나의 디지털 수준을 확인하고,
              맞춤형 오각형 분석 리포트와 추천 학습 코스를 확인해 보세요.
            </p>
          </div>

          <div className="space-y-6 pt-2">
            <div className="space-y-2">
              <label htmlFor="student-name" className="block text-sm sm:text-base font-bold text-slate-800">
                수강생 성함 또는 닉네임 <span className="text-blue-600">*</span>
              </label>
              <input
                id="student-name"
                type="text"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                placeholder="예: 김영희, 지혜로운길"
                className="w-full px-4 py-3.5 text-base text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#2B6CB0] focus:bg-white transition-all"
                maxLength={20}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm sm:text-base font-bold text-slate-800">
                연령대를 선택해 주세요 <span className="text-blue-600">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {ageOptions.map(age => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setAgeGroup(age)}
                    className={`py-3.5 px-3 text-base font-bold rounded-xl border transition-all cursor-pointer ${
                      ageGroup === age
                        ? 'bg-[#2B6CB0] text-white border-[#2B6CB0] shadow-xs scale-102'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-emerald-900 block">교육용 자가진단 도구</span>
                <span className="text-slate-600 block">
                  문항과 수준 구간은 교육 및 자가진단 목적이며, 부담 없이 편안한 마음으로
                  평소 스마트폰을 쓰시는 습관 그대로 체크해 주시면 됩니다.
                </span>
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!isCurrentStepComplete()}
              className="w-full py-4 px-6 bg-[#2B6CB0] hover:bg-[#235891] active:bg-[#1C4777] text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-xs transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>진단 문항 시작하기 (20문항)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 문항 단계
  const currentAreaName = currentQuestions[0]?.areaName || '';

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* 상단 프로그레스 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-bold text-[#2B6CB0]">
              영역 {currentStep} / {totalQuestionSteps}: {currentAreaName}
            </span>
            <span className="font-semibold text-slate-500">
              {Object.keys(answers).length} / {DIGITAL_QUESTIONS.length} 문항 완료
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

        {/* 영역 헤더 */}
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-5 bg-[#2B6CB0] rounded-xs inline-block" />
            <span>[{currentAreaName}]</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            시니어 수강생님이 한눈에 읽기 편하도록 큰 글씨로 제공됩니다.
          </p>
        </div>

        {/* 4문항 렌더링 */}
        <div className="space-y-6">
          {currentQuestions.map(q => {
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

                {/* 1~5점 버튼 */}
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

        {/* 하단 네비게이션 */}
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
            className="inline-flex items-center gap-1.5 px-6 py-3 text-sm sm:text-base font-extrabold text-white bg-[#2B6CB0] hover:bg-[#235891] rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-40"
          >
            <span>
              {currentStep === totalQuestionSteps ? '진단 결과서 도출' : '다음 단계'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
