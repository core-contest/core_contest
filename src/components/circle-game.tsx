'use client';

import { useState, useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  messageAtom,
  accuracyAtom,
  timeLeftAtom,
  userPointsAtom,
  userDataAtom,
} from '@/store';
import { postGameStart } from '@/lib/api/game';
import Cookies from 'js-cookie';
import { getMemberStatus } from '@/lib/api/login';
import html2canvas from 'html2canvas';

export default function CircleGame() {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<SVGSVGElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const [userData, setUserData] = useAtom(userDataAtom);

  const [timeLeft, setTimeLeft] = useAtom(timeLeftAtom);
  const [userPoints, setUserPoints] = useAtom(userPointsAtom);
  const [accuracy, setAccuracy] = useAtom(accuracyAtom);
  const [message, setMessage] = useAtom(messageAtom);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleTimeout = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTimeLeft(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (
      !canvasRef.current ||
      timeLeft === null ||
      timeLeft <= 0 ||
      userData?.tryCount <= 0
    )
      return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setUserPoints([{ x, y }]);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 0) {
          handleMouseUp();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (
      !isDrawing ||
      !canvasRef.current ||
      timeLeft === null ||
      timeLeft <= 0 ||
      userData?.tryCount <= 0
    )
      return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setUserPoints((prev) => [...prev, { x, y }]);
  };

  const calculateAccuracy = (points: { x: number; y: number }[]) => {
    if (points.length < 70) {
      return { message: '원을 제대로 그려 주세요.', accuracy: 0 };
    }

    const centerX = 200;
    const centerY = 200;
    const targetRadius = 150;

    const startPoint = points[0];
    const endPoint = points[points.length - 1];
    const endDistance = Math.sqrt(
      Math.pow(endPoint.x - startPoint.x, 2) +
        Math.pow(endPoint.y - startPoint.y, 2)
    );

    if (endDistance > 50) {
      return { message: '시작점과 끝점이 너무 멀어요.', accuracy: 0 };
    }

    const distances = points.map((point) => {
      return Math.sqrt(
        Math.pow(point.x - centerX, 2) + Math.pow(point.y - centerY, 2)
      );
    });

    const isWithinRange = distances.every((d) => d >= 120 && d <= 180);

    if (!isWithinRange) {
      return { message: '원이 기준선을 벗어났습니다.', accuracy: 0 };
    }

    const radiusDeviation = distances.map(
      (d) => Math.abs(d - targetRadius) / targetRadius
    );

    const avgRadiusDeviation =
      radiusDeviation.reduce((a, b) => a + b) / radiusDeviation.length;

    const baseAccuracy = Math.max(0, 100 * (1 - avgRadiusDeviation * 4));
    const finalAccuracy = Number(baseAccuracy.toFixed(2));

    return { message: '', accuracy: finalAccuracy };
  };

  const handleMouseUp = async () => {
    setIsDrawing(false);
    handleTimeout();

    if (timeLeft === null || timeLeft <= 0) return;

    const result = calculateAccuracy(userPoints);
    setMessage(result.message);
    setAccuracy(result.accuracy);

    // SVG를 포함한 div 요소 캡처
    const captureElement = canvasRef.current?.parentElement;
    if (!captureElement) return;

    try {
      const canvas = await html2canvas(captureElement, {
        backgroundColor: '#141414',
        scale: 1,
        logging: false,
        useCORS: true,
        ignoreElements: (element) => {
          // score-text 클래스를 가진 요소 무시
          return element.classList.contains('score-text');
        },
      });

      canvas.toBlob(
        async (blob) => {
          if (!blob) return;
          const imageFile = new File([blob], 'circle.png', {
            type: 'image/png',
          });
          // setPreviewUrl(URL.createObjectURL(blob));
          // console.log('캡처된 이미지:', imageFile);

          await postGameStart(userData.ssn, result.accuracy, imageFile);
          await getMemberStatus(
            JSON.parse(Cookies.get('user') || '{}').ssn
          ).then((data: any) => {
            setUserData(data);
          });
        },
        'image/png',
        1.0
      );
    } catch (error) {
      console.error('이미지 캡처 중 오류 발생:', error);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (
      !canvasRef.current ||
      timeLeft === null ||
      timeLeft <= 0 ||
      userData?.tryCount <= 0
    )
      return;
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setIsDrawing(true);
    setUserPoints([{ x, y }]);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 0) {
          handleTouchEnd();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (
      !isDrawing ||
      !canvasRef.current ||
      timeLeft === null ||
      timeLeft <= 0 ||
      userData?.tryCount <= 0
    )
      return;
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setUserPoints((prev) => [...prev, { x, y }]);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  useEffect(() => {
    // 데이터 받아와 state 에 등록
    getMemberStatus(JSON.parse(Cookies.get('user') || '{}').ssn).then(
      (data: any) => {
        setUserData(data);
      }
    );

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="touch-none">
      {/* SVG를 감싸는 div에 id 추가 */}
      <div
        id="capture-area"
        className="relative"
      >
        <svg
          ref={canvasRef}
          className="w-[400px] h-[400px] bg-background relative"
          width="400"
          height="400"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'none' }}
        >
          {/* 기준이 되는 원 */}
          <circle
            cx="200"
            cy="200"
            r="150"
            className="stroke-gray-300"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
          />

          {/* 중앙 정확도 텍스트 */}
          <foreignObject
            x="150"
            y="180"
            width="120"
            height="60"
            className="score-text"
          >
            <div className="text-center font-bold select-none text-red-400 text-[30px]">
              {accuracy ? accuracy.toFixed(2) : '00.00'}
              <span className="text-white">점</span>
            </div>
          </foreignObject>

          {/* 사용자가 그린 선 */}
          {userPoints.length > 1 && (
            <path
              d={`M ${userPoints.map((p) => `${p.x} ${p.y}`).join(' L ')}`}
              className="stroke-blue-500"
              strokeWidth="6"
              fill="none"
            />
          )}
        </svg>
      </div>

      <div className="text-xl font-semibold text-red-500 text-center">
        남은 시간: {timeLeft ? timeLeft : '0'}초
      </div>

      {/* 이미지 미리보기 추가 */}
      {/* {previewUrl && (
        <div className='mt-4'>
          <img
            src={previewUrl}
            alt='미리보기'
            className='w-[400px] h-[400px]'
          />
        </div>
      )} */}
    </div>
  );
}
