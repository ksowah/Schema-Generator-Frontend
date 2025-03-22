"use client";

import Container from "@/components/container";
import Nav from "@/components/nav";
import { cn } from "@/utils/cn";
import { currentUserVar } from "@/worker/auth";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ArrowLongUpIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useRef, useState } from "react";
import { CREATE_PROJECT, GET_CHAT, STREAM_CHAT } from "./apollo";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { chatMessages } from "@/utils/mock-db";
import SchemaVisualizer from "@/components/chat-response";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useUrlState } from "@/utils/use-url-state";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";

// Add Type for Chat Message
interface ChatMessage {
  prompt: string;
  message: string;
}

const ChatRoomPage = () => {
  const currentUser = useReactiveVar(currentUserVar);
  const [activeChats, setActiveChats] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [chatId, setChatId] = useUrlState("chatId");

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [streamChat] = useMutation(STREAM_CHAT);
  const [createProject, { loading: createProjectLoading }] =
    useMutation(CREATE_PROJECT);
  const { data } = useQuery(GET_CHAT, {
    variables: { id: chatId },
    skip: !chatId,
  });


  const form = useForm({
    initialValues: {
      prompt: "",
    },
    validate: zodResolver(
      z.object({
        prompt: z.string(),
      }),
    ),
  });

  const handleCreateProject = async () => {
    const lastIdx = chatMessages?.length - 1;

    const variables = {
      name: data?.chat?.name,
      description: chatMessages[lastIdx].prompt,
      aiResponse: chatMessages[lastIdx].message,
    }
    
    await createProject({
      variables,
    }).then(({ data }) => {
      if (data?.createProject?._id) {
        toast.success("Project Saved successfully");
      }
    });
  };

  const handleSubmit = async (values: { prompt: string }) => {
    setLoading(true);

    const { data } = await streamChat({
      variables: {
        ...values,
        chatId,
      },
    });

    if (data?.streamChat?.chat && !chatId?.length) {
      setChatId(data?.streamChat?.chat);
    }

    setTimeout(() => {
      const mockResponse = chatMessages[currentStep];

      setActiveChats((prev) => [
        ...prev,
        {
          prompt: mockResponse.prompt,
          message: mockResponse.message,
        },
      ]);

      if (currentStep < chatMessages.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }

      form.setFieldValue("prompt", "");
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [activeChats]);

  return (
    <div className="h-[5rem] ">
      <Container>
        <div className="h-[calc(100vh-80px)] flex flex-col items-center">
          <div className="h-[5rem] w-full flex items-center justify-end  ">
            <Button
              w={160}
              onClick={handleCreateProject}
              loading={createProjectLoading}
              disabled={createProjectLoading}
              className={cn(
                "rounded-lg bg-black text-white font-semibold transition duration-300",
                createProjectLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-gray-900",
              )}
            >
              {createProjectLoading ? "Saving Schema..." : "Save Schema"}
            </Button>
          </div>
          <div
            ref={chatContainerRef}
            className=" flex-1 flex flex-col items-center p-4 overflow-auto scrollbar-hide"
          >
            {activeChats?.length ? (
              activeChats?.map((chat, idx) => (
                <React.Fragment key={idx}>
                  {/* User Prompt */}
                  <div className="px-5 py-2.5 bg-[#e8e8e8]/50 rounded-2xl inline-flex justify-center items-center gap-2.5 mb-5">
                    <p className="justify-center text-[#0d0d0d] text-sm font-normal leading-normal">
                      {chat.prompt}
                    </p>
                  </div>

                  {/* AI Response */}
                  <div className="px-3 py-2 inline-flex justify-start items-center gap-2.5">
                    <p className="justify-center text-[#0d0d0d] text-sm font-normal leading-7">
                      <SchemaVisualizer response={chat.message} />
                    </p>
                  </div>
                </React.Fragment>
              ))
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center">
                <h2 className="font-normal text-[1.6rem] text-[#0A0A0A] ">
                  Welcome, {currentUser?.fullName.split(" ")[0]}
                </h2>
                <h2 className="font-normal text-[1.6rem] text-[#7D8187] ">
                  What are we building today?
                </h2>
              </div>
            )}
          </div>

          <form
            onSubmit={form.onSubmit(handleSubmit)}
            className={cn(
              "my-6 mb-10 flex justify-between items-center px-5 py-5 bg-white rounded-3xl border border-solid shadow-md border-black border-opacity-10 w-[800px] max-md:mx-5 max-md:my-0 max-md:w-[90%] max-sm:p-4 max-sm:mx-2.5 max-sm:my-0",
              loading ? "bg-[#fafafa] opacity-50 cursor-not-allowed" : "",
            )}
          >
            <input
              disabled={loading}
              type="text"
              className="flex-1 text-base tracking-normal text-zinc-500 placeholder:text-zinc-500 focus:outline-none"
              placeholder={
                loading
                  ? "Conversation completed"
                  : "Type to continue conversation"
              }
              aria-label="Ask anything"
              {...form.getInputProps("prompt")}
            />
            <button
              type="submit"
              disabled={loading}
              className="flex justify-center items-center w-9 h-9 bg-black rounded-full"
            >
              {loading ? (
                <ArrowPathIcon
                  color="white"
                  height={20}
                  className="animate-spin"
                />
              ) : (
                <ArrowLongUpIcon color="white" height={20} />
              )}
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ChatRoomPage;
