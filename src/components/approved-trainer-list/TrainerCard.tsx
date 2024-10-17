"use client";
import Image from 'next/image'
import Link from 'next/link';

interface TrainerProps {
  trainer: {
    fname: string;
    lname: string;
    email: string;
    phone: string;
    _id: string;
  };
}

const TrainerCard: React.FC<TrainerProps> = ({ trainer }) => {
  console.log(trainer._id);
  return (
    <div className="w-80  h-96 flex flex-col overflow-hidden rounded-sm shadow-3xl hover:scale-105 hover:ring-sky-500 ring-1 ring-zinc-200">
      <div className="h-5/6 w-full flex items-center justify-center flex-col">
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
      </div>

      <div className="w-full ring-1 ring-zinc-200 h-1/6 flex items-center justify-center">
        <Link href={`/dashboard/teacher/${trainer._id}`} className="text-sky-500">Know More</Link>
      </div>
    </div>
  )
}

export default TrainerCard;
