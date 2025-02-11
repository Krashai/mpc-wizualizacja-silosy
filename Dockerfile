# base-image for node on any machine using a template variable,
# see more about dockerfile templates here: https://www.balena.io/docs/learn/develop/dockerfile/#dockerfile-templates
# and about balena base images here: https://www.balena.io/docs/reference/base-images/base-images/
FROM balenalib/raspberrypi4-64-node:latest
# use `install_packages` if you need to install dependencies,
# for instance if you need git, just uncomment the line below.
# RUN install_packages git

# Defines our working directory in container
WORKDIR /usr/src/app

# Copies the package.json first for better cache on later pushes
COPY package.json package-lock.json ./

RUN rm -rf node_modules/

# This install npm dependencies on the balena build server,
# making sure to clean up the artifacts it creates in order to reduce the image size.
RUN JOBS=MAX npm install --unsafe-perm && npm cache verify && rm -rf /tmp/*

# This will copy all files in our root to the working directory in the container
COPY . ./

RUN chmod 777 -R /usr/src/app
# Build dist
RUN npm run build

# Enable udevd so that plugged dynamic hardware devices show up in our container.
ENV UDEV=1

# server.js will run when container starts up on the device
CMD ["npm", "run", "dev"]