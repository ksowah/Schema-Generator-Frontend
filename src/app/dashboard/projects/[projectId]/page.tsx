"use client";

import { GET_PROJECT } from "@/app/chat/[projectId]/apollo";
import SchemaVisualizer from "@/components/chat-response";
import Container from "@/components/container";
import Header from "@/layouts/Header";
import { useQuery } from "@apollo/client";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

const DashboardProjectDetails = ({ params }: { params: any }) => {
  const [sideBaropened, { toggle }] = useDisclosure();
  const projectId = params?.projectId;
  const { data, loading } = useQuery(GET_PROJECT, {
    variables: { id: projectId },
  });

  return (
    <div>
      <Header opened={sideBaropened} toggle={toggle} />

      <Container>
        <div className="py-6 h-[calc(100vh-100px)] flex flex-col items-center overflow-auto scrollbar-hide">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h2 className="text-[1.6rem] font-medium mb-4 ">
                {data?.project?.name}
              </h2>
              <p>{data?.project?.description ?? "N/A"}</p>

              <div className="px-3 py-2 inline-flex justify-start items-center gap-2.5">
                <p className="justify-center text-[#0d0d0d] text-sm font-normal leading-7">
                  <SchemaVisualizer response={data?.project?.AIResponse} />
                </p>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default DashboardProjectDetails;
