'use client';

import {FluentEmoji1stPlaceMedal} from "@/icons/FluentEmoji1stPlaceMedal";
import {FluentEmoji2ndPlaceMedal} from "@/icons/FluentEmoji2ndPlaceMedal";
import {FluentEmoji3rdPlaceMedal} from "@/icons/FluentEmoji3rdPlaceMedal";
import FluentEmojiTrophy from "@/icons/FluentEmojiTrophy";
import React from "react";
import {useRouter} from "next/navigation";

const RankPage = () => {
    const router = useRouter();
    return (
        <main className={'dark bg-background min-h-screen'}>
            <div className={'flex flex-col mx-5'}>
                <div className={'pt-5 text-white text-[24px]'}>랭킹 순위</div>
                <div className={'mt-3 flex justify-between rounded-full bg-gray-800 opacity-90 px-4 py-3 items-center'}>
                    <div className={'flex items-center gap-x-1 text-gray-300'}><FluentEmojiTrophy/>친구들 중 1등이에요</div>
                    <button
                        onClick={() => {
                            router.push('/')
                        }}
                        className={'text-white text-[14px] px-3 py-1 rounded-[16px] bg-gray-600'}>게임 돌아가기
                    </button>
                </div>
                <div className={'mt-3'}>
                    <div className={'py-4 border-b border-gray-600'}>
                        <div className={'flex items-center gap-x-3'}>
                            <FluentEmoji1stPlaceMedal/>
                            <div>
                                <div className={'text-white text-[14px]'}>황유림 / 2021070015</div>
                                <div className={'text-gray-400 text-[14px]'}>55점</div>
                            </div>
                        </div>
                    </div>
                    <div className={'py-4 border-b border-gray-600'}>
                        <div className={'flex items-center gap-x-3'}>
                            <FluentEmoji2ndPlaceMedal/>
                            <div>
                                <div className={'text-white text-[14px]'}>황유림 / 2021070015</div>
                                <div className={'text-gray-400 text-[14px]'}>55점</div>
                            </div>
                        </div>
                    </div>
                    <div className={'py-4 border-b border-gray-600'}>
                        <div className={'flex items-center gap-x-3'}>
                            <FluentEmoji3rdPlaceMedal/>
                            <div>
                                <div className={'text-white text-[14px]'}>황유림 / 2021070015</div>
                                <div className={'text-gray-400 text-[14px]'}>55점</div>
                            </div>
                        </div>
                    </div>
                    <div className={'border-b border-gray-600 px-3 py-4'}>
                        <div className={'flex items-center gap-x-5 text-[18px] text-red-400'}>
                            4
                            <div>
                                <div className={'text-white text-[14px]'}>황유림 / 2021070015</div>
                                <div className={'text-gray-400 text-[14px]'}>55점</div>
                            </div>
                        </div>
                    </div>
                    <div className={'border-b border-gray-600 px-3 py-4'}>
                        <div className={'flex items-center gap-x-5 text-[18px] text-red-400'}>
                            5
                            <div>
                                <div className={'text-white text-[14px]'}>황유림 / 2021070015</div>
                                <div className={'text-gray-400 text-[14px]'}>55점</div>
                            </div>
                        </div>
                    </div>
                    <div className={'border-b border-gray-600 px-3 py-4'}>
                        <div className={'flex items-center gap-x-5 text-[18px] text-red-400'}>
                            6
                            <div>
                                <div className={'text-white text-[14px]'}>황유림 / 2021070015</div>
                                <div className={'text-gray-400 text-[14px]'}>55점</div>
                            </div>
                        </div>
                    </div>
                    <div className={'border-b border-gray-600 px-3 py-4'}>
                        <div className={'flex items-center gap-x-5 text-[18px] text-red-400'}>
                            7
                            <div>
                                <div className={'text-white text-[14px]'}>황유림 / 2021070015</div>
                                <div className={'text-gray-400 text-[14px]'}>55점</div>
                            </div>
                        </div>
                    </div>
                    <div className={'border-b border-gray-600 px-3 py-4'}>
                        <div className={'flex items-center gap-x-5 text-[18px] text-red-400'}>
                            8
                            <div>
                                <div className={'text-white text-[14px]'}>황유림 / 2021070015</div>
                                <div className={'text-gray-400 text-[14px]'}>55점</div>
                            </div>
                        </div>
                    </div>
                    <div className={'border-b border-gray-600 px-3 py-4'}>
                        <div className={'flex items-center gap-x-5 text-[18px] text-red-400'}>
                            9
                            <div>
                                <div className={'text-white text-[14px]'}>황유림 / 2021070015</div>
                                <div className={'text-gray-400 text-[14px]'}>55점</div>
                            </div>
                        </div>
                    </div>
                    <div className={'border-b border-gray-600 px-3 py-4'}>
                        <div className={'flex items-center gap-x-5 text-[18px] text-red-400'}>
                            10
                            <div>
                                <div className={'text-white text-[14px]'}>황유림 / 2021070015</div>
                                <div className={'text-gray-400 text-[14px]'}>55점</div>
                            </div>
                        </div>
                    </div>
                    <div className={'border-b border-gray-600  px-3 py-4'}>
                        <div className={'flex items-center gap-x-5 text-[18px] text-red-400'}>
                            11
                            <div>
                                <div className={'text-white text-[14px]'}>황유림 / 2021070015</div>
                                <div className={'text-gray-400 text-[14px]'}>55점</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default RankPage;
