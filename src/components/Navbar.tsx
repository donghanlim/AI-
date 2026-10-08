import React from 'react';
import { Utensils, Shuffle, Laptop, Sparkles } from 'lucide-react';

export type ActiveTab = 'lunch-diagnosis' | 'lunch-roulette' | 'digital-diagnosis';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* 브랜드 로고 및 이름 */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#2B6CB0] text-white flex items-center justify-center font-black shadow-xs">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight block leading-tight">
              런치 마스터 <span className="text-[#2B6CB0]">&amp;</span> 진단
            </span>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:block">
              맞춤 점심 메뉴 추천 · 5대 지표 분석 리포트
            </span>
          </div>
        </div>

        {/* 탭 네비게이션 (대화형 세그먼트 컨트롤) */}
        <nav aria-label="메인 탭" className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => onTabChange('lunch-diagnosis')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'lunch-diagnosis'
                ? 'bg-white text-[#2B6CB0] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>맞춤 점심 진단</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('lunch-roulette')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'lunch-roulette'
                ? 'bg-white text-[#2B6CB0] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Shuffle className="w-4 h-4" />
            <span>1초 룰렛</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('digital-diagnosis')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'digital-diagnosis'
                ? 'bg-white text-[#2B6CB0] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>디지털 AI 진단</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
