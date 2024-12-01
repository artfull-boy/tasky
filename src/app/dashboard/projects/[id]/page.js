"use client";

import { useEffect, useState } from "react";

export default function ProjectDetails({ params }) {
    const id = params?.id; // Safely access id
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError("Project ID is missing");
            setIsLoading(false);
            return;
        }

        async function fetchProject() {
            try {
                const response = await fetch("/data.json");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const contentType = response.headers.get("Content-Type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Response is not valid JSON");
                }

                const data = await response.json(); 
                const projectData = data.find((p) => String(p.id) === String(id));

                if (projectData) {
                    setProject(projectData);
                } else {
                    setError("Project not found");
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProject();
    }, [id]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!project) return <div>No project found</div>;

    return (
        <div className="project-details">
            <h1>Project Details</h1>
            <div className="project-info">
                <p><strong>Project Name:</strong> {project.project_name}</p>
                <p><strong>Status:</strong> {project.status}</p>
                <p><strong>Created Date:</strong> {project.created_date}</p>
                <p><strong>Due Date:</strong> {project.due_date}</p>
                <p><strong>Created By:</strong> {project.created_by}</p>
                <p><strong>Assigned To:</strong> {project.assigned_to}</p>
            </div>
        </div>
    );
}
