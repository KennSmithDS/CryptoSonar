# # basic ubuntu image with python3
# FROM ubuntu:xenial
# RUN apt-get update && apt-get install -y \
#     python3 python3-pip \

# # install geckodriver and firefox

# RUN GECKODRIVER_VERSION=`curl https://github.com/mozilla/geckodriver/releases/latest | grep -Po 'v[0-9]+.[0-9]+.[0-9]+'` && \
#     wget https://github.com/mozilla/geckodriver/releases/download/$GECKODRIVER_VERSION/geckodriver-$GECKODRIVER_VERSION-linux64.tar.gz && \
#     tar -zxf geckodriver-$GECKODRIVER_VERSION-linux64.tar.gz -C /usr/local/bin && \
#     chmod +x /usr/local/bin/geckodriver && \
#     rm geckodriver-$GECKODRIVER_VERSION-linux64.tar.gz

# RUN FIREFOX_SETUP=firefox-setup.tar.bz2 && \
#     apt-get purge firefox && \
#     wget -O $FIREFOX_SETUP "https://download.mozilla.org/?product=firefox-latest&os=linux64" && \
#     tar xjf $FIREFOX_SETUP -C /opt/ && \
#     ln -s /opt/firefox/firefox /usr/bin/firefox && \
#     rm $FIREFOX_SETUP

# method for building Docker image with Chrome here:
# https://github.com/joyzoursky/docker-python-chromedriver

FROM python:3.8

# Adding trusting keys to apt for repositories
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

# Adding Google Chrome to the repositories
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'

# Updating apt to install Google Chrome
RUN apt-get -y update

# Actually install chrome
RUN apt-get install -y google-chrome-stable

# Installing Unzip
RUN apt-get install -yqq unzip

# Download the Chrome Driver
RUN wget -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip

# Unzip the Chrome Driver into /usr/local/bin directory
RUN unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/

# Set display port as an environment variable
ENV DISPLAY=:99

# FROM selenium/standalone-chrome
# FROM ilanyu/python-selenium-chromium-headless

# Copy flask server files to workspace
RUN mkdir workspace
WORKDIR /workspace
COPY flask_server.py ./
COPY chromedriver ./
COPY bsc_crawlers /workspace/bsc_crawlers
COPY bsc_api /workspace/bsc_api

# Install python dependencies
COPY ./requirements.txt ./
# RUN sudo apt install python3-pip
# RUN pip3 --version
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

# RUN ls -la
# EXPOSE 5000
CMD ["python", "/workspace/flask_server.py"]