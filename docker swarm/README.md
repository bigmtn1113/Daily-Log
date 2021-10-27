### docker network 생성
```bash
docker network create -d overlay devapp-net
docker network ls                                         # devapp-net network 확인
```

### docker 실행
```bash
docker stack deploy -c daily-log.yaml daily-log
docker stack services daily-log                           # frontend, backend, mongodb service 확인
docker stack ps daily-log                                 # daily-log stack에 실행 중인 frontend, backend, mongodb process 확인
```
