@echo off
title Pelada Facil - Servidor Local
color 0A

echo.
echo ================================================================
echo    PELADA FACIL - SERVIDOR LOCAL
echo ================================================================
echo.

REM Verifica se index.html existe
if not exist "index.html" (
    echo [ERRO] Arquivo index.html nao encontrado!
    echo Certifique-se de estar na pasta correta.
    echo.
    pause
    exit /b 1
)

echo [OK] Arquivos encontrados!
echo.
echo Iniciando servidor na porta 8000...
echo.
echo ================================================================
echo    SERVIDOR INICIADO COM SUCESSO!
echo.
echo    Abra seu navegador e acesse:
echo.
echo    http://localhost:8000
echo    ou
echo    http://127.0.0.1:8000
echo.
echo    Pressione Ctrl+C para parar o servidor
echo ================================================================
echo.

REM Tenta iniciar com Python 3
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo Usando Python...
    python -m http.server 8000
    goto :end
)

REM Tenta com Python3 explicitamente
where python3 >nul 2>nul
if %errorlevel% equ 0 (
    echo Usando Python3...
    python3 -m http.server 8000
    goto :end
)

REM Tenta com PHP
where php >nul 2>nul
if %errorlevel% equ 0 (
    echo Usando PHP...
    php -S localhost:8000
    goto :end
)

REM Se nenhum funcionou
echo.
echo [ERRO] Python ou PHP nao encontrado!
echo.
echo Para instalar Python:
echo 1. Acesse: https://www.python.org/downloads/
echo 2. Baixe e instale
echo 3. Durante instalacao, marque "Add Python to PATH"
echo.
echo Alternativa: Abra o arquivo index.html diretamente no navegador
echo.
pause
exit /b 1

:end
pause
