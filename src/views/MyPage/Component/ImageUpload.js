import React from "react";
import Dropzone from "react-dropzone";

class ImageUpload extends React.Component {
  state = { warningMsg: "" };

  render() {
    return (
      <Dropzone onDrop={(acceptedFiles) => this.props.addImg(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 500,
                  border: " 2px dashed",
                }}
              >
                <p style={{ cursor: "pointer" }}>
                  <strong>클릭</strong>또는 이미지를 드래그 해주세요
                </p>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default ImageUpload;
