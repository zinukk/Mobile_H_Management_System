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
|홈|<img src="https://github.com/zinukk/Mobile_H_Management_System/assets/97172321/d8f23c10-bbd4-4000-94c0-808a2749c2d8" />|- 홈 페이지는 로봇의 `통계 데이터`, 로봇이 운용되고 있는 `매장`, 최근 발생한 로봇의 `에러 정보`를 간략하게 나타내는 페이지입니다. <br> <br> - `로봇 통계 데이터`: 일간, 주간, 월간으로 나뉘어진 서빙 횟수, 이동 거리, 서빙 평균 시간, 주행 효율 정보를 `Tab Bar` 형식으로 제공하여 쉽게 UI를 전환할 수 있습니다. <br> <br> - `로봇이 운용되고 있는 매장 데이터`: 매장에서 운용 중인 모든 로봇의 `서빙 횟수, 에러 횟수, 주행 효율 정보`를 제공하며 더보기 버튼을 통해 전체 매장을 확인할 수 있습니다. 클릭 시 매장 상세 페이지로 이동할 수 있습니다. <br> <br> - `로봇에서 발생한 최근 에러` : 로봇에서 최근에 발생한 `에러 정보`를 제공하는 컴포넌트로 `에러의 내용, 발생한 시간과 매장, 에러의 위험 정도`를 minor, major, critical 세 가지로 분류하여 사용자에게 제공합니다. 클릭 시 에러 상세 페이지로 이동할 수 있습니다.|
|매장 및 상세|<img src="https://github.com/zinukk/Mobile_H_Management_System/assets/97172321/017cb73c-aef0-4221-af29-52356aea1cf1" />|- 매장 페이지는 로봇이 운용되고 있는 매장의 위치와 이름을 Kakao map을 통해 사용자에게 제공하고 있으며 로봇이 운용되고 있는 `맵 노드 이미지`를 포함하고 있는 페이지 입니다. <br> <br> - `드롭다운을 통한 데이터 필터링` : 사용자 입장에서 편리하게 매장을 검색할 수 있도록 드롭다운 형식으로 페이지 전환이 가능하도록 구현했으며 이를 통해 검색하고자 하는 매장으로 이동할 수 있습니다. <br> <br> - `Kakao map API를 활용한 지도`: 로봇이 운용되고 있는 매장의 이름과 위치를 한 눈에 파악할 수 있도록 `Kakao map API`를 활용해 구현하였습니다. 마커를 클릭 시 매장 상세 페이지로 이동할 수 있습니다. <br> <br> - `매장 상세 페이지` : Map id, Start node, Start dir, Home node 등 로봇이 운용되는데 필요한 `매장 정보`와 함께, 로봇이 가장 많이 이동하는 `피크시간`, `사용가능한 로봇의 현황` 정보를 제공하는 페이지 입니다. 피크시간, 로봇 현황 데이터의 경우 사용자가 해당 데이터를 한 눈에 파악하기 용이하도록 `react-chart-js2` 라이브러리를 통해 `데이터 시각화 작업`을 진행했습니다.| 
|로봇|<img src="https://github.com/zinukk/Mobile_H_Management_System/assets/97172321/a22594fb-afcb-4ec0-8918-589af225bb50" />|- 로봇 페이지는 각각의 로봇의 정보를 제공하는 페이지로 로봇이 운용되고 있는 `매장의 이름, 현재 상태, 시리얼 넘버, 배터리 상태, 서빙횟수, 이동거리` 정보 등을 포함하고 있습니다. <br> <br> - `드롭다운을 통한 데이터 이중 필터링` : 두 개의 드롭다운 컴포넌트를 통해 `매장`과 로봇의 `상태`에 따라 필터링이 가능합니다. `매장 정보`를 포함하고 있는 첫 번째 드롭다운을 통해 매장에서 운용되고 있는 로봇들을 검색할 수 있고 두 번째 드롭다운에서는 로봇의 상태를 `에러, 이동, 충전, 대기, 수리` 총 다섯 가지의 상태로 분류하고 클릭 시 해당 조건에 맞는 로봇을 검색할 수 있습니다. <br> <br> - `Intersection Observer API를 활용한 무한 스크롤` : 로봇의 정보를 효과적으로 리스팅하고 `웹 페이지 성능 최적화`를 위해 Intersection Observer API를 활용하여 `무한 스크롤`을 구현했습니다.|
|에러 및 상세|오른쪽정렬|중앙정렬|
