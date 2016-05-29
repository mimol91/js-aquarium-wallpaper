FROM node

ADD entrypoint.sh /entrypoint.sh

RUN chmod 755 /*.sh
RUN npm install -g gulp
RUN npm install -g bower

EXPOSE 80

WORKDIR /app

CMD ["/entrypoint.sh"]
