'use client';

import React, { useEffect, useState } from 'react';
import { getBonusChance } from '@/lib/api/rank';
import { getUserList } from '@/lib/api/admin';
import Cookies from 'js-cookie';

const AdminPage = () => {
  const [userList, setUserList] = useState([]); // 초기 상태는 빈 배열
  const [userSsn, setUserSsn] = useState(0);

  useEffect(() => {
    getUserList().then((r) => {
      // 데이터 덮어쓰기 (prevState 사용 X)
      setUserList(r.data.data);
      console.log('r', r.data.data);
    });
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시 한 번만 실행

  return (
    <div className={'dark bg-background min-h-screen'}>
      <div className={'mx-5'}>
        <div className={'pt-5 text-white text-[24px]'}>사용자 정보</div>
        {userList.map((user: any, index: number) => {
          return (
            <section
              key={user.ssn}
              className={'border-b border-gray-600 px-3 py-4'}
            >
              <div className={'flex justify-between items-center'}>
                <div className={'flex gap-x-5'}>
                  <div className={'text-[18px] text-red-400'}>{index + 1}</div>
                  <div>
                    <div className={'text-white text-[14px]'}>
                      {user.name} / {user.ssn} / {user.phoneNumber}
                    </div>
                    <div className={'text-gray-400 text-[14px]'}>
                      {user.bestScore}점
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    //TODO: 학번 번호 바꾸기
                    getBonusChance(
                      user.ssn,
                      JSON.parse(Cookies.get('user') || '{}').ssn
                    );
                  }}
                  className={
                    'text-white text-[14px] px-3 py-1 rounded-[16px] bg-gray-600'
                  }
                >
                  추가하기
                </button>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
export default AdminPage;
