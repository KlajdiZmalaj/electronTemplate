import { render } from 'enzyme';
import React, { useEffect, useState } from 'react';
const path = require('path');
const fs = require('fs');
import './style.global.css';
const userInfo = require('os').userInfo();

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
  const fileList = files.map((item, i) => {
    var fPath = path.join(filePath, item);
    const promisify = require('util').promisify;
    const lstat = promisify(require('fs').lstat);
    let render = true;
    async function isDir(path) {
      try {
        return (await lstat(path)).isDirectory();
      } catch (e) {
        return false;
      }
    }
    console.log('fpath', fPath, render);
    isDir(fPath).then((a) => {
      render = a;
      console.log('inside', a);
    });

    console.log('after', render);
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
  });
  return (
    <div className="imgSelector">
      <div className="left folders">
        <div className="nav">
          <span
            onClick={() => {
              let arr = filePath.split('/');
              arr.pop();
              if (arr.join('/').includes('C:')) {
                setPath(arr.join('/'));
              } else {
                setPath('C:');
              }
            }}
          >
            {'<'}
          </span>
          {userInfo.username} Files on {filePath} <br />{' '}
        </div>
        <ul>{fileList}</ul>
      </div>
      <div className="right imgs">
        <ul>
          {files.map((item, i) => {
            return (
              isImg(item) && (
                <li
                  key={i}
                  onClick={() => {
                    // setPath(fPath);
                  }}
                >
                  {item}
                </li>
              )
            );
          })}
        </ul>
      </div>
    </div>
  );
};
