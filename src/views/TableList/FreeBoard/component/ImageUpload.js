  
import React from "react";
import Dropzone from "react-dropzone";

class ImageUpload extends React.Component {
  state = { warningMsg: "" };

  render() {
    const { files } = this.props;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
          border: " 2px dashed"
        }}
      >
        <Dropzone
        onDrop={acceptedFiles => this.props.addImg(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>이미지 형식의 파일을 Drag&Drop 혹은 <mark><strong>텍스트</strong></mark>를 누른 후 선택해주세요.</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default ImageUpload;