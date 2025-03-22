"use client";

import { useQuery } from "@apollo/client";
import React from "react";
import { GET_PROJECT } from "./apollo";
import Container from "@/components/container";
import SchemaVisualizer from "@/components/chat-response";


const ProjectDetails = ({ params }: { params: any }) => {
  const projectId = params?.projectId;
  const { data, loading } = useQuery(GET_PROJECT, {
    variables: { id: projectId },
  });


  return (
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
  );
};

export default ProjectDetails;
