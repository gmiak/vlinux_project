FROM ubuntu:22.04

RUN apt update && apt install -y curl && apt -y install jq

WORKDIR /client

COPY bthloggen.bash ./
COPY server.txt ./

#CMD ["bash", "bthloggen.bash"]
#ENTRYPOINT [ "/bin/bash", "-c", "/client/bthloggen.bash"]