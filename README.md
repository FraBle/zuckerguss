<p align="center">
  <img src="docs/zuckerguss.jpg" alt="zuckerguss" width="50%"/></br>
  Photo by <a href="https://pixabay.com/photos/cake-desert-colorful-cupcake-3860391/" target="_blank">Goran Horvat</a>
</p>

<h1 align="center">zuckerguss</h1>

<div align="center">

<!-- [![Travis CI][travis-badge]][travis-url]
[![Codacy][codacy-badge]][codacy-url]
[![Code Climate][code-climate-badge]][code-climate-url]
[![CodeFactor][codefactor-badge]][codefactor-url]
[![lgtm][lgtm-badge]][lgtm-url]
[![SonarQube][sonarqube-badge]][sonarqube-url] -->

</div>

`zuckerguss` (German for "icing") is the frontend for [`guglhupf`](https://github.com/FraBle/guglhupf)- the Raspberry Pi-powered dashcam control station.
It's built on top of [React](https://reactjs.org/) uses the [`grommet`](https://v2.grommet.io/) component library.
It runs together with [`guglhupf`](https://github.com/FraBle/guglhupf) behind an [`nginx`](https://nginx.org/) reverse proxy.

## Prerequisites

The follow tools should be installed:

| tool  | link                                                  | usage              |
|-------|-------------------------------------------------------|--------------------|
| node  | [`docs`](https://nodejs.org/en/download/)             | JavaScript runtime |
| yarn  | [`docs`](https://yarnpkg.com/getting-started/install) | Package manager    |
| serve | [`repo`](https://github.com/vercel/serve)             | Static file server |

## Running `zuckerguss`

> The following steps assume that the frontend gets deployed alongside [`guglhupf`](https://github.com/FraBle/guglhupf) on a Raspberry Pi.

1. Check out the `zuckerguss` repo.

    ```bash
    cd /usr/local/lib/
    git clone git@github.com:FraBle/zuckerguss.git
    ```

2. Build `production build`.

    ```bash
    cd /usr/local/lib/zuckerguss
    yarn install
    yarn build
    ```

3. Start server using `serve`.

    ```bash
    serve --no-clipboard --single --listen 5000 /usr/local/lib/zuckerguss/build
    ```

4. Open your browser and browse to `http://<rpi-ip>:5000`.

## Registering `zuckerguss` with `systemd`

1. Create a  `systemd` entry.

    `sudo nano /lib/systemd/system/zuckerguss.service`:

    ```ini
    [Unit]
    Description=zuckerguss frontend for guglhupf
    After=network.target

    [Service]
    Type=simple
    ExecStart=serve --no-clipboard --single --listen 5000 /usr/local/lib/zuckerguss/build
    Restart=always
    RestartSec=1
    StartLimitInterval=0

    [Install]
    WantedBy=multi-user.target
    ```

2. Enable and start `zuckerguss` service in `systemd`.

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable zuckerguss.service
    sudo systemctl start zuckerguss.service
    ```

3. Open your browser and browse to `http://<rpi-ip>:5000`.

## Running `zuckerguss` behind `nginx`

> Check out the [`guglhupf`](https://github.com/FraBle/guglhupf) on the `nginx` setup together with `guglhupf`.

## Creating a desktop shortcut

> The following steps assume that `chromium-browser` is installed.

1. Open your terminal and navigate to your `Desktop` directory.

2. Create a  `.desktop` file.

    `nano guglhupf.desktope`:

    ```ini
    [Desktop Entry]
    Version=0.1.0
    Name=guglhupf
    Exec=chromium-browser --start-fullscreen http://localhost/ %U
    Terminal=false
    X-MultipleArgs=false
    Type=Application
    Icon=/usr/local/lib/zuckerguss/public/android-chrome-192x192.png
    Categories=Network;WebBrowser;
    MimeType=text/html;text/xml;application/xhtml_xml;x-scheme-handler/http;x-scheme-handler/https;
    StartupNotify=true
    Actions=NewWindow;Incognito;TempProfile;
    X-AppInstall-Package=chromium-browser
    ```

## Credits

Favicon made by [freepik.com](https://www.flaticon.com/free-icon/gugelhupf_94346).

<!--
Badges
-->
<!-- [travis-badge]:https://img.shields.io/travis/com/FraBle/minigugl?label=Travis%20CI%20Build&style=flat-square
[codacy-badge]:https://img.shields.io/codacy/grade/1e536b353e83451a968db54f7f230bf3?label=Codacy%20Grade&style=flat-square
[code-climate-badge]:https://img.shields.io/codeclimate/maintainability/FraBle/minigugl?label=Code%20Climate%20Grade&style=flat-square
[codefactor-badge]:https://img.shields.io/codefactor/grade/github/FraBle/minigugl/main?label=CodeFactor%20Grade&style=flat-square
[lgtm-badge]:https://img.shields.io/lgtm/grade/python/github/FraBle/minigugl?label=lgtm%20Grade&style=flat-square
[sonarqube-badge]:https://img.shields.io/sonar/tech_debt/minigugl?label=Sonar%20Tech%20Debt&server=https%3A%2F%2Fsonarcloud.io&style=flat-square -->

<!--
Badge URLs
-->
<!-- [travis-url]:https://travis-ci.com/FraBle/minigugl
[codacy-url]:https://app.codacy.com/gh/FraBle/minigugl
[code-climate-url]:https://codeclimate.com/github/FraBle/minigugl
[codefactor-url]:https://www.codefactor.io/repository/github/frable/minigugl
[lgtm-url]:https://lgtm.com/projects/g/FraBle/minigugl/
[sonarqube-url]:https://sonarcloud.io/dashboard?id=minigugl -->
