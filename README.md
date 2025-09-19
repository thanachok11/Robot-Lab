## การทดสอบด้วย Robot Framework

ส่วนนี้จะอธิบายวิธีการใช้งานแอปพลิเคชัน MERN ที่ให้มาพร้อมกับชุดทดสอบ Robot Framework ของคุณ

### โครงสร้างโปรเจกต์ Robot Framework (ตัวอย่าง)

โปรเจกต์ Robot Framework ของคุณ (`robot-tests/`) ควรมีโครงสร้างคล้ายกับนี้:

```
robot-tests/
│── variables/
│   └── global_variables.robot    # การกำหนดค่าตัวแปรต่างๆ (BASE_URL, browser, credentials)
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
        *** Settings ***
        Library    SeleniumLibrary
        
        *** Keywords ***
        Close Browser Session
            Close Browser

      ```
3. **`robot-tests/resources/RegisterPage.robot`**:
    ```robotframework
        *** Settings ***
        Resource    Common.robot
        
        *** Keywords ***
        Open Browser To Register Page
            Open Browser    ${BASE_URL}/register    ${BROWSER}
            Maximize Browser Window
        
        Fill Register Form
            [Arguments]    ${firstname}    ${lastname}    ${email}    ${password}
            Input Text    id=firstName    ${firstname}
            Input Text    id=lastName     ${lastname}
            Input Text    id=email        ${email}
            Input Text    id=password     ${password}
        
        Submit Registration
            Click Button    xpath=//button[contains(text(),'สมัครสมาชิก')]
        
        Verify Registration Success
            Wait Until Page Contains    ยินดีต้อนรับ


    ```

4. **`robot-tests/resources/LoginPage.robot`**:
    ```robotframework
        *** Settings ***
        Resource    Common.robot
        
        *** Keywords ***
        Open Browser To Login Page
            Open Browser    ${BASE_URL}/login    ${BROWSER}
            Maximize Browser Window
        
        Input Credentials
            [Arguments]    ${email}    ${password}
            Input Text    id=email    ${email}
            Input Text    id=password    ${password}
        
        Submit Login
            Click Button    xpath=//button[contains(text(),'เข้าสู่ระบบ')]

    ```

5.  **`robot-tests/resources/DashboardPage.robot`**:
    ```robotframework
        *** Settings ***
        Resource    Common.robot
        
        *** Keywords ***
        Verify Dashboard Page
            Wait Until Page Contains    Dashboard
            Log    User is on Dashboard page

    ```
6. **`robot-tests/resources/full_flow_test.robot`**:
    ```robotframework
        *** Settings ***
        Resource    ../resources/RegisterPage.robot
        Resource    ../resources/LoginPage.robot
        Resource    ../resources/DashboardPage.robot
        Resource    ../variables/global_variables.robot
        
        *** Test Cases ***
        Full Flow: Register → Login → Dashboard
            [Documentation]    สมัครสมาชิกใหม่, เข้าสู่ระบบ และตรวจ Dashboard
            # --- Register ---
            Open Browser To Register Page
            Fill Register Form    ${FIRST_NAME}    ${LAST_NAME}    ${NEW_EMAIL}    ${VALID_PASSWORD}
            Submit Registration
            Verify Registration Success
            Close Browser Session
        
            # --- Login ---
            Open Browser To Login Page
            Input Credentials    ${NEW_EMAIL}    ${VALID_PASSWORD}
            Submit Login
            Verify Dashboard Page
            Close Browser Session
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

