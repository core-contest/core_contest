'use client';

import React, { useEffect, useState } from 'react';
import {getBonusChance} from '@/lib/api/rank';
import { getUserList } from '@/lib/api/admin';
import Cookies from 'js-cookie';

const AdminPage = () => {
    const [userList, setUserList] = useState<any[]>([]); // 초기 상태는 빈 배열

  useEffect(() => {
    getUserList().then((r) => {
      setUserList(r.data.data);
    });
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시 한 번만 실행

    const handleBonusChance = (ssn: number) => {
        const adminSsn = JSON.parse(Cookies.get('user') || '{}').ssn;
        getBonusChance(ssn, adminSsn).then(() => {
            // getRankList로 사용자 정보 가져오기
            getUserList().then((r) => {
                console.log('업데이트된 사용자 정보', r);
                setUserList(r.data.data); // 상태 업데이트
            });
        });
    };

    return (
        <div className={'dark bg-background min-h-screen'}>
            <div className={'mx-5'}>
                <div className={'pt-5 text-white text-[24px]'}>사용자 정보</div>
                {userList.map((user, index) => {
                    return (
                        <section key={user.ssn} className={'border-b border-gray-600 px-3 py-4'}>
                            <div className={'flex justify-between items-center'}>
                                <div className={'flex gap-x-5 w-[60%]'}>
                                    <div className={'text-[18px] text-red-400'}>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <div className={'text-white text-[14px]'}>{user.name} / {user.ssn} / {user.phoneNumber}</div>
                                        <div className={'text-gray-400 text-[14px]'}>{user.tryCount}회 / {user.bestScore}점</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        handleBonusChance(user.ssn)
                                    }}
                                    className={'text-white text-[14px] px-3 py-1 rounded-[16px] bg-gray-600 active:bg-gray-700 hover:scale-110 transition'}>추가하기
                                </button>
                            </div>
                        </section>
                    )
                })}
            </div>
        </div>
    )
}
export default AdminPage;
