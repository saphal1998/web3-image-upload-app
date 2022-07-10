import React from "react";

import { Image } from "../App";

interface MainProps {
  uploadImage: (caption: string) => void;
  captureFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  images: Image[];
}

const Main: React.FC<MainProps> = ({ uploadImage, captureFile, images }) => {
  const [description, setImageDescription] = React.useState("");

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "500px" }}
        >
          <div className="content mr-auto ml-auto">
            <p>&nbsp;</p>
            <h2>Share Image</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                uploadImage(description);
              }}
            >
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .bmp, .gif"
                onChange={captureFile}
              />
              <div className="form-group mr-sm-2">
                <br></br>
                <input
                  id="imageDescription"
                  type="text"
                  onChange={(event) => setImageDescription(event.target.value)}
                  className="form-control"
                  placeholder="Image description..."
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                Upload!
              </button>
            </form>
            <p>&nbsp;</p>
            {images.map((image, key) => {
              return (
                <div className="card mb-4" key={key}>
                  <div className="card-header">
                    <small className="text-muted">{image.owner}</small>
                  </div>
                  <ul id="imageList" className="list-group list-group-flush">
                    <li className="list-group-item">
                      <p className="text-center">
                        <img
                          src={`https://ipfs.infura.io/ipfs/${image.imgHash}`}
                          style={{ maxWidth: "420px" }}
                        />
                      </p>
                      <p>{image.caption}</p>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;
