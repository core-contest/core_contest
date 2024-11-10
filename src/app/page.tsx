import React from 'react'
import FluentEmojiTrophy from "@/icons/FluentEmojiTrophy";

export default function Home() {
  return (
      <main className={'flex flex-col justify-between bg-[#141414] min-h-screen px-5'}>
          <div className={'mt-5 flex justify-between rounded-full bg-gray-800 opacity-90 px-4 py-3 items-center'}>
              <div className={'flex items-center gap-x-1 text-gray-300'}><FluentEmojiTrophy />친구들 중 1등이에요</div>
              <button className={'text-white text-[14px] px-3 py-1 rounded-[16px] bg-gray-600'}>랭킹 확인하기</button>
          </div>
          <div className={'flex flex-col gap-y-8 justify-center items-center'}>
              <div className={'text-white text-[18px]'}>내 최고 기록 <span className={'text-[12px]'}>| </span> 55점</div>
              {/*TODO: 변경 높이, 길이*/}
              <div className={'flex items-center justify-center w-[300px] h-[300px]'}>
                  <div
                      className={'flex flex-col justify-center items-center w-[300px] h-[300px] rounded-full border-[5px] border-white'}>
                      <div className={'text-[30px] text-red-400'}>37<span className={'text-white'}>점</span></div>
                      <div className={'text-white'}>이렇게 뾰족한 원은 처음봐요</div>
                  </div>
              </div>
          </div>
          <div>
              <div className={'flex flex-col justify-center items-center text-white'}>
                  <div className={'text-gray-400 text-[18px]'}>도전 기회 <span className={'text-red-400'}>2번</span> 남음</div>
                  <div className={'text-[20px] font-semibold'}></div>
              </div>
              <button className={'mt-5 w-full mb-5 bg-red-400 text-white py-4 rounded-[8px] text-[18px]'}>다시 그리기</button>
          </div>
      </main>
  );
}
