import { render } from 'enzyme';
import React, { useEffect, useState } from 'react';
const path = require('path');
const fs = require('fs');
import './style.global.css';
const userInfo = require('os').userInfo();
import Image from './Image';

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
  useEffect(() => {
    const files = fs.readdirSync(filePath);
    setFiles(files);
  }, [filePath]);
  console.log('state filePath', filePath);
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
          {files.map((item, i) => {
            var fPath = path.join(filePath, item);

            return isImg(item) && <Image key={i} item={item} fPath={fPath} />;
          })}
        </ul>
      </div>
    </div>
  );
};
