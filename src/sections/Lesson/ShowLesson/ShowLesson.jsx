import React, { useEffect, useState } from "react";
import EditLessonStyleWrapper from "./ShowLesson.Style";
import ListManager from "components/listManager/ListManager";
import { initDataTest, handelChangeReanger } from "./index";
import { getAllLesson } from "apiService";

export default function ShowLesson({ courseId }) {
  const [data, setData] = useState([]);

  /**
   * this To bring all the lessons from the back end
   */
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await getAllLesson(courseId);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, [courseId]);

  return (
    <>
      <EditLessonStyleWrapper>
        <div className="container">
          <div className="row">
            <h4>All Lesson</h4>
            <div>
              <ListManager
                initialData={data}
                mainField={"title"}
                onChange={(data) => handelChangeReanger(data, setData)}
                href={`/edit-lesson/${courseId}`}
                idField={"id"}
                arrangeFild={"order"}
              />
            </div>
          </div>
        </div>
      </EditLessonStyleWrapper>
    </>
  );
}
