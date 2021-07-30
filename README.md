# 🐾 개스퀴 🐾 - 백엔드

### 기술 스택

- Node.js (Express) + MongoDB (mongoose)



### 사용 환경 설정

1. 백엔드 파일 클론하기

   ```bash
   > git clone https://github.com/Winters0727/Quiz_Backend
   ```

2. 의존성 파일 설치 - `package.json` 파일 확인

   ```bash
   > npm install
   ```

3. Mongo DB 설치

   - MongoDB Community Server
   - MongoDB Compass (선택)
   - https://www.mongodb.com/try/download

4. 환경변수 설정 - `.env` 파일 생성

   ```
   DATABASE_URL=(Mongo DB 로컬 URL : mongodb://localhost:27017/)
   PORT=(사용할 포트 번호)
   ```

5. `bin/www` 파일 실행

   ```bash
   > node bin/www
   > nodemon bin/www
   ```



****



### 데이터 모델 스키마

**단답형 퀴즈**

|    **데이터**    |     **키**      | **자료형** | **옵션** |
| :--------------: | :-------------: | :--------: | :------: |
|    퀴즈 문제     | `quizQuestion`  |  `String`  |   필수   |
|    퀴즈 정답     |  `quizAnswer`   |  `Array`   |   필수   |
|  퀴즈 카테고리   | `quizCategory`  |  `Array`   |   필수   |
| 퀴즈 플레이 횟수 | `quizPlayCount` |  `Number`  |          |
|  퀴즈 생성 시점  |   `createdAt`   |   `Date`   |          |
|  퀴즈 변경 시점  |   `updatedAt`   |   `Date`   |          |



**서술형 퀴즈**

|    **데이터**    |     **키**      | **자료형** | **옵션** |
| :--------------: | :-------------: | :--------: | :------: |
|    퀴즈 문제     | `quizQuestion`  |  `String`  |   필수   |
|    퀴즈 정답     |  `quizAnswer`   |  `String`  |   필수   |
|  퀴즈 카테고리   | `quizCategory`  |  `Array`   |   필수   |
| 퀴즈 플레이 횟수 | `quizPlayCount` |  `Number`  |          |
|  퀴즈 생성 시점  |   `createdAt`   |   `Date`   |          |
|  퀴즈 변경 시점  |   `updatedAt`   |   `Date`   |          |



**객관식 퀴즈**

|    **데이터**    |     **키**      | **자료형** | **옵션** |
| :--------------: | :-------------: | :--------: | :------: |
|    퀴즈 문제     | `quizQuestion`  |  `String`  |   필수   |
|    퀴즈 정답     |  `quizAnswer`   |  `Number`  |   필수   |
|   퀴즈 선택지    | `quizSelection` |  `Array`   |   필수   |
|  퀴즈 카테고리   | `quizCategory`  |  `Array`   |   필수   |
| 퀴즈 플레이 횟수 | `quizPlayCount` |  `Number`  |          |
|  퀴즈 생성 시점  |   `createdAt`   |   `Date`   |          |
|  퀴즈 변경 시점  |   `updatedAt`   |   `Date`   |          |



****



### Endpoint

**로컬 서버 Base URL** : `http://localhost:(포트번호)/`

**퀴즈 API Base URI** : `api/quiz/(퀴즈 타입 : short, long, select)`

- `http://localhost:(포트번호)/api/quiz/short`
- `http://localhost:(포트번호)/api/quiz/long`
- `http://localhost:(포트번호)/api/quiz/select`

**랜덤 퀴즈 Base URL** : `http://localhost:(포트번호)/api/quiz/random` (GET)

- 단답형, 서술형, 객관식 퀴즈 각각의 최신 퀴즈 10개를 불러와서 그중 무작위로 5개를 선택해 넘겨준다.
- 퀴즈 개수의 합이 5개 미만이라면 그 개수만큼의 퀴즈를 넘겨준다.



단답형, 서술형, 객관식 퀴즈 모두 퀴즈 타입을 제외하면 동일한 CRUD Endpoint를 가진다.

`quizId`는 Mongo DB에서 제공하는 `_id`를 의미한다.

| **Endpoint** | **HTTP Method** |                           **설명**                           |
| :----------: | :-------------: | :----------------------------------------------------------: |
|     `/`      |      POST       |                      퀴즈를 생성합니다.                      |
| `/?limit=1`  |       GET       | 퀴즈 리스트를 가져옵니다.<br />Query로 `limit`를 입력하면 가져올 데이터 양을 제한합니다. |
|  `/:quizId`  |       GET       |                   특정 퀴즈를 가져옵니다.                    |
|  `/:quizId`  |       PUT       |                   특정 퀴즈를 변경합니다.                    |
|  `/:quizId`  |     DELETE      |                   특정 퀴즈를 제거합니다.                    |



- Post 예시

  - URL : `http://localhost:8000/api/quiz/short`

  - http method : POST

  - 데이터 : 

    ```json
    {
        "quizQuestion" : "둘 이상의 프로세스가 다른 프로세스가 점유하고 있는 자원을 서로 기다릴 때 무한 대기에 빠지는 상황을 뭐라고 하나요?",
        "quizAnswer" : ["데드락", "deadlock", "교착상태"],
        "quizCategory" : ["운영체제", "컴퓨터", "프로그래밍"]
    }
    ```
