import PageTitle from "@/components/PageTitle";
import ProjectTable from "@/components/project/ProjectTable";
import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Page title  */}
      <PageTitle
        title="Projects"
        element={
          <Button type="primary" onClick={() => navigate("/project/new")}>
            Add
          </Button>
        }
      />

      {/* Project table  */}
      <ProjectTable />
    </>
  );
};

export default ProjectPage;
