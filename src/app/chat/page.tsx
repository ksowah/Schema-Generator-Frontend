"use client";

import Container from "@/components/container";
import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_PROJECTS } from "./apollo";
import Link from "next/link";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { PlusIcon } from "@heroicons/react/24/outline";

const ChatPage = () => {
  const { data, loading, refetch } = useQuery(GET_PROJECTS);
  const router = useRouter()

  useEffect(() => {
   refetch()
  }, [refetch])

  return (
    <Container>
      <div className="py-6 flex flex-col items-center text-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          [...data?.projects]?.reverse().map((project: any, idx: number) => (
            <Link
              href={`/chat/${project?._id}`}
              className="text-[1.2rem] font-medium mb-4"
              key={idx}
            >
              {project?.name}
            </Link>
          ))
        )}

        <Button
          w={200}
          onClick={()=>router.push("/chat/chat-room")}
          leftSection={<PlusIcon className="w-5 h-5 text-white" />}
          className={cn(
            "rounded-lg bg-black text-white font-semibold transition duration-300 hover:bg-gray-900 mt-8")}
        >
          New Project
        </Button>
      </div>
    </Container>
  );
};

export default ChatPage;
