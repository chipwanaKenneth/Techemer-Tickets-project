import { useState } from "react";
import Stage1 from "./Component1";
import StageII from "./Component2";
import ContentIII from "./Component3";
import { Details } from "./types";

export default function Content() {
  const [details, setDetails] = useState<Details>({} as Details);
  const [stage, setStage] = useState<number>(1);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const proceed = () => {
    if (stage < 3) {
      setStage(stage + 1);
      localStorage.setItem("data", JSON.stringify(details));
      let result = localStorage.getItem("data");
    }
  };

  const back = () => {
    if (stage === 1) {
      location.reload();
    } else if (stage === 2) {
      setStage(stage - 1);
    } else {
      location.reload();
    }
  };

  return (
    <>
      {stage === 1 && (
        <Stage1
          details={details}
          setDetails={setDetails}
          proceed={proceed}
          back={back}
        />
      )}
      {stage === 2 && (
        <StageII
          details={details}
          setDetails={setDetails}
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          proceed={proceed}
          back={back}
        />
      )}
      {stage === 3 && (
        <ContentIII
          details={details}
          setDetails={setDetails}
          uploadedFile={uploadedFile}
          setUploadedFile={setUploadedFile}
          back={back}
        />
      )}
    </>
  );
}
