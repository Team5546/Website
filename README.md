# ARGS Robotics Team Website

### To setup
* Install NodeJS v4 `curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - && sudo apt-get install -y nodejs`
* Clone this repository
* [Install Meteor.js](https://www.meteor.com/install)
* Run `meteor npm install --save react react-dom react-mounter dompurify node-uuid sanitize-filename base64-img` to install React.
* To start the server, run `meteor`. This will take a while as it downloads the necessary atmosphere packages.
* The website should now be accessable via [localhost:3000](http://localhost:3000).

### Installing to a webserver
* The team 5546 website was designed to be run on Debian, but any other Linux distribution should work fine.
* You need MongoDB 3.2+, instructions for installing it on Debian are [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-debian/).
* To build the Meteor app, change to its directory and run `npm install --production` to install the Node modules.
* Run `meteor build ../build --architecture os.linux.x86_64` to build the app. This creates a tar.gz in whatever folder you specify
* Copy that tarball to the server you want to run the website on, or just leave it if you built it on that same server.
* Change directory to where your tarball is and run `tar -zxf filename.tar.gz` to extract to the current directory.
* Run `cd bundle && (cd programs/server && npm install)`
You are now set to run the website by typing `MONGO_URL=mongodb://localhost:27017/meteor ROOT_URL=https://argsrobotics.com node main.js`

### Setting up webserver for production
* To continue running the website even if it crashes, we need to install Forever, `sudo npm -g install forever`
* You can now run the website by typing `MONGO_URL=mongodb://localhost:27017/meteor ROOT_URL=https://argsrobotics.com PORT=8080 forever start main.js`
* To restore the database files, you need to get access to them. They will not be in this repository since they contain sensitive information.
* Make sure your mongo instance is using using the wiredTiger engine by following this [article](https://docs.mongodb.com/v3.0/release-notes/3.0-upgrade/).
* To restore the database, type `mongorestore FOLDER_TO_DATABASE_DUMP`

### Managing the production webserver
There are multiple management shell scripts in the home folder `(/home/webmaster/)`. To run these scripts, just execute them like any other shell script (ex. `./update.sh`). Do NOT run these scripts as root or with sudo. This may cause the web server to crash and there will be a mess. Just run them as the normal webmaster user.
* start.sh - Starts the web server if not already running. This keeps the server running and restarts it if there is a crash.
* stop.sh - Forcibly stops the web server.
* update.sh - Updates the server with the current contents of this GitHub repo and restarts the server. Commit any changes to this repo (after developing and testing locally) and then run this script. This is the only way that the server's web content should be updated.
