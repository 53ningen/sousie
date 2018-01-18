Sousie
==================
[![Build Status](https://travis-ci.org/53ningen/sousie.svg?branch=master)](https://travis-ci.org/53ningen/sousie)

[WIP] Website health checker working on AWS Lambda

## Installation
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

## Deploy

```
yarn install
yarn build
apex deploy alive
```

## Invoke

```
apex invoke alive
```

## Author

gomi_ningen (@53ningen)

## License

MIT

## Special Thanks

Queen Susie Ernea Ortlinde
