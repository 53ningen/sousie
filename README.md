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

### Clone and configure

```
# git clone
git clone git@github.com:53ningen/sousie.git
cd sousie

# configure
cp ./config.json.template ./config.json
vi ./config.json #=> set helth check target url
```

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

gomi_ningen ( @53ningen )

## License

MIT

## Special Thanks

Queen Susie Ernea Ortlinde
