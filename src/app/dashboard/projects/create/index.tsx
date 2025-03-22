import { Modal } from "@/components/modal";
import { useMutation } from "@apollo/client";
import { Textarea, TextInput } from "@mantine/core";
import React from "react";
import { z } from "zod";
import { CREATE_PROJECT } from "./apollo";
import { useForm, zodResolver } from "@mantine/form";
import { toast } from "react-toastify";
import wrapClick from "@/utils/wrap-click";

const schema = z.object({
  name: z.string(),
  description: z.string(),
  aiResponse: z.string(),
});

const CreateProject = ({
  open,
  close,
  refetch,
}: {
  open: boolean;
  close: () => void;
  refetch?: () => void;
}) => {
  const [createProject, { loading }] = useMutation(CREATE_PROJECT);

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      aiResponse: "AI wati anaa",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: {
    name: string;
    description: string;
    aiResponse: string;
  }) => {
    try {
      console.log("the vaarss", values);
      const { data } = await createProject({
        variables: { ...values },
      });

      console.log("login data", data);

      if (data?.createProject?._id) {
        toast.success("Project created successfully");
        close();
        refetch?.();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal
      open={open}
      close={close}
      title="Add New Project"
      description="Provide the details to add a new project Schema"
      size="2xl"
      renderActions={() => (
        <>
          <button
            type="button"
            // disabled={form.isSubmitting}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={wrapClick(() => handleSubmit(form.values))}
          >
            {form.submitting ? "Creating Project..." : "Create Project"}
          </button>
        </>
      )}
    >
      <div className="space-y-4">
        <TextInput
          label="Project Name"
          placeholder="eg. Todo App"
          required
          {...form.getInputProps("name")}
        />
        <Textarea
          label="Project Description"
          placeholder="eg. Todo App"
          rows={5}
          required
          {...form.getInputProps("description")}
        />
      </div>
    </Modal>
  );
};

export default CreateProject;
