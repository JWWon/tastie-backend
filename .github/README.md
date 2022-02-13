# Github Action Setup

## 필요한 Github Action Secret

```sh
AWS_ACCESS_KEY_ID: AWS 인증 관련 토큰
AWS_SECRET_ACCESS_KEY: AWS 인증 관련 토큰
DEPLOY_GITHUB_TOKEN: 레포 권한을 가지고 있는 깃허브 토큰
ALPHA_DB_HOST: 알파 DB Host
ALPHA_DB_USERNAME: 알파 DB Username
ALPHA_DB_PASSWORD: 알파 DB 패스워드
ALPHA_DB_DBNAME: 알파 DB 데이터베이스 이름
```

## Github Action Workflow 리스트

### Build

도커 이미지를 빌드하고 ECR에 푸시하는 과정

## Alpha Deploy

알파 환경을 대상으로 tastie-infrastructure 레포에 배포 요청 PR 생성

## Alpha DB Migration

알파 환경의 데이터베이스를 마이그레이션 수행
알파 앱을 실행하기 전에 알파 DB 대상으로 마이그레이션을 수행해야 합니다.
