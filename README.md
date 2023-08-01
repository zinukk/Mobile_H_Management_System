# H Management System 

![Frame 1 (1)](https://github.com/zinukk/Mobile_H_Management_System/assets/97172321/c7545a1b-e97f-4d66-8237-d3c9517c6f5d)

<br>

# 프로젝트 요약 🤖

- 기간 : 2022.05.18 ~ 2022.07.26
- 팀원 : FE 1 / BE 1 / Designer 1
- 역할 : FE
- 개발 언어 : Typescript
- 개발 라이브러리 : Next.js
- 상태관리 : Recoil, react-query
- 스타일링 : Emotion
- 배포 환경 : AWS EC2, S3, CodeDeploy, Loadbalancer, Gihub Actions를 이용한 https 및 CI/CD 적용
- 협업 툴 : Git / Notion / Figma

<br>

# 프로젝트 아키텍쳐 🤖

![Frame 944 (3)](https://github.com/zinukk/Mobile_H_Management_System/assets/97172321/32e861dc-d29d-4e75-b5bf-44b8d36d74bf)


<br>

# 프로젝트 기능 🤖

![Scene](https://github.com/zinukk/Mobile_H_Management_System/assets/97172321/a7fb80ae-2fd8-402a-8401-b9645c3542c0)


|페이지|시연 영상|기능 및 설명|
|:---:|:---:|:---|
|홈|<img src="https://github.com/zinukk/Mobile_H_Management_System/assets/97172321/d8f23c10-bbd4-4000-94c0-808a2749c2d8" width="50%"/>|- 로봇 통계 데이터: 일간, 주간, 월간으로 나뉘어진 서빙 횟수, 이동 거리, 서빙 평균 시간, 주행 효율 정보를 Tab Bar 형식으로 제공하여 쉽게 UI를 전환할 수 있습니다. <br> <br> - 로봇이 운용되고 있는 매장 데이터: 매장에서 운용 중인 모든 로봇의 서빙 횟수, 에러 횟수, 주행 효율 정보를 제공하며 더보기 버튼을 통해 전체 매장을 확인할 수 있습니다. 클릭 시 매장 상세 페이지로 이동할 수 있습니다. <br> <br> - 로봇에서 발생한 최근 에러 : 로봇에서 최근에 발생한 에러 정보를 제공하는 컴포넌트로 에러의 내용, 발생한 시간과 매장, 에러의 위험 정도를 minor, major, critical 세 가지로 분류하여 사용자에게 제공합니다. 클릭 시 에러 상세 페이지로 이동할 수 있습니다.|
|매장 및 상세|<img src="https://user-images.githubusercontent.com/97172321/220843334-198ddf47-abb5-4f61-9d26-bd41924127aa.gif" width="50%"/>|중앙정렬|
|로봇|오른쪽정렬|중앙정렬|
|에러 및 상세|오른쪽정렬|중앙정렬|
