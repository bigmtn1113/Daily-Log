## 참고사항

### yaml 파일 실행 순서
1. **cfn-vpc.yaml**
2. **cfn-sg.yaml**
3. **cfn-alb.yaml**
4. **cfn-documentdb.yaml**
5. **cfn-frontendweb.yaml, cfn-backendapp.yaml**

### Region
아시아 태평양 (서울)  ap-northeast-2

### AMI
#### Linux AMI(Amazon Linux 2 AMI (HVM), SSD Volume Type - ami-04e8dfc09b22389ad)에 추가 작업 진행
- git 설치 및 application-ec2 git clone
- nodejs 및 pm2 설치
