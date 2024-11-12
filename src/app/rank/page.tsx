'use client';

import { FluentEmoji1stPlaceMedal } from '@/icons/FluentEmoji1stPlaceMedal';
import { FluentEmoji2ndPlaceMedal } from '@/icons/FluentEmoji2ndPlaceMedal';
import { FluentEmoji3rdPlaceMedal } from '@/icons/FluentEmoji3rdPlaceMedal';
import FluentEmojiTrophy from '@/icons/FluentEmojiTrophy';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRankList } from '@/lib/api/rank';
import Cookies from 'js-cookie';
import { RankResponseType } from '@/type/rank';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const RankPage = () => {
  const router = useRouter();
  const [rankList, setRankList] = useState<any[]>([]); // 초기 상태는 빈 배열
  const [rankNumber, setRankNumber] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchRankList = async () => {
    try {
      const user = JSON.parse(Cookies.get('user') || '{}');
      if (!user || !user.ssn) {
        console.error('Invalid user data');
        return;
      }

      const response = await getRankList(user.ssn);
      const rankDataList = response?.data?.data?.rankList || [];
      const rankNumber = response?.data?.data?.myRank;

      // undefined 값 제거
      const filteredRankList = rankDataList.filter(
        (item: any) => item !== undefined
      );
      setRankList(filteredRankList);
      setRankNumber(rankNumber);
    } catch (error) {
      console.error('Error fetching rank list:', error);
    }
  };

  useEffect(() => {
    fetchRankList().then((r) => {
      console.log('r', r);
    });
  }, []);

  useEffect(() => {
    console.log('rankList', rankList);
  }, [rankList]);

  useEffect(() => {
    console.log('rankNumber', rankNumber);
  }, [rankNumber]);

  return (
    <main className={'dark bg-background min-h-screen'}>
      <div className={'flex flex-col mx-5'}>
        <div className={'pt-5 flex justify-between items-center'}>
          <div className={'text-white text-[24px]'}>랭킹 순위</div>
          <button
            className={'text-[14px]'}
            onClick={async () => {
              Cookies.remove('user');
              window.location.href = '/';
            }}
          >
            로그아웃
          </button>
        </div>
        <div
          className={
            'mt-3 flex justify-between rounded-full bg-gray-800 opacity-90 px-4 py-3 items-center'
          }
        >
          <div className={'flex items-center gap-x-1 text-gray-300'}>
            <FluentEmojiTrophy />
            친구들 중 {rankNumber}등이에요
          </div>
          <button
            onClick={() => {
              router.push('/');
            }}
            className={
              'text-white text-[14px] px-3 py-1 rounded-[16px] bg-gray-600'
            }
          >
            게임 돌아가기
          </button>
        </div>
        <div className={'mt-3'}>
          {rankList[0] && (
            <div
              className={'py-4 border-b border-gray-600 cursor-pointer'}
              onClick={() => {
                if (rankList[0]?.bestScoreImageUrl) {
                  setSelectedImage(rankList[0].bestScoreImageUrl);
                  setIsDialogOpen(true);
                }
              }}
            >
              <div className={'flex items-center gap-x-3'}>
                <FluentEmoji1stPlaceMedal />
                <div>
                  <div className={'text-white text-[14px]'}>
                    {rankList[0]?.name} / {rankList[0]?.ssn}
                  </div>
                  <div className={'text-gray-400 text-[14px]'}>
                    {rankList[0]?.score}점
                  </div>
                </div>
              </div>
            </div>
          )}
          {rankList[1] && (
            <div
              className={'py-4 border-b border-gray-600 cursor-pointer'}
              onClick={() => {
                if (rankList[1]?.bestScoreImageUrl) {
                  setSelectedImage(rankList[1].bestScoreImageUrl);
                  setIsDialogOpen(true);
                }
              }}
            >
              <div className={'flex items-center gap-x-3'}>
                <FluentEmoji2ndPlaceMedal />
                <div>
                  <div className={'text-white text-[14px]'}>
                    {rankList[1]?.name} / {rankList[1]?.ssn}
                  </div>
                  <div className={'text-gray-400 text-[14px]'}>
                    {rankList[1]?.score}점
                  </div>
                </div>
              </div>
            </div>
          )}
          {rankList[2] && (
            <div
              className={'py-4 border-b border-gray-600 cursor-pointer'}
              onClick={() => {
                if (rankList[2]?.bestScoreImageUrl) {
                  setSelectedImage(rankList[2].bestScoreImageUrl);
                  setIsDialogOpen(true);
                }
              }}
            >
              <div className={'flex items-center gap-x-3'}>
                <FluentEmoji3rdPlaceMedal />
                <div>
                  <div className={'text-white text-[14px]'}>
                    {rankList[2]?.name} / {rankList[2]?.ssn}
                  </div>
                  <div className={'text-gray-400 text-[14px]'}>
                    {rankList[2]?.score}점
                  </div>
                </div>
              </div>
            </div>
          )}
          {rankList[3] &&
            rankList.slice(3).map((rank, index) => {
              return (
                <div
                  key={rank?.ssn}
                  className={
                    'border-b border-gray-600 px-3 py-4 cursor-pointer'
                  }
                  onClick={() => {
                    if (rank?.bestScoreImageUrl) {
                      setSelectedImage(rank.bestScoreImageUrl);
                      setIsDialogOpen(true);
                    }
                  }}
                >
                  <div
                    className={
                      'flex items-center gap-x-5 text-[18px] text-red-400'
                    }
                  >
                    {index + 4}
                    <div>
                      <div className={'text-white text-[14px]'}>
                        {rank?.name} / {rank?.ssn}
                      </div>
                      <div className={'text-gray-400 text-[14px]'}>
                        {rank?.score}점
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>최고 점수 스크린샷</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <img
              src={selectedImage}
              alt='Best Score Screenshot'
              className='w-full h-auto'
            />
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};
export default RankPage;
