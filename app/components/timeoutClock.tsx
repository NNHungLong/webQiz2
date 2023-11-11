interface Props {
  timeLeft: number;
}

export default function TimeoutClock({ timeLeft }: Props) {
  return (
    <div className='m-4 font-bold text-lg'>
      <h1 className='text-center'>
        Time Remaining: {timeLeft + (timeLeft > 1 ? ' seconds' : ' second')}
      </h1>
    </div>
  );
}
