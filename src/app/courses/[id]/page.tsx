"use client";
import ListingDetail from "@/components/listing-detail/ListingDetail";
import { useParams } from "next/navigation";

export default function Home() {
  // const { id } = useParams<{ id: string }>();
  // console.log(id);
  return (
    <div>
      <ListingDetail />
    </div>
  );
}
