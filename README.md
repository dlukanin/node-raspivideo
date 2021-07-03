# node-raspivideo
![Build status](https://github.com/dlukanin/node-raspivideo/actions/workflows/main.yml/badge.svg)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/dlukanin/node-raspivideo.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/dlukanin/node-raspivideo/alerts/)

Wrapper for [raspivid](https://www.raspberrypi.org/documentation/usage/camera/raspicam/raspivid.md) tool
for Raspbian OS. Typescript typedefs included. Includes built in converter to save records in mp4 format.

# Reqs

- Raspberry Pi (tested on 3 version), Raspbian OS with Raspivid lib
- Node 12+ installed
- Raspberry camera connected to your Pi

# Install

`npm i node-raspivideo`

# Usage

Sample usage

```javascript
// import {Raspivid} from 'node-raspivideo';
const {Raspivid} = require('node-raspivideo');

const raspivid = new Raspivid({
    videoFolder: './videos',
    verticalFlip: true,
    format: 'mp4'
});

raspivid.record('myvideo', 10000)
    .then(() => {
        console.log('done!');
    })
    .catch((err) => {
        console.error(err);
    });

```

Current options are:

|key|type|defaults|desc|
|---|---|---|---|
|width|number|640|   |
|height|number|480|   |
|bitrate|number|1200000|bps|
|format|string - 'mp4' or 'h264'|mp4||
|videoFolder|string|./videos||
|verticalFlip|boolean|false||
|horizontalFlip|boolean|false||


# License info
Lib is MIT licensed.

Sample video file for tests was provided by https://file-examples.com

# TODO

- More docs
- Streams
- More tests
