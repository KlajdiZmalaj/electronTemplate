import { render } from 'enzyme';
import React, { useEffect, useState, useRef } from 'react';
const path = require('path');
const fs = require('fs');
import './style.global.css';
const userInfo = require('os').userInfo();
import Image from './Image';
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import InfiniteScroll from 'react-infinite-scroll-component';
const downloader = require('image-downloader');

const icona = require('tui-image-editor/dist/svg/icon-a.svg');
const iconb = require('tui-image-editor/dist/svg/icon-b.svg');
const iconc = require('tui-image-editor/dist/svg/icon-c.svg');
const icond = require('tui-image-editor/dist/svg/icon-d.svg');

const myTheme = {
  'menu.backgroundColor': 'white',
  'common.backgroundColor': '#151515',
  'downloadButton.backgroundColor': 'white',
  'downloadButton.borderColor': 'white',
  'downloadButton.color': 'black',
  'menu.normalIcon.path': icond,
  'menu.activeIcon.path': iconb,
  'menu.disabledIcon.path': icona,
  'menu.hoverIcon.path': iconc,
};

const isImg = (file) => {
  if (
    file.includes('.png') ||
    file.includes('.jpg') ||
    file.includes('.jpeg')
  ) {
    return true;
  } else {
    return false;
  }
};

export default () => {
  const [files, setFiles] = useState([]);
  const [filePath, setPath] = useState(userInfo.homedir);
  const [slice, setSlice] = useState(20);
  const imageEditor = React.createRef();

  useEffect(() => {
    const files = fs.readdirSync(filePath);
    setFiles(files);
  }, [filePath]);

  const loadImg = (file) => {
    const editorInstance = imageEditor.current.getInstance();

    editorInstance.loadImageFromURL(file, 'lena').then((result) => {
      console.log('old : ' + result.oldWidth + ', ' + result.oldHeight);
      console.log('new : ' + result.newWidth + ', ' + result.newHeight);
    });
  };
  const flipImg = () => {
    const editorInstance = imageEditor.current.getInstance();
    editorInstance.flipX();
  };
  const setBrush = () => {
    const editorInstance = imageEditor.current.getInstance();

    editorInstance.startDrawingMode('FREE_DRAWING');
    editorInstance.setBrush({
      width: 12,
      color: 'rgba(20, 330, 0, 0.5)',
    });
  };
  const fetchData = () => {
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      setSlice(slice + 10);
    }, 500);
  };
  const undo = () => {
    const editorInstance = imageEditor.current.getInstance();
    editorInstance.undo();
  };
  const redo = () => {
    const editorInstance = imageEditor.current.getInstance();
    editorInstance.redo();
  };
  const download = () => {
    const editorInstance = imageEditor.current.getInstance();
    const dataUrl = editorInstance.toDataURL();
    console.log('dataUrl', dataUrl);

    // let buff = new Buffer(dataUrl, 'base64');
    fs.writeFile(
      `${userInfo.homedir + path.sep + 'Desktop' + path.sep}result.png`,
      dataUrl.replace(/^data:image\/png;base64,/, ''),
      'base64',
      function (err) {
        if (err) throw err;
        console.log('Results Received');
      }
    );
  };
  return (
    <div className="imgSelector">
      <div className="left folders">
        <div className="nav">
          <span
            onClick={() => {
              let arr = filePath.split(path.sep);
              arr.pop();
              if (arr.join(path.sep).includes(userInfo.homedir)) {
                setPath(arr.join(path.sep));
              } else {
                setPath(userInfo.homedir);
              }
            }}
          >
            {'<'}
          </span>
          {userInfo.username} Files on {filePath} <br />{' '}
        </div>
        <ul>
          {files.map((item, i) => {
            var fPath = path.join(filePath, item);

            const render =
              fs.existsSync(fPath) && fs.lstatSync(fPath).isDirectory();
            // console.log('exist ? ', fs.existsSync(fPath), render);
            return (
              render && (
                <li
                  key={i}
                  onClick={() => {
                    setPath(fPath);
                  }}
                >
                  {item}
                </li>
              )
            );
          })}
        </ul>
      </div>
      <div className="right imgs">
        <ul>
          <InfiniteScroll
            dataLength={files.slice(0, slice).length}
            next={fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {files.slice(0, slice).map((item, i) => {
              var fPath = path.join(filePath, item);

              return (
                isImg(item) && (
                  <Image
                    loadImg={loadImg}
                    key={item}
                    item={item}
                    fPath={fPath}
                  />
                )
              );
            })}
          </InfiniteScroll>
        </ul>
      </div>
      <div className="down">
        <div className="controlers">
          <button onClick={undo}>Undo</button>
          <button onClick={redo}>Redo X</button>
          <button onClick={flipImg}>Flip X</button>
          <button onClick={setBrush}>Brush paint</button>
          <button onClick={download}>Download</button>
        </div>

        <ImageEditor ref={imageEditor} />
      </div>
    </div>
  );
};
