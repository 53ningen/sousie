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

* `user-agent`(string): User-Agent header
* `items`(array): health check target items
  * `method`(string): `GET`, `POST`, `PUT`, `DELETE`, `HEAD`...
  * `url`(string): health check target url
  * `port`(number): health check target port
  * `timeout_millisec`(number): request timeout (ms)
* `slack`(object, optional)
  * `notify-on-success`(boolean): enable success notification
  * `webhook_url`(string): slack incomming webhook url
  * `channel`(string): notification target channel (ex: `#random`)
  * `username`(string): username of slack notification
  * `icon_emoji`(string): user icon of slack notification
  * `mention_targets`(array): if you want to receive mention, place the account of slack

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
