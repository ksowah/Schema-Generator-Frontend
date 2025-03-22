"use client";

import ProjectGridItem from "@/components/project-grid-item";
import MyTable, { TItem } from "@/components/table";
import Header from "@/layouts/Header";
import { useDisclosure } from "@mantine/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import CreateProject from "./create";
import { useUrlState } from "@/utils/use-url-state";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "./apollo";
import config from "@/config";
import { useTableData } from "@/utils/useTableData";


const ProjectsPage = () => {
  const searchParams = useSearchParams();
  const tableItems: TItem[] = [];
  const [sideBaropened, { toggle }] = useDisclosure();
  const [modal, setModal] = useUrlState<string | undefined>("modal");

  const { data, refetch, loading, networkStatus } = useQuery(GET_PROJECTS, {
    variables: {
      pagination: {
        page: Number(searchParams.get("page") || config.constants.page),
        pageSize: Number(
          searchParams.get("pageSize") || config.constants.pageSize,
        ),
      }
    },
  });

  const records = useTableData(data);

  const router = useRouter();

  return (
    <div className="flex flex-1 h-full overflow-y-auto z-50">
      <Header
        opened={sideBaropened}
        toggle={toggle}
        renderActions={() => (
          <>
            <button
              type="button"
              // disabled={form.isSubmitting}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => router.push("/chat/chat-room")}
            >
              Create Project
            </button>
          </>
        )}
      />
      <div className="flex-1 min-h-full mx-auto min-w-0 py-4 sm:py-6 overflow-hidden overflow-y-auto light flex">
        <MyTable
          items={tableItems}
          refetch={refetch}
          hasSearch={false}
          viewType="grid"
          data={records}
          title="Project"
          isRefetching={loading && networkStatus === 4}
          loading={loading && ![4, 6].includes(networkStatus)}
          renderGridItem={(item: Project) => (
            <ProjectGridItem
              project={item}
              onView={() => {}}
              onExpand={() => router.push(`/dashboard/projects/${item?._id}`)}
            />
          )}
        />
      </div>

      {/* <CreateProject
        open={modal === "create"}
        close={() => setModal(undefined)}
        refetch={refetch}
      /> */}
    </div>
  );
};

export default ProjectsPage;
