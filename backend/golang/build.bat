@echo off
SET ExeName=webkepzes_api.exe
SET ExePath=./build/%ExeName%
SET GOOS=windows


IF NOT EXIST .\build (
    MKDIR .\build
)

IF EXIST %ExePath% (
    DEL %ExePath%
)

echo Building %ExeName%...

@echo on
go build -v -o %ExePath%
@echo off

IF EXIST %ExePath% (
    PUSHD .\build
    .\%ExeName%
    POPD
)