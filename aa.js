#SingleInstance force
#Persistent

   ; ~MapleStory Worlds - 바람의나라 클래식
#SingleInstance force
SetKeyDelay, 1
SetMouseDelay, 1

   ; MapleStory Worlds 창의 위치 가져오기
WinGetPos, vx, vy, vw, vh, MapleStory Worlds - 바람의나라 클래식
   ; ~msgbox, % vw vh
   ; GUI 창을 지정된 위치에 표
Gui, Add, ListBox, w500 h100 cgreen vloglist + VScroll,
   IfWinExist, MapleStory Worlds - 바람의나라 클래식
{
   ; 게임 창 바로 아래에 GUI 창을 표시하기 위한 위치 계산
   GuiX:= vx + 401; vx + 200에서 1을 더해 정확한 위치 설정
   GuiY:= vy + vh + 1
   Gui, Show, x % GuiX % y % GuiY %, 바람의나라 매크로
}
else
{
   Gui, Show, autosize, 바람의나라 매크로
}

gui, +toolwindow

global ticktime:= 1

global max_timer:= 120
global skill_rate:= 75
global playTime:= 1000 * max_timer
global tickitme_tot
랜덤이동:= false
WinActivate, MapleStory Worlds - 바람의나라 클래식

global C_cnt:= 0


HP:= 100
MP:= 100
min_hp:= 80
min_mp:= 30
hp_cnt:= 0
mp_cnt:= 0

   ; 위 / 아래 이동 카운트
global upCount:= 0
global downCount:= 0
title = MapleStory Worlds - 바람의나라 클래식
monster_cnt:= 0
   ; ~FFFFFF
   ; ~E7EFF7
기원:= 1
혼마:= 2
지진:= 4
신수:= 3

보호:= 7
무장:= 8

공증:= 0
첨:= 4
첨2:= 9
자힐:= 9

마비:= 5
중독:= 6
헬:= 9

물약S = f
물약E = j


return
F1::
Loop
{

IfWinActive  MapleStory Worlds - 바람의나라 클래식
   {
      ; 좌표 설정
      x1:= 975; 가득 찬 체력바의 시작 좌표
      x2:= 1100; 다 떨어진 체력바의 끝 좌표
      y:= 640; y 좌표는 고정

         ; ~msgbox,% (x2 - x1) / 100

      pix:= 6.25
      Loop
      {
         xPos:= x1 + (pix * hp_cnt)
         PixelGetColor, color, xPos, y, RGB

         if (color == 0x000000) {
            HP:= floor(100 - (hp_cnt * 5))
         }
         else {
            HP:= HP
            break
         }
         if (HP <= min_hp) {
            ControlSend,, { esc }, MapleStory Worlds - 바람의나라 클래식
            Sleep, 10
            ControlSend,, 1, MapleStory Worlds - 바람의나라 클래식
            Sleep, 10
            ControlSend,, { home }, MapleStory Worlds - 바람의나라 클래식
            Sleep, 10
            ControlSend,, { Enter }, MapleStory Worlds - 바람의나라 클래식
            Sleep, 10
         }
         hp_cnt++
      }
      hp_cnt:= 0
   }

IfWinActive  MapleStory Worlds - 바람의나라 클래식
   {
      ; 좌표 설정
      x1:= 975; 가득 찬 체력바의 시작 좌표
      x2:= 1100; 다 떨어진 체력바의 끝 좌표
      y:= 660; y 좌표는 고정

      pix:= 6.25
      Loop
      {
         xPos:= x1 + (pix * mp_cnt)
         PixelGetColor, color, xPos, y, RGB
         if (color == 0x000000) {
            MP:= floor(100 - (mp_cnt * 5))
         }
         else {
            MP:= MP
            break
         }
         if (MP <= min_mp) {
            ControlSend,, { esc }, MapleStory Worlds - 바람의나라 클래식
            Sleep, 10
            ControlSend,, 0, MapleStory Worlds - 바람의나라 클래식
            Sleep, 10
         }
         mp_cnt++
      }
      mp_cnt:= 0
   }

   ToolTip_msg = 현재체력... % HP % `r`n현재마력... % MP %


      IniWrite, % HP % , C: \ABC\Setting.ini, Heal, HP
   IniWrite, % MP % , C: \ABC\Setting.ini, Heal, MP


   ToolTip,  % ToolTip_msg % , 1120, 640

}
return



F4:: reload
F8:: exitapp

CheckPixelColor(x, y, targetColor)
{
   PixelGetColor, color, % x %, % y %, RGB; 지정된 좌표에서 픽셀 색상 가져오기

   if (color = targetColor)
      return true
   else
      return false
}


; 로그 출력 함수
Log(message) {
   ; 현재 시간을 년월일 시분초 형식으로 포맷
   FormatTime, currentTime, A_Now, yyyy - MM - dd HH: mm: ss

   FormatTime, Time, , yyyy / MM / dd   HH: mm: ss
   GuiControl,, loglist,% Time % `t%message%
sendmessage,0x18B,,,listbox1,바람의나라 매크로         ;총 줄수
    LB_GETCOUNT := errorlevel
    sendmessage,0x186,LB_GETCOUNT-1,,listbox1,바람의나라 매크로           ;선택리스트 번호 얻기
}
return

; 경과 시간을 시분초 형식으로 변환
FormatTime(ticktime) {
    ; 초 단위로부터 시, 분, 초 계산
    seconds := ticktime
    minutes := seconds // 60
    hours := minutes // 60
    seconds := mod(seconds,  60)   ; 나머지 초 계산
    minutes := mod(minutes , 60)   ; 나머지 분 계산

    ; 시분초 형식으로 반환
    return hours "시간 " minutes "분 " seconds "초"
}

저는 5%단위로 체크하게해놨어요