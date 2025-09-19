## การทดสอบด้วย Robot Framework

ส่วนนี้จะอธิบายวิธีการใช้งานแอปพลิเคชัน MERN ที่ให้มาพร้อมกับชุดทดสอบ Robot Framework ของคุณ

### โครงสร้างโปรเจกต์ Robot Framework (ตัวอย่าง)

โปรเจกต์ Robot Framework ของคุณ (`robot-tests/`) ควรมีโครงสร้างคล้ายกับนี้:

```
robot-tests/
│── variables/
│   └── global_variables.robot    # การกำหนดค่าส่วนกลาง (BASE_URL, browser, credentials)
│
│── resources/
│   ├── Common.robot              # คีย์เวิร์ดทั่วไป (เช่น การทำงานของเบราว์เซอร์, การนำทางหน้า)
│   ├── RegisterPage.robot        # คีย์เวิร์ดเฉพาะสำหรับหน้าลงทะเบียน
│   ├── LoginPage.robot           # คีย์เวิร์ดเฉพาะสำหรับหน้าเข้าสู่ระบบ
│   └── DashboardPage.robot       # คีย์เวิร์ดเฉพาะสำหรับหน้าแดชบอร์ด
│
└── tests/
    └── full_flow_test.robot      # เคสทดสอบแบบ End-to-end
```
`
`

### การปรับแต่งที่สำคัญสำหรับ Robot Framework Tests

1.  **`robot-tests/variables/global_variables.robot`**:
    *   ตั้งค่า `BASE_URL` เป็น URL ของแอปพลิเคชัน frontend ของคุณ:
        ```robotframework
        *** Variables ***
        ${BASE_URL}        (https://robot-lab-five.vercel.app/)
        ${BROWSER}         chrome
        ${VALID_PASSWORD}  myPassword123
        ${FIRST_NAME}      Boss
        ${LAST_NAME}       Tester
        ```
    *   **การสุ่มอีเมล:** ใช้ `Generate Random String` ของ Robot Framework สำหรับอีเมลที่ไม่ซ้ำกัน:
        ```robotframework
        *** Keywords ***
        Generate New Email
            ${rand}=    Generate Random String    6    [LOWER]
            ${NEW_EMAIL}=    Set Variable    testuser_${rand}@gmail.com
            [Return]    ${NEW_EMAIL}
        ```

2.  **`robot-tests/resources/Common.robot`**:
    *   อัปเดต `Open Browser To Register Page` และ `Open Browser To Login Page` เพื่อใช้ URL ที่ถูกต้อง:
        ```robotframework
        Open Browser To Register Page
            Open Browser    ${BASE_URL}/register    ${BROWSER}
            Maximize Browser Window
            Wait Until Page Contains    Register

        Open Browser To Login Page
            Open Browser    ${BASE_URL}/login    ${BROWSER}
            Maximize Browser Window
            Wait Until Page Contains    Login
        ```

3.  **ไฟล์ทรัพยากรเฉพาะหน้า (`RegisterPage.robot`, `LoginPage.robot`, `DashboardPage.robot`)**:
    *   **เพิ่มการรอ:** สิ่งสำคัญคือต้องเพิ่ม `Wait Until Element Is Visible` หรือ `Wait Until Page Contains Element` ก่อนที่จะโต้ตอบกับองค์ประกอบเพื่อให้แน่ใจว่า DOM พร้อมแล้ว
        *   ตัวอย่าง (`RegisterPage.robot`):
            ```robotframework
            Fill Register Form
                [Arguments]    ${firstname}    ${lastname}    ${email}    ${password}
                Wait Until Element Is Visible    id=firstName    10s
                Input Text    id=firstName    ${firstname}
                Input Text    id=lastName     ${lastname}
                Input Text    id=email        ${email}
                Input Text    id=password     ${password}
            ```
    *   **ตัวเลือกองค์ประกอบ:** ตรวจสอบให้แน่ใจว่าตัวเลือก `id=` หรือ `xpath=` กำหนดเป้าหมายองค์ประกอบในแอปพลิเคชัน React ได้อย่างถูกต้อง
        *   **IDs ของฟอร์มลงทะเบียน:** `firstName`, `lastName`, `email`, `password`
        *   **IDs ของฟอร์มเข้าสู่ระบบ:** `loginEmail`, `loginPassword`
        *   **ID ชื่อผู้ใช้แดชบอร์ด:** `dashboard-username`

**`robot-tests/resources/LoginPage.robot`** (ตัวอย่าง)

```robotframework
*** Settings ***
Library    SeleniumLibrary

*** Keywords ***
Fill Login Form
    [Arguments]    ${email}    ${password}
    Wait Until Element Is Visible    id=loginEmail    10s
    Input Text    id=loginEmail     ${email}
    Input Text    id=loginPassword  ${password}

Click Login Button
    Wait Until Element Is Clickable    xpath=//button[contains(text(),'Login')]
    Click Button    xpath=//button[contains(text(),'Login')]

Verify Successful Login
    Wait Until Page Contains Element    id=dashboard-username    10s
    Page Should Contain Element    id=dashboard-username
```

หากไฟล์นี้ไม่มีอยู่ในโปรเจกต์ของคุณ คุณจะต้องสร้างมันขึ้นมาตามโครงสร้างที่แนะนำครับ
### การรัน Robot Framework Tests

เมื่อแอปพลิเคชัน MERN ของคุณทำงานอยู่และ Robot Framework tests ของคุณได้รับการกำหนดค่าแล้ว:

1.  เปิดหน้าต่างเทอร์มินัลใหม่ (ต่างจากที่รัน backend และ frontend)
2.  นำทางไปยังไดเรกทอรี `robot-tests` ของคุณ
3.  รันชุดทดสอบของคุณ:

    ```bash
    robot -d results tests/full_flow_test.robot
    ```

    *   `-d results`: ระบุว่ารายงานการทดสอบและบันทึกจะถูกสร้างขึ้นในไดเรกทอรีชื่อ `results`
    *   `tests/full_flow_test.robot`: เส้นทางไปยังไฟล์ทดสอบหลักของคุณ

