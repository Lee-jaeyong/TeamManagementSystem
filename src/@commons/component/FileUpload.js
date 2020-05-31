import React from "react";
import { useDispatch } from "react-redux";
import { showMessageHandle } from "@store/actions/MessageAction";
import Dropzone from "react-dropzone";

const FileUpload = ({ files, setFiles }) => {
  const dispatch = useDispatch();

  const fileUpload = (file) => {
    for (let i = 0; i < file.length; i++){
      if (file[i].size > 20971520) {
        dispatch(
          showMessageHandle({
            open: true,
            content: "20MB 이하 이미지만 등록 가능합니다.",
            level: "error",
          })
        );
        return;
      }
    }
    for (let i = 0; i < file.length; i++) {
      const fileName = file[i]["name"];
      let _fileLen = fileName.length;
      let _lastDot = fileName.lastIndexOf(".");
      let _fileExt = fileName.substring(_lastDot, _fileLen).toLowerCase();
      if (
        _fileExt === ".war" ||
        _fileExt === ".php" ||
        _fileExt === ".php3" ||
        _fileExt === ".htm" ||
        _fileExt === ".cer" ||
        _fileExt === ".cdx" ||
        _fileExt === ".html" ||
        _fileExt === ".asp" ||
        _fileExt === ".jsp" ||
        _fileExt === ".exe" ||
        _fileExt === ".jpg" ||
        _fileExt === ".jpeg" ||
        _fileExt === ".png" ||
        _fileExt === ".gif"
      ) {
        dispatch(
          showMessageHandle({
            open: true,
            content: "이미지 및 코드 형식의 파일은 업로드 할 수 없습니다.",
            level: "error",
          })
        );
        return;
      }
    }
    let originFile = files;
    let checkFile = [];
    for (let i = 0; i < file.length; i++) {
      let chk = true;
      for (let j = 0; j < originFile.length; j++) {
        if (file[i]["name"] === originFile[j]["name"]) {
          chk = false;
          break;
        }
      }
      if (chk) {
        checkFile.push(file[i]);
      }
    }
    setFiles(files.concat(checkFile));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10vh",
        border: " 2px dashed",
      }}
    >
      <Dropzone onDrop={(acceptedFiles) => fileUpload(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
                파일 형식의 파일을 Drag&Drop 혹은{" "}
                <mark>
                  <strong>텍스트</strong>
                </mark>
                를 누른 후 선택해주세요.
              </p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default FileUpload;
