import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { useDropzone } from "react-dropzone";
import "./Component2.css";
import { Details } from "./types";

function Stage2({
  details,
  setDetails,
  proceed,
  back,
  uploadedFile,
  setUploadedFile,
}: {
  details: Details;
  setDetails: Function;
  proceed: Function;
  back: Function;
  uploadedFile: string | null;
  setUploadedFile: Function;
}) {
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(details);
    // Convert Image to base64
    toDataURL(uploadedFile, function (dataUrl: string) {
      setDetails({
        ...details,
        dataUrl,
      });
    });

    proceed();
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "firstPreset");
    data.append("cloud_name", "dfebp3bqo");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dfebp3bqo/image/upload",
      {
        method: "POST",
        body: data,
      }
    ).then((r) => r.json());

    console.log("imageSRC", res.url);
    setUploadedFile(res.url);

    setLoading(false);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function toDataURL(url: string | null, callback: Function) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url ?? "");
    xhr.responseType = "blob";
    xhr.send();
  }

  return (
    <div className="body2">
      <div className="Component2">
        <div className="C2-header">
          <h1>Attendee Details</h1>
          <span> Step 2/3</span>
        </div>
        <div className="C2-Body">
          <div>
            <form onSubmit={handleSubmit}>
              <div className="event-info">
              <span className="uploaH">Upload Prifile Picture</span>
                <div className="upload-box">
                  <label htmlFor="file-upload" className="upload-label">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} required />
                      {loading ? (
                        <>
                          <span>Please Wait while Loading</span>
                        </>
                      ) : uploadedFile ? (
                        <img
                          src={uploadedFile}
                          className="pfp"
                          alt="Drag & drop or click to upload"
                        />
                      ) : isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      )}
                    </div>
                  </label>
                </div>
                <hr />
              </div>
              <div className="aName">
                <span>Enter Your Name</span>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="aEmail">
                <span>Enter Your Email</span>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="johndoe@gmail.com"
                  required
                />
              </div>
              <div className="sRequests">
                <span>Special Requests</span>
                <textarea
                  className="request"
                  name="request"
                  onChange={handleChange}
                  cols={30}
                  rows={5}
                  required
                ></textarea>
              </div>
              <div className="backSubmit">
                <button className="backBtn" onClick={() => back()}>
                  Back
                </button>
                <button className="submitBtn" type="submit">
                  Get My Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stage2;
