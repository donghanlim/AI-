import React, { useState } from 'react';
import { RotateCw, Sparkles, Utensils, Check, Shuffle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LUNCH_MENUS } from '../data/lunchData';
import { LunchMenuItem } from '../types';

export const LunchRoulette: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<LunchMenuItem | null>(null);

  const categories = ['전체', '한식', '중식', '일식', '양식', '건강/보양'];

  const filteredMenus = selectedCategory === '전체'
    ? LUNCH_MENUS
    : LUNCH_MENUS.filter(m => m.category === selectedCategory);

  const spinRoulette = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedMenu(null);

    let counter = 0;
    const totalFlips = 25;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * filteredMenus.length);
      setSelectedMenu(filteredMenus[randomIndex]);
      counter++;

      if (counter >= totalFlips) {
        clearInterval(interval);
        setIsSpinning(false);
        const finalWinner = filteredMenus[Math.floor(Math.random() * filteredMenus.length)];
        setSelectedMenu(finalWinner);
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
    }, 80);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl mb-1 shadow-2xs">
            <Shuffle className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            오늘 뭐 먹지? 1초 점심 룰렛
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            결정이 어려울 땐 운명에 맡겨보세요! 버튼을 누르면 딱 맞는 메뉴를 뽑아드립니다.
          </p>
        </div>

        {/* 카테고리 필터 버튼 */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedMenu(null);
              }}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-[#2B6CB0] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 룰렛 디스플레이 박스 */}
        <div className="p-8 sm:p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center min-h-[220px] text-center transition-all">
          {selectedMenu ? (
            <div className={`space-y-3 transition-transform ${isSpinning ? 'scale-95 opacity-80' : 'scale-100'}`}>
              <span className="text-6xl sm:text-7xl block animate-bounce">
                {selectedMenu.emoji}
              </span>
              <div>
                <span className="inline-block text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full mb-1.5">
                  {selectedMenu.category} · {selectedMenu.priceRange}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {selectedMenu.name}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-medium">
                {selectedMenu.description}
              </p>
              <div className="pt-2 text-xs text-slate-500 font-semibold">
                💡 어울리는 조합: <span className="text-slate-700">{selectedMenu.bestSide}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-slate-400">
              <Utensils className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
              <p className="text-sm font-medium">
                아래 &lsquo;룰렛 돌리기&rsquo; 버튼을 눌러 점심 메뉴를 추첨해 보세요!
              </p>
            </div>
          )}
        </div>

        {/* 돌리기 버튼 */}
        <button
          onClick={spinRoulette}
          disabled={isSpinning}
          className="w-full py-4 px-6 bg-[#2B6CB0] hover:bg-[#235891] active:bg-[#1C4777] text-white font-black text-base sm:text-lg rounded-2xl shadow-xs transition-all disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
        >
          <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? '맛있는 메뉴 찾는 중...' : '룰렛 돌리기!'}</span>
        </button>

        {/* 인기 메뉴 빠른 태그 */}
        <div className="pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 block mb-2">
            후보 메뉴 목록 ({filteredMenus.length}종):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {filteredMenus.map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedMenu(m)}
                className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors cursor-pointer"
              >
                {m.emoji} {m.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
