'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { postLoginData } from '@/lib/api/login';

export function LoginForm() {
  const handleSubmit = (e: any) => {
    e.preventDefault();

    postLoginData({
      name: e.target.name.value,
      ssn: e.target.ssn.value,
      phone: e.target.phone.value,
    });
  };

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-2xl'>로그인</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>
                이름 <span className='text-red-400'>*</span>
              </Label>
              <Input id='name' type='text' placeholder='홍길동' required />
            </div>

            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='ssn'>
                  학번 <span className='text-red-400'>*</span>
                </Label>
              </div>
              <Input id='ssn' type='text' placeholder='2024035234' required />
            </div>

            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='phone'>전화번호</Label>
              </div>
              <Input id='phone' type='text' placeholder='01012345678' />
            </div>

            <Button type='submit' className='w-full font-bold'>
              로그인
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}