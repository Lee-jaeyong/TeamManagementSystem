import React from "react";
import { useDispatch } from "react-redux";
import { showMessageHandle } from "@store/actions/MessageAction";
import Dropzone from "react-dropzone";

const ImageUpload = ({ imgs, imgByte, setImgByte, setImgs }) => {
  const dispatch = useDispatch();

  async function imgUpload(file) {
    for (let i = 0; i < file.length; i++){
      if (file[i].size > 20971520) {
        dispatch(
          showMessageHandle({
            open: true,
            content: "20MB 이하 파일만 등록 가능합니다.",
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
      if (_fileExt !== ".jpg" && _fileExt !== ".jpeg" && _fileExt !== ".png") {
        dispatch(
          showMessageHandle({
            open: true,
            content: "이미지는 jpg, jpeg, png 만 업로드 가능합니다.",
            level: "error",
          })
        );
        return;
      }
    }
    let originImgs = imgs;
    let checkImgs = [];
    for (let j = 0; j < file.length; j++) {
      let chk = true;
      for (let i = 0; i < originImgs.length; i++) {
        if (originImgs[i]["name"] === file[j]["name"]) {
          chk = false;
          break;
        }
      }
      if (chk) {
        checkImgs.push(file[j]);
      }
    }
    let _imgByte = imgByte;
    for (let i = 0; i < checkImgs.length; i++) {
      await getImgSource(checkImgs[i]).then((value) => {
        _imgByte.push({ name: checkImgs[i]["name"], imgByte: value });
      });
    }
    setImgs(imgs.concat(checkImgs));
    setImgByte(_imgByte);
  }

  async function getImgSource(file) {
    return new Promise((resolve, reject) => {
      let contents = "";
      const reader = new FileReader();
      reader.onloadend = function(e) {
        contents = e.target.result;
        resolve(contents);
      };
      reader.readAsDataURL(file);
    });
  }

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
      <Dropzone onDrop={(acceptedFiles) => imgUpload(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
                이미지 형식의 파일을 Drag&Drop 혹은{" "}
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

export default ImageUpload;
