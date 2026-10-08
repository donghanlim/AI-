import React from 'react';
import { AreaScore } from '../types';

interface RadarChartProps {
  scores: AreaScore[];
  width?: number;
  height?: number;
  showSubtitle?: boolean;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  scores,
  width = 460,
  height = 380,
  showSubtitle = true
}) => {
  const cx = width / 2;
  const cy = height / 2 + 18; // 살짝 아래로 배치하여 상단 30px+ 여유 패딩 확보
  const radius = 100;
  const numAxes = 5;

  // 5개 꼭짓점 각도 계산 (-90도가 상단 꼭짓점)
  const getCoordinates = (index: number, r: number) => {
    const angle = (Math.PI * 2 / numAxes) * index - Math.PI / 2;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      angle
    };
  };

  // 배경 오각형 가이드라인 (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const gridPolygons = gridLevels.map((level) => {
    const points = Array.from({ length: numAxes }).map((_, i) => {
      const { x, y } = getCoordinates(i, radius * level);
      return `${x},${y}`;
    }).join(' ');
    return points;
  });

  // 실제 데이터 오각형 좌표
  const dataPoints = scores.map((item, i) => {
    const ratio = Math.max(0.15, Math.min(1.0, item.score / (item.maxScore || 20)));
    const { x, y } = getCoordinates(i, radius * ratio);
    return { x, y };
  });

  const dataPolygonString = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="w-full flex flex-col items-center select-none">
      {showSubtitle && (
        <div className="text-center mb-2">
          <p className="text-xs md:text-sm font-semibold text-slate-700 tracking-wide">
            5개 핵심 영역별 역량 분석 오각형 차트
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            중심에서 외곽으로 갈수록 높은 점수(만점 20점)를 나타냅니다
          </p>
        </div>
      )}

      <div className="w-full max-w-[480px] overflow-visible">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto drop-shadow-sm overflow-visible"
        >
          {/* 가이드 동심 오각형 그리드 */}
          {gridPolygons.map((points, idx) => (
            <polygon
              key={`grid-${idx}`}
              points={points}
              fill={idx % 2 === 0 ? '#F8FAFC' : '#FFFFFF'}
              stroke="#CBD5E1"
              strokeWidth={idx === gridPolygons.length - 1 ? '1.8' : '1'}
              strokeDasharray={idx === gridPolygons.length - 1 ? 'none' : '3 3'}
            />
          ))}

          {/* 중심에서 꼭짓점으로 뻗는 축 라인 */}
          {Array.from({ length: numAxes }).map((_, i) => {
            const { x, y } = getCoordinates(i, radius);
            return (
              <line
                key={`axis-${i}`}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="#94A3B8"
                strokeWidth="1.2"
              />
            );
          })}

          {/* 데이터 영역 폴리곤 */}
          <polygon
            points={dataPolygonString}
            fill="#3182CE"
            fillOpacity="0.28"
            stroke="#2B6CB0"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* 데이터 꼭짓점 마커 포인트 */}
          {dataPoints.map((p, i) => (
            <g key={`marker-${i}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r="6"
                fill="#FFFFFF"
                stroke="#2B6CB0"
                strokeWidth="2.5"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="3"
                fill="#10B981"
              />
            </g>
          ))}

          {/* 꼭짓점 레이블 & 점수 텍스트 (텍스트 겹침 절대 방지 오프셋) */}
          {scores.map((item, i) => {
            // 레이블 배치 거리: radius + 34px (충분한 외곽 오프셋)
            const labelCoord = getCoordinates(i, radius + 34);
            let textAnchor: 'middle' | 'start' | 'end' = 'middle';
            let dy = 0;

            if (i === 0) {
              // 상단 꼭짓점: 확실하게 위쪽으로 올리고 dy 조정
              textAnchor = 'middle';
              dy = -6;
            } else if (i === 1) {
              // 우상단
              textAnchor = 'start';
              dy = -2;
            } else if (i === 2) {
              // 우하단
              textAnchor = 'start';
              dy = 12;
            } else if (i === 3) {
              // 좌하단
              textAnchor = 'end';
              dy = 12;
            } else if (i === 4) {
              // 좌상단
              textAnchor = 'end';
              dy = -2;
            }

            return (
              <g
                key={`label-${i}`}
                transform={`translate(${labelCoord.x}, ${labelCoord.y + dy})`}
              >
                {/* 텍스트 가독성을 위한 배경 필터/배지 */}
                <text
                  textAnchor={textAnchor}
                  className="font-bold text-[13px] fill-[#1E293B]"
                  style={{
                    paintOrder: 'stroke fill',
                    stroke: '#FFFFFF',
                    strokeWidth: 4,
                    strokeLinejoin: 'round'
                  }}
                >
                  {item.areaName}
                </text>
                <text
                  y="16"
                  textAnchor={textAnchor}
                  className="font-extrabold text-[12px] fill-[#2B6CB0]"
                  style={{
                    paintOrder: 'stroke fill',
                    stroke: '#FFFFFF',
                    strokeWidth: 3.5,
                    strokeLinejoin: 'round'
                  }}
                >
                  {item.score}점 <tspan className="text-[10px] fill-slate-500 font-normal">/ 20</tspan>
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
