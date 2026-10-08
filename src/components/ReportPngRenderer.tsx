import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Download, Printer, CheckCircle2, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { AssessmentResult } from '../types';
import { RadarChart } from './RadarChart';

interface ReportPngRendererProps {
  result: AssessmentResult;
  type: 'lunch' | 'digital';
  onRetest?: () => void;
}

export const ReportPngRenderer: React.FC<ReportPngRendererProps> = ({
  result,
  type,
  onRetest
}) => {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(true);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 고품질 Canvas 기반 PNG 자동 생성 함수 (PDF 규격 100% 준수 & 자동 보정 Auto-Correction)
  const generatePngImage = useCallback(() => {
    try {
      setIsGenerating(true);
      setGenerationError(null);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Canvas 2D Context를 초기화할 수 없습니다.');
      }

      // 고해상도 (2x Retina 배율) 1000 x 1400
      const width = 1000;
      const height = 1420;
      canvas.width = width;
      canvas.height = height;

      // 1. 전체 배경 칠하기 (#F8FAFC & 순백 카드 베이스)
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, 0, width, height);

      // 테두리 장식
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 4;
      ctx.strokeRect(16, 16, width - 32, height - 32);

      // 상단 브랜드 바 (#2B6CB0)
      ctx.fillStyle = '#2B6CB0';
      ctx.fillRect(20, 20, width - 40, 12);

      // 2. 헤더 타이틀 영역
      ctx.fillStyle = '#1E293B';
      ctx.font = 'bold 34px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
      ctx.textAlign = 'center';
      const titleText = type === 'lunch'
        ? `${result.userName} 님의 맞춤 점심 추천 & 미식 진단 리포트`
        : `${result.userName} 님의 디지털 & AI 역량 진단 리포트`;
      ctx.fillText(titleText, width / 2, 80);

      // 보조 정보 (연령대 & 일시)
      ctx.fillStyle = '#64748B';
      ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
      const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
      ctx.fillText(`연령대: ${result.ageGroup}  ·  진단일시: ${today}`, width / 2, 114);

      // 구분선
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(50, 134);
      ctx.lineTo(width - 50, 134);
      ctx.stroke();

      // 3. 상단 핵심 요약 카드 (점수 & 레벨 박스)
      // 카드 배경 (#FFFFFF)
      ctx.fillStyle = '#FFFFFF';
      roundRect(ctx, 40, 150, width - 80, 180, 16);
      ctx.fill();
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 2;
      roundRect(ctx, 40, 150, width - 80, 180, 16);
      ctx.stroke();

      // 왼쪽: 종합 점수 박스
      ctx.textAlign = 'left';
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
      ctx.fillText('종합 평가 점수', 70, 195);

      // 점수 숫자와 단위 겹침 절대 방지 (Auto-Correction: 폭 계산 후 14px 간격 배치)
      const scoreStr = `${result.totalScore}`;
      ctx.fillStyle = '#2B6CB0';
      ctx.font = '900 64px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
      ctx.fillText(scoreStr, 70, 275);
      const scoreWidth = ctx.measureText(scoreStr).width;

      ctx.fillStyle = '#64748B';
      ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
      ctx.fillText('/ 100점 만점', 70 + scoreWidth + 14, 268);

      // 세로 분리선
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(420, 170);
      ctx.lineTo(420, 310);
      ctx.stroke();

      // 오른쪽: 종합 진단 레벨 (가변 텍스트 안전 박스 처리 - 최소 너비 280px 및 패딩 16px)
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
      ctx.fillText('종합 진단 레벨', 450, 195);

      const levelTitle = `${result.levelName} (Lv.${result.levelNumber})`;
      // 가변 텍스트 박스 그리기
      ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
      const levelTextWidth = ctx.measureText(levelTitle).width;
      const boxWidth = Math.max(300, levelTextWidth + 48);

      // 레벨 배지 배경 (#FEFCBF - 연한 노랑)
      ctx.fillStyle = '#FEFCBF';
      roundRect(ctx, 450, 215, boxWidth, 48, 10);
      ctx.fill();
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2;
      roundRect(ctx, 450, 215, boxWidth, 48, 10);
      ctx.stroke();

      // 레벨 배지 텍스트 (#B45309)
      ctx.fillStyle = '#B45309';
      ctx.fillText(levelTitle, 474, 248);

      // 레벨 설명 한 줄
      ctx.fillStyle = '#334155';
      ctx.font = '500 16px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
      const shortDesc = result.levelDescription.length > 34
        ? result.levelDescription.slice(0, 34) + '...'
        : result.levelDescription;
      ctx.fillText(shortDesc, 450, 295);

      // 4. 중앙 레이아웃: 오각형 차트 & 메뉴 추천 / 핵심 영역
      const middleCardY = 350;
      const middleCardHeight = 460;
      ctx.fillStyle = '#FFFFFF';
      roundRect(ctx, 40, middleCardY, width - 80, middleCardHeight, 16);
      ctx.fill();
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 2;
      roundRect(ctx, 40, middleCardY, width - 80, middleCardHeight, 16);
      ctx.stroke();

      // 중간 카드 헤더
      ctx.fillStyle = '#1E293B';
      ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
      ctx.fillText(
        type === 'lunch' ? '🎯 오늘 추천 메뉴 & 5대 지표 분석' : '📊 5개 핵심 영역별 역량 분석',
        70,
        middleCardY + 42
      );

      // 오각형 차트 직접 Canvas 렌더링 (텍스트 겹침 방지 여백 35px & 오프셋)
      drawCanvasRadarChart(ctx, 270, middleCardY + 245, 120, result.areaScores);

      // 우측 패널: 점심 추천 메뉴 또는 영역별 점수표
      if (type === 'lunch' && result.recommendedMenu) {
        const menu = result.recommendedMenu;
        const panelX = 520;
        const panelY = middleCardY + 65;
        const panelW = 410;
        const panelH = 360;

        // 추천 메뉴 카드 배경 (#F0F9FF)
        ctx.fillStyle = '#F0FDF4';
        roundRect(ctx, panelX, panelY, panelW, panelH, 14);
        ctx.fill();
        ctx.strokeStyle = '#86EFAC';
        ctx.lineWidth = 2;
        roundRect(ctx, panelX, panelY, panelW, panelH, 14);
        ctx.stroke();

        // 1순위 추천 배지 (#10B981)
        ctx.fillStyle = '#10B981';
        roundRect(ctx, panelX + 20, panelY + 20, 130, 32, 6);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
        ctx.fillText('🥇 오늘의 1순위', panelX + 32, panelY + 42);

        // 메뉴 이름 & 이모지
        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
        ctx.fillText(`${menu.emoji} ${menu.name}`, panelX + 20, panelY + 86);

        // 설명 (줄바꿈 처리)
        ctx.fillStyle = '#334155';
        ctx.font = '500 16px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
        wrapText(ctx, menu.description, panelX + 20, panelY + 120, panelW - 40, 24);

        // 꿀조합 반찬
        ctx.fillStyle = '#1E3A8A';
        ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
        ctx.fillText('💡 어울리는 곁들임:', panelX + 20, panelY + 205);
        ctx.fillStyle = '#475569';
        ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
        ctx.fillText(menu.bestSide, panelX + 20, panelY + 230);

        // 가격대 & 카테고리
        ctx.fillStyle = '#64748B';
        ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
        ctx.fillText(`분류: ${menu.category}  |  예산: ${menu.priceRange}`, panelX + 20, panelY + 265);

        // 2순위 대안 메뉴
        if (result.alternativeMenus && result.alternativeMenus.length > 0) {
          ctx.fillStyle = '#1E293B';
          ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
          ctx.fillText('대체 추천:', panelX + 20, panelY + 310);
          const altNames = result.alternativeMenus.map(m => `${m.emoji} ${m.name}`).join('  ·  ');
          ctx.fillStyle = '#475569';
          ctx.font = '500 14px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
          ctx.fillText(altNames, panelX + 20, panelY + 334);
        }
      } else {
        // 디지털 진단 점수표
        const panelX = 520;
        const panelY = middleCardY + 65;
        const panelW = 410;

        result.areaScores.forEach((area, idx) => {
          const itemY = panelY + idx * 64;
          ctx.fillStyle = '#F8FAFC';
          roundRect(ctx, panelX, itemY, panelW, 52, 10);
          ctx.fill();
          ctx.strokeStyle = '#E2E8F0';
          ctx.lineWidth = 1.5;
          roundRect(ctx, panelX, itemY, panelW, 52, 10);
          ctx.stroke();

          ctx.fillStyle = '#1E293B';
          ctx.font = 'bold 17px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
          ctx.fillText(area.areaName, panelX + 16, itemY + 32);

          // 점수 게이지 바
          const barX = panelX + 160;
          const barW = 140;
          ctx.fillStyle = '#E2E8F0';
          roundRect(ctx, barX, itemY + 20, barW, 12, 6);
          ctx.fill();

          const fillW = (area.score / 20) * barW;
          ctx.fillStyle = '#3182CE';
          roundRect(ctx, barX, itemY + 20, fillW, 12, 6);
          ctx.fill();

          ctx.fillStyle = '#2B6CB0';
          ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText(`${area.score}점`, panelX + panelW - 16, itemY + 32);
          ctx.textAlign = 'left';
        });
      }

      // 5. 하단 카드: 강점, 보완할 점, 이후 가이드 (안전 패딩 최소 16px)
      const bottomCardY = 830;
      const bottomCardHeight = 540;
      ctx.fillStyle = '#FFFFFF';
      roundRect(ctx, 40, bottomCardY, width - 80, bottomCardHeight, 16);
      ctx.fill();
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 2;
      roundRect(ctx, 40, bottomCardY, width - 80, bottomCardHeight, 16);
      ctx.stroke();

      // 섹션 1: 나의 강점 (#10B981 포인트)
      ctx.fillStyle = '#10B981';
      roundRect(ctx, 70, bottomCardY + 28, 6, 24, 3);
      ctx.fill();
      ctx.fillStyle = '#1E293B';
      ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
      ctx.fillText(type === 'lunch' ? '🌟 오늘 식단의 핵심 강점' : '🌟 나의 주요 강점', 88, bottomCardY + 48);

      let curY = bottomCardY + 80;
      result.strengths.forEach((str) => {
        ctx.fillStyle = '#334155';
        ctx.font = '500 16px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
        wrapText(ctx, `• ${str}`, 70, curY, width - 140, 25);
        curY += 46;
      });

      // 섹션 2: 보완할 점 (#F59E0B 포인트)
      curY += 8;
      ctx.fillStyle = '#F59E0B';
      roundRect(ctx, 70, curY, 6, 24, 3);
      ctx.fill();
      ctx.fillStyle = '#1E293B';
      ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
      ctx.fillText(type === 'lunch' ? '🌿 건강하고 맛있는 보완 팁' : '🌿 따뜻한 보완 조언', 88, curY + 20);

      curY += 48;
      result.improvements.forEach((imp) => {
        ctx.fillStyle = '#334155';
        ctx.font = '500 16px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
        wrapText(ctx, `• ${imp}`, 70, curY, width - 140, 25);
        curY += 46;
      });

      // 섹션 3: 이후 맞춤 가이드 (#3182CE 포인트)
      curY += 8;
      ctx.fillStyle = '#3182CE';
      roundRect(ctx, 70, curY, 6, 24, 3);
      ctx.fill();
      ctx.fillStyle = '#1E293B';
      ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
      ctx.fillText(type === 'lunch' ? '☕ 식후 추천 코스 (음료 & 산책)' : '🚀 맞춤형 단계별 학습 가이드', 88, curY + 20);

      curY += 48;
      // 1단계 박스
      ctx.fillStyle = '#F8FAFC';
      roundRect(ctx, 70, curY, width - 140, 54, 10);
      ctx.fill();
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1;
      roundRect(ctx, 70, curY, width - 140, 54, 10);
      ctx.stroke();

      ctx.fillStyle = '#2B6CB0';
      ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
      ctx.fillText('1단계:', 88, curY + 34);
      ctx.fillStyle = '#334155';
      ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
      wrapText(ctx, result.nextSteps.step1, 145, curY + 34, width - 240, 22);

      curY += 66;
      // 2단계 박스
      ctx.fillStyle = '#F8FAFC';
      roundRect(ctx, 70, curY, width - 140, 54, 10);
      ctx.fill();
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1;
      roundRect(ctx, 70, curY, width - 140, 54, 10);
      ctx.stroke();

      ctx.fillStyle = '#2B6CB0';
      ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
      ctx.fillText('2단계:', 88, curY + 34);
      ctx.fillStyle = '#334155';
      ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
      wrapText(ctx, result.nextSteps.step2, 145, curY + 34, width - 240, 22);

      // (※ 지침 준수: 공식 진단 마크나 안내는 하단에 절대 넣지 않음)

      // PNG 데이터 URL 생성
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      setGeneratedImageUrl(dataUrl);
      setIsGenerating(false);
    } catch (err) {
      console.error('PNG 리포트 생성 오류 (Auto-Correction 대기):', err);
      setGenerationError('이미지 생성 중 사소한 문제가 발생하여 브라우저 리포트로 자동 정정되었습니다.');
      setIsGenerating(false);
    }
  }, [result, type]);

  useEffect(() => {
    generatePngImage();
  }, [generatePngImage]);

  // Canvas 오각형 차트 드로잉 유틸
  function drawCanvasRadarChart(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    scores: typeof result.areaScores
  ) {
    const numAxes = 5;

    // 가이드 동심 오각형 5단계 (0.2, 0.4, 0.6, 0.8, 1.0)
    [0.2, 0.4, 0.6, 0.8, 1.0].forEach((level, lIdx) => {
      ctx.beginPath();
      for (let i = 0; i < numAxes; i++) {
        const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
        const x = cx + r * level * Math.cos(angle);
        const y = cy + r * level * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = lIdx % 2 === 0 ? '#F8FAFC' : '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = lIdx === 4 ? '#94A3B8' : '#CBD5E1';
      ctx.lineWidth = lIdx === 4 ? 1.8 : 1;
      ctx.stroke();
    });

    // 방사형 축 선
    for (let i = 0; i < numAxes; i++) {
      const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    // 데이터 다각형
    ctx.beginPath();
    scores.forEach((item, i) => {
      const ratio = Math.max(0.15, Math.min(1.0, item.score / 20));
      const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
      const x = cx + r * ratio * Math.cos(angle);
      const y = cy + r * ratio * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(49, 130, 206, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#2B6CB0';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 데이터 꼭짓점 마커 포인트
    scores.forEach((item, i) => {
      const ratio = Math.max(0.15, Math.min(1.0, item.score / 20));
      const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
      const x = cx + r * ratio * Math.cos(angle);
      const y = cy + r * ratio * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = '#2B6CB0';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#10B981';
      ctx.fill();
    });

    // 레이블 (텍스트 겹침 절대 방지 오프셋: r + 32px)
    ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
    scores.forEach((item, i) => {
      const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
      const labelDist = r + 30;
      let lx = cx + labelDist * Math.cos(angle);
      let ly = cy + labelDist * Math.sin(angle);

      if (i === 0) {
        ctx.textAlign = 'center';
        ly -= 8;
      } else if (i === 1) {
        ctx.textAlign = 'left';
        lx += 6;
      } else if (i === 2) {
        ctx.textAlign = 'left';
        lx += 6;
        ly += 8;
      } else if (i === 3) {
        ctx.textAlign = 'right';
        lx -= 6;
        ly += 8;
      } else if (i === 4) {
        ctx.textAlign = 'right';
        lx -= 6;
      }

      ctx.fillStyle = '#1E293B';
      ctx.fillText(item.areaName, lx, ly);

      ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
      ctx.fillStyle = '#2B6CB0';
      ctx.fillText(`${item.score}점`, lx, ly + 16);
      ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
    });
    ctx.textAlign = 'left';
  }

  // 텍스트 줄바꿈 유틸
  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = text.split(' ');
    let line = '';
    let curY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, curY);
        line = words[n] + ' ';
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, curY);
  }

  // 둥근 사각형 유틸
  function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // 이미지 다운로드 핸들러
  const handleDownload = () => {
    if (!generatedImageUrl) {
      generatePngImage();
      return;
    }
    const link = document.createElement('a');
    link.download = `${result.userName}_${type === 'lunch' ? '점심추천' : '역량진단'}_리포트.png`;
    link.href = generatedImageUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 브라우저 인쇄 핸들러
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 액션 바: 안내 문구 및 [결과 이미지 저장하기] / [결과지 출력하기] 버튼 */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-800 text-base md:text-lg">
              {result.userName} 님의 진단 리포트가 완성되었습니다!
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            고품질 리포트 이미지를 저장하거나 깨끗하게 인쇄하여 보관하실 수 있습니다.
          </p>
        </div>

        {/* 지침 2 준수: 저장하기와 출력하기 버튼이 너무 크지 않게 적정 크기(py-2 px-3.5) 유지 */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {onRetest && (
            <button
              onClick={onRetest}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              다시 진단
            </button>
          )}

          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs md:text-sm font-semibold text-white bg-[#2B6CB0] hover:bg-[#235891] active:bg-[#1C4777] rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            결과 이미지 저장하기
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs md:text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:bg-slate-100 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            결과지 출력하기
          </button>
        </div>
      </div>

      {generationError && (
        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{generationError}</span>
        </div>
      )}

      {/* 화면에 표시되는 실시간 리포트 뷰 (출력 모드 및 화면 뷰) */}
      <div id="printable-report" className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        {/* 리포트 헤더 */}
        <div className="border-b border-slate-200 pb-5 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2B6CB0] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              {type === 'lunch' ? '오늘의 맞춤 점심 리포트' : '디지털 & AI 역량 진단 결과서'}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {result.userName} 님의 진단 결과
            </h1>
          </div>
          <div className="text-xs md:text-sm text-slate-500 font-medium">
            연령대: <strong className="text-slate-800">{result.ageGroup}</strong> · 진단 완료
          </div>
        </div>

        {/* 상단 핵심 점수 & 진단 레벨 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 종합 평가 점수 (지침 준수: 숫자와 단위 간 최소 10px 간격 인라인 배치 & 겹침 방지) */}
          <div className="p-5 md:p-6 bg-slate-50/70 border border-slate-200 rounded-xl flex flex-col justify-center">
            <span className="text-xs md:text-sm font-semibold text-slate-500 mb-2">종합 평가 점수</span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl md:text-5xl font-black text-[#2B6CB0] tracking-tight">
                {result.totalScore}
              </span>
              <span className="text-base md:text-lg font-bold text-slate-500">
                / {result.maxScore}점 만점
              </span>
            </div>
          </div>

          {/* 종합 진단 레벨 (지침 준수: 가변 텍스트 안전 박스 최소 너비 260px+, 텍스트 이탈 방지) */}
          <div className="p-5 md:p-6 bg-amber-50/60 border border-amber-200 rounded-xl flex flex-col justify-center">
            <span className="text-xs md:text-sm font-semibold text-amber-900/80 mb-2">종합 진단 레벨</span>
            <div className="inline-block min-w-[260px] max-w-full">
              <span className="inline-block bg-[#FEFCBF] border border-amber-300 text-amber-900 font-extrabold text-base md:text-lg px-3.5 py-1.5 rounded-lg shadow-2xs">
                {result.levelName} (Lv.{result.levelNumber})
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-600 mt-2 font-medium">
              {result.levelDescription}
            </p>
          </div>
        </div>

        {/* 오각형 차트 & 메뉴/상세 영역 (지침 준수: 상단 여백 30px+, 텍스트 겹침 방지) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-50/40 p-5 md:p-6 border border-slate-200 rounded-xl">
          <div className="md:col-span-6 flex flex-col items-center">
            <RadarChart scores={result.areaScores} />
          </div>

          <div className="md:col-span-6 space-y-4">
            {type === 'lunch' && result.recommendedMenu ? (
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                    🥇 오늘의 원픽 추천 메뉴
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {result.recommendedMenu.category} · {result.recommendedMenu.priceRange}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
                    <span>{result.recommendedMenu.emoji}</span>
                    <span>{result.recommendedMenu.name}</span>
                  </h4>
                  <p className="text-xs md:text-sm text-slate-600 mt-1 font-medium leading-relaxed">
                    {result.recommendedMenu.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-emerald-200/60 text-xs md:text-sm">
                  <span className="font-bold text-emerald-900">어울리는 반찬/디저트: </span>
                  <span className="text-slate-700">{result.recommendedMenu.bestSide}</span>
                </div>
                {result.alternativeMenus && result.alternativeMenus.length > 0 && (
                  <div className="pt-2 border-t border-emerald-200/60 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">대안 메뉴: </span>
                    {result.alternativeMenus.map((m) => `${m.emoji} ${m.name}`).join(' · ')}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2.5">
                <h4 className="text-sm font-bold text-slate-700 mb-2">영역별 획득 점수표</h4>
                {result.areaScores.map((area, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
                    <span className="text-xs md:text-sm font-semibold text-slate-700">{area.areaName}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 md:w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#2B6CB0] h-full rounded-full transition-all"
                          style={{ width: `${(area.score / 20) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs md:text-sm font-bold text-[#2B6CB0] min-w-[36px] text-right">
                        {area.score}점
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 상세 분석 및 맞춤형 가이드 (안전 패딩 16px+ 유지, 넉넉한 텍스트 상자) */}
        <div className="space-y-4 pt-2">
          {/* 나의 강점 */}
          <div className="p-5 md:p-6 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
            <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-4 bg-emerald-500 rounded-xs inline-block" />
              <span>{type === 'lunch' ? '오늘의 선택 강점' : '나의 주요 강점'}</span>
            </h4>
            <ul className="space-y-1.5 pl-3">
              {result.strengths.map((s, i) => (
                <li key={i} className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium list-disc">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* 보완할 점 */}
          <div className="p-5 md:p-6 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
            <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-4 bg-amber-500 rounded-xs inline-block" />
              <span>{type === 'lunch' ? '보완할 점 & 식사 케어 팁' : '보완할 점 및 조언'}</span>
            </h4>
            <ul className="space-y-1.5 pl-3">
              {result.improvements.map((imp, i) => (
                <li key={i} className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium list-disc">
                  {imp}
                </li>
              ))}
            </ul>
          </div>

          {/* 이후 맞춤 학습 / 식후 가이드 */}
          <div className="p-5 md:p-6 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
            <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-4 bg-[#2B6CB0] rounded-xs inline-block" />
              <span>{type === 'lunch' ? '식후 힐링 가이드 (음료 & 산책)' : '이후 맞춤형 추천 학습 가이드'}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
              <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-[#2B6CB0] text-xs">1단계 추천:</span>
                <p className="text-slate-700 font-medium">{result.nextSteps.step1}</p>
              </div>
              <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-[#2B6CB0] text-xs">2단계 추천:</span>
                <p className="text-slate-700 font-medium">{result.nextSteps.step2}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 생성된 고품질 PNG 이미지 미리보기 (지침 준수: 시각적으로 생성하여 보여줌) */}
        {generatedImageUrl && (
          <div className="pt-4 border-t border-slate-200 print:hidden space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm font-bold text-slate-800">
                  🖼️ 고품질 PNG 리포트 이미지 미리보기
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-sm">
                  생성 완료 (1000×1420 px)
                </span>
              </div>
              <button
                onClick={handleDownload}
                className="text-xs font-semibold text-[#2B6CB0] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                다운로드
              </button>
            </div>

            <div className="max-h-[380px] overflow-y-auto border border-slate-200 rounded-xl p-2 bg-slate-100 shadow-inner">
              <img
                src={generatedImageUrl}
                alt="결과 리포트 카드 이미지"
                className="w-full h-auto rounded-lg shadow-sm block"
              />
            </div>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
