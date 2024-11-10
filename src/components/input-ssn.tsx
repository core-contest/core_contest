import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export function InputSSN() {
  return (
    <InputOTP maxLength={10}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSeparator />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
        <InputOTPSlot index={6} />
        <InputOTPSeparator />
        <InputOTPSlot index={7} />
        <InputOTPSlot index={8} />
        <InputOTPSlot index={9} />
      </InputOTPGroup>
    </InputOTP>
  );
}
