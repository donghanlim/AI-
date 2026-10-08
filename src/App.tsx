import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { LunchDiagnosis } from './components/LunchDiagnosis';
import { LunchRoulette } from './components/LunchRoulette';
import { DigitalAssessment } from './components/DigitalAssessment';
import { Utensils, Shuffle, Laptop, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('lunch-diagnosis');

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#2D3748]">
      {/* 글로벌 상단 헤더 */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 서브 퀵 배너 (모바일 및 첫 방문자 가이드) */}
      <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/80 border-b border-slate-200/80 py-2.5 px-4 text-center print:hidden">
        <div className="max-w-4xl mx-auto flex items-center justify-center flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
          <span className="font-semibold text-[#2B6CB0] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            맞춤 진단 시스템
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span>5대 지표 오각형 레이더 차트</span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span>고품질 PNG 리포트 카드 생성 &amp; 인쇄 지원</span>
        </div>
      </div>

      {/* 메인 탭 컨텐츠 */}
      <main className="flex-1 w-full pb-16">
        {activeTab === 'lunch-diagnosis' && <LunchDiagnosis />}
        {activeTab === 'lunch-roulette' && <LunchRoulette />}
        {activeTab === 'digital-diagnosis' && <DigitalAssessment />}
      </main>

      {/* 푸터 */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-medium text-slate-600">
            점심 메뉴 추천 &amp; 역량 진단 도구 · 시니어 및 모든 사용자를 위한 친절한 분석 리포트
          </p>
          <p className="text-slate-400">
            본 도구는 자가진단 및 일상 생활 편의를 돕기 위한 서비스입니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
