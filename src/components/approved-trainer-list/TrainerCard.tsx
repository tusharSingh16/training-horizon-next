"use client";
import Image from 'next/image'

interface TrainerProps {
  trainer: {
    fname: string;
    lname: string;
    email: string;
    phone: string;
  };
}

const TrainerCard: React.FC<TrainerProps> = ({ trainer}) => {
  return (
    <div className="w-80  h-96 flex flex-col items-center justify-center shadow-3xl hover:scale-105 relative ring-1 ring-zinc-200">
      <div className="w-36 h-36 rounded-full bg-sky-400 mb-6">
      <Image src="/img/instructor.png"
          className="object-fill"
          alt=''
          width={200}
          height={200}
        />
      </div>
      <div className="text-xl font-bold">{trainer.fname} {trainer.lname}</div>
      <div className="text-sm text-gray-600">{trainer.email}</div>
      <div className="text-sm text-gray-600">{trainer.phone}</div>
      <div className="w-full ring-1 ring-zinc-200 absolute bottom-0 h-10 flex items-center justify-center">
        <a href="#" className="text-sky-500">Know More</a>
      </div>
    </div>
  )
}

export default TrainerCard