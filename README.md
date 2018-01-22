Sousie
==================
[![Build Status](https://travis-ci.org/53ningen/sousie.svg?branch=master)](https://travis-ci.org/53ningen/sousie)

Website health checker working on AWS Lambda

## Install
### Install aws-cli

```
# Install pip
curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
sudo python get-pip.py

# Install aws-cli
pip install awscli
# or
pip install -r  ./requirements.txt

# then
aws configure
```

### Install Apex

See [official document](http://apex.run/#installation)

```
# On macOS, Linux, or OpenBSD run the following:
curl https://raw.githubusercontent.com/apex/apex/master/install.sh | sh
```

### Clone

```
# git clone
git clone git@github.com:53ningen/sousie.git
cd sousie
```

## Config
### Configure IAM Role

Copy `project.json.template` to `project.json`

```
cp ./project.json.template ./project.json
```

place your IAM Role into `role`

```
"role": "arn:aws:iam::***********:role/example",
```

### Configure application

Copy `config.json.template` to `config.json` and edit it

```
cp ./config.json.template ./config.json
```

* `method`: `GET`, `POST`, `PUT`, `DELETE`, `HEAD`...
* `url`: health check target url
* `slack`(optional)
  * `notify-on-success`: enable success notification
  * `webhook_url`: slack incomming webhook url
  * `channel`: notification target channel (ex: `#random`)
  * `username`: username of slack notification
  * `icon_emoji`: user icon of slack notification
  * `mention_targets`: if you want to receive mention, place the account of slack

## Deploy

```
yarn install
yarn build
apex deploy
```

## Invoke

```
apex invoke alive
```

## Test

```
yarn test
```

## Author

gomi_ningen ([@53ningen](https://github.com/53ningen))

## License

MIT

## Special Thanks

Queen Soucie Elnea Ortlinde
