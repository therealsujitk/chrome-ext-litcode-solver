# Litcode Solver

![CI](https://github.com/therealsujitk/chrome-ext-litcode-solver/actions/workflows/build_push_pull_request.yml/badge.svg) ![License](https://img.shields.io/badge/license-MIT-blue)

A Chromium extension powered by [Google Bard](https://bard.google.com) to solve [Litcode](https://litcoder.azurewebsites.net/) questions.

<img width="400" src="demos/preview.png" />

## Installing the extension

1. Navigate to [Releases](https://github.com/therealsujitk/chrome-ext-litcode-solver/releases) and download the latest zip file under **Assets**.
    ![Github Download](demos/github-download.png)
2. Unzip the downloaded file into a folder and move the folder to an appropriate directory.
    ![Unzip Extension](demos/unzip-extension.png)
3. Go the [chrome://extensions](chrome://extensions) in your Chromium browser and enable **Developer Mode**.
    ![Chromium Extensions](demos/chromium-extensions.png)
4. Click on **Load unpacked** and select the folder that you unzipped.
    ![Load Extension](demos/load-extension.png)

## Setting up the extension

1. Go to [bard.google.com](https://bard.google.com) in your browser.
    ![Google Bard](demos/bard.png)
2. Open Developer Tools > Application > Cookies > https://bard.google.com and copy the value for the **__Secure-1PSID** key.
    ![Developer Tools](demos/developer-tools.png)
3. Open the extension, paste the value and click **Save Key**.
    ![Save Bard Key](demos/save-bard-key.png)
