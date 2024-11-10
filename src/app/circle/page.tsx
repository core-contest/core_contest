'use client';

import React, { useEffect, useState } from 'react';
import FluentEmojiTrophy from '@/icons/FluentEmojiTrophy';
import CircleGame from '@/components/circle-game';
import { useAtom } from 'jotai';
import {
  accuracyAtom,
  messageAtom,
  timeLeftAtom,
  userPointsAtom,
  userDataAtom,
} from '@/store';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { getRankList } from '@/lib/api/rank';
import Cookies from 'js-cookie';

export default function Home() {
  const [userPoints, setUserPoints] = useAtom(userPointsAtom);
  const [accuracy, setAccuracy] = useAtom(accuracyAtom);
  const [message, setMessage] = useAtom(messageAtom);
  const [timeLeft, setTimeLeft] = useAtom(timeLeftAtom);
  const [userData, setUserData] = useAtom(userDataAtom);
  const [myRank, setMyRank] = useState<number>();
  const router = useRouter();

  const handleReset = () => {
    setUserPoints([]);
    setAccuracy(null);
    setMessage(null);
    setTimeLeft(3);
  };

  useEffect(() => {
    getRankList(JSON.parse(Cookies.get('user') || '{}').ssn).then((r) => {
      setMyRank(r.data.data.myRank);
    });
  }, []);

  return (
    <main
      className={
        'flex flex-col justify-between bg-background min-h-screen px-5'
      }
    >
      <div
        className={
          'mt-5 flex justify-between rounded-full bg-gray-800 opacity-90 px-4 py-3 items-center'
        }
      >
        <div className={'flex items-center gap-x-1 text-gray-300'}>
          <FluentEmojiTrophy />
          친구들 중 {myRank}등이에요
        </div>
        <button
          className={
            'text-white text-[14px] px-3 py-1 rounded-[16px] bg-gray-600'
          }
          onClick={() => {
            router.push('/rank');
          }}
        >
          랭킹 확인하기
        </button>
      </div>
      <div className={'flex flex-col gap-y-8 justify-center items-center'}>
        <div className={'text-white text-[18px]'}>
          내 최고 기록 <span className={'text-[12px]'}>| </span>{' '}
          {userData?.bestScore}점
        </div>
        <CircleGame />
      </div>
      <div>
        <div className={'flex flex-col justify-center items-center text-white'}>
          <div className={'text-gray-400 text-[18px]'}>
            도전 기회{' '}
            <span className={'text-red-400'}>{userData?.tryCount}</span> 남음
          </div>
          <div className={'text-[20px] font-semibold'}></div>
        </div>
        <Button
          className={
            'mt-5 w-full mb-5 bg-red-400 h-15 text-white py-4 rounded-[8px] text-[18px]'
          }
          onClick={handleReset}
          disabled={!!timeLeft || userData?.tryCount <= 0}
        >
          다시 그리기
        </Button>
      </div>
    </main>
  );
}
